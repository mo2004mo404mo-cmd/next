/**
 * Agent-Based Question Generation API
 *
 * POST /api/generate/agent
 *   Body: { topic, types?, difficulties?, system?, count? }
 *   Returns { jobId, mode: 'agent' } immediately — the pipeline runs in the
 *   background through 5 agent stages (plan → research → stem → explanation →
 *   media creation) with per-stage progress updates and per-question streaming.
 *
 * GET /api/generate/agent?jobId=...
 *   Returns the job record (polled by the client when the socket is down).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createJob, updateJob, getJob } from '@/lib/job-store';
import { emitJobUpdate } from '@/lib/socket-emit';
import { resolveUserId, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { runAgentQuestionGeneration } from '@/lib/agent/question-agent';

export const maxDuration = 800;

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) return badRequest('jobId is required');

  const job = getJob(jobId);
  if (!job) return notFound('Job not found');

  return NextResponse.json(job);
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  // ── AI feature gate (same policy as /api/generate) ──
  const userId = await resolveUserId();
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
        category: gate.category,
        used: gate.usageBefore,
        limit: gate.limit,
        balance: gate.balanceAfter,
        creditCost: 2,
        upgradeUrl: '/pricing',
      },
      { status },
    );
  }

  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  if (!topic) return badRequest('Topic is required');

  const jobId = createJob();

  // Ownership-filter the requested knowledge sources (RAG grounding).
  const knowledgeSourceIds = await resolveOwnedSourceIds(userId, body.knowledgeSourceIds).catch(() => [] as string[]);

  // Return jobId immediately — the agent pipeline runs in the background
  const response = NextResponse.json({
    jobId,
    mode: 'agent',
    engineVersion: 2,
    gated: { source: gate.source, creditsSpent: gate.creditsSpent ?? 0 },
  });

  processAgentJob(jobId, { ...body, topic, knowledgeSourceIds }, req).catch(async (err) => {
    updateJob(jobId, { status: 'failed', error: err instanceof Error ? err.message : String(err) });
    emitJobUpdate(getJob(jobId)!);
    // Best-effort refund if we had debited credits
    if (gate.source === 'credits' && gate.creditsSpent) {
      const { refundAICredits } = await import('@/lib/subscription/credits');
      try { await refundAICredits(userId, gate, 'Agent generation job failed'); } catch { /* best effort */ }
    }
  });

  return response;
});

interface AgentJobBody {
  topic: string;
  types?: string[];
  difficulties?: string[];
  system?: string;
  count?: number;
  /** Weakness-targeted generation: weak areas from the attempt analytics. */
  weakTopics?: string[];
  /** Extra planner guidance (e.g. from the weakness analysis). */
  focusHint?: string;
  /** RAG grounding: KnowledgeSource ids from the user's library to retrieve
   *  passages from (lectures, notes, PDFs, transcripts…). Validated for
   *  ownership below — foreign ids are dropped. */
  knowledgeSourceIds?: string[];
}

/** Resolve the caller's OWN knowledge source ids (ownership filter). */
async function resolveOwnedSourceIds(userId: string, requested: unknown): Promise<string[]> {
  if (!Array.isArray(requested)) return [];
  const ids = requested.filter((s): s is string => typeof s === 'string' && Boolean(s.trim())).slice(0, 20);
  if (!ids.length) return [];
  const owned = await db.knowledgeSource.findMany({
    where: { id: { in: ids }, userId },
    select: { id: true },
  });
  return owned.map((s) => s.id);
}

async function processAgentJob(
  jobId: string,
  body: AgentJobBody,
  request: NextRequest,
) {
  updateJob(jobId, { status: 'processing', progress: '🤖 Agent pipeline starting…' });
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
    // Verify DB connectivity before starting (fail fast, 5s budget)
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

    const ids = Array.isArray(body.knowledgeSourceIds)
      ? body.knowledgeSourceIds.filter((s) => typeof s === 'string' && s.trim()).slice(0, 20)
      : [];
    const knowledgeSourceIds = ids.length ? ids : undefined;

    const result = await runAgentQuestionGeneration(
      request,
      {
        topic: body.topic,
        system: body.system || 'General',
        types: Array.isArray(body.types) && body.types.length ? body.types : ['mcq'],
        difficulties: Array.isArray(body.difficulties) && body.difficulties.length ? body.difficulties : ['Medium'],
        count: Math.min(Math.max(body.count || 1, 1), 100),
        weakTopics: Array.isArray(body.weakTopics) ? body.weakTopics.filter((t) => typeof t === 'string' && t.trim()).slice(0, 8) : undefined,
        focusHint: typeof body.focusHint === 'string' ? body.focusHint.slice(0, 400) : undefined,
        knowledgeSourceIds,
      },
      report,
    );

    if (result.length > 0) {
      updateJob(jobId, { status: 'completed', result });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    updateJob(jobId, { status: 'failed', error: 'The agent could not generate any questions. Please try again.' });
    emitJobUpdate(getJob(jobId)!);
  } catch (error) {
    console.error('[agent-route] job failed:', error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Agent generation failed',
    });
    emitJobUpdate(getJob(jobId)!);
  }
}
