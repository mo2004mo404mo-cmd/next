// Tab group loader — tabs in the 'ai' group.
// AI-powered generation, simulation, and learning tools.
//
// ROUTE-BACKED TABS STAY COMMENTED ON PURPOSE:
// 'generate' and 'ai-classroom' render as real App-Router pages
// (src/app/generate/page.tsx, src/app/ai-classroom/page.tsx). MedQAppShell's
// handleTabSwitch routes them with router.push and — since 2026-11-04 — does
// NOT add them to visitedTabs, so PersistentTab never mounts for them and
// loadTab('generate') is never called. Importing the page modules here would
// needlessly pull their heavy subtrees (browser-ai/transformers, the OpenMAIC
// suite) into the / route's compiled graph — on the 4GB dev box that graph is
// what OOM-kills the compiler (see .zscripts/dev.sh). The
// "Unknown tab in group ai: generate" console error of 2026-11-04 was caused
// by the transient mount, fixed in MedQAppShell, not by a missing case.
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    // case 'generate': mod = await import('@/components/medq/GenerateTab'); break; // → standalone /generate page
    // case 'insights': mod = await import('@/components/medq/InsightsTab'); break;
    // case 'cases': mod = await import('@/components/medq/CaseSimulatorTab'); break;
    // case 'anatomy': mod = await import('@/components/medq/AnatomyTab'); break;
    // case 'clinical-vignettes': mod = await import('@/components/medq/ClinicalVignettesTab'); break;
    // case 'ai-mode': mod = await import('@/components/medq/AIModeTab'); break;
    // No standalone route for this tab — the component (MicroLessonsTab,
    // 1068 lines) is the only UI. Accepts the shell's onNavigateToTab prop
    // via MicroLessonsTabProps. Wired 2026-11-04; before that, clicking the
    // tab threw "Unknown tab in group ai: micro-lessons" and rendered the
    // error fallback.
    case 'micro-lessons': mod = await import('@/components/medq/MicroLessonsTab'); break;
    // case 'ai-classroom': mod = await import('@/components/medq/OpenMAICClassroomTab'); break; // → standalone /ai-classroom page
    case 'freellm': mod = await import('@/components/medq/FreeLLMTab'); break;
    default: throw new Error(`Unknown tab in group ai: ${tabId}`);
  }
  return mod;
}
