import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { sendPushForNotification } from '@/lib/server/push';

// POST /api/groups/[id]/join — Join a group by ID or inviteCode
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { inviteCode } = body;

    // Find the group
    let group = await db.group.findUnique({ where: { id } });

    // If not found by ID, try by inviteCode
    if (!group && inviteCode) {
      group = await db.group.findFirst({ where: { inviteCode } });
    }

    if (!group) {
      return Response.json({ error: 'Group not found' }, { status: 404 });
    }

    // If the group ID in URL doesn't match the inviteCode group, use the inviteCode group
    const groupId = group.id;

    // Check if the group is private and requires an invite code
    if (!group.isPublic) {
      if (!inviteCode || group.inviteCode !== inviteCode) {
        return Response.json(
          { error: 'This group is private. A valid invite code is required.' },
          { status: 403 }
        );
      }
    }

    // Check if already a member
    const existingMembership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });

    if (existingMembership) {
      return Response.json(
        { error: 'You are already a member of this group', membership: existingMembership },
        { status: 409 }
      );
    }

    // Join the group
    const membership = await db.groupMember.create({
      data: {
        groupId,
        userId,
        role: 'member',
      },
      include: {
        user: {
          select: { id: true, name: true, image: true, specialty: true },
        },
      },
    });

    // Increment member count
    await db.group.update({
      where: { id: groupId },
      data: { memberCount: { increment: 1 } },
    });

    // Create a notification for group admins
    const admins = await db.groupMember.findMany({
      where: { groupId, role: { in: ['admin', 'moderator'] } },
      select: { userId: true },
    });

    if (admins.length > 0) {
      const created = await db.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.userId,
          type: 'group_invite',
          title: 'New member joined',
          message: `${user.name || 'A user'} joined "${group.name}"`,
          fromUserId: userId,
          referenceId: groupId,
        })),
      });
      // createMany doesn't return IDs; fetch them so we can fan-out push.
      // We query by the most-recent filter since createMany doesn't return records.
      if (created.count > 0) {
        const recent = await db.notification.findMany({
          where: {
            type: 'group_invite',
            referenceId: groupId,
            fromUserId: userId,
          },
          orderBy: { createdAt: 'desc' },
          take: created.count,
          select: { id: true },
        });
        recent.forEach((n) => sendPushForNotification(n.id));
      }
    }

    return Response.json(
      { message: 'Joined group successfully', membership, group: { id: group.id, name: group.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error joining group:', error);
    return Response.json({ error: 'Failed to join group' }, { status: 500 });
  }
}
