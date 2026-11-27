import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 */
export const GET = apiHandler(async () => {
  // Run all queries in parallel for performance
  const [
    totalUsers,
    usersByTier,
    usersByRole,
    totalCreditsResult,
    recentSignups,
    dailyActiveUsers,
    prevWeekSignups,
    bannedCount,
    suspendedCount,
    pendingReportsCount,
  ] = await Promise.all([
    // Total users
    db.user.count(),

    // Users by subscription tier
    db.subscription.groupBy({
      by: ["tier"],
      _count: { tier: true },
    }),

    // Users by role
    db.user.groupBy({
      by: ["role"],
      _count: { role: true },
    }),

    // Total credits in system
    db.creditWallet.aggregate({
      _sum: { balance: true },
      _count: true,
    }),

    // Recent signups (last 7 days)
    db.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    // Daily active users (users with study sessions in last 24h)
    db.studySession.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      select: { userId: true },
      distinct: ["userId"],
    }),

    // Previous week signups (7-14 days ago) for trend calculation
    db.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    // Banned users count
    db.user.count({ where: { status: "banned" } }),

    // Suspended users count
    db.user.count({ where: { status: "suspended" } }),

    // Pending reports count (for moderation queue badge)
    db.questionReport.count({ where: { status: "pending" } }),
  ]);

  // Format tier breakdown
  const tierBreakdown: Record<string, number> = { free: 0, premium: 0, pro: 0 };
  for (const item of usersByTier) {
    tierBreakdown[item.tier] = item._count.tier;
  }

  // Format role breakdown
  const roleBreakdown: Record<string, number> = {};
  for (const item of usersByRole) {
    roleBreakdown[item.role] = item._count.role;
  }

  // Calculate trends
  const usersTrend = prevWeekSignups > 0
    ? Math.round(((recentSignups - prevWeekSignups) / prevWeekSignups) * 100)
    : recentSignups > 0 ? 100 : 0;

  const totalCredits = totalCreditsResult._sum.balance || 0;
  const activeToday = dailyActiveUsers.length;

  return NextResponse.json({
    totalUsers,
    premiumUsers: tierBreakdown.premium || 0,
    proUsers: tierBreakdown.pro || 0,
    totalRevenue: totalCredits, // Using credits as revenue proxy
    activeToday,
    usersByTier: tierBreakdown,
    usersByRole: roleBreakdown,
    totalCreditsInSystem: totalCredits,
    recentSignups7d: recentSignups,
    dailyActiveUsers: activeToday,
    usersTrend,
    revenueTrend: 0, // Placeholder - would need historical data
    activeTrend: 0, // Placeholder - would need historical data
    bannedCount,
    suspendedCount,
    pendingReportsCount,
  });
}, { requiredRole: "admin" });
