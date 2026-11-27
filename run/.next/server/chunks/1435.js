"use strict";
exports.id = 1435;
exports.ids = [1435];
exports.modules = {

/***/ 5578:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ decodeJwt)
/* harmony export */ });
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(488888);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(573575);
/* harmony import */ var _lib_validate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(438805);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);




function decodeJwt(jwt) {
  if (typeof jwt != "string")
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("JWTs must use Compact JWS serialization, JWT must be a string");
  const { 1: encodedPayload, length } = jwt.split(".");
  if (length === 5)
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("Only JWTs using Compact JWS serialization can be decoded");
  if (length !== 3)
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("Invalid JWT");
  if (!encodedPayload)
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("JWTs must contain a payload");
  let claimsSetBytes;
  try {
    claimsSetBytes = (0,_base64url_js__WEBPACK_IMPORTED_MODULE_1__/* .decode */ .D)(encodedPayload);
  } catch (cause) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("Failed to base64url decode the payload", { cause });
  }
  let claimsSet;
  try {
    claimsSet = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .strictDecoder */ .u8.decode(claimsSetBytes));
  } catch (cause) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("Failed to parse the decoded payload as JSON", { cause });
  }
  if (!(0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(claimsSet))
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("Invalid JWT Claims Set");
  return claimsSet;
}



/***/ }),

/***/ 7638:
/***/ ((module, exports) => {


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
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 32171:
/***/ ((module, exports, __webpack_require__) => {


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
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __webpack_require__(981494);
const _redirecterror = __webpack_require__(52220);
const _serverasyncstorage = __webpack_require__(173565);
function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    type ??= _serverasyncstorage.actionAsyncStorage?.getStore()?.isAction ? 'push' : 'replace';
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type = 'replace') {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 41116:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ session)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _utils_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(943648);


/** Return a session object filtered via `callbacks.session` */
async function session(options, sessionStore, cookies, isUpdate, newSession) {
    const { adapter, jwt, events, callbacks, logger, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, } = options;
    const response = {
        body: null,
        headers: {
            "Content-Type": "application/json",
            ...(!isUpdate && {
                "Cache-Control": "private, no-cache, no-store",
                Expires: "0",
                Pragma: "no-cache",
            }),
        },
        cookies,
    };
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return response;
    if (sessionStrategy === "jwt") {
        try {
            const salt = options.cookies.sessionToken.name;
            const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
            if (!payload)
                throw new Error("Invalid JWT");
            // @ts-expect-error
            const token = await callbacks.jwt({
                token: payload,
                ...(isUpdate && { trigger: "update" }),
                session: newSession,
            });
            const newExpires = (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(sessionMaxAge);
            if (token !== null) {
                // By default, only exposes a limited subset of information to the client
                // as needed for presentation purposes (e.g. "you are logged in as...").
                const session = {
                    user: { name: token.name, email: token.email, image: token.picture },
                    expires: newExpires.toISOString(),
                };
                // @ts-expect-error
                const newSession = await callbacks.session({ session, token });
                // Return session payload as response
                response.body = newSession;
                // Refresh JWT expiry by re-signing it, with an updated expiry date
                const newToken = await jwt.encode({ ...jwt, token, salt });
                // Set cookie, to also update expiry date on cookie
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: newExpires,
                });
                response.cookies?.push(...sessionCookies);
                await events.session?.({ session: newSession, token });
            }
            else {
                response.cookies?.push(...sessionStore.clean());
            }
        }
        catch (e) {
            logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTSessionError */ .SW(e));
            // If the JWT is not verifiable remove the broken session cookie(s).
            response.cookies?.push(...sessionStore.clean());
        }
        return response;
    }
    // Retrieve session from database
    try {
        const { getSessionAndUser, deleteSession, updateSession } = adapter;
        let userAndSession = await getSessionAndUser(sessionToken);
        // If session has expired, clean up the database
        if (userAndSession &&
            userAndSession.session.expires.valueOf() < Date.now()) {
            await deleteSession(sessionToken);
            userAndSession = null;
        }
        if (userAndSession) {
            const { user, session } = userAndSession;
            const sessionUpdateAge = options.session.updateAge;
            // Calculate last updated date to throttle write updates to database
            // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
            //     e.g. ({expiry date} - 30 days) + 1 hour
            const sessionIsDueToBeUpdatedDate = session.expires.valueOf() -
                sessionMaxAge * 1000 +
                sessionUpdateAge * 1000;
            const newExpires = (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(sessionMaxAge);
            // Trigger update of session expiry date and write to database, only
            // if the session was last updated more than {sessionUpdateAge} ago
            if (sessionIsDueToBeUpdatedDate <= Date.now()) {
                await updateSession({
                    sessionToken: sessionToken,
                    expires: newExpires,
                });
            }
            // Pass Session through to the session callback
            const sessionPayload = await callbacks.session({
                // TODO: user already passed below,
                // remove from session object in https://github.com/nextauthjs/next-auth/pull/9702
                // @ts-expect-error
                session: { ...session, user },
                user,
                newSession,
                ...(isUpdate ? { trigger: "update" } : {}),
            });
            // Return session payload as response
            response.body = sessionPayload;
            // Set cookie again to update expiry
            response.cookies?.push({
                name: options.cookies.sessionToken.name,
                value: sessionToken,
                options: {
                    ...options.cookies.sessionToken.options,
                    expires: newExpires,
                },
            });
            // @ts-expect-error
            await events.session?.({ session: sessionPayload });
        }
        else if (sessionToken) {
            // If `sessionToken` was found set but it's not valid for a session then
            // remove the sessionToken cookie from browser.
            response.cookies?.push(...sessionStore.clean());
        }
    }
    catch (e) {
        logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .SessionTokenError */ .QU(e));
    }
    return response;
}


/***/ }),

/***/ 52220:
/***/ ((module, exports, __webpack_require__) => {


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
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __webpack_require__(981494);
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map


/***/ }),

/***/ 54316:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SV: () => (/* binding */ decryptKeyManagement),
/* harmony export */   ss: () => (/* binding */ encryptKeyManagement)
/* harmony export */ });
/* unused harmony export validateMaxPBES2Count */
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(488888);
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(864416);
/* harmony import */ var _jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(104774);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(499129);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(438805);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(573575);
/* harmony import */ var _content_encryption_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(238884);







function checkEcdhCryptoKey(key, usage) {
  if (key.algorithm.name !== "ECDH" && key.algorithm.name !== "X25519")
    throw new TypeError("CryptoKey does not support this operation, its algorithm.name must be ECDH or X25519");
  (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .checkUsage */ .GZ)(key, usage);
}
async function aeskwWrap(alg, key, cek) {
  const cryptoKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .rawKey */ .GK)(key, (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweAlgorithm */ .eD)(alg).subtle, "wrapKey", !0), cryptoKeyCek = await crypto.subtle.importKey("raw", cek, { hash: "SHA-256", name: "HMAC" }, !0, ["sign"]);
  return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function aeskwUnwrap(alg, key, encryptedKey) {
  const cryptoKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .rawKey */ .GK)(key, (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweAlgorithm */ .eD)(alg).subtle, "unwrapKey", !0), cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", { hash: "SHA-256", name: "HMAC" }, !0, ["sign"]);
  return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}
function checkRsaKey(alg, key, usage) {
  (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .checkCryptoKey */ .Ni)(key, (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweAlgorithm */ .eD)(alg).subtle, usage), (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .checkModulusLength */ .or)(alg, key);
}
async function deriveKey(p2s, alg, p2c, key) {
  if (!(p2s instanceof Uint8Array) || p2s.length < 8)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("PBES2 Salt Input must be 8 or more octets");
  if (!Number.isSafeInteger(p2c) || Math.sign(p2c) !== 1)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("PBES2 Count Input must be a positive integer");
  const salt = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .concat */ .xW)((0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .encode */ .lF)(alg), Uint8Array.of(0), p2s), keyLengthBits = parseInt(alg.slice(13, 16), 10), subtleAlg = {
    hash: `SHA-${alg.slice(8, 11)}`,
    iterations: p2c,
    name: "PBKDF2",
    salt
  }, cryptoKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .rawKey */ .GK)(key, (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweAlgorithm */ .eD)(alg).subtle, "deriveBits");
  return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keyLengthBits));
}
function lengthAndInput(input) {
  return (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .concat */ .xW)((0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .uint32be */ .VS)(input.length), input);
}
async function concatKdf(Z, keyDataLength, OtherInfo) {
  const dkLen = keyDataLength >> 3, hashLen = 32, reps = Math.ceil(dkLen / hashLen), dk = new Uint8Array(reps * hashLen);
  for (let i = 1; i <= reps; i++) {
    const hashResult = await (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .digest */ .br)("sha256", (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .concat */ .xW)((0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .uint32be */ .VS)(i), Z, OtherInfo));
    dk.set(hashResult, (i - 1) * hashLen);
  }
  return dk.slice(0, dkLen);
}
async function ecdhesDeriveKey(publicKey, privateKey, algorithmId, keyDataLength, apu = new Uint8Array(), apv = new Uint8Array()) {
  checkEcdhCryptoKey(publicKey), checkEcdhCryptoKey(privateKey, "deriveBits");
  const otherInfo = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .concat */ .xW)(lengthAndInput((0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .encode */ .lF)(algorithmId)), lengthAndInput(apu), lengthAndInput(apv), (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .uint32be */ .VS)(keyDataLength)), Z = new Uint8Array(await crypto.subtle.deriveBits({
    name: publicKey.algorithm.name,
    public: publicKey
  }, privateKey, publicKey.algorithm.name === "X25519" ? 256 : Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3));
  return concatKdf(Z, keyDataLength, otherInfo);
}
function assertEcdhKey(key) {
  (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .assertCryptoKey */ .Tz)(key);
  const curve = key.algorithm.namedCurve;
  if (curve !== "P-256" && curve !== "P-384" && curve !== "P-521" && key.algorithm.name !== "X25519")
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JOSENotSupported */ .T0("ECDH with the provided key is not allowed or not supported by your javascript runtime");
}
function partyInfo(joseHeader, name) {
  const value = joseHeader[name];
  if (value !== void 0) {
    if (typeof value != "string")
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA(`JOSE Header "${name}" (Agreement Party${name === "apu" ? "U" : "V"}Info) invalid`);
    return (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .decodeBase64url */ .h2)(value, name, _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA);
  }
}
function checkPartyInfo(apu, apv) {
  if (!(apu === void 0 || apv === void 0 || apu.byteLength !== apv.byteLength)) {
    for (let i = 0; i < apu.byteLength; i++)
      if (apu[i] !== apv[i])
        return;
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "apu" and "apv" values must be distinct');
  }
}
function assertEncryptedKey(encryptedKey) {
  if (encryptedKey === void 0)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("JWE Encrypted Key missing");
}
function assertNoEncryptedKey(encryptedKey) {
  if (encryptedKey !== void 0)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("Encountered unexpected JWE Encrypted Key");
}
function validateMaxPBES2Count(value) {
  if (value !== void 0 && value !== 1 / 0 && (!Number.isSafeInteger(value) || value < 1))
    throw new TypeError("maxPBES2Count must be a positive safe integer or Infinity");
}
async function decryptKeyManagement(entry, enc, key, encryptedKey, joseHeader, maxPBES2Count) {
  const { alg } = entry, mode = entry.mode;
  if (mode === "direct-encryption")
    return assertNoEncryptedKey(encryptedKey), key;
  const direct = mode === "direct-key-agreement";
  switch (direct ? assertNoEncryptedKey(encryptedKey) : assertEncryptedKey(encryptedKey), entry.subtle.name) {
    case "ECDH": {
      const { epk } = joseHeader;
      if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .isObject */ .Gv)(epk) || ["d", "k", "p", "q", "dp", "dq", "qi", "oth", "priv"].some((parameter) => Object.hasOwn(epk, parameter)))
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      assertEcdhKey(key);
      const ephemeralPublicKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .jwkToKey */ .xY)(entry, epk), partyUInfo = partyInfo(joseHeader, "apu"), partyVInfo = partyInfo(joseHeader, "apv");
      checkPartyInfo(partyUInfo, partyVInfo);
      const derivedKey = await ecdhesDeriveKey(ephemeralPublicKey, key, direct ? enc.alg : alg, direct ? enc.cekBits : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
      if (direct)
        return derivedKey;
      key = derivedKey;
      break;
    }
    case "RSA-OAEP":
      return (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .assertCryptoKey */ .Tz)(key), checkRsaKey(alg, key, "decrypt"), new Uint8Array(await crypto.subtle.decrypt("RSA-OAEP", key, encryptedKey));
    case "PBKDF2": {
      if (typeof joseHeader.p2c != "number")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      validateMaxPBES2Count(maxPBES2Count);
      const p2cLimit = maxPBES2Count ?? 1e4;
      if (joseHeader.p2c > p2cLimit)
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof joseHeader.p2s != "string")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      const p2s = (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .decodeBase64url */ .h2)(joseHeader.p2s, "p2s", _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA);
      key = await deriveKey(p2s, alg, joseHeader.p2c, key);
      break;
    }
    case "AES-GCM": {
      if (typeof joseHeader.iv != "string")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof joseHeader.tag != "string")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA('JOSE Header "tag" (Authentication Tag) missing or invalid');
      const iv = (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .decodeBase64url */ .h2)(joseHeader.iv, "iv", _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA), tag = (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .decodeBase64url */ .h2)(joseHeader.tag, "tag", _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA);
      if (iv.byteLength !== 12)
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("Invalid Initialization Vector length");
      if (tag.byteLength !== 16)
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWEInvalid */ .aA("Invalid Authentication Tag length");
      return (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_5__/* .decrypt */ .Yc)((0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweEncryption */ .Oe)(alg.slice(0, -2)), key, encryptedKey, iv, tag, new Uint8Array());
    }
  }
  return aeskwUnwrap(alg.slice(-6), key, encryptedKey);
}
async function encryptKeyManagement(entry, enc, inputKey, joseHeader, providedCek, providedParameters = {}) {
  const { alg, mode } = entry, transport = (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .isJWECEKTransport */ .p3)(entry);
  if (providedCek !== void 0 && !transport)
    throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
  let key = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareKey */ .dT)(mode === "direct-encryption" ? enc : entry, inputKey, "encrypt");
  if (mode === "direct-encryption")
    return [key, void 0, void 0];
  const cek = transport ? providedCek ?? (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_5__/* .generateCek */ .Do)(enc) : void 0;
  cek && (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_5__/* .checkCekLength */ .W_)(cek, enc.cekBits);
  let encryptedKey, parameters;
  switch (entry.subtle.name) {
    case "ECDH": {
      assertEcdhKey(key);
      const { apu: providedApu, apv: providedApv } = providedParameters;
      providedApu !== void 0 && (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .assertUint8Array */ .GT)(providedApu, '"apu"'), providedApv !== void 0 && (0,_validate_js__WEBPACK_IMPORTED_MODULE_4__/* .assertUint8Array */ .GT)(providedApv, '"apv"');
      const apu = providedApu ?? partyInfo(joseHeader, "apu"), apv = providedApv ?? partyInfo(joseHeader, "apv");
      checkPartyInfo(apu, apv);
      let ephemeralPrivateKey;
      providedParameters.epk !== void 0 ? ephemeralPrivateKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareKey */ .dT)(entry, providedParameters.epk, "decrypt") : ephemeralPrivateKey = (await crypto.subtle.generateKey(key.algorithm, !0, ["deriveBits"])).privateKey;
      const subtle = crypto.subtle;
      let exportableEpk = ephemeralPrivateKey;
      if (!exportableEpk.extractable) {
        if (typeof subtle.getPublicKey != "function")
          throw new TypeError('CryptoKey for "epk" must be extractable');
        exportableEpk = await subtle.getPublicKey(ephemeralPrivateKey, []);
      }
      const { x, y, crv, kty } = await subtle.exportKey("jwk", exportableEpk), direct = mode === "direct-key-agreement", derivedKey = await ecdhesDeriveKey(key, ephemeralPrivateKey, direct ? enc.alg : alg, direct ? enc.cekBits : parseInt(alg.slice(-5, -2), 10), apu, apv), epk = { x, crv, kty };
      if (kty === "EC" && (epk.y = y), parameters = { epk }, providedApu !== void 0 && (parameters.apu = (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(providedApu)), providedApv !== void 0 && (parameters.apv = (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(providedApv)), direct)
        return [derivedKey, void 0, parameters];
      key = derivedKey;
      break;
    }
    case "RSA-OAEP": {
      (0,_key_js__WEBPACK_IMPORTED_MODULE_0__/* .assertCryptoKey */ .Tz)(key), checkRsaKey(alg, key, "encrypt"), encryptedKey = new Uint8Array(await crypto.subtle.encrypt("RSA-OAEP", key, cek));
      break;
    }
    case "PBKDF2": {
      const { p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16)) } = providedParameters;
      key = await deriveKey(p2s, alg, p2c, key), parameters = { p2c, p2s: (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(p2s) };
      break;
    }
    case "AES-GCM": {
      const iv = providedParameters.iv === void 0 ? crypto.getRandomValues(new Uint8Array(12)) : providedParameters.iv;
      if (!(iv instanceof Uint8Array))
        throw new TypeError('"iv" must be an instance of Uint8Array');
      const wrapped = await (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_5__/* .encrypt */ .w)((0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_1__/* .jweEncryption */ .Oe)(alg.slice(0, -2)), cek, key, iv, new Uint8Array());
      encryptedKey = wrapped.ciphertext, parameters = { iv: (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(wrapped.iv), tag: (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(wrapped.tag) };
    }
  }
  if (encryptedKey ??= await aeskwWrap(alg.slice(-6), key, cek), !(encryptedKey instanceof Uint8Array) || !encryptedKey.byteLength)
    throw new TypeError("JWE key management algorithm did not produce an Encrypted Key");
  return [cek, encryptedKey, parameters];
}



/***/ }),

/***/ 62947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ signIn)
/* harmony export */ });
/* harmony import */ var _authorization_url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(613862);
/* harmony import */ var _send_token_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(991781);


async function signIn(request, cookies, options) {
    const signInUrl = `${options.url.origin}${options.basePath}/signin`;
    if (!options.provider)
        return { redirect: signInUrl, cookies };
    switch (options.provider.type) {
        case "oauth":
        case "oidc": {
            const { redirect, cookies: authCookies } = await (0,_authorization_url_js__WEBPACK_IMPORTED_MODULE_0__/* .getAuthorizationUrl */ .x)(request.query, options);
            if (authCookies)
                cookies.push(...authCookies);
            return { redirect, cookies };
        }
        case "email": {
            const response = await (0,_send_token_js__WEBPACK_IMPORTED_MODULE_1__/* .sendToken */ .W)(request, options);
            return { ...response, cookies };
        }
        default:
            return { redirect: signInUrl, cookies };
    }
}


/***/ }),

/***/ 93316:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ setLogger)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);

const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";
const reset = "\x1b[0m";
const defaultLogger = {
    error(error) {
        const name = error instanceof _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR ? error.type : error.name;
        console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
        if (error.cause &&
            typeof error.cause === "object" &&
            "err" in error.cause &&
            error.cause.err instanceof Error) {
            const { err, ...data } = error.cause;
            console.error(`${red}[auth][cause]${reset}:`, err.stack);
            if (data)
                console.error(`${red}[auth][details]${reset}:`, JSON.stringify(data, null, 2));
        }
        else if (error.stack) {
            console.error(error.stack.replace(/.*/, "").substring(1));
        }
    },
    warn(code) {
        const url = `https://warnings.authjs.dev`;
        console.warn(`${yellow}[auth][warn][${code}]${reset}`, `Read more: ${url}`);
    },
    debug(message, metadata) {
        console.log(`${grey}[auth][debug]:${reset} ${message}`, JSON.stringify(metadata, null, 2));
    },
};
/**
 * Override the built-in logger with user's implementation.
 * Any `undefined` level will use the default logger.
 */
function setLogger(config) {
    const newLogger = {
        ...defaultLogger,
    };
    // Turn off debug logging if `debug` isn't set to `true`
    if (!config.debug)
        newLogger.debug = () => { };
    if (config.logger?.error)
        newLogger.error = config.logger.error;
    if (config.logger?.warn)
        newLogger.warn = config.logger.warn;
    if (config.logger?.debug)
        newLogger.debug = config.logger.debug;
    config.logger ?? (config.logger = newLogger);
    return newLogger;
}


/***/ }),

/***/ 99161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Generated by `pnpm css`
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`);


/***/ }),

/***/ 104774:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Oe: () => (/* binding */ jweEncryption),
/* harmony export */   eD: () => (/* binding */ jweAlgorithm),
/* harmony export */   p3: () => (/* binding */ isJWECEKTransport),
/* harmony export */   po: () => (/* binding */ JWE)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);
/* harmony import */ var _key_descriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(188954);


const wrap = [
  ["encrypt", "wrapKey"],
  ["decrypt", "unwrapKey"]
], derive = [[], ["deriveBits"]], none = [[], []];
function rsaes(bits) {
  return {
    kty: ["RSA"],
    mode: "key-encryption",
    subtle: { name: "RSA-OAEP", hash: `SHA-${bits}` },
    usages: wrap,
    ops: ["wrapKey", "unwrapKey"]
  };
}
function ecdh(mode) {
  return {
    kty: ["EC", "OKP"],
    mode,
    subtle: { name: "ECDH" },
    resolve: ({ kty, crv, asymmetricKeyType }) => {
      if (crv === "X25519" || asymmetricKeyType === "x25519")
        return { name: "X25519" };
      if (kty === "OKP")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JOSENotSupported */ .T0('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      return { name: "ECDH", namedCurve: crv };
    },
    usages: derive,
    ops: [void 0, "deriveBits"]
  };
}
function aeskw(bits, gcm = !1) {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: !0,
    subtle: { name: gcm ? "AES-GCM" : "AES-KW", length: bits },
    usages: none,
    ops: gcm ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"]
  };
}
function pbes2() {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: !0,
    subtle: { name: "PBKDF2" },
    usages: none,
    ops: ["deriveBits", "deriveBits"]
  };
}
const JWE = (0,_key_descriptor_js__WEBPACK_IMPORTED_MODULE_1__/* .table */ .t)({
  dir: {
    kty: ["oct"],
    mode: "direct-encryption",
    secret: !0,
    subtle: { name: "AES-GCM" },
    usages: none,
    ops: ["encrypt", "decrypt"]
  },
  "RSA-OAEP": rsaes(1),
  "RSA-OAEP-256": rsaes(256),
  "RSA-OAEP-384": rsaes(384),
  "RSA-OAEP-512": rsaes(512),
  "ECDH-ES": ecdh("direct-key-agreement"),
  "ECDH-ES+A128KW": ecdh("key-agreement-with-key-wrapping"),
  "ECDH-ES+A192KW": ecdh("key-agreement-with-key-wrapping"),
  "ECDH-ES+A256KW": ecdh("key-agreement-with-key-wrapping"),
  A128KW: aeskw(128),
  A192KW: aeskw(192),
  A256KW: aeskw(256),
  A128GCMKW: aeskw(128, !0),
  A192GCMKW: aeskw(192, !0),
  A256GCMKW: aeskw(256, !0),
  "PBES2-HS256+A128KW": pbes2(),
  "PBES2-HS384+A192KW": pbes2(),
  "PBES2-HS512+A256KW": pbes2()
}), contentOps = ["encrypt", "decrypt"];
function contentEncryption(bits, cbc = !1) {
  return {
    kty: ["oct"],
    secret: !0,
    subtle: { name: cbc ? "AES-CBC" : "AES-GCM", length: bits },
    usages: none,
    ops: contentOps,
    cekBits: bits,
    ivBits: cbc ? 128 : 96,
    cbc
  };
}
const ENC = (0,_key_descriptor_js__WEBPACK_IMPORTED_MODULE_1__/* .table */ .t)({
  A128GCM: contentEncryption(128),
  A192GCM: contentEncryption(192),
  A256GCM: contentEncryption(256),
  "A128CBC-HS256": contentEncryption(256, !0),
  "A192CBC-HS384": contentEncryption(384, !0),
  "A256CBC-HS512": contentEncryption(512, !0)
});
function unsupported(parameter, name) {
  throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JOSENotSupported */ .T0(`Invalid or unsupported "${parameter}" (JWE ${name}) header value`);
}
function jweAlgorithm(alg) {
  return (typeof alg == "string" ? JWE[alg] : void 0) ?? unsupported("alg", "Algorithm");
}
function isJWECEKTransport(algorithm) {
  return algorithm.mode === "key-wrapping" || algorithm.mode === "key-encryption" || algorithm.mode === "key-agreement-with-key-wrapping";
}
function jweEncryption(enc) {
  return (typeof enc == "string" ? ENC[enc] : void 0) ?? unsupported("enc", "Encryption Algorithm");
}



/***/ }),

/***/ 125462:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ validateCSRF),
/* harmony export */   i: () => (/* binding */ createCSRFToken)
/* harmony export */ });
/* harmony import */ var _utils_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(663236);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);


/**
 * Ensure CSRF Token cookie is set for any subsequent requests.
 * Used as part of the strategy for mitigation for CSRF tokens.
 *
 * Creates a cookie like 'next-auth.csrf-token' with the value 'token|hash',
 * where 'token' is the CSRF token and 'hash' is a hash made of the token and
 * the secret, and the two values are joined by a pipe '|'. By storing the
 * value and the hash of the value (with the secret used as a salt) we can
 * verify the cookie was set by the server and not by a malicious attacker.
 *
 * For more details, see the following OWASP links:
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
 * https://owasp.org/www-chapter-london/assets/slides/David_Johansson-Double_Defeat_of_Double-Submit_Cookie.pdf
 */
async function createCSRFToken({ options, cookieValue, isPost, bodyValue, }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = await (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .createHash */ .n1)(`${csrfToken}${options.secret}`);
        if (csrfTokenHash === expectedCsrfTokenHash) {
            // If hash matches then we trust the CSRF token value
            // If this is a POST request and the CSRF Token in the POST request matches
            // the cookie we have already verified is the one we have set, then the token is verified!
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return { csrfTokenVerified, csrfToken };
        }
    }
    // New CSRF token
    const csrfToken = (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .randomString */ .DU)(32);
    const csrfTokenHash = await (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .createHash */ .n1)(`${csrfToken}${options.secret}`);
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return { cookie, csrfToken };
}
function validateCSRF(action, verified) {
    if (verified)
        return;
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingCSRF */ .dy(`CSRF token was missing during an action ${action}`);
}


/***/ }),

/***/ 134033:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KU: () => (/* binding */ nonce),
/* harmony export */   aC: () => (/* binding */ pkce),
/* harmony export */   u6: () => (/* binding */ webauthnChallenge),
/* harmony export */   wk: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var oauth4webapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(932384);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _jwt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401945);


// NOTE: We use the default JWT methods here because they encrypt/decrypt the payload, not just sign it.

const COOKIE_TTL = 60 * 15; // 15 minutes
/** Returns a cookie with a JWT encrypted payload. */
async function sealCookie(name, payload, options) {
    const { cookies, logger } = options;
    const cookie = cookies[name];
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_TTL * 1000);
    logger.debug(`CREATE_${name.toUpperCase()}`, {
        name: cookie.name,
        payload,
        COOKIE_TTL,
        expires,
    });
    const encoded = await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .encode */ .lF)({
        ...options.jwt,
        maxAge: COOKIE_TTL,
        token: {
            value: payload,
            provider: options.provider.id,
        },
        salt: cookie.name,
    });
    const cookieOptions = { ...cookie.options, expires };
    return { name: cookie.name, value: encoded, options: cookieOptions };
}
async function parseCookie(name, value, options) {
    try {
        const { logger, cookies, jwt } = options;
        logger.debug(`PARSE_${name.toUpperCase()}`, { cookie: value });
        if (!value)
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidCheck */ .k9(`${name} cookie was missing`);
        const parsed = await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .decode */ .D4)({
            ...jwt,
            token: value,
            salt: cookies[name].name,
        });
        if (!parsed?.value)
            throw new Error("Invalid cookie");
        // The check must have been created by the provider currently handling
        // the callback.
        if (parsed.provider !== options.provider?.id) {
            throw new Error(`${name} cookie was created for a different provider than the one handling the callback`);
        }
        return parsed.value;
    }
    catch (error) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidCheck */ .k9(`${name} value could not be parsed`, {
            cause: error,
        });
    }
}
function clearCookie(name, options, resCookies) {
    const { logger, cookies } = options;
    const cookie = cookies[name];
    logger.debug(`CLEAR_${name.toUpperCase()}`, { cookie });
    resCookies.push({
        name: cookie.name,
        value: "",
        options: { ...cookies[name].options, maxAge: 0 },
    });
}
function useCookie(check, name) {
    return async function (cookies, resCookies, options) {
        const { provider, logger } = options;
        if (!provider?.checks?.includes(check))
            return;
        const cookieValue = cookies?.[options.cookies[name].name];
        logger.debug(`USE_${name.toUpperCase()}`, { value: cookieValue });
        const parsed = await parseCookie(name, cookieValue, options);
        clearCookie(name, options, resCookies);
        return parsed;
    };
}
/**
 * @see https://www.rfc-editor.org/rfc/rfc7636
 * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#pkce
 */
const pkce = {
    /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */
    async create(options) {
        const code_verifier = oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .generateRandomCodeVerifier */ .YI();
        const value = await oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .calculatePKCECodeChallenge */ .Yv(code_verifier);
        const cookie = await sealCookie("pkceCodeVerifier", code_verifier, options);
        return { cookie, value };
    },
    /**
     * Returns code_verifier if the provider is configured to use PKCE,
     * and clears the container cookie afterwards.
     * An error is thrown if the code_verifier is missing or invalid.
     */
    use: useCookie("pkce", "pkceCodeVerifier"),
};
const STATE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const encodedStateSalt = "encodedState";
/**
 * @see https://www.rfc-editor.org/rfc/rfc6749#section-10.12
 * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 */
const state = {
    /** Creates a state cookie with an optionally encoded body. */
    async create(options, origin) {
        const { provider } = options;
        if (!provider.checks.includes("state")) {
            if (origin) {
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidCheck */ .k9("State data was provided but the provider is not configured to use state");
            }
            return;
        }
        // IDEA: Allow the user to pass data to be stored in the state
        const payload = {
            origin,
            random: oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .generateRandomState */ .Ot(),
        };
        const value = await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .encode */ .lF)({
            secret: options.jwt.secret,
            token: payload,
            salt: encodedStateSalt,
            maxAge: STATE_MAX_AGE,
        });
        const cookie = await sealCookie("state", value, options);
        return { cookie, value };
    },
    /**
     * Returns state if the provider is configured to use state,
     * and clears the container cookie afterwards.
     * An error is thrown if the state is missing or invalid.
     */
    use: useCookie("state", "state"),
    /** Decodes the state. If it could not be decoded, it throws an error. */
    async decode(state, options) {
        try {
            options.logger.debug("DECODE_STATE", { state });
            const payload = await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .decode */ .D4)({
                secret: options.jwt.secret,
                token: state,
                salt: encodedStateSalt,
            });
            if (payload)
                return payload;
            throw new Error("Invalid state");
        }
        catch (error) {
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidCheck */ .k9("State could not be decoded", { cause: error });
        }
    },
};
const nonce = {
    async create(options) {
        if (!options.provider.checks.includes("nonce"))
            return;
        const value = oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .generateRandomNonce */ .q4();
        const cookie = await sealCookie("nonce", value, options);
        return { cookie, value };
    },
    /**
     * Returns nonce if the provider is configured to use nonce,
     * and clears the container cookie afterwards.
     * An error is thrown if the nonce is missing or invalid.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
     */
    use: useCookie("nonce", "nonce"),
};
const WEBAUTHN_CHALLENGE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const webauthnChallengeSalt = "encodedWebauthnChallenge";
const webauthnChallenge = {
    async create(options, challenge, registerData) {
        return {
            cookie: await sealCookie("webauthnChallenge", await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .encode */ .lF)({
                secret: options.jwt.secret,
                token: { challenge, registerData },
                salt: webauthnChallengeSalt,
                maxAge: WEBAUTHN_CHALLENGE_MAX_AGE,
            }), options),
        };
    },
    /** Returns WebAuthn challenge if present. */
    async use(options, cookies, resCookies) {
        const cookieValue = cookies?.[options.cookies.webauthnChallenge.name];
        const parsed = await parseCookie("webauthnChallenge", cookieValue, options);
        const payload = await (0,_jwt_js__WEBPACK_IMPORTED_MODULE_1__/* .decode */ .D4)({
            secret: options.jwt.secret,
            token: parsed,
            salt: webauthnChallengeSalt,
        });
        // Clear the WebAuthn challenge cookie after use
        clearCookie("webauthnChallenge", options, resCookies);
        if (!payload)
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidCheck */ .k9("WebAuthn challenge was missing");
        return payload;
    },
};


/***/ }),

/***/ 135298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ merge)
/* harmony export */ });
function isObject(item) {
    return item !== null && typeof item === "object";
}
/** Deep merge two or more objects */
function merge(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!isObject(target[key]))
                    target[key] = Array.isArray(source[key])
                        ? []
                        : {};
                merge(target[key], source[key]);
            }
            else if (source[key] !== undefined)
                target[key] = source[key];
        }
    }
    return merge(target, ...sources);
}


/***/ }),

/***/ 161356:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ parseProviders),
/* harmony export */   ZE: () => (/* binding */ isOIDCProvider)
/* harmony export */ });
/* unused harmony exports isOAuth2Provider, isOAuthProvider */
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(135298);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(399389);


/**
 * Adds `signinUrl` and `callbackUrl` to each provider
 * and deep merge user-defined options.
 */
function parseProviders(params) {
    const { providerId, config } = params;
    const url = new URL(config.basePath ?? "/auth", params.url.origin);
    const providers = config.providers.map((p) => {
        const provider = typeof p === "function" ? p() : p;
        const { options: userOptions, ...defaults } = provider;
        const id = (userOptions?.id ?? defaults.id);
        // TODO: Support if properties have different types, e.g. authorization: string or object
        const merged = (0,_merge_js__WEBPACK_IMPORTED_MODULE_1__/* .merge */ .h)(defaults, userOptions, {
            signinUrl: `${url}/signin/${id}`,
            callbackUrl: `${url}/callback/${id}`,
        });
        if (provider.type === "oauth" || provider.type === "oidc") {
            merged.redirectProxyUrl ?? (merged.redirectProxyUrl = userOptions?.redirectProxyUrl ?? config.redirectProxyUrl);
            const normalized = normalizeOAuth(merged);
            // We currently don't support redirect proxies for response_mode=form_post
            if (normalized.authorization?.url.searchParams.get("response_mode") ===
                "form_post") {
                delete normalized.redirectProxyUrl;
            }
            // @ts-expect-error Symbols don't get merged by the `merge` function
            // so we need to do it manually.
            normalized[_symbols_js__WEBPACK_IMPORTED_MODULE_0__/* .customFetch */ .A6] ?? (normalized[_symbols_js__WEBPACK_IMPORTED_MODULE_0__/* .customFetch */ .A6] = userOptions?.[_symbols_js__WEBPACK_IMPORTED_MODULE_0__/* .customFetch */ .A6]);
            return normalized;
        }
        return merged;
    });
    const provider = providers.find(({ id }) => id === providerId);
    if (providerId && !provider) {
        const availableProviders = providers.map((p) => p.id).join(", ");
        throw new Error(`Provider with id "${providerId}" not found. Available providers: [${availableProviders}].`);
    }
    return { providers, provider };
}
// TODO: Also add discovery here, if some endpoints/config are missing.
// We should return both a client and authorization server config.
function normalizeOAuth(c) {
    if (c.issuer)
        c.wellKnown ?? (c.wellKnown = `${c.issuer}/.well-known/openid-configuration`);
    const authorization = normalizeEndpoint(c.authorization, c.issuer);
    if (authorization && !authorization.url?.searchParams.has("scope")) {
        authorization.url.searchParams.set("scope", "openid profile email");
    }
    const token = normalizeEndpoint(c.token, c.issuer);
    const userinfo = normalizeEndpoint(c.userinfo, c.issuer);
    const checks = c.checks ?? ["pkce"];
    if (c.redirectProxyUrl) {
        if (!checks.includes("state"))
            checks.push("state");
        c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
    }
    return {
        ...c,
        authorization,
        token,
        checks,
        userinfo,
        profile: c.profile ?? defaultProfile,
        account: c.account ?? defaultAccount,
    };
}
/**
 * Returns basic user profile from the userinfo response/`id_token` claims.
 * The returned `id` will become the `account.providerAccountId`. `user.id`
 * and `account.id` are auto-generated UUID's.
 *
 * The result if this function is used to create the `User` in the database.
 * @see https://authjs.dev/reference/core/adapters#user
 * @see https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * @see https://openid.net/specs/openid-connect-core-1_0.html#
 */
const defaultProfile = (profile) => {
    return stripUndefined({
        id: profile.sub ?? profile.id ?? crypto.randomUUID(),
        name: profile.name ?? profile.nickname ?? profile.preferred_username,
        email: profile.email,
        image: profile.picture,
    });
};
/**
 * Returns basic OAuth/OIDC values from the token response.
 * @see https://www.ietf.org/rfc/rfc6749.html#section-5.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 * @see https://authjs.dev/reference/core/adapters#account
 */
const defaultAccount = (account) => {
    return stripUndefined({
        access_token: account.access_token,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        session_state: account.session_state,
    });
};
function stripUndefined(o) {
    const result = {};
    for (const [k, v] of Object.entries(o)) {
        if (v !== undefined)
            result[k] = v;
    }
    return result;
}
function normalizeEndpoint(e, issuer) {
    if (!e && issuer)
        return;
    if (typeof e === "string") {
        return { url: new URL(e) };
    }
    // If e.url is undefined, it's because the provider config
    // assumes that we will use the issuer endpoint.
    // The existence of either e.url or provider.issuer is checked in
    // assert.ts. We fallback to "https://authjs.dev" to be able to pass around
    // a valid URL even if the user only provided params.
    // NOTE: This need to be checked when constructing the URL
    // for the authorization, token and userinfo endpoints.
    const url = new URL(e?.url ?? "https://authjs.dev");
    if (e?.params != null) {
        for (let [key, value] of Object.entries(e.params)) {
            if (key === "claims") {
                value = JSON.stringify(value);
            }
            url.searchParams.set(key, String(value));
        }
    }
    return {
        url,
        request: e?.request,
        conform: e?.conform,
        ...(e?.clientPrivateKey ? { clientPrivateKey: e?.clientPrivateKey } : null),
    };
}
function isOIDCProvider(provider) {
    return provider.type === "oidc";
}
function isOAuth2Provider(provider) {
    return provider.type === "oauth";
}
/** Either OAuth 2 or OIDC */
function isOAuthProvider(provider) {
    return provider.type === "oauth" || provider.type === "oidc";
}


/***/ }),

/***/ 173565:
/***/ ((module, exports, __webpack_require__) => {

// Client-safe access to the server-only async-storage singletons. On the
// server these re-export the real storages; in the browser bundle this module
// is aliased to `./server-async-storage.browser` (see
// scripts/generate-browser-variant-aliases.mjs), which exports `undefined`
// stubs so the AsyncLocalStorage modules are never bundled into the client.
// Consumers must guard usage so the stubs are not dereferenced in the browser.

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
    actionAsyncStorage: function() {
        return _actionasyncstorageexternal.actionAsyncStorage;
    },
    workAsyncStorage: function() {
        return _workasyncstorageexternal.workAsyncStorage;
    },
    workUnitAsyncStorage: function() {
        return _workunitasyncstorageexternal.workUnitAsyncStorage;
    }
});
const _actionasyncstorageexternal = __webpack_require__(419121);
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-async-storage.js.map


/***/ }),

/***/ 176484:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNextRouterError", ({
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
}));
const _httpaccessfallback = __webpack_require__(7638);
const _redirecterror = __webpack_require__(52220);
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 188954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ table)
/* harmony export */ });
function table(entries) {
  const out = { __proto__: null };
  for (const alg in entries)
    out[alg] = { ...entries[alg], alg };
  return out;
}



/***/ }),

/***/ 201122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $B: () => (/* binding */ verifyRegister),
/* harmony export */   Jc: () => (/* binding */ getRegistrationResponse),
/* harmony export */   O1: () => (/* binding */ assertInternalOptionsWebAuthn),
/* harmony export */   ZI: () => (/* binding */ inferWebAuthnOptions),
/* harmony export */   u_: () => (/* binding */ getAuthenticationResponse),
/* harmony export */   vb: () => (/* binding */ verifyAuthenticate)
/* harmony export */ });
/* unused harmony exports fromBase64, toBase64, transportsToString, stringToTransports */
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _actions_callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134033);
/* harmony import */ var _web_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(663236);



/**
 * Infers the WebAuthn options based on the provided parameters.
 *
 * @param action - The WebAuthn action to perform (optional).
 * @param loggedInUser - The logged-in user (optional).
 * @param userInfoResponse - The response containing user information (optional).
 *
 * @returns The WebAuthn action to perform, or null if no inference could be made.
 */
function inferWebAuthnOptions(action, loggedIn, userInfoResponse) {
    const { user, exists = false } = userInfoResponse ?? {};
    switch (action) {
        case "authenticate": {
            /**
             * Always allow explicit authentication requests.
             */
            return "authenticate";
        }
        case "register": {
            /**
             * Registration is only allowed if:
             * - The user is logged in, meaning the user wants to register a new authenticator.
             * - The user is not logged in and provided user info that does NOT exist, meaning the user wants to register a new account.
             */
            if (user && loggedIn === exists)
                return "register";
            break;
        }
        case undefined: {
            /**
             * When no explicit action is provided, we try to infer it based on the user info provided. These are the possible cases:
             * - Logged in users must always send an explit action, so we bail out in this case.
             * - Otherwise, if no user info is provided, the desired action is authentication without pre-defined authenticators.
             * - Otherwise, if the user info provided is of an existing user, the desired action is authentication with their pre-defined authenticators.
             * - Finally, if the user info provided is of a non-existing user, the desired action is registration.
             */
            if (!loggedIn) {
                if (user) {
                    if (exists) {
                        return "authenticate";
                    }
                    else {
                        return "register";
                    }
                }
                else {
                    return "authenticate";
                }
            }
            break;
        }
    }
    // No decision could be made
    return null;
}
/**
 * Retrieves the registration response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @param resCookies - Optional cookies to be included in the response.
 * @returns A promise that resolves to the WebAuthnOptionsResponse.
 */
async function getRegistrationResponse(options, request, user, resCookies) {
    // Get registration options
    const regOptions = await getRegistrationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await _actions_callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_1__/* .webauthnChallenge */ .u6.create(options, regOptions.challenge, user);
    return {
        status: 200,
        cookies: [...(resCookies ?? []), cookie],
        body: {
            action: "register",
            options: regOptions,
        },
        headers: {
            "Content-Type": "application/json",
        },
    };
}
/**
 * Retrieves the authentication response for WebAuthn options request.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @param resCookies - Optional array of cookies to be included in the response.
 * @returns A promise that resolves to a WebAuthnOptionsResponse object.
 */
async function getAuthenticationResponse(options, request, user, resCookies) {
    // Get authentication options
    const authOptions = await getAuthenticationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await _actions_callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_1__/* .webauthnChallenge */ .u6.create(options, authOptions.challenge);
    return {
        status: 200,
        cookies: [...(resCookies ?? []), cookie],
        body: {
            action: "authenticate",
            options: authOptions,
        },
        headers: {
            "Content-Type": "application/json",
        },
    };
}
async function verifyAuthenticate(options, request, resCookies) {
    const { adapter, provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string"
        ? JSON.parse(request.body.data)
        : undefined;
    if (!data ||
        typeof data !== "object" ||
        !("id" in data) ||
        typeof data.id !== "string") {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR("Invalid WebAuthn Authentication response");
    }
    // Reset the ID so we smooth out implementation differences
    const credentialID = toBase64(fromBase64(data.id));
    // Get authenticator from database
    const authenticator = await adapter.getAuthenticator(credentialID);
    if (!authenticator) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR(`WebAuthn authenticator not found in database: ${JSON.stringify({
            credentialID,
        })}`);
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge } = await _actions_callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_1__/* .webauthnChallenge */ .u6.use(options, request.cookies, resCookies);
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyAuthenticationResponse({
            ...provider.verifyAuthenticationOptions,
            expectedChallenge,
            response: data,
            authenticator: fromAdapterAuthenticator(authenticator),
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id,
        });
    }
    catch (e) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .WebAuthnVerificationError */ .w2(e);
    }
    const { verified, authenticationInfo } = verification;
    // Make sure the response was verified
    if (!verified) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .WebAuthnVerificationError */ .w2("WebAuthn authentication response could not be verified");
    }
    // Update authenticator counter
    try {
        const { newCounter } = authenticationInfo;
        await adapter.updateAuthenticatorCounter(authenticator.credentialID, newCounter);
    }
    catch (e) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AdapterError */ .om(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({
            credentialID,
            oldCounter: authenticator.counter,
            newCounter: authenticationInfo.newCounter,
        })}`, e);
    }
    // Get the account and user
    const account = await adapter.getAccount(authenticator.providerAccountId, provider.id);
    if (!account) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR(`WebAuthn account not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
        })}`);
    }
    const user = await adapter.getUser(account.userId);
    if (!user) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR(`WebAuthn user not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
            userID: account.userId,
        })}`);
    }
    return {
        account,
        user,
    };
}
async function verifyRegister(options, request, resCookies) {
    const { provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string"
        ? JSON.parse(request.body.data)
        : undefined;
    if (!data ||
        typeof data !== "object" ||
        !("id" in data) ||
        typeof data.id !== "string") {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR("Invalid WebAuthn Registration response");
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge, registerData: user } = await _actions_callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_1__/* .webauthnChallenge */ .u6.use(options, request.cookies, resCookies);
    if (!user) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR("Missing user registration data in WebAuthn challenge cookie");
    }
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyRegistrationResponse({
            ...provider.verifyRegistrationOptions,
            expectedChallenge,
            response: data,
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id,
        });
    }
    catch (e) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .WebAuthnVerificationError */ .w2(e);
    }
    // Make sure the response was verified
    if (!verification.verified || !verification.registrationInfo) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .WebAuthnVerificationError */ .w2("WebAuthn registration response could not be verified");
    }
    // Build a new account
    const account = {
        providerAccountId: toBase64(verification.registrationInfo.credentialID),
        provider: options.provider.id,
        type: provider.type,
    };
    // Build a new authenticator
    const authenticator = {
        providerAccountId: account.providerAccountId,
        counter: verification.registrationInfo.counter,
        credentialID: toBase64(verification.registrationInfo.credentialID),
        credentialPublicKey: toBase64(verification.registrationInfo.credentialPublicKey),
        credentialBackedUp: verification.registrationInfo.credentialBackedUp,
        credentialDeviceType: verification.registrationInfo.credentialDeviceType,
        transports: transportsToString(data.response
            .transports),
    };
    // Return created stuff
    return {
        user,
        account,
        authenticator,
    };
}
/**
 * Generates WebAuthn authentication options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @returns The authentication options.
 */
async function getAuthenticationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user && user["id"]
        ? await adapter.listAuthenticatorsByUserId(user.id)
        : null;
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the authentication options.
    return await provider.simpleWebAuthn.generateAuthenticationOptions({
        ...provider.authenticationOptions,
        rpID: relayingParty.id,
        allowCredentials: authenticators?.map((a) => ({
            id: fromBase64(a.credentialID),
            type: "public-key",
            transports: stringToTransports(a.transports),
        })),
    });
}
/**
 * Generates WebAuthn registration options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @returns The registration options.
 */
async function getRegistrationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user["id"]
        ? await adapter.listAuthenticatorsByUserId(user.id)
        : null;
    // Generate a random user ID for the credential.
    // We can do this because we don't use this user ID to link the
    // credential to the user. Instead, we store actual userID in the
    // Authenticator object and fetch it via it's credential ID.
    const userID = (0,_web_js__WEBPACK_IMPORTED_MODULE_2__/* .randomString */ .DU)(32);
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the registration options.
    return await provider.simpleWebAuthn.generateRegistrationOptions({
        ...provider.registrationOptions,
        userID,
        userName: user.email,
        userDisplayName: user.name ?? undefined,
        rpID: relayingParty.id,
        rpName: relayingParty.name,
        excludeCredentials: authenticators?.map((a) => ({
            id: fromBase64(a.credentialID),
            type: "public-key",
            transports: stringToTransports(a.transports),
        })),
    });
}
function assertInternalOptionsWebAuthn(options) {
    const { provider, adapter } = options;
    // Adapter is required for WebAuthn
    if (!adapter)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .MissingAdapter */ .OZ("An adapter is required for the WebAuthn provider");
    // Provider must be WebAuthn
    if (!provider || provider.type !== "webauthn") {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidProvider */ .Hj("Provider must be WebAuthn");
    }
    // Narrow the options type for typed usage later
    return { ...options, provider, adapter };
}
function fromAdapterAuthenticator(authenticator) {
    return {
        ...authenticator,
        credentialDeviceType: authenticator.credentialDeviceType,
        transports: stringToTransports(authenticator.transports),
        credentialID: fromBase64(authenticator.credentialID),
        credentialPublicKey: fromBase64(authenticator.credentialPublicKey),
    };
}
function fromBase64(base64) {
    return new Uint8Array(Buffer.from(base64, "base64"));
}
function toBase64(bytes) {
    return Buffer.from(bytes).toString("base64");
}
function transportsToString(transports) {
    return transports?.join(",");
}
function stringToTransports(tstring) {
    return tstring
        ? tstring.split(",")
        : undefined;
}


/***/ }),

/***/ 219298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ VerifyRequestPage)
/* harmony export */ });
/* harmony import */ var preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(896649);

function VerifyRequestPage(props) {
    const { url, theme } = props;
    return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "verify-request", children: [theme.brandColor && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `,
                } })), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "card", children: [theme.logo && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("img", { src: theme.logo, alt: "Logo", className: "logo" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("h1", { children: "Check your email" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "A sign in link has been sent to your email address." }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("a", { className: "site", href: url.origin, children: url.host }) })] })] }));
}


/***/ }),

/***/ 238884:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Do: () => (/* binding */ generateCek),
/* harmony export */   W_: () => (/* binding */ checkCekLength),
/* harmony export */   Yc: () => (/* binding */ decrypt),
/* harmony export */   w: () => (/* binding */ encrypt)
/* harmony export */ });
/* unused harmony exports checkIvLength, generateIv */
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(573575);
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(864416);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);



const generateCek = (enc) => crypto.getRandomValues(new Uint8Array(enc.cekBits >> 3));
function checkCekLength(cek, expected) {
  const actual = cek.byteLength << 3;
  if (actual !== expected)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
}
const generateIv = (enc) => crypto.getRandomValues(new Uint8Array(enc.ivBits >> 3));
function checkIvLength(enc, iv) {
  if (iv.length << 3 !== enc.ivBits)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA("Invalid Initialization Vector length");
}
async function cbcKeySetup(enc, cek, usage) {
  if (!(cek instanceof Uint8Array))
    throw new TypeError((0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .invalidKeyInput */ .XP)(cek, "Uint8Array"));
  const keyLengthBits = enc.cekBits >> 1, encKey = await crypto.subtle.importKey("raw", cek.subarray(keyLengthBits >> 3), "AES-CBC", !1, [usage]), macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keyLengthBits >> 3), {
    hash: `SHA-${keyLengthBits << 1}`,
    name: "HMAC"
  }, !1, ["sign"]);
  return [encKey, macKey, keyLengthBits];
}
async function cbcHmacTag(macKey, macData, keyLengthBits) {
  return new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keyLengthBits >> 3));
}
async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
  const [encKey, macKey, keyLengthBits] = await cbcKeySetup(enc, cek, "encrypt"), ciphertext = new Uint8Array(await crypto.subtle.encrypt({
    iv,
    name: "AES-CBC"
  }, encKey, plaintext)), al = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .uint64be */ .mx)(aad.length * 8), macData = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .concat */ .xW)(aad, iv, ciphertext, al), tag = await cbcHmacTag(macKey, macData, keyLengthBits);
  return { ciphertext, tag, iv };
}
async function timingSafeEqual(a, b) {
  const algorithm = { name: "HMAC", hash: "SHA-256" }, key = await crypto.subtle.generateKey(algorithm, !1, ["sign", "verify"]), aHmac = await crypto.subtle.sign(algorithm, key, a);
  return crypto.subtle.verify(algorithm, key, aHmac, b);
}
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
  const [encKey, macKey, keyLengthBits] = await cbcKeySetup(enc, cek, "decrypt"), al = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .uint64be */ .mx)(aad.length * 8), macData = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .concat */ .xW)(aad, iv, ciphertext, al), expectedTag = await cbcHmacTag(macKey, macData, keyLengthBits);
  try {
    if (await timingSafeEqual(tag, expectedTag))
      return new Uint8Array(await crypto.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
  } catch {
  }
  throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEDecryptionFailed */ .xO();
}
async function encrypt(enc, plaintext, cek, iv, aad) {
  if (!(0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .isCryptoKey */ .R7)(cek) && !(cek instanceof Uint8Array))
    throw new TypeError((0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .invalidKeyInput */ .XP)(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (iv ? checkIvLength(enc, iv) : iv = generateIv(enc), cek instanceof Uint8Array && checkCekLength(cek, enc.cekBits), enc.cbc)
    return cbcEncrypt(enc, plaintext, cek, iv, aad);
  const encKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .rawKey */ .GK)(cek, enc.subtle, "encrypt"), encrypted = new Uint8Array(await crypto.subtle.encrypt({
    additionalData: aad,
    iv,
    name: "AES-GCM",
    tagLength: 128
  }, encKey, plaintext));
  return { ciphertext: encrypted.subarray(0, -16), tag: encrypted.subarray(-16), iv };
}
async function decrypt(enc, cek, ciphertext, iv, tag, aad) {
  if (!(0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .isCryptoKey */ .R7)(cek) && !(cek instanceof Uint8Array))
    throw new TypeError((0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .invalidKeyInput */ .XP)(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (!iv)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA("JWE Initialization Vector missing");
  if (!tag)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA("JWE Authentication Tag missing");
  if (!enc.cbc && tag.length !== 16)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA("Invalid Authentication Tag length");
  if (checkIvLength(enc, iv), cek instanceof Uint8Array && checkCekLength(cek, enc.cekBits), enc.cbc)
    return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
  const encKey = await (0,_key_js__WEBPACK_IMPORTED_MODULE_1__/* .rawKey */ .GK)(cek, enc.subtle, "decrypt");
  try {
    return new Uint8Array(await crypto.subtle.decrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .concat */ .xW)(ciphertext, tag)));
  } catch {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEDecryptionFailed */ .xO();
  }
}



/***/ }),

/***/ 241846:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F0: () => (/* binding */ D)
/* harmony export */ });
/* unused harmony exports render, renderToStaticMarkup, renderToStringAsync */
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(396460);
var r=/[\s\n\\/='"\0<>]/,o=/^(xlink|xmlns|xml)([A-Z])/,i=/^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/,a=/^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/,c=new Set(["draggable","spellcheck"]),s=/["&<]/;function l(e){if(0===e.length||!1===s.test(e))return e;for(var t=0,n=0,r="",o="";n<e.length;n++){switch(e.charCodeAt(n)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;default:continue}n!==t&&(r+=e.slice(t,n)),r+=o,t=n+1}return n!==t&&(r+=e.slice(t,n)),r}var u={},f=new Set(["animation-iteration-count","border-image-outset","border-image-slice","border-image-width","box-flex","box-flex-group","box-ordinal-group","column-count","fill-opacity","flex","flex-grow","flex-negative","flex-order","flex-positive","flex-shrink","flood-opacity","font-weight","grid-column","grid-row","line-clamp","line-height","opacity","order","orphans","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","widows","z-index","zoom"]),p=/[A-Z]/g;function h(e){var t="";for(var n in e){var r=e[n];if(null!=r&&""!==r){var o="-"==n[0]?n:u[n]||(u[n]=n.replace(p,"-$&").toLowerCase()),i=";";"number"!=typeof r||o.startsWith("--")||f.has(o)||(i="px;"),t=t+o+":"+r+i}}return t||void 0}function d(){this.__d=!0}function _(e,t){return{__v:e,context:t,props:e.props,setState:d,forceUpdate:d,__d:!0,__h:new Array(0)}}function v(e,t,n){if(!e.s){if(n instanceof m){if(!n.s)return void(n.o=v.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(v.bind(null,e,t),v.bind(null,e,2));e.s=t,e.v=n;const r=e.o;r&&r(e)}}var m=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var i=1&o?t:n;if(i){try{v(r,1,i(this.v))}catch(e){v(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?v(r,1,t?t(o):o):n?v(r,1,n(o)):v(r,2,o)}catch(e){v(r,2,e)}},r},e}()));function y(e){return e instanceof m&&1&e.s}function g(e,t,n){for(var r;;){var o=e();if(y(o)&&(o=o.v),!o)return i;if(o.then){r=0;break}var i=n();if(i&&i.then){if(!y(i)){r=1;break}i=i.s}if(t){var a=t();if(a&&a.then&&!y(a)){r=2;break}}}var c=new m,s=v.bind(null,c,2);return(0===r?o.then(u):1===r?i.then(l):a.then(f)).then(void 0,s),c;function l(r){i=r;do{if(t&&(a=t())&&a.then&&!y(a))return void a.then(f).then(void 0,s);if(!(o=e())||y(o)&&!o.v)return void v(c,1,i);if(o.then)return void o.then(u).then(void 0,s);y(i=n())&&(i=i.v)}while(!i||!i.then);i.then(l).then(void 0,s)}function u(e){e?(i=n())&&i.then?i.then(l).then(void 0,s):l(i):v(c,1,i)}function f(){(o=e())?o.then?o.then(u).then(void 0,s):u(o):v(c,1,i)}}function b(e,t){try{var n=e()}catch(e){return t(!0,e)}return n&&n.then?n.then(t.bind(null,!1),t.bind(null,!0)):t(!1,n)}var k,w,x,C,S=function(r,o){try{var i=e.__s;e.__s=!0,k=e.__b,w=e.diffed,x=e.__r,C=e.unmount;var a=t(n,null);return a.__k=[r],Promise.resolve(b(function(){return Promise.resolve(U(r,o||A,!1,void 0,a,!0,void 0)).then(function(e){var t,n=function(){if(E(e)){var n=function(){var e=o.join(j);return t=1,e},r=0,o=e,i=g(function(){return!!o.some(function(e){return e&&"function"==typeof e.then})&&r++<25},void 0,function(){return Promise.resolve(Promise.all(o)).then(function(e){o=e.flat()})});return i&&i.then?i.then(n):n()}}();return n&&n.then?n.then(function(n){return t?n:e}):t?n:e})},function(t,n){if(e.__c&&e.__c(r,L),e.__s=i,L.length=0,t)throw n;return n}))}catch(e){return Promise.reject(e)}},A={},L=[],E=Array.isArray,T=Object.assign,j="";function D(r,o,i){var a=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__s;preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__s=!0,k=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__b,w=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.diffed,x=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__r,C=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.unmount;var c=(0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK,null);c.__k=[r];try{var s=U(r,o||A,!1,void 0,c,!1,i);return E(s)?s.join(j):s}catch(e){if(e.then)throw new Error('Use "renderToStringAsync" for suspenseful rendering.');throw e}finally{preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__c&&preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__c(r,L),preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__s=a,L.length=0}}function P(e,t){var n,r=e.type,o=!0;return e.__c?(o=!1,(n=e.__c).state=n.__s):n=new r(e.props,t),e.__c=n,n.__v=e,n.props=e.props,n.context=t,n.__d=!0,null==n.state&&(n.state=A),null==n.__s&&(n.__s=n.state),r.getDerivedStateFromProps?n.state=T({},n.state,r.getDerivedStateFromProps(n.props,n.state)):o&&n.componentWillMount?(n.componentWillMount(),n.state=n.__s!==n.state?n.__s:n.state):!o&&n.componentWillUpdate&&n.componentWillUpdate(),x&&x(e),n.render(n.props,n.state,t)}function U(t,s,u,f,p,d,v){if(null==t||!0===t||!1===t||t===j)return j;var m=typeof t;if("object"!=m)return"function"==m?j:"string"==m?l(t):t+j;if(E(t)){var y,g=j;p.__k=t;for(var b=0;b<t.length;b++){var S=t[b];if(null!=S&&"boolean"!=typeof S){var L,D=U(S,s,u,f,p,d,v);"string"==typeof D?g+=D:(y||(y=[]),g&&y.push(g),g=j,E(D)?(L=y).push.apply(L,D):y.push(D))}}return y?(g&&y.push(g),y):g}if(void 0!==t.constructor)return j;t.__=p,k&&k(t);var F=t.type,M=t.props;if("function"==typeof F){var W,$,z,H=s;if(F===preact__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK){if("tpl"in M){for(var N=j,q=0;q<M.tpl.length;q++)if(N+=M.tpl[q],M.exprs&&q<M.exprs.length){var B=M.exprs[q];if(null==B)continue;"object"!=typeof B||void 0!==B.constructor&&!E(B)?N+=B:N+=U(B,s,u,f,t,d,v)}return N}if("UNSTABLE_comment"in M)return"\x3c!--"+l(M.UNSTABLE_comment)+"--\x3e";$=M.children}else{if(null!=(W=F.contextType)){var I=s[W.__c];H=I?I.props.value:W.__}var O=F.prototype&&"function"==typeof F.prototype.render;if(O)$=P(t,H),z=t.__c;else{t.__c=z=_(t,H);for(var R=0;z.__d&&R++<25;)z.__d=!1,x&&x(t),$=F.call(z,M,H);z.__d=!0}if(null!=z.getChildContext&&(s=T({},s,z.getChildContext())),O&&preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.errorBoundaries&&(F.getDerivedStateFromError||z.componentDidCatch)){$=null!=$&&$.type===preact__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK&&null==$.key&&null==$.props.tpl?$.props.children:$;try{return U($,s,u,f,t,d,v)}catch(e){return F.getDerivedStateFromError&&(z.__s=F.getDerivedStateFromError(e)),z.componentDidCatch&&z.componentDidCatch(e,A),z.__d?($=P(t,s),null!=(z=t.__c).getChildContext&&(s=T({},s,z.getChildContext())),U($=null!=$&&$.type===preact__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK&&null==$.key&&null==$.props.tpl?$.props.children:$,s,u,f,t,d,v)):j}finally{w&&w(t),t.__=null,C&&C(t)}}}$=null!=$&&$.type===preact__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK&&null==$.key&&null==$.props.tpl?$.props.children:$;try{var V=U($,s,u,f,t,d,v);return w&&w(t),t.__=null,preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.unmount&&preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.unmount(t),V}catch(n){if(!d&&v&&v.onError){var K=v.onError(n,t,function(e){return U(e,s,u,f,t,d,v)});if(void 0!==K)return K;var G=preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.__e;return G&&G(n,t),j}if(!d)throw n;if(!n||"function"!=typeof n.then)throw n;return n.then(function e(){try{return U($,s,u,f,t,d,v)}catch(n){if(!n||"function"!=typeof n.then)throw n;return n.then(function(){return U($,s,u,f,t,d,v)},e)}})}}var J,Q="<"+F,X=j;for(var Y in M){var ee=M[Y];if("function"!=typeof ee||"class"===Y||"className"===Y){switch(Y){case"children":J=ee;continue;case"key":case"ref":case"__self":case"__source":continue;case"htmlFor":if("for"in M)continue;Y="for";break;case"className":if("class"in M)continue;Y="class";break;case"defaultChecked":Y="checked";break;case"defaultSelected":Y="selected";break;case"defaultValue":case"value":switch(Y="value",F){case"textarea":J=ee;continue;case"select":f=ee;continue;case"option":f!=ee||"selected"in M||(Q+=" selected")}break;case"dangerouslySetInnerHTML":X=ee&&ee.__html;continue;case"style":"object"==typeof ee&&(ee=h(ee));break;case"acceptCharset":Y="accept-charset";break;case"httpEquiv":Y="http-equiv";break;default:if(o.test(Y))Y=Y.replace(o,"$1:$2").toLowerCase();else{if(r.test(Y))continue;"-"!==Y[4]&&!c.has(Y)||null==ee?u?a.test(Y)&&(Y="panose1"===Y?"panose-1":Y.replace(/([A-Z])/g,"-$1").toLowerCase()):i.test(Y)&&(Y=Y.toLowerCase()):ee+=j}}null!=ee&&!1!==ee&&(Q=!0===ee||ee===j?Q+" "+Y:Q+" "+Y+'="'+("string"==typeof ee?l(ee):ee+j)+'"')}}if(r.test(F))throw new Error(F+" is not a valid HTML tag name in "+Q+">");if(X||("string"==typeof J?X=l(J):null!=J&&!1!==J&&!0!==J&&(X=U(J,s,"svg"===F||"foreignObject"!==F&&u,f,t,d,v))),w&&w(t),t.__=null,C&&C(t),!X&&Z.has(F))return Q+"/>";var te="</"+F+">",ne=Q+">";return E(X)?[ne].concat(X,[te]):"string"!=typeof X?[ne,X,te]:ne+X+te}var Z=new Set(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]),F=(/* unused pure expression or super */ null && (D)),M=(/* unused pure expression or super */ null && (D));/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (D)));
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ 247597:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ isAuthAction)
/* harmony export */ });
const actions = [
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error",
    "webauthn-options",
];
function isAuthAction(action) {
    return actions.includes(action);
}


/***/ }),

/***/ 269806:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ defaultCookies),
/* harmony export */   c: () => (/* binding */ SessionStore)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionStore_instances, _SessionStore_chunks, _SessionStore_option, _SessionStore_logger, _SessionStore_chunk, _SessionStore_clean;
// Uncomment to recalculate the estimated size
// of an empty session cookie
// import * as cookie from "../vendored/cookie.js"
// const { serialize } = cookie
// console.log(
//   "Cookie estimated to be ",
//   serialize(`__Secure.authjs.session-token.0`, "", {
//     expires: new Date(),
//     httpOnly: true,
//     maxAge: Number.MAX_SAFE_INTEGER,
//     path: "/",
//     sameSite: "strict",
//     secure: true,
//     domain: "example.com",
//   }).length,
//   " bytes"
// )
const ALLOWED_COOKIE_SIZE = 4096;
// Based on commented out section above
const ESTIMATED_EMPTY_COOKIE_SIZE = 160;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
/**
 * Use secure cookies if the site uses HTTPS
 * This being conditional allows cookies to work non-HTTPS development URLs
 * Honour secure cookie option, which sets 'secure' and also adds '__Secure-'
 * prefix, but enable them by default if the site URL is HTTPS; but not for
 * non-HTTPS URLs like http://localhost which are used in development).
 * For more on prefixes see https://googlechrome.github.io/samples/cookie-prefixes/
 *
 * @TODO Review cookie settings (names, options)
 */
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        // default cookie options
        sessionToken: {
            name: `${cookiePrefix}authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        callbackUrl: {
            name: `${cookiePrefix}authjs.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        csrfToken: {
            // Default to __Host- for CSRF token for additional protection if using useSecureCookies
            // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
            name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}authjs.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
        state: {
            name: `${cookiePrefix}authjs.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
        nonce: {
            name: `${cookiePrefix}authjs.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
        webauthnChallenge: {
            name: `${cookiePrefix}authjs.challenge`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15, // 15 minutes in seconds
            },
        },
    };
}
class SessionStore {
    constructor(option, cookies, logger) {
        _SessionStore_instances.add(this);
        _SessionStore_chunks.set(this, {});
        _SessionStore_option.set(this, void 0);
        _SessionStore_logger.set(this, void 0);
        __classPrivateFieldSet(this, _SessionStore_logger, logger, "f");
        __classPrivateFieldSet(this, _SessionStore_option, option, "f");
        if (!cookies)
            return;
        const { name: sessionCookiePrefix } = option;
        for (const [name, value] of Object.entries(cookies)) {
            if (!name.startsWith(sessionCookiePrefix) || !value)
                continue;
            __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
        }
    }
    /**
     * The JWT Session or database Session ID
     * constructed from the cookie chunks.
     */
    get value() {
        // Sort the chunks by their keys before joining
        const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a, b) => {
            const aSuffix = parseInt(a.split(".").pop() || "0");
            const bSuffix = parseInt(b.split(".").pop() || "0");
            return aSuffix - bSuffix;
        });
        // Use the sorted keys to join the chunks in the correct order
        return sortedKeys.map((key) => __classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
    }
    /**
     * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
     * If the cookie has changed from chunked to unchunked or vice versa,
     * it deletes the old cookies as well.
     */
    chunk(value, options) {
        // Assume all cookies should be cleaned by default
        const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
        // Calculate new chunks
        const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
            name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
            value,
            options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, ...options },
        });
        // Update stored chunks / cookies
        for (const chunk of chunked) {
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    /** Returns a list of cookies that should be cleaned. */
    clean() {
        return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
    }
}
_SessionStore_chunks = new WeakMap(), _SessionStore_option = new WeakMap(), _SessionStore_logger = new WeakMap(), _SessionStore_instances = new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie.name] = cookie.value;
        return [cookie];
    }
    const cookies = [];
    for (let i = 0; i < chunkCount; i++) {
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({ ...cookie, name, value });
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
    __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE),
    });
    return cookies;
}, _SessionStore_clean = function _SessionStore_clean() {
    const cleanedChunks = {};
    for (const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")) {
        delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, maxAge: 0 },
        };
    }
    return cleanedChunks;
};


/***/ }),

/***/ 272013:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ErrorPage)
/* harmony export */ });
/* harmony import */ var preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(896649);

/** Renders an error page. */
function ErrorPage(props) {
    const { url, error = "default", theme } = props;
    const signinPageUrl = `${url}/signin`;
    const errors = {
        default: {
            status: 200,
            heading: "Error",
            message: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("a", { className: "site", href: url?.origin, children: url?.host }) })),
        },
        Configuration: {
            status: 500,
            heading: "Server error",
            message: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "There is a problem with the server configuration." }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "Check the server logs for more information." })] })),
        },
        AccessDenied: {
            status: 403,
            heading: "Access Denied",
            message: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "You do not have permission to sign in." }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("a", { className: "button", href: signinPageUrl, children: "Sign in" }) })] })),
        },
        Verification: {
            status: 403,
            heading: "Unable to sign in",
            message: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "The sign in link is no longer valid." }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "It may have been used already or it may have expired." })] })),
            signin: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("a", { className: "button", href: signinPageUrl, children: "Sign in" })),
        },
    };
    const { status, heading, message, signin } = errors[error] ?? errors.default;
    return {
        status,
        html: ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "error", children: [theme?.brandColor && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                        __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `,
                    } })), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "card", children: [theme?.logo && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("img", { src: theme?.logo, alt: "Logo", className: "logo" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("h1", { children: heading }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("div", { className: "message", children: message }), signin] })] })),
    };
}


/***/ }),

/***/ 292606:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "forbidden", ({
    enumerable: true,
    get: function() {
        return forbidden;
    }
}));
const _httpaccessfallback = __webpack_require__(7638);
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
function forbidden() {
    if (true) {
        throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1019",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map


/***/ }),

/***/ 298621:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unstable_rethrow", ({
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
}));
const _dynamicrenderingutils = __webpack_require__(548894);
const _ispostpone = __webpack_require__(464491);
const _bailouttocsr = __webpack_require__(262880);
const _isnextroutererror = __webpack_require__(176484);
const _dynamicrendering = __webpack_require__(423445);
const _hooksservercontext = __webpack_require__(543449);
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map


/***/ }),

/***/ 311024:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G8: () => (/* reexport safe */ _lib_utils_env_js__WEBPACK_IMPORTED_MODULE_3__.G),
/* harmony export */   Nj: () => (/* binding */ Auth),
/* harmony export */   We: () => (/* reexport safe */ _lib_index_js__WEBPACK_IMPORTED_MODULE_2__.We),
/* harmony export */   lS: () => (/* reexport safe */ _lib_index_js__WEBPACK_IMPORTED_MODULE_2__.lS),
/* harmony export */   ot: () => (/* reexport safe */ _lib_utils_env_js__WEBPACK_IMPORTED_MODULE_3__.o)
/* harmony export */ });
/* harmony import */ var _lib_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(800022);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);
/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(897764);
/* harmony import */ var _lib_utils_env_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(752461);
/* harmony import */ var _lib_pages_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(476163);
/* harmony import */ var _lib_utils_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93316);
/* harmony import */ var _lib_utils_web_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(663236);
/* harmony import */ var _lib_symbols_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(399389);
/**
 *
 * :::warning Experimental
 * `@auth/core` is under active development.
 * :::
 *
 * This is the main entry point to the Auth.js library.
 *
 * Based on the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Request}
 * and {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response} Web standard APIs.
 * Primarily used to implement [framework](https://authjs.dev/getting-started/integrations)-specific packages,
 * but it can also be used directly.
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {...})
 *
 * console.log(response instanceof Response) // true
 * ```
 *
 * ## Resources
 *
 * - [Getting started](https://authjs.dev/getting-started)
 * - [Guides](https://authjs.dev/guides)
 *
 * @module @auth/core
 */










/**
 * Core functionality provided by Auth.js.
 *
 * Receives a standard {@link Request} and returns a {@link Response}.
 *
 * @example
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {
 *   providers: [Google],
 *   secret: "...",
 *   trustHost: true,
 * })
 *```
 * @see [Documentation](https://authjs.dev)
 */
async function Auth(request, config) {
    const logger = (0,_lib_utils_logger_js__WEBPACK_IMPORTED_MODULE_5__/* .setLogger */ .B)(config);
    const internalRequest = await (0,_lib_utils_web_js__WEBPACK_IMPORTED_MODULE_6__/* .toInternalRequest */ .A_)(request, config);
    // There was an error parsing the request
    if (!internalRequest)
        return Response.json(`Bad request.`, { status: 400 });
    const warningsOrError = (0,_lib_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__/* .assertConfig */ .Z)(internalRequest, config);
    if (Array.isArray(warningsOrError)) {
        warningsOrError.forEach(logger.warn);
    }
    else if (warningsOrError) {
        // If there's an error in the user config, bail out early
        logger.error(warningsOrError);
        const htmlPages = new Set([
            "signin",
            "signout",
            "error",
            "verify-request",
        ]);
        if (!htmlPages.has(internalRequest.action) ||
            internalRequest.method !== "GET") {
            const message = "There was a problem with the server configuration. Check the server logs for more information.";
            return Response.json({ message }, { status: 500 });
        }
        const { pages, theme } = config;
        // If this is true, the config required auth on the error page
        // which could cause a redirect loop
        const authOnErrorPage = pages?.error &&
            internalRequest.url.searchParams
                .get("callbackUrl")
                ?.startsWith(pages.error);
        // Either there was no error page configured or the configured one contains infinite redirects
        if (!pages?.error || authOnErrorPage) {
            if (authOnErrorPage) {
                logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ErrorPageLoop */ .CM(`The error page ${pages?.error} should not require authentication`));
            }
            const page = (0,_lib_pages_index_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({ theme }).error("Configuration");
            return (0,_lib_utils_web_js__WEBPACK_IMPORTED_MODULE_6__/* .toResponse */ .Zr)(page);
        }
        const url = `${internalRequest.url.origin}${pages.error}?error=Configuration`;
        return Response.redirect(url);
    }
    const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
    const isRaw = config.raw === _lib_index_js__WEBPACK_IMPORTED_MODULE_2__/* .raw */ .lS;
    try {
        const internalResponse = await (0,_lib_index_js__WEBPACK_IMPORTED_MODULE_2__/* .AuthInternal */ .ih)(internalRequest, config);
        if (isRaw)
            return internalResponse;
        const response = (0,_lib_utils_web_js__WEBPACK_IMPORTED_MODULE_6__/* .toResponse */ .Zr)(internalResponse);
        const url = response.headers.get("Location");
        if (!isRedirect || !url)
            return response;
        return Response.json({ url }, { headers: response.headers });
    }
    catch (e) {
        const error = e;
        logger.error(error);
        const isAuthError = error instanceof _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .AuthError */ .lR;
        if (isAuthError && isRaw && !isRedirect)
            throw error;
        // If the CSRF check failed for POST/session, return a 400 status code.
        // We should not redirect to a page as this is an API route
        if (request.method === "POST" && internalRequest.action === "session")
            return Response.json(null, { status: 400 });
        const isClientSafeErrorType = (0,_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .isClientError */ ._2)(error);
        const type = isClientSafeErrorType ? error.type : "Configuration";
        const params = new URLSearchParams({ error: type });
        if (error instanceof _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .CredentialsSignin */ .xz)
            params.set("code", error.code);
        const pageKind = (isAuthError && error.kind) || "error";
        const pagePath = config.pages?.[pageKind] ?? `${config.basePath}/${pageKind.toLowerCase()}`;
        const url = `${internalRequest.url.origin}${pagePath}?${params}`;
        if (isRedirect)
            return Response.json({ url });
        return Response.redirect(url);
    }
}


/***/ }),

/***/ 393021:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ PrismaAdapter)
/* harmony export */ });
function PrismaAdapter(prisma) {
    const p = prisma;
    return {
        // We need to let Prisma generate the ID because our default UUID is incompatible with MongoDB
        createUser: ({ id, ...data }) => p.user.create(stripUndefined(data)),
        getUser: (id) => p.user.findUnique({ where: { id } }),
        getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
        async getUserByAccount(provider_providerAccountId) {
            const account = await p.account.findUnique({
                where: { provider_providerAccountId },
                include: { user: true },
            });
            return account?.user ?? null;
        },
        updateUser: ({ id, ...data }) => p.user.update({
            where: { id },
            ...stripUndefined(data),
        }),
        deleteUser: (id) => p.user.delete({ where: { id } }),
        linkAccount: (data) => p.account.create({ data }),
        unlinkAccount: (provider_providerAccountId) => p.account.delete({
            where: { provider_providerAccountId },
        }),
        async getSessionAndUser(sessionToken) {
            const userAndSession = await p.session.findUnique({
                where: { sessionToken },
                include: { user: true },
            });
            if (!userAndSession)
                return null;
            const { user, ...session } = userAndSession;
            return { user, session };
        },
        createSession: (data) => p.session.create(stripUndefined(data)),
        updateSession: (data) => p.session.update({
            where: { sessionToken: data.sessionToken },
            ...stripUndefined(data),
        }),
        deleteSession: (sessionToken) => p.session.delete({ where: { sessionToken } }),
        async createVerificationToken(data) {
            const verificationToken = await p.verificationToken.create(stripUndefined(data));
            if ("id" in verificationToken && verificationToken.id)
                delete verificationToken.id;
            return verificationToken;
        },
        async useVerificationToken(identifier_token) {
            try {
                const verificationToken = await p.verificationToken.delete({
                    where: { identifier_token },
                });
                if ("id" in verificationToken && verificationToken.id)
                    delete verificationToken.id;
                return verificationToken;
            }
            catch (error) {
                // If token already used/deleted, just return null
                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                if (error &&
                    typeof error === "object" &&
                    "code" in error &&
                    error.code === "P2025")
                    return null;
                throw error;
            }
        },
        async getAccount(providerAccountId, provider) {
            return p.account.findFirst({
                where: { providerAccountId, provider },
            });
        },
        async createAuthenticator(data) {
            return p.authenticator.create(stripUndefined(data));
        },
        async getAuthenticator(credentialID) {
            return p.authenticator.findUnique({
                where: { credentialID },
            });
        },
        async listAuthenticatorsByUserId(userId) {
            return p.authenticator.findMany({
                where: { userId },
            });
        },
        async updateAuthenticatorCounter(credentialID, counter) {
            return p.authenticator.update({
                where: { credentialID },
                data: { counter },
            });
        },
    };
}
/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */
function stripUndefined(obj) {
    const data = {};
    for (const key in obj)
        if (obj[key] !== undefined)
            data[key] = obj[key];
    return { data };
}


/***/ }),

/***/ 396460:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FK: () => (/* binding */ b),
/* harmony export */   fF: () => (/* binding */ l),
/* harmony export */   h: () => (/* binding */ _)
/* harmony export */ });
/* unused harmony exports Component, cloneElement, createContext, createElement, createRef, hydrate, isValidElement, render, toChildArray */
var n,l,u,t,i,o,r,f,e,c,s,a,h={},v=[],p=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,y=Array.isArray;function d(n,l){for(var u in l)n[u]=l[u];return n}function w(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function _(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return g(l,f,i,o,null)}function g(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++u:r,__i:-1,__u:0};return null==r&&null!=l.vnode&&l.vnode(f),f}function m(){return{current:null}}function b(n){return n.children}function k(n,l){this.props=n,this.context=l}function x(n,l){if(null==l)return n.__?x(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?x(n):null}function C(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C(n)}}function S(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!M.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||r)(M)}function M(){var n,u,t,o,r,e,c,s;for(i.sort(f);n=i.shift();)n.__d&&(u=i.length,o=void 0,e=(r=(t=n).__v).__e,c=[],s=[],t.__P&&((o=d({},r)).__v=r.__v+1,l.vnode&&l.vnode(o),O(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[e]:null,c,null==e?x(r):e,!!(32&r.__u),s),o.__v=r.__v,o.__.__k[o.__i]=o,j(c,o,s),o.__e!=e&&C(o)),i.length>u&&i.sort(f));M.__r=0}function P(n,l,u,t,i,o,r,f,e,c,s){var a,p,y,d,w,_=t&&t.__k||v,g=l.length;for(u.__d=e,$(u,l,_),e=u.__d,a=0;a<g;a++)null!=(y=u.__k[a])&&(p=-1===y.__i?h:_[y.__i]||h,y.__i=a,O(n,y,p,i,o,r,f,e,c,s),d=y.__e,y.ref&&p.ref!=y.ref&&(p.ref&&N(p.ref,null,y),s.push(y.ref,y.__c||d,y)),null==w&&null!=d&&(w=d),65536&y.__u||p.__k===y.__k?e=I(y,e,n):"function"==typeof y.type&&void 0!==y.__d?e=y.__d:d&&(e=d.nextSibling),y.__d=void 0,y.__u&=-196609);u.__d=e,u.__e=w}function $(n,l,u){var t,i,o,r,f,e=l.length,c=u.length,s=c,a=0;for(n.__k=[],t=0;t<e;t++)null!=(i=l[t])&&"boolean"!=typeof i&&"function"!=typeof i?(r=t+a,(i=n.__k[t]="string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?g(null,i,null,null,null):y(i)?g(b,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?g(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i).__=n,i.__b=n.__b+1,o=null,-1!==(f=i.__i=L(i,u,r,s))&&(s--,(o=u[f])&&(o.__u|=131072)),null==o||null===o.__v?(-1==f&&a--,"function"!=typeof i.type&&(i.__u|=65536)):f!==r&&(f==r-1?a--:f==r+1?a++:(f>r?a--:a++,i.__u|=65536))):i=n.__k[t]=null;if(s)for(t=0;t<c;t++)null!=(o=u[t])&&0==(131072&o.__u)&&(o.__e==n.__d&&(n.__d=x(o)),V(o,o))}function I(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=I(t[i],l,u));return l}n.__e!=l&&(l&&n.type&&!u.contains(l)&&(l=x(n)),u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling}while(null!=l&&8===l.nodeType);return l}function H(n,l){return l=l||[],null==n||"boolean"==typeof n||(y(n)?n.some(function(n){H(n,l)}):l.push(n)),l}function L(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type&&0==(131072&e.__u))return u;if(t>(null!=e&&0==(131072&e.__u)?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return r;r--}if(f<l.length){if((e=l[f])&&0==(131072&e.__u)&&i==e.key&&o===e.type)return f;f++}}return-1}function T(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||p.test(l)?u:u+"px"}function A(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||T(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/i,"$1")),l=l.toLowerCase()in n||"onFocusOut"===l||"onFocusIn"===l?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=e,n.addEventListener(l,o?s:c,o)):n.removeEventListener(l,o?s:c,o);else{if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u))}}function F(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=e++;else if(u.t<t.u)return;return t(l.event?l.event(u):u)}}}function O(n,u,t,i,o,r,f,e,c,s){var a,h,v,p,w,_,g,m,x,C,S,M,$,I,H,L,T=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[e=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof T)try{if(m=u.props,x="prototype"in T&&T.prototype.render,C=(a=T.contextType)&&i[a.__c],S=a?C?C.props.value:a.__:i,t.__c?g=(h=u.__c=t.__c).__=h.__E:(x?u.__c=h=new T(m,S):(u.__c=h=new k(m,S),h.constructor=T,h.render=q),C&&C.sub(h),h.props=m,h.state||(h.state={}),h.context=S,h.__n=i,v=h.__d=!0,h.__h=[],h._sb=[]),x&&null==h.__s&&(h.__s=h.state),x&&null!=T.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d({},h.__s)),d(h.__s,T.getDerivedStateFromProps(m,h.__s))),p=h.props,w=h.state,h.__v=u,v)x&&null==T.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),x&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(x&&null==T.getDerivedStateFromProps&&m!==p&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,S),!h.__e&&(null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,S)||u.__v===t.__v)){for(u.__v!==t.__v&&(h.props=m,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u)}),M=0;M<h._sb.length;M++)h.__h.push(h._sb[M]);h._sb=[],h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,S),x&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(p,w,_)})}if(h.context=S,h.props=m,h.__P=n,h.__e=!1,$=l.__r,I=0,x){for(h.state=h.__s,h.__d=!1,$&&$(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[]}else do{h.__d=!1,$&&$(u),a=h.render(h.props,h.state,h.context),h.state=h.__s}while(h.__d&&++I<25);h.state=h.__s,null!=h.getChildContext&&(i=d(d({},i),h.getChildContext())),x&&!v&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(p,w)),P(n,y(L=null!=a&&a.type===b&&null==a.key?a.props.children:a)?L:[L],u,t,i,o,r,f,e,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&f.push(h),g&&(h.__E=h.__=null)}catch(n){if(u.__v=null,c||null!=r){for(u.__u|=c?160:128;e&&8===e.nodeType&&e.nextSibling;)e=e.nextSibling;r[r.indexOf(e)]=null,u.__e=e}else u.__e=t.__e,u.__k=t.__k;l.__e(n,u,t)}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=z(t.__e,u,t,i,o,r,f,c,s);(a=l.diffed)&&a(u)}function j(n,u,t){u.__d=void 0;for(var i=0;i<t.length;i++)N(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function z(u,t,i,o,r,f,e,c,s){var a,v,p,d,_,g,m,b=i.props,k=t.props,C=t.type;if("svg"===C?r="http://www.w3.org/2000/svg":"math"===C?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),null!=f)for(a=0;a<f.length;a++)if((_=f[a])&&"setAttribute"in _==!!C&&(C?_.localName===C:3===_.nodeType)){u=_,f[a]=null;break}if(null==u){if(null===C)return document.createTextNode(k);u=document.createElementNS(r,C,k.is&&k),c&&(l.__m&&l.__m(t,f),c=!1),f=null}if(null===C)b===k||c&&u.data===k||(u.data=k);else{if(f=f&&n.call(u.childNodes),b=i.props||h,!c&&null!=f)for(b={},a=0;a<u.attributes.length;a++)b[(_=u.attributes[a]).name]=_.value;for(a in b)if(_=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)p=_;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;A(u,a,null,_,r)}for(a in k)_=k[a],"children"==a?d=_:"dangerouslySetInnerHTML"==a?v=_:"value"==a?g=_:"checked"==a?m=_:c&&"function"!=typeof _||b[a]===_||A(u,a,_,b[a],r);if(v)c||p&&(v.__html===p.__html||v.__html===u.innerHTML)||(u.innerHTML=v.__html),t.__k=[];else if(p&&(u.innerHTML=""),P(u,y(d)?d:[d],t,i,o,"foreignObject"===C?"http://www.w3.org/1999/xhtml":r,f,e,f?f[0]:i.__k&&x(i,0),c,s),null!=f)for(a=f.length;a--;)w(f[a]);c||(a="value","progress"===C&&null==g?u.removeAttribute("value"):void 0!==g&&(g!==u[a]||"progress"===C&&!g||"option"===C&&g!==b[a])&&A(u,a,g,b[a],r),a="checked",void 0!==m&&m!==u[a]&&A(u,a,m,b[a],r))}return u}function N(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u))}else n.current=u}catch(n){l.__e(n,t)}}function V(n,u,t){var i,o;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&V(i[o],u,t||"function"!=typeof n.type);t||w(n.__e),n.__c=n.__=n.__e=n.__d=void 0}function q(n,l,u){return this.constructor(n,u)}function B(u,t,i){var o,r,f,e;l.__&&l.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],O(t,u=(!o&&i||t).__k=_(b,null,[u]),r||h,h,t.namespaceURI,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),j(f,u,e)}function D(n,l){B(n,l,D)}function E(l,u,t){var i,o,r,f,e=d({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),g(l.type,e,i||l.key,o||l.ref,null)}function G(n,l){var u={__c:l="__cC"+a++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=new Set,(t={})[l]=this,this.getChildContext=function(){return t},this.componentWillUnmount=function(){u=null},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.forEach(function(n){n.__e=!0,S(n)})},this.sub=function(n){u.add(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u&&u.delete(n),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=v.slice,l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&null==n.constructor},k.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d({},this.state),"function"==typeof n&&(n=n(d({},u),this.props)),n&&d(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),S(this))},k.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),S(this))},k.prototype.render=b,i=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(n,l){return n.__v.__b-l.__v.__b},M.__r=0,e=0,c=F(!1),s=F(!0),a=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ 399389:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A6: () => (/* binding */ customFetch),
/* harmony export */   We: () => (/* binding */ skipCSRFCheck),
/* harmony export */   lS: () => (/* binding */ raw),
/* harmony export */   qo: () => (/* binding */ conformInternal)
/* harmony export */ });
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js comes with built-in CSRF protection, but
 * if you are implementing a framework that is already protected against CSRF attacks, you can skip this check by
 * passing this value to {@link AuthConfig.skipCSRFCheck}.
 */
const skipCSRFCheck = Symbol("skip-csrf-check");
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js returns a web standard {@link Response} by default, but
 * if you are implementing a framework you might want to get access to the raw internal response
 * by passing this value to {@link AuthConfig.raw}.
 */
const raw = Symbol("return-type-raw");
/**
 * :::danger
 * This option allows you to override the default `fetch` function used by the provider
 * to make requests to the provider's OAuth endpoints directly.
 * Used incorrectly, it can have security implications.
 * :::
 *
 * It can be used to support corporate proxies, custom fetch libraries, cache discovery endpoints,
 * add mocks for testing, logging, set custom headers/params for non-spec compliant providers, etc.
 *
 * @example
 * ```ts
 * import { Auth, customFetch } from "@auth/core"
 * import GitHub from "@auth/core/providers/github"
 *
 * const dispatcher = new ProxyAgent("my.proxy.server")
 * function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
 *   return undici(args[0], { ...(args[1] ?? {}), dispatcher })
 * }
 *
 * const response = await Auth(request, {
 *   providers: [GitHub({ [customFetch]: proxy })]
 * })
 * ```
 *
 * @see https://undici.nodejs.org/#/docs/api/ProxyAgent?id=example-basic-proxy-request-with-local-agent-dispatcher
 * @see https://authjs.dev/guides/corporate-proxy
 */
const customFetch = Symbol("custom-fetch");
/**
 * @internal
 *
 * Used to mark some providers for processing within the core library.
 *
 * **Do not use or you will be fired.**
 */
const conformInternal = Symbol("conform-internal");


/***/ }),

/***/ 401945:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D4: () => (/* binding */ decode),
/* harmony export */   lF: () => (/* binding */ encode)
/* harmony export */ });
/* unused harmony export getToken */
/* harmony import */ var _panva_hkdf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(707498);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(696217);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(488888);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(653376);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(601508);
/* harmony import */ var _lib_utils_cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(269806);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);
/* harmony import */ var _lib_vendored_cookie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(747722);
/**
 *
 *
 * This module contains functions and types
 * to encode and decode {@link https://authjs.dev/concepts/session-strategies#jwt-session JWT}s
 * issued and used by Auth.js.
 *
 * The JWT issued by Auth.js is _encrypted by default_, using the _A256CBC-HS512_ algorithm ({@link https://www.rfc-editor.org/rfc/rfc7518.html#section-5.2.5 JWE}).
 * It uses the `AUTH_SECRET` environment variable or the passed `secret` property to derive a suitable encryption key.
 *
 * :::info Note
 * Auth.js JWTs are meant to be used by the same app that issued them.
 * If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
 * :::
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * You can then import this submodule from `@auth/core/jwt`.
 *
 * ## Usage
 *
 * :::warning Warning
 * This module *will* be refactored/changed. We do not recommend relying on it right now.
 * :::
 *
 *
 * ## Resources
 *
 * - [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt-session)
 * - [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
 *
 * @module jwt
 */





const { /* parse */ "q": parseCookie } = _lib_vendored_cookie_js__WEBPACK_IMPORTED_MODULE_2__;
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const now = () => (Date.now() / 1000) | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
/** Issues a JWT. By default, the JWT is encrypted using "A256CBC-HS512". */
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [secret];
    const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
    const thumbprint = await (0,jose__WEBPACK_IMPORTED_MODULE_3__/* .calculateJwkThumbprint */ .s)({ kty: "oct", k: jose__WEBPACK_IMPORTED_MODULE_4__/* .encode */ .l(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
    // @ts-expect-error `jose` allows any object as payload.
    return await new jose__WEBPACK_IMPORTED_MODULE_5__/* .EncryptJWT */ .L(token)
        .setProtectedHeader({ alg, enc, kid: thumbprint })
        .setIssuedAt()
        .setExpirationTime(now() + maxAge)
        .setJti(crypto.randomUUID())
        .encrypt(encryptionSecret);
}
/** Decodes an Auth.js issued JWT. */
async function decode(params) {
    const { token, secret, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [secret];
    if (!token)
        return null;
    const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_6__/* .jwtDecrypt */ .B)(token, async ({ kid, enc }) => {
        for (const secret of secrets) {
            const encryptionSecret = await getDerivedEncryptionKey(enc, secret, salt);
            if (kid === undefined)
                return encryptionSecret;
            const thumbprint = await (0,jose__WEBPACK_IMPORTED_MODULE_3__/* .calculateJwkThumbprint */ .s)({ kty: "oct", k: jose__WEBPACK_IMPORTED_MODULE_4__/* .encode */ .l(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
            if (kid === thumbprint)
                return encryptionSecret;
        }
        throw new Error("no matching decryption secret");
    }, {
        clockTolerance: 15,
        keyManagementAlgorithms: [alg],
        contentEncryptionAlgorithms: [enc, "A256GCM"],
    });
    return payload;
}
async function getToken(params) {
    const { secureCookie, cookieName = defaultCookies(secureCookie ?? false).sessionToken.name, decode: _decode = decode, salt = cookieName, secret, logger = console, raw, req, } = params;
    if (!req)
        throw new Error("Must pass `req` to JWT getToken()");
    const headers = req.headers instanceof Headers ? req.headers : new Headers(req.headers);
    const sessionStore = new SessionStore({ name: cookieName, options: { secure: secureCookie } }, parseCookie(headers.get("cookie") ?? ""), logger);
    let token = sessionStore.value;
    const authorizationHeader = headers.get("authorization");
    if (!token && authorizationHeader?.split(" ")[0] === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        try {
            token = decodeURIComponent(urlEncodedToken);
        }
        catch {
            // Malformed percent-encoding makes the Bearer token invalid
            return null;
        }
    }
    if (!token)
        return null;
    if (raw)
        return token;
    if (!secret)
        throw new MissingSecret("Must pass `secret` if not set to JWT getToken()");
    try {
        return await _decode({ token, secret, salt });
    }
    catch {
        return null;
    }
}
async function getDerivedEncryptionKey(enc, keyMaterial, salt) {
    let length;
    switch (enc) {
        case "A256CBC-HS512":
            length = 64;
            break;
        case "A256GCM":
            length = 32;
            break;
        default:
            throw new Error("Unsupported JWT Content Encryption Algorithm");
    }
    return await (0,_panva_hkdf__WEBPACK_IMPORTED_MODULE_7__/* .hkdf */ .s)("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, length);
}


/***/ }),

/***/ 409029:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Facebook)
/* harmony export */ });
/**
 * Add Facebook login to your page.
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/facebook
 * ```
 *
 * #### Configuration
 *```ts
 * import { Auth } from "@auth/core"
 * import Facebook from "@auth/core/providers/facebook"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [
 *     Facebook({
 *       clientId: FACEBOOK_CLIENT_ID,
 *       clientSecret: FACEBOOK_CLIENT_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 *  - [Facebook OAuth documentation](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/)
 *
 * ### Notes
 *
 * :::tip
 * Production applications cannot use localhost URLs to sign in with Facebook. You need to use a dedicated development application in Facebook to use localhost callback URLs.
 * :::
 *
 * :::tip
 * Email address may not be returned for accounts created on mobile.
 * :::
 *
 * By default, Auth.js assumes that the Facebook provider is
 * based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.
 *
 * :::tip
 *
 * The Facebook provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/facebook.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */
function Facebook(options) {
    return {
        id: "facebook",
        name: "Facebook",
        type: "oauth",
        authorization: {
            url: "https://www.facebook.com/v19.0/dialog/oauth",
            params: {
                scope: "email",
            },
        },
        token: "https://graph.facebook.com/oauth/access_token",
        userinfo: {
            // https://developers.facebook.com/docs/graph-api/reference/user/#fields
            url: "https://graph.facebook.com/me?fields=id,name,email,picture",
            async request({ tokens, provider }) {
                return await fetch(provider.userinfo?.url, {
                    headers: { Authorization: `Bearer ${tokens.access_token}` },
                }).then(async (res) => await res.json());
            },
        },
        profile(profile) {
            return {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.picture.data.url,
            };
        },
        style: { bg: "#006aff", text: "#fff" },
        options,
    };
}


/***/ }),

/***/ 415235:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Credentials)
/* harmony export */ });
/**
 * The Credentials provider allows you to handle signing in with arbitrary credentials,
 * such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
 *
 * It is intended to support use cases where you have an existing system you need to authenticate users against.
 *
 * It comes with the constraint that users authenticated in this manner are not persisted in the database,
 * and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
 *
 * :::caution
 * The functionality provided for credentials-based authentication is intentionally limited to discourage the use of passwords due to the inherent security risks of the username-password model.
 *
 * OAuth providers spend significant amounts of money, time, and engineering effort to build:
 *
 * - abuse detection (bot-protection, rate-limiting)
 * - password management (password reset, credential stuffing, rotation)
 * - data security (encryption/salting, strength validation)
 *
 * and much more for authentication solutions. It is likely that your application would benefit from leveraging these battle-tested solutions rather than try to rebuild them from scratch.
 *
 * If you'd still like to build password-based authentication for your application despite these risks, Auth.js gives you full control to do so.
 *
 * :::
 *
 * See the [callbacks documentation](/reference/core#authconfig#callbacks) for more information on how to interact with the token. For example, you can add additional information to the token by returning an object from the `jwt()` callback:
 *
 * ```ts
 * callbacks: {
 *   async jwt({ token, user, account, profile, isNewUser }) {
 *     if (user) {
 *       token.id = user.id
 *     }
 *     return token
 *   }
 * }
 * ```
 *
 * @example
 * ```ts
 * import { Auth } from "@auth/core"
 * import Credentials from "@auth/core/providers/credentials"
 *
 * const request = new Request("https://example.com")
 * const response = await AuthHandler(request, {
 *   providers: [
 *     Credentials({
 *       credentials: {
 *         username: { label: "Username" },
 *         password: {  label: "Password", type: "password" }
 *       },
 *       async authorize({ request }) {
 *         const response = await fetch(request)
 *         if(!response.ok) return null
 *         return await response.json() ?? null
 *       }
 *     })
 *   ],
 *   secret: "...",
 *   trustHost: true,
 * })
 * ```
 * @see [Username/Password Example](https://authjs.dev/getting-started/authentication/credentials)
 */
function Credentials(config) {
    return {
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {},
        authorize: () => null,
        // @ts-expect-error
        options: config,
    };
}


/***/ }),

/***/ 438805:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BU: () => (/* binding */ validateCritDuplicates),
/* harmony export */   CT: () => (/* binding */ JWE_RECOGNIZED),
/* harmony export */   Fw: () => (/* binding */ validateAlgorithms),
/* harmony export */   GT: () => (/* binding */ assertUint8Array),
/* harmony export */   Gv: () => (/* binding */ isObject),
/* harmony export */   MV: () => (/* binding */ encodeAsciiMember),
/* harmony export */   OX: () => (/* binding */ parseJoseHeader),
/* harmony export */   ac: () => (/* binding */ assertNotSet),
/* harmony export */   fz: () => (/* binding */ isDisjoint),
/* harmony export */   h2: () => (/* binding */ decodeBase64url),
/* harmony export */   ji: () => (/* binding */ serializeJoseHeader),
/* harmony export */   nI: () => (/* binding */ validateCrit)
/* harmony export */ });
/* unused harmony exports JWS_RECOGNIZED, isJwkSet, validateB64 */
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(499129);
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(488888);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(573575);



function assertUint8Array(input, label) {
  if (!(input instanceof Uint8Array))
    throw new TypeError(`${label} must be an instance of Uint8Array`);
}
function isObject(input) {
  if (typeof input != "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]")
    return !1;
  const prototype = Object.getPrototypeOf(input);
  return prototype === null || Object.getPrototypeOf(prototype) === null;
}
function isJwkSet(input) {
  return isObject(input) && Array.isArray(input.keys) && Array.from(input.keys).every(isObject);
}
function isDisjoint(...headers) {
  const parameters = /* @__PURE__ */ new Set();
  for (const header of headers)
    if (header)
      for (const parameter of Object.keys(header)) {
        if (parameters.has(parameter))
          return !1;
        parameters.add(parameter);
      }
  return !0;
}
function assertNotSet(value, name) {
  if (value !== void 0)
    throw new TypeError(`${name} can only be called once`);
}
function decodeBase64url(value, label, ErrorClass) {
  try {
    return (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_0__/* .decode */ .D)(value);
  } catch (cause) {
    throw new ErrorClass(`Failed to base64url decode the ${label}`, { cause });
  }
}
function encodeAsciiMember(value, label, ErrorClass) {
  try {
    return (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .encode */ .lF)(value);
  } catch (cause) {
    throw new ErrorClass(`The ${label} is not a valid base64url string`, { cause });
  }
}
function parseJoseHeader(encodedProtectedHeader, ErrorClass, message) {
  let parsed;
  try {
    parsed = JSON.parse(_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .strictDecoder */ .u8.decode((0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_0__/* .decode */ .D)(encodedProtectedHeader)));
  } catch (cause) {
    throw new ErrorClass(message, { cause });
  }
  if (!isObject(parsed))
    throw new ErrorClass(message);
  return parsed;
}
const JWS_RECOGNIZED = { __proto__: null, b64: !0 }, JWE_RECOGNIZED = { __proto__: null };
function validateAlgorithms(option, algorithms) {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s != "string")))
    throw new TypeError(`"${option}" option must be an array of strings`);
  return algorithms === void 0 ? void 0 : new Set(algorithms);
}
function validateCritDuplicates(Err, protectedHeader) {
  const { crit } = protectedHeader ?? {};
  if (Array.isArray(crit) && new Set(crit).size !== crit.length)
    throw new Err('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0)
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!protectedHeader || protectedHeader.crit === void 0)
    return [];
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input != "string" || input.length === 0))
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  const recognized = recognizedOption === void 0 ? recognizedDefault : { __proto__: null, ...recognizedOption, ...recognizedDefault };
  for (const parameter of protectedHeader.crit) {
    if (!(parameter in recognized))
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JOSENotSupported */ .T0(`Extension Header Parameter "${parameter}" is not recognized`);
    if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0)
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0))
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
  }
  return protectedHeader.crit;
}
function validateB64(protectedHeader, extensions) {
  if (extensions.includes("b64")) {
    const b64 = protectedHeader.b64;
    if (typeof b64 != "boolean")
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    return b64;
  }
  return !0;
}
function serializeJoseHeader(Err, header) {
  let serialized, parsed;
  try {
    serialized = JSON.stringify(header), parsed = JSON.parse(serialized);
  } catch (cause) {
    throw new Err("JOSE Header is not valid JSON", { cause });
  }
  if (!isObject(parsed))
    throw new Err("JOSE Header is not a JSON object");
  return [parsed, serialized];
}



/***/ }),

/***/ 441993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SigninPage)
/* harmony export */ });
/* harmony import */ var preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(896649);
/* harmony import */ var _utils_webauthn_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(472060);


const signinErrors = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
};
function ConditionalUIScript(providerID) {
    const startConditionalUIScript = `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${_utils_webauthn_client_js__WEBPACK_IMPORTED_MODULE_1__/* .webauthnScript */ .o})(authURL, "${providerID}");
`;
    return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)(preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .Fragment */ .FK, { children: (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("script", { dangerouslySetInnerHTML: { __html: startConditionalUIScript } }) }));
}
function SigninPage(props) {
    const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType, } = props;
    if (typeof document !== "undefined" && theme?.brandColor) {
        document.documentElement.style.setProperty("--brand-color", theme.brandColor);
    }
    if (typeof document !== "undefined" && theme?.buttonText) {
        document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
    }
    const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
    const providerLogoPath = "https://authjs.dev/img/providers";
    const conditionalUIProviderID = providers.find((provider) => provider.type === "webauthn" && provider.enableConditionalUI)?.id;
    return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "signin", children: [theme?.brandColor && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                    __html: `:root {--brand-color: ${theme.brandColor}}`,
                } })), theme?.buttonText && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `,
                } })), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "card", children: [error && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("div", { className: "error", children: (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: error }) })), theme?.logo && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("img", { src: theme.logo, alt: "Logo", className: "logo" }), providers.map((provider, i) => {
                        let bg, brandColor, logo;
                        if (provider.type === "oauth" || provider.type === "oidc") {
                            ;
                            ({
                                bg = "#fff",
                                brandColor,
                                logo = `${providerLogoPath}/${provider.id}.svg`,
                            } = provider.style ?? {});
                        }
                        const color = brandColor ?? bg ?? "#fff";
                        return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "provider", children: [provider.type === "oauth" || provider.type === "oidc" ? ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("form", { action: provider.signinUrl, method: "POST", children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "csrfToken", value: csrfToken }), callbackUrl && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "callbackUrl", value: callbackUrl })), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("button", { type: "submit", className: "button", style: {
                                                "--provider-brand-color": color,
                                            }, tabIndex: 0, children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("span", { style: {
                                                        filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)",
                                                        "mix-blend-mode": "luminosity",
                                                        opacity: 0.95,
                                                    }, children: ["Sign in with ", provider.name] }), logo && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("img", { loading: "lazy", height: 24, src: logo })] })] })) : null, (provider.type === "email" ||
                                    provider.type === "credentials" ||
                                    provider.type === "webauthn") &&
                                    i > 0 &&
                                    providers[i - 1].type !== "email" &&
                                    providers[i - 1].type !== "credentials" &&
                                    providers[i - 1].type !== "webauthn" && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("hr", {}), provider.type === "email" && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("form", { action: provider.signinUrl, method: "POST", children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "csrfToken", value: csrfToken }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("label", { className: "section-header", htmlFor: `input-email-for-${provider.id}-provider`, children: "Email" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { id: `input-email-for-${provider.id}-provider`, autoFocus: true, type: "email", name: "email", value: email, placeholder: "email@example.com", required: true }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), provider.type === "credentials" && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("form", { action: provider.callbackUrl, method: "POST", children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.credentials).map((credential) => {
                                            return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("label", { className: "section-header", htmlFor: `input-${credential}-for-${provider.id}-provider`, children: provider.credentials[credential].label ?? credential }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { name: credential, id: `input-${credential}-for-${provider.id}-provider`, type: provider.credentials[credential].type ?? "text", placeholder: provider.credentials[credential].placeholder ?? "", ...provider.credentials[credential] })] }, `input-group-${provider.id}`));
                                        }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), provider.type === "webauthn" && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("form", { action: provider.callbackUrl, method: "POST", id: `${provider.id}-form`, children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.formFields).map((field) => {
                                            return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("label", { className: "section-header", htmlFor: `input-${field}-for-${provider.id}-provider`, children: provider.formFields[field].label ?? field }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { name: field, "data-form-field": true, id: `input-${field}-for-${provider.id}-provider`, type: provider.formFields[field].type ?? "text", placeholder: provider.formFields[field].placeholder ?? "", ...provider.formFields[field] })] }, `input-group-${provider.id}`));
                                        }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("button", { id: `submitButton-${provider.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] })), (provider.type === "email" ||
                                    provider.type === "credentials" ||
                                    provider.type === "webauthn") &&
                                    i + 1 < providers.length && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("hr", {})] }, provider.id));
                    })] }), conditionalUIProviderID && ConditionalUIScript(conditionalUIProviderID)] }));
}


/***/ }),

/***/ 444057:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unauthorized", ({
    enumerable: true,
    get: function() {
        return unauthorized;
    }
}));
const _httpaccessfallback = __webpack_require__(7638);
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
function unauthorized() {
    if (true) {
        throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1002",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map


/***/ }),

/***/ 464491:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isPostpone", ({
    enumerable: true,
    get: function() {
        return isPostpone;
    }
}));
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}

//# sourceMappingURL=is-postpone.js.map

/***/ }),

/***/ 472060:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ webauthnScript)
/* harmony export */ });
//@ts-check
// Declare a SimpleWebAuthnBrowser variable as part of "window"
/** @typedef {"authenticate"} WebAuthnAuthenticate */
/** @typedef {"register"} WebAuthnRegister */
/** @typedef {WebAuthnRegister | WebAuthnAuthenticate} WebAuthnOptionsAction */
/**
 * @template {WebAuthnOptionsAction} T
 * @typedef {T extends WebAuthnAuthenticate ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialRequestOptionsJSON; action: "authenticate" } :
 *  T extends WebAuthnRegister ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialCreationOptionsJSON; action: "register" } :
 * never
 * } WebAuthnOptionsReturn
 */
/**
 * webauthnScript is the client-side script that handles the webauthn form
 *
 * @param {string} authURL is the URL of the auth API
 * @param {string} providerID is the ID of the webauthn provider
 */
async function webauthnScript(authURL, providerID) {
    /** @type {typeof import("@simplewebauthn/browser")} */
    // @ts-ignore
    const WebAuthnBrowser = window.SimpleWebAuthnBrowser;
    /**
     * Fetch webauthn options from the server
     *
     * @template {WebAuthnOptionsAction} T
     * @param {T | undefined} action action to fetch options for
     * @returns {Promise<WebAuthnOptionsReturn<T> | undefined>}
     */
    async function fetchOptions(action) {
        // Create the options URL with the action and query parameters
        const url = new URL(`${authURL}/webauthn-options/${providerID}`);
        if (action)
            url.searchParams.append("action", action);
        const formFields = getFormFields();
        formFields.forEach((field) => {
            url.searchParams.append(field.name, field.value);
        });
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Failed to fetch options", res);
            return;
        }
        return res.json();
    }
    /**
     * Get the webauthn form from the page
     *
     * @returns {HTMLFormElement}
     */
    function getForm() {
        const formID = `#${providerID}-form`;
        /** @type {HTMLFormElement | null} */
        const form = document.querySelector(formID);
        if (!form)
            throw new Error(`Form '${formID}' not found`);
        return form;
    }
    /**
     * Get formFields from the form
     *
     * @returns {HTMLInputElement[]}
     */
    function getFormFields() {
        const form = getForm();
        /** @type {HTMLInputElement[]} */
        const formFields = Array.from(form.querySelectorAll("input[data-form-field]"));
        return formFields;
    }
    /**
     * Passkey form submission handler.
     * Takes the input from the form and a few other parameters and submits it to the server.
     *
     * @param {WebAuthnOptionsAction} action action to submit
     * @param {unknown | undefined} data optional data to submit
     * @returns {Promise<void>}
     */
    async function submitForm(action, data) {
        const form = getForm();
        // If a POST request, create hidden fields in the form
        // and submit it so the browser redirects on login
        if (action) {
            const actionInput = document.createElement("input");
            actionInput.type = "hidden";
            actionInput.name = "action";
            actionInput.value = action;
            form.appendChild(actionInput);
        }
        if (data) {
            const dataInput = document.createElement("input");
            dataInput.type = "hidden";
            dataInput.name = "data";
            dataInput.value = JSON.stringify(data);
            form.appendChild(dataInput);
        }
        return form.submit();
    }
    /**
     * Executes the authentication flow by fetching options from the server,
     * starting the authentication, and submitting the response to the server.
     *
     * @param {WebAuthnOptionsReturn<WebAuthnAuthenticate>['options']} options
     * @param {boolean} autofill Whether or not to use the browser's autofill
     * @returns {Promise<void>}
     */
    async function authenticationFlow(options, autofill) {
        // Start authentication
        const authResp = await WebAuthnBrowser.startAuthentication(options, autofill);
        // Submit authentication response to server
        return await submitForm("authenticate", authResp);
    }
    /**
     * @param {WebAuthnOptionsReturn<WebAuthnRegister>['options']} options
     */
    async function registrationFlow(options) {
        // Check if all required formFields are set
        const formFields = getFormFields();
        formFields.forEach((field) => {
            if (field.required && !field.value) {
                throw new Error(`Missing required field: ${field.name}`);
            }
        });
        // Start registration
        const regResp = await WebAuthnBrowser.startRegistration(options);
        // Submit registration response to server
        return await submitForm("register", regResp);
    }
    /**
     * Attempts to authenticate the user when the page loads
     * using the browser's autofill popup.
     *
     * @returns {Promise<void>}
     */
    async function autofillAuthentication() {
        // if the browser can't handle autofill, don't try
        if (!WebAuthnBrowser.browserSupportsWebAuthnAutofill())
            return;
        const res = await fetchOptions("authenticate");
        if (!res) {
            console.error("Failed to fetch option for autofill authentication");
            return;
        }
        try {
            await authenticationFlow(res.options, true);
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * Sets up the passkey form by overriding the form submission handler
     * so that it attempts to authenticate the user when the form is submitted.
     * If the user is not registered, it will attempt to register them instead.
     */
    async function setupForm() {
        const form = getForm();
        // If the browser can't do WebAuthn, hide the form
        if (!WebAuthnBrowser.browserSupportsWebAuthn()) {
            form.style.display = "none";
            return;
        }
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                // Fetch options from the server without assuming that
                // the user is registered
                const res = await fetchOptions(undefined);
                if (!res) {
                    console.error("Failed to fetch options for form submission");
                    return;
                }
                // Then execute the appropriate flow
                if (res.action === "authenticate") {
                    try {
                        await authenticationFlow(res.options, false);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else if (res.action === "register") {
                    try {
                        await registrationFlow(res.options);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }
    // On page load, setup the form and attempt to authenticate the user.
    setupForm();
    autofillAuthentication();
}


/***/ }),

/***/ 474357:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JU: () => (/* binding */ exportJWK)
/* harmony export */ });
/* unused harmony exports exportPKCS8, exportSPKI */
/* harmony import */ var _lib_key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(864416);
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(488888);



function exportSPKI(key) {
  return exportPublic(key);
}
function exportPKCS8(key) {
  return exportPrivate(key);
}
async function exportJWK(key) {
  if ((0,_lib_key_js__WEBPACK_IMPORTED_MODULE_0__/* .isKeyObject */ .D2)(key))
    if (key.type === "secret")
      key = key.export();
    else
      return key.export({ format: "jwk" });
  if (key instanceof Uint8Array)
    return {
      kty: "oct",
      k: (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_1__/* .encode */ .l)(key)
    };
  if (!(0,_lib_key_js__WEBPACK_IMPORTED_MODULE_0__/* .isCryptoKey */ .R7)(key))
    throw new TypeError((0,_lib_key_js__WEBPACK_IMPORTED_MODULE_0__/* .invalidKeyInput */ .XP)(key, "CryptoKey", "KeyObject", "Uint8Array"));
  if (!key.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const jwk = await crypto.subtle.exportKey("jwk", key);
  delete jwk.ext, delete jwk.key_ops, delete jwk.use, jwk.kty !== "AKP" && delete jwk.alg;
  for (const parameter of Object.keys(jwk))
    jwk[parameter] === void 0 && delete jwk[parameter];
  return jwk;
}



/***/ }),

/***/ 476163:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ renderPage)
/* harmony export */ });
/* harmony import */ var preact_render_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(241846);
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(272013);
/* harmony import */ var _signin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(441993);
/* harmony import */ var _signout_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(820660);
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(99161);
/* harmony import */ var _verify_request_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(219298);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(558761);







function send({ html, title, status, cookies, theme, headTags, }) {
    return {
        cookies,
        status,
        headers: { "Content-Type": "text/html" },
        body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${_styles_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A}</style><title>${title}</title>${headTags ?? ""}</head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${(0,preact_render_to_string__WEBPACK_IMPORTED_MODULE_0__/* .renderToString */ .F0)(html)}</div></body></html>`,
    };
}
/**
 * Unless the user defines their [own pages](https://authjs.dev/reference/core#pages),
 * we render a set of default ones, using Preact SSR.
 */
function renderPage(params) {
    const { url, theme, query, cookies, pages, providers } = params;
    return {
        csrf(skip, options, cookies) {
            if (!skip) {
                return {
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "private, no-cache, no-store",
                        Expires: "0",
                        Pragma: "no-cache",
                    },
                    body: { csrfToken: options.csrfToken },
                    cookies,
                };
            }
            options.logger.warn("csrf-disabled");
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: "",
                options: { ...options.cookies.csrfToken.options, maxAge: 0 },
            });
            return { status: 404, cookies };
        },
        providers(providers) {
            return {
                headers: { "Content-Type": "application/json" },
                body: providers.reduce((acc, { id, name, type, signinUrl, callbackUrl }) => {
                    acc[id] = { id, name, type, signinUrl, callbackUrl };
                    return acc;
                }, {}),
            };
        },
        signin(providerId, error) {
            if (providerId)
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_5__/* .UnknownAction */ .P8("Unsupported action");
            if (pages?.signIn) {
                let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: params.callbackUrl ?? "/" })}`;
                if (error)
                    signinUrl = `${signinUrl}&${new URLSearchParams({ error })}`;
                return { redirect: signinUrl, cookies };
            }
            // If we have a webauthn provider with conditional UI and
            // a simpleWebAuthnBrowserScript is defined, we need to
            // render the script in the page.
            const webauthnProvider = providers?.find((p) => p.type === "webauthn" &&
                p.enableConditionalUI &&
                !!p.simpleWebAuthnBrowserVersion);
            let simpleWebAuthnBrowserScript = "";
            if (webauthnProvider) {
                const { simpleWebAuthnBrowserVersion } = webauthnProvider;
                simpleWebAuthnBrowserScript = `<script src="https://unpkg.com/@simplewebauthn/browser@${simpleWebAuthnBrowserVersion}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
            }
            return send({
                cookies,
                theme,
                html: (0,_signin_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)({
                    csrfToken: params.csrfToken,
                    // We only want to render providers
                    providers: params.providers?.filter((provider) => 
                    // Always render oauth and email type providers
                    ["email", "oauth", "oidc"].includes(provider.type) ||
                        // Only render credentials type provider if credentials are defined
                        (provider.type === "credentials" && provider.credentials) ||
                        // Only render webauthn type provider if formFields are defined
                        (provider.type === "webauthn" && provider.formFields) ||
                        // Don't render other provider types
                        false),
                    callbackUrl: params.callbackUrl,
                    theme: params.theme,
                    error,
                    ...query,
                }),
                title: "Sign In",
                headTags: simpleWebAuthnBrowserScript,
            });
        },
        signout() {
            if (pages?.signOut)
                return { redirect: pages.signOut, cookies };
            return send({
                cookies,
                theme,
                html: (0,_signout_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({ csrfToken: params.csrfToken, url, theme }),
                title: "Sign Out",
            });
        },
        verifyRequest(props) {
            if (pages?.verifyRequest)
                return {
                    redirect: `${pages.verifyRequest}${url?.search ?? ""}`,
                    cookies,
                };
            return send({
                cookies,
                theme,
                html: (0,_verify_request_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({ url, theme, ...props }),
                title: "Verify Request",
            });
        },
        error(error) {
            if (pages?.error) {
                return {
                    redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
                    cookies,
                };
            }
            return send({
                cookies,
                theme,
                // @ts-expect-error fix error type
                ...(0,_error_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)({ url, theme, error }),
                title: "Error",
            });
        },
    };
}


/***/ }),

/***/ 488888:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ decode),
/* harmony export */   l: () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(573575);

const invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
  try {
    return (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64 */ .y4)(typeof input == "string" ? input : _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .decoder */ .D0.decode(input), !0);
  } catch (cause) {
    throw new TypeError(invalid, { cause });
  }
}
function encode(input) {
  return (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .encodeBase64 */ .WG)(typeof input == "string" ? _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .encoder */ .Rd.encode(input) : input, !0);
}



/***/ }),

/***/ 499129:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dp: () => (/* binding */ JWTInvalid),
/* harmony export */   Rb: () => (/* binding */ JOSEAlgNotAllowed),
/* harmony export */   T0: () => (/* binding */ JOSENotSupported),
/* harmony export */   _L: () => (/* binding */ JWKInvalid),
/* harmony export */   aA: () => (/* binding */ JWEInvalid),
/* harmony export */   ie: () => (/* binding */ JWTClaimValidationFailed),
/* harmony export */   n: () => (/* binding */ JWTExpired),
/* harmony export */   xO: () => (/* binding */ JWEDecryptionFailed)
/* harmony export */ });
/* unused harmony exports JOSEError, JWKSInvalid, JWKSMultipleMatchingKeys, JWKSNoMatchingKey, JWKSTimeout, JWSInvalid, JWSSignatureVerificationFailed */
class JOSEError extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message, options) {
    super(message, options), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
}
class JWTClaimValidationFailed extends JOSEError {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message, payload, claim = "unspecified", reason = "unspecified") {
    super(message, { cause: { claim, reason, payload } }), this.claim = claim, this.reason = reason, this.payload = payload;
  }
}
class JWTExpired extends JOSEError {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message, payload, claim = "unspecified", reason = "unspecified") {
    super(message, { cause: { claim, reason, payload } }), this.claim = claim, this.reason = reason, this.payload = payload;
  }
}
class JOSEAlgNotAllowed extends JOSEError {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
}
class JOSENotSupported extends JOSEError {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
}
class JWEDecryptionFailed extends JOSEError {
  static code = "ERR_JWE_DECRYPTION_FAILED";
  code = "ERR_JWE_DECRYPTION_FAILED";
  constructor(message = "decryption operation failed", options) {
    super(message, options);
  }
}
class JWEInvalid extends JOSEError {
  static code = "ERR_JWE_INVALID";
  code = "ERR_JWE_INVALID";
}
class JWSInvalid extends (/* unused pure expression or super */ null && (JOSEError)) {
  static code = (/* unused pure expression or super */ null && ("ERR_JWS_INVALID"));
  code = "ERR_JWS_INVALID";
}
class JWTInvalid extends JOSEError {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
}
class JWKInvalid extends JOSEError {
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
}
class JWKSInvalid extends (/* unused pure expression or super */ null && (JOSEError)) {
  static code = (/* unused pure expression or super */ null && ("ERR_JWKS_INVALID"));
  code = "ERR_JWKS_INVALID";
}
class JWKSNoMatchingKey extends JOSEError {
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(message = "no applicable key found in the JSON Web Key Set", options) {
    super(message, options);
  }
}
class JWKSMultipleMatchingKeys extends JOSEError {
  [Symbol.asyncIterator] = async function* () {
  };
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(message = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message, options);
  }
}
class JWKSTimeout extends JOSEError {
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(message = "request timed out", options) {
    super(message, options);
  }
}
class JWSSignatureVerificationFailed extends JOSEError {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message = "signature verification failed", options) {
    super(message, options);
  }
}



/***/ }),

/***/ 517347:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GX: () => (/* binding */ jwtClaim),
/* harmony export */   _g: () => (/* binding */ jwtClaimsSetBytes),
/* harmony export */   cE: () => (/* binding */ JWTClaimsBuilder),
/* harmony export */   k6: () => (/* binding */ validateClaimsSet)
/* harmony export */ });
/* unused harmony export secs */
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(573575);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(438805);



const epoch = (date) => Math.floor(date.getTime() / 1e3), multipliers = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
  y: 31557600
}, REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, checkFailed = "check_failed";
function invalidDuration() {
  throw new TypeError("Invalid time period format");
}
function secs(str) {
  typeof str != "string" && invalidDuration();
  const matched = REGEX.exec(str);
  (!matched || matched[4] && matched[1]) && invalidDuration();
  const value = parseFloat(matched[2]), durationSeconds = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
  return Number.isFinite(durationSeconds) || invalidDuration(), matched[1] === "-" || matched[4] === "ago" ? -durationSeconds : durationSeconds;
}
function validateInput(label, input) {
  if (!Number.isFinite(input))
    throw new TypeError(`Invalid ${label} input`);
  return input;
}
function validateStringClaim(claim, value) {
  if (typeof value != "string")
    throw new TypeError(`"${claim}" claim must be a string`);
}
function validateAudienceClaim(value) {
  if (typeof value != "string" && (!Array.isArray(value) || Array.from(value).some((member) => typeof member != "string")))
    throw new TypeError('"aud" claim must be a string or an array of strings');
}
function numericDate(value, label) {
  return typeof value == "number" ? validateInput(label, value) : value instanceof Date ? validateInput(label, epoch(value)) : epoch(/* @__PURE__ */ new Date()) + secs(value);
}
const normalizeTyp = (value) => {
  const normalized = value.toLowerCase();
  return value.includes("/") ? normalized : `application/${normalized}`;
}, checkAudiencePresence = (audPayload, audOption) => typeof audPayload == "string" ? audOption.includes(audPayload) : Array.isArray(audPayload) ? audOption.some((aud) => audPayload.includes(aud)) : !1;
function validateNumericDate(claimsSet, claim, required = !1) {
  const value = claimsSet[claim];
  if (!(value === void 0 && !required)) {
    if (typeof value != "number")
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie(`"${claim}" claim must be a number`, claimsSet, claim, "invalid");
    return value;
  }
}
function unexpectedClaim(claimsSet, claim) {
  throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie(`unexpected "${claim}" claim value`, claimsSet, claim, checkFailed);
}
function validateClaimsSet(protectedHeader, claimsSetBytes, options = {}) {
  let claimsSet;
  try {
    claimsSet = JSON.parse(_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .strictDecoder */ .u8.decode(claimsSetBytes));
  } catch (cause) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("JWT Claims Set must be a top-level JSON object", { cause });
  }
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_2__/* .isObject */ .Gv)(claimsSet))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTInvalid */ .Dp("JWT Claims Set must be a top-level JSON object");
  const { typ } = options;
  if (typ !== void 0 && (typeof protectedHeader.typ != "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ)))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie('unexpected "typ" JWT header value', claimsSet, "typ", checkFailed);
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options, presenceCheck = [...requiredClaims];
  maxTokenAge !== void 0 && presenceCheck.push("iat"), audience !== void 0 && presenceCheck.push("aud"), subject !== void 0 && presenceCheck.push("sub"), issuer !== void 0 && presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse()))
    if (!Object.hasOwn(claimsSet, claim))
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie(`missing required "${claim}" claim`, claimsSet, claim, "missing");
  issuer !== void 0 && !(Array.isArray(issuer) ? issuer : [issuer]).includes(claimsSet.iss) && unexpectedClaim(claimsSet, "iss"), subject !== void 0 && claimsSet.sub !== subject && unexpectedClaim(claimsSet, "sub"), audience !== void 0 && !checkAudiencePresence(claimsSet.aud, typeof audience == "string" ? [audience] : audience) && unexpectedClaim(claimsSet, "aud");
  const { clockTolerance } = options;
  let tolerance = 0;
  if (typeof clockTolerance == "string")
    tolerance = secs(clockTolerance);
  else if (clockTolerance !== void 0) {
    if (typeof clockTolerance != "number")
      throw new TypeError("Invalid clockTolerance option type");
    tolerance = clockTolerance;
  }
  validateInput("clockTolerance option", tolerance);
  const { currentDate } = options, now = validateInput("currentDate option", epoch(currentDate === void 0 ? /* @__PURE__ */ new Date() : currentDate)), iat = validateNumericDate(claimsSet, "iat", maxTokenAge !== void 0), nbf = validateNumericDate(claimsSet, "nbf");
  if (nbf !== void 0 && nbf > now + tolerance)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie('"nbf" claim timestamp check failed', claimsSet, "nbf", checkFailed);
  const exp = validateNumericDate(claimsSet, "exp");
  if (exp !== void 0 && exp <= now - tolerance)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTExpired */ .n('"exp" claim timestamp check failed', claimsSet, "exp", checkFailed);
  if (maxTokenAge !== void 0) {
    const age = now - iat, max = validateInput("maxTokenAge option", typeof maxTokenAge == "number" ? maxTokenAge : secs(maxTokenAge));
    if (age - tolerance > max)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTExpired */ .n('"iat" claim timestamp check failed (too far in the past)', claimsSet, "iat", checkFailed);
    if (age < -tolerance)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimValidationFailed */ .ie('"iat" claim timestamp check failed (it should be in the past)', claimsSet, "iat", checkFailed);
  }
  return claimsSet;
}
let producerClaimsSets;
function producerClaimsSet(producer) {
  return producerClaimsSets.get(producer);
}
function jwtClaimsSetBytes(producer) {
  const claimsSet = producerClaimsSet(producer);
  for (const claim of ["iat", "nbf", "exp"]) {
    const value = claimsSet[claim];
    if (typeof value == "number" && !Number.isFinite(value))
      throw new TypeError(`"${claim}" claim must be a finite number`);
  }
  return _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .encoder */ .Rd.encode(JSON.stringify(claimsSet));
}
function jwtClaim(producer, claim) {
  return producerClaimsSet(producer)[claim];
}
class JWTClaimsBuilder {
  constructor(claimsSet = {}) {
    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_2__/* .isObject */ .Gv)(claimsSet))
      throw new TypeError("JWT Claims Set MUST be an object");
    (producerClaimsSets ||= /* @__PURE__ */ new WeakMap()).set(this, structuredClone(claimsSet));
  }
  setIssuer(value) {
    return validateStringClaim("iss", value), producerClaimsSet(this).iss = value, this;
  }
  setSubject(value) {
    return validateStringClaim("sub", value), producerClaimsSet(this).sub = value, this;
  }
  setAudience(value) {
    return validateAudienceClaim(value), producerClaimsSet(this).aud = value, this;
  }
  setJti(value) {
    return validateStringClaim("jti", value), producerClaimsSet(this).jti = value, this;
  }
  setNotBefore(value) {
    return producerClaimsSet(this).nbf = numericDate(value, "setNotBefore"), this;
  }
  setExpirationTime(value) {
    return producerClaimsSet(this).exp = numericDate(value, "setExpirationTime"), this;
  }
  setIssuedAt(value) {
    const claimsSet = producerClaimsSet(this);
    return value === void 0 ? claimsSet.iat = epoch(/* @__PURE__ */ new Date()) : typeof value == "string" ? claimsSet.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value)) : claimsSet.iat = numericDate(value, "setIssuedAt"), this;
  }
}



/***/ }),

/***/ 520523:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((digest, ikm, salt, info, keylen) => {
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, salt.byteLength ? salt : new Uint8Array(hashlen))
        .update(ikm)
        .digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for (let c = 1; c <= N; c++) {
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set((0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, prk)
            .update(T.subarray(prev, start + info.byteLength + 1))
            .digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
});


/***/ }),

/***/ 558761:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CM: () => (/* binding */ ErrorPageLoop),
/* harmony export */   Hj: () => (/* binding */ InvalidProvider),
/* harmony export */   Lx: () => (/* binding */ UnsupportedStrategy),
/* harmony export */   OZ: () => (/* binding */ MissingAdapter),
/* harmony export */   Oy: () => (/* binding */ AccessDenied),
/* harmony export */   P8: () => (/* binding */ UnknownAction),
/* harmony export */   PM: () => (/* binding */ EventError),
/* harmony export */   QU: () => (/* binding */ SessionTokenError),
/* harmony export */   SW: () => (/* binding */ JWTSessionError),
/* harmony export */   WS: () => (/* binding */ AccountNotLinked),
/* harmony export */   XP: () => (/* binding */ OAuthAccountNotLinked),
/* harmony export */   _2: () => (/* binding */ isClientError),
/* harmony export */   _z: () => (/* binding */ OAuthProfileParseError),
/* harmony export */   dy: () => (/* binding */ MissingCSRF),
/* harmony export */   eH: () => (/* binding */ SignOutError),
/* harmony export */   gs: () => (/* binding */ InvalidEndpoints),
/* harmony export */   i8: () => (/* binding */ MissingAdapterMethods),
/* harmony export */   jo: () => (/* binding */ MissingSecret),
/* harmony export */   k9: () => (/* binding */ InvalidCheck),
/* harmony export */   lR: () => (/* binding */ AuthError),
/* harmony export */   me: () => (/* binding */ InvalidCallbackUrl),
/* harmony export */   nd: () => (/* binding */ MissingWebAuthnAutocomplete),
/* harmony export */   o6: () => (/* binding */ Verification),
/* harmony export */   om: () => (/* binding */ AdapterError),
/* harmony export */   rk: () => (/* binding */ OAuthCallbackError),
/* harmony export */   s5: () => (/* binding */ DuplicateConditionalUI),
/* harmony export */   t3: () => (/* binding */ CallbackRouteError),
/* harmony export */   tP: () => (/* binding */ UntrustedHost),
/* harmony export */   u$: () => (/* binding */ MissingAuthorize),
/* harmony export */   w2: () => (/* binding */ WebAuthnVerificationError),
/* harmony export */   xm: () => (/* binding */ ExperimentalFeatureNotEnabled),
/* harmony export */   xz: () => (/* binding */ CredentialsSignin)
/* harmony export */ });
/* unused harmony exports SignInError, OAuthSignInError, EmailSignInError */
/**
 * Base error class for all Auth.js errors.
 * It's optimized to be printed in the server logs in a nicely formatted way
 * via the [`logger.error`](https://authjs.dev/reference/core#logger) option.
 * @noInheritDoc
 */
class AuthError extends Error {
    /** @internal */
    constructor(message, errorOptions) {
        if (message instanceof Error) {
            super(undefined, {
                cause: { err: message, ...message.cause, ...errorOptions },
            });
        }
        else if (typeof message === "string") {
            if (errorOptions instanceof Error) {
                errorOptions = { err: errorOptions, ...errorOptions.cause };
            }
            super(message, errorOptions);
        }
        else {
            super(undefined, message);
        }
        this.name = this.constructor.name;
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.type = this.constructor.type ?? "AuthError";
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.kind = this.constructor.kind ?? "error";
        Error.captureStackTrace?.(this, this.constructor);
        const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
        this.message += `${this.message ? ". " : ""}Read more at ${url}`;
    }
}
/**
 * Thrown when the user's sign-in attempt failed.
 * @noInheritDoc
 */
class SignInError extends AuthError {
}
/** @internal */
SignInError.kind = "signIn";
/**
 * One of the database [`Adapter` methods](https://authjs.dev/reference/core/adapters#methods)
 * failed during execution.
 *
 * :::tip
 * If `debug: true` is set, you can check out `[auth][debug]` in the logs to learn more about the failed adapter method execution.
 * @example
 * ```sh
 * [auth][debug]: adapter_getUserByEmail
 * { "args": [undefined] }
 * ```
 * :::
 * @noInheritDoc
 */
class AdapterError extends AuthError {
}
AdapterError.type = "AdapterError";
/**
 * Thrown when the execution of the [`signIn` callback](https://authjs.dev/reference/core/types#signin) fails
 * or if it returns `false`.
 * @noInheritDoc
 */
class AccessDenied extends AuthError {
}
AccessDenied.type = "AccessDenied";
/**
 * This error occurs when the user cannot finish login.
 * Depending on the provider type, this could have happened for multiple reasons.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 *
 * For an [OAuth provider](https://authjs.dev/getting-started/authentication/oauth), possible causes are:
 * - The user denied access to the application
 * - There was an error parsing the OAuth Profile:
 *   Check out the provider's `profile` or `userinfo.request` method to make sure
 *   it correctly fetches the user's profile.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * For an [Email provider](https://authjs.dev/getting-started/authentication/email), possible causes are:
 * - The provided email/token combination was invalid/missing:
 *   Check if the provider's `sendVerificationRequest` method correctly sends the email.
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 *
 * For a [Credentials provider](https://authjs.dev/getting-started/authentication/credentials), possible causes are:
 * - The `authorize` method threw an uncaught error:
 *   Check the provider's `authorize` method.
 * - The `signIn` or `jwt` callback methods threw an uncaught error:
 *   Check the callback method implementations.
 *
 * :::tip
 * Check out `[auth][cause]` in the error message for more details.
 * It will show the original stack trace.
 * :::
 * @noInheritDoc
 */
class CallbackRouteError extends AuthError {
}
CallbackRouteError.type = "CallbackRouteError";
/**
 * Thrown when Auth.js is misconfigured and accidentally tried to require authentication on a custom error page.
 * To prevent an infinite loop, Auth.js will instead render its default error page.
 *
 * To fix this, make sure that the `error` page does not require authentication.
 *
 * Learn more at [Guide: Error pages](https://authjs.dev/guides/pages/error)
 * @noInheritDoc
 */
class ErrorPageLoop extends AuthError {
}
ErrorPageLoop.type = "ErrorPageLoop";
/**
 * One of the [`events` methods](https://authjs.dev/reference/core/types#eventcallbacks)
 * failed during execution.
 *
 * Make sure that the `events` methods are implemented correctly and uncaught errors are handled.
 *
 * Learn more at [`events`](https://authjs.dev/reference/core/types#eventcallbacks)
 * @noInheritDoc
 */
class EventError extends AuthError {
}
EventError.type = "EventError";
/**
 * Thrown when Auth.js is unable to verify a `callbackUrl` value.
 * The browser either disabled cookies or the `callbackUrl` is not a valid URL.
 *
 * Somebody might have tried to manipulate the callback URL that Auth.js uses to redirect the user back to the configured `callbackUrl`/page.
 * This could be a malicious hacker trying to redirect the user to a phishing site.
 * To prevent this, Auth.js checks if the callback URL is valid and throws this error if it is not.
 *
 * There is no action required, but it might be an indicator that somebody is trying to attack your application.
 * @noInheritDoc
 */
class InvalidCallbackUrl extends AuthError {
}
InvalidCallbackUrl.type = "InvalidCallbackUrl";
/**
 * Can be thrown from the `authorize` callback of the Credentials provider.
 * When an error occurs during the `authorize` callback, two things can happen:
 * 1. The user is redirected to the signin page, with `error=CredentialsSignin&code=credentials` in the URL. `code` is configurable.
 * 2. If you throw this error in a framework that handles form actions server-side, this error is thrown, instead of redirecting the user, so you'll need to handle.
 * @noInheritDoc
 */
class CredentialsSignin extends SignInError {
    constructor() {
        super(...arguments);
        /**
         * The error code that is set in the `code` query parameter of the redirect URL.
         *
         *
         * ⚠ NOTE: This property is going to be included in the URL, so make sure it does not hint at sensitive errors.
         *
         * The full error is always logged on the server, if you need to debug.
         *
         * Generally, we don't recommend hinting specifically if the user had either a wrong username or password specifically,
         * try rather something like "Invalid credentials".
         */
        this.code = "credentials";
    }
}
CredentialsSignin.type = "CredentialsSignin";
/**
 * One of the configured OAuth or OIDC providers is missing the `authorization`, `token` or `userinfo`, or `issuer` configuration.
 * To perform OAuth or OIDC sign in, at least one of these endpoints is required.
 *
 * Learn more at [`OAuth2Config`](https://authjs.dev/reference/core/providers#oauth2configprofile) or [Guide: OAuth Provider](https://authjs.dev/guides/configuring-oauth-providers)
 * @noInheritDoc
 */
class InvalidEndpoints extends AuthError {
}
InvalidEndpoints.type = "InvalidEndpoints";
/**
 * Thrown when a PKCE, state or nonce OAuth check could not be performed.
 * This could happen if the OAuth provider is configured incorrectly or if the browser is blocking cookies.
 *
 * Learn more at [`checks`](https://authjs.dev/reference/core/providers#checks)
 * @noInheritDoc
 */
class InvalidCheck extends AuthError {
}
InvalidCheck.type = "InvalidCheck";
/**
 * Logged on the server when Auth.js could not decode or encode a JWT-based (`strategy: "jwt"`) session.
 *
 * Possible causes are either a misconfigured `secret` or a malformed JWT or `encode/decode` methods.
 *
 * :::note
 * When this error is logged, the session cookie is destroyed.
 * :::
 *
 * Learn more at [`secret`](https://authjs.dev/reference/core#secret), [`jwt.encode`](https://authjs.dev/reference/core/jwt#encode-1) or [`jwt.decode`](https://authjs.dev/reference/core/jwt#decode-2) for more information.
 * @noInheritDoc
 */
class JWTSessionError extends AuthError {
}
JWTSessionError.type = "JWTSessionError";
/**
 * Thrown if Auth.js is misconfigured. This could happen if you configured an Email provider but did not set up a database adapter,
 * or tried using a `strategy: "database"` session without a database adapter.
 * In both cases, make sure you either remove the configuration or add the missing adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database), [Email provider](https://authjs.dev/getting-started/authentication/email) or [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database-session)
 * @noInheritDoc
 */
class MissingAdapter extends AuthError {
}
MissingAdapter.type = "MissingAdapter";
/**
 * Thrown similarily to [`MissingAdapter`](https://authjs.dev/reference/core/errors#missingadapter), but only some required methods were missing.
 *
 * Make sure you either remove the configuration or add the missing methods to the adapter.
 *
 * Learn more at [Database Adapters](https://authjs.dev/getting-started/database)
 * @noInheritDoc
 */
class MissingAdapterMethods extends AuthError {
}
MissingAdapterMethods.type = "MissingAdapterMethods";
/**
 * Thrown when a Credentials provider is missing the `authorize` configuration.
 * To perform credentials sign in, the `authorize` method is required.
 *
 * Learn more at [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 * @noInheritDoc
 */
class MissingAuthorize extends AuthError {
}
MissingAuthorize.type = "MissingAuthorize";
/**
 * Auth.js requires a secret or multiple secrets to be set, but none was not found. This is used to encrypt cookies, JWTs and other sensitive data.
 *
 * :::note
 * If you are using a framework like Next.js, we try to automatically infer the secret from the `AUTH_SECRET`, `AUTH_SECRET_1`, etc. environment variables.
 * Alternatively, you can also explicitly set the [`AuthConfig.secret`](https://authjs.dev/reference/core#secret) option.
 * :::
 *
 *
 * :::tip
 * To generate a random string, you can use the Auth.js CLI: `npx auth secret`
 * :::
 * @noInheritDoc
 */
class MissingSecret extends AuthError {
}
MissingSecret.type = "MissingSecret";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an OAuth account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link OAuth accounts to existing accounts if the user is not signed in.
 *
 * :::tip
 * If you trust the OAuth provider to have verified the user's email address,
 * you can enable automatic account linking by setting [`allowDangerousEmailAccountLinking: true`](https://authjs.dev/reference/core/providers#allowdangerousemailaccountlinking)
 * in the provider configuration.
 * :::
 * @noInheritDoc
 */
class OAuthAccountNotLinked extends SignInError {
}
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
/**
 * Thrown when an OAuth provider returns an error during the sign in process.
 * This could happen for example if the user denied access to the application or there was a configuration error.
 *
 * For a full list of possible reasons, check out the specification [Authorization Code Grant: Error Response](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
 * @noInheritDoc
 */
class OAuthCallbackError extends SignInError {
}
OAuthCallbackError.type = "OAuthCallbackError";
/**
 * This error occurs during an OAuth sign in attempt when the provider's
 * response could not be parsed. This could for example happen if the provider's API
 * changed, or the [`OAuth2Config.profile`](https://authjs.dev/reference/core/providers#oauth2configprofile) method is not implemented correctly.
 * @noInheritDoc
 */
class OAuthProfileParseError extends AuthError {
}
OAuthProfileParseError.type = "OAuthProfileParseError";
/**
 * Logged on the server when Auth.js could not retrieve a session from the database (`strategy: "database"`).
 *
 * The database adapter might be misconfigured or the database is not reachable.
 *
 * Learn more at [Concept: Database session strategy](https://authjs.dev/concepts/session-strategies#database)
 * @noInheritDoc
 */
class SessionTokenError extends AuthError {
}
SessionTokenError.type = "SessionTokenError";
/**
 * Happens when login by [OAuth](https://authjs.dev/getting-started/authentication/oauth) could not be started.
 *
 * Possible causes are:
 * - The Authorization Server is not compliant with the [OAuth 2.0](https://www.ietf.org/rfc/rfc6749.html) or the [OIDC](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *   Check the details in the error message.
 *
 * :::tip
 * Check out `[auth][details]` in the logs to know which provider failed.
 * @example
 * ```sh
 * [auth][details]: { "provider": "github" }
 * ```
 * :::
 * @noInheritDoc
 */
class OAuthSignInError extends SignInError {
}
OAuthSignInError.type = "OAuthSignInError";
/**
 * Happens when the login by an [Email provider](https://authjs.dev/getting-started/authentication/email) could not be started.
 *
 * Possible causes are:
 * - The email sent from the client is invalid, could not be normalized by [`EmailConfig.normalizeIdentifier`](https://authjs.dev/reference/core/providers/email#normalizeidentifier)
 * - The provided email/token combination has expired:
 *   Ask the user to log in again.
 * - There was an error with the database:
 *   Check the database logs.
 * @noInheritDoc
 */
class EmailSignInError extends SignInError {
}
EmailSignInError.type = "EmailSignInError";
/**
 * Represents an error that occurs during the sign-out process. This error
 * is logged when there are issues in terminating a user's session, either
 * by failing to delete the session from the database (in database session
 * strategies) or encountering issues during other parts of the sign-out
 * process, such as emitting sign-out events or clearing session cookies.
 *
 * The session cookie(s) are emptied even if this error is logged.
 * @noInheritDoc
 */
class SignOutError extends AuthError {
}
SignOutError.type = "SignOutError";
/**
 * Auth.js was requested to handle an operation that it does not support.
 *
 * See [`AuthAction`](https://authjs.dev/reference/core/types#authaction) for the supported actions.
 * @noInheritDoc
 */
class UnknownAction extends AuthError {
}
UnknownAction.type = "UnknownAction";
/**
 * Thrown when a Credentials provider is present but the JWT strategy (`strategy: "jwt"`) is not enabled.
 *
 * Learn more at [`strategy`](https://authjs.dev/reference/core#strategy) or [Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
 * @noInheritDoc
 */
class UnsupportedStrategy extends AuthError {
}
UnsupportedStrategy.type = "UnsupportedStrategy";
/**
 * Thrown when an endpoint was incorrectly called without a provider, or with an unsupported provider.
 * @noInheritDoc
 */
class InvalidProvider extends AuthError {
}
InvalidProvider.type = "InvalidProvider";
/**
 * Thrown when the `trustHost` option was not set to `true`.
 *
 * Auth.js requires the `trustHost` option to be set to `true` since it's relying on the request headers' `host` value.
 *
 * :::note
 * Official Auth.js libraries might attempt to automatically set the `trustHost` option to `true` if the request is coming from a trusted host on a trusted platform.
 * :::
 *
 * Learn more at [`trustHost`](https://authjs.dev/reference/core#trusthost) or [Guide: Deployment](https://authjs.dev/getting-started/deployment)
 * @noInheritDoc
 */
class UntrustedHost extends AuthError {
}
UntrustedHost.type = "UntrustedHost";
/**
 * The user's email/token combination was invalid.
 * This could be because the email/token combination was not found in the database,
 * or because the token has expired. Ask the user to log in again.
 * @noInheritDoc
 */
class Verification extends AuthError {
}
Verification.type = "Verification";
/**
 * Error for missing CSRF tokens in client-side actions (`signIn`, `signOut`, `useSession#update`).
 * Thrown when actions lack the double submit cookie, essential for CSRF protection.
 *
 * CSRF ([Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf))
 * is an attack leveraging authenticated user credentials for unauthorized actions.
 *
 * Double submit cookie pattern, a CSRF defense, requires matching values in a cookie
 * and request parameter. More on this at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/CSRF).
 * @noInheritDoc
 */
class MissingCSRF extends SignInError {
}
MissingCSRF.type = "MissingCSRF";
const clientErrors = new Set([
    "CredentialsSignin",
    "OAuthAccountNotLinked",
    "OAuthCallbackError",
    "AccessDenied",
    "Verification",
    "MissingCSRF",
    "AccountNotLinked",
    "WebAuthnVerificationError",
]);
/**
 * Used to only allow sending a certain subset of errors to the client.
 * Errors are always logged on the server, but to prevent leaking sensitive information,
 * only a subset of errors are sent to the client as-is.
 * @internal
 */
function isClientError(error) {
    if (error instanceof AuthError)
        return clientErrors.has(error.type);
    return false;
}
/**
 * Thrown when multiple providers have `enableConditionalUI` set to `true`.
 * Only one provider can have this option enabled at a time.
 * @noInheritDoc
 */
class DuplicateConditionalUI extends AuthError {
}
DuplicateConditionalUI.type = "DuplicateConditionalUI";
/**
 * Thrown when a WebAuthn provider has `enableConditionalUI` set to `true` but no formField has `webauthn` in its autocomplete param.
 *
 * The `webauthn` autocomplete param is required for conditional UI to work.
 * @noInheritDoc
 */
class MissingWebAuthnAutocomplete extends AuthError {
}
MissingWebAuthnAutocomplete.type = "MissingWebAuthnAutocomplete";
/**
 * Thrown when a WebAuthn provider fails to verify a client response.
 * @noInheritDoc
 */
class WebAuthnVerificationError extends AuthError {
}
WebAuthnVerificationError.type = "WebAuthnVerificationError";
/**
 * Thrown when an Email address is already associated with an account
 * but the user is trying an account that is not linked to it.
 *
 * For security reasons, Auth.js does not automatically link accounts to existing accounts if the user is not signed in.
 * @noInheritDoc
 */
class AccountNotLinked extends SignInError {
}
AccountNotLinked.type = "AccountNotLinked";
/**
 * Thrown when an experimental feature is used but not enabled.
 * @noInheritDoc
 */
class ExperimentalFeatureNotEnabled extends AuthError {
}
ExperimentalFeatureNotEnabled.type = "ExperimentalFeatureNotEnabled";


/***/ }),

/***/ 566610:
/***/ ((module, exports, __webpack_require__) => {


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
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _readonlyurlsearchparams = __webpack_require__(710381);
const _redirect = __webpack_require__(32171);
const _notfound = __webpack_require__(852283);
const _forbidden = __webpack_require__(292606);
const _unauthorized = __webpack_require__(444057);
const _unstablerethrow = __webpack_require__(298621);
function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
const RedirectType = {
    push: 'push',
    replace: 'replace'
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map


/***/ }),

/***/ 573575:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D0: () => (/* binding */ decoder),
/* harmony export */   Rd: () => (/* binding */ encoder),
/* harmony export */   VS: () => (/* binding */ uint32be),
/* harmony export */   WG: () => (/* binding */ encodeBase64),
/* harmony export */   br: () => (/* binding */ digest),
/* harmony export */   lF: () => (/* binding */ encode),
/* harmony export */   mx: () => (/* binding */ uint64be),
/* harmony export */   u8: () => (/* binding */ strictDecoder),
/* harmony export */   xW: () => (/* binding */ concat),
/* harmony export */   y4: () => (/* binding */ decodeBase64)
/* harmony export */ });
const encoder = new TextEncoder(), decoder = new TextDecoder(), strictDecoder = new TextDecoder("utf-8", { fatal: !0 }), UINT32_RANGE = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0), buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers)
    buf.set(buffer, i), i += buffer.length;
  return buf;
}
function writeUInt32BE(buf, value, offset) {
  if (value < 0 || value >= UINT32_RANGE)
    throw new RangeError(`value must be >= 0 and <= ${UINT32_RANGE - 1}. Received ${value}`);
  buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
}
function uint64be(value) {
  const high = Math.floor(value / UINT32_RANGE), low = value % UINT32_RANGE, buf = new Uint8Array(8);
  return writeUInt32BE(buf, high, 0), writeUInt32BE(buf, low, 4), buf;
}
function uint32be(value) {
  const buf = new Uint8Array(4);
  return writeUInt32BE(buf, value), buf;
}
const NON_ASCII = /[^\x00-\x7f]/;
function encode(string) {
  if (typeof string == "string" && string.length >= 128) {
    if (NON_ASCII.test(string))
      throw new TypeError("non-ASCII string encountered in encode()");
    return encoder.encode(string);
  }
  const bytes = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    if (code > 127)
      throw new TypeError("non-ASCII string encountered in encode()");
    bytes[i] = code;
  }
  return bytes;
}
function encodeBase64(input, url = !1) {
  if (Uint8Array.prototype.toBase64)
    return input.toBase64({ alphabet: url ? "base64url" : "base64", omitPadding: url });
  const CHUNK_SIZE = 32768, arr = [];
  for (let i = 0; i < input.length; i += CHUNK_SIZE)
    arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
  const encoded = btoa(arr.join(""));
  return url ? encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : encoded;
}
function decodeBase64(encoded, url = !1) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(encoded, { alphabet: url ? "base64url" : "base64" });
  if (url) {
    if (encoded.includes("+") || encoded.includes("/"))
      throw new TypeError("Invalid base64url");
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  }
  const binary = atob(encoded), bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++)
    bytes[i] = binary.charCodeAt(i);
  return bytes;
}
async function digest(algorithm, data) {
  const subtleDigest = `SHA-${algorithm.slice(-3)}`;
  return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}



/***/ }),

/***/ 579900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bc: () => (/* binding */ compress),
/* harmony export */   mF: () => (/* binding */ decompress),
/* harmony export */   q9: () => (/* binding */ validateZip)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(573575);


function validateZip(joseHeader, protectedHeader) {
  if (joseHeader.zip !== void 0 && joseHeader.zip !== "DEF")
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JOSENotSupported */ .T0('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
  if (joseHeader.zip !== void 0 && !protectedHeader?.zip)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
}
function supported(name) {
  if (typeof globalThis[name] > "u")
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JOSENotSupported */ .T0(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${name} API.`);
}
async function transform(stream, input, maxLength = 1 / 0) {
  const writer = stream.writable.getWriter();
  writer.write(input).catch(() => {
  }), writer.close().catch(() => {
  });
  const chunks = [];
  let length = 0;
  const reader = stream.readable.getReader();
  for (; ; ) {
    const { value, done } = await reader.read();
    if (done)
      break;
    if (chunks.push(value), length += value.byteLength, maxLength !== 1 / 0 && length > maxLength)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWEInvalid */ .aA("Decompressed plaintext exceeded the configured limit");
  }
  return (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .concat */ .xW)(...chunks);
}
async function compress(input) {
  return supported("CompressionStream"), transform(new CompressionStream("deflate-raw"), input);
}
async function decompress(input, maxLength) {
  return supported("DecompressionStream"), transform(new DecompressionStream("deflate-raw"), input, maxLength);
}



/***/ }),

/***/ 601508:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ jwtDecrypt)
/* harmony export */ });
/* harmony import */ var _lib_jwe_decrypt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(879295);
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(517347);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(499129);



async function jwtDecrypt(jwt, key, options) {
  const { plaintext, ...result } = await (0,_lib_jwe_decrypt_js__WEBPACK_IMPORTED_MODULE_0__/* .decryptCompact */ .zE)(jwt, (0,_lib_jwe_decrypt_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareDecrypt */ .hi)(options), key), { protectedHeader } = result, payload = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_1__/* .validateClaimsSet */ .k6)(protectedHeader, plaintext, options);
  for (const claim of ["iss", "sub", "aud"])
    if (protectedHeader[claim] !== void 0 && (claim === "aud" ? JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud) : protectedHeader[claim] !== payload[claim]))
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JWTClaimValidationFailed */ .ie(`replicated "${claim}" claim header parameter mismatch`, payload, claim, "mismatch");
  return { payload, ...result };
}



/***/ }),

/***/ 613862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ getAuthorizationUrl)
/* harmony export */ });
/* harmony import */ var _callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134033);
/* harmony import */ var oauth4webapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(932384);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(399389);



/**
 * Generates an authorization/request token URL.
 *
 * [OAuth 2](https://www.oauth.com/oauth2-servers/authorization/the-authorization-request/)
 */
async function getAuthorizationUrl(query, options) {
    const { logger, provider } = options;
    let url = provider.authorization?.url;
    let as;
    // Falls back to authjs.dev if the user only passed params
    if (!url || url.host === "authjs.dev") {
        // If url is undefined, we assume that issuer is always defined
        // We check this in assert.ts
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .discoveryRequest */ .CN(issuer, {
            [oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .customFetch */ .A6]: provider[_symbols_js__WEBPACK_IMPORTED_MODULE_1__/* .customFetch */ .A6],
            // TODO: move away from allowing insecure HTTP requests
            [oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .allowInsecureRequests */ .cm]: true,
        });
        const as = await oauth4webapi__WEBPACK_IMPORTED_MODULE_2__/* .processDiscoveryResponse */ .vA(issuer, discoveryResponse)
            .catch((error) => {
            if (!(error instanceof TypeError) || error.message !== "Invalid URL")
                throw error;
            throw new TypeError(`Discovery request responded with an invalid issuer. expected: ${issuer}`);
        });
        if (!as.authorization_endpoint) {
            throw new TypeError("Authorization server did not provide an authorization endpoint.");
        }
        url = new URL(as.authorization_endpoint);
    }
    const authParams = url.searchParams;
    let redirect_uri = provider.callbackUrl;
    let data;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
        data = provider.callbackUrl;
        logger.debug("using redirect proxy", { redirect_uri, data });
    }
    const params = Object.assign({
        response_type: "code",
        // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
        client_id: provider.clientId,
        redirect_uri,
        // @ts-expect-error TODO:
        ...provider.authorization?.params,
    }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
    for (const k in params)
        authParams.set(k, params[k]);
    const cookies = [];
    if (
    // Otherwise "POST /redirect_uri" wouldn't include the cookies
    provider.authorization?.url.searchParams.get("response_mode") ===
        "form_post") {
        options.cookies.state.options.sameSite = "none";
        options.cookies.state.options.secure = true;
        options.cookies.nonce.options.sameSite = "none";
        options.cookies.nonce.options.secure = true;
    }
    const state = await _callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .wk.create(options, data);
    if (state) {
        authParams.set("state", state.value);
        cookies.push(state.cookie);
    }
    if (provider.checks?.includes("pkce")) {
        if (as && !as.code_challenge_methods_supported?.includes("S256")) {
            // We assume S256 PKCE support, if the server does not advertise that,
            // a random `nonce` must be used for CSRF protection.
            if (provider.type === "oidc")
                provider.checks = ["nonce"];
        }
        else {
            const { value, cookie } = await _callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_0__/* .pkce */ .aC.create(options);
            authParams.set("code_challenge", value);
            authParams.set("code_challenge_method", "S256");
            cookies.push(cookie);
        }
    }
    const nonce = await _callback_oauth_checks_js__WEBPACK_IMPORTED_MODULE_0__/* .nonce */ .KU.create(options);
    if (nonce) {
        authParams.set("nonce", nonce.value);
        cookies.push(nonce.cookie);
    }
    // TODO: This does not work in normalizeOAuth because authorization endpoint can come from discovery
    // Need to make normalizeOAuth async
    if (provider.type === "oidc" && !url.searchParams.has("scope")) {
        url.searchParams.set("scope", "openid profile email");
    }
    logger.debug("authorization url is ready", { url, cookies, provider });
    return { redirect: url.toString(), cookies };
}


/***/ }),

/***/ 625606:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ initAuth)
/* harmony export */ });
/* harmony import */ var _auth_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311024);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(265573);
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(945592);
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(903993);

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field


async function getSession(headers, config) {
    const url = (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .createActionURL */ .ot)("session", 
    // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const request = new Request(url, {
        headers: { cookie: headers.get("cookie") ?? "" },
    });
    return (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)(request, {
        ...config,
        callbacks: {
            ...config.callbacks,
            // Since we are server-side, we don't need to filter out the session data
            // See https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
            // TODO: Taint the session data to prevent accidental leakage to the client
            // https://react.dev/reference/react/experimental_taintObjectReference
            async session(...args) {
                const session = 
                // If the user defined a custom session callback, use that instead
                (await config.callbacks?.session?.(...args)) ?? {
                    ...args[0].session,
                    expires: args[0].session.expires?.toISOString?.() ??
                        args[0].session.expires,
                };
                const user = args[0].user ?? args[0].token;
                return { user, ...session };
            },
        },
    });
}
/**
 * Reads the session payload from a `getSession()` response.
 *
 * On any non-OK response (e.g. a `500` returned by `@auth/core` when the
 * provider configuration is invalid), the body is an error object such as
 * `{ message: "There was a problem with the server configuration..." }`.
 * Returning that object as the session would make truthiness checks like
 * `!!auth` pass for everyone, failing open. Treat any non-OK response as
 * "no session" so auth checks fail closed.
 */
async function parseSessionResponse(response) {
    if (!response.ok)
        return null;
    return (await response.json());
}
function isReqWrapper(arg) {
    return typeof arg === "function";
}
function initAuth(config, onLazyLoad // To set the default env vars
) {
    if (typeof config === "function") {
        return async (...args) => {
            if (!args.length) {
                // React Server Components
                const _headers = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)();
                const _config = await config(undefined); // Review: Should we pass headers() here instead?
                onLazyLoad?.(_config);
                return getSession(_headers, _config).then(parseSessionResponse);
            }
            if (args[0] instanceof Request) {
                // middleware.ts inline
                // export { auth as default } from "auth"
                const req = args[0];
                const ev = args[1];
                const _config = await config(req);
                onLazyLoad?.(_config);
                // args[0] is supposed to be NextRequest but the instanceof check is failing.
                return handleAuth([req, ev], _config);
            }
            if (isReqWrapper(args[0])) {
                // middleware.ts wrapper/route.ts
                // import { auth } from "auth"
                // export default auth((req) => { console.log(req.auth) }})
                const userMiddlewareOrRoute = args[0];
                return async (...args) => {
                    const _config = await config(args[0]);
                    onLazyLoad?.(_config);
                    return handleAuth(args, _config, userMiddlewareOrRoute);
                };
            }
            // API Routes, getServerSideProps
            const request = "req" in args[0] ? args[0].req : args[0];
            const response = "res" in args[0] ? args[0].res : args[1];
            const _config = await config(request);
            onLazyLoad?.(_config);
            // @ts-expect-error -- request is NextRequest
            return getSession(new Headers(request.headers), _config).then(async (authResponse) => {
                const auth = await parseSessionResponse(authResponse);
                for (const cookie of authResponse.headers.getSetCookie())
                    if ("headers" in response)
                        response.headers.append("set-cookie", cookie);
                    else
                        response.appendHeader("set-cookie", cookie);
                return auth;
            });
        };
    }
    return (...args) => {
        if (!args.length) {
            // React Server Components
            return Promise.resolve((0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)()).then((h) => getSession(h, config).then(parseSessionResponse));
        }
        if (args[0] instanceof Request) {
            // middleware.ts inline
            // export { auth as default } from "auth"
            const req = args[0];
            const ev = args[1];
            return handleAuth([req, ev], config);
        }
        if (isReqWrapper(args[0])) {
            // middleware.ts wrapper/route.ts
            // import { auth } from "auth"
            // export default auth((req) => { console.log(req.auth) }})
            const userMiddlewareOrRoute = args[0];
            return async (...args) => {
                return handleAuth(args, config, userMiddlewareOrRoute).then((res) => {
                    return res;
                });
            };
        }
        // API Routes, getServerSideProps
        const request = "req" in args[0] ? args[0].req : args[0];
        const response = "res" in args[0] ? args[0].res : args[1];
        return getSession(
        // @ts-expect-error
        new Headers(request.headers), config).then(async (authResponse) => {
            const auth = await parseSessionResponse(authResponse);
            for (const cookie of authResponse.headers.getSetCookie())
                if ("headers" in response)
                    response.headers.append("set-cookie", cookie);
                else
                    response.appendHeader("set-cookie", cookie);
            return auth;
        });
    };
}
async function handleAuth(args, config, userMiddlewareOrRoute) {
    const request = (0,_env_js__WEBPACK_IMPORTED_MODULE_3__/* .reqWithEnvURL */ .z)(args[0]);
    const sessionResponse = await getSession(request.headers, config);
    const auth = await parseSessionResponse(sessionResponse);
    let authorized = true;
    if (config.callbacks?.authorized) {
        authorized = await config.callbacks.authorized({ request, auth });
    }
    let response = next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.next?.();
    if (authorized instanceof Response) {
        // User returned a custom response, like redirecting to a page or 401, respect it
        response = authorized;
        const redirect = authorized.headers.get("Location");
        const { pathname } = request.nextUrl;
        // If the user is redirecting to the same NextAuth.js action path as the current request,
        // don't allow the redirect to prevent an infinite loop
        if (redirect &&
            isSameAuthAction(pathname, new URL(redirect).pathname, config)) {
            authorized = true;
        }
    }
    else if (userMiddlewareOrRoute) {
        // Execute user's middleware/handler with the augmented request
        const augmentedReq = request;
        augmentedReq.auth = auth;
        response =
            (await userMiddlewareOrRoute(augmentedReq, args[1])) ??
                next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.next();
    }
    else if (!authorized) {
        const signInPage = config.pages?.signIn ?? `${config.basePath}/signin`;
        if (request.nextUrl.pathname !== signInPage) {
            // Redirect to signin page by default if not authorized
            const signInUrl = request.nextUrl.clone();
            signInUrl.pathname = signInPage;
            signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            response = next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.redirect(signInUrl);
        }
    }
    const finalResponse = new Response(response?.body, response);
    // Preserve cookies from the session response
    for (const cookie of sessionResponse.headers.getSetCookie())
        finalResponse.headers.append("set-cookie", cookie);
    return finalResponse;
}
function isSameAuthAction(requestPath, redirectPath, config) {
    const action = redirectPath.replace(`${requestPath}/`, "");
    const pages = Object.values(config.pages ?? {});
    return ((actions.has(action) || pages.includes(redirectPath)) &&
        redirectPath === requestPath);
}
const actions = new Set([
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error",
]);


/***/ }),

/***/ 647242:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ NextAuth)
/* harmony export */ });
/* harmony import */ var _auth_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311024);
/* harmony import */ var _lib_env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(903993);
/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(625606);
/* harmony import */ var _lib_actions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(775961);
/* harmony import */ var _auth_core_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(558761);
/**
 * _If you are looking to migrate from v4, visit the [Upgrade Guide (v5)](https://authjs.dev/getting-started/migrating-to-v5)._
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install next-auth@beta
 * ```
 *
 * ## Environment variable inference
 *
 * `NEXTAUTH_URL` and `NEXTAUTH_SECRET` have been inferred since v4.
 *
 * Since NextAuth.js v5 can also automatically infer environment variables that are prefixed with `AUTH_`.
 *
 * For example `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` will be used as the `clientId` and `clientSecret` options for the GitHub provider.
 *
 * :::tip
 * The environment variable name inferring has the following format for OAuth providers: `AUTH_{PROVIDER}_{ID|SECRET}`.
 *
 * `PROVIDER` is the uppercase snake case version of the provider's id, followed by either `ID` or `SECRET` respectively.
 * :::
 *
 * `AUTH_SECRET` and `AUTH_URL` are also aliased for `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for consistency.
 *
 * To add social login to your app, the configuration becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth({ providers: [ GitHub ] })
 * ```
 *
 * And the `.env.local` file:
 *
 * ```sh title=".env.local"
 * AUTH_GITHUB_ID=...
 * AUTH_GITHUB_SECRET=...
 * AUTH_SECRET=...
 * ```
 *
 * :::tip
 * In production, `AUTH_SECRET` is a required environment variable - if not set, NextAuth.js will throw an error. See [MissingSecretError](https://authjs.dev/reference/core/errors#missingsecret) for more details.
 * :::
 *
 * If you need to override the default values for a provider, you can still call it as a function `GitHub({...})` as before.
 *
 * ## Lazy initialization
 * You can also initialize NextAuth.js lazily (previously known as advanced intialization), which allows you to access the request context in the configuration in some cases, like Route Handlers, Middleware, API Routes or `getServerSideProps`.
 * The above example becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth(req => {
 *  if (req) {
 *   console.log(req) // do something with the request
 *  }
 *  return { providers: [ GitHub ] }
 * })
 * ```
 *
 * :::tip
 * This is useful if you want to customize the configuration based on the request, for example, to add a different provider in staging/dev environments.
 * :::
 *
 * @module next-auth
 */






/**
 *  Initialize NextAuth.js.
 *
 *  @example
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "@auth/core/providers/github"
 *
 * export const { handlers, auth } = NextAuth({ providers: [GitHub] })
 * ```
 *
 * Lazy initialization:
 *
 * @example
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "@auth/core/providers/github"
 *
 * export const { handlers, auth } = NextAuth(async (req) => {
 *   console.log(req) // do something with the request
 *   return {
 *     providers: [GitHub],
 *   },
 * })
 * ```
 */
function NextAuth(config) {
    if (typeof config === "function") {
        const httpHandler = async (req) => {
            const _config = await config(req);
            (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(_config);
            return (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)((0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .reqWithEnvURL */ .z)(req), _config);
        };
        return {
            handlers: { GET: httpHandler, POST: httpHandler },
            // @ts-expect-error
            auth: (0,_lib_index_js__WEBPACK_IMPORTED_MODULE_2__/* .initAuth */ .L)(config, (c) => (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(c)),
            signIn: async (provider, options, authorizationParams) => {
                const _config = await config(undefined);
                (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(_config);
                return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .signIn */ .Jv)(provider, options, authorizationParams, _config);
            },
            signOut: async (options) => {
                const _config = await config(undefined);
                (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(_config);
                return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .signOut */ .CI)(options, _config);
            },
            unstable_update: async (data) => {
                const _config = await config(undefined);
                (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(_config);
                return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .update */ .yo)(data, _config);
            },
        };
    }
    (0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G)(config);
    const httpHandler = (req) => (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)((0,_lib_env_js__WEBPACK_IMPORTED_MODULE_1__/* .reqWithEnvURL */ .z)(req), config);
    return {
        handlers: { GET: httpHandler, POST: httpHandler },
        // @ts-expect-error
        auth: (0,_lib_index_js__WEBPACK_IMPORTED_MODULE_2__/* .initAuth */ .L)(config),
        signIn: (provider, options, authorizationParams) => {
            return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .signIn */ .Jv)(provider, options, authorizationParams, config);
        },
        signOut: (options) => {
            return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .signOut */ .CI)(options, config);
        },
        unstable_update: (data) => {
            return (0,_lib_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .update */ .yo)(data, config);
        },
    };
}


/***/ }),

/***/ 651179:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ webAuthnOptions)
/* harmony export */ });
/* harmony import */ var _utils_session_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(909950);
/* harmony import */ var _utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(201122);


/**
 * Returns authentication or registration options for a WebAuthn flow
 * depending on the parameters provided.
 */
async function webAuthnOptions(request, options, sessionStore, cookies
// @ts-expect-error issue with returning from a switch case
) {
    // Return an error if the adapter is missing or if the provider
    // is not a webauthn provider.
    const narrowOptions = (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .assertInternalOptionsWebAuthn */ .O1)(options);
    const { provider } = narrowOptions;
    // Extract the action from the query parameters
    const { action } = (request.query ?? {});
    // Action must be either "register", "authenticate", or undefined
    if (action !== "register" &&
        action !== "authenticate" &&
        typeof action !== "undefined") {
        return {
            status: 400,
            body: { error: "Invalid action" },
            cookies,
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    // Get the user info from the session
    const sessionUser = await (0,_utils_session_js__WEBPACK_IMPORTED_MODULE_1__/* .getLoggedInUser */ .x)(options, sessionStore);
    // Extract user info from request
    // If session user exists, we don't need to call getUserInfo
    const getUserInfoResponse = sessionUser
        ? {
            user: sessionUser,
            exists: true,
        }
        : await provider.getUserInfo(options, request);
    const userInfo = getUserInfoResponse?.user;
    // Make a decision on what kind of webauthn options to return
    const decision = (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .inferWebAuthnOptions */ .ZI)(action, !!sessionUser, getUserInfoResponse);
    switch (decision) {
        case "authenticate":
            return (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getAuthenticationResponse */ .u_)(narrowOptions, request, userInfo, cookies);
        case "register":
            if (typeof userInfo?.email === "string") {
                return (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegistrationResponse */ .Jc)(narrowOptions, request, userInfo, cookies);
            }
            break;
        default:
            return {
                status: 400,
                body: { error: "Invalid request" },
                cookies,
                headers: {
                    "Content-Type": "application/json",
                },
            };
    }
}


/***/ }),

/***/ 653376:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ EncryptJWT)
/* harmony export */ });
/* harmony import */ var _lib_jwe_encrypt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(787443);
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(517347);
/* harmony import */ var _lib_validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(438805);



const EncryptJWT_base = _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__/* .JWTClaimsBuilder */ .cE;
class EncryptJWT extends EncryptJWT_base {
  #input = [void 0];
  #replicateIssuerAsHeader;
  #replicateSubjectAsHeader;
  #replicateAudienceAsHeader;
  setProtectedHeader(protectedHeader) {
    return (0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNotSet */ .ac)(this.#input[1], "setProtectedHeader"), this.#input[1] = protectedHeader, this;
  }
  setKeyManagementParameters(parameters) {
    return (0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNotSet */ .ac)(this.#input[7], "setKeyManagementParameters"), this.#input[7] = parameters, this;
  }
  setContentEncryptionKey(cek) {
    return (0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNotSet */ .ac)(this.#input[5], "setContentEncryptionKey"), this.#input[5] = cek, this;
  }
  setInitializationVector(iv) {
    return (0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNotSet */ .ac)(this.#input[6], "setInitializationVector"), this.#input[6] = iv, this;
  }
  replicateIssuerAsHeader() {
    return this.#replicateIssuerAsHeader = !0, this;
  }
  replicateSubjectAsHeader() {
    return this.#replicateSubjectAsHeader = !0, this;
  }
  replicateAudienceAsHeader() {
    return this.#replicateAudienceAsHeader = !0, this;
  }
  async encrypt(key, options) {
    const plaintext = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__/* .jwtClaimsSetBytes */ ._g)(this);
    this.#input[1] && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader) && (this.#input[1] = {
      ...this.#input[1],
      iss: this.#replicateIssuerAsHeader ? (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__/* .jwtClaim */ .GX)(this, "iss") : void 0,
      sub: this.#replicateSubjectAsHeader ? (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__/* .jwtClaim */ .GX)(this, "sub") : void 0,
      aud: this.#replicateAudienceAsHeader ? (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_0__/* .jwtClaim */ .GX)(this, "aud") : void 0
    });
    const input = [...this.#input];
    return input[0] = plaintext, (0,_lib_jwe_encrypt_js__WEBPACK_IMPORTED_MODULE_2__/* .compactJWE */ .qY)(await (0,_lib_jwe_encrypt_js__WEBPACK_IMPORTED_MODULE_2__/* .createJWE */ .Pt)(input, key, options));
  }
}



/***/ }),

/***/ 663236:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A_: () => (/* binding */ toInternalRequest),
/* harmony export */   DU: () => (/* binding */ randomString),
/* harmony export */   Zr: () => (/* binding */ toResponse),
/* harmony export */   d_: () => (/* binding */ toRequest),
/* harmony export */   n1: () => (/* binding */ createHash)
/* harmony export */ });
/* unused harmony export parseActionAndProviderId */
/* harmony import */ var _vendored_cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(747722);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93316);
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(247597);




const { /* parse */ "q": parseCookie, /* serialize */ "l": serializeCookie } = _vendored_cookie_js__WEBPACK_IMPORTED_MODULE_0__;
async function getBody(req) {
    if (!("body" in req) || !req.body || req.method !== "POST")
        return;
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return await req.json();
    }
    else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(await req.text());
        return Object.fromEntries(params);
    }
}
async function toInternalRequest(req, config) {
    try {
        if (req.method !== "GET" && req.method !== "POST")
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnknownAction */ .P8("Only GET and POST requests are supported");
        // Defaults are usually set in the `init` function, but this is needed below
        config.basePath ?? (config.basePath = "/auth");
        const url = new URL(req.url);
        const { action, providerId } = parseActionAndProviderId(url.pathname, config.basePath);
        return {
            url,
            action,
            providerId,
            method: req.method,
            headers: Object.fromEntries(req.headers),
            body: req.body ? await getBody(req) : undefined,
            cookies: parseCookie(req.headers.get("cookie") ?? "") ?? {},
            error: url.searchParams.get("error") ?? undefined,
            query: Object.fromEntries(url.searchParams),
        };
    }
    catch (e) {
        const logger = (0,_logger_js__WEBPACK_IMPORTED_MODULE_2__/* .setLogger */ .B)(config);
        logger.error(e);
        logger.debug("request", req);
    }
}
function toRequest(request) {
    return new Request(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.method === "POST"
            ? JSON.stringify(request.body ?? {})
            : undefined,
    });
}
function toResponse(res) {
    const headers = new Headers(res.headers);
    res.cookies?.forEach((cookie) => {
        const { name, value, options } = cookie;
        const cookieHeader = serializeCookie(name, value, options);
        if (headers.has("Set-Cookie"))
            headers.append("Set-Cookie", cookieHeader);
        else
            headers.set("Set-Cookie", cookieHeader);
    });
    let body = res.body;
    if (headers.get("content-type") === "application/json")
        body = JSON.stringify(res.body);
    else if (headers.get("content-type") === "application/x-www-form-urlencoded")
        body = new URLSearchParams(res.body).toString();
    const status = res.redirect ? 302 : (res.status ?? 200);
    const response = new Response(body, { headers, status });
    if (res.redirect)
        response.headers.set("Location", res.redirect);
    return response;
}
/** Web compatible method to create a hash, using SHA256 */
async function createHash(message) {
    const data = new TextEncoder().encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toString();
}
/** Web compatible method to create a random string of a given length */
function randomString(size) {
    const i2hex = (i) => ("0" + i.toString(16)).slice(-2);
    const r = (a, i) => a + i2hex(i);
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    return Array.from(bytes).reduce(r, "");
}
/** @internal Parse the action and provider id from a URL pathname. */
function parseActionAndProviderId(pathname, base) {
    const a = pathname.match(new RegExp(`^${base}(.+)`));
    if (a === null)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnknownAction */ .P8(`Cannot parse action at ${pathname}`);
    const actionAndProviderId = a.at(-1);
    const b = actionAndProviderId.replace(/^\//, "").split("/").filter(Boolean);
    if (b.length !== 1 && b.length !== 2)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnknownAction */ .P8(`Cannot parse action at ${pathname}`);
    const [action, providerId] = b;
    if (!(0,_actions_js__WEBPACK_IMPORTED_MODULE_3__/* .isAuthAction */ .t)(action))
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnknownAction */ .P8(`Cannot parse action at ${pathname}`);
    if (providerId &&
        !["signin", "callback", "webauthn-options"].includes(action))
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnknownAction */ .P8(`Cannot parse action at ${pathname}`);
    return {
        action,
        providerId: providerId == "undefined" ? undefined : providerId,
    };
}


/***/ }),

/***/ 671264:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CI: () => (/* reexport safe */ _signout_js__WEBPACK_IMPORTED_MODULE_3__.C),
/* harmony export */   E2: () => (/* reexport safe */ _callback_index_js__WEBPACK_IMPORTED_MODULE_0__.E),
/* harmony export */   Jv: () => (/* reexport safe */ _signin_index_js__WEBPACK_IMPORTED_MODULE_2__.J),
/* harmony export */   dZ: () => (/* reexport safe */ _session_js__WEBPACK_IMPORTED_MODULE_1__.d),
/* harmony export */   xp: () => (/* reexport safe */ _webauthn_options_js__WEBPACK_IMPORTED_MODULE_4__.x)
/* harmony export */ });
/* harmony import */ var _callback_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(735086);
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41116);
/* harmony import */ var _signin_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62947);
/* harmony import */ var _signout_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(685131);
/* harmony import */ var _webauthn_options_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(651179);







/***/ }),

/***/ 685131:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ signOut)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);

/**
 * Destroys the session.
 * If the session strategy is database,
 * The session is also deleted from the database.
 * In any case, the session cookie is cleared and
 * {@link AuthConfig["events"].signOut} is emitted.
 */
async function signOut(cookies, sessionStore, options) {
    const { jwt, events, callbackUrl: redirect, logger, session } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return { redirect, cookies };
    try {
        if (session.strategy === "jwt") {
            const salt = options.cookies.sessionToken.name;
            const token = await jwt.decode({ ...jwt, token: sessionToken, salt });
            await events.signOut?.({ token });
        }
        else {
            const session = await options.adapter?.deleteSession(sessionToken);
            await events.signOut?.({ session });
        }
    }
    catch (e) {
        logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .SignOutError */ .eH(e));
    }
    cookies.push(...sessionStore.clean());
    return { redirect, cookies };
}


/***/ }),

/***/ 691970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(566610);
/* harmony import */ var _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__, "redirect")) __webpack_require__.d(__webpack_exports__, { redirect: function() { return _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__.redirect; } });


//# sourceMappingURL=navigation.react-server.js.map

/***/ }),

/***/ 696217:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ calculateJwkThumbprint)
/* harmony export */ });
/* unused harmony export calculateJwkThumbprintUri */
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(573575);
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(488888);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499129);
/* harmony import */ var _lib_key_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(864416);
/* harmony import */ var _lib_validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(438805);
/* harmony import */ var _key_export_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(474357);






const check = (value, description) => {
  if (typeof value != "string" || !value)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWKInvalid */ ._L(`${description} missing or invalid`);
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
  let jwk;
  if ((0,_lib_validate_js__WEBPACK_IMPORTED_MODULE_1__/* .isObject */ .Gv)(key)) {
    if (jwk = (0,_lib_key_js__WEBPACK_IMPORTED_MODULE_2__/* .snapshotJwk */ .ZZ)(key), typeof jwk.kty != "string")
      throw new TypeError((0,_lib_key_js__WEBPACK_IMPORTED_MODULE_2__/* .invalidKeyInput */ .XP)(key, "CryptoKey", "KeyObject", "JSON Web Key"));
  } else if ((0,_lib_key_js__WEBPACK_IMPORTED_MODULE_2__/* .isKeyLike */ .P2)(key))
    jwk = (0,_lib_key_js__WEBPACK_IMPORTED_MODULE_2__/* .snapshotJwk */ .ZZ)(await (0,_key_export_js__WEBPACK_IMPORTED_MODULE_3__/* .exportJWK */ .JU)(key));
  else
    throw new TypeError((0,_lib_key_js__WEBPACK_IMPORTED_MODULE_2__/* .invalidKeyInput */ .XP)(key, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (digestAlgorithm ??= "sha256", digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let requiredMembers;
  switch (jwk.kty) {
    case "AKP":
      check(jwk.alg, '"alg" (Algorithm) Parameter'), check(jwk.pub, '"pub" (Public key) Parameter'), requiredMembers = { alg: jwk.alg, kty: jwk.kty, pub: jwk.pub };
      break;
    case "EC":
      check(jwk.crv, '"crv" (Curve) Parameter'), check(jwk.x, '"x" (X Coordinate) Parameter'), check(jwk.y, '"y" (Y Coordinate) Parameter'), requiredMembers = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
      break;
    case "OKP":
      check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter'), check(jwk.x, '"x" (Public Key) Parameter'), requiredMembers = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
      break;
    case "RSA":
      check(jwk.e, '"e" (Exponent) Parameter'), check(jwk.n, '"n" (Modulus) Parameter'), requiredMembers = { e: jwk.e, kty: jwk.kty, n: jwk.n };
      break;
    case "oct":
      if (typeof jwk.k != "string")
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JWKInvalid */ ._L('"k" (Key Value) Parameter missing or invalid');
      requiredMembers = { k: jwk.k, kty: jwk.kty };
      break;
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__/* .JOSENotSupported */ .T0('"kty" (Key Type) Parameter missing or unsupported');
  }
  const thumbprintInput = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .encode */ .lF)(JSON.stringify(requiredMembers));
  return (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_5__/* .encode */ .l)(await (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .digest */ .br)(digestAlgorithm, thumbprintInput));
}
async function calculateJwkThumbprintUri(key, digestAlgorithm) {
  digestAlgorithm ??= "sha256";
  const thumbprint = await calculateJwkThumbprint(key, digestAlgorithm);
  return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
}



/***/ }),

/***/ 707498:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ hkdf)
/* harmony export */ });
/* unused harmony export default */
/* harmony import */ var _runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(792770);

function normalizeDigest(digest) {
    switch (digest) {
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string')
        return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array))
        throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength)
        throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0,_runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}



/***/ }),

/***/ 710381:
/***/ ((module, exports) => {

/**
 * ReadonlyURLSearchParams implementation shared between client and server.
 * This file is intentionally not marked as 'use client' or 'use server'
 * so it can be imported by both environments.
 */ /** @internal */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ReadonlyURLSearchParams", ({
    enumerable: true,
    get: function() {
        return ReadonlyURLSearchParams;
    }
}));
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1174",
            enumerable: false,
            configurable: true
        });
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=readonly-url-search-params.js.map


/***/ }),

/***/ 735086:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ callback)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _handle_login_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(735186);
/* harmony import */ var _oauth_callback_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(987019);
/* harmony import */ var _oauth_checks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134033);
/* harmony import */ var _utils_web_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(663236);
/* harmony import */ var _utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(201122);
// TODO: Make this file smaller






/** Handle callbacks from login services */
async function callback(request, options, sessionStore, cookies) {
    if (!options.provider)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidProvider */ .Hj("Callback route called without provider");
    const { query, body, method, headers } = request;
    const { provider, adapter, url, callbackUrl, pages, jwt, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger, } = options;
    const useJwtSession = sessionStrategy === "jwt";
    try {
        if (provider.type === "oauth" || provider.type === "oidc") {
            // Use body if the response mode is set to form_post. For all other cases, use query
            const params = provider.authorization?.url.searchParams.get("response_mode") ===
                "form_post"
                ? body
                : query;
            // If we have a state and we are on a redirect proxy, we try to parse it
            // and see if it contains a valid origin to redirect to. If it does, we
            // redirect the user to that origin with the original state.
            if (options.isOnRedirectProxy && params?.state) {
                // NOTE: We rely on the state being encrypted using a shared secret
                // between the proxy and the original server.
                const parsedState = await _oauth_checks_js__WEBPACK_IMPORTED_MODULE_3__/* .state */ .wk.decode(params.state, options);
                const shouldRedirect = parsedState?.origin &&
                    new URL(parsedState.origin).origin !== options.url.origin;
                if (shouldRedirect) {
                    const proxyRedirect = `${parsedState.origin}?${new URLSearchParams(params)}`;
                    logger.debug("Proxy redirecting to", proxyRedirect);
                    return { redirect: proxyRedirect, cookies };
                }
            }
            const authorizationResult = await (0,_oauth_callback_js__WEBPACK_IMPORTED_MODULE_2__/* .handleOAuth */ .M)(params, request.cookies, options);
            if (authorizationResult.cookies.length) {
                cookies.push(...authorizationResult.cookies);
            }
            logger.debug("authorization result", authorizationResult);
            const { user: userFromProvider, account, profile: OAuthProfile, } = authorizationResult;
            // If we don't have a profile object then either something went wrong
            // or the user cancelled signing in. We don't know which, so we just
            // direct the user to the signin page for now. We could do something
            // else in future.
            // TODO: Handle user cancelling signin
            if (!userFromProvider || !account || !OAuthProfile) {
                return { redirect: `${url}/signin`, cookies };
            }
            // Check if user is allowed to sign in
            // Attempt to get Profile from OAuth provider details before invoking
            // signIn callback - but if no user object is returned, that is fine
            // (that just means it's a new user signing in for the first time).
            let userByAccount;
            if (adapter) {
                const { getUserByAccount } = adapter;
                userByAccount = await getUserByAccount({
                    providerAccountId: account.providerAccountId,
                    provider: provider.id,
                });
            }
            const redirect = await handleAuthorized({
                user: userByAccount ?? userFromProvider,
                account,
                profile: OAuthProfile,
            }, options);
            if (redirect)
                return { redirect, cookies };
            const { user, session, isNewUser } = await (0,_handle_login_js__WEBPACK_IMPORTED_MODULE_1__/* .handleLoginOrRegister */ .Y)(sessionStore.value, userFromProvider, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: user.name,
                    email: user.email,
                    picture: user.image,
                    sub: user.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user,
                    account,
                    profile: OAuthProfile,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({
                user,
                account,
                profile: OAuthProfile,
                isNewUser,
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "email") {
            const paramToken = query?.token;
            const paramIdentifier = query?.email;
            if (!paramToken) {
                const e = new TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!paramToken } });
                e.name = "Configuration";
                throw e;
            }
            const secret = provider.secret ?? options.secret;
            // @ts-expect-error -- Verified in `assertConfig`.
            const invite = await adapter.useVerificationToken({
                // @ts-expect-error User-land adapters might decide to omit the identifier during lookup
                identifier: paramIdentifier, // TODO: Drop this requirement for lookup in official adapters too
                token: await (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_4__/* .createHash */ .n1)(`${paramToken}${secret}`),
            });
            const hasInvite = !!invite;
            const expired = hasInvite && invite.expires.valueOf() < Date.now();
            const invalidInvite = !hasInvite ||
                expired ||
                // The user might have configured the link to not contain the identifier
                // so we only compare if it exists
                (paramIdentifier && invite.identifier !== paramIdentifier);
            if (invalidInvite)
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .Verification */ .o6({ hasInvite, expired });
            const { identifier } = invite;
            const user = (await adapter.getUserByEmail(identifier)) ?? {
                id: crypto.randomUUID(),
                email: identifier,
                emailVerified: null,
            };
            const account = {
                providerAccountId: user.email,
                userId: user.id,
                type: "email",
                provider: provider.id,
            };
            const redirect = await handleAuthorized({ user, account }, options);
            if (redirect)
                return { redirect, cookies };
            // Sign user in
            const { user: loggedInUser, session, isNewUser, } = await (0,_handle_login_js__WEBPACK_IMPORTED_MODULE_1__/* .handleLoginOrRegister */ .Y)(sessionStore.value, user, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({ user: loggedInUser, account, isNewUser });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "credentials" && method === "POST") {
            const credentials = body ?? {};
            // TODO: Forward the original request as is, instead of reconstructing it
            Object.entries(query ?? {}).forEach(([k, v]) => url.searchParams.set(k, v));
            const userFromAuthorize = await provider.authorize(credentials, 
            // prettier-ignore
            new Request(url, { headers, method, body: JSON.stringify(body) }));
            const user = userFromAuthorize;
            if (!user)
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .CredentialsSignin */ .xz();
            else
                user.id = user.id?.toString() ?? crypto.randomUUID();
            const account = {
                providerAccountId: user.id,
                type: "credentials",
                provider: provider.id,
            };
            const redirect = await handleAuthorized({ user, account, credentials }, options);
            if (redirect)
                return { redirect, cookies };
            const defaultToken = {
                name: user.name,
                email: user.email,
                picture: user.image,
                sub: user.id,
            };
            const token = await callbacks.jwt({
                token: defaultToken,
                user,
                account,
                isNewUser: false,
                trigger: "signIn",
            });
            // Clear cookies if token is null
            if (token === null) {
                cookies.push(...sessionStore.clean());
            }
            else {
                const salt = options.cookies.sessionToken.name;
                // Encode token
                const newToken = await jwt.encode({ ...jwt, token, salt });
                // Set cookie expiry date
                const cookieExpires = new Date();
                cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: cookieExpires,
                });
                cookies.push(...sessionCookies);
            }
            await events.signIn?.({ user, account });
            return { redirect: callbackUrl, cookies };
        }
        else if (provider.type === "webauthn" && method === "POST") {
            // Get callback action from request. It should be either "authenticate" or "register"
            const action = request.body?.action;
            if (typeof action !== "string" ||
                (action !== "authenticate" && action !== "register")) {
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR("Invalid action parameter");
            }
            // Return an error if the adapter is missing or if the provider
            // is not a webauthn provider.
            const localOptions = (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .assertInternalOptionsWebAuthn */ .O1)(options);
            // Verify request to get user, account and authenticator
            let user;
            let account;
            let authenticator;
            switch (action) {
                case "authenticate": {
                    const verified = await (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .verifyAuthenticate */ .vb)(localOptions, request, cookies);
                    user = verified.user;
                    account = verified.account;
                    break;
                }
                case "register": {
                    const verified = await (0,_utils_webauthn_utils_js__WEBPACK_IMPORTED_MODULE_5__/* .verifyRegister */ .$B)(options, request, cookies);
                    user = verified.user;
                    account = verified.account;
                    authenticator = verified.authenticator;
                    break;
                }
            }
            // Check if user is allowed to sign in
            await handleAuthorized({ user, account }, options);
            // Sign user in, creating them and their account if needed
            const { user: loggedInUser, isNewUser, session, account: currentAccount, } = await (0,_handle_login_js__WEBPACK_IMPORTED_MODULE_1__/* .handleLoginOrRegister */ .Y)(sessionStore.value, user, account, options);
            if (!currentAccount) {
                // This is mostly for type checking. It should never actually happen.
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR("Error creating or finding account");
            }
            // Create new authenticator if needed
            if (authenticator && loggedInUser.id) {
                await localOptions.adapter.createAuthenticator({
                    ...authenticator,
                    userId: loggedInUser.id,
                });
            }
            // Do the session registering dance
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString(),
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account: currentAccount,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn",
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                }
                else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({ ...jwt, token, salt });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires,
                    });
                    cookies.push(...sessionCookies);
                }
            }
            else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires,
                    },
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account: currentAccount,
                isNewUser,
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
                    cookies,
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return { redirect: callbackUrl, cookies };
        }
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .InvalidProvider */ .Hj(`Callback for provider type (${provider.type}) is not supported`);
    }
    catch (e) {
        if (e instanceof _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR)
            throw e;
        const error = new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .CallbackRouteError */ .t3(e, { provider: provider.id });
        logger.debug("callback route error details", { method, query, body });
        throw error;
    }
}
async function handleAuthorized(params, config) {
    let authorized;
    const { signIn, redirect } = config.callbacks;
    try {
        authorized = await signIn(params);
    }
    catch (e) {
        if (e instanceof _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AuthError */ .lR)
            throw e;
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AccessDenied */ .Oy(e);
    }
    if (!authorized)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AccessDenied */ .Oy("AccessDenied");
    if (typeof authorized !== "string")
        return;
    return await redirect({ url: authorized, baseUrl: config.url.origin });
}


/***/ }),

/***/ 735186:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ handleLoginOrRegister)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _utils_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(943648);


/**
 * This function handles the complex flow of signing users in, and either creating,
 * linking (or not linking) accounts depending on if the user is currently logged
 * in, if they have account already and the authentication mechanism they are using.
 *
 * It prevents insecure behaviour, such as linking OAuth accounts unless a user is
 * signed in and authenticated with an existing valid account.
 *
 * All verification (e.g. OAuth flows or email address verification flows) are
 * done prior to this handler being called to avoid additional complexity in this
 * handler.
 */
async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
    // Input validation
    if (!_account?.providerAccountId || !_account.type)
        throw new Error("Missing or invalid provider account");
    if (!["email", "oauth", "oidc", "webauthn"].includes(_account.type))
        throw new Error("Provider not supported");
    const { adapter, jwt, events, session: { strategy: sessionStrategy, generateSessionToken }, } = options;
    // If no adapter is configured then we don't have a database and cannot
    // persist data; in this mode we just return a dummy session object.
    if (!adapter) {
        return { user: _profile, account: _account };
    }
    const profile = _profile;
    let account = _account;
    const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession, } = adapter;
    let session = null;
    let user = null;
    let isNewUser = false;
    const useJwtSession = sessionStrategy === "jwt";
    if (sessionToken) {
        if (useJwtSession) {
            try {
                const salt = options.cookies.sessionToken.name;
                session = await jwt.decode({ ...jwt, token: sessionToken, salt });
                if (session && "sub" in session && session.sub) {
                    user = await getUser(session.sub);
                }
            }
            catch {
                // If session can't be verified, treat as no session
            }
        }
        else {
            const userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession) {
                session = userAndSession.session;
                user = userAndSession.user;
            }
        }
    }
    if (account.type === "email") {
        // If signing in with an email, check if an account with the same email address exists already
        const userByEmail = await getUserByEmail(profile.email);
        if (userByEmail) {
            // If they are not already signed in as the same user, this flow will
            // sign them out of the current session and sign them in as the new user
            if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
                // Delete existing session if they are currently signed in as another user.
                // This will switch user accounts for the session in cases where the user was
                // already logged in with a different account.
                await deleteSession(sessionToken);
            }
            // Update emailVerified property on the user object
            user = await updateUser({
                id: userByEmail.id,
                emailVerified: new Date(),
            });
            await events.updateUser?.({ user });
        }
        else {
            // Create user account if there isn't one for the email address already
            user = await createUser({ ...profile, emailVerified: new Date() });
            await events.createUser?.({ user });
            isNewUser = true;
        }
        // Create new session
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(options.session.maxAge),
            });
        return { session, user, isNewUser };
    }
    else if (account.type === "webauthn") {
        // Check if the account exists
        const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider,
        });
        if (userByAccount) {
            if (user) {
                // If the user is already signed in with this account, we don't need to do anything
                if (userByAccount.id === user.id) {
                    const currentAccount = { ...account, userId: user.id };
                    return { session, user, isNewUser, account: currentAccount };
                }
                // If the user is currently signed in, but the new account they are signing in
                // with is already associated with another user, then we cannot link them
                // and need to return an error.
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AccountNotLinked */ .WS("The account is already associated with another user", { provider: account.provider });
            }
            // If there is no active session, but the account being signed in with is already
            // associated with a valid user then create session to sign the user in.
            session = useJwtSession
                ? {}
                : await createSession({
                    sessionToken: generateSessionToken(),
                    userId: userByAccount.id,
                    expires: (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(options.session.maxAge),
                });
            const currentAccount = {
                ...account,
                userId: userByAccount.id,
            };
            return {
                session,
                user: userByAccount,
                isNewUser,
                account: currentAccount,
            };
        }
        else {
            // If the account doesn't exist, we'll create it
            if (user) {
                // If the user is already signed in and the account isn't already associated
                // with another user account then we can go ahead and link the accounts safely.
                await linkAccount({ ...account, userId: user.id });
                await events.linkAccount?.({ user, account, profile });
                // As they are already signed in, we don't need to do anything after linking them
                const currentAccount = { ...account, userId: user.id };
                return { session, user, isNewUser, account: currentAccount };
            }
            // If the user is not signed in and it looks like a new account then we
            // check there also isn't an user account already associated with the same
            // email address as the one in the request.
            const userByEmail = profile.email
                ? await getUserByEmail(profile.email)
                : null;
            if (userByEmail) {
                // We don't trust user-provided email addresses, so we don't want to link accounts
                // if the email address associated with the new account is already associated with
                // an existing account.
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .AccountNotLinked */ .WS("Another account already exists with the same e-mail address", { provider: account.provider });
            }
            else {
                // If the current user is not logged in and the profile isn't linked to any user
                // accounts (by email or provider account id)...
                //
                // If no account matching the same [provider].id or .email exists, we can
                // create a new account for the user, link it to the OAuth account and
                // create a new session for them so they are signed in with it.
                user = await createUser({ ...profile });
            }
            await events.createUser?.({ user });
            await linkAccount({ ...account, userId: user.id });
            await events.linkAccount?.({ user, account, profile });
            session = useJwtSession
                ? {}
                : await createSession({
                    sessionToken: generateSessionToken(),
                    userId: user.id,
                    expires: (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(options.session.maxAge),
                });
            const currentAccount = { ...account, userId: user.id };
            return { session, user, isNewUser: true, account: currentAccount };
        }
    }
    // If signing in with OAuth account, check to see if the account exists already
    const userByAccount = await getUserByAccount({
        providerAccountId: account.providerAccountId,
        provider: account.provider,
    });
    if (userByAccount) {
        if (user) {
            // If the user is already signed in with this account, we don't need to do anything
            if (userByAccount.id === user.id) {
                return { session, user, isNewUser };
            }
            // If the user is currently signed in, but the new account they are signing in
            // with is already associated with another user, then we cannot link them
            // and need to return an error.
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .OAuthAccountNotLinked */ .XP("The account is already associated with another user", { provider: account.provider });
        }
        // If there is no active session, but the account being signed in with is already
        // associated with a valid user then create session to sign the user in.
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: userByAccount.id,
                expires: (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(options.session.maxAge),
            });
        return { session, user: userByAccount, isNewUser };
    }
    else {
        const { provider: p } = options;
        const { type, provider, providerAccountId, userId, ...tokenSet } = account;
        const defaults = { providerAccountId, provider, type, userId };
        account = Object.assign(p.account(tokenSet) ?? {}, defaults);
        if (user) {
            // If the user is already signed in and the OAuth account isn't already associated
            // with another user account then we can go ahead and link the accounts safely.
            await linkAccount({ ...account, userId: user.id });
            await events.linkAccount?.({ user, account, profile });
            // As they are already signed in, we don't need to do anything after linking them
            return { session, user, isNewUser };
        }
        // If the user is not signed in and it looks like a new OAuth account then we
        // check there also isn't an user account already associated with the same
        // email address as the one in the OAuth profile.
        //
        // This step is often overlooked in OAuth implementations, but covers the following cases:
        //
        // 1. It makes it harder for someone to accidentally create two accounts.
        //    e.g. by signin in with email, then again with an oauth account connected to the same email.
        // 2. It makes it harder to hijack a user account using a 3rd party OAuth account.
        //    e.g. by creating an oauth account then changing the email address associated with it.
        //
        // It's quite common for services to automatically link accounts in this case, but it's
        // better practice to require the user to sign in *then* link accounts to be sure
        // someone is not exploiting a problem with a third party OAuth service.
        //
        // OAuth providers should require email address verification to prevent this, but in
        // practice that is not always the case; this helps protect against that.
        const userByEmail = profile.email
            ? await getUserByEmail(profile.email)
            : null;
        if (userByEmail) {
            const provider = options.provider;
            if (provider?.allowDangerousEmailAccountLinking) {
                // If you trust the oauth provider to correctly verify email addresses, you can opt-in to
                // account linking even when the user is not signed-in.
                user = userByEmail;
                isNewUser = false;
            }
            else {
                // We end up here when we don't have an account with the same [provider].id *BUT*
                // we do already have an account with the same email address as the one in the
                // OAuth profile the user has just tried to sign in with.
                //
                // We don't want to have two accounts with the same email address, and we don't
                // want to link them in case it's not safe to do so, so instead we prompt the user
                // to sign in via email to verify their identity and then link the accounts.
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .OAuthAccountNotLinked */ .XP("Another account already exists with the same e-mail address", { provider: account.provider });
            }
        }
        else {
            // If the current user is not logged in and the profile isn't linked to any user
            // accounts (by email or provider account id)...
            //
            // If no account matching the same [provider].id or .email exists, we can
            // create a new account for the user, link it to the OAuth account and
            // create a new session for them so they are signed in with it.
            user = await createUser({ ...profile, emailVerified: null });
            isNewUser = true;
        }
        await events.createUser?.({ user });
        await linkAccount({ ...account, userId: user.id });
        await events.linkAccount?.({ user, account, profile });
        session = useJwtSession
            ? {}
            : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: (0,_utils_date_js__WEBPACK_IMPORTED_MODULE_1__/* .fromDate */ .B)(options.session.maxAge),
            });
        return { session, user, isNewUser };
    }
}


/***/ }),

/***/ 747722:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ serialize),
/* harmony export */   q: () => (/* binding */ parse)
/* harmony export */ });
/**
 * @source https://github.com/jshttp/cookie
 * @author blakeembrey
 * @license MIT
 */
/**
 * This is a workaround to support ESM-only environments, until `cookie` ships ESM builds.
 * @see https://github.com/jshttp/cookie/issues/211
 */
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 */
const cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 */
const cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
    const C = function () { };
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */
function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2)
        return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
            break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    } while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index;
    } while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */
function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options)
        return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) ||
            !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string"
            ? options.priority.toLowerCase()
            : undefined;
        switch (priority) {
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string"
            ? options.sameSite.toLowerCase()
            : options.sameSite;
        switch (sameSite) {
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */
function decode(str) {
    if (str.indexOf("%") === -1)
        return str;
    try {
        return decodeURIComponent(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */
function isDate(val) {
    return __toString.call(val) === "[object Date]";
}


/***/ }),

/***/ 752461:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ setEnvDefaults),
/* harmony export */   o: () => (/* binding */ createActionURL)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93316);

/**
 *  Set default env variables on the config object
 * @param suppressWarnings intended for framework authors.
 */
function setEnvDefaults(envObject, config, suppressBasePathWarning = false) {
    try {
        const url = envObject.AUTH_URL;
        if (url) {
            if (config.basePath) {
                if (!suppressBasePathWarning) {
                    const logger = (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__/* .setLogger */ .B)(config);
                    logger.warn("env-url-basepath-redundant");
                }
            }
            else {
                config.basePath = new URL(url).pathname;
            }
        }
    }
    catch {
        // Catching and swallowing potential URL parsing errors, we'll fall
        // back to `/auth` below.
    }
    finally {
        config.basePath ?? (config.basePath = `/auth`);
    }
    if (!config.secret?.length) {
        config.secret = [];
        const secret = envObject.AUTH_SECRET;
        if (secret)
            config.secret.push(secret);
        for (const i of [1, 2, 3]) {
            const secret = envObject[`AUTH_SECRET_${i}`];
            if (secret)
                config.secret.unshift(secret);
        }
    }
    config.redirectProxyUrl ?? (config.redirectProxyUrl = envObject.AUTH_REDIRECT_PROXY_URL);
    config.trustHost ?? (config.trustHost = !!(envObject.AUTH_URL ??
        envObject.AUTH_TRUST_HOST ??
        envObject.VERCEL ??
        envObject.CF_PAGES ??
        envObject.NODE_ENV !== "production"));
    config.providers = config.providers.map((provider) => {
        const { id } = typeof provider === "function" ? provider({}) : provider;
        const ID = id.toUpperCase().replace(/-/g, "_");
        const clientId = envObject[`AUTH_${ID}_ID`];
        const clientSecret = envObject[`AUTH_${ID}_SECRET`];
        const issuer = envObject[`AUTH_${ID}_ISSUER`];
        const apiKey = envObject[`AUTH_${ID}_KEY`];
        const finalProvider = typeof provider === "function"
            ? provider({ clientId, clientSecret, issuer, apiKey })
            : provider;
        if (finalProvider.type === "oauth" || finalProvider.type === "oidc") {
            finalProvider.clientId ?? (finalProvider.clientId = clientId);
            finalProvider.clientSecret ?? (finalProvider.clientSecret = clientSecret);
            finalProvider.issuer ?? (finalProvider.issuer = issuer);
        }
        else if (finalProvider.type === "email") {
            finalProvider.apiKey ?? (finalProvider.apiKey = apiKey);
        }
        return finalProvider;
    });
}
function createActionURL(action, protocol, headers, envObject, config) {
    const basePath = config?.basePath;
    const envUrl = envObject.AUTH_URL ?? envObject.NEXTAUTH_URL;
    let url;
    if (envUrl) {
        url = new URL(envUrl);
        if (basePath && basePath !== "/" && url.pathname !== "/") {
            if (url.pathname !== basePath) {
                const logger = (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__/* .setLogger */ .B)(config);
                logger.warn("env-url-basepath-mismatch");
            }
            url.pathname = "/";
        }
    }
    else {
        const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
        const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol ?? "https";
        const _protocol = detectedProtocol.endsWith(":")
            ? detectedProtocol
            : detectedProtocol + ":";
        url = new URL(`${_protocol}//${detectedHost}`);
    }
    // remove trailing slash
    const sanitizedUrl = url.toString().replace(/\/$/, "");
    if (basePath) {
        // remove leading and trailing slash
        const sanitizedBasePath = basePath?.replace(/(^\/|\/$)/g, "") ?? "";
        return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
    }
    return new URL(`${sanitizedUrl}/${action}`);
}


/***/ }),

/***/ 770059:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ createCallbackUrl)
/* harmony export */ });
/**
 * Get callback URL based on query param / cookie + validation,
 * and add it to `req.options.callbackUrl`.
 */
async function createCallbackUrl({ options, paramValue, cookieValue, }) {
    const { url, callbacks } = options;
    let callbackUrl = url.origin;
    if (paramValue) {
        // If callbackUrl form field or query parameter is passed try to use it if allowed
        callbackUrl = await callbacks.redirect({
            url: paramValue,
            baseUrl: url.origin,
        });
    }
    else if (cookieValue) {
        // If no callbackUrl specified, try using the value from the cookie if allowed
        callbackUrl = await callbacks.redirect({
            url: cookieValue,
            baseUrl: url.origin,
        });
    }
    return {
        callbackUrl,
        // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
        callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined,
    };
}


/***/ }),

/***/ 775961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CI: () => (/* binding */ signOut),
/* harmony export */   Jv: () => (/* binding */ signIn),
/* harmony export */   yo: () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _auth_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311024);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(265573);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(691970);

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field

async function signIn(provider, options = {}, authorizationParams, config) {
    const headers = new Headers(await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)());
    const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
    const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
    const signInURL = (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .createActionURL */ .ot)("signin", 
    // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    if (!provider) {
        signInURL.searchParams.append("callbackUrl", callbackUrl);
        if (shouldRedirect)
            (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.redirect)(signInURL.toString());
        return signInURL.toString();
    }
    let url = `${signInURL}/${provider}?${new URLSearchParams(authorizationParams)}`;
    let foundProvider = {};
    for (const providerConfig of config.providers) {
        const { options, ...defaults } = typeof providerConfig === "function" ? providerConfig() : providerConfig;
        const id = options?.id ?? defaults.id;
        if (id === provider) {
            foundProvider = {
                id,
                type: options?.type ?? defaults.type,
            };
            break;
        }
    }
    if (!foundProvider.id) {
        const url = `${signInURL}?${new URLSearchParams({ callbackUrl })}`;
        if (shouldRedirect)
            (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.redirect)(url);
        return url;
    }
    if (foundProvider.type === "credentials") {
        url = url.replace("signin", "callback");
    }
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams({ ...rest, callbackUrl });
    const req = new Request(url, { method: "POST", headers, body });
    const res = await (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)(req, { ...config, raw: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .raw */ .lS, skipCSRFCheck: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .skipCSRFCheck */ .We });
    const cookieJar = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .cookies */ .UL)();
    for (const c of res?.cookies ?? [])
        cookieJar.set(c.name, c.value, c.options);
    const responseUrl = res instanceof Response ? res.headers.get("Location") : res.redirect;
    // NOTE: if for some unexpected reason the responseUrl is not set,
    // we redirect to the original url
    const redirectUrl = responseUrl ?? url;
    if (shouldRedirect)
        return (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.redirect)(redirectUrl);
    return redirectUrl;
}
async function signOut(options, config) {
    const headers = new Headers(await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)());
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const url = (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .createActionURL */ .ot)("signout", 
    // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
    const body = new URLSearchParams({ callbackUrl });
    const req = new Request(url, { method: "POST", headers, body });
    const res = await (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)(req, { ...config, raw: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .raw */ .lS, skipCSRFCheck: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .skipCSRFCheck */ .We });
    const cookieJar = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .cookies */ .UL)();
    for (const c of res?.cookies ?? [])
        cookieJar.set(c.name, c.value, c.options);
    if (options?.redirect ?? true)
        return (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.redirect)(res.redirect);
    return res;
}
async function update(data, config) {
    const headers = new Headers(await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)());
    headers.set("Content-Type", "application/json");
    const url = (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .createActionURL */ .ot)("session", 
    // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const body = JSON.stringify({ data });
    const req = new Request(url, { method: "POST", headers, body });
    const res = await (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__/* .Auth */ .Nj)(req, { ...config, raw: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .raw */ .lS, skipCSRFCheck: _auth_core__WEBPACK_IMPORTED_MODULE_0__/* .skipCSRFCheck */ .We });
    const cookieJar = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .cookies */ .UL)();
    for (const c of res?.cookies ?? [])
        cookieJar.set(c.name, c.value, c.options);
    return res.body;
}


/***/ }),

/***/ 787443:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pt: () => (/* binding */ createJWE),
/* harmony export */   qY: () => (/* binding */ compactJWE)
/* harmony export */ });
/* unused harmony exports checkDisjoint, checkEncryptHeaders, encryptJWE */
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(488888);
/* harmony import */ var _content_encryption_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(238884);
/* harmony import */ var _key_management_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54316);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(499129);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(438805);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(573575);
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(864416);
/* harmony import */ var _jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(104774);
/* harmony import */ var _deflate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(579900);









function checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .isDisjoint */ .fz)(protectedHeader, unprotectedHeader, sharedUnprotectedHeader))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
}
function checkEncryptHeaders(input, options, sharedHeadersNormalized = !1) {
  if (!input[1] && !input[2] && !input[3])
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
  options !== void 0 && (input[8] = options?.crit);
  let [, protectedHeader, unprotectedHeader, sharedUnprotectedHeader, aad, cek, iv, keyManagementParameters, crit] = input;
  if (aad !== void 0 && (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .assertUint8Array */ .GT)(aad, "JWE Additional Authenticated Data"), cek !== void 0 && (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .assertUint8Array */ .GT)(cek, "JWE Content Encryption Key"), iv !== void 0 && (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .assertUint8Array */ .GT)(iv, "JWE Initialization Vector"), !sharedHeadersNormalized && protectedHeader !== void 0 && (protectedHeader = (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .serializeJoseHeader */ .ji)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, protectedHeader)[0], input[1] = protectedHeader), unprotectedHeader !== void 0 && (unprotectedHeader = (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .serializeJoseHeader */ .ji)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, unprotectedHeader)[0], input[2] = unprotectedHeader), !sharedHeadersNormalized && sharedUnprotectedHeader !== void 0 && (sharedUnprotectedHeader = (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .serializeJoseHeader */ .ji)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, sharedUnprotectedHeader)[0], input[3] = sharedUnprotectedHeader), keyManagementParameters !== void 0 && !(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(keyManagementParameters))
    throw new TypeError("JWE Key Management Parameters must be an object");
  checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader);
  const joseHeader = {
    ...protectedHeader,
    ...unprotectedHeader,
    ...sharedUnprotectedHeader
  };
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .validateCritDuplicates */ .BU)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, protectedHeader), (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .validateCrit */ .nI)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, _validate_js__WEBPACK_IMPORTED_MODULE_0__/* .JWE_RECOGNIZED */ .CT, crit, protectedHeader, joseHeader), (0,_deflate_js__WEBPACK_IMPORTED_MODULE_2__/* .validateZip */ .q9)(joseHeader, protectedHeader);
  const { alg, enc } = joseHeader;
  if (typeof alg != "string" || !alg)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA('JWE "alg" (Algorithm) Header Parameter missing or invalid');
  const algEntry = _jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .JWE */ .po[alg];
  if (algEntry?.mode === "integrated-encryption") {
    if (enc !== void 0)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (cek !== void 0)
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
    if (iv !== void 0)
      throw new TypeError(`setInitializationVector cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
    return [joseHeader, void 0, algEntry];
  }
  if (typeof enc != "string" || !enc)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
  return [joseHeader, (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .jweEncryption */ .Oe)(enc), algEntry];
}
async function encryptJWE(input, checked, key) {
  const [joseHeader, encEntry, selected] = checked, [inputPlaintext, inputProtectedHeader, inputUnprotectedHeader, sharedUnprotectedHeader, aad, providedCek, inputIv, keyManagementParameters, , unprotectedParameters] = input;
  let protectedHeader = inputProtectedHeader, unprotectedHeader = inputUnprotectedHeader;
  const algEntry = selected ?? (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .jweAlgorithm */ .eD)(joseHeader.alg);
  let encryptedKey, parameters, cek;
  algEntry.mode === "integrated-encryption" ? cek = await (0,_key_js__WEBPACK_IMPORTED_MODULE_4__/* .prepareKey */ .dT)(algEntry, key, "encrypt") : [cek, encryptedKey, parameters] = await (0,_key_management_js__WEBPACK_IMPORTED_MODULE_5__/* .encryptKeyManagement */ .ss)(algEntry, encEntry, key, joseHeader, providedCek, keyManagementParameters), parameters && (unprotectedParameters ? unprotectedHeader = unprotectedHeader ? { ...unprotectedHeader, ...parameters } : parameters : protectedHeader = protectedHeader ? { ...protectedHeader, ...parameters } : parameters, checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader));
  const encodedProtectedHeader = protectedHeader ? (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(JSON.stringify(protectedHeader)) : "", encodedAad = aad?.byteLength ? (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(aad) : void 0, additionalAuthenticatedData = (0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_7__/* .encode */ .lF)(encodedAad ? `${encodedProtectedHeader}.${encodedAad}` : encodedProtectedHeader);
  let plaintext = inputPlaintext;
  joseHeader.zip === "DEF" && (plaintext = await (0,_deflate_js__WEBPACK_IMPORTED_MODULE_2__/* .compress */ .Bc)(plaintext).catch((cause) => {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("Failed to compress plaintext", { cause });
  }));
  let ciphertext, tag, iv;
  algEntry.mode === "integrated-encryption" ? [encryptedKey, ciphertext] = await algEntry.encrypt(cek, plaintext, additionalAuthenticatedData, protectedHeader, joseHeader, keyManagementParameters) : { ciphertext, tag, iv } = await (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_8__/* .encrypt */ .w)(encEntry, plaintext, cek, inputIv, additionalAuthenticatedData);
  const jwe = {
    ciphertext: (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(ciphertext)
  };
  return iv && (jwe.iv = (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(iv)), tag && (jwe.tag = (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(tag)), encryptedKey?.byteLength && (jwe.encrypted_key = (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_6__/* .encode */ .l)(encryptedKey)), encodedAad && (jwe.aad = encodedAad), protectedHeader && (jwe.protected = encodedProtectedHeader), sharedUnprotectedHeader && (jwe.unprotected = sharedUnprotectedHeader), unprotectedHeader && (jwe.header = unprotectedHeader), jwe;
}
async function createJWE(input, key, options) {
  return encryptJWE(input, checkEncryptHeaders(input, options), key);
}
function compactJWE(jwe) {
  return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
}



/***/ }),

/***/ 792770:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var _fallback_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520523);


let hkdf;
if (typeof crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf === 'function' && !process.versions.electron) {
    hkdf = async (...args) => new Promise((resolve, reject) => {
        crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf(...args, (err, arrayBuffer) => {
            if (err)
                reject(err);
            else
                resolve(new Uint8Array(arrayBuffer));
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (digest, ikm, salt, info, keylen) => (hkdf || _fallback_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(digest, ikm, salt, info, keylen));


/***/ }),

/***/ 800022:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ assertConfig)
/* harmony export */ });
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(269806);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);


let warned = false;
function isValidHttpUrl(url, baseUrl) {
    try {
        return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
    }
    catch {
        return false;
    }
}
function isSemverString(version) {
    return /^v\d+(?:\.\d+){0,2}$/.test(version);
}
let hasCredentials = false;
let hasEmail = false;
let hasWebAuthn = false;
const emailMethods = [
    "createVerificationToken",
    "useVerificationToken",
    "getUserByEmail",
];
const sessionMethods = [
    "createUser",
    "getUser",
    "getUserByEmail",
    "getUserByAccount",
    "updateUser",
    "linkAccount",
    "createSession",
    "getSessionAndUser",
    "updateSession",
    "deleteSession",
];
const webauthnMethods = [
    "createUser",
    "getUser",
    "linkAccount",
    "getAccount",
    "getAuthenticator",
    "createAuthenticator",
    "listAuthenticatorsByUserId",
    "updateAuthenticatorCounter",
];
/**
 * Verify that the user configured Auth.js correctly.
 * Good place to mention deprecations as well.
 *
 * This is invoked before the init method, so default values are not available yet.
 */
function assertConfig(request, options) {
    const { url } = request;
    const warnings = [];
    if (!warned && options.debug)
        warnings.push("debug-enabled");
    if (!options.trustHost) {
        return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UntrustedHost */ .tP(`Host must be trusted. URL was: ${request.url}`);
    }
    if (!options.secret?.length) {
        return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingSecret */ .jo("Please define a `secret`");
    }
    const callbackUrlParam = request.query?.callbackUrl;
    if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
        return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .InvalidCallbackUrl */ .me(`Invalid callback URL. Received: ${callbackUrlParam}`);
    }
    const { callbackUrl: defaultCallbackUrl } = (0,_cookie_js__WEBPACK_IMPORTED_MODULE_0__/* .defaultCookies */ .X)(options.useSecureCookies ?? url.protocol === "https:");
    const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
    if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
        return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .InvalidCallbackUrl */ .me(`Invalid callback URL. Received: ${callbackUrlCookie}`);
    }
    // Keep track of webauthn providers that use conditional UI
    let hasConditionalUIProvider = false;
    for (const p of options.providers) {
        const provider = typeof p === "function" ? p() : p;
        if ((provider.type === "oauth" || provider.type === "oidc") &&
            !(provider.issuer ?? provider.options?.issuer)) {
            const { authorization: a, token: t, userinfo: u } = provider;
            let key;
            if (typeof a !== "string" && !a?.url)
                key = "authorization";
            else if (typeof t !== "string" && !t?.url)
                key = "token";
            else if (typeof u !== "string" && !u?.url)
                key = "userinfo";
            if (key) {
                return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .InvalidEndpoints */ .gs(`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required`);
            }
        }
        if (provider.type === "credentials")
            hasCredentials = true;
        else if (provider.type === "email")
            hasEmail = true;
        else if (provider.type === "webauthn") {
            hasWebAuthn = true;
            // Validate simpleWebAuthnBrowserVersion
            if (provider.simpleWebAuthnBrowserVersion &&
                !isSemverString(provider.simpleWebAuthnBrowserVersion)) {
                return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .AuthError */ .lR(`Invalid provider config for "${provider.id}": simpleWebAuthnBrowserVersion "${provider.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
            }
            if (provider.enableConditionalUI) {
                // Make sure only one webauthn provider has "enableConditionalUI" set to true
                if (hasConditionalUIProvider) {
                    return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .DuplicateConditionalUI */ .s5(`Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time`);
                }
                hasConditionalUIProvider = true;
                // Make sure at least one formField has "webauthn" in its autocomplete param
                const hasWebauthnFormField = Object.values(provider.formFields).some((f) => f.autocomplete && f.autocomplete.toString().indexOf("webauthn") > -1);
                if (!hasWebauthnFormField) {
                    return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingWebAuthnAutocomplete */ .nd(`Provider "${provider.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
                }
            }
        }
    }
    if (hasCredentials) {
        const dbStrategy = options.session?.strategy === "database";
        const onlyCredentials = !options.providers.some((p) => (typeof p === "function" ? p() : p).type !== "credentials");
        if (dbStrategy && onlyCredentials) {
            return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .UnsupportedStrategy */ .Lx("Signing in with credentials only supported if JWT strategy is enabled");
        }
        const credentialsNoAuthorize = options.providers.some((p) => {
            const provider = typeof p === "function" ? p() : p;
            return provider.type === "credentials" && !provider.authorize;
        });
        if (credentialsNoAuthorize) {
            return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingAuthorize */ .u$("Must define an authorize() handler to use credentials authentication provider");
        }
    }
    const { adapter, session } = options;
    const requiredMethods = [];
    if (hasEmail ||
        session?.strategy === "database" ||
        (!session?.strategy && adapter)) {
        if (hasEmail) {
            if (!adapter)
                return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingAdapter */ .OZ("Email login requires an adapter");
            requiredMethods.push(...emailMethods);
        }
        else {
            if (!adapter)
                return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingAdapter */ .OZ("Database session requires an adapter");
            requiredMethods.push(...sessionMethods);
        }
    }
    if (hasWebAuthn) {
        // Log experimental warning
        if (options.experimental?.enableWebAuthn) {
            warnings.push("experimental-webauthn");
        }
        else {
            return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ExperimentalFeatureNotEnabled */ .xm("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
        }
        if (!adapter)
            return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingAdapter */ .OZ("WebAuthn requires an adapter");
        requiredMethods.push(...webauthnMethods);
    }
    if (adapter) {
        const missing = requiredMethods.filter((m) => !(m in adapter));
        if (missing.length) {
            return new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .MissingAdapterMethods */ .i8(`Required adapter methods were missing: ${missing.join(", ")}`);
        }
    }
    if (!warned)
        warned = true;
    return warnings;
}


/***/ }),

/***/ 820660:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SignoutPage)
/* harmony export */ });
/* harmony import */ var preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(896649);

function SignoutPage(props) {
    const { url, csrfToken, theme } = props;
    return ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "signout", children: [theme?.brandColor && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `,
                } })), theme?.buttonText && ((0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("style", { dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `,
                } })), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("div", { className: "card", children: [theme?.logo && (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("img", { src: theme.logo, alt: "Logo", className: "logo" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("h1", { children: "Signout" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("p", { children: "Are you sure you want to sign out?" }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsxs */ .FD)("form", { action: url?.toString(), method: "POST", children: [(0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("input", { type: "hidden", name: "csrfToken", value: csrfToken }), (0,preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .Y)("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] }));
}


/***/ }),

/***/ 834013:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   UD: () => (/* binding */ compare)
/* harmony export */ });
/* unused harmony exports setRandomFallback, genSaltSync, genSalt, hashSync, hash, compareSync, getRounds, getSalt, truncates, encodeBase64, decodeBase64 */
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/*
 Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
 Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
 Copyright (c) 2025 Daniel Wirtz <dcode@dcode.io>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// The Node.js crypto module is used as a fallback for the Web Crypto API. When
// building for the browser, inclusion of the crypto module should be disabled,
// which the package hints at in its package.json for bundlers that support it.


/**
 * The random implementation to use as a fallback.
 * @type {?function(number):!Array.<number>}
 * @inner
 */
var randomFallback = null;

/**
 * Generates cryptographically secure random bytes.
 * @function
 * @param {number} len Bytes length
 * @returns {!Array.<number>} Random bytes
 * @throws {Error} If no random implementation is available
 * @inner
 */
function randomBytes(len) {
  // Web Crypto API. Globally available in the browser and in Node.js >=23.
  try {
    return crypto.getRandomValues(new Uint8Array(len));
  } catch {}
  // Node.js crypto module for non-browser environments.
  try {
    return crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes(len);
  } catch {}
  // Custom fallback specified with `setRandomFallback`.
  if (!randomFallback) {
    throw Error(
      "Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative",
    );
  }
  return randomFallback(len);
}

/**
 * Sets the pseudo random number generator to use as a fallback if neither node's `crypto` module nor the Web Crypto
 *  API is available. Please note: It is highly important that the PRNG used is cryptographically secure and that it
 *  is seeded properly!
 * @param {?function(number):!Array.<number>} random Function taking the number of bytes to generate as its
 *  sole argument, returning the corresponding array of cryptographically secure random byte values.
 * @see http://nodejs.org/api/crypto.html
 * @see http://www.w3.org/TR/WebCryptoAPI/
 */
function setRandomFallback(random) {
  randomFallback = random;
}

/**
 * Synchronously generates a salt.
 * @param {number=} rounds Number of rounds to use, defaults to 10 if omitted
 * @param {number=} seed_length Not supported.
 * @returns {string} Resulting salt
 * @throws {Error} If a random fallback is required but not set
 */
function genSaltSync(rounds, seed_length) {
  rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof rounds !== "number")
    throw Error(
      "Illegal arguments: " + typeof rounds + ", " + typeof seed_length,
    );
  if (rounds < 4) rounds = 4;
  else if (rounds > 31) rounds = 31;
  var salt = [];
  salt.push("$2b$");
  if (rounds < 10) salt.push("0");
  salt.push(rounds.toString());
  salt.push("$");
  salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
  return salt.join("");
}

/**
 * Asynchronously generates a salt.
 * @param {(number|function(Error, string=))=} rounds Number of rounds to use, defaults to 10 if omitted
 * @param {(number|function(Error, string=))=} seed_length Not supported.
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting salt
 * @returns {!Promise} If `callback` has been omitted
 * @throws {Error} If `callback` is present but not a function
 */
function genSalt(rounds, seed_length, callback) {
  if (typeof seed_length === "function")
    (callback = seed_length), (seed_length = undefined); // Not supported.
  if (typeof rounds === "function") (callback = rounds), (rounds = undefined);
  if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
  else if (typeof rounds !== "number")
    throw Error("illegal arguments: " + typeof rounds);

  function _async(callback) {
    nextTick(function () {
      // Pretty thin, but salting is fast enough
      try {
        callback(null, genSaltSync(rounds));
      } catch (err) {
        callback(err);
      }
    });
  }

  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function (resolve, reject) {
      _async(function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}

/**
 * Synchronously generates a hash for the given password.
 * @param {string} password Password to hash
 * @param {(number|string)=} salt Salt length to generate or salt to use, default to 10
 * @returns {string} Resulting hash
 */
function hashSync(password, salt) {
  if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof salt === "number") salt = genSaltSync(salt);
  if (typeof password !== "string" || typeof salt !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
  return _hash(password, salt);
}

/**
 * Asynchronously generates a hash for the given password.
 * @param {string} password Password to hash
 * @param {number|string} salt Salt length to generate or salt to use
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash
 * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
 *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
 * @returns {!Promise} If `callback` has been omitted
 * @throws {Error} If `callback` is present but not a function
 */
function hash(password, salt, callback, progressCallback) {
  function _async(callback) {
    if (typeof password === "string" && typeof salt === "number")
      genSalt(salt, function (err, salt) {
        _hash(password, salt, callback, progressCallback);
      });
    else if (typeof password === "string" && typeof salt === "string")
      _hash(password, salt, callback, progressCallback);
    else
      nextTick(
        callback.bind(
          this,
          Error("Illegal arguments: " + typeof password + ", " + typeof salt),
        ),
      );
  }

  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function (resolve, reject) {
      _async(function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}

/**
 * Compares two strings of the same length in constant time.
 * @param {string} known Must be of the correct length
 * @param {string} unknown Must be the same length as `known`
 * @returns {boolean}
 * @inner
 */
function safeStringCompare(known, unknown) {
  var diff = known.length ^ unknown.length;
  for (var i = 0; i < known.length; ++i) {
    diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Synchronously tests a password against a hash.
 * @param {string} password Password to compare
 * @param {string} hash Hash to test against
 * @returns {boolean} true if matching, otherwise false
 * @throws {Error} If an argument is illegal
 */
function compareSync(password, hash) {
  if (typeof password !== "string" || typeof hash !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
  if (hash.length !== 60) return false;
  return safeStringCompare(
    hashSync(password, hash.substring(0, hash.length - 31)),
    hash,
  );
}

/**
 * Asynchronously tests a password against a hash.
 * @param {string} password Password to compare
 * @param {string} hashValue Hash to test against
 * @param {function(Error, boolean)=} callback Callback receiving the error, if any, otherwise the result
 * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
 *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
 * @returns {!Promise} If `callback` has been omitted
 * @throws {Error} If `callback` is present but not a function
 */
function compare(password, hashValue, callback, progressCallback) {
  function _async(callback) {
    if (typeof password !== "string" || typeof hashValue !== "string") {
      nextTick(
        callback.bind(
          this,
          Error(
            "Illegal arguments: " + typeof password + ", " + typeof hashValue,
          ),
        ),
      );
      return;
    }
    if (hashValue.length !== 60) {
      nextTick(callback.bind(this, null, false));
      return;
    }
    hash(
      password,
      hashValue.substring(0, 29),
      function (err, comp) {
        if (err) callback(err);
        else callback(null, safeStringCompare(comp, hashValue));
      },
      progressCallback,
    );
  }

  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function (resolve, reject) {
      _async(function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}

/**
 * Gets the number of rounds used to encrypt the specified hash.
 * @param {string} hash Hash to extract the used number of rounds from
 * @returns {number} Number of rounds used
 * @throws {Error} If `hash` is not a string
 */
function getRounds(hash) {
  if (typeof hash !== "string")
    throw Error("Illegal arguments: " + typeof hash);
  return parseInt(hash.split("$")[2], 10);
}

/**
 * Gets the salt portion from a hash. Does not validate the hash.
 * @param {string} hash Hash to extract the salt from
 * @returns {string} Extracted salt part
 * @throws {Error} If `hash` is not a string or otherwise invalid
 */
function getSalt(hash) {
  if (typeof hash !== "string")
    throw Error("Illegal arguments: " + typeof hash);
  if (hash.length !== 60)
    throw Error("Illegal hash length: " + hash.length + " != 60");
  return hash.substring(0, 29);
}

/**
 * Tests if a password will be truncated when hashed, that is its length is
 * greater than 72 bytes when converted to UTF-8.
 * @param {string} password The password to test
 * @returns {boolean} `true` if truncated, otherwise `false`
 */
function truncates(password) {
  if (typeof password !== "string")
    throw Error("Illegal arguments: " + typeof password);
  return utf8Length(password) > 72;
}

/**
 * Continues with the callback after yielding to the event loop.
 * @function
 * @param {function(...[*])} callback Callback to execute
 * @inner
 */
var nextTick =
  typeof setImmediate === "function"
    ? setImmediate
    : typeof scheduler === "object" && typeof scheduler.postTask === "function"
      ? scheduler.postTask.bind(scheduler)
      : setTimeout;

/** Calculates the byte length of a string encoded as UTF8. */
function utf8Length(string) {
  var len = 0,
    c = 0;
  for (var i = 0; i < string.length; ++i) {
    c = string.charCodeAt(i);
    if (c < 128) len += 1;
    else if (c < 2048) len += 2;
    else if (
      (c & 0xfc00) === 0xd800 &&
      (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00
    ) {
      ++i;
      len += 4;
    } else len += 3;
  }
  return len;
}

/** Converts a string to an array of UTF8 bytes. */
function utf8Array(string) {
  var offset = 0,
    c1,
    c2;
  var buffer = new Array(utf8Length(string));
  for (var i = 0, k = string.length; i < k; ++i) {
    c1 = string.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = (c1 >> 6) | 192;
      buffer[offset++] = (c1 & 63) | 128;
    } else if (
      (c1 & 0xfc00) === 0xd800 &&
      ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00
    ) {
      c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
      ++i;
      buffer[offset++] = (c1 >> 18) | 240;
      buffer[offset++] = ((c1 >> 12) & 63) | 128;
      buffer[offset++] = ((c1 >> 6) & 63) | 128;
      buffer[offset++] = (c1 & 63) | 128;
    } else {
      buffer[offset++] = (c1 >> 12) | 224;
      buffer[offset++] = ((c1 >> 6) & 63) | 128;
      buffer[offset++] = (c1 & 63) | 128;
    }
  }
  return buffer;
}

// A base64 implementation for the bcrypt algorithm. This is partly non-standard.

/**
 * bcrypt's own non-standard base64 dictionary.
 * @type {!Array.<string>}
 * @const
 * @inner
 **/
var BASE64_CODE =
  "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

/**
 * @type {!Array.<number>}
 * @const
 * @inner
 **/
var BASE64_INDEX = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
  -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28,
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1,
];

/**
 * Encodes a byte array to base64 with up to len bytes of input.
 * @param {!Array.<number>} b Byte array
 * @param {number} len Maximum input length
 * @returns {string}
 * @inner
 */
function base64_encode(b, len) {
  var off = 0,
    rs = [],
    c1,
    c2;
  if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
  while (off < len) {
    c1 = b[off++] & 0xff;
    rs.push(BASE64_CODE[(c1 >> 2) & 0x3f]);
    c1 = (c1 & 0x03) << 4;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 0x3f]);
      break;
    }
    c2 = b[off++] & 0xff;
    c1 |= (c2 >> 4) & 0x0f;
    rs.push(BASE64_CODE[c1 & 0x3f]);
    c1 = (c2 & 0x0f) << 2;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 0x3f]);
      break;
    }
    c2 = b[off++] & 0xff;
    c1 |= (c2 >> 6) & 0x03;
    rs.push(BASE64_CODE[c1 & 0x3f]);
    rs.push(BASE64_CODE[c2 & 0x3f]);
  }
  return rs.join("");
}

/**
 * Decodes a base64 encoded string to up to len bytes of output.
 * @param {string} s String to decode
 * @param {number} len Maximum output length
 * @returns {!Array.<number>}
 * @inner
 */
function base64_decode(s, len) {
  var off = 0,
    slen = s.length,
    olen = 0,
    rs = [],
    c1,
    c2,
    c3,
    c4,
    o,
    code;
  if (len <= 0) throw Error("Illegal len: " + len);
  while (off < slen - 1 && olen < len) {
    code = s.charCodeAt(off++);
    c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s.charCodeAt(off++);
    c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c2 == -1) break;
    o = (c1 << 2) >>> 0;
    o |= (c2 & 0x30) >> 4;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c3 == -1) break;
    o = ((c2 & 0x0f) << 4) >>> 0;
    o |= (c3 & 0x3c) >> 2;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o = ((c3 & 0x03) << 6) >>> 0;
    o |= c4;
    rs.push(String.fromCharCode(o));
    ++olen;
  }
  var res = [];
  for (off = 0; off < olen; off++) res.push(rs[off].charCodeAt(0));
  return res;
}

/**
 * @type {number}
 * @const
 * @inner
 */
var BCRYPT_SALT_LEN = 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var GENSALT_DEFAULT_LOG2_ROUNDS = 10;

/**
 * @type {number}
 * @const
 * @inner
 */
var BLOWFISH_NUM_ROUNDS = 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var MAX_EXECUTION_TIME = 100;

/**
 * @type {Array.<number>}
 * @const
 * @inner
 */
var P_ORIG = [
  0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822, 0x299f31d0,
  0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c,
  0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5, 0xb5470917, 0x9216d5d9, 0x8979fb1b,
];

/**
 * @type {Array.<number>}
 * @const
 * @inner
 */
var S_ORIG = [
  0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed, 0x6a267e96,
  0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7, 0x0801f2e2, 0x858efc16,
  0x636920d8, 0x71574e69, 0xa458fea3, 0xf4933d7e, 0x0d95748f, 0x728eb658,
  0x718bcd58, 0x82154aee, 0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013,
  0xc5d1b023, 0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
  0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda, 0x55605c60,
  0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440, 0x55ca396a, 0x2aab10b6,
  0xb4cc5c34, 0x1141e8ce, 0xa15486af, 0x7c72e993, 0xb3ee1411, 0x636fbc2a,
  0x2ba9c55d, 0x741831f6, 0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c,
  0x7a325381, 0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
  0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d, 0xe98575b1,
  0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5, 0x0f6d6ff3, 0x83f44239,
  0x2e0b4482, 0xa4842004, 0x69c8f04a, 0x9e1f9b5e, 0x21c66842, 0xf6e96c9a,
  0x670c9c61, 0xabd388f0, 0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3,
  0x6eef0b6c, 0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
  0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3, 0x3b8b5ebe,
  0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6, 0x4ed3aa62, 0x363f7706,
  0x1bfedf72, 0x429b023d, 0x37d0d724, 0xd00a1248, 0xdb0fead3, 0x49f1c09b,
  0x075372c9, 0x80991b7b, 0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b,
  0x976ce0bd, 0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
  0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f, 0x9b30952c,
  0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd, 0x660f2807, 0x192e4bb3,
  0xc0cba857, 0x45c8740f, 0xd20b5f39, 0xb9d3fbdb, 0x5579c0bd, 0x1a60320a,
  0xd6a100c6, 0x402c7279, 0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8,
  0x3c7516df, 0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
  0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e, 0xdf1769db,
  0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573, 0x695b27b0, 0xbbca58c8,
  0xe1ffa35d, 0xb8f011a0, 0x10fa3d98, 0xfd2183b8, 0x4afcb56c, 0x2dd1d35b,
  0x9a53e479, 0xb6f84565, 0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33,
  0x62fb1341, 0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
  0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0, 0xafc725e0,
  0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64, 0x8888b812, 0x900df01c,
  0x4fad5ea0, 0x688fc31c, 0xd1cff191, 0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777,
  0xea752dfe, 0x8b021fa1, 0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299,
  0xb4a84fe0, 0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
  0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5, 0xfb9d35cf,
  0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49, 0x00250e2d, 0x2071b35e,
  0x226800bb, 0x57b8e0af, 0x2464369b, 0xf009b91e, 0x5563911d, 0x59dfa6aa,
  0x78c14389, 0xd95a537f, 0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9,
  0x11c81968, 0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
  0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5, 0x571be91f,
  0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6, 0xff34052e, 0xc5855664,
  0x53b02d5d, 0xa99f8fa1, 0x08ba4799, 0x6e85076a, 0x4b7a70e9, 0xb5b32944,
  0xdb75092e, 0xc4192623, 0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266,
  0xecaa8c71, 0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
  0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6, 0x99f73fd6,
  0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1, 0x4cdd2086, 0x8470eb26,
  0x6382e9c6, 0x021ecc5e, 0x09686b3f, 0x3ebaefc9, 0x3c971814, 0x6b6a70a1,
  0x687f3584, 0x52a0e286, 0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c,
  0x8e7d44ec, 0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
  0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9, 0x7ca92ff6,
  0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc, 0xc8b57634, 0x9af3dda7,
  0xa9446146, 0x0fd0030e, 0xecc8c73e, 0xa4751e41, 0xe238cd99, 0x3bea0e2f,
  0x3280bba1, 0x183eb331, 0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf,
  0x2cb81290, 0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
  0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6, 0x9f84cd87,
  0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c, 0xec7aec3a, 0xdb851dfa,
  0x63094366, 0xc464c3d2, 0xef1c1847, 0x3215d908, 0xdd433b37, 0x24c2ba16,
  0x12a14d43, 0x2a65c451, 0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55,
  0x81ac77d6, 0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
  0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570, 0xeae96fb1,
  0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa, 0x2965dcb9, 0x99e71d0f,
  0x803e89d6, 0x5266c825, 0x2e4cc978, 0x9c10b36a, 0xc6150eba, 0x94e2ea78,
  0xa5fc3c53, 0x1e0a2df4, 0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960,
  0x5223a708, 0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
  0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185, 0x68ab9802,
  0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84, 0x1521b628, 0x29076170,
  0xecdd4775, 0x619f1510, 0x13cca830, 0xeb61bd96, 0x0334fe1e, 0xaa0363cf,
  0xb5735c90, 0x4c70a239, 0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7,
  0x9cab5cab, 0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
  0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19, 0x875fa099,
  0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77, 0x11ed935f, 0x16681281,
  0x0e358829, 0xc7e61fd6, 0x96dedfa1, 0x7858ba99, 0x57f584a5, 0x1b227263,
  0x9b83c3ff, 0x1ac24696, 0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128,
  0x58ebf2ef, 0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
  0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15, 0xfacb4fd0,
  0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105, 0xd81e799e, 0x86854dc7,
  0xe44b476a, 0x3d816250, 0xcf62a1f2, 0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3,
  0x7f1524c3, 0x69cb7492, 0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d,
  0x1462b174, 0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
  0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759, 0xcbee7460,
  0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e, 0xe8efd855, 0x61d99735,
  0xa969a7aa, 0xc50c06c2, 0x5a04abfc, 0x800bcadc, 0x9e447a2e, 0xc3453484,
  0xfdd56705, 0x0e1e9ec9, 0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340,
  0xc5c43465, 0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
  0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c, 0x94692934,
  0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068, 0xd4082471, 0x3320f46a,
  0x43b7d4b7, 0x500061af, 0x1e39f62e, 0x97244546, 0x14214f74, 0xbf8b8840,
  0x4d95fc1d, 0x96b591af, 0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785,
  0x7fac6dd0, 0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
  0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462, 0xd7486900,
  0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c, 0xb58ce006, 0x7af4d6b6,
  0xaace1e7c, 0xd3375fec, 0xce78a399, 0x406b2a42, 0x20fe9e35, 0xd9f385b9,
  0xee39d7ab, 0x3b124e8b, 0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2,
  0x3a6efa74, 0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
  0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7, 0xd096954b,
  0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33, 0xa62a4a56, 0x3f3125f9,
  0x5ef47e1c, 0x9029317c, 0xfdf8e802, 0x04272f70, 0x80bb155c, 0x05282ce3,
  0x95c11548, 0xe4c66d22, 0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f,
  0x404779a4, 0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
  0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2, 0x02e1329e,
  0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1, 0x3b240b62, 0xeebeb922,
  0x85b2a20e, 0xe6ba0d99, 0xde720c8c, 0x2da2f728, 0xd0127845, 0x95b794fd,
  0x647d0862, 0xe7ccf5f0, 0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e,
  0x0a476341, 0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
  0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b, 0xdcd0e804,
  0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b, 0x667b9ffb, 0xcedb7d9c,
  0xa091cf0b, 0xd9155ea3, 0xbb132f88, 0x515bad24, 0x7b9479bf, 0x763bd6eb,
  0x37392eb3, 0xcc115979, 0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b,
  0x12754ccc, 0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
  0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659, 0x0a121386,
  0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f, 0xbebfe988, 0x64e4c3fe,
  0x9dbc8057, 0xf0f7c086, 0x60787bf8, 0x6003604d, 0xd1fd8346, 0xf6381fb0,
  0x7745ae04, 0xd736fccc, 0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f,
  0x77a057be, 0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
  0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255, 0x46fcd9b9,
  0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2, 0x466e598e, 0x20b45770,
  0x8cd55591, 0xc902de4c, 0xb90bace1, 0xbb8205d0, 0x11a86248, 0x7574a99e,
  0xb77f19b6, 0xe0a9dc09, 0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c,
  0x4a99a025, 0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
  0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01, 0xa70683fa,
  0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641, 0xc3604c06, 0x61a806b5,
  0xf0177a28, 0xc0f586e0, 0x006058aa, 0x30dc7d62, 0x11e69ed7, 0x2338ea63,
  0x53c2dd94, 0xc2c21634, 0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76,
  0x6f05e409, 0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
  0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3, 0x4dad0fc4,
  0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c, 0x6fd5c7e7, 0x56e14ec4,
  0x362abfce, 0xddc6c837, 0xd79a3234, 0x92638212, 0x670efa8e, 0x406000e0,
  0x3a39ce37, 0xd3faf5cf, 0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742,
  0xd3822740, 0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
  0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f, 0xbc946e79,
  0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d, 0xd5730a1d, 0x4cd04dc6,
  0x2939bbdb, 0xa9ba4650, 0xac9526e8, 0xbe5ee304, 0xa1fad5f0, 0x6a2d519a,
  0x63ef8ce2, 0x9a86ee22, 0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4,
  0x83c061ba, 0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
  0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69, 0x77fa0a59,
  0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593, 0xe990fd5a, 0x9e34d797,
  0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a, 0x017da67d, 0xd1cf3ed6, 0x7c7d2d28,
  0x1f9f25cf, 0xadf2b89b, 0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6,
  0x47b0acfd, 0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
  0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4, 0x88f46dba,
  0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2, 0x97271aec, 0xa93a072a,
  0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb, 0x26dcf319, 0x7533d928, 0xb155fdf5,
  0x03563482, 0x8aba3cbb, 0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f,
  0x4de81751, 0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
  0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369, 0x6413e680,
  0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166, 0xb39a460a, 0x6445c0dd,
  0x586cdecf, 0x1c20c8ae, 0x5bbef7dd, 0x1b588d40, 0xccd2017f, 0x6bb4e3bb,
  0xdda26a7e, 0x3a59ff45, 0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb,
  0x8d6612ae, 0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
  0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08, 0x4eb4e2cc,
  0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d, 0x06b89fb4, 0xce6ea048,
  0x6f3f3b82, 0x3520ab82, 0x011a1d4b, 0x277227f8, 0x611560b1, 0xe7933fdc,
  0xbb3a792b, 0x344525bd, 0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9,
  0xe01cc87e, 0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
  0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c, 0xe0b12b4f,
  0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c, 0xbf97222c, 0x15e6fc2a,
  0x0f91fc71, 0x9b941525, 0xfae59361, 0xceb69ceb, 0xc2a86459, 0x12baa8d1,
  0xb6c1075e, 0xe3056a0c, 0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b,
  0x4c98a0be, 0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
  0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d, 0x9b992f2e,
  0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891, 0xce6279cf, 0xcd3e7e6f,
  0x1618b166, 0xfd2c1d05, 0x848fd2c5, 0xf6fb2299, 0xf523f357, 0xa6327623,
  0x93a83531, 0x56cccd02, 0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc,
  0xde966292, 0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
  0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2, 0x35bdd2f6,
  0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b, 0x53113ec0, 0x1640e3d3,
  0x38abbd60, 0x2547adf0, 0xba38209c, 0xf746ce76, 0x77afa1c5, 0x20756060,
  0x85cbfe4e, 0x8ae88dd8, 0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c,
  0x01c36ae4, 0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
  0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6,
];

/**
 * @type {Array.<number>}
 * @const
 * @inner
 */
var C_ORIG = [
  0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253, 0x63727944, 0x6f756274,
];

/**
 * @param {Array.<number>} lr
 * @param {number} off
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @returns {Array.<number>}
 * @inner
 */
function _encipher(lr, off, P, S) {
  // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
  var n,
    l = lr[off],
    r = lr[off + 1];

  l ^= P[0];

  /*
    for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
        // Feistel substitution on left word
        n  = S[l >>> 24],
        n += S[0x100 | ((l >> 16) & 0xff)],
        n ^= S[0x200 | ((l >> 8) & 0xff)],
        n += S[0x300 | (l & 0xff)],
        r ^= n ^ P[++i],
        // Feistel substitution on right word
        n  = S[r >>> 24],
        n += S[0x100 | ((r >> 16) & 0xff)],
        n ^= S[0x200 | ((r >> 8) & 0xff)],
        n += S[0x300 | (r & 0xff)],
        l ^= n ^ P[++i];
    */

  //The following is an unrolled version of the above loop.
  //Iteration 0
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[1];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[2];
  //Iteration 1
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[3];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[4];
  //Iteration 2
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[5];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[6];
  //Iteration 3
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[7];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[8];
  //Iteration 4
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[9];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[10];
  //Iteration 5
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[11];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[12];
  //Iteration 6
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[13];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[14];
  //Iteration 7
  n = S[l >>> 24];
  n += S[0x100 | ((l >> 16) & 0xff)];
  n ^= S[0x200 | ((l >> 8) & 0xff)];
  n += S[0x300 | (l & 0xff)];
  r ^= n ^ P[15];
  n = S[r >>> 24];
  n += S[0x100 | ((r >> 16) & 0xff)];
  n ^= S[0x200 | ((r >> 8) & 0xff)];
  n += S[0x300 | (r & 0xff)];
  l ^= n ^ P[16];

  lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
  lr[off + 1] = l;
  return lr;
}

/**
 * @param {Array.<number>} data
 * @param {number} offp
 * @returns {{key: number, offp: number}}
 * @inner
 */
function _streamtoword(data, offp) {
  for (var i = 0, word = 0; i < 4; ++i)
    (word = (word << 8) | (data[offp] & 0xff)),
      (offp = (offp + 1) % data.length);
  return { key: word, offp: offp };
}

/**
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */
function _key(key, P, S) {
  var offset = 0,
    lr = [0, 0],
    plen = P.length,
    slen = S.length,
    sw;
  for (var i = 0; i < plen; i++)
    (sw = _streamtoword(key, offset)),
      (offset = sw.offp),
      (P[i] = P[i] ^ sw.key);
  for (i = 0; i < plen; i += 2)
    (lr = _encipher(lr, 0, P, S)), (P[i] = lr[0]), (P[i + 1] = lr[1]);
  for (i = 0; i < slen; i += 2)
    (lr = _encipher(lr, 0, P, S)), (S[i] = lr[0]), (S[i + 1] = lr[1]);
}

/**
 * Expensive key schedule Blowfish.
 * @param {Array.<number>} data
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */
function _ekskey(data, key, P, S) {
  var offp = 0,
    lr = [0, 0],
    plen = P.length,
    slen = S.length,
    sw;
  for (var i = 0; i < plen; i++)
    (sw = _streamtoword(key, offp)), (offp = sw.offp), (P[i] = P[i] ^ sw.key);
  offp = 0;
  for (i = 0; i < plen; i += 2)
    (sw = _streamtoword(data, offp)),
      (offp = sw.offp),
      (lr[0] ^= sw.key),
      (sw = _streamtoword(data, offp)),
      (offp = sw.offp),
      (lr[1] ^= sw.key),
      (lr = _encipher(lr, 0, P, S)),
      (P[i] = lr[0]),
      (P[i + 1] = lr[1]);
  for (i = 0; i < slen; i += 2)
    (sw = _streamtoword(data, offp)),
      (offp = sw.offp),
      (lr[0] ^= sw.key),
      (sw = _streamtoword(data, offp)),
      (offp = sw.offp),
      (lr[1] ^= sw.key),
      (lr = _encipher(lr, 0, P, S)),
      (S[i] = lr[0]),
      (S[i + 1] = lr[1]);
}

/**
 * Internaly crypts a string.
 * @param {Array.<number>} b Bytes to crypt
 * @param {Array.<number>} salt Salt bytes to use
 * @param {number} rounds Number of rounds
 * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
 *  omitted, the operation will be performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
 * @inner
 */
function _crypt(b, salt, rounds, callback, progressCallback) {
  var cdata = C_ORIG.slice(),
    clen = cdata.length,
    err;

  // Validate
  if (rounds < 4 || rounds > 31) {
    err = Error("Illegal number of rounds (4-31): " + rounds);
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.length !== BCRYPT_SALT_LEN) {
    err = Error(
      "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN,
    );
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  rounds = (1 << rounds) >>> 0;

  var P,
    S,
    i = 0,
    j;

  //Use typed arrays when available - huge speedup!
  if (typeof Int32Array === "function") {
    P = new Int32Array(P_ORIG);
    S = new Int32Array(S_ORIG);
  } else {
    P = P_ORIG.slice();
    S = S_ORIG.slice();
  }

  _ekskey(salt, b, P, S);

  /**
   * Calcualtes the next round.
   * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
   * @inner
   */
  function next() {
    if (progressCallback) progressCallback(i / rounds);
    if (i < rounds) {
      var start = Date.now();
      for (; i < rounds; ) {
        i = i + 1;
        _key(b, P, S);
        _key(salt, P, S);
        if (Date.now() - start > MAX_EXECUTION_TIME) break;
      }
    } else {
      for (i = 0; i < 64; i++)
        for (j = 0; j < clen >> 1; j++) _encipher(cdata, j << 1, P, S);
      var ret = [];
      for (i = 0; i < clen; i++)
        ret.push(((cdata[i] >> 24) & 0xff) >>> 0),
          ret.push(((cdata[i] >> 16) & 0xff) >>> 0),
          ret.push(((cdata[i] >> 8) & 0xff) >>> 0),
          ret.push((cdata[i] & 0xff) >>> 0);
      if (callback) {
        callback(null, ret);
        return;
      } else return ret;
    }
    if (callback) nextTick(next);
  }

  // Async
  if (typeof callback !== "undefined") {
    next();

    // Sync
  } else {
    var res;
    while (true) if (typeof (res = next()) !== "undefined") return res || [];
  }
}

/**
 * Internally hashes a password.
 * @param {string} password Password to hash
 * @param {?string} salt Salt to use, actually never null
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
 *  hashing is performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
 * @inner
 */
function _hash(password, salt, callback, progressCallback) {
  var err;
  if (typeof password !== "string" || typeof salt !== "string") {
    err = Error("Invalid string / salt: Not a string");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }

  // Validate the salt
  var minor, offset;
  if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
    err = Error("Invalid salt version: " + salt.substring(0, 2));
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.charAt(2) === "$") (minor = String.fromCharCode(0)), (offset = 3);
  else {
    minor = salt.charAt(2);
    if (
      (minor !== "a" && minor !== "b" && minor !== "y") ||
      salt.charAt(3) !== "$"
    ) {
      err = Error("Invalid salt revision: " + salt.substring(2, 4));
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    offset = 4;
  }

  // Extract number of rounds
  if (salt.charAt(offset + 2) > "$") {
    err = Error("Missing salt rounds");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10,
    r2 = parseInt(salt.substring(offset + 1, offset + 2), 10),
    rounds = r1 + r2,
    real_salt = salt.substring(offset + 3, offset + 25);
  password += minor >= "a" ? "\x00" : "";

  var passwordb = utf8Array(password),
    saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);

  /**
   * Finishes hashing.
   * @param {Array.<number>} bytes Byte array
   * @returns {string}
   * @inner
   */
  function finish(bytes) {
    var res = [];
    res.push("$2");
    if (minor >= "a") res.push(minor);
    res.push("$");
    if (rounds < 10) res.push("0");
    res.push(rounds.toString());
    res.push("$");
    res.push(base64_encode(saltb, saltb.length));
    res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
    return res.join("");
  }

  // Sync
  if (typeof callback == "undefined")
    return finish(_crypt(passwordb, saltb, rounds));
  // Async
  else {
    _crypt(
      passwordb,
      saltb,
      rounds,
      function (err, bytes) {
        if (err) callback(err, null);
        else callback(null, finish(bytes));
      },
      progressCallback,
    );
  }
}

/**
 * Encodes a byte array to base64 with up to len bytes of input, using the custom bcrypt alphabet.
 * @function
 * @param {!Array.<number>} bytes Byte array
 * @param {number} length Maximum input length
 * @returns {string}
 */
function encodeBase64(bytes, length) {
  return base64_encode(bytes, length);
}

/**
 * Decodes a base64 encoded string to up to len bytes of output, using the custom bcrypt alphabet.
 * @function
 * @param {string} string String to decode
 * @param {number} length Maximum output length
 * @returns {!Array.<number>}
 */
function decodeBase64(string, length) {
  return base64_decode(string, length);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setRandomFallback,
  genSaltSync,
  genSalt,
  hashSync,
  hash,
  compareSync,
  compare,
  getRounds,
  getSalt,
  truncates,
  encodeBase64,
  decodeBase64,
});


/***/ }),

/***/ 852283:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return notFound;
    }
}));
const _httpaccessfallback = __webpack_require__(7638);
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E1041",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 864416:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D2: () => (/* binding */ isKeyObject),
/* harmony export */   GK: () => (/* binding */ rawKey),
/* harmony export */   GZ: () => (/* binding */ checkUsage),
/* harmony export */   Ni: () => (/* binding */ checkCryptoKey),
/* harmony export */   P2: () => (/* binding */ isKeyLike),
/* harmony export */   R7: () => (/* binding */ isCryptoKey),
/* harmony export */   Tz: () => (/* binding */ assertCryptoKey),
/* harmony export */   XP: () => (/* binding */ invalidKeyInput),
/* harmony export */   ZZ: () => (/* binding */ snapshotJwk),
/* harmony export */   dT: () => (/* binding */ prepareKey),
/* harmony export */   or: () => (/* binding */ checkModulusLength),
/* harmony export */   xY: () => (/* binding */ jwkToKey)
/* harmony export */ });
/* unused harmony exports normalizeJwk, validateExtractableOption */
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(438805);
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(488888);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(499129);



const tag = (key) => key[Symbol.toStringTag], jwkMatchesOp = (entry, key, usage) => {
  const { alg } = entry;
  if (key.use !== void 0) {
    const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
    if (key.use !== expected)
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
  }
  if (key.alg !== void 0 && key.alg !== alg)
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
  if (Array.isArray(key.key_ops)) {
    const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
    if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp))
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
  }
};
async function prepareKey(entry, key, usage) {
  const { alg, secret } = entry, requiresPrivateKey = usage === "decrypt" || usage === "sign";
  if (secret && key instanceof Uint8Array)
    return key;
  let normalized, keyObject;
  if ((0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(key)) {
    if (normalized = normalizeJwk(key), typeof normalized.kty != "string")
      throw invalidKeyType(alg, key, secret);
    if (!(secret ? normalized.kty === "oct" && typeof normalized.k == "string" : normalized.kty !== "oct" && (requiresPrivateKey ? normalized.kty === "AKP" && typeof normalized.priv == "string" || typeof normalized.d == "string" : normalized.d === void 0 && normalized.priv === void 0)))
      throw new TypeError(secret ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${requiresPrivateKey ? "private" : "public"} JWK`);
    if (jwkMatchesOp(entry, normalized, usage), normalized.kty === "oct")
      return (0,_util_base64url_js__WEBPACK_IMPORTED_MODULE_1__/* .decode */ .D)(normalized.k);
    if (!Object.isFrozen(key)) {
      const { key_ops } = key;
      Array.isArray(key_ops) && Object.freeze(key_ops), Object.freeze(key);
    }
  } else {
    if (!isKeyLike(key))
      throw invalidKeyType(alg, key, secret);
    const expectedType = secret ? "secret" : requiresPrivateKey ? "private" : "public";
    if (key.type !== expectedType && (secret || ["secret", "public", "private"].includes(key.type)))
      throw new TypeError(`${tag(key)} instances must be of type "${expectedType}" for the ${alg} algorithm`);
    if (isCryptoKey(key))
      return key;
    if (keyObject = key, keyObject.type === "secret")
      return keyObject.export();
  }
  cache ||= /* @__PURE__ */ new WeakMap();
  const cacheKey = key;
  let cached = cache.get(cacheKey);
  if (cached?.[alg])
    return cached[alg];
  if (cached || cache.set(cacheKey, cached = {}), keyObject && typeof keyObject.toCryptoKey == "function") {
    const isPublic = keyObject.type === "public", crv = nist[keyObject.asymmetricKeyDetails?.namedCurve], params = entry.resolve?.({ crv, asymmetricKeyType: keyObject.asymmetricKeyType }) ?? entry.subtle;
    return cached[alg] = keyObject.toCryptoKey(params, isPublic, entry.usages[isPublic ? 0 : 1]);
  }
  return normalized ??= keyObject.export({ format: "jwk" }), normalized.alg = alg, cached[alg] = await jwkToKey(entry, normalized);
}
let cache;
const nist = {
  __proto__: null,
  prime256v1: "P-256",
  secp384r1: "P-384",
  secp521r1: "P-521"
};
function assertCryptoKey(key) {
  if (!isCryptoKey(key))
    throw new Error("CryptoKey instance expected");
}
const isCryptoKey = (key) => {
  if (key?.[Symbol.toStringTag] === "CryptoKey")
    return !0;
  try {
    return key instanceof CryptoKey;
  } catch {
    return !1;
  }
}, isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject", isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
function message(msg, actual, ...types) {
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else types.length === 2 ? msg += `one of type ${types[0]} or ${types[1]}.` : msg += `of type ${types[0]}.`;
  return actual == null ? msg += ` Received ${actual}` : typeof actual == "function" && actual.name ? msg += ` Received function ${actual.name}` : typeof actual == "object" && actual != null && actual.constructor?.name && (msg += ` Received an instance of ${actual.constructor.name}`), msg;
}
const invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
function invalidKeyType(alg, actual, secret) {
  const types = ["CryptoKey", "KeyObject", "JSON Web Key"];
  return secret && types.push("Uint8Array"), new TypeError(message(`Key for the ${alg} algorithm must be `, actual, ...types));
}
const unusable = (name, prop = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage))
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkModulusLength(alg, key) {
  const { modulusLength } = key.algorithm;
  if (typeof modulusLength != "number" || modulusLength < 2048)
    throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(key, expected, usage) {
  const algorithm = key.algorithm;
  if (algorithm.name !== expected.name)
    throw unusable(expected.name);
  if (expected.hash && algorithm.hash?.name !== expected.hash)
    throw unusable(expected.hash, "algorithm.hash");
  if (expected.namedCurve && algorithm.namedCurve !== expected.namedCurve)
    throw unusable(expected.namedCurve, "algorithm.namedCurve");
  if (expected.length !== void 0 && algorithm.length !== expected.length)
    throw unusable(expected.length, "algorithm.length");
  checkUsage(key, usage);
}
function snapshotJwk(jwk) {
  return { __proto__: null, ...jwk };
}
function normalizeJwk(jwk) {
  const normalized = snapshotJwk(jwk);
  if (normalized.ext !== void 0 && typeof normalized.ext != "boolean")
    throw new TypeError('"ext" (Extractable) Parameter must be a boolean');
  if (normalized.key_ops !== void 0) {
    const value = normalized.key_ops, keyOps = Array.isArray(value) ? [...value] : void 0;
    if (!keyOps || keyOps.some((operation) => typeof operation != "string") || new Set(keyOps).size !== keyOps.length)
      throw new TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
    normalized.key_ops = keyOps;
  }
  return normalized;
}
function validateExtractableOption(extractable) {
  if (extractable !== void 0 && typeof extractable != "boolean")
    throw new TypeError('"extractable" option must be a boolean');
  return extractable;
}
async function jwkToKey(entry, jwk, extractable) {
  if (!entry.kty.includes(jwk.kty))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__/* .JOSENotSupported */ .T0('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  const algorithm = entry.resolve?.({ kty: jwk.kty, crv: jwk.crv }) ?? entry.subtle, isPrivate = !!(jwk.d || jwk.priv), keyData = { ...jwk, ext: extractable ?? jwk.ext };
  return keyData.kty !== "AKP" && delete keyData.alg, delete keyData.use, crypto.subtle.importKey("jwk", keyData, algorithm, keyData.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}
async function rawKey(key, expected, usage, extractable = !1) {
  return key instanceof Uint8Array && (key = await crypto.subtle.importKey("raw", key, expected, extractable, [usage])), checkCryptoKey(key, expected, usage), key;
}



/***/ }),

/***/ 879295:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hi: () => (/* binding */ prepareDecrypt),
/* harmony export */   zE: () => (/* binding */ decryptCompact)
/* harmony export */ });
/* unused harmony exports checkRecipient, decryptJWE, shareJWE, snapshotRecipientJWE, snapshotSharedJWE */
/* harmony import */ var _content_encryption_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(238884);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(438805);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(499129);
/* harmony import */ var _key_management_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54316);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(573575);
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(864416);
/* harmony import */ var _jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(104774);
/* harmony import */ var _deflate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(579900);








function snapshotSharedJWE(jwe) {
  const { aad, ciphertext, iv, protected: encodedProtected, tag, unprotected } = jwe;
  if (iv !== void 0 && (typeof iv != "string" || !iv))
    throw new JWEInvalid("JWE Initialization Vector incorrect type");
  if (typeof ciphertext != "string")
    throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
  if (tag !== void 0 && (typeof tag != "string" || !tag))
    throw new JWEInvalid("JWE Authentication Tag incorrect type");
  if (encodedProtected !== void 0 && typeof encodedProtected != "string")
    throw new JWEInvalid("JWE Protected Header incorrect type");
  if (aad !== void 0 && (typeof aad != "string" || !aad))
    throw new JWEInvalid("JWE AAD incorrect type");
  if (unprotected !== void 0 && !isObject(unprotected))
    throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
  return {
    aad,
    ciphertext,
    iv,
    protected: encodedProtected,
    tag,
    unprotected: unprotected === void 0 ? void 0 : { ...unprotected }
  };
}
function snapshotRecipientJWE(recipient) {
  let header, headerAlg;
  try {
    const { header: inputHeader } = recipient;
    if (isObject(inputHeader)) {
      headerAlg = inputHeader.alg;
      const parameters = Object.keys(inputHeader);
      parameters.includes("alg") || (headerAlg = void 0), header = Object.fromEntries(parameters.map((parameter) => [
        parameter,
        parameter === "alg" ? headerAlg : inputHeader[parameter]
      ]));
    } else
      header = inputHeader;
    const { encrypted_key: encryptedKey } = recipient;
    return [{ encrypted_key: encryptedKey, header }, headerAlg];
  } catch (error) {
    return [void 0, headerAlg, error];
  }
}
function checkRecipient(jwe) {
  const { encrypted_key: encryptedKey, header } = jwe;
  if (encryptedKey !== void 0 && typeof encryptedKey != "string")
    throw new JWEInvalid("JWE Encrypted Key incorrect type");
  if (header !== void 0 && !isObject(header))
    throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
  if (jwe.protected === void 0 && header === void 0 && jwe.unprotected === void 0)
    throw new JWEInvalid("JOSE Header missing");
}
function shareJWE(jwe) {
  const { protected: encodedProtected, ciphertext, iv, tag, aad } = jwe;
  let protectedHeader;
  return encodedProtected !== void 0 && (protectedHeader = (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .parseJoseHeader */ .OX)(encodedProtected, _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, "JWE Protected Header is invalid")), [
    protectedHeader,
    (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64url */ .h2)(ciphertext, "ciphertext", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA),
    iv !== void 0 ? (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64url */ .h2)(iv, "iv", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA) : void 0,
    tag !== void 0 ? (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64url */ .h2)(tag, "tag", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA) : void 0,
    (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .encodeAsciiMember */ .MV)((encodedProtected ?? "") + (aad !== void 0 ? `.${aad}` : ""), "aad", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA)
  ];
}
function prepareDecrypt(options) {
  return [
    options && (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .validateAlgorithms */ .Fw)("keyManagementAlgorithms", options.keyManagementAlgorithms),
    options && (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .validateAlgorithms */ .Fw)("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms),
    options?.crit,
    options?.maxPBES2Count,
    options?.maxDecompressedLength
  ];
}
async function decryptJWE(jwe, shared, key, token = shareJWE(jwe)) {
  const [protectedHeader, ciphertext, iv, tag, additionalAuthenticatedData] = token, { header, unprotected, aad } = jwe;
  let joseHeader;
  if (header !== void 0 || unprotected !== void 0) {
    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .isDisjoint */ .fz)(protectedHeader, header, unprotected))
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    joseHeader = { ...protectedHeader, ...header, ...unprotected };
  } else
    joseHeader = protectedHeader ?? {};
  const [keyManagementAlgorithms, contentEncryptionAlgorithms, crit, maxPBES2Count, maxDecompressedLength] = shared, { encrypted_key: encodedKey } = jwe;
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .validateCrit */ .nI)(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA, _validate_js__WEBPACK_IMPORTED_MODULE_0__/* .JWE_RECOGNIZED */ .CT, crit, protectedHeader, joseHeader), (0,_deflate_js__WEBPACK_IMPORTED_MODULE_2__/* .validateZip */ .q9)(joseHeader, protectedHeader);
  const { alg, enc } = joseHeader;
  if (typeof alg != "string" || !alg)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("missing JWE Algorithm (alg) in JWE Header");
  const selected = _jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .JWE */ .po[alg];
  if (encodedKey === "" && (!selected || !(0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .isJWECEKTransport */ .p3)(selected)))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("JWE Encrypted Key incorrect type");
  const integrated = selected?.mode === "integrated-encryption";
  if (!integrated && (typeof enc != "string" || !enc))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("missing JWE Encryption Algorithm (enc) in JWE Header");
  if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2"))
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JOSEAlgNotAllowed */ .Rb('"alg" (Algorithm) Header Parameter value not allowed');
  let encEntry;
  if (integrated) {
    if (enc !== void 0)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (iv?.byteLength)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("JWE Initialization Vector must be empty for integrated encryption");
    if (tag?.byteLength)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("JWE Authentication Tag must be empty for integrated encryption");
  } else {
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc))
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JOSEAlgNotAllowed */ .Rb('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    encEntry = (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .jweEncryption */ .Oe)(enc);
  }
  let encryptedKey;
  if (encodedKey !== void 0)
    try {
      encryptedKey = (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64url */ .h2)(encodedKey, "encrypted_key", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA);
    } catch (error) {
      if (!selected || !(0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .isJWECEKTransport */ .p3)(selected))
        throw error;
      encryptedKey = new Uint8Array();
    }
  let resolvedKey = !1;
  typeof key == "function" && (key = await key(protectedHeader, jwe), resolvedKey = !0);
  const algEntry = selected ?? (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .jweAlgorithm */ .eD)(alg);
  (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .isJWECEKTransport */ .p3)(algEntry) && encryptedKey === void 0 && (encryptedKey = new Uint8Array());
  const k = await (0,_key_js__WEBPACK_IMPORTED_MODULE_4__/* .prepareKey */ .dT)(algEntry.mode === "direct-encryption" ? encEntry : algEntry, key, "decrypt");
  let plaintext;
  if (algEntry.mode === "integrated-encryption")
    plaintext = await algEntry.decrypt(k, encryptedKey, ciphertext, additionalAuthenticatedData, protectedHeader, joseHeader);
  else {
    const encryption = encEntry;
    let cek;
    try {
      cek = await (0,_key_management_js__WEBPACK_IMPORTED_MODULE_5__/* .decryptKeyManagement */ .SV)(algEntry, encryption, k, encryptedKey, joseHeader, maxPBES2Count), (0,_jwe_algorithms_js__WEBPACK_IMPORTED_MODULE_3__/* .isJWECEKTransport */ .p3)(algEntry) && cek instanceof Uint8Array && cek.byteLength << 3 !== encryption.cekBits && (cek = (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_6__/* .generateCek */ .Do)(encryption));
    } catch (err) {
      if (err instanceof TypeError || err instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA || err instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JOSENotSupported */ .T0)
        throw err;
      cek = (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_6__/* .generateCek */ .Do)(encryption);
    }
    plaintext = await (0,_content_encryption_js__WEBPACK_IMPORTED_MODULE_6__/* .decrypt */ .Yc)(encryption, cek, ciphertext, iv, tag, additionalAuthenticatedData);
  }
  if (joseHeader.zip === "DEF") {
    const decompressionLimit = maxDecompressedLength ?? 25e4;
    if (decompressionLimit === 0)
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JOSENotSupported */ .T0('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    if (decompressionLimit !== 1 / 0 && (!Number.isSafeInteger(decompressionLimit) || decompressionLimit < 1))
      throw new TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
    plaintext = await (0,_deflate_js__WEBPACK_IMPORTED_MODULE_2__/* .decompress */ .mF)(plaintext, decompressionLimit).catch((cause) => {
      throw cause instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA ? cause : new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("Failed to decompress plaintext", { cause });
    });
  }
  return {
    plaintext,
    ...protectedHeader && { protectedHeader },
    ...aad !== void 0 && {
      additionalAuthenticatedData: (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* .decodeBase64url */ .h2)(aad, "aad", _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA)
    },
    ...unprotected && { sharedUnprotectedHeader: unprotected },
    ...header && { unprotectedHeader: header },
    ...resolvedKey && { key: k }
  };
}
async function decryptCompact(jwe, shared, key) {
  if (jwe instanceof Uint8Array && (jwe = _buffer_utils_js__WEBPACK_IMPORTED_MODULE_7__/* .decoder */ .D0.decode(jwe)), typeof jwe != "string")
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("Compact JWE must be a string or Uint8Array");
  const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
  if (length !== 5)
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .JWEInvalid */ .aA("Invalid Compact JWE");
  return decryptJWE({
    ciphertext,
    iv: iv || void 0,
    protected: protectedHeader,
    tag: tag || void 0,
    encrypted_key: encryptedKey || void 0
  }, shared, key);
}



/***/ }),

/***/ 886946:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Google)
/* harmony export */ });
/**
 * Add Google login to your page.
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/google
 * ```
 *
 * #### Configuration
 *```ts
 * import { Auth } from "@auth/core"
 * import Google from "@auth/core/providers/google"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [
 *     Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 *  - [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
 *  - [Google OAuth Configuration](https://console.developers.google.com/apis/credentials)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the Google provider is
 * based on the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *
 *
 * The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;
 *
 * - For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
 * - For development: `http://localhost:3000/api/auth/callback/google`
 *
 * :::warning
 * Google only provides Refresh Token to an application the first time a user signs in.
 *
 * To force Google to re-issue a Refresh Token, the user needs to remove the application from their account and sign in again:
 * https://myaccount.google.com/permissions
 *
 * Alternatively, you can also pass options in the `params` object of `authorization` which will force the Refresh Token to always be provided on sign in, however this will ask all users to confirm if they wish to grant your application access every time they sign in.
 *
 * If you need access to the RefreshToken or AccessToken for a Google account and you are not using a database to persist user accounts, this may be something you need to do.
 *
 * ```ts
 * const options = {
 *   providers: [
 *     Google({
 *       clientId: process.env.GOOGLE_ID,
 *       clientSecret: process.env.GOOGLE_SECRET,
 *       authorization: {
 *         params: {
 *           prompt: "consent",
 *           access_type: "offline",
 *           response_type: "code"
 *         }
 *       }
 *     })
 *   ],
 * }
 * ```
 *
 * :::
 *
 * :::tip
 * Google also returns a `email_verified` boolean property in the OAuth profile.
 *
 * You can use this property to restrict access to people with verified accounts at a particular domain.
 *
 * ```ts
 * const options = {
 *   ...
 *   callbacks: {
 *     async signIn({ account, profile }) {
 *       if (account.provider === "google") {
 *         return profile.email_verified && profile.email.endsWith("@example.com")
 *       }
 *       return true // Do different verification for other providers that don't have `email_verified`
 *     },
 *   }
 *   ...
 * }
 * ```
 *
 * :::
 * :::tip
 *
 * The Google provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/google.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */
function Google(options) {
    return {
        id: "google",
        name: "Google",
        type: "oidc",
        issuer: "https://accounts.google.com",
        style: {
            brandColor: "#1a73e8",
        },
        options,
    };
}


/***/ }),

/***/ 896649:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FD: () => (/* binding */ u),
/* harmony export */   FK: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.FK),
/* harmony export */   Y: () => (/* binding */ u)
/* harmony export */ });
/* unused harmony exports jsxAttr, jsxDEV, jsxEscape, jsxTemplate */
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(396460);
var t=/["&<]/;function n(r){if(0===r.length||!1===t.test(r))return r;for(var e=0,n=0,o="",f="";n<r.length;n++){switch(r.charCodeAt(n)){case 34:f="&quot;";break;case 38:f="&amp;";break;case 60:f="&lt;";break;default:continue}n!==e&&(o+=r.slice(e,n)),o+=f,e=n+1}return n!==e&&(o+=r.slice(e,n)),o}var o=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,f=0,i=Array.isArray;function u(e,t,n,o,i,u){t||(t={});var a,c,l=t;"ref"in t&&(a=t.ref,delete t.ref);var p={type:e,props:l,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a)void 0===l[c]&&(l[c]=a[c]);return preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.vnode&&preact__WEBPACK_IMPORTED_MODULE_0__/* .options */ .fF.vnode(p),p}function a(r){var t=u(e,{tpl:r,exprs:[].slice.call(arguments,1)});return t.key=t.__v,t}var c={},l=/[A-Z]/g;function p(e,t){if(r.attr){var f=r.attr(e,t);if("string"==typeof f)return f}if("ref"===e||"key"===e)return"";if("style"===e&&"object"==typeof t){var i="";for(var u in t){var a=t[u];if(null!=a&&""!==a){var p="-"==u[0]?u:c[u]||(c[u]=u.replace(l,"-$&").toLowerCase()),_=";";"number"!=typeof a||p.startsWith("--")||o.test(p)||(_="px;"),i=i+p+":"+a+_}}return e+'="'+i+'"'}return null==t||!1===t||"function"==typeof t||"object"==typeof t?"":!0===t?e:e+'="'+n(t)+'"'}function _(r){if(null==r||"boolean"==typeof r||"function"==typeof r)return null;if("object"==typeof r){if(void 0===r.constructor)return r;if(i(r)){for(var e=0;e<r.length;e++)r[e]=_(r[e]);return r}}return n(""+r)}
//# sourceMappingURL=jsxRuntime.module.js.map


/***/ }),

/***/ 897764:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   We: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_6__.We),
/* harmony export */   ih: () => (/* binding */ AuthInternal),
/* harmony export */   lS: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_6__.lS)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(558761);
/* harmony import */ var _utils_cookie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(269806);
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(942652);
/* harmony import */ var _pages_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476163);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(671264);
/* harmony import */ var _actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(125462);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(399389);








/** @internal */
async function AuthInternal(request, authOptions) {
    const { action, providerId, error, method } = request;
    const csrfDisabled = authOptions.skipCSRFCheck === _symbols_js__WEBPACK_IMPORTED_MODULE_6__/* .skipCSRFCheck */ .We;
    const { options, cookies } = await (0,_init_js__WEBPACK_IMPORTED_MODULE_2__/* .init */ .T)({
        authOptions,
        action,
        providerId,
        url: request.url,
        callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
        csrfToken: request.body?.csrfToken,
        cookies: request.cookies,
        isPost: method === "POST",
        csrfDisabled,
    });
    const sessionStore = new _utils_cookie_js__WEBPACK_IMPORTED_MODULE_1__/* .SessionStore */ .c(options.cookies.sessionToken, request.cookies, options.logger);
    if (method === "GET") {
        const render = (0,_pages_index_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({ ...options, query: request.query, cookies });
        switch (action) {
            case "callback":
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .callback */ .E2(request, options, sessionStore, cookies);
            case "csrf":
                return render.csrf(csrfDisabled, options, cookies);
            case "error":
                return render.error(error);
            case "providers":
                return render.providers(options.providers);
            case "session":
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .session */ .dZ(options, sessionStore, cookies);
            case "signin":
                return render.signin(providerId, error);
            case "signout":
                return render.signout();
            case "verify-request":
                return render.verifyRequest();
            case "webauthn-options":
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .webAuthnOptions */ .xp(request, options, sessionStore, cookies);
            default:
        }
    }
    else {
        const { csrfTokenVerified } = options;
        switch (action) {
            case "callback":
                if (options.provider.type === "credentials")
                    // Verified CSRF Token required for credentials providers only
                    (0,_actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_5__/* .validateCSRF */ .F)(action, csrfTokenVerified);
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .callback */ .E2(request, options, sessionStore, cookies);
            case "session":
                (0,_actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_5__/* .validateCSRF */ .F)(action, csrfTokenVerified);
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .session */ .dZ(options, sessionStore, cookies, true, request.body?.data);
            case "signin":
                (0,_actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_5__/* .validateCSRF */ .F)(action, csrfTokenVerified);
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .signIn */ .Jv(request, cookies, options);
            case "signout":
                (0,_actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_5__/* .validateCSRF */ .F)(action, csrfTokenVerified);
                return await _actions_index_js__WEBPACK_IMPORTED_MODULE_4__/* .signOut */ .CI(cookies, sessionStore, options);
            default:
        }
    }
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__/* .UnknownAction */ .P8(`Cannot handle action: ${action}`);
}


/***/ }),

/***/ 903993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ setEnvDefaults),
/* harmony export */   z: () => (/* binding */ reqWithEnvURL)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _auth_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(311024);
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field


/** If `NEXTAUTH_URL` or `AUTH_URL` is defined, override the request's URL. */
function reqWithEnvURL(req) {
    const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
    if (!url)
        return req;
    const { origin: envOrigin } = new URL(url);
    const { href, origin } = req.nextUrl;
    return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextRequest(href.replace(origin, envOrigin), req);
}
/**
 * For backwards compatibility, `next-auth` checks for `NEXTAUTH_URL`
 * and the `basePath` by default is `/api/auth` instead of `/auth`
 * (which is the default for all other Auth.js integrations).
 *
 * For the same reason, `NEXTAUTH_SECRET` is also checked.
 */
function setEnvDefaults(config) {
    try {
        config.secret ?? (config.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
        const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!url)
            return;
        const { pathname } = new URL(url);
        if (pathname === "/")
            return;
        config.basePath || (config.basePath = pathname);
    }
    catch {
        // Catching and swallowing potential URL parsing errors, we'll fall
        // back to `/api/auth` below.
    }
    finally {
        config.basePath || (config.basePath = "/api/auth");
        (0,_auth_core__WEBPACK_IMPORTED_MODULE_1__/* .setEnvDefaults */ .G8)(process.env, config, true);
    }
}


/***/ }),

/***/ 909950:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ getLoggedInUser)
/* harmony export */ });
/**
 * Returns the currently logged in user, if any.
 */
async function getLoggedInUser(options, sessionStore) {
    const { adapter, jwt, session: { strategy: sessionStrategy }, } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken)
        return null;
    // Try to decode JWT
    if (sessionStrategy === "jwt") {
        const salt = options.cookies.sessionToken.name;
        const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
        if (payload && payload.sub) {
            return {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                image: payload.picture,
            };
        }
    }
    else {
        const userAndSession = await adapter?.getSessionAndUser(sessionToken);
        if (userAndSession) {
            return userAndSession.user;
        }
    }
    return null;
}


/***/ }),

/***/ 932384:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $W: () => (/* binding */ userInfoRequest),
/* harmony export */   A6: () => (/* binding */ customFetch),
/* harmony export */   CN: () => (/* binding */ discoveryRequest),
/* harmony export */   Cz: () => (/* binding */ processUserInfoResponse),
/* harmony export */   IX: () => (/* binding */ PrivateKeyJwt),
/* harmony export */   LB: () => (/* binding */ modifyAssertion),
/* harmony export */   NV: () => (/* binding */ None),
/* harmony export */   ON: () => (/* binding */ getValidatedIdTokenClaims),
/* harmony export */   Ot: () => (/* binding */ generateRandomState),
/* harmony export */   YI: () => (/* binding */ generateRandomCodeVerifier),
/* harmony export */   Yv: () => (/* binding */ calculatePKCECodeChallenge),
/* harmony export */   ZC: () => (/* binding */ skipStateCheck),
/* harmony export */   cm: () => (/* binding */ allowInsecureRequests),
/* harmony export */   d_: () => (/* binding */ processAuthorizationCodeResponse),
/* harmony export */   kO: () => (/* binding */ validateAuthResponse),
/* harmony export */   m: () => (/* binding */ authorizationCodeGrantRequest),
/* harmony export */   pG: () => (/* binding */ AuthorizationResponseError),
/* harmony export */   pH: () => (/* binding */ ClientSecretJwt),
/* harmony export */   q4: () => (/* binding */ generateRandomNonce),
/* harmony export */   qm: () => (/* binding */ ClientSecretPost),
/* harmony export */   vA: () => (/* binding */ processDiscoveryResponse)
/* harmony export */ });
/* unused harmony exports clockSkew, clockTolerance, jweDecrypt, jwksCache, UnsupportedOperationError, OperationProcessingError, ClientSecretBasic, TlsClientAuth, issueRequestObject, checkProtocol, resolveEndpoint, pushedAuthorizationRequest, isDPoPNonceError, DPoP, ResponseBodyError, WWWAuthenticateChallengeError, processPushedAuthorizationResponse, protectedResourceRequest, skipSubjectCheck, getContentType, refreshTokenGrantRequest, validateApplicationLevelSignature, processRefreshTokenResponse, nopkce, expectNoNonce, skipAuthTimeCheck, WWW_AUTHENTICATE_CHALLENGE, RESPONSE_BODY_ERROR, UNSUPPORTED_OPERATION, AUTHORIZATION_RESPONSE_ERROR, JWT_USERINFO_EXPECTED, PARSE_ERROR, INVALID_RESPONSE, INVALID_REQUEST, RESPONSE_IS_NOT_JSON, RESPONSE_IS_NOT_CONFORM, HTTP_REQUEST_FORBIDDEN, REQUEST_PROTOCOL_FORBIDDEN, JWT_TIMESTAMP_CHECK, JWT_CLAIM_COMPARISON, JSON_ATTRIBUTE_COMPARISON, KEY_SELECTION, MISSING_SERVER_METADATA, INVALID_SERVER_METADATA, clientCredentialsGrantRequest, genericTokenEndpointRequest, processGenericTokenEndpointResponse, processClientCredentialsResponse, revocationRequest, processRevocationResponse, introspectionRequest, processIntrospectionResponse, validateJwtAuthResponse, validateDetachedSignatureResponse, validateCodeIdTokenResponse, formPostResponse, expectNoState, deviceAuthorizationRequest, processDeviceAuthorizationResponse, deviceCodeGrantRequest, processDeviceCodeResponse, generateKeyPair, validateJwtAccessToken, backchannelAuthenticationRequest, processBackchannelAuthenticationResponse, backchannelAuthenticationGrantRequest, processBackchannelAuthenticationGrantResponse, dynamicClientRegistrationRequest, processDynamicClientRegistrationResponse, resourceDiscoveryRequest, processResourceDiscoveryResponse, _nopkce, _nodiscoverycheck, _expectedIssuer */
let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'oauth4webapi';
    const VERSION = 'v3.8.8';
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return (input instanceof expected ||
            Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag]);
    }
    catch {
        return false;
    }
}
const ERR_INVALID_ARG_VALUE = 'ERR_INVALID_ARG_VALUE';
const ERR_INVALID_ARG_TYPE = 'ERR_INVALID_ARG_TYPE';
function CodedTypeError(message, code, cause) {
    const err = new TypeError(message, { cause });
    Object.assign(err, { code });
    return err;
}
const allowInsecureRequests = Symbol();
const clockSkew = Symbol();
const clockTolerance = Symbol();
const customFetch = Symbol();
const modifyAssertion = Symbol();
const jweDecrypt = Symbol();
const jwksCache = Symbol();
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function buf(input) {
    if (typeof input === 'string') {
        return encoder.encode(input);
    }
    return decoder.decode(input);
}
let encodeBase64Url;
if (Uint8Array.prototype.toBase64) {
    encodeBase64Url = (input) => {
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        return input.toBase64({ alphabet: 'base64url', omitPadding: true });
    };
}
else {
    const CHUNK_SIZE = 0x8000;
    encodeBase64Url = (input) => {
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        const arr = [];
        for (let i = 0; i < input.byteLength; i += CHUNK_SIZE) {
            arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
        }
        return btoa(arr.join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    };
}
let decodeBase64Url;
if (Uint8Array.fromBase64) {
    decodeBase64Url = (input) => {
        try {
            return Uint8Array.fromBase64(input, { alphabet: 'base64url' });
        }
        catch (cause) {
            throw CodedTypeError('The input to be decoded is not correctly encoded.', ERR_INVALID_ARG_VALUE, cause);
        }
    };
}
else {
    decodeBase64Url = (input) => {
        try {
            const binary = atob(input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        }
        catch (cause) {
            throw CodedTypeError('The input to be decoded is not correctly encoded.', ERR_INVALID_ARG_VALUE, cause);
        }
    };
}
function b64u(input) {
    if (typeof input === 'string') {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class UnsupportedOperationError extends Error {
    code;
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        this.code = UNSUPPORTED_OPERATION;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    code;
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        if (options?.code) {
            this.code = options?.code;
        }
        Error.captureStackTrace?.(this, this.constructor);
    }
}
function OPE(message, code, cause) {
    return new OperationProcessingError(message, { code, cause });
}
async function calculateJwkThumbprint(jwk) {
    let components;
    switch (jwk.kty) {
        case 'EC':
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y,
            };
            break;
        case 'OKP':
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
            };
            break;
        case 'AKP':
            components = {
                alg: jwk.alg,
                kty: jwk.kty,
                pub: jwk.pub,
            };
            break;
        case 'RSA':
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n,
            };
            break;
        default:
            throw new UnsupportedOperationError('unsupported JWK key type', { cause: jwk });
    }
    return b64u(await crypto.subtle.digest('SHA-256', buf(JSON.stringify(components))));
}
function assertCryptoKey(key, it) {
    if (!(key instanceof CryptoKey)) {
        throw CodedTypeError(`${it} must be a CryptoKey`, ERR_INVALID_ARG_TYPE);
    }
}
function assertPrivateKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'private') {
        throw CodedTypeError(`${it} must be a private CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function assertPublicKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'public') {
        throw CodedTypeError(`${it} must be a public CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function normalizeTyp(value) {
    return value.toLowerCase().replace(/^application\//, '');
}
function isJsonObject(input) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input ?? {});
    if (USER_AGENT && !headers.has('user-agent')) {
        headers.set('user-agent', USER_AGENT);
    }
    if (headers.has('authorization')) {
        throw CodedTypeError('"options.headers" must not include the "authorization" header name', ERR_INVALID_ARG_VALUE);
    }
    return headers;
}
function signal(url, value) {
    if (value !== undefined) {
        if (typeof value === 'function') {
            value = value(url.href);
        }
        if (!(value instanceof AbortSignal)) {
            throw CodedTypeError('"options.signal" must return or be an instance of AbortSignal', ERR_INVALID_ARG_TYPE);
        }
        return value;
    }
    return undefined;
}
function replaceDoubleSlash(pathname) {
    if (pathname.includes('//')) {
        return pathname.replace('//', '/');
    }
    return pathname;
}
function prependWellKnown(url, wellKnown, allowTerminatingSlash = false) {
    if (url.pathname === '/') {
        url.pathname = wellKnown;
    }
    else {
        url.pathname = replaceDoubleSlash(`${wellKnown}/${allowTerminatingSlash ? url.pathname : url.pathname.replace(/(\/)$/, '')}`);
    }
    return url;
}
function appendWellKnown(url, wellKnown) {
    url.pathname = replaceDoubleSlash(`${url.pathname}/${wellKnown}`);
    return url;
}
async function performDiscovery(input, urlName, transform, options) {
    if (!(input instanceof URL)) {
        throw CodedTypeError(`"${urlName}" must be an instance of URL`, ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(input, options?.[allowInsecureRequests] !== true);
    const url = transform(new URL(input.href));
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return (options?.[customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: signal(url, options?.signal),
    });
}
async function discoveryRequest(issuerIdentifier, options) {
    return performDiscovery(issuerIdentifier, 'issuerIdentifier', (url) => {
        switch (options?.algorithm) {
            case undefined:
            case 'oidc':
                appendWellKnown(url, '.well-known/openid-configuration');
                break;
            case 'oauth2':
                prependWellKnown(url, '.well-known/oauth-authorization-server');
                break;
            default:
                throw CodedTypeError('"options.algorithm" must be "oidc" (default), or "oauth2"', ERR_INVALID_ARG_VALUE);
        }
        return url;
    }, options);
}
function assertNumber(input, allow0, it, code, cause) {
    try {
        if (typeof input !== 'number' || !Number.isFinite(input)) {
            throw CodedTypeError(`${it} must be a number`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input > 0)
            return;
        if (allow0) {
            if (input !== 0) {
                throw CodedTypeError(`${it} must be a non-negative number`, ERR_INVALID_ARG_VALUE, cause);
            }
            return;
        }
        throw CodedTypeError(`${it} must be a positive number`, ERR_INVALID_ARG_VALUE, cause);
    }
    catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
function assertString(input, it, code, cause) {
    try {
        if (typeof input !== 'string') {
            throw CodedTypeError(`${it} must be a string`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input.length === 0) {
            throw CodedTypeError(`${it} must not be empty`, ERR_INVALID_ARG_VALUE, cause);
        }
    }
    catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    const expected = expectedIssuerIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedIssuerIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.issuer, '"response" body "issuer" property', INVALID_RESPONSE, { body: json });
    if (expected !== _nodiscoverycheck && new URL(json.issuer).href !== expected.href) {
        throw OPE('"response" body "issuer" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, { expected: expected.href, body: json, attribute: 'issuer' });
    }
    return json;
}
function assertApplicationJson(response) {
    assertContentType(response, 'application/json');
}
function notJson(response, ...types) {
    let msg = '"response" content-type must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `${types.join(', ')}, or ${last}`;
    }
    else if (types.length === 2) {
        msg += `${types[0]} or ${types[1]}`;
    }
    else {
        msg += types[0];
    }
    return OPE(msg, RESPONSE_IS_NOT_JSON, response);
}
function assertContentTypes(response, ...types) {
    if (!types.includes(getContentType(response))) {
        throw notJson(response, ...types);
    }
}
function assertContentType(response, contentType) {
    if (getContentType(response) !== contentType) {
        throw notJson(response, contentType);
    }
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    assertString(codeVerifier, 'codeVerifier');
    return b64u(await crypto.subtle.digest('SHA-256', buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return { key: input };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined) {
        assertString(input.kid, '"kid"');
    }
    return {
        key: input.key,
        kid: input.kid,
    };
}
function psAlg(key) {
    switch (key.algorithm.hash.name) {
        case 'SHA-256':
            return 'PS256';
        case 'SHA-384':
            return 'PS384';
        case 'SHA-512':
            return 'PS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key,
            });
    }
}
function rsAlg(key) {
    switch (key.algorithm.hash.name) {
        case 'SHA-256':
            return 'RS256';
        case 'SHA-384':
            return 'RS384';
        case 'SHA-512':
            return 'RS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key,
            });
    }
}
function esAlg(key) {
    switch (key.algorithm.namedCurve) {
        case 'P-256':
            return 'ES256';
        case 'P-384':
            return 'ES384';
        case 'P-521':
            return 'ES512';
        default:
            throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve', { cause: key });
    }
}
function keyToJws(key) {
    switch (key.algorithm.name) {
        case 'RSA-PSS':
            return psAlg(key);
        case 'RSASSA-PKCS1-v1_5':
            return rsAlg(key);
        case 'ECDSA':
            return esAlg(key);
        case 'Ed25519':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return key.algorithm.name;
        case 'EdDSA':
            return 'Ed25519';
        default:
            throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', { cause: key });
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === 'number' && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === 'number' && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1
        ? tolerance
        : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function assertAs(as) {
    if (typeof as !== 'object' || as === null) {
        throw CodedTypeError('"as" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(as.issuer, '"as.issuer"');
}
function assertClient(client) {
    if (typeof client !== 'object' || client === null) {
        throw CodedTypeError('"client" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(client.client_id, '"client.client_id"');
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/(?:[-_.!~*'()]|%20)/g, (substring) => {
        switch (substring) {
            case '-':
            case '_':
            case '.':
            case '!':
            case '~':
            case '*':
            case "'":
            case '(':
            case ')':
                return `%${substring.charCodeAt(0).toString(16).toUpperCase()}`;
            case '%20':
                return '+';
            default:
                throw new Error();
        }
    });
}
function ClientSecretPost(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, body, _headers) => {
        body.set('client_id', client.client_id);
        body.set('client_secret', clientSecret);
    };
}
function ClientSecretBasic(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, _body, headers) => {
        const username = formUrlEncode(client.client_id);
        const password = formUrlEncode(clientSecret);
        const credentials = btoa(`${username}:${password}`);
        headers.set('authorization', `Basic ${credentials}`);
    };
}
function clientAssertionPayload(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id,
    };
}
function PrivateKeyJwt(clientPrivateKey, options) {
    const { key, kid } = getKeyAndKid(clientPrivateKey);
    assertPrivateKey(key, '"clientPrivateKey.key"');
    return async (as, client, body, _headers) => {
        const header = { alg: keyToJws(key), kid };
        const payload = clientAssertionPayload(as, client);
        options?.[modifyAssertion]?.(header, payload);
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', await signJwt(header, payload, key));
    };
}
function ClientSecretJwt(clientSecret, options) {
    assertString(clientSecret, '"clientSecret"');
    const modify = options?.[modifyAssertion];
    let key;
    return async (as, client, body, _headers) => {
        key ||= await crypto.subtle.importKey('raw', buf(clientSecret), { hash: 'SHA-256', name: 'HMAC' }, false, ['sign']);
        const header = { alg: 'HS256' };
        const payload = clientAssertionPayload(as, client);
        modify?.(header, payload);
        const data = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
        const hmac = await crypto.subtle.sign(key.algorithm, key, buf(data));
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', `${data}.${b64u(new Uint8Array(hmac))}`);
    };
}
function None() {
    return (_as, client, body, _headers) => {
        body.set('client_id', client.client_id);
    };
}
function TlsClientAuth() {
    return None();
}
async function signJwt(header, payload, key) {
    if (!key.usages.includes('sign')) {
        throw CodedTypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"', ERR_INVALID_ARG_VALUE);
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function issueRequestObject(as, client, parameters, privateKey, options) {
    assertAs(as);
    assertClient(client);
    parameters = new URLSearchParams(parameters);
    const { key, kid } = getKeyAndKid(privateKey);
    assertPrivateKey(key, '"privateKey.key"');
    parameters.set('client_id', client.client_id);
    const now = epochTime() + getClockSkew(client);
    const claims = {
        ...Object.fromEntries(parameters.entries()),
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
    };
    let resource;
    if (parameters.has('resource') &&
        (resource = parameters.getAll('resource')) &&
        resource.length > 1) {
        claims.resource = resource;
    }
    {
        let value = parameters.get('max_age');
        if (value !== null) {
            claims.max_age = parseInt(value, 10);
            assertNumber(claims.max_age, true, '"max_age" parameter');
        }
    }
    {
        let value = parameters.get('claims');
        if (value !== null) {
            try {
                claims.claims = JSON.parse(value);
            }
            catch (cause) {
                throw OPE('failed to parse the "claims" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!isJsonObject(claims.claims)) {
                throw CodedTypeError('"claims" parameter must be a JSON with a top level object', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    {
        let value = parameters.get('authorization_details');
        if (value !== null) {
            try {
                claims.authorization_details = JSON.parse(value);
            }
            catch (cause) {
                throw OPE('failed to parse the "authorization_details" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!Array.isArray(claims.authorization_details)) {
                throw CodedTypeError('"authorization_details" parameter must be a JSON with a top level array', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    const header = {
        alg: keyToJws(key),
        typ: 'oauth-authz-req+jwt',
        kid,
    };
    options?.[modifyAssertion]?.(header, claims);
    return signJwt(header, claims, key);
}
let jwkCache;
async function getSetPublicJwkCache(key, alg) {
    const { kty, e, n, x, y, crv, pub } = await crypto.subtle.exportKey('jwk', key);
    const jwk = { kty, e, n, x, y, crv, pub };
    if (kty === 'AKP')
        jwk.alg = alg;
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key, alg) {
    jwkCache ||= new WeakMap();
    return jwkCache.get(key) || getSetPublicJwkCache(key, alg);
}
const URLParse = URL.parse
    ?
        (url, base) => URL.parse(url, base)
    : (url, base) => {
        try {
            return new URL(url, base);
        }
        catch {
            return null;
        }
    };
function checkProtocol(url, enforceHttps) {
    if (enforceHttps && url.protocol !== 'https:') {
        throw OPE('only requests to HTTPS are allowed', HTTP_REQUEST_FORBIDDEN, url);
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw OPE('only HTTP and HTTPS requests are allowed', REQUEST_PROTOCOL_FORBIDDEN, url);
    }
}
function validateEndpoint(value, endpoint, useMtlsAlias, enforceHttps) {
    let url;
    if (typeof value !== 'string' || !(url = URLParse(value))) {
        throw OPE(`authorization server metadata does not contain a valid ${useMtlsAlias ? `"as.mtls_endpoint_aliases.${endpoint}"` : `"as.${endpoint}"`}`, value === undefined ? MISSING_SERVER_METADATA : INVALID_SERVER_METADATA, { attribute: useMtlsAlias ? `mtls_endpoint_aliases.${endpoint}` : endpoint });
    }
    checkProtocol(url, enforceHttps);
    return url;
}
function resolveEndpoint(as, endpoint, useMtlsAlias, enforceHttps) {
    if (useMtlsAlias && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, useMtlsAlias, enforceHttps);
    }
    return validateEndpoint(as[endpoint], endpoint, useMtlsAlias, enforceHttps);
}
async function pushedAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'pushed_authorization_request_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
class DPoPHandler {
    #header;
    #privateKey;
    #publicKey;
    #clockSkew;
    #modifyAssertion;
    #map;
    #jkt;
    constructor(client, keyPair, options) {
        assertPrivateKey(keyPair?.privateKey, '"DPoP.privateKey"');
        assertPublicKey(keyPair?.publicKey, '"DPoP.publicKey"');
        if (!keyPair.publicKey.extractable) {
            throw CodedTypeError('"DPoP.publicKey.extractable" must be true', ERR_INVALID_ARG_VALUE);
        }
        this.#modifyAssertion = options?.[modifyAssertion];
        this.#clockSkew = getClockSkew(client);
        this.#privateKey = keyPair.privateKey;
        this.#publicKey = keyPair.publicKey;
        branded.add(this);
    }
    #get(key) {
        this.#map ||= new Map();
        let item = this.#map.get(key);
        if (item) {
            this.#map.delete(key);
            this.#map.set(key, item);
        }
        return item;
    }
    #set(key, val) {
        this.#map ||= new Map();
        this.#map.delete(key);
        if (this.#map.size === 100) {
            this.#map.delete(this.#map.keys().next().value);
        }
        this.#map.set(key, val);
    }
    async calculateThumbprint() {
        if (!this.#jkt) {
            const jwk = await crypto.subtle.exportKey('jwk', this.#publicKey);
            this.#jkt ||= await calculateJwkThumbprint(jwk);
        }
        return this.#jkt;
    }
    async addProof(url, headers, htm, accessToken) {
        const alg = keyToJws(this.#privateKey);
        this.#header ||= {
            alg,
            typ: 'dpop+jwt',
            jwk: await publicJwk(this.#publicKey, alg),
        };
        const nonce = this.#get(url.origin);
        const now = epochTime() + this.#clockSkew;
        const payload = {
            iat: now,
            jti: randomBytes(),
            htm,
            nonce,
            htu: `${url.origin}${url.pathname}`,
            ath: accessToken
                ? b64u(await crypto.subtle.digest('SHA-256', buf(accessToken)))
                : undefined,
        };
        this.#modifyAssertion?.(this.#header, payload);
        headers.set('dpop', await signJwt(this.#header, payload, this.#privateKey));
    }
    cacheNonce(response, url) {
        try {
            const nonce = response.headers.get('dpop-nonce');
            if (nonce) {
                this.#set(url.origin, nonce);
            }
        }
        catch { }
    }
}
function isDPoPNonceError(err) {
    if (err instanceof WWWAuthenticateChallengeError) {
        return err.cause.some((challenge) => challenge.scheme === 'dpop' && challenge.parameters.error === 'use_dpop_nonce');
    }
    if (err instanceof ResponseBodyError) {
        return err.error === 'use_dpop_nonce';
    }
    return false;
}
function DPoP(client, keyPair, options) {
    return new DPoPHandler(client, keyPair, options);
}
class ResponseBodyError extends Error {
    cause;
    code;
    error;
    status;
    error_description;
    response;
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        this.code = RESPONSE_BODY_ERROR;
        this.cause = options.cause;
        this.error = options.cause.error;
        this.status = options.response.status;
        this.error_description = options.cause.error_description;
        Object.defineProperty(this, 'response', { enumerable: false, value: options.response });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class AuthorizationResponseError extends Error {
    cause;
    code;
    error;
    error_description;
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        this.code = AUTHORIZATION_RESPONSE_ERROR;
        this.cause = options.cause;
        this.error = options.cause.get('error');
        this.error_description = options.cause.get('error_description') ?? undefined;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class WWWAuthenticateChallengeError extends Error {
    cause;
    code;
    response;
    status;
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        this.code = WWW_AUTHENTICATE_CHALLENGE;
        this.cause = options.cause;
        this.status = options.response.status;
        this.response = options.response;
        Object.defineProperty(this, 'response', { enumerable: false });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
const tokenMatch = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+";
const token68Match = '[a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2}';
const quotedMatch = '"((?:[^"\\\\]|\\\\[\\s\\S])*)"';
const quotedParamMatcher = '(' + tokenMatch + ')\\s*=\\s*' + quotedMatch;
const paramMatcher = '(' + tokenMatch + ')\\s*=\\s*(' + tokenMatch + ')';
const schemeRE = new RegExp('^[,\\s]*(' + tokenMatch + ')');
const quotedParamRE = new RegExp('^[,\\s]*' + quotedParamMatcher + '[,\\s]*(.*)');
const unquotedParamRE = new RegExp('^[,\\s]*' + paramMatcher + '[,\\s]*(.*)');
const token68ParamRE = new RegExp('^(' + token68Match + ')(?:$|[,\\s])(.*)');
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    const header = response.headers.get('www-authenticate');
    if (header === null) {
        return undefined;
    }
    const challenges = [];
    let rest = header;
    while (rest) {
        let match = rest.match(schemeRE);
        const scheme = match?.['1'].toLowerCase();
        if (!scheme) {
            return undefined;
        }
        const afterScheme = rest.substring(match[0].length);
        if (afterScheme && !afterScheme.match(/^[\s,]/)) {
            return undefined;
        }
        const spaceMatch = afterScheme.match(/^\s+(.*)$/);
        const hasParameters = !!spaceMatch;
        rest = spaceMatch ? spaceMatch[1] : undefined;
        const parameters = {};
        let token68;
        if (hasParameters) {
            while (rest) {
                let key;
                let value;
                if ((match = rest.match(quotedParamRE))) {
                    ;
                    [, key, value, rest] = match;
                    if (value.includes('\\')) {
                        value = value.replace(/\\([\s\S])/g, '$1');
                    }
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if ((match = rest.match(unquotedParamRE))) {
                    ;
                    [, key, value, rest] = match;
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if ((match = rest.match(token68ParamRE))) {
                    if (Object.keys(parameters).length) {
                        break;
                    }
                    ;
                    [, token68, rest] = match;
                    break;
                }
                return undefined;
            }
        }
        else {
            rest = afterScheme || undefined;
        }
        const challenge = { scheme, parameters };
        if (token68) {
            challenge.token68 = token68;
        }
        challenges.push(challenge);
    }
    if (!challenges.length) {
        return undefined;
    }
    return challenges;
}
async function processPushedAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, 'Pushed Authorization Request Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.request_uri, '"response" body "request_uri" property', INVALID_RESPONSE, {
        body: json,
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json,
    });
    json.expires_in = expiresIn;
    return json;
}
async function parseOAuthResponseErrorBody(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        assertApplicationJson(response);
        try {
            const json = await response.clone().json();
            if (isJsonObject(json) && typeof json.error === 'string' && json.error.length) {
                return json;
            }
        }
        catch { }
    }
    return undefined;
}
async function checkOAuthBodyError(response, expected, label) {
    if (response.status !== expected) {
        checkAuthenticationChallenges(response);
        let err;
        if ((err = await parseOAuthResponseErrorBody(response))) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response,
            });
        }
        throw OPE(`"response" is not a conform ${label} response (unexpected HTTP status code)`, RESPONSE_IS_NOT_CONFORM, response);
    }
}
function assertDPoP(option) {
    if (!branded.has(option)) {
        throw CodedTypeError('"options.DPoP" is not a valid DPoPHandle', ERR_INVALID_ARG_VALUE);
    }
}
async function resourceRequest(accessToken, method, url, headers, body, options) {
    assertString(accessToken, '"accessToken"');
    if (!(url instanceof URL)) {
        throw CodedTypeError('"url" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(url, options?.[allowInsecureRequests] !== true);
    headers = prepareHeaders(headers);
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method.toUpperCase(), accessToken);
    }
    headers.set('authorization', `${headers.has('dpop') ? 'DPoP' : 'Bearer'} ${accessToken}`);
    const response = await (options?.[customFetch] || fetch)(url.href, {
        duplex: looseInstanceOf(body, ReadableStream) ? 'half' : undefined,
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: signal(url, options?.signal),
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    const response = await resourceRequest(accessToken, method, url, headers, body, options);
    checkAuthenticationChallenges(response);
    return response;
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'userinfo_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set('accept', 'application/jwt');
    }
    else {
        headers.set('accept', 'application/json');
        headers.append('accept', 'application/jwt');
    }
    return resourceRequest(accessToken, 'GET', url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client),
    });
}
let jwksMap;
let jwksRequests;
let jwksKeys;
function setJwksCache(as, jwks, uat, cache) {
    jwksMap ||= new WeakMap();
    jwksMap.set(as, {
        jwks,
        uat,
        get age() {
            return epochTime() - this.uat;
        },
    });
    if (cache) {
        Object.assign(cache, { jwks: structuredClone(jwks), uat });
    }
}
function isFreshJwksCache(input) {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    if (!('uat' in input) || typeof input.uat !== 'number' || epochTime() - input.uat >= 300) {
        return false;
    }
    if (!('jwks' in input) ||
        !isJsonObject(input.jwks) ||
        !Array.isArray(input.jwks.keys) ||
        !Array.prototype.every.call(input.jwks.keys, isJsonObject)) {
        return false;
    }
    return true;
}
function clearJwksCache(as, cache) {
    jwksMap?.delete(as);
    delete cache?.jwks;
    delete cache?.uat;
}
async function getPublicSigKeyFromIssuerJwksUri(as, options, header) {
    const { alg, kid } = header;
    checkSupportedJwsAlg(header);
    if (!jwksMap?.has(as) && isFreshJwksCache(options?.[jwksCache])) {
        setJwksCache(as, options?.[jwksCache].jwks, options?.[jwksCache].uat);
    }
    let jwks;
    let age;
    if (jwksMap?.has(as)) {
        ;
        ({ jwks, age } = jwksMap.get(as));
        if (age >= 300) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
    }
    else {
        const downloaded = await jwksRequest(as, options);
        jwks = downloaded.jwks;
        age = epochTime() - downloaded.uat;
        setJwksCache(as, jwks, downloaded.uat, options?.[jwksCache]);
    }
    let kty;
    switch (alg.slice(0, 2)) {
        case 'RS':
        case 'PS':
            kty = 'RSA';
            break;
        case 'ES':
            kty = 'EC';
            break;
        case 'Ed':
            kty = 'OKP';
            break;
        case 'ML':
            kty = 'AKP';
            break;
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', { cause: { alg } });
    }
    const candidates = jwks.keys.filter((jwk) => {
        if (jwk.kty !== kty) {
            return false;
        }
        if (kid !== undefined && kid !== jwk.kid) {
            return false;
        }
        if (jwk.alg !== undefined && alg !== jwk.alg) {
            return false;
        }
        if (jwk.use !== undefined && jwk.use !== 'sig') {
            return false;
        }
        if (jwk.key_ops?.includes('verify') === false) {
            return false;
        }
        switch (true) {
            case alg === 'ES256' && jwk.crv !== 'P-256':
            case alg === 'ES384' && jwk.crv !== 'P-384':
            case alg === 'ES512' && jwk.crv !== 'P-521':
            case alg === 'Ed25519' && jwk.crv !== 'Ed25519':
            case alg === 'EdDSA' && jwk.crv !== 'Ed25519':
                return false;
        }
        return true;
    });
    const { 0: jwk, length } = candidates;
    if (!length) {
        if (age >= 60) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
        throw OPE('error when selecting a JWT verification key, no applicable keys found', KEY_SELECTION, { header, candidates, jwks_uri: new URL(as.jwks_uri) });
    }
    if (length !== 1) {
        throw OPE('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required', KEY_SELECTION, { header, candidates, jwks_uri: new URL(as.jwks_uri) });
    }
    jwksKeys ||= new WeakMap();
    let keys = jwksKeys.get(jwk);
    if (!keys) {
        keys = new Map();
        jwksKeys.set(jwk, keys);
    }
    let key = keys.get(alg);
    if (!key) {
        key = importJwk(alg, jwk).catch((cause) => {
            keys.delete(alg);
            throw cause;
        });
        keys.set(alg, key);
    }
    return key;
}
const skipSubjectCheck = Symbol();
function getContentType(input) {
    return input.headers.get('content-type')?.split(';')[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    checkAuthenticationChallenges(response);
    if (response.status !== 200) {
        throw OPE('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    let json;
    if (getContentType(response) === 'application/jwt') {
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported, undefined), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt])
            .then(validateOptionalAudience.bind(undefined, client.client_id))
            .then(validateOptionalIssuer.bind(undefined, as));
        jwtRefs.set(response, jwt);
        json = claims;
    }
    else {
        if (client.userinfo_signed_response_alg) {
            throw OPE('JWT UserInfo Response expected', JWT_USERINFO_EXPECTED, response);
        }
        json = await getResponseJsonBody(response);
    }
    assertString(json.sub, '"response" body "sub" property', INVALID_RESPONSE, { body: json });
    switch (expectedSubject) {
        case skipSubjectCheck:
            break;
        default:
            assertString(expectedSubject, '"expectedSubject"');
            if (json.sub !== expectedSubject) {
                throw OPE('unexpected "response" body "sub" property value', JSON_ATTRIBUTE_COMPARISON, {
                    expected: expectedSubject,
                    body: json,
                    attribute: 'sub',
                });
            }
    }
    return json;
}
async function authenticatedRequest(as, client, clientAuthentication, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers);
    headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method: 'POST',
        redirect: 'manual',
        signal: signal(url, options?.signal),
    });
}
async function tokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    const url = resolveEndpoint(as, 'token_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    parameters.set('grant_type', grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, parameters, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function refreshTokenGrantRequest(as, client, clientAuthentication, refreshToken, options) {
    assertAs(as);
    assertClient(client);
    assertString(refreshToken, '"refreshToken"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('refresh_token', refreshToken);
    return tokenEndpointRequest(as, client, clientAuthentication, 'refresh_token', parameters, options);
}
const idTokenClaims = new WeakMap();
const jwtRefs = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw CodedTypeError('"ref" was already garbage collected or did not resolve from the proper sources', ERR_INVALID_ARG_VALUE);
    }
    return claims;
}
async function validateApplicationLevelSignature(as, ref, options) {
    assertAs(as);
    if (!jwtRefs.has(ref)) {
        throw CodedTypeError('"ref" does not contain a processed JWT Response to verify the signature of', ERR_INVALID_ARG_VALUE);
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwtRefs.get(ref).split('.');
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith('HS')) {
        throw new UnsupportedOperationError('unsupported JWS algorithm', { cause: { alg: header.alg } });
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
async function processGenericAccessTokenResponse(as, client, response, additionalRequiredIdTokenClaims, decryptFn, recognizedTokenTypes) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Token Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.access_token, '"response" body "access_token" property', INVALID_RESPONSE, {
        body: json,
    });
    assertString(json.token_type, '"response" body "token_type" property', INVALID_RESPONSE, {
        body: json,
    });
    json.token_type = json.token_type.toLowerCase();
    if (json.expires_in !== undefined) {
        let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
        assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
            body: json,
        });
        json.expires_in = expiresIn;
    }
    if (json.refresh_token !== undefined) {
        assertString(json.refresh_token, '"response" body "refresh_token" property', INVALID_RESPONSE, {
            body: json,
        });
    }
    if (json.scope !== undefined && typeof json.scope !== 'string') {
        throw OPE('"response" body "scope" property must be a string', INVALID_RESPONSE, { body: json });
    }
    if (json.id_token !== undefined) {
        assertString(json.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
            body: json,
        });
        const requiredClaims = [];
        if (client.require_auth_time === true) {
            requiredClaims.push('auth_time');
        }
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, true, '"client.default_max_age"');
            requiredClaims.push('auth_time');
        }
        if (additionalRequiredIdTokenClaims?.length) {
            requiredClaims.push(...additionalRequiredIdTokenClaims);
        }
        const { claims, jwt } = await validateIdTokenClaims(as, client, json.id_token, requiredClaims, decryptFn);
        validateIdTokenAuthorizedParty(client, claims);
        validateIdTokenAuthTimeClaim(claims);
        jwtRefs.set(response, jwt);
        idTokenClaims.set(json, claims);
    }
    if (recognizedTokenTypes?.[json.token_type] !== undefined) {
        recognizedTokenTypes[json.token_type](response, json);
    }
    else if (json.token_type !== 'dpop' && json.token_type !== 'bearer') {
        throw new UnsupportedOperationError('unsupported `token_type` value', { cause: { body: json } });
    }
    return json;
}
function checkAuthenticationChallenges(response) {
    let challenges;
    if ((challenges = parseWwwAuthenticateChallenges(response))) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', { cause: challenges, response });
    }
}
async function processRefreshTokenResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
                expected,
                claims: result.claims,
                claim: 'aud',
            });
        }
    }
    else if (result.claims.aud !== expected) {
        throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'aud',
        });
    }
    return result;
}
function validateOptionalIssuer(as, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(as, result);
    }
    return result;
}
function validateIssuer(as, result) {
    const expected = as[_expectedIssuer]?.(result) ?? as.issuer;
    if (result.claims.iss !== expected) {
        throw OPE('unexpected JWT "iss" (issuer) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'iss',
        });
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
const nopkce = Symbol();
async function authorizationCodeGrantRequest(as, client, clientAuthentication, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw CodedTypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', ERR_INVALID_ARG_VALUE);
    }
    assertString(redirectUri, '"redirectUri"');
    const code = getURLSearchParameter(callbackParameters, 'code');
    if (!code) {
        throw OPE('no authorization code in "callbackParameters"', INVALID_RESPONSE);
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('redirect_uri', redirectUri);
    parameters.set('code', code);
    if (codeVerifier !== nopkce) {
        assertString(codeVerifier, '"codeVerifier"');
        parameters.set('code_verifier', codeVerifier);
    }
    return tokenEndpointRequest(as, client, clientAuthentication, 'authorization_code', parameters, options);
}
const jwtClaimNames = {
    aud: 'audience',
    c_hash: 'code hash',
    client_id: 'client id',
    exp: 'expiration time',
    iat: 'issued at',
    iss: 'issuer',
    jti: 'jwt id',
    nonce: 'nonce',
    s_hash: 'state hash',
    sub: 'subject',
    ath: 'access token hash',
    htm: 'http method',
    htu: 'http uri',
    cnf: 'confirmation',
    auth_time: 'authentication time',
};
function validatePresence(required, result) {
    for (const claim of required) {
        if (result.claims[claim] === undefined) {
            throw OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`, INVALID_RESPONSE, {
                claims: result.claims,
            });
        }
    }
    return result;
}
function validateStringClaim(claim, result) {
    if (typeof result.claims[claim] !== 'string') {
        throw OPE(`unexpected JWT "${claim}" (${jwtClaimNames[claim]}) claim type`, INVALID_RESPONSE, {
            claims: result.claims,
        });
    }
    return result;
}
function validateIdTokenClaims(as, client, idToken, requiredClaims, decryptFn) {
    return validateJwt(idToken, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), decryptFn)
        .then(validatePresence.bind(undefined, ['aud', 'exp', 'iat', 'iss', 'sub', ...requiredClaims]))
        .then(validateIssuer.bind(undefined, as))
        .then(validateAudience.bind(undefined, client.client_id))
        .then(validateStringClaim.bind(undefined, 'sub'));
}
function resolveIdTokenMaxAge(client, maxAge) {
    if (maxAge === skipAuthTimeCheck) {
        return maxAge;
    }
    const fromClient = maxAge === undefined;
    if (fromClient) {
        maxAge = client.default_max_age;
    }
    if (maxAge === undefined) {
        return skipAuthTimeCheck;
    }
    assertNumber(maxAge, true, fromClient ? '"client.default_max_age"' : '"maxAge" argument');
    return maxAge;
}
function validateIdTokenAuthTimeClaim(claims) {
    if (claims.auth_time !== undefined) {
        assertNumber(claims.auth_time, true, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, { claims });
    }
}
function validateIdTokenAuthTime(client, claims, maxAge) {
    if (maxAge === skipAuthTimeCheck) {
        return;
    }
    const now = epochTime() + getClockSkew(client);
    const tolerance = getClockTolerance(client);
    if (claims.auth_time + maxAge < now - tolerance) {
        throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, { claims, now, tolerance, claim: 'auth_time' });
    }
}
function validateIdTokenNonce(claims, expectedNonce) {
    const expected = expectedNonce === expectNoNonce ? undefined : expectedNonce;
    if (claims.nonce !== expected) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims,
            claim: 'nonce',
        });
    }
}
function validateIdTokenAuthorizedParty(client, claims) {
    if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
        if (claims.azp === undefined) {
            throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, { claims, claim: 'aud' });
        }
        if (claims.azp !== client.client_id) {
            throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                expected: client.client_id,
                claims,
                claim: 'azp',
            });
        }
    }
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeResponse(as, client, response, options) {
    if (typeof options?.expectedNonce === 'string' ||
        typeof options?.maxAge === 'number' ||
        options?.requireIdToken) {
        return processAuthorizationCodeOpenIDResponse(as, client, response, options.expectedNonce, options.maxAge, options[jweDecrypt], options.recognizedTokenTypes);
    }
    return processAuthorizationCodeOAuth2Response(as, client, response, options?.maxAge, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge, decryptFn, recognizedTokenTypes) {
    const additionalRequiredClaims = [];
    switch (expectedNonce) {
        case undefined:
            expectedNonce = expectNoNonce;
            break;
        case expectNoNonce:
            break;
        default:
            assertString(expectedNonce, '"expectedNonce" argument');
            additionalRequiredClaims.push('nonce');
    }
    maxAge = resolveIdTokenMaxAge(client, maxAge);
    if (maxAge !== skipAuthTimeCheck) {
        additionalRequiredClaims.push('auth_time');
    }
    const result = await processGenericAccessTokenResponse(as, client, response, additionalRequiredClaims, decryptFn, recognizedTokenTypes);
    assertString(result.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
        body: result,
    });
    const claims = getValidatedIdTokenClaims(result);
    validateIdTokenAuthTime(client, claims, maxAge);
    validateIdTokenNonce(claims, expectedNonce);
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response, maxAge, decryptFn, recognizedTokenTypes) {
    const result = await processGenericAccessTokenResponse(as, client, response, undefined, decryptFn, recognizedTokenTypes);
    const claims = getValidatedIdTokenClaims(result);
    if (claims) {
        validateIdTokenAuthTime(client, claims, resolveIdTokenMaxAge(client, maxAge));
        validateIdTokenNonce(claims, expectNoNonce);
    }
    return result;
}
const WWW_AUTHENTICATE_CHALLENGE = 'OAUTH_WWW_AUTHENTICATE_CHALLENGE';
const RESPONSE_BODY_ERROR = 'OAUTH_RESPONSE_BODY_ERROR';
const UNSUPPORTED_OPERATION = 'OAUTH_UNSUPPORTED_OPERATION';
const AUTHORIZATION_RESPONSE_ERROR = 'OAUTH_AUTHORIZATION_RESPONSE_ERROR';
const JWT_USERINFO_EXPECTED = 'OAUTH_JWT_USERINFO_EXPECTED';
const PARSE_ERROR = 'OAUTH_PARSE_ERROR';
const INVALID_RESPONSE = 'OAUTH_INVALID_RESPONSE';
const INVALID_REQUEST = 'OAUTH_INVALID_REQUEST';
const RESPONSE_IS_NOT_JSON = 'OAUTH_RESPONSE_IS_NOT_JSON';
const RESPONSE_IS_NOT_CONFORM = 'OAUTH_RESPONSE_IS_NOT_CONFORM';
const HTTP_REQUEST_FORBIDDEN = 'OAUTH_HTTP_REQUEST_FORBIDDEN';
const REQUEST_PROTOCOL_FORBIDDEN = 'OAUTH_REQUEST_PROTOCOL_FORBIDDEN';
const JWT_TIMESTAMP_CHECK = 'OAUTH_JWT_TIMESTAMP_CHECK_FAILED';
const JWT_CLAIM_COMPARISON = 'OAUTH_JWT_CLAIM_COMPARISON_FAILED';
const JSON_ATTRIBUTE_COMPARISON = 'OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED';
const KEY_SELECTION = 'OAUTH_KEY_SELECTION_FAILED';
const MISSING_SERVER_METADATA = 'OAUTH_MISSING_SERVER_METADATA';
const INVALID_SERVER_METADATA = 'OAUTH_INVALID_SERVER_METADATA';
function checkJwtType(expected, result) {
    if (typeof result.header.typ !== 'string' || normalizeTyp(result.header.typ) !== expected) {
        throw OPE('unexpected JWT "typ" header parameter value', INVALID_RESPONSE, {
            header: result.header,
        });
    }
    return result;
}
async function clientCredentialsGrantRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    return tokenEndpointRequest(as, client, clientAuthentication, 'client_credentials', new URLSearchParams(parameters), options);
}
async function genericTokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    assertAs(as);
    assertClient(client);
    assertString(grantType, '"grantType"');
    return tokenEndpointRequest(as, client, clientAuthentication, grantType, new URLSearchParams(parameters), options);
}
async function processGenericTokenEndpointResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processClientCredentialsResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function revocationRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'revocation_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    headers.delete('accept');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processRevocationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Revocation Endpoint');
    return undefined;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw CodedTypeError('"response" body has been used already', ERR_INVALID_ARG_VALUE);
    }
}
async function introspectionRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'introspection_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
        headers.set('accept', 'application/token-introspection+jwt');
    }
    else {
        headers.set('accept', 'application/json');
    }
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processIntrospectionResponse(as, client, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Introspection Endpoint');
    let json;
    if (getContentType(response) === 'application/token-introspection+jwt') {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.introspection_signed_response_alg, as.introspection_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt])
            .then(checkJwtType.bind(undefined, 'token-introspection+jwt'))
            .then(validatePresence.bind(undefined, ['aud', 'iat', 'iss']))
            .then(validateIssuer.bind(undefined, as))
            .then(validateAudience.bind(undefined, client.client_id));
        jwtRefs.set(response, jwt);
        if (!isJsonObject(claims.token_introspection)) {
            throw OPE('JWT "token_introspection" claim must be a JSON object', INVALID_RESPONSE, {
                claims,
            });
        }
        json = claims.token_introspection;
    }
    else {
        assertReadableResponse(response);
        json = await getResponseJsonBody(response);
    }
    if (typeof json.active !== 'boolean') {
        throw OPE('"response" body "active" property must be a boolean', INVALID_RESPONSE, {
            body: json,
        });
    }
    return json;
}
async function jwksRequest(as, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'jwks_uri', false, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.append('accept', 'application/jwk-set+json');
    const requestHeaders = Object.fromEntries(headers.entries());
    const headersKey = JSON.stringify(requestHeaders);
    const fetcher = options?.[customFetch] || fetch;
    const requestSignal = signal(url, options?.signal);
    jwksRequests ||= new WeakMap();
    const requests = jwksRequests.get(as) ?? new Set();
    for (const pending of requests) {
        if (pending.url === url.href &&
            pending.headers === headersKey &&
            pending.fetch === fetcher &&
            pending.signal === requestSignal) {
            return pending.promise;
        }
    }
    const pending = {
        url: url.href,
        headers: headersKey,
        fetch: fetcher,
        signal: requestSignal,
        promise: Promise.resolve()
            .then(() => fetcher(url.href, {
            body: undefined,
            headers: requestHeaders,
            method: 'GET',
            redirect: 'manual',
            signal: requestSignal,
        }))
            .then(processJwksResponse)
            .then((jwks) => {
            const uat = epochTime();
            setJwksCache(as, jwks, uat);
            return { jwks, uat };
        })
            .finally(() => {
            requests.delete(pending);
            if (!requests.size) {
                jwksRequests.delete(as);
            }
        }),
    };
    requests.add(pending);
    jwksRequests.set(as, requests);
    return pending.promise;
}
async function processJwksResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response, (response) => assertContentTypes(response, 'application/json', 'application/jwk-set+json'));
    if (!Array.isArray(json.keys)) {
        throw OPE('"response" body "keys" property must be an array', INVALID_RESPONSE, { body: json });
    }
    if (!Array.prototype.every.call(json.keys, isJsonObject)) {
        throw OPE('"response" body "keys" property members must be JWK formatted objects', INVALID_RESPONSE, { body: json });
    }
    return json;
}
function supported(alg) {
    switch (alg) {
        case 'PS256':
        case 'ES256':
        case 'RS256':
        case 'PS384':
        case 'ES384':
        case 'RS384':
        case 'PS512':
        case 'ES512':
        case 'RS512':
        case 'Ed25519':
        case 'EdDSA':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return true;
        default:
            return false;
    }
}
function checkSupportedJwsAlg(header) {
    if (!supported(header.alg)) {
        throw new UnsupportedOperationError('unsupported JWS "alg" identifier', {
            cause: { alg: header.alg },
        });
    }
}
function checkRsaKeyAlgorithm(key) {
    const { algorithm } = key;
    if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
        throw new UnsupportedOperationError(`unsupported ${algorithm.name} modulusLength`, {
            cause: key,
        });
    }
}
function ecdsaHashName(key) {
    const { algorithm } = key;
    switch (algorithm.namedCurve) {
        case 'P-256':
            return 'SHA-256';
        case 'P-384':
            return 'SHA-384';
        case 'P-521':
            return 'SHA-512';
        default:
            throw new UnsupportedOperationError('unsupported ECDSA namedCurve', { cause: key });
    }
}
function keyToSubtle(key) {
    switch (key.algorithm.name) {
        case 'ECDSA':
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key),
            };
        case 'RSA-PSS': {
            checkRsaKeyAlgorithm(key);
            switch (key.algorithm.hash.name) {
                case 'SHA-256':
                case 'SHA-384':
                case 'SHA-512':
                    return {
                        name: key.algorithm.name,
                        saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3,
                    };
                default:
                    throw new UnsupportedOperationError('unsupported RSA-PSS hash name', { cause: key });
            }
        }
        case 'RSASSA-PKCS1-v1_5':
            checkRsaKeyAlgorithm(key);
            return key.algorithm.name;
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
        case 'Ed25519':
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', { cause: key });
}
async function validateJwsSignature(protectedHeader, payload, key, signature) {
    const data = buf(`${protectedHeader}.${payload}`);
    const algorithm = keyToSubtle(key);
    const verified = await crypto.subtle.verify(algorithm, key, signature, data);
    if (!verified) {
        throw OPE('JWT signature verification failed', INVALID_RESPONSE, {
            key,
            data,
            signature,
            algorithm,
        });
    }
}
async function validateJwt(jws, checkAlg, clockSkew, clockTolerance, decryptJwt) {
    let { 0: protectedHeader, 1: payload, length } = jws.split('.');
    if (length === 5) {
        if (decryptJwt !== undefined) {
            jws = await decryptJwt(jws);
            ({ 0: protectedHeader, 1: payload, length } = jws.split('.'));
        }
        else {
            throw new UnsupportedOperationError('JWE decryption is not configured', { cause: jws });
        }
    }
    if (length !== 3) {
        throw OPE('Invalid JWT', INVALID_RESPONSE, jws);
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    }
    catch (cause) {
        throw OPE('failed to parse JWT Header body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(header)) {
        throw OPE('JWT Header must be a top level object', INVALID_RESPONSE, jws);
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new UnsupportedOperationError('no JWT "crit" header parameter extensions are supported', {
            cause: { header },
        });
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    }
    catch (cause) {
        throw OPE('failed to parse JWT Payload body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(claims)) {
        throw OPE('JWT Payload must be a top level object', INVALID_RESPONSE, jws);
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== 'number') {
            throw OPE('unexpected JWT "exp" (expiration time) claim type', INVALID_RESPONSE, { claims });
        }
        if (claims.exp <= now - clockTolerance) {
            throw OPE('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', JWT_TIMESTAMP_CHECK, { claims, now, tolerance: clockTolerance, claim: 'exp' });
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== 'number') {
            throw OPE('unexpected JWT "iat" (issued at) claim type', INVALID_RESPONSE, { claims });
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== 'string') {
            throw OPE('unexpected JWT "iss" (issuer) claim type', INVALID_RESPONSE, { claims });
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== 'number') {
            throw OPE('unexpected JWT "nbf" (not before) claim type', INVALID_RESPONSE, { claims });
        }
        if (claims.nbf > now + clockTolerance) {
            throw OPE('unexpected JWT "nbf" (not before) claim value', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: 'nbf',
            });
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
            throw OPE('unexpected JWT "aud" (audience) claim type', INVALID_RESPONSE, { claims });
        }
    }
    return { header, claims, jwt: jws };
}
async function validateJwtAuthResponse(as, client, parameters, expectedState, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    const response = getURLSearchParameter(parameters, 'response');
    if (!response) {
        throw OPE('"parameters" does not contain a JARM response', INVALID_RESPONSE);
    }
    const { claims, header, jwt } = await validateJwt(response, checkSigningAlgorithm.bind(undefined, client.authorization_signed_response_alg, as.authorization_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt])
        .then(validatePresence.bind(undefined, ['aud', 'exp', 'iss']))
        .then(validateIssuer.bind(undefined, as))
        .then(validateAudience.bind(undefined, client.client_id));
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    const result = new URLSearchParams();
    for (const [key, value] of Object.entries(claims)) {
        if (typeof value === 'string' && key !== 'aud') {
            result.set(key, value);
        }
    }
    return validateAuthResponse(as, client, result, expectedState);
}
async function idTokenHash(data, header, claimName) {
    let algorithm;
    switch (header.alg) {
        case 'RS256':
        case 'PS256':
        case 'ES256':
            algorithm = 'SHA-256';
            break;
        case 'RS384':
        case 'PS384':
        case 'ES384':
            algorithm = 'SHA-384';
            break;
        case 'RS512':
        case 'PS512':
        case 'ES512':
        case 'Ed25519':
        case 'EdDSA':
            algorithm = 'SHA-512';
            break;
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            algorithm = { name: 'cSHAKE256', length: 512, outputLength: 512 };
            break;
        default:
            throw new UnsupportedOperationError(`unsupported JWS algorithm for ${claimName} calculation`, { cause: { alg: header.alg } });
    }
    const digest = await crypto.subtle.digest(algorithm, buf(data));
    return b64u(digest.slice(0, digest.byteLength / 2));
}
async function idTokenHashMatches(data, actual, header, claimName) {
    const expected = await idTokenHash(data, header, claimName);
    return actual === expected;
}
async function validateDetachedSignatureResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, true);
}
async function validateCodeIdTokenResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, false);
}
async function consumeStream(request) {
    if (request.bodyUsed) {
        throw CodedTypeError('form_post Request instances must contain a readable body', ERR_INVALID_ARG_VALUE, { cause: request });
    }
    return request.text();
}
async function formPostResponse(request) {
    if (request.method !== 'POST') {
        throw CodedTypeError('form_post responses are expected to use the POST method', ERR_INVALID_ARG_VALUE, { cause: request });
    }
    if (getContentType(request) !== 'application/x-www-form-urlencoded') {
        throw CodedTypeError('form_post responses are expected to use the application/x-www-form-urlencoded content-type', ERR_INVALID_ARG_VALUE, { cause: request });
    }
    return consumeStream(request);
}
async function validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, fapi) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        if (!parameters.hash.length) {
            throw CodedTypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters', ERR_INVALID_ARG_VALUE);
        }
        parameters = new URLSearchParams(parameters.hash.slice(1));
    }
    else if (looseInstanceOf(parameters, Request)) {
        parameters = new URLSearchParams(await formPostResponse(parameters));
    }
    else if (parameters instanceof URLSearchParams) {
        parameters = new URLSearchParams(parameters);
    }
    else {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, URL, or Response', ERR_INVALID_ARG_TYPE);
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    parameters.delete('id_token');
    switch (expectedState) {
        case undefined:
        case expectNoState:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
    }
    const result = validateAuthResponse({
        ...as,
        authorization_response_iss_parameter_supported: false,
    }, client, parameters, expectedState);
    if (!id_token) {
        throw OPE('"parameters" does not contain an ID Token', INVALID_RESPONSE);
    }
    const code = getURLSearchParameter(parameters, 'code');
    if (!code) {
        throw OPE('"parameters" does not contain an Authorization Code', INVALID_RESPONSE);
    }
    const requiredClaims = ['nonce', 'c_hash'];
    const state = parameters.get('state');
    if (fapi && (typeof expectedState === 'string' || state !== null)) {
        requiredClaims.push('s_hash');
    }
    maxAge = resolveIdTokenMaxAge(client, maxAge);
    if (client.require_auth_time || maxAge !== skipAuthTimeCheck) {
        requiredClaims.push('auth_time');
    }
    const { claims, header, jwt } = await validateIdTokenClaims(as, client, id_token, requiredClaims, options?.[jweDecrypt]);
    const clockSkew = getClockSkew(client);
    const now = epochTime() + clockSkew;
    if (claims.iat < now - 3600) {
        throw OPE('unexpected JWT "iat" (issued at) claim value, it is too far in the past', JWT_TIMESTAMP_CHECK, { now, claims, claim: 'iat' });
    }
    assertString(claims.c_hash, 'ID Token "c_hash" (code hash) claim value', INVALID_RESPONSE, {
        claims,
    });
    validateIdTokenAuthTimeClaim(claims);
    validateIdTokenAuthTime(client, claims, maxAge);
    assertString(expectedNonce, '"expectedNonce" argument');
    validateIdTokenNonce(claims, expectedNonce);
    validateIdTokenAuthorizedParty(client, claims);
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if ((await idTokenHashMatches(code, claims.c_hash, header, 'c_hash')) !== true) {
        throw OPE('invalid ID Token "c_hash" (code hash) claim value', JWT_CLAIM_COMPARISON, {
            code,
            alg: header.alg,
            claim: 'c_hash',
            claims,
        });
    }
    if ((fapi && state !== null) || claims.s_hash !== undefined) {
        assertString(claims.s_hash, 'ID Token "s_hash" (state hash) claim value', INVALID_RESPONSE, {
            claims,
        });
        assertString(state, '"state" response parameter', INVALID_RESPONSE, { parameters });
        if ((await idTokenHashMatches(state, claims.s_hash, header, 's_hash')) !== true) {
            throw OPE('invalid ID Token "s_hash" (state hash) claim value', JWT_CLAIM_COMPARISON, {
                state,
                alg: header.alg,
                claim: 's_hash',
                claims,
            });
        }
    }
    return result;
}
function checkSigningAlgorithm(client, issuer, fallback, header) {
    if (client !== undefined) {
        if (typeof client === 'string' ? header.alg !== client : !client.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: client,
                reason: 'client configuration',
            });
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: issuer,
                reason: 'authorization server metadata',
            });
        }
        return;
    }
    if (fallback !== undefined) {
        if (typeof fallback === 'string'
            ? header.alg !== fallback
            : typeof fallback === 'function'
                ? !fallback(header.alg)
                : !fallback.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: fallback,
                reason: 'default value',
            });
        }
        return;
    }
    throw OPE('missing client or server configuration to verify used JWT "alg" header parameter', undefined, { client, issuer, fallback });
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw OPE(`"${name}" parameter must be provided only once`, INVALID_RESPONSE);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    if (getURLSearchParameter(parameters, 'response')) {
        throw OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', INVALID_RESPONSE, { parameters });
    }
    const iss = getURLSearchParameter(parameters, 'iss');
    const state = getURLSearchParameter(parameters, 'state');
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw OPE('response parameter "iss" (issuer) missing', INVALID_RESPONSE, { parameters });
    }
    if (iss && iss !== as.issuer) {
        throw OPE('unexpected "iss" (issuer) response parameter value', INVALID_RESPONSE, {
            expected: as.issuer,
            parameters,
        });
    }
    switch (expectedState) {
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw OPE('unexpected "state" response parameter encountered', INVALID_RESPONSE, {
                    expected: undefined,
                    parameters,
                });
            }
            break;
        case skipStateCheck:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
            if (state !== expectedState) {
                throw OPE(state === undefined
                    ? 'response parameter "state" missing'
                    : 'unexpected "state" response parameter value', INVALID_RESPONSE, { expected: expectedState, parameters });
            }
    }
    const error = getURLSearchParameter(parameters, 'error');
    if (error) {
        throw new AuthorizationResponseError('authorization response from the server is an error', {
            cause: parameters,
        });
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    const token = getURLSearchParameter(parameters, 'token');
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError('implicit and hybrid flows are not supported');
    }
    return brand(new URLSearchParams(parameters));
}
function algToSubtle(alg) {
    switch (alg) {
        case 'PS256':
        case 'PS384':
        case 'PS512':
            return { name: 'RSA-PSS', hash: `SHA-${alg.slice(-3)}` };
        case 'RS256':
        case 'RS384':
        case 'RS512':
            return { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${alg.slice(-3)}` };
        case 'ES256':
        case 'ES384':
            return { name: 'ECDSA', namedCurve: `P-${alg.slice(-3)}` };
        case 'ES512':
            return { name: 'ECDSA', namedCurve: 'P-521' };
        case 'EdDSA':
            return 'Ed25519';
        case 'Ed25519':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return alg;
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', { cause: { alg } });
    }
}
async function importJwk(alg, jwk) {
    const { ext, key_ops, use, ...key } = jwk;
    return crypto.subtle.importKey('jwk', key, algToSubtle(alg), true, ['verify']);
}
async function deviceAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'device_authorization_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processDeviceAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Device Authorization Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.device_code, '"response" body "device_code" property', INVALID_RESPONSE, {
        body: json,
    });
    assertString(json.user_code, '"response" body "user_code" property', INVALID_RESPONSE, {
        body: json,
    });
    assertString(json.verification_uri, '"response" body "verification_uri" property', INVALID_RESPONSE, { body: json });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json,
    });
    json.expires_in = expiresIn;
    if (json.verification_uri_complete !== undefined) {
        assertString(json.verification_uri_complete, '"response" body "verification_uri_complete" property', INVALID_RESPONSE, { body: json });
    }
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json,
        });
    }
    return json;
}
async function deviceCodeGrantRequest(as, client, clientAuthentication, deviceCode, options) {
    assertAs(as);
    assertClient(client);
    assertString(deviceCode, '"deviceCode"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('device_code', deviceCode);
    return tokenEndpointRequest(as, client, clientAuthentication, 'urn:ietf:params:oauth:grant-type:device_code', parameters, options);
}
async function processDeviceCodeResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function generateKeyPair(alg, options) {
    assertString(alg, '"alg"');
    const algorithm = algToSubtle(alg);
    if (alg.startsWith('PS') || alg.startsWith('RS')) {
        Object.assign(algorithm, {
            modulusLength: options?.modulusLength ?? 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        });
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [
        'sign',
        'verify',
    ]);
}
function normalizeHtu(htu) {
    const url = new URL(htu);
    url.search = '';
    url.hash = '';
    return url.href;
}
async function validateDPoP(request, accessToken, accessTokenClaims, options) {
    const headerValue = request.headers.get('dpop');
    if (headerValue === null) {
        throw OPE('operation indicated DPoP use but the request has no DPoP HTTP Header', INVALID_REQUEST, { headers: request.headers });
    }
    if (request.headers.get('authorization')?.toLowerCase().startsWith('dpop ') === false) {
        throw OPE(`operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP`, INVALID_REQUEST, { headers: request.headers });
    }
    if (typeof accessTokenClaims.cnf?.jkt !== 'string') {
        throw OPE('operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim', INVALID_REQUEST, { claims: accessTokenClaims });
    }
    const clockSkew = getClockSkew(options);
    const proof = await validateJwt(headerValue, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), clockSkew, getClockTolerance(options), undefined)
        .then(checkJwtType.bind(undefined, 'dpop+jwt'))
        .then(validatePresence.bind(undefined, ['iat', 'jti', 'ath', 'htm', 'htu']))
        .then(validateStringClaim.bind(undefined, 'jti'));
    const now = epochTime() + clockSkew;
    const diff = Math.abs(now - proof.claims.iat);
    if (diff > 300) {
        throw OPE('DPoP Proof iat is not recent enough', JWT_TIMESTAMP_CHECK, {
            now,
            claims: proof.claims,
            claim: 'iat',
        });
    }
    if (proof.claims.htm !== request.method) {
        throw OPE('DPoP Proof htm mismatch', JWT_CLAIM_COMPARISON, {
            expected: request.method,
            claims: proof.claims,
            claim: 'htm',
        });
    }
    if (typeof proof.claims.htu !== 'string' ||
        normalizeHtu(proof.claims.htu) !== normalizeHtu(request.url)) {
        throw OPE('DPoP Proof htu mismatch', JWT_CLAIM_COMPARISON, {
            expected: normalizeHtu(request.url),
            claims: proof.claims,
            claim: 'htu',
        });
    }
    {
        const expected = b64u(await crypto.subtle.digest('SHA-256', buf(accessToken)));
        if (proof.claims.ath !== expected) {
            throw OPE('DPoP Proof ath mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: proof.claims,
                claim: 'ath',
            });
        }
    }
    const { jwk, alg } = proof.header;
    if (!isJsonObject(jwk)) {
        throw OPE('DPoP Proof jwk header parameter must be a JSON object', INVALID_REQUEST, {
            header: proof.header,
        });
    }
    {
        const expected = await calculateJwkThumbprint(jwk);
        if (accessTokenClaims.cnf.jkt !== expected) {
            throw OPE('JWT Access Token confirmation mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: accessTokenClaims,
                claim: 'cnf.jkt',
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = headerValue.split('.');
    const signature = b64u(encodedSignature);
    const key = await importJwk(alg, jwk);
    if (key.type !== 'public') {
        throw OPE('DPoP Proof jwk header parameter must contain a public key', INVALID_REQUEST, {
            header: proof.header,
        });
    }
    await validateJwsSignature(protectedHeader, payload, key, signature);
}
async function validateJwtAccessToken(as, request, expectedAudience, options) {
    assertAs(as);
    if (!looseInstanceOf(request, Request)) {
        throw CodedTypeError('"request" must be an instance of Request', ERR_INVALID_ARG_TYPE);
    }
    assertString(expectedAudience, '"expectedAudience"');
    const authorization = request.headers.get('authorization');
    if (authorization === null) {
        throw OPE('"request" is missing an Authorization HTTP Header', INVALID_REQUEST, {
            headers: request.headers,
        });
    }
    let { 0: scheme, 1: accessToken, length } = authorization.split(/ +/);
    scheme = scheme.toLowerCase();
    switch (scheme) {
        case 'dpop':
        case 'bearer':
            break;
        default:
            throw new UnsupportedOperationError('unsupported Authorization HTTP Header scheme', {
                cause: { headers: request.headers },
            });
    }
    if (length !== 2) {
        throw OPE('invalid Authorization HTTP Header format', INVALID_REQUEST, {
            headers: request.headers,
        });
    }
    const requiredClaims = [
        'iss',
        'exp',
        'aud',
        'sub',
        'iat',
        'jti',
        'client_id',
    ];
    if (options?.requireDPoP || scheme === 'dpop' || request.headers.has('dpop')) {
        requiredClaims.push('cnf');
    }
    const { claims, header } = await validateJwt(accessToken, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), getClockSkew(options), getClockTolerance(options), undefined)
        .then(checkJwtType.bind(undefined, 'at+jwt'))
        .then(validatePresence.bind(undefined, requiredClaims))
        .then(validateIssuer.bind(undefined, as))
        .then(validateAudience.bind(undefined, expectedAudience))
        .catch(reassignRSCode);
    for (const claim of ['client_id', 'jti', 'sub']) {
        if (typeof claims[claim] !== 'string') {
            throw OPE(`unexpected JWT "${claim}" claim type`, INVALID_REQUEST, { claims });
        }
    }
    if ('cnf' in claims) {
        if (!isJsonObject(claims.cnf)) {
            throw OPE('unexpected JWT "cnf" (confirmation) claim value', INVALID_REQUEST, { claims });
        }
        const { 0: cnf, length } = Object.keys(claims.cnf);
        if (length) {
            if (length !== 1) {
                throw new UnsupportedOperationError('multiple confirmation claims are not supported', {
                    cause: { claims },
                });
            }
            if (cnf !== 'jkt') {
                throw new UnsupportedOperationError('unsupported JWT Confirmation method', {
                    cause: { claims },
                });
            }
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = accessToken.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (options?.requireDPoP ||
        scheme === 'dpop' ||
        claims.cnf?.jkt !== undefined ||
        request.headers.has('dpop')) {
        await validateDPoP(request, accessToken, claims, options).catch(reassignRSCode);
    }
    return claims;
}
function reassignRSCode(err) {
    if (err instanceof OperationProcessingError && err?.code === INVALID_REQUEST) {
        err.code = INVALID_RESPONSE;
    }
    throw err;
}
async function backchannelAuthenticationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'backchannel_authentication_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processBackchannelAuthenticationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Backchannel Authentication Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.auth_req_id, '"response" body "auth_req_id" property', INVALID_RESPONSE, {
        body: json,
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json,
    });
    json.expires_in = expiresIn;
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json,
        });
    }
    return json;
}
async function backchannelAuthenticationGrantRequest(as, client, clientAuthentication, authReqId, options) {
    assertAs(as);
    assertClient(client);
    assertString(authReqId, '"authReqId"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('auth_req_id', authReqId);
    return tokenEndpointRequest(as, client, clientAuthentication, 'urn:openid:params:grant-type:ciba', parameters, options);
}
async function processBackchannelAuthenticationGrantResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function dynamicClientRegistrationRequest(as, metadata, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'registration_endpoint', metadata.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.set('content-type', 'application/json');
    const method = 'POST';
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method, options.initialAccessToken);
    }
    if (options?.initialAccessToken) {
        headers.set('authorization', `${headers.has('dpop') ? 'DPoP' : 'Bearer'} ${options.initialAccessToken}`);
    }
    const response = await (options?.[customFetch] || fetch)(url.href, {
        body: JSON.stringify(metadata),
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: signal(url, options?.signal),
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function processDynamicClientRegistrationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, 'Dynamic Client Registration Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.client_id, '"response" body "client_id" property', INVALID_RESPONSE, {
        body: json,
    });
    if (json.client_secret !== undefined) {
        assertString(json.client_secret, '"response" body "client_secret" property', INVALID_RESPONSE, {
            body: json,
        });
    }
    if (json.client_secret) {
        assertNumber(json.client_secret_expires_at, true, '"response" body "client_secret_expires_at" property', INVALID_RESPONSE, {
            body: json,
        });
    }
    return json;
}
async function resourceDiscoveryRequest(resourceIdentifier, options) {
    return performDiscovery(resourceIdentifier, 'resourceIdentifier', (url) => {
        prependWellKnown(url, '.well-known/oauth-protected-resource', true);
        return url;
    }, options);
}
async function processResourceDiscoveryResponse(expectedResourceIdentifier, response) {
    const expected = expectedResourceIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedResourceIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Resource Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.resource, '"response" body "resource" property', INVALID_RESPONSE, {
        body: json,
    });
    if (expected !== _nodiscoverycheck && new URL(json.resource).href !== expected.href) {
        throw OPE('"response" body "resource" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, { expected: expected.href, body: json, attribute: 'resource' });
    }
    return json;
}
async function getResponseJsonBody(response, check = assertApplicationJson) {
    let json;
    try {
        json = await response.json();
    }
    catch (cause) {
        check(response);
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, { body: json });
    }
    return json;
}
const _nopkce = (/* unused pure expression or super */ null && (nopkce));
const _nodiscoverycheck = Symbol();
const _expectedIssuer = Symbol();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 942652:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ init)
/* harmony export */ });
/* unused harmony export defaultCallbacks */
/* harmony import */ var _jwt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401945);
/* harmony import */ var _utils_callback_url_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(770059);
/* harmony import */ var _utils_cookie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(269806);
/* harmony import */ var _actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125462);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(558761);
/* harmony import */ var _utils_providers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(161356);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93316);
/* harmony import */ var _utils_merge_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(135298);








const defaultCallbacks = {
    signIn() {
        return true;
    },
    redirect({ url, baseUrl }) {
        if (url.startsWith("/"))
            return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl)
            return url;
        return baseUrl;
    },
    session({ session }) {
        return {
            user: {
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image,
            },
            expires: session.expires?.toISOString?.() ?? session.expires,
        };
    },
    jwt({ token }) {
        return token;
    },
};
/** Initialize all internal options and cookies. */
async function init({ authOptions: config, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost, }) {
    const logger = (0,_utils_logger_js__WEBPACK_IMPORTED_MODULE_5__/* .setLogger */ .B)(config);
    const { providers, provider } = (0,_utils_providers_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay)({ url, providerId, config });
    const maxAge = 30 * 24 * 60 * 60; // Sessions expire after 30 days of being idle by default
    let isOnRedirectProxy = false;
    if ((provider?.type === "oauth" || provider?.type === "oidc") &&
        provider.redirectProxyUrl) {
        try {
            isOnRedirectProxy =
                new URL(provider.redirectProxyUrl).origin === url.origin;
        }
        catch {
            throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
        }
    }
    // User provided options are overridden by other options,
    // except for the options with special handling above
    const options = {
        debug: false,
        pages: {},
        theme: {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: "",
        },
        // Custom options override defaults
        ...config,
        // These computed settings can have values in userOptions but we override them
        // and are request-specific.
        url,
        action,
        // @ts-expect-errors
        provider,
        cookies: (0,_utils_merge_js__WEBPACK_IMPORTED_MODULE_6__/* .merge */ .h)(_utils_cookie_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultCookies */ .X(config.useSecureCookies ?? url.protocol === "https:"), config.cookies),
        providers,
        // Session options
        session: {
            // If no adapter specified, force use of JSON Web Tokens (stateless)
            strategy: config.adapter ? "database" : "jwt",
            maxAge,
            updateAge: 24 * 60 * 60,
            generateSessionToken: () => crypto.randomUUID(),
            ...config.session,
        },
        // JWT options
        jwt: {
            secret: config.secret, // Asserted in assert.ts
            maxAge: config.session?.maxAge ?? maxAge, // default to same as `session.maxAge`
            encode: _jwt_js__WEBPACK_IMPORTED_MODULE_0__/* .encode */ .lF,
            decode: _jwt_js__WEBPACK_IMPORTED_MODULE_0__/* .decode */ .D4,
            ...config.jwt,
        },
        // Event messages
        events: eventsErrorHandler(config.events ?? {}, logger),
        adapter: adapterErrorHandler(config.adapter, logger),
        // Callback functions
        callbacks: { ...defaultCallbacks, ...config.callbacks },
        logger,
        callbackUrl: url.origin,
        isOnRedirectProxy,
        experimental: {
            ...config.experimental,
        },
    };
    // Init cookies
    const cookies = [];
    if (csrfDisabled) {
        options.csrfTokenVerified = true;
    }
    else {
        const { csrfToken, cookie: csrfCookie, csrfTokenVerified, } = await (0,_actions_callback_oauth_csrf_token_js__WEBPACK_IMPORTED_MODULE_2__/* .createCSRFToken */ .i)({
            options,
            cookieValue: reqCookies?.[options.cookies.csrfToken.name],
            isPost,
            bodyValue: reqCsrfToken,
        });
        options.csrfToken = csrfToken;
        options.csrfTokenVerified = csrfTokenVerified;
        if (csrfCookie) {
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: csrfCookie,
                options: options.cookies.csrfToken.options,
            });
        }
    }
    const { callbackUrl, callbackUrlCookie } = await (0,_utils_callback_url_js__WEBPACK_IMPORTED_MODULE_7__/* .createCallbackUrl */ .z)({
        options,
        cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
        paramValue: reqCallbackUrl,
    });
    options.callbackUrl = callbackUrl;
    if (callbackUrlCookie) {
        cookies.push({
            name: options.cookies.callbackUrl.name,
            value: callbackUrlCookie,
            options: options.cookies.callbackUrl.options,
        });
    }
    return { options, cookies };
}
/** Wraps an object of methods and adds error handling. */
function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce((acc, name) => {
        acc[name] = async (...args) => {
            try {
                const method = methods[name];
                return await method(...args);
            }
            catch (e) {
                logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_3__/* .EventError */ .PM(e));
            }
        };
        return acc;
    }, {});
}
/** Handles adapter induced errors. */
function adapterErrorHandler(adapter, logger) {
    if (!adapter)
        return;
    return Object.keys(adapter).reduce((acc, name) => {
        acc[name] = async (...args) => {
            try {
                logger.debug(`adapter_${name}`, { args });
                const method = adapter[name];
                return await method(...args);
            }
            catch (e) {
                const error = new _errors_js__WEBPACK_IMPORTED_MODULE_3__/* .AdapterError */ .om(e);
                logger.error(error);
                throw error;
            }
        };
        return acc;
    }, {});
}


/***/ }),

/***/ 943648:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ fromDate)
/* harmony export */ });
/**
 * Takes a number in seconds and returns the date in the future.
 * Optionally takes a second date parameter. In that case
 * the date in the future will be calculated from that date instead of now.
 */
function fromDate(time, date = Date.now()) {
    return new Date(date + time * 1000);
}


/***/ }),

/***/ 987019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ handleOAuth)
/* harmony export */ });
/* unused harmony export getUserAndAccount */
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134033);
/* harmony import */ var oauth4webapi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(932384);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);
/* harmony import */ var _utils_providers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(161356);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(399389);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5578);






function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/%20/g, "+");
}
/**
 * Formats client_id and client_secret as an HTTP Basic Authentication header as per the OAuth 2.0
 * specified in RFC6749.
 */
function clientSecretBasic(clientId, clientSecret) {
    const username = formUrlEncode(clientId);
    const password = formUrlEncode(clientSecret);
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
/**
 * Handles the following OAuth steps.
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
 * https://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 *
 * @note Although requesting userinfo is not required by the OAuth2.0 spec,
 * we fetch it anyway. This is because we always want a user profile.
 */
async function handleOAuth(params, cookies, options) {
    const { logger, provider } = options;
    let as;
    const { token, userinfo } = provider;
    // Falls back to authjs.dev if the user only passed params
    if ((!token?.url || token.url.host === "authjs.dev") &&
        (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
        // We assume that issuer is always defined as this has been asserted earlier
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .discoveryRequest */ .CN(issuer, {
            [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .allowInsecureRequests */ .cm]: true,
            [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .customFetch */ .A6]: provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .customFetch */ .A6],
        });
        as = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .processDiscoveryResponse */ .vA(issuer, discoveryResponse);
        if (!as.token_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
        if (!as.userinfo_endpoint)
            throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
    }
    else {
        as = {
            issuer: provider.issuer ?? "https://authjs.dev", // TODO: review fallback issuer
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString(),
        };
    }
    const client = {
        client_id: provider.clientId,
        ...provider.client,
    };
    let clientAuth;
    switch (client.token_endpoint_auth_method) {
        // TODO: in the next breaking major version have undefined be `client_secret_post`
        case undefined:
        case "client_secret_basic":
            // TODO: in the next breaking major version use o.ClientSecretBasic() here
            clientAuth = (_as, _client, _body, headers) => {
                headers.set("authorization", clientSecretBasic(provider.clientId, provider.clientSecret));
            };
            break;
        case "client_secret_post":
            clientAuth = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .ClientSecretPost */ .qm(provider.clientSecret);
            break;
        case "client_secret_jwt":
            clientAuth = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .ClientSecretJwt */ .pH(provider.clientSecret);
            break;
        case "private_key_jwt":
            clientAuth = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .PrivateKeyJwt */ .IX(provider.token.clientPrivateKey, {
                // TODO: review in the next breaking change
                [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .modifyAssertion */ .LB](_header, payload) {
                    payload.aud = [as.issuer, as.token_endpoint];
                },
            });
            break;
        case "none":
            clientAuth = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .None */ .NV();
            break;
        default:
            throw new Error("unsupported client authentication method");
    }
    const resCookies = [];
    const state = await _checks_js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .wk.use(cookies, resCookies, options);
    let codeGrantParams;
    try {
        codeGrantParams = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .validateAuthResponse */ .kO(as, client, new URLSearchParams(params), provider.checks.includes("state") ? state : oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .skipStateCheck */ .ZC);
    }
    catch (err) {
        if (err instanceof oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .AuthorizationResponseError */ .pG) {
            const cause = {
                providerId: provider.id,
                ...Object.fromEntries(err.cause.entries()),
            };
            logger.debug("OAuthCallbackError", cause);
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .OAuthCallbackError */ .rk("OAuth Provider returned an error", cause);
        }
        throw err;
    }
    const codeVerifier = await _checks_js__WEBPACK_IMPORTED_MODULE_0__/* .pkce */ .aC.use(cookies, resCookies, options);
    let redirect_uri = provider.callbackUrl;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
    }
    let codeGrantResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .authorizationCodeGrantRequest */ .m(as, client, clientAuth, codeGrantParams, redirect_uri, codeVerifier ?? "decoy", {
        // TODO: move away from allowing insecure HTTP requests
        [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .allowInsecureRequests */ .cm]: true,
        [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .customFetch */ .A6]: (...args) => {
            if (!provider.checks.includes("pkce")) {
                args[1].body.delete("code_verifier");
            }
            return (provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .customFetch */ .A6] ?? fetch)(...args);
        },
    });
    if (provider.token?.conform) {
        codeGrantResponse =
            (await provider.token.conform(codeGrantResponse.clone())) ??
                codeGrantResponse;
    }
    let profile = {};
    const requireIdToken = (0,_utils_providers_js__WEBPACK_IMPORTED_MODULE_2__/* .isOIDCProvider */ .ZE)(provider);
    if (provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .conformInternal */ .qo]) {
        switch (provider.id) {
            case "microsoft-entra-id":
            case "azure-ad": {
                /**
                 * These providers return errors in the response body and
                 * need the authorization server metadata to be re-processed
                 * based on the `id_token`'s `tid` claim.
                 * @see: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow#error-response-1
                 */
                const responseJson = await codeGrantResponse.clone().json();
                if (responseJson.error) {
                    const cause = {
                        providerId: provider.id,
                        ...responseJson,
                    };
                    throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .OAuthCallbackError */ .rk(`OAuth Provider returned an error: ${responseJson.error}`, cause);
                }
                const { tid } = (0,jose__WEBPACK_IMPORTED_MODULE_5__/* .decodeJwt */ .i)(responseJson.id_token);
                if (typeof tid === "string") {
                    const tenantRe = /microsoftonline\.com\/(\w+)\/v2\.0/;
                    const tenantId = as.issuer?.match(tenantRe)?.[1] ?? "common";
                    const issuer = new URL(as.issuer.replace(tenantId, tid));
                    const discoveryResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .discoveryRequest */ .CN(issuer, {
                        [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .customFetch */ .A6]: provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .customFetch */ .A6],
                    });
                    as = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .processDiscoveryResponse */ .vA(issuer, discoveryResponse);
                }
                break;
            }
            default:
                break;
        }
    }
    const processedCodeResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .processAuthorizationCodeResponse */ .d_(as, client, codeGrantResponse, {
        expectedNonce: await _checks_js__WEBPACK_IMPORTED_MODULE_0__/* .nonce */ .KU.use(cookies, resCookies, options),
        requireIdToken,
    });
    const tokens = processedCodeResponse;
    if (requireIdToken) {
        const idTokenClaims = oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .getValidatedIdTokenClaims */ .ON(processedCodeResponse);
        profile = idTokenClaims;
        // Apple sends some of the user information in a `user` parameter as a stringified JSON.
        // It also only does so the first time the user consents to share their information.
        if (provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .conformInternal */ .qo] && provider.id === "apple") {
            try {
                profile.user = JSON.parse(params?.user);
            }
            catch { }
        }
        if (provider.idToken === false) {
            const userinfoResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .userInfoRequest */ .$W(as, client, processedCodeResponse.access_token, {
                [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .customFetch */ .A6]: provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .customFetch */ .A6],
                // TODO: move away from allowing insecure HTTP requests
                [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .allowInsecureRequests */ .cm]: true,
            });
            profile = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .processUserInfoResponse */ .Cz(as, client, idTokenClaims.sub, userinfoResponse);
        }
    }
    else {
        if (userinfo?.request) {
            const _profile = await userinfo.request({ tokens, provider });
            if (_profile instanceof Object)
                profile = _profile;
        }
        else if (userinfo?.url) {
            const userinfoResponse = await oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .userInfoRequest */ .$W(as, client, processedCodeResponse.access_token, {
                [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .customFetch */ .A6]: provider[_symbols_js__WEBPACK_IMPORTED_MODULE_3__/* .customFetch */ .A6],
                // TODO: move away from allowing insecure HTTP requests
                [oauth4webapi__WEBPACK_IMPORTED_MODULE_4__/* .allowInsecureRequests */ .cm]: true,
            });
            profile = await userinfoResponse.json();
        }
        else {
            throw new TypeError("No userinfo endpoint configured");
        }
    }
    if (tokens.expires_in) {
        tokens.expires_at =
            Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
    }
    const profileResult = await getUserAndAccount(profile, provider, tokens, logger);
    return { ...profileResult, profile, cookies: resCookies };
}
/**
 * Returns the user and account that is going to be created in the database.
 * @internal
 */
async function getUserAndAccount(OAuthProfile, provider, tokens, logger) {
    try {
        const userFromProfile = await provider.profile(OAuthProfile, tokens);
        const user = {
            ...userFromProfile,
            // The user's id is intentionally not set based on the profile id, as
            // the user should remain independent of the provider and the profile id
            // is saved on the Account already, as `providerAccountId`.
            id: crypto.randomUUID(),
            email: userFromProfile.email?.toLowerCase(),
        };
        return {
            user,
            account: {
                ...tokens,
                provider: provider.id,
                type: provider.type,
                providerAccountId: userFromProfile.id ?? crypto.randomUUID(),
            },
        };
    }
    catch (e) {
        // If we didn't get a response either there was a problem with the provider
        // response *or* the user cancelled the action with the provider.
        //
        // Unfortunately, we can't tell which - at least not in a way that works for
        // all providers, so we return an empty object; the user should then be
        // redirected back to the sign up page. We log the error to help developers
        // who might be trying to debug this when configuring a new provider.
        logger.debug("getProfile error details", OAuthProfile);
        logger.error(new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .OAuthProfileParseError */ ._z(e, { provider: provider.id }));
    }
}


/***/ }),

/***/ 991781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ sendToken)
/* harmony export */ });
/* unused harmony export defaultNormalizer */
/* harmony import */ var _utils_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(663236);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(558761);


/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter).
 * At the end, it returns a redirect to the `verify-request` page.
 */
async function sendToken(request, options) {
    const { body } = request;
    const { provider, callbacks, adapter } = options;
    const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
    const email = normalizer(body?.email);
    const defaultUser = { id: crypto.randomUUID(), email, emailVerified: null };
    const user = (await adapter.getUserByEmail(email)) ?? defaultUser;
    const account = {
        providerAccountId: email,
        userId: user.id,
        type: "email",
        provider: provider.id,
    };
    let authorized;
    try {
        authorized = await callbacks.signIn({
            user,
            account,
            email: { verificationRequest: true },
        });
    }
    catch (e) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .AccessDenied */ .Oy(e);
    }
    if (!authorized)
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_1__/* .AccessDenied */ .Oy("AccessDenied");
    if (typeof authorized === "string") {
        return {
            redirect: await callbacks.redirect({
                url: authorized,
                baseUrl: options.url.origin,
            }),
        };
    }
    const { callbackUrl, theme } = options;
    const token = (await provider.generateVerificationToken?.()) ?? (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .randomString */ .DU)(32);
    const ONE_DAY_IN_SECONDS = 86400;
    const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000);
    const secret = provider.secret ?? options.secret;
    const baseUrl = new URL(options.basePath, options.url.origin);
    const sendRequest = provider.sendVerificationRequest({
        identifier: email,
        token,
        expires,
        url: `${baseUrl}/callback/${provider.id}?${new URLSearchParams({
            callbackUrl,
            token,
            email,
        })}`,
        provider,
        theme,
        request: (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .toRequest */ .d_)(request),
    });
    const createToken = adapter.createVerificationToken?.({
        identifier: email,
        token: await (0,_utils_web_js__WEBPACK_IMPORTED_MODULE_0__/* .createHash */ .n1)(`${token}${secret}`),
        expires,
    });
    await Promise.all([sendRequest, createToken]);
    return {
        redirect: `${baseUrl}/verify-request?${new URLSearchParams({
            provider: provider.id,
            type: provider.type,
        })}`,
    };
}
function defaultNormalizer(email) {
    if (!email)
        throw new Error("Missing email from request body.");
    // Apply Unicode NFKC normalization *before* validation. Without this, a
    // character that is a homoglyph of `@` (e.g. U+FF20 FULLWIDTH COMMERCIAL AT)
    // passes the single-`@` check below, but can later be canonicalized to an
    // ASCII `@` by a downstream address parser, splitting the address into
    // multiple recipients. Normalizing first ensures any such homoglyph is
    // turned into a real `@` and rejected by the checks below.
    const trimmedEmail = email.normalize("NFKC").toLowerCase().trim();
    // Reject email addresses with quotes to prevent address parser confusion
    // This prevents attacks like "attacker@evil.com"@victim.com
    if (trimmedEmail.includes('"')) {
        throw new Error("Invalid email address format.");
    }
    // Get the first two elements only,
    // separated by `@` from user input.
    let [local, domain] = trimmedEmail.split("@");
    // Validate that we have exactly 2 parts (local and domain)
    if (!local || !domain || trimmedEmail.split("@").length !== 2) {
        throw new Error("Invalid email address format.");
    }
    // The part before "@" can contain a ","
    // but we remove it on the domain part
    domain = domain.split(",")[0];
    // Additional validation: domain should not be empty after comma split
    if (!domain) {
        throw new Error("Invalid email address format.");
    }
    return `${local}@${domain}`;
}


/***/ })

};
;