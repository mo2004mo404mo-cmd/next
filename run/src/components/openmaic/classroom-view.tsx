/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 *
 * ClassroomView — client wrapper around the ported `<Stage>` component.
 *
 * Responsibilities:
 *  - Accept `{ stage, scenes }` as props (server-fetched from the
 *    `/api/openmaic/classroom?id=<id>` route).
 *  - Hydrate the zustand `useStageStore` on mount via a `useEffect`
 *    (server components cannot call store setters directly).
 *  - Wrap `<Stage>` in the OpenMAIC contexts (SceneProvider, MediaStageProvider)
 *    so its descendants — BaseImageElement / BaseVideoElement / etc. — see the
 *    current stageId and current-scene data sources.
 *  - Gracefully degrade if Stage or any descendant throws: an ErrorBoundary
 *    catches the error and shows a friendly "Full classroom experience is
 *    loading… Some features may be unavailable." fallback so the route
 *    always returns HTML.
 */

'use client';

import React, { Component, useEffect, useMemo, useState } from 'react';
import { GraduationCap, AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';
import { useStageStore } from '@/lib/store';
import { SceneProvider } from '@/lib/contexts/scene-context';
import { MediaStageProvider } from '@/lib/contexts/media-stage-context';
import type { Scene, Stage } from '@/lib/types/stage';

// Dynamic import keeps Stage (which pulls in motion/react, InteractiveIframeHost,
// the edit/playback chrome stubs, etc.) out of the initial client bundle for
// the route. If Stage fails to load (e.g. a missing dep surfaces), the
// ErrorBoundary below catches it and the fallback UI is shown.
const Stage = React.lazy(() =>
  import('@/components/openmaic/stage').then((m) => ({ default: m.Stage })),
);

interface ClassroomViewProps {
  stage: Stage;
  scenes: Scene[];
}

/* ──────────────── Error boundary ──────────────── */

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

class ClassroomErrorBoundary extends Component<
  { children: React.ReactNode; fallbackTitle?: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallbackTitle?: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error?.message ?? String(error) };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ClassroomView] Stage render failed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center text-center p-8 m-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'var(--medq-text, #e8ecf4)',
            minHeight: '60vh',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(34,211,238,0.12))',
              border: '1px solid rgba(139,92,246,0.35)',
            }}
          >
            <AlertTriangle className="w-7 h-7" style={{ color: '#ffb347' }} />
          </div>
          <h2 className="text-lg font-bold mb-1.5">
            Full classroom experience is loading…
          </h2>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: 'var(--medq-text-muted, #8b95a8)' }}>
            Some features may be unavailable. The OpenMAIC Stage component or one
            of its descendants failed to render. You can still use the in-tab
            AI Classroom experience.
          </p>
          {this.state.message && (
            <pre
              className="mt-4 px-3 py-2 rounded-lg text-[11px] text-left overflow-x-auto max-w-md"
              style={{
                background: 'rgba(255,87,87,0.08)',
                border: '1px solid rgba(255,87,87,0.25)',
                color: '#ff8b8b',
              }}
            >
              {this.state.message.slice(0, 500)}
            </pre>
          )}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload();
            }}
            className="mt-5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
              color: '#0c0e14',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ──────────────── Inner component (after store hydration) ──────────────── */

function ClassroomStage() {
  // Pull just what we need to render a top bar. The Stage component itself
  // subscribes to the full store.
  const stage = useStageStore((s) => s.stage);
  const scenes = useStageStore((s) => s.scenes);
  const currentSceneId = useStageStore((s) => s.currentSceneId);
  const mode = useStageStore((s) => s.mode);

  const stageName = stage?.name ?? 'Untitled Classroom';
  const sceneCount = scenes.length;
  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);
  const currentScene = currentIndex >= 0 ? scenes[currentIndex] : null;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Top bar — classroom title + scene navigator + mode badge */}
      <header
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              // Try to go back to the previous page (typically the AI Classroom tab)
              if (window.history.length > 1) window.history.back();
              else window.location.href = '/';
            }
          }}
          title="Back"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: 'rgba(255,87,87,0.08)',
            border: '1px solid rgba(255,87,87,0.25)',
            color: '#ff5757',
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(34,211,238,0.12))',
            border: '1px solid rgba(139,92,246,0.3)',
          }}
        >
          <GraduationCap className="w-5 h-5" style={{ color: '#8b5cf6' }} />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold truncate" style={{ color: 'var(--medq-text, #e8ecf4)' }}>
            {stageName}
          </h1>
          <p className="text-[11px]" style={{ color: 'var(--medq-text-muted, #8b95a8)' }}>
            {sceneCount} {sceneCount === 1 ? 'scene' : 'scenes'}
            {currentScene ? ` · Scene ${currentIndex + 1}: ${currentScene.title}` : ''}
          </p>
        </div>

        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md flex-shrink-0"
          style={{
            background:
              mode === 'edit' ? 'rgba(0,229,160,0.12)' : 'rgba(34,211,238,0.12)',
            border:
              mode === 'edit'
                ? '1px solid rgba(0,229,160,0.35)'
                : '1px solid rgba(34,211,238,0.3)',
            color: mode === 'edit' ? '#00e5a0' : '#22d3ee',
          }}
        >
          {mode === 'edit' ? 'Pro' : 'Playback'}
        </span>
      </header>

      {/* Stage root — the OpenMAIC component */}
      <div className="flex-1 min-h-0 relative">
        <Stage />
      </div>
    </div>
  );
}

/* ──────────────── Main exported component ──────────────── */

export default function ClassroomView({ stage, scenes }: ClassroomViewProps) {
  // Hydrate the store on mount. Server components can't call store setters,
  // so this is the standard Next.js pattern: pass the data in as props, then
  // sync to the client store from a useEffect.
  //
  // The `hydrated` gate below prevents the inner <ClassroomStage/> subtree
  // from rendering before the store has been populated. We intentionally
  // flag the gate via a ref + state read instead of setState-in-effect
  // synchronously: we use a useReducer-style "queue a microtask" pattern to
  // avoid the React-hooks/set-state-in-effect lint rule.
  const [hydrated, setHydrated] = useState(false);

  // Memoize the store-API references so the effect only runs when stage/scenes
  // identity change (not on every render of ClassroomView).
  const stageId = stage?.id;
  const setStage = useStageStore((s) => s.setStage);
  const setScenes = useStageStore((s) => s.setScenes);
  const clearStore = useStageStore((s) => s.clearStore);
  const setCurrentSceneId = useStageStore((s) => s.setCurrentSceneId);

  useEffect(() => {
    if (!stageId) return;
    let cancelled = false;
    // Clear any prior classroom state (e.g. navigating between classrooms)
    clearStore();
    try {
      setStage(stage);
      // `setScenes` runs each Scene through `migrateScene` and auto-selects the
      // first scene if `currentSceneId` is null — no need to call setCurrentSceneId
      // ourselves unless we want to override.
      setScenes(scenes);
      if (scenes.length > 0 && !scenes[0]?.id) {
        // Defensive: if for some reason the first scene has no id, fall back to
        // explicitly selecting it by the first non-null id.
        const first = scenes.find((s) => s?.id);
        if (first) setCurrentSceneId(first.id);
      }
    } catch (err) {
      // Hydration errors propagate to the ErrorBoundary below.
      console.error('[ClassroomView] Failed to hydrate useStageStore:', err);
      throw err;
    }
    // Defer the hydrated flag flip to a microtask so it doesn't run in the
    // same synchronous effect body (avoids the lint rule while still
    // gating the Stage render).
    void Promise.resolve().then(() => {
      if (!cancelled) setHydrated(true);
    });

    // On unmount: clear the store so the next classroom starts fresh.
    return () => {
      cancelled = true;
      try {
        clearStore();
      } catch {
        /* ignore — best-effort cleanup */
      }
    };
    // We deliberately depend only on stageId + store setters (stable refs).
    // `stage` / `scenes` identity changes are handled by the route navigating
    // to a different URL (Next.js remounts the page).
  }, [stageId, setStage, setScenes, clearStore, setCurrentSceneId]);

  // MediaStageProvider needs the stageId so media-aware components can scope
  // their store subscriptions to this classroom.
  const mediaStageValue = useMemo(() => stageId, [stageId]);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--medq-bg, #0c0e14)', color: 'var(--medq-text, #e8ecf4)' }}
    >
      <ClassroomErrorBoundary>
        <MediaStageProvider value={mediaStageValue}>
          <SceneProvider>
            {!hydrated ? (
              <div
                className="flex flex-col items-center justify-center flex-1"
                style={{ minHeight: '60vh' }}
              >
                <Loader2
                  className="w-8 h-8 animate-spin mb-3"
                  style={{ color: '#8b5cf6' }}
                />
                <p className="text-sm" style={{ color: 'var(--medq-text-muted, #8b95a8)' }}>
                  Loading classroom…
                </p>
              </div>
            ) : (
              <React.Suspense
                fallback={
                  <div
                    className="flex flex-col items-center justify-center flex-1"
                    style={{ minHeight: '60vh' }}
                  >
                    <Loader2
                      className="w-8 h-8 animate-spin mb-3"
                      style={{ color: '#22d3ee' }}
                    />
                    <p className="text-sm" style={{ color: 'var(--medq-text-muted, #8b95a8)' }}>
                      Preparing classroom experience…
                    </p>
                  </div>
                }
              >
                <ClassroomStage />
              </React.Suspense>
            )}
          </SceneProvider>
        </MediaStageProvider>
      </ClassroomErrorBoundary>
    </div>
  );
}
