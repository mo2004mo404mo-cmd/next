import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { readConfig, createZAI } from '@/lib/zai';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

/**
 * POST /api/groups/[id]/ai-assistant
 *
 * Group-scoped AI study assistant. Powered by the ZAI SDK (same backend as
 * the existing /api/tutor route). The endpoint is multi-mode so the same
 * UI surface can support the four most valuable AI affordances for a
 * study group:
 *
 *   mode = 'tutor'      → free-form medical Q&A about lecture topics
 *   mode = 'summarize'  → condense a lecture's chunks into a study summary
 *   mode = 'quiz'       → generate practice MCQs from lecture content
 *   mode = 'explain'    → explain a specific question's answer in depth
 *
 * Request body:
 *   { message: string, mode?: 'tutor'|'summarize'|'quiz'|'explain',
 *     history?: Array<{role, content}>, lectureId?: string, questionId?: string }
 *
 * Response:
 *   { response: string, mode: string }
 */

const TUTOR_SYSTEM_PROMPT = `You are MedQ Group AI Tutor, an expert medical education assistant embedded inside a small-group study workspace. You help students understand lecture content, explain pathophysiology, pharmacology, and clinical reasoning, and generate practice questions.

Style:
- Be encouraging, accurate, and use proper medical terminology.
- Use Markdown for structure (headings, bullet points, bold for key terms).
- When useful, include mnemonics, clinical pearls, and quick tables.
- Always ground answers in the provided lecture context when available.
- Emphasize that responses are for educational purposes, not medical advice.

If the user's question is unrelated to medicine or the group's lecture content, gently redirect to the study context.`;

const SUMMARIZE_SYSTEM_PROMPT = `You are MedQ Group AI Tutor. Produce a structured study summary from the provided lecture content. Format your response as Markdown with these sections:

## Key Concepts
- 3-6 bullet points naming the central concepts

## Mechanism / Pathophysiology
- 2-4 sentences explaining the underlying mechanism

## Clinical Pearls
- 2-3 high-yield facts a student must remember

## Common Pitfalls
- 1-2 misconceptions or traps to avoid on exams

## Rapid Review
- A 5-7 bullet quick-recap list

Be concise but information-dense. Do not include content not supported by the provided lecture material.`;

const QUIZ_SYSTEM_PROMPT = `You are MedQ Group AI Tutor. Generate 3 high-quality MCQs from the provided lecture content to test the student's understanding. Each MCQ must have 4 options (A-D), one correct answer, and a 1-2 sentence explanation.

Return STRICT JSON in this shape (no markdown fences, no extra commentary):
{
  "questions": [
    {
      "stem": "Question text?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answerIndex": 0,
      "explanation": "Why A is correct..."
    }
  ]
}

The questions should span different difficulty levels (1 basic, 1 moderate, 1 clinical-application). Base every question on the provided lecture content. Do not invent facts.`;

const EXPLAIN_SYSTEM_PROMPT = `You are MedQ Group AI Tutor. A student is asking for a deeper explanation of a question they got wrong (or want to understand better). Produce a clear, structured explanation in Markdown:

## Why the correct answer is right
- 2-3 sentences

## Why the other options are wrong
- One short bullet per wrong option

## Key concept
- 1-2 sentences naming the underlying principle

## Clinical pearl
- One memorable fact

Use the provided question + answer + explanation as ground truth. Do not contradict it.`;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const body = await request.json();
    const {
      message,
      mode = 'tutor',
      history = [],
      lectureId,
      questionId,
    } = body as {
      message?: string;
      mode?: 'tutor' | 'summarize' | 'quiz' | 'explain';
      history?: Array<{ role: string; content: string }>;
      lectureId?: string;
      questionId?: string;
    };

    if (!message || typeof message !== 'string' || !message.trim()) {
      // 'summarize' and 'quiz' modes can be invoked without a user message —
      // they auto-derive their prompt from the lecture context. Tutor and
      // explain require an explicit user prompt.
      if (mode !== 'summarize' && mode !== 'quiz') {
        return NextResponse.json(
          { error: 'Message is required for this mode' },
          { status: 400 },
        );
      }
    }

    // ── Resolve optional lecture context ──────────────────────────────────
    let lectureContext = '';
    if (lectureId) {
      const lecture = await db.groupLecture.findUnique({
        where: { id: lectureId },
        include: {
          chunks: { orderBy: { order: 'asc' } },
        },
      });
      if (lecture && lecture.groupId === id) {
        const chunkDigest = lecture.chunks.map((c, i) => {
          const body =
            c.type === 'text' ? c.textContent :
            c.type === 'link' ? `[link: ${c.url}]` :
            c.type === 'video' ? `[video: ${c.url}]` :
            c.type === 'audio' ? `[audio: ${c.url}]` :
            c.type === 'pdf' ? `[pdf: ${c.url}]` :
            c.type === 'image' ? `[image: ${c.url}]` :
            '';
          return `  Section ${i + 1}: ${c.title}\n    ${body}`.trim();
        }).join('\n');
        lectureContext = `LECTURE CONTEXT (use this as the source of truth):
Title: ${lecture.title}
System: ${lecture.system}
Topic: ${lecture.topic}
Description: ${lecture.description}

Sections:
${chunkDigest}

END LECTURE CONTEXT.`;
      }
    }

    // ── Resolve optional question context (for 'explain' mode) ────────────
    let questionContext = '';
    if (questionId) {
      const q = await db.groupQuestion.findUnique({ where: { id: questionId } });
      if (q && q.groupId === id) {
        let options: string[] = [];
        try { options = JSON.parse(q.options); } catch {}
        questionContext = `QUESTION CONTEXT (use this as ground truth):
Question: ${q.text}
Options:
${options.map((o, i) => `  ${String.fromCharCode(65 + i)}. ${o}`).join('\n')}
Correct answer: ${q.answer}
Stored explanation: ${q.explanation}
Difficulty: ${q.difficulty}
Category: ${q.category}

END QUESTION CONTEXT.`;
      }
    }

    // ── Build prompt based on mode ────────────────────────────────────────
    let systemPrompt = TUTOR_SYSTEM_PROMPT;
    let userPrompt = message || '';

    if (mode === 'summarize') {
      systemPrompt = SUMMARIZE_SYSTEM_PROMPT;
      userPrompt = `Please summarize the following lecture content for review.\n\n${lectureContext}`;
      if (message) userPrompt += `\n\nStudent's specific focus: ${message}`;
    } else if (mode === 'quiz') {
      systemPrompt = QUIZ_SYSTEM_PROMPT;
      userPrompt = `Generate 3 MCQs based on the following lecture content.\n\n${lectureContext}`;
      if (message) userPrompt += `\n\nStudent's specific focus: ${message}`;
    } else if (mode === 'explain') {
      systemPrompt = EXPLAIN_SYSTEM_PROMPT;
      userPrompt = `Explain this question in depth.\n\n${questionContext}\n\nStudent's question: ${message || 'Explain this question.'}`;
    } else {
      // tutor mode — append lecture context if provided
      if (lectureContext) {
        userPrompt = `${lectureContext}\n\nStudent's question: ${message}`;
      }
      if (questionContext) {
        userPrompt = `${questionContext}\n\nStudent's question: ${message}`;
      }
    }

    // ── Compose messages ──────────────────────────────────────────────────
    const recentHistory = Array.isArray(history)
      ? history.slice(-10).map(h => ({
          role: h.role === 'user' || h.role === 'assistant' ? h.role : 'user',
          content: String(h.content),
        }))
      : [];

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...recentHistory,
      { role: 'user' as const, content: userPrompt },
    ];

    // ── Call ZAI ──────────────────────────────────────────────────────────
    const config = readConfig();
    if (!config) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 },
      );
    }
    const zai = await createZAI(config.token);

    const completion = await zai.chat.completions.create({
      model: 'auto',
      messages,
    });

    const response =
      completion.choices?.[0]?.message?.content ||
      'I apologize, but I was unable to generate a response. Please try again.';

    // ── Optional: log the interaction as a StudySession ───────────────────
    // Best-effort — don't fail the request if analytics logging fails.
    try {
      await db.studySession.create({
        data: {
          userId: user.id,
          type: 'group-ai-tutor',
          questionsStudied: mode === 'quiz' ? 3 : 0,
          correctAnswers: 0,
          totalTimeSpent: 0,
          metadata: JSON.stringify({ groupId: id, mode, lectureId: lectureId || null, questionId: questionId || null }),
        },
      });
    } catch (logErr) {
      console.warn('Group AI assistant: failed to log StudySession:', logErr);
    }

    return NextResponse.json({ response, mode });
  } catch (error) {
    console.error('Group AI assistant error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI assistant failed' },
      { status: 500 },
    );
  }
}
