import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// POST /api/chat/direct - Get or create direct chat room
export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { targetUserId } = await req.json();

    if (!targetUserId) return NextResponse.json({ error: 'targetUserId is required' }, { status: 400 });
    if (targetUserId === userId) return NextResponse.json({ error: 'Cannot chat with yourself' }, { status: 400 });

    // Find existing direct room between these two users
    const existingDirect = await db.chatRoom.findFirst({
      where: {
        type: 'direct',
        members: {
          every: {
            userId: { in: [userId, targetUserId] },
          },
        },
      },
      include: {
        members: { include: { user: { select: { id: true, name: true, image: true } } } },
      },
    });

    // Verify it has exactly these 2 members
    if (existingDirect && existingDirect.members.length === 2) {
      return NextResponse.json({ room: existingDirect, existed: true });
    }

    // Create new direct room
    const room = await db.chatRoom.create({
      data: {
        type: 'direct',
        lastMessageAt: new Date(),
        members: {
          create: [
            { userId, role: 'member' },
            { userId: targetUserId, role: 'member' },
          ],
        },
      },
      include: {
        members: { include: { user: { select: { id: true, name: true, image: true } } } },
      },
    });

    return NextResponse.json({ room, existed: false }, { status: 201 });
  } catch (error) {
    console.error('Error creating direct chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
