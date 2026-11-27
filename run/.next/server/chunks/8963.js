"use strict";
exports.id = 8963;
exports.ids = [8963];
exports.modules = {

/***/ 18963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E$q: () => (/* binding */ intersection),
/* harmony export */   IeY: () => (/* binding */ custom),
/* harmony export */   Ikc: () => (/* binding */ object),
/* harmony export */   KCZ: () => (/* binding */ union),
/* harmony export */   L5J: () => (/* binding */ unknown),
/* harmony export */   Nlp: () => (/* binding */ _instanceof),
/* harmony export */   PVZ: () => (/* binding */ tuple),
/* harmony export */   Pq9: () => (/* binding */ json),
/* harmony export */   RZV: () => (/* binding */ lazy),
/* harmony export */   YOg: () => (/* binding */ array),
/* harmony export */   YjP: () => (/* binding */ string),
/* harmony export */   ZmZ: () => (/* binding */ never),
/* harmony export */   _H3: () => (/* binding */ looseObject),
/* harmony export */   aig: () => (/* binding */ number),
/* harmony export */   bvH: () => (/* binding */ ZodObject),
/* harmony export */   bzn: () => (/* binding */ any),
/* harmony export */   chJ: () => (/* binding */ _null),
/* harmony export */   euz: () => (/* binding */ literal),
/* harmony export */   g1P: () => (/* binding */ record),
/* harmony export */   gMt: () => (/* binding */ discriminatedUnion),
/* harmony export */   jgl: () => (/* binding */ partialRecord),
/* harmony export */   k5n: () => (/* binding */ _enum),
/* harmony export */   rSt: () => (/* binding */ ZodNumber),
/* harmony export */   rej: () => (/* binding */ strictObject),
/* harmony export */   vkY: () => (/* binding */ preprocess),
/* harmony export */   zMY: () => (/* binding */ boolean)
/* harmony export */ });
/* unused harmony exports ZodType, _ZodString, ZodString, ZodStringFormat, ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration, ZodEmail, email, ZodGUID, guid, ZodUUID, uuid, uuidv4, uuidv6, uuidv7, ZodURL, url, httpUrl, ZodEmoji, emoji, ZodNanoID, nanoid, ZodCUID, cuid, ZodCUID2, cuid2, ZodULID, ulid, ZodXID, xid, ZodKSUID, ksuid, ZodIPv4, ipv4, ZodMAC, mac, ZodIPv6, ipv6, ZodCIDRv4, cidrv4, ZodCIDRv6, cidrv6, ZodBase64, base64, ZodBase64URL, base64url, ZodE164, e164, ZodCreditCard, creditCard, ZodIBAN, iban, ZodJWT, jwt, ZodCustomStringFormat, stringFormat, hostname, hex, currencyCode, hash, ZodNumberFormat, int, float32, float64, int32, uint32, ZodBoolean, ZodBigInt, bigint, ZodBigIntFormat, int64, uint64, ZodSymbol, symbol, ZodUndefined, undefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, void, ZodDate, date, ZodArray, keyof, ZodUnion, ZodXor, xor, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, looseRecord, ZodMap, map, ZodSet, set, ZodEnum, nativeEnum, ZodLiteral, ZodFile, file, ZodTransform, transform, ZodOptional, optional, ZodExactOptional, exactOptional, ZodNullable, nullable, nullish, ZodDefault, _default, ZodPrefault, prefault, ZodNonOptional, nonoptional, ZodSuccess, success, ZodCatch, catch, ZodNaN, nan, ZodPipe, pipe, ZodCodec, codec, invertCodec, ZodPreprocess, ZodReadonly, readonly, ZodTemplateLiteral, templateLiteral, ZodLazy, ZodPromise, promise, ZodFunction, _function, function, ZodCustom, check, refine, superRefine, describe, meta, ZodInstanceOf, stringbool */
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16567);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(769662);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(943374);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(318856);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(311711);
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(954746);
/* harmony import */ var _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(493004);
/* harmony import */ var _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(887090);
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(308701);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(510836);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(140805);








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
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._number */ .F7(ZodNumber, params);
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

const ZodNull = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNull", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodNull */ .x8.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .nullProcessor */ .In(inst, ctx, json, params);
});
function _null(params) {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._null */ .jw(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodAny", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodAny */ .Gb.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .anyProcessor */ .NX(inst, ctx, json, params);
});
function any() {
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._any */ .KA(ZodAny);
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
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: unknown(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
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
const ZodDiscriminatedUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodDiscriminatedUnion */ .P0.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options: options,
        discriminator,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
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
    const hasRest = _paramsOrRest instanceof _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodType */ .W4;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}
const ZodRecord = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodRecord", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodRecord */ .h.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .recordProcessor */ .GC(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
    // v3-compat: z.record(valueType, params?) — defaults keyType to z.string()
    if (!valueType || !valueType._zod) {
        return new ZodRecord({
            type: "record",
            keyType: string(),
            valueType: keyType,
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(valueType),
        });
    }
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
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
const ZodLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodLiteral */ .nu.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .literalProcessor */ .Yv(inst, ctx, json, params);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
});
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
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
const ZodPreprocess = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPreprocess", (inst, def) => {
    ZodPipe.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodPreprocess */ .KX.init(inst, def);
});
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
const ZodLazy = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodLazy", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodLazy */ .kU.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_10__/* .lazyProcessor */ .Tr(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.getter();
});
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
    return _checks_js__WEBPACK_IMPORTED_MODULE_5__/* ._custom */ .FO(ZodCustom, fn ?? (() => true), _params);
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
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__/* .normalizeParams */ .A2(params),
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

/***/ 308701:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(318856);

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

/***/ 342628:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ ZodRealError)
/* harmony export */ });
/* unused harmony export ZodError */
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(793111);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16567);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(318856);



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

/***/ 510836:
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
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140805);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(342628);


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

/***/ 769662:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x3: () => (/* binding */ memoizer)
/* harmony export */ });
/* unused harmony exports $ZodCyclicError, isRecursiveSchema, isBackEdge */
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(318856);

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


/***/ })

};
;