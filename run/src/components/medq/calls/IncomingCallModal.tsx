'use client';

/**
 * IncomingCallModal — the full-screen ringer shown anywhere in the app when
 * someone calls (the CallProvider listens app-wide, so this rings on the
 * dashboard, in study modules, on the messages page — everywhere).
 *
 * FaceTime/WhatsApp-style: pulsing avatar with concentric ripple rings,
 * caller name, call type, big round Accept (green) / Decline (red) buttons,
 * and a subtle countdown to the auto "missed" timeout.
 */

import { useEffect, useState } from 'react';
import { Phone, PhoneOff, Video, ShieldCheck, Volume2 } from 'lucide-react';
import { initialsOf, type IncomingCall } from './types';

const RING_TIMEOUT_SECONDS = 45;

export function IncomingCallModal({
  incoming,
  onAccept,
  onDecline,
}: {
  incoming: IncomingCall;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - incoming.receivedAt) / 1000)), 1000);
    return () => clearInterval(t);
  }, [incoming.receivedAt]);

  const remaining = Math.max(0, RING_TIMEOUT_SECONDS - elapsed);
  const pct = (remaining / RING_TIMEOUT_SECONDS) * 100;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(1200px 800px at 50% 20%, rgba(0,60,45,0.55), rgba(3,8,16,0.92) 70%)', backdropFilter: 'blur(10px)' }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="relative w-full max-w-sm rounded-3xl px-6 py-10 flex flex-col items-center text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(18,26,44,0.92), rgba(10,15,28,0.96))',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.65)',
        }}
      >
        {/* Caller identity */}
        <div className="relative flex items-center justify-center mb-6" style={{ width: 132, height: 132 }}>
          {/* Concentric ripple rings */}
          <span className="incoming-ring-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0,229,160,0.35)', animation: 'call-ripple 2.2s ease-out infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0,229,160,0.25)', animation: 'call-ripple 2.2s ease-out 0.7s infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0,229,160,0.15)', animation: 'call-ripple 2.2s ease-out 1.4s infinite' }} />
          <div
            className="flex items-center justify-center select-none"
            style={{
              width: 108,
              height: 108,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00e5a0 0%, #0a8f6b 100%)',
              color: '#04121a',
              fontSize: 34,
              fontWeight: 700,
              boxShadow: '0 12px 40px rgba(0,229,160,0.35)',
            }}
          >
            {initialsOf(incoming.callerName)}
          </div>
        </div>

        <h2 className="text-[22px] font-semibold text-[#e8ecf4] leading-tight max-w-full truncate">
          {incoming.callerName || 'Someone'}
        </h2>
        <p className="mt-1.5 text-[13px] text-[#8b94a8] flex items-center gap-1.5">
          {incoming.callType === 'video' ? <Video className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
          Incoming {incoming.callType} call
          <span className="incoming-dots" style={{ letterSpacing: 2, animation: 'incoming-pulse-dots 1.4s infinite' }} />
        </p>

        {/* Countdown ring */}
        <div className="mt-5 w-40 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-linear" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00e5a0, rgba(0,229,160,0.5))' }} />
        </div>
        <p className="mt-1.5 text-[10px] text-[#5a6478]">answering in {remaining}s</p>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-14">
          <button
            onClick={onDecline}
            className="group flex flex-col items-center gap-2 outline-none"
            aria-label="Decline call"
          >
            <span
              className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110 group-active:scale-95"
              style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #ff5757, #c62828)', boxShadow: '0 10px 30px rgba(255,87,87,0.4)' }}
            >
              <PhoneOff className="w-7 h-7 text-white" />
            </span>
            <span className="text-[11px] font-medium text-[#8b94a8]">Decline</span>
          </button>

          <button
            onClick={onAccept}
            className="group flex flex-col items-center gap-2 outline-none"
            aria-label="Accept call"
          >
            <span
              className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110 group-active:scale-95"
              style={{
                width: 72,
                height: 72,
                background: 'linear-gradient(135deg, #00e5a0, #00a37a)',
                boxShadow: '0 12px 36px rgba(0,229,160,0.5)',
                animation: 'incoming-accept-pulse 1.6s ease-in-out infinite',
              }}
            >
              {incoming.callType === 'video'
                ? <Video className="w-8 h-8 text-[#04121a]" />
                : <Phone className="w-8 h-8 text-[#04121a]" />}
            </span>
            <span className="text-[11px] font-medium text-[#00e5a0]">Accept</span>
          </button>
        </div>

        {/* Trust strip */}
        <div className="mt-8 flex items-center gap-4 text-[#5a6478]">
          <span className="flex items-center gap-1 text-[10px]"><ShieldCheck className="w-3 h-3" /> End-to-end option</span>
          <span className="flex items-center gap-1 text-[10px]"><Volume2 className="w-3 h-3" /> Ringing…</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes call-ripple {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes incoming-accept-pulse {
          0%, 100% { box-shadow: 0 12px 36px rgba(0,229,160,0.45); }
          50%      { box-shadow: 0 12px 52px rgba(0,229,160,0.8); }
        }
        @keyframes incoming-pulse-dots {
          0%, 20% { opacity: 0.2; }
          50%     { opacity: 1; }
          80%, 100% { opacity: 0.2; }
        }
      `}} />
    </div>
  );
}
