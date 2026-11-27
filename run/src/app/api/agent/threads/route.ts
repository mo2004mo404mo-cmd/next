/**
 * Agent thread listing API.
 *
 * GET /api/agent/threads
 *
 * Lists the caller's chat threads (newest first) with title, timestamps and
 * message counts — the backend for a history/conversation switcher. Thread
 * transcripts themselves come from GET /api/agent/threads/[threadId]/messages;
 * deletion is DELETE /api/agent/threads/[threadId].
 *
 * Auth: any resolved user (session or guest fallback); rows are
 * tenant-scoped by userId so one user never sees another's threads.
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { listThreads } from '@/lib/agent/threads/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = Math.min(Math.max(Number.parseInt(limitParam ?? '50', 10) || 50, 1), 200);

  const threads = await listThreads(userId, limit);
  return NextResponse.json(
    {
      threads: threads.map((t) => ({
        id: t.id,
        title: t.title,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        messageCount: t.messageCount,
      })),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
