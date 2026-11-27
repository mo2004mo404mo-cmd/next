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
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    // Placeholder — the real bank UI lives at /bank (src/app/bank/page.tsx).
    case 'bank': mod = await import('@/components/medq/DashboardTab'); break;
    // case 'planner': mod = await import('@/components/medq/StudyPlannerTab'); break;
    // case 'video': mod = await import('@/components/medq/VideoTab'); break;
    // case 'admin': mod = await import('@/components/medq/AdminTab'); break; // → standalone /admin page (AdminTab)
    // case 'pricing': mod = await import('@/components/medq/ERCTab'); break;
    // case 'revenue': mod = await import('@/components/medq/ERCTab'); break;
    // case 'feed': mod = await import('@/components/medq/FeedTab'); break;
    // case 'study-stats': mod = await import('@/components/medq/StudyStatsTab'); break;
    default: throw new Error(`Unknown tab in group admin: ${tabId}`);
  }
  return mod;
}
