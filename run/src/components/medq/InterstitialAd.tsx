'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink, Timer } from 'lucide-react';

interface InterstitialAdProps {
  open: boolean;
  onClose: () => void;
  onReward?: () => void;
}

function InterstitialAdInner({ onClose, onReward }: { onClose: () => void; onReward?: () => void }) {
  const TOTAL_SECONDS = 5;
  const [campaign, setCampaign] = useState<any>(null);
  const [impressionId, setImpressionId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(TOTAL_SECONDS);

  // Derive canClose from countdown state
  const canClose = countdown <= 0;

  // Fetch campaign on mount
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch('/api/ads/campaigns?placement=tab_switch');
        if (res.ok) {
          const data = await res.json();
          if (data.campaign) {
            setCampaign(data.campaign);
            const impRes = await fetch('/api/ads/impression', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ campaignId: data.campaign.id, adType: 'interstitial', placement: 'tab_switch' }),
            });
            if (impRes.ok) {
              const impData = await impRes.json();
              setImpressionId(impData.id);
            }
          } else {
            // No campaign, allow closing immediately
            setCountdown(0);
          }
        }
      } catch (e) {
        console.error('Interstitial fetch error:', e);
        setCountdown(0);
      }
    };
    fetchCampaign();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (canClose) return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [canClose]);

  const handleClick = useCallback(async () => {
    if (impressionId) {
      try {
        await fetch('/api/ads/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ impressionId }),
        });
      } catch (e) { /* ignore */ }
    }
    if (campaign?.targetUrl) window.open(campaign.targetUrl, '_blank', 'noopener');
  }, [impressionId, campaign]);

  const handleClose = useCallback(() => {
    if (canClose) { onClose(); onReward?.(); }
  }, [canClose, onClose, onReward]);

  const progress = ((TOTAL_SECONDS - Math.max(0, countdown)) / TOTAL_SECONDS) * 100;
  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-md mx-4 bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        {campaign ? (
          <>
            <div className="bg-gradient-to-r from-[#1a2a3a] to-[#0d1720] p-6 text-center relative">
              {/* Countdown ring in top-right */}
              <div className="absolute top-4 right-4">
                <div className="relative w-11 h-11">
                  <svg className="w-11 h-11 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                    <circle
                      cx="24" cy="24" r="22" fill="none"
                      stroke={canClose ? '#00e5a0' : '#4fc3f7'}
                      strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={canClose ? 0 : strokeDashoffset}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {canClose ? (
                      <X className="w-4 h-4 text-[#00e5a0] cursor-pointer" onClick={handleClose} />
                    ) : (
                      <span className="text-[11px] font-bold font-mono text-[#4fc3f7]">{countdown}</span>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-[#00e5a0]/60">Sponsored</span>
              <h2 className="text-lg font-bold text-[#e8ecf4] mt-2">{campaign.title}</h2>
              <p className="text-sm text-[#8b95a8] mt-1">{campaign.subtitle}</p>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <button onClick={handleClick} className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#00e5a0] text-[#0c0e14] font-bold text-sm hover:bg-[#00d090] transition-all hover:scale-[1.02] active:scale-95">
                {campaign.ctaText || 'Learn More'} <ExternalLink className="w-4 h-4" />
              </button>
              <button onClick={handleClose} disabled={!canClose} className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8b95a8] hover:text-[#e8ecf4] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                {!canClose && <Timer className="w-3.5 h-3.5" />}
                {canClose ? 'Continue to MedQ →' : `Please wait ${countdown}s...`}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#00e5a0]/10 rounded-2xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-[#00e5a0]" />
            </div>
            <p className="text-[#e8ecf4] text-sm font-semibold mb-1">Preparing your content...</p>
            <p className="text-[#5a6478] text-xs mb-4">Free tier includes occasional sponsored content</p>
            {!canClose && (
              <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-3 overflow-hidden">
                <div className="h-full bg-[#4fc3f7] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
            )}
            <button onClick={handleClose} disabled={!canClose} className="px-6 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{ background: canClose ? '#00e5a0' : 'rgba(255,255,255,0.04)', color: canClose ? '#0c0e14' : '#5a6478' }}>
              {canClose ? 'Continue →' : `Please wait ${countdown}s...`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InterstitialAd({ open, onClose, onReward }: InterstitialAdProps) {
  if (!open) return null;

  // Key forces fresh mount each time the component is shown,
  // so inner state (countdown, campaign, etc.) is always fresh
  return <InterstitialAdInner key="interstitial" onClose={onClose} onReward={onReward} />;
}
