/**
 * Sketchfab-only discover endpoint (fast — ~1-3s).
 *
 * POST /api/anatomy-discover/sketchfab
 *   body: { query: string, count?: number }
 *   response: { query, models, suggestedModelId, error? }
 *
 * Why this exists separately from /api/anatomy-discover/images:
 * ─────────────────────────────────────────────────────────────
 * Sketchfab's public v3 search is fast (~1-3s) and ZAI image search is
 * slow (~15-50s). The old combined endpoint made the user wait for BOTH
 * before seeing anything. Splitting them lets the frontend render 3D
 * model results immediately, then stream image results in whenever they
 * arrive — perceived latency drops from "wait 30s, see everything" to
 * "wait 2s, see 3D models; images fill in over the next ~30s".
 *
 * The route also returns a `suggestedModelId` — the backend's pick for
 * the single best 3D model for the query, computed via name-token
 * matching + likeCount. The frontend uses this for the "AI Auto-pick"
 * button.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';
import {
  searchSketchfabModels,
  pickSuggestedModel,
  type SketchfabModelResult,
} from '@/lib/anatomy/discover';

const log = createLogger('AnatomyDiscoverSketchfab');

interface SketchfabResponse {
  query: string;
  models: SketchfabModelResult[];
  suggestedModelId?: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<SketchfabResponse>> {
  let query = '';
  let count = 12;

  try {
    const body = await req.json();
    query = typeof body.query === 'string' ? body.query.trim() : '';
    if (typeof body.count === 'number' && Number.isFinite(body.count)) {
      count = Math.min(Math.max(Math.floor(body.count), 1), 24);
    }
  } catch {
    return NextResponse.json(
      { query: '', models: [], error: 'Invalid JSON body' } satisfies SketchfabResponse,
      { status: 400 },
    );
  }

  if (!query) {
    return NextResponse.json(
      { query: '', models: [], error: 'query is required' } satisfies SketchfabResponse,
      { status: 400 },
    );
  }

  log.info('Sketchfab discover request', { query, count });

  const { models, error } = await searchSketchfabModels(query, count);
  const suggestedModelId = pickSuggestedModel(models, query);

  if (models.length === 0) {
    return NextResponse.json(
      { query, models, suggestedModelId, error } satisfies SketchfabResponse,
      { status: 503 },
    );
  }

  return NextResponse.json(
    { query, models, suggestedModelId, error } satisfies SketchfabResponse,
    { status: 200 },
  );
}
