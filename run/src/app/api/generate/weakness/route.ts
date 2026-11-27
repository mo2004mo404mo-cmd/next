/**
 * Weakness-Targeted Generation API
 *
 * GET /api/generate/weakness
 *   Analyzes the authenticated user's question attempts and returns their
 *   weakest organ systems / topics with accuracy stats, plus a recommended
 *   generation payload for the agent pipeline.
 *
 *   Response: {
 *     overall: { attempts, correct, accuracy },
 *     weakAreas: Array<{ system, topic, attempts, correct, accuracy, weight }>,
 *     recommendation: { topic, system, weakTopics, focusHint, suggestedCount }
 *   }
 *
 * POST /api/generate/weakness  { count?, system?, topic? }
 *   Creates an AGENT GENERATION JOB targeted at the user's weakest area
 *   (or the provided system/topic) using the same credit-gated pipeline as
 *   POST /api/generate/agent. Returns { jobId, mode: 'agent', weakness }.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createJob, updateJob, getJob } from '@/lib/job-store';
import { emitJobUpdate } from '@/lib/socket-emit';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { runAgentQuestionGeneration } from '@/lib/agent/question-agent';

export const maxDuration = 800;

interface WeakArea {
  system: string;
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number;
  weight: number;
}

/** Minimum attempts before an area is considered reliably measured. */
const MIN_SAMPLE = 3;

async function analyzeWeaknesses(userId: string) {
  // Attempts joined to their questions' system/topic tags
  const attempts = await db.questionAttempt.findMany({
    where: { userId },
    select: {
      isCorrect: true,
      question: { select: { system: true, topic: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 2000,
  });

  const overall = {
    attempts: attempts.length,
    correct: attempts.filter((a) => a.isCorrect).length,
    accuracy: attempts.length ? attempts.filter((a) => a.isCorrect).length / attempts.length : 0,
  };

  // Group by system (+ topic drill-down per system)
  const bySystem = new Map<string, { attempts: number; correct: number; topics: Map<string, { attempts: number; correct: number }> }>();
  for (const a of attempts) {
    const system = a.question?.system || 'General';
    const topic = a.question?.topic || '';
    let entry = bySystem.get(system);
    if (!entry) {
      entry = { attempts: 0, correct: 0, topics: new Map() };
      bySystem.set(system, entry);
    }
    entry.attempts += 1;
    if (a.isCorrect) entry.correct += 1;
    if (topic) {
      let t = entry.topics.get(topic);
      if (!t) {
        t = { attempts: 0, correct: 0 };
        entry.topics.set(topic, t);
      }
      t.attempts += 1;
      if (a.isCorrect) t.correct += 1;
    }
  }

  // Rank weak areas: low accuracy with enough attempts; weight blends error
  // rate (how weak) with sample size (how confident we are it's a real weakness).
  const weakAreas: WeakArea[] = [];
  for (const [system, entry] of bySystem) {
    const accuracy = entry.attempts ? entry.correct / entry.attempts : 1;
    if (entry.attempts >= MIN_SAMPLE && accuracy < 0.75) {
      weakAreas.push({
        system,
        topic: '',
        attempts: entry.attempts,
        correct: entry.correct,
        accuracy,
        weight: (1 - accuracy) * Math.min(1, entry.attempts / 10),
      });
    }
    for (const [topic, t] of entry.topics) {
      const tAcc = t.attempts ? t.correct / t.attempts : 1;
      if (t.attempts >= MIN_SAMPLE && tAcc < 0.75) {
        weakAreas.push({
          system,
          topic,
          attempts: t.attempts,
          correct: t.correct,
          accuracy: tAcc,
          weight: (1 - tAcc) * 1.5 + Math.min(1, t.attempts / 10) * 0.5, // topics rank above whole systems
        });
      }
    }
  }

  weakAreas.sort((a, b) => b.weight - a.weight);
  return { overall, weakAreas: weakAreas.slice(0, 10) };
}

function buildRecommendation(weakAreas: WeakArea[], overrideSystem?: string, overrideTopic?: string) {
  const scoped = overrideSystem ? weakAreas.filter((w) => w.system === overrideSystem) : weakAreas;
  const best =
    (overrideTopic
      ? scoped.find((w) => w.topic === overrideTopic)
      : null) || scoped[0] || weakAreas[0] || null;

  if (!best) {
    return {
      topic: 'high-yield review',
      system: 'General',
      weakTopics: [] as string[],
      focusHint: 'No weakness signal yet — generate general practice questions.',
      suggestedCount: 5,
    };
  }

  const weakTopics = weakAreas.slice(0, 5).map((w) => (w.topic ? `${w.topic} (${w.system})` : `${w.system} — weakest topics`));
  const focusHint =
    `The student answers only ${(best.accuracy * 100).toFixed(0)}% correctly in ${best.topic || best.system} ` +
    `(${best.correct}/${best.attempts} attempts). Drill the discriminating, frequently-confused concepts of this area. ` +
    `Prefer questions that target the typical misconception behind wrong answers.`;

  return {
    topic: best.topic || `${best.system} fundamentals`,
    system: best.system,
    weakTopics,
    focusHint,
    suggestedCount: Math.min(10, Math.max(5, Math.round((1 - best.accuracy) * 12))),
  };
}

export const GET = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { overall, weakAreas } = await analyzeWeaknesses(userId);
  const recommendation = buildRecommendation(weakAreas, new URL(req.url).searchParams.get('system') || undefined);

  return NextResponse.json({ overall, weakAreas, recommendation });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { count, system, topic } = body as { count?: number; system?: string; topic?: string };

  // ── AI feature gate (same policy as /api/generate/agent) ──
  const { debitAICredits } = await import('@/lib/subscription/credits');
  const gate = await debitAICredits(userId, 'generate');
  if (!gate.allowed) {
    const status = gate.reason === 'no_credits' ? 402 : 429;
    return NextResponse.json(
      {
        error: gate.reason === 'no_credits'
          ? 'You have reached your daily AI generation limit and have insufficient credits.'
          : 'Daily AI generation limit reached.',
        reason: gate.reason,
        upgradeUrl: '/pricing',
      },
      { status },
    );
  }

  const { weakAreas } = await analyzeWeaknesses(userId);
  const recommendation = buildRecommendation(weakAreas, system, topic);

  const jobId = createJob();
  const response = NextResponse.json({
    jobId,
    mode: 'agent',
    weakness: recommendation,
    gated: { source: gate.source, creditsSpent: gate.creditsSpent ?? 0 },
  });

  processWeaknessJob(jobId, recommendation, Math.min(Math.max(Number(count) || recommendation.suggestedCount, 1), 100), req).catch(
    async (err) => {
      updateJob(jobId, { status: 'failed', error: err instanceof Error ? err.message : String(err) });
      emitJobUpdate(getJob(jobId)!);
      if (gate.source === 'credits' && gate.creditsSpent) {
        const { refundAICredits } = await import('@/lib/subscription/credits');
        try { await refundAICredits(userId, gate, 'Weakness generation job failed'); } catch { /* best effort */ }
      }
    },
  );

  return response;
});

async function processWeaknessJob(
  jobId: string,
  recommendation: ReturnType<typeof buildRecommendation>,
  count: number,
  request: NextRequest,
) {
  updateJob(jobId, {
    status: 'processing',
    progress: `🎯 Weakness-targeted generation starting — ${recommendation.system} / ${recommendation.topic}…`,
  });
  emitJobUpdate(getJob(jobId)!);

  const report = (
    stage: 'plan' | 'research' | 'stem' | 'review' | 'explanation' | 'media' | 'saved' | 'error',
    message: string,
    payload?: Record<string, unknown>,
  ) => {
    if (stage === 'saved' && payload) {
      updateJob(jobId, { progress: message, partialResult: payload });
    } else {
      updateJob(jobId, { progress: message });
    }
    emitJobUpdate(getJob(jobId)!);
  };

  try {
    try {
      await Promise.race([
        db.$connect(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DB connect timeout')), 5000)),
      ]);
    } catch {
      updateJob(jobId, { status: 'failed', error: 'Database connection failed. Please try again.' });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    const result = await runAgentQuestionGeneration(
      request,
      {
        topic: recommendation.topic,
        system: recommendation.system,
        types: ['mcq'],
        difficulties: ['Medium', 'Hard'],
        count,
        weakTopics: recommendation.weakTopics,
        focusHint: recommendation.focusHint,
      },
      report,
    );

    if (result.length > 0) {
      // Mark the attempts from this batch as weakness-mode (they will be
      // recorded with mode 'weakness' by the client when answered).
      updateJob(jobId, { status: 'completed', result });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    updateJob(jobId, { status: 'failed', error: 'The agent could not generate targeted questions. Please try again.' });
    emitJobUpdate(getJob(jobId)!);
  } catch (error) {
    console.error('[weakness-route] job failed:', error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Weakness generation failed',
    });
    emitJobUpdate(getJob(jobId)!);
  }
}
