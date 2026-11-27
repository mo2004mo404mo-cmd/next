'use client';

/**
 * GroupCallModal
 * --------------
 * Handles incoming group-call invitations relayed by the chat-service.
 *
 * When a user in a chat room clicks "Start Group Call", the chat-service
 * emits `group-call:incoming` to all room members. This component:
 *   - Listens for that event and shows an incoming-call banner
 *   - On Accept: opens the shared MiroTalk meeting (via onJoinCall callback)
 *   - On Decline: dismisses the banner
 *   - Auto-dismisses when the host cancels (group-call:cancelled)
 *
 * Also exposes a <StartGroupCallButton> for chat room UIs to start a
 * group call — it creates a MiroTalk meeting and emits the invite.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { io as socketIO, Socket } from 'socket.io-client';
import { chatSocketUrl } from '@/lib/chat-socket-url';
import { PhoneOff, Video, Users, X, Radio } from 'lucide-react';
import { toast } from 'sonner';

export interface IncomingGroupCall {
  roomId: string;
  meetingId: string;
  joinUrl: string;
  hostId: string;
  hostName: string;
  title: string;
}

export interface GroupCallModalProps {
  /** The room ID for the currently active chat (so we only show banners for this room). */
  roomId?: string | null;
  /** Current user ID — used to skip showing the banner to the host themselves. */
  userId?: string | null;
  /** Display name of the host (current user) — shown in the invite notification to others. */
  hostName?: string;
  /** Called when the user accepts — caller should navigate to meeting tab with meetingId. */
  onJoinCall: (call: IncomingGroupCall) => void;
  /** Optional: render a "Start Group Call" button somewhere in the parent. */
  children?: React.ReactNode;
  /** Extra classes appended to the StartGroupCallButton — e.g. "hidden sm:flex" to collapse it on mobile. */
  buttonClassName?: string;
}

export function useGroupCallSocket(roomId: string | null | undefined, userId: string | null | undefined) {
  const socketRef = useRef<Socket | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingGroupCall | null>(null);
  const [activeCallMeetingId, setActiveCallMeetingId] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketIO(chatSocketUrl(), {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 3000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      if (userId) socket.emit('identify', userId);
    });

    // Join the room so we receive group-call:incoming events
    if (roomId) {
      socket.emit('join:room', roomId);
    }

    socket.on('group-call:incoming', (data: IncomingGroupCall) => {
      // Skip our own broadcast — the host already has their meeting open
      if (data.hostId === userId) return;
      // Filter to current room if roomId prop is set
      if (roomId && data.roomId !== roomId) return;
      setIncomingCall(data);
    });

    socket.on('group-call:cancelled', (data: { roomId: string; meetingId: string }) => {
      setIncomingCall(prev => {
        if (prev && prev.meetingId === data.meetingId) return null;
        return prev;
      });
    });

    return () => {
      if (roomId) {
        try { socket.emit('leave:room', roomId); } catch {}
      }
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, userId]);

  /**
   * Host a group call — emits `group-call:invite` to the server, which
   * relays it to all room members. The host should also navigate to the
   * meeting tab on their own client.
   */
  const startGroupCall = useCallback((opts: {
    meetingId: string;
    joinUrl: string;
    title?: string;
    hostName: string;
  }) => {
    if (!socketRef.current || !roomId || !userId) return;
    socketRef.current.emit('group-call:invite', {
      roomId,
      meetingId: opts.meetingId,
      joinUrl: opts.joinUrl,
      hostId: userId,
      hostName: opts.hostName,
      title: opts.title || 'Group Study Call',
    });
    setActiveCallMeetingId(opts.meetingId);
  }, [roomId, userId]);

  /**
   * Cancel an outgoing group call (host cancelled before anyone joined).
   */
  const cancelGroupCall = useCallback(() => {
    if (!socketRef.current || !roomId || !activeCallMeetingId) return;
    socketRef.current.emit('group-call:cancel', {
      roomId,
      meetingId: activeCallMeetingId,
    });
    setActiveCallMeetingId(null);
  }, [roomId, activeCallMeetingId]);

  const acceptIncoming = useCallback(() => {
    setIncomingCall(prev => {
      if (prev) setActiveCallMeetingId(prev.meetingId);
      return null;
    });
  }, []);

  const declineIncoming = useCallback(() => {
    setIncomingCall(null);
  }, []);

  return {
    socketRef,
    incomingCall,
    activeCallMeetingId,
    startGroupCall,
    cancelGroupCall,
    acceptIncoming,
    declineIncoming,
  };
}

/**
 * Incoming-call banner — fixed at the top of the screen when an active
 * group-call:incoming event is in flight.
 */
export function IncomingGroupCallBanner({
  call,
  onAccept,
  onDecline,
}: {
  call: IncomingGroupCall;
  onAccept: () => void;
  onDecline: () => void;
}) {
  // Auto-dismiss after 30 seconds if no answer
  useEffect(() => {
    const t = setTimeout(() => onDecline(), 30000);
    return () => clearTimeout(t);
  }, [onDecline]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[400] slide-down">
      <div
        className="mx-4 mt-4 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3"
        style={{
          background: 'rgba(21,24,33,0.98)',
          border: '1px solid rgba(0,229,160,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center incoming-call-pulse"
          style={{ background: 'rgba(0,229,160,0.15)' }}
        >
          <Users className="w-6 h-6 text-[#00e5a0]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#e8ecf4]">Incoming Group Call</p>
          <p className="text-xs text-[#8b95a8] truncate">
            {call.hostName} invited you to &quot;{call.title}&quot;
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDecline}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ background: 'rgba(255,87,87,0.2)', border: '1px solid rgba(255,87,87,0.3)' }}
            title="Decline"
          >
            <PhoneOff className="w-4 h-4 text-[#ff5757]" />
          </button>
          <button
            onClick={onAccept}
            className="px-4 h-10 rounded-full flex items-center gap-2 transition-all hover:scale-105 font-semibold text-xs"
            style={{ background: 'rgba(0,229,160,0.2)', border: '1px solid rgba(0,229,160,0.3)', color: '#00e5a0' }}
            title="Join Call"
          >
            <Video className="w-4 h-4" />
            Join Call
          </button>
        </div>
        <button
          onClick={onDecline}
          className="p-1 rounded text-[#5a6478] hover:text-[#e8ecf4]"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <style jsx>{`
        @keyframes incomingCallPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.5); }
          50% { box-shadow: 0 0 0 12px rgba(0,229,160,0); }
        }
        .incoming-call-pulse { animation: incomingCallPulse 1.5s ease-in-out infinite; }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-down { animation: slideDown 0.25s ease-out; }
      `}</style>
    </div>
  );
}

/**
 * "Start Group Call" button — for embedding in chat room headers.
 * Generates a meeting ID locally and emits group-call:invite.
 */
export function StartGroupCallButton({
  onStart,
  disabled,
  size = 'md',
  buttonClassName = '',
}: {
  onStart: (meetingId: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Extra classes appended to the button — e.g. "hidden sm:flex" to collapse it on mobile. */
  buttonClassName?: string;
}) {
  // We don't actually need a socket here — the parent owns the socket and
  // calls startGroupCall(). This button just generates a meeting ID and
  // calls onStart, which the parent wires to startGroupCall + navigation.
  const handleClick = useCallback(() => {
    // Generate a meeting code in the same format MeetingTab uses
    // (3 groups of 4 chars from a 32-char alphabet)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < 3; i++) {
      if (i > 0) id += '-';
      for (let j = 0; j < 4; j++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    onStart(id);
  }, [onStart]);

  const sizeCls = size === 'sm' ? 'px-2.5 py-1.5 text-[10px]' : 'px-3 py-2 text-xs';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${sizeCls} rounded-lg flex items-center gap-1.5 font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
      style={{
        background: 'rgba(0,229,160,0.1)',
        color: '#00e5a0',
        border: '1px solid rgba(0,229,160,0.2)',
      }}
      title="Start a group video call"
    >
      <Radio className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      Group Call
    </button>
  );
}

/**
 * Full group-call controller — combines the socket, banner, and button.
 * Parent component renders this inside the chat UI.
 *
 * Default export is named `GroupCallLauncher` for clarity when imported.
 */
function GroupCallLauncher({
  roomId,
  userId,
  hostName,
  onJoinCall,
  buttonClassName,
}: GroupCallModalProps) {
  const {
    incomingCall,
    startGroupCall,
    acceptIncoming,
    declineIncoming,
  } = useGroupCallSocket(roomId, userId);

  const handleStart = useCallback(async (meetingId: string) => {
    if (!roomId) return;
    let response: Response;
    try {
      response = await fetch('/api/chat/mirotalk-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId || '' },
        body: JSON.stringify({ roomId, callType: 'video' }),
      });
    } catch {
      toast.error('Network error — could not create the meeting room.');
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok || typeof data.joinUrl !== 'string') {
      toast.error(data.error || 'Could not create the MiroTalk meeting room.');
      return;
    }
    const joinUrl = data.joinUrl as string;
    startGroupCall({
      meetingId,
      joinUrl,
      title: 'Group Study Call',
      hostName: hostName || 'Host',
    });
    // Host joins their own meeting immediately
    onJoinCall({
      roomId: roomId || '',
      meetingId,
      joinUrl,
      hostId: userId || '',
      hostName: hostName || 'You',
      title: 'Group Study Call',
    });
  }, [startGroupCall, onJoinCall, roomId, userId, hostName]);

  const handleAccept = useCallback(() => {
    if (!incomingCall) return;
    acceptIncoming();
    onJoinCall(incomingCall);
  }, [incomingCall, acceptIncoming, onJoinCall]);

  return (
    <>
      {incomingCall && (
        <IncomingGroupCallBanner
          call={incomingCall}
          onAccept={handleAccept}
          onDecline={declineIncoming}
        />
      )}
      <StartGroupCallButton onStart={handleStart} buttonClassName={buttonClassName} />
    </>
  );
}

export default GroupCallLauncher;

