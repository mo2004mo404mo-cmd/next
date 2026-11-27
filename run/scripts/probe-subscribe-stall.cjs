/**
 * Focused probe: WHY does pushManager.subscribe()'s promise stall >60s on
 * the full app page (subscription IS created browser-side) while the same
 * call resolved quickly in last session's script?
 *
 * Hypothesis: the app's ServiceWorkerRegistrar (register + update() +
 * postMessage dance on every mount) interferes with the subscribe handshake
 * on the SAME registration. Last session's script subscribed on /login (no
 * app shell → no registrar) after a manual register().
 *
 * Probe A: full app page (/) — registrar active — timed subscribe.
 * Probe B: bare page with manual register only — timed subscribe.
 *
 * Usage: node scripts/probe-subscribe-stall.cjs
 */
const { execSync, spawn } = require('child_process');
const http = require('http');

const CHROME = '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome';
const PROFILE = '/tmp/medq-probe-profile';
const DEBUG_PORT = 9345;
const BASE = 'http://localhost:3000';

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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function evalInPage(cdp, expression, timeoutMs = 130000) {
  const deadline = Date.now() + timeoutMs;
  let lastErr;
  while (Date.now() < deadline) {
    try {
      const res = await cdp.call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (res.exceptionDetails) return { __error: (res.exceptionDetails.exception?.description || res.exceptionDetails.text || '').slice(0, 400) };
      return res.result.value;
    } catch (e) { lastErr = e; await sleep(300); }
  }
  return { __error: 'eval timeout: ' + (lastErr ? lastErr.message : '?') };
}

const SUBSCRIBE_JS = `(async () => {
  const t0 = performance.now();
  const vapid = await (await fetch('/api/push/vapid-public')).json();
  const reg = await navigator.serviceWorker.ready;
  const tReady = performance.now() - t0;
  function urlBase64ToUint8Array(base64Url) {
    const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const bytes = new Uint8Array(new ArrayBuffer(raw.length));
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return bytes;
  }
  // RACE the subscribe against an in-page timeout so this eval ALWAYS
  // returns — the whole point of the probe is measuring the stall.
  let sub = null, subErr = null, stalled = false;
  try {
    sub = await Promise.race([
      reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapid.publicKey) }),
      new Promise((_, rej) => setTimeout(() => { stalled = true; rej(new Error('PROBE-STALLED-90s')); }, 90000)),
    ]);
  } catch (e) { subErr = String(e && e.message || e); }
  const tSub = performance.now() - t0;
  const existing = await reg.pushManager.getSubscription();
  return {
    readyMs: Math.round(tReady),
    subscribeMs: sub ? Math.round(tSub) : (stalled ? '>90000' : Math.round(tSub)),
    stalled: stalled,
    subscribeError: subErr,
    hasSubAfter: !!existing,
    endpoint: existing ? existing.endpoint.slice(0, 55) : null,
  };
})()`;

async function main() {
  execSync('rm -rf ' + PROFILE);
  const xvfb = spawn('Xvfb', [':99', '-screen', '0', '1280x800x24'], { stdio: 'ignore' });
  await sleep(700);
  const chrome = spawn(CHROME, [
    '--remote-debugging-port=' + DEBUG_PORT, '--no-first-run', '--no-default-browser-check',
    '--disable-popup-blocking', '--disable-sync', '--user-data-dir=' + PROFILE,
    '--window-size=1280,800', '--no-sandbox', '--disable-dev-shm-usage', 'about:blank',
  ], { env: { ...process.env, DISPLAY: ':99' }, stdio: 'ignore' });

  let version = null;
  for (let i = 0; i < 30; i++) {
    try { version = await getJSON('/json/version'); break; } catch { await sleep(400); }
  }
  if (!version) { console.log('FATAL: no chrome'); process.exit(1); }

  try {
    // ── PROBE A: full app page (registrar active) ───────────────────
    const bws = await CDP.connect(version.webSocketDebuggerUrl);
    const { targetId: tA } = await bws.call('Target.createTarget', { url: 'about:blank' });
    bws.close();
    const listA = await getJSON('/json/list');
    const cdpA = await CDP.connect(listA.find((t) => t.id === tA).webSocketDebuggerUrl);
    await cdpA.call('Page.enable');
    await cdpA.call('Runtime.enable');
    await cdpA.call('Browser.grantPermissions', { permissions: ['notifications'], origin: BASE });
    await cdpA.call('Page.navigate', { url: BASE + '/' });
    // wait for SW controlling (registrar warmup incl. takeover reload)
    const deadline = Date.now() + 40000;
    let controlled = false;
    while (Date.now() < deadline) {
      const r = await evalInPage(cdpA, `(async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        return !!(navigator.serviceWorker.controller && reg && reg.active);
      })()`, 10000);
      if (r === true) { controlled = true; break; }
      await sleep(500);
    }
    console.log('PROBE A (app page /) SW controlled:', controlled);
    await sleep(3000); // let registrar's update()/postMessage dance settle
    const resA = await evalInPage(cdpA, SUBSCRIBE_JS);
    console.log('PROBE A subscribe result:', JSON.stringify(resA));
    cdpA.close();

    // ── PROBE B: bare page — SAME tab navigated to a non-shell route with
    // manual registration only. We use a 404-ish light route? No — use
    // about:blank can't register cross-origin. Use /api/auth/csrf? That's
    // JSON. Best available light page: /login (standalone auth page).
    const bws2 = await CDP.connect(version.webSocketDebuggerUrl);
    const { targetId: tB } = await bws2.call('Target.createTarget', { url: 'about:blank' });
    bws2.close();
    const listB = await getJSON('/json/list');
    const cdpB = await CDP.connect(listB.find((t) => t.id === tB).webSocketDebuggerUrl);
    await cdpB.call('Page.enable');
    await cdpB.call('Runtime.enable');
    // NOTE: notification permission was already granted for this origin;
    // SW from probe A is registered at scope '/' and already active → the
    // /login page (no registrar) inherits it once controlled… but a fresh
    // load of /login is controlled automatically (same origin, scope /).
    await cdpB.call('Page.navigate', { url: BASE + '/login' });
    await sleep(5000);
    const resB = await evalInPage(cdpB, SUBSCRIBE_JS);
    console.log('PROBE B subscribe result (login page, no registrar):', JSON.stringify(resB));
    cdpB.close();
  } finally {
    chrome.kill();
    xvfb.kill();
    await sleep(500);
    try { execSync('rm -rf ' + PROFILE); } catch { /* ignore */ }
  }
}
main().catch((e) => { console.error('FATAL:', e); process.exit(1); });
