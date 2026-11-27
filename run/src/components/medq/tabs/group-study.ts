// Tab group loader — tabs in the 'study' group.
// Core study/home/compete/streak/achievement tabs.
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    case 'dashboard': mod = await import('@/components/medq/DashboardTab'); break;
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
    case 'achievements': mod = await import('@/components/medq/AchievementsTab'); break;
    case 'arena': mod = await import('@/components/medq/ChallengeArenaTab'); break;
    // case 'erc': mod = await import('@/components/medq/ERCTab'); break;
    default: throw new Error(`Unknown tab in group study: ${tabId}`);
  }
  return mod;
}
