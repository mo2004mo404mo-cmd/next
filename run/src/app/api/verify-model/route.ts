/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: app/api/verify-model/route.ts
 *
 * MedQ adaptation:
 *   OpenMAIC's verify-model route resolves a `LanguageModel` via
 *   `resolveModel` and calls `callLLM` from `@/lib/ai/llm` with a minimal
 *   "Say OK" prompt. MedQ has no `@/lib/ai/llm` and uses ZAI exclusively.
 *   This route replaces the `callLLM` invocation with
 *   `verifyZaiConnectivity` from `@/lib/server/zai-ai-call`, which sends the
 *   same minimal prompt via `zai.chat.completions.create`.
 *
 *   `resolveModel` is still called to honor stage routes / `DEFAULT_MODEL`
 *   and surface a clear error if ZAI isn't configured — but the returned
 *   `model: LanguageModel` is `null` in medq (ignored). The `modelId` is
 *   forwarded to `verifyZaiConnectivity` so a `MODEL_ROUTES` override (e.g.
 *   `zai:glm-4.6`) is honored by the connectivity probe.
 */

import { NextRequest } from 'next/server';
import { createLogger } from '@/lib/logger';
import { apiError, apiSuccess } from '@/lib/server/api-response';
import { resolveModel } from '@/lib/server/resolve-model';
import { verifyZaiConnectivity } from '@/lib/server/zai-ai-call';
const log = createLogger('Verify Model');

export async function POST(req: NextRequest) {
  let model: string | undefined;
  try {
    const body = await req.json();
    const { apiKey, baseUrl, providerType } = body;
    model = body.model;
    void apiKey;
    void baseUrl;
    void providerType;

    if (!model) {
      return apiError('MISSING_REQUIRED_FIELD', 400, 'Model name is required');
    }

    // Parse model string and resolve server-side fallback. In medq, this
    // validates ZAI is configured (DEFAULT_MODEL must be set or stage route
    // must resolve), then returns the modelId we feed to ZAI.
    let modelId: string;
    try {
      const result = await resolveModel({
        modelString: model,
        apiKey: apiKey || '',
        baseUrl: baseUrl || undefined,
        providerType,
      });
      modelId = result.modelId;
    } catch (error) {
      return apiError(
        'INVALID_REQUEST',
        401,
        error instanceof Error ? error.message : String(error),
      );
    }

    // Send a minimal test message via ZAI.
    const probe = await verifyZaiConnectivity({ model: modelId });
    if (!probe.ok) {
      const errorMessage = classifyError(probe.error || 'Connection failed');
      return apiError('INTERNAL_ERROR', 500, errorMessage);
    }

    return apiSuccess({
      message: 'Connection successful',
      response: probe.responseText,
    });
  } catch (error) {
    log.error(`Model verification failed [model="${model ?? 'unknown'}"]:`, error);
    return apiError('INTERNAL_ERROR', 500, 'Connection failed');
  }
}

function classifyError(rawMessage: string): string {
  if (rawMessage.includes('401') || rawMessage.includes('Unauthorized')) {
    return 'API key is invalid or expired';
  }
  if (rawMessage.includes('404') || rawMessage.includes('not found')) {
    return 'Model not found or API endpoint error';
  }
  if (rawMessage.includes('429')) {
    return 'API rate limit exceeded, please try again later';
  }
  if (rawMessage.includes('ENOTFOUND') || rawMessage.includes('ECONNREFUSED')) {
    return 'Cannot connect to API server, please check the Base URL';
  }
  if (rawMessage.includes('timeout')) {
    return 'Connection timed out, please check your network';
  }
  return rawMessage;
}
