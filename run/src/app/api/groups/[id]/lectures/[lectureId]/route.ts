import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// PATCH /api/groups/[id]/lectures/[lectureId] — update lecture + chunks
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; lectureId: string }> }
) {
  try {
    const { id, lectureId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const lecture = await db.groupLecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.groupId !== id) {
      return Response.json({ error: 'Lecture not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, system, topic, coverUrl, order, chunks } = body;

    // Replace chunks if provided
    if (chunks && Array.isArray(chunks)) {
      await db.groupLectureChunk.deleteMany({ where: { lectureId } });
      // Also clean up per-chunk progress records that referenced the now-
      // deleted chunks. We keep the lecture-level progress record
      // (chunkId === null) so "lecture completed" state survives edits,
      // but per-chunk completion is reset since the chunks no longer exist.
      await db.groupLectureProgress.deleteMany({
        where: { lectureId, chunkId: { not: null } },
      });
      if (chunks.length > 0) {
        await db.groupLectureChunk.createMany({
          data: chunks.map((c: any, i: number) => ({
            lectureId,
            title: c.title || `Section ${i + 1}`,
            sourceTitle: c.sourceTitle || '',
            sourceDescription: c.sourceDescription || '',
            type: c.type || 'video',
            url: c.url || '',
            textContent: c.textContent || '',
            duration: Number(c.duration) || 0,
            order: i,
            // Section-level metadata — same values written to every chunk in
            // the section so they stay in sync regardless of which source the
            // student picks.
            sectionDescription: c.sectionDescription || '',
            sectionObjectives: c.sectionObjectives || '',
            sectionTags: c.sectionTags || '',
            estimatedMinutes: Number(c.estimatedMinutes) || 0,
          })),
        });
      }
    }

    const updated = await db.groupLecture.update({
      where: { id: lectureId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(system !== undefined && { system }),
        ...(topic !== undefined && { topic }),
        ...(coverUrl !== undefined && { coverUrl }),
        ...(order !== undefined && { order: Number(order) }),
      },
      include: {
        chunks: { orderBy: { order: 'asc' } },
        author: { select: { id: true, name: true, image: true } },
      },
    });

    return Response.json({ lecture: updated });
  } catch (error) {
    console.error('Error updating group lecture:', error);
    return Response.json({ error: 'Failed to update lecture' }, { status: 500 });
  }
}

// DELETE /api/groups/[id]/lectures/[lectureId]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; lectureId: string }> }
) {
  try {
    const { id, lectureId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const lecture = await db.groupLecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.groupId !== id) {
      return Response.json({ error: 'Lecture not found' }, { status: 404 });
    }

    // Only author or admin can delete
    if (lecture.authorId !== user.id && membership.role !== 'admin') {
      return Response.json({ error: 'Only the author or admin can delete' }, { status: 403 });
    }

    await db.groupLecture.delete({ where: { id: lectureId } });
    return Response.json({ message: 'Lecture deleted' });
  } catch (error) {
    console.error('Error deleting group lecture:', error);
    return Response.json({ error: 'Failed to delete lecture' }, { status: 500 });
  }
}
