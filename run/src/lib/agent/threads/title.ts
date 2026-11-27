/**
 * LLM-generated thread titles — the flagship consumer of the agent's FAST
 * model routing (MEDQ_AGENT_FAST_MODEL).
 *
 * Before this, thread titles were a truncation of the first user message
 * (appendUserMessage's content.slice(0, 80)) — functional but ugly in the
 * history sidebar. One tiny fast-model call per conversation (capped at 32
 * output tokens, 12s budget, best-effort throughout) replaces the truncation
 * with a real title. The primary reasoning model is never spent on this.
 *
 * Resolution mirrors the agent's provider chain: the MEDQ_AGENT_* / OPENAI_*
 * env provider when configured, else the managed Z.AI config. Since the
 * 2026-10-25 revert of per-task routing (MEDQ_AGENT_FAST_MODEL defaults to
 * "off"), titles run on the SAME primary model as the main agent — set
 * MEDQ_AGENT_FAST_MODEL to a model id to opt back into fast routing.
 */
import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { db } from '../../db';
import { createLogger } from '../../logger';
import { readConfig as readZaiConfig } from '../../zai';

const log = createLogger('AgentThreadTitles');

interface TitleModelConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
  defaultHeaders?: Record<string, string>;
}

function titleModelConfig(): TitleModelConfig | null {
  const fastModel = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
  const fastDisabled = !fastModel || /^(off|none|false|disabled)$/i.test(fastModel);

  const envKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
  if (envKey) {
    return {
      baseUrl: (
        process.env.MEDQ_AGENT_BASE_URL ||
        process.env.OPENAI_BASE_URL ||
        'https://api.openai.com/v1'
      ).replace(/\/$/, ''),
      apiKey: envKey,
      model: fastDisabled
        ? process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini'
        : fastModel,
    };
  }

  try {
    const zai = readZaiConfig();
    if (zai?.apiKey && zai.baseUrl) {
      const headers: Record<string, string> = { 'X-Z-AI-From': 'Z' };
      if (zai.token) headers['X-Token'] = zai.token;
      if (zai.chatId) headers['X-Chat-Id'] = zai.chatId;
      if (zai.userId) headers['X-User-Id'] = zai.userId;
      return {
        baseUrl: zai.baseUrl,
        apiKey: zai.apiKey,
        model: fastDisabled ? process.env.ZAI_FALLBACK_MODEL || 'glm-4.5' : fastModel,
        defaultHeaders: headers,
      };
    }
  } catch {
    // fall through — no provider
  }
  return null;
}

/**
 * Extract a thread title from a raw fast-model response. Exported for
 * unit-testing the ladder against recorded model outputs.
 *
 * Ladder (fast models vary in format discipline — observed with
 * glm-4.5-flash: verbose reasoning, then candidate titles in quotes,
 * sometimes truncating before the requested final line):
 *   1. the final "TITLE: …" line (the requested format)
 *   2. an endorsed candidate: I think "X" is/would be…
 *   3. the last quoted candidate in a list
 *   4. a <title>…</title> span (tag-following models)
 *   5. the last non-empty line
 */
export function extractThreadTitle(rawInput: string): string {
  const raw = rawInput;
  let title = '';

  const titleLines = [...raw.matchAll(/^[ \t>*-]*TITLE[ \t]*:[ \t]*(.+)$/gim)].map((m) => m[1].trim());
  if (titleLines.length) title = titleLines[titleLines.length - 1];

  if (!title) {
    const endorsed = raw.match(/[“"]([^“”"]{3,80})[”"]\s*(?:is|would be|sounds|seems)/i);
    if (endorsed) title = endorsed[1];
  }

  if (!title) {
    const candidates = [...raw.matchAll(/[“"]([^“”"]{3,80})[”"]/g)]
      .map((m) => m[1].trim())
      .filter((t) => t.split(' ').length <= 8 && !/^(the )?(conversation|title|user|learner)/i.test(t));
    if (candidates.length) title = candidates[candidates.length - 1];
  }

  if (!title) {
    const tag = raw.match(/<title>([\s\S]*?)<\/title>/i);
    if (tag) {
      title = tag[1];
    } else {
      const openIdx = raw.toLowerCase().lastIndexOf('<title>');
      if (openIdx >= 0) title = raw.slice(openIdx + 7);
    }
  }

  if (!title) {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    title = lines[lines.length - 1] ?? '';
    title = title.replace(/^(okay|sure|here'?s|title|the title is|certainly|based on)[,:]\s*/i, '');
  }

  return title.replace(/\s+/g, ' ').replace(/^["'\s]+|["'\s.]+$/g, '').slice(0, 80);
}

/** True when an extracted "title" is actually the model narrating the task
 *  ("I need to create…", "The user wants…") — not a usable title. Careful
 *  not to reject real medical titles like "I Cell Disease". */
function looksLikeReasoning(title: string): boolean {
  return (
    title.length < 3 ||
    title.split(' ').length > 12 ||
    /^(i (need|want|will|'ll|have|should)|let me|the user (wants|asked|is)|okay|sure|first[,.]|now[,.]|so[,.])/i.test(title) ||
    /title for|conversation between/i.test(title)
  );
}

/**
 * Generate and persist a proper title for a thread that still carries its
 * auto-derived placeholder — only on the FIRST exchange, never renaming
 * threads the user or a later turn already titled. Best-effort: every failure
 * (no provider, timeout, bad output) degrades silently to the existing title.
 */
export async function maybeGenerateThreadTitle(threadId: string, userId: string, seed: string): Promise<void> {
  try {
    const thread = await db.agentThread.findFirst({
      where: { id: threadId, userId },
      include: { messages: { orderBy: { createdAt: 'asc' }, select: { role: true, content: true } } },
    });
    if (!thread) return;

    // Only the first exchange: exactly one user message so far.
    const userMessages = thread.messages.filter((m) => m.role === 'user');
    if (userMessages.length !== 1) return;

    // Only when the title is still the auto-derived placeholder.
    const derived =
      userMessages[0].content.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New conversation';
    if (thread.title !== 'New conversation' && thread.title !== derived) return;

    const config = titleModelConfig();
    if (!config) return;

    const model = new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.model,
      temperature: 0.3,
      // Headroom for reasoning-style fast models that "think out loud" as
      // content before the answer (observed with glm-4.5-flash).
      maxTokens: 384,
      configuration: {
        baseURL: config.baseUrl,
        ...(config.defaultHeaders ? { defaultHeaders: config.defaultHeaders } : {}),
      },
      maxRetries: 2,
      // A hung title request must fail into the best-effort catch (which
      // keeps the placeholder) instead of parking a worker thread.
      timeout: 30_000,
    });

    const response = await Promise.race([
      model.invoke([
        new HumanMessage(
          'Write a short title (3-6 words) for this conversation between a medical learner and their study assistant. ' +
            'You may think briefly, but you MUST end your reply with exactly one line in this format:\n' +
            'TITLE: Your Title\n' +
            'Nothing after that line.\n\n' +
            'Conversation:\n' +
            seed.slice(0, 800),
        ),
      ]),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('title-generation timeout')), 15_000)),
    ]);

    const raw = String((response as { content?: unknown }).content ?? '');
    const title = extractThreadTitle(raw);
    // Guard against reasoning leakage: a title that narrates the task
    // ("I need to create…", "The user wants…") is not a title — keep the
    // existing placeholder instead of persisting the model's thinking.
    if (looksLikeReasoning(title)) {
      log.warn?.(`title extraction looked like reasoning ("${title.slice(0, 60)}…") — keeping placeholder`);
      return;
    }

    await db.agentThread.update({ where: { id: threadId }, data: { title } });
    log.info?.(`Generated thread title: "${title}"`);
  } catch (error) {
    log.warn?.(`thread title generation failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`);
  }
}
