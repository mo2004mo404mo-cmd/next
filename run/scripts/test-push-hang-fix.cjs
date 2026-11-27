/**
 * E2E test for the "System Push Notifications stuck on Working…" fix.
 *
 * REPRODUCES THE REPORTED BUG:
 *   The user toggled "System Push Notifications" ON from inside the preview
 *   frame (app embedded in an iframe). No service worker is ever registered
 *   in iframes (ServiceWorkerRegistrar skips them), so the old
 *   usePushNotifications.enable() awaited navigator.serviceWorker.ready —
 *   a promise that NEVER resolves — leaving the toggle spinning on
 *   "Working…" forever.
 *
 * THE FIX UNDER TEST (2026-10-22):
 *   A. detectUnavailableContext() mirrors the registrar's skip logic →
 *      the hook reports supported:false + unavailableReason:'iframe' up
 *      front; the toggle renders DISABLED with the honest message
 *      "Not available inside the preview frame — …" and enable() refuses
 *      immediately (no await → no hang).
 *   B. withTimeout() guards `serviceWorker.ready` (15s) and
 *      `pushManager.subscribe` (20s) so the busy spinner can never stick.
 *
 * PART A — iframe scenario (the reported bug):
 *   wrapper page on :3999 embeds the app (localhost:3000) cross-origin in
 *   an iframe → app auto-authenticated (shared cookie jar) → open Settings
 *   via medq-agent-open-dialog → assert honest message + disabled switch +
 *   NO "Working…" (previously: infinite spinner) + force-click is a no-op.
 *
 * PART B — top-level regression (real subscription path through the NEW
 *   enable()): localhost:3000 top-level tab → click the actual switch in
 *   the Settings dialog → permission pre-granted via CDP → real FCM
 *   subscription → UI flips to "Active —" → toggle OFF → back to idle.
 *
 * Prereqs: app server on :3000, Xvfb (started here), Chrome at the
 * agent-browser path. Usage: node scripts/test-push-hang-fix.cjs
 */

const { execSync, spawn } = require('child_process');
const http = require('http');

const CHROME = '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome';
const PROFILE = '/tmp/medq-push-hang-profile';
const DEBUG_PORT = 9344;
const WRAP_PORT = 3999;
const BASE = 'http://localhost:3000';
const ORIGIN = 'http://localhost:3000';
const WRAP = `http://localhost:${WRAP_PORT}/`;

const TIMEOUTS = { boot: 30000, toggle: 35000, settle: 15000 };

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
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.listeners = []; this.contexts = new Map(); }
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
        if (msg.method === 'Runtime.executionContextCreated') {
          const ctx = msg.params.context;
          if (ctx.auxData) cdp.contexts.set(ctx.id, ctx);
        }
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

// Evaluate in the page main world. Retries across navigations ("Execution
// context was destroyed" during reloads).
async function evalInPage(cdp, expression, { timeoutMs = 20000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastErr;
  while (Date.now() < deadline) {
    try {
      const res = await cdp.call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (res.exceptionDetails) {
        return { __error: res.exceptionDetails.exception?.description || res.exceptionDetails.text };
      }
      return res.result.value;
    } catch (e) {
      lastErr = e;
      await sleep(400);
    }
  }
  return { __error: 'eval timeout: ' + (lastErr ? lastErr.message : 'unknown') };
}

// Evaluate inside the app iframe (execution context of the child frame).
async function evalInFrame(topCdp, expression, { timeoutMs = 25000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastWhy = 'no frame yet';
  while (Date.now() < deadline) {
    try {
      const tree = await topCdp.call('Page.getFrameTree');
      const frames = [];
      (function walk(node) {
        if (!node) return;
        if (node.frame) frames.push(node.frame);
        (node.childFrames || []).forEach(walk);
      })(tree.frameTree);
      const appFrame = frames.find((f) => f.url && f.url.startsWith('http://localhost:3000'));
      if (!appFrame) { lastWhy = 'app frame not in tree yet'; await sleep(300); continue; }
      // find the default world context for that frame
      let ctx = null;
      for (const [id, c] of topCdp.contexts) {
        if (c.auxData && c.auxData.frameId === appFrame.id && c.auxData.isDefault) { ctx = c; break; }
      }
      if (!ctx) {
        // ask for contexts to be (re)surfaced
        try { await topCdp.call('Runtime.enable'); } catch { /* already enabled */ }
        lastWhy = 'no execution context for app frame yet';
        await sleep(300);
        continue;
      }
      const res = await topCdp.call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, contextId: ctx.id });
      if (res.exceptionDetails) {
        return { __error: res.exceptionDetails.exception?.description || res.exceptionDetails.text };
      }
      return res.result.value;
    } catch (e) {
      lastWhy = e.message;
      await sleep(300);
    }
  }
  return { __error: 'frame eval timeout: ' + lastWhy };
}

// Shared in-page helpers injected before use.
const PAGE_HELPERS = `
  window.__medqFindPushRow = () => {
    const label = [...document.querySelectorAll('p')].find(p => p.textContent.trim() === 'System Push Notifications');
    if (!label) return null;
    const box = label.closest('div.rounded-lg') || label.parentElement.parentElement;
    if (!box) return null;
    const sw = box.querySelector('[role="switch"], button[data-state]');
    const ps = [...box.querySelectorAll('p')].map(p => p.textContent.trim()).filter(Boolean);
    const desc = ps.find(t => t !== 'System Push Notifications') || null;
    const disabled = !sw || sw.disabled === true || sw.hasAttribute('data-disabled') || sw.getAttribute('aria-disabled') === 'true';
    return { hasRow: true, desc: desc, switchDisabled: disabled, checked: sw ? (sw.getAttribute('aria-checked') || sw.dataset.state) : null };
  };
  window.__medqOpenSettings = () => {
    window.dispatchEvent(new CustomEvent('medq-agent-open-dialog', { detail: { dialogId: 'settings' } }));
  };
  window.__medqClickPushSwitch = () => {
    const label = [...document.querySelectorAll('p')].find(p => p.textContent.trim() === 'System Push Notifications');
    if (!label) return 'no-row';
    const box = label.closest('div.rounded-lg') || label.parentElement.parentElement;
    const sw = box.querySelector('[role="switch"], button[data-state]');
    if (!sw) return 'no-switch';
    sw.click();
    return 'clicked';
  };
  window.__medqHasWorking = () => !![...document.querySelectorAll('p')].find(p => p.textContent.includes('Working'));
`;

async function waitFor(fn, label, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  let last;
  while (Date.now() < deadline) {
    last = await fn();
    if (last) return last;
    await sleep(400);
  }
  console.log('  (timeout waiting for: ' + label + '; last=' + JSON.stringify(last).slice(0, 200) + ')');
  return null;
}

async function main() {
  // ── Wrapper static server (cross-origin iframe host) ─────────────
  const wrapServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!doctype html><html><head><title>wrap</title></head><body style="margin:0;background:#0c0e14">
<iframe id="app" src="http://localhost:3000/" style="width:1280px;height:790px;border:0;display:block"></iframe>
</body></html>`);
  }).listen(WRAP_PORT, '127.0.0.1');

  // ── Launch Xvfb + headful Chrome ─────────────────────────────────
  execSync('rm -rf ' + PROFILE);
  const xvfb = spawn('Xvfb', [':99', '-screen', '0', '1280x800x24'], { stdio: 'ignore' });
  await sleep(700);
  const chrome = spawn(CHROME, [
    '--remote-debugging-port=' + DEBUG_PORT,
    '--no-first-run', '--no-default-browser-check',
    '--disable-popup-blocking', '--disable-sync',
    '--user-data-dir=' + PROFILE,
    '--window-size=1280,800',
    '--no-sandbox', '--disable-dev-shm-usage',
    'about:blank',
  ], { env: { ...process.env, DISPLAY: ':99' }, stdio: 'ignore' });

  let version = null;
  for (let i = 0; i < 30; i++) {
    try { version = await getJSON('/json/version'); break; } catch { await sleep(400); }
  }
  assert(!!version, 'Chrome headful launched under Xvfb with CDP on :' + DEBUG_PORT);

  try {
    // create the main tab
    const bws = await CDP.connect(version.webSocketDebuggerUrl);
    const { targetId } = await bws.call('Target.createTarget', { url: 'about:blank' });
    bws.close();

    const targets = await getJSON('/json/list');
    const target = targets.find((t) => t.id === targetId);
    const cdp = await CDP.connect(target.webSocketDebuggerUrl);
    await cdp.call('Page.enable');
    await cdp.call('Runtime.enable');
    await cdp.call('Log.enable');

    // Collect page console output + exceptions for diagnostics
    const consoleLines = [];
    cdp.on((msg) => {
      try {
        if (msg.method === 'Runtime.consoleAPICalled') {
          const level = msg.params.type;
          const text = (msg.params.args || []).map((a) => a.value !== undefined ? String(a.value) : (a.description || '')).join(' ');
          if (level === 'error' || level === 'warning' || level === 'info' || level === 'log') {
            consoleLines.push('[' + level + '] ' + String(text).slice(0, 300));
          }
        } else if (msg.method === 'Runtime.exceptionThrown') {
          const d = msg.params.exceptionDetails;
          consoleLines.push('[exception] ' + ((d.exception && d.exception.description) || d.text || '').slice(0, 300));
        }
      } catch { /* ignore */ }
    });
    global.__consoleLines = consoleLines;

    // Pre-grant notification permission for the app origin (Part B needs it;
    // harmless for Part A where the context check fires first).
    await cdp.call('Browser.grantPermissions', { permissions: ['notifications'], origin: ORIGIN });
    console.log('notification permission granted via CDP for', ORIGIN);

    // ═══ PART B (runs first so the cookie jar is authenticated for the
    // iframe in Part A) — TOP-LEVEL, real toggle flow ═════════════════
    console.log('\n── PART B: top-level localhost — real toggle through new enable() ──');
    await cdp.call('Page.navigate', { url: BASE + '/' });
    await sleep(4000);

    // login as admin (NextAuth credentials, in-page)
    const login = await evalInPage(cdp, `(async () => {
      const csrfRes = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfRes.json();
      await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ csrfToken, email: 'admin@medq.com', password: 'test123', callbackUrl: '${BASE}/' }),
        redirect: 'manual',
      });
      const sess = await (await fetch('/api/auth/session')).json();
      return (sess && sess.user && sess.user.email) || null;
    })()`);
    assert(String(login).includes('admin@medq.com'), 'admin login (top-level)');

    // reload so the app boots authenticated; wait for the service worker
    // to be registered + controlling (cold first-visit warmup: install →
    // activate → claim → one-time takeover reload), then interact.
    await evalInPage(cdp, 'location.reload()');
    const swReady = await waitFor(async () => {
      const r = await evalInPage(cdp, `(async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        return { controlled: !!navigator.serviceWorker.controller, hasReg: !!reg,
                 active: !!(reg && reg.active), perm: (typeof Notification !== 'undefined' ? Notification.permission : 'n/a') };
      })()`);
      return r && r.controlled && r.active ? r : null;
    }, 'service worker controlling the page', 30000);
    assert(!!swReady, 'service worker active + controlling after boot');
    console.log('  sw state:', JSON.stringify(swReady));
    await sleep(2000); // settle past any takeover reload

    await evalInPage(cdp, PAGE_HELPERS);

    let rowB = null;
    for (let attempt = 0; attempt < 6 && !rowB; attempt++) {
      await evalInPage(cdp, 'window.__medqOpenSettings()');
      rowB = await waitFor(async () => (await evalInPage(cdp, 'window.__medqFindPushRow()')), 'settings dialog open (top-level)', 6000);
    }
    assert(!!rowB && rowB.hasRow, 'Settings dialog shows "System Push Notifications" row');
    console.log('  initial state:', JSON.stringify(rowB));
    assert(rowB && rowB.desc === 'Get reminders for daily challenge, friend requests, and more', 'honest idle description on a supported origin');
    assert(rowB && rowB.switchDisabled === false, 'switch is ENABLED on a supported origin');

    // click the real switch → new enable() → real FCM subscription
    const clickRes = await evalInPage(cdp, 'window.__medqClickPushSwitch()');
    console.log('  click result:', clickRes);

    const activeRow = await waitFor(async () => {
      const r = await evalInPage(cdp, `(() => {
        const row = window.__medqFindPushRow();
        const toasts = [...document.querySelectorAll('[data-sonner-toast]')].map(t => t.textContent.trim()).join(' | ');
        const pushResources = performance.getEntriesByType('resource')
          .filter(e => e.name.includes('/api/push/'))
          .map(e => (e.name.replace(location.origin, '')) + ' -> ' + (e.responseStatus || '?') + ' (' + Math.round(e.duration) + 'ms)');
        return row ? Object.assign({}, row, { toasts: toasts || null, api: pushResources, url: location.pathname }) : null;
      })()`);
      return r && r.desc && r.desc.startsWith('Active') ? r : null;
    }, 'toggle ON → Active state', 120000);
    assert(!!activeRow, 'UI flips to "Active — you’ll get notifications even with the tab closed"');
    if (activeRow) console.log('  active state:', JSON.stringify(activeRow));
    if (!activeRow) {
      const diag = await evalInPage(cdp, `(async () => {
        const row = window.__medqFindPushRow();
        const toasts = [...document.querySelectorAll('[data-sonner-toast]')].map(t => t.textContent.trim()).join(' | ');
        const pushResources = performance.getEntriesByType('resource')
          .filter(e => e.name.includes('/api/push/'))
          .map(e => (e.name.replace(location.origin, '')) + ' -> ' + (e.responseStatus || '?') + ' (' + Math.round(e.duration) + 'ms)');
        return { row, toasts, api: pushResources, url: location.pathname, lsEnabled: localStorage.getItem('medq-push-enabled') };
      })()`);
      console.log('  DIAGNOSTIC DUMP:', JSON.stringify(diag, null, 2));
      console.log('  PAGE CONSOLE (last 40):');
      (global.__consoleLines || []).slice(-40).forEach((l) => console.log('   ' + l));
    }

    const afterEnable = await evalInPage(cdp, `(async () => {
      await new Promise(r => setTimeout(r, 1500));
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = reg ? await reg.pushManager.getSubscription() : null;
      return {
        hasSubscription: !!sub,
        endpointHost: sub ? new URL(sub.endpoint).host : null,
        working: !![...document.querySelectorAll('p')].find(p => p.textContent.includes('Working')),
        lsEnabled: localStorage.getItem('medq-push-enabled'),
      };
    })()`);
    console.log('  after enable:', JSON.stringify(afterEnable));
    assert(afterEnable.hasSubscription === true, 'real browser push subscription exists (via UI toggle)');
    assert(!afterEnable.working, 'busy spinner cleared after enable (no stuck "Working…")');
    assert(afterEnable.lsEnabled === 'true', 'localStorage intent flag persisted');

    // toggle OFF through the UI → disable() → unsubscribe + server cleanup.
    // Only click when the row is genuinely in the Active state — otherwise a
    // failed enable() would turn this click into a second (spurious) enable.
    const canClickOff = await waitFor(async () => {
      const r = await evalInPage(cdp, 'window.__medqFindPushRow()');
      return r && r.desc && r.desc.startsWith('Active') && r.switchDisabled === false ? r : null;
    }, 'Active + busy cleared before click-off', 15000);
    assert(!!canClickOff, 'row is Active and switch re-enabled before disable click');
    await evalInPage(cdp, 'window.__medqClickPushSwitch()');
    const idleRow = await waitFor(async () => {
      const r = await evalInPage(cdp, 'window.__medqFindPushRow()');
      return r && r.desc && r.desc.startsWith('Get reminders') ? r : null;
    }, 'toggle OFF → idle state', 25000);
    assert(!!idleRow, 'UI returns to idle description after disable');

    const afterDisable = await evalInPage(cdp, `(async () => {
      // disable() can legitimately take a moment (unsubscribe + POST);
      // poll until the busy spinner is gone (hard cap: disable's own
      // 15s ready-timeout).
      const deadline = Date.now() + 20000;
      while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, 500));
        const working = !![...document.querySelectorAll('p')].find(p => p.textContent.includes('Working'));
        if (!working) break;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = reg ? await reg.pushManager.getSubscription() : null;
      const working = !![...document.querySelectorAll('p')].find(p => p.textContent.includes('Working'));
      return { hasSubscription: !!sub, working: working, lsEnabled: localStorage.getItem('medq-push-enabled') };
    })()`);
    console.log('  after disable:', JSON.stringify(afterDisable));
    assert(afterDisable.hasSubscription === false, 'browser unsubscribed after disable');
    assert(!afterDisable.working, 'no spinner after disable');

    // close the dialog for cleanliness
    await evalInPage(cdp, `(async () => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return 'esc'; })()`);

    // ═══ PART A — THE REPORTED BUG: app inside an iframe ═════════════
    console.log('\n── PART A: iframe (preview-frame) — the reported stuck-"Working…" scenario ──');
    // new tab hosting the wrapper
    const bws2 = await CDP.connect(version.webSocketDebuggerUrl);
    const { targetId: wrapId } = await bws2.call('Target.createTarget', { url: WRAP });
    bws2.close();
    await sleep(1000);
    const targets2 = await getJSON('/json/list');
    const wrapTarget = targets2.find((t) => t.id === wrapId);
    const wrapCdp = await CDP.connect(wrapTarget.webSocketDebuggerUrl);
    await wrapCdp.call('Page.enable');
    await wrapCdp.call('Runtime.enable');
    await wrapCdp.call('Runtime.enable'); // ensure context events flow

    // app frame should boot already authenticated (shared cookie jar)
    const iframeBooted = await waitFor(async () => {
      const r = await evalInFrame(wrapCdp, `(() => ({ header: !!document.querySelector('header'), url: location.href, ready: document.readyState }))()`);
      return r && r.header === true ? r : null;
    }, 'app booted inside iframe', TIMEOUTS.boot);
    assert(!!iframeBooted, 'app shell booted inside the iframe (session carried over)');
    if (iframeBooted) console.log('  iframe app url:', iframeBooted.url);

    await evalInFrame(wrapCdp, PAGE_HELPERS);

    let rowA = null;
    for (let attempt = 0; attempt < 6 && !rowA; attempt++) {
      await evalInFrame(wrapCdp, 'window.__medqOpenSettings()');
      rowA = await waitFor(async () => (await evalInFrame(wrapCdp, 'window.__medqFindPushRow()')), 'settings dialog open (iframe)', 6000);
    }
    assert(!!rowA && rowA.hasRow, 'Settings dialog renders inside the iframe');
    console.log('  iframe push row state:', JSON.stringify(rowA));
    assert(rowA && rowA.desc === 'Not available inside the preview frame — open the app in a standalone browser tab',
      'honest iframe message shown (was: "Get reminders…" + infinite spinner)');
    assert(rowA && rowA.switchDisabled === true, 'switch is DISABLED inside the iframe — cannot start the hanging flow');

    // force-click the disabled switch → must be a no-op, NO Working… ever
    const forceClick = await evalInFrame(wrapCdp, 'window.__medqClickPushSwitch()');
    console.log('  force-click on disabled switch:', forceClick);
    await sleep(4000); // the OLD bug showed "Working…" immediately and forever
    const stuckCheck = await evalInFrame(wrapCdp, `(() => ({
      working: !![...document.querySelectorAll('p')].find(p => p.textContent.includes('Working')),
      desc: (window.__medqFindPushRow() || {}).desc || null,
      lsEnabled: localStorage.getItem('medq-push-enabled'),
    }))()`);
    console.log('  4s after force-click:', JSON.stringify(stuckCheck));
    assert(stuckCheck.working === false, 'NO "Working…" spinner inside the iframe (the reported bug is fixed)');
    assert(stuckCheck.desc === 'Not available inside the preview frame — open the app in a standalone browser tab',
      'description unchanged after force-click (enable() refused)');
    assert(!stuckCheck.lsEnabled, 'no stale enabled flag in iframe localStorage');

    wrapCdp.close();
    cdp.close();
  } finally {
    chrome.kill();
    xvfb.kill();
    wrapServer.close();
    await sleep(800);
    try { execSync('rm -rf ' + PROFILE); } catch { /* chrome teardown race — leave dir */ }
  }

  console.log(process.exitCode ? '\n=== PUSH HANG-FIX E2E: SOME CHECKS FAILED ===' : '\n=== PUSH HANG-FIX E2E: ALL CHECKS PASSED ===');
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
