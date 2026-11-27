import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';

import { forgetMemory, listMemories, saveMemory, searchMemories, updateMemory } from '../memory/service';
// Shared search tool (provider → ZAI-gateway fallback → honest unavailability).
// The hand-rolled copy that used to live here had NO ZAI fallback, so with an
// unconfigured Tavily key every search_medical_references call failed — and it
// also hit the resolveWebSearchApiKey single-arg overload bug (the providerId
// string leaking in as the API key → "Bearer tavily" → 401 six times per
// generation). Reuse the canonical tool for exact parity with the chat agent.
import { createMedicalWebSearchTool } from './tools/web-search';
import { createImageSearchTool } from './tools/media';
import { createLabPanelTool } from './tools/lab-panel';
import { resolveAttachmentInput } from './attachment-registry';
// Server-only dispatch (adds the built-in ZAI provider on top of the shared
// registry) — see image-providers-server.ts for why agent code must use it.
import { generateImage } from '@/lib/media/image-providers-server';
import type { ImageProviderId } from '@/lib/media/types';
import { saveGeneratedImage } from './tools/illustration';
import { generateTTS } from '@/lib/audio/tts-providers';
import {
  resolveImageApiKey,
  resolveImageBaseUrl,
  resolveTTSApiKey,
  resolveTTSBaseUrl,
  resolveTTSModel,
} from '@/lib/server/provider-config';

export interface MedQToolContext {
  userId: string;
  threadId?: string;
}

type AgentProviderConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

export function createMultimodalTools(getProviderConfig: () => AgentProviderConfig) {
  const medicalWebSearchTool = createMedicalWebSearchTool();
  const labPanelTool = createLabPanelTool();

  const medicalIllustrationTool = new DynamicStructuredTool({
    name: 'generate_medical_illustration',
    description:
      'CREATE a brand-new educational medical illustration from scratch (only when the user asks to generate/draw/create an image, or a saved question genuinely needs one). If the user instead asks to FIND or SEE existing real images online, call search_medical_images — do NOT generate. Returns the provider result, or a clear configuration error.',
    schema: z.object({
      prompt: z.string().min(10).describe('Anatomically precise educational image prompt'),
    }),
    func: async ({ prompt }) => {
      // Preferred provider from env (default seedream); falls back to the
      // managed ZAI image provider when no API key is configured for it —
      // this keeps illustration generation working out of the box on ZAI
      // deployments (the base64 result is persisted and rendered inline in
      // the chat UI). Previously this called Seedream with an empty key and
      // crashed the whole graph on the resulting 401.
      let providerId = (process.env.MEDQ_AGENT_IMAGE_PROVIDER || 'seedream') as ImageProviderId;
      let apiKey = resolveImageApiKey(providerId);
      let baseUrl = resolveImageBaseUrl(providerId);
      let fallbackNote: string | undefined;
      if (!apiKey && providerId !== 'zai') {
        fallbackNote = `Provider "${providerId}" has no API key configured — used the built-in ZAI image provider instead.`;
        providerId = 'zai';
        apiKey = resolveImageApiKey('zai');
        baseUrl = resolveImageBaseUrl('zai');
      }
      try {
        const result = await generateImage(
          {
            providerId,
            apiKey: apiKey ?? '',
            baseUrl,
            model: process.env.MEDQ_AGENT_IMAGE_MODEL,
          },
          { prompt, aspectRatio: '16:9' },
        );
        // Base64-only results (ZAI) are persisted to /public/generated so
        // the tool result carries a small, previewable URL the chat UI
        // renders inline instead of a ~40KB base64 blob.
        if (result.base64 && !result.url) {
          const url = saveGeneratedImage(result.base64);
          if (url) {
            return JSON.stringify({
              provider: providerId,
              url,
              width: result.width,
              height: result.height,
              ...(fallbackNote ? { note: fallbackNote } : {}),
            });
          }
        }
        return JSON.stringify({ provider: providerId, ...result, ...(fallbackNote ? { note: fallbackNote } : {}) });
      } catch (err) {
        // Graceful degradation: a failing image provider must NEVER crash
        // the agent graph — return an honest payload the agent can adapt to
        // (write the question text-only), matching search_medical_references.
        return JSON.stringify({
          error: `Image generation failed: ${
            err instanceof Error ? err.message.slice(0, 200) : 'unknown error'
          }`,
          note: 'Proceed without an image and write the question text-only. To enable image generation, set IMAGE_SEEDREAM_API_KEY (Ark/Volcano Engine) in .env — when no provider key is set, the built-in ZAI provider is used automatically.',
        });
      }
    },
  });

  const visualMaterialAnalysisTool = new DynamicStructuredTool({
    name: 'analyze_visual_material',
    description:
      'Analyze an uploaded medical image or visual reference with a vision model to identify anatomy, pathology, imaging findings, or visual details. imageUrl accepts an attachment:// reference from the user\'s uploaded image, a data URL, or a public https image URL.',
    schema: z.object({
      imageUrl: z.string().min(5).describe(
        'The image to analyze: use the attachment:// reference from the user\'s uploaded image, a data URL, or a public https URL',
      ),
      question: z.string().min(5).describe('What medical details to extract from the image'),
    }),
    func: async ({ imageUrl, question }) => {
      // fix(attachment-flow): the old body sent the agent provider (a text
      // model through the AI Router) an image_url block — the router has no
      // vision-capable upstream, so every call died with "routing exhausted
      // (no vision support)" in ~50ms. It also demanded z.string().url(),
      // rejecting the bare file names the model used to see. Now: resolve
      // attachment:// refs through the registry and run the proven ZAI
      // createVision chain (glm-4.5v → 4.6v → 4v) shared with knowledge
      // ingestion.
      let url: string;
      try {
        url = resolveAttachmentInput(imageUrl, 'image');
      } catch (error) {
        return JSON.stringify({
          analyzed: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      try {
        const { describeImage } = await import('./knowledge/ingest-media');
        let buffer: Buffer;
        let mimeType: string;
        if (url.startsWith('data:')) {
          const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(url);
          if (!match) throw new Error('Malformed data URL.');
          buffer = Buffer.from(match[3], 'base64');
          mimeType = match[1];
        } else {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Could not fetch the image: HTTP ${response.status}`);
          mimeType = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg';
          buffer = Buffer.from(await response.arrayBuffer());
        }
        const text = await describeImage(buffer, mimeType, question);
        if (text) return text;
        return JSON.stringify({
          analyzed: false,
          error: 'No vision model was reachable to analyze the image. Try again in a moment.',
        });
      } catch (error) {
        return JSON.stringify({
          analyzed: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  const medicalAudioTool = new DynamicStructuredTool({
    name: 'generate_medical_audio',
    description: 'Generate a spoken clinical explanation, auscultation prompt, or teaching narration when a question requires audio. Only use this for a genuine audio requirement.',
    schema: z.object({
      text: z.string().min(10).describe('Clinical text to speak aloud'),
      voice: z.string().default('alloy').describe('TTS voice to use'),
    }),
    func: async ({ text, voice }) => {
      const providerId = (process.env.MEDQ_AGENT_TTS_PROVIDER || 'openai-tts') as Parameters<typeof generateTTS>[0]['providerId'];
      const config = {
        providerId,
        apiKey: resolveTTSApiKey(providerId),
        baseUrl: resolveTTSBaseUrl(providerId),
        modelId: resolveTTSModel(providerId, process.env.MEDQ_AGENT_TTS_MODEL),
        voice,
        speed: 1,
      } as Parameters<typeof generateTTS>[0];
      const result = await generateTTS(config, text);
      return JSON.stringify({ providerId, format: result.format, durationMs: result.audio.length, audio: result.audio ? 'audio-bytes-generated' : 'none' });
    },
  });

  return [medicalWebSearchTool, createImageSearchTool(), labPanelTool, medicalIllustrationTool, medicalAudioTool, visualMaterialAnalysisTool];
}

export function createMemoryTools(ctx: MedQToolContext) {
  const saveMemoryTool = new DynamicStructuredTool({
    name: 'save_memory',
    description:
      'Save a durable fact about this learner to long-term memory. Use for stable, useful information: year of study, specialty goals, weak topics, preferred explanation style, exam dates. NOT for transient chat details. Providing a key updates the existing memory with that key.',
    schema: z.object({
      scope: z.enum(['profile', 'study', 'fact', 'conversation', 'semantic']).describe('profile = who they are, study = how/what they study, fact = learned knowledge, conversation = working notes for the current thread, semantic = auto-extracted interaction facts'),
      content: z.string().min(3).max(400).describe('The fact, written in third person, e.g. "Struggles with renal physiology; asks for analogies"'),
      key: z.string().max(120).optional().describe('Short stable key for upsert, e.g. "weak-topic-renal"'),
      importance: z.number().min(0).max(1).optional().describe('0-1, default 0.5; use 0.8+ for core facts'),
    }),
    func: async (input) => {
      try {
        const entry = await saveMemory({ userId: ctx.userId, ...input });
        return JSON.stringify({ saved: true, id: entry.id, scope: entry.scope, key: entry.key });
      } catch (error) {
        return JSON.stringify({ saved: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const searchMemoryTool = new DynamicStructuredTool({
    name: 'search_memory',
    description:
      'Search long-term memory for what is known about this learner (preferences, weak topics, past interactions). Use before personalizing an answer or study plan.',
    schema: z.object({
      query: z.string().min(2).describe('What to recall, e.g. "cardiology weak areas"'),
      limit: z.number().int().min(1).max(10).optional().describe('Max results, default 6'),
    }),
    func: async ({ query, limit }) => {
      try {
        const results = await searchMemories(ctx.userId, query, limit ?? 6);
        if (results.length === 0) return JSON.stringify({ memories: [], note: 'No stored memories match yet.' });
        return JSON.stringify({
          memories: results.map((entry) => ({
            scope: entry.scope,
            key: entry.key,
            content: entry.content,
            relevance: Math.round(Math.min(entry.score / 3, 1) * 100) / 100,
          })),
        });
      } catch (error) {
        return JSON.stringify({ memories: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const updateMemoryTool = new DynamicStructuredTool({
    name: 'update_memory',
    description:
      'Edit a stored memory by id — refine wording or importance (ids come from search_memory or list_memory). Prefer save_memory with the same key for simple upserts.',
    schema: z.object({
      memoryId: z.string().min(1).describe('The memory id to update'),
      content: z.string().min(3).max(400).optional().describe('New content (omit to keep)'),
      importance: z.number().min(0).max(1).optional().describe('New importance (omit to keep)'),
    }),
    func: async ({ memoryId, content, importance }) => {
      try {
        const entry = await updateMemory(ctx.userId, memoryId, { content, importance });
        if (!entry) return JSON.stringify({ updated: false, error: 'Memory not found' });
        return JSON.stringify({ updated: true, id: entry.id, scope: entry.scope, key: entry.key });
      } catch (error) {
        return JSON.stringify({ updated: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const listMemoryTool = new DynamicStructuredTool({
    name: 'list_memory',
    description:
      'List the learner\'s most recent memories (all scopes, newest first). Use to review what is already stored before saving duplicates or when search terms are uncertain.',
    schema: z.object({
      limit: z.number().int().min(1).max(50).optional().describe('Max results, default 20'),
    }),
    func: async ({ limit }) => {
      try {
        const entries = await listMemories(ctx.userId, Math.min(limit ?? 20, 50));
        return JSON.stringify({
          memories: entries.map((entry) => ({ id: entry.id, scope: entry.scope, key: entry.key, content: entry.content, importance: entry.importance })),
        });
      } catch (error) {
        return JSON.stringify({ memories: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const forgetMemoryTool = new DynamicStructuredTool({
    name: 'forget_memory',
    description:
      'Delete an outdated or incorrect memory by its id (ids are returned by search_memory). Use when the learner corrects a stored fact, then save the corrected version with save_memory.',
    schema: z.object({
      memoryId: z.string().min(1).describe('The memory id to delete'),
    }),
    func: async ({ memoryId }) => {
      try {
        const removed = await forgetMemory(ctx.userId, memoryId);
        return JSON.stringify({ removed });
      } catch (error) {
        return JSON.stringify({ removed: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [saveMemoryTool, searchMemoryTool, updateMemoryTool, forgetMemoryTool, listMemoryTool];
}

// ---------------------------------------------------------------------------
// Tool activity instrumentation (tool call ≠ tool result)
// ---------------------------------------------------------------------------
//
// Tools executed by a deepagents SUBAGENT are invisible to the parent graph's
// 'updates' stream: their ToolMessages live inside the subagent's opaque
// state, so the chat UI's tool cards sit on "Requested — waiting for the
// result…" forever even though the tool ran and returned. The ONLY layer
// that observes both the call (with its parsed args) and the result
// regardless of graph nesting is the tool itself — so subagent tools are
// wrapped here and pushed start/end events to a caller-provided sink.

/** One instrumented tool invocation event (call or result — never conflated). */
export interface ToolActivityEvent {
  type: 'tool_start' | 'tool_end';
  tool: string;
  /** Correlation id: shared by this call's tool_start and tool_end. */
  callId: string;
  /** Parsed input args (tool_start only). */
  args?: unknown;
  /** Short result preview (tool_end only). */
  excerpt?: string;
  /** False when the tool threw (tool_end only). */
  ok?: boolean;
  /** Wall-clock execution duration (tool_end only). */
  durationMs?: number;
}

/**
 * Wrap DynamicStructuredTools with activity instrumentation. Every invocation
 * emits tool_start (parsed args + fresh callId) when execution begins and
 * tool_end (result excerpt, ok flag, duration) when it completes — including
 * on throw, so a failed call never dangles as "waiting".
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic tool-array passthrough: the wrapper preserves the caller's concrete DynamicStructuredTool union without re-inferring its zod schema generics
export function instrumentToolsForActivity<T extends DynamicStructuredTool<any, any, any, any, any, string>>(
  tools: T[],
  onEvent: (event: ToolActivityEvent) => void,
): T[] {
  let seq = 0;
  return tools.map((tool) => {
    const original = tool.func;
    return new DynamicStructuredTool({
      name: tool.name,
      description: tool.description,
      schema: tool.schema,
      func: async (input) => {
        const callId = `${tool.name}-${++seq}-${Date.now()}`;
        onEvent({ type: 'tool_start', tool: tool.name, callId, args: input });
        const startedAt = Date.now();
        try {
          const result = await original(input as never);
          onEvent({
            type: 'tool_end',
            tool: tool.name,
            callId,
            ok: true,
            excerpt: (typeof result === 'string' ? result : JSON.stringify(result)).slice(0, 600),
            durationMs: Date.now() - startedAt,
          });
          return result;
        } catch (error) {
          onEvent({
            type: 'tool_end',
            tool: tool.name,
            callId,
            ok: false,
            excerpt: (error instanceof Error ? error.message : String(error)).slice(0, 600),
            durationMs: Date.now() - startedAt,
          });
          throw error;
        }
      },
    });
  }) as unknown as T[];
}
