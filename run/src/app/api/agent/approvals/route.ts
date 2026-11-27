/**
 * GET /api/agent/approvals — pending HITL approvals for the caller.
 *
 * Used by the floating assistant on panel open (and after a page refresh
 * mid-run) to re-render approval cards for decisions the server-side run is
 * still waiting on. Optional ?threadId= scopes the list to the active
 * conversation.
 */
import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from '@/lib/auth-helpers';
import { listPendingApprovals } from '@/lib/agent/approvals/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userId = await resolveUserId();
    const threadId = req.nextUrl.searchParams.get('threadId') ?? undefined;
    const approvals = await listPendingApprovals(userId, threadId || undefined);
    return NextResponse.json(
      { approvals },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list approvals' },
      { status: 500 },
    );
  }
}
