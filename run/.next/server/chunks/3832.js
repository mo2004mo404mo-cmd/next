"use strict";
exports.id = 3832;
exports.ids = [3832];
exports.modules = {

/***/ 300:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ 46303:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Settings2)
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

/***/ 133832:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MicroLessonCarousel: () => (/* binding */ MicroLessonCarousel),
/* harmony export */   "default": () => (/* binding */ MicroLessonsTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(576270);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(456052);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(190498);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(539737);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(574130);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(504635);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(472597);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(144730);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(849543);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(46303);
/* harmony import */ var _barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(120759);
/* harmony import */ var _micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(597982);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(148874);
/* __next_internal_client_entry_do_not_use__ MicroLessonCarousel,default auto */ 




// ─── Color Constants ─────────────────────────────────────────────────────────
const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardGlass: 'var(--medq-w-alpha-03, rgba(255,255,255,0.03))',
    input: 'var(--medq-surface, #1a1e2b)',
    green: 'var(--medq-accent-green, #00e5a0)',
    greenDark: 'var(--medq-accent-green, #00b87a)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    orange: 'var(--medq-accent-amber, #f59e0b)',
    orangeAccent: 'var(--medq-accent-amber, #ff6b35)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    cyan: 'var(--medq-accent-cyan, #4fc3f7)',
    teal: 'var(--medq-accent-cyan, #22d3ee)',
    blue: '#3b82f6',
    pink: '#ec4899',
    yellow: 'var(--medq-accent-amber, #ffb347)',
    lightGreen: 'var(--medq-accent-green, #4ade80)',
    text: 'var(--medq-text, #e8ecf4)',
    textSec: 'var(--medq-muted-2, #8b95a8)',
    textMuted: 'var(--medq-muted, #5a6478)',
    textDim: 'var(--medq-dimmed, #3a4055)',
    border: 'var(--medq-card-border, rgba(255,255,255,0.06))'
};
const SYSTEM_GRADIENTS = {
    Cardiovascular: {
        from: '#ff5757',
        to: '#f97316'
    },
    Respiratory: {
        from: '#3b82f6',
        to: '#22d3ee'
    },
    Neurological: {
        from: '#8b5cf6',
        to: '#ec4899'
    },
    Gastrointestinal: {
        from: '#f59e0b',
        to: '#ff6b35'
    },
    Renal: {
        from: '#22d3ee',
        to: '#4fc3f7'
    },
    Endocrine: {
        from: '#00e5a0',
        to: '#4ade80'
    },
    Hematologic: {
        from: '#ef4444',
        to: '#ff5757'
    },
    Musculoskeletal: {
        from: '#f97316',
        to: '#ffb347'
    },
    default: {
        from: '#8b5cf6',
        to: '#4fc3f7'
    }
};
// ─── MicroLessonCard with Flip Animation ─────────────────────────────────────
function MicroLessonCard({ lesson, onComplete, onEngage, isActive }) {
    const [flipped, setFlipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedAnswer, setSelectedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [answered, setAnswered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const gradient = SYSTEM_GRADIENTS[lesson.system] || SYSTEM_GRADIENTS.default;
    const handleFlip = ()=>{
        if (!flipped) onEngage('flip');
        setFlipped(!flipped);
    };
    const handleAnswer = (option)=>{
        if (answered) return;
        setSelectedAnswer(option);
        setAnswered(true);
        const correct = option === lesson.selfTest.answer;
        onComplete(lesson.id);
        onEngage('self_test_answer');
    };
    const diffColor = _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .DIFFICULTY_COLORS */ .Fc[lesson.difficulty] ?? C.yellow;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            width: '100%',
            perspective: '1200px',
            minHeight: 420
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `
        @keyframes mlCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ml-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .ml-flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .ml-flip-front, .ml-flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .ml-flip-back {
          transform: rotateY(180deg);
        }
      `
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ml-flip-inner",
                style: {
                    transform: flipped ? 'rotateY(180deg)' : 'none',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformStyle: 'preserve-3d'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-flip-front",
                        style: {
                            borderRadius: 16,
                            border: `1px solid ${C.border}`,
                            background: C.card,
                            overflow: 'hidden',
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    height: 4,
                                    background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    padding: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            padding: '2px 8px',
                                                            borderRadius: 8,
                                                            background: `${gradient.from}15`,
                                                            color: gradient.from,
                                                            fontWeight: 600
                                                        },
                                                        children: lesson.system
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            padding: '2px 6px',
                                                            borderRadius: 6,
                                                            background: `${diffColor}15`,
                                                            color: diffColor,
                                                            fontWeight: 600
                                                        },
                                                        children: [
                                                            lesson.difficulty,
                                                            "/5"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            lesson.completed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                size: 16,
                                                style: {
                                                    color: C.green
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                        size: 14,
                                                        style: {
                                                            color: C.yellow
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: C.yellow,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px'
                                                        },
                                                        children: "Key Fact"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                style: {
                                                    fontSize: 14,
                                                    color: C.text,
                                                    lineHeight: 1.6,
                                                    margin: 0
                                                },
                                                children: lesson.fact
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            padding: 12,
                                            borderRadius: 10,
                                            background: `${C.green}06`,
                                            border: `1px solid ${C.green}12`,
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                        size: 12,
                                                        style: {
                                                            color: C.green
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            fontWeight: 600,
                                                            color: C.green
                                                        },
                                                        children: "Clinical Relevance"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: C.textSec,
                                                    margin: 0,
                                                    lineHeight: 1.5
                                                },
                                                children: lesson.clinicalRelevance
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: handleFlip,
                                        style: {
                                            width: '100%',
                                            padding: '10px 16px',
                                            borderRadius: 10,
                                            border: `1px solid ${C.purple}25`,
                                            background: `${C.purple}08`,
                                            color: C.purple,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            transition: 'all 0.2s ease'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                size: 14
                                            }),
                                            "Test Yourself — Flip to Answer"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-flip-back",
                        style: {
                            borderRadius: 16,
                            border: `1px solid ${C.border}`,
                            background: C.card,
                            overflow: 'hidden',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    height: 4,
                                    background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    padding: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                size: 14,
                                                style: {
                                                    color: C.purple
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: C.purple
                                                },
                                                children: "Self-Test"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: handleFlip,
                                                style: {
                                                    marginLeft: 'auto',
                                                    padding: '2px 8px',
                                                    borderRadius: 6,
                                                    border: `1px solid ${C.border}`,
                                                    background: 'transparent',
                                                    color: C.textMuted,
                                                    fontSize: 10,
                                                    cursor: 'pointer'
                                                },
                                                children: "← Back"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        style: {
                                            fontSize: 13,
                                            color: C.text,
                                            lineHeight: 1.6,
                                            marginBottom: 14
                                        },
                                        children: lesson.selfTest.question
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 6,
                                            marginBottom: 14
                                        },
                                        children: lesson.selfTest.options.map((opt, i)=>{
                                            const isSelected = selectedAnswer === opt;
                                            const isCorrect = answered && opt === lesson.selfTest.answer;
                                            const isWrong = answered && isSelected && opt !== lesson.selfTest.answer;
                                            let bg = C.input;
                                            let border = C.border;
                                            let color = C.text;
                                            if (isCorrect) {
                                                bg = 'rgba(0,229,160,0.08)';
                                                border = 'rgba(0,229,160,0.25)';
                                                color = C.green;
                                            } else if (isWrong) {
                                                bg = 'rgba(255,87,87,0.08)';
                                                border = 'rgba(255,87,87,0.25)';
                                                color = C.danger;
                                            } else if (!answered) {
                                                bg = C.input;
                                                border = C.border;
                                                color = C.text;
                                            }
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>handleAnswer(opt),
                                                disabled: answered,
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    padding: '10px 12px',
                                                    borderRadius: 8,
                                                    border: `1px solid ${border}`,
                                                    background: bg,
                                                    color,
                                                    fontSize: 12,
                                                    cursor: answered ? 'default' : 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'all 0.2s ease',
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 6,
                                                            background: isCorrect ? `${C.green}15` : isWrong ? `${C.danger}15` : `${C.textDim}15`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                            color: isCorrect ? C.green : isWrong ? C.danger : C.textMuted
                                                        },
                                                        children: isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + i)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: opt
                                                    })
                                                ]
                                            }, i);
                                        })
                                    }),
                                    answered && lesson.selfTest.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            padding: 10,
                                            borderRadius: 8,
                                            background: selectedAnswer === lesson.selfTest.answer ? 'rgba(0,229,160,0.06)' : 'rgba(255,87,87,0.06)',
                                            border: `1px solid ${selectedAnswer === lesson.selfTest.answer ? 'rgba(0,229,160,0.15)' : 'rgba(255,87,87,0.15)'}`,
                                            marginBottom: 12
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            style: {
                                                fontSize: 12,
                                                color: C.textSec,
                                                margin: 0,
                                                lineHeight: 1.5
                                            },
                                            children: lesson.selfTest.explanation
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            padding: '8px 12px',
                                            borderRadius: 8,
                                            background: C.input,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8
                                        },
                                        children: [
                                            lesson.relatedContent.type === 'flashcard' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                size: 12,
                                                style: {
                                                    color: C.cyan
                                                }
                                            }) : lesson.relatedContent.type === 'question' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                size: 12,
                                                style: {
                                                    color: C.blue
                                                }
                                            }) : lesson.relatedContent.type === 'case' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                size: 12,
                                                style: {
                                                    color: C.teal
                                                }
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                size: 12,
                                                style: {
                                                    color: C.purple
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 11,
                                                    color: C.textSec,
                                                    flex: 1
                                                },
                                                children: lesson.relatedContent.title
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                size: 10,
                                                style: {
                                                    color: C.textDim
                                                }
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
// ─── Streak Badge ────────────────────────────────────────────────────────────
function StreakBadge() {
    const currentStreak = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.currentStreak);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 12,
            background: currentStreak > 0 ? `linear-gradient(135deg, ${C.orangeAccent}12, ${C.orange}12)` : C.input,
            border: `1px solid ${currentStreak > 0 ? `${C.orangeAccent}25` : C.border}`
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                size: 18,
                style: {
                    color: currentStreak > 0 ? C.orangeAccent : C.textDim,
                    animation: currentStreak > 0 ? 'mlStreakPulse 1.5s ease-in-out infinite' : 'none'
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            fontSize: 16,
                            fontWeight: 800,
                            color: currentStreak > 0 ? C.orangeAccent : C.textDim
                        },
                        children: currentStreak
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            fontSize: 11,
                            color: C.textMuted,
                            marginLeft: 4
                        },
                        children: "day streak"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `
        @keyframes mlStreakPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `
            })
        ]
    });
}
// ─── Calendar View ───────────────────────────────────────────────────────────
function MicroLessonCalendar() {
    const dayStreaks = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.dayStreaks);
    const getLessonsForDate = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.getLessonsForDate);
    const selectedCalendarDate = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.selectedCalendarDate);
    const setSelectedCalendarDate = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.setSelectedCalendarDate);
    const [viewMonth, setViewMonth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>new Date().getMonth());
    const [viewYear, setViewYear] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>new Date().getFullYear());
    const streakMap = {};
    for (const ds of dayStreaks){
        streakMap[ds.date] = {
            lessonsCompleted: ds.lessonsCompleted,
            totalLessons: ds.totalLessons,
            allCompleted: ds.allCompleted
        };
    }
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
    const today = new Date().toISOString().split('T')[0];
    const monthName = new Date(viewYear, viewMonth).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    const days = [];
    for(let i = 0; i < firstDayOfWeek; i++)days.push(null);
    for(let d = 1; d <= daysInMonth; d++)days.push(d);
    const selectedLessons = selectedCalendarDate ? getLessonsForDate(selectedCalendarDate) : [];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            background: C.card,
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${C.border}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.cyan
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: C.text
                                },
                                children: "Lesson History"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    if (viewMonth === 0) {
                                        setViewMonth(11);
                                        setViewYear(viewYear - 1);
                                    } else setViewMonth(viewMonth - 1);
                                },
                                style: {
                                    padding: 4,
                                    borderRadius: 6,
                                    border: 'none',
                                    background: C.input,
                                    color: C.textSec,
                                    cursor: 'pointer'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    size: 14
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: C.text,
                                    minWidth: 120,
                                    textAlign: 'center'
                                },
                                children: monthName
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    if (viewMonth === 11) {
                                        setViewMonth(0);
                                        setViewYear(viewYear + 1);
                                    } else setViewMonth(viewMonth + 1);
                                },
                                style: {
                                    padding: 4,
                                    borderRadius: 6,
                                    border: 'none',
                                    background: C.input,
                                    color: C.textSec,
                                    cursor: 'pointer'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                    size: 14
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: 2,
                            marginBottom: 4
                        },
                        children: [
                            'Su',
                            'Mo',
                            'Tu',
                            'We',
                            'Th',
                            'Fr',
                            'Sa'
                        ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    textAlign: 'center',
                                    fontSize: 10,
                                    color: C.textMuted,
                                    fontWeight: 600,
                                    padding: 4
                                },
                                children: d
                            }, d))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: 2
                        },
                        children: days.map((day, i)=>{
                            if (day === null) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {}, `e-${i}`);
                            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const ds = streakMap[dateStr];
                            const isToday = dateStr === today;
                            const isSelected = dateStr === selectedCalendarDate;
                            let bg = 'transparent';
                            let dotColor = 'transparent';
                            if (ds) {
                                if (ds.allCompleted) {
                                    bg = 'rgba(0,229,160,0.12)';
                                    dotColor = C.green;
                                } else if (ds.lessonsCompleted > 0) {
                                    bg = 'rgba(0,229,160,0.06)';
                                    dotColor = C.yellow;
                                }
                            }
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setSelectedCalendarDate(isSelected ? null : dateStr),
                                style: {
                                    width: '100%',
                                    aspectRatio: '1',
                                    borderRadius: 8,
                                    border: isSelected ? `2px solid ${C.green}` : isToday ? `1px solid ${C.green}40` : '1px solid transparent',
                                    background: bg,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            fontSize: 11,
                                            color: isToday ? C.green : ds ? C.text : C.textDim,
                                            fontWeight: isToday ? 700 : 400
                                        },
                                        children: day
                                    }),
                                    ds && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            width: 4,
                                            height: 4,
                                            borderRadius: '50%',
                                            background: dotColor
                                        }
                                    })
                                ]
                            }, dateStr);
                        })
                    }),
                    selectedCalendarDate && selectedLessons.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            marginTop: 12,
                            padding: 12,
                            borderRadius: 10,
                            background: C.input,
                            border: `1px solid ${C.border}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: C.textSec
                                },
                                children: [
                                    selectedCalendarDate,
                                    " — ",
                                    selectedLessons.length,
                                    " lessons"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    marginTop: 8
                                },
                                children: selectedLessons.map((l, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '4px 0'
                                        },
                                        children: [
                                            l.completed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                size: 10,
                                                style: {
                                                    color: C.green
                                                }
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    border: `1px solid ${C.textDim}`
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    fontSize: 11,
                                                    color: C.textSec,
                                                    flex: 1,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: [
                                                    l.fact.slice(0, 60),
                                                    "..."
                                                ]
                                            })
                                        ]
                                    }, i))
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
// ─── MicroLessonCarousel (Swipeable) ─────────────────────────────────────────
function MicroLessonCarousel({ onNavigateToTab }) {
    const todayLessons = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.todayLessons);
    const loading = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.loading);
    const error = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.error);
    const currentStreak = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.currentStreak);
    const currentCardIndex = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.currentCardIndex);
    const setCurrentCardIndex = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.setCurrentCardIndex);
    const markLessonCompleted = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.markLessonCompleted);
    const answerSelfTest = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.answerSelfTest);
    const logEngagement = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.logEngagement);
    const generateLessons = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.generateLessons);
    // Touch/drag state for swipe
    const [touchStart, setTouchStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [touchDelta, setTouchDelta] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Generate on mount if needed
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (todayLessons.length === 0 && !loading) {
            generateLessons();
        }
    }, []);
    const handleEngage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((action)=>{
        const lesson = todayLessons[currentCardIndex];
        if (lesson) {
            logEngagement({
                lessonId: lesson.id,
                timestamp: Date.now(),
                action: action
            });
        }
    }, [
        todayLessons,
        currentCardIndex,
        logEngagement
    ]);
    const handleComplete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        markLessonCompleted(id);
    }, [
        markLessonCompleted
    ]);
    // Swipe handlers
    const handleTouchStart = (e)=>{
        setTouchStart(e.touches[0].clientX);
    };
    const handleTouchMove = (e)=>{
        if (touchStart === null) return;
        setTouchDelta(e.touches[0].clientX - touchStart);
    };
    const handleTouchEnd = ()=>{
        if (Math.abs(touchDelta) > 60) {
            if (touchDelta < 0 && currentCardIndex < todayLessons.length - 1) {
                setCurrentCardIndex(currentCardIndex + 1);
            } else if (touchDelta > 0 && currentCardIndex > 0) {
                setCurrentCardIndex(currentCardIndex - 1);
            }
        }
        setTouchStart(null);
        setTouchDelta(0);
    };
    const navigateCard = (dir)=>{
        if (dir === 'prev' && currentCardIndex > 0) setCurrentCardIndex(currentCardIndex - 1);
        if (dir === 'next' && currentCardIndex < todayLessons.length - 1) setCurrentCardIndex(currentCardIndex + 1);
    };
    const completedCount = todayLessons.filter((l)=>l.completed).length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            background: C.card,
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `
        @keyframes mlSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${C.border}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.purple
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: C.text
                                },
                                children: "Daily Micro-Lessons"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 9,
                                    padding: '2px 6px',
                                    borderRadius: 8,
                                    background: `${C.purple}15`,
                                    color: C.purple,
                                    fontWeight: 700
                                },
                                children: "NEW"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StreakBadge, {})
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: 16
                },
                children: [
                    loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 12,
                            padding: '40px 0'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    width: 32,
                                    height: 32,
                                    border: `3px solid ${C.purple}25`,
                                    borderTopColor: C.purple,
                                    borderRadius: '50%',
                                    animation: 'mlSpin 0.8s linear infinite'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 12,
                                    color: C.textMuted
                                },
                                children: "Generating today's lessons..."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                                children: `@keyframes mlSpin { to { transform: rotate(360deg); } }`
                            })
                        ]
                    }),
                    error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            padding: 16,
                            borderRadius: 10,
                            background: 'rgba(255,87,87,0.06)',
                            border: '1px solid rgba(255,87,87,0.15)',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                style: {
                                    fontSize: 12,
                                    color: C.danger,
                                    margin: '0 0 8px'
                                },
                                children: error
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>generateLessons(),
                                style: {
                                    padding: '6px 14px',
                                    borderRadius: 8,
                                    border: `1px solid ${C.danger}30`,
                                    background: 'transparent',
                                    color: C.danger,
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    margin: '0 auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                        size: 10
                                    }),
                                    " Retry"
                                ]
                            })
                        ]
                    }),
                    !loading && !error && todayLessons.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            textAlign: 'center',
                            padding: '32px 0'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                size: 32,
                                style: {
                                    color: C.textDim,
                                    marginBottom: 8
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                style: {
                                    fontSize: 13,
                                    color: C.textSec
                                },
                                children: "No lessons yet today"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>generateLessons(),
                                style: {
                                    marginTop: 8,
                                    padding: '8px 16px',
                                    borderRadius: 10,
                                    border: 'none',
                                    background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`,
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                },
                                children: "Generate Today's Lessons"
                            })
                        ]
                    }),
                    !loading && todayLessons.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                ref: containerRef,
                                onTouchStart: handleTouchStart,
                                onTouchMove: handleTouchMove,
                                onTouchEnd: handleTouchEnd,
                                style: {
                                    overflow: 'hidden',
                                    position: 'relative',
                                    touchAction: 'pan-y'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        display: 'flex',
                                        transition: touchStart !== null ? 'none' : 'transform 0.3s ease',
                                        transform: `translateX(${-currentCardIndex * 100 + (touchStart !== null ? touchDelta * 0.3 : 0)}%)`
                                    },
                                    children: todayLessons.map((lesson, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                minWidth: '100%',
                                                padding: '0 2px'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MicroLessonCard, {
                                                lesson: lesson,
                                                onComplete: handleComplete,
                                                onEngage: handleEngage,
                                                isActive: i === currentCardIndex
                                            })
                                        }, lesson.id))
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>navigateCard('prev'),
                                        disabled: currentCardIndex === 0,
                                        "aria-label": "Previous lesson card",
                                        style: {
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            border: `1px solid ${currentCardIndex > 0 ? C.border : 'transparent'}`,
                                            background: currentCardIndex > 0 ? C.input : 'transparent',
                                            color: currentCardIndex > 0 ? C.textSec : C.textDim,
                                            cursor: currentCardIndex > 0 ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            size: 16,
                                            "aria-hidden": "true"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            flex: 1,
                                            justifyContent: 'center'
                                        },
                                        children: todayLessons.map((lesson, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setCurrentCardIndex(i),
                                                "aria-label": `Go to lesson ${i + 1}${lesson.completed ? ' (completed)' : ''}`,
                                                "aria-current": i === currentCardIndex ? 'true' : undefined,
                                                style: {
                                                    width: i === currentCardIndex ? 24 : 8,
                                                    height: 8,
                                                    borderRadius: 4,
                                                    background: lesson.completed ? C.green : i === currentCardIndex ? C.purple : C.textDim + '40',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }, lesson.id))
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>navigateCard('next'),
                                        disabled: currentCardIndex === todayLessons.length - 1,
                                        "aria-label": "Next lesson card",
                                        style: {
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            border: `1px solid ${currentCardIndex < todayLessons.length - 1 ? C.border : 'transparent'}`,
                                            background: currentCardIndex < todayLessons.length - 1 ? C.input : 'transparent',
                                            color: currentCardIndex < todayLessons.length - 1 ? C.textSec : C.textDim,
                                            cursor: currentCardIndex < todayLessons.length - 1 ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            size: 16
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    marginTop: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            flex: 1,
                                            height: 4,
                                            borderRadius: 2,
                                            background: C.textDim + '20'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                width: `${completedCount / todayLessons.length * 100}%`,
                                                height: '100%',
                                                borderRadius: 2,
                                                background: C.green,
                                                transition: 'width 0.5s ease'
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            fontSize: 10,
                                            color: C.textMuted
                                        },
                                        children: [
                                            completedCount,
                                            "/",
                                            todayLessons.length
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function MicroLessonsTab({ onNavigateToTab }) {
    const currentStreak = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.currentStreak);
    const longestStreak = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.longestStreak);
    const todayLessons = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.todayLessons);
    const preferences = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.preferences);
    const updatePreferences = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.updatePreferences);
    const getWeeklyEngagement = (0,_micro_lessons_store__WEBPACK_IMPORTED_MODULE_2__/* .useMicroLessonStore */ .f)((s)=>s.getWeeklyEngagement);
    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const weekly = getWeeklyEngagement();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            padding: 24,
            maxWidth: 800,
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                        size: 28,
                                        style: {
                                            color: C.purple
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                        style: {
                                            color: C.text,
                                            fontSize: 22,
                                            fontWeight: 700,
                                            margin: 0
                                        },
                                        children: "Micro-Lessons"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                style: {
                                    color: C.textSec,
                                    fontSize: 13,
                                    margin: 0
                                },
                                children: "Daily bite-sized lessons personalized for you"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StreakBadge, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setShowSettings(!showSettings),
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    border: `1px solid ${C.border}`,
                                    background: showSettings ? `${C.purple}12` : C.card,
                                    color: showSettings ? C.purple : C.textMuted,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    size: 16
                                })
                            })
                        ]
                    })
                ]
            }),
            showSettings && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    background: C.card,
                    borderRadius: 16,
                    border: `1px solid ${C.border}`,
                    padding: 20,
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.purple
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: C.text
                                },
                                children: "Preferences"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        style: {
                                            fontSize: 11,
                                            color: C.textMuted,
                                            fontWeight: 600,
                                            display: 'block',
                                            marginBottom: 6
                                        },
                                        children: "Daily Lesson Count"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 6
                                        },
                                        children: [
                                            3,
                                            4,
                                            5
                                        ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>updatePreferences({
                                                        dailyCount: n
                                                    }),
                                                style: {
                                                    padding: '6px 14px',
                                                    borderRadius: 8,
                                                    border: preferences.dailyCount === n ? `1px solid ${C.purple}40` : `1px solid ${C.border}`,
                                                    background: preferences.dailyCount === n ? `${C.purple}12` : C.input,
                                                    color: preferences.dailyCount === n ? C.purple : C.textMuted,
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                },
                                                children: n
                                            }, n))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        style: {
                                            fontSize: 11,
                                            color: C.textMuted,
                                            fontWeight: 600,
                                            display: 'block',
                                            marginBottom: 6
                                        },
                                        children: "Notification Time"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 4
                                        },
                                        children: [
                                            'morning',
                                            'afternoon',
                                            'evening',
                                            'night'
                                        ].map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>updatePreferences({
                                                        preferredNotificationTime: t
                                                    }),
                                                style: {
                                                    padding: '5px 8px',
                                                    borderRadius: 6,
                                                    border: preferences.preferredNotificationTime === t ? `1px solid ${C.cyan}30` : `1px solid ${C.border}`,
                                                    background: preferences.preferredNotificationTime === t ? `${C.cyan}10` : C.input,
                                                    color: preferences.preferredNotificationTime === t ? C.cyan : C.textMuted,
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize'
                                                },
                                                children: t.slice(0, 3)
                                            }, t))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    gridColumn: '1 / -1',
                                    display: 'flex',
                                    gap: 12
                                },
                                children: [
                                    {
                                        key: 'includeWeakAreas',
                                        label: 'Weak Areas',
                                        color: C.danger
                                    },
                                    {
                                        key: 'includeTrending',
                                        label: 'Trending',
                                        color: C.orange
                                    },
                                    {
                                        key: 'includeReview',
                                        label: 'Review',
                                        color: C.green
                                    }
                                ].map(({ key, label, color })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>updatePreferences({
                                                [key]: !preferences[key]
                                            }),
                                        style: {
                                            padding: '6px 12px',
                                            borderRadius: 8,
                                            border: `1px solid ${preferences[key] ? `${color}30` : C.border}`,
                                            background: preferences[key] ? `${color}10` : C.input,
                                            color: preferences[key] ? color : C.textMuted,
                                            fontSize: 11,
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4
                                        },
                                        children: [
                                            preferences[key] ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                size: 10
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    border: `1px solid ${C.textDim}`
                                                }
                                            }),
                                            label
                                        ]
                                    }, key))
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: C.card,
                            borderRadius: 12,
                            border: `1px solid ${C.border}`,
                            padding: '12px 14px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.orangeAccent,
                                    margin: '0 auto 4px'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 800,
                                    color: C.orangeAccent,
                                    display: 'block'
                                },
                                children: currentStreak
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 10,
                                    color: C.textMuted
                                },
                                children: "Current Streak"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: C.card,
                            borderRadius: 12,
                            border: `1px solid ${C.border}`,
                            padding: '12px 14px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.yellow,
                                    margin: '0 auto 4px'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 800,
                                    color: C.yellow,
                                    display: 'block'
                                },
                                children: longestStreak
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 10,
                                    color: C.textMuted
                                },
                                children: "Best Streak"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            background: C.card,
                            borderRadius: 12,
                            border: `1px solid ${C.border}`,
                            padding: '12px 14px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_BookOpen_Brain_Calendar_CheckCircle2_ChevronLeft_ChevronRight_CreditCard_FileQuestion_Flame_Lightbulb_RotateCcw_Settings2_Sparkles_Stethoscope_Target_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                size: 16,
                                style: {
                                    color: C.green,
                                    margin: '0 auto 4px'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 800,
                                    color: C.green,
                                    display: 'block'
                                },
                                children: [
                                    todayLessons.length > 0 ? Math.round(todayLessons.filter((l)=>l.completed).length / todayLessons.length * 100) : 0,
                                    "%"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 10,
                                    color: C.textMuted
                                },
                                children: "Today Done"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    background: C.card,
                    borderRadius: 12,
                    border: `1px solid ${C.border}`,
                    padding: 14,
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            fontSize: 11,
                            fontWeight: 600,
                            color: C.textSec,
                            display: 'block',
                            marginBottom: 8
                        },
                        children: "This Week"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: 4,
                            height: 40
                        },
                        children: weekly.map((d, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            width: '100%',
                                            borderRadius: 3,
                                            background: d.completed > 0 ? C.green : C.textDim + '20',
                                            height: Math.max(4, d.completed / Math.max(d.total, 1) * 32),
                                            transition: 'height 0.3s ease'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            fontSize: 9,
                                            color: C.textMuted
                                        },
                                        children: d.day
                                    })
                                ]
                            }, i))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MicroLessonCarousel, {
                onNavigateToTab: onNavigateToTab
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    marginTop: 20
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MicroLessonCalendar, {})
            })
        ]
    });
}


/***/ }),

/***/ 148874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 574130:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileQuestionMark)
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
    name: "file-question-mark",
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
                d: "M12 17h.01",
                key: "p32p05"
            }
        ],
        [
            "path",
            {
                d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
                key: "mhlwft"
            }
        ]
    ],
    aliases: [
        "file-question"
    ]
};
__iconData.node;
const FileQuestionMark = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-question-mark.mjs.map


/***/ }),

/***/ 597982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ useMicroLessonStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(469517);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(300);


// ─── Helpers ─────────────────────────────────────────────────────────────────
function todayISO() {
    return new Date().toISOString().split('T')[0];
}
function calculateStreakFromDays(dayStreaks) {
    if (dayStreaks.length === 0) return 0;
    const sorted = [
        ...dayStreaks
    ].sort((a, b)=>b.date.localeCompare(a.date));
    let streak = 0;
    const today = todayISO();
    for(let i = 0; i < sorted.length; i++){
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);
        const expectedStr = expectedDate.toISOString().split('T')[0];
        if (sorted[i].date === expectedStr && sorted[i].allCompleted) {
            streak++;
        } else if (sorted[i].date === expectedStr && !sorted[i].allCompleted) {
            break;
        } else {
            break;
        }
    }
    return streak;
}
// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
    todayLessons: [],
    pastLessons: {},
    loading: false,
    error: null,
    lastGenerated: null,
    engagementLog: [],
    currentCardIndex: 0,
    currentStreak: 0,
    longestStreak: 0,
    dayStreaks: [],
    lastEngagementDate: null,
    preferences: {
        dailyCount: 4,
        preferredNotificationTime: 'morning',
        enabled: true,
        includeWeakAreas: true,
        includeTrending: true,
        includeReview: true
    },
    selectedCalendarDate: null
};
// ─── Store ───────────────────────────────────────────────────────────────────
const useMicroLessonStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .persist */ .Zr)((set, get)=>({
        ...initialState,
        setTodayLessons: (lessons)=>{
            const today = todayISO();
            set({
                todayLessons: lessons,
                lastGenerated: today,
                dayStreaks: [
                    ...get().dayStreaks.filter((d)=>d.date !== today),
                    {
                        date: today,
                        lessonsCompleted: lessons.filter((l)=>l.completed).length,
                        totalLessons: lessons.length,
                        allCompleted: lessons.every((l)=>l.completed)
                    }
                ]
            });
        },
        addPastLessons: (date, lessons)=>{
            const pastLessons = {
                ...get().pastLessons,
                [date]: lessons
            };
            set({
                pastLessons
            });
        },
        setLoading: (loading)=>set({
                loading
            }),
        setError: (error)=>set({
                error
            }),
        generateLessons: async ()=>{
            const state = get();
            const today = todayISO();
            if (state.lastGenerated === today && state.todayLessons.length > 0) return;
            set({
                loading: true,
                error: null
            });
            try {
                const res = await fetch('/api/micro-lessons/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        count: state.preferences.dailyCount,
                        includeWeakAreas: state.preferences.includeWeakAreas,
                        includeTrending: state.preferences.includeTrending,
                        includeReview: state.preferences.includeReview
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    const lessons = (data.lessons || []).map((l, i)=>({
                            id: l.id || `ml-${today}-${i}`,
                            fact: l.fact || '',
                            clinicalRelevance: l.clinicalRelevance || '',
                            selfTest: l.selfTest || {
                                question: '',
                                options: [],
                                answer: ''
                            },
                            relatedContent: l.relatedContent || {
                                title: '',
                                type: 'topic',
                                system: '',
                                topic: ''
                            },
                            date: today,
                            system: l.system || 'General',
                            topic: l.topic || 'General',
                            difficulty: l.difficulty || 3,
                            completed: false,
                            selfTestAnswered: false,
                            selfTestCorrect: null
                        }));
                    get().setTodayLessons(lessons);
                } else {
                    set({
                        error: 'Failed to generate micro-lessons'
                    });
                }
            } catch  {
                set({
                    error: 'Network error — could not generate micro-lessons'
                });
            } finally{
                set({
                    loading: false
                });
            }
        },
        markLessonCompleted: (lessonId)=>{
            const state = get();
            const today = todayISO();
            const updated = state.todayLessons.map((l)=>l.id === lessonId ? {
                    ...l,
                    completed: true
                } : l);
            const allCompleted = updated.every((l)=>l.completed);
            set({
                todayLessons: updated,
                dayStreaks: [
                    ...state.dayStreaks.filter((d)=>d.date !== today),
                    {
                        date: today,
                        lessonsCompleted: updated.filter((l)=>l.completed).length,
                        totalLessons: updated.length,
                        allCompleted
                    }
                ]
            });
            get().calculateStreak();
        },
        answerSelfTest: (lessonId, correct)=>{
            const state = get();
            const updated = state.todayLessons.map((l)=>l.id === lessonId ? {
                    ...l,
                    selfTestAnswered: true,
                    selfTestCorrect: correct,
                    completed: true
                } : l);
            set({
                todayLessons: updated
            });
            // Auto-mark as completed when self-test is answered
            get().markLessonCompleted(lessonId);
        },
        setCurrentCardIndex: (index)=>set({
                currentCardIndex: index
            }),
        logEngagement: (record)=>{
            set({
                engagementLog: [
                    ...get().engagementLog,
                    record
                ],
                lastEngagementDate: todayISO()
            });
        },
        submitEngagementBatch: async ()=>{
            const state = get();
            if (state.engagementLog.length === 0) return;
            const batch = [
                ...state.engagementLog
            ];
            set({
                engagementLog: []
            }); // Clear after taking
            try {
                await fetch('/api/micro-lessons/engage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        events: batch
                    })
                });
            } catch  {
                // Silent fail — engagement tracking is best-effort
                set({
                    engagementLog: [
                        ...get().engagementLog,
                        ...batch
                    ]
                });
            }
        },
        calculateStreak: ()=>{
            const state = get();
            const streak = calculateStreakFromDays(state.dayStreaks);
            const longest = Math.max(streak, state.longestStreak, ...state.dayStreaks.filter((d)=>d.allCompleted).length > 0 ? [
                streak
            ] : [
                0
            ]);
            set({
                currentStreak: streak,
                longestStreak: longest
            });
        },
        updateStreakForToday: ()=>{
            const state = get();
            const today = todayISO();
            const todayLessons = state.todayLessons;
            const completedCount = todayLessons.filter((l)=>l.completed).length;
            const allCompleted = todayLessons.length > 0 && todayLessons.every((l)=>l.completed);
            const existing = state.dayStreaks.find((d)=>d.date === today);
            if (!existing || existing.lessonsCompleted !== completedCount) {
                set({
                    dayStreaks: [
                        ...state.dayStreaks.filter((d)=>d.date !== today),
                        {
                            date: today,
                            lessonsCompleted: completedCount,
                            totalLessons: todayLessons.length,
                            allCompleted
                        }
                    ]
                });
                get().calculateStreak();
            }
        },
        updatePreferences: (prefs)=>{
            set({
                preferences: {
                    ...get().preferences,
                    ...prefs
                }
            });
        },
        setSelectedCalendarDate: (date)=>set({
                selectedCalendarDate: date
            }),
        getLessonsForDate: (date)=>{
            const state = get();
            if (date === todayISO()) return state.todayLessons;
            return state.pastLessons[date] || [];
        },
        getTodayCompletionRate: ()=>{
            const state = get();
            if (state.todayLessons.length === 0) return 0;
            return state.todayLessons.filter((l)=>l.completed).length / state.todayLessons.length;
        },
        getWeeklyEngagement: ()=>{
            const state = get();
            const result = [];
            for(let i = 6; i >= 0; i--){
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const dayName = d.toLocaleDateString('en-US', {
                    weekday: 'short'
                });
                const ds = state.dayStreaks.find((s)=>s.date === dateStr);
                result.push({
                    day: dayName,
                    completed: ds?.lessonsCompleted ?? 0,
                    total: ds?.totalLessons ?? 0
                });
            }
            return result;
        }
    }), {
    name: 'medq-micro-lessons-store',
    partialize: (state)=>({
            todayLessons: state.todayLessons,
            pastLessons: state.pastLessons,
            lastGenerated: state.lastGenerated,
            currentStreak: state.currentStreak,
            longestStreak: state.longestStreak,
            dayStreaks: state.dayStreaks,
            lastEngagementDate: state.lastEngagementDate,
            preferences: state.preferences
        })
}));


/***/ })

};
;