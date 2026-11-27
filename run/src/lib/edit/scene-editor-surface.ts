/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/scene-editor-surface.ts
 *
 * Verbatim port — pure TypeScript + React types.
 */

/**
 * SceneEditorSurface — interface contract for scene-type editors.
 */

import type { ComponentType, ReactNode } from 'react';
import type { SceneContent, SceneType } from '@/lib/types/stage';

// ---------------------------------------------------------------------------
// Contribution primitives — shell renders these; surface only declares them.
// ---------------------------------------------------------------------------

export interface UiAffordance {
  id: string;
  label: string;
  icon?: ReactNode;
  tooltip?: string;
  disabled?: boolean;
  /** Optional grouping hint — shell may insert dividers between groups. */
  group?: string;
}

/** Items in the left "insert" strip (kept always-visible for discoverability). */
export interface InsertPaletteItem extends UiAffordance {
  onInvoke: () => void;
  popoverContent?: () => ReactNode;
  active?: boolean;
}

/** Floating contextual actions. */
export interface FloatingAction extends UiAffordance {
  onInvoke?: () => void;
  popoverContent?: () => ReactNode;
}

/** Editor commands — global actions surfaced in the top command bar. */
export interface EditorCommand extends UiAffordance {
  onInvoke: () => void;
}

/** AI inline coach hint — reserved slot. */
export interface EditorHint {
  id: string;
  severity: 'info' | 'suggestion' | 'warning';
  message: string;
  action?: { label: string; onInvoke: () => void };
}

// ---------------------------------------------------------------------------
// SurfaceState — what the surface's hook returns to the shell each render.
// ---------------------------------------------------------------------------

export interface SurfaceHistory {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

export interface SurfaceState<TContent extends SceneContent = SceneContent, TSelection = unknown> {
  content: TContent;
  selection: TSelection;
  /** True when the surface considers selection non-empty (drives floating bar). */
  hasSelection: boolean;

  /**
   * Editable surfaces expose undo/redo here. Read-only surfaces (e.g. the
   * NOOP fallback used for unregistered scene types) omit it; the shell
   * hides undo/redo controls when undefined.
   */
  history?: SurfaceHistory;

  insertItems: InsertPaletteItem[];
  floatingActions: FloatingAction[];
  commands: EditorCommand[];

  /** Reserved for AI phase. Surface returns [] in Phase 1. */
  hints?: EditorHint[];
}

// ---------------------------------------------------------------------------
// SceneEditorSurface — the contract a scene type registers.
// ---------------------------------------------------------------------------

export interface SceneEditorSurface<
  TContent extends SceneContent = SceneContent,
  TSelection = unknown,
> {
  sceneType: SceneType;

  /**
   * Center surface region — the surface fully owns rendering. Paradigm-neutral
   * by design: the slide surface mounts a canvas here, the quiz surface a
   * structured form.
   */
  SurfaceComponent: ComponentType;

  /**
   * React hook called by the shell once per render. Owns selection, history,
   * and op dispatch internally; returns the slot contributions.
   */
  useSurfaceState: () => SurfaceState<TContent, TSelection>;
}

// ---------------------------------------------------------------------------
// Registry — shell resolves a surface by SceneType.
// ---------------------------------------------------------------------------

export interface SceneEditorRegistry {
  register: <TContent extends SceneContent, TSelection>(
    surface: SceneEditorSurface<TContent, TSelection>,
  ) => void;
  /** Remove a registration. Mainly for HMR cleanup and tests. */
  unregister: (sceneType: SceneType) => void;
  resolve: (sceneType: SceneType) => SceneEditorSurface | undefined;
}
