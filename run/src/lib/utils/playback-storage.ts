/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/playback-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so playback-state persistence is fully functional.
 */

import { db, type PlaybackStateRecord } from './database';

export interface PlaybackSnapshot {
  sceneIndex: number;
  actionIndex: number;
  consumedDiscussions: string[];
  sceneId?: string; // Scene this snapshot belongs to; discard on mismatch
}

/**
 * Save playback state for a stage.
 */
export async function savePlaybackState(
  stageId: string,
  snapshot: PlaybackSnapshot,
): Promise<void> {
  const record: PlaybackStateRecord = {
    stageId,
    sceneIndex: snapshot.sceneIndex,
    actionIndex: snapshot.actionIndex,
    consumedDiscussions: snapshot.consumedDiscussions,
    updatedAt: Date.now(),
  };
  await db.playbackState.put(record);
}

/**
 * Load playback state for a stage.
 */
export async function loadPlaybackState(stageId: string): Promise<PlaybackSnapshot | null> {
  const record = await db.playbackState.get(stageId);
  if (!record) return null;
  return {
    sceneIndex: record.sceneIndex,
    actionIndex: record.actionIndex,
    consumedDiscussions: record.consumedDiscussions ?? [],
  };
}

/**
 * Clear playback state for a stage.
 */
export async function clearPlaybackState(stageId: string): Promise<void> {
  await db.playbackState.delete(stageId);
}
