"use strict";
exports.id = 3946;
exports.ids = [3946];
exports.modules = {

/***/ 246106:
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

/***/ 258543:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ 324815:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ normalizeVideoOptions),
/* harmony export */   l: () => (/* binding */ VIDEO_PROVIDERS)
/* harmony export */ });
/**
 * Video provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/video-providers.ts: the
 * VIDEO_PROVIDERS config table and the pure normalizeVideoOptions() helper,
 * with ZERO adapter imports. The dispatchers that call the provider adapters
 * (which import node 'crypto' for HMAC signing etc.) stay in
 * video-providers.ts — importing them here would drag node builtins into
 * browser chunks, which Turbopack refuses to write
 * ("chunking context does not support external modules").
 *
 * Client code imports from './video-provider-registry'; server code can use
 * either (video-providers.ts re-exports this registry).
 */ const VIDEO_PROVIDERS = {
    seedance: {
        id: 'seedance',
        name: 'Seedance',
        requiresApiKey: true,
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
        models: [
            {
                id: 'doubao-seedance-1-5-pro-251215',
                name: 'Seedance 1.5 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-250528',
                name: 'Seedance 1.0 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-fast-251015',
                name: 'Seedance 1.0 Pro Fast'
            },
            {
                id: 'doubao-seedance-1-0-lite-t2v-250428',
                name: 'Seedance 1.0 Lite T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16',
            '3:4',
            '21:9'
        ],
        supportedDurations: [
            5,
            10
        ],
        supportedResolutions: [
            '480p',
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    kling: {
        id: 'kling',
        name: 'Kling',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api-beijing.klingai.com',
        models: [
            {
                id: 'kling-v2-6',
                name: 'Kling V2.6'
            },
            {
                id: 'kling-v1-6',
                name: 'Kling V1.6'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            5,
            10
        ],
        maxDuration: 10
    },
    veo: {
        id: 'veo',
        name: 'Veo',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        models: [
            {
                id: 'veo-3.1-fast-generate-001',
                name: 'Veo 3.1 Fast'
            },
            {
                id: 'veo-3.1-generate-001',
                name: 'Veo 3.1'
            },
            {
                id: 'veo-3.0-fast-generate-001',
                name: 'Veo 3.0 Fast'
            },
            {
                id: 'veo-3.0-generate-001',
                name: 'Veo 3.0'
            },
            {
                id: 'veo-2.0-generate-001',
                name: 'Veo 2.0'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            8
        ],
        supportedResolutions: [
            '720p'
        ],
        maxDuration: 8
    },
    sora: {
        id: 'sora',
        name: 'Sora',
        requiresApiKey: true,
        models: [],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        maxDuration: 20
    },
    'minimax-video': {
        id: 'minimax-video',
        name: 'MiniMax Video',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        // Hailuo 2.3 Fast requires Image-to-Video with first_frame_image; this
        // provider currently submits Text-to-Video requests only.
        models: [
            {
                id: 'MiniMax-Hailuo-2.3',
                name: 'Hailuo 2.3'
            },
            {
                id: 'MiniMax-Hailuo-02',
                name: 'Hailuo 02'
            },
            {
                id: 'T2V-01-Director',
                name: 'T2V-01 Director'
            },
            {
                id: 'T2V-01',
                name: 'T2V-01'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6,
            10
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    'grok-video': {
        id: 'grok-video',
        name: 'Grok Video (xAI)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.x.ai/v1',
        models: [
            {
                id: 'grok-imagine-video',
                name: 'Grok Imagine Video'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6
        ],
        maxDuration: 6
    },
    happyhorse: {
        id: 'happyhorse',
        name: 'HappyHorse',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com',
        models: [
            {
                id: 'happyhorse-1.0-t2v',
                name: 'HappyHorse 1.0 T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '9:16',
            '1:1',
            '4:3',
            '3:4'
        ],
        supportedDurations: [
            5,
            10,
            15
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 15
    }
};
/**
 * Normalize video generation options against provider capabilities.
 * Ensures duration, aspectRatio, and resolution are valid for the given provider.
 * Falls back to the first supported value when the requested value is unsupported.
 */ function normalizeVideoOptions(providerId, options) {
    const provider = VIDEO_PROVIDERS[providerId];
    if (!provider) return options;
    const normalized = {
        ...options
    };
    // Duration: use first supported value if unset or unsupported
    if (provider.supportedDurations && provider.supportedDurations.length > 0) {
        if (!normalized.duration || !provider.supportedDurations.includes(normalized.duration)) {
            normalized.duration = provider.supportedDurations[0];
        }
    }
    // Aspect ratio: use first supported value if unset or unsupported
    if (provider.supportedAspectRatios && provider.supportedAspectRatios.length > 0) {
        if (!normalized.aspectRatio || !provider.supportedAspectRatios.includes(normalized.aspectRatio)) {
            normalized.aspectRatio = provider.supportedAspectRatios[0];
        }
    }
    // Resolution: use first supported value if unset or unsupported
    if (provider.supportedResolutions && provider.supportedResolutions.length > 0) {
        if (!normalized.resolution || !provider.supportedResolutions.includes(normalized.resolution)) {
            normalized.resolution = provider.supportedResolutions[0];
        }
    }
    return normalized;
}


/***/ }),

/***/ 353564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e3: () => (/* binding */ validateProvider),
/* harmony export */   zE: () => (/* binding */ resolveSelectedModel),
/* harmony export */   zT: () => (/* binding */ isLLMProviderConfigured)
/* harmony export */ });
/* unused harmony exports isProviderUsable, validateModel, hasUsableLLMProvider */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/store/settings-validation.ts
 *
 * Verbatim port — pure functions with no external dependencies. Used by
 * fetchServerProviders() in the settings store to detect and fix stale
 * provider/model selections after server config changes.
 */ /**
 * Provider selection validation utilities.
 *
 * Pure functions used by fetchServerProviders() to detect and fix
 * stale provider/model selections after server config changes.
 */ /**
 * Check whether a provider has a usable *credential path* (server config or
 * client key/baseUrl). This is the store-level notion and deliberately does
 * NOT require ≥1 model — the UX-level "usable" predicate
 * ({@link isLLMProviderConfigured}) additionally requires a model, so a
 * pathological zero-model provider is classified State A at the UI boundary
 * even though the store may keep it selected with an empty model (#580).
 */ function isProviderUsable(cfg) {
    if (!cfg) return false;
    // Operator force-disable wins over any local credential path so the current
    // selection is re-pointed away from a server-disabled provider (#665).
    if (cfg.serverDisabled) return false;
    if (cfg.isServerConfigured) return true;
    // Keyless providers (e.g. Ollama) need an explicit user-provided baseUrl
    if (cfg.requiresApiKey === false) return !!cfg.baseUrl;
    return !!cfg.apiKey;
}
/**
 * Validate current provider selection against updated config.
 * Returns the current ID if still usable, otherwise the first usable
 * provider from fallbackOrder, or defaultId if provided, or ''.
 */ function validateProvider(currentId, configMap, fallbackOrder, defaultId) {
    if (!currentId) return currentId;
    if (isProviderUsable(configMap[currentId])) return currentId;
    for (const id of fallbackOrder){
        if (isProviderUsable(configMap[id])) return id;
    }
    return defaultId ?? '';
}
/**
 * Validate current model selection against available models list.
 * Falls back to first available model, or '' if list is empty.
 */ function validateModel(currentModelId, availableModels) {
    if (!currentModelId) return currentModelId;
    if (availableModels.some((m)=>m.id === currentModelId)) return currentModelId;
    return availableModels[0]?.id ?? '';
}
/**
 * Resolve the model selection for a usable provider.
 *
 * Enforces the invariant "usable provider ⇒ a concrete model is selected":
 * keeps the current model if still valid, otherwise falls back to the first
 * available model. Unlike {@link validateModel} it has no empty-input
 * short-circuit, so it returns '' ONLY when the model list is empty (i.e. the
 * provider is not usable). Use this for model *selection resolution*; use
 * validateModel only for pure validation.
 */ function resolveSelectedModel(currentModelId, availableModels) {
    if (availableModels.some((m)=>m.id === currentModelId)) return currentModelId;
    return availableModels[0]?.id ?? '';
}
/**
 * Canonical "this LLM provider is usable" predicate — single source of truth
 * shared by the generation toolbar selector and the landing-page generate
 * gate (#580). Deliberately consistent with {@link isProviderUsable} so the
 * gate/toolbar can never claim a provider is usable when the server-sync
 * reconcile would not actually select it:
 *
 * - server-configured ⇒ usable;
 * - keyless provider (ollama/lemonade) ⇒ usable ONLY once the user sets an
 *   explicit baseUrl — the registry `defaultBaseUrl` alone is not user intent;
 * - key-requiring provider ⇒ needs a client key AND a resolvable endpoint.
 *
 * Always also requires ≥1 model.
 */ function isLLMProviderConfigured(config) {
    if (config.models.length < 1) return false;
    if (config.isServerConfigured) return true;
    if (config.requiresApiKey === false) return !!config.baseUrl;
    if (!config.apiKey) return false;
    return !!(config.baseUrl || config.defaultBaseUrl);
}
/**
 * Whether at least one LLM provider is usable — i.e. the app is in state B
 * (≥1 usable provider) rather than state A (must configure a provider). Under
 * the #580 invariant this is exactly the condition under which a concrete
 * model is guaranteed to be selected.
 */ function hasUsableLLMProvider(providersConfig) {
    if (!providersConfig) return false;
    return Object.values(providersConfig).some(isLLMProviderConfigured);
}


/***/ }),

/***/ 473946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSettingsStore: () => (/* binding */ useSettingsStore)
/* harmony export */ });
/* unused harmony exports PLAYBACK_SPEEDS, promoteLegacyCustomProviderBaseUrls */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(732823);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(246106);
/* harmony import */ var _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(815969);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(716533);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(731253);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908521);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(754547);
/* harmony import */ var _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(837653);
/* harmony import */ var _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(659497);
/* harmony import */ var _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(324815);
/* harmony import */ var _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(745810);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(653165);
/* harmony import */ var _lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(353564);
/**
 * Settings Store
 * Global settings state synchronized with localStorage
 */ 












const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_7__/* .createLogger */ .h)('Settings');
function pruneThinkingConfigs(thinkingConfigs, providersConfig) {
    if (!thinkingConfigs || !providersConfig) return {};
    const validKeys = new Set();
    for (const [providerId, providerConfig] of Object.entries(providersConfig)){
        for (const model of providerConfig.models){
            if ((0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .supportsConfigurableThinking */ .yW)(model.capabilities?.thinking)) {
                validKeys.add((0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .getThinkingConfigKey */ .UL)(providerId, model.id));
            }
        }
    }
    return Object.fromEntries(Object.entries(thinkingConfigs).filter(([key])=>validKeys.has(key)));
}
/** Available playback speed tiers */ const PLAYBACK_SPEEDS = (/* unused pure expression or super */ null && ([
    1,
    1.25,
    1.5,
    2
]));
// Initialize default providers config
const getDefaultProvidersConfig = ()=>{
    const config = {};
    Object.keys(_lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x).forEach((pid)=>{
        const provider = _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x[pid];
        config[pid] = {
            apiKey: '',
            baseUrl: '',
            models: provider.models,
            name: provider.name,
            type: provider.type,
            defaultBaseUrl: provider.defaultBaseUrl,
            icon: provider.icon,
            requiresApiKey: provider.requiresApiKey,
            isBuiltIn: true
        };
    });
    return config;
};
/**
 * Single shared LLM selection resolver (#580). Given a providers config and
 * the current (providerId, modelId), return the resolved selection that
 * upholds the invariant for ANY config mutation — clearing/adding a key,
 * editing models, deleting a provider, import, reset:
 *
 * - keep the current provider if it is still usable;
 * - else fall back to the first usable provider;
 * - else State A (empty selection).
 *
 * Then resolve a concrete model for the chosen provider. Used by both
 * setProviderConfig (single edit) and setProvidersConfig (bulk) so the two
 * paths can never diverge — the per-call-site asymmetry #580 set out to kill.
 */ function resolveLLMSelection(config, currentProviderId, currentModelId) {
    const isUsable = (id)=>!!config[id] && (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .isLLMProviderConfigured */ .zT)(config[id]);
    const providerId = isUsable(currentProviderId) ? currentProviderId : Object.keys(config).find(isUsable) ?? '';
    const modelId = providerId ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(currentModelId, config[providerId]?.models ?? []) : '';
    return {
        providerId,
        modelId
    };
}
// Initialize default audio config
const getDefaultAudioConfig = ()=>({
        ttsProviderId: 'browser-native-tts',
        ttsVoice: 'default',
        ttsSpeed: 1.0,
        asrProviderId: 'browser-native',
        asrLanguage: 'zh',
        ttsProvidersConfig: {
            // Built-in providers default enabled:true — they only ever surface once
            // configured (API key or server-managed), so "enabled" is a user opt-OUT,
            // not the visibility gate. A server-configured provider must not be hidden
            // by a stale default (#665).
            'openai-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'azure-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'glm-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'qwen-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'voxcpm-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
                enabled: true,
                providerOptions: {
                    backend: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_VOXCPM_BACKEND */ .TN
                }
            },
            'doubao-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'elevenlabs-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'minimax-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: 'speech-2.8-hd',
                enabled: true
            },
            'lemonade-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: 'kokoro-v1',
                enabled: true
            },
            // Browser-native is OFF by default — fully opt-in. Native voice quality is
            // poor; it must never be a silent default (#665).
            'browser-native-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        },
        asrProvidersConfig: {
            'openai-whisper': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'browser-native': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'qwen-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'azure-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'lemonade-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default PDF config
const getDefaultPDFConfig = ()=>({
        pdfProviderId: 'unpdf',
        pdfProvidersConfig: {
            unpdf: {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            mineru: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'mineru-cloud': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Image config
const getDefaultImageConfig = ()=>({
        imageProviderId: 'seedream',
        imageModelId: 'doubao-seedream-5-0-260128',
        imageProvidersConfig: {
            seedream: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'openai-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'qwen-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'nano-banana': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'minimax-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'grok-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            lemonade: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            // Built-in platform provider — no user key needed; credentials are
            // resolved server-side from .z-ai-config / ZAI_API_KEY. Selected
            // automatically by the agent illustration tool when the preferred
            // provider has no key configured.
            zai: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Video config
const getDefaultVideoConfig = ()=>({
        videoProviderId: 'seedance',
        videoModelId: 'doubao-seedance-1-5-pro-251215',
        videoProvidersConfig: {
            seedance: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            kling: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            veo: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            sora: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'minimax-video': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'grok-video': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            happyhorse: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Web Search config
const getDefaultWebSearchConfig = ()=>({
        webSearchProviderId: 'tavily',
        webSearchProvidersConfig: {
            tavily: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            bocha: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            brave: {
                apiKey: '',
                baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.brave.defaultBaseUrl || '',
                enabled: true,
                requiresApiKey: false
            },
            baidu: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            minimax: {
                apiKey: '',
                baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.minimax.defaultBaseUrl || '',
                enabled: true,
                requiresApiKey: true
            }
        },
        baiduSubSources: {
            webSearch: true,
            baike: true,
            scholar: true
        }
    });
/**
 * Check whether a provider ID exists in the given provider registry.
 */ function hasProviderId(providerMap, providerId) {
    return typeof providerId === 'string' && providerId in providerMap;
}
/**
 * Validate all persisted provider IDs against their registries.
 * Reset any stale / removed ID back to its default value.
 * Called during both migrate and merge to cover all rehydration paths.
 */ function ensureValidProviderSelections(state) {
    const defaultAudioConfig = getDefaultAudioConfig();
    const defaultPdfConfig = getDefaultPDFConfig();
    const defaultImageConfig = getDefaultImageConfig();
    const defaultVideoConfig = getDefaultVideoConfig();
    const defaultWebSearchConfig = getDefaultWebSearchConfig();
    if (!hasProviderId(_lib_pdf_constants__WEBPACK_IMPORTED_MODULE_3__/* .PDF_PROVIDERS */ .sP, state.pdfProviderId)) {
        state.pdfProviderId = defaultPdfConfig.pdfProviderId;
    }
    if (!hasProviderId(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf, state.webSearchProviderId)) {
        state.webSearchProviderId = defaultWebSearchConfig.webSearchProviderId;
    }
    ensureBaiduSubSources(state);
    if (!hasProviderId(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D, state.imageProviderId)) {
        state.imageProviderId = defaultImageConfig.imageProviderId;
    }
    if (!hasProviderId(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l, state.videoProviderId)) {
        state.videoProviderId = defaultVideoConfig.videoProviderId;
    }
    if (!hasProviderId(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF, state.ttsProviderId) && !(state.ttsProviderId && (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(state.ttsProviderId) && state.ttsProvidersConfig && state.ttsProviderId in state.ttsProvidersConfig)) {
        state.ttsProviderId = defaultAudioConfig.ttsProviderId;
    }
    if (!hasProviderId(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co, state.asrProviderId) && !(state.asrProviderId && (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(state.asrProviderId) && state.asrProvidersConfig && state.asrProviderId in state.asrProvidersConfig)) {
        state.asrProviderId = defaultAudioConfig.asrProviderId;
    }
}
function ensureBuiltInAudioProviders(state) {
    const defaultAudioConfig = getDefaultAudioConfig();
    if (state.ttsProvidersConfig) {
        for (const providerId of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF)){
            if (!state.ttsProvidersConfig[providerId]) {
                state.ttsProvidersConfig[providerId] = defaultAudioConfig.ttsProvidersConfig[providerId];
            }
        }
        const voxcpmConfig = state.ttsProvidersConfig['voxcpm-tts'];
        if (voxcpmConfig) {
            if (!voxcpmConfig.modelId || voxcpmConfig.modelId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_MODEL_ID */ .wG) {
                voxcpmConfig.modelId = _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_VLLM_MODEL_ID */ .Cn;
            }
            voxcpmConfig.providerOptions = {
                backend: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_VOXCPM_BACKEND */ .TN,
                ...voxcpmConfig.providerOptions || {}
            };
        }
    }
    if (state.asrProvidersConfig) {
        for (const providerId of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co)){
            if (!state.asrProvidersConfig[providerId]) {
                state.asrProvidersConfig[providerId] = defaultAudioConfig.asrProvidersConfig[providerId];
            }
        }
    }
}
/**
 * Ensure providersConfig includes all built-in providers and their latest models.
 * Called on every rehydrate (not just version migrations) so new providers
 * added in code are always picked up without clearing cache.
 */ function ensureBuiltInProviders(state) {
    if (!state.providersConfig) return;
    const defaultConfig = getDefaultProvidersConfig();
    Object.keys(_lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x).forEach((pid)=>{
        const providerId = pid;
        if (!state.providersConfig[providerId]) {
            // New provider: add with defaults
            state.providersConfig[providerId] = defaultConfig[providerId];
        } else {
            // Existing provider: refresh built-in models from the registry and
            // keep user-added models after the built-in list.
            const provider = _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x[providerId];
            const existing = state.providersConfig[providerId];
            const builtInModelIds = new Set(provider.models.map((m)=>m.id));
            const customModels = (existing.models || []).filter((m)=>!builtInModelIds.has(m.id));
            const mergedModels = [
                ...provider.models,
                ...customModels
            ];
            state.providersConfig[providerId] = {
                ...existing,
                models: mergedModels,
                name: existing.name || provider.name,
                type: existing.type || provider.type,
                defaultBaseUrl: existing.defaultBaseUrl || provider.defaultBaseUrl,
                icon: provider.icon || existing.icon,
                requiresApiKey: existing.requiresApiKey ?? provider.requiresApiKey,
                isBuiltIn: existing.isBuiltIn ?? true
            };
        }
    });
}
/**
 * Custom providers created before #414 stored their actual endpoint in
 * defaultBaseUrl while leaving baseUrl empty. Promote that persisted value
 * during rehydrate so downstream request builders keep using baseUrl only.
 */ function promoteLegacyCustomProviderBaseUrls(state) {
    if (!state.providersConfig) return;
    Object.values(state.providersConfig).forEach((config)=>{
        if (!config.isBuiltIn && !config.baseUrl && config.defaultBaseUrl) {
            config.baseUrl = config.defaultBaseUrl;
        }
    });
}
/**
 * Ensure imageProvidersConfig includes all built-in image providers.
 * Called on every rehydrate so newly added image providers appear automatically.
 */ function ensureBuiltInImageProviders(state) {
    if (!state.imageProvidersConfig) return;
    const defaultConfig = getDefaultImageConfig().imageProvidersConfig;
    Object.keys(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D).forEach((pid)=>{
        const providerId = pid;
        if (!state.imageProvidersConfig[providerId]) {
            state.imageProvidersConfig[providerId] = defaultConfig[providerId];
        }
    });
}
/**
 * Ensure videoProvidersConfig includes all built-in video providers.
 * Called on every rehydrate so newly added video providers appear automatically.
 */ function ensureBuiltInVideoProviders(state) {
    if (!state.videoProvidersConfig) return;
    const defaultConfig = getDefaultVideoConfig().videoProvidersConfig;
    Object.keys(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l).forEach((pid)=>{
        const providerId = pid;
        if (!state.videoProvidersConfig[providerId]) {
            state.videoProvidersConfig[providerId] = defaultConfig[providerId];
        }
    });
}
/**
 * Ensure webSearchProvidersConfig includes all built-in web search providers.
 * Called on every rehydrate so newly added providers appear automatically.
 */ function ensureBuiltInWebSearchProviders(state) {
    if (!state.webSearchProvidersConfig) return;
    const defaultConfig = getDefaultWebSearchConfig().webSearchProvidersConfig;
    Object.keys(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf).forEach((pid)=>{
        const providerId = pid;
        if (!state.webSearchProvidersConfig[providerId]) {
            state.webSearchProvidersConfig[providerId] = defaultConfig[providerId];
        } else {
            state.webSearchProvidersConfig[providerId] = {
                ...state.webSearchProvidersConfig[providerId],
                requiresApiKey: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf[providerId].requiresApiKey
            };
        }
    });
}
function ensureBaiduSubSources(state) {
    const defaults = getDefaultWebSearchConfig().baiduSubSources;
    const current = state.baiduSubSources;
    state.baiduSubSources = {
        webSearch: current?.webSearch ?? defaults.webSearch,
        baike: current?.baike ?? defaults.baike,
        scholar: current?.scholar ?? defaults.scholar
    };
}
/**
 * Strip the removed `serverBaseUrl` field from any persisted provider config.
 *
 * Managed providers no longer expose their base URL to the client (#620). Old
 * localStorage may still carry a `serverBaseUrl` on provider entries; this
 * clears it on every rehydrate so a stale server URL can't linger in client
 * state. Called from both migrate and merge to cover all rehydration paths.
 */ function stripLegacyServerBaseUrl(state) {
    const maps = [
        state.providersConfig,
        state.ttsProvidersConfig,
        state.asrProvidersConfig,
        state.pdfProvidersConfig,
        state.imageProvidersConfig,
        state.videoProvidersConfig,
        state.webSearchProvidersConfig
    ];
    for (const map of maps){
        if (!map) continue;
        for (const cfg of Object.values(map)){
            if (cfg && 'serverBaseUrl' in cfg) delete cfg.serverBaseUrl;
        }
    }
}
// Migrate from old localStorage format
const migrateFromOldStorage = ()=>{
    if (true) return null;
    // Check if new storage already exists
    const newStorage = localStorage.getItem('settings-storage');
    if (newStorage) return null; // Already migrated or new install
    // Read old localStorage keys
    const oldLlmModel = localStorage.getItem('llmModel');
    const oldProvidersConfig = localStorage.getItem('providersConfig');
    const oldTtsModel = localStorage.getItem('ttsModel');
    const oldSelectedAgents = localStorage.getItem('selectedAgentIds');
    if (!oldLlmModel && !oldProvidersConfig) return null; // No old data
    // Parse model selection
    let providerId = 'openai';
    let modelId = 'gpt-5.4-mini';
    if (oldLlmModel) {
        const [pid, mid] = oldLlmModel.split(':');
        if (pid && mid) {
            providerId = pid;
            modelId = mid;
        }
    }
    // Parse providers config
    let providersConfig = getDefaultProvidersConfig();
    if (oldProvidersConfig) {
        try {
            const parsed = JSON.parse(oldProvidersConfig);
            providersConfig = {
                ...providersConfig,
                ...parsed
            };
        } catch (e) {
            log.error('Failed to parse old providersConfig:', e);
        }
    }
    // Parse other settings
    let ttsModel = 'openai-tts';
    if (oldTtsModel) ttsModel = oldTtsModel;
    let selectedAgentIds = [
        'default-1',
        'default-2',
        'default-3'
    ];
    if (oldSelectedAgents) {
        try {
            const parsed = JSON.parse(oldSelectedAgents);
            if (Array.isArray(parsed) && parsed.length > 0) {
                selectedAgentIds = parsed;
            }
        } catch (e) {
            log.error('Failed to parse old selectedAgentIds:', e);
        }
    }
    return {
        providerId,
        modelId,
        thinkingConfigs: {},
        providersConfig,
        ttsModel,
        selectedAgentIds
    };
};
const useSettingsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_11__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_12__/* .persist */ .Zr)((set, get)=>{
    // Try to migrate from old storage
    const migratedData = migrateFromOldStorage();
    const defaultAudioConfig = getDefaultAudioConfig();
    const defaultPDFConfig = getDefaultPDFConfig();
    const defaultImageConfig = getDefaultImageConfig();
    const defaultVideoConfig = getDefaultVideoConfig();
    const defaultWebSearchConfig = getDefaultWebSearchConfig();
    const initialProvidersConfig = migratedData?.providersConfig || getDefaultProvidersConfig();
    return {
        // Initial state (use migrated data if available).
        // Default provider is ZAI (MedQ's native LLM backend via z-ai-web-dev-sdk).
        // The OpenMAIC source code's full multi-vendor provider registry is
        // preserved in src/lib/ai/providers.ts — users can switch to OpenAI /
        // Anthropic / Google / etc. from the settings UI by entering their
        // own API key. ZAI is the zero-config default since its credentials
        // are read from `.z-ai-config` at request time.
        providerId: migratedData?.providerId || 'zai',
        modelId: migratedData?.modelId || 'auto',
        thinkingConfigs: pruneThinkingConfigs(migratedData?.thinkingConfigs || {}, initialProvidersConfig),
        providersConfig: initialProvidersConfig,
        ttsModel: migratedData?.ttsModel || 'openai-tts',
        selectedAgentIds: migratedData?.selectedAgentIds || [
            'default-1',
            'default-2',
            'default-3'
        ],
        agentMode: 'auto',
        autoAgentCount: 3,
        agentVoiceOverrides: {},
        agentSelectionIsUserSet: false,
        // Playback controls
        ttsMuted: false,
        ttsVolume: 1,
        autoPlayLecture: false,
        playbackSpeed: 1,
        // Layout preferences
        sidebarCollapsed: true,
        chatAreaCollapsed: true,
        chatAreaWidth: 320,
        editRailCollapsed: false,
        editRailWidth: 220,
        editInsertToolbarCollapsed: false,
        // Audio settings (use defaults)
        ...defaultAudioConfig,
        // PDF settings (use defaults)
        ...defaultPDFConfig,
        // Image settings (use defaults)
        ...defaultImageConfig,
        // Video settings (use defaults)
        ...defaultVideoConfig,
        // Media generation toggles (off by default)
        imageGenerationEnabled: false,
        videoGenerationEnabled: false,
        reviewOutlineEnabled: false,
        // TTS is OFF by default; auto-enabled on first server-sync when a TTS
        // provider is configured (mirrors image/video). Fresh installs with no
        // provider stay off and show an "enable browser-native" CTA (#665).
        ttsEnabled: false,
        asrEnabled: true,
        // Off until the server reports a concurrency via fetchServerProviders.
        parallelSceneConcurrency: 0,
        autoConfigApplied: false,
        // Web Search settings (use defaults)
        ...defaultWebSearchConfig,
        // Actions
        setModel: (providerId, modelId)=>set({
                providerId,
                modelId
            }),
        setThinkingConfig: (providerId, modelId, config)=>set((state)=>{
                const key = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .getThinkingConfigKey */ .UL)(providerId, modelId);
                const next = {
                    ...state.thinkingConfigs
                };
                if (config) {
                    next[key] = config;
                } else {
                    delete next[key];
                }
                return {
                    thinkingConfigs: next
                };
            }),
        setProviderConfig: (providerId, config)=>set((state)=>{
                const providersConfig = {
                    ...state.providersConfig,
                    [providerId]: {
                        ...state.providersConfig[providerId],
                        ...config
                    }
                };
                // Re-resolve through the shared resolver (#580): a single config
                // edit can make the active provider usable (adopt + pick a model),
                // make it INVALID — e.g. the user clears its API key — (fall back
                // to another usable provider or State A), or change its model list
                // (re-pick the model). All handled atomically here, never leaving
                // an invalid/stale (provider, model) selected.
                const { providerId: nextProvider, modelId: nextModel } = resolveLLMSelection(providersConfig, state.providerId, state.modelId);
                return {
                    providersConfig,
                    thinkingConfigs: pruneThinkingConfigs(state.thinkingConfigs, providersConfig),
                    ...nextProvider !== state.providerId && {
                        providerId: nextProvider
                    },
                    ...nextModel !== state.modelId && {
                        modelId: nextModel
                    }
                };
            }),
        setProvidersConfig: (config)=>set((state)=>{
                // Bulk config replace (delete provider/model, import, reset): same
                // shared resolver as setProviderConfig so the two paths can never
                // diverge — never leave the deleted/invalid provider selected.
                const { providerId: nextProvider, modelId: nextModel } = resolveLLMSelection(config, state.providerId, state.modelId);
                return {
                    providersConfig: config,
                    thinkingConfigs: pruneThinkingConfigs(state.thinkingConfigs, config),
                    ...nextProvider !== state.providerId && {
                        providerId: nextProvider
                    },
                    ...nextModel !== state.modelId && {
                        modelId: nextModel
                    }
                };
            }),
        setTtsModel: (model)=>set({
                ttsModel: model
            }),
        setTTSMuted: (muted)=>set({
                ttsMuted: muted
            }),
        setTTSVolume: (volume)=>set({
                ttsVolume: Math.max(0, Math.min(1, volume))
            }),
        setAutoPlayLecture: (autoPlay)=>set({
                autoPlayLecture: autoPlay
            }),
        setPlaybackSpeed: (speed)=>set({
                playbackSpeed: speed
            }),
        setSelectedAgentIds: (ids)=>set({
                selectedAgentIds: ids
            }),
        setAgentMode: (mode)=>set({
                agentMode: mode
            }),
        setAutoAgentCount: (count)=>set({
                autoAgentCount: count
            }),
        setAgentVoiceOverride: (agentId, voice)=>set((state)=>{
                const next = {
                    ...state.agentVoiceOverrides
                };
                if (voice) {
                    next[agentId] = voice;
                } else {
                    delete next[agentId];
                }
                return {
                    agentVoiceOverrides: next
                };
            }),
        setAgentSelectionIsUserSet: (isUserSet)=>set({
                agentSelectionIsUserSet: isUserSet
            }),
        // Layout actions
        setSidebarCollapsed: (collapsed)=>set({
                sidebarCollapsed: collapsed
            }),
        setChatAreaCollapsed: (collapsed)=>set({
                chatAreaCollapsed: collapsed
            }),
        setEditRailCollapsed: (collapsed)=>set({
                editRailCollapsed: collapsed
            }),
        setEditRailWidth: (width)=>set({
                editRailWidth: width
            }),
        setEditInsertToolbarCollapsed: (collapsed)=>set({
                editInsertToolbarCollapsed: collapsed
            }),
        setChatAreaWidth: (width)=>set({
                chatAreaWidth: width
            }),
        // Audio actions
        setTTSProvider: (providerId)=>set((state)=>{
                // If switching provider, set default voice for that provider
                const shouldUpdateVoice = state.ttsProviderId !== providerId;
                const defaultVoice = (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(providerId) ? state.ttsProvidersConfig[providerId]?.customVoices?.[0]?.id || 'default' : _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[providerId] || 'default';
                return {
                    ttsProviderId: providerId,
                    ...shouldUpdateVoice && {
                        ttsVoice: defaultVoice
                    }
                };
            }),
        setTTSVoice: (voice)=>set({
                ttsVoice: voice
            }),
        setTTSSpeed: (speed)=>set({
                ttsSpeed: speed
            }),
        // Reset language when switching providers, since language code formats differ
        // (e.g. browser-native uses BCP-47 "en-US", OpenAI Whisper uses ISO 639-1 "en")
        setASRProvider: (providerId)=>set((state)=>{
                let supportedLanguages;
                if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(providerId)) {
                    supportedLanguages = [
                        'auto'
                    ];
                } else {
                    supportedLanguages = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co[providerId]?.supportedLanguages || [];
                }
                const isLanguageValid = supportedLanguages.includes(state.asrLanguage);
                return {
                    asrProviderId: providerId,
                    ...isLanguageValid ? {} : {
                        asrLanguage: supportedLanguages[0] || 'auto'
                    }
                };
            }),
        setASRLanguage: (language)=>set({
                asrLanguage: language
            }),
        setTTSProviderConfig: (providerId, config)=>set((state)=>({
                    ttsProvidersConfig: {
                        ...state.ttsProvidersConfig,
                        [providerId]: {
                            ...state.ttsProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        setASRProviderConfig: (providerId, config)=>set((state)=>({
                    asrProvidersConfig: {
                        ...state.asrProvidersConfig,
                        [providerId]: {
                            ...state.asrProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        // PDF actions
        setPDFProvider: (providerId)=>set({
                pdfProviderId: providerId
            }),
        setPDFProviderConfig: (providerId, config)=>set((state)=>({
                    pdfProvidersConfig: {
                        ...state.pdfProvidersConfig,
                        [providerId]: {
                            ...state.pdfProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        // Image Generation actions
        setImageProvider: (providerId)=>set((state)=>({
                    imageProviderId: providerId,
                    imageModelId: (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[providerId]?.models ?? [])
                })),
        setImageModelId: (modelId)=>set({
                imageModelId: modelId
            }),
        setImageProviderConfig: (providerId, config)=>set((state)=>{
                const mergedProvider = {
                    ...state.imageProvidersConfig[providerId],
                    ...config
                };
                const imageProvidersConfig = {
                    ...state.imageProvidersConfig,
                    [providerId]: mergedProvider
                };
                const base = {
                    imageProvidersConfig
                };
                // Atomic invariant (#580): a config edit on the active image
                // provider (e.g. deleting the selected custom model) must not
                // leave imageModelId pointing at a model that no longer exists.
                if (state.imageProviderId === providerId) {
                    const models = [
                        ..._lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[providerId]?.models ?? [],
                        ...mergedProvider.customModels ?? []
                    ];
                    const imageModelId = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, models);
                    if (imageModelId) {
                        return {
                            ...base,
                            imageModelId
                        };
                    }
                }
                return base;
            }),
        // Video Generation actions
        setVideoProvider: (providerId)=>set((state)=>({
                    videoProviderId: providerId,
                    videoModelId: (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[providerId]?.models ?? [])
                })),
        setVideoModelId: (modelId)=>set({
                videoModelId: modelId
            }),
        setVideoProviderConfig: (providerId, config)=>set((state)=>{
                const mergedProvider = {
                    ...state.videoProvidersConfig[providerId],
                    ...config
                };
                const videoProvidersConfig = {
                    ...state.videoProvidersConfig,
                    [providerId]: mergedProvider
                };
                const base = {
                    videoProvidersConfig
                };
                // Atomic invariant (#580): symmetric with image — a config edit on
                // the active video provider must not leave videoModelId stale.
                if (state.videoProviderId === providerId) {
                    const models = [
                        ..._lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[providerId]?.models ?? [],
                        ...mergedProvider.customModels ?? []
                    ];
                    const videoModelId = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, models);
                    if (videoModelId) {
                        return {
                            ...base,
                            videoModelId
                        };
                    }
                }
                return base;
            }),
        // Media generation toggle actions
        setImageGenerationEnabled: (enabled)=>{
            if (enabled) {
                const cfg = get().imageProvidersConfig;
                const hasUsable = Object.values(cfg).some((c)=>c.isServerConfigured || c.apiKey);
                if (!hasUsable) return;
            }
            set({
                imageGenerationEnabled: enabled
            });
        },
        setVideoGenerationEnabled: (enabled)=>{
            if (enabled) {
                const cfg = get().videoProvidersConfig;
                const hasUsable = Object.values(cfg).some((c)=>c.isServerConfigured || c.apiKey);
                if (!hasUsable) return;
            }
            set({
                videoGenerationEnabled: enabled
            });
        },
        setReviewOutlineEnabled: (enabled)=>set({
                reviewOutlineEnabled: enabled
            }),
        setTTSEnabled: (enabled)=>set({
                ttsEnabled: enabled
            }),
        setASREnabled: (enabled)=>set({
                asrEnabled: enabled
            }),
        // Custom audio provider actions
        addCustomTTSProvider: (id, name, baseUrl, requiresApiKey, defaultModel)=>set((state)=>({
                    ttsProvidersConfig: {
                        ...state.ttsProvidersConfig,
                        [id]: {
                            apiKey: '',
                            baseUrl: '',
                            enabled: true,
                            modelId: defaultModel || '',
                            customName: name,
                            customDefaultBaseUrl: baseUrl,
                            customVoices: [],
                            isBuiltIn: false,
                            requiresApiKey
                        }
                    },
                    ttsProviderId: id
                })),
        removeCustomTTSProvider: (id)=>set((state)=>{
                if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(id)) return state;
                const { [id]: _, ...rest } = state.ttsProvidersConfig;
                return {
                    ttsProvidersConfig: rest,
                    ...state.ttsProviderId === id && {
                        ttsProviderId: 'browser-native-tts',
                        ttsVoice: 'default'
                    }
                };
            }),
        addCustomASRProvider: (id, name, baseUrl, requiresApiKey)=>set((state)=>({
                    asrProvidersConfig: {
                        ...state.asrProvidersConfig,
                        [id]: {
                            apiKey: '',
                            baseUrl: '',
                            enabled: true,
                            modelId: '',
                            customModels: [],
                            customName: name,
                            customDefaultBaseUrl: baseUrl,
                            isBuiltIn: false,
                            requiresApiKey
                        }
                    },
                    asrProviderId: id
                })),
        removeCustomASRProvider: (id)=>set((state)=>{
                if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(id)) return state;
                const { [id]: _, ...rest } = state.asrProvidersConfig;
                return {
                    asrProvidersConfig: rest,
                    ...state.asrProviderId === id && {
                        asrProviderId: 'browser-native',
                        asrLanguage: 'zh'
                    }
                };
            }),
        // Web Search actions
        setWebSearchProvider: (providerId)=>set({
                webSearchProviderId: providerId
            }),
        setWebSearchProviderConfig: (providerId, config)=>set((state)=>({
                    webSearchProvidersConfig: {
                        ...state.webSearchProvidersConfig,
                        [providerId]: {
                            ...state.webSearchProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        setBaiduSubSources: (sources)=>set((state)=>{
                const next = {
                    ...state.baiduSubSources,
                    ...sources
                };
                if (!next.webSearch && !next.baike && !next.scholar) {
                    return state;
                }
                return {
                    baiduSubSources: next
                };
            }),
        // Fetch server-configured providers and merge into local state
        fetchServerProviders: async ()=>{
            try {
                const res = await fetch('/api/server-providers');
                if (!res.ok) return;
                // Managed providers expose only their allowed model list (LLM/image)
                // and presence (the "managed" flag) — never a base URL.
                const data = await res.json();
                set((state)=>{
                    // Merge LLM providers
                    const newProvidersConfig = {
                        ...state.providersConfig
                    };
                    // First reset all server flags
                    for (const pid of Object.keys(newProvidersConfig)){
                        const key = pid;
                        if (newProvidersConfig[key]) {
                            newProvidersConfig[key] = {
                                ...newProvidersConfig[key],
                                isServerConfigured: false,
                                serverModels: undefined
                            };
                        }
                    }
                    // Set flags for server-configured providers
                    for (const [pid, info] of Object.entries(data.providers)){
                        const key = pid;
                        if (newProvidersConfig[key]) {
                            const currentModels = newProvidersConfig[key].models;
                            // When server specifies allowed models, filter the models list
                            // while preserving custom IDs from env/YAML in server order.
                            const currentModelMap = new Map(currentModels.map((m)=>[
                                    m.id,
                                    m
                                ]));
                            const filteredModels = info.models?.length ? info.models.map((id)=>currentModelMap.get(id) ?? {
                                    id,
                                    name: id
                                }) : currentModels;
                            newProvidersConfig[key] = {
                                ...newProvidersConfig[key],
                                isServerConfigured: true,
                                serverModels: info.models,
                                models: filteredModels
                            };
                        }
                    }
                    // Merge TTS providers. Reset both server flags first, then apply:
                    // an entry with `disabled` is force-off (server precedence) and is
                    // NOT treated as managed/configured; any other entry is managed.
                    const newTTSConfig = {
                        ...state.ttsProvidersConfig
                    };
                    for (const pid of Object.keys(newTTSConfig)){
                        const key = pid;
                        if (newTTSConfig[key]) {
                            newTTSConfig[key] = {
                                ...newTTSConfig[key],
                                isServerConfigured: false,
                                serverDisabled: false
                            };
                        }
                    }
                    for (const [pid, info] of Object.entries(data.tts)){
                        const key = pid;
                        if (newTTSConfig[key]) {
                            newTTSConfig[key] = {
                                ...newTTSConfig[key],
                                isServerConfigured: !info.disabled,
                                serverDisabled: info.disabled === true
                            };
                        }
                    }
                    // Merge ASR providers
                    const newASRConfig = {
                        ...state.asrProvidersConfig
                    };
                    for (const pid of Object.keys(newASRConfig)){
                        const key = pid;
                        if (newASRConfig[key]) {
                            newASRConfig[key] = {
                                ...newASRConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.asr)){
                        const key = pid;
                        if (newASRConfig[key]) {
                            newASRConfig[key] = {
                                ...newASRConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge PDF providers
                    const newPDFConfig = {
                        ...state.pdfProvidersConfig
                    };
                    for (const pid of Object.keys(newPDFConfig)){
                        const key = pid;
                        if (newPDFConfig[key]) {
                            newPDFConfig[key] = {
                                ...newPDFConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.pdf)){
                        const key = pid;
                        if (newPDFConfig[key]) {
                            newPDFConfig[key] = {
                                ...newPDFConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge Image providers
                    const newImageConfig = {
                        ...state.imageProvidersConfig
                    };
                    for (const pid of Object.keys(newImageConfig)){
                        const key = pid;
                        if (newImageConfig[key]) {
                            newImageConfig[key] = {
                                ...newImageConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.image)){
                        const key = pid;
                        if (newImageConfig[key]) {
                            newImageConfig[key] = {
                                ...newImageConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge Video providers
                    const newVideoConfig = {
                        ...state.videoProvidersConfig
                    };
                    for (const pid of Object.keys(newVideoConfig)){
                        const key = pid;
                        if (newVideoConfig[key]) {
                            newVideoConfig[key] = {
                                ...newVideoConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    if (data.video) {
                        for (const pid of Object.keys(data.video)){
                            const key = pid;
                            if (newVideoConfig[key]) {
                                newVideoConfig[key] = {
                                    ...newVideoConfig[key],
                                    isServerConfigured: true
                                };
                            }
                        }
                    }
                    // Merge Web Search config — reset all first, then mark server-configured
                    const newWebSearchConfig = {
                        ...state.webSearchProvidersConfig
                    };
                    for (const key of Object.keys(newWebSearchConfig)){
                        newWebSearchConfig[key] = {
                            ...newWebSearchConfig[key],
                            isServerConfigured: false
                        };
                    }
                    if (data.webSearch) {
                        for (const pid of Object.keys(data.webSearch)){
                            const key = pid;
                            if (newWebSearchConfig[key]) {
                                newWebSearchConfig[key] = {
                                    ...newWebSearchConfig[key],
                                    isServerConfigured: true
                                };
                            }
                        }
                    }
                    // === Validate current selections against updated configs ===
                    // Build fallback: server-configured first, then client-key-only
                    const buildFallback = (config)=>[
                            // Server-disabled providers (TTS only) are never fallback targets.
                            ...Object.entries(config).filter(([, c])=>c.isServerConfigured && !c.serverDisabled).map(([id])=>id),
                            ...Object.entries(config).filter(([, c])=>!c.isServerConfigured && !c.serverDisabled && !!c.apiKey).map(([id])=>id)
                        ];
                    const llmFallback = buildFallback(newProvidersConfig);
                    const ttsFallback = buildFallback(newTTSConfig);
                    const asrFallback = buildFallback(newASRConfig);
                    const pdfFallback = buildFallback(newPDFConfig);
                    const imageFallback = buildFallback(newImageConfig);
                    const videoFallback = buildFallback(newVideoConfig);
                    const webSearchFallback = buildFallback(newWebSearchConfig);
                    let validLLMProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.providerId, newProvidersConfig, llmFallback);
                    const validTTSProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.ttsProviderId, newTTSConfig, ttsFallback, 'browser-native-tts');
                    const validASRProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.asrProviderId, newASRConfig, asrFallback, 'browser-native');
                    const validPDFProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.pdfProviderId, newPDFConfig, pdfFallback, 'unpdf');
                    let validImageProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.imageProviderId, newImageConfig, imageFallback);
                    let validVideoProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.videoProviderId, newVideoConfig, videoFallback);
                    const validWebSearchProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.webSearchProviderId, newWebSearchConfig, webSearchFallback, 'tavily');
                    // Auto-recover: when the selected provider is empty/unusable but
                    // a usable one exists, adopt the first usable fallback. Applied
                    // symmetrically to LLM/image/video so that "usable provider ⇒ a
                    // concrete model is selected" holds for every modality (#580).
                    if (!validLLMProvider && llmFallback.length > 0) {
                        validLLMProvider = llmFallback[0];
                    }
                    if (!validImageProvider && imageFallback.length > 0) {
                        validImageProvider = imageFallback[0];
                    }
                    if (!validVideoProvider && videoFallback.length > 0) {
                        validVideoProvider = videoFallback[0];
                    }
                    // Resolve the model in the same place the provider is resolved.
                    // resolveSelectedModel never yields '' when the provider has ≥1
                    // model, so a usable provider can never settle with an empty model.
                    const llmModels = validLLMProvider ? newProvidersConfig[validLLMProvider]?.models ?? [] : [];
                    const validLLMModel = validLLMProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.modelId, llmModels) : '';
                    const imageModels = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[validImageProvider]?.models ?? [];
                    const validImageModel = validImageProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, imageModels) : '';
                    const videoModels = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[validVideoProvider]?.models ?? [];
                    const validVideoModel = validVideoProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, videoModels) : '';
                    const validTTSVoice = validTTSProvider !== state.ttsProviderId ? _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[validTTSProvider] || 'default' : state.ttsVoice;
                    // Auto-disable image/video generation when no provider is usable
                    const shouldDisableImage = !validImageProvider && state.imageGenerationEnabled;
                    const shouldDisableVideo = !validVideoProvider && state.videoGenerationEnabled;
                    // === Auto-select / auto-enable (only on first run) ===
                    let autoTtsProvider;
                    let autoTtsVoice;
                    let autoAsrProvider;
                    let autoPdfProvider;
                    let autoImageProvider;
                    let autoImageModel;
                    let autoVideoProvider;
                    let autoVideoModel;
                    let autoImageEnabled;
                    let autoVideoEnabled;
                    let autoTtsEnabled;
                    if (!state.autoConfigApplied) {
                        // PDF: unpdf → mineru-cloud or mineru if server has it
                        if (state.pdfProviderId === 'unpdf') {
                            if (newPDFConfig['mineru-cloud']?.isServerConfigured) {
                                autoPdfProvider = 'mineru-cloud';
                            } else if (newPDFConfig.mineru?.isServerConfigured) {
                                autoPdfProvider = 'mineru';
                            }
                        }
                        // TTS: select first server provider if current is not server-configured.
                        // Skip server-disabled entries — they are force-off, not selectable.
                        const serverTtsIds = Object.entries(data.tts).filter(([, info])=>!info.disabled).map(([id])=>id);
                        if (serverTtsIds.length > 0 && !newTTSConfig[state.ttsProviderId]?.isServerConfigured) {
                            autoTtsProvider = serverTtsIds[0];
                            autoTtsVoice = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[autoTtsProvider] || 'default';
                        }
                        // Auto-enable TTS on first run when a server provider exists
                        // (mirrors image/video). No provider ⇒ stays off + CTA.
                        if (serverTtsIds.length > 0 && !state.ttsEnabled) {
                            autoTtsEnabled = true;
                        }
                        // ASR: select first server provider if current is not server-configured
                        const serverAsrIds = Object.keys(data.asr);
                        if (serverAsrIds.length > 0 && !newASRConfig[state.asrProviderId]?.isServerConfigured) {
                            autoAsrProvider = serverAsrIds[0];
                        }
                        // Image: first server provider
                        const serverImageIds = Object.keys(data.image);
                        if (serverImageIds.length > 0 && !newImageConfig[state.imageProviderId]?.isServerConfigured) {
                            autoImageProvider = serverImageIds[0];
                            const models = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[autoImageProvider]?.models;
                            if (models?.length) autoImageModel = models[0].id;
                        }
                        if (serverImageIds.length > 0 && !state.imageGenerationEnabled) {
                            autoImageEnabled = true;
                        }
                        // Video: first server provider
                        const serverVideoIds = Object.keys(data.video || {});
                        if (serverVideoIds.length > 0 && !newVideoConfig[state.videoProviderId]?.isServerConfigured) {
                            autoVideoProvider = serverVideoIds[0];
                            const models = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[autoVideoProvider]?.models;
                            if (models?.length) autoVideoModel = models[0].id;
                        }
                        if (serverVideoIds.length > 0 && !state.videoGenerationEnabled) {
                            autoVideoEnabled = true;
                        }
                    }
                    // (LLM first-load auto-select removed: the symmetric provider
                    // recovery + resolveSelectedModel above now resolve LLM provider
                    // and model atomically at the source, covering server-configured
                    // AND client-API-key providers — see #580.)
                    return {
                        providersConfig: newProvidersConfig,
                        ttsProvidersConfig: newTTSConfig,
                        asrProvidersConfig: newASRConfig,
                        pdfProvidersConfig: newPDFConfig,
                        imageProvidersConfig: newImageConfig,
                        videoProvidersConfig: newVideoConfig,
                        webSearchProvidersConfig: newWebSearchConfig,
                        // Already clamped server-side (getParallelSceneConcurrency); this
                        // re-clamp is intentional belt-and-suspenders against a malformed
                        // response. The consumer (use-scene-generator) clamps once more.
                        parallelSceneConcurrency: Math.max(0, Math.floor(data.generation?.parallelSceneConcurrency ?? 0)),
                        autoConfigApplied: true,
                        // Validated selections
                        ...validLLMProvider !== state.providerId && {
                            providerId: validLLMProvider
                        },
                        ...validLLMModel !== state.modelId && {
                            modelId: validLLMModel
                        },
                        ...validTTSProvider !== state.ttsProviderId && {
                            ttsProviderId: validTTSProvider,
                            ttsVoice: validTTSVoice
                        },
                        ...validASRProvider !== state.asrProviderId && {
                            asrProviderId: validASRProvider
                        },
                        ...validPDFProvider !== state.pdfProviderId && {
                            pdfProviderId: validPDFProvider
                        },
                        ...validWebSearchProvider !== state.webSearchProviderId && {
                            webSearchProviderId: validWebSearchProvider
                        },
                        ...validImageProvider !== state.imageProviderId && {
                            imageProviderId: validImageProvider
                        },
                        ...validImageModel !== state.imageModelId && {
                            imageModelId: validImageModel
                        },
                        ...validVideoProvider !== state.videoProviderId && {
                            videoProviderId: validVideoProvider
                        },
                        ...validVideoModel !== state.videoModelId && {
                            videoModelId: validVideoModel
                        },
                        ...shouldDisableImage && {
                            imageGenerationEnabled: false
                        },
                        ...shouldDisableVideo && {
                            videoGenerationEnabled: false
                        },
                        // First-run auto-select overrides validation (autoConfigApplied guard).
                        // On first sync, auto-select picks the best provider. On subsequent syncs,
                        // auto* variables stay undefined so only validation spreads take effect.
                        ...autoPdfProvider && {
                            pdfProviderId: autoPdfProvider
                        },
                        ...autoTtsProvider && {
                            ttsProviderId: autoTtsProvider,
                            ttsVoice: autoTtsVoice
                        },
                        ...autoAsrProvider && {
                            asrProviderId: autoAsrProvider
                        },
                        ...autoImageProvider && {
                            imageProviderId: autoImageProvider
                        },
                        ...autoImageModel && {
                            imageModelId: autoImageModel
                        },
                        ...autoVideoProvider && {
                            videoProviderId: autoVideoProvider
                        },
                        ...autoVideoModel && {
                            videoModelId: autoVideoModel
                        },
                        ...autoImageEnabled !== undefined && {
                            imageGenerationEnabled: autoImageEnabled
                        },
                        ...autoVideoEnabled !== undefined && {
                            videoGenerationEnabled: autoVideoEnabled
                        },
                        ...autoTtsEnabled !== undefined && {
                            ttsEnabled: autoTtsEnabled
                        }
                    };
                });
            } catch (e) {
                // Silently fail — server providers are optional
                log.warn('Failed to fetch server providers:', e);
            }
        }
    };
}, {
    name: 'settings-storage',
    version: 4,
    // Migrate persisted state
    migrate: (persistedState, version)=>{
        const state = persistedState;
        // v0 → v1: clear hardcoded default model so user must actively select
        if (version === 0) {
            if (state.providerId === 'openai' && state.modelId === 'gpt-4o-mini') {
                state.modelId = '';
            }
        }
        // Ensure providersConfig has all built-in providers (also in merge below)
        ensureBuiltInProviders(state);
        promoteLegacyCustomProviderBaseUrls(state);
        // Ensure image/video configs have all built-in providers
        ensureBuiltInImageProviders(state);
        ensureBuiltInVideoProviders(state);
        // Migrate from old ttsModel to new ttsProviderId
        if (state.ttsModel && !state.ttsProviderId) {
            // Map old ttsModel values to new ttsProviderId
            if (state.ttsModel === 'openai-tts') {
                state.ttsProviderId = 'openai-tts';
            } else if (state.ttsModel === 'azure-tts') {
                state.ttsProviderId = 'azure-tts';
            } else {
                // Default to OpenAI
                state.ttsProviderId = 'openai-tts';
            }
        }
        // Add default audio config if missing
        if (!state.ttsProvidersConfig || !state.asrProvidersConfig) {
            const defaultAudioConfig = getDefaultAudioConfig();
            Object.assign(state, defaultAudioConfig);
        }
        ensureBuiltInAudioProviders(state);
        ensureBuiltInWebSearchProviders(state);
        // Migrate global ttsModelId to per-provider
        if (state.ttsModelId) {
            const pid = state.ttsProviderId;
            if (pid && state.ttsProvidersConfig?.[pid]) {
                state.ttsProvidersConfig[pid].modelId = state.ttsModelId;
            }
            delete state.ttsModelId;
        }
        // Same for asrModelId
        if (state.asrModelId) {
            const pid = state.asrProviderId;
            if (pid && state.asrProvidersConfig?.[pid]) {
                state.asrProvidersConfig[pid].modelId = state.asrModelId;
            }
            delete state.asrModelId;
        }
        // Migrate MiniMax's model field to modelId
        for (const [, cfg] of Object.entries(state.ttsProvidersConfig || {})){
            if (cfg.model && !cfg.modelId) {
                cfg.modelId = cfg.model;
                delete cfg.model;
            }
        }
        // Add default PDF config if missing
        if (!state.pdfProvidersConfig) {
            const defaultPDFConfig = getDefaultPDFConfig();
            Object.assign(state, defaultPDFConfig);
        }
        // Add default Image config if missing
        if (!state.imageProvidersConfig) {
            const defaultImageConfig = getDefaultImageConfig();
            Object.assign(state, defaultImageConfig);
        }
        // Add default Video config if missing
        if (!state.videoProvidersConfig) {
            const defaultVideoConfig = getDefaultVideoConfig();
            Object.assign(state, defaultVideoConfig);
        }
        // v1 → v2: Replace deep research with web search
        if (version < 2) {
            delete state.deepResearchProviderId;
            delete state.deepResearchProvidersConfig;
        }
        // Add default media generation toggles if missing
        if (state.imageGenerationEnabled === undefined) {
            state.imageGenerationEnabled = false;
        }
        if (state.videoGenerationEnabled === undefined) {
            state.videoGenerationEnabled = false;
        }
        if (state.reviewOutlineEnabled === undefined) {
            state.reviewOutlineEnabled = false;
        }
        // Add default audio toggles if missing. TTS defaults OFF (opt-in / CTA);
        // first server-sync auto-enables it when a provider is configured (#665).
        if (state.ttsEnabled === undefined) {
            state.ttsEnabled = false;
        }
        if (state.asrEnabled === undefined) {
            state.asrEnabled = true;
        }
        // Existing users already have their config set up — mark auto-config as done
        if (state.autoConfigApplied === undefined) {
            state.autoConfigApplied = true;
        }
        if (state.agentMode === undefined) {
            state.agentMode = 'preset';
        }
        if (state.autoAgentCount === undefined) {
            state.autoAgentCount = 3;
        }
        if (state.thinkingConfigs === undefined) {
            state.thinkingConfigs = {};
        }
        // Migrate Web Search: old flat fields → new provider-based config
        if (!state.webSearchProvidersConfig) {
            const stateRecord = state;
            const oldApiKey = stateRecord.webSearchApiKey || '';
            const oldIsServerConfigured = stateRecord.webSearchIsServerConfigured || false;
            state.webSearchProviderId = 'tavily';
            state.webSearchProvidersConfig = {
                tavily: {
                    apiKey: oldApiKey,
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true,
                    isServerConfigured: oldIsServerConfigured
                },
                bocha: {
                    apiKey: '',
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true
                },
                brave: {
                    apiKey: '',
                    baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.brave.defaultBaseUrl || '',
                    enabled: true,
                    requiresApiKey: false
                },
                baidu: {
                    apiKey: '',
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true
                },
                minimax: {
                    apiKey: '',
                    baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.minimax.defaultBaseUrl || '',
                    enabled: true,
                    requiresApiKey: true
                }
            };
            delete stateRecord.webSearchApiKey;
            delete stateRecord.webSearchIsServerConfigured;
        }
        // v2 → v3: managed providers no longer expose a base URL to the client;
        // drop any persisted serverBaseUrl left over from older versions (#620).
        stripLegacyServerBaseUrl(state);
        // v3 → v4: the per-provider `enabled` flag becomes live under the
        // unified enablement model (#665). Before v4 it was never user-editable,
        // so any persisted value is just a stale default — normalize it:
        // browser-native OFF (opt-in), every other built-in ON (it only surfaces
        // once configured, so a server-managed provider must not stay hidden).
        if (version < 4 && state.ttsProvidersConfig) {
            for (const pid of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF)){
                const cfg = state.ttsProvidersConfig[pid];
                if (cfg) cfg.enabled = pid !== 'browser-native-tts';
            }
        }
        ensureValidProviderSelections(state);
        ensureBuiltInAudioProviders(state);
        ensureBuiltInWebSearchProviders(state);
        state.thinkingConfigs = pruneThinkingConfigs(state.thinkingConfigs, state.providersConfig);
        return state;
    },
    // Custom merge: always sync built-in providers on every rehydrate,
    // so newly added providers/models appear without clearing cache.
    merge: (persistedState, currentState)=>{
        const merged = {
            ...currentState,
            ...persistedState
        };
        ensureBuiltInProviders(merged);
        promoteLegacyCustomProviderBaseUrls(merged);
        ensureBuiltInAudioProviders(merged);
        ensureBuiltInImageProviders(merged);
        ensureBuiltInVideoProviders(merged);
        ensureBuiltInWebSearchProviders(merged);
        ensureValidProviderSelections(merged);
        stripLegacyServerBaseUrl(merged);
        const typedMerged = merged;
        typedMerged.thinkingConfigs = pruneThinkingConfigs(typedMerged.thinkingConfigs, typedMerged.providersConfig);
        return merged;
    }
}));


/***/ }),

/***/ 659497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ IMAGE_PROVIDERS)
/* harmony export */ });
/**
 * Image provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/image-providers.ts: the
 * IMAGE_PROVIDERS config table, with ZERO adapter imports. The dispatchers
 * that call the provider adapters stay in image-providers.ts — the adapters
 * use server-only helpers (openai-image-adapter imports @/lib/server/ssrf-guard,
 * which needs node:dns / node:net for DNS-rebinding protection), and importing
 * them from client modules drags node builtins into browser chunks, which
 * Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)").
 *
 * Client code imports from './image-provider-registry'; server code can use
 * either (image-providers.ts re-exports this registry).
 */ const IMAGE_PROVIDERS = {
    seedream: {
        id: 'seedream',
        name: 'Seedream',
        requiresApiKey: true,
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
        models: [
            {
                id: 'doubao-seedream-5-0-260128',
                name: 'Seedream 5.0 Lite'
            },
            {
                id: 'doubao-seedream-4-5-251128',
                name: 'Seedream 4.5'
            },
            {
                id: 'doubao-seedream-4-0-250828',
                name: 'Seedream 4.0'
            },
            {
                id: 'doubao-seedream-3-0-t2i-250415',
                name: 'Seedream 3.0'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'openai-image': {
        id: 'openai-image',
        name: 'OpenAI Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.openai.com/v1',
        models: [
            {
                id: 'gpt-image-2',
                name: 'GPT Image 2'
            },
            {
                id: 'gpt-image-2-2026-04-21',
                name: 'GPT Image 2 (2026-04-21)'
            },
            {
                id: 'gpt-image-1.5',
                name: 'GPT Image 1.5'
            },
            {
                id: 'gpt-image-1',
                name: 'GPT Image 1'
            },
            {
                id: 'gpt-image-1-mini',
                name: 'GPT Image 1 Mini'
            },
            {
                id: 'chatgpt-image-latest',
                name: 'ChatGPT Image Latest'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'qwen-image': {
        id: 'qwen-image',
        name: 'Qwen Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com',
        models: [
            {
                id: 'qwen-image-2.0-pro',
                name: 'Qwen Image 2.0 Pro'
            },
            {
                id: 'qwen-image-2.0-pro-2026-03-03',
                name: 'Qwen Image 2.0 Pro (2026-03-03)'
            },
            {
                id: 'qwen-image-2.0',
                name: 'Qwen Image 2.0'
            },
            {
                id: 'qwen-image-2.0-2026-03-03',
                name: 'Qwen Image 2.0 (2026-03-03)'
            },
            {
                id: 'qwen-image-max',
                name: 'Qwen Image Max'
            },
            {
                id: 'qwen-image-max-2025-12-30',
                name: 'Qwen Image Max (2025-12-30)'
            },
            {
                id: 'qwen-image-plus',
                name: 'Qwen Image Plus'
            },
            {
                id: 'qwen-image-plus-2026-01-09',
                name: 'Qwen Image Plus (2026-01-09)'
            },
            {
                id: 'qwen-image',
                name: 'Qwen Image'
            },
            {
                id: 'z-image-turbo',
                name: 'Z-Image Turbo'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'nano-banana': {
        id: 'nano-banana',
        name: 'Nano Banana (Gemini)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        models: [
            {
                id: 'gemini-3.1-flash-image-preview',
                name: 'Gemini 3.1 Flash Image (Nano Banana 2)'
            },
            {
                id: 'gemini-3-pro-image-preview',
                name: 'Gemini 3 Pro Image (Nano Banana Pro)'
            },
            {
                id: 'gemini-2.5-flash-image',
                name: 'Gemini 2.5 Flash Image (Nano Banana)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1'
        ]
    },
    'minimax-image': {
        id: 'minimax-image',
        name: 'MiniMax Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        models: [
            {
                id: 'image-01',
                name: 'Image 01'
            },
            {
                id: 'image-01-live',
                name: 'Image 01 Live'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'grok-image': {
        id: 'grok-image',
        name: 'Grok Image (xAI)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.x.ai/v1',
        models: [
            {
                id: 'grok-imagine-image',
                name: 'Grok Imagine Image'
            },
            {
                id: 'grok-imagine-image-pro',
                name: 'Grok Imagine Image Pro'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    lemonade: {
        id: 'lemonade',
        name: 'Lemonade',
        requiresApiKey: false,
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: '/logos/lemonade.svg',
        models: [
            {
                id: 'Qwen-Image-GGUF',
                name: 'Qwen Image GGUF'
            },
            {
                id: 'sd-cpp',
                name: 'Stable Diffusion (sd-cpp)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ],
        maxResolution: {
            width: 1024,
            height: 1024
        }
    },
    zai: {
        id: 'zai',
        name: 'ZAI (built-in)',
        // No USER-supplied key needed — credentials come from the platform
        // (.z-ai-config / ZAI_API_KEY) resolved server-side. This is the
        // out-of-the-box provider on ZAI deployments.
        requiresApiKey: false,
        models: [
            {
                id: 'auto',
                name: 'Auto (platform picks)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    }
};


/***/ }),

/***/ 732823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ create)
/* harmony export */ });
/* unused harmony export useStore */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(391986);
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(258543);



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

/***/ 745810:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vf: () => (/* binding */ WEB_SEARCH_PROVIDERS)
/* harmony export */ });
/* unused harmony exports BAIDU_SUB_SOURCES, getWebSearchProviderDisplayName, getAllWebSearchProviders */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/web-search/constants.ts
 *
 * Web Search Provider Constants — verbatim port.
 *
 * OpenMAIC's `lib/web-search/types.ts` defines `WebSearchProviderId` as
 * a union of the five IDs in `WEB_SEARCH_PROVIDERS` below. MedQ's
 * `lib/web-search/types.ts` extends that union with `'zai'` (MedQ's
 * first-class web-search provider) but keeps the OpenMAIC IDs so ported
 * code that switches on provider ID compiles unchanged.
 *
 * This constants file is pure data — no side-effect imports — so it is
 * ported verbatim. MedQ's runtime web-search route (which uses ZAI's
 * `functions.web_search` exclusively) never consults this registry; it
 * is here only so the ported settings store can populate the
 * `webSearchProvidersConfig` defaults on rehydrate.
 */ /**
 * Web Search Provider Registry
 */ const WEB_SEARCH_PROVIDERS = {
    tavily: {
        id: 'tavily',
        name: 'Tavily',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.tavily.com',
        endpointPath: '/search',
        icon: '/logos/tavily.svg'
    },
    bocha: {
        id: 'bocha',
        name: 'Bocha',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.bocha.cn',
        endpointPath: '/v1/web-search',
        icon: '/logos/bocha.png'
    },
    brave: {
        id: 'brave',
        name: 'Brave Search',
        requiresApiKey: false,
        defaultBaseUrl: 'https://search.brave.com',
        endpointPath: '/search',
        icon: '/logos/brave.png'
    },
    baidu: {
        id: 'baidu',
        name: 'Baidu',
        requiresApiKey: true,
        defaultBaseUrl: 'https://qianfan.baidubce.com',
        endpointPath: '/v2/ai_search/web_search',
        icon: '/logos/baidu.png'
    },
    minimax: {
        id: 'minimax',
        name: 'MiniMax',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        endpointPath: '/v1/coding_plan/search',
        icon: '/logos/minimax.svg'
    },
    // `zai` is MedQ-only — the OpenMAIC source does not include this entry.
    // MedQ's runtime web-search route uses ZAI's `functions.web_search`
    // exclusively; this registry entry exists only so the type
    // `Record<WebSearchProviderId, WebSearchProviderConfig>` (which MedQ's
    // types.ts extends with `'zai'`) compiles. The default base URL points
    // at the ZAI SDK; the operator's .z-ai-config supplies the actual
    // credentials at runtime.
    zai: {
        id: 'zai',
        name: 'ZAI',
        requiresApiKey: false,
        defaultBaseUrl: 'https://api.z.ai/api/paas/v4',
        endpointPath: '/functions/web_search',
        icon: '/logos/zai.svg'
    }
};
/**
 * Baidu sub-source metadata. Used by the settings UI to label each
 * toggle. MedQ's ZAI adapter does not support Baidu sub-sources; the
 * field is accepted but ignored at the API level.
 */ const BAIDU_SUB_SOURCES = {
    webSearch: {
        labelKey: 'settings.baiduSubSourceWeb',
        descriptionKey: 'settings.baiduSubSourceWebDescription',
        docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Mmh4sv6ec'
    },
    baike: {
        labelKey: 'settings.baiduSubSourceBaike',
        descriptionKey: 'settings.baiduSubSourceBaikeDescription',
        docsUrl: 'https://ai.baidu.com/ai-doc/AppBuilder/rmckc6mtu'
    },
    scholar: {
        labelKey: 'settings.baiduSubSourceScholar',
        descriptionKey: 'settings.baiduSubSourceScholarDescription',
        docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Amkw9qpzd'
    }
};
/**
 * Get the display name for a web search provider. Pure helper, ported
 * verbatim — the optional translator function `t` is passed through
 * unchanged so ported call sites continue to compile.
 */ function getWebSearchProviderDisplayName(providerId, t) {
    const provider = WEB_SEARCH_PROVIDERS[providerId];
    if (!provider) return providerId;
    if (t) {
        const key = `settings.providerNames.${providerId}`;
        const translated = t(key);
        if (translated && translated !== key) return translated;
    }
    return provider.name;
}
/**
 * Get all available web search providers.
 */ function getAllWebSearchProviders() {
    return Object.values(WEB_SEARCH_PROVIDERS);
}


/***/ }),

/***/ 837653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sP: () => (/* binding */ PDF_PROVIDERS)
/* harmony export */ });
/* unused harmony exports MINERU_CLOUD_DEFAULT_BASE, getAllPDFProviders, getPDFProvider */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pdf/constants.ts
 *
 * Verbatim port — only the import path is adapted (`./types` is unchanged
 * because the directory layout matches OpenMAIC's). The constants are pure
 * data and self-contained.
 */ const MINERU_CLOUD_DEFAULT_BASE = 'https://mineru.net/api/v4';
/**
 * PDF Provider Registry
 */ const PDF_PROVIDERS = {
    unpdf: {
        id: 'unpdf',
        name: 'unpdf',
        requiresApiKey: false,
        icon: '/logos/unpdf.svg',
        features: [
            'text',
            'images',
            'metadata'
        ]
    },
    mineru: {
        id: 'mineru',
        name: 'MinerU',
        requiresApiKey: false,
        icon: '/logos/mineru.png',
        features: [
            'text',
            'images',
            'tables',
            'formulas',
            'layout-analysis'
        ]
    },
    'mineru-cloud': {
        id: 'mineru-cloud',
        name: 'MinerU (Cloud)',
        requiresApiKey: true,
        icon: '/logos/mineru.png',
        features: [
            'text',
            'images',
            'tables',
            'formulas',
            'layout-analysis'
        ]
    }
};
/**
 * Get all available PDF providers
 */ function getAllPDFProviders() {
    return Object.values(PDF_PROVIDERS);
}
/**
 * Get PDF provider by ID
 */ function getPDFProvider(providerId) {
    return PDF_PROVIDERS[providerId];
}


/***/ })

};
;