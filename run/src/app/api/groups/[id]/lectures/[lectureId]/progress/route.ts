import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups/[id]/lectures/[lectureId]/progress
// Returns the current user's per-chunk completion + overall % for one lecture
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; lectureId: string }> }
) {
  try {
    const { id, lectureId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const lecture = await db.groupLecture.findUnique({
      where: { id: lectureId },
      include: { chunks: { orderBy: { order: 'asc' } } },
    });
    if (!lecture || lecture.groupId !== id) {
      return Response.json({ error: 'Lecture not found' }, { status: 404 });
    }

    const progress = await db.groupLectureProgress.findMany({
      where: { userId, lectureId },
    });

    const completedChunkIds = new Set(
      progress.filter(p => p.completed && p.chunkId).map(p => p.chunkId!)
    );
    const lectureCompleted = progress.some(p => p.completed && p.chunkId === null);
    const totalChunks = lecture.chunks.length;
    const completedCount = lecture.chunks.filter(c => completedChunkIds.has(c.id)).length;
    const pct = totalChunks > 0 ? Math.round((completedCount / totalChunks) * 100) : 0;

    return Response.json({
      completedChunkIds: Array.from(completedChunkIds),
      lectureCompleted,
      totalChunks,
      completedCount,
      pct,
    });
  } catch (error) {
    console.error('Error loading lecture progress:', error);
    return Response.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}

// POST /api/groups/[id]/lectures/[lectureId]/progress
// Body: { chunkId?: string, completed?: boolean, watchedSeconds?: number }
// If chunkId is null/undefined, marks the whole lecture completed.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; lectureId: string }> }
) {
  try {
    const { id, lectureId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const lecture = await db.groupLecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.groupId !== id) {
      return Response.json({ error: 'Lecture not found' }, { status: 404 });
    }

    const body = await request.json();
    const { chunkId = null, completed = true, watchedSeconds = 0 } = body;

    const rec = await db.groupLectureProgress.upsert({
      where: {
        userId_lectureId_chunkId: {
          userId,
          lectureId,
          chunkId: chunkId || null,
        },
      },
      update: {
        completed,
        watchedSeconds: watchedSeconds
          ? { increment: Number(watchedSeconds) }
          : undefined,
      },
      create: {
        userId,
        lectureId,
        chunkId: chunkId || null,
        completed,
        watchedSeconds: Number(watchedSeconds) || 0,
      },
    });

    return Response.json({ progress: rec });
  } catch (error) {
    console.error('Error saving lecture progress:', error);
    return Response.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}
