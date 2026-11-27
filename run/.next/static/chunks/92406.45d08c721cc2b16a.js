"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[92406],{

/***/ 92406:
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
            mod = await Promise.all(/* import() */[__webpack_require__.e(85833), __webpack_require__.e(24728), __webpack_require__.e(67984), __webpack_require__.e(63865)]).then(__webpack_require__.bind(__webpack_require__, 63865));
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
            mod = await __webpack_require__.e(/* import() */ 84213).then(__webpack_require__.bind(__webpack_require__, 84213));
            break;
        case 'arena':
            mod = await __webpack_require__.e(/* import() */ 89585).then(__webpack_require__.bind(__webpack_require__, 89585));
            break;
        // case 'erc': mod = await import('@/components/medq/ERCTab'); break;
        default:
            throw new Error(`Unknown tab in group study: ${tabId}`);
    }
    return mod;
}


/***/ })

}]);