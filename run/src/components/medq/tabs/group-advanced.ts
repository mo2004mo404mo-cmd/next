// Tab group loader — tabs in the 'advanced' group.
//
// DEPRECATED — this file has been split into three finer-grained sub-groups to
// reduce per-chunk bundle size:
//   - group-advanced-clinical.ts  (decision trees, guidelines, pathways, dx, CME)
//   - group-advanced-media.ts     (whiteboard-studio, video-library, procedure-player, image-occlusion)
//   - group-advanced-misc.ts      (collections, take-exam, news, ecg-challenge, medical-trivia, knowledge-gap-analyzer)
//
// MedQAppShell.tsx now routes each 'advanced-*' sub-group directly via the
// TAB_GROUP map. This file is kept only as a fallback for any tabId that still
// claims to be in the bare 'advanced' group — it delegates to the appropriate
// sub-group loader.
import { loadTab as loadClinical } from './group-advanced-clinical';
import { loadTab as loadMedia } from './group-advanced-media';
import { loadTab as loadMisc } from './group-advanced-misc';

const MEDIA_TABS = new Set(['whiteboard-studio', 'video-library', 'procedure-player', 'image-occlusion']);
const CLINICAL_TABS = new Set([
  'decision-tree',
  'decision-making-tree',
  'guideline-library',
  'clinical-pathways',
  'diff-diagnosis',
  'cme-tracker',
]);

export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  if (MEDIA_TABS.has(tabId)) return loadMedia(tabId);
  if (CLINICAL_TABS.has(tabId)) return loadClinical(tabId);
  return loadMisc(tabId);
}
