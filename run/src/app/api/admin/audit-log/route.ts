import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * GET /api/admin/audit-log?page=1&limit=50&action=user.ban
 *
 * Returns paginated audit log entries with the admin actor's name/email.
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
  const action = searchParams.get("action") || "";
  const targetType = searchParams.get("targetType") || "";

  const where: any = {};
  if (action) where.action = action;
  if (targetType) where.targetType = targetType;

  const skip = (page - 1) * limit;
  const [entries, total] = await Promise.all([
    db.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        actor: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    }),
    db.auditLog.count({ where }),
  ]);

  return NextResponse.json({
    entries,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}, { requiredRole: "admin" });
