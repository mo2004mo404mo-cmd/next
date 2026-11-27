import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// PATCH /api/chat/rooms/[id]/pin - Pin/unpin, mute/unmute, or reorder a chat room
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      console.warn('[Pin Route] Auth failed - no userId from session or header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id: roomId } = await params;
    const body = await req.json();

    console.log('[Pin Route] User:', userId, 'Room:', roomId, 'Body:', JSON.stringify(body));

    // Check membership
    const membership = await db.chatRoomMember.findFirst({
      where: { roomId, userId },
    });

    if (!membership) {
      console.warn('[Pin Route] User', userId, 'is not a member of room', roomId);
      return NextResponse.json({ error: 'Not a member of this room' }, { status: 403 });
    }

    const updateData: Record<string, any> = {};

    if (typeof body.isPinned === 'boolean') {
      updateData.isPinned = body.isPinned;
      // When pinning, set pinOrder to the end
      if (body.isPinned) {
        const maxOrder = await db.chatRoomMember.aggregate({
          where: { userId, isPinned: true },
          _max: { pinOrder: true },
        });
        updateData.pinOrder = (maxOrder._max.pinOrder ?? -1) + 1;
      } else {
        updateData.pinOrder = null;
      }
    }
    if (typeof body.isMuted === 'boolean') {
      updateData.isMuted = body.isMuted;
    }
    if (typeof body.pinOrder === 'number') {
      updateData.pinOrder = body.pinOrder;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updated = await db.chatRoomMember.update({
      where: { id: membership.id },
      data: updateData,
    });

    console.log('[Pin Route] Updated membership:', updated.id, 'isPinned:', updated.isPinned, 'pinOrder:', updated.pinOrder, 'isMuted:', updated.isMuted);

    return NextResponse.json({
      isPinned: updated.isPinned,
      isMuted: updated.isMuted,
      pinOrder: updated.pinOrder,
    });
  } catch (error) {
    console.error('[Pin Route] Error updating room preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
