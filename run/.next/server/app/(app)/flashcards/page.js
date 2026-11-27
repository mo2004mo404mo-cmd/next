(() => {
var exports = {};
exports.id = 5333;
exports.ids = [4543,5333,9517];
exports.modules = {

/***/ 300:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Zr: () => (/* binding */ persist)
/* harmony export */ });
/* unused harmony exports combine, createJSONStorage, devtools, redux, subscribeWithSelector, unstable_ssrSafe */
const reduxImpl = (reducer, initial) => (set, _get, api) => {
  api.dispatch = (action) => {
    set((state) => reducer(state, action), false, action);
    return action;
  };
  api.dispatchFromDevtools = true;
  return { dispatch: (...args) => api.dispatch(...args), ...initial };
};
const redux = (/* unused pure expression or super */ null && (reduxImpl));

const shouldDispatchFromDevtools = (api) => !!api.dispatchFromDevtools && typeof api.dispatch === "function";
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api) return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
const extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
const removeStoreFromTrackedConnections = (name, store, api) => {
  if (store === void 0) return;
  const connectionInfo = trackedConnections.get(name);
  if ((connectionInfo == null ? void 0 : connectionInfo.stores[store]) !== api) return;
  delete connectionInfo.stores[store];
  if (Object.keys(connectionInfo.stores).length === 0) {
    trackedConnections.delete(name);
  }
};
const v8StackLineRe = /^at (?:new |async )?(.+?) \(/;
const geckoStackLineRe = /^([^@]+)@/;
function findCallerName(stack) {
  var _a, _b, _c;
  if (!stack) return void 0;
  const traceLines = stack.split("\n");
  const apiSetStateLineIndex = traceLines.findIndex(
    (traceLine) => traceLine.includes("api.setState")
  );
  if (apiSetStateLineIndex < 0) return void 0;
  const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
  return ((_b = v8StackLineRe.exec(callerLine)) == null ? void 0 : _b[1]) || ((_c = geckoStackLineRe.exec(callerLine)) == null ? void 0 : _c[1]);
}
const devtoolsImpl = (fn, devtoolsOptions = {}) => (set, get, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : ( false ? 0 : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    return fn(set, get, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = ((state, replace, nameOrAction) => {
    const r = set(state, replace);
    if (!isRecording) return r;
    const action = nameOrAction === void 0 ? {
      type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
    } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get());
      return r;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r;
  });
  let unsubscribeFromStore;
  api.devtools = {
    cleanup: () => {
      unsubscribeFromStore == null ? void 0 : unsubscribeFromStore();
      unsubscribeFromStore = void 0;
      removeStoreFromTrackedConnections(options.name, store, api);
      if ((store === void 0 || !trackedConnections.has(options.name)) && connection && typeof connection.unsubscribe === "function") {
        connection.unsubscribe();
      }
    }
  };
  const setStateFromDevtools = (...a) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set(...a);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (shouldDispatchFromDevtools(api)) {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...args) => {
      if (( false ? 0 : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...args);
    };
  }
  unsubscribeFromStore = connection.subscribe((message) => {
    var _a;
    const reviver = typeof options.serialize === "object" ? options.serialize.reviver : void 0;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          reviver,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (shouldDispatchFromDevtools(api)) {
              api.dispatch(action);
            }
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, reviver, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, reviver, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState) return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
const devtools = (/* unused pure expression or super */ null && (devtoolsImpl));
const parseJsonThen = (stringified, reviver, fn) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified, reviver);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0) fn(parsed);
};

const subscribeWithSelectorImpl = (fn) => (set, get, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = ((selector, optListener, options) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
      let currentSlice = selector(api.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options == null ? void 0 : options.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  });
  const initialState = fn(set, get, api);
  return initialState;
};
const subscribeWithSelector = (/* unused pure expression or super */ null && (subscribeWithSelectorImpl));

function combine(initialState, create) {
  return (...args) => Object.assign({}, initialState, create(...args));
}

function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (...args) => {
    savedSetState(...args);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      ++hydrationVersion;
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;

function ssrSafe(config, isSSR = typeof window === "undefined") {
  return (set, get, api) => {
    if (!isSSR) {
      return config(set, get, api);
    }
    const ssrSet = () => {
      throw new Error("Cannot set state of Zustand store in SSR");
    };
    api.setState = ssrSet;
    return config(ssrSet, get, api);
  };
}




/***/ }),

/***/ 6414:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Keyboard)
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
    name: "keyboard",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 8h.01",
                key: "1r9ogq"
            }
        ],
        [
            "path",
            {
                d: "M12 12h.01",
                key: "1mp3jc"
            }
        ],
        [
            "path",
            {
                d: "M14 8h.01",
                key: "1primd"
            }
        ],
        [
            "path",
            {
                d: "M16 12h.01",
                key: "1l6xoz"
            }
        ],
        [
            "path",
            {
                d: "M18 8h.01",
                key: "emo2bl"
            }
        ],
        [
            "path",
            {
                d: "M6 8h.01",
                key: "x9i8wu"
            }
        ],
        [
            "path",
            {
                d: "M7 16h10",
                key: "wp8him"
            }
        ],
        [
            "path",
            {
                d: "M8 12h.01",
                key: "czm47f"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "16",
                x: "2",
                y: "4",
                rx: "2",
                key: "18n3k1"
            }
        ]
    ]
};
__iconData.node;
const Keyboard = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=keyboard.mjs.map


/***/ }),

/***/ 7638:
/***/ ((module, exports) => {

"use strict";

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

/***/ 27993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RefreshCw)
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

/***/ 52220:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

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

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 57359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/app/(app)/flashcards/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/app/(app)/flashcards/page.tsx",
"default",
));


/***/ }),

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 133204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useFlashcardGameStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(469517);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(300);
/* __next_internal_client_entry_do_not_use__ useFlashcardGameStore auto */ 

const useFlashcardGameStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .persist */ .Zr)((set, get)=>({
        mode: 'classic',
        score: 0,
        timeLeft: 0,
        match: {
            pairs: [],
            flippedIds: [],
            matchedIds: [],
            mistakes: 0,
            startTime: 0,
            endTime: null,
            isComplete: false
        },
        mastery: {},
        learnCardIds: [],
        learnCurrentIndex: 0,
        test: {
            questions: [],
            currentIndex: 0,
            isComplete: false,
            startTime: 0,
            endTime: null
        },
        setMode: (mode)=>set({
                mode
            }),
        setScore: (score)=>set({
                score
            }),
        addScore: (delta)=>set((s)=>({
                    score: s.score + delta
                })),
        setTimeLeft: (seconds)=>set({
                timeLeft: seconds
            }),
        tickTimer: ()=>set((s)=>({
                    timeLeft: Math.max(0, s.timeLeft - 1)
                })),
        // Match
        initMatch: (pairs)=>set({
                match: {
                    pairs,
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: Date.now(),
                    endTime: null,
                    isComplete: false
                },
                score: 0
            }),
        flipCard: (id)=>set((s)=>({
                    match: {
                        ...s.match,
                        flippedIds: [
                            ...s.match.flippedIds,
                            id
                        ]
                    }
                })),
        recordMatch: (id1, id2)=>{
            const s = get();
            const newMatched = [
                ...s.match.matchedIds,
                id1,
                id2
            ];
            const isComplete = newMatched.length === s.match.pairs.length * 2;
            set({
                match: {
                    ...s.match,
                    matchedIds: newMatched,
                    flippedIds: [],
                    isComplete,
                    endTime: isComplete ? Date.now() : null
                },
                score: s.score + 100
            });
        },
        recordMismatch: ()=>set((s)=>({
                    match: {
                        ...s.match,
                        flippedIds: [],
                        mistakes: s.match.mistakes + 1
                    },
                    score: Math.max(0, s.score - 10)
                })),
        completeMatch: ()=>set((s)=>({
                    match: {
                        ...s.match,
                        isComplete: true,
                        endTime: Date.now()
                    }
                })),
        resetMatch: ()=>set({
                match: {
                    pairs: [],
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: 0,
                    endTime: null,
                    isComplete: false
                },
                score: 0
            }),
        // Learn
        updateMastery: (cardId, correct)=>set((s)=>{
                const existing = s.mastery[cardId] || {
                    cardId,
                    level: 0,
                    correctCount: 0,
                    incorrectCount: 0,
                    lastSeen: 0
                };
                const newCorrect = existing.correctCount + (correct ? 1 : 0);
                const newIncorrect = existing.incorrectCount + (correct ? 0 : 1);
                let newLevel = existing.level;
                if (existing.level === 0) newLevel = 1;
                else if (existing.level === 1 && newCorrect >= 1) newLevel = 2;
                else if (existing.level === 2 && newCorrect >= 2) newLevel = 3;
                else if (existing.level === 3 && newCorrect >= 3) newLevel = 4;
                if (!correct && newLevel > 1) newLevel = newLevel - 1;
                return {
                    mastery: {
                        ...s.mastery,
                        [cardId]: {
                            cardId,
                            level: newLevel,
                            correctCount: newCorrect,
                            incorrectCount: newIncorrect,
                            lastSeen: Date.now()
                        }
                    }
                };
            }),
        setLearnCards: (cardIds)=>set({
                learnCardIds: cardIds,
                learnCurrentIndex: 0
            }),
        advanceLearnCard: ()=>set((s)=>({
                    learnCurrentIndex: s.learnCurrentIndex + 1
                })),
        resetLearn: ()=>set({
                learnCardIds: [],
                learnCurrentIndex: 0
            }),
        // Test
        initTest: (cardIds)=>set({
                test: {
                    questions: cardIds.map((id)=>({
                            cardId: id,
                            userAnswer: '',
                            isCorrect: false,
                            timeSpent: 0
                        })),
                    currentIndex: 0,
                    isComplete: false,
                    startTime: Date.now(),
                    endTime: null
                },
                score: 0
            }),
        answerTestQuestion: (cardId, userAnswer, isCorrect, timeSpent)=>set((s)=>({
                    test: {
                        ...s.test,
                        questions: s.test.questions.map((q)=>q.cardId === cardId ? {
                                ...q,
                                userAnswer,
                                isCorrect,
                                timeSpent
                            } : q),
                        currentIndex: s.test.currentIndex + 1,
                        isComplete: s.test.currentIndex + 1 >= s.test.questions.length,
                        endTime: s.test.currentIndex + 1 >= s.test.questions.length ? Date.now() : null
                    },
                    score: s.score + (isCorrect ? 10 : 0)
                })),
        completeTest: ()=>set((s)=>({
                    test: {
                        ...s.test,
                        isComplete: true,
                        endTime: Date.now()
                    }
                })),
        resetTest: ()=>set({
                test: {
                    questions: [],
                    currentIndex: 0,
                    isComplete: false,
                    startTime: 0,
                    endTime: null
                },
                score: 0
            }),
        resetGame: ()=>set({
                mode: 'classic',
                score: 0,
                timeLeft: 0,
                match: {
                    pairs: [],
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: 0,
                    endTime: null,
                    isComplete: false
                },
                learnCardIds: [],
                learnCurrentIndex: 0,
                test: {
                    questions: [],
                    currentIndex: 0,
                    isComplete: false,
                    startTime: 0,
                    endTime: null
                }
            })
    }), {
    name: 'medq-flashcard-game-store',
    partialize: (state)=>({
            mastery: state.mastery
        })
}));


/***/ }),

/***/ 134549:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ createStore)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);




/***/ }),

/***/ 134631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 148874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ MEDICAL_SYSTEMS),
/* harmony export */   Fc: () => (/* binding */ DIFFICULTY_COLORS),
/* harmony export */   L7: () => (/* binding */ TOPIC_MAP),
/* harmony export */   My: () => (/* binding */ DIFFICULTY_LABELS),
/* harmony export */   Yg: () => (/* binding */ DIFFICULTY_LEVELS),
/* harmony export */   bU: () => (/* binding */ QUESTION_TYPES),
/* harmony export */   hy: () => (/* binding */ normalizeDifficulty),
/* harmony export */   rX: () => (/* binding */ DIFFICULTY_OPTIONS)
/* harmony export */ });
/* unused harmony exports DIFFICULTY_BG_COLORS, getDifficultyLevel */
const MEDICAL_SYSTEMS = [
    'OBG',
    'Cardiovascular',
    'Respiratory',
    'Neurological',
    'Gastrointestinal',
    'Renal',
    'Endocrine',
    'Hematologic',
    'Musculoskeletal',
    'Integumentary',
    'Reproductive',
    'Immunologic',
    'Pharmacology',
    'Pathology',
    'Microbiology',
    'Biochemistry'
];
const TOPIC_MAP = {
    OBG: [
        'Operative Vaginal Delivery',
        'Malpresentation Malpositions Breech',
        'Abnormal Labour Patterns',
        'Multiple Multifetal Pregnancy',
        'Postpartum Hemorrhage PPH',
        'PROM Preterm Labour',
        'SGA Fetal Growth Restriction',
        'Rh Iso-immunization',
        'Cesarean Delivery',
        'Amenorrhea',
        'Hyperprolactinemia Hirsutism PCOS',
        'Puberty Menopause',
        'Physiology of Menstruation',
        'Anatomy Embryology'
    ],
    Cardiovascular: [
        'Hypertension',
        'Heart Failure',
        'Arrhythmias',
        'Coronary Artery Disease',
        'Valvular Heart Disease',
        'Myocarditis',
        'Aortic Dissection',
        'Endocarditis'
    ],
    Respiratory: [
        'COPD',
        'Asthma',
        'Pneumonia',
        'Pulmonary Embolism',
        'Interstitial Lung Disease',
        'ARDS',
        'Lung Cancer',
        'Pleural Effusion'
    ],
    Neurological: [
        'Stroke',
        'Epilepsy',
        'Parkinson Disease',
        'Multiple Sclerosis',
        'Meningitis',
        'Myasthenia Gravis',
        'Alzheimer Disease',
        'Guillain-Barre'
    ],
    Gastrointestinal: [
        'Peptic Ulcer Disease',
        'Inflammatory Bowel Disease',
        'Pancreatitis',
        'Cirrhosis',
        'Hepatitis',
        'Celiac Disease',
        'GI Bleeding',
        'Appendicitis'
    ],
    Renal: [
        'Acute Kidney Injury',
        'Chronic Kidney Disease',
        'Nephrotic Syndrome',
        'Glomerulonephritis',
        'Renal Stones',
        'UTI',
        'Polycystic Kidney Disease'
    ],
    Endocrine: [
        'Diabetes Mellitus',
        'Thyroid Disorders',
        'Cushing Syndrome',
        'Addison Disease',
        'Pheochromocytoma',
        'Hyperparathyroidism',
        'SIADH',
        'Diabetes Insipidus'
    ],
    Hematologic: [
        'Anemia',
        'Leukemia',
        'Lymphoma',
        'Coagulation Disorders',
        'Sickle Cell Disease',
        'Thrombocytopenia',
        'Hemophilia',
        'DIC'
    ],
    Musculoskeletal: [
        'Rheumatoid Arthritis',
        'Osteoarthritis',
        'Osteoporosis',
        'Gout',
        'Lyme Disease',
        'Osteomyelitis',
        'Fractures',
        'Lupus'
    ],
    Integumentary: [
        'Melanoma',
        'Psoriasis',
        'Eczema',
        'Burns',
        'Cellulitis',
        'Contact Dermatitis',
        'Acne Vulgaris',
        'Basal Cell Carcinoma'
    ],
    Reproductive: [
        'Ectopic Pregnancy',
        'PCOS',
        'Endometriosis',
        'Preeclampsia',
        'Prostate Cancer',
        'Cervical Cancer',
        'Infertility',
        'Menorrhagia'
    ],
    Immunologic: [
        'HIV/AIDS',
        'Autoimmune Diseases',
        'Transplant Rejection',
        'Primary Immunodeficiency',
        'Anaphylaxis',
        'SLE',
        'Sarcoidosis',
        'Vasculitis'
    ],
    Pharmacology: [
        'ACE Inhibitors',
        'Beta Blockers',
        'Statins',
        'Antibiotics',
        'Anticoagulants',
        'NSAIDs',
        'Opioids',
        'Antidepressants'
    ],
    Pathology: [
        'Neoplasia',
        'Inflammation',
        'Infarction',
        'Apoptosis',
        'Necrosis',
        'Amyloidosis',
        'Hemochromatosis',
        'Atherosclerosis'
    ],
    Microbiology: [
        'Staphylococcus',
        'Streptococcus',
        'E. coli',
        'TB',
        'Malaria',
        'HIV',
        'Hepatitis Viruses',
        'Fungal Infections'
    ],
    Biochemistry: [
        'Glycolysis',
        'TCA Cycle',
        'Urea Cycle',
        'Lipid Metabolism',
        'Porphyrias',
        'Glycogen Storage Diseases',
        'Electron Transport Chain'
    ]
};
const DIFFICULTY_OPTIONS = [
    'Easy',
    'Basic',
    'Moderate',
    'Hard',
    'Expert'
];
const DIFFICULTY_LEVELS = {
    'Easy': 1,
    'Basic': 2,
    'Moderate': 3,
    'Hard': 4,
    'Expert': 5
};
const DIFFICULTY_LABELS = {
    1: 'Easy',
    2: 'Basic',
    3: 'Moderate',
    4: 'Hard',
    5: 'Expert'
};
const DIFFICULTY_COLORS = {
    1: '#22c55e',
    2: '#4ade80',
    3: '#f59e0b',
    4: '#f97316',
    5: '#ef4444'
};
const DIFFICULTY_BG_COLORS = {
    1: 'rgba(34,197,94,0.10)',
    2: 'rgba(74,222,128,0.10)',
    3: 'rgba(245,158,11,0.10)',
    4: 'rgba(249,115,22,0.10)',
    5: 'rgba(239,68,68,0.10)'
};
/** Map legacy difficulty values to new 5-level system */ function normalizeDifficulty(difficulty) {
    if (difficulty === 'Medium') return 'Moderate';
    const valid = new Set([
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ]);
    return valid.has(difficulty) ? difficulty : 'Moderate';
}
/** Get numeric level from difficulty label */ function getDifficultyLevel(difficulty) {
    return DIFFICULTY_LEVELS[normalizeDifficulty(difficulty)] ?? 3;
}
const QUESTION_TYPES = [
    'mcq',
    'tf',
    'short'
];


/***/ }),

/***/ 165873:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TR: () => (/* binding */ SelectLabel),
/* harmony export */   bq: () => (/* binding */ SelectTrigger),
/* harmony export */   eb: () => (/* binding */ SelectItem),
/* harmony export */   gC: () => (/* binding */ SelectContent),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   mi: () => (/* binding */ SelectSeparator),
/* harmony export */   s3: () => (/* binding */ SelectGroup),
/* harmony export */   yv: () => (/* binding */ SelectValue)
/* harmony export */ });
/* unused harmony exports SelectScrollDownButton, SelectScrollUpButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(822731);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(694225);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(794501);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(976305);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(415073);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(566359);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(392091);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(940625);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(742351);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(173230);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(224281);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(32962);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(534656);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(135633);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(860617);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(86779);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(114490);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(35471);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(185448);
/* __next_internal_client_entry_do_not_use__ Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue auto */ 




const Select = _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .SelectRoot */ .H;
function SelectGroup({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectGroup */ .s, {
        "data-slot": "select-group",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("scroll-my-1 p-1", className),
        ...props
    });
}
function SelectValue({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__/* .SelectValue */ .y, {
        "data-slot": "select-value",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-1 text-left", className),
        ...props
    });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .b, {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__/* .SelectIcon */ .w, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "pointer-events-none size-4 text-muted-foreground"
                })
            })
        ]
    });
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__/* .SelectPortal */ .V, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectPositioner */ .l, {
            side: side,
            sideOffset: sideOffset,
            align: align,
            alignOffset: alignOffset,
            alignItemWithTrigger: alignItemWithTrigger,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectPopup */ .t, {
                "data-slot": "select-content",
                "data-align-trigger": alignItemWithTrigger,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollUpButton, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__/* .SelectList */ .B, {
                        children: children
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollDownButton, {})
                ]
            })
        })
    });
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__/* .SelectGroupLabel */ .M, {
        "data-slot": "select-label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("px-1.5 py-1 text-xs text-muted-foreground", className),
        ...props
    });
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__/* .SelectItem */ .e, {
        "data-slot": "select-item",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__/* .SelectItemText */ .h, {
                className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
                children: children
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__/* .SelectItemIndicator */ .h, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center"
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                    className: "pointer-events-none"
                })
            })
        ]
    });
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectSeparator */ .m, {
        "data-slot": "select-separator",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("pointer-events-none -mx-1 my-1 h-px bg-border", className),
        ...props
    });
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__/* .SelectScrollUpArrow */ .w, {
        "data-slot": "select-scroll-up-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {})
    });
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__/* .SelectScrollDownArrow */ .d, {
        "data-slot": "select-scroll-down-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {})
    });
}



/***/ }),

/***/ 170729:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlashcardTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(902864);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(165873);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(144730);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(774789);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(165444);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(35214);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(6414);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(77014);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(148874);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(890707);
/* harmony import */ var _lib_offline_response__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(406746);
/* harmony import */ var _components_medq_OfflineEmptyState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(203247);
/* harmony import */ var _components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133204);
/* harmony import */ var _components_medq_flashcard_games_MatchGame__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(254726);
/* harmony import */ var _components_medq_flashcard_games_LearnMode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(819120);
/* harmony import */ var _components_medq_flashcard_games_TestMode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(748586);
/* __next_internal_client_entry_do_not_use__ default auto */ 













/* ─── Helpers ─── */ function stripHtml(html) {
    if (!html) return '';
    // Replace common HTML entities first
    const decoded = html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<\/li>/gi, '\n').replace(/<li[^>]*>/gi, '- ').replace(/<[^>]*>/g, '').trim();
    return decoded;
}
function formatInterval(interval) {
    if (interval <= 0) return 'Now';
    if (interval === 1) return '1 day';
    if (interval < 7) return `${interval} days`;
    if (interval < 30) return `${Math.round(interval / 7)} week${Math.round(interval / 7) > 1 ? 's' : ''}`;
    return `${Math.round(interval / 30)} month${Math.round(interval / 30) > 1 ? 's' : ''}`;
}
const MODE_OPTIONS = [
    {
        value: 'due',
        label: 'Due for Review',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'new',
        label: 'New Cards',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'all',
        label: 'All Cards',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'random',
        label: 'Random',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    }
];
const GAME_MODE_OPTIONS = [
    {
        value: 'classic',
        label: 'Classic',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Spaced repetition',
        color: '#00e5a0'
    },
    {
        value: 'match',
        label: 'Match',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Match terms & definitions',
        color: '#22d3ee'
    },
    {
        value: 'learn',
        label: 'Learn',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Adaptive learning',
        color: '#8b5cf6'
    },
    {
        value: 'test',
        label: 'Test',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Practice test',
        color: '#ffb347'
    }
];
const RATING_OPTIONS = [
    {
        quality: 0,
        label: 'Again',
        emoji: '😕',
        color: 'bg-[#ff5757]/15 border-[#ff5757]/30 text-[#ff5757] hover:bg-[#ff5757]/25',
        key: '1'
    },
    {
        quality: 3,
        label: 'Hard',
        emoji: '🤔',
        color: 'bg-[#f59e0b]/15 border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/25',
        key: '2'
    },
    {
        quality: 4,
        label: 'Good',
        emoji: '🙂',
        color: 'bg-[#00e5a0]/15 border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25',
        key: '3'
    },
    {
        quality: 5,
        label: 'Easy',
        emoji: '😎',
        color: 'bg-[#8b5cf6]/15 border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25',
        key: '4'
    }
];
/* ─── Component ─── */ function FlashcardTab() {
    // Game mode state
    const gameStore = (0,_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$)();
    const gameMode = gameStore.mode;
    // Card data state
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [offlineEmpty, setOfflineEmpty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Controls state
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('due');
    const [systemFilter, setSystemFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // Flip state
    const [isFlipped, setIsFlipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Slide animation
    const [slideDirection, setSlideDirection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isAnimating, setIsAnimating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Session tracking
    const [sessionStats, setSessionStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        studied: 0,
        correct: 0,
        incorrect: 0,
        startTime: Date.now()
    });
    const [sessionComplete, setSessionComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Keyboard shortcut help
    const [showShortcuts, setShowShortcuts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Ref for session recording on unmount
    const sessionStatsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(sessionStats);
    const hasRecordedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    // Keep ref in sync
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        sessionStatsRef.current = sessionStats;
    }, [
        sessionStats
    ]);
    // Record StudySession on unmount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            if (hasRecordedRef.current) return;
            const stats = sessionStatsRef.current;
            if (stats.studied > 0) {
                hasRecordedRef.current = true;
                const timeSpent = Math.round((Date.now() - stats.startTime) / 1000);
                fetch('/api/study-sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: 'flashcard',
                        questionsStudied: stats.studied,
                        correctAnswers: stats.correct,
                        totalTimeSpent: timeSpent
                    })
                }).catch(()=>{
                // Silent fail on unmount
                });
            }
        };
    }, []);
    /* ─── Fetch flashcards ─── */ const fetchFlashcards = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (fetchMode, fetchSystem)=>{
        setLoading(true);
        setOfflineEmpty(false);
        setIsFlipped(false);
        setCurrentIndex(0);
        setSessionComplete(false);
        setSessionStats({
            studied: 0,
            correct: 0,
            incorrect: 0,
            startTime: Date.now()
        });
        try {
            const params = new URLSearchParams({
                mode: fetchMode,
                limit: '20'
            });
            if (fetchSystem && fetchSystem !== 'all') {
                params.set('system', fetchSystem);
            }
            const res = await fetch(`/api/flashcard?${params.toString()}`);
            if (!res.ok) {
                const errBody = await res.json().catch(()=>null);
                if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_20__/* .isOfflineError */ .ej)(res, errBody)) {
                    setOfflineEmpty(true);
                    setQuestions([]);
                    return;
                }
                throw new Error('Failed to fetch flashcards');
            }
            const data = await res.json();
            setQuestions(data.questions || []);
        } catch (err) {
            console.error('Fetch flashcards error:', err);
            if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_20__/* .browserIsOffline */ .Ey)()) {
                setOfflineEmpty(true);
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_6__.toast.error('Failed to load flashcards');
            }
            setQuestions([]);
        } finally{
            setLoading(false);
        }
    }, []);
    // Initial load and mode/filter changes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchFlashcards(mode, systemFilter);
    }, [
        mode,
        systemFilter,
        fetchFlashcards
    ]);
    /* ─── Current card ─── */ const currentCard = questions[currentIndex];
    const totalCards = questions.length;
    /* ─── Flip handler ─── */ const handleFlip = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!currentCard || isAnimating) return;
        setIsFlipped((prev)=>!prev);
    }, [
        currentCard,
        isAnimating
    ]);
    /* ─── Rating handler ─── */ const handleRate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (quality)=>{
        if (!currentCard || submitting || isAnimating) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/flashcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: currentCard.id,
                    quality
                })
            });
            if (!res.ok) throw new Error('Failed to record review');
            const data = await res.json();
            // Update session stats
            const isCorrect = quality >= 3;
            setSessionStats((prev)=>({
                    ...prev,
                    studied: prev.studied + 1,
                    correct: prev.correct + (isCorrect ? 1 : 0),
                    incorrect: prev.incorrect + (isCorrect ? 0 : 1)
                }));
            // Show XP toast
            if (data.xpEarned) {
                sonner__WEBPACK_IMPORTED_MODULE_6__.toast.success(`+${data.xpEarned} XP`, {
                    duration: 1500
                });
            }
            // Auto-advance to next card
            if (currentIndex < totalCards - 1) {
                setSlideDirection('left');
                setIsAnimating(true);
                setTimeout(()=>{
                    setCurrentIndex((prev)=>prev + 1);
                    setIsFlipped(false);
                    setSlideDirection(null);
                    setTimeout(()=>setIsAnimating(false), 300);
                }, 250);
            } else {
                // Session complete
                setSessionComplete(true);
                // Record session
                if (!hasRecordedRef.current) {
                    hasRecordedRef.current = true;
                    const timeSpent = Math.round((Date.now() - sessionStatsRef.current.startTime) / 1000);
                    fetch('/api/study-sessions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            type: 'flashcard',
                            questionsStudied: sessionStatsRef.current.studied + 1,
                            correctAnswers: sessionStatsRef.current.correct + (isCorrect ? 1 : 0),
                            totalTimeSpent: timeSpent
                        })
                    }).catch(()=>{});
                }
            }
        } catch (err) {
            console.error('Rate error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_6__.toast.error('Failed to save review');
        } finally{
            setSubmitting(false);
        }
    }, [
        currentCard,
        submitting,
        isAnimating,
        currentIndex,
        totalCards
    ]);
    /* ─── Navigation ─── */ const goNext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex < totalCards - 1 && !isAnimating) {
            setSlideDirection('left');
            setIsAnimating(true);
            setTimeout(()=>{
                setCurrentIndex((prev)=>prev + 1);
                setIsFlipped(false);
                setSlideDirection(null);
                setTimeout(()=>setIsAnimating(false), 300);
            }, 250);
        }
    }, [
        currentIndex,
        totalCards,
        isAnimating
    ]);
    const goPrev = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex > 0 && !isAnimating) {
            setSlideDirection('right');
            setIsAnimating(true);
            setTimeout(()=>{
                setCurrentIndex((prev)=>prev - 1);
                setIsFlipped(false);
                setSlideDirection(null);
                setTimeout(()=>setIsAnimating(false), 300);
            }, 250);
        }
    }, [
        currentIndex,
        isAnimating
    ]);
    /* ─── Keyboard shortcuts ─── */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleKeyDown = (e)=>{
            // Don't capture if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            switch(e.key){
                case ' ':
                    e.preventDefault();
                    handleFlip();
                    break;
                case '1':
                    if (isFlipped) handleRate(0);
                    break;
                case '2':
                    if (isFlipped) handleRate(3);
                    break;
                case '3':
                    if (isFlipped) handleRate(4);
                    break;
                case '4':
                    if (isFlipped) handleRate(5);
                    break;
                case 'ArrowRight':
                    goNext();
                    break;
                case 'ArrowLeft':
                    goPrev();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>window.removeEventListener('keydown', handleKeyDown);
    }, [
        handleFlip,
        handleRate,
        goNext,
        goPrev,
        isFlipped
    ]);
    /* ─── Restart session ─── */ const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        fetchFlashcards(mode, systemFilter);
    }, [
        mode,
        systemFilter,
        fetchFlashcards
    ]);
    /* ─── Back to classic mode from game modes ─── */ const handleBackToClassic = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        _components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode('classic');
    }, []);
    /* ─── Computed values ─── */ const accuracy = sessionStats.studied > 0 ? Math.round(sessionStats.correct / sessionStats.studied * 100) : 0;
    const progressPercent = totalCards > 0 ? (currentIndex + (sessionComplete ? 1 : 0)) / totalCards * 100 : 0;
    /* ─── Game Mode Rendering ─── */ // Match Game mode
    if (gameMode === 'match') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#22d3ee]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Match Game"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to play"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#22d3ee]/15 border border-[#22d3ee]/30 text-[#22d3ee] hover:bg-[#22d3ee]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_MatchGame__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    // Learn Mode
    if (gameMode === 'learn') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#8b5cf6]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Learn Mode"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to learn"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_LearnMode__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer,
                        options: q.options,
                        explanation: q.explanation,
                        type: q.type,
                        difficulty: q.difficulty
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    // Test Mode
    if (gameMode === 'test') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#ffb347]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#ffb347]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Practice Test"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to test"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#ffb347]/15 border border-[#ffb347]/30 text-[#ffb347] hover:bg-[#ffb347]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_TestMode__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer,
                        options: q.options,
                        explanation: q.explanation,
                        type: q.type,
                        difficulty: q.difficulty
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    /* ─── Render: Loading skeleton ─── */ if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-white/[0.03] animate-pulse"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-5 w-32 rounded bg-white/[0.03] animate-pulse mb-2"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-3 w-20 rounded bg-white/[0.03] animate-pulse"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "max-w-lg mx-auto",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "min-h-80 rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]"
                    })
                })
            ]
        });
    }
    /* ─── Render: Offline empty state (no cached flashcards) ─── */ if (offlineEmpty && questions.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_OfflineEmptyState__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    label: "flashcards",
                    onRetry: ()=>fetchFlashcards(mode, systemFilter),
                    hint: "Flashcards haven't been cached yet. Open this tab while online once to make your deck available offline."
                })
            ]
        });
    }
    /* ─── Render: Session complete summary ─── */ if (sessionComplete) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                    children: GAME_MODE_OPTIONS.map((opt)=>{
                        const isActive = gameMode === opt.value;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                            style: {
                                background: isActive ? `${opt.color}12` : 'transparent',
                                color: isActive ? opt.color : '#5a6478'
                            },
                            children: [
                                opt.icon,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: opt.label
                                })
                            ]
                        }, opt.value);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto text-center py-8",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-20 h-20 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-6",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                className: "w-10 h-10 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-2xl font-bold text-[#e8ecf4] mb-2",
                            children: "Session Complete!"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-[#5a6478] mb-8",
                            children: "Great work reviewing your flashcards"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-3 gap-4 mb-8",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: sessionStats.studied
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Studied"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: sessionStats.correct
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Correct"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: [
                                                accuracy,
                                                "%"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Accuracy"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            onClick: handleRestart,
                            className: "bg-[#00e5a0]/15 border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all px-8 py-3 text-sm font-bold",
                            variant: "outline",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                    className: "w-4 h-4 mr-2"
                                }),
                                "Study Again"
                            ]
                        })
                    ]
                })
            ]
        });
    }
    /* ─── Render: Empty state ─── */ if (totalCards === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                    children: GAME_MODE_OPTIONS.map((opt)=>{
                        const isActive = gameMode === opt.value;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                            style: {
                                background: isActive ? `${opt.color}12` : 'transparent',
                                color: isActive ? opt.color : '#5a6478'
                            },
                            children: [
                                opt.icon,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: opt.label
                                })
                            ]
                        }, opt.value);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-wrap gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                            value: mode,
                            onValueChange: (v)=>setMode(v),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {})
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                    className: "bg-[#1a1e2b] border-white/[0.08]",
                                    children: MODE_OPTIONS.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: opt.value,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    opt.icon,
                                                    " ",
                                                    opt.label
                                                ]
                                            })
                                        }, opt.value))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                            value: systemFilter,
                            onValueChange: setSystemFilter,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {
                                        placeholder: "System"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                    className: "bg-[#1a1e2b] border-white/[0.08]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: "all",
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: "All Systems"
                                        }),
                                        _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                                value: s,
                                                className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                children: s
                                            }, s))
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto text-center py-12",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-[#3a4055]"
                            })
                        }),
                        mode === 'due' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No cards due for review"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Great job! Come back later when cards are scheduled for review."
                                })
                            ]
                        }) : mode === 'new' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No new cards available"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Generate some questions first, then come back to study them as flashcards."
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No flashcards available"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Generate some questions first to start studying with flashcards."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-3 justify-center mt-6",
                            children: [
                                mode !== 'all' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                    onClick: ()=>setMode('all'),
                                    variant: "outline",
                                    className: "bg-[#1a1e2b] border-white/[0.1] text-[#e8ecf4] hover:bg-white/[0.06] hover:border-white/[0.2] text-xs",
                                    children: "Try All Cards"
                                }),
                                mode !== 'random' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                    onClick: ()=>setMode('random'),
                                    variant: "outline",
                                    className: "bg-[#00e5a0]/10 border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 text-xs",
                                    children: "Try Random"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
    /* ─── Main Render ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-4 sm:p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#00e5a0]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold text-[#e8ecf4]",
                                children: "Flashcards"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478]",
                                children: "Spaced repetition study"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: ()=>setShowShortcuts(!showShortcuts),
                        className: "p-2 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all",
                        title: "Keyboard shortcuts",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                children: GAME_MODE_OPTIONS.map((opt)=>{
                    const isActive = gameMode === opt.value;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                        className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                        style: {
                            background: isActive ? `${opt.color}12` : 'transparent',
                            color: isActive ? opt.color : '#5a6478',
                            boxShadow: isActive ? `0 0 12px ${opt.color}08` : 'none'
                        },
                        children: [
                            opt.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: opt.label
                            })
                        ]
                    }, opt.value);
                })
            }),
            showShortcuts && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.08] text-xs text-[#8b95a8]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "font-semibold text-[#e8ecf4] mb-2",
                        children: "Keyboard Shortcuts"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-x-6 gap-y-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "Space"
                                    }),
                                    " Flip card"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "←"
                                    }),
                                    " Previous"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "1"
                                    }),
                                    " Again (\uD83D\uDE15)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "→"
                                    }),
                                    " Next"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "2"
                                    }),
                                    " Hard (\uD83E\uDD14)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "3"
                                    }),
                                    " Good (\uD83D\uDE42)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "4"
                                    }),
                                    " Easy (\uD83D\uDE0E)"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                        value: mode,
                        onValueChange: (v)=>setMode(v),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: MODE_OPTIONS.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                        value: opt.value,
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                opt.icon,
                                                " ",
                                                opt.label
                                            ]
                                        })
                                    }, opt.value))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                        value: systemFilter,
                        onValueChange: setSystemFilter,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {
                                    placeholder: "System"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Systems"
                                    }),
                                    _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: s,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: s
                                        }, s))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                        variant: "ghost",
                        size: "sm",
                        onClick: handleRestart,
                        className: "text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 text-xs h-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1"
                            }),
                            "Refresh"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-xs text-[#5a6478]",
                                children: [
                                    "Card ",
                                    currentIndex + 1,
                                    " of ",
                                    totalCards
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-xs text-[#5a6478]",
                                children: [
                                    Math.round(progressPercent),
                                    "% complete"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1 bg-white/[0.06] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full bg-[#00e5a0] rounded-full transition-all duration-500 ease-out",
                            style: {
                                width: `${progressPercent}%`
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "relative cursor-pointer",
                        style: {
                            perspective: '1200px'
                        },
                        onClick: handleFlip,
                        role: "button",
                        tabIndex: 0,
                        "aria-label": isFlipped ? 'Click to show question' : 'Click to reveal answer',
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') handleFlip();
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "transition-transform duration-300 ease-out",
                            style: {
                                transform: slideDirection === 'left' ? 'translateX(-30px)' : slideDirection === 'right' ? 'translateX(30px)' : 'translateX(0)',
                                opacity: slideDirection ? 0 : 1
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative w-full transition-transform duration-500 ease-in-out",
                                style: {
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col",
                                        style: {
                                            backfaceVisibility: 'hidden',
                                            background: 'rgba(255,255,255,0.03)',
                                            boxShadow: '0 0 40px rgba(0,229,160,0.06), 0 4px 20px rgba(0,0,0,0.3)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex items-center gap-2 mb-4 flex-wrap",
                                                children: currentCard && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: `text-[10px] font-semibold border-0 px-2 py-0.5 ${currentCard.type === 'mcq' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' : currentCard.type === 'tf' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#8b5cf6]/10 text-[#8b5cf6]'}`,
                                                            children: currentCard.type === 'mcq' ? 'MCQ' : currentCard.type === 'tf' ? 'TF' : 'Short'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: `text-[10px] font-semibold border-0 px-2 py-0.5 ${currentCard.difficulty === 'Easy' ? 'bg-[#22c55e]/10 text-[#22c55e]' : currentCard.difficulty === 'Basic' ? 'bg-[#4ade80]/10 text-[#4ade80]' : currentCard.difficulty === 'Moderate' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : currentCard.difficulty === 'Hard' ? 'bg-[#f97316]/10 text-[#f97316]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`,
                                                            children: currentCard.difficulty
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: "text-[10px] font-semibold bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5",
                                                            children: currentCard.system
                                                        }),
                                                        currentCard.flashcardProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: "text-[10px] font-semibold bg-[#00e5a0]/10 text-[#00e5a0] border-0 px-2 py-0.5",
                                                            children: [
                                                                "Review in ",
                                                                formatInterval(currentCard.flashcardProgress.interval)
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex-1 flex items-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-3",
                                                            children: "Question"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[15px] sm:text-base leading-relaxed text-[#e8ecf4]",
                                                            children: currentCard ? stripHtml(currentCard.text) : ''
                                                        }),
                                                        currentCard && currentCard.type === 'mcq' && currentCard.options && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "mt-4 space-y-2",
                                                            children: currentCard.options.map((opt, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-start gap-2 text-sm text-[#8b95a8]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-[10px] font-bold text-[#3a4055] mt-0.5 w-5 text-center flex-shrink-0",
                                                                            children: String.fromCharCode(65 + i)
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            children: stripHtml(opt)
                                                                        })
                                                                    ]
                                                                }, i))
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-4 pt-4 border-t border-white/[0.06] text-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-xs text-[#3a4055]",
                                                    children: [
                                                        "Tap to reveal answer \xb7 ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                            className: "px-1 py-0.5 rounded bg-white/[0.06] text-[#5a6478] font-mono text-[10px]",
                                                            children: "Space"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute inset-0 w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col",
                                        style: {
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            background: 'rgba(255,255,255,0.03)',
                                            boxShadow: '0 0 40px rgba(0,229,160,0.08), 0 4px 20px rgba(0,0,0,0.3)'
                                        },
                                        children: currentCard && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-2 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                    className: "w-4 h-4 text-[#00e5a0]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#00e5a0] uppercase tracking-wider font-semibold",
                                                                    children: "Answer"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#00e5a0]/10 border border-[#00e5a0]/20 rounded-xl px-4 py-3",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-sm sm:text-base text-[#e8ecf4] font-medium",
                                                                children: stripHtml(currentCard.answer)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-1.5",
                                                            children: "Explanation"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs sm:text-sm text-[#8b95a8] leading-relaxed",
                                                            children: stripHtml(currentCard.explanation)
                                                        })
                                                    ]
                                                }),
                                                currentCard.mnemonic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1.5 mb-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3 text-[#8b5cf6]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#8b5cf6] uppercase tracking-wider font-semibold",
                                                                    children: "Mnemonic"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-lg px-3 py-2",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs sm:text-sm text-[#c4b5fd] leading-relaxed",
                                                                children: stripHtml(currentCard.mnemonic)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.clinicalPearl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1.5 mb-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3 text-[#f59e0b]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#f59e0b] uppercase tracking-wider font-semibold",
                                                                    children: "Clinical Pearl"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg px-3 py-2",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs sm:text-sm text-[#fcd34d] leading-relaxed",
                                                                children: stripHtml(currentCard.clinicalPearl)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.flashcardProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "mt-auto pt-3 border-t border-white/[0.06]",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#3a4055]",
                                                        children: [
                                                            "Last reviewed: ",
                                                            new Date(currentCard.flashcardProgress.lastReview).toLocaleDateString(),
                                                            " \xb7 Interval: ",
                                                            formatInterval(currentCard.flashcardProgress.interval),
                                                            " \xb7 Repetition: ",
                                                            currentCard.flashcardProgress.repetition
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    isFlipped && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478] text-center mb-3",
                                children: "How well did you know this? Rate your recall:"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-4 gap-2 sm:gap-3",
                                children: RATING_OPTIONS.map((rating)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>handleRate(rating.quality),
                                        disabled: submitting,
                                        className: `
                    flex flex-col items-center gap-1.5 py-3 sm:py-4 px-2 rounded-xl
                    border text-sm font-bold transition-all
                    ${rating.color}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    min-h-[60px]
                  `,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-lg sm:text-xl",
                                                children: rating.emoji
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs sm:text-sm",
                                                children: rating.label
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] opacity-60",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                    className: "px-1 py-0.5 rounded bg-white/[0.06] font-mono",
                                                    children: rating.key
                                                })
                                            })
                                        ]
                                    }, rating.quality))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mt-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: goPrev,
                                disabled: currentIndex <= 0 || isAnimating,
                                className: "text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-1"
                                    }),
                                    "Prev"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    Array.from({
                                        length: Math.min(totalCards, 10)
                                    }, (_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                if (!isAnimating) {
                                                    setSlideDirection(i > currentIndex ? 'left' : 'right');
                                                    setIsAnimating(true);
                                                    setTimeout(()=>{
                                                        setCurrentIndex(i);
                                                        setIsFlipped(false);
                                                        setSlideDirection(null);
                                                        setTimeout(()=>setIsAnimating(false), 300);
                                                    }, 250);
                                                }
                                            },
                                            className: `w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#00e5a0] w-4' : i < currentIndex ? 'bg-[#00e5a0]/40' : 'bg-white/[0.1]'}`,
                                            "aria-label": `Go to card ${i + 1}`
                                        }, i)),
                                    totalCards > 10 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] text-[#3a4055] ml-1",
                                        children: [
                                            "+",
                                            totalCards - 10
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: goNext,
                                disabled: currentIndex >= totalCards - 1 || isAnimating,
                                className: "text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30",
                                children: [
                                    "Next",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-4 h-4 ml-1"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-6 pt-4 border-t border-white/[0.06]",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#f59e0b]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#e8ecf4]",
                                                    children: sessionStats.studied
                                                }),
                                                " studied"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#00e5a0]",
                                                    children: sessionStats.correct
                                                }),
                                                " correct"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#ff5757]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#ff5757]",
                                                    children: sessionStats.incorrect
                                                }),
                                                " missed"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-xs text-[#5a6478]",
                            children: [
                                "Accuracy: ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: `font-bold ${accuracy >= 70 ? 'text-[#00e5a0]' : accuracy >= 40 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`,
                                    children: [
                                        accuracy,
                                        "%"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 176484:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

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

/***/ 201625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useLabelableId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(925685);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(317526);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8231);
/* harmony import */ var _LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(650484);
/* __next_internal_client_entry_do_not_use__ useLabelableId auto */ 






function useLabelableId(params = {}) {
    const { id, enabled = true } = params;
    const { controlId, registerControlId, resetControlId } = (0,_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useLabelableContext */ .H)();
    // Deliberately not seeded with `id`: on React 17 the seed would stick around after the
    // `id` prop is removed, leaving the control on a stale id forever.
    const defaultId = (0,_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useBaseUiId */ .e)();
    const controlSourceRef = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__/* .useRefWithInit */ .j)(()=>Symbol());
    const hasRegisteredRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hadExplicitIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const unregisterControlId = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(()=>{
        if (!hasRegisteredRef.current || registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE) {
            return;
        }
        hasRegisteredRef.current = false;
        registerControlId(controlSourceRef.current, undefined);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled || registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE) {
            unregisterControlId();
            return undefined;
        }
        let nextId;
        if (id !== undefined) {
            hadExplicitIdRef.current = true;
            nextId = id;
        } else if (hadExplicitIdRef.current) {
            nextId = defaultId;
        } else {
            // An id-less replacement must claim the provider's fallback so a previously registered
            // explicit id is not retained after its control unmounts.
            resetControlId();
            return undefined;
        }
        // Either the control never had an explicit `id`, or React 17 has not assigned the
        // fallback id yet. Neither is worth registering.
        if (nextId === undefined) {
            unregisterControlId();
            return undefined;
        }
        hasRegisteredRef.current = true;
        registerControlId(controlSourceRef.current, nextId);
        return undefined;
    }, [
        id,
        enabled,
        registerControlId,
        resetControlId,
        defaultId,
        controlSourceRef,
        unregisterControlId
    ]);
    // Unregistering in the layout phase, not a passive effect: a replacement control's layout
    // effect would otherwise run first and still see the outgoing control's registration.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        return unregisterControlId;
    }, [
        unregisterControlId
    ]);
    // The provider's id wins until registration runs: the label renders `htmlFor` from the
    // provider's pre-registration state, so preempting it with an explicit `id` here would
    // leave the pair unassociated in server-rendered markup.
    return (enabled ? controlId : undefined) ?? id ?? defaultId;
}


/***/ }),

/***/ 202544:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121635);
/* harmony import */ var next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(986315);
/* harmony import */ var next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(301020);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(961287);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","__next_app__","routeModule","handler"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

const module0 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 376537)));
const module1 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 695127)));
const module2 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module3 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 308979)));
const module4 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module5 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module6 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 929604)));
const module7 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module8 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module9 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module10 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 676776)));
const module11 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 588772)));
const module12 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const page13 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 57359)));
const default14 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 297219)));


const tree = {
        children: [
        '',
        {
        children: [
        '(app)',
        {
        children: [
        'flashcards',
        {
        children: ['__PAGE__', {}, {
          page: [page13, "/workspaces/next/run/src/app/(app)/flashcards/page.tsx"],
          
        }]
      },
        {
        'layout': [module10, "/workspaces/next/run/src/app/(app)/flashcards/layout.tsx"],
'loading': [module11, "/workspaces/next/run/src/app/(app)/flashcards/loading.tsx"],
'global-error': [module12, "next/dist/client/components/builtin/global-error.js"],
        
      },
        []
      ],
modal: [
          '__DEFAULT__',
          {},
          {
            defaultPage: [default14, "/workspaces/next/run/src/app/(app)/@modal/default.tsx"],
          }
        ]
      },
        {
        'layout': [module6, "/workspaces/next/run/src/app/(app)/layout.tsx"],
'global-error': [module7, "next/dist/client/components/builtin/global-error.js"],
'forbidden': [module8, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module9, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      },
        {
        'layout': [module0, "/workspaces/next/run/src/app/layout.tsx"],
'loading': [module1, "/workspaces/next/run/src/app/loading.tsx"],
'global-error': [module2, "next/dist/client/components/builtin/global-error.js"],
'not-found': [module3, "/workspaces/next/run/src/app/not-found.tsx"],
'forbidden': [module4, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module5, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      }.children;
const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const entrypoint = (0,next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__/* .createAppPageEntrypoint */ .H)({
    tree,
    page: "/(app)/flashcards/page",
    pathname: "/flashcards",
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__,
    interopDefault: next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__/* .interopDefault */ .T
});
const __next_app__ = entrypoint.__next_app__;
const routeModule = entrypoint.routeModule;
const handler = entrypoint.handler;


//# sourceMappingURL=app-page.js.map


/***/ }),

/***/ 203247:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ OfflineEmptyState)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(369702);
/* harmony import */ var _barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27993);
/* harmony import */ var _lib_offline_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(406746);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * OfflineEmptyState — a reusable "You're offline" empty-state component.
 *
 * Used by every tab that hits an API endpoint that may not be cached.
 * When the SW returns a 503 offline response (or when navigator.onLine
 * is false and the fetch failed), the tab renders this component instead
 * of misleading "Failed to load" toast + empty list.
 *
 * Props:
 *   - label: what we tried to load (e.g. "questions", "flashcards")
 *   - onRetry: callback for the "Retry" button
 *   - hint: optional extra explanation
 *   - compact: if true, render a smaller version for inline panels
 *
 * IMPORTANT: The `online` event listener is attached ONCE on mount (using
 * a ref to hold the latest onRetry callback). Previously the listener was
 * re-attached on every parent re-render because `onRetry` was a dependency
 * of the useEffect — this caused listener churn and re-render storms when
 * the parent component re-rendered frequently.
 */ 


function OfflineEmptyState({ label = 'content', onRetry, hint, compact = false }) {
    const [retrying, setRetrying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Use a ref to hold the latest onRetry callback so the `online` event
    // listener doesn't need to be re-attached on every parent re-render.
    // This was a major source of "heavy" feeling — every parent state
    // change was tearing down and re-adding the listener.
    const onRetryRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onRetry);
    onRetryRef.current = onRetry;
    // Auto-retry when the browser comes back online (Telegram-style —
    // user doesn't need to tap Retry if they just wait for connectivity).
    // The empty dependency array means this listener is attached ONCE
    // for the lifetime of this component instance.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>{
            const fn = onRetryRef.current;
            if (fn) {
                setRetrying(true);
                // Small delay so the spinner is visible briefly + gives the
                // network time to actually be usable
                setTimeout(()=>{
                    try {
                        fn();
                    } catch (e) {
                    /* ignore */ }
                    setRetrying(false);
                }, 500);
            }
        };
        window.addEventListener('online', handleOnline);
        return ()=>window.removeEventListener('online', handleOnline);
    }, []);
    const handleRetry = ()=>{
        if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_2__/* .browserIsOffline */ .Ey)()) {
            // Browser still offline — no point retrying, just jiggle the button
            // briefly so the user gets feedback that they tapped it
            setRetrying(true);
            setTimeout(()=>setRetrying(false), 400);
            return;
        }
        const fn = onRetryRef.current;
        if (fn) {
            setRetrying(true);
            try {
                Promise.resolve(fn()).finally(()=>setRetrying(false));
            } catch (e) {
                setRetrying(false);
            }
        }
    };
    if (compact) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center justify-center py-8 px-4 text-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-10 h-10 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-2",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#ffb347]"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[#ffb347] text-xs font-semibold",
                    children: "You're offline"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[#5a6178] text-[11px] mt-1 max-w-[240px]",
                    children: hint || `${label[0].toUpperCase() + label.slice(1)} will load once you reconnect.`
                }),
                onRetry && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: handleRetry,
                    disabled: retrying,
                    className: "mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: `w-3 h-3 ${retrying ? 'animate-spin' : ''}`
                        }),
                        "Retry"
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center py-20 px-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-16 h-16 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-7 h-7 text-[#ffb347]"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[#ffb347] text-sm font-semibold",
                children: "You're offline"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[#5a6178] text-xs mt-1 text-center max-w-xs",
                children: hint || `The ${label} hasn't been cached yet. Open this tab while online once, and your ${label} will be available offline afterwards.`
            }),
            onRetry && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: handleRetry,
                disabled: retrying,
                className: "mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: `w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`
                    }),
                    "Retry"
                ]
            })
        ]
    });
}


/***/ }),

/***/ 254726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MatchGame)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(404586);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(594710);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(753053);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(120759);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(998808);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(967254);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(304870);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(133204);
/* __next_internal_client_entry_do_not_use__ default auto */ 




/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
function MatchTile({ tile, isFlipped, isMatched, isWrong, onClick }) {
    const borderColor = isMatched ? C.green : isWrong ? C.danger : isFlipped ? C.cyan : C.cardBorder;
    const bgColor = isMatched ? `${C.green}08` : isWrong ? `${C.danger}08` : isFlipped ? `${C.cyan}06` : 'rgba(255,255,255,0.02)';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: onClick,
        disabled: isMatched,
        className: `
        relative w-full p-3 rounded-xl border text-left transition-all duration-200
        ${isMatched ? 'opacity-60 cursor-default' : 'cursor-pointer hover:border-white/15'}
      `,
        style: {
            borderColor: `${borderColor}40`,
            background: bgColor,
            boxShadow: isFlipped && !isMatched ? `0 0 15px ${C.cyan}10` : 'none'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 rounded-xl transition-opacity duration-300",
                style: {
                    background: isFlipped && !isMatched ? `linear-gradient(135deg, ${C.cyan}08, ${C.purple}08)` : 'transparent',
                    opacity: isFlipped ? 1 : 0
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] font-bold uppercase tracking-wider mb-1 block",
                        style: {
                            color: tile.type === 'term' ? C.cyan : C.amber
                        },
                        children: tile.type === 'term' ? 'Term' : 'Definition'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs leading-relaxed",
                        style: {
                            color: isMatched ? C.green : isFlipped ? C.text : C.muted
                        },
                        children: tile.content.length > 80 ? tile.content.slice(0, 78) + '...' : tile.content
                    })
                ]
            }),
            isMatched && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute top-2 right-2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: C.green
                    }
                })
            })
        ]
    });
}
/* ─── Leaderboard ─── */ function MatchLeaderboard({ entries }) {
    if (entries.length === 0) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-4 rounded-xl border",
        style: {
            background: C.card,
            borderColor: C.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        className: "w-4 h-4",
                        style: {
                            color: C.amber
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs font-bold",
                        style: {
                            color: C.text
                        },
                        children: "Top Scores"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-1.5",
                children: entries.slice(0, 5).map((entry, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between text-[11px]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: i === 0 ? C.amber : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : C.dimmed
                                        },
                                        children: i === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : i === 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            Math.round(entry.time),
                                            "s"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "\xb7"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            entry.mistakes,
                                            " mistakes"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "font-bold",
                                style: {
                                    color: i === 0 ? C.amber : C.cyan
                                },
                                children: [
                                    entry.score,
                                    "pts"
                                ]
                            })
                        ]
                    }, i))
            })
        ]
    });
}
/* ─── Main MatchGame Component ─── */ function MatchGame({ cards, onBack }) {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$)();
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [showResults, setShowResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [leaderboard, setLeaderboard] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // Generate pairs from cards
    const pairs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>cards.slice(0, 8).map((card)=>({
                id: card.id,
                term: card.text.length > 60 ? card.text.slice(0, 58) + '...' : card.text,
                definition: card.answer.length > 60 ? card.answer.slice(0, 58) + '...' : card.answer
            })), [
        cards
    ]);
    // Generate shuffled tiles
    const tiles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const allTiles = [];
        pairs.forEach((pair)=>{
            allTiles.push({
                id: `${pair.id}-term`,
                pairId: pair.id,
                content: pair.term,
                type: 'term'
            });
            allTiles.push({
                id: `${pair.id}-def`,
                pairId: pair.id,
                content: pair.definition,
                type: 'definition'
            });
        });
        // Shuffle using Fisher-Yates
        for(let i = allTiles.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [allTiles[i], allTiles[j]] = [
                allTiles[j],
                allTiles[i]
            ];
        }
        return allTiles;
    }, [
        pairs
    ]);
    // Initialize match on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().initMatch(pairs);
    }, [
        pairs
    ]);
    // Start timer
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        timerRef.current = setInterval(()=>{
            setElapsed((prev)=>prev + 1);
        }, 1000);
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);
    // Handle card click
    const handleTileClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((tile)=>{
        const state = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
        if (state.match.isComplete) return;
        if (state.match.matchedIds.includes(tile.id)) return;
        if (state.match.flippedIds.includes(tile.id)) return;
        if (state.match.flippedIds.length >= 2) return;
        state.flipCard(tile.id);
        const newFlipped = [
            ...state.match.flippedIds,
            tile.id
        ];
        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            const firstTile = tiles.find((t)=>t.id === first);
            const secondTile = tiles.find((t)=>t.id === second);
            if (firstTile && secondTile && firstTile.pairId === secondTile.pairId && firstTile.type !== secondTile.type) {
                // Match found!
                setTimeout(()=>{
                    _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().recordMatch(first, second);
                    // Check completion
                    const newState = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
                    if (newState.match.isComplete) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        handleSubmitScore();
                    }
                }, 400);
            } else {
                // Mismatch
                setTimeout(()=>{
                    _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().recordMismatch();
                }, 800);
            }
        }
    }, [
        tiles
    ]);
    const handleSubmitScore = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const state = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
        const time = (Date.now() - state.match.startTime) / 1000;
        try {
            const res = await fetch('/api/flashcards/match-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time,
                    mistakes: state.match.mistakes,
                    pairs: pairs.length,
                    score: state.score
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.xpEarned) {
                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`+${data.xpEarned} XP`, {
                        duration: 2000
                    });
                }
                if (data.leaderboard) {
                    setLeaderboard(data.leaderboard);
                }
            }
        } catch  {
        // silent fail
        }
        setShowResults(true);
    }, [
        pairs.length
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().initMatch(pairs);
        setElapsed(0);
        setShowResults(false);
        // Restart timer
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(()=>{
            setElapsed((prev)=>prev + 1);
        }, 1000);
    }, [
        pairs
    ]);
    const formatTime = (seconds)=>{
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };
    const matchState = store.match;
    const totalPairs = pairs.length;
    const matchedCount = matchState.matchedIds.length / 2;
    const progressPercent = totalPairs > 0 ? matchedCount / totalPairs * 100 : 0;
    /* ─── Results Screen ─── */ if (showResults) {
        const totalTime = matchState.endTime && matchState.startTime ? (matchState.endTime - matchState.startTime) / 1000 : elapsed;
        const timeBonus = Math.max(0, 300 - Math.round(totalTime));
        const mistakePenalty = matchState.mistakes * 15;
        const finalScore = store.score + timeBonus - mistakePenalty;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center",
                        style: {
                            background: `${C.amber}10`
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-10 h-10",
                            style: {
                                color: C.amber
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-2xl font-bold mb-2",
                        style: {
                            color: C.text
                        },
                        children: "Match Complete!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm mb-6",
                        style: {
                            color: C.muted
                        },
                        children: [
                            "You matched all ",
                            totalPairs,
                            " pairs"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(Math.round(totalTime))
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Time"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: matchState.mistakes
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Mistakes"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.amber
                                        },
                                        children: finalScore
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Score"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 rounded-xl border text-left mb-6",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs font-bold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Score Breakdown"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Base Score"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.green
                                                },
                                                children: [
                                                    "+",
                                                    store.score
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Time Bonus"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: [
                                                    "+",
                                                    timeBonus
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Mistake Penalty"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.danger
                                                },
                                                children: [
                                                    "-",
                                                    mistakePenalty
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between pt-2 border-t",
                                        style: {
                                            borderColor: C.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "font-bold",
                                                style: {
                                                    color: C.text
                                                },
                                                children: "Final"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "font-bold",
                                                style: {
                                                    color: C.amber
                                                },
                                                children: finalScore
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchLeaderboard, {
                        entries: leaderboard
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3 mt-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Play Again"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    /* ─── Game Board ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onBack,
                                className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                                style: {
                                    color: C.muted
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-sm font-bold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Match Game"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Match terms to definitions"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-mono font-bold",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(elapsed)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: matchState.mistakes > 0 ? C.danger : C.dimmed
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: matchState.mistakes > 0 ? C.danger : C.dimmed
                                        },
                                        children: matchState.mistakes
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: `${C.amber}08`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C.amber
                                        },
                                        children: store.score
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px]",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    matchedCount,
                                    "/",
                                    totalPairs,
                                    " matched"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px]",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    Math.round(progressPercent),
                                    "%"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-500 ease-out",
                            style: {
                                width: `${progressPercent}%`,
                                background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                    children: tiles.map((tile)=>{
                        const isFlipped = matchState.flippedIds.includes(tile.id);
                        const isMatched = matchState.matchedIds.includes(tile.id);
                        const isWrong = matchState.flippedIds.length === 2 && matchState.flippedIds.includes(tile.id);
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchTile, {
                            tile: tile,
                            isFlipped: isFlipped || isMatched,
                            isMatched: isMatched,
                            isWrong: isWrong && !isMatched,
                            onClick: ()=>handleTileClick(tile)
                        }, tile.id);
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 297219:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalDefault)
/* harmony export */ });
/**
 * @modal parallel route default.
 *
 * Rendered when no modal route is active (the common case). Must return
 * null so the slot contributes nothing to the layout tree.
 *
 * When an intercepted route IS active — e.g. the user clicked a question in
 * /bank and was soft-navigated to /bank/[id] — Next.js renders
 * (app)/@modal/(.)bank/[id]/page.tsx into this slot instead, showing the
 * question detail as a modal over the still-mounted bank list. Pressing
 * Back (or closing the modal) soft-navigates back to /bank, the slot
 * re-renders to this default, and the modal disappears — with the list's
 * state (filters, scroll, pagination) preserved because it never unmounted.
 */ function ModalDefault() {
    return null;
}


/***/ }),

/***/ 304870:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowLeft)
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
    name: "arrow-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m12 19-7-7 7-7",
                key: "1l729n"
            }
        ],
        [
            "path",
            {
                d: "M19 12H5",
                key: "x3x0zl"
            }
        ]
    ]
};
__iconData.node;
const ArrowLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-left.mjs.map


/***/ }),

/***/ 320503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    },
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    areCookiesMutableInCurrentPhase: function() {
        return areCookiesMutableInCurrentPhase;
    },
    createCookiesWithMutableAccessCheck: function() {
        return createCookiesWithMutableAccessCheck;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    responseCookiesToRequestCookies: function() {
        return responseCookiesToRequestCookies;
    }
});
const _cookies = __webpack_require__(191488);
const _reflect = __webpack_require__(120445);
const _workasyncstorageexternal = __webpack_require__(529294);
const _actionrevalidationkind = __webpack_require__(943014);
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
        Object.defineProperty(this, "__NEXT_ERROR_CODE", {
            value: "E1180",
            enumerable: false,
            configurable: true
        });
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * @param cookies
   * @returns A fresh object identity backed by the original value
   */ static fresh(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new _cookies.ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function createCookiesWithMutableAccessCheck(requestStore) {
    const wrappedCookies = new Proxy(requestStore.mutableCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new _cookies.RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}

//# sourceMappingURL=request-cookies.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 350039:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useRender)
/* harmony export */ });
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(671775);

/**
 * Renders a Base UI element.
 *
 * @public
 */
function useRender(params) {
  return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useRenderElement */ .o)(params.defaultTagName ?? 'div', params, params);
}

/***/ }),

/***/ 379551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 389983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V$: () => (/* binding */ useFieldRootContext)
/* harmony export */ });
/* unused harmony exports DEFAULT_FIELD_ROOT_CONTEXT, FieldRootContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(317526);
/* harmony import */ var _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(847310);
/* __next_internal_client_entry_do_not_use__ DEFAULT_FIELD_ROOT_CONTEXT,FieldRootContext,useFieldRootContext auto */ 




const DEFAULT_FIELD_ROOT_CONTEXT = {
    invalid: undefined,
    name: undefined,
    validityData: {
        state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_VALIDITY_STATE */ .ZV,
        errors: [],
        error: '',
        value: '',
        initialValue: null
    },
    setValidityData: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    disabled: undefined,
    setTouched: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setDirty: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setFilled: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setFocused: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    focusOwnerRef: {
        current: undefined
    },
    validationMode: 'onSubmit',
    shouldValidateOnChange: ()=>false,
    state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_FIELD_ROOT_STATE */ .mk,
    registerFieldControl: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    validation: {
        getValidationProps: (_disabled, props = _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .EMPTY_OBJECT */ .t0)=>props,
        inputRef: {
            current: null
        },
        registeredInputs: new Map(),
        registerInput: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
        getInputControl: ()=>null,
        commit: async ()=>{},
        change: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE
    }
};
const FieldRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
if (false) {}
function useFieldRootContext(optional = true) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FieldRootContext);
    if (context.setValidityData === _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(28));
    }
    return context;
}


/***/ }),

/***/ 406746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ey: () => (/* binding */ browserIsOffline),
/* harmony export */   ej: () => (/* binding */ isOfflineError)
/* harmony export */ });
/* unused harmony exports isOfflineStatus, isOfflineBody */
/* __next_internal_client_entry_do_not_use__ isOfflineStatus,isOfflineBody,isOfflineError,browserIsOffline auto */ /**
 * Helpers for gracefully handling offline 503 responses from the SW.
 *
 * The SW (public/sw.js) returns:
 *   { status: 503, body: { error: string, offline: true } }
 * for any API GET that fails because the network is down AND no cached
 * response is available.
 *
 * Without these helpers, tab components show misleading errors like:
 *   - "Failed to load questions" (BankTab)
 *   - "Failed to fetch dashboard data" (DashboardTab)
 *   - "Fetch rooms error" (ChatTab)
 * …even though the actual cause is just "you're offline, no cache".
 *
 * Usage:
 *   const res = await fetch('/api/questions?...');
 *   if (!res.ok) {
 *     if (isOfflineResponse(res)) {
 *       // Show "You're offline — showing cached data when available" empty state
 *     } else {
 *       // Show generic "Failed to load" error
 *     }
 *   }
 */ /**
 * Returns true if the Response is a 503 from the SW's offline fallback.
 * The SW stamps these responses with `{ offline: true }` in the JSON body.
 *
 * Note: this only works AFTER `await res.json()` has been called, OR by
 * checking the status code alone (less precise but doesn't require parsing).
 */ function isOfflineStatus(res) {
    return res.status === 503;
}
/**
 * Returns true if the parsed JSON body has `offline: true` — the marker
 * the SW adds to its offline fallback responses.
 *
 * Use this when you've already parsed the response body:
 *   const data = await res.json().catch(() => null);
 *   if (isOfflineBody(data)) { ... }
 */ function isOfflineBody(data) {
    return !!data && typeof data === 'object' && data.offline === true;
}
/**
 * Combined check: status 503 OR body.offline === true.
 *
 * Example:
 *   const res = await fetch('/api/dashboard');
 *   if (!res.ok) {
 *     const data = await res.json().catch(() => null);
 *     if (isOfflineError(res, data)) {
 *       setOfflineEmptyState(true);  // show "You're offline" UI
 *     } else {
 *       setError('Failed to load');  // show generic error
 *     }
 *     return;
 *   }
 */ function isOfflineError(res, data) {
    return isOfflineStatus(res) || isOfflineBody(data);
}
/**
 * Convenience: returns true if the browser is currently offline.
 * Use this to preemptively skip fetches that will obviously fail.
 */ function browserIsOffline() {
    return typeof navigator !== 'undefined' && !navigator.onLine;
}


/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 425318:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ useFormContext)
/* harmony export */ });
/* unused harmony export FormContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317526);
/* __next_internal_client_entry_do_not_use__ FormContext,useFormContext auto */ 

const FormContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    elementRef: {
        current: null
    },
    formRef: {
        current: {
            fields: new Map()
        }
    },
    errors: {},
    clearErrors: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    validationMode: 'onSubmit',
    submitCountRef: {
        current: 0
    }
});
if (false) {}
function useFormContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(FormContext);
}


/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 464491:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 469517:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ create)
/* harmony export */ });
/* unused harmony export useStore */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134549);



const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
    api.subscribe,
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => selector(api.getState()), [api, selector]),
    () => selector(api.getInitialState())
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__/* .createStore */ .y)(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);




/***/ }),

/***/ 472597:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 491645:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 492305:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
    isRequestApiAllowedInCurrentPhase: function() {
        return isRequestApiAllowedInCurrentPhase;
    },
    throwForSearchParamsAccessInUseCache: function() {
        return throwForSearchParamsAccessInUseCache;
    },
    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
    }
});
const _staticgenerationbailout = __webpack_require__(315693);
const _actionasyncstorageexternal = __webpack_require__(419121);
const _aftertaskasyncstorageexternal = __webpack_require__(903295);
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E842",
        enumerable: false,
        configurable: true
    });
    Error.captureStackTrace(error, constructorOpt);
    workStore.invalidDynamicUsageError ??= error;
    throw error;
}
function isRequestApiAllowedInCurrentPhase(workUnitStore) {
    switch(workUnitStore.phase){
        case 'action':
        case 'render':
            {
                // The request is still in progress. The API may be disallowed for other reasons,
                // but not because of phase.
                return true;
            }
        case 'after':
            {
                // The request has finished.
                // If we're in a Route Handler or a Server Action,
                // request APIs can be called everywhere, even in after().
                const actionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
                if (actionStore && (actionStore.isAppRoute || actionStore.isAction)) {
                    return true;
                }
                const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
                if (afterTaskStore) {
                    // We're in an `after` callback. Request APIs are callable if
                    // the `after()` call happened in an action phase:
                    // - in a Route Handler
                    // - in a Server Action's body (but not the render after)
                    //
                    // TODO(after): Is it even possible to have `phase === 'action'` but no `actionStore`?
                    // We should revisit this setup and simplify this.
                    return afterTaskStore.rootTaskSpawnPhase === 'action';
                }
                // Otherwise, we must be in a page, in the `after` phase.
                // We don't allow calling request APIs here because we'd miss
                // them during prerendering and wouldn't know that the page is dynamic.
                return false;
            }
    }
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 521654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ cva)
/* harmony export */ });
/* unused harmony export cx */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(699314);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ 
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__/* .clsx */ .$;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };



/***/ }),

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 560336:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gq: () => (/* binding */ invalid),
/* harmony export */   rZ: () => (/* binding */ valid)
/* harmony export */ });
/* unused harmony exports disabled, touched, dirty, filled, focused */
/**
 * Present when the field is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the field is in a valid state.
 */
const valid = 'data-valid';
/**
 * Present when the field is in an invalid state.
 */
const invalid = 'data-invalid';
/**
 * Present when the field has been touched.
 */
const touched = 'data-touched';
/**
 * Present when the field's value has changed.
 */
const dirty = 'data-dirty';
/**
 * Present when the field is filled.
 */
const filled = 'data-filled';
/**
 * Present when the field control is focused.
 */
const focused = 'data-focused';

/***/ }),

/***/ 579646:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 588772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

// Loading state for /flashcards.
function Loading() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--medq-bg-deep, #0a0e1a)',
            color: 'var(--medq-accent, #00e5a0)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    width: 40,
                    height: 40,
                    border: '3px solid var(--medq-accent, #00e5a0)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 14,
                    color: 'var(--medq-text-muted, #8b95a8)'
                },
                children: "Loading flashcards…"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `@keyframes spin { to { transform: rotate(360deg); } }`
            })
        ]
    });
}


/***/ }),

/***/ 589768:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", ({
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
}));
const _react = /*#__PURE__*/ _interop_require_wildcard(__webpack_require__(391986));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Cache Components is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn =  false ? 0 : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache(// eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
(key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (false) { var _stack; } else {
            logErrorOrWarn(message);
        }
    };
}

//# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map

/***/ }),

/***/ 594710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Medal)
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
    name: "medal",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
                key: "143lza"
            }
        ],
        [
            "path",
            {
                d: "M11 12 5.12 2.2",
                key: "qhuxz6"
            }
        ],
        [
            "path",
            {
                d: "m13 12 5.88-9.8",
                key: "hbye0f"
            }
        ],
        [
            "path",
            {
                d: "M8 7h8",
                key: "i86dvs"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "17",
                r: "5",
                key: "qbz8iq"
            }
        ],
        [
            "path",
            {
                d: "M12 18v-2h-.5",
                key: "fawc4q"
            }
        ]
    ]
};
__iconData.node;
const Medal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=medal.mjs.map


/***/ }),

/***/ 594735:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 615712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 629021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 646060:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external.js");

/***/ }),

/***/ 650484:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useLabelableContext)
/* harmony export */ });
/* unused harmony export LabelableContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317526);
/* __next_internal_client_entry_do_not_use__ LabelableContext,useLabelableContext auto */ 

/**
 * A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
 * with an accessible name (label) and description.
 */ const LabelableContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    controlId: undefined,
    registerControlId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    resetControlId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    labelId: undefined,
    setLabelId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    messageIds: [],
    setMessageIds: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    getDescriptionProps: (externalProps)=>externalProps
});
if (false) {}
function useLabelableContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LabelableContext);
}


/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 668854:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ useSetFieldFocused)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(943512);
/* harmony import */ var _FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389983);
/* __next_internal_client_entry_do_not_use__ useSetFieldFocused auto */ 


/**
 * Returns the field's `setFocused`, recording which control the focused state belongs to.
 *
 * Disabling or unmounting a focused control moves focus away without firing `blur`, so the focused
 * state would otherwise stay latched. A field can have several focus targets, so a control only
 * clears the shared state when focus last landed on itself. The stable callback doubles as that
 * identity.
 */ function useSetFieldFocused(disabled, focusTargetRef, onFocusedChange) {
    const { setFocused, focusOwnerRef } = (0,_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useFieldRootContext */ .V$)();
    const setFieldFocused = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((focused)=>{
        // A disabled target can still be focused (`aria-disabled` elements stay programmatically
        // focusable), but must not publish the field's focused styling.
        if (focused ? !disabled : focusOwnerRef.current === setFieldFocused) {
            focusOwnerRef.current = focused && setFieldFocused;
            onFocusedChange?.(focused);
            setFocused(focused);
        }
    });
    // Re-run when `disabled` changes so a focused control releases the field even when the browser
    // does not fire `blur`. The setup reclaims focus that no focus event reported: StrictMode
    // re-running effects after a mount-time focus, a control focused before hydration, or an
    // `aria-disabled` control re-enabled while it kept focus.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const el = focusTargetRef.current;
        const root = el?.getRootNode();
        if (root?.activeElement === el) {
            setFieldFocused(true);
        }
        return ()=>setFieldFocused(false);
    }, [
        disabled,
        focusTargetRef,
        setFieldFocused
    ]);
    return setFieldFocused;
}


/***/ }),

/***/ 676776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlashcardsLayout),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
/**
 * Per-route metadata for /flashcards.
 */ const metadata = {
    title: 'Flashcards — MedQ',
    description: 'Study with spaced-repetition flashcards, match games and learn mode.'
};
function FlashcardsLayout({ children }) {
    return children;
}


/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 741025:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");

/***/ }),

/***/ 748586:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TestMode)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(304870);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(998808);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(541290);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(691995);
/* __next_internal_client_entry_do_not_use__ default auto */ 


/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}
/* ─── Test Setup Screen ─── */ function TestSetup({ cards, onStart, onBack }) {
    const [questionCount, setQuestionCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.min(10, cards.length));
    const [includeMCQ, setIncludeMCQ] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [includeTF, setIncludeTF] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [includeWritten, setIncludeWritten] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const selectedTypes = [];
    if (includeMCQ) selectedTypes.push('mcq');
    if (includeTF) selectedTypes.push('tf');
    if (includeWritten) selectedTypes.push('written');
    const canStart = selectedTypes.length > 0 && questionCount > 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex-1 overflow-y-auto custom-scrollbar p-6",
        style: {
            background: C.bg
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-md mx-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onBack,
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            style: {
                                color: C.muted
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold",
                                    style: {
                                        color: C.text
                                    },
                                    children: "Practice Test"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs",
                                    style: {
                                        color: C.muted
                                    },
                                    children: "Configure your test"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 rounded-xl border mb-4",
                    style: {
                        background: C.card,
                        borderColor: C.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-bold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Number of Questions"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setQuestionCount(Math.max(1, questionCount - 1)),
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: C.cardBorder,
                                        color: C.muted
                                    },
                                    children: "-"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-2xl font-black flex-1 text-center",
                                    style: {
                                        color: C.cyan
                                    },
                                    children: questionCount
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setQuestionCount(Math.min(cards.length, questionCount + 1)),
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: C.cardBorder,
                                        color: C.muted
                                    },
                                    children: "+"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                            type: "range",
                            min: 1,
                            max: Math.min(30, cards.length),
                            value: questionCount,
                            onChange: (e)=>setQuestionCount(parseInt(e.target.value)),
                            className: "w-full mt-3 accent-[#22d3ee]"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 rounded-xl border mb-4",
                    style: {
                        background: C.card,
                        borderColor: C.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-bold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Question Types"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2",
                            children: [
                                {
                                    type: 'mcq',
                                    label: 'Multiple Choice',
                                    desc: 'Select the correct answer from options',
                                    checked: includeMCQ,
                                    toggle: ()=>setIncludeMCQ(!includeMCQ),
                                    color: C.cyan
                                },
                                {
                                    type: 'tf',
                                    label: 'True / False',
                                    desc: 'Determine if the statement is true or false',
                                    checked: includeTF,
                                    toggle: ()=>setIncludeTF(!includeTF),
                                    color: C.amber
                                },
                                {
                                    type: 'written',
                                    label: 'Written Answer',
                                    desc: 'Type your answer without hints',
                                    checked: includeWritten,
                                    toggle: ()=>setIncludeWritten(!includeWritten),
                                    color: C.purple
                                }
                            ].map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: item.toggle,
                                    className: "w-full text-left p-3 rounded-xl border transition-all",
                                    style: {
                                        background: item.checked ? `${item.color}06` : 'transparent',
                                        borderColor: item.checked ? `${item.color}25` : C.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: item.checked ? C.text : C.muted
                                                        },
                                                        children: item.label
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[10px]",
                                                        style: {
                                                            color: C.dimmed
                                                        },
                                                        children: item.desc
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-5 h-5 rounded-md border flex items-center justify-center",
                                                style: {
                                                    background: item.checked ? item.color : 'transparent',
                                                    borderColor: item.checked ? item.color : C.cardBorder
                                                },
                                                children: item.checked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5",
                                                    style: {
                                                        color: C.bg
                                                    }
                                                })
                                            })
                                        ]
                                    })
                                }, item.type))
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: ()=>canStart && onStart(questionCount, selectedTypes),
                    disabled: !canStart,
                    className: "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
                    style: {
                        background: canStart ? C.cyan : `${C.dimmed}30`,
                        color: canStart ? C.bg : C.dimmed,
                        cursor: canStart ? 'pointer' : 'not-allowed'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: "w-4 h-4 inline mr-2"
                        }),
                        "Start Test (",
                        questionCount,
                        " questions)"
                    ]
                })
            ]
        })
    });
}
/* ─── Main TestMode Component ─── */ function TestMode({ cards, onBack }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('setup');
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [typedAnswer, setTypedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [timer, setTimer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [questionTimer, setQuestionTimer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const qTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Start test
    const handleStartTest = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((count, types)=>{
        // Generate test questions from cards
        const shuffled = [
            ...cards
        ].sort(()=>Math.random() - 0.5).slice(0, count);
        const testQuestions = shuffled.map((card, idx)=>{
            const type = types[idx % types.length];
            const q = {
                cardId: card.id,
                questionText: card.text,
                correctAnswer: card.answer,
                questionType: type,
                explanation: card.explanation,
                userAnswer: '',
                isCorrect: false,
                timeSpent: 0
            };
            if (type === 'mcq') {
                // Build MCQ options
                const distractors = cards.filter((c)=>c.id !== card.id).map((c)=>c.answer).sort(()=>Math.random() - 0.5).slice(0, 3);
                const options = [
                    card.answer,
                    ...distractors
                ].sort(()=>Math.random() - 0.5);
                q.options = options;
            } else if (type === 'tf') {
                // For TF, randomly decide if the statement is true or false
                const isTrueStatement = Math.random() > 0.5;
                if (!isTrueStatement) {
                    // Make it false by modifying the answer slightly
                    q.questionText = card.text;
                    q.correctAnswer = 'False';
                    q.options = [
                        'True',
                        'False'
                    ];
                } else {
                    q.correctAnswer = 'True';
                    q.options = [
                        'True',
                        'False'
                    ];
                }
            }
            // written: no options
            return q;
        });
        setQuestions(testQuestions);
        setCurrentIdx(0);
        setPhase('testing');
        setTimer(0);
        // Start timers
        timerRef.current = setInterval(()=>setTimer((t)=>t + 1), 1000);
        qTimerRef.current = setInterval(()=>setQuestionTimer((t)=>t + 1), 1000);
    }, [
        cards
    ]);
    // Stop timers
    const stopTimers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (qTimerRef.current) {
            clearInterval(qTimerRef.current);
            qTimerRef.current = null;
        }
    }, []);
    // Submit answer for current question
    const handleSubmitAnswer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const q = questions[currentIdx];
        if (!q) return;
        let answer = '';
        let correct = false;
        if (q.questionType === 'mcq' && q.options && selectedOption !== null) {
            answer = q.options[selectedOption];
            correct = answer === q.correctAnswer;
        } else if (q.questionType === 'tf' && q.options && selectedOption !== null) {
            answer = q.options[selectedOption];
            correct = answer === q.correctAnswer;
        } else if (q.questionType === 'written') {
            answer = typedAnswer.trim();
            correct = answer.toLowerCase() === q.correctAnswer.toLowerCase() || q.correctAnswer.toLowerCase().includes(answer.toLowerCase());
        }
        const updated = [
            ...questions
        ];
        updated[currentIdx] = {
            ...updated[currentIdx],
            userAnswer: answer,
            isCorrect: correct,
            timeSpent: questionTimer
        };
        setQuestions(updated);
        // Record to API
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: q.cardId,
                quality: correct ? 4 : 1
            })
        }).catch(()=>{});
        // Next question or finish
        if (currentIdx + 1 >= questions.length) {
            stopTimers();
            setPhase('results');
        } else {
            setCurrentIdx((prev)=>prev + 1);
            setSelectedOption(null);
            setTypedAnswer('');
            setQuestionTimer(0);
            // Restart question timer
            if (qTimerRef.current) clearInterval(qTimerRef.current);
            qTimerRef.current = setInterval(()=>setQuestionTimer((t)=>t + 1), 1000);
        }
    }, [
        questions,
        currentIdx,
        selectedOption,
        typedAnswer,
        questionTimer,
        stopTimers
    ]);
    // Cleanup
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>stopTimers();
    }, [
        stopTimers
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setPhase('setup');
        setQuestions([]);
        setCurrentIdx(0);
        setTimer(0);
        setSelectedOption(null);
        setTypedAnswer('');
    }, []);
    /* ─── Setup Phase ─── */ if (phase === 'setup') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TestSetup, {
            cards: cards,
            onStart: handleStartTest,
            onBack: onBack
        });
    }
    /* ─── Results Phase ─── */ if (phase === 'results') {
        const correctCount = questions.filter((q)=>q.isCorrect).length;
        const totalQuestions = questions.length;
        const scorePercent = Math.round(correctCount / totalQuestions * 100);
        const avgTime = Math.round(questions.reduce((s, q)=>s + q.timeSpent, 0) / totalQuestions);
        const gradeLabel = scorePercent >= 90 ? 'Outstanding' : scorePercent >= 75 ? 'Good' : scorePercent >= 60 ? 'Passing' : 'Needs Work';
        const gradeColor = scorePercent >= 90 ? C.green : scorePercent >= 75 ? C.cyan : scorePercent >= 60 ? C.amber : C.danger;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative w-28 h-28 mx-auto mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                        className: "w-full h-full -rotate-90",
                                        viewBox: "0 0 100 100",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "42",
                                                fill: "none",
                                                stroke: `${C.dimmed}20`,
                                                strokeWidth: "6"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "42",
                                                fill: "none",
                                                stroke: gradeColor,
                                                strokeWidth: "6",
                                                strokeDasharray: `${scorePercent / 100 * 264} 264`,
                                                strokeLinecap: "round",
                                                style: {
                                                    transition: 'stroke-dasharray 1s ease'
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "absolute inset-0 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-2xl font-black",
                                                style: {
                                                    color: gradeColor
                                                },
                                                children: [
                                                    scorePercent,
                                                    "%"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[8px] uppercase tracking-wider",
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Score"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold mb-1",
                                style: {
                                    color: C.text
                                },
                                children: gradeLabel
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-sm",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    correctCount,
                                    "/",
                                    totalQuestions,
                                    " correct \xb7 ",
                                    formatTime(timer),
                                    " total"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.green
                                        },
                                        children: correctCount
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Correct"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: totalQuestions - correctCount
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Incorrect"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: [
                                            avgTime,
                                            "s"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Avg/Q"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                className: "text-xs font-bold mb-3 flex items-center gap-2",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    "Answer Review"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: questions.map((q, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "p-3 rounded-xl border",
                                        style: {
                                            background: q.isCorrect ? `${C.green}04` : `${C.danger}04`,
                                            borderColor: q.isCorrect ? `${C.green}15` : `${C.danger}15`
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold",
                                                    style: {
                                                        background: q.isCorrect ? `${C.green}15` : `${C.danger}15`,
                                                        color: q.isCorrect ? C.green : C.danger
                                                    },
                                                    children: idx + 1
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[11px] font-semibold mb-1 line-clamp-2",
                                                            style: {
                                                                color: C.text
                                                            },
                                                            children: q.questionText.length > 80 ? q.questionText.slice(0, 78) + '...' : q.questionText
                                                        }),
                                                        !q.isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-[10px]",
                                                                    style: {
                                                                        color: C.danger
                                                                    },
                                                                    children: [
                                                                        "Your answer: ",
                                                                        q.userAnswer || '(none)'
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-[10px]",
                                                                    style: {
                                                                        color: C.green
                                                                    },
                                                                    children: [
                                                                        "Correct: ",
                                                                        q.correctAnswer
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        q.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] mt-1 line-clamp-2",
                                                            style: {
                                                                color: C.dimmed
                                                            },
                                                            children: q.explanation
                                                        })
                                                    ]
                                                }),
                                                q.isCorrect ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 flex-shrink-0",
                                                    style: {
                                                        color: C.green
                                                    }
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 flex-shrink-0",
                                                    style: {
                                                        color: C.danger
                                                    }
                                                })
                                            ]
                                        })
                                    }, idx))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " New Test"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    /* ─── Testing Phase ─── */ const currentQ = questions[currentIdx];
    if (!currentQ) return null;
    const canSubmit = currentQ.questionType === 'written' ? typedAnswer.trim().length > 0 : selectedOption !== null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-sm font-bold",
                                    style: {
                                        color: C.text
                                    },
                                    children: "Practice Test"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px]",
                                    style: {
                                        color: C.dimmed
                                    },
                                    children: [
                                        "Question ",
                                        currentIdx + 1,
                                        " of ",
                                        questions.length
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-2 py-0.5 rounded-full font-bold",
                                style: {
                                    background: currentQ.questionType === 'mcq' ? `${C.cyan}12` : currentQ.questionType === 'tf' ? `${C.amber}12` : `${C.purple}12`,
                                    color: currentQ.questionType === 'mcq' ? C.cyan : currentQ.questionType === 'tf' ? C.amber : C.purple
                                },
                                children: currentQ.questionType === 'mcq' ? 'MCQ' : currentQ.questionType === 'tf' ? 'T/F' : 'Written'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-mono font-bold",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(timer)
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1 bg-white/[0.04] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-300",
                            style: {
                                width: `${currentIdx / questions.length * 100}%`,
                                background: C.cyan
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex justify-between mt-1",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex gap-1",
                            children: questions.map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-2 h-2 rounded-full",
                                    style: {
                                        background: i < currentIdx ? questions[i]?.isCorrect ? C.green : C.danger : i === currentIdx ? C.cyan : `${C.dimmed}30`
                                    }
                                }, i))
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "p-5 rounded-2xl border mb-5",
                            style: {
                                background: `${C.cyan}04`,
                                borderColor: `${C.cyan}15`
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                                        style: {
                                            background: `${C.cyan}15`,
                                            color: C.cyan
                                        },
                                        children: currentIdx + 1
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm leading-relaxed",
                                        style: {
                                            color: C.text
                                        },
                                        children: currentQ.questionText
                                    })
                                ]
                            })
                        }),
                        (currentQ.questionType === 'mcq' || currentQ.questionType === 'tf') && currentQ.options && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2 mb-5",
                            children: currentQ.options.map((option, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setSelectedOption(idx),
                                    className: "w-full text-left p-3.5 rounded-xl border transition-all",
                                    style: {
                                        background: selectedOption === idx ? `${C.cyan}08` : 'rgba(255,255,255,0.01)',
                                        borderColor: selectedOption === idx ? `${C.cyan}30` : C.cardBorder,
                                        cursor: 'pointer'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold",
                                                style: {
                                                    background: selectedOption === idx ? `${C.cyan}20` : 'rgba(255,255,255,0.03)',
                                                    color: selectedOption === idx ? C.cyan : C.muted,
                                                    border: `1px solid ${selectedOption === idx ? `${C.cyan}40` : 'transparent'}`
                                                },
                                                children: currentQ.questionType === 'tf' ? idx === 0 ? 'T' : 'F' : String.fromCharCode(65 + idx)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[12px] leading-relaxed flex-1",
                                                style: {
                                                    color: selectedOption === idx ? C.text : C.muted
                                                },
                                                children: option
                                            })
                                        ]
                                    })
                                }, idx))
                        }),
                        currentQ.questionType === 'written' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mb-5",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                value: typedAnswer,
                                onChange: (e)=>setTypedAnswer(e.target.value),
                                placeholder: "Type your answer...",
                                className: "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors min-h-[100px] resize-y",
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: C.cardBorder,
                                    color: C.text
                                },
                                autoFocus: true
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: handleSubmitAnswer,
                            disabled: !canSubmit,
                            className: "w-full py-3 rounded-xl text-sm font-bold transition-all",
                            style: {
                                background: canSubmit ? C.cyan : `${C.dimmed}30`,
                                color: canSubmit ? C.bg : C.dimmed,
                                cursor: canSubmit ? 'pointer' : 'not-allowed'
                            },
                            children: [
                                currentIdx + 1 >= questions.length ? 'Finish Test' : 'Next Question',
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-4 h-4 inline ml-1"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


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

/***/ 774789:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bookmark)
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
    name: "bookmark",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
                key: "oz39mx"
            }
        ]
    ]
};
__iconData.node;
const Bookmark = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=bookmark.mjs.map


/***/ }),

/***/ 781630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 792470:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 57359));


/***/ }),

/***/ 813102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ useRegisterFieldControl)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(925685);
/* harmony import */ var _field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389983);
/* __next_internal_client_entry_do_not_use__ useRegisterFieldControl auto */ 


function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
    const { registerFieldControl } = (0,_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useFieldRootContext */ .V$)();
    const sourceRef = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__/* .useRefWithInit */ .j)(()=>Symbol());
    // Re-register without unregistering first: re-registration with the same id updates the
    // form's fields Map entry in place, while a delete + re-add would move the field to the
    // end of the Map every time its value changes.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const source = sourceRef.current;
        if (!enabled) {
            registerFieldControl(source, undefined);
            return;
        }
        const registration = {
            controlRef,
            getValue: getFormValueOverride,
            id,
            name,
            value
        };
        registerFieldControl(source, registration);
    }, [
        controlRef,
        enabled,
        getFormValueOverride,
        id,
        name,
        registerFieldControl,
        sourceRef,
        value
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const source = sourceRef.current;
        return ()=>{
            registerFieldControl(source, undefined);
        };
    }, [
        registerFieldControl,
        sourceRef
    ]);
}


/***/ }),

/***/ 819120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LearnMode)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(190498);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(541290);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(304870);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(504635);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(472597);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(133204);
/* __next_internal_client_entry_do_not_use__ default auto */ 



/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
const MASTERY_LABELS = {
    0: {
        label: 'Unseen',
        color: C.dimmed
    },
    1: {
        label: 'New',
        color: C.danger
    },
    2: {
        label: 'Learning',
        color: C.amber
    },
    3: {
        label: 'Reviewing',
        color: C.cyan
    },
    4: {
        label: 'Mastered',
        color: C.green
    }
};
/* ─── Progress Ring SVG ─── */ function ProgressRing({ progress, size = 48, strokeWidth = 4 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - progress / 100 * circumference;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: size,
        height: size,
        className: "-rotate-90",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: `${C.dimmed}20`,
                strokeWidth: strokeWidth
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: progress >= 80 ? C.green : progress >= 50 ? C.cyan : C.amber,
                strokeWidth: strokeWidth,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                strokeLinecap: "round",
                style: {
                    transition: 'stroke-dashoffset 0.5s ease'
                }
            })
        ]
    });
}
/* ─── Main LearnMode Component ─── */ function LearnMode({ cards, onBack }) {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$)();
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('mcq');
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [typedAnswer, setTypedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [showResult, setShowResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isCorrect, setIsCorrect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sessionComplete, setSessionComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sessionStats, setSessionStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        correct: 0,
        incorrect: 0,
        total: 0
    });
    const currentCard = cards[currentIndex];
    const totalCards = cards.length;
    // Determine phase based on mastery level
    const masteryLevel = currentCard ? store.mastery[currentCard.id]?.level || 0 : 0;
    const effectivePhase = masteryLevel >= 2 ? 'typed' : 'mcq';
    // Generate MCQ options (shuffle correct + distractors)
    const mcqOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!currentCard || effectivePhase !== 'mcq') return [];
        const correctAnswer = currentCard.answer;
        const distractors = cards.filter((c)=>c.id !== currentCard.id).map((c)=>c.answer).slice(0, 3);
        const options = [
            correctAnswer,
            ...distractors
        ];
        // Shuffle
        for(let i = options.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [
                options[j],
                options[i]
            ];
        }
        return options;
    }, [
        currentCard,
        cards,
        effectivePhase
    ]);
    const handleMCQSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (selectedOption === null || !currentCard) return;
        const selected = mcqOptions[selectedOption];
        const correct = selected === currentCard.answer;
        setIsCorrect(correct);
        setShowResult(true);
        setSessionStats((prev)=>({
                correct: prev.correct + (correct ? 1 : 0),
                incorrect: prev.incorrect + (correct ? 0 : 1),
                total: prev.total + 1
            }));
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().updateMastery(currentCard.id, correct);
        // Record to flashcard progress API
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: currentCard.id,
                quality: correct ? 4 : 0
            })
        }).catch(()=>{});
    }, [
        selectedOption,
        mcqOptions,
        currentCard
    ]);
    const handleTypedSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!typedAnswer.trim() || !currentCard) return;
        const correct = typedAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase() || currentCard.answer.trim().toLowerCase().includes(typedAnswer.trim().toLowerCase());
        setIsCorrect(correct);
        setShowResult(true);
        setSessionStats((prev)=>({
                correct: prev.correct + (correct ? 1 : 0),
                incorrect: prev.incorrect + (correct ? 0 : 1),
                total: prev.total + 1
            }));
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().updateMastery(currentCard.id, correct);
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: currentCard.id,
                quality: correct ? 5 : 1
            })
        }).catch(()=>{});
    }, [
        typedAnswer,
        currentCard
    ]);
    const handleNext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex >= totalCards - 1) {
            setSessionComplete(true);
            return;
        }
        setCurrentIndex((prev)=>prev + 1);
        setSelectedOption(null);
        setTypedAnswer('');
        setShowResult(false);
    }, [
        currentIndex,
        totalCards
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setCurrentIndex(0);
        setSelectedOption(null);
        setTypedAnswer('');
        setShowResult(false);
        setSessionComplete(false);
        setSessionStats({
            correct: 0,
            incorrect: 0,
            total: 0
        });
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().resetLearn();
    }, []);
    // Compute mastery stats
    const masteryStats = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const levels = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
        cards.forEach((card)=>{
            const level = store.mastery[card.id]?.level || 0;
            levels[level]++;
        });
        return levels;
    }, [
        cards,
        store.mastery
    ]);
    const masteredCount = masteryStats[4];
    const masterProgress = totalCards > 0 ? masteredCount / totalCards * 100 : 0;
    const accuracy = sessionStats.total > 0 ? Math.round(sessionStats.correct / sessionStats.total * 100) : 0;
    /* ─── Session Complete ─── */ if (sessionComplete) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center",
                        style: {
                            background: `${C.green}10`
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            className: "w-10 h-10",
                            style: {
                                color: C.green
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-2xl font-bold mb-2",
                        style: {
                            color: C.text
                        },
                        children: "Learn Session Complete!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm mb-6",
                        style: {
                            color: C.muted
                        },
                        children: [
                            "You reviewed ",
                            totalCards,
                            " cards"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.green
                                        },
                                        children: sessionStats.correct
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Correct"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: sessionStats.incorrect
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Incorrect"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: [
                                            accuracy,
                                            "%"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Accuracy"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 rounded-xl border text-left mb-6",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs font-bold mb-3 flex items-center gap-2",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    "Mastery Breakdown"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: [
                                    4,
                                    3,
                                    2,
                                    1,
                                    0
                                ].map((level)=>{
                                    const info = MASTERY_LABELS[level];
                                    const count = masteryStats[level];
                                    if (count === 0) return null;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-2 h-2 rounded-full",
                                                        style: {
                                                            background: info.color
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[11px]",
                                                        style: {
                                                            color: C.muted
                                                        },
                                                        children: info.label
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[11px] font-bold",
                                                style: {
                                                    color: info.color
                                                },
                                                children: count
                                            })
                                        ]
                                    }, level);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Learn Again"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    if (!currentCard) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 flex items-center justify-center",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                style: {
                    color: C.muted
                },
                children: "No cards available for learning"
            })
        });
    }
    /* ─── Active Learning View ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onBack,
                                className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                                style: {
                                    color: C.muted
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-sm font-bold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Learn Mode"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Adaptive learning"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: `${MASTERY_LABELS[masteryLevel].color}08`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: MASTERY_LABELS[masteryLevel].color
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] font-bold",
                                        style: {
                                            color: MASTERY_LABELS[masteryLevel].color
                                        },
                                        children: MASTERY_LABELS[masteryLevel].label
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C.green
                                        },
                                        children: [
                                            sessionStats.correct,
                                            "/",
                                            sessionStats.total
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProgressRing, {
                                    progress: masterProgress,
                                    size: 40,
                                    strokeWidth: 3
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "absolute inset-0 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-bold",
                                        style: {
                                            color: C.green
                                        },
                                        children: masteredCount
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: C.muted
                                            },
                                            children: [
                                                "Card ",
                                                currentIndex + 1,
                                                " of ",
                                                totalCards
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: C.muted
                                            },
                                            children: [
                                                masteredCount,
                                                "/",
                                                totalCards,
                                                " mastered"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "h-full rounded-full transition-all duration-500",
                                        style: {
                                            width: `${(currentIndex + 1) / totalCards * 100}%`,
                                            background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`
                                        }
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "p-5 rounded-2xl border mb-5",
                            style: {
                                background: `${C.cyan}04`,
                                borderColor: `${C.cyan}15`
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-4 h-4 flex-shrink-0 mt-0.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] uppercase tracking-wider font-semibold mb-2",
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: effectivePhase === 'mcq' ? 'Multiple Choice' : 'Type Your Answer'
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm leading-relaxed",
                                                style: {
                                                    color: C.text
                                                },
                                                children: currentCard.text
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-1 rounded-full",
                                    style: {
                                        background: effectivePhase === 'mcq' ? C.cyan : `${C.cyan}20`
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-1 rounded-full",
                                    style: {
                                        background: effectivePhase === 'typed' ? C.green : `${C.dimmed}20`
                                    }
                                })
                            ]
                        }),
                        effectivePhase === 'mcq' && !showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2 mb-5",
                            children: [
                                mcqOptions.map((option, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setSelectedOption(idx),
                                        className: "w-full text-left p-3.5 rounded-xl border transition-all",
                                        style: {
                                            background: selectedOption === idx ? `${C.cyan}08` : 'rgba(255,255,255,0.01)',
                                            borderColor: selectedOption === idx ? `${C.cyan}30` : C.cardBorder,
                                            cursor: 'pointer'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold",
                                                    style: {
                                                        background: selectedOption === idx ? `${C.cyan}20` : 'rgba(255,255,255,0.03)',
                                                        color: selectedOption === idx ? C.cyan : C.muted,
                                                        border: `1px solid ${selectedOption === idx ? `${C.cyan}40` : 'transparent'}`
                                                    },
                                                    children: String.fromCharCode(65 + idx)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[12px] leading-relaxed flex-1",
                                                    style: {
                                                        color: selectedOption === idx ? C.text : C.muted
                                                    },
                                                    children: option
                                                })
                                            ]
                                        })
                                    }, idx)),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleMCQSubmit,
                                    disabled: selectedOption === null,
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all mt-3",
                                    style: {
                                        background: selectedOption !== null ? C.cyan : `${C.dimmed}30`,
                                        color: selectedOption !== null ? C.bg : C.dimmed,
                                        cursor: selectedOption !== null ? 'pointer' : 'not-allowed'
                                    },
                                    children: "Check Answer"
                                })
                            ]
                        }),
                        effectivePhase === 'typed' && !showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: typedAnswer,
                                        onChange: (e)=>setTypedAnswer(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') handleTypedSubmit();
                                        },
                                        placeholder: "Type your answer...",
                                        className: "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: C.cardBorder,
                                            color: C.text
                                        },
                                        autoFocus: true
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleTypedSubmit,
                                    disabled: !typedAnswer.trim(),
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all mt-3",
                                    style: {
                                        background: typedAnswer.trim() ? C.green : `${C.dimmed}30`,
                                        color: typedAnswer.trim() ? C.bg : C.dimmed,
                                        cursor: typedAnswer.trim() ? 'pointer' : 'not-allowed'
                                    },
                                    children: "Submit Answer"
                                })
                            ]
                        }),
                        showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "animate-in fade-in slide-in-from-bottom-2 duration-300",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "p-4 rounded-xl border mb-4",
                                    style: {
                                        borderColor: `${isCorrect ? C.green : C.danger}30`,
                                        background: `${isCorrect ? C.green : C.danger}05`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                isCorrect ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "w-5 h-5",
                                                    style: {
                                                        color: C.green
                                                    }
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-5 h-5",
                                                    style: {
                                                        color: C.danger
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: isCorrect ? C.green : C.danger
                                                    },
                                                    children: isCorrect ? 'Correct!' : 'Not quite right'
                                                })
                                            ]
                                        }),
                                        !isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "p-3 rounded-lg mb-2",
                                            style: {
                                                background: `${C.green}08`,
                                                border: `1px solid ${C.green}20`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] uppercase tracking-wider font-semibold mb-1",
                                                    style: {
                                                        color: C.green
                                                    },
                                                    children: "Correct Answer"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm",
                                                    style: {
                                                        color: C.text
                                                    },
                                                    children: currentCard.answer
                                                })
                                            ]
                                        }),
                                        currentCard.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs leading-relaxed",
                                            style: {
                                                color: C.muted
                                            },
                                            children: currentCard.explanation
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-4 px-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5",
                                            style: {
                                                color: C.purple
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px] font-bold uppercase tracking-wider",
                                            style: {
                                                color: C.purple
                                            },
                                            children: [
                                                "Mastery: ",
                                                MASTERY_LABELS[_store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().mastery[currentCard.id]?.level || 0].label
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: handleNext,
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all",
                                    style: {
                                        background: `${C.cyan}15`,
                                        color: C.cyan,
                                        border: `1px solid ${C.cyan}25`
                                    },
                                    children: [
                                        currentIndex >= totalCards - 1 ? 'Finish Session' : 'Continue',
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-4 h-4 inline ml-2"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 839326:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 170729));


/***/ }),

/***/ 847310:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZV: () => (/* binding */ DEFAULT_VALIDITY_STATE),
/* harmony export */   dc: () => (/* binding */ fieldValidityMapping),
/* harmony export */   mk: () => (/* binding */ DEFAULT_FIELD_ROOT_STATE)
/* harmony export */ });
/* unused harmony export DEFAULT_FIELD_STATE_ATTRIBUTES */
/* harmony import */ var _field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(560336);

const DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
const DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
const DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
const fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .valid */ .rZ]: ''
      };
    }
    return {
      [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .invalid */ .Gq]: ''
    };
  }
};

/***/ }),

/***/ 902864:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var _base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(356479);
/* harmony import */ var _base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(350039);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(521654);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(665068);




const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_0__/* .cva */ .F)("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", render, ...props }) {
    return (0,_base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__/* .useRender */ .C)({
        defaultTagName: "span",
        props: (0,_base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__/* .mergeProps */ .v6)({
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
                variant
            }), className)
        }, props),
        render,
        state: {
            slot: "badge",
            variant
        }
    });
}



/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 925297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(615712);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(521654);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(114490);




const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__/* .cva */ .F)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ }),

/***/ 927910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 943014:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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
    ActionDidNotRevalidate: function() {
        return ActionDidNotRevalidate;
    },
    ActionDidRevalidateDynamicOnly: function() {
        return ActionDidRevalidateDynamicOnly;
    },
    ActionDidRevalidateStaticAndDynamic: function() {
        return ActionDidRevalidateStaticAndDynamic;
    }
});
const ActionDidNotRevalidate = 0;
const ActionDidRevalidateStaticAndDynamic = 1;
const ActionDidRevalidateDynamicOnly = 2; //# sourceMappingURL=action-revalidation-kind.js.map


/***/ }),

/***/ 979428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,4515,476,799,6655,7043,6455,2976,5068,9142,1068,5362,3396], () => (__webpack_exec__(202544)));
module.exports = __webpack_exports__;

})();