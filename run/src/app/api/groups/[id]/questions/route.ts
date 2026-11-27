import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

const VALID_CATEGORIES = ['previous_exam', 'lecture', 'doctor', 'high_yield'];

// GET /api/groups/[id]/questions — list questions with optional filters
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const lectureId = searchParams.get('lectureId');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');
    const bookmarked = searchParams.get('bookmarked') === '1';

    const where: any = { groupId: id };
    if (category && VALID_CATEGORIES.includes(category)) where.category = category;
    if (lectureId) where.lectureId = lectureId;
    if (search) where.text = { contains: search };
    if (difficulty) where.difficulty = difficulty;

    // If bookmarked filter is on, restrict to user's bookmarks
    if (bookmarked) {
      const bm = await db.groupQuestionBookmark.findMany({
        where: { userId: user.id, groupId: id },
        select: { questionId: true },
      });
      where.id = { in: bm.map(b => b.questionId) };
    }

    const questions = await db.groupQuestion.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      include: {
        author: { select: { id: true, name: true, image: true } },
        lecture: { select: { id: true, title: true } },
        _count: { select: { attempts: true, comments: true } },
      },
    });

    // Attach the current user's attempt stats + bookmark flag per question
    const attempts = await db.groupQuizAttempt.findMany({
      where: { userId: user.id, groupId: id, questionId: { in: questions.map(q => q.id) } },
      select: { questionId: true, isCorrect: true },
    });
    const attemptMap = new Map<string, { count: number; correct: number }>();
    for (const a of attempts) {
      const cur = attemptMap.get(a.questionId) || { count: 0, correct: 0 };
      cur.count += 1;
      if (a.isCorrect) cur.correct += 1;
      attemptMap.set(a.questionId, cur);
    }

    const bmRecs = await db.groupQuestionBookmark.findMany({
      where: { userId: user.id, questionId: { in: questions.map(q => q.id) } },
      select: { questionId: true },
    });
    const bmSet = new Set(bmRecs.map(b => b.questionId));

    return Response.json({
      questions: questions.map(q => ({
        ...q,
        myAttempts: attemptMap.get(q.id) || { count: 0, correct: 0 },
        bookmarked: bmSet.has(q.id),
      })),
    });
  } catch (error) {
    console.error('Error listing group questions:', error);
    return Response.json({ error: 'Failed to list questions' }, { status: 500 });
  }
}

// POST /api/groups/[id]/questions — add a question (admin/moderator/educator/doctor)
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
    const {
      category, type, text, options, answer, explanation,
      difficulty, system, topic, tags, lectureId,
    } = body;

    if (!text || !text.trim()) {
      return Response.json({ error: 'Question text is required' }, { status: 400 });
    }
    if (!answer || !answer.trim()) {
      return Response.json({ error: 'Answer is required' }, { status: 400 });
    }

    const finalCategory = VALID_CATEGORIES.includes(category) ? category : 'lecture';

    const question = await db.groupQuestion.create({
      data: {
        groupId: id,
        authorId: user.id,
        lectureId: lectureId || null,
        category: finalCategory,
        type: type || 'mcq',
        text: text.trim(),
        options: JSON.stringify(options || []),
        answer: answer.trim(),
        explanation: explanation || '',
        difficulty: difficulty || 'Moderate',
        system: system || '',
        topic: topic || '',
        tags: JSON.stringify(tags || []),
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        lecture: { select: { id: true, title: true } },
      },
    });

    return Response.json({ question }, { status: 201 });
  } catch (error) {
    console.error('Error creating group question:', error);
    return Response.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
