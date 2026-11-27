'use client';

/**
 * OfflineTabFallback — graceful "you're offline" UI for tab components.
 *
 * Background — why this exists:
 * ──────────────────────────────
 * Several MedQ tabs (AdvancedChatTab, GroupsTab, FriendsTab, FeedTab, …) gate
 * their initial data fetch on `userId` being non-null. When the user is
 * offline AND `/api/auth/session` can't be fetched AND no cached demo user
 * exists, `userId` stays `undefined` → the fetch never fires → the tab's
 * `loading` state never transitions to `false` → the user sees an indefinite
 * spinner ("Loading chat…", "Loading groups…", etc.).
 *
 * This component provides a single, reusable fallback that:
 *   1. Waits a short grace period (default 1.5s) before showing the offline
 *      message — this avoids flicker on slow networks where userId resolves
 *      a beat after first paint.
 *   2. After the grace period, if we're still mounted AND `navigator.onLine`
 *      is false, shows a friendly "You're offline" panel with a Retry button.
 *   3. If we're online but userId still hasn't resolved, shows a different
 *      "Something went wrong" message — also with Retry — so the user isn't
 *      stuck staring at a spinner forever.
 *
 * Usage:
 *   if (!userId) return <OfflineTabFallback label="chat" onRetry={() => location.reload()} />;
 *
 * The component is intentionally tiny (no external deps beyond lucide-react)
 * so it can be safely imported into already-large tab bundles.
 */

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';

interface OfflineTabFallbackProps {
  /** Human-readable label for what's loading, e.g. "chat", "groups". */
  label?: string;
  /** Called when the user clicks Retry. Defaults to `() => window.location.reload()`. */
  onRetry?: () => void;
  /** Grace period in ms before showing the offline message. Default 1500. */
  graceMs?: number;
}

export default function OfflineTabFallback({
  label,
  onRetry,
  graceMs = 1500,
}: OfflineTabFallbackProps) {
  const [showFallback, setShowFallback] = useState(false);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  );

  useEffect(() => {
    // After the grace period, flip `showFallback` to true. If userId resolves
    // before the timer fires, the parent will unmount us and the timer is
    // cleared by the cleanup function — no flicker.
    const t = setTimeout(() => setShowFallback(true), graceMs);
    return () => clearTimeout(t);
  }, [graceMs]);

  useEffect(() => {
    const on = () => setIsOffline(false);
    const off = () => setIsOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  if (!showFallback) {
    // Still within the grace period — show a minimal spinner so the user
    // sees something is happening.
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3"
        style={{ background: '#0c0e14' }}
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-[#00e5a0] border-t-transparent animate-spin"
          aria-label="Loading"
        />
        {label && (
          <p className="text-[#8b95a8] text-sm">Loading {label}…</p>
        )}
      </div>
    );
  }

  const handleRetry = () => {
    if (onRetry) onRetry();
    else if (typeof window !== 'undefined') window.location.reload();
  };

  if (isOffline) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center"
        style={{ background: '#0c0e14' }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255, 87, 87, 0.08)' }}
        >
          <WifiOff className="w-7 h-7 text-[#ff5757]" />
        </div>
        <div>
          <p className="text-[#e4e7ec] text-sm font-medium">You&apos;re offline</p>
          <p className="text-[#8b95a8] text-xs mt-1 max-w-xs">
            {label
              ? `We couldn't load your ${label} because you're not connected to the internet. Reconnect and try again.`
              : "We couldn't load this content because you're not connected to the internet. Reconnect and try again."}
          </p>
        </div>
        <button
          onClick={handleRetry}
          className="mt-1 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14] flex items-center gap-2"
          style={{ background: '#00e5a0' }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  // Online but userId still hasn't resolved after grace period — likely a
  // server-side issue. Show a generic "something went wrong" message.
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center"
      style={{ background: '#0c0e14' }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255, 193, 7, 0.08)' }}
      >
        <AlertTriangle className="w-7 h-7 text-[#ffc107]" />
      </div>
      <div>
        <p className="text-[#e4e7ec] text-sm font-medium">Something went wrong</p>
        <p className="text-[#8b95a8] text-xs mt-1 max-w-xs">
          {label
            ? `We couldn't load your ${label}. Please try again.`
            : 'We couldn\'t load this content. Please try again.'}
        </p>
      </div>
      <button
        onClick={handleRetry}
        className="mt-1 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14] flex items-center gap-2"
        style={{ background: '#00e5a0' }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </div>
  );
}
