"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[7634],{

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


/***/ })

}]);