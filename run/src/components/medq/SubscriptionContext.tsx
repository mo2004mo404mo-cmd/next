'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import type { Tier } from '@/lib/freemium-store';

interface SubscriptionState {
  tier: Tier;
  adsEnabled: boolean;
  credits: { balance: number; totalEarned: number; totalSpent: number };
  usage: Record<string, { used: number; limit: number }>;
  loading: boolean;
  canAccess: (category: string) => boolean;
  trackUsage: (category: string) => Promise<void>;
  refresh: () => Promise<void>;
  setShowUpgradeModal: (show: boolean) => void;
  showUpgradeModal: boolean;
}

const SubscriptionContext = createContext<SubscriptionState>({
  tier: 'free',
  adsEnabled: true,
  credits: { balance: 0, totalEarned: 0, totalSpent: 0 },
  usage: {},
  loading: true,
  canAccess: () => true,
  trackUsage: async () => {},
  refresh: async () => {},
  setShowUpgradeModal: () => {},
  showUpgradeModal: false,
});

export const useSubscription = () => useContext(SubscriptionContext);

function SubscriptionLoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0c0e14' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5a0] to-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00e5a0]/25">
          <Loader2 className="w-7 h-7 text-[#0c0e14] animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#e8ecf4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Loading Med<span className="text-[#00e5a0]">Q</span>
          </p>
          <p className="text-[10px] text-[#5a6478] mt-1">Preparing your study environment...</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('free');
  const [credits, setCredits] = useState({ balance: 0, totalEarned: 0, totalSpent: 0 });
  const [usage, setUsage] = useState<Record<string, { used: number; limit: number }>>({});
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const hasFetchedRef = useRef(false);

  const refresh = useCallback(async () => {
    // Fast path: if we're offline, don't even try to fetch — just clear
    // loading state immediately so the app shell renders with the default
    // 'free' tier values. The SW would return a 503 anyway, but skipping
    // the round-trip avoids a flash of the loading skeleton when the user
    // reloads the page offline.
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/subscription');
      if (res.ok) {
        const data = await res.json();
        setTier(data.tier || 'free');
        setCredits(data.credits || { balance: 0, totalEarned: 0, totalSpent: 0 });
        setUsage(data.usage || {});
      }
    } catch (e) {
      console.error('Subscription refresh error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      refresh();
    }
  }, [refresh]);

  // When the network comes back online, re-fetch the subscription data
  // (it was skipped during the offline fast-path above). This ensures
  // the correct tier/credits/usage are restored as soon as connectivity
  // returns, instead of waiting for the next manual refresh.
  useEffect(() => {
    const handleOnline = () => {
      // hasFetchedRef.current is already true, so we call refresh() directly
      refresh();
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [refresh]);

  const canAccess = useCallback((category: string) => {
    const entry = usage[category];
    if (!entry) return true;
    return entry.used < entry.limit;
  }, [usage]);

  const trackUsage = useCallback(async (category: string) => {
    // OFFLINE GUARD: skip usage tracking entirely when offline.
    // Usage tracking is best-effort analytics — when the network is down,
    // we should NOT attempt the fetch, because:
    //   1. It throws a "Failed to fetch" TypeError that pollutes the
    //      browser console (the error is caught, but `console.error`
    //      still surfaces it, which is what the user sees).
    //   2. /api/subscription/usage is intentionally NOT in the SW's
    //      QUEUEABLE_PATTERNS list (usage tracking isn't a critical
    //      write that needs to be replayed — it's just analytics).
    //   3. The synthetic 202 path would add complexity for no benefit.
    // Telegram-style: app should appear completely normal offline.
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return;
    }
    try {
      const res = await fetch('/api/subscription/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });
      if (res.ok) {
        const data = await res.json();
        setUsage(prev => ({ ...prev, [category]: data }));
      }
    } catch (e) {
      // SILENT FAIL: do not log network errors to console.error —
      // they're expected when the network is flaky, and surfacing
      // them creates the impression that the app is broken.
      // Only log non-network errors (which are programming bugs).
      const isNetworkError =
        e instanceof TypeError &&
        (e.message === 'Failed to fetch' || e.message.includes('fetch'));
      if (!isNetworkError) {
        console.error('Track usage error:', e);
      }
    }
  }, []);

  const adsEnabled = tier === 'free';

  // if (loading) {
  //   return <SubscriptionLoadingSkeleton />;
  // }

  return (
    <SubscriptionContext.Provider value={{ tier, adsEnabled, credits, usage, loading, canAccess, trackUsage, refresh, setShowUpgradeModal, showUpgradeModal }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
