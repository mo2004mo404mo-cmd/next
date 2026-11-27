import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/lectures — list lectures in a group (members only)
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
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        chunks: { orderBy: { order: 'asc' } },
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { questions: true } },
      },
    });

    // Fetch course (subject) metadata — cover images + descriptions set by
    // admins. Returned as a map so the UI can look up each subject's meta.
    const courseMetas = await db.groupCourseMeta.findMany({
      where: { groupId: id },
    });
    const courseMetaMap = new Map(courseMetas.map(m => [m.subject, m]));

    // Attach current user's per-lecture progress (pct, completedCount, lectureCompleted)
    const progress = await db.groupLectureProgress.findMany({
      where: { userId: user.id, lectureId: { in: lectures.map(l => l.id) } },
      select: { lectureId: true, chunkId: true, completed: true },
    });
    const byLecture = new Map<string, { completedChunkIds: Set<string>; lectureCompleted: boolean }>();
    for (const p of progress) {
      const entry = byLecture.get(p.lectureId) || { completedChunkIds: new Set<string>(), lectureCompleted: false };
      if (p.completed && p.chunkId) entry.completedChunkIds.add(p.chunkId);
      if (p.completed && p.chunkId === null) entry.lectureCompleted = true;
      byLecture.set(p.lectureId, entry);
    }

    return Response.json({
      lectures: lectures.map(l => {
        const entry = byLecture.get(l.id);
        const completedChunkIds = entry ? entry.completedChunkIds : new Set<string>();
        // Count CURRENT chunks that are marked done — orphaned progress
        // records (pointing to chunk IDs that no longer exist, e.g. after
        // a lecture was edited and chunks were replaced) are ignored.
        const completedCount = l.chunks.filter(c => completedChunkIds.has(c.id)).length;
        const total = l.chunks.length;

        // Group chunks by title into sections — chunks with the same title
        // are ALTERNATIVE sources for the same section. A section is
        // "complete" when ALL its alternative chunks are marked done (which
        // is what happens when the user clicks "Mark section complete" in
        // the viewer — the viewer POSTs completion for every chunk in the
        // section). Progress is reported at the SECTION level so adding
        // more alternative sources to a section does NOT dilute progress.
        const sectionTitles = new Set<string>();
        for (const c of l.chunks) sectionTitles.add(c.title || 'Untitled section');
        const totalSections = sectionTitles.size;
        const sectionsByTitle = new Map<string, { total: number; done: number }>();
        for (const c of l.chunks) {
          const key = c.title || 'Untitled section';
          if (!sectionsByTitle.has(key)) sectionsByTitle.set(key, { total: 0, done: 0 });
          const s = sectionsByTitle.get(key)!;
          s.total += 1;
          if (completedChunkIds.has(c.id)) s.done += 1;
        }
        let completedSections = 0;
        for (const s of sectionsByTitle.values()) {
          if (s.total > 0 && s.done === s.total) completedSections += 1;
        }
        const sectionPct = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

        return {
          ...l,
          progress: {
            totalChunks: total,
            completedCount,
            // Section-level progress (what the UI actually displays now)
            totalSections,
            completedSections,
            pct: sectionPct,
            lectureCompleted: entry?.lectureCompleted ?? false,
          },
        };
      }),
      // courseMeta — map of subject name → { coverUrl, description }. Used by
      // the UI to show course cover images and descriptions on course cards
      // and the course detail page.
      courseMeta: Object.fromEntries(courseMetaMap.entries()),
    });
  } catch (error) {
    console.error('Error listing group lectures:', error);
    return Response.json({ error: 'Failed to list lectures' }, { status: 500 });
  }
}

// POST /api/groups/[id]/lectures — create a lecture (admin/moderator/educator)
export async function POST(
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

    const body = await request.json();
    const { title, description, system, topic, coverUrl, chunks } = body;

    if (!title || !title.trim()) {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }

    const lecture = await db.groupLecture.create({
      data: {
        groupId: id,
        authorId: user.id,
        title: title.trim(),
        description: description || '',
        system: system || '',
        topic: topic || '',
        coverUrl: coverUrl || '',
        chunks: chunks && Array.isArray(chunks) && chunks.length > 0
          ? {
              create: chunks.map((c: any, i: number) => ({
                title: c.title || `Section ${i + 1}`,
                sourceTitle: c.sourceTitle || '',
                sourceDescription: c.sourceDescription || '',
                type: c.type || 'video',
                url: c.url || '',
                textContent: c.textContent || '',
                duration: Number(c.duration) || 0,
                order: i,
                // Section-level metadata — shared across all alternative
                // sources (chunks) of the same section. Stored per-chunk but
                // semantically section-level; the UI writes the same values
                // to every chunk in the section.
                sectionDescription: c.sectionDescription || '',
                sectionObjectives: c.sectionObjectives || '',
                sectionTags: c.sectionTags || '',
                estimatedMinutes: Number(c.estimatedMinutes) || 0,
              })),
            }
          : undefined,
      },
      include: {
        chunks: { orderBy: { order: 'asc' } },
        author: { select: { id: true, name: true, image: true } },
      },
    });

    return Response.json({ lecture }, { status: 201 });
  } catch (error) {
    console.error('Error creating group lecture:', error);
    return Response.json({ error: 'Failed to create lecture' }, { status: 500 });
  }
}
