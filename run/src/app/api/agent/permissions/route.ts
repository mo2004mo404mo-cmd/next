/**
 * Tool permissions API — the conditional-HITL surface (interruptOn parity).
 *
 * GET /api/agent/permissions  — the user's agent tool catalog with each tool's
 *                               default gating + their saved setting
 * PUT /api/agent/permissions  — set one tool's effect:
 *                               'default' (clear) | 'allow' (never ask) |
 *                               'ask' (always confirm)
 *
 * The catalog is built from the REAL chat registry (buildChatAgentTools with a
 * viewer context) so it can never drift from what the agent actually runs.
 */
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audit } from '@/lib/agent/audit';
import { createMultimodalTools } from '@/lib/agent/deep-agent-tools';
import { resolveMedQAgentConfig } from '@/lib/agent/deep-agent-runtime';
import { buildChatAgentTools } from '@/lib/agent/tools/chat-registry';
import { capabilitySpecFor, savePermissionSetting, clearPermissionSetting } from '@/lib/agent/approvals/service';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  // Build the REAL tool set for this user (single source of truth — the same
  // builder the runtime uses). Construction is stateless and cheap.
  const tools = buildChatAgentTools({
    ctx: { userId, threadId: undefined },
    userId,
    multimodalTools: createMultimodalTools(resolveMedQAgentConfig),
  });

  const settings = await db.agentPermissionSetting.findMany({
    where: { userId },
    select: { capability: true, effect: true },
  });
  const byCapability = new Map(settings.map((row) => [row.capability, row.effect]));

  const catalog = tools.map((tool) => {
    const spec = capabilitySpecFor(tool.name);
    const capability = spec?.capability ?? `tool.${tool.name}`;
    const saved = byCapability.get(capability) ?? byCapability.get(`tool.${tool.name}`);
    return {
      tool: tool.name,
      label: spec?.label ?? tool.name,
      capability,
      gatedByDefault: !!spec,
      // effect: 'default' | 'allow' | 'ask' — for gated tools, an 'allow'
      // setting means "don't ask"; for ungated ones, 'ask' means "always ask".
      effect: saved ?? 'default',
    };
  });

  return NextResponse.json({ tools: catalog });
});

export const PUT = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const body = await req.json().catch(() => ({})) as {
    tool?: unknown;
    effect?: unknown;
  };
  const tool = typeof body.tool === 'string' ? body.tool : '';
  const effect = body.effect;
  if (!tool || tool.length > 120) return badRequest('tool is required');
  if (effect !== 'default' && effect !== 'allow' && effect !== 'ask') {
    return badRequest('effect must be default | allow | ask');
  }

  // Resolve the capability the setting attaches to: the tool's real spec
  // (gated tools) or the per-tool ask key (ungated tools).
  const spec = capabilitySpecFor(tool);
  if (spec && effect === 'ask') {
    // Gated tool — it already asks by default; "ask" is the same as default.
    await clearPermissionSetting(userId, spec.capability);
    await clearPermissionSetting(userId, `tool.${tool}`);
  } else if (spec && effect === 'allow') {
    await savePermissionSetting(userId, spec.capability, 'allow');
    await clearPermissionSetting(userId, `tool.${tool}`);
  } else if (!spec && effect === 'allow') {
    // Ungated by default; "allow" == default — nothing to store.
    await clearPermissionSetting(userId, `tool.${tool}`);
  } else if (!spec && effect === 'ask') {
    await savePermissionSetting(userId, `tool.${tool}`, 'ask');
  } else {
    // default → clear everything for this tool.
    if (spec) await clearPermissionSetting(userId, spec.capability);
    await clearPermissionSetting(userId, `tool.${tool}`);
  }

  await audit({ userId, action: 'permission.set', target: tool, detail: { effect } });
  return NextResponse.json({ ok: true, tool, effect });
});
