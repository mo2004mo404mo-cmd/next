"use strict";
exports.id = 2304;
exports.ids = [2304];
exports.modules = {

/***/ 382304:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'tools' group.
// Calculator, symptom, exam-countdown, dictionary, timer, notes, plus lab/exams/mnemonics.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'lab-values': mod = await import('@/components/medq/LabValuesTab'); break;
        // case 'exams': mod = await import('@/components/medq/ExamsTab'); break;
        // case 'mnemonics': mod = await import('@/components/medq/MnemonicsTab'); break;
        // case 'medical-calculator': mod = await import('@/components/medq/MedicalCalculatorTab'); break;
        // case 'symptom-checker': mod = await import('@/components/medq/SymptomCheckerTab'); break;
        case 'exam-countdown':
            mod = await __webpack_require__.e(/* import() */ 641).then(__webpack_require__.bind(__webpack_require__, 870641));
            break;
        // case 'medical-dictionary': mod = await import('@/components/medq/MedicalDictionaryTab'); break;
        // case 'study-timer': mod = await import('@/components/medq/StudyTimerTab'); break;
        // case 'quick-notes': mod = await import('@/components/medq/QuickNotesTab'); break;
        default:
            throw new Error(`Unknown tab in group tools: ${tabId}`);
    }
    return mod;
}


/***/ })

};
;