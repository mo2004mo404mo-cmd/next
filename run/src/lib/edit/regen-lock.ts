/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/regen-lock.ts
 *
 * Verbatim port — `@/lib/types/stage` already exists.
 */

import type { StageMode } from '@/lib/types/stage';

export interface SceneEditLockState {
  readonly sceneId: string;
  readonly mode: StageMode;
  readonly currentSceneId: string | null;
}

export function isSceneEditLocked(state: SceneEditLockState): boolean {
  return state.mode === 'edit' && state.currentSceneId === state.sceneId;
}
