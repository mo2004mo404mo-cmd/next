'use client';

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

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { collectFingerprint, type FingerprintResult } from '@/lib/security/fingerprint-client';
import { ShieldAlert, Smartphone } from 'lucide-react';

const REVERIFY_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const REFOCUS_MIN_GAP_MS = 5 * 60 * 1000;    // re-verify on focus after 5 min away

interface VerifyResponse {
  ok: boolean;
  device?: {
    id: string;
    fingerprintHash: string;
    label: string | null;
    osGuess: string;
    browserGuess: string;
    // Server-resolved location string (e.g. "Cairo, Egypt") from IP
    // geolocation. Empty when the server couldn't determine a location
    // (e.g., private IP in local dev, or geo API timeout).
    lastGeo: string;
    lastIp: string;
    trustScore: number;
    revoked: boolean;
    firstSeenAt: string;
    lastSeenAt: string;
    loginCount: number;
    isNew: boolean;
  };
  error?: string;
}

async function verifyOnce(): Promise<VerifyResponse | null> {
  let fp: FingerprintResult;
  try {
    fp = await collectFingerprint();
  } catch (e) {
    console.warn('[DeviceSessionTracker] collectFingerprint failed:', e);
    return null; // silent — fingerprint collection failure is non-fatal
  }

  try {
    const res = await fetch('/api/security/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fp),
    });
    if (!res.ok) {
      // Surface the failure so it's diagnosable in the browser console.
      // Don't show a toast — the user shouldn't be bothered by telemetry
      // problems — but DO log so a missing device row in the Device Security
      // dialog can be traced back to a 401/403/500 here instead of looking
      // like the feature is silently broken.
      const bodyText = await res.text().catch(() => '');
      console.warn(
        `[DeviceSessionTracker] /api/security/verify returned ${res.status} ${res.statusText}`,
        bodyText ? { body: bodyText.slice(0, 200) } : '',
      );
      return null;
    }
    const result = (await res.json()) as VerifyResponse;

    // Broadcast a window event so other components (notably DeviceSecurityDialog
    // and UserMenu) know a DeviceFingerprint row now exists and they can
    // re-fetch /devices. This is the missing link that previously caused the
    // device row to stay hidden even after a successful verify: consumers only
    // polled /devices ONCE on mount, which raced against verify completing.
    if (typeof window !== 'undefined' && result?.device) {
      try {
        window.dispatchEvent(
          new CustomEvent('medq:device-verified', {
            detail: { fingerprintHash: result.device.fingerprintHash },
          }),
        );
      } catch {
        // ignore — this is just a hint, not critical
      }
    }
    return result;
  } catch (e) {
    console.warn('[DeviceSessionTracker] /api/security/verify fetch threw:', e);
    return null; // silent — network errors shouldn't bother the user
  }
}

function describeDevice(d: NonNullable<VerifyResponse['device']>): string {
  const parts: string[] = [];
  if (d.browserGuess && d.browserGuess !== 'Unknown') parts.push(d.browserGuess);
  if (d.osGuess && d.osGuess !== 'Unknown') parts.push(d.osGuess);
  if (parts.length === 0) {
    // Fallback: show location if we have nothing else
    if (d.lastGeo) return `New device signed in (${d.lastGeo})`;
    return 'New device signed in';
  }
  return `New device: ${parts.join(' on ')}`;
}

export default function DeviceSessionTracker() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const lastVerifyAtRef = useRef<number>(0);
  const lastSeenDeviceHashRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const focusedAtRef = useRef<number>(0);

  // One-time mount log — helps confirm the component actually mounted in
  // the user's browser (visible in their devtools console). Without this,
  // a silently-failed dynamic import or a misconfigured provider tree can
  // make the tracker invisible to debugging.
  // useEffect(() => {
  //   console.info('[DeviceSessionTracker] mounted; sessionStatus =', sessionStatus);
  // }, []);

  // Main verify routine — runs once on login, then every 30 min.
  const runVerify = async (opts: { isInitial: boolean }) => {
    const now = Date.now();
    // Throttle: don't re-verify more than once per 30s
    if (now - lastVerifyAtRef.current < 30_000 && !opts.isInitial) return;
    lastVerifyAtRef.current = now;

    const result = await verifyOnce();
    if (!result?.device) {
      console.warn('[DeviceSessionTracker] verifyOnce returned no device — Device Security panel will show no current device');
      return;
    }

    const d = result.device;

    // Case 1: revoked device — force sign-out immediately.
    if (d.revoked) {
      toast.error('This device was revoked', {
        description: 'For your safety, you are being signed out. Please contact support if this is unexpected.',
        duration: 8000,
        icon: <ShieldAlert className="h-4 w-4 text-red-500" />,
      });
      // Give the toast a moment to render, then sign out.
      setTimeout(() => {
        signOut({ redirect: false }).finally(() => {
          router.push('/');
        });
      }, 1500);
      return;
    }

    // Case 2: brand-new device for this user → informational toast (only on initial verify, not periodic).
    if (opts.isInitial && d.isNew && lastSeenDeviceHashRef.current !== d.fingerprintHash) {
      toast.info(describeDevice(d), {
        // Telegram-style: "Signed in from Cairo, Egypt" — server-resolved
        // from the request IP, never from client-reported values.
        description: d.lastGeo
          ? `Signed in from ${d.lastGeo}`
          : 'Signed in from an unknown location',
        duration: 6000,
        icon: <Smartphone className="h-4 w-4 text-blue-400" />,
      });
    }

    // Case 3: device changed since last verify (session hijacking signal).
    // This is rare during a single page session, but can happen if cookies
    // are stolen and the attacker loads the app in a different browser.
    if (lastSeenDeviceHashRef.current && lastSeenDeviceHashRef.current !== d.fingerprintHash) {
      toast.warning('Device changed mid-session', {
        description: `Switched from a previously verified device to ${d.browserGuess} on ${d.osGuess}. If this wasn't you, sign out immediately.`,
        duration: 10000,
        icon: <ShieldAlert className="h-4 w-4 text-amber-400" />,
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
  useEffect(() => {
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
    const t = setTimeout(() => runVerify({ isInitial: true }), 1500);

  //   // Periodic re-verify every 30 min.
    intervalRef.current = setInterval(() => runVerify({ isInitial: false }), REVERIFY_INTERVAL_MS);

    return () => {
      clearTimeout(t);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [sessionStatus]);

  // Effect: re-verify on window focus (after being backgrounded for >5 min).
  useEffect(() => {
    if (sessionStatus !== 'authenticated') return;

    const onFocus = () => {
      const now = Date.now();
      const gap = now - focusedAtRef.current;
      if (gap >= REFOCUS_MIN_GAP_MS) {
        runVerify({ isInitial: false });
      }
      focusedAtRef.current = now;
    };
    const onBlur = () => {
      focusedAtRef.current = Date.now();
    };

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [sessionStatus]);

  // This component renders nothing — it's a pure side-effect tracker.
  return null;
}
