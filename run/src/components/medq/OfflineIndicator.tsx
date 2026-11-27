'use client';

/**
 * OfflineIndicator — Telegram-style minimal offline UX.
 *
 * DESIGN PHILOSOPHY (v2 — "appear normal like Telegram"):
 *   The previous version showed persistent chips like "Offline · 3 queued"
 *   and "N queued · Sync" whenever the user was offline or had pending
 *   writes. Users reported this made the app feel broken when offline.
 *
 *   Telegram's approach: when you send a message offline, it silently
 *   queues it, shows a tiny clock icon on the message itself (handled
 *   by the chat UI, not this component), and only briefly shows a
 *   "Connecting..." status when the connection drops. Once reconnect
 *   succeeds, a subtle "Back online" confirmation appears for ~2s.
 *
 *   This component now ONLY shows:
 *     1. A brief green "Back online" chip for 2.5s after reconnecting
 *        (so the user knows queued writes were flushed)
 *     2. NOTHING while offline — the app should look completely normal
 *     3. NOTHING when there are pending queued writes — they'll auto-sync
 *        when connectivity returns, no need to bother the user
 *
 *   The queue infrastructure (broadcastQueueStatus, triggerReplay, etc.)
 *   is still used internally to know when sync completes — we just don't
 *   surface that as visible UI anymore.
 *
 * WHY KEEP THE COMPONENT AT ALL:
 *   - The "Back online" green chip is genuinely useful feedback (the user
 *     knows their queued actions were delivered).
 *   - The internal logic (subscribing to queue status, posting
 *     medq:client-online/offline to the SW) has useful side effects.
 *   - Removing the component entirely would require moving that logic
 *     elsewhere; keeping it as a "transparent" component is simpler.
 */

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { subscribeToQueueStatus } from '@/lib/offline-queue';

type IndicatorState =
  | { kind: 'hidden' }
  | { kind: 'restored' };

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof window !== 'undefined') return navigator.onLine;
    return true;
  });
  const [showRestored, setShowRestored] = useState(false);
  // Track pending count internally so we know whether the "Back online"
  // chip should appear (only show it if we actually had queued writes
  // that needed syncing — otherwise a brief network blip doesn't need
  // a "Back online" banner).
  const [hadPendingWhileOffline, setHadPendingWhileOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Only show the "Back online" chip if we actually had pending
      // writes queued while offline. If the user was just browsing
      // (no queued actions), a silent reconnect is more polished.
      if (hadPendingWhileOffline) {
        setShowRestored(true);
        window.setTimeout(() => {
          setShowRestored(false);
          setHadPendingWhileOffline(false);
        }, 2500);
      }
      // Notify the SW that we're back online so it can reset its
      // _lastFetchFailAt flag (otherwise it'll keep skipping the network
      // try for 8s after the actual reconnect).
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((reg) => {
            reg.active?.postMessage({ type: 'medq:client-online' });
          })
          .catch(() => {});
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
      // Notify the SW that this client is now offline so its
      // _onlineClientCount is accurate (used by the SW to decide whether
      // to try the network or short-circuit to cache/503).
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((reg) => {
            reg.active?.postMessage({ type: 'medq:client-offline' });
          })
          .catch(() => {});
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // We still subscribe to queue-status events so we know whether any
    // writes are pending. If there are pending writes while offline,
    // we'll want to show the "Back online" confirmation when reconnect
    // happens (otherwise the user has no idea their writes flushed).
    const unsubscribe = subscribeToQueueStatus((count) => {
      if (count > 0 && !isOnline) {
        setHadPendingWhileOffline(true);
      }
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, [isOnline]);

  // ── Compute the visible state ──
  // Telegram-style: ONLY show "Back online" briefly after reconnect.
  // Never show offline/pending/syncing chips — the app should appear
  // completely normal when offline, exactly like Telegram.
  let state: IndicatorState;
  if (showRestored) {
    state = { kind: 'restored' };
  } else {
    state = { kind: 'hidden' };
  }

  if (state.kind === 'hidden') return null;

  const base =
    'fixed top-3 right-3 z-[100] pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200 animate-fade-in';

  let content: React.ReactNode = null;
  let className = base;

  if (state.kind === 'restored') {
    className += ' bg-[#00e5a0] text-[#0c0e14]';
    content = (
      <>
        <Check className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Back online</span>
      </>
    );
  }

  return (
    <div className={className} role="status" aria-live="polite">
      {content}
    </div>
  );
}
