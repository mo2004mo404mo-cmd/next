'use client';

/**
 * OfflineEmptyState — a reusable "You're offline" empty-state component.
 *
 * Used by every tab that hits an API endpoint that may not be cached.
 * When the SW returns a 503 offline response (or when navigator.onLine
 * is false and the fetch failed), the tab renders this component instead
 * of misleading "Failed to load" toast + empty list.
 *
 * Props:
 *   - label: what we tried to load (e.g. "questions", "flashcards")
 *   - onRetry: callback for the "Retry" button
 *   - hint: optional extra explanation
 *   - compact: if true, render a smaller version for inline panels
 *
 * IMPORTANT: The `online` event listener is attached ONCE on mount (using
 * a ref to hold the latest onRetry callback). Previously the listener was
 * re-attached on every parent re-render because `onRetry` was a dependency
 * of the useEffect — this caused listener churn and re-render storms when
 * the parent component re-rendered frequently.
 */

import { useEffect, useRef, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { browserIsOffline } from '@/lib/offline-response';

export interface OfflineEmptyStateProps {
  label?: string;
  onRetry?: () => void;
  hint?: string;
  compact?: boolean;
}

export default function OfflineEmptyState({
  label = 'content',
  onRetry,
  hint,
  compact = false,
}: OfflineEmptyStateProps) {
  const [retrying, setRetrying] = useState(false);

  // Use a ref to hold the latest onRetry callback so the `online` event
  // listener doesn't need to be re-attached on every parent re-render.
  // This was a major source of "heavy" feeling — every parent state
  // change was tearing down and re-adding the listener.
  const onRetryRef = useRef(onRetry);
  onRetryRef.current = onRetry;

  // Auto-retry when the browser comes back online (Telegram-style —
  // user doesn't need to tap Retry if they just wait for connectivity).
  // The empty dependency array means this listener is attached ONCE
  // for the lifetime of this component instance.
  useEffect(() => {
    const handleOnline = () => {
      const fn = onRetryRef.current;
      if (fn) {
        setRetrying(true);
        // Small delay so the spinner is visible briefly + gives the
        // network time to actually be usable
        setTimeout(() => {
          try {
            fn();
          } catch (e) {
            /* ignore */
          }
          setRetrying(false);
        }, 500);
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleRetry = () => {
    if (browserIsOffline()) {
      // Browser still offline — no point retrying, just jiggle the button
      // briefly so the user gets feedback that they tapped it
      setRetrying(true);
      setTimeout(() => setRetrying(false), 400);
      return;
    }
    const fn = onRetryRef.current;
    if (fn) {
      setRetrying(true);
      try {
        Promise.resolve(fn()).finally(() => setRetrying(false));
      } catch (e) {
        setRetrying(false);
      }
    }
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <div className="w-10 h-10 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-2">
          <WifiOff className="w-5 h-5 text-[#ffb347]" />
        </div>
        <p className="text-[#ffb347] text-xs font-semibold">You're offline</p>
        <p className="text-[#5a6178] text-[11px] mt-1 max-w-[240px]">
          {hint || `${label[0].toUpperCase() + label.slice(1)} will load once you reconnect.`}
        </p>
        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${retrying ? 'animate-spin' : ''}`} />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-4">
        <WifiOff className="w-7 h-7 text-[#ffb347]" />
      </div>
      <p className="text-[#ffb347] text-sm font-semibold">You're offline</p>
      <p className="text-[#5a6178] text-xs mt-1 text-center max-w-xs">
        {hint ||
          `The ${label} hasn't been cached yet. Open this tab while online once, and your ${label} will be available offline afterwards.`}
      </p>
      {onRetry && (
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
          Retry
        </button>
      )}
    </div>
  );
}
