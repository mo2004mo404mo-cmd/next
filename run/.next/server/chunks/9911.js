"use strict";
exports.id = 9911;
exports.ids = [9911];
exports.modules = {

/***/ 6675:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ noop)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const noop = (any) => any;


//# sourceMappingURL=noop.mjs.map


/***/ }),

/***/ 7823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ press)
/* harmony export */ });
/* harmony import */ var _utils_is_html_element_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(673109);
/* harmony import */ var _drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(402107);
/* harmony import */ var _utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(815291);
/* harmony import */ var _utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31822);
/* harmony import */ var _utils_setup_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(269198);
/* harmony import */ var _utils_is_keyboard_accessible_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(130586);
/* harmony import */ var _utils_keyboard_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(276004);
/* harmony import */ var _utils_state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(276314);









/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */
function isValidPressEvent(event) {
    return (0,_utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isPrimaryPointer */ .M)(event) && !(0,_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isDragActive */ .D)();
}
const claimedPointerDownEvents = new WeakSet();
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */
function press(targetOrSelector, onPressStart, options = {}) {
    const [targets, eventOptions, cancelEvents] = (0,_utils_setup_mjs__WEBPACK_IMPORTED_MODULE_2__/* .setupGesture */ .V)(targetOrSelector, options);
    const startPress = (startEvent) => {
        const target = startEvent.currentTarget;
        if (!isValidPressEvent(startEvent))
            return;
        if (claimedPointerDownEvents.has(startEvent))
            return;
        _utils_state_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isPressing */ .Q.add(target);
        if (options.stopPropagation) {
            claimedPointerDownEvents.add(startEvent);
        }
        const onPressEnd = onPressStart(target, startEvent);
        /**
         * End listeners run in the capture phase so a descendant calling
         * stopPropagation() in its own pointerup handler can't prevent the
         * press gesture from ending. This also keeps the gesture-end
         * ordering consistent with the drag gesture. See #2794.
         */
        const endEventOptions = { ...eventOptions, capture: true };
        const onPointerEnd = (endEvent, success) => {
            window.removeEventListener("pointerup", onPointerUp, endEventOptions);
            window.removeEventListener("pointercancel", onPointerCancel, endEventOptions);
            if (_utils_state_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isPressing */ .Q.has(target)) {
                _utils_state_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isPressing */ .Q.delete(target);
            }
            if (!isValidPressEvent(endEvent)) {
                return;
            }
            if (typeof onPressEnd === "function") {
                onPressEnd(endEvent, { success });
            }
        };
        const onPointerUp = (upEvent) => {
            onPointerEnd(upEvent, target === window ||
                target === document ||
                options.useGlobalTarget ||
                (0,_utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isNodeOrChild */ .w)(target, upEvent.target));
        };
        const onPointerCancel = (cancelEvent) => {
            onPointerEnd(cancelEvent, false);
        };
        window.addEventListener("pointerup", onPointerUp, endEventOptions);
        window.addEventListener("pointercancel", onPointerCancel, endEventOptions);
    };
    targets.forEach((target) => {
        const pointerDownTarget = options.useGlobalTarget ? window : target;
        pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
        if ((0,_utils_is_html_element_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isHTMLElement */ .s)(target)) {
            target.addEventListener("focus", (event) => (0,_utils_keyboard_mjs__WEBPACK_IMPORTED_MODULE_6__/* .enableKeyboardPress */ .s)(event, eventOptions));
            if (!(0,_utils_is_keyboard_accessible_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isElementKeyboardAccessible */ .c)(target) &&
                !target.hasAttribute("tabindex")) {
                target.tabIndex = 0;
            }
        }
    });
    return cancelEvents;
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 8351:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ isSVGSVGElement)
/* harmony export */ });
/* harmony import */ var _is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(588982);


/**
 * Checks if an element is specifically an SVGSVGElement (the root SVG element)
 * in a way that works across iframes
 */
function isSVGSVGElement(element) {
    return (0,_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isSVGElement */ .x)(element) && element.tagName === "svg";
}


//# sourceMappingURL=is-svg-svg-element.mjs.map


/***/ }),

/***/ 14692:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ asNumber)
/* harmony export */ });
const asNumber = (v) => typeof v === "number" ? v : parseFloat(v);


//# sourceMappingURL=as-number.mjs.map


/***/ }),

/***/ 15654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ addPointerInfo),
/* harmony export */   e: () => (/* binding */ extractEventInfo)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31822);


function extractEventInfo(event) {
    return {
        point: {
            x: event.pageX,
            y: event.pageY,
        },
    };
}
const addPointerInfo = (handler) => (event) => (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .isPrimaryPointer */ .M)(event) && handler(event, extractEventInfo(event));


//# sourceMappingURL=event-info.mjs.map


/***/ }),

/***/ 31628:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ animateMotionValue)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(565229);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(128765);
/* harmony import */ var _AsyncMotionValueAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(173552);
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(481996);
/* harmony import */ var _utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(663293);
/* harmony import */ var _utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(902606);
/* harmony import */ var _utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(271787);
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(293568);
/* harmony import */ var _utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(859927);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(744557);










const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = (0,_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_0__/* .getValueTransition */ .r)(transition, name) || {};
    /**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */
    const delay = valueTransition.delay || transition.delay || 0;
    /**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */
    let { elapsed = 0 } = transition;
    elapsed = elapsed - (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(delay);
    const options = {
        keyframes: Array.isArray(target) ? target : [null, target],
        ease: "easeOut",
        velocity: value.getVelocity(),
        ...valueTransition,
        delay: -elapsed,
        onUpdate: (v) => {
            value.set(v);
            valueTransition.onUpdate && valueTransition.onUpdate(v);
        },
        onComplete: () => {
            onComplete();
            valueTransition.onComplete && valueTransition.onComplete();
        },
        name,
        motionValue: value,
        element: isHandoff ? undefined : element,
    };
    /**
     * If there's no transition defined for this value, we can generate
     * unique transition settings for this value.
     */
    if (!(0,_utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isTransitionDefined */ .D)(valueTransition)) {
        Object.assign(options, (0,_utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getDefaultTransition */ .x)(name, options));
    }
    /**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */
    options.duration && (options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(options.duration));
    options.repeatDelay && (options.repeatDelay = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(options.repeatDelay));
    /**
     * Support deprecated way to set initial value. Prefer keyframe syntax.
     */
    if (options.from !== undefined) {
        options.keyframes[0] = options.from;
    }
    let shouldSkip = false;
    if (options.type === false ||
        (options.duration === 0 && !options.repeatDelay)) {
        (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_4__/* .makeAnimationInstant */ ._)(options);
        if (options.delay === 0) {
            shouldSkip = true;
        }
    }
    if (motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .MotionGlobalConfig */ .W.instantAnimations ||
        motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .MotionGlobalConfig */ .W.skipAnimations ||
        element?.shouldSkipAnimations ||
        valueTransition.skipAnimations) {
        shouldSkip = true;
        (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_4__/* .makeAnimationInstant */ ._)(options);
        options.delay = 0;
    }
    /**
     * If the transition type or easing has been explicitly set by the user
     * then we don't want to allow flattening the animation.
     */
    options.allowFlatten = !valueTransition.type && !valueTransition.ease;
    /**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */
    if (shouldSkip && !isHandoff && value.get() !== undefined) {
        const finalKeyframe = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getFinalKeyframe */ .X)(options.keyframes, valueTransition);
        if (finalKeyframe !== undefined) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__/* .frame */ .Gt.update(() => {
                options.onUpdate(finalKeyframe);
                options.onComplete();
            });
            return;
        }
    }
    return valueTransition.isSync
        ? new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_8__/* .JSAnimation */ .s(options)
        : new _AsyncMotionValueAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__/* .AsyncMotionValueAnimation */ .A(options);
};


//# sourceMappingURL=motion-value.mjs.map


/***/ }),

/***/ 31822:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ isPrimaryPointer)
/* harmony export */ });
const isPrimaryPointer = (event) => {
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    }
    else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */
        return event.isPrimary !== false;
    }
};


//# sourceMappingURL=is-primary-pointer.mjs.map


/***/ }),

/***/ 35133:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ isMotionValue)
/* harmony export */ });
const isMotionValue = (value) => Boolean(value && value.getVelocity);


//# sourceMappingURL=is-motion-value.mjs.map


/***/ }),

/***/ 41448:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ reverseEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
/*#__NO_SIDE_EFFECTS__*/
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);


//# sourceMappingURL=reverse.mjs.map


/***/ }),

/***/ 50947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ buildProjectionTransform)
/* harmony export */ });
function buildProjectionTransform(delta, treeScale, latestTransform) {
    let transform = "";
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */
    const xTranslate = delta.x.translate / treeScale.x;
    const yTranslate = delta.y.translate / treeScale.y;
    const zTranslate = latestTransform?.z || 0;
    if (xTranslate || yTranslate || zTranslate) {
        transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
    }
    /**
     * Apply scale correction for the tree transform.
     * This will apply scale to the screen-orientated axes.
     */
    if (treeScale.x !== 1 || treeScale.y !== 1) {
        transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (latestTransform) {
        const { transformPerspective, rotate, pathRotation, rotateX, rotateY, skewX, skewY, } = latestTransform;
        if (transformPerspective)
            transform = `perspective(${transformPerspective}px) ${transform}`;
        if (rotate)
            transform += `rotate(${rotate}deg) `;
        // Additive `rotate()` so user `rotate` isn't clobbered.
        if (pathRotation)
            transform += `rotate(${pathRotation}deg) `;
        if (rotateX)
            transform += `rotateX(${rotateX}deg) `;
        if (rotateY)
            transform += `rotateY(${rotateY}deg) `;
        if (skewX)
            transform += `skewX(${skewX}deg) `;
        if (skewY)
            transform += `skewY(${skewY}deg) `;
    }
    /**
     * Apply scale to match the size of the element to the size we want it.
     * This will apply scale to the element-orientated axes.
     */
    const elementScaleX = delta.x.scale * treeScale.x;
    const elementScaleY = delta.y.scale * treeScale.y;
    if (elementScaleX !== 1 || elementScaleY !== 1) {
        transform += `scale(${elementScaleX}, ${elementScaleY})`;
    }
    return transform || "none";
}


//# sourceMappingURL=transform.mjs.map


/***/ }),

/***/ 73873:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ generateLinearEasing)
/* harmony export */ });
const generateLinearEasing = (easing, duration, // as milliseconds
resolution = 10 // as milliseconds
) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i = 0; i < numPoints; i++) {
        points += Math.round(easing(i / (numPoints - 1)) * 10000) / 10000 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};


//# sourceMappingURL=linear.mjs.map


/***/ }),

/***/ 74389:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ cornerRadiusProps)
/* harmony export */ });
/**
 * The four corner-radius longhands. Shared so the projection mixer, scale
 * corrector, WAAPI px-value set and view-transition crop pass don't each carry
 * their own copy. Order is irrelevant - every consumer mixes/corrects/animates
 * each corner independently.
 */
const cornerRadiusProps = [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderBottomLeftRadius",
];


//# sourceMappingURL=border-radius.mjs.map


/***/ }),

/***/ 78027:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vf: () => (/* binding */ analyseComplexValue),
/* harmony export */   f: () => (/* binding */ complex),
/* harmony export */   nK: () => (/* binding */ hasComplexValues)
/* harmony export */ });
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(513002);
/* harmony import */ var _utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(711039);
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200252);
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(255817);





/**
 * Non-global copies of the token regexes so test() can use .test()
 * (no match array, stops at the first token) without lastIndex state.
 */
const hasFloat = /*@__PURE__*/ new RegExp(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__/* .floatRegex */ .S.source);
const hasColor = /*@__PURE__*/ new RegExp(_utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__/* .colorRegex */ .n.source, "i");
function test(v) {
    return (isNaN(v) &&
        typeof v === "string" &&
        (hasFloat.test(v) || hasColor.test(v)));
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
/**
 * Whether analyseComplexValue(value) would find any values, without
 * tokenising the string. CSS variables are resolved before this is
 * used, so it's enough to look for a number or a color.
 */
function hasComplexValues(value) {
    const asString = value.toString();
    return hasFloat.test(asString) || hasColor.test(asString);
}
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: [],
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
        if (_color_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .color */ .y.test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(_color_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .color */ .y.parse(parsedValue));
        }
        else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        }
        else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
    const numSections = split.length;
    return (v) => {
        let output = "";
        for (let i = 0; i < numSections; i++) {
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__/* .sanitize */ .a)(v[i]);
                }
                else if (type === COLOR_TOKEN) {
                    output += _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .color */ .y.transform(v[i]);
                }
                else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
function createTransformer(source) {
    return buildTransformer(analyseComplexValue(source));
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .color */ .y.test(v) ? _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .color */ .y.getAnimatableNone(v) : v;
/**
 * Convert a parsed value to its zero equivalent, but preserve numbers
 * that act as divisors in CSS calc() expressions.
 *
 * analyseComplexValue extracts numbers from CSS strings and puts the
 * surrounding text into a `split` template array. For example:
 *   "calc(var(--gap) / 5)"  →  values: [var(--gap), 5]
 *                               split:  ["calc(", " / ", ")"]
 *
 * When building a zero-equivalent for animation, naively zeroing all
 * numbers turns the divisor into 0 → "calc(var(--gap) / 0)" → NaN.
 * We detect this by checking whether the text preceding a number
 * (split[i]) ends with "/" — the CSS calc division operator.
 */
const convertToZero = (value, splitBefore) => {
    if (typeof value === "number") {
        return splitBefore?.trim().endsWith("/") ? value : 0;
    }
    return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
    const info = analyseComplexValue(v);
    const transformer = buildTransformer(info);
    return transformer(info.values.map((value, i) => convertToZero(value, info.split[i])));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone,
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 84824:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ createMotionComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(179875);
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(469320);
/* harmony import */ var _context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(212027);
/* harmony import */ var _context_MotionContext_create_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(926257);
/* harmony import */ var _render_dom_use_render_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(144767);
/* harmony import */ var _render_dom_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(159628);
/* harmony import */ var _render_html_use_html_visual_state_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(148006);
/* harmony import */ var _render_svg_use_svg_visual_state_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(544646);
/* harmony import */ var _features_load_features_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(329904);
/* harmony import */ var _utils_symbol_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(694290);
/* harmony import */ var _utils_use_motion_ref_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(487206);
/* __next_internal_client_entry_do_not_use__ createMotionComponent auto */ 
















/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */ function createMotionComponent(Component, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
    preloadedFeatures && (0,_features_load_features_mjs__WEBPACK_IMPORTED_MODULE_2__/* .loadFeatures */ .Y)(preloadedFeatures);
    /**
     * Determine whether to use SVG or HTML rendering based on:
     * 1. Explicit `type` option (highest priority)
     * 2. Auto-detection via `isSVGComponent`
     */ const isSVG = type ? type === "svg" : (0,_render_dom_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isSVGComponent */ .Q)(Component);
    const useVisualState = isSVG ? _render_svg_use_svg_visual_state_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useSVGVisualState */ .d : _render_html_use_html_visual_state_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useHTMLVisualState */ .G;
    function MotionDOMComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */ let MeasureLayout;
        const configAndProps = {
            ...(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .MotionConfigContext */ .Q),
            ...props,
            layoutId: useLayoutId(props)
        };
        const { isStatic, isValidProp } = configAndProps;
        const context = (0,_context_MotionContext_create_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useCreateMotionContext */ .z)(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && "undefined" !== "undefined") {}
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */ return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_8__/* .MotionContext */ .A.Provider, {
            value: context,
            children: [
                MeasureLayout && context.visualElement ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MeasureLayout, {
                    visualElement: context.visualElement,
                    ...configAndProps
                }) : null,
                (0,_render_dom_use_render_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useRender */ .C)(Component, props, (0,_utils_use_motion_ref_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useMotionRef */ .J)(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG, isValidProp)
            ]
        });
    }
    MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
    const ForwardRefMotionComponent = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(MotionDOMComponent);
    ForwardRefMotionComponent[_utils_symbol_mjs__WEBPACK_IMPORTED_MODULE_11__/* .motionComponentSymbol */ .o] = Component;
    return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_12__/* .LayoutGroupContext */ .L).id;
    return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = useContext(LazyContext).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */ if (false) {}
}
function getProjectionFunctionality(props) {
    const featureDefinitions = getInitializedFeatureDefinitions();
    const { drag, layout } = featureDefinitions;
    if (!drag && !layout) return {};
    const combined = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : undefined,
        ProjectionNode: combined.ProjectionNode
    };
}
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 91524:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ clamp)
/* harmony export */ });
const clamp = (min, max, v) => {
    if (v > max)
        return max;
    if (v < min)
        return min;
    return v;
};


//# sourceMappingURL=clamp.mjs.map


/***/ }),

/***/ 91618:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ startWaapiAnimation)
/* harmony export */ });
/* harmony import */ var _easing_map_easing_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(721814);


function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times, } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes,
    };
    if (times)
        keyframeOptions.offset = times;
    const easing = (0,_easing_map_easing_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mapEasingToNativeEasing */ .T)(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */
    if (Array.isArray(easing))
        keyframeOptions.easing = easing;
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal",
    };
    if (pseudoElement)
        options.pseudoElement = pseudoElement;
    return element.animate(keyframeOptions, options);
}


//# sourceMappingURL=start-waapi-animation.mjs.map


/***/ }),

/***/ 100893:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ featureBundle)
/* harmony export */ });
/* harmony import */ var _motion_features_animations_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(328245);
/* harmony import */ var _motion_features_drag_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(473622);
/* harmony import */ var _motion_features_gestures_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(395576);
/* harmony import */ var _motion_features_layout_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(201510);





const featureBundle = {
    ..._motion_features_animations_mjs__WEBPACK_IMPORTED_MODULE_0__/* .animations */ .W,
    ..._motion_features_gestures_mjs__WEBPACK_IMPORTED_MODULE_1__/* .gestureAnimations */ .n,
    ..._motion_features_drag_mjs__WEBPACK_IMPORTED_MODULE_2__/* .drag */ .$,
    ..._motion_features_layout_mjs__WEBPACK_IMPORTED_MODULE_3__/* .layout */ .Z,
};


//# sourceMappingURL=feature-bundle.mjs.map


/***/ }),

/***/ 102389:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ isObject)
/* harmony export */ });
const isObject = (value) => typeof value === "object" && value !== null;


//# sourceMappingURL=is-object.mjs.map


/***/ }),

/***/ 106370:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   po: () => (/* binding */ circIn),
/* harmony export */   tn: () => (/* binding */ circInOut),
/* harmony export */   yT: () => (/* binding */ circOut)
/* harmony export */ });
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(681343);
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41448);



const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_0__/* .reverseEasing */ .G)(circIn);
const circInOut = (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mirrorEasing */ .V)(circIn);


//# sourceMappingURL=circ.mjs.map


/***/ }),

/***/ 107993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ hover)
/* harmony export */ });
/* harmony import */ var _drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(402107);
/* harmony import */ var _utils_setup_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(269198);



function isValidHover(event) {
    return !(event.pointerType === "touch" || (0,_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragActive */ .D)());
}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerleave" event listener when the hover ends.
 *
 * @public
 */
function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = (0,_utils_setup_mjs__WEBPACK_IMPORTED_MODULE_1__/* .setupGesture */ .V)(elementOrSelector, options);
    elements.forEach((element) => {
        let isPressed = false;
        let deferredHoverEnd = false;
        let hoverEndCallback;
        const removePointerLeave = () => {
            element.removeEventListener("pointerleave", onPointerLeave);
        };
        const endHover = (event) => {
            if (hoverEndCallback) {
                hoverEndCallback(event);
                hoverEndCallback = undefined;
            }
            removePointerLeave();
        };
        const onPointerUp = (event) => {
            isPressed = false;
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            if (deferredHoverEnd) {
                deferredHoverEnd = false;
                endHover(event);
            }
        };
        const onPointerDown = () => {
            isPressed = true;
            window.addEventListener("pointerup", onPointerUp, eventOptions);
            window.addEventListener("pointercancel", onPointerUp, eventOptions);
        };
        const onPointerLeave = (leaveEvent) => {
            if (leaveEvent.pointerType === "touch")
                return;
            if (isPressed) {
                deferredHoverEnd = true;
                return;
            }
            endHover(leaveEvent);
        };
        const onPointerEnter = (enterEvent) => {
            if (!isValidHover(enterEvent))
                return;
            deferredHoverEnd = false;
            const onHoverEnd = onHoverStart(element, enterEvent);
            if (typeof onHoverEnd !== "function")
                return;
            hoverEndCallback = onHoverEnd;
            element.addEventListener("pointerleave", onPointerLeave, eventOptions);
        };
        element.addEventListener("pointerenter", onPointerEnter, eventOptions);
        element.addEventListener("pointerdown", onPointerDown, eventOptions);
    });
    return cancel;
}


//# sourceMappingURL=hover.mjs.map


/***/ }),

/***/ 110645:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ buildSVGAttrs),
/* harmony export */   W: () => (/* binding */ cssStyleProperties)
/* harmony export */ });
/* harmony import */ var _html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(299596);
/* harmony import */ var _path_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(510799);



const cssStyleProperties = [
    "transform",
    "opacity",
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor",
];
/**
 * Build SVG visual attributes, like cx and style.transform
 */
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, 
// This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    (0,_html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__/* .buildHTMLStyles */ .O)(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */
    if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    for (const key of cssStyleProperties) {
        if (attrs[key] !== undefined) {
            style[key] = attrs[key];
            delete attrs[key];
        }
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */
        style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    if (attrScale !== undefined)
        attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0,_path_mjs__WEBPACK_IMPORTED_MODULE_1__/* .buildSVGPath */ .C)(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}


//# sourceMappingURL=build-attrs.mjs.map


/***/ }),

/***/ 116038:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ warning),
/* harmony export */   V: () => (/* binding */ invariant)
/* harmony export */ });


let warning = () => { };
let invariant = () => { };
if (typeof process !== "undefined" && "production" !== "production") {}


//# sourceMappingURL=errors.mjs.map


/***/ }),

/***/ 118222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ acceleratedValues)
/* harmony export */ });
/**
 * A list of values that can be hardware-accelerated.
 */
const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform",
    "backgroundColor",
]);


//# sourceMappingURL=accelerated-values.mjs.map


/***/ }),

/***/ 120099:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ getVariableValue)
/* harmony export */ });
/* unused harmony export parseCSSVariable */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116038);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(720288);
/* harmony import */ var _is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(545756);



/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const splitCSSVariableRegex = 
// eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
        return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 ?? token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .invariant */ .V)(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .isNumericalString */ .i)(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return (0,_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isCSSVariableToken */ .pG)(fallback)
        ? getVariableValue(fallback, element, depth + 1)
        : fallback;
}


//# sourceMappingURL=css-variables-conversion.mjs.map


/***/ }),

/***/ 125217:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ resolveMotionValue)
/* harmony export */ });
/* harmony import */ var _is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35133);


/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 */
function resolveMotionValue(value) {
    return (0,_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(value) ? value.get() : value;
}


//# sourceMappingURL=resolve-motion-value.mjs.map


/***/ }),

/***/ 126340:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ resolveVariantFromProps)
/* harmony export */ });
function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement?.values.forEach((value, key) => {
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    const resolveFunction = (def) => typeof def === "function"
        ? def(custom !== undefined ? custom : props.custom, ...getValueState(visualElement))
        : def;
    /**
     * Resolve a function, then a variant label (which the function may have
     * returned), then a function again as the label may point to one. The
     * final function can only return a target object.
     */
    definition = resolveFunction(definition);
    if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    return resolveFunction(definition);
}


//# sourceMappingURL=resolve-variants.mjs.map


/***/ }),

/***/ 128765:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ MotionGlobalConfig)
/* harmony export */ });
const MotionGlobalConfig = {};


//# sourceMappingURL=global-config.mjs.map


/***/ }),

/***/ 130586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ isElementTextInput),
/* harmony export */   c: () => (/* binding */ isElementKeyboardAccessible)
/* harmony export */ });
const keyboardAccessibleElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A",
]);
/**
 * Checks if an element is natively keyboard accessible (focusable).
 * Used by the press gesture to determine if we need to add tabIndex.
 */
function isElementKeyboardAccessible(element) {
    return (keyboardAccessibleElements.has(element.tagName) ||
        element.isContentEditable === true);
}
const textInputElements = new Set(["INPUT", "SELECT", "TEXTAREA"]);
/**
 * Checks if an element has text selection or direct interaction behavior
 * that should block drag gestures from starting.
 *
 * This specifically targets form controls where the user might want to select
 * text or interact with the control (e.g., sliders, dropdowns).
 *
 * Buttons and links are NOT included because they don't have click-and-move
 * actions of their own - they only respond to click events, so dragging
 * should still work when initiated from these elements.
 */
function isElementTextInput(element) {
    return (textInputElements.has(element.tagName) ||
        element.isContentEditable === true);
}


//# sourceMappingURL=is-keyboard-accessible.mjs.map


/***/ }),

/***/ 132337:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ int)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(320193);


const int = {
    ..._numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .number */ .ai,
    transform: Math.round,
};


//# sourceMappingURL=int.mjs.map


/***/ }),

/***/ 135369:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ invisibleValues),
/* harmony export */   v: () => (/* binding */ mixVisibility)
/* harmony export */ });
const invisibleValues = new Set(["none", "hidden"]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */
function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p) => (p <= 0 ? origin : target);
    }
    else {
        return (p) => (p >= 1 ? target : origin);
    }
}


//# sourceMappingURL=visibility.mjs.map


/***/ }),

/***/ 135542:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ fillWildcards)
/* harmony export */ });
function fillWildcards(keyframes) {
    for (let i = 1; i < keyframes.length; i++) {
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}


//# sourceMappingURL=fill-wildcards.mjs.map


/***/ }),

/***/ 141752:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ isCSSVar)
/* harmony export */ });
const isCSSVar = (name) => name.startsWith("--");


//# sourceMappingURL=is-css-var.mjs.map


/***/ }),

/***/ 142587:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ keyframes)
/* harmony export */ });
/* unused harmony export defaultEasing */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(939693);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(361061);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(302305);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128765);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(91524);
/* harmony import */ var _utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(216081);
/* harmony import */ var _utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(773019);
/* harmony import */ var _keyframes_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(445005);
/* harmony import */ var _keyframes_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(892377);






function defaultEasing(values, easing) {
    return values.map(() => easing || motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .easeInOut */ .am).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut", }) {
    /**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */
    const easingFunctions = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .isEasingArray */ .h)(ease)
        ? ease.map(motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .easingDefinitionToFunction */ .K)
        : (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .easingDefinitionToFunction */ .K)(ease) || motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .easeInOut */ .am;
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = {
        done: false,
        value: keyframeValues[0],
    };
    /**
     * Fast setup path for two keyframes one easing.
     */
    if (keyframeValues.length === 2 &&
        !Array.isArray(easingFunctions) &&
        (!times ||
            times.length !== 2 ||
            (times[0] === 0 && times[1] === 1))) {
        const [origin, target] = keyframeValues;
        const mixer = origin === target
            ? undefined
            : (motion_utils__WEBPACK_IMPORTED_MODULE_3__/* .MotionGlobalConfig */ .W.mix || _utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mix */ .j)(origin, target);
        return {
            calculatedDuration: duration,
            next: (t) => {
                state.value = mixer
                    ? mixer(easingFunctions(duration > 0 ? (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .q)(0, 1, t / duration) : 1))
                    : target;
                state.done = t >= duration;
                return state;
            },
        };
    }
    /**
     * Create a times array based on the provided 0-1 offsets
     */
    const absoluteTimes = (0,_keyframes_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_6__/* .convertOffsetToTimes */ .A)(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length
        ? times
        : (0,_keyframes_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_7__/* .defaultOffset */ .Z)(keyframeValues), duration);
    const mapTimeToKeyframe = (0,_utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_8__/* .interpolate */ .G)(absoluteTimes, keyframeValues, {
        ease: Array.isArray(easingFunctions)
            ? easingFunctions
            : defaultEasing(keyframeValues, easingFunctions),
    });
    return {
        calculatedDuration: duration,
        next: (t) => {
            state.value = mapTimeToKeyframe(t);
            state.done = t >= duration;
            return state;
        },
    };
}


//# sourceMappingURL=keyframes.mjs.map


/***/ }),

/***/ 144767:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useRender)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(35133);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(996796);
/* harmony import */ var _svg_use_props_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(832473);
/* harmony import */ var _utils_filter_props_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(371332);
/* harmony import */ var _utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(159628);
/* __next_internal_client_entry_do_not_use__ useRender auto */ 





function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG, isValidProp) {
    const useVisualProps = isSVG ?? (0,_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isSVGComponent */ .Q)(Component) ? _svg_use_props_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useSVGProps */ .u : _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useHTMLProps */ .b;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = (0,_utils_filter_props_mjs__WEBPACK_IMPORTED_MODULE_4__/* .filterProps */ .J)(props, typeof Component === "string", forwardMotionProps, isValidProp);
    const elementProps = Component !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment ? {
        ...filteredProps,
        ...visualProps,
        ref
    } : {};
    /**
     * If component has been handed a motion value as its child,
     * memoise its initial value and render that. Subsequent updates
     * will be handled by the onChange handler
     */ const { children } = props;
    const renderedChildren = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>(0,motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .isMotionValue */ .S)(children) ? children.get() : children, [
        children
    ]);
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
        ...elementProps,
        children: renderedChildren
    });
}
 //# sourceMappingURL=use-render.mjs.map


/***/ }),

/***/ 144914:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ mixNumber)
/* harmony export */ });
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/
const mixNumber = (from, to, progress) => {
    return from + (to - from) * progress;
};


//# sourceMappingURL=number.mjs.map


/***/ }),

/***/ 148006:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ useHTMLVisualState)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(249757);
/* harmony import */ var _motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(738964);
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(939755);
/* __next_internal_client_entry_do_not_use__ useHTMLVisualState auto */ 


const useHTMLVisualState = /*@__PURE__*/ (0,_motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .makeUseVisualState */ .T)({
    scrapeMotionValuesFromProps: motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .scrapeMotionValuesFromProps */ .x,
    createRenderState: _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createHtmlRenderState */ .d
});
 //# sourceMappingURL=use-html-visual-state.mjs.map


/***/ }),

/***/ 151444:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ statsBuffer)
/* harmony export */ });
const statsBuffer = {
    value: null,
    addProjectionMetrics: null,
};


//# sourceMappingURL=buffer.mjs.map


/***/ }),

/***/ 154353:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ DragGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(963969);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6675);
/* harmony import */ var _VisualElementDragControls_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(807953);




class DragGesture extends motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .Feature */ .X {
    constructor(node) {
        super(node);
        this.removeGroupControls = motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .l;
        this.removeListeners = motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .l;
        this.controls = new _VisualElementDragControls_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VisualElementDragControls */ .n(node);
    }
    mount() {
        // If we've been provided a DragControls for manual control over the drag gesture,
        // subscribe this component to it on mount.
        const { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .l;
    }
    update() {
        const { dragControls } = this.node.getProps();
        const { dragControls: prevDragControls } = this.node.prevProps || {};
        if (dragControls !== prevDragControls) {
            this.removeGroupControls();
            if (dragControls) {
                this.removeGroupControls = dragControls.subscribe(this.controls);
            }
        }
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
        /**
         * In React 19, during list reorder reconciliation, components may
         * briefly unmount and remount while the drag is still active. If we're
         * actively dragging, we should NOT end the pan session - it will
         * continue tracking pointer events via its window-level listeners.
         *
         * The pan session will be properly cleaned up when:
         * 1. The drag ends naturally (pointerup/pointercancel)
         * 2. The component is truly removed from the DOM
         */
        if (!this.controls.isDragging) {
            this.controls.endPanSession();
        }
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 159628:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ isSVGComponent)
/* harmony export */ });
/* harmony import */ var _svg_lowercase_elements_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(265868);


function isSVGComponent(Component) {
    if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" ||
        /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */
        Component.includes("-")) {
        return false;
    }
    else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    _svg_lowercase_elements_mjs__WEBPACK_IMPORTED_MODULE_0__/* .lowercaseSVGElements */ .J.indexOf(Component) > -1 ||
        /**
         * If it contains a capital letter, it's an SVG component
         */
        /[A-Z]/u.test(Component)) {
        return true;
    }
    return false;
}


//# sourceMappingURL=is-svg-component.mjs.map


/***/ }),

/***/ 162735:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ time)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(128765);
/* harmony import */ var _frame_data_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(725222);



let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */
const time = {
    now: () => {
        if (now === undefined) {
            time.set(_frame_data_mjs__WEBPACK_IMPORTED_MODULE_0__/* .frameData */ .u.isProcessing || motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .MotionGlobalConfig */ .W.useManualTiming
                ? _frame_data_mjs__WEBPACK_IMPORTED_MODULE_0__/* .frameData */ .u.timestamp
                : performance.now());
        }
        return now;
    },
    set: (newTime) => {
        now = newTime;
        queueMicrotask(clearTime);
    },
};


//# sourceMappingURL=sync-time.mjs.map


/***/ }),

/***/ 163150:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ KeyframeResolver),
/* harmony export */   q: () => (/* binding */ flushKeyframeResolvers)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(720288);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(893180);
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78027);
/* harmony import */ var _value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(419563);
/* harmony import */ var _utils_fill_wildcards_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(135542);
/* harmony import */ var _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(308398);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(744557);







const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = [];
        const elementsToMeasure = new Set();
        const elementsToUntransform = new Set();
        toResolve.forEach((resolver) => {
            if (!resolver.needsMeasurement)
                return;
            resolversToMeasure.push(resolver);
            elementsToMeasure.add(resolver.element);
            if (_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .boxDependentValues */ .dB.has(resolver.name)) {
                elementsToUntransform.add(resolver.element);
            }
        });
        const transformsToRestore = new Map();
        /**
         * Write pass
         * Values measured from the bounding box need bounding box-changing
         * transforms removed first. Values read from computed style don't.
         */
        elementsToUntransform.forEach((element) => {
            const removedTransforms = (0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .removeNonTranslationalTransform */ .W9)(element);
            if (!removedTransforms.length)
                return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element) => {
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value]) => {
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver) => {
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver) => {
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
/**
 * Normalise a value read from the subject into an animation origin: a
 * number read as a string ("0", "200") becomes a number, and a value
 * that isn't animatable (e.g. "none") but whose target is becomes an
 * animatable zero in the shape of the target.
 */
function readOrigin(value, name, target) {
    if (typeof value === "string") {
        if ((0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .isNumericalString */ .i)(value) || (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .isZeroValueString */ .$)(value)) {
            return parseFloat(value);
        }
        else if (!_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .complex */ .f.test(value) && _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .complex */ .f.test(target)) {
            return (0,_value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getAnimatableNone */ .J)(name, target);
        }
    }
    return value ?? undefined;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false) {
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */
        this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */
        this.needsMeasurement = false;
        this.unresolvedKeyframes = [...unresolvedKeyframes];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.read(readAllKeyframes);
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.resolveKeyframes(measureAllKeyframes);
            }
        }
        else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            }
            else if (element && name) {
                const valueAsRead = readOrigin(element.readValue(name, finalKeyframe), name, finalKeyframe);
                if (valueAsRead !== undefined) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        (0,_utils_fill_wildcards_mjs__WEBPACK_IMPORTED_MODULE_6__/* .fillWildcards */ .D)(unresolvedKeyframes);
    }
    setFinalKeyframe() { }
    measureInitialState() { }
    renderEndStyles() { }
    measureEndState() { }
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending")
            this.scheduleResolve();
    }
}


//# sourceMappingURL=KeyframesResolver.mjs.map


/***/ }),

/***/ 163396:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hy: () => (/* binding */ copyBoxInto),
/* harmony export */   be: () => (/* binding */ copyAxisInto),
/* harmony export */   xD: () => (/* binding */ copyAxisDeltaInto)
/* harmony export */ });
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
}
/**
 * Reset a delta to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyAxisDeltaInto(delta, originDelta) {
    delta.translate = originDelta.translate;
    delta.scale = originDelta.scale;
    delta.originPoint = originDelta.originPoint;
    delta.origin = originDelta.origin;
}


//# sourceMappingURL=copy.mjs.map


/***/ }),

/***/ 171581:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ PanSession)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(162735);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31822);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(725222);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(447443);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(565229);
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(762935);
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15654);
/* harmony import */ var _utils_distance_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(835880);






const overflowStyles = /*#__PURE__*/ new Set(["auto", "scroll"]);
/**
 * @internal
 */
class PanSession {
    constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element, } = {}) {
        /**
         * @internal
         */
        this.startEvent = null;
        /**
         * @internal
         */
        this.lastMoveEvent = null;
        /**
         * @internal
         */
        this.lastMoveEventInfo = null;
        /**
         * Raw (untransformed) event info, re-transformed each frame
         * so transformPagePoint sees the current parent matrix.
         * @internal
         */
        this.lastRawMoveEventInfo = null;
        /**
         * @internal
         */
        this.handlers = {};
        /**
         * @internal
         */
        this.contextWindow = window;
        /**
         * Scroll positions of scrollable ancestors and window.
         * @internal
         */
        this.scrollPositions = new Map();
        /**
         * Cleanup function for scroll listeners.
         * @internal
         */
        this.removeScrollListeners = null;
        this.onElementScroll = (event) => {
            this.handleScroll(event.target);
        };
        this.onWindowScroll = () => {
            this.handleScroll(window);
        };
        this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            this.hasPendingMove = false;
            // Re-transform raw point through current transformPagePoint so
            // animated parent transforms (e.g. rotation) are picked up each frame
            if (this.lastRawMoveEventInfo) {
                this.lastMoveEventInfo = transformPoint(this.lastRawMoveEventInfo, this.transformPagePoint);
            }
            const info = getPanInfo(this.lastMoveEventInfo, this.history);
            const isPanStarted = this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursor.
            const isDistancePastThreshold = (0,_utils_distance_mjs__WEBPACK_IMPORTED_MODULE_0__/* .distance2D */ .w)(info.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
            if (!isPanStarted && !isDistancePastThreshold)
                return;
            const { point } = info;
            this.history.push({ ...point, timestamp: motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now() });
            const { onStart, onMove } = this.handlers;
            if (!isPanStarted) {
                onStart && onStart(this.lastMoveEvent, info);
                this.startEvent = this.lastMoveEvent;
            }
            onMove && onMove(this.lastMoveEvent, info);
        };
        this.handlePointerMove = (event, info) => {
            this.lastMoveEvent = event;
            this.lastRawMoveEventInfo = info;
            this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
            this.hasPendingMove = true;
            // Throttle mouse move event to once per frame
            motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.update(this.updatePoint, true);
        };
        this.handlePointerUp = (event, info) => {
            // Browsers flush a coalesced pointermove immediately before
            // pointerup, so the final move can still be waiting for a frame.
            this.hasPendingMove && this.updatePoint();
            this.end();
            const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            // Resume animation if dragSnapToOrigin is set OR if no drag started (user just clicked)
            // This ensures constraint animations continue when interrupted by a click
            if (this.dragSnapToOrigin || !this.startEvent) {
                resumeAnimation && resumeAnimation();
            }
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const panInfo = getPanInfo(event.type === "pointercancel"
                ? this.lastMoveEventInfo
                : transformPoint(info, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (!(0,motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .isPrimaryPointer */ .M)(event))
            return;
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        this.distanceThreshold = distanceThreshold;
        this.contextWindow = contextWindow || window;
        const info = (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_4__/* .extractEventInfo */ .e)(event);
        const initialInfo = transformPoint(info, this.transformPagePoint);
        const { point } = initialInfo;
        const { timestamp } = motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .frameData */ .u;
        this.history = [{ ...point, timestamp }];
        const { onSessionStart } = handlers;
        onSessionStart &&
            onSessionStart(event, getPanInfo(initialInfo, this.history));
        // Listen in the capture phase so a descendant calling
        // stopPropagation() (e.g. in its own pointerup handler) can't
        // prevent the gesture from ending. See #2794.
        const eventOptions = { passive: true, capture: true };
        this.removeListeners = (0,motion_utils__WEBPACK_IMPORTED_MODULE_6__/* .pipe */ .F)((0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_7__/* .addPointerEvent */ .h)(this.contextWindow, "pointermove", this.handlePointerMove, eventOptions), (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_7__/* .addPointerEvent */ .h)(this.contextWindow, "pointerup", this.handlePointerUp, eventOptions), (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_7__/* .addPointerEvent */ .h)(this.contextWindow, "pointercancel", this.handlePointerUp, eventOptions));
        // Start scroll tracking if element provided
        if (element) {
            this.startScrollTracking(element);
        }
    }
    /**
     * Start tracking scroll on ancestors and window.
     */
    startScrollTracking(element) {
        // Store initial scroll positions for scrollable ancestors
        let current = element.parentElement;
        while (current) {
            const style = getComputedStyle(current);
            if (overflowStyles.has(style.overflowX) ||
                overflowStyles.has(style.overflowY)) {
                this.scrollPositions.set(current, {
                    x: current.scrollLeft,
                    y: current.scrollTop,
                });
            }
            current = current.parentElement;
        }
        // Track window scroll
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY,
        });
        // Capture listener catches element scroll events as they bubble
        window.addEventListener("scroll", this.onElementScroll, {
            capture: true,
        });
        // Direct window scroll listener (window scroll doesn't bubble)
        window.addEventListener("scroll", this.onWindowScroll);
        this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: true,
            });
            window.removeEventListener("scroll", this.onWindowScroll);
        };
    }
    /**
     * Handle scroll compensation during drag.
     *
     * For element scroll: adjusts history origin since pageX/pageY doesn't change.
     * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
     */
    handleScroll(target) {
        const initial = this.scrollPositions.get(target);
        if (!initial)
            return;
        const isWindow = target === window;
        const current = isWindow
            ? { x: window.scrollX, y: window.scrollY }
            : {
                x: target.scrollLeft,
                y: target.scrollTop,
            };
        const delta = { x: current.x - initial.x, y: current.y - initial.y };
        if (delta.x === 0 && delta.y === 0)
            return;
        if (isWindow) {
            // Window scroll: pageX/pageY changes, so update lastMoveEventInfo
            if (this.lastMoveEventInfo) {
                this.lastMoveEventInfo.point.x += delta.x;
                this.lastMoveEventInfo.point.y += delta.y;
            }
        }
        else {
            // Element scroll: pageX/pageY unchanged, so adjust history origin
            if (this.history.length > 0) {
                this.history[0].x -= delta.x;
                this.history[0].y -= delta.y;
            }
        }
        this.scrollPositions.set(target, current);
        motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.update(this.updatePoint, true);
    }
    updateHandlers(handlers) {
        this.handlers = handlers;
    }
    end() {
        this.removeListeners && this.removeListeners();
        this.removeScrollListeners && this.removeScrollListeners();
        this.scrollPositions.clear();
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .cancelFrame */ .WG)(this.updatePoint);
    }
}
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
    return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1),
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
    if (history.length < 2) {
        return { x: 0, y: 0 };
    }
    let i = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while (i >= 0) {
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp >
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__/* .secondsToMilliseconds */ .f)(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return { x: 0, y: 0 };
    }
    /**
     * If the selected point is the pointer-down origin (history[0]),
     * there are better movement points available, and the time gap
     * is suspiciously large (>2x timeDelta), use the next point instead.
     * This prevents stale pointer-down points from diluting velocity
     * in hold-then-flick gestures.
     */
    if (timestampedPoint === history[0] &&
        history.length > 2 &&
        lastPoint.timestamp - timestampedPoint.timestamp >
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__/* .secondsToMilliseconds */ .f)(timeDelta) * 2) {
        timestampedPoint = history[1];
    }
    const seconds = (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__/* .millisecondsToSeconds */ .X)(lastPoint.timestamp - timestampedPoint.timestamp);
    if (seconds === 0) {
        return { x: 0, y: 0 };
    }
    const currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / seconds,
        y: (lastPoint.y - timestampedPoint.y) / seconds,
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}


//# sourceMappingURL=PanSession.mjs.map


/***/ }),

/***/ 173552:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AsyncMotionValueAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(128765);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(162735);
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(481996);
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(293568);
/* harmony import */ var _keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(163150);
/* harmony import */ var _NativeAnimationExtended_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(569467);
/* harmony import */ var _utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(883955);
/* harmony import */ var _utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(902606);
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(316240);
/* harmony import */ var _waapi_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(248909);











/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */
const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__/* .WithPromise */ .q {
    constructor(options) {
        super();
        /**
         * Bound to support return animation.stop pattern
         */
        this.stop = () => {
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now();
        const { keyframes, name, motionValue, element } = options;
        /**
         * animateMotionValue builds a fresh options object per value, so
         * it's completed in place as keyframes resolve rather than copied.
         */
        const optionsWithDefaults = options;
        optionsWithDefaults.autoplay ?? (optionsWithDefaults.autoplay = true);
        optionsWithDefaults.delay ?? (optionsWithDefaults.delay = 0);
        optionsWithDefaults.type ?? (optionsWithDefaults.type = "keyframes");
        optionsWithDefaults.repeat ?? (optionsWithDefaults.repeat = 0);
        optionsWithDefaults.repeatDelay ?? (optionsWithDefaults.repeatDelay = 0);
        optionsWithDefaults.repeatType ?? (optionsWithDefaults.repeatType = "loop");
        const KeyframeResolver$1 = element?.KeyframeResolver || _keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_2__/* .KeyframeResolver */ .h;
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */
        let canAnimateValue = true;
        if (!(0,_utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_3__/* .canAnimate */ .Q)(keyframes, name, type, velocity)) {
            canAnimateValue = false;
            if (motion_utils__WEBPACK_IMPORTED_MODULE_4__/* .MotionGlobalConfig */ .W.instantAnimations || !delay) {
                onUpdate?.((0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_5__/* .getFinalKeyframe */ .X)(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_6__/* .makeAnimationInstant */ ._)(options);
            options.repeat = 0;
        }
        /**
         * Resolve startTime for the animation.
         *
         * This method uses the createdAt and resolvedAt to calculate the
         * animation startTime. *Ideally*, we would use the createdAt time as t=0
         * as the following frame would then be the first frame of the animation in
         * progress, which would feel snappier.
         *
         * However, if there's a delay (main thread work) between the creation of
         * the animation and the first committed frame, we prefer to use resolvedAt
         * to avoid a sudden jump into the animation.
         */
        const startTime = sync
            ? !this.resolvedAt
                ? this.createdAt
                : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY
                    ? this.resolvedAt
                    : this.createdAt
            : undefined;
        const { onComplete } = options;
        /**
         * A startTime passed in options (an optimised appear handoff syncing
         * to its WAAPI animation) takes precedence over the derived one.
         */
        options.startTime ?? (options.startTime = startTime);
        options.finalKeyframe = finalKeyframe;
        options.keyframes = keyframes;
        /**
         * JSAnimation and NativeAnimation call onComplete exactly when
         * their own `finished` resolves, so this replaces a promise chain
         * per value with a callback.
         */
        options.onComplete = () => {
            onComplete?.();
            this.notifyFinished();
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         *
         * Also skip WAAPI when keyframes aren't animatable, as the resolved
         * values may not be valid CSS and would trigger browser warnings.
         */
        const useWaapi = canAnimateValue && !isHandoff && (0,_waapi_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_7__/* .supportsBrowserAnimation */ .R)(options);
        let animation;
        if (useWaapi) {
            /**
             * The resolver needed the VisualElement, WAAPI needs the DOM
             * element. JSAnimation reads neither, so this is safe to
             * leave in place if we fall back to it.
             */
            options.element = options.motionValue?.owner?.current;
            try {
                animation = new _NativeAnimationExtended_mjs__WEBPACK_IMPORTED_MODULE_8__/* .NativeAnimationExtended */ .n(options);
            }
            catch {
                animation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__/* .JSAnimation */ .s(options);
            }
        }
        else {
            animation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__/* .JSAnimation */ .s(options);
        }
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        return this._animation ? this._animation.finished : super.finished;
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(() => { });
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            (0,_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_2__/* .flushKeyframeResolvers */ .q)();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        }
        else {
            this.pendingTimeline = timeline;
        }
        return () => this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}


//# sourceMappingURL=AsyncMotionValueAnimation.mjs.map


/***/ }),

/***/ 177885:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ MeasureLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(232946);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(595209);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _components_AnimatePresence_use_presence_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(577514);
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(179875);
/* harmony import */ var _context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(259795);
/* __next_internal_client_entry_do_not_use__ MeasureLayout auto */ 





/**
 * Track whether we've taken any snapshots yet. If not,
 * we can safely skip notification of didUpdate.
 *
 * Difficult to capture in a test but to prevent flickering
 * we must set this to true either on update or unmount.
 * Running `next-env/layout-id` in Safari will show this behaviour if broken.
 */ let hasTakenAnySnapshot = false;
class MeasureLayoutWithContext extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */ componentDidMount() {
        const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement;
        if (projection) {
            if (layoutGroup.group) layoutGroup.group.add(projection);
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            if (hasTakenAnySnapshot) {
                projection.root.didUpdate();
            }
            projection.addEventListener("animationComplete", ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                layoutDependency: this.props.layoutDependency,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .globalProjectionState */ .w.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
        const { layoutDependency, visualElement, drag, isPresent } = this.props;
        const { projection } = visualElement;
        if (!projection) return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */ projection.isPresent = isPresent;
        if (prevProps.layoutDependency !== layoutDependency) {
            projection.setOptions({
                ...projection.options,
                layoutDependency
            });
        }
        hasTakenAnySnapshot = true;
        if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === undefined || prevProps.isPresent !== isPresent) {
            projection.willUpdate();
        } else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            } else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */ motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt.postRender(()=>{
                    const stack = projection.getStack();
                    if (!stack || !stack.members.length) {
                        this.safeToRemove();
                    }
                });
            }
        }
        return null;
    }
    componentDidUpdate() {
        const { visualElement, layoutAnchor } = this.props;
        const { projection } = visualElement;
        if (projection) {
            projection.options.layoutAnchor = layoutAnchor;
            projection.root.didUpdate();
            motion_dom__WEBPACK_IMPORTED_MODULE_4__/* .microtask */ .k.postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
        const { projection } = visualElement;
        hasTakenAnySnapshot = true;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
            if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
        }
    }
    safeToRemove() {
        const { safeToRemove } = this.props;
        safeToRemove && safeToRemove();
    }
    render() {
        return null;
    }
}
function MeasureLayout(props) {
    const [isPresent, safeToRemove] = (0,_components_AnimatePresence_use_presence_mjs__WEBPACK_IMPORTED_MODULE_5__/* .usePresence */ .xQ)();
    const layoutGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .LayoutGroupContext */ .L);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MeasureLayoutWithContext, {
        ...props,
        layoutGroup: layoutGroup,
        switchLayoutGroup: (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_7__/* .SwitchLayoutGroupContext */ .N),
        isPresent: isPresent,
        safeToRemove: safeToRemove
    });
}
 //# sourceMappingURL=MeasureLayout.mjs.map


/***/ }),

/***/ 179875:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ LayoutGroupContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ LayoutGroupContext auto */ 
const LayoutGroupContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
 //# sourceMappingURL=LayoutGroupContext.mjs.map


/***/ }),

/***/ 184495:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ DocumentProjectionNode)
/* harmony export */ });
/* harmony import */ var _events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(332241);
/* harmony import */ var _create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(872956);



const DocumentProjectionNode = (0,_create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createProjectionNode */ .u0)({
    attachResizeListener: (ref, notify) => (0,_events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_1__/* .addDomEvent */ .k)(ref, "resize", notify),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
        y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
    }),
    checkIsScrollRoot: () => true,
});


//# sourceMappingURL=DocumentProjectionNode.mjs.map


/***/ }),

/***/ 191887:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ spring)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116038);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(565229);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91524);
/* harmony import */ var _waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73873);
/* harmony import */ var _utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(665378);
/* harmony import */ var _utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(852700);





const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    // Default duration/bounce-based options
    duration: 800, // in ms
    bounce: 0.3,
    visualDuration: 0.3, // in seconds
    // Rest thresholds
    restSpeed: {
        granular: 0.01,
        default: 2,
    },
    restDelta: {
        granular: 0.005,
        default: 0.5,
    },
    // Limits
    minDuration: 0.01, // in seconds
    maxDuration: 10.0, // in seconds
    minDamping: 0.05,
};
/**
 * Maps bounce to a damping ratio as SwiftUI does: 0 is critically damped, and
 * it approaches undamped towards 1 and infinitely overdamped towards -1. Both
 * ends are limited so the spring still moves and settles.
 */
const bounceToDampingRatio = (bounce) => bounce < 0
    ? 1 / Math.max(1 + bounce, springDefaults.minDamping)
    : Math.max(1 - bounce, springDefaults.minDamping);
/**
 * Scales an overdamped spring's undamped frequency so that, at its defining
 * time, it has as far left to go as the critically damped spring that's
 * criticalFreqTime radians in by then. A negative bounce then changes the
 * shape of the curve, not when it arrives. 1 at a damping ratio of 1, so
 * there's no jump at a bounce of 0.
 *
 * Solved by Newton on the remaining distance (times fast - slow), which is
 * convex from criticalFreqTime onwards. criticalFreqTime is always below the
 * answer, so it converges from below without overshooting.
 */
function overdampedFreqScale(dampingRatio, criticalFreqTime) {
    if (!(dampingRatio > 1))
        return 1;
    const root = Math.sqrt(dampingRatio * dampingRatio - 1);
    const slow = dampingRatio - root;
    const fast = dampingRatio + root;
    const target = 2 * root * Math.exp(-criticalFreqTime) * (1 + criticalFreqTime);
    return (approximateRoot((freqTime) => fast * Math.exp(-slow * freqTime) -
        slow * Math.exp(-fast * freqTime) -
        target, (freqTime) => Math.exp(-fast * freqTime) - Math.exp(-slow * freqTime), criticalFreqTime) / criticalFreqTime);
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
/**
 * This is ported from the Framer implementation of duration-based spring resolution.
 */
const safeMin = 0.001;
/**
 * Assumes zero initial velocity and the default mass: time-defined springs
 * ignore inherited velocity and only resolve without valid physics. Returns
 * NaN physics when the root search doesn't converge.
 */
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, }) {
    let envelope;
    let derivative;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .warning */ .$)(duration <= (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    const dampingRatio = bounceToDampingRatio(bounce);
    duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .clamp */ .q)(springDefaults.minDuration, springDefaults.maxDuration, (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .millisecondsToSeconds */ .X)(duration));
    if (dampingRatio < 1) {
        /**
         * Underdamped spring
         */
        envelope = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - (exponentialDecay / b) * c;
        };
        derivative = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const e = dampingRatio *
                dampingRatio *
                undampedFreq *
                undampedFreq *
                duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(undampedFreq * undampedFreq, dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * -e * f) / g;
        };
    }
    else {
        /**
         * Critically-damped spring. Overdamped springs reuse this root,
         * scaled below.
         */
        envelope = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = undampedFreq * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = -undampedFreq * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const criticalFreq = approximateRoot(envelope, derivative, initialGuess);
    const undampedFreq = criticalFreq *
        overdampedFreqScale(dampingRatio, criticalFreq * duration);
    const stiffness = undampedFreq * undampedFreq;
    return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(stiffness),
        duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(duration),
    };
}
/**
 * Spring physics must be finite. stiffness and mass are also divisors so must
 * be positive, whereas a damping of 0 is a valid, perpetually oscillating
 * spring. Relational rather than Number.isFinite so numeric strings still
 * coerce.
 */
const isValidPhysics = (value, canBeZero) => (canBeZero ? value >= 0 : value > 0) && value < Infinity;
/**
 * Returns value if it's usable spring physics, otherwise undefined so callers
 * fall back to the default. An explicit `undefined`, e.g. from a forwarded
 * optional prop, must fall back too. Invalid physics would otherwise resolve
 * to NaN spring values that never report done.
 */
function resolvePhysics(value, canBeZero) {
    if (isValidPhysics(value, canBeZero))
        return value;
    if (false) {}
    return undefined;
}
function getSpringOptions(options) {
    /**
     * Resolve physics before choosing between physics- and duration-based
     * resolution, so an invalid stiffness doesn't also silently discard a
     * valid duration/bounce.
     */
    const validStiffness = resolvePhysics(options.stiffness);
    const validDamping = resolvePhysics(options.damping, true);
    const validMass = resolvePhysics(options.mass);
    const springOptions = {
        ...options,
        stiffness: validStiffness ?? springDefaults.stiffness,
        damping: validDamping ?? springDefaults.damping,
        mass: validMass ?? springDefaults.mass,
        isResolvedFromDuration: false,
        // stiffness/damping/mass overrides duration/bounce
        isTimeDefined: (validStiffness ?? validDamping ?? validMass) === undefined &&
            (options.duration !== undefined || options.bounce !== undefined),
    };
    if (springOptions.isTimeDefined) {
        if (options.visualDuration) {
            const dampingRatio = bounceToDampingRatio(options.bounce || 0);
            const root = ((2 * Math.PI) / (options.visualDuration * 1.2)) *
                overdampedFreqScale(dampingRatio, (2 * Math.PI) / 1.2);
            springOptions.stiffness = root * root;
            springOptions.damping =
                2 * dampingRatio * Math.sqrt(springOptions.stiffness);
        }
        else {
            Object.assign(springOptions, findSpring(springOptions));
            springOptions.isResolvedFromDuration = true;
        }
        /**
         * Time options can degenerate: a NaN bounce gives a NaN damping, an
         * infinite visualDuration a 0 stiffness, and findSpring NaN for both
         * when it doesn't converge. Replace the two together, so the
         * relationship duration resolution establishes between them is never
         * left half-overwritten.
         */
        if (!isValidPhysics(springOptions.stiffness) ||
            !isValidPhysics(springOptions.damping, true)) {
            springOptions.stiffness = springDefaults.stiffness;
            springOptions.damping = springDefaults.damping;
        }
    }
    return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object"
        ? {
            visualDuration: optionsOrVisualDuration,
            keyframes: [0, 1],
            bounce,
        }
        : optionsOrVisualDuration;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, isResolvedFromDuration, isTimeDefined, } = getSpringOptions({ ...options });
    /**
     * Time-defined springs ignore inherited velocity. Velocity from
     * interrupted animations causes massive oscillation on small-range
     * animations.
     */
    const inheritVelocity = (velocity) => isTimeDefined ? 0 : -(0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .millisecondsToSeconds */ .X)(velocity);
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .millisecondsToSeconds */ .X)(Math.sqrt(stiffness / mass));
    const decay = dampingRatio * undampedAngularFreq;
    /**
     * Everything that changes when the spring is retargeted: written by
     * retarget() and update(), read by the resolvers. Grouped on one object,
     * like the coefficients (c) below. Writing doubles to object fields
     * measured marginally faster than to captured let variables in optimised
     * code; neither allocates, so this is a grouping choice, not a GC one.
     */
    const s = {
        target,
        delta: target - origin,
        velocity: inheritVelocity(options.velocity || 0) || 0,
        restSpeed: 0,
        restDelta: 0,
    };
    /**
     * If we're working on a granular scale, use smaller defaults for determining
     * when the spring is finished.
     *
     * These defaults have been selected empirically based on what strikes a good
     * ratio between feeling good and finishing as soon as changes are imperceptible.
     */
    const setRestThresholds = () => {
        const isGranularScale = Math.abs(s.delta) < 5;
        s.restSpeed =
            options.restSpeed ||
                (isGranularScale
                    ? springDefaults.restSpeed.granular
                    : springDefaults.restSpeed.default);
        s.restDelta =
            options.restDelta ||
                (isGranularScale
                    ? springDefaults.restDelta.granular
                    : springDefaults.restDelta.default);
    };
    setRestThresholds();
    let resolveSpring;
    let resolveVelocity;
    /**
     * Derives the coefficients that depend on origin, target and initial
     * velocity. Called once now and again whenever the spring is retargeted.
     */
    let update;
    if (dampingRatio < 1) {
        const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
        /**
         * A is the position coefficient, sinC/cosC the coefficients of the
         * analytical derivative (px/ms). The exp/sin/cos terms depend only
         * on t, so they're memoized by t independently of the target: a
         * spring retargeted every frame samples the same t each frame and
         * skips the transcendentals entirely.
         */
        const c = { A: 0, sinC: 0, cosC: 0, t: -1, env: 0, sin: 0, cos: 0 };
        update = () => {
            c.A = (s.velocity + decay * s.delta) / angularFreq;
            c.sinC = decay * c.A + s.delta * angularFreq;
            c.cosC = decay * s.delta - c.A * angularFreq;
        };
        const sample = (t) => {
            if (t !== c.t) {
                c.t = t;
                c.env = Math.exp(-decay * t);
                c.sin = Math.sin(angularFreq * t);
                c.cos = Math.cos(angularFreq * t);
            }
        };
        // Underdamped spring
        resolveSpring = (t) => {
            sample(t);
            return s.target - c.env * (c.A * c.sin + s.delta * c.cos);
        };
        resolveVelocity = (t) => {
            sample(t);
            return c.env * (c.sinC * c.sin + c.cosC * c.cos);
        };
    }
    else if (dampingRatio === 1) {
        // Critically damped spring
        resolveSpring = (t) => s.target -
            Math.exp(-undampedAngularFreq * t) *
                (s.delta + (s.velocity + undampedAngularFreq * s.delta) * t);
        // Analytical derivative of critically damped spring (px/ms)
        const c = { C: 0 };
        update = () => {
            c.C = s.velocity + undampedAngularFreq * s.delta;
        };
        resolveVelocity = (t) => Math.exp(-undampedAngularFreq * t) *
            (undampedAngularFreq * c.C * t - s.velocity);
    }
    else {
        /**
         * Overdamped spring: the sum of a slow and a fast decaying
         * exponential, so no term can overflow however heavily it's damped.
         */
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        const slow = decay - dampedAngularFreq;
        const fast = decay + dampedAngularFreq;
        /**
         * Physics-defined springs keep a non-physical limit: once
         * dampedAngularFreq * t passes 300, both terms decay at the damping
         * rate. Heavily overdamped drag springs (dragElastic: 0,
         * dragTransition) rely on this to settle almost at once rather than
         * creep at stiffness / damping. Negative bounce needs the exact
         * curve, so time-defined springs are exempt.
         */
        const limit = isTimeDefined ? Infinity : 300 / dampedAngularFreq;
        const decayAt = (rate, t) => Math.exp(t > limit ? -rate * limit - decay * (t - limit) : -rate * t);
        const c = { S: 0, F: 0 };
        update = () => {
            const P = (s.velocity + decay * s.delta) / dampedAngularFreq;
            c.S = (s.delta + P) / 2;
            c.F = (s.delta - P) / 2;
        };
        resolveSpring = (t) => s.target - c.S * decayAt(slow, t) - c.F * decayAt(fast, t);
        // Analytical derivative of overdamped spring (px/ms)
        resolveVelocity = (t) => slow * c.S * decayAt(slow, t) + fast * c.F * decayAt(fast, t);
    }
    update();
    const calculatedDuration = isResolvedFromDuration ? duration || null : null;
    const generator = {
        calculatedDuration,
        /**
         * Aim the spring at a new target from its current position and
         * velocity, reusing the resolved physics and closures.
         */
        retarget: (keyframes, newVelocity) => {
            s.target = keyframes[keyframes.length - 1];
            s.delta = s.target - keyframes[0];
            s.velocity = inheritVelocity(newVelocity);
            // Default thresholds depend on the scale of the new delta
            if (!(options.restSpeed && options.restDelta))
                setRestThresholds();
            // Invalidate any duration lazily cached by JSAnimation
            generator.calculatedDuration = calculatedDuration;
            state.done = false;
            update();
        },
        velocity: (t) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(resolveVelocity(t)),
        next: (t) => {
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                const currentVelocity = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(resolveVelocity(t));
                state.done =
                    Math.abs(currentVelocity) <= s.restSpeed &&
                        Math.abs(s.target - current) <= s.restDelta;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? s.target : current;
            return state;
        },
        toString: () => {
            const easingDuration = Math.min((0,_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_3__/* .calcGeneratorDuration */ .t)(generator), _utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_3__/* .maxGeneratorDuration */ .Y);
            const easing = (0,_waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_4__/* .generateLinearEasing */ .K)((progress) => generator.next(easingDuration * progress).value, easingDuration, 30);
            return easingDuration + "ms " + easing;
        },
        toTransition: () => { },
    };
    return generator;
}
spring.applyToOptions = (options) => {
    const generatorOptions = (0,_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_5__/* .createGeneratorEasing */ .X)(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .secondsToMilliseconds */ .f)(generatorOptions.duration);
    options.type = "keyframes";
    return options;
};


//# sourceMappingURL=spring.mjs.map


/***/ }),

/***/ 192692:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ FlatTree)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(637374);
/* harmony import */ var _compare_by_depth_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(218315);



class FlatTree {
    constructor() {
        this.children = [];
        this.isDirty = false;
    }
    add(child) {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .addUniqueItem */ .Kq)(this.children, child);
        this.isDirty = true;
    }
    remove(child) {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .removeItem */ .Ai)(this.children, child);
        this.isDirty = true;
    }
    forEach(callback) {
        this.isDirty && this.children.sort(_compare_by_depth_mjs__WEBPACK_IMPORTED_MODULE_1__/* .compareByDepth */ .u);
        this.isDirty = false;
        this.children.forEach(callback);
    }
}


//# sourceMappingURL=flat-tree.mjs.map


/***/ }),

/***/ 200252:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ floatRegex)
/* harmony export */ });
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;


//# sourceMappingURL=float-regex.mjs.map


/***/ }),

/***/ 201510:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ layout)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(723207);
/* harmony import */ var _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(177885);



const layout = {
    layout: {
        ProjectionNode: motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .HTMLProjectionNode */ .P,
        MeasureLayout: _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_1__/* .MeasureLayout */ .$,
    },
};


//# sourceMappingURL=layout.mjs.map


/***/ }),

/***/ 206536:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ isSVGTag)
/* harmony export */ });
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";


//# sourceMappingURL=is-svg-tag.mjs.map


/***/ }),

/***/ 212027:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MotionContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ MotionContext auto */ 
const MotionContext = /* @__PURE__ */ /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 216081:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(128765);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6675);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(447443);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(116038);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(350738);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(91524);
/* harmony import */ var _mix_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(773019);



function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .MotionGlobalConfig */ .W.mix || _mix_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mix */ .j;
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .noop */ .l : ease;
            mixer = (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__/* .pipe */ .F)(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revisit this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_4__/* .invariant */ .V)(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */
    if (inputLength === 1)
        return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
        return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [...input].reverse();
        output = [...output].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v) => {
        if (isZeroDeltaRange && v < input[0])
            return output[0];
        let i = 0;
        if (numMixers > 1) {
            for (; i < input.length - 2; i++) {
                if (v < input[i + 1])
                    break;
            }
        }
        const progressInRange = (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .progress */ .q)(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp
        ? (v) => interpolator((0,motion_utils__WEBPACK_IMPORTED_MODULE_6__/* .clamp */ .q)(input[0], input[inputLength - 1], v))
        : interpolator;
}


//# sourceMappingURL=interpolate.mjs.map


/***/ }),

/***/ 216950:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ scaleCorrectors)
/* harmony export */ });
/* unused harmony export addScaleCorrector */


const scaleCorrectors = {};
function addScaleCorrector(correctors) {
    for (const key in correctors) {
        scaleCorrectors[key] = correctors[key];
        if (isCSSVariableName(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}


//# sourceMappingURL=scale-correction.mjs.map


/***/ }),

/***/ 218278:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ applyGeneratorOptions)
/* harmony export */ });
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(588818);
/* harmony import */ var _generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(609774);



function applyGeneratorOptions({ type, ...options }) {
    if ((0,_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isGenerator */ .W)(type) && (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__/* .supportsLinearEasing */ .n)()) {
        return type.applyToOptions(options);
    }
    else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}


//# sourceMappingURL=apply-generator.mjs.map


/***/ }),

/***/ 218315:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ compareByDepth)
/* harmony export */ });
const compareByDepth = (a, b) => a.depth - b.depth;


//# sourceMappingURL=compare-by-depth.mjs.map


/***/ }),

/***/ 228895:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ renderHTML)
/* harmony export */ });
function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for (key in style) {
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key] = style[key];
    }
    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for (key in vars) {
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key]);
    }
}


//# sourceMappingURL=render.mjs.map


/***/ }),

/***/ 232946:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ globalProjectionState)
/* harmony export */ });
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */
const globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */
    hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */
    hasEverUpdated: false,
};


//# sourceMappingURL=state.mjs.map


/***/ }),

/***/ 245888:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ isWillChangeMotionValue)
/* harmony export */ });
/* harmony import */ var _utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35133);


function isWillChangeMotionValue(value) {
    return Boolean((0,_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(value) && value.add);
}


//# sourceMappingURL=is.mjs.map


/***/ }),

/***/ 248909:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ supportsBrowserAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(706941);
/* harmony import */ var _utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(118222);
/* harmony import */ var _utils_is_browser_color_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(300427);




const colorProperties = new Set([
    "color",
    "backgroundColor",
    "outlineColor",
    "fill",
    "stroke",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
]);
const supportsWaapi = /*@__PURE__*/ (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .memo */ .p)(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
    const { motionValue, name, repeatDelay, repeatType, damping, type, keyframes, } = options;
    /**
     * Most values can't be accelerated at all, so check the name before
     * looking at the element or its props.
     */
    if (!name ||
        !(_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_1__/* .acceleratedValues */ .M.has(name) || colorProperties.has(name))) {
        return false;
    }
    const subject = motionValue?.owner?.current;
    /**
     * We use instanceof checks instead of isHTMLElement()/isSVGElement()
     * because we explicitly **don't** want elements in different timing
     * contexts (i.e. popups) to be accelerated, as it's not possible to sync
     * these animations properly with those driven from the main window
     * frameloop.
     */
    if (!(subject instanceof HTMLElement) &&
        !(subject instanceof SVGElement)) {
        return false;
    }
    const { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return (supportsWaapi() &&
        /**
         * Force WAAPI for color properties with browser-only color formats
         * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
         */
        (_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_1__/* .acceleratedValues */ .M.has(name) ||
            (colorProperties.has(name) &&
                (0,_utils_is_browser_color_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hasBrowserOnlyColors */ .x)(keyframes))) &&
        (name !== "transform" || !transformTemplate) &&
        /**
         * If we're outputting values to onUpdate then we can't use WAAPI as there's
         * no way to read the value from WAAPI every frame.
         */
        !onUpdate &&
        !repeatDelay &&
        repeatType !== "mirror" &&
        damping !== 0 &&
        type !== "inertia");
}


//# sourceMappingURL=waapi.mjs.map


/***/ }),

/***/ 249093:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ findDimensionValueType)
/* harmony export */ });
/* unused harmony export dimensionValueTypes */
/* harmony import */ var _auto_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(737187);
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(320193);
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(922000);
/* harmony import */ var _test_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(857426);





/**
 * A list of value types commonly used for dimensions
 */
const dimensionValueTypes = [_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .number */ .ai, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .degrees */ .uj, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.vw, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.vh, _auto_mjs__WEBPACK_IMPORTED_MODULE_2__/* .auto */ .q];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
const findDimensionValueType = (v) => dimensionValueTypes.find((0,_test_mjs__WEBPACK_IMPORTED_MODULE_3__/* .testValueType */ .w)(v));


//# sourceMappingURL=dimensions.mjs.map


/***/ }),

/***/ 249757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35133);
/* harmony import */ var _utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(918222);



function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style)
        return newValues;
    for (const key in style) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(style[key]) ||
            (prevStyle && (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(prevStyle[key])) ||
            (0,_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isForcedMotionValue */ .zK)(key, props) ||
            visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}


//# sourceMappingURL=scrape-motion-values.mjs.map


/***/ }),

/***/ 255817:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ sanitize)
/* harmony export */ });
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = (v) => Math.round(v * 100000) / 100000;


//# sourceMappingURL=sanitize.mjs.map


/***/ }),

/***/ 259380:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ singleColorRegex)
/* harmony export */ });
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;


//# sourceMappingURL=single-color-regex.mjs.map


/***/ }),

/***/ 259795:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ SwitchLayoutGroupContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ SwitchLayoutGroupContext auto */ 
/**
 * Internal, exported only for usage in Framer
 */ const SwitchLayoutGroupContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
 //# sourceMappingURL=SwitchLayoutGroupContext.mjs.map


/***/ }),

/***/ 260617:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HD: () => (/* binding */ hasTransform),
/* harmony export */   vF: () => (/* binding */ has2DTranslate),
/* harmony export */   vk: () => (/* binding */ hasScale)
/* harmony export */ });
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
    return (!isIdentityScale(scale) ||
        !isIdentityScale(scaleX) ||
        !isIdentityScale(scaleY));
}
function hasTransform(values) {
    return (hasScale(values) ||
        has2DTranslate(values) ||
        values.z ||
        values.rotate ||
        values.rotateX ||
        values.rotateY ||
        values.skewX ||
        values.skewY);
}
function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
    return value && value !== "0%";
}


//# sourceMappingURL=has-transform.mjs.map


/***/ }),

/***/ 262442:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ renderSVG)
/* harmony export */ });
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(583441);
/* harmony import */ var _html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228895);
/* harmony import */ var _camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(536866);




function renderSVG(element, renderState, _styleProp, projection) {
    (0,_html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_0__/* .renderHTML */ .e)(element, renderState, undefined, projection);
    for (const key in renderState.attrs) {
        element.setAttribute(!_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_1__/* .camelCaseAttributes */ .e.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_2__/* .camelToDash */ .I)(key) : key, renderState.attrs[key]);
    }
}


//# sourceMappingURL=render.mjs.map


/***/ }),

/***/ 265868:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ lowercaseSVGElements)
/* harmony export */ });
/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view",
];


//# sourceMappingURL=lowercase-elements.mjs.map


/***/ }),

/***/ 269198:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ setupGesture)
/* harmony export */ });
/* harmony import */ var _utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520778);


function setupGesture(elementOrSelector, options) {
    const elements = (0,_utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resolveElements */ .K)(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
        passive: true,
        ...options,
        signal: gestureAbortController.signal,
    };
    const cancel = () => gestureAbortController.abort();
    return [elements, eventOptions, cancel];
}


//# sourceMappingURL=setup.mjs.map


/***/ }),

/***/ 270813:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ isColorString),
/* harmony export */   q: () => (/* binding */ splitColor)
/* harmony export */ });
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(200252);
/* harmony import */ var _utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(303226);
/* harmony import */ var _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259380);




/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */
const isColorString = (type, testProp) => (v) => {
    return Boolean((typeof v === "string" &&
        _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_0__/* .singleColorRegex */ .F.test(v) &&
        v.startsWith(type)) ||
        (testProp &&
            !(0,_utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isNullish */ .u)(v) &&
            Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (typeof v !== "string")
        return v;
    const [a, b, c, alpha] = v.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__/* .floatRegex */ .S);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ 271787:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ getDefaultTransition)
/* harmony export */ });
/* harmony import */ var _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457848);


const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
};
const criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
});
const keyframesTransition = {
    type: "keyframes",
    duration: 0.8,
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
};
const getDefaultTransition = (valueKey, { keyframes }) => {
    if (keyframes.length > 2) {
        return keyframesTransition;
    }
    else if (_render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformProps */ .f.has(valueKey)) {
        return valueKey.startsWith("scale")
            ? criticallyDampedSpring(keyframes[1])
            : underDampedSpring;
    }
    return ease;
};


//# sourceMappingURL=default-transitions.mjs.map


/***/ }),

/***/ 276004:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ enableKeyboardPress)
/* harmony export */ });
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(276314);


/**
 * Filter out events that are not "Enter" keys.
 */
function filterEvents(callback) {
    return (event) => {
        if (event.key !== "Enter")
            return;
        callback(event);
    };
}
function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
const enableKeyboardPress = (focusEvent, eventOptions) => {
    const element = focusEvent.currentTarget;
    if (!element)
        return;
    const handleKeydown = filterEvents(() => {
        if (_state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isPressing */ .Q.has(element))
            return;
        firePointerEvent(element, "down");
        const handleKeyup = filterEvents(() => {
            firePointerEvent(element, "up");
        });
        const handleBlur = () => firePointerEvent(element, "cancel");
        element.addEventListener("keyup", handleKeyup, eventOptions);
        element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    /**
     * Add an event listener that fires on blur to remove the keydown events.
     */
    element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};


//# sourceMappingURL=keyboard.mjs.map


/***/ }),

/***/ 276314:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ isPressing)
/* harmony export */ });
const isPressing = new WeakSet();


//# sourceMappingURL=state.mjs.map


/***/ }),

/***/ 279632:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ DOMKeyframesResolver)
/* harmony export */ });
/* harmony import */ var _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(967073);
/* harmony import */ var _value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(249093);
/* harmony import */ var _utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120099);
/* harmony import */ var _utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(545756);
/* harmony import */ var _KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(163150);
/* harmony import */ var _utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(954078);
/* harmony import */ var _utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(538853);
/* harmony import */ var _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(308398);









class DOMKeyframesResolver extends _KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__/* .KeyframeResolver */ .h {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element) {
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current)
            return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if ((0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isCSSVariableToken */ .pG)(keyframe)) {
                    const resolved = (0,_utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getVariableValue */ .W)(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */
        this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */
        if (!_render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_3__/* .positionalKeys */ .$.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        // Two numbers share a unit, so skip the value type search.
        if (typeof origin === "number" && typeof target === "number")
            return;
        const originType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__/* .findDimensionValueType */ .n)(origin);
        const targetType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__/* .findDimensionValueType */ .n)(target);
        /**
         * If one keyframe contains embedded CSS variables (e.g. in calc()) and the other
         * doesn't, we need to measure to convert to pixels. This handles GitHub issue #3410.
         */
        const originHasVar = (0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__/* .containsCSSVariable */ .rm)(origin);
        const targetHasVar = (0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__/* .containsCSSVariable */ .rm)(target);
        if (originHasVar !== targetHasVar && _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__/* .positionalValues */ .Hr[name]) {
            this.needsMeasurement = true;
            return;
        }
        /**
         * Either we don't recognise these value types or we can animate between them.
         */
        if (originType === targetType)
            return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */
        if ((0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isNumOrPxType */ .E4)(originType) && (0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isNumOrPxType */ .E4)(targetType)) {
            for (let i = 0; i < unresolvedKeyframes.length; i++) {
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        }
        else if (_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__/* .positionalValues */ .Hr[name]) {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */
            this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            if (unresolvedKeyframes[i] === null ||
                (0,_utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_6__/* .isNone */ .$)(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            (0,_utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_7__/* .makeNoneKeyframesAnimatable */ .W)(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measure() {
        const { element, name } = this;
        return _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__/* .positionalValues */ .Hr[name](window.getComputedStyle(element.current), () => element.measureViewportBox());
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current)
            return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = this.measure();
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            this.motionValue?.jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        const { element, unresolvedKeyframes } = this;
        if (!element || !element.current)
            return;
        this.motionValue?.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = this.measure();
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
                element
                    .getValue(unsetTransformName)
                    .set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}


//# sourceMappingURL=DOMKeyframesResolver.mjs.map


/***/ }),

/***/ 280352:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   px: () => (/* binding */ removeBoxTransforms)
/* harmony export */ });
/* unused harmony exports removeAxisDelta, removeAxisTransforms, removePointDelta */
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144914);
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(922000);
/* harmony import */ var _delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(647740);




/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = (0,_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scalePoint */ .hq)(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = (0,_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scalePoint */ .hq)(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
function removeAxisDelta(axis, translate = 0, scale = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
    if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN.test(translate)) {
        translate = parseFloat(translate);
        const relativeProgress = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number")
        return;
    let originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(originAxis.min, originAxis.max, origin);
    if (axis === originAxis)
        originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : undefined, sourceBox ? sourceBox.x : undefined);
    removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : undefined, sourceBox ? sourceBox.y : undefined);
}


//# sourceMappingURL=delta-remove.mjs.map


/***/ }),

/***/ 285427:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ replaceStringEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(324772);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(872614);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(106370);


const unsupportedEasingFunctions = {
    anticipate: motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .anticipate */ .b,
    backInOut: motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .backInOut */ .ZZ,
    circInOut: motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .circInOut */ .tn,
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" &&
        isUnsupportedEase(transition.ease)) {
        transition.ease = unsupportedEasingFunctions[transition.ease];
    }
}


//# sourceMappingURL=unsupported-easing.mjs.map


/***/ }),

/***/ 293568:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ getFinalKeyframe)
/* harmony export */ });
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || (repeat && repeatType !== "loop" && repeat % 2 === 1);
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined
        ? resolvedKeyframes[index]
        : finalKeyframe;
}


//# sourceMappingURL=get-final.mjs.map


/***/ }),

/***/ 294834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ notifyAnimationStart),
/* harmony export */   m: () => (/* binding */ notifyLayoutAnimationStart)
/* harmony export */ });
/* harmony import */ var _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(725222);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162735);



function baseRecord(kind, animation) {
    return {
        kind,
        animation,
        timestamp: _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__/* .time */ .k.now(),
        frameTimestamp: _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__/* .frameData */ .u.timestamp,
        frameIsProcessing: _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__/* .frameData */ .u.isProcessing,
    };
}
/**
 * Notify an optional inspector without adding a public Motion API.
 *
 * The record is a raw firehose: the live animation handle, the concrete
 * animation's internal options object untouched (timing fields in
 * internal milliseconds, name/keyframes/element/motionValue still
 * attached), a timestamp and the raw frameloop state at notify time.
 * All interpretation belongs to the consumer behind
 * globalThis.__MOTION_INSPECT__.
 */
function notifyAnimationStart(animation, options, transition) {
    const notify = globalThis.__MOTION_INSPECT__;
    if (!notify)
        return;
    try {
        notify({
            ...baseRecord("animation-start", animation),
            options: transition ? { ...options, ...transition } : options,
        });
    }
    catch { }
}
/**
 * Layout animations drive a projection node's progress rather than a
 * property, so the record forwards the live node itself: it carries the
 * DOM instance, the layout options (layoutId) and the progress handle.
 * Fired inside the frame.update that starts the animation, so nodes
 * animating in the same layout commit share frameTimestamp.
 */
function notifyLayoutAnimationStart(animation, node) {
    const notify = globalThis.__MOTION_INSPECT__;
    if (!notify)
        return;
    try {
        notify({
            ...baseRecord("layout-animation-start", animation),
            node,
        });
    }
    catch { }
}


//# sourceMappingURL=notify-inspector.mjs.map


/***/ }),

/***/ 299596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ buildHTMLStyles)
/* harmony export */ });
/* harmony import */ var _value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(402374);
/* harmony import */ var _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(837953);
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457848);
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(545756);
/* harmony import */ var _build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(479282);






function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */
    for (const key in latestValues) {
        const value = latestValues[key];
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformProps */ .f.has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        }
        else if ((0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isCSSVariableName */ .j4)(key)) {
            vars[key] = value;
            continue;
        }
        else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0,_value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getValueAsType */ .e)(value, _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_3__/* .numberValueTypes */ .W[key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] =
                    valueAsType;
            }
            else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0,_build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__/* .buildTransform */ .d)(latestValues, state.transform, transformTemplate);
        }
        else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */
            style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */
    if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0, } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}


//# sourceMappingURL=build-styles.mjs.map


/***/ }),

/***/ 300427:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ hasBrowserOnlyColors)
/* harmony export */ });
const browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes) {
    for (let i = 0; i < keyframes.length; i++) {
        if (typeof keyframes[i] === "string" &&
            browserColorFunctions.test(keyframes[i])) {
            return true;
        }
    }
    return false;
}


//# sourceMappingURL=is-browser-color.mjs.map


/***/ }),

/***/ 302305:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ easingDefinitionToFunction)
/* harmony export */ });
/* harmony import */ var _errors_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(116038);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6675);
/* harmony import */ var _anticipate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(324772);
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(872614);
/* harmony import */ var _circ_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(106370);
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(378209);
/* harmony import */ var _ease_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(939693);
/* harmony import */ var _is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(694307);









const easingLookup = {
    linear: _noop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .noop */ .l,
    easeIn: _ease_mjs__WEBPACK_IMPORTED_MODULE_1__/* .easeIn */ .a6,
    easeInOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_1__/* .easeInOut */ .am,
    easeOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_1__/* .easeOut */ .vT,
    circIn: _circ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .circIn */ .po,
    circInOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .circInOut */ .tn,
    circOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .circOut */ .yT,
    backIn: _back_mjs__WEBPACK_IMPORTED_MODULE_3__/* .backIn */ .dg,
    backInOut: _back_mjs__WEBPACK_IMPORTED_MODULE_3__/* .backInOut */ .ZZ,
    backOut: _back_mjs__WEBPACK_IMPORTED_MODULE_3__/* .backOut */ .Sz,
    anticipate: _anticipate_mjs__WEBPACK_IMPORTED_MODULE_4__/* .anticipate */ .b,
};
const isValidEasing = (easing) => {
    return typeof easing === "string";
};
const easingDefinitionToFunction = (definition) => {
    if ((0,_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isBezierDefinition */ .D)(definition)) {
        // If cubic bezier definition, create bezier curve
        (0,_errors_mjs__WEBPACK_IMPORTED_MODULE_6__/* .invariant */ .V)(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
        const [x1, y1, x2, y2] = definition;
        return (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_7__/* .cubicBezier */ .A)(x1, y1, x2, y2);
    }
    else if (isValidEasing(definition)) {
        // Else lookup from table
        (0,_errors_mjs__WEBPACK_IMPORTED_MODULE_6__/* .invariant */ .V)(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`, "invalid-easing-type");
        return easingLookup[definition];
    }
    return definition;
};


//# sourceMappingURL=map.mjs.map


/***/ }),

/***/ 302979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ animateSingleValue)
/* harmony export */ });
/* harmony import */ var _interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31628);
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(484676);
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35133);




function animateSingleValue(value, keyframes, options) {
    const motionValue$1 = (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(value) ? value : (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .motionValue */ .OQ)(value);
    motionValue$1.start((0,_interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__/* .animateMotionValue */ .f)("", motionValue$1, keyframes, options));
    return motionValue$1.animation;
}


//# sourceMappingURL=single-value.mjs.map


/***/ }),

/***/ 303226:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ isNullish)
/* harmony export */ });
function isNullish(v) {
    return v == null;
}


//# sourceMappingURL=is-nullish.mjs.map


/***/ }),

/***/ 308398:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E4: () => (/* binding */ isNumOrPxType),
/* harmony export */   Hr: () => (/* binding */ positionalValues),
/* harmony export */   W9: () => (/* binding */ removeNonTranslationalTransform),
/* harmony export */   dB: () => (/* binding */ boxDependentValues)
/* harmony export */ });
/* harmony import */ var _render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(694696);
/* harmony import */ var _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(457848);
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(320193);
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(922000);





const isNumOrPxType = (v) => v === _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .number */ .ai || v === _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px;
const transformKeys = new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transformPropOrder */ .U.filter((key) => !transformKeys.has(key));
/**
 * Reset any bounding box-changing transforms so the element can be
 * measured. Returns the values to restore. Values already at their
 * default don't change the box, so they're left alone: an element with
 * only `rotate: 0` doesn't need to be re-rendered before measuring.
 */
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            const current = value.get();
            const reset = key.startsWith("scale") ? 1 : 0;
            if (current === reset)
                return;
            removedTransforms.push([key, current]);
            value.set(reset);
        }
    });
    return removedTransforms;
}
/**
 * Values that can only be measured from the bounding box. Elements with
 * these values need bounding box-changing transforms removed first.
 */
const boxDependentValues = new Set(["bottom", "right"]);
/**
 * Computed width/height is already in pixels and unaffected by
 * transforms. It's "auto" for elements without a layout box (e.g. inline),
 * in which case we fall back to measuring the bounding box.
 */
function measureDimension(computed, measureBox, axis, paddingStart, paddingEnd, boxSizing) {
    const px = parseFloat(computed);
    if (!isNaN(px))
        return px;
    const { min, max } = measureBox()[axis];
    const size = max - min;
    return boxSizing === "border-box"
        ? size
        : size - parseFloat(paddingStart) - parseFloat(paddingEnd);
}
const positionalValues = {
    // Dimensions
    width: ({ width, paddingLeft = "0", paddingRight = "0", boxSizing }, measureBox) => measureDimension(width, measureBox, "x", paddingLeft, paddingRight, boxSizing),
    height: ({ height, paddingTop = "0", paddingBottom = "0", boxSizing }, measureBox) => measureDimension(height, measureBox, "y", paddingTop, paddingBottom, boxSizing),
    top: ({ top }) => parseFloat(top),
    left: ({ left }) => parseFloat(left),
    bottom: ({ top }, measureBox) => {
        const { y } = measureBox();
        return parseFloat(top) + (y.max - y.min);
    },
    right: ({ left }, measureBox) => {
        const { x } = measureBox();
        return parseFloat(left) + (x.max - x.min);
    },
    // Transform
    x: ({ transform }) => (0,_render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__/* .parseValueFromTransform */ .ry)(transform, "x"),
    y: ({ transform }) => (0,_render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__/* .parseValueFromTransform */ .ry)(transform, "y"),
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;


//# sourceMappingURL=unit-conversion.mjs.map


/***/ }),

/***/ 316240:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ WithPromise)
/* harmony export */ });
class WithPromise {
    constructor() {
        this.isResolved = false;
    }
    get finished() {
        if (!this._finished) {
            this._finished = this.isResolved
                ? Promise.resolve()
                : new Promise((resolve) => {
                    this._resolve = resolve;
                });
        }
        return this._finished;
    }
    updateFinished() {
        this._finished = this._resolve = undefined;
        this.isResolved = false;
    }
    notifyFinished() {
        this.isResolved = true;
        this._resolve?.();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */
    then(onResolve, onReject) {
        return this.finished.then(onResolve, onReject);
    }
}


//# sourceMappingURL=WithPromise.mjs.map


/***/ }),

/***/ 320193:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X4: () => (/* binding */ alpha),
/* harmony export */   ai: () => (/* binding */ number),
/* harmony export */   hs: () => (/* binding */ scale)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91524);


const number = {
    test: (v) => typeof v === "number",
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = {
    ...number,
    transform: (v) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .q)(0, 1, v),
};
const scale = {
    ...number,
    default: 1,
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 324772:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ anticipate)
/* harmony export */ });
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(872614);


const anticipate = (p) => p >= 1
    ? 1
    : (p *= 2) < 1
        ? 0.5 * (0,_back_mjs__WEBPACK_IMPORTED_MODULE_0__/* .backIn */ .dg)(p)
        : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));


//# sourceMappingURL=anticipate.mjs.map


/***/ }),

/***/ 326510:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ DOMVisualElement)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35133);
/* harmony import */ var _animation_keyframes_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(279632);
/* harmony import */ var _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(471963);




class DOMVisualElement extends _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .VisualElement */ .BX {
    constructor() {
        super(...arguments);
        this.KeyframeResolver = _animation_keyframes_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DOMKeyframesResolver */ .K;
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b precedes a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        const style = props.style;
        return style ? style[key] : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isMotionValue */ .S)(children)) {
            this.childSubscription = children.on("change", (latest) => {
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}


//# sourceMappingURL=DOMVisualElement.mjs.map


/***/ }),

/***/ 328245:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ animations)
/* harmony export */ });
/* harmony import */ var _animation_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(353275);
/* harmony import */ var _animation_exit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(365513);



const animations = {
    animation: {
        Feature: _animation_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .AnimationFeature */ .j,
    },
    exit: {
        Feature: _animation_exit_mjs__WEBPACK_IMPORTED_MODULE_1__/* .ExitAnimationFeature */ .H,
    },
};


//# sourceMappingURL=animations.mjs.map


/***/ }),

/***/ 329904:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ loadFeatures)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(471963);
/* harmony import */ var _definitions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(333370);



function loadFeatures(features) {
    const featureDefinitions = (0,_definitions_mjs__WEBPACK_IMPORTED_MODULE_0__/* .getInitializedFeatureDefinitions */ .j)();
    for (const key in features) {
        featureDefinitions[key] = {
            ...featureDefinitions[key],
            ...features[key],
        };
    }
    (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .setFeatureDefinitions */ .lr)(featureDefinitions);
}


//# sourceMappingURL=load-features.mjs.map


/***/ }),

/***/ 332241:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ addDomEvent)
/* harmony export */ });
function addDomEvent(target, eventName, handler, options = { passive: true }) {
    target.addEventListener(eventName, handler, options);
    return () => target.removeEventListener(eventName, handler, options);
}


//# sourceMappingURL=add-dom-event.mjs.map


/***/ }),

/***/ 333370:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ getInitializedFeatureDefinitions)
/* harmony export */ });
/* unused harmony export initFeatureDefinitions */
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(471963);


const featureProps = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
};
let isInitialized = false;
/**
 * Initialize feature definitions with isEnabled checks.
 * This must be called before any motion components are rendered.
 */
function initFeatureDefinitions() {
    if (isInitialized)
        return;
    const initialFeatureDefinitions = {};
    for (const key in featureProps) {
        initialFeatureDefinitions[key] = {
            isEnabled: (props) => featureProps[key].some((name) => !!props[name]),
        };
    }
    (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .setFeatureDefinitions */ .lr)(initialFeatureDefinitions);
    isInitialized = true;
}
/**
 * Get the current feature definitions, initializing if needed.
 */
function getInitializedFeatureDefinitions() {
    initFeatureDefinitions();
    return (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .getFeatureDefinitions */ .vK)();
}


//# sourceMappingURL=definitions.mjs.map


/***/ }),

/***/ 339155:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ calcGeneratorVelocity)
/* harmony export */ });
/* unused harmony export getGeneratorVelocity */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(504901);


const velocitySampleDuration = 5; // ms
function getGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .velocityPerSecond */ .f)(current - resolveValue(prevT), t - prevT);
}
/**
 * A generator's velocity at time t in units/second: analytical where the
 * generator provides it (springs), otherwise by finite difference. Before
 * the animation has started this is its initial velocity.
 */
function calcGeneratorVelocity(generator, t, initialVelocity = 0) {
    if (t <= 0)
        return initialVelocity;
    return generator.velocity
        ? generator.velocity(t)
        : getGeneratorVelocity((s) => generator.next(s).value, t, generator.next(t).value);
}


//# sourceMappingURL=velocity.mjs.map


/***/ }),

/***/ 340295:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ createAnimationState)
/* harmony export */ });
/* unused harmony export checkVariantsDidChange */
/* harmony import */ var _animation_interfaces_visual_element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(793869);
/* harmony import */ var _animation_utils_calc_child_stagger_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(623781);
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(35133);
/* harmony import */ var _is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(708889);
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(485710);
/* harmony import */ var _resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(761024);
/* harmony import */ var _shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(796387);
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(429871);









const reversePriorityOrder = [..._variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__/* .variantPriorityOrder */ .U].reverse();
/**
 * Diffs the element's animation props (one layer per AnimationType, highest
 * priority wins each value) against the previous call and starts animations
 * for what changed.
 *
 * Uses `any` type for visualElement to avoid circular dependencies. It reads
 * props, parent, presenceContext, variantChildren, enteringChildren,
 * manuallyAnimateOnMount, blockInitialAnimation, getValue(),
 * getBaseTargetFromProps(), baseTarget and initialValues.
 */
function createAnimationState(visualElement) {
    let animate = (animations) => Promise.all(animations.map(({ animation, options }) => (0,_animation_interfaces_visual_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .animateVisualElement */ ._)(visualElement, animation, options)));
    let state = createState();
    let isInitialRender = true;
    /**
     * After a reset (StrictMode, Suspense, AnimatePresence re-entry) the next
     * animateChanges() mounts again, but initial={false} no longer applies.
     */
    let wasReset = false;
    function animateChanges(changedActiveType) {
        const { props, parent, manuallyAnimateOnMount } = visualElement;
        const isMounting = isInitialRender || wasReset;
        const animations = [];
        /**
         * Values removed from a type. A lower-priority type that defines
         * them animates them back, otherwise they fall back to a base target.
         */
        const removedKeys = new Set();
        /**
         * Values claimed by active, higher-priority types.
         */
        let encounteredKeys = {};
        /**
         * Once a type has been deactivated, lower-priority variant labels
         * re-animate so variant children animate back too.
         */
        let removedVariantIndex = Infinity;
        /**
         * Variant labels are inherited from the closest variant-controlling
         * ancestor, unless an element on the way has inherit={false}.
         */
        let source = visualElement;
        do
            source = source.props.inherit !== false && source.parent;
        while (source && !source.isControllingVariants);
        reversePriorityOrder.forEach((type, i) => {
            const typeState = state[type];
            const ownProp = props[type];
            const inheritedProp = source && source.props[type];
            const prop = ownProp !== undefined
                ? ownProp
                : (0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isVariantLabel */ .w)(inheritedProp) || inheritedProp === false
                    ? inheritedProp
                    : undefined;
            const propIsVariant = (0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isVariantLabel */ .w)(prop);
            const activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false)
                removedVariantIndex = i;
            /**
             * Inherited labels are animated by the parent through
             * variantChildren, unless this element mounted after its parent.
             */
            const isInherited = propIsVariant &&
                ownProp === undefined &&
                !(isMounting && manuallyAnimateOnMount);
            typeState.protectedKeys = { ...encounteredKeys };
            if ((!typeState.isActive && activeDelta === null) ||
                (!prop && !typeState.prevProp) ||
                (0,_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isAnimationControls */ .N)(prop) ||
                typeof prop === "boolean") {
                return;
            }
            /**
             * Don't re-resolve a running exit: a changed custom would start
             * new value animations that stop the originals, leaving the exit
             * promise unresolved and the element stuck in the DOM.
             */
            if (type === "exit" && typeState.isActive && activeDelta !== true) {
                encounteredKeys = {
                    ...encounteredKeys,
                    ...typeState.prevResolvedValues,
                };
                return;
            }
            const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            let shouldAnimateType = variantDidChange ||
                (propIsVariant &&
                    ((activeDelta && !isInherited) || i > removedVariantIndex));
            let handledRemovedValues = false;
            const definitionList = Array.isArray(prop) ? prop : [prop];
            let resolvedValues = {};
            if (activeDelta !== false) {
                for (const definition of definitionList) {
                    const { transition, transitionEnd, ...target } = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_4__/* .resolveVariant */ .K)(visualElement, definition, (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getTypeCustom */ .Q)(visualElement, type)) || {};
                    resolvedValues = {
                        ...resolvedValues,
                        ...target,
                        ...transitionEnd,
                    };
                }
            }
            const { prevResolvedValues } = typeState;
            for (const key in { ...prevResolvedValues, ...resolvedValues }) {
                if (key in encounteredKeys)
                    continue;
                const next = resolvedValues[key];
                const prev = prevResolvedValues[key];
                /**
                 * Keyframes compare by value, but replay whenever the
                 * variant label changed.
                 */
                const valueHasChanged = Array.isArray(next) && Array.isArray(prev)
                    ? !(0,_shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_5__/* .shallowCompare */ .a)(next, prev) || variantDidChange
                    : next !== prev;
                if (valueHasChanged &&
                    (next === undefined || next === null)) {
                    removedKeys.add(key);
                }
                else if (valueHasChanged ||
                    (next !== undefined && removedKeys.has(key))) {
                    shouldAnimateType = true;
                    if (removedKeys.delete(key))
                        handledRemovedValues = true;
                    typeState.needsAnimating[key] = true;
                    const motionValue = visualElement.getValue(key);
                    if (motionValue)
                        motionValue.liveStyle = false;
                }
                else {
                    typeState.protectedKeys[key] = true;
                }
            }
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            if (typeState.isActive) {
                encounteredKeys = { ...encounteredKeys, ...resolvedValues };
            }
            if (shouldAnimateType &&
                (!(isInherited && variantDidChange) || handledRemovedValues)) {
                for (const animation of definitionList) {
                    const options = { type };
                    /**
                     * Elements that mount into an already-mounted parent
                     * animate themselves, staggered by the parent variant's
                     * delayChildren.
                     */
                    if (typeof animation === "string" &&
                        isMounting &&
                        manuallyAnimateOnMount &&
                        parent?.enteringChildren) {
                        const delayChildren = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_4__/* .resolveVariant */ .K)(parent, animation)
                            ?.transition?.delayChildren;
                        options.delay = (0,_animation_utils_calc_child_stagger_mjs__WEBPACK_IMPORTED_MODULE_6__/* .calcChildStagger */ .L)(parent.enteringChildren, visualElement, delayChildren);
                    }
                    animations.push({ animation, options });
                }
            }
        });
        /**
         * Removed values that no lower-priority type defines animate back to
         * initial, then style, then the value as first read. If initial no
         * longer defines a value it once did, it stays where it is.
         */
        if (removedKeys.size) {
            const { initial } = props;
            const fallbackAnimation = {};
            const resolvedInitial = typeof initial !== "boolean" &&
                (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_4__/* .resolveVariant */ .K)(visualElement, Array.isArray(initial) ? initial[0] : initial, visualElement.presenceContext?.custom);
            if (resolvedInitial && resolvedInitial.transition) {
                fallbackAnimation.transition = resolvedInitial.transition;
            }
            removedKeys.forEach((key) => {
                const motionValue = visualElement.getValue(key);
                if (motionValue)
                    motionValue.liveStyle = true;
                const fromInitial = resolvedInitial && !Array.isArray(initial)
                    ? resolvedInitial[key]
                    : undefined;
                const fromProps = visualElement.getBaseTargetFromProps(props, key);
                fallbackAnimation[key] =
                    (fromInitial !== undefined
                        ? fromInitial
                        : fromProps !== undefined && !(0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isMotionValue */ .S)(fromProps)
                            ? fromProps
                            : visualElement.initialValues[key] === undefined
                                ? visualElement.baseTarget[key]
                                : undefined) ?? null;
            });
            animations.push({ animation: fallbackAnimation });
        }
        const blockAnimation = (isMounting && visualElement.blockInitialAnimation) ||
            (isInitialRender &&
                !manuallyAnimateOnMount &&
                (props.initial === false || props.initial === props.animate));
        isInitialRender = wasReset = false;
        return !blockAnimation && animations.length
            ? animate(animations)
            : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */
    function setActive(type, isActive) {
        if (state[type].isActive === isActive)
            return Promise.resolve();
        visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
        state[type].isActive = isActive;
        const animations = animateChanges(type);
        for (const key in state) {
            state[key].protectedKeys = {};
        }
        return animations;
    }
    return {
        animateChanges,
        setActive,
        /**
         * Allows tests to inject a mocked animate function.
         * @internal
         */
        setAnimateFunction: (makeAnimator) => {
            animate = makeAnimator(visualElement);
        },
        getState: () => state,
        reset: () => {
            state = createState();
            wasReset = true;
        },
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    }
    else if (Array.isArray(next)) {
        return !(0,_shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_5__/* .shallowCompare */ .a)(next, prev);
    }
    return false;
}
function createState() {
    const state = {};
    for (const type of _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__/* .variantPriorityOrder */ .U) {
        state[type] = {
            isActive: type === "animate",
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {},
        };
    }
    return state;
}


//# sourceMappingURL=animation-state.mjs.map


/***/ }),

/***/ 350738:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ progress)
/* harmony export */ });
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.
*/
/*#__NO_SIDE_EFFECTS__*/
const progress = (from, to, value) => {
    const range = to - from;
    return range ? (value - from) / range : 1;
};


//# sourceMappingURL=progress.mjs.map


/***/ }),

/***/ 353275:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ AnimationFeature)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(963969);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(340295);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(708889);


class AnimationFeature extends motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .Feature */ .X {
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
    constructor(node) {
        super(node);
        node.animationState || (node.animationState = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .createAnimationState */ .L)(node));
    }
    updateAnimationControlsSubscription() {
        const { animate } = this.node.getProps();
        if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isAnimationControls */ .N)(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        const { animate } = this.node.getProps();
        const { animate: prevAnimate } = this.node.prevProps || {};
        if (animate !== prevAnimate) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        this.node.animationState.reset();
        this.unmountControls?.();
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 359260:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ prefersReducedMotion),
/* harmony export */   r: () => (/* binding */ hasReducedMotionListener)
/* harmony export */ });
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };


//# sourceMappingURL=state.mjs.map


/***/ }),

/***/ 361061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ isEasingArray)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const isEasingArray = (ease) => {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};


//# sourceMappingURL=is-easing-array.mjs.map


/***/ }),

/***/ 364337:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ PresenceContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ PresenceContext auto */ 
/**
 * @public
 */ const PresenceContext = /* @__PURE__ */ /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
 //# sourceMappingURL=PresenceContext.mjs.map


/***/ }),

/***/ 365513:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ ExitAnimationFeature)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(963969);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(761024);


let id = 0;
class ExitAnimationFeature extends motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .Feature */ .X {
    constructor() {
        super(...arguments);
        this.id = id++;
    }
    update() {
        const { presenceContext, prevPresenceContext, animationState } = this.node;
        if (!presenceContext || !animationState)
            return;
        const { isPresent, onExitComplete } = presenceContext;
        const prevIsPresent = prevPresenceContext?.isPresent;
        if (isPresent === prevIsPresent)
            return;
        if (isPresent && prevIsPresent === false) {
            /**
             * When re-entering after the exit completed (element is at
             * rest), replay the enter animation from initial.
             */
            if (this.exit === true) {
                const { initial } = this.node.getProps();
                if (initial && !Array.isArray(initial)) {
                    const { transition, transitionEnd, ...target } = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .resolveVariant */ .K)(this.node, initial) || {};
                    for (const key in target) {
                        this.node
                            .getValue(key)
                            ?.jump(target[key]);
                    }
                }
                /**
                 * A re-entering element is no longer an initial child, so
                 * AnimatePresence's initial={false} mustn't block its enter.
                 */
                this.node.blockInitialAnimation = false;
                animationState.reset();
                animationState.animateChanges();
            }
            else {
                animationState.setActive("exit", false);
            }
            this.exit = undefined;
            return;
        }
        const exit = (this.exit = animationState.setActive("exit", !isPresent));
        if (onExitComplete && !isPresent) {
            exit.then(() => {
                /**
                 * An exit can resolve after the element has re-entered, e.g.
                 * when its final tick lands in the stop() of the enter.
                 */
                if (this.exit !== exit)
                    return;
                this.exit = true;
                onExitComplete(this.id);
            });
        }
    }
    mount() {
        const { register, onExitComplete } = this.node.presenceContext || {};
        if (onExitComplete) {
            onExitComplete(this.id);
        }
        if (register) {
            this.unmount = register(this.id);
        }
    }
    unmount() { }
}


//# sourceMappingURL=exit.mjs.map


/***/ }),

/***/ 371332:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ filterProps)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35133);
/* harmony import */ var _motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(877214);



function shouldForward(key, isValidProp) {
    return key.startsWith("on")
        ? !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isValidMotionProp */ .S)(key)
        : isValidProp?.(key) ?? !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isValidMotionProp */ .S)(key);
}
function filterProps(props, isDom, forwardMotionProps, isValidProp) {
    const filteredProps = {};
    for (const key in props) {
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */
        if (key === "values" && typeof props.values === "object")
            continue;
        if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .isMotionValue */ .S)(props[key]))
            continue;
        if (shouldForward(key, isValidProp) ||
            (forwardMotionProps === true && (0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isValidMotionProp */ .S)(key)) ||
            (!isDom && !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isValidMotionProp */ .S)(key)) ||
            // If trying to use native HTML drag events, forward drag listeners
            (props["draggable"] &&
                key.startsWith("onDrag"))) {
            filteredProps[key] =
                props[key];
        }
    }
    return filteredProps;
}


//# sourceMappingURL=filter-props.mjs.map


/***/ }),

/***/ 375084:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ visualElementStore)
/* harmony export */ });
const visualElementStore = new WeakMap();


//# sourceMappingURL=store.mjs.map


/***/ }),

/***/ 378209:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ cubicBezier)
/* harmony export */ });
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6675);


/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticeably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) *
    t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        }
        else {
            lowerBound = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
/*#__NO_SIDE_EFFECTS__*/
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2)
        return _noop_mjs__WEBPACK_IMPORTED_MODULE_0__/* .noop */ .l;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}


//# sourceMappingURL=cubic-bezier.mjs.map


/***/ }),

/***/ 393062:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ measurePageBox),
/* harmony export */   m: () => (/* binding */ measureViewportBox)
/* harmony export */ });
/* harmony import */ var _geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(802007);
/* harmony import */ var _geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(647740);



function measureViewportBox(instance, transformPoint) {
    return (0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .convertBoundingBoxToBox */ .FY)((0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformBoxPoints */ .bS)(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode;
    if (scroll) {
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__/* .translateAxis */ .Ql)(viewportBox.x, scroll.offset.x);
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__/* .translateAxis */ .Ql)(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
}


//# sourceMappingURL=measure.mjs.map


/***/ }),

/***/ 395576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ gestureAnimations)
/* harmony export */ });
/* harmony import */ var _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(733616);
/* harmony import */ var _gestures_focus_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(544170);
/* harmony import */ var _gestures_press_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(498727);
/* harmony import */ var _viewport_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(849263);





const gestureAnimations = {
    inView: {
        Feature: _viewport_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .InViewFeature */ .x,
    },
    tap: {
        Feature: _gestures_press_mjs__WEBPACK_IMPORTED_MODULE_1__/* .PressGesture */ .H,
    },
    focus: {
        Feature: _gestures_focus_mjs__WEBPACK_IMPORTED_MODULE_2__/* .FocusGesture */ .c,
    },
    hover: {
        Feature: _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_3__/* .HoverGesture */ .e,
    },
};


//# sourceMappingURL=gestures.mjs.map


/***/ }),

/***/ 402107:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ isDragActive),
/* harmony export */   I: () => (/* binding */ isDragging)
/* harmony export */ });
const isDragging = {
    x: false,
    y: false,
};
function isDragActive() {
    return isDragging.x || isDragging.y;
}


//# sourceMappingURL=is-active.mjs.map


/***/ }),

/***/ 402374:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ getValueAsType)
/* harmony export */ });
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
const getValueAsType = (value, type) => {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};


//# sourceMappingURL=get-as-type.mjs.map


/***/ }),

/***/ 404234:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ transformValueTypes)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(320193);
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(922000);



const transformValueTypes = {
    rotate: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    /**
     * Internal channel for `transition.path` orientToPath. Composed onto
     * `rotate` at the transform-build sites so the user's `rotate` is
     * never read or overwritten. Not part of `transformPropOrder`.
     */
    pathRotation: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    rotateX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    rotateY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    rotateZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    scale: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .hs,
    scaleX: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .hs,
    scaleY: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .hs,
    scaleZ: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .hs,
    skew: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    skewX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    skewY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .degrees */ .uj,
    distance: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    x: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    y: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    z: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    perspective: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    transformPerspective: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    opacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .alpha */ .X4,
    originX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .progressPercentage */ .gQ,
    originY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__/* .progressPercentage */ .gQ,
    originZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
};


//# sourceMappingURL=transform.mjs.map


/***/ }),

/***/ 408472:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ updateMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(484676);
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35133);



/**
 * Updates motion values from props changes.
 * Uses `any` type for element to avoid circular dependencies with VisualElement.
 */
function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
            element.addValue(key, nextValue);
        }
        else if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isMotionValue */ .S)(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */
            element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .motionValue */ .OQ)(nextValue, { owner: element }));
        }
        else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
            if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                }
                else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            }
            else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .motionValue */ .OQ)(latestValue !== undefined ? latestValue : nextValue, { owner: element }));
            }
        }
    }
    // Handle removed values
    for (const key in prev) {
        if (next[key] === undefined)
            element.removeValue(key);
    }
    return next;
}


//# sourceMappingURL=motion-values.mjs.map


/***/ }),

/***/ 419563:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ getAnimatableNone)
/* harmony export */ });
/* harmony import */ var _complex_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78027);
/* harmony import */ var _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(832999);
/* harmony import */ var _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(956093);
/* harmony import */ var _maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(902468);





const customTypes = /*@__PURE__*/ new Set([_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_0__/* .filter */ .p, _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mask */ .d]);
function getAnimatableNone(key, value) {
    let defaultValueType = (0,_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getDefaultValueType */ .D)(key);
    if (!customTypes.has(defaultValueType))
        defaultValueType = _complex_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .complex */ .f;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone
        ? defaultValueType.getAnimatableNone(value)
        : undefined;
}


//# sourceMappingURL=animatable-none.mjs.map


/***/ }),

/***/ 423354:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ observeIntersection)
/* harmony export */ });
/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */
const observerCallbacks = new WeakMap();
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */
const observers = new WeakMap();
const fireObserverCallback = (entry) => {
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
    const lookupRoot = root || document;
    /**
     * If we don't have an observer lookup map for this root, create one.
     */
    if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options);
    /**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */
    if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return () => {
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}


//# sourceMappingURL=observers.mjs.map


/***/ }),

/***/ 429871:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ variantPriorityOrder),
/* harmony export */   _: () => (/* binding */ variantProps)
/* harmony export */ });
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
];
const variantProps = ["initial", ...variantPriorityOrder];


//# sourceMappingURL=variant-props.mjs.map


/***/ }),

/***/ 430388:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ NativeAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116038);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(565229);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6675);
/* harmony import */ var _render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(448110);
/* harmony import */ var _utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(645128);
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(293568);
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(316240);
/* harmony import */ var _utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(294834);
/* harmony import */ var _waapi_start_waapi_animation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91618);
/* harmony import */ var _waapi_utils_apply_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(218278);









/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */
class NativeAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__/* .WithPromise */ .q {
    constructor(options) {
        super();
        this.finishedTime = null;
        this.isStopped = false;
        /**
         * Tracks a manually-set start time that takes precedence over WAAPI's
         * dynamic startTime. This is cleared when play() or time setter is called,
         * allowing WAAPI to take over timing.
         */
        this.manualStartTime = null;
        if (!options)
            return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete, } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = (0,_waapi_utils_apply_generator_mjs__WEBPACK_IMPORTED_MODULE_2__/* .applyGeneratorOptions */ .i)(options);
        this.animation = (0,_waapi_start_waapi_animation_mjs__WEBPACK_IMPORTED_MODULE_3__/* .startWaapiAnimation */ .R)(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = () => {
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getFinalKeyframe */ .X)(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                }
                /**
                 * If we can, we want to commit the final style as set by the user,
                 * rather than the computed keyframe value supplied by the animation.
                 * We always do this, even when a motion value is present, to prevent
                 * a visual flash in Firefox where the WAAPI animation's fill is removed
                 * during cancel() before the scheduled render can apply the correct value.
                 */
                (0,_render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_5__/* .setStyle */ .e)(element, name, keyframe);
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
        (0,_utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_6__/* .notifyAnimationStart */ .U)(this, options, transition);
    }
    play() {
        if (this.isStopped)
            return;
        this.manualStartTime = null;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        }
        catch (e) { }
    }
    stop() {
        if (this.isStopped)
            return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        }
        else {
            this.commitStyles();
        }
        if (!this.isPseudoElement)
            this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */
    commitStyles() {
        const element = this.options?.element;
        if (!this.isPseudoElement && element?.isConnected) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__/* .millisecondsToSeconds */ .X)(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__/* .millisecondsToSeconds */ .X)(delay);
    }
    get time() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__/* .millisecondsToSeconds */ .X)(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        const wasFinished = this.finishedTime !== null;
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__/* .secondsToMilliseconds */ .f)(newTime);
        if (wasFinished) {
            this.animation.pause();
        }
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */
    get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0)
            this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null
            ? "finished"
            : this.animation.playState;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */
    attachTimeline({ timeline, onAttach, observe, 
    // Deprecated rangeStart/rangeEnd from framer-motion 13.0–13.4. Removed in v14.
    ...range }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({ easing: "linear" });
        }
        this.animation.onfinish = null;
        if (timeline && (0,_utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_8__/* .supportsScrollTimeline */ .J)()) {
            this.animation.timeline = timeline;
            Object.assign(this.animation, range);
            onAttach?.(this.animation);
            return motion_utils__WEBPACK_IMPORTED_MODULE_9__/* .noop */ .l;
        }
        else {
            return observe(this);
        }
    }
}


//# sourceMappingURL=NativeAnimation.mjs.map


/***/ }),

/***/ 436360:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ resizeElement)
/* harmony export */ });
/* harmony import */ var _utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(588982);
/* harmony import */ var _utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520778);



const resizeHandlers = new WeakMap();
let observer;
const getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
    if (borderBoxSize && borderBoxSize[0]) {
        return borderBoxSize[0][(borderBoxAxis + "Size")];
    }
    else if ((0,_utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isSVGElement */ .x)(target) && "getBBox" in target) {
        return target.getBBox()[svgAxis];
    }
    else {
        return target[htmlAxis];
    }
};
const getWidth = /*@__PURE__*/ getSize("inline", "width", "offsetWidth");
const getHeight = /*@__PURE__*/ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
    resizeHandlers.get(target)?.forEach((handler) => {
        handler(target, {
            get width() {
                return getWidth(target, borderBoxSize);
            },
            get height() {
                return getHeight(target, borderBoxSize);
            },
        });
    });
}
function notifyAll(entries) {
    entries.forEach(notifyTarget);
}
function createResizeObserver() {
    if (typeof ResizeObserver === "undefined")
        return;
    observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
    if (!observer)
        createResizeObserver();
    const elements = (0,_utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_1__/* .resolveElements */ .K)(target);
    elements.forEach((element) => {
        let elementHandlers = resizeHandlers.get(element);
        if (!elementHandlers) {
            elementHandlers = new Set();
            resizeHandlers.set(element, elementHandlers);
        }
        elementHandlers.add(handler);
        observer?.observe(element);
    });
    return () => {
        elements.forEach((element) => {
            const elementHandlers = resizeHandlers.get(element);
            elementHandlers?.delete(handler);
            if (!elementHandlers?.size) {
                observer?.unobserve(element);
            }
        });
    };
}


//# sourceMappingURL=handle-element.mjs.map


/***/ }),

/***/ 442515:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Uu: () => (/* binding */ initPrefersReducedMotion)
/* harmony export */ });
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(359260);


const isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
    _state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .hasReducedMotionListener */ .r.current = true;
    if (!isBrowser)
        return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = () => (_state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .prefersReducedMotion */ .O.current = motionMediaQuery.matches);
        motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
        setReducedMotionPreferences();
    }
    else {
        _state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .prefersReducedMotion */ .O.current = false;
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 445005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ defaultOffset)
/* harmony export */ });
/* harmony import */ var _fill_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(865377);


function defaultOffset(arr) {
    const offset = [0];
    (0,_fill_mjs__WEBPACK_IMPORTED_MODULE_0__/* .fillOffset */ .f)(offset, arr.length - 1);
    return offset;
}


//# sourceMappingURL=default.mjs.map


/***/ }),

/***/ 447443:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ pipe)
/* harmony export */ });
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
const pipe = (...transformers) => transformers.reduce((a, b) => (v) => b(a(v)));


//# sourceMappingURL=pipe.mjs.map


/***/ }),

/***/ 448110:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ setStyle)
/* harmony export */ });
/* harmony import */ var _is_css_var_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(141752);


function setStyle(element, name, value) {
    (0,_is_css_var_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isCSSVar */ .v)(name)
        ? element.style.setProperty(name, value)
        : (element.style[name] = value);
}


//# sourceMappingURL=style-set.mjs.map


/***/ }),

/***/ 457848:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ transformPropOrder),
/* harmony export */   f: () => (/* binding */ transformProps)
/* harmony export */ });
/**
 * Generate a list of every possible transform key.
 */
const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
];
/**
 * A quick lookup for transform props.
 *
 * `pathRotation` is a transform for routing purposes (skipped from raw
 * style application, wired to the transform composite, flags transform
 * dirty) but is intentionally NOT in `transformPropOrder` — it is
 * composed onto `rotate` at the build sites, not serialized in its own
 * slot, and must stay out of the order-array consumers (parse-transform,
 * unit-conversion, keys-position).
 */
const transformProps = /*@__PURE__*/ (() => new Set([...transformPropOrder, "pathRotation"]))();


//# sourceMappingURL=keys-transform.mjs.map


/***/ }),

/***/ 469320:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ MotionConfigContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ MotionConfigContext auto */ 
/**
 * @public
 */ const MotionConfigContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    transformPagePoint: (p)=>p,
    isStatic: false,
    reducedMotion: "never"
});
 //# sourceMappingURL=MotionConfigContext.mjs.map


/***/ }),

/***/ 471963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BX: () => (/* binding */ VisualElement),
/* harmony export */   lr: () => (/* binding */ setFeatureDefinitions),
/* harmony export */   vK: () => (/* binding */ getFeatureDefinitions)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(565229);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(720288);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(893180);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(669126);
/* harmony import */ var _animation_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(163150);
/* harmony import */ var _animation_NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(430388);
/* harmony import */ var _animation_waapi_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(118222);
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(595209);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(162735);
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(628265);
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(484676);
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(78027);
/* harmony import */ var _value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(419563);
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35133);
/* harmony import */ var _store_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(375084);
/* harmony import */ var _utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(938394);
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(457848);
/* harmony import */ var _utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(408472);
/* harmony import */ var _utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(442515);
/* harmony import */ var _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(359260);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(744557);



















const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
];
/**
 * Static feature definitions - can be injected by framework layer
 */
let featureDefinitions = {};
/**
 * Set feature definitions for all VisualElements.
 * This should be called by the framework layer (e.g., framer-motion) during initialization.
 */
function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
}
/**
 * Get the current feature definitions
 */
function getFeatureDefinitions() {
    return featureDefinitions;
}
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */
class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState, }, options = {}) {
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */
        this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */
        this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */
        this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */
        this.shouldReduceMotion = null;
        /**
         * Decides whether animations should be skipped for this VisualElement.
         * Useful for E2E tests and visual regression testing.
         */
        this.shouldSkipAnimations = false;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
        this.values = new Map();
        this.KeyframeResolver = _animation_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__/* .KeyframeResolver */ .h;
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */
        this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
        this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
        this.prevMotionValues = {};
        /**
         * Track whether this element has been mounted before, to detect
         * remounts after Suspense unmount/remount cycles.
         */
        this.hasBeenMounted = false;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */
        this.propEventSubscriptions = {};
        this.notifyUpdate = () => this.notify("Update", this.latestValues);
        this.render = () => {
            if (!this.current)
                return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = () => {
            const now = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = { ...latestValues };
        this.initialValues = props.initial ? { ...latestValues } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.skipAnimationsConfig = skipAnimations;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isControllingVariants */ .e)(props);
        this.isVariantNode = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__/* .isVariantNode */ .O)(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */
        const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for (const key in initialMotionValues) {
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isMotionValue */ .S)(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        /**
         * If this element has been mounted before (e.g. after a Suspense
         * unmount/remount), reset motion values to their initial state
         * so animations replay correctly from initial → animate.
         */
        if (this.hasBeenMounted) {
            for (const key in this.initialValues) {
                this.values.get(key)?.jump(this.initialValues[key]);
                this.latestValues[key] = this.initialValues[key];
            }
        }
        this.current = instance;
        _store_mjs__WEBPACK_IMPORTED_MODULE_5__/* .visualElementStore */ .C.set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        /**
         * Join the closest variant node above, so its variant changes
         * propagate here, unless inherit={false} cuts the chain.
         */
        if (this.isVariantNode && !this.isControllingVariants) {
            let node = this;
            do
                node = node.props.inherit !== false && node.parent;
            while (node && !node.isVariantNode);
            if (node) {
                const { variantChildren } = node;
                variantChildren.add(this);
                this.removeFromVariantTree = () => variantChildren.delete(this);
            }
        }
        this.values.forEach((value, key) => this.bindToMotionValue(key, value));
        /**
         * Determine reduced motion preference. Only initialize the matchMedia
         * listener if we actually need the dynamic value (i.e., when config
         * is neither "never" nor "always").
         */
        if (this.reducedMotionConfig === "never") {
            this.shouldReduceMotion = false;
        }
        else if (this.reducedMotionConfig === "always") {
            this.shouldReduceMotion = true;
        }
        else {
            if (!_utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__/* .hasReducedMotionListener */ .r.current) {
                (0,_utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_7__/* .initPrefersReducedMotion */ .Uu)();
            }
            this.shouldReduceMotion = _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__/* .prefersReducedMotion */ .O.current;
        }
        if (false) {}
        /**
         * Set whether animations should be skipped based on the config.
         */
        this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
        this.hasBeenMounted = true;
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .cancelFrame */ .WG)(this.notifyUpdate);
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .cancelFrame */ .WG)(this.render);
        this.valueSubscriptions.forEach((remove) => remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for (const key in this.events) {
            this.events[key].clear();
        }
        for (const key in this.features) {
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        if (value.accelerate &&
            _animation_waapi_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_8__/* .acceleratedValues */ .M.has(key) &&
            this.current instanceof HTMLElement) {
            const { factory, keyframes, times, ease, duration } = value.accelerate;
            const animation = new _animation_NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__/* .NativeAnimation */ .m({
                element: this.current,
                name: key,
                keyframes,
                times,
                ease,
                duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_10__/* .secondsToMilliseconds */ .f)(duration),
            });
            const cleanup = factory(animation);
            this.valueSubscriptions.set(key, () => {
                cleanup();
                animation.cancel();
            });
            return;
        }
        const valueIsTransform = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_11__/* .transformProps */ .f.has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue) => {
            this.latestValues[key] = latestValue;
            this.props.onUpdate && _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (typeof window !== "undefined" &&
            window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, () => {
            removeOnChange();
            if (removeSyncCheck)
                removeSyncCheck();
            // Defer to MotionValue.on("change") auto-stop so React 19 remounts
            // can resubscribe before the animation is cancelled (#3315).
        });
    }
    sortNodePosition(other) {
        /**
         * If either node isn't mounted, or they aren't even of the same type,
         * we can't compare their document order.
         */
        if (!this.current ||
            !other.current ||
            !this.sortInstanceNodePosition ||
            this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for (key in featureDefinitions) {
            const featureDefinition = featureDefinitions[key];
            if (!featureDefinition)
                continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */
            if (!this.features[key] &&
                FeatureConstructor &&
                isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */
            if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                }
                else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
        return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : (0,_projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_12__/* .createBox */ .ge)();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */
        for (let i = 0; i < propEventHandlers.length; i++) {
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = ("on" + key);
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0,_utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_13__/* .updateMotionValuesFromProps */ .U)(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue)
                this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            /**
             * An animated value with no base value is undefined until the
             * keyframe resolver reads its origin. Rendering it before then
             * writes an invalid placeholder (e.g. points="undefined") that
             * the resolver can read back from the DOM as the origin.
             */
            const latest = value.get();
            if (latest !== undefined)
                this.latestValues[key] = latest;
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_14__/* .motionValue */ .OQ)(defaultValue ?? this.getDefaultValue?.(key), {
                owner: this,
            });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current
            ? this.latestValues[key]
            : this.getBaseTargetFromProps(this.props, key) ??
                this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" &&
                ((0,motion_utils__WEBPACK_IMPORTED_MODULE_15__/* .isNumericalString */ .i)(value) || (0,motion_utils__WEBPACK_IMPORTED_MODULE_16__/* .isZeroValueString */ .$)(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            }
            else if (
            /**
             * If the value as read isn't animatable (e.g. "none") but
             * the target is, derive an animatable none from the target.
             * A value is animatable if it's a number or contains a
             * number or color, which is cheaper to check than trying
             * every value type in turn.
             */
            typeof value !== "number" &&
                !_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_17__/* .complex */ .f.test(value) &&
                _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_17__/* .complex */ .f.test(target)) {
                value = (0,_value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_18__/* .getAnimatableNone */ .J)(key, target);
            }
            this.setBaseTarget(key, (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isMotionValue */ .S)(value) ? value.get() : value);
        }
        return (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__/* .isMotionValue */ .S)(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new motion_utils__WEBPACK_IMPORTED_MODULE_19__/* .SubscriptionManager */ .v();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_20__/* .microtask */ .k.render(this.render);
    }
}


//# sourceMappingURL=VisualElement.mjs.map


/***/ }),

/***/ 473622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ drag)
/* harmony export */ });
/* harmony import */ var _gestures_drag_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(154353);
/* harmony import */ var _gestures_pan_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(503846);
/* harmony import */ var _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(177885);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(723207);





const drag = {
    pan: {
        Feature: _gestures_pan_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .PanGesture */ .f,
    },
    drag: {
        Feature: _gestures_drag_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DragGesture */ .w,
        ProjectionNode: motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .HTMLProjectionNode */ .P,
        MeasureLayout: _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_3__/* .MeasureLayout */ .$,
    },
};


//# sourceMappingURL=drag.mjs.map


/***/ }),

/***/ 479282:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ buildTransform)
/* harmony export */ });
/* harmony import */ var _value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(402374);
/* harmony import */ var _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(837953);
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457848);




const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
const numTransforms = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformPropOrder */ .U.length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */
    for (let i = 0; i < numTransforms; i++) {
        const key = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformPropOrder */ .U[i];
        const value = latestValues[key];
        if (value === undefined)
            continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        }
        else {
            const parsed = parseFloat(value);
            valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0,_value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getValueAsType */ .e)(value, _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .numberValueTypes */ .W[key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    // `pathRotation` composes onto `rotate` as a separate additive term so
    // the user's `rotate` is never clobbered. Deliberately not a slot in
    // `transformPropOrder`.
    const pathRotation = latestValues.pathRotation;
    if (pathRotation) {
        transformIsDefault = false;
        transformString += `rotate(${(0,_value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getValueAsType */ .e)(pathRotation, _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .numberValueTypes */ .W.pathRotation)}) `;
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}


//# sourceMappingURL=build-transform.mjs.map


/***/ }),

/***/ 481996:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ JSAnimation)
/* harmony export */ });
/* unused harmony export animateValue */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(447443);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(91524);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(565229);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(162735);
/* harmony import */ var _utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(773019);
/* harmony import */ var _drivers_frame_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(765386);
/* harmony import */ var _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(833662);
/* harmony import */ var _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(142587);
/* harmony import */ var _generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(665378);
/* harmony import */ var _generators_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(339155);
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(293568);
/* harmony import */ var _utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(512474);
/* harmony import */ var _utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(294834);
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(316240);













const percentToProgress = (percent) => percent / 100;
class JSAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_0__/* .WithPromise */ .q {
    constructor(options) {
        super();
        this.state = "idle";
        this.startTime = null;
        this.isStopped = false;
        /**
         * The current time of the animation.
         */
        this.currentTime = 0;
        /**
         * The time at which the animation was paused.
         */
        this.holdTime = null;
        /**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */
        this.playbackSpeed = 1;
        /**
         * Reusable state object for the delay phase to avoid
         * allocating a new object every frame.
         */
        this.delayState = {
            done: false,
            value: undefined,
        };
        /**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */
        this.stop = () => {
            const { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now()) {
                this.tick(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now());
            }
            this.isStopped = true;
            if (this.state === "idle")
                return;
            this.teardown();
            this.options.onStop?.();
        };
        this.options = options;
        this.initAnimation();
        this.play();
        if (options.autoplay === false)
            this.pause();
        (0,_utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_2__/* .notifyAnimationStart */ .U)(this, this.options);
    }
    initAnimation() {
        const { options } = this;
        (0,_utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_3__/* .replaceTransitionType */ .E)(options);
        const { type = _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_4__/* .keyframes */ .i, repeat = 0, repeatDelay = 0, repeatType, velocity = 0, } = options;
        let { keyframes: keyframes$1 } = options;
        const generatorFactory = type || _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_4__/* .keyframes */ .i;
        if (false) {}
        if (generatorFactory !== _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_4__/* .keyframes */ .i &&
            typeof keyframes$1[0] !== "number") {
            this.mixKeyframes = (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .pipe */ .F)(percentToProgress, (0,_utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__/* .mix */ .j)(keyframes$1[0], keyframes$1[1]));
            keyframes$1 = [0, 100];
        }
        const generator = generatorFactory(keyframes$1 === options.keyframes
            ? options
            : { ...options, keyframes: keyframes$1 });
        /**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */
        if (repeatType === "mirror") {
            this.mirroredGenerator = generatorFactory({
                ...options,
                keyframes: [...keyframes$1].reverse(),
                velocity: -velocity,
            });
        }
        /**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */
        if (generator.calculatedDuration === null) {
            generator.calculatedDuration = (0,_generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_7__/* .calcGeneratorDuration */ .t)(generator);
        }
        const { calculatedDuration } = generator;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = generator;
    }
    updateTime(timestamp) {
        const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
        // Update currentTime
        if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        }
        else {
            // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
            // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
            // example.
            this.currentTime = animationTime;
        }
    }
    tick(timestamp, sample = false) {
        const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration, } = this;
        if (this.startTime === null)
            return generator.next(0);
        const { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe, } = this.options;
        /**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */
        if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, timestamp);
        }
        else if (this.speed < 0) {
            this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
        }
        if (sample) {
            this.currentTime = timestamp;
        }
        else {
            this.updateTime(timestamp);
        }
        // Rebase on delay
        const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        const isInDelayPhase = this.playbackSpeed >= 0
            ? timeWithoutDelay < 0
            : timeWithoutDelay > totalDuration;
        this.currentTime = Math.max(timeWithoutDelay, 0);
        // If this animation has finished, set the current time  to the total duration.
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let elapsed = this.currentTime;
        let frameGenerator = generator;
        if (repeat) {
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            iterationProgress === 1 && currentIteration--;
            currentIteration = Math.min(currentIteration, repeat + 1);
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const isOddIteration = Boolean(currentIteration % 2);
            if (isOddIteration) {
                if (repeatType === "reverse") {
                    iterationProgress = 1 - iterationProgress;
                    if (repeatDelay) {
                        iterationProgress -= repeatDelay / resolvedDuration;
                    }
                }
                else if (repeatType === "mirror") {
                    frameGenerator = mirroredGenerator;
                }
            }
            elapsed = (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__/* .clamp */ .q)(0, 1, iterationProgress) * resolvedDuration;
        }
        /**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */
        let state;
        if (isInDelayPhase) {
            this.delayState.value = keyframes[0];
            state = this.delayState;
        }
        else {
            state = frameGenerator.next(elapsed);
        }
        if (mixKeyframes && !isInDelayPhase) {
            state.value = mixKeyframes(state.value);
        }
        let { done } = state;
        if (!isInDelayPhase && calculatedDuration !== null) {
            done =
                this.playbackSpeed >= 0
                    ? this.currentTime >= totalDuration
                    : this.currentTime <= 0;
        }
        const isAnimationFinished = this.holdTime === null &&
            (this.state === "finished" || (this.state === "running" && done));
        // TODO: The exception for inertia could be cleaner here
        if (isAnimationFinished && type !== _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_9__/* .inertia */ .B) {
            state.value = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_10__/* .getFinalKeyframe */ .X)(keyframes, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(state.value);
        }
        if (isAnimationFinished) {
            this.finish();
        }
        return state;
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
        return this.finished.then(resolve, reject);
    }
    get duration() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .millisecondsToSeconds */ .X)(this.calculatedDuration);
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .millisecondsToSeconds */ .X)(delay);
    }
    get time() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .millisecondsToSeconds */ .X)(this.currentTime);
    }
    set time(newTime) {
        newTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .secondsToMilliseconds */ .f)(newTime);
        this.currentTime = newTime;
        if (this.startTime === null ||
            this.holdTime !== null ||
            this.playbackSpeed === 0) {
            this.holdTime = newTime;
        }
        else if (this.driver) {
            this.startTime = this.driver.now() - newTime / this.playbackSpeed;
        }
        if (this.driver) {
            this.driver.start(false);
        }
        else {
            this.startTime = 0;
            this.state = "paused";
            this.holdTime = newTime;
            this.tick(newTime);
        }
    }
    /**
     * Returns the generator's velocity at the current time in units/second.
     * Uses the analytical derivative when available (springs), avoiding
     * the MotionValue's frame-dependent velocity estimation.
     */
    getGeneratorVelocity() {
        return (0,_generators_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_12__/* .calcGeneratorVelocity */ .Y)(this.generator, this.currentTime, this.options.velocity);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(newSpeed) {
        const hasChanged = this.playbackSpeed !== newSpeed;
        if (hasChanged && this.driver) {
            this.updateTime(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now());
        }
        this.playbackSpeed = newSpeed;
        if (hasChanged && this.driver) {
            this.time = (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .millisecondsToSeconds */ .X)(this.currentTime);
        }
    }
    play() {
        if (this.isStopped)
            return;
        const { driver = _drivers_frame_mjs__WEBPACK_IMPORTED_MODULE_13__/* .frameloopDriver */ .E, startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((timestamp) => this.tick(timestamp));
        }
        this.options.onPlay?.();
        const now = this.driver.now();
        if (this.state === "finished") {
            this.updateFinished();
            this.startTime = now;
        }
        else if (this.holdTime !== null) {
            this.startTime = now - this.holdTime;
        }
        else if (!this.startTime) {
            this.startTime = startTime ?? now;
        }
        if (this.state === "finished" && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        /**
         * Set playState to running only after we've used it in
         * the previous logic.
         */
        this.state = "running";
        this.driver.start();
    }
    pause() {
        this.state = "paused";
        this.updateTime(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__/* .time */ .k.now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = "finished";
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.startTime = this.holdTime = null;
    }
    stopDriver() {
        if (!this.driver)
            return;
        this.driver.stop();
        this.driver = undefined;
    }
    sample(sampleTime) {
        this.startTime = 0;
        return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
        if (this.options.allowFlatten) {
            this.options.type = "keyframes";
            this.options.ease = "linear";
            this.initAnimation();
        }
        this.driver?.stop();
        return timeline.observe(this);
    }
}
// Legacy function support
function animateValue(options) {
    return new JSAnimation(options);
}


//# sourceMappingURL=JSAnimation.mjs.map


/***/ }),

/***/ 483629:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ memoSupports)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(706941);
/* harmony import */ var _flags_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(827588);



function memoSupports(callback, supportsFlag) {
    const memoized = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .memo */ .p)(callback);
    return () => _flags_mjs__WEBPACK_IMPORTED_MODULE_1__/* .supportsFlags */ .e[supportsFlag] ?? memoized();
}


//# sourceMappingURL=memo.mjs.map


/***/ }),

/***/ 483736:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ cubicBezierAsString)
/* harmony export */ });
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;


//# sourceMappingURL=cubic-bezier.mjs.map


/***/ }),

/***/ 484676:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OQ: () => (/* binding */ motionValue)
/* harmony export */ });
/* unused harmony exports MotionValue, collectMotionValues */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(669126);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(504901);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162735);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(744557);




/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined,
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */
    constructor(init, options = {}) {
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        this.updateAndNotify = (v) => {
            const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__/* .time */ .k.now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */
            if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev) {
                this.notifyChange();
                if (this.dependents) {
                    for (const dependent of this.dependents) {
                        dependent.dirty();
                    }
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__/* .time */ .k.now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
        if (false) {}
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        var _a;
        if (eventName === "change")
            return this.onChangeSubscribe(callback);
        return ((_a = this.events)[eventName] || (_a[eventName] = new motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .SubscriptionManager */ .v())).add(callback);
    }
    onChangeSubscribe(callback) {
        const { events } = this;
        if (!events.change && !this.changeSubscriber) {
            this.changeSubscriber = callback;
        }
        else {
            if (!events.change) {
                events.change = new motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .SubscriptionManager */ .v();
                events.change.add(this.changeSubscriber);
                this.changeSubscriber = undefined;
            }
            events.change.add(callback);
        }
        return () => {
            if (this.changeSubscriber === callback) {
                this.changeSubscriber = undefined;
            }
            else {
                events.change?.remove(callback);
            }
            this.stopIfUnobserved();
        };
    }
    /**
     * If we have no more change listeners by the start
     * of the next frame, stop active animations.
     */
    stopIfUnobserved() {
        _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.read(() => {
            if (!this.changeSubscriber && !this.events.change?.getSize()) {
                this.stop();
            }
        });
    }
    clearListeners() {
        this.changeSubscriber = undefined;
        for (const eventManagers in this.events) {
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */
    attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v) {
        if (!this.passiveEffect) {
            this.updateAndNotify(v);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect)
            this.stopPassiveEffect();
    }
    dirty() {
        this.notifyChange();
    }
    notifyChange() {
        const { current, changeSubscriber } = this;
        /**
         * One or the other exists. Subscribing during the direct
         * subscriber's call moves it into a new manager, which must not
         * then be notified for the same change.
         */
        if (changeSubscriber) {
            changeSubscriber(current);
        }
        else {
            this.events.change?.notify(current);
        }
    }
    addDependent(dependent) {
        if (!this.dependents) {
            this.dependents = new Set();
        }
        this.dependents.add(dependent);
    }
    removeDependent(dependent) {
        if (this.dependents) {
            this.dependents.delete(dependent);
        }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
        const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__/* .time */ .k.now();
        if (!this.canTrackVelocity ||
            this.prevFrameValue === undefined ||
            currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__/* .velocityPerSecond */ .f)(parseFloat(this.current) -
            parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */
    start(startAnimation) {
        this.stop();
        return new Promise((resolve) => {
            this.hasAnimated = true;
            /**
             * Complete synchronously via the callback rather than chaining a
             * second promise per animation. Guard against animations that
             * complete before startAnimation has returned.
             */
            let isComplete = false;
            let animation;
            // eslint-disable-next-line prefer-const -- read by the callback before assignment when completing synchronously
            animation = startAnimation(() => {
                isComplete = true;
                this.events.animationComplete?.notify();
                if (this.animation === animation)
                    this.clearAnimation();
                resolve();
            });
            if (!isComplete)
                this.animation = animation;
            this.events.animationStart?.notify();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        // Assign rather than delete to keep the object's shape stable
        this.animation = undefined;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 485710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ isVariantLabel)
/* harmony export */ });
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}


//# sourceMappingURL=is-variant-label.mjs.map


/***/ }),

/***/ 487206:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ useMotionRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ useMotionRef auto */ 
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */ function useMotionRef(visualState, visualElement, externalRef) {
    /**
     * Store externalRef in a ref to avoid including it in the useCallback
     * dependency array. Including externalRef in dependencies causes issues
     * with libraries like Radix UI that create new callback refs on each render
     * when using asChild - this would cause the callback to be recreated,
     * triggering element remounts and breaking AnimatePresence exit animations.
     */ const externalRefContainer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(externalRef);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect)(()=>{
        externalRefContainer.current = externalRef;
    });
    // Store cleanup function returned by callback refs (React 19 feature)
    const refCleanup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((instance)=>{
        if (instance) {
            visualState.onMount?.(instance);
        }
        if (visualElement) {
            instance ? visualElement.mount(instance) : visualElement.unmount();
        }
        const ref = externalRefContainer.current;
        if (typeof ref === "function") {
            if (instance) {
                const cleanup = ref(instance);
                if (typeof cleanup === "function") {
                    refCleanup.current = cleanup;
                }
            } else if (refCleanup.current) {
                refCleanup.current();
                refCleanup.current = null;
            } else {
                ref(instance);
            }
        } else if (ref) {
            ref.current = instance;
        }
    }, [
        visualElement
    ]);
}
 //# sourceMappingURL=use-motion-ref.mjs.map


/***/ }),

/***/ 495210:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ motion)
/* harmony export */ });
/* harmony import */ var _dom_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(725097);
/* harmony import */ var _create_proxy_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645618);
/* harmony import */ var _feature_bundle_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(100893);




const motion = /*@__PURE__*/ (0,_create_proxy_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createMotionProxy */ .H)(_feature_bundle_mjs__WEBPACK_IMPORTED_MODULE_1__/* .featureBundle */ .F, _dom_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createDomVisualElement */ .J);


//# sourceMappingURL=proxy.mjs.map


/***/ }),

/***/ 498124:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ resizeWindow)
/* harmony export */ });
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
    windowResizeHandler = () => {
        const info = {
            get width() {
                return window.innerWidth;
            },
            get height() {
                return window.innerHeight;
            },
        };
        windowCallbacks.forEach((callback) => callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler)
        createWindowResizeHandler();
    return () => {
        windowCallbacks.delete(callback);
        if (!windowCallbacks.size &&
            typeof windowResizeHandler === "function") {
            window.removeEventListener("resize", windowResizeHandler);
            windowResizeHandler = undefined;
        }
    };
}


//# sourceMappingURL=handle-window.mjs.map


/***/ }),

/***/ 498727:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ PressGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(963969);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7823);
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15654);



function handlePressEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
        return;
    }
    if (node.animationState && props.whileTap) {
        node.animationState.setActive("whileTap", lifecycle === "Start");
    }
    const eventName = ("onTap" + (lifecycle === "End" ? "" : lifecycle));
    const callback = props[eventName];
    if (callback) {
        motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .frame */ .Gt.postRender(() => callback(event, (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__/* .extractEventInfo */ .e)(event)));
    }
}
class PressGesture extends motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .Feature */ .X {
    mount() {
        const { current } = this.node;
        if (!current)
            return;
        const { globalTapTarget, propagate } = this.node.props;
        this.unmount = (0,motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .press */ .c)(current, (_element, startEvent) => {
            handlePressEvent(this.node, startEvent, "Start");
            return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
        }, {
            useGlobalTarget: globalTapTarget,
            stopPropagation: propagate?.tap === false,
        });
    }
    unmount() { }
}


//# sourceMappingURL=press.mjs.map


/***/ }),

/***/ 503846:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ PanGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(963969);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6675);
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(762935);
/* harmony import */ var _utils_get_context_window_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(530346);
/* harmony import */ var _PanSession_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(171581);






const asyncHandler = (handler) => (event, info) => {
    if (handler) {
        motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .frame */ .Gt.update(() => handler(event, info), false, true);
    }
};
class PanGesture extends motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .Feature */ .X {
    constructor() {
        super(...arguments);
        this.removePointerDownListener = motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .noop */ .l;
    }
    onPointerDown(pointerDownEvent) {
        this.session = new _PanSession_mjs__WEBPACK_IMPORTED_MODULE_3__/* .PanSession */ .Q(pointerDownEvent, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: (0,_utils_get_context_window_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getContextWindow */ .s)(this.node),
        });
    }
    createPanHandlers() {
        const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: asyncHandler(onPanSessionStart),
            onStart: asyncHandler(onPanStart),
            onMove: asyncHandler(onPan),
            onEnd: (event, info) => {
                delete this.session;
                if (onPanEnd) {
                    motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .frame */ .Gt.postRender(() => onPanEnd(event, info));
                }
            },
        };
    }
    mount() {
        this.removePointerDownListener = (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_5__/* .addPointerEvent */ .h)(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
        this.removePointerDownListener();
        this.session && this.session.end();
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 504901:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ velocityPerSecond)
/* harmony export */ });
/*
  Convert velocity into velocity per second
*/
/*#__NO_SIDE_EFFECTS__*/
const velocityPerSecond = (velocity, frameDuration) => frameDuration ? velocity * (1000 / frameDuration) : 0;


//# sourceMappingURL=velocity-per-second.mjs.map


/***/ }),

/***/ 506339:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CQ: () => (/* binding */ calcLength),
/* harmony export */   HQ: () => (/* binding */ isNear),
/* harmony export */   N: () => (/* binding */ calcRelativeBox),
/* harmony export */   jA: () => (/* binding */ calcRelativePosition),
/* harmony export */   vb: () => (/* binding */ calcBoxDelta)
/* harmony export */ });
/* unused harmony exports calcAxisDelta, calcRelativeAxis, calcRelativeAxisPosition */
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(144914);


const SCALE_PRECISION = 0.0001;
const SCALE_MIN = 1 - SCALE_PRECISION;
const SCALE_MAX = 1 + SCALE_PRECISION;
const TRANSLATE_PRECISION = 0.01;
const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
    return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
    return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
    delta.origin = origin;
    delta.originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    delta.translate =
        (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(target.min, target.max, delta.origin) - delta.originPoint;
    if ((delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX) ||
        isNaN(delta.scale)) {
        delta.scale = 1.0;
    }
    if ((delta.translate >= TRANSLATE_MIN &&
        delta.translate <= TRANSLATE_MAX) ||
        isNaN(delta.translate)) {
        delta.translate = 0.0;
    }
}
function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : undefined);
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : undefined);
}
function calcRelativeAxis(target, relative, parent, anchor = 0) {
    const anchorPoint = anchor
        ? (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(parent.min, parent.max, anchor)
        : parent.min;
    target.min = anchorPoint + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent, anchor) {
    calcRelativeAxis(target.x, relative.x, parent.x, anchor?.x);
    calcRelativeAxis(target.y, relative.y, parent.y, anchor?.y);
}
function calcRelativeAxisPosition(target, layout, parent, anchor = 0) {
    const anchorPoint = anchor
        ? (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(parent.min, parent.max, anchor)
        : parent.min;
    target.min = layout.min - anchorPoint;
    target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent, anchor) {
    calcRelativeAxisPosition(target.x, layout.x, parent.x, anchor?.x);
    calcRelativeAxisPosition(target.y, layout.y, parent.y, anchor?.y);
}


//# sourceMappingURL=delta-calc.mjs.map


/***/ }),

/***/ 510799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ buildSVGPath)
/* harmony export */ });
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 *
 * Note: We use unitless values for stroke-dasharray and stroke-dashoffset
 * because Safari incorrectly scales px values when the page is zoomed.
 */
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset (unitless to avoid Safari zoom bug)
    attrs[keys.offset] = `${-offset}`;
    // Build the dash array (unitless to avoid Safari zoom bug)
    attrs[keys.array] = `${length} ${spacing}`;
}


//# sourceMappingURL=path.mjs.map


/***/ }),

/***/ 512474:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ replaceTransitionType)
/* harmony export */ });
/* harmony import */ var _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(833662);
/* harmony import */ var _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142587);
/* harmony import */ var _generators_spring_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(191887);




const transitionTypeMap = {
    decay: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__/* .inertia */ .B,
    inertia: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__/* .inertia */ .B,
    tween: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .keyframes */ .i,
    keyframes: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .keyframes */ .i,
    spring: _generators_spring_mjs__WEBPACK_IMPORTED_MODULE_2__/* .spring */ .o,
};
function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
        transition.type = transitionTypeMap[transition.type];
    }
}


//# sourceMappingURL=replace-transition-type.mjs.map


/***/ }),

/***/ 513002:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ color)
/* harmony export */ });
/* harmony import */ var _hex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(912461);
/* harmony import */ var _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(643956);
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(938520);




const color = {
    test: (v) => _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__/* .rgba */ .B.test(v) || _hex_mjs__WEBPACK_IMPORTED_MODULE_1__/* .hex */ .u.test(v) || _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V.test(v),
    parse: (v) => {
        if (_rgba_mjs__WEBPACK_IMPORTED_MODULE_0__/* .rgba */ .B.test(v)) {
            return _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__/* .rgba */ .B.parse(v);
        }
        else if (_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V.test(v)) {
            return _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V.parse(v);
        }
        else {
            return _hex_mjs__WEBPACK_IMPORTED_MODULE_1__/* .hex */ .u.parse(v);
        }
    },
    transform: (v) => {
        return typeof v === "string"
            ? v
            : v.hasOwnProperty("red")
                ? _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__/* .rgba */ .B.transform(v)
                : _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V.transform(v);
    },
    getAnimatableNone: (v) => {
        const parsed = color.parse(v);
        parsed.alpha = 0;
        return color.transform(parsed);
    },
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 519589:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ eachAxis)
/* harmony export */ });
function eachAxis(callback) {
    return [callback("x"), callback("y")];
}


//# sourceMappingURL=each-axis.mjs.map


/***/ }),

/***/ 520778:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ resolveElements)
/* harmony export */ });
function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
        return [];
    }
    if (elementOrSelector instanceof EventTarget) {
        return [elementOrSelector];
    }
    else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            root = scope.current;
        }
        const elements = selectorCache?.[elementOrSelector] ??
            root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element) => element != null);
}


//# sourceMappingURL=resolve-elements.mjs.map


/***/ }),

/***/ 521273:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ getOptimisedAppearId)
/* harmony export */ });
/* harmony import */ var _data_id_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719851);


function getOptimisedAppearId(visualElement) {
    return visualElement.props[_data_id_mjs__WEBPACK_IMPORTED_MODULE_0__/* .optimizedAppearDataAttribute */ .n];
}


//# sourceMappingURL=get-appear-id.mjs.map


/***/ }),

/***/ 523799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W_: () => (/* binding */ getMixer)
/* harmony export */ });
/* unused harmony exports mixArray, mixComplex, mixObject */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(447443);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(116038);
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(545756);
/* harmony import */ var _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(513002);
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(78027);
/* harmony import */ var _color_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(769274);
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(958904);
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(144914);
/* harmony import */ var _visibility_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(135369);









function mixNumber(a, b) {
    return (p) => (0,_number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber;
    }
    else if (typeof a === "string") {
        return (0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isCSSVariableToken */ .pG)(a)
            ? _immediate_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixImmediate */ .O
            : _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .color */ .y.test(a)
                ? _color_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mixColor */ .i
                : mixComplex;
    }
    else if (Array.isArray(a)) {
        return mixArray;
    }
    else if (typeof a === "object") {
        return _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .color */ .y.test(a) ? _color_mjs__WEBPACK_IMPORTED_MODULE_4__/* .mixColor */ .i : mixObject;
    }
    return _immediate_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixImmediate */ .O;
}
function mixArray(a, b) {
    const output = [...a];
    const numValues = output.length;
    const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
    return (p) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = { ...a, ...b };
    const blendValue = {};
    for (const key in output) {
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i = 0; i < target.values.length; i++) {
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = origin.values[originIndex] ?? 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target) => {
    const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .complex */ .f.createTransformer(target);
    const originStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .analyseComplexValue */ .Vf)(origin);
    const targetStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .analyseComplexValue */ .Vf)(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length &&
        originStats.indexes.color.length === targetStats.indexes.color.length &&
        originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if ((_visibility_mjs__WEBPACK_IMPORTED_MODULE_6__/* .invisibleValues */ .Q.has(origin) &&
            !targetStats.values.length) ||
            (_visibility_mjs__WEBPACK_IMPORTED_MODULE_6__/* .invisibleValues */ .Q.has(target) &&
                !originStats.values.length)) {
            return (0,_visibility_mjs__WEBPACK_IMPORTED_MODULE_6__/* .mixVisibility */ .v)(origin, target);
        }
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__/* .pipe */ .F)(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    }
    else {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__/* .warning */ .$)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixImmediate */ .O)(origin, target);
    }
};


//# sourceMappingURL=complex.mjs.map


/***/ }),

/***/ 530346:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ getContextWindow)
/* harmony export */ });
// Fixes https://github.com/motiondivision/motion/issues/2270
const getContextWindow = ({ current }) => {
    return current ? current.ownerDocument.defaultView : null;
};


//# sourceMappingURL=get-context-window.mjs.map


/***/ }),

/***/ 536060:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ mixValues)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144914);
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(922000);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(106370);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6675);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(350738);
/* harmony import */ var _utils_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74389);
/* harmony import */ var _value_utils_as_number_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14692);






const numBorders = _utils_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cornerRadiusProps */ .S.length;
const isPx = (value) => typeof value === "number" || _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px.test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
    if (shouldCrossfadeOpacity) {
        target.opacity = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(0, lead.opacity ?? 1, easeCrossfadeIn(progress));
        target.opacityExit = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(follow.opacity ?? 1, 0, easeCrossfadeOut(progress));
    }
    else if (isOnlyMember) {
        target.opacity = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(follow.opacity ?? 1, lead.opacity ?? 1, progress);
    }
    /**
     * Mix border radius
     */
    for (let i = 0; i < numBorders; i++) {
        const borderLabel = _utils_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cornerRadiusProps */ .S[i];
        let followRadius = getRadius(follow, borderLabel);
        let leadRadius = getRadius(lead, borderLabel);
        if (followRadius === undefined && leadRadius === undefined)
            continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        const canMix = followRadius === 0 ||
            leadRadius === 0 ||
            isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max((0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)((0,_value_utils_as_number_mjs__WEBPACK_IMPORTED_MODULE_3__/* .asNumber */ .i)(followRadius), (0,_value_utils_as_number_mjs__WEBPACK_IMPORTED_MODULE_3__/* .asNumber */ .i)(leadRadius), progress), 0);
            if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN.test(leadRadius) || _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN.test(followRadius)) {
                target[borderLabel] += "%";
            }
        }
        else {
            target[borderLabel] = leadRadius;
        }
    }
    /**
     * Mix rotation
     */
    if (follow.rotate || lead.rotate) {
        target.rotate = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mixNumber */ .k)(follow.rotate || 0, lead.rotate || 0, progress);
    }
}
function getRadius(values, radiusName) {
    return values[radiusName] !== undefined
        ? values[radiusName]
        : values.borderRadius;
}
const easeCrossfadeIn = /*@__PURE__*/ compress(0, 0.5, motion_utils__WEBPACK_IMPORTED_MODULE_4__/* .circOut */ .yT);
const easeCrossfadeOut = /*@__PURE__*/ compress(0.5, 0.95, motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .noop */ .l);
function compress(min, max, easing) {
    return (p) => {
        // Could replace ifs with clamp
        if (p < min)
            return 0;
        if (p > max)
            return 1;
        return easing((0,motion_utils__WEBPACK_IMPORTED_MODULE_6__/* .progress */ .q)(min, max, p));
    };
}


//# sourceMappingURL=mix-values.mjs.map


/***/ }),

/***/ 536866:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ camelCaseAttributes)
/* harmony export */ });
/**
 * A set of attribute names that are always read/written as camel case.
 */
const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
]);


//# sourceMappingURL=camel-case-attrs.mjs.map


/***/ }),

/***/ 538853:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ makeNoneKeyframesAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78027);
/* harmony import */ var _value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(419563);



/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */
const invalidTemplates = new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while (i < unresolvedKeyframes.length && !animatableTemplate) {
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" &&
            !invalidTemplates.has(keyframe) &&
            (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .hasComplexValues */ .nK)(keyframe)) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes) {
            /**
             * A zero-valued template like "0%" is already its own
             * animatable none, so there's nothing to derive.
             */
            if (unresolvedKeyframes[noneIndex] === animatableTemplate)
                continue;
            unresolvedKeyframes[noneIndex] = (0,_value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getAnimatableNone */ .J)(name, animatableTemplate);
        }
    }
}


//# sourceMappingURL=make-none-animatable.mjs.map


/***/ }),

/***/ 544170:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ FocusGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(963969);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(332241);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(447443);



class FocusGesture extends motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .Feature */ .X {
    constructor() {
        super(...arguments);
        this.isActive = false;
    }
    onFocus() {
        let isFocusVisible = false;
        /**
         * If this element doesn't match focus-visible then don't
         * apply whileHover. But, if matches throws that focus-visible
         * is not a valid selector then in that browser outline styles will be applied
         * to the element by default and we want to match that behaviour with whileFocus.
         */
        try {
            isFocusVisible = this.node.current.matches(":focus-visible");
        }
        catch (e) {
            isFocusVisible = true;
        }
        if (!isFocusVisible || !this.node.animationState)
            return;
        this.node.animationState.setActive("whileFocus", true);
        this.isActive = true;
    }
    onBlur() {
        if (!this.isActive || !this.node.animationState)
            return;
        this.node.animationState.setActive("whileFocus", false);
        this.isActive = false;
    }
    mount() {
        this.unmount = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .pipe */ .F)((0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .addDomEvent */ .k)(this.node.current, "focus", () => this.onFocus()), (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .addDomEvent */ .k)(this.node.current, "blur", () => this.onBlur()));
    }
    unmount() { }
}


//# sourceMappingURL=focus.mjs.map


/***/ }),

/***/ 544594:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ createSvgRenderState)
/* harmony export */ });
/* harmony import */ var _html_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(939755);


const createSvgRenderState = () => ({
    ...(0,_html_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createHtmlRenderState */ .d)(),
    attrs: {},
});


//# sourceMappingURL=create-render-state.mjs.map


/***/ }),

/***/ 544646:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ useSVGVisualState)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(928532);
/* harmony import */ var _motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(738964);
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(544594);
/* __next_internal_client_entry_do_not_use__ useSVGVisualState auto */ 


const useSVGVisualState = /*@__PURE__*/ (0,_motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__/* .makeUseVisualState */ .T)({
    scrapeMotionValuesFromProps: motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .scrapeMotionValuesFromProps */ .x,
    createRenderState: _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createSvgRenderState */ .s
});
 //# sourceMappingURL=use-svg-visual-state.mjs.map


/***/ }),

/***/ 545756:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j4: () => (/* binding */ isCSSVariableName),
/* harmony export */   pG: () => (/* binding */ isCSSVariableToken),
/* harmony export */   rm: () => (/* binding */ containsCSSVariable)
/* harmony export */ });
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = 
/*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = 
/*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
        return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
 * Check if a value contains a CSS variable anywhere (e.g. inside calc()).
 * Unlike isCSSVariableToken which checks if the value IS a var() token,
 * this checks if the value CONTAINS var() somewhere in the string.
 */
function containsCSSVariable(value) {
    if (typeof value !== "string")
        return false;
    // Strip comments to avoid false positives
    return value.split("/*")[0].includes("var(--");
}


//# sourceMappingURL=is-css-variable.mjs.map


/***/ }),

/***/ 550937:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ animateTarget)
/* harmony export */ });
/* harmony import */ var _utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(663293);
/* harmony import */ var _utils_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(596897);
/* harmony import */ var _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(967073);
/* harmony import */ var _render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(871929);
/* harmony import */ var _value_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(962087);
/* harmony import */ var _optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(521273);
/* harmony import */ var _motion_value_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31628);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(744557);









const isBrowser = typeof window !== "undefined";
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = key in protectedKeys && !needsAnimating[key];
    needsAnimating[key] = false;
    return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    let { transition, transitionEnd, ...target } = targetAndTransition;
    const defaultTransition = visualElement.getDefaultTransition();
    transition = transition
        ? (0,_utils_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resolveTransition */ .K)(transition, defaultTransition)
        : defaultTransition;
    const reduceMotion = transition?.reduceMotion;
    const skipAnimations = transition?.skipAnimations;
    if (transitionOverride)
        transition = transitionOverride;
    const animations = [];
    const animationTypeState = type && visualElement.animationState?.getState()[type];
    const path = transition?.path;
    if (path) {
        // path mutates `target` to claim x/y; loop below skips them.
        path.animateVisualElement(visualElement, target, transition, delay, animations);
    }
    for (const key in target) {
        const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
        const valueTarget = target[key];
        if (valueTarget === undefined ||
            (animationTypeState &&
                shouldBlockAnimation(animationTypeState, key))) {
            continue;
        }
        const valueTransition = {
            delay,
            ...(0,_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getValueTransition */ .r)(transition || {}, key),
        };
        if (skipAnimations)
            valueTransition.skipAnimations = true;
        /**
         * If the value is already at the defined target, skip the animation.
         * We still re-assert the value via frame.update to take precedence
         * over any stale transitionEnd callbacks from previous animations.
         */
        const currentValue = value.get();
        if (currentValue !== undefined &&
            !value.isAnimating() &&
            !Array.isArray(valueTarget) &&
            valueTarget === currentValue &&
            !valueTransition.velocity) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.update(() => value.set(valueTarget));
            continue;
        }
        /**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */
        let isHandoff = false;
        if (isBrowser && window.MotionHandoffAnimation) {
            const appearId = (0,_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getOptimisedAppearId */ .P)(visualElement);
            if (appearId) {
                const startTime = window.MotionHandoffAnimation(appearId, key, _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt);
                if (startTime !== null) {
                    valueTransition.startTime = startTime;
                    isHandoff = true;
                }
            }
        }
        (0,_value_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_4__/* .addValueToWillChange */ .g)(visualElement, key);
        const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
        value.start((0,_motion_value_mjs__WEBPACK_IMPORTED_MODULE_5__/* .animateMotionValue */ .f)(key, value, valueTarget, shouldReduceMotion && _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_6__/* .positionalKeys */ .$.has(key)
            ? { type: false }
            : valueTransition, visualElement, isHandoff));
        const animation = value.animation;
        if (animation) {
            animations.push(animation);
        }
    }
    if (transitionEnd) {
        const applyTransitionEnd = () => _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frame */ .Gt.update(() => {
            transitionEnd && (0,_render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_7__/* .setTarget */ .U)(visualElement, transitionEnd);
        });
        if (animations.length) {
            Promise.all(animations).then(applyTransitionEnd);
        }
        else {
            applyTransitionEnd();
        }
    }
    return animations;
}


//# sourceMappingURL=visual-element-target.mjs.map


/***/ }),

/***/ 565229:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ millisecondsToSeconds),
/* harmony export */   f: () => (/* binding */ secondsToMilliseconds)
/* harmony export */ });
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
/*#__NO_SIDE_EFFECTS__*/
const secondsToMilliseconds = (seconds) => seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/
const millisecondsToSeconds = (milliseconds) => milliseconds / 1000;


//# sourceMappingURL=time-conversion.mjs.map


/***/ }),

/***/ 569467:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ NativeAnimationExtended)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(91524);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(162735);
/* harmony import */ var _render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(448110);
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(481996);
/* harmony import */ var _NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(430388);
/* harmony import */ var _utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(512474);
/* harmony import */ var _waapi_utils_unsupported_easing_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(285427);








/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */
const sampleDelta = 10; //ms
class NativeAnimationExtended extends _NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_0__/* .NativeAnimation */ .m {
    constructor(options) {
        /**
         * The base NativeAnimation function only supports a subset
         * of Motion easings, and WAAPI also only supports some
         * easing functions via string/cubic-bezier definitions.
         *
         * This function replaces those unsupported easing functions
         * with a JS easing function. This will later get compiled
         * to a linear() easing function.
         */
        (0,_waapi_utils_unsupported_easing_mjs__WEBPACK_IMPORTED_MODULE_1__/* .replaceStringEasing */ .h)(options);
        /**
         * Ensure we replace the transition type with a generator function
         * before passing to WAAPI.
         *
         * TODO: Does this have a better home? It could be shared with
         * JSAnimation.
         */
        (0,_utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_2__/* .replaceTransitionType */ .E)(options);
        super(options);
        /**
         * Only set startTime when the animation should autoplay.
         * Setting startTime on a paused WAAPI animation unpauses it
         * (per the WAAPI spec), which breaks autoplay: false.
         */
        if (options.startTime !== undefined && options.autoplay !== false) {
            this.startTime = options.startTime;
        }
        this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read committed styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */
    updateMotionValue(value) {
        const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
        if (!motionValue)
            return;
        if (value !== undefined) {
            motionValue.set(value);
            return;
        }
        const sampleAnimation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__/* .JSAnimation */ .s({
            ...options,
            autoplay: false,
        });
        /**
         * Use wall-clock elapsed time for sampling.
         * Under CPU load, WAAPI's currentTime may not reflect actual
         * elapsed time, causing incorrect sampling and visual jumps.
         */
        const sampleTime = Math.max(sampleDelta, _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__/* .time */ .k.now() - this.startTime);
        const delta = (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .q)(0, sampleDelta, sampleTime - sampleDelta);
        const current = sampleAnimation.sample(sampleTime).value;
        /**
         * Write the estimated value to inline style so it persists
         * after cancel(), covering the async gap before the next
         * animation starts.
         */
        const { name } = this.options;
        if (element && name)
            (0,_render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_6__/* .setStyle */ .e)(element, name, current);
        motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
        sampleAnimation.stop();
    }
}


//# sourceMappingURL=NativeAnimationExtended.mjs.map


/***/ }),

/***/ 577514:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   xQ: () => (/* binding */ usePresence)
/* harmony export */ });
/* unused harmony exports isPresent, useIsPresent */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(364337);
/* __next_internal_client_entry_do_not_use__ isPresent,useIsPresent,usePresence auto */ 

/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed from the tree,
 * but `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */ function usePresence(subscribe = true) {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .PresenceContext */ .t);
    if (context === null) return [
        true,
        null
    ];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (subscribe) {
            return register(id);
        }
    }, [
        subscribe
    ]);
    const safeToRemove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>subscribe && onExitComplete && onExitComplete(id), [
        id,
        onExitComplete,
        subscribe
    ]);
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */ function useIsPresent() {
    return isPresent(useContext(PresenceContext));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
 //# sourceMappingURL=use-presence.mjs.map


/***/ }),

/***/ 583441:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ camelToDash)
/* harmony export */ });
function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}


//# sourceMappingURL=camel-to-dash.mjs.map


/***/ }),

/***/ 588818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ supportsLinearEasing)
/* harmony export */ });
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(483629);


const supportsLinearEasing = /*@__PURE__*/ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__/* .memoSupports */ .J)(() => {
    try {
        document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    }
    catch (e) {
        return false;
    }
    return true;
}, "linearEasing");


//# sourceMappingURL=linear-easing.mjs.map


/***/ }),

/***/ 588982:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ isSVGElement)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102389);


/**
 * Checks if an element is an SVG element in a way
 * that works across iframes
 */
function isSVGElement(element) {
    return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .G)(element) && "ownerSVGElement" in element;
}


//# sourceMappingURL=is-svg-element.mjs.map


/***/ }),

/***/ 595209:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ microtask)
/* harmony export */ });
/* unused harmony export cancelMicrotask */
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(921731);


const { schedule: microtask, cancel: cancelMicrotask } = 
/* @__PURE__ */ (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createRenderBatcher */ .I)(queueMicrotask, false);


//# sourceMappingURL=microtask.mjs.map


/***/ }),

/***/ 596897:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ resolveTransition)
/* harmony export */ });
/**
 * If `transition` has `inherit: true`, shallow-merge it with
 * `parentTransition` (child keys win) and strip the `inherit` key.
 * Otherwise return `transition` unchanged.
 */
function resolveTransition(transition, parentTransition) {
    if (transition?.inherit && parentTransition) {
        const { inherit: _, ...rest } = transition;
        return { ...parentTransition, ...rest };
    }
    return transition;
}


//# sourceMappingURL=resolve-transition.mjs.map


/***/ }),

/***/ 601409:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ hslaToRgba)
/* harmony export */ });
// Adapted from https://gist.github.com/mjackson/5311256
function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}


//# sourceMappingURL=hsla-to-rgba.mjs.map


/***/ }),

/***/ 609774:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ isGenerator)
/* harmony export */ });
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}


//# sourceMappingURL=is-generator.mjs.map


/***/ }),

/***/ 615712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(640902);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671775);
/* __next_internal_client_entry_do_not_use__ Button auto */ 


/**
 * A button component that can be used to trigger actions.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Button](https://base-ui.com/react/components/button)
 */ const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Button(componentProps, forwardedRef) {
    const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
    const { getButtonProps, buttonRef } = (0,_internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useButton */ .s)({
        disabled,
        focusableWhenDisabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            elementProps,
            getButtonProps
        ]
    });
});
if (false) {}


/***/ }),

/***/ 623781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ calcChildStagger)
/* harmony export */ });
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
    const index = Array.from(children)
        .sort((a, b) => a.sortNodePosition(b))
        .indexOf(child);
    const numChildren = children.size;
    const maxStaggerDuration = (numChildren - 1) * staggerChildren;
    const delayIsFunction = typeof delayChildren === "function";
    return delayIsFunction
        ? delayChildren(index, numChildren)
        : staggerDirection === 1
            ? index * staggerChildren
            : maxStaggerDuration - index * staggerChildren;
}


//# sourceMappingURL=calc-child-stagger.mjs.map


/***/ }),

/***/ 628265:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ge: () => (/* binding */ createBox),
/* harmony export */   xU: () => (/* binding */ createDelta)
/* harmony export */ });
/* unused harmony exports createAxis, createAxisDelta */
const createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
});
const createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta(),
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
    x: createAxis(),
    y: createAxis(),
});


//# sourceMappingURL=models.mjs.map


/***/ }),

/***/ 631094:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ stepsOrder)
/* harmony export */ });
const stepsOrder = [
    "setup", // Compute
    "read", // Read
    "resolveKeyframes", // Write/Read/Write/Read
    "preUpdate", // Compute
    "update", // Compute
    "preRender", // Compute
    "render", // Write
    "postRender", // Compute
];


//# sourceMappingURL=order.mjs.map


/***/ }),

/***/ 637374:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ai: () => (/* binding */ removeItem),
/* harmony export */   Kq: () => (/* binding */ addUniqueItem)
/* harmony export */ });
/* unused harmony export moveItem */
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
        arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
        arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}


//# sourceMappingURL=array.mjs.map


/***/ }),

/***/ 643956:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ hsla)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(320193);
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(922000);
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(255817);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(270813);





const hsla = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isColorString */ .$)("hsl", "hue"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__/* .splitColor */ .q)("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ("hsla(" +
            Math.round(hue) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__/* .sanitize */ .a)(saturation)) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__/* .percent */ .KN.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__/* .sanitize */ .a)(lightness)) +
            ", " +
            (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__/* .sanitize */ .a)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .alpha */ .X4.transform(alpha$1)) +
            ")");
    },
};


//# sourceMappingURL=hsla.mjs.map


/***/ }),

/***/ 645128:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ supportsScrollTimeline)
/* harmony export */ });
/* unused harmony export supportsViewTimeline */
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(483629);


const supportsScrollTimeline = /* @__PURE__ */ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__/* .memoSupports */ .J)(() => window.ScrollTimeline !== undefined, "scrollTimeline");
const supportsViewTimeline = /* @__PURE__ */ (/* unused pure expression or super */ null && (memoSupports(() => window.ViewTimeline !== undefined, "viewTimeline")));


//# sourceMappingURL=scroll-timeline.mjs.map


/***/ }),

/***/ 645618:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ createMotionProxy)
/* harmony export */ });
/* harmony import */ var _motion_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84824);



function createMotionProxy(preloadedFeatures, createVisualElement) {
    if (typeof Proxy === "undefined") {
        return _motion_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createMotionComponent */ .G;
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */
    const componentCache = new Map();
    const factory = (Component, options) => {
        return (0,_motion_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createMotionComponent */ .G)(Component, options, preloadedFeatures, createVisualElement);
    };
    /**
     * Support for deprecated`motion(Component)` pattern
     */
    const deprecatedFactoryFunction = (Component, options) => {
        if (false) {}
        return factory(Component, options);
    };
    return new Proxy(deprecatedFactoryFunction, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
        get: (_target, key) => {
            if (key === "create")
                return factory;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */
            if (!componentCache.has(key)) {
                componentCache.set(key, (0,_motion_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createMotionComponent */ .G)(key, undefined, preloadedFeatures, createVisualElement));
            }
            return componentCache.get(key);
        },
    });
}


//# sourceMappingURL=create-proxy.mjs.map


/***/ }),

/***/ 647740:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OU: () => (/* binding */ applyTreeDeltas),
/* harmony export */   Ql: () => (/* binding */ translateAxis),
/* harmony export */   Ww: () => (/* binding */ transformBox),
/* harmony export */   hq: () => (/* binding */ scalePoint),
/* harmony export */   o4: () => (/* binding */ applyBoxDelta)
/* harmony export */ });
/* unused harmony exports applyAxisDelta, applyPointDelta, transformAxis */
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144914);
/* harmony import */ var _utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260617);



/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for (let i = 0; i < treeLength; i++) {
        node = treePath[i];
        delta = node.projectionDelta;
        /**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */
        const { visualElement } = node.options;
        if (visualElement &&
            visualElement.props.style &&
            visualElement.props.style.display === "contents") {
            continue;
        }
        if (isSharedTransition &&
            node.options.layoutScroll &&
            node.scroll &&
            node !== node.root) {
            translateAxis(box.x, -node.scroll.offset.x);
            translateAxis(box.y, -node.scroll.offset.y);
        }
        if (delta) {
            // Incorporate each ancestor's scale into a cumulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .hasTransform */ .HD)(node.latestValues)) {
            transformBox(box, node.latestValues, node.layout?.layoutBox);
        }
    }
    /**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */
    if (treeScale.x < TREE_SCALE_SNAP_MAX &&
        treeScale.x > TREE_SCALE_SNAP_MIN) {
        treeScale.x = 1.0;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX &&
        treeScale.y > TREE_SCALE_SNAP_MIN) {
        treeScale.y = 1.0;
    }
}
function translateAxis(axis, distance) {
    axis.min += distance;
    axis.max += distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mixNumber */ .k)(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function resolveAxisTranslate(value, axis) {
    if (typeof value === "string") {
        return (parseFloat(value) / 100) * (axis.max - axis.min);
    }
    return value;
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function transformBox(box, transform, sourceBox) {
    const resolveBox = sourceBox ?? box;
    transformAxis(box.x, resolveAxisTranslate(transform.x, resolveBox.x), transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, resolveAxisTranslate(transform.y, resolveBox.y), transform.scaleY, transform.scale, transform.originY);
}


//# sourceMappingURL=delta-apply.mjs.map


/***/ }),

/***/ 663293:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ getValueTransition)
/* harmony export */ });
/* harmony import */ var _resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(596897);


function getValueTransition(transition, key) {
    const valueTransition = transition?.[key] ??
        transition?.["default"] ??
        transition;
    if (valueTransition !== transition) {
        return (0,_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resolveTransition */ .K)(valueTransition, transition);
    }
    return valueTransition;
}


//# sourceMappingURL=get-value-transition.mjs.map


/***/ }),

/***/ 665378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ maxGeneratorDuration),
/* harmony export */   t: () => (/* binding */ calcGeneratorDuration)
/* harmony export */ });
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator, timeStep = 50, maxDuration = maxGeneratorDuration, keyframes) {
    let duration = 0;
    let state = generator.next(duration);
    keyframes?.push(state.value);
    while (!state.done && duration < maxDuration) {
        duration += timeStep;
        state = generator.next(duration);
        keyframes?.push(state.value);
    }
    return duration >= maxDuration ? Infinity : duration;
}


//# sourceMappingURL=calc-duration.mjs.map


/***/ }),

/***/ 669126:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ SubscriptionManager)
/* harmony export */ });
/* harmony import */ var _array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(637374);


class SubscriptionManager {
    constructor() {
        this.subscriptions = [];
    }
    add(handler) {
        (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__/* .addUniqueItem */ .Kq)(this.subscriptions, handler);
        return () => this.remove(handler);
    }
    remove(handler) {
        (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__/* .removeItem */ .Ai)(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (let i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}


//# sourceMappingURL=subscription-manager.mjs.map


/***/ }),

/***/ 669390:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ NodeStack)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(637374);


class NodeStack {
    constructor() {
        this.members = [];
    }
    add(node) {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .addUniqueItem */ .Kq)(this.members, node);
        for (let i = this.members.length - 1; i >= 0; i--) {
            const member = this.members[i];
            if (member === node || member === this.lead || member === this.prevLead)
                continue;
            const inst = member.instance;
            if ((!inst || inst.isConnected === false) && !member.snapshot) {
                (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .removeItem */ .Ai)(this.members, member);
                member.unmount();
            }
        }
        node.scheduleRender();
    }
    remove(node) {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .removeItem */ .Ai)(this.members, node);
        if (node === this.prevLead)
            this.prevLead = undefined;
        if (node === this.lead) {
            const prevLead = this.members[this.members.length - 1];
            if (prevLead)
                this.promote(prevLead);
        }
    }
    relegate(node) {
        for (let i = this.members.indexOf(node) - 1; i >= 0; i--) {
            const member = this.members[i];
            if (member.isPresent !== false && member.instance?.isConnected !== false) {
                this.promote(member);
                return true;
            }
        }
        return false;
    }
    promote(node, preserveFollowOpacity) {
        const prevLead = this.lead;
        if (node === prevLead)
            return;
        this.prevLead = prevLead;
        this.lead = node;
        node.show();
        if (prevLead) {
            prevLead.updateSnapshot();
            node.scheduleRender();
            const { layoutDependency: prevDep } = prevLead.options;
            const { layoutDependency: nextDep } = node.options;
            if (prevDep === undefined || prevDep !== nextDep) {
                node.resumeFrom = prevLead;
                if (preserveFollowOpacity)
                    prevLead.preserveOpacity = true;
                if (prevLead.snapshot) {
                    node.snapshot = prevLead.snapshot;
                    node.snapshot.latestValues =
                        prevLead.animationValues || prevLead.latestValues;
                }
                if (node.root?.isUpdating)
                    node.isLayoutDirty = true;
            }
            if (node.options.crossfade === false)
                prevLead.hide();
        }
    }
    exitAnimationComplete() {
        this.members.forEach((member) => {
            member.options.onExitComplete?.();
            member.resumingFrom?.options.onExitComplete?.();
        });
    }
    scheduleRender() {
        this.members.forEach((member) => member.instance && member.scheduleRender(false));
    }
    removeLeadSnapshot() {
        if (this.lead?.snapshot)
            this.lead.snapshot = undefined;
    }
}


//# sourceMappingURL=stack.mjs.map


/***/ }),

/***/ 673109:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ isHTMLElement)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102389);


/**
 * Checks if an element is an HTML element in a way
 * that works across iframes
 */
function isHTMLElement(element) {
    return ((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .G)(element) &&
        "offsetHeight" in element &&
        !("ownerSVGElement" in element));
}


//# sourceMappingURL=is-html-element.mjs.map


/***/ }),

/***/ 681343:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ mirrorEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
/*#__NO_SIDE_EFFECTS__*/
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;


//# sourceMappingURL=mirror.mjs.map


/***/ }),

/***/ 688222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ isAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78027);


/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
const isAnimatable = (value, name) => {
    // If the list of keys that might be non-animatable grows, replace with Set
    if (name === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        (_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f.test(value) || value === "0") && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};


//# sourceMappingURL=is-animatable.mjs.map


/***/ }),

/***/ 694290:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ motionComponentSymbol)
/* harmony export */ });
const motionComponentSymbol = Symbol.for("motionComponentSymbol");


//# sourceMappingURL=symbol.mjs.map


/***/ }),

/***/ 694307:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ isBezierDefinition)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";


//# sourceMappingURL=is-bezier-definition.mjs.map


/***/ }),

/***/ 694696:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ib: () => (/* binding */ readTransformValue),
/* harmony export */   ry: () => (/* binding */ parseValueFromTransform),
/* harmony export */   zs: () => (/* binding */ defaultTransformValue)
/* harmony export */ });
const radToDeg = (rad) => (rad * 180) / Math.PI;
const rotate = (v) => {
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v) => radToDeg(Math.atan(v[1])),
    skewY: (v) => radToDeg(Math.atan(v[2])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2,
};
const rebaseAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0)
        angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v) => (scaleX(v) + scaleY(v)) / 2,
    rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v) => radToDeg(Math.atan(v[4])),
    skewY: (v) => radToDeg(Math.atan(v[1])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2,
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    }
    else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function"
        ? valueParser(values)
        : values[valueParser];
}
const readTransformValue = (instance, name) => {
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}


//# sourceMappingURL=parse-transform.mjs.map


/***/ }),

/***/ 706941:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ memo)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
function memo(callback) {
    let result;
    return () => {
        if (result === undefined)
            result = callback();
        return result;
    };
}


//# sourceMappingURL=memo.mjs.map


/***/ }),

/***/ 708889:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ isAnimationControls)
/* harmony export */ });
function isAnimationControls(v) {
    return (v !== null &&
        typeof v === "object" &&
        typeof v.start === "function");
}


//# sourceMappingURL=is-animation-controls.mjs.map


/***/ }),

/***/ 711039:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ colorRegex)
/* harmony export */ });
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;


//# sourceMappingURL=color-regex.mjs.map


/***/ }),

/***/ 719851:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ optimizedAppearDataAttribute)
/* harmony export */ });
/* unused harmony export optimizedAppearDataId */
/* harmony import */ var _render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(583441);


const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + (0,_render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__/* .camelToDash */ .I)(optimizedAppearDataId);


//# sourceMappingURL=data-id.mjs.map


/***/ }),

/***/ 720288:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ isNumericalString)
/* harmony export */ });
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);


//# sourceMappingURL=is-numerical-string.mjs.map


/***/ }),

/***/ 721814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ mapEasingToNativeEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(694307);
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(588818);
/* harmony import */ var _utils_linear_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73873);
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(483736);
/* harmony import */ var _supported_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(760140);






function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    }
    else if (typeof easing === "function") {
        return (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_0__/* .supportsLinearEasing */ .n)()
            ? (0,_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_1__/* .generateLinearEasing */ .K)(easing, duration)
            : "ease-out";
    }
    else if ((0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .isBezierDefinition */ .D)(easing)) {
        return (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_3__/* .cubicBezierAsString */ .d)(easing);
    }
    else if (Array.isArray(easing)) {
        return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) ||
            _supported_mjs__WEBPACK_IMPORTED_MODULE_4__/* .supportedWaapiEasing */ .e.easeOut);
    }
    else {
        return _supported_mjs__WEBPACK_IMPORTED_MODULE_4__/* .supportedWaapiEasing */ .e[easing];
    }
}


//# sourceMappingURL=map-easing.mjs.map


/***/ }),

/***/ 723207:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ HTMLProjectionNode)
/* harmony export */ });
/* unused harmony export rootProjectionNode */
/* harmony import */ var _create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(872956);
/* harmony import */ var _DocumentProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(184495);



const rootProjectionNode = {
    current: undefined,
};
const HTMLProjectionNode = (0,_create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createProjectionNode */ .u0)({
    measureScroll: (instance) => ({
        x: instance.scrollLeft,
        y: instance.scrollTop,
    }),
    defaultParent: () => {
        if (!rootProjectionNode.current) {
            const documentNode = new _DocumentProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DocumentProjectionNode */ .B({});
            documentNode.mount(window);
            documentNode.setOptions({ layoutScroll: true });
            rootProjectionNode.current = documentNode;
        }
        return rootProjectionNode.current;
    },
    resetTransform: (instance, value) => {
        instance.style.transform = value !== undefined ? value : "none";
    },
    checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed"),
});


//# sourceMappingURL=HTMLProjectionNode.mjs.map


/***/ }),

/***/ 725097:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ createDomVisualElement)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(947862);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(810014);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(159628);




const createDomVisualElement = (Component, options) => {
    /**
     * Use explicit isSVG override if provided, otherwise auto-detect
     */
    const isSVG = options.isSVG ?? (0,_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isSVGComponent */ .Q)(Component);
    return isSVG
        ? new motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .SVGVisualElement */ .l(options)
        : new motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .HTMLVisualElement */ .M(options, {
            allowProjection: Component !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
        });
};


//# sourceMappingURL=create-visual-element.mjs.map


/***/ }),

/***/ 725222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ frameData)
/* harmony export */ });
/**
 * The frameloop's state, kept apart from the frameloop itself so that
 * reading it doesn't bundle the scheduler.
 */
const frameData = {
    delta: 0.0,
    timestamp: 0.0,
    isProcessing: false,
};


//# sourceMappingURL=frame-data.mjs.map


/***/ }),

/***/ 733616:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ HoverGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(963969);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(107993);
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15654);



function handleHoverEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileHover) {
        node.animationState.setActive("whileHover", lifecycle === "Start");
    }
    const eventName = ("onHover" + lifecycle);
    const callback = props[eventName];
    if (callback) {
        motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .frame */ .Gt.postRender(() => callback(event, (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__/* .extractEventInfo */ .e)(event)));
    }
}
class HoverGesture extends motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .Feature */ .X {
    mount() {
        const { current } = this.node;
        if (!current)
            return;
        this.unmount = (0,motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .hover */ .P)(current, (_element, startEvent) => {
            handleHoverEvent(this.node, startEvent, "Start");
            return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
        });
    }
    unmount() { }
}


//# sourceMappingURL=hover.mjs.map


/***/ }),

/***/ 737187:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ auto)
/* harmony export */ });
/**
 * ValueType for "auto"
 */
const auto = {
    test: (v) => v === "auto",
    parse: (v) => v,
};


//# sourceMappingURL=auto.mjs.map


/***/ }),

/***/ 738964:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ makeUseVisualState)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125217);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(938394);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(708889);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(126340);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(212027);
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(364337);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(982423);
/* __next_internal_client_entry_do_not_use__ makeUseVisualState auto */ 




function makeState({ scrapeMotionValuesFromProps, createRenderState }, props, context, presenceContext) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
    return state;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for(const key in motionValues){
        values[key] = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .resolveMotionValue */ .u)(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isControllingVariants */ .e)(props);
    const isVariantNode$1 = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isVariantNode */ .O)(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === undefined) initial = context.initial;
        if (animate === undefined) animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !(0,motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .isAnimationControls */ .N)(variantToSet)) {
        const list = Array.isArray(variantToSet) ? variantToSet : [
            variantToSet
        ];
        for(let i = 0; i < list.length; i++){
            const resolved = (0,motion_dom__WEBPACK_IMPORTED_MODULE_4__/* .resolveVariantFromProps */ .a)(props, list[i]);
            if (resolved) {
                const { transitionEnd, transition, ...target } = resolved;
                for(const key in target){
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */ const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for(const key in transitionEnd){
                    values[key] = transitionEnd[key];
                }
            }
        }
    }
    return values;
}
const makeUseVisualState = (config)=>(props, isStatic)=>{
        const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_5__/* .MotionContext */ .A);
        const presenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .PresenceContext */ .t);
        const make = ()=>makeState(config, props, context, presenceContext);
        return isStatic ? make() : (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useConstant */ .M)(make);
    };
 //# sourceMappingURL=use-visual-state.mjs.map


/***/ }),

/***/ 744557:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gt: () => (/* binding */ frame),
/* harmony export */   PP: () => (/* binding */ frameSteps),
/* harmony export */   WG: () => (/* binding */ cancelFrame)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6675);
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(921731);
/* harmony import */ var _frame_data_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(725222);




const { schedule: frame, cancel: cancelFrame, steps: frameSteps, } = /* @__PURE__ */ (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_0__/* .createRenderBatcher */ .I)(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .l, true, _frame_data_mjs__WEBPACK_IMPORTED_MODULE_2__/* .frameData */ .u);


//# sourceMappingURL=frame.mjs.map


/***/ }),

/***/ 752615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ isKeyframesTarget)
/* harmony export */ });
const isKeyframesTarget = (v) => {
    return Array.isArray(v);
};


//# sourceMappingURL=is-keyframes-target.mjs.map


/***/ }),

/***/ 760140:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ supportedWaapiEasing)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(483736);


const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezierAsString */ .d)([0, 0.65, 0.55, 1]),
    circOut: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezierAsString */ .d)([0.55, 0, 1, 0.45]),
    backIn: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezierAsString */ .d)([0.31, 0.01, 0.66, -0.59]),
    backOut: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezierAsString */ .d)([0.33, 1.53, 0.69, 0.99]),
};


//# sourceMappingURL=supported.mjs.map


/***/ }),

/***/ 761024:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ resolveVariant),
/* harmony export */   Q: () => (/* binding */ getTypeCustom)
/* harmony export */ });
/* harmony import */ var _resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(126340);


function resolveVariant(visualElement, definition, custom) {
    return (0,_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resolveVariantFromProps */ .a)(visualElement.getProps(), definition, custom, visualElement);
}
/**
 * Exit variants resolve with AnimatePresence's custom, every other type
 * with the element's own.
 */
const getTypeCustom = (visualElement, type) => type === "exit" ? visualElement.presenceContext?.custom : undefined;


//# sourceMappingURL=resolve-dynamic-variants.mjs.map


/***/ }),

/***/ 762935:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ addPointerEvent)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(332241);
/* harmony import */ var _event_info_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15654);



function addPointerEvent(target, eventName, handler, options) {
    return (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .addDomEvent */ .k)(target, eventName, (0,_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__/* .addPointerInfo */ .F)(handler), options);
}


//# sourceMappingURL=add-pointer-event.mjs.map


/***/ }),

/***/ 765386:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ frameloopDriver)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(162735);
/* harmony import */ var _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(725222);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(744557);




const frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
        start: (keepAlive = true) => _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__/* .frame */ .Gt.update(passTimestamp, keepAlive),
        stop: () => (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cancelFrame */ .WG)(passTimestamp),
        /**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */
        now: () => (_frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__/* .frameData */ .u.isProcessing ? _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_1__/* .frameData */ .u.timestamp : _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_2__/* .time */ .k.now()),
    };
};


//# sourceMappingURL=frame.mjs.map


/***/ }),

/***/ 769274:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ mixColor)
/* harmony export */ });
/* unused harmony export mixLinearColor */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(116038);
/* harmony import */ var _value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(912461);
/* harmony import */ var _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(643956);
/* harmony import */ var _value_types_color_hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(601409);
/* harmony import */ var _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(938520);
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(958904);
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(144914);








// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [_value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_0__/* .hex */ .u, _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_1__/* .rgba */ .B, _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    if (!type) {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__/* .warning */ .$)(false, `'${color}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
        return false;
    }
    let model = type.parse(color);
    if (type === _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__/* .hsla */ .V) {
        // TODO Remove this cast - needed since Motion's stricter typing
        model = (0,_value_types_color_hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__/* .hslaToRgba */ .a)(model);
    }
    return model;
}
const mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_5__/* .mixImmediate */ .O)(from, to);
    }
    const blended = { ...fromRGBA };
    return (v) => {
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = (0,_number_mjs__WEBPACK_IMPORTED_MODULE_6__/* .mixNumber */ .k)(fromRGBA.alpha, toRGBA.alpha, v);
        return _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_1__/* .rgba */ .B.transform(blended);
    };
};


//# sourceMappingURL=color.mjs.map


/***/ }),

/***/ 773019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ mix)
/* harmony export */ });
/* harmony import */ var _value_types_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255817);
/* harmony import */ var _complex_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(523799);
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144914);




/**
 * A single number with an optional unit, e.g. "50%", "-10px", ".5em".
 * Exponents don't match, so they fall through to the complex mixer.
 */
const unitValue = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
/**
 * Most CSS values Motion mixes are a single number with a unit. Mixing
 * these directly produces the same output as the complex mixer
 * ("25%", "0.33333px") without tokenising both strings.
 */
function mixUnit(from, to) {
    const a = unitValue.exec(from);
    if (!a)
        return;
    const b = unitValue.exec(to);
    if (!b || a[2] !== b[2])
        return;
    const unit = a[2];
    const origin = parseFloat(a[1]);
    const target = parseFloat(b[1]);
    return (p) => (0,_value_types_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_0__/* .sanitize */ .a)((0,_number_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mixNumber */ .k)(origin, target, p)) + unit;
}
function mix(from, to, p) {
    if (typeof from === "number" &&
        typeof to === "number" &&
        typeof p === "number") {
        return (0,_number_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mixNumber */ .k)(from, to, p);
    }
    if (typeof from === "string" && typeof to === "string") {
        const mixer = mixUnit(from, to);
        if (mixer)
            return mixer;
    }
    const mixer = (0,_complex_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getMixer */ .W_)(from);
    return mixer(from, to);
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 774235:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ correctBorderRadius)
/* harmony export */ });
/* unused harmony export pixelsToPercent */
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(922000);


function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
        return 0;
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
const correctBorderRadius = {
    correct: (latest, node) => {
        if (!node.target)
            return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */
        if (typeof latest === "string") {
            if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.test(latest)) {
                latest = parseFloat(latest);
            }
            else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */
        const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    },
};


//# sourceMappingURL=scale-border-radius.mjs.map


/***/ }),

/***/ 778399:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ setDragLock)
/* harmony export */ });
/* harmony import */ var _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(402107);


function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
        if (_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I[axis]) {
            return null;
        }
        else {
            _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I[axis] = true;
            return () => {
                _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I[axis] = false;
            };
        }
    }
    else {
        if (_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.x || _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.y) {
            return null;
        }
        else {
            _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.x = _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.y = true;
            return () => {
                _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.x = _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isDragging */ .I.y = false;
            };
        }
    }
}


//# sourceMappingURL=set-active.mjs.map


/***/ }),

/***/ 793869:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ animateVisualElement)
/* harmony export */ });
/* harmony import */ var _render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(761024);
/* harmony import */ var _visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(550937);
/* harmony import */ var _visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(902945);




function animateVisualElement(visualElement, definition, options = {}) {
    visualElement.notify("AnimationStart", definition);
    const animation = Array.isArray(definition)
        ? Promise.all(definition.map((variant) => (0,_visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__/* .animateVariant */ .l)(visualElement, variant, options)))
        : typeof definition === "string"
            ? (0,_visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__/* .animateVariant */ .l)(visualElement, definition, options)
            : Promise.all((0,_visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__/* .animateTarget */ .$)(visualElement, (0,_render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .resolveVariant */ .K)(visualElement, definition, options.custom), options));
    return animation.then(() => {
        visualElement.notify("AnimationComplete", definition);
    });
}


//# sourceMappingURL=visual-element.mjs.map


/***/ }),

/***/ 796387:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ shallowCompare)
/* harmony export */ });
function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
        return false;
    const prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (let i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}


//# sourceMappingURL=shallow-compare.mjs.map


/***/ }),

/***/ 802007:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FY: () => (/* binding */ convertBoundingBoxToBox),
/* harmony export */   bS: () => (/* binding */ transformBoxPoints),
/* harmony export */   pA: () => (/* binding */ convertBoxToBoundingBox)
/* harmony export */ });
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToBox({ top, left, right, bottom, }) {
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertBoxToBoundingBox({ x, y }) {
    return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoxPoints(point, transformPoint) {
    if (!transformPoint)
        return point;
    const topLeft = transformPoint({ x: point.left, y: point.top });
    const bottomRight = transformPoint({ x: point.right, y: point.bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}


//# sourceMappingURL=conversion.mjs.map


/***/ }),

/***/ 806069:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ createRenderStep)
/* harmony export */ });
function createRenderStep(runNextFrame) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */
    let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */
    let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     * A keepAlive process is always also held by a frame queue until
     * it's cancelled, so a Set has the same lifetime semantics as a
     * WeakSet here while being considerably faster to query every frame.
     */
    const toKeepAlive = new Set();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false,
    };
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            nextFrame.add(callback);
            runNextFrame();
        }
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */
        cancel: (callback) => {
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */
        process: (frameData) => {
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            // Swap this frame and the next to avoid GC
            const prevFrame = thisFrame;
            thisFrame = nextFrame;
            nextFrame = prevFrame;
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}


//# sourceMappingURL=render-step.mjs.map


/***/ }),

/***/ 807953:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ VisualElementDragControls)
/* harmony export */ });
/* unused harmony export elementDragControls */
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(628265);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(778399);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(519589);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(922000);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(506339);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(744557);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(962087);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(393062);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(802007);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(31628);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(144914);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(130586);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(332241);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(866451);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(116038);
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(762935);
/* harmony import */ var _utils_get_context_window_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(530346);
/* harmony import */ var _utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(975719);
/* harmony import */ var _pan_PanSession_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(171581);
/* harmony import */ var _utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(854643);








const elementDragControls = new WeakMap();
class VisualElementDragControls {
    constructor(visualElement) {
        this.openDragLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = { x: 0, y: 0 };
        /**
         * The permitted boundaries of travel, in pixels.
         */
        this.constraints = false;
        this.hasMutatedConstraints = false;
        /**
         * The per-axis resolved elastic values.
         */
        this.elastic = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .createBox */ .ge)();
        /**
         * The latest pointer event. Used as fallback when the `cancel` and `stop` functions are called without arguments.
         */
        this.latestPointerEvent = null;
        /**
         * The latest pan info. Used as fallback when the `cancel` and `stop` functions are called without arguments.
         */
        this.latestPanInfo = null;
        this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
        /**
         * Don't start dragging if this component is exiting
         */
        const { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false)
            return;
        const onSessionStart = (event) => {
            if (snapToCursor)
                this.snapToCursor(event);
            this.stopAnimation();
        };
        const onStart = (event, info) => {
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            const { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation) {
                if (this.openDragLock)
                    this.openDragLock();
                this.openDragLock = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .setDragLock */ .W)(drag);
                // If we don 't have the lock, don't start dragging
                if (!this.openDragLock)
                    return;
            }
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            /**
             * Record gesture origin and pointer offset
             */
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
                let current = this.getAxisMotionValue(axis).get() || 0;
                /**
                 * If the MotionValue is a percentage value convert to px
                 */
                if (motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .percent */ .KN.test(current)) {
                    const { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        const measuredAxis = projection.layout.layoutBox[axis];
                        if (measuredAxis) {
                            const length = (0,motion_dom__WEBPACK_IMPORTED_MODULE_4__/* .calcLength */ .CQ)(measuredAxis);
                            current = length * (parseFloat(current) / 100);
                        }
                    }
                }
                this.originPoint[axis] = current;
            });
            // Fire onDragStart event
            if (onDragStart) {
                motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.update(() => onDragStart(event, info), false, true);
            }
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_6__/* .addValueToWillChange */ .g)(this.visualElement, "transform");
            const { animationState } = this.visualElement;
            animationState && animationState.setActive("whileDrag", true);
        };
        const onMove = (event, info) => {
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag, } = this.getProps();
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !this.openDragLock)
                return;
            const { offset } = info;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (this.currentDirection !== null) {
                    onDirectionLock && onDirectionLock(this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            this.updateAxis("x", info.point, offset);
            this.updateAxis("y", info.point, offset);
            /**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */
            this.visualElement.render();
            /**
             * This must fire after the render call as it might trigger a state
             * change which itself might trigger a layout update.
             */
            if (onDrag) {
                motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.update(() => onDrag(event, info), false, true);
            }
        };
        const onSessionEnd = (event, info) => {
            this.latestPointerEvent = event;
            this.latestPanInfo = info;
            this.stop(event, info);
            this.latestPointerEvent = null;
            this.latestPanInfo = null;
        };
        const resumeAnimation = () => {
            const { dragSnapToOrigin: snap } = this.getProps();
            if (snap || this.constraints) {
                this.startAnimation({ x: 0, y: 0 });
            }
        };
        const { dragSnapToOrigin } = this.getProps();
        this.panSession = new _pan_PanSession_mjs__WEBPACK_IMPORTED_MODULE_7__/* .PanSession */ .Q(originEvent, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation,
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
            distanceThreshold,
            contextWindow: (0,_utils_get_context_window_mjs__WEBPACK_IMPORTED_MODULE_8__/* .getContextWindow */ .s)(this.visualElement),
            element: this.visualElement.current,
        });
    }
    /**
     * @internal
     */
    stop(event, panInfo) {
        const finalEvent = event || this.latestPointerEvent;
        const finalPanInfo = panInfo || this.latestPanInfo;
        const isDragging = this.isDragging;
        this.cancel();
        if (!isDragging || !finalPanInfo || !finalEvent)
            return;
        const { velocity } = finalPanInfo;
        this.startAnimation(velocity);
        const { onDragEnd } = this.getProps();
        if (onDragEnd) {
            motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.postRender(() => onDragEnd(finalEvent, finalPanInfo));
        }
    }
    /**
     * @internal
     */
    cancel() {
        this.isDragging = false;
        const { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        this.endPanSession();
        const { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openDragLock) {
            this.openDragLock();
            this.openDragLock = null;
        }
        animationState && animationState.setActive("whileDrag", false);
    }
    /**
     * Clean up the pan session without modifying other drag state.
     * This is used during unmount to ensure event listeners are removed
     * without affecting projection animations or drag locks.
     * @internal
     */
    endPanSession() {
        this.panSession && this.panSession.end();
        this.panSession = undefined;
    }
    updateAxis(axis, _point, offset) {
        const { drag } = this.getProps();
        // If we're not dragging this axis, do an early return.
        if (!offset || !shouldDrag(axis, drag, this.currentDirection))
            return;
        const axisValue = this.getAxisMotionValue(axis);
        let next = this.originPoint[axis] + offset[axis];
        // Apply constraints
        if (this.constraints && this.constraints[axis]) {
            next = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .applyConstraints */ .Zq)(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    }
    resolveConstraints() {
        const { dragConstraints, dragElastic } = this.getProps();
        const layout = this.visualElement.projection &&
            !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(false)
            : this.visualElement.projection?.layout;
        const prevConstraints = this.constraints;
        if (dragConstraints && (0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isRefObject */ .X)(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        }
        else {
            if (dragConstraints && layout) {
                this.constraints = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .calcRelativeConstraints */ ._c)(layout.layoutBox, dragConstraints);
            }
            else {
                this.constraints = false;
            }
        }
        this.elastic = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .resolveDragElastic */ .my)(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative. This only applies to relative (non-ref)
         * constraints, as ref-based constraints from calcViewportConstraints are already in the
         * correct coordinate space for the motion value transform offset.
         */
        if (prevConstraints !== this.constraints &&
            !(0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isRefObject */ .X)(dragConstraints) &&
            layout &&
            this.constraints &&
            !this.hasMutatedConstraints) {
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
                if (this.constraints !== false &&
                    this.getAxisMotionValue(axis)) {
                    this.constraints[axis] = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .rebaseAxisConstraints */ .QX)(layout.layoutBox[axis], this.constraints[axis]);
                }
            });
        }
    }
    resolveRefConstraints() {
        const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
        if (!constraints || !(0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isRefObject */ .X)(constraints))
            return false;
        const constraintsElement = constraints.current;
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_11__/* .invariant */ .V)(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        const { projection } = this.visualElement;
        // TODO
        if (!projection || !projection.layout)
            return false;
        /**
         * Refresh the root scroll offset so the constraint's viewport box
         * translates to correct page coordinates. The scroll captured at
         * drag mount can be stale if the document was scrolled afterwards —
         * e.g. via the browser restoring scroll on refresh, or an ancestor
         * layout effect running after this element's mount (#2829).
         *
         * Clear the cached scroll first so `updateScroll` bypasses its
         * per-animationId cache and re-reads the live value.
         */
        if (projection.root) {
            projection.root.scroll = undefined;
            projection.root.updateScroll();
        }
        const constraintsBox = (0,motion_dom__WEBPACK_IMPORTED_MODULE_12__/* .measurePageBox */ .L)(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        let measuredConstraints = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .calcViewportConstraints */ .iT)(projection.layout.layoutBox, constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */
        if (onMeasureDragConstraints) {
            const userConstraints = onMeasureDragConstraints((0,motion_dom__WEBPACK_IMPORTED_MODULE_13__/* .convertBoxToBoundingBox */ .pA)(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = (0,motion_dom__WEBPACK_IMPORTED_MODULE_13__/* .convertBoundingBoxToBox */ .FY)(userConstraints);
            }
        }
        return measuredConstraints;
    }
    startAnimation(velocity) {
        const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd, } = this.getProps();
        const constraints = this.constraints || {};
        const momentumAnimations = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
            if (!shouldDrag(axis, drag, this.currentDirection)) {
                return;
            }
            let transition = (constraints && constraints[axis]) || {};
            if (dragSnapToOrigin === true ||
                dragSnapToOrigin === axis)
                transition = { min: 0, max: 0 };
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */
            const bounceStiffness = dragElastic ? 200 : 1000000;
            const bounceDamping = dragElastic ? 40 : 10000000;
            const inertia = {
                type: "inertia",
                velocity: dragMomentum ? velocity[axis] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...transition,
            };
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return this.startAxisValueAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
        const axisValue = this.getAxisMotionValue(axis);
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_6__/* .addValueToWillChange */ .g)(this.visualElement, axis);
        return axisValue.start((0,motion_dom__WEBPACK_IMPORTED_MODULE_14__/* .animateMotionValue */ .f)(axis, axisValue, 0, transition, this.visualElement, false));
    }
    stopAnimation() {
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => this.getAxisMotionValue(axis).stop());
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    getAxisMotionValue(axis) {
        const dragKey = `_drag${axis.toUpperCase()}`;
        const props = this.visualElement.getProps();
        const externalMotionValue = props[dragKey];
        return externalMotionValue
            ? externalMotionValue
            : this.visualElement.getValue(axis, this.visualElement.latestValues[axis] ?? 0);
    }
    /**
     * Measure the live box - projection.layout may or may not include the
     * drag transform, depending on when it was measured.
     */
    snapToCursor({ clientX, clientY }) {
        const { drag } = this.getProps();
        const point = { x: clientX, y: clientY };
        const cursor = this.visualElement.getTransformPagePoint()?.(point) || point;
        const box = this.visualElement.measureViewportBox();
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
            if (!shouldDrag(axis, drag, this.currentDirection))
                return;
            const axisValue = this.getAxisMotionValue(axis);
            const { min, max } = box[axis];
            axisValue.set((axisValue.get() || 0) + cursor[axis] - (0,motion_dom__WEBPACK_IMPORTED_MODULE_15__/* .mixNumber */ .k)(min, max, 0.5));
        });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const { drag, dragConstraints } = this.getProps();
        const { projection } = this.visualElement;
        if (!(0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isRefObject */ .X)(dragConstraints) || !projection || !this.constraints)
            return;
        /**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */
        this.stopAnimation();
        /**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */
        const constraints = this.constraints;
        const boxProgress = { x: 0, y: 0 };
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
            const latest = this.getAxisMotionValue(axis).get();
            boxProgress[axis] = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .calcOrigin */ .Yu)({ min: latest, max: latest }, constraints[axis]);
        });
        /**
         * Update the layout of this element and resolve the latest drag constraints
         */
        const { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
        /**
         * Reset constraints so resolveConstraints() will recalculate them
         * with the freshly measured layout rather than returning the cached value.
         */
        this.constraints = false;
        this.resolveConstraints();
        /**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
            const axisValue = this.getAxisMotionValue(axis);
            /**
             * An element resting at its origin has no offset to preserve,
             * and re-projecting 0 into the new constraints would move it.
             */
            if (!shouldDrag(axis, drag, null) || !axisValue.get())
                return;
            /**
             * Calculate a new transform based on the previous box progress
             */
            const { min, max } = this.constraints[axis];
            axisValue.set((0,motion_dom__WEBPACK_IMPORTED_MODULE_15__/* .mixNumber */ .k)(min, max, boxProgress[axis]));
        });
        /**
         * Flush the updated transform to the DOM synchronously to prevent
         * a visual flash at the element's CSS layout position (0,0) when
         * the transform was stripped for measurement.
         */
        this.visualElement.render();
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.current;
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */
        const stopPointerListener = (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_16__/* .addPointerEvent */ .h)(element, "pointerdown", (event) => {
            const { drag, dragListener = true } = this.getProps();
            const target = event.target;
            /**
             * Only block drag if clicking on a text input child element
             * (input, textarea, select, contenteditable) where users might
             * want to select text or interact with the control.
             *
             * Buttons and links don't block drag since they don't have
             * click-and-move actions of their own.
             */
            const isClickingTextInputChild = target !== element && (0,motion_dom__WEBPACK_IMPORTED_MODULE_17__/* .isElementTextInput */ .a)(target);
            if (drag && dragListener && !isClickingTextInputChild) {
                this.start(event);
            }
        });
        /**
         * If using ref-based constraints, observe both the draggable element
         * and the constraint container for size changes via ResizeObserver.
         * Setup is deferred because dragConstraints.current is null when
         * addListeners first runs (React hasn't committed the ref yet).
         */
        let stopResizeObservers;
        const measureDragConstraints = () => {
            const { dragConstraints } = this.getProps();
            if ((0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isRefObject */ .X)(dragConstraints) && dragConstraints.current) {
                this.constraints = this.resolveRefConstraints();
                if (!stopResizeObservers) {
                    stopResizeObservers = startResizeObservers(element, dragConstraints.current, () => this.scalePositionWithinConstraints());
                }
            }
        };
        const { projection } = this.visualElement;
        const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            projection.root && projection.root.updateScroll();
            projection.updateLayout();
        }
        motion_dom__WEBPACK_IMPORTED_MODULE_5__/* .frame */ .Gt.read(measureDragConstraints);
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
        const stopResizeListener = (0,motion_dom__WEBPACK_IMPORTED_MODULE_18__/* .addDomEvent */ .k)(window, "resize", () => this.scalePositionWithinConstraints());
        /**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */
        const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
            if (this.isDragging && hasLayoutChanged) {
                (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .eachAxis */ .X)((axis) => {
                    const motionValue = this.getAxisMotionValue(axis);
                    if (!motionValue)
                        return;
                    this.originPoint[axis] += delta[axis].translate;
                    motionValue.set(motionValue.get() + delta[axis].translate);
                });
                this.visualElement.render();
            }
        }));
        return () => {
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
            stopLayoutUpdateListener && stopLayoutUpdateListener();
            stopResizeObservers && stopResizeObservers();
        };
    }
    getProps() {
        const props = this.visualElement.getProps();
        const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = _utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_9__/* .defaultElastic */ .Ne, dragMomentum = true, } = props;
        return {
            ...props,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum,
        };
    }
}
function skipFirstCall(callback) {
    let isFirst = true;
    return () => {
        if (isFirst) {
            isFirst = false;
            return;
        }
        callback();
    };
}
function startResizeObservers(element, constraintsElement, onResize) {
    const stopElement = (0,motion_dom__WEBPACK_IMPORTED_MODULE_19__/* .resize */ .X)(element, skipFirstCall(onResize));
    const stopContainer = (0,motion_dom__WEBPACK_IMPORTED_MODULE_19__/* .resize */ .X)(constraintsElement, skipFirstCall(onResize));
    return () => {
        stopElement();
        stopContainer();
    };
}
function shouldDrag(direction, drag, currentDirection) {
    return ((drag === true || drag === direction) &&
        (currentDirection === null || currentDirection === direction));
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    }
    else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}


//# sourceMappingURL=VisualElementDragControls.mjs.map


/***/ }),

/***/ 810014:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ HTMLVisualElement)
/* harmony export */ });
/* unused harmony export getComputedStyle */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116038);
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(545756);
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(457848);
/* harmony import */ var _dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(694696);
/* harmony import */ var _projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(393062);
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(326510);
/* harmony import */ var _utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(299596);
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(228895);
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(249757);










function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .DOMVisualElement */ .b {
    constructor() {
        super(...arguments);
        this.type = "html";
        this.renderInstance = _utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__/* .renderHTML */ .e;
    }
    mount(instance) {
        /**
         * If a custom component forwards its ref to something other than a
         * HTML/SVG element (a class instance, an imperative handle) there's
         * nothing for Motion to style, measure or attach gestures to. #2777
         */
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .invariant */ .V)(Boolean(instance.style), "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref");
        super.mount(instance);
    }
    readValueFromInstance(instance, key) {
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__/* .transformProps */ .f.has(key)) {
            return this.projection?.isProjecting
                ? (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_4__/* .defaultTransformValue */ .zs)(key)
                : (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_4__/* .readTransformValue */ .Ib)(instance, key);
        }
        else {
            const computedStyle = getComputedStyle(instance);
            const value = ((0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_5__/* .isCSSVariableName */ .j4)(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return (0,_projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_6__/* .measureViewportBox */ .m)(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_7__/* .buildHTMLStyles */ .O)(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_8__/* .scrapeMotionValuesFromProps */ .x)(props, prevProps, visualElement);
    }
}


//# sourceMappingURL=HTMLVisualElement.mjs.map


/***/ }),

/***/ 815291:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ isNodeOrChild)
/* harmony export */ });
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
const isNodeOrChild = (parent, child) => {
    if (!child) {
        return false;
    }
    else if (parent === child) {
        return true;
    }
    else {
        return isNodeOrChild(parent, child.parentElement);
    }
};


//# sourceMappingURL=is-node-or-child.mjs.map


/***/ }),

/***/ 827588:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ supportsFlags)
/* harmony export */ });
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */
const supportsFlags = {};


//# sourceMappingURL=flags.mjs.map


/***/ }),

/***/ 832473:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useSVGProps)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110645);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(206536);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(996796);
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(544594);
/* __next_internal_client_entry_do_not_use__ useSVGProps auto */ 



function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        const state = (0,_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createSvgRenderState */ .s)();
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .buildSVGAttrs */ .B)(state, visualState, (0,motion_dom__WEBPACK_IMPORTED_MODULE_3__/* .isSVGTag */ .n)(Component), props.transformTemplate, props.style);
        return {
            ...state.attrs,
            style: {
                ...state.style
            }
        };
    }, [
        visualState
    ]);
    if (props.style) {
        const rawStyles = {};
        (0,_html_use_props_mjs__WEBPACK_IMPORTED_MODULE_4__/* .copyRawValuesOnly */ .o)(rawStyles, props.style, props);
        visualProps.style = {
            ...rawStyles,
            ...visualProps.style
        };
    }
    return visualProps;
}
 //# sourceMappingURL=use-props.mjs.map


/***/ }),

/***/ 832999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78027);
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200252);



/**
 * Properties that should default to 1 or 100%
 */
const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow")
        return v;
    const [number] = value.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__/* .floatRegex */ .S) || [];
    if (!number)
        return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ..._index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .complex */ .f,
    getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    },
};


//# sourceMappingURL=filter.mjs.map


/***/ }),

/***/ 833662:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ inertia)
/* harmony export */ });
/* harmony import */ var _spring_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(191887);


function inertia({ keyframes, velocity = 0.0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed, }) {
    const origin = keyframes[0];
    const state = {
        done: false,
        value: origin,
    };
    const isOutOfBounds = (v) => v < min || v > max;
    const nearestBoundary = (v) => {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    /**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */
    if (target !== ideal)
        amplitude = target - origin;
    const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
    const applyFriction = (t) => {
        const delta = calcDelta(t);
        state.done = Math.abs(delta) <= restDelta;
        state.value = state.done ? target : target + delta;
    };
    /**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t) => {
        if (!isOutOfBounds(state.value))
            return;
        timeReachedBoundary = t;
        spring$1 = (0,_spring_mjs__WEBPACK_IMPORTED_MODULE_0__/* .spring */ .o)({
            keyframes: [state.value, nearestBoundary(state.value)],
            /**
             * The friction curve is target + calcDelta(t), so its exact
             * derivative is -calcDelta(t) / timeConstant in units/ms,
             * converted here to the units/second expected by spring.
             */
            velocity: (-calcDelta(t) / timeConstant) * 1000,
            damping: bounceDamping,
            stiffness: bounceStiffness,
            restDelta,
            restSpeed,
        });
    };
    checkCatchBoundary(0);
    return {
        calculatedDuration: null,
        next: (t) => {
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */
            let hasUpdatedFrame = false;
            if (!spring$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */
            if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
                return spring$1.next(t - timeReachedBoundary);
            }
            else {
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        },
    };
}


//# sourceMappingURL=inertia.mjs.map


/***/ }),

/***/ 835880:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ distance2D)
/* harmony export */ });
/* unused harmony export distance */
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
    // Multi-dimensional
    const xDelta = distance(a.x, b.x);
    const yDelta = distance(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}


//# sourceMappingURL=distance.mjs.map


/***/ }),

/***/ 837669:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ delay)
/* harmony export */ });
/* unused harmony export delayInSeconds */
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162735);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(744557);




/**
 * Timeout defined in ms
 */
function delay(callback, timeout) {
    const start = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__/* .time */ .k.now();
    const checkElapsed = ({ timestamp }) => {
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
            (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__/* .cancelFrame */ .WG)(checkElapsed);
            callback(elapsed - timeout);
        }
    };
    _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__/* .frame */ .Gt.setup(checkElapsed, true);
    return () => (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__/* .cancelFrame */ .WG)(checkElapsed);
}
function delayInSeconds(callback, timeout) {
    return delay(callback, secondsToMilliseconds(timeout));
}


//# sourceMappingURL=delay.mjs.map


/***/ }),

/***/ 837953:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ numberValueTypes)
/* harmony export */ });
/* harmony import */ var _int_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(132337);
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(320193);
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(922000);
/* harmony import */ var _transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(404234);





const numberValueTypes = {
    // Border props
    borderWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderRightWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderLeftWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopLeftRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopRightRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomRightRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomLeftRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Positioning props
    width: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    maxWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    height: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    maxHeight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    top: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    right: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    bottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    left: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    inset: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    insetInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Spacing props
    padding: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingTop: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingRight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingBottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingLeft: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    margin: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginTop: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginRight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginBottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginLeft: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Typography
    fontSize: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Misc
    backgroundPositionX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    backgroundPositionY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    ..._transform_mjs__WEBPACK_IMPORTED_MODULE_1__/* .transformValueTypes */ .H,
    zIndex: _int_mjs__WEBPACK_IMPORTED_MODULE_2__/* .int */ .W,
    // SVG
    fillOpacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .alpha */ .X4,
    strokeOpacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__/* .alpha */ .X4,
    numOctaves: _int_mjs__WEBPACK_IMPORTED_MODULE_2__/* .int */ .W,
};


//# sourceMappingURL=number.mjs.map


/***/ }),

/***/ 849263:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ InViewFeature)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(963969);
/* harmony import */ var _observers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(423354);



const thresholdNames = {
    some: 0,
    all: 1,
};
class InViewFeature extends motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .Feature */ .X {
    constructor() {
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
    startObserver() {
        this.stopObserver?.();
        const { viewport = {} } = this.node.getProps();
        const { root, margin: rootMargin, amount = "some", once } = viewport;
        const options = {
            root: root ? root.current : undefined,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount],
        };
        const onIntersectionUpdate = (entry) => {
            const { isIntersecting } = entry;
            /**
             * If there's been no change in the viewport state, early return.
             */
            if (this.isInView === isIntersecting)
                return;
            this.isInView = isIntersecting;
            /**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */
            if (once && !isIntersecting && this.hasEnteredView) {
                return;
            }
            else if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive("whileInView", isIntersecting);
            }
            /**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */
            const { onViewportEnter, onViewportLeave } = this.node.getProps();
            const callback = isIntersecting ? onViewportEnter : onViewportLeave;
            callback && callback(entry);
        };
        this.stopObserver = (0,_observers_mjs__WEBPACK_IMPORTED_MODULE_1__/* .observeIntersection */ .m)(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver === "undefined")
            return;
        const { props, prevProps } = this.node;
        const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
        if (hasOptionsChanged) {
            this.startObserver();
        }
    }
    unmount() {
        this.stopObserver?.();
        this.hasEnteredView = false;
        this.isInView = false;
    }
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name) => viewport[name] !== prevViewport[name];
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 852700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ createGeneratorEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(565229);
/* harmony import */ var _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(665378);



/**
 * Create a progress => progress easing function from a generator.
 */
function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale] });
    const duration = Math.min((0,_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_0__/* .calcGeneratorDuration */ .t)(generator), _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_0__/* .maxGeneratorDuration */ .Y);
    return {
        type: "keyframes",
        ease: (progress) => {
            return generator.next(duration * progress).value / scale;
        },
        duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .millisecondsToSeconds */ .X)(duration),
    };
}


//# sourceMappingURL=create-generator-easing.mjs.map


/***/ }),

/***/ 854643:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ne: () => (/* binding */ defaultElastic),
/* harmony export */   QX: () => (/* binding */ rebaseAxisConstraints),
/* harmony export */   Yu: () => (/* binding */ calcOrigin),
/* harmony export */   Zq: () => (/* binding */ applyConstraints),
/* harmony export */   _c: () => (/* binding */ calcRelativeConstraints),
/* harmony export */   iT: () => (/* binding */ calcViewportConstraints),
/* harmony export */   my: () => (/* binding */ resolveDragElastic)
/* harmony export */ });
/* unused harmony exports calcRelativeAxisConstraints, calcViewportAxisConstraints, resolveAxisElastic, resolvePointElastic */
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(144914);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(506339);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(350738);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91524);



/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function applyConstraints(point, { min, max }, elastic) {
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic
            ? (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(min, point, elastic.min)
            : Math.max(point, min);
    }
    else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic
            ? (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .mixNumber */ .k)(max, point, elastic.max)
            : Math.min(point, max);
    }
    return point;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined
            ? axis.max + max - (axis.max - axis.min)
            : undefined,
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min <
        layoutAxis.max - layoutAxis.min) {
        [min, max] = [max, min];
    }
    return { min, max };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
    };
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an aesthetically pleasing scale/transform needed to project from source to target.
 */
function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .calcLength */ .CQ)(source);
    const targetLength = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .calcLength */ .CQ)(target);
    if (targetLength > sourceLength) {
        origin = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .progress */ .q)(target.min, target.max - sourceLength, source.min);
    }
    else if (sourceLength > targetLength) {
        origin = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .progress */ .q)(source.min, source.max - targetLength, target.min);
    }
    return (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__/* .clamp */ .q)(0, 1, origin);
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function rebaseAxisConstraints(layout, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
const defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */
function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
        dragElastic = 0;
    }
    else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom"),
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel),
    };
}
function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number"
        ? dragElastic
        : dragElastic[label] || 0;
}


//# sourceMappingURL=constraints.mjs.map


/***/ }),

/***/ 857426:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ testValueType)
/* harmony export */ });
/**
 * Tests a provided value against a ValueType
 */
const testValueType = (v) => (type) => type.test(v);


//# sourceMappingURL=test.mjs.map


/***/ }),

/***/ 859927:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ isTransitionDefined)
/* harmony export */ });
const orchestrationKeys = new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed",
]);
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined(transition) {
    for (const key in transition) {
        if (!orchestrationKeys.has(key))
            return true;
    }
    return false;
}


//# sourceMappingURL=is-transition-defined.mjs.map


/***/ }),

/***/ 861938:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XY: () => (/* binding */ isDeltaZero),
/* harmony export */   cH: () => (/* binding */ aspectRatio),
/* harmony export */   mG: () => (/* binding */ boxEqualsRounded),
/* harmony export */   t$: () => (/* binding */ axisDeltaEquals),
/* harmony export */   zo: () => (/* binding */ boxEquals)
/* harmony export */ });
/* unused harmony exports axisEquals, axisEqualsRounded */
/* harmony import */ var _delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(506339);


function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
    return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
    return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
    return (Math.round(a.min) === Math.round(b.min) &&
        Math.round(a.max) === Math.round(b.max));
}
function boxEqualsRounded(a, b) {
    return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
    return (0,_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__/* .calcLength */ .CQ)(box.x) / (0,_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__/* .calcLength */ .CQ)(box.y);
}
function axisDeltaEquals(a, b) {
    return (a.translate === b.translate &&
        a.scale === b.scale &&
        a.originPoint === b.originPoint);
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ 865377:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ fillOffset)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(350738);
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144914);



function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .progress */ .q)(0, remaining, i);
        offset.push((0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mixNumber */ .k)(min, 1, offsetProgress));
    }
}


//# sourceMappingURL=fill.mjs.map


/***/ }),

/***/ 866451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ resize)
/* harmony export */ });
/* harmony import */ var _handle_element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(436360);
/* harmony import */ var _handle_window_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(498124);



function resize(a, b) {
    return typeof a === "function" ? (0,_handle_window_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resizeWindow */ .R)(a) : (0,_handle_element_mjs__WEBPACK_IMPORTED_MODULE_1__/* .resizeElement */ .l)(a, b);
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 871929:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ setTarget)
/* harmony export */ });
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(484676);
/* harmony import */ var _resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(761024);
/* harmony import */ var _is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(752615);




/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .motionValue */ .OQ)(value));
    }
}
function resolveFinalValueInKeyframes(v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0,_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isKeyframesTarget */ .p)(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
    const resolved = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__/* .resolveVariant */ .K)(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}


//# sourceMappingURL=setters.mjs.map


/***/ }),

/***/ 872614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sz: () => (/* binding */ backOut),
/* harmony export */   ZZ: () => (/* binding */ backInOut),
/* harmony export */   dg: () => (/* binding */ backIn)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(378209);
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(681343);
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41448);




const backOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezier */ .A)(0.33, 1.53, 0.69, 0.99);
const backIn = /*@__PURE__*/ (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__/* .reverseEasing */ .G)(backOut);
const backInOut = /*@__PURE__*/ (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_2__/* .mirrorEasing */ .V)(backIn);


//# sourceMappingURL=back.mjs.map


/***/ }),

/***/ 872956:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u0: () => (/* binding */ createProjectionNode)
/* harmony export */ });
/* unused harmony exports cleanDirtyNodes, mixAxis, mixBox, propagateDirtyNodes */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(669126);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(91524);
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(6675);
/* harmony import */ var _animation_animate_single_value_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(302979);
/* harmony import */ var _animation_utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(294834);
/* harmony import */ var _animation_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(521273);
/* harmony import */ var _animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(663293);
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(595209);
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(162735);
/* harmony import */ var _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(216950);
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(151444);
/* harmony import */ var _utils_delay_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(837669);
/* harmony import */ var _utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(588982);
/* harmony import */ var _utils_is_svg_svg_element_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8351);
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(144914);
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(484676);
/* harmony import */ var _value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(125217);
/* harmony import */ var _animation_mix_values_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(536060);
/* harmony import */ var _geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(163396);
/* harmony import */ var _geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(647740);
/* harmony import */ var _geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(506339);
/* harmony import */ var _geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(280352);
/* harmony import */ var _geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(628265);
/* harmony import */ var _geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(861938);
/* harmony import */ var _shared_stack_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(669390);
/* harmony import */ var _styles_default_scale_correctors_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(928186);
/* harmony import */ var _styles_transform_mjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(50947);
/* harmony import */ var _utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(519589);
/* harmony import */ var _utils_flat_tree_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(192692);
/* harmony import */ var _utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(260617);
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(232946);
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(744557);
/* harmony import */ var _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(725222);
































/**
 * Correctors registered via addScaleCorrector before projection loaded
 * (e.g. with an async LazyMotion bundle) take precedence over the defaults.
 */
Object.assign(_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scaleCorrectors */ .H, {
    ..._styles_default_scale_correctors_mjs__WEBPACK_IMPORTED_MODULE_1__/* .defaultScaleCorrectors */ .w,
    ..._styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scaleCorrectors */ .H,
});
const metrics = {
    nodes: 0,
    calculatedTargetDeltas: 0,
    calculatedProjections: 0,
};
const transformAxes = ["", "X", "Y", "Z"];
/**
 * We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
 * which has a noticeable difference in spring animations
 */
const animationTarget = 1000;
let id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
    const { latestValues } = visualElement;
    // Record the distorting transform and then temporarily set it to 0
    if (latestValues[key]) {
        values[key] = latestValues[key];
        visualElement.setStaticValue(key, 0);
        if (sharedAnimationValues) {
            sharedAnimationValues[key] = 0;
        }
    }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
    projectionNode.hasCheckedOptimisedAppear = true;
    if (projectionNode.root === projectionNode)
        return;
    const { visualElement } = projectionNode.options;
    if (!visualElement)
        return;
    const appearId = (0,_animation_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getOptimisedAppearId */ .P)(visualElement);
    if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
        const { layout, layoutId } = projectionNode.options;
        window.MotionCancelOptimisedAnimation(appearId, "transform", _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt, !(layout || layoutId));
    }
    const { parent } = projectionNode;
    if (parent && !parent.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(parent);
    }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform, }) {
    return class ProjectionNode {
        constructor(latestValues = {}, parent = defaultParent?.()) {
            /**
             * A unique ID generated for every projection node.
             */
            this.id = id++;
            /**
             * An id that represents a unique session instigated by startUpdate.
             */
            this.animationId = 0;
            this.animationCommitId = 0;
            /**
             * A Set containing all this component's children. This is used to iterate
             * through the children.
             *
             * TODO: This could be faster to iterate as a flat array stored on the root node.
             */
            this.children = new Set();
            /**
             * Options for the node. We use this to configure what kind of layout animations
             * we should perform (if any).
             */
            this.options = {};
            /**
             * We use this to detect when its safe to shut down part of a projection tree.
             * We have to keep projecting children for scale correction and relative projection
             * until all their parents stop performing layout animations.
             */
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            /**
             * Flag to true if we think this layout has been changed. We can't always know this,
             * currently we set it to true every time a component renders, or if it has a layoutDependency
             * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
             * and if one node is dirtied, they all are.
             */
            this.isLayoutDirty = false;
            /**
             * Flag to true if we think the projection calculations for this node needs
             * recalculating as a result of an updated transform or layout animation.
             */
            this.isProjectionDirty = false;
            /**
             * Flag to true if the layout *or* transform has changed. This then gets propagated
             * throughout the projection tree, forcing any element below to recalculate on the next frame.
             */
            this.isSharedProjectionDirty = false;
            /**
             * Flag transform dirty. This gets propagated throughout the whole tree but is only
             * respected by shared nodes.
             */
            this.isTransformDirty = false;
            /**
             * Block layout updates for instant layout transitions throughout the tree.
             */
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            /**
             * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
             * call.
             */
            this.isUpdating = false;
            /**
             * If this is an SVG element we currently disable projection transforms
             */
            this.isSVG = false;
            /**
             * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
             * its projection styles.
             */
            this.needsReset = false;
            /**
             * Flags whether this node should have its transform reset prior to measuring.
             */
            this.shouldResetTransform = false;
            /**
             * Store whether this node has been checked for optimised appear animations. As
             * effects fire bottom-up, and we want to look up the tree for appear animations,
             * this makes sure we only check each path once, stopping at nodes that
             * have already been checked.
             */
            this.hasCheckedOptimisedAppear = false;
            /**
             * An object representing the calculated contextual/accumulated/tree scale.
             * This will be used to scale calculated projection transforms, as these are
             * calculated in screen-space but need to be scaled for elements to visually
             * make it to their calculated destinations.
             *
             * TODO: Lazy-init
             */
            this.treeScale = { x: 1, y: 1 };
            /**
             *
             */
            this.eventHandlers = new Map();
            this.hasTreeAnimated = false;
            // Note: Currently only running on root node
            this.updateScheduled = false;
            this.scheduleUpdate = () => this.update();
            this.projectionUpdateScheduled = false;
            this.checkUpdateFailed = () => {
                if (this.isUpdating) {
                    this.isUpdating = false;
                    this.clearAllSnapshots();
                }
            };
            /**
             * This is a multi-step process as shared nodes might be of different depths. Nodes
             * are sorted by depth order, so we need to resolve the entire tree before moving to
             * the next step.
             */
            this.updateProjection = () => {
                this.projectionUpdateScheduled = false;
                /**
                 * Reset debug counts. Manually resetting rather than creating a new
                 * object each frame.
                 */
                if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.value) {
                    metrics.nodes =
                        metrics.calculatedTargetDeltas =
                            metrics.calculatedProjections =
                                0;
                }
                this.nodes.forEach(propagateDirtyNodes);
                this.nodes.forEach(resolveTargetDelta);
                this.nodes.forEach(calcProjection);
                this.nodes.forEach(cleanDirtyNodes);
                if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.addProjectionMetrics) {
                    _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.addProjectionMetrics(metrics);
                }
            };
            /**
             * Frame calculations
             */
            this.resolvedRelativeTargetAt = 0.0;
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            /**
             * Shared layout
             */
            // TODO Only running on root node
            this.sharedNodes = new Map();
            this.latestValues = latestValues;
            this.root = parent ? parent.root || parent : this;
            this.path = parent ? [...parent.path, parent] : [];
            this.parent = parent;
            this.depth = parent ? parent.depth + 1 : 0;
            for (let i = 0; i < this.path.length; i++) {
                this.path[i].shouldResetTransform = true;
            }
            if (this.root === this)
                this.nodes = new _utils_flat_tree_mjs__WEBPACK_IMPORTED_MODULE_5__/* .FlatTree */ .Y();
        }
        addEventListener(name, handler) {
            if (!this.eventHandlers.has(name)) {
                this.eventHandlers.set(name, new motion_utils__WEBPACK_IMPORTED_MODULE_6__/* .SubscriptionManager */ .v());
            }
            return this.eventHandlers.get(name).add(handler);
        }
        notifyListeners(name, ...args) {
            const subscriptionManager = this.eventHandlers.get(name);
            subscriptionManager && subscriptionManager.notify(...args);
        }
        hasListeners(name) {
            return this.eventHandlers.has(name);
        }
        /**
         * Lifecycles
         */
        mount(instance) {
            if (this.instance)
                return;
            this.isSVG = (0,_utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_7__/* .isSVGElement */ .x)(instance) && !(0,_utils_is_svg_svg_element_mjs__WEBPACK_IMPORTED_MODULE_8__/* .isSVGSVGElement */ .h)(instance);
            this.instance = instance;
            const { layoutId, layout, visualElement } = this.options;
            if (visualElement && !visualElement.current) {
                visualElement.mount(instance);
            }
            this.root.nodes.add(this);
            this.parent && this.parent.children.add(this);
            if (this.root.hasTreeAnimated && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                let cancelDelay;
                let innerWidth = 0;
                const resizeUnblockUpdate = () => (this.root.updateBlockedByResize = false);
                // Set initial innerWidth in a frame.read callback to batch the read
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt.read(() => {
                    innerWidth = window.innerWidth;
                });
                attachResizeListener(instance, () => {
                    const newInnerWidth = window.innerWidth;
                    if (newInnerWidth === innerWidth)
                        return;
                    innerWidth = newInnerWidth;
                    this.root.updateBlockedByResize = true;
                    cancelDelay && cancelDelay();
                    cancelDelay = (0,_utils_delay_mjs__WEBPACK_IMPORTED_MODULE_9__/* .delay */ .c)(resizeUnblockUpdate, 250);
                    if (_state_mjs__WEBPACK_IMPORTED_MODULE_10__/* .globalProjectionState */ .w.hasAnimatedSinceResize) {
                        _state_mjs__WEBPACK_IMPORTED_MODULE_10__/* .globalProjectionState */ .w.hasAnimatedSinceResize = false;
                        this.nodes.forEach(finishAnimation);
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            // Only register the handler if it requires layout animation
            if (this.options.animate !== false &&
                visualElement &&
                (layoutId || layout)) {
                this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout, }) => {
                    if (this.isTreeAnimationBlocked()) {
                        this.target = undefined;
                        this.relativeTarget = undefined;
                        return;
                    }
                    // TODO: Check here if an animation exists
                    const layoutTransition = this.options.transition ||
                        visualElement.getDefaultTransition() ||
                        defaultLayoutTransition;
                    const { onLayoutAnimationStart, onLayoutAnimationComplete, } = visualElement.getProps();
                    /**
                     * The target layout of the element might stay the same,
                     * but its position relative to its parent has changed.
                     */
                    const hasTargetChanged = !this.targetLayout ||
                        !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .boxEqualsRounded */ .mG)(this.targetLayout, newLayout);
                    /*
                     * Note: Disabled to fix relative animations always triggering new
                     * layout animations. If this causes further issues, we can try
                     * a different approach to detecting relative target changes.
                     */
                    // || hasRelativeLayoutChanged
                    /**
                     * If the layout hasn't seemed to have changed, it might be that the
                     * element is visually in the same place in the document but its position
                     * relative to its parent has indeed changed. So here we check for that.
                     */
                    const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
                    if (this.options.layoutRoot ||
                        this.resumeFrom ||
                        hasOnlyRelativeTargetChanged ||
                        (hasLayoutChanged &&
                            (hasTargetChanged || !this.currentAnimation))) {
                        if (this.resumeFrom) {
                            this.resumingFrom = this.resumeFrom;
                            this.resumingFrom.resumingFrom = undefined;
                        }
                        const animationOptions = {
                            ...(0,_animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_12__/* .getValueTransition */ .r)(layoutTransition, "layout"),
                            onPlay: onLayoutAnimationStart,
                            onComplete: onLayoutAnimationComplete,
                        };
                        if (visualElement.shouldReduceMotion ||
                            this.options.layoutRoot) {
                            animationOptions.delay = 0;
                            animationOptions.type = false;
                        }
                        this.startAnimation(animationOptions);
                        /**
                         * Set animation origin after starting animation to avoid layout jump
                         * caused by stopping previous layout animation
                         */
                        this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged, animationOptions
                            .path);
                    }
                    else {
                        /**
                         * If the layout hasn't changed and we have an animation that hasn't started yet,
                         * finish it immediately. Otherwise it will be animating from a location
                         * that was probably never committed to screen and look like a jumpy box.
                         */
                        if (!hasLayoutChanged) {
                            finishAnimation(this);
                        }
                        if (this.isLead() && this.options.onExitComplete) {
                            this.options.onExitComplete();
                        }
                    }
                    this.targetLayout = newLayout;
                });
            }
        }
        unmount() {
            this.options.layoutId && this.willUpdate();
            this.root.nodes.remove(this);
            const stack = this.getStack();
            stack && stack.remove(this);
            this.parent && this.parent.children.delete(this);
            this.instance = undefined;
            this.eventHandlers.clear();
            (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .cancelFrame */ .WG)(this.updateProjection);
        }
        // only on the root
        blockUpdate() {
            this.updateManuallyBlocked = true;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = false;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return (this.isAnimationBlocked ||
                (this.parent && this.parent.isTreeAnimationBlocked()) ||
                false);
        }
        // Note: currently only running on root node
        startUpdate() {
            if (this.isUpdateBlocked())
                return;
            this.isUpdating = true;
            this.nodes && this.nodes.forEach(resetSkewAndRotation);
            this.animationId++;
        }
        getTransformTemplate() {
            const { visualElement } = this.options;
            return visualElement && visualElement.getProps().transformTemplate;
        }
        willUpdate(shouldNotifyListeners = true) {
            this.root.hasTreeAnimated = true;
            if (this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return;
            }
            /**
             * If we're running optimised appear animations then these must be
             * cancelled before measuring the DOM. This is so we can measure
             * the true layout of the element rather than the WAAPI animation
             * which will be unaffected by the resetSkewAndRotate step.
             *
             * Note: This is a DOM write. Worst case scenario is this is sandwiched
             * between other snapshot reads which will cause unnecessary style recalculations.
             * This has to happen here though, as we don't yet know which nodes will need
             * snapshots in startUpdate(), but we only want to cancel optimised animations
             * if a layout animation measurement is actually going to be affected by them.
             */
            if (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear) {
                cancelTreeOptimisedTransformAnimations(this);
            }
            !this.root.isUpdating && this.root.startUpdate();
            if (this.isLayoutDirty)
                return;
            this.isLayoutDirty = true;
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                node.shouldResetTransform = true;
                /**
                 * Percentage translates resolve against layoutBox dimensions,
                 * so ancestors with them must be re-measured after transform reset.
                 */
                if (typeof node.latestValues.x === "string" ||
                    typeof node.latestValues.y === "string") {
                    node.isLayoutDirty = true;
                }
                node.updateScroll("snapshot");
                if (node.options.layoutRoot) {
                    node.willUpdate(false);
                }
            }
            const { layoutId, layout } = this.options;
            if (layoutId === undefined && !layout)
                return;
            const transformTemplate = this.getTransformTemplate();
            this.prevTransformTemplateValue = transformTemplate
                ? transformTemplate(this.latestValues, "")
                : undefined;
            this.updateSnapshot();
            shouldNotifyListeners && this.notifyListeners("willUpdate");
        }
        update() {
            this.updateScheduled = false;
            const updateWasBlocked = this.isUpdateBlocked();
            // When doing an instant transition, we skip the layout update,
            // but should still clean up the measurements so that the next
            // snapshot could be taken correctly.
            if (updateWasBlocked) {
                const wasBlockedByResize = this.updateBlockedByResize;
                this.unblockUpdate();
                this.updateBlockedByResize = false;
                this.clearAllSnapshots();
                /**
                 * When blocked by resize, still measure layouts so
                 * callbacks like onLayoutMeasure fire (e.g. Reorder).
                 * Skip notifyLayoutUpdate to prevent animations.
                 */
                if (wasBlockedByResize) {
                    this.nodes.forEach(forceLayoutMeasure);
                }
                this.nodes.forEach(clearMeasurements);
                return;
            }
            /**
             * If this is a repeat of didUpdate then ignore the animation.
             */
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(clearIsLayoutDirty);
                return;
            }
            this.animationCommitId = this.animationId;
            if (!this.isUpdating) {
                this.nodes.forEach(clearIsLayoutDirty);
            }
            else {
                this.isUpdating = false;
                /**
                 * Ensure animation-blocked nodes (e.g. during drag)
                 * get measured even when memoized (willUpdate skipped).
                 */
                this.nodes.forEach(ensureDraggedNodesSnapshotted);
                this.nodes.forEach(syncRelativeLayout);
                /**
                 * Write
                 */
                this.nodes.forEach(resetTransformStyle);
                /**
                 * Read ==================
                 */
                // Update layout measurements of updated children
                this.nodes.forEach(updateLayout);
                /**
                 * Write
                 */
                // Notify listeners that the layout is updated
                this.nodes.forEach(notifyLayoutUpdate);
            }
            this.clearAllSnapshots();
            /**
             * Manually flush any pending updates. Ideally
             * we could leave this to the following requestAnimationFrame but this seems
             * to leave a flash of incorrectly styled content.
             */
            const now = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_13__/* .time */ .k.now();
            _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.delta = (0,motion_utils__WEBPACK_IMPORTED_MODULE_15__/* .clamp */ .q)(0, 1000 / 60, now - _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.timestamp);
            _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.timestamp = now;
            _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.isProcessing = true;
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frameSteps */ .PP.update.process(_frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frameSteps */ .PP.preRender.process(_frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frameSteps */ .PP.render.process(_frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u);
            _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.isProcessing = false;
        }
        didUpdate() {
            if (!this.updateScheduled) {
                this.updateScheduled = true;
                _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_16__/* .microtask */ .k.read(this.scheduleUpdate);
            }
        }
        clearAllSnapshots() {
            this.nodes.forEach(clearSnapshot);
            this.sharedNodes.forEach(removeLeadSnapshots);
        }
        scheduleUpdateProjection() {
            if (!this.projectionUpdateScheduled) {
                this.projectionUpdateScheduled = true;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt.preRender(this.updateProjection, false, true);
            }
        }
        scheduleCheckAfterUnmount() {
            /**
             * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
             * we manually call didUpdate to give a chance to the siblings to animate.
             * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
             */
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt.postRender(() => {
                if (this.isLayoutDirty) {
                    this.root.didUpdate();
                }
                else {
                    this.root.checkUpdateFailed();
                }
            });
        }
        /**
         * Update measurements
         */
        updateSnapshot() {
            if (this.snapshot || !this.instance)
                return;
            this.snapshot = this.measure();
            if (this.snapshot &&
                !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(this.snapshot.measuredBox.x) &&
                !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(this.snapshot.measuredBox.y)) {
                this.snapshot = undefined;
            }
        }
        updateLayout() {
            if (!this.instance)
                return;
            this.updateScroll();
            if (!(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty) {
                return;
            }
            /**
             * When a node is mounted, it simply resumes from the prevLead's
             * snapshot instead of taking a new one, but the ancestors scroll
             * might have updated while the prevLead is unmounted. We need to
             * update the scroll again to make sure the layout we measure is
             * up to date.
             */
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    node.updateScroll();
                }
            }
            const prevLayout = this.layout;
            this.layout = this.measure(false);
            if (!this.layoutCorrected)
                this.layoutCorrected = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners("measure", this.layout.layoutBox);
            const { visualElement } = this.options;
            visualElement &&
                visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : undefined);
        }
        updateScroll(phase = "measure") {
            let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
            if (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === phase) {
                needsMeasurement = false;
            }
            if (needsMeasurement && this.instance) {
                const isRoot = checkIsScrollRoot(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase,
                    isRoot,
                    offset: measureScroll(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : isRoot,
                };
            }
        }
        resetTransform() {
            if (!resetTransform)
                return;
            const isResetRequested = this.isLayoutDirty ||
                this.shouldResetTransform ||
                this.options.alwaysMeasureLayout;
            const hasProjection = this.projectionDelta && !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .isDeltaZero */ .XY)(this.projectionDelta);
            const transformTemplate = this.getTransformTemplate();
            const transformTemplateValue = transformTemplate
                ? transformTemplate(this.latestValues, "")
                : undefined;
            const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
            if (isResetRequested &&
                this.instance &&
                (hasProjection ||
                    (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(this.latestValues) ||
                    transformTemplateHasChanged)) {
                resetTransform(this.instance, transformTemplateValue);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        }
        measure(removeTransform = true) {
            const pageBox = this.measurePageBox();
            let layoutBox = this.removeElementScroll(pageBox);
            /**
             * Measurements taken during the pre-render stage
             * still have transforms applied so we remove them
             * via calculation.
             */
            if (removeTransform) {
                layoutBox = this.removeTransform(layoutBox);
            }
            roundBox(layoutBox);
            return {
                animationId: this.root.animationId,
                measuredBox: pageBox,
                layoutBox,
                latestValues: {},
                source: this.id,
            };
        }
        measurePageBox() {
            const { visualElement } = this.options;
            if (!visualElement)
                return (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            const box = visualElement.measureViewportBox();
            const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
            if (!wasInScrollRoot) {
                // Remove viewport scroll to give page-relative coordinates
                const { scroll } = this.root;
                if (scroll) {
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(box.x, scroll.offset.x);
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(box.y, scroll.offset.y);
                }
            }
            return box;
        }
        removeElementScroll(box) {
            const boxWithoutScroll = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(boxWithoutScroll, box);
            if (this.scroll?.wasRoot) {
                return boxWithoutScroll;
            }
            /**
             * Performance TODO: Keep a cumulative scroll offset down the tree
             * rather than loop back up the path.
             */
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                const { scroll, options } = node;
                if (node !== this.root && scroll && options.layoutScroll) {
                    /**
                     * If this is a new scroll root, we want to remove all previous scrolls
                     * from the viewport box.
                     */
                    if (scroll.wasRoot) {
                        (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(boxWithoutScroll, box);
                    }
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(boxWithoutScroll.x, scroll.offset.x);
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(boxWithoutScroll.y, scroll.offset.y);
                }
            }
            return boxWithoutScroll;
        }
        applyTransform(box, transformOnly = false, output) {
            const withTransforms = output || (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(withTransforms, box);
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                if (!transformOnly &&
                    node.options.layoutScroll &&
                    node.scroll &&
                    node !== node.root) {
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(withTransforms.x, -node.scroll.offset.x);
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .translateAxis */ .Ql)(withTransforms.y, -node.scroll.offset.y);
                }
                if (!(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(node.latestValues))
                    continue;
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .transformBox */ .Ww)(withTransforms, node.latestValues, node.layout?.layoutBox);
            }
            if ((0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(this.latestValues)) {
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .transformBox */ .Ww)(withTransforms, this.latestValues, this.layout?.layoutBox);
            }
            return withTransforms;
        }
        removeTransform(box) {
            const boxWithoutTransform = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(boxWithoutTransform, box);
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                if (!(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(node.latestValues))
                    continue;
                let sourceBox;
                if (node.instance) {
                    (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasScale */ .vk)(node.latestValues) && node.updateSnapshot();
                    sourceBox = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(sourceBox, node.measurePageBox());
                }
                (0,_geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_22__/* .removeBoxTransforms */ .px)(boxWithoutTransform, node.latestValues, node.snapshot?.layoutBox, sourceBox);
            }
            if ((0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(this.latestValues)) {
                (0,_geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_22__/* .removeBoxTransforms */ .px)(boxWithoutTransform, this.latestValues);
            }
            return boxWithoutTransform;
        }
        setTargetDelta(delta) {
            this.targetDelta = delta;
            this.root.scheduleUpdateProjection();
            this.isProjectionDirty = true;
        }
        setOptions(options) {
            this.options = {
                ...this.options,
                ...options,
                crossfade: options.crossfade !== undefined ? options.crossfade : true,
            };
        }
        clearMeasurements() {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        }
        forceRelativeParentToResolveTarget() {
            if (!this.relativeParent)
                return;
            /**
             * If the parent target isn't up-to-date, force it to update.
             * This is an unfortunate de-optimisation as it means any updating relative
             * projection will cause all the relative parents to recalculate back
             * up the tree.
             */
            if (this.relativeParent.resolvedRelativeTargetAt !==
                _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.timestamp) {
                this.relativeParent.resolveTargetDelta(true);
            }
        }
        resolveTargetDelta(forceRecalculation = false) {
            /**
             * Once the dirty status of nodes has been spread through the tree, we also
             * need to check if we have a shared node of a different depth that has itself
             * been dirtied.
             */
            const lead = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
            this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            /**
             * We don't use transform for this step of processing so we don't
             * need to check whether any nodes have changed transform.
             */
            const canSkip = !(forceRecalculation ||
                (isShared && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                this.parent?.isProjectionDirty ||
                this.attemptToResolveRelativeTarget ||
                this.root.updateBlockedByResize);
            if (canSkip)
                return;
            const { layout, layoutId } = this.options;
            /**
             * If we have no layout, we can't perform projection, so early return
             */
            if (!this.layout || !(layout || layoutId))
                return;
            this.resolvedRelativeTargetAt = _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.timestamp;
            const relativeParent = this.getClosestProjectingParent();
            /**
             * If we don't have a targetDelta but do have a layout, we can attempt to resolve
             * a relativeParent. This will allow a component to perform scale correction
             * even if no animation has started.
             */
            if (!this.targetDelta && !this.relativeTarget) {
                if (this.options.layoutAnchor !== false &&
                    relativeParent &&
                    relativeParent.layout) {
                    this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
                }
                else {
                    this.removeRelativeTarget();
                }
            }
            /**
             * If we have no relative target or no target delta our target isn't valid
             * for this frame.
             */
            if (!this.relativeTarget && !this.targetDelta)
                return;
            /**
             * Lazy-init target data structure
             */
            if (!this.target) {
                this.target = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                this.targetWithTransforms = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            }
            /**
             * If we've got a relative box for this component, resolve it into a target relative to the parent.
             */
            if (this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target) {
                this.forceRelativeParentToResolveTarget();
                (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcRelativeBox */ .N)(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || undefined);
                /**
                 * If we've only got a targetDelta, resolve it into a target
                 */
            }
            else if (this.targetDelta) {
                if (Boolean(this.resumingFrom)) {
                    this.applyTransform(this.layout.layoutBox, false, this.target);
                }
                else {
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(this.target, this.layout.layoutBox);
                }
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .applyBoxDelta */ .o4)(this.target, this.targetDelta);
            }
            else {
                /**
                 * If no target, use own layout as target
                 */
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(this.target, this.layout.layoutBox);
            }
            /**
             * If we've been told to attempt to resolve a relative target, do so.
             */
            if (this.attemptToResolveRelativeTarget) {
                this.attemptToResolveRelativeTarget = false;
                if (this.options.layoutAnchor !== false &&
                    relativeParent &&
                    Boolean(relativeParent.resumingFrom) ===
                        Boolean(this.resumingFrom) &&
                    !relativeParent.options.layoutScroll &&
                    relativeParent.target &&
                    this.animationProgress !== 1) {
                    this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
                }
                else {
                    this.relativeParent = this.relativeTarget = undefined;
                }
            }
            /**
             * Increase debug counter for resolved target deltas
             */
            if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.value) {
                metrics.calculatedTargetDeltas++;
            }
        }
        getClosestProjectingParent() {
            if (!this.parent ||
                (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasScale */ .vk)(this.parent.latestValues) ||
                (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .has2DTranslate */ .vF)(this.parent.latestValues)) {
                return undefined;
            }
            if (this.parent.isProjecting()) {
                return this.parent;
            }
            else {
                return this.parent.getClosestProjectingParent();
            }
        }
        isProjecting() {
            return Boolean((this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
                this.layout);
        }
        createRelativeTarget(relativeParent, layout, parentLayout) {
            this.relativeParent = relativeParent;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            this.relativeTargetOrigin = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcRelativePosition */ .jA)(this.relativeTargetOrigin, layout, parentLayout, this.options.layoutAnchor || undefined);
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = undefined;
        }
        calcProjection() {
            const lead = this.getLead();
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            let canSkip = true;
            /**
             * If this is a normal layout animation and neither this node nor its nearest projecting
             * is dirty then we can't skip.
             */
            if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
                canSkip = false;
            }
            /**
             * If this is a shared layout animation and this node's shared projection is dirty then
             * we can't skip.
             */
            if (isShared &&
                (this.isSharedProjectionDirty || this.isTransformDirty)) {
                canSkip = false;
            }
            /**
             * If we have resolved the target this frame we must recalculate the
             * projection to ensure it visually represents the internal calculations.
             */
            if (this.resolvedRelativeTargetAt === _frameloop_frame_data_mjs__WEBPACK_IMPORTED_MODULE_14__/* .frameData */ .u.timestamp) {
                canSkip = false;
            }
            if (canSkip)
                return;
            const { layout, layoutId } = this.options;
            /**
             * If this section of the tree isn't animating we can
             * delete our target sources for the following frame.
             */
            this.isTreeAnimating = Boolean((this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId))
                return;
            /**
             * Reset the corrected box with the latest values from box, as we're then going
             * to perform mutative operations on it.
             */
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(this.layoutCorrected, this.layout.layoutBox);
            /**
             * Record previous tree scales before updating.
             */
            const prevTreeScaleX = this.treeScale.x;
            const prevTreeScaleY = this.treeScale.y;
            /**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */
            (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .applyTreeDeltas */ .OU)(this.layoutCorrected, this.treeScale, this.path, isShared);
            /**
             * If this layer needs to perform scale correction but doesn't have a target,
             * use the layout as the target.
             */
            if (lead.layout &&
                !lead.target &&
                (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
                lead.target = lead.layout.layoutBox;
                lead.targetWithTransforms = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            }
            const { target } = lead;
            if (!target) {
                /**
                 * If we don't have a target to project into, but we were previously
                 * projecting, we want to remove the stored transform and schedule
                 * a render to ensure the elements reflect the removed transform.
                 */
                if (this.prevProjectionDelta) {
                    this.createProjectionDeltas();
                    this.scheduleRender();
                }
                return;
            }
            if (!this.projectionDelta || !this.prevProjectionDelta) {
                this.createProjectionDeltas();
            }
            else {
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyAxisDeltaInto */ .xD)(this.prevProjectionDelta.x, this.projectionDelta.x);
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyAxisDeltaInto */ .xD)(this.prevProjectionDelta.y, this.projectionDelta.y);
            }
            /**
             * Update the delta between the corrected box and the target box before user-set transforms were applied.
             * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
             * for our layout reprojection, but still allow them to be scaled correctly by the user.
             * It might be that to simplify this we may want to accept that user-set scale is also corrected
             * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
             * to allow people to choose whether these styles are corrected based on just the
             * layout reprojection or the final bounding box.
             */
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcBoxDelta */ .vb)(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            if (this.treeScale.x !== prevTreeScaleX ||
                this.treeScale.y !== prevTreeScaleY ||
                !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .axisDeltaEquals */ .t$)(this.projectionDelta.x, this.prevProjectionDelta.x) ||
                !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .axisDeltaEquals */ .t$)(this.projectionDelta.y, this.prevProjectionDelta.y)) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
            /**
             * Increase debug counter for recalculated projections
             */
            if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.value) {
                metrics.calculatedProjections++;
            }
        }
        hide() {
            this.isVisible = false;
            // TODO: Schedule render
        }
        show() {
            this.isVisible = true;
            // TODO: Schedule render
        }
        scheduleRender(notifyAll = true) {
            this.options.visualElement?.scheduleRender();
            if (notifyAll) {
                const stack = this.getStack();
                stack && stack.scheduleRender();
            }
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
            this.projectionDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
            this.projectionDeltaWithTransform = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
        }
        setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false, pathFn) {
            const snapshot = this.snapshot;
            const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
            const mixedValues = { ...this.latestValues };
            const targetDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
            if (!this.relativeParent ||
                !this.relativeParent.options.layoutRoot) {
                this.relativeTarget = this.relativeTargetOrigin = undefined;
            }
            this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
            const relativeLayout = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
            const snapshotSource = snapshot ? snapshot.source : undefined;
            const layoutSource = this.layout ? this.layout.source : undefined;
            const isSharedLayoutAnimation = snapshotSource !== layoutSource;
            const stack = this.getStack();
            const isOnlyMember = !stack || stack.members.length <= 1;
            const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation &&
                !isOnlyMember &&
                this.options.crossfade === true &&
                !this.path.some(hasOpacityCrossfade));
            this.animationProgress = 0;
            let prevRelativeTarget;
            // The path decides whether the layout shift is worth curving
            // (distance floor) and resolves the interpolator from the delta.
            const interpolate = pathFn?.interpolateProjection(delta);
            this.mixTargetDelta = (latest) => {
                const progress = latest / 1000;
                const point = interpolate?.(progress);
                if (point) {
                    targetDelta.x.translate = point.x;
                    targetDelta.x.scale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(delta.x.scale, 1, progress);
                    targetDelta.x.origin = delta.x.origin;
                    targetDelta.x.originPoint = delta.x.originPoint;
                    targetDelta.y.translate = point.y;
                    targetDelta.y.scale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(delta.y.scale, 1, progress);
                    targetDelta.y.origin = delta.y.origin;
                    targetDelta.y.originPoint = delta.y.originPoint;
                }
                else {
                    mixAxisDeltaLinear(targetDelta.x, delta.x, progress);
                    mixAxisDeltaLinear(targetDelta.y, delta.y, progress);
                }
                this.setTargetDelta(targetDelta);
                if (this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout) {
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcRelativePosition */ .jA)(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || undefined);
                    mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
                    /**
                     * If this is an unchanged relative target we can consider the
                     * projection not dirty.
                     */
                    if (prevRelativeTarget &&
                        (0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .boxEquals */ .zo)(this.relativeTarget, prevRelativeTarget)) {
                        this.isProjectionDirty = false;
                    }
                    if (!prevRelativeTarget)
                        prevRelativeTarget = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(prevRelativeTarget, this.relativeTarget);
                }
                if (isSharedLayoutAnimation) {
                    this.animationValues = mixedValues;
                    (0,_animation_mix_values_mjs__WEBPACK_IMPORTED_MODULE_24__/* .mixValues */ .v)(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
                }
                if (point && point.rotate !== undefined) {
                    // Dedicated `pathRotation` channel, not `rotate`, so an
                    // animating `rotate` is composed with, never clobbered.
                    if (!this.animationValues)
                        this.animationValues = mixedValues;
                    this.animationValues.pathRotation = point.rotate;
                }
                this.root.scheduleUpdateProjection();
                this.scheduleRender();
                this.animationProgress = progress;
            };
            this.mixTargetDelta(this.options.layoutRoot ? 1000 : 0);
        }
        startAnimation(options) {
            this.notifyListeners("animationStart");
            this.currentAnimation?.stop();
            this.resumingFrom?.currentAnimation?.stop();
            if (this.pendingAnimation) {
                (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .cancelFrame */ .WG)(this.pendingAnimation);
                this.pendingAnimation = undefined;
            }
            /**
             * Start the animation in the next frame to have a frame with progress 0,
             * where the target is the same as when the animation started, so we can
             * calculate the relative positions correctly for instant transitions.
             */
            this.pendingAnimation = _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__/* .frame */ .Gt.update(() => {
                _state_mjs__WEBPACK_IMPORTED_MODULE_10__/* .globalProjectionState */ .w.hasAnimatedSinceResize = true;
                this.motionValue || (this.motionValue = (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_25__/* .motionValue */ .OQ)(0));
                this.motionValue.jump(0, false);
                this.currentAnimation = (0,_animation_animate_single_value_mjs__WEBPACK_IMPORTED_MODULE_26__/* .animateSingleValue */ .z)(this.motionValue, [0, 1000], {
                    ...options,
                    velocity: 0,
                    isSync: true,
                    onUpdate: (latest) => {
                        this.mixTargetDelta(latest);
                        options.onUpdate && options.onUpdate(latest);
                    },
                    onComplete: () => {
                        options.onComplete && options.onComplete();
                        this.completeAnimation();
                    },
                });
                (0,_animation_utils_notify_inspector_mjs__WEBPACK_IMPORTED_MODULE_27__/* .notifyLayoutAnimationStart */ .m)(this.currentAnimation, this);
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = this.currentAnimation;
                }
                this.pendingAnimation = undefined;
            });
        }
        completeAnimation() {
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            const stack = this.getStack();
            stack && stack.exitAnimationComplete();
            this.resumingFrom =
                this.currentAnimation =
                    this.animationValues =
                        undefined;
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
            if (this.currentAnimation) {
                this.mixTargetDelta && this.mixTargetDelta(animationTarget);
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        }
        applyTransformsToTarget() {
            const lead = this.getLead();
            const { targetWithTransforms, layout, latestValues } = lead;
            let { target } = lead;
            if (!targetWithTransforms || !target || !layout)
                return;
            /**
             * If we're only animating position, and this element isn't the lead element,
             * then instead of projecting into the lead box we instead want to calculate
             * a new target that aligns the two boxes but maintains the layout shape.
             */
            if (this !== lead &&
                this.layout &&
                layout &&
                shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                target = this.target || (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                const xLength = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(this.layout.layoutBox.x);
                target.x.min = lead.target.x.min;
                target.x.max = target.x.min + xLength;
                const yLength = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(this.layout.layoutBox.y);
                target.y.min = lead.target.y.min;
                target.y.max = target.y.min + yLength;
            }
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyBoxInto */ .Hy)(targetWithTransforms, target);
            /**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */
            (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_20__/* .transformBox */ .Ww)(targetWithTransforms, latestValues);
            /**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its layout layout
             * into the desired bounding box.
             */
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcBoxDelta */ .vb)(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
        }
        registerSharedNode(layoutId, node) {
            if (!this.sharedNodes.has(layoutId)) {
                this.sharedNodes.set(layoutId, new _shared_stack_mjs__WEBPACK_IMPORTED_MODULE_28__/* .NodeStack */ .P());
            }
            const stack = this.sharedNodes.get(layoutId);
            stack.add(node);
            const config = node.options.initialPromotionConfig;
            node.promote({
                transition: config ? config.transition : undefined,
                preserveFollowOpacity: config && config.shouldPreserveFollowOpacity
                    ? config.shouldPreserveFollowOpacity(node)
                    : undefined,
            });
        }
        isLead() {
            const stack = this.getStack();
            return stack ? stack.lead === this : true;
        }
        getLead() {
            const { layoutId } = this.options;
            return layoutId ? this.getStack()?.lead || this : this;
        }
        getPrevLead() {
            const { layoutId } = this.options;
            return layoutId ? this.getStack()?.prevLead : undefined;
        }
        getStack() {
            const { layoutId } = this.options;
            if (layoutId)
                return this.root.sharedNodes.get(layoutId);
        }
        promote({ needsReset, transition, preserveFollowOpacity, } = {}) {
            const stack = this.getStack();
            if (stack)
                stack.promote(this, preserveFollowOpacity);
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition)
                this.setOptions({ transition });
        }
        relegate() {
            const stack = this.getStack();
            if (stack) {
                return stack.relegate(this);
            }
            else {
                return false;
            }
        }
        resetSkewAndRotation() {
            const { visualElement } = this.options;
            if (!visualElement)
                return;
            // If there's no detected skew or rotation values, we can early return without a forced render.
            let hasDistortingTransform = false;
            /**
             * An unrolled check for rotation values. Most elements don't have any rotation and
             * skipping the nested loop and new object creation is 50% faster.
             */
            const { latestValues } = visualElement;
            if (latestValues.z ||
                latestValues.rotate ||
                latestValues.rotateX ||
                latestValues.rotateY ||
                latestValues.rotateZ ||
                latestValues.skewX ||
                latestValues.skewY) {
                hasDistortingTransform = true;
            }
            // If there's no distorting values, we don't need to do any more.
            if (!hasDistortingTransform)
                return;
            const resetValues = {};
            if (latestValues.z) {
                resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
            }
            // Check the skew and rotate value of all axes and reset to 0
            for (let i = 0; i < transformAxes.length; i++) {
                resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
                resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
            }
            // Force a render of this element to apply the transform with all skews and rotations
            // set to 0.
            visualElement.render();
            // Put back all the values we reset
            for (const key in resetValues) {
                visualElement.setStaticValue(key, resetValues[key]);
                if (this.animationValues) {
                    this.animationValues[key] = resetValues[key];
                }
            }
            // Schedule a render for the next frame. This ensures we won't visually
            // see the element with the reset rotate value applied.
            visualElement.scheduleRender();
        }
        applyProjectionStyles(targetStyle, // CSSStyleDeclaration - doesn't allow numbers to be assigned to properties
        styleProp) {
            if (!this.instance || this.isSVG)
                return;
            if (!this.isVisible) {
                targetStyle.visibility = "hidden";
                return;
            }
            const transformTemplate = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = false;
                targetStyle.visibility = "";
                targetStyle.opacity = "";
                targetStyle.pointerEvents =
                    (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_29__/* .resolveMotionValue */ .u)(styleProp?.pointerEvents) || "";
                targetStyle.transform = transformTemplate
                    ? transformTemplate(this.latestValues, "")
                    : "none";
                return;
            }
            const lead = this.getLead();
            if (!this.projectionDelta || !this.layout || !lead.target) {
                if (this.options.layoutId) {
                    targetStyle.opacity =
                        this.latestValues.opacity !== undefined
                            ? this.latestValues.opacity
                            : 1;
                    targetStyle.pointerEvents =
                        (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_29__/* .resolveMotionValue */ .u)(styleProp?.pointerEvents) || "";
                }
                if (this.hasProjected && !(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_19__/* .hasTransform */ .HD)(this.latestValues)) {
                    targetStyle.transform = transformTemplate
                        ? transformTemplate({}, "")
                        : "none";
                    this.hasProjected = false;
                }
                return;
            }
            targetStyle.visibility = "";
            const valuesToRender = lead.animationValues || lead.latestValues;
            this.applyTransformsToTarget();
            let transform = (0,_styles_transform_mjs__WEBPACK_IMPORTED_MODULE_30__/* .buildProjectionTransform */ .I)(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
            if (transformTemplate) {
                transform = transformTemplate(valuesToRender, transform);
            }
            targetStyle.transform = transform;
            const { x, y } = this.projectionDelta;
            targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
            if (lead.animationValues) {
                /**
                 * If the lead component is animating, assign this either the entering/leaving
                 * opacity
                 */
                targetStyle.opacity =
                    lead === this
                        ? valuesToRender.opacity ??
                            this.latestValues.opacity ??
                            1
                        : this.preserveOpacity
                            ? this.latestValues.opacity
                            : valuesToRender.opacityExit;
            }
            else {
                /**
                 * Or we're not animating at all, set the lead component to its layout
                 * opacity and other components to hidden.
                 */
                targetStyle.opacity =
                    lead === this
                        ? valuesToRender.opacity !== undefined
                            ? valuesToRender.opacity
                            : ""
                        : valuesToRender.opacityExit !== undefined
                            ? valuesToRender.opacityExit
                            : 0;
            }
            /**
             * Apply scale correction
             */
            for (const key in _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scaleCorrectors */ .H) {
                if (valuesToRender[key] === undefined)
                    continue;
                const { correct, applyTo, isCSSVariable } = _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scaleCorrectors */ .H[key];
                /**
                 * Only apply scale correction to the value if we have an
                 * active projection transform. Otherwise these values become
                 * vulnerable to distortion if the element changes size without
                 * a corresponding layout animation.
                 */
                const corrected = transform === "none"
                    ? valuesToRender[key]
                    : correct(valuesToRender[key], lead);
                if (applyTo) {
                    const num = applyTo.length;
                    for (let i = 0; i < num; i++) {
                        targetStyle[applyTo[i]] = corrected;
                    }
                }
                else {
                    // If this is a CSS variable, set it directly on the instance.
                    // Replacing this function from creating styles to setting them
                    // would be a good place to remove per frame object creation
                    if (isCSSVariable) {
                        this.options.visualElement.renderState.vars[key] = corrected;
                    }
                    else {
                        targetStyle[key] = corrected;
                    }
                }
            }
            /**
             * Disable pointer events on follow components. This is to ensure
             * that if a follow component covers a lead component it doesn't block
             * pointer events on the lead.
             */
            if (this.options.layoutId) {
                targetStyle.pointerEvents =
                    lead === this
                        ? (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_29__/* .resolveMotionValue */ .u)(styleProp?.pointerEvents) || ""
                        : "none";
            }
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = undefined;
        }
        // Only run on root
        resetTree() {
            this.root.nodes.forEach((node) => node.currentAnimation?.stop());
            this.root.nodes.forEach(clearMeasurements);
            this.root.sharedNodes.clear();
        }
    };
}
function updateLayout(node) {
    node.updateLayout();
}
function notifyLayoutUpdate(node) {
    const snapshot = node.resumeFrom?.snapshot || node.snapshot;
    if (node.isLead() &&
        node.layout &&
        snapshot &&
        node.hasListeners("didUpdate")) {
        const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
        const { animationType } = node.options;
        const isShared = snapshot.source !== node.layout.source;
        // TODO Maybe we want to also resize the layout snapshot so we don't trigger
        // animations for instance if layout="size" and an element has only changed position
        if (animationType === "size") {
            (0,_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_31__/* .eachAxis */ .X)((axis) => {
                const axisSnapshot = isShared
                    ? snapshot.measuredBox[axis]
                    : snapshot.layoutBox[axis];
                const length = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(axisSnapshot);
                axisSnapshot.min = layout[axis].min;
                axisSnapshot.max = axisSnapshot.min + length;
            });
        }
        else if (animationType === "x" || animationType === "y") {
            const snapAxis = animationType === "x" ? "y" : "x";
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_21__/* .copyAxisInto */ .be)(isShared
                ? snapshot.measuredBox[snapAxis]
                : snapshot.layoutBox[snapAxis], layout[snapAxis]);
        }
        else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
            (0,_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_31__/* .eachAxis */ .X)((axis) => {
                const axisSnapshot = isShared
                    ? snapshot.measuredBox[axis]
                    : snapshot.layoutBox[axis];
                const length = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcLength */ .CQ)(layout[axis]);
                axisSnapshot.max = axisSnapshot.min + length;
                /**
                 * Ensure relative target gets resized and rerendererd
                 */
                if (node.relativeTarget && !node.currentAnimation) {
                    node.isProjectionDirty = true;
                    node.relativeTarget[axis].max =
                        node.relativeTarget[axis].min + length;
                }
            });
        }
        const layoutDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
        (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcBoxDelta */ .vb)(layoutDelta, layout, snapshot.layoutBox);
        const visualDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createDelta */ .xU)();
        if (isShared) {
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcBoxDelta */ .vb)(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
        }
        else {
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcBoxDelta */ .vb)(visualDelta, layout, snapshot.layoutBox);
        }
        const hasLayoutChanged = !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .isDeltaZero */ .XY)(layoutDelta);
        let hasRelativeLayoutChanged = false;
        if (!node.resumeFrom) {
            const relativeParent = node.getClosestProjectingParent();
            /**
             * If the relativeParent is itself resuming from a different element then
             * the relative snapshot is not relavent
             */
            if (relativeParent && !relativeParent.resumeFrom) {
                const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
                if (parentSnapshot && parentLayout) {
                    const anchor = node.options.layoutAnchor || undefined;
                    const relativeSnapshot = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcRelativePosition */ .jA)(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox, anchor);
                    const relativeLayout = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_18__/* .createBox */ .ge)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .calcRelativePosition */ .jA)(relativeLayout, layout, parentLayout.layoutBox, anchor);
                    if (!(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .boxEqualsRounded */ .mG)(relativeSnapshot, relativeLayout)) {
                        hasRelativeLayoutChanged = true;
                    }
                    if (relativeParent.options.layoutRoot) {
                        node.relativeTarget = relativeLayout;
                        node.relativeTargetOrigin = relativeSnapshot;
                        node.relativeParent = relativeParent;
                    }
                }
            }
        }
        node.notifyListeners("didUpdate", {
            layout,
            snapshot,
            delta: visualDelta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeLayoutChanged,
        });
    }
    else if (node.isLead()) {
        const { onExitComplete } = node.options;
        onExitComplete && onExitComplete();
    }
    /**
     * Clearing transition
     * TODO: Investigate why this transition is being passed in as {type: false } from Framer
     * and why we need it at all
     */
    node.options.transition = undefined;
}
function propagateDirtyNodes(node) {
    /**
     * Increase debug counter for nodes encountered this frame
     */
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__/* .statsBuffer */ .Q.value) {
        metrics.nodes++;
    }
    if (!node.parent)
        return;
    /**
     * If this node isn't projecting, propagate isProjectionDirty. It will have
     * no performance impact but it will allow the next child that *is* projecting
     * but *isn't* dirty to just check its parent to see if *any* ancestor needs
     * correcting.
     */
    if (!node.isProjecting()) {
        node.isProjectionDirty = node.parent.isProjectionDirty;
    }
    /**
     * Propagate isSharedProjectionDirty and isTransformDirty
     * throughout the whole tree. A future revision can take another look at
     * this but for safety we still recalcualte shared nodes.
     */
    node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty ||
        node.parent.isProjectionDirty ||
        node.parent.isSharedProjectionDirty));
    node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
    node.isProjectionDirty =
        node.isSharedProjectionDirty =
            node.isTransformDirty =
                false;
}
function clearSnapshot(node) {
    node.clearSnapshot();
}
function clearMeasurements(node) {
    node.clearMeasurements();
}
function forceLayoutMeasure(node) {
    node.isLayoutDirty = true;
    node.updateLayout();
}
function clearIsLayoutDirty(node) {
    node.isLayoutDirty = false;
}
/**
 * When a node is animation-blocked (e.g. during drag) and its component
 * didn't re-render (memoized), willUpdate() is never called so there's
 * no snapshot. Use the previous layout as a snapshot and mark dirty so
 * resetTransform/updateLayout/notifyLayoutUpdate process it normally.
 */
function ensureDraggedNodesSnapshotted(node) {
    if (node.isAnimationBlocked && node.layout && !node.isLayoutDirty) {
        node.snapshot = node.layout;
        node.isLayoutDirty = true;
    }
}
/**
 * If a node's relative parent is about to be re-measured but the node isn't
 * (e.g. it's in another LayoutGroup), its relative target is out of date.
 * If it's layout animating, re-measure it too, so its relative target keeps
 * resolving against current layouts. Otherwise its layout is still valid
 * relative to its parent, so drop the relative target, and any targetDelta
 * left over from a finished animation while an ancestor still animates, to be
 * rebuilt from its layout.
 */
function syncRelativeLayout(node) {
    if (node.relativeTarget && node.relativeParent?.isLayoutDirty) {
        if (node.currentAnimation) {
            node.isLayoutDirty = true;
        }
        else {
            node.targetDelta = undefined;
            node.removeRelativeTarget();
        }
    }
}
function resetTransformStyle(node) {
    const { visualElement } = node.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
        visualElement.notify("BeforeLayoutMeasure");
    }
    node.resetTransform();
}
function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = undefined;
    node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
    node.resolveTargetDelta();
}
function calcProjection(node) {
    node.calcProjection();
}
function resetSkewAndRotation(node) {
    node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
}
function mixAxisDeltaLinear(output, delta, p) {
    output.translate = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(delta.translate, 0, p);
    output.scale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(delta.scale, 1, p);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
    output.min = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(from.min, to.min, p);
    output.max = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_23__/* .mixNumber */ .k)(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
    mixAxis(output.x, from.x, to.x, p);
    mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
    return (node.animationValues && node.animationValues.opacityExit !== undefined);
}
const defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
};
const userAgentContains = (string) => typeof navigator !== "undefined" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(string);
/**
 * Measured bounding boxes must be rounded in Safari and
 * left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
 * can appear to jump.
 */
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/")
    ? Math.round
    : motion_utils__WEBPACK_IMPORTED_MODULE_32__/* .noop */ .l;
function roundAxis(axis) {
    // Round to the nearest .5 pixels to support subpixel layouts
    axis.min = roundPoint(axis.min);
    axis.max = roundPoint(axis.max);
}
function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
    return (animationType === "position" ||
        (animationType === "preserve-aspect" &&
            !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_17__/* .isNear */ .HQ)((0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .aspectRatio */ .cH)(snapshot), (0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_11__/* .aspectRatio */ .cH)(layout), 0.2)));
}
function checkNodeWasScrollRoot(node) {
    return node !== node.root && node.scroll?.wasRoot;
}


//# sourceMappingURL=create-projection-node.mjs.map


/***/ }),

/***/ 877214:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ isValidMotionProp)
/* harmony export */ });
/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "propagate",
    "ignoreStrict",
    "viewport",
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
function isValidMotionProp(key) {
    return (key.startsWith("while") ||
        (key.startsWith("drag") && key !== "draggable") ||
        key.startsWith("layout") ||
        key.startsWith("onTap") ||
        key.startsWith("onPan") ||
        key.startsWith("onLayout") ||
        validMotionProps.has(key));
}


//# sourceMappingURL=valid-prop.mjs.map


/***/ }),

/***/ 883955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ canAnimate)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116038);
/* harmony import */ var _generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(609774);
/* harmony import */ var _is_animatable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(688222);




function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1)
        return true;
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] !== current)
            return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */
    const originKeyframe = keyframes[0];
    if (originKeyframe === null) {
        return false;
    }
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */
    if (name === "display" || name === "visibility")
        return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = (0,_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isAnimatable */ .P)(originKeyframe, name);
    const isTargetAnimatable = (0,_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isAnimatable */ .P)(targetKeyframe, name);
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        // Only build the message when we're going to warn
        isOriginAnimatable !== isTargetAnimatable &&
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .warning */ .$)(false, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
        return false;
    }
    return (hasKeyframesChanged(keyframes) ||
        ((type === "spring" || (0,_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isGenerator */ .W)(type)) && velocity));
}


//# sourceMappingURL=can-animate.mjs.map


/***/ }),

/***/ 885372:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getCurrentTreeVariants)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(938394);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(485710);


function getCurrentTreeVariants(props, context) {
    if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_0__/* .isControllingVariants */ .e)(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .isVariantLabel */ .w)(initial)
                ? initial
                : undefined,
            animate: (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .isVariantLabel */ .w)(animate) ? animate : undefined,
        };
    }
    return props.inherit !== false ? context : {};
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ 887534:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ correctBoxShadow)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78027);
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144914);



const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
        const original = latest;
        const shadow = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f.parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5)
            return original;
        const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f.createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */
        const averageScale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__/* .mixNumber */ .k)(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number")
            shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number")
            shadow[3 + offset] /= averageScale;
        return template(shadow);
    },
};


//# sourceMappingURL=scale-box-shadow.mjs.map


/***/ }),

/***/ 892377:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ convertOffsetToTimes)
/* harmony export */ });
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}


//# sourceMappingURL=time.mjs.map


/***/ }),

/***/ 893180:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ isZeroValueString)
/* harmony export */ });
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);


//# sourceMappingURL=is-zero-value-string.mjs.map


/***/ }),

/***/ 902468:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ getDefaultValueType)
/* harmony export */ });
/* unused harmony export defaultValueTypes */
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(513002);
/* harmony import */ var _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(832999);
/* harmony import */ var _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(956093);
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(837953);





/**
 * A map of default value types for common values
 */
const defaultValueTypes = {
    ..._number_mjs__WEBPACK_IMPORTED_MODULE_0__/* .numberValueTypes */ .W,
    // Color props
    color: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    backgroundColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    outlineColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    fill: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    stroke: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    // Border props
    borderColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    borderTopColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    borderRightColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    borderBottomColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    borderLeftColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .color */ .y,
    filter: _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__/* .filter */ .p,
    WebkitFilter: _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__/* .filter */ .p,
    mask: _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_3__/* .mask */ .d,
    WebkitMask: _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_3__/* .mask */ .d,
};
/**
 * Gets the default ValueType for the provided value key
 */
const getDefaultValueType = (key) => defaultValueTypes[key];


//# sourceMappingURL=defaults.mjs.map


/***/ }),

/***/ 902606:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ makeAnimationInstant)
/* harmony export */ });
function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
}


//# sourceMappingURL=make-animation-instant.mjs.map


/***/ }),

/***/ 902945:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ animateVariant)
/* harmony export */ });
/* harmony import */ var _render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(761024);
/* harmony import */ var _utils_calc_child_stagger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(623781);
/* harmony import */ var _visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(550937);




function animateVariant(visualElement, variant, options = {}) {
    const resolved = (0,_render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .resolveVariant */ .K)(visualElement, variant, (0,_render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .getTypeCustom */ .Q)(visualElement, options.type));
    const transition = options.transitionOverride ||
        (resolved?.transition ?? (visualElement.getDefaultTransition() || {}));
    const getAnimation = () => Promise.all(resolved ? (0,_visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__/* .animateTarget */ .$)(visualElement, resolved, options) : []);
    const getChildAnimations = (delay = 0) => {
        const { variantChildren } = visualElement;
        const { delayChildren = 0, staggerChildren, staggerDirection, } = transition;
        const animations = [];
        variantChildren?.forEach((child) => {
            child.notify("AnimationStart", variant);
            animations.push(animateVariant(child, variant, {
                ...options,
                delay: delay +
                    (typeof delayChildren === "function"
                        ? 0
                        : delayChildren) +
                    (0,_utils_calc_child_stagger_mjs__WEBPACK_IMPORTED_MODULE_2__/* .calcChildStagger */ .L)(variantChildren, child, delayChildren, staggerChildren, staggerDirection),
            }).then(() => child.notify("AnimationComplete", variant)));
        });
        return Promise.all(animations);
    };
    /**
     * when: "beforeChildren" | "afterChildren" runs this element's animation
     * and its children's in sequence.
     */
    const { when } = transition;
    return when
        ? when === "beforeChildren"
            ? getAnimation().then(() => getChildAnimations())
            : getChildAnimations().then(getAnimation)
        : Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}


//# sourceMappingURL=visual-element-variant.mjs.map


/***/ }),

/***/ 912461:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ hex)
/* harmony export */ });
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(938520);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(270813);



function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
        // Or we have 3 characters, ie #F00
    }
    else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isColorString */ .$)("#"),
    parse: parseHex,
    transform: _rgba_mjs__WEBPACK_IMPORTED_MODULE_1__/* .rgba */ .B.transform,
};


//# sourceMappingURL=hex.mjs.map


/***/ }),

/***/ 918222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   zK: () => (/* binding */ isForcedMotionValue)
/* harmony export */ });
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457848);
/* harmony import */ var _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(216950);




function isForcedMotionValue(key, { layout, layoutId }) {
    return (_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformProps */ .f.has(key) ||
        key.startsWith("origin") ||
        ((layout || layoutId !== undefined) &&
            (!!_projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__/* .scaleCorrectors */ .H[key] || key === "opacity")));
}


//# sourceMappingURL=is-forced-motion-value.mjs.map


/***/ }),

/***/ 921731:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ createRenderBatcher)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(128765);
/* harmony import */ var _order_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(631094);
/* harmony import */ var _render_step_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(806069);




const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive, state = {
    delta: 0.0,
    timestamp: 0.0,
    isProcessing: false,
}) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const flagRunNextFrame = () => (runNextFrame = true);
    const steps = _order_mjs__WEBPACK_IMPORTED_MODULE_0__/* .stepsOrder */ .q.reduce((acc, key) => {
        acc[key] = (0,_render_step_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createRenderStep */ .n)(flagRunNextFrame);
        return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender, } = steps;
    const processBatch = () => {
        const useManualTiming = motion_utils__WEBPACK_IMPORTED_MODULE_2__/* .MotionGlobalConfig */ .W.useManualTiming;
        const timestamp = useManualTiming
            ? state.timestamp
            : performance.now();
        runNextFrame = false;
        if (!useManualTiming) {
            state.delta = useDefaultElapsed
                ? 1000 / 60
                : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        setup.process(state);
        read.process(state);
        resolveKeyframes.process(state);
        preUpdate.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = () => {
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = _order_mjs__WEBPACK_IMPORTED_MODULE_0__/* .stepsOrder */ .q.reduce((acc, key) => {
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false) => {
            if (!runNextFrame)
                wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process) => {
        for (let i = 0; i < _order_mjs__WEBPACK_IMPORTED_MODULE_0__/* .stepsOrder */ .q.length; i++) {
            steps[_order_mjs__WEBPACK_IMPORTED_MODULE_0__/* .stepsOrder */ .q[i]].cancel(process);
        }
    };
    return { schedule, cancel, state, steps };
}


//# sourceMappingURL=batcher.mjs.map


/***/ }),

/***/ 922000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KN: () => (/* binding */ percent),
/* harmony export */   gQ: () => (/* binding */ progressPercentage),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   uj: () => (/* binding */ degrees),
/* harmony export */   vh: () => (/* binding */ vh),
/* harmony export */   vw: () => (/* binding */ vw)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const createUnitType = (unit) => ({
    test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = /*@__PURE__*/ (() => ({
    ...percent,
    parse: (v) => percent.parse(v) / 100,
    transform: (v) => percent.transform(v * 100),
}))();


//# sourceMappingURL=units.mjs.map


/***/ }),

/***/ 926257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ useCreateMotionContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(212027);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(885372);
/* __next_internal_client_entry_do_not_use__ useCreateMotionContext auto */ 


function useCreateMotionContext(props) {
    const { initial, animate } = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentTreeVariants */ ._)(props, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .MotionContext */ .A));
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            initial,
            animate
        }), [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
 //# sourceMappingURL=create.mjs.map


/***/ }),

/***/ 928186:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ defaultScaleCorrectors)
/* harmony export */ });
/* harmony import */ var _utils_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74389);
/* harmony import */ var _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(774235);
/* harmony import */ var _scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(887534);




const defaultScaleCorrectors = {
    borderRadius: {
        ..._scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .correctBorderRadius */ .P,
        applyTo: [..._utils_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__/* .cornerRadiusProps */ .S],
    },
    borderTopLeftRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .correctBorderRadius */ .P,
    borderTopRightRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .correctBorderRadius */ .P,
    borderBottomLeftRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .correctBorderRadius */ .P,
    borderBottomRightRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_0__/* .correctBorderRadius */ .P,
    boxShadow: _scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_2__/* .correctBoxShadow */ ._,
};


//# sourceMappingURL=default-scale-correctors.mjs.map


/***/ }),

/***/ 928532:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35133);
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(457848);
/* harmony import */ var _html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249757);




function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0,_html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_0__/* .scrapeMotionValuesFromProps */ .x)(props, prevProps, visualElement);
    for (const key in props) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isMotionValue */ .S)(props[key]) ||
            (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isMotionValue */ .S)(prevProps[key])) {
            const targetKey = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transformPropOrder */ .U.indexOf(key) !== -1
                ? "attr" + key.charAt(0).toUpperCase() + key.substring(1)
                : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}


//# sourceMappingURL=scrape-motion-values.mjs.map


/***/ }),

/***/ 938394:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ isVariantNode),
/* harmony export */   e: () => (/* binding */ isControllingVariants)
/* harmony export */ });
/* harmony import */ var _is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(708889);
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(485710);
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(429871);




function isControllingVariants(props) {
    if ((0,_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isAnimationControls */ .N)(props.animate))
        return true;
    for (let i = 0; i < _variant_props_mjs__WEBPACK_IMPORTED_MODULE_1__/* .variantProps */ ._.length; i++) {
        if ((0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isVariantLabel */ .w)(props[_variant_props_mjs__WEBPACK_IMPORTED_MODULE_1__/* .variantProps */ ._[i]])) {
            return true;
        }
    }
    return false;
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}


//# sourceMappingURL=is-controlling-variants.mjs.map


/***/ }),

/***/ 938520:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ rgba)
/* harmony export */ });
/* unused harmony export rgbUnit */
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91524);
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(320193);
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(255817);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(270813);





const clampRgbUnit = (v) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .clamp */ .q)(0, 255, v);
const rgbUnit = {
    ..._numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .number */ .ai,
    transform: (v) => Math.round(clampRgbUnit(v)),
};
const rgba = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__/* .isColorString */ .$)("rgb", "red"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__/* .splitColor */ .q)("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" +
        rgbUnit.transform(red) +
        ", " +
        rgbUnit.transform(green) +
        ", " +
        rgbUnit.transform(blue) +
        ", " +
        (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__/* .sanitize */ .a)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__/* .alpha */ .X4.transform(alpha$1)) +
        ")",
};


//# sourceMappingURL=rgba.mjs.map


/***/ }),

/***/ 939693:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a6: () => (/* binding */ easeIn),
/* harmony export */   am: () => (/* binding */ easeInOut),
/* harmony export */   vT: () => (/* binding */ easeOut)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(378209);


const easeIn = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezier */ .A)(0.42, 0, 1, 1);
const easeOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezier */ .A)(0, 0, 0.58, 1);
const easeInOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__/* .cubicBezier */ .A)(0.42, 0, 0.58, 1);


//# sourceMappingURL=ease.mjs.map


/***/ }),

/***/ 939755:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ createHtmlRenderState)
/* harmony export */ });
const createHtmlRenderState = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {},
});


//# sourceMappingURL=create-render-state.mjs.map


/***/ }),

/***/ 947862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ SVGVisualElement)
/* harmony export */ });
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(457848);
/* harmony import */ var _value_types_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(902468);
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(628265);
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(326510);
/* harmony import */ var _dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(694696);
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(583441);
/* harmony import */ var _utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(110645);
/* harmony import */ var _utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(536866);
/* harmony import */ var _utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(206536);
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(262442);
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(928532);












class SVGVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .DOMVisualElement */ .b {
    constructor() {
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_1__/* .createBox */ .ge;
    }
    getBaseTargetFromProps(props, key) {
        /**
         * An independent transform's base is never an attribute of the same
         * name, e.g. <rect x> is a position, not a translate. Like HTML it
         * comes from style, falling back to the transform's default.
         */
        return _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transformProps */ .f.has(key)
            ? super.getBaseTargetFromProps(props, key) ??
                (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__/* .defaultTransformValue */ .zs)(key)
            : props[key];
    }
    /**
     * An independent transform's origin is never read from the DOM, so it
     * starts from its latest or default value and renders on mount.
     */
    getDefaultValue(key) {
        return _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transformProps */ .f.has(key)
            ? this.latestValues[key] ?? (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_3__/* .defaultTransformValue */ .zs)(key)
            : undefined;
    }
    readValueFromInstance(instance, key) {
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__/* .transformProps */ .f.has(key)) {
            const defaultType = (0,_value_types_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getDefaultValueType */ .D)(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        if (_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__/* .cssStyleProperties */ .W.includes(key)) {
            const computedStyle = getComputedStyle(instance);
            const value = computedStyle[key];
            if (typeof value === "string" && value)
                return value.trim();
        }
        key = !_utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__/* .camelCaseAttributes */ .e.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_7__/* .camelToDash */ .I)(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_8__/* .scrapeMotionValuesFromProps */ .x)(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__/* .buildSVGAttrs */ .B)(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        (0,_utils_render_mjs__WEBPACK_IMPORTED_MODULE_9__/* .renderSVG */ .d)(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = (0,_utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_10__/* .isSVGTag */ .n)(instance.tagName);
        super.mount(instance);
    }
}


//# sourceMappingURL=SVGVisualElement.mjs.map


/***/ }),

/***/ 954078:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ isNone)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893180);


function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    }
    else if (value !== null) {
        return value === "none" || value === "0" || (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__/* .isZeroValueString */ .$)(value);
    }
    else {
        return true;
    }
}


//# sourceMappingURL=is-none.mjs.map


/***/ }),

/***/ 956093:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ mask)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78027);


const mask = {
    ..._index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f,
    getAnimatableNone: (v) => {
        const parsed = _index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f.parse(v);
        const transformer = _index_mjs__WEBPACK_IMPORTED_MODULE_0__/* .complex */ .f.createTransformer(v);
        return transformer(parsed.map((v) => typeof v === "number" ? 0 : typeof v === "object" ? { ...v, alpha: 1 } : v));
    },
};


//# sourceMappingURL=mask.mjs.map


/***/ }),

/***/ 958904:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ mixImmediate)
/* harmony export */ });
function mixImmediate(a, b) {
    return (p) => (p > 0 ? b : a);
}


//# sourceMappingURL=immediate.mjs.map


/***/ }),

/***/ 962087:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ addValueToWillChange)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(128765);
/* harmony import */ var _is_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(245888);



function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */
    if ((0,_is_mjs__WEBPACK_IMPORTED_MODULE_0__/* .isWillChangeMotionValue */ .k)(willChange)) {
        return willChange.add(key);
    }
    else if (!willChange && motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .MotionGlobalConfig */ .W.WillChange) {
        const newWillChange = new motion_utils__WEBPACK_IMPORTED_MODULE_1__/* .MotionGlobalConfig */ .W.WillChange("auto");
        visualElement.addValue("willChange", newWillChange);
        newWillChange.add(key);
    }
}


//# sourceMappingURL=add-will-change.mjs.map


/***/ }),

/***/ 963969:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ Feature)
/* harmony export */ });
/**
 * Feature base class for extending VisualElement functionality.
 * Features are plugins that can be mounted/unmounted to add behavior
 * like gestures, animations, or layout tracking.
 */
class Feature {
    constructor(node) {
        this.isMounted = false;
        this.node = node;
    }
    update() { }
}


//# sourceMappingURL=Feature.mjs.map


/***/ }),

/***/ 967073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ positionalKeys)
/* harmony export */ });
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457848);


const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ..._keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__/* .transformPropOrder */ .U,
]);


//# sourceMappingURL=keys-position.mjs.map


/***/ }),

/***/ 975719:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ isRefObject)
/* harmony export */ });
function isRefObject(ref) {
    return (ref &&
        typeof ref === "object" &&
        Object.prototype.hasOwnProperty.call(ref, "current"));
}


//# sourceMappingURL=is-ref-object.mjs.map


/***/ }),

/***/ 982423:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useConstant)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ useConstant auto */ 
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */ function useConstant(init) {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
 //# sourceMappingURL=use-constant.mjs.map


/***/ }),

/***/ 996796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ useHTMLProps),
/* harmony export */   o: () => (/* binding */ copyRawValuesOnly)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35133);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(918222);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(299596);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(939755);
/* __next_internal_client_entry_do_not_use__ copyRawValuesOnly,useHTMLProps auto */ 


function copyRawValuesOnly(target, source, props) {
    for(const key in source){
        if (!(0,motion_dom__WEBPACK_IMPORTED_MODULE_1__/* .isMotionValue */ .S)(source[key]) && !(0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isForcedMotionValue */ .zK)(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        const state = (0,_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_3__/* .createHtmlRenderState */ .d)();
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_4__/* .buildHTMLStyles */ .O)(state, visualState, transformTemplate);
        return Object.assign({}, state.vars, state.style);
    }, [
        visualState
    ]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */ copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        // Disable scrolling on the draggable direction
        style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined && (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}
 //# sourceMappingURL=use-props.mjs.map


/***/ })

};
;