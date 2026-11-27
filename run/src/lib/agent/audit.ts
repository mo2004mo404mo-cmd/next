import { db } from '../db';
import { createLogger } from '../logger';

const log = createLogger('AgentAudit');

/**
 * Agent audit log — append-only record of security-relevant agent actions.
 * Ported from hermes `lib/audit.ts` (never-throw contract: audit failures are
 * logged to stderr but never break the audited operation).
 *
 * Actions follow the hermes taxonomy, adapted to MedQ's surface:
 *   tool.execute / tool.denied / approval.request / approval.decide /
 *   schedule.create / schedule.control / job.control / mcp.test /
 *   integration.save / memory.delete / feedback.record / voice.use
 */

export type AgentAuditAction =
  | 'tool.execute'
  | 'tool.denied'
  | 'approval.request'
  | 'approval.decide'
  | 'schedule.create'
  | 'schedule.control'
  | 'job.control'
  | 'mcp.test'
  | 'integration.save'
  | 'memory.delete'
  | 'feedback.record'
  | 'voice.use';

export interface AuditParams {
  userId?: string | null;
  action: AgentAuditAction | string;
  target?: string;
  detail?: Record<string, unknown>;
}

/** Append one audit row. NEVER throws — audit must not break the caller. */
export async function audit({ userId, action, target, detail }: AuditParams): Promise<void> {
  try {
    await db.agentAuditLog.create({
      data: {
        userId: userId ?? undefined,
        action,
        target: target?.slice(0, 200),
        detailJson: detail ? JSON.stringify(detail).slice(0, 4000) : undefined,
      },
    });
  } catch (error) {
    // Append-only telemetry: swallow and log so the audited operation proceeds.
    log.warn?.(`audit write failed (${action}):`, error);
  }
}

/** Recent audit rows for a user (settings/usage UI). */
export async function listAuditTrail(userId: string, limit = 50) {
  return db.agentAuditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
