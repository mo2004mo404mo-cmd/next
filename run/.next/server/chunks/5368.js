"use strict";
exports.id = 5368;
exports.ids = [5368];
exports.modules = {

/***/ 155368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'exam' group.
// Exam prep, revision, flashcard-arena, playlist, coach, plus review/create/voice.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'review': mod = await import('@/components/medq/ReviewHubTab'); break;
        // case 'create': mod = await import('@/components/medq/CreateTab'); break;
        // case 'voice': mod = await import('@/components/medq/VoiceStudyTab'); break;
        // case 'mnemonic-maker': mod = await import('@/components/medq/MnemonicMakerTab'); break;
        // case 'revision-scheduler': mod = await import('@/components/medq/RevisionSchedulerTab'); break;
        // case 'peer-compare': mod = await import('@/components/medq/PeerCompareTab'); break;
        // case 'flashcard-arena': mod = await import('@/components/medq/FlashcardArenaTab'); break;
        // case 'study-playlist': mod = await import('@/components/medq/StudyPlaylistTab'); break;
        // case 'performance-coach': mod = await import('@/components/medq/PerformanceCoachTab'); break;
        default:
            throw new Error(`Unknown tab in group exam: ${tabId}`);
    }
    return mod;
}


/***/ })

};
;