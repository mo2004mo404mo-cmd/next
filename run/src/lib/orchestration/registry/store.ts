/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/orchestration/registry/{types,store}.ts
 *
 * Agent Registry — reconciled MedQ adaptation of OpenMAIC's registry.
 *
 * OpenMAIC uses a Zustand-persisted client-side registry (with localStorage
 * sync, IndexedDB for generated agents, voice-config management, and a
 * participant-mapping helper for the roundtable UI). MedQ is server-only and
 * stateless, so this file keeps OpenMAIC's AgentConfig type verbatim (from
 * `./types`) and the six default agent personas verbatim, but drops:
 *   - Zustand `persist` middleware (no client-side persistence)
 *   - IndexedDB generated-agent persistence (no Dexie)
 *   - `agentsToParticipants` (MedQ has no roundtable UI)
 *   - Voice-config warm-up (MedQ uses ZAI TTS via /api/voice-tts)
 *
 * What's preserved verbatim from OpenMAIC:
 *   - The six default agent personas (AI teacher / AI助教 / 显眼包 / 好奇宝宝 /
 *     笔记员 / 思考者) — these are the real IP, ported word-for-word.
 *   - The AgentConfig shape and role→action mapping.
 *
 * What's added for MedQ:
 *   - `getDefaultAgents()`, `getAgent()`, `listAgents()`, `pickAgentsForScene()`
 *     — plain server-side helpers (OpenMAIC's are Zustand-bound).
 *   - `AgentInfo` — lightweight pipeline type.
 *   - `useAgentRegistry` — minimal Zustand store shim that satisfies the
 *     `useAgentRegistry.getState().getAgent(id)` call pattern used by ported
 *     director-graph.ts. Stateless (no persist) — agent overrides travel with
 *     the request via `request.config.agentConfigs`.
 *
 * The personas are the source of truth. Names are left in their original
 * language (translated to English in this MedQ fork for consistency with the
 * rest of the MedQ UI) so the AI speaks naturally.
 */

import { create } from 'zustand';
import type { SceneType } from '@/lib/types/openmaic-dsl';

// Re-export everything from ./types so callers can import from either path.
export {
  type AgentConfig,
  type AgentTemplate,
  WHITEBOARD_ACTIONS,
  SLIDE_ACTIONS,
  ROLE_ACTIONS,
  getActionsForRole,
  createAgentFromTemplate,
} from './types';

// MedQ-only convenience aliases (kept for backwards compat with the prior
// slimmed store.ts that defined these inline).
export type AgentRole = 'teacher' | 'assistant' | 'student';
export type AgentAction =
  | 'spotlight'
  | 'laser'
  | 'play_video'
  | 'wb_open'
  | 'wb_close'
  | 'wb_draw_text'
  | 'wb_draw_shape'
  | 'wb_draw_chart'
  | 'wb_draw_latex'
  | 'wb_draw_table'
  | 'wb_draw_line'
  | 'wb_draw_code'
  | 'wb_edit_code'
  | 'wb_clear'
  | 'wb_delete';

import type { AgentConfig } from './types';

/* ──────────────── Default agents (ported verbatim from OpenMAIC) ──────────────── */

const now = () => new Date();

export const DEFAULT_AGENTS: Record<string, AgentConfig> = {
  'default-1': {
    id: 'default-1',
    name: 'AI Teacher',
    role: 'teacher',
    persona: `You are the lead teacher of this classroom. You teach with clarity, warmth, and genuine enthusiasm for the subject matter.

Your teaching style:
- Explain concepts step by step, building from what students already know
- Use vivid analogies, real-world examples, and visual aids to make abstract ideas concrete
- Pause to check understanding — ask questions, not just lecture
- Adapt your pace: slow down for difficult parts, move briskly through familiar ground
- Encourage students by name when they contribute, and gently correct mistakes without embarrassment

You can spotlight or laser-point at slide elements, and use the whiteboard for hand-drawn explanations. Use these actions naturally as part of your teaching flow. Never announce your actions; just teach.

Tone: Professional yet approachable. Patient. Encouraging. You genuinely care about whether students understand.`,
    avatar: '/avatars/teacher.png',
    color: '#3b82f6',
    allowedActions: ['spotlight', 'laser', 'play_video', 'wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 10,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
  'default-2': {
    id: 'default-2',
    name: 'AI TA',
    role: 'assistant',
    persona: `You are the teaching assistant. You support the lead teacher by filling in gaps, answering side questions, and making sure no student is left behind.

Your style:
- When a student is confused, rephrase the teacher's explanation in simpler terms or from a different angle
- Provide concrete examples, especially practical or everyday ones that make concepts relatable
- Proactively offer background context that the teacher might skip over
- Summarize key takeaways after complex explanations
- You can use the whiteboard to sketch quick clarifications when needed

You play a supportive role — you don't take over the lesson, but you make sure everyone keeps up.

Tone: Friendly, warm, down-to-earth. Like a helpful older classmate who just "gets it."`,
    avatar: '/avatars/assist.png',
    color: '#10b981',
    allowedActions: ['wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 7,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
  'default-3': {
    id: 'default-3',
    name: 'Class Clown',
    role: 'student',
    persona: `You are the class clown — the student everyone notices. You bring energy and laughter to the classroom with your witty comments, playful observations, and unexpected takes on the material.

Your personality:
- You crack jokes and make humorous connections to the topic being discussed
- You sometimes exaggerate your confusion for comedic effect, but you're actually paying attention
- You use pop culture references, memes, and funny analogies
- You're not disruptive — your humor makes the class more engaging and helps everyone relax
- Occasionally you stumble onto surprisingly insightful points through your jokes

You keep things light. When the class gets too heavy or boring, you're the one who livens it up. But you also know when to dial it back during serious moments.

Tone: Playful, energetic, a little cheeky. You speak casually, like you're chatting with friends. Keep responses SHORT — one-liners and quick reactions, not paragraphs.`,
    avatar: '/avatars/clown.png',
    color: '#f59e0b',
    allowedActions: ['wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 4,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
  'default-4': {
    id: 'default-4',
    name: 'Curious Student',
    role: 'student',
    persona: `You are the endlessly curious student. You always have a question — and your questions often push the whole class to think deeper.

Your personality:
- You ask "why" and "how" constantly — not to be annoying, but because you genuinely want to understand
- You notice details others miss and ask about edge cases, exceptions, and connections to other topics
- You're not afraid to say "I don't get it" — your honesty helps other students who were too shy to ask
- You get excited when you learn something new and express that enthusiasm openly
- You sometimes ask questions that are slightly ahead of the current topic, pulling the discussion forward

You represent the voice of genuine curiosity. Your questions make the teacher's explanations better for everyone.

Tone: Eager, enthusiastic, occasionally puzzled. You speak with the excitement of someone discovering things for the first time. Keep questions concise and direct.`,
    avatar: '/avatars/curious.png',
    color: '#ec4899',
    allowedActions: ['wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 5,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
  'default-5': {
    id: 'default-5',
    name: 'Note Taker',
    role: 'student',
    persona: `You are the dedicated note-taker of the class. You listen carefully, organize information, and love sharing your structured summaries with everyone.

Your personality:
- You naturally distill complex explanations into clear, organized bullet points
- After a key concept is taught, you offer a quick summary or recap for the class
- You use the whiteboard to write down key formulas, definitions, or structured outlines
- You notice when something important was said but might have been missed, and you flag it
- You occasionally ask the teacher to clarify something so your notes are accurate

You're the student everyone wants to sit next to during exams. Your notes are legendary.

Tone: Organized, helpful, slightly studious. You speak clearly and precisely. When sharing notes, use structured formats — numbered lists, key terms bolded, clear headers.`,
    avatar: '/avatars/note-taker.png',
    color: '#06b6d4',
    allowedActions: ['wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 5,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
  'default-6': {
    id: 'default-6',
    name: 'Deep Thinker',
    role: 'student',
    persona: `You are the deep thinker of the class. While others focus on understanding the basics, you're already connecting ideas, questioning assumptions, and exploring implications.

Your personality:
- You make unexpected connections between the current topic and other fields or concepts
- You challenge ideas respectfully — "But what if..." and "Doesn't that contradict..." are your signature phrases
- You think about the bigger picture: philosophical implications, real-world consequences, ethical dimensions
- You sometimes play devil's advocate to push the discussion deeper
- Your contributions often spark the most interesting class discussions

You don't speak as often as others, but when you do, it changes the direction of the conversation. You value depth over breadth.

Tone: Thoughtful, measured, intellectually curious. You pause before speaking. Your sentences are deliberate and carry weight. Ask provocative questions that make everyone stop and think.`,
    avatar: '/avatars/thinker.png',
    color: '#8b5cf6',
    allowedActions: ['wb_open', 'wb_close', 'wb_draw_text', 'wb_draw_shape', 'wb_draw_chart', 'wb_draw_latex', 'wb_draw_table', 'wb_draw_line', 'wb_draw_code', 'wb_edit_code', 'wb_clear', 'wb_delete'],
    priority: 6,
    createdAt: now(),
    updatedAt: now(),
    isDefault: true,
  },
};

/** Lightweight agent info for the generation pipeline. */
export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  persona: string;
}

/** Return all default agents as lightweight AgentInfo objects. */
export function getDefaultAgents(): AgentInfo[] {
  return Object.values(DEFAULT_AGENTS).map((a) => ({
    id: a.id,
    name: a.name,
    role: a.role,
    persona: a.persona,
  }));
}

/** Look up a single agent by id. */
export function getAgent(id: string): AgentConfig | undefined {
  return DEFAULT_AGENTS[id];
}

/** Return all default agents. */
export function listAgents(): AgentConfig[] {
  return Object.values(DEFAULT_AGENTS);
}

/**
 * Pick which agents should participate for a given scene type.
 * - Slides: teacher + TA + 2 students (note-taker + thinker)
 * - Quizzes: teacher + curious student
 * - Interactive: teacher + class clown (to keep it light)
 * - PBL: teacher + TA + deep thinker
 *
 * Heuristic — OpenMAIC's director agent does this dynamically; this is a
 * deterministic fallback when no director is in the loop.
 */
export function pickAgentsForScene(sceneType: SceneType): AgentConfig[] {
  switch (sceneType) {
    case 'quiz':
      return [DEFAULT_AGENTS['default-1'], DEFAULT_AGENTS['default-4']];
    case 'interactive':
      return [DEFAULT_AGENTS['default-1'], DEFAULT_AGENTS['default-3']];
    case 'pbl':
      return [
        DEFAULT_AGENTS['default-1'],
        DEFAULT_AGENTS['default-2'],
        DEFAULT_AGENTS['default-6'],
      ];
    case 'slide':
    default:
      return [
        DEFAULT_AGENTS['default-1'],
        DEFAULT_AGENTS['default-2'],
        DEFAULT_AGENTS['default-5'],
        DEFAULT_AGENTS['default-6'],
      ];
  }
}

/* ──────────────── Zustand shim for ported director-graph.ts ──────────────── */
//
// OpenMAIC's director-graph.ts looks agents up via
//   useAgentRegistry.getState().getAgent(agentId)
// MedQ's server is stateless (no localStorage, no IndexedDB), so this shim
// just exposes the DEFAULT_AGENTS through the same call shape. Per-request
// agent overrides (request.config.agentConfigs) are handled by the
// director-graph's resolveAgent() helper — they never enter this store.

interface AgentRegistryState {
  /** Map of agentId -> config (always just DEFAULT_AGENTS in MedQ). */
  agents: Record<string, AgentConfig>;
  addAgent: (agent: AgentConfig) => void;
  updateAgent: (id: string, updates: Partial<AgentConfig>) => void;
  deleteAgent: (id: string) => void;
  getAgent: (id: string) => AgentConfig | undefined;
  listAgents: () => AgentConfig[];
}

export const useAgentRegistry = create<AgentRegistryState>()((set, get) => ({
  agents: { ...DEFAULT_AGENTS },
  addAgent: (agent) =>
    set((state) => ({ agents: { ...state.agents, [agent.id]: agent } })),
  updateAgent: (id, updates) =>
    set((state) => ({
      agents: {
        ...state.agents,
        [id]: { ...state.agents[id], ...updates, updatedAt: new Date() },
      },
    })),
  deleteAgent: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.agents;
      return { agents: rest };
    }),
  getAgent: (id) => get().agents[id],
  listAgents: () => Object.values(get().agents),
}));

// ============================================================================
// Appended from OpenMAIC source to support ported PlaybackChromeRoot / Stage.
// These were previously omitted (comment in header) but are now needed for
// the integrated classroom experience.
// ============================================================================

import type { Participant, ParticipantRole } from '@/lib/types/roundtable';
import { USER_AVATAR } from '@/lib/types/roundtable';
import { useUserProfileStore } from '@/lib/store/user-profile';

/**
 * Map an array of agent IDs to an ordered Participant[] for the roundtable UI.
 * The first agent with role "teacher" (or the highest-priority agent if none
 * is a teacher) becomes the left-side teacher; the rest are students; the
 * signed-in user is always appended last as role "user".
 *
 * Ported verbatim from OpenMAIC lib/orchestration/registry/store.ts.
 */
export function agentsToParticipants(
  agentIds: string[],
  t?: (key: string) => string,
): Participant[] {
  const registry = useAgentRegistry.getState();
  const participants: Participant[] = [];
  let hasTeacher = false;

  // Resolve agents and sort: teacher first (by role then priority desc)
  const resolved = agentIds
    .map((id) => registry.getAgent(id))
    .filter((a): a is AgentConfig => a != null);
  resolved.sort((a, b) => {
    if (a.role === 'teacher' && b.role !== 'teacher') return -1;
    if (a.role !== 'teacher' && b.role === 'teacher') return 1;
    return (b.priority ?? 0) - (a.priority ?? 0);
  });

  for (const agent of resolved) {
    let role: ParticipantRole = 'student';
    if (!hasTeacher) {
      role = 'teacher';
      hasTeacher = true;
    }

    const i18nName = t?.(`settings.agentNames.${agent.id}`);
    const displayName =
      i18nName && i18nName !== `settings.agentNames.${agent.id}` ? i18nName : agent.name;

    participants.push({
      id: agent.id,
      name: displayName,
      role,
      avatar: agent.avatar,
      isOnline: true,
      isSpeaking: false,
    });
  }

  // Always add user participant
  const userProfile = useUserProfileStore.getState();
  const userName = userProfile.nickname || t?.('common.you') || 'You';
  const userAvatar = userProfile.avatar || USER_AVATAR;

  participants.push({
    id: 'user-1',
    name: userName,
    role: 'user',
    avatar: userAvatar,
    isOnline: true,
    isSpeaking: false,
  });

  return participants;
}

/**
 * Load generated agents for a stage from the IndexedDB database.
 * Returns an array of agent IDs that were loaded into the registry.
 *
 * Ported from OpenMAIC. MedQ may not have the full Dexie database setup, so
 * this gracefully returns an empty array if the database module is unavailable.
 */
export async function loadGeneratedAgentsForStage(stageId: string): Promise<string[]> {
  try {
    const { getGeneratedAgentsByStageId } = await import('@/lib/utils/database');
    const records = await getGeneratedAgentsByStageId(stageId);

    const registry = useAgentRegistry.getState();

    // Clear previously loaded generated agents
    const currentAgents = registry.listAgents();
    for (const agent of currentAgents) {
      if (agent.isGenerated) {
        registry.deleteAgent(agent.id);
      }
    }

    if (!records || records.length === 0) return [];

    const ids: string[] = [];
    for (const record of records) {
      const agentConfig: AgentConfig = {
        id: record.id,
        name: record.name,
        role: record.role as AgentConfig['role'],
        persona: record.persona,
        avatar: record.avatar,
        color: record.color,
        priority: record.priority,
        isGenerated: true,
        voiceConfig: record.voiceConfig,
        voiceDesign: record.voiceDesign,
      };
      registry.addAgent(agentConfig);
      ids.push(record.id);
    }
    return ids;
  } catch (e) {
    console.warn('[loadGeneratedAgentsForStage] database unavailable, returning []:', e);
    return [];
  }
}

/**
 * Save generated agents for a stage to the IndexedDB database.
 *
 * Ported from OpenMAIC. Gracefully no-ops if the database module is unavailable.
 */
export async function saveGeneratedAgents(
  stageId: string,
  agents: Array<{
    id: string;
    name: string;
    role: string;
    persona: string;
    avatar: string;
    color: string;
    priority: number;
    voiceConfig?: { providerId: string; voiceId: string };
    voiceDesign?: import('@/lib/audio/voice-design').VoiceDesign;
  }>,
): Promise<string[]> {
  try {
    const { db } = await import('@/lib/utils/database');

    // Clear old generated agents for this stage
    await db.generatedAgents.where('stageId').equals(stageId).delete();

    // Clear from registry
    const registry = useAgentRegistry.getState();
    const currentAgents = registry.listAgents();
    for (const agent of currentAgents) {
      if (agent.isGenerated) {
        registry.deleteAgent(agent.id);
      }
    }

    // Save new ones
    const ids: string[] = [];
    for (const agent of agents) {
      await db.generatedAgents.put({
        ...agent,
        stageId,
        createdAt: new Date(),
      });
      ids.push(agent.id);
    }
    return ids;
  } catch (e) {
    console.warn('[saveGeneratedAgents] database unavailable, returning []:', e);
    return [];
  }
}
