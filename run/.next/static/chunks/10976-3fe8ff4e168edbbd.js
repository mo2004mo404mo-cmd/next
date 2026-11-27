"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[10976],{

/***/ 278:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ image)
/* harmony export */ });
/* harmony import */ var _util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40464);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Image, Parents} from 'mdast'
 */



image.peek = imagePeek

/**
 * Serialize an image node.
 *
 * @param {Image} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function image(node, _, state, info) {
  const quote = (0,_util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__/* .checkQuote */ .Z)(state)
  const suffix = quote === '"' ? 'Quote' : 'Apostrophe'
  const exit = state.enter('image')
  let subexit = state.enter('label')
  const tracker = state.createTracker(info)
  let value = tracker.move('![')
  value += tracker.move(
    state.safe(node.alt, {before: value, after: ']', ...tracker.current()})
  )
  value += tracker.move('](')

  subexit()

  if (
    // If there’s no url but there is a title…
    (!node.url && node.title) ||
    // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)
  ) {
    subexit = state.enter('destinationLiteral')
    value += tracker.move('<')
    value += tracker.move(
      state.safe(node.url, {before: value, after: '>', ...tracker.current()})
    )
    value += tracker.move('>')
  } else {
    // No whitespace, raw is prettier.
    subexit = state.enter('destinationRaw')
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: node.title ? ' ' : ')',
        ...tracker.current()
      })
    )
  }

  subexit()

  if (node.title) {
    subexit = state.enter(`title${suffix}`)
    value += tracker.move(' ' + quote)
    value += tracker.move(
      state.safe(node.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    )
    value += tracker.move(quote)
    subexit()
  }

  value += tracker.move(')')
  exit()

  return value
}

/**
 * Peek at this node.
 *
 * @returns {string}
 *   Start of the serialized markdown.
 */
function imagePeek() {
  return '!'
}


/***/ }),

/***/ 1770:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ lastCharacter),
/* harmony export */   m: () => (/* binding */ firstCharacter)
/* harmony export */ });
/**
 * Get the first character of a value.
 *
 * Is aware of astral characters (such as emoji).
 *
 * @param {string} value
 *   Value.
 * @returns {string}
 *   First character; empty if `value` is empty.
 */
function firstCharacter(value) {
  const code = value.codePointAt(0)
  return code === undefined ? '' : String.fromCodePoint(code)
}

/**
 * Get the last character of a value.
 *
 * Is aware of astral characters (such as emoji).
 *
 * @param {string} value
 *   Value.
 * @returns {string}
 *   Last character; empty if `value` is empty.
 */
function lastCharacter(value) {
  // Only a surrogate pair gives a code point above the BMP.
  const code = value.codePointAt(value.length - 2)
  return code !== undefined && code > 0xff_ff
    ? value.slice(-2)
    : value.slice(-1)
}


/***/ }),

/***/ 1964:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ code)
/* harmony export */ });
/* harmony import */ var longest_streak__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30040);
/* harmony import */ var _util_format_code_as_indented_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67003);
/* harmony import */ var _util_check_fence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31649);
/**
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 * @import {Code, Parents} from 'mdast'
 */





/**
 * Serialize a code node.
 *
 * @param {Code} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function code(node, _, state, info) {
  const marker = (0,_util_check_fence_js__WEBPACK_IMPORTED_MODULE_0__/* .checkFence */ .A)(state)
  const raw = node.value || ''

  if ((0,_util_format_code_as_indented_js__WEBPACK_IMPORTED_MODULE_1__/* .formatCodeAsIndented */ .m)(node, state)) {
    const exit = state.enter('codeIndented')
    const value = state.indentLines(raw, map)
    exit()
    return value
  }

  const tracker = state.createTracker(info)
  const sequence = marker.repeat(Math.max((0,longest_streak__WEBPACK_IMPORTED_MODULE_2__/* .longestStreak */ .D)(raw, marker) + 1, 3))
  const exit = state.enter('codeFenced')
  const suffix = marker === '`' ? 'GraveAccent' : 'Tilde'
  let value = tracker.move(sequence)

  if (node.lang) {
    const subexit = state.enter(`codeFencedLang${suffix}`)
    value += tracker.move(
      state.safe(node.lang, {
        before: value,
        after: ' ',
        encode: ['`'],
        ...tracker.current()
      })
    )
    subexit()
  }

  if (node.lang && node.meta) {
    const subexit = state.enter(`codeFencedMeta${suffix}`)
    value += tracker.move(' ')
    value += tracker.move(
      state.safe(node.meta, {
        before: value,
        after: '\n',
        encode: ['`'],
        ...tracker.current()
      })
    )
    subexit()
  }

  value += tracker.move('\n')

  if (raw) {
    value += tracker.move(raw + '\n')
  }

  value += tracker.move(sequence)
  exit()
  return value
}

/**
 * Indent lines w/ code indent.
 *
 * @type {Map}
 */
function map(line, _, blank) {
  return (blank ? '' : '    ') + line
}


/***/ }),

/***/ 3956:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $X: () => (/* binding */ readonlyProcessor),
/* harmony export */   $k: () => (/* binding */ optionalProcessor),
/* harmony export */   A: () => (/* binding */ prefaultProcessor),
/* harmony export */   A6: () => (/* binding */ customProcessor),
/* harmony export */   C0: () => (/* binding */ enumProcessor),
/* harmony export */   CN: () => (/* binding */ tupleProcessor),
/* harmony export */   Ec: () => (/* binding */ objectProcessor),
/* harmony export */   Fl: () => (/* binding */ dateProcessor),
/* harmony export */   Fs: () => (/* binding */ aggregateChecks),
/* harmony export */   NV: () => (/* binding */ unknownProcessor),
/* harmony export */   Q9: () => (/* binding */ catchProcessor),
/* harmony export */   RH: () => (/* binding */ neverProcessor),
/* harmony export */   SW: () => (/* binding */ stringProcessor),
/* harmony export */   Wg: () => (/* binding */ numberProcessor),
/* harmony export */   Y8: () => (/* binding */ bigintProcessor),
/* harmony export */   cR: () => (/* binding */ nonoptionalProcessor),
/* harmony export */   cY: () => (/* binding */ arrayProcessor),
/* harmony export */   dO: () => (/* binding */ booleanProcessor),
/* harmony export */   fs: () => (/* binding */ pipeProcessor),
/* harmony export */   iC: () => (/* binding */ unionProcessor),
/* harmony export */   i_: () => (/* binding */ intersectionProcessor),
/* harmony export */   mh: () => (/* binding */ defaultProcessor),
/* harmony export */   xi: () => (/* binding */ transformProcessor),
/* harmony export */   yq: () => (/* binding */ nullableProcessor)
/* harmony export */ });
/* unused harmony exports symbolProcessor, nullProcessor, undefinedProcessor, voidProcessor, anyProcessor, literalProcessor, nanProcessor, templateLiteralProcessor, fileProcessor, successProcessor, functionProcessor, mapProcessor, setProcessor, recordProcessor, promiseProcessor, lazyProcessor, allProcessors, toJSONSchema */
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9459);
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38324);
/* harmony import */ var _to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38918);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);




const narrowMin = (agg, key, value) => {
    if (agg[key] === undefined || value > agg[key])
        agg[key] = value;
};
const narrowMax = (agg, key, value) => {
    if (agg[key] === undefined || value < agg[key])
        agg[key] = value;
};
const narrowBoth = (agg, value) => {
    narrowMin(agg, "minimum", value);
    narrowMax(agg, "maximum", value);
};
const addDivisor = (agg, value) => {
    agg.multipleOf ?? (agg.multipleOf = []);
    if (!agg.multipleOf.includes(value))
        agg.multipleOf.push(value);
};
const addPattern = (agg, pattern) => {
    agg.patterns ?? (agg.patterns = new Set());
    agg.patterns.add(pattern);
};
const intersectMime = (agg, mime) => {
    agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
// last-wins, matching the bag's historical write order; the flag keeps an integer format from being lost to a later float one
const setFormat = (agg, format) => {
    agg.format = format;
    if (format.includes("int"))
        agg.isInt = true;
};
const minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
const maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
const formatContributor = (ranges) => (agg, def) => {
    setFormat(agg, def.format);
    const [minimum, maximum] = ranges[def.format];
    narrowMin(agg, "minimum", minimum);
    narrowMax(agg, "maximum", maximum);
};
const contributors = {
    greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
    less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
    multiple_of: (agg, def) => addDivisor(agg, def.value),
    number_format: formatContributor(_util_js__WEBPACK_IMPORTED_MODULE_0__/* .NUMBER_FORMAT_RANGES */ .zH),
    bigint_format: formatContributor(_util_js__WEBPACK_IMPORTED_MODULE_0__/* .BIGINT_FORMAT_RANGES */ .NR),
    min_length: minContributor,
    max_length: maxContributor,
    length_equals: (agg, def) => narrowBoth(agg, def.length),
    min_size: minContributor,
    max_size: maxContributor,
    size_equals: (agg, def) => narrowBoth(agg, def.size),
    string_format: (agg, def) => {
        setFormat(agg, def.format);
        if (def.pattern)
            addPattern(agg, def.pattern);
        if (def.format === "base64" || def.format === "base64url")
            agg.contentEncoding = def.format;
        if (def.local || def.precision === -1)
            agg.laxFormat = true;
    },
    mime_type: (agg, def) => intersectMime(agg, def.mime),
};
function aggregateChecks(schema) {
    const agg = {};
    const def = schema._zod.def;
    // a format schema is its own first check, same rule as $ZodType init
    const list = schema._zod.traits.has("$ZodCheck")
        ? [schema, ...(def.checks ?? [])]
        : (def.checks ?? []);
    for (const ch of list)
        contributors[ch._zod.def.check]?.(agg, ch._zod.def);
    // reconcile with the bag so third-party onattach contributions still land; first-party residue is never tighter than the fold, so merging it back is idempotent for one and additive for the other
    const bag = schema._zod.bag;
    if (bag.minimum !== undefined)
        narrowMin(agg, "minimum", bag.minimum);
    if (bag.exclusiveMinimum !== undefined)
        narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
    if (bag.maximum !== undefined)
        narrowMax(agg, "maximum", bag.maximum);
    if (bag.exclusiveMaximum !== undefined)
        narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
    if (bag.multipleOf !== undefined)
        addDivisor(agg, bag.multipleOf);
    if (bag.format !== undefined) {
        agg.format ?? (agg.format = bag.format);
        if (bag.format.includes("int"))
            agg.isInt = true;
    }
    if (bag.mime)
        intersectMime(agg, bag.mime);
    for (const pattern of bag.patterns ?? [])
        addPattern(agg, pattern);
    return agg;
}
const formatMap = {
    guid: "uuid",
    url: "uri",
    datetime: "date-time",
    json_string: "json-string",
    regex: "", // do not set
};
// ==================== SIMPLE TYPE PROCESSORS ====================
// the runtime patterns are lax so parse paths never overflow the regex stack; the emitted schema swaps in the exact block forms, which zod itself never executes
const exactPatterns = new Map([
    [_schemas_js__WEBPACK_IMPORTED_MODULE_1__/* .base64Charset */ .cq, _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .base64 */ .K3],
    [_schemas_js__WEBPACK_IMPORTED_MODULE_1__/* .base64urlCharset */ .xE, _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .base64url */ .r0],
]);
const exactPattern = (p) => exactPatterns.get(p) ?? p;
const stringProcessor = (schema, ctx, _json, _params) => {
    const json = _json;
    json.type = "string";
    const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
    if (typeof minimum === "number")
        json.minLength = minimum;
    if (typeof maximum === "number")
        json.maxLength = maximum;
    // custom pattern overrides format
    if (format) {
        json.format = formatMap[format] ?? format;
        if (json.format === "")
            delete json.format; // empty format is not valid
        // `z.iso.time()` is never full-time, and `laxFormat` carries the datetime shapes that also accept what their keyword forbids
        if (format === "time" || laxFormat) {
            delete json.format;
        }
    }
    if (contentEncoding)
        json.contentEncoding = contentEncoding;
    if (patterns && patterns.size > 0) {
        const patternList = [...patterns].map(exactPattern);
        if (patternList.length === 1)
            json.pattern = patternList[0].source;
        else if (patternList.length > 1) {
            json.allOf = [
                ...patternList.map((regex) => ({
                    ...(ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0"
                        ? { type: "string" }
                        : {}),
                    pattern: regex.source,
                })),
            ];
        }
    }
};
const numberProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
    json.type = isInt ? "integer" : "number";
    // when both minimum and exclusiveMinimum exist, pick the more restrictive one
    const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
    const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
    const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
    if (exMin) {
        if (legacy) {
            json.minimum = exclusiveMinimum;
            json.exclusiveMinimum = true;
        }
        else {
            json.exclusiveMinimum = exclusiveMinimum;
        }
    }
    else if (typeof minimum === "number") {
        json.minimum = minimum;
    }
    if (exMax) {
        if (legacy) {
            json.maximum = exclusiveMaximum;
            json.exclusiveMaximum = true;
        }
        else {
            json.exclusiveMaximum = exclusiveMaximum;
        }
    }
    else if (typeof maximum === "number") {
        json.maximum = maximum;
    }
    if (multipleOf) {
        // JSON Schema requires a divisor strictly greater than zero, and a non-finite one does not survive JSON at all. A negative divisor accepts exactly what its absolute value accepts, so it still maps; zero, NaN and Infinity have no keyword form.
        const divisors = new Set();
        for (const divisor of multipleOf) {
            if (Number.isFinite(divisor) && divisor !== 0)
                divisors.add(Math.abs(divisor));
            else
                (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
        }
        // chained divisors are a conjunction the keyword cannot carry alone, so extras ride an allOf, same as stacked patterns
        const [first, ...rest] = divisors;
        if (first !== undefined)
            json.multipleOf = first;
        if (rest.length)
            json.allOf = [...(json.allOf ?? []), ...rest.map((m) => ({ multipleOf: m }))];
    }
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
    json.type = "boolean";
};
const bigintProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt cannot be represented in JSON Schema");
};
const symbolProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Symbols cannot be represented in JSON Schema");
};
const nullProcessor = (_schema, ctx, json, _params) => {
    if (ctx.target === "openapi-3.0") {
        json.type = "string";
        json.nullable = true;
        json.enum = [null];
    }
    else {
        json.type = "null";
    }
};
const undefinedProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Undefined cannot be represented in JSON Schema");
};
const voidProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
};
const neverProcessor = (_schema, _ctx, json, _params) => {
    json.not = {};
};
const anyProcessor = (_schema, _ctx, _json, _params) => {
    // empty schema accepts anything
};
const unknownProcessor = (_schema, _ctx, _json, _params) => {
    // empty schema accepts anything
};
const dateProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Date cannot be represented in JSON Schema");
};
const enumProcessor = (schema, _ctx, json, _params) => {
    const def = schema._zod.def;
    const values = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getEnumValues */ .w5)(def.entries);
    // an empty enum accepts nothing, same as z.never()
    if (values.length === 0) {
        json.not = {};
        return;
    }
    // Number enums can have both string and number values
    if (values.every((v) => typeof v === "number"))
        json.type = "number";
    if (values.every((v) => typeof v === "string"))
        json.type = "string";
    json.enum = values;
};
const literalProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    // a literal with no values accepts nothing, same as z.never()
    if (def.values.length === 0) {
        json.not = {};
        return;
    }
    const vals = [];
    for (const val of def.values) {
        if (val === undefined) {
            // a custom schema replaces the whole literal, so there is nothing left to accumulate
            if ((0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema"))
                return;
            // otherwise do not add to vals
        }
        else if (typeof val === "bigint") {
            if ((0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema"))
                return;
            vals.push(Number(val));
        }
        else {
            vals.push(val);
        }
    }
    if (vals.length === 0) {
        // do nothing (an undefined literal was stripped)
    }
    else if (vals.length === 1) {
        const val = vals[0];
        json.type = val === null ? "null" : typeof val;
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
            json.enum = [val];
        }
        else {
            json.const = val;
        }
    }
    else {
        if (vals.every((v) => typeof v === "number"))
            json.type = "number";
        if (vals.every((v) => typeof v === "string"))
            json.type = "string";
        if (vals.every((v) => typeof v === "boolean"))
            json.type = "boolean";
        if (vals.every((v) => v === null))
            json.type = "null";
        json.enum = vals;
    }
};
const nanProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "NaN cannot be represented in JSON Schema");
};
const templateLiteralProcessor = (schema, _ctx, json, _params) => {
    const _json = json;
    const pattern = schema._zod.pattern;
    if (!pattern)
        throw new Error("Pattern not found in template literal");
    _json.type = "string";
    _json.pattern = pattern.source;
};
const fileProcessor = (schema, _ctx, json, _params) => {
    const _json = json;
    _json.type = "string";
    _json.format = "binary";
    _json.contentEncoding = "binary";
    const { minimum, maximum, mime } = aggregateChecks(schema);
    if (minimum !== undefined)
        _json.minLength = minimum;
    if (maximum !== undefined)
        _json.maxLength = maximum;
    if (!mime)
        return;
    // an empty intersection means the mime checks share no value, so nothing passes at runtime; `anyOf` must be non-empty, so the false schema is `not: {}`
    if (mime.length === 0)
        _json.not = {};
    else if (mime.length === 1)
        _json.contentMediaType = mime[0];
    // only contentMediaType differs, so the shared props stay at the root
    else
        _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
};
const successProcessor = (_schema, _ctx, json, _params) => {
    json.type = "boolean";
};
const customProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
const functionProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Function types cannot be represented in JSON Schema");
};
const transformProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
const mapProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Map cannot be represented in JSON Schema");
};
const setProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Set cannot be represented in JSON Schema");
};
// ==================== COMPOSITE TYPE PROCESSORS ====================
const arrayProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    const { minimum, maximum } = aggregateChecks(schema);
    if (typeof minimum === "number")
        json.minItems = minimum;
    if (typeof maximum === "number")
        json.maxItems = maximum;
    json.type = "array";
    json.items = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.element, ctx, {
        ...params,
        path: [...params.path, "items"],
    });
};
// Transform and catch set `optin = "optional"` at runtime so the parser lets them observe an
// absent key, but their declared input type stays required. An input JSON Schema describes the
// declared type, so resolve past them to the schema that actually carries the optionality.
// Used by both `objectProcessor` (for `required`) and `tupleProcessor` (for `minItems`); see
// wiki/optionality.md, "The JSON Schema emitter reads the *static* value".
function inputOptin(schema) {
    const def = schema._zod.def;
    if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) {
        return inputOptin(def.out);
    }
    if (def.type === "catch") {
        return inputOptin(def.innerType);
    }
    return schema._zod.optin;
}
const objectProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    const shape = def.shape;
    // dropping it while still emitting `additionalProperties: false` would emit a schema that rejects data this one requires
    const symbolKeys = Object.getOwnPropertySymbols(shape);
    if (symbolKeys.length &&
        (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) {
        return;
    }
    json.type = "object";
    json.properties = {};
    for (const key in shape) {
        // assignProp so a __proto__ key becomes an own property instead of hitting the inherited setter on the plain {} we build into
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .assignProp */ .Vy)(json.properties, key, (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(shape[key], ctx, {
            ...params,
            path: [...params.path, "properties", key],
        }));
    }
    // required keys
    const requiredKeys = [];
    for (const key of Object.keys(shape)) {
        const field = def.shape[key];
        if (ctx.io === "input" ? inputOptin(field) === undefined : field._zod.optout === undefined) {
            requiredKeys.push(key);
        }
    }
    if (requiredKeys.length > 0) {
        json.required = requiredKeys;
    }
    // catchall
    if (def.catchall?._zod.def.type === "never") {
        // strict
        json.additionalProperties = false;
    }
    else if (!def.catchall) {
        // regular
        if (ctx.io === "output")
            json.additionalProperties = false;
    }
    else if (def.catchall) {
        json.additionalProperties = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.catchall, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"],
        });
    }
};
const unionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    // Exclusive unions (inclusive === false) use oneOf (exactly one match) instead of anyOf (one or more matches). This includes both z.xor() and discriminated unions
    const isExclusive = def.inclusive === false;
    const options = def.options.map((x, i) => (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(x, ctx, {
        ...params,
        path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
    }));
    if (isExclusive) {
        json.oneOf = options;
    }
    else {
        json.anyOf = options;
    }
};
const intersectionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const a = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.left, ctx, {
        ...params,
        path: [...params.path, "allOf", 0],
    });
    const b = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.right, ctx, {
        ...params,
        path: [...params.path, "allOf", 1],
    });
    const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
    const allOf = [
        ...(isSimpleIntersection(a) ? a.allOf : [a]),
        ...(isSimpleIntersection(b) ? b.allOf : [b]),
    ];
    json.allOf = allOf;
    // Recorded innermost first, so a nested intersection has already folded by the time this one is considered. The array is the handle rather than the schema, because a wrapper that inherits this schema shares the same array; `finalize` folds every object holding it. See `foldIntersection`.
    ctx.intersections.push(allOf);
};
const tupleProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    json.type = "array";
    const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
    const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
    const prefixItems = def.items.map((x, i) => (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(x, ctx, {
        ...params,
        path: [...params.path, prefixPath, i],
    }));
    const rest = def.rest
        ? (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.rest, ctx, {
            ...params,
            path: [...params.path, restPath, ...(ctx.target === "openapi-3.0" ? [def.items.length] : [])],
        })
        : null;
    let minItems = def.items.length;
    while (minItems > 0) {
        const item = def.items[minItems - 1];
        const optional = ctx.io === "input" ? inputOptin(item) !== undefined : item._zod.optout === "optional";
        if (!optional)
            break;
        minItems--;
    }
    const maxItems = def.items.length;
    const isClosed = !def.rest;
    if (ctx.target === "draft-2020-12") {
        json.prefixItems = prefixItems;
        if (isClosed) {
            json.items = false;
        }
        else if (rest) {
            json.items = rest;
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    else if (ctx.target === "openapi-3.0") {
        json.items = {
            anyOf: prefixItems,
        };
        if (rest) {
            json.items.anyOf.push(rest);
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    else {
        json.items = prefixItems;
        if (isClosed) {
            json.additionalItems = false;
        }
        else if (rest) {
            json.additionalItems = rest;
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    // explicit user-defined length checks take precedence
    const { minimum, maximum } = aggregateChecks(schema);
    if (typeof minimum === "number")
        json.minItems = minimum;
    if (typeof maximum === "number")
        json.maxItems = maximum;
};
/** JSON object keys are always strings, so a numeric record key schema is re-expressed over the
 * numeric-string form the record parser matches. Deferred to `finalize`, after the flatten: a key
 * behind a wrapper only carries its own `type` before then, and a union key only has its branches.
 *
 * A numeric bound cannot apply to a property name, so `minimum` and its siblings are dropped rather
 * than carried over: keeping them beside `type: "string"` reproduces the match-nothing schema this
 * exists to fix. A key that carries one therefore emits wider than the record parses — `z.record(z.number().min(5), V)`
 * accepts `"3"` — which is the deliberate trade, since throwing on it would reject an ordinary schema
 * outright. */
function stringifyKeyNames(bySchema, json, visited) {
    // an extracted key that rewrites cannot go on sharing its definition — the string form a key position needs is not the number form every other reference wants — so it inlines. One that does not rewrite keeps the `$ref`.
    if (json.$ref) {
        // a recursive key holds its own reference inside its definition, so a node already on the path is left alone rather than resolved again
        if (visited.has(json))
            return json;
        visited.add(json);
        const def = bySchema.get(json)?.def;
        if (!def)
            return json;
        const inlined = stringifyKeyNames(bySchema, def, visited);
        return inlined === def ? json : inlined;
    }
    for (const keyword of ["anyOf", "oneOf"]) {
        const branches = json[keyword];
        if (!Array.isArray(branches))
            continue;
        const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
        // rebuilding regardless would detach a key that had nothing to re-express, dropping its `$ref` and leaking the internal `id`
        if (mapped.some((branch, i) => branch !== branches[i]))
            json = { ...json, [keyword]: mapped };
    }
    // a member that already admits a string leaves the key unconstrained, so the node's own type re-expresses only when every member is numeric
    const types = Array.isArray(json.type) ? json.type : [json.type];
    const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
    // a heterogeneous key carries no type at all, so its numeric members are caught here instead
    const values = json.enum ?? (json.const !== undefined ? [json.const] : undefined);
    if (!numericType && !values?.some((v) => typeof v === "number"))
        return json;
    const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
    if (rest.enum)
        rest.enum = rest.enum.map((v) => (typeof v === "number" ? String(v) : v));
    else if (typeof rest.const === "number")
        rest.const = String(rest.const);
    // a heterogeneous key keeps its absent type: the stringified members already say what a key may be
    if (!numericType)
        return rest;
    rest.type = "string";
    if (!values)
        rest.pattern = (types.includes("number") ? _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .number */ .ai : _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .integer */ .nd).source;
    return rest;
}
/** Every record of one conversion, so the carriers are found in a single pass rather than once per record. */
const pendingRecords = new WeakMap();
function rewriteKeyNames(ctx) {
    // an extracted key is resolved by the object `extractToDef` left in its place, so the map is built once rather than searched per reference. `_zod.toJSONSchema` can hand the same object to two schemas, so the first entry carrying a body wins, as a search would have found it.
    const bySchema = new Map();
    for (const entry of ctx.seen.values()) {
        if (entry.def && !bySchema.has(entry.schema))
            bySchema.set(entry.schema, entry);
    }
    const rewrites = new Map();
    for (const record of pendingRecords.get(ctx) ?? []) {
        const seen = ctx.seen.get(record);
        const names = (seen?.def ?? seen?.schema)?.propertyNames;
        if (!names || names === true || rewrites.has(names))
            continue;
        const rewritten = stringifyKeyNames(bySchema, names, new Set());
        if (rewritten !== names)
            rewrites.set(names, rewritten);
    }
    if (!rewrites.size)
        return;
    // the flatten has already copied each record's own properties onto every wrapper by reference, and an extracted body is another such copy, so every carrier holding a rewritten key is updated together
    for (const entry of ctx.seen.values()) {
        for (const carrier of [entry.schema, entry.def]) {
            const rewritten = carrier && rewrites.get(carrier.propertyNames);
            if (rewritten)
                carrier.propertyNames = rewritten;
        }
    }
}
const recordProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    json.type = "object";
    // For looseRecord with regex patterns, use patternProperties. This correctly represents "only validate keys matching the pattern" semantics and composes well with allOf (intersections)
    const keyType = def.keyType;
    const patterns = aggregateChecks(keyType).patterns;
    if (def.mode === "loose" && patterns && patterns.size > 0) {
        // Use patternProperties for looseRecord with regex patterns
        const valueSchema = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.valueType, ctx, {
            ...params,
            path: [...params.path, "patternProperties", "*"],
        });
        json.patternProperties = {};
        for (const pattern of patterns) {
            (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .assignProp */ .Vy)(json.patternProperties, exactPattern(pattern).source, valueSchema);
        }
    }
    else {
        // Default behavior: use propertyNames + additionalProperties
        if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
            json.propertyNames = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.keyType, ctx, {
                ...params,
                path: [...params.path, "propertyNames"],
            });
            let pending = pendingRecords.get(ctx);
            if (!pending) {
                pending = [];
                pendingRecords.set(ctx, pending);
                ctx.deferred.push(() => rewriteKeyNames(ctx));
            }
            pending.push(schema);
        }
        json.additionalProperties = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.valueType, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"],
        });
    }
    // Add required for keys with discrete values (enum, literal, etc.)
    const keyValues = keyType._zod.values;
    // Every key shares one value schema, so an optional-in value makes the whole key set omittable on input. Output keeps them: the exhaustive branch assigns every key, even one whose value came back undefined.
    const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== undefined;
    if (keyValues && !def.partial && !omittableOnInput) {
        const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
        if (validKeyValues.length > 0) {
            json.required = validKeyValues.map(String);
        }
    }
};
const nullableProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const inner = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json.nullable = true;
    }
    else {
        json.anyOf = [inner, { type: "null" }];
    }
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
 * A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
 * unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
const UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
    let unrepresentable = false;
    const serialized = JSON.stringify(value, (_, val) => {
        if (typeof val !== "bigint")
            return val;
        unrepresentable = true;
        return null;
    });
    if (!unrepresentable)
        return JSON.parse(serialized);
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
    return UNREPRESENTABLE_DEFAULT;
}
const defaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    if (value !== UNREPRESENTABLE_DEFAULT)
        json.default = value;
};
const prefaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    if (ctx.io !== "input")
        return;
    const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    if (value !== UNREPRESENTABLE_DEFAULT)
        json._prefault = value;
};
const catchProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    let catchValue;
    try {
        catchValue = def.catchValue(undefined);
    }
    catch {
        (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
        return;
    }
    json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    const inIsTransform = def.in._zod.traits.has("$ZodTransform");
    const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    json.readOnly = true;
};
const promiseProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
const optionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
const lazyProcessor = (schema, ctx, _json, params) => {
    const innerType = schema._zod.innerType;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_3__/* .processSchema */ .Lp)(innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = innerType;
};
// ==================== ALL PROCESSORS ====================
const allProcessors = {
    string: stringProcessor,
    number: numberProcessor,
    boolean: booleanProcessor,
    bigint: bigintProcessor,
    symbol: symbolProcessor,
    null: nullProcessor,
    undefined: undefinedProcessor,
    void: voidProcessor,
    never: neverProcessor,
    any: anyProcessor,
    unknown: unknownProcessor,
    date: dateProcessor,
    enum: enumProcessor,
    literal: literalProcessor,
    nan: nanProcessor,
    template_literal: templateLiteralProcessor,
    file: fileProcessor,
    success: successProcessor,
    custom: customProcessor,
    function: functionProcessor,
    transform: transformProcessor,
    map: mapProcessor,
    set: setProcessor,
    array: arrayProcessor,
    object: objectProcessor,
    union: unionProcessor,
    intersection: intersectionProcessor,
    tuple: tupleProcessor,
    record: recordProcessor,
    nullable: nullableProcessor,
    nonoptional: nonoptionalProcessor,
    default: defaultProcessor,
    prefault: prefaultProcessor,
    catch: catchProcessor,
    pipe: pipeProcessor,
    readonly: readonlyProcessor,
    promise: promiseProcessor,
    optional: optionalProcessor,
    lazy: lazyProcessor,
};
function toJSONSchema(input, params) {
    if ("_idmap" in input) {
        // Registry case
        const registry = input;
        const ctx = initializeContext({ ...params, processors: allProcessors });
        const defs = {};
        // First pass: process all schemas to build the seen map
        for (const entry of registry._idmap.entries()) {
            const [_, schema] = entry;
            processSchema(schema, ctx);
        }
        const schemas = {};
        const external = {
            registry,
            uri: params?.uri,
            defs,
        };
        // Update the context with external configuration
        ctx.external = external;
        // Second pass: emit each schema
        for (const entry of registry._idmap.entries()) {
            const [key, schema] = entry;
            extractDefs(ctx, schema);
            assignProp(schemas, key, finalize(ctx, schema));
        }
        if (Object.keys(defs).length > 0) {
            const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
            schemas.__shared = {
                [defsSegment]: defs,
            };
        }
        return { schemas };
    }
    // Single schema case
    const ctx = initializeContext({ ...params, processors: allProcessors });
    processSchema(input, ctx);
    extractDefs(ctx, input);
    return finalize(ctx, input);
}


/***/ }),

/***/ 5195:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lK: () => (/* binding */ serialize),
/* harmony export */   mx: () => (/* binding */ attentionItem)
/* harmony export */ });
/* unused harmony export containerPhrasing */
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4294);
/* harmony import */ var micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84693);
/* harmony import */ var _character_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1770);
/* harmony import */ var _encode_character_reference_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80039);
/* harmony import */ var _encode_info_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9436);
/* harmony import */ var _html_kind_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82683);
/**
 * @import {Attention, Handle, Info, State, Tracker} from 'mdast-util-to-markdown'
 * @import {PhrasingParents} from '../types.js'
 */








/**
 * Markers for builtin attention (emphasis, strong) to whether they are stricter:
 * whether they cannot open and close inside words.
 *
 * Builtin runs pair following CommonMark rules for emphasis and strong:
 * they are split,
 * using one or two markers at a time,
 * with the rule of 3.
 * Other markers pair like GFM strikethrough:
 * whole runs pair with a run of the same size.
 *
 * @type {Map<string, boolean>}
 */
const builtins = new Map([
  ['*', false],
  ['_', true]
])

/**
 * @typedef AttentionResult
 *   Attention, of which the sequence is chosen later.
 * @property {Array<Item>} children
 *   Serialized children.
 * @property {Array<string>} sequences
 *   Sequences that can be used, in order of preference.
 */

/**
 * @typedef Improvement
 *   Improvement of attention sequences.
 * @property {Map<AttentionResult, string>} chosen
 *   Chosen sequences for each attention.
 * @property {Array<Token>} tokens
 *   Tokens involved in the improvement.
 * @property {Mistake | undefined} mistake
 *   Mistake that led to this improvement, if any.
 */

/**
 * @typedef {AttentionResult | string} Item
 *   Serialized phrasing.
 */

/**
 * @typedef Mistake
 *   Sequence that does not form its attention.
 * @property {Array<AttentionResult>} attention
 *   Attention to try other sequences for.
 * @property {number} index
 *   Index of the token.
 */

/**
 * @typedef Run
 *   Sequences next to each other with the same marker.
 * @property {boolean} close
 *   Whether it can close.
 * @property {number} end
 *   Index after the last marker not used (to open).
 * @property {Array<Token>} markers
 *   Sequence of each marker.
 * @property {boolean} open
 *   Whether it can open.
 * @property {boolean} split
 *   Whether it can be split (built-in attention).
 * @property {number} start
 *   Index of the first marker not used (to close).
 * @property {Array<Token>} tokens
 *   Sequences.
 */

/**
 * @typedef Token
 *   Rendered phrasing.
 * @property {AttentionResult | undefined} attention
 *   Attention, if this is one of its sequences.
 * @property {string} value
 *   Value.
 */

/**
 * Get candidates for a mistake:
 * attention to try other sequences for,
 * later first.
 *
 * @param {Array<Token>} tokens
 *   Tokens.
 * @param {Array<Token>} involved
 *   Sequences involved in the mistake.
 * @param {Map<Token, Run>} runOf
 *   Run of each sequence.
 * @returns {Array<AttentionResult>}
 *   Candidates.
 */
function candidates(tokens, involved, runOf) {
  /** @type {Set<AttentionResult | undefined>} */
  const related = new Set()

  // The attention involved, and attention in runs with its sequences.
  for (const token of tokens) {
    const siblings = runOf.get(token)
    if (
      siblings &&
      token.attention &&
      involved.some((d) => d.attention === token.attention)
    ) {
      for (const sibling of siblings.tokens) {
        related.add(sibling.attention)
      }
    }
  }

  /** @type {Array<AttentionResult>} */
  const ordered = []

  for (const token of tokens) {
    if (token.attention && related.delete(token.attention)) {
      ordered.push(token.attention)
    }
  }

  // Later first: attention that opens later is inner or next.
  ordered.reverse()
  return ordered
}

/**
 * Check whether sequences form their attention, like `micromark`.
 *
 * Sequences of `*` and `_` pair like emphasis and strong in CommonMark,
 * others like strikethrough in GFM.
 *
 * @param {Array<Token>} tokens
 *   Tokens.
 * @param {string} before
 *   Characters before.
 * @param {string} after
 *   Characters after.
 * @returns {Mistake | undefined}
 *   First mistake, if any.
 */
function check(tokens, before, after) {
  /** @type {Array<Run>} */
  const runs = []
  /** @type {Map<Token, Array<Token>>} */
  const wrong = new Map()
  /** @type {Map<Token, Run>} */
  const runOf = new Map()
  let index = 0

  while (index < tokens.length) {
    if (!tokens[index].attention) {
      index++
      continue
    }

    const marker = tokens[index].value.charAt(0)
    const strict = builtins.get(marker)
    let end = index + 1

    while (
      end < tokens.length &&
      tokens[end].attention &&
      tokens[end].value.charAt(0) === marker
    ) {
      end++
    }

    const head = index ? tokens[index - 1].value : before
    const previous = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__/* .classifyCharacter */ .S)(head.charCodeAt(head.length - 1))
    const next = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__/* .classifyCharacter */ .S)(
      (end < tokens.length ? tokens[end].value : after).charCodeAt(0)
    )
    const open = !next || (next === 2 && Boolean(previous))
    const close = !previous || (previous === 2 && Boolean(next))
    /** @type {Run} */
    const run = {
      tokens: tokens.slice(index, end),
      markers: [],
      start: 0,
      end: 0,
      // Underscores are strict, they cannot open or close inside words.
      open: strict ? open && (Boolean(previous) || !close) : open,
      close: strict ? close && (Boolean(next) || !open) : close,
      // All builtins can split runs.
      split: strict !== undefined
    }

    for (const token of run.tokens) {
      // Every sequence is wrong until it pairs with its other sequence.
      wrong.set(token, [...run.tokens])
      runOf.set(token, run)
      let size = token.value.length
      while (size--) run.markers.push(token)
    }

    run.end = run.markers.length
    runs.push(run)
    index = end
  }

  pair(runs, wrong)

  index = -1

  while (++index < tokens.length) {
    const involved = wrong.get(tokens[index])
    if (involved) return {attention: candidates(tokens, involved, runOf), index}
  }
}

/**
 * Serialize the children of a parent that contains phrasing children.
 *
 * @param {PhrasingParents} parent
 *   Parent of phrasing nodes.
 * @param {State} state
 *   Info passed around about the current state.
 * @param {Info} info
 *   Info on where we are in the document we are generating.
 * @returns {string}
 *   Serialized result.
 */
function containerPhrasing(parent, state, info) {
  return serialize(phrasing(parent, state, info), info.before, info.after)
}

/**
 * Encode the first or last character of tokens as a character reference,
 * if it is text.
 *
 * @param {Array<Token>} tokens
 *   Tokens.
 * @param {boolean} start
 *   Whether to encode the first or last character.
 * @returns {undefined}
 *   Nothing.
 */
function encode(tokens, start) {
  const token = tokens[start ? 0 : tokens.length - 1]

  if (!token || token.attention) return

  const character = start
    ? (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .firstCharacter */ .m)(token.value)
    : (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(token.value)
  const reference = (0,_encode_character_reference_js__WEBPACK_IMPORTED_MODULE_2__/* .encodeCharacterReference */ .T)(
    /** @type {number} */ (character.codePointAt(0))
  )

  if (start) {
    token.value = reference + token.value.slice(character.length)
  } else {
    let value = token.value.slice(0, token.value.length - character.length)
    let escapes = 0

    while (value.charCodeAt(value.length - 1 - escapes) === 92 /* `\` */) {
      escapes++
    }

    // Odd number would escape the `&` again.
    if (escapes % 2) value += '\\'
    token.value = value + reference
  }
}

/**
 * Try other sequences for the candidates of a mistake and use the first that
 * moves the mistake further.
 *
 * @param {Array<Item>} items
 *   Items.
 * @param {Map<AttentionResult, string>} chosen
 *   Sequences to use instead of preferred sequences.
 * @param {Mistake} mistake
 *   Mistake.
 * @param {string} before
 *   Characters before.
 * @param {string} after
 *   Characters after.
 * @returns {Improvement | undefined}
 *   Result if better.
 */
function improve(items, chosen, mistake, before, after) {
  for (const attention of mistake.attention) {
    const current = chosen.get(attention) || attention.sequences[0]

    for (const sequence of attention.sequences) {
      if (sequence === current) continue
      const trial = new Map(chosen)
      trial.set(attention, sequence)
      const tokens = render(items, trial, before, after)
      const next = check(tokens, before, after)

      if (!next || next.index > mistake.index) {
        return {chosen: trial, mistake: next, tokens}
      }
    }
  }
}

/**
 * Pair runs like `micromark` and mark sequences that do form their attention
 * as fine.
 *
 * Each pair uses markers from the end of an opener and the start of a closer.
 * It forms the intended attention if those markers are exactly the whole
 * opening and closing sequence of one attention.
 * Otherwise attention is mixed up:
 * either sequences of different attention pair,
 * part of a sequence is used (such as `**` of strong as `*`),
 * or several sequences are used together (such as `*` and `*` as `**`).
 * Then the sequences involved are recorded with each other.
 *
 * @param {Array<Run>} runs
 *   Runs.
 * @param {Map<Token, Array<Token>>} wrong
 *   Sequences that are wrong, with the sequences involved.
 * @returns {undefined}
 *   Nothing, `wrong` is changed.
 */
function pair(runs, wrong) {
  /** @type {Map<string, Array<Run>>} */
  const openersByMarker = new Map()

  for (const closer of runs) {
    const marker = closer.tokens[0].value.charAt(0)
    let openers = openersByMarker.get(marker)

    if (!openers) {
      openers = []
      openersByMarker.set(marker, openers)
    }

    let open = closer.close ? openers.length : 0

    while (open-- && closer.start < closer.end) {
      const opener = openers[open]
      const openerSize = opener.end - opener.start
      const closerSize = closer.end - closer.start

      if (
        closer.split
          ? // The rule of 3, on the sizes that are left.
            (opener.close || closer.open) &&
            closerSize % 3 &&
            !((openerSize + closerSize) % 3)
          : // Others pair whole runs of the same size.
            openerSize !== opener.markers.length || openerSize !== closerSize
      ) {
        continue
      }

      const size = closer.split
        ? openerSize > 1 && closerSize > 1
          ? 2
          : 1
        : closerSize
      const opening = opener.markers.slice(opener.end - size, opener.end)
      const closing = closer.markers.slice(closer.start, closer.start + size)
      const openToken = opening[0]
      const closeToken = closing[0]

      if (
        // Whole sequences:
        // the markers of a sequence are next to each other,
        // so if the first and last marker are of one sequence of that size,
        // all markers are exactly that sequence.
        openToken === opening[size - 1] &&
        openToken.value.length === size &&
        closeToken === closing[size - 1] &&
        closeToken.value.length === size &&
        // Of the same attention, so its opening and closing sequence.
        openToken.attention === closeToken.attention
      ) {
        wrong.delete(openToken)
        wrong.delete(closeToken)
      } else {
        const involved = [...new Set([...opening, ...closing])]
        // Add to what is involved already: a sequence can be in several pairs.
        for (const token of involved) {
          const list = wrong.get(token)
          if (list) list.push(...involved)
        }
      }

      opener.end -= size
      closer.start += size

      if (opener.start === opener.end) openers.splice(open, 1)

      // Search again from the start, as this run may close more.
      open = openers.length
    }

    if (closer.open && closer.start < closer.end) openers.push(closer)
  }
}

/**
 * Get the sequences that can be used for attention, in order of preference.
 *
 * @param {string} type
 *   Node type.
 * @param {Array<string>} markers
 *   Markers.
 * @param {Array<number>} sizes
 *   Sizes.
 * @returns {Array<string>}
 *   Sequences.
 */
function attentionSequences(type, markers, sizes) {
  if (markers.length === 0) {
    throw new Error(
      'Cannot serialize `' +
        type +
        '` as attention without markers, expected one or more markers'
    )
  }

  if (sizes.length === 0) {
    throw new Error(
      'Cannot serialize `' +
        type +
        '` as attention without sizes, expected one or more sizes'
    )
  }

  for (const size of sizes) {
    if (!Number.isSafeInteger(size) || size < 1) {
      throw new Error(
        'Cannot serialize `' +
          type +
          '` as attention with `' +
          size +
          '` as size, expected positive integer'
      )
    }
  }

  /** @type {Array<string>} */
  const sequences = []

  for (const marker of markers) {
    if (marker.length !== 1) {
      throw new Error(
        'Cannot serialize `' +
          type +
          '` as attention with `' +
          marker +
          '` as marker, expected a single ascii character'
      )
    }

    if (!(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__/* .asciiPunctuation */ .ol)(marker.charCodeAt(0))) {
      throw new Error(
        'Cannot serialize `' +
          type +
          '` as attention with `' +
          marker +
          '` as marker, expected ascii punctuation'
      )
    }

    for (const size of sizes) {
      sequences.push(marker.repeat(size))
    }
  }

  return sequences
}

/**
 * Serialize the children of a parent that contains phrasing children,
 * keeping attention separate,
 * so that its markers can be chosen later.
 *
 * @param {PhrasingParents} parent
 *   Parent of phrasing nodes.
 * @param {State} state
 *   Info passed around about the current state.
 * @param {Info} info
 *   Info on where we are in the document we are generating.
 * @returns {Array<Item>}
 *   Items.
 */
function phrasing(parent, state, info) {
  const indexStack = state.indexStack
  const children = parent.children || []
  /** @type {Array<Item>} */
  const results = []
  let index = -1
  let before = info.before

  indexStack.push(-1)
  let tracker = state.createTracker(info)

  while (++index < children.length) {
    const child = children[index]
    /** @type {string} */
    let after

    indexStack[indexStack.length - 1] = index

    if (index + 1 < children.length) {
      /** @type {Handle} */
      // @ts-expect-error: hush, it’s actually a `zwitch`.
      let handle = state.handle.handlers[children[index + 1].type]
      // @ts-expect-error: hush, it’s actually a `zwitch`.
      if (handle && handle.peek) handle = handle.peek
      after = handle
        ? (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .firstCharacter */ .m)(
            handle(children[index + 1], parent, state, {
              before: '',
              after: '',
              ...tracker.current()
            })
          )
        : ''
    } else {
      after = info.after
    }

    // In some cases, html (text) can be found in phrasing right after an eol.
    // When we’d serialize that, it could be seen as html (flow): all its kinds
    // except 7 can interrupt a paragraph.
    // As we can’t escape or so to prevent it from happening,
    // we take a somewhat reasonable approach:
    // replace that eol with a space.
    // See: <https://github.com/syntax-tree/mdast-util-to-markdown/issues/15>
    const previous = results[results.length - 1]

    if (
      typeof previous === 'string' &&
      (before === '\r' || before === '\n') &&
      child.type === 'html' &&
      (0,_html_kind_js__WEBPACK_IMPORTED_MODULE_4__/* .htmlKind */ .C)(child.value) !== 7
    ) {
      results[results.length - 1] = previous.replace(/(\r?\n|\r)$/, ' ')
      before = ' '

      // To do: does this work to reset tracker?
      tracker = state.createTracker(info)
      tracker.move(serialize(results, info.before, info.after))
    }

    /** @type {(Handle & {attention?: Attention | undefined}) | undefined} */
    // @ts-expect-error: hush, it’s actually a `zwitch`.
    const handle = state.handle.handlers[child.type]

    if (handle && handle.attention) {
      const item = attentionItem(
        /** @type {PhrasingParents} */ (child),
        handle.attention,
        state,
        tracker
      )
      results.push(item)
      before = (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(item.sequences[0])
    } else {
      const value = state.handle(child, parent, state, {
        ...tracker.current(),
        after,
        before
      })

      if (!value) continue
      tracker.move(value)
      results.push(value)
      before = (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(value)
    }
  }

  indexStack.pop()

  return results
}

/**
 * Serialize a node as attention,
 * with its sequence chosen later.
 *
 * @param {PhrasingParents} node
 *   Node.
 * @param {Attention} attention
 *   Attention of the node.
 * @param {State} state
 *   Info passed around about the current state.
 * @param {Tracker} tracker
 *   Tracker.
 * @returns {AttentionResult}
 *   Attention.
 */
function attentionItem(node, attention, state, tracker) {
  const {construct, markers, sizes} = attention(node, state)
  const sequences = attentionSequences(node.type, markers, sizes)
  const sequence = sequences[0]
  const exit = state.enter(construct)
  tracker.move(sequence)
  const children = phrasing(node, state, {
    ...tracker.current(),
    before: sequence,
    after: sequence
  })
  tracker.move(serialize(children, sequence, sequence))
  tracker.move(sequence)
  exit()
  return {children, sequences}
}

/**
 * Render items with sequences;
 * encoding characters around attention where needed.
 *
 * @param {Array<Item>} items
 *   Serialized phrasing.
 * @param {Map<AttentionResult, string>} chosen
 *   Sequences to use instead of preferred sequences.
 * @param {string} before
 *   Characters before.
 * @param {string} after
 *   Characters after.
 * @returns {Array<Token>}
 *   Tokens.
 */
function render(items, chosen, before, after) {
  /** @type {Array<Token>} */
  const tokens = []
  /** @type {string | undefined} */
  let encodeAfter
  let previous = (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(before)
  let index = -1

  while (++index < items.length) {
    const item = items[index]

    if (typeof item === 'string') {
      /** @type {Token} */
      const token = {value: item, attention: undefined}

      // If attention before had to encode the character after it, encode it.
      if (encodeAfter && encodeAfter === (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .firstCharacter */ .m)(item)) {
        encode([token], true)
      }

      encodeAfter = undefined
      tokens.push(token)
      if (token.value) previous = (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(token.value)
      continue
    }

    const sequence = chosen.get(item) || item.sequences[0]
    const marker = sequence.charAt(0)
    const next = items[index + 1]
    const outsideBefore = previous
    const outsideAfter = (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .firstCharacter */ .m)(
      next === undefined
        ? after
        : typeof next === 'string'
          ? next
          : chosen.get(next) || next.sequences[0]
    )
    const inside = render(item.children, chosen, sequence, sequence)
    const head = inside.length > 0 ? inside[0].value : ''
    const open = (0,_encode_info_js__WEBPACK_IMPORTED_MODULE_5__/* .encodeInfo */ .J)(
      outsideBefore.charCodeAt(outsideBefore.length - 1),
      head.charCodeAt(0),
      marker
    )

    if (open.inside) encode(inside, true)

    const tail =
      inside.length > 0 ? (0,_character_js__WEBPACK_IMPORTED_MODULE_1__/* .lastCharacter */ .c)(inside[inside.length - 1].value) : ''
    const close = (0,_encode_info_js__WEBPACK_IMPORTED_MODULE_5__/* .encodeInfo */ .J)(
      outsideAfter.charCodeAt(0),
      tail.charCodeAt(tail.length - 1),
      marker
    )

    if (close.inside) encode(inside, false)

    if (open.outside && outsideBefore !== '\n' && outsideBefore !== '\r') {
      encode(tokens, false)
    }

    if (close.outside) encodeAfter = outsideAfter

    tokens.push({value: sequence, attention: item}, ...inside, {
      value: sequence,
      attention: item
    })
    previous = sequence.charAt(sequence.length - 1)
  }

  return tokens
}

/**
 * Serialize phrasing with attention.
 *
 * Whether attention forms depends on everything around it.
 * This checks that it does and tries other sequences if not.
 *
 * @param {Array<Item>} items
 *   Phrasing items.
 * @param {string} before
 *   Characters before.
 * @param {string} after
 *   Characters after.
 * @returns {string}
 *   Serialized markdown.
 */
function serialize(items, before, after) {
  /** @type {Map<AttentionResult, string>} */
  let chosen = new Map()
  const initial = render(items, chosen, before, after)
  let tokens = initial
  let mistake = check(tokens, before, after)

  while (mistake) {
    const next = improve(items, chosen, mistake, before, after)

    if (!next) {
      tokens = initial
      break
    }

    chosen = next.chosen
    tokens = next.tokens
    mistake = next.mistake
  }

  // Join the tokens.
  let result = ''
  for (const token of tokens) result += token.value
  return result
}


/***/ }),

/***/ 5770:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ formatLinkAsAutolink)
/* harmony export */ });
/* harmony import */ var mdast_util_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48006);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Link} from 'mdast'
 */



/**
 * Checks if a link can be formatted as an autolink.
 *
 * @param {Link} node
 *   Node to check.
 * @param {State} state
 *   Info passed around.
 * @returns {boolean}
 *   Whether the link can be formatted as an autolink.
 */
function formatLinkAsAutolink(node, state) {
  const raw = (0,mdast_util_to_string__WEBPACK_IMPORTED_MODULE_0__/* .toString */ .d)(node)

  return Boolean(
    !state.options.resourceLink &&
    // If there’s a url…
    node.url &&
    // And there’s no title…
    !node.title &&
    // And the content of `node` is a single text node…
    node.children &&
    node.children.length === 1 &&
    node.children[0].type === 'text' &&
    // And if the url is the same as the content…
    (raw === node.url || 'mailto:' + raw === node.url) &&
    // And that starts w/ a protocol…
    /^[a-z][+\-.a-z]+:/i.test(node.url) &&
    // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work), space, or angle brackets…
    !/[\0- <>\u007F]/.test(node.url)
  )
}


/***/ }),

/***/ 6563:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ handle)
/* harmony export */ });
/* harmony import */ var _blockquote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16406);
/* harmony import */ var _break_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40752);
/* harmony import */ var _code_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1964);
/* harmony import */ var _definition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14584);
/* harmony import */ var _emphasis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67623);
/* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26997);
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20392);
/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(278);
/* harmony import */ var _image_reference_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8578);
/* harmony import */ var _inline_code_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(99994);
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(91285);
/* harmony import */ var _link_reference_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15089);
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(84753);
/* harmony import */ var _list_item_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(72563);
/* harmony import */ var _paragraph_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(87869);
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(50957);
/* harmony import */ var _strong_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(79714);
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(78506);
/* harmony import */ var _thematic_break_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(37832);




















/**
 * Default (CommonMark) handlers.
 */
const handle = {
  blockquote: _blockquote_js__WEBPACK_IMPORTED_MODULE_0__/* .blockquote */ .a,
  break: _break_js__WEBPACK_IMPORTED_MODULE_1__/* .hardBreak */ .l,
  code: _code_js__WEBPACK_IMPORTED_MODULE_2__/* .code */ .a,
  definition: _definition_js__WEBPACK_IMPORTED_MODULE_3__/* .definition */ .m,
  emphasis: _emphasis_js__WEBPACK_IMPORTED_MODULE_4__/* .emphasis */ .l,
  hardBreak: _break_js__WEBPACK_IMPORTED_MODULE_1__/* .hardBreak */ .l,
  heading: _heading_js__WEBPACK_IMPORTED_MODULE_5__/* .heading */ .R,
  html: _html_js__WEBPACK_IMPORTED_MODULE_6__/* .html */ .q,
  image: _image_js__WEBPACK_IMPORTED_MODULE_7__/* .image */ .S,
  imageReference: _image_reference_js__WEBPACK_IMPORTED_MODULE_8__/* .imageReference */ .r,
  inlineCode: _inline_code_js__WEBPACK_IMPORTED_MODULE_9__/* .inlineCode */ .t,
  link: _link_js__WEBPACK_IMPORTED_MODULE_10__/* .link */ .n,
  linkReference: _link_reference_js__WEBPACK_IMPORTED_MODULE_11__/* .linkReference */ .u,
  list: _list_js__WEBPACK_IMPORTED_MODULE_12__/* .list */ .p,
  listItem: _list_item_js__WEBPACK_IMPORTED_MODULE_13__/* .listItem */ .A,
  paragraph: _paragraph_js__WEBPACK_IMPORTED_MODULE_14__/* .paragraph */ .F,
  root: _root_js__WEBPACK_IMPORTED_MODULE_15__/* .root */ .z,
  strong: _strong_js__WEBPACK_IMPORTED_MODULE_16__/* .strong */ .k,
  text: _text_js__WEBPACK_IMPORTED_MODULE_17__/* .text */ .Q,
  thematicBreak: _thematic_break_js__WEBPACK_IMPORTED_MODULE_18__/* .thematicBreak */ .V
}


/***/ }),

/***/ 8578:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ imageReference)
/* harmony export */ });
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {ImageReference, Parents} from 'mdast'
 */

imageReference.peek = imageReferencePeek

/**
 * Serialize an image reference node.
 *
 * @param {ImageReference} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function imageReference(node, _, state, info) {
  const type = node.referenceType
  const exit = state.enter('imageReference')
  let subexit = state.enter('label')
  const tracker = state.createTracker(info)
  let value = tracker.move('![')
  const alt = state.safe(node.alt, {
    before: value,
    after: ']',
    ...tracker.current()
  })
  value += tracker.move(alt + '][')

  subexit()
  // Hide that we’re in phrasing as things like attention or code cannot form
  // in references.
  // Character escapes and references *do* work.
  // It is important to know about other constructs, such as table cells.
  const stack = state.stack
  state.stack = stack.filter(function (d) {
    return d !== 'phrasing'
  })
  subexit = state.enter('reference')
  // Note: for proper tracking, we should reset the output positions when we end
  // up making a `shortcut` reference, because then there is no brace output.
  // Practically, in that case, there is no content, so it doesn’t matter that
  // we’ve tracked one too many characters.
  const reference = state.safe(state.associationId(node), {
    before: value,
    after: ']',
    ...tracker.current()
  })
  subexit()
  state.stack = stack
  exit()

  if (type === 'full' || !alt || alt !== reference) {
    value += tracker.move(reference + ']')
  } else if (type === 'shortcut') {
    // Remove the unwanted `[`.
    value = value.slice(0, -1)
  } else {
    value += tracker.move(']')
  }

  return value
}

/**
 * Peek at this node.
 *
 * @returns {string}
 *   Start of the serialized markdown.
 */
function imageReferencePeek() {
  return '!'
}


/***/ }),

/***/ 8962:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Maximize2)
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
    name: "maximize-2",
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
                d: "m21 3-7 7",
                key: "1l2asr"
            }
        ],
        [
            "path",
            {
                d: "m3 21 7-7",
                key: "tjx5ai"
            }
        ],
        [
            "path",
            {
                d: "M9 21H3v-6",
                key: "wtvkvv"
            }
        ]
    ]
};
__iconData.node;
const Maximize2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=maximize-2.mjs.map


/***/ }),

/***/ 9436:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ encodeInfo)
/* harmony export */ });
/* harmony import */ var micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84693);
/**
 * @import {EncodeSides} from '../types.js'
 */



/**
 * Check whether to encode (as a character reference) the characters
 * surrounding an attention run.
 *
 * Which characters are around an attention run influence whether it works or
 * not.
 *
 * See <https://github.com/orgs/syntax-tree/discussions/60> for more info.
 * See this markdown in a particular renderer to see what works:
 *
 * ```markdown
 * |                         | A (letter inside) | B (punctuation inside) | C (whitespace inside) | D (nothing inside) |
 * | ----------------------- | ----------------- | ---------------------- | --------------------- | ------------------ |
 * | 1 (letter outside)      | x*y*z             | x*.*z                  | x* *z                 | x**z               |
 * | 2 (punctuation outside) | .*y*.             | .*.*.                  | .* *.                 | .**.               |
 * | 3 (whitespace outside)  | x *y* z           | x *.* z                | x * * z               | x ** z             |
 * | 4 (nothing outside)     | *x*               | *.*                    | * *                   | **                 |
 * ```
 *
 * @param {number} outside
 *   Code point on the outer side of the run.
 * @param {number} inside
 *   Code point on the inner side of the run.
 * @param {string} marker
 *   Marker of the run.
 *   Underscores are handled more strictly (they form less often) than
 *   asterisks.
 * @returns {EncodeSides}
 *   Whether to encode characters.
 */
// Important: punctuation must never be encoded.
// Punctuation is solely used by markdown constructs.
// And by encoding itself.
// Encoding them will break constructs or double encode things.
function encodeInfo(outside, inside, marker) {
  const outsideKind = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__/* .classifyCharacter */ .S)(outside)
  const insideKind = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_0__/* .classifyCharacter */ .S)(inside)

  // Letter outside:
  if (outsideKind === undefined) {
    return insideKind === undefined
      ? // Letter inside:
        // we have to encode *both* letters for `_` as it is looser.
        // it already forms for `*` (and GFMs `~`).
        marker === '_'
        ? {inside: true, outside: true}
        : {inside: false, outside: false}
      : insideKind === 1
        ? // Whitespace inside: encode both (letter, whitespace).
          {inside: true, outside: true}
        : // Punctuation inside: encode outer (letter)
          {inside: false, outside: true}
  }

  // Whitespace outside:
  if (outsideKind === 1) {
    return insideKind === undefined
      ? // Letter inside: already forms.
        {inside: false, outside: false}
      : insideKind === 1
        ? // Whitespace inside: encode both (whitespace).
          {inside: true, outside: true}
        : // Punctuation inside: already forms.
          {inside: false, outside: false}
  }

  // Punctuation outside:
  return insideKind === undefined
    ? // Letter inside: already forms.
      {inside: false, outside: false}
    : insideKind === 1
      ? // Whitespace inside: encode inner (whitespace).
        {inside: true, outside: false}
      : // Punctuation inside: already forms.
        {inside: false, outside: false}
}


/***/ }),

/***/ 9459:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AC: () => (/* binding */ lowercase),
/* harmony export */   Ak: () => (/* binding */ nanoid),
/* harmony export */   D2: () => (/* binding */ nanoidOfLength),
/* harmony export */   F: () => (/* binding */ httpProtocol),
/* harmony export */   Gl: () => (/* binding */ cuid2),
/* harmony export */   K3: () => (/* binding */ base64),
/* harmony export */   Os: () => (/* binding */ guid),
/* harmony export */   Rp: () => (/* binding */ email),
/* harmony export */   Z0: () => (/* binding */ ulid),
/* harmony export */   Zg: () => (/* binding */ emoji),
/* harmony export */   Zv: () => (/* binding */ uppercase),
/* harmony export */   ai: () => (/* binding */ number),
/* harmony export */   fO: () => (/* binding */ ksuid),
/* harmony export */   gF: () => (/* binding */ cuid),
/* harmony export */   gp: () => (/* binding */ anyString),
/* harmony export */   hQ: () => (/* binding */ e164),
/* harmony export */   kB: () => (/* binding */ time),
/* harmony export */   kM: () => (/* binding */ xid),
/* harmony export */   l7: () => (/* binding */ cidrv6),
/* harmony export */   nd: () => (/* binding */ integer),
/* harmony export */   o: () => (/* binding */ bigint),
/* harmony export */   p0: () => (/* binding */ duration),
/* harmony export */   p6: () => (/* binding */ date),
/* harmony export */   r0: () => (/* binding */ base64url),
/* harmony export */   uR: () => (/* binding */ uuid),
/* harmony export */   uX: () => (/* binding */ ipv4),
/* harmony export */   ug: () => (/* binding */ ipv6),
/* harmony export */   w$: () => (/* binding */ datetime),
/* harmony export */   zM: () => (/* binding */ boolean),
/* harmony export */   zr: () => (/* binding */ cidrv4)
/* harmony export */ });
/* unused harmony exports extendedDuration, uuid4, uuid6, uuid7, html5Email, rfc5322Email, unicodeEmail, idnEmail, browserEmail, mac, hostname, domain, creditCard, currencyCode, iban, string, null, undefined, hex, md5_hex, md5_base64, md5_base64url, sha1_hex, sha1_base64, sha1_base64url, sha256_hex, sha256_base64, sha256_base64url, sha384_hex, sha384_base64, sha384_base64url, sha512_hex, sha512_base64, sha512_base64url */

/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
const cuid = /^[cC][0-9a-z]{6,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
    return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
 *
 * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid = (version) => {
    if (!version)
        return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
    return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const uuid4 = /*@__PURE__*/ (/* unused pure expression or super */ null && (uuid(4)));
const uuid6 = /*@__PURE__*/ (/* unused pure expression or super */ null && (uuid(6)));
const uuid7 = /*@__PURE__*/ (/* unused pure expression or super */ null && (uuid(7)));
/** Practical email validation */
const email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/** The classic emailregex.com regex for RFC 5322-compliant emails */
const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const idnEmail = (/* unused pure expression or super */ null && (unicodeEmail));
const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
// Single character class, not an alternation: the two properties overlap (U+1F9B0-U+1F9B3), so `(A|B)+` backtracks exponentially on a failed match. The leading lookahead then demands one anchor — a pictograph, a regional indicator, or the enclosing keycap — because `\p{Emoji_Component}` on its own covers ASCII digits, `#`, `*`, ZWJ, variation selectors and skin tone modifiers, none of which is an emoji without a base.
const _emoji = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
    return new RegExp(_emoji, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const mac = (delimiter) => {
    const escapedDelim = util.escapeRegex(delimiter ?? ":");
    return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
// based on https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address
// export const hostname: RegExp = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
const domain = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
const httpProtocol = /^https?$/;
// https://blog.stevenlevithan.com/archives/validate-phone-number#r4-3 (regex sans spaces) E.164: leading digit must be 1-9; total digits (excluding '+') between 7-15
const e164 = /^\+[1-9]\d{6,14}$/;
// Credit card shape: 12–19 digits, optionally separated by single spaces or single hyphens. ISO/IEC 7812 caps the PAN at 19 digits; 12 is the shortest issued length (Maestro).
const creditCard = /^\d(?:[ -]?\d){11,18}$/;
// ISO 4217 alpha codes from the SIX list, regenerated by scripts/update-iso-4217.ts
const currencyCode = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/;
// iban electronic format: 2-letter country, check digits 02-98 (the only values `98 - remainder` can produce), 11-30 bban characters
const iban = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
/** Anchors a pattern source. The interpolation lives here rather than at the call site because
 * esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
 * will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
function anchor(source) {
    return new RegExp(`^${source}$`);
}
const date = /*@__PURE__*/ anchor(dateSource);
function timeSource(args) {
    const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    const regex = typeof args.precision === "number"
        ? args.precision === -1
            ? `${hhmm}`
            : args.precision === 0
                ? `${hhmm}:[0-5]\\d`
                : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
        : args.seconds
            ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?`
            : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    return regex;
}
function time(args) {
    return new RegExp(`^${timeSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetime(args) {
    const opts = ["Z"];
    // if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
    if (args.offset)
        opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    // RFC 3339 mandates seconds wherever the time carries a `Z` or an offset, so only the unqualified form `local` adds may omit them
    const qualified = `${timeSource({ precision: args.precision, seconds: true })}(?:${opts.join("|")})`;
    const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
    return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
// the unbounded form of `string()` as a literal, so every plain string shares one instance instead of building its own
const anyString = /^[\s\S]{0,}$/;
const string = (params) => {
    const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
    return new RegExp(`^${regex}$`);
};
const bigint = /^-?\d+n?$/;
const integer = /^-?\d+$/;
const number = /^-?\d+(?:\.\d+)?$/;
const boolean = /^(?:true|false)$/i;
const _null = /^null$/i;

const _undefined = /^undefined$/i;

// regex for string with no uppercase letters
const lowercase = /^[^A-Z]*$/;
// regex for string with no lowercase letters
const uppercase = /^[^a-z]*$/;
// regex for hexadecimal strings (any length)
const hex = /^[0-9a-fA-F]*$/;
// Hash regexes for different algorithms and encodings
// Helper function to create base64 regex with exact length and padding
function fixedBase64(bodyLength, padding) {
    return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
// Helper function to create base64url regex with exact length (no padding)
function fixedBase64url(length) {
    return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
// MD5 (16 bytes): base64 = 24 chars total (22 + "==")
const md5_hex = /^[0-9a-fA-F]{32}$/;
const md5_base64 = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64(22, "==")));
const md5_base64url = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64url(22)));
// SHA1 (20 bytes): base64 = 28 chars total (27 + "=")
const sha1_hex = /^[0-9a-fA-F]{40}$/;
const sha1_base64 = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64(27, "=")));
const sha1_base64url = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64url(27)));
// SHA256 (32 bytes): base64 = 44 chars total (43 + "=")
const sha256_hex = /^[0-9a-fA-F]{64}$/;
const sha256_base64 = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64(43, "=")));
const sha256_base64url = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64url(43)));
// SHA384 (48 bytes): base64 = 64 chars total (no padding)
const sha384_hex = /^[0-9a-fA-F]{96}$/;
const sha384_base64 = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64(64, "")));
const sha384_base64url = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64url(64)));
// SHA512 (64 bytes): base64 = 88 chars total (86 + "==")
const sha512_hex = /^[0-9a-fA-F]{128}$/;
const sha512_base64 = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64(86, "==")));
const sha512_base64url = /*@__PURE__*/ (/* unused pure expression or super */ null && (fixedBase64url(86)));


/***/ }),

/***/ 12651:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Cpu)
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
    name: "cpu",
    size: 24,
    node: [
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
                d: "M12 2v2",
                key: "tus03m"
            }
        ],
        [
            "path",
            {
                d: "M17 20v2",
                key: "1rnc9c"
            }
        ],
        [
            "path",
            {
                d: "M17 2v2",
                key: "11trls"
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
                d: "M2 17h2",
                key: "7oei6x"
            }
        ],
        [
            "path",
            {
                d: "M2 7h2",
                key: "asdhe0"
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
                d: "M20 17h2",
                key: "1fpfkl"
            }
        ],
        [
            "path",
            {
                d: "M20 7h2",
                key: "1o8tra"
            }
        ],
        [
            "path",
            {
                d: "M7 20v2",
                key: "4gnj0m"
            }
        ],
        [
            "path",
            {
                d: "M7 2v2",
                key: "1i4yhu"
            }
        ],
        [
            "rect",
            {
                x: "4",
                y: "4",
                width: "16",
                height: "16",
                rx: "2",
                key: "1vbyd7"
            }
        ],
        [
            "rect",
            {
                x: "8",
                y: "8",
                width: "8",
                height: "8",
                rx: "1",
                key: "z9xiuo"
            }
        ]
    ]
};
__iconData.node;
const Cpu = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=cpu.mjs.map


/***/ }),

/***/ 14225:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Folder)
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
    name: "folder",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
                key: "1kt360"
            }
        ]
    ]
};
__iconData.node;
const Folder = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=folder.mjs.map


/***/ }),

/***/ 14436:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ gfmFootnoteToMarkdown),
/* harmony export */   i: () => (/* binding */ gfmFootnoteFromMarkdown)
/* harmony export */ });
/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23091);
/* harmony import */ var micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76548);
/**
 * @import {
 *   CompileContext,
 *   Extension as FromMarkdownExtension,
 *   Handle as FromMarkdownHandle
 * } from 'mdast-util-from-markdown'
 * @import {ToMarkdownOptions} from 'mdast-util-gfm-footnote'
 * @import {
 *   Handle as ToMarkdownHandle,
 *   Map,
 *   Options as ToMarkdownExtension
 * } from 'mdast-util-to-markdown'
 * @import {FootnoteDefinition, FootnoteReference} from 'mdast'
 */




footnoteReference.peek = footnoteReferencePeek

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterFootnoteCallString() {
  this.buffer()
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterFootnoteCall(token) {
  this.enter({type: 'footnoteReference', identifier: '', label: ''}, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterFootnoteDefinitionLabelString() {
  this.buffer()
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterFootnoteDefinition(token) {
  this.enter(
    {type: 'footnoteDefinition', identifier: '', label: '', children: []},
    token
  )
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitFootnoteCallString(token) {
  const label = this.resume()
  const node = this.stack[this.stack.length - 1]
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'footnoteReference')
  node.identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_1__/* .normalizeIdentifier */ .B)(
    this.sliceSerialize(token)
  ).toLowerCase()
  node.label = label
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitFootnoteCall(token) {
  this.exit(token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitFootnoteDefinitionLabelString(token) {
  const label = this.resume()
  const node = this.stack[this.stack.length - 1]
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'footnoteDefinition')
  node.identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_1__/* .normalizeIdentifier */ .B)(
    this.sliceSerialize(token)
  ).toLowerCase()
  node.label = label
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitFootnoteDefinition(token) {
  this.exit(token)
}

/** @type {ToMarkdownHandle} */
function footnoteReferencePeek() {
  return '['
}

/**
 * @type {ToMarkdownHandle}
 * @param {FootnoteReference} node
 */
function footnoteReference(node, _, state, info) {
  const tracker = state.createTracker(info)
  let value = tracker.move('[^')
  const exit = state.enter('footnoteReference')
  const subexit = state.enter('reference')
  value += tracker.move(
    state.safe(state.associationId(node), {after: ']', before: value})
  )
  subexit()
  exit()
  value += tracker.move(']')
  return value
}

/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM footnotes
 * in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteCallString: enterFootnoteCallString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: enterFootnoteDefinition
    },
    exit: {
      gfmFootnoteCallString: exitFootnoteCallString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: exitFootnoteDefinition
    }
  }
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM footnotes
 * in markdown.
 *
 * @param {ToMarkdownOptions | null | undefined} [options]
 *   Configuration (optional).
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown`.
 */
function gfmFootnoteToMarkdown(options) {
  // To do: next major: change default.
  let firstLineBlank = false

  if (options && options.firstLineBlank) {
    firstLineBlank = true
  }

  return {
    handlers: {footnoteDefinition, footnoteReference},
    // This is on by default already.
    unsafe: [{character: '[', inConstruct: ['label', 'phrasing', 'reference']}]
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {FootnoteDefinition} node
   */
  function footnoteDefinition(node, _, state, info) {
    const tracker = state.createTracker(info)
    let value = tracker.move('[^')
    const exit = state.enter('footnoteDefinition')
    const subexit = state.enter('label')
    value += tracker.move(
      state.safe(state.associationId(node), {before: value, after: ']'})
    )
    subexit()

    value += tracker.move(']:')

    if (node.children && node.children.length > 0) {
      tracker.shift(4)

      value += tracker.move(
        (firstLineBlank ? '\n' : ' ') +
          state.indentLines(
            state.containerFlow(node, tracker.current()),
            firstLineBlank ? mapAll : mapExceptFirst
          )
      )
    }

    exit()

    return value
  }
}

/** @type {Map} */
function mapExceptFirst(line, index, blank) {
  return index === 0 ? line : mapAll(line, index, blank)
}

/** @type {Map} */
function mapAll(line, index, blank) {
  return (blank ? '' : '    ') + line
}


/***/ }),

/***/ 14584:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ definition)
/* harmony export */ });
/* harmony import */ var _util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40464);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Definition, Parents} from 'mdast'
 */



/**
 * Serialize a definition node.
 *
 * @param {Definition} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function definition(node, _, state, info) {
  const quote = (0,_util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__/* .checkQuote */ .Z)(state)
  const suffix = quote === '"' ? 'Quote' : 'Apostrophe'
  const exit = state.enter('definition')
  let subexit = state.enter('label')
  const tracker = state.createTracker(info)
  let value = tracker.move('[')
  value += tracker.move(
    state.safe(state.associationId(node), {
      before: value,
      after: ']',
      ...tracker.current()
    })
  )
  value += tracker.move(']: ')

  subexit()

  if (
    // If there’s no url, or…
    !node.url ||
    // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)
  ) {
    subexit = state.enter('destinationLiteral')
    value += tracker.move('<')
    value += tracker.move(
      state.safe(node.url, {before: value, after: '>', ...tracker.current()})
    )
    value += tracker.move('>')
  } else {
    // No whitespace, raw is prettier.
    subexit = state.enter('destinationRaw')
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: node.title ? ' ' : '\n',
        ...tracker.current()
      })
    )
  }

  subexit()

  if (node.title) {
    subexit = state.enter(`title${suffix}`)
    value += tracker.move(' ' + quote)
    value += tracker.move(
      state.safe(node.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    )
    value += tracker.move(quote)
    subexit()
  }

  exit()

  return value
}


/***/ }),

/***/ 15089:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ linkReference)
/* harmony export */ });
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {LinkReference, Parents} from 'mdast'
 */

linkReference.peek = linkReferencePeek

/**
 * Serialize a link reference node.
 *
 * @param {LinkReference} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function linkReference(node, _, state, info) {
  const type = node.referenceType
  const exit = state.enter('linkReference')
  let subexit = state.enter('label')
  const tracker = state.createTracker(info)
  let value = tracker.move('[')
  const text = state.containerPhrasing(node, {
    before: value,
    after: ']',
    ...tracker.current()
  })
  value += tracker.move(text + '][')

  subexit()
  // Hide that we’re in phrasing as things like attention or code cannot form
  // in references.
  // Character escapes and references *do* work.
  // It is important to know about other constructs, such as table cells.
  const stack = state.stack
  state.stack = stack.filter(function (d) {
    return d !== 'phrasing'
  })
  subexit = state.enter('reference')
  // Note: for proper tracking, we should reset the output positions when we end
  // up making a `shortcut` reference, because then there is no brace output.
  // Practically, in that case, there is no content, so it doesn’t matter that
  // we’ve tracked one too many characters.
  const reference = state.safe(state.associationId(node), {
    before: value,
    after: ']',
    ...tracker.current()
  })
  subexit()
  state.stack = stack
  exit()

  if (type === 'full' || !text || text !== reference) {
    value += tracker.move(reference + ']')
  } else if (type === 'shortcut') {
    // Remove the unwanted `[`.
    value = value.slice(0, -1)
  } else {
    value += tracker.move(']')
  }

  return value
}

/**
 * Peek at this node.
 *
 * @returns {string}
 *   Start of the serialized markdown.
 */
function linkReferencePeek() {
  return '['
}


/***/ }),

/***/ 15147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ checkBulletOther)
/* harmony export */ });
/* harmony import */ var _check_bullet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16080);
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */



/**
 * Checks the preferred alternate list bullet option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['bullet'], null | undefined>}
 *   Preferred alternate list bullet.
 */
function checkBulletOther(state) {
  const bullet = (0,_check_bullet_js__WEBPACK_IMPORTED_MODULE_0__/* .checkBullet */ .d)(state)
  const bulletOther = state.options.bulletOther

  if (!bulletOther) {
    return bullet === '*' ? '-' : '*'
  }

  if (bulletOther !== '*' && bulletOther !== '+' && bulletOther !== '-') {
    throw new Error(
      'Cannot serialize items with `' +
        bulletOther +
        '` for `options.bulletOther`, expected `*`, `+`, or `-`'
    )
  }

  if (bulletOther === bullet) {
    throw new Error(
      'Expected `bullet` (`' +
        bullet +
        '`) and `bulletOther` (`' +
        bulletOther +
        '`) to be different'
    )
  }

  return bulletOther
}


/***/ }),

/***/ 15330:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Undo2)
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
    name: "undo-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9 14 4 9l5-5",
                key: "102s5s"
            }
        ],
        [
            "path",
            {
                d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
                key: "f3b9sd"
            }
        ]
    ]
};
__iconData.node;
const Undo2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=undo-2.mjs.map


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

/***/ 16080:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ checkBullet)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred list bullet option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['bullet'], null | undefined>}
 *   Preferred list bullet.
 */
function checkBullet(state) {
  const marker = state.options.bullet || '*'

  if (marker !== '*' && marker !== '+' && marker !== '-') {
    throw new Error(
      'Cannot serialize items with `' +
        marker +
        '` for `options.bullet`, expected `*`, `+`, or `-`'
    )
  }

  return marker
}


/***/ }),

/***/ 16406:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ blockquote)
/* harmony export */ });
/**
 * @import {Blockquote, Parents} from 'mdast'
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 */

/**
 * Serialize a blockquote node.
 *
 * @param {Blockquote} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function blockquote(node, _, state, info) {
  const exit = state.enter('blockquote')
  const tracker = state.createTracker(info)
  tracker.move('> ')
  tracker.shift(2)
  const value = state.indentLines(
    state.containerFlow(node, tracker.current()),
    map
  )
  exit()
  return value
}

/**
 * Indent lines w/ blockquote markers.
 *
 * @type {Map}
 */
function map(line, _, blank) {
  return '>' + (blank ? '' : ' ') + line
}


/***/ }),

/***/ 16449:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Terminal)
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
    name: "terminal",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 19h8",
                key: "baeox8"
            }
        ],
        [
            "path",
            {
                d: "m4 17 6-6-6-6",
                key: "1yngyt"
            }
        ]
    ]
};
__iconData.node;
const Terminal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=terminal.mjs.map


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

/***/ 20392:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ html)
/* harmony export */ });
/**
 * @import {Html} from 'mdast'
 */

html.peek = htmlPeek

/**
 * Serialize an HTML node.
 *
 * @param {Html} node
 *   Node to serialize.
 * @returns {string}
 *   Serialized markdown.
 */
function html(node) {
  return node.value || ''
}

/**
 * Peek at this node.
 *
 * @returns {string}
 *   Start of the serialized markdown.
 */
function htmlPeek() {
  return '<'
}


/***/ }),

/***/ 21086:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ checkEmphasis)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred emphasis option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['emphasis'], null | undefined>}
 *   Preferred emphasis marker.
 */
function checkEmphasis(state) {
  const marker = state.options.emphasis || '*'

  if (marker !== '*' && marker !== '_') {
    throw new Error(
      'Cannot serialize emphasis with `' +
        marker +
        '` for `options.emphasis`, expected `*`, or `_`'
    )
  }

  return marker
}


/***/ }),

/***/ 21206:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ gfmFootnote)
/* harmony export */ });
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50055);
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62835);
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4294);
/* harmony import */ var micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76548);
/**
 * @import {Event, Exiter, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */





const indent = {
  tokenize: tokenizeIndent,
  partial: true
};

// To do: micromark should support a `_hiddenGfmFootnoteSupport`, which only
// affects label start (image).
// That will let us drop `tokenizePotentialGfmFootnote*`.
// It currently has a `_hiddenFootnoteSupport`, which affects that and more.
// That can be removed when `micromark-extension-footnote` is archived.

/**
 * Create an extension for `micromark` to enable GFM footnote syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to
 *   enable GFM footnote syntax.
 */
function gfmFootnote() {
  /** @type {Extension} */
  return {
    document: {
      [91]: {
        name: 'gfmFootnoteDefinition',
        tokenize: tokenizeDefinitionStart,
        continuation: {
          tokenize: tokenizeDefinitionContinuation
        },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [91]: {
        name: 'gfmFootnoteCall',
        tokenize: tokenizeGfmFootnoteCall
      },
      [93]: {
        name: 'gfmPotentialFootnoteCall',
        add: 'after',
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}

// To do: remove after micromark update.
/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizePotentialGfmFootnoteCall(effects, ok, nok) {
  const self = this;
  let index = self.events.length;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  /** @type {Token} */
  let labelStart;

  // Find an opening.
  while (index--) {
    const token = self.events[index][1];
    if (token.type === "labelImage") {
      labelStart = token;
      break;
    }

    // Exit if we’ve walked far enough.
    if (token.type === 'gfmFootnoteCall' || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
      break;
    }
  }
  return start;

  /**
   * @type {State}
   */
  function start(code) {
    if (!labelStart || !labelStart._balanced) {
      return nok(code);
    }
    const id = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_0__/* .normalizeIdentifier */ .B)(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    }));
    if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
      return nok(code);
    }
    effects.enter('gfmFootnoteCallLabelMarker');
    effects.consume(code);
    effects.exit('gfmFootnoteCallLabelMarker');
    return ok(code);
  }
}

// To do: remove after micromark update.
/** @type {Resolver} */
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index = events.length;
  /** @type {Token | undefined} */
  let labelStart;

  // Find an opening.
  while (index--) {
    if (events[index][1].type === "labelImage" && events[index][0] === 'enter') {
      labelStart = events[index][1];
      break;
    }
  }
  // Change the `labelImageMarker` to a `data`.
  events[index + 1][1].type = "data";
  events[index + 3][1].type = 'gfmFootnoteCallLabelMarker';

  // The whole (without `!`):
  /** @type {Token} */
  const call = {
    type: 'gfmFootnoteCall',
    start: Object.assign({}, events[index + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  // The `^` marker
  /** @type {Token} */
  const marker = {
    type: 'gfmFootnoteCallMarker',
    start: Object.assign({}, events[index + 3][1].end),
    end: Object.assign({}, events[index + 3][1].end)
  };
  // Increment the end 1 character.
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  /** @type {Token} */
  const string = {
    type: 'gfmFootnoteCallString',
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  /** @type {Token} */
  const chunk = {
    type: "chunkString",
    contentType: 'string',
    start: Object.assign({}, string.start),
    end: Object.assign({}, string.end)
  };

  /** @type {Array<Event>} */
  const replacement = [
  // Take the `labelImageMarker` (now `data`, the `!`)
  events[index + 1], events[index + 2], ['enter', call, context],
  // The `[`
  events[index + 3], events[index + 4],
  // The `^`.
  ['enter', marker, context], ['exit', marker, context],
  // Everything in between.
  ['enter', string, context], ['enter', chunk, context], ['exit', chunk, context], ['exit', string, context],
  // The ending (`]`, properly parsed and labelled).
  events[events.length - 2], events[events.length - 1], ['exit', call, context]];
  events.splice(index, events.length - index + 1, ...replacement);
  return events;
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeGfmFootnoteCall(effects, ok, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let size = 0;
  /** @type {boolean} */
  let data;

  // Note: the implementation of `markdown-rs` is different, because it houses
  // core *and* extensions in one project.
  // Therefore, it can include footnote logic inside `label-end`.
  // We can’t do that, but luckily, we can parse footnotes in a simpler way than
  // needed for labels.
  return start;

  /**
   * Start of footnote label.
   *
   * ```markdown
   * > | a [^b] c
   *       ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter('gfmFootnoteCall');
    effects.enter('gfmFootnoteCallLabelMarker');
    effects.consume(code);
    effects.exit('gfmFootnoteCallLabelMarker');
    return callStart;
  }

  /**
   * After `[`, at `^`.
   *
   * ```markdown
   * > | a [^b] c
   *        ^
   * ```
   *
   * @type {State}
   */
  function callStart(code) {
    if (code !== 94) return nok(code);
    effects.enter('gfmFootnoteCallMarker');
    effects.consume(code);
    effects.exit('gfmFootnoteCallMarker');
    effects.enter('gfmFootnoteCallString');
    effects.enter('chunkString').contentType = 'string';
    return callData;
  }

  /**
   * In label.
   *
   * ```markdown
   * > | a [^b] c
   *         ^
   * ```
   *
   * @type {State}
   */
  function callData(code) {
    if (
    // Too long.
    size > 999 ||
    // Closing brace with nothing.
    code === 93 && !data ||
    // Space or tab is not supported by GFM for some reason.
    // `\n` and `[` not being supported makes sense.
    code === null || code === 91 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      return nok(code);
    }
    if (code === 93) {
      effects.exit('chunkString');
      const token = effects.exit('gfmFootnoteCallString');
      if (!defined.includes((0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_0__/* .normalizeIdentifier */ .B)(self.sliceSerialize(token)))) {
        return nok(code);
      }
      effects.enter('gfmFootnoteCallLabelMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteCallLabelMarker');
      effects.exit('gfmFootnoteCall');
      return ok;
    }
    if (!(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      data = true;
    }
    size++;
    effects.consume(code);
    return code === 92 ? callEscape : callData;
  }

  /**
   * On character after escape.
   *
   * ```markdown
   * > | a [^b\c] d
   *           ^
   * ```
   *
   * @type {State}
   */
  function callEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return callData;
    }
    return callData(code);
  }
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeDefinitionStart(effects, ok, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  /** @type {string} */
  let identifier;
  let size = 0;
  /** @type {boolean | undefined} */
  let data;
  return start;

  /**
   * Start of GFM footnote definition.
   *
   * ```markdown
   * > | [^a]: b
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter('gfmFootnoteDefinition')._container = true;
    effects.enter('gfmFootnoteDefinitionLabel');
    effects.enter('gfmFootnoteDefinitionLabelMarker');
    effects.consume(code);
    effects.exit('gfmFootnoteDefinitionLabelMarker');
    return labelAtMarker;
  }

  /**
   * In label, at caret.
   *
   * ```markdown
   * > | [^a]: b
   *      ^
   * ```
   *
   * @type {State}
   */
  function labelAtMarker(code) {
    if (code === 94) {
      effects.enter('gfmFootnoteDefinitionMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteDefinitionMarker');
      effects.enter('gfmFootnoteDefinitionLabelString');
      effects.enter('chunkString').contentType = 'string';
      return labelInside;
    }
    return nok(code);
  }

  /**
   * In label.
   *
   * > 👉 **Note**: `cmark-gfm` prevents whitespace from occurring in footnote
   * > definition labels.
   *
   * ```markdown
   * > | [^a]: b
   *       ^
   * ```
   *
   * @type {State}
   */
  function labelInside(code) {
    if (
    // Too long.
    size > 999 ||
    // Closing brace with nothing.
    code === 93 && !data ||
    // Space or tab is not supported by GFM for some reason.
    // `\n` and `[` not being supported makes sense.
    code === null || code === 91 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      return nok(code);
    }
    if (code === 93) {
      effects.exit('chunkString');
      const token = effects.exit('gfmFootnoteDefinitionLabelString');
      identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_0__/* .normalizeIdentifier */ .B)(self.sliceSerialize(token));
      effects.enter('gfmFootnoteDefinitionLabelMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteDefinitionLabelMarker');
      effects.exit('gfmFootnoteDefinitionLabel');
      return labelAfter;
    }
    if (!(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      data = true;
    }
    size++;
    effects.consume(code);
    return code === 92 ? labelEscape : labelInside;
  }

  /**
   * After `\`, at a special character.
   *
   * > 👉 **Note**: `cmark-gfm` currently does not support escaped brackets:
   * > <https://github.com/github/cmark-gfm/issues/240>
   *
   * ```markdown
   * > | [^a\*b]: c
   *         ^
   * ```
   *
   * @type {State}
   */
  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return labelInside;
    }
    return labelInside(code);
  }

  /**
   * After definition label.
   *
   * ```markdown
   * > | [^a]: b
   *         ^
   * ```
   *
   * @type {State}
   */
  function labelAfter(code) {
    if (code === 58) {
      effects.enter('definitionMarker');
      effects.consume(code);
      effects.exit('definitionMarker');
      if (!defined.includes(identifier)) {
        defined.push(identifier);
      }

      // Any whitespace after the marker is eaten, forming indented code
      // is not possible.
      // No space is also fine, just like a block quote marker.
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__/* .factorySpace */ .N)(effects, whitespaceAfter, 'gfmFootnoteDefinitionWhitespace');
    }
    return nok(code);
  }

  /**
   * After definition prefix.
   *
   * ```markdown
   * > | [^a]: b
   *           ^
   * ```
   *
   * @type {State}
   */
  function whitespaceAfter(code) {
    // `markdown-rs` has a wrapping token for the prefix that is closed here.
    return ok(code);
  }
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeDefinitionContinuation(effects, ok, nok) {
  /// Start of footnote definition continuation.
  ///
  /// ```markdown
  ///   | [^a]: b
  /// > |     c
  ///     ^
  /// ```
  //
  // Either a blank line, which is okay, or an indented thing.
  return effects.check(micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__/* .blankLine */ .B, ok, effects.attempt(indent, ok, nok));
}

/** @type {Exiter} */
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit('gfmFootnoteDefinition');
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeIndent(effects, ok, nok) {
  const self = this;
  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__/* .factorySpace */ .N)(effects, afterPrefix, 'gfmFootnoteDefinitionIndent', 4 + 1);

  /**
   * @type {State}
   */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === 'gfmFootnoteDefinitionIndent' && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok(code) : nok(code);
  }
}

/***/ }),

/***/ 23350:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ escapeStringRegexp)
/* harmony export */ });
function escapeStringRegexp(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}


/***/ }),

/***/ 23451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);

const error = () => {
    const Sizable = {
        string: { unit: "characters", verb: "to have" },
        file: { unit: "bytes", verb: "to have" },
        array: { unit: "items", verb: "to have" },
        set: { unit: "items", verb: "to have" },
        map: { unit: "entries", verb: "to have" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        mac: "MAC address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        currency_code: "currency code",
        credit_card: "credit card number",
        iban: "IBAN",
        jwt: "JWT",
        template_literal: "input",
    };
    // type names: missing keys = do not translate (use raw value via ?? fallback)
    const TypeDictionary = {
        // Compatibility: "nan" -> "NaN" for display
        nan: "NaN",
        // All other type names omitted - they fall back to raw values via ?? operator
    };
    function getTypeName(type, input) {
        if (type === "number" && typeof input === "number" && !Number.isFinite(input)) {
            return String(input);
        }
        return TypeDictionary[type] ?? type;
    }
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = getTypeName(issue.expected);
                const receivedType = _core_util_js__WEBPACK_IMPORTED_MODULE_0__/* .parsedType */ .GW(issue.input);
                const received = getTypeName(receivedType, issue.input);
                return `Invalid input: expected ${expected}, received ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Invalid input: expected ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__/* .stringifyPrimitive */ .B7(issue.values[0])}`;
                return `Invalid option: expected one of ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__/* .joinValues */ .jw(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
                return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Invalid string: must start with "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Invalid string: must end with "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Invalid string: must include "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Invalid string: must match pattern ${_issue.pattern}`;
                return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Invalid number: must be a multiple of ${issue.divisor}`;
            case "unrecognized_keys":
                return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__/* .joinValues */ .jw(issue.keys, ", ")}`;
            case "invalid_key":
                return `Invalid key in ${issue.origin}`;
            case "invalid_union":
                if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
                    const opts = issue.options.map((o) => `'${o}'`).join(" | ");
                    return `Invalid discriminator value. Expected ${opts}`;
                }
                if (issue.inclusive === false) {
                    return "Invalid input: more than one option matched";
                }
                return "Invalid input";
            case "invalid_element":
                return `Invalid value in ${issue.origin}`;
            default:
                return `Invalid input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }),

/***/ 23566:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Columns2)
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
    name: "columns-2",
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
                d: "M12 3v18",
                key: "108xh3"
            }
        ]
    ],
    aliases: [
        "columns"
    ]
};
__iconData.node;
const Columns2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=columns-2.mjs.map


/***/ }),

/***/ 23637:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileUp)
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
    name: "file-up",
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
                d: "M12 12v6",
                key: "3ahymv"
            }
        ],
        [
            "path",
            {
                d: "m15 15-3-3-3 3",
                key: "15xj92"
            }
        ]
    ]
};
__iconData.node;
const FileUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-up.mjs.map


/***/ }),

/***/ 25658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ checkRuleRepetition)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred rule repetition option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['ruleRepetition'], null | undefined>}
 *   Preferred rule repetition.
 */
function checkRuleRepetition(state) {
  const repetition = state.options.ruleRepetition || 3

  if (repetition < 3) {
    throw new Error(
      'Cannot serialize rules with repetition `' +
        repetition +
        '` for `options.ruleRepetition`, expected `3` or more'
    )
  }

  return repetition
}


/***/ }),

/***/ 26997:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ heading)
/* harmony export */ });
/* harmony import */ var _util_encode_character_reference_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80039);
/* harmony import */ var _util_format_heading_as_setext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81806);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Heading, Parents} from 'mdast'
 */




/**
 * Serialize a heading node.
 *
 * @param {Heading} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function heading(node, _, state, info) {
  const rank = Math.max(Math.min(6, node.depth || 1), 1)
  const tracker = state.createTracker(info)

  if ((0,_util_format_heading_as_setext_js__WEBPACK_IMPORTED_MODULE_0__/* .formatHeadingAsSetext */ .f)(node, state)) {
    const exit = state.enter('headingSetext')
    const subexit = state.enter('phrasing')
    const value = state.containerPhrasing(node, {
      ...tracker.current(),
      before: '\n',
      after: '\n'
    })
    subexit()
    exit()

    return (
      value +
      '\n' +
      (rank === 1 ? '=' : '-').repeat(
        // The whole size…
        value.length -
          // Minus the position of the character after the last EOL (or
          // 0 if there is none)…
          (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
      )
    )
  }

  const sequence = '#'.repeat(rank)
  const exit = state.enter('headingAtx')
  const subexit = state.enter('phrasing')

  // Note: for proper tracking, we should reset the output positions when there
  // is no content returned, because then the space is not output.
  // Practically, in that case, there is no content, so it doesn’t matter that
  // we’ve tracked one too many characters.
  tracker.move(sequence + ' ')

  let value = state.containerPhrasing(node, {
    before: '# ',
    after: '\n',
    ...tracker.current()
  })

  const head = value.charCodeAt(0)

  if (head === 9 /* `\t` */ || head === 32 /* ` ` */) {
    // To do: what effect has the character reference on tracking?
    value = (0,_util_encode_character_reference_js__WEBPACK_IMPORTED_MODULE_1__/* .encodeCharacterReference */ .T)(head) + value.slice(1)
  }

  value = value ? sequence + ' ' + value : sequence

  if (state.options.closeAtx) {
    value += ' ' + sequence
  }

  subexit()
  exit()

  return value
}


/***/ }),

/***/ 27076:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ PinOff)
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
    name: "pin-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 17v5",
                key: "bb1du9"
            }
        ],
        [
            "path",
            {
                d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89",
                key: "znwnzq"
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
                d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
                key: "c9qhm2"
            }
        ]
    ]
};
__iconData.node;
const PinOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=pin-off.mjs.map


/***/ }),

/***/ 27502:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CloudUpload)
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
    name: "cloud-upload",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 13v8",
                key: "1l5pq0"
            }
        ],
        [
            "path",
            {
                d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
                key: "1pljnt"
            }
        ],
        [
            "path",
            {
                d: "m8 17 4-4 4 4",
                key: "1quai1"
            }
        ]
    ],
    aliases: [
        "upload-cloud"
    ]
};
__iconData.node;
const CloudUpload = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=cloud-upload.mjs.map


/***/ }),

/***/ 27855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JM: () => (/* binding */ flattenError),
/* harmony export */   Kd: () => (/* binding */ $ZodRealError),
/* harmony export */   Wk: () => (/* binding */ formatError),
/* harmony export */   a$: () => (/* binding */ $ZodError)
/* harmony export */ });
/* unused harmony exports treeifyError, toDotPath, prettifyError */
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55503);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);


/* Computing the message eagerly is expensive (pretty-printed JSON of all
 * issues), so defer it until first read. The accessor functions and
 * descriptors are shared across instances to keep error construction
 * cheap; the computed message is cached on the internals object. The
 * setter preserves plain assignment semantics for consumers that
 * overwrite `message`. */
function _getMessage() {
    const internals = this._zod;
    internals.message ?? (internals.message = JSON.stringify(internals.def, _util_js__WEBPACK_IMPORTED_MODULE_0__/* .jsonStringifyReplacer */ .k8, 2));
    return internals.message;
}
function _setMessage(value) {
    this._zod.message = value;
}
const _messageDesc = {
    get: _getMessage,
    set: _setMessage,
    enumerable: true,
    configurable: true,
};
const _issuesDesc = { value: undefined, enumerable: false };
/* Prototypes that already carry the lazy `toString`. Seeded with the
 * intrinsics so that `init` on a foreign object — it accepts any object —
 * can never install an accessor onto a prototype we do not own. */
const _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
const initializer = (inst, def) => {
    inst.name = "$ZodError";
    // `_zod` is already non-enumerable: $constructor's init defined it with this same descriptor
    _issuesDesc.value = def;
    Object.defineProperty(inst, "issues", _issuesDesc);
    // Clear the shared slot; a retained `value` pins the last error's issues.
    _issuesDesc.value = undefined;
    Object.defineProperty(inst, "message", _messageDesc);
    /* `toString` lives as a non-enumerable lazy getter on the shared
     * prototype; on first access it caches a per-instance closure so
     * detached usage still works. */
    const proto = Object.getPrototypeOf(inst);
    if (!_installedToString.has(proto)) {
        _installedToString.add(proto);
        Object.defineProperty(proto, "toString", {
            configurable: true,
            enumerable: false,
            get() {
                const value = () => this.message;
                Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
                return value;
            },
            set(value) {
                Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
            },
        });
    }
};
const $ZodError = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .$constructor */ .xI)("$ZodError", initializer);
const $ZodRealError = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .$constructor */ .xI)("$ZodError", initializer, undefined, {
    Parent: Error,
});
/** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
 * ("toString", "constructor") would otherwise read through to the prototype, and assigning
 * "__proto__" would hit the setter instead of creating a key. */
function node(obj, key, make) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === "__proto__") {
            Object.defineProperty(obj, key, { value: make(), writable: true, enumerable: true, configurable: true });
        }
        else {
            obj[key] = make();
        }
    }
    return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error.issues) {
        if (sub.path.length > 0) {
            node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
        }
        else {
            formErrors.push(mapper(sub));
        }
    }
    return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
    const fieldErrors = { _errors: [] };
    const processError = (error, path = []) => {
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < fullpath.length) {
                        const el = fullpath[i];
                        const terminal = i === fullpath.length - 1;
                        // `_errors` is reserved by this legacy format, so merge a matching path segment into the current node instead of treating its array as a child.
                        if (el === "_errors") {
                            if (terminal)
                                curr._errors.push(mapper(issue));
                            i++;
                            continue;
                        }
                        // A path element may collide with an inherited property name such as
                        // "__proto__" or "constructor". Truthiness checks read the prototype
                        // (so no node is created, then ._errors.push throws), and bracket
                        // assignment of "__proto__" hits the setter instead of creating an
                        // own key. Guard the read with hasOwnProperty and create the node
                        // with defineProperty so any path element becomes a real own key.
                        if (!Object.prototype.hasOwnProperty.call(curr, el)) {
                            Object.defineProperty(curr, el, {
                                value: { _errors: [] },
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            });
                        }
                        const node = curr[el];
                        if (terminal) {
                            node._errors.push(mapper(issue));
                        }
                        curr = node;
                        i++;
                    }
                }
            }
        }
    };
    processError(error);
    return fieldErrors;
}
function treeifyError(error, mapper = (issue) => issue.message) {
    const result = { errors: [] };
    const processError = (error, path = []) => {
        var _a;
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                // regular union error
                issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    result.errors.push(mapper(issue));
                    continue;
                }
                let curr = result;
                let i = 0;
                while (i < fullpath.length) {
                    const el = fullpath[i];
                    const terminal = i === fullpath.length - 1;
                    if (typeof el === "string") {
                        curr.properties ?? (curr.properties = {});
                        // el may collide with an inherited property name ("__proto__",
                        // "constructor", ...); ??= reads the prototype so the node is never
                        // created and curr.errors.push throws. Guard with hasOwnProperty and
                        // create the node with defineProperty so "__proto__" becomes a real
                        // own key rather than invoking the prototype setter.
                        if (!Object.prototype.hasOwnProperty.call(curr.properties, el)) {
                            Object.defineProperty(curr.properties, el, {
                                value: { errors: [] },
                                enumerable: true,
                                writable: true,
                                configurable: true,
                            });
                        }
                        curr = curr.properties[el];
                    }
                    else {
                        curr.items ?? (curr.items = []);
                        (_a = curr.items)[el] ?? (_a[el] = { errors: [] });
                        curr = curr.items[el];
                    }
                    if (terminal) {
                        curr.errors.push(mapper(issue));
                    }
                    i++;
                }
            }
        }
    };
    processError(error);
    return result;
}
/** Format a ZodError as a human-readable string in the following form.
 *
 * From
 *
 * ```ts
 * ZodError {
 *   issues: [
 *     {
 *       expected: 'string',
 *       code: 'invalid_type',
 *       path: [ 'username' ],
 *       message: 'Invalid input: expected string'
 *     },
 *     {
 *       expected: 'number',
 *       code: 'invalid_type',
 *       path: [ 'favoriteNumbers', 1 ],
 *       message: 'Invalid input: expected number'
 *     }
 *   ];
 * }
 * ```
 *
 * to
 *
 * ```
 * username
 *   ✖ Expected number, received string at "username
 * favoriteNumbers[0]
 *   ✖ Invalid input: expected number
 * ```
 */
function toDotPath(_path) {
    const segs = [];
    const path = _path.map((seg) => (typeof seg === "object" ? seg.key : seg));
    for (const seg of path) {
        if (typeof seg === "number")
            segs.push(`[${seg}]`);
        else if (typeof seg === "symbol")
            segs.push(`[${JSON.stringify(String(seg))}]`);
        else if (/[^\w$]/.test(seg))
            segs.push(`[${JSON.stringify(seg)}]`);
        else {
            if (segs.length)
                segs.push(".");
            segs.push(seg);
        }
    }
    return segs.join("");
}
function prettifyError(error) {
    const lines = [];
    // sort by path length
    const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
    // Process each issue
    for (const issue of issues) {
        lines.push(`✖ ${issue.message}`);
        if (issue.path?.length)
            lines.push(`  → at ${toDotPath(issue.path)}`);
    }
    // Convert Map to formatted string
    return lines.join("\n");
}


/***/ }),

/***/ 28980:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ VolumeX)
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
    name: "volume-x",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",
                key: "1p7khw"
            }
        ],
        [
            "path",
            {
                d: "m16.5 14.5 5-5",
                key: "cul3yw"
            }
        ],
        [
            "path",
            {
                d: "m16.5 9.5 5 5",
                key: "1akey5"
            }
        ]
    ]
};
__iconData.node;
const VolumeX = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=volume-x.mjs.map


/***/ }),

/***/ 30040:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ longestStreak)
/* harmony export */ });
/**
 * Get the count of the longest repeating streak of `substring` in `value`.
 *
 * @param {string} value
 *   Content to search in.
 * @param {string} substring
 *   Substring to look for, typically one character.
 * @returns {number}
 *   Count of most frequent adjacent `substring`s in `value`.
 */
function longestStreak(value, substring) {
  const source = String(value)
  let index = source.indexOf(substring)
  let expected = index
  let count = 0
  let max = 0

  if (typeof substring !== 'string') {
    throw new TypeError('Expected substring')
  }

  while (index !== -1) {
    if (index === expected) {
      if (++count > max) {
        max = count
      }
    } else {
      count = 1
    }

    expected = index + substring.length
    index = source.indexOf(substring, expected)
  }

  return max
}


/***/ }),

/***/ 31458:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileSpreadsheet)
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
    name: "file-spreadsheet",
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
                d: "M8 13h2",
                key: "yr2amv"
            }
        ],
        [
            "path",
            {
                d: "M14 13h2",
                key: "un5t4a"
            }
        ],
        [
            "path",
            {
                d: "M8 17h2",
                key: "2yhykz"
            }
        ],
        [
            "path",
            {
                d: "M14 17h2",
                key: "10kma7"
            }
        ]
    ]
};
__iconData.node;
const FileSpreadsheet = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-spreadsheet.mjs.map


/***/ }),

/***/ 31649:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ checkFence)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred fence option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['fence'], null | undefined>}
 *   Preferred fence marker.
 */
function checkFence(state) {
  const marker = state.options.fence || '`'

  if (marker !== '`' && marker !== '~') {
    throw new Error(
      'Cannot serialize code with `' +
        marker +
        '` for `options.fence`, expected `` ` `` or `~`'
    )
  }

  return marker
}


/***/ }),

/***/ 31711:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fd: () => (/* binding */ globalRegistry)
/* harmony export */ });
/* unused harmony exports $output, $input, $ZodRegistry, registry */
var _a;
const $output = /*@__PURE__*/ (/* unused pure expression or super */ null && (Symbol("ZodOutput")));
const $input = /*@__PURE__*/ (/* unused pure expression or super */ null && (Symbol("ZodInput")));
class $ZodRegistry {
    constructor() {
        this._map = new WeakMap();
        this._idmap = new Map();
    }
    add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.set(meta.id, schema);
        }
        return this;
    }
    clear() {
        this._map = new WeakMap();
        this._idmap = new Map();
        return this;
    }
    remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
    }
    get(schema) {
        // return this._map.get(schema) as any;
        // inherit metadata
        const p = schema._zod.parent;
        if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id; // do not inherit id
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
    }
    has(schema) {
        return this._map.has(schema);
    }
}
// registries
function registry() {
    return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;


/***/ }),

/***/ 34358:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ gfmTableFromMarkdown),
/* harmony export */   d: () => (/* binding */ gfmTableToMarkdown)
/* harmony export */ });
/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23091);
/* harmony import */ var markdown_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87672);
/* harmony import */ var mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6563);
/**
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('mdast').Table} Table
 * @typedef {import('mdast').TableCell} TableCell
 * @typedef {import('mdast').TableRow} TableRow
 *
 * @typedef {import('markdown-table').Options} MarkdownTableOptions
 *
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 *
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').State} State
 * @typedef {import('mdast-util-to-markdown').Info} Info
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [tableCellPadding=true]
 *   Whether to add a space of padding between delimiters and cells (default:
 *   `true`).
 * @property {boolean | null | undefined} [tablePipeAlign=true]
 *   Whether to align the delimiters (default: `true`).
 * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]
 *   Function to detect the length of table cell content, used when aligning
 *   the delimiters between cells (optional).
 */





/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM tables in
 * markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown` to enable GFM tables.
 */
function gfmTableFromMarkdown() {
  return {
    enter: {
      table: enterTable,
      tableData: enterCell,
      tableHeader: enterCell,
      tableRow: enterRow
    },
    exit: {
      codeText: exitCodeText,
      table: exitTable,
      tableData: exit,
      tableHeader: exit,
      tableRow: exit
    }
  }
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterTable(token) {
  const align = token._align
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(align, 'expected `_align` on table')
  this.enter(
    {
      type: 'table',
      align: align.map(function (d) {
        return d === 'none' ? null : d
      }),
      children: []
    },
    token
  )
  this.data.inTable = true
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitTable(token) {
  this.exit(token)
  this.data.inTable = undefined
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterRow(token) {
  this.enter({type: 'tableRow', children: []}, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exit(token) {
  this.exit(token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterCell(token) {
  this.enter({type: 'tableCell', children: []}, token)
}

// Overwrite the default code text data handler to unescape escaped pipes when
// they are in tables.
/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitCodeText(token) {
  let value = this.resume()

  if (this.data.inTable) {
    value = value.replace(/\\([\\|])/g, replace)
  }

  const node = this.stack[this.stack.length - 1]
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'inlineCode')
  node.value = value
  this.exit(token)
}

/**
 * @param {string} $0
 * @param {string} $1
 * @returns {string}
 */
function replace($0, $1) {
  // Pipes work, backslashes don’t (but can’t escape pipes).
  return $1 === '|' ? $1 : $0
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM tables in
 * markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM tables.
 */
function gfmTableToMarkdown(options) {
  const settings = options || {}
  const padding = settings.tableCellPadding
  const alignDelimiters = settings.tablePipeAlign
  const stringLength = settings.stringLength
  const around = padding ? ' ' : '|'

  return {
    unsafe: [
      {character: '\r', inConstruct: 'tableCell'},
      {character: '\n', inConstruct: 'tableCell'},
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      {atBreak: true, character: '|', after: '[\t :-]'},
      // A pipe in a cell must be encoded.
      {character: '|', inConstruct: 'tableCell'},
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      {atBreak: true, character: ':', after: '-'},
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      {atBreak: true, character: '-', after: '[:|-]'}
    ],
    handlers: {
      inlineCode: inlineCodeWithTable,
      table: handleTable,
      tableCell: handleTableCell,
      tableRow: handleTableRow
    }
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {Table} node
   */
  function handleTable(node, _, state, info) {
    return serializeData(handleTableAsData(node, state, info), node.align)
  }

  /**
   * This function isn’t really used normally, because we handle rows at the
   * table level.
   * But, if someone passes in a table row, this ensures we make somewhat sense.
   *
   * @type {ToMarkdownHandle}
   * @param {TableRow} node
   */
  function handleTableRow(node, _, state, info) {
    const row = handleTableRowAsData(node, state, info)
    const value = serializeData([row])
    // `markdown-table` will always add an align row
    return value.slice(0, value.indexOf('\n'))
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {TableCell} node
   */
  function handleTableCell(node, _, state, info) {
    const exit = state.enter('tableCell')
    const subexit = state.enter('phrasing')
    const value = state.containerPhrasing(node, {
      ...info,
      before: around,
      after: around
    })
    subexit()
    exit()
    return value
  }

  /**
   * @param {Array<Array<string>>} matrix
   * @param {Array<string | null | undefined> | null | undefined} [align]
   */
  function serializeData(matrix, align) {
    return (0,markdown_table__WEBPACK_IMPORTED_MODULE_1__/* .markdownTable */ .Q)(matrix, {
      align,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength
    })
  }

  /**
   * @param {Table} node
   * @param {State} state
   * @param {Info} info
   */
  function handleTableAsData(node, state, info) {
    const children = node.children
    let index = -1
    /** @type {Array<Array<string>>} */
    const result = []
    const subexit = state.enter('table')

    while (++index < children.length) {
      result[index] = handleTableRowAsData(children[index], state, info)
    }

    subexit()

    return result
  }

  /**
   * @param {TableRow} node
   * @param {State} state
   * @param {Info} info
   */
  function handleTableRowAsData(node, state, info) {
    const children = node.children
    let index = -1
    /** @type {Array<string>} */
    const result = []
    const subexit = state.enter('tableRow')

    while (++index < children.length) {
      // Note: the positional info as used here is incorrect.
      // Making it correct would be impossible due to aligning cells?
      // And it would need copy/pasting `markdown-table` into this project.
      result[index] = handleTableCell(children[index], node, state, info)
    }

    subexit()

    return result
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {InlineCode} node
   */
  function inlineCodeWithTable(node, parent, state) {
    let value = mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__/* .handle */ .p.inlineCode(node, parent, state)

    if (state.stack.includes('tableCell')) {
      value = value.replace(/\|/g, '\\$&')
    }

    return value
  }
}


/***/ }),

/***/ 35105:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ phrasing)
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73129);
/**
 * @typedef {import('mdast').Html} Html
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 */



/**
 * Check if the given value is *phrasing content*.
 *
 * > 👉 **Note**: Excludes `html`, which can be both phrasing or flow.
 *
 * @param node
 *   Thing to check, typically `Node`.
 * @returns
 *   Whether `value` is phrasing content.
 */

const phrasing =
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  (
    (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__/* .convert */ .C)([
      'break',
      'delete',
      'emphasis',
      // To do: next major: removed since footnotes were added to GFM.
      'footnote',
      'footnoteReference',
      'image',
      'imageReference',
      'inlineCode',
      // Enabled by `mdast-util-math`:
      'inlineMath',
      'link',
      'linkReference',
      // Enabled by `mdast-util-mdx`:
      'mdxJsxTextElement',
      // Enabled by `mdast-util-mdx`:
      'mdxTextExpression',
      'strong',
      'text',
      // Enabled by `mdast-util-directive`:
      'textDirective'
    ])
  )


/***/ }),

/***/ 36961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ remarkGfm)
/* harmony export */ });
/* harmony import */ var mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93999);
/* harmony import */ var micromark_extension_gfm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97042);
/**
 * @import {Root} from 'mdast'
 * @import {Options} from 'remark-gfm'
 * @import {} from 'remark-parse'
 * @import {} from 'remark-stringify'
 * @import {Processor} from 'unified'
 */




/** @type {Options} */
const emptyOptions = {}

/**
 * Add support GFM (autolink literals, footnotes, strikethrough, tables,
 * tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
function remarkGfm(options) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor<Root>} */ (this)
  const settings = options || emptyOptions
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push((0,micromark_extension_gfm__WEBPACK_IMPORTED_MODULE_0__/* .gfm */ .T)(settings))
  fromMarkdownExtensions.push((0,mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__/* .gfmFromMarkdown */ .C)())
  toMarkdownExtensions.push((0,mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__/* .gfmToMarkdown */ .H)(settings))
}


/***/ }),

/***/ 37233:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ gfmAutolinkLiteral)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4294);
/**
 * @import {Code, ConstructRecord, Event, Extension, Previous, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */


const wwwPrefix = {
  tokenize: tokenizeWwwPrefix,
  partial: true
};
const domain = {
  tokenize: tokenizeDomain,
  partial: true
};
const path = {
  tokenize: tokenizePath,
  partial: true
};
const trail = {
  tokenize: tokenizeTrail,
  partial: true
};
const emailDomainDotTrail = {
  tokenize: tokenizeEmailDomainDotTrail,
  partial: true
};
const wwwAutolink = {
  name: 'wwwAutolink',
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
const protocolAutolink = {
  name: 'protocolAutolink',
  tokenize: tokenizeProtocolAutolink,
  previous: previousProtocol
};
const emailAutolink = {
  name: 'emailAutolink',
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};

/** @type {ConstructRecord} */
const text = {};

/**
 * Create an extension for `micromark` to support GitHub autolink literal
 * syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   autolink literal syntax.
 */
function gfmAutolinkLiteral() {
  return {
    text
  };
}

/** @type {Code} */
let code = 48;

// Add alphanumerics.
while (code < 123) {
  text[code] = emailAutolink;
  code++;
  if (code === 58) code = 65;else if (code === 91) code = 97;
}
text[43] = emailAutolink;
text[45] = emailAutolink;
text[46] = emailAutolink;
text[95] = emailAutolink;
text[72] = [emailAutolink, protocolAutolink];
text[104] = [emailAutolink, protocolAutolink];
text[87] = [emailAutolink, wwwAutolink];
text[119] = [emailAutolink, wwwAutolink];

// To do: perform email autolink literals on events, afterwards.
// That’s where `markdown-rs` and `cmark-gfm` perform it.
// It should look for `@`, then for atext backwards, and then for a label
// forwards.
// To do: `mailto:`, `xmpp:` protocol as prefix.

/**
 * Email autolink literal.
 *
 * ```markdown
 * > | a contact@example.org b
 *       ^^^^^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeEmailAutolink(effects, ok, nok) {
  const self = this;
  /** @type {boolean | undefined} */
  let dot;
  /** @type {boolean} */
  let data;
  return start;

  /**
   * Start of email autolink literal.
   *
   * ```markdown
   * > | a contact@example.org b
   *       ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    if (!gfmAtext(code) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code);
    }
    effects.enter('literalAutolink');
    effects.enter('literalAutolinkEmail');
    return atext(code);
  }

  /**
   * In email atext.
   *
   * ```markdown
   * > | a contact@example.org b
   *       ^
   * ```
   *
   * @type {State}
   */
  function atext(code) {
    if (gfmAtext(code)) {
      effects.consume(code);
      return atext;
    }
    if (code === 64) {
      effects.consume(code);
      return emailDomain;
    }
    return nok(code);
  }

  /**
   * In email domain.
   *
   * The reference code is a bit overly complex as it handles the `@`, of which
   * there may be just one.
   * Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L318>
   *
   * ```markdown
   * > | a contact@example.org b
   *               ^
   * ```
   *
   * @type {State}
   */
  function emailDomain(code) {
    // Dot followed by alphanumerical (not `-` or `_`).
    if (code === 46) {
      return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code);
    }

    // Alphanumerical, `-`, and `_`.
    if (code === 45 || code === 95 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlphanumeric */ .lV)(code)) {
      data = true;
      effects.consume(code);
      return emailDomain;
    }

    // To do: `/` if xmpp.

    // Note: normally we’d truncate trailing punctuation from the link.
    // However, email autolink literals cannot contain any of those markers,
    // except for `.`, but that can only occur if it isn’t trailing.
    // So we can ignore truncating!
    return emailDomainAfter(code);
  }

  /**
   * In email domain, on dot that is not a trail.
   *
   * ```markdown
   * > | a contact@example.org b
   *                      ^
   * ```
   *
   * @type {State}
   */
  function emailDomainDot(code) {
    effects.consume(code);
    dot = true;
    return emailDomain;
  }

  /**
   * After email domain.
   *
   * ```markdown
   * > | a contact@example.org b
   *                          ^
   * ```
   *
   * @type {State}
   */
  function emailDomainAfter(code) {
    // Domain must not be empty, must include a dot, and must end in alphabetical.
    // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L332>.
    if (data && dot && (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(self.previous)) {
      effects.exit('literalAutolinkEmail');
      effects.exit('literalAutolink');
      return ok(code);
    }
    return nok(code);
  }
}

/**
 * `www` autolink literal.
 *
 * ```markdown
 * > | a www.example.org b
 *       ^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeWwwAutolink(effects, ok, nok) {
  const self = this;
  return wwwStart;

  /**
   * Start of www autolink literal.
   *
   * ```markdown
   * > | www.example.com/a?b#c
   *     ^
   * ```
   *
   * @type {State}
   */
  function wwwStart(code) {
    if (code !== 87 && code !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code);
    }
    effects.enter('literalAutolink');
    effects.enter('literalAutolinkWww');
    // Note: we *check*, so we can discard the `www.` we parsed.
    // If it worked, we consider it as a part of the domain.
    return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code);
  }

  /**
   * After a www autolink literal.
   *
   * ```markdown
   * > | www.example.com/a?b#c
   *                          ^
   * ```
   *
   * @type {State}
   */
  function wwwAfter(code) {
    effects.exit('literalAutolinkWww');
    effects.exit('literalAutolink');
    return ok(code);
  }
}

/**
 * Protocol autolink literal.
 *
 * ```markdown
 * > | a https://example.org b
 *       ^^^^^^^^^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeProtocolAutolink(effects, ok, nok) {
  const self = this;
  let buffer = '';
  let seen = false;
  return protocolStart;

  /**
   * Start of protocol autolink literal.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *     ^
   * ```
   *
   * @type {State}
   */
  function protocolStart(code) {
    if ((code === 72 || code === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
      effects.enter('literalAutolink');
      effects.enter('literalAutolinkHttp');
      buffer += String.fromCodePoint(code);
      effects.consume(code);
      return protocolPrefixInside;
    }
    return nok(code);
  }

  /**
   * In protocol.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *     ^^^^^
   * ```
   *
   * @type {State}
   */
  function protocolPrefixInside(code) {
    // `5` is size of `https`
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code) && buffer.length < 5) {
      // @ts-expect-error: definitely number.
      buffer += String.fromCodePoint(code);
      effects.consume(code);
      return protocolPrefixInside;
    }
    if (code === 58) {
      const protocol = buffer.toLowerCase();
      if (protocol === 'http' || protocol === 'https') {
        effects.consume(code);
        return protocolSlashesInside;
      }
    }
    return nok(code);
  }

  /**
   * In slashes.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *           ^^
   * ```
   *
   * @type {State}
   */
  function protocolSlashesInside(code) {
    if (code === 47) {
      effects.consume(code);
      if (seen) {
        return afterProtocol;
      }
      seen = true;
      return protocolSlashesInside;
    }
    return nok(code);
  }

  /**
   * After protocol, before domain.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *             ^
   * ```
   *
   * @type {State}
   */
  function afterProtocol(code) {
    // To do: this is different from `markdown-rs`:
    // https://github.com/wooorm/markdown-rs/blob/b3a921c761309ae00a51fe348d8a43adbc54b518/src/construct/gfm_autolink_literal.rs#L172-L182
    return code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiControl */ .JQ)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodeWhitespace */ .Ny)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodePunctuation */ .es)(code) ? nok(code) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code);
  }

  /**
   * After a protocol autolink literal.
   *
   * ```markdown
   * > | https://example.com/a?b#c
   *                              ^
   * ```
   *
   * @type {State}
   */
  function protocolAfter(code) {
    effects.exit('literalAutolinkHttp');
    effects.exit('literalAutolink');
    return ok(code);
  }
}

/**
 * `www` prefix.
 *
 * ```markdown
 * > | a www.example.org b
 *       ^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeWwwPrefix(effects, ok, nok) {
  let size = 0;
  return wwwPrefixInside;

  /**
   * In www prefix.
   *
   * ```markdown
   * > | www.example.com
   *     ^^^^
   * ```
   *
   * @type {State}
   */
  function wwwPrefixInside(code) {
    if ((code === 87 || code === 119) && size < 3) {
      size++;
      effects.consume(code);
      return wwwPrefixInside;
    }
    if (code === 46 && size === 3) {
      effects.consume(code);
      return wwwPrefixAfter;
    }
    return nok(code);
  }

  /**
   * After www prefix.
   *
   * ```markdown
   * > | www.example.com
   *         ^
   * ```
   *
   * @type {State}
   */
  function wwwPrefixAfter(code) {
    // If there is *anything*, we can link.
    return code === null ? nok(code) : ok(code);
  }
}

/**
 * Domain.
 *
 * ```markdown
 * > | a https://example.org b
 *               ^^^^^^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeDomain(effects, ok, nok) {
  /** @type {boolean | undefined} */
  let underscoreInLastSegment;
  /** @type {boolean | undefined} */
  let underscoreInLastLastSegment;
  /** @type {boolean | undefined} */
  let seen;
  return domainInside;

  /**
   * In domain.
   *
   * ```markdown
   * > | https://example.com/a
   *             ^^^^^^^^^^^
   * ```
   *
   * @type {State}
   */
  function domainInside(code) {
    // Check whether this marker, which is a trailing punctuation
    // marker, optionally followed by more trailing markers, and then
    // followed by an end.
    if (code === 46 || code === 95) {
      return effects.check(trail, domainAfter, domainAtPunctuation)(code);
    }

    // GH documents that only alphanumerics (other than `-`, `.`, and `_`) can
    // occur, which sounds like ASCII only, but they also support `www.點看.com`,
    // so that’s Unicode.
    // Instead of some new production for Unicode alphanumerics, markdown
    // already has that for Unicode punctuation and whitespace, so use those.
    // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L12>.
    if (code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodeWhitespace */ .Ny)(code) || code !== 45 && (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodePunctuation */ .es)(code)) {
      return domainAfter(code);
    }
    seen = true;
    effects.consume(code);
    return domainInside;
  }

  /**
   * In domain, at potential trailing punctuation, that was not trailing.
   *
   * ```markdown
   * > | https://example.com
   *                    ^
   * ```
   *
   * @type {State}
   */
  function domainAtPunctuation(code) {
    // There is an underscore in the last segment of the domain
    if (code === 95) {
      underscoreInLastSegment = true;
    }
    // Otherwise, it’s a `.`: save the last segment underscore in the
    // penultimate segment slot.
    else {
      underscoreInLastLastSegment = underscoreInLastSegment;
      underscoreInLastSegment = undefined;
    }
    effects.consume(code);
    return domainInside;
  }

  /**
   * After domain.
   *
   * ```markdown
   * > | https://example.com/a
   *                        ^
   * ```
   *
   * @type {State} */
  function domainAfter(code) {
    // Note: that’s GH says a dot is needed, but it’s not true:
    // <https://github.com/github/cmark-gfm/issues/279>
    if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
      return nok(code);
    }
    return ok(code);
  }
}

/**
 * Path.
 *
 * ```markdown
 * > | a https://example.org/stuff b
 *                          ^^^^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizePath(effects, ok) {
  let sizeOpen = 0;
  let sizeClose = 0;
  return pathInside;

  /**
   * In path.
   *
   * ```markdown
   * > | https://example.com/a
   *                        ^^
   * ```
   *
   * @type {State}
   */
  function pathInside(code) {
    if (code === 40) {
      sizeOpen++;
      effects.consume(code);
      return pathInside;
    }

    // To do: `markdown-rs` also needs this.
    // If this is a paren, and there are less closings than openings,
    // we don’t check for a trail.
    if (code === 41 && sizeClose < sizeOpen) {
      return pathAtPunctuation(code);
    }

    // Check whether this trailing punctuation marker is optionally
    // followed by more trailing markers, and then followed
    // by an end.
    if (code === 33 || code === 34 || code === 38 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 60 || code === 63 || code === 93 || code === 95 || code === 126) {
      return effects.check(trail, ok, pathAtPunctuation)(code);
    }
    if (code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodeWhitespace */ .Ny)(code)) {
      return ok(code);
    }
    effects.consume(code);
    return pathInside;
  }

  /**
   * In path, at potential trailing punctuation, that was not trailing.
   *
   * ```markdown
   * > | https://example.com/a"b
   *                          ^
   * ```
   *
   * @type {State}
   */
  function pathAtPunctuation(code) {
    // Count closing parens.
    if (code === 41) {
      sizeClose++;
    }
    effects.consume(code);
    return pathInside;
  }
}

/**
 * Trail.
 *
 * This calls `ok` if this *is* the trail, followed by an end, which means
 * the entire trail is not part of the link.
 * It calls `nok` if this *is* part of the link.
 *
 * ```markdown
 * > | https://example.com").
 *                        ^^^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeTrail(effects, ok, nok) {
  return trail;

  /**
   * In trail of domain or path.
   *
   * ```markdown
   * > | https://example.com").
   *                        ^
   * ```
   *
   * @type {State}
   */
  function trail(code) {
    // Regular trailing punctuation.
    if (code === 33 || code === 34 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 63 || code === 95 || code === 126) {
      effects.consume(code);
      return trail;
    }

    // `&` followed by one or more alphabeticals and then a `;`, is
    // as a whole considered as trailing punctuation.
    // In all other cases, it is considered as continuation of the URL.
    if (code === 38) {
      effects.consume(code);
      return trailCharacterReferenceStart;
    }

    // Needed because we allow literals after `[`, as we fix:
    // <https://github.com/github/cmark-gfm/issues/278>.
    // Check that it is not followed by `(` or `[`.
    if (code === 93) {
      effects.consume(code);
      return trailBracketAfter;
    }
    if (
    // `<` is an end.
    code === 60 ||
    // So is whitespace.
    code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodeWhitespace */ .Ny)(code)) {
      return ok(code);
    }
    return nok(code);
  }

  /**
   * In trail, after `]`.
   *
   * > 👉 **Note**: this deviates from `cmark-gfm` to fix a bug.
   * > See end of <https://github.com/github/cmark-gfm/issues/278> for more.
   *
   * ```markdown
   * > | https://example.com](
   *                         ^
   * ```
   *
   * @type {State}
   */
  function trailBracketAfter(code) {
    // Whitespace or something that could start a resource or reference is the end.
    // Switch back to trail otherwise.
    if (code === null || code === 40 || code === 91 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .unicodeWhitespace */ .Ny)(code)) {
      return ok(code);
    }
    return trail(code);
  }

  /**
   * In character-reference like trail, after `&`.
   *
   * ```markdown
   * > | https://example.com&amp;).
   *                         ^
   * ```
   *
   * @type {State}
   */
  function trailCharacterReferenceStart(code) {
    // When non-alpha, it’s not a trail.
    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code) ? trailCharacterReferenceInside(code) : nok(code);
  }

  /**
   * In character-reference like trail.
   *
   * ```markdown
   * > | https://example.com&amp;).
   *                         ^
   * ```
   *
   * @type {State}
   */
  function trailCharacterReferenceInside(code) {
    // Switch back to trail if this is well-formed.
    if (code === 59) {
      effects.consume(code);
      return trail;
    }
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code)) {
      effects.consume(code);
      return trailCharacterReferenceInside;
    }

    // It’s not a trail.
    return nok(code);
  }
}

/**
 * Dot in email domain trail.
 *
 * This calls `ok` if this *is* the trail, followed by an end, which means
 * the trail is not part of the link.
 * It calls `nok` if this *is* part of the link.
 *
 * ```markdown
 * > | contact@example.org.
 *                        ^
 * ```
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeEmailDomainDotTrail(effects, ok, nok) {
  return start;

  /**
   * Dot.
   *
   * ```markdown
   * > | contact@example.org.
   *                    ^   ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // Must be dot.
    effects.consume(code);
    return after;
  }

  /**
   * After dot.
   *
   * ```markdown
   * > | contact@example.org.
   *                     ^   ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    // Not a trail if alphanumeric.
    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlphanumeric */ .lV)(code) ? nok(code) : ok(code);
  }
}

/**
 * See:
 * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L156>.
 *
 * @type {Previous}
 */
function previousWww(code) {
  return code === null || code === 40 || code === 42 || code === 95 || code === 91 || code === 93 || code === 126 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code);
}

/**
 * See:
 * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L214>.
 *
 * @type {Previous}
 */
function previousProtocol(code) {
  return !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code);
}

/**
 * @this {TokenizeContext}
 * @type {Previous}
 */
function previousEmail(code) {
  // Do not allow a slash “inside” atext.
  // The reference code is a bit weird, but that’s what it results in.
  // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L307>.
  // Other than slash, every preceding character is allowed.
  return !(code === 47 || gfmAtext(code));
}

/**
 * @param {Code} code
 * @returns {boolean}
 */
function gfmAtext(code) {
  return code === 43 || code === 45 || code === 46 || code === 95 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlphanumeric */ .lV)(code);
}

/**
 * @param {Array<Event>} events
 * @returns {boolean}
 */
function previousUnbalanced(events) {
  let index = events.length;
  let result = false;
  while (index--) {
    const token = events[index][1];
    if ((token.type === 'labelLink' || token.type === 'labelImage') && !token._balanced) {
      result = true;
      break;
    }

    // If we’ve seen this token, and it was marked as not having any unbalanced
    // bracket before it, we can exit.
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    // Mark the last token as “walked into” w/o finding
    // anything.
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}

/***/ }),

/***/ 37832:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ thematicBreak)
/* harmony export */ });
/* harmony import */ var _util_check_rule_repetition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25658);
/* harmony import */ var _util_check_rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61010);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Parents, ThematicBreak} from 'mdast'
 */




/**
 * Serialize a thematic break node.
 *
 * @param {ThematicBreak} _
 *   Node to serialize.
 * @param {Parents | undefined} _1
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @returns {string}
 *   Serialized markdown.
 */
function thematicBreak(_, _1, state) {
  const value = (
    (0,_util_check_rule_js__WEBPACK_IMPORTED_MODULE_0__/* .checkRule */ .T)(state) + (state.options.ruleSpaces ? ' ' : '')
  ).repeat((0,_util_check_rule_repetition_js__WEBPACK_IMPORTED_MODULE_1__/* .checkRuleRepetition */ .u)(state))

  return state.options.ruleSpaces ? value.slice(0, -1) : value
}


/***/ }),

/***/ 38324:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $N: () => (/* binding */ $ZodISODuration),
/* harmony export */   $p: () => (/* binding */ $ZodArray),
/* harmony export */   $v: () => (/* binding */ $ZodString),
/* harmony export */   Ax: () => (/* binding */ $ZodISOTime),
/* harmony export */   BN: () => (/* binding */ $ZodBigInt),
/* harmony export */   CI: () => (/* binding */ $ZodCIDRv4),
/* harmony export */   CQ: () => (/* binding */ $ZodBase64URL),
/* harmony export */   Cn: () => (/* binding */ $ZodCIDRv6),
/* harmony export */   Dq: () => (/* binding */ $ZodBase64),
/* harmony export */   EY: () => (/* binding */ $ZodStringFormat),
/* harmony export */   G3: () => (/* binding */ $ZodTuple),
/* harmony export */   GP: () => (/* binding */ $ZodUnknown),
/* harmony export */   GY: () => (/* binding */ $ZodKSUID),
/* harmony export */   I: () => (/* binding */ $ZodNumberFormat),
/* harmony export */   Ko: () => (/* binding */ $ZodISODateTime),
/* harmony export */   LJ: () => (/* binding */ $ZodIntersection),
/* harmony export */   Lc: () => (/* binding */ $ZodIPv4),
/* harmony export */   N$: () => (/* binding */ $ZodNonOptional),
/* harmony export */   Oy: () => (/* binding */ $ZodE164),
/* harmony export */   Py: () => (/* binding */ $ZodNanoID),
/* harmony export */   RL: () => (/* binding */ $ZodExactOptional),
/* harmony export */   Sb: () => (/* binding */ $ZodReadonly),
/* harmony export */   TF: () => (/* binding */ $ZodXID),
/* harmony export */   Um: () => (/* binding */ $ZodNever),
/* harmony export */   VF: () => (/* binding */ $ZodPrefault),
/* harmony export */   VO: () => (/* binding */ $ZodEnum),
/* harmony export */   VY: () => (/* binding */ $ZodURL),
/* harmony export */   W4: () => (/* binding */ $ZodType),
/* harmony export */   Wc: () => (/* binding */ $ZodTransform),
/* harmony export */   YK: () => (/* binding */ standardProps),
/* harmony export */   Zc: () => (/* binding */ $ZodGUID),
/* harmony export */   Zn: () => (/* binding */ $ZodUUID),
/* harmony export */   Zu: () => (/* binding */ $ZodCUID2),
/* harmony export */   Zy: () => (/* binding */ $ZodIPv6),
/* harmony export */   _m: () => (/* binding */ $ZodPipe),
/* harmony export */   b0: () => (/* binding */ $ZodCustom),
/* harmony export */   bl: () => (/* binding */ $ZodCUID),
/* harmony export */   cG: () => (/* binding */ $ZodEmoji),
/* harmony export */   cq: () => (/* binding */ base64Charset),
/* harmony export */   cu: () => (/* binding */ $ZodUnion),
/* harmony export */   g5: () => (/* binding */ $ZodULID),
/* harmony export */   h8: () => (/* binding */ $ZodJWT),
/* harmony export */   ig: () => (/* binding */ $ZodOptional),
/* harmony export */   o5: () => (/* binding */ $ZodDate),
/* harmony export */   qG: () => (/* binding */ $ZodEmail),
/* harmony export */   qc: () => (/* binding */ $ZodNullable),
/* harmony export */   rv: () => (/* binding */ $ZodDefault),
/* harmony export */   sF: () => (/* binding */ $ZodBoolean),
/* harmony export */   t$: () => (/* binding */ $ZodCatch),
/* harmony export */   v1: () => (/* binding */ $ZodISODate),
/* harmony export */   vz: () => (/* binding */ $ZodNumber),
/* harmony export */   w: () => (/* binding */ $ZodObjectJIT),
/* harmony export */   xE: () => (/* binding */ base64urlCharset)
/* harmony export */ });
/* unused harmony exports URL_BAD_FORMAT, URL_UNPARSEABLE, canParseURL, validateURL, parseURLObject, stripTabAndNewline, urlHostnameOk, urlProtocolOk, isValidIPv6, $ZodMAC, isValidCIDRv6, isValidBase64, isValidBase64URL, isValidCreditCard, $ZodCreditCard, isValidIBAN, $ZodIBAN, isValidJWT, $ZodCustomStringFormat, $ZodBigIntFormat, $ZodSymbol, $ZodUndefined, $ZodNull, $ZodAny, $ZodVoid, $ZodObject, $ZodXor, getDiscriminatedOption, $ZodDiscriminatedUnion, mergeValues, $ZodRecord, $ZodMap, $ZodSet, $ZodLiteral, $ZodFile, $ZodSuccess, $ZodNaN, $ZodCodec, $ZodPreprocess, $ZodTemplateLiteral, $ZodFunction, $ZodPromise, $ZodLazy */
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74593);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55503);
/* harmony import */ var _doc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(76477);
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9459);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68056);
/* harmony import */ var _versions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83165);







const $ZodType = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodType", (inst, def) => {
    var _a;
    inst ?? (inst = {});
    inst._zod.def = def; // set _def property
    inst._zod.bag = inst._zod.bag || {}; // initialize _bag object
    inst._zod.version = _versions_js__WEBPACK_IMPORTED_MODULE_1__/* .version */ .r;
    const defChecks = inst._zod.def.checks;
    // if inst is itself a checks.$ZodCheck, run it as a check
    const checks = inst._zod.traits.has("$ZodCheck")
        ? [inst, ...(defChecks ?? [])]
        : defChecks?.length
            ? [...defChecks]
            : [];
    for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
            fn(inst);
        }
    }
    if (checks.length === 0) {
        // deferred initializer inst._zod.parse is not yet defined
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred?.push(() => {
            inst._zod.run = inst._zod.parse;
        });
    }
    else {
        const runChecks = (payload, checks, ctx) => {
            if (payload.memo)
                return payload;
            let isAborted = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload);
            let asyncResult;
            for (const ch of checks) {
                if (ch._zod.def.when) {
                    if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .explicitlyAborted */ .rL(payload))
                        continue;
                    const shouldRun = ch._zod.def.when(payload);
                    if (!shouldRun)
                        continue;
                }
                else if (isAborted) {
                    continue;
                }
                const currLen = payload.issues.length;
                const _ = ch._zod.check(payload);
                if (_ instanceof Promise && ctx?.async === false) {
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
                }
                if (asyncResult || _ instanceof Promise) {
                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                        await _;
                        const nextLen = payload.issues.length;
                        if (nextLen === currLen)
                            return;
                        _util_js__WEBPACK_IMPORTED_MODULE_2__/* .attachSchema */ .d3(payload.issues, currLen, inst);
                        if (!isAborted)
                            isAborted = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload, currLen);
                    });
                }
                else {
                    const nextLen = payload.issues.length;
                    if (nextLen === currLen)
                        continue;
                    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .attachSchema */ .d3(payload.issues, currLen, inst);
                    if (!isAborted)
                        isAborted = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload, currLen);
                }
            }
            if (asyncResult) {
                return asyncResult.then(() => {
                    return payload;
                });
            }
            return payload;
        };
        const handleCanaryResult = (canary, payload, ctx) => {
            // abort if the canary is aborted
            if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(canary)) {
                canary.aborted = true;
                return canary;
            }
            // run checks first, then
            const checkResult = runChecks(payload, checks, ctx);
            if (checkResult instanceof Promise) {
                if (ctx.async === false)
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
                return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
            }
            return inst._zod.parse(checkResult, ctx);
        };
        inst._zod.run = (payload, ctx) => {
            if (ctx.skipChecks) {
                return inst._zod.parse(payload, ctx);
            }
            if (ctx.direction === "backward") {
                // run canary initial pass (no checks)
                const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
                if (canary instanceof Promise) {
                    return canary.then((canary) => {
                        return handleCanaryResult(canary, payload, ctx);
                    });
                }
                return handleCanaryResult(canary, payload, ctx);
            }
            // forward
            const result = inst._zod.parse(payload, ctx);
            if (result instanceof Promise) {
                if (ctx.async === false)
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
                return result.then((result) => runChecks(result, checks, ctx));
            }
            return runChecks(result, checks, ctx);
        };
    }
}, {
    // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
    get "~standard"() {
        return _util_js__WEBPACK_IMPORTED_MODULE_2__/* .hide */ .jD(this, "~standard", standardProps(this));
    },
    set "~standard"(value) {
        _util_js__WEBPACK_IMPORTED_MODULE_2__/* .own */ .qh(this, "~standard", value);
    },
});
/** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
// a Standard Schema result only reports issues, so a failure finalizes them straight off the raw payload: no ZodError, and no lazy result to read through
const toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W())) } : { value: r.value };
async function validateAsync(inst, value) {
    const ctx = { async: true };
    return toStandardResult((await inst._zod.run({ value, issues: [] }, ctx)), ctx);
}
function standardProps(inst) {
    return {
        validate: (value) => {
            const ctx = { async: false };
            try {
                const r = inst._zod.run({ value, issues: [] }, ctx);
                if (!(r instanceof Promise))
                    return toStandardResult(r, ctx);
            }
            catch (_) { }
            // async function so a synchronously throwing check rejects instead of escaping validate
            return validateAsync(inst, value);
        },
        vendor: "zod",
        version: 1,
    };
}

const $ZodString = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodString", (inst, def) => {
    $ZodType.init(inst, def);
    // a format's own pattern, else unbounded; a template literal derives the check-aware form itself
    inst._zod.pattern = def.pattern ?? _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .anyString */ .gp;
    inst._zod.parse = (payload, _) => {
        if (def.coerce)
            try {
                payload.value = String(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "string")
            return payload;
        payload.issues.push({
            expected: "string",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodStringFormat", (inst, def) => {
    // check initialization must come first
    _checks_js__WEBPACK_IMPORTED_MODULE_4__/* .$ZodCheckStringFormat */ .ql.init(inst, def);
    $ZodString.init(inst, def);
});
const $ZodGUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodGUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .guid */ .Os);
    $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodUUID", (inst, def) => {
    if (def.version) {
        const versionMap = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4,
            v5: 5,
            v6: 6,
            v7: 7,
            v8: 8,
        };
        const v = versionMap[def.version];
        if (v === undefined)
            throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .uuid */ .uR(v));
    }
    else
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .uuid */ .uR());
    $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodEmail", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .email */ .Rp);
    $ZodStringFormat.init(inst, def);
});
/** The `://` guard rejected the input before the URL constructor saw it. */
const URL_BAD_FORMAT = 1;
/** The URL parser rejected the input. */
const URL_UNPARSEABLE = 2;
function canParseURL(input) {
    try {
        if (typeof URL !== "undefined" && typeof URL.canParse === "function")
            return URL.canParse(input);
        new URL(input);
        return true;
    }
    catch {
        return false;
    }
}
function validateURL(trimmed, def) {
    if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) {
        return canParseURL(trimmed) || URL_UNPARSEABLE;
    }
    return parseURLObject(trimmed, def);
}
/** Parses a URL while preserving the non-normalizing HTTP guard. */
function parseURLObject(trimmed, def) {
    // When normalize is off, require :// for http/https URLs. This prevents strings like "http:example.com" or "https:/path" from being silently accepted
    if (!def.normalize && def.protocol?.source === _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .httpProtocol */ .F.source && !/^https?:\/\//i.test(trimmed)) {
        return URL_BAD_FORMAT;
    }
    try {
        if (typeof URL !== "undefined") {
            const URLStatic = URL;
            if (typeof URLStatic.parse === "function")
                return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
        }
        // @ts-ignore
        return new URL(trimmed);
    }
    catch {
        return URL_UNPARSEABLE;
    }
}
const asciiTabOrNewline = /[\t\n\r]/g;
/** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
function stripTabAndNewline(value) {
    return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
    hostname.lastIndex = 0;
    return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
    protocol.lastIndex = 0;
    return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
const $ZodURL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodURL", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        try {
            // Trim whitespace from input
            const trimmed = payload.value.trim();
            const url = validateURL(trimmed, def);
            if (url === URL_BAD_FORMAT) {
                payload.issues.push({
                    code: "invalid_format",
                    format: "url",
                    note: "Invalid URL format",
                    input: payload.value,
                    inst,
                    continue: !def.abort,
                });
                return;
            }
            if (url === URL_UNPARSEABLE) {
                payload.issues.push({
                    code: "invalid_format",
                    format: "url",
                    input: payload.value,
                    inst,
                    continue: !def.abort,
                });
                return;
            }
            if (url === true) {
                payload.value = stripTabAndNewline(trimmed);
                return;
            }
            if (def.hostname && !urlHostnameOk(url, def.hostname)) {
                payload.issues.push({
                    code: "invalid_format",
                    format: "url",
                    note: "Invalid hostname",
                    pattern: def.hostname.source,
                    input: payload.value,
                    inst,
                    continue: !def.abort,
                });
            }
            if (def.protocol && !urlProtocolOk(url, def.protocol)) {
                payload.issues.push({
                    code: "invalid_format",
                    format: "url",
                    note: "Invalid protocol",
                    pattern: def.protocol.source,
                    input: payload.value,
                    inst,
                    continue: !def.abort,
                });
            }
            // Set the output value based on normalize flag
            payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
            return;
        }
        catch (_) {
            payload.issues.push({
                code: "invalid_format",
                format: "url",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodEmoji = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodEmoji", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .emoji */ .Zg());
    $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNanoID", (inst, def) => {
    if (def.length !== undefined && (!Number.isInteger(def.length) || def.length < 1))
        throw new Error(`Invalid nanoid length: ${def.length}`);
    def.pattern ?? (def.pattern = def.length === undefined ? _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak : _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .nanoidOfLength */ .D2(def.length));
    $ZodStringFormat.init(inst, def);
});
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
const $ZodCUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .cuid */ .gF);
    $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCUID2", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .cuid2 */ .Gl);
    $ZodStringFormat.init(inst, def);
});
const $ZodULID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodULID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .ulid */ .Z0);
    $ZodStringFormat.init(inst, def);
});
const $ZodXID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodXID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .xid */ .kM);
    $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodKSUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .ksuid */ .fO);
    $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodISODateTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .datetime */ .w$(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodISODate", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .date */ .p6);
    $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodISOTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .time */ .kB(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodISODuration", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .duration */ .p0);
    $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodIPv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .ipv4 */ .uX);
    $ZodStringFormat.init(inst, def);
});
/** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
const ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
    if (!ipv6Alphabet.test(value))
        return false;
    return canParseURL(`http://[${value}]`);
}
const $ZodIPv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodIPv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .ipv6 */ .ug);
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (!isValidIPv6(payload.value)) {
            payload.issues.push({
                code: "invalid_format",
                format: "ipv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodMAC = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodMAC", (inst, def) => {
    def.pattern ?? (def.pattern = regexes.mac(def.delimiter));
    $ZodStringFormat.init(inst, def);
})));
const $ZodCIDRv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCIDRv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .cidrv4 */ .zr);
    $ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
    const parts = value.split("/");
    if (parts.length !== 2)
        return false;
    const [address, prefix] = parts;
    if (!prefix)
        return false;
    const prefixNum = Number(prefix);
    if (`${prefixNum}` !== prefix)
        return false;
    if (prefixNum < 0 || prefixNum > 128)
        return false;
    return isValidIPv6(address);
}
const $ZodCIDRv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCIDRv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .cidrv6 */ .l7); // not used for validation
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (!isValidCIDRv6(payload.value)) {
            payload.issues.push({
                code: "invalid_format",
                format: "cidrv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
//////////////////////////////   ZodBase64   //////////////////////////////
function isValidBase64(data) {
    if (data === "")
        return true;
    // atob ignores whitespace, so reject it up front.
    if (/\s/.test(data))
        return false;
    if (data.length % 4 !== 0)
        return false;
    try {
        // @ts-ignore
        atob(data);
        return true;
    }
    catch {
        return false;
    }
}
// lax on purpose: the quantified regexes.base64 overflows the regex stack on multi-MB input and its leading ^$| alternation leaks through template-literal composition; isValidBase64 enforces length and padding
const base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
const $ZodBase64 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodBase64", (inst, def) => {
    def.pattern ?? (def.pattern = base64Charset);
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidBase64(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
//////////////////////////////   ZodBase64URL   //////////////////////////////
// lax on purpose: the quantified regexes.base64url overflows the regex stack on multi-MB input; isValidBase64 enforces length on the padded string
const base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
    if (!base64urlCharset.test(data))
        return false;
    const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return isValidBase64(padded);
}
const $ZodBase64URL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodBase64URL", (inst, def) => {
    def.pattern ?? (def.pattern = base64urlCharset);
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidBase64URL(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodE164 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodE164", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .e164 */ .hQ);
    $ZodStringFormat.init(inst, def);
});
//////////////////////////////   ZodCreditCard   //////////////////////////////
const CC_SANITIZE = /[- ]/g;
/** Luhn checksum on a digit-only string. Adapted from valibot (MIT). */
function isLuhnAlgo(digits) {
    let length = digits.length;
    let bit = 1;
    let sum = 0;
    while (length) {
        const value = digits.charCodeAt(--length) - 48;
        bit ^= 1;
        sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value] : value;
    }
    return sum % 10 === 0;
}
function isValidCreditCard(input) {
    if (!regexes.creditCard.test(input))
        return false;
    return isLuhnAlgo(input.replace(CC_SANITIZE, ""));
}
const $ZodCreditCard = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCreditCard", (inst, def) => {
    // Shape only — the Luhn check below is not expressible as a pattern, so consumers of `pattern` (JSON Schema, template literals) get the length and separator rules alone.
    def.pattern ?? (def.pattern = regexes.creditCard);
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidCreditCard(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "credit_card",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
})));
//////////////////////////////   ZodIBAN   //////////////////////////////
// iso 7064 mod 97-10 checksum without BigInt
function isIso7064Mod97(iban) {
    let remainder = 0;
    const len = iban.length;
    for (let i = 4; i < len; i++) {
        const code = iban.charCodeAt(i);
        remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
    }
    for (let i = 0; i < 4; i++) {
        const code = iban.charCodeAt(i);
        remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
    }
    return remainder === 1;
}
function isValidIBAN(input) {
    if (!regexes.iban.test(input))
        return false;
    return isIso7064Mod97(input);
}
const $ZodIBAN = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodIBAN", (inst, def) => {
    // shape only — checksum is not expressible as a pattern
    def.pattern ?? (def.pattern = regexes.iban);
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidIBAN(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "iban",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
})));
//////////////////////////////   ZodJWT   //////////////////////////////
function isValidJWT(token, algorithm = null) {
    try {
        const tokensParts = token.split(".");
        if (tokensParts.length !== 3)
            return false;
        const [header] = tokensParts;
        if (!header)
            return false;
        // @ts-ignore
        const parsedHeader = JSON.parse(atob(header));
        if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
            return false;
        if (!parsedHeader.alg)
            return false;
        if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
            return false;
        return true;
    }
    catch {
        return false;
    }
}
const $ZodJWT = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodJWT", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidJWT(payload.value, def.alg))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCustomStringFormat = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCustomStringFormat", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (def.fn(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: def.format,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
})));
const $ZodNumber = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNumber", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .number */ .ai;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Number(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
            return payload;
        }
        const received = typeof input === "number"
            ? Number.isNaN(input)
                ? "NaN"
                : !Number.isFinite(input)
                    ? String(input)
                    : undefined
            : undefined;
        payload.issues.push({
            expected: "number",
            code: "invalid_type",
            input,
            inst,
            ...(received ? { received } : {}),
        });
        return payload;
    };
});
const $ZodNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNumberFormat", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_4__/* .$ZodCheckNumberFormat */ .KH.init(inst, def);
    $ZodNumber.init(inst, def); // no format checks
});
const $ZodBoolean = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodBoolean", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zM;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Boolean(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "boolean")
            return payload;
        payload.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodBigInt = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodBigInt", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_3__/* .bigint */ .o;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = BigInt(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "bigint")
            return payload;
        payload.issues.push({
            expected: "bigint",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodBigIntFormat = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodBigIntFormat", (inst, def) => {
    checks.$ZodCheckBigIntFormat.init(inst, def);
    $ZodBigInt.init(inst, def); // no format checks
})));
const $ZodSymbol = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodSymbol", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "symbol")
            return payload;
        payload.issues.push({
            expected: "symbol",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodUndefined = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodUndefined", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = regexes.undefined;
    inst._zod.values = new Set([undefined]);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "undefined",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodNull = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodNull", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = regexes.null;
    inst._zod.values = new Set([null]);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input === null)
            return payload;
        payload.issues.push({
            expected: "null",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodAny = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodAny", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
})));
const $ZodUnknown = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodUnknown", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
});
const $ZodNever = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNever", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
            expected: "never",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodVoid = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodVoid", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "void",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodDate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodDate", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) {
            try {
                payload.value = new Date(payload.value);
            }
            catch (_err) { }
        }
        const input = payload.value;
        const isDate = input instanceof Date;
        const isValidDate = isDate && !Number.isNaN(input.getTime());
        if (isValidDate)
            return payload;
        payload.issues.push({
            expected: "date",
            code: "invalid_type",
            input,
            ...(isDate ? { received: "Invalid Date" } : {}),
            inst,
        });
        return payload;
    };
});
// an oversized container fails its leading size checks before any element is parsed
function capSize(inst, size) {
    const caps = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .sizeCaps */ .hi(inst._zod.def.checks);
    if (!caps.length)
        return;
    const cap = Math.min(...caps.map((c) => c[0]));
    const parse = inst._zod.parse;
    inst._zod.parse = (payload, ctx) => {
        const n = size(payload.value);
        if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
            for (const [max, ch] of _util_js__WEBPACK_IMPORTED_MODULE_2__/* .sizeCaps */ .hi(inst._zod.def.checks)) {
                if (n > max && ch._zod.def.when(payload)) {
                    const start = payload.issues.length;
                    ch._zod.check(payload);
                    // the value is still the raw input, so no later check may read it
                    payload.issues[start].continue = false;
                    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .attachSchema */ .d3(payload.issues, start, inst);
                    return payload;
                }
            }
        }
        return parse(payload, ctx);
    };
}
const arraySize = (input) => (Array.isArray(input) ? input.length : -1);
const mapSize = (input) => (input instanceof Map ? input.size : -1);
const setSize = (input) => (input instanceof Set ? input.size : -1);
function handleArrayResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__/* .prefixIssues */ .lQ(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodArray", (inst, def) => {
    $ZodType.init(inst, def);
    const memo = _core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                expected: "array",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
        const proms = [];
        const abortEarly = ctx?.abortEarly;
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const result = def.element._zod.run({
                value: item,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleArrayResult(result, payload, i)));
            }
            else {
                handleArrayResult(result, payload, i);
                // the element's payload is authoritative here, since handleArrayResult forwards every issue; an object's is not, because it drops a failed absent optional
                if (abortEarly && result.issues.length !== 0 && _util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(result))
                    break;
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload; //handleArrayResultsAsync(parseResults, final);
    };
    capSize(inst, arraySize);
});
function handlePropertyResult(result, final, key, input, optin, optout) {
    const isPresent = key in input;
    const isOptionalOut = optout === "optional";
    // The middle rung means "absence permitted, nothing supplied in its place", so an absent key contributes nothing — whatever the schema made of `undefined` is invented, not substituted. Only `optional` reaches this with a value: `defaulted` substitutes, and a schema that isn't optional-out has to keep the key.
    if (!isPresent && isOptionalOut && optin === "optional") {
        return;
    }
    if (result.issues.length) {
        // For optional-in/out schemas, ignore errors on absent keys.
        if (optin !== undefined && isOptionalOut && !isPresent) {
            return;
        }
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__/* .prefixIssues */ .lQ(key, result.issues));
    }
    if (!isPresent && optin === undefined) {
        if (!result.issues.length) {
            final.issues.push({
                code: "invalid_type",
                expected: "nonoptional",
                input: undefined,
                path: [key],
            });
        }
        return;
    }
    if (result.value === undefined) {
        if (isPresent || (optin === "defaulted" && !isOptionalOut)) {
            final.value[key] = undefined;
        }
    }
    else {
        final.value[key] = result.value;
    }
}
// one shared instance; a fresh [] per schema cost 56 bytes retained
const NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
    const keys = Object.keys(def.shape);
    const ownSymbols = Object.getOwnPropertySymbols(def.shape);
    const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
    // aliases `keys` when there are no symbols, so a string-only shape keeps one array
    const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
    for (const k of allKeys) {
        if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
            throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
        }
    }
    const okeys = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .optionalKeys */ .NM(def.shape);
    return {
        ...def,
        allKeys,
        symbolKeys,
        // string-only: handleCatchall matches it against `for...in`, which never yields a symbol
        keySet: new Set(keys),
        numKeys: keys.length,
        optionalKeys: new Set(okeys),
    };
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
    const unrecognized = [];
    const keySet = def.keySet;
    const _catchall = def.catchall._zod;
    const t = _catchall.def.type;
    const optin = _catchall.optin;
    const optout = _catchall.optout;
    // starts at 0, not the current length: the shape phase already ran and may have aborted
    let seen = 0;
    for (const key in input) {
        if (abortEarly && payload.issues.length !== seen) {
            if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload, seen))
                break;
            seen = payload.issues.length;
        }
        // Must precede the __proto__ branch: a declared key is not unrecognized, even though the shape loop deliberately strips __proto__ from the parsed output.
        if (keySet.has(key))
            continue;
        // Don't copy an undeclared __proto__ into the result; assignment to a plain {} would replace the result prototype. But in strict mode it is still an unknown key, so report it before skipping.
        if (key === "__proto__") {
            if (t === "never")
                unrecognized.push(key);
            continue;
        }
        if (t === "never") {
            unrecognized.push(key);
            continue;
        }
        const r = _catchall.run({ value: input[key], issues: [] }, ctx);
        if (r instanceof Promise) {
            proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
        }
        else {
            handlePropertyResult(r, payload, key, input, optin, optout);
        }
    }
    if (unrecognized.length) {
        payload.issues.push({
            code: "unrecognized_keys",
            keys: unrecognized,
            input,
            inst,
            // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
            continue: true,
        });
    }
    if (!proms.length)
        return payload;
    return Promise.all(proms).then(() => {
        return payload;
    });
}
const $ZodObject = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodObject", (inst, def) => {
    // requires cast because technically $ZodObject doesn't extend
    $ZodType.init(inst, def);
    const desc = Object.getOwnPropertyDescriptor(def, "shape");
    // a cloned def carries its source's accessor, which knows the shape it answers from; adopting that keeps the clone's keys readable without running it
    const sh = desc?.get ? desc.get.raw : (def.shape ?? {});
    if (sh) {
        // Freezes the shape on first read, so its getters resolve once and every later read sees the same schemas.
        const get = () => {
            const newSh = { ...sh };
            Object.defineProperty(def, "shape", { value: newSh });
            get.raw = newSh;
            return newSh;
        };
        get.raw = sh;
        Object.defineProperty(def, "shape", { get });
    }
    const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .cached */ .PO(() => normalizeDef(def));
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "propValues", (zod) => {
        const shape = zod.def.shape;
        const propValues = {};
        for (const key in shape) {
            const field = shape[key]._zod;
            if (field.values) {
                if (!Object.prototype.hasOwnProperty.call(propValues, key)) {
                    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .assignProp */ .Vy(propValues, key, new Set());
                }
                for (const v of field.values)
                    propValues[key].add(v);
                // An omittable slot reads back as undefined at a discriminator lookup, so it has to claim undefined: two options that can both omit the key are not discriminable on it.
                if (field.optin !== undefined)
                    propValues[key].add(undefined);
            }
        }
        return propValues;
    });
    const isObject = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .isObject */ .Gv;
    const catchall = def.catchall;
    let value;
    const memo = _core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
            payload.issues.push({
                expected: "object",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
        const proms = [];
        const shape = value.shape;
        const abortEarly = ctx?.abortEarly;
        let seen = payload.issues.length;
        for (const key of value.allKeys) {
            if (abortEarly && payload.issues.length !== seen) {
                if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload, seen))
                    break;
                seen = payload.issues.length;
            }
            if (key === "__proto__")
                continue;
            const el = shape[key];
            const optin = el._zod.optin;
            const optout = el._zod.optout;
            const r = el._zod.run({ value: input[key], issues: [] }, ctx);
            if (r instanceof Promise) {
                proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
            }
            else {
                handlePropertyResult(r, payload, key, input, optin, optout);
            }
        }
        if (!catchall) {
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
        }
        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
    };
});
const $ZodObjectJIT = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodObjectJIT", (inst, def) => {
    // requires cast because technically $ZodObject doesn't extend
    $ZodObject.init(inst, def);
    const superParse = inst._zod.parse;
    const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .cached */ .PO(() => normalizeDef(def));
    const memo = _core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer;
    const generateFastpass = (shape) => {
        const normalized = _normalized.value;
        const syms = normalized.symbolKeys;
        // a symbol has no source literal, so it is read as `syms[i]` off the closed-over scope
        const doc = new _doc_js__WEBPACK_IMPORTED_MODULE_5__/* .Doc */ .J(["payload", "ctx"], { shape, inst, memo, syms });
        const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
        // prefixes in place, like util.prefixIssues. newResult must land before the early return: a catchall runs after this and would otherwise write onto the caller's input
        const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
        doc.write(`const input = payload.value;`);
        const ids = Object.create(null);
        let counter = 0;
        for (const key of normalized.allKeys) {
            ids[key] = `key_${counter++}`;
        }
        // A: preserve key order {
        doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
        for (const key of normalized.allKeys) {
            if (key === "__proto__")
                continue;
            const id = ids[key];
            const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : _util_js__WEBPACK_IMPORTED_MODULE_2__/* .esc */ .UQ(key);
            const isPresent = `${k} in input`;
            const schema = shape[key];
            const optin = schema?._zod?.optin;
            const isOptionalIn = optin !== undefined;
            const isOptionalOut = schema?._zod?.optout === "optional";
            doc.write(`const ${id} = ${parseStr(k)};`);
            if (isOptionalIn && isOptionalOut) {
                // For optional-in/out schemas, ignore errors on absent keys — and, like the interpreted path, drop the value produced alongside them. The middle rung goes further: it permits absence without supplying anything in its place, so an absent key contributes nothing at all.
                const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
                doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
            }
            else if (!isOptionalIn) {
                doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
            }
            else {
                doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
                if (optin === "defaulted") {
                    doc.write(`newResult[${k}] = ${id}.value;`);
                }
                else {
                    doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
                }
            }
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        // closing `shape` in is what pays: turbofan specializes the parser against that one shape object, so every `shape[k]._zod.run` folds to a known callee. as a parameter it stays a generic load and measures 13% slower even with the forwarding frame gone
        return doc.compile();
    };
    let fastpass;
    const isObject = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .isObject */ .Gv;
    const jit = !_core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.jitless;
    const allowsEval = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .allowsEval */ .hI;
    const fastEnabled = jit && allowsEval.value; // && !def.catchall;
    const catchall = def.catchall;
    let value;
    inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
            payload.issues.push({
                expected: "object",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
            // always synchronous
            if (!fastpass)
                fastpass = generateFastpass(def.shape);
            payload = fastpass(payload, ctx);
            if (!catchall)
                return payload;
            return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
        }
        return superParse(payload, ctx);
    };
});
function handleUnionResults(results, final, inst, ctx) {
    for (const result of results) {
        if (result.issues.length === 0) {
            final.value = result.value;
            return final;
        }
    }
    const nonaborted = results.filter((r) => !_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(r));
    if (nonaborted.length === 1) {
        final.value = nonaborted[0].value;
        return nonaborted[0];
    }
    final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map((result) => result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W()))),
    });
    return final;
}
const $ZodUnion = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodUnion", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted")
        ? "defaulted"
        : zod.def.options.some((o) => o._zod.optin !== undefined)
            ? "optional"
            : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => {
        if (zod.def.options.every((o) => o._zod.values)) {
            return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
        }
        return undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "pattern", (zod) => {
        if (zod.def.options.every((o) => o._zod.pattern)) {
            const patterns = zod.def.options.map((o) => o._zod.pattern);
            return new RegExp(`^(${patterns.map((p) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .cleanRegex */ .p6(p.source)).join("|")})$`);
        }
        return undefined;
    });
    const first = def.options.length === 1 ? def.options[0]._zod.run : null;
    inst._zod.parse = (payload, ctx) => {
        if (first) {
            return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
            const result = option._zod.run({
                value: payload.value,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                results.push(result);
                async = true;
            }
            else {
                if (result.issues.length === 0)
                    return result;
                results.push(result);
            }
        }
        if (!async)
            return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results) => {
            return handleUnionResults(results, payload, inst, ctx);
        });
    };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
    const matches = [];
    for (let i = 0; i < results.length; i++) {
        if (results[i].issues.length === 0)
            matches.push(i);
    }
    if (matches.length === 1) {
        final.value = results[matches[0]].value;
        return final;
    }
    if (matches.length === 0) {
        // No matches - same as regular union
        final.issues.push({
            code: "invalid_union",
            input: final.value,
            inst,
            errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
        });
    }
    else {
        // Multiple matches - exclusive union failure
        final.issues.push({
            code: "invalid_union",
            input: final.value,
            inst,
            errors: [],
            inclusive: false,
            matches,
        });
    }
    return final;
}
const $ZodXor = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodXor", (inst, def) => {
    $ZodUnion.init(inst, def);
    def.inclusive = false;
    const first = def.options.length === 1 ? def.options[0]._zod.run : null;
    inst._zod.parse = (payload, ctx) => {
        if (first) {
            return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
            const result = option._zod.run({
                value: payload.value,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                results.push(result);
                async = true;
            }
            else {
                results.push(result);
            }
        }
        if (!async)
            return handleExclusiveUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results) => {
            return handleExclusiveUnionResults(results, payload, inst, ctx);
        });
    };
})));
/** Returns the option whose discriminator claims `value`, or throws if ambiguous. */
function getDiscriminatedOption(union, value) {
    const internals = union._zod;
    let map = internals.bag.optionsMap;
    if (!map) {
        map = discriminatorMap(internals.def);
        internals.bag.optionsMap = map;
    }
    const option = map.get(value);
    if (option === null)
        throw new Error(`Ambiguous discriminator value "${String(value)}"`);
    return option;
}
function discriminatorMap(def) {
    const map = new Map();
    for (const option of def.options) {
        const values = option._zod.propValues?.[def.discriminator];
        if (!values || values.size === 0)
            throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
        for (const value of values) {
            if (map.has(value)) {
                if (value !== undefined)
                    throw new Error(`Duplicate discriminator value "${String(value)}"`);
                // keep the collision marked so a later member cannot reclaim it
                map.set(value, null);
            }
            else {
                map.set(value, option);
            }
        }
    }
    return map;
}
const $ZodDiscriminatedUnion = 
/*@__PURE__*/
(/* unused pure expression or super */ null && (core.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
    def.inclusive = false;
    $ZodUnion.init(inst, def);
    const _super = inst._zod.parse;
    util.defineLazyInternal(inst, "propValues", (zod) => {
        const propValues = {};
        let undefinedCount = 0;
        for (const option of zod.def.options) {
            const pv = option._zod.propValues;
            if (!pv || Object.keys(pv).length === 0)
                throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
            if (pv[zod.def.discriminator]?.has(undefined))
                undefinedCount++;
            for (const [k, v] of Object.entries(pv)) {
                if (!Object.prototype.hasOwnProperty.call(propValues, k)) {
                    util.assignProp(propValues, k, new Set());
                }
                for (const val of v) {
                    propValues[k].add(val);
                }
            }
        }
        if (!zod.def.unionFallback && undefinedCount > 1)
            propValues[zod.def.discriminator]?.delete(undefined);
        return propValues;
    });
    // Checked now rather than in the lookup map below, so an option that lacks the discriminator fails at the `discriminatedUnion` call instead of on the first object parsed. Options whose shape cannot be enumerated without resolving it — pipes and lazies — are left to the map.
    def.options.forEach((option, i) => {
        const propShape = util.rawShape(option._zod.def);
        if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def.discriminator)) {
            throw new Error(`Invalid discriminated union option at index "${i}"`);
        }
    });
    const disc = util.cached(() => discriminatorMap(def));
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!util.isObject(input)) {
            payload.issues.push({
                code: "invalid_type",
                expected: "object",
                input,
                inst,
            });
            return payload;
        }
        const value = input?.[def.discriminator];
        const opt = disc.value.get(value);
        // forward metadata cannot choose an encoder for an absent tag
        if (opt && (value !== undefined || ctx.direction !== "backward")) {
            return opt._zod.run(payload, ctx);
        }
        // Fall back to union matching when the fast discriminator path fails:
        // - explicitly enabled via unionFallback, or
        // - during backward direction (encode), since codec-based discriminators have different values in forward vs backward directions
        if (def.unionFallback || ctx.direction === "backward") {
            return _super(payload, ctx);
        }
        // no matching discriminator
        payload.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: def.discriminator,
            options: Array.from(disc.value.keys()).filter((value) => disc.value.get(value) !== null),
            input,
            path: [def.discriminator],
            inst,
        });
        return payload;
    };
})));
const $ZodIntersection = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodIntersection", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
            return Promise.all([left, right]).then(([left, right]) => {
                return handleIntersectionResults(payload, left, right);
            });
        }
        return handleIntersectionResults(payload, left, right);
    };
});
function mergeValues(a, b) {
    // const aType = parse.t(a);
    // const bType = parse.t(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    if (a instanceof Date && b instanceof Date && +a === +b) {
        return { valid: true, data: a };
    }
    if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .isPlainObject */ .Qd(a) && _util_js__WEBPACK_IMPORTED_MODULE_2__/* .isPlainObject */ .Qd(b)) {
        const bKeys = Object.keys(b);
        const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        if (Object.prototype.hasOwnProperty.call(newObj, "__proto__"))
            delete newObj.__proto__;
        for (const key of sharedKeys) {
            if (key === "__proto__")
                continue;
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
                };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return { valid: false, mergeErrorPath: [] };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
                };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
    // Track which side(s) reject each key. A key rejection is reported only when BOTH sides reject it, so a key owned by one branch survives the other's key schema. strictObject reports these as unrecognized_keys; a record with an open key schema reports one invalid_key per key.
    const unrecKeys = new Map();
    let unrecIssue;
    const keyIssues = new Map();
    const collect = (iss, side) => {
        let keys;
        if (iss.code === "unrecognized_keys" && !iss.path?.length) {
            unrecIssue ?? (unrecIssue = iss);
            keys = iss.keys;
        }
        else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
            const k = String(iss.path[0]);
            if (!keyIssues.has(k))
                keyIssues.set(k, iss);
            keys = [k];
        }
        else {
            return false;
        }
        for (const k of keys) {
            if (!unrecKeys.has(k))
                unrecKeys.set(k, {});
            unrecKeys.get(k)[side] = true;
        }
        return true;
    };
    for (const iss of left.issues) {
        if (!collect(iss, "l"))
            result.issues.push(iss);
    }
    for (const iss of right.issues) {
        if (!collect(iss, "r"))
            result.issues.push(iss);
    }
    // Report only keys rejected by BOTH sides
    const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
    if (bothKeys.length) {
        const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
        if (aggregated.length)
            result.issues.push({ ...unrecIssue, keys: aggregated });
        for (const k of bothKeys) {
            if (!aggregated.includes(k) && keyIssues.has(k))
                result.issues.push(keyIssues.get(k));
        }
    }
    const merged = mergeValues(left.value, right.value);
    if (!merged.valid) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(result))
            return result;
        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
    }
    result.value = merged.data;
    return result;
}
const $ZodTuple = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodTuple", (inst, def) => {
    $ZodType.init(inst, def);
    const items = def.items;
    const memo = _core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                input,
                inst,
                expected: "tuple",
                code: "invalid_type",
            });
            return payload;
        }
        payload.value = memo ? memo.alloc(inst, payload, [], ctx) : [];
        const proms = [];
        const optinStart = getTupleOptStart(items, "optin");
        const optoutStart = getTupleOptStart(items, "optout");
        if (!def.rest) {
            if (input.length < optinStart) {
                payload.issues.push({
                    code: "too_small",
                    minimum: optinStart,
                    inclusive: true,
                    input,
                    inst,
                    origin: "array",
                });
                return payload;
            }
            if (input.length > items.length) {
                payload.issues.push({
                    code: "too_big",
                    maximum: items.length,
                    inclusive: true,
                    input,
                    inst,
                    origin: "array",
                });
            }
        }
        // Run every item in parallel, collecting results into an indexed array. The post-processing in `handleTupleResults` walks them in order so it can decide whether an absent optional-output error can truncate the tail or must be reported to preserve required output.
        const itemResults = new Array(items.length);
        // only tracked when there is a rest loop to skip
        const abortEarly = def.rest ? ctx?.abortEarly : undefined;
        let itemAborted = false;
        for (let i = 0; i < items.length; i++) {
            const r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
            if (r instanceof Promise) {
                proms.push(r.then((rr) => {
                    itemResults[i] = rr;
                }));
            }
            else {
                itemResults[i] = r;
                if (abortEarly && !itemAborted && r.issues.length)
                    itemAborted = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(r);
            }
        }
        // sound because rest is non-empty exactly when every fixed index is present, the one case handleTupleResults cannot discard an item's issues
        if (def.rest && !itemAborted) {
            let i = items.length - 1;
            const rest = input.slice(items.length);
            let seen = payload.issues.length;
            for (const el of rest) {
                if (abortEarly && payload.issues.length !== seen) {
                    if (_util_js__WEBPACK_IMPORTED_MODULE_2__/* .aborted */ .QH(payload, seen))
                        break;
                    seen = payload.issues.length;
                }
                i++;
                const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((r) => handleTupleResult(r, payload, i)));
                }
                else {
                    handleTupleResult(result, payload, i);
                }
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
        }
        return handleTupleResults(itemResults, payload, items, input, optoutStart);
    };
});
function getTupleOptStart(items, key) {
    for (let i = items.length - 1; i >= 0; i--) {
        // optin is a three-rung ladder so any rung above `undefined` permits an absent slot; optout stays two-valued.
        const omittable = key === "optin" ? items[i]._zod.optin !== undefined : items[i]._zod.optout === "optional";
        if (!omittable)
            return i + 1;
    }
    return 0;
}
function handleTupleResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__/* .prefixIssues */ .lQ(index, result.issues));
    }
    final.value[index] = result.value;
}
function handleTupleResults(itemResults, final, items, input, optoutStart) {
    // Walk results in order. Mirror $ZodObject's swallow-on-absent-optional rule, but only after `optoutStart`: the first index where the output tuple tail can be absent.
    for (let i = 0; i < items.length; i++) {
        const r = itemResults[i];
        const isPresent = i < input.length;
        // The array analog of `handlePropertyResult`'s absent-key early return: the middle rung permits absence without supplying anything in its place, so the tail truncates here instead of materializing whatever the item made of `undefined`.
        if (!isPresent && i >= optoutStart && items[i]._zod.optin === "optional") {
            final.value.length = i;
            break;
        }
        if (r.issues.length) {
            if (!isPresent && i >= optoutStart) {
                final.value.length = i;
                break;
            }
            final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__/* .prefixIssues */ .lQ(i, r.issues));
        }
        final.value[i] = r.value;
    }
    // Drop trailing slots that produced `undefined` for absent input
    // (the array analog of an absent optional key on an object). The
    // `i >= input.length` floor is critical: an explicit `undefined`
    // *inside* the input must be preserved even when the schema is
    // optional-out (e.g. `z.string().or(z.undefined())` accepting an
    // explicit undefined value).
    for (let i = final.value.length - 1; i >= input.length; i--) {
        if (items[i]._zod.optout === "optional" && final.value[i] === undefined) {
            final.value.length = i;
        }
        else {
            break;
        }
    }
    return final;
}
const $ZodRecord = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodRecord", (inst, def) => {
    $ZodType.init(inst, def);
    const memo = core.globalConfig.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!util.isPlainObject(input)) {
            payload.issues.push({
                expected: "record",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        // no guard in either loop below: a record's invalid_key aborts but an enclosing intersection can reconcile it, so a stopped loop hides keys the sibling does not own and the intersection then rejects nothing
        const proms = [];
        const values = def.keyType._zod.values;
        if (values && !def.partial) {
            payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
            const recordKeys = new Set();
            for (const key of values) {
                if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
                    recordKeys.add(typeof key === "number" ? key.toString() : key);
                    // A declared __proto__ is stripped but is not an unrecognized key.
                    if (key === "__proto__")
                        continue;
                    const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                    if (keyResult instanceof Promise) {
                        throw new Error("Async schemas not supported in object keys currently");
                    }
                    if (keyResult.issues.length) {
                        payload.issues.push({
                            code: "invalid_key",
                            origin: "record",
                            issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
                            input: key,
                            path: [key],
                            inst,
                        });
                        continue;
                    }
                    const outKey = keyResult.value;
                    if (outKey === "__proto__")
                        continue;
                    const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                    if (result instanceof Promise) {
                        proms.push(result.then((result) => {
                            if (result.issues.length) {
                                payload.issues.push(...util.prefixIssues(key, result.issues));
                            }
                            payload.value[outKey] = result.value;
                        }));
                    }
                    else {
                        if (result.issues.length) {
                            payload.issues.push(...util.prefixIssues(key, result.issues));
                        }
                        payload.value[outKey] = result.value;
                    }
                }
            }
            let unrecognized;
            for (const key in input) {
                if (!recordKeys.has(key)) {
                    if (def.mode === "loose") {
                        // skip __proto__ so it can't replace the result prototype via the assignment setter on the plain {} we build into
                        if (key === "__proto__")
                            continue;
                        payload.value[key] = input[key];
                    }
                    else {
                        unrecognized = unrecognized ?? [];
                        unrecognized.push(key);
                    }
                }
            }
            if (unrecognized && unrecognized.length > 0) {
                payload.issues.push({
                    code: "unrecognized_keys",
                    input,
                    inst,
                    keys: unrecognized,
                    continue: true,
                });
            }
        }
        else {
            payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
            // An enumerable key schema declares which keys the record owns, so a key outside the set is unrecognized. A non-enumerable one (regex, refine) is a constraint every key must satisfy, so a failing key is invalid. Only the former is reconcilable against the other side of an intersection.
            let unrecognized;
            // Reflect.ownKeys for Symbol-key support; filter non-enumerable to match z.object()
            for (const key of Reflect.ownKeys(input)) {
                if (key === "__proto__")
                    continue;
                if (!Object.prototype.propertyIsEnumerable.call(input, key))
                    continue;
                let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                if (keyResult instanceof Promise) {
                    throw new Error("Async schemas not supported in object keys currently");
                }
                // Numeric string fallback: if key is a numeric string and failed, retry with Number(key). This handles z.number(), z.literal([1, 2, 3]), and unions containing numeric literals
                const checkNumericKey = typeof key === "string" && regexes.number.test(key) && keyResult.issues.length;
                if (checkNumericKey) {
                    const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
                    if (retryResult instanceof Promise) {
                        throw new Error("Async schemas not supported in object keys currently");
                    }
                    if (retryResult.issues.length === 0) {
                        keyResult = retryResult;
                    }
                }
                if (keyResult.issues.length) {
                    if (def.mode === "loose") {
                        // Pass through unchanged
                        payload.value[key] = input[key];
                    }
                    else if (values) {
                        unrecognized = unrecognized ?? [];
                        unrecognized.push(key);
                    }
                    else {
                        // Default "strict" behavior: error on invalid key
                        payload.issues.push({
                            code: "invalid_key",
                            origin: "record",
                            issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
                            input: key,
                            path: [key],
                            inst,
                        });
                    }
                    continue;
                }
                // the guard above tests the raw input key, but the key schema can normalize an ordinary key into __proto__; re-check the key we actually write under
                const outKey = keyResult.value;
                if (outKey === "__proto__")
                    continue;
                const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((result) => {
                        if (result.issues.length) {
                            payload.issues.push(...util.prefixIssues(key, result.issues));
                        }
                        payload.value[outKey] = result.value;
                    }));
                }
                else {
                    if (result.issues.length) {
                        payload.issues.push(...util.prefixIssues(key, result.issues));
                    }
                    payload.value[outKey] = result.value;
                }
            }
            if (unrecognized && unrecognized.length > 0) {
                payload.issues.push({
                    code: "unrecognized_keys",
                    input,
                    inst,
                    keys: unrecognized,
                    continue: true,
                });
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload;
    };
})));
const $ZodMap = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodMap", (inst, def) => {
    $ZodType.init(inst, def);
    const memo = core.globalConfig.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Map)) {
            payload.issues.push({
                expected: "map",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        payload.value = memo ? memo.alloc(inst, payload, new Map(), ctx) : new Map();
        const abortEarly = ctx?.abortEarly;
        let seen = payload.issues.length;
        for (const [key, value] of input) {
            if (abortEarly && payload.issues.length !== seen) {
                if (util.aborted(payload, seen))
                    break;
                seen = payload.issues.length;
            }
            const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
            const valueResult = def.valueType._zod.run({ value: value, issues: [] }, ctx);
            if (keyResult instanceof Promise || valueResult instanceof Promise) {
                proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
                    handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
                }));
            }
            else {
                handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
            }
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
    capSize(inst, mapSize);
})));
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
    if (keyResult.issues.length) {
        if (util.propertyKeyTypes.has(typeof key)) {
            final.issues.push(...util.prefixIssues(key, keyResult.issues));
        }
        else {
            final.issues.push({
                code: "invalid_key",
                origin: "map",
                input,
                inst,
                issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
            });
        }
    }
    if (valueResult.issues.length) {
        if (util.propertyKeyTypes.has(typeof key)) {
            final.issues.push(...util.prefixIssues(key, valueResult.issues));
        }
        else {
            final.issues.push({
                origin: "map",
                code: "invalid_element",
                input,
                inst,
                key: key,
                issues: valueResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
            });
        }
    }
    final.value.set(keyResult.value, valueResult.value);
}
const $ZodSet = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodSet", (inst, def) => {
    $ZodType.init(inst, def);
    const memo = core.globalConfig.memoizer;
    memo?.attach(inst);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Set)) {
            payload.issues.push({
                input,
                inst,
                expected: "set",
                code: "invalid_type",
            });
            return payload;
        }
        const proms = [];
        payload.value = memo ? memo.alloc(inst, payload, new Set(), ctx) : new Set();
        const abortEarly = ctx?.abortEarly;
        let seen = payload.issues.length;
        for (const item of input) {
            if (abortEarly && payload.issues.length !== seen) {
                if (util.aborted(payload, seen))
                    break;
                seen = payload.issues.length;
            }
            const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleSetResult(result, payload)));
            }
            else
                handleSetResult(result, payload);
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
    capSize(inst, setSize);
})));
function handleSetResult(result, final) {
    if (result.issues.length) {
        final.issues.push(...result.issues);
    }
    final.value.add(result.value);
}
const $ZodEnum = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodEnum", (inst, def) => {
    $ZodType.init(inst, def);
    const values = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .getEnumValues */ .w5(def.entries);
    const valuesSet = new Set(values);
    inst._zod.values = valuesSet;
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "pattern", (zod) => {
        const patternValues = _util_js__WEBPACK_IMPORTED_MODULE_2__/* .getEnumValues */ .w5(zod.def.entries).filter((k) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .propertyKeyTypes */ .qQ.has(typeof k));
        // unmatchable fallback, RE2-safe: an empty alternation would compile to /^()$/, which matches ""
        return new RegExp(patternValues.length ? `^(${patternValues.map((o) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .escapeRegex */ .sD(o.toString())).join("|")})$` : "^[^\\s\\S]$");
    });
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodLiteral = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    const values = new Set(def.values);
    inst._zod.values = values;
    util.defineLazyInternal(inst, "pattern", (zod) => {
        const vals = zod.def.values;
        // unmatchable fallback, RE2-safe: an empty alternation would compile to /^()$/, which matches ""
        return new RegExp(vals.length
            ? `^(${vals
                .map((o) => typeof o === "string" ? util.escapeRegex(o) : o ? util.escapeRegex(o.toString()) : String(o))
                .join("|")})$`
            : "^[^\\s\\S]$");
    });
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (values.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values: def.values,
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodFile = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodFile", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        // @ts-ignore
        if (input instanceof File)
            return payload;
        payload.issues.push({
            expected: "file",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
})));
const $ZodTransform = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodTransform", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    _core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer?.guard(inst);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodEncodeError */ .cV(inst.constructor.name);
        }
        const _out = def.transform(payload.value, payload);
        if (ctx.async) {
            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        if (_out instanceof Promise) {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
        }
        payload.value = _out;
        return payload;
    };
});
function handleOptionalResult(payload, result) {
    // A substituting schema that still failed has no usable answer; yield undefined. Its issues are simply dropped: it ran on a payload of its own, so there is no shared array to truncate and nothing of the caller's to lose with it.
    payload.value = result.issues.length ? undefined : result.value;
    return payload;
}
const $ZodOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodOptional", (inst, def) => {
    $ZodType.init(inst, def);
    // .optional() propagates absence rather than substituting for it, so a defaulted inner keeps its rung.
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
    inst._zod.optout = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => {
        const values = zod.def.innerType._zod.values;
        return values ? new Set([...values, undefined]) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "pattern", (zod) => {
        const pattern = zod.def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_2__/* .cleanRegex */ .p6(pattern.source)})?$`) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        if (payload.value === undefined) {
            // Only the top rung substitutes a value for absence; everything else leaves it intact, which is what .optional() means.
            if (def.innerType._zod.optin !== "defaulted")
                return payload;
            // Its own payload, for the same reason $ZodCatch gets one: a pipe forwards an unrecognized key through the caller's issues array, and this must not read that as the substituting schema failing and drop it.
            const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
            if (result instanceof Promise)
                return result.then((result) => handleOptionalResult(payload, result));
            return handleOptionalResult(payload, result);
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodExactOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodExactOptional", (inst, def) => {
    // Call parent init - inherits optin/optout = "optional"
    $ZodOptional.init(inst, def);
    // Override values/pattern to NOT add undefined
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.innerType._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
    // Override parse to just delegate (no undefined handling)
    inst._zod.parse = (payload, ctx) => {
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNullable = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNullable", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optout", (zod) => zod.def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "pattern", (zod) => {
        const pattern = zod.def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_2__/* .cleanRegex */ .p6(pattern.source)}|null)$`) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => {
        return zod.def.innerType._zod.values ? new Set([...zod.def.innerType._zod.values, null]) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        // Forward direction (decode): allow null to pass through
        if (payload.value === null)
            return payload;
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodDefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodDefault", (inst, def) => {
    $ZodType.init(inst, def);
    // inst._zod.qin = "true";
    inst._zod.optin = "defaulted";
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply defaults for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
            /**
             * $ZodDefault returns the default value immediately in forward direction.
             * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
            return payload;
        }
        // Forward direction: continue with default handling
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleDefaultResult(result, def));
        }
        return handleDefaultResult(result, def);
    };
});
function handleDefaultResult(payload, def) {
    if (payload.value === undefined) {
        payload.value = def.defaultValue;
    }
    return payload;
}
const $ZodPrefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodPrefault", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "defaulted";
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply prefault for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNonOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodNonOptional", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => {
        const v = zod.def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleNonOptionalResult(result, inst));
        }
        return handleNonOptionalResult(result, inst);
    };
});
function handleNonOptionalResult(payload, inst) {
    if (!payload.issues.length && payload.value === undefined) {
        payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: payload.value,
            inst,
        });
    }
    return payload;
}
const $ZodSuccess = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodSuccess", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            throw new core.$ZodEncodeError("ZodSuccess");
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.issues.length === 0;
                return payload;
            });
        }
        payload.value = result.issues.length === 0;
        return payload;
    };
})));
function handleCatchResult(payload, result, def, ctx) {
    if (!result.issues.length) {
        payload.value = result.value;
        // The value carries up, so the flag describing it has to carry with it: a back-edge into a node still being parsed must not be frozen by an enclosing readonly, and its checks belong to the node itself. Guarded so the ordinary case adds no own property.
        if (result.memo)
            payload.memo = true;
        return payload;
    }
    // Spread the inner's own payload, not ours: `value` has to stay the input the catch was handed, and the inner ran on a payload of its own so its issues are already private to this call.
    payload.value = def.catchValue({
        ...result,
        value: payload.value,
        error: {
            issues: result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W())),
        },
        input: payload.value,
    });
    return payload;
}
const $ZodCatch = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCatch", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optout", (zod) => zod.def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply catch logic
        const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleCatchResult(payload, result, def, ctx));
        }
        return handleCatchResult(payload, result, def, ctx);
    };
});
const $ZodNaN = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodNaN", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "nan",
                code: "invalid_type",
            });
            return payload;
        }
        return payload;
    };
})));
const $ZodPipe = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodPipe", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.in._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.in._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optout", (zod) => zod.def.out._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "propValues", (zod) => zod.def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
                return right.then((right) => handlePipeResult(right, def.in, ctx));
            }
            return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
            return left.then((left) => handlePipeResult(left, def.out, ctx));
        }
        return handlePipeResult(left, def.out, ctx);
    };
});
function handlePipeResult(left, next, ctx) {
    // Any issue stops the pipe, so a failing refinement never feeds its transform. An unrecognized key is the exception: it describes the input's extra properties, not the value being piped, and an enclosing intersection may yet reconcile it.
    if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
        // prevent further checks
        left.aborted = true;
        return left;
    }
    return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodCodec = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCodec", (inst, def) => {
    $ZodType.init(inst, def);
    util.defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
    util.defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
    util.defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
    util.defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        const direction = ctx.direction || "forward";
        if (direction === "forward") {
            const left = def.in._zod.run(payload, ctx);
            if (left instanceof Promise) {
                return left.then((left) => handleCodecAResult(left, def, ctx));
            }
            return handleCodecAResult(left, def, ctx);
        }
        else {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
                return right.then((right) => handleCodecAResult(right, def, ctx));
            }
            return handleCodecAResult(right, def, ctx);
        }
    };
})));
function handleCodecAResult(result, def, ctx) {
    if (result.issues.length) {
        // prevent further checks
        result.aborted = true;
        return result;
    }
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
        const transformed = def.transform(result.value, result);
        if (transformed instanceof Promise) {
            return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
        }
        return handleCodecTxResult(result, transformed, def.out, ctx);
    }
    else {
        const transformed = def.reverseTransform(result.value, result);
        if (transformed instanceof Promise) {
            return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
        }
        return handleCodecTxResult(result, transformed, def.in, ctx);
    }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
    // Check if transform added any issues
    if (left.issues.length) {
        left.aborted = true;
        return left;
    }
    return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
const $ZodPreprocess = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodPreprocess", (inst, def) => {
    $ZodPipe.init(inst, def);
})));
const $ZodReadonly = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodReadonly", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "values", (zod) => zod.def.innerType._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_2__/* .defineLazyInternal */ .v5(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
    };
});
function handleReadonlyResult(payload) {
    // A repeat visit hands back a node that is still being built; freezing it here would make the rest of its keys fail to assign.
    if (!payload.memo)
        payload.value = Object.freeze(payload.value);
    return payload;
}
// a leaf's pattern source with its own checks folded in: the last pattern-carrying check wins, else length bounds narrow the catch-all, else an integer format narrows the number form. the fold lives here instead of on `_zod.pattern` so a bundle without template literals never pays for it
function leafPattern(schema) {
    const def = schema._zod.def;
    let pattern = def.pattern;
    let isInt = !!def.format?.includes("int");
    let minimum;
    let maximum;
    for (const ch of def.checks ?? []) {
        const d = ch._zod.def;
        if (d.pattern)
            pattern = d.pattern;
        isInt || (isInt = !!d.format?.includes("int"));
        const lo = d.minimum ?? d.length;
        const hi = d.maximum ?? d.length;
        if (lo !== undefined && (minimum === undefined || lo > minimum))
            minimum = lo;
        if (hi !== undefined && (maximum === undefined || hi < maximum))
            maximum = hi;
    }
    if (pattern)
        return pattern.source;
    // an empty range matches nothing at runtime, and `{8,5}` is not a legal quantifier
    if (minimum !== undefined && maximum !== undefined && minimum > maximum)
        return "(?!)";
    if (minimum !== undefined || maximum !== undefined)
        return regexes.string({ minimum, maximum }).source;
    const own = schema._zod.pattern;
    return (isInt && own === regexes.number ? regexes.integer : own)?.source;
}
// a part's pattern source. a wrapper's pattern embeds its inner pattern's source verbatim, so the folded form is substituted in place without knowing the wrapper's own composition; a union's options are joined the way the union builds its own pattern
function partPattern(schema) {
    const def = schema._zod.def;
    const own = schema._zod.pattern?.source;
    // lazy resolves its inner on the internals, not the def
    const inner = def.innerType ?? schema._zod.innerType;
    if (inner) {
        const before = inner._zod.pattern?.source;
        const after = partPattern(inner);
        if (own && before && after && after !== before) {
            return own.replace(util.cleanRegex(before), () => util.cleanRegex(after));
        }
        return own;
    }
    if (def.options) {
        const sources = def.options.map(partPattern);
        if (sources.every(Boolean))
            return `^(${sources.map((s) => util.cleanRegex(s)).join("|")})$`;
    }
    return leafPattern(schema);
}
const $ZodTemplateLiteral = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodTemplateLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    const regexParts = [];
    for (const part of def.parts) {
        if (typeof part === "object" && part !== null) {
            // is Zod schema
            const source = partPattern(part);
            if (!source) {
                throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
            }
            regexParts.push(util.cleanRegex(source));
        }
        else if (part === null || util.primitiveTypes.has(typeof part)) {
            regexParts.push(util.escapeRegex(`${part}`));
        }
        else {
            throw new Error(`Invalid template literal part: ${part}`);
        }
    }
    inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "string") {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "string",
                code: "invalid_type",
            });
            return payload;
        }
        inst._zod.pattern.lastIndex = 0;
        if (!inst._zod.pattern.test(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                code: "invalid_format",
                format: def.format ?? "template_literal",
                pattern: inst._zod.pattern.source,
            });
            return payload;
        }
        return payload;
    };
})));
const $ZodFunction = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodFunction", (inst, def) => {
    $ZodType.init(inst, def);
    // Defined, not assigned: the classic prototype exposes `_def` as a getter with no setter.
    Object.defineProperty(inst, "_def", { value: def });
    inst._zod.def = def;
    inst.implement = (func) => {
        if (typeof func !== "function") {
            throw new Error("implement() must be called with a function");
        }
        // Defined inline so the closure stays anonymous: binding it to a `const` first names it, which costs 256 bytes per implemented function.
        return Object.defineProperty(function (...args) {
            const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
            const result = Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
                return parse(inst._def.output, result);
            }
            return result;
        }, "_zod", { value: inst._zod, enumerable: false });
    };
    inst.implementAsync = (func) => {
        if (typeof func !== "function") {
            throw new Error("implementAsync() must be called with a function");
        }
        return Object.defineProperty(async function (...args) {
            const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
            const result = await Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
                return await parseAsync(inst._def.output, result);
            }
            return result;
        }, "_zod", { value: inst._zod, enumerable: false });
    };
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "function") {
            payload.issues.push({
                code: "invalid_type",
                expected: "function",
                input: payload.value,
                inst,
            });
            return payload;
        }
        // Check if output is a promise type to determine if we should use async implementation
        const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
        if (hasPromiseOutput) {
            payload.value = inst.implementAsync(payload.value);
        }
        else {
            payload.value = inst.implement(payload.value);
        }
        return payload;
    };
    inst.input = (...args) => {
        const F = inst.constructor;
        if (Array.isArray(args[0])) {
            return new F({
                type: "function",
                input: new $ZodTuple({
                    type: "tuple",
                    items: args[0],
                    rest: args[1],
                }),
                output: inst._def.output,
            });
        }
        return new F({
            type: "function",
            input: args[0],
            output: inst._def.output,
        });
    };
    inst.output = (output) => {
        const F = inst.constructor;
        return new F({
            type: "function",
            input: inst._def.input,
            output,
        });
    };
    return inst;
})));
const $ZodPromise = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodPromise", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
    };
})));
const $ZodLazy = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodLazy", (inst, def) => {
    $ZodType.init(inst, def);
    // Cache the resolved inner type on the shared `def` so all clones of this lazy (e.g. via `.describe()`/`.meta()`) share the same inner instance, preserving identity for cycle detection on recursive schemas.
    util.defineLazy(inst._zod, "innerType", () => {
        const d = def;
        if (!d._cachedInner)
            d._cachedInner = def.getter();
        return d._cachedInner;
    });
    util.defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern);
    util.defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues);
    util.defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? undefined);
    util.defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? undefined);
    inst._zod.parse = (payload, ctx) => {
        const inner = inst._zod.innerType;
        return inner._zod.run(payload, ctx);
    };
})));
const $ZodCustom = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCustom", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_4__/* .$ZodCheck */ .QP.init(inst, def);
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _) => {
        return payload;
    };
    inst._zod.check = (payload) => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
            return r.then((r) => handleRefineResult(r, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
    };
});
function handleRefineResult(result, payload, input, inst) {
    if (!result) {
        const _iss = {
            code: "custom",
            input,
            inst, // incorporates params.error into issue reporting
            path: [...(inst._zod.def.path ?? [])], // incorporates params.error into issue reporting
            continue: !inst._zod.def.abort,
            // params: inst._zod.def.params,
        };
        if (inst._zod.def.params)
            _iss.params = inst._zod.def.params;
        payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_2__/* .issue */ .sn(_iss));
    }
}


/***/ }),

/***/ 38918:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lp: () => (/* binding */ processSchema),
/* harmony export */   OA: () => (/* binding */ createToJSONSchemaMethod),
/* harmony export */   _S: () => (/* binding */ handleUnrepresentable),
/* harmony export */   uE: () => (/* binding */ createStandardJSONSchemaMethod)
/* harmony export */ });
/* unused harmony exports initializeContext, process, extractDefs, finalize */
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31711);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);


function assignProps(target, ...sources) {
    for (const source of sources) {
        for (const key of Reflect.ownKeys(source)) {
            if (Object.prototype.propertyIsEnumerable.call(source, key)) {
                (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .assignProp */ .Vy)(target, key, source[key]);
            }
        }
    }
    return target;
}
// function initializeContext<T extends schemas.$ZodType>(inputs: JSONSchemaGeneratorParams<T>): ToJSONSchemaContext<T> {
//   return {
//     processor: inputs.processor,
//     metadataRegistry: inputs.metadata ?? globalRegistry,
//     target: inputs.target ?? "draft-2020-12",
//     unrepresentable: inputs.unrepresentable ?? "throw",
//   };
// }
function initializeContext(params) {
    // Normalize target: convert old non-hyphenated versions to hyphenated versions
    let target = params?.target ?? "draft-2020-12";
    if (target === "draft-4")
        target = "draft-04";
    if (target === "draft-7")
        target = "draft-07";
    return {
        processors: params.processors ?? {},
        metadataRegistry: params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_1__/* .globalRegistry */ .fd,
        target,
        unrepresentable: params?.unrepresentable ?? "throw",
        override: params?.override ?? (() => { }),
        io: params?.io ?? "output",
        counter: 0,
        seen: new Map(),
        sharedDefsExtractedFor: undefined,
        sharedEmitDoneFor: undefined,
        cycles: params?.cycles ?? "ref",
        reused: params?.reused ?? "inline",
        intersections: [],
        deferred: [],
        external: params?.external ?? undefined,
    };
}
/**
 * Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
 * `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
 * custom JSON Schema was written into `json`, in which case the caller must not write its own.
 */
function handleUnrepresentable(schema, ctx, json, params, message) {
    const result = typeof ctx.unrepresentable === "function"
        ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message })
        : ctx.unrepresentable;
    if (result === "any")
        return false;
    if (result === undefined || result === "throw")
        throw new Error(message);
    Object.assign(json, result);
    return true;
}
// never rename this back to `process`: bundler polyfills inject a top-level `const process` that a lexical declaration of the same name collides with (#6397)
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
    var _a;
    const def = schema._zod.def;
    // check for schema in seens
    const seen = ctx.seen.get(schema);
    if (seen) {
        seen.count++;
        // check if cycle
        const isCycle = _params.schemaPath.includes(schema);
        if (isCycle) {
            seen.cycle = _params.path;
        }
        return seen.schema;
    }
    // initialize
    const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
    ctx.seen.set(schema, result);
    ctx.sharedDefsExtractedFor = undefined;
    ctx.sharedEmitDoneFor = undefined;
    // custom method overrides default behavior
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
        result.schema = overrideSchema;
    }
    else {
        const params = {
            ..._params,
            schemaPath: [..._params.schemaPath, schema],
            path: _params.path,
        };
        if (schema._zod.processJSONSchema) {
            schema._zod.processJSONSchema(ctx, result.schema, params);
        }
        else {
            const _json = result.schema;
            const processor = ctx.processors[def.type];
            if (!processor) {
                throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
            }
            processor(schema, ctx, _json, params);
        }
        const parent = schema._zod.parent;
        if (parent) {
            // Also set ref if processor didn't (for inheritance)
            if (!result.ref)
                result.ref = parent;
            processSchema(parent, ctx, params);
            ctx.seen.get(parent).isParent = true;
        }
    }
    // metadata
    const meta = ctx.metadataRegistry.get(schema);
    if (meta)
        assignProps(result.schema, meta);
    if (ctx.io === "input" && isTransforming(schema)) {
        // examples/defaults only apply to output type of pipe
        delete result.schema.examples;
        delete result.schema.default;
    }
    // set prefault as default
    if (ctx.io === "input" && "_prefault" in result.schema)
        (_a = result.schema).default ?? (_a.default = result.schema._prefault);
    delete result.schema._prefault;
    // pulling fresh from ctx.seen in case it was overwritten
    const _result = ctx.seen.get(schema);
    return _result.schema;
}
/** @deprecated Renamed to `processSchema`. An export alias declares no binding, so it is safe to keep. */

// Escape a reference token for use in a JSON Pointer fragment (RFC 6901): `~` becomes `~0` and `/` becomes `~1`. The `~` replacement must run first.
function encodeJSONPointerSegment(segment) {
    return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema
// params: EmitParams
) {
    // iterate over seen map;
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // With `external` set, every registered schema resolves through the external branch of `makeURI`, so the root branch below produces the same ref the external branch would — this pass is identical whichever schema it is called with, and only needs to run once.
    if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
        return;
    // Track ids to detect duplicates across different schemas
    const idToSchema = new Map();
    for (const entry of ctx.seen.entries()) {
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            const existing = idToSchema.get(id);
            if (existing && existing !== entry[0]) {
                throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
            }
            idToSchema.set(id, entry[0]);
        }
    }
    // returns a ref to the schema defId will be empty if the ref points to an external schema (or #)
    const makeURI = (entry) => {
        // comparing the seen objects because sometimes multiple schemas map to the same seen object. e.g. lazy
        // external is configured
        const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
        if (ctx.external) {
            const externalId = ctx.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${ctx.counter++}`;
            // check if schema is in the external registry
            const uriGenerator = ctx.external.uri ?? ((id) => id);
            if (externalId) {
                return { ref: uriGenerator(externalId) };
            }
            // otherwise, add to __shared
            const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
            entry[1].defId = id; // set defId so it will be reused if needed
            return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
        }
        const uriPrefix = `#`;
        const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
        // an id-less root has nowhere to be extracted to, so it stays inline and self-references as `#`
        if (entry[1] === root && !entry[1].schema.id) {
            return { ref: uriPrefix };
        }
        // self-contained schema
        const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
        return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
    };
    // stored cached version in `def` property remove all properties, set $ref
    const extractToDef = (entry) => {
        // if the schema is already a reference, do not extract it
        if (entry[1].schema.$ref) {
            return;
        }
        const seen = entry[1];
        const { ref, defId } = makeURI(entry);
        seen.def = { ...seen.schema };
        // defId won't be set if the schema is a reference to an external schema or if the schema is the root schema
        if (defId)
            seen.defId = defId;
        // wipe away all properties except $ref
        const schema = seen.schema;
        for (const key in schema) {
            delete schema[key];
        }
        schema.$ref = ref;
    };
    // throw on cycles
    // break cycles
    if (ctx.cycles === "throw") {
        for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.cycle) {
                throw new Error("Cycle detected: " +
                    `#/${seen.cycle?.join("/")}/<root>` +
                    '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
            }
        }
    }
    // extract schemas into $defs
    for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        // convert root schema to # $ref
        if (schema === entry[0]) {
            extractToDef(entry); // this has special handling for the root schema
            continue;
        }
        // extract schemas that are in the external registry
        if (ctx.external) {
            const ext = ctx.external.registry.get(entry[0])?.id;
            if (schema !== entry[0] && ext) {
                extractToDef(entry);
                continue;
            }
        }
        // extract schemas with `id` meta
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            extractToDef(entry);
            continue;
        }
        // break cycles
        if (seen.cycle) {
            // any
            extractToDef(entry);
            continue;
        }
        // extract reused schemas
        if (seen.count > 1) {
            if (ctx.reused === "ref") {
                extractToDef(entry);
            }
        }
    }
    if (ctx.external)
        ctx.sharedDefsExtractedFor = ctx.external;
}
/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
function compactTypeUnion(schema) {
    const options = schema.anyOf;
    if (!Array.isArray(options) || options.length === 0 || schema.type !== undefined)
        return;
    const types = [];
    for (const option of options) {
        if (!option || typeof option !== "object")
            return;
        // A branch that is itself a compactible union folds into this one — nested `anyOf` and a flat `type` array say the same thing. Compacting it first also makes the result independent of the order this pass walks the seen map in.
        compactTypeUnion(option);
        const keys = Object.keys(option);
        if (keys.length !== 1 || keys[0] !== "type")
            return;
        const type = option.type;
        for (const member of Array.isArray(type) ? type : [type]) {
            if (typeof member !== "string")
                return;
            if (!types.includes(member))
                types.push(member);
        }
    }
    delete schema.anyOf;
    // A `type` array must be non-empty and unique (metaschema); a single member is spelled as a bare string.
    schema.type = types.length === 1 ? types[0] : types;
}
/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
 * an annotation like `description` — makes a member unfoldable, so a constraint this does not
 * understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
const FOLDABLE_KEYS = new Set(["type", "properties", "required", "additionalProperties"]);
const UNION_KEYS = ["oneOf", "anyOf"];
/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
function undeclaredConstraint(member) {
    const extra = member.additionalProperties;
    if (extra === undefined || extra === false || typeof extra !== "object" || extra === null)
        return null;
    return Object.keys(extra).length ? extra : null;
}
/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
function foldObjects(members) {
    const objects = [];
    for (const member of members) {
        // A boolean subschema is legal JSON Schema and carries no keywords to fold.
        if (typeof member !== "object" || member.type !== "object")
            return null;
        for (const key in member) {
            if (!FOLDABLE_KEYS.has(key))
                return null;
        }
        objects.push(member);
    }
    const properties = {};
    const required = new Set();
    for (const object of objects) {
        for (const key in object.properties) {
            // `in` would report a `__proto__` key as already present via the prototype chain and skip it.
            if (Object.prototype.hasOwnProperty.call(properties, key))
                continue;
            // Every member constrains this key: the ones that declare it say how, and a `catchall` member constrains it too even though it does not name it. The key has to satisfy all of them, which is the same intersection one level down.
            const parts = [];
            for (const other of objects) {
                const part = other.properties?.[key] ?? undeclaredConstraint(other);
                if (part === null || part === undefined)
                    continue;
                if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)))
                    parts.push(part);
            }
            const merged = parts.length === 1
                ? parts[0]
                : (foldObjects(parts) ?? { allOf: parts });
            (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .assignProp */ .Vy)(properties, key, merged);
        }
        for (const key of object.required ?? [])
            required.add(key);
    }
    const folded = { type: "object", properties };
    if (required.size)
        folded.required = [...required];
    // A key no member declares is rejected only when every member rejects it, so the fold is closed only when every member is. Otherwise it carries whatever the `catchall` members demand of such a key.
    if (objects.every((object) => object.additionalProperties === false)) {
        folded.additionalProperties = false;
    }
    else {
        const constraints = [];
        for (const object of objects) {
            const constraint = undeclaredConstraint(object);
            if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)))
                constraints.push(constraint);
        }
        if (constraints.length === 1)
            folded.additionalProperties = constraints[0];
        else if (constraints.length > 1)
            folded.additionalProperties = { allOf: constraints };
    }
    return folded;
}
/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
 * closed object members reject each other's keys and the schema validates nothing. Zod's parser
 * pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
 * *every* side rejects it — so the emitted schema has to pool them too, and folding the members
 * into one object is the encoding that says so on every target.
 *
 * This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
 * machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
 * keeps its reference and its own closedness rather than being inlined as a stale copy. */
function foldIntersection(json) {
    const allOf = json.allOf;
    if (!Array.isArray(allOf) || allOf.length < 2)
        return;
    // An `override` runs before this pass and may have written object keywords onto the intersection itself. Those are deliberate, so decline rather than overwrite them.
    for (const key of FOLDABLE_KEYS)
        if (key in json)
            return;
    // An intersection distributes over a union: `A & (X | Y)` is `(A & X) | (A & Y)`. Only the first union is distributed over; a second one stays among the members every branch folds against, where it fails the object check and declines the whole intersection rather than multiplying out.
    const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
    let folded = null;
    if (!unions.length) {
        folded = foldObjects(allOf);
    }
    else {
        const union = unions[0];
        const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
        if (Object.keys(union).length !== 1)
            return;
        const rest = allOf.filter((m) => m !== union);
        const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
        if (branches.some((b) => !b))
            return;
        folded = { [keyword]: branches };
    }
    if (!folded)
        return;
    delete json.allOf;
    assignProps(json, folded);
}
function finalize(ctx, schema) {
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // flatten refs - inherit properties from parent schemas
    const flattenRef = (zodSchema) => {
        const seen = ctx.seen.get(zodSchema);
        // already processed
        if (seen.ref === null)
            return;
        const schema = seen.def ?? seen.schema;
        const _cached = { ...schema };
        const ref = seen.ref;
        seen.ref = null; // prevent infinite recursion
        if (ref) {
            flattenRef(ref);
            const refSeen = ctx.seen.get(ref);
            const refSchema = refSeen.schema;
            // merge referenced schema into current
            if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
                // older drafts can't combine $ref with other properties
                schema.allOf = schema.allOf ?? [];
                schema.allOf.push(refSchema);
            }
            else {
                assignProps(schema, refSchema);
            }
            // restore child's own properties (child wins)
            assignProps(schema, _cached);
            const isParentRef = zodSchema._zod.parent === ref;
            // For parent chain, child is a refinement - remove parent-only properties
            if (isParentRef) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (!(key in _cached)) {
                        delete schema[key];
                    }
                }
            }
            // When ref was extracted to $defs, remove properties that match the definition
            if (refSchema.$ref && refSeen.def) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
                        delete schema[key];
                    }
                }
            }
        }
        // If parent was extracted (has $ref), propagate $ref to this schema. This handles cases like: readonly().meta({id}).describe() where processor sets ref to innerType but parent should be referenced
        const parent = zodSchema._zod.parent;
        if (parent && parent !== ref) {
            // Ensure parent is processed first so its def has inherited properties
            flattenRef(parent);
            const parentSeen = ctx.seen.get(parent);
            if (parentSeen?.schema.$ref) {
                schema.$ref = parentSeen.schema.$ref;
                // De-duplicate with parent's definition
                if (parentSeen.def) {
                    for (const key in schema) {
                        if (key === "$ref" || key === "allOf")
                            continue;
                        if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
                            delete schema[key];
                        }
                    }
                }
            }
        }
        // execute overrides
        ctx.override({
            zodSchema: zodSchema,
            jsonSchema: schema,
            path: seen.path ?? [],
        });
    };
    // Flattening walks the whole map and clears each `ref` as it goes, so a second call over the same map is a no-op scan. Skip it outright once it has run for a registry conversion.
    if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
        for (const entry of [...ctx.seen.entries()].reverse()) {
            flattenRef(entry[0]);
        }
        if (ctx.target !== "openapi-3.0") {
            for (const entry of ctx.seen.entries()) {
                compactTypeUnion(entry[1].def ?? entry[1].schema);
            }
        }
        for (const rewrite of ctx.deferred)
            rewrite();
        // After flattening, every member that was extracted is a `$ref`, so the fold sees the final shape. A schema that inherits an intersection — through `z.lazy`, or any `ref` chain — holds the same `allOf` array, so fold by array identity to catch every copy.
        if (ctx.intersections.length) {
            const carriers = new Map();
            for (const seen of ctx.seen.values()) {
                for (const json of [seen.schema, seen.def]) {
                    const allOf = json?.allOf;
                    if (!Array.isArray(allOf))
                        continue;
                    const existing = carriers.get(allOf);
                    if (existing)
                        existing.push(json);
                    else
                        carriers.set(allOf, [json]);
                }
            }
            for (const allOf of ctx.intersections) {
                for (const json of carriers.get(allOf) ?? [])
                    foldIntersection(json);
            }
        }
    }
    const result = {};
    if (ctx.target === "draft-2020-12") {
        result.$schema = "https://json-schema.org/draft/2020-12/schema";
    }
    else if (ctx.target === "draft-07") {
        result.$schema = "http://json-schema.org/draft-07/schema#";
    }
    else if (ctx.target === "draft-04") {
        result.$schema = "http://json-schema.org/draft-04/schema#";
    }
    else if (ctx.target === "openapi-3.0") {
        // OpenAPI 3.0 schema objects should not include a $schema property
    }
    else {
        // Arbitrary string values are allowed but won't have a $schema property set
    }
    if (ctx.external?.uri) {
        const id = ctx.external.registry.get(schema)?.id;
        if (!id)
            throw new Error("Schema is missing an `id` property");
        result.$id = ctx.external.uri(id);
    }
    // when the root was extracted into $defs, `root.schema` is the `$ref` wrapper and `root.def` is the body that now lives under $defs
    assignProps(result, root.defId ? root.schema : (root.def ?? root.schema));
    // The `id` in `.meta()` is a Zod-specific registration tag used to extract schemas into $defs — it is not user-facing JSON Schema metadata. Strip it from the output body where it would otherwise leak. The id is preserved implicitly via the $defs key (and via $ref paths).
    const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
    if (rootMetaId !== undefined && result.id === rootMetaId)
        delete result.id;
    // build defs object. With `external`, `defs` is the shared object every schema writes into, so the same entries are reassigned on every call. Without it, `defs` is fresh per call and must be rebuilt.
    const defs = ctx.external?.defs ?? {};
    if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
        for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.def && seen.defId) {
                if (seen.def.id === seen.defId)
                    delete seen.def.id;
                (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .assignProp */ .Vy)(defs, seen.defId, seen.def);
            }
        }
    }
    if (ctx.external)
        ctx.sharedEmitDoneFor = ctx.external;
    // set definitions in result
    if (ctx.external) {
    }
    else {
        if (Object.keys(defs).length > 0) {
            if (ctx.target === "draft-2020-12") {
                result.$defs = defs;
            }
            else {
                result.definitions = defs;
            }
        }
    }
    try {
        // this "finalizes" this schema and ensures all cycles are removed each call to finalize() is functionally independent though the seen map is shared
        const finalized = JSON.parse(JSON.stringify(result));
        Object.defineProperty(finalized, "~standard", {
            value: {
                ...schema["~standard"],
                jsonSchema: {
                    input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
                    output: createStandardJSONSchemaMethod(schema, "output", ctx.processors),
                },
            },
            enumerable: false,
            writable: false,
        });
        return finalized;
    }
    catch (_err) {
        throw new Error("Error converting schema to JSON.");
    }
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const def = _schema._zod.def;
    if (def.type === "transform")
        return true;
    if (def.type === "array")
        return isTransforming(def.element, ctx);
    if (def.type === "set")
        return isTransforming(def.valueType, ctx);
    if (def.type === "lazy")
        return isTransforming(def.getter(), ctx);
    if (def.type === "promise" ||
        def.type === "optional" ||
        def.type === "nonoptional" ||
        def.type === "nullable" ||
        def.type === "readonly" ||
        def.type === "default" ||
        def.type === "prefault" ||
        def.type === "catch") {
        return isTransforming(def.innerType, ctx);
    }
    if (def.type === "intersection") {
        return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    if (def.type === "record" || def.type === "map") {
        return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    if (def.type === "pipe") {
        if (_schema._zod.traits.has("$ZodCodec"))
            return true;
        return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    if (def.type === "object") {
        for (const key in def.shape) {
            if (isTransforming(def.shape[key], ctx))
                return true;
        }
        return false;
    }
    if (def.type === "union") {
        for (const option of def.options) {
            if (isTransforming(option, ctx))
                return true;
        }
        return false;
    }
    if (def.type === "tuple") {
        for (const item of def.items) {
            if (isTransforming(item, ctx))
                return true;
        }
        if (def.rest && isTransforming(def.rest, ctx))
            return true;
        return false;
    }
    return false;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
    const ctx = initializeContext({ ...params, processors });
    processSchema(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
    const { libraryOptions, target } = params ?? {};
    const ctx = initializeContext({ ...(libraryOptions ?? {}), target, io, processors });
    processSchema(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};


/***/ }),

/***/ 40464:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ checkQuote)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred quote option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['quote'], null | undefined>}
 *   Preferred quote.
 */
function checkQuote(state) {
  const marker = state.options.quote || '"'

  if (marker !== '"' && marker !== "'") {
    throw new Error(
      'Cannot serialize title with `' +
        marker +
        '` for `options.quote`, expected `"`, or `\'`'
    )
  }

  return marker
}


/***/ }),

/***/ 40752:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ hardBreak)
/* harmony export */ });
/* harmony import */ var _util_pattern_in_scope_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53396);
/**
 * @import {Break, Parents} from 'mdast'
 * @import {Info, State} from 'mdast-util-to-markdown'
 */



/**
 * Serialize a break node.
 *
 * @param {Break} _
 *   Node to serialize.
 * @param {Parents | undefined} _1
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function hardBreak(_, _1, state, info) {
  let index = -1

  while (++index < state.unsafe.length) {
    const pattern = state.unsafe[index]

    // If we can’t put unconditional eols in this construct (setext headings,
    // tables), use a space instead.
    if (
      pattern.character === '\n' &&
      !pattern.before &&
      !pattern.after &&
      (0,_util_pattern_in_scope_js__WEBPACK_IMPORTED_MODULE_0__/* .patternInScope */ .q)(state.stack, pattern)
    ) {
      return /[\t ]/.test(info.before) ? '' : ' '
    }
  }

  return '\\\n'
}


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

/***/ 41189:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RotateCw)
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
    name: "rotate-cw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
                key: "1p45f6"
            }
        ],
        [
            "path",
            {
                d: "M21 3v5h-5",
                key: "1q7to0"
            }
        ]
    ]
};
__iconData.node;
const RotateCw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=rotate-cw.mjs.map


/***/ }),

/***/ 44236:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Gauge)
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
    name: "gauge",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m12 14 4-4",
                key: "9kzdfg"
            }
        ],
        [
            "path",
            {
                d: "M3.34 19a10 10 0 1 1 17.32 0",
                key: "19p75a"
            }
        ]
    ]
};
__iconData.node;
const Gauge = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=gauge.mjs.map


/***/ }),

/***/ 46378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MessageSquareCode)
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
    name: "message-square-code",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
                key: "18887p"
            }
        ],
        [
            "path",
            {
                d: "m10 8-3 3 3 3",
                key: "fp6dz7"
            }
        ],
        [
            "path",
            {
                d: "m14 14 3-3-3-3",
                key: "1yrceu"
            }
        ]
    ]
};
__iconData.node;
const MessageSquareCode = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=message-square-code.mjs.map


/***/ }),

/***/ 47651:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ gfmStrikethrough)
/* harmony export */ });
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41161);
/* harmony import */ var micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84693);
/* harmony import */ var micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49359);
/**
 * @import {Options} from 'micromark-extension-gfm-strikethrough'
 * @import {Event, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */




/**
 * Create an extension for `micromark` to enable GFM strikethrough syntax.
 *
 * @param {Options | null | undefined} [options={}]
 *   Configuration.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable GFM strikethrough syntax.
 */
function gfmStrikethrough(options) {
  const options_ = options || {};
  let single = options_.singleTilde;
  const tokenizer = {
    name: 'strikethrough',
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === undefined) {
    single = true;
  }
  return {
    text: {
      [126]: tokenizer
    },
    insideSpan: {
      null: [tokenizer]
    },
    attentionMarkers: {
      null: [126]
    }
  };

  /**
   * Take events and resolve strikethrough.
   *
   * @type {Resolver}
   */
  function resolveAllStrikethrough(events, context) {
    let index = -1;

    // Walk through all events.
    while (++index < events.length) {
      // Find a token that can close.
      if (events[index][0] === 'enter' && events[index][1].type === 'strikethroughSequenceTemporary' && events[index][1]._close) {
        let open = index;

        // Now walk back to find an opener.
        while (open--) {
          // Find a token that can open the closer.
          if (events[open][0] === 'exit' && events[open][1].type === 'strikethroughSequenceTemporary' && events[open][1]._open &&
          // If the sizes are the same:
          events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
            events[index][1].type = 'strikethroughSequence';
            events[open][1].type = 'strikethroughSequence';

            /** @type {Token} */
            const strikethrough = {
              type: 'strikethrough',
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index][1].end)
            };

            /** @type {Token} */
            const text = {
              type: 'strikethroughText',
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index][1].start)
            };

            // Opening.
            /** @type {Array<Event>} */
            const nextEvents = [['enter', strikethrough, context], ['enter', events[open][1], context], ['exit', events[open][1], context], ['enter', text, context]];
            const insideSpan = context.parser.constructs.insideSpan.null;
            if (insideSpan) {
              // Between.
              (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__/* .splice */ .m)(nextEvents, nextEvents.length, 0, (0,micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_1__/* .resolveAll */ .W)(insideSpan, events.slice(open + 1, index), context));
            }

            // Closing.
            (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__/* .splice */ .m)(nextEvents, nextEvents.length, 0, [['exit', text, context], ['enter', events[index][1], context], ['exit', events[index][1], context], ['exit', strikethrough, context]]);
            (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__/* .splice */ .m)(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === 'strikethroughSequenceTemporary') {
        events[index][1].type = "data";
      }
    }
    return events;
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeStrikethrough(effects, ok, nok) {
    const previous = this.previous;
    const events = this.events;
    let size = 0;
    return start;

    /** @type {State} */
    function start(code) {
      if (previous === 126 && events[events.length - 1][1].type !== "characterEscape") {
        return nok(code);
      }
      effects.enter('strikethroughSequenceTemporary');
      return more(code);
    }

    /** @type {State} */
    function more(code) {
      const before = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_2__/* .classifyCharacter */ .S)(previous);
      if (code === 126) {
        // If this is the third marker, exit.
        if (size > 1) return nok(code);
        effects.consume(code);
        size++;
        return more;
      }
      if (size < 2 && !single) return nok(code);
      const token = effects.exit('strikethroughSequenceTemporary');
      const after = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_2__/* .classifyCharacter */ .S)(code);
      token._open = !after || after === 2 && Boolean(before);
      token._close = !before || before === 2 && Boolean(after);
      return ok(code);
    }
  }
}

/***/ }),

/***/ 48329:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleSlash)
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
    name: "circle-slash",
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
                x1: "9",
                x2: "15",
                y1: "15",
                y2: "9",
                key: "1dfufj"
            }
        ]
    ]
};
__iconData.node;
const CircleSlash = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-slash.mjs.map


/***/ }),

/***/ 49164:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D4: () => (/* binding */ decode),
/* harmony export */   EJ: () => (/* binding */ parseAsync),
/* harmony export */   EM: () => (/* binding */ safeEncodeAsync),
/* harmony export */   Re: () => (/* binding */ decodeAsync),
/* harmony export */   X$: () => (/* binding */ encodeAsync),
/* harmony export */   bp: () => (/* binding */ safeParseAsync),
/* harmony export */   ex: () => (/* binding */ safeDecode),
/* harmony export */   lF: () => (/* binding */ encode),
/* harmony export */   qg: () => (/* binding */ parse),
/* harmony export */   wy: () => (/* binding */ safeEncode),
/* harmony export */   xL: () => (/* binding */ safeParse),
/* harmony export */   yR: () => (/* binding */ safeDecodeAsync)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55711);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92786);


const parse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._parse */ .Tj(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const parseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._parseAsync */ .Rb(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeParse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeParse */ .Od(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeParseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeParseAsync */ .wG(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);

// Codec functions
const encode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._encode */ .Mv(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const decode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._decode */ .e2(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const encodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._encodeAsync */ .GW(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const decodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._decodeAsync */ .or(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeEncode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeEncode */ .rh(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeDecode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeDecode */ .VS(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeEncodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeEncodeAsync */ .v_(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeDecodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeDecodeAsync */ .R3(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);


/***/ }),

/***/ 49439:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ gfmTableAlign)
/* harmony export */ });
/**
 * @import {Event} from 'micromark-util-types'
 */

/**
 * @typedef {'center' | 'left' | 'none' | 'right'} Align
 */

/**
 * Figure out the alignment of a GFM table.
 *
 * @param {Readonly<Array<Event>>} events
 *   List of events.
 * @param {number} index
 *   Table enter event.
 * @returns {Array<Align>}
 *   List of aligns.
 */
function gfmTableAlign(events, index) {
  let inDelimiterRow = false;
  /** @type {Array<Align>} */
  const align = [];
  while (index < events.length) {
    const event = events[index];
    if (inDelimiterRow) {
      if (event[0] === 'enter') {
        // Start of alignment value: set a new column.
        // To do: `markdown-rs` uses `tableDelimiterCellValue`.
        if (event[1].type === 'tableContent') {
          align.push(events[index + 1][1].type === 'tableDelimiterMarker' ? 'left' : 'none');
        }
      }
      // Exits:
      // End of alignment value: change the column.
      // To do: `markdown-rs` uses `tableDelimiterCellValue`.
      else if (event[1].type === 'tableContent') {
        if (events[index - 1][1].type === 'tableDelimiterMarker') {
          const alignIndex = align.length - 1;
          align[alignIndex] = align[alignIndex] === 'left' ? 'center' : 'right';
        }
      }
      // Done!
      else if (event[1].type === 'tableDelimiterRow') {
        break;
      }
    } else if (event[0] === 'enter' && event[1].type === 'tableDelimiterRow') {
      inDelimiterRow = true;
    }
    index += 1;
  }
  return align;
}

/***/ }),

/***/ 49884:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ ccount)
/* harmony export */ });
/**
 * Count how often a character (or substring) is used in a string.
 *
 * @param {string} value
 *   Value to search in.
 * @param {string} character
 *   Character (or substring) to look for.
 * @return {number}
 *   Number of times `character` occurred in `value`.
 */
function ccount(value, character) {
  const source = String(value)

  if (typeof character !== 'string') {
    throw new TypeError('Expected character')
  }

  let count = 0
  let index = source.indexOf(character)

  while (index !== -1) {
    count++
    index = source.indexOf(character, index + character.length)
  }

  return count
}


/***/ }),

/***/ 50349:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ gfmStrikethroughToMarkdown),
/* harmony export */   p: () => (/* binding */ gfmStrikethroughFromMarkdown)
/* harmony export */ });
/**
 * @import {Delete} from 'mdast'
 * @import {
 *   CompileContext,
 *   Extension as FromMarkdownExtension,
 *   Handle as FromMarkdownHandle
 * } from 'mdast-util-from-markdown'
 * @import {
 *   Attention,
 *   ConstructName,
 *   Handle as ToMarkdownHandle,
 *   Options as ToMarkdownExtension
 * } from 'mdast-util-to-markdown'
 */

/**
 * List of constructs that occur in phrasing (paragraphs, headings), but cannot
 * contain strikethrough.
 * So they sort of cancel each other out.
 * Note: could use a better name.
 *
 * Note: keep in sync with: <https://github.com/syntax-tree/mdast-util-to-markdown/blob/8ce8dbf/lib/unsafe.js#L14>
 *
 * @type {Array<ConstructName>}
 */
const constructsWithoutStrikethrough = [
  'autolink',
  'destinationLiteral',
  'destinationRaw',
  'reference',
  'titleQuote',
  'titleApostrophe'
]

handleDelete.attention = attentionDelete
handleDelete.peek = peekDelete

/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM
 * strikethrough in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown` to enable GFM strikethrough.
 */
function gfmStrikethroughFromMarkdown() {
  return {
    canContainEols: ['delete'],
    enter: {strikethrough: enterStrikethrough},
    exit: {strikethrough: exitStrikethrough}
  }
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM
 * strikethrough in markdown.
 *
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM strikethrough.
 */
function gfmStrikethroughToMarkdown() {
  return {
    handlers: {delete: handleDelete},
    unsafe: [
      {
        character: '~',
        inConstruct: 'phrasing',
        notInConstruct: constructsWithoutStrikethrough
      }
    ]
  }
}

/**
 * Enter strikethrough.
 *
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterStrikethrough(token) {
  this.enter({type: 'delete', children: [], position: undefined}, token)
}

/**
 * Exit strikethrough.
 *
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitStrikethrough(token) {
  this.exit(token)
}

/**
 * Serialize a delete node.
 *
 * @type {ToMarkdownHandle}
 * @param {Delete} node
 *   Node to serialize.
 */
function handleDelete(node, _, state, info) {
  // To do: next major: empty this function, like emphasis and strong handlers,
  // this is no longer needed.
  const tracker = state.createTracker(info)
  const sequence = state.stack.includes('strikethrough') ? '~' : '~~'
  const exit = state.enter('strikethrough')
  let value = tracker.move(sequence)
  value += state.containerPhrasing(node, {
    ...tracker.current(),
    before: value,
    after: '~'
  })
  value += tracker.move(sequence)
  exit()
  return value
}

/**
 * Serialize a delete node as attention.
 *
 * @type {Attention}
 */
function attentionDelete() {
  return {construct: 'strikethrough', markers: ['~'], sizes: [2, 1]}
}

/**
 * Peek the first character of a delete node.
 *
 * @type {ToMarkdownHandle}
 */
function peekDelete() {
  return '~'
}


/***/ }),

/***/ 50957:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ root)
/* harmony export */ });
/* harmony import */ var mdast_util_phrasing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35105);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Root} from 'mdast'
 */



/**
 * Serialize a root node.
 *
 * @param {Root} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function root(node, _, state, info) {
  // Note: `html` nodes are ambiguous.
  const hasPhrasing = node.children.some(function (d) {
    return (0,mdast_util_phrasing__WEBPACK_IMPORTED_MODULE_0__/* .phrasing */ .f)(d)
  })

  if (!hasPhrasing) return state.containerFlow(node, info)

  const exit = state.enter('phrasing')
  const value = state.containerPhrasing(node, info)
  exit()
  return value
}


/***/ }),

/***/ 52750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ClipboardList)
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
    name: "clipboard-list",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "8",
                height: "4",
                x: "8",
                y: "2",
                rx: "1",
                ry: "1",
                key: "tgr4d6"
            }
        ],
        [
            "path",
            {
                d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
                key: "116196"
            }
        ],
        [
            "path",
            {
                d: "M12 11h4",
                key: "1jrz19"
            }
        ],
        [
            "path",
            {
                d: "M12 16h4",
                key: "n85exb"
            }
        ],
        [
            "path",
            {
                d: "M8 11h.01",
                key: "1dfujw"
            }
        ],
        [
            "path",
            {
                d: "M8 16h.01",
                key: "18s6g9"
            }
        ]
    ]
};
__iconData.node;
const ClipboardList = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=clipboard-list.mjs.map


/***/ }),

/***/ 53396:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ patternInScope)
/* harmony export */ });
/**
 * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
 */

/**
 * Check if a pattern is in scope based on the current stack of constructs.
 *
 * @param {Array<ConstructName>} stack
 *   Current stack of constructs.
 * @param {Unsafe} pattern
 *   Pattern to check.
 * @returns {boolean}
 *   Whether the pattern is in scope.
 */
function patternInScope(stack, pattern) {
  return (
    listInScope(stack, pattern.inConstruct, true) &&
    !listInScope(stack, pattern.notInConstruct, false)
  )
}

/**
 * Check if any of the constructs in the list are present in the stack.
 *
 * @param {Array<ConstructName>} stack
 *   Current stack of constructs.
 * @param {Unsafe['inConstruct']} list
 *   List of constructs to check for in the stack.
 * @param {boolean} none
 *   Value to return if the list is empty or not provided.
 * @returns {boolean}
 *   Whether any of the constructs in the list are present in the stack.
 */
function listInScope(stack, list, none) {
  if (typeof list === 'string') {
    list = [list]
  }

  if (!list || list.length === 0) {
    return none
  }

  let index = -1

  while (++index < list.length) {
    if (stack.includes(list[index])) {
      return true
    }
  }

  return false
}


/***/ }),

/***/ 53622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x3: () => (/* binding */ memoizer)
/* harmony export */ });
/* unused harmony exports $ZodCyclicError, isRecursiveSchema, isBackEdge */
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);

class $ZodCyclicError extends Error {
    constructor() {
        super(`Cannot parse a reference cycle that closes through a transform`);
        this.name = "ZodCyclicError";
    }
}
/** Keyed off the context object every schema in one parse call already shares. */
const STATE = "~memo";
const NO_ISSUES = [];
// a value a cycle can close through
function isRef(value) {
    return value !== null && typeof value === "object";
}
// Receivers prefix paths in place, so the cache and every hand-out need their own copies.
function cloneIssues(issues) {
    return issues.map((iss) => (iss.path ? { ...iss, path: iss.path.slice() } : { ...iss }));
}
const recursive = /*@__PURE__*/ new WeakMap();
/** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
const NONE = 0;
const ASSUMED = 1;
const PROVEN = 2;
/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
function isRecursive(inst, stack, resolve) {
    const cached = recursive.get(inst);
    if (cached !== undefined)
        return cached ? PROVEN : NONE;
    // Relative to the walk in progress, so not cached.
    if (stack.has(inst))
        return PROVEN;
    stack.add(inst);
    let result = NONE;
    const check = (child) => {
        if (result !== PROVEN && child?._zod) {
            const answer = isRecursive(child, stack, resolve);
            if (answer > result)
                result = answer;
        }
    };
    // `Reflect.ownKeys` rather than `Object.keys`, so a cycle through a declared symbol key is still seen
    const shape = (sh, spread) => {
        let answer = NONE;
        for (const key of Reflect.ownKeys(sh)) {
            const desc = Object.getOwnPropertyDescriptor(sh, key);
            // an object resolves its shape by spread, so a key it does not enumerate is never parsed; `z.properties` reads every own key and so keeps them all
            if (spread && !desc.enumerable)
                continue;
            // resolving runs user code, and a factory mints a fresh subtree per read, so an edge the walk can't follow counts as a cycle
            const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
            if (child > answer)
                answer = child;
        }
        return answer;
    };
    const merge = (answer) => {
        if (answer > result)
            result = answer;
    };
    const def = inst._zod.def;
    const kind = def.type;
    switch (kind) {
        case "object": {
            const raw = _util_js__WEBPACK_IMPORTED_MODULE_0__/* .rawShape */ .MO(def);
            // a def with no raw shape answers `shape` from an accessor of its own, and running that can mint a whole fresh subtree
            merge(raw ? shape(raw, true) : ASSUMED);
            check(def.catchall);
            break;
        }
        case "array":
            check(def.element);
            break;
        case "tuple":
            for (const el of def.items)
                check(el);
            check(def.rest);
            break;
        case "record":
        case "map":
            check(def.keyType);
            check(def.valueType);
            break;
        case "set":
            check(def.valueType);
            break;
        case "union":
            for (const el of def.options)
                check(el);
            break;
        case "intersection":
            check(def.left);
            check(def.right);
            break;
        case "optional":
        case "nullable":
        case "default":
        case "prefault":
        case "catch":
        case "readonly":
        case "nonoptional":
        case "promise":
        case "success":
            check(def.innerType);
            break;
        case "pipe":
            check(def.in);
            check(def.out);
            break;
        case "function":
            check(def.input);
            check(def.output);
            break;
        // `$ZodLazy` caches its inner on the def, so a resolved edge is followed exactly
        case "lazy": {
            const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : undefined);
            // walked with resolution off: one hop sees past the deferral, and a lazy that yields only another unresolved lazy is generative, so it stops there
            merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
            break;
        }
        // a leaf by choice: `parts` are regex fragments, not data positions
        case "template_literal":
        // leaves
        case "string":
        case "number":
        case "int":
        case "boolean":
        case "bigint":
        case "symbol":
        case "undefined":
        case "null":
        case "void":
        case "never":
        case "any":
        case "unknown":
        case "date":
        case "nan":
        case "enum":
        case "literal":
        case "file":
        case "transform":
        case "custom":
            break;
        default: {
            // a new built-in kind becomes a compile error here
            kind;
            // a user-defined kind can still hold children, and only its author knows where, so fall back to scanning the def — skipping accessors, since reading one can run user code
            for (const key in def) {
                const desc = Object.getOwnPropertyDescriptor(def, key);
                if (!desc || desc.get)
                    continue;
                const value = desc.value;
                if (!value || typeof value !== "object")
                    continue;
                if (value._zod)
                    check(value);
                else if (Array.isArray(value))
                    for (const el of value)
                        check(el);
            }
        }
    }
    stack.delete(inst);
    return settle(inst, result);
}
/** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
function settle(inst, answer) {
    if (answer !== ASSUMED)
        recursive.set(inst, answer === PROVEN);
    return answer;
}
/**
 * Whether one parse can re-enter this schema, i.e. its subtree contains a cycle.
 * Exported for `z.compile`, which refuses to compile such a schema: cycle
 * breaking is driven from here off state keyed on the parse context, and a
 * generated fast path has no context to key on.
 */
function isRecursiveSchema(inst) {
    // z.compile never parses, so nothing would ever resolve a lazy for it; it runs once and already treats a throw here as recursive
    return isRecursive(inst, new Set(), true) !== NONE;
}
function bucketFor(state, inst) {
    let bucket = state.buckets.get(inst);
    if (!bucket) {
        bucket = new WeakMap();
        state.buckets.set(inst, bucket);
    }
    return bucket;
}
// Set immediately before delegating to core and cleared immediately after, so `alloc` registers only for a visit this module is driving.
let handoff;
// Allocated but unfinished entries. `alloc` and the matching pop both happen in the synchronous part of a parse, so they nest even when children are async, and one stack serves every schema.
const open = [];
const memo = {
    alloc(_inst, payload, empty) {
        const bucket = handoff;
        if (!bucket)
            return empty;
        handoff = undefined;
        const entry = { value: empty, issues: null };
        bucket.set(payload.value, entry);
        open.push(entry);
        return empty;
    },
    guard(inst) {
        var _a;
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred.push(() => {
            const base = inst._zod.parse;
            const wrapped = (payload, ctx) => {
                // The value is a placeholder a back-edge is still waiting on, so the cycle closes through this transform. Its output can't exist in time to bind.
                if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
                    throw new $ZodCyclicError();
                return base(payload, ctx);
            };
            inst._zod.parse = wrapped;
            if (inst._zod.run === base)
                inst._zod.run = wrapped;
        });
    },
    attach(inst) {
        var _a;
        let isRecursiveInst;
        let rechecked = false;
        // a recursive schema is re-entered many times per parse and its bucket never changes
        let lastCtx;
        let lastBucket;
        // Wraps `parse` in a deferred so it sees the container's final parse. Core's own deferred copies `parse` into `run` when there are no checks, and it ran first, so `run` is patched to match; with checks, `run` reads `parse` dynamically.
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred.push(() => {
            const base = inst._zod.parse;
            const wrapped = (payload, ctx) => {
                if (isRecursiveInst === undefined) {
                    const walked = isRecursive(inst, new Set(), false);
                    if (walked === NONE) {
                        // Nothing here can ever fire, so take it back out.
                        inst._zod.parse = base;
                        if (inst._zod.run === wrapped)
                            inst._zod.run = base;
                        return base(payload, ctx);
                    }
                    // this parse resolves the deferred edges on its own path, so ask once more before latching
                    if (walked === PROVEN || rechecked)
                        isRecursiveInst = true;
                    else
                        rechecked = true;
                }
                const input = payload.value;
                if (!isRef(input))
                    return base(payload, ctx);
                let state = ctx[STATE];
                if (!state) {
                    state = { buckets: new WeakMap(), backEdges: undefined };
                    ctx[STATE] = state;
                }
                let bucket;
                if (lastCtx === ctx) {
                    bucket = lastBucket;
                }
                else {
                    bucket = bucketFor(state, inst);
                    lastCtx = ctx;
                    lastBucket = bucket;
                }
                const hit = bucket.get(input);
                if (hit) {
                    payload.value = hit.value;
                    if (hit.issues) {
                        if (hit.issues.length)
                            payload.issues.push(...cloneIssues(hit.issues));
                    }
                    else {
                        // Still being parsed: its own checks cover it, so skip them here.
                        payload.memo = true;
                        state.backEdges ?? (state.backEdges = new WeakSet());
                        state.backEdges.add(hit.value);
                    }
                    return payload;
                }
                handoff = bucket;
                const depth = open.length;
                const result = base(payload, ctx);
                handoff = undefined;
                // A container that rejected its input outright allocated nothing.
                const entry = open.length > depth ? open.pop() : undefined;
                // Both paths written out so the sync one allocates no closure. It runs once per node, and capturing here cost more than everything else combined.
                if (result instanceof Promise) {
                    return result.then((r) => {
                        if (entry)
                            entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
                        return r;
                    });
                }
                if (entry)
                    entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
                return result;
            };
            inst._zod.parse = wrapped;
            if (inst._zod.run === base)
                inst._zod.run = wrapped;
        });
    },
};
/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
function memoizer() {
    return memo;
}
/** Whether this value is a node a back-edge resolved to before it finished. */
function isBackEdge(ctx, value) {
    const backEdges = ctx[STATE]?.backEdges;
    return backEdges !== undefined && isRef(value) && backEdges.has(value);
}


/***/ }),

/***/ 55249:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ checkListItemIndent)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred list item indent option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['listItemIndent'], null | undefined>}
 *   Preferred list item indent.
 */
function checkListItemIndent(state) {
  const style = state.options.listItemIndent || 'one'

  if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
    throw new Error(
      'Cannot serialize items with `' +
        style +
        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
    )
  }

  return style
}


/***/ }),

/***/ 55503:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $W: () => (/* binding */ config),
/* harmony export */   GT: () => (/* binding */ $ZodAsyncError),
/* harmony export */   cV: () => (/* binding */ $ZodEncodeError),
/* harmony export */   cr: () => (/* binding */ globalConfig),
/* harmony export */   xI: () => (/* binding */ $constructor)
/* harmony export */ });
/* unused harmony exports NEVER, $brand */
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);
var _a;

/** A special constant with type `never` */
const NEVER = /*@__PURE__*/ Object.freeze({
    status: "aborted",
});
/* Shared descriptor for installing `_zod`; defineProperty reads it
 * synchronously, so reusing one object avoids a per-instance allocation. */
const _zodDesc = { value: undefined, enumerable: false };
// null where suppressing the capture would be unrecoverable: `parse()` puts the frames back with `captureStackTrace`, so without it the throw would lose its stack. also latched to null once `stackTraceLimit` proves unassignable, which a realm can do at any point by hardening Error
let _E = "captureStackTrace" in Error ? Error : null;
// v8 captures a stack trace inside the Error constructor, which dominates a failed parse; costs only the frames, and parse() restores those. the constructor must RUN: Object.create is cheaper and passes instanceof, but Error.isError and util.types.isNativeError check an internal slot
function newError(Definition) {
    const E = _E;
    if (E) {
        const saved = E.stackTraceLimit;
        if (typeof saved === "number") {
            try {
                E.stackTraceLimit = 0;
            }
            catch {
                _E = null;
                return new Definition();
            }
            try {
                return new Definition();
            }
            finally {
                E.stackTraceLimit = saved;
            }
        }
    }
    return new Definition();
}
function $constructor(name, initializer, 
/** This trait's members, installed once on every prototype that composes it. They cannot be declared in the initializer above: that runs per instance, and the prototype is shared. */
proto, params) {
    // Prototype for this constructor's `_zod` internals. Lazily-derived fields (`values`, `pattern`, `optin`, …) install here once rather than as an accessor on every instance.
    const zodProto = {};
    // Assigning the fields in the constructor body is what gives instances in-object slots; building the object literally and reparenting it costs a second allocation and a generic property copy.
    function Internals(def) {
        this.def = def;
        this.constr = _;
        this.traits = new Set();
    }
    Internals.prototype = zodProto;
    const protoMembers = proto;
    // One trait's members land on every prototype whose chain composes it, so the answer is per prototype rather than per trait.
    const initialized = protoMembers && new WeakSet();
    function init(inst, def) {
        if (!inst._zod) {
            _zodDesc.value = new Internals(def);
            try {
                Object.defineProperty(inst, "_zod", _zodDesc);
            }
            finally {
                // Cleared even on throw, so the shared descriptor never leaks one instance's internals into the next.
                _zodDesc.value = undefined;
            }
        }
        else if (inst._zod.traits.has(name)) {
            return;
        }
        inst._zod.traits.add(name);
        initializer(inst, def);
        if (initialized) {
            // `super(def)` from a user subclass gives `this` a prototype the subclass owns, and installing there would overwrite whatever the subclass declared. `constr` built the instance, so its prototype is the one below the subclass's that should carry the members. A receiver whose chain never reaches that prototype installs on its own, which for a plain object handed straight to `init` means `Object.prototype` — unchanged from before.
            const own = Object.getPrototypeOf(inst);
            const ctorProto = inst._zod.constr.prototype;
            let up = own;
            while (up && up !== ctorProto)
                up = Object.getPrototypeOf(up);
            const target = up ?? own;
            if (!initialized.has(target)) {
                initialized.add(target);
                (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .members */ .ol)(target, protoMembers);
            }
        }
        // support prototype modifications; for-in avoids the array allocation of Object.keys on the (usually empty) prototype
        const proto = _.prototype;
        for (const k in proto) {
            if (!Object.prototype.hasOwnProperty.call(proto, k))
                continue;
            if (!(k in inst)) {
                inst[k] = proto[k].bind(inst);
            }
        }
    }
    // doesn't work if Parent has a constructor with arguments
    const Parent = params?.Parent ?? Object;
    class Definition extends Parent {
    }
    Object.defineProperty(Definition, "name", { value: name });
    function _(def) {
        const inst = params?.Parent ? newError(Definition) : this;
        init(inst, def);
        const deferred = inst._zod.deferred;
        if (deferred) {
            for (const fn of deferred) {
                fn();
            }
            // Released: initializers run once, and the list would otherwise be retained for the schema's lifetime.
            inst._zod.deferred = undefined;
        }
        // Global post-processor hook. Internal: installed by `import "zod/compile"` to enable AOT compilation for every constructed schema. Runs last, once the instance is fully built, because it hands the instance to compile(). The post-processor is expected to be reentrancy-guarded by its own implementation.
        const pp = globalThis.__zod_globalConfig?.postProcessor;
        if (pp)
            pp(inst);
        return inst;
    }
    Object.defineProperty(_, "init", { value: init });
    Object.defineProperty(_, Symbol.hasInstance, {
        value: (inst) => {
            if (params?.Parent && inst instanceof params.Parent)
                return true;
            return inst?._zod?.traits?.has(name);
        },
    });
    Object.defineProperty(_, "name", { value: name });
    return _;
}
//////////////////////////////   UTILITIES   ///////////////////////////////////////
const $brand = /*@__PURE__*/ (/* unused pure expression or super */ null && (Symbol("zod_brand")));
class $ZodAsyncError extends Error {
    constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
}
class $ZodEncodeError extends Error {
    constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
    }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
const globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
    if (newConfig)
        Object.assign(globalConfig, newConfig);
    return globalConfig;
}


/***/ }),

/***/ 55711:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F0: () => (/* binding */ validateAsync),
/* harmony export */   GW: () => (/* binding */ _encodeAsync),
/* harmony export */   Mv: () => (/* binding */ _encode),
/* harmony export */   Od: () => (/* binding */ _safeParse),
/* harmony export */   R3: () => (/* binding */ _safeDecodeAsync),
/* harmony export */   Rb: () => (/* binding */ _parseAsync),
/* harmony export */   Tj: () => (/* binding */ _parse),
/* harmony export */   VS: () => (/* binding */ _safeDecode),
/* harmony export */   e2: () => (/* binding */ _decode),
/* harmony export */   or: () => (/* binding */ _decodeAsync),
/* harmony export */   rh: () => (/* binding */ _safeEncode),
/* harmony export */   tf: () => (/* binding */ validate),
/* harmony export */   v_: () => (/* binding */ _safeEncodeAsync),
/* harmony export */   wG: () => (/* binding */ _safeParseAsync)
/* harmony export */ });
/* unused harmony exports parse, parseAsync, safeParse, safeParseAsync, encode, decode, encodeAsync, decodeAsync, safeEncode, safeDecode, safeEncodeAsync, safeDecodeAsync */
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55503);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27855);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68056);



// Always both keys, so the `_params` read site in `_parse` sees one object shape rather than two.
function finalizeParams(callee, params) {
    return { callee: params?.callee ?? callee, Err: params?.Err };
}
const _parse = (_Err) => {
    const fn = (schema, value, _ctx, _params) => {
        const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
        const result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise) {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
        }
        if (result.issues.length) {
            const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_1__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W())));
            _util_js__WEBPACK_IMPORTED_MODULE_1__/* .captureStackTrace */ .gx(e, _params?.callee ?? fn);
            throw e;
        }
        return result.value;
    };
    return fn;
};
const parse = /* @__PURE__*/ _parse(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _parseAsync = (_Err) => {
    const fn = async (schema, value, _ctx, params) => {
        const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
        let result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise)
            result = await result;
        if (result.issues.length) {
            const e = new (params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_1__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W())));
            _util_js__WEBPACK_IMPORTED_MODULE_1__/* .captureStackTrace */ .gx(e, params?.callee ?? fn);
            throw e;
        }
        return result.value;
    };
    return fn;
};
const parseAsync = /* @__PURE__*/ _parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _safeParse = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
    }
    return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
const safeParse = /* @__PURE__*/ _safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
// the error is built on the first read of `error`: finalizing the issues and constructing the instance is most of a failing parse, and a caller that only branches on `success` never pays it. a getter in the literal keeps this small; the alternative, one shared accessor descriptor plus a hidden state slot, reads ~15% faster but costs ~75 B gzipped in every bundle
function failure(Err, issues, ctx) {
    let error;
    return {
        success: false,
        get error() {
            if (!error) {
                error = new Err(issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_1__/* .finalizeIssue */ .iR(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W())));
                // finalizeIssue drops `input`, so the built error holds nothing; keeping the raw issues past this point pins the parsed value for the life of the result
                issues = undefined;
                ctx = undefined;
            }
            return error;
        },
        set error(e) {
            error = e;
            // a replacement makes the getter's branch unreachable, so the captures have to go here too
            issues = undefined;
            ctx = undefined;
        },
    };
}
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
const safeParseAsync = /* @__PURE__*/ _safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
// registry mirrors of the compiler's sentinels, so this module never imports the compiler
const COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
const COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
// Deliberately tiny, because v8 will not inline a body carrying the fallback's object literals and throw. Everything that is not the compiled happy path lives in validateFallback, and that split is worth ~35% on a compiled schema.
const validate = ((schema, value, _ctx) => {
    const validator = schema._zod.bag.validator;
    if (validator !== undefined) {
        if (validator(value) !== COMPILE_INVALID)
            return true;
        // a definite sentinel means the runtime would reject, so skip the re-parse; a ctx can still change the answer
        if (validator.definite === true && _ctx === undefined)
            return false;
    }
    return validateFallback(schema, value, _ctx);
});
function validateFallback(schema, value, _ctx) {
    const ctx = _ctx
        ? { ..._ctx, async: false, abortEarly: true }
        : { async: false, abortEarly: true };
    const fallbackRun = schema._zod.bag.fallbackRun;
    let result;
    if (fallbackRun) {
        // skip nested fast paths on the fallback, so user callbacks keep the at-most-twice bound
        ctx[COMPILE_FALLBACK] = true;
        result = fallbackRun({ value, issues: [] }, ctx);
    }
    else {
        result = schema._zod.run({ value, issues: [] }, ctx);
    }
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodAsyncError */ .GT();
    }
    return result.issues.length === 0;
}
// no fast path: the compiler keeps async parses on the runtime, because a promise-returning callback that is not declared async compiles to a throw
const validateAsync = async (schema, value, _ctx) => {
    const ctx = _ctx
        ? { ..._ctx, async: true, abortEarly: true }
        : { async: true, abortEarly: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length === 0;
};
const _encode = (_Err) => {
    const parse = _parse(_Err);
    const fn = (schema, value, _ctx, _params) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return parse(schema, value, ctx, finalizeParams(fn, _params));
    };
    return fn;
};
const encode = /* @__PURE__*/ _encode(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _decode = (_Err) => {
    const parse = _parse(_Err);
    const fn = (schema, value, _ctx, _params) => {
        return parse(schema, value, _ctx, finalizeParams(fn, _params));
    };
    return fn;
};
const decode = /* @__PURE__*/ _decode(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _encodeAsync = (_Err) => {
    const parseAsync = _parseAsync(_Err);
    const fn = async (schema, value, _ctx, _params) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return (await parseAsync(schema, value, ctx, finalizeParams(fn, _params)));
    };
    return fn;
};
const encodeAsync = /* @__PURE__*/ _encodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _decodeAsync = (_Err) => {
    const parseAsync = _parseAsync(_Err);
    const fn = async (schema, value, _ctx, _params) => {
        return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
    };
    return fn;
};
const decodeAsync = /* @__PURE__*/ _decodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _safeEncode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _safeParse(_Err)(schema, value, ctx);
};
const safeEncode = /* @__PURE__*/ _safeEncode(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _safeDecode = (_Err) => (schema, value, _ctx) => {
    return _safeParse(_Err)(schema, value, _ctx);
};
const safeDecode = /* @__PURE__*/ _safeDecode(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _safeParseAsync(_Err)(schema, value, ctx);
};
const safeEncodeAsync = /* @__PURE__*/ _safeEncodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _safeParseAsync(_Err)(schema, value, _ctx);
};
const safeDecodeAsync = /* @__PURE__*/ _safeDecodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .$ZodRealError */ .Kd);


/***/ }),

/***/ 55737:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Plug)
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
    name: "plug",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 22v-5",
                key: "1ega77"
            }
        ],
        [
            "path",
            {
                d: "M15 8V2",
                key: "18g5xt"
            }
        ],
        [
            "path",
            {
                d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",
                key: "1xoxul"
            }
        ],
        [
            "path",
            {
                d: "M9 8V2",
                key: "14iosj"
            }
        ]
    ]
};
__iconData.node;
const Plug = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=plug.mjs.map


/***/ }),

/***/ 59877:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ OctagonAlert)
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
    name: "octagon-alert",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 16h.01",
                key: "1drbdi"
            }
        ],
        [
            "path",
            {
                d: "M12 8v4",
                key: "1got3b"
            }
        ],
        [
            "path",
            {
                d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
                key: "1fd625"
            }
        ]
    ],
    aliases: [
        "alert-octagon"
    ]
};
__iconData.node;
const OctagonAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=octagon-alert.mjs.map


/***/ }),

/***/ 61010:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ checkRule)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred rule option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['rule'], null | undefined>}
 *   Preferred rule marker.
 */
function checkRule(state) {
  const marker = state.options.rule || '*'

  if (marker !== '*' && marker !== '-' && marker !== '_') {
    throw new Error(
      'Cannot serialize rules with `' +
        marker +
        '` for `options.rule`, expected `*`, `-`, or `_`'
    )
  }

  return marker
}


/***/ }),

/***/ 61663:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RotateCcwClock)
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
    name: "rotate-ccw-clock",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
                key: "1357e3"
            }
        ],
        [
            "path",
            {
                d: "M3 3v5h5",
                key: "1xhq8a"
            }
        ],
        [
            "path",
            {
                d: "M12 7v5l4 2",
                key: "1fdv2h"
            }
        ]
    ],
    aliases: [
        "history"
    ]
};
__iconData.node;
const RotateCcwClock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=rotate-ccw-clock.mjs.map


/***/ }),

/***/ 62700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pin)
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
    name: "pin",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 17v5",
                key: "bb1du9"
            }
        ],
        [
            "path",
            {
                d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
                key: "1nkz8b"
            }
        ]
    ]
};
__iconData.node;
const Pin = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=pin.mjs.map


/***/ }),

/***/ 62818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ThumbsUp)
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
    name: "thumbs-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
                key: "emmmcr"
            }
        ],
        [
            "path",
            {
                d: "M7 10v12",
                key: "1qc93n"
            }
        ]
    ]
};
__iconData.node;
const ThumbsUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=thumbs-up.mjs.map


/***/ }),

/***/ 65408:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Minimize2)
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
    name: "minimize-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m14 10 7-7",
                key: "oa77jy"
            }
        ],
        [
            "path",
            {
                d: "M20 10h-6V4",
                key: "mjg0md"
            }
        ],
        [
            "path",
            {
                d: "m3 21 7-7",
                key: "tjx5ai"
            }
        ],
        [
            "path",
            {
                d: "M4 14h6v6",
                key: "rmj7iw"
            }
        ]
    ]
};
__iconData.node;
const Minimize2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=minimize-2.mjs.map


/***/ }),

/***/ 65829:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ findAndReplace)
/* harmony export */ });
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23350);
/* harmony import */ var unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42234);
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73129);
/**
 * @import {Nodes, Parents, PhrasingContent, Root, Text} from 'mdast'
 * @import {BuildVisitor, Test, VisitorResult} from 'unist-util-visit-parents'
 */

/**
 * @typedef RegExpMatchObject
 *   Info on the match.
 * @property {number} index
 *   The index of the search at which the result was found.
 * @property {string} input
 *   A copy of the search string in the text node.
 * @property {[...Array<Parents>, Text]} stack
 *   All ancestors of the text node, where the last node is the text itself.
 *
 * @typedef {RegExp | string} Find
 *   Pattern to find.
 *
 *   Strings are escaped and then turned into global expressions.
 *
 * @typedef {Array<FindAndReplaceTuple>} FindAndReplaceList
 *   Several find and replaces, in array form.
 *
 * @typedef {[Find, Replace?]} FindAndReplaceTuple
 *   Find and replace in tuple form.
 *
 * @typedef {ReplaceFunction | string | null | undefined} Replace
 *   Thing to replace with.
 *
 * @callback ReplaceFunction
 *   Callback called when a search matches.
 * @param {...any} parameters
 *   The parameters are the result of corresponding search expression:
 *
 *   * `value` (`string`) — whole match
 *   * `...capture` (`Array<string>`) — matches from regex capture groups
 *   * `match` (`RegExpMatchObject`) — info on the match
 * @returns {Array<PhrasingContent> | PhrasingContent | string | false | null | undefined}
 *   Thing to replace with.
 *
 *   * when `null`, `undefined`, `''`, remove the match
 *   * …or when `false`, do not replace at all
 *   * …or when `string`, replace with a text node of that value
 *   * …or when `Node` or `Array<Node>`, replace with those nodes
 *
 * @typedef {[RegExp, ReplaceFunction]} Pair
 *   Normalized find and replace.
 *
 * @typedef {Array<Pair>} Pairs
 *   All find and replaced.
 *
 * @typedef Options
 *   Configuration.
 * @property {Test | null | undefined} [ignore]
 *   Test for which nodes to ignore (optional).
 */





/**
 * Find patterns in a tree and replace them.
 *
 * The algorithm searches the tree in *preorder* for complete values in `Text`
 * nodes.
 * Partial matches are not supported.
 *
 * @param {Nodes} tree
 *   Tree to change.
 * @param {FindAndReplaceList | FindAndReplaceTuple} list
 *   Patterns to find.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
function findAndReplace(tree, list, options) {
  const settings = options || {}
  const ignored = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__/* .convert */ .C)(settings.ignore || [])
  const pairs = toPairs(list)
  let pairIndex = -1

  while (++pairIndex < pairs.length) {
    (0,unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_1__/* .visitParents */ .VG)(tree, visitor)
  }

  /**
   * Handle text nodes and skip ignored nodes.
   *
   * @type {BuildVisitor<Root>}
   */
  function visitor(node, parents, index) {
    if (node.type === 'text' && typeof index === 'number') {
      return handler(node, parents, index)
    }

    if (ignored(node, index, parents[parents.length - 1])) return unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_1__/* .SKIP */ ._Z
  }

  /**
   * Handle a text node which is not in an ignored parent.
   *
   * @param {Text} node
   *   Text node to search in.
   * @param {Array<Parents>} parents
   *   Ancestors of `node`.
   * @param {number} index
   *   Index of `node` in its parent.
   * @returns {VisitorResult}
   *   Where to continue visiting.
   */
  function handler(node, parents, index) {
    const parent = parents[parents.length - 1]
    const find = pairs[pairIndex][0]
    const replace = pairs[pairIndex][1]
    let start = 0
    let change = false
    /** @type {Array<PhrasingContent>} */
    let nodes = []

    find.lastIndex = 0

    let match = find.exec(node.value)

    while (match) {
      const position = match.index
      /** @type {RegExpMatchObject} */
      const matchObject = {
        index: match.index,
        input: match.input,
        stack: [...parents, node]
      }
      let value = replace(...match, matchObject)

      if (typeof value === 'string') {
        value = value.length > 0 ? {type: 'text', value} : undefined
      }

      // It wasn’t a match after all.
      if (value === false) {
        // False acts as if there was no match.
        // So we need to reset `lastIndex`, which currently being at the end of
        // the current match, to the beginning.
        find.lastIndex = position + 1
      } else {
        if (start !== position) {
          add({type: 'text', value: node.value.slice(start, position)})
        }

        if (Array.isArray(value)) {
          for (const child of value) add(child)
        } else if (value) {
          add(value)
        }

        start = position + match[0].length
        change = true
      }

      if (!find.global) {
        break
      }

      match = find.exec(node.value)
    }

    if (change) {
      if (start < node.value.length) {
        add({type: 'text', value: node.value.slice(start)})
      }

      parent.children.splice(index, 1, ...nodes)
    } else {
      nodes = [node]
    }

    return index + nodes.length

    /**
     * Add a node.
     *
     * @param {PhrasingContent} child
     *   Node to add.
     * @returns {undefined}
     *   Nothing.
     */
    function add(child) {
      const previous = nodes[nodes.length - 1]

      if (previous && previous.type === 'text' && child.type === 'text') {
        previous.value += child.value
      } else {
        nodes.push(child)
      }
    }
  }
}

/**
 * Turn a tuple or a list of tuples into pairs.
 *
 * @param {FindAndReplaceList | FindAndReplaceTuple} tupleOrList
 *   Schema.
 * @returns {Pairs}
 *   Clean pairs.
 */
function toPairs(tupleOrList) {
  if (!Array.isArray(tupleOrList)) {
    throw new TypeError('Expected find and replace tuple or list of tuples')
  }

  /** @type {Pairs} */
  const result = []

  const list =
    !tupleOrList[0] || Array.isArray(tupleOrList[0])
      ? /** @type {FindAndReplaceList} */ (tupleOrList)
      : [/** @type {FindAndReplaceTuple} */ (tupleOrList)]

  let index = -1

  while (++index < list.length) {
    const tuple = list[index]
    result.push([toExpression(tuple[0]), toFunction(tuple[1])])
  }

  return result
}

/**
 * Turn a find into an expression.
 *
 * @param {Find} find
 *   Pattern to find.
 * @returns {RegExp}
 *   Global expression.
 */
function toExpression(find) {
  return typeof find === 'string' ? new RegExp((0,escape_string_regexp__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(find), 'g') : find
}

/**
 * Turn a replace into a function.
 *
 * @param {Replace} replace
 *   Thing to replace with.
 * @returns {ReplaceFunction}
 *   Function that returns that thing.
 */
function toFunction(replace) {
  return typeof replace === 'function'
    ? replace
    : function () {
        return replace
      }
}


/***/ }),

/***/ 65880:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $O: () => (/* binding */ _ipv6),
/* harmony export */   $S: () => (/* binding */ _startsWith),
/* harmony export */   Au: () => (/* binding */ _lt),
/* harmony export */   Be: () => (/* binding */ _uuid),
/* harmony export */   Bj: () => (/* binding */ _cuid2),
/* harmony export */   Ct: () => (/* binding */ _ulid),
/* harmony export */   Dl: () => (/* binding */ _nanoid),
/* harmony export */   ER: () => (/* binding */ _endsWith),
/* harmony export */   Eb: () => (/* binding */ _maxLength),
/* harmony export */   Fk: () => (/* binding */ _regex),
/* harmony export */   Fn: () => (/* binding */ _url),
/* harmony export */   G1: () => (/* binding */ _isoDateTime),
/* harmony export */   G8: () => (/* binding */ _never),
/* harmony export */   Hi: () => (/* binding */ _multipleOf),
/* harmony export */   Il: () => (/* binding */ _toLowerCase),
/* harmony export */   KB: () => (/* binding */ _e164),
/* harmony export */   Kn: () => (/* binding */ _isoTime),
/* harmony export */   LK: () => (/* binding */ _int),
/* harmony export */   MB: () => (/* binding */ _superRefine),
/* harmony export */   Mu: () => (/* binding */ _email),
/* harmony export */   Ny: () => (/* binding */ _ipv4),
/* harmony export */   Pw: () => (/* binding */ _xid),
/* harmony export */   Rl: () => (/* binding */ _string),
/* harmony export */   T2: () => (/* binding */ _properties),
/* harmony export */   TL: () => (/* binding */ _slugify),
/* harmony export */   Tx: () => (/* binding */ _gt),
/* harmony export */   Uy: () => (/* binding */ _cidrv4),
/* harmony export */   WN: () => (/* binding */ _trim),
/* harmony export */   YA: () => (/* binding */ _length),
/* harmony export */   Zm: () => (/* binding */ _lte),
/* harmony export */   _L: () => (/* binding */ _boolean),
/* harmony export */   _z: () => (/* binding */ _ksuid),
/* harmony export */   aC: () => (/* binding */ _emoji),
/* harmony export */   bS: () => (/* binding */ _overwrite),
/* harmony export */   cU: () => (/* binding */ _base64url),
/* harmony export */   dR: () => (/* binding */ _includes),
/* harmony export */   dZ: () => (/* binding */ _array),
/* harmony export */   db: () => (/* binding */ _isoDate),
/* harmony export */   em: () => (/* binding */ _unknown),
/* harmony export */   f2: () => (/* binding */ _isoDuration),
/* harmony export */   fU: () => (/* binding */ _refine),
/* harmony export */   fs: () => (/* binding */ _cuid),
/* harmony export */   gP: () => (/* binding */ _cidrv6),
/* harmony export */   hH: () => (/* binding */ _lowercase),
/* harmony export */   lo: () => (/* binding */ _normalize),
/* harmony export */   m9: () => (/* binding */ _minLength),
/* harmony export */   mI: () => (/* binding */ meta),
/* harmony export */   nA: () => (/* binding */ _uuidv4),
/* harmony export */   pY: () => (/* binding */ _uuidv6),
/* harmony export */   q0: () => (/* binding */ describe),
/* harmony export */   qF: () => (/* binding */ _uppercase),
/* harmony export */   qm: () => (/* binding */ _gte),
/* harmony export */   rk: () => (/* binding */ _jwt),
/* harmony export */   rt: () => (/* binding */ _base64),
/* harmony export */   tB: () => (/* binding */ _guid),
/* harmony export */   wA: () => (/* binding */ _uuidv7),
/* harmony export */   xY: () => (/* binding */ _toUpperCase)
/* harmony export */ });
/* unused harmony exports _coercedString, _mac, _creditCard, _iban, TimePrecision, _number, _coercedNumber, _float32, _float64, _int32, _uint32, _coercedBoolean, _bigint, _coercedBigint, _int64, _uint64, _symbol, _undefined, _null, _any, _void, _date, _coercedDate, _nan, _max, _min, _positive, _negative, _nonpositive, _nonnegative, _maxSize, _minSize, _size, _property, _mime, _union, _xor, _discriminatedUnion, _intersection, _tuple, _record, _map, _set, _enum, _nativeEnum, _literal, _file, _transform, _optional, _nullable, _default, _nonoptional, _success, _catch, _pipe, _readonly, _templateLiteral, _lazy, _promise, _custom, _check, _stringbool, _stringFormat */
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74593);
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31711);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68056);




function snapshotChecks(def) {
    if (def.checks)
        def.checks = [...def.checks];
    return def;
}
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
    return new Class(snapshotChecks({ type: "string", ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class, params) {
    return new Class(snapshotChecks({ type: "string", coerce: true, ...util.normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
    return new Class({
        type: "string",
        format: "email",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
    return new Class({
        type: "string",
        format: "guid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v4",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v6",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v7",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
    return new Class({
        type: "string",
        format: "url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
    return new Class({
        type: "string",
        format: "emoji",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
    return new Class({
        type: "string",
        format: "nanoid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link _cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
    return new Class({
        type: "string",
        format: "cuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
    return new Class({
        type: "string",
        format: "cuid2",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
    return new Class({
        type: "string",
        format: "ulid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
    return new Class({
        type: "string",
        format: "xid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
    return new Class({
        type: "string",
        format: "ksuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
    return new Class({
        type: "string",
        format: "ipv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
    return new Class({
        type: "string",
        format: "ipv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class, params) {
    return new Class({
        type: "string",
        format: "mac",
        check: "string_format",
        abort: false,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
    return new Class({
        type: "string",
        format: "base64",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
    return new Class({
        type: "string",
        format: "base64url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
    return new Class({
        type: "string",
        format: "e164",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _creditCard(Class, params) {
    return new Class({
        type: "string",
        format: "credit_card",
        check: "string_format",
        abort: false,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _iban(Class, params) {
    return new Class({
        type: "string",
        format: "iban",
        check: "string_format",
        abort: false,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
    return new Class({
        type: "string",
        format: "jwt",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
const TimePrecision = {
    Any: null,
    Minute: -1,
    Second: 0,
    Millisecond: 3,
    Microsecond: 6,
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
    return new Class({
        type: "string",
        format: "datetime",
        check: "string_format",
        offset: false,
        local: false,
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
    return new Class({
        type: "string",
        format: "date",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
    return new Class({
        type: "string",
        format: "time",
        check: "string_format",
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
    return new Class({
        type: "string",
        format: "duration",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
    return new Class(snapshotChecks({ type: "number", checks: [], ...util.normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class, params) {
    return new Class(snapshotChecks({ type: "number", coerce: true, checks: [], ...util.normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "safeint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float32",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float64",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "int32",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "uint32",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
    return new Class({
        type: "boolean",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class, params) {
    return new Class({
        type: "boolean",
        coerce: true,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class, params) {
    return new Class({
        type: "bigint",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class, params) {
    return new Class({
        type: "bigint",
        coerce: true,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "int64",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "uint64",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class, params) {
    return new Class({
        type: "symbol",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _undefined(Class, params) {
    return new Class({
        type: "undefined",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _null(Class, params) {
    return new Class({
        type: "null",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _any(Class) {
    return new Class({
        type: "any",
    });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
    return new Class({
        type: "unknown",
    });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
    return new Class({
        type: "never",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _void(Class, params) {
    return new Class({
        type: "void",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _date(Class, params) {
    return new Class({
        type: "date",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class, params) {
    return new Class({
        type: "date",
        coerce: true,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class, params) {
    return new Class({
        type: "nan",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckLessThan */ .sm({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        value,
        inclusive: false,
    });
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckLessThan */ .sm({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        value,
        inclusive: true,
    });
}

// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckGreaterThan */ .J_({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        value,
        inclusive: false,
    });
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckGreaterThan */ .J_({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        value,
        inclusive: true,
    });
}

// @__NO_SIDE_EFFECTS__
function _positive(params) {
    return _gt(0, params);
}
// negative
// @__NO_SIDE_EFFECTS__
function _negative(params) {
    return _lt(0, params);
}
// nonpositive
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
    return _lte(0, params);
}
// nonnegative
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
    return _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckMultipleOf */ .Jk({
        check: "multiple_of",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        value,
    });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
    return new checks.$ZodCheckMaxSize({
        check: "max_size",
        ...util.normalizeParams(params),
        maximum,
    });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
    return new checks.$ZodCheckMinSize({
        check: "min_size",
        ...util.normalizeParams(params),
        minimum,
    });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
    return new checks.$ZodCheckSizeEquals({
        check: "size_equals",
        ...util.normalizeParams(params),
        size,
    });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckMaxLength */ .Yk({
        check: "max_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        maximum,
    });
    return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckMinLength */ .Kk({
        check: "min_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        minimum,
    });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckLengthEquals */ .RM({
        check: "length_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        length,
    });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckRegex */ .DG({
        check: "string_format",
        format: "regex",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        pattern,
    });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckLowerCase */ .NI({
        check: "string_format",
        format: "lowercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckUpperCase */ .kH({
        check: "string_format",
        format: "uppercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckIncludes */ .Tt({
        check: "string_format",
        format: "includes",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        includes,
    });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckStartsWith */ .J({
        check: "string_format",
        format: "starts_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        prefix,
    });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckEndsWith */ .E6({
        check: "string_format",
        format: "ends_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
        suffix,
    });
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
    return new checks.$ZodCheckProperty({
        check: "property",
        property,
        schema,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _properties(shape, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckProperties */ .nJ({
        check: "properties",
        shape,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
    return new checks.$ZodCheckMimeType({
        check: "mime_type",
        mime: types,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheckOverwrite */ .v$({
        check: "overwrite",
        tx,
    });
}
// normalize
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
    return _overwrite((input) => input.normalize(form));
}
// trim
// @__NO_SIDE_EFFECTS__
function _trim() {
    return _overwrite((input) => input.trim());
}
// toLowerCase
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
    return _overwrite((input) => input.toLowerCase());
}
// toUpperCase
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
    return _overwrite((input) => input.toUpperCase());
}
// slugify
// @__NO_SIDE_EFFECTS__
function _slugify() {
    return _overwrite((input) => _util_js__WEBPACK_IMPORTED_MODULE_0__/* .slugify */ .Yv(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
    return new Class({
        type: "array",
        element,
        // get element() {
        //   return element;
        // },
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _union(Class, options, params) {
    return new Class({
        type: "union",
        options,
        ...util.normalizeParams(params),
    });
}
function _xor(Class, options, params) {
    return new Class({
        type: "union",
        options,
        inclusive: false,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class, discriminator, options, params) {
    return new Class({
        type: "union",
        options: options,
        discriminator,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class, left, right) {
    return new Class({
        type: "intersection",
        left,
        right,
    });
}
// export function _tuple(
//   Class: util.SchemaClass<schemas.$ZodTuple>,
//   items: [],
//   params?: string | $ZodTupleParams
// ): schemas.$ZodTuple<[], null>;
// @__NO_SIDE_EFFECTS__
function _tuple(Class, items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof schemas.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new Class({
        type: "tuple",
        items,
        rest,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _record(Class, keyType, valueType, params) {
    return new Class({
        type: "record",
        keyType,
        valueType,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _map(Class, keyType, valueType, params) {
    return new Class({
        type: "map",
        keyType,
        valueType,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _set(Class, valueType, params) {
    return new Class({
        type: "set",
        valueType,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class, values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    // if (Array.isArray(values)) {
    //   for (const value of values) {
    //     entries[value] = value;
    //   }
    // } else {
    //   Object.assign(entries, values);
    // }
    // const entries: util.EnumLike = {};
    // for (const val of values) {
    //   entries[val] = val;
    // }
    return new Class({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function _nativeEnum(Class, entries, params) {
    return new Class({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class, value, params) {
    return new Class({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _file(Class, params) {
    return new Class({
        type: "file",
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class, fn) {
    return new Class({
        type: "transform",
        transform: fn,
    });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class, innerType) {
    return new Class({
        type: "optional",
        innerType,
    });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class, innerType) {
    return new Class({
        type: "nullable",
        innerType,
    });
}
// @__NO_SIDE_EFFECTS__
function _default(Class, innerType, defaultValue) {
    return new Class({
        type: "default",
        innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
        },
    });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class, innerType, params) {
    return new Class({
        type: "nonoptional",
        innerType,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _success(Class, innerType) {
    return new Class({
        type: "success",
        innerType,
    });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class, innerType, catchValue) {
    return new Class({
        type: "catch",
        innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : util.constantCatch(catchValue)),
    });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class, in_, out) {
    return new Class({
        type: "pipe",
        in: in_,
        out,
    });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class, innerType) {
    return new Class({
        type: "readonly",
        innerType,
    });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class, parts, params) {
    return new Class({
        type: "template_literal",
        parts,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class, getter) {
    return new Class({
        type: "lazy",
        getter,
    });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class, innerType) {
    return new Class({
        type: "promise",
        innerType,
    });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
    const norm = util.normalizeParams(_params);
    norm.abort ?? (norm.abort = true); // default to abort:false
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...norm,
    });
    return schema;
}
// same as _custom but defaults to abort:false
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(_params),
    });
    return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
    const ch = _check((payload) => {
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_0__/* .issue */ .sn(issue, payload.value, ch._zod.def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                if (!("input" in _issue))
                    _issue.input = payload.value;
                _issue.inst ?? (_issue.inst = ch);
                _issue.continue ?? (_issue.continue = !ch._zod.def.abort); // abort is always undefined, so this is always true...
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_0__/* .issue */ .sn(_issue));
            }
        };
        return fn(payload.value, payload);
    }, params);
    return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheck */ .QP({
        check: "custom",
        ..._util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeParams */ .A2(params),
    });
    ch._zod.check = fn;
    return ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheck */ .QP({ check: "describe" });
    ch._zod.onattach = [
        (inst) => {
            const existing = _registries_js__WEBPACK_IMPORTED_MODULE_2__/* .globalRegistry */ .fd.get(inst) ?? {};
            _registries_js__WEBPACK_IMPORTED_MODULE_2__/* .globalRegistry */ .fd.add(inst, { ...existing, description });
        },
    ];
    ch._zod.check = () => { }; // no-op check
    return ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCheck */ .QP({ check: "meta" });
    ch._zod.onattach = [
        (inst) => {
            const existing = _registries_js__WEBPACK_IMPORTED_MODULE_2__/* .globalRegistry */ .fd.get(inst) ?? {};
            _registries_js__WEBPACK_IMPORTED_MODULE_2__/* .globalRegistry */ .fd.add(inst, { ...existing, ...metadata });
        },
    ];
    ch._zod.check = () => { }; // no-op check
    return ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
    const params = util.normalizeParams(_params);
    let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
    let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    if (params.case !== "sensitive") {
        truthyArray = truthyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
        falsyArray = falsyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
    }
    const truthySet = new Set(truthyArray);
    const falsySet = new Set(falsyArray);
    const _Codec = Classes.Codec ?? schemas.$ZodCodec;
    const _Boolean = Classes.Boolean ?? schemas.$ZodBoolean;
    const _String = Classes.String ?? schemas.$ZodString;
    const stringSchema = new _String({ type: "string", error: params.error });
    const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
    const codec = new _Codec({
        type: "pipe",
        in: stringSchema,
        out: booleanSchema,
        transform: ((input, payload) => {
            let data = input;
            if (params.case !== "sensitive")
                data = data.toLowerCase();
            if (truthySet.has(data)) {
                return true;
            }
            else if (falsySet.has(data)) {
                return false;
            }
            else {
                payload.issues.push({
                    code: "invalid_value",
                    expected: "stringbool",
                    values: [...truthySet, ...falsySet],
                    input: payload.value,
                    inst: codec,
                    continue: false,
                });
                return {};
            }
        }),
        reverseTransform: ((input, _payload) => {
            if (input === true) {
                return truthyArray[0] || "true";
            }
            else {
                return falsyArray[0] || "false";
            }
        }),
        error: params.error,
    });
    codec._zod.bag.truthy = truthyArray;
    codec._zod.bag.falsy = falsyArray;
    codec._zod.bag.case = params.case ?? "insensitive";
    return codec;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
    const params = util.normalizeParams(_params);
    const def = {
        check: "string_format",
        type: "string",
        format,
        fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
        ...params,
    };
    if (fnOrRegex instanceof RegExp) {
        def.pattern = fnOrRegex;
    }
    const inst = new Class(def);
    return inst;
}


/***/ }),

/***/ 66175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ checkStrong)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred strong option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['strong'], null | undefined>}
 *   Preferred strong marker.
 */
function checkStrong(state) {
  const marker = state.options.strong || '*'

  if (marker !== '*' && marker !== '_') {
    throw new Error(
      'Cannot serialize strong with `' +
        marker +
        '` for `options.strong`, expected `*`, or `_`'
    )
  }

  return marker
}


/***/ }),

/***/ 67003:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ formatCodeAsIndented)
/* harmony export */ });
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Code} from 'mdast'
 */

/**
 * Checks if a code block can be formatted as an indented code block.
 *
 * @param {Code} node
 *   Node to check.
 * @param {State} state
 *   Info passed around.
 * @returns {boolean}
 *   Whether the code can be formatted as an indented code block.
 */
function formatCodeAsIndented(node, state) {
  return Boolean(
    state.options.fences === false &&
    node.value &&
    // If there’s no info…
    !node.lang &&
    // And there’s a non-whitespace character…
    /[^\n\r ]/.test(node.value) &&
    // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(node.value)
  )
}


/***/ }),

/***/ 67623:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ emphasis)
/* harmony export */ });
/* harmony import */ var _util_check_emphasis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21086);
/* harmony import */ var _util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5195);
/**
 * @import {AttentionInfo, Info, State} from 'mdast-util-to-markdown'
 * @import {Emphasis, Parents} from 'mdast'
 */




emphasis.attention = attention
emphasis.peek = peek

/**
 * Serialize an emphasis node.
 *
 * Attention is properly handled by `containerPhrasing`.
 *
 * @param {Emphasis} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function emphasis(node, _, state, info) {
  const exit = state.enter('phrasing')
  const item = (0,_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__/* .attentionItem */ .mx)(node, attention, state, state.createTracker(info))
  const value = (0,_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__/* .serialize */ .lK)([item], info.before, info.after)
  exit()
  return value
}

/**
 * Serialize an emphasis node as attention.
 *
 * @param {Emphasis} _
 *   Node to serialize.
 * @param {State} state
 *   Info passed around.
 * @returns {AttentionInfo}
 *   Info on how to serialize the node.
 */
function attention(_, state) {
  const marker = (0,_util_check_emphasis_js__WEBPACK_IMPORTED_MODULE_1__/* .checkEmphasis */ .b)(state)
  return {
    construct: 'emphasis',
    markers: marker === '*' ? ['*', '_'] : ['_', '*'],
    sizes: [1]
  }
}

/**
 * Peek at this node.
 *
 * @param {Emphasis} _
 *   Node to serialize.
 * @param {Parents | undefined} _1
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @returns {string}
 *   Start of the serialized markdown.
 */
function peek(_, _1, state) {
  return state.options.emphasis || '*'
}


/***/ }),

/***/ 68056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A2: () => (/* binding */ normalizeParams),
/* harmony export */   B7: () => (/* binding */ stringifyPrimitive),
/* harmony export */   GW: () => (/* binding */ parsedType),
/* harmony export */   Gv: () => (/* binding */ isObject),
/* harmony export */   LG: () => (/* binding */ floatSafeRemainder),
/* harmony export */   MO: () => (/* binding */ rawShape),
/* harmony export */   NM: () => (/* binding */ optionalKeys),
/* harmony export */   NR: () => (/* binding */ BIGINT_FORMAT_RANGES),
/* harmony export */   O7: () => (/* binding */ codePointLength),
/* harmony export */   OH: () => (/* binding */ partial),
/* harmony export */   PO: () => (/* binding */ cached),
/* harmony export */   QH: () => (/* binding */ aborted),
/* harmony export */   Qd: () => (/* binding */ isPlainObject),
/* harmony export */   Rc: () => (/* binding */ getLengthableOrigin),
/* harmony export */   SS: () => (/* binding */ constantCatch),
/* harmony export */   UQ: () => (/* binding */ esc),
/* harmony export */   Up: () => (/* binding */ pick),
/* harmony export */   Vy: () => (/* binding */ assignProp),
/* harmony export */   W0: () => (/* binding */ safeExtend),
/* harmony export */   X: () => (/* binding */ installLazyProp),
/* harmony export */   X$: () => (/* binding */ extend),
/* harmony export */   Yv: () => (/* binding */ slugify),
/* harmony export */   cJ: () => (/* binding */ omit),
/* harmony export */   cl: () => (/* binding */ nullish),
/* harmony export */   d3: () => (/* binding */ attachSchema),
/* harmony export */   gx: () => (/* binding */ captureStackTrace),
/* harmony export */   h1: () => (/* binding */ merge),
/* harmony export */   hI: () => (/* binding */ allowsEval),
/* harmony export */   hi: () => (/* binding */ sizeCaps),
/* harmony export */   iR: () => (/* binding */ finalizeIssue),
/* harmony export */   jD: () => (/* binding */ hide),
/* harmony export */   jw: () => (/* binding */ joinValues),
/* harmony export */   k8: () => (/* binding */ jsonStringifyReplacer),
/* harmony export */   lQ: () => (/* binding */ prefixIssues),
/* harmony export */   mw: () => (/* binding */ required),
/* harmony export */   o8: () => (/* binding */ clone),
/* harmony export */   ol: () => (/* binding */ members),
/* harmony export */   p6: () => (/* binding */ cleanRegex),
/* harmony export */   qQ: () => (/* binding */ propertyKeyTypes),
/* harmony export */   qh: () => (/* binding */ own),
/* harmony export */   rL: () => (/* binding */ explicitlyAborted),
/* harmony export */   sD: () => (/* binding */ escapeRegex),
/* harmony export */   sn: () => (/* binding */ issue),
/* harmony export */   un: () => (/* binding */ derived),
/* harmony export */   v5: () => (/* binding */ defineLazyInternal),
/* harmony export */   w5: () => (/* binding */ getEnumValues),
/* harmony export */   yG: () => (/* binding */ shallowClone),
/* harmony export */   zH: () => (/* binding */ NUMBER_FORMAT_RANGES),
/* harmony export */   zM: () => (/* binding */ mergeDefs)
/* harmony export */ });
/* unused harmony exports assertEqual, assertNotEqual, toZod, assertIs, assertNever, assert, defineLazy, objectClone, cloneDef, getElementAtPath, promiseAllObject, randomString, numKeys, getParsedType, primitiveTypes, createTransparentProxy, unwrapMessage, getSizableOrigin, cleanEnum, base64ToUint8Array, uint8ArrayToBase64, base64urlToUint8Array, uint8ArrayToBase64url, hexToUint8Array, uint8ArrayToHex, Class, CONSTANT_CATCH */
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55503);

// functions
function assertEqual(val) {
    return val;
}
function assertNotEqual(val) {
    return val;
}
function toZod() {
    return (schema) => schema;
}
function assertIs(_arg) { }
function assertNever(_x) {
    throw new Error("Unexpected value in exhaustive check");
}
function assert(_) { }
function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    const values = Object.entries(entries)
        .filter(([k, _]) => numericValues.indexOf(+k) === -1)
        .map(([_, v]) => v);
    return values;
}
function joinValues(array, separator = "|") {
    return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
    if (typeof value === "bigint")
        return value.toString();
    return value;
}
// the accessor lives on a shared prototype: an own accessor makes every box a dictionary-mode object (~360 B and a slow load per read against ~100 B and an inlined getter here)
class Cached {
    constructor(getter) {
        this._getter = getter;
        this._value = undefined;
    }
    get value() {
        const getter = this._getter;
        if (getter !== undefined) {
            this._value = getter();
            this._getter = undefined;
        }
        return this._value;
    }
}
function cached(getter) {
    return new Cached(getter);
}
function nullish(input) {
    return input === null || input === undefined;
}
function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
    const ratio = val / step;
    const roundedRatio = Math.round(ratio);
    // `val` and `step` each round to a double before the division rounds again, so a true decimal multiple's quotient can sit up to 1.5 of these scaled epsilons from the integer. A 1x tolerance therefore rejected 2.03 as a multiple of 0.07; 4x covers the worst case with margin.
    const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
    if (Math.abs(ratio - roundedRatio) < tolerance)
        return 0;
    return ratio - roundedRatio;
}
const EVALUATING = /* @__PURE__*/ (/* unused pure expression or super */ null && (Symbol("evaluating")));
function defineLazy(object, key, getter) {
    let value = undefined;
    Object.defineProperty(object, key, {
        get() {
            if (value === EVALUATING) {
                // Circular reference detected, return undefined to break the cycle
                return undefined;
            }
            if (value === undefined) {
                value = EVALUATING;
                value = getter();
            }
            return value;
        },
        set(v) {
            Object.defineProperty(object, key, {
                value: v,
                // configurable: true,
            });
            // object[key] = v;
        },
        configurable: true,
    });
}
function objectClone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
    Object.defineProperty(target, prop, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}
/**
 * Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
 *
 * Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
 */
function rawShape(def) {
    const desc = Object.getOwnPropertyDescriptor(def, "shape");
    return desc?.get ? desc.get.raw : desc?.value;
}
// where a builder reads its source's keys and descriptors, resolving only a shape a def answers for itself. A shape resolves by object spread, so only its enumerable keys are ever part of it.
function sourceShape(schema) {
    return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
// a key whose value is not settled yet, self-caching so every read after the first gets the same one
function deferProp(target, key, getter) {
    Object.defineProperty(target, key, {
        get() {
            const value = getter();
            assignProp(this, key, value);
            return value;
        },
        enumerable: true,
        configurable: true,
    });
}
// Writes a settled key. A plain assignment is much cheaper than `defineProperty` and produces the same descriptor, but it runs whatever setter already answers to the key — an accessor this shape deferred, or an inherited one, which `__proto__` has on every object and prototype pollution can add for any name.
function putProp(target, key, value) {
    if (key in target)
        assignProp(target, key, value);
    else
        target[key] = value;
}
/**
 * Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
 *
 * A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
 */
function mirrorShape(target, source, keys, wrap) {
    const raw = sourceShape(source);
    for (const key of keys) {
        const desc = Object.getOwnPropertyDescriptor(raw, key);
        if (!desc.enumerable)
            continue;
        if (desc.get) {
            deferProp(target, key, () => {
                const value = source._zod.def.shape[key];
                return wrap ? wrap(value, key) : value;
            });
        }
        else
            putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
    }
}
// same, for a plain shape a caller passed rather than a schema's
function mirrorProps(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        const desc = Object.getOwnPropertyDescriptor(source, key);
        if (!desc.enumerable)
            continue;
        if (desc.get)
            deferProp(target, key, () => source[key]);
        else
            putProp(target, key, desc.value);
    }
}
function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
    return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
    if (!path)
        return obj;
    return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
    const keys = Object.keys(promisesObj);
    const promises = keys.map((key) => promisesObj[key]);
    return Promise.all(promises).then((results) => {
        const resolvedObj = {};
        for (let i = 0; i < keys.length; i++) {
            resolvedObj[keys[i]] = results[i];
        }
        return resolvedObj;
    });
}
function randomString(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function esc(str) {
    return JSON.stringify(str);
}
function slugify(input) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
const captureStackTrace = ("captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => { });
function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = /* @__PURE__*/ cached(() => {
    // Skip the probe under `jitless`: strict CSPs report the caught `new Function` as a `securitypolicyviolation` even though the throw is swallowed.
    if (_core_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.jitless) {
        return false;
    }
    // @ts-ignore
    if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
        return false;
    }
    try {
        const F = Function;
        new F("");
        return true;
    }
    catch (_) {
        return false;
    }
});
function isPlainObject(o) {
    if (isObject(o) === false)
        return false;
    // modified constructor
    const ctor = o.constructor;
    if (ctor === undefined)
        return true;
    if (typeof ctor !== "function")
        return true;
    // modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false)
        return false;
    // ctor doesn't have static `isPrototypeOf`
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    return true;
}
function shallowClone(o) {
    if (isPlainObject(o))
        return { ...o };
    if (Array.isArray(o))
        return [...o];
    if (o instanceof Map)
        return new Map(o);
    if (o instanceof Set)
        return new Set(o);
    return o;
}
function numKeys(data) {
    let keyCount = 0;
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            keyCount++;
        }
    }
    return keyCount;
}
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return "undefined";
        case "string":
            return "string";
        case "number":
            return Number.isNaN(data) ? "nan" : "number";
        case "boolean":
            return "boolean";
        case "function":
            return "function";
        case "bigint":
            return "bigint";
        case "symbol":
            return "symbol";
        case "object":
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return "promise";
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return "map";
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return "set";
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return "date";
            }
            // @ts-ignore
            if (typeof File !== "undefined" && data instanceof File) {
                return "file";
            }
            return "object";
        default:
            throw new Error(`Unknown data type: ${t}`);
    }
};
const propertyKeyTypes = /* @__PURE__*/ new Set(["string", "number", "symbol"]);
const primitiveTypes = /* @__PURE__*/ new Set([
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol",
    "undefined",
]);
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// zod-specific utils
function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
        cl._zod.parent = inst;
    return cl;
}
function normalizeParams(_params) {
    const params = _params;
    if (!params)
        return {};
    if (typeof params === "string")
        return { error: () => params };
    if (params?.message !== undefined) {
        if (params?.error !== undefined)
            throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
        return { ...params, error: () => params.error };
    return params;
}
function createTransparentProxy(getter) {
    let target;
    return new Proxy({}, {
        get(_, prop, receiver) {
            target ?? (target = getter());
            return Reflect.get(target, prop, receiver);
        },
        set(_, prop, value, receiver) {
            target ?? (target = getter());
            return Reflect.set(target, prop, value, receiver);
        },
        has(_, prop) {
            target ?? (target = getter());
            return Reflect.has(target, prop);
        },
        deleteProperty(_, prop) {
            target ?? (target = getter());
            return Reflect.deleteProperty(target, prop);
        },
        ownKeys(_) {
            target ?? (target = getter());
            return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(_, prop) {
            target ?? (target = getter());
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(_, prop, descriptor) {
            target ?? (target = getter());
            return Reflect.defineProperty(target, prop, descriptor);
        },
    });
}
function stringifyPrimitive(value) {
    if (typeof value === "bigint")
        return value.toString() + "n";
    if (typeof value === "string")
        return `"${value}"`;
    return `${value}`;
}
function optionalKeys(shape) {
    return Object.keys(shape).filter((k) => {
        return shape[k]._zod.optin !== undefined && shape[k]._zod.optout === "optional";
    });
}
// Wrapped in a `@__PURE__` IIFE: esbuild never tree-shakes a top-level initializer that contains a member access on `Number`, so the bare object literal survived into every bundle.
const NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-3.4028234663852886e38, 3.4028234663852886e38],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
}))();
const BIGINT_FORMAT_RANGES = {
    int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
    uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")],
};
function pick(schema, mask) {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        throw new Error(".pick() cannot be used on object schemas containing refinements");
    }
    const newShape = {};
    mirrorShape(newShape, schema, maskedKeys(schema, mask));
    return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
// the mask keys that select something, checked against the source's shape without resolving it
function maskedKeys(schema, mask) {
    const raw = sourceShape(schema);
    const keys = [];
    // `for...in` skips symbols, so a symbol in the mask would select nothing
    for (const key of Reflect.ownKeys(mask)) {
        if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) {
            throw new Error(`Unrecognized key: "${String(key)}"`);
        }
        if (mask[key])
            keys.push(key);
    }
    return keys;
}
function omit(schema, mask) {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        throw new Error(".omit() cannot be used on object schemas containing refinements");
    }
    const omitted = new Set(maskedKeys(schema, mask));
    const newShape = {};
    mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
    return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to extend: expected a plain object");
    }
    const checks = schema._zod.def.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        // Only throw if new shape overlaps with existing shape. Use getOwnPropertyDescriptor to check key existence without accessing values
        const existingShape = sourceShape(schema);
        for (const key of Reflect.ownKeys(shape)) {
            if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
                throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
            }
        }
    }
    return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
// the source's keys, then the caller's overlaid on top
function extended(schema, shape) {
    const newShape = {};
    mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
    mirrorProps(newShape, shape);
    return newShape;
}
function safeExtend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to safeExtend: expected a plain object");
    }
    return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
    if (!b?._zod?.def) {
        throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
    }
    if (a._zod.def.checks?.length) {
        throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
    }
    const newShape = {};
    mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
    mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
    const def = mergeDefs(a._zod.def, {
        shape: newShape,
        get catchall() {
            return b._zod.def.catchall;
        },
        checks: b._zod.def.checks ?? [],
    });
    return clone(a, def);
}
function partial(Class, schema, mask, name = "partial") {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
    }
    const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
    const newShape = {};
    mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class &&
        ((value, key) => (selected && !selected.has(key) ? value : new Class({ type: "optional", innerType: value }))));
    return clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class, schema, mask) {
    const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
    const newShape = {};
    mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => 
    // overwrite with non-optional
    selected && !selected.has(key) ? value : new Class({ type: "nonoptional", innerType: value }));
    return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
// invalid_type | too_big | too_small | invalid_format | not_multiple_of | unrecognized_keys | invalid_union | invalid_key | invalid_element | invalid_value | custom
function aborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
            return true;
        }
    }
    return false;
}
// Checks for explicit abort (continue === false), as opposed to implicit abort (continue === undefined). Used to respect `abort: true` in .refine() even for checks that have a `when` function.
function explicitlyAborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue === false) {
            return true;
        }
    }
    return false;
}
function prefixIssues(path, issues) {
    return issues.map((iss) => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
    });
}
function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
}
/* A check holds no link back to the schema it is attached to — the same check instance is shared by every clone of that schema — so the owner is stamped onto the issues a check just raised, at the only point where both are in scope. Runs on the failure path only; `start` is the issue count from before the check ran. */
/** The leading size checks of `defChecks` that set an upper bound, each paired with it. */
function sizeCaps(defChecks) {
    const caps = [];
    for (const ch of defChecks ?? []) {
        const d = ch._zod.def;
        // a later check may rewrite the value
        if (!/_(length|size)$|_equals$/.test(d.check))
            break;
        const max = d.maximum ?? d.length ?? d.size;
        if (max >= 0)
            caps.push([max, ch]);
    }
    return caps;
}
function attachSchema(issues, start, inst) {
    var _a;
    for (let i = start; i < issues.length; i++) {
        (_a = issues[i]).schema ?? (_a.schema = inst);
    }
}
function finalizeIssue(iss, ctx, config) {
    var _a;
    // A schema that raised an issue itself owns it outright, and outranks any stamp an enclosing check left in `attachSchema`. String formats and z.custom() are schema and check at once, so when they act as a check they defer to that stamp instead.
    const traits = iss.inst?._zod?.traits;
    if (traits?.has("$ZodType")) {
        if (traits.has("$ZodCheck"))
            (_a = iss).schema ?? (_a.schema = iss.inst);
        else
            iss.schema = iss.inst;
    }
    // Decreasing specificity, first map to return a message wins. `inst` is whatever raised the issue, so a check's own map outranks the owning schema's.
    const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : undefined;
    const message = iss.message
        ? iss.message
        : (unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(schemaError?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            "Invalid input");
    // an explicit own-key copy beats object rest with excluded keys, which v8 routes through a generic runtime call; Object.keys rather than for-in so an issue pushed with a prototype does not leak inherited keys, and an own __proto__ key is dropped rather than assigned through the setter
    const full = {};
    for (const k of Object.keys(iss)) {
        if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__")
            continue;
        full[k] = iss[k];
    }
    full.path ?? (full.path = []);
    full.message = message;
    if (ctx?.reportInput) {
        full.input = iss.input;
    }
    return full;
}
function getSizableOrigin(input) {
    if (input instanceof Set)
        return "set";
    if (input instanceof Map)
        return "map";
    // @ts-ignore
    if (input instanceof File)
        return "file";
    return "unknown";
}
const highSurrogate = /[\uD800-\uDBFF]/;
// Code points in `str`: a surrogate pair counts once, a lone surrogate as itself. Hand-rolled because the string iterator allocates and runs ~250x slower on this path; the regex probe exits ~50x quicker for a string with no astral characters.
function codePointLength(str) {
    const units = str.length;
    if (!highSurrogate.test(str))
        return units;
    let count = units;
    for (let i = 0; i < units - 1; i++) {
        if ((str.charCodeAt(i) & 0xfc00) === 0xd800 && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            count--;
            i++;
        }
    }
    return count;
}
function getLengthableOrigin(input) {
    if (Array.isArray(input))
        return "array";
    if (typeof input === "string")
        return "string";
    return "unknown";
}
function parsedType(data) {
    const t = typeof data;
    switch (t) {
        case "number": {
            return Number.isNaN(data) ? "nan" : "number";
        }
        case "object": {
            if (data === null) {
                return "null";
            }
            if (Array.isArray(data)) {
                return "array";
            }
            const obj = data;
            if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
                return obj.constructor.name;
            }
        }
    }
    return t;
}
function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
        return {
            message: iss,
            code: "custom",
            input,
            inst,
        };
    }
    return { ...iss };
}
function cleanEnum(obj) {
    return Object.entries(obj)
        .filter(([k, _]) => {
        // return true if NaN, meaning it's not a number, thus a string key
        return Number.isNaN(Number.parseInt(k, 10));
    })
        .map((el) => el[1]);
}
// Codec utility functions
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
function uint8ArrayToBase64(bytes) {
    let binaryString = "";
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
    return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
    const cleanHex = hex.replace(/^0x/, "");
    if (cleanHex.length % 2 !== 0) {
        throw new Error("Invalid hex string length");
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
}
function uint8ArrayToHex(bytes) {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
// instanceof
class Class {
    constructor(..._args) { }
}
//////////    PROTOTYPE INSTALLERS     //////////
//
// Members live on the prototype and materialize per instance on first read, which keeps own-property count under the step where V8 stops using inline slots. Changing anything here means re-measuring runtime, memory and bundle size together — see "The three axes" in AGENTS.md.
/**
 * Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
 *
 * Call this from a `proto` initializer, which runs once per prototype — never per instance.
 */
function members(proto, table) {
    for (const key in table) {
        const desc = Object.getOwnPropertyDescriptor(table, key);
        // a getter installs as written, so it stays live: `description` reads through to the registry on every access. not enumerable: an object literal's is, and a prototype member never was
        if (desc.get)
            Object.defineProperty(proto, key, { ...desc, enumerable: false });
        // a method materializes bound on first read, which is what keeps a detached member working: `const opt = schema.optional; opt()`
        else
            defineBound(proto, key, desc.value);
    }
}
/** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
function own(inst, key, value, enumerable = true) {
    Object.defineProperty(inst, key, { configurable: true, writable: true, enumerable, value });
    return value;
}
/** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
function hide(inst, key, value) {
    return own(inst, key, value, false);
}
/** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
function derived(computes, table) {
    for (const key in computes) {
        const compute = computes[key];
        // an object literal's accessor is configurable and enumerable, and `members` copies the descriptor as written
        Object.defineProperty(table, key, {
            configurable: true,
            enumerable: true,
            get() {
                return own(this, key, compute(this));
            },
            set(value) {
                own(this, key, value);
            },
        });
    }
    return table;
}
function defineBound(proto, key, fn) {
    Object.defineProperty(proto, key, {
        configurable: true,
        get() {
            // vitest's spyOn calls a prototype getter bare to find the function it wraps, so a nullish receiver answers the raw method
            return this == null ? fn : own(this, key, fn.bind(this));
        },
        set(value) {
            own(this, key, value);
        },
    });
}
/** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
function claim(inst, sentinel) {
    const proto = Object.getPrototypeOf(inst);
    // Runs on every construction, so `in` rather than the costlier `hasOwnProperty.call`. Sentinels are keys the group itself defines.
    return sentinel in proto ? undefined : proto;
}
// The internals whose init chain is installing. A second call for the same one is a derived constructor overriding its base, so it must not construct another schema in between or the override is dropped.
let installing;
// Set while a getter is running, so a value that resolved through a recursion break is not memoized. One shared descriptor shadows the key for the duration, which costs no per-key allocation.
let broke = false;
const breaker = {
    configurable: true,
    get() {
        broke = true;
        return undefined;
    },
};
/**
 * Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
 * constructor, computed from the internals object itself and cached there on
 * first read. One accessor per constructor rather than one per instance.
 */
function defineLazyInternal(inst, key, compute) {
    const proto = Object.getPrototypeOf(inst._zod);
    if (key in proto && installing !== inst._zod) {
        // A repeat construction: everything is installed already. Cleared here so the reference is not held past the first construction of every type.
        installing = undefined;
        return;
    }
    installing = inst._zod;
    Object.defineProperty(proto, key, {
        configurable: true,
        get() {
            // Shadowed before computing so a re-entrant read from a recursive schema resolves to undefined instead of running the getter again.
            Object.defineProperty(this, key, breaker);
            const outer = broke;
            broke = false;
            try {
                const value = compute(this);
                // A result that resolved through a recursion break is recomputed once the graph is complete; everything else memoizes, undefined included.
                if (broke)
                    delete this[key];
                else
                    Object.defineProperty(this, key, { configurable: true, writable: true, value });
                broke = broke || outer;
                return value;
            }
            catch (err) {
                // A compute that threw memoizes nothing, so a later read runs it again and fails the same way. The shadow goes with it, since leaving it installed would answer undefined for every later read.
                delete this[key];
                broke = broke || outer;
                throw err;
            }
        },
        set(value) {
            Object.defineProperty(this, key, { configurable: true, writable: true, value });
        },
    });
}
/**
 * Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
 * data property. One accessor per constructor rather than one per instance, because an own accessor
 * puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
 */
function installLazyProp(inst, key, make, enumerable) {
    const proto = claim(inst, key);
    if (!proto)
        return;
    Object.defineProperty(proto, key, {
        configurable: true,
        get() {
            // Shadowed before computing, so a re-entrant read from a self-referential shape resolves to undefined instead of running the getter again. A data property rather than an accessor: an own accessor is the dictionary-mode transition this exists to avoid.
            const desc = { configurable: true, writable: true, enumerable, value: undefined };
            Object.defineProperty(this, key, desc);
            // a compute that throws leaves the shadow behind, so later reads answer undefined instead of re-throwing; `defineLazy` did the same, and `defineLazyInternal`'s delete-on-catch would cost bytes in every bundle for a case only a throwing user getter reaches
            desc.value = make(this);
            Object.defineProperty(this, key, desc);
            return desc.value;
        },
        set(value) {
            Object.defineProperty(this, key, { configurable: true, writable: true, enumerable, value });
        },
    });
}
/** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
const CONSTANT_CATCH = "~constantCatch";
/** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
function constantCatch(value) {
    const fn = () => value;
    fn[CONSTANT_CATCH] = true;
    return fn;
}


/***/ }),

/***/ 70105:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ThumbsDown)
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
    name: "thumbs-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
                key: "m61m77"
            }
        ],
        [
            "path",
            {
                d: "M17 14V2",
                key: "8ymqnk"
            }
        ]
    ]
};
__iconData.node;
const ThumbsDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=thumbs-down.mjs.map


/***/ }),

/***/ 72563:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ listItem)
/* harmony export */ });
/* harmony import */ var _util_check_bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16080);
/* harmony import */ var _util_check_list_item_indent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55249);
/**
 * @import {Info, Map, State} from 'mdast-util-to-markdown'
 * @import {ListItem, Parents} from 'mdast'
 */




/**
 * Serialize a list item node.
 *
 * @param {ListItem} node
 *   Node to serialize.
 * @param {Parents | undefined} parent
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function listItem(node, parent, state, info) {
  const listItemIndent = (0,_util_check_list_item_indent_js__WEBPACK_IMPORTED_MODULE_0__/* .checkListItemIndent */ .s)(state)
  let bullet = state.bulletCurrent || (0,_util_check_bullet_js__WEBPACK_IMPORTED_MODULE_1__/* .checkBullet */ .d)(state)

  // Add the marker value for ordered lists.
  if (parent && parent.type === 'list' && parent.ordered) {
    bullet =
      (typeof parent.start === 'number' && parent.start > -1
        ? parent.start
        : 1) +
      (state.options.incrementListMarker === false
        ? 0
        : parent.children.indexOf(node)) +
      bullet
  }

  let size = bullet.length + 1

  if (
    listItemIndent === 'tab' ||
    (listItemIndent === 'mixed' &&
      ((parent && parent.type === 'list' && parent.spread) || node.spread))
  ) {
    size = Math.ceil(size / 4) * 4
  }

  const tracker = state.createTracker(info)
  tracker.move(bullet + ' '.repeat(size - bullet.length))
  tracker.shift(size)
  const exit = state.enter('listItem')
  const value = state.indentLines(
    state.containerFlow(node, tracker.current()),
    map
  )
  exit()

  return value

  /**
   * Indent lines of the list item.
   *
   * @type {Map}
   */
  function map(line, index, blank) {
    if (index) {
      return (blank ? '' : ' '.repeat(size)) + line
    }

    return (blank ? bullet : bullet + ' '.repeat(size - bullet.length)) + line
  }
}


/***/ }),

/***/ 73206:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ gfmTaskListItem)
/* harmony export */ });
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62835);
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4294);
/**
 * @import {Extension, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */



const tasklistCheck = {
  name: 'tasklistCheck',
  tokenize: tokenizeTasklistCheck
};

/**
 * Create an HTML extension for `micromark` to support GFM task list items
 * syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GFM task list items when serializing to HTML.
 */
function gfmTaskListItem() {
  return {
    text: {
      [91]: tasklistCheck
    }
  };
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeTasklistCheck(effects, ok, nok) {
  const self = this;
  return open;

  /**
   * At start of task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *       ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (
    // Exit if there’s stuff before.
    self.previous !== null ||
    // Exit if not in the first content that is the first child of a list
    // item.
    !self._gfmTasklistFirstContentOfListItem) {
      return nok(code);
    }
    effects.enter('taskListCheck');
    effects.enter('taskListCheckMarker');
    effects.consume(code);
    effects.exit('taskListCheckMarker');
    return inside;
  }

  /**
   * In task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *        ^
   * ```
   *
   * @type {State}
   */
  function inside(code) {
    // Currently we match how GH works in files.
    // To match how GH works in comments, use `markdownSpace` (`[\t ]`) instead
    // of `markdownLineEndingOrSpace` (`[\t\n\r ]`).
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      effects.enter('taskListCheckValueUnchecked');
      effects.consume(code);
      effects.exit('taskListCheckValueUnchecked');
      return close;
    }
    if (code === 88 || code === 120) {
      effects.enter('taskListCheckValueChecked');
      effects.consume(code);
      effects.exit('taskListCheckValueChecked');
      return close;
    }
    return nok(code);
  }

  /**
   * At close of task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *         ^
   * ```
   *
   * @type {State}
   */
  function close(code) {
    if (code === 93) {
      effects.enter('taskListCheckMarker');
      effects.consume(code);
      effects.exit('taskListCheckMarker');
      effects.exit('taskListCheck');
      return after;
    }
    return nok(code);
  }

  /**
   * @type {State}
   */
  function after(code) {
    // EOL in paragraph means there must be something else after it.
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEnding */ .HP)(code)) {
      return ok(code);
    }

    // Space or tab?
    // Check what comes after.
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      return effects.check({
        tokenize: spaceThenNonSpace
      }, ok, nok)(code);
    }

    // EOF, or non-whitespace, both wrong.
    return nok(code);
  }
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function spaceThenNonSpace(effects, ok, nok) {
  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, after, "whitespace");

  /**
   * After whitespace, after task list item check.
   *
   * ```markdown
   * > | * [x] y.
   *           ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    // EOF means there was nothing, so bad.
    // EOL means there’s content after it, so good.
    // Impossible to have more spaces.
    // Anything else is good.
    return code === null ? nok(code) : ok(code);
  }
}

/***/ }),

/***/ 74284:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ gfmTaskListItemToMarkdown),
/* harmony export */   S: () => (/* binding */ gfmTaskListItemFromMarkdown)
/* harmony export */ });
/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23091);
/* harmony import */ var mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6563);
/**
 * @typedef {import('mdast').ListItem} ListItem
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 */




/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM task
 * list items in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown` to enable GFM task list items.
 */
function gfmTaskListItemFromMarkdown() {
  return {
    exit: {
      taskListCheckValueChecked: exitCheck,
      taskListCheckValueUnchecked: exitCheck,
      paragraph: exitParagraphWithTaskListItem
    }
  }
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM task list
 * items in markdown.
 *
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM task list items.
 */
function gfmTaskListItemToMarkdown() {
  return {
    unsafe: [{atBreak: true, character: '-', after: '[:|-]'}],
    handlers: {listItem: listItemWithTaskListItem}
  }
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitCheck(token) {
  // We’re always in a paragraph, in a list item.
  const node = this.stack[this.stack.length - 2]
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'listItem')
  node.checked = token.type === 'taskListCheckValueChecked'
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitParagraphWithTaskListItem(token) {
  const parent = this.stack[this.stack.length - 2]

  if (
    parent &&
    parent.type === 'listItem' &&
    typeof parent.checked === 'boolean'
  ) {
    const node = this.stack[this.stack.length - 1]
    ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'paragraph')
    const head = node.children[0]

    if (head && head.type === 'text') {
      const siblings = parent.children
      let index = -1
      /** @type {Paragraph | undefined} */
      let firstParaghraph

      while (++index < siblings.length) {
        const sibling = siblings[index]
        if (sibling.type === 'paragraph') {
          firstParaghraph = sibling
          break
        }
      }

      if (firstParaghraph === node) {
        // Must start with a space or a tab.
        head.value = head.value.slice(1)

        if (head.value.length === 0) {
          node.children.shift()
        } else if (
          node.position &&
          head.position &&
          typeof head.position.start.offset === 'number'
        ) {
          head.position.start.column++
          head.position.start.offset++
          node.position.start = Object.assign({}, head.position.start)
        }
      }
    }
  }

  this.exit(token)
}

/**
 * @type {ToMarkdownHandle}
 * @param {ListItem} node
 */
function listItemWithTaskListItem(node, parent, state, info) {
  const head = node.children[0]
  const checkable =
    typeof node.checked === 'boolean' && head && head.type === 'paragraph'
  const checkbox = '[' + (node.checked ? 'x' : ' ') + '] '
  const tracker = state.createTracker(info)

  if (checkable) {
    tracker.move(checkbox)
  }

  let value = mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_1__/* .handle */ .p.listItem(node, parent, state, {
    ...info,
    ...tracker.current()
  })

  if (checkable) {
    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check)
  }

  return value

  /**
   * @param {string} $0
   * @returns {string}
   */
  function check($0) {
    return $0 + checkbox
  }
}


/***/ }),

/***/ 74593:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DG: () => (/* binding */ $ZodCheckRegex),
/* harmony export */   E6: () => (/* binding */ $ZodCheckEndsWith),
/* harmony export */   J: () => (/* binding */ $ZodCheckStartsWith),
/* harmony export */   J_: () => (/* binding */ $ZodCheckGreaterThan),
/* harmony export */   Jk: () => (/* binding */ $ZodCheckMultipleOf),
/* harmony export */   KH: () => (/* binding */ $ZodCheckNumberFormat),
/* harmony export */   Kk: () => (/* binding */ $ZodCheckMinLength),
/* harmony export */   NI: () => (/* binding */ $ZodCheckLowerCase),
/* harmony export */   QP: () => (/* binding */ $ZodCheck),
/* harmony export */   RM: () => (/* binding */ $ZodCheckLengthEquals),
/* harmony export */   Tt: () => (/* binding */ $ZodCheckIncludes),
/* harmony export */   Yk: () => (/* binding */ $ZodCheckMaxLength),
/* harmony export */   kH: () => (/* binding */ $ZodCheckUpperCase),
/* harmony export */   nJ: () => (/* binding */ $ZodCheckProperties),
/* harmony export */   ql: () => (/* binding */ $ZodCheckStringFormat),
/* harmony export */   sm: () => (/* binding */ $ZodCheckLessThan),
/* harmony export */   v$: () => (/* binding */ $ZodCheckOverwrite)
/* harmony export */ });
/* unused harmony exports $ZodCheckBigIntFormat, $ZodCheckMaxSize, $ZodCheckMinSize, $ZodCheckSizeEquals, $ZodCheckProperty, $ZodCheckMimeType */
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55503);
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9459);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68056);
// import { $ZodType } from "./schemas.js";



const $ZodCheck = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheck", (inst, def) => {
    var _a;
    inst._zod ?? (inst._zod = {});
    inst._zod.def = def;
    (_a = inst._zod).onattach ?? (_a.onattach = []);
});
/** Default `when` for size-based checks: run only on non-nullish values with a `size`. */
const _whenHasSize = (payload) => {
    const val = payload.value;
    return !util.nullish(val) && val.size !== undefined;
};
/** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
const _whenHasLength = (payload) => {
    const val = payload.value;
    return !_util_js__WEBPACK_IMPORTED_MODULE_1__/* .nullish */ .cl(val) && val.length !== undefined;
};
const numericOriginMap = {
    number: "number",
    bigint: "bigint",
    object: "date",
};
const $ZodCheckLessThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckLessThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
            return;
        }
        payload.issues.push({
            origin: numericOriginMap[typeof payload.value] ?? origin,
            code: "too_big",
            maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckGreaterThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckGreaterThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
            return;
        }
        payload.issues.push({
            origin: numericOriginMap[typeof payload.value] ?? origin,
            code: "too_small",
            minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMultipleOf = 
/*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckMultipleOf", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        if (typeof payload.value !== typeof def.value)
            throw new Error("Cannot mix number and bigint in multiple_of check.");
        const isMultiple = typeof payload.value === "bigint"
            ? // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
                def.value !== BigInt(0) && payload.value % def.value === BigInt(0)
            : _util_js__WEBPACK_IMPORTED_MODULE_1__/* .floatSafeRemainder */ .LG(payload.value, def.value) === 0;
        if (isMultiple)
            return;
        payload.issues.push({
            origin: typeof payload.value,
            code: "not_multiple_of",
            divisor: def.value,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckNumberFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    def.format = def.format || "float64";
    const isInt = def.format?.includes("int");
    const origin = isInt ? "int" : "number";
    const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_1__/* .NUMBER_FORMAT_RANGES */ .zH[def.format];
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (isInt) {
            if (!Number.isInteger(input)) {
                // invalid_format issue
                // payload.issues.push({
                //   expected: def.format,
                //   format: def.format,
                //   code: "invalid_format",
                //   input,
                //   inst,
                // });
                // invalid_type issue
                payload.issues.push({
                    expected: origin,
                    format: def.format,
                    code: "invalid_type",
                    continue: false,
                    input,
                    inst,
                });
                return;
                // not_multiple_of issue
                // payload.issues.push({
                //   code: "not_multiple_of",
                //   origin: "number",
                //   input,
                //   inst,
                //   divisor: 1,
                // });
            }
            if (!Number.isSafeInteger(input)) {
                if (input > 0) {
                    // too_big
                    payload.issues.push({
                        input,
                        code: "too_big",
                        maximum: Number.MAX_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        inclusive: true,
                        continue: !def.abort,
                    });
                }
                else {
                    // too_small
                    payload.issues.push({
                        input,
                        code: "too_small",
                        minimum: Number.MIN_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        inclusive: true,
                        continue: !def.abort,
                    });
                }
                return;
            }
        }
        if (input < minimum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_small",
                minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_big",
                maximum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodCheckBigIntFormat = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    const [minimum, maximum] = util.BIGINT_FORMAT_RANGES[def.format];
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (input < minimum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_small",
                minimum: minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_big",
                maximum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
    };
})));
const $ZodCheckMaxSize = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckMaxSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size <= def.maximum)
            return;
        payload.issues.push({
            origin: util.getSizableOrigin(input),
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
})));
const $ZodCheckMinSize = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckMinSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size >= def.minimum)
            return;
        payload.issues.push({
            origin: util.getSizableOrigin(input),
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
})));
const $ZodCheckSizeEquals = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckSizeEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size === def.size)
            return;
        const tooBig = size > def.size;
        payload.issues.push({
            origin: util.getSizableOrigin(input),
            ...(tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
})));
const $ZodCheckMaxLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckMaxLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const units = input.length;
        // Strings are measured in Unicode code points, not UTF-16 units. A code point is at most two units, so a string that already fits in units fits in code points; only an overflow has to be counted.
        const length = typeof input === "string" && units > def.maximum ? _util_js__WEBPACK_IMPORTED_MODULE_1__/* .codePointLength */ .O7(input) : units;
        if (length <= def.maximum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_1__/* .getLengthableOrigin */ .Rc(input);
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckMinLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const units = input.length;
        // A code point is one or two UTF-16 units, so fewer units than the floor can never reach it and twice the floor always clears it. Only in between is the exact count in doubt.
        const length = typeof input === "string" && units >= def.minimum && units < def.minimum * 2
            ? _util_js__WEBPACK_IMPORTED_MODULE_1__/* .codePointLength */ .O7(input)
            : units;
        if (length >= def.minimum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_1__/* .getLengthableOrigin */ .Rc(input);
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLengthEquals = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckLengthEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
    inst._zod.check = (payload) => {
        const input = payload.value;
        const units = input.length;
        // A code point is one or two UTF-16 units, so outside `[length, length * 2]` units the target is missed either way — and missed in the same direction in both measures.
        const length = typeof input === "string" && units >= def.length && units <= def.length * 2
            ? _util_js__WEBPACK_IMPORTED_MODULE_1__/* .codePointLength */ .O7(input)
            : units;
        if (length === def.length)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_1__/* .getLengthableOrigin */ .Rc(input);
        const tooBig = length > def.length;
        payload.issues.push({
            origin,
            ...(tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckStringFormat", (inst, def) => {
    var _a, _b;
    $ZodCheck.init(inst, def);
    if (def.pattern)
        (_a = inst._zod).check ?? (_a.check = (payload) => {
            def.pattern.lastIndex = 0;
            if (def.pattern.test(payload.value))
                return;
            payload.issues.push({
                origin: "string",
                code: "invalid_format",
                format: def.format,
                input: payload.value,
                ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
                inst,
                continue: !def.abort,
            });
        });
    else
        (_b = inst._zod).check ?? (_b.check = () => { });
});
const $ZodCheckRegex = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckRegex", (inst, def) => {
    $ZodCheckStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: payload.value,
            pattern: def.pattern.toString(),
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLowerCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckLowerCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .lowercase */ .AC);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckUpperCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_2__/* .uppercase */ .Zv);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckIncludes", (inst, def) => {
    $ZodCheck.init(inst, def);
    const escapedRegex = _util_js__WEBPACK_IMPORTED_MODULE_1__/* .escapeRegex */ .sD(def.includes);
    // `String.prototype.includes(sub, position)` matches `sub` at `position`
    // OR LATER, so the pattern must allow at least `position` leading chars
    // (`{N,}`), not exactly `position` chars (`{N}`).
    const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
    def.pattern = pattern;
    inst._zod.check = (payload) => {
        if (payload.value.includes(def.includes, def.position))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: def.includes,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStartsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckStartsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`^${_util_js__WEBPACK_IMPORTED_MODULE_1__/* .escapeRegex */ .sD(def.prefix)}.*`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.check = (payload) => {
        if (payload.value.startsWith(def.prefix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: def.prefix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckEndsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckEndsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`.*${_util_js__WEBPACK_IMPORTED_MODULE_1__/* .escapeRegex */ .sD(def.suffix)}$`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.check = (payload) => {
        if (payload.value.endsWith(def.suffix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: def.suffix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
///////////////////////////////////
/////    $ZodCheckProperty    /////
///////////////////////////////////
function handleCheckPropertyResult(result, payload, property) {
    if (result.issues.length) {
        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_1__/* .prefixIssues */ .lQ(property, result.issues));
    }
}
const $ZodCheckProperty = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckProperty", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        const result = def.schema._zod.run({
            value: payload.value[def.property],
            issues: [],
        }, {});
        if (result instanceof Promise) {
            return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
        }
        handleCheckPropertyResult(result, payload, def.property);
        return;
    };
})));
const $ZodCheckProperties = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckProperties", (inst, def) => {
    $ZodCheck.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_1__/* .hide */ .jD(inst, Symbol.iterator, function* () {
        yield inst;
    });
    // key and schema snapshotted together: reading one live and the other cached lets a later mutation of the caller's shape object pair a stale key with a missing schema
    let entries;
    inst._zod.check = (payload) => {
        // the base schema already typed the value, so only a nullish one is rejected here: the properties read on a primitive too, matching z.property() on a string's length
        if (payload.value == null) {
            payload.issues.push({ expected: "object", code: "invalid_type", input: payload.value, inst });
            return undefined;
        }
        entries ?? (entries = Reflect.ownKeys(def.shape).map((key) => [key, def.shape[key]]));
        const input = payload.value;
        let proms;
        for (const [key, schema] of entries) {
            const result = schema._zod.run({ value: input[key], issues: [] }, {});
            if (result instanceof Promise) {
                proms ?? (proms = []);
                proms.push(result.then((result) => handleCheckPropertyResult(result, payload, key)));
            }
            else {
                handleCheckPropertyResult(result, payload, key);
            }
        }
        if (proms)
            return Promise.all(proms).then(() => undefined);
        return undefined;
    };
});
const $ZodCheckMimeType = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("$ZodCheckMimeType", (inst, def) => {
    $ZodCheck.init(inst, def);
    const mimeSet = new Set(def.mime);
    inst._zod.check = (payload) => {
        if (mimeSet.has(payload.value.type))
            return;
        payload.issues.push({
            code: "invalid_value",
            values: def.mime,
            input: payload.value.type,
            inst,
            continue: !def.abort,
        });
    };
})));
const $ZodCheckOverwrite = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("$ZodCheckOverwrite", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
    };
});


/***/ }),

/***/ 76477:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ Doc)
/* harmony export */ });
class Doc {
    constructor(args = [], closed = {}) {
        this.content = [];
        this.indent = 0;
        this.args = args;
        this.closed = closed;
    }
    // the compiler catches a child's throw and keeps writing into this doc, so the indent has to unwind with it
    indented(fn) {
        this.indent += 1;
        try {
            fn(this);
        }
        finally {
            this.indent -= 1;
        }
    }
    write(arg) {
        if (typeof arg === "function") {
            arg(this, { execution: "sync" });
            arg(this, { execution: "async" });
            return;
        }
        const content = arg;
        const lines = content.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
            this.content.push(line);
        }
    }
    compile() {
        const F = Function;
        const content = this?.content ?? [``];
        const factory = new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`);
        return factory(...Object.values(this.closed));
    }
}


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

/***/ 77946:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileDown)
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
    name: "file-down",
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
                d: "M12 18v-6",
                key: "17g6i2"
            }
        ],
        [
            "path",
            {
                d: "m9 15 3 3 3-3",
                key: "1npd3o"
            }
        ]
    ]
};
__iconData.node;
const FileDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-down.mjs.map


/***/ }),

/***/ 78506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ text)
/* harmony export */ });
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Text} from 'mdast'
 */

/**
 * Serialize a text node.
 *
 * @param {Text} node
 *   Node to serialize.
 * @param {Parents | undefined} parent
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function text(node, parent, state, info) {
  /* c8 ignore next -- parent always passed */
  const siblings = parent ? parent.children : []
  const index = state.indexStack[state.indexStack.length - 1]

  return state.safe(node.value, {
    ...info,
    afterNode: siblings[index + 1],
    beforeNode: siblings[index - 1]
  })
}


/***/ }),

/***/ 78692:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ checkBulletOrdered)
/* harmony export */ });
/**
 * @import {Options, State} from 'mdast-util-to-markdown'
 */

/**
 * Checks the preferred ordered list bullet option.
 *
 * @param {State} state
 *   Info passed around.
 * @returns {Exclude<Options['bulletOrdered'], null | undefined>}
 *   Preferred ordered list bullet.
 */
function checkBulletOrdered(state) {
  const marker = state.options.bulletOrdered || '.'

  if (marker !== '.' && marker !== ')') {
    throw new Error(
      'Cannot serialize items with `' +
        marker +
        '` for `options.bulletOrdered`, expected `.` or `)`'
    )
  }

  return marker
}


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

/***/ 78954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FilePlusCorner)
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
    name: "file-plus-corner",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
                key: "17jvcc"
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
                d: "M14 19h6",
                key: "bvotb8"
            }
        ],
        [
            "path",
            {
                d: "M17 16v6",
                key: "18yu1i"
            }
        ]
    ],
    aliases: [
        "file-plus-2"
    ]
};
__iconData.node;
const FilePlusCorner = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-plus-corner.mjs.map


/***/ }),

/***/ 79179:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ikc: () => (/* binding */ object),
/* harmony export */   YOg: () => (/* binding */ array),
/* harmony export */   YjP: () => (/* binding */ string),
/* harmony export */   k5n: () => (/* binding */ _enum),
/* harmony export */   zMY: () => (/* binding */ boolean)
/* harmony export */ });
/* unused harmony exports ZodType, _ZodString, ZodString, ZodStringFormat, ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration, ZodEmail, email, ZodGUID, guid, ZodUUID, uuid, uuidv4, uuidv6, uuidv7, ZodURL, url, httpUrl, ZodEmoji, emoji, ZodNanoID, nanoid, ZodCUID, cuid, ZodCUID2, cuid2, ZodULID, ulid, ZodXID, xid, ZodKSUID, ksuid, ZodIPv4, ipv4, ZodMAC, mac, ZodIPv6, ipv6, ZodCIDRv4, cidrv4, ZodCIDRv6, cidrv6, ZodBase64, base64, ZodBase64URL, base64url, ZodE164, e164, ZodCreditCard, creditCard, ZodIBAN, iban, ZodJWT, jwt, ZodCustomStringFormat, stringFormat, hostname, hex, currencyCode, hash, ZodNumber, number, ZodNumberFormat, int, float32, float64, int32, uint32, ZodBoolean, ZodBigInt, bigint, ZodBigIntFormat, int64, uint64, ZodSymbol, symbol, ZodUndefined, undefined, ZodNull, null, ZodAny, any, ZodUnknown, unknown, ZodNever, never, ZodVoid, void, ZodDate, date, ZodArray, keyof, ZodObject, strictObject, looseObject, ZodUnion, union, ZodXor, xor, ZodDiscriminatedUnion, discriminatedUnion, ZodIntersection, intersection, ZodTuple, tuple, ZodRecord, record, partialRecord, looseRecord, ZodMap, map, ZodSet, set, ZodEnum, nativeEnum, ZodLiteral, literal, ZodFile, file, ZodTransform, transform, ZodOptional, optional, ZodExactOptional, exactOptional, ZodNullable, nullable, nullish, ZodDefault, _default, ZodPrefault, prefault, ZodNonOptional, nonoptional, ZodSuccess, success, ZodCatch, catch, ZodNaN, nan, ZodPipe, pipe, ZodCodec, codec, invertCodec, ZodPreprocess, ZodReadonly, readonly, ZodTemplateLiteral, templateLiteral, ZodLazy, lazy, ZodPromise, promise, ZodFunction, _function, function, ZodCustom, check, custom, refine, superRefine, describe, meta, ZodInstanceOf, instanceof, stringbool, json, preprocess */
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55503);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53622);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38324);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68056);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31711);
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65880);
/* harmony import */ var _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3956);
/* harmony import */ var _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38918);
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23451);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(49164);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(55711);








// Register English as the default locale on first ZodType construction. Hooked into the `ZodType` `$constructor` (rather than a top-level `config(en())` in `external.ts`) so bundlers honoring `sideEffects: false` can't tree-shake it out — see #5953, #5725. An explicit `z.config(z.locales.xx())` call wins regardless of order, since this only sets the default when none is present.
function _ensureDefaultLocale() {
    if (!_core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.localeError)
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W((0,_locales_en_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)());
}
// the default memoizer is read by the core container init, which runs before `ZodType.init`, so each container calls this first
function _ensureDefaultMemoizer() {
    if (!_core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer)
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W({ memoizer: _core_index_js__WEBPACK_IMPORTED_MODULE_2__/* .memoizer */ .x3() });
}
const ZodType = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodType", (inst, def) => {
    _ensureDefaultLocale();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodType */ .W4.init(inst, def);
    inst.def = def;
    inst.type = def.type;
    return inst;
}, {
    check(...chks) {
        const def = this.def;
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(def, {
            checks: [
                ...(def.checks ?? []),
                ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
            ],
        }), { parent: true });
    },
    with(...chks) {
        return this.check(...chks);
    },
    clone(def, params) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .clone */ .o8(this, def, params);
    },
    brand() {
        return this;
    },
    register(reg, meta) {
        reg.add(this, meta);
        return this;
    },
    refine(check, params) {
        return this.check(refine(check, params));
    },
    superRefine(refinement, params) {
        return this.check(superRefine(refinement, params));
    },
    overwrite(fn) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._overwrite */ .bS(fn));
    },
    optional() {
        return optional(this);
    },
    exactOptional() {
        return exactOptional(this);
    },
    nullable() {
        return nullable(this);
    },
    nullish() {
        return optional(nullable(this));
    },
    nonoptional(params) {
        return nonoptional(this, params);
    },
    array() {
        return array(this);
    },
    or(arg) {
        return union([this, arg]);
    },
    and(arg) {
        return intersection(this, arg);
    },
    transform(tx) {
        return pipe(this, transform(tx));
    },
    default(d) {
        return _default(this, d);
    },
    prefault(d) {
        return prefault(this, d);
    },
    catch(params) {
        return _catch(this, params);
    },
    pipe(target) {
        return pipe(this, target);
    },
    readonly() {
        return readonly(this);
    },
    describe(description) {
        const cl = this.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.add(cl, { description });
        return cl;
    },
    meta(...args) {
        // overloaded: meta() returns the registered metadata, meta(data) returns a clone with `data` registered. The mapped type picks up the second overload, so we accept variadic any-args and return `any` to satisfy both at runtime.
        if (args.length === 0)
            return _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.get(this);
        const cl = this.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.add(cl, args[0]);
        return cl;
    },
    isOptional() {
        return this.safeParse(undefined).success;
    },
    isNullable() {
        return this.safeParse(null).success;
    },
    apply(fn, ...args) {
        return args.length === 0 ? fn(this) : fn(this, ...args);
    },
    // Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
    get "~standard"() {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .hide */ .jD(this, "~standard", {
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .standardProps */ .YK(this),
            jsonSchema: {
                input: (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_7__/* .createStandardJSONSchemaMethod */ .uE)(this, "input"),
                output: (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_7__/* .createStandardJSONSchemaMethod */ .uE)(this, "output"),
            },
        });
    },
    set "~standard"(value) {
        _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .own */ .qh(this, "~standard", value);
    },
    parse: function _parse(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .parse */ .qg(this, data, params, { callee: _parse });
    },
    parseAsync: async function _parseAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .parseAsync */ .EJ(this, data, params, { callee: _parseAsync });
    },
    safeParse(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeParse */ .xL(this, data, params);
    },
    async safeParseAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeParseAsync */ .bp(this, data, params);
    },
    // `spa` is an alias: same function object as `safeParseAsync`, as before.
    get spa() {
        return this?.safeParseAsync;
    },
    set spa(value) {
        _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .own */ .qh(this, "spa", value);
    },
    validate(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_9__/* .validate */ .tf(this, data, params);
    },
    validateAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_9__/* .validateAsync */ .F0(this, data, params);
    },
    encode: function _encode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .encode */ .lF(this, data, params, { callee: _encode });
    },
    decode: function _decode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .decode */ .D4(this, data, params, { callee: _decode });
    },
    encodeAsync: async function _encodeAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .encodeAsync */ .X$(this, data, params, { callee: _encodeAsync });
    },
    decodeAsync: async function _decodeAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .decodeAsync */ .Re(this, data, params, { callee: _decodeAsync });
    },
    safeEncode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeEncode */ .wy(this, data, params);
    },
    safeDecode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeDecode */ .ex(this, data, params);
    },
    async safeEncodeAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeEncodeAsync */ .EM(this, data, params);
    },
    async safeDecodeAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_8__/* .safeDecodeAsync */ .yR(this, data, params);
    },
    toJSONSchema(params) {
        return (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_7__/* .createToJSONSchemaMethod */ .OA)(this, {})(params);
    },
    // Reads through to the registry on every access, so it must not cache.
    get description() {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.get(this)?.description;
    },
    // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
    get _def() {
        return this._zod.def;
    },
});
/** @internal */
const _ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("_ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodString */ .$v.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .stringProcessor */ .SW(inst, ctx, json, params);
}, 
/*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .derived */ .un({
    format: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).format ?? null,
    minLength: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).minimum ?? null,
    maxLength: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).maximum ?? null,
}, {
    regex(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._regex */ .Fk(...args));
    },
    includes(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._includes */ .dR(...args));
    },
    startsWith(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._startsWith */ .$S(...args));
    },
    endsWith(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._endsWith */ .ER(...args));
    },
    min(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._minLength */ .m9(...args));
    },
    max(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._maxLength */ .Eb(...args));
    },
    length(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._length */ .YA(...args));
    },
    nonempty(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._minLength */ .m9(1, ...args));
    },
    lowercase(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lowercase */ .hH(params));
    },
    uppercase(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._uppercase */ .qF(params));
    },
    trim() {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._trim */ .WN());
    },
    normalize(...args) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._normalize */ .lo(...args));
    },
    toLowerCase() {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._toLowerCase */ .Il());
    },
    toUpperCase() {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._toUpperCase */ .xY());
    },
    slugify() {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._slugify */ .TL());
    },
}));
const ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodString */ .$v.init(inst, def);
    _ZodString.init(inst, def);
}, {
    email(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._email */ .Mu(ZodEmail, params));
    },
    url(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._url */ .Fn(ZodURL, params));
    },
    jwt(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._jwt */ .rk(ZodJWT, params));
    },
    emoji(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._emoji */ .aC(ZodEmoji, params));
    },
    guid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._guid */ .tB(ZodGUID, params));
    },
    uuid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._uuid */ .Be(ZodUUID, params));
    },
    uuidv4(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._uuidv4 */ .nA(ZodUUID, params));
    },
    uuidv6(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._uuidv6 */ .pY(ZodUUID, params));
    },
    uuidv7(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._uuidv7 */ .wA(ZodUUID, params));
    },
    nanoid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._nanoid */ .Dl(ZodNanoID, params));
    },
    cuid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._cuid */ .fs(ZodCUID, params));
    },
    cuid2(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._cuid2 */ .Bj(ZodCUID2, params));
    },
    ulid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._ulid */ .Ct(ZodULID, params));
    },
    base64(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._base64 */ .rt(ZodBase64, params));
    },
    base64url(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._base64url */ .cU(ZodBase64URL, params));
    },
    xid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._xid */ .Pw(ZodXID, params));
    },
    ksuid(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._ksuid */ ._z(ZodKSUID, params));
    },
    ipv4(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._ipv4 */ .Ny(ZodIPv4, params));
    },
    ipv6(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._ipv6 */ .$O(ZodIPv6, params));
    },
    cidrv4(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._cidrv4 */ .Uy(ZodCIDRv4, params));
    },
    cidrv6(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._cidrv6 */ .gP(ZodCIDRv6, params));
    },
    e164(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._e164 */ .KB(ZodE164, params));
    },
    datetime(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._isoDateTime */ .G1(ZodISODateTime, params));
    },
    date(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._isoDate */ .db(ZodISODate, params));
    },
    time(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._isoTime */ .Kn(ZodISOTime, params));
    },
    duration(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._isoDuration */ .f2(ZodISODuration, params));
    },
});
function string(params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._string */ .Rl(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodStringFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodStringFormat */ .EY.init(inst, def);
    _ZodString.init(inst, def);
});
const ZodISODateTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODateTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodISODateTime */ .Ko.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISODate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodISODate */ .v1.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISOTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISOTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodISOTime */ .Ax.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISODuration = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODuration", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodISODuration */ .$N.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEmail", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodEmail */ .qG.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function email(params) {
    return core._email(ZodEmail, params);
}
const ZodGUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodGUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodGUID */ .Zc.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function guid(params) {
    return core._guid(ZodGUID, params);
}
const ZodUUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodUUID */ .Zn.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function uuid(params) {
    return core._uuid(ZodUUID, params);
}
function uuidv4(params) {
    return core._uuidv4(ZodUUID, params);
}
// ZodUUIDv6
function uuidv6(params) {
    return core._uuidv6(ZodUUID, params);
}
// ZodUUIDv7
function uuidv7(params) {
    return core._uuidv7(ZodUUID, params);
}
const ZodURL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodURL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodURL */ .VY.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function url(params) {
    return core._url(ZodURL, params);
}
function httpUrl(params) {
    return core._url(ZodURL, {
        protocol: regexes.httpProtocol,
        hostname: regexes.domain,
        ...util.normalizeParams(params),
    });
}
const ZodEmoji = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEmoji", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodEmoji */ .cG.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function emoji(params) {
    return core._emoji(ZodEmoji, params);
}
const ZodNanoID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNanoID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNanoID */ .Py.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function nanoid(params) {
    return core._nanoid(ZodNanoID, params);
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
const ZodCUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCUID */ .bl.init(inst, def);
    ZodStringFormat.init(inst, def);
});
/**
 * Validates a CUID v1 string.
 *
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
 * See https://github.com/paralleldrive/cuid.
 */
function cuid(params) {
    return core._cuid(ZodCUID, params);
}
const ZodCUID2 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCUID2", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCUID2 */ .Zu.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid2(params) {
    return core._cuid2(ZodCUID2, params);
}
const ZodULID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodULID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodULID */ .g5.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ulid(params) {
    return core._ulid(ZodULID, params);
}
const ZodXID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodXID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodXID */ .TF.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function xid(params) {
    return core._xid(ZodXID, params);
}
const ZodKSUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodKSUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodKSUID */ .GY.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ksuid(params) {
    return core._ksuid(ZodKSUID, params);
}
const ZodIPv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIPv4", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodIPv4 */ .Lc.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv4(params) {
    return core._ipv4(ZodIPv4, params);
}
const ZodMAC = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodMAC", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodMAC.init(inst, def);
    ZodStringFormat.init(inst, def);
})));
function mac(params) {
    return core._mac(ZodMAC, params);
}
const ZodIPv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIPv6", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodIPv6 */ .Zy.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv6(params) {
    return core._ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCIDRv4", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCIDRv4 */ .CI.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
    return core._cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCIDRv6", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCIDRv6 */ .Cn.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
    return core._cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBase64", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodBase64 */ .Dq.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64(params) {
    return core._base64(ZodBase64, params);
}
const ZodBase64URL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBase64URL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodBase64URL */ .CQ.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64url(params) {
    return core._base64url(ZodBase64URL, params);
}
const ZodE164 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodE164", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodE164 */ .Oy.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function e164(params) {
    return core._e164(ZodE164, params);
}
const ZodCreditCard = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodCreditCard", (inst, def) => {
    core.$ZodCreditCard.init(inst, def);
    ZodStringFormat.init(inst, def);
})));
function creditCard(params) {
    return core._creditCard(ZodCreditCard, params);
}
const ZodIBAN = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodIBAN", (inst, def) => {
    core.$ZodIBAN.init(inst, def);
    ZodStringFormat.init(inst, def);
})));
function iban(params) {
    return core._iban(ZodIBAN, params);
}
const ZodJWT = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodJWT", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodJWT */ .h8.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function jwt(params) {
    return core._jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodCustomStringFormat", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodCustomStringFormat.init(inst, def);
    ZodStringFormat.init(inst, def);
})));
function stringFormat(format, fnOrRegex, _params = {}) {
    return core._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
    return core._stringFormat(ZodCustomStringFormat, "hostname", regexes.hostname, _params);
}
function hex(_params) {
    return core._stringFormat(ZodCustomStringFormat, "hex", regexes.hex, _params);
}
function currencyCode(_params) {
    return core._stringFormat(ZodCustomStringFormat, "currency_code", regexes.currencyCode, _params);
}
function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = core.regexes[format];
    if (!regex)
        throw new Error(`Unrecognized hash format: ${format}`);
    return core._stringFormat(ZodCustomStringFormat, format, regex, params);
}
const ZodNumber = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNumber", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNumber */ .vz.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .numberProcessor */ .Wg(inst, ctx, json, params);
    inst.isFinite = true;
}, 
/*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .derived */ .un({
    minValue: (inst) => {
        const { minimum, exclusiveMinimum } = _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst);
        return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
    },
    maxValue: (inst) => {
        const { maximum, exclusiveMaximum } = _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst);
        return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
    },
    isInt: (inst) => {
        const { isInt, multipleOf } = _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst);
        return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
    },
    format: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).format ?? null,
}, {
    gt(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gt */ .Tx(value, params));
    },
    gte(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(value, params));
    },
    min(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(value, params));
    },
    lt(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lt */ .Au(value, params));
    },
    lte(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(value, params));
    },
    max(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(value, params));
    },
    int(params) {
        return this.check(int(params));
    },
    safe(params) {
        return this.check(int(params));
    },
    positive(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gt */ .Tx(0, params));
    },
    nonnegative(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(0, params));
    },
    negative(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lt */ .Au(0, params));
    },
    nonpositive(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(0, params));
    },
    multipleOf(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._multipleOf */ .Hi(value, params));
    },
    step(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._multipleOf */ .Hi(value, params));
    },
    finite() {
        return this;
    },
}));
function number(params) {
    return core._number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNumberFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNumberFormat */ .I.init(inst, def);
    ZodNumber.init(inst, def);
});
function int(params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._int */ .LK(ZodNumberFormat, params);
}
function float32(params) {
    return core._float32(ZodNumberFormat, params);
}
function float64(params) {
    return core._float64(ZodNumberFormat, params);
}
function int32(params) {
    return core._int32(ZodNumberFormat, params);
}
function uint32(params) {
    return core._uint32(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBoolean", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodBoolean */ .sF.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .booleanProcessor */ .dO(inst, ctx, json, params);
});
function boolean(params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._boolean */ ._L(ZodBoolean, params);
}
const ZodBigInt = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBigInt", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodBigInt */ .BN.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .bigintProcessor */ .Y8(inst, ctx, json, params);
}, 
/*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .derived */ .un({
    minValue: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).minimum ?? null,
    maxValue: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).maximum ?? null,
    format: (inst) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst).format ?? null,
}, {
    gte(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(value, params));
    },
    min(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(value, params));
    },
    gt(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gt */ .Tx(value, params));
    },
    lt(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lt */ .Au(value, params));
    },
    lte(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(value, params));
    },
    max(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(value, params));
    },
    positive(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gt */ .Tx(BigInt(0), params));
    },
    negative(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lt */ .Au(BigInt(0), params));
    },
    nonpositive(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(BigInt(0), params));
    },
    nonnegative(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(BigInt(0), params));
    },
    multipleOf(value, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._multipleOf */ .Hi(value, params));
    },
}));
function bigint(params) {
    return core._bigint(ZodBigInt, params);
}
const ZodBigIntFormat = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodBigIntFormat", (inst, def) => {
    core.$ZodBigIntFormat.init(inst, def);
    ZodBigInt.init(inst, def);
})));
function int64(params) {
    return core._int64(ZodBigIntFormat, params);
}
function uint64(params) {
    return core._uint64(ZodBigIntFormat, params);
}
const ZodSymbol = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodSymbol", (inst, def) => {
    core.$ZodSymbol.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.symbolProcessor(inst, ctx, json, params);
})));
function symbol(params) {
    return core._symbol(ZodSymbol, params);
}
const ZodUndefined = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodUndefined", (inst, def) => {
    core.$ZodUndefined.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.undefinedProcessor(inst, ctx, json, params);
})));
function _undefined(params) {
    return core._undefined(ZodUndefined, params);
}

const ZodNull = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodNull", (inst, def) => {
    core.$ZodNull.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nullProcessor(inst, ctx, json, params);
})));
function _null(params) {
    return core._null(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodAny", (inst, def) => {
    core.$ZodAny.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.anyProcessor(inst, ctx, json, params);
})));
function any() {
    return core._any(ZodAny);
}
const ZodUnknown = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUnknown", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodUnknown */ .GP.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .unknownProcessor */ .NV(inst, ctx, json, params);
});
function unknown() {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._unknown */ .em(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNever", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNever */ .Um.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .neverProcessor */ .RH(inst, ctx, json, params);
});
function never(params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._never */ .G8(ZodNever, params);
}
const ZodVoid = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodVoid", (inst, def) => {
    core.$ZodVoid.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.voidProcessor(inst, ctx, json, params);
})));
function _void(params) {
    return core._void(ZodVoid, params);
}

const ZodDate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodDate */ .o5.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .dateProcessor */ .Fl(inst, ctx, json, params);
    inst.min = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._gte */ .qm(value, params));
    inst.max = (value, params) => inst.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._lte */ .Zm(value, params));
}, 
/*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .derived */ .un({
    minDate: (inst) => {
        const { minimum } = _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst);
        return minimum ? new Date(minimum) : null;
    },
    maxDate: (inst) => {
        const { maximum } = _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .aggregateChecks */ .Fs(inst);
        return maximum ? new Date(maximum) : null;
    },
}, {}));
function date(params) {
    return core._date(ZodDate, params);
}
const ZodArray = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodArray", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodArray */ .$p.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .arrayProcessor */ .cY(inst, ctx, json, params);
    inst.element = def.element;
}, {
    min(n, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._minLength */ .m9(n, params));
    },
    nonempty(params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._minLength */ .m9(1, params));
    },
    max(n, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._maxLength */ .Eb(n, params));
    },
    length(n, params) {
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._length */ .YA(n, params));
    },
    unwrap() {
        return this.element;
    },
});
function array(element, params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._array */ .dZ(ZodArray, element, params);
}
// .keyof
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
const ZodObject = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodObject", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodObjectJIT */ .w.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .objectProcessor */ .Ec(inst, ctx, json, params);
    _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .installLazyProp */ .X(inst, "shape", (self) => self._zod.def.shape, false);
}, {
    keyof() {
        return _enum(Object.keys(this._zod.def.shape));
    },
    catchall(catchall) {
        // `mergeDefs` rather than a spread: spreading reads `shape`, and resolving it can mint a whole fresh subtree
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(this._zod.def, { catchall: catchall }));
    },
    passthrough() {
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(this._zod.def, { catchall: unknown() }));
    },
    loose() {
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(this._zod.def, { catchall: unknown() }));
    },
    strict() {
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(this._zod.def, { catchall: never() }));
    },
    strip() {
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeDefs */ .zM(this._zod.def, { catchall: undefined }));
    },
    extend(incoming) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .extend */ .X$(this, incoming);
    },
    safeExtend(incoming) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .safeExtend */ .W0(this, incoming);
    },
    merge(other) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .merge */ .h1(this, other);
    },
    pick(mask) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .pick */ .Up(this, mask);
    },
    omit(mask) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .omit */ .cJ(this, mask);
    },
    partial(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .partial */ .OH(ZodOptional, this, args[0]);
    },
    exactPartial(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .partial */ .OH(ZodExactOptional, this, args[0], "exactPartial");
    },
    required(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .required */ .mw(ZodNonOptional, this, args[0]);
    },
});
function object(shape, params) {
    const def = {
        type: "object",
        shape: shape ?? {},
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    };
    return new ZodObject(def);
}
// strictObject
function strictObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: never(),
        ...util.normalizeParams(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: unknown(),
        ...util.normalizeParams(params),
    });
}
const ZodUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUnion", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodUnion */ .cu.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .unionProcessor */ .iC(inst, ctx, json, params);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}
const ZodXor = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodXor", (inst, def) => {
    ZodUnion.init(inst, def);
    core.$ZodXor.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
    inst.options = def.options;
})));
/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
function xor(options, params) {
    return new ZodXor({
        type: "union",
        options: options,
        inclusive: false,
        ...util.normalizeParams(params),
    });
}
const ZodDiscriminatedUnion = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    core.$ZodDiscriminatedUnion.init(inst, def);
})));
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options: options,
        discriminator,
        ...util.normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIntersection", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodIntersection */ .LJ.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .intersectionProcessor */ .i_(inst, ctx, json, params);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodTuple = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodTuple", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodTuple */ .G3.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .tupleProcessor */ .CN(inst, ctx, json, params);
}, {
    rest(rest) {
        return this.clone({
            ...this._zod.def,
            rest: rest,
        });
    },
    partial() {
        const def = this._zod.def;
        // a refinement was authored against the full arity; partialing would run it on a shorter array
        if (def.checks?.length)
            throw new Error(".partial() cannot be used on tuple schemas containing refinements");
        return this.clone({
            ...def,
            items: def.items.map((item) => new ZodOptional({ type: "optional", innerType: item })),
        });
    },
});
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof core.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ...util.normalizeParams(params),
    });
}
const ZodRecord = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodRecord", (inst, def) => {
    _ensureDefaultMemoizer();
    core.$ZodRecord.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.recordProcessor(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
})));
function record(keyType, valueType, params) {
    // v3-compat: z.record(valueType, params?) — defaults keyType to z.string()
    if (!valueType || !valueType._zod) {
        return new ZodRecord({
            type: "record",
            keyType: string(),
            valueType: keyType,
            ...util.normalizeParams(valueType),
        });
    }
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
        partial: true,
    });
}
function looseRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        mode: "loose",
        ...util.normalizeParams(params),
    });
}
const ZodMap = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodMap", (inst, def) => {
    _ensureDefaultMemoizer();
    core.$ZodMap.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.mapProcessor(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
    inst.min = (...args) => inst.check(core._minSize(...args));
    inst.nonempty = (params) => inst.check(core._minSize(1, params));
    inst.max = (...args) => inst.check(core._maxSize(...args));
    inst.size = (...args) => inst.check(core._size(...args));
})));
function map(keyType, valueType, params) {
    return new ZodMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
const ZodSet = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodSet", (inst, def) => {
    _ensureDefaultMemoizer();
    core.$ZodSet.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.setProcessor(inst, ctx, json, params);
    inst.min = (...args) => inst.check(core._minSize(...args));
    inst.nonempty = (params) => inst.check(core._minSize(1, params));
    inst.max = (...args) => inst.check(core._maxSize(...args));
    inst.size = (...args) => inst.check(core._size(...args));
})));
function set(valueType, params) {
    return new ZodSet({
        type: "set",
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
const ZodEnum = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEnum", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodEnum */ .VO.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .enumProcessor */ .C0(inst, ctx, json, params);
    inst.enum = def.entries;
    // reuse the parsed value set so a numeric TS enum's reverse-mapping keys stay out
    inst.options = [...inst._zod.values];
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new ZodEnum({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
const ZodLiteral = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodLiteral", (inst, def) => {
    core.$ZodLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.literalProcessor(inst, ctx, json, params);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
})));
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ...util.normalizeParams(params),
    });
}
const ZodFile = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodFile", (inst, def) => {
    core.$ZodFile.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.fileProcessor(inst, ctx, json, params);
    inst.min = (size, params) => inst.check(core._minSize(size, params));
    inst.max = (size, params) => inst.check(core._maxSize(size, params));
    inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
})));
function file(params) {
    return core._file(ZodFile, params);
}
const ZodTransform = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodTransform", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodTransform */ .Wc.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .transformProcessor */ .xi(inst, ctx, json, params);
    inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
            throw new _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodEncodeError */ .cV(inst.constructor.name);
        }
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .issue */ .sn(issue, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                if (!("input" in _issue))
                    _issue.input = payload.value;
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .issue */ .sn(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        payload.value = output;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodOptional */ .ig.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .optionalProcessor */ .$k(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodExactOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodExactOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodExactOptional */ .RL.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .optionalProcessor */ .$k(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
    return new ZodExactOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNullable", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNullable */ .qc.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .nullableProcessor */ .yq(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
function nullish(innerType) {
    return optional(nullable(innerType));
}
const ZodDefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodDefault */ .rv.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .defaultProcessor */ .mh(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .shallowClone */ .yG(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPrefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodPrefault */ .VF.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .prefaultProcessor */ .A(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .shallowClone */ .yG(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNonOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNonOptional */ .N$.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .nonoptionalProcessor */ .cR(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}
const ZodSuccess = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodSuccess", (inst, def) => {
    core.$ZodSuccess.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.successProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
})));
function success(innerType) {
    return new ZodSuccess({
        type: "success",
        innerType: innerType,
    });
}
const ZodCatch = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCatch", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCatch */ .t$.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .catchProcessor */ .Q9(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : _core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .constantCatch */ .SS(catchValue)),
    });
}

const ZodNaN = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodNaN", (inst, def) => {
    core.$ZodNaN.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nanProcessor(inst, ctx, json, params);
})));
function nan(params) {
    return core._nan(ZodNaN, params);
}
const ZodPipe = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPipe", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodPipe */ ._m.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .pipeProcessor */ .fs(inst, ctx, json, params);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodCodec = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodCodec", (inst, def) => {
    ZodPipe.init(inst, def);
    core.$ZodCodec.init(inst, def);
})));
function codec(in_, out, params) {
    return new ZodCodec({
        type: "pipe",
        in: in_,
        out: out,
        transform: params.decode,
        reverseTransform: params.encode,
    });
}
function invertCodec(codec) {
    const def = codec._zod.def;
    return new ZodCodec({
        type: "pipe",
        in: def.out,
        out: def.in,
        transform: def.reverseTransform,
        reverseTransform: def.transform,
    });
}
const ZodPreprocess = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodPreprocess", (inst, def) => {
    ZodPipe.init(inst, def);
    core.$ZodPreprocess.init(inst, def);
})));
const ZodReadonly = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodReadonly", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodReadonly */ .Sb.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .readonlyProcessor */ .$X(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodTemplateLiteral = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodTemplateLiteral", (inst, def) => {
    core.$ZodTemplateLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.templateLiteralProcessor(inst, ctx, json, params);
})));
function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ...util.normalizeParams(params),
    });
}
const ZodLazy = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodLazy", (inst, def) => {
    core.$ZodLazy.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.lazyProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.getter();
})));
function lazy(getter) {
    return new ZodLazy({
        type: "lazy",
        getter: getter,
    });
}
const ZodPromise = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodPromise", (inst, def) => {
    core.$ZodPromise.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.promiseProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
})));
function promise(innerType) {
    return new ZodPromise({
        type: "promise",
        innerType: innerType,
    });
}
const ZodFunction = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodFunction", (inst, def) => {
    core.$ZodFunction.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.functionProcessor(inst, ctx, json, params);
})));
function _function(params) {
    return new ZodFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
        output: params?.output ?? unknown(),
    });
}

const ZodCustom = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCustom", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCustom */ .b0.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .customProcessor */ .A6(inst, ctx, json, params);
});
// custom checks
function check(fn) {
    const ch = new core.$ZodCheck({
        check: "custom",
        // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function custom(fn, _params) {
    return core._custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._refine */ .fU(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn, params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._superRefine */ .MB(fn, params);
}
// Re-export describe and meta from core
const describe = _checks_js__WEBPACK_IMPORTED_MODULE_5__/* .describe */ .q0;
const meta = _checks_js__WEBPACK_IMPORTED_MODULE_5__/* .meta */ .mI;
const ZodInstanceOf = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodInstanceOf", (inst, def) => {
    ZodCustom.init(inst, def);
}, {
    properties(shape, params) {
        // asserts in place, so the narrowed output type is truthful without a wrapper
        return this.check(_checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._properties */ .T2(shape, params));
    },
});
function _instanceof(cls, params = {}) {
    const inst = new ZodInstanceOf({
        type: "custom",
        check: "custom",
        fn: (data) => data instanceof cls,
        abort: true,
        ...util.normalizeParams(params),
    });
    inst._zod.bag.Class = cls;
    // Override check to emit invalid_type instead of custom
    inst._zod.check = (payload) => {
        if (!(payload.value instanceof cls)) {
            payload.issues.push({
                code: "invalid_type",
                expected: cls.name,
                input: payload.value,
                inst,
                path: [...(inst._zod.def.path ?? [])],
            });
        }
    };
    return inst;
}

// stringbool
const stringbool = (...args) => core._stringbool({
    Codec: ZodCodec,
    Boolean: ZodBoolean,
    String: ZodString,
}, ...args);
function json(params) {
    const jsonSchema = lazy(() => {
        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
// preprocess
function preprocess(fn, schema) {
    return new ZodPreprocess({
        type: "pipe",
        in: transform(fn),
        out: schema,
    });
}


/***/ }),

/***/ 79714:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ strong)
/* harmony export */ });
/* harmony import */ var _util_check_strong_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66175);
/* harmony import */ var _util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5195);
/**
 * @import {AttentionInfo, Info, State} from 'mdast-util-to-markdown'
 * @import {Parents, Strong} from 'mdast'
 */




strong.attention = attention
strong.peek = peek

/**
 * Serialize a strong node.
 *
 * Attention is properly handled by `containerPhrasing`.
 *
 * @param {Strong} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function strong(node, _, state, info) {
  const exit = state.enter('phrasing')
  const item = (0,_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__/* .attentionItem */ .mx)(node, attention, state, state.createTracker(info))
  const value = (0,_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__/* .serialize */ .lK)([item], info.before, info.after)
  exit()
  return value
}

/**
 * Serialize a strong node as attention.
 *
 * @param {Strong} _
 *   Node to serialize.
 * @param {State} state
 *   Info passed around.
 * @returns {AttentionInfo}
 *   Info on how to serialize the node.
 */
function attention(_, state) {
  const marker = (0,_util_check_strong_js__WEBPACK_IMPORTED_MODULE_1__/* .checkStrong */ .W)(state)
  return {
    construct: 'strong',
    markers: marker === '*' ? ['*', '_'] : ['_', '*'],
    sizes: [2]
  }
}

/**
 * Peek at this node.
 *
 * @param {Strong} _
 *   Node to serialize.
 * @param {Parents | undefined} _1
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @returns {string}
 *   Start of the serialized markdown.
 */
function peek(_, _1, state) {
  return state.options.strong || '*'
}


/***/ }),

/***/ 80039:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ encodeCharacterReference)
/* harmony export */ });
/**
 * Encode a code point as a character reference.
 *
 * @param {number} code
 *   Code point to encode.
 * @returns {string}
 *   Encoded character reference.
 */
function encodeCharacterReference(code) {
  return '&#x' + code.toString(16).toUpperCase() + ';'
}


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

/***/ 81806:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ formatHeadingAsSetext)
/* harmony export */ });
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48250);
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42234);
/* harmony import */ var mdast_util_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48006);
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {Heading} from 'mdast'
 */




/**
 * Checks if a heading can be formatted as a setext heading.
 *
 * @param {Heading} node
 *   Node to check.
 * @param {State} state
 *   Info passed around.
 * @returns {boolean}
 *   Whether the heading can be formatted as a setext heading.
 */
function formatHeadingAsSetext(node, state) {
  let literalWithBreak = false

  // Look for literals with a line break.
  // Note that this also
  ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__/* .visit */ .YR)(node, function (node) {
    if (
      ('value' in node && /\r?\n|\r/.test(node.value)) ||
      node.type === 'break'
    ) {
      literalWithBreak = true
      return unist_util_visit__WEBPACK_IMPORTED_MODULE_1__/* .EXIT */ .dc
    }
  })

  return Boolean(
    (!node.depth || node.depth < 3) &&
    (0,mdast_util_to_string__WEBPACK_IMPORTED_MODULE_2__/* .toString */ .d)(node) &&
    (state.options.setext || literalWithBreak)
  )
}


/***/ }),

/***/ 82683:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ htmlKind)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4294);
/* harmony import */ var micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10705);



/**
 * @typedef {1 | 2 | 3 | 4 | 5 | 6 | 7} Kind
 *   Kind of HTML (flow) element.
 */

/**
 * Infer the kind of HTML that `value` is.
 *
 * This works on valid trees as produced by `micromark`.
 * Kinds:
 *
 * 1. raw
 * 2. comment
 * 3. instruction
 * 4. declaration
 * 5. cdata
 * 6. block
 * 7. other
 *
 * See: <https://spec.commonmark.org/0.31.2/#html-blocks>.
 *
 * @param {string} value
 *   HTML.
 * @returns {Kind | undefined}
 *   Kind; `undefined` if unknown.
 */
function htmlKind(value) {
  if (value.charCodeAt(0) !== 60 /* `<` */) return

  const next = value.charCodeAt(1)

  if (next === 33 /* `!` */) {
    const code = value.charCodeAt(2)
    if (code === 45 /* `-` */) return 2
    if (code === 91 /* `[` */) return 5
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code)) return 4
    return
  }

  if (next === 63 /* `?` */) return 3

  const closing = next === 47 /* `/` */
  const start = closing ? 2 : 1
  let end = start
  let code = value.charCodeAt(end)

  if (!(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlpha */ .CW)(code)) return

  while (code === 45 /* `-` */ || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .asciiAlphanumeric */ .lV)(code)) {
    code = value.charCodeAt(++end)
  }

  const name = value.slice(start, end).toLowerCase()

  if (!closing && code !== 47 /* `/` */ && micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_1__/* .htmlRawNames */ .y.includes(name)) {
    return 1
  }

  return micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_1__/* .htmlBlockNames */ .T.includes(name) ? 6 : 7
}


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

/***/ 83165:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ version)
/* harmony export */ });
const version = {
    major: 4,
    minor: 6,
    patch: 7,
};


/***/ }),

/***/ 84753:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var _util_check_bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16080);
/* harmony import */ var _util_check_bullet_other_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15147);
/* harmony import */ var _util_check_bullet_ordered_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78692);
/* harmony import */ var _util_check_rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61010);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {List, Parents} from 'mdast'
 */






/**
 * Serialize a list node.
 *
 * @param {List} node
 *   Node to serialize.
 * @param {Parents | undefined} parent
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function list(node, parent, state, info) {
  const exit = state.enter('list')
  const bulletCurrent = state.bulletCurrent
  /** @type {string} */
  let bullet = node.ordered ? (0,_util_check_bullet_ordered_js__WEBPACK_IMPORTED_MODULE_0__/* .checkBulletOrdered */ .u)(state) : (0,_util_check_bullet_js__WEBPACK_IMPORTED_MODULE_1__/* .checkBullet */ .d)(state)
  /** @type {string} */
  const bulletOther = node.ordered
    ? bullet === '.'
      ? ')'
      : '.'
    : (0,_util_check_bullet_other_js__WEBPACK_IMPORTED_MODULE_2__/* .checkBulletOther */ .t)(state)
  let useDifferentMarker =
    parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false

  if (!node.ordered) {
    const firstListItem = node.children ? node.children[0] : undefined

    // If there’s an empty first list item directly in two list items,
    // we have to use a different bullet:
    //
    // ```markdown
    // * - *
    // ```
    //
    // …because otherwise it would become one big thematic break.
    if (
      // Bullet could be used as a thematic break marker:
      (bullet === '*' || bullet === '-') &&
      // Empty first list item:
      firstListItem &&
      (!firstListItem.children || !firstListItem.children[0]) &&
      // Directly in two other list items:
      state.stack[state.stack.length - 1] === 'list' &&
      state.stack[state.stack.length - 2] === 'listItem' &&
      state.stack[state.stack.length - 3] === 'list' &&
      state.stack[state.stack.length - 4] === 'listItem' &&
      // That are each the first child.
      state.indexStack[state.indexStack.length - 1] === 0 &&
      state.indexStack[state.indexStack.length - 2] === 0 &&
      state.indexStack[state.indexStack.length - 3] === 0
    ) {
      useDifferentMarker = true
    }

    // If there’s a thematic break at the start of the first list item,
    // we have to use a different bullet:
    //
    // ```markdown
    // * ---
    // ```
    //
    // …because otherwise it would become one big thematic break.
    if ((0,_util_check_rule_js__WEBPACK_IMPORTED_MODULE_3__/* .checkRule */ .T)(state) === bullet && firstListItem) {
      let index = -1

      while (++index < node.children.length) {
        const item = node.children[index]

        if (
          item &&
          item.type === 'listItem' &&
          item.children &&
          item.children[0] &&
          item.children[0].type === 'thematicBreak'
        ) {
          useDifferentMarker = true
          break
        }
      }
    }
  }

  if (useDifferentMarker) {
    bullet = bulletOther
  }

  state.bulletCurrent = bullet
  const value = state.containerFlow(node, info)
  state.bulletLastUsed = bullet
  state.bulletCurrent = bulletCurrent
  exit()
  return value
}


/***/ }),

/***/ 85577:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ gfmAutolinkLiteralFromMarkdown),
/* harmony export */   r: () => (/* binding */ gfmAutolinkLiteralToMarkdown)
/* harmony export */ });
/* harmony import */ var ccount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49884);
/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23091);
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4294);
/* harmony import */ var mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65829);
/**
 * @import {RegExpMatchObject, ReplaceFunction} from 'mdast-util-find-and-replace'
 * @import {CompileContext, Extension as FromMarkdownExtension, Handle as FromMarkdownHandle, Transform as FromMarkdownTransform} from 'mdast-util-from-markdown'
 * @import {ConstructName, Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
 * @import {Link, PhrasingContent} from 'mdast'
 */






/** @type {ConstructName} */
const inConstruct = 'phrasing'
/** @type {Array<ConstructName>} */
const notInConstruct = ['autolink', 'link', 'image', 'label']

/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM autolink
 * literals in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.
 */
function gfmAutolinkLiteralFromMarkdown() {
  return {
    transforms: [transformGfmAutolinkLiterals],
    enter: {
      literalAutolink: enterLiteralAutolink,
      literalAutolinkEmail: enterLiteralAutolinkValue,
      literalAutolinkHttp: enterLiteralAutolinkValue,
      literalAutolinkWww: enterLiteralAutolinkValue
    },
    exit: {
      literalAutolink: exitLiteralAutolink,
      literalAutolinkEmail: exitLiteralAutolinkEmail,
      literalAutolinkHttp: exitLiteralAutolinkHttp,
      literalAutolinkWww: exitLiteralAutolinkWww
    }
  }
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM autolink
 * literals in markdown.
 *
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.
 */
function gfmAutolinkLiteralToMarkdown() {
  return {
    unsafe: [
      {
        character: '@',
        before: '[+\\-.\\w]',
        after: '[\\-.\\w]',
        inConstruct,
        notInConstruct
      },
      {
        character: '.',
        before: '[Ww]',
        after: '[\\-.\\w]',
        inConstruct,
        notInConstruct
      },
      {
        character: ':',
        before: '[ps]',
        after: '\\/',
        inConstruct,
        notInConstruct
      }
    ]
  }
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterLiteralAutolink(token) {
  this.enter({type: 'link', title: null, url: '', children: []}, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token)
  const node = this.stack[this.stack.length - 1]
  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'link')
  node.url = 'http://' + this.sliceSerialize(token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitLiteralAutolink(token) {
  this.exit(token)
}

/** @type {FromMarkdownTransform} */
function transformGfmAutolinkLiterals(tree) {
  (0,mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_1__/* .findAndReplace */ .T)(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
    ],
    {ignore: ['link', 'linkReference']}
  )
}

/**
 * @type {ReplaceFunction}
 * @param {string} _
 * @param {string} protocol
 * @param {string} domain
 * @param {string} path
 * @param {RegExpMatchObject} match
 * @returns {Array<PhrasingContent> | Link | false}
 */
// eslint-disable-next-line max-params
function findUrl(_, protocol, domain, path, match) {
  let prefix = ''

  // Not an expected previous character.
  if (!previous(match)) {
    return false
  }

  // Treat `www` as part of the domain.
  if (/^w/i.test(protocol)) {
    domain = protocol + domain
    protocol = ''
    prefix = 'http://'
  }

  if (!isCorrectDomain(domain)) {
    return false
  }

  const parts = splitUrl(domain + path)

  if (!parts[0]) return false

  /** @type {Link} */
  const result = {
    type: 'link',
    title: null,
    url: prefix + protocol + parts[0],
    children: [{type: 'text', value: protocol + parts[0]}]
  }

  if (parts[1]) {
    return [result, {type: 'text', value: parts[1]}]
  }

  return result
}

/**
 * @type {ReplaceFunction}
 * @param {string} _
 * @param {string} atext
 * @param {string} label
 * @param {RegExpMatchObject} match
 * @returns {Link | false}
 */
function findEmail(_, atext, label, match) {
  if (
    // Not an expected previous character.
    !previous(match, true) ||
    // Label ends in not allowed character.
    /[-\d_]$/.test(label)
  ) {
    return false
  }

  return {
    type: 'link',
    title: null,
    url: 'mailto:' + atext + '@' + label,
    children: [{type: 'text', value: atext + '@' + label}]
  }
}

/**
 * @param {string} domain
 * @returns {boolean}
 */
function isCorrectDomain(domain) {
  const parts = domain.split('.')

  if (
    parts.length < 2 ||
    (parts[parts.length - 1] &&
      (/_/.test(parts[parts.length - 1]) ||
        !/[a-zA-Z\d]/.test(parts[parts.length - 1]))) ||
    (parts[parts.length - 2] &&
      (/_/.test(parts[parts.length - 2]) ||
        !/[a-zA-Z\d]/.test(parts[parts.length - 2])))
  ) {
    return false
  }

  return true
}

/**
 * @param {string} url
 * @returns {[string, string | undefined]}
 */
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url)

  if (!trailExec) {
    return [url, undefined]
  }

  url = url.slice(0, trailExec.index)

  let trail = trailExec[0]
  let closingParenIndex = trail.indexOf(')')
  const openingParens = (0,ccount__WEBPACK_IMPORTED_MODULE_2__/* .ccount */ .D)(url, '(')
  let closingParens = (0,ccount__WEBPACK_IMPORTED_MODULE_2__/* .ccount */ .D)(url, ')')

  while (closingParenIndex !== -1 && openingParens > closingParens) {
    url += trail.slice(0, closingParenIndex + 1)
    trail = trail.slice(closingParenIndex + 1)
    closingParenIndex = trail.indexOf(')')
    closingParens++
  }

  return [url, trail]
}

/**
 * @param {RegExpMatchObject} match
 * @param {boolean | null | undefined} [email=false]
 * @returns {boolean}
 */
function previous(match, email) {
  const code = match.input.charCodeAt(match.index - 1)

  return (
    (match.index === 0 ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__/* .unicodeWhitespace */ .Ny)(code) ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__/* .unicodePunctuation */ .es)(code)) &&
    // If it’s an email, the previous character should not be a slash.
    (!email || code !== 47)
  )
}


/***/ }),

/***/ 87672:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ markdownTable)
/* harmony export */ });
// To do: next major: remove.
/**
 * @typedef {Options} MarkdownTableOptions
 *   Configuration.
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [alignDelimiters=true]
 *   Whether to align the delimiters (default: `true`);
 *   they are aligned by default:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   Pass `false` to make them staggered:
 *
 *   ```markdown
 *   | Alpha | B |
 *   | - | - |
 *   | C | Delta |
 *   ```
 * @property {ReadonlyArray<string | null | undefined> | string | null | undefined} [align]
 *   How to align columns (default: `''`);
 *   one style for all columns or styles for their respective columns;
 *   each style is either `'l'` (left), `'r'` (right), or `'c'` (center);
 *   other values are treated as `''`, which doesn’t place the colon in the
 *   alignment row but does align left;
 *   *only the lowercased first character is used, so `Right` is fine.*
 * @property {boolean | null | undefined} [delimiterEnd=true]
 *   Whether to end each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B
 *   | ----- | -----
 *   | C     | Delta
 *   ```
 * @property {boolean | null | undefined} [delimiterStart=true]
 *   Whether to begin each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are starting delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no starting delimiters:
 *
 *   ```markdown
 *   Alpha | B     |
 *   ----- | ----- |
 *   C     | Delta |
 *   ```
 * @property {boolean | null | undefined} [padding=true]
 *   Whether to add a space of padding between delimiters and cells
 *   (default: `true`).
 *
 *   When `true`, there is padding:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there is no padding:
 *
 *   ```markdown
 *   |Alpha|B    |
 *   |-----|-----|
 *   |C    |Delta|
 *   ```
 * @property {((value: string) => number) | null | undefined} [stringLength]
 *   Function to detect the length of table cell content (optional);
 *   this is used when aligning the delimiters (`|`) between table cells;
 *   full-width characters and emoji mess up delimiter alignment when viewing
 *   the markdown source;
 *   to fix this, you can pass this function,
 *   which receives the cell content and returns its “visible” size;
 *   note that what is and isn’t visible depends on where the text is displayed.
 *
 *   Without such a function, the following:
 *
 *   ```js
 *   markdownTable([
 *     ['Alpha', 'Bravo'],
 *     ['中文', 'Charlie'],
 *     ['👩‍❤️‍👩', 'Delta']
 *   ])
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo |
 *   | - | - |
 *   | 中文 | Charlie |
 *   | 👩‍❤️‍👩 | Delta |
 *   ```
 *
 *   With [`string-width`](https://github.com/sindresorhus/string-width):
 *
 *   ```js
 *   import stringWidth from 'string-width'
 *
 *   markdownTable(
 *     [
 *       ['Alpha', 'Bravo'],
 *       ['中文', 'Charlie'],
 *       ['👩‍❤️‍👩', 'Delta']
 *     ],
 *     {stringLength: stringWidth}
 *   )
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo   |
 *   | ----- | ------- |
 *   | 中文  | Charlie |
 *   | 👩‍❤️‍👩    | Delta   |
 *   ```
 */

/**
 * @param {string} value
 *   Cell value.
 * @returns {number}
 *   Cell size.
 */
function defaultStringLength(value) {
  return value.length
}

/**
 * Generate a markdown
 * ([GFM](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables))
 * table.
 *
 * @param {ReadonlyArray<ReadonlyArray<string | null | undefined>>} table
 *   Table data (matrix of strings).
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Result.
 */
function markdownTable(table, options) {
  const settings = options || {}
  // To do: next major: change to spread.
  const align = (settings.align || []).concat()
  const stringLength = settings.stringLength || defaultStringLength
  /** @type {Array<number>} Character codes as symbols for alignment per column. */
  const alignments = []
  /** @type {Array<Array<string>>} Cells per row. */
  const cellMatrix = []
  /** @type {Array<Array<number>>} Sizes of each cell per row. */
  const sizeMatrix = []
  /** @type {Array<number>} */
  const longestCellByColumn = []
  let mostCellsPerRow = 0
  let rowIndex = -1

  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
  // do superfluous work when aligning, so optimize for aligning.
  while (++rowIndex < table.length) {
    /** @type {Array<string>} */
    const row = []
    /** @type {Array<number>} */
    const sizes = []
    let columnIndex = -1

    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length
    }

    while (++columnIndex < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex])

      if (settings.alignDelimiters !== false) {
        const size = stringLength(cell)
        sizes[columnIndex] = size

        if (
          longestCellByColumn[columnIndex] === undefined ||
          size > longestCellByColumn[columnIndex]
        ) {
          longestCellByColumn[columnIndex] = size
        }
      }

      row.push(cell)
    }

    cellMatrix[rowIndex] = row
    sizeMatrix[rowIndex] = sizes
  }

  // Figure out which alignments to use.
  let columnIndex = -1

  if (typeof align === 'object' && 'length' in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex])
    }
  } else {
    const code = toAlignment(align)

    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code
    }
  }

  // Inject the alignment row.
  columnIndex = -1
  /** @type {Array<string>} */
  const row = []
  /** @type {Array<number>} */
  const sizes = []

  while (++columnIndex < mostCellsPerRow) {
    const code = alignments[columnIndex]
    let before = ''
    let after = ''

    if (code === 99 /* `c` */) {
      before = ':'
      after = ':'
    } else if (code === 108 /* `l` */) {
      before = ':'
    } else if (code === 114 /* `r` */) {
      after = ':'
    }

    // There *must* be at least one hyphen-minus in each alignment cell.
    let size =
      settings.alignDelimiters === false
        ? 1
        : Math.max(
            1,
            longestCellByColumn[columnIndex] - before.length - after.length
          )

    const cell = before + '-'.repeat(size) + after

    if (settings.alignDelimiters !== false) {
      size = before.length + size + after.length

      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size
      }

      sizes[columnIndex] = size
    }

    row[columnIndex] = cell
  }

  // Inject the alignment row.
  cellMatrix.splice(1, 0, row)
  sizeMatrix.splice(1, 0, sizes)

  rowIndex = -1
  /** @type {Array<string>} */
  const lines = []

  while (++rowIndex < cellMatrix.length) {
    const row = cellMatrix[rowIndex]
    const sizes = sizeMatrix[rowIndex]
    columnIndex = -1
    /** @type {Array<string>} */
    const line = []

    while (++columnIndex < mostCellsPerRow) {
      const cell = row[columnIndex] || ''
      let before = ''
      let after = ''

      if (settings.alignDelimiters !== false) {
        const size =
          longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0)
        const code = alignments[columnIndex]

        if (code === 114 /* `r` */) {
          before = ' '.repeat(size)
        } else if (code === 99 /* `c` */) {
          if (size % 2) {
            before = ' '.repeat(size / 2 + 0.5)
            after = ' '.repeat(size / 2 - 0.5)
          } else {
            before = ' '.repeat(size / 2)
            after = before
          }
        } else {
          after = ' '.repeat(size)
        }
      }

      if (settings.delimiterStart !== false && !columnIndex) {
        line.push('|')
      }

      if (
        settings.padding !== false &&
        // Don’t add the opening space if we’re not aligning and the cell is
        // empty: there will be a closing space.
        !(settings.alignDelimiters === false && cell === '') &&
        (settings.delimiterStart !== false || columnIndex)
      ) {
        line.push(' ')
      }

      if (settings.alignDelimiters !== false) {
        line.push(before)
      }

      line.push(cell)

      if (settings.alignDelimiters !== false) {
        line.push(after)
      }

      if (settings.padding !== false) {
        line.push(' ')
      }

      if (
        settings.delimiterEnd !== false ||
        columnIndex !== mostCellsPerRow - 1
      ) {
        line.push('|')
      }
    }

    lines.push(
      settings.delimiterEnd === false
        ? line.join('').replace(/ +$/, '')
        : line.join('')
    )
  }

  return lines.join('\n')
}

/**
 * @param {string | null | undefined} [value]
 *   Value to serialize.
 * @returns {string}
 *   Result.
 */
function serialize(value) {
  return value === null || value === undefined ? '' : String(value)
}

/**
 * @param {string | null | undefined} value
 *   Value.
 * @returns {number}
 *   Alignment.
 */
function toAlignment(value) {
  const code = typeof value === 'string' ? value.codePointAt(0) : 0

  return code === 67 /* `C` */ || code === 99 /* `c` */
    ? 99 /* `c` */
    : code === 76 /* `L` */ || code === 108 /* `l` */
      ? 108 /* `l` */
      : code === 82 /* `R` */ || code === 114 /* `r` */
        ? 114 /* `r` */
        : 0
}


/***/ }),

/***/ 87869:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ paragraph)
/* harmony export */ });
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Paragraph, Parents} from 'mdast'
 */

/**
 * Serialize a paragraph node.
 *
 * @param {Paragraph} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function paragraph(node, _, state, info) {
  const exit = state.enter('paragraph')
  const subexit = state.enter('phrasing')
  const value = state.containerPhrasing(node, info)
  subexit()
  exit()
  return value
}


/***/ }),

/***/ 89066:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Wifi)
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
    name: "wifi",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 20h.01",
                key: "zekei9"
            }
        ],
        [
            "path",
            {
                d: "M2 8.82a15 15 0 0 1 20 0",
                key: "dnpr2z"
            }
        ],
        [
            "path",
            {
                d: "M5 12.859a10 10 0 0 1 14 0",
                key: "1x1e6c"
            }
        ],
        [
            "path",
            {
                d: "M8.5 16.429a5 5 0 0 1 7 0",
                key: "1bycff"
            }
        ]
    ]
};
__iconData.node;
const Wifi = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=wifi.mjs.map


/***/ }),

/***/ 91285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ link)
/* harmony export */ });
/* harmony import */ var _util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40464);
/* harmony import */ var _util_format_link_as_autolink_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5770);
/**
 * @import {Info, State} from 'mdast-util-to-markdown'
 * @import {Link, Parents} from 'mdast'
 * @import {Exit} from '../types.js'
 */




link.peek = linkPeek

/**
 * Serialize a link node.
 *
 * @param {Link} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @param {Info} info
 *   Info on surrounding context.
 * @returns {string}
 *   Serialized markdown.
 */
function link(node, _, state, info) {
  const quote = (0,_util_check_quote_js__WEBPACK_IMPORTED_MODULE_0__/* .checkQuote */ .Z)(state)
  const suffix = quote === '"' ? 'Quote' : 'Apostrophe'
  const tracker = state.createTracker(info)

  if ((0,_util_format_link_as_autolink_js__WEBPACK_IMPORTED_MODULE_1__/* .formatLinkAsAutolink */ .h)(node, state)) {
    // Hide that we’re in phrasing as things like attention or code cannot form
    // in autolinks.
    // Character escapes also don’t work (nor character references),
    // but that is a different matter, which `safe.js` handles for `autolink`.
    // It is important to know about other constructs, such as table cells.
    const stack = state.stack
    state.stack = stack.filter(function (d) {
      return d !== 'phrasing'
    })
    const exit = state.enter('autolink')
    let value = tracker.move('<')
    value += tracker.move(
      state.containerPhrasing(node, {
        before: value,
        after: '>',
        ...tracker.current()
      })
    )
    value += tracker.move('>')
    exit()
    state.stack = stack
    return value
  }

  const exit = state.enter('link')
  let subexit = state.enter('label')
  let value = tracker.move('[')
  const text = state.containerPhrasing(node, {
    before: value,
    after: '](',
    ...tracker.current()
  })
  value += tracker.move(text)
  subexit()
  value += tracker.move('](')

  // A link could accidentally turn into a definition in certain contexts:
  // at the start of a line, without title, when its text has a `]` that
  // cannot be escaped (such as in code).
  //
  // We can prevent that with an empty title:
  //
  // ```
  // [`a]:`](b)
  // ```
  //
  // …is a definition with `` `](b) `` as its destination.
  //
  // Using:
  //
  // ```
  // [`a]:`](b "")
  // ```
  //
  // …instead fixes it.
  //
  // Control characters or whitespace in the url need an enclosed destination,
  // which also prevents this.
  const enclose = /[\0- \u007F]/.test(node.url)
  const last = info.before.charAt(info.before.length - 1)
  let title = node.title || undefined

  if (!title && !enclose && (last === '\n' || last === '\r')) {
    let index = 0

    while (index < text.length && text.charCodeAt(index) !== 93 /* `]` */) {
      index += text.charCodeAt(index) === 92 /* `\` */ ? 2 : 1
    }

    if (text.charCodeAt(index + 1) === 58 /* `:` */) title = ''
  }

  if (
    // If there’s no url but there is a title…
    (!node.url && typeof title === 'string') ||
    // If there are control characters or whitespace.
    enclose
  ) {
    subexit = state.enter('destinationLiteral')
    value += tracker.move('<')
    value += tracker.move(
      state.safe(node.url, {before: value, after: '>', ...tracker.current()})
    )
    value += tracker.move('>')
  } else {
    // No whitespace, raw is prettier.
    subexit = state.enter('destinationRaw')
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: typeof title === 'string' ? ' ' : ')',
        ...tracker.current()
      })
    )
  }

  subexit()

  if (typeof title === 'string') {
    subexit = state.enter(`title${suffix}`)
    value += tracker.move(' ' + quote)
    value += tracker.move(
      state.safe(title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    )
    value += tracker.move(quote)
    subexit()
  }

  value += tracker.move(')')

  exit()
  return value
}

/**
 * Peek at this node.
 *
 * @param {Link} node
 *   Node to peek at.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @returns {string}
 *   Start of the serialized markdown.
 */
function linkPeek(node, _, state) {
  return (0,_util_format_link_as_autolink_js__WEBPACK_IMPORTED_MODULE_1__/* .formatLinkAsAutolink */ .h)(node, state) ? '<' : '['
}


/***/ }),

/***/ 92786:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ ZodRealError)
/* harmony export */ });
/* unused harmony export ZodError */
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27855);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55503);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68056);



/* Prototypes that already carry the lazy helper methods. Seeded with the
 * intrinsics so that `init` on a foreign object — it accepts any object —
 * can never install an accessor onto a prototype we do not own. */
const _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
/* Helper methods live as non-enumerable lazy getters on the shared
 * prototype instead of own properties on every instance. On first
 * access the getter allocates the per-instance closure and caches it
 * as a non-enumerable own property, so detached usage still works and
 * the allocation only happens for methods actually touched. */
function _lazyMethod(proto, key, make) {
    Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: false,
        get() {
            const value = make(this);
            Object.defineProperty(this, key, { value, configurable: true, writable: true });
            return value;
        },
        set(value) {
            Object.defineProperty(this, key, { value, configurable: true, writable: true });
        },
    });
}
const initializer = (inst, issues) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodError */ .a$.init(inst, issues);
    inst.name = "ZodError";
    const proto = Object.getPrototypeOf(inst);
    if (_installedErrorProtos.has(proto))
        return;
    _installedErrorProtos.add(proto);
    _lazyMethod(proto, "format", (self) => (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .formatError */ .Wk(self, mapper));
    _lazyMethod(proto, "flatten", (self) => (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .flattenError */ .JM(self, mapper));
    _lazyMethod(proto, "addIssue", (self) => (issue) => {
        self.issues.push(issue);
        self.message = JSON.stringify(self.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_1__/* .jsonStringifyReplacer */ .k8, 2);
    });
    _lazyMethod(proto, "addIssues", (self) => (issues) => {
        self.issues.push(...issues);
        self.message = JSON.stringify(self.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_1__/* .jsonStringifyReplacer */ .k8, 2);
    });
    Object.defineProperty(proto, "isEmpty", {
        configurable: true,
        enumerable: false,
        get() {
            return this.issues.length === 0;
        },
    });
};
const ZodError = /*@__PURE__*/ (/* unused pure expression or super */ null && (core.$constructor("ZodError", initializer)));
const ZodRealError = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_2__/* .$constructor */ .xI("ZodError", initializer, undefined, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;


/***/ }),

/***/ 93902:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ gfmTable)
/* harmony export */ });
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62835);
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4294);
/* harmony import */ var _edit_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99942);
/* harmony import */ var _infer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49439);
/**
 * @import {Event, Extension, Point, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
 */

/**
 * @typedef {[number, number, number, number]} Range
 *   Cell info.
 *
 * @typedef {0 | 1 | 2 | 3} RowKind
 *   Where we are: `1` for head row, `2` for delimiter row, `3` for body row.
 */






/**
 * Create an HTML extension for `micromark` to support GitHub tables syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   table syntax.
 */
function gfmTable() {
  return {
    flow: {
      null: {
        name: 'table',
        tokenize: tokenizeTable,
        resolveAll: resolveTable
      }
    }
  };
}

/**
 * Tokenizer for GFM tables.
 *
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeTable(effects, ok, nok) {
  const self = this;
  let size = 0;
  let sizeB = 0;
  /** @type {boolean | undefined} */
  let seen;
  return start;

  /**
   * Start of a GFM table.
   *
   * If there is a valid table row or table head before, then we try to parse
   * another row.
   * Otherwise, we try to parse a head.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   * > | | b |
   *     ^
   * ```
   * @type {State}
   */
  function start(code) {
    let index = self.events.length - 1;
    while (index > -1) {
      const {
        type
      } = self.events[index][1];
      if (type === "lineEnding" ||
      // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      type === "linePrefix") {
        index--;
      } else {
        break;
      }
    }
    const tail = index > -1 ? self.events[index][1].type : null;
    const next = tail === 'tableHead' || tail === 'tableRow' ? bodyRowStart : headRowBefore;

    // Don’t allow lazy body rows.
    if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
      return nok(code);
    }
    return next(code);
  }

  /**
   * Before table head row.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headRowBefore(code) {
    effects.enter('tableHead');
    effects.enter('tableRow');
    return headRowStart(code);
  }

  /**
   * Before table head row, after whitespace.
   *
   * ```markdown
   * > | | a |
   *     ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headRowStart(code) {
    if (code === 124) {
      return headRowBreak(code);
    }

    // To do: micromark-js should let us parse our own whitespace in extensions,
    // like `markdown-rs`:
    //
    // ```js
    // // 4+ spaces.
    // if (markdownSpace(code)) {
    //   return nok(code)
    // }
    // ```

    seen = true;
    // Count the first character, that isn’t a pipe, double.
    sizeB += 1;
    return headRowBreak(code);
  }

  /**
   * At break in table head row.
   *
   * ```markdown
   * > | | a |
   *     ^
   *       ^
   *         ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headRowBreak(code) {
    if (code === null) {
      // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
      return nok(code);
    }
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEnding */ .HP)(code)) {
      // If anything other than one pipe (ignoring whitespace) was used, it’s fine.
      if (sizeB > 1) {
        sizeB = 0;
        // To do: check if this works.
        // Feel free to interrupt:
        self.interrupt = true;
        effects.exit('tableRow');
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return headDelimiterStart;
      }

      // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
      return nok(code);
    }
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      // To do: check if this is fine.
      // effects.attempt(State::Next(StateName::GfmTableHeadRowBreak), State::Nok)
      // State::Retry(space_or_tab(tokenizer))
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, headRowBreak, "whitespace")(code);
    }
    sizeB += 1;
    if (seen) {
      seen = false;
      // Header cell count.
      size += 1;
    }
    if (code === 124) {
      effects.enter('tableCellDivider');
      effects.consume(code);
      effects.exit('tableCellDivider');
      // Whether a delimiter was seen.
      seen = true;
      return headRowBreak;
    }

    // Anything else is cell data.
    effects.enter("data");
    return headRowData(code);
  }

  /**
   * In table head row data.
   *
   * ```markdown
   * > | | a |
   *       ^
   *   | | - |
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headRowData(code) {
    if (code === null || code === 124 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      effects.exit("data");
      return headRowBreak(code);
    }
    effects.consume(code);
    return code === 92 ? headRowEscape : headRowData;
  }

  /**
   * In table head row escape.
   *
   * ```markdown
   * > | | a\-b |
   *         ^
   *   | | ---- |
   *   | | c    |
   * ```
   *
   * @type {State}
   */
  function headRowEscape(code) {
    if (code === 92 || code === 124) {
      effects.consume(code);
      return headRowData;
    }
    return headRowData(code);
  }

  /**
   * Before delimiter row.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *     ^
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headDelimiterStart(code) {
    // Reset `interrupt`.
    self.interrupt = false;

    // Note: in `markdown-rs`, we need to handle piercing here too.
    if (self.parser.lazy[self.now().line]) {
      return nok(code);
    }
    effects.enter('tableDelimiterRow');
    // Track if we’ve seen a `:` or `|`.
    seen = false;
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
    }
    return headDelimiterBefore(code);
  }

  /**
   * Before delimiter row, after optional whitespace.
   *
   * Reused when a `|` is found later, to parse another cell.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *     ^
   *   | | b |
   * ```
   *
   * @type {State}
   */
  function headDelimiterBefore(code) {
    if (code === 45 || code === 58) {
      return headDelimiterValueBefore(code);
    }
    if (code === 124) {
      seen = true;
      // If we start with a pipe, we open a cell marker.
      effects.enter('tableCellDivider');
      effects.consume(code);
      effects.exit('tableCellDivider');
      return headDelimiterCellBefore;
    }

    // More whitespace / empty row not allowed at start.
    return headDelimiterNok(code);
  }

  /**
   * After `|`, before delimiter cell.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *      ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterCellBefore(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, headDelimiterValueBefore, "whitespace")(code);
    }
    return headDelimiterValueBefore(code);
  }

  /**
   * Before delimiter cell value.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *       ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterValueBefore(code) {
    // Align: left.
    if (code === 58) {
      sizeB += 1;
      seen = true;
      effects.enter('tableDelimiterMarker');
      effects.consume(code);
      effects.exit('tableDelimiterMarker');
      return headDelimiterLeftAlignmentAfter;
    }

    // Align: none.
    if (code === 45) {
      sizeB += 1;
      // To do: seems weird that this *isn’t* left aligned, but that state is used?
      return headDelimiterLeftAlignmentAfter(code);
    }
    if (code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEnding */ .HP)(code)) {
      return headDelimiterCellAfter(code);
    }
    return headDelimiterNok(code);
  }

  /**
   * After delimiter cell left alignment marker.
   *
   * ```markdown
   *   | | a  |
   * > | | :- |
   *        ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterLeftAlignmentAfter(code) {
    if (code === 45) {
      effects.enter('tableDelimiterFiller');
      return headDelimiterFiller(code);
    }

    // Anything else is not ok after the left-align colon.
    return headDelimiterNok(code);
  }

  /**
   * In delimiter cell filler.
   *
   * ```markdown
   *   | | a |
   * > | | - |
   *       ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterFiller(code) {
    if (code === 45) {
      effects.consume(code);
      return headDelimiterFiller;
    }

    // Align is `center` if it was `left`, `right` otherwise.
    if (code === 58) {
      seen = true;
      effects.exit('tableDelimiterFiller');
      effects.enter('tableDelimiterMarker');
      effects.consume(code);
      effects.exit('tableDelimiterMarker');
      return headDelimiterRightAlignmentAfter;
    }
    effects.exit('tableDelimiterFiller');
    return headDelimiterRightAlignmentAfter(code);
  }

  /**
   * After delimiter cell right alignment marker.
   *
   * ```markdown
   *   | |  a |
   * > | | -: |
   *         ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterRightAlignmentAfter(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, headDelimiterCellAfter, "whitespace")(code);
    }
    return headDelimiterCellAfter(code);
  }

  /**
   * After delimiter cell.
   *
   * ```markdown
   *   | |  a |
   * > | | -: |
   *          ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterCellAfter(code) {
    if (code === 124) {
      return headDelimiterBefore(code);
    }
    if (code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEnding */ .HP)(code)) {
      // Exit when:
      // * there was no `:` or `|` at all (it’s a thematic break or setext
      //   underline instead)
      // * the header cell count is not the delimiter cell count
      if (!seen || size !== sizeB) {
        return headDelimiterNok(code);
      }

      // Note: in markdown-rs`, a reset is needed here.
      effects.exit('tableDelimiterRow');
      effects.exit('tableHead');
      // To do: in `markdown-rs`, resolvers need to be registered manually.
      // effects.register_resolver(ResolveName::GfmTable)
      return ok(code);
    }
    return headDelimiterNok(code);
  }

  /**
   * In delimiter row, at a disallowed byte.
   *
   * ```markdown
   *   | | a |
   * > | | x |
   *       ^
   * ```
   *
   * @type {State}
   */
  function headDelimiterNok(code) {
    // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
    return nok(code);
  }

  /**
   * Before table body row.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *     ^
   * ```
   *
   * @type {State}
   */
  function bodyRowStart(code) {
    // Note: in `markdown-rs` we need to manually take care of a prefix,
    // but in `micromark-js` that is done for us, so if we’re here, we’re
    // never at whitespace.
    effects.enter('tableRow');
    return bodyRowBreak(code);
  }

  /**
   * At break in table body row.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *     ^
   *       ^
   *         ^
   * ```
   *
   * @type {State}
   */
  function bodyRowBreak(code) {
    if (code === 124) {
      effects.enter('tableCellDivider');
      effects.consume(code);
      effects.exit('tableCellDivider');
      return bodyRowBreak;
    }
    if (code === null || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEnding */ .HP)(code)) {
      effects.exit('tableRow');
      return ok(code);
    }
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownSpace */ .On)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__/* .factorySpace */ .N)(effects, bodyRowBreak, "whitespace")(code);
    }

    // Anything else is cell content.
    effects.enter("data");
    return bodyRowData(code);
  }

  /**
   * In table body row data.
   *
   * ```markdown
   *   | | a |
   *   | | - |
   * > | | b |
   *       ^
   * ```
   *
   * @type {State}
   */
  function bodyRowData(code) {
    if (code === null || code === 124 || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__/* .markdownLineEndingOrSpace */ .Ee)(code)) {
      effects.exit("data");
      return bodyRowBreak(code);
    }
    effects.consume(code);
    return code === 92 ? bodyRowEscape : bodyRowData;
  }

  /**
   * In table body row escape.
   *
   * ```markdown
   *   | | a    |
   *   | | ---- |
   * > | | b\-c |
   *         ^
   * ```
   *
   * @type {State}
   */
  function bodyRowEscape(code) {
    if (code === 92 || code === 124) {
      effects.consume(code);
      return bodyRowData;
    }
    return bodyRowData(code);
  }
}

/** @type {Resolver} */

function resolveTable(events, context) {
  let index = -1;
  let inFirstCellAwaitingPipe = true;
  /** @type {RowKind} */
  let rowKind = 0;
  /** @type {Range} */
  let lastCell = [0, 0, 0, 0];
  /** @type {Range} */
  let cell = [0, 0, 0, 0];
  let afterHeadAwaitingFirstBodyRow = false;
  let lastTableEnd = 0;
  /** @type {Token | undefined} */
  let currentTable;
  /** @type {Token | undefined} */
  let currentBody;
  /** @type {Token | undefined} */
  let currentCell;
  const map = new _edit_map_js__WEBPACK_IMPORTED_MODULE_2__/* .EditMap */ .n();
  while (++index < events.length) {
    const event = events[index];
    const token = event[1];
    if (event[0] === 'enter') {
      // Start of head.
      if (token.type === 'tableHead') {
        afterHeadAwaitingFirstBodyRow = false;

        // Inject previous (body end and) table end.
        if (lastTableEnd !== 0) {
          flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
          currentBody = undefined;
          lastTableEnd = 0;
        }

        // Inject table start.
        currentTable = {
          type: 'table',
          start: Object.assign({}, token.start),
          // Note: correct end is set later.
          end: Object.assign({}, token.end)
        };
        map.add(index, 0, [['enter', currentTable, context]]);
      } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
        inFirstCellAwaitingPipe = true;
        currentCell = undefined;
        lastCell = [0, 0, 0, 0];
        cell = [0, index + 1, 0, 0];

        // Inject table body start.
        if (afterHeadAwaitingFirstBodyRow) {
          afterHeadAwaitingFirstBodyRow = false;
          currentBody = {
            type: 'tableBody',
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map.add(index, 0, [['enter', currentBody, context]]);
        }
        rowKind = token.type === 'tableDelimiterRow' ? 2 : currentBody ? 3 : 1;
      }
      // Cell data.
      else if (rowKind && (token.type === "data" || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
        inFirstCellAwaitingPipe = false;

        // First value in cell.
        if (cell[2] === 0) {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
            lastCell = [0, 0, 0, 0];
          }
          cell[2] = index;
        }
      } else if (token.type === 'tableCellDivider') {
        if (inFirstCellAwaitingPipe) {
          inFirstCellAwaitingPipe = false;
        } else {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
          }
          lastCell = cell;
          cell = [lastCell[1], index, 0, 0];
        }
      }
    }
    // Exit events.
    else if (token.type === 'tableHead') {
      afterHeadAwaitingFirstBodyRow = true;
      lastTableEnd = index;
    } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
      lastTableEnd = index;
      if (lastCell[1] !== 0) {
        cell[0] = cell[1];
        currentCell = flushCell(map, context, lastCell, rowKind, index, currentCell);
      } else if (cell[1] !== 0) {
        currentCell = flushCell(map, context, cell, rowKind, index, currentCell);
      }
      rowKind = 0;
    } else if (rowKind && (token.type === "data" || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
      cell[3] = index;
    }
  }
  if (lastTableEnd !== 0) {
    flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
  }
  map.consume(context.events);

  // To do: move this into `html`, when events are exposed there.
  // That’s what `markdown-rs` does.
  // That needs updates to `mdast-util-gfm-table`.
  index = -1;
  while (++index < context.events.length) {
    const event = context.events[index];
    if (event[0] === 'enter' && event[1].type === 'table') {
      event[1]._align = (0,_infer_js__WEBPACK_IMPORTED_MODULE_3__/* .gfmTableAlign */ .S)(context.events, index);
    }
  }
  return events;
}

/**
 * Generate a cell.
 *
 * @param {EditMap} map
 *   Edit map to apply to.
 * @param {Readonly<TokenizeContext>} context
 *   Tokenize context.
 * @param {Readonly<Range>} range
 *   Range of the cell within events.
 * @param {RowKind} rowKind
 *   Type of row.
 * @param {number | undefined} rowEnd
 *   Index of the end of the row, if known.
 * @param {Token | undefined} previousCell
 *   Previous cell token, if any.
 * @returns {Token | undefined}
 *   Current cell token after flushing, if any.
 */
// eslint-disable-next-line max-params
function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
  // `markdown-rs` uses:
  // rowKind === 2 ? 'tableDelimiterCell' : 'tableCell'
  const groupName = rowKind === 1 ? 'tableHeader' : rowKind === 2 ? 'tableDelimiter' : 'tableData';
  // `markdown-rs` uses:
  // rowKind === 2 ? 'tableDelimiterCellValue' : 'tableCellText'
  const valueName = 'tableContent';

  // Insert an exit for the previous cell, if there is one.
  //
  // ```markdown
  // > | | aa | bb | cc |
  //          ^-- exit
  //           ^^^^-- this cell
  // ```
  if (range[0] !== 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
    map.add(range[0], 0, [['exit', previousCell, context]]);
  }

  // Insert enter of this cell.
  //
  // ```markdown
  // > | | aa | bb | cc |
  //           ^-- enter
  //           ^^^^-- this cell
  // ```
  const now = getPoint(context.events, range[1]);
  previousCell = {
    type: groupName,
    start: Object.assign({}, now),
    // Note: correct end is set later.
    end: Object.assign({}, now)
  };
  map.add(range[1], 0, [['enter', previousCell, context]]);

  // Insert text start at first data start and end at last data end, and
  // remove events between.
  //
  // ```markdown
  // > | | aa | bb | cc |
  //            ^-- enter
  //             ^-- exit
  //           ^^^^-- this cell
  // ```
  if (range[2] !== 0) {
    const relatedStart = getPoint(context.events, range[2]);
    const relatedEnd = getPoint(context.events, range[3]);
    /** @type {Token} */
    const valueToken = {
      type: valueName,
      start: Object.assign({}, relatedStart),
      end: Object.assign({}, relatedEnd)
    };
    map.add(range[2], 0, [['enter', valueToken, context]]);
    if (rowKind !== 2) {
      // Fix positional info on remaining events
      const start = context.events[range[2]];
      const end = context.events[range[3]];
      start[1].end = Object.assign({}, end[1].end);
      start[1].type = "chunkText";
      start[1].contentType = "text";

      // Remove if needed.
      if (range[3] > range[2] + 1) {
        const a = range[2] + 1;
        const b = range[3] - range[2] - 1;
        map.add(a, b, []);
      }
    }
    map.add(range[3] + 1, 0, [['exit', valueToken, context]]);
  }

  // Insert an exit for the last cell, if at the row end.
  //
  // ```markdown
  // > | | aa | bb | cc |
  //                    ^-- exit
  //               ^^^^^^-- this cell (the last one contains two “between” parts)
  // ```
  if (rowEnd !== undefined) {
    previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
    map.add(rowEnd, 0, [['exit', previousCell, context]]);
    previousCell = undefined;
  }
  return previousCell;
}

/**
 * Generate table end (and table body end).
 *
 * @param {Readonly<EditMap>} map
 *   Edit map to apply to.
 * @param {Readonly<TokenizeContext>} context
 *   Tokenize context.
 * @param {number} index
 *   Index within the events where the table end should be inserted.
 * @param {Token} table
 *   Table token.
 * @param {Token | undefined} tableBody
 *   Table body token, if any.
 * @returns {undefined}
 *   Nothing.
 */
// eslint-disable-next-line max-params
function flushTableEnd(map, context, index, table, tableBody) {
  /** @type {Array<Event>} */
  const exits = [];
  const related = getPoint(context.events, index);
  if (tableBody) {
    tableBody.end = Object.assign({}, related);
    exits.push(['exit', tableBody, context]);
  }
  table.end = Object.assign({}, related);
  exits.push(['exit', table, context]);
  map.add(index + 1, 0, exits);
}

/**
 * Get the point (start or end) for a given event in the list of events.
 *
 * @param {Readonly<Array<Event>>} events
 *   List of events.
 * @param {number} index
 *   Index of the event to get the point for.
 * @returns {Readonly<Point>}
 *   Start point for enter and end point for exit.
 */
function getPoint(events, index) {
  const event = events[index];
  const side = event[0] === 'enter' ? 'start' : 'end';
  return event[1][side];
}

/***/ }),

/***/ 93999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ gfmFromMarkdown),
/* harmony export */   H: () => (/* binding */ gfmToMarkdown)
/* harmony export */ });
/* harmony import */ var mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85577);
/* harmony import */ var mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14436);
/* harmony import */ var mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50349);
/* harmony import */ var mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34358);
/* harmony import */ var mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74284);
/**
 * @import {Extension as FromMarkdownExtension} from 'mdast-util-from-markdown'
 * @import {Options} from 'mdast-util-gfm'
 * @import {Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
 */







/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @returns {Array<FromMarkdownExtension>}
 *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
function gfmFromMarkdown() {
  return [
    (0,mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__/* .gfmAutolinkLiteralFromMarkdown */ .C)(),
    (0,mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__/* .gfmFootnoteFromMarkdown */ .i)(),
    (0,mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__/* .gfmStrikethroughFromMarkdown */ .p)(),
    (0,mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__/* .gfmTableFromMarkdown */ .c)(),
    (0,mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__/* .gfmTaskListItemFromMarkdown */ .S)()
  ]
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
function gfmToMarkdown(options) {
  return {
    extensions: [
      (0,mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__/* .gfmAutolinkLiteralToMarkdown */ .r)(),
      (0,mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__/* .gfmFootnoteToMarkdown */ .h)(options),
      (0,mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__/* .gfmStrikethroughToMarkdown */ .K)(),
      (0,mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__/* .gfmTableToMarkdown */ .d)(options),
      (0,mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__/* .gfmTaskListItemToMarkdown */ .P)()
    ]
  }
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

/***/ 97042:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ gfm)
/* harmony export */ });
/* unused harmony export gfmHtml */
/* harmony import */ var micromark_util_combine_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50783);
/* harmony import */ var micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37233);
/* harmony import */ var micromark_extension_gfm_footnote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21206);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47651);
/* harmony import */ var micromark_extension_gfm_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93902);
/* harmony import */ var micromark_extension_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(73206);
/**
 * @typedef {import('micromark-extension-gfm-footnote').HtmlOptions} HtmlOptions
 * @typedef {import('micromark-extension-gfm-strikethrough').Options} Options
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */









/**
 * Create an extension for `micromark` to enable GFM syntax.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-strikethrough`.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   syntax.
 */
function gfm(options) {
  return (0,micromark_util_combine_extensions__WEBPACK_IMPORTED_MODULE_0__/* .combineExtensions */ .y)([
    (0,micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_1__/* .gfmAutolinkLiteral */ .$)(),
    (0,micromark_extension_gfm_footnote__WEBPACK_IMPORTED_MODULE_2__/* .gfmFootnote */ .r)(),
    (0,micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_3__/* .gfmStrikethrough */ .K)(options),
    (0,micromark_extension_gfm_table__WEBPACK_IMPORTED_MODULE_4__/* .gfmTable */ .x)(),
    (0,micromark_extension_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_5__/* .gfmTaskListItem */ .J)()
  ])
}

/**
 * Create an extension for `micromark` to support GFM when serializing to HTML.
 *
 * @param {HtmlOptions | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-footnote`.
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GFM when serializing to HTML.
 */
function gfmHtml(options) {
  return combineHtmlExtensions([
    gfmAutolinkLiteralHtml(),
    gfmFootnoteHtml(options),
    gfmStrikethroughHtml(),
    gfmTableHtml(),
    gfmTagfilterHtml(),
    gfmTaskListItemHtml()
  ])
}


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


/***/ }),

/***/ 99942:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ EditMap)
/* harmony export */ });
/**
 * @import {Event} from 'micromark-util-types'
 */

// Port of `edit_map.rs` from `markdown-rs`.
// This should move to `markdown-js` later.

// Deal with several changes in events, batching them together.
//
// Preferably, changes should be kept to a minimum.
// Sometimes, it’s needed to change the list of events, because parsing can be
// messy, and it helps to expose a cleaner interface of events to the compiler
// and other users.
// It can also help to merge many adjacent similar events.
// And, in other cases, it’s needed to parse subcontent: pass some events
// through another tokenizer and inject the result.

/**
 * @typedef {[number, number, Array<Event>]} Change
 * @typedef {[number, number, number]} Jump
 */

/**
 * Tracks a bunch of edits.
 */
class EditMap {
  /**
   * Create a new edit map.
   */
  constructor() {
    /**
     * Record of changes.
     *
     * @type {Array<Change>}
     */
    this.map = [];

    /**
     * Changes by index, so `add` does not scan `map` (quadratic on
     * table-heavy documents).
     *
     * @type {Map<number, Change>}
     */
    this.index = new Map();
  }

  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   *   Index at which to apply the edit.
   * @param {number} remove
   *   Count of items to remove at the index.
   * @param {Array<Event>} add
   *   Items to add at the index.
   * @returns {undefined}
   *   Nothing.
   */
  add(index, remove, add) {
    addImplementation(this, index, remove, add);
  }

  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }

  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   *   List of events to apply the edits to.
   * @returns {undefined}
   *   Nothing.
   */
  consume(events) {
    this.map.sort(function (a, b) {
      return a[0] - b[0];
    });

    /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
    if (this.map.length === 0) {
      return;
    }

    // To do: if links are added in events, like they are in `markdown-rs`,
    // this is needed.
    // // Calculate jumps: where items in the current list move to.
    // /** @type {Array<Jump>} */
    // const jumps = []
    // let index = 0
    // let addAcc = 0
    // let removeAcc = 0
    // while (index < this.map.length) {
    //   const [at, remove, add] = this.map[index]
    //   removeAcc += remove
    //   addAcc += add.length
    //   jumps.push([at, removeAcc, addAcc])
    //   index += 1
    // }
    //
    // . shiftLinks(events, jumps)

    let index = this.map.length;
    /** @type {Array<Array<Event>>} */
    const vecs = [];
    while (index > 0) {
      index -= 1;
      vecs.push(events.slice(this.map[index][0] + this.map[index][1]), this.map[index][2]);

      // Truncate rest.
      events.length = this.map[index][0];
    }
    vecs.push(events.slice());
    events.length = 0;
    let slice = vecs.pop();
    while (slice) {
      for (const element of slice) {
        events.push(element);
      }
      slice = vecs.pop();
    }

    // Truncate everything.
    this.map.length = 0;
    this.index.clear();
  }
}

/**
 * Create an edit.
 *
 * @param {EditMap} editMap
 *   Edit map to apply to.
 * @param {number} at
 *   Index at which to apply the edit.
 * @param {number} remove
 *   Count of items to remove at the index.
 * @param {Array<Event>} add
 *   Items to add at the index.
 * @returns {undefined}
 *   Nothing.
 */
function addImplementation(editMap, at, remove, add) {
  /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
  if (remove === 0 && add.length === 0) {
    return;
  }
  const existing = editMap.index.get(at);
  if (existing) {
    existing[1] += remove;

    // To do: before not used by tables, use when moving to micromark.
    // if (before) {
    //   add.push(...existing[2])
    //   existing[2] = add
    // } else {
    existing[2].push(...add);
    // }

    return;
  }

  /** @type {Change} */
  const change = [at, remove, add];
  editMap.map.push(change);
  editMap.index.set(at, change);
}

// /**
//  * Shift `previous` and `next` links according to `jumps`.
//  *
//  * This fixes links in case there are events removed or added between them.
//  *
//  * @param {Array<Event>} events
//  * @param {Array<Jump>} jumps
//  */
// function shiftLinks(events, jumps) {
//   let jumpIndex = 0
//   let index = 0
//   let add = 0
//   let rm = 0

//   while (index < events.length) {
//     const rmCurr = rm

//     while (jumpIndex < jumps.length && jumps[jumpIndex][0] <= index) {
//       add = jumps[jumpIndex][2]
//       rm = jumps[jumpIndex][1]
//       jumpIndex += 1
//     }

//     // Ignore items that will be removed.
//     if (rm > rmCurr) {
//       index += rm - rmCurr
//     } else {
//       // ?
//       // if let Some(link) = &events[index].link {
//       //     if let Some(next) = link.next {
//       //         events[next].link.as_mut().unwrap().previous = Some(index + add - rm);
//       //         while jumpIndex < jumps.len() && jumps[jumpIndex].0 <= next {
//       //             add = jumps[jumpIndex].2;
//       //             rm = jumps[jumpIndex].1;
//       //             jumpIndex += 1;
//       //         }
//       //         events[index].link.as_mut().unwrap().next = Some(next + add - rm);
//       //         index = next;
//       //         continue;
//       //     }
//       // }
//       index += 1
//     }
//   }
// }

/***/ }),

/***/ 99994:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ inlineCode)
/* harmony export */ });
/**
 * @import {State} from 'mdast-util-to-markdown'
 * @import {InlineCode, Parents} from 'mdast'
 */

inlineCode.peek = inlineCodePeek

/**
 * Serialize an inline code node.
 *
 * @param {InlineCode} node
 *   Node to serialize.
 * @param {Parents | undefined} _
 *   Parent node.
 * @param {State} state
 *   Info passed around.
 * @returns {string}
 *   Serialized markdown.
 */
function inlineCode(node, _, state) {
  let value = node.value || ''
  let sequence = '`'
  let index = -1

  // If there is a single grave accent on its own in the code, use a fence of
  // two.
  // If there are two in a row, use one.
  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
    sequence += '`'
  }

  // If this is not just spaces or eols (tabs don’t count), and either the
  // first or last character are a space, eol, or tick, then pad with spaces.
  if (
    /[^\n\r ]/.test(value) &&
    ((/^[\n\r ]/.test(value) && /[\n\r ]$/.test(value)) || /^`|`$/.test(value))
  ) {
    value = ' ' + value + ' '
  }

  // We have a potential problem: certain characters after eols could result in
  // blocks being seen.
  // For example, if someone injected the string `'\n# b'`, then that would
  // result in an ATX heading.
  // We can’t escape characters in `inlineCode`, but because eols are
  // transformed to spaces when going from markdown to HTML anyway, we can swap
  // them out.
  while (++index < state.unsafe.length) {
    const pattern = state.unsafe[index]
    const expression = state.compilePattern(pattern)

    // Only look for `atBreak`s.
    // Btw: note that `atBreak` patterns will always start the regex at LF or
    // CR.
    if (!pattern.atBreak) continue

    /** @type {RegExpExecArray | null} */
    let match

    while ((match = expression.exec(value))) {
      let position = match.index

      // Support CRLF (patterns only look for one of the characters).
      if (
        value.charCodeAt(position) === 10 /* `\n` */ &&
        value.charCodeAt(position - 1) === 13 /* `\r` */
      ) {
        position--
      }

      value = value.slice(0, position) + ' ' + value.slice(match.index + 1)
    }
  }

  return sequence + value + sequence
}

/**
 * Peek at this node.
 *
 * @returns {string}
 *   Start of the serialized markdown.
 */
function inlineCodePeek() {
  return '`'
}


/***/ })

}]);