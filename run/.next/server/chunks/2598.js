"use strict";
exports.id = 2598;
exports.ids = [2598];
exports.modules = {

/***/ 662598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'study' group.
// Core study/home/compete/streak/achievement tabs.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        case 'dashboard':
            mod = await Promise.all(/* import() */[__webpack_require__.e(8835), __webpack_require__.e(3832), __webpack_require__.e(3171)]).then(__webpack_require__.bind(__webpack_require__, 583171));
            break;
        // case 'challenge': mod = await import('@/components/medq/DailyChallengeTab'); break;
        // case 'tutor': mod = await import('@/components/medq/TutorTab'); break;
        // case 'arena': mod = await import('@/components/medq/ChallengeArenaTab'); break;
        // case 'live-battle': mod = await import('@/components/medq/LiveChallengeTab'); break;
        // case 'leaderboard': mod = await import('@/components/medq/LeaderboardTab'); break;
        // case 'qotd': mod = await import('@/components/medq/QOTDTab'); break;
        // case 'speed-quiz': mod = await import('@/components/medq/SpeedQuizTab'); break;
        // case 'streak-calendar': mod = await import('@/components/medq/StreakCalendarTab'); break;
        // case 'study-streaks': mod = await import('@/components/medq/StudyStreaksTab'); break;
        // Full tab UIs exist (AchievementsTab 475 lines, ChallengeArenaTab 914
        // lines) but their cases were left commented during the shell migration —
        // both are nav-reachable, so clicking them threw
        // "Unknown tab in group study" and rendered the error fallback.
        case 'achievements':
            mod = await __webpack_require__.e(/* import() */ 4685).then(__webpack_require__.bind(__webpack_require__, 674685));
            break;
        case 'arena':
            mod = await __webpack_require__.e(/* import() */ 7353).then(__webpack_require__.bind(__webpack_require__, 967353));
            break;
        // case 'erc': mod = await import('@/components/medq/ERCTab'); break;
        default:
            throw new Error(`Unknown tab in group study: ${tabId}`);
    }
    return mod;
}


/***/ })

};
;