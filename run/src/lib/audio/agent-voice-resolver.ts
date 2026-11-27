/**
 * MedQ adapter (newly written — not ported from OpenMAIC).
 *
 * Maps OpenMAIC agent IDs to medq's ZAI TTS voice settings so the Stage
 * component can call `/api/voice-tts` with the correct voice per agent.
 *
 * Why a separate resolver?
 * -----------------------
 * OpenMAIC's `lib/audio/voice-resolver.ts` walks a rich per-provider voice
 * registry (`TTS_PROVIDERS`, `getEnabledProvidersWithVoices`, etc.) to pick
 * a voice for each agent. MedQ's TTS goes through a single endpoint
 * (`/api/voice-tts`) backed by `z-ai-web-dev-sdk`'s `audio.tts.create`, and
 * the only voice-id space medq needs is the small set of ZAI preset voices
 * (tongtong, xiaochen, jam, kazi, …). Reusing OpenMAIC's resolver would
 * require populating the entire provider registry with empty metadata; this
 * adapter keeps the Stage wiring tiny and self-contained.
 *
 * The resolver is consumed by:
 *   - `lib/audio/stage-tts-client.ts` (live TTS for the playback engine)
 *   - `lib/hooks/use-discussion-tts.ts` (per-agent discussion voice pick)
 *   - The Stage component (to set `SpeechAction.voice` + `speed` when
 *     pre-generating TTS via `/api/voice-tts`).
 *
 * Voice IDs correspond to the `voice` field accepted by
 * `/api/voice-tts`'s POST body (see `app/api/voice-tts/route.ts`).
 */

/** Persona override selected in the AIChatroomTab settings ("AI Voice"). */
export type VoicePersona = 'male' | 'female';

/** Result of resolving an agent to a medq TTS voice. */
export interface AgentVoice {
  /** ZAI voice id passed to `/api/voice-tts` as `voice`. */
  voice: string;
  /** Speech speed multiplier (1.0 = normal). */
  speed: number;
}

/**
 * MedQ's first-class ZAI TTS voices. Mirrors the picker in
 * `components/medq/VoiceStudyTab.tsx` (the medq-native voice tab). Add new
 * ZAI-preset voice ids here as they become available.
 *
 * NOTE: gender labels below are *persona hints* used by the default mapping
 * (they are not enforced by ZAI's TTS service — any voice can speak any
 * text). The hints aim for natural-sounding agent timbres:
 *   - `tongtong`  : warm, natural  (works well as a default female voice)
 *   - `xiaochen`  : clear, precise (works well for definitions / narration)
 *   - `jam`       : deep, authoritative (works well as a default male voice)
 *   - `kazi`      : energetic, engaging (works well for student roles)
 */
export const MEDQ_ZAI_VOICES = {
  tongtong: { id: 'tongtong', label: 'Tongtong', gender: 'female' as const },
  xiaochen: { id: 'xiaochen', label: 'Xiaochen', gender: 'female' as const },
  jam: { id: 'jam', label: 'Jam', gender: 'male' as const },
  kazi: { id: 'kazi', label: 'Kazi', gender: 'male' as const },
} satisfies Record<string, { id: string; label: string; gender: 'male' | 'female' }>;

/** Default ZAI voice id (matches `/api/voice-tts`'s server default). */
export const DEFAULT_MEDQ_VOICE = 'tongtong';

/**
 * Default persona (gender) per OpenMAIC agent ID.
 *
 * The mapping favors a "natural classroom" mix: an authoritative male
 * teacher + a supportive female TA + a mix of student personas. The user
 * can override this via the AIChatroomTab's "AI Voice: male | female"
 * picker — that override flows in as the `persona` argument to
 * {@link resolveAgentVoice}.
 *
 * Both the OpenMAIC semantic IDs (`ai_teacher`, `ai_ta`, …) and medq's
 * registry IDs (`default-1`, `default-2`, …) are accepted — they alias the
 * same agent.
 */
export const DEFAULT_AGENT_PERSONA: Record<string, VoicePersona> = {
  // OpenMAIC semantic IDs
  ai_teacher: 'male',
  ai_ta: 'female',
  class_clown: 'male',
  curious_student: 'female',
  note_taker: 'female',
  deep_thinker: 'male',
  // medq registry IDs (alias the OpenMAIC IDs above)
  'default-1': 'male', // AI Teacher
  'default-2': 'female', // AI TA
  'default-3': 'male', // Class Clown
  'default-4': 'female', // Curious Student
  'default-5': 'female', // Note Taker
  'default-6': 'male', // Deep Thinker
};

/**
 * Per-agent voice picks for each (agentId × persona) combination.
 *
 * The voices are chosen so that:
 *   - the teacher sounds authoritative (jam for male, xiaochen for female)
 *   - the TA sounds warm and supportive (jam for male, tongtong for female)
 *   - the class clown + curious student sound energetic (kazi / tongtong)
 *   - the note taker + deep thinker sound measured (jam / xiaochen)
 */
const AGENT_VOICE_MAP: Record<string, { male: string; female: string }> = {
  ai_teacher: { male: 'jam', female: 'xiaochen' },
  ai_ta: { male: 'jam', female: 'tongtong' },
  class_clown: { male: 'kazi', female: 'tongtong' },
  curious_student: { male: 'kazi', female: 'tongtong' },
  note_taker: { male: 'jam', female: 'xiaochen' },
  deep_thinker: { male: 'jam', female: 'xiaochen' },
  'default-1': { male: 'jam', female: 'xiaochen' },
  'default-2': { male: 'jam', female: 'tongtong' },
  'default-3': { male: 'kazi', female: 'tongtong' },
  'default-4': { male: 'kazi', female: 'tongtong' },
  'default-5': { male: 'jam', female: 'xiaochen' },
  'default-6': { male: 'jam', female: 'xiaochen' },
};

/** Default speech speed multiplier per agent role. */
const DEFAULT_SPEED: number = 1.0;

/**
 * Resolve an OpenMAIC agent ID + optional persona override to a medq
 * `{ voice, speed }` pair suitable for `/api/voice-tts`.
 *
 * Resolution order:
 *   1. If `persona` is provided (`'male' | 'female'`), use it directly.
 *   2. Otherwise, fall back to the agent's default persona
 *      (see {@link DEFAULT_AGENT_PERSONA}).
 *   3. Look up the voice id in {@link AGENT_VOICE_MAP} for the resolved
 *      persona. If the agent ID is unknown, fall back to
 *      {@link DEFAULT_MEDQ_VOICE} (`tongtong`).
 *
 * Always returns a valid `AgentVoice` — never throws. Unknown agent IDs
 * resolve to the default voice at normal speed.
 *
 * @example
 *   resolveAgentVoice('ai_teacher', 'female')  // → { voice: 'xiaochen', speed: 1 }
 *   resolveAgentVoice('default-3')             // → { voice: 'kazi',     speed: 1 }
 *   resolveAgentVoice('unknown-agent', 'male') // → { voice: 'tongtong', speed: 1 }
 */
export function resolveAgentVoice(
  agentId: string | null | undefined,
  persona?: VoicePersona,
): AgentVoice {
  const resolvedPersona: VoicePersona =
    persona ?? (agentId ? DEFAULT_AGENT_PERSONA[agentId] : undefined) ?? 'female';

  // Lookup the per-agent voice; fall back to the global default.
  const voice =
    (agentId && AGENT_VOICE_MAP[agentId]?.[resolvedPersona]) || DEFAULT_MEDQ_VOICE;

  return { voice, speed: DEFAULT_SPEED };
}

/**
 * Resolve voice settings for an arbitrary speaker role (used when the agent
 * ID is unknown — e.g. a user-injected discussion message without an agent
 * roster). Falls back to {@link DEFAULT_MEDQ_VOICE}.
 */
export function resolveRoleVoice(role: string, persona?: VoicePersona): AgentVoice {
  // Teacher / assistant → "ai_teacher" / "ai_ta" voice map.
  // Student / anything else → "curious_student" voice map (energetic mix).
  const alias =
    role === 'teacher'
      ? 'ai_teacher'
      : role === 'assistant'
        ? 'ai_ta'
        : 'curious_student';
  return resolveAgentVoice(alias, persona);
}

/**
 * List all medq ZAI voice ids (for UI pickers / debug). Mirrors the picker
 * in `components/medq/VoiceStudyTab.tsx`.
 */
export function listMedqVoices(): Array<{ id: string; label: string; gender: 'male' | 'female' }> {
  return Object.values(MEDQ_ZAI_VOICES);
}
