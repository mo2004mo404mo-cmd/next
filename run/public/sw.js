/**
 * MedQ Service Worker — v17
 * ─────────────────────────────────────────────────────────────────────────
 * Offline PWA. This file fulfills the contract the client code already
 * expects (offline-response.ts, offline-queue.ts, ServiceWorkerRegistrar):
 *
 *   • Version handshake: answers {type:'medq:ping-version'} and broadcasts
 *     {type:'medq:sw-version', version:'v15'} on activation. The registrar
 *     nukes mismatched SWs — keep SW_VERSION in sync with
 *     EXPECTED_SW_VERSION in ServiceWorkerRegistrar.tsx.
 *
 *   • API GET  (/api/*): network-first. Successful responses are cached
 *     (API_CACHE). Offline → cached copy. Offline + no cache →
 *     503 {error, offline:true} — isOfflineError() detects exactly this.
 *
 *   • Static   (/_next/static, images, fonts, /icons, /logos, /scripts):
 *     cache-first (RUNTIME_CACHE) — these URLs are content-hashed.
 *
 *   • Navigations: network-first, fall back to cached page, then to
 *     /offline.html. Offline study works: visit /bank once online and the
 *     page + its question JSON are served from cache.
 *
 *   • Mutations (POST/PUT/PATCH/DELETE on /api/*) while OFFLINE: stored in
 *     an IndexedDB outbox and answered with a synthetic 202 {queued:true}.
 *     Replayed on 'online' (and via this SW's sync listener); each replay
 *     posts {type:'medq:queue-replay-success', url, method, status, body}
 *     and pending counts arrive as {type:'medq:queue-status', pending}.
 *
 *   • v16 — GATEWAY-ERROR RESILIENCE: 502/503/504 responses (backend down,
 *     bad gateway, sandbox restarting) are now treated like offline for
 *     navigations and API GETs — the last cached copy is served instead of
 *     an error page. App-level errors (4xx/500) still pass through so real
 *     application errors and dev compile errors stay visible.
 *
 *   • v18 — REAL PAGE OFFLINE: served from a PRODUCTION build (next start),
 *     the /bank page no longer needs the dev-only HMR websocket, so an
 *     offline (or gateway-down) navigation now serves the CACHED REAL
 *     /bank HTML — the exact same page the user sees online — instead of
 *     the simplified static shell. offline-bank.html is kept only as a
 *     last resort for "never visited /bank online" first runs.
 *
 *   • v18 — OFFLINE /api/questions SYNTHESIS: the pack is warmed with ALL
 *     pages (limit=50, page count derived from `total`), and an offline
 *     GET /api/questions with NO exact cache hit is answered by the SW
 *     itself: it filters/searches/paginates the cached pack using the SAME
 *     semantics as the API route (system, difficulty incl. Medium legacy,
 *     type, insensitive search over text/topic/system, createdAt-desc
 *     order, page/limit slice). Result: pagination, filters AND search all
 *     work offline on the real page.
 *
 *   • v20 — MEDIA FIX: the sandbox gateway brotli-compresses wav/png in
 *     transit, so a naively cached media response keeps a LYING
 *     `content-encoding: br` header over an already-DECODED body — Chrome's
 *     strict media pipeline then fails with MEDIA_ERR_SRC_NOT_SUPPORTED.
 *     Media is now cached with SANITIZED headers (no content-encoding /
 *     transfer-encoding / connection / vary; truthful Content-Length), and
 *     media requests (audio/video destination or Range header) are served
 *     range-aware: proper 206 Partial Content slices so <audio> playback AND
 *     seeking work offline.
 *
 *   • v21 — PUSH MERGE: the offline PWA (v20) and the Web-Push worker (the
 *     old v15 edition) are now ONE service worker. All offline machinery is
 *     unchanged; the push layer from v15 is layered on top:
 *       - `push` event → showNotification + postMessage medq:push-received
 *         to open clients (usePushNotifications refreshes the bell badge).
 *       - `notificationclick` → focus/open the deep-link URL; posts
 *         medq:navigate-to when an off-path client was focused.
 *       - `pushsubscriptionchange` → re-subscribe with the VAPID key from
 *         /api/push/vapid-public and POST it to /api/push/subscribe.
 *       - `medq:test-show-notification` page message → exercises the exact
 *         showNotification path a real push uses (headless-test contract).
 */
'use strict';

const SW_VERSION = 'v22';
const SHELL_CACHE = `medq-shell-${SW_VERSION}`;
const RUNTIME_CACHE = `medq-runtime-${SW_VERSION}`;
const API_CACHE = `medq-api-${SW_VERSION}`;
const ALL_CACHES = [SHELL_CACHE, RUNTIME_CACHE, API_CACHE];

const OFFLINE_URL = '/offline.html';
const OFFLINE_BANK_URL = '/offline-bank.html';
// Offline question pack: canonical, filter-free URLs the SW synthesizes
// offline /api/questions responses from. offline-bank.html (last-resort
// shell) reads pages 1–2 of the same pack.
const PACK_LIMIT = 50;
const packUrl = (p) => `/api/questions?page=${p}&limit=${PACK_LIMIT}`;
// Safety cap for pack loading (515 questions today → 11 pages; cap guards
// against a corrupted cache loop).
const MAX_PACK_PAGES = 60;
// Cap on media files pre-cached for the offline bank (illustrations,
// narration audio, video). 515-question bank has 3 today; cap is future-proof.
const MAX_MEDIA_FILES = 200;
const MAX_API_CACHE_ENTRIES = 120;
const MAX_NAV_CACHE_ENTRIES = 30;
const OUTBOX_DB = 'medq-outbox';
const OUTBOX_STORE = 'requests';
const MAX_OUTBOX_AGE_MS = 24 * 60 * 60 * 1000; // drop queued writes after a day
// Gateway-level failures where serving stale cache beats an error page.
const GATEWAY_STATUSES = new Set([502, 503, 504]);
const DEFAULT_ICON = '/icons/icon-192.png';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      // Core shell: offline page + theme init + brand icons. best-effort each.
      await Promise.allSettled([
        shell.add(new Request(OFFLINE_URL, { cache: 'reload' })),
        shell.add(new Request(OFFLINE_BANK_URL, { cache: 'reload' })),
        shell.add(new Request('/scripts/theme-init.js', { cache: 'reload' })),
        shell.add(new Request('/manifest.json', { cache: 'reload' })),
        shell.add(new Request('/icons/icon-192.png', { cache: 'reload' })),
        shell.add(new Request('/icons/icon-512.png', { cache: 'reload' })),
        shell.add(new Request('/logo-horizontal.png', { cache: 'reload' })),
      ]);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove every cache from other SW versions, and purge any cached
      // copy of /sw.js from the runtime cache (self-caching trap guard).
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith('medq-') && !ALL_CACHES.includes(k)).map((k) => caches.delete(k))
      );
      const rt = await caches.open(RUNTIME_CACHE);
      await rt.delete('/sw.js').catch(() => {});
      await self.clients.claim();
      // Version handshake: tell every client which version is active
      await broadcast({ type: 'medq:sw-version', version: SW_VERSION });
    })()
  );
});

async function broadcast(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  for (const c of clients) {
    try { c.postMessage(message); } catch { /* ignore */ }
  }
}

/* ── Version ping + client lifecycle messages ── */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'medq:ping-version') {
    event.source?.postMessage({ type: 'medq:sw-version', version: SW_VERSION });
  } else if (data.type === 'SKIP_WAITING' || data.type === 'medq:skip-waiting') {
    self.skipWaiting();
  } else if (data.type === 'medq:queue-flush' || data.type === 'medq:replay-now') {
    // Client just came online (or wants a retry) — replay queued mutations,
    // then ack so fire-and-forget senders know the handler is alive.
    event.waitUntil?.(
      replayOutbox().finally(() => {
        try { event.source?.postMessage({ type: 'medq:replay-ack', at: Date.now() }); }
        catch { /* client gone */ }
      }),
    );
  } else if (data.type === 'medq:test-show-notification') {
    // Local debug path — the SAME showNotification + client-notify code a
    // real push uses, so the display AND routing pipelines are both
    // exercised headlessly. Display can be denied (headless browsers), but
    // the medq:push-received broadcast still proves the push layer lives.
    event.waitUntil?.(
      (async () => {
        const payload = Object.assign(
          { title: 'MedQ test push', body: 'Service worker display pipeline is working.', url: '/', tag: 'medq-sw-test' },
          data.payload || {},
        );
        try { await showPushNotification(payload, 'medq-sw-test'); }
        catch (e) { /* Notification.permission denied — display unverifiable here */ }
        await notifyClientsOfPush(payload);
      })(),
    );
  } else if (data.type === 'medq:client-online' || data.type === 'medq:client-offline') {
    // Informational: the page reports its connectivity state. The SW relies
    // on navigator.onLine directly, so nothing to do — acknowledged.
  }
});

/* ─────────────────────────── Web Push (merged from v15) ─────────────────── */

/** Display a notification from a push-shaped payload. Shared by the real
 *  `push` event and the test message handler so the tested path IS the
 *  production path. */
function showPushNotification(payload, extraTag) {
  var p = payload || {};
  var title = (typeof p.title === 'string' && p.title.trim()) || 'MedQ';
  var options = {
    body: typeof p.body === 'string' ? p.body : '',
    icon: p.icon || DEFAULT_ICON,
    badge: p.badge || DEFAULT_ICON,
    tag: p.tag || extraTag || 'medq-notification',
    // data carries the deep-link URL through to notificationclick.
    data: {
      url: p.url || '/',
      notificationId: (p.data && p.data.notificationId) || null,
      type: (p.data && p.data.type) || null,
      referenceId: (p.data && p.data.referenceId) || null,
    },
  };
  try {
    return self.registration.showNotification(title, options);
  } catch (e) {
    // Chrome/Android occasionally throws on malformed icon URLs — degrade
    // to a text-only notification rather than dropping the alert entirely.
    options.icon = undefined;
    options.badge = undefined;
    return self.registration.showNotification(title, options);
  }
}

/** Tell all open clients a push arrived (bell badge refresh, etc.). */
async function notifyClientsOfPush(payload) {
  var clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (var client of clientsList) {
    try {
      client.postMessage({
        type: 'medq:push-received',
        title: payload && payload.title,
        body: payload && payload.body,
        url: (payload && payload.url) || '/',
        at: Date.now(),
      });
    } catch (e) {
      /* one dead client must not break the loop */
    }
  }
}

self.addEventListener('push', function (event) {
  var payload = {};
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      // Non-JSON push (e.g. a plain test ping from a push-service debug
      // console) — still show something; silent pushes are reprimanded by
      // Chrome's userVisibleOnly contract.
      payload = { title: 'MedQ', body: event.data.text ? event.data.text().slice(0, 200) : 'You have a new update.' };
    }
  } else {
    payload = { title: 'MedQ', body: 'You have a new update.' };
  }

  event.waitUntil(
    (async function () {
      // Display failure (permission race, icon quirk) must not swallow the
      // client notification — open pages still refresh their bell badge.
      try { await showPushNotification(payload); } catch (e) { /* keep going */ }
      await notifyClientsOfPush(payload);
    })(),
  );
});

self.addEventListener('notificationclick', function (event) {
  var data = (event.notification && event.notification.data) || {};
  var targetUrl = data.url || '/';
  event.notification.close();

  event.waitUntil(
    (async function () {
      var clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      // Prefer a client already on the target path (deep link focus),
      // else any client on the app origin (focus + let the SPA navigate),
      // else open a new window.
      var targetPath;
      try {
        targetPath = new URL(targetUrl, self.location.origin).pathname;
      } catch (e) {
        targetPath = null;
      }

      var exact = null;
      var anyApp = null;
      for (var i = 0; i < clientsList.length; i++) {
        var c = clientsList[i];
        if (!c.url || !c.url.startsWith(self.location.origin)) continue;
        if (!anyApp) anyApp = c;
        if (targetPath && c.url.indexOf(targetPath) !== -1) { exact = c; break; }
      }

      var chosen = exact || anyApp;
      if (chosen) {
        try {
          await chosen.focus();
        } catch (e) {
          /* focus may be blocked — fall through to posting the nav */
        }
        // If we focused a client that is NOT on the target path, ask it to
        // navigate (the app listens for medq:navigate-to on the SW channel).
        if (!exact && targetUrl && targetUrl !== '/') {
          try {
            chosen.postMessage({ type: 'medq:navigate-to', url: targetUrl });
          } catch (e) {
            /* best effort */
          }
        }
        return;
      }

      try {
        await self.clients.openWindow(targetUrl);
      } catch (e) {
        // openWindow can be blocked without a user gesture in some
        // browsers — nothing further we can do from a SW.
      }
    })(),
  );
});

/** The push service rotated/expired our subscription. Re-subscribe with the
 *  current VAPID key and register the replacement server-side, or the next
 *  sendPushToUser will 410 and prune us into silence. */
self.addEventListener('pushsubscriptionchange', function (event) {
  event.waitUntil(
    (async function () {
      try {
        var vapidRes = await fetch('/api/push/vapid-public');
        if (!vapidRes.ok) return;
        var vapid = await vapidRes.json();
        if (!vapid.enabled || !vapid.publicKey) return;

        var reg = await self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapid.publicKey),
        });

        var subJSON = reg.toJSON();
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: subJSON.endpoint,
            keys: subJSON.keys,
            userAgent: navigatorUA(),
          }),
        });
      } catch (e) {
        // Renewal is best-effort; the user re-enabling push in Settings
        // always recovers.
      }
    })(),
  );
});

function navigatorUA() {
  try {
    return navigator.userAgent;
  } catch (e) {
    return undefined;
  }
}

function urlBase64ToUint8Array(base64Url) {
  var padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
  var base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  var raw = atob(base64);
  var output = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

/* ─────────────────────────── IndexedDB outbox ─────────────────────────── */

function outboxDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(OUTBOX_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(OUTBOX_STORE)) {
        req.result.createObjectStore(OUTBOX_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function outboxAdd(entry) {
  const db = await outboxDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(OUTBOX_STORE, 'readwrite');
    tx.objectStore(OUTBOX_STORE).add(entry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function outboxAll() {
  const db = await outboxDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(OUTBOX_STORE, 'readonly');
    const req = tx.objectStore(OUTBOX_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function outboxDelete(id) {
  const db = await outboxDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(OUTBOX_STORE, 'readwrite');
    tx.objectStore(OUTBOX_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function outboxCount() {
  try {
    const all = await outboxAll();
    return all.length;
  } catch { return 0; }
}

async function reportQueueStatus() {
  const pending = await outboxCount();
  await broadcast({ type: 'medq:queue-status', pending });
}

/** Replay every queued mutation; notify pages per success. */
async function replayOutbox() {
  let entries;
  try { entries = await outboxAll(); } catch { return; }
  const now = Date.now();
  for (const e of entries) {
    if (now - e.createdAt > MAX_OUTBOX_AGE_MS) {
      await outboxDelete(e.id).catch(() => {});
      continue;
    }
    try {
      const res = await fetch(e.url, {
        method: e.method,
        headers: e.headers,
        body: e.body,
      });
      const body = await res.clone().text().catch(() => '');
      await broadcast({
        type: 'medq:queue-replay-success',
        url: e.url,
        method: e.method,
        status: res.status,
        body,
      });
      await outboxDelete(e.id).catch(() => {});
    } catch {
      // Still offline (or the endpoint is down) — keep it queued for later.
    }
  }
  await reportQueueStatus();
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'medq-outbox-replay') {
    event.waitUntil(replayOutbox());
  }
});

/* ─────────────────────────── Fetch handling ──────────────────────────── */

function isOffline() {
  return !(self.navigator && self.navigator.onLine);
}

const SHELL_ASSETS = new Set([
  OFFLINE_URL,
  OFFLINE_BANK_URL,
  '/manifest.json',
  '/scripts/theme-init.js',
  '/scripts/resilience.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/logo-horizontal.png',
]);

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    // Oldest first (insertion order) — delete the front.
    for (const key of keys.slice(0, keys.length - maxEntries)) {
      await cache.delete(key);
    }
  }
}

async function offlineApiResponse(url) {
  return new Response(
    JSON.stringify({ error: 'You are offline and this request has no cached copy.', offline: true }),
    { status: 503, headers: { 'Content-Type': 'application/json' } },
  );
}

/** The static offline /bank shell (precached at install). */
async function offlineBankPage() {
  try {
    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match(OFFLINE_BANK_URL, { ignoreSearch: true })) || null;
  } catch { return null; }
}

/** Warm the offline question pack: cache /api/questions for EVERY page so
 *  offline /bank has the full bank. Page 1 is fetched first to learn
 *  `total`, then the remaining pages in parallel. Runs via event.waitUntil
 *  on every successful ONLINE /bank navigation — one visit is enough. */
async function warmOfflineBank() {
  try {
    const cache = await caches.open(API_CACHE);
    try {
      const first = await fetch(packUrl(1));
      if (first.ok) {
        await cache.put(new Request(packUrl(1), { method: 'GET' }), first.clone());
        const data = await first.clone().json().catch(() => null);
        const total = data && typeof data.total === 'number' ? data.total : 0;
        const pages = Math.max(1, Math.min(MAX_PACK_PAGES, Math.ceil(total / PACK_LIMIT)));
        await Promise.all(
          Array.from({ length: Math.max(0, pages - 1) }, (_, i) => i + 2).map(async (p) => {
            try {
              const res = await fetch(packUrl(p));
              if (res.ok) await cache.put(new Request(packUrl(p), { method: 'GET' }), res.clone());
            } catch { /* mid-warm disconnect — keep whatever cached */ }
          })
        );
        // Pre-cache media referenced by the pack so the offline bank renders
        // IDENTICALLY to online (illustrations, narration audio, video).
        await warmPackMedia(await loadPackQuestions());
      }
    } catch { /* offline already — keep whatever is cached */ }
    await trimCache(API_CACHE, MAX_API_CACHE_ENTRIES);
  } catch { /* never block navigation on warm-up failures */ }
}

/** Pre-cache same-origin media files referenced by cached questions.
 *  External embeds (modelUrl iframes, CDN images) are skipped — only files
 *  this origin serves can be reliably cached. Dead links (404 — they fail
 *  online too) are skipped silently so warming never breaks. */
async function warmPackMedia(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return;
  const urls = new Set();
  for (const q of questions) {
    for (const field of ['imageUrl', 'audioUrl', 'videoUrl']) {
      const u = q && q[field];
      if (typeof u === 'string' && u.startsWith('/') && !u.startsWith('//')) urls.add(u);
    }
  }
  if (urls.size === 0) return;
  const cache = await caches.open(RUNTIME_CACHE);
  await Promise.all(
    Array.from(urls).slice(0, MAX_MEDIA_FILES).map(async (u) => {
      try {
        const hit = await cache.match(u, { ignoreSearch: true });
        if (hit) return; // already cached (viewed online or previous warm)
        const res = await fetch(new Request(u, { cache: 'reload' }));
        if (res.ok && (res.type === 'basic' || res.type === 'default')) {
          // v20: store media with SANITIZED headers — the gateway's lying
          // `content-encoding: br` over a decoded body breaks Chrome's media
          // pipeline offline (MEDIA_ERR_SRC_NOT_SUPPORTED).
          const clean = await sanitizedMediaResponse(res);
          await cache.put(u, clean);
        }
      } catch { /* dead link / offline mid-warm — skip */ }
    })
  );
}

/* ── Media sanitization + range serving (v20) ─────────────────────── */

const MEDIA_EXT_RE = /\.(?:wav|mp3|ogg|m4a|flac|aac|webm|mp4|mov|oga|opus)$/i;

/** True for requests whose consumers are the strict media pipeline:
 *  <audio>/<video> elements (destination) or any Range-bearing request. */
function isMediaRequest(req, path) {
  if (req.destination === 'audio' || req.destination === 'video') return true;
  if (req.headers && req.headers.get('range')) return true;
  return MEDIA_EXT_RE.test(path);
}

/** Cache a media response with CLEAN, truthful headers. The gateway
 *  compresses media in transit (content-encoding: br over an already-decoded
 *  body once fetch() hands it to the SW) — replaying those lying headers
 *  makes Chrome's media decoder reject the file. Keep only what matters. */
async function sanitizedMediaResponse(res) {
  const body = await res.clone().arrayBuffer();
  const ct = res.headers.get('content-type') || 'application/octet-stream';
  const headers = new Headers({
    'Content-Type': ct,
    'Content-Length': String(body.byteLength),
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
  return new Response(body, { status: 200, statusText: 'OK', headers });
}

/** Parse a single-range `bytes=start-end` header into {start, end} against
 *  a byte length. Supports open-ended (`0-`) and suffix (`-500`) forms.
 *  Returns null when unparseable; {invalid: true} when out of bounds. */
function parseRange(rangeHeader, total) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(String(rangeHeader || '').trim());
  if (!m) return null;
  if (m[1] === '' && m[2] === '') return null;
  let start, end;
  if (m[1] === '') {
    const n = parseInt(m[2], 10);
    if (!n) return null;
    start = Math.max(0, total - n);
    end = total - 1;
  } else {
    start = parseInt(m[1], 10);
    end = m[2] === '' ? total - 1 : Math.min(total - 1, parseInt(m[2], 10));
  }
  if (isNaN(start) || isNaN(end)) return null;
  if (start >= total) return { invalid: true };
  if (start > end) return null;
  return { start, end };
}

/** Serve a (sanitized) cached media response to a request, honoring a
 *  Range header with proper 206 Partial Content slices. */
async function serveMediaFromCache(hit, req) {
  const total = Number(hit.headers.get('content-length') || 0);
  const rangeHeader = req.headers ? req.headers.get('range') : null;
  if (!rangeHeader || !total) return hit; // plain 200 with clean headers
  const r = parseRange(rangeHeader, total);
  if (r && r.invalid) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` },
    });
  }
  if (!r) return hit; // unparseable range → ignore, serve full 200
  const body = await hit.arrayBuffer();
  const slice = body.slice(r.start, r.end + 1);
  return new Response(slice, {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': hit.headers.get('content-type') || 'application/octet-stream',
      'Content-Length': String(slice.byteLength),
      'Content-Range': `bytes ${r.start}-${r.end}/${total}`,
      'Accept-Ranges': 'bytes',
    },
  });
}

/* ── Offline /api/questions synthesis ─────────────────────────────── */

// Mirror of DIFFICULTY_LABELS in src/lib/medq-types.ts (kept in sync).
const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Basic', 3: 'Moderate', 4: 'Hard', 5: 'Expert' };

/** Load the whole warmed pack (createdAt-desc order preserved, deduped). */
async function loadPackQuestions() {
  const cache = await caches.open(API_CACHE);
  const out = [];
  const seen = new Set();
  for (let p = 1; p <= MAX_PACK_PAGES; p++) {
    const hit = await cache.match(packUrl(p), { ignoreSearch: false });
    if (!hit) break;
    const data = await hit.json().catch(() => null);
    if (!data || !Array.isArray(data.questions) || data.questions.length === 0) break;
    for (const q of data.questions) {
      if (q && q.id && !seen.has(q.id)) { seen.add(q.id); out.push(q); }
    }
    if (data.questions.length < PACK_LIMIT) break; // final pack page
  }
  return out;
}

/** Exact port of the /api/questions GET filter semantics (route.ts). */
function packMatchesFilters(q, params) {
  const system = params.get('system');
  const topic = params.get('topic');
  const difficulty = params.get('difficulty');
  const type = params.get('type');
  const search = params.get('search');

  if (system && q.system !== system) return false;
  // Prisma `contains` on PG (no mode) is case-sensitive — mirror that.
  if (topic && !String(q.topic || '').includes(topic)) return false;
  if (difficulty) {
    const numDiff = parseInt(difficulty, 10);
    let labels;
    if (!isNaN(numDiff) && numDiff >= 1 && numDiff <= 5) {
      const label = DIFFICULTY_LABELS[numDiff];
      labels = label === 'Moderate' ? ['Moderate', 'Medium'] : [label];
    } else if (difficulty === 'Moderate') {
      labels = ['Moderate', 'Medium']; // legacy 'Medium' rows
    } else {
      labels = [difficulty];
    }
    if (!labels.includes(q.difficulty)) return false;
  }
  if (type && q.type !== type) return false;
  if (search) {
    const needle = search.toLowerCase();
    const inText = String(q.text || '').toLowerCase().includes(needle);
    const inTopic = String(q.topic || '').toLowerCase().includes(needle);
    const inSystem = String(q.system || '').toLowerCase().includes(needle);
    if (!inText && !inTopic && !inSystem) return false;
  }
  return true;
}

/** Answer an offline GET /api/questions?… from the warmed pack using the
 *  same shape + semantics as the live route. Returns null when the pack
 *  is empty (caller falls through to the honest 503). */
async function synthesizeQuestionsResponse(url) {
  try {
    const pack = await loadPackQuestions();
    if (pack.length === 0) return null;
    const params = url.searchParams;
    const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1);
    const limit = Math.max(1, parseInt(params.get('limit') || '20', 10) || 20);
    const filtered = pack.filter((q) => packMatchesFilters(q, params));
    const total = filtered.length;
    const start = (page - 1) * limit;
    const slice = filtered.slice(start, start + limit);
    return new Response(
      JSON.stringify({ questions: slice, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'x-medq-offline-cache': '1' } },
    );
  } catch { return null; }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // NEVER intercept the service worker script itself — if a previous sw.js
  // ever lands in a cache, update() would fetch the STALE copy forever and
  // no new version could ever activate (the self-caching trap).
  if (url.pathname === '/sw.js') return;

  // Same-origin app traffic only — anything else (CDN, provider APIs) passes.
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;

  // Next.js dev internals must always hit network.
  if (path.startsWith('/_next/webpack-hmr') || path.startsWith('/__nextjs')) return;

  // ── Live agent streams: NEVER intercept (v22) ──
  // /api/agent/* carries SSE event streams (the chat POST is a mutation and
  // already passes through; the GET /v2/events re-attach lands HERE). The
  // API-GET branch below would res.clone() + cache.put() the stream — the
  // Cache API buffers the whole never-ending body in memory, and a completed
  // run's frames could later be served as a stale 200 replay. Event streams
  // must reach the network untouched, online or offline.
  if (path.startsWith('/api/agent/') || path.startsWith('/api/freellmapi')) return;
  // Any other SSE request (Accept: text/event-stream) is likewise untouchable.
  if ((req.headers.get('accept') || '').includes('text/event-stream')) return;

  // NOTE: /api/auth/session is NO LONGER a pass-through. A hanging session
  // request while offline stalls hydration for the whole app (providers
  // await it before rendering). Offline we serve the last cached session —
  // the standard PWA pattern — and network-first refreshes it on reconnect.
  // The SW's fetch() rejects offline, so the cache branch answers fast.

  /* ── Mutations while offline → outbox + synthetic 202 ── */
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (path.startsWith('/api/') && isOffline()) {
      event.respondWith(
        (async () => {
          try {
            const body = req.method === 'DELETE' ? null : await req.clone().text();
            await outboxAdd({
              url: req.url,
              method: req.method,
              headers: { 'Content-Type': req.headers.get('Content-Type') || 'application/json' },
              body,
              createdAt: Date.now(),
            });
            await reportQueueStatus();
            return new Response(
              JSON.stringify({ queued: true, offline: true }),
              { status: 202, headers: { 'Content-Type': 'application/json' } },
            );
          } catch {
            return offlineApiResponse(req.url);
          }
        })()
      );
      return;
    }
    return; // online mutations pass through untouched
  }

  /* ── App shell assets: cache-first ── */
  if (SHELL_ASSETS.has(path)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(SHELL_CACHE);
        const hit = await cache.match(req, { ignoreSearch: true });
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok) await cache.put(req, res.clone());
          return res;
        } catch {
          return new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  /* ── Static assets (hashed chunks, images, fonts, public files) ── */
  const isStatic =
    path.startsWith('/_next/static') ||
    path.startsWith('/icons/') ||
    path.startsWith('/logos/') ||
    path.startsWith('/avatars/') ||
    path.startsWith('/screenshots/') ||
    path.startsWith('/scripts/') ||
    path.startsWith('/apple-icon') ||
    /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|woff2?|ttf|otf|css|js|mjs|wasm|wav|mp3|ogg|m4a|flac|aac|webm|mp4|mov)$/i.test(path);
  if (isStatic && !path.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const hit = await cache.match(req, { ignoreSearch: true });
        if (hit) {
          // v20: media consumers (audio/video elements, Range requests) get
          // range-aware serving with clean headers — full playback + seeking
          // offline. Cached-by-warmPackMedia entries are already sanitized;
          // entries cached by the put below are sanitized too.
          if (isMediaRequest(req, path)) {
            try {
              return await serveMediaFromCache(
                hit.headers.get('content-length') && !hit.headers.get('content-encoding')
                  ? hit
                  : await sanitizedMediaResponse(hit),
                req,
              );
            } catch { return hit; }
          }
          return hit;
        }
        try {
          const res = await fetch(req);
          if (res.ok && (res.type === 'basic' || res.type === 'default')) {
            // v20: sanitize media before caching (gateway lies with
            // content-encoding: br over decoded bodies).
            const toStore = isMediaRequest(req, path)
              ? await sanitizedMediaResponse(res)
              : res.clone();
            await cache.put(req, toStore);
            await trimCache(RUNTIME_CACHE, 200);
          }
          return res;
        } catch {
          return hit || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  /* ── API GET: network-first, cache fallback, honest 503 ── */
  if (path.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);
        try {
          const res = await fetch(req);
          if (res.ok && req.method === 'GET') {
            await cache.put(req, res.clone());
            await trimCache(API_CACHE, MAX_API_CACHE_ENTRIES);
          }
          // Gateway-level failure (backend down / bad gateway / sandbox
          // restart): serve the stale cached copy rather than an error.
          // App-level 4xx/500s pass through untouched.
          if (GATEWAY_STATUSES.has(res.status) && req.method === 'GET') {
            const stale = await cache.match(req, { ignoreSearch: false });
            if (stale) {
              const headers = new Headers(stale.headers);
              headers.set('x-medq-offline-cache', '1');
              return new Response(stale.body, { status: stale.status, statusText: stale.statusText, headers });
            }
            // No exact cache hit — synthesize /api/questions from the pack
            // so the bank keeps browsing through gateway outages.
            if (path === '/api/questions') {
              const synth = await synthesizeQuestionsResponse(url);
              if (synth) return synth;
            }
          }
          return res;
        } catch {
          const hit = await cache.match(req, { ignoreSearch: false });
          if (hit) {
            // Serve the cached copy, stamped so the app can tell it's stale.
            const headers = new Headers(hit.headers);
            headers.set('x-medq-offline-cache', '1');
            return new Response(hit.body, { status: hit.status, statusText: hit.statusText, headers });
          }
          // Offline + no exact cache hit for the bank list → answer from the
          // warmed pack (same filters/search/pagination as the live route).
          if (path === '/api/questions') {
            const synth = await synthesizeQuestionsResponse(url);
            if (synth) return synth;
          }
          return offlineApiResponse(req.url);
        }
      })()
    );
    return;
  }

  /* ── Navigations: network-first → cached REAL page → offline shell ── */
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cacheKey = new Request(path, { method: 'GET' });
        const cache = await caches.open(RUNTIME_CACHE);
        const isBank = path === '/bank' || path.startsWith('/bank/');
        try {
          const res = await fetch(req);
          if (res.ok) {
            await cache.put(cacheKey, res.clone());
            await trimCache(RUNTIME_CACHE, 200);
            // Warm the offline pack while we know the network is up.
            if (isBank) event.waitUntil(warmOfflineBank());
            return res;
          } else if (GATEWAY_STATUSES.has(res.status)) {
            // Gateway down (sandbox restart / bad gateway). 500s pass
            // through so app errors stay visible.
            const page = await cache.match(cacheKey, { ignoreSearch: true });
            if (page) return page;
            if (isBank) {
              const shell = await offlineBankPage();
              if (shell) return shell;
            }
          }
          return res;
        } catch {
          // Network unreachable (true offline). v18: the CACHED REAL page
          // comes first — on a production build it hydrates offline (no HMR
          // websocket). The static offline-bank shell is only a fallback for
          // first runs that never cached the real page.
          const page = await cache.match(cacheKey, { ignoreSearch: true });
          if (page) return page;
          if (isBank) {
            const shell = await offlineBankPage();
            if (shell) return shell;
          }
          const shellCache = await caches.open(SHELL_CACHE);
          const offlinePage = await shellCache.match(OFFLINE_URL, { ignoreSearch: true });
          return offlinePage || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
        }
      })()
    );
    return;
  }
});
