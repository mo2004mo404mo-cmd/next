"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[8916],{

/***/ 8916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'drugs' group.
// Drug-related tools, plus flashcards/knowledge-map/image-analyzer.
//
// ROUTE-BACKED TAB STAYS COMMENTED ON PURPOSE:
// 'flashcards' renders as a real App-Router page (src/app/flashcards/page.tsx)
// and MedQAppShell router.pushes to it (no visitedTabs entry since 2026-11-04,
// so no PersistentTab mount and loadTab('flashcards') is never called). See
// group-ai.ts for the full rationale (graph size vs. dead-code cases).
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'flashcards': mod = await import('@/components/medq/FlashcardTab'); break; // → standalone /flashcards page
        // case 'knowledge-map': mod = await import('@/components/medq/KnowledgeMapTab'); break;
        // case 'image-analyzer': mod = await import('@/components/medq/ImageAnalyzerTab'); break;
        // case 'drug-interactions': mod = await import('@/components/medq/DrugInteractionsTab'); break;
        // case 'medicine-prices': mod = await import('@/components/medq/MedicinePricesTab'); break;
        // case 'openfda-drugs': mod = await import('@/components/medq/OpenFDADrugTab'); break;
        // case 'drug-zoom': mod = await import('@/components/medq/DrugZoomTab'); break;
        // case 'drug-zoom-labs': mod = await import('@/components/medq/DrugZoomLabsTab'); break;
        // case 'medication-tables': mod = await import('@/components/medq/MedicationTablesTab'); break;
        default:
            throw new Error(`Unknown tab in group drugs: ${tabId}`);
    }
    return mod;
}


/***/ })

}]);