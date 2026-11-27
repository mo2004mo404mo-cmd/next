// ─────────────────────────────────────────────────────────────────────────
// /api/security/devices — list + revoke trusted devices for current user
// ─────────────────────────────────────────────────────────────────────────
// GET    /api/security/devices         → list all devices for current user
// PATCH  /api/security/devices          → body { fingerprintHash, label? }
//                                          update device label
// DELETE /api/security/devices          → body { fingerprintHash, reason? }
//                                          revoke (sign-out) a device
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import {
  listUserDevices,
  revokeDevice,
} from '@/lib/security/fingerprint-server';
import { rateLimit } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const devices = await listUserDevices(user.id);
  return NextResponse.json({
    devices: devices.map((d) => ({
      id: d.id,
      fingerprintHash: d.fingerprintHash,
      label: d.label,
      userAgent: d.userAgent,
      platform: d.platform,
      osGuess: d.osGuess,
      browserGuess: d.browserGuess,
      screenSummary: d.screenSummary,
      timezone: d.timezone,
      trustScore: d.trustScore,
      revoked: d.revoked,
      revokedAt: d.revokedAt,
      revokedReason: d.revokedReason,
      firstSeenAt: d.firstSeenAt,
      lastSeenAt: d.lastSeenAt,
      lastIp: d.lastIp,
      lastGeo: d.lastGeo,
      loginCount: d.loginCount,
    })),
  });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rl = await rateLimit({ key: `dev:update:${user.id}`, max: 30, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  if (!body?.fingerprintHash || !body?.label) {
    return NextResponse.json({ error: 'Missing fingerprintHash or label' }, { status: 400 });
  }
  const updated = await db.deviceFingerprint.updateMany({
    where: { userId: user.id, fingerprintHash: body.fingerprintHash },
    data: { label: String(body.label).slice(0, 60) },
  });
  if (updated.count === 0) {
    return NextResponse.json({ error: 'Device not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rl = await rateLimit({ key: `dev:revoke:${user.id}`, max: 10, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  if (!body?.fingerprintHash) {
    return NextResponse.json({ error: 'Missing fingerprintHash' }, { status: 400 });
  }
  const count = await revokeDevice(
    user.id,
    body.fingerprintHash,
    body.reason || 'Revoked by user',
  );
  if (count === 0) {
    return NextResponse.json({ error: 'Device not found or already revoked' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, revoked: count });
}

// db import is deferred to the bottom to avoid a circular import in dev
// (auth-helpers imports db, which imports prisma generated client — fine
// at runtime, but bun's hot-reload sometimes trips on top-level imports
// during the first compile).
import { db } from '@/lib/db';
