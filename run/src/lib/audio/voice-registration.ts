/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voice-registration.ts
 *
 * Verbatim port — `@/lib/audio/voice-design` is the real port; the VoxCPM
 * registration adapter is ported alongside.
 */

import type { VoiceDesign } from '@/lib/audio/voice-design';
import { voxcpmVoiceRegistrationAdapter } from '@/lib/audio/voxcpm-registration';

/** Resolved backend connection for a registration call (server-injected for managed providers). */
export interface VoiceRegistrationConfig {
  baseUrl: string;
  apiKey?: string;
  model?: string;
}

export interface VoiceRegistrationAdapter {
  /** Whether registration is available for this provider given its options (e.g. backend kind). */
  supportsRegistration(options?: Record<string, unknown>): boolean;
  /** Whether `voiceId` is already registered on the backend. */
  voiceExists(cfg: VoiceRegistrationConfig, voiceId: string): Promise<boolean>;
  /** Register (or idempotently re-register) a reference clip under `voiceId`; returns the id. */
  registerVoice(
    cfg: VoiceRegistrationConfig,
    params: { voiceId: string; referenceAudioBase64: string; mimeType?: string },
  ): Promise<string>;
  /** Synthesize the voice design once into a reference clip. */
  bootstrapReferenceClip(
    cfg: VoiceRegistrationConfig,
    params: { design: VoiceDesign; language?: string },
  ): Promise<{ referenceAudioBase64: string; mimeType: string }>;
}

/** providerId → adapter. The only seam to touch when adding a provider. */
const VOICE_REGISTRATION_ADAPTERS: Record<string, VoiceRegistrationAdapter> = {
  'voxcpm-tts': voxcpmVoiceRegistrationAdapter,
};

export function getVoiceRegistrationAdapter(
  providerId: string,
): VoiceRegistrationAdapter | undefined {
  return VOICE_REGISTRATION_ADAPTERS[providerId];
}

/** Whether this provider supports register-once/reference-by-id for the given options. */
export function supportsVoiceRegistration(
  providerId: string,
  options?: Record<string, unknown>,
): boolean {
  return getVoiceRegistrationAdapter(providerId)?.supportsRegistration(options) ?? false;
}
