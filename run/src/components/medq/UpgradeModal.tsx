'use client';

import { useState } from 'react';
import { useSubscription } from './SubscriptionContext';
import { X, Crown, Check, Zap, Shield, Loader2 } from 'lucide-react';
import { getTierList } from '@/lib/subscription/tiers';

export default function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, tier, refresh } = useSubscription();
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!showUpgradeModal) return null;

  const plans = getTierList().map((def) => ({
    id: def.id,
    name: def.name,
    tagline: def.tagline,
    price: def.priceUsd === 0 ? '$0' : `$${def.priceUsd.toFixed(2)}`,
    period: def.interval === 'forever' ? '/forever' : '/month',
    features: def.features,
    icon: def.id === 'free' ? <Zap className="w-5 h-5" /> : def.id === 'premium' ? <Crown className="w-5 h-5" /> : <Shield className="w-5 h-5" />,
    color: def.accentColor,
    popular: def.popular,
    current: tier === def.id,
  }));

  const handleUpgrade = async (planId: string) => {
    setError(null);
    if (planId === 'free') {
      // Downgrade is a direct API call (no checkout needed).
      setUpgrading(planId);
      try {
        const res = await fetch('/api/subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: planId }),
        });
        if (res.ok) {
          await refresh();
          setTimeout(() => setShowUpgradeModal(false), 500);
        } else {
          setError('Failed to downgrade. Please try again.');
        }
      } catch (e) {
        console.error('Downgrade error:', e);
        setError('Network error during downgrade.');
      } finally {
        setUpgrading(null);
      }
      return;
    }

    // Premium / Pro — create Stripe Checkout (or mock-success redirect).
    setUpgrading(planId);
    try {
      const res = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: planId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to start checkout.');
        setUpgrading(null);
        return;
      }
      // Redirect to Stripe Checkout (or mock-success in dev).
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      // No URL — shouldn't happen, but handle gracefully.
      setError('Checkout did not return a redirect URL.');
      setUpgrading(null);
    } catch (e) {
      console.error('Checkout error:', e);
      setError('Network error during checkout.');
      setUpgrading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-2xl bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white/60 z-10" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-8 pb-4 px-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8b5cf6]/25">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#e8ecf4]">Unlock Your Full Potential</h2>
          <p className="text-sm text-[#8b95a8] mt-1">Choose the plan that fits your study needs</p>
          {error && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757] text-[11px] font-semibold">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`relative rounded-xl border p-4 transition-all ${plan.current ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.03]' : plan.popular ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.03]' : 'border-white/[0.06] bg-[#1a1e2b]'}`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-0.5 rounded-full bg-[#8b5cf6] text-white">MOST POPULAR</span>
              )}
              <div className="text-center mb-3">
                <div className="mx-auto mb-2" style={{ color: plan.color }}>{plan.icon}</div>
                <h3 className="text-sm font-bold text-[#e8ecf4]">{plan.name}</h3>
                <p className="text-[10px] text-[#5a6478] mt-0.5 leading-tight h-6">{plan.tagline}</p>
                <div className="mt-1">
                  <span className="text-xl font-bold text-[#e8ecf4]">{plan.price}</span>
                  <span className="text-xs text-[#5a6478]">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-[#8b95a8]">
                    <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <div className="w-full py-2 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-bold text-center">Current Plan</div>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={upgrading === plan.id}
                  className="w-full py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  style={{ background: plan.color, color: plan.id === 'free' ? '#e8ecf4' : '#000' }}
                >
                  {upgrading === plan.id ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {plan.id === 'free' ? 'Downgrading...' : 'Redirecting to checkout...'}
                    </>
                  ) : plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-[10px] text-[#5a6478]">
            Secure checkout powered by Stripe. Cancel anytime from Settings → Subscription.
          </p>
        </div>
      </div>
    </div>
  );
}
