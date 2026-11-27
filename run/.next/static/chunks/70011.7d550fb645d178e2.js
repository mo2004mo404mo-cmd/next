"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[7634,52962,70011,89583],{

/***/ 7634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'advanced-misc' sub-group.
// Lightweight advanced tabs: collections, take-exam, news, ecg-challenge,
// medical-trivia, knowledge-gap-analyzer.
//
// This file is one of three sub-groups split out of the former 'advanced' group
// (which had 16 tabs in a single chunk and was the largest per-group bundle in
// the app). These tabs are mostly data-table / form-driven UIs that don't pull
// in heavy media deps, so they co-locate cleanly without bloating each other.
//
// Tabs in this group:
//   collections, take-exam, news, ecg-challenge, medical-trivia,
//   knowledge-gap-analyzer
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'collections': mod = await import('@/components/medq/CollectionsTab'); break;
        case 'take-exam':
            mod = await Promise.all(/* import() */[__webpack_require__.e(88408), __webpack_require__.e(28258), __webpack_require__.e(44750), __webpack_require__.e(55862)]).then(__webpack_require__.bind(__webpack_require__, 55862));
            break;
        // case 'news': mod = await import('@/components/medq/NewsTab'); break;
        // case 'ecg-challenge': mod = await import('@/components/medq/ECGChallengeTab'); break;
        // case 'medical-trivia': mod = await import('@/components/medq/MedicalTriviaTab'); break;
        // case 'knowledge-gap-analyzer': mod = await import('@/components/medq/KnowledgeGapAnalyzerTab'); break;
        default:
            throw new Error(`Unknown tab in group advanced-misc: ${tabId}`);
    }
    return mod;
}


/***/ }),

/***/ 52962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'advanced-media' sub-group.
// Media-heavy studio tabs: whiteboard-studio, video-library, procedure-player,
// image-occlusion.
//
// This file is one of three sub-groups split out of the former 'advanced' group
// (which had 16 tabs in a single chunk and was the largest per-group bundle in
// the app). The media tabs drag in large client-only dependencies:
//   - WhiteboardStudioTab pulls in the entire whiteboard-studio/ subdirectory
//     (~20 files including canvas, layers, audio recorder, video editor with
//     ffmpeg/wasm panels, webcam overlay, timeline editor, etc.).
//   - VideoLibraryTab pulls in the video-library/ subdirectory (folder sidebar,
//     storage dashboard, video detail panel, etc.).
//   - ProcedurePlayerTab pulls in the procedure step renderer with media.
//   - ImageAnalyzerTab pulls in the image analyzer with TIFF/multi-page support.
// Isolating them in their own group ensures these heavy chunks are only
// downloaded when the user actually navigates to one of these tabs, and never
// bundled with lightweight clinical reference tabs.
//
// Tabs in this group:
//   whiteboard-studio, video-library, procedure-player, image-occlusion
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'whiteboard-studio': mod = await import('@/components/medq/WhiteboardStudioTab'); break;
        // case 'video-library': mod = await import('@/components/medq/VideoLibraryTab'); break;
        // case 'procedure-player': mod = await import('@/components/medq/ProcedurePlayerTab'); break;
        // case 'image-occlusion': mod = await import('@/components/medq/ImageAnalyzerTab'); break;
        default:
            throw new Error(`Unknown tab in group advanced-media: ${tabId}`);
    }
    return mod;
}


/***/ }),

/***/ 70011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
/* harmony import */ var _group_advanced_clinical__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89583);
/* harmony import */ var _group_advanced_media__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52962);
/* harmony import */ var _group_advanced_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7634);
// Tab group loader — tabs in the 'advanced' group.
//
// DEPRECATED — this file has been split into three finer-grained sub-groups to
// reduce per-chunk bundle size:
//   - group-advanced-clinical.ts  (decision trees, guidelines, pathways, dx, CME)
//   - group-advanced-media.ts     (whiteboard-studio, video-library, procedure-player, image-occlusion)
//   - group-advanced-misc.ts      (collections, take-exam, news, ecg-challenge, medical-trivia, knowledge-gap-analyzer)
//
// MedQAppShell.tsx now routes each 'advanced-*' sub-group directly via the
// TAB_GROUP map. This file is kept only as a fallback for any tabId that still
// claims to be in the bare 'advanced' group — it delegates to the appropriate
// sub-group loader.



const MEDIA_TABS = new Set([
    'whiteboard-studio',
    'video-library',
    'procedure-player',
    'image-occlusion'
]);
const CLINICAL_TABS = new Set([
    'decision-tree',
    'decision-making-tree',
    'guideline-library',
    'clinical-pathways',
    'diff-diagnosis',
    'cme-tracker'
]);
async function loadTab(tabId) {
    if (MEDIA_TABS.has(tabId)) return (0,_group_advanced_media__WEBPACK_IMPORTED_MODULE_0__.loadTab)(tabId);
    if (CLINICAL_TABS.has(tabId)) return (0,_group_advanced_clinical__WEBPACK_IMPORTED_MODULE_1__.loadTab)(tabId);
    return (0,_group_advanced_misc__WEBPACK_IMPORTED_MODULE_2__.loadTab)(tabId);
}


/***/ }),

/***/ 89583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'advanced-clinical' sub-group.
// Clinical decision-support tools: decision trees, guidelines, pathways, dx, CME.
//
// This file is one of three sub-groups split out of the former 'advanced' group
// (which had 16 tabs in a single chunk and was the largest per-group bundle in
// the app). Splitting by domain keeps each per-group chunk small enough that
// Turbopack can compile it without exceeding memory budget, and isolates
// clinical reference tools from media-heavy studio tabs.
//
// Tabs in this group:
//   decision-tree, decision-making-tree, guideline-library,
//   clinical-pathways, diff-diagnosis, cme-tracker
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'decision-tree': mod = await import('@/components/medq/ClinicalDecisionTreeTab'); break;
        // case 'decision-making-tree': mod = await import('@/components/medq/DecisionMakingTreeTab'); break;
        // case 'guideline-library': mod = await import('@/components/medq/GuidelineLibraryTab'); break;
        // case 'clinical-pathways': mod = await import('@/components/medq/ClinicalPathwaysTab'); break;
        // case 'diff-diagnosis': mod = await import('@/components/medq/DiffDiagnosisTab'); break;
        // case 'cme-tracker': mod = await import('@/components/medq/CMETrackerTab'); break;
        default:
            throw new Error(`Unknown tab in group advanced-clinical: ${tabId}`);
    }
    return mod;
}


/***/ })

}]);