import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups/my — Get groups the current user has joined.
// Resilient auth: NextAuth session first, then x-user-id header fallback
// (so unauthenticated Guest browsing still sees seeded demo groups).
export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const where: any = { userId };
    if (type) {
      where.group = { type };
    }

    const memberships = await db.groupMember.findMany({
      where,
      orderBy: { joinedAt: 'desc' },
      include: {
        group: {
          include: {
            members: {
              take: 3,
              orderBy: { joinedAt: 'asc' },
              include: {
                user: {
                  select: { id: true, name: true, image: true },
                },
              },
            },
            _count: {
              select: { posts: true },
            },
          },
        },
      },
    });

    // Enrich with the user's role in each group
    const groups = memberships.map((membership) => ({
      ...membership.group,
      userRole: membership.role,
      joinedAt: membership.joinedAt,
      postCount: membership.group._count?.posts || 0,
      previewMembers: membership.group.members,
    }));

    return Response.json({ groups, total: groups.length });
  } catch (error) {
    console.error('Error getting user groups:', error);
    return Response.json({ error: 'Failed to get user groups' }, { status: 500 });
  }
}
