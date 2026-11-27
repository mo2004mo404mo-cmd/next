'use client';

/**
 * Offline queue client — bridges the service worker outbox with React.
 *
 * The service worker (public/sw.js) intercepts fetches to /api/chat/messages
 * and, when the network is unavailable, stores them in an IndexedDB outbox
 * and returns a synthetic 202 response so the optimistic UI keeps working.
 *
 * This module:
 *   1. Listens for `medq:queue-status` messages from the SW (pending count)
 *   2. Listens for `medq:queue-replay-success` messages from the SW
 *      (a queued write was successfully replayed) — emits a DOM event so
 *      chat components can refetch
 *   3. Triggers replay on the `online` event (fallback for browsers without
 *      the Background Sync API — e.g. Firefox & Safari)
 *   4. Exposes the pending count via a subscribe() API and a `pending` getter
 */

export type QueueStatusListener = (pending: number) => void;
export type ReplaySuccessListener = (info: {
  url: string;
  method: string;
  status: number;
  body: string;
}) => void;

const statusListeners = new Set<QueueStatusListener>();
const replayListeners = new Set<ReplaySuccessListener>();

let currentPending = 0;
let initialized = false;

function handleServiceWorkerMessage(event: MessageEvent) {
  const data = event.data || {};
  if (data.type === 'medq:queue-status') {
    currentPending = typeof data.pending === 'number' ? data.pending : 0;
    statusListeners.forEach((fn) => {
      try { fn(currentPending); } catch (e) { /* ignore */ }
    });
  } else if (data.type === 'medq:queue-replay-success') {
    replayListeners.forEach((fn) => {
      try {
        fn({
          url: data.url,
          method: data.method,
          status: data.status,
          body: data.body || '',
        });
      } catch (e) { /* ignore */ }
    });
  }
}

function handleOnline() {
  // Browser is back online — ask the SW to:
  //   1. Reset its _lastFetchFailAt flag (so it stops assuming the network
  //      is down and starts trying fetches again)
  //   2. Replay the queued outbox
  // This is the fallback path for browsers without Background Sync.
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.active?.postMessage({ type: 'medq:client-online' });
        registration.active?.postMessage({ type: 'medq:replay-now' });
      })
      .catch(() => {});
  }
}

function handleOffline() {
  // Browser reports offline — notify the SW so its _onlineClientCount
  // stays accurate. The SW uses this count to decide whether to try the
  // network or short-circuit to cache/503.
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.active?.postMessage({ type: 'medq:client-offline' });
      })
      .catch(() => {});
  }
}

/**
 * Initialize the offline-queue listener. Safe to call multiple times —
 * subsequent calls are no-ops.
 */
export function initOfflineQueue(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  initialized = true;

  navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Request an initial status broadcast from the SW
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'medq:get-queue-status' });
    // Also report our current online/offline state so the SW's
    // _onlineClientCount is accurate from the start
    if (typeof navigator !== 'undefined') {
      navigator.serviceWorker.controller.postMessage({
        type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline',
      });
    }
  } else {
    // The SW might not have taken control yet — try again on controllerchange
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      navigator.serviceWorker.controller?.postMessage({ type: 'medq:get-queue-status' });
      if (typeof navigator !== 'undefined') {
        navigator.serviceWorker.controller?.postMessage({
          type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline',
        });
      }
    });
  }
}

/**
 * Subscribe to pending-queue-count changes.
 * Returns an unsubscribe function.
 */
export function subscribeToQueueStatus(listener: QueueStatusListener): () => void {
  statusListeners.add(listener);
  // Immediately invoke with the current value
  try { listener(currentPending); } catch (e) { /* ignore */ }
  return () => {
    statusListeners.delete(listener);
  };
}

/**
 * Subscribe to "queued write replayed successfully" events.
 * Chat components use this to refetch messages/rooms after a reconnect.
 * Returns an unsubscribe function.
 */
export function subscribeToReplaySuccess(listener: ReplaySuccessListener): () => void {
  replayListeners.add(listener);
  return () => {
    replayListeners.delete(listener);
  };
}

/**
 * Subscribe to replay-success events filtered by URL substring.
 *
 * Convenience wrapper around `subscribeToReplaySuccess` for components
 * that only care about a specific API path (e.g. `/api/notes`,
 * `/api/bookmarks`, `/api/quick-notes`, `/api/study-streaks/check-in`).
 *
 * Example:
 *   useEffect(() => subscribeToReplayForPath('/api/notes', () => refetchNotes()), []);
 */
export function subscribeToReplayForPath(
  pathSubstring: string,
  listener: () => void
): () => void {
  const wrapped: ReplaySuccessListener = (info) => {
    if (info.url.includes(pathSubstring)) {
      try { listener(); } catch (e) { /* ignore */ }
    }
  };
  replayListeners.add(wrapped);
  return () => {
    replayListeners.delete(wrapped);
  };
}

/**
 * Manually trigger a queue replay (e.g. from a "Retry now" button).
 */
export function triggerReplay(): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready
    .then((registration) => {
      registration.active?.postMessage({ type: 'medq:replay-now' });
    })
    .catch(() => {});
}

/**
 * Current pending count (read-only snapshot).
 */
export function getPendingCount(): number {
  return currentPending;
}

/**
 * Returns true if the browser is currently offline.
 */
export function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
}
