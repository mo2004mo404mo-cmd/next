'use client';

/**
 * /pricing — a REAL (app) route-group page (2026-11-04).
 *
 * Previously this URL was a 1,677-line fork of the whole SPA shell with its
 * own state-based tab switching and monkeypatched history. Now it renders
 * inside the shared AppShellLayout (persistent sidebar + header) — real
 * routing, consistent chrome, one shell to maintain.
 *
 * The plan chooser is the extracted PricingInline component (also used by
 * the SPA shell's inline pricing tab).
 */

import { useState } from 'react';
import PricingInline from '@/components/medq/PricingInline';
import { useSubscription } from '@/components/medq/SubscriptionContext';

export default function PricingPage() {
  const { tier, refresh } = useSubscription();
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async (t: string) => {
    try {
      setError(null);
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: t }),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update your plan. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      {error && (
        <div
          role="alert"
          className="mb-4 px-4 py-3 rounded-xl border border-[#ff5757]/30 bg-[#ff5757]/10 text-sm text-[#ff5757]"
        >
          {error}
        </div>
      )}
      <PricingInline onUpgrade={handleUpgrade} tier={tier} />
    </div>
  );
}
