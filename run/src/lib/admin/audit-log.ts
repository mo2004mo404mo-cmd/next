import { db } from "@/lib/db";

/**
 * Admin audit logging.
 *
 * Reconstructed from its call sites (the original file was missing from the
 * project archive). Writes an immutable AuditLog row describing an admin
 * action (ban/suspend/reset-password/report-resolution…). The Prisma model
 * is `AuditLog` (prisma/schema.prisma).
 *
 * Never throws: a logging failure must not break the admin action itself —
 * the caller already committed the mutation by the time it logs.
 */

export interface AuditLogEntry {
  /** Admin user performing the action. */
  actorId: string;
  /** Dot-namespaced action, e.g. "user.ban", "report.resolve". */
  action: string;
  /** user | report | setting | ad | model | revenue */
  targetType: string;
  /** Id of the entity the action was performed on. */
  targetId: string;
  /** Action-specific payload — stored as a JSON blob. */
  metadata: Record<string, unknown>;
  /** Client IP from x-forwarded-for, when available. */
  ipAddress?: string;
}

export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        actorId: entry.actorId,
        action: entry.action,
        targetType: entry.targetType || "user",
        targetId: entry.targetId || "",
        metadata: JSON.stringify(entry.metadata ?? {}),
        ipAddress: entry.ipAddress || "",
      },
    });
  } catch (err) {
    console.error("[audit-log] Failed to write audit entry:", err);
  }
}
