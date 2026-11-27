"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[79264],{

/***/ 503:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ useElementFlip)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


function useElementFlip(flipH, flipV) {
    const flipStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        let style = '';
        if (flipH && flipV)
            style = 'rotateX(180deg) rotateY(180deg)';
        else if (flipV)
            style = 'rotateX(180deg)';
        else if (flipH)
            style = 'rotateY(180deg)';
        return style;
    }, [flipH, flipV]);
    return { flipStyle };
}


//# sourceMappingURL=useElementFlip.js.map


/***/ }),

/***/ 1275:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ExternalLink)
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
    name: "external-link",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15 3h6v6",
                key: "1q9fwt"
            }
        ],
        [
            "path",
            {
                d: "M10 14 21 3",
                key: "gplh6r"
            }
        ],
        [
            "path",
            {
                d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
                key: "a6xqqp"
            }
        ]
    ]
};
__iconData.node;
const ExternalLink = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=external-link.mjs.map


/***/ }),

/***/ 1438:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ preservesPlainTextLineBreaks)
/* harmony export */ });
/**
 * `content` is an HTML-string contract. Only markup-free values can safely use
 * `white-space: pre-line`: a newline between rich HTML block tags is source
 * formatting, not visible slide content.
 */
const HTML_MARKUP_PATTERN = /<\/?[a-z][^>]*>|<![^>]*>/i;
function preservesPlainTextLineBreaks(content) {
    return !HTML_MARKUP_PATTERN.test(content);
}


//# sourceMappingURL=richText.js.map


/***/ }),

/***/ 1623:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ SVGPathDataParser)
/* harmony export */ });
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);
/* harmony import */ var _TransformableSVG_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8137);
// Parse SVG PathData
// http://www.w3.org/TR/SVG/paths.html#PathDataBNF


// Private consts : Char groups
const isWhiteSpace = (c) => ' ' === c || '\t' === c || '\r' === c || '\n' === c;
const isDigit = (c) => '0'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0);
class SVGPathDataParser extends _TransformableSVG_js__WEBPACK_IMPORTED_MODULE_1__/* .TransformableSVG */ .n {
    curNumber = '';
    curCommandType = -1;
    curCommandRelative = false;
    canParseCommandOrComma = true;
    curNumberHasExp = false;
    curNumberHasExpDigits = false;
    curNumberHasDecimal = false;
    curArgs = [];
    constructor() {
        super();
    }
    finish(commands = []) {
        this.parse(' ', commands);
        // Adding residual command
        if (0 !== this.curArgs.length || !this.canParseCommandOrComma) {
            throw new SyntaxError('Unterminated command at the path end.');
        }
        return commands;
    }
    parse(str, commands = []) {
        const finishCommand = (command) => {
            commands.push(command);
            this.curArgs.length = 0;
            this.canParseCommandOrComma = true;
        };
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            // White spaces parsing
            const isAArcFlag = this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC &&
                (this.curArgs.length === 3 || this.curArgs.length === 4) &&
                this.curNumber.length === 1 &&
                (this.curNumber === '0' || this.curNumber === '1');
            const isEndingDigit = isDigit(c) && ((this.curNumber === '0' && c === '0') || isAArcFlag);
            if (isDigit(c) && !isEndingDigit) {
                this.curNumber += c;
                this.curNumberHasExpDigits = this.curNumberHasExp;
                continue;
            }
            if ('e' === c || 'E' === c) {
                this.curNumber += c;
                this.curNumberHasExp = true;
                continue;
            }
            if (('-' === c || '+' === c) &&
                this.curNumberHasExp &&
                !this.curNumberHasExpDigits) {
                this.curNumber += c;
                continue;
            }
            // if we already have a ".", it means we are starting a new number
            if ('.' === c &&
                !this.curNumberHasExp &&
                !this.curNumberHasDecimal &&
                !isAArcFlag) {
                this.curNumber += c;
                this.curNumberHasDecimal = true;
                continue;
            }
            // New number
            if (this.curNumber && -1 !== this.curCommandType) {
                const val = Number(this.curNumber);
                if (isNaN(val)) {
                    throw new SyntaxError(`Invalid number ending at ${i}`);
                }
                if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC) {
                    if (0 === this.curArgs.length || 1 === this.curArgs.length) {
                        if (0 > val) {
                            throw new SyntaxError(`Expected positive number, got "${val}" at index "${i}"`);
                        }
                    }
                    else if (3 === this.curArgs.length || 4 === this.curArgs.length) {
                        if ('0' !== this.curNumber && '1' !== this.curNumber) {
                            throw new SyntaxError(`Expected a flag, got "${this.curNumber}" at index "${i}"`);
                        }
                    }
                }
                this.curArgs.push(val);
                if (this.curArgs.length === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .COMMAND_ARG_COUNTS */ .c[this.curCommandType]) {
                    if (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.HORIZ_LINE_TO === this.curCommandType) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.HORIZ_LINE_TO,
                            relative: this.curCommandRelative,
                            x: val,
                        });
                    }
                    else if (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.VERT_LINE_TO === this.curCommandType) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.VERT_LINE_TO,
                            relative: this.curCommandRelative,
                            y: val,
                        });
                        // Move to / line to / smooth quadratic curve to commands (x, y)
                    }
                    else if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.MOVE_TO ||
                        this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_TO ||
                        this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
                        finishCommand({
                            type: this.curCommandType,
                            relative: this.curCommandRelative,
                            x: this.curArgs[0],
                            y: this.curArgs[1],
                        });
                        // Switch to line to state
                        if (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.MOVE_TO === this.curCommandType) {
                            this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_TO;
                        }
                    }
                    else if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO,
                            relative: this.curCommandRelative,
                            x1: this.curArgs[0],
                            y1: this.curArgs[1],
                            x2: this.curArgs[2],
                            y2: this.curArgs[3],
                            x: this.curArgs[4],
                            y: this.curArgs[5],
                        });
                    }
                    else if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_CURVE_TO) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_CURVE_TO,
                            relative: this.curCommandRelative,
                            x2: this.curArgs[0],
                            y2: this.curArgs[1],
                            x: this.curArgs[2],
                            y: this.curArgs[3],
                        });
                    }
                    else if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.QUAD_TO) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.QUAD_TO,
                            relative: this.curCommandRelative,
                            x1: this.curArgs[0],
                            y1: this.curArgs[1],
                            x: this.curArgs[2],
                            y: this.curArgs[3],
                        });
                    }
                    else if (this.curCommandType === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC) {
                        finishCommand({
                            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC,
                            relative: this.curCommandRelative,
                            rX: this.curArgs[0],
                            rY: this.curArgs[1],
                            xRot: this.curArgs[2],
                            lArcFlag: this.curArgs[3],
                            sweepFlag: this.curArgs[4],
                            x: this.curArgs[5],
                            y: this.curArgs[6],
                        });
                    }
                }
                this.curNumber = '';
                this.curNumberHasExpDigits = false;
                this.curNumberHasExp = false;
                this.curNumberHasDecimal = false;
                this.canParseCommandOrComma = true;
            }
            // Continue if a white space or a comma was detected
            if (isWhiteSpace(c)) {
                continue;
            }
            if (',' === c && this.canParseCommandOrComma) {
                // L 0,0, H is not valid:
                this.canParseCommandOrComma = false;
                continue;
            }
            // if a sign is detected, then parse the new number
            if ('+' === c || '-' === c || '.' === c) {
                this.curNumber = c;
                this.curNumberHasDecimal = '.' === c;
                continue;
            }
            // if a 0 is detected, then parse the new number
            if (isEndingDigit) {
                this.curNumber = c;
                this.curNumberHasDecimal = false;
                continue;
            }
            // Adding residual command
            if (0 !== this.curArgs.length) {
                throw new SyntaxError(`Unterminated command at index ${i}.`);
            }
            if (!this.canParseCommandOrComma) {
                throw new SyntaxError(`Unexpected character "${c}" at index ${i}. Command cannot follow comma`);
            }
            this.canParseCommandOrComma = false;
            // Detecting the next command
            if ('z' === c || 'Z' === c) {
                commands.push({
                    type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH,
                });
                this.canParseCommandOrComma = true;
                this.curCommandType = -1;
                continue;
                // Horizontal move to command
            }
            else if ('h' === c || 'H' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.HORIZ_LINE_TO;
                this.curCommandRelative = 'h' === c;
                // Vertical move to command
            }
            else if ('v' === c || 'V' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.VERT_LINE_TO;
                this.curCommandRelative = 'v' === c;
                // Move to command
            }
            else if ('m' === c || 'M' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.MOVE_TO;
                this.curCommandRelative = 'm' === c;
                // Line to command
            }
            else if ('l' === c || 'L' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_TO;
                this.curCommandRelative = 'l' === c;
                // Curve to command
            }
            else if ('c' === c || 'C' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO;
                this.curCommandRelative = 'c' === c;
                // Smooth curve to command
            }
            else if ('s' === c || 'S' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_CURVE_TO;
                this.curCommandRelative = 's' === c;
                // Quadratic bezier curve to command
            }
            else if ('q' === c || 'Q' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.QUAD_TO;
                this.curCommandRelative = 'q' === c;
                // Smooth quadratic bezier curve to command
            }
            else if ('t' === c || 'T' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_QUAD_TO;
                this.curCommandRelative = 't' === c;
                // Elliptic arc command
            }
            else if ('a' === c || 'A' === c) {
                this.curCommandType = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC;
                this.curCommandRelative = 'a' === c;
            }
            else {
                throw new SyntaxError(`Unexpected character "${c}" at index ${i}.`);
            }
        }
        return commands;
    }
    /**
     * Return a wrapper around this parser which applies the transformation on parsed commands.
     */
    transform(transform) {
        const result = Object.create(this, {
            parse: {
                value(chunk, commands = []) {
                    const parsedCommands = Object.getPrototypeOf(this).parse.call(this, chunk);
                    for (const c of parsedCommands) {
                        const cT = transform(c);
                        if (Array.isArray(cT)) {
                            commands.push(...cT);
                        }
                        else {
                            commands.push(cT);
                        }
                    }
                    return commands;
                },
            },
        });
        return result;
    }
}
//# sourceMappingURL=SVGPathDataParser.js.map

/***/ }),

/***/ 1933:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jH: () => (/* binding */ useDirection)
/* harmony export */ });
/* unused harmony exports DirectionProvider, Provider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ DirectionProvider,Provider,useDirection auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/direction.tsx


var Direction = {
    LTR: "ltr",
    RTL: "rtl"
};
var DirectionContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
var DirectionProvider = /* @__PURE__ */ (/* unused pure expression or super */ null && (__name((props)=>{
    const { dir, children } = props;
    return /* @__PURE__ */ jsx(DirectionContext.Provider, {
        value: dir,
        children
    });
}, "DirectionProvider")));
function useDirection(localDir) {
    const globalDir = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DirectionContext);
    return localDir || globalDir || Direction.LTR;
}
__name(useDirection, "useDirection");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 2220:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports encodeHTML, encodeNonAsciiHTML */
/* harmony import */ var _generated_encode_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15407);
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68681);


const htmlReplacer = /[\t\n\f!-,./:-@[-`{-}\u0080-\uFFFF]/g;
/**
 * Encodes all characters in the input using HTML entities. This includes
 * characters that are valid ASCII characters in HTML documents, such as `#`.
 *
 * To get a more compact output, consider using the `encodeNonAsciiHTML`
 * function, which will only encode characters that are not valid in HTML
 * documents, as well as non-ASCII characters.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeHTML(input) {
    return encodeHTMLTrieRe(htmlReplacer, input);
}
/**
 * Encodes all non-ASCII characters, as well as characters not valid in HTML
 * documents using HTML entities. This function will not encode characters that
 * are valid in HTML documents, such as `#`.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeNonAsciiHTML(input) {
    return encodeHTMLTrieRe(xmlReplacer, input);
}
function encodeHTMLTrieRe(regExp, input) {
    let returnValue = "";
    let lastIndex = 0;
    let match;
    while ((match = regExp.exec(input)) !== null) {
        const { index } = match;
        returnValue += input.substring(lastIndex, index);
        const char = input.charCodeAt(index);
        let next = htmlTrie.get(char);
        if (typeof next === "object") {
            // We are in a branch. Try to match the next char.
            if (index + 1 < input.length) {
                const nextChar = input.charCodeAt(index + 1);
                const value = typeof next.n === "number"
                    ? next.n === nextChar
                        ? next.o
                        : undefined
                    : next.n.get(nextChar);
                if (value !== undefined) {
                    returnValue += value;
                    lastIndex = regExp.lastIndex += 1;
                    continue;
                }
            }
            next = next.v;
        }
        // We might have a tree node without a value; skip and use a numeric entity.
        if (next === undefined) {
            const cp = getCodePoint(input, index);
            returnValue += `&#x${cp.toString(16)};`;
            // Increase by 1 if we have a surrogate pair
            lastIndex = regExp.lastIndex += Number(cp !== char);
        }
        else {
            returnValue += next;
            lastIndex = index + 1;
        }
    }
    return returnValue + input.substr(lastIndex);
}
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ 2342:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   In: () => (/* binding */ SelectIcon),
/* harmony export */   LM: () => (/* binding */ SelectViewport),
/* harmony export */   PP: () => (/* binding */ SelectScrollUpButton),
/* harmony export */   UC: () => (/* binding */ SelectContent),
/* harmony export */   VF: () => (/* binding */ SelectItemIndicator),
/* harmony export */   WT: () => (/* binding */ SelectValue),
/* harmony export */   ZL: () => (/* binding */ SelectPortal),
/* harmony export */   bL: () => (/* binding */ Select),
/* harmony export */   l9: () => (/* binding */ SelectTrigger),
/* harmony export */   p4: () => (/* binding */ SelectItemText),
/* harmony export */   q7: () => (/* binding */ SelectItem),
/* harmony export */   wn: () => (/* binding */ SelectScrollDownButton)
/* harmony export */ });
/* unused harmony exports Arrow, Group, Label, Select, SelectArrow, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport, Separator, createSelectScope, unstable_BubbleInput, unstable_Provider, unstable_SelectBubbleInput, unstable_SelectProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47650);
/* harmony import */ var _radix_ui_number__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(27209);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76094);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1933);
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(19416);
/* harmony import */ var _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(54388);
/* harmony import */ var _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(69885);
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89971);
/* harmony import */ var _radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72364);
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(19040);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(83935);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55897);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(42442);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(17347);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(66294);
/* harmony import */ var _radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(40562);
/* harmony import */ var aria_hidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(22954);
/* harmony import */ var react_remove_scroll__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(78809);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Arrow,Content,Group,Icon,Item,ItemIndicator,ItemText,Label,Portal,Root,ScrollDownButton,ScrollUpButton,Select,SelectArrow,SelectContent,SelectGroup,SelectIcon,SelectItem,SelectItemIndicator,SelectItemText,SelectLabel,SelectPortal,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue,SelectViewport,Separator,Trigger,Value,Viewport,createSelectScope,unstable_BubbleInput,unstable_Provider,unstable_SelectBubbleInput,unstable_SelectProvider auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/select.tsx

























var Position = {
    ItemAligned: "item-aligned",
    Popper: "popper"
};
var Direction = {
    LTR: "ltr",
    RTL: "rtl"
};
var OPEN_KEYS = [
    " ",
    "Enter",
    "ArrowUp",
    "ArrowDown"
];
var SELECTION_KEYS = [
    " ",
    "Enter"
];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = (0,_radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__/* .createCollection */ .N)(SELECT_NAME);
var [createSelectContext, createSelectScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__/* .createContextScope */ .A)(SELECT_NAME, [
    createCollectionScope,
    _radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__/* .createPopperScope */ .Bk
]);
var usePopperScope = (0,_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__/* .createPopperScope */ .Bk)();
var [SelectProviderImpl, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
function SelectProvider(props) {
    const { __scopeSelect, children, open: openProp, defaultOpen, onOpenChange, value: valueProp, defaultValue, onValueChange, dir, name, autoComplete, disabled, required, form, // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const [trigger, setTrigger] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [valueNode, setValueNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [valueNodeHasChildren, setValueNodeHasChildren] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_6__/* .useDirection */ .jH)(dir);
    const [open, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__/* .useControllableState */ .i)({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: SELECT_NAME
    });
    const [value, setValue] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__/* .useControllableState */ .i)({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
        caller: SELECT_NAME
    });
    const triggerPointerDownPosRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const hasConsumerStoppedPropagationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const [userSelection, setUserSelection] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const handleUserSelect = /* @__PURE__ */ __name((nextValue)=>{
        setUserSelection({
            value: nextValue,
            hasConsumerStoppedPropagation: hasConsumerStoppedPropagationRef.current
        });
        setValue(nextValue);
    }, "handleUserSelect");
    const initialValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const associatedForm = form ? trigger?.ownerDocument.getElementById(form) : trigger?.form;
        if (associatedForm instanceof HTMLFormElement) {
            const reset = /* @__PURE__ */ __name(()=>setValue(initialValueRef.current), "reset");
            associatedForm.addEventListener("reset", reset);
            return ()=>associatedForm.removeEventListener("reset", reset);
        }
    }, [
        form,
        trigger,
        setValue
    ]);
    const isFormControl = trigger ? !!form || !!trigger.closest("form") : true;
    const [nativeOptionsSet, setNativeOptionsSet] = react__WEBPACK_IMPORTED_MODULE_0__.useState(/* @__PURE__ */ new Set());
    const contentId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_8__/* .useId */ .B)();
    const nativeSelectKey = Array.from(nativeOptionsSet).map((option)=>option.props.value).join(";");
    const handleNativeOptionAdd = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((option)=>{
        setNativeOptionsSet((prev)=>new Set(prev).add(option));
    }, []);
    const handleNativeOptionRemove = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((option)=>{
        setNativeOptionsSet((prev)=>{
            const optionsSet = new Set(prev);
            optionsSet.delete(option);
            return optionsSet;
        });
    }, []);
    const context = {
        required,
        trigger,
        onTriggerChange: setTrigger,
        valueNode,
        onValueNodeChange: setValueNode,
        valueNodeHasChildren,
        onValueNodeHasChildrenChange: setValueNodeHasChildren,
        contentId,
        value,
        onValueChange: setValue,
        hasConsumerStoppedPropagationRef,
        userSelection,
        onUserSelect: handleUserSelect,
        open,
        onOpenChange: setOpen,
        dir: direction,
        triggerPointerDownPosRef,
        disabled,
        name,
        autoComplete,
        form,
        nativeOptions: nativeOptionsSet,
        nativeSelectKey,
        isFormControl
    };
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__/* .Root */ .bL, {
        ...popperScope,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectProviderImpl, {
            scope: __scopeSelect,
            ...context,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Provider, {
                scope: __scopeSelect,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectNativeOptionsProvider, {
                    scope: __scopeSelect,
                    onNativeOptionAdd: handleNativeOptionAdd,
                    onNativeOptionRemove: handleNativeOptionRemove,
                    children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
                })
            })
        })
    });
}
__name(SelectProvider, "SelectProvider");
var Select = /* @__PURE__ */ __name((props)=>{
    const { __scopeSelect, children, ...providerProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectProvider, {
        __scopeSelect,
        ...providerProps,
        internal_do_not_use_render: ({ isFormControl })=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
                children: [
                    children,
                    isFormControl ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectBubbleInput, {
                        __scopeSelect
                    }) : null
                ]
            })
    });
}, "Select");
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectTrigger2(props, forwardedRef) {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search)=>{
        const enabledItems = getItems().filter((item)=>!item.disabled);
        const currentItem = enabledItems.find((item)=>item.value === context.value);
        const nextItem = findNextItem(enabledItems, search, currentItem);
        if (nextItem !== void 0) {
            context.onUserSelect(nextItem.value);
        }
    });
    const handleOpen = /* @__PURE__ */ __name((pointerEvent)=>{
        if (!isDisabled) {
            context.onOpenChange(true);
            resetTypeahead();
        }
        if (pointerEvent) {
            context.triggerPointerDownPosRef.current = {
                x: Math.round(pointerEvent.pageX),
                y: Math.round(pointerEvent.pageY)
            };
        }
    }, "handleOpen");
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__/* .Anchor */ .Mz, {
        asChild: true,
        ...popperScope,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.button, {
            type: "button",
            role: "combobox",
            "aria-controls": context.open ? context.contentId : void 0,
            "aria-expanded": context.open,
            "aria-required": context.required,
            "aria-autocomplete": "none",
            dir: context.dir,
            "data-state": context.open ? "open" : "closed",
            disabled: isDisabled,
            "data-disabled": isDisabled ? "" : void 0,
            "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
            ...triggerProps,
            ref: composedRefs,
            onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(triggerProps.onClick, (event)=>{
                event.currentTarget.focus();
                if (pointerTypeRef.current !== "mouse") {
                    handleOpen(event);
                }
            }),
            onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(triggerProps.onPointerDown, (event)=>{
                pointerTypeRef.current = event.pointerType;
                const target = event.target;
                if (target.hasPointerCapture(event.pointerId)) {
                    target.releasePointerCapture(event.pointerId);
                }
                if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
                    handleOpen(event);
                    event.preventDefault();
                }
            }),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(triggerProps.onKeyDown, (event)=>{
                const isTypingAhead = searchRef.current !== "";
                const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                if (!isModifierKey && event.key.length === 1) {
                    context.hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                    handleTypeaheadSearch(event.key);
                }
                if (isTypingAhead && event.key === " ") return;
                if (OPEN_KEYS.includes(event.key)) {
                    handleOpen();
                    event.preventDefault();
                }
            })
        })
    });
}, "SelectTrigger"));
var VALUE_NAME = "SelectValue";
var SelectValue = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectValue2(props, forwardedRef) {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, context.onValueNodeChange);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        onValueNodeHasChildrenChange(hasChildren);
    }, [
        onValueNodeHasChildrenChange,
        hasChildren
    ]);
    const showPlaceholder = shouldShowPlaceholder(context.value);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.span, {
        ...valueProps,
        asChild: showPlaceholder ? false : valueProps.asChild,
        ref: composedRefs,
        style: {
            pointerEvents: "none"
        },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: showPlaceholder ? placeholder : children
        }, showPlaceholder ? "placeholder" : "value")
    });
}, "SelectValue"));
var SelectIcon = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectIcon2(props, forwardedRef) {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.span, {
        "aria-hidden": true,
        ...iconProps,
        ref: forwardedRef,
        children: children || "\u25BC"
    });
}, "SelectIcon"));
var PORTAL_NAME = "SelectPortal";
var [PortalProvider, usePortalContext] = createSelectContext(PORTAL_NAME, {
    forceMount: void 0
});
var SelectPortal = /* @__PURE__ */ __name((props)=>{
    const { __scopeSelect, forceMount, ...portalProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(PortalProvider, {
        scope: props.__scopeSelect,
        forceMount,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_13__/* .Portal */ .Z, {
            asChild: true,
            ...portalProps
        })
    });
}, "SelectPortal");
var CONTENT_NAME = "SelectContent";
var SelectContent = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeSelect);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
    const [fragment, setFragment] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        setFragment(new DocumentFragment());
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__/* .Presence */ .C, {
        present: forceMount || context.open,
        children: ({ present })=>present ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectContentImpl, {
                ...contentProps,
                ref: forwardedRef
            }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectContentFragment, {
                ...contentProps,
                fragment
            })
    });
}, "SelectContent"));
var SelectContentFragment = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectContentFragment2(props, forwardedRef) {
    const { __scopeSelect, children, fragment } = props;
    if (!fragment) return null;
    return /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectContentProvider, {
        scope: __scopeSelect,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Slot, {
            scope: __scopeSelect,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                ref: forwardedRef,
                children
            })
        })
    }), fragment);
}, "SelectContentFragment"));
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var Slot = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_15__/* .createSlot */ .TL)("SelectContent.RemoveScroll");
var SelectContentImpl = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function SelectContentImpl2(props, forwardedRef) {
    const { __scopeSelect } = props;
    const { position = Position.ItemAligned, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, //
    // PopperContent props
    side, sideOffset, align, alignOffset, arrowPadding, collisionBoundary, collisionPadding, sticky, hideWhenDetached, avoidCollisions, //
    ...contentProps } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const [content, setContent] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [viewport, setViewport] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, setContent);
    const [selectedItem, setSelectedItem] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [selectedItemText, setSelectedItemText] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const firstValidItemFoundRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const firstItemFoundRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const firstItemTextFoundRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (content) return (0,aria_hidden__WEBPACK_IMPORTED_MODULE_16__/* .hideOthers */ .Eq)(content);
    }, [
        content
    ]);
    (0,_radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_17__/* .useFocusGuards */ .Oh)();
    const focusFirst = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((candidates)=>{
        const [firstItem, ...restItems] = getItems().map((item)=>item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates){
            if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
            candidate?.scrollIntoView({
                block: "nearest"
            });
            if (candidate === firstItem && viewport) viewport.scrollTop = 0;
            if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
            candidate?.focus();
            if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
    }, [
        getItems,
        viewport
    ]);
    const focusSelectedItem = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>focusFirst([
            selectedItem,
            content
        ]), [
        focusFirst,
        selectedItem,
        content
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (isPositioned) {
            focusSelectedItem();
        }
    }, [
        isPositioned,
        focusSelectedItem
    ]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (content) {
            let pointerMoveDelta = {
                x: 0,
                y: 0
            };
            const handlePointerMove = /* @__PURE__ */ __name((event)=>{
                pointerMoveDelta = {
                    x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
                    y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
                };
            }, "handlePointerMove");
            const handlePointerUp = /* @__PURE__ */ __name((event)=>{
                if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
                    event.preventDefault();
                } else {
                    if (!event.composedPath().includes(content)) {
                        onOpenChange(false);
                    }
                }
                document.removeEventListener("pointermove", handlePointerMove);
                triggerPointerDownPosRef.current = null;
            }, "handlePointerUp");
            if (triggerPointerDownPosRef.current !== null) {
                document.addEventListener("pointermove", handlePointerMove);
                document.addEventListener("pointerup", handlePointerUp, {
                    capture: true,
                    once: true
                });
            }
            return ()=>{
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp, {
                    capture: true
                });
            };
        }
    }, [
        content,
        onOpenChange,
        triggerPointerDownPosRef
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const close = /* @__PURE__ */ __name(()=>onOpenChange(false), "close");
        window.addEventListener("blur", close);
        window.addEventListener("resize", close);
        return ()=>{
            window.removeEventListener("blur", close);
            window.removeEventListener("resize", close);
        };
    }, [
        onOpenChange
    ]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search)=>{
        const enabledItems = getItems().filter((item)=>!item.disabled);
        const currentItem = enabledItems.find((item)=>item.ref.current === document.activeElement);
        const nextItem = findNextItem(enabledItems, search, currentItem);
        if (nextItem) {
            setTimeout(()=>nextItem.ref.current?.focus());
        }
    });
    const itemRefCallback = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node, value, disabled)=>{
        const isFirstItem = !firstItemFoundRef.current;
        if (isFirstItem) firstItemFoundRef.current = true;
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
            setSelectedItem(node);
            if (isFirstValidItem) firstValidItemFoundRef.current = true;
        } else if (isFirstItem) {
            setSelectedItem(node);
        }
    }, [
        context.value
    ]);
    const handleItemLeave = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>content?.focus(), [
        content
    ]);
    const itemTextRefCallback = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node, value, disabled)=>{
        if (!node) return;
        const isFirstItem = !firstItemTextFoundRef.current;
        if (isFirstItem) firstItemTextFoundRef.current = true;
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
            setSelectedItemText(node);
        } else if (isFirstItem) {
            setSelectedItemText(node);
        }
    }, [
        context.value
    ]);
    const SelectPosition = position === Position.Popper ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        hideWhenDetached,
        avoidCollisions
    } : {};
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectContentProvider, {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_remove_scroll__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
            as: Slot,
            allowPinchZoom: true,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_19__/* .FocusScope */ .n1, {
                asChild: true,
                trapped: context.open,
                onMountAutoFocus: (event)=>{
                    event.preventDefault();
                },
                onUnmountAutoFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(onCloseAutoFocus, (event)=>{
                    context.trigger?.focus({
                        preventScroll: true
                    });
                    event.preventDefault();
                }),
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_20__/* .DismissableLayer */ .qW, {
                    asChild: true,
                    disableOutsidePointerEvents: true,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside: (event)=>event.preventDefault(),
                    onDismiss: ()=>context.onOpenChange(false),
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectPosition, {
                        role: "listbox",
                        id: context.contentId,
                        "data-state": context.open ? "open" : "closed",
                        dir: context.dir,
                        onContextMenu: (event)=>event.preventDefault(),
                        ...contentProps,
                        ...popperContentProps,
                        onPlaced: ()=>setIsPositioned(true),
                        ref: composedRefs,
                        style: {
                            // flex layout so we can place the scroll buttons properly
                            display: "flex",
                            flexDirection: "column",
                            // reset the outline by default as the content MAY get focused
                            outline: "none",
                            ...contentProps.style
                        },
                        onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(contentProps.onKeyDown, (event)=>{
                            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                            if (event.key === "Tab") event.preventDefault();
                            if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                            if ([
                                "ArrowUp",
                                "ArrowDown",
                                "Home",
                                "End"
                            ].includes(event.key)) {
                                const items = getItems().filter((item)=>!item.disabled);
                                let candidateNodes = items.map((item)=>item.ref.current);
                                if ([
                                    "ArrowUp",
                                    "End"
                                ].includes(event.key)) {
                                    candidateNodes = candidateNodes.slice().reverse();
                                }
                                if ([
                                    "ArrowUp",
                                    "ArrowDown"
                                ].includes(event.key)) {
                                    const currentElement = event.target;
                                    const currentIndex = candidateNodes.indexOf(currentElement);
                                    candidateNodes = candidateNodes.slice(currentIndex + 1);
                                }
                                setTimeout(()=>focusFirst(candidateNodes));
                                event.preventDefault();
                            }
                        })
                    })
                })
            })
        })
    });
}, "SelectContentImpl"));
var SelectItemAlignedPosition = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectItemAlignedPosition2(props, forwardedRef) {
    const { __scopeSelect, onPlaced, ...popperProps } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
    const [contentWrapper, setContentWrapper] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [content, setContent] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, setContent);
    const getItems = useCollection(__scopeSelect);
    const shouldExpandOnScrollRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const shouldRepositionRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    const position = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
            const triggerRect = context.trigger.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            const valueNodeRect = context.valueNode.getBoundingClientRect();
            const itemTextRect = selectedItemText.getBoundingClientRect();
            if (context.dir !== Direction.RTL) {
                const itemTextOffset = itemTextRect.left - contentRect.left;
                const left = valueNodeRect.left - itemTextOffset;
                const leftDelta = triggerRect.left - left;
                const minContentWidth = triggerRect.width + leftDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const rightEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedLeft = (0,_radix_ui_number__WEBPACK_IMPORTED_MODULE_21__/* .clamp */ .q)(left, [
                    CONTENT_MARGIN,
                    // Prevents the content from going off the starting edge of the
                    // viewport. It may still go off the ending edge, but this can be
                    // controlled by the user since they may want to manage overflow in a
                    // specific way.
                    // https://github.com/radix-ui/primitives/issues/2049
                    Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.left = clampedLeft + "px";
            } else {
                const itemTextOffset = contentRect.right - itemTextRect.right;
                const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
                const rightDelta = window.innerWidth - triggerRect.right - right;
                const minContentWidth = triggerRect.width + rightDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const leftEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedRight = (0,_radix_ui_number__WEBPACK_IMPORTED_MODULE_21__/* .clamp */ .q)(right, [
                    CONTENT_MARGIN,
                    Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.right = clampedRight + "px";
            }
            const items = getItems();
            const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
            const itemsHeight = viewport.scrollHeight;
            const contentStyles = window.getComputedStyle(content);
            const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
            const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
            const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
            const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
            const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
            const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
            const viewportStyles = window.getComputedStyle(viewport);
            const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
            const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
            const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
            const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
            const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
            const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
            const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
            const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
            const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
            if (willAlignWithoutTopOverflow) {
                const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
                contentWrapper.style.bottom = "0px";
                const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
                const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
                (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
                const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
                contentWrapper.style.height = height + "px";
            } else {
                const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
                contentWrapper.style.top = "0px";
                const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
                (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
                const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
                contentWrapper.style.height = height + "px";
                viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
            }
            contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
            contentWrapper.style.minHeight = minContentHeight + "px";
            contentWrapper.style.maxHeight = availableHeight + "px";
            onPlaced?.();
            requestAnimationFrame(()=>shouldExpandOnScrollRef.current = true);
        }
    }, [
        getItems,
        context.trigger,
        context.valueNode,
        contentWrapper,
        content,
        viewport,
        selectedItem,
        selectedItemText,
        context.dir,
        onPlaced
    ]);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>position(), [
        position
    ]);
    const [contentZIndex, setContentZIndex] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [
        content
    ]);
    const handleScrollButtonChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
        if (node && shouldRepositionRef.current === true) {
            position();
            focusSelectedItem?.();
            shouldRepositionRef.current = false;
        }
    }, [
        position,
        focusSelectedItem
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectViewportProvider, {
        scope: __scopeSelect,
        contentWrapper,
        shouldExpandOnScrollRef,
        onScrollButtonChange: handleScrollButtonChange,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            ref: setContentWrapper,
            style: {
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                zIndex: contentZIndex
            },
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.div, {
                ...popperProps,
                ref: composedRefs,
                style: {
                    // When we get the height of the content, it includes borders. If we were to set
                    // the height without having `boxSizing: 'border-box'` it would be too big.
                    boxSizing: "border-box",
                    // We need to ensure the content doesn't get taller than the wrapper
                    maxHeight: "100%",
                    ...popperProps.style
                }
            })
        })
    });
}, "SelectItemAlignedPosition"));
var SelectPopperPosition = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectPopperPosition2(props, forwardedRef) {
    const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN, ...popperProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_5__/* .Content */ .UC, {
        ...popperScope,
        ...popperProps,
        ref: forwardedRef,
        align,
        collisionPadding,
        style: {
            // Ensure border-box for floating-ui calculations
            boxSizing: "border-box",
            ...popperProps.style,
            // re-namespace exposed content custom properties
            ...{
                "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-select-content-available-width": "var(--radix-popper-available-width)",
                "--radix-select-content-available-height": "var(--radix-popper-available-height)",
                "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
            }
        }
    });
}, "SelectPopperPosition"));
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectViewport2(props, forwardedRef) {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
                },
                nonce
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Slot, {
                scope: __scopeSelect,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.div, {
                    "data-radix-select-viewport": "",
                    role: "presentation",
                    ...viewportProps,
                    ref: composedRefs,
                    style: {
                        // we use position: 'relative' here on the `viewport` so that when we call
                        // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
                        // (independent of the scrollUpButton).
                        position: "relative",
                        flex: 1,
                        // Viewport should only be scrollable in the vertical direction.
                        // This won't work in vertical writing modes, so we'll need to
                        // revisit this if/when that is supported
                        // https://developer.chrome.com/blog/vertical-form-controls
                        overflow: "hidden auto",
                        ...viewportProps.style
                    },
                    onScroll: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(viewportProps.onScroll, (event)=>{
                        const viewport = event.currentTarget;
                        const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
                        if (shouldExpandOnScrollRef?.current && contentWrapper) {
                            const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
                            if (scrolledBy > 0) {
                                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                                const cssHeight = parseFloat(contentWrapper.style.height);
                                const prevHeight = Math.max(cssMinHeight, cssHeight);
                                if (prevHeight < availableHeight) {
                                    const nextHeight = prevHeight + scrolledBy;
                                    const clampedNextHeight = Math.min(availableHeight, nextHeight);
                                    const heightDiff = nextHeight - clampedNextHeight;
                                    contentWrapper.style.height = clampedNextHeight + "px";
                                    if (contentWrapper.style.bottom === "0px") {
                                        viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                                        contentWrapper.style.justifyContent = "flex-end";
                                    }
                                }
                            }
                        }
                        prevScrollTopRef.current = viewport.scrollTop;
                    })
                })
            })
        ]
    });
}, "SelectViewport"));
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = /* @__PURE__ */ /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(/* @__PURE__ */ __name(function SelectGroup2(props, forwardedRef) {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsx(SelectGroupContextProvider, {
        scope: __scopeSelect,
        id: groupId,
        children: /* @__PURE__ */ jsx(Primitive.div, {
            role: "group",
            "aria-labelledby": groupId,
            ...groupProps,
            ref: forwardedRef
        })
    });
}, "SelectGroup"))));
var LABEL_NAME = "SelectLabel";
var SelectLabel = /* @__PURE__ */ /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(/* @__PURE__ */ __name(function SelectLabel2(props, forwardedRef) {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsx(Primitive.div, {
        id: groupContext.id,
        ...labelProps,
        ref: forwardedRef
    });
}, "SelectLabel"))));
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectItem2(props, forwardedRef) {
    const { __scopeSelect, value, disabled = false, textValue: textValueProp, ...itemProps } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const handleItemRefCallback = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_22__/* .useCallbackRef */ .c)((node)=>contentContext.itemRefCallback?.(node, value, disabled));
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, handleItemRefCallback);
    const textId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_8__/* .useId */ .B)();
    const pointerTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("touch");
    function handleSelect(event) {
        context.hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
        context.onUserSelect(value);
        context.onOpenChange(false);
    }
    __name(handleSelect, "handleSelect");
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectItemContextProvider, {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
            setTextValue((prevTextValue)=>prevTextValue || (node?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.ItemSlot, {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.div, {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onFocus, ()=>setIsFocused(true)),
                onBlur: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onBlur, ()=>setIsFocused(false)),
                onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onClick, (event)=>{
                    if (disabled) {
                        return;
                    }
                    if (pointerTypeRef.current !== "mouse") {
                        handleSelect(event);
                    }
                }),
                onPointerUp: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onPointerUp, (event)=>{
                    if (disabled) {
                        return;
                    }
                    if (pointerTypeRef.current === "mouse") {
                        handleSelect(event);
                    }
                }),
                onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onPointerDown, (event)=>{
                    pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onPointerMove, (event)=>{
                    pointerTypeRef.current = event.pointerType;
                    if (disabled) {
                        contentContext.onItemLeave?.();
                    } else if (pointerTypeRef.current === "mouse") {
                        event.currentTarget.focus({
                            preventScroll: true
                        });
                    }
                }),
                onPointerLeave: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onPointerLeave, (event)=>{
                    if (event.currentTarget === document.activeElement) {
                        contentContext.onItemLeave?.();
                    }
                }),
                onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(itemProps.onKeyDown, (event)=>{
                    if (disabled || event.target !== event.currentTarget) {
                        return;
                    }
                    const isTypingAhead = contentContext.searchRef?.current !== "";
                    if (isTypingAhead && event.key === " ") {
                        return;
                    }
                    if (SELECTION_KEYS.includes(event.key)) {
                        handleSelect(event);
                    }
                    if (event.key === " ") {
                        event.preventDefault();
                    }
                })
            })
        })
    });
}, "SelectItem"));
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectItemText2(props, forwardedRef) {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const handleItemTextRefCallback = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_22__/* .useCallbackRef */ .c)((node)=>contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled));
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, setItemTextNode, itemContext.onItemTextChange, handleItemTextRefCallback);
    const textContent = itemTextNode?.textContent;
    const nativeOption = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
            value: itemContext.value,
            disabled: itemContext.disabled,
            children: textContent
        }, itemContext.value), [
        itemContext.disabled,
        itemContext.value,
        textContent
    ]);
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        onNativeOptionAdd(nativeOption);
        return ()=>onNativeOptionRemove(nativeOption);
    }, [
        onNativeOptionAdd,
        onNativeOptionRemove,
        nativeOption
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.span, {
                id: itemContext.textId,
                ...itemTextProps,
                ref: composedRefs
            }),
            itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren && !shouldShowPlaceholder(context.value) ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(itemTextProps.children, context.valueNode) : null
        ]
    });
}, "SelectItemText"));
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function SelectItemIndicator2(props, forwardedRef) {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.span, {
        "aria-hidden": true,
        ...itemIndicatorProps,
        ref: forwardedRef
    }) : null;
}, "SelectItemIndicator"));
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectScrollUpButton2(props, forwardedRef) {
    const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const [canScrollUp, setCanScrollUp] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, viewportContext.onScrollButtonChange);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function() {
                const canScrollUp2 = viewport.scrollTop > 0;
                setCanScrollUp(canScrollUp2);
            };
            var handleScroll = handleScroll2;
            __name(handleScroll2, "handleScroll");
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return ()=>viewport.removeEventListener("scroll", handleScroll2);
        }
    }, [
        contentContext.viewport,
        contentContext.isPositioned
    ]);
    return canScrollUp ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectScrollButtonImpl, {
        ...props,
        ref: composedRefs,
        onAutoScroll: ()=>{
            const { viewport, selectedItem } = contentContext;
            if (viewport && selectedItem) {
                viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
            }
        }
    }) : null;
}, "SelectScrollUpButton"));
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectScrollDownButton2(props, forwardedRef) {
    const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const [canScrollDown, setCanScrollDown] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, viewportContext.onScrollButtonChange);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function() {
                const maxScroll = viewport.scrollHeight - viewport.clientHeight;
                const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
                setCanScrollDown(canScrollDown2);
            };
            var handleScroll = handleScroll2;
            __name(handleScroll2, "handleScroll");
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return ()=>viewport.removeEventListener("scroll", handleScroll2);
        }
    }, [
        contentContext.viewport,
        contentContext.isPositioned
    ]);
    return canScrollDown ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SelectScrollButtonImpl, {
        ...props,
        ref: composedRefs,
        onAutoScroll: ()=>{
            const { viewport, selectedItem } = contentContext;
            if (viewport && selectedItem) {
                viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
            }
        }
    }) : null;
}, "SelectScrollDownButton"));
var SelectScrollButtonImpl = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SelectScrollButtonImpl2(props, forwardedRef) {
    const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
    const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
    const autoScrollTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const getItems = useCollection(__scopeSelect);
    const clearAutoScrollTimer = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        if (autoScrollTimerRef.current !== null) {
            window.clearInterval(autoScrollTimerRef.current);
            autoScrollTimerRef.current = null;
        }
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>clearAutoScrollTimer();
    }, [
        clearAutoScrollTimer
    ]);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        const activeItem = getItems().find((item)=>item.ref.current === document.activeElement);
        activeItem?.ref.current?.scrollIntoView({
            block: "nearest"
        });
    }, [
        getItems
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.div, {
        "aria-hidden": true,
        ...scrollIndicatorProps,
        ref: forwardedRef,
        style: {
            flexShrink: 0,
            ...scrollIndicatorProps.style
        },
        onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(scrollIndicatorProps.onPointerDown, ()=>{
            if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
            }
        }),
        onPointerMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(scrollIndicatorProps.onPointerMove, ()=>{
            contentContext.onItemLeave?.();
            if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
            }
        }),
        onPointerLeave: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_11__/* .composeEventHandlers */ .mK)(scrollIndicatorProps.onPointerLeave, ()=>{
            clearAutoScrollTimer();
        })
    });
}, "SelectScrollButtonImpl"));
var SelectSeparator = /* @__PURE__ */ /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function SelectSeparator2(props, forwardedRef) {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsx(Primitive.div, {
        "aria-hidden": true,
        ...separatorProps,
        ref: forwardedRef
    });
}, "SelectSeparator"))));
var ARROW_NAME = "SelectArrow";
var SelectArrow = /* @__PURE__ */ /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(/* @__PURE__ */ __name(function SelectArrow2(props, forwardedRef) {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return contentContext.position === Position.Popper ? /* @__PURE__ */ jsx(PopperPrimitive.Arrow, {
        ...popperScope,
        ...arrowProps,
        ref: forwardedRef
    }) : null;
}, "SelectArrow"))));
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function SelectBubbleInput2({ __scopeSelect, ...props }, forwardedRef) {
    const context = useSelectContext(BUBBLE_INPUT_NAME, __scopeSelect);
    const { value, onValueChange, required, disabled, name, autoComplete, form, userSelection } = context;
    const { nativeOptions, nativeSelectKey } = context;
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_9__/* .useComposedRefs */ .s)(forwardedRef, ref);
    const selectValue = value ?? "";
    const prevValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(selectValue);
    const handledUserSelectionRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(userSelection);
    const isDispatchingUserSelectionRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hasEmptyValueOption = Array.from(nativeOptions).some((option)=>(option.props.value ?? "") === "");
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const select = ref.current;
        if (!select) return;
        const selectProto = window.HTMLSelectElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
        const setValue = descriptor.set;
        const isNewUserSelection = userSelection !== null && userSelection !== handledUserSelectionRef.current;
        handledUserSelectionRef.current = userSelection;
        const valueChanged = prevValueRef.current !== selectValue;
        prevValueRef.current = selectValue;
        const isUserInteraction = isNewUserSelection && valueChanged;
        if (isNewUserSelection && !valueChanged && userSelection.value !== selectValue && !userSelection.hasConsumerStoppedPropagation && setValue) {
            isDispatchingUserSelectionRef.current = true;
            try {
                setValue.call(select, userSelection.value);
                select.dispatchEvent(new Event("change", {
                    bubbles: true
                }));
            } finally{
                isDispatchingUserSelectionRef.current = false;
                setValue.call(select, selectValue);
            }
            return;
        }
        const bubbles = isUserInteraction && !userSelection.hasConsumerStoppedPropagation;
        if (valueChanged && setValue) {
            const event = new Event("change", {
                bubbles
            });
            setValue.call(select, selectValue);
            select.dispatchEvent(event);
        }
    }, [
        selectValue,
        userSelection
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__/* .Primitive */ .sG.select, {
        "aria-hidden": true,
        required,
        tabIndex: -1,
        name,
        autoComplete,
        disabled,
        form,
        onChange: (event)=>{
            if (!isDispatchingUserSelectionRef.current) {
                onValueChange(event.target.value);
            }
        },
        ...props,
        style: {
            ..._radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_23__/* .VISUALLY_HIDDEN_STYLES */ .Qg,
            ...props.style
        },
        ref: composedRefs,
        defaultValue: selectValue,
        children: [
            shouldShowPlaceholder(value) && !hasEmptyValueOption ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
                value: ""
            }) : null,
            Array.from(nativeOptions)
        ]
    }, nativeSelectKey);
}, "SelectBubbleInput"));
function isFunction(value) {
    return typeof value === "function";
}
__name(isFunction, "isFunction");
function shouldShowPlaceholder(value) {
    return value === "" || value === void 0;
}
__name(shouldShowPlaceholder, "shouldShowPlaceholder");
function useTypeaheadSearch(onSearchChange) {
    const handleSearchChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_22__/* .useCallbackRef */ .c)(onSearchChange);
    const searchRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("");
    const timerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const handleTypeaheadSearch = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((key)=>{
        const search = searchRef.current + key;
        handleSearchChange(search);
        function updateSearch(value) {
            searchRef.current = value;
            window.clearTimeout(timerRef.current);
            if (value !== "") timerRef.current = window.setTimeout(()=>updateSearch(""), 1e3);
        }
        __name(updateSearch, "updateSearch");
        updateSearch(search);
    }, [
        handleSearchChange
    ]);
    const resetTypeahead = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        searchRef.current = "";
        window.clearTimeout(timerRef.current);
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>window.clearTimeout(timerRef.current);
    }, []);
    return [
        searchRef,
        handleTypeaheadSearch,
        resetTypeahead
    ];
}
__name(useTypeaheadSearch, "useTypeaheadSearch");
function findNextItem(items, search, currentItem) {
    const isRepeated = search.length > 1 && Array.from(search).every((char)=>char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizedSearch.length === 1;
    if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v)=>v !== currentItem);
    const nextItem = wrappedItems.find((item)=>item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
    return nextItem !== currentItem ? nextItem : void 0;
}
__name(findNextItem, "findNextItem");
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
__name(wrapArray, "wrapArray");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 2531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ nonPassive)
/* harmony export */ });
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
                return true;
            },
        });
        // @ts-ignore
        window.addEventListener('test', options, options);
        // @ts-ignore
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
var nonPassive = passiveSupported ? { passive: false } : false;


/***/ }),

/***/ 3925:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ BaseLineElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _utils_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74885);
/* harmony import */ var _shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66080);
/* harmony import */ var _LinePointMarker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31818);
/* __next_internal_client_entry_do_not_use__ BaseLineElement auto */ 




const DRAW_ANIMATION_MS = 600;
function BaseLineElement({ elementInfo, animate }) {
    const { shadowStyle } = (0,_shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_3__/* .useElementShadow */ .o)(elementInfo.shadow);
    const pathRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [drawComplete, setDrawComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!animate);
    const markerId = `${elementInfo.id}-${(0,react__WEBPACK_IMPORTED_MODULE_1__.useId)().replaceAll(':', '')}`;
    const svgWidth = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const width = Math.abs(elementInfo.start[0] - elementInfo.end[0]);
        return width < 24 ? 24 : width;
    }, [
        elementInfo.start,
        elementInfo.end
    ]);
    const svgHeight = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const height = Math.abs(elementInfo.start[1] - elementInfo.end[1]);
        return height < 24 ? 24 : height;
    }, [
        elementInfo.start,
        elementInfo.end
    ]);
    const lineDashArray = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const size = elementInfo.width;
        if (elementInfo.style === 'dashed') return size <= 8 ? `${size * 5} ${size * 2.5}` : `${size * 5} ${size * 1.5}`;
        if (elementInfo.style === 'dotted') return size <= 8 ? `${size * 1.8} ${size * 1.6}` : `${size * 1.5} ${size * 1.2}`;
        return '0 0';
    }, [
        elementInfo.width,
        elementInfo.style
    ]);
    const path = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils_element_js__WEBPACK_IMPORTED_MODULE_2__/* .getLineElementPath */ .gV)(elementInfo), [
        elementInfo
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!animate) return;
        const pathEl = pathRef.current;
        if (!pathEl) return;
        const length = pathEl.getTotalLength();
        if (length === 0) {
            const t = setTimeout(()=>setDrawComplete(true), 0);
            return ()=>clearTimeout(t);
        }
        pathEl.style.strokeDasharray = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;
        pathEl.style.transition = 'none';
        pathEl.getBoundingClientRect();
        pathEl.style.transition = `stroke-dashoffset ${DRAW_ANIMATION_MS}ms ease-out`;
        pathEl.style.strokeDashoffset = '0';
        const timer = setTimeout(()=>{
            pathEl.style.transition = 'none';
            pathEl.style.strokeDasharray = '';
            pathEl.style.strokeDashoffset = '';
            setDrawComplete(true);
        }, DRAW_ANIMATION_MS + 50);
        return ()=>clearTimeout(timer);
    }, [
        animate
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-line",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "element-content",
            style: {
                position: 'relative',
                width: '100%',
                height: '100%',
                filter: shadowStyle ? `drop-shadow(${shadowStyle})` : ''
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                overflow: "visible",
                width: svgWidth,
                height: svgHeight,
                style: {
                    transformOrigin: '0 0',
                    overflow: 'visible'
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                        children: [
                            elementInfo.points[0] && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LinePointMarker_js__WEBPACK_IMPORTED_MODULE_4__/* .LinePointMarker */ .P, {
                                id: markerId,
                                position: "start",
                                type: elementInfo.points[0],
                                color: elementInfo.color,
                                baseSize: elementInfo.width
                            }),
                            elementInfo.points[1] && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LinePointMarker_js__WEBPACK_IMPORTED_MODULE_4__/* .LinePointMarker */ .P, {
                                id: markerId,
                                position: "end",
                                type: elementInfo.points[1],
                                color: elementInfo.color,
                                baseSize: elementInfo.width
                            })
                        ]
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                        ref: pathRef,
                        d: path,
                        stroke: elementInfo.color,
                        strokeWidth: elementInfo.width,
                        strokeDasharray: lineDashArray,
                        fill: "none",
                        markerStart: drawComplete && elementInfo.points[0] ? `url(#${markerId}-${elementInfo.points[0]}-start)` : '',
                        markerEnd: drawComplete && elementInfo.points[1] ? `url(#${markerId}-${elementInfo.points[1]}-end)` : ''
                    })
                ]
            })
        })
    });
}
 //# sourceMappingURL=BaseLineElement.js.map


/***/ }),

/***/ 4667:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   aJ: () => (/* binding */ findElementGeometry)
/* harmony export */ });
/* unused harmony exports findNearestCorner, getElementPercentageGeometry */
function getElementPercentageGeometry(element, viewportSize = 1000, viewportRatio = 0.5625) {
    if (!('left' in element) ||
        !('top' in element) ||
        !('width' in element) ||
        !('height' in element)) {
        return null;
    }
    const { left, top, width, height } = element;
    const x = (left / viewportSize) * 100;
    const y = (top / (viewportSize * viewportRatio)) * 100;
    const w = (width / viewportSize) * 100;
    const h = (height / (viewportSize * viewportRatio)) * 100;
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    return { x, y, w, h, centerX, centerY };
}
function findElementGeometry(elements, elementId, viewportSize = 1000, viewportRatio = 0.5625) {
    const element = elements.find((el) => el.id === elementId);
    if (!element)
        return null;
    return getElementPercentageGeometry(element, viewportSize, viewportRatio);
}
function findNearestCorner(geometry) {
    const { centerX, centerY } = geometry;
    const corners = [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
    ];
    let minDistance = Infinity;
    let nearestCorner = corners[0];
    for (const corner of corners) {
        const distance = Math.sqrt(Math.pow(corner.x - centerX, 2) + Math.pow(corner.y - centerY, 2));
        if (distance < minDistance) {
            minDistance = distance;
            nearestCorner = corner;
        }
    }
    return nearestCorner;
}


//# sourceMappingURL=geometry.js.map


/***/ }),

/***/ 4761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T0: () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.T)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47206);
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14532);





/***/ }),

/***/ 5045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Brain)
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
    name: "brain",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 18V5",
                key: "adv99a"
            }
        ],
        [
            "path",
            {
                d: "M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4",
                key: "5nuw1p"
            }
        ],
        [
            "path",
            {
                d: "M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294",
                key: "18ldcf"
            }
        ],
        [
            "path",
            {
                d: "M17.996 5.125a4 4 0 012.526 5.77",
                key: "1sdu8q"
            }
        ],
        [
            "path",
            {
                d: "M18 18a4 4 0 002-7.465",
                key: "7xqqvr"
            }
        ],
        [
            "path",
            {
                d: "M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517",
                key: "t46ysz"
            }
        ],
        [
            "path",
            {
                d: "M6 18a4 4 0 01-2-7.465",
                key: "1y2m15"
            }
        ],
        [
            "path",
            {
                d: "M6.004 5.125a4 4 0 00-2.526 5.77",
                key: "3cw1ss"
            }
        ]
    ]
};
__iconData.node;
const Brain = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=brain.mjs.map


/***/ }),

/***/ 7015:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YY: () => (/* reexport safe */ _SlideCanvas_js__WEBPACK_IMPORTED_MODULE_0__.Y)
/* harmony export */ });
/* harmony import */ var _SlideCanvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98082);
/* harmony import */ var _SlideElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40342);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34160);
/* harmony import */ var _effects_HighlightOverlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40082);
/* harmony import */ var _effects_SpotlightOverlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13926);
/* harmony import */ var _effects_LaserOverlay_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49791);
/* harmony import */ var _effects_ZoomWrapper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(53744);
/* harmony import */ var _hooks_useSlideBackgroundStyle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10641);
/* harmony import */ var _hooks_useViewportSize_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35820);
/* harmony import */ var _utils_element_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(74885);
/* harmony import */ var _utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18180);















//# sourceMappingURL=index.js.map


/***/ }),

/***/ 7391:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ SVGPathDataTransformer)
/* harmony export */ });
/* harmony import */ var _mathUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23422);
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60292);
/* harmony import */ var _transformers_remove_collinear_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93024);
/* harmony import */ var _transformers_reverse_path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79108);
/* eslint @typescript-eslint/no-explicit-any:0 */
// Transform SVG PathData
// http://www.w3.org/TR/SVG/paths.html#PathDataBNF




// Predefined transforming functions
// Rounds commands values
function ROUND(roundVal = 1e13) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(roundVal);
    function rf(val) {
        return Math.round(val * roundVal) / roundVal;
    }
    return function round(command) {
        if ('x1' in command && 'undefined' !== typeof command.x1) {
            command.x1 = rf(command.x1);
        }
        if ('y1' in command && 'undefined' !== typeof command.y1) {
            command.y1 = rf(command.y1);
        }
        if ('x2' in command && 'undefined' !== typeof command.x2) {
            command.x2 = rf(command.x2);
        }
        if ('y2' in command && 'undefined' !== typeof command.y2) {
            command.y2 = rf(command.y2);
        }
        if ('x' in command && 'undefined' !== typeof command.x) {
            command.x = rf(command.x);
        }
        if ('y' in command && 'undefined' !== typeof command.y) {
            command.y = rf(command.y);
        }
        if ('rX' in command && 'undefined' !== typeof command.rX) {
            command.rX = rf(command.rX);
        }
        if ('rY' in command && 'undefined' !== typeof command.rY) {
            command.rY = rf(command.rY);
        }
        return command;
    };
}
// Relative to absolute commands
function TO_ABS() {
    return INFO((command, prevX, prevY) => {
        if (command.relative) {
            // x1/y1 values
            if ('undefined' !== typeof command.x1) {
                command.x1 += prevX;
            }
            if ('undefined' !== typeof command.y1) {
                command.y1 += prevY;
            }
            // x2/y2 values
            if ('undefined' !== typeof command.x2) {
                command.x2 += prevX;
            }
            if ('undefined' !== typeof command.y2) {
                command.y2 += prevY;
            }
            // Finally x/y values
            if ('undefined' !== typeof command.x) {
                command.x += prevX;
            }
            if ('undefined' !== typeof command.y) {
                command.y += prevY;
            }
            command.relative = false;
        }
        return command;
    });
}
// Absolute to relative commands
function TO_REL() {
    return INFO((command, prevX, prevY) => {
        if (!command.relative) {
            // x1/y1 values
            if ('undefined' !== typeof command.x1) {
                command.x1 -= prevX;
            }
            if ('undefined' !== typeof command.y1) {
                command.y1 -= prevY;
            }
            // x2/y2 values
            if ('undefined' !== typeof command.x2) {
                command.x2 -= prevX;
            }
            if ('undefined' !== typeof command.y2) {
                command.y2 -= prevY;
            }
            // Finally x/y values
            if ('undefined' !== typeof command.x) {
                command.x -= prevX;
            }
            if ('undefined' !== typeof command.y) {
                command.y -= prevY;
            }
            command.relative = true;
        }
        return command;
    });
}
// Convert H, V, Z, A with rX = 0, and straight Bezier curves to L
function NORMALIZE_HVZ(normalizeZ = true, normalizeH = true, normalizeV = true, normalizeC = true) {
    return INFO((command, prevX, prevY, pathStartX, pathStartY) => {
        if (isNaN(pathStartX) && !(command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.MOVE_TO)) {
            throw new Error('path must start with moveto');
        }
        if (normalizeH && command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.HORIZ_LINE_TO) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            command.y = command.relative ? 0 : prevY;
        }
        if (normalizeV && command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.VERT_LINE_TO) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            command.x = command.relative ? 0 : prevX;
        }
        if (normalizeZ && command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CLOSE_PATH) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            command.x = command.relative ? pathStartX - prevX : pathStartX;
            command.y = command.relative ? pathStartY - prevY : pathStartY;
        }
        // Handle degenerate arcs
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.ARC &&
            (0 === command.rX || 0 === command.rY)) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            delete command.rX;
            delete command.rY;
            delete command.xRot;
            delete command.lArcFlag;
            delete command.sweepFlag;
        }
        // Check for quad curves that are lines
        if (normalizeC && command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO) {
            const startPoint = [prevX, prevY];
            const controlPoint = command.relative
                ? [prevX + command.x1, prevY + command.y1]
                : [command.x1, command.y1];
            const endPoint = command.relative
                ? [prevX + command.x, prevY + command.y]
                : [command.x, command.y];
            if ((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .arePointsCollinear */ .vR)(startPoint, controlPoint, endPoint)) {
                command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
                // Keep the endpoint
                delete command.x1;
                delete command.y1;
            }
        }
        // Check for cubic curves that are lines
        if (normalizeC && command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO) {
            const startPoint = [prevX, prevY];
            const control1 = command.relative
                ? [prevX + command.x1, prevY + command.y1]
                : [command.x1, command.y1];
            const control2 = command.relative
                ? [prevX + command.x2, prevY + command.y2]
                : [command.x2, command.y2];
            const endPoint = command.relative
                ? [prevX + command.x, prevY + command.y]
                : [command.x, command.y];
            // All points need to be collinear
            if ((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .arePointsCollinear */ .vR)(startPoint, control1, endPoint) &&
                (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .arePointsCollinear */ .vR)(startPoint, control2, endPoint)) {
                command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
                // Keep the endpoint
                delete command.x1;
                delete command.y1;
                delete command.x2;
                delete command.y2;
            }
        }
        return command;
    });
}
/*
 * Transforms smooth curves and quads to normal curves and quads (SsTt to CcQq)
 */
function NORMALIZE_ST() {
    let prevCurveC2X = NaN;
    let prevCurveC2Y = NaN;
    let prevQuadCX = NaN;
    let prevQuadCY = NaN;
    return INFO((command, prevX, prevY) => {
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_CURVE_TO) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO;
            prevCurveC2X = isNaN(prevCurveC2X) ? prevX : prevCurveC2X;
            prevCurveC2Y = isNaN(prevCurveC2Y) ? prevY : prevCurveC2Y;
            command.x1 = command.relative
                ? prevX - prevCurveC2X
                : 2 * prevX - prevCurveC2X;
            command.y1 = command.relative
                ? prevY - prevCurveC2Y
                : 2 * prevY - prevCurveC2Y;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO) {
            prevCurveC2X = command.relative ? prevX + command.x2 : command.x2;
            prevCurveC2Y = command.relative ? prevY + command.y2 : command.y2;
        }
        else {
            prevCurveC2X = NaN;
            prevCurveC2Y = NaN;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO;
            prevQuadCX = isNaN(prevQuadCX) ? prevX : prevQuadCX;
            prevQuadCY = isNaN(prevQuadCY) ? prevY : prevQuadCY;
            command.x1 = command.relative
                ? prevX - prevQuadCX
                : 2 * prevX - prevQuadCX;
            command.y1 = command.relative
                ? prevY - prevQuadCY
                : 2 * prevY - prevQuadCY;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO) {
            prevQuadCX = command.relative ? prevX + command.x1 : command.x1;
            prevQuadCY = command.relative ? prevY + command.y1 : command.y1;
        }
        else {
            prevQuadCX = NaN;
            prevQuadCY = NaN;
        }
        return command;
    });
}
/*
 * A quadratic bézier curve can be represented by a cubic bézier curve which has
 * the same end points as the quadratic and both control points in place of the
 * quadratic"s one.
 *
 * This transformer replaces QqTt commands with Cc commands respectively.
 * This is useful for reading path data into a system which only has a
 * representation for cubic curves.
 */
function QT_TO_C() {
    let prevQuadX1 = NaN;
    let prevQuadY1 = NaN;
    return INFO((command, prevX, prevY) => {
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO;
            prevQuadX1 = isNaN(prevQuadX1) ? prevX : prevQuadX1;
            prevQuadY1 = isNaN(prevQuadY1) ? prevY : prevQuadY1;
            command.x1 = command.relative
                ? prevX - prevQuadX1
                : 2 * prevX - prevQuadX1;
            command.y1 = command.relative
                ? prevY - prevQuadY1
                : 2 * prevY - prevQuadY1;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO) {
            prevQuadX1 = command.relative ? prevX + command.x1 : command.x1;
            prevQuadY1 = command.relative ? prevY + command.y1 : command.y1;
            const x1 = command.x1;
            const y1 = command.y1;
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO;
            command.x1 = ((command.relative ? 0 : prevX) + x1 * 2) / 3;
            command.y1 = ((command.relative ? 0 : prevY) + y1 * 2) / 3;
            command.x2 = (command.x + x1 * 2) / 3;
            command.y2 = (command.y + y1 * 2) / 3;
        }
        else {
            prevQuadX1 = NaN;
            prevQuadY1 = NaN;
        }
        return command;
    });
}
function INFO(f) {
    let prevXAbs = 0;
    let prevYAbs = 0;
    let pathStartXAbs = NaN;
    let pathStartYAbs = NaN;
    return function transform(command) {
        if (isNaN(pathStartXAbs) && !(command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.MOVE_TO)) {
            throw new Error('path must start with moveto');
        }
        const result = f(command, prevXAbs, prevYAbs, pathStartXAbs, pathStartYAbs);
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CLOSE_PATH) {
            prevXAbs = pathStartXAbs;
            prevYAbs = pathStartYAbs;
        }
        if ('x' in command && 'undefined' !== typeof command.x) {
            prevXAbs = command.relative ? prevXAbs + command.x : command.x;
        }
        if ('y' in command && 'undefined' !== typeof command.y) {
            prevYAbs = command.relative ? prevYAbs + command.y : command.y;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.MOVE_TO) {
            pathStartXAbs = prevXAbs;
            pathStartYAbs = prevYAbs;
        }
        return result;
    };
}
/*
 * remove 0-length segments
 */
function SANITIZE(EPS = 0) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(EPS);
    let prevCurveC2X = NaN;
    let prevCurveC2Y = NaN;
    let prevQuadCX = NaN;
    let prevQuadCY = NaN;
    return INFO((command, prevX, prevY, pathStartX, pathStartY) => {
        const abs = Math.abs;
        let skip = false;
        let x1Rel = 0;
        let y1Rel = 0;
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_CURVE_TO) {
            x1Rel = isNaN(prevCurveC2X) ? 0 : prevX - prevCurveC2X;
            y1Rel = isNaN(prevCurveC2Y) ? 0 : prevY - prevCurveC2Y;
        }
        if (command.type & (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO | _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_CURVE_TO)) {
            prevCurveC2X = command.relative ? prevX + command.x2 : command.x2;
            prevCurveC2Y = command.relative ? prevY + command.y2 : command.y2;
        }
        else {
            prevCurveC2X = NaN;
            prevCurveC2Y = NaN;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
            prevQuadCX = isNaN(prevQuadCX) ? prevX : 2 * prevX - prevQuadCX;
            prevQuadCY = isNaN(prevQuadCY) ? prevY : 2 * prevY - prevQuadCY;
        }
        else if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO) {
            prevQuadCX = command.relative ? prevX + command.x1 : command.x1;
            prevQuadCY = command.relative ? prevY + command.y1 : command.y2;
        }
        else {
            prevQuadCX = NaN;
            prevQuadCY = NaN;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_COMMANDS ||
            (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.ARC &&
                (0 === command.rX || 0 === command.rY || !command.lArcFlag)) ||
            command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO ||
            command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_CURVE_TO ||
            command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.QUAD_TO ||
            command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
            const xRel = 'undefined' === typeof command.x
                ? 0
                : command.relative
                    ? command.x
                    : command.x - prevX;
            const yRel = 'undefined' === typeof command.y
                ? 0
                : command.relative
                    ? command.y
                    : command.y - prevY;
            x1Rel = !isNaN(prevQuadCX)
                ? prevQuadCX - prevX
                : 'undefined' === typeof command.x1
                    ? x1Rel
                    : command.relative
                        ? command.x
                        : command.x1 - prevX;
            y1Rel = !isNaN(prevQuadCY)
                ? prevQuadCY - prevY
                : 'undefined' === typeof command.y1
                    ? y1Rel
                    : command.relative
                        ? command.y
                        : command.y1 - prevY;
            const x2Rel = 'undefined' === typeof command.x2
                ? 0
                : command.relative
                    ? command.x
                    : command.x2 - prevX;
            const y2Rel = 'undefined' === typeof command.y2
                ? 0
                : command.relative
                    ? command.y
                    : command.y2 - prevY;
            if (abs(xRel) <= EPS &&
                abs(yRel) <= EPS &&
                abs(x1Rel) <= EPS &&
                abs(y1Rel) <= EPS &&
                abs(x2Rel) <= EPS &&
                abs(y2Rel) <= EPS) {
                skip = true;
            }
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CLOSE_PATH) {
            if (abs(prevX - pathStartX) <= EPS && abs(prevY - pathStartY) <= EPS) {
                skip = true;
            }
        }
        return skip ? [] : command;
    });
}
// SVG Transforms : http://www.w3.org/TR/SVGTiny12/coords.html#TransformList
// Matrix : http://apike.ca/prog_svg_transform.html
// a c e
// b d f
function MATRIX(a, b, c, d, e, f) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(a, b, c, d, e, f);
    return INFO((command, prevX, prevY, pathStartX) => {
        const origX1 = command.x1;
        const origX2 = command.x2;
        // if isNaN(pathStartX), then this is the first command, which is ALWAYS an
        // absolute MOVE_TO, regardless what the relative flag says
        const comRel = command.relative && !isNaN(pathStartX);
        const x = 'undefined' !== typeof command.x ? command.x : comRel ? 0 : prevX;
        const y = 'undefined' !== typeof command.y ? command.y : comRel ? 0 : prevY;
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.HORIZ_LINE_TO && 0 !== b) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            command.y = command.relative ? 0 : prevY;
        }
        if (command.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.VERT_LINE_TO && 0 !== c) {
            command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
            command.x = command.relative ? 0 : prevX;
        }
        if ('undefined' !== typeof command.x) {
            command.x = command.x * a + y * c + (comRel ? 0 : e);
        }
        if ('undefined' !== typeof command.y) {
            command.y = x * b + command.y * d + (comRel ? 0 : f);
        }
        if ('undefined' !== typeof command.x1) {
            command.x1 = command.x1 * a + command.y1 * c + (comRel ? 0 : e);
        }
        if ('undefined' !== typeof command.y1) {
            command.y1 = origX1 * b + command.y1 * d + (comRel ? 0 : f);
        }
        if ('undefined' !== typeof command.x2) {
            command.x2 = command.x2 * a + command.y2 * c + (comRel ? 0 : e);
        }
        if ('undefined' !== typeof command.y2) {
            command.y2 = origX2 * b + command.y2 * d + (comRel ? 0 : f);
        }
        function sqr(x) {
            return x * x;
        }
        const det = a * d - b * c;
        if ('undefined' !== typeof command.xRot) {
            // Skip if this is a pure translation
            if (1 !== a || 0 !== b || 0 !== c || 1 !== d) {
                // Special case for singular matrix
                if (0 === det) {
                    // In the singular case, the arc is compressed to a line. The actual geometric image of the original
                    // curve under this transform possibly extends beyond the starting and/or ending points of the segment, but
                    // for simplicity we ignore this detail and just replace this command with a single line segment.
                    delete command.rX;
                    delete command.rY;
                    delete command.xRot;
                    delete command.lArcFlag;
                    delete command.sweepFlag;
                    command.type = _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO;
                }
                else {
                    // Convert to radians
                    const xRot = (command.xRot * Math.PI) / 180;
                    // Convert rotated ellipse to general conic form
                    // x0^2/rX^2 + y0^2/rY^2 - 1 = 0
                    // x0 = x*cos(xRot) + y*sin(xRot)
                    // y0 = -x*sin(xRot) + y*cos(xRot)
                    // --> A*x^2 + B*x*y + C*y^2 - 1 = 0, where
                    const sinRot = Math.sin(xRot);
                    const cosRot = Math.cos(xRot);
                    const xCurve = 1 / sqr(command.rX);
                    const yCurve = 1 / sqr(command.rY);
                    const A = sqr(cosRot) * xCurve + sqr(sinRot) * yCurve;
                    const B = 2 * sinRot * cosRot * (xCurve - yCurve);
                    const C = sqr(sinRot) * xCurve + sqr(cosRot) * yCurve;
                    // Apply matrix to A*x^2 + B*x*y + C*y^2 - 1 = 0
                    // x1 = a*x + c*y
                    // y1 = b*x + d*y
                    //      (we can ignore e and f, since pure translations don"t affect the shape of the ellipse)
                    // --> A1*x1^2 + B1*x1*y1 + C1*y1^2 - det^2 = 0, where
                    const A1 = A * d * d - B * b * d + C * b * b;
                    const B1 = B * (a * d + b * c) - 2 * (A * c * d + C * a * b);
                    const C1 = A * c * c - B * a * c + C * a * a;
                    // Unapply newXRot to get back to axis-aligned ellipse equation
                    // x1 = x2*cos(newXRot) - y2*sin(newXRot)
                    // y1 = x2*sin(newXRot) + y2*cos(newXRot)
                    // A1*x1^2 + B1*x1*y1 + C1*y1^2 - det^2 =
                    //   x2^2*(A1*cos(newXRot)^2 + B1*sin(newXRot)*cos(newXRot) + C1*sin(newXRot)^2)
                    //   + x2*y2*(2*(C1 - A1)*sin(newXRot)*cos(newXRot) + B1*(cos(newXRot)^2 - sin(newXRot)^2))
                    //   + y2^2*(A1*sin(newXRot)^2 - B1*sin(newXRot)*cos(newXRot) + C1*cos(newXRot)^2)
                    //   (which must have the same zeroes as)
                    // x2^2/newRX^2 + y2^2/newRY^2 - 1
                    //   (so we have)
                    // 2*(C1 - A1)*sin(newXRot)*cos(newXRot) + B1*(cos(newXRot)^2 - sin(newXRot)^2) = 0
                    // (A1 - C1)*sin(2*newXRot) = B1*cos(2*newXRot)
                    // 2*newXRot = atan2(B1, A1 - C1)
                    const newXRot = ((Math.atan2(B1, A1 - C1) + Math.PI) % Math.PI) / 2;
                    // For any integer n, (atan2(B1, A1 - C1) + n*pi)/2 is a solution to the above; incrementing n just swaps
                    // the x and y radii computed below (since that"s what rotating an ellipse by pi/2 does).  Choosing the
                    // rotation between 0 and pi/2 eliminates the ambiguity and leads to more predictable output.
                    // Finally, we get newRX and newRY from the same-zeroes relationship that gave us newXRot
                    const newSinRot = Math.sin(newXRot);
                    const newCosRot = Math.cos(newXRot);
                    command.rX =
                        Math.abs(det) /
                            Math.sqrt(A1 * sqr(newCosRot) +
                                B1 * newSinRot * newCosRot +
                                C1 * sqr(newSinRot));
                    command.rY =
                        Math.abs(det) /
                            Math.sqrt(A1 * sqr(newSinRot) -
                                B1 * newSinRot * newCosRot +
                                C1 * sqr(newCosRot));
                    command.xRot = (newXRot * 180) / Math.PI;
                }
            }
        }
        // sweepFlag needs to be inverted when mirroring shapes
        // see http://www.itk.ilstu.edu/faculty/javila/SVG/SVG_drawing1/elliptical_curve.htm
        // m 65,10 a 50,25 0 1 0 50,25
        // M 65,60 A 50,25 0 1 1 115,35
        if ('undefined' !== typeof command.sweepFlag && 0 > det) {
            command.sweepFlag = +!command.sweepFlag;
        }
        return command;
    });
}
function ROTATE(a, x = 0, y = 0) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(a, x, y);
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    return MATRIX(cos, sin, -sin, cos, x - x * cos + y * sin, y - x * sin - y * cos);
}
function TRANSLATE(dX, dY = 0) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(dX, dY);
    return MATRIX(1, 0, 0, 1, dX, dY);
}
function SCALE(dX, dY = dX) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(dX, dY);
    return MATRIX(dX, 0, 0, dY, 0, 0);
}
function SKEW_X(a) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(a);
    return MATRIX(1, 0, Math.tan(a), 1, 0, 0);
}
function SKEW_Y(a) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(a);
    return MATRIX(1, Math.tan(a), 0, 1, 0, 0);
}
function X_AXIS_SYMMETRY(xOffset = 0) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(xOffset);
    return MATRIX(-1, 0, 0, 1, xOffset, 0);
}
function Y_AXIS_SYMMETRY(yOffset = 0) {
    (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertNumbers */ .Pe)(yOffset);
    return MATRIX(1, 0, 0, -1, 0, yOffset);
}
// Convert arc commands to curve commands
function A_TO_C() {
    return INFO((command, prevX, prevY) => {
        if (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.ARC === command.type) {
            return (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .a2c */ .j8)(command, command.relative ? 0 : prevX, command.relative ? 0 : prevY);
        }
        return command;
    });
}
// @see annotateArcCommand
function ANNOTATE_ARCS() {
    return INFO((c, x1, y1) => {
        if (c.relative) {
            x1 = 0;
            y1 = 0;
        }
        if (_SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.ARC === c.type) {
            (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .annotateArcCommand */ .qc)(c, x1, y1);
        }
        return c;
    });
}
function CLONE() {
    return (c) => {
        return { ...c };
    };
}
// @see annotateArcCommand
function CALCULATE_BOUNDS() {
    const clone = CLONE();
    const toAbs = TO_ABS();
    const qtToC = QT_TO_C();
    const normST = NORMALIZE_ST();
    const f = INFO((command, prevXAbs, prevYAbs) => {
        const c = normST(qtToC(toAbs(clone(command))));
        function fixX(absX) {
            if (absX > f.maxX) {
                f.maxX = absX;
            }
            if (absX < f.minX) {
                f.minX = absX;
            }
        }
        function fixY(absY) {
            if (absY > f.maxY) {
                f.maxY = absY;
            }
            if (absY < f.minY) {
                f.minY = absY;
            }
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.DRAWING_COMMANDS) {
            fixX(prevXAbs);
            fixY(prevYAbs);
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.HORIZ_LINE_TO) {
            fixX(c.x);
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.VERT_LINE_TO) {
            fixY(c.y);
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.LINE_TO) {
            fixX(c.x);
            fixY(c.y);
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.CURVE_TO) {
            // add start and end points
            fixX(c.x);
            fixY(c.y);
            const xDerivRoots = (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .bezierRoot */ .CN)(prevXAbs, c.x1, c.x2, c.x);
            for (const derivRoot of xDerivRoots) {
                if (0 < derivRoot && 1 > derivRoot) {
                    fixX((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .bezierAt */ .v2)(prevXAbs, c.x1, c.x2, c.x, derivRoot));
                }
            }
            const yDerivRoots = (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .bezierRoot */ .CN)(prevYAbs, c.y1, c.y2, c.y);
            for (const derivRoot of yDerivRoots) {
                if (0 < derivRoot && 1 > derivRoot) {
                    fixY((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .bezierAt */ .v2)(prevYAbs, c.y1, c.y2, c.y, derivRoot));
                }
            }
        }
        if (c.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathData */ .L.ARC) {
            // add start and end points
            fixX(c.x);
            fixY(c.y);
            (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .annotateArcCommand */ .qc)(c, prevXAbs, prevYAbs);
            // p = cos(phi) * xv + sin(phi) * yv
            // dp = -sin(phi) * xv + cos(phi) * yv = 0
            const xRotRad = (c.xRot / 180) * Math.PI;
            // points on ellipse for phi = 0° and phi = 90°
            const x0 = Math.cos(xRotRad) * c.rX;
            const y0 = Math.sin(xRotRad) * c.rX;
            const x90 = -Math.sin(xRotRad) * c.rY;
            const y90 = Math.cos(xRotRad) * c.rY;
            // annotateArcCommand returns phi1 and phi2 such that -180° < phi1 < 180° and phi2 is smaller or greater
            // depending on the sweep flag. Calculate phiMin, phiMax such that -180° < phiMin < 180° and phiMin < phiMax
            const [phiMin, phiMax] = c.phi1 < c.phi2
                ? [c.phi1, c.phi2]
                : -180 > c.phi2
                    ? [c.phi2 + 360, c.phi1 + 360]
                    : [c.phi2, c.phi1];
            const normalizeXiEta = ([xi, eta]) => {
                const phiRad = Math.atan2(eta, xi);
                const phi = (phiRad * 180) / Math.PI;
                return phi < phiMin ? phi + 360 : phi;
            };
            // xi = cos(phi), eta = sin(phi)
            const xDerivRoots = (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .intersectionUnitCircleLine */ .YN)(x90, -x0, 0).map(normalizeXiEta);
            for (const derivRoot of xDerivRoots) {
                if (derivRoot > phiMin && derivRoot < phiMax) {
                    fixX((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .arcAt */ .Us)(c.cX, x0, x90, derivRoot));
                }
            }
            const yDerivRoots = (0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .intersectionUnitCircleLine */ .YN)(y90, -y0, 0).map(normalizeXiEta);
            for (const derivRoot of yDerivRoots) {
                if (derivRoot > phiMin && derivRoot < phiMax) {
                    fixY((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__/* .arcAt */ .Us)(c.cY, y0, y90, derivRoot));
                }
            }
        }
        return command;
    });
    f.minX = Infinity;
    f.maxX = -Infinity;
    f.minY = Infinity;
    f.maxY = -Infinity;
    return f;
}
const SVGPathDataTransformer = {
    ROUND,
    TO_ABS,
    TO_REL,
    NORMALIZE_HVZ,
    NORMALIZE_ST,
    QT_TO_C,
    INFO,
    SANITIZE,
    MATRIX,
    ROTATE,
    TRANSLATE,
    SCALE,
    SKEW_X,
    SKEW_Y,
    X_AXIS_SYMMETRY,
    Y_AXIS_SYMMETRY,
    A_TO_C,
    ANNOTATE_ARCS,
    CLONE,
    CALCULATE_BOUNDS,
    REVERSE_PATH: _transformers_reverse_path_js__WEBPACK_IMPORTED_MODULE_3__/* .REVERSE_PATH */ .F,
    REMOVE_COLLINEAR: _transformers_remove_collinear_js__WEBPACK_IMPORTED_MODULE_2__/* .REMOVE_COLLINEAR */ .d,
};
//# sourceMappingURL=SVGPathDataTransformer.js.map

/***/ }),

/***/ 7837:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ BaseImageElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66080);
/* harmony import */ var _shared_useElementFlip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503);
/* harmony import */ var _useClipImage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33229);
/* harmony import */ var _useFilter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66568);
/* harmony import */ var _ImageOutline_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17682);
/* __next_internal_client_entry_do_not_use__ BaseImageElement auto */ 





function BaseImageElement({ elementInfo, renderImage }) {
    const { shadowStyle } = (0,_shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_1__/* .useElementShadow */ .o)(elementInfo.shadow);
    const { flipStyle } = (0,_shared_useElementFlip_js__WEBPACK_IMPORTED_MODULE_2__/* .useElementFlip */ .L)(elementInfo.flipH, elementInfo.flipV);
    const { clipShape, imgPosition } = (0,_useClipImage_js__WEBPACK_IMPORTED_MODULE_3__/* .useClipImage */ .l)(elementInfo);
    const { filter } = (0,_useFilter_js__WEBPACK_IMPORTED_MODULE_4__/* .useFilter */ .U)(elementInfo.filters);
    const src = elementInfo.src;
    // Soft-edge feather (a:softEdge): fade the image alpha to transparent over
    // `softEdge` px at every edge. Two intersecting linear-gradient masks feather
    // all four sides (corners get both). html2canvas-pro ignores CSS masks, so
    // slideToPng bakes the same feather into pixels via the data-soft-edge hook.
    const softEdge = elementInfo.softEdge && elementInfo.softEdge > 0 ? elementInfo.softEdge : undefined;
    const softEdgeMaskStyle = softEdge ? (()=>{
        const grad = (dir)=>`linear-gradient(${dir}, transparent 0, #000 ${softEdge}px, #000 calc(100% - ${softEdge}px), transparent 100%)`;
        const mask = `${grad('to right')}, ${grad('to bottom')}`;
        return {
            maskImage: mask,
            WebkitMaskImage: mask,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
        };
    })() : {};
    const defaultContent = src ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                src: src,
                draggable: false,
                "data-soft-edge": softEdge || undefined,
                // Lazy + async decode: thumbnail surfaces (sidebar, nav rail, course
                // cards) mount far more images than the viewport needs. In-viewport
                // images are unaffected — the browser fetches them immediately.
                // slideToPng forces these back to eager in its off-screen tree.
                loading: "lazy",
                decoding: "async",
                style: {
                    position: 'absolute',
                    top: imgPosition.top,
                    left: imgPosition.left,
                    width: imgPosition.width,
                    height: imgPosition.height,
                    maxWidth: 'none',
                    maxHeight: 'none',
                    filter,
                    ...softEdgeMaskStyle
                },
                alt: "",
                onDragStart: (e)=>e.preventDefault()
            }),
            elementInfo.colorMask && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: elementInfo.colorMask
                }
            })
        ]
    }) : null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-image element-content",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '',
                    transform: flipStyle
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ImageOutline_js__WEBPACK_IMPORTED_MODULE_5__/* .ImageOutline */ .E, {
                        elementInfo: elementInfo
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            clipPath: clipShape.style,
                            pointerEvents: renderImage ? 'auto' : undefined
                        },
                        children: renderImage ? renderImage(elementInfo, src, defaultContent) : defaultContent
                    })
                ]
            })
        })
    });
}
 //# sourceMappingURL=BaseImageElement.js.map


/***/ }),

/***/ 8117:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Presentation)
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
    name: "presentation",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M2 3h20",
                key: "91anmk"
            }
        ],
        [
            "path",
            {
                d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
                key: "2k9sn8"
            }
        ],
        [
            "path",
            {
                d: "m7 21 5-5 5 5",
                key: "bip4we"
            }
        ]
    ]
};
__iconData.node;
const Presentation = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=presentation.mjs.map


/***/ }),

/***/ 8137:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ TransformableSVG)
/* harmony export */ });
/* harmony import */ var _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7391);

class TransformableSVG {
    round(x) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.ROUND(x));
    }
    toAbs() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.TO_ABS());
    }
    toRel() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.TO_REL());
    }
    normalizeHVZ(a, b, c) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.NORMALIZE_HVZ(a, b, c));
    }
    normalizeST() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.NORMALIZE_ST());
    }
    qtToC() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.QT_TO_C());
    }
    aToC() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.A_TO_C());
    }
    sanitize(eps) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.SANITIZE(eps));
    }
    translate(x, y) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.TRANSLATE(x, y));
    }
    scale(x, y) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.SCALE(x, y));
    }
    rotate(a, x, y) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.ROTATE(a, x, y));
    }
    matrix(a, b, c, d, e, f) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.MATRIX(a, b, c, d, e, f));
    }
    skewX(a) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.SKEW_X(a));
    }
    skewY(a) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.SKEW_Y(a));
    }
    xSymmetry(xOffset) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.X_AXIS_SYMMETRY(xOffset));
    }
    ySymmetry(yOffset) {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.Y_AXIS_SYMMETRY(yOffset));
    }
    annotateArcs() {
        return this.transform(_SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .z.ANNOTATE_ARCS());
    }
}
//# sourceMappingURL=TransformableSVG.js.map

/***/ }),

/***/ 8678:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bL: () => (/* binding */ Switch),
/* harmony export */   zi: () => (/* binding */ SwitchThumb)
/* harmony export */ });
/* unused harmony exports Switch, SwitchThumb, createSwitchScope, unstable_BubbleInput, unstable_Provider, unstable_SwitchBubbleInput, unstable_SwitchProvider, unstable_SwitchTrigger, unstable_Trigger */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(63509);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55897);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Root,Switch,SwitchThumb,Thumb,createSwitchScope,unstable_BubbleInput,unstable_Provider,unstable_SwitchBubbleInput,unstable_SwitchProvider,unstable_SwitchTrigger,unstable_Trigger auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/switch.tsx








var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(SWITCH_NAME);
var [SwitchProviderImpl, useSwitchContext] = createSwitchContext(SWITCH_NAME);
function SwitchProvider(props) {
    const { __scopeSwitch, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", // @ts-expect-error
    internal_do_not_use_render } = props;
    const [checked, setChecked] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__/* .useControllableState */ .i)({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: SWITCH_NAME
    });
    const [control, setControl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [bubbleInput, setBubbleInput] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [userClick, setUserClick] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const isFormControl = control ? !!form || !!control.closest("form") : // We set this to true by default so that events bubble to forms without JS (SSR)
    true;
    const context = {
        checked,
        setChecked,
        disabled,
        control,
        setControl,
        name,
        form,
        value,
        userClick,
        onUserClick: setUserClick,
        required,
        defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
    };
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchProviderImpl, {
        scope: __scopeSwitch,
        ...context,
        children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    });
}
__name(SwitchProvider, "SwitchProvider");
var TRIGGER_NAME = "SwitchTrigger";
var SwitchTrigger = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SwitchTrigger2({ __scopeSwitch, onClick, ...switchProps }, forwardedRef) {
    const { control, form, value, disabled, checked, required, setControl, setChecked, onUserClick, isFormControl, bubbleInput } = useSwitchContext(TRIGGER_NAME, __scopeSwitch);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setControl);
    const initialCheckedStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const associatedForm = form ? control?.ownerDocument.getElementById(form) : control?.form;
        if (associatedForm instanceof HTMLFormElement) {
            const reset = /* @__PURE__ */ __name(()=>setChecked(initialCheckedStateRef.current), "reset");
            associatedForm.addEventListener("reset", reset);
            return ()=>associatedForm.removeEventListener("reset", reset);
        }
    }, [
        control,
        form,
        setChecked
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.button, {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...switchProps,
        ref: composedRefs,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onClick, (event)=>{
            const hasConsumerStoppedPropagation = event.isPropagationStopped();
            onUserClick({
                requestedChecked: !checked,
                hasConsumerStoppedPropagation
            });
            setChecked((prevChecked)=>!prevChecked);
            if (bubbleInput && isFormControl) {
                if (!hasConsumerStoppedPropagation) {
                    event.stopPropagation();
                }
            }
        })
    });
}, "SwitchTrigger"));
var Switch = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function Switch2(props, forwardedRef) {
    const { __scopeSwitch, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...switchProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchProvider, {
        __scopeSwitch,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl })=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchTrigger, {
                        ...switchProps,
                        ref: forwardedRef,
                        __scopeSwitch
                    }),
                    isFormControl && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchBubbleInput, {
                        __scopeSwitch
                    })
                ]
            })
    });
}, "Switch"));
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function SwitchThumb2(props, forwardedRef) {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.span, {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
    });
}, "SwitchThumb"));
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function SwitchBubbleInput2({ __scopeSwitch, onClick, ...props }, forwardedRef) {
    const { control, userClick, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useSwitchContext(BUBBLE_INPUT_NAME, __scopeSwitch);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setBubbleInput);
    const controlSize = (0,_radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_7__/* .useSize */ .X)(control);
    const shouldStopClickPropagationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const prevCheckedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    const handledUserClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(userClick);
    const pendingUserClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const input = bubbleInput;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
        const setChecked = descriptor.set;
        if (!setChecked) {
            return;
        }
        const checkedChanged = prevCheckedRef.current !== checked;
        prevCheckedRef.current = checked;
        const isNewUserClick = userClick !== null && userClick !== handledUserClickRef.current;
        handledUserClickRef.current = userClick;
        if (isNewUserClick) {
            pendingUserClickRef.current = checkedChanged ? null : userClick;
            if (checkedChanged) {
                setChecked.call(input, checked);
            }
            input.dispatchEvent(new Event("click", {
                bubbles: !userClick.hasConsumerStoppedPropagation
            }));
        } else if (checkedChanged) {
            const pendingUserClick = pendingUserClickRef.current;
            pendingUserClickRef.current = null;
            const isPendingUserChange = pendingUserClick?.requestedChecked === checked;
            shouldStopClickPropagationRef.current = true;
            setChecked.call(input, checked);
            input.dispatchEvent(new Event("click", {
                bubbles: !(isPendingUserChange && pendingUserClick.hasConsumerStoppedPropagation)
            }));
            shouldStopClickPropagationRef.current = false;
        }
    }, [
        bubbleInput,
        checked,
        userClick
    ]);
    const defaultCheckedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.input, {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onClick, (event)=>{
            if (shouldStopClickPropagationRef.current) {
                event.stopPropagation();
            }
        }),
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
        }
    });
}, "SwitchBubbleInput"));
function isFunction(value) {
    return typeof value === "function";
}
__name(isFunction, "isFunction");
function getState(checked) {
    return checked ? "checked" : "unchecked";
}
__name(getState, "getState");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 9003:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MX: () => (/* binding */ toPascalCase),
/* harmony export */   fX: () => (/* binding */ toKebabCase),
/* harmony export */   m$: () => (/* binding */ hasA11yProp),
/* harmony export */   zP: () => (/* binding */ mergeClasses)
/* harmony export */ });
/* unused harmony export toCamelCase */
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
 //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 9383:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Send)
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
    name: "send",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
                key: "1ffxy3"
            }
        ],
        [
            "path",
            {
                d: "m21.854 2.147-10.94 10.939",
                key: "12cjpa"
            }
        ]
    ]
};
__iconData.node;
const Send = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=send.mjs.map


/***/ }),

/***/ 9903:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ ElementTypes)
/* harmony export */ });
/* unused harmony export ShapePathFormulasKeys */
/**
 * The MAIC slide object model — the canonical, dependency-free contract.
 *
 * This file is the single source of truth that supersedes the three copies that
 * had drifted apart before @openmaic/dsl existed:
 *   - app:      lib/types/slides.ts
 *   - renderer: packages/@openmaic/renderer/src/types/slides.ts
 *   - importer: packages/@openmaic/importer/src/openmaic/types/slides.ts
 *
 * It is a *superset*: every field that appeared in any of the three copies is
 * kept here so that the renderer and the importer can adopt this contract
 * without losing data. Fields that only existed in one copy are annotated with
 * `@since-merge` so the reconciliation history stays explicit. See README.md
 * (the "Divergence reconciled" section) for the full list.
 *
 * Pure types only — no runtime imports, no React/pptx/echarts.
 */
/**
 * Regular (not `const`) enum on purpose: consumers compile with
 * `isolatedModules`, under which importing an ambient `const enum` across the
 * package boundary is an error (TS2748). A regular enum emits a runtime object
 * that bundles cleanly and is usable as both a value and a type.
 */
var ShapePathFormulasKeys;
(function (ShapePathFormulasKeys) {
    ShapePathFormulasKeys["ROUND_RECT"] = "roundRect";
    ShapePathFormulasKeys["ROUND_RECT_DIAGONAL"] = "roundRectDiagonal";
    ShapePathFormulasKeys["ROUND_RECT_SINGLE"] = "roundRectSingle";
    ShapePathFormulasKeys["ROUND_RECT_SAMESIDE"] = "roundRectSameSide";
    ShapePathFormulasKeys["CUT_RECT_DIAGONAL"] = "cutRectDiagonal";
    ShapePathFormulasKeys["CUT_RECT_SINGLE"] = "cutRectSingle";
    ShapePathFormulasKeys["CUT_RECT_SAMESIDE"] = "cutRectSameSide";
    ShapePathFormulasKeys["CUT_ROUND_RECT"] = "cutRoundRect";
    ShapePathFormulasKeys["MESSAGE"] = "message";
    ShapePathFormulasKeys["ROUND_MESSAGE"] = "roundMessage";
    ShapePathFormulasKeys["L"] = "L";
    ShapePathFormulasKeys["RING_RECT"] = "ringRect";
    ShapePathFormulasKeys["PLUS"] = "plus";
    ShapePathFormulasKeys["TRIANGLE"] = "triangle";
    ShapePathFormulasKeys["PARALLELOGRAM_LEFT"] = "parallelogramLeft";
    ShapePathFormulasKeys["PARALLELOGRAM_RIGHT"] = "parallelogramRight";
    ShapePathFormulasKeys["TRAPEZOID"] = "trapezoid";
    ShapePathFormulasKeys["BULLET"] = "bullet";
    ShapePathFormulasKeys["INDICATOR"] = "indicator";
    ShapePathFormulasKeys["DONUT"] = "donut";
    ShapePathFormulasKeys["DIAGSTRIPE"] = "diagStripe";
})(ShapePathFormulasKeys || (ShapePathFormulasKeys = {}));
var ElementTypes;
(function (ElementTypes) {
    ElementTypes["TEXT"] = "text";
    ElementTypes["IMAGE"] = "image";
    ElementTypes["SHAPE"] = "shape";
    ElementTypes["LINE"] = "line";
    ElementTypes["CHART"] = "chart";
    ElementTypes["TABLE"] = "table";
    ElementTypes["LATEX"] = "latex";
    ElementTypes["VIDEO"] = "video";
    ElementTypes["AUDIO"] = "audio";
    ElementTypes["CODE"] = "code";
})(ElementTypes || (ElementTypes = {}));
//# sourceMappingURL=slides.js.map

/***/ }),

/***/ 10641:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useSlideBackgroundStyle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


function useSlideBackgroundStyle(background) {
    const backgroundStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (!background)
            return { backgroundColor: '#fff' };
        const { type, color, image, gradient } = background;
        if (type === 'solid')
            return { backgroundColor: color };
        if (type === 'image' && image) {
            const { src, size } = image;
            if (!src)
                return { backgroundColor: '#fff' };
            if (size === 'repeat') {
                return {
                    backgroundImage: `url(${src})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'contain',
                };
            }
            return {
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: size || 'cover',
            };
        }
        if (type === 'gradient' && gradient) {
            const { type: gradientType, colors, rotate } = gradient;
            const list = colors.map((item) => `${item.color} ${item.pos}%`);
            if (gradientType === 'radial') {
                return { backgroundImage: `radial-gradient(${list.join(',')})` };
            }
            return {
                backgroundImage: `linear-gradient(${rotate}deg, ${list.join(',')})`,
            };
        }
        return { backgroundColor: '#fff' };
    }, [background]);
    return { backgroundStyle };
}


//# sourceMappingURL=useSlideBackgroundStyle.js.map


/***/ }),

/***/ 11245:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export xmlDecodeTree */
// Generated using scripts/write-decode-map.ts
const xmlDecodeTree = /* #__PURE__ */ new Uint16Array(
// prettier-ignore
/* #__PURE__ */ "\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map((c) => c.charCodeAt(0)));
//# sourceMappingURL=decode-data-xml.js.map

/***/ }),

/***/ 12100:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ tinycolor)
/* harmony export */ });
// This file is autogenerated. It's used to publish ESM to npm.
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};

  // If input is already a tinycolor, return itself
  if (color instanceof tinycolor) {
    return color;
  }
  // If we are called as a function, call using new instead
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1
  // If it was supposed to be 128, this was already taken care of by `inputToRgb`
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    //http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  },
  getLuminance: function getLuminance() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
}

// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    v: v
  };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];

  // Return a 3 character hex if possible
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];

  // Return a 4 character hex if possible
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h,
      s: s,
      v: v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level: level,
    size: size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};

// Big List of Colors
// ------------------
// <https://www.w3.org/TR/css-color-4/#named-colors>
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);

// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return n % max / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = function () {
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = "[-\\+]?\\d+%?";

  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level: level,
    size: size
  };
}




/***/ }),

/***/ 12660:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ Chart)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12100);
/* harmony import */ var _chartOption_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89477);
/* harmony import */ var _chartRuntime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89548);
/* harmony import */ var _clipRepaint_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80533);
/* __next_internal_client_entry_do_not_use__ Chart auto */ 





function Chart({ width: _width, height: _height, type, data, themeColors: rawThemeColors, textColor, lineColor, options, importedStyle }) {
    const chartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const chartInstance = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const resizeObserverRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const updateOptionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(()=>undefined);
    const [chartState, setChartState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('loading');
    const themeColors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let colors = [];
        if (rawThemeColors.length >= 10) {
            colors = rawThemeColors;
        } else if (rawThemeColors.length === 1) {
            colors = (0,tinycolor2__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(rawThemeColors[0]).analogous(10).map((color)=>color.toRgbString());
        } else {
            const len = rawThemeColors.length;
            const supplement = (0,tinycolor2__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(rawThemeColors[len - 1]).analogous(10 + 1 - len).map((color)=>color.toRgbString());
            colors = [
                ...rawThemeColors.slice(0, len - 1),
                ...supplement
            ];
        }
        return colors;
    }, [
        rawThemeColors
    ]);
    const updateOption = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!chartInstance.current) return;
        const option = (0,_chartOption_js__WEBPACK_IMPORTED_MODULE_3__/* .getChartOption */ .Y)({
            type,
            importedStyle,
            data,
            themeColors,
            textColor,
            lineColor,
            lineSmooth: options?.lineSmooth || false,
            stack: options?.stack || false,
            percentStack: options?.percentStack || false
        });
        if (option) {
            chartInstance.current.setOption(option, true);
        }
    }, [
        type,
        data,
        themeColors,
        textColor,
        lineColor,
        options,
        importedStyle
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        updateOptionRef.current = updateOption;
    }, [
        updateOption
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let mounted = true;
        void (0,_chartRuntime_js__WEBPACK_IMPORTED_MODULE_4__/* .loadChartRuntime */ .f)().then((echarts)=>{
            if (!mounted || !chartRef.current) return;
            const chartElement = chartRef.current;
            const chart = echarts.init(chartElement, null, {
                renderer: 'svg'
            });
            chartInstance.current = chart;
            if ((0,_clipRepaint_js__WEBPACK_IMPORTED_MODULE_5__/* .isWebKitEngine */ .l)(globalThis.navigator?.userAgent)) {
                // WebKit does not repaint a series clipped by an animated clip path
                // (see clipRepaint.ts). `rendered` fires after every painted frame,
                // so the clipped series shows as it would elsewhere, on first
                // render, re-render and resize alike.
                chart.on('rendered', ()=>(0,_clipRepaint_js__WEBPACK_IMPORTED_MODULE_5__/* .repaintClipPaths */ .a)(chartElement));
            }
            setChartState('ready');
            updateOptionRef.current();
            const resizeObserver = new ResizeObserver(()=>{
                chartInstance.current?.resize();
            });
            resizeObserver.observe(chartRef.current);
            resizeObserverRef.current = resizeObserver;
        }).catch(()=>{
            if (mounted) setChartState('error');
        });
        return ()=>{
            mounted = false;
            resizeObserverRef.current?.disconnect();
            resizeObserverRef.current = null;
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    // The runtime and ECharts instance are initialized once per mounted chart.
    // Option changes are applied by the effect below without re-initializing.
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        updateOption();
    }, [
        updateOption
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: chartRef,
        className: "chart",
        "data-chart-state": chartState,
        "aria-busy": chartState === 'loading',
        style: {
            width: '100%',
            height: '100%'
        }
    });
}
 //# sourceMappingURL=Chart.js.map


/***/ }),

/***/ 13926:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ SpotlightOverlay)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78235);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15696);
/* __next_internal_client_entry_do_not_use__ SpotlightOverlay auto */ 


function SpotlightOverlay({ options, elementIdPrefix = 'slide-element-', measurementKey }) {
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const spotlightElementId = options?.elementId;
    const measure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!spotlightElementId || !containerRef.current) {
            setRect(null);
            return;
        }
        const domElement = document.getElementById(`${elementIdPrefix}${spotlightElementId}`);
        if (!domElement) {
            setRect(null);
            return;
        }
        const contentEl = domElement.querySelector('.element-content');
        const targetEl = contentEl ?? domElement;
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        if (containerRect.width === 0 || containerRect.height === 0) {
            setRect(null);
            return;
        }
        setRect({
            x: (targetRect.left - containerRect.left) / containerRect.width * 100,
            y: (targetRect.top - containerRect.top) / containerRect.height * 100,
            w: targetRect.width / containerRect.width * 100,
            h: targetRect.height / containerRect.height * 100
        });
    }, [
        spotlightElementId,
        elementIdPrefix
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM measurement requires effect
        measure();
        const container = containerRef.current;
        if (!container || !spotlightElementId) return;
        const root = document.getElementById(`${elementIdPrefix}${spotlightElementId}`);
        const target = root?.querySelector('.element-content') ?? root;
        if (!target) return;
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        observer.observe(target);
        const media = target.querySelectorAll('img, video');
        media.forEach((element)=>{
            element.addEventListener('load', measure);
            element.addEventListener('loadedmetadata', measure);
        });
        return ()=>{
            observer.disconnect();
            media.forEach((element)=>{
                element.removeEventListener('load', measure);
                element.removeEventListener('loadedmetadata', measure);
            });
        };
    }, [
        measure,
        measurementKey,
        spotlightElementId,
        elementIdPrefix
    ]);
    const active = !!spotlightElementId && !!rect;
    const dimness = options?.dimness ?? 0.7;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: containerRef,
        style: {
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_2__/* .AnimatePresence */ .N, {
            mode: "wait",
            children: active && rect && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                style: {
                    position: 'absolute',
                    inset: 0
                },
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    width: "100%",
                    height: "100%",
                    viewBox: "0 0 100 100",
                    preserveAspectRatio: "none",
                    style: {
                        position: 'absolute',
                        inset: 0
                    },
                    children: [
                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("mask", {
                                id: `mask-${spotlightElementId}`,
                                children: [
                                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                                        x: "0",
                                        y: "0",
                                        width: "100",
                                        height: "100",
                                        fill: "white"
                                    }),
                                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.rect, {
                                        fill: "black",
                                        initial: {
                                            x: rect.x - 8,
                                            y: rect.y - 8,
                                            width: rect.w + 16,
                                            height: rect.h + 16,
                                            rx: 4
                                        },
                                        animate: {
                                            x: rect.x - 0.4,
                                            y: rect.y - 0.6,
                                            width: rect.w + 0.8,
                                            height: rect.h + 1.2,
                                            rx: 1
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1
                                            ]
                                        }
                                    })
                                ]
                            })
                        }),
                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                            width: "100",
                            height: "100",
                            fill: `rgba(0,0,0,${dimness})`,
                            mask: `url(#mask-${spotlightElementId})`
                        }),
                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.rect, {
                            initial: {
                                x: rect.x - 4,
                                y: rect.y - 4,
                                width: rect.w + 8,
                                height: rect.h + 8,
                                opacity: 0,
                                rx: 2
                            },
                            animate: {
                                x: rect.x - 0.4,
                                y: rect.y - 0.6,
                                width: rect.w + 0.8,
                                height: rect.h + 1.2,
                                opacity: 1,
                                rx: 1
                            },
                            fill: "none",
                            stroke: "rgba(255,255,255,0.7)",
                            strokeWidth: "1.2",
                            style: {
                                vectorEffect: 'non-scaling-stroke'
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.05,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1
                                ]
                            }
                        })
                    ]
                })
            }, `spotlight-${spotlightElementId}`)
        })
    });
}
 //# sourceMappingURL=SpotlightOverlay.js.map


/***/ }),

/***/ 14532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ styleHookSingleton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20252);


/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
var styleHookSingleton = function () {
    var sheet = (0,_singleton__WEBPACK_IMPORTED_MODULE_1__/* .stylesheetSingleton */ .i)();
    return function (styles, isDynamic) {
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
            sheet.add(styles);
            return function () {
                sheet.remove();
            };
        }, [styles && isDynamic]);
    };
};


/***/ }),

/***/ 15407:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export htmlTrie */
// Generated using scripts/write-encode-map.ts
function restoreDiff(array) {
    for (let index = 1; index < array.length; index++) {
        array[index][0] += array[index - 1][0] + 1;
    }
    return array;
}
// prettier-ignore
const htmlTrie = /* #__PURE__ */ new Map(/* #__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: /* #__PURE__ */ new Map(/* #__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: /* #__PURE__ */ new Map(/* #__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: /* #__PURE__ */ new Map(/* #__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
//# sourceMappingURL=encode-html.js.map

/***/ }),

/***/ 15561:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Paperclip)
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
    name: "paperclip",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
                key: "1miecu"
            }
        ]
    ]
};
__iconData.node;
const Paperclip = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=paperclip.mjs.map


/***/ }),

/***/ 16459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ useMergeRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _assignRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71311);
/* harmony import */ var _useRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50223);



var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
var currentValues = new WeakMap();
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
    var callbackRef = (0,_useRef__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .c)(defaultValue || null, function (newValue) {
        return refs.forEach(function (ref) { return (0,_assignRef__WEBPACK_IMPORTED_MODULE_2__/* .assignRef */ .b)(ref, newValue); });
    });
    // handle refs changes - added or removed
    useIsomorphicLayoutEffect(function () {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
            var prevRefs_1 = new Set(oldValue);
            var nextRefs_1 = new Set(refs);
            var current_1 = callbackRef.current;
            prevRefs_1.forEach(function (ref) {
                if (!nextRefs_1.has(ref)) {
                    (0,_assignRef__WEBPACK_IMPORTED_MODULE_2__/* .assignRef */ .b)(ref, null);
                }
            });
            nextRefs_1.forEach(function (ref) {
                if (!prevRefs_1.has(ref)) {
                    (0,_assignRef__WEBPACK_IMPORTED_MODULE_2__/* .assignRef */ .b)(ref, current_1);
                }
            });
        }
        currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
}


/***/ }),

/***/ 17256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pause)
/* harmony export */ });
/* unused harmony export __iconNode */
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94180);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconNode = [
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
];
const Pause = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("pause", __iconNode);
 //# sourceMappingURL=pause.js.map


/***/ }),

/***/ 17682:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ ImageOutline)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61478);
/* harmony import */ var _useClipImage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33229);
/* __next_internal_client_entry_do_not_use__ ImageOutline auto */ 


function ImageRectOutline({ width, height, outline, radius = '0' }) {
    const { outlineWidth, outlineColor, strokeDashArray } = (0,_shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__/* .useElementOutline */ .Y)(outline);
    if (!outline) return null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            overflow: 'visible'
        },
        width: width,
        height: height,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            vectorEffect: "non-scaling-stroke",
            strokeLinecap: "butt",
            strokeMiterlimit: "8",
            fill: "transparent",
            rx: radius,
            ry: radius,
            width: width,
            height: height,
            stroke: outlineColor,
            strokeWidth: outlineWidth,
            strokeDasharray: strokeDashArray
        })
    });
}
function ImageEllipseOutline({ width, height, outline }) {
    const { outlineWidth, outlineColor, strokeDashArray } = (0,_shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__/* .useElementOutline */ .Y)(outline);
    if (!outline) return null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            overflow: 'visible'
        },
        width: width,
        height: height,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ellipse", {
            vectorEffect: "non-scaling-stroke",
            strokeLinecap: "butt",
            strokeMiterlimit: "8",
            fill: "transparent",
            cx: width / 2,
            cy: height / 2,
            rx: width / 2,
            ry: height / 2,
            stroke: outlineColor,
            strokeWidth: outlineWidth,
            strokeDasharray: strokeDashArray
        })
    });
}
function ImagePolygonOutline({ width, height, createPath, outline }) {
    const { outlineWidth, outlineColor, strokeDashArray } = (0,_shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__/* .useElementOutline */ .Y)(outline);
    if (!outline) return null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            overflow: 'visible'
        },
        width: width,
        height: height,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            vectorEffect: "non-scaling-stroke",
            strokeLinecap: "butt",
            strokeMiterlimit: "8",
            fill: "transparent",
            d: createPath(width, height),
            stroke: outlineColor,
            strokeWidth: outlineWidth,
            strokeDasharray: strokeDashArray
        })
    });
}
function ImageOutline({ elementInfo }) {
    const { clipShape } = (0,_useClipImage_js__WEBPACK_IMPORTED_MODULE_2__/* .useClipImage */ .l)(elementInfo);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "image-outline",
        children: [
            clipShape.type === 'rect' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ImageRectOutline, {
                width: elementInfo.width,
                height: elementInfo.height,
                radius: clipShape.radius,
                outline: elementInfo.outline
            }),
            clipShape.type === 'ellipse' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ImageEllipseOutline, {
                width: elementInfo.width,
                height: elementInfo.height,
                outline: elementInfo.outline
            }),
            clipShape.type === 'polygon' && clipShape.createPath && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ImagePolygonOutline, {
                width: elementInfo.width,
                height: elementInfo.height,
                outline: elementInfo.outline,
                createPath: clipShape.createPath
            })
        ]
    });
}
 //# sourceMappingURL=ImageOutline.js.map


/***/ }),

/***/ 18180:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $1: () => (/* binding */ useInnerHtml),
/* harmony export */   D3: () => (/* binding */ useInnerHtmlGrid),
/* harmony export */   Jy: () => (/* binding */ InlineMathPriorityContext),
/* harmony export */   NF: () => (/* binding */ useInlineMath)
/* harmony export */ });
/* unused harmony exports INLINE_MATH_ATTRIBUTE, INLINE_MATH_MAX_ROOT_FORMULAS, INLINE_MATH_MAX_ROOT_SOURCE, INLINE_MATH_ROOT_ATTRIBUTE, INLINE_MATH_SYNC_FORMULA_BUDGET, INLINE_MATH_SYNC_SOURCE_BUDGET, MAX_INLINE_MATH_SOURCE, completeInlineMath, renderInlineMath */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71876);
/* harmony import */ var _openmaic_dsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80910);
/* __next_internal_client_entry_do_not_use__ INLINE_MATH_ATTRIBUTE,INLINE_MATH_MAX_ROOT_FORMULAS,INLINE_MATH_MAX_ROOT_SOURCE,INLINE_MATH_ROOT_ATTRIBUTE,INLINE_MATH_SYNC_FORMULA_BUDGET,INLINE_MATH_SYNC_SOURCE_BUDGET,InlineMathPriorityContext,MAX_INLINE_MATH_SOURCE,completeInlineMath,renderInlineMath,useInlineMath,useInnerHtml,useInnerHtmlGrid auto */ 


/**
 * Inline formulas in slide prose. Stored prose carries each formula as LaTeX
 * source (`<span data-inline-math="LATEX">LATEX</span>`); older or unsaved
 * content may still carry a rendered KaTeX tree with the same attribute. The
 * renderer typesets every such span in the browser from its source.
 */ const INLINE_MATH_ATTRIBUTE = 'data-inline-math';
/**
 * Marks an element whose injected prose is one typesetting root (a text box,
 * a shape label, a table), so callers that typeset a whole slide at once use
 * the same roots, budgets and caps as the live elements.
 */ const INLINE_MATH_ROOT_ATTRIBUTE = 'data-inline-math-root';
/** Longest source typeset; longer sources are shown as plain LaTeX text. */ const MAX_INLINE_MATH_SOURCE = 2000;
/**
 * Bound uncached typesetting work in a batch. Live prose roots share a batch;
 * standalone renderInlineMath calls get their own. Ordinary slides fit before
 * paint; mixed/dense slides may defer even short formulas to idle time.
 */ const INLINE_MATH_SYNC_SOURCE_BUDGET = 4000;
const INLINE_MATH_SYNC_FORMULA_BUDGET = 100;
/**
 * Also bound inserted markup, including cache hits: short matrix sources can
 * expand to thousands of nodes whose style/layout cost comes after typesetting.
 * Uses the serialized size already recorded by the cache, not a DOM traversal.
 * Leave room for dense ordinary slides (e.g. 32 integrals/sums across text boxes).
 */ const INLINE_MATH_SYNC_MARKUP_BUDGET = 256000;
/**
 * Hard cap per prose root, counting every formula in document order: past it,
 * formulas are shown as their LaTeX text and never typeset.
 */ const INLINE_MATH_MAX_ROOT_SOURCE = 50000;
const INLINE_MATH_MAX_ROOT_FORMULAS = 1000;
/** Formula elements this module already handled, so a repeated pass skips them. */ const handled = new WeakSet();
/**
 * Typeset formulas by source, cloned on use: React may rewrite the injected
 * markup on any re-render, and re-typesetting the same source must stay
 * cheap. Bounded by the size of the cached markup, counted in serialized
 * characters (an estimate, not heap bytes); large renders are not kept.
 */ const TYPESET_CACHE_MAX_MARKUP = 2000000;
const TYPESET_CACHE_MAX_ENTRY = 64000;
const typesetCache = new Map();
let typesetCacheSize = 0;
// Keep a rejected render with its source node until it can be inserted. Unlike
// the shared cache, this also covers large entries and cannot be overwritten by
// another root. Replacing/removing the prose releases its pending renders.
const deferredTypesets = new WeakMap();
/** Typeset one formula, or `null` to keep its source as text. */ function typesetUncached(doc, latex) {
    if (!latex.trim() || latex.length > MAX_INLINE_MATH_SOURCE) return null;
    const host = doc.createElement('span');
    try {
        // Authored input: `safeKatexOptions` forces `trust: false`, makes
        // formula-defined macros inert, bounds expansion, and builds a fresh
        // `macros` object per call (KaTeX writes global definitions into it).
        katex__WEBPACK_IMPORTED_MODULE_1__/* ["default"].render */ .Ay.render(latex, host, (0,_openmaic_dsl__WEBPACK_IMPORTED_MODULE_2__/* .safeKatexOptions */ .bh)({
            displayMode: false,
            output: 'html',
            throwOnError: false,
            strict: 'ignore'
        }));
    } catch  {
        // KaTeX refuses to run in a quirks-mode document (no doctype); the source
        // then stays as text.
        return null;
    }
    const formula = host.firstElementChild;
    formula?.setAttribute(INLINE_MATH_ATTRIBUTE, latex);
    return formula;
}
function typeset(doc, latex) {
    let entry = typesetCache.get(latex);
    if (entry) {
        // Refresh recency.
        typesetCache.delete(latex);
        typesetCache.set(latex, entry);
    } else {
        const formula = typesetUncached(doc, latex);
        entry = {
            formula,
            size: latex.length + (formula?.outerHTML.length ?? 0)
        };
        if (entry.size <= TYPESET_CACHE_MAX_ENTRY) {
            typesetCache.set(latex, entry);
            typesetCacheSize += entry.size;
            for (const [key, value] of typesetCache){
                if (typesetCacheSize <= TYPESET_CACHE_MAX_MARKUP) break;
                typesetCache.delete(key);
                typesetCacheSize -= value.size;
            }
        }
    }
    return entry;
}
/** Formulas shown as text because they fell past a root's hard cap. */ const capped = new WeakSet();
function hidePendingMath(root) {
    for (const element of root.querySelectorAll(`span[${INLINE_MATH_ATTRIBUTE}]`)){
        if (!handled.has(element)) element.style.visibility = 'hidden';
    }
}
function showSource(element, latex) {
    element.textContent = latex;
    element.style.removeProperty('visibility');
    handled.add(element);
}
/** Show a formula past the hard cap as its source text, whatever it shows now. */ function showCapped(element, latex) {
    if (capped.has(element)) return;
    const span = (element.ownerDocument ?? document).createElement('span');
    span.setAttribute(INLINE_MATH_ATTRIBUTE, latex);
    span.textContent = latex;
    handled.add(span);
    capped.add(span);
    element.replaceWith(span);
}
/**
 * Typeset the inline formulas under `root`. Each `span[data-inline-math]` is
 * replaced by a KaTeX render of its source carrying the same attribute (the
 * editor's storage shape); a source that cannot be typeset is shown as text.
 * Returns `true` when the budget deferred formulas; pending sources stay hidden.
 */ function renderInlineMath(root, options = {}) {
    return renderPass(root, options, newBudget());
}
function newBudget() {
    return {
        source: 0,
        formulas: 0,
        markup: 0,
        full: false
    };
}
function renderPass(root, options, budget) {
    const doc = root.ownerDocument ?? root;
    let rootSource = 0;
    let rootFormulas = 0;
    let pending = false;
    for (const element of root.querySelectorAll(`span[${INLINE_MATH_ATTRIBUTE}]`)){
        // Inside a formula replaced earlier in this pass.
        if (!root.contains(element)) continue;
        const latex = element.getAttribute(INLINE_MATH_ATTRIBUTE) ?? '';
        rootSource += latex.length;
        rootFormulas += 1;
        // The cap depends only on document order within the root, so a formula
        // ends up the same whatever earlier passes did with it.
        if (rootSource > INLINE_MATH_MAX_ROOT_SOURCE || rootFormulas > INLINE_MATH_MAX_ROOT_FORMULAS) {
            showCapped(element, latex);
            continue;
        }
        if (handled.has(element) && !capped.has(element)) continue;
        const deferred = deferredTypesets.get(element);
        const prepared = deferred?.latex === latex ? deferred.entry : undefined;
        const cached = prepared ?? typesetCache.get(latex);
        // Preserve source order within a root, but let a later root use cached
        // formulas that fit in the space left by a rejected large formula.
        if (!options.complete && (pending || budget.full && !cached)) {
            pending = true;
            continue;
        }
        if (!cached) {
            if (!options.complete && budget.formulas > 0 && (budget.source + latex.length > INLINE_MATH_SYNC_SOURCE_BUDGET || budget.formulas >= INLINE_MATH_SYNC_FORMULA_BUDGET)) {
                budget.full = true;
                pending = true;
                continue;
            }
            budget.source += latex.length;
            budget.formulas += 1;
        }
        const entry = prepared ?? typeset(doc, latex);
        if (!entry.formula) {
            showSource(element, latex);
            continue;
        }
        // Always allow one formula to make progress, even if it exceeds a batch.
        if (!options.complete && budget.markup > 0 && budget.markup + entry.size > INLINE_MATH_SYNC_MARKUP_BUDGET) {
            budget.full = true;
            pending = true;
            deferredTypesets.set(element, {
                latex,
                entry
            });
            continue;
        }
        budget.markup += entry.size;
        const formula = entry.formula.ownerDocument === doc ? entry.formula.cloneNode(true) : doc.importNode(entry.formula, true);
        handled.add(formula);
        deferredTypesets.delete(element);
        element.replaceWith(formula);
    }
    if (pending) hidePendingMath(root);
    return pending;
}
/**
 * Typeset every formula under `container` now, root by root (each element
 * marked with {@link INLINE_MATH_ROOT_ATTRIBUTE}), so each root keeps its own
 * hard cap exactly as the live elements apply it. For snapshots, which
 * capture right away instead of waiting for idle time.
 */ function completeInlineMath(container) {
    const roots = [
        ...container.querySelectorAll(`[${INLINE_MATH_ROOT_ATTRIBUTE}]`)
    ];
    if (container.hasAttribute(INLINE_MATH_ROOT_ATTRIBUTE)) roots.unshift(container);
    for (const root of roots)renderInlineMath(root, {
        complete: true
    });
}
/**
 * A `dangerouslySetInnerHTML` value that keeps its identity while `html` is
 * unchanged. React rewrites injected markup whenever it receives a new value
 * object, which would discard typeset formulas and any idle progress on each
 * re-render; a stable value leaves the DOM alone.
 */ function useInnerHtml(html) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            __html: html
        }), [
        html
    ]);
}
/** {@link useInnerHtml} for a grid of cells (table text), keyed on every cell's markup. */ function useInnerHtmlGrid(cells) {
    const key = JSON.stringify(cells);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>JSON.parse(key).map((row)=>row.map((html)=>({
                    __html: html
                }))), [
        key
    ]);
}
/**
 * Run `run` when the page is idle. The scheduling functions are read once,
 * here, and the handle is always cancelled with the function from the same
 * pair: the global may be replaced or removed between scheduling and
 * cancelling (polyfills, test stubs), and a handle from one implementation
 * means nothing to another.
 */ function whenIdle(run) {
    const scope = globalThis;
    const request = scope.requestIdleCallback;
    const cancel = scope.cancelIdleCallback;
    if (typeof request === 'function' && typeof cancel === 'function') {
        const handle = request.call(scope, run, {
            timeout: 500
        });
        return {
            cancel: ()=>cancel.call(scope, handle)
        };
    }
    const schedule = scope.setTimeout;
    const clear = scope.clearTimeout;
    const handle = schedule.call(scope, run, 16);
    return {
        cancel: ()=>clear.call(scope, handle)
    };
}
const InlineMathPriorityContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)('normal');
/**
 * Own the live queues and frame allowances. Background roots share a copy of
 * the remaining foreground allowance, so an earlier thumbnail commit cannot
 * spend the next foreground commit's budget. Neither is renewed on removal.
 */ function createLiveMath() {
    // Idle work rotates roots within each priority, with foreground canvases first.
    const queuedRoots = new Map();
    // Only newly admitted background roots may spend the remaining frame allowance.
    const prePaintCandidates = new Set();
    let frameBudget = null;
    let backgroundBudget = null;
    let cancelFrameReset = null;
    let idleJob = null;
    let prePaintScheduled = false;
    function resetFrameBudget() {
        cancelFrameReset?.();
        cancelFrameReset = null;
        frameBudget = null;
        backgroundBudget = null;
    }
    function frameAllowance() {
        if (!frameBudget) {
            const budget = frameBudget = newBudget();
            const reset = ()=>{
                if (frameBudget === budget) {
                    frameBudget = null;
                    backgroundBudget = null;
                    cancelFrameReset = null;
                }
            };
            if (typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function') {
                const cancel = cancelAnimationFrame;
                const handle = requestAnimationFrame(reset);
                cancelFrameReset = ()=>cancel(handle);
            } else {
                const cancel = clearTimeout;
                const handle = setTimeout(reset, 16);
                cancelFrameReset = ()=>cancel(handle);
            }
        }
        return frameBudget;
    }
    function renderIdleRoots(priority, budget) {
        for (const [root, queuedPriority] of [
            ...queuedRoots
        ]){
            if (queuedPriority !== priority) continue;
            queuedRoots.delete(root);
            if (root.isConnected && renderPass(root, {}, budget)) queuedRoots.set(root, priority);
            if (budget.full) break;
        }
    }
    function scheduleIdle() {
        if (!queuedRoots.size) {
            idleJob?.cancel?.();
            idleJob = null;
            return;
        }
        if (idleJob) return;
        const job = {};
        idleJob = job;
        job.cancel = whenIdle(()=>{
            // A cancelled callback must not drain work queued by a later mount.
            if (idleJob !== job) return;
            idleJob = null;
            resetFrameBudget();
            const budget = newBudget();
            for (const priority of [
                'normal',
                'background'
            ]){
                renderIdleRoots(priority, budget);
                if (budget.full) break;
            }
            scheduleIdle();
        }).cancel;
    }
    function flushPrePaint() {
        prePaintScheduled = false;
        if (!prePaintCandidates.size) return;
        const budget = backgroundBudget ??= {
            ...frameAllowance()
        };
        // Visit every newly admitted root: cached formulas may fit after an earlier
        // root fills the allowance. Older queued roots remain in idle time.
        for (const root of prePaintCandidates){
            queuedRoots.delete(root);
            if (root.isConnected && renderPass(root, {}, budget)) queuedRoots.set(root, 'background');
        }
        prePaintCandidates.clear();
        scheduleIdle();
    }
    return {
        isQueued: (root)=>queuedRoots.has(root),
        render (root, priority) {
            if (priority === 'background') {
                prePaintCandidates.add(root);
                if (!prePaintScheduled) {
                    prePaintScheduled = true;
                    queueMicrotask(flushPrePaint);
                }
                return;
            }
            prePaintCandidates.delete(root);
            if (renderPass(root, {}, frameAllowance())) queuedRoots.set(root, priority);
            else queuedRoots.delete(root);
            scheduleIdle();
        },
        remove (root) {
            prePaintCandidates.delete(root);
            queuedRoots.delete(root);
            if (!queuedRoots.size) {
                idleJob?.cancel?.();
                idleJob = null;
            }
        }
    };
}
const liveMath = createLiveMath();
/**
 * Typeset the inline formulas of prose injected into `ref` as `html`. Runs
 * after every commit, before paint: React may rewrite the injected markup on
 * any re-render (not only when `html` changes), which would put the stored
 * source spans back. Formulas already typeset are skipped and cached renders
 * are cloned, so a commit that left the markup alone costs one query. What the
 * shared budget leaves over is typeset in idle time, using the current markup.
 * Pending roots stay in that queue on unchanged commits (including when an
 * external caller rewrites the HTML). New content can use the current frame's
 * synchronous allowance. Unmounting or replacing a root removes its queued work.
 * Foreground roots run in layout effects; background roots use the remaining
 * allowance in a microtask, following the nearest InlineMathPriorityContext.
 * Never updates React state.
 */ function useInlineMath(ref, html) {
    const priority = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InlineMathPriorityContext);
    const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        const root = ref.current;
        const before = previous.current;
        if (before?.root && before.root !== root) liveMath.remove(before.root);
        previous.current = {
            root,
            html,
            priority
        };
        if (!root) return;
        if (!html.includes(INLINE_MATH_ATTRIBUTE)) {
            liveMath.remove(root);
            return;
        }
        if (before?.root === root && before.html === html && before.priority === priority && liveMath.isQueued(root)) {
            hidePendingMath(root);
            return;
        }
        liveMath.render(root, priority);
    });
    // Only clean up on unmount: per-commit removal would discard pending queue
    // membership and let unchanged rerenders reenter the pre-paint path.
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        return ()=>{
            if (previous.current?.root) liveMath.remove(previous.current.root);
            previous.current = null;
        };
    }, []);
}
 //# sourceMappingURL=inlineMath.js.map


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

/***/ 19217:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useElementFill)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


function useElementFill(element, source) {
    const fill = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (element.pattern)
            return `url(#${source}-pattern-${element.id})`;
        if (element.gradient)
            return `url(#${source}-gradient-${element.id})`;
        return element.fill || 'none';
    }, [element.pattern, element.gradient, element.fill, element.id, source]);
    return { fill };
}


//# sourceMappingURL=useElementFill.js.map


/***/ }),

/***/ 20252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ stylesheetSingleton)
/* harmony export */ });
/* harmony import */ var get_nonce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47536);

function makeStyleTag() {
    if (!document)
        return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = (0,get_nonce__WEBPACK_IMPORTED_MODULE_0__/* .getNonce */ .m)();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    }
    else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function () {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function (style) {
            if (counter == 0) {
                if ((stylesheet = makeStyleTag())) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function () {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        },
    };
};


/***/ }),

/***/ 21172:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useMergedRef", ({
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
}));
const _react = __webpack_require__(12115);
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map


/***/ }),

/***/ 21676:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DK: () => (/* binding */ RemoveScrollSideCar)
/* harmony export */ });
/* unused harmony exports getTouchXY, getDeltaXY */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_remove_scroll_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35942);
/* harmony import */ var react_style_singleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4761);
/* harmony import */ var _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2531);
/* harmony import */ var _handleScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90057);






var getTouchXY = function (event) {
    return 'changedTouches' in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function (event) { return [event.deltaX, event.deltaY]; };
var extractRef = function (ref) {
    return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) { return x[0] === y[0] && x[1] === y[1]; };
var generateStyle = function (id) { return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n"); };
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
    var shouldPreventQueue = react__WEBPACK_IMPORTED_MODULE_0__.useRef([]);
    var touchStartRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([0, 0]);
    var activeAxis = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    var id = react__WEBPACK_IMPORTED_MODULE_0__.useState(idCounter++)[0];
    var Style = react__WEBPACK_IMPORTED_MODULE_0__.useState(react_style_singleton__WEBPACK_IMPORTED_MODULE_2__/* .styleSingleton */ .T0)[0];
    var lastProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        lastProps.current = props;
    }, [props]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        if (props.inert) {
            document.body.classList.add("block-interactivity-".concat(id));
            var allow_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__spreadArray */ .fX)([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
            allow_1.forEach(function (el) { return el.classList.add("allow-interactivity-".concat(id)); });
            return function () {
                document.body.classList.remove("block-interactivity-".concat(id));
                allow_1.forEach(function (el) { return el.classList.remove("allow-interactivity-".concat(id)); });
            };
        }
        return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (event, parent) {
        if (('touches' in event && event.touches.length === 2) || (event.type === 'wheel' && event.ctrlKey)) {
            return !lastProps.current.allowPinchZoom;
        }
        var touch = getTouchXY(event);
        var touchStart = touchStartRef.current;
        var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
        // allow horizontal touch move on Range inputs. They will not cause any scroll
        if ('touches' in event && moveDirection === 'h' && target.type === 'range') {
            return false;
        }
        // allow drag selection (iOS); check if selection's anchorNode is the same as target or contains target
        var selection = window.getSelection();
        var anchorNode = selection && selection.anchorNode;
        var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
        if (isTouchingSelection) {
            return false;
        }
        var canBeScrolledInMainDirection = (0,_handleScroll__WEBPACK_IMPORTED_MODULE_4__/* .locationCouldBeScrolled */ .K)(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
            return true;
        }
        if (canBeScrolledInMainDirection) {
            currentAxis = moveDirection;
        }
        else {
            currentAxis = moveDirection === 'v' ? 'h' : 'v';
            canBeScrolledInMainDirection = (0,_handleScroll__WEBPACK_IMPORTED_MODULE_4__/* .locationCouldBeScrolled */ .K)(moveDirection, target);
            // other axis might be not scrollable
        }
        if (!canBeScrolledInMainDirection) {
            return false;
        }
        if (!activeAxis.current && 'changedTouches' in event && (deltaX || deltaY)) {
            activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
            return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return (0,_handleScroll__WEBPACK_IMPORTED_MODULE_4__/* .handleScroll */ .Q)(cancelingAxis, parent, event, cancelingAxis === 'h' ? deltaX : deltaY, true);
    }, []);
    var shouldPrevent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
            // not the last active
            return;
        }
        var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
        var sourceEvent = shouldPreventQueue.current.filter(function (e) { return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta); })[0];
        // self event, and should be canceled
        if (sourceEvent && sourceEvent.should) {
            if (event.cancelable) {
                event.preventDefault();
            }
            return;
        }
        // outside or shard event
        if (!sourceEvent) {
            var shardNodes = (lastProps.current.shards || [])
                .map(extractRef)
                .filter(Boolean)
                .filter(function (node) { return node.contains(event.target); });
            var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
            if (shouldStop) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }
    }, []);
    var shouldCancel = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (name, delta, target, should) {
        var event = { name: name, delta: delta, target: target, should: should, shadowParent: getOutermostShadowParent(target) };
        shouldPreventQueue.current.push(event);
        setTimeout(function () {
            shouldPreventQueue.current = shouldPreventQueue.current.filter(function (e) { return e !== event; });
        }, 1);
    }, []);
    var scrollTouchStart = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (event) {
        touchStartRef.current = getTouchXY(event);
        activeAxis.current = undefined;
    }, []);
    var scrollWheel = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (event) {
        shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (event) {
        shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        lockStack.push(Style);
        props.setCallbacks({
            onScrollCapture: scrollWheel,
            onWheelCapture: scrollWheel,
            onTouchMoveCapture: scrollTouchMove,
        });
        document.addEventListener('wheel', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
        document.addEventListener('touchmove', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
        document.addEventListener('touchstart', scrollTouchStart, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
        return function () {
            lockStack = lockStack.filter(function (inst) { return inst !== Style; });
            document.removeEventListener('wheel', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
            document.removeEventListener('touchmove', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
            document.removeEventListener('touchstart', scrollTouchStart, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_5__/* .nonPassive */ .X);
        };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
        inert ? react__WEBPACK_IMPORTED_MODULE_0__.createElement(Style, { styles: generateStyle(id) }) : null,
        removeScrollBar ? react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_remove_scroll_bar__WEBPACK_IMPORTED_MODULE_1__/* .RemoveScrollBar */ .jp, { noRelative: props.noRelative, gapMode: props.gapMode }) : null));
}
function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
        if (node instanceof ShadowRoot) {
            shadowParent = node.host;
            node = node.host;
        }
        node = node.parentNode;
    }
    return shadowParent;
}


/***/ }),

/***/ 22954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Eq: () => (/* binding */ hideOthers)
/* harmony export */ });
/* unused harmony exports inertOthers, supportsInert, suppressOthers */
var getDefaultParent = function (originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node) {
    return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function (parent, targets) {
    return targets
        .map(function (target) {
        if (parent.contains(target)) {
            return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
        return null;
    })
        .filter(function (x) { return Boolean(x); });
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */
var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function (el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function (parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function (node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            }
            else {
                try {
                    var attr = node.getAttribute(controlAttribute);
                    var alreadyHidden = attr !== null && attr !== 'false';
                    var counterValue = (counterMap.get(node) || 0) + 1;
                    var markerValue = (markerCounter.get(node) || 0) + 1;
                    counterMap.set(node, counterValue);
                    markerCounter.set(node, markerValue);
                    hiddenNodes.push(node);
                    if (counterValue === 1 && alreadyHidden) {
                        uncontrolledNodes.set(node, true);
                    }
                    if (markerValue === 1) {
                        node.setAttribute(markerName, 'true');
                    }
                    if (!alreadyHidden) {
                        node.setAttribute(controlAttribute, 'true');
                    }
                }
                catch (e) {
                    console.error('aria-hidden: cannot operate on ', node, e);
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function () {
        hiddenNodes.forEach(function (node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var hideOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    // we should not hide aria-live elements - https://github.com/theKashey/aria-hidden/issues/10
    // and script elements, as they have no impact on accessibility.
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live], script')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};
/**
 * Marks everything except given node(or nodes) as inert
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var inertOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-inert-ed'; }
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    return applyAttributeToOthers(originalTarget, activeParentNode, markerName, 'inert');
};
/**
 * @returns if current browser supports inert
 */
var supportsInert = function () {
    return typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('inert');
};
/**
 * Automatic function to "suppress" DOM elements - _hide_ or _inert_ in the best possible way
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var suppressOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-suppressed'; }
    return (supportsInert() ? inertOthers : hideOthers)(originalTarget, parentNode, markerName);
};


/***/ }),

/***/ 23422:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CN: () => (/* binding */ bezierRoot),
/* harmony export */   Pe: () => (/* binding */ assertNumbers),
/* harmony export */   Us: () => (/* binding */ arcAt),
/* harmony export */   YN: () => (/* binding */ intersectionUnitCircleLine),
/* harmony export */   j8: () => (/* binding */ a2c),
/* harmony export */   qc: () => (/* binding */ annotateArcCommand),
/* harmony export */   v2: () => (/* binding */ bezierAt),
/* harmony export */   vR: () => (/* binding */ arePointsCollinear)
/* harmony export */ });
/* unused harmony exports rotate, DEG, lerp */
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);

function rotate([x, y], rad) {
    return [
        x * Math.cos(rad) - y * Math.sin(rad),
        x * Math.sin(rad) + y * Math.cos(rad),
    ];
}
const DEBUG_CHECK_NUMBERS = true;
function assertNumbers(...numbers) {
    if (DEBUG_CHECK_NUMBERS) {
        for (let i = 0; i < numbers.length; i++) {
            if ('number' !== typeof numbers[i]) {
                throw new Error(`assertNumbers arguments[${i}] is not a number. ${typeof numbers[i]} == typeof ${numbers[i]}`);
            }
        }
    }
    return true;
}
const PI = Math.PI;
/**
 * https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
 * Fixes rX and rY.
 * Ensures lArcFlag and sweepFlag are 0 or 1
 * Adds center coordinates: command.cX, command.cY (relative or absolute, depending on command.relative)
 * Adds start and end arc parameters (in degrees): command.phi1, command.phi2; phi1 < phi2 iff. c.sweepFlag == true
 */
function annotateArcCommand(c, x1, y1) {
    c.lArcFlag = 0 === c.lArcFlag ? 0 : 1;
    c.sweepFlag = 0 === c.sweepFlag ? 0 : 1;
    // tslint:disable-next-line
    let { rX, rY } = c;
    const { x, y } = c;
    if (Math.abs(rX) < 1e-10 || Math.abs(rY) < 1e-10) {
        c.rX = 0;
        c.rY = 0;
        c.cX = (x1 + x) / 2;
        c.cY = (y1 + y) / 2;
        c.phi1 = 0;
        c.phi2 = 0;
        return;
    }
    rX = Math.abs(c.rX);
    rY = Math.abs(c.rY);
    const xRotRad = (c.xRot / 180) * PI;
    const [x1_, y1_] = rotate([(x1 - x) / 2, (y1 - y) / 2], -xRotRad);
    const testValue = Math.pow(x1_, 2) / Math.pow(rX, 2) + Math.pow(y1_, 2) / Math.pow(rY, 2);
    if (1 < testValue) {
        rX *= Math.sqrt(testValue);
        rY *= Math.sqrt(testValue);
    }
    c.rX = rX;
    c.rY = rY;
    const c_ScaleTemp = Math.pow(rX, 2) * Math.pow(y1_, 2) + Math.pow(rY, 2) * Math.pow(x1_, 2);
    const c_Scale = (c.lArcFlag !== c.sweepFlag ? 1 : -1) *
        Math.sqrt(Math.max(0, (Math.pow(rX, 2) * Math.pow(rY, 2) - c_ScaleTemp) / c_ScaleTemp));
    const cx_ = ((rX * y1_) / rY) * c_Scale;
    const cy_ = ((-rY * x1_) / rX) * c_Scale;
    const cRot = rotate([cx_, cy_], xRotRad);
    c.cX = cRot[0] + (x1 + x) / 2;
    c.cY = cRot[1] + (y1 + y) / 2;
    c.phi1 = Math.atan2((y1_ - cy_) / rY, (x1_ - cx_) / rX);
    c.phi2 = Math.atan2((-y1_ - cy_) / rY, (-x1_ - cx_) / rX);
    if (0 === c.sweepFlag && c.phi2 > c.phi1) {
        c.phi2 -= 2 * PI;
    }
    if (1 === c.sweepFlag && c.phi2 < c.phi1) {
        c.phi2 += 2 * PI;
    }
    c.phi1 *= 180 / PI;
    c.phi2 *= 180 / PI;
}
/**
 * Solves a quadratic system of equations of the form
 *      a * x + b * y = c
 *      x² + y² = 1
 * This can be understood as the intersection of the unit circle with a line.
 *      => y = (c - a x) / b
 *      => x² + (c - a x)² / b² = 1
 *      => x² b² + c² - 2 c a x + a² x² = b²
 *      => (a² + b²) x² - 2 a c x + (c² - b²) = 0
 */
function intersectionUnitCircleLine(a, b, c) {
    assertNumbers(a, b, c);
    // cf. pqFormula
    const termSqr = a * a + b * b - c * c;
    if (0 > termSqr) {
        return [];
    }
    else if (0 === termSqr) {
        return [[(a * c) / (a * a + b * b), (b * c) / (a * a + b * b)]];
    }
    const term = Math.sqrt(termSqr);
    return [
        [
            (a * c + b * term) / (a * a + b * b),
            (b * c - a * term) / (a * a + b * b),
        ],
        [
            (a * c - b * term) / (a * a + b * b),
            (b * c + a * term) / (a * a + b * b),
        ],
    ];
}
const DEG = Math.PI / 180;
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}
function arcAt(c, x1, x2, phiDeg) {
    return (c + Math.cos((phiDeg / 180) * PI) * x1 + Math.sin((phiDeg / 180) * PI) * x2);
}
function bezierRoot(x0, x1, x2, x3) {
    const EPS = 1e-6;
    // Coefficients for the derivative of a cubic Bezier curve
    // B'(t) = 3(1-t)²(P₁-P₀) + 6(1-t)t(P₂-P₁) + 3t²(P₃-P₂)
    // When rearranged to at² + bt + c:
    const x01 = x1 - x0;
    const x12 = x2 - x1;
    const x23 = x3 - x2;
    const a = 3 * x01 + 3 * x23 - 6 * x12;
    const b = (x12 - x01) * 6;
    const c = 3 * x01;
    // solve a * t² + b * t + c = 0
    if (Math.abs(a) < EPS) {
        // For near-zero a, it becomes a linear equation: b * t + c = 0
        return Math.abs(b) < EPS ? [] : [-c / b];
    }
    return pqFormula(b / a, c / a, EPS);
}
function bezierAt(x0, x1, x2, x3, t) {
    // Calculates a point on a cubic Bezier curve at parameter t.
    // B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
    // Which is equivalent to:
    // B(t) = (s³)P₀ + (3s²t)P₁ + (3st²)P₂ + (t³)P₃  where s = 1-t
    const s = 1 - t;
    const c0 = s * s * s;
    const c1 = 3 * s * s * t;
    const c2 = 3 * s * t * t;
    const c3 = t * t * t;
    return x0 * c0 + x1 * c1 + x2 * c2 + x3 * c3;
}
function pqFormula(p, q, PRECISION = 1e-6) {
    // 4 times the discriminant:in
    const discriminantX4 = (p * p) / 4 - q;
    if (discriminantX4 < -PRECISION) {
        return [];
    }
    else if (discriminantX4 <= PRECISION) {
        return [-p / 2];
    }
    const root = Math.sqrt(discriminantX4);
    return [-(p / 2) - root, -(p / 2) + root];
}
function a2c(arc, x0, y0) {
    if (!arc.cX) {
        annotateArcCommand(arc, x0, y0);
    }
    // Convert xRot to radians
    const xRotRad = (arc.xRot / 180) * PI;
    // Handle zero radius case - convert to a straight line represented as a curve
    if (Math.abs(arc.rX) < 1e-10 || Math.abs(arc.rY) < 1e-10) {
        return [
            {
                relative: arc.relative,
                type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO,
                x1: x0 + (arc.x - x0) / 3,
                y1: y0 + (arc.y - y0) / 3,
                x2: x0 + (2 * (arc.x - x0)) / 3,
                y2: y0 + (2 * (arc.y - y0)) / 3,
                x: arc.x,
                y: arc.y,
            },
        ];
    }
    const phiMin = Math.min(arc.phi1, arc.phi2), phiMax = Math.max(arc.phi1, arc.phi2), deltaPhi = phiMax - phiMin;
    const partCount = Math.ceil(deltaPhi / 90);
    const result = new Array(partCount);
    let prevX = x0;
    let prevY = y0;
    const transform = (x, y) => {
        const [xTemp, yTemp] = rotate([x * arc.rX, y * arc.rY], xRotRad);
        return [arc.cX + xTemp, arc.cY + yTemp];
    };
    for (let i = 0; i < partCount; i++) {
        const phiStart = lerp(arc.phi1, arc.phi2, i / partCount);
        const phiEnd = lerp(arc.phi1, arc.phi2, (i + 1) / partCount);
        const deltaPhi = phiEnd - phiStart;
        const f = (4 / 3) * Math.tan((deltaPhi * DEG) / 4);
        // x1/y1, x2/y2 and x/y coordinates on the unit circle for phiStart/phiEnd
        const x1 = Math.cos(phiStart * DEG) - f * Math.sin(phiStart * DEG);
        const y1 = Math.sin(phiStart * DEG) + f * Math.cos(phiStart * DEG);
        const x = Math.cos(phiEnd * DEG);
        const y = Math.sin(phiEnd * DEG);
        const x2 = x + f * y;
        const y2 = y - f * x;
        const cp1 = transform(x1, y1);
        const cp2 = transform(x2, y2);
        const end = transform(x, y);
        const command = {
            relative: arc.relative,
            type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO,
            x: end[0],
            y: end[1],
            x1: cp1[0],
            y1: cp1[1],
            x2: cp2[0],
            y2: cp2[1],
        };
        if (arc.relative) {
            command.x1 -= prevX;
            command.y1 -= prevY;
            command.x2 -= prevX;
            command.y2 -= prevY;
            command.x -= prevX;
            command.y -= prevY;
        }
        prevX = end[0];
        prevY = end[1];
        result[i] = command;
    }
    return result;
}
/**
 * Determines if three points are collinear (lie on the same straight line)
 * and the middle point is on the line segment between the first and third points
 *
 * @param p1 First point [x, y]
 * @param p2 Middle point that might be removed
 * @param p3 Last point [x, y]
 * @returns true if the points are collinear and p2 is on the segment p1-p3
 */
function arePointsCollinear(p1, p2, p3) {
    // Create vectors
    const v1x = p2[0] - p1[0];
    const v1y = p2[1] - p1[1];
    const v2x = p3[0] - p1[0];
    const v2y = p3[1] - p1[1];
    // Cross product: v1 × v2 = v1x * v2y - v1y * v2x
    // If cross product is close to zero, points are collinear
    const cross = v1x * v2y - v1y * v2x;
    const isCollinear = Math.abs(cross) < 1e-10;
    if (!isCollinear)
        return false;
    // Now check if p2 is on the segment p1-p3
    // For this we check if the projection of v1 onto v2 is between 0 and |v2|
    // Calculate dot product
    const dot = v1x * v2x + v1y * v2y;
    // Calculate squared lengths
    const lenSqV1 = v1x * v1x + v1y * v1y;
    const lenSqV2 = v2x * v2x + v2y * v2y;
    // p2 is on segment p1-p3 if:
    // 1. 0 ≤ dot(v1,v2) ≤ dot(v2,v2) - this checks if projection is within segment
    // 2. |v1| ≤ |v2| - this checks if p2 is not beyond p3
    return 0 <= dot && dot <= lenSqV2 && lenSqV1 <= lenSqV2;
}
//# sourceMappingURL=mathUtils.js.map

/***/ }),

/***/ 24161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ImagePlus)
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
    name: "image-plus",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 5h6",
                key: "1vod17"
            }
        ],
        [
            "path",
            {
                d: "M19 2v6",
                key: "4bpg5p"
            }
        ],
        [
            "path",
            {
                d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
                key: "1ue2ih"
            }
        ],
        [
            "path",
            {
                d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
                key: "1xmnt7"
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
        ]
    ]
};
__iconData.node;
const ImagePlus = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=image-plus.mjs.map


/***/ }),

/***/ 25506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ hasTextInsets)
/* harmony export */ });
/** Imported PPTX labels carry their own text box padding on the outer div. */
function hasTextInsets(content) {
    const hasExplicitTextInsets = /^\s*<div\b[^>]*\sdata-pptx-text-insets\s*=\s*(["'])true\1/i.test(content);
    // Legacy saved slides predate the marker but retain an inline padding style.
    return (hasExplicitTextInsets || /^\s*<div\b[^>]*\sstyle\s*=\s*["'][^"']*\bpadding\s*:/i.test(content));
}


//# sourceMappingURL=hasTextInsets.js.map


/***/ }),

/***/ 27209:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ clamp)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/number.ts
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
__name(clamp, "clamp");

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 29486:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ Label)
/* harmony export */ });
/* unused harmony export Label */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55897);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Label,Root auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/label.tsx



var Label = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function Label2(props, forwardedRef) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__/* .Primitive */ .sG.label, {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event)=>{
            const target = event.target;
            if (target.closest("button, input, select, textarea")) return;
            props.onMouseDown?.(event);
            if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
    });
}, "Label"));
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 29961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ BaseShapeElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _openmaic_geometry__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32930);
/* harmony import */ var _openmaic_geometry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(48322);
/* harmony import */ var _shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61478);
/* harmony import */ var _shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66080);
/* harmony import */ var _shared_useElementFlip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(503);
/* harmony import */ var _shared_useElementFill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19217);
/* harmony import */ var _GradientDefs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(43539);
/* harmony import */ var _text_BaseTextElement_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(64679);
/* harmony import */ var _PatternDefs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(87060);
/* harmony import */ var _utils_richText_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1438);
/* harmony import */ var _utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18180);
/* harmony import */ var _shared_hasTextInsets_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(25506);
/* __next_internal_client_entry_do_not_use__ BaseShapeElement auto */ 












function BaseShapeElement({ elementInfo, renderLabel }) {
    const geometry = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_openmaic_geometry__WEBPACK_IMPORTED_MODULE_10__/* .validateShapeGeometry */ .gz)({
            path: elementInfo.path,
            viewBox: elementInfo.viewBox,
            width: elementInfo.width,
            height: elementInfo.height
        }, _openmaic_geometry__WEBPACK_IMPORTED_MODULE_10__/* .RENDER_PATH_LIMITS */ .Gb), [
        elementInfo.path,
        elementInfo.viewBox,
        elementInfo.width,
        elementInfo.height
    ]);
    if (!geometry.ok) {
        const fallback = (0,_openmaic_geometry__WEBPACK_IMPORTED_MODULE_11__/* .shapeToTextFallback */ .o)(elementInfo);
        return fallback ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            "data-shape-geometry-error": geometry.error.code,
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_BaseTextElement_js__WEBPACK_IMPORTED_MODULE_7__/* .BaseTextElement */ .d, {
                elementInfo: fallback,
                fillHeight: Boolean(renderLabel),
                renderContent: renderLabel ? (_text, content)=>renderLabel(elementInfo, content) : undefined
            })
        }) : null;
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ValidShapeElement, {
        elementInfo: elementInfo,
        renderLabel: renderLabel,
        geometry: geometry
    });
}
function ValidShapeElement({ elementInfo, renderLabel, geometry }) {
    const width = elementInfo.width;
    const height = elementInfo.height;
    const { fill } = (0,_shared_useElementFill_js__WEBPACK_IMPORTED_MODULE_5__/* .useElementFill */ .R)(elementInfo, 'base');
    const { outlineWidth, outlineColor, strokeDashArray } = (0,_shared_useElementOutline_js__WEBPACK_IMPORTED_MODULE_2__/* .useElementOutline */ .Y)(elementInfo.outline);
    const { shadowStyle } = (0,_shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_3__/* .useElementShadow */ .o)(elementInfo.shadow);
    const { flipStyle } = (0,_shared_useElementFlip_js__WEBPACK_IMPORTED_MODULE_4__/* .useElementFlip */ .L)(elementInfo.flipH, elementInfo.flipV);
    const text = elementInfo.text || {
        content: '',
        align: 'middle',
        defaultFontName: 'Microsoft YaHei',
        defaultColor: '#333333'
    };
    const proseRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const innerHtml = (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_9__/* .useInnerHtml */ .$1)(text.content);
    (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_9__/* .useInlineMath */ .NF)(proseRef, text.content);
    const justifyContent = text.align === 'top' ? 'flex-start' : text.align === 'bottom' ? 'flex-end' : 'center';
    const defaultLabelContent = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "shape-text",
        style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent,
            overflowWrap: 'break-word',
            boxSizing: 'border-box',
            padding: (0,_shared_hasTextInsets_js__WEBPACK_IMPORTED_MODULE_12__/* .hasTextInsets */ .E)(text.content) ? 0 : 10,
            lineHeight: text.lineHeight ?? 1.625,
            letterSpacing: `${text.wordSpace || 0}px`,
            // PowerPoint/WPS 在 group flipH/flipV 时只镜像几何与位置，文字字形保持
            // 正向。父层 element-content 已应用 flipStyle 镜像 SVG path；这里给文字
            // 叠加同一个 flipStyle，两次 flip 抵消，让文字保持正向。
            transform: flipStyle
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            ref: proseRef,
            "data-inline-math-root": "",
            className: "ProseMirror-static slide-renderer-prose",
            style: {
                // @ts-expect-error CSS custom properties
                '--paragraphSpace': `${text.paragraphSpace === undefined ? 5 : text.paragraphSpace}px`,
                whiteSpace: (0,_utils_richText_js__WEBPACK_IMPORTED_MODULE_13__/* .preservesPlainTextLineBreaks */ .h)(text.content) ? 'pre-line' : undefined
            },
            dangerouslySetInnerHTML: innerHtml
        })
    });
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-shape",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${width}px`,
            height: `${height}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "element-content",
                style: {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    opacity: elementInfo.opacity,
                    filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '',
                    transform: flipStyle,
                    color: text.defaultColor,
                    fontFamily: text.defaultFontName
                },
                children: [
                    (()=>{
                        // The shape's path can extend OUTSIDE its width×height box (e.g.
                        // curved connectors whose extreme adj values bulge the curve far
                        // past the bbox). A browser shows that via overflow:visible, but
                        // html2canvas-pro rasterizes each SVG to its width×height viewport
                        // and CLIPS the overflow — turning connector arcs into stubs in the
                        // exported PNG. Fix: grow the SVG viewport to contain the full path
                        // bbox and offset it back, so the geometry renders in the exact same
                        // place but nothing falls outside the captured viewport.
                        const sx = elementInfo.width / elementInfo.viewBox[0];
                        const sy = elementInfo.height / elementInfo.viewBox[1];
                        const bbox = geometry.bounds;
                        const CAP = 4000; // guard against pathological coords blowing up the SVG
                        let padL = 0;
                        let padT = 0;
                        let padR = 0;
                        let padB = 0;
                        if (bbox) {
                            padL = Math.min(CAP, Math.max(0, -bbox.minX * sx));
                            padT = Math.min(CAP, Math.max(0, -bbox.minY * sy));
                            padR = Math.min(CAP, Math.max(0, bbox.maxX * sx - elementInfo.width));
                            padB = Math.min(CAP, Math.max(0, bbox.maxY * sy - elementInfo.height));
                        }
                        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            overflow: "visible",
                            width: width + padL + padR,
                            height: height + padT + padB,
                            style: {
                                position: 'absolute',
                                left: -padL,
                                top: -padT,
                                transformOrigin: '0 0',
                                overflow: 'visible',
                                display: 'block'
                            },
                            children: [
                                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                                    children: [
                                        elementInfo.pattern && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PatternDefs_js__WEBPACK_IMPORTED_MODULE_8__/* .PatternDefs */ .P, {
                                            id: `base-pattern-${elementInfo.id}`,
                                            src: elementInfo.pattern
                                        }),
                                        elementInfo.gradient && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_GradientDefs_js__WEBPACK_IMPORTED_MODULE_6__/* .GradientDefs */ .v, {
                                            id: `base-gradient-${elementInfo.id}`,
                                            type: elementInfo.gradient.type,
                                            colors: elementInfo.gradient.colors,
                                            rotate: elementInfo.gradient.rotate
                                        })
                                    ]
                                }),
                                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
                                    transform: `translate(${padL},${padT}) scale(${sx}, ${sy})`,
                                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                        vectorEffect: "non-scaling-stroke",
                                        strokeLinecap: "butt",
                                        strokeMiterlimit: "8",
                                        d: elementInfo.path,
                                        fill: fill,
                                        stroke: outlineColor,
                                        strokeWidth: outlineWidth,
                                        strokeDasharray: strokeDashArray
                                    })
                                })
                            ]
                        });
                    })(),
                    renderLabel ? renderLabel(elementInfo, defaultLabelContent) : defaultLabelContent
                ]
            })
        })
    });
}
 //# sourceMappingURL=BaseShapeElement.js.map


/***/ }),

/***/ 31266:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gz: () => (/* reexport safe */ _decode_js__WEBPACK_IMPORTED_MODULE_0__.Gz)
/* harmony export */ });
/* unused harmony exports EntityLevel, EncodingMode, decode, decodeStrict, encode */
/* harmony import */ var _decode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97828);
/* harmony import */ var _encode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2220);
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68681);



/** The level of entities to support. */
var EntityLevel;
(function (EntityLevel) {
    /** Support only XML entities. */
    EntityLevel[EntityLevel["XML"] = 0] = "XML";
    /** Support HTML entities, which are a superset of XML entities. */
    EntityLevel[EntityLevel["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function (EncodingMode) {
    /**
     * The output is UTF-8 encoded. Only characters that need escaping within
     * XML will be escaped.
     */
    EncodingMode[EncodingMode["UTF8"] = 0] = "UTF8";
    /**
     * The output consists only of ASCII characters. Characters that need
     * escaping within HTML, and characters that aren't ASCII characters will
     * be escaped.
     */
    EncodingMode[EncodingMode["ASCII"] = 1] = "ASCII";
    /**
     * Encode all characters that have an equivalent entity, as well as all
     * characters that are not ASCII characters.
     */
    EncodingMode[EncodingMode["Extensive"] = 2] = "Extensive";
    /**
     * Encode all characters that have to be escaped in HTML attributes,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Attribute"] = 3] = "Attribute";
    /**
     * Encode all characters that have to be escaped in HTML text,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));
/**
 * Decodes a string with entities.
 *
 * @param input String to decode.
 * @param options Decoding options.
 */
function decode(input, options = EntityLevel.XML) {
    const level = typeof options === "number" ? options : options.level;
    if (level === EntityLevel.HTML) {
        const mode = typeof options === "object" ? options.mode : undefined;
        return decodeHTML(input, mode);
    }
    return decodeXML(input);
}
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param input String to decode.
 * @param options Decoding options.
 * @deprecated Use `decode` with the `mode` set to `Strict`.
 */
function decodeStrict(input, options = EntityLevel.XML) {
    var _a;
    const normalizedOptions = typeof options === "number" ? { level: options } : options;
    (_a = normalizedOptions.mode) !== null && _a !== void 0 ? _a : (normalizedOptions.mode = DecodingMode.Strict);
    return decode(input, normalizedOptions);
}
/**
 * Encodes a string with entities.
 *
 * @param input String to encode.
 * @param options Encoding options.
 */
function encode(input, options = EntityLevel.XML) {
    const { mode = EncodingMode.Extensive, level = EntityLevel.XML } = typeof options === "number" ? { level: options } : options;
    switch (mode) {
        case EncodingMode.UTF8: {
            return escapeUTF8(input);
        }
        case EncodingMode.Attribute: {
            return escapeAttribute(input);
        }
        case EncodingMode.Text: {
            return escapeText(input);
        }
        case EncodingMode.ASCII: {
            return level === EntityLevel.HTML
                ? encodeNonAsciiHTML(input)
                : encodeXML(input);
        }
        // eslint-disable-next-line unicorn/no-useless-switch-case
        case EncodingMode.Extensive:
        default: {
            return level === EntityLevel.HTML
                ? encodeHTML(input)
                : encodeXML(input);
        }
    }
}



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 31818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ LinePointMarker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);


const pathMap = {
    dot: 'm0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z',
    arrow: 'M0,0 L10,5 0,10 Z',
};
const rotateMap = {
    'arrow-start': 180,
    'arrow-end': 0,
};
function LinePointMarker({ id, position, type, baseSize, color }) {
    const path = pathMap[type];
    const rotate = rotateMap[`${type}-${position}`] || 0;
    const size = baseSize < 2 ? 2 : baseSize;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("marker", { id: `${id}-${type}-${position}`, markerUnits: "userSpaceOnUse", orient: "auto", markerWidth: size * 3, markerHeight: size * 3, refX: size * 1.5, refY: size * 1.5, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: path, fill: color, transform: `scale(${size * 0.3}, ${size * 0.3}) rotate(${rotate}, 5, 5)` }) }));
}


//# sourceMappingURL=LinePointMarker.js.map


/***/ }),

/***/ 32930:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gb: () => (/* binding */ RENDER_PATH_LIMITS),
/* harmony export */   gz: () => (/* binding */ validateShapeGeometry)
/* harmony export */ });
/* unused harmony exports INPUT_PATH_LIMITS, validateSvgPath, shapeGeometryChanged */
/* harmony import */ var svg_pathdata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79577);


const INPUT_PATH_LIMITS = Object.freeze({
    maxLength: 100_000,
    maxCommands: 10_000,
    maxCoordinate: 1_000_000,
});
/** Rendering budget only: never apply these limits while loading a document. */
const RENDER_PATH_LIMITS = Object.freeze({
    maxLength: 2_000_000,
    maxCommands: 200_000,
    maxCoordinate: 1e12,
});
const ARG_COUNTS = {
    M: 2,
    L: 2,
    H: 1,
    V: 1,
    C: 6,
    S: 4,
    Q: 4,
    T: 2,
    A: 7,
    Z: 0,
};
const NUMBER = /[+-]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?/y;
const whitespace = (c) => c !== undefined && /[ \t\r\n\f]/.test(c);
function fail(code, field, message, position) {
    return {
        ok: false,
        error: { code, field, message, ...(position === undefined ? {} : { position }) },
    };
}
function numericError(value, limit) {
    if (!Number.isFinite(value))
        return 'non_finite';
    return Math.abs(value) > limit ? 'resource_limit' : null;
}
class GeometryComputationError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
/**
 * Validate the complete SVG path grammar before delegating geometry to svg-pathdata.
 * The library alone accepts numbers after Z, Infinity, and missing arc separators.
 * No browser, logger, DOM, exporter, or document mutation is involved.
 */
function validateSvgPath(path, policy = {}) {
    const limits = { ...INPUT_PATH_LIMITS, ...policy };
    if (typeof path !== 'string')
        return fail('syntax', 'path', 'Expected an SVG path string');
    if (path.length > limits.maxLength)
        return fail('resource_limit', 'path', `Path exceeds ${limits.maxLength} code units`);
    let i = 0;
    let count = 0;
    let command = '';
    const segments = [];
    const skipWhitespace = () => {
        while (whitespace(path[i]))
            i++;
    };
    skipWhitespace();
    if (i < path.length && !/[Mm]/.test(path[i]))
        return fail('syntax', 'path', 'Path must begin with moveto (M or m)', i);
    while (i < path.length) {
        let explicit = false;
        if (Object.hasOwn(ARG_COUNTS, path[i].toUpperCase())) {
            command = path[i++];
            explicit = true;
        }
        else if (!command || command.toUpperCase() === 'Z') {
            return fail('syntax', 'path', 'Expected a path command; numbers cannot follow closepath', i);
        }
        if (++count > limits.maxCommands)
            return fail('resource_limit', 'path', `Path exceeds ${limits.maxCommands} commands`, i);
        const upper = command.toUpperCase();
        if (upper === 'Z') {
            segments.push(command);
            skipWhitespace();
            continue;
        }
        const args = [];
        for (let arg = 0; arg < ARG_COUNTS[upper]; arg++) {
            const before = i;
            skipWhitespace();
            let separated = i > before;
            if (path[i] === ',') {
                if (explicit && arg === 0)
                    return fail('syntax', 'path', 'Comma cannot follow a command', i);
                i++;
                skipWhitespace();
                separated = true;
            }
            const flag = upper === 'A' && (arg === 3 || arg === 4);
            if (i === path.length)
                return fail('syntax', 'path', flag ? 'Arc flag must be 0 or 1' : `Expected parameter ${arg + 1} of ${command}`, i);
            // Signs and a second decimal point terminate the preceding number. Arc
            // flags are single digits and may be adjacent to each other and to x.
            const previousWasFlag = upper === 'A' && (arg === 4 || arg === 5);
            if (!separated &&
                !(explicit && arg === 0) &&
                !previousWasFlag &&
                i > 0 &&
                !/[+\-.]/.test(path[i] ?? '')) {
                return fail('syntax', 'path', 'Expected a separator between numbers', i);
            }
            NUMBER.lastIndex = i;
            const token = flag
                ? /[01]/.test(path[i] ?? '') && path[i] !== undefined
                    ? path[i]
                    : null
                : NUMBER.exec(path)?.[0];
            if (!token)
                return fail('syntax', 'path', flag ? 'Arc flag must be 0 or 1' : `Expected parameter ${arg + 1} of ${command}`, i);
            const value = Number(token);
            const error = numericError(value, limits.maxCoordinate);
            if (error)
                return fail(error, 'path', error === 'non_finite'
                    ? 'Path number must be finite'
                    : `Path number exceeds ${limits.maxCoordinate}`, i);
            if (upper === 'A' && arg < 2 && value < 0)
                return fail('syntax', 'path', 'Arc radius must be non-negative', i);
            args.push(String(value));
            i += token.length;
        }
        // Explicit separators also avoid svg-pathdata's special treatment of 00.
        segments.push(`${command} ${args.join(' ')}`);
        if (upper === 'M')
            command = command === 'm' ? 'l' : 'L';
        // Leave separators for implicit repetitions to the next iteration.
        const end = i;
        skipWhitespace();
        if (i === path.length || Object.hasOwn(ARG_COUNTS, path[i].toUpperCase()))
            continue;
        i = end;
    }
    try {
        const parsed = new svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ(segments.join(' '));
        let previousX = 0, previousY = 0;
        const absolute = new svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ(parsed.commands.map((c) => ({ ...c })))
            .toAbs()
            // svg-pathdata turns zero-radius arcs into lines here, before arcControlPoints.
            .transform(svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathDataTransformer */ .zb.NORMALIZE_HVZ(true, true, true, false))
            .normalizeST()
            .qtToC()
            .transform((c) => {
            // Equal arc endpoints draw nothing (SVG2 F.6); a2c would divide by zero.
            const command = c.type === svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.ARC
                ? arcControlPoints(c, previousX, previousY, limits.maxCoordinate)
                : c;
            if ('x' in c)
                previousX = c.x;
            if ('y' in c)
                previousY = c.y;
            return command;
        });
        let bounds = null;
        for (const c of absolute.commands) {
            for (const [key, value] of Object.entries(c)) {
                if (key === 'type' || typeof value !== 'number')
                    continue;
                const error = numericError(value, limits.maxCoordinate);
                if (error)
                    return fail(error, 'path', 'Resolved path geometry exceeds numeric limits');
            }
            for (const [xKey, yKey] of [
                ['x', 'y'],
                ['x1', 'y1'],
                ['x2', 'y2'],
            ]) {
                const point = c;
                const x = point[xKey], y = point[yKey];
                if (typeof x !== 'number' || typeof y !== 'number')
                    continue;
                if (!bounds)
                    bounds = { minX: x, maxX: x, minY: y, maxY: y };
                else {
                    bounds.minX = Math.min(bounds.minX, x);
                    bounds.maxX = Math.max(bounds.maxX, x);
                    bounds.minY = Math.min(bounds.minY, y);
                    bounds.maxY = Math.max(bounds.maxY, y);
                }
            }
        }
        // A null/zero-sized bbox is legitimate for an empty/moveto/degenerate path.
        return { ok: true, commands: parsed.commands, bounds };
    }
    catch (error) {
        return fail(error instanceof GeometryComputationError ? error.code : 'non_finite', 'path', error instanceof Error ? error.message : 'Path geometry computation failed');
    }
}
/**
 * Normalize each arc in local unit coordinates before using the library. Its
 * absolute 1e-10 radius epsilon would otherwise turn valid tiny arcs into lines;
 * unscaled radius squares can also overflow. The stored command stays unchanged.
 */
function arcControlPoints(arc, x, y, limit) {
    if (arc.x === x && arc.y === y)
        return [{ type: svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.LINE_TO, relative: false, x, y }];
    const theta = ((arc.xRot % 360) * Math.PI) / 180;
    const dx = x / 2 - arc.x / 2, dy = y / 2 - arc.y / 2;
    const chordX = Math.cos(theta) * dx + Math.sin(theta) * dy;
    const chordY = -Math.sin(theta) * dx + Math.cos(theta) * dy;
    const radius = Math.max(arc.rX, arc.rY);
    const rx = arc.rX / radius, ry = arc.rY / radius;
    // SVG endpoint-to-center radius correction, with no squared tiny/huge radii.
    const corrected = Math.max(radius, Math.hypot(chordX / rx, chordY / ry));
    if (![corrected, corrected * rx, corrected * ry].every(Number.isFinite))
        throw new Error('Arc radius correction overflowed');
    if (corrected > limit)
        throw new GeometryComputationError('resource_limit', 'Corrected arc radius exceeds numeric limits');
    // An extreme aspect ratio falls below the dependency's precision. Reject it
    // explicitly instead of silently deriving the bounds of a different path.
    if (rx < 1e-10 || ry < 1e-10)
        throw new Error('Arc aspect ratio exceeds supported numerical precision');
    const local = new svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ([
        { type: svg_pathdata__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.MOVE_TO, relative: false, x: 0, y: 0 },
        {
            ...arc,
            rX: rx,
            rY: ry,
            xRot: arc.xRot % 360,
            x: (arc.x - x) / corrected,
            y: (arc.y - y) / corrected,
        },
    ]).aToC();
    if (local.commands.length < 2)
        throw new Error('Arc conversion lost non-degenerate geometry at numerical precision limits');
    return local.commands.slice(1).map((command) => {
        const values = { ...command };
        for (const key of ['x', 'x1', 'x2'])
            if (typeof values[key] === 'number')
                values[key] = values[key] * corrected + x;
        for (const key of ['y', 'y1', 'y2'])
            if (typeof values[key] === 'number')
                values[key] = values[key] * corrected + y;
        return values;
    });
}
function validateShapeGeometry(shape, policy = {}) {
    const limit = policy.maxCoordinate ?? INPUT_PATH_LIMITS.maxCoordinate;
    if (!Array.isArray(shape.viewBox) || shape.viewBox.length !== 2)
        return fail('invalid_dimension', 'viewBox', 'Expected two positive viewBox dimensions');
    for (const [field, value] of [
        ['viewBox[0]', shape.viewBox[0]],
        ['viewBox[1]', shape.viewBox[1]],
        ['width', shape.width],
        ['height', shape.height],
    ]) {
        if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0)
            return fail('invalid_dimension', field, 'Dimension must be finite and positive');
        if (value > limit)
            return fail('resource_limit', field, `Dimension exceeds ${limit}`);
    }
    const sx = shape.width / shape.viewBox[0], sy = shape.height / shape.viewBox[1];
    if (!Number.isFinite(sx) || !Number.isFinite(sy))
        return fail('non_finite', 'viewBox', 'Scaling must be finite');
    const result = validateSvgPath(shape.path, policy);
    if (!result.ok || !result.bounds)
        return result;
    for (const value of [
        result.bounds.minX * sx,
        result.bounds.maxX * sx,
        result.bounds.minY * sy,
        result.bounds.maxY * sy,
    ]) {
        const error = numericError(value, limit);
        if (error)
            return fail(error, 'viewBox', 'Scaled path geometry exceeds numeric limits');
    }
    return result;
}
/** Validate only changed geometry so unrelated edits of historical shapes work. */
function shapeGeometryChanged(before, after) {
    const viewBoxChanged = Array.isArray(before.viewBox) && Array.isArray(after.viewBox)
        ? before.viewBox.length !== after.viewBox.length ||
            before.viewBox.some((value, index) => !Object.is(value, after.viewBox[index]))
        : !Object.is(before.viewBox, after.viewBox);
    return (before.path !== after.path ||
        !Object.is(before.width, after.width) ||
        !Object.is(before.height, after.height) ||
        viewBoxChanged);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 33229:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useClipImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _clipPaths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61799);



function useClipImage(element) {
    const clipShape = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        let _clipShape = _clipPaths_js__WEBPACK_IMPORTED_MODULE_1__/* .CLIPPATHS */ .$.rect;
        if (element.clip) {
            const shape = element.clip.shape || _clipPaths_js__WEBPACK_IMPORTED_MODULE_1__/* .ClipPathTypes */ .x.RECT;
            _clipShape = _clipPaths_js__WEBPACK_IMPORTED_MODULE_1__/* .CLIPPATHS */ .$[shape] ?? _clipPaths_js__WEBPACK_IMPORTED_MODULE_1__/* .CLIPPATHS */ .$.rect;
        }
        if (_clipShape.radius !== undefined && element.radius !== undefined) {
            _clipShape = {
                ..._clipShape,
                radius: `${element.radius}px`,
                style: `inset(0 round ${element.radius}px)`,
            };
        }
        return _clipShape;
    }, [element.clip, element.radius]);
    const imgPosition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (!element.clip || !element.clip.range) {
            return { top: '0', left: '0', width: '100%', height: '100%' };
        }
        const [start, end] = element.clip.range;
        const widthScale = (end[0] - start[0]) / 100;
        const heightScale = (end[1] - start[1]) / 100;
        const left = start[0] / widthScale;
        const top = start[1] / heightScale;
        return {
            left: -left + '%',
            top: -top + '%',
            width: 100 / widthScale + '%',
            height: 100 / heightScale + '%',
        };
    }, [element.clip]);
    return { clipShape, imgPosition };
}


//# sourceMappingURL=useClipImage.js.map


/***/ }),

/***/ 34160:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cN: () => (/* binding */ useOptionalSlideContext)
/* harmony export */ });
/* unused harmony exports SlideRendererProvider, useSlideContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ SlideRendererProvider,useOptionalSlideContext,useSlideContext auto */ 

const SlideContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function SlideRendererProvider({ children, className, style, ...value }) {
    return jsx(SlideContext.Provider, {
        value: value,
        children: className || style ? jsx("div", {
            className: className,
            style: style,
            children: children
        }) : children
    });
}
/**
 * Read the closest SlideRendererProvider value.
 * Throws if used outside a provider — use `useOptionalSlideContext` for nullable access.
 */ function useSlideContext() {
    const value = useContext(SlideContext);
    if (!value) {
        throw new Error('useSlideContext must be used inside a <SlideRendererProvider>. ' + 'Pass props directly to <SlideCanvas> if you do not need the provider.');
    }
    return value;
}
/** Nullable variant; returns null when outside a provider. */ function useOptionalSlideContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SlideContext);
}
 //# sourceMappingURL=context.js.map


/***/ }),

/***/ 35820:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useViewportSize)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


/**
 * Compute the viewport rect and fit-scale needed to center a slide of size
 * `viewportSize × viewportSize*viewportRatio` inside `canvasRef`.
 *
 * Pure: no store access. Re-runs on container resize via ResizeObserver.
 */
function useViewportSize(canvasRef, options = {}) {
    const { viewportSize = 1000, viewportRatio = 0.5625, canvasPercentage = 100, onScaleChange, } = options;
    const [viewportLeft, setViewportLeft] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const [viewportTop, setViewportTop] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const [fitScale, setFitScale] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
    const lastReportedScaleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(undefined);
    const wasReportingScaleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const updateFitScale = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((nextScale) => {
        if (Object.is(lastReportedScaleRef.current, nextScale))
            return;
        lastReportedScaleRef.current = nextScale;
        setFitScale(nextScale);
        onScaleChange?.(nextScale);
    }, [onScaleChange]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const isReportingScale = onScaleChange !== undefined;
        if (isReportingScale && !wasReportingScaleRef.current) {
            lastReportedScaleRef.current = undefined;
        }
        wasReportingScaleRef.current = isReportingScale;
    }, [onScaleChange]);
    const computeFit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        if (!canvasRef.current)
            return;
        const canvasWidth = canvasRef.current.clientWidth;
        const canvasHeight = canvasRef.current.clientHeight;
        if (canvasHeight / canvasWidth > viewportRatio) {
            const viewportActualWidth = canvasWidth * (canvasPercentage / 100);
            const nextScale = viewportActualWidth / viewportSize;
            updateFitScale(nextScale);
            setViewportLeft((canvasWidth - viewportActualWidth) / 2);
            setViewportTop((canvasHeight - viewportActualWidth * viewportRatio) / 2);
        }
        else {
            const viewportActualHeight = canvasHeight * (canvasPercentage / 100);
            const nextScale = viewportActualHeight / (viewportSize * viewportRatio);
            updateFitScale(nextScale);
            setViewportLeft((canvasWidth - viewportActualHeight / viewportRatio) / 2);
            setViewportTop((canvasHeight - viewportActualHeight) / 2);
        }
    }, [canvasRef, canvasPercentage, updateFitScale, viewportRatio, viewportSize]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        computeFit();
    }, [computeFit]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const el = canvasRef.current;
        if (!el)
            return;
        const resizeObserver = new ResizeObserver(computeFit);
        resizeObserver.observe(el);
        return () => resizeObserver.unobserve(el);
    }, [canvasRef, computeFit]);
    const viewportStyles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
        width: viewportSize,
        height: viewportSize * viewportRatio,
        left: viewportLeft,
        top: viewportTop,
    }), [viewportSize, viewportRatio, viewportLeft, viewportTop]);
    return { viewportStyles, fitScale };
}


//# sourceMappingURL=useViewportSize.js.map


/***/ }),

/***/ 35942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jp: () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.jp)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59281);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59107);






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

/***/ 36790:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ StaticTable)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _utils_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74885);
/* harmony import */ var _tableUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98149);
/* harmony import */ var _utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18180);
/* __next_internal_client_entry_do_not_use__ StaticTable auto */ 




function cellBorderCss(b) {
    if (!b || b.width <= 0) return undefined;
    const style = b.style === 'dashed' || b.style === 'dotted' ? b.style : 'solid';
    return `${b.width}px ${style} ${b.color}`;
}
function StaticTable({ elementInfo }) {
    const { width, data, colWidths, cellMinHeight, rowHeights, outline, theme } = elementInfo;
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const cellText = data.map((row)=>row.map((cell)=>cell?.text ?? ''));
    // Stable per-cell values: React then leaves unchanged cell markup alone.
    const cellHtml = (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_3__/* .useInnerHtmlGrid */ .D3)(cellText);
    (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_3__/* .useInlineMath */ .NF)(tableRef, cellText.flat().join(''));
    const [subThemeDark, subThemeLight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!theme) return [
            '',
            ''
        ];
        return (0,_utils_element_js__WEBPACK_IMPORTED_MODULE_2__/* .getTableSubThemeColor */ .j3)(theme.color);
    }, [
        theme
    ]);
    const borderStyle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!outline) return 'none';
        const w = outline.width ?? 1;
        const c = outline.color ?? '#000';
        const s = outline.style === 'dashed' ? 'dashed' : 'solid';
        return `${w}px ${s} ${c}`;
    }, [
        outline
    ]);
    const getCellBg = (rowIdx, colIdx, cellBackcolor)=>{
        if (cellBackcolor) return cellBackcolor;
        if (!theme) return undefined;
        const rowCount = data.length;
        const colCount = data[0]?.length ?? 0;
        if (theme.rowHeader && rowIdx === 0) return theme.color;
        if (theme.rowFooter && rowIdx === rowCount - 1) return theme.color;
        if (theme.colHeader && colIdx === 0) return subThemeDark;
        if (theme.colFooter && colIdx === colCount - 1) return subThemeDark;
        const effectiveRow = theme.rowHeader ? rowIdx - 1 : rowIdx;
        if (effectiveRow >= 0 && effectiveRow % 2 === 0) return subThemeLight;
        return undefined;
    };
    const getHeaderTextColor = (rowIdx)=>{
        if (!theme) return undefined;
        const rowCount = data.length;
        if (theme.rowHeader && rowIdx === 0) return '#fff';
        if (theme.rowFooter && rowIdx === rowCount - 1) return '#fff';
        return undefined;
    };
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
        ref: tableRef,
        "data-inline-math-root": "",
        className: "slide-renderer-prose",
        style: {
            width: '100%',
            height: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'fixed'
        },
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("colgroup", {
                children: colWidths.map((w, i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("col", {
                        style: {
                            width: `${w * width}px`
                        }
                    }, i))
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                children: data.map((row, rowIdx)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                        style: {
                            height: `${rowHeights?.[rowIdx] ?? cellMinHeight}px`
                        },
                        children: row.map((cell, colIdx)=>{
                            // parser side (transformParsedToSlides) 已经把 hMerge/vMerge
                            // continuation 单元格剔除了，data[r] 只剩 top-left cells；浏览器
                            // 的 HTML table layout 通过 td.colSpan/rowSpan 自动算正确位置，
                            // 不需要再手动算 hiddenCells（旧实现用 data-index 比对 grid-coord
                            // key，混了两种坐标系，把 colspan 跨过的 grid-coord 等于另一格
                            // 的 data-index 时会误隐藏，slide 26 表头 "权重"/"好" 就是中招）。
                            const bgColor = getCellBg(rowIdx, colIdx, cell.style?.backcolor);
                            const headerColor = getHeaderTextColor(rowIdx);
                            const textStyle = (0,_tableUtils_js__WEBPACK_IMPORTED_MODULE_4__/* .getTextStyle */ .$)(cell.style);
                            if (headerColor && !cell.style?.color) {
                                textStyle.color = headerColor;
                            }
                            // 单元格自带逐边描边时按边渲染（未定义的边不画）；否则回退到
                            // 表级 outline 套四边的旧行为，保留真·网格表格的表现。
                            const cellBorders = cell.borders;
                            const borderCss = cellBorders && (cellBorders.top || cellBorders.bottom || cellBorders.left || cellBorders.right) ? {
                                borderTop: cellBorderCss(cellBorders.top) ?? 'none',
                                borderBottom: cellBorderCss(cellBorders.bottom) ?? 'none',
                                borderLeft: cellBorderCss(cellBorders.left) ?? 'none',
                                borderRight: cellBorderCss(cellBorders.right) ?? 'none'
                            } : {
                                border: borderStyle
                            };
                            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                colSpan: cell.colspan > 1 ? cell.colspan : undefined,
                                rowSpan: cell.rowspan > 1 ? cell.rowspan : undefined,
                                style: {
                                    ...borderCss,
                                    backgroundColor: bgColor,
                                    ...textStyle
                                },
                                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "slide-renderer-cell-text",
                                    style: {
                                        minHeight: `${(rowHeights?.[rowIdx] ?? cellMinHeight) - 4}px`,
                                        padding: cell.padding,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        lineHeight: 1,
                                        justifyContent: cell.vAlign === 'top' ? 'flex-start' : cell.vAlign === 'bottom' ? 'flex-end' : 'center'
                                    },
                                    // cell.text is already final HTML (transformParsedToSlides
                                    // escapes text + converts \n/spaces and keeps <p> positioning
                                    // styles). Do NOT run formatText here — its space→&nbsp;
                                    // replacement corrupts style attributes like
                                    // `margin-left: calc(42px + 0.25em)` → the title indent is
                                    // lost and collides with the cell's left icon (slide 5).
                                    dangerouslySetInnerHTML: cellHtml[rowIdx][colIdx]
                                })
                            }, cell.id);
                        })
                    }, rowIdx))
            })
        ]
    });
}
 //# sourceMappingURL=StaticTable.js.map


/***/ }),

/***/ 36803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ SLIDE_RENDERER_STYLES)
/* harmony export */ });
/* unused harmony export createTextProseStyles */
/**
 * Package-level CSS rules that can't be expressed inline (descendant selectors,
 * keyframes, pseudo-classes). Rendered once via `<style>` at the top of
 * `<SlideCanvas>` so the package stays self-contained without Tailwind.
 *
 * The `.slide-renderer-prose` rules undo host and user-agent defaults so the
 * slide JSON is the single source of truth. Paragraph spacing comes from the
 * `--paragraphSpace` CSS variable. List rules restore semantic markers that
 * host resets such as Tailwind Preflight remove.
 */
/**
 * Generates the reset rules that define rich-text geometry inside a slide.
 *
 * Both the static renderer and the ProseMirror editor need these exact rules:
 * keeping the selector configurable lets them share one layout contract while
 * retaining their different DOM roots.
 */
function createTextProseStyles(selector) {
    return `
${selector} p {
  margin-top: 0;
  margin-bottom: var(--paragraphSpace, 0);
}
${selector} p:last-child {
  margin-bottom: 0;
}
${selector} p:empty::before {
  content: '\\00a0';
}
${selector} .katex-display {
  margin: 0 !important;
}
${selector} ul {
  list-style-position: outside !important;
  padding-inline-start: 1.5rem !important;
}
${selector} ul:not([style*="list-style-type"]) {
  list-style-type: disc !important;
}
${selector} ol {
  list-style-position: outside !important;
  padding-inline-start: 1.5rem !important;
}
${selector} ol:not([style*="list-style-type"]) {
  list-style-type: decimal !important;
}
${selector} li {
  display: list-item !important;
}
`;
}
const SLIDE_RENDERER_STYLES = `
${createTextProseStyles('.slide-renderer-prose')}
/* Table cell inner container — matches the classroom (Vue) .cell-text design:
   tight base line-height, and a small spacing between adjacent <p> siblings
   so multi-paragraph cells don't collapse into a single visual block. The
   <p> margin reset above sets the baseline to 0; this rule re-adds spacing
   only between adjacent siblings, leaving the first/last paragraph flush. */
/* The editor adds a ProseMirror wrapper with its own paragraph reset. Keep
   the same gap there with enough specificity to beat that reset. */
.slide-renderer-cell-text p + p,
.slide-renderer-cell-text .ProseMirror p + p {
  margin-top: 0.4em;
}
@keyframes slide-renderer-pulse {
  50% { opacity: 0.5; }
}
@keyframes slide-renderer-ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
@keyframes slide-renderer-code-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.slide-renderer-pulse {
  animation: slide-renderer-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.slide-renderer-ping {
  animation: slide-renderer-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;


//# sourceMappingURL=styles.js.map


/***/ }),

/***/ 39700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MK: () => (/* binding */ fromCodePoint),
/* harmony export */   y6: () => (/* binding */ replaceCodePoint)
/* harmony export */ });
/* unused harmony export decodeCodePoint */
// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
const decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
const fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    let output = "";
    if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(((codePoint >>> 10) & 1023) | 55296);
        codePoint = 56320 | (codePoint & 1023);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 55296 && codePoint <= 57343) ||
        codePoint > 1114111) {
        return 65533;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
/**
 * Replace the code point if relevant, then convert it to a string.
 *
 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
 * @param codePoint The code point to decode.
 * @returns The decoded code point.
 */
function decodeCodePoint(codePoint) {
    return fromCodePoint(replaceCodePoint(codePoint));
}
//# sourceMappingURL=decode-codepoint.js.map

/***/ }),

/***/ 39979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Film)
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
    name: "film",
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
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M7 3v18",
                key: "bbkbws"
            }
        ],
        [
            "path",
            {
                d: "M3 7.5h4",
                key: "zfgn84"
            }
        ],
        [
            "path",
            {
                d: "M3 12h18",
                key: "1i2n21"
            }
        ],
        [
            "path",
            {
                d: "M3 16.5h4",
                key: "1230mu"
            }
        ],
        [
            "path",
            {
                d: "M17 3v18",
                key: "in4fa5"
            }
        ],
        [
            "path",
            {
                d: "M17 7.5h4",
                key: "myr1c1"
            }
        ],
        [
            "path",
            {
                d: "M17 16.5h4",
                key: "go4c1d"
            }
        ]
    ]
};
__iconData.node;
const Film = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=film.mjs.map


/***/ }),

/***/ 40045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ BaseTableElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _StaticTable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36790);
/* __next_internal_client_entry_do_not_use__ BaseTableElement auto */ 

function BaseTableElement({ elementInfo, target, renderContent }) {
    const defaultContent = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StaticTable_js__WEBPACK_IMPORTED_MODULE_1__/* .StaticTable */ .z, {
        elementInfo: elementInfo
    });
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-table",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`,
            pointerEvents: target === 'thumbnail' ? 'none' : undefined
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "element-content",
                style: {
                    width: '100%',
                    height: '100%'
                },
                children: renderContent?.(elementInfo, defaultContent) ?? defaultContent
            })
        })
    });
}
 //# sourceMappingURL=BaseTableElement.js.map


/***/ }),

/***/ 40082:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ HighlightOverlay)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ HighlightOverlay auto */ 
function HighlightOverlay({ element, options }) {
    if (element.type === 'line') return null;
    const color = options?.color ?? '#ff6b6b';
    const opacity = options?.opacity ?? 0.3;
    const borderWidth = options?.borderWidth ?? 3;
    const animated = options?.animated ?? true;
    const height = 'height' in element ? element.height : 0;
    const rotate = 'rotate' in element ? element.rotate : 0;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "highlight-overlay",
        style: {
            position: 'absolute',
            pointerEvents: 'none',
            left: `${element.left}px`,
            top: `${element.top}px`,
            width: `${element.width}px`,
            height: `${height}px`,
            transform: `rotate(${rotate || 0}deg)`,
            transformOrigin: 'center',
            zIndex: 999,
            transition: 'all 0.3s ease-in-out'
        },
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: animated ? 'slide-renderer-pulse' : undefined,
                style: {
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '4px',
                    border: `${borderWidth}px solid ${color}`,
                    boxShadow: `0 0 ${borderWidth * 3}px ${color}, inset 0 0 ${borderWidth * 2}px rgba(255,255,255,${opacity * 0.5})`,
                    backgroundColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
                }
            }),
            animated && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "slide-renderer-ping",
                style: {
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '4px',
                    border: `${borderWidth}px solid ${color}`,
                    opacity: 0.5,
                    animationDuration: '2s'
                }
            })
        ]
    });
}
 //# sourceMappingURL=HighlightOverlay.js.map


/***/ }),

/***/ 40342:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ SlideElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9903);
/* harmony import */ var _elements_image_BaseImageElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7837);
/* harmony import */ var _elements_text_BaseTextElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64679);
/* harmony import */ var _elements_shape_BaseShapeElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29961);
/* harmony import */ var _elements_line_BaseLineElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3925);
/* harmony import */ var _elements_chart_BaseChartElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51677);
/* harmony import */ var _elements_latex_BaseLatexElement_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42829);
/* harmony import */ var _elements_table_BaseTableElement_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40045);
/* harmony import */ var _elements_video_BaseVideoElement_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83253);
/* harmony import */ var _elements_audio_BaseAudioElement_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64137);
/* harmony import */ var _elements_code_BaseCodeElement_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(94195);
/* __next_internal_client_entry_do_not_use__ SlideElement auto */ 












const DEFAULT_THEME = {
    fontColor: '#333333',
    fontName: 'Microsoft YaHei'
};
const SlideElementContent = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function SlideElementContent({ elementInfo, animate, renderImage, renderVideo, renderText, renderShapeLabel, renderTable, videoInteractive }) {
    const Component = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        switch(elementInfo.type){
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.IMAGE:
                return 'image';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.TEXT:
                return 'text';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.SHAPE:
                return 'shape';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.LINE:
                return 'line';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.CHART:
                return 'chart';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.LATEX:
                return 'latex';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.TABLE:
                return 'table';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.VIDEO:
                return 'video';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.AUDIO:
                return 'audio';
            case _openmaic_dsl__WEBPACK_IMPORTED_MODULE_12__/* .ElementTypes */ .U.CODE:
                return 'code';
            default:
                return null;
        }
    }, [
        elementInfo.type
    ]);
    if (!Component) return null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            Component === 'text' && elementInfo.type === 'text' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_text_BaseTextElement_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseTextElement */ .d, {
                elementInfo: elementInfo,
                renderContent: renderText
            }),
            Component === 'shape' && elementInfo.type === 'shape' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_shape_BaseShapeElement_js__WEBPACK_IMPORTED_MODULE_4__/* .BaseShapeElement */ .V, {
                elementInfo: elementInfo,
                renderLabel: renderShapeLabel
            }),
            Component === 'image' && elementInfo.type === 'image' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_image_BaseImageElement_js__WEBPACK_IMPORTED_MODULE_2__/* .BaseImageElement */ .x, {
                elementInfo: elementInfo,
                renderImage: renderImage
            }),
            Component === 'line' && elementInfo.type === 'line' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_line_BaseLineElement_js__WEBPACK_IMPORTED_MODULE_5__/* .BaseLineElement */ .u, {
                elementInfo: elementInfo,
                animate: animate
            }),
            Component === 'chart' && elementInfo.type === 'chart' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_chart_BaseChartElement_js__WEBPACK_IMPORTED_MODULE_6__/* .BaseChartElement */ .I, {
                elementInfo: elementInfo
            }),
            Component === 'latex' && elementInfo.type === 'latex' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_latex_BaseLatexElement_js__WEBPACK_IMPORTED_MODULE_7__/* .BaseLatexElement */ .y, {
                elementInfo: elementInfo
            }),
            Component === 'table' && elementInfo.type === 'table' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_table_BaseTableElement_js__WEBPACK_IMPORTED_MODULE_8__/* .BaseTableElement */ .O, {
                elementInfo: elementInfo,
                renderContent: renderTable
            }),
            Component === 'video' && elementInfo.type === 'video' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_video_BaseVideoElement_js__WEBPACK_IMPORTED_MODULE_9__/* .BaseVideoElement */ .X, {
                elementInfo: elementInfo,
                renderVideo: renderVideo,
                interactive: videoInteractive
            }),
            Component === 'audio' && elementInfo.type === 'audio' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_audio_BaseAudioElement_js__WEBPACK_IMPORTED_MODULE_10__/* .BaseAudioElement */ .q, {
                elementInfo: elementInfo
            }),
            Component === 'code' && elementInfo.type === 'code' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements_code_BaseCodeElement_js__WEBPACK_IMPORTED_MODULE_11__/* .BaseCodeElement */ .H, {
                elementInfo: elementInfo,
                animate: animate
            })
        ]
    });
});
const SlideElement = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function SlideElement({ elementInfo, elementIndex, theme, animate, renderImage, renderVideo, renderText, renderShapeLabel, renderTable, videoInteractive, onElementClick, idPrefix = 'slide-element-', dragOffset }) {
    const fontColor = theme?.fontColor ?? DEFAULT_THEME.fontColor;
    const fontName = theme?.fontName ?? DEFAULT_THEME.fontName;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "slide-element",
        id: `${idPrefix}${elementInfo.id}`,
        style: {
            position: 'absolute',
            inset: 0,
            zIndex: elementIndex,
            color: fontColor,
            fontFamily: fontName,
            pointerEvents: 'none'
        },
        onClick: onElementClick ? (e)=>onElementClick(elementInfo, e) : undefined,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "slide-element-hit-target",
            style: {
                pointerEvents: onElementClick ? 'auto' : undefined,
                transform: dragOffset ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)` : undefined,
                willChange: dragOffset ? 'transform' : undefined
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SlideElementContent, {
                elementInfo: elementInfo,
                animate: animate,
                renderImage: renderImage,
                renderVideo: renderVideo,
                renderText: renderText,
                renderShapeLabel: renderShapeLabel,
                renderTable: renderTable,
                videoInteractive: videoInteractive
            })
        })
    });
});
 //# sourceMappingURL=SlideElement.js.map


/***/ }),

/***/ 40852:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Square)
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
    name: "square",
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
                key: "afitv7"
            }
        ]
    ]
};
__iconData.node;
const Square = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=square.mjs.map


/***/ }),

/***/ 42829:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ BaseLatexElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ BaseLatexElement auto */ 

function BaseLatexElement({ elementInfo }) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-latex",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "element-content",
                style: {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    // KaTeX glyphs inherit `color`; apply the formula's resolved color
                    // (e.g. 蓝色权重) so it isn't forced to the browser default.
                    ...elementInfo.color ? {
                        color: elementInfo.color
                    } : {}
                },
                children: elementInfo.html ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KatexContent, {
                    html: elementInfo.html,
                    width: elementInfo.width,
                    height: elementInfo.height,
                    align: elementInfo.align
                }) : elementInfo.path && elementInfo.viewBox ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                    overflow: "visible",
                    width: elementInfo.width,
                    height: elementInfo.height,
                    stroke: elementInfo.color,
                    strokeWidth: elementInfo.strokeWidth,
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    style: {
                        transformOrigin: '0 0',
                        overflow: 'visible'
                    },
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
                        transform: `scale(${elementInfo.width / elementInfo.viewBox[0]}, ${elementInfo.height / elementInfo.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`,
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: elementInfo.path
                        })
                    })
                }) : null
            })
        })
    });
}
const ALIGN_MAP = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
};
function KatexContent({ html, width, height, align = 'center' }) {
    const innerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [scale, setScale] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    // Measure the formula's natural size and shrink-to-fit its box. Extracted so
    // it can run both synchronously on mount (useLayoutEffect) and again once the
    // KaTeX fonts finish loading (useEffect below).
    //
    // KaTeX lays out large delimiters (\left\{, \begin{cases}) using the metrics of
    // its `KaTeX_Size1`–`Size4` faces. Those woff2 files load asynchronously, so a
    // first measure on a cold export runs against the fallback font — the brace is
    // sized wrong and the piecewise body (`cases`) desynchronizes from it (the bug
    // reported as "大括号后面的分段函数与大括号错位"). Re-measuring after
    // `document.fonts.ready` snaps the scale back to the real glyph metrics before
    // the off-screen snapshot captures the frame.
    const measure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!innerRef.current) return;
        const naturalW = innerRef.current.scrollWidth;
        const naturalH = innerRef.current.scrollHeight;
        if (naturalW > 0 && naturalH > 0) {
            // Cap at 1: only ever shrink the formula to fit its box, never enlarge.
            // A short formula sitting in a large frame (e.g. slide 29 的右侧推理框)
            // would otherwise get scaled up to fill the box and render huge.
            setScale(Math.min(width / naturalW, height / naturalH, 1));
        }
    }, [
        width,
        height
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        measure();
    }, [
        measure,
        html
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fonts = typeof document !== 'undefined' ? document.fonts : undefined;
        if (!fonts) return;
        let cancelled = false;
        // Re-measure once the font set settles (initial + any subsequent face that
        // finishes decoding), so the fit-scale reflects the real KaTeX_Size metrics.
        fonts.ready.then(()=>{
            if (!cancelled) measure();
        });
        const onLoadingDone = ()=>measure();
        fonts.addEventListener?.('loadingdone', onLoadingDone);
        return ()=>{
            cancelled = true;
            fonts.removeEventListener?.('loadingdone', onLoadingDone);
        };
    }, [
        measure,
        html
    ]);
    const justify = ALIGN_MAP[align];
    const origin = align === 'left' ? 'left center' : align === 'right' ? 'right center' : 'center center';
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        style: {
            width,
            height,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: justify
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            ref: innerRef,
            className: "slide-renderer-prose",
            style: {
                transformOrigin: origin,
                transform: `scale(${scale})`,
                whiteSpace: 'nowrap'
            },
            dangerouslySetInnerHTML: {
                __html: html
            }
        })
    });
}
 //# sourceMappingURL=BaseLatexElement.js.map


/***/ }),

/***/ 42924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C6: () => (/* binding */ __extends),
/* harmony export */   Cl: () => (/* binding */ __assign),
/* harmony export */   Tt: () => (/* binding */ __rest),
/* harmony export */   fX: () => (/* binding */ __spreadArray)
/* harmony export */ });
/* unused harmony exports __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ 43146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hs: () => (/* binding */ createDialogScope),
/* harmony export */   UC: () => (/* binding */ DialogContent),
/* harmony export */   VY: () => (/* binding */ DialogDescription),
/* harmony export */   ZL: () => (/* binding */ DialogPortal),
/* harmony export */   bL: () => (/* binding */ Dialog),
/* harmony export */   bm: () => (/* binding */ DialogClose),
/* harmony export */   hE: () => (/* binding */ DialogTitle),
/* harmony export */   hJ: () => (/* binding */ DialogOverlay)
/* harmony export */ });
/* unused harmony exports Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Trigger, WarningProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89971);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19416);
/* harmony import */ var _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(69885);
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19040);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83935);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(55897);
/* harmony import */ var _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(54388);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(66294);
/* harmony import */ var react_remove_scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(78809);
/* harmony import */ var aria_hidden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22954);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(42442);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Close,Content,Description,Dialog,DialogClose,DialogContent,DialogDescription,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger,Overlay,Portal,Root,Title,Trigger,WarningProvider,createDialogScope auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/dialog.tsx

















var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = /* @__PURE__ */ __name((props)=>{
    const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const { nodes: branchNodes, registry: branchRegistry } = (0,_radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_3__/* .useFocusScopeBranchRegistry */ .Rd)();
    const [open, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_4__/* .useControllableState */ .i)({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: DIALOG_NAME
    });
    const [titleCount, setTitleCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const [descriptionCount, setDescriptionCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogProvider, {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_5__/* .useId */ .B)(),
        titleId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_5__/* .useId */ .B)(),
        descriptionId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_5__/* .useId */ .B)(),
        titlePresent: titleCount > 0,
        descriptionPresent: descriptionCount > 0,
        setTitleCount,
        setDescriptionCount,
        open,
        onOpenChange: setOpen,
        onOpenToggle: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setOpen((prevOpen)=>!prevOpen), [
            setOpen
        ]),
        modal,
        branchNodes,
        branchRegistry,
        children
    });
}, "Dialog");
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = /* @__PURE__ */ /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(/* @__PURE__ */ __name(function DialogTrigger2(props, forwardedRef) {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsx(Primitive.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
    });
}, "DialogTrigger"))));
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
    forceMount: void 0
});
var DialogPortal = /* @__PURE__ */ __name((props)=>{
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PortalProvider, {
        scope: __scopeDialog,
        forceMount,
        children: react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, (child)=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
                present: forceMount || context.open,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_7__/* .Portal */ .Z, {
                    asChild: true,
                    container,
                    children: child
                })
            }))
    });
}, "DialogPortal");
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function DialogOverlay2(props, forwardedRef) {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || context.open,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogOverlayImpl, {
            ...overlayProps,
            ref: forwardedRef
        })
    }) : null;
}, "DialogOverlay"));
var Slot = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_8__/* .createSlot */ .TL)("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function DialogOverlayImpl2(props, forwardedRef) {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    const registerDismissableSurface = (0,_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_9__/* .useDismissableLayerSurface */ .e0)();
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_10__/* .useComposedRefs */ .s)(forwardedRef, registerDismissableSurface);
    return(// Make sure `Content` is scrollable even when it doesn't live inside
    // `RemoveScroll` (eg. when `Overlay` and `Content` are siblings). Nested
    // layers are registered as branches and added as shards so they remain
    // scrollable too. See https://github.com/radix-ui/primitives/issues/3423
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_remove_scroll__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
        as: Slot,
        allowPinchZoom: true,
        shards: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>[
                context.contentRef,
                ...context.branchNodes.map((node)=>({
                        current: node
                    }))
            ], [
            context.contentRef,
            context.branchNodes
        ]),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_12__/* .Primitive */ .sG.div, {
            "data-state": getState(context.open),
            ...overlayProps,
            ref: composedRefs,
            style: {
                pointerEvents: "auto",
                ...overlayProps.style
            }
        })
    }));
}, "DialogOverlayImpl"));
var CONTENT_NAME = "DialogContent";
var DialogContent = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function DialogContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || context.open,
        children: context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentModal, {
            ...contentProps,
            ref: forwardedRef
        }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentNonModal, {
            ...contentProps,
            ref: forwardedRef
        })
    });
}, "DialogContent"));
var DialogContentModal = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function DialogContentModal2(props, forwardedRef) {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_10__/* .useComposedRefs */ .s)(forwardedRef, context.contentRef, contentRef);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const content = contentRef.current;
        if (content) return (0,aria_hidden__WEBPACK_IMPORTED_MODULE_13__/* .hideOthers */ .Eq)(content);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: context.open,
        onCloseAutoFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_14__/* .composeEventHandlers */ .mK)(props.onCloseAutoFocus, (event)=>{
            event.preventDefault();
            context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_14__/* .composeEventHandlers */ .mK)(props.onPointerDownOutside, (event)=>{
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_14__/* .composeEventHandlers */ .mK)(props.onFocusOutside, (event)=>event.preventDefault())
    });
}, "DialogContentModal"));
var DialogContentNonModal = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function DialogContentNonModal2(props, forwardedRef) {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hasPointerDownOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event)=>{
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
                if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
                event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event)=>{
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent.type === "pointerdown") {
                    hasPointerDownOutsideRef.current = true;
                }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
                event.preventDefault();
            }
        }
    });
}, "DialogContentNonModal"));
var DialogContentImpl = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function DialogContentImpl2(props, forwardedRef) {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, "aria-describedby": ariaDescribedby, children, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    (0,_radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_15__/* .useFocusGuards */ .Oh)();
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_3__/* .FocusScopeBranchProvider */ .UF, {
        registry: context.branchRegistry,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_3__/* .FocusScope */ .n1, {
            asChild: true,
            loop: true,
            trapped: trapFocus,
            branches: context.branchNodes,
            onMountAutoFocus: onOpenAutoFocus,
            onUnmountAutoFocus: onCloseAutoFocus,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_9__/* .DismissableLayer */ .qW, {
                role: "dialog",
                id: context.contentId,
                "aria-labelledby": context.titlePresent ? context.titleId : void 0,
                "aria-describedby": context.descriptionPresent ? concatAriaDescribedby(ariaDescribedby, context.descriptionId) : ariaDescribedby,
                "data-state": getState(context.open),
                ...contentProps,
                ref: forwardedRef,
                deferPointerDownOutside: true,
                onDismiss: ()=>context.onOpenChange(false),
                children
            })
        })
    });
}, "DialogContentImpl"));
var DialogTitle = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function DialogTitle2(props, forwardedRef) {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext("DialogTitle", __scopeDialog);
    const { setTitleCount } = context;
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_16__/* .useLayoutEffect */ .N)(()=>{
        setTitleCount((count)=>count + 1);
        return ()=>setTitleCount((count)=>count - 1);
    }, [
        setTitleCount
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_12__/* .Primitive */ .sG.h2, {
        id: context.titleId,
        ...titleProps,
        ref: forwardedRef
    });
}, "DialogTitle"));
var DialogDescription = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function DialogDescription2(props, forwardedRef) {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext("DialogDescription", __scopeDialog);
    const { setDescriptionCount } = context;
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_16__/* .useLayoutEffect */ .N)(()=>{
        setDescriptionCount((count)=>count + 1);
        return ()=>setDescriptionCount((count)=>count - 1);
    }, [
        setDescriptionCount
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_12__/* .Primitive */ .sG.p, {
        id: context.descriptionId,
        ...descriptionProps,
        ref: forwardedRef
    });
}, "DialogDescription"));
var CLOSE_NAME = "DialogClose";
var DialogClose = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function DialogClose2(props, forwardedRef) {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_12__/* .Primitive */ .sG.button, {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_14__/* .composeEventHandlers */ .mK)(props.onClick, ()=>context.onOpenChange(false))
    });
}, "DialogClose"));
var WarningProvider = /* @__PURE__ */ (/* unused pure expression or super */ null && (__name((props)=>{
    return props.children;
}, "WarningProvider")));
function concatAriaDescribedby(...values) {
    const ids = /* @__PURE__ */ new Set();
    for (const value of values){
        if (typeof value !== "string") continue;
        for (const id of String(value).trim().split(/\s+/)){
            if (id) ids.add(id);
        }
    }
    return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name(concatAriaDescribedby, "concatAriaDescribedby");
function getState(open) {
    return open ? "open" : "closed";
}
__name(getState, "getState");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 43539:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ GradientDefs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);


function GradientDefs({ id, type, colors, rotate = 0 }) {
    if (type === 'linear') {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("linearGradient", { id: id, x1: "0%", y1: "0%", x2: "100%", y2: "0%", gradientTransform: `rotate(${rotate},0.5,0.5)`, children: colors.map((item, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", { offset: `${item.pos}%`, stopColor: item.color }, index))) }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("radialGradient", { id: id, children: colors.map((item, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", { offset: `${item.pos}%`, stopColor: item.color }, index))) }));
}


//# sourceMappingURL=GradientDefs.js.map


/***/ }),

/***/ 44276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72471);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 


const Icon = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .mergeClasses */ .zP)("lucide", className),
        ...!children && !(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .hasA11yProp */ .m$)(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
 //# sourceMappingURL=Icon.js.map


/***/ }),

/***/ 47206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ styleSingleton)
/* harmony export */ });
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14532);

/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */
var styleSingleton = function () {
    var useStyle = (0,_hook__WEBPACK_IMPORTED_MODULE_0__/* .styleHookSingleton */ ._)();
    var Sheet = function (_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};


/***/ }),

/***/ 47279:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C1: () => (/* binding */ CheckboxIndicator),
/* harmony export */   bL: () => (/* binding */ Checkbox)
/* harmony export */ });
/* unused harmony exports Checkbox, CheckboxIndicator, createCheckboxScope, unstable_BubbleInput, unstable_CheckboxBubbleInput, unstable_CheckboxProvider, unstable_CheckboxTrigger, unstable_Provider, unstable_Trigger */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63509);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83935);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55897);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Checkbox,CheckboxIndicator,Indicator,Root,createCheckboxScope,unstable_BubbleInput,unstable_CheckboxBubbleInput,unstable_CheckboxProvider,unstable_CheckboxTrigger,unstable_Provider,unstable_Trigger auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/checkbox.tsx









var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
    const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", // @ts-expect-error
    internal_do_not_use_render } = props;
    const [checked, setChecked] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__/* .useControllableState */ .i)({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: CHECKBOX_NAME
    });
    const [control, setControl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [bubbleInput, setBubbleInput] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [userClick, setUserClick] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const isFormControl = control ? !!form || !!control.closest("form") : // We set this to true by default so that events bubble to forms without JS (SSR)
    true;
    const context = {
        checked,
        disabled,
        setChecked,
        control,
        setControl,
        name,
        form,
        value,
        userClick,
        onUserClick: setUserClick,
        required,
        defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
    };
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxProviderImpl, {
        scope: __scopeCheckbox,
        ...context,
        children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    });
}
__name(CheckboxProvider, "CheckboxProvider");
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function CheckboxTrigger2({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) {
    const { control, value, disabled, checked, required, setControl, setChecked, onUserClick, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setControl);
    const initialCheckedStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const form = control?.form;
        if (form) {
            const reset = /* @__PURE__ */ __name(()=>setChecked(initialCheckedStateRef.current), "reset");
            form.addEventListener("reset", reset);
            return ()=>form.removeEventListener("reset", reset);
        }
    }, [
        control,
        setChecked
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.button, {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onKeyDown, (event)=>{
            if (event.key === "Enter") event.preventDefault();
        }),
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onClick, (event)=>{
            const hasConsumerStoppedPropagation = event.isPropagationStopped();
            onUserClick({
                requestedChecked: isIndeterminate(checked) ? true : !checked,
                hasConsumerStoppedPropagation
            });
            setChecked((prevChecked)=>isIndeterminate(prevChecked) ? true : !prevChecked);
            if (bubbleInput && isFormControl) {
                if (!hasConsumerStoppedPropagation) event.stopPropagation();
            }
        })
    });
}, "CheckboxTrigger"));
var Checkbox = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function Checkbox2(props, forwardedRef) {
    const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxProvider, {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl })=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxTrigger, {
                        ...checkboxProps,
                        ref: forwardedRef,
                        __scopeCheckbox
                    }),
                    isFormControl && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxBubbleInput, {
                        __scopeCheckbox
                    })
                ]
            })
    });
}, "Checkbox"));
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function CheckboxIndicator2(props, forwardedRef) {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_7__/* .Presence */ .C, {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.span, {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "none",
                ...props.style
            }
        })
    });
}, "CheckboxIndicator"));
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function CheckboxBubbleInput2({ __scopeCheckbox, onClick, ...props }, forwardedRef) {
    const { control, userClick, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setBubbleInput);
    const controlSize = (0,_radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_8__/* .useSize */ .X)(control);
    const shouldStopClickPropagationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const prevCheckedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    const handledUserClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(userClick);
    const pendingUserClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const input = bubbleInput;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
        const setChecked = descriptor.set;
        if (!setChecked) return;
        const checkedChanged = prevCheckedRef.current !== checked;
        prevCheckedRef.current = checked;
        const isNewUserClick = userClick !== null && userClick !== handledUserClickRef.current;
        handledUserClickRef.current = userClick;
        if (isNewUserClick) {
            pendingUserClickRef.current = checkedChanged ? null : userClick;
            if (checkedChanged) {
                input.indeterminate = isIndeterminate(checked);
                setChecked.call(input, isIndeterminate(checked) ? false : checked);
            }
            input.dispatchEvent(new Event("click", {
                bubbles: !userClick.hasConsumerStoppedPropagation
            }));
        } else if (checkedChanged) {
            const pendingUserClick = pendingUserClickRef.current;
            pendingUserClickRef.current = null;
            const isPendingUserChange = pendingUserClick?.requestedChecked === checked;
            shouldStopClickPropagationRef.current = true;
            input.indeterminate = isIndeterminate(checked);
            setChecked.call(input, isIndeterminate(checked) ? false : checked);
            input.dispatchEvent(new Event("click", {
                bubbles: !(isPendingUserChange && pendingUserClick.hasConsumerStoppedPropagation)
            }));
            shouldStopClickPropagationRef.current = false;
        }
    }, [
        bubbleInput,
        checked,
        userClick
    ]);
    const defaultCheckedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.input, {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onClick, (event)=>{
            if (shouldStopClickPropagationRef.current) {
                event.stopPropagation();
            }
        }),
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
        }
    });
}, "CheckboxBubbleInput"));
function isFunction(value) {
    return typeof value === "function";
}
__name(isFunction, "isFunction");
function isIndeterminate(checked) {
    return checked === "indeterminate";
}
__name(isIndeterminate, "isIndeterminate");
function getState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
__name(getState, "getState");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 47536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ getNonce)
/* harmony export */ });
/* unused harmony export setNonce */
var currentNonce;
var setNonce = function (nonce) {
    currentNonce = nonce;
};
var getNonce = function () {
    if (currentNonce) {
        return currentNonce;
    }
    if (true) {
        return __webpack_require__.nc;
    }
    return undefined;
};


/***/ }),

/***/ 47603:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sun)
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
    name: "sun",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "4",
                key: "4exip2"
            }
        ],
        [
            "path",
            {
                d: "M12 2v2",
                key: "tus03m"
            }
        ],
        [
            "path",
            {
                d: "M12 20v2",
                key: "1lh1kg"
            }
        ],
        [
            "path",
            {
                d: "m4.93 4.93 1.41 1.41",
                key: "149t6j"
            }
        ],
        [
            "path",
            {
                d: "m17.66 17.66 1.41 1.41",
                key: "ptbguv"
            }
        ],
        [
            "path",
            {
                d: "M2 12h2",
                key: "1t8f8n"
            }
        ],
        [
            "path",
            {
                d: "M20 12h2",
                key: "1q8mjw"
            }
        ],
        [
            "path",
            {
                d: "m6.34 17.66-1.41 1.41",
                key: "1m8zz5"
            }
        ],
        [
            "path",
            {
                d: "m19.07 4.93-1.41 1.41",
                key: "1shlcs"
            }
        ]
    ]
};
__iconData.node;
const Sun = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=sun.mjs.map


/***/ }),

/***/ 48272:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MicOff)
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
    name: "mic-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 19v3",
                key: "npa21l"
            }
        ],
        [
            "path",
            {
                d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
                key: "1gzdoj"
            }
        ],
        [
            "path",
            {
                d: "M16.95 16.95A7 7 0 0 1 5 12v-2",
                key: "cqa7eg"
            }
        ],
        [
            "path",
            {
                d: "M18.89 13.23A7 7 0 0 0 19 12v-2",
                key: "16hl24"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ],
        [
            "path",
            {
                d: "M9 9v3a3 3 0 0 0 5.12 2.12",
                key: "r2i35w"
            }
        ]
    ]
};
__iconData.node;
const MicOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=mic-off.mjs.map


/***/ }),

/***/ 48322:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ shapeToTextFallback)
/* harmony export */ });
/* harmony import */ var entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31266);
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12100);


const TEXT_TYPES = new Set([
    'title',
    'subtitle',
    'content',
    'item',
    'itemTitle',
    'notes',
    'header',
    'footer',
    'partNumber',
    'itemNumber',
]);
/** One bounded text projection for generated and historical invalid shapes. */
function shapeToTextFallback(shape) {
    const label = shape.text;
    if (!label || typeof label.content !== 'string')
        return null;
    const content = label.content.replace(/\x3c!--[\s\S]*?-->/g, '');
    // Decode after stripping tags so escaped markup remains visible text.
    const plain = (0,entities__WEBPACK_IMPORTED_MODULE_0__/* .decodeHTML */ .Gz)(content.replace(/<[^>]*>/g, '')).trim();
    if (!plain && !/data-inline-math|<math\b|<img\b/i.test(content))
        return null;
    const dimension = (value) => Number.isFinite(value) && value > 0 ? Math.min(value, 4000) : 100;
    const position = (value) => Number.isFinite(value) && Math.abs(value) <= 1_000_000 ? value : 0;
    const finite = (value) => value !== undefined && Number.isFinite(value) ? value : undefined;
    const requestedColor = typeof label.defaultColor === 'string' ? label.defaultColor : '#333333';
    const color = (0,tinycolor2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(requestedColor);
    const defaultColor = color.isValid() ? requestedColor : '#333333';
    const originalFill = (0,tinycolor2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(shape.gradient?.colors?.[0]?.color || shape.fill);
    // A solid text backdrop keeps the default foreground legible when the path,
    // gradient or pattern disappears. Inline HTML colors remain author-controlled.
    const fill = originalFill.isValid() &&
        originalFill.getAlpha() === 1 &&
        tinycolor2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.readability(defaultColor, originalFill) >= 4.5
        ? originalFill.toRgbString()
        : tinycolor2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.mostReadable(defaultColor, ['#ffffff', '#111827']).toRgbString();
    return {
        type: 'text',
        id: shape.id,
        left: position(shape.left),
        top: position(shape.top),
        width: dimension(shape.width),
        height: dimension(shape.height),
        rotate: finite(shape.rotate) ?? 0,
        ...(typeof shape.groupId === 'string' ? { groupId: shape.groupId } : {}),
        ...(shape.link &&
            (shape.link.type === 'web' || shape.link.type === 'slide') &&
            typeof shape.link.target === 'string'
            ? { link: { type: shape.link.type, target: shape.link.target } }
            : {}),
        ...(typeof shape.lock === 'boolean' ? { lock: shape.lock } : {}),
        ...(typeof shape.name === 'string' ? { name: shape.name } : {}),
        content: label.content,
        defaultFontName: typeof label.defaultFontName === 'string' && label.defaultFontName
            ? label.defaultFontName
            : 'Microsoft YaHei',
        defaultColor,
        fill,
        vAlign: label.align === 'bottom' ? 'bottom' : label.align === 'top' ? 'top' : 'middle',
        lineHeight: finite(label.lineHeight) ?? 1.625,
        ...(finite(label.wordSpace) !== undefined ? { wordSpace: label.wordSpace } : {}),
        paragraphSpace: finite(label.paragraphSpace) ?? 5,
        ...(typeof label.type === 'string' && TEXT_TYPES.has(label.type)
            ? { textType: label.type }
            : {}),
        ...(finite(shape.opacity) !== undefined
            ? { opacity: Math.max(0, Math.min(1, shape.opacity)) }
            : {}),
    };
}
//# sourceMappingURL=shape-text-fallback.js.map

/***/ }),

/***/ 49791:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ LaserOverlay)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15696);
/* __next_internal_client_entry_do_not_use__ LaserOverlay auto */ 

function LaserOverlay({ geometry, color = '#ff3b30', duration: _duration = 3000 }) {
    const { centerX, centerY } = geometry;
    const startPos = {
        x: centerX > 50 ? 105 : -5,
        y: centerY > 50 ? 105 : -5
    };
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_1__/* .motion */ .PY1.div, {
        initial: {
            opacity: 0,
            left: `${startPos.x}%`,
            top: `${startPos.y}%`
        },
        animate: {
            opacity: 1,
            left: `${centerX}%`,
            top: `${centerY}%`
        },
        exit: {
            opacity: 0,
            left: `${startPos.x}%`,
            top: `${startPos.y}%`,
            transition: {
                duration: 0.25,
                ease: [
                    0.4,
                    0,
                    1,
                    1
                ]
            }
        },
        transition: {
            left: {
                duration: 0.5,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            },
            top: {
                duration: 0.5,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            },
            opacity: {
                duration: 0.15
            }
        },
        style: {
            position: 'absolute',
            zIndex: 101,
            pointerEvents: 'none'
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                position: 'relative',
                transform: 'translate(-50%, -50%)'
            },
            children: [
                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_1__/* .motion */ .PY1.div, {
                    animate: {
                        scale: [
                            1,
                            2.8
                        ],
                        opacity: [
                            0.6,
                            0
                        ]
                    },
                    transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeOut',
                        repeatDelay: 0.3
                    },
                    style: {
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '9999px',
                        border: `1.5px solid ${color}`
                    }
                }),
                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        width: '10px',
                        height: '10px',
                        borderRadius: '9999px',
                        backgroundColor: color,
                        boxShadow: `0 0 8px 2px ${color}60`
                    }
                })
            ]
        })
    }, `laser-${centerX}-${centerY}`);
}
 //# sourceMappingURL=LaserOverlay.js.map


/***/ }),

/***/ 49804:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Zap)
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
    name: "zap",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
                key: "1v7up4"
            }
        ]
    ]
};
__iconData.node;
const Zap = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=zap.mjs.map


/***/ }),

/***/ 49909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var use_sidecar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77436);
/* harmony import */ var _SideEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21676);
/* harmony import */ var _medium__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73665);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,use_sidecar__WEBPACK_IMPORTED_MODULE_0__/* .exportSidecar */ .m)(_medium__WEBPACK_IMPORTED_MODULE_1__/* .effectCar */ .O, _SideEffect__WEBPACK_IMPORTED_MODULE_2__/* .RemoveScrollSideCar */ .DK));


/***/ }),

/***/ 50223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () { return ({
        // value
        value: initialValue,
        // last callback
        callback: callback,
        // "memoized" public interface
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                var last = ref.value;
                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }); })[0];
    // update callback
    ref.callback = callback;
    return ref.facade;
}


/***/ }),

/***/ 50981:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ShieldCheck)
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
    name: "shield-check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
                key: "oel41y"
            }
        ],
        [
            "path",
            {
                d: "m9 12 2 2 4-4",
                key: "dzmm74"
            }
        ]
    ]
};
__iconData.node;
const ShieldCheck = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=shield-check.mjs.map


/***/ }),

/***/ 51677:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ BaseChartElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _shared_ElementOutline_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89043);
/* harmony import */ var _Chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12660);
/* __next_internal_client_entry_do_not_use__ BaseChartElement auto */ 


function BaseChartElement({ elementInfo, target }) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-chart",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`,
            pointerEvents: target === 'thumbnail' ? 'none' : undefined
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "element-content",
                style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: elementInfo.fill
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared_ElementOutline_js__WEBPACK_IMPORTED_MODULE_1__/* .ElementOutline */ .l, {
                        width: elementInfo.width,
                        height: elementInfo.height,
                        outline: elementInfo.outline
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Chart_js__WEBPACK_IMPORTED_MODULE_2__/* .Chart */ .t, {
                        width: elementInfo.width,
                        height: elementInfo.height,
                        type: elementInfo.chartType,
                        data: elementInfo.data,
                        themeColors: elementInfo.themeColors,
                        textColor: elementInfo.textColor,
                        lineColor: elementInfo.lineColor,
                        options: elementInfo.options,
                        importedStyle: elementInfo.importedStyle
                    })
                ]
            })
        })
    });
}
 //# sourceMappingURL=BaseChartElement.js.map


/***/ }),

/***/ 51873:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export SVGShapes */
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);

function moveTo(x, y) {
    return { type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.MOVE_TO, relative: false, x, y };
}
function lineTo(x, y) {
    return { type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_TO, relative: false, x, y };
}
function arcTo(rx, ry, xRot, largeArc, sweep, x, y) {
    return {
        type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC,
        relative: false,
        rX: rx,
        rY: ry,
        xRot,
        lArcFlag: largeArc,
        sweepFlag: sweep,
        x,
        y,
    };
}
/**
 * Creates an ellipse path centered at (cx,cy) with radii rx and ry
 */
function createEllipse(rx, ry, cx, cy) {
    return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L([
        moveTo(cx + rx, cy),
        arcTo(rx, ry, 0, 1, 1, cx - rx, cy),
        arcTo(rx, ry, 0, 1, 1, cx + rx, cy),
        { type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH },
    ]);
}
/**
 * Creates a rectangle path with optional rounded corners
 */
function createRect(x, y, width, height, rX = 0, rY = 0) {
    if (rX === 0 || rY === 0) {
        return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L([
            moveTo(x, y),
            lineTo(x + width, y),
            lineTo(x + width, y + height),
            lineTo(x, y + height),
            { type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH },
        ]);
    }
    const rx = Math.min(rX, width / 2);
    const ry = Math.min(rY, height / 2);
    return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L([
        moveTo(x + rx, y),
        lineTo(x + width - rx, y),
        arcTo(rx, ry, 0, 0, 1, x + width, y + ry),
        lineTo(x + width, y + height - ry),
        arcTo(rx, ry, 0, 0, 1, x + width - rx, y + height),
        lineTo(x + rx, y + height),
        arcTo(rx, ry, 0, 0, 1, x, y + height - ry),
        lineTo(x, y + ry),
        arcTo(rx, ry, 0, 0, 1, x + rx, y),
        { type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH },
    ]);
}
/**
 * Creates a polyline from an array of coordinates [x1,y1,x2,y2,...]
 */
function createPolyline(coords) {
    if (coords.length < 2)
        return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L([]);
    const commands = [moveTo(coords[0], coords[1])];
    for (let i = 2; i < coords.length; i += 2) {
        commands.push(lineTo(coords[i], coords[i + 1]));
    }
    return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L(commands);
}
/**
 * Creates a closed polygon from an array of coordinates
 */
function createPolygon(coords) {
    if (coords.length < 2)
        return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L([]);
    const commands = createPolyline(coords).commands;
    commands.push({ type: _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH });
    return new _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L(commands);
}
const SVGShapes = {
    createEllipse,
    createRect,
    createPolyline,
    createPolygon,
};
//# sourceMappingURL=SVGShapes.js.map

/***/ }),

/***/ 51944:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ encodeSVGPath)
/* harmony export */ });
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);

// Encode SVG PathData
// http://www.w3.org/TR/SVG/paths.html#PathDataBNF
// Private consts : Char groups
const WSP = ' ';
function encodeSVGPath(commands) {
    let str = '';
    if (!Array.isArray(commands)) {
        commands = [commands];
    }
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CLOSE_PATH) {
            str += 'z';
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.HORIZ_LINE_TO) {
            str += (command.relative ? 'h' : 'H') + command.x;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.VERT_LINE_TO) {
            str += (command.relative ? 'v' : 'V') + command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.MOVE_TO) {
            str += (command.relative ? 'm' : 'M') + command.x + WSP + command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_TO) {
            str += (command.relative ? 'l' : 'L') + command.x + WSP + command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.CURVE_TO) {
            str +=
                (command.relative ? 'c' : 'C') +
                    command.x1 +
                    WSP +
                    command.y1 +
                    WSP +
                    command.x2 +
                    WSP +
                    command.y2 +
                    WSP +
                    command.x +
                    WSP +
                    command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_CURVE_TO) {
            str +=
                (command.relative ? 's' : 'S') +
                    command.x2 +
                    WSP +
                    command.y2 +
                    WSP +
                    command.x +
                    WSP +
                    command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.QUAD_TO) {
            str +=
                (command.relative ? 'q' : 'Q') +
                    command.x1 +
                    WSP +
                    command.y1 +
                    WSP +
                    command.x +
                    WSP +
                    command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.SMOOTH_QUAD_TO) {
            str += (command.relative ? 't' : 'T') + command.x + WSP + command.y;
        }
        else if (command.type === _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.ARC) {
            str +=
                (command.relative ? 'a' : 'A') +
                    command.rX +
                    WSP +
                    command.rY +
                    WSP +
                    command.xRot +
                    WSP +
                    +command.lArcFlag +
                    WSP +
                    +command.sweepFlag +
                    WSP +
                    command.x +
                    WSP +
                    command.y;
        }
        else {
            // Unknown command
            throw new Error(`Unexpected command type "${command?.type}" at index ${i}.`);
        }
    }
    return str;
}
//# sourceMappingURL=SVGPathDataEncoder.js.map

/***/ }),

/***/ 53744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export ZoomWrapper */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ ZoomWrapper auto */ 

function ZoomWrapper({ children, zoom, geometry }) {
    if (!zoom || !geometry) {
        return jsx(Fragment, {
            children: children
        });
    }
    const { scale } = zoom;
    const { centerX, centerY } = geometry;
    return jsx(motion.div, {
        initial: {
            scale: 1
        },
        animate: {
            scale
        },
        exit: {
            scale: 1
        },
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25
        },
        style: {
            width: '100%',
            height: '100%',
            transformOrigin: `${centerX}% ${centerY}%`
        },
        children: children
    });
}
 //# sourceMappingURL=ZoomWrapper.js.map


/***/ }),

/***/ 54388:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Oh: () => (/* binding */ useFocusGuards)
/* harmony export */ });
/* unused harmony exports FocusGuards, Root */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ FocusGuards,Root,useFocusGuards auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/focus-guards.tsx

var count = 0;
var guards = null;
function FocusGuards(props) {
    useFocusGuards();
    return props.children;
}
__name(FocusGuards, "FocusGuards");
function useFocusGuards() {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!guards) {
            guards = {
                start: createFocusGuard(),
                end: createFocusGuard()
            };
        }
        const { start, end } = guards;
        if (document.body.firstElementChild !== start) {
            document.body.insertAdjacentElement("afterbegin", start);
        }
        if (document.body.lastElementChild !== end) {
            document.body.insertAdjacentElement("beforeend", end);
        }
        count++;
        return ()=>{
            if (count === 1) {
                guards?.start.remove();
                guards?.end.remove();
                guards = null;
            }
            count = Math.max(0, count - 1);
        };
    }, []);
}
__name(useFocusGuards, "useFocusGuards");
function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
}
__name(createFocusGuard, "createFocusGuard");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 55947:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E9: () => (/* binding */ noScrollbarsClassName),
/* harmony export */   Mi: () => (/* binding */ zeroRightClassName),
/* harmony export */   pN: () => (/* binding */ fullWidthClassName),
/* harmony export */   xi: () => (/* binding */ removedBarSizeVariable)
/* harmony export */ });
var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */
var removedBarSizeVariable = '--removed-body-scroll-bar-size';


/***/ }),

/***/ 57518:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B8: () => (/* binding */ TabsList),
/* harmony export */   UC: () => (/* binding */ TabsContent),
/* harmony export */   bL: () => (/* binding */ Tabs),
/* harmony export */   l9: () => (/* binding */ TabsTrigger)
/* harmony export */ });
/* unused harmony exports Tabs, TabsContent, TabsList, TabsTrigger, createTabsScope */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83478);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83935);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55897);
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1933);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(89971);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Content,List,Root,Tabs,TabsContent,TabsList,TabsTrigger,Trigger,createTabsScope auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/tabs.tsx











var ActivationMode = {
    Automatic: "automatic",
    Manual: "manual"
};
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(TABS_NAME, [
    _radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__/* .createRovingFocusGroupScope */ .RG
]);
var useRovingFocusGroupScope = (0,_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__/* .createRovingFocusGroupScope */ .RG)();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function Tabs2(props, forwardedRef) {
    const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = ActivationMode.Automatic, ...tabsProps } = props;
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__/* .useDirection */ .jH)(dir);
    const [value, setValue] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__/* .useControllableState */ .i)({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TabsProvider, {
        scope: __scopeTabs,
        baseId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_6__/* .useId */ .B)(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__/* .Primitive */ .sG.div, {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
        })
    });
}, "Tabs"));
var TAB_LIST_NAME = "TabsList";
var TabsList = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function TabsList2(props, forwardedRef) {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__/* .Primitive */ .sG.div, {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
        })
    });
}, "TabsList"));
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function TabsTrigger2(props, forwardedRef) {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__/* .Item */ .q7, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__/* .Primitive */ .sG.button, {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__/* .composeEventHandlers */ .mK)(props.onMouseDown, (event)=>{
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                    event.currentTarget.focus();
                    context.onValueChange(value);
                } else {
                    event.preventDefault();
                }
            }),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__/* .composeEventHandlers */ .mK)(props.onKeyDown, (event)=>{
                if (disabled || event.target !== event.currentTarget) {
                    return;
                }
                if ([
                    " ",
                    "Enter"
                ].includes(event.key)) {
                    context.onValueChange(value);
                }
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__/* .composeEventHandlers */ .mK)(props.onFocus, ()=>{
                const isAutomaticActivation = context.activationMode !== ActivationMode.Manual;
                if (!isSelected && !disabled && isAutomaticActivation) {
                    context.onValueChange(value);
                }
            })
        })
    });
}, "TabsTrigger"));
var CONTENT_NAME = "TabsContent";
var TabsContent = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function TabsContent2(props, forwardedRef) {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(isSelected);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const rAF = requestAnimationFrame(()=>isMountAnimationPreventedRef.current = false);
        return ()=>cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__/* .Presence */ .C, {
        present: forceMount || isSelected,
        children: ({ present })=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__/* .Primitive */ .sG.div, {
                "data-state": isSelected ? "active" : "inactive",
                "data-orientation": context.orientation,
                role: "tabpanel",
                "aria-labelledby": triggerId,
                hidden: !present,
                id: contentId,
                tabIndex: 0,
                ...contentProps,
                ref: forwardedRef,
                style: {
                    ...props.style,
                    animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
                },
                children: present && children
            })
    });
}, "TabsContent"));
function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
}
__name(makeTriggerId, "makeTriggerId");
function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
}
__name(makeContentId, "makeContentId");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 57538:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Atom)
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
    name: "atom",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "1",
                key: "41hilf"
            }
        ],
        [
            "path",
            {
                d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
                key: "1l2ple"
            }
        ],
        [
            "path",
            {
                d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
                key: "1wam0m"
            }
        ]
    ]
};
__iconData.node;
const Atom = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=atom.mjs.map


/***/ }),

/***/ 57983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleCheckBig)
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

/***/ 57990:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Wrench)
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
    name: "wrench",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
                key: "1ngwbx"
            }
        ]
    ]
};
__iconData.node;
const Wrench = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=wrench.mjs.map


/***/ }),

/***/ 59107:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ getGapWidth)
/* harmony export */ });
/* unused harmony export zeroGap */
var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0,
};
var parse = function (x) { return parseInt(x || '', 10) || 0; };
var getOffset = function (gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
    var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
    var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
    return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
    if (gapMode === void 0) { gapMode = 'margin'; }
    if (typeof window === 'undefined') {
        return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
    };
};


/***/ }),

/***/ 59281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jp: () => (/* binding */ RemoveScrollBar)
/* harmony export */ });
/* unused harmony exports lockAttribute, useLockAttribute */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_style_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4761);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55947);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59107);




var Style = (0,react_style_singleton__WEBPACK_IMPORTED_MODULE_1__/* .styleSingleton */ .T0)();
var lockAttribute = 'data-scroll-locked';
// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
var getStyles = function (_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) { gapMode = 'margin'; }
    return "\n  .".concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .noScrollbarsClassName */ .E9, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === 'margin' &&
            "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === 'padding' && "padding-right: ".concat(gap, "px ").concat(important, ";"),
    ]
        .filter(Boolean)
        .join(''), "\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .zeroRightClassName */ .Mi, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .fullWidthClassName */ .pN, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .zeroRightClassName */ .Mi, " .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .zeroRightClassName */ .Mi, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .fullWidthClassName */ .pN, " .").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .fullWidthClassName */ .pN, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(_constants__WEBPACK_IMPORTED_MODULE_3__/* .removedBarSizeVariable */ .xi, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function () {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10);
    return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function () {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function () {
            var newCounter = getCurrentUseCounter() - 1;
            if (newCounter <= 0) {
                document.body.removeAttribute(lockAttribute);
            }
            else {
                document.body.setAttribute(lockAttribute, newCounter.toString());
            }
        };
    }, []);
};
/**
 * Removes page scrollbar and blocks page scroll when mounted
 */
var RemoveScrollBar = function (_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? 'margin' : _b;
    useLockAttribute();
    /*
     gap will be measured on every component mount
     however it will be used only by the "first" invocation
     due to singleton nature of <Style
     */
    var gap = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () { return (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .getGapWidth */ .P)(gapMode); }, [gapMode]);
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '') });
};


/***/ }),

/***/ 59496:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ useIsHydrated2)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/use-is-hydrated.tsx


// src/use-is-hydrated-legacy.ts

var _isHydrated = false;
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = react__WEBPACK_IMPORTED_MODULE_0__.useState(_isHydrated);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!_isHydrated) {
      _isHydrated = true;
      setIsHydrated(true);
    }
  }, []);
  return isHydrated;
}
__name(useIsHydrated, "useIsHydrated");

// src/use-is-hydrated.tsx
var useReactSyncExternalStore = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[" useSyncExternalStore ".trim().toString()];
function subscribe() {
  return () => {
  };
}
__name(subscribe, "subscribe");
function useIsHydratedModern() {
  return useReactSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
__name(useIsHydratedModern, "useIsHydratedModern");
var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 60292:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ SVGPathData),
/* harmony export */   c: () => (/* binding */ COMMAND_ARG_COUNTS)
/* harmony export */ });
/* harmony import */ var _SVGPathDataEncoder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51944);
/* harmony import */ var _SVGPathDataParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1623);
/* harmony import */ var _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7391);
/* harmony import */ var _TransformableSVG_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8137);




class SVGPathData extends _TransformableSVG_js__WEBPACK_IMPORTED_MODULE_3__/* .TransformableSVG */ .n {
    commands;
    constructor(content) {
        super();
        if ('string' === typeof content) {
            this.commands = SVGPathData.parse(content);
        }
        else {
            this.commands = content;
        }
    }
    encode() {
        return SVGPathData.encode(this.commands);
    }
    getBounds() {
        const boundsTransform = _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_2__/* .SVGPathDataTransformer */ .z.CALCULATE_BOUNDS();
        this.transform(boundsTransform);
        return boundsTransform;
    }
    transform(transformFunction) {
        const newCommands = [];
        for (const command of this.commands) {
            const transformedCommand = transformFunction(command);
            if (Array.isArray(transformedCommand)) {
                newCommands.push(...transformedCommand);
            }
            else {
                newCommands.push(transformedCommand);
            }
        }
        this.commands = newCommands;
        return this;
    }
    /**
     * Reverses the order of path commands to go from end to start
     * IMPORTANT: This function expects absolute commands as input.
     * @param preserveSubpathOrder If true, keeps subpaths in their original order
     */
    reverse(preserveSubpathOrder = true) {
        this.commands = _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_2__/* .SVGPathDataTransformer */ .z.REVERSE_PATH(this.commands, preserveSubpathOrder);
        return this;
    }
    removeCollinear() {
        this.commands = _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_2__/* .SVGPathDataTransformer */ .z.REMOVE_COLLINEAR(this.commands);
        return this;
    }
    static encode(commands) {
        return (0,_SVGPathDataEncoder_js__WEBPACK_IMPORTED_MODULE_0__/* .encodeSVGPath */ .U)(commands);
    }
    static parse(path) {
        const parser = new _SVGPathDataParser_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathDataParser */ .N();
        const commands = [];
        parser.parse(path, commands);
        parser.finish(commands);
        return commands;
    }
    static CLOSE_PATH = 1;
    static MOVE_TO = 2;
    static HORIZ_LINE_TO = 4;
    static VERT_LINE_TO = 8;
    static LINE_TO = 16;
    static CURVE_TO = 32;
    static SMOOTH_CURVE_TO = 64;
    static QUAD_TO = 128;
    static SMOOTH_QUAD_TO = 256;
    static ARC = 512;
    static LINE_COMMANDS = SVGPathData.LINE_TO | SVGPathData.HORIZ_LINE_TO | SVGPathData.VERT_LINE_TO;
    static DRAWING_COMMANDS = SVGPathData.HORIZ_LINE_TO |
        SVGPathData.VERT_LINE_TO |
        SVGPathData.LINE_TO |
        SVGPathData.CURVE_TO |
        SVGPathData.SMOOTH_CURVE_TO |
        SVGPathData.QUAD_TO |
        SVGPathData.SMOOTH_QUAD_TO |
        SVGPathData.ARC;
}
const COMMAND_ARG_COUNTS = {
    [SVGPathData.MOVE_TO]: 2,
    [SVGPathData.LINE_TO]: 2,
    [SVGPathData.HORIZ_LINE_TO]: 1,
    [SVGPathData.VERT_LINE_TO]: 1,
    [SVGPathData.CLOSE_PATH]: 0,
    [SVGPathData.QUAD_TO]: 4,
    [SVGPathData.SMOOTH_QUAD_TO]: 2,
    [SVGPathData.CURVE_TO]: 6,
    [SVGPathData.SMOOTH_CURVE_TO]: 4,
    [SVGPathData.ARC]: 7,
};
//# sourceMappingURL=SVGPathData.js.map

/***/ }),

/***/ 61478:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useElementOutline)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


function useElementOutline(outline) {
    const outlineWidth = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => outline?.width ?? 0, [outline?.width]);
    const outlineStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => outline?.style || 'solid', [outline?.style]);
    const outlineColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => outline?.color || '#d14424', [outline?.color]);
    const strokeDashArray = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const size = outlineWidth;
        if (outlineStyle === 'dashed')
            return size <= 6 ? `${size * 4.5} ${size * 2}` : `${size * 4} ${size * 1.5}`;
        if (outlineStyle === 'dotted')
            return size <= 6 ? `${size * 1.8} ${size * 1.6}` : `${size * 1.5} ${size * 1.2}`;
        return '0 0';
    }, [outlineWidth, outlineStyle]);
    return { outlineWidth, outlineStyle, outlineColor, strokeDashArray };
}


//# sourceMappingURL=useElementOutline.js.map


/***/ }),

/***/ 61672:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cl: () => (/* binding */ __assign),
/* harmony export */   Tt: () => (/* binding */ __rest)
/* harmony export */ });
/* unused harmony exports __extends, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources, __rewriteRelativeImportExtension */
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ }),

/***/ 61799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ CLIPPATHS),
/* harmony export */   x: () => (/* binding */ ClipPathTypes)
/* harmony export */ });
var ClipPathTypes;
(function (ClipPathTypes) {
    ClipPathTypes["RECT"] = "rect";
    ClipPathTypes["ELLIPSE"] = "ellipse";
    ClipPathTypes["POLYGON"] = "polygon";
})(ClipPathTypes || (ClipPathTypes = {}));
const CLIPPATHS = {
    rect: {
        name: '矩形',
        type: ClipPathTypes.RECT,
        radius: '0',
        style: '',
    },
    rect2: {
        name: '矩形2',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 0 100%)',
        createPath: (width, height) => `M 0 0 L ${width * 0.8} 0 L ${width} ${height * 0.2} L ${width} ${height} L 0 ${height} Z`,
    },
    rect3: {
        name: '矩形3',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)',
        createPath: (width, height) => `M 0 0 L ${width * 0.8} 0 L ${width} ${height * 0.2} L ${width} ${height} L ${width * 0.2} ${height} L 0 ${height * 0.8} Z`,
    },
    roundRect: {
        name: '圆角矩形',
        type: ClipPathTypes.RECT,
        radius: '10px',
        style: 'inset(0 round 10px)',
    },
    ellipse: {
        name: '圆形',
        type: ClipPathTypes.ELLIPSE,
        style: 'ellipse(50% 50% at 50% 50%)',
    },
    triangle: {
        name: '三角形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        createPath: (width, height) => `M ${width * 0.5} 0 L 0 ${height} L ${width} ${height} Z`,
    },
    triangle2: {
        name: '三角形2',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(50% 100%, 0% 0%, 100% 0%)',
        createPath: (width, height) => `M ${width * 0.5} ${height} L 0 0 L ${width} 0 Z`,
    },
    triangle3: {
        name: '三角形3',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 0%, 0% 100%, 100% 100%)',
        createPath: (width, height) => `M 0 0 L 0 ${height} L ${width} ${height} Z`,
    },
    rhombus: {
        name: '菱形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        createPath: (width, height) => `M ${width * 0.5} 0 L ${width} ${height * 0.5} L ${width * 0.5} ${height} L 0 ${height * 0.5} Z`,
    },
    pentagon: {
        name: '五边形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        createPath: (width, height) => `M ${width * 0.5} 0 L ${width} ${0.38 * height} L ${0.82 * width} ${height} L ${0.18 * width} ${height} L 0 ${0.38 * height} Z`,
    },
    hexagon: {
        name: '六边形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
        createPath: (width, height) => `M ${width * 0.2} 0 L ${width * 0.8} 0 L ${width} ${height * 0.5} L ${width * 0.8} ${height} L ${width * 0.2} ${height} L 0 ${height * 0.5} Z`,
    },
    heptagon: {
        name: '七边形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
        createPath: (width, height) => `M ${width * 0.5} 0 L ${width * 0.9} ${height * 0.2} L ${width} ${height * 0.6} L ${width * 0.75} ${height} L ${width * 0.25} ${height} L 0 ${height * 0.6} L ${width * 0.1} ${height * 0.2} Z`,
    },
    octagon: {
        name: '八边形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        createPath: (width, height) => `M ${width * 0.3} 0 L ${width * 0.7} 0 L ${width} ${height * 0.3} L ${width} ${height * 0.7} L ${width * 0.7} ${height} L ${width * 0.3} ${height} L 0 ${height * 0.7} L 0 ${height * 0.3} Z`,
    },
    chevron: {
        name: 'V形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)',
        createPath: (width, height) => `M ${width * 0.75} 0 L ${width} ${height * 0.5} L ${width * 0.75} ${height} L 0 ${height} L ${width * 0.25} ${height * 0.5} L 0 0 Z`,
    },
    point: {
        name: '点',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
        createPath: (width, height) => `M 0 0 L ${width * 0.75} 0 L ${width} ${height * 0.5} L ${width * 0.75} ${height} L 0 ${height} Z`,
    },
    arrow: {
        name: '箭头',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
        createPath: (width, height) => `M 0 ${height * 0.2} L ${width * 0.6} ${height * 0.2} L ${width * 0.6} 0 L ${width} ${height * 0.5} L ${width * 0.6} ${height} L ${width * 0.6} ${height * 0.8} L 0 ${height * 0.8} Z`,
    },
    parallelogram: {
        name: '平行四边形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)',
        createPath: (width, height) => `M ${width * 0.3} 0 L ${width} 0 L ${width * 0.7} ${height} L 0 ${height} Z`,
    },
    parallelogram2: {
        name: '平行四边形2',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(30% 100%, 100% 100%, 70% 0%, 0% 0%)',
        createPath: (width, height) => `M ${width * 0.3} ${height} L ${width} ${height} L ${width * 0.7} 0 L 0 0 Z`,
    },
    trapezoid: {
        name: '梯形',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
        createPath: (width, height) => `M ${width * 0.25} 0 L ${width * 0.75} 0 L ${width} ${height} L 0 ${height} Z`,
    },
    trapezoid2: {
        name: '梯形2',
        type: ClipPathTypes.POLYGON,
        style: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
        createPath: (width, height) => `M 0 0 L ${width} 0 L ${width * 0.75} ${height} L ${width * 0.25} ${height} Z`,
    },
};


//# sourceMappingURL=clipPaths.js.map


/***/ }),

/***/ 64137:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ BaseAudioElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _barrel_optimize_names_Pause_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17256);
/* harmony import */ var _barrel_optimize_names_Pause_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67667);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ BaseAudioElement auto */ 


/**
 * The audio affordance belongs to the renderer rather than the editor UI so
 * read-only slide previews can play it directly. Editing mode layers its hit
 * targets above this button, keeping selection and transform gestures intact.
 */ function BaseAudioElement({ elementInfo }) {
    const available = Boolean(elementInfo.src);
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const stop = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        audioRef.current?.pause();
        audioRef.current = null;
        setPlaying(false);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>stop, [
        elementInfo.id,
        elementInfo.src,
        stop
    ]);
    const togglePlayback = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!elementInfo.src) return;
        if (playing) {
            stop();
            return;
        }
        const audio = new Audio(elementInfo.src);
        audio.loop = elementInfo.loop;
        audio.onended = stop;
        audio.onerror = stop;
        audioRef.current = audio;
        try {
            await audio.play();
            setPlaying(true);
        } catch  {
            stop();
        }
    }, [
        elementInfo.loop,
        elementInfo.src,
        playing,
        stop
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-audio element-content",
        "data-audio-element": "",
        style: {
            height: `${elementInfo.height}px`,
            left: `${elementInfo.left}px`,
            pointerEvents: 'none',
            position: 'absolute',
            top: `${elementInfo.top}px`,
            width: `${elementInfo.width}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
            type: "button",
            "aria-label": playing ? 'Pause audio' : 'Play audio',
            "aria-pressed": playing,
            disabled: !available,
            onClick: ()=>void togglePlayback(),
            style: {
                alignItems: 'center',
                background: playing ? elementInfo.color : 'transparent',
                border: 0,
                borderRadius: '50%',
                color: playing ? '#ffffff' : available ? elementInfo.color : '#a1a1aa',
                cursor: available ? 'pointer' : 'not-allowed',
                display: 'flex',
                height: '40px',
                justifyContent: 'center',
                left: '50%',
                padding: 0,
                pointerEvents: 'auto',
                position: 'absolute',
                top: '50%',
                transform: `rotate(${elementInfo.rotate}deg)`,
                translate: '-50% -50%',
                transition: 'background-color 120ms ease, color 120ms ease',
                width: '40px'
            },
            children: playing ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Pause_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                "aria-hidden": "true",
                size: 22
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Pause_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                "aria-hidden": "true",
                size: 28
            })
        })
    });
}
 //# sourceMappingURL=BaseAudioElement.js.map


/***/ }),

/***/ 64679:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ BaseTextElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66080);
/* harmony import */ var _shared_ElementOutline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89043);
/* harmony import */ var _utils_richText_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1438);
/* harmony import */ var _utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18180);
/* harmony import */ var _shared_hasTextInsets_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25506);
/* __next_internal_client_entry_do_not_use__ BaseTextElement auto */ 






function BaseTextElement({ elementInfo, target, renderContent, fillHeight = false }) {
    const { shadowStyle } = (0,_shared_useElementShadow_js__WEBPACK_IMPORTED_MODULE_2__/* .useElementShadow */ .o)(elementInfo.shadow);
    const proseRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const innerHtml = (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_4__/* .useInnerHtml */ .$1)(elementInfo.content);
    (0,_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_4__/* .useInlineMath */ .NF)(proseRef, elementInfo.content);
    // Imported OOXML text carries its own bodyPr insets on the outer div.
    // Adding the editor's default inset again shifts the label and reduces line width.
    const contentHasTextInsets = (0,_shared_hasTextInsets_js__WEBPACK_IMPORTED_MODULE_5__/* .hasTextInsets */ .E)(elementInfo.content);
    const vAlign = elementInfo.vAlign ?? 'top';
    const justifyContent = vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';
    const defaultContent = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: proseRef,
        "data-inline-math-root": "",
        className: "text ProseMirror-static",
        style: {
            position: 'relative',
            pointerEvents: target === 'thumbnail' ? 'none' : undefined,
            whiteSpace: (0,_utils_richText_js__WEBPACK_IMPORTED_MODULE_6__/* .preservesPlainTextLineBreaks */ .h)(elementInfo.content) ? 'pre-line' : undefined
        },
        dangerouslySetInnerHTML: innerHtml
    });
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-text",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`,
                // Fill the full text box and rotate it with the glyphs/outline.
                backgroundColor: elementInfo.fill,
                opacity: elementInfo.opacity,
                display: 'flex',
                flexDirection: 'column',
                justifyContent
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "element-content slide-renderer-prose",
                style: {
                    position: 'relative',
                    boxSizing: 'border-box',
                    padding: contentHasTextInsets ? 0 : '10px',
                    overflowWrap: 'break-word',
                    width: elementInfo.vertical ? 'auto' : '100%',
                    height: elementInfo.vertical || fillHeight ? '100%' : 'auto',
                    display: fillHeight ? 'flex' : undefined,
                    flexDirection: fillHeight ? 'column' : undefined,
                    justifyContent: fillHeight ? justifyContent : undefined,
                    textShadow: shadowStyle,
                    lineHeight: elementInfo.lineHeight,
                    letterSpacing: elementInfo.wordSpace !== undefined ? `${elementInfo.wordSpace}px` : undefined,
                    color: elementInfo.defaultColor,
                    fontFamily: elementInfo.defaultFontName,
                    writingMode: elementInfo.vertical ? 'vertical-rl' : 'horizontal-tb',
                    ...elementInfo.paragraphSpace !== undefined ? {
                        '--paragraphSpace': `${elementInfo.paragraphSpace}px`
                    } : null
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared_ElementOutline_js__WEBPACK_IMPORTED_MODULE_3__/* .ElementOutline */ .l, {
                        width: elementInfo.width,
                        height: elementInfo.height,
                        outline: elementInfo.outline
                    }),
                    renderContent?.(elementInfo, defaultContent) ?? defaultContent
                ]
            })
        })
    });
}
 //# sourceMappingURL=BaseTextElement.js.map


/***/ }),

/***/ 66080:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ useElementShadow)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


function useElementShadow(shadow) {
    const shadowStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (shadow) {
            const { h, v, blur, color } = shadow;
            return `${h}px ${v}px ${blur}px ${color}`;
        }
        return '';
    }, [shadow]);
    return { shadowStyle };
}


//# sourceMappingURL=useElementShadow.js.map


/***/ }),

/***/ 66568:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ useFilter)
/* harmony export */ });
/* unused harmony export imageFiltersToCss */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


const FILTER_UNITS = {
    blur: 'px',
    brightness: '%',
    contrast: '%',
    grayscale: '%',
    saturate: '%',
    'hue-rotate': 'deg',
    sepia: '%',
    invert: '%',
    opacity: '%',
};
function useFilter(filters) {
    const filter = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        return imageFiltersToCss(filters);
    }, [filters]);
    return { filter };
}
function imageFiltersToCss(filters) {
    if (!filters)
        return '';
    const parts = [];
    for (const [name, value] of Object.entries(filters)) {
        if (value === undefined || value === null || value === '')
            continue;
        const unit = FILTER_UNITS[name] ?? '';
        const rendered = unit && !value.endsWith(unit) ? `${value}${unit}` : value;
        parts.push(`${name}(${rendered})`);
    }
    return parts.join(' ');
}


//# sourceMappingURL=useFilter.js.map


/***/ }),

/***/ 66763:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Settings2)
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
    name: "settings-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14 17H5",
                key: "gfn3mx"
            }
        ],
        [
            "path",
            {
                d: "M19 7h-9",
                key: "6i9tg"
            }
        ],
        [
            "circle",
            {
                cx: "17",
                cy: "17",
                r: "3",
                key: "18b49y"
            }
        ],
        [
            "circle",
            {
                cx: "7",
                cy: "7",
                r: "3",
                key: "dfmy0x"
            }
        ]
    ]
};
__iconData.node;
const Settings2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=settings-2.mjs.map


/***/ }),

/***/ 67667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Volume2)
/* harmony export */ });
/* unused harmony export __iconNode */
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94180);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconNode = [
    [
        "path",
        {
            d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
            key: "uqj9uw"
        }
    ],
    [
        "path",
        {
            d: "M16 9a5 5 0 0 1 0 6",
            key: "1q6k2b"
        }
    ],
    [
        "path",
        {
            d: "M19.364 18.364a9 9 0 0 0 0-12.728",
            key: "ijwkga"
        }
    ]
];
const Volume2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("volume-2", __iconNode);
 //# sourceMappingURL=volume-2.js.map


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

/***/ 68681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports xmlReplacer, getCodePoint, encodeXML, escape, escapeUTF8, escapeAttribute, escapeText */
const xmlReplacer = /["$&'<>\u0080-\uFFFF]/g;
const xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
]);
// For compatibility with node < 4, we wrap `codePointAt`
const getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt == null
    ? (c, index) => (c.charCodeAt(index) & 64512) === 55296
        ? (c.charCodeAt(index) - 55296) * 1024 +
            c.charCodeAt(index + 1) -
            56320 +
            65536
        : c.charCodeAt(index)
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        (input, index) => input.codePointAt(index);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
function encodeXML(input) {
    let returnValue = "";
    let lastIndex = 0;
    let match;
    while ((match = xmlReplacer.exec(input)) !== null) {
        const { index } = match;
        const char = input.charCodeAt(index);
        const next = xmlCodeMap.get(char);
        if (next === undefined) {
            returnValue += `${input.substring(lastIndex, index)}&#x${getCodePoint(input, index).toString(16)};`;
            // Increase by 1 if we have a surrogate pair
            lastIndex = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
        }
        else {
            returnValue += input.substring(lastIndex, index) + next;
            lastIndex = index + 1;
        }
    }
    return returnValue + input.substr(lastIndex);
}
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */
const escape = (/* unused pure expression or super */ null && (encodeXML));
/**
 * Creates a function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 *
 * @param regex Regular expression to match characters to escape.
 * @param map Map of characters to escape to their entities.
 *
 * @returns Function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 */
function getEscaper(regex, map) {
    return function escape(data) {
        let match;
        let lastIndex = 0;
        let result = "";
        while ((match = regex.exec(data))) {
            if (lastIndex !== match.index) {
                result += data.substring(lastIndex, match.index);
            }
            // We know that this character will be in the map.
            result += map.get(match[0].charCodeAt(0));
            // Every match will be of length 1
            lastIndex = match.index + 1;
        }
        return result + data.substring(lastIndex);
    };
}
/**
 * Encodes all characters not valid in XML documents using XML entities.
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */
const escapeUTF8 = /* #__PURE__ */ (/* unused pure expression or super */ null && (getEscaper(/["&'<>]/g, xmlCodeMap)));
/**
 * Encodes all characters that have to be escaped in HTML attributes,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
const escapeAttribute = 
/* #__PURE__ */ getEscaper(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"],
]));
/**
 * Encodes all characters that have to be escaped in HTML text,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
const escapeText = /* #__PURE__ */ getEscaper(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"],
]));
//# sourceMappingURL=escape.js.map

/***/ }),

/***/ 70299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Monitor)
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
    name: "monitor",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "3",
                rx: "2",
                key: "48i651"
            }
        ],
        [
            "line",
            {
                x1: "8",
                x2: "16",
                y1: "21",
                y2: "21",
                key: "1svkeh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "17",
                y2: "21",
                key: "vw1qmm"
            }
        ]
    ]
};
__iconData.node;
const Monitor = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=monitor.mjs.map


/***/ }),

/***/ 71311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ assignRef)
/* harmony export */ });
/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
    return ref;
}


/***/ }),

/***/ 72471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
 //# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ 73246:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Shuffle)
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
    name: "shuffle",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m18 14 4 4-4 4",
                key: "10pe0f"
            }
        ],
        [
            "path",
            {
                d: "m18 2 4 4-4 4",
                key: "pucp1d"
            }
        ],
        [
            "path",
            {
                d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",
                key: "1ailkh"
            }
        ],
        [
            "path",
            {
                d: "M2 6h1.972a4 4 0 0 1 3.6 2.2",
                key: "km57vx"
            }
        ],
        [
            "path",
            {
                d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
                key: "os18l9"
            }
        ]
    ]
};
__iconData.node;
const Shuffle = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=shuffle.mjs.map


/***/ }),

/***/ 73665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ effectCar)
/* harmony export */ });
/* harmony import */ var use_sidecar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94622);

var effectCar = (0,use_sidecar__WEBPACK_IMPORTED_MODULE_0__/* .createSidecarMedium */ .f)();


/***/ }),

/***/ 74885:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gV: () => (/* binding */ getLineElementPath),
/* harmony export */   j3: () => (/* binding */ getTableSubThemeColor)
/* harmony export */ });
/* unused harmony exports getElementRange, getRectRotatedRange */
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12100);


const getRectRotatedRange = (element) => {
    const { left, top, width, height, rotate = 0 } = element;
    const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
    const auxiliaryAngle = (Math.atan(height / width) * 180) / Math.PI;
    const tlbraRadian = ((180 - rotate - auxiliaryAngle) * Math.PI) / 180;
    const trblaRadian = ((auxiliaryAngle - rotate) * Math.PI) / 180;
    const middleLeft = left + width / 2;
    const middleTop = top + height / 2;
    const xAxis = [
        middleLeft + radius * Math.cos(tlbraRadian),
        middleLeft + radius * Math.cos(trblaRadian),
        middleLeft - radius * Math.cos(tlbraRadian),
        middleLeft - radius * Math.cos(trblaRadian),
    ];
    const yAxis = [
        middleTop - radius * Math.sin(tlbraRadian),
        middleTop - radius * Math.sin(trblaRadian),
        middleTop + radius * Math.sin(tlbraRadian),
        middleTop + radius * Math.sin(trblaRadian),
    ];
    return {
        xRange: [Math.min(...xAxis), Math.max(...xAxis)],
        yRange: [Math.min(...yAxis), Math.max(...yAxis)],
    };
};
// Preserve the existing endpoint-offset routing rule. Using the expanded
// bounds here would let a control point change the double elbow's direction.
const isHorizontalElbow = (start, end) => Math.max(start[0], end[0]) >= Math.max(start[1], end[1]);
const getElementRange = (element) => {
    let minX, maxX, minY, maxY;
    if (element.type === 'line') {
        const xs = [element.start[0], element.end[0]];
        const ys = [element.start[1], element.end[1]];
        // Follow the same path-variant precedence as getLineElementPath. Bezier
        // control hulls conservatively enclose the curve; elbows use drawn vertices.
        if (element.broken) {
            xs.push(element.broken[0]);
            ys.push(element.broken[1]);
        }
        else if (element.broken2) {
            if (isHorizontalElbow(element.start, element.end))
                xs.push(element.broken2[0]);
            else
                ys.push(element.broken2[1]);
        }
        else if (element.curve) {
            xs.push(element.curve[0]);
            ys.push(element.curve[1]);
        }
        else if (element.cubic) {
            xs.push(element.cubic[0][0], element.cubic[1][0]);
            ys.push(element.cubic[0][1], element.cubic[1][1]);
        }
        minX = element.left + Math.min(...xs);
        maxX = element.left + Math.max(...xs);
        minY = element.top + Math.min(...ys);
        maxY = element.top + Math.max(...ys);
    }
    else if ('rotate' in element && element.rotate) {
        const { left, top, width, height, rotate } = element;
        const { xRange, yRange } = getRectRotatedRange({ left, top, width, height, rotate });
        minX = xRange[0];
        maxX = xRange[1];
        minY = yRange[0];
        maxY = yRange[1];
    }
    else {
        minX = element.left;
        maxX = element.left + element.width;
        minY = element.top;
        maxY = element.top + element.height;
    }
    return { minX, maxX, minY, maxY };
};
const getTableSubThemeColor = (themeColor) => {
    const rgba = (0,tinycolor2__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(themeColor);
    return [rgba.setAlpha(0.3).toRgbString(), rgba.setAlpha(0.1).toRgbString()];
};
const getLineElementPath = (element) => {
    const startArr = Array.isArray(element.start) ? element.start : [0, 0];
    const endArr = Array.isArray(element.end) ? element.end : [100, 100];
    const start = startArr.join(',');
    const end = endArr.join(',');
    if (element.broken) {
        const mid = element.broken.join(',');
        return `M${start} L${mid} L${end}`;
    }
    else if (element.broken2) {
        if (isHorizontalElbow(startArr, endArr))
            return `M${start} L${element.broken2[0]},${startArr[1]} L${element.broken2[0]},${endArr[1]} ${end}`;
        return `M${start} L${startArr[0]},${element.broken2[1]} L${endArr[0]},${element.broken2[1]} ${end}`;
    }
    else if (element.curve) {
        const mid = element.curve.join(',');
        return `M${start} Q${mid} ${end}`;
    }
    else if (element.cubic) {
        const [c1, c2] = element.cubic;
        const p1 = c1.join(',');
        const p2 = c2.join(',');
        return `M${start} C${p1} ${p2} ${end}`;
    }
    return `M${start} L${end}`;
};


//# sourceMappingURL=element.js.map


/***/ }),

/***/ 76094:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ createCollection)
/* harmony export */ });
/* unused harmony export unstable_createCollection */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42442);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66294);
/* __next_internal_client_entry_do_not_use__ createCollection,unstable_createCollection auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/collection-legacy.tsx





// @__NO_SIDE_EFFECTS__
function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionRef: {
            current: null
        },
        itemMap: /* @__PURE__ */ new Map()
    });
    const CollectionProvider = /* @__PURE__ */ __name((props)=>{
        const { scope, children } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const itemMap = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map()).current;
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionProviderImpl, {
            scope,
            itemMap,
            collectionRef: ref,
            children
        });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .createSlot */ .TL)(COLLECTION_SLOT_NAME);
    const CollectionSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionSlotImpl, {
            ref: composedRefs,
            children
        });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .createSlot */ .TL)(ITEM_SLOT_NAME);
    const CollectionItemSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children, ...itemData } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            context.itemMap.set(ref, {
                ref,
                ...itemData
            });
            return ()=>void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionItemSlotImpl, {
            ...{
                [ITEM_DATA_ATTR]: ""
            },
            ref: composedRefs,
            children
        });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection(scope) {
        const context = useCollectionContext(name + "CollectionConsumer", scope);
        const getItems = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            const collectionNode = context.collectionRef.current;
            if (!collectionNode) return [];
            const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
            const items = Array.from(context.itemMap.values());
            const orderedItems = items.sort((a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
            return orderedItems;
        }, [
            context.collectionRef,
            context.itemMap
        ]);
        return getItems;
    }
    __name(useCollection, "useCollection");
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        useCollection,
        createCollectionScope
    ];
}
__name(createCollection, "createCollection");
// src/collection.tsx





// src/ordered-dictionary.ts
var __instanciated = /* @__PURE__ */ new WeakMap();
var OrderedDict = class _OrderedDict extends Map {
    static{
        __name(this, "OrderedDict");
    }
    #keys;
    constructor(entries){
        super(entries);
        this.#keys = [
            ...super.keys()
        ];
        __instanciated.set(this, true);
    }
    set(key, value) {
        if (__instanciated.get(this) && !this.has(key)) {
            this.#keys.push(key);
        }
        super.set(key, value);
        return this;
    }
    /**
   * Sets a key-value pair so that it ends up at the given index.
   * - Existing keys are moved
   * - Negative indices count from the end of the resulting dictionary, so
   *   inserting at -1 makes the item the last one, -2 the second to last, etc.
   * - Out-of-range indices are clamped
   */ insert(index, key, value) {
        const has = this.has(key);
        const finalSize = has ? this.size : this.size + 1;
        const relativeIndex = toSafeInteger(index);
        const targetIndex = relativeIndex >= 0 ? Math.min(relativeIndex, finalSize - 1) : Math.max(finalSize + relativeIndex, 0);
        if (has ? this.#keys.indexOf(key) === targetIndex : targetIndex === this.size) {
            this.set(key, value);
            return this;
        }
        const keys = this.#keys.filter((existingKey)=>existingKey !== key);
        keys.splice(targetIndex, 0, key);
        const entries = keys.map((entryKey)=>[
                entryKey,
                entryKey === key ? value : this.get(entryKey)
            ]);
        this.clear();
        for (const [entryKey, entryValue] of entries){
            this.set(entryKey, entryValue);
        }
        return this;
    }
    with(index, key, value) {
        const copy = new _OrderedDict(this);
        copy.insert(index, key, value);
        return copy;
    }
    before(key) {
        const index = this.#keys.indexOf(key) - 1;
        if (index < 0) {
            return void 0;
        }
        return this.entryAt(index);
    }
    /**
   * Sets a new key-value pair at the position before the given key.
   */ setBefore(key, newKey, value) {
        const index = this.#keys.indexOf(key);
        if (index === -1) {
            return this;
        }
        const currentIndex = this.#keys.indexOf(newKey);
        const targetIndex = currentIndex !== -1 && currentIndex < index ? index - 1 : index;
        return this.insert(targetIndex, newKey, value);
    }
    after(key) {
        let index = this.#keys.indexOf(key);
        index = index === -1 || index === this.size - 1 ? -1 : index + 1;
        if (index === -1) {
            return void 0;
        }
        return this.entryAt(index);
    }
    /**
   * Sets a new key-value pair at the position after the given key.
   */ setAfter(key, newKey, value) {
        const index = this.#keys.indexOf(key);
        if (index === -1) {
            return this;
        }
        const currentIndex = this.#keys.indexOf(newKey);
        const targetIndex = currentIndex !== -1 && currentIndex <= index ? index : index + 1;
        return this.insert(targetIndex, newKey, value);
    }
    first() {
        return this.entryAt(0);
    }
    last() {
        return this.entryAt(-1);
    }
    clear() {
        this.#keys = [];
        return super.clear();
    }
    delete(key) {
        const deleted = super.delete(key);
        if (deleted) {
            this.#keys.splice(this.#keys.indexOf(key), 1);
        }
        return deleted;
    }
    deleteAt(index) {
        const key = this.keyAt(index);
        if (key !== void 0) {
            return this.delete(key);
        }
        return false;
    }
    at(index) {
        const key = at(this.#keys, index);
        if (key !== void 0) {
            return this.get(key);
        }
    }
    entryAt(index) {
        const key = at(this.#keys, index);
        if (key !== void 0) {
            return [
                key,
                this.get(key)
            ];
        }
    }
    indexOf(key) {
        return this.#keys.indexOf(key);
    }
    keyAt(index) {
        return at(this.#keys, index);
    }
    from(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
            return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.at(dest);
    }
    keyFrom(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
            return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.keyAt(dest);
    }
    find(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return entry;
            }
            index++;
        }
        return void 0;
    }
    findIndex(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return index;
            }
            index++;
        }
        return -1;
    }
    filter(predicate, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                entries.push(entry);
            }
            index++;
        }
        return new _OrderedDict(entries);
    }
    map(callbackfn, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this){
            entries.push([
                entry[0],
                Reflect.apply(callbackfn, thisArg, [
                    entry,
                    index,
                    this
                ])
            ]);
            index++;
        }
        return new _OrderedDict(entries);
    }
    reduce(...args) {
        const [callbackfn, initialValue] = args;
        const hasInitialValue = args.length > 1;
        if (!hasInitialValue && this.size === 0) {
            throw new TypeError("Reduce of empty OrderedDict with no initial value");
        }
        let index = 0;
        let accumulator = initialValue;
        for (const entry of this){
            if (index === 0 && !hasInitialValue) {
                accumulator = entry;
            } else {
                accumulator = Reflect.apply(callbackfn, this, [
                    accumulator,
                    entry,
                    index,
                    this
                ]);
            }
            index++;
        }
        return accumulator;
    }
    reduceRight(...args) {
        const [callbackfn, initialValue] = args;
        const hasInitialValue = args.length > 1;
        if (!hasInitialValue && this.size === 0) {
            throw new TypeError("Reduce of empty OrderedDict with no initial value");
        }
        let accumulator = initialValue;
        for(let index = this.size - 1; index >= 0; index--){
            const entry = this.entryAt(index);
            if (index === this.size - 1 && !hasInitialValue) {
                accumulator = entry;
            } else {
                accumulator = Reflect.apply(callbackfn, this, [
                    accumulator,
                    entry,
                    index,
                    this
                ]);
            }
        }
        return accumulator;
    }
    /**
   * Sorts the dictionary in place. This method mutates the dictionary and
   * returns a reference to the same object
   *
   * @param compareFn Function used to determine the order of the elements. It
   * is expected to return a negative value if the first argument is less than
   * the second argument, zero if they're equal, and a positive value otherwise.
   */ sort(compareFn) {
        if (typeof compareFn !== "function") {
            throw new TypeError(`OrderedDict.sort requires a compare function`);
        }
        const entries = [
            ...this.entries()
        ].sort(compareFn);
        this.clear();
        for (const [key, value] of entries){
            this.set(key, value);
        }
        return this;
    }
    /**
   * Returns a copy of the dictionary with its elements sorted.
   *
   * @param compareFn Function used to determine the order of the elements. It
   * is expected to return a negative value if the first argument is less than
   * the second argument, zero if they're equal, and a positive value otherwise.
   */ toSorted(compareFn) {
        if (typeof compareFn !== "function") {
            throw new TypeError(`OrderedDict.toSorted requires a compare function`);
        }
        const entries = [
            ...this.entries()
        ].sort(compareFn);
        return new _OrderedDict(entries);
    }
    toReversed() {
        const reversed = new _OrderedDict();
        for(let index = this.size - 1; index >= 0; index--){
            const key = this.keyAt(index);
            const element = this.get(key);
            reversed.set(key, element);
        }
        return reversed;
    }
    toSpliced(...args) {
        const entries = [
            ...this.entries()
        ];
        entries.splice(...args);
        return new _OrderedDict(entries);
    }
    slice(start, end) {
        const result = new _OrderedDict();
        for (const key of this.#keys.slice(start, end)){
            result.set(key, this.get(key));
        }
        return result;
    }
    every(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (!Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return false;
            }
            index++;
        }
        return true;
    }
    some(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return true;
            }
            index++;
        }
        return false;
    }
};
function at(array, index) {
    if ("at" in Array.prototype) {
        return Array.prototype.at.call(array, index);
    }
    const actualIndex = toSafeIndex(array, index);
    return actualIndex === -1 ? void 0 : array[actualIndex];
}
__name(at, "at");
function toSafeIndex(array, index) {
    const length = array.length;
    const relativeIndex = toSafeInteger(index);
    const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}
__name(toSafeIndex, "toSafeIndex");
function toSafeInteger(number) {
    return number !== number || number === 0 ? 0 : Math.trunc(number);
}
__name(toSafeInteger, "toSafeInteger");
// src/collection.tsx

// @__NO_SIDE_EFFECTS__
function createCollection2(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(PROVIDER_NAME);
    const [CollectionStableContextProvider, useStableCollectionContext] = createCollectionContext(PROVIDER_NAME);
    CollectionStableContextProvider.displayName = name + "CollectionStableContextProvider";
    const [CollectionStatefulContextProvider, useStatefulCollectionContext] = createCollectionContext(PROVIDER_NAME);
    CollectionStatefulContextProvider.displayName = name + "CollectionStatefulContextProvider";
    const CollectionProvider = /* @__PURE__ */ __name(({ state, ...props })=>{
        return state ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionProviderImpl, {
            ...props,
            state
        }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionInit, {
            ...props
        });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME;
    const CollectionInit = /* @__PURE__ */ __name((props)=>{
        const state = useInitCollection();
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionProviderImpl, {
            ...props,
            state
        });
    }, "CollectionInit");
    CollectionInit.displayName = name + "CollectionInit";
    const CollectionProviderImpl = /* @__PURE__ */ __name((props)=>{
        const { scope, children, state } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const [collectionElement, setCollectionElement] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
        const composeRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(ref, setCollectionElement);
        const [collection, setCollection] = state;
        const registryRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new OrderedDict());
        const getCollection = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            const registry = registryRef.current;
            if (!isInDocumentOrder(registry)) {
                registry.sort(sortByDocumentPosition);
            }
            return registry;
        }, []);
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            if (!collectionElement) {
                return;
            }
            const observer = getChildListObserver(()=>{
                setCollection((map)=>{
                    const sorted = map.toSorted(sortByDocumentPosition);
                    const orderChanged = sorted.some(([key], index)=>map.keyAt(index) !== key);
                    return orderChanged ? sorted : map;
                });
            });
            observer.observe(collectionElement, {
                childList: true,
                subtree: true
            });
            return ()=>{
                observer.disconnect();
            };
        }, [
            collectionElement,
            setCollection
        ]);
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionStableContextProvider, {
            scope,
            collectionElementRef: composeRefs,
            collectionElementRefObject: ref,
            getCollection,
            setCollection,
            registryRef,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionStatefulContextProvider, {
                scope,
                collectionElement,
                collection,
                children
            })
        });
    }, "CollectionProviderImpl");
    CollectionProviderImpl.displayName = name + "CollectionProviderImpl";
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .createSlot */ .TL)(COLLECTION_SLOT_NAME);
    const CollectionSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children } = props;
        const context = useStableCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, context.collectionElementRef);
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionSlotImpl, {
            ref: composedRefs,
            children
        });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .createSlot */ .TL)(ITEM_SLOT_NAME);
    const CollectionItemSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children, ...itemData } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const context = useStableCollectionContext(ITEM_SLOT_NAME, scope);
        const { setCollection, registryRef } = context;
        const itemDataRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(itemData);
        if (!shallowEqual(itemDataRef.current, itemData)) {
            itemDataRef.current = itemData;
        }
        const memoizedItemData = itemDataRef.current;
        const registerElement = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node)=>{
            const registry = registryRef.current;
            if (node) {
                registry.set(node, {
                    ...itemDataRef.current,
                    element: node
                });
            } else if (ref.current) {
                registry.delete(ref.current);
            }
        }, [
            registryRef
        ]);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, registerElement, ref);
        (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__/* .useLayoutEffect */ .N)(()=>{
            const node = ref.current;
            const registry = registryRef.current;
            if (node && registry.has(node)) {
                registry.set(node, {
                    ...memoizedItemData,
                    element: node
                });
            }
        }, [
            memoizedItemData,
            registryRef
        ]);
        const registeredRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            const element = ref.current;
            const registered = registeredRef.current;
            if ((registered?.element ?? null) === element && (!element || registered?.itemData === memoizedItemData)) {
                return;
            }
            registeredRef.current = element ? {
                element,
                itemData: memoizedItemData
            } : null;
            setCollection((map)=>{
                const next = new OrderedDict(map);
                if (registered && registered.element !== element) {
                    next.delete(registered.element);
                }
                if (element) {
                    next.set(element, {
                        ...memoizedItemData,
                        element
                    });
                }
                return next.sort(sortByDocumentPosition);
            });
        });
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            return ()=>{
                const registered = registeredRef.current;
                registeredRef.current = null;
                if (!registered) {
                    return;
                }
                setCollection((map)=>{
                    if (!map.has(registered.element)) {
                        return map;
                    }
                    const next = new OrderedDict(map);
                    next.delete(registered.element);
                    return next;
                });
            };
        }, [
            setCollection
        ]);
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionItemSlotImpl, {
            ...{
                [ITEM_DATA_ATTR]: ""
            },
            ref: composedRefs,
            children
        });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useInitCollection() {
        return react__WEBPACK_IMPORTED_MODULE_0__.useState(new OrderedDict());
    }
    __name(useInitCollection, "useInitCollection");
    function useCollection(scope) {
        const { collection } = useStatefulCollectionContext(name + "CollectionConsumer", scope);
        return collection;
    }
    __name(useCollection, "useCollection");
    function useGetCollection(scope) {
        const { getCollection } = useStableCollectionContext(name + "CollectionConsumer", scope);
        return getCollection;
    }
    __name(useGetCollection, "useGetCollection");
    const functions = {
        createCollectionScope,
        useCollection,
        useGetCollection,
        useInitCollection
    };
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        functions
    ];
}
__name(createCollection2, "createCollection");
function shallowEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a == null || b == null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA){
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (a[key] !== b[key]) return false;
    }
    return true;
}
__name(shallowEqual, "shallowEqual");
function isElementPreceding(a, b) {
    return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
__name(isElementPreceding, "isElementPreceding");
function isInDocumentOrder(dict) {
    let previous;
    for (const element of dict.keys()){
        if (previous) {
            const position = previous.compareDocumentPosition(element);
            if (!(position & Node.DOCUMENT_POSITION_DISCONNECTED) && position & Node.DOCUMENT_POSITION_PRECEDING) {
                return false;
            }
        }
        previous = element;
    }
    return true;
}
__name(isInDocumentOrder, "isInDocumentOrder");
function sortByDocumentPosition(a, b) {
    return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
}
__name(sortByDocumentPosition, "sortByDocumentPosition");
function getChildListObserver(callback) {
    const observer = new MutationObserver((mutationsList)=>{
        for (const mutation of mutationsList){
            if (mutation.type === "childList") {
                callback();
                return;
            }
        }
    });
    return observer;
}
__name(getChildListObserver, "getChildListObserver");
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 77436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ exportSidecar)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61672);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);


var SideCar = function (_a) {
    var sideCar = _a.sideCar, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__rest */ .Tt)(_a, ["sideCar"]);
    if (!sideCar) {
        throw new Error('Sidecar: please provide `sideCar` property to import the right car');
    }
    var Target = sideCar.read();
    if (!Target) {
        throw new Error('Sidecar medium not found');
    }
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Target, (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar;
}


/***/ }),

/***/ 77896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ RemoveScroll)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55947);
/* harmony import */ var use_callback_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16459);
/* harmony import */ var _medium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73665);





var nothing = function () {
    return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
var RemoveScroll = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function (props, parentRef) {
    var ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing,
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? 'div' : _b, gapMode = props.gapMode, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__rest */ .Tt)(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar = sideCar;
    var containerRef = (0,use_callback_ref__WEBPACK_IMPORTED_MODULE_2__/* .useMergeRefs */ .S)([ref, parentRef]);
    var containerProps = (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)((0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)({}, rest), callbacks);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
        enabled && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(SideCar, { sideCar: _medium__WEBPACK_IMPORTED_MODULE_3__/* .effectCar */ .O, removeScrollBar: removeScrollBar, shards: shards, noRelative: noRelative, noIsolation: noIsolation, inert: inert, setCallbacks: setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode: gapMode })),
        forwardProps ? (react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children), (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)((0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)({}, containerProps), { ref: containerRef }))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(Container, (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__assign */ .Cl)({}, containerProps, { className: className, ref: containerRef }), children))));
});
RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false,
};
RemoveScroll.classNames = {
    fullWidth: react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_4__/* .fullWidthClassName */ .pN,
    zeroRight: react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_4__/* .zeroRightClassName */ .Mi,
};



/***/ }),

/***/ 78809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77896);
/* harmony import */ var _sidecar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49909);




var ReactRemoveScroll = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_UI__WEBPACK_IMPORTED_MODULE_2__/* .RemoveScroll */ .G, (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__assign */ .Cl)({}, props, { ref: ref, sideCar: _sidecar__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A }))); });
ReactRemoveScroll.classNames = _UI__WEBPACK_IMPORTED_MODULE_2__/* .RemoveScroll */ .G.classNames;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactRemoveScroll);


/***/ }),

/***/ 78890:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Moon)
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
    name: "moon",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
                key: "kfwtm"
            }
        ]
    ]
};
__iconData.node;
const Moon = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=moon.mjs.map


/***/ }),

/***/ 79108:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ REVERSE_PATH)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79577);
/* harmony import */ var _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7391);


/**
 * Reverses the order of path commands to go from end to start
 * IMPORTANT: This function expects absolute commands as input.
 * It doesn't convert relative to absolute - use SVGPathDataTransformer.TO_ABS() first if needed.
 * @param commands SVG path commands in absolute form to reverse
 * @param preserveSubpathOrder If true, keeps subpaths in their original order
 * @returns New SVG commands in reverse order with absolute coordinates
 */
function REVERSE_PATH(commands, preserveSubpathOrder = true) {
    if (commands.length < 2)
        return commands;
    // Extract absolute points using the transformer to track current position
    const normalized = _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathDataTransformer */ .z.INFO((command, px, py) => ({
        ...command,
        x: command.x ?? px,
        y: command.y ?? py,
        relative: command.relative ?? false,
    }));
    const result = [];
    let processing = [];
    for (const original of commands) {
        const cmd = normalized(original);
        // Start a new subpath if needed
        if (cmd.type === _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.MOVE_TO && processing.length > 0) {
            if (preserveSubpathOrder) {
                result.push(...reverseSubpath(processing));
            }
            else {
                result.unshift(...reverseSubpath(processing));
            }
            processing = []; // Clear the current subpath
        }
        processing.push(cmd);
    }
    if (processing.length > 0) {
        if (preserveSubpathOrder) {
            result.push(...reverseSubpath(processing));
        }
        else {
            result.unshift(...reverseSubpath(processing));
        }
    }
    // Join the reversed subpaths in original order
    return result;
}
function reverseSubpath(commands) {
    // Check if path is explicitly closed (ends with CLOSE_PATH)
    const isExplicitlyClosed = commands[commands.length - 1]?.type === _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.CLOSE_PATH;
    // Start with a move to the last explicit point
    // (if path ends with Z, use the point before Z)
    const startPointIndex = isExplicitlyClosed
        ? commands.length - 2
        : commands.length - 1;
    const reversed = [
        {
            type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.MOVE_TO,
            relative: false,
            x: commands[startPointIndex].x,
            y: commands[startPointIndex].y,
        },
    ];
    // Process each segment in reverse order
    for (let i = startPointIndex; i > 0; i--) {
        const curCmd = commands[i];
        const prevPoint = commands[i - 1];
        if (curCmd.relative) {
            throw new Error('Relative command are not supported convert first with `toAbs()`');
        }
        // Handle the current command type
        switch (curCmd.type) {
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.HORIZ_LINE_TO:
                reversed.push({
                    type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.HORIZ_LINE_TO,
                    relative: false,
                    x: prevPoint.x,
                });
                break;
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.VERT_LINE_TO:
                reversed.push({
                    type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.VERT_LINE_TO,
                    relative: false,
                    y: prevPoint.y,
                });
                break;
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.LINE_TO:
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.MOVE_TO:
                reversed.push({
                    type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.LINE_TO,
                    relative: false,
                    x: prevPoint.x,
                    y: prevPoint.y,
                });
                break;
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.CURVE_TO:
                reversed.push({
                    type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.CURVE_TO,
                    relative: false,
                    x: prevPoint.x,
                    y: prevPoint.y,
                    x1: curCmd.x2,
                    y1: curCmd.y2,
                    x2: curCmd.x1,
                    y2: curCmd.y1,
                });
                break;
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.SMOOTH_CURVE_TO:
                throw new Error(`Unsupported command: S (smooth cubic bezier)`);
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.SMOOTH_QUAD_TO:
                throw new Error(`Unsupported command: T (smooth quadratic bezier)`);
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.ARC:
                throw new Error(`Unsupported command: A (arc)`);
            case _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.QUAD_TO:
                throw new Error(`Unsupported command: Q (quadratic bezier)`);
        }
    }
    // If the original path was explicitly closed, preserve the Z command
    if (isExplicitlyClosed) {
        reversed.push({ type: _index_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .LQ.CLOSE_PATH });
    }
    return reversed;
}
//# sourceMappingURL=reverse_path.js.map

/***/ }),

/***/ 79577:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LQ: () => (/* reexport safe */ _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__.L),
/* harmony export */   zb: () => (/* reexport safe */ _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_3__.z)
/* harmony export */ });
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);
/* harmony import */ var _SVGPathDataEncoder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51944);
/* harmony import */ var _SVGPathDataParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1623);
/* harmony import */ var _SVGPathDataTransformer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7391);
/* harmony import */ var _SVGShapes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51873);





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 80533:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ repaintClipPaths),
/* harmony export */   l: () => (/* binding */ isWebKitEngine)
/* harmony export */ });
/**
 * WebKit (Safari) workaround for SVG charts whose series are revealed through
 * an animated `<clipPath>`.
 *
 * ECharts animates line and area series in by growing a clip path from a
 * sliver to the full plot width. WebKit keeps painting the clipped group as it
 * was clipped on the first, nearly empty frame: the clip geometry reaches its
 * final size, but the group is never repainted, so the points and labels show
 * and the line does not. Setting the clip shape's geometry again, even to the
 * same value, makes WebKit repaint the group against it.
 */
/**
 * Whether the page runs on WebKit, whose SVG painter needs the repaint.
 *
 * Blink-based browsers also report `AppleWebKit` in their user agent, so they
 * are excluded by their own tokens. Browsers on iOS are all WebKit and report
 * `CriOS`/`FxiOS`/`EdgiOS` instead of `Chrome/`, so they count as WebKit.
 * Erring towards WebKit is harmless: the repaint does not change the DOM.
 */
function isWebKitEngine(userAgent) {
    if (!userAgent || !/AppleWebKit\//.test(userAgent))
        return false;
    return !/(?:Chrome|Chromium|Edg|OPR|SamsungBrowser)\//.test(userAgent);
}
/**
 * Re-set the attributes of every shape inside a `<clipPath>` under `root` to
 * their current values, so WebKit repaints the clipped content against the
 * clip path's current geometry. The DOM ends exactly as it was; other engines
 * see no change.
 */
function repaintClipPaths(root) {
    for (const clipPath of root.querySelectorAll('clipPath')) {
        for (const shape of Array.from(clipPath.children)) {
            for (const { name, value } of Array.from(shape.attributes)) {
                shape.setAttribute(name, value);
            }
        }
    }
}


//# sourceMappingURL=clipRepaint.js.map


/***/ }),

/***/ 80846:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SlidersHorizontal)
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
    name: "sliders-horizontal",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 5H3",
                key: "1qgfaw"
            }
        ],
        [
            "path",
            {
                d: "M12 19H3",
                key: "yhmn1j"
            }
        ],
        [
            "path",
            {
                d: "M14 3v4",
                key: "1sua03"
            }
        ],
        [
            "path",
            {
                d: "M16 17v4",
                key: "1q0r14"
            }
        ],
        [
            "path",
            {
                d: "M21 12h-9",
                key: "1o4lsq"
            }
        ],
        [
            "path",
            {
                d: "M21 19h-5",
                key: "1rlt1p"
            }
        ],
        [
            "path",
            {
                d: "M21 5h-7",
                key: "1oszz2"
            }
        ],
        [
            "path",
            {
                d: "M8 10v4",
                key: "tgpxqk"
            }
        ],
        [
            "path",
            {
                d: "M8 12H3",
                key: "a7s4jb"
            }
        ]
    ]
};
__iconData.node;
const SlidersHorizontal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=sliders-horizontal.mjs.map


/***/ }),

/***/ 80910:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bh: () => (/* binding */ safeKatexOptions)
/* harmony export */ });
/* unused harmony exports SAFE_MATH_MAX_EXPAND, MATH_MACRO_DEFINITION_COMMANDS */
/**
 * Hardened render options for KaTeX (and Temml, which shares KaTeX's macro
 * engine and option names).
 *
 * Both engines let a formula define its own macros (`\def`, `\newcommand`,
 * `\let`, ...). Combined with nesting, a short formula can then expand into an
 * output many orders of magnitude larger than itself, and the `maxExpand`
 * budget alone does not keep that cheap. Formulas in this product come from
 * imported documents, model output, and user edits, so every render goes
 * through {@link safeKatexOptions}:
 *
 * - every macro-defining command is replaced by an inert macro that consumes
 *   the definition without registering anything. A formula that then uses the
 *   undefined name fails like any other unknown command (rendered as an error
 *   span or thrown, depending on the caller's `throwOnError`). The one
 *   exception is the state behind built-in equation numbering (`\tag`,
 *   `\tag*`, `\nonumber`, `\notag`), which the engines set with `\gdef`; only
 *   its built-in shapes are accepted (see `gdefNumberingStateOnly`);
 * - `trust` is forced to `false`;
 * - `maxExpand` is pinned explicitly. With definitions disabled, expansion is
 *   linear in the input length, so this is a backstop rather than the guard.
 *   It must stay high enough for long formulas that lean on built-in macros
 *   (`\neq`, `\iff`, `\dots`, `\,`, ... each cost several expansions).
 *
 * Caller-supplied macros are trusted code: a function macro receives the
 * engine's macro context and could define macros through it. Never build
 * `macros` from content (a document, a model response, user input).
 *
 * The engines write `\gdef`-style results into the `macros` object they are
 * given, so a fresh object is built on every call and never shared.
 *
 * This module is dependency-free on purpose: it lives in the DSL package
 * because that is the one package every renderer, importer, editor, and the
 * app already depend on, and it only produces a plain options object.
 */
/**
 * Expansion budget per render. KaTeX's and Temml's own default, pinned so a
 * library upgrade cannot change it silently.
 */
const SAFE_MATH_MAX_EXPAND = 1000;
/** The commands that let a formula define or alias a macro. */
const MATH_MACRO_DEFINITION_COMMANDS = (/* unused pure expression or super */ null && ([
    '\\def',
    '\\gdef',
    '\\edef',
    '\\xdef',
    '\\global',
    '\\long',
    '\\let',
    '\\futurelet',
    '\\newcommand',
    '\\renewcommand',
    '\\providecommand',
]));
const END = 'EOF';
function atEnd(context) {
    return context.future().text === END;
}
/** Skip `<parameter text>{<body>}` after a definition's name. */
function swallowDefinitionText(context) {
    while (!atEnd(context) && context.future().text !== '{')
        context.popToken();
    if (!atEnd(context))
        context.consumeArg();
}
/** `\def<cs><parameter text>{<body>}`: drop the name, parameters, and body. */
function swallowDef(raw) {
    const context = raw;
    if (!atEnd(context))
        context.popToken();
    swallowDefinitionText(context);
    return '';
}
/**
 * The engines' built-in equation numbering keeps its state in two internal
 * macros, and sets them with `\gdef` from built-in macros:
 *
 * - `\tag{x}` and `\tag*{x}` expand (through `\tag@paren` / `\tag@literal`) to
 *   `\gdef\df@tag{\text{(x)}}` / `\gdef\df@tag{\text{x}}`; the engine expands
 *   `\df@tag` once, after the row or the whole formula, as the tag;
 * - `\nonumber` and `\notag` expand to `\gdef\@eqnsw{0}`, which suppresses the
 *   automatic number of the current `align`/`gather`/`equation` row.
 *
 * `@` is a letter in both engines' lexers, so a formula can also name these
 * macros itself: the check below does not rely on them being private. It
 * allows exactly the two built-in shapes, which a formula could already
 * produce with `\tag*` and `\nonumber`, so it adds no new capability:
 *
 * - `\@eqnsw` may only be set to `0`;
 * - `\df@tag` may only be set to one `\text{...}` group that does not mention
 *   `\df@tag`, and it expands to that group only once (see `oneShot`), so
 *   its output stays proportional to the input. A self-reference would
 *   re-expand it until the call stack or the expansion budget runs out
 *   (`\tag{\df@tag}` in the stock engines). Nested
 *   `\tag` inside the tag is rejected by the engines (`Multiple \tag`), and
 *   every other definition inside it stays inert.
 *
 * Every other `\gdef` is swallowed like any definition.
 */
const EQUATION_NUMBERING_STATE = {
    '\\@eqnsw': (body) => body.length === 1 && body[0].text === '0',
    '\\df@tag': (body) => {
        if (body.length < 3 || body[0].text !== '\\text' || body[1].text !== '{')
            return false;
        let depth = 0;
        for (let index = 1; index < body.length; index += 1) {
            const text = body[index].text;
            if (text === '\\df@tag')
                return false;
            if (text === '{')
                depth += 1;
            if (text === '}')
                depth -= 1;
            // The `\text` group must close at the last token, and only there.
            if (depth === 0)
                return index === body.length - 1;
        }
        return false;
    },
};
/** The value the engines' `\gdef` stores for a parameterless macro. */
function expansionOf(tokens) {
    return { tokens, numArgs: 0, delimiters: [[]] };
}
/**
 * `\df@tag` as a macro that yields its full body on the first expansion only.
 *
 * The engines expand `\df@tag` once per formula (or once per `align` row,
 * clearing it afterwards), so tags render unchanged. A formula can also name
 * `\df@tag` itself, and every such mention would otherwise re-expand the
 * whole tag: a long tag mentioned many times multiplies the output by up to
 * the expansion budget. Later expansions yield an empty `\text{}` instead
 * (not nothing: Temml fails with a TypeError on an empty tag). The macro stays
 * defined, since the engines test it for `Multiple \tag`.
 *
 * `tokens` is in stack order, so `\text{` is its last two tokens and `}` its
 * first (the shape check guarantees all three).
 */
function oneShot(tokens) {
    const empty = [tokens[0], tokens[tokens.length - 2], tokens[tokens.length - 1]];
    let spent = false;
    return () => {
        const expansion = expansionOf(spent ? empty : tokens);
        spent = true;
        return expansion;
    };
}
/**
 * `\gdef`: inert, except for the built-in equation-numbering state described
 * above, which it sets exactly as the engines' own `\gdef` would.
 */
function gdefNumberingStateOnly(raw) {
    const context = raw;
    if (atEnd(context))
        return '';
    const name = context.popToken().text;
    const accepts = Object.hasOwn(EQUATION_NUMBERING_STATE, name)
        ? EQUATION_NUMBERING_STATE[name]
        : undefined;
    if (!accepts || context.future().text !== '{') {
        swallowDefinitionText(context);
        return '';
    }
    const { tokens } = context.consumeArg();
    if (accepts([...tokens].reverse())) {
        context.macros.set(name, name === '\\df@tag' ? oneShot(tokens) : expansionOf(tokens), true);
    }
    return '';
}
/** Drop one `[...]` group from the input; braces inside it are balanced. */
function skipBracketGroup(context) {
    context.popToken(); // `[`
    let depth = 0;
    while (!atEnd(context)) {
        const text = context.future().text;
        if (text === ']' && depth === 0) {
            context.popToken();
            return;
        }
        if (text === '{')
            depth += 1;
        if (text === '}')
            depth = Math.max(0, depth - 1);
        context.popToken();
    }
}
/**
 * `\newcommand*{<cs>}[<n>][<default>]{<body>}`: drop all of it.
 *
 * Optional groups are recognized only from an unconsumed `[` token, so a body
 * written as `{[}` stays a body. Exactly one replacement body is consumed.
 */
function swallowNewcommand(raw) {
    const context = raw;
    context.consumeSpaces();
    if (context.future().text === '*')
        context.popToken();
    context.consumeArg(); // the command name, braced or not
    for (let groups = 0; groups < 2; groups += 1) {
        context.consumeSpaces();
        if (context.future().text !== '[')
            break;
        skipBracketGroup(context);
    }
    context.consumeArg(); // the replacement body
    return '';
}
/** `\let<cs>=<token>`: drop the name, the optional `=`, and the target. */
function swallowLet(raw) {
    const context = raw;
    if (atEnd(context))
        return '';
    context.popToken();
    context.consumeSpaces();
    if (context.future().text === '=') {
        context.popToken();
        if (context.future().text === ' ')
            context.popToken();
    }
    if (!atEnd(context))
        context.popToken();
    return '';
}
/** `\futurelet<cs><a><b>`: drop the name; `<a><b>` render as usual. */
function swallowFuturelet(raw) {
    const context = raw;
    if (!atEnd(context))
        context.popToken();
    return '';
}
/**
 * Each inert definition expands to nothing, as the stock `\newcommand` family
 * does in KaTeX. Where the stock engines would have parsed the definition
 * command as a script argument (`x^\notag`, `x_\def\y{}`), the script is
 * then left bare; KaTeX reports that as a parse error, while Temml throws a
 * TypeError on a bare `x^` (stock Temml does the same for a literal `x^`).
 * Callers of Temml therefore keep their own try/catch.
 */
const INERT_DEFINITIONS = {
    '\\def': swallowDef,
    '\\gdef': gdefNumberingStateOnly,
    '\\edef': swallowDef,
    '\\xdef': swallowDef,
    // Prefixes: dropping them leaves the following definition to be swallowed.
    '\\global': '',
    '\\long': '',
    '\\let': swallowLet,
    '\\futurelet': swallowFuturelet,
    '\\newcommand': swallowNewcommand,
    '\\renewcommand': swallowNewcommand,
    '\\providecommand': swallowNewcommand,
};
/**
 * Merge hardened settings into a caller's KaTeX/Temml options.
 *
 * Every other option (`displayMode`, `output`, `throwOnError`, `strict`, ...)
 * is kept. Caller-supplied `macros` are kept too, but cannot override the
 * inert definitions, and are copied into a fresh object so the caller's own
 * object is never written to. A caller may lower `maxExpand`, not raise it.
 * Caller macros are trusted code (see the module note): never pass macros
 * derived from content.
 */
function safeKatexOptions(options) {
    const input = (options ?? {});
    const requested = input.maxExpand;
    return {
        ...input,
        trust: false,
        maxExpand: typeof requested === 'number' && requested >= 0
            ? Math.min(requested, SAFE_MATH_MAX_EXPAND)
            : SAFE_MATH_MAX_EXPAND,
        macros: { ...input.macros, ...INERT_DEFINITIONS },
    };
}
//# sourceMappingURL=math-render.js.map

/***/ }),

/***/ 83253:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ BaseVideoElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ BaseVideoElement auto */ 
function BaseVideoElement({ elementInfo, renderVideo, interactive = true }) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "base-element-video element-content",
        "data-video-element": true,
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`,
            pointerEvents: interactive ? 'auto' : 'none'
        },
        onClick: interactive ? (e)=>e.stopPropagation() : undefined,
        onPointerDown: interactive ? (e)=>e.stopPropagation() : undefined,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: renderVideo ? renderVideo(elementInfo) : elementInfo.src || elementInfo.poster ? // Render <video> when we have either a playable src OR just a
            // poster/preview frame. A PPTX「视频」often has no decodable src in
            // this pipeline but does carry a preview image; rendering
            // <video poster> still shows that frame on the live canvas (instead
            // of falling through to the gray play-icon placeholder — slide 34).
            // Snapshot capture of the poster frame is handled in slideToPng
            // (html2canvas can't draw <video> directly).
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("video", {
                style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                },
                ...elementInfo.src ? {
                    src: elementInfo.src
                } : {},
                poster: elementInfo.poster,
                preload: "metadata",
                controls: !!elementInfo.src,
                playsInline: true
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px'
                },
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                    style: {
                        width: '48px',
                        height: '48px',
                        color: '#9ca3af'
                    },
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polygon", {
                        points: "5 3 19 12 5 21 5 3"
                    })
                })
            })
        })
    });
}
 //# sourceMappingURL=BaseVideoElement.js.map


/***/ }),

/***/ 83478:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RG: () => (/* binding */ createRovingFocusGroupScope),
/* harmony export */   bL: () => (/* binding */ RovingFocusGroup),
/* harmony export */   q7: () => (/* binding */ RovingFocusGroupItem)
/* harmony export */ });
/* unused harmony exports RovingFocusGroup, RovingFocusGroupItem */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(70379);
/* harmony import */ var _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76094);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(89971);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(55897);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17347);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(98979);
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1933);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(66294);
/* harmony import */ var _radix_ui_react_use_is_hydrated__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(59496);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Item,Root,RovingFocusGroup,RovingFocusGroupItem,createRovingFocusGroupScope auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/roving-focus-group.tsx













var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = (0,_radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__/* .createCollection */ .N)(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__/* .createContextScope */ .A)(GROUP_NAME, [
    createCollectionScope
]);
var Orientation = {
    Vertical: "vertical",
    Horizontal: "horizontal"
};
var Direction = {
    LTR: "ltr",
    RTL: "rtl"
};
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function RovingFocusGroup2(props, forwardedRef) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Provider, {
        scope: props.__scopeRovingFocusGroup,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Slot, {
            scope: props.__scopeRovingFocusGroup,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusGroupImpl, {
                ...props,
                ref: forwardedRef
            })
        })
    });
}, "RovingFocusGroup"));
var RovingFocusGroupImpl = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function RovingFocusGroupImpl2(props, forwardedRef) {
    const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, ref);
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__/* .useDirection */ .jH)(dir);
    const [currentTabStopId, setCurrentTabStopId] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__/* .useControllableState */ .i)({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId ?? null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const handleEntryFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__/* .useCallbackRef */ .c)(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const node = ref.current;
        if (node) {
            node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
            return ()=>node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
    }, [
        handleEntryFocus
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusProvider, {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((tabStopId)=>setCurrentTabStopId(tabStopId), [
            setCurrentTabStopId
        ]),
        onItemShiftTab: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setIsTabbingBackOut(true), []),
        onFocusableItemAdd: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount + 1), []),
        onFocusableItemRemove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount - 1), []),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__/* .Primitive */ .sG.div, {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: {
                outline: "none",
                ...props.style
            },
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onMouseDown, ()=>{
                isClickFocusRef.current = true;
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onFocus, (event)=>{
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                    event.currentTarget.dispatchEvent(entryFocusEvent);
                    if (!entryFocusEvent.defaultPrevented) {
                        const items = getItems().filter((item)=>item.focusable);
                        const activeItem = items.find((item)=>item.active);
                        const currentItem = items.find((item)=>item.id === currentTabStopId);
                        const candidateItems = [
                            activeItem,
                            currentItem,
                            ...items
                        ].filter(Boolean);
                        const candidateNodes = candidateItems.map((item)=>item.ref.current);
                        focusFirst(candidateNodes, preventScrollOnEntryFocus);
                    }
                }
                isClickFocusRef.current = false;
            }),
            onBlur: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onBlur, ()=>setIsTabbingBackOut(false))
        })
    });
}, "RovingFocusGroupImpl"));
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(// blank line to reduce diff noise
/* @__PURE__ */ __name(function RovingFocusGroupItem2(props, forwardedRef) {
    const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
    const autoId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__/* .useId */ .B)();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    const isHydrated = (0,_radix_ui_react_use_is_hydrated__WEBPACK_IMPORTED_MODULE_11__/* .useIsHydrated */ .z)();
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_12__/* .useLayoutEffect */ .N)(()=>{
        if (!isHydrated || !focusable) {
            return;
        }
        onFocusableItemAdd();
        return ()=>onFocusableItemRemove();
    }, [
        isHydrated,
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (isHydrated || !focusable) {
            return;
        }
        onFocusableItemAdd();
        return ()=>onFocusableItemRemove();
    }, [
        isHydrated,
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.ItemSlot, {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__/* .Primitive */ .sG.span, {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onMouseDown, (event)=>{
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onFocus, ()=>context.onItemFocus(id)),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onKeyDown, (event)=>{
                if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                    event.preventDefault();
                    const items = getItems().filter((item)=>item.focusable);
                    let candidateNodes = items.map((item)=>item.ref.current);
                    if (focusIntent === "last") candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                        if (focusIntent === "prev") candidateNodes.reverse();
                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                        candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(()=>focusFirst(candidateNodes));
                }
            }),
            children: typeof children === "function" ? children({
                isCurrentTabStop,
                hasTabStop: currentTabStopId != null
            }) : children
        })
    });
}, "RovingFocusGroupItem"));
var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
};
function getDirectionAwareKey(key, dir) {
    if (dir !== Direction.RTL) return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
__name(getDirectionAwareKey, "getDirectionAwareKey");
function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === Orientation.Vertical && [
        "ArrowLeft",
        "ArrowRight"
    ].includes(key)) {
        return void 0;
    }
    if (orientation === Orientation.Horizontal && [
        "ArrowUp",
        "ArrowDown"
    ].includes(key)) {
        return void 0;
    }
    return MAP_KEY_TO_FOCUS_INTENT[key];
}
__name(getFocusIntent, "getFocusIntent");
function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({
            preventScroll
        });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
__name(focusFirst, "focusFirst");
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
__name(wrapArray, "wrapArray");
 //# sourceMappingURL=index.mjs.map


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

/***/ 86835:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UC: () => (/* binding */ AlertDialogContent),
/* harmony export */   VY: () => (/* binding */ AlertDialogDescription),
/* harmony export */   ZD: () => (/* binding */ AlertDialogCancel),
/* harmony export */   ZL: () => (/* binding */ AlertDialogPortal),
/* harmony export */   bL: () => (/* binding */ AlertDialog),
/* harmony export */   hE: () => (/* binding */ AlertDialogTitle),
/* harmony export */   hJ: () => (/* binding */ AlertDialogOverlay),
/* harmony export */   rc: () => (/* binding */ AlertDialogAction)
/* harmony export */ });
/* unused harmony exports AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Trigger, createAlertDialogScope */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68599);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47527);
/* harmony import */ var _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43146);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70379);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Action,AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger,Cancel,Content,Description,Overlay,Portal,Root,Title,Trigger,createAlertDialogScope auto */ var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
// src/alert-dialog.tsx







var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(ROOT_NAME, [
    _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .createDialogScope */ .Hs
]);
var useDialogScope = (0,_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .createDialogScope */ .Hs)();
var AlertDialog = /* @__PURE__ */ __name((props)=>{
    const { __scopeAlertDialog, ...alertDialogProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL, {
        ...dialogScope,
        ...alertDialogProps,
        modal: true
    });
}, "AlertDialog");
var AlertDialogTrigger = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(/* @__PURE__ */ __name(function AlertDialogTrigger2(props, forwardedRef) {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, {
        ...dialogScope,
        ...triggerProps,
        ref: forwardedRef
    });
}, "AlertDialogTrigger"))));
var AlertDialogPortal = /* @__PURE__ */ __name((props)=>{
    const { __scopeAlertDialog, ...portalProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Portal */ .ZL, {
        ...dialogScope,
        ...portalProps
    });
}, "AlertDialogPortal");
var AlertDialogOverlay = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogOverlay2(props, forwardedRef) {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Overlay */ .hJ, {
        ...dialogScope,
        ...overlayProps,
        ref: forwardedRef
    });
}, "AlertDialogOverlay"));
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var AlertDialogContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogContent2(props, forwardedRef) {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, contentRef);
    const cancelRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AlertDialogContentProvider, {
        scope: __scopeAlertDialog,
        cancelRef,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Content */ .UC, {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__/* .composeEventHandlers */ .mK)(contentProps.onOpenAutoFocus, (event)=>{
                event.preventDefault();
                cancelRef.current?.focus({
                    preventScroll: true
                });
            }),
            onPointerDownOutside: (event)=>event.preventDefault(),
            onInteractOutside: (event)=>event.preventDefault(),
            children
        })
    });
}, "AlertDialogContent"));
var AlertDialogTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogTitle2(props, forwardedRef) {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Title */ .hE, {
        ...dialogScope,
        ...titleProps,
        ref: forwardedRef
    });
}, "AlertDialogTitle"));
var AlertDialogDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogDescription2(props, forwardedRef) {
    const { __scopeAlertDialog, ...descriptionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .VY, {
        ...dialogScope,
        ...descriptionProps,
        ref: forwardedRef
    });
}, "AlertDialogDescription"));
var AlertDialogAction = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogAction2(props, forwardedRef) {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Close */ .bm, {
        ...dialogScope,
        ...actionProps,
        ref: forwardedRef
    });
}, "AlertDialogAction"));
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(/* @__PURE__ */ __name(function AlertDialogCancel2(props, forwardedRef) {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, cancelRef);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Close */ .bm, {
        ...dialogScope,
        ...cancelProps,
        ref
    });
}, "AlertDialogCancel"));
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 87060:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ PatternDefs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);


function PatternDefs({ id, src }) {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pattern", { id: id, patternContentUnits: "objectBoundingBox", patternUnits: "objectBoundingBox", width: "1", height: "1", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("image", { href: src, width: "1", height: "1", preserveAspectRatio: "xMidYMid slice" }) }));
}


//# sourceMappingURL=PatternDefs.js.map


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

/***/ 89043:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ ElementOutline)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61478);
/* __next_internal_client_entry_do_not_use__ ElementOutline auto */ 

function ElementOutline({ width, height, outline }) {
    const { outlineWidth, outlineColor, strokeDashArray } = (0,_useElementOutline_js__WEBPACK_IMPORTED_MODULE_1__/* .useElementOutline */ .Y)(outline);
    if (!outline) return null;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        className: "element-outline",
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'visible'
        },
        width: width,
        height: height,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            vectorEffect: "non-scaling-stroke",
            strokeLinecap: "butt",
            strokeMiterlimit: "8",
            fill: "transparent",
            d: `M0,0 L${width},0 L${width},${height} L0,${height} Z`,
            stroke: outlineColor,
            strokeWidth: outlineWidth,
            strokeDasharray: strokeDashArray
        })
    });
}
 //# sourceMappingURL=ElementOutline.js.map


/***/ }),

/***/ 89477:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ getChartOption)
/* harmony export */ });
// ECharts paints pictorial symbols in a square SVG image box. A square wrapper
// with an explicitly stretched inner image preserves Office's stretch fill.
function stretchedPictureSymbol(src) {
    const escaped = src.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><image href="${escaped}" x="0" y="0" width="400" height="400" preserveAspectRatio="none"/></svg>`;
    return `image://data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
const getChartOption = ({ type, data, themeColors, textColor, lineColor, lineSmooth, stack, percentStack, importedStyle, }) => {
    if (!Array.isArray(data?.series) || data.series.length === 0 || !Array.isArray(data.labels)) {
        return null;
    }
    const textStyle = textColor ? { color: textColor } : {};
    const normalize = stack && percentStack && ['bar', 'column', 'line', 'area'].includes(type);
    const totals = normalize
        ? Array.from({ length: Math.max(0, ...data.series.map((values) => values.length)) }, (_, i) => data.series.reduce((sum, values) => sum + Math.abs(values[i] ?? 0), 0))
        : [];
    const plotSeries = normalize
        ? data.series.map((values) => values.map((value, i) => (totals[i] ? value / totals[i] : 0)))
        : data.series;
    const originalValueLabel = (seriesIndex) => normalize
        ? {
            formatter: ({ dataIndex }) => String(data.series[seriesIndex][dataIndex]),
        }
        : {};
    const axisLine = textColor ? { lineStyle: { color: textColor } } : undefined;
    const axisLabel = { show: true, color: textColor ?? '#333333' };
    const splitLine = lineColor ? { lineStyle: { color: lineColor } } : {};
    const categoryAxisLabel = {
        ...axisLabel,
        interval: data.labels.length <= 8 ? 0 : 'auto',
    };
    const legend = data.series.length > 1 ? { top: 'bottom', textStyle } : undefined;
    if (type === 'bar' || type === 'column') {
        const importedSeries = importedStyle?.series ?? [];
        const hasPicture = !stack && importedSeries.some((s) => Object.keys(s.pointImages ?? {}).length > 0);
        const axisOptions = (style, category) => ({
            ...(style?.show !== undefined ? { show: style.show } : {}),
            axisLine: style
                ? {
                    show: style.lineVisible ?? true,
                    lineStyle: { color: style.lineColor ?? textColor ?? '#333333' },
                }
                : axisLine,
            axisLabel: {
                ...(category ? categoryAxisLabel : axisLabel),
                ...(!category && /^0(?:\.0+)?%$/.test(style?.numberFormat ?? '')
                    ? {
                        formatter: (value) => `${(value * 100).toFixed((style?.numberFormat?.split('.')[1]?.split('%')[0] ?? '').length)}%`,
                    }
                    : {}),
                ...(style?.labelVisible !== undefined ? { show: style.labelVisible } : {}),
                ...(style?.labelColor ? { color: style.labelColor } : {}),
                ...(style?.labelFontSize !== undefined ? { fontSize: style.labelFontSize } : {}),
                ...(style?.labelBold !== undefined
                    ? { fontWeight: style.labelBold ? 'bold' : 'normal' }
                    : {}),
            },
            splitLine: style?.gridlines !== undefined
                ? { show: style.gridlines, lineStyle: { color: style.gridlineColor ?? '#e0e6f1' } }
                : category
                    ? undefined
                    : splitLine,
            ...(category
                ? {}
                : {
                    min: style?.min ??
                        (style?.majorUnit && style.majorUnit > 0
                            ? ({ min }) => Math.floor(Math.min(0, min) / style.majorUnit) * style.majorUnit
                            : undefined),
                    max: style?.max ??
                        (style?.majorUnit && style.majorUnit > 0
                            ? ({ max }) => Math.ceil(Math.max(0, max) / style.majorUnit) * style.majorUnit
                            : undefined),
                    interval: style?.majorUnit,
                }),
        });
        const category = {
            type: 'category',
            data: data.labels,
            ...axisOptions(importedStyle?.categoryAxis, true),
        };
        const value = { type: 'value', ...axisOptions(importedStyle?.valueAxis, false) };
        // Picture-filled percent columns use an extra automatic tick above the peak,
        // matching Office's automatic range while honoring explicit scale settings.
        if (hasPicture &&
            value.max === undefined &&
            !importedStyle?.valueAxis?.majorUnit &&
            /^0(?:\.0+)?%$/.test(importedStyle?.valueAxis?.numberFormat ?? '')) {
            value.max = ({ max }) => {
                if (max <= 0)
                    return 0;
                const magnitude = 10 ** Math.floor(Math.log10(max / 6));
                const unit = [1, 2, 5, 10].find((n) => n * magnitude >= max / 6) * magnitude;
                return (Math.floor(max / unit + 1e-9) + 1) * unit;
            };
        }
        const plot = importedStyle?.plotArea;
        return {
            color: themeColors,
            textStyle,
            legend,
            ...(plot
                ? {
                    grid: {
                        left: `${plot.x * 100}%`,
                        top: `${plot.y * 100}%`,
                        width: `${plot.w * 100}%`,
                        height: `${plot.h * 100}%`,
                        containLabel: false,
                    },
                }
                : {}),
            xAxis: type === 'bar' ? category : value,
            yAxis: type === 'bar' ? value : category,
            series: plotSeries.map((item, index) => {
                const style = importedSeries[index];
                // ECharts lays out bar and pictorialBar independently. Keep every
                // unstacked series in the same layout when any point uses a picture;
                // points without images retain a rectangular symbol.
                const picture = !!hasPicture;
                const seriesItem = {
                    data: style || picture
                        ? item.map((n, i) => ({
                            value: n,
                            ...(picture
                                ? {
                                    symbol: style?.pointImages?.[String(i)]
                                        ? stretchedPictureSymbol(style.pointImages[String(i)])
                                        : 'rect',
                                }
                                : {}),
                            itemStyle: {
                                color: style?.pointFills?.[String(i)] ??
                                    style?.fill ??
                                    themeColors[index % themeColors.length],
                            },
                        }))
                        : item,
                    name: data.legends[index],
                    type: picture ? 'pictorialBar' : 'bar',
                    ...(picture
                        ? {
                            symbolSize: ['100%', '100%'],
                            symbolRepeat: false,
                            symbolClip: false,
                            // Override pictorialBar's overlapping/unclipped defaults.
                            barGap: '20%',
                            clip: true,
                        }
                        : {}),
                    label: { show: style?.showValue ?? true, ...originalValueLabel(index) },
                    itemStyle: {
                        borderRadius: importedStyle ? 0 : type === 'bar' ? [2, 2, 0, 0] : [0, 2, 2, 0],
                    },
                };
                // OOXML gapWidth is the gap as a percentage of a bar's width.
                // For a single/stacked series, convert to percentage of a category band.
                if (importedStyle?.gapWidth !== undefined && (data.series.length === 1 || stack)) {
                    const gap = Math.max(0, importedStyle.gapWidth);
                    seriesItem.barCategoryGap = `${(gap / (100 + gap)) * 100}%`;
                }
                if (stack)
                    seriesItem.stack = 'A';
                return seriesItem;
            }),
        };
    }
    if (type === 'line') {
        return {
            color: themeColors,
            textStyle,
            legend,
            xAxis: { type: 'category', data: data.labels, axisLine, axisLabel: categoryAxisLabel },
            yAxis: { type: 'value', axisLine, axisLabel, splitLine },
            series: plotSeries.map((item, index) => {
                const seriesItem = {
                    data: item,
                    name: data.legends[index],
                    type: 'line',
                    smooth: lineSmooth,
                    label: { show: true, ...originalValueLabel(index) },
                };
                if (stack)
                    seriesItem.stack = 'A';
                return seriesItem;
            }),
        };
    }
    if (type === 'pie') {
        const series0 = data.series[0];
        if (!Array.isArray(series0))
            return null;
        return {
            color: themeColors,
            textStyle,
            legend: { top: 'bottom', textStyle },
            series: [
                {
                    data: series0.map((item, index) => ({ value: item, name: data.labels[index] })),
                    label: textColor ? { color: textColor } : {},
                    type: 'pie',
                    radius: '70%',
                    emphasis: {
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
                        label: { show: true, fontSize: 14, fontWeight: 'bold' },
                    },
                },
            ],
        };
    }
    if (type === 'ring') {
        const series0 = data.series[0];
        if (!Array.isArray(series0))
            return null;
        return {
            color: themeColors,
            textStyle,
            legend: { top: 'bottom', textStyle },
            series: [
                {
                    data: series0.map((item, index) => ({ value: item, name: data.labels[index] })),
                    label: textColor ? { color: textColor } : {},
                    type: 'pie',
                    radius: ['40%', '70%'],
                    padAngle: 1,
                    avoidLabelOverlap: false,
                    itemStyle: { borderRadius: 4 },
                    emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
                },
            ],
        };
    }
    if (type === 'area') {
        return {
            color: themeColors,
            textStyle,
            legend,
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.labels,
                axisLine,
                axisLabel: categoryAxisLabel,
            },
            yAxis: { type: 'value', axisLine, axisLabel, splitLine },
            series: plotSeries.map((item, index) => {
                const seriesItem = {
                    data: item,
                    name: data.legends[index],
                    type: 'line',
                    areaStyle: {},
                    label: { show: true, ...originalValueLabel(index) },
                };
                if (stack)
                    seriesItem.stack = 'A';
                return seriesItem;
            }),
        };
    }
    if (type === 'radar') {
        return {
            color: themeColors,
            textStyle,
            legend,
            radar: {
                indicator: data.labels.map((item) => ({ name: item })),
                splitLine,
                axisLine: lineColor ? { lineStyle: { color: lineColor } } : undefined,
            },
            series: [
                {
                    data: data.series.map((item, index) => ({ value: item, name: data.legends[index] })),
                    type: 'radar',
                },
            ],
        };
    }
    if (type === 'scatter') {
        const series0 = data.series[0];
        if (!Array.isArray(series0))
            return null;
        const formatedData = [];
        for (let i = 0; i < series0.length; i++) {
            const x = series0[i];
            const y = data.series[1]?.[i] ?? x;
            formatedData.push([x, y]);
        }
        return {
            color: themeColors,
            textStyle,
            xAxis: { axisLine, axisLabel, splitLine },
            yAxis: { axisLine, axisLabel, splitLine },
            series: [{ symbolSize: 12, data: formatedData, type: 'scatter' }],
        };
    }
    return null;
};


//# sourceMappingURL=chartOption.js.map


/***/ }),

/***/ 89548:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ loadChartRuntime)
/* harmony export */ });
let runtimePromise;
/**
 * Load and register the small ECharts surface used by chart elements.
 *
 * Keeping this behind a shared promise is important for two reasons: charts
 * remain optional for consumers that only render text/images, and multiple
 * charts on one slide do not race to register the same ECharts extensions.
 */
function loadChartRuntime() {
    runtimePromise ??= Promise.all([
        Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(56617), __webpack_require__.e(74881), __webpack_require__.e(72463), __webpack_require__.e(6323)]).then(__webpack_require__.bind(__webpack_require__, 6323)),
        Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(56617), __webpack_require__.e(74881), __webpack_require__.e(54864), __webpack_require__.e(72463), __webpack_require__.e(64961)]).then(__webpack_require__.bind(__webpack_require__, 64961)),
        Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(56617), __webpack_require__.e(74881), __webpack_require__.e(54864), __webpack_require__.e(87092)]).then(__webpack_require__.bind(__webpack_require__, 64711)),
        Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(56617), __webpack_require__.e(64748)]).then(__webpack_require__.bind(__webpack_require__, 64748)),
    ]).then(([echarts, charts, components, renderers]) => {
        echarts.use([
            charts.BarChart,
            charts.PictorialBarChart,
            charts.LineChart,
            charts.PieChart,
            charts.ScatterChart,
            charts.RadarChart,
            components.LegendComponent,
            renderers.SVGRenderer,
        ]);
        return echarts;
    });
    return runtimePromise;
}


//# sourceMappingURL=chartRuntime.js.map


/***/ }),

/***/ 90057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ locationCouldBeScrolled),
/* harmony export */   Q: () => (/* binding */ handleScroll)
/* harmony export */ });
var alwaysContainsScroll = function (node) {
    // textarea will always _contain_ scroll inside self. It only can be hidden
    return node.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function (node, overflow) {
    if (!(node instanceof Element)) {
        return false;
    }
    var styles = window.getComputedStyle(node);
    return (
    // not-not-scrollable
    styles[overflow] !== 'hidden' &&
        // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === 'visible'));
};
var elementCouldBeVScrolled = function (node) { return elementCanBeScrolled(node, 'overflowY'); };
var elementCouldBeHScrolled = function (node) { return elementCanBeScrolled(node, 'overflowX'); };
var locationCouldBeScrolled = function (axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
        // Skip over shadow root
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
            current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
            var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
            if (scrollHeight > clientHeight) {
                return true;
            }
        }
        current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
};
var getVScrollVariables = function (_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
        scrollTop,
        scrollHeight,
        clientHeight,
    ];
};
var getHScrollVariables = function (_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
        scrollLeft,
        scrollWidth,
        clientWidth,
    ];
};
var elementCouldBeScrolled = function (axis, node) {
    return axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
    return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function (axis, direction) {
    /**
     * If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
     * and then increasingly negative as you scroll towards the end of the content.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
     */
    return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function (axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    // find scrollable target
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
        if (!target) {
            break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
            if (elementCouldBeScrolled(axis, target)) {
                availableScroll += elementScroll;
                availableScrollTop += position;
            }
        }
        var parent_1 = target.parentNode;
        // we will "bubble" from ShadowDom in case we are, or just to the parent in normal case
        // this is the same logic used in focus-lock
        target = (parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1);
    } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
        // self content
        (targetInLock && (endTarget.contains(target) || endTarget === target)));
    // handle epsilon around 0 (non standard zoom levels)
    if (isDeltaPositive &&
        ((noOverscroll && Math.abs(availableScroll) < 1) || (!noOverscroll && delta > availableScroll))) {
        shouldCancelScroll = true;
    }
    else if (!isDeltaPositive &&
        ((noOverscroll && Math.abs(availableScrollTop) < 1) || (!noOverscroll && -delta > availableScrollTop))) {
        shouldCancelScroll = true;
    }
    return shouldCancelScroll;
};


/***/ }),

/***/ 93024:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ REMOVE_COLLINEAR)
/* harmony export */ });
/* harmony import */ var _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60292);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79577);
/* harmony import */ var _mathUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23422);



/**
 * Process a path and remove collinear points
 * @param commands Array of SVG path commands to process (must be absolute)
 * @returns New array with collinear points removed
 */
function REMOVE_COLLINEAR(commands) {
    if (commands.length <= 2)
        return commands; // exit early if there are less than 3 points
    const results = [];
    const points = commands.map(_index_js__WEBPACK_IMPORTED_MODULE_1__/* .SVGPathDataTransformer */ .zb.INFO((cmd, pXAbs, pYAbs) => {
        // Calculate absolute coordinates and normlise HV
        const isRelatve = 'relative' in cmd && cmd.relative;
        return [
            'x' in cmd ? cmd.x + (isRelatve ? pXAbs : 0) : pXAbs,
            'y' in cmd ? cmd.y + (isRelatve ? pYAbs : 0) : pYAbs,
        ];
    }));
    let prevPoint = points[0];
    results.push(commands[0]); // always keep the first point
    for (let i = 1; i < commands.length; i++) {
        const cmd = commands[i];
        const nextCmd = commands[i + 1];
        if (i < commands.length - 1 &&
            nextCmd &&
            cmd.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_COMMANDS &&
            nextCmd.type & _SVGPathData_js__WEBPACK_IMPORTED_MODULE_0__/* .SVGPathData */ .L.LINE_COMMANDS) {
            const nextPoint = points[i + 1];
            // Check triplets of points for collinearity
            if ((0,_mathUtils_js__WEBPACK_IMPORTED_MODULE_2__/* .arePointsCollinear */ .vR)(prevPoint, points[i], nextPoint)) {
                // update next point if its relative
                if ('relative' in nextCmd && nextCmd.relative) {
                    if ('x' in nextCmd)
                        nextCmd.x = nextPoint[0] - prevPoint[0];
                    if ('y' in nextCmd)
                        nextCmd.y = nextPoint[1] - prevPoint[1];
                }
                continue;
            }
        }
        results.push(cmd);
        prevPoint = points[i];
    }
    return results;
}
//# sourceMappingURL=remove_collinear.js.map

/***/ }),

/***/ 93714:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n){return{all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e])},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]))},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e)}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e)})}}}
//# sourceMappingURL=mitt.mjs.map


/***/ }),

/***/ 94180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44276);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 


const createLucideIcon = (iconName, iconNode)=>{
    const Component = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, {
            ref,
            iconNode,
            className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .mergeClasses */ .zP)(`lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .toKebabCase */ .fX)((0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .toPascalCase */ .MX)(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .toPascalCase */ .MX)(iconName);
    return Component;
};
 //# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ 94195:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ BaseCodeElement)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15696);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78235);
/* __next_internal_client_entry_do_not_use__ BaseCodeElement auto */ 


// ==================== Shiki Singleton ====================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let highlighterPromise = null;
function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(57083), __webpack_require__.e(77436)]).then(__webpack_require__.bind(__webpack_require__, 55055)).then(({ createHighlighter })=>createHighlighter({
                themes: [
                    'github-light'
                ],
                langs: [
                    'python',
                    'javascript',
                    'typescript',
                    'json',
                    'go',
                    'rust',
                    'java',
                    'c',
                    'cpp',
                    'html',
                    'css',
                    'bash',
                    'sql',
                    'yaml',
                    'markdown',
                    'jsx',
                    'tsx'
                ]
            }));
    }
    return highlighterPromise;
}
// ==================== Helpers ====================
function parseShikiLines(html) {
    const codeMatch = html.match(/<code>([\s\S]*?)<\/code>/);
    if (!codeMatch) return [];
    const parts = codeMatch[1].split('<span class="line">');
    const lines = [];
    for (const part of parts){
        if (!part) continue;
        const endIdx = part.lastIndexOf('</span>');
        if (endIdx !== -1) {
            lines.push(part.substring(0, endIdx));
        }
    }
    return lines;
}
// ==================== Typing Easing ====================
const STUTTER_COUNT = 5;
const STUTTER_AMOUNT = 0.04;
const LINE_GAP_MS = 120;
const TAB_SIZE = 4;
function visualLength(s) {
    let len = 0;
    for (const ch of s){
        len += ch === '\t' ? TAB_SIZE : 1;
    }
    return len;
}
function getTypingCharCount(content) {
    const trimmed = content.replace(/^[\t ]+/, '');
    return trimmed.length;
}
function computeRevealSteps(content) {
    const total = visualLength(content);
    if (total === 0) return [
        1
    ];
    const trimmed = content.replace(/^[\t ]+/, '');
    const indentPart = content.slice(0, content.length - trimmed.length);
    let cumVisual = 0;
    for (const ch of indentPart){
        cumVisual += ch === '\t' ? TAB_SIZE : 1;
    }
    const steps = [
        cumVisual / total
    ];
    for (const ch of trimmed){
        cumVisual += ch === '\t' ? TAB_SIZE : 1;
        steps.push(cumVisual / total);
    }
    return steps;
}
function humanTypingEase(t) {
    const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
    const stutter = Math.sin(t * Math.PI * STUTTER_COUNT) * STUTTER_AMOUNT * 4 * t * (1 - t);
    return Math.min(Math.max(eased + stutter, 0), 1);
}
// ==================== TypingReveal ====================
function TypingReveal({ html, durationMs, revealSteps, onComplete }) {
    const typingUnitCount = revealSteps.length - 1;
    const [revealPct, setRevealPct] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(revealSteps[0]);
    const rafRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const startRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typingUnitCount <= 0) {
            const t = setTimeout(()=>{
                setRevealPct(1);
                onComplete();
            }, 0);
            return ()=>clearTimeout(t);
        }
        startRef.current = performance.now();
        const tick = (now)=>{
            const elapsed = now - startRef.current;
            const linearT = Math.min(elapsed / durationMs, 1);
            const easedProgress = humanTypingEase(linearT);
            const stepIdx = Math.min(Math.floor(easedProgress * (typingUnitCount + 1)), typingUnitCount);
            setRevealPct(revealSteps[stepIdx]);
            if (linearT < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setRevealPct(1);
                onComplete();
            }
        };
        rafRef.current = requestAnimationFrame(tick);
        return ()=>cancelAnimationFrame(rafRef.current);
    }, [
        durationMs,
        typingUnitCount,
        revealSteps,
        onComplete
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        style: {
            position: 'relative',
            display: 'inline-block'
        },
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                style: {
                    clipPath: `inset(0 ${(1 - revealPct) * 100}% 0 0)`
                },
                dangerouslySetInnerHTML: {
                    __html: html
                }
            }),
            revealPct < 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                style: {
                    position: 'absolute',
                    top: 0,
                    width: '2px',
                    backgroundColor: '#1f2937',
                    left: `${revealPct * 100}%`,
                    height: '1.1em',
                    animation: 'slide-renderer-code-cursor-blink 0.6s step-end infinite'
                }
            })
        ]
    });
}
// ==================== CodeLineRow ====================
function getTypingDuration(content) {
    return Math.max(getTypingCharCount(content) * 40, 250);
}
const REPLACE_SELECT_MS = 350;
function CodeLineRow({ line, lineNumber, highlightedHtml, showLineNumbers, animState, animate, typingDelay }) {
    const isNewLine = animate && !!animState && animState.type !== 'replaced';
    const isReplace = animate && animState?.type === 'replaced';
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!isNewLine || typingDelay === 0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isNewLine && typingDelay > 0) {
            const timer = setTimeout(()=>setMounted(true), typingDelay);
            return ()=>clearTimeout(timer);
        }
    }, [
        isNewLine,
        typingDelay
    ]);
    const [typing, setTyping] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isNewLine && typingDelay === 0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (mounted && isNewLine) {
            const t = setTimeout(()=>setTyping(true), 0);
            return ()=>clearTimeout(t);
        }
    }, [
        mounted,
        isNewLine
    ]);
    const handleTypingComplete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setTyping(false);
    }, []);
    const prevHtmlRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(highlightedHtml);
    const [replacePhase, setReplacePhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [oldHtml, setOldHtml] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isReplace && prevHtmlRef.current !== highlightedHtml) {
            setOldHtml(prevHtmlRef.current);
            setReplacePhase('select');
            const timer = setTimeout(()=>{
                setReplacePhase('type');
                setTyping(true);
                setOldHtml(null);
                prevHtmlRef.current = highlightedHtml;
            }, REPLACE_SELECT_MS);
            return ()=>clearTimeout(timer);
        }
        prevHtmlRef.current = highlightedHtml;
    }, [
        isReplace,
        highlightedHtml
    ]);
    const [highlight, setHighlight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        if (!animState) return null;
        if (animState.type === 'inserted') return 'rgba(34, 197, 94, 0.12)';
        return null;
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (animState?.type === 'inserted') {
            const t = setTimeout(()=>setHighlight('rgba(34, 197, 94, 0.12)'), 0);
            return ()=>clearTimeout(t);
        }
    }, [
        animState
    ]);
    const [highlightFading, setHighlightFading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!highlight || highlightFading || typing) return;
        const fadeTimer = setTimeout(()=>setHighlightFading(true), 0);
        const clearTimer = setTimeout(()=>{
            setHighlight(null);
            setHighlightFading(false);
        }, 2000);
        return ()=>{
            clearTimeout(fadeTimer);
            clearTimeout(clearTimer);
        };
    }, [
        highlight,
        typing,
        highlightFading
    ]);
    const typingDuration = getTypingDuration(line.content);
    const revealSteps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>computeRevealSteps(line.content), [
        line.content
    ]);
    if (!mounted) return null;
    let bgColor = highlight || 'transparent';
    if (replacePhase === 'select') bgColor = 'rgba(59, 130, 246, 0.18)';
    let contentNode;
    if (replacePhase === 'select' && oldHtml) {
        contentNode = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            dangerouslySetInnerHTML: {
                __html: oldHtml
            }
        });
    } else if (typing) {
        contentNode = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TypingReveal, {
            html: highlightedHtml,
            durationMs: typingDuration,
            revealSteps: revealSteps,
            onComplete: handleTypingComplete
        });
    } else {
        contentNode = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            dangerouslySetInnerHTML: {
                __html: highlightedHtml
            }
        });
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_2__/* .motion */ .PY1.div, {
        initial: isNewLine ? {
            opacity: 0,
            height: 0
        } : false,
        animate: {
            opacity: 1,
            height: 'auto',
            backgroundColor: bgColor,
            transition: {
                duration: 0.3,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ],
                backgroundColor: {
                    duration: 0.4
                }
            }
        },
        exit: {
            backgroundColor: 'rgba(59, 130, 246, 0.18)',
            height: 0,
            opacity: 0,
            transition: {
                backgroundColor: {
                    duration: 0
                },
                height: {
                    duration: 0,
                    delay: 0.3
                },
                opacity: {
                    duration: 0,
                    delay: 0.3
                }
            }
        },
        style: {
            display: 'flex',
            lineHeight: 1.6,
            fontSize: 'inherit',
            overflow: 'hidden'
        },
        children: [
            showLineNumbers && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                style: {
                    flexShrink: 0,
                    textAlign: 'right',
                    paddingRight: '16px',
                    paddingLeft: '8px',
                    width: '3.5em',
                    color: '#9ca3af',
                    userSelect: 'none'
                },
                children: lineNumber
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                style: {
                    flex: 1,
                    paddingRight: '16px',
                    whiteSpace: 'pre',
                    tabSize: 4
                },
                children: contentNode
            })
        ]
    });
}
// ==================== BaseCodeElement ====================
function BaseCodeElement({ elementInfo, animate }) {
    const { language, lines, fileName, showLineNumbers = true, fontSize = 14 } = elementInfo;
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const codeBodyRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = codeBodyRef.current;
        if (!el) return;
        let dragging = false;
        let startX = 0;
        let startY = 0;
        let startScrollLeft = 0;
        let startScrollTop = 0;
        let activePointer = null;
        const endDrag = ()=>{
            if (activePointer !== null && el.hasPointerCapture(activePointer)) {
                el.releasePointerCapture(activePointer);
            }
            dragging = false;
            activePointer = null;
            el.style.cursor = 'grab';
        };
        const onPointerDown = (e)=>{
            if (e.button !== 0) return;
            dragging = true;
            activePointer = e.pointerId;
            startX = e.clientX;
            startY = e.clientY;
            startScrollLeft = el.scrollLeft;
            startScrollTop = el.scrollTop;
            el.setPointerCapture(e.pointerId);
            el.style.cursor = 'grabbing';
        };
        const onPointerMove = (e)=>{
            if (!dragging || e.pointerId !== activePointer) return;
            el.scrollLeft = startScrollLeft - (e.clientX - startX);
            el.scrollTop = startScrollTop - (e.clientY - startY);
        };
        const onPointerEnd = (e)=>{
            if (e.pointerId !== activePointer) return;
            endDrag();
        };
        const onLostCapture = ()=>{
            endDrag();
        };
        const onWheel = (e)=>{
            e.stopPropagation();
        };
        el.style.cursor = 'grab';
        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', onPointerEnd);
        el.addEventListener('pointercancel', onPointerEnd);
        el.addEventListener('lostpointercapture', onLostCapture);
        el.addEventListener('wheel', onWheel, {
            passive: true
        });
        return ()=>{
            endDrag();
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerup', onPointerEnd);
            el.removeEventListener('pointercancel', onPointerEnd);
            el.removeEventListener('lostpointercapture', onLostCapture);
            el.removeEventListener('wheel', onWheel);
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = wrapperRef.current;
        if (!el) return;
        const stopWheelOutsideBody = (e)=>{
            const body = codeBodyRef.current;
            if (body && body.contains(e.target)) return;
            e.stopPropagation();
        };
        el.addEventListener('wheel', stopWheelOutsideBody);
        return ()=>el.removeEventListener('wheel', stopWheelOutsideBody);
    }, []);
    const stopPointer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.stopPropagation();
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [highlighter, setHighlighter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const prevLinesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const isFirstRenderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    const [animStates, setAnimStates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>new Map());
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const states = new Map();
        if (animate) {
            if (isFirstRenderRef.current) {
                isFirstRenderRef.current = false;
                lines.forEach((line, i)=>{
                    states.set(line.id, {
                        type: 'typing',
                        timestamp: i * 80
                    });
                });
            } else {
                const prevById = new Map(prevLinesRef.current.map((l)=>[
                        l.id,
                        l
                    ]));
                for (const line of lines){
                    const prev = prevById.get(line.id);
                    if (!prev) {
                        states.set(line.id, {
                            type: 'inserted',
                            timestamp: 0
                        });
                    } else if (prev.content !== line.content) {
                        states.set(line.id, {
                            type: 'replaced',
                            timestamp: 0
                        });
                    }
                }
            }
            prevLinesRef.current = lines;
        }
        const t = setTimeout(()=>setAnimStates(states), 0);
        return ()=>clearTimeout(t);
    }, [
        lines,
        animate
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getHighlighter().then(setHighlighter);
    }, []);
    const highlightedLines = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!highlighter) return null;
        const code = lines.map((l)=>l.content).join('\n');
        let lang = language;
        try {
            highlighter.getLoadedLanguages();
        } catch  {
            lang = 'text';
        }
        try {
            const html = highlighter.codeToHtml(code, {
                lang,
                theme: 'github-light'
            });
            const parsed = parseShikiLines(html);
            return lines.map((line, i)=>({
                    id: line.id,
                    html: parsed[i] || escapeHtml(line.content)
                }));
        } catch  {
            return lines.map((line)=>({
                    id: line.id,
                    html: escapeHtml(line.content)
                }));
        }
    }, [
        highlighter,
        lines,
        language
    ]);
    const fallbackLines = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return lines.map((line)=>({
                id: line.id,
                html: escapeHtml(line.content)
            }));
    }, [
        lines
    ]);
    const lineHtmlMap = highlightedLines || fallbackLines;
    const typingDelays = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const delays = new Map();
        let cumulative = 0;
        for (const line of lines){
            if (animStates.has(line.id)) {
                delays.set(line.id, cumulative);
                cumulative += getTypingDuration(line.content) + LINE_GAP_MS;
            }
        }
        return delays;
    }, [
        lines,
        animStates
    ]);
    const langDisplay = LANG_DISPLAY_NAMES[language] || language;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: wrapperRef,
        className: "base-element-code",
        style: {
            position: 'absolute',
            top: `${elementInfo.top}px`,
            left: `${elementInfo.left}px`,
            width: `${elementInfo.width}px`,
            height: `${elementInfo.height}px`
        },
        onPointerDown: stopPointer,
        onClick: stopPointer,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rotate-wrapper",
            style: {
                width: '100%',
                height: '100%',
                transform: `rotate(${elementInfo.rotate}deg)`
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "element-content",
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: '#fafbfc',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
                    fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", ui-monospace, SFMono-Regular, "Liberation Mono", Menlo, Monaco, Consolas, monospace',
                    fontSize: `${fontSize}px`
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            height: '32px',
                            background: '#f8f9fa',
                            borderBottom: '1px solid #e5e7eb'
                        },
                        children: [
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                },
                                children: [
                                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '6px'
                                        },
                                        children: [
                                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '9999px',
                                                    background: '#ff5f57'
                                                }
                                            }),
                                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '9999px',
                                                    background: '#febc2e'
                                                }
                                            }),
                                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '9999px',
                                                    background: '#28c840'
                                                }
                                            })
                                        ]
                                    }),
                                    fileName && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            marginLeft: '8px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            color: '#6b7280',
                                            fontSize: '11px',
                                            letterSpacing: '0.01em'
                                        },
                                        children: fileName
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    color: '#9ca3af',
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 500
                                },
                                children: langDisplay
                            })
                        ]
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        ref: codeBodyRef,
                        style: {
                            flex: 1,
                            overflow: 'auto',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            background: '#fafbfc',
                            color: '#24292e',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            touchAction: 'none'
                        },
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                minWidth: 'max-content'
                            },
                            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .AnimatePresence */ .N, {
                                initial: false,
                                mode: "popLayout",
                                children: lineHtmlMap.map((lineData, index)=>{
                                    const line = lines[index];
                                    if (!line) return null;
                                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CodeLineRow, {
                                        line: line,
                                        lineNumber: index + 1,
                                        highlightedHtml: lineData.html,
                                        showLineNumbers: showLineNumbers,
                                        animState: animStates.get(line.id),
                                        animate: !!animate,
                                        typingDelay: typingDelays.get(line.id) ?? 0
                                    }, line.id);
                                })
                            })
                        })
                    })
                ]
            })
        })
    });
}
// ==================== Utilities ====================
function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const LANG_DISPLAY_NAMES = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    json: 'JSON',
    go: 'Go',
    rust: 'Rust',
    java: 'Java',
    c: 'C',
    cpp: 'C++',
    html: 'HTML',
    css: 'CSS',
    bash: 'Bash',
    sql: 'SQL',
    yaml: 'YAML',
    markdown: 'Markdown',
    jsx: 'JSX',
    tsx: 'TSX'
};
 //# sourceMappingURL=BaseCodeElement.js.map


/***/ }),

/***/ 94622:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ createSidecarMedium)
/* harmony export */ });
/* unused harmony export createMedium */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61672);

function ItoI(a) {
    return a;
}
function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    var buffer = [];
    var assigned = false;
    var medium = {
        read: function () {
            if (assigned) {
                throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
            }
            if (buffer.length) {
                return buffer[buffer.length - 1];
            }
            return defaults;
        },
        useMedium: function (data) {
            var item = middleware(data, assigned);
            buffer.push(item);
            return function () {
                buffer = buffer.filter(function (x) { return x !== item; });
            };
        },
        assignSyncMedium: function (cb) {
            assigned = true;
            while (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
            }
            buffer = {
                push: function (x) { return cb(x); },
                filter: function () { return buffer; },
            };
        },
        assignMedium: function (cb) {
            assigned = true;
            var pendingQueue = [];
            if (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
                pendingQueue = buffer;
            }
            var executeQueue = function () {
                var cbs = pendingQueue;
                pendingQueue = [];
                cbs.forEach(cb);
            };
            var cycle = function () { return Promise.resolve().then(executeQueue); };
            cycle();
            buffer = {
                push: function (x) {
                    pendingQueue.push(x);
                    cycle();
                },
                filter: function (filter) {
                    pendingQueue = pendingQueue.filter(filter);
                    return buffer;
                },
            };
        },
    };
    return medium;
}
function createMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    return innerCreateMedium(defaults, middleware);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function createSidecarMedium(options) {
    if (options === void 0) { options = {}; }
    var medium = innerCreateMedium(null);
    medium.options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__assign */ .Cl)({ async: true, ssr: false }, options);
    return medium;
}


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

/***/ 94910:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Route)
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
    name: "route",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "6",
                cy: "19",
                r: "3",
                key: "1kj8tv"
            }
        ],
        [
            "path",
            {
                d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
                key: "1d8sl"
            }
        ],
        [
            "circle",
            {
                cx: "18",
                cy: "5",
                r: "3",
                key: "gq8acd"
            }
        ]
    ]
};
__iconData.node;
const Route = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=route.mjs.map


/***/ }),

/***/ 97181:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ htmlDecodeTree)
/* harmony export */ });
// Generated using scripts/write-decode-map.ts
const htmlDecodeTree = /* #__PURE__ */ new Uint16Array(
// prettier-ignore
/* #__PURE__ */ "\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map((c) => c.charCodeAt(0)));
//# sourceMappingURL=decode-data-html.js.map

/***/ }),

/***/ 97828:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gz: () => (/* binding */ decodeHTML)
/* harmony export */ });
/* unused harmony exports BinTrieFlags, DecodingMode, EntityDecoder, determineBranch, decodeHTMLAttribute, decodeHTMLStrict, decodeXML */
/* harmony import */ var _generated_decode_data_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97181);
/* harmony import */ var _generated_decode_data_xml_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11245);
/* harmony import */ var _decode_codepoint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39700);



var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 32;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
class EntityDecoder {
    constructor(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(input, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (input.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(input, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(input, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(input, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(input, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(input, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(input, offset);
            }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(input, offset) {
        if (offset >= input.length) {
            return -1;
        }
        if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(input, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(input, offset);
    }
    addToNumericResult(input, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    Number.parseInt(input.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(input, offset) {
        const startIndex = offset;
        while (offset < input.length) {
            const char = input.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(input, startIndex, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(input, startIndex, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(input, offset) {
        const startIndex = offset;
        while (offset < input.length) {
            const char = input.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(input, startIndex, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(input, startIndex, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint((0,_decode_codepoint_js__WEBPACK_IMPORTED_MODULE_2__/* .replaceCodePoint */ .y6)(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(input, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < input.length; offset++, this.excess++) {
            const char = input.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    }
}
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    let returnValue = "";
    const decoder = new EntityDecoder(decodeTree, (data) => (returnValue += (0,_decode_codepoint_js__WEBPACK_IMPORTED_MODULE_2__/* .fromCodePoint */ .MK)(data)));
    return function decodeWithTrie(input, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while ((offset = input.indexOf("&", offset)) >= 0) {
            returnValue += input.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const length = decoder.write(input, 
            // Skip the "&"
            offset + 1);
            if (length < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + length;
            // If `length` is 0, skip the current `&` and continue.
            offset = length === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = returnValue + input.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        returnValue = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIndex, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIndex + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIndex;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const midValue = decodeTree[mid];
        if (midValue < char) {
            lo = mid + 1;
        }
        else if (midValue > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
const htmlDecoder = /* #__PURE__ */ getDecoder(_generated_decode_data_html_js__WEBPACK_IMPORTED_MODULE_0__/* .htmlDecodeTree */ .q);
const xmlDecoder = /* #__PURE__ */ (/* unused pure expression or super */ null && (getDecoder(xmlDecodeTree)));
/**
 * Decodes an HTML string.
 *
 * @param htmlString The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(htmlString, mode = DecodingMode.Legacy) {
    return htmlDecoder(htmlString, mode);
}
/**
 * Decodes an HTML string in an attribute.
 *
 * @param htmlAttribute The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLAttribute(htmlAttribute) {
    return htmlDecoder(htmlAttribute, DecodingMode.Attribute);
}
/**
 * Decodes an HTML string, requiring all entities to be terminated by a semicolon.
 *
 * @param htmlString The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLStrict(htmlString) {
    return htmlDecoder(htmlString, DecodingMode.Strict);
}
/**
 * Decodes an XML string, requiring all entities to be terminated by a semicolon.
 *
 * @param xmlString The string to decode.
 * @returns The decoded string.
 */
function decodeXML(xmlString) {
    return xmlDecoder(xmlString, DecodingMode.Strict);
}
// Re-export for use by eg. htmlparser2



//# sourceMappingURL=decode.js.map

/***/ }),

/***/ 98082:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ SlideCanvas)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(78235);
/* harmony import */ var _utils_geometry_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4667);
/* harmony import */ var _hooks_useSlideBackgroundStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10641);
/* harmony import */ var _hooks_useViewportSize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35820);
/* harmony import */ var _SlideElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40342);
/* harmony import */ var _effects_HighlightOverlay_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40082);
/* harmony import */ var _effects_SpotlightOverlay_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13926);
/* harmony import */ var _effects_LaserOverlay_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49791);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(34160);
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(36803);
/* harmony import */ var _utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18180);
/* __next_internal_client_entry_do_not_use__ SlideCanvas auto */ 












function SlideCanvas(props) {
    const ctx = (0,_context_js__WEBPACK_IMPORTED_MODULE_8__/* .useOptionalSlideContext */ .cN)();
    const slide = props.slide ?? ctx?.slide;
    if (!slide) {
        throw new Error('<SlideCanvas> requires `slide` either as a prop or via <SlideRendererProvider>.');
    }
    const scale = props.scale ?? ctx?.scale;
    const background = props.background ?? ctx?.background;
    const effects = props.effects ?? ctx?.effects;
    const renderImage = props.renderImage ?? ctx?.renderImage;
    const renderVideo = props.renderVideo ?? ctx?.renderVideo;
    const renderText = props.renderText;
    const renderShapeLabel = props.renderShapeLabel;
    const renderTable = props.renderTable;
    const videoInteractive = props.videoInteractive ?? ctx?.videoInteractive;
    const onElementClick = props.onElementClick ?? ctx?.onElementClick;
    const elementIdPrefix = props.elementIdPrefix ?? 'slide-element-';
    const { className, dragOffsets, style } = props;
    const chrome = props.chrome ?? true;
    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const elements = slide.elements;
    const visibleElements = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!props.hiddenElementIds?.length) return elements;
        const hidden = new Set(props.hiddenElementIds);
        return elements.filter((element)=>!hidden.has(element.id));
    }, [
        elements,
        props.hiddenElementIds
    ]);
    const elementIndexById = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>new Map(elements.map((element, index)=>[
                element.id,
                index + 1
            ])), [
        elements
    ]);
    const { viewportStyles, fitScale } = (0,_hooks_useViewportSize_js__WEBPACK_IMPORTED_MODULE_3__/* .useViewportSize */ .l)(canvasRef, {
        viewportSize: slide.viewportSize,
        viewportRatio: slide.viewportRatio,
        canvasPercentage: props.canvasPercentage,
        onScaleChange: scale === undefined ? props.onScaleChange : undefined
    });
    const canvasScale = scale ?? fitScale;
    const resolvedBackground = background ?? slide.background;
    const { backgroundStyle } = (0,_hooks_useSlideBackgroundStyle_js__WEBPACK_IMPORTED_MODULE_2__/* .useSlideBackgroundStyle */ .y)(resolvedBackground);
    // Plain derivations: when this package is consumed in a React Compiler build
    // these are auto-memoized; otherwise the cost (O(elements) lookups) is trivial.
    const laserGeometry = effects?.laser ? (0,_utils_geometry_js__WEBPACK_IMPORTED_MODULE_10__/* .findElementGeometry */ .aJ)(visibleElements, effects.laser.elementId, slide.viewportSize, slide.viewportRatio) : null;
    const zoomGeometry = effects?.zoom ? (0,_utils_geometry_js__WEBPACK_IMPORTED_MODULE_10__/* .findElementGeometry */ .aJ)(visibleElements, effects.zoom.elementId, slide.viewportSize, slide.viewportRatio) : null;
    const highlights = effects?.highlights ?? (effects?.highlight ? [
        effects.highlight
    ] : []);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: canvasRef,
        className: className,
        style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            ...style
        },
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: _styles_js__WEBPACK_IMPORTED_MODULE_11__/* .SLIDE_RENDERER_STYLES */ .t
                }
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    position: 'absolute',
                    ...chrome ? {
                        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.01), 0 0 12px 0 rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.5rem'
                    } : {},
                    overflow: 'hidden',
                    transitionProperty: 'transform',
                    transitionDuration: '700ms',
                    width: `${viewportStyles.width * canvasScale}px`,
                    height: `${viewportStyles.height * canvasScale}px`,
                    left: `${viewportStyles.left}px`,
                    top: `${viewportStyles.top}px`,
                    ...effects?.zoom && zoomGeometry ? {
                        transform: `scale(${effects.zoom.scale})`,
                        transformOrigin: `${zoomGeometry.centerX}% ${zoomGeometry.centerY}%`
                    } : {}
                },
                children: [
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            width: '100%',
                            height: '100%',
                            backgroundPosition: 'center',
                            ...chrome ? {
                                borderRadius: '0.5rem'
                            } : {},
                            ...backgroundStyle
                        }
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transformOrigin: 'top left',
                            width: `${viewportStyles.width}px`,
                            height: `${viewportStyles.height}px`,
                            transform: `scale(${canvasScale})`
                        },
                        children: [
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_utils_inlineMath_js__WEBPACK_IMPORTED_MODULE_9__/* .InlineMathPriorityContext */ .Jy.Provider, {
                                value: props.mathPriority ?? 'normal',
                                children: visibleElements.map((element)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_SlideElement_js__WEBPACK_IMPORTED_MODULE_4__/* .SlideElement */ .m, {
                                        elementInfo: element,
                                        elementIndex: elementIndexById.get(element.id) ?? 1,
                                        theme: slide.theme,
                                        renderImage: renderImage,
                                        renderVideo: renderVideo,
                                        renderText: renderText,
                                        renderShapeLabel: renderShapeLabel,
                                        renderTable: renderTable,
                                        videoInteractive: videoInteractive,
                                        onElementClick: onElementClick,
                                        idPrefix: elementIdPrefix,
                                        dragOffset: dragOffsets?.get(element.id)
                                    }, element.id))
                            }),
                            highlights.map((highlight)=>{
                                const element = visibleElements.find((el)=>el.id === highlight.elementId);
                                return element ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_effects_HighlightOverlay_js__WEBPACK_IMPORTED_MODULE_5__/* .HighlightOverlay */ .f, {
                                    element: element,
                                    options: highlight
                                }, highlight.elementId) : null;
                            })
                        ]
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_effects_SpotlightOverlay_js__WEBPACK_IMPORTED_MODULE_6__/* .SpotlightOverlay */ .T, {
                        options: effects?.spotlight,
                        elementIdPrefix: elementIdPrefix,
                        measurementKey: visibleElements
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            padding: '5%'
                        },
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            },
                            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_12__/* .AnimatePresence */ .N, {
                                children: effects?.laser && laserGeometry && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_effects_LaserOverlay_js__WEBPACK_IMPORTED_MODULE_7__/* .LaserOverlay */ .y, {
                                    geometry: laserGeometry,
                                    color: effects.laser.color,
                                    duration: effects.laser.duration
                                }, `laser-${effects.laser.elementId}`)
                            })
                        })
                    })
                ]
            })
        ]
    });
}
 //# sourceMappingURL=SlideCanvas.js.map


/***/ }),

/***/ 98149:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ getTextStyle)
/* harmony export */ });
function getTextStyle(style) {
    if (!style)
        return {};
    const css = {};
    if (style.bold)
        css.fontWeight = 'bold';
    if (style.em)
        css.fontStyle = 'italic';
    if (style.underline)
        css.textDecoration = 'underline';
    if (style.strikethrough) {
        css.textDecoration = css.textDecoration ? `${css.textDecoration} line-through` : 'line-through';
    }
    if (style.color)
        css.color = style.color;
    if (style.backcolor)
        css.backgroundColor = style.backcolor;
    if (style.fontsize)
        css.fontSize = style.fontsize;
    if (style.fontname)
        css.fontFamily = style.fontname;
    if (style.align)
        css.textAlign = style.align;
    return css;
}


//# sourceMappingURL=tableUtils.js.map


/***/ }),

/***/ 99314:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Copy)
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
    name: "copy",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "14",
                height: "14",
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
                key: "17jyea"
            }
        ],
        [
            "path",
            {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                key: "zix9uf"
            }
        ]
    ]
};
__iconData.node;
const Copy = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=copy.mjs.map


/***/ }),

/***/ 99414:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileHeadphone)
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
    name: "file-headphone",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
                key: "1vfytu"
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
                d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
                key: "1etmh7"
            }
        ]
    ],
    aliases: [
        "file-audio",
        "file-audio-2"
    ]
};
__iconData.node;
const FileHeadphone = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-headphone.mjs.map


/***/ })

}]);