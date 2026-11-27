import { NextRequest, NextResponse } from 'next/server';
import { generateMedQQuestions } from '@/lib/agent/deep-agent-runtime';
import type { Question } from '@/lib/medq-types';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    topic?: unknown;
    system?: unknown;
    types?: unknown;
    difficulties?: unknown;
    count?: unknown;
    sourceText?: unknown;
  };

  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
  }

  try {
    const questions = await generateMedQQuestions({
      topic,
      system: typeof body.system === 'string' ? body.system : 'General',
      types: Array.isArray(body.types) ? body.types.filter((value): value is string => typeof value === 'string') : ['mcq'],
      difficulties: Array.isArray(body.difficulties) ? body.difficulties.filter((value): value is string => typeof value === 'string') : ['Medium'],
      count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 10),
      sourceText: typeof body.sourceText === 'string' ? body.sourceText.slice(0, 100_000) : undefined,
    });

    const now = new Date().toISOString();
    const result: Question[] = questions.map((value, index): Question => {
      const question = value && typeof value === 'object' ? value as Partial<Question> : {};
      const nestedDifficulty = (question.difficulty as Question['difficulty']) || 'Moderate';
      return {
        id: `medq-agent-${Date.now()}-${index}`,
        type: question.type === 'tf' || question.type === 'short' ? question.type : 'mcq',
        text: question.text || '',
        options: Array.isArray(question.options) ? question.options : [],
        answer: question.answer || '',
        explanation: question.explanation || '',
        mnemonic: question.mnemonic || '',
        clinicalPearl: question.clinicalPearl || '',
        distractorAnalysis: question.distractorAnalysis || '',
        difficulty: nestedDifficulty,
        system: question.system || (typeof body.system === 'string' ? body.system : 'General'),
        topic: question.topic || topic,
        tags: Array.isArray(question.tags) ? question.tags : [topic],
        isAIGenerated: true,
        diagramSpec: question.diagramSpec,
        molecularScenes: question.molecularScenes,
        sources: question.sources,
        illustrationDescription: question.illustrationDescription,
        organInvolvement: question.organInvolvement,
        mechanismDiagram: question.mechanismDiagram,
        visualSummary: question.visualSummary,
        imageUrl: question.imageUrl,
        audioUrl: question.audioUrl,
        videoUrl: question.videoUrl,
        videoTaskId: question.videoTaskId,
        mediaRequirements: Array.isArray(question.mediaRequirements) ? question.mediaRequirements : [],
        createdAt: question.createdAt || now,
        updatedAt: question.updatedAt || now,
      } as Question;
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'MedQ agent generation failed' },
      { status: 500 },
    );
  }
}