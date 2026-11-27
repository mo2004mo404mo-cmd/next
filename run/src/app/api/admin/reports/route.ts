import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * GET /api/admin/reports?status=pending&page=1&limit=20
 *
 * Lists QuestionReport rows for the moderation queue.
 * Default filter: status=pending (so the queue shows only items needing action).
 * Includes the question text and reporter info.
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") || "pending"; // pending | reviewed | resolved | all
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const reason = searchParams.get("reason") || "";

  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (reason) where.reason = reason;

  const skip = (page - 1) * limit;

  const [reports, total, statusCounts] = await Promise.all([
    db.questionReport.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        question: {
          select: {
            id: true,
            text: true,
            type: true,
            system: true,
            topic: true,
            difficulty: true,
            isAIGenerated: true,
          },
        },
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    }),
    db.questionReport.count({ where }),
    db.questionReport.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const statusBreakdown: Record<string, number> = {
    pending: 0,
    reviewed: 0,
    resolved: 0,
  };
  for (const r of statusCounts) statusBreakdown[r.status] = r._count.status;

  return NextResponse.json({
    reports,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    statusBreakdown,
  });
}, { requiredRole: "admin" });
