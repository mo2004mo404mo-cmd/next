/**
 * POST /api/agent/approvals/[id] — deliver a HITL decision.
 *
 * Body: { approved: boolean, remember?: 'allow' | null, args?: object }
 *
 * Resolves the in-process pending wait (the parked tool call then executes
 * or returns an honest rejection to the model). `remember: 'allow'` persists
 * an AgentPermissionSetting so the capability stops asking (the approval
 * card's "Don't ask again" checkbox). `args` (approved only) replaces the
 * tool's arguments with the user's edited version — the approval card's
 * argument editor.
 *
 * Works after a page refresh: the wait lives in the server process, not the
 * SSE connection. If the wait is gone (server restarted / timed out), the
 * decision is still recorded on the AgentApproval row for the audit trail.
 */
import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { decideApproval } from '@/lib/agent/approvals/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !/^[a-zA-Z0-9-]{8,64}$/.test(id)) {
    return badRequest('Invalid approval id');
  }

  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as {
    approved?: unknown;
    remember?: unknown;
    args?: unknown;
  };
  if (typeof body.approved !== 'boolean') {
    return badRequest('approved must be a boolean');
  }
  const remember = body.remember === 'allow' ? ('allow' as const) : null;
  // Edited arguments (approve-with-changes). Accepted only as a plain JSON
  // object; anything else is ignored and the original args run.
  const modifiedArgs =
    body.args && typeof body.args === 'object' && !Array.isArray(body.args)
      ? (body.args as Record<string, unknown>)
      : null;

  const result = await decideApproval({
    approvalId: id,
    userId,
    approved: body.approved,
    remember,
    modifiedArgs,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ decided: true, approved: body.approved });
}
