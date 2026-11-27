import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// GET /api/chat/rooms/[id]/study-group
// Find-or-create a linked study Group for a chat room, then sync members.
// Returns the group ID so the client can render GroupStudyPanel + GroupAdPollWidget.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;

    // 1) Verify the chat room exists and the user is a member.
    const room = await db.chatRoom.findUnique({
      where: { id: roomId },
      include: {
        members: { select: { userId: true, role: true } },
      },
    });
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });

    const myMembership = room.members.find(m => m.userId === userId);
    if (!myMembership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    // 2) Find-or-create the linked study Group.
    let group = await db.group.findUnique({
      where: { chatRoomId: roomId },
      include: { members: true },
    });

    if (!group) {
      // Create the linked group with sensible defaults from the chat room.
      // The first admin of the chat room (or the current user as fallback) becomes the group admin.
      const roomAdmin = room.members.find(m => m.role === 'admin') ?? { userId, role: 'admin' };
      group = await db.group.create({
        data: {
          name: room.name || 'Chat Study Group',
          description: room.description || `Study group linked to chat room "${room.name}"`,
          avatar: room.avatar || '💬',
          type: 'study_group',
          isPublic: false,
          inviteCode: Math.random().toString(36).slice(2, 10).toUpperCase(),
          chatRoomId: roomId,
          createdBy: roomAdmin.userId,
          members: {
            create: room.members.map(m => ({
              userId: m.userId,
              role: m.role === 'admin' ? 'admin' : 'member',
            })),
          },
          memberCount: room.members.length,
        },
        include: { members: true },
      });
    } else {
      // 3) Sync membership: add any chat-room members that aren't yet group members,
      //    and remove any group members that left the chat room. Keep it 1:1.
      const roomUserIds = new Set(room.members.map(m => m.userId));
      const groupUserIds = new Set(group.members.map(m => m.userId));

      const toAdd = room.members.filter(m => !groupUserIds.has(m.userId));
      const toRemove = group.members.filter(m => !roomUserIds.has(m.userId));

      if (toAdd.length > 0 || toRemove.length > 0) {
        if (toRemove.length > 0) {
          await db.groupMember.deleteMany({
            where: { groupId: group.id, userId: { in: toRemove.map(m => m.userId) } },
          });
        }
        if (toAdd.length > 0) {
          await db.groupMember.createMany({
            data: toAdd.map(m => ({
              groupId: group.id,
              userId: m.userId,
              role: m.role === 'admin' ? 'admin' : 'member',
            })),
          });
        }
        // Refresh member count + re-fetch
        group = await db.group.update({
          where: { id: group.id },
          data: { memberCount: room.members.length },
          include: { members: true },
        });
      }
    }

    // 4) Determine the current user's role in the group.
    const myGroupMember = group.members.find(m => m.userId === userId);
    const userRole = myGroupMember?.role ?? 'member';

    return NextResponse.json({
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        avatar: group.avatar,
        type: group.type,
        memberCount: group.memberCount,
      },
      userRole,
      isAdmin: userRole === 'admin',
    });
  } catch (error) {
    console.error('Error in find-or-create study group for chat room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
