import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { db } from '@/lib/db';
import { buildAuxModel, buildZaiBackupModel } from '@/lib/agent/provider/fast-model';

/**
 * Chat unread digest — AI summarization for busy rooms.
 *
 * Built for the "thousands of unread messages in one group" case: fetching
 * everything into the agent's context would blow the window and the token
 * budget. Instead the digest runs map-reduce on the AUX model (the same
 * auto model as the main agent since the 2026-10-25 routing revert):
 *
 *   1. unread messages (others' messages since the user's lastReadAt) are
 *      fetched oldest-first, capped at maxMessages;
 *   2. chunks of ~40 messages are summarized independently (cheap, parallel,
 *      token-bounded) with instruction to extract EVENTS — meetings, exam
 *      schedules, deadlines, schedule changes, announcements;
 *   3. the per-chunk digests are merged into one final digest + a deduped,
 *      structured events list.
 *
 * Used by BOTH the agent tool (summarize_unread_messages) and the Messages
 * tab's "AI digest" button (/api/chat/digest) — one implementation, two doors.
 *
 * The digest NEVER mutates lastReadAt (unread badge stays) and reports how
 * many oldest messages were skipped beyond the analysis cap.
 */

export interface DigestEvent {
  type: 'meeting' | 'exam' | 'deadline' | 'schedule_change' | 'announcement' | 'other';
  title: string;
  /** Date/time exactly as stated in the chat (not normalized). */
  when?: string;
  who?: string;
  detail?: string;
  /** Message the event was extracted from (for deep-linked notifications). */
  messageId?: string;
}

export interface ChatDigest {
  roomId: string;
  roomName: string;
  totalUnread: number;
  analyzed: number;
  /** Unread messages older than the analysis cap (not summarized). */
  skippedOldest: number;
  digest: string;
  events: DigestEvent[];
  model: string;
}

interface ChunkSummary {
  summary: string;
  events: DigestEvent[];
}

const CHUNK_SIZE = 40;

function formatTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Robustly pull a JSON object out of a model reply (handles ```json fences
 * and trailing prose). */
function parseJsonObject(text: string): Record<string, unknown> | null {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1));
    return typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

function coerceEvents(raw: unknown): DigestEvent[] {
  if (!Array.isArray(raw)) return [];
  const allowed: DigestEvent['type'][] = ['meeting', 'exam', 'deadline', 'schedule_change', 'announcement', 'other'];
  const events: DigestEvent[] = [];
  for (const item of raw.slice(0, 25)) {
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    if (!title) continue;
    events.push({
      type: allowed.includes(record.type as DigestEvent['type']) ? (record.type as DigestEvent['type']) : 'other',
      title: title.slice(0, 140),
      when: typeof record.when === 'string' ? record.when.slice(0, 80) : undefined,
      who: typeof record.who === 'string' ? record.who.slice(0, 60) : undefined,
      detail: typeof record.detail === 'string' ? record.detail.slice(0, 240) : undefined,
      messageId: typeof record.messageId === 'string' ? record.messageId : undefined,
    });
  }
  return events;
}

const CHUNK_SYSTEM = [
  'You summarize one chunk of a group chat for a busy medical student.',
  'Return ONLY a JSON object: {"summary": string, "events": array}.',
  'summary: <=90 words, factual, names who said what matters.',
  'events: only REAL scheduled things found in THIS chunk — meetings, exams, quizzes, deadlines, schedule changes, official announcements.',
  'Each event: {"type": "meeting|exam|deadline|schedule_change|announcement|other", "title": short, "when": date/time EXACTLY as stated, "who": who it concerns, "detail": one line, "messageId": the id given for the message it came from}.',
  'No event if nothing scheduled appears. Never invent dates, times or events.',
].join('\n');

const REDUCE_SYSTEM = [
  'You merge partial chat digests into ONE final digest for a busy medical student.',
  'Return ONLY a JSON object: {"digest": string, "events": array}.',
  'digest: markdown with sections "## Overview" (3-4 sentences), "## Key topics" (bullets), "## Decisions & answers" (bullets, who decided), "## Needs your attention" (questions asked to the student, action items).',
  'events: the MERGED, deduplicated event list from all chunks (same shape: type/title/when/who/detail/messageId). Keep the most precise "when".',
  'Stay strictly faithful to the partial digests — no new facts.',
].join('\n');

/** One map step: summarize one chunk on the fast model. */
async function summarizeChunk(
  model: BaseChatModel,
  roomName: string,
  lines: string[],
  messageIds: string[],
): Promise<ChunkSummary> {
  const numbered = lines.map((line, index) => `${messageIds[index]} · ${line}`).join('\n');
  const response = await invokeWithRetry(model, [
    { role: 'system', content: CHUNK_SYSTEM },
    { role: 'user', content: `Room: "${roomName}". Messages (id · [time] Sender: text):\n\n${numbered}` },
  ]);
  const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
  const parsed = parseJsonObject(text);
  if (!parsed) {
    return { summary: text.slice(0, 600), events: [] };
  }
  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
    events: coerceEvents(parsed.events),
  };
}

function dedupeEvents(events: DigestEvent[]): DigestEvent[] {
  const seen = new Map<string, DigestEvent>();
  for (const event of events) {
    const key = `${event.type}|${event.title.toLowerCase().slice(0, 60)}`;
    if (!seen.has(key)) seen.set(key, event);
  }
  return Array.from(seen.values()).slice(0, 20);
}

/** Rate-limit-resilient invoke: the shared gateway storms transiently (429
 * "Too many requests" wrapping) — retrying after a short backoff usually
 * clears it. When the primary stays saturated, the managed Z.AI backup
 * (same 3rd rung as the chat runtime's ladder) takes the final attempt. */
async function invokeWithRetry(
  model: BaseChatModel,
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  attempts = 3,
): Promise<Awaited<ReturnType<BaseChatModel['invoke']>>> {
  let lastError: unknown;
  let rateLimited = false;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await model.invoke(messages);
    } catch (error) {
      lastError = error;
      const text = error instanceof Error ? error.message : String(error);
      rateLimited = /429|rate.?limit|too many requests|all models exhausted/i.test(text);
      if (!rateLimited) throw error; // non-rate errors propagate unchanged
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 8_000 * (attempt + 1)));
      }
    }
  }
  // All attempts rate-limited → final rung: the Z.AI backup endpoint.
  if (rateLimited) {
    const backup = buildZaiBackupModel();
    if (backup) {
      return await backup.invoke(messages as Parameters<typeof backup.invoke>[0]);
    }
  }
  throw lastError;
}

/** The reduce step: merge chunk digests into the final digest + events. */
async function mergeDigests(
  model: BaseChatModel,
  roomName: string,
  chunks: ChunkSummary[],
): Promise<ChunkSummary> {
  const parts = chunks
    .map((chunk, index) => `### Part ${index + 1}\n${chunk.summary || '(no summary)'}\nEvents: ${JSON.stringify(chunk.events)}`)
    .join('\n\n');
  const response = await invokeWithRetry(model, [
    { role: 'system', content: REDUCE_SYSTEM },
    { role: 'user', content: `Room: "${roomName}". Partial digests:\n\n${parts}` },
  ]);
  const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
  const parsed = parseJsonObject(text);
  if (!parsed) {
    // Fall back to mechanical merge — still useful, never a dead end.
    return {
      summary: chunks.map((chunk) => chunk.summary).filter(Boolean).join('\n\n'),
      events: dedupeEvents(chunks.flatMap((chunk) => chunk.events)),
    };
  }
  const mergedEvents = coerceEvents(parsed.events);
  return {
    summary: typeof parsed.digest === 'string' ? parsed.digest : '',
    events: mergedEvents.length > 0
      ? mergedEvents
      : dedupeEvents(chunks.flatMap((chunk) => chunk.events)),
  };
}

export async function digestUnreadMessages(options: {
  userId: string;
  roomId: string;
  maxMessages?: number;
  /** Fast model instance (agent runtime passes its shared one). */
  model?: BaseChatModel;
  signal?: AbortSignal;
  /** Time-window mode (the Messages-tab button after the room was opened —
   *  opening marks read, so "unread" alone would always be empty): digest
   *  others' messages newer than this instant instead of lastReadAt. */
  since?: Date;
}): Promise<ChatDigest> {
  const { userId, roomId, signal } = options;
  const maxMessages = Math.min(Math.max(options.maxMessages ?? 600, 20), 1000);

  const membership = await db.chatRoomMember.findUnique({
    where: { roomId_userId: { roomId, userId } },
    include: { room: { select: { id: true, name: true, type: true } } },
  });
  if (!membership) throw new Error('Not a member of that room');

  const room = membership.room;
  const cutoff = options.since ?? membership.lastReadAt;
  const unreadWhere = {
    roomId,
    senderId: { not: userId },
    isDeleted: false,
    createdAt: { gt: cutoff },
  };
  const [totalUnread, rows] = await Promise.all([
    db.chatMessage.count({ where: unreadWhere }),
    db.chatMessage.findMany({
      where: unreadWhere,
      include: { sender: { select: { name: true } } },
      orderBy: { createdAt: 'asc' },
      take: maxMessages,
    }),
  ]);

  if (rows.length === 0) {
    return {
      roomId,
      roomName: room.name || 'Direct message',
      totalUnread: 0,
      analyzed: 0,
      skippedOldest: 0,
      digest: options.since
        ? `No messages from others in that time window.`
        : 'No unread messages in this room.',
      events: [],
      model: 'none',
    };
  }

  const skippedOldest = Math.max(totalUnread - rows.length, 0);
  // Aux model ladder: explicitly-passed model (agent runtime) → fast model
  // (opt-in) → env-chain primary (the auto model) → Z.AI backup. With the
  // routing revert, this is the SAME model the chat loop uses.
  const model = options.model ?? buildAuxModel() ?? null;
  const roomName = room.type === 'group' ? room.name || 'the group' : 'this conversation';

  const lines = rows.map((row) => {
    const text = (row.content || `[${row.type}]`).replace(/\s+/g, ' ').slice(0, 400);
    return `[${formatTimestamp(row.createdAt)}] ${row.sender?.name ?? 'Someone'}: ${text}`;
  });
  const messageIds = rows.map((row) => row.id);

  let chunks: ChunkSummary[];
  if (!model) {
    // No LLM configured — mechanical fallback: newest 25 messages verbatim.
    const newest = lines.slice(-25);
    chunks = [{
      summary: `No summarization model is configured. Latest unread messages:\n\n${newest.join('\n')}`,
      events: [],
    }];
  } else {
    const chunkPromises: Array<Promise<ChunkSummary>> = [];
    for (let start = 0; start < lines.length; start += CHUNK_SIZE) {
      chunkPromises.push(
        summarizeChunk(
          model,
          roomName,
          lines.slice(start, start + CHUNK_SIZE),
          messageIds.slice(start, start + CHUNK_SIZE),
        ),
      );
    }
    chunks = await Promise.all(chunkPromises);
    if (signal?.aborted) throw new Error('Digest aborted');
  }

  const merged = chunks.length > 1 && model
    ? await mergeDigests(model, roomName, chunks)
    : { summary: chunks[0]?.summary ?? '', events: dedupeEvents(chunks.flatMap((chunk) => chunk.events)) };

  const header = skippedOldest > 0
    ? `> Note: you have ${totalUnread} unread messages; the ${skippedOldest} oldest were beyond the digest window (${rows.length} analyzed, newest prioritized).\n\n`
    : '';

  return {
    roomId,
    roomName: room.name || 'Direct message',
    totalUnread,
    analyzed: rows.length,
    skippedOldest,
    digest: `${header}${merged.summary}`,
    events: merged.events,
    model: model ? String((model as unknown as { model?: string }).model ?? 'fast-model') : 'fallback',
  };
}
