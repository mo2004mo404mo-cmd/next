'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSubscription } from './SubscriptionContext';
import { X, Coins, Sparkles, Play, Check, Clock, Gift, Zap, Eye, Palette, Package, Lightbulb, ShieldCheck, ArrowRight, AlertTriangle, ShoppingCart, TrendingUp, Star } from 'lucide-react';

interface CreditShopProps {
  open: boolean;
  onClose: () => void;
  onWatchAd: () => void;
}

interface HistoryEntry {
  id: string;
  type: string;
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
}

interface CreditPackage {
  id: string;
  name: string;
  tagline: string;
  baseCredits: number;
  bonusCredits: number;
  totalCredits: number;
  priceUsd: number;
  centPerCredit: number;
  popular?: boolean;
  bestValue?: boolean;
  accentColor: string;
}

interface SpendItem {
  action: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const SPEND_ITEMS: SpendItem[] = [
  {
    action: 'hint',
    title: 'Quiz Hint',
    description: 'Reveals a hint for the current question — eliminates 2 wrong options',
    cost: 3,
    emoji: '🔍',
    icon: <Lightbulb className="w-5 h-5" />,
    color: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-[#f59e0b]/5',
  },
  {
    action: 'streak_freeze',
    title: 'Streak Freeze',
    description: 'Protect your streak for 1 missed day — never lose your progress!',
    cost: 5,
    emoji: '❄️',
    icon: <Zap className="w-5 h-5" />,
    color: '#38bdf8',
    gradient: 'from-[#38bdf8]/20 to-[#38bdf8]/5',
  },
  {
    action: 'premium_hour',
    title: 'Premium Hour',
    description: 'Unlock all premium features for 1 hour',
    cost: 10,
    emoji: '⏰',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: '#00e5a0',
    gradient: 'from-[#00e5a0]/20 to-[#00e5a0]/5',
  },
  {
    action: 'question_pack',
    title: 'Question Pack',
    description: 'Get 5 bonus AI-generated questions on a topic of your choice',
    cost: 15,
    emoji: '📦',
    icon: <Package className="w-5 h-5" />,
    color: '#4fc3f7',
    gradient: 'from-[#4fc3f7]/20 to-[#4fc3f7]/5',
  },
  {
    action: 'custom_theme',
    title: 'Custom Theme',
    description: 'Unlock a custom color theme for your MedQ experience',
    cost: 20,
    emoji: '🎨',
    icon: <Palette className="w-5 h-5" />,
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6]/20 to-[#8b5cf6]/5',
  },
];

export default function CreditShop({ open, onClose, onWatchAd }: CreditShopProps) {
  const { credits, refresh } = useSubscription();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'shop' | 'buy' | 'history' | 'earn'>('shop');
  const [confirmItem, setConfirmItem] = useState<SpendItem | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        const [histRes, pkgRes] = await Promise.all([
          fetch('/api/credits'),
          fetch('/api/credits/packages'),
        ]);
        if (histRes.ok) {
          const data = await histRes.json();
          setHistory(data.history || []);
        }
        if (pkgRes.ok) {
          const data = await pkgRes.json();
          setPackages(data.packages || []);
        }
      } catch (e) { console.error('Credit shop fetch error:', e); }
    };
    fetchData();
  }, [open, credits.balance]);

  const handleBuyCredits = useCallback(async (pkg: CreditPackage) => {
    setRedirecting(pkg.id);
    setPurchaseError(null);
    try {
      const res = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pkg.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPurchaseError(data.error || 'Failed to start purchase');
        return;
      }
      // Either redirect to Stripe Checkout or to mock-success (which fulfills immediately).
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setPurchaseSuccess(`${pkg.totalCredits} credits purchased!`);
      await refresh();
      setTimeout(() => setPurchaseSuccess(null), 2500);
    } catch (e) {
      console.error('Credit purchase error:', e);
      setPurchaseError('Network error. Please try again.');
    } finally {
      setRedirecting(null);
    }
  }, [refresh]);

  const handlePurchase = useCallback(async (item: SpendItem) => {
    setPurchasing(item.action);
    setPurchaseError(null);
    try {
      const res = await fetch('/api/credits/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: item.action, amount: item.cost, description: item.description }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'Insufficient credits') {
          setPurchaseError(`Not enough credits! You need ${item.cost} but only have ${credits.balance}.`);
        } else {
          setPurchaseError(data.error || 'Purchase failed');
        }
        return;
      }
      setPurchased(item.action);
      setPurchaseSuccess(item.title);
      await refresh();
      setTimeout(() => {
        setPurchased(null);
        setPurchaseSuccess(null);
      }, 2000);
    } catch (e) {
      console.error('Purchase error:', e);
      setPurchaseError('Network error. Please try again.');
    } finally {
      setPurchasing(null);
      setConfirmItem(null);
    }
  }, [credits.balance, refresh]);

  if (!open) return null;

  const tabs = [
    { id: 'shop' as const, label: 'Spend', icon: <Coins className="w-3.5 h-3.5" /> },
    { id: 'buy' as const, label: 'Buy Credits', icon: <ShoppingCart className="w-3.5 h-3.5" /> },
    { id: 'earn' as const, label: 'Earn', icon: <Gift className="w-3.5 h-3.5" /> },
    { id: 'history' as const, label: 'History', icon: <Clock className="w-3.5 h-3.5" /> },
  ];

  const earnMethods = [
    { title: 'Watch Ad', description: 'Watch a short ad to earn 10 credits', reward: 10, icon: <Play className="w-4 h-4" />, color: '#f59e0b', action: onWatchAd },
    { title: 'Daily Login', description: 'Come back each day for bonus credits', reward: 5, icon: <Gift className="w-4 h-4" />, color: '#00e5a0', action: null },
    { title: 'Study Streak', description: 'Maintain a 7-day streak for bonus', reward: 25, icon: <Sparkles className="w-4 h-4" />, color: '#8b5cf6', action: null },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-lg bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#e8ecf4]">Credit Shop</h2>
              <p className="text-[10px] text-[#5a6478]">Spend credits on features & earn more</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
              <Coins className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-xs font-bold font-mono text-[#f59e0b]">{credits.balance}</span>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-white/[0.04]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20'
                  : 'text-[#5a6478] hover:text-[#8b95a8] hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'thin' }}>
          {activeTab === 'shop' && (
            <div className="space-y-3">
              {/* Success toast */}
              {purchaseSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] animate-pulse">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">{purchaseSuccess} purchased successfully!</span>
                </div>
              )}

              {/* Error toast */}
              {purchaseError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757]">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">{purchaseError}</span>
                </div>
              )}

              {/* Featured spend items */}
              <div className="space-y-3">
                {SPEND_ITEMS.map(item => {
                  const canAfford = credits.balance >= item.cost;
                  const isPurchased = purchased === item.action;
                  const isPurchasing = purchasing === item.action;
                  return (
                    <div
                      key={item.action}
                      className="relative p-4 rounded-xl border border-white/[0.06] bg-[#1a1e2b] hover:border-white/[0.1] transition-all group overflow-hidden"
                    >
                      {/* Background gradient accent */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      <div className="relative flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}10` }}>
                          <span style={{ color: item.color }}>{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.emoji}</span>
                            <h4 className="text-sm font-bold text-[#e8ecf4]">{item.title}</h4>
                          </div>
                          <p className="text-[11px] text-[#5a6478] mt-1 leading-relaxed">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5">
                              <Coins className="w-3.5 h-3.5 text-[#f59e0b]" />
                              <span className="text-sm font-bold text-[#f59e0b]">{item.cost}</span>
                              <span className="text-[10px] text-[#5a6478]">credits</span>
                            </div>
                            {isPurchased ? (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5a0]/10 text-[#00e5a0] animate-[scaleIn_0.3s_ease-out]">
                                <Check className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">Purchased!</span>
                              </div>
                            ) : !canAfford ? (
                              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757]">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="text-[10px] font-bold">Not enough credits</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmItem(item)}
                                disabled={isPurchasing}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all bg-white/[0.06] text-[#e8ecf4] hover:bg-white/[0.1] active:scale-95 border border-white/[0.08] hover:border-white/[0.15]"
                              >
                                {isPurchasing ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-[#e8ecf4]/30 border-t-[#e8ecf4] rounded-full animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <ArrowRight className="w-3 h-3" />
                                    Buy for {item.cost} credits
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Separator and legacy shop items */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-[#151821] text-[10px] text-[#5a6478] uppercase tracking-wider">More items</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'ai_gen_5', title: '5 AI Generations', description: 'Generate 5 more AI-powered questions', cost: 20, icon: <Zap className="w-4 h-4" />, color: '#00e5a0' },
                  { id: 'tutor_10', title: '10 Tutor Messages', description: 'Chat with AI tutor 10 more times', cost: 15, icon: <Eye className="w-4 h-4" />, color: '#4fc3f7' },
                  { id: 'mnemonics_3', title: '3 Mnemonics', description: 'Get 3 AI-generated mnemonics', cost: 8, icon: <Sparkles className="w-4 h-4" />, color: '#fbbf24' },
                ].map(item => {
                  const canAfford = credits.balance >= item.cost;
                  const isPurchased = purchased === item.id;
                  const isPurchasing = purchasing === item.id;
                  return (
                    <div key={item.id} className="relative p-3 rounded-xl border border-white/[0.06] bg-[#1a1e2b] hover:border-white/[0.1] transition-all">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}10` }}>
                          <span style={{ color: item.color }}>{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-[#e8ecf4] truncate">{item.title}</h4>
                          <p className="text-[9px] text-[#5a6478] mt-0.5 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Coins className="w-3 h-3 text-[#f59e0b]" />
                              <span className="text-[10px] font-bold text-[#f59e0b]">{item.cost}</span>
                            </div>
                            {isPurchased ? (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00e5a0]/10 text-[#00e5a0]">
                                <Check className="w-2.5 h-2.5" /> <span className="text-[9px] font-bold">Done!</span>
                              </div>
                            ) : (
                              <button
                                onClick={async () => {
                                  setPurchasing(item.id);
                                  try {
                                    const res = await fetch('/api/credits', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ action: 'spend', amount: item.cost, category: item.id, description: item.title }),
                                    });
                                    if (res.ok) {
                                      setPurchased(item.id);
                                      await refresh();
                                      setTimeout(() => setPurchased(null), 1500);
                                    }
                                  } catch (e) {
                                    console.error('Purchase error:', e);
                                  } finally {
                                    setPurchasing(null);
                                  }
                                }}
                                disabled={!canAfford || isPurchasing}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${
                                  canAfford
                                    ? 'bg-[#00e5a0]/10 text-[#00e5a0] hover:bg-[#00e5a0]/20 active:scale-95'
                                    : 'bg-white/[0.03] text-[#3a4055] cursor-not-allowed'
                                }`}
                              >
                                {isPurchasing ? '...' : canAfford ? <><ArrowRight className="w-2.5 h-2.5" /> Buy</> : 'Need more'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'buy' && (
            <div className="space-y-3">
              {/* Success / Error toasts (shared with Spend tab) */}
              {purchaseSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] animate-pulse">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">{purchaseSuccess}</span>
                </div>
              )}
              {purchaseError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757]">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">{purchaseError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00e5a0]/5 border border-[#00e5a0]/10">
                <TrendingUp className="w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0" />
                <p className="text-[10px] text-[#8b95a8] leading-relaxed">
                  Credits unlock extra AI generations, tutor messages, and premium features when you exceed your daily limit. They never expire.
                </p>
              </div>

              {/* Package grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <ShoppingCart className="w-8 h-8 text-[#3a4055] mx-auto mb-2" />
                    <p className="text-xs text-[#5a6478]">Loading packages…</p>
                  </div>
                )}
                {packages.map((pkg) => {
                  const isRedirecting = redirecting === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      className={`relative p-4 rounded-xl border transition-all group overflow-hidden ${
                        pkg.popular
                          ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.04]'
                          : pkg.bestValue
                            ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.03]'
                            : 'border-white/[0.06] bg-[#1a1e2b] hover:border-white/[0.1]'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2 left-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8b5cf6] text-white flex items-center gap-1">
                          <Star className="w-2.5 h-2.5" /> POPULAR
                        </span>
                      )}
                      {pkg.bestValue && (
                        <span className="absolute -top-2 left-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#00e5a0] text-[#0c0e14] flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5" /> BEST VALUE
                        </span>
                      )}

                      <div className="flex items-start justify-between mb-2 mt-1">
                        <div>
                          <h4 className="text-sm font-bold text-[#e8ecf4]">{pkg.name}</h4>
                          <p className="text-[10px] text-[#5a6478] mt-0.5 leading-tight">{pkg.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-2xl font-bold font-mono" style={{ color: pkg.accentColor }}>
                          {pkg.totalCredits}
                        </span>
                        <span className="text-[10px] text-[#5a6478]">credits</span>
                      </div>

                      {pkg.bonusCredits > 0 && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00e5a0]/10 text-[#00e5a0] text-[9px] font-bold mb-3">
                          <Gift className="w-2.5 h-2.5" />
                          +{pkg.bonusCredits} bonus credits
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-lg font-bold text-[#e8ecf4]">${pkg.priceUsd.toFixed(2)}</span>
                          <span className="text-[9px] text-[#5a6478] ml-1">(${pkg.centPerCredit.toFixed(2)}/cr)</span>
                        </div>
                        <button
                          onClick={() => handleBuyCredits(pkg)}
                          disabled={isRedirecting}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 disabled:opacity-60"
                          style={{ background: pkg.accentColor, color: pkg.accentColor === '#5a6478' ? '#e8ecf4' : '#0c0e14' }}
                        >
                          {isRedirecting ? (
                            <>
                              <div className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                              Redirecting…
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3 h-3" />
                              Buy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-[9px] text-[#3a4055] text-center mt-3 leading-relaxed">
                Secure checkout powered by Stripe. Credits are added to your wallet instantly after payment.
              </p>
            </div>
          )}

          {activeTab === 'earn' && (
            <div className="space-y-3">
              {earnMethods.map((method, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#1a1e2b]">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${method.color}10` }}>
                    <span style={{ color: method.color }}>{method.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#e8ecf4]">{method.title}</h4>
                    <p className="text-[11px] text-[#5a6478] mt-0.5">{method.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3 text-[#f59e0b]" />
                      <span className="text-xs font-bold text-[#f59e0b]">+{method.reward}</span>
                    </div>
                    {method.action ? (
                      <button
                        onClick={() => { method.action?.(); onClose(); }}
                        className="px-3 py-1 rounded-md bg-[#f59e0b]/10 text-[#f59e0b] text-[10px] font-bold hover:bg-[#f59e0b]/20 transition-all"
                      >
                        Start
                      </button>
                    ) : (
                      <span className="text-[9px] text-[#5a6478]">Automatic</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.04] text-center">
                  <p className="text-lg font-bold font-mono text-[#00e5a0]">{credits.totalEarned}</p>
                  <p className="text-[9px] text-[#5a6478]">Total Earned</p>
                </div>
                <div className="p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.04] text-center">
                  <p className="text-lg font-bold font-mono text-[#ff5757]">{credits.totalSpent}</p>
                  <p className="text-[9px] text-[#5a6478]">Total Spent</p>
                </div>
                <div className="p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.04] text-center">
                  <p className="text-lg font-bold font-mono text-[#f59e0b]">{credits.balance}</p>
                  <p className="text-[9px] text-[#5a6478]">Balance</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              {history.length === 0 ? (
                <div className="text-center py-10">
                  <Clock className="w-8 h-8 text-[#3a4055] mx-auto mb-3" />
                  <p className="text-sm text-[#5a6478]">No transactions yet</p>
                  <p className="text-[10px] text-[#3a4055] mt-1">Earn credits by watching ads or get daily bonuses</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map(entry => {
                    const isEarn = entry.amount > 0;
                    return (
                      <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1e2b] border border-white/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isEarn ? 'bg-[#00e5a0]/10' : 'bg-[#ff5757]/10'}`}>
                            {isEarn ? <Coins className="w-3.5 h-3.5 text-[#00e5a0]" /> : <ArrowRight className="w-3.5 h-3.5 text-[#ff5757]" />}
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#e8ecf4]">{entry.description}</p>
                            <p className="text-[9px] text-[#5a6478]">{new Date(entry.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-bold font-mono ${isEarn ? 'text-[#00e5a0]' : 'text-[#ff5757]'}`}>
                            {isEarn ? '+' : ''}{entry.amount}
                          </p>
                          <p className="text-[9px] text-[#5a6478] font-mono">bal: {entry.balance}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm bg-[#1a1e2b] border border-white/[0.1] rounded-2xl p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${confirmItem.color}10` }}>
                <span style={{ color: confirmItem.color }}>{confirmItem.icon}</span>
              </div>
              <h3 className="text-base font-bold text-[#e8ecf4] mb-1">Confirm Purchase</h3>
              <p className="text-sm text-[#e8ecf4] font-semibold mb-1">{confirmItem.emoji} {confirmItem.title}</p>
              <p className="text-[11px] text-[#5a6478] mb-4">{confirmItem.description}</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 mb-5">
                <Coins className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-sm font-bold text-[#f59e0b]">{confirmItem.cost} credits</span>
                <span className="text-[10px] text-[#5a6478]">•</span>
                <span className="text-[10px] text-[#5a6478]">Balance after: {credits.balance - confirmItem.cost}</span>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setConfirmItem(null); setPurchaseError(null); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#5a6478] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePurchase(confirmItem)}
                  disabled={purchasing === confirmItem.action}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#0c0e14] transition-all active:scale-95"
                  style={{ background: confirmItem.color }}
                >
                  {purchasing === confirmItem.action ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin" />
                      Buying...
                    </span>
                  ) : (
                    `Buy for ${confirmItem.cost} credits`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
