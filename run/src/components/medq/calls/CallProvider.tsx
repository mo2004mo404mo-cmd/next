'use client';

/**
 * CallProvider — the app-wide call orchestrator.
 *
 * Mounted once in the root layout (inside SessionProvider) so it survives ALL
 * navigation. This is what makes calls work "from anywhere":
 *
 *   • A single socket.io connection to the chat service is kept alive for the
 *     whole session and joins every chat room the user belongs to — so a
 *     `call:invite` rings whether the user is on the dashboard, studying, or
 *     in the messages tab.
 *   • Incoming calls ring with a full-screen modal + synthesized ring tone +
 *     document.title flashing + a browser Notification when the tab is hidden.
 *     Users without a connected socket additionally get a web push from the
 *     server (see /api/chat/call-notify) — that covers "app closed".
 *   • The active call renders in a global MiroTalk overlay that survives
 *     route changes, and can be MINIMIZED to a floating pill so the user can
 *     keep using the app mid-call.
 *
 * Call lifecycle events (all routed via the chat socket service):
 *   call:invite  room      → callee starts ringing
 *   call:accept  targeted  → caller stops ringback, shows "connecting"
 *   call:decline targeted  → caller shows "declined" (callee logs the message)
 *   call:busy    targeted  → caller shows "busy"
 *   call:cancel  room      → callee stops ringing (caller hung up first)
 *   call:hangup  room      → both sides close (the side that ends logs it)
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import type { Socket } from 'socket.io-client';
import { io as socketIO } from 'socket.io-client';
import { chatSocketUrl, chatEmitUrl } from '@/lib/chat-socket-url';
import { PhoneCall, PhoneOff, XCircle, Clock, UserX, AlertTriangle } from 'lucide-react';
import {
  startIncomingRing,
  startRingback,
  playConnectTone,
  playEndTone,
  playBusyTone,
  primeCallAudio,
} from './call-sounds';
import { IncomingCallModal } from './IncomingCallModal';
import { MinimizedCallBar } from './MinimizedCallBar';
import type {
  ActiveCall,
  CallContextValue,
  CallEndReason,
  CallType,
  IncomingCall,
  StartCallOptions,
} from './types';

const MiroTalkCallLazy = dynamic(() => import('@/components/medq/MiroTalkCall'), { ssr: false });
const CallOverlayBoundary = dynamic(() => import('@/components/medq/CallOverlayBoundary'), { ssr: false });

/** Demo-user resolution mirrors the messages page (same cache key, same API)
 * so guests ring under the SAME identity the chat rooms use. */
const DEMO_USER_CACHE_KEY = 'medq-demo-user-v2';

interface DemoUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

/** Callee-side: how long the incoming call rings before "missed". */
const RING_TIMEOUT_MS = 45_000;
/** Caller-side: how long to wait before giving up (callee timeout + grace). */
const DIAL_TIMEOUT_MS = 60_000;
/** How long the terminal splash ("Call ended" etc.) stays up. */
const SPLASH_MS = 2800;

const CallContext = createContext<CallContextValue | null>(null);

export function useCall(): CallContextValue {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCall must be used inside <CallProvider>');
  return ctx;
}

interface CallInvitePayload {
  roomId?: string;
  joinUrl?: string;
  callerUserId?: string;
  callerName?: string;
  callType?: CallType;
}

interface CallLifecyclePayload {
  roomId?: string;
  joinUrl?: string;
  targetUserId?: string;
  fromUserId?: string;
  reason?: string;
}

export function CallProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const authUserId = status === 'authenticated' ? session?.user?.id : undefined;

  // Demo-user fallback (guest mode): the messages page resolves chat identity
  // the same way, so calls and chat share one identity per browser.
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  useEffect(() => {
    if (authUserId || status === 'loading') return;
    let cancelled = false;
    try {
      const stored = localStorage.getItem(DEMO_USER_CACHE_KEY);
      if (stored) setDemoUser(JSON.parse(stored) as DemoUser);
    } catch { /* corrupted cache — refetch */ }
    fetch('/api/chat/demo-user')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.user) {
          setDemoUser(data.user as DemoUser);
          try { localStorage.setItem(DEMO_USER_CACHE_KEY, JSON.stringify(data.user)); } catch { /* storage full */ }
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [authUserId, status]);

  const userId = authUserId ?? demoUser?.id;
  const userName = session?.user?.name ?? demoUser?.name ?? undefined;

  const [incoming, setIncoming] = useState<IncomingCall | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [minimized, setMinimized] = useState(false);

  /* ── Call state sync: server is the source of truth ────────────────────
   * Instead of persisting call state to localStorage (client-side guessing
   * that can get out of sync), the chat service maintains a server-side
   * active-call registry. On socket connect, the client emits `call:sync`
   * and the server responds with the active call (if any). This handles
   * page refresh correctly: the server knows the call is still live, tells
   * the reconnecting client, and the client restores the call UI + rejoins
   * the MiroTalk room.
   *
   * On `beforeunload` (refresh/close), we send a `call:hangup` via
   * `navigator.sendBeacon` so the peer is notified immediately — the
   * server's 30-second disconnect grace timer is a fallback, not the
   * primary cleanup path. */

  // Refs so socket listeners (registered once) always see fresh state.
  const incomingRef = useRef<IncomingCall | null>(null);
  const activeCallRef = useRef<ActiveCall | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const ringLoopRef = useRef<{ stop: () => void } | null>(null);
  const ringbackRef = useRef<{ stop: () => void } | null>(null);
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const splashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleFlashRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalTitleRef = useRef<string | null>(null);
  const joinedRoomsRef = useRef<Set<string>>(new Set());
  /** RoomId of a call owned by ANOTHER tab of this browser (cross-tab guard). */
  const activeCallBlockedRef = useRef<string | null>(null);

  incomingRef.current = incoming;
  activeCallRef.current = activeCall;

  /* ── Helpers ──────────────────────────────────────────────────────────── */

  const stopRing = useCallback(() => {
    ringLoopRef.current?.stop();
    ringLoopRef.current = null;
    if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
    ringTimeoutRef.current = null;
  }, []);

  const stopRingback = useCallback(() => {
    ringbackRef.current?.stop();
    ringbackRef.current = null;
    if (dialTimeoutRef.current) clearTimeout(dialTimeoutRef.current);
    dialTimeoutRef.current = null;
  }, []);

  const stopTitleFlash = useCallback(() => {
    if (titleFlashRef.current) clearInterval(titleFlashRef.current);
    titleFlashRef.current = null;
    if (originalTitleRef.current !== null && typeof document !== 'undefined') {
      document.title = originalTitleRef.current;
    }
    originalTitleRef.current = null;
  }, []);

  const flashTitle = useCallback((message: string) => {
    if (typeof document === 'undefined') return;
    if (originalTitleRef.current === null) originalTitleRef.current = document.title;
    if (titleFlashRef.current) return;
    let on = false;
    titleFlashRef.current = setInterval(() => {
      on = !on;
      document.title = on ? message : (originalTitleRef.current || 'MedQ');
    }, 1000);
  }, []);

  /** Fire-and-forget chat-message log (call history rows). */
  const logCallMessage = useCallback(
    (roomId: string, callType: CallType, durationSec: number, callStatus: 'completed' | 'missed' | 'declined') => {
      if (!userId) return;
      const missed = callStatus !== 'completed';
      void fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          roomId,
          content: `${missed ? 'Missed ' : ''}${callType === 'video' ? 'Video' : 'Voice'} Call`,
          type: 'call',
          metadata: JSON.stringify({ callType, duration: Math.round(durationSec), status: callStatus }),
        }),
      }).catch(() => {});
    },
    [userId],
  );

  /** Broadcast a room-scoped lifecycle event through the chat service. */
  const emitRoomEvent = useCallback((event: string, roomId: string, data: Record<string, unknown>) => {
    void fetch(chatEmitUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, room: roomId, data: { roomId, ...data } }),
    }).catch(() => {});
  }, []);

  const emitTargeted = useCallback((event: string, targetUserId: string, data: Record<string, unknown>) => {
    socketRef.current?.emit(event, { targetUserId, ...data });
  }, []);

  /** Move to the terminal splash, then clear the session. */
  const finishCall = useCallback(
    (reason: CallEndReason, opts: { log?: { roomId: string; callType: CallType; durationSec: number; status: 'completed' | 'missed' } } = {}) => {
      const current = activeCallRef.current;
      stopRingback();
      stopTitleFlash();
      if (opts.log) logCallMessage(opts.log.roomId, opts.log.callType, opts.log.durationSec, opts.log.status);
      // Tell this browser's other tabs the call is over (unblocks them).
      if (current) broadcastCallEvent({ type: 'call-ended', roomId: current.roomId });
      setActiveCall(current ? { ...current, phase: 'ended', endReason: reason } : null);
      if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
      splashTimeoutRef.current = setTimeout(() => {
        setActiveCall(null);
        setMinimized(false);
      }, SPLASH_MS);
    },
    // broadcastCallEvent is defined below in the same render scope and is
    // stable — referenced via closure, deliberately omitted from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logCallMessage, stopRingback, stopTitleFlash],
  );

  /* ── Incoming call management ─────────────────────────────────────────── */

  const declineIncoming = useCallback(
    (status: 'declined' | 'missed') => {
      const inc = incomingRef.current;
      if (!inc) return;
      stopRing();
      stopTitleFlash();
      setIncoming(null);
      incomingRef.current = null;
      // Silence the ring in this browser's other tabs.
      broadcastCallEvent({ type: 'incoming-handled', roomId: inc.roomId });
      // Tell the caller what happened: a decline is its own event (they see
      // "Call declined"), while a ring-timeout is a hangup with reason
      // "missed" (they see "No answer"). roomId lets the socket service stop
      // the pending invite for late joiners.
      if (status === 'declined') {
        emitTargeted('call:decline', inc.callerUserId, { fromUserId: userId, roomId: inc.roomId });
      } else {
        emitTargeted('call:hangup', inc.callerUserId, { fromUserId: userId, roomId: inc.roomId, reason: 'missed' });
      }
      logCallMessage(inc.roomId, inc.callType, 0, status);
      if (status === 'declined') playEndTone();
    },
    [emitTargeted, logCallMessage, stopRing, stopTitleFlash, userId],
  );

  const startIncoming = useCallback(
    (data: CallInvitePayload) => {
      if (!userId || !data.roomId || !data.callerUserId) return;
      if (!data.joinUrl) {
        emitTargeted('call:busy', data.callerUserId, { roomId: data.roomId });
        return;
      }

      const inc: IncomingCall = {
        roomId: data.roomId,
        joinUrl: data.joinUrl,
        callerUserId: data.callerUserId,
        callerName: data.callerName || 'Someone',
        callType: data.callType === 'video' ? 'video' : 'voice',
        receivedAt: Date.now(),
      };

      // Already busy? Politely bounce the new caller.
      if (activeCallRef.current || incomingRef.current) {
        emitTargeted('call:busy', inc.callerUserId, { roomId: inc.roomId });
        return;
      }

      setIncoming(inc);
      incomingRef.current = inc;
      ringLoopRef.current = startIncomingRing();
      flashTitle(`📞 ${inc.callerName} is calling — MedQ`);

      // System notification when the tab is hidden (permission already granted).
      try {
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
          const n = new Notification(`Incoming ${inc.callType} call`, {
            body: `${inc.callerName} is calling you on MedQ`,
            tag: `medq-call:${inc.roomId}`,
            icon: '/icons/icon-192.png',
          });
          n.onclick = () => {
            window.focus();
            n.close();
          };
        }
      } catch {
        // Notification constructor unavailable — visual ring continues.
      }

      // Ring timeout → missed call.
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = setTimeout(() => {
        if (incomingRef.current?.roomId === inc.roomId) declineIncoming('missed');
      }, RING_TIMEOUT_MS);
    },
    [declineIncoming, emitTargeted, flashTitle, userId],
  );

  const acceptIncoming = useCallback(() => {
    const inc = incomingRef.current;
    if (!inc || !userId) return;
    stopRing();
    stopTitleFlash();
    setIncoming(null);
    incomingRef.current = null;
    // Silence the ring in this browser's other tabs.
    broadcastCallEvent({ type: 'incoming-handled', roomId: inc.roomId });
    emitTargeted('call:accept', inc.callerUserId, {
      fromUserId: userId,
      roomId: inc.roomId,
      joinUrl: inc.joinUrl,
    });
    setActiveCall({
      roomId: inc.roomId,
      joinUrl: inc.joinUrl,
      callType: inc.callType,
      role: 'callee',
      peerId: inc.callerUserId,
      peerName: inc.callerName,
      phase: 'connecting',
      startedAt: Date.now(),
    });
    setMinimized(false);
  }, [emitTargeted, stopRing, stopTitleFlash, userId]);

  /* ── Outgoing calls ───────────────────────────────────────────────────── */

  const startCall = useCallback(
    (opts: StartCallOptions) => {
      if (!userId) return;
      if (activeCallRef.current) return; // one call at a time
      if (activeCallBlockedRef.current && activeCallBlockedRef.current !== opts.roomId) {
        return; // another tab of this browser is already in a call
      }
      if (incomingRef.current) declineIncoming('declined'); // clear a pending ring
      primeCallAudio();
      broadcastCallEvent({ type: 'call-active', roomId: opts.roomId });

      setActiveCall({
        roomId: opts.roomId,
        roomName: opts.roomName,
        callType: opts.callType,
        role: 'caller',
        peerId: opts.peerId,
        peerName: opts.peerName,
        phase: 'ringing',
        startedAt: Date.now(),
      });
      setMinimized(false);
      ringbackRef.current = startRingback();

      // Ring everyone: in-app sockets + pending-invite replay + web push for
      // members not connected to the app at all.
      void (async () => {
        try {
          const response = await fetch('/api/chat/call-notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
            body: JSON.stringify({ roomId: opts.roomId, callType: opts.callType, callerName: userName }),
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || typeof data.joinUrl !== 'string') {
            throw new Error(data.error || 'Could not create the meeting room.');
          }
          const current = activeCallRef.current;
          if (current?.roomId === opts.roomId && current.phase !== 'ended') {
            setActiveCall({ ...current, joinUrl: data.joinUrl });
          } else {
            emitRoomEvent('call:cancel', opts.roomId, { fromUserId: userId });
          }
        } catch {
          const current = activeCallRef.current;
          if (current?.roomId === opts.roomId && current.phase !== 'ended') {
            finishCall('failed');
          }
        }
      })();

      // Dial timeout → "no answer". The callee logs its own missed row when
      // reachable; this fires only when the callee is unreachable.
      if (dialTimeoutRef.current) clearTimeout(dialTimeoutRef.current);
      dialTimeoutRef.current = setTimeout(() => {
        const cur = activeCallRef.current;
        if (cur && cur.roomId === opts.roomId && cur.phase === 'ringing') {
          logCallMessage(opts.roomId, opts.callType, 0, 'missed');
          finishCall('no-answer');
        }
      }, DIAL_TIMEOUT_MS);
    },
    [declineIncoming, emitRoomEvent, finishCall, logCallMessage, userId, userName],
  );

  const endActiveCall = useCallback(() => {
    const cur = activeCallRef.current;
    if (!cur) return;
    if (cur.phase === 'ended') return;

    const wasConnected = cur.phase === 'connected' || cur.connectedAt !== undefined;
    const durationSec = cur.connectedAt ? (Date.now() - cur.connectedAt) / 1000 : 0;

    if (cur.role === 'caller' && cur.phase === 'ringing') {
      // Caller gave up before anyone answered → cancel the ring everywhere.
      if (cur.peerId) emitTargeted('call:cancel', cur.peerId, { fromUserId: userId, roomId: cur.roomId });
      emitRoomEvent('call:cancel', cur.roomId, { fromUserId: userId });
      finishCall('completed');
      playEndTone();
      return;
    }

    // Normal end: tell the room, log the completed call from this side only.
    emitRoomEvent('call:hangup', cur.roomId, { fromUserId: userId, reason: 'completed' });
    finishCall('completed', {
      log: {
        roomId: cur.roomId,
        callType: cur.callType,
        durationSec,
        status: 'completed',
      },
    });
    playEndTone();
  }, [emitRoomEvent, emitTargeted, finishCall, userId]);

  const toggleMinimize = useCallback(() => setMinimized((v) => !v), []);

  /* ── MiroTalk call callbacks ──────────────────────────────────────────── */

  const handleConnected = useCallback(() => {
    setActiveCall((cur) => {
      if (!cur || cur.phase === 'connected' || cur.phase === 'ended') return cur;
      return { ...cur, phase: 'connected', connectedAt: cur.connectedAt ?? Date.now() };
    });
  }, []);

  /* ── Socket lifecycle (one connection for the whole app) ──────────────── */

  useEffect(() => {
    if (!userId) return;

    const socket = socketIO(chatSocketUrl(), {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 3000,
    });
    socketRef.current = socket;

    const identifyAndJoin = async () => {
      socket.emit('identify', userId);
      // Ask the server if we have an active call (survives page refresh).
      // The server responds via `call:sync-response` (handler below).
      socket.emit('call:sync');
      joinedRoomsRef.current = new Set();
      try {
        const res = await fetch('/api/chat/rooms', { headers: { 'x-user-id': userId } });
        if (res.ok) {
          const data = (await res.json()) as { rooms?: Array<{ id: string }> };
          for (const room of data.rooms ?? []) {
            if (room?.id && !joinedRoomsRef.current.has(room.id)) {
              joinedRoomsRef.current.add(room.id);
              socket.emit('join:room', room.id);
            }
          }
        }
      } catch {
        // Rooms will be re-joined on the next reconnect.
      }
    };

    socket.on('connect', () => void identifyAndJoin());

    // ── Server-side call sync: on (re)connect, ask the server if we have
    //    an active call. The server is the source of truth — it tracks
    //    call state in its activeCalls registry, surviving our refresh.
    socket.on('call:sync-response', (data: { roomId: string; joinUrl: string; callType: CallType; peerId?: string; peerName?: string; role: 'caller' | 'callee'; startedAt: number } | null) => {
      // Only restore if we don't already have an active call (avoid
      // clobbering a call we just started in this tab).
      if (activeCallRef.current) return;
      if (!data?.roomId) return;
      if (typeof data.joinUrl !== 'string') return;
      setActiveCall({
        roomId: data.roomId,
        joinUrl: data.joinUrl,
        callType: data.callType,
        role: data.role,
        peerId: data.peerId,
        peerName: data.peerName,
        phase: 'connecting',
        startedAt: data.startedAt,
      });
    });

    socket.on('call:invite', (data: CallInvitePayload) => {
      if (!data?.roomId || data.callerUserId === userId) return;
      startIncoming(data);
    });

    socket.on('call:accept', (data: CallLifecyclePayload) => {
      const cur = activeCallRef.current;
      if (cur && cur.role === 'caller' && data.roomId === cur.roomId && cur.phase === 'ringing') {
        stopRingback();
        setActiveCall({
          ...cur,
          joinUrl: typeof data.joinUrl === 'string' ? data.joinUrl : cur.joinUrl,
          phase: 'connecting',
        });
      }
    });

    socket.on('call:decline', (data: CallLifecyclePayload) => {
      const cur = activeCallRef.current;
      if (cur && data.roomId === cur.roomId && cur.phase !== 'ended' && !cur.connectedAt) {
        playBusyTone();
        finishCall('declined');
      }
    });

    socket.on('call:busy', (data: CallLifecyclePayload) => {
      const cur = activeCallRef.current;
      if (cur && data.roomId === cur.roomId && cur.phase === 'ringing') {
        playBusyTone();
        finishCall('busy');
      }
    });

    socket.on('call:cancel', (data: CallLifecyclePayload) => {
      // Caller gave up before we answered.
      const inc = incomingRef.current;
      if (inc && data.roomId === inc.roomId) {
        stopRing();
        stopTitleFlash();
        setIncoming(null);
        incomingRef.current = null;
        playEndTone();
        try {
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
            const n = new Notification('Missed call', { body: `${inc.callerName} called you on MedQ`, tag: `medq-missed:${inc.roomId}`, icon: '/icons/icon-192.png' });
            n.onclick = () => { window.focus(); n.close(); };
          }
        } catch { /* visual only */ }
      }
    });

    socket.on('call:hangup', (data: CallLifecyclePayload) => {
      const cur = activeCallRef.current;
      if (cur && data.roomId === cur.roomId && cur.phase !== 'ended') {
        const reason: CallEndReason = data.reason === 'missed' ? 'no-answer' : 'completed';
        // The side that hung up logs the call — never double-log.
        playEndTone();
        finishCall(reason);
      }
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      joinedRoomsRef.current = new Set();
    };
  }, [userId, finishCall, startIncoming, stopRing, stopRingback, stopTitleFlash]);

  /* ── Cross-tab dedup (BroadcastChannel) ────────────────────────────────
     The incoming-call modal rings in EVERY tab of the user's browser (each
     tab's provider has its own socket). Answering in one tab must silence the
     others — otherwise the stragglers time out at 45 s and would post a
     bogus "missed call" message while the call is actually running. */

  const callChannelRef = useRef<BroadcastChannel | null>(null);

  const broadcastCallEvent = useCallback((message: Record<string, unknown>) => {
    try {
      callChannelRef.current?.postMessage(message);
    } catch {
      // Channel closed — single-tab scenario.
    }
  }, []);

  const openMeeting = useCallback((opts: { roomId: string; roomName: string; joinUrl: string }) => {
    if (!userId || activeCallRef.current) return;
    if (activeCallBlockedRef.current && activeCallBlockedRef.current !== opts.roomId) return;
    primeCallAudio();
    broadcastCallEvent({ type: 'call-active', roomId: opts.roomId });
    setActiveCall({
      roomId: opts.roomId,
      roomName: opts.roomName,
      joinUrl: opts.joinUrl,
      callType: 'video',
      role: 'caller',
      phase: 'connecting',
      startedAt: Date.now(),
    });
    setMinimized(false);
  }, [broadcastCallEvent, userId]);

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const bc = new BroadcastChannel('medq-calls');
    callChannelRef.current = bc;
    bc.onmessage = (ev: MessageEvent) => {
      const msg = ev.data as { type?: string; roomId?: string } | null;
      if (!msg?.type || !msg.roomId) return;
      if (msg.type === 'incoming-handled') {
        // Another tab accepted/declined this invite — silence our ring.
        const inc = incomingRef.current;
        if (inc && inc.roomId === msg.roomId) {
          stopRing();
          stopTitleFlash();
          setIncoming(null);
          incomingRef.current = null;
        }
      } else if (msg.type === 'call-active') {
        // Another tab already owns a call session — don't start a second one.
        if (!activeCallRef.current) activeCallBlockedRef.current = msg.roomId;
      } else if (msg.type === 'call-ended') {
        if (activeCallBlockedRef.current === msg.roomId) activeCallBlockedRef.current = null;
      }
    };
    return () => {
      bc.close();
      callChannelRef.current = null;
    };
  }, [stopRing, stopTitleFlash]);

  /* ── Cleanup on unmount ───────────────────────────────────────────────── */

  useEffect(() => {
    return () => {
      stopRing();
      stopRingback();
      stopTitleFlash();
      if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
    };
  }, [stopRing, stopRingback, stopTitleFlash]);

  /* ── beforeunload: immediate hangup notification ───────────────────────
   * On page refresh / tab close, send a `call:hangup` via sendBeacon so
   * the peer is notified immediately (the server's 30s disconnect grace
   * timer is the fallback if sendBeacon fails). sendBeacon completes
   * during page unload, unlike fetch which gets cancelled. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleBeforeUnload = () => {
      const cur = activeCallRef.current;
      if (!cur || cur.phase === 'ended') return;
      if (!userId) return;
      const blob = new Blob([JSON.stringify({
        event: 'call:hangup',
        room: cur.roomId,
        data: { roomId: cur.roomId, fromUserId: userId, reason: 'completed' },
      })], { type: 'application/json' });
      try { navigator.sendBeacon(chatEmitUrl(), blob); } catch { /* offline */ }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userId]);

  const value = useMemo<CallContextValue>(
    () => ({
      activeCall,
      incoming,
      minimized,
      inCall: activeCall !== null,
      startCall,
      openMeeting,
      acceptIncoming,
      declineIncoming: () => declineIncoming('declined'),
      endActiveCall,
      toggleMinimize,
    }),
    [acceptIncoming, activeCall, declineIncoming, endActiveCall, incoming, minimized, openMeeting, startCall, toggleMinimize],
  );

  /* ── Render: children + global call surfaces ──────────────────────────── */

  return (
    <CallContext.Provider value={value}>
      {children}

      {incoming && (
        <IncomingCallModal
          key={`${incoming.roomId}:${incoming.receivedAt}`}
          incoming={incoming}
          onAccept={acceptIncoming}
          onDecline={() => declineIncoming('declined')}
        />
      )}

      {activeCall && activeCall.phase !== 'ended' && (
        <div style={minimized ? { display: 'none' } : undefined} aria-hidden={minimized}>
          <CallOverlayBoundary
            resetKey={`${activeCall.roomId}:${activeCall.callType}:${activeCall.role}`}
            onFallbackClose={endActiveCall}
          >
            <MiroTalkCallLazy
              roomId={activeCall.roomId}
              url={activeCall.joinUrl}
              userName={userName ?? undefined}
              callType={activeCall.callType}
              role={activeCall.role}
              peerName={activeCall.peerName}
              onConnected={handleConnected}
              onMinimize={() => setMinimized(true)}
              onEnd={endActiveCall}
            />
          </CallOverlayBoundary>
        </div>
      )}

      {activeCall && minimized && activeCall.phase !== 'ended' && (
        <MinimizedCallBar call={activeCall} onExpand={() => setMinimized(false)} onEnd={endActiveCall} />
      )}

      {activeCall?.phase === 'ended' && <EndedSplash reason={activeCall.endReason} />}
    </CallContext.Provider>
  );
}

/* ── Terminal splash ──────────────────────────────────────────────────── */

function reasonCopy(reason: CallEndReason | undefined): { icon: React.ReactNode; title: string; subtitle: string } {
  switch (reason) {
    case 'declined':
      return { icon: <PhoneOff className="w-10 h-10" />, title: 'Call declined', subtitle: 'The person you called was unavailable.' };
    case 'no-answer':
      return { icon: <Clock className="w-10 h-10" />, title: 'No answer', subtitle: 'Nobody picked up within the ring window.' };
    case 'busy':
      return { icon: <UserX className="w-10 h-10" />, title: 'Person is busy', subtitle: 'They are already on another call.' };
    case 'failed':
      return { icon: <AlertTriangle className="w-10 h-10" />, title: 'Call failed', subtitle: 'The connection could not be established.' };
    default:
      return { icon: <PhoneCall className="w-10 h-10" />, title: 'Call ended', subtitle: 'Thanks for using MedQ calls.' };
  }
}

function EndedSplash({ reason }: { reason: CallEndReason | undefined }) {
  const copy = reasonCopy(reason);
  const isNegative = reason === 'declined' || reason === 'no-answer' || reason === 'busy' || reason === 'failed';
  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: 'rgba(3,8,16,0.88)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex flex-col items-center text-center px-8" style={{ animation: 'ended-splash-in 0.35s ease-out' }}>
        <div
          className="flex items-center justify-center rounded-full mb-5"
          style={{
            width: 84,
            height: 84,
            background: isNegative ? 'rgba(255,87,87,0.12)' : 'rgba(0,229,160,0.12)',
            color: isNegative ? '#ff5757' : '#00e5a0',
          }}
        >
          {copy.icon ?? <XCircle className="w-10 h-10" />}
        </div>
        <h2 className="text-xl font-semibold text-[#e8ecf4]">{copy.title}</h2>
        <p className="mt-1 text-[13px] text-[#8b94a8]">{copy.subtitle}</p>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ended-splash-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
