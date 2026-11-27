import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { badRequest, notFound } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/admin/audit-log";

/**
 * PATCH /api/admin/reports/[id]
 * Body: { status: "reviewed" | "resolved", resolution?: string }
 *
 * Updates the status of a single report. Optionally stores a resolution note
 * on the audit log (not on the report itself — the QuestionReport model has no
 * `resolution` column, so we keep it in the audit trail).
 *
 * DELETE /api/admin/reports/[id]
 * Hard-deletes the report (use sparingly — prefer PATCH to resolved).
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 * - `const admin = await requireAdmin() as any` replaced with `ctx.userId` from the wrapper context
 * - 400/404 boilerplate replaced with badRequest()/notFound() helpers
 */
export const PATCH = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;
    const body = await request.json();
    const { status, resolution } = body as { status?: string; resolution?: string };

    const valid = ["reviewed", "resolved"];
    if (!status || !valid.includes(status)) {
      return badRequest(`Invalid status. Must be one of: ${valid.join(", ")}`);
    }

    const existing = await db.questionReport.findUnique({ where: { id } });
    if (!existing) return notFound("Report not found");

    const updated = await db.questionReport.update({
      where: { id },
      data: { status },
    });

    await writeAuditLog({
      actorId: ctx.userId,
      action: "report.resolve",
      targetType: "report",
      targetId: id,
      metadata: {
        previousStatus: existing.status,
        newStatus: status,
        questionId: existing.questionId,
        reason: existing.reason,
        resolution: resolution ?? null,
      },
      ipAddress: request.headers.get("x-forwarded-for") ?? "",
    });

    return NextResponse.json({ report: updated });
  },
  { requiredRole: "admin" }
);

export const DELETE = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;

    const existing = await db.questionReport.findUnique({ where: { id } });
    if (!existing) return notFound("Report not found");

    await db.questionReport.delete({ where: { id } });

    await writeAuditLog({
      actorId: ctx.userId,
      action: "report.delete",
      targetType: "report",
      targetId: id,
      metadata: {
        questionId: existing.questionId,
        reason: existing.reason,
      },
      ipAddress: request.headers.get("x-forwarded-for") ?? "",
    });

    return NextResponse.json({ deleted: true, id });
  },
  { requiredRole: "admin" }
);
