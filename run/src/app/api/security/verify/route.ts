// ─────────────────────────────────────────────────────────────────────────
// /api/security/verify — record device fingerprint after sign-in
// ─────────────────────────────────────────────────────────────────────────
// Called from the client immediately after a successful sign-in (or on app
// boot if a session already exists). Records/upserts the DeviceFingerprint
// row, emits SecurityEvent(s) as needed, and returns the device record +
// trust assessment so the client can show a "new device" toast if warranted.
//
// Auth: requires a valid session. No session = 401 (we can't record a
// fingerprint for an anonymous user).
//
// Body: FingerprintPayload (see src/lib/security/fingerprint-client.ts)
//
// Rate limited: 10/min per user (fingerprint should be sent at most once
// per page load — anything more is suspicious).
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import {
  recordDeviceLogin,
  getRequestIp,
  getRequestUa,
  type FingerprintPayload,
} from '@/lib/security/fingerprint-server';
import { rateLimit } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: 10/min per user.
  const ip = getRequestIp(req);
  const rl = await rateLimit({
    key: `fp:${user.id}`,
    max: 10,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests', retryAt: rl.resetAt },
      { status: 429 },
    );
  }

  let body: FingerprintPayload;
  try {
    body = (await req.json()) as FingerprintPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body?.fingerprintHash || !/^[0-9a-f]{64}$/.test(body.fingerprintHash)) {
    return NextResponse.json({ error: 'Invalid fingerprintHash' }, { status: 400 });
  }
  if (!body.components || typeof body.components !== 'object') {
    return NextResponse.json({ error: 'Missing components' }, { status: 400 });
  }

  const ua = getRequestUa(req) || body.components.userAgent;
  const device = await recordDeviceLogin(user.id, body, ip, ua);

  // Don't echo back sensitive fields.
  return NextResponse.json({
    ok: true,
    device: {
      id: device.id,
      fingerprintHash: device.fingerprintHash,
      label: device.label,
      osGuess: device.osGuess,
      browserGuess: device.browserGuess,
      screenSummary: device.screenSummary,
      timezone: device.timezone,
      trustScore: device.trustScore,
      revoked: device.revoked,
      firstSeenAt: device.firstSeenAt,
      lastSeenAt: device.lastSeenAt,
      lastIp: device.lastIp,
      lastGeo: device.lastGeo,
      loginCount: device.loginCount,
      isNew: device.loginCount === 1,
    },
  });
}
