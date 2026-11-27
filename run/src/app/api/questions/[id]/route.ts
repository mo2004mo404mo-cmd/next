import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/** Safely parse a JSON column — a single malformed row (e.g. a citations
 *  blob double-escaped at write time) used to abort the WHOLE request with
 *  a 500 + "Expected ',' or '}'" message. Each column is parsed in its
 *  own try/catch so one bad value degrades gracefully (returns [] / {})
 *  instead of poisoning the response. */
function safeJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = await db.question.findUnique({ where: { id } });
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...question,
      options: safeJson(question.options, []),
      tags: safeJson(question.tags, []),
      sources: safeJson(question.sources, []),
      citations: safeJson(question.citations, []),
      diagramSpec: question.diagramSpec || undefined,
      molecularScenes: question.molecularScenes || undefined,
    });
  } catch (error) {
    console.error('Question GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      illustrationDescription,
      diagramSpec,
      molecularScenes,
      sources,
      organInvolvement,
      mechanismDiagram,
      visualSummary,
      imageUrl,
      audioUrl,
      videoUrl,
      videoTaskId,
    } = body;

    const data: Record<string, unknown> = {};
    if (type !== undefined) data.type = type;
    if (text !== undefined) data.text = text;
    if (options !== undefined) data.options = JSON.stringify(options);
    if (answer !== undefined) data.answer = answer;
    if (explanation !== undefined) data.explanation = explanation;
    if (mnemonic !== undefined) data.mnemonic = mnemonic;
    if (clinicalPearl !== undefined) data.clinicalPearl = clinicalPearl;
    if (distractorAnalysis !== undefined) data.distractorAnalysis = distractorAnalysis;
    if (difficulty !== undefined) data.difficulty = difficulty;
    if (system !== undefined) data.system = system;
    if (topic !== undefined) data.topic = topic;
    if (tags !== undefined) data.tags = JSON.stringify(tags);
    if (illustrationDescription !== undefined) data.illustrationDescription = illustrationDescription;
    if (organInvolvement !== undefined) data.organInvolvement = organInvolvement;
    if (mechanismDiagram !== undefined) data.mechanismDiagram = mechanismDiagram;
    if (visualSummary !== undefined) data.visualSummary = visualSummary;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (audioUrl !== undefined) data.audioUrl = audioUrl;
    if (videoUrl !== undefined) data.videoUrl = videoUrl;
    if (videoTaskId !== undefined) data.videoTaskId = videoTaskId;

    // Process diagramSpec - stringify if object
    if (diagramSpec !== undefined) {
      data.diagramSpec = typeof diagramSpec === 'string' ? diagramSpec : JSON.stringify(diagramSpec);
    }
    // Process molecularScenes - stringify if object
    if (molecularScenes !== undefined) {
      data.molecularScenes = typeof molecularScenes === 'string' ? molecularScenes : JSON.stringify(molecularScenes);
    }
    // Process sources - stringify if array
    if (sources !== undefined) {
      data.sources = typeof sources === 'string' ? sources : JSON.stringify(sources);
    }

    const question = await db.question.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      ...question,
      options: safeJson(question.options, []),
      tags: safeJson(question.tags, []),
      sources: safeJson(question.sources, []),
      citations: safeJson(question.citations, []),
      diagramSpec: question.diagramSpec || undefined,
      molecularScenes: question.molecularScenes || undefined,
    });
  } catch (error) {
    console.error('Question PUT error:', error);
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.question.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Question DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
