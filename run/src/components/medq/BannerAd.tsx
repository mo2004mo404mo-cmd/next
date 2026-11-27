'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

interface AdCampaign {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  adType: string;
  targetUrl: string;
  imageUrl: string;
}

interface BannerAdProps {
  placement: string;
  onImpression?: (id: string) => void;
}

export default function BannerAd({ placement, onImpression }: BannerAdProps) {
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [impressionId, setImpressionId] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`/api/ads/campaigns?placement=${placement}`);
        if (res.ok) {
          const data = await res.json();
          if (data.campaign) {
            setCampaign(data.campaign);
            // Track impression
            const impRes = await fetch('/api/ads/impression', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ campaignId: data.campaign.id, adType: data.campaign.adType, placement }),
            });
            if (impRes.ok) {
              const impData = await impRes.json();
              setImpressionId(impData.id);
              onImpression?.(impData.id);
            }
          }
        }
      } catch (e) {
        console.error('BannerAd fetch error:', e);
      }
    };
    fetchCampaign();
  }, [placement, onImpression]);

  const handleClick = useCallback(async () => {
    if (impressionId) {
      try {
        await fetch('/api/ads/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ impressionId }),
        });
      } catch (e) {
        console.error('Ad click track error:', e);
      }
    }
    if (campaign?.targetUrl) {
      window.open(campaign.targetUrl, '_blank', 'noopener');
    }
  }, [impressionId, campaign]);

  if (!campaign || dismissed) return null;

  const gradients: Record<string, string> = {
    dashboard_top: 'from-[#1a3a2a] to-[#0d1f17]',
    tab_bottom: 'from-[#1a2a3a] to-[#0d1720]',
    quiz_result: 'from-[#2a1a3a] to-[#170d20]',
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-r ${gradients[placement] || 'from-[#1a2a3a] to-[#0d1720]'} p-4`}>
      <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 text-white/30 hover:text-white/60 transition-colors" aria-label="Dismiss ad">
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-4">
        {campaign.imageUrl && (
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            width={96}
            height={64}
            unoptimized
            loading="lazy"
            className="h-12 w-16 flex-shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
            onError={(event) => { event.currentTarget.style.display = 'none'; }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#00e5a0]/60">Sponsored</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8ecf4] truncate">{campaign.title}</h3>
          <p className="text-xs text-[#8b95a8] mt-0.5 truncate">{campaign.subtitle}</p>
        </div>
        <button
          onClick={handleClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-xs font-bold hover:bg-[#00d090] transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          {campaign.ctaText || 'Learn More'}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
