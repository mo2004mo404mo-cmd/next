/**
 * GET /api/user/ai-analytics?range=7d|30d|90d
 *
 * Aggregates the user's AiCallLog rows into everything the BYOK Analytics
 * tab renders — mirrors the FreeLLMAPI analytics surface, scoped to what
 * MedQ logs per call:
 *
 *   summary      : totals + success rate + avg latency + token sums
 *   byProvider[] : requests / errors / tokens / avg latency per provider
 *   byModel[]    : top models by requests (with tokens + latency)
 *   timeline[]   : daily buckets (requests, errors, tokens)
 *   recent[]     : the most recent individual calls (success + error)
 *
 * Auth: required (analytics are per-account — same guard as /api/user/api-keys).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';
import { createLogger } from '@/lib/logger';

const log = createLogger('AiAnalytics');

const RANGES: Record<string, number> = { '24h': 1, '7d': 7, '30d': 30, '90d': 90 };

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const rangeParam = req.nextUrl.searchParams.get('range') ?? '30d';
  const rangeDays = RANGES[rangeParam];
  if (!rangeDays) {
    return NextResponse.json(
      { error: `Invalid range "${rangeParam}" — use 24h | 7d | 30d | 90d` },
      { status: 400 },
    );
  }
  const since = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000);

  try {
    const rows = await db.aiCallLog.findMany({
      where: { userId, createdAt: { gte: since } },
      select: {
        providerId: true,
        modelId: true,
        stage: true,
        status: true,
        inputTokens: true,
        outputTokens: true,
        latencyMs: true,
        error: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // ── Summary ──
    let total = 0;
    let errors = 0;
    let inputTokens = 0;
    let outputTokens = 0;
    let latencySum = 0;
    let latencyCount = 0;

    const byProvider = new Map<
      string,
      { providerId: string; requests: number; errors: number; inputTokens: number; outputTokens: number; latencySum: number; latencyCount: number }
    >();
    const byModel = new Map<
      string,
      { providerId: string; modelId: string; requests: number; errors: number; inputTokens: number; outputTokens: number; latencySum: number; latencyCount: number }
    >();
    const byDay = new Map<string, { date: string; requests: number; errors: number; inputTokens: number; outputTokens: number }>();

    for (const r of rows) {
      total++;
      inputTokens += r.inputTokens;
      outputTokens += r.outputTokens;
      const isError = r.status !== 'success';
      if (isError) errors++;

      const provider =
        byProvider.get(r.providerId) ??
        {
          providerId: r.providerId, requests: 0, errors: 0, inputTokens: 0,
          outputTokens: 0, latencySum: 0, latencyCount: 0,
        };
      provider.requests++;
      if (isError) provider.errors++;
      provider.inputTokens += r.inputTokens;
      provider.outputTokens += r.outputTokens;
      if (r.latencyMs != null) { provider.latencySum += r.latencyMs; provider.latencyCount++; }
      byProvider.set(r.providerId, provider);

      const modelKey = `${r.providerId}:${r.modelId}`;
      const model =
        byModel.get(modelKey) ??
        {
          providerId: r.providerId, modelId: r.modelId, requests: 0, errors: 0,
          inputTokens: 0, outputTokens: 0, latencySum: 0, latencyCount: 0,
        };
      model.requests++;
      if (isError) model.errors++;
      model.inputTokens += r.inputTokens;
      model.outputTokens += r.outputTokens;
      if (r.latencyMs != null) { model.latencySum += r.latencyMs; model.latencyCount++; }
      byModel.set(modelKey, model);

      if (r.latencyMs != null) { latencySum += r.latencyMs; latencyCount++; }

      const day = r.createdAt.toISOString().slice(0, 10);
      const bucket = byDay.get(day) ?? { date: day, requests: 0, errors: 0, inputTokens: 0, outputTokens: 0 };
      bucket.requests++;
      if (isError) bucket.errors++;
      bucket.inputTokens += r.inputTokens;
      bucket.outputTokens += r.outputTokens;
      byDay.set(day, bucket);
    }

    // Fill missing days in the range so the timeline chart has no holes.
    const timeline: Array<{ date: string; requests: number; errors: number; inputTokens: number; outputTokens: number }> = [];
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      timeline.push(byDay.get(d) ?? { date: d, requests: 0, errors: 0, inputTokens: 0, outputTokens: 0 });
    }

    const providerList = [...byProvider.values()]
      .map((p) => ({
        providerId: p.providerId,
        requests: p.requests,
        errors: p.errors,
        inputTokens: p.inputTokens,
        outputTokens: p.outputTokens,
        avgLatencyMs: p.latencyCount ? Math.round(p.latencySum / p.latencyCount) : null,
      }))
      .sort((a, b) => b.requests - a.requests);

    const modelList = [...byModel.values()]
      .map((m) => ({
        providerId: m.providerId,
        modelId: m.modelId,
        requests: m.requests,
        errors: m.errors,
        tokens: m.inputTokens + m.outputTokens,
        avgLatencyMs: m.latencyCount ? Math.round(m.latencySum / m.latencyCount) : null,
      }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 12);

    const recent = rows.slice(0, 60).map((r) => ({
      providerId: r.providerId,
      modelId: r.modelId,
      stage: r.stage,
      status: r.status,
      inputTokens: r.inputTokens,
      outputTokens: r.outputTokens,
      latencyMs: r.latencyMs,
      error: r.error,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json(
      {
        range: rangeParam,
        summary: {
          totalRequests: total,
          errorCount: errors,
          successRate: total ? (total - errors) / total : null,
          totalInputTokens: inputTokens,
          totalOutputTokens: outputTokens,
          avgLatencyMs: latencyCount ? Math.round(latencySum / latencyCount) : null,
        },
        byProvider: providerList,
        byModel: modelList,
        timeline,
        recent,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (e) {
    log.error('analytics aggregation failed', e);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
