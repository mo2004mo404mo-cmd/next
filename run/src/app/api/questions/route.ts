import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { normalizeDifficulty, DIFFICULTY_LABELS, getDifficultyLevel } from '@/lib/medq-types';
import { invalidate, invalidatePath, CACHE_TAGS } from '@/lib/server/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const system = searchParams.get('system');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    // Citation-status filter: 'cited' (has chunk-level citations), 'uncited'
    // (none — honest drop or legacy), or 'verified' (≥1 citation with
    // answer-support judge score ≥ 8). 'verified' needs JSON inspection, so
    // it is resolved by ids (see below) to keep pagination exact.
    const citation = searchParams.get('citation');

    // Composable filter groups — each dimension contributes an AND group so
    // combining filters never clobbers another dimension's OR block (the old
    // flat `where.OR` assignments let search + difficulty overwrite each other).
    const andGroups: Record<string, unknown>[] = [];
    const where: Record<string, unknown> = {};
    if (system) where.system = system;
    if (topic) where.topic = { contains: topic };
    if (difficulty) {
      // Support numeric difficulty level (1-5) or label string
      const numDiff = parseInt(difficulty, 10);
      if (!isNaN(numDiff) && numDiff >= 1 && numDiff <= 5) {
        // Map level number to label, also include legacy 'Medium' mapping to 'Moderate'
        const label = DIFFICULTY_LABELS[numDiff];
        if (label === 'Moderate') {
          andGroups.push({ OR: [
            { difficulty: label },
            { difficulty: 'Medium' }, // legacy support
          ] });
        } else {
          where.difficulty = label;
        }
      } else {
        // Legacy label support: 'Medium' → also match 'Moderate'
        if (difficulty === 'Moderate') {
          andGroups.push({ OR: [
            { difficulty: 'Moderate' },
            { difficulty: 'Medium' }, // legacy
          ] });
        } else {
          where.difficulty = difficulty;
        }
      }
    }
    // Type filter. NOTE: type "flashcard" rows are agent-created spaced-
    // repetition cards (create_flashcards tool) — they belong to the
    // Flashcards page, not the MCQ bank, so the default listing excludes
    // them. An explicit ?type=flashcard (or any other type) still works.
    if (type) where.type = type;
    else where.type = { not: 'flashcard' };
    if (search) {
      andGroups.push({
        OR: [
          { text: { contains: search, mode: 'insensitive' } },
          { topic: { contains: search, mode: 'insensitive' } },
          { system: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (citation === 'cited' || citation === 'verified') {
      // Column is NOT NULL with default '[]' — "cited" = anything other than
      // the empty placeholder ('[]' or '').
      andGroups.push({ NOT: { OR: [{ citations: '[]' }, { citations: '' }] } });
    } else if (citation === 'uncited') {
      andGroups.push({ OR: [{ citations: '[]' }, { citations: '' }] });
    }
    if (andGroups.length) where.AND = andGroups;

    // 'verified': judgeScore lives inside the JSON citations text, so resolve
    // the qualifying ids first (one light scan over the already-filtered set),
    // then page over them by id — counts and pagination stay exact.
    let verifiedIds: string[] | null = null;
    if (citation === 'verified') {
      const citedRows = await db.question.findMany({
        where,
        select: { id: true, citations: true },
        orderBy: { createdAt: 'desc' },
      });
      verifiedIds = citedRows
        .filter((row) => {
          try {
            const arr = JSON.parse(row.citations || '[]') as Array<{ judgeScore?: number }>;
            return Array.isArray(arr) && arr.some((c) => typeof c?.judgeScore === 'number' && c.judgeScore >= 8);
          } catch {
            return false;
          }
        })
        .map((row) => row.id);
      where.id = { in: verifiedIds };
    }

    const [questions, total] = await Promise.all([
      db.question.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.question.count({ where }),
    ]);

    // Safely parse the JSON columns — a single malformed row (e.g. a
    // citations blob that was double-escaped at write time) used to abort
    // the WHOLE list request with a 500 + "Expected ',' or '}'" message,
    // taking the entire bank page offline. Each column is parsed in its own
    // try/catch so one bad row degrades gracefully (returns [] / {} for
    // that column) instead of poisoning the response.
    const safeJson = <T>(raw: string | null | undefined, fallback: T): T => {
      if (!raw) return fallback;
      try { return JSON.parse(raw) as T; } catch { return fallback; }
    };

    const formatted = questions.map((q) => ({
      ...q,
      options: safeJson(q.options, []),
      tags: safeJson(q.tags, []),
      sources: safeJson(q.sources, []),
      // Advanced chunk-level citations: {sourceId, chunkId, title, fileKind, quote}
      citations: safeJson(q.citations, []),
      diagramSpec: q.diagramSpec || undefined,
      molecularScenes: q.molecularScenes || undefined,
      difficultyLevel: getDifficultyLevel(normalizeDifficulty(q.difficulty || 'Moderate')),
    }));

    return NextResponse.json({
      questions: formatted,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Questions GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      text,
      options,
      answer,
      explanation,
      mnemonic,
      clinicalPearl,
      distractorAnalysis,
      difficulty,
      system,
      topic,
      tags,
      isAIGenerated,
      illustrationDescription,
      diagramSpec,
      molecularScenes,
      sources,
      organInvolvement,
      mechanismDiagram,
      visualSummary,
    } = body;

    if (!text || !type) {
      return NextResponse.json({ error: 'Text and type are required' }, { status: 400 });
    }

    // Process diagramSpec - stringify if object, keep as string if already string
    let diagramSpecStr = '';
    if (diagramSpec) {
      diagramSpecStr = typeof diagramSpec === 'string' ? diagramSpec : JSON.stringify(diagramSpec);
    }

    // Process molecularScenes - stringify if object
    let molecularScenesStr = '';
    if (molecularScenes) {
      molecularScenesStr = typeof molecularScenes === 'string' ? molecularScenes : JSON.stringify(molecularScenes);
    }

    // Process sources - stringify if array
    let sourcesStr = '[]';
    if (sources) {
      sourcesStr = typeof sources === 'string' ? sources : JSON.stringify(sources);
    }

    const question = await db.question.create({
      data: {
        type: type || 'mcq',
        text: text || '',
        options: JSON.stringify(options || []),
        answer: answer || '',
        explanation: explanation || '',
        mnemonic: mnemonic || '',
        clinicalPearl: clinicalPearl || '',
        distractorAnalysis: distractorAnalysis || '',
        difficulty: difficulty || 'Moderate',
        system: system || '',
        topic: topic || '',
        tags: JSON.stringify(tags || []),
        isAIGenerated: isAIGenerated || false,
        illustrationDescription: illustrationDescription || '',
        diagramSpec: diagramSpecStr,
        molecularScenes: molecularScenesStr,
        sources: sourcesStr,
        organInvolvement: organInvolvement || '',
        mechanismDiagram: mechanismDiagram || '',
        visualSummary: visualSummary || '',
      },
    });

    // Bust the SSR cache so /bank and any cached question-by-id entries
    // pick up the new question on the next render.
    await invalidate(CACHE_TAGS.questions);
    await invalidatePath('/bank');

    return NextResponse.json({
      ...question,
      options: JSON.parse(question.options),
      tags: JSON.parse(question.tags),
      sources: question.sources ? JSON.parse(question.sources) : [],
      diagramSpec: question.diagramSpec || undefined,
      molecularScenes: question.molecularScenes || undefined,
    });
  } catch (error) {
    console.error('Questions POST error:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids array is required' }, { status: 400 });
    }

    // Delete exam question references first (cascade)
    await db.examQuestion.deleteMany({
      where: { questionId: { in: ids } },
    });

    // Delete the questions
    const result = await db.question.deleteMany({
      where: { id: { in: ids } },
    });

    // Bust the SSR cache so /bank and cached question-by-id entries
    // stop serving the deleted questions.
    await invalidate(CACHE_TAGS.questions, CACHE_TAGS.questionById);
    await invalidatePath('/bank');

    return NextResponse.json({ deleted: result.count });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete questions' },
      { status: 500 }
    );
  }
}
