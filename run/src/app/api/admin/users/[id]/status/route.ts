import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { badRequest, notFound } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/admin/audit-log";

/**
 * PUT /api/admin/users/[id]/status
 * Body: { status: "active" | "suspended" | "banned", reason?: string, durationHours?: number }
 *
 * - "active": clears all moderation fields, reinstates the user.
 * - "suspended": temporary lock; `durationHours` controls expiry. If omitted,
 *   suspension is indefinite until manually lifted.
 * - "banned": permanent lock; sets `bannedAt`.
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 * - `const admin = await requireAdmin() as any` replaced with `ctx.userId` from the wrapper context
 * - 400/404 boilerplate replaced with badRequest()/notFound() helpers
 */
export const PUT = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;
    const body = await request.json();
    const { status, reason, durationHours } = body as {
      status?: string;
      reason?: string;
      durationHours?: number;
    };

    const validStatuses = ["active", "suspended", "banned"];
    if (!status || !validStatuses.includes(status)) {
      return badRequest(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return notFound("User not found");

    // Prevent self-suspend/ban to avoid locking oneself out.
    if (existing.id === ctx.userId && status !== "active") {
      return badRequest("Cannot suspend or ban your own account");
    }

    // Prevent acting on other admins (defensive — super-admin could be added later).
    if (existing.role === "admin" && status !== "active") {
      return badRequest("Cannot suspend or ban another admin");
    }

    let updateData: any;
    let actionLabel: string;

    if (status === "active") {
      updateData = {
        status: "active",
        suspendedUntil: null,
        suspendedReason: null,
        bannedAt: null,
        bannedReason: null,
      };
      actionLabel = "user.activate";
    } else if (status === "suspended") {
      const until =
        typeof durationHours === "number" && durationHours > 0
          ? new Date(Date.now() + durationHours * 60 * 60 * 1000)
          : null;
      updateData = {
        status: "suspended",
        suspendedUntil: until,
        suspendedReason: reason ?? null,
        // Clear ban fields in case we're escalating down
        bannedAt: null,
        bannedReason: null,
      };
      actionLabel = "user.suspend";
    } else {
      // banned
      updateData = {
        status: "banned",
        bannedAt: new Date(),
        bannedReason: reason ?? null,
      };
      actionLabel = "user.ban";
    }

    const updated = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        suspendedUntil: true,
        suspendedReason: true,
        bannedAt: true,
        bannedReason: true,
      },
    });

    await writeAuditLog({
      actorId: ctx.userId,
      action: actionLabel,
      targetType: "user",
      targetId: id,
      metadata: {
        previousStatus: existing.status,
        newStatus: status,
        reason: reason ?? null,
        durationHours: durationHours ?? null,
      },
      ipAddress: request.headers.get("x-forwarded-for") ?? "",
    });

    return NextResponse.json({ user: updated });
  },
  { requiredRole: "admin" }
);
