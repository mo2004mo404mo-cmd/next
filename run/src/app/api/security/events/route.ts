// ─────────────────────────────────────────────────────────────────────────
// /api/security/events — recent security events for current user
// ─────────────────────────────────────────────────────────────────────────
// GET  /api/security/events?limit=50&unreadOnly=0&severity=warn
// POST /api/security/events  body: { action: 'markRead', eventId? }
//                              → mark single event or all events as read
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import {
  listSecurityEvents,
  markEventRead,
  markAllEventsRead,
} from '@/lib/security/fingerprint-server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const unreadOnly = url.searchParams.get('unreadOnly') === '1';
  const severity = url.searchParams.get('severity') as 'info' | 'warn' | 'critical' | null;

  const events = await listSecurityEvents(user.id, {
    limit,
    unreadOnly,
    severity: severity || undefined,
  });

  const unreadCount = await db.securityEvent.count({
    where: { userId: user.id, readAt: null },
  });

  return NextResponse.json({
    events: events.map((e) => ({
      id: e.id,
      eventType: e.eventType,
      severity: e.severity,
      message: e.message,
      metadata: safeParse(e.metadata),
      ipAddress: e.ipAddress,
      userAgent: e.userAgent,
      readAt: e.readAt,
      createdAt: e.createdAt,
    })),
    unreadCount,
  });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  if (body?.action === 'markRead') {
    if (body.eventId) {
      await markEventRead(user.id, String(body.eventId));
    } else {
      await markAllEventsRead(user.id);
    }
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

import { db } from '@/lib/db';
