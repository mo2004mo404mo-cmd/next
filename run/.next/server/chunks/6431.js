"use strict";
exports.id = 6431;
exports.ids = [6431];
exports.modules = {

/***/ 38444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m6: () => (/* binding */ clearPlaybackState)
/* harmony export */ });
/* unused harmony exports savePlaybackState, loadPlaybackState */
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167324);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/playback-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so playback-state persistence is fully functional.
 */ 
/**
 * Save playback state for a stage.
 */ async function savePlaybackState(stageId, snapshot) {
    const record = {
        stageId,
        sceneIndex: snapshot.sceneIndex,
        actionIndex: snapshot.actionIndex,
        consumedDiscussions: snapshot.consumedDiscussions,
        updatedAt: Date.now()
    };
    await db.playbackState.put(record);
}
/**
 * Load playback state for a stage.
 */ async function loadPlaybackState(stageId) {
    const record = await db.playbackState.get(stageId);
    if (!record) return null;
    return {
        sceneIndex: record.sceneIndex,
        actionIndex: record.actionIndex,
        consumedDiscussions: record.consumedDiscussions ?? []
    };
}
/**
 * Clear playback state for a stage.
 */ async function clearPlaybackState(stageId) {
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.playbackState.delete(stageId);
}


/***/ }),

/***/ 389783:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CX: () => (/* binding */ loadChatSessions),
/* harmony export */   Fs: () => (/* binding */ deleteChatSessions),
/* harmony export */   bm: () => (/* binding */ saveChatSessions)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167324);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/chat-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so chat session persistence is fully functional.
 */ 
/** Maximum messages per session to avoid IndexedDB bloat */ const MAX_MESSAGES_PER_SESSION = 200;
/**
 * Save chat sessions for a stage to IndexedDB.
 * - Active sessions are saved as 'interrupted' (streaming context lost on refresh)
 * - pendingToolCalls are cleared (runtime-only state)
 * - Messages are truncated to MAX_MESSAGES_PER_SESSION
 */ async function saveChatSessions(stageId, sessions) {
    if (!sessions || sessions.length === 0) {
        // Delete all sessions for this stage if empty
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
        return;
    }
    const records = sessions.map((session)=>({
            id: session.id,
            stageId,
            type: session.type,
            title: session.title,
            // Mark active sessions as interrupted (streaming context lost on refresh)
            status: session.status === 'active' ? 'interrupted' : session.status,
            // Truncate messages and strip non-serializable data
            messages: session.messages.slice(-MAX_MESSAGES_PER_SESSION) ?? [],
            config: session.config,
            toolCalls: session.toolCalls ?? [],
            pendingToolCalls: [],
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            sceneId: session.sceneId,
            lastActionIndex: session.lastActionIndex
        }));
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.transaction('rw', _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions, async ()=>{
        // Delete old sessions for this stage, then bulk insert new ones
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.bulkPut(records);
    });
}
/**
 * Load chat sessions for a stage from IndexedDB.
 * Returns sessions sorted by createdAt.
 */ async function loadChatSessions(stageId) {
    const records = await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).sortBy('createdAt');
    return records.map((record)=>({
            id: record.id,
            type: record.type,
            title: record.title,
            status: record.status,
            messages: record.messages,
            config: record.config,
            toolCalls: record.toolCalls,
            pendingToolCalls: record.pendingToolCalls,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            sceneId: record.sceneId,
            lastActionIndex: record.lastActionIndex
        }));
}
/**
 * Delete all chat sessions for a stage.
 */ async function deleteChatSessions(stageId) {
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
}


/***/ }),

/***/ 675762:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sN: () => (/* binding */ clearAllForScene)
/* harmony export */ });
/* unused harmony exports DRAFT_KEY_PREFIX, ANSWERS_KEY_PREFIX, RESULTS_KEY_PREFIX, draftKey, readSubmittedState, readAnswersForSummary, writeSubmittedAnswers, writeSubmittedResults, clearSubmitted */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/quiz/persistence.ts
 *
 * Verbatim port — pure localStorage helpers, no external deps.
 */ const DRAFT_KEY_PREFIX = 'quizDraft:';
const ANSWERS_KEY_PREFIX = 'quizAnswers:';
const RESULTS_KEY_PREFIX = 'quizResults:';
const draftKey = (sceneId)=>DRAFT_KEY_PREFIX + sceneId;
function safeGet(key) {
    if (true) return null;
    try {
        return localStorage.getItem(key);
    } catch  {
        return null;
    }
}
function safeSet(key, value) {
    if (true) return;
    try {
        localStorage.setItem(key, value);
    } catch  {
    /* ignore */ }
}
function safeRemove(key) {
    if (true) return;
    try {
        localStorage.removeItem(key);
    } catch  {
    /* ignore */ }
}
function readSubmittedState(sceneId) {
    const rawA = safeGet(ANSWERS_KEY_PREFIX + sceneId);
    if (!rawA) return null;
    try {
        const answers = JSON.parse(rawA);
        const rawR = safeGet(RESULTS_KEY_PREFIX + sceneId);
        if (rawR) {
            const results = JSON.parse(rawR);
            if (Array.isArray(results) && results.length > 0) {
                return {
                    kind: 'reviewing',
                    answers,
                    results
                };
            }
        }
        return {
            kind: 'answering',
            answers
        };
    } catch  {
        return null;
    }
}
function readAnswersForSummary(sceneId) {
    const rawA = safeGet(ANSWERS_KEY_PREFIX + sceneId);
    if (rawA) {
        try {
            return JSON.parse(rawA);
        } catch  {
        /* fall through */ }
    }
    const rawD = safeGet(DRAFT_KEY_PREFIX + sceneId);
    if (rawD) {
        try {
            return JSON.parse(rawD);
        } catch  {
        /* fall through */ }
    }
    return {};
}
function writeSubmittedAnswers(sceneId, answers) {
    safeSet(ANSWERS_KEY_PREFIX + sceneId, JSON.stringify(answers));
}
function writeSubmittedResults(sceneId, results) {
    safeSet(RESULTS_KEY_PREFIX + sceneId, JSON.stringify(results));
}
function clearSubmitted(sceneId) {
    safeRemove(ANSWERS_KEY_PREFIX + sceneId);
    safeRemove(RESULTS_KEY_PREFIX + sceneId);
}
function clearAllForScene(sceneId) {
    safeRemove(DRAFT_KEY_PREFIX + sceneId);
    safeRemove(ANSWERS_KEY_PREFIX + sceneId);
    safeRemove(RESULTS_KEY_PREFIX + sceneId);
}


/***/ }),

/***/ 686431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cv: () => (/* binding */ listStages),
/* harmony export */   UI: () => (/* binding */ getFirstSlideByStages),
/* harmony export */   cl: () => (/* binding */ deleteStageData),
/* harmony export */   kz: () => (/* binding */ revokeThumbnailSlideMediaUrls),
/* harmony export */   loadStageData: () => (/* binding */ loadStageData),
/* harmony export */   p1: () => (/* binding */ renameStage),
/* harmony export */   saveStageData: () => (/* binding */ saveStageData)
/* harmony export */ });
/* unused harmony export stageExists */
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167324);
/* harmony import */ var _chat_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(389783);
/* harmony import */ var _playback_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38444);
/* harmony import */ var _lib_quiz_persistence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(675762);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(971427);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/stage-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is the real Dexie-backed port, and
 * `@/lib/quiz/persistence` is now ported (pure localStorage). The only path
 * adapted: `@openmaic/dsl` → `@/lib/dsl`.
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('StageStorage');
/**
 * Save stage data to IndexedDB
 */ async function saveStageData(stageId, data) {
    try {
        const now = Date.now();
        // Save to stages table
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.put({
            id: stageId,
            name: data.stage.name || 'Untitled Stage',
            description: data.stage.description,
            createdAt: data.stage.createdAt || now,
            updatedAt: now,
            languageDirective: data.stage.languageDirective,
            style: data.stage.style,
            currentSceneId: data.currentSceneId || undefined,
            agentIds: data.stage.agentIds,
            videoManifest: data.stage.videoManifest,
            interactiveMode: data.stage.interactiveMode,
            taskEngineMode: data.stage.taskEngineMode
        });
        // Delete old scenes first to avoid orphaned data
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).delete();
        // Save new scenes
        if (data.scenes && data.scenes.length > 0) {
            await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.bulkPut(data.scenes.map((scene, index)=>({
                    ...scene,
                    stageId,
                    order: scene.order ?? index,
                    createdAt: scene.createdAt || now,
                    updatedAt: scene.updatedAt || now
                })));
        }
        // Save chat sessions to independent table
        if (data.chats) {
            await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .saveChatSessions */ .bm)(stageId, data.chats);
        }
        log.info(`Saved stage: ${stageId}`);
    } catch (error) {
        log.error('Failed to save stage:', error);
        throw error;
    }
}
/**
 * Load stage data from IndexedDB
 */ async function loadStageData(stageId) {
    try {
        // Load stage
        const stage = await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.get(stageId);
        if (!stage) {
            log.info(`Stage not found: ${stageId}`);
            return null;
        }
        // Load scenes
        const scenes = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).sortBy('order');
        // Load chat sessions from independent table
        const chats = await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .loadChatSessions */ .CX)(stageId);
        log.info(`Loaded stage: ${stageId}, scenes: ${scenes.length}, chats: ${chats.length}`);
        return {
            stage,
            scenes,
            currentSceneId: stage.currentSceneId || scenes[0]?.id || null,
            chats
        };
    } catch (error) {
        log.error('Failed to load stage:', error);
        return null;
    }
}
/**
 * Delete stage and all related data
 */ async function deleteStageData(stageId) {
    try {
        // Collect scene ids before deletion so we can sweep per-scene localStorage
        // keys (quiz draft / submitted answers / graded results).
        const sceneIds = (await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).toArray()).map((s)=>s.id);
        // Delete stage
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.delete(stageId);
        // Delete scenes
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).delete();
        // Delete chat sessions and playback state
        await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .deleteChatSessions */ .Fs)(stageId);
        await (0,_playback_storage__WEBPACK_IMPORTED_MODULE_2__/* .clearPlaybackState */ .m6)(stageId);
        // Sweep quiz persistence keys for each deleted scene.
        for (const sceneId of sceneIds){
            (0,_lib_quiz_persistence__WEBPACK_IMPORTED_MODULE_4__/* .clearAllForScene */ .sN)(sceneId);
        }
        log.info(`Deleted stage: ${stageId}`);
    } catch (error) {
        log.error('Failed to delete stage:', error);
        throw error;
    }
}
/**
 * List all stages
 */ async function listStages() {
    try {
        const stages = await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.orderBy('updatedAt').reverse().toArray();
        const stageList = await Promise.all(stages.map(async (stage)=>{
            const sceneCount = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stage.id).count();
            return {
                id: stage.id,
                name: stage.name,
                description: stage.description,
                sceneCount,
                createdAt: stage.createdAt,
                updatedAt: stage.updatedAt,
                interactiveMode: stage.interactiveMode,
                taskEngineMode: stage.taskEngineMode
            };
        }));
        return stageList;
    } catch (error) {
        log.error('Failed to list stages:', error);
        return [];
    }
}
function isGeneratedMediaRef(value) {
    return typeof value === 'string' && /^gen_(img|vid)_[\w-]+$/i.test(value);
}
function isLegacySequentialVideoRef(value) {
    return typeof value === 'string' && /^gen_vid_\d+$/i.test(value);
}
function getThumbnailMediaRef(element) {
    if (element.type === 'image' && isGeneratedMediaRef(element.src)) {
        return element.src;
    }
    if (element.type === 'video') {
        if (isGeneratedMediaRef(element.mediaRef)) return element.mediaRef;
        if (isGeneratedMediaRef(element.src)) return element.src;
    }
    return undefined;
}
function getMediaRecordElementId(recordId) {
    return recordId.includes(':') ? recordId.split(':').slice(1).join(':') : recordId;
}
function blobWithType(blob, mimeType) {
    return blob.type ? blob : new Blob([
        blob
    ], {
        type: mimeType
    });
}
function revokeObjectUrl(url) {
    if (url?.startsWith('blob:')) {
        URL.revokeObjectURL(url);
    }
}
function revokeThumbnailSlideMediaUrls(slides) {
    for (const slide of Object.values(slides)){
        for (const element of slide.elements){
            if (element.type === 'image' || element.type === 'video') {
                revokeObjectUrl(element.src);
            }
            if (element.type === 'video') {
                revokeObjectUrl(element.poster);
            }
        }
    }
}
/**
 * Get first slide scene's canvas data for each stage (for thumbnail preview).
 * Also resolves generated image/video refs from mediaFiles so thumbnails show real media.
 * Returns a map of stageId -> Slide (canvas data with resolved media)
 */ async function getFirstSlideByStages(stageIds) {
    const result = {};
    try {
        await Promise.all(stageIds.map(async (stageId)=>{
            const scenes = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).sortBy('order');
            const firstSlide = scenes.find((s)=>s.content?.type === 'slide');
            if (firstSlide && firstSlide.content.type === 'slide') {
                const slide = structuredClone(firstSlide.content.canvas);
                const mediaElements = slide.elements.filter((el)=>getThumbnailMediaRef(el));
                if (mediaElements.length > 0) {
                    const mediaRecords = await _database__WEBPACK_IMPORTED_MODULE_0__.db.mediaFiles.where('stageId').equals(stageId).toArray();
                    const videoRecords = mediaRecords.filter((record)=>!record.error && record.type === 'video');
                    const mediaMap = new Map(mediaRecords.map((record)=>[
                            getMediaRecordElementId(record.id),
                            record
                        ]));
                    for (const el of mediaElements){
                        const mediaRef = getThumbnailMediaRef(el);
                        const exactRecord = mediaRef ? mediaMap.get(mediaRef) : undefined;
                        const usableExactRecord = exactRecord && !exactRecord.error ? exactRecord : undefined;
                        const legacyRecord = !exactRecord && el.type === 'video' && isLegacySequentialVideoRef(mediaRef) && videoRecords.length === 1 ? videoRecords[0] : undefined;
                        const record = usableExactRecord ?? legacyRecord;
                        if (!mediaRef || !record) {
                            if (el.type === 'image') {
                                // Clear unresolved placeholder so BaseImageElement won't subscribe
                                // to the global media store (which may have stale data from another course)
                                el.src = '';
                            }
                            continue;
                        }
                        if (el.type === 'image' && record.type === 'image') {
                            el.src = URL.createObjectURL(blobWithType(record.blob, record.mimeType));
                        } else if (el.type === 'video' && record.type === 'video') {
                            el.src = URL.createObjectURL(blobWithType(record.blob, record.mimeType));
                            if (record.poster) {
                                el.poster = URL.createObjectURL(blobWithType(record.poster, 'image/jpeg'));
                            }
                        } else if (el.type === 'image') {
                            el.src = '';
                        }
                    }
                }
                result[stageId] = slide;
            }
        }));
    } catch (error) {
        log.error('Failed to load thumbnails:', error);
    }
    return result;
}
/**
 * Rename a stage (updates only the name field in IndexedDB)
 */ async function renameStage(stageId, newName) {
    try {
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.update(stageId, {
            name: newName,
            updatedAt: Date.now()
        });
        log.info(`Renamed stage ${stageId} to "${newName}"`);
    } catch (error) {
        log.error('Failed to rename stage:', error);
        throw error;
    }
}
/**
 * Check if stage exists
 */ async function stageExists(stageId) {
    try {
        const stage = await db.stages.get(stageId);
        return !!stage;
    } catch (error) {
        log.error('Failed to check stage existence:', error);
        return false;
    }
}


/***/ })

};
;