/**
 * MedQ — Global resilience script
 *
 * Handles chunk-load failures and next-auth fetch errors when the dev
 * server OOMs and restarts.
 *   - Intercepts fetch to Next static chunks → retries with cache-bust
 *   - Intercepts <script> tag errors for chunk URLs → retry or reload
 *   - Catches ChunkLoadError from dynamic import() → reload page
 *   - Catches next-auth JSON parse failures → retry after short delay
 *
 * OFFLINE SAFETY:
 *   All auto-reload paths check navigator.onLine FIRST. If the user is
 *   offline, we DO NOT reload — the page would just try to fetch the
 *   same chunks, fail again, and reload again → infinite storm. The SW
 *   will serve cached chunks if available; if not, the ChunkErrorBoundary
 *   in AppEntry shows a "You're offline" panel with a Retry button.
 *
 * RELOAD-STORM GUARD:
 *   A sessionStorage-based throttle. The FIRST chunk-failure reload is
 *   allowed (and timestamped in sessionStorage). Any subsequent
 *   chunk-failure reload attempt within 60s is BLOCKED — we let the
 *   ChunkErrorBoundary show its offline panel instead. The 60s window
 *   is long enough to break any tight reload loop but short enough that
 *   a real server recovery is picked up on the next manual retry.
 */
(function () {
  var MAX_RETRIES = 2;
  var retryCount = {};
  var origFetch = window.fetch;

  // ── Reload-storm guard ──────────────────────────────────────
  var CHUNK_RELOAD_KEY = 'medq:chunk-reload-at';
  var CHUNK_RELOAD_WINDOW_MS = 60000;

  function isOffline() {
    try {
      return typeof navigator !== 'undefined' && navigator.onLine === false;
    } catch (e) {
      return false;
    }
  }

  function shouldThrottleChunkReload() {
    try {
      var last = sessionStorage.getItem(CHUNK_RELOAD_KEY);
      if (!last) return false;
      var ts = parseInt(last, 10);
      if (!isFinite(ts)) return false;
      return Date.now() - ts < CHUNK_RELOAD_WINDOW_MS;
    } catch (e) {
      return false;
    }
  }

  function markChunkReload() {
    try {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
    } catch (e) {
      /* ignore */
    }
  }

  function safeChunkReload(delayMs, reason) {
    setTimeout(function () {
      if (isOffline()) {
        console.warn(
          '[MedQ] Chunk reload skipped — navigator reports offline. Error boundary will handle it.'
        );
        return;
      }
      if (shouldThrottleChunkReload()) {
        console.warn(
          '[MedQ] Chunk reload throttled — already reloaded within ' +
            CHUNK_RELOAD_WINDOW_MS / 1000 +
            's (' +
            reason +
            '). Error boundary will handle it.'
        );
        return;
      }
      markChunkReload();
      console.log('[MedQ] Reloading page for chunk failure (' + reason + ')');
      window.location.reload();
    }, delayMs);
  }

  function notifySwOnline() {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'medq:client-online' });
      }
    } catch (e) {
      /* ignore */
    }
  }

  function notifySwOffline() {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'medq:client-offline' });
      }
    } catch (e) {
      /* ignore */
    }
  }

  // As soon as the browser fires 'online', ping the SW so it resets
  // its _lastFetchFailAt flag immediately.
  window.addEventListener('online', function () {
    notifySwOnline();
  });
  window.addEventListener('offline', function () {
    notifySwOffline();
  });

  // Report initial state once, so the SW's counter is accurate even on
  // first load (before React hydrates).
  window.addEventListener('load', function () {
    if (typeof navigator !== 'undefined') {
      if (navigator.onLine) notifySwOnline();
      else notifySwOffline();
    }
  });

  // 1. Fetch interceptor: retry chunk requests and auth session requests
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
    return origFetch
      .apply(this, arguments)
      .then(function (response) {
        // If auth session endpoint returned HTML (server down → Caddy fallback)
        if (
          url.indexOf('/api/auth/session') >= 0 &&
          response.headers.get('content-type') &&
          response.headers.get('content-type').indexOf('text/html') >= 0
        ) {
          var key = url.split('?')[0];
          retryCount[key] = (retryCount[key] || 0) + 1;
          if (retryCount[key] <= MAX_RETRIES && !isOffline()) {
            return new Promise(function (resolve) {
              setTimeout(function () {
                var sep = url.indexOf('?') >= 0 ? '&' : '?';
                resolve(origFetch(url + sep + '_retry=' + Date.now(), init));
              }, 3000);
            });
          }
        }
        return response;
      })
      .catch(function (err) {
        // Chunk fetch failed → retry with cache-bust ONLY if online.
        if (url.indexOf('/_next/static/chunks/') >= 0 && !isOffline()) {
          var key = url.split('?')[0];
          retryCount[key] = (retryCount[key] || 0) + 1;
          if (retryCount[key] <= MAX_RETRIES) {
            var sep = url.indexOf('?') >= 0 ? '&' : '?';
            return origFetch(url + sep + '_retry=' + Date.now(), init);
          }
        }
        throw err;
      });
  };

  // 2. Script tag error handler (for dynamic imports via script tags)
  window.addEventListener(
    'error',
    function (e) {
      var target = e.target;
      if (
        target &&
        target.tagName === 'SCRIPT' &&
        target.src &&
        target.src.indexOf('/_next/static/chunks/') >= 0
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (isOffline()) return;
        var key = target.src.split('?')[0];
        retryCount[key] = (retryCount[key] || 0) + 1;
        if (retryCount[key] <= MAX_RETRIES) {
          var newScript = document.createElement('script');
          newScript.src =
            target.src + (target.src.indexOf('?') >= 0 ? '&' : '?') + '_retry=' + Date.now();
          newScript.async = true;
          target.parentNode.replaceChild(newScript, target);
        } else {
          safeChunkReload(2000, 'script-tag retry exhausted');
        }
      }
    },
    true
  );

  // 3. Global error handler for ChunkLoadError from dynamic import()
  window.addEventListener('error', function (e) {
    var msg = e.message || '';
    if (msg.indexOf('Loading chunk') >= 0 || msg.indexOf('ChunkLoadError') >= 0) {
      e.preventDefault();
      if (isOffline()) return;
      safeChunkReload(3000, 'ChunkLoadError error event');
    }
  });

  // 4. Unhandled promise rejection handler for dynamic import failures
  window.addEventListener('unhandledrejection', function (e) {
    var reason = e.reason;
    var msg = (reason && (reason.message || reason.stack || String(reason))) || '';
    if (msg.indexOf('Loading chunk') >= 0 || msg.indexOf('ChunkLoadError') >= 0) {
      e.preventDefault();
      if (isOffline()) return;
      safeChunkReload(3000, 'ChunkLoadError unhandledrejection');
    }
  });
})();
