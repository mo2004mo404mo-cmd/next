import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/lectures/progress
// Returns a map of lectureId -> { pct, completedCount, totalChunks, lectureCompleted }
// for the current user, across all lectures in the group.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const lectures = await db.groupLecture.findMany({
      where: { groupId: id },
      include: { _count: { select: { chunks: true } } },
    });
    const lectureIds = lectures.map(l => l.id);

    const progress = await db.groupLectureProgress.findMany({
      where: { userId: user.id, lectureId: { in: lectureIds } },
      select: { lectureId: true, chunkId: true, completed: true },
    });

    const byLecture = new Map<string, { completedChunkIds: Set<string>; lectureCompleted: boolean }>();
    for (const p of progress) {
      const entry = byLecture.get(p.lectureId) || { completedChunkIds: new Set<string>(), lectureCompleted: false };
      if (p.completed && p.chunkId) entry.completedChunkIds.add(p.chunkId);
      if (p.completed && p.chunkId === null) entry.lectureCompleted = true;
      byLecture.set(p.lectureId, entry);
    }

    const result: Record<string, { pct: number; completedCount: number; totalChunks: number; lectureCompleted: boolean }> = {};
    for (const l of lectures) {
      const total = l._count.chunks;
      const entry = byLecture.get(l.id);
      const completedCount = entry ? entry.completedChunkIds.size : 0;
      result[l.id] = {
        totalChunks: total,
        completedCount,
        pct: total > 0 ? Math.round((completedCount / total) * 100) : 0,
        lectureCompleted: entry?.lectureCompleted ?? false,
      };
    }

    return Response.json({ progress: result });
  } catch (error) {
    console.error('Error loading lecture progress map:', error);
    return Response.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}
