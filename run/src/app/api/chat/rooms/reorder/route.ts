import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// POST /api/chat/rooms/reorder - Batch reorder pinned chats atomically
export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body as { items: Array<{ roomId: string; pinOrder: number }> };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    // Validate all rooms belong to the user's memberships
    const roomIds = items.map(i => i.roomId);
    const memberships = await db.chatRoomMember.findMany({
      where: { userId, roomId: { in: roomIds } },
    });

    if (memberships.length !== roomIds.length) {
      return NextResponse.json({ error: 'Some rooms not found or not a member' }, { status: 403 });
    }

    // Update all in a transaction for atomicity
    await db.$transaction(
      items.map(item =>
        db.chatRoomMember.updateMany({
          where: { userId, roomId: item.roomId },
          data: { pinOrder: item.pinOrder },
        })
      )
    );

    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    console.error('[Reorder] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
