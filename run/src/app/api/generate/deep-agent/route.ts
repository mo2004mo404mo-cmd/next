/**
 * REAL Deep-Agent Question Generation API (deepagents / LangGraph)
 *
 * POST /api/generate/deep-agent
 *   Body: { topic, types?, difficulties?, system?, count?, weakTopics?,
 *           focusHint?, knowledgeSourceIds?, model? }
 *   Returns { jobId, mode: 'deep-agent' } immediately. The REAL autonomous
 *   agent runs in the background: it plans its own todos, delegates authoring
 *   to the question-author subagent, calls media/RAG tools, and saves each
 *   question itself via the save_question tool. Progress messages surface the
 *   agent's actual activity (plan updates, tool calls, subagent transitions,
 *   per-question saves) through the same job store + socket the Generate tab
 *   already consumes.
 *
 * GET /api/generate/deep-agent?jobId=...
 *   Returns the job record (polling fallback when the socket is down).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createJob, updateJob, getJob } from '@/lib/job-store';
import { emitJobUpdate } from '@/lib/socket-emit';
import { resolveUserId, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { runDeepAgentQuestionGenerationWithFallback } from '@/lib/agent/question-deep-agent';

export const maxDuration = 10800;

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');
  if (!jobId) return badRequest('jobId is required');

  const job = getJob(jobId);
  if (!job) return notFound('Job not found');
  return NextResponse.json(job);
});

interface DeepAgentJobBody {
  topic?: unknown;
  types?: unknown;
  difficulties?: unknown;
  system?: unknown;
  count?: unknown;
  weakTopics?: unknown;
  focusHint?: unknown;
  knowledgeSourceIds?: unknown;
  model?: unknown;
}

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json() as DeepAgentJobBody;

  // ── AI feature gate (same policy as /api/generate and /api/generate/agent) ──
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
  const knowledgeSourceIds = await resolveOwnedSourceIds(userId, body.knowledgeSourceIds)
    .catch(() => [] as string[]);

  const response = NextResponse.json({
    jobId,
    mode: 'deep-agent',
    engineVersion: 3,
    gated: { source: gate.source, creditsSpent: gate.creditsSpent ?? 0 },
  });

  processDeepAgentJob(jobId, {
    topic,
    system: typeof body.system === 'string' && body.system.trim() ? body.system : 'General',
    types: Array.isArray(body.types) && body.types.length
      ? body.types.filter((t): t is string => typeof t === 'string')
      : ['mcq'],
    difficulties: Array.isArray(body.difficulties) && body.difficulties.length
      ? body.difficulties.filter((d): d is string => typeof d === 'string')
      : ['Medium'],
    count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 100),
    weakTopics: Array.isArray(body.weakTopics)
      ? body.weakTopics.filter((t): t is string => typeof t === 'string' && Boolean(t.trim())).slice(0, 8)
      : undefined,
    focusHint: typeof body.focusHint === 'string' ? body.focusHint.slice(0, 400) : undefined,
    knowledgeSourceIds,
    // "auto" (or blank) = "no selection" — normalized to undefined so the
    // runtime's default chain (env → managed Z.AI) applies. resolveModel must
    // never see the literal string "auto" (keyless zai:auto pick).
    modelString: (() => {
      const raw = typeof body.model === 'string' ? body.model.trim() : '';
      return raw && raw !== 'auto' ? raw : undefined;
    })(),
    userId: userId ?? undefined,
  }, req).catch(async (err) => {
    updateJob(jobId, { status: 'failed', error: err instanceof Error ? err.message : String(err) });
    emitJobUpdate(getJob(jobId)!);
    if (gate.source === 'credits' && gate.creditsSpent) {
      const { refundAICredits } = await import('@/lib/subscription/credits');
      try { await refundAICredits(userId, gate, 'Deep agent generation job failed'); } catch { /* best effort */ }
    }
  });

  return response;
});

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

/**
 * Run the deep agent and translate its live event stream into job progress.
 *
 * Every message the user sees is a REAL agent activity: todo plan updates,
 * tool invocations, subagent delegation, and per-question saves.
 */
async function processDeepAgentJob(
  jobId: string,
  params: {
    topic: string;
    system: string;
    types: string[];
    difficulties: string[];
    count: number;
    weakTopics?: string[];
    focusHint?: string;
    knowledgeSourceIds: string[];
    modelString?: string;
    userId?: string;
  },
  request: NextRequest,
) {
  void request; // kept for signature parity with the agent route
  updateJob(jobId, { status: 'processing', progress: '🤖 Deep agent starting…' });
  emitJobUpdate(getJob(jobId)!);

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

    const saved: Record<string, unknown>[] = [];
    let hadError = false;

    for await (const event of runDeepAgentQuestionGenerationWithFallback(params)) {
      switch (event.type) {
        case 'status':
          updateJob(jobId, { progress: `🧠 Deep agent ready — model ${event.model}` });
          break;
        case 'plan': {
          const todos = (event.todos as Array<{ content?: string }>).map((t) => t.content).filter(Boolean);
          const first = todos[0] ? String(todos[0]).slice(0, 80) : '';
          updateJob(jobId, {
            progress: `📋 Agent plan (${todos.length} steps) — next: ${first}…`,
          });
          break;
        }
        case 'tool_start':
          updateJob(jobId, { progress: `🔧 Agent is calling ${formatToolName(event.tool)}…` });
          break;
        case 'tool_end':
          updateJob(jobId, {
            progress: event.ok
              ? `✓ ${formatToolName(event.tool)} finished`
              : `✗ ${formatToolName(event.tool)} failed — agent adapting`,
          });
          break;
        case 'subagent':
          updateJob(jobId, {
            progress: event.event === 'started'
              ? `🤖 Agent delegating to ${event.name} subagent…`
              : `✓ ${event.name} subagent returned`,
          });
          break;
        case 'saved':
          saved.push(event.question);
          updateJob(jobId, {
            progress: `💾 Question ${event.index}/${params.count} saved by the agent`,
            partialResult: event.question,
          });
          break;
        case 'error':
          hadError = true;
          updateJob(jobId, { progress: `⚠ ${event.error.slice(0, 160)}` });
          break;
        case 'done':
          break;
      }
      emitJobUpdate(getJob(jobId)!);
    }

    if (saved.length > 0) {
      updateJob(jobId, { status: 'completed', result: saved });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    updateJob(jobId, {
      status: 'failed',
      error: hadError
        ? 'The deep agent could not complete this generation. Please try again.'
        : 'The deep agent finished but did not save any questions. Try rephrasing the topic.',
    });
    emitJobUpdate(getJob(jobId)!);
  } catch (error) {
    console.error('[deep-agent-route] job failed:', error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Deep agent generation failed',
    });
    emitJobUpdate(getJob(jobId)!);
  }
}

function formatToolName(tool: string): string {
  return tool
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 40);
}
