"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[33918],{

/***/ 33918:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — 4 tabs in the 'community' group.
// Covers chat, friends, groups, and live meeting — the social/messaging surface.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        case 'advanced-chat':
            mod = await Promise.all(/* import() */[__webpack_require__.e(52524), __webpack_require__.e(21568), __webpack_require__.e(76277), __webpack_require__.e(35000)]).then(__webpack_require__.bind(__webpack_require__, 35000));
            break;
        // case 'friends': mod = await import('@/components/medq/FriendsTab'); break;
        // case 'groups': mod = await import('@/components/medq/GroupsTab'); break;
        // case 'meeting': mod = await import('@/components/medq/MeetingTab'); break;
        default:
            throw new Error(`Unknown tab in group community: ${tabId}`);
    }
    return mod;
}


/***/ })

}]);