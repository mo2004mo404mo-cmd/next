'use client';

import { useSubscription } from './SubscriptionContext';
import { Crown, Coins } from 'lucide-react';

interface PremiumBadgeProps {
  tier?: string;
  size?: 'sm' | 'md';
}

export default function PremiumBadge({ tier: propTier, size = 'sm' }: PremiumBadgeProps) {
  const { tier: contextTier } = useSubscription();
  const tier = propTier || contextTier;

  if (tier === 'free') return null;

  const sizeClasses = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1';
  const colors = tier === 'pro'
    ? 'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#000]'
    : 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30';

  return (
    <span className={`inline-flex items-center gap-1 rounded-md font-bold ${sizeClasses} ${colors}`}>
      <Crown className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
      {tier === 'pro' ? 'PRO' : 'Premium'}
    </span>
  );
}

interface CreditDisplayProps {
  onEarnCredits?: () => void;
  onOpenShop?: () => void;
}

export function CreditDisplay({ onEarnCredits, onOpenShop }: CreditDisplayProps) {
  const { credits } = useSubscription();
  const lowBalance = credits.balance < 20;

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={onOpenShop || onEarnCredits}
        className="group relative inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/20"
        aria-label={`${credits.balance} credits — open credit shop`}
      >
        {/* Animated coin icon — key changes with balance to re-trigger CSS animation */}
        <span key={`coin-${credits.balance}`} className="relative inline-flex animate-[coinPulse_0.4s_ease-out]">
          <Coins
            className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-12 ${lowBalance ? 'animate-pulse' : ''}`}
          />
        </span>
        {/* Balance display — key changes with balance for scale animation */}
        <span key={`bal-${credits.balance}`} className="font-mono tabular-nums animate-[scaleUp_0.3s_ease-out]">
          {credits.balance}
        </span>
        <span className="text-[9px] opacity-60 hidden sm:inline">credits</span>
      </button>

      {/* Watch Ad link for low balance */}
      {lowBalance && (
        <button
          onClick={onEarnCredits}
          className="text-[10px] font-semibold text-[#00e5a0]/70 hover:text-[#00e5a0] transition-colors whitespace-nowrap flex items-center gap-0.5"
          aria-label="Watch an ad to earn credits"
        >
          <Coins className="w-3 h-3" />
          Watch Ad +10
        </button>
      )}

      {/* Inline keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes coinPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes scaleUp {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      ` }} />
    </div>
  );
}
