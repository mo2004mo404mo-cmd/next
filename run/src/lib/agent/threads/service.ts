/**
 * Persistence layer for agent conversation threads.
 *
 * This service stores each user turn and assistant response in the database so
 * the UI can restore thread history, display message metadata, and keep the
 * active conversation state consistent across refreshes and reopens.
 */
import { db } from '../../db';
import { createLogger } from '../../logger';

const log = createLogger('AgentThreads');

/**
 * AgentThread persistence service — DB-backed conversation history.
 *
 * The in-process MemorySaver checkpointer (runtime/checkpoints.ts) holds the
 * LangGraph state for HITL resume within a single turn; this DB layer adds
 * durable cross-session history. The user gets:
 *   • a thread sidebar UI listing past conversations
 *   • message replay on page refresh or thread re-open
 *   • per-thread dedup so client history + checkpoint history don't double up
 *
 * Ported from the reference "Deep Agent" platform's Thread/Message models +
 * the threads API; adapted to MedQ's tenant model (userId, guest fallback).
 */

export interface ThreadSummary {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface StoredMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: Array<{ id?: string; name: string; args?: unknown }>;
  toolResults?: Array<{ toolCallId?: string; toolName: string; content: string; isError?: boolean }>;
  /** True when this assistant answer was persisted mid-generation (explicit stop,
   * run hard-cap, abort) — the client shows an honest "interrupted" hint and a
   * retry affordance instead of presenting a truncated answer as final. */
  interrupted?: boolean;
  createdAt: Date;
}

export async function listThreads(userId: string, limit = 50): Promise<ThreadSummary[]> {
  try {
    const threads = await db.agentThread.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      include: { _count: { select: { messages: true } } },
    });
    return threads.map((t) => ({
      id: t.id,
      title: t.title,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      messageCount: t._count.messages,
    }));
  } catch (error) {
    log.warn?.('listThreads failed:', error);
    return [];
  }
}

export async function getThreadMessages(threadId: string, userId: string, limit = 200): Promise<StoredMessage[]> {
  try {
    const thread = await db.agentThread.findFirst({ where: { id: threadId, userId } });
    if (!thread) return [];
    const rows = await db.agentThreadMessage.findMany({
      where: { threadId },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
    return rows.map((m) => ({
      id: m.id,
      role: (m.role === 'user' || m.role === 'assistant' || m.role === 'tool' ? m.role : 'assistant') as StoredMessage['role'],
      content: m.content,
      toolCalls: m.toolCalls ? (safeParse(m.toolCalls) as StoredMessage['toolCalls']) : undefined,
      toolResults: m.toolResults ? (safeParse(m.toolResults) as StoredMessage['toolResults']) : undefined,
      interrupted: m.metadata ? ((safeParse(m.metadata) as { interrupted?: boolean } | undefined)?.interrupted === true) : undefined,
      createdAt: m.createdAt,
    }));
  } catch (error) {
    log.warn?.('getThreadMessages failed:', error);
    return [];
  }
}

export async function deleteThread(threadId: string, userId: string): Promise<boolean> {
  try {
    const existing = await db.agentThread.findFirst({ where: { id: threadId, userId } });
    if (!existing) return false;
    await db.agentThread.delete({ where: { id: threadId } });
    return true;
  } catch (error) {
    log.warn?.('deleteThread failed:', error);
    return false;
  }
}

/** Rename one of the caller's threads. Auto-titles stay editable forever:
 * this only overwrites `title` (updatedAt intentionally untouched so the
 * list order still reflects the last real activity). Returns the new title
 * on success, null when the thread doesn't exist / isn't owned. */
export async function renameThread(threadId: string, userId: string, title: string): Promise<string | null> {
  const clean = title.replace(/\s+/g, ' ').trim().slice(0, 120);
  if (!clean) return null;
  try {
    const existing = await db.agentThread.findFirst({ where: { id: threadId, userId }, select: { id: true } });
    if (!existing) return null;
    const updated = await db.agentThread.update({ where: { id: threadId }, data: { title: clean }, select: { title: true } });
    return updated.title;
  } catch (error) {
    log.warn?.('renameThread failed:', error);
    return null;
  }
}

/** Upsert a thread row; returns the threadId (so callers can always set it). */
export async function ensureThread(threadId: string, userId: string, title?: string): Promise<void> {
  try {
    await db.agentThread.upsert({
      where: { id: threadId },
      create: { id: threadId, userId, title: title ?? 'New conversation' },
      update: { updatedAt: new Date(), ...(title ? { title } : {}) },
    });
  } catch (error) {
    log.warn?.('ensureThread failed:', error);
  }
}

/** Append a user message + finalize the assistant turn in one transaction. */
export async function appendUserMessage(threadId: string, userId: string, content: string): Promise<void> {
  try {
    const existing = await db.agentThread.findFirst({ where: { id: threadId, userId } });
    if (!existing) {
      await db.agentThread.create({
        data: {
          id: threadId,
          userId,
          title: content.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New conversation',
          messages: { create: [{ role: 'user', content }] },
        },
      });
      return;
    }
    await db.agentThreadMessage.create({ data: { threadId, role: 'user', content } });
    await db.agentThread.update({ where: { id: threadId }, data: { updatedAt: new Date() } });
  } catch (error) {
    log.warn?.('appendUserMessage failed:', error);
  }
}

export async function appendAssistantMessage(
  threadId: string,
  content: string,
  meta?: { toolCalls?: Array<{ id?: string; name: string; args?: unknown }>; toolResults?: Array<{ toolCallId?: string; toolName: string; content: string; isError?: boolean }>; interrupted?: boolean },
): Promise<void> {
  try {
    await db.agentThreadMessage.create({
      data: {
        threadId,
        role: 'assistant',
        content,
        toolCalls: meta?.toolCalls ? JSON.stringify(meta.toolCalls) : null,
        toolResults: meta?.toolResults ? JSON.stringify(meta.toolResults) : null,
        metadata: meta?.interrupted ? JSON.stringify({ interrupted: true }) : null,
      },
    });
    await db.agentThread.update({ where: { id: threadId }, data: { updatedAt: new Date() } });
  } catch (error) {
    log.warn?.('appendAssistantMessage failed:', error);
  }
}

function safeParse(s: string): unknown {
  try { return JSON.parse(s); } catch { return undefined; }
}
