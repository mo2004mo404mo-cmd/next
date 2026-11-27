import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// GET /api/chat/rooms - Get all chat rooms for current user
export async function GET(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const memberships = await db.chatRoomMember.findMany({
      where: { userId },
      include: {
        room: {
          include: {
            members: {
              include: { user: { select: { id: true, name: true, image: true, specialty: true, isOnline: true, lastActiveAt: true } } },
            },
            messages: {
              take: 1,
              orderBy: { createdAt: 'desc' },
              where: { isDeleted: false },
              include: { sender: { select: { id: true, name: true } } },
            },
          },
        },
      },
      orderBy: { room: { lastMessageAt: 'desc' } },
    });

    const rooms = await Promise.all(memberships.map(async (m) => {
      const room = m.room;
      // Null-safety: a member/message may reference a user that no longer
      // exists (deleted account, re-seeded DB). Prisma's `include` then
      // returns `user: null` / `sender: null` — dereferencing `.name` on it
      // used to 500 the whole endpoint ("messages empty, no chats" bug).
      // Filter such rows out up front and fall back at every access.
      const livingMembers = room.members.filter(mm => mm.user != null);
      const otherMembers = livingMembers.filter(mm => mm.userId !== userId);
      const lastMessage = room.messages[0];

      // For direct rooms, name is the other user's name
      const name = room.type === 'direct'
        ? otherMembers[0]?.user?.name || 'Direct Chat'
        : room.name;

      const avatar = room.type === 'direct'
        ? otherMembers[0]?.user?.name?.[0]?.toUpperCase() || '?'
        : room.avatar || '👥';

      // Calculate real unread count: messages after lastReadAt not from self and not deleted
      const unreadCount = await db.chatMessage.count({
        where: {
          roomId: room.id,
          senderId: { not: userId },
          isDeleted: false,
          createdAt: { gt: m.lastReadAt },
        },
      });

      return {
        id: room.id,
        type: room.type,
        name,
        avatar,
        description: room.description,
        createdBy: room.createdBy,
        lastMessage: lastMessage ? {
          id: lastMessage.id,
          content: lastMessage.content,
          senderName: lastMessage.sender?.name ?? 'Former member',
          createdAt: lastMessage.createdAt,
          type: lastMessage.type,
        } : null,
        members: livingMembers.map(mm => ({
          id: mm.user!.id,
          name: mm.user!.name,
          image: mm.user!.image,
          role: mm.role,
          isOnline: mm.user!.isOnline,
          lastActiveAt: mm.user!.lastActiveAt,
        })),
        unreadCount,
        lastMessageAt: room.lastMessageAt,
        isPinned: m.isPinned,
        isMuted: m.isMuted,
        pinOrder: m.pinOrder,
      };
    }));

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/chat/rooms - Create a new group chat
export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { name, memberIds, avatar, description } = await req.json();

    if (!name || !name.trim()) return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
    if (!memberIds || memberIds.length === 0) return NextResponse.json({ error: 'At least 1 member required' }, { status: 400 });

    const room = await db.chatRoom.create({
      data: {
        type: 'group',
        name: name.trim(),
        avatar: avatar || '👥',
        description: description || '',
        createdBy: userId,
        lastMessageAt: new Date(),
        members: {
          create: [
            { userId, role: 'admin' },
            ...memberIds.map((mid: string) => ({ userId: mid, role: 'member' as const })),
          ],
        },
      },
      include: {
        members: { include: { user: { select: { id: true, name: true, image: true } } } },
      },
    });

    return NextResponse.json({ room }, { status: 201 });
  } catch (error) {
    console.error('Error creating group chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
