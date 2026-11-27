/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/slide-defaults.ts
 *
 * Verbatim port — `@openmaic/dsl` → `@/lib/dsl`, `@/lib/utils/element` is the
 * real port.
 */

import { nanoid } from 'nanoid';
import type { Slide, SlideTheme, PPTElement } from '@/lib/dsl';
import type { Scene, SlideContent } from '@/lib/types/stage';
import type { Action } from '@/lib/types/action';
import { createElementIdMap } from '@/lib/utils/element';
import { CURRENT_SLIDE_CONTENT_SCHEMA_VERSION } from '@/lib/edit/slide-schema';

const DEFAULT_THEME: SlideTheme = {
  backgroundColor: '#ffffff',
  themeColors: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#4472c4'],
  fontColor: '#333333',
  fontName: 'Microsoft YaHei',
  outline: { color: '#d14424', width: 2, style: 'solid' },
  shadow: { h: 0, v: 0, blur: 10, color: '#000000' },
};

/**
 * Build a fresh blank slide scene for `+ Add slide` in the Pro mode rail.
 * Matches the SceneBuilder default theme so user-added slides look the
 * same as AI-generated ones until customized.
 *
 * Seeded with a single empty speech action so the slide is playable from the
 * moment it's inserted.
 */
export function createBlankSlideScene(stageId: string, title: string, order: number): Scene {
  const slide: Slide = {
    id: nanoid(),
    viewportSize: 1000,
    viewportRatio: 0.5625,
    theme: DEFAULT_THEME,
    elements: [],
    background: { type: 'solid', color: '#ffffff' },
  };

  const content: SlideContent = {
    type: 'slide',
    schemaVersion: CURRENT_SLIDE_CONTENT_SCHEMA_VERSION,
    canvas: slide,
  };

  const actions: Action[] = [{ id: nanoid(), type: 'speech', text: '' }];

  return {
    id: nanoid(),
    stageId,
    type: 'slide',
    title,
    order,
    content,
    actions,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * Build a duplicate of an existing slide scene. Deep-clones the slide
 * payload and reassigns every element id (and group id).
 */
export function duplicateSlideScene(source: Scene, copySuffix: string, order: number): Scene {
  if (source.type !== 'slide') {
    throw new Error('duplicateSlideScene: source scene is not a slide');
  }
  const sourceContent = source.content as SlideContent;
  const { elIdMap, groupIdMap } = createElementIdMap(sourceContent.canvas.elements);
  const clonedElements: PPTElement[] = sourceContent.canvas.elements.map((element) => ({
    ...element,
    id: elIdMap[element.id],
    ...(element.groupId ? { groupId: groupIdMap[element.groupId] } : {}),
  }));

  const clonedSlide: Slide = {
    ...sourceContent.canvas,
    id: nanoid(),
    elements: clonedElements,
  };

  const content: SlideContent = {
    ...sourceContent,
    schemaVersion: CURRENT_SLIDE_CONTENT_SCHEMA_VERSION,
    canvas: clonedSlide,
  };

  const title = copySuffix ? `${source.title} ${copySuffix}` : source.title;

  // Clone the playback actions too: reseed each action id, remap element-bound
  // cues onto the cloned element ids, and drop the stale audioId.
  const clonedActions = source.actions?.map((action) => {
    const next: Record<string, unknown> = { ...structuredClone(action), id: nanoid() };
    const elId = next.elementId;
    if (typeof elId === 'string' && elIdMap[elId]) next.elementId = elIdMap[elId];
    delete next.audioId;
    delete next.audioUrl;
    return next as unknown as Action;
  });

  return {
    ...source,
    id: nanoid(),
    title,
    order,
    content,
    actions: clonedActions,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
