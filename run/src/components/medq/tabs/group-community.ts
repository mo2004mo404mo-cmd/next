// Tab group loader — 4 tabs in the 'community' group.
// Covers chat, friends, groups, and live meeting — the social/messaging surface.
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    case 'advanced-chat': mod = await import('@/app/(app)/messages/page'); break;
    // case 'friends': mod = await import('@/components/medq/FriendsTab'); break;
    // case 'groups': mod = await import('@/components/medq/GroupsTab'); break;
    // case 'meeting': mod = await import('@/components/medq/MeetingTab'); break;
    default: throw new Error(`Unknown tab in group community: ${tabId}`);
  }
  return mod;
}
