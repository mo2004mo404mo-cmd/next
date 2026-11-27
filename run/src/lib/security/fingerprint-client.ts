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
  'Arial', 'Calibri', 'Cambria', 'Candara', 'Consolas', 'Constantia',
  'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola',
  'Gadugi', 'Georgia', 'Javanese Text', 'Leelawadee UI', 'Lucida Console',
  'Lucida Sans Unicode', 'MS Gothic', 'MS PGothic', 'MS Sans Serif',
  'MS Serif', 'Microsoft Sans Serif', 'Microsoft YaHei', 'MingLiU',
  'Mongolian Baiti', 'Nirmala UI', 'Palatino Linotype', 'Segoe Print',
  'Segoe Script', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Historic',
  'Segoe UI Symbol', 'SimSun', 'Sylfaen', 'Tahoma', 'Times New Roman',
  'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings',
  // macOS
  'Andale Mono', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo',
  'Avenir', 'Avenir Next', 'Baskerville', 'Big Caslon', 'Brush Script MT',
  'Chalkboard', 'Chalkduster', 'Charcoal', 'Cochin', 'Comic Sans MS',
  'Copperplate', 'Didot', 'Futura', 'Geneva', 'Gill Sans', 'Helvetica',
  'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Marker Felt',
  'Menlo', 'Monaco', 'Noteworthy', 'Optima', 'Papyrus', 'Phosphate',
  'Rockwell', 'SF Pro Display', 'SF Pro Text', 'Snell Roundhand', 'Trebuchet MS',
  // Linux
  'DejaVu Sans', 'DejaVu Sans Mono', 'DejaVu Serif', 'Liberation Sans',
  'Liberation Mono', 'Liberation Serif', 'Noto Sans', 'Noto Sans CJK',
  'Noto Color Emoji', 'Ubuntu', 'Ubuntu Mono', 'Cantarell', 'Droid Sans',
  // Mobile
  'Roboto', 'San Francisco', 'Helvetica Neue',
] as const;

const TEST_STRING = 'mmllIIilI1O0o|mwMWbBqQdp';
const TEST_SIZE = 72;

/**
 * Render text to an off-screen canvas and hash the result.
 * This produces a stable per-device hash because different GPUs / drivers
 * render text with sub-pixel differences that survive across visits.
 */
async function canvasHash(): Promise<string> {
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
  } catch {
    return 'canvas-error';
  }
}

/**
 * Hash the WebGL vendor + renderer strings.
 */
async function webglHash(): Promise<{ vendor: string; renderer: string; hash: string }> {
  const fallback = { vendor: 'unknown', renderer: 'unknown', hash: 'no-webgl' };
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return fallback;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = ext
      ? String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL))
      : String(gl.getParameter(gl.VENDOR));
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    const hash = await sha256(vendor + '|' + renderer);
    return { vendor, renderer, hash };
  } catch {
    return fallback;
  }
}

/**
 * Hash AudioContext oscillator output — different OSes / audio stacks
 * produce subtly different output for the same input.
 */
async function audioHash(): Promise<string> {
  try {
    const Ctx =
      (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
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
    for (let i = 4500; i < 5000; i++) sum += Math.abs(samples[i] || 0);
    return await sha256(String(sum));
  } catch {
    return 'audio-error';
  }
}

/**
 * Probe which fonts from the FONT_PROBE_LIST are available.
 * Returns a comma-joined list of available font names.
 */
function detectFonts(): string {
  try {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testSpan = document.createElement('span');
    testSpan.style.fontSize = `${TEST_SIZE}px`;
    testSpan.style.position = 'absolute';
    testSpan.style.left = '-9999px';
    testSpan.style.top = '-9999px';
    testSpan.style.visibility = 'hidden';
    testSpan.textContent = TEST_STRING;

    const baseWidths: Record<string, number> = {};
    const baseHeights: Record<string, number> = {};
    for (const base of baseFonts) {
      testSpan.style.fontFamily = base;
      document.body.appendChild(testSpan);
      baseWidths[base] = testSpan.offsetWidth;
      baseHeights[base] = testSpan.offsetHeight;
      document.body.removeChild(testSpan);
    }

    const available: string[] = [];
    for (const font of FONT_PROBE_LIST) {
      let detected = false;
      for (const base of baseFonts) {
        testSpan.style.fontFamily = `'${font}', ${base}`;
        document.body.appendChild(testSpan);
        if (
          testSpan.offsetWidth !== baseWidths[base] ||
          testSpan.offsetHeight !== baseHeights[base]
        ) {
          detected = true;
        }
        document.body.removeChild(testSpan);
        if (detected) break;
      }
      if (detected) available.push(font);
    }
    return available.join(',');
  } catch {
    return 'font-error';
  }
}

async function sha256(input: string): Promise<string> {
  try {
    if (globalThis.crypto?.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    /* fall through */
  }
  // Fallback (rare): simple non-crypto hash. Still 64 chars.
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  return hex.repeat(4).slice(0, 64);
}

function guessOs(platform: string, ua: string): string {
  const p = platform.toLowerCase();
  const u = ua.toLowerCase();
  if (u.includes('iphone') || u.includes('ipad') || p.includes('iphone')) return 'iOS';
  if (u.includes('android')) return 'Android';
  if (p.includes('mac') || u.includes('mac os x')) return 'macOS';
  if (p.includes('win') || u.includes('windows')) return 'Windows';
  if (p.includes('linux') || u.includes('linux')) return 'Linux';
  return 'Unknown';
}

function guessBrowser(ua: string): string {
  const u = ua.toLowerCase();
  if (u.includes('edg/')) return 'Edge';
  if (u.includes('opr/') || u.includes('opera')) return 'Opera';
  if (u.includes('chrome/') && !u.includes('chromium')) return 'Chrome';
  if (u.includes('chromium')) return 'Chromium';
  if (u.includes('firefox/')) return 'Firefox';
  if (u.includes('safari/') && !u.includes('chrome')) return 'Safari';
  return 'Unknown';
}

export interface FingerprintResult {
  fingerprintHash: string;
  /**
   * Volatile per-session hash (UA version, DPR, canvas/webgl/audio drift,
   * timezone offset, language). Stored as metadata for forensic display —
   * NOT used as a matching key. Same physical device may produce different
   * sessionFingerprints across page zooms, browser updates, or DST changes.
   */
  sessionFingerprint: string;
  components: {
    userAgent: string;
    platform: string;
    osGuess: string;
    browserGuess: string;
    language: string;
    languages: string;
    timezone: string;
    timezoneOffset: number;
    screen: string; // wxhxdpr
    colorDepth: number;
    hardwareConcurrency: number;
    deviceMemory: number;
    touchSupport: boolean;
    canvasHash: string;
    webglHash: string;
    webglVendor: string;
    webglRenderer: string;
    audioHash: string;
    fontsHash: string; // hashed list of detected fonts
    fontCount: number;
    // NOTE: client-side IP detection was intentionally REMOVED. The browser
    // used to call https://api.ipify.org to discover its own public IP, but
    // trusting a client-reported IP for security/location is an anti-pattern:
    // the client can lie. IP detection is now done entirely server-side in
    // getRequestIp() using x-forwarded-for / cf-connecting-ip / x-real-ip
    // / etc. See src/lib/security/fingerprint-server.ts.
  };
}

let cached: FingerprintResult | null = null;

/**
 * Collect all fingerprint signals and return a stable hash + components.
 * Memoized — calling twice in the same page session returns the cached result.
 */
export async function collectFingerprint(): Promise<FingerprintResult> {
  if (cached) return cached;

  const ua = navigator.userAgent || '';
  const platform = (navigator as any).platform || '';
  const language = navigator.language || '';
  const languages = (navigator.languages || []).join(',');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const timezoneOffset = new Date().getTimezoneOffset();
  const screen = `${window.screen.width}x${window.screen.height}`;
  const dpr = window.devicePixelRatio || 1;
  const screenSummary = `${screen}x${dpr}`;
  const colorDepth = window.screen.colorDepth || 24;
  const hardwareConcurrency = navigator.hardwareConcurrency || 0;
  const deviceMemory = (navigator as any).deviceMemory || 0;
  const touchSupport =
    'ontouchstart' in window || (navigator as any).maxTouchPoints > 0;

  // Pre-compute osGuess + browserGuess so they can be used both in the
  // stable hash and in the components object below.
  const osGuess = guessOs(platform, ua);
  const browserGuess = guessBrowser(ua);

  const [canvas, webgl, audio] = await Promise.all([
    canvasHash(),
    webglHash(),
    audioHash(),
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
    timezone,
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
    languages,
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
      fontCount,
    },
  };
  return cached;
}

/**
 * A lighter-weight version that just returns the hash — for cases where
 * we already have a stored component snapshot (e.g. background polling).
 */
export async function getFingerprintHash(): Promise<string> {
  return (await collectFingerprint()).fingerprintHash;
}
