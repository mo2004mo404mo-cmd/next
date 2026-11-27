// Tab group loader — tabs in the 'social' group.
// Oral exam, med-memorize, med-chat, plus existing file/weak/board-prep.
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    // case 'files': mod = await import('@/components/medq/FileTab'); break;
    // case 'weak-areas': mod = await import('@/components/medq/WeakAreasTab'); break;
    // case 'board-prep': mod = await import('@/components/medq/BoardPrepTab'); break;
    // case 'oral-exam': mod = await import('@/components/medq/AdvancedOralExamTab'); break;
    // case 'med-memorize': mod = await import('@/components/medq/MedMemorizeTab'); break;
    // case 'med-chat': mod = await import('@/components/medq/MedChatTab'); break;
    default: throw new Error(`Unknown tab in group social: ${tabId}`);
  }
  return mod;
}
