/**
 * Human-in-the-loop approvals — the engine behind the assistant's approval
 * cards.
 *
 * Design (single-process deployment):
 *   1. Tools registered in TOOL_CAPABILITIES are wrapped by withApprovalGate.
 *   2. Before the wrapped tool executes, the gate:
 *        - skips entirely when MEDQ_AGENT_HITL=off (kill switch) or the run
 *          has no user identity;
 *        - skips when the user saved an "always allow" AgentPermissionSetting
 *          for the capability ("Don't ask again" on the approval card);
 *        - otherwise creates a pending AgentApproval row, publishes the
 *          request on the in-process bus (the deep-agent runtime subscribes
 *          and forwards it to the SSE client as an `approval_required` event)
 *          and BLOCKS the tool execution until a decision arrives, the
 *          5-minute timeout expires (auto-reject), or the request aborts.
 *   3. POST /api/agent/approvals/[id] resolves the pending promise; the tool
 *      then runs (approve) or returns an honest rejection payload (reject).
 *      The decision + optional "remember" setting are persisted and audited.
 *
 * Why a synchronous wait instead of a graph interrupt/checkpoint resume: the
 * deepagents runtime here streams a fresh graph per turn; parking the tool
 * call inside the tool itself keeps HITL working with zero changes to the
 * graph topology, survives SSE reconnects (the wait lives server-side), and
 * still honors the client disconnect (abort signal rejects the wait so the
 * graph does not linger). A page refresh mid-wait is fully recoverable: the
 * AgentApproval row is in the DB, the client re-fetches pending approvals on
 * panel open, and deciding resumes the parked run — the finished answer is
 * then picked up by the thread's pending-reply monitor.
 */
import { db } from '../../db';
import { audit } from '../audit';
import type { ApprovalWirePayload } from '../types';
import { DynamicStructuredTool } from '@langchain/core/tools';

/** Decision delivered by the user (or the timeout) to a pending approval.
 *
 *  modifiedArgs: when the user EDITED the tool arguments on the approval
 *  card before approving, the replacement argument object — the gated tool
 *  then executes with these instead of the model's original args. */
export type ApprovalDecision =
  | { outcome: 'approved'; modifiedArgs?: Record<string, unknown> }
  | { outcome: 'rejected'; reason?: string };

/** How long a pending approval waits before auto-rejecting. */
export const APPROVAL_TIMEOUT_MS = 5 * 60_000;

/** Env kill switch — set MEDQ_AGENT_HITL=off to disable all gating. */
export function hitlEnabled(): boolean {
  const flag = (process.env.MEDQ_AGENT_HITL ?? 'on').trim().toLowerCase();
  return flag !== 'off' && flag !== 'false' && flag !== '0';
}

/** One gated tool: which capability it exercises + what to show the user. */
export interface ToolCapabilitySpec {
  capability: string;
  /** Human label for the approval card title, e.g. "Generate questions". */
  label: string;
  /** One-line explanation of why this action is gated. */
  rationale: string;
  /** Extra arg fields worth surfacing on the card (capped, stringified). */
  summarizeArgs?: (args: Record<string, unknown>) => Array<{ label: string; value: string }>;
  /** Arg-based pass-through (2026-10-25): return true to SKIP the approval
   *  card for this specific invocation. Used where a tool mixes routine,
   *  user-requested, fully reversible actions with genuinely destructive
   *  ones (manage_skills: create/improve flow freely, delete still gates).
   *  Evaluated AFTER the persisted allow/ask settings, so a user's explicit
   *  "ask" override (`tool.<name>` = ask) always keeps the card. */
  skipGate?: (args: Record<string, unknown>) => boolean;
}

function brief(value: unknown, max = 90): string {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/**
 * The gated tool catalog. Consequential / costly / persistent-side-effect
 * tools ask first; read-only tools (search, memory read, knowledge retrieve)
 * never gate. Defaults chosen so the assistant stays fluid for chat but
 * pauses before writing to the bank, scheduling automation, or spending
 * media-generation quota.
 */
export const TOOL_CAPABILITIES: Record<string, ToolCapabilitySpec> = {
  run_question_generation_agent: {
    capability: 'questions.generate',
    label: 'Generate & save questions',
    rationale: 'Runs the full generation pipeline and saves new questions to your question bank.',
    summarizeArgs: (a) => [
      { label: 'Topic', value: brief(a.topic ?? a.subject) },
      { label: 'Count', value: brief(a.count ?? '') },
    ],
  },
  save_question: {
    capability: 'bank.write',
    label: 'Save a question to the bank',
    rationale: 'Writes a new question into your question bank.',
    summarizeArgs: (a) => [{ label: 'Question', value: brief(a.text) }],
  },
  schedule_task: {
    capability: 'schedule.create',
    label: 'Schedule an agent job',
    rationale: 'Creates an automation that runs agent prompts on your account — even when this tab is closed.',
    summarizeArgs: (a) => [
      { label: 'Name', value: brief(a.name) },
      { label: 'Prompt', value: brief(a.prompt) },
      { label: 'Schedule', value: brief(a.cron ?? a.runAt ?? '') },
    ],
  },
  add_knowledge: {
    capability: 'knowledge.write',
    label: 'Add to knowledge library',
    rationale: 'Ingests new content into your RAG knowledge library.',
    summarizeArgs: (a) => [{ label: 'Source', value: brief(a.title ?? a.url ?? a.content) }],
  },
  generate_medical_illustration: {
    capability: 'media.image',
    label: 'Generate an image',
    rationale: 'Generates a new medical illustration (uses image-generation quota).',
    summarizeArgs: (a) => [{ label: 'Prompt', value: brief(a.prompt) }],
  },
  edit_medical_illustration: {
    capability: 'media.image_edit',
    label: 'Edit an image',
    rationale: 'Edits an existing image with the image-editing model (uses quota).',
    summarizeArgs: (a) => [{ label: 'Prompt', value: brief(a.prompt ?? a.instruction) }],
  },
  synthesize_speech: {
    capability: 'media.audio',
    label: 'Synthesize speech',
    rationale: 'Generates spoken audio (uses TTS quota).',
    summarizeArgs: (a) => [{ label: 'Text', value: brief(a.text) }],
  },
  generate_medical_video: {
    capability: 'media.video',
    label: 'Generate a video',
    rationale: 'Generates a video clip (the most costly media action).',
    summarizeArgs: (a) => [{ label: 'Prompt', value: brief(a.prompt) }],
  },
  // ── Newly registered tools (audit sprint — previously dead code) ──
  manage_skills: {
    capability: 'skill.write',
    label: 'Manage skills',
    rationale: 'Creates, improves or deletes reusable skills in your personal skill library (improvements keep restorable history).',
    summarizeArgs: (a) => [
      { label: 'Action', value: brief(a.action) },
      { label: 'Name', value: brief(a.name) },
      ...(a.findings ? [{ label: 'Findings', value: brief(a.findings) }] : []),
    ],
    // create/improve pass straight through (2026-10-25): the learner asked
    // for the skill in this very turn, the write lands in their OWN library,
    // and every improve keeps a restorable revision — an approval card adds
    // zero safety while its 5-minute timeout was killing real workflows
    // (observed live: four consecutive skill creations auto-rejected while
    // the learner watched "working…"). Only DELETE still gates: it removes
    // the pack (and its workspace files) outright.
    skipGate: (a) => a.action === 'create' || a.action === 'improve',
  },
  run_code: {
    capability: 'code.run',
    label: 'Run code',
    rationale: 'Executes sandboxed code (JavaScript VM, or Python/Bash inside your workspace).',
    summarizeArgs: (a) => [
      { label: 'Language', value: brief(a.language ?? 'javascript') },
      { label: 'Purpose', value: brief(a.purpose) },
    ],
  },
  // The QuickJS interpreter's eval tool (docs' interpreters pattern) — same
  // capability as run_code: both execute model-authored JavaScript.
  eval: {
    capability: 'code.run',
    label: 'Run JavaScript in the interpreter',
    rationale: 'Executes model-written JavaScript in an isolated QuickJS interpreter to compute or transform data.',
    summarizeArgs: (a) => [
      { label: 'Code', value: brief(String(a.code ?? '').split('\n').slice(0, 3).join(' ').slice(0, 140)) },
    ],
  },
  browser_snapshot: {
    capability: 'web.browser',
    label: 'Open a page in the browser sandbox',
    rationale: 'Loads a web page in the sandboxed browser to read its content.',
    summarizeArgs: (a) => [{ label: 'URL', value: brief(a.url) }],
  },
  browser_interact: {
    capability: 'web.browser',
    label: 'Interact with a page in the browser sandbox',
    rationale: 'Clicks, types or scrolls inside the sandboxed browser page.',
    summarizeArgs: (a) => [{ label: 'Action', value: brief(a.action) }],
  },
  git_commit: {
    capability: 'workspace.git',
    label: 'Commit to the workspace repository',
    rationale: 'Records changes in your workspace git repository.',
    summarizeArgs: (a) => [{ label: 'Message', value: brief(a.message) }],
  },
  git_push: {
    capability: 'workspace.git',
    label: 'Push the workspace repository',
    rationale: 'Pushes your workspace git repository to its configured remote.',
    summarizeArgs: () => [],
  },
  git_pull: {
    capability: 'workspace.git',
    label: 'Pull into the workspace repository',
    rationale: 'Pulls remote changes into your workspace git repository.',
    summarizeArgs: () => [],
  },
  task_create: {
    capability: 'tasks.write',
    label: 'Create a task',
    rationale: 'Adds a task to your visible task list.',
    summarizeArgs: (a) => [{ label: 'Title', value: brief(a.title) }],
  },
  task_update: {
    capability: 'tasks.write',
    label: 'Update a task',
    rationale: 'Changes the status or priority of a task on your list.',
    summarizeArgs: (a) => [{ label: 'Task', value: brief(a.taskId) }],
  },
  start_background_task: {
    capability: 'async.create',
    label: 'Launch a background task',
    rationale: 'Starts a detached background agent run on your account (uses agent quota; you are notified when it finishes).',
    summarizeArgs: (a) => [{ label: 'Task', value: brief(a.description) }],
  },
  // ── Messaging (Messages-tab bridge) — sending anything to other humans
  //    always asks first ──
  send_chat_message: {
    capability: 'chat.send',
    label: 'Send a chat message',
    rationale: 'Sends a message to one of your chat rooms on your behalf — other members will see it as coming from you.',
    summarizeArgs: (a) => [
      { label: 'Room', value: brief(a.roomId) },
      { label: 'Message', value: brief(a.content, 160) },
    ],
  },
  start_direct_message: {
    capability: 'chat.send',
    label: 'Start a direct message',
    rationale: 'Opens (or reuses) a direct-message room with another user and can send the first message as you.',
    summarizeArgs: (a) => [
      { label: 'To', value: brief(a.targetUserName) },
      { label: 'Message', value: brief(a.content, 160) },
    ],
  },
  create_chat_group: {
    capability: 'chat.group_create',
    label: 'Create a group chat',
    rationale: 'Creates a new group chat in your Messages tab with you as admin and adds the named members.',
    summarizeArgs: (a) => [
      { label: 'Group', value: brief(a.name) },
      { label: 'Members', value: brief(Array.isArray(a.memberNames) ? a.memberNames.join(', ') : a.memberNames) },
    ],
  },
  send_push_notification: {
    capability: 'notify.push',
    label: 'Send a push notification',
    rationale: 'Pushes a notification to your subscribed devices (visible even when MedQ is closed) and adds it to your bell.',
    summarizeArgs: (a) => [
      { label: 'Title', value: brief(a.title) },
      { label: 'Body', value: brief(a.body) },
    ],
  },
};

/**
 * Dynamic capability spec for MCP tools. Wired tools are named
 * `mcp__<server>__<tool>` (slugified) by the MCP loader — the spec is derived
 * from the name so every MCP tool is gated by default (external systems).
 */
export function mcpCapabilitySpec(toolName: string): ToolCapabilitySpec | null {
  if (!toolName.startsWith('mcp__')) return null;
  const parts = toolName.split('__');
  const server = parts[1] || 'server';
  const tool = parts.slice(2).join('__') || 'tool';
  return {
    capability: `mcp.${server}.${tool}`,
    label: `Run MCP tool “${tool}” (${server})`,
    rationale: `Calls the external “${tool}” tool exposed by your configured MCP server “${server}”.`,
    summarizeArgs: (a) => [{ label: 'Args', value: brief(a) }],
  };
}

/**
 * Resolve the capability spec for a tool name: the static catalog first, then
 * the dynamic MCP derivation. Exported for the permissions UI route.
 */
export function capabilitySpecFor(toolName: string): ToolCapabilitySpec | null {
  return TOOL_CAPABILITIES[toolName] ?? mcpCapabilitySpec(toolName) ?? null;
}

// ── In-process pending registry + event bus ─────────────────────────────────

interface PendingApproval {
  approvalId: string;
  userId: string;
  threadId: string;
  tool: string;
  capability: string;
  resolve: (decision: ApprovalDecision) => void;
  settled: boolean;
  createdAt: number;
}

const globalForApprovals = globalThis as typeof globalThis & {
  __medqPendingApprovals?: Map<string, PendingApproval>;
  __medqApprovalListeners?: Set<(payload: ApprovalWirePayload) => void>;
};

/** Survives HMR / route-module re-instantiation in dev; single map in prod. */
const pendingApprovals: Map<string, PendingApproval> =
  globalForApprovals.__medqPendingApprovals ?? new Map();
globalForApprovals.__medqPendingApprovals = pendingApprovals;

const approvalListeners: Set<(payload: ApprovalWirePayload) => void> =
  globalForApprovals.__medqApprovalListeners ?? new Set();
globalForApprovals.__medqApprovalListeners = approvalListeners;

/** Subscribe to new approval requests (the runtime forwards them to SSE). */
export function subscribeApprovalRequests(
  listener: (payload: ApprovalWirePayload) => void,
): () => void {
  approvalListeners.add(listener);
  return () => approvalListeners.delete(listener);
}

/** True when a pending (unsettled, unexpired) approval exists for this id. */
function isLive(entry: PendingApproval | undefined): boolean {
  return !!entry && !entry.settled && Date.now() - entry.createdAt < APPROVAL_TIMEOUT_MS;
}

/** Pending approvals for a user (optionally scoped to a thread) — refresh restore. */
export async function listPendingApprovals(
  userId: string,
  threadId?: string,
): Promise<ApprovalWirePayload[]> {
  // In-process live entries first (the SSE wire may be gone, the wait is not).
  const live: ApprovalWirePayload[] = [];
  for (const entry of pendingApprovals.values()) {
    if (!isLive(entry) || entry.userId !== userId) continue;
    if (threadId && entry.threadId !== threadId) continue;
    live.push({
      approvalId: entry.approvalId,
      threadId: entry.threadId,
      tool: entry.tool,
      capability: entry.capability,
      args: {},
      description: TOOL_CAPABILITIES[entry.tool]?.label ?? entry.capability,
    });
  }
  if (live.length > 0) return live;
  // Fallback: DB rows still pending but not in this process (server restarted
  // mid-wait). These can no longer be resumed — the run died with the process —
  // so they are surfaced for honest UI; deciding marks them superseded.
  try {
    const rows = await db.agentApproval.findMany({
      where: {
        userId,
        status: 'pending',
        // Rows older than the gate timeout can never be resumed — the
        // in-process wait died with its run (or a restart) long ago. Showing
        // them as decidable cards would only confuse the learner.
        createdAt: { gte: new Date(Date.now() - APPROVAL_TIMEOUT_MS - 60_000) },
        ...(threadId ? { threadId } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return rows.map((row) => ({
      approvalId: row.id,
      threadId: row.threadId,
      tool: row.toolName,
      capability: row.capability,
      args: safeParse(row.argsJson),
      description: row.description ?? undefined,
    }));
  } catch {
    return live;
  }
}

function safeParse(raw: string): unknown {
  try { return JSON.parse(raw); } catch { return {}; }
}

/** Resolve a pending approval. Returns the outcome for the API to report. */
export async function decideApproval(params: {
  approvalId: string;
  userId: string;
  approved: boolean;
  /** "allow" persists an AgentPermissionSetting so this capability never asks again. */
  remember?: 'allow' | null;
  /** User-edited replacement arguments (approved turns only) — applied by
   *  the gate when the parked tool executes. Plain object, else ignored. */
  modifiedArgs?: Record<string, unknown> | null;
}): Promise<{ ok: true; status: 'decided' } | { ok: false; error: string; status: number }> {
  const { approvalId, userId, approved } = params;
  const modifiedArgs =
    params.modifiedArgs && typeof params.modifiedArgs === 'object' && !Array.isArray(params.modifiedArgs)
      ? params.modifiedArgs
      : null;

  const entry = pendingApprovals.get(approvalId);
  if (entry && isLive(entry)) {
    if (entry.userId !== userId) {
      return { ok: false, error: 'Not your approval request', status: 403 };
    }
    // entry.resolve owns the settled flag (its guard makes resolution
    // idempotent) — setting it here first would swallow the decision.
    pendingApprovals.delete(approvalId);
    entry.resolve({
      outcome: approved ? 'approved' : 'rejected',
      ...(approved && modifiedArgs ? { modifiedArgs } : {}),
    });
    await persistDecision(approvalId, approved);
    if (params.remember === 'allow' && approved) {
      await savePermissionSetting(userId, entry.capability, 'allow');
    }
    await audit({
      userId,
      action: 'approval.decide',
      target: entry.tool,
      detail: { approvalId, approved, remember: params.remember ?? null },
    });
    return { ok: true, status: 'decided' };
  }

  // Not live in this process: check the DB (server restarted, or timed out).
  try {
    const row = await db.agentApproval.findUnique({ where: { id: approvalId } });
    if (!row || row.userId !== userId) {
      return { ok: false, error: 'Approval request not found', status: 404 };
    }
    if (row.status === 'pending') {
      // Row pending but no live wait — the parked run is gone. Record the
      // decision for the audit trail and tell the user honestly.
      await db.agentApproval.update({
        where: { id: approvalId },
        data: { status: 'superseded', decidedAt: new Date() },
      });
      await audit({ userId, action: 'approval.decide', target: row.toolName, detail: { approvalId, approved, superseded: true } });
      return { ok: true, status: 'decided' };
    }
    return { ok: false, error: `Already ${row.status}`, status: 409 };
  } catch {
    return { ok: false, error: 'Could not record the decision', status: 500 };
  }
}

async function persistDecision(approvalId: string, approved: boolean): Promise<void> {
  try {
    await db.agentApproval.update({
      where: { id: approvalId },
      data: { status: approved ? 'approved' : 'rejected', decidedAt: new Date() },
    });
  } catch { /* best-effort */ }
}

/** Persist (or clear) a per-capability permission setting. */
export async function savePermissionSetting(
  userId: string,
  capability: string,
  effect: 'allow' | 'ask',
): Promise<void> {
  try {
    await db.agentPermissionSetting.upsert({
      where: { userId_capability: { userId, capability } },
      create: { userId, capability, effect },
      update: { effect },
    });
  } catch { /* best-effort */ }
}

/** Remove a per-capability setting (back to the default policy). */
export async function clearPermissionSetting(userId: string, capability: string): Promise<void> {
  try {
    await db.agentPermissionSetting.deleteMany({ where: { userId, capability } });
  } catch { /* best-effort */ }
}

/** All settings for a user, capability → effect. Read by the gate each call. */
export async function loadPermissionSettings(userId: string): Promise<Map<string, 'allow' | 'ask'>> {
  const map = new Map<string, 'allow' | 'ask'>();
  try {
    const rows = await db.agentPermissionSetting.findMany({
      where: { userId },
      select: { capability: true, effect: true },
    });
    for (const row of rows) {
      if (row.effect === 'allow' || row.effect === 'ask') map.set(row.capability, row.effect);
    }
  } catch { /* best-effort */ }
  return map;
}

/** All "allow" settings for a user — read by the gate before asking. */
export async function loadAllowedCapabilities(userId: string): Promise<Set<string>> {
  const settings = await loadPermissionSettings(userId);
  return new Set([...settings.entries()].filter(([, effect]) => effect === 'allow').map(([cap]) => cap));
}

// ── The gate ────────────────────────────────────────────────────────────────

export interface ApprovalGateContext {
  userId?: string | null;
  threadId?: string;
  signal?: AbortSignal;
  /** 'off' disables the gate for this run entirely — used by autonomous
   *  executions (scheduled / background jobs) that have no human watching
   *  and whose SCHEDULING was itself approved at creation time. Without
   *  this, every gated tool in a job waits the full 5-minute timeout and
   *  auto-rejects, failing the job (observed: 11 failed scheduled-task
   *  jobs looping on exactly this). */
  hitl?: 'on' | 'off';
}

/**
 * Wrap a DynamicStructuredTool with the HITL gate. The wrapper is a no-op
 * passthrough when HITL is disabled, the user is unknown, or the user has
 * allowed the capability. The wait races the decision against the timeout
 * and the abort signal so a disconnected client never parks the graph
 * forever.
 */
export function withApprovalGate<T extends DynamicStructuredTool<any, any, any, any, any, string>>(
  tool: T,
  gateCtx: ApprovalGateContext,
): T {
  const spec = capabilitySpecFor(tool.name);
  // interruptOn-style conditional HITL: a per-user "ask" setting on
  // `tool.<name>` gates ANY tool, even ones outside the default catalog
  // (the docs' interruptOn tool map — MedQ-native, DB-configurable).
  const askCapability = `tool.${tool.name}`;
  if (!spec && process.env.MEDQ_AGENT_HITL === 'off') return tool; // nothing can gate it

  const original = tool.func;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- preserves the caller's tool generics
  return new DynamicStructuredTool({
    name: tool.name,
    description: tool.description,
    schema: tool.schema,
    func: async (input: never) => {
      if (!hitlEnabled() || !gateCtx.userId || gateCtx.hitl === 'off') {
        return original(input as never);
      }

      // One read per tool call keeps the gate correct even when the user
      // changes settings mid-run. Covers both "allow" (never ask again) and
      // "ask" (always confirm — the conditional HITL override).
      const settings = await loadPermissionSettings(gateCtx.userId);
      const forcedAsk = settings.get(askCapability) === 'ask';
      if (!spec && !forcedAsk) {
        return original(input as never); // ungated by default and no override
      }
      if (!forcedAsk && spec && settings.get(spec.capability) === 'allow') {
        return original(input as never);
      }

      // Arg-based pass-through: this specific invocation is routine and
      // reversible (e.g. manage_skills create/improve). Never bypasses a
      // user-forced "ask" — that override is checked above and wins.
      const gateArgs = (input ?? {}) as Record<string, unknown>;
      if (!forcedAsk && spec?.skipGate?.(gateArgs)) {
        return original(input as never);
      }

      // Effective spec for the approval card: the static/dynamic one, or a
      // generic spec when the ONLY reason we're gating is the "ask" override.
      const effectiveSpec: ToolCapabilitySpec = spec ?? {
        capability: askCapability,
        label: `Run ${tool.name}`,
        rationale: 'You asked to confirm every run of this tool.',
        summarizeArgs: (a) => [{ label: 'Args', value: brief(a) }],
      };

      const args = (input ?? {}) as Record<string, unknown>;
      const details = effectiveSpec.summarizeArgs?.(args) ?? [];
      const description = [
        effectiveSpec.rationale,
        details.length > 0 ? ` ${details.map((d) => `${d.label}: ${d.value}`).join(' · ')}` : '',
      ].join('');

      const approvalId = crypto.randomUUID();
      const payload: ApprovalWirePayload = {
        approvalId,
        threadId: gateCtx.threadId ?? '',
        tool: tool.name,
        capability: effectiveSpec.capability,
        args,
        description: effectiveSpec.label,
      };

      // Persist the request row (survives refresh — the client re-fetches
      // pending approvals on panel open) and publish on the bus (the runtime
      // forwards to the live SSE stream).
      try {
        await db.agentApproval.create({
          data: {
            id: approvalId,
            userId: gateCtx.userId,
            threadId: gateCtx.threadId ?? '',
            toolName: tool.name,
            capability: effectiveSpec.capability,
            argsJson: JSON.stringify(args).slice(0, 8000),
            description: description.slice(0, 500),
            status: 'pending',
          },
        });
      } catch { /* best-effort — the in-process wait still works */ }
      void audit({ userId: gateCtx.userId, action: 'approval.request', target: tool.name, detail: { approvalId, capability: effectiveSpec.capability } });

      const decision = await new Promise<ApprovalDecision>((resolve) => {
        const entry: PendingApproval = {
          approvalId,
          userId: gateCtx.userId as string,
          threadId: gateCtx.threadId ?? '',
          tool: tool.name,
          capability: effectiveSpec.capability,
          resolve: (d) => {
            if (entry.settled) return;
            entry.settled = true;
            clearTimeout(timer);
            if (gateCtx.signal) gateCtx.signal.removeEventListener('abort', onAbortFn);
            pendingApprovals.delete(approvalId);
            resolve(d);
          },
          settled: false,
          createdAt: Date.now(),
        };
        pendingApprovals.set(approvalId, entry);
        for (const listener of approvalListeners) {
          try {
            console.info(`[MedQ Agent] [APPROVAL-BUS] gate publishing ${tool.name} (${approvalId.slice(0, 8)}) to ${approvalListeners.size} listener(s)`);
            listener(payload);
          } catch { /* listener errors must not break the wait */ }
        }

        const timer = setTimeout(
          () => {
            // Keep the DB row honest — a timed-out wait must not linger as
            // 'pending' (the refresh-restore list would surface it as
            // decidable long after the run already moved on).
            void db.agentApproval.update({
              where: { id: approvalId },
              data: { status: 'rejected', decidedAt: new Date() },
            }).catch(() => { /* best-effort */ });
            entry.resolve({ outcome: 'rejected', reason: 'Timed out waiting for approval (5 minutes).' });
          },
          APPROVAL_TIMEOUT_MS,
        );
        const onAbortFn = () => {
          // Client disconnected (refresh/close): the wait releases so the
          // graph finishes and persists its answer, but the DB row must not
          // linger as 'pending' (the refresh-restore list would surface a
          // dead approval as decidable).
          void db.agentApproval.update({
            where: { id: approvalId },
            data: { status: 'rejected', decidedAt: new Date() },
          }).catch(() => { /* best-effort */ });
          entry.resolve({ outcome: 'rejected', reason: 'The request was cancelled.' });
        };
        if (gateCtx.signal) {
          if (gateCtx.signal.aborted) onAbortFn();
          else gateCtx.signal.addEventListener('abort', onAbortFn, { once: true });
        }
      });

      if (decision.outcome === 'approved') {
        // Arg editing: when the user modified the arguments on the approval
        // card, run the tool with THOSE instead of the model's originals.
        // The replacement is audited and lightly validated (plain object);
        // tools' own internal guards still apply on execution.
        const modified = decision.modifiedArgs;
        if (modified && typeof modified === 'object') {
          void audit({
            userId: gateCtx.userId,
            action: 'approval.args_edited',
            target: tool.name,
            detail: { approvalId, keys: Object.keys(modified) },
          });
          return original(modified as never);
        }
        return original(input as never);
      }
      // Honest rejection payload — the model reads it and adapts (skips the
      // action, tells the user why) instead of hallucinating success.
      return JSON.stringify({
        approved: false,
        reason: decision.reason ?? 'The user declined this action.',
        note: 'Do not retry this tool call in this turn. Acknowledge the decision to the user and continue without performing the action.',
      });
    },
  }) as unknown as T;
}
