"use strict";
exports.id = 615;
exports.ids = [615];
exports.modules = {

/***/ 340615:
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

};
;