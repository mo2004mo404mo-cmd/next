import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';

/**
 * POST /api/questions/share
 *   Body: { questionId, target: 'chat' | 'group' | 'feed', targetId? }
 *
 * Shares a question card into a chat room, a group feed, or the public feed —
 * WITH ITS MEDIA INTACT: the full card payload (stem, options, answer,
 * explanation, ECG strip / image / audio / 3D model URLs, lab panels,
 * phonocardiogram) travels in the message metadata, so the receiving surface
 * can render an interactive, playable question card.
 */

function absoluteUrl(req: NextRequest, path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const origin = req.nextUrl.origin;
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function POST(req: NextRequest) {
  const userId = await resolveUserId();
  if (!userId) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  try {
    const body = await req.json();
    const { questionId, target, targetId } = body as {
      questionId: string;
      target: 'chat' | 'group' | 'feed';
      targetId?: string;
    };

    if (!questionId) return NextResponse.json({ error: 'Question ID required' }, { status: 400 });
    if (!target) return NextResponse.json({ error: 'Target required (chat/group/feed)' }, { status: 400 });

    // Get question data
    const question = await db.question.findUnique({ where: { id: questionId } });
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 });

    const isEcg = Boolean(question.imageUrl && question.imageUrl.startsWith('/generated/agent/ecg/'));

    // Safely parse the JSON columns — a malformed row (rare, but observed
    // when a citations blob was double-escaped at write time) used to make
    // this whole endpoint 500. Degrade gracefully per column instead.
    const safeJson = <T>(raw: string | null | undefined, fallback: T): T => {
      if (!raw) return fallback;
      try { return JSON.parse(raw) as T; } catch { return fallback; }
    };

    // Full interactive card payload — media resolved to absolute URLs so it
    // renders (and plays) from any client that receives the message.
    const questionCard = {
      questionId: question.id,
      type: question.type,
      text: question.text,
      options: safeJson(question.options, []),
      answer: question.answer,
      explanation: question.explanation,
      system: question.system,
      topic: question.topic,
      difficulty: question.difficulty,
      isAIGenerated: question.isAIGenerated,
      reviewStatus: question.reviewStatus,
      blueprintOrgan: question.blueprintOrgan,
      blueprintTask: question.blueprintTask,
      labPanel: question.labPanel || '[]',
      pcgSpec: question.pcgSpec || '',
      hotspots: question.hotspots || '[]',
      structureTags: question.structureTags || '[]',
      media: {
        isEcg,
        imageUrl: absoluteUrl(req, question.imageUrl),
        audioUrl: absoluteUrl(req, question.audioUrl),
        videoUrl: absoluteUrl(req, question.videoUrl),
        modelUrl: absoluteUrl(req, question.modelUrl),
      },
      sources: safeJson(question.sources, []),
      sharedAt: new Date().toISOString(),
    };

    const preview = question.text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);

    if (target === 'chat' && targetId) {
      // Verify the sender is a member of the room
      const membership = await db.chatRoomMember.findUnique({
        where: { roomId_userId: { roomId: targetId, userId } },
      });
      if (!membership) return NextResponse.json({ error: 'Not a member of that chat' }, { status: 403 });

      await db.chatMessage.create({
        data: {
          roomId: targetId,
          senderId: userId,
          type: 'question_card',
          content: `Shared a ${question.system || 'medical'} question`,
          metadata: JSON.stringify(questionCard),
        },
      });
      // Bump room activity so the chat sorts to the top
      await db.chatRoom.update({
        where: { id: targetId },
        data: { lastMessageAt: new Date() },
      }).catch(() => { /* best effort */ });
    } else if (target === 'group' && targetId) {
      // Verify membership
      const membership = await db.groupMember.findUnique({
        where: { groupId_userId: { groupId: targetId, userId } },
      });
      if (!membership) return NextResponse.json({ error: 'Not a member of that group' }, { status: 403 });

      await db.post.create({
        data: {
          authorId: userId,
          groupId: targetId,
          type: 'question_card',
          content: `Shared a ${question.system || 'medical'} question: ${preview}…`,
          metadata: JSON.stringify(questionCard),
        },
      });
    } else if (target === 'feed') {
      await db.post.create({
        data: {
          authorId: userId,
          type: 'question_card',
          content: `Shared a ${question.system || 'medical'} question: ${preview}…`,
          metadata: JSON.stringify(questionCard),
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid target or missing targetId' }, { status: 400 });
    }

    return NextResponse.json({ success: true, target, questionId, mediaCount: Object.values(questionCard.media).filter(Boolean).length });
  } catch (error) {
    console.error('[Question Share] Error:', error);
    return NextResponse.json({ error: 'Failed to share question' }, { status: 500 });
  }
}
