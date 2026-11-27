/**
 * Video Generation Service -- routes to provider adapters
 *
 * 2026-11-04: the pure registry (VIDEO_PROVIDERS) and normalizeVideoOptions
 * moved to ./video-provider-registry — a browser-safe module with ZERO
 * adapter imports. The dispatchers below import the provider adapters, which
 * use node builtins (crypto for HMAC signing, safeFetch/DNS checks), so THIS
 * file must never be imported from client code. Server consumers can import
 * from either module (the registry is re-exported below for compat).
 */

import type {
  VideoGenerationConfig,
  VideoGenerationOptions,
  VideoGenerationResult,
} from './types';
// Re-exported for backward compatibility — existing server imports of
// VIDEO_PROVIDERS / normalizeVideoOptions from './video-providers' keep working.
export { VIDEO_PROVIDERS, normalizeVideoOptions } from './video-provider-registry';
import { generateWithSeedance, testSeedanceConnectivity } from './adapters/seedance-adapter';
import { generateWithKling, testKlingConnectivity } from './adapters/kling-adapter';
import { generateWithVeo, testVeoConnectivity } from './adapters/veo-adapter';
import {
  generateWithMiniMaxVideo,
  testMiniMaxVideoConnectivity,
} from './adapters/minimax-video-adapter';
import { generateWithGrokVideo, testGrokVideoConnectivity } from './adapters/grok-video-adapter';
import { generateWithHappyHorse, testHappyHorseConnectivity } from './adapters/happyhorse-adapter';

export async function testVideoConnectivity(
  config: VideoGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  switch (config.providerId) {
    case 'seedance':
      return testSeedanceConnectivity(config);
    case 'kling':
      return testKlingConnectivity(config);
    case 'veo':
      return testVeoConnectivity(config);
    case 'minimax-video':
      return testMiniMaxVideoConnectivity(config);
    case 'grok-video':
      return testGrokVideoConnectivity(config);
    case 'happyhorse':
      return testHappyHorseConnectivity(config);
    default:
      return {
        success: false,
        message: `Unsupported video provider: ${config.providerId}`,
      };
  }
}


export async function generateVideo(
  config: VideoGenerationConfig,
  options: VideoGenerationOptions,
): Promise<VideoGenerationResult> {
  switch (config.providerId) {
    case 'seedance':
      return generateWithSeedance(config, options);
    case 'kling':
      return generateWithKling(config, options);
    case 'veo':
      return generateWithVeo(config, options);
    case 'minimax-video':
      return generateWithMiniMaxVideo(config, options);
    case 'grok-video':
      return generateWithGrokVideo(config, options);
    case 'happyhorse':
      return generateWithHappyHorse(config, options);
    default:
      throw new Error(`Unsupported video provider: ${config.providerId}`);
  }
}

