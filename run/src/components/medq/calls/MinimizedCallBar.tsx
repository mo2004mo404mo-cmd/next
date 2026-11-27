'use client';

/**
 * MinimizedCallBar — the floating pill shown when a call is minimized so the
 * user can keep browsing/using the app while on the call (like WhatsApp /
 * Meet picture-in-picture). Shows peer, live timer and phase, plus expand
 * (back to full call UI) and end buttons.
 */

import { useEffect, useState } from 'react';
import { Maximize2, PhoneOff, Video, Phone } from 'lucide-react';
import { formatCallDuration, initialsOf, type ActiveCall } from './types';

export function MinimizedCallBar({
  call,
  onExpand,
  onEnd,
}: {
  call: ActiveCall;
  onExpand: () => void;
  onEnd: () => void;
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const reference = call.connectedAt ?? call.startedAt;
  const duration = call.phase === 'connected' ? Math.floor((now - reference) / 1000) : 0;
  const ringing = call.phase === 'ringing' || call.phase === 'connecting';

  return (
    <div
      className="fixed z-[290] flex items-center gap-3 rounded-full pl-3 pr-2 py-2 select-none"
      style={{
        right: 20,
        bottom: 20,
        background: 'linear-gradient(135deg, rgba(16,22,38,0.97), rgba(10,15,28,0.97))',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Avatar + live dot */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: 34, height: 34 }}>
        <div
          className="flex items-center justify-center font-bold"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00e5a0, #0a8f6b)',
            color: '#04121a',
            fontSize: 12,
          }}
        >
          {initialsOf(call.peerName)}
        </div>
        <span
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            right: -1,
            bottom: -1,
            background: ringing ? '#ffb020' : '#00e5a0',
            border: '2px solid #0a0f1c',
            animation: ringing ? 'minimized-pulse 1.2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* Peer + status/timer */}
      <div className="min-w-0" style={{ maxWidth: 160 }}>
        <p className="text-[12px] font-semibold text-[#e8ecf4] truncate leading-tight">
          {call.peerName || call.roomName || 'Call'}
        </p>
        <p className="text-[10px] leading-tight flex items-center gap-1" style={{ color: ringing ? '#ffb020' : '#00e5a0' }}>
          {call.callType === 'video' ? <Video className="w-2.5 h-2.5" /> : <Phone className="w-2.5 h-2.5" />}
          {call.phase === 'connected'
            ? formatCallDuration(duration)
            : call.phase === 'ringing'
              ? (call.role === 'caller' ? 'Ringing…' : 'Incoming…')
              : 'Connecting…'}
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={onExpand}
        className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
        style={{ width: 32, height: 32, color: '#e8ecf4' }}
        title="Back to call"
        aria-label="Back to call"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
      <button
        onClick={onEnd}
        className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
        style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #ff5757, #c62828)', color: 'white' }}
        title="End call"
        aria-label="End call"
      >
        <PhoneOff className="w-4 h-4" />
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes minimized-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}} />
    </div>
  );
}
