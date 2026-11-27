(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[86187],{

/***/ 2708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ resolveTaskEngineModeFromOutlineDoneEvent)
/* harmony export */ });
function resolveTaskEngineModeFromOutlineDoneEvent(event) {
    return event.taskEngineMode === true || event.effectiveTaskEngineMode === true;
}


/***/ }),

/***/ 10267:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ getCurrentModelConfig)
/* harmony export */ });
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75748);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13395);


/**
 * Get current model configuration from settings store
 */ function getCurrentModelConfig() {
    const { providerId, modelId, providersConfig, thinkingConfigs } = _lib_store_settings__WEBPACK_IMPORTED_MODULE_0__.useSettingsStore.getState();
    const modelString = `${providerId}:${modelId}`;
    // Get current provider's config
    const providerConfig = providersConfig[providerId];
    const modelInfo = providerConfig?.models.find((model)=>model.id === modelId);
    const thinking = modelInfo?.capabilities?.thinking;
    const thinkingConfig = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_1__/* .supportsConfigurableThinking */ .yW)(thinking) ? (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_1__/* .normalizeThinkingConfig */ .SZ)(thinking, thinkingConfigs[(0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_1__/* .getThinkingConfigKey */ .UL)(providerId, modelId)]) : undefined;
    return {
        providerId,
        modelId,
        modelString,
        apiKey: providerConfig?.apiKey || '',
        baseUrl: providerConfig?.baseUrl || '',
        providerType: providerConfig?.type,
        requiresApiKey: providerConfig?.requiresApiKey,
        isServerConfigured: providerConfig?.isServerConfigured,
        thinkingConfig
    };
}


/***/ }),

/***/ 15793:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ useStageStore)
/* harmony export */ });
/* unused harmony export PENDING_SCENE_ID */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41535);
/* harmony import */ var _lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25398);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7603);
/* harmony import */ var _lib_store_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55541);
/* harmony import */ var _lib_edit_slide_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23819);





const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('StageStore');
/** Virtual scene ID used when the user navigates to a page still being generated */ const PENDING_SCENE_ID = '__pending__';
// ==================== Debounce Helper ====================
/**
 * Debounce function to limit how often a function is called
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 */ function debounce(func, delay) {
    let timeoutId = null;
    return (...args)=>{
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{
            func(...args);
            timeoutId = null;
        }, delay);
    };
}
const useStageStoreBase = (0,zustand__WEBPACK_IMPORTED_MODULE_2__/* .create */ .v)()((set, get)=>({
        // Initial state
        stage: null,
        scenes: [],
        currentSceneId: null,
        chats: [],
        mode: 'playback',
        toolbarState: 'ai',
        generatingOutlines: [],
        outlines: [],
        generationComplete: false,
        generationEpoch: 0,
        generationStatus: 'idle',
        currentGeneratingOrder: -1,
        failedOutlines: [],
        // Actions
        setStage: (stage)=>{
            set((s)=>({
                    stage,
                    scenes: [],
                    currentSceneId: null,
                    chats: [],
                    generationComplete: false,
                    generationEpoch: s.generationEpoch + 1
                }));
            debouncedSave();
        },
        setScenes: (scenes)=>{
            // Funnel through migrateScene so any incoming slide content lacking
            // a schemaVersion (API / snapshot / legacy) is normalized once at
            // the store boundary.
            const migrated = scenes.map(_lib_edit_slide_schema__WEBPACK_IMPORTED_MODULE_3__/* .migrateScene */ ._b);
            set({
                scenes: migrated
            });
            // Auto-select first scene if no current scene
            if (!get().currentSceneId && migrated.length > 0) {
                set({
                    currentSceneId: migrated[0].id
                });
            }
            debouncedSave();
        },
        addScene: (scene)=>{
            const currentStage = get().stage;
            // Ignore scenes from different stages (prevents race condition during generation)
            if (!currentStage || scene.stageId !== currentStage.id) {
                log.warn(`Ignoring scene "${scene.title}" - stageId mismatch (scene: ${scene.stageId}, current: ${currentStage?.id})`);
                return;
            }
            const scenes = [
                ...get().scenes,
                (0,_lib_edit_slide_schema__WEBPACK_IMPORTED_MODULE_3__/* .migrateScene */ ._b)(scene)
            ];
            // Remove the matching outline from generatingOutlines (match by order)
            const generatingOutlines = get().generatingOutlines.filter((o)=>o.order !== scene.order);
            // Auto-switch from pending page to the newly generated scene
            const shouldSwitch = get().currentSceneId === PENDING_SCENE_ID;
            set({
                scenes,
                generatingOutlines,
                ...shouldSwitch ? {
                    currentSceneId: scene.id
                } : {}
            });
            debouncedSave();
        },
        insertSceneAfter: (anchorSceneId, scene)=>{
            // Pro mode slide management entry point — inserts after the anchor and
            // rebalances `order` so PPTX export / array position stay consistent.
            // Edit mode is gated against active regeneration (see useEditModeLock),
            // so rewriting `order` here is safe — no outline matcher is racing us.
            const currentStage = get().stage;
            if (!currentStage || scene.stageId !== currentStage.id) {
                log.warn(`insertSceneAfter ignored "${scene.title}" - stageId mismatch (scene: ${scene.stageId}, current: ${currentStage?.id})`);
                return;
            }
            const current = get().scenes;
            const anchorIndex = current.findIndex((s)=>s.id === anchorSceneId);
            const insertIndex = anchorIndex < 0 ? current.length : anchorIndex + 1;
            const migrated = (0,_lib_edit_slide_schema__WEBPACK_IMPORTED_MODULE_3__/* .migrateScene */ ._b)(scene);
            const next = [
                ...current.slice(0, insertIndex),
                migrated,
                ...current.slice(insertIndex)
            ];
            const rebalanced = next.map((s, i)=>s.order === i + 1 ? s : {
                    ...s,
                    order: i + 1
                });
            set({
                scenes: rebalanced
            });
            debouncedSave();
        },
        updateScene: (sceneId, updates)=>{
            const scenes = get().scenes.map((scene)=>scene.id === sceneId ? {
                    ...scene,
                    ...updates
                } : scene);
            set({
                scenes
            });
            debouncedSave();
        },
        deleteScene: (sceneId)=>{
            // A deck that is complete right now (every outline has a scene) stays
            // complete after a deletion. Capture that BEFORE removing the scene so the
            // completion (end) page and resume-suppression survive even for decks whose
            // generationComplete flag was never recorded — e.g. generated before the
            // flag existed, or edited without a reload so loadFromStorage's self-heal
            // never ran. Without this, the deletion breaks the scenes===outlines count
            // and the "Course complete" page disappears.
            const wasComplete = !get().generationComplete && get().outlines.length > 0 && get().failedOutlines.length === 0 && get().outlines.every((o)=>get().scenes.some((s)=>s.order === o.order));
            const scenes = get().scenes.filter((scene)=>scene.id !== sceneId);
            const currentSceneId = get().currentSceneId;
            // If deleted scene was current, select next or previous
            if (currentSceneId === sceneId) {
                const index = get().getSceneIndex(sceneId);
                const newIndex = index < scenes.length ? index : scenes.length - 1;
                set({
                    scenes,
                    currentSceneId: scenes[newIndex]?.id || null
                });
            } else {
                set({
                    scenes
                });
            }
            if (wasComplete) get().setGenerationComplete(true);
            debouncedSave();
        },
        setCurrentSceneId: (sceneId)=>{
            set({
                currentSceneId: sceneId
            });
            debouncedSave();
        },
        setChats: (chats)=>{
            set({
                chats
            });
            debouncedSave();
        },
        setMode: (mode)=>{
            const previousMode = get().mode;
            set({
                mode
            });
            if (previousMode === 'edit' && mode !== 'edit') {
                _lib_store_canvas__WEBPACK_IMPORTED_MODULE_1__/* .useCanvasStore */ .F.getState().resetCanvasState();
            }
        },
        setToolbarState: (toolbarState)=>set({
                toolbarState
            }),
        setGeneratingOutlines: (generatingOutlines)=>set({
                generatingOutlines
            }),
        setOutlines: (outlines)=>{
            set({
                outlines
            });
            // Persist outlines to IndexedDB. Carry generationComplete so writing
            // outlines never clobbers a previously-recorded completion flag.
            const stageId = get().stage?.id;
            if (stageId) {
                const generationComplete = get().generationComplete;
                Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 29732)).then(({ db })=>{
                    db.stageOutlines.put({
                        stageId,
                        outlines,
                        generationComplete,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    });
                });
            }
        },
        setGenerationComplete: (generationComplete)=>{
            set({
                generationComplete
            });
            // Persist alongside the outlines record so resume-on-mount can read it.
            const stageId = get().stage?.id;
            if (stageId) {
                const outlines = get().outlines;
                // Flush the current scenes BEFORE recording completion, and only record
                // it once that flush is verified. Scenes save through a 500ms debounce,
                // so writing the flag eagerly could let a reload see
                // generationComplete=true with the final slide still unsaved — which
                // would then be suppressed (not pending) and lost. If the scene flush
                // fails, skip the flag: the deck stays resumable and recovers on reload.
                void get().saveToStorage().then((saved)=>{
                    if (!saved) return;
                    return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 29732)).then(({ db })=>{
                        db.stageOutlines.put({
                            stageId,
                            outlines,
                            generationComplete,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        });
                    });
                });
            }
        },
        markGenerationCompleteIfDone: ()=>{
            const { outlines, scenes, failedOutlines, generationComplete } = get();
            if (generationComplete) return;
            const done = outlines.length > 0 && failedOutlines.length === 0 && outlines.every((o)=>scenes.some((s)=>s.order === o.order));
            if (done) get().setGenerationComplete(true);
        },
        setGenerationStatus: (generationStatus)=>set({
                generationStatus
            }),
        setCurrentGeneratingOrder: (currentGeneratingOrder)=>set({
                currentGeneratingOrder
            }),
        bumpGenerationEpoch: ()=>set((s)=>({
                    generationEpoch: s.generationEpoch + 1
                })),
        addFailedOutline: (outline)=>{
            const existed = get().failedOutlines.some((o)=>o.id === outline.id);
            if (existed) return;
            set({
                failedOutlines: [
                    ...get().failedOutlines,
                    outline
                ]
            });
        },
        clearFailedOutlines: ()=>set({
                failedOutlines: []
            }),
        retryFailedOutline: (outlineId)=>{
            set({
                failedOutlines: get().failedOutlines.filter((o)=>o.id !== outlineId)
            });
        },
        // Getters
        getCurrentScene: ()=>{
            const { scenes, currentSceneId } = get();
            if (!currentSceneId) return null;
            return scenes.find((s)=>s.id === currentSceneId) || null;
        },
        getSceneById: (sceneId)=>{
            return get().scenes.find((s)=>s.id === sceneId) || null;
        },
        getSceneIndex: (sceneId)=>{
            return get().scenes.findIndex((s)=>s.id === sceneId);
        },
        // Storage methods. Returns true on a verified write so callers that gate on
        // durability (e.g. setGenerationComplete) can avoid recording state that
        // outruns the scene data.
        saveToStorage: async ()=>{
            const { stage, scenes, currentSceneId, chats } = get();
            if (!stage?.id) {
                log.warn('Cannot save: stage.id is required');
                return false;
            }
            try {
                const { saveStageData } = await __webpack_require__.e(/* import() */ 14037).then(__webpack_require__.bind(__webpack_require__, 14037));
                await saveStageData(stage.id, {
                    stage,
                    scenes,
                    currentSceneId,
                    chats
                });
                return true;
            } catch (error) {
                log.error('Failed to save to storage:', error);
                return false;
            }
        },
        loadFromStorage: async (stageId)=>{
            try {
                // Skip IndexedDB load if the store already has this stage with scenes
                // (e.g. navigated from generation-preview with fresh in-memory data)
                const currentState = get();
                if (currentState.stage?.id === stageId && currentState.scenes.length > 0) {
                    log.info('Stage already loaded in memory, skipping IndexedDB load:', stageId);
                    return;
                }
                const { loadStageData } = await __webpack_require__.e(/* import() */ 14037).then(__webpack_require__.bind(__webpack_require__, 14037));
                const data = await loadStageData(stageId);
                // Load outlines for resume-on-refresh
                const { db } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 29732));
                const outlinesRecord = await db.stageOutlines.get(stageId);
                const outlines = outlinesRecord?.outlines || [];
                const persistedComplete = outlinesRecord?.generationComplete ?? false;
                if (data) {
                    // Normalize legacy slide content (missing schemaVersion) at the load
                    // boundary, same as setScenes/addScene — IndexedDB snapshots predate
                    // the schema field, so they must be migrated on the way in.
                    const migrated = data.scenes.map(_lib_edit_slide_schema__WEBPACK_IMPORTED_MODULE_3__/* .migrateScene */ ._b);
                    // Self-heal decks generated before generationComplete was tracked: if
                    // every outline already has a matching scene, generation must have
                    // finished, so treat the deck as complete and persist the flag. This
                    // prevents a pre-existing finished deck from regenerating a slide the
                    // user deletes before the flag was ever recorded.
                    //
                    // Matching is by `order`, consistent with the rest of the resume
                    // pipeline. For a never-edited deck order is a faithful key; the only
                    // way it diverges is Pro-mode insert/reorder, which is blocked while
                    // outlines are still pending (see stage-mode edit gating), so an
                    // interrupted deck cannot be edited into a false "all materialized".
                    const allMaterialized = outlines.length > 0 && outlines.every((o)=>migrated.some((s)=>s.order === o.order));
                    const generationComplete = persistedComplete || allMaterialized;
                    if (generationComplete && !persistedComplete) {
                        db.stageOutlines.put({
                            stageId,
                            outlines,
                            generationComplete: true,
                            createdAt: outlinesRecord?.createdAt ?? Date.now(),
                            updatedAt: Date.now()
                        });
                    }
                    set({
                        stage: data.stage,
                        scenes: migrated,
                        currentSceneId: data.currentSceneId,
                        chats: data.chats,
                        outlines,
                        generationComplete,
                        // Compute generatingOutlines from persisted outlines minus completed
                        // scenes. Once generation is complete the deck is frozen for editing,
                        // so an orphaned outline (e.g. from a deleted slide) must NOT surface
                        // as a pending placeholder or drive resume regeneration.
                        generatingOutlines: generationComplete ? [] : outlines.filter((o)=>!migrated.some((s)=>s.order === o.order)),
                        // `mode` is transient UI state, not persisted with the stage.
                        // Reset to 'playback' on every load so SPA navigation between
                        // classrooms doesn't carry Pro-mode state across — e.g. user
                        // enters edit in A, navigates to B → B was inheriting
                        // mode='edit'. Refresh already reset via initial store value;
                        // this normalises the SPA path to match.
                        mode: 'playback'
                    });
                    log.info('Loaded from storage:', stageId);
                } else {
                    log.warn('No data found for stage:', stageId);
                }
            } catch (error) {
                log.error('Failed to load from storage:', error);
                throw error;
            }
        },
        clearStore: ()=>{
            set((s)=>({
                    stage: null,
                    scenes: [],
                    currentSceneId: null,
                    chats: [],
                    outlines: [],
                    generationComplete: false,
                    generationEpoch: s.generationEpoch + 1,
                    generationStatus: 'idle',
                    currentGeneratingOrder: -1,
                    failedOutlines: [],
                    generatingOutlines: []
                }));
            log.info('Store cleared');
        }
    }));
const useStageStore = (0,_lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_4__/* .createSelectors */ .L)(useStageStoreBase);
// ==================== Debounced Save ====================
/**
 * Debounced version of saveToStorage to prevent excessive writes
 * Waits 500ms after the last change before saving
 */ const debouncedSave = debounce(()=>{
    useStageStore.getState().saveToStorage();
}, 500);


/***/ }),

/***/ 23819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _b: () => (/* binding */ migrateScene)
/* harmony export */ });
/* unused harmony exports CURRENT_SLIDE_CONTENT_SCHEMA_VERSION, migrateSlideContent */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/slide-schema.ts
 *
 * SlideContent schema versioning. Slide-surface PRs will iterate the
 * on-disk shape; this module is the single chokepoint for normalizing
 * any incoming SlideContent (API response, snapshot restore, future
 * localStorage restore, PPTX reimport) to the current version.
 */ const CURRENT_SLIDE_CONTENT_SCHEMA_VERSION = 1;
function migrateSlideContent(content) {
    // Forward-compatibility: if a future client has written content with a
    // newer schemaVersion than we know about, return it untouched rather
    // than silently downgrading.
    if (content.schemaVersion !== undefined && content.schemaVersion >= CURRENT_SLIDE_CONTENT_SCHEMA_VERSION) {
        return content;
    }
    return {
        ...content,
        schemaVersion: CURRENT_SLIDE_CONTENT_SCHEMA_VERSION
    };
}
/**
 * Top-level scene migrator — dispatches by scene-content type.
 */ function migrateScene(scene) {
    const migratedContent = migrateSceneContent(scene.content);
    if (migratedContent === scene.content) {
        return scene;
    }
    return {
        ...scene,
        content: migratedContent
    };
}
function migrateSceneContent(content) {
    if (content.type === 'slide') {
        return migrateSlideContent(content);
    }
    return content;
}


/***/ }),

/***/ 25398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ createSelectors)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/create-selectors.ts
 */ const createSelectors = (_store)=>{
    const store = _store;
    store.use = {};
    for (const k of Object.keys(store.getState())){
        store.use[k] = ()=>store((s)=>s[k]);
    }
    return store;
};


/***/ }),

/***/ 28136:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 98111));


/***/ }),

/***/ 39371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ MAX_VISION_IMAGES),
/* harmony export */   k: () => (/* binding */ MAX_PDF_CONTENT_CHARS)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/constants/generation.ts
 *
 * Constants for PDF content generation, shared between client and server code.
 */ // PDF content truncation limit (characters)
const MAX_PDF_CONTENT_CHARS = 50000;
// Maximum number of images to send as vision content parts
const MAX_VISION_IMAGES = 20;


/***/ }),

/***/ 45801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ getActiveSteps),
/* harmony export */   u: () => (/* binding */ ALL_STEPS)
/* harmony export */ });
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58011);
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58650);
/* harmony import */ var _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70924);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75748);


const ALL_STEPS = [
    {
        id: 'pdf-analysis',
        title: 'generation.analyzingPdf',
        description: 'generation.analyzingPdfDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,
        type: 'analysis'
    },
    {
        id: 'web-search',
        title: 'generation.webSearching',
        description: 'generation.webSearchingDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A,
        type: 'analysis'
    },
    {
        id: 'outline',
        title: 'generation.generatingOutlines',
        description: 'generation.generatingOutlinesDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,
        type: 'writing'
    },
    {
        id: 'agent-generation',
        title: 'generation.agentGeneration',
        description: 'generation.agentGenerationDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        type: 'writing'
    },
    {
        id: 'slide-content',
        title: 'generation.generatingSlideContent',
        description: 'generation.generatingSlideContentDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
        type: 'visual'
    },
    {
        id: 'actions',
        title: 'generation.generatingActions',
        description: 'generation.generatingActionsDesc',
        icon: _barrel_optimize_names_Bot_Clapperboard_FileText_LayoutPanelLeft_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        type: 'visual'
    }
];
const getActiveSteps = (session)=>{
    return ALL_STEPS.filter((step)=>{
        if (step.id === 'pdf-analysis') return !!session?.pdfStorageKey;
        if (step.id === 'web-search') return !!session?.requirements?.webSearch;
        if (step.id === 'agent-generation') return _lib_store_settings__WEBPACK_IMPORTED_MODULE_0__.useSettingsStore.getState().agentMode === 'auto';
        return true;
    });
};


/***/ }),

/***/ 55541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ useCanvasStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41535);
/* harmony import */ var _lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25398);
/* harmony import */ var _lib_prosemirror_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77627);



// ==================== Initial State ====================
const initialState = {
    // Element selection
    activeElementIdList: [],
    handleElementId: '',
    activeGroupElementId: '',
    editingElementId: '',
    hiddenElementIdList: [],
    // Canvas viewport
    canvasScale: 1,
    canvasPercentage: 90,
    viewportSize: 1000,
    viewportRatio: 0.5625,
    canvasDragged: false,
    // Display aids
    showRuler: false,
    gridLineSize: 0,
    // Toolbar and panels
    toolbarState: 'ai',
    showSelectPanel: false,
    showSearchPanel: false,
    // Element creation
    creatingElement: null,
    creatingCustomShape: false,
    // Editing state
    isScaling: false,
    clipingImageElementId: '',
    richTextAttrs: _lib_prosemirror_utils__WEBPACK_IMPORTED_MODULE_0__/* .defaultRichTextAttrs */ .pq,
    // Format painter
    textFormatPainter: null,
    shapeFormatPainter: null,
    // Video playback
    playingVideoElementId: '',
    // Whiteboard
    whiteboardOpen: false,
    whiteboardClearing: false,
    // Other: false,
    editorAreaFocus: false,
    thumbnailsFocus: false,
    disableHotkeys: false,
    selectedTableCells: [],
    // Teaching features
    spotlightElementId: '',
    spotlightOptions: null,
    spotlightMode: 'pixel',
    spotlightPercentageGeometry: null,
    highlightedElementIds: [],
    highlightOptions: null,
    laserElementId: '',
    laserOptions: null,
    zoomTarget: null,
    pickTarget: null
};
// ==================== Store Implementation ====================
const useCanvasStoreBase = (0,zustand__WEBPACK_IMPORTED_MODULE_1__/* .create */ .v)((set, get)=>({
        ...initialState,
        // ===== Element Selection Actions =====
        setActiveElementIdList: (ids)=>{
            set({
                activeElementIdList: ids
            });
            // Auto-set handleElementId: set to that element for single select, empty for multi-select or none
            if (ids.length === 1) {
                set({
                    handleElementId: ids[0]
                });
            } else if (ids.length === 0) {
                set({
                    handleElementId: ''
                });
            }
            // Auto-switch to design panel when elements are selected
            if (ids.length > 0) {
                set({
                    toolbarState: 'design'
                });
            }
        },
        setHandleElementId: (id)=>set({
                handleElementId: id
            }),
        setActiveGroupElementId: (id)=>set({
                activeGroupElementId: id
            }),
        setEditingElementId: (id)=>set({
                editingElementId: id
            }),
        setHiddenElementIdList: (ids)=>set({
                hiddenElementIdList: ids
            }),
        clearSelection: ()=>{
            set({
                activeElementIdList: [],
                handleElementId: '',
                activeGroupElementId: '',
                editingElementId: ''
            });
        },
        // ===== Canvas Viewport Actions =====
        setCanvasScale: (scale)=>set({
                canvasScale: scale
            }),
        setCanvasPercentage: (percentage)=>set({
                canvasPercentage: percentage
            }),
        setViewportSize: (size)=>set({
                viewportSize: size
            }),
        setViewportRatio: (ratio)=>set({
                viewportRatio: ratio
            }),
        setCanvasDragged: (dragged)=>set({
                canvasDragged: dragged
            }),
        // ===== Display Aids Actions =====
        setRulerState: (show)=>set({
                showRuler: show
            }),
        setGridLineSize: (size)=>set({
                gridLineSize: size
            }),
        // ===== Toolbar and Panel Actions =====
        setToolbarState: (toolbarState)=>set({
                toolbarState
            }),
        setSelectPanelState: (show)=>set({
                showSelectPanel: show
            }),
        setSearchPanelState: (show)=>set({
                showSearchPanel: show
            }),
        // ===== Element Creation Actions =====
        setCreatingElement: (element)=>set({
                creatingElement: element
            }),
        setCreatingCustomShapeState: (creating)=>set({
                creatingCustomShape: creating
            }),
        // ===== Editing State Actions =====
        setScalingState: (isScaling)=>set({
                isScaling
            }),
        setClipingImageElementId: (id)=>set({
                clipingImageElementId: id
            }),
        setRichtextAttrs: (attrs)=>set({
                richTextAttrs: attrs
            }),
        // ===== Format Painter Actions =====
        setTextFormatPainter: (painter)=>set({
                textFormatPainter: painter
            }),
        setShapeFormatPainter: (painter)=>set({
                shapeFormatPainter: painter
            }),
        // ===== Video Playback Actions =====
        playVideo: (elementId)=>set({
                playingVideoElementId: elementId
            }),
        pauseVideo: ()=>set({
                playingVideoElementId: ''
            }),
        // ===== Whiteboard Actions =====
        setWhiteboardOpen: (open)=>set({
                whiteboardOpen: open
            }),
        setWhiteboardClearing: (clearing)=>set({
                whiteboardClearing: clearing
            }),
        // ===== Other Actions =====
        setThumbnailsFocus: (focus)=>set({
                thumbnailsFocus: focus
            }),
        setEditorAreaFocus: (focus)=>set({
                editorAreaFocus: focus
            }),
        setDisableHotkeysState: (disable)=>set({
                disableHotkeys: disable
            }),
        setSelectedTableCells: (cells)=>set({
                selectedTableCells: cells
            }),
        // ===== Teaching Feature Actions =====
        setSpotlight: (elementId, options = {})=>{
            set({
                spotlightElementId: elementId,
                spotlightMode: 'pixel',
                spotlightOptions: {
                    radius: 200,
                    dimness: 0.7,
                    transition: 300,
                    ...options
                },
                spotlightPercentageGeometry: null
            });
        },
        setSpotlightPercentage: (elementId, geometry, options = {})=>{
            set({
                spotlightElementId: elementId,
                spotlightMode: 'percentage',
                spotlightPercentageGeometry: geometry,
                spotlightOptions: {
                    dimness: 0.7,
                    transition: 300,
                    ...options
                }
            });
        },
        clearSpotlight: ()=>{
            set({
                spotlightElementId: '',
                spotlightOptions: null,
                spotlightMode: 'pixel',
                spotlightPercentageGeometry: null
            });
        },
        setHighlight: (elementIds, options = {})=>{
            set({
                highlightedElementIds: elementIds,
                highlightOptions: {
                    color: '#ff6b6b',
                    opacity: 0.3,
                    borderWidth: 3,
                    animated: true,
                    ...options
                }
            });
        },
        clearHighlight: ()=>{
            set({
                highlightedElementIds: [],
                highlightOptions: null
            });
        },
        setLaser: (elementId, options = {})=>{
            set({
                laserElementId: elementId,
                laserOptions: {
                    color: '#ff0000',
                    duration: 3000,
                    ...options
                }
            });
        },
        clearLaser: ()=>{
            set({
                laserElementId: '',
                laserOptions: null
            });
        },
        setPickTarget: (target)=>set({
                pickTarget: target
            }),
        setZoom: (elementId, scale)=>{
            set({
                zoomTarget: {
                    elementId,
                    scale
                }
            });
        },
        clearZoom: ()=>{
            set({
                zoomTarget: null
            });
        },
        clearAllEffects: ()=>{
            set({
                spotlightElementId: '',
                spotlightOptions: null,
                spotlightMode: 'pixel',
                spotlightPercentageGeometry: null,
                highlightedElementIds: [],
                highlightOptions: null,
                laserElementId: '',
                laserOptions: null,
                zoomTarget: null,
                pickTarget: null
            });
        },
        // ===== Batch Operations =====
        resetCanvasState: ()=>{
            set({
                ...initialState,
                // Preserve viewport settings
                viewportSize: get().viewportSize,
                viewportRatio: get().viewportRatio
            });
        }
    }));
// Enhance store with selectors, supporting store.use.xxx() syntax
const useCanvasStore = (0,_lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_2__/* .createSelectors */ .L)(useCanvasStoreBase);


/***/ }),

/***/ 56323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ changeOutlineType)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/outline-type.ts
 */ const DEFAULT_QUIZ_CONFIG = {
    questionCount: 3,
    difficulty: 'medium',
    questionTypes: [
        'single'
    ]
};
const MAX_TARGET_SKILLS = 6;
/**
 * Total constructor: returns a NEW outline of `newType` that is valid by
 * construction. It strips every foreign per-type config and seeds the target
 * type's required config from the shared fields (title / description /
 * keyPoints), so the result survives `applyOutlineFallbacks` instead of being
 * silently downgraded to a slide.
 *
 * Seeded values are pre-filled, user-editable defaults — not a hidden
 * generation-time fallback. Switching away from a type therefore also clears
 * its config so stale data is never persisted.
 */ function changeOutlineType(outline, newType) {
    // Re-selecting the current type is a no-op: return the outline untouched so a
    // harmless menu click never rebuilds it and drops fields this constructor does
    // not re-seed (e.g. legacy interactiveConfig, or a partial pblConfig whose
    // projectTopic happens to be empty).
    if (newType === outline.type) {
        return outline;
    }
    // Shared fields only — every per-type config is intentionally dropped here and
    // re-seeded per branch below.
    const baseOutline = {
        id: outline.id,
        type: newType,
        title: outline.title,
        description: outline.description,
        keyPoints: outline.keyPoints ?? [],
        order: outline.order,
        ...outline.teachingObjective !== undefined && {
            teachingObjective: outline.teachingObjective
        },
        ...outline.estimatedDuration !== undefined && {
            estimatedDuration: outline.estimatedDuration
        },
        ...outline.languageNote !== undefined && {
            languageNote: outline.languageNote
        },
        ...outline.suggestedImageIds !== undefined && {
            suggestedImageIds: outline.suggestedImageIds
        },
        ...outline.mediaGenerations !== undefined && {
            mediaGenerations: outline.mediaGenerations
        }
    };
    switch(newType){
        case 'quiz':
            return {
                ...baseOutline,
                quizConfig: outline.quizConfig ?? {
                    ...DEFAULT_QUIZ_CONFIG
                }
            };
        case 'interactive':
            {
                // Preserve any already-valid widget config — including a gated
                // procedural-skill one, whose task-engine fields must not be silently
                // dropped when the type is re-selected. Otherwise seed a simulation widget.
                // (The manual widget picker never *creates* procedural-skill.)
                if (outline.widgetType && outline.widgetOutline) {
                    return {
                        ...baseOutline,
                        widgetType: outline.widgetType,
                        widgetOutline: outline.widgetOutline
                    };
                }
                const widgetOutline = {
                    concept: outline.title || ''
                };
                return {
                    ...baseOutline,
                    widgetType: 'simulation',
                    widgetOutline
                };
            }
        case 'pbl':
            {
                if (outline.pblConfig?.projectTopic) {
                    return {
                        ...baseOutline,
                        pblConfig: outline.pblConfig
                    };
                }
                const targetSkills = Array.from(new Set((outline.keyPoints ?? []).filter(Boolean))).slice(0, MAX_TARGET_SKILLS);
                return {
                    ...baseOutline,
                    pblConfig: {
                        projectTopic: outline.title || '',
                        projectDescription: outline.description || '',
                        targetSkills
                    }
                };
            }
        case 'slide':
        default:
            return baseOutline;
    }
}


/***/ }),

/***/ 57656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ StepVisualizer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15696);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78235);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58011);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8962);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(32061);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(61285);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(25494);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(25085);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(36619);
/* harmony import */ var _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(70924);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ StepVisualizer auto */ 





// Step-specific visualizers
function StepVisualizer({ stepId, outlines, webSearchSources, onExpandOutline }) {
    switch(stepId){
        case 'pdf-analysis':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PdfScanVisualizer, {});
        case 'web-search':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(WebSearchVisualizer, {
                sources: webSearchSources || []
            });
        case 'outline':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StreamingOutlineVisualizer, {
                outlines: outlines || [],
                onExpand: onExpandOutline
            });
        case 'agent-generation':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentGenerationVisualizer, {});
        case 'slide-content':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ContentVisualizer, {});
        case 'actions':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActionsVisualizer, {});
        default:
            return null;
    }
}
// PDF: Document with scanning laser line
function PdfScanVisualizer() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "size-32 relative flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "absolute inset-2 bg-cyan-500/5 rounded-2xl blur-lg",
                animate: {
                    opacity: [
                        0.3,
                        0.6,
                        0.3
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Infinity
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-20 h-28 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "p-3 space-y-2 mt-1",
                        children: [
                            80,
                            60,
                            90,
                            45,
                            70
                        ].map((w, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                className: "h-1.5 bg-slate-100 dark:bg-slate-700 rounded",
                                style: {
                                    width: `${w}%`
                                },
                                animate: {
                                    opacity: [
                                        0.4,
                                        1,
                                        0.4
                                    ]
                                },
                                transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }
                            }, i))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                        className: "absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)]",
                        animate: {
                            top: [
                                '5%',
                                '90%',
                                '5%'
                            ]
                        },
                        transition: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "absolute -top-1 -right-1",
                animate: {
                    rotate: [
                        0,
                        10,
                        -10,
                        0
                    ]
                },
                transition: {
                    duration: 3,
                    repeat: Infinity
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "size-6 text-cyan-500/70"
                })
            })
        ]
    });
}
// Web Search: Miniature search engine results page with animated query + result rows
function WebSearchVisualizer({ sources }) {
    const [activeResult, setActiveResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // Cycle through result highlight when we have sources
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (sources.length === 0) return;
        const timer = setInterval(()=>{
            setActiveResult((prev)=>(prev + 1) % Math.min(sources.length, 4));
        }, 1400);
        return ()=>clearInterval(timer);
    }, [
        sources.length
    ]);
    // Placeholder results for skeleton state
    const skeletonResults = [
        {
            titleW: 70,
            urlW: 45,
            snippetW: [
                90,
                60
            ]
        },
        {
            titleW: 55,
            urlW: 50,
            snippetW: [
                80,
                75
            ]
        },
        {
            titleW: 65,
            urlW: 40,
            snippetW: [
                85,
                50
            ]
        },
        {
            titleW: 50,
            urlW: 55,
            snippetW: [
                70,
                65
            ]
        }
    ];
    const ROW_H = 38;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "size-56 relative flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "absolute inset-0 blur-3xl rounded-full bg-teal-500/8",
                animate: {
                    scale: [
                        1,
                        1.15,
                        1
                    ],
                    opacity: [
                        0.3,
                        0.5,
                        0.3
                    ]
                },
                transition: {
                    duration: 3.5,
                    repeat: Infinity
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-44 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "size-3 text-teal-500 shrink-0"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex-1 h-4 bg-slate-50 dark:bg-slate-700/50 rounded-full overflow-hidden flex items-center px-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                    className: "h-1.5 bg-teal-500/25 rounded-full",
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: '70%'
                                    },
                                    transition: {
                                        duration: 0.8,
                                        ease: 'easeOut'
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-2 space-y-0.5 relative",
                        children: [
                            sources.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                className: "absolute left-2 right-2 rounded-lg bg-teal-500/[0.06] dark:bg-teal-400/[0.08]",
                                style: {
                                    height: ROW_H - 6
                                },
                                animate: {
                                    y: activeResult * ROW_H
                                },
                                transition: {
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 28
                                }
                            }),
                            sources.length === 0 ? skeletonResults.map((item, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                    className: "px-2 py-1.5 space-y-1",
                                    animate: {
                                        opacity: [
                                            0.3,
                                            0.7,
                                            0.3
                                        ]
                                    },
                                    transition: {
                                        duration: 1.4,
                                        repeat: Infinity,
                                        delay: i * 0.15
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-1.5 bg-teal-200/40 dark:bg-teal-800/30 rounded",
                                            style: {
                                                width: `${item.titleW}%`
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-1 bg-slate-100 dark:bg-slate-700 rounded",
                                            style: {
                                                width: `${item.urlW}%`
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex gap-1",
                                            children: item.snippetW.map((w, j)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-1 bg-slate-100 dark:bg-slate-700 rounded",
                                                    style: {
                                                        width: `${w * 0.5}%`
                                                    }
                                                }, j))
                                        })
                                    ]
                                }, i)) : sources.slice(0, 4).map((source, i)=>{
                                const isActive = i === activeResult;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                    initial: {
                                        opacity: 0,
                                        x: -10
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    transition: {
                                        delay: i * 0.08,
                                        duration: 0.25
                                    },
                                    className: "relative px-2 py-1.5 space-y-0.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('text-[8px] font-semibold truncate transition-colors duration-300 leading-tight', isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400'),
                                            children: source.title
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "text-[6px] text-teal-500/50 truncate leading-tight",
                                            children: source.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 32)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-0.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-0.5 w-1/3 bg-slate-100 dark:bg-slate-700 rounded-full"
                                                })
                                            ]
                                        })
                                    ]
                                }, source.url);
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                        className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12 pointer-events-none",
                        initial: {
                            left: '-150%'
                        },
                        animate: {
                            left: '200%'
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'linear'
                        }
                    })
                ]
            }),
            sources.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                initial: {
                    scale: 0
                },
                animate: {
                    scale: 1
                },
                transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 15
                },
                className: "absolute -top-2 -right-2 h-6 px-2 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-teal-500/25 z-20 gap-0.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                        className: "size-2.5"
                    }),
                    sources.length
                ]
            })
        ]
    });
}
// Outline: Streams real outline data as it arrives from SSE
function StreamingOutlineVisualizer({ outlines, onExpand }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const isInteractive = !!onExpand;
    const handleKeyDown = (event)=>{
        if (!isInteractive) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onExpand?.();
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
        layoutId: "outline-review-surface",
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 28
        },
        // Slight tilt to suggest a tossed-down sticky note; straightens on hover.
        // Layout-shared morph into the editor surface explicitly targets rotate: 0,
        // so the rotation is interpolated as the surface grows.
        initial: isInteractive ? {
            rotate: -3
        } : false,
        animate: isInteractive ? {
            rotate: -3
        } : {
            rotate: 0
        },
        whileHover: isInteractive ? {
            y: -3,
            scale: 1.04,
            rotate: 0
        } : undefined,
        whileTap: isInteractive ? {
            scale: 0.97,
            rotate: 0
        } : undefined,
        role: isInteractive ? 'button' : undefined,
        tabIndex: isInteractive ? 0 : undefined,
        "aria-label": isInteractive ? t('generation.outlineExpandHint') : undefined,
        onClick: onExpand,
        onKeyDown: handleKeyDown,
        style: {
            transformOrigin: 'center center'
        },
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('group/outline-card relative h-52 w-44 overflow-hidden rounded-2xl border p-3 text-left', 'bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur', 'dark:bg-slate-900/80', isInteractive ? 'cursor-pointer border-blue-400/40 shadow-blue-500/10 transition-shadow hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-blue-400/30 dark:hover:border-blue-400/50' : 'border-slate-200/70 dark:border-white/10'),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                        className: "size-2 rounded-full bg-blue-500",
                        animate: {
                            opacity: [
                                0.3,
                                1,
                                0.3
                            ],
                            scale: [
                                0.9,
                                1.15,
                                0.9
                            ]
                        },
                        transition: {
                            repeat: Infinity,
                            duration: 1.1
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative h-[168px] overflow-hidden pl-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute bottom-0 left-[5px] top-0 w-px bg-slate-200 dark:bg-slate-700"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_8__/* .AnimatePresence */ .N, {
                        initial: false,
                        children: outlines.length === 0 ? [
                            58,
                            78,
                            48,
                            68
                        ].map((w, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                className: "relative mb-3",
                                animate: {
                                    opacity: [
                                        0.35,
                                        0.75,
                                        0.35
                                    ]
                                },
                                transition: {
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.16
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute -left-[15px] top-0.5 size-2 rounded-full border border-blue-300 bg-white dark:bg-slate-900"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "h-2 rounded-full bg-slate-100 dark:bg-slate-800",
                                        style: {
                                            width: `${w}%`
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-1 h-1 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800"
                                    })
                                ]
                            }, i)) : outlines.slice(0, 4).map((outline, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                layout: true,
                                initial: {
                                    opacity: 0,
                                    x: -10,
                                    scale: 0.96
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    x: -10,
                                    scale: 0.96
                                },
                                transition: {
                                    type: 'spring',
                                    stiffness: 420,
                                    damping: 34
                                },
                                className: "relative mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute -left-[15px] top-0.5 size-2 rounded-full border border-blue-300 bg-white shadow-sm shadow-blue-500/20 dark:bg-slate-900"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "truncate text-[9px] font-semibold leading-tight text-slate-700 dark:text-slate-200",
                                        children: [
                                            i + 1,
                                            ". ",
                                            outline.title
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-1 truncate text-[7px] leading-tight text-slate-400 dark:text-slate-500",
                                        children: outline.description || outline.keyPoints?.[0] || '...'
                                    })
                                ]
                            }, outline.id))
                    }),
                    outlines.length > 4 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "text-[8px] font-medium text-blue-500/70",
                        children: [
                            "+",
                            outlines.length - 4
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "pointer-events-none absolute inset-x-0 bottom-0 z-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80",
                "aria-hidden": true
            }),
            isInteractive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pointer-events-none absolute inset-x-0 bottom-2 z-20 flex items-center justify-center px-2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.span, {
                    className: "inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow-lg shadow-blue-500/50 backdrop-blur",
                    animate: {
                        y: [
                            0,
                            -1.5,
                            0
                        ]
                    },
                    transition: {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "size-3"
                        }),
                        t('generation.outlineExpandHint')
                    ]
                })
            }),
            isInteractive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-md text-blue-500/80 group-hover/outline-card:text-blue-600 dark:text-blue-400/80 dark:group-hover/outline-card:text-blue-300",
                animate: {
                    opacity: [
                        0.6,
                        1,
                        0.6
                    ]
                },
                transition: {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                "aria-hidden": true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                    className: "size-3"
                })
            })
        ]
    });
}
// Content: Cycles through distinct representations of Slides, Quiz, PBL, Interactive
function AgentGenerationVisualizer() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "w-60 h-40 mx-auto flex items-center justify-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex gap-3",
            children: [
                0,
                1,
                2
            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                    className: "w-14 h-20 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 dark:from-purple-600 dark:to-blue-700 shadow-lg",
                    animate: {
                        y: [
                            0,
                            -8,
                            0
                        ],
                        rotateZ: [
                            0,
                            3,
                            -3,
                            0
                        ]
                    },
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-full flex items-center justify-center text-white/80 text-lg font-bold",
                        children: "?"
                    })
                }, i))
        })
    });
}
function ContentVisualizer() {
    const [index, setIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // 0: Slide (Blue)
    // 1: Quiz (Purple)
    // 2: PBL (Amber)
    // 3: Interactive (Emerald)
    const totalTypes = 4;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const timer = setInterval(()=>{
            setIndex((prev)=>(prev + 1) % totalTypes);
        }, 3200);
        return ()=>clearInterval(timer);
    }, []);
    const variants = {
        enter: {
            x: 50,
            opacity: 0,
            scale: 0.9,
            rotateY: -15
        },
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: {
            x: -50,
            opacity: 0,
            scale: 0.9,
            rotateY: 15
        }
    };
    const getTheme = (idx)=>{
        switch(idx){
            case 0:
                return {
                    color: 'blue',
                    label: 'SLIDE',
                    badge: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800'
                };
            case 1:
                return {
                    color: 'purple',
                    label: 'QUIZ',
                    badge: 'bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800'
                };
            case 2:
                return {
                    color: 'amber',
                    label: 'PBL',
                    badge: 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800'
                };
            case 3:
                return {
                    color: 'emerald',
                    label: 'WEB',
                    badge: 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800'
                };
            default:
                return {
                    color: 'blue',
                    label: '',
                    badge: ''
                };
        }
    };
    const theme = getTheme(index);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "size-56 relative flex items-center justify-center perspective-[800px]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('absolute inset-0 blur-3xl rounded-full transition-colors duration-1000', theme.color === 'blue' && 'bg-blue-500/10', theme.color === 'purple' && 'bg-purple-500/10', theme.color === 'amber' && 'bg-amber-500/10', theme.color === 'emerald' && 'bg-emerald-500/10'),
                animate: {
                    scale: [
                        1,
                        1.2,
                        1
                    ],
                    opacity: [
                        0.3,
                        0.6,
                        0.3
                    ]
                },
                transition: {
                    duration: 4,
                    repeat: Infinity
                }
            }, `glow-${index}`),
            [
                0,
                1
            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('absolute border rounded-full transition-colors duration-1000', theme.color === 'blue' && 'border-blue-500/10', theme.color === 'purple' && 'border-purple-500/10', theme.color === 'amber' && 'border-amber-500/10', theme.color === 'emerald' && 'border-emerald-500/10'),
                    style: {
                        width: 180 + i * 50,
                        height: 180 + i * 50,
                        borderStyle: 'dashed'
                    },
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 40 + i * 15,
                        ease: 'linear',
                        repeat: Infinity,
                        delay: i * -5
                    }
                }, i)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-40 h-28 relative",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_8__/* .AnimatePresence */ .N, {
                    mode: "popLayout",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                        variants: variants,
                        initial: "enter",
                        animate: "center",
                        exit: "exit",
                        transition: {
                            type: 'spring',
                            stiffness: 80,
                            damping: 16
                        },
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('absolute inset-0 bg-white dark:bg-slate-800 rounded-xl border shadow-xl overflow-hidden flex flex-col p-3 origin-center', theme.color === 'blue' && 'border-blue-200 dark:border-blue-900/30', theme.color === 'purple' && 'border-purple-200 dark:border-purple-900/30', theme.color === 'amber' && 'border-amber-200 dark:border-amber-900/30', theme.color === 'emerald' && 'border-emerald-200 dark:border-emerald-900/30'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.8
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: 0.1
                                },
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('absolute top-1.5 right-1.5 z-20 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm', theme.badge),
                                children: theme.label
                            }),
                            index === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col h-full pt-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                        initial: {
                                            width: '0%'
                                        },
                                        animate: {
                                            width: '55%'
                                        },
                                        transition: {
                                            delay: 0.2
                                        },
                                        className: "h-2 bg-blue-500/20 rounded-full mb-3 shrink-0"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex gap-2 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex-1 space-y-2",
                                                children: [
                                                    0.8,
                                                    0.9,
                                                    0.6,
                                                    0.7
                                                ].map((w, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                        initial: {
                                                            width: 0
                                                        },
                                                        animate: {
                                                            width: `${w * 100}%`
                                                        },
                                                        transition: {
                                                            delay: 0.3 + i * 0.1
                                                        },
                                                        className: "h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full"
                                                    }, i))
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                initial: {
                                                    scale: 0.8,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    scale: 1,
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.4
                                                },
                                                className: "w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center shrink-0",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "size-6 text-blue-500/60"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            index === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col h-full justify-center space-y-2 pt-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                        initial: {
                                            y: -5,
                                            opacity: 0
                                        },
                                        animate: {
                                            y: 0,
                                            opacity: 1
                                        },
                                        transition: {
                                            delay: 0.2
                                        },
                                        className: "flex justify-center mb-1",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-2 w-3/4 bg-purple-500/20 rounded-full"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            0,
                                            1,
                                            2,
                                            3
                                        ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                initial: {
                                                    scale: 0.8,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    scale: 1,
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.3 + i * 0.1
                                                },
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('h-6 rounded border flex items-center px-2', i === 1 ? 'bg-purple-500 text-white border-purple-500' : 'bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-700'),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('size-1.5 rounded-full mr-2', i === 1 ? 'bg-white' : 'bg-slate-300')
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('h-1 w-8 rounded-full', i === 1 ? 'bg-white/50' : 'bg-slate-200 dark:bg-slate-600')
                                                    })
                                                ]
                                            }, i))
                                    })
                                ]
                            }),
                            index === 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col h-full pt-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "size-3 text-amber-500 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                initial: {
                                                    width: 0
                                                },
                                                animate: {
                                                    width: '40%'
                                                },
                                                className: "h-2 bg-amber-500/20 rounded-full"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex-1 flex gap-2 overflow-hidden",
                                        children: [
                                            0,
                                            1,
                                            2
                                        ].map((col)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                initial: {
                                                    y: 20,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    y: 0,
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.2 + col * 0.15
                                                },
                                                className: "flex-1 bg-slate-50 dark:bg-slate-700/30 rounded flex flex-col gap-1 p-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-1 w-6 bg-slate-200 dark:bg-slate-600 rounded mb-1"
                                                    }),
                                                    [
                                                        0,
                                                        1
                                                    ].map((card)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "h-3 w-full bg-white dark:bg-slate-600 rounded border border-slate-100 dark:border-slate-500 shadow-sm"
                                                        }, card))
                                                ]
                                            }, col))
                                    })
                                ]
                            }),
                            index === 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col h-full relative pt-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1 mb-2 border-b border-slate-100 dark:border-slate-700 pb-1 pr-10",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex gap-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "size-1.5 rounded-full bg-red-400"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "size-1.5 rounded-full bg-amber-400"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "size-1.5 rounded-full bg-green-400"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-1.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full ml-1"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 flex gap-2 relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.3
                                                },
                                                className: "w-1/3 bg-slate-50 dark:bg-slate-700/30 rounded p-1 space-y-1",
                                                children: [
                                                    1,
                                                    2,
                                                    3
                                                ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-full"
                                                    }, i))
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 bg-emerald-50 dark:bg-emerald-900/10 rounded border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden flex items-center justify-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                        className: "size-8 text-emerald-200 dark:text-emerald-800"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                                        className: "absolute",
                                                        animate: {
                                                            x: [
                                                                20,
                                                                -10,
                                                                15,
                                                                0
                                                            ],
                                                            y: [
                                                                10,
                                                                -15,
                                                                5,
                                                                0
                                                            ]
                                                        },
                                                        transition: {
                                                            duration: 3,
                                                            ease: 'easeInOut'
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                            className: "size-3 text-emerald-600 fill-emerald-600"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 dark:via-white/10 to-transparent -skew-x-12 pointer-events-none",
                                initial: {
                                    left: '-150%'
                                },
                                animate: {
                                    left: '200%'
                                },
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: 'linear'
                                }
                            })
                        ]
                    }, index)
                })
            })
        ]
    });
}
// Actions: Timeline of speech, spotlight, and interactions being orchestrated
function ActionsVisualizer() {
    const [activeIdx, setActiveIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const actionItems = [
        {
            icon: _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
            label: 'Speech',
            color: 'text-violet-500',
            activeBg: 'bg-violet-500/10',
            activeBorder: 'border-violet-200 dark:border-violet-800'
        },
        {
            icon: _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A,
            label: 'Spotlight',
            color: 'text-amber-500',
            activeBg: 'bg-amber-500/10',
            activeBorder: 'border-amber-200 dark:border-amber-800'
        },
        {
            icon: _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
            label: 'Speech',
            color: 'text-violet-500',
            activeBg: 'bg-violet-500/10',
            activeBorder: 'border-violet-200 dark:border-violet-800'
        },
        {
            icon: _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A,
            label: 'Interact',
            color: 'text-emerald-500',
            activeBg: 'bg-emerald-500/10',
            activeBorder: 'border-emerald-200 dark:border-emerald-800'
        },
        {
            icon: _barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
            label: 'Speech',
            color: 'text-violet-500',
            activeBg: 'bg-violet-500/10',
            activeBorder: 'border-violet-200 dark:border-violet-800'
        }
    ];
    // Row height (py-1.5 = 6px×2 padding + icon ~16px) + gap 6px ≈ 34px per row
    const ROW_H = 34;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const timer = setInterval(()=>{
            setActiveIdx((prev)=>(prev + 1) % actionItems.length);
        }, 1600);
        return ()=>clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "size-56 relative flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                className: "absolute inset-0 blur-3xl rounded-full bg-violet-500/8",
                animate: {
                    scale: [
                        1,
                        1.15,
                        1
                    ],
                    opacity: [
                        0.3,
                        0.5,
                        0.3
                    ]
                },
                transition: {
                    duration: 3.5,
                    repeat: Infinity
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-44 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Clapperboard_Focus_Globe_Maximize2_MessageSquare_MousePointer2_Play_Puzzle_ScanLine_Search_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "size-3 text-violet-500"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                initial: {
                                    width: 0
                                },
                                animate: {
                                    width: '50%'
                                },
                                transition: {
                                    delay: 0.2
                                },
                                className: "h-1.5 bg-violet-500/20 rounded-full"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-2 space-y-1.5 relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                className: "absolute left-2 right-2 rounded-lg bg-violet-500/[0.06] dark:bg-violet-400/[0.08]",
                                style: {
                                    height: ROW_H - 6
                                },
                                animate: {
                                    y: activeIdx * ROW_H
                                },
                                transition: {
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 28
                                }
                            }),
                            actionItems.map((item, i)=>{
                                const Icon = item.icon;
                                const isActive = i === activeIdx;
                                const isPast = i < activeIdx;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                    initial: {
                                        opacity: 0,
                                        x: -12
                                    },
                                    animate: {
                                        opacity: isPast ? 0.4 : 1,
                                        x: 0
                                    },
                                    transition: {
                                        delay: 0.1 + i * 0.08,
                                        duration: 0.3
                                    },
                                    className: "relative flex items-center gap-2 px-2 py-1.5 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('size-4 rounded flex items-center justify-center shrink-0 transition-colors duration-300', isActive ? item.color : 'text-slate-300 dark:text-slate-600'),
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                                className: "size-3"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('text-[8px] font-semibold uppercase tracking-wider transition-colors duration-300', isActive ? item.color : 'text-slate-400 dark:text-slate-500'),
                                                    children: item.label
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('h-1 flex-1 rounded-full transition-colors duration-300', isActive ? 'bg-current opacity-20' : 'bg-slate-100 dark:bg-slate-700')
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .motion */ .PY1.div, {
                                            className: "size-1.5 rounded-full bg-violet-500",
                                            animate: {
                                                opacity: isActive ? [
                                                    1,
                                                    0.3,
                                                    1
                                                ] : 0
                                            },
                                            transition: isActive ? {
                                                duration: 0.8,
                                                repeat: Infinity
                                            } : {
                                                duration: 0.2
                                            }
                                        })
                                    ]
                                }, i);
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 77627:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pq: () => (/* binding */ defaultRichTextAttrs)
/* harmony export */ });
/* unused harmony exports isList, autoSelectAll, addMark, findNodesWithSameMark, findParentNode, findParentNodeOfType, isActiveOfParentNodeType, getLastTextNode, getMarkAttrs, getAttrValue, isActiveMark, markActive, getAttrValueInSelection, getTextAttrs, getFontsize */

const isList = (node, schema)=>{
    return node.type === schema.nodes.bullet_list || node.type === schema.nodes.ordered_list;
};
const autoSelectAll = (view)=>{
    const { empty } = view.state.selection;
    if (empty) selectAll(view.state, view.dispatch);
};
const addMark = (editorView, mark, selection)=>{
    if (selection) {
        editorView.dispatch(editorView.state.tr.addMark(selection.from, selection.to, mark));
    } else {
        const { $from, $to } = editorView.state.selection;
        editorView.dispatch(editorView.state.tr.addMark($from.pos, $to.pos, mark));
    }
};
const findNodesWithSameMark = (doc, from, to, markType)=>{
    let ii = from;
    const finder = (mark)=>mark.type === markType;
    let firstMark = null;
    let fromNode = null;
    let toNode = null;
    while(ii <= to){
        const node = doc.nodeAt(ii);
        if (!node || !node.marks) return null;
        const mark = node.marks.find(finder);
        if (!mark) return null;
        if (firstMark && mark !== firstMark) return null;
        fromNode = fromNode || node;
        firstMark = firstMark || mark;
        toNode = node;
        ii++;
    }
    let fromPos = from;
    let toPos = to;
    let jj = 0;
    ii = from - 1;
    while(ii > jj){
        const node = doc.nodeAt(ii);
        const mark = node && node.marks.find(finder);
        if (!mark || mark !== firstMark) break;
        fromPos = ii;
        fromNode = node;
        ii--;
    }
    ii = to + 1;
    jj = doc.nodeSize - 2;
    while(ii < jj){
        const node = doc.nodeAt(ii);
        const mark = node && node.marks.find(finder);
        if (!mark || mark !== firstMark) break;
        toPos = ii;
        toNode = node;
        ii++;
    }
    return {
        mark: firstMark,
        from: {
            node: fromNode,
            pos: fromPos
        },
        to: {
            node: toNode,
            pos: toPos
        }
    };
};
const equalNodeType = (nodeType, node)=>{
    return Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1 || node.type === nodeType;
};
const findParentNodeClosestToPos = ($pos, predicate)=>{
    for(let i = $pos.depth; i > 0; i--){
        const node = $pos.node(i);
        if (predicate(node)) {
            return {
                pos: i > 0 ? $pos.before(i) : 0,
                start: $pos.start(i),
                depth: i,
                node
            };
        }
    }
};
const findParentNode = (predicate)=>{
    return (_ref)=>findParentNodeClosestToPos(_ref.$from, predicate);
};
const findParentNodeOfType = (nodeType)=>{
    return (selection)=>{
        return findParentNode((node)=>{
            return equalNodeType(nodeType, node);
        })(selection);
    };
};
const isActiveOfParentNodeType = (nodeType, state)=>{
    const node = state.schema.nodes[nodeType];
    return !!findParentNodeOfType(node)(state.selection);
};
const getLastTextNode = (node)=>{
    if (!node) return null;
    if (node.type.name === 'text') return node;
    if (!node.lastChild) return null;
    return getLastTextNode(node.lastChild);
};
const getMarkAttrs = (view)=>{
    const { selection, doc } = view.state;
    const { from } = selection;
    let node = doc.nodeAt(from) || doc.nodeAt(from - 1);
    node = getLastTextNode(node);
    return node?.marks || [];
};
const getAttrValue = (marks, markType, attr)=>{
    for (const mark of marks){
        if (mark.type.name === markType && mark.attrs[attr]) return mark.attrs[attr];
    }
    return null;
};
const isActiveMark = (marks, markType)=>{
    for (const mark of marks){
        if (mark.type.name === markType) return true;
    }
    return false;
};
const markActive = (state, type)=>{
    const { from, $from, to, empty } = state.selection;
    if (empty) return type.isInSet(state.storedMarks || $from.marks());
    return state.doc.rangeHasMark(from, to, type);
};
const getAttrValueInSelection = (view, attr)=>{
    const { selection, doc } = view.state;
    const { from, to } = selection;
    let keepChecking = true;
    let value = '';
    doc.nodesBetween(from, to, (node)=>{
        if (keepChecking && node.attrs[attr]) {
            keepChecking = false;
            value = node.attrs[attr];
        }
        return keepChecking;
    });
    return value;
};
const _defaultAttrs = {
    color: '#000000',
    backcolor: '',
    fontsize: '16px',
    fontname: '',
    align: 'left'
};
const getTextAttrs = (view, attrs = {})=>{
    const defaultAttrs = {
        ..._defaultAttrs,
        ...attrs
    };
    const marks = getMarkAttrs(view);
    const isBold = isActiveMark(marks, 'strong');
    const isEm = isActiveMark(marks, 'em');
    const isUnderline = isActiveMark(marks, 'underline');
    const isStrikethrough = isActiveMark(marks, 'strikethrough');
    const isSuperscript = isActiveMark(marks, 'superscript');
    const isSubscript = isActiveMark(marks, 'subscript');
    const isCode = isActiveMark(marks, 'code');
    const color = getAttrValue(marks, 'forecolor', 'color') || defaultAttrs.color;
    const backcolor = getAttrValue(marks, 'backcolor', 'backcolor') || defaultAttrs.backcolor;
    const fontsize = getAttrValue(marks, 'fontsize', 'fontsize') || defaultAttrs.fontsize;
    const fontname = getAttrValue(marks, 'fontname', 'fontname') || defaultAttrs.fontname;
    const link = getAttrValue(marks, 'link', 'href') || '';
    const align = getAttrValueInSelection(view, 'align') || defaultAttrs.align;
    const isBulletList = isActiveOfParentNodeType('bullet_list', view.state);
    const isOrderedList = isActiveOfParentNodeType('ordered_list', view.state);
    const isBlockquote = isActiveOfParentNodeType('blockquote', view.state);
    return {
        bold: isBold,
        em: isEm,
        underline: isUnderline,
        strikethrough: isStrikethrough,
        superscript: isSuperscript,
        subscript: isSubscript,
        code: isCode,
        color: color,
        backcolor: backcolor,
        fontsize: fontsize,
        fontname: fontname,
        link: link,
        align: align,
        bulletList: isBulletList,
        orderedList: isOrderedList,
        blockquote: isBlockquote
    };
};
const getFontsize = (view)=>{
    const marks = getMarkAttrs(view);
    const fontsize = getAttrValue(marks, 'fontsize', 'fontsize') || _defaultAttrs.fontsize;
    return parseInt(fontsize);
};
const defaultRichTextAttrs = {
    bold: false,
    em: false,
    underline: false,
    strikethrough: false,
    superscript: false,
    subscript: false,
    code: false,
    color: '#000000',
    backcolor: '',
    fontsize: '16px',
    fontname: '',
    link: '',
    align: 'left',
    bulletList: false,
    orderedList: false,
    blockquote: false
};


/***/ }),

/***/ 87138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ AgentRevealModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78235);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15696);
/* harmony import */ var _barrel_optimize_names_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86272);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40980);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18615);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/agent/agent-reveal-modal.tsx
 *
 * Verbatim port — only motion/react (consistent with other ported files),
 * lucide-react, @/lib/utils, @/lib/hooks/use-i18n are imported.
 */ /* __next_internal_client_entry_do_not_use__ AgentRevealModal auto */ 






/** Lighten a hex color by mixing with white */ function lighten(hex, amount) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const lr = Math.round(r + (255 - r) * amount);
    const lg = Math.round(g + (255 - g) * amount);
    const lb = Math.round(b + (255 - b) * amount);
    return `rgb(${lr},${lg},${lb})`;
}
const ROLE_ICONS = {
    teacher: '👨‍🏫',
    assistant: '🤝',
    student: '🎓'
};
function AgentRevealModal({ agents, open, onClose, onAllRevealed }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const [revealedCount, setRevealedCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [flipsComplete, setFlipsComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const allRevealedFiredRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const onAllRevealedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onAllRevealed);
    onAllRevealedRef.current = onAllRevealed;
    const allRevealed = revealedCount >= agents.length && agents.length > 0;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) {
            setRevealedCount(0);
            setFlipsComplete(false);
            allRevealedFiredRef.current = false;
            return;
        }
        let i = 0;
        const startTimeout = setTimeout(()=>{
            i = 1;
            setRevealedCount(1);
            if (agents.length <= 1) {
                setTimeout(()=>{
                    if (!allRevealedFiredRef.current) {
                        allRevealedFiredRef.current = true;
                        onAllRevealedRef.current?.();
                    }
                }, 600);
                return;
            }
            const interval = setInterval(()=>{
                i++;
                setRevealedCount(i);
                if (i >= agents.length) {
                    clearInterval(interval);
                    setTimeout(()=>{
                        if (!allRevealedFiredRef.current) {
                            allRevealedFiredRef.current = true;
                            onAllRevealedRef.current?.();
                        }
                    }, 600);
                }
            }, 500);
            return ()=>clearInterval(interval);
        }, 400);
        return ()=>clearTimeout(startTimeout);
    }, [
        open,
        agents.length
    ]);
    // Switch from preserve-3d to flat after all flip animations complete to enable scrolling
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!allRevealed) return;
        const timer = setTimeout(()=>setFlipsComplete(true), 800);
        return ()=>clearTimeout(timer);
    }, [
        allRevealed
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .AnimatePresence */ .N, {
        children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
            className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-100/90 backdrop-blur-sm dark:bg-black/70 dark:backdrop-blur-md",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.3
            },
            children: [
                allRevealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.button, {
                    className: "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/5 text-zinc-500 backdrop-blur-sm transition-colors hover:bg-black/10 hover:text-zinc-700 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 dark:hover:text-white",
                    initial: {
                        opacity: 0,
                        scale: 0.8
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    transition: {
                        delay: 0.2,
                        duration: 0.2
                    },
                    onClick: onClose,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        className: "size-5"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.h2, {
                    className: "mb-8 text-2xl font-bold text-zinc-800 drop-shadow-sm dark:text-white dark:drop-shadow-lg md:text-3xl",
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: 0.1,
                        duration: 0.4
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "mr-2 inline-block size-6 text-amber-500 dark:text-yellow-400"
                        }),
                        t('generation.agentRevealTitle')
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex flex-wrap items-stretch justify-center gap-4 px-4 md:gap-5",
                    children: agents.map((agent, index)=>{
                        const isRevealed = index < revealedCount;
                        const roleIcon = ROLE_ICONS[agent.role] ?? '🎓';
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                            className: "group relative",
                            style: {
                                width: 196,
                                height: 290,
                                perspective: 900
                            },
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            transition: {
                                delay: index * 0.08,
                                duration: 0.3
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                                className: "relative size-full",
                                style: {
                                    transformStyle: flipsComplete ? 'flat' : 'preserve-3d'
                                },
                                animate: {
                                    rotateY: isRevealed ? 0 : 180
                                },
                                transition: {
                                    duration: 0.6,
                                    ease: [
                                        0.23,
                                        1,
                                        0.32,
                                        1
                                    ]
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute inset-0 overflow-clip rounded-2xl",
                                        style: {
                                            backfaceVisibility: 'hidden'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "absolute inset-0 rounded-2xl p-[2px]",
                                            style: {
                                                background: `linear-gradient(160deg, ${agent.color}, ${lighten(agent.color, 0.35)}, ${agent.color})`
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative flex size-full flex-col overflow-clip rounded-[14px] bg-white dark:bg-zinc-900",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative shrink-0 overflow-hidden",
                                                        style: {
                                                            height: 56
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "absolute inset-0",
                                                                style: {
                                                                    background: `linear-gradient(135deg, ${agent.color}30 0%, ${agent.color}10 100%)`
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "absolute inset-0 opacity-[0.04]",
                                                                style: {
                                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                className: "absolute right-0 top-0 size-16 text-white/[0.06]",
                                                                viewBox: "0 0 64 64",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                                                                        x1: "64",
                                                                        y1: "0",
                                                                        x2: "0",
                                                                        y2: "64",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "1"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                                                                        x1: "64",
                                                                        y1: "16",
                                                                        x2: "16",
                                                                        y2: "64",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "1"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                                                                        x1: "64",
                                                                        y1: "32",
                                                                        x2: "32",
                                                                        y2: "64",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "1"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "relative z-10 -mt-7 flex justify-center",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "flex size-[50px] items-center justify-center rounded-full border-[2.5px] shadow-lg shadow-black/40",
                                                            style: {
                                                                borderColor: agent.color,
                                                                backgroundColor: '#f8f8fc'
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                                src: (0,_lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_7__/* .sanitizeAvatar */ .NZ)(agent.avatar),
                                                                alt: agent.name,
                                                                className: "size-full rounded-full object-cover"
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "mt-1.5 flex flex-col items-center gap-0.5 px-3",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                                className: "max-w-full truncate text-center text-[13px] font-bold tracking-wide",
                                                                style: {
                                                                    color: agent.color
                                                                },
                                                                children: agent.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "inline-flex items-center gap-1 rounded-full px-2 py-px text-[10px] font-medium",
                                                                style: {
                                                                    color: agent.color,
                                                                    backgroundColor: `${agent.color}12`
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-[9px]",
                                                                        children: roleIcon
                                                                    }),
                                                                    t(`settings.agentRoles.${agent.role}`)
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "mx-5 mt-2 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "h-px flex-1",
                                                                style: {
                                                                    background: `linear-gradient(to right, transparent, ${agent.color}40, transparent)`
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "size-1 rounded-full",
                                                                style: {
                                                                    backgroundColor: `${agent.color}60`
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "h-px flex-1",
                                                                style: {
                                                                    background: `linear-gradient(to right, transparent, ${agent.color}40, transparent)`
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-3.5 pt-1.5 pb-3",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-left text-[10.5px] leading-[1.65] text-zinc-600 dark:text-zinc-400",
                                                            children: agent.persona
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "pointer-events-none absolute inset-x-0 bottom-0 h-8",
                                                        style: {
                                                            background: `linear-gradient(to top, ${agent.color}08, transparent)`
                                                        }
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute inset-0 overflow-hidden rounded-2xl",
                                        style: {
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "absolute inset-0 rounded-2xl p-[2px]",
                                            style: {
                                                background: 'linear-gradient(160deg, #6366f1, #a855f7, #6366f1)'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative flex size-full flex-col items-center justify-center rounded-[14px]",
                                                style: {
                                                    background: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 40%, #1e1b4b 100%)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "absolute inset-3 rounded-xl border border-white/[0.08]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                        className: "absolute left-3 top-3 size-5 text-white/[0.07]",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                            d: "M10 0 L20 10 L10 20 L0 10 Z",
                                                            fill: "currentColor"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                        className: "absolute right-3 top-3 size-5 text-white/[0.07]",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                            d: "M10 0 L20 10 L10 20 L0 10 Z",
                                                            fill: "currentColor"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                        className: "absolute bottom-3 left-3 size-5 text-white/[0.07]",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                            d: "M10 0 L20 10 L10 20 L0 10 Z",
                                                            fill: "currentColor"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                        className: "absolute bottom-3 right-3 size-5 text-white/[0.07]",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                            d: "M10 0 L20 10 L10 20 L0 10 Z",
                                                            fill: "currentColor"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                        className: "size-9 text-purple-300/70"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "mt-1.5 text-xl font-bold text-purple-200/60",
                                                        children: "?"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                ]
                            })
                        }, agent.id);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                    className: "mt-6 flex flex-col items-center gap-4",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.3
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex gap-1.5",
                            children: agents.map((_, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('size-2 rounded-full transition-colors duration-300', index < revealedCount ? 'bg-zinc-700 dark:bg-white' : 'bg-zinc-300 dark:bg-white/30')
                                }, index))
                        }),
                        allRevealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.button, {
                            className: "rounded-full bg-zinc-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white/15 dark:hover:bg-white/25",
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.3,
                                duration: 0.3
                            },
                            onClick: onClose,
                            children: t('generation.continue')
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35684);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




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

/***/ 90190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Zp: () => (/* binding */ Card)
/* harmony export */ });
/* unused harmony exports CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);



function Card({ className, size = 'default', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col', className),
        ...props
    });
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-header",
        className: cn('gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]', className),
        ...props
    });
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-title",
        className: cn('text-base leading-normal font-medium group-data-[size=sm]/card:text-sm', className),
        ...props
    });
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-description",
        className: cn('text-muted-foreground text-sm', className),
        ...props
    });
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-action",
        className: cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    });
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-content",
        className: cn('px-6 group-data-[size=sm]/card:px-4', className),
        ...props
    });
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-footer",
        className: cn('rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center', className),
        ...props
    });
}



/***/ }),

/***/ 92789:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ OutlinesEditor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15696);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(78235);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(65408);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(58274);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(36565);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46821);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9192);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72264);
/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17414);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(40980);
/* harmony import */ var _lib_generation_outline_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(56323);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/generation/outlines-editor.tsx
 *
 * Verbatim port — only motion/react (consistent with other ported files),
 * ui/* + lucide + lib/* imports.
 */ /* __next_internal_client_entry_do_not_use__ OutlinesEditor auto */ 











const SCENE_TYPES = [
    'slide',
    'quiz',
    'interactive',
    'pbl'
];
const TYPE_THEME = {
    slide: {
        chip: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
        chipHover: 'hover:bg-blue-100/80 dark:hover:bg-blue-500/15',
        accent: 'bg-blue-500',
        dot: 'bg-blue-400'
    },
    quiz: {
        chip: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300',
        chipHover: 'hover:bg-purple-100/80 dark:hover:bg-purple-500/15',
        accent: 'bg-purple-500',
        dot: 'bg-purple-400'
    },
    interactive: {
        chip: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
        chipHover: 'hover:bg-emerald-100/80 dark:hover:bg-emerald-500/15',
        accent: 'bg-emerald-500',
        dot: 'bg-emerald-400'
    },
    pbl: {
        chip: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
        chipHover: 'hover:bg-amber-100/80 dark:hover:bg-amber-500/15',
        accent: 'bg-amber-500',
        dot: 'bg-amber-400'
    }
};
function normalizeOrder(outlines) {
    return outlines.map((outline, index)=>({
            ...outline,
            order: index + 1
        }));
}
function useSceneTypeLabel() {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    return (type)=>{
        switch(type){
            case 'quiz':
                return t('generation.sceneTypeQuiz');
            case 'interactive':
                return t('generation.sceneTypeInteractive');
            case 'pbl':
                return t('generation.sceneTypePbl');
            case 'slide':
            default:
                return t('generation.sceneTypeSlide');
        }
    };
}
function OutlinesEditor({ outlines, onChange, onConfirm, onBack, alwaysReview = false, onAlwaysReviewChange, isLoading = false, isStreaming = false, onCollapse }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const sceneTypeLabel = useSceneTypeLabel();
    const [draggingId, setDraggingId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dragOverId, setDragOverId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const lastScrollTargetRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const editingDisabled = isLoading || isStreaming;
    const lastOutlineId = outlines.length > 0 ? outlines[outlines.length - 1].id : null;
    // Auto-scroll to the latest streamed scene so streaming feels alive.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isStreaming || !lastOutlineId) return;
        if (lastScrollTargetRef.current === lastOutlineId) return;
        lastScrollTargetRef.current = lastOutlineId;
        const node = document.getElementById(`outline-scene-${lastOutlineId}`);
        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [
        isStreaming,
        lastOutlineId
    ]);
    const addOutline = ()=>{
        if (editingDisabled) return;
        const newOutline = {
            id: (0,nanoid__WEBPACK_IMPORTED_MODULE_8__/* .nanoid */ .Ak)(8),
            type: 'slide',
            title: '',
            description: '',
            keyPoints: [],
            order: outlines.length + 1
        };
        onChange(normalizeOrder([
            ...outlines,
            newOutline
        ]));
    };
    const updateOutline = (index, updates)=>{
        const next = [
            ...outlines
        ];
        next[index] = {
            ...next[index],
            ...updates
        };
        onChange(normalizeOrder(next));
    };
    // Replace the whole outline object (not a partial merge) — used when changing
    // type, so stale per-type config from the previous type is dropped instead of
    // lingering and being persisted.
    const replaceOutline = (index, outline)=>{
        const next = [
            ...outlines
        ];
        next[index] = outline;
        onChange(normalizeOrder(next));
    };
    const removeOutline = (index)=>{
        if (editingDisabled) return;
        onChange(normalizeOrder(outlines.filter((_, i)=>i !== index)));
    };
    const insertOutlineAt = (atIndex)=>{
        if (editingDisabled) return;
        const newOutline = {
            id: (0,nanoid__WEBPACK_IMPORTED_MODULE_8__/* .nanoid */ .Ak)(8),
            type: 'slide',
            title: '',
            description: '',
            keyPoints: [],
            order: atIndex + 1
        };
        const next = [
            ...outlines
        ];
        next.splice(atIndex, 0, newOutline);
        onChange(normalizeOrder(next));
    };
    const moveOutline = (index, direction)=>{
        if (editingDisabled) return;
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= outlines.length) return;
        const next = [
            ...outlines
        ];
        [next[index], next[targetIndex]] = [
            next[targetIndex],
            next[index]
        ];
        onChange(normalizeOrder(next));
    };
    const reorderOutline = (fromIndex, toIndex)=>{
        if (editingDisabled) return;
        if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
        const next = [
            ...outlines
        ];
        const [item] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, item);
        onChange(normalizeOrder(next));
    };
    const headerSubtitle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isStreaming) {
            return outlines.length > 0 ? t('generation.outlineEditorStreamingProgress', {
                count: outlines.length
            }) : t('generation.outlineEditorStreamingWaiting');
        }
        return t('generation.outlineEditorSummary', {
            count: outlines.length
        });
    }, [
        isStreaming,
        outlines.length,
        t
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.div, {
        layoutId: "outline-review-surface",
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 28
        },
        // Explicit rotate: 0 so the layout-shared morph from the tilted preview
        // card interpolates rotation cleanly back to upright.
        initial: {
            rotate: 0
        },
        animate: {
            rotate: 0
        },
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('relative overflow-hidden rounded-3xl border border-border/40', 'bg-white/85 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl', 'dark:border-white/5 dark:bg-slate-950/70 dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]'),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-3xl dark:bg-blue-400/[0.08]"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex items-start gap-3 px-6 pt-6 pb-4 md:px-10 md:pt-8 md:pb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0 flex-1 space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "size-3 text-blue-500"
                                    }),
                                    t('generation.outlineEditorEyebrow')
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-2xl font-semibold tracking-tight md:text-[28px]",
                                children: t('generation.outlineEditorTitle')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "flex min-h-[1.5rem] items-center gap-2 text-sm text-muted-foreground",
                                children: [
                                    isStreaming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.span, {
                                        "aria-hidden": true,
                                        className: "inline-flex size-1.5 rounded-full bg-blue-500",
                                        animate: {
                                            opacity: [
                                                0.3,
                                                1,
                                                0.3
                                            ],
                                            scale: [
                                                0.8,
                                                1.1,
                                                0.8
                                            ]
                                        },
                                        transition: {
                                            duration: 1.2,
                                            repeat: Infinity
                                        }
                                    }),
                                    headerSubtitle
                                ]
                            })
                        ]
                    }),
                    onCollapse && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onCollapse,
                        disabled: isLoading,
                        "aria-label": t('generation.collapseEditor'),
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium', 'text-muted-foreground transition-colors hover:bg-muted hover:text-foreground', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30', 'disabled:cursor-not-allowed disabled:opacity-50'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "size-3.5"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: t('generation.collapseEditor')
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "relative max-h-[64vh] overflow-y-auto px-3 pb-2 md:px-6",
                children: outlines.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyState, {
                    isStreaming: isStreaming,
                    disabled: editingDisabled,
                    onAdd: addOutline
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                    className: "flex flex-col py-1",
                    children: [
                        !isStreaming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InsertDivider, {
                            onClick: ()=>insertOutlineAt(0),
                            disabled: editingDisabled,
                            position: "edge"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_13__/* .AnimatePresence */ .N, {
                            initial: false,
                            children: outlines.map((outline, index)=>{
                                const isLast = outline.id === lastOutlineId;
                                const isStreamingTip = isStreaming && isLast;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SceneRow, {
                                            index: index,
                                            outline: outline,
                                            onUpdate: (updates)=>updateOutline(index, updates),
                                            onReplace: (next)=>replaceOutline(index, next),
                                            onRemove: ()=>removeOutline(index),
                                            onMoveUp: ()=>moveOutline(index, 'up'),
                                            onMoveDown: ()=>moveOutline(index, 'down'),
                                            canMoveUp: index > 0,
                                            canMoveDown: index < outlines.length - 1,
                                            sceneTypeLabel: sceneTypeLabel,
                                            disabled: editingDisabled,
                                            isStreamingTip: isStreamingTip,
                                            isDragging: draggingId === outline.id,
                                            isDragTarget: dragOverId === outline.id && draggingId !== outline.id,
                                            onDragStart: ()=>setDraggingId(outline.id),
                                            onDragEnd: ()=>{
                                                setDraggingId(null);
                                                setDragOverId(null);
                                            },
                                            onDragEnter: ()=>{
                                                if (draggingId && draggingId !== outline.id) {
                                                    setDragOverId(outline.id);
                                                }
                                            },
                                            onDrop: (sourceId)=>{
                                                const fromIndex = outlines.findIndex((item)=>item.id === sourceId);
                                                if (fromIndex >= 0) reorderOutline(fromIndex, index);
                                                setDraggingId(null);
                                                setDragOverId(null);
                                            }
                                        }),
                                        !isStreaming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InsertDivider, {
                                            onClick: ()=>insertOutlineAt(index + 1),
                                            disabled: editingDisabled,
                                            position: isLast ? 'edge' : 'between'
                                        })
                                    ]
                                }, outline.id);
                            })
                        }),
                        isStreaming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StreamingPlaceholder, {
                            nextIndex: outlines.length + 1
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex flex-col gap-3 border-t border-border/40 bg-gradient-to-t from-background/95 to-transparent px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10 md:py-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground', isLoading && 'cursor-not-allowed opacity-60'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_checkbox__WEBPACK_IMPORTED_MODULE_3__/* .Checkbox */ .S, {
                                checked: alwaysReview,
                                onCheckedChange: (checked)=>onAlwaysReviewChange?.(checked === true),
                                disabled: isLoading,
                                "aria-label": t('generation.alwaysReviewOutlines'),
                                className: "size-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: t('generation.alwaysReviewOutlines')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col-reverse gap-2 md:flex-row md:items-center md:gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                variant: "ghost",
                                onClick: onBack,
                                disabled: isLoading,
                                className: "rounded-full px-4 text-muted-foreground hover:text-foreground",
                                children: t('generation.backToRequirements')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                onClick: onConfirm,
                                disabled: isLoading || isStreaming || outlines.length === 0,
                                className: "rounded-full px-6 shadow-lg shadow-blue-500/20",
                                children: isLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                            className: "size-4 animate-spin"
                                        }),
                                        t('generation.generatingInProgress')
                                    ]
                                }) : isStreaming ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                            className: "size-4 animate-spin"
                                        }),
                                        t('generation.outlineEditorWaitingConfirm')
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "size-4"
                                        }),
                                        t('generation.confirmAndGenerateCourse')
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function SceneRow({ index, outline, onUpdate, onReplace, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, sceneTypeLabel, disabled, isStreamingTip, isDragging, isDragTarget, onDragStart, onDragEnd, onDragEnter, onDrop }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const theme = TYPE_THEME[outline.type] ?? TYPE_THEME.slide;
    const [keyPointDraft, setKeyPointDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const titleRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const descRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Auto-resize textareas to content for the typography-first feel.
    useAutoResize(titleRef, outline.title);
    useAutoResize(descRef, outline.description);
    const addKeyPoint = (raw)=>{
        const trimmed = raw.trim();
        if (!trimmed) return;
        const next = [
            ...outline.keyPoints ?? [],
            trimmed
        ];
        onUpdate({
            keyPoints: next
        });
        setKeyPointDraft('');
    };
    const removeKeyPoint = (idx)=>{
        const next = (outline.keyPoints ?? []).filter((_, i)=>i !== idx);
        onUpdate({
            keyPoints: next
        });
    };
    const handleKeyPointKeyDown = (event)=>{
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            addKeyPoint(keyPointDraft);
        } else if (event.key === 'Backspace' && !keyPointDraft && (outline.keyPoints?.length ?? 0) > 0) {
            removeKeyPoint((outline.keyPoints?.length ?? 0) - 1);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.li, {
        id: `outline-scene-${outline.id}`,
        layout: true,
        initial: {
            opacity: 0,
            y: 12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8,
            scale: 0.98
        },
        transition: {
            type: 'spring',
            stiffness: 380,
            damping: 32
        },
        onDragOver: (event)=>{
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },
        onDragEnter: onDragEnter,
        onDrop: (event)=>{
            event.preventDefault();
            const sourceId = event.dataTransfer.getData('text/plain');
            if (sourceId) onDrop(sourceId);
        },
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('group/scene relative rounded-2xl px-3 py-3.5 transition-colors md:px-4', 'hover:bg-slate-50/60 dark:hover:bg-slate-800/30', 'focus-within:bg-slate-50/80 dark:focus-within:bg-slate-800/40', isDragging && 'opacity-40', isDragTarget && 'bg-blue-500/[0.04] ring-1 ring-blue-400/40'),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start gap-2.5",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex shrink-0 items-center gap-0.5 pt-1",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            draggable: !disabled,
                            title: t('generation.dragSceneHint'),
                            "aria-label": t('generation.dragSceneHint'),
                            "aria-keyshortcuts": "Control+ArrowUp Control+ArrowDown Meta+ArrowUp Meta+ArrowDown",
                            onDragStart: (event)=>{
                                event.dataTransfer.effectAllowed = 'move';
                                event.dataTransfer.setData('text/plain', outline.id);
                                onDragStart();
                            },
                            onDragEnd: onDragEnd,
                            onKeyDown: (event)=>{
                                if (disabled) return;
                                // Keyboard reorder: Cmd/Ctrl + ArrowUp / ArrowDown. Plain arrows
                                // are reserved for browser text-cursor navigation when focus
                                // shifts between fields.
                                if (!(event.ctrlKey || event.metaKey)) return;
                                if (event.key === 'ArrowUp' && canMoveUp) {
                                    event.preventDefault();
                                    onMoveUp();
                                } else if (event.key === 'ArrowDown' && canMoveDown) {
                                    event.preventDefault();
                                    onMoveDown();
                                }
                            },
                            disabled: disabled,
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('flex size-7 shrink-0 cursor-grab items-center justify-center rounded-md', 'text-muted-foreground/45 transition-all', 'hover:bg-muted hover:text-foreground/80', 'group-hover/scene:text-muted-foreground/70', 'active:cursor-grabbing', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30', disabled && 'pointer-events-none opacity-30'),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "size-4",
                                "aria-hidden": true
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('relative flex size-7 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-colors', 'bg-muted/60 text-muted-foreground', 'group-hover/scene:bg-muted'),
                            children: [
                                index + 1,
                                isStreamingTip && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.span, {
                                    "aria-hidden": true,
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('absolute -right-0.5 -top-0.5 size-2 rounded-full', theme.dot),
                                    animate: {
                                        scale: [
                                            0.8,
                                            1.2,
                                            0.8
                                        ],
                                        opacity: [
                                            0.6,
                                            1,
                                            0.6
                                        ]
                                    },
                                    transition: {
                                        duration: 1.2,
                                        repeat: Infinity
                                    }
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "min-w-0 flex-1 space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    ref: titleRef,
                                    value: outline.title,
                                    onChange: (event)=>onUpdate({
                                            title: event.target.value
                                        }),
                                    placeholder: t('generation.sceneTitlePlaceholder'),
                                    disabled: disabled,
                                    rows: 1,
                                    spellCheck: false,
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('flex-1 resize-none border-none bg-transparent p-0 text-base font-semibold leading-7 tracking-tight', 'placeholder:font-normal placeholder:text-muted-foreground/40', 'focus:outline-none focus:ring-0 md:text-lg', disabled && 'cursor-default')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex shrink-0 items-center gap-1.5 pt-0.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "inline-flex items-center overflow-hidden rounded-full",
                                            children: [
                                                !disabled && outline.type === 'quiz' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(QuizConfigDisclosure, {
                                                    outline: outline,
                                                    onUpdate: onUpdate,
                                                    theme: theme
                                                }),
                                                !disabled && outline.type === 'interactive' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InteractiveConfigDisclosure, {
                                                    outline: outline,
                                                    onUpdate: onUpdate,
                                                    theme: theme
                                                }),
                                                !disabled && outline.type === 'pbl' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PblConfigDisclosure, {
                                                    outline: outline,
                                                    onUpdate: onUpdate,
                                                    theme: theme
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TypePill, {
                                                    type: outline.type,
                                                    onChange: (type)=>onReplace((0,_lib_generation_outline_type__WEBPACK_IMPORTED_MODULE_7__/* .changeOutlineType */ .H)(outline, type)),
                                                    disabled: disabled,
                                                    label: sceneTypeLabel(outline.type),
                                                    theme: theme,
                                                    connected: !disabled && outline.type !== 'slide'
                                                })
                                            ]
                                        }),
                                        !disabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeleteSceneButton, {
                                            onConfirm: onRemove
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                            ref: descRef,
                            value: outline.description,
                            onChange: (event)=>onUpdate({
                                    description: event.target.value
                                }),
                            placeholder: t('generation.sceneDescriptionPlaceholder'),
                            disabled: disabled,
                            rows: 1,
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('block w-full resize-none border-none bg-transparent p-0 text-sm leading-relaxed text-muted-foreground', 'placeholder:text-muted-foreground/40', 'focus:outline-none focus:ring-0 focus:text-foreground/90', disabled && 'cursor-default')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-wrap items-center gap-1.5 pt-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_13__/* .AnimatePresence */ .N, {
                                    initial: false,
                                    children: (outline.keyPoints ?? []).filter(Boolean).map((point, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.span, {
                                            layout: true,
                                            initial: {
                                                opacity: 0,
                                                scale: 0.85
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            exit: {
                                                opacity: 0,
                                                scale: 0.85
                                            },
                                            transition: {
                                                duration: 0.15
                                            },
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('group/chip inline-flex max-w-[18rem] items-center gap-1 rounded-full px-2.5 py-1 text-xs', 'bg-muted/70 text-foreground/80'),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "whitespace-normal break-words",
                                                    title: point,
                                                    children: point
                                                }),
                                                !disabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>removeKeyPoint(idx),
                                                    "aria-label": t('generation.removeKeyPoint'),
                                                    className: "ml-0.5 inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground/0 transition-colors hover:bg-muted-foreground/20 hover:text-muted-foreground group-hover/chip:text-muted-foreground/70",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                        className: "size-2.5"
                                                    })
                                                })
                                            ]
                                        }, `${outline.id}-kp-${idx}-${point}`))
                                }),
                                !disabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KeyPointInput, {
                                    value: keyPointDraft,
                                    onChange: setKeyPointDraft,
                                    onKeyDown: handleKeyPointKeyDown,
                                    placeholder: t('generation.addKeyPoint')
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
// ────────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ────────────────────────────────────────────────────────────────────────────────
function EmptyState({ isStreaming, disabled, onAdd }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    if (isStreaming) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex min-h-[200px] flex-col items-center justify-center gap-3 px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.div, {
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                    },
                    className: "text-blue-500/70",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                        className: "size-6"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: t('generation.outlineEditorStreamingWaiting')
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center gap-4 px-6 py-12 text-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: t('generation.noOutlines')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                variant: "outline",
                onClick: onAdd,
                disabled: disabled,
                className: "rounded-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                        className: "size-4"
                    }),
                    t('generation.addFirstScene')
                ]
            })
        ]
    });
}
function TypePill({ type, onChange, disabled, label, theme, connected = false }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenu */ .rI, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuTrigger */ .ty, {
                asChild: true,
                disabled: disabled,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors', connected ? 'rounded-none' : 'rounded-full', theme.chip, !disabled && theme.chipHover, disabled && 'cursor-default'),
                    children: [
                        label,
                        !disabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                            className: "size-3 opacity-70"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuContent */ .SQ, {
                align: "end",
                className: "min-w-[140px]",
                children: SCENE_TYPES.map((option)=>{
                    const optionTheme = TYPE_THEME[option];
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__/* .DropdownMenuItem */ ._2, {
                        onClick: ()=>onChange(option),
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('size-2 rounded-full', optionTheme.accent)
                                    }),
                                    t(`generation.sceneType${capitalize(option)}`)
                                ]
                            }),
                            option === type && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "size-3.5 text-muted-foreground"
                            })
                        ]
                    }, option);
                })
            })
        ]
    });
}
function DeleteSceneButton({ onConfirm }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .Popover */ .AM, {
        open: open,
        onOpenChange: setOpen,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    type: "button",
                    "aria-label": t('generation.deleteScene'),
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('inline-flex size-7 items-center justify-center rounded-full text-muted-foreground/40 transition-all', 'hover:bg-destructive/10 hover:text-destructive', 'opacity-0 group-hover/scene:opacity-100', 'data-[state=open]:opacity-100 data-[state=open]:bg-destructive/10 data-[state=open]:text-destructive', 'focus-visible:opacity-100 focus-visible:outline-none'),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                        className: "size-3.5"
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverContent */ .hl, {
                align: "end",
                sideOffset: 4,
                className: "w-56 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm font-medium",
                        children: t('generation.deleteSceneConfirm')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "mt-1 text-xs text-muted-foreground",
                        children: t('generation.deleteSceneConfirmDesc')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-3 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setOpen(false),
                                className: "h-8",
                                children: t('common.cancel')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                type: "button",
                                variant: "destructive",
                                size: "sm",
                                onClick: ()=>{
                                    onConfirm();
                                    setOpen(false);
                                },
                                className: "h-8",
                                children: t('generation.deleteSceneConfirmAction')
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function StreamingPlaceholder({ nextIndex }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.li, {
        layout: true,
        initial: {
            opacity: 0,
            y: 8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8
        },
        transition: {
            type: 'spring',
            stiffness: 360,
            damping: 32
        },
        "aria-live": "polite",
        "aria-label": t('generation.outlineEditorStreamingWaiting'),
        className: "relative flex items-start gap-2.5 px-3 py-3.5 md:px-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex shrink-0 items-center gap-0.5 pt-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "size-7",
                        "aria-hidden": true
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "flex size-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-500",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "size-3.5 animate-spin"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0 flex-1 space-y-2 pt-1.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.div, {
                        "aria-hidden": true,
                        animate: {
                            opacity: [
                                0.35,
                                0.7,
                                0.35
                            ]
                        },
                        transition: {
                            duration: 1.4,
                            repeat: Infinity
                        },
                        className: "h-4 w-3/5 rounded-md bg-muted/50"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .PY1.div, {
                        "aria-hidden": true,
                        animate: {
                            opacity: [
                                0.35,
                                0.7,
                                0.35
                            ]
                        },
                        transition: {
                            duration: 1.4,
                            repeat: Infinity,
                            delay: 0.2
                        },
                        className: "h-3 w-2/5 rounded bg-muted/40"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "sr-only",
                children: t('generation.outlineEditorStreamingProgress', {
                    count: nextIndex - 1
                })
            })
        ]
    });
}
function InsertDivider({ onClick, disabled, position = 'between' }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const isEdge = position === 'edge';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        role: "presentation",
        className: "relative z-10 flex h-7 items-center justify-center px-3 md:px-4",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            type: "button",
            onClick: onClick,
            disabled: disabled,
            "aria-label": t('generation.insertSceneHere'),
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('group/insert relative flex h-full w-full items-center justify-center transition-opacity', // Edges show a barely-there hint by default; hover/focus brings it to full
            isEdge ? 'opacity-25 hover:opacity-100 focus-visible:opacity-100' : 'opacity-0 hover:opacity-100 focus-visible:opacity-100', 'focus-visible:outline-none', disabled && 'pointer-events-none opacity-20'),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    "aria-hidden": true,
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('absolute top-1/2 h-px -translate-y-1/2 transition-colors', // Edge: short, neutral line; between: longer, blue line
                    isEdge ? 'inset-x-16 bg-muted-foreground/40 group-hover/insert:bg-blue-500/60' : 'inset-x-8 bg-blue-400/30 group-hover/insert:bg-blue-500/60')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('relative flex items-center justify-center rounded-full text-white transition-all', // Edge: smaller, neutral, no shadow until hover; between: full blue badge
                    isEdge ? 'size-4 bg-muted-foreground/60 group-hover/insert:size-5 group-hover/insert:bg-blue-500 group-hover/insert:shadow-md group-hover/insert:shadow-blue-500/30' : 'size-5 bg-blue-500 shadow-md shadow-blue-500/30 group-hover/insert:scale-110'),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('transition-all', isEdge ? 'size-2.5' : 'size-3')
                    })
                })
            ]
        })
    });
}
function KeyPointInput({ value, onChange, onKeyDown, placeholder }) {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(120);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setWidth(Math.max(100, Math.min(280, value.length * 8 + 40)));
    }, [
        value
    ]);
    // Note: intentionally no onBlur commit. Committing on blur surprises users
    // who type a partial value then click away — that text becomes a chip they
    // didn't ask for. Only Enter / comma should commit (handled by onKeyDown).
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-flex items-center gap-1",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            ref: ref,
            type: "text",
            value: value,
            onChange: (event)=>onChange(event.target.value),
            onKeyDown: onKeyDown,
            placeholder: placeholder,
            style: {
                width
            },
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('inline-block rounded-full bg-transparent px-2.5 py-1 text-xs', 'text-foreground placeholder:text-muted-foreground/50', 'border border-dashed border-transparent transition-colors', 'hover:border-muted-foreground/20 focus:border-blue-400/50 focus:bg-blue-500/[0.03]', 'focus:outline-none focus:ring-0')
        })
    });
}
// Left segment of the cascading type control: a themed pill chunk that joins the
// TypePill on its right via a hairline divider (the wrapper clips the corners).
function cascadeSegmentClass(theme) {
    return (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('inline-flex items-center gap-1 border-r border-black/[0.07] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors dark:border-white/10', theme.chip, theme.chipHover);
}
function QuizConfigDisclosure({ outline, onUpdate, theme }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const config = outline.quizConfig ?? {
        questionCount: 3,
        difficulty: 'medium',
        questionTypes: [
            'single'
        ]
    };
    const updateConfig = (updates)=>{
        onUpdate({
            quizConfig: {
                questionCount: config.questionCount ?? 3,
                difficulty: config.difficulty ?? 'medium',
                questionTypes: config.questionTypes ?? [
                    'single'
                ],
                ...updates
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .Popover */ .AM, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: cascadeSegmentClass(theme),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "max-w-[8rem] truncate",
                            children: t('generation.quizConfigSummary', {
                                count: config.questionCount ?? 3
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                            className: "size-3 opacity-70"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverContent */ .hl, {
                align: "start",
                sideOffset: 6,
                className: "w-64 space-y-2.5 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.quizQuestionCount')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Stepper, {
                                value: config.questionCount ?? 3,
                                min: 1,
                                max: 10,
                                onChange: (next)=>updateConfig({
                                        questionCount: next
                                    })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.quizDifficulty')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SegmentedControl, {
                                value: config.difficulty ?? 'medium',
                                onChange: (value)=>updateConfig({
                                        difficulty: value
                                    }),
                                options: [
                                    {
                                        value: 'easy',
                                        label: t('generation.quizDifficultyEasy')
                                    },
                                    {
                                        value: 'medium',
                                        label: t('generation.quizDifficultyMedium')
                                    },
                                    {
                                        value: 'hard',
                                        label: t('generation.quizDifficultyHard')
                                    }
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.quizType')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex gap-1",
                                children: [
                                    [
                                        'single',
                                        'generation.quizTypeSingle'
                                    ],
                                    [
                                        'multiple',
                                        'generation.quizTypeMultiple'
                                    ],
                                    [
                                        'short_answer',
                                        'generation.quizTypeText'
                                    ]
                                ].map(([type, labelKey])=>{
                                    const current = config.questionTypes ?? [
                                        'single'
                                    ];
                                    const selected = current.includes(type);
                                    const isOnlySelected = selected && current.length === 1;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        disabled: isOnlySelected,
                                        "aria-pressed": selected,
                                        onClick: ()=>{
                                            const next = selected ? current.filter((t)=>t !== type) : Array.from(new Set([
                                                ...current,
                                                type
                                            ]));
                                            if (next.length === 0) return;
                                            updateConfig({
                                                questionTypes: next
                                            });
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all', 'border', selected ? 'border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-200' : 'border-border/40 bg-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground', isOnlySelected && 'cursor-not-allowed opacity-90'),
                                        children: t(labelKey)
                                    }, type);
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
const WIDGET_KINDS = [
    [
        'simulation',
        'generation.widgetSimulation'
    ],
    [
        'diagram',
        'generation.widgetDiagram'
    ],
    [
        'code',
        'generation.widgetCode'
    ],
    [
        'game',
        'generation.widgetGame'
    ],
    [
        'visualization3d',
        'generation.widgetVisualization3d'
    ]
];
function InteractiveConfigDisclosure({ outline, onUpdate, theme }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const widgetType = outline.widgetType ?? 'simulation';
    const concept = outline.widgetOutline?.concept ?? '';
    // A gated procedural-skill outline isn't manually selectable, but it can reach
    // here via preservation; surface it as the current (selected) kind so it isn't
    // mislabeled, and never clobber its task-engine fields on a same-kind re-select.
    const kinds = widgetType === 'procedural-skill' ? [
        [
            'procedural-skill',
            'generation.widgetProceduralSkill'
        ],
        ...WIDGET_KINDS
    ] : WIDGET_KINDS;
    const setWidgetType = (next)=>{
        if (next === widgetType) return; // same kind — keep the existing widgetOutline as-is
        // Reset to the shared field only — keeping the previous kind's type-specific
        // widgetOutline fields (language/gameType/diagramType/…) would leak stale config.
        onUpdate({
            widgetType: next,
            widgetOutline: {
                concept
            }
        });
    };
    const setConcept = (next)=>{
        onUpdate({
            widgetType,
            widgetOutline: {
                ...outline.widgetOutline,
                concept: next
            }
        });
    };
    const currentLabel = kinds.find(([value])=>value === widgetType)?.[1] ?? 'generation.widgetSimulation';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .Popover */ .AM, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: cascadeSegmentClass(theme),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "max-w-[8rem] truncate",
                            children: t(currentLabel)
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                            className: "size-3 opacity-70"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverContent */ .hl, {
                align: "start",
                sideOffset: 6,
                className: "w-64 space-y-2.5 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.interactiveWidgetKind')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex flex-wrap gap-1",
                                children: kinds.map(([value, labelKey])=>{
                                    const selected = value === widgetType;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        "aria-pressed": selected,
                                        onClick: ()=>setWidgetType(value),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('rounded-md border px-2 py-1.5 text-xs font-medium transition-all', selected ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200' : 'border-border/40 bg-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground'),
                                        children: t(labelKey)
                                    }, value);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.interactiveConcept')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                value: concept,
                                onChange: (event)=>setConcept(event.target.value),
                                placeholder: t('generation.interactiveConceptPlaceholder'),
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('w-full rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs', 'focus:border-emerald-400/50 focus:outline-none focus:ring-0')
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function PblConfigDisclosure({ outline, onUpdate, theme }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const [skillDraft, setSkillDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const projectTopic = outline.pblConfig?.projectTopic ?? '';
    const projectDescription = outline.pblConfig?.projectDescription ?? '';
    const skills = outline.pblConfig?.targetSkills ?? [];
    const updateConfig = (updates)=>{
        onUpdate({
            pblConfig: {
                projectTopic,
                projectDescription,
                targetSkills: skills,
                ...outline.pblConfig?.issueCount !== undefined && {
                    issueCount: outline.pblConfig.issueCount
                },
                ...updates
            }
        });
    };
    const addSkill = ()=>{
        const value = skillDraft.trim();
        if (!value || skills.includes(value)) {
            setSkillDraft('');
            return;
        }
        updateConfig({
            targetSkills: [
                ...skills,
                value
            ]
        });
        setSkillDraft('');
    };
    const removeSkill = (skill)=>{
        updateConfig({
            targetSkills: skills.filter((s)=>s !== skill)
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .Popover */ .AM, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: cascadeSegmentClass(theme),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "max-w-[8rem] truncate",
                            children: t('generation.pblConfigSummary')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                            className: "size-3 opacity-70"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverContent */ .hl, {
                align: "start",
                sideOffset: 6,
                className: "w-72 space-y-2.5 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.pblProjectTopic')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                value: projectTopic,
                                onChange: (event)=>updateConfig({
                                        projectTopic: event.target.value
                                    }),
                                placeholder: t('generation.pblProjectTopicPlaceholder'),
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('w-full rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs', 'focus:border-amber-400/50 focus:outline-none focus:ring-0')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.pblProjectDescription')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                value: projectDescription,
                                onChange: (event)=>updateConfig({
                                        projectDescription: event.target.value
                                    }),
                                placeholder: t('generation.pblProjectDescriptionPlaceholder'),
                                rows: 2,
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('w-full resize-none rounded-md border border-border/50 bg-background px-2 py-1.5 text-xs', 'focus:border-amber-400/50 focus:outline-none focus:ring-0')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: t('generation.pblTargetSkills')
                            }),
                            skills.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex flex-wrap gap-1",
                                children: skills.map((skill)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-200",
                                        children: [
                                            skill,
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>removeSkill(skill),
                                                "aria-label": t('generation.removeSkill'),
                                                className: "inline-flex size-3 items-center justify-center rounded-full hover:bg-amber-500/20",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "size-2.5"
                                                })
                                            })
                                        ]
                                    }, skill))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                value: skillDraft,
                                onChange: (event)=>setSkillDraft(event.target.value),
                                onKeyDown: (event)=>{
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        addSkill();
                                    }
                                },
                                onBlur: addSkill,
                                placeholder: t('generation.pblAddSkill'),
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('w-full rounded-md border border-dashed border-border/50 bg-background px-2 py-1.5 text-xs', 'focus:border-amber-400/50 focus:outline-none focus:ring-0')
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function Stepper({ value, min, max, onChange }) {
    const dec = ()=>onChange(Math.max(min, value - 1));
    const inc = ()=>onChange(Math.min(max, value + 1));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "inline-flex items-center overflow-hidden rounded-md border border-border/50 bg-background",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: dec,
                disabled: value <= min,
                "aria-label": "Decrease",
                className: "flex size-7 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                    className: "size-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "w-8 text-center text-sm font-semibold tabular-nums",
                children: value
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: inc,
                disabled: value >= max,
                "aria-label": "Increase",
                className: "flex size-7 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_GripVertical_Loader2_Minimize2_Minus_Plus_Sparkles_Trash2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                    className: "size-3.5"
                })
            })
        ]
    });
}
function SegmentedControl({ value, onChange, options }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-flex rounded-md border border-border/50 bg-background p-0.5",
        children: options.map((opt)=>{
            const selected = opt.value === value;
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: ()=>onChange(opt.value),
                "aria-pressed": selected,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('rounded px-2 py-0.5 text-xs font-medium transition-colors', selected ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'),
                children: opt.label
            }, opt.value);
        })
    });
}
// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────
function useAutoResize(ref, value) {
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const node = ref.current;
        if (!node) return;
        // Defer measurement+write to a frame so a burst of edits doesn't thrash
        // layout (read scrollHeight ≡ forced reflow). Cancel any prior frame so
        // we only run once per render.
        const frame = requestAnimationFrame(()=>{
            node.style.height = 'auto';
            node.style.height = `${node.scrollHeight}px`;
        });
        return ()=>cancelAnimationFrame(frame);
    }, [
        ref,
        value
    ]);
}
function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}


/***/ }),

/***/ 98111:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerationPreviewPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(15696);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(78235);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(35484);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(90710);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90190);
/* harmony import */ var _components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19205);
/* harmony import */ var _components_openmaic_generation_outlines_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92789);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(40980);
/* harmony import */ var _lib_store_stage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15793);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(75748);
/* harmony import */ var _lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66604);
/* harmony import */ var _lib_audio_voice_resolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35595);
/* harmony import */ var _lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(14755);
/* harmony import */ var _lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29455);
/* harmony import */ var _lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(58390);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(65066);
/* harmony import */ var _lib_utils_model_config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(10267);
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(29732);
/* harmony import */ var _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(39371);
/* harmony import */ var _lib_media_video_manifest__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(37013);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(46821);
/* harmony import */ var _components_openmaic_agent_agent_reveal_modal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(87138);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(7603);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(45801);
/* harmony import */ var _components_visualizers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(57656);
/* harmony import */ var _vocational_mode__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(2708);
/* __next_internal_client_entry_do_not_use__ default auto */ 




























const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_19__/* .createLogger */ .h)('GenerationPreview');
const OUTLINE_REVIEW_AUTO_CONTINUE_MS = 2500;
function GenerationPreviewContent() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_14__/* .useI18n */ .s)();
    const hasStartedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const abortControllerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const outlineReviewTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const outlineReviewResolveRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Sticky flag: true once the user signals review intent (either by clicking the
    // streaming card mid-stream, or by restoring a session that was already in review).
    // Combined with `reviewOutlineEnabled` to decide whether the post-stream timer fires.
    const outlineReviewIntentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const { profiles: voxcpmProfiles } = (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_12__/* .useVoxCPMVoiceProfiles */ .tD)();
    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [sessionLoaded, setSessionLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentStepIndex, setCurrentStepIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [isComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [statusMessage, setStatusMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [streamingOutlines, setStreamingOutlines] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isOutlineStreaming, setIsOutlineStreaming] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [truncationWarnings, setTruncationWarnings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [webSearchSources, setWebSearchSources] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [showAgentReveal, setShowAgentReveal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isConfirmingOutlines, setIsConfirmingOutlines] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [generatedAgents, setGeneratedAgents] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const agentRevealResolveRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const reviewOutlineEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((s)=>s.reviewOutlineEnabled);
    const setReviewOutlineEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((s)=>s.setReviewOutlineEnabled);
    // Compute active steps based on session state
    const activeSteps = (0,_types__WEBPACK_IMPORTED_MODULE_20__/* .getActiveSteps */ .O)(session);
    const isOutlineReady = session?.previewPhase === 'outline-ready';
    const isReviewingOutlines = session?.previewPhase === 'review';
    const persistSession = (nextSession)=>{
        setSession(nextSession);
        sessionStorage.setItem('generationSession', JSON.stringify(nextSession));
    };
    const clearOutlineReviewTimer = ()=>{
        if (outlineReviewTimerRef.current) {
            clearTimeout(outlineReviewTimerRef.current);
            outlineReviewTimerRef.current = null;
        }
    };
    const waitForOutlineReviewChoice = (outlines, shouldReview, signal)=>new Promise((resolve, reject)=>{
            if (signal.aborted) {
                reject(new DOMException('Aborted', 'AbortError'));
                return;
            }
            outlineReviewResolveRef.current = resolve;
            // Reject on abort so navigating away (`goBackToHome`) or unmounting
            // settles this promise instead of leaking the awaiting startGeneration
            // closure. The catch at the bottom of startGeneration already swallows
            // AbortError silently.
            const onAbort = ()=>{
                clearOutlineReviewTimer();
                outlineReviewResolveRef.current = null;
                reject(new DOMException('Aborted', 'AbortError'));
            };
            signal.addEventListener('abort', onAbort, {
                once: true
            });
            if (!shouldReview) {
                outlineReviewTimerRef.current = setTimeout(()=>{
                    outlineReviewTimerRef.current = null;
                    outlineReviewResolveRef.current = null;
                    signal.removeEventListener('abort', onAbort);
                    resolve(outlines);
                }, OUTLINE_REVIEW_AUTO_CONTINUE_MS);
            }
        });
    // Load session from sessionStorage
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_15__/* .cleanupOldImages */ .Eg)(24).catch((e)=>log.error(e));
        const saved = sessionStorage.getItem('generationSession');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (!parsed.previewPhase) {
                    parsed.previewPhase = parsed.sceneOutlines?.length ? 'outline-ready' : 'preparing';
                }
                // Restore review intent: a saved 'review' phase without outlines means the user
                // had opened the editor mid-stream before the refresh — preserve that intent so
                // the post-stream auto-continue timer doesn't fire after SSE restart.
                if (parsed.previewPhase === 'review' && !parsed.sceneOutlines?.length) {
                    outlineReviewIntentRef.current = true;
                }
                parsed.taskEngineMode = parsed.taskEngineMode === true;
                setSession(parsed);
            } catch (e) {
                log.error('Failed to parse generation session:', e);
            }
        }
        setSessionLoaded(true);
    }, []);
    // Abort all in-flight requests on unmount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            abortControllerRef.current?.abort();
            clearOutlineReviewTimer();
        };
    }, []);
    // Get API credentials from localStorage
    const getApiHeaders = ()=>{
        const modelConfig = (0,_lib_utils_model_config__WEBPACK_IMPORTED_MODULE_16__/* .getCurrentModelConfig */ .R)();
        const settings = _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore.getState();
        const imageProviderConfig = settings.imageProvidersConfig?.[settings.imageProviderId];
        const videoProviderConfig = settings.videoProvidersConfig?.[settings.videoProviderId];
        return {
            'Content-Type': 'application/json',
            'x-model': modelConfig.modelString,
            'x-api-key': modelConfig.apiKey,
            'x-base-url': modelConfig.baseUrl,
            'x-provider-type': modelConfig.providerType || '',
            // Image generation provider
            'x-image-provider': settings.imageProviderId || '',
            'x-image-model': settings.imageModelId || '',
            'x-image-api-key': imageProviderConfig?.apiKey || '',
            'x-image-base-url': imageProviderConfig?.baseUrl || '',
            // Video generation provider
            'x-video-provider': settings.videoProviderId || '',
            'x-video-model': settings.videoModelId || '',
            'x-video-api-key': videoProviderConfig?.apiKey || '',
            'x-video-base-url': videoProviderConfig?.baseUrl || '',
            // Media generation toggles
            'x-image-generation-enabled': String(settings.imageGenerationEnabled ?? false),
            'x-video-generation-enabled': String(settings.videoGenerationEnabled ?? false)
        };
    };
    const withThinkingConfig = (body)=>{
        const { thinkingConfig } = (0,_lib_utils_model_config__WEBPACK_IMPORTED_MODULE_16__/* .getCurrentModelConfig */ .R)();
        return thinkingConfig ? {
            ...body,
            thinkingConfig
        } : body;
    };
    // Auto-start generation when session is loaded
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!session || hasStartedRef.current) return;
        const needsOutlines = !session.sceneOutlines || session.sceneOutlines.length === 0;
        const phase = session.previewPhase;
        const shouldAutoStart = !phase || phase === 'preparing' || phase === 'generating-content' || // Refresh during early-review: editor is shown but outlines weren't persisted,
        // so kick off SSE again — the editor will receive streaming outlines.
        phase === 'review' && needsOutlines;
        if (shouldAutoStart) {
            hasStartedRef.current = true;
            startGeneration();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        session
    ]);
    // Main generation flow
    const startGeneration = async (sessionOverride)=>{
        const generationSession = sessionOverride ?? session;
        if (!generationSession) return;
        // Create AbortController for this generation run
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const signal = controller.signal;
        // Use a local mutable copy so we can update it after PDF parsing
        let currentSession = generationSession;
        setError(null);
        setCurrentStepIndex(0);
        try {
            // Compute active steps for this session (recomputed after session mutations)
            let activeSteps = (0,_types__WEBPACK_IMPORTED_MODULE_20__/* .getActiveSteps */ .O)(currentSession);
            // Determine if we need the PDF analysis step
            const hasPdfToAnalyze = !!currentSession.pdfStorageKey && !currentSession.pdfText;
            // If no PDF to analyze, skip to the next available step
            if (!hasPdfToAnalyze) {
                const firstNonPdfIdx = activeSteps.findIndex((s)=>s.id !== 'pdf-analysis');
                setCurrentStepIndex(Math.max(0, firstNonPdfIdx));
            }
            // Step 0: Parse PDF if needed
            if (hasPdfToAnalyze) {
                log.debug('=== Generation Preview: Parsing PDF ===');
                const pdfBlob = await (0,_lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_15__/* .loadPdfBlob */ .uT)(currentSession.pdfStorageKey);
                if (!pdfBlob) {
                    throw new Error(t('generation.pdfLoadFailed'));
                }
                // Ensure pdfBlob is a valid Blob with content
                if (!(pdfBlob instanceof Blob) || pdfBlob.size === 0) {
                    log.error('Invalid PDF blob:', {
                        type: typeof pdfBlob,
                        size: pdfBlob instanceof Blob ? pdfBlob.size : 'N/A'
                    });
                    throw new Error(t('generation.pdfLoadFailed'));
                }
                // Wrap as a File to guarantee multipart/form-data with correct content-type
                const pdfFile = new File([
                    pdfBlob
                ], currentSession.pdfFileName || 'document.pdf', {
                    type: 'application/pdf'
                });
                const parseFormData = new FormData();
                parseFormData.append('pdf', pdfFile);
                if (currentSession.pdfProviderId) {
                    parseFormData.append('providerId', currentSession.pdfProviderId);
                }
                if (currentSession.pdfProviderConfig?.apiKey?.trim()) {
                    parseFormData.append('apiKey', currentSession.pdfProviderConfig.apiKey);
                }
                if (currentSession.pdfProviderConfig?.baseUrl?.trim()) {
                    parseFormData.append('baseUrl', currentSession.pdfProviderConfig.baseUrl);
                }
                const parseResponse = await fetch('/api/parse-pdf', {
                    method: 'POST',
                    body: parseFormData,
                    signal
                });
                if (!parseResponse.ok) {
                    const errorData = await parseResponse.json();
                    throw new Error(errorData.error || t('generation.pdfParseFailed'));
                }
                const parseResult = await parseResponse.json();
                if (!parseResult.success || !parseResult.data) {
                    throw new Error(t('generation.pdfParseFailed'));
                }
                let pdfText = parseResult.data.text;
                // Truncate if needed
                if (pdfText.length > _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_PDF_CONTENT_CHARS */ .k) {
                    pdfText = pdfText.substring(0, _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_PDF_CONTENT_CHARS */ .k);
                }
                // Create image metadata and store images
                // Prefer metadata.pdfImages (both parsers now return this)
                const rawPdfImages = parseResult.data.metadata?.pdfImages;
                const images = rawPdfImages ? rawPdfImages.map((img)=>({
                        id: img.id,
                        src: img.src || '',
                        pageNumber: img.pageNumber || 1,
                        description: img.description,
                        width: img.width,
                        height: img.height
                    })) : parseResult.data.images.map((src, i)=>({
                        id: `img_${i + 1}`,
                        src,
                        pageNumber: 1
                    }));
                const imageStorageIds = await (0,_lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_15__/* .storeImages */ .Ed)(images);
                const pdfImages = images.map((img, i)=>({
                        id: img.id,
                        src: '',
                        pageNumber: img.pageNumber,
                        description: img.description,
                        width: img.width,
                        height: img.height,
                        storageId: imageStorageIds[i]
                    }));
                // Update session with parsed PDF data
                const updatedSession = {
                    ...currentSession,
                    pdfText,
                    pdfImages,
                    imageStorageIds,
                    pdfStorageKey: undefined
                };
                setSession(updatedSession);
                sessionStorage.setItem('generationSession', JSON.stringify(updatedSession));
                // Truncation warnings
                const warnings = [];
                if (parseResult.data.text.length > _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_PDF_CONTENT_CHARS */ .k) {
                    warnings.push(t('generation.textTruncated', {
                        n: _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_PDF_CONTENT_CHARS */ .k
                    }));
                }
                if (images.length > _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_VISION_IMAGES */ .R) {
                    warnings.push(t('generation.imageTruncated', {
                        total: images.length,
                        max: _lib_constants_generation__WEBPACK_IMPORTED_MODULE_22__/* .MAX_VISION_IMAGES */ .R
                    }));
                }
                if (warnings.length > 0) {
                    setTruncationWarnings(warnings);
                }
                // Reassign local reference for subsequent steps
                currentSession = updatedSession;
                activeSteps = (0,_types__WEBPACK_IMPORTED_MODULE_20__/* .getActiveSteps */ .O)(currentSession);
            }
            // Step: Web Search (if enabled)
            const webSearchStepIdx = activeSteps.findIndex((s)=>s.id === 'web-search');
            if (currentSession.requirements.webSearch && webSearchStepIdx >= 0) {
                setCurrentStepIndex(webSearchStepIdx);
                setWebSearchSources([]);
                const wsSettings = _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore.getState();
                const wsProviderId = wsSettings.webSearchProviderId;
                const wsConfig = wsSettings.webSearchProvidersConfig?.[wsProviderId];
                const res = await fetch('/api/web-search', {
                    method: 'POST',
                    headers: getApiHeaders(),
                    body: JSON.stringify(withThinkingConfig({
                        query: currentSession.requirements.requirement,
                        pdfText: currentSession.pdfText || undefined,
                        providerId: wsProviderId,
                        apiKey: wsConfig?.apiKey || undefined,
                        baseUrl: wsConfig?.baseUrl || undefined,
                        baiduSubSources: wsProviderId === 'baidu' ? wsSettings.baiduSubSources : undefined
                    })),
                    signal
                });
                if (!res.ok) {
                    const data = await res.json().catch(()=>({
                            error: 'Web search failed'
                        }));
                    throw new Error(data.error || t('generation.webSearchFailed'));
                }
                const searchData = await res.json();
                const sources = (searchData.sources || []).map((s)=>({
                        title: s.title,
                        url: s.url
                    }));
                setWebSearchSources(sources);
                const updatedSessionWithSearch = {
                    ...currentSession,
                    researchContext: searchData.context || '',
                    researchSources: sources
                };
                setSession(updatedSessionWithSearch);
                sessionStorage.setItem('generationSession', JSON.stringify(updatedSessionWithSearch));
                currentSession = updatedSessionWithSearch;
                activeSteps = (0,_types__WEBPACK_IMPORTED_MODULE_20__/* .getActiveSteps */ .O)(currentSession);
            }
            // Load imageMapping early (needed for both outline and scene generation)
            let imageMapping = {};
            if (currentSession.imageStorageIds && currentSession.imageStorageIds.length > 0) {
                log.debug('Loading images from IndexedDB');
                imageMapping = await (0,_lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_15__/* .loadImageMapping */ .k5)(currentSession.imageStorageIds);
            } else if (currentSession.imageMapping && Object.keys(currentSession.imageMapping).length > 0) {
                log.debug('Using imageMapping from session (old format)');
                imageMapping = currentSession.imageMapping;
            }
            // Create stage client-side
            const stageId = (0,nanoid__WEBPACK_IMPORTED_MODULE_23__/* .nanoid */ .Ak)(10);
            const stage = {
                id: stageId,
                name: extractTopicFromRequirement(currentSession.requirements.requirement),
                description: '',
                style: 'professional',
                createdAt: Date.now(),
                updatedAt: Date.now(),
                interactiveMode: !!currentSession.requirements.interactiveMode,
                taskEngineMode: currentSession.taskEngineMode === true
            };
            // ── Generate outlines first (infers languageDirective) ──
            let outlines = currentSession.sceneOutlines;
            let languageDirective = currentSession.languageDirective;
            let courseTitle = currentSession.courseTitle;
            const outlineStepIdx = activeSteps.findIndex((s)=>s.id === 'outline');
            setCurrentStepIndex(outlineStepIdx >= 0 ? outlineStepIdx : 0);
            if (!outlines || outlines.length === 0) {
                log.debug('=== Generating outlines (SSE) ===');
                setStreamingOutlines([]);
                setIsOutlineStreaming(true);
                const outlineResult = await new Promise((resolve, reject)=>{
                    const collected = [];
                    let directive;
                    let title;
                    fetch('/api/generate/scene-outlines-stream', {
                        method: 'POST',
                        headers: getApiHeaders(),
                        body: JSON.stringify(withThinkingConfig({
                            requirements: currentSession.requirements,
                            pdfText: currentSession.pdfText,
                            pdfImages: currentSession.pdfImages,
                            imageMapping,
                            researchContext: currentSession.researchContext
                        })),
                        signal
                    }).then((res)=>{
                        if (!res.ok) {
                            return res.json().then((d)=>{
                                reject(new Error(d.error || t('generation.outlineGenerateFailed')));
                            });
                        }
                        const reader = res.body?.getReader();
                        if (!reader) {
                            reject(new Error(t('generation.streamNotReadable')));
                            return;
                        }
                        const decoder = new TextDecoder();
                        let sseBuffer = '';
                        const pump = ()=>reader.read().then(({ done, value })=>{
                                if (value) {
                                    sseBuffer += decoder.decode(value, {
                                        stream: !done
                                    });
                                    const lines = sseBuffer.split('\n');
                                    sseBuffer = lines.pop() || '';
                                    for (const line of lines){
                                        if (!line.startsWith('data: ')) continue;
                                        try {
                                            const evt = JSON.parse(line.slice(6));
                                            if (evt.type === 'languageDirective') {
                                                directive = evt.data;
                                            } else if (evt.type === 'courseTitle') {
                                                title = evt.data;
                                            } else if (evt.type === 'outline') {
                                                collected.push(evt.data);
                                                setStreamingOutlines([
                                                    ...collected
                                                ]);
                                            } else if (evt.type === 'retry') {
                                                collected.length = 0;
                                                // Drop any directive/title latched from the failed
                                                // attempt — the server resets these per attempt, so a
                                                // succeeding attempt that omits them must fall back, not
                                                // inherit the previous attempt's stale values.
                                                directive = undefined;
                                                title = undefined;
                                                setStreamingOutlines([]);
                                                setStatusMessage(t('generation.outlineRetrying'));
                                            } else if (evt.type === 'done') {
                                                directive = evt.languageDirective || directive;
                                                resolve({
                                                    outlines: evt.outlines || collected,
                                                    languageDirective: directive || 'Teach in the language that matches the user requirement.',
                                                    courseTitle: evt.courseTitle || title,
                                                    taskEngineMode: (0,_vocational_mode__WEBPACK_IMPORTED_MODULE_24__/* .resolveTaskEngineModeFromOutlineDoneEvent */ .t)(evt)
                                                });
                                                return;
                                            } else if (evt.type === 'error') {
                                                reject(new Error(evt.error));
                                                return;
                                            }
                                        } catch (e) {
                                            log.error('Failed to parse outline SSE:', line, e);
                                        }
                                    }
                                }
                                if (done) {
                                    if (collected.length > 0) {
                                        resolve({
                                            outlines: collected,
                                            languageDirective: directive || 'Teach in the language that matches the user requirement.',
                                            // Carry any title latched from a streaming `courseTitle`
                                            // event here too — symmetric with languageDirective — so
                                            // a stream that ends without an explicit `done` event
                                            // does not silently drop a valid inferred title.
                                            courseTitle: title,
                                            taskEngineMode: false
                                        });
                                    } else {
                                        reject(new Error(t('generation.outlineEmptyResponse')));
                                    }
                                    return;
                                }
                                return pump();
                            });
                        pump().catch(reject);
                    }).catch(reject);
                });
                outlines = outlineResult.outlines;
                languageDirective = outlineResult.languageDirective;
                courseTitle = outlineResult.courseTitle;
                const effectiveTaskEngineMode = outlineResult.taskEngineMode;
                setIsOutlineStreaming(false);
                // Mid-stream review intent (sticky ref) overrides the auto-continue timer.
                const userOpenedReviewEarly = outlineReviewIntentRef.current;
                const shouldReviewOutlines = _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore.getState().reviewOutlineEnabled || userOpenedReviewEarly;
                const updatedSession = {
                    ...currentSession,
                    sceneOutlines: outlines,
                    languageDirective,
                    courseTitle,
                    taskEngineMode: effectiveTaskEngineMode,
                    previewPhase: shouldReviewOutlines ? 'review' : 'outline-ready'
                };
                persistSession(updatedSession);
                currentSession = updatedSession;
                setStreamingOutlines(outlines);
                setStatusMessage(shouldReviewOutlines ? '' : t('generation.reviewOutlineAutoContinue'));
                setIsConfirmingOutlines(false);
                outlines = await waitForOutlineReviewChoice(outlines, shouldReviewOutlines, signal);
                clearOutlineReviewTimer();
                currentSession = {
                    ...currentSession,
                    sceneOutlines: outlines,
                    taskEngineMode: effectiveTaskEngineMode,
                    previewPhase: 'generating-content'
                };
                persistSession(currentSession);
                // User has committed to course generation (either by confirming the
                // outline review or by letting the auto-continue timer fire). Now it's
                // safe to wipe the homepage draft cache; before this point, "back to
                // requirements" must restore the user's original input.
                try {
                    localStorage.removeItem('requirementDraft');
                } catch  {
                /* ignore */ }
            }
            // Move to next step
            setStatusMessage('');
            if (!outlines || outlines.length === 0) {
                throw new Error(t('generation.outlineEmptyResponse'));
            }
            stage.taskEngineMode = currentSession.taskEngineMode === true;
            // Store languageDirective on the stage
            if (languageDirective) {
                stage.languageDirective = languageDirective;
            }
            // Adopt the LLM-inferred course title as the stage name when available,
            // replacing the raw-requirement placeholder set at stage creation time.
            if (courseTitle) {
                stage.name = courseTitle;
            }
            // ── Agent generation (after outlines — uses languageDirective + outlines) ──
            const settings = _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore.getState();
            let agents = [];
            if (settings.agentMode === 'auto') {
                const agentStepIdx = activeSteps.findIndex((s)=>s.id === 'agent-generation');
                if (agentStepIdx >= 0) setCurrentStepIndex(agentStepIdx);
                try {
                    const allAvatars = [
                        {
                            path: '/avatars/teacher.png',
                            desc: 'Male teacher with glasses, holding a book, green background'
                        },
                        {
                            path: '/avatars/teacher-2.png',
                            desc: 'Female teacher with long dark hair, blue traditional outfit, gentle expression'
                        },
                        {
                            path: '/avatars/assist.png',
                            desc: 'Young female assistant with glasses, pink background, friendly smile'
                        },
                        {
                            path: '/avatars/assist-2.png',
                            desc: 'Young female in orange top and purple overalls, cheerful and approachable'
                        },
                        {
                            path: '/avatars/clown.png',
                            desc: 'Energetic girl with glasses pointing up, green shirt, lively and fun'
                        },
                        {
                            path: '/avatars/clown-2.png',
                            desc: 'Playful girl with curly hair doing rock gesture, blue shirt, humorous vibe'
                        },
                        {
                            path: '/avatars/curious.png',
                            desc: 'Surprised boy with glasses, hand on cheek, curious expression'
                        },
                        {
                            path: '/avatars/curious-2.png',
                            desc: 'Boy with backpack holding a book and question mark bubble, inquisitive'
                        },
                        {
                            path: '/avatars/note-taker.png',
                            desc: 'Studious boy with glasses, blue shirt, calm and organized'
                        },
                        {
                            path: '/avatars/note-taker-2.png',
                            desc: 'Active boy with yellow backpack waving, blue outfit, enthusiastic learner'
                        },
                        {
                            path: '/avatars/thinker.png',
                            desc: 'Thoughtful girl with hand on chin, purple background, contemplative'
                        },
                        {
                            path: '/avatars/thinker-2.png',
                            desc: 'Girl reading a book intently, long dark hair, intellectual and focused'
                        }
                    ];
                    const getAvailableVoicesForGeneration = ()=>{
                        const providers = (0,_lib_audio_voice_resolver__WEBPACK_IMPORTED_MODULE_10__/* .getEnabledProvidersWithVoices */ .Pf)(settings.ttsProvidersConfig, voxcpmProfiles);
                        return providers.flatMap((p)=>p.voices.map((v)=>({
                                    providerId: p.providerId,
                                    voiceId: v.id,
                                    voiceName: v.name,
                                    voiceLanguage: v.language
                                })));
                    };
                    const agentResp = await fetch('/api/generate/agent-profiles', {
                        method: 'POST',
                        headers: getApiHeaders(),
                        body: JSON.stringify(withThinkingConfig({
                            stageInfo: {
                                name: stage.name,
                                description: stage.description
                            },
                            sceneOutlines: outlines.map((o)=>({
                                    title: o.title,
                                    description: o.description
                                })),
                            languageDirective,
                            availableAvatars: allAvatars.map((a)=>a.path),
                            avatarDescriptions: allAvatars.map((a)=>({
                                    path: a.path,
                                    desc: a.desc
                                })),
                            availableVoices: getAvailableVoicesForGeneration()
                        })),
                        signal
                    });
                    if (!agentResp.ok) throw new Error('Agent generation failed');
                    const agentData = await agentResp.json();
                    if (!agentData.success) throw new Error(agentData.error || 'Agent generation failed');
                    // Save to IndexedDB and registry. The agent-profile LLM has already
                    // bound each agent's voice (from availableVoices); the fallback for an
                    // invalid/unavailable voice is applied later at the live TTS call.
                    const { saveGeneratedAgents } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 66604));
                    const savedIds = await saveGeneratedAgents(stage.id, agentData.agents);
                    settings.setSelectedAgentIds(savedIds);
                    // Stage-derived, not a user choice — must not carry across classrooms.
                    settings.setAgentSelectionIsUserSet(false);
                    stage.agentIds = savedIds;
                    // Show card-reveal modal, continue generation once all cards are revealed
                    setGeneratedAgents(agentData.agents);
                    setShowAgentReveal(true);
                    await new Promise((resolve)=>{
                        agentRevealResolveRef.current = resolve;
                    });
                    agents = savedIds.map((id)=>_lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_9__/* .useAgentRegistry */ .E_.getState().getAgent(id)).filter(Boolean).map((a)=>({
                            id: a.id,
                            name: a.name,
                            role: a.role,
                            persona: a.persona
                        }));
                } catch (err) {
                    log.warn('[Generation] Agent generation failed, falling back to presets:', err);
                    const registry = _lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_9__/* .useAgentRegistry */ .E_.getState();
                    const fallbackIds = settings.selectedAgentIds.filter((id)=>{
                        const a = registry.getAgent(id);
                        return a && !a.isGenerated;
                    });
                    agents = fallbackIds.map((id)=>registry.getAgent(id)).filter(Boolean).map((a)=>({
                            id: a.id,
                            name: a.name,
                            role: a.role,
                            persona: a.persona
                        }));
                    stage.agentIds = fallbackIds;
                }
            } else {
                // Preset mode — use selected agents (include persona)
                // Filter out stale generated agent IDs that may linger in settings
                const registry = _lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_9__/* .useAgentRegistry */ .E_.getState();
                const presetAgentIds = settings.selectedAgentIds.filter((id)=>{
                    const a = registry.getAgent(id);
                    return a && !a.isGenerated;
                });
                agents = presetAgentIds.map((id)=>registry.getAgent(id)).filter(Boolean).map((a)=>({
                        id: a.id,
                        name: a.name,
                        role: a.role,
                        persona: a.persona
                    }));
                stage.agentIds = presetAgentIds;
            }
            // Move to scene generation step
            setStatusMessage('');
            if (!outlines || outlines.length === 0) {
                throw new Error(t('generation.outlineEmptyResponse'));
            }
            // Store stage and outlines
            const store = _lib_store_stage__WEBPACK_IMPORTED_MODULE_7__/* .useStageStore */ .L.getState();
            stage.videoManifest = (0,_lib_media_video_manifest__WEBPACK_IMPORTED_MODULE_25__/* .buildVideoManifestFromOutlines */ .Gc)(outlines);
            store.setStage(stage);
            store.setOutlines(outlines);
            // Advance to slide-content step
            const contentStepIdx = activeSteps.findIndex((s)=>s.id === 'slide-content');
            if (contentStepIdx >= 0) setCurrentStepIndex(contentStepIdx);
            // Build stageInfo and userProfile for API call
            const stageInfo = {
                name: stage.name,
                description: stage.description,
                style: stage.style
            };
            const userProfile = currentSession.requirements.userNickname || currentSession.requirements.userBio ? `Student: ${currentSession.requirements.userNickname || 'Unknown'}${currentSession.requirements.userBio ? ` — ${currentSession.requirements.userBio}` : ''}` : undefined;
            // Generate ONLY the first scene
            store.setGeneratingOutlines(outlines);
            const firstOutline = outlines[0];
            // Step 2: Generate content (currentStepIndex is already 2)
            const contentResp = await fetch('/api/generate/scene-content', {
                method: 'POST',
                headers: getApiHeaders(),
                body: JSON.stringify(withThinkingConfig({
                    outline: firstOutline,
                    allOutlines: outlines,
                    pdfImages: currentSession.pdfImages,
                    imageMapping,
                    stageInfo,
                    stageId: stage.id,
                    agents,
                    languageDirective,
                    requirements: currentSession.requirements
                })),
                signal
            });
            if (!contentResp.ok) {
                const errorData = await contentResp.json().catch(()=>({
                        error: 'Request failed'
                    }));
                throw new Error(errorData.error || t('generation.sceneGenerateFailed'));
            }
            const contentData = await contentResp.json();
            if (!contentData.success || !contentData.content) {
                throw new Error(contentData.error || t('generation.sceneGenerateFailed'));
            }
            // Generate actions (activate actions step indicator)
            const actionsStepIdx = activeSteps.findIndex((s)=>s.id === 'actions');
            setCurrentStepIndex(actionsStepIdx >= 0 ? actionsStepIdx : currentStepIndex + 1);
            const actionsResp = await fetch('/api/generate/scene-actions', {
                method: 'POST',
                headers: getApiHeaders(),
                body: JSON.stringify(withThinkingConfig({
                    outline: contentData.effectiveOutline || firstOutline,
                    allOutlines: outlines,
                    content: contentData.content,
                    stageId: stage.id,
                    agents,
                    previousSpeeches: [],
                    userProfile,
                    languageDirective
                })),
                signal
            });
            if (!actionsResp.ok) {
                const errorData = await actionsResp.json().catch(()=>({
                        error: 'Request failed'
                    }));
                throw new Error(errorData.error || t('generation.sceneGenerateFailed'));
            }
            const data = await actionsResp.json();
            if (!data.success || !data.scene) {
                throw new Error(data.error || t('generation.sceneGenerateFailed'));
            }
            // Generate TTS for first scene (part of actions step — blocking)
            if (settings.ttsEnabled && settings.ttsProviderId !== 'browser-native-tts' && (0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_11__/* .isTTSProviderEnabled */ .mO)(settings.ttsProviderId, settings.ttsProvidersConfig?.[settings.ttsProviderId])) {
                const ttsProviderConfig = settings.ttsProvidersConfig?.[settings.ttsProviderId];
                // Narration uses the teacher agent's voice (single resolver → stable timbre).
                const teacherAgent = (0,_lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_13__/* .pickNarratorAgent */ .kc)(_lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_9__/* .useAgentRegistry */ .E_.getState().listAgents());
                const providerOptions = await (0,_lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_13__/* .resolveAgentVoiceOptions */ .wz)(teacherAgent, {
                    providerId: settings.ttsProviderId,
                    providerConfig: ttsProviderConfig,
                    voiceId: settings.ttsVoice,
                    language: languageDirective
                });
                const speechActions = (data.scene.actions || []).filter((a)=>a.type === 'speech' && a.text);
                let ttsFailCount = 0;
                for (const action of speechActions){
                    const audioId = `tts_${action.id}`;
                    action.audioId = audioId;
                    try {
                        const resp = await fetch('/api/generate/tts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                text: action.text,
                                audioId,
                                ttsProviderId: settings.ttsProviderId,
                                ttsModelId: ttsProviderConfig?.modelId,
                                ttsVoice: settings.ttsVoice,
                                ttsSpeed: settings.ttsSpeed,
                                ttsApiKey: ttsProviderConfig?.apiKey || undefined,
                                // Managed providers resolve their base URL server-side; only
                                // send the client's own base URL (custom providers).
                                ttsBaseUrl: ttsProviderConfig?.baseUrl || ttsProviderConfig?.customDefaultBaseUrl || undefined,
                                ttsProviderOptions: providerOptions
                            }),
                            signal
                        });
                        if (!resp.ok) {
                            ttsFailCount++;
                            continue;
                        }
                        const ttsData = await resp.json();
                        if (!ttsData.success) {
                            ttsFailCount++;
                            continue;
                        }
                        const binary = atob(ttsData.base64);
                        const bytes = new Uint8Array(binary.length);
                        for(let i = 0; i < binary.length; i++)bytes[i] = binary.charCodeAt(i);
                        const blob = new Blob([
                            bytes
                        ], {
                            type: `audio/${ttsData.format}`
                        });
                        await _lib_utils_database__WEBPACK_IMPORTED_MODULE_17__.db.audioFiles.put({
                            id: audioId,
                            blob,
                            format: ttsData.format,
                            createdAt: Date.now()
                        });
                    } catch (err) {
                        log.warn(`[TTS] Failed for ${audioId}:`, err);
                        ttsFailCount++;
                    }
                }
                if (ttsFailCount > 0 && speechActions.length > 0) {
                    throw new Error(t('generation.speechFailed'));
                }
            }
            // Add scene to store and navigate
            store.addScene(data.scene);
            store.setCurrentSceneId(data.scene.id);
            // Set remaining outlines as skeleton placeholders
            const remaining = outlines.filter((o)=>o.order !== data.scene.order);
            store.setGeneratingOutlines(remaining);
            // Store generation params for classroom to continue generation
            sessionStorage.setItem('generationParams', JSON.stringify({
                pdfImages: currentSession.pdfImages,
                agents,
                userProfile,
                languageDirective
            }));
            sessionStorage.removeItem('generationSession');
            await store.saveToStorage();
            router.push(`/classroom/${stage.id}`);
        } catch (err) {
            setIsOutlineStreaming(false);
            // AbortError is expected when navigating away — don't show as error
            if (err instanceof DOMException && err.name === 'AbortError') {
                log.info('[GenerationPreview] Generation aborted');
                return;
            }
            sessionStorage.removeItem('generationSession');
            setError(err instanceof Error ? err.message : String(err));
        }
    };
    const extractTopicFromRequirement = (requirement)=>{
        const trimmed = requirement.trim();
        if (trimmed.length <= 500) {
            return trimmed;
        }
        return trimmed.substring(0, 500).trim() + '...';
    };
    const goBackToHome = ()=>{
        abortControllerRef.current?.abort();
        clearOutlineReviewTimer();
        outlineReviewIntentRef.current = false;
        sessionStorage.removeItem('generationSession');
        router.push('/');
    };
    // Triggered when the user clicks the streaming outline card mid-stream.
    // SSE keeps running; only the surface morph + intent flag change.
    const handleExpandStreamingOutline = ()=>{
        if (!session) return;
        clearOutlineReviewTimer();
        setStatusMessage('');
        outlineReviewIntentRef.current = true;
        persistSession({
            ...session,
            previewPhase: 'review'
        });
    };
    // Inverse of expand. Mid-stream: shrink back to the streaming preview card so
    // the user can keep watching while SSE fills in the rest. Post-stream: shrink
    // back to the small card too, then re-arm the 2.5s auto-continue timer — same
    // pacing as the no-review path so the user has a beat to see the card before
    // the page advances. Jumping straight to content gen feels too abrupt.
    const handleCollapseEditor = ()=>{
        if (!session) return;
        if (isOutlineStreaming) {
            // Intentionally drop the review-intent flag: collapsing mid-stream is the
            // user saying "actually, never mind". When SSE finishes, the no-early-open
            // path runs and the standard `reviewOutlineEnabled` / auto-continue rules
            // decide what happens next. There is no parked promise to settle yet —
            // the promise is created only after SSE completes (see line 583).
            outlineReviewIntentRef.current = false;
            persistSession({
                ...session,
                previewPhase: 'preparing'
            });
            setStatusMessage('');
            return;
        }
        const collapsedOutlines = session.sceneOutlines ?? streamingOutlines;
        if (!collapsedOutlines || collapsedOutlines.length === 0) return;
        outlineReviewIntentRef.current = false;
        persistSession({
            ...session,
            sceneOutlines: collapsedOutlines,
            previewPhase: 'outline-ready'
        });
        setStatusMessage(t('generation.reviewOutlineAutoContinue'));
        // Re-arm the auto-continue timer. The SSE-completion flow is parked inside
        // `waitForOutlineReviewChoice` (because `shouldReview` was true when the
        // user opened the editor) — fire its resolve via a fresh timeout to match
        // the no-review path's pacing.
        clearOutlineReviewTimer();
        outlineReviewTimerRef.current = setTimeout(()=>{
            outlineReviewTimerRef.current = null;
            const resolve = outlineReviewResolveRef.current;
            outlineReviewResolveRef.current = null;
            if (resolve) {
                resolve(collapsedOutlines);
                return;
            }
            // No parked promise (e.g. session was restored from a refresh into
            // 'review' state). Drive the transition ourselves.
            const confirmedSession = {
                ...session,
                sceneOutlines: collapsedOutlines,
                previewPhase: 'generating-content'
            };
            persistSession(confirmedSession);
            hasStartedRef.current = true;
            void startGeneration(confirmedSession);
        }, OUTLINE_REVIEW_AUTO_CONTINUE_MS);
    };
    const handleOutlinesChange = (outlines)=>{
        if (!session) return;
        // Streaming SSE owns `streamingOutlines` while it's running; ignore editor
        // changes until the stream completes (the editor is read-only in that state
        // anyway, but guard defensively against any racy event).
        if (isOutlineStreaming) return;
        persistSession({
            ...session,
            sceneOutlines: outlines,
            previewPhase: 'review'
        });
    };
    const handleConfirmOutlines = ()=>{
        const finalOutlines = session?.sceneOutlines ?? streamingOutlines;
        if (!finalOutlines || finalOutlines.length === 0) return;
        setIsConfirmingOutlines(true);
        clearOutlineReviewTimer();
        outlineReviewIntentRef.current = false;
        if (outlineReviewResolveRef.current) {
            const resolve = outlineReviewResolveRef.current;
            outlineReviewResolveRef.current = null;
            resolve(finalOutlines);
            return;
        }
        // Fallback: no parked promise (session restored mid-review). The button's
        // loading state was set above to give the click immediate feedback, but the
        // editor is about to unmount anyway as we drive the next phase ourselves.
        // Reset the flag so the state doesn't linger if `startGeneration` later
        // re-renders the editor for any reason.
        setIsConfirmingOutlines(false);
        const confirmedSession = {
            ...session,
            sceneOutlines: finalOutlines,
            previewPhase: 'generating-content'
        };
        persistSession(confirmedSession);
        hasStartedRef.current = true;
        void startGeneration(confirmedSession);
    };
    // Still loading session from sessionStorage
    if (!sessionLoaded) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-center text-muted-foreground",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "size-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto"
                })
            })
        });
    }
    // No session found
    if (!session) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                className: "p-8 max-w-md w-full",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                            className: "size-12 text-muted-foreground mx-auto"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "text-xl font-semibold",
                            children: t('generation.sessionNotFound')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children: t('generation.sessionNotFoundDesc')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                            onClick: ()=>router.push('/'),
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                    className: "size-4 mr-2"
                                }),
                                t('generation.backToHome')
                            ]
                        })
                    ]
                })
            })
        });
    }
    const activeStep = activeSteps.length > 0 ? activeSteps[Math.min(currentStepIndex, activeSteps.length - 1)] : _types__WEBPACK_IMPORTED_MODULE_20__/* .ALL_STEPS */ .u[0];
    if (isReviewingOutlines) {
        const outlineStepIndex = Math.max(0, activeSteps.findIndex((step)=>step.id === 'outline'));
        // Editor source-of-truth: prefer the persisted final list; fall back to the
        // live streaming buffer so the editor can render mid-stream after expansion.
        const editorOutlines = session.sceneOutlines ?? streamingOutlines ?? [];
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center p-4 relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "absolute top-4 left-4 z-20",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        variant: "ghost",
                        size: "sm",
                        onClick: goBackToHome,
                        disabled: isConfirmingOutlines,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "size-4 mr-2"
                            }),
                            t('generation.backToHome')
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "z-10 w-full max-w-3xl pt-16 pb-8",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex justify-center gap-2",
                                children: activeSteps.map((step, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_29__.cn)('h-1.5 rounded-full transition-all duration-500', idx < outlineStepIndex ? 'w-1.5 bg-blue-500/30' : idx === outlineStepIndex ? 'w-8 bg-blue-500' : 'w-1.5 bg-muted/50')
                                    }, step.id))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "max-w-2xl space-y-2 text-center mx-auto",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-2xl font-bold tracking-tight",
                                        children: t('generation.reviewOutlineTitle')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-muted-foreground text-sm md:text-base",
                                        children: isOutlineStreaming ? t('generation.reviewOutlineStreamingDesc') : t('generation.reviewOutlineDesc')
                                    })
                                ]
                            }),
                            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mx-auto max-w-2xl rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300",
                                children: error
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_generation_outlines_editor__WEBPACK_IMPORTED_MODULE_6__/* .OutlinesEditor */ .Z, {
                                outlines: editorOutlines,
                                onChange: handleOutlinesChange,
                                onConfirm: handleConfirmOutlines,
                                onBack: goBackToHome,
                                alwaysReview: reviewOutlineEnabled,
                                onAlwaysReviewChange: setReviewOutlineEnabled,
                                isLoading: isConfirmingOutlines,
                                isStreaming: isOutlineStreaming,
                                onCollapse: handleCollapseEditor
                            })
                        ]
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden text-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "fixed inset-0 overflow-hidden pointer-events-none z-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDuration: '4s'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDuration: '6s'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "absolute top-4 left-4 z-20",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                    variant: "ghost",
                    size: "sm",
                    onClick: goBackToHome,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                            className: "size-4 mr-2"
                        }),
                        t('generation.backToHome')
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "z-10 w-full max-w-lg space-y-8 flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        className: "w-full",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                            className: "relative overflow-hidden border-muted/40 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl min-h-[400px] flex flex-col items-center justify-center p-8 md:p-12",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "absolute top-6 left-0 right-0 flex justify-center gap-2",
                                    children: activeSteps.map((step, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_29__.cn)('h-1.5 rounded-full transition-all duration-500', idx < currentStepIndex ? 'w-1.5 bg-blue-500/30' : idx === currentStepIndex ? 'w-8 bg-blue-500' : 'w-1.5 bg-muted/50')
                                        }, step.id))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 flex flex-col items-center justify-center w-full space-y-8 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "relative size-48 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_30__/* .AnimatePresence */ .N, {
                                                mode: "popLayout",
                                                children: error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                                    initial: {
                                                        scale: 0.5,
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        scale: 1,
                                                        opacity: 1
                                                    },
                                                    className: "size-32 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500/20",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                        className: "size-16 text-red-500"
                                                    })
                                                }, "error") : isComplete ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                                    initial: {
                                                        scale: 0.5,
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        scale: 1,
                                                        opacity: 1
                                                    },
                                                    className: "size-32 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                        className: "size-16 text-green-500"
                                                    })
                                                }, "complete") : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                                    initial: {
                                                        scale: 0.8,
                                                        opacity: 0,
                                                        filter: 'blur(10px)'
                                                    },
                                                    animate: {
                                                        scale: 1,
                                                        opacity: 1,
                                                        filter: 'blur(0px)'
                                                    },
                                                    exit: {
                                                        scale: 1.2,
                                                        opacity: 0,
                                                        filter: 'blur(10px)'
                                                    },
                                                    transition: {
                                                        duration: 0.4
                                                    },
                                                    className: "absolute inset-0 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_visualizers__WEBPACK_IMPORTED_MODULE_21__/* .StepVisualizer */ .f, {
                                                        stepId: activeStep.id,
                                                        outlines: session.sceneOutlines ?? streamingOutlines,
                                                        webSearchSources: webSearchSources,
                                                        onExpandOutline: activeStep.id === 'outline' ? handleExpandStreamingOutline : undefined
                                                    })
                                                }, activeStep.id)
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-3 max-w-sm mx-auto",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_30__/* .AnimatePresence */ .N, {
                                                    mode: "wait",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                                        initial: {
                                                            opacity: 0,
                                                            y: 10
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            y: 0
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            y: -10
                                                        },
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                                                className: "text-2xl font-bold tracking-tight",
                                                                children: error ? t('generation.generationFailed') : isComplete ? t('generation.generationComplete') : t(activeStep.title)
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-muted-foreground text-base",
                                                                children: error ? error : isComplete ? t('generation.classroomReady') : statusMessage || t(activeStep.description)
                                                            })
                                                        ]
                                                    }, error ? 'error' : isComplete ? 'done' : activeStep.id)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_30__/* .AnimatePresence */ .N, {
                                                    children: truncationWarnings.length > 0 && !error && !isComplete && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            scale: 0
                                                        },
                                                        transition: {
                                                            type: 'spring',
                                                            stiffness: 500,
                                                            damping: 30
                                                        },
                                                        className: "flex justify-center",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .Tooltip */ .m_, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipTrigger */ .k$, {
                                                                    asChild: true,
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.button, {
                                                                        type: "button",
                                                                        animate: {
                                                                            boxShadow: [
                                                                                '0 0 0 0 rgba(251, 191, 36, 0), 0 0 0 0 rgba(251, 191, 36, 0)',
                                                                                '0 0 16px 4px rgba(251, 191, 36, 0.12), 0 0 4px 1px rgba(251, 191, 36, 0.08)',
                                                                                '0 0 0 0 rgba(251, 191, 36, 0), 0 0 0 0 rgba(251, 191, 36, 0)'
                                                                            ]
                                                                        },
                                                                        transition: {
                                                                            duration: 3,
                                                                            repeat: Infinity,
                                                                            ease: 'easeInOut'
                                                                        },
                                                                        className: "relative size-7 rounded-full flex items-center justify-center cursor-default\n                                       bg-gradient-to-br from-amber-400/15 to-orange-400/10\n                                       border border-amber-400/25 hover:border-amber-400/40\n                                       hover:from-amber-400/20 hover:to-orange-400/15\n                                       transition-colors duration-300\n                                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30",
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                                            className: "size-3.5 text-amber-500 dark:text-amber-400",
                                                                            strokeWidth: 2.5
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipContent */ .ZI, {
                                                                    side: "bottom",
                                                                    sideOffset: 6,
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                        className: "space-y-1 py-0.5",
                                                                        children: truncationWarnings.map((w, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                                className: "text-xs leading-relaxed",
                                                                                children: w
                                                                            }, i))
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-16 flex items-center justify-center w-full",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_30__/* .AnimatePresence */ .N, {
                            children: error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "w-full max-w-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    size: "lg",
                                    variant: "outline",
                                    className: "w-full h-12",
                                    onClick: goBackToHome,
                                    children: t('generation.goBackAndRetry')
                                })
                            }) : isOutlineReady ? null : !isComplete ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_28__/* .motion */ .PY1.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                className: "flex items-center gap-3 text-sm text-muted-foreground/50 font-medium uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "size-3 animate-pulse"
                                    }),
                                    t('generation.aiWorking'),
                                    generatedAgents.length > 0 && !showAgentReveal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setShowAgentReveal(true),
                                        className: "ml-2 flex items-center gap-1.5 rounded-full border border-purple-300/30 bg-purple-500/10 px-3 py-1 text-xs font-medium normal-case tracking-normal text-purple-400 transition-colors hover:bg-purple-500/20 hover:text-purple-300",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_AlertTriangle_ArrowLeft_Bot_CheckCircle2_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                className: "size-3"
                                            }),
                                            t('generation.viewAgents')
                                        ]
                                    })
                                ]
                            }) : null
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_agent_agent_reveal_modal__WEBPACK_IMPORTED_MODULE_18__/* .AgentRevealModal */ .u, {
                agents: generatedAgents,
                open: showAgentReveal,
                onClose: ()=>setShowAgentReveal(false),
                onAllRevealed: ()=>{
                    agentRevealResolveRef.current?.();
                    agentRevealResolveRef.current = null;
                }
            })
        ]
    });
}
function GenerationPreviewPage() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
        fallback: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "animate-pulse space-y-4 text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-8 w-48 bg-muted rounded mx-auto"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-4 w-64 bg-muted rounded mx-auto"
                    })
                ]
            })
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GenerationPreviewContent, {})
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [37190,18409,68298,27173,31573,53686,57932,52968,99519,77492,11199,4075,96702,38499,28441,93794,77358], () => (__webpack_exec__(28136)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);