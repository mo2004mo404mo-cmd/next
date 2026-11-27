'use client';

/**
 * usePushNotifications — manage Web Push subscription lifecycle.
 *
 * Responsibilities:
 *   1. Detect push support + permission state + embedding context
 *   2. Fetch the VAPID public key from /api/push/vapid-public
 *   3. Subscribe via serviceWorkerRegistration.pushManager.subscribe()
 *   4. POST the subscription to /api/push/subscribe
 *   5. On disable: unsubscribe the browser + POST to /api/push/unsubscribe
 *
 * Usage:
 *   const {
 *     supported,          // boolean — browser supports push + service workers
 *     unavailableReason,  // null | 'browser' | 'iframe'
 *     permission,         // 'default' | 'granted' | 'denied'
 *     subscribed,         // boolean — we have an active subscription
 *     enabled,            // boolean — user's intent (persisted in localStorage)
 *     enable,             // () => Promise<{ ok: boolean; error?: string }>
 *     disable,            // () => Promise<void>
 *   } = usePushNotifications();
 *
 * The hook is SSR-safe — it returns disabled states during SSR and
 * initializes on mount.
 *
 * ─── WHY THE EMBEDDING CONTEXT MATTERS (2026-10-22 fixes) ────────────────
 * (1) The "Working…" hang fix: this hook used to ignore the embedding
 * context — when a user in a no-SW context toggled "System Push
 * Notifications" ON, the flow awaited `navigator.serviceWorker.ready`, a
 * promise that NEVER resolves when no SW is registered on the origin, and
 * the Settings toggle spun forever (reported by the user in production).
 * detectUnavailableContext() now marks push unavailable up-front in no-SW
 * contexts (honest message, toggle disabled, enable() refuses immediately),
 * and withTimeout() races the two hangable promises (`serviceWorker.ready`,
 * `pushManager.subscribe`) so the spinner can never stick.
 *
 * (2) The preview-domain gate REMOVAL (sw.js v21): ServiceWorkerRegistrar
 * now REGISTERS the service worker at the top level of preview hostnames
 * (preview-chat-*.space-z.ai) — offline study there is the whole point of
 * the v21 port. The old hostname gate in this hook ("Not available on
 * preview domains") is therefore stale: the SW exists, `ready` resolves,
 * and `pushManager.subscribe` works over HTTPS. Only the IFRAME gate
 * remains — registration is genuinely skipped inside iframes, and
 * Notification.requestPermission in a cross-origin preview iframe without
 * a permissions policy is auto-denied by browsers anyway.
 */

import { useState, useEffect, useCallback } from 'react';

interface PushSubscriptionJSON {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  expirationTime: number | null;
}

type Permission = 'default' | 'granted' | 'denied' | 'unknown';

/** Why system push is unavailable in the current embedding context. */
export type PushUnavailableReason =
  | 'browser' // no serviceWorker / PushManager in this browser
  | 'iframe'; // rendered inside an iframe — the registrar skips registration there

interface UsePushResult {
  supported: boolean;
  unavailableReason: PushUnavailableReason | null;
  permission: Permission;
  subscribed: boolean;
  enabled: boolean;
  enable: () => Promise<{ ok: boolean; error?: string }>;
  disable: () => Promise<void>;
}

const ENABLED_KEY = 'medq-push-enabled';

// `navigator.serviceWorker.ready` hangs forever when no SW is registered on
// the origin — never wait longer than this for it.
const SW_READY_TIMEOUT_MS = 15_000;
// pushManager.subscribe can also stall (permission edge-cases, push service
// hiccup) without rejecting. Empirically measured: some push services take
// ~61s to acknowledge a subscribe (this repo's test Chrome talks to FCM
// "preprod", for example) even though the subscription works fine once
// created — so keep a generous cap. The busy spinner shows real work in
// progress; the point of the guard is that it ALWAYS settles, not that it
// settles fast.
const SUBSCRIBE_TIMEOUT_MS = 90_000;

// base64url → Uint8Array (for applicationServerKey parameter).
// Typed as Uint8Array<ArrayBuffer> so it satisfies BufferSource under TS 5.7+
// (a plain `new Uint8Array(n)` infers ArrayBufferLike, which is not
// assignable to pushManager.subscribe's applicationServerKey).
function urlBase64ToUint8Array(base64Url: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = typeof atob !== 'undefined' ? atob(base64) : '';
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

/**
 * Detect embedding contexts where system push can never work because the
 * service worker is intentionally NOT registered (see ServiceWorkerRegistrar):
 *   - inside any iframe (e.g. the preview-chat-* wrapper used by the IM
 *     gateway)
 * Preview HOSTNAMES are no longer gated here — since sw.js v21 the
 * registrar registers the SW at the top level of preview domains too
 * (offline + push both work there over HTTPS).
 */
function detectUnavailableContext(): PushUnavailableReason | null {
  if (typeof window === 'undefined') return null;
  try {
    if (window.self !== window.top) return 'iframe';
  } catch {
    // Cross-origin iframe — window.top access throws.
    return 'iframe';
  }
  return null;
}

function contextErrorMessage(reason: PushUnavailableReason): string {
  switch (reason) {
    case 'iframe':
      return 'System push is not available inside the preview frame — open the app in a standalone browser tab';
    default:
      return 'Push not supported in this browser';
  }
}

/** Race a promise against a timeout so a hung step rejects instead of blocking the UI forever. */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)), ms);
    }),
  ]);
}

export function usePushNotifications(): UsePushResult {
  const [supported, setSupported] = useState(false);
  const [unavailableReason, setUnavailableReason] = useState<PushUnavailableReason | null>(null);
  const [permission, setPermission] = useState<Permission>('unknown');
  const [subscribed, setSubscribed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Embedding context first — in iframes / preview hostnames no service
    // worker will ever exist, so bail before touching pushManager at all.
    const ctx = detectUnavailableContext();
    if (ctx) {
      setSupported(false);
      setUnavailableReason(ctx);
      // Still surface the browser permission state so the Settings copy can
      // be honest if the user already granted/denied notifications.
      try {
        if ('Notification' in window) setPermission(Notification.permission as Permission);
      } catch { /* ignore */ }
      // Never claim an active subscription in a no-SW context, even if
      // localStorage carried a stale 'true' from another origin (it can't —
      // localStorage is per-origin — but belt-and-braces).
      try { localStorage.removeItem(ENABLED_KEY); } catch { /* ignore */ }
      return;
    }

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setSupported(false);
      setUnavailableReason('browser');
      return;
    }
    setSupported(true);
    setUnavailableReason(null);
    setPermission(Notification.permission as Permission);

    // Load enabled flag from localStorage
    try {
      setEnabled(localStorage.getItem(ENABLED_KEY) === 'true');
    } catch {
      // localStorage may be unavailable in private mode
    }

    // Check if we already have an active subscription
    (async () => {
      try {
        const reg = await withTimeout(navigator.serviceWorker.ready, SW_READY_TIMEOUT_MS, 'service worker startup');
        const existing = await reg.pushManager.getSubscription();
        setSubscribed(!!existing);
      } catch {
        // SW not ready yet (or never) — leave subscribed=false
      }
    })();

    // Listen for SW messages (push-received → could update UI badge)
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'medq:push-received') {
        // Could trigger a toast here; for now we just refresh the bell count
        // via the existing useNotificationStream hook.
      }
    };
    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
  }, []);

  const enable = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    // Refuse immediately in contexts where no service worker can exist —
    // previously this flowed into `navigator.serviceWorker.ready` and hung
    // forever, leaving the Settings spinner stuck on "Working…".
    const ctx = detectUnavailableContext();
    if (ctx) {
      setSupported(false);
      setUnavailableReason(ctx);
      return { ok: false, error: contextErrorMessage(ctx) };
    }
    if (!supported) return { ok: false, error: 'Push not supported in this browser' };

    // 1. Request notification permission
    if (Notification.permission === 'default') {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') {
        return { ok: false, error: 'Notification permission denied' };
      }
    } else if (Notification.permission === 'denied') {
      setPermission('denied');
      return { ok: false, error: 'Notifications are blocked in browser settings' };
    }

    try {
      // 2. Fetch VAPID public key
      const vapidRes = await fetch('/api/push/vapid-public');
      if (!vapidRes.ok) {
        return { ok: false, error: 'Push not configured on server' };
      }
      const { publicKey, enabled: serverEnabled } = await vapidRes.json();
      if (!serverEnabled || !publicKey) {
        return { ok: false, error: 'Push not configured on server' };
      }

      // 3. Subscribe via pushManager (timeout-guarded — `ready` never
      //    resolves when no SW is registered on the origin)
      const reg = await withTimeout(
        navigator.serviceWorker.ready,
        SW_READY_TIMEOUT_MS,
        'Service worker not ready — reload the page and try again'
      );
      const sub = await withTimeout(
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        }),
        SUBSCRIBE_TIMEOUT_MS,
        'Push subscription'
      );

      // 4. Persist to server
      const subJSON = sub.toJSON() as PushSubscriptionJSON;
      const subscribeRes = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subJSON.endpoint,
          keys: subJSON.keys,
          userAgent: navigator.userAgent,
        }),
      });
      if (!subscribeRes.ok) {
        return { ok: false, error: 'Failed to register subscription with server' };
      }

      setSubscribed(true);
      setEnabled(true);
      try { localStorage.setItem(ENABLED_KEY, 'true'); } catch { /* ignore */ }
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Failed to subscribe' };
    }
  }, [supported]);

  const disable = useCallback(async () => {
    const ctx = detectUnavailableContext();
    if (!ctx) {
      try {
        const reg = await withTimeout(navigator.serviceWorker.ready, SW_READY_TIMEOUT_MS, 'service worker startup');
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          const endpoint = sub.endpoint;
          await sub.unsubscribe();
          // Best-effort server cleanup
          await fetch('/api/push/unsubscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint }),
          }).catch(() => { /* ignore — browser already unsubscribed */ });
        }
      } catch {
        // ignore
      }
    }
    setSubscribed(false);
    setEnabled(false);
    try { localStorage.setItem(ENABLED_KEY, 'false'); } catch { /* ignore */ }
  }, []);

  return { supported, unavailableReason, permission, subscribed, enabled, enable, disable };
}
