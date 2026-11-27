"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[2760],{

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

/***/ 37206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport default from dynamic */ _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75707);
/* harmony import */ var _shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_lib_app_dynamic__WEBPACK_IMPORTED_MODULE_0__);



//# sourceMappingURL=app-dynamic.js.map

/***/ }),

/***/ 39975:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dl: () => (/* binding */ parseUrl),
/* harmony export */   Fd: () => (/* binding */ fetchData),
/* harmony export */   Lm: () => (/* binding */ useOnline),
/* harmony export */   Og: () => (/* binding */ ClientSessionError),
/* harmony export */   tB: () => (/* binding */ now),
/* harmony export */   tj: () => (/* binding */ apiBaseUrl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _auth_core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41631);
/* __next_internal_client_entry_do_not_use__ ClientSessionError,fetchData,apiBaseUrl,useOnline,now,parseUrl auto */ 

/** @todo */ class ClientFetchError extends _auth_core_errors__WEBPACK_IMPORTED_MODULE_1__/* .AuthError */ .lR {
}
/** @todo */ class ClientSessionError extends _auth_core_errors__WEBPACK_IMPORTED_MODULE_1__/* .AuthError */ .lR {
}
// ------------------------ Internal ------------------------
/**
 * If passed 'appContext' via getInitialProps() in _app.js
 * then get the req object from ctx and use that for the
 * req value to allow `fetchData` to
 * work seemlessly in getInitialProps() on server side
 * pages *and* in _app.js.
 * @internal
 */ async function fetchData(path, __NEXTAUTH, logger, req = {}) {
    const url = `${apiBaseUrl(__NEXTAUTH)}/${path}`;
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                ...req?.headers?.cookie ? {
                    cookie: req.headers.cookie
                } : {}
            }
        };
        if (req?.body) {
            options.body = JSON.stringify(req.body);
            options.method = "POST";
        }
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    } catch (error) {
        logger.error(new ClientFetchError(error.message, error));
        return null;
    }
}
/** @internal */ function apiBaseUrl(__NEXTAUTH) {
    if (false) {}
    // Return relative path when called client side
    return __NEXTAUTH.basePath;
}
/** @internal  */ function useOnline() {
    const [isOnline, setIsOnline] = react__WEBPACK_IMPORTED_MODULE_0__.useState(typeof navigator !== "undefined" ? navigator.onLine : false);
    const setOnline = ()=>setIsOnline(true);
    const setOffline = ()=>setIsOnline(false);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        window.addEventListener("online", setOnline);
        window.addEventListener("offline", setOffline);
        return ()=>{
            window.removeEventListener("online", setOnline);
            window.removeEventListener("offline", setOffline);
        };
    }, []);
    return isOnline;
}
/**
 * Returns the number of seconds elapsed since January 1, 1970 00:00:00 UTC.
 * @internal
 */ function now() {
    return Math.floor(Date.now() / 1000);
}
/**
 * Returns an `URL` like object to make requests/redirects from server-side
 * @internal
 */ function parseUrl(url) {
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL(url || defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname)// Remove trailing slash
    .replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}


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

/***/ 41631:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lR: () => (/* binding */ AuthError)
/* harmony export */ });
/* unused harmony exports SignInError, AdapterError, AccessDenied, CallbackRouteError, ErrorPageLoop, EventError, InvalidCallbackUrl, CredentialsSignin, InvalidEndpoints, InvalidCheck, JWTSessionError, MissingAdapter, MissingAdapterMethods, MissingAuthorize, MissingSecret, OAuthAccountNotLinked, OAuthCallbackError, OAuthProfileParseError, SessionTokenError, OAuthSignInError, EmailSignInError, SignOutError, UnknownAction, UnsupportedStrategy, InvalidProvider, UntrustedHost, Verification, MissingCSRF, isClientError, DuplicateConditionalUI, MissingWebAuthnAutocomplete, WebAuthnVerificationError, AccountNotLinked, ExperimentalFeatureNotEnabled */
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

/***/ 84507:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CI: () => (/* binding */ signOut),
/* harmony export */   SessionProvider: () => (/* binding */ SessionProvider),
/* harmony export */   wV: () => (/* binding */ useSession)
/* harmony export */ });
/* unused harmony exports __NEXTAUTH, SessionContext, getSession, getCsrfToken, getProviders, signIn */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39975);
/* provided dependency */ var process = __webpack_require__(41463);
/**
 *
 * NextAuth.js is the official integration of Auth.js for Next.js applications. It supports both
 * [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) and the
 * [Pages Router](https://nextjs.org/docs/pages). It includes methods for signing in, signing out, hooks, and a React
 * Context provider to wrap your application and make session data available anywhere.
 *
 * For use in [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions), check out [these methods](https://authjs.dev/guides/upgrade-to-v5#methods)
 *
 * @module react
 */ /* __next_internal_client_entry_do_not_use__ __NEXTAUTH,SessionContext,useSession,getSession,getCsrfToken,getProviders,signIn,signOut,SessionProvider auto */ 


// This behaviour mirrors the default behaviour for getting the site name that
// happens server side in server/index.js
// 1. An empty value is legitimate when the code is being invoked client side as
//    relative URLs are valid in that context and so defaults to empty.
// 2. When invoked server side the value is picked up from an environment
//    variable and defaults to 'http://localhost:3000'.
const __NEXTAUTH = {
    baseUrl: (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .parseUrl */ .Dl)(process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL).origin,
    basePath: (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .parseUrl */ .Dl)(process.env.NEXTAUTH_URL).path,
    baseUrlServer: (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .parseUrl */ .Dl)(process.env.NEXTAUTH_URL_INTERNAL ?? process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL).origin,
    basePathServer: (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .parseUrl */ .Dl)(process.env.NEXTAUTH_URL_INTERNAL ?? process.env.NEXTAUTH_URL).path,
    _lastSync: 0,
    _session: undefined,
    _getSession: ()=>{}
};
// https://github.com/nextauthjs/next-auth/pull/10762
let broadcastChannel = null;
function getNewBroadcastChannel() {
    if (typeof BroadcastChannel === "undefined") {
        return {
            postMessage: ()=>{},
            addEventListener: ()=>{},
            removeEventListener: ()=>{},
            name: "next-auth",
            onmessage: null,
            onmessageerror: null,
            close: ()=>{},
            dispatchEvent: ()=>false
        };
    }
    return new BroadcastChannel("next-auth");
}
function broadcast() {
    if (broadcastChannel === null) {
        broadcastChannel = getNewBroadcastChannel();
    }
    return broadcastChannel;
}
// TODO:
const logger = {
    debug: console.debug,
    error: console.error,
    warn: console.warn
};
const SessionContext = react__WEBPACK_IMPORTED_MODULE_1__.createContext?.(undefined);
/**
 * React Hook that gives you access to the logged in user's session data and lets you modify it.
 *
 * :::info
 * `useSession` is for client-side use only and when using [Next.js App Router (`app/`)](https://nextjs.org/blog/next-13-4#nextjs-app-router) you should prefer the `auth()` export.
 * :::
 */ function useSession(options) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    // @ts-expect-error Satisfy TS if branch on line below
    const value = react__WEBPACK_IMPORTED_MODULE_1__.useContext(SessionContext);
    if (!value && "production" !== "production") {}
    const { required, onUnauthenticated } = options ?? {};
    const requiredAndNotLoading = required && value.status === "unauthenticated";
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        if (requiredAndNotLoading) {
            const url = `${__NEXTAUTH.basePath}/signin?${new URLSearchParams({
                error: "SessionRequired",
                callbackUrl: window.location.href
            })}`;
            if (onUnauthenticated) onUnauthenticated();
            else window.location.href = url;
        }
    }, [
        requiredAndNotLoading,
        onUnauthenticated
    ]);
    if (requiredAndNotLoading) {
        return {
            data: value.data,
            update: value.update,
            status: "loading"
        };
    }
    return value;
}
async function getSession(params) {
    const session = await (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .fetchData */ .Fd)("session", __NEXTAUTH, logger, params);
    if (params?.broadcast ?? true) {
        // https://github.com/nextauthjs/next-auth/pull/11470
        getNewBroadcastChannel().postMessage({
            event: "session",
            data: {
                trigger: "getSession"
            }
        });
    }
    return session;
}
/**
 * Returns the current Cross-Site Request Forgery Token (CSRF Token)
 * required to make requests that changes state. (e.g. signing in or out, or updating the session).
 *
 * [CSRF Prevention: Double Submit Cookie](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)
 */ async function getCsrfToken() {
    const response = await (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .fetchData */ .Fd)("csrf", __NEXTAUTH, logger);
    return response?.csrfToken ?? "";
}
async function getProviders() {
    return fetchData("providers", __NEXTAUTH, logger);
}
async function signIn(provider, options, authorizationParams) {
    const { callbackUrl, ...rest } = options ?? {};
    const { redirect = true, redirectTo = callbackUrl ?? window.location.href, ...signInParams } = rest;
    const baseUrl = apiBaseUrl(__NEXTAUTH);
    const providers = await getProviders();
    if (!providers) {
        const url = `${baseUrl}/error`;
        window.location.href = url;
        return; // TODO: Return error if `redirect: false`
    }
    if (!provider || !providers[provider]) {
        const url = `${baseUrl}/signin?${new URLSearchParams({
            callbackUrl: redirectTo
        })}`;
        window.location.href = url;
        return; // TODO: Return error if `redirect: false`
    }
    const providerType = providers[provider].type;
    if (providerType === "webauthn") {
        // TODO: Add docs link with explanation
        throw new TypeError([
            `Provider id "${provider}" refers to a WebAuthn provider.`,
            'Please use `import { signIn } from "next-auth/webauthn"` instead.'
        ].join("\n"));
    }
    const signInUrl = `${baseUrl}/${providerType === "credentials" ? "callback" : "signin"}/${provider}`;
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${signInUrl}?${new URLSearchParams(authorizationParams)}`, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1"
        },
        body: new URLSearchParams({
            ...signInParams,
            csrfToken,
            callbackUrl: redirectTo
        })
    });
    const data = await res.json();
    if (redirect) {
        const url = data.url ?? redirectTo;
        window.location.href = url;
        // If url contains a hash, the browser does not reload the page. We reload manually
        if (url.includes("#")) window.location.reload();
        return;
    }
    const error = new URL(data.url).searchParams.get("error") ?? undefined;
    const code = new URL(data.url).searchParams.get("code") ?? undefined;
    if (res.ok) {
        await __NEXTAUTH._getSession({
            event: "storage"
        });
    }
    return {
        error,
        code,
        status: res.status,
        ok: res.ok,
        url: error ? null : data.url
    };
}
async function signOut(options) {
    const { redirect = true, redirectTo = options?.callbackUrl ?? window.location.href } = options ?? {};
    const baseUrl = (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .apiBaseUrl */ .tj)(__NEXTAUTH);
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${baseUrl}/signout`, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Return-Redirect": "1"
        },
        body: new URLSearchParams({
            csrfToken,
            callbackUrl: redirectTo
        })
    });
    const data = await res.json();
    broadcast().postMessage({
        event: "session",
        data: {
            trigger: "signout"
        }
    });
    if (redirect) {
        const url = data.url ?? redirectTo;
        window.location.href = url;
        // If url contains a hash, the browser does not reload the page. We reload manually
        if (url.includes("#")) window.location.reload();
        return;
    }
    await __NEXTAUTH._getSession({
        event: "storage"
    });
    return data;
}
/**
 * [React Context](https://react.dev/learn/passing-data-deeply-with-context) provider to wrap the app (`pages/`) to make session data available anywhere.
 *
 * When used, the session state is automatically synchronized across all open tabs/windows and they are all updated whenever they gain or lose focus
 * or the state changes (e.g. a user signs in or out) when {@link SessionProviderProps.refetchOnWindowFocus} is `true`.
 *
 * :::info
 * `SessionProvider` is for client-side use only and when using [Next.js App Router (`app/`)](https://nextjs.org/blog/next-13-4#nextjs-app-router) you should prefer the `auth()` export.
 * :::
 */ function SessionProvider(props) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    const { children, basePath, refetchInterval, refetchWhenOffline } = props;
    if (basePath) __NEXTAUTH.basePath = basePath;
    /**
     * If session was `null`, there was an attempt to fetch it,
     * but it failed, but we still treat it as a valid initial value.
     */ const hasInitialSession = props.session !== undefined;
    /** If session was passed, initialize as already synced */ __NEXTAUTH._lastSync = hasInitialSession ? (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .now */ .tB)() : 0;
    const [session, setSession] = react__WEBPACK_IMPORTED_MODULE_1__.useState(()=>{
        if (hasInitialSession) __NEXTAUTH._session = props.session;
        return props.session;
    });
    /** If session was passed, initialize as not loading */ const [loading, setLoading] = react__WEBPACK_IMPORTED_MODULE_1__.useState(!hasInitialSession);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        __NEXTAUTH._getSession = async ({ event } = {})=>{
            try {
                const storageEvent = event === "storage";
                // We should always update if we don't have a client session yet
                // or if there are events from other tabs/windows
                if (storageEvent || __NEXTAUTH._session === undefined) {
                    __NEXTAUTH._lastSync = (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .now */ .tB)();
                    __NEXTAUTH._session = await getSession({
                        broadcast: !storageEvent
                    });
                    setSession(__NEXTAUTH._session);
                    return;
                }
                if (// If there is no time defined for when a session should be considered
                // stale, then it's okay to use the value we have until an event is
                // triggered which updates it
                !event || // If the client doesn't have a session then we don't need to call
                // the server to check if it does (if they have signed in via another
                // tab or window that will come through as a "stroage" event
                // event anyway)
                __NEXTAUTH._session === null || // Bail out early if the client session is not stale yet
                (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .now */ .tB)() < __NEXTAUTH._lastSync) {
                    return;
                }
                // An event or session staleness occurred, update the client session.
                __NEXTAUTH._lastSync = (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .now */ .tB)();
                __NEXTAUTH._session = await getSession();
                setSession(__NEXTAUTH._session);
            } catch (error) {
                logger.error(new _lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .ClientSessionError */ .Og(error.message, error));
            } finally{
                setLoading(false);
            }
        };
        __NEXTAUTH._getSession();
        return ()=>{
            __NEXTAUTH._lastSync = 0;
            __NEXTAUTH._session = undefined;
            __NEXTAUTH._getSession = ()=>{};
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        const handle = ()=>__NEXTAUTH._getSession({
                event: "storage"
            });
        // Listen for storage events and update session if event fired from
        // another window (but suppress firing another event to avoid a loop)
        // Fetch new session data but tell it to not to fire another event to
        // avoid an infinite loop.
        // Note: We could pass session data through and do something like
        // `setData(message.data)` but that can cause problems depending
        // on how the session object is being used in the client; it is
        // more robust to have each window/tab fetch it's own copy of the
        // session object rather than share it across instances.
        broadcast().addEventListener("message", handle);
        return ()=>broadcast().removeEventListener("message", handle);
    }, []);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        const { refetchOnWindowFocus = true } = props;
        // Listen for when the page is visible, if the user switches tabs
        // and makes our tab visible again, re-fetch the session, but only if
        // this feature is not disabled.
        const visibilityHandler = ()=>{
            if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
                event: "visibilitychange"
            });
        };
        document.addEventListener("visibilitychange", visibilityHandler, false);
        return ()=>document.removeEventListener("visibilitychange", visibilityHandler, false);
    }, [
        props.refetchOnWindowFocus
    ]);
    const isOnline = (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .useOnline */ .Lm)();
    // TODO: Flip this behavior in next major version
    const shouldRefetch = refetchWhenOffline !== false || isOnline;
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        if (refetchInterval && shouldRefetch) {
            const refetchIntervalTimer = setInterval(()=>{
                if (__NEXTAUTH._session) {
                    __NEXTAUTH._getSession({
                        event: "poll"
                    });
                }
            }, refetchInterval * 1000);
            return ()=>clearInterval(refetchIntervalTimer);
        }
    }, [
        refetchInterval,
        shouldRefetch
    ]);
    const value = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(()=>({
            data: session,
            status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
            async update (data) {
                if (loading) return;
                setLoading(true);
                const newSession = await (0,_lib_client_js__WEBPACK_IMPORTED_MODULE_2__/* .fetchData */ .Fd)("session", __NEXTAUTH, logger, typeof data === "undefined" ? undefined : {
                    body: {
                        csrfToken: await getCsrfToken(),
                        data
                    }
                });
                setLoading(false);
                if (newSession) {
                    setSession(newSession);
                    broadcast().postMessage({
                        event: "session",
                        data: {
                            trigger: "getSession"
                        }
                    });
                }
                return newSession;
            }
        }), [
        session,
        loading
    ]);
    return(// @ts-expect-error
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SessionContext.Provider, {
        value: value,
        children: children
    }));
}


/***/ })

}]);