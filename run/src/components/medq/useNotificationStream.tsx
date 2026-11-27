'use client';

/**
 * useNotificationStream — subscribes to the real-time notification SSE
 * endpoint and exposes the latest unread count + a stream of new
 * notifications as they arrive.
 *
 * Usage:
 *   const { unreadCount, lastNotification } = useNotificationStream({ enabled: isAuthenticated });
 *
 * The hook opens ONE EventSource per enabled=true mount and closes it on
 * unmount or when enabled flips to false. It is safe to mount this in
 * multiple components — the browser dedupes EventSource connections to
 * the same URL (though we explicitly dedupe via a module-level singleton
 * to be extra safe).
 *
 * OFFLINE BEHAVIOR:
 *   EventSource auto-reconnects on failure with a browser-controlled
 *   backoff (typically 3s). When the network is down, this creates an
 *   infinite reconnect storm — every 3s the SW returns a 503, EventSource
 *   fires `error`, and immediately tries again. This wastes battery and
 *   spams the console. To avoid this, we DON'T open the EventSource at
 *   all when `navigator.onLine === false`, and we close it immediately
 *   when the `offline` event fires. When `online` fires, we reopen it.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface NotificationPayload {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  fromUserId: string | null;
  referenceId: string;
  isRead: boolean;
  createdAt: string;
  user?: { id: string; name: string | null; image: string | null };
}

interface UseNotificationStreamOptions {
  enabled: boolean;
  /** Called once per new notification (in arrival order). */
  onNotification?: (n: NotificationPayload) => void;
  /** Called whenever the unread count changes (including the initial hello). */
  onUnreadCount?: (count: number) => void;
}

interface UseNotificationStreamResult {
  unreadCount: number;
  lastNotification: NotificationPayload | null;
  connected: boolean;
}

// Module-level singleton: ensure only ONE EventSource per browser tab even if
// multiple components call this hook. Last writer wins for callbacks; we use
// a subscriber set so all subscribers get every event.
type Sub = {
  onNotification?: (n: NotificationPayload) => void;
  onUnreadCount?: (count: number) => void;
  onConnectedChange?: (c: boolean) => void;
};
const subscribers = new Set<Sub>();
let es: EventSource | null = null;
let lastUnreadCount = 0;
let connectionRefCount = 0;

function ensureStream() {
  if (es) return;
  try {
    es = new EventSource('/api/notifications/stream');
    es.addEventListener('open', () => {
      for (const s of subscribers) s.onConnectedChange?.(true);
    });
    es.addEventListener('hello', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (typeof data.unreadCount === 'number') {
          lastUnreadCount = data.unreadCount;
          for (const s of subscribers) s.onUnreadCount?.(data.unreadCount);
        }
      } catch {}
    });
    es.addEventListener('unread-count', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (typeof data.unreadCount === 'number') {
          lastUnreadCount = data.unreadCount;
          for (const s of subscribers) s.onUnreadCount?.(data.unreadCount);
        }
      } catch {}
    });
    es.addEventListener('notification', (e: MessageEvent) => {
      try {
        const n = JSON.parse(e.data) as NotificationPayload;
        for (const s of subscribers) s.onNotification?.(n);
      } catch {}
    });
    es.addEventListener('error', () => {
      for (const s of subscribers) s.onConnectedChange?.(false);
      // EventSource auto-reconnects; we just update the connected flag.
    });
  } catch (err) {
    console.error('[useNotificationStream] failed to open EventSource:', err);
  }
}

function maybeCloseStream() {
  if (connectionRefCount <= 0 && es) {
    try { es.close(); } catch {}
    es = null;
  }
}

export function useNotificationStream(
  options: UseNotificationStreamOptions,
): UseNotificationStreamResult {
  const { enabled, onNotification, onUnreadCount } = options;
  const [unreadCount, setUnreadCount] = useState<number>(lastUnreadCount);
  const [lastNotification, setLastNotification] = useState<NotificationPayload | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  // Keep latest callbacks in refs so the subscriber object doesn't churn.
  const onNotificationRef = useRef(onNotification);
  const onUnreadCountRef = useRef(onUnreadCount);
  useEffect(() => { onNotificationRef.current = onNotification; }, [onNotification]);
  useEffect(() => { onUnreadCountRef.current = onUnreadCount; }, [onUnreadCount]);

  // Track online/offline state. When offline, we DON'T open the EventSource
  // — see the OFFLINE BEHAVIOR note in the file header.
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      // Immediately close any open EventSource so we don't burn cycles
      // on auto-reconnect attempts that will all fail.
      if (es) {
        try { es.close(); } catch {}
        es = null;
        for (const s of subscribers) s.onConnectedChange?.(false);
      }
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Don't open the stream if disabled OR offline. The `isOnline` dep
    // means this effect re-runs when connectivity changes, so the stream
    // auto-opens on reconnect and auto-closes on disconnect.
    if (!enabled || !isOnline) return;

    const sub: Sub = {
      onNotification: (n) => {
        setLastNotification(n);
        onNotificationRef.current?.(n);
      },
      onUnreadCount: (c) => {
        setUnreadCount(c);
        onUnreadCountRef.current?.(c);
      },
      onConnectedChange: setConnected,
    };
    subscribers.add(sub);
    connectionRefCount += 1;

    // Prime local state with the latest known count (in case the stream is
    // already open from another subscriber).
    setUnreadCount(lastUnreadCount);

    ensureStream();

    return () => {
      subscribers.delete(sub);
      connectionRefCount = Math.max(0, connectionRefCount - 1);
      maybeCloseStream();
    };
  }, [enabled, isOnline]);

  return { unreadCount, lastNotification, connected };
}

/**
 * Helper: optimistically decrement the local unread count (e.g. when the
 * user marks a notification as read in the UI). Useful so the bell badge
 * updates instantly without waiting for the next SSE poll.
 */
export function useDecrementUnreadCount() {
  return useCallback(() => {
    lastUnreadCount = Math.max(0, lastUnreadCount - 1);
    for (const s of subscribers) s.onUnreadCount?.(lastUnreadCount);
  }, []);
}

/**
 * Helper: optimistically reset the local unread count to zero (e.g. when
 * the user clicks "Mark all as read").
 */
// export function useResetUnreadCount() {
//   return useCallback(() => {
//     lastUnreadCount = 0;
//     for (const s of subscribers) s.onUnreadCount?.(0);
//   }, []);
// }
