"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[21662],{

/***/ 21662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeviceSessionTracker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84507);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66609);
/* harmony import */ var _lib_security_fingerprint_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61634);
/* harmony import */ var _barrel_optimize_names_ShieldAlert_Smartphone_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(69203);
/* harmony import */ var _barrel_optimize_names_ShieldAlert_Smartphone_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95000);
/* __next_internal_client_entry_do_not_use__ default auto */ 
// ─────────────────────────────────────────────────────────────────────────
// DeviceSessionTracker — silent, professional device fingerprint tracker.
// ─────────────────────────────────────────────────────────────────────────
// Mounts once at the app root (AppBootstrap). On sign-in (or app boot when
// already authenticated), it:
//
//   1. Collects a stable device fingerprint (canvas + WebGL + audio + fonts
//      + screen + timezone). No PII, no IP, no cookies.
//   2. POSTs it to /api/security/verify. The server upserts a
//      DeviceFingerprint row and emits SecurityEvent(s) for anomalies
//      (new device, IP change, timezone change).
//   3. Reacts to the response:
//        - new device        → toast.info "New device signed in: Chrome on macOS"
//        - revoked device    → toast.error + force sign-out (account takeover defense)
//        - verified          → silent (the normal case)
//        - collection error  → silent (don't bother the user with telemetry failures)
//
// Re-verifies every 30 minutes (catches session hijacking where a different
// device silently takes over an active session cookie). Also re-verifies on
// window focus after 5 min of background time.
//
// There is NO user-facing settings page for this. The user sees:
//   - A toast when a new device signs in (like GitHub / Google login alerts)
//   - A "Device Security" entry in the user menu that opens a full fingerprint
//     panel (current device, hash breakdown, all known devices, security events)
//   - A critical toast + forced sign-out if their revoked device tries to log in
//
// This is the "professional" approach: transparent security, no UI clutter.
// ─────────────────────────────────────────────────────────────────────────






const REVERIFY_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const REFOCUS_MIN_GAP_MS = 5 * 60 * 1000; // re-verify on focus after 5 min away
async function verifyOnce() {
    let fp;
    try {
        fp = await (0,_lib_security_fingerprint_client__WEBPACK_IMPORTED_MODULE_5__/* .collectFingerprint */ .T)();
    } catch (e) {
        console.warn('[DeviceSessionTracker] collectFingerprint failed:', e);
        return null; // silent — fingerprint collection failure is non-fatal
    }
    try {
        const res = await fetch('/api/security/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fp)
        });
        if (!res.ok) {
            // Surface the failure so it's diagnosable in the browser console.
            // Don't show a toast — the user shouldn't be bothered by telemetry
            // problems — but DO log so a missing device row in the Device Security
            // dialog can be traced back to a 401/403/500 here instead of looking
            // like the feature is silently broken.
            const bodyText = await res.text().catch(()=>'');
            console.warn(`[DeviceSessionTracker] /api/security/verify returned ${res.status} ${res.statusText}`, bodyText ? {
                body: bodyText.slice(0, 200)
            } : '');
            return null;
        }
        const result = await res.json();
        // Broadcast a window event so other components (notably DeviceSecurityDialog
        // and UserMenu) know a DeviceFingerprint row now exists and they can
        // re-fetch /devices. This is the missing link that previously caused the
        // device row to stay hidden even after a successful verify: consumers only
        // polled /devices ONCE on mount, which raced against verify completing.
        if ( true && result?.device) {
            try {
                window.dispatchEvent(new CustomEvent('medq:device-verified', {
                    detail: {
                        fingerprintHash: result.device.fingerprintHash
                    }
                }));
            } catch  {
            // ignore — this is just a hint, not critical
            }
        }
        return result;
    } catch (e) {
        console.warn('[DeviceSessionTracker] /api/security/verify fetch threw:', e);
        return null; // silent — network errors shouldn't bother the user
    }
}
function describeDevice(d) {
    const parts = [];
    if (d.browserGuess && d.browserGuess !== 'Unknown') parts.push(d.browserGuess);
    if (d.osGuess && d.osGuess !== 'Unknown') parts.push(d.osGuess);
    if (parts.length === 0) {
        // Fallback: show location if we have nothing else
        if (d.lastGeo) return `New device signed in (${d.lastGeo})`;
        return 'New device signed in';
    }
    return `New device: ${parts.join(' on ')}`;
}
function DeviceSessionTracker() {
    const { status: sessionStatus } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__/* .useSession */ .wV)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const lastVerifyAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const lastSeenDeviceHashRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const intervalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const focusedAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    // One-time mount log — helps confirm the component actually mounted in
    // the user's browser (visible in their devtools console). Without this,
    // a silently-failed dynamic import or a misconfigured provider tree can
    // make the tracker invisible to debugging.
    // useEffect(() => {
    //   console.info('[DeviceSessionTracker] mounted; sessionStatus =', sessionStatus);
    // }, []);
    // Main verify routine — runs once on login, then every 30 min.
    const runVerify = async (opts)=>{
        const now = Date.now();
        // Throttle: don't re-verify more than once per 30s
        if (now - lastVerifyAtRef.current < 30000 && !opts.isInitial) return;
        lastVerifyAtRef.current = now;
        const result = await verifyOnce();
        if (!result?.device) {
            console.warn('[DeviceSessionTracker] verifyOnce returned no device — Device Security panel will show no current device');
            return;
        }
        const d = result.device;
        // Case 1: revoked device — force sign-out immediately.
        if (d.revoked) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('This device was revoked', {
                description: 'For your safety, you are being signed out. Please contact support if this is unexpected.',
                duration: 8000,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ShieldAlert_Smartphone_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "h-4 w-4 text-red-500"
                })
            });
            // Give the toast a moment to render, then sign out.
            setTimeout(()=>{
                (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__/* .signOut */ .CI)({
                    redirect: false
                }).finally(()=>{
                    router.push('/');
                });
            }, 1500);
            return;
        }
        // Case 2: brand-new device for this user → informational toast (only on initial verify, not periodic).
        if (opts.isInitial && d.isNew && lastSeenDeviceHashRef.current !== d.fingerprintHash) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.info(describeDevice(d), {
                // Telegram-style: "Signed in from Cairo, Egypt" — server-resolved
                // from the request IP, never from client-reported values.
                description: d.lastGeo ? `Signed in from ${d.lastGeo}` : 'Signed in from an unknown location',
                duration: 6000,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ShieldAlert_Smartphone_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    className: "h-4 w-4 text-blue-400"
                })
            });
        }
        // Case 3: device changed since last verify (session hijacking signal).
        // This is rare during a single page session, but can happen if cookies
        // are stolen and the attacker loads the app in a different browser.
        if (lastSeenDeviceHashRef.current && lastSeenDeviceHashRef.current !== d.fingerprintHash) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.warning('Device changed mid-session', {
                description: `Switched from a previously verified device to ${d.browserGuess} on ${d.osGuess}. If this wasn't you, sign out immediately.`,
                duration: 10000,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ShieldAlert_Smartphone_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "h-4 w-4 text-amber-400"
                })
            });
        }
        lastSeenDeviceHashRef.current = d.fingerprintHash;
        // Case 4: verified, known device → silent (no toast).
        // We only show a one-time "session secured" toast on the very first
        // successful verify of a known device, so the user knows the feature
        // is active. After that, it stays silent.
        if (opts.isInitial && !d.isNew && d.trustScore >= 50) {
        // Intentionally subtle — uses 'loading' style which renders as a quiet gray toast.
        // Disabled by default to avoid noise; uncomment if you want a "secured" ping.
        // toast.success('Session secured', { description: `${d.browserGuess} · ${d.osGuess}`, duration: 2500, icon: <ShieldCheck className="h-4 w-4 text-emerald-400" /> });
        }
    };
    // Effect: run on session status change + set up periodic re-verify.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (sessionStatus !== 'authenticated') {
            // Reset state on sign-out so the next sign-in is treated as fresh.
            lastSeenDeviceHashRef.current = null;
            lastVerifyAtRef.current = 0;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }
        //   // Initial verify (slight delay so we don't race with the first /api/auth/session fetch).
        const t = setTimeout(()=>runVerify({
                isInitial: true
            }), 1500);
        //   // Periodic re-verify every 30 min.
        intervalRef.current = setInterval(()=>runVerify({
                isInitial: false
            }), REVERIFY_INTERVAL_MS);
        return ()=>{
            clearTimeout(t);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [
        sessionStatus
    ]);
    // Effect: re-verify on window focus (after being backgrounded for >5 min).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (sessionStatus !== 'authenticated') return;
        const onFocus = ()=>{
            const now = Date.now();
            const gap = now - focusedAtRef.current;
            if (gap >= REFOCUS_MIN_GAP_MS) {
                runVerify({
                    isInitial: false
                });
            }
            focusedAtRef.current = now;
        };
        const onBlur = ()=>{
            focusedAtRef.current = Date.now();
        };
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return ()=>{
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [
        sessionStatus
    ]);
    // This component renders nothing — it's a pure side-effect tracker.
    return null;
}


/***/ }),

/***/ 61634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ collectFingerprint),
/* harmony export */   b: () => (/* binding */ getFingerprintHash)
/* harmony export */ });
// ─────────────────────────────────────────────────────────────────────────
// fingerprint-client.ts
// ─────────────────────────────────────────────────────────────────────────
// Client-side device fingerprint collector.
//
// Collects a stable set of browser signals (no cookies, no IP, nothing PII),
// hashes them with SHA-256, and returns:
//   - fingerprintHash:  64-char hex hash (the stable device id)
//   - components:       the raw signals (sent ONCE to the server for display
//                       + diffing, then discarded; never re-sent in full)
//
// SIGNALS COLLECTED (deliberately non-identifying):
//   - userAgent, platform, language, languages
//   - screen: width, height, colorDepth, pixelRatio
//   - timezone (Intl.DateTimeFormat().resolvedOptions().timeZone)
//   - timezone offset
//   - hardwareConcurrency, deviceMemory
//   - touch support
//   - canvas fingerprint (text rendered to canvas, hashed)
//   - webgl fingerprint (vendor + renderer, hashed)
//   - audio fingerprint (AudioContext oscillator output, hashed)
//   - font availability (probe a known list of system fonts)
//
// PRIVACY:
//   - The fingerprint hash is NOT a "tracking id". It's a per-device
//     recognizer that lets the user see "this is the same browser I logged
//     in from last time". The user can revoke any device from Settings.
//   - No biometric, no IP, no precise location, no installed-apps list.
//
// USAGE:
//   const fp = await collectFingerprint();
//   await fetch('/api/security/verify', { method: 'POST', body: JSON.stringify(fp) });
// ─────────────────────────────────────────────────────────────────────────
const FONT_PROBE_LIST = [
    // Windows
    'Arial',
    'Calibri',
    'Cambria',
    'Candara',
    'Consolas',
    'Constantia',
    'Corbel',
    'Courier New',
    'Ebrima',
    'Franklin Gothic Medium',
    'Gabriola',
    'Gadugi',
    'Georgia',
    'Javanese Text',
    'Leelawadee UI',
    'Lucida Console',
    'Lucida Sans Unicode',
    'MS Gothic',
    'MS PGothic',
    'MS Sans Serif',
    'MS Serif',
    'Microsoft Sans Serif',
    'Microsoft YaHei',
    'MingLiU',
    'Mongolian Baiti',
    'Nirmala UI',
    'Palatino Linotype',
    'Segoe Print',
    'Segoe Script',
    'Segoe UI',
    'Segoe UI Emoji',
    'Segoe UI Historic',
    'Segoe UI Symbol',
    'SimSun',
    'Sylfaen',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Webdings',
    'Wingdings',
    // macOS
    'Andale Mono',
    'Apple Chancery',
    'Apple Color Emoji',
    'Apple SD Gothic Neo',
    'Avenir',
    'Avenir Next',
    'Baskerville',
    'Big Caslon',
    'Brush Script MT',
    'Chalkboard',
    'Chalkduster',
    'Charcoal',
    'Cochin',
    'Comic Sans MS',
    'Copperplate',
    'Didot',
    'Futura',
    'Geneva',
    'Gill Sans',
    'Helvetica',
    'Helvetica Neue',
    'Herculanum',
    'Hoefler Text',
    'Impact',
    'Marker Felt',
    'Menlo',
    'Monaco',
    'Noteworthy',
    'Optima',
    'Papyrus',
    'Phosphate',
    'Rockwell',
    'SF Pro Display',
    'SF Pro Text',
    'Snell Roundhand',
    'Trebuchet MS',
    // Linux
    'DejaVu Sans',
    'DejaVu Sans Mono',
    'DejaVu Serif',
    'Liberation Sans',
    'Liberation Mono',
    'Liberation Serif',
    'Noto Sans',
    'Noto Sans CJK',
    'Noto Color Emoji',
    'Ubuntu',
    'Ubuntu Mono',
    'Cantarell',
    'Droid Sans',
    // Mobile
    'Roboto',
    'San Francisco',
    'Helvetica Neue'
];
const TEST_STRING = 'mmllIIilI1O0o|mwMWbBqQdp';
const TEST_SIZE = 72;
/**
 * Render text to an off-screen canvas and hash the result.
 * This produces a stable per-device hash because different GPUs / drivers
 * render text with sub-pixel differences that survive across visits.
 */ async function canvasHash() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'no-canvas';
        ctx.textBaseline = 'top';
        ctx.font = `14px 'Arial'`;
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 240, 60);
        ctx.fillStyle = '#069';
        ctx.fillText(TEST_STRING, 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.font = `bold 18px 'Times New Roman'`;
        ctx.fillText(TEST_STRING, 4, 30);
        const data = canvas.toDataURL();
        return await sha256(data);
    } catch  {
        return 'canvas-error';
    }
}
/**
 * Hash the WebGL vendor + renderer strings.
 */ async function webglHash() {
    const fallback = {
        vendor: 'unknown',
        renderer: 'unknown',
        hash: 'no-webgl'
    };
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return fallback;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = ext ? String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)) : String(gl.getParameter(gl.VENDOR));
        const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER));
        const hash = await sha256(vendor + '|' + renderer);
        return {
            vendor,
            renderer,
            hash
        };
    } catch  {
        return fallback;
    }
}
/**
 * Hash AudioContext oscillator output — different OSes / audio stacks
 * produce subtly different output for the same input.
 */ async function audioHash() {
    try {
        const Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!Ctx) return 'no-audio';
        const ctx = new Ctx(1, 44100, 44100);
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 1000;
        const comp = ctx.createDynamicsCompressor();
        osc.connect(comp);
        comp.connect(ctx.destination);
        osc.start(0);
        const buffer = await ctx.startRendering();
        const samples = buffer.getChannelData(0);
        let sum = 0;
        for(let i = 4500; i < 5000; i++)sum += Math.abs(samples[i] || 0);
        return await sha256(String(sum));
    } catch  {
        return 'audio-error';
    }
}
/**
 * Probe which fonts from the FONT_PROBE_LIST are available.
 * Returns a comma-joined list of available font names.
 */ function detectFonts() {
    try {
        const baseFonts = [
            'monospace',
            'sans-serif',
            'serif'
        ];
        const testSpan = document.createElement('span');
        testSpan.style.fontSize = `${TEST_SIZE}px`;
        testSpan.style.position = 'absolute';
        testSpan.style.left = '-9999px';
        testSpan.style.top = '-9999px';
        testSpan.style.visibility = 'hidden';
        testSpan.textContent = TEST_STRING;
        const baseWidths = {};
        const baseHeights = {};
        for (const base of baseFonts){
            testSpan.style.fontFamily = base;
            document.body.appendChild(testSpan);
            baseWidths[base] = testSpan.offsetWidth;
            baseHeights[base] = testSpan.offsetHeight;
            document.body.removeChild(testSpan);
        }
        const available = [];
        for (const font of FONT_PROBE_LIST){
            let detected = false;
            for (const base of baseFonts){
                testSpan.style.fontFamily = `'${font}', ${base}`;
                document.body.appendChild(testSpan);
                if (testSpan.offsetWidth !== baseWidths[base] || testSpan.offsetHeight !== baseHeights[base]) {
                    detected = true;
                }
                document.body.removeChild(testSpan);
                if (detected) break;
            }
            if (detected) available.push(font);
        }
        return available.join(',');
    } catch  {
        return 'font-error';
    }
}
async function sha256(input) {
    try {
        if (globalThis.crypto?.subtle) {
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
            return Array.from(new Uint8Array(buf)).map((b)=>b.toString(16).padStart(2, '0')).join('');
        }
    } catch  {
    /* fall through */ }
    // Fallback (rare): simple non-crypto hash. Still 64 chars.
    let h1 = 0xdeadbeef ^ input.length;
    let h2 = 0x41c6ce57 ^ input.length;
    for(let i = 0; i < input.length; i++){
        const ch = input.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    const hex = (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
    return hex.repeat(4).slice(0, 64);
}
function guessOs(platform, ua) {
    const p = platform.toLowerCase();
    const u = ua.toLowerCase();
    if (u.includes('iphone') || u.includes('ipad') || p.includes('iphone')) return 'iOS';
    if (u.includes('android')) return 'Android';
    if (p.includes('mac') || u.includes('mac os x')) return 'macOS';
    if (p.includes('win') || u.includes('windows')) return 'Windows';
    if (p.includes('linux') || u.includes('linux')) return 'Linux';
    return 'Unknown';
}
function guessBrowser(ua) {
    const u = ua.toLowerCase();
    if (u.includes('edg/')) return 'Edge';
    if (u.includes('opr/') || u.includes('opera')) return 'Opera';
    if (u.includes('chrome/') && !u.includes('chromium')) return 'Chrome';
    if (u.includes('chromium')) return 'Chromium';
    if (u.includes('firefox/')) return 'Firefox';
    if (u.includes('safari/') && !u.includes('chrome')) return 'Safari';
    return 'Unknown';
}
let cached = null;
/**
 * Collect all fingerprint signals and return a stable hash + components.
 * Memoized — calling twice in the same page session returns the cached result.
 */ async function collectFingerprint() {
    if (cached) return cached;
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const language = navigator.language || '';
    const languages = (navigator.languages || []).join(',');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const timezoneOffset = new Date().getTimezoneOffset();
    const screen = `${window.screen.width}x${window.screen.height}`;
    const dpr = window.devicePixelRatio || 1;
    const screenSummary = `${screen}x${dpr}`;
    const colorDepth = window.screen.colorDepth || 24;
    const hardwareConcurrency = navigator.hardwareConcurrency || 0;
    const deviceMemory = navigator.deviceMemory || 0;
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Pre-compute osGuess + browserGuess so they can be used both in the
    // stable hash and in the components object below.
    const osGuess = guessOs(platform, ua);
    const browserGuess = guessBrowser(ua);
    const [canvas, webgl, audio] = await Promise.all([
        canvasHash(),
        webglHash(),
        audioHash()
    ]);
    const fontsRaw = detectFonts();
    const fontsHash = await sha256(fontsRaw);
    const fontCount = fontsRaw ? fontsRaw.split(',').length : 0;
    // ── STABLE device-class composite ────────────────────────────────────────
    // The `fingerprintHash` (the matching key) is computed from signals that
    // are stable for the lifetime of a physical device + browser choice, so
    // the user doesn't get a spurious "new device" alert every time they:
    //   - press Ctrl+/- to zoom (devicePixelRatio changes),
    //   - update Chrome (userAgent version bumps every ~4 weeks),
    //   - cross a DST boundary (timezoneOffset changes twice a year),
    //   - see canvas/WebGL/audio fingerprint drift between browser versions.
    //
    // Stable signals (chosen because they only change when the user switches
    // to a genuinely different device or browser):
    //   - osGuess       — Windows / macOS / Linux / iOS / Android
    //   - browserGuess  — Chrome / Firefox / Safari / Edge (NOT version)
    //   - platform      — navigator.platform (e.g. "Win32", "MacIntel")
    //   - screen width × height (NOT devicePixelRatio — DPR changes with zoom)
    //   - hardwareConcurrency — CPU core count, stable per device
    //   - deviceMemory      — RAM, stable per device
    //   - timezone (IANA name, NOT offset — offset changes with DST)
    //
    // Volatile signals (canvas/webgl/audio/fonts hashes, full UA, DPR, tz
    // offset, language, touchSupport) are kept in `components` and stored on
    // the row for forensic display — they are NOT part of the matching key.
    const screenDims = `${window.screen.width}x${window.screen.height}`;
    const stableComposite = [
        osGuess,
        browserGuess,
        platform,
        screenDims,
        String(hardwareConcurrency),
        String(deviceMemory),
        timezone
    ].join('||');
    const fingerprintHash = await sha256(stableComposite);
    // Separate volatile hash — stored as metadata for forensic display only,
    // never used as a matching key. Lets us detect "same device, new browser
    // version" patterns without flagging them as a different device.
    const volatileComposite = [
        ua,
        screenSummary,
        colorDepth,
        timezoneOffset,
        touchSupport ? 1 : 0,
        canvas,
        webgl.hash,
        audio,
        fontsHash,
        language,
        languages
    ].join('||');
    const sessionFingerprint = await sha256(volatileComposite);
    cached = {
        fingerprintHash,
        sessionFingerprint,
        components: {
            userAgent: ua,
            platform,
            osGuess,
            browserGuess,
            language,
            languages,
            timezone,
            timezoneOffset,
            screen: screenSummary,
            colorDepth,
            hardwareConcurrency,
            deviceMemory,
            touchSupport,
            canvasHash: canvas,
            webglHash: webgl.hash,
            webglVendor: webgl.vendor,
            webglRenderer: webgl.renderer,
            audioHash: audio,
            fontsHash,
            fontCount
        }
    };
    return cached;
}
/**
 * A lighter-weight version that just returns the hash — for cases where
 * we already have a stored component snapshot (e.g. background polling).
 */ async function getFingerprintHash() {
    return (await collectFingerprint()).fingerprintHash;
}


/***/ }),

/***/ 69203:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ShieldAlert)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "shield-alert",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
                key: "oel41y"
            }
        ],
        [
            "path",
            {
                d: "M12 8v4",
                key: "1got3b"
            }
        ],
        [
            "path",
            {
                d: "M12 16h.01",
                key: "1drbdi"
            }
        ]
    ]
};
__iconData.node;
const ShieldAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=shield-alert.mjs.map


/***/ }),

/***/ 95000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Smartphone)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "smartphone",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "14",
                height: "20",
                x: "5",
                y: "2",
                rx: "2",
                ry: "2",
                key: "1yt0o3"
            }
        ],
        [
            "path",
            {
                d: "M12 18h.01",
                key: "mhygvu"
            }
        ]
    ]
};
__iconData.node;
const Smartphone = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=smartphone.mjs.map


/***/ })

}]);