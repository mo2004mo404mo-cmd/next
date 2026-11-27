/**
 * App-level UI event bus.
 *
 * Decouples deeply-nested children (e.g. the OpenMAIC SettingsDialog rendered
 * inside the AI Classroom tab) from the top-level MedQ page state that owns
 * the app-wide SettingsDialog. Without this bus, a child would need to climb
 * ~6 component layers to ask the page to open Settings → BYOK.
 *
 * Use `useAppEvents()` in the top-level page to subscribe, and
 * `openAppSettings()` / `openAppByok()` from anywhere to dispatch.
 */

import { useEffect } from 'react';
import mitt, { type Emitter } from 'mitt';

export type AppSettingsSection =
  | 'ai-providers' // BYOK section (Avatar → Settings → "AI Providers (BYOK)")
  | 'account'
  | 'privacy'
  | 'general';

export interface AppEvents {
  /** Open the app-wide SettingsDialog, optionally scrolled to a section. */
  OPEN_APP_SETTINGS: { section?: AppSettingsSection } | undefined;
}

const emitter: Emitter<AppEvents> = mitt<AppEvents>();

/** Dispatch from anywhere in the app. */
export function openAppSettings(section?: AppSettingsSection): void {
  emitter.emit('OPEN_APP_SETTINGS', { section });
}

/**
 * Open the app-wide AuthModal from anywhere in the app.
 *
 * This mirrors the same window-event pattern the AI agent uses
 * (`medq-agent-open-dialog` with `dialogId: 'auth-modal'`), which is
 * handled by MedQAppShell. Use this when a child component needs to
 * prompt sign-in (e.g. BYOK settings when the user is unauthenticated)
 * without prop-drilling the setShowAuthModal setter.
 */
export function openAuthModal(tab?: 'signin' | 'signup'): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('medq-agent-open-dialog', {
      detail: { dialogId: 'auth-modal', data: { tab } },
    }),
  );
}

/** Subscribe in a top-level component (e.g. src/app/page.tsx). */
export function useAppSettingsOpener(
  onOpen: (section?: AppSettingsSection) => void,
): void {
  useEffect(() => {
    const handler = (payload: AppEvents['OPEN_APP_SETTINGS']) => {
      onOpen(payload?.section);
    };
    emitter.on('OPEN_APP_SETTINGS', handler);
    return () => {
      emitter.off('OPEN_APP_SETTINGS', handler);
    };
  }, [onOpen]);
}
