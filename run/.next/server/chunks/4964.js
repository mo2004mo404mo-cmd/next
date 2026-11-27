"use strict";
exports.id = 4964;
exports.ids = [4964];
exports.modules = {

/***/ 114964:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'admin' group.
// Admin, pricing, revenue, feed, study-stats, plus bank/planner/video.
//
// ROUTE-BACKED TABS STAY COMMENTED ON PURPOSE:
// 'bank' renders as a real App-Router page (src/app/bank/page.tsx) and
// 'admin' as a role-guarded server page (src/app/admin/page.tsx → AdminTab).
// MedQAppShell router.pushes to both and — since 2026-11-04 — never adds them
// to visitedTabs, so PersistentTab never mounts for them; loadTab('bank') /
// loadTab('admin') are never called. Importing their page/component subtrees
// here would just bloat the / route graph (see .zscripts/dev.sh and
// group-ai.ts). The 'bank' case below remains as the original placeholder
// for any code path that still calls loadTab('bank') directly: DashboardTab
// is already in the / graph (case 'dashboard' in group-study.ts), so this
// adds zero new modules.
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // Placeholder — the real bank UI lives at /bank (src/app/bank/page.tsx).
        case 'bank':
            mod = await Promise.all(/* import() */[__webpack_require__.e(8835), __webpack_require__.e(3832), __webpack_require__.e(3171)]).then(__webpack_require__.bind(__webpack_require__, 583171));
            break;
        // case 'planner': mod = await import('@/components/medq/StudyPlannerTab'); break;
        // case 'video': mod = await import('@/components/medq/VideoTab'); break;
        // case 'admin': mod = await import('@/components/medq/AdminTab'); break; // → standalone /admin page (AdminTab)
        // case 'pricing': mod = await import('@/components/medq/ERCTab'); break;
        // case 'revenue': mod = await import('@/components/medq/ERCTab'); break;
        // case 'feed': mod = await import('@/components/medq/FeedTab'); break;
        // case 'study-stats': mod = await import('@/components/medq/StudyStatsTab'); break;
        default:
            throw new Error(`Unknown tab in group admin: ${tabId}`);
    }
    return mod;
}


/***/ })

};
;