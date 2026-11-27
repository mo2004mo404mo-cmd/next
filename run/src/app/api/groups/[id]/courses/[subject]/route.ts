import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/courses/[subject] — get course (subject) metadata
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; subject: string }> }
) {
  try {
    const { id, subject } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    // subject is URL-encoded in the path
    const subjectName = decodeURIComponent(subject);
    const meta = await db.groupCourseMeta.findUnique({
      where: { groupId_subject: { groupId: id, subject: subjectName } },
    });

    return Response.json({ meta: meta || { coverUrl: '', description: '' } });
  } catch (error) {
    console.error('Error getting course meta:', error);
    return Response.json({ error: 'Failed to get course meta' }, { status: 500 });
  }
}

// PUT /api/groups/[id]/courses/[subject] — set course (subject) metadata
// Admin-only: sets the cover image URL and/or description for a course.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; subject: string }> }
) {
  try {
    const { id, subject } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });
    if (membership.role !== 'admin' && membership.role !== 'moderator') {
      return Response.json({ error: 'Only admins can edit course metadata' }, { status: 403 });
    }

    const subjectName = decodeURIComponent(subject);
    const body = await request.json();
    const { coverUrl, description } = body;

    const meta = await db.groupCourseMeta.upsert({
      where: { groupId_subject: { groupId: id, subject: subjectName } },
      create: {
        groupId: id,
        subject: subjectName,
        coverUrl: coverUrl || '',
        description: description || '',
      },
      update: {
        ...(coverUrl !== undefined && { coverUrl }),
        ...(description !== undefined && { description }),
      },
    });

    return Response.json({ meta });
  } catch (error) {
    console.error('Error updating course meta:', error);
    return Response.json({ error: 'Failed to update course meta' }, { status: 500 });
  }
}
