import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';

export async function GET() {
  try {
    // Prefer the canonical guest user when it has chat memberships. Older chat
    // seeds created rooms for student@medq.com instead, so retain that user as
    // a compatibility fallback until those databases are reseeded.
    const guestId = await getGuestUserId();
    const guest = await db.user.findUnique({
      where: { id: guestId },
      select: { id: true, name: true, email: true, role: true },
    });
    const guestRoomCount = guest
      ? await db.chatRoomMember.count({ where: { userId: guest.id } })
      : 0;
    if (guest && guestRoomCount > 0) {
      return NextResponse.json({ user: guest });
    }

    const seededStudent = await db.user.findUnique({
      where: { email: 'student@medq.com' },
      select: { id: true, name: true, email: true, role: true },
    });
    if (seededStudent) return NextResponse.json({ user: seededStudent });

    // Last-resort fallback: any user
    const anyUser = await db.user.findFirst({
      select: { id: true, name: true, email: true, role: true },
    });
    if (anyUser) {
      return NextResponse.json({ user: anyUser });
    }
    return NextResponse.json({ error: 'No users found' }, { status: 404 });
  } catch (error) {
    console.error('[chat/demo-user] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
