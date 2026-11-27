/**
 * OpenMAIC Slide type — minimal subset ported from @openmaic/dsl/src/slides.ts
 * (https://github.com/THU-MAIC/OpenMAIC) · MIT-licensed.
 *
 * MedQ's AI Classroom doesn't render full PPTist-style canvases; it uses the
 * slide canvas as a structured payload (background + ordered elements) that
 * the chat UI displays as a "slide preview" card. We only need the top-level
 * Slide shape and enough element-type metadata to interpret generated scenes.
 *
 * The full ~960-line element model is intentionally not ported — it pulls in
 * chart configs, table cell shapes, latex, video, audio, code blocks, and
 * gradient/shadow/outline sub-types that MedQ has no renderer for.
 */

export enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  LINE = 'line',
  CHART = 'chart',
  TABLE = 'table',
  LATEX = 'latex',
  VIDEO = 'video',
  AUDIO = 'audio',
  CODE = 'code',
}

/** Minimal element — discriminated by `type`. Richer per-type fields are optional. */
export interface PPTElement {
  id: string;
  type: ElementTypes;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  content?: string;
  defaultColor?: string;
  defaultFontName?: string;
  [key: string]: unknown;
}

export interface PPTBackground {
  type: 'solid' | 'gradient' | 'image';
  color?: string;
  gradient?: unknown;
  image?: unknown;
}

/** Slide — a single page canvas. */
export interface Slide {
  id: string;
  type: 'slide';
  elements: PPTElement[];
  background?: PPTBackground;
  theme?: unknown;
  turningMode?: unknown;
  sectionTag?: unknown;
  /** Optional spoken-text payload used for TTS narration of this slide. */
  speakerNotes?: string;
}
