'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Play, Check, Coins, Sparkles, Volume2 } from 'lucide-react';

interface RewardedCampaign {
  id: string;
  title?: string;
  subtitle?: string;
  adType?: string;
}

interface RewardedAdProps {
  open: boolean;
  onClose: () => void;
  onReward?: (credits: number) => void;
}

/* ── Confetti particle ── */
function ConfettiParticle({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: '40%',
        backgroundColor: color,
        animation: `confettiFall 1.2s ${delay}ms ease-out forwards`,
        opacity: 0,
      }}
    />
  );
}

export default function RewardedAd({ open, onClose, onReward }: RewardedAdProps) {
  const [campaign, setCampaign] = useState<RewardedCampaign | null>(null);
  const [impressionId, setImpressionId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [watching, setWatching] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundPulse, setSoundPulse] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const CREDITS = 10;
  const DURATION = 15;

  // Ref-based reset to avoid React lint warning about setState in useEffect
  const resetRef = useRef(false);

  useEffect(() => {
    if (!open) {
      resetRef.current = true;
      return;
    }
    // Reset states when opening (only if we were previously closed)
    if (resetRef.current) {
      resetRef.current = false;
      setProgress(0);
      setWatching(false);
      setCompleted(false);
      setClaimed(false);
      setShowConfetti(false);
      setSoundPulse(false);
    }

    const fetchCampaign = async () => {
      try {
        setLoadError(false);
        const res = await fetch('/api/ads/campaigns?placement=dashboard_top');
        if (!res.ok) {
          setCampaign(null);
          setLoadError(true);
          return;
        }

        const data = await res.json();
        const selectedCampaign = data.campaign && data.campaign.adType === 'rewarded' ? data.campaign : null;
        setCampaign(selectedCampaign);

        if (!selectedCampaign) {
          setLoadError(true);
          return;
        }

        const impRes = await fetch('/api/ads/impression', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: selectedCampaign.id, adType: 'rewarded', placement: 'dashboard_top' }),
        });
        if (impRes.ok) {
          const impData = await impRes.json();
          setImpressionId(impData.id);
        }
      } catch (e) {
        console.error('RewardedAd fetch error:', e);
        setCampaign(null);
        setLoadError(true);
      }
    };
    fetchCampaign();
  }, [open]);

  useEffect(() => {
    if (!watching || completed) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / DURATION);
        if (next >= 100) {
          setCompleted(true);
          setWatching(false);
          return 100;
        }
        // Visual "sound" pulse every few seconds
        if (Math.floor(next) % 25 < 7) {
          setSoundPulse(true);
          setTimeout(() => setSoundPulse(false), 300);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [watching, completed]);

  const handleClaim = useCallback(async () => {
    if (!impressionId) return;
    try {
      const res = await fetch('/api/ads/reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ impressionId }),
      });
      if (res.ok) {
        setClaimed(true);
        setShowConfetti(true);
        onReward?.(CREDITS);
        setTimeout(() => { setShowConfetti(false); onClose(); }, 2200);
      }
    } catch (e) {
      console.error('Reward claim error:', e);
    }
  }, [impressionId, onReward, onClose]);

  const secondsLeft = Math.ceil(DURATION * (1 - progress / 100));

  if (!open) return null;

  const confettiColors = ['#00e5a0', '#f59e0b', '#8b5cf6', '#4fc3f7', '#fbbf24', '#ff5757'];
  const confettiParticles = showConfetti ? Array.from({ length: 20 }, (_, i) => ({
    delay: i * 18,
    x: 10 + ((i * 11) % 80),
    color: confettiColors[i % confettiColors.length],
  })) : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      {/* Keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(120px) scale(0.3) rotate(720deg); }
        }
        @keyframes coinPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 160, 0); }
          50% { box-shadow: 0 0 20px 4px rgba(0, 229, 160, 0.3); }
        }
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      ` }} />

      <div className="relative w-full max-w-sm mx-4 bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        {/* Confetti overlay */}
        {showConfetti && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {confettiParticles.map((p, i) => (
              <ConfettiParticle key={i} delay={p.delay} x={p.x} color={p.color} />
            ))}
          </div>
        )}

        <button onClick={onClose} className="absolute top-3 right-3 text-white/30 hover:text-white/60 z-10 transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {claimed ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4" style={{ animation: 'glowPulse 1s ease-in-out infinite' }}>
                <Check className="w-8 h-8 text-[#00e5a0]" />
              </div>
              <h3 className="text-xl font-bold text-[#e8ecf4]">+{CREDITS} Credits!</h3>
              <p className="text-xs text-[#8b95a8] mt-2">Use credits to unlock premium features</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-xs text-[#f59e0b] font-semibold">Reward claimed!</span>
                <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              </div>
            </div>
          ) : completed ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-4" style={{ animation: 'glowPulse 1s ease-in-out infinite' }}>
                <Coins className="w-8 h-8 text-[#f59e0b]" style={{ animation: 'coinPulse 1s ease-in-out infinite' }} />
              </div>
              <h3 className="text-xl font-bold text-[#e8ecf4]">Ad Complete!</h3>
              <p className="text-xs text-[#8b95a8] mt-2 mb-5">Your reward is ready — claim it now!</p>
              <button disabled={!impressionId} onClick={handleClaim} className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#000] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#f59e0b]/25 flex items-center gap-2 mx-auto disabled:opacity-60 disabled:cursor-not-allowed">
                <Coins className="w-4 h-4" /> Claim {CREDITS} Credits
              </button>
            </div>
          ) : (
            <>
              {/* Header: Watch to Earn CTA */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-[#f59e0b]">Watch to earn {CREDITS} credits</span>
                  <p className="text-[10px] text-[#5a6478]">A short {DURATION}s ad — your reward awaits!</p>
                </div>
              </div>

              {/* Campaign card */}
              {campaign ? (
                <div className="bg-[#1a1e2b] rounded-xl p-4 mb-4 border border-white/[0.04]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#00e5a0]/60">Sponsored</span>
                  <h3 className="text-sm font-bold text-[#e8ecf4] mt-1">{campaign.title}</h3>
                  <p className="text-xs text-[#8b95a8] mt-0.5">{campaign.subtitle}</p>
                </div>
              ) : (
                <div className="bg-[#1a1e2b] rounded-xl p-4 mb-4 text-center border border-white/[0.04]">
                  <p className="text-xs text-[#8b95a8]">{loadError ? 'No ad available right now. Please try again later.' : 'Preparing ad...'}</p>
                </div>
              )}

              {/* Progress section with prominent countdown */}
              <div className="mb-4">
                {/* Countdown circle */}
                <div className="flex items-center justify-center mb-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle
                        cx="32" cy="32" r="28" fill="none"
                        stroke="url(#progressGrad)" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold font-mono ${watching ? 'text-[#f59e0b]' : 'text-[#5a6478]'}`} style={watching ? { animation: 'countdownPulse 1s ease-in-out infinite' } : undefined}>
                        {watching ? secondsLeft : DURATION}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-[#1a1e2b] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-[#5a6478]">{Math.round(progress)}%</span>
                  <span className="text-[10px] text-[#5a6478]">{secondsLeft}s remaining</span>
                </div>
              </div>

              {/* Sound feedback indicator */}
              {soundPulse && watching && (
                <div className="flex items-center justify-center gap-1 mb-2 animate-pulse">
                  <Volume2 className="w-3 h-3 text-[#4fc3f7]" />
                  <span className="text-[9px] text-[#4fc3f7]/60">Audio playing</span>
                </div>
              )}

              {/* Action button */}
              {!watching ? (
                <button disabled={!campaign} onClick={() => setWatching(true)} className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#00e5a0] to-[#00b87a] text-[#0c0e14] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#00e5a0]/20 disabled:opacity-60 disabled:cursor-not-allowed">
                  <Play className="w-4 h-4" /> Watch Ad & Earn Credits
                </button>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                    <span className="text-xs text-[#8b95a8]">Watching ad... please wait</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
