import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups/[id] — Get group details with members.
// Resilient auth: NextAuth session first, then x-user-id header fallback
// (so unauthenticated Guest browsing still sees private groups they're a member of).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const group = await db.group.findUnique({
      where: { id },
      include: {
        members: {
          orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                specialty: true,
                medicalSchool: true,
                graduationYear: true,
              },
            },
          },
        },
        posts: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, name: true, image: true },
            },
            _count: {
              select: { comments: true, likes: true },
            },
          },
        },
      },
    });

    if (!group) {
      return Response.json({ error: 'Group not found' }, { status: 404 });
    }

    // Check if the requesting user is a member — resilient auth
    let currentUserMembership = null;
    const userId = await getAuthenticatedUserId(request);
    if (userId) {
      currentUserMembership = await db.groupMember.findUnique({
        where: { groupId_userId: { groupId: id, userId } },
      });
    }

    // If group is private and user is not a member, restrict access
    if (!group.isPublic && !currentUserMembership) {
      return Response.json({ error: 'This group is private' }, { status: 403 });
    }

    return Response.json({
      group,
      currentUserMembership,
    });
  } catch (error) {
    console.error('Error getting group details:', error);
    return Response.json({ error: 'Failed to get group details' }, { status: 500 });
  }
}

// DELETE /api/groups/[id] — Leave group or delete group (if admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if the group exists
    const group = await db.group.findUnique({
      where: { id },
      include: {
        members: true,
      },
    });

    if (!group) {
      return Response.json({ error: 'Group not found' }, { status: 404 });
    }

    // Check if the user is a member
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });

    if (!membership) {
      return Response.json({ error: 'You are not a member of this group' }, { status: 403 });
    }

    // If the user is the admin/creator and the only admin, they can delete the group
    const admins = group.members.filter((m) => m.role === 'admin');

    if (membership.role === 'admin' && admins.length === 1) {
      // Last admin leaving — delete the entire group
      await db.group.delete({ where: { id } });
      return Response.json({ message: 'Group deleted successfully', deleted: true });
    }

    // Otherwise, just leave the group
    await db.groupMember.delete({
      where: { groupId_userId: { groupId: id, userId } },
    });

    // Decrement member count
    await db.group.update({
      where: { id },
      data: { memberCount: { decrement: 1 } },
    });

    // If the user was a moderator, no special action needed
    // If the user was an admin (but there are other admins), just leave
    return Response.json({ message: 'Left group successfully', deleted: false });
  } catch (error) {
    console.error('Error leaving/deleting group:', error);
    return Response.json({ error: 'Failed to leave/delete group' }, { status: 500 });
  }
}
