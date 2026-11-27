/**
 * REAL end-to-end Web Push test — headful Chrome under Xvfb + CDP.
 *
 * Why headful: headless Chrome hard-denies notification permission, which
 * blocks pushManager.subscribe. Under Xvfb the permission can be granted
 * via CDP Browser.grantPermissions, and Chrome talks to the REAL push
 * service (FCM) — so this exercises the genuine production path:
 *
 *   page → pushManager.subscribe (real FCM endpoint)
 *        → POST /api/push/subscribe (server stores it)
 *   admin POST /api/push/send
 *        → web-push VAPID-signed POST to fcm.googleapis.com
 *        → FCM → Chrome → SW 'push' event → showNotification
 *        → page receives 'medq:push-received' from the SW
 *
 * Prereqs:
 *   - Xvfb running on :99  (scripts start/stop it around this script)
 *   - Chrome binary at /home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome
 *   - App server on :3000 (any CA config — FCM has a real cert)
 *
 * Usage: node scripts/test-push-real-e2e.cjs
 */

const { execSync, spawn } = require('child_process');
const http = require('http');

const CHROME = '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome';
const PROFILE = '/tmp/medq-push-e2e-profile';
const DEBUG_PORT = 9333;
const BASE = 'http://localhost:3000';
const ORIGIN = 'http://localhost:3000';

function assert(cond, label) {
  console.log((cond ? 'PASS' : 'FAIL') + ' — ' + label);
  if (!cond) process.exitCode = 1;
}

function getJSON(path) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: DEBUG_PORT, path }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.listeners = []; }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const cdp = new CDP(ws);
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data.toString());
      if (msg.id && cdp.pending.has(msg.id)) {
        const { resolve, reject } = cdp.pending.get(msg.id);
        cdp.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method) {
        for (const l of cdp.listeners) l(msg);
      }
    };
    return cdp;
  }
  call(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  on(fn) { this.listeners.push(fn); }
  close() { this.ws.close(); }
}

async function main() {
  // ── Launch Xvfb + Chrome (headful) ────────────────────────────────
  execSync('rm -rf ' + PROFILE);
  const xvfb = spawn('Xvfb', [':99', '-screen', '0', '1280x800x24'], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 700));
  const chrome = spawn(CHROME, [
    '--remote-debugging-port=' + DEBUG_PORT,
    '--no-first-run', '--no-default-browser-check',
    '--disable-popup-blocking', '--disable-sync',
    '--user-data-dir=' + PROFILE,
    '--window-size=1280,800',
    '--no-sandbox', '--disable-dev-shm-usage',
    'about:blank',
  ], { env: { ...process.env, DISPLAY: ':99' }, stdio: 'ignore' });

  // Wait for CDP
  let version = null;
  for (let i = 0; i < 30; i++) {
    try { version = await getJSON('/json/version'); break; } catch { await new Promise((r) => setTimeout(r, 400)); }
  }
  assert(!!version, 'Chrome headful launched under Xvfb with CDP on :' + DEBUG_PORT);

  try {
    // ── Open the app ─────────────────────────────────────────────────
    const { targetId } = await new Promise(async (resolve, reject) => {
      // create a target via the browser WS
      const bws = await CDP.connect(version.webSocketDebuggerUrl);
      const t = await bws.call('Target.createTarget', { url: 'about:blank' });
      bws.close();
      resolve(t);
    });

    const pageTargets = await getJSON('/json/list');
    const target = pageTargets.find((t) => t.id === targetId);
    const cdp = await CDP.connect(target.webSocketDebuggerUrl);
    await cdp.call('Page.enable');
    await cdp.call('Runtime.enable');

    // Grant notification permission for the origin BEFORE navigating.
    await cdp.call('Browser.grantPermissions', {
      permissions: ['notifications'],
      origin: ORIGIN,
    });
    console.log('notification permission granted via CDP');

    await cdp.call('Page.navigate', { url: BASE + '/login' });
    await new Promise((r) => setTimeout(r, 3500));

    // ── Helper: evaluate an async expression in the page ────────────
    async function evalInPage(expression) {
      const res = await cdp.call('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (res.exceptionDetails) {
        return { __error: res.exceptionDetails.exception?.description || res.exceptionDetails.text };
      }
      return res.result.value;
    }

    const perm = await evalInPage('Notification.permission');
    console.log('Notification.permission after grant + navigate:', perm);
    assert(perm === 'granted', 'notification permission granted in headful Chrome');

    // ── Log in as admin (NextAuth credentials flow, in-page) ────────
    const loginResult = await evalInPage(`(async () => {
      const csrfRes = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfRes.json();
      const cb = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ csrfToken, email: 'admin@medq.com', password: 'test123', callbackUrl: '${BASE}/' }),
        redirect: 'manual',
      });
      // redirect:'manual' → opaqueredirect: status 0 and headers hidden, but
      // the browser still processed the 30x + Set-Cookie. Verify by reading
      // the session back from the server.
      const sess = await (await fetch('/api/auth/session')).json();
      return JSON.stringify({ cbStatus: cb.status, type: cb.type, sessionUser: (sess && sess.user && sess.user.email) || null });
    })()`);
    console.log('login:', loginResult);
    assert(String(loginResult).includes('admin@medq.com'), 'admin login in-page (session verified)');

    // ── Subscribe to push (the REAL flow from usePushNotifications) ─
    const subResult = await evalInPage(`(async () => {
      const vapidRes = await fetch('/api/push/vapid-public');
      const { publicKey, enabled } = await vapidRes.json();
      if (!enabled) return { error: 'server push disabled' };

      // Register the SW ourselves (registrar also does this ~800ms after
      // mount, but being explicit avoids the race).
      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;
      await new Promise(r => setTimeout(r, 800)); // let it activate + claim

      function urlBase64ToUint8Array(base64Url) {
        const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
        const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
        const raw = atob(base64);
        const bytes = new Uint8Array(new ArrayBuffer(raw.length));
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
        return bytes;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const subJSON = sub.toJSON();
      const regRes = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subJSON.endpoint, keys: subJSON.keys, userAgent: navigator.userAgent }),
      });
      return {
        endpoint: subJSON.endpoint.slice(0, 60),
        endpointHost: new URL(subJSON.endpoint).host,
        subscribeStatus: regRes.status,
        swActive: !!(await navigator.serviceWorker.getRegistration())?.active,
      };
    })()`);
    console.log('subscribe result:', JSON.stringify(subResult));
    assert(!subResult.__error && subResult.subscribeStatus === 201, 'pushManager.subscribe + server registration');
    if (subResult.__error) console.log('PAGE ERROR:', subResult.__error.slice(0, 200));
    console.log('REAL endpoint host:', subResult.endpointHost);

    // ── Trigger the push (admin send, from the page session) ─────────
    // Also arm a listener for the SW's medq:push-received client message.
    const pushResult = await evalInPage(`(async () => {
      const received = new Promise((resolve) => {
        navigator.serviceWorker.addEventListener('message', function onMsg(e) {
          if (e.data && e.data.type === 'medq:push-received') {
            navigator.serviceWorker.removeEventListener('message', onMsg);
            resolve({ title: e.data.title, body: e.data.body, url: e.data.url });
          }
        });
        setTimeout(() => resolve(null), 25000); // FCM delivery can take a few seconds
      });

      const sendRes = await fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Real E2E push', body: 'FCM round-trip verification', url: '/bank' }),
      });
      const sendJson = await sendRes.json();

      const swMsg = await received;
      const reg = await navigator.serviceWorker.getRegistration();
      const notes = await reg.getNotifications();
      const shown = notes.map(n => ({ title: n.title, body: n.body, url: n.data && n.data.url, tag: n.tag }));
      return { sendJson, swMsg, notifications: shown };
    })()`);
    console.log('push result:', JSON.stringify(pushResult, null, 2).slice(0, 1500));
    assert(pushResult.sendJson && pushResult.sendJson.sent === 1, 'server delivered to FCM endpoint (sent:1)');
    assert(!!pushResult.swMsg, 'SW received push event and messaged the page (medq:push-received)');
    assert((pushResult.notifications || []).some((n) => n.title === 'Real E2E push'),
      'SW displayed the notification (registration.getNotifications)');

    // Cleanup: unsubscribe so the DB doesn't keep the FCM subscription
    await evalInPage(`(async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        const endpoint = sub.endpoint;
        await sub.unsubscribe();
        await fetch('/api/push/unsubscribe', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint }),
        });
      }
      return 'cleaned';
    })()`);

    cdp.close();
  } finally {
    chrome.kill();
    xvfb.kill();
    execSync('rm -rf ' + PROFILE);
  }

  console.log(process.exitCode ? '\n=== REAL E2E: SOME CHECKS FAILED ===' : '\n=== REAL E2E: ALL CHECKS PASSED ===');
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
