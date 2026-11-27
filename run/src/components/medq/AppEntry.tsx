'use client';

import React, { Component, ReactNode, Suspense } from 'react';
import { SubscriptionProvider } from '@/components/medq/SubscriptionContext';
import { SettingsProvider } from '@/components/medq/SettingsContext'
import MedQAppShell from '@/components/medq/MedQAppShell';
import { Toaster } from '@/components/ui/sonner';
import ServiceWorkerRegistrar from '@/components/medq/ServiceWorkerRegistrar';
import DeviceSessionTracker from '@/components/medq/DeviceSessionTracker';

// OFFLINE ERROR RECOVERY:
//   next/dynamic has no built-in error boundary — if a chunk fails to load
//   (e.g. the user is offline and the chunk isn't cached), the `loading`
//   fallback renders FOREVER. This was a major source of the "persistent
//   loading" bug in PWA offline mode: the user reloaded the page offline,
//   AppEntry rendered, AppEntry's dynamic() call for MedQAppShell failed,
//   and the "Loading MedQ…" spinner stayed on screen indefinitely.
//
//   Fix: we wrap each dynamic() in a small React error boundary that
//   catches chunk-load failures and shows an "Offline" fallback UI with
//   a retry button. The boundary auto-retries when the `online` event
//   fires (so the user doesn't even need to tap "Try Again" if they
//   just wait for their network to recover).

// Theme provider — toggles `.dark` class on <html> for light/dark themes.
// Loaded eagerly (small file) so the correct theme is applied before the
// main shell renders, avoiding a flash of the wrong theme.



// Silent device-fingerprint tracker — runs in the background, surfaces
// new-device / anomaly / revoked-device events via toasts. No UI of its own.
// MUST be mounted here (the REAL app entry), not in AppBootstrap.tsx
// (which is dead code — page.tsx imports AppEntry, not AppBootstrap).
// Without this mount, /api/security/verify is never called, so the
// DeviceFingerprint table stays empty and the "Active session" footer
// in UserMenu never appears.


// ─── Chunk-load error boundary ──────────────────────────────────────
// Catches errors from dynamic() chunk failures (and any other render
// errors in the tree) and shows an offline-friendly fallback. Auto-retries
// when the network comes back online.
//
// NETWORK BLIP PROTECTION (v14):
//   The previous implementation used a 500ms timeout after `online` and
//   did NOT clear it when `offline` fired. On flapping networks, this
//   caused repeated retry attempts that each failed → re-triggered the
//   boundary → added another `online` listener → reload storm.
//   The fix: wait 1.5s for the network to stabilize, cancel the pending
//   retry if `offline` fires during that window, and double-check
//   navigator.onLine right before clearing the error state.

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ChunkErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  private onlineHandler: (() => void) | null = null;
  private offlineHandler: (() => void) | null = null;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  private clearRetryTimer = () => {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  };

  private scheduleRetry = () => {
    // Cancel any previous pending retry
    this.clearRetryTimer();
    // Wait 1.5s for the network to actually be usable
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      // Double-check we're STILL online — the network may have flapped
      // back to offline during the 1.5s window
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        this.setState({ hasError: false, error: null });
      }
    }, 1500);
  };

  private cancelRetry = () => {
    // Network went back offline — cancel the pending retry
    this.clearRetryTimer();
  };

  componentDidCatch(error: Error) {
    // Only treat as chunk-load failure if it looks like one. Other errors
    // should propagate to the Next.js error page.
    const msg = (error?.message || String(error)).toLowerCase();
    const isChunkError =
      msg.includes('loading chunk') ||
      msg.includes('chunkloaderror') ||
      msg.includes('failed to fetch dynamically imported module') ||
      msg.includes('importing a module script failed') ||
      msg.includes('networkerror') ||
      (msg.includes('fetch') && (typeof navigator !== 'undefined' && !navigator.onLine));

    if (!isChunkError) {
      // Re-throw so Next.js's error boundary handles it
      throw error;
    }
    console.warn('[AppEntry] Chunk load failed (likely offline):', error.message);

    // Auto-retry when the network comes back online
    if (typeof window !== 'undefined') {
      // Clean up any previous handlers (in case componentDidCatch fires again)
      if (this.onlineHandler) {
        window.removeEventListener('online', this.onlineHandler);
        this.onlineHandler = null;
      }
      if (this.offlineHandler) {
        window.removeEventListener('offline', this.offlineHandler);
        this.offlineHandler = null;
      }

      this.onlineHandler = this.scheduleRetry;
      this.offlineHandler = this.cancelRetry;
      window.addEventListener('online', this.onlineHandler);
      window.addEventListener('offline', this.offlineHandler);
    }
  }

  componentWillUnmount() {
    this.clearRetryTimer();
    if (this.onlineHandler && typeof window !== 'undefined') {
      window.removeEventListener('online', this.onlineHandler);
      this.onlineHandler = null;
    }
    if (this.offlineHandler && typeof window !== 'undefined') {
      window.removeEventListener('offline', this.offlineHandler);
      this.offlineHandler = null;
    }
  }

  render() {
    if (this.state.hasError) {
      return <OfflineChunkFallback error={this.state.error} onRetry={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}

function OfflineChunkFallback({ error, onRetry }: { error: Error | null; onRetry: () => void }) {
  const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--medq-bg, #0a0e1a)', color: 'var(--medq-text, #e8ecf4)', fontFamily: 'system-ui',
      flexDirection: 'column', gap: 16, padding: 24,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 18,
        background: 'rgba(255, 179, 71, 0.1)',
        border: '1px solid rgba(255, 179, 71, 0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffb347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#ffb347' }}>
        {isOffline ? "You're offline" : 'Connection Lost'}
      </div>
      <div style={{ fontSize: 14, color: 'var(--medq-text-muted, #8b95a8)', textAlign: 'center', maxWidth: 340, lineHeight: 1.5 }}>
        {isOffline
          ? "MedQ can't load a required app component right now. Reconnect to the internet and tap the button below to try again."
          : 'A required app component failed to load. The server may be restarting — tap the button below to retry.'}
      </div>
      <button
        onClick={onRetry}
        style={{
          marginTop: 8, background: 'var(--medq-accent, #00e5a0)', color: 'var(--medq-bg, #0c0e14)',
          border: 'none', padding: '12px 28px', borderRadius: 12,
          fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}
      >
        Try Again
      </button>
      <div style={{ fontSize: 12, color: 'var(--medq-text-faint, #5a6478)', marginTop: 4, textAlign: 'center' }}>
        {isOffline
          ? 'Tip: open the app once while online so all components are cached for offline use.'
          : 'The page will auto-retry when the connection is restored.'}
      </div>
    </div>
  );
}

export default function AppEntry() {
  return (
    <ChunkErrorBoundary>
        <SubscriptionProvider>
          <SettingsProvider>
            {/* Suspense boundary: MedQAppShell reads useSearchParams() to
                derive the active SPA tab from the REAL /?tab=<id> URL —
                statically prerendered pages require a boundary around
                components that read search params. */}
            <Suspense fallback={<ShellBootFallback />}>
              <MedQAppShell />
            </Suspense>
            <Toaster />
            {/* Registers /sw.js (web push + system notifications) with the
                v15 version handshake. Skips itself inside iframes/preview
                hosts and honors ?nosw=1 / ?forceupdate=1 escape hatches. */}
            <ServiceWorkerRegistrar />
            <DeviceSessionTracker />
          </SettingsProvider>
        </SubscriptionProvider>
    </ChunkErrorBoundary>
  );
}

/* Minimal first-paint fallback while the Suspense boundary above resolves
   the shell's URL-derived state (search params). Matches the app theme. */
function ShellBootFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--medq-bg, #0c0e14)',
        color: 'var(--medq-accent, #00e5a0)',
        fontFamily: 'inherit',
        fontSize: 13,
      }}
      role="status"
      aria-live="polite"
    >
      Loading MedQ…
    </div>
  );
}
