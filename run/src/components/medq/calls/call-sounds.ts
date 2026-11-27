/**
 * call-sounds.ts — synthesized call tones (Web Audio, zero assets).
 *
 * The classic telephony cadences, generated with oscillators so no audio
 * files need to ship:
 *
 *   • Incoming ring  — 440+480 Hz dual tone, 1.6 s on / 2.0 s off loop
 *     (what the CALLEE hears; a deliberate, insistent rhythm)
 *   • Ringback       — 440+480 Hz, 1.0 s on / 3.0 s off loop (what the
 *     CALLER hears while waiting; the familiar "brrring… brrring…")
 *   • Connect tone   — soft rising two-note chime when the call answers
 *   • End tone       — short falling "boop" when the call ends
 *
 * Autoplay policy: an AudioContext may only start after a user gesture.
 * Browsers treat that generously once the page has been interacted with
 * (clicking anywhere in the app earlier counts), and we additionally try to
 * resume() the context on every play call. If the browser still refuses, the
 * ring is visual-only — the incoming-call modal and document.title flashing
 * keep working regardless.
 */

type LoopHandle = { stop: () => void };

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

/** Prime the AudioContext from a user gesture (call buttons etc.). */
export function primeCallAudio() {
  getCtx();
}

/**
 * Play one dual-tone burst with soft attack/release (anti-click ramps).
 * Returns the stop handle so loops can schedule the next burst cancellably.
 */
function burst(freqs: number[], duration: number, volume: number, when?: number): { stop: () => void } {
  const audio = getCtx();
  if (!audio) return { stop: () => {} };
  const start = when ?? audio.currentTime;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.04);
  gain.gain.setValueAtTime(volume, start + duration - 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  gain.connect(audio.destination);

  const oscillators = freqs.map((f) => {
    const osc = audio.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    osc.connect(gain);
    osc.start(start);
    osc.stop(start + duration + 0.05);
    return osc;
  });

  return {
    stop: () => {
      try {
        const now = audio.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        oscillators.forEach((o) => o.stop(now + 0.06));
      } catch {
        // Already stopped.
      }
    },
  };
}

/** Run a ring cadence loop until stopped. */
function ringLoop(freqs: number[], onMs: number, offMs: number, volume: number): LoopHandle {
  let stopped = false;
  let current: { stop: () => void } | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const tick = () => {
    if (stopped) return;
    const audio = getCtx();
    if (!audio) {
      // No AudioContext (autoplay-blocked): keep the visual ring alive by
      // respecting the cadence silently.
      timer = setTimeout(tick, onMs + offMs);
      return;
    }
    current = burst(freqs, onMs / 1000, volume);
    timer = setTimeout(tick, onMs + offMs);
  };
  tick();

  return {
    stop: () => {
      stopped = true;
      if (timer) clearTimeout(timer);
      current?.stop();
      current = null;
    },
  };
}

/** Insistent incoming-call ring (callee). */
export function startIncomingRing(): LoopHandle {
  return ringLoop([440, 480], 1600, 2000, 0.22);
}

/** Familiar ringback while waiting for the other side to pick up (caller). */
export function startRingback(): LoopHandle {
  return ringLoop([440, 480], 1000, 3000, 0.12);
}

/** Soft two-note "connected" chime. */
export function playConnectTone() {
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  burst([660], 0.12, 0.12, t);
  burst([880], 0.18, 0.12, t + 0.13);
}

/** Falling end-of-call tone. */
export function playEndTone() {
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  burst([480], 0.14, 0.14, t);
  burst([320], 0.2, 0.14, t + 0.15);
}

/** Short "message-like" double blip (busy / declined feedback). */
export function playBusyTone() {
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  burst([480], 0.12, 0.14, t);
  burst([480], 0.12, 0.14, t + 0.2);
  burst([480], 0.12, 0.14, t + 0.4);
}
