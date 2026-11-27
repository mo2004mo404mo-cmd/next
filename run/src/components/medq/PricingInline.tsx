'use client';

import { useState } from 'react';

/**
 * PricingInline — the MedQ plan chooser.
 *
 * Extracted from MedQAppShell (2026-11-04) so the REAL /pricing route —
 * src/app/(app)/pricing/page.tsx, rendered inside the shared AppShellLayout —
 * and the SPA shell both render the same component instead of maintaining
 * two copies.
 *
 * Props are kept identical to the in-shell usage:
 *   onUpgrade — POSTs the chosen tier to /api/subscription (provided by the
 *               hosting page, which owns the subscription refresh)
 *   tier       — the user's current plan id (free | premium | pro)
 */
export default function PricingInline({
  onUpgrade,
  tier,
}: {
  onUpgrade: (t: string) => Promise<void>;
  tier: string;
}) {
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const plans = [
    { id: 'free', name: 'Free', price: '$0', period: '/forever', color: '#5a6478', features: ['5 AI generations/day', '10 tutor messages/day', '823+ question bank', 'Banner ads', 'Earn credits from ads'] },
    { id: 'premium', name: 'Premium', price: '$9.99', period: '/mo', color: '#8b5cf6', popular: true, features: ['100 AI generations/day', '100 tutor messages/day', 'No banner ads', 'Priority support', 'Advanced analytics'] },
    { id: 'pro', name: 'Pro', price: '$19.99', period: '/mo', color: '#f59e0b', features: ['Unlimited everything', 'Zero ads', 'Revenue dashboard', 'Dedicated support', 'API access'] },
  ];

  const handleUpgrade = async (id: string) => {
    setUpgrading(id);
    await onUpgrade(id);
    setUpgrading(null);
  };

  return (
    <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-lg font-bold text-center mb-2">Choose Your Plan</h2>
      <p className="text-xs text-[#8b95a8] text-center mb-6">Start free. Upgrade when you need more. Earn credits by watching ads.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative p-5 rounded-xl border ${plan.popular ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.03]' : 'border-white/[0.06] bg-[#1a1e2b]'}`}>
            {plan.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-0.5 rounded-full bg-[#b79bff] text-[#0c0e14]">POPULAR</span>}
            <div className="text-center mb-3">
              <h3 className="text-sm font-bold">{plan.name}</h3>
              <span className="text-xl font-bold">{plan.price}</span><span className="text-xs text-[#5a6478]">{plan.period}</span>
            </div>
            <ul className="space-y-1.5 mb-4">{plan.features.map((f, i) => <li key={i} className="flex items-center gap-1.5 text-xs text-[#8b95a8]"><span style={{ color: plan.color }}>✓</span>{f}</li>)}</ul>
            {tier === plan.id ? (
              <div className="w-full py-2 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-bold text-center">Current Plan</div>
            ) : (
              <button onClick={() => handleUpgrade(plan.id)} disabled={upgrading === plan.id}
                className="w-full py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{ background: plan.color, color: plan.id === 'free' ? '#e8ecf4' : '#000' }}>
                {upgrading === plan.id ? 'Upgrading...' : plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
