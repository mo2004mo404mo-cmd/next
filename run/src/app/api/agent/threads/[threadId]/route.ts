/**
 * Agent thread deletion + rename API.
 *
 * DELETE /api/agent/threads/[threadId]
 *   Deletes one of the caller's chat threads (rows cascade to its messages).
 *   The thread store is the source of truth for history replay and network-drop
 *   recovery, so deleting here removes the transcript everywhere.
 *
 * PATCH /api/agent/threads/[threadId]  { title: string }
 *   Renames one of the caller's chat threads (max 120 chars, whitespace-
 *   collapsed). Lets users replace the auto-generated title with something
 *   meaningful without touching updatedAt (list order = last activity).
 *
 * Auth: the resolved user must own the thread.
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { deleteThread, renameThread } from '@/lib/agent/threads/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await params;
  if (!threadId || !/^[a-zA-Z0-9-]{8,64}$/.test(threadId)) {
    return NextResponse.json({ error: 'Invalid thread id' }, { status: 400 });
  }

  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const deleted = await deleteThread(threadId, userId);
  if (!deleted) {
    return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, threadId });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await params;
  if (!threadId || !/^[a-zA-Z0-9-]{8,64}$/.test(threadId)) {
    return NextResponse.json({ error: 'Invalid thread id' }, { status: 400 });
  }

  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body: { title?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const title = typeof body.title === 'string' ? body.title : '';
  if (!title.trim()) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }

  const newTitle = await renameThread(threadId, userId, title);
  if (newTitle === null) {
    return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, threadId, title: newTitle });
}
