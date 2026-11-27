/**
 * Image Provider Connectivity Verification API
 *
 * POST /api/verify-image-provider
 *
 * Headers:
 *   x-image-provider: ImageProviderId (required)
 *   x-image-model: string (optional)
 *   x-api-key: string (optional, client-supplied for unmanaged providers)
 *   x-base-url: string (optional, client-supplied for unmanaged providers)
 *
 * Response: { success: boolean, message?: string }
 *
 * MedQ note: the ported openmaic settings UI (image-settings.tsx) has always
 * fetched this endpoint for its "Test Connection" button, but the route was
 * never ported — the button 404'd. This reconstruction resolves managed vs
 * unmanaged credentials exactly like /api/generate/image (managed providers
 * ignore client keys) and delegates to the provider connectivity tests,
 * including the built-in ZAI provider (server-only SDK dispatch).
 */

import { NextRequest } from 'next/server';
import {
  isServerConfiguredProvider,
  resolveImageApiKey,
  resolveImageBaseUrl,
} from '@/lib/server/provider-config';
import { testImageConnectivity } from '@/lib/media/image-providers-server';
import type { ImageProviderId } from '@/lib/media/types';
import { createLogger } from '@/lib/logger';
import { apiError, apiSuccess } from '@/lib/server/api-response';

const log = createLogger('VerifyImageProvider');

export async function POST(request: NextRequest) {
  try {
    const providerId = request.headers.get('x-image-provider') as ImageProviderId | null;
    const clientModel = request.headers.get('x-image-model') || undefined;
    if (!providerId) {
      return apiError('MISSING_REQUIRED_FIELD', 400, 'Missing x-image-provider header');
    }

    // Managed providers are admin-owned: ignore any client-sent key/baseUrl.
    const managed = isServerConfiguredProvider('image', providerId);
    const clientApiKey = managed ? undefined : request.headers.get('x-api-key') || undefined;
    const clientBaseUrl = managed ? undefined : request.headers.get('x-base-url') || undefined;

    const apiKey = resolveImageApiKey(providerId, clientApiKey);
    if (!apiKey && providerId !== 'zai') {
      // ZAI is keyless from the user's perspective (platform credentials are
      // resolved server-side); every other provider needs a key to probe.
      return apiError(
        'MISSING_API_KEY',
        401,
        `No API key configured for image provider: ${providerId}`,
      );
    }

    const baseUrl = resolveImageBaseUrl(providerId, clientBaseUrl);

    const result = await testImageConnectivity({
      providerId,
      apiKey,
      baseUrl,
      model: clientModel,
    });

    if (!result.success) {
      log.warn(`Image provider verification failed [provider=${providerId}]: ${result.message}`);
      return apiError('INTERNAL_ERROR', 500, result.message);
    }

    return apiSuccess({ message: result.message });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log.error('Image provider verification failed:', error);
    return apiError('INTERNAL_ERROR', 500, message);
  }
}
