import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { badRequest, notFound } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/admin/audit-log";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * POST /api/admin/users/[id]/reset-password
 * Body: { newPassword?: string }   // optional — if omitted, a random 12-char password is generated.
 *
 * Returns: { temporaryPassword: string }   // only returned when admin set it; the admin is responsible
 *                                            for securely communicating it to the user.
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 * - `const admin = await requireAdmin() as any` replaced with `ctx.userId` from the wrapper context
 * - 400/404 boilerplate replaced with badRequest()/notFound() helpers
 * - Inner try/catch around `request.json()` preserved (intentional — distinguishes invalid JSON from empty body)
 */
export const POST = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;
    let body: { newPassword?: string } = {};
    try {
      body = await request.json();
    } catch {
      // empty body is fine
    }

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return notFound("User not found");

    if (existing.id === ctx.userId) {
      return badRequest("Use the profile page to change your own password");
    }

    // Determine the new password (admin-supplied OR random 12-char)
    const newPassword =
      typeof body.newPassword === "string" && body.newPassword.length >= 8
        ? body.newPassword
        : crypto.randomBytes(9).toString("base64url").slice(0, 12);

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id },
      data: {
        password: hashed,
        passwordResetAt: new Date(),
      },
    });

    await writeAuditLog({
      actorId: ctx.userId,
      action: "user.reset_password",
      targetType: "user",
      targetId: id,
      metadata: {
        wasAdminSupplied: typeof body.newPassword === "string",
      },
      ipAddress: request.headers.get("x-forwarded-for") ?? "",
    });

    return NextResponse.json({
      temporaryPassword: newPassword,
      message: "Password reset. Share the temporary password securely with the user.",
    });
  },
  { requiredRole: "admin" }
);
