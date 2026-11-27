/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/slide-schema.ts
 *
 * SlideContent schema versioning. Slide-surface PRs will iterate the
 * on-disk shape; this module is the single chokepoint for normalizing
 * any incoming SlideContent (API response, snapshot restore, future
 * localStorage restore, PPTX reimport) to the current version.
 */

import type { Scene, SceneContent, SlideContent } from '@/lib/types/stage';

export const CURRENT_SLIDE_CONTENT_SCHEMA_VERSION = 1;

export function migrateSlideContent(content: SlideContent): SlideContent {
  // Forward-compatibility: if a future client has written content with a
  // newer schemaVersion than we know about, return it untouched rather
  // than silently downgrading.
  if (
    content.schemaVersion !== undefined &&
    content.schemaVersion >= CURRENT_SLIDE_CONTENT_SCHEMA_VERSION
  ) {
    return content;
  }
  return {
    ...content,
    schemaVersion: CURRENT_SLIDE_CONTENT_SCHEMA_VERSION,
  };
}

/**
 * Top-level scene migrator — dispatches by scene-content type.
 */
export function migrateScene(scene: Scene): Scene {
  const migratedContent = migrateSceneContent(scene.content);
  if (migratedContent === scene.content) {
    return scene;
  }
  return { ...scene, content: migratedContent };
}

function migrateSceneContent(content: SceneContent): SceneContent {
  if (content.type === 'slide') {
    return migrateSlideContent(content);
  }
  return content;
}
