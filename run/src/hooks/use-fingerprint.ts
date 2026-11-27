// ─────────────────────────────────────────────────────────────────────────
// use-fingerprint.ts — client hook that collects + verifies the device fp.
// ─────────────────────────────────────────────────────────────────────────
// On mount (if the user is signed in), this hook:
//   1. Collects the device fingerprint (canvas, webgl, audio, fonts, ...).
//   2. POSTs it to /api/security/verify.
//   3. Exposes { device, status, isNew } for the UI to react.
//
// Status values:
//   'idle'         — before mount
//   'collecting'   — fingerprint being collected
//   'verifying'    — POST in flight
//   'verified'     — server confirmed
//   'new-device'   — server says this is a new device (show toast)
//   'revoked'      — server says this device is revoked (force sign-out)
//   'error'        — collection or verify failed
// ─────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { collectFingerprint } from '@/lib/security/fingerprint-client';

export type FingerprintStatus =
  | 'idle'
  | 'collecting'
  | 'verifying'
  | 'verified'
  | 'new-device'
  | 'revoked'
  | 'error';

export interface DeviceInfo {
  id: string;
  fingerprintHash: string;
  label: string | null;
  osGuess: string;
  browserGuess: string;
  screenSummary: string;
  timezone: string;
  trustScore: number;
  revoked: boolean;
  firstSeenAt: string;
  lastSeenAt: string;
  loginCount: number;
  isNew: boolean;
}

export function useFingerprint(autoVerify = true) {
  const { status: sessionStatus } = useSession();
  const [status, setStatus] = useState<FingerprintStatus>('idle');
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoVerify) return;
    if (sessionStatus !== 'authenticated') return;

    let cancelled = false;
    (async () => {
      setStatus('collecting');
      try {
        const fp = await collectFingerprint();
        if (cancelled) return;
        setStatus('verifying');
        const res = await fetch('/api/security/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fp),
        });
        if (cancelled) return;
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body.error || `Verify failed (${res.status})`);
          setStatus('error');
          return;
        }
        const body = await res.json();
        setDevice(body.device);
        if (body.device?.revoked) {
          setStatus('revoked');
        } else if (body.device?.isNew) {
          setStatus('new-device');
        } else {
          setStatus('verified');
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Fingerprint collection failed');
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionStatus, autoVerify]);

  return { status, device, error };
}
