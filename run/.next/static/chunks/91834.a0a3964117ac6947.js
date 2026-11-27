"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[91834],{

/***/ 91834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'social' group.
// Oral exam, med-memorize, med-chat, plus existing file/weak/board-prep.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'files': mod = await import('@/components/medq/FileTab'); break;
        // case 'weak-areas': mod = await import('@/components/medq/WeakAreasTab'); break;
        // case 'board-prep': mod = await import('@/components/medq/BoardPrepTab'); break;
        // case 'oral-exam': mod = await import('@/components/medq/AdvancedOralExamTab'); break;
        // case 'med-memorize': mod = await import('@/components/medq/MedMemorizeTab'); break;
        // case 'med-chat': mod = await import('@/components/medq/MedChatTab'); break;
        default:
            throw new Error(`Unknown tab in group social: ${tabId}`);
    }
    return mod;
}


/***/ })

}]);