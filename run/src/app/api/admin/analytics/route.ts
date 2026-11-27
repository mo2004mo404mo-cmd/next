import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * GET /api/admin/analytics?days=30
 *
 * Returns analytics for the admin dashboard:
 *  - dauSeries:    daily active users for the last N days (based on StudySession)
 *  - mau:          monthly active users (last 30 days, distinct users)
 *  - dau:          daily active users (last 24h)
 *  - retention:    7-day rolling retention curve (D0..D7) for the cohort that signed up 7 days ago
 *  - featureUsage: aggregate counts by UsageRecord.category over the window
 *  - tierBreakdown: users per subscription tier
 *  - newUsersSeries: signups per day over the window
 *  - signupSources: derived from `User.onboardingCompleted` flag (basic split)
 *
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const days = Math.min(90, Math.max(7, parseInt(searchParams.get("days") || "30", 10)));

  const now = new Date();
  const windowStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const todayKey = now.toISOString().split("T")[0];
  const startKey = windowStart.toISOString().split("T")[0];

  // ── Build the per-day date keys for the window ──
  const dayKeys: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dayKeys.push(d.toISOString().split("T")[0]);
  }

  // ── Parallel queries ──
  const [
    studySessions,
    newUsers,
    featureUsageRows,
    tierBreakdownRows,
    dau24hRows,
    mauRows,
    retentionCohort,
    totalUsers,
  ] = await Promise.all([
    // All study sessions in the window — used to compute DAU per day
    db.studySession.findMany({
      where: { createdAt: { gte: windowStart, lte: now } },
      select: { userId: true, createdAt: true },
    }),

    // All signups in the window — used to compute new-user series
    db.user.findMany({
      where: { createdAt: { gte: windowStart, lte: now } },
      select: { id: true, createdAt: true },
    }),

    // Feature usage totals by category
    db.usageRecord.findMany({
      where: { date: { gte: startKey, lte: todayKey } },
      select: { category: true, count: true },
    }),

    // Tier breakdown (snapshot)
    db.subscription.groupBy({
      by: ["tier"],
      _count: { tier: true },
    }),

    // DAU in last 24h (distinct userIds)
    db.studySession.findMany({
      where: { createdAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } },
      select: { userId: true },
      distinct: ["userId"],
    }),

    // MAU in last 30 days (distinct userIds)
    db.studySession.findMany({
      where: {
        createdAt: {
          gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: { userId: true },
      distinct: ["userId"],
    }),

    // ── Retention cohort ──
    // Users who signed up exactly 7 days ago (in that 24h window).
    // Then count how many of them had a StudySession on each day D0..D7.
    db.user.findMany({
      where: {
        createdAt: {
          gte: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
          lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      select: { id: true, createdAt: true },
    }),

    // Total user count (for retention %)
    db.user.count(),
  ]);

  // ── Compute DAU per day ──
  const dauMap = new Map<string, Set<string>>();
  for (const s of studySessions) {
    const key = s.createdAt.toISOString().split("T")[0];
    if (!dauMap.has(key)) dauMap.set(key, new Set());
    dauMap.get(key)!.add(s.userId);
  }
  const dauSeries = dayKeys.map((k) => ({
    date: k,
    users: dauMap.get(k)?.size ?? 0,
  }));

  // ── Compute new-user series per day ──
  const newUserMap = new Map<string, number>();
  for (const u of newUsers) {
    const key = u.createdAt.toISOString().split("T")[0];
    newUserMap.set(key, (newUserMap.get(key) ?? 0) + 1);
  }
  const newUsersSeries = dayKeys.map((k) => ({
    date: k,
    signups: newUserMap.get(k) ?? 0,
  }));

  // ── Feature usage aggregate ──
  const featureUsageAgg = new Map<string, number>();
  for (const row of featureUsageRows) {
    featureUsageAgg.set(
      row.category,
      (featureUsageAgg.get(row.category) ?? 0) + row.count
    );
  }
  const featureUsage = Array.from(featureUsageAgg.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // ── Tier breakdown ──
  const tierBreakdown: Record<string, number> = { free: 0, premium: 0, pro: 0 };
  for (const r of tierBreakdownRows) {
    tierBreakdown[r.tier] = r._count.tier;
  }

  // ── Retention curve D0..D7 ──
  // For each cohort user, find on which of the D0..D7 day-keys they had at least one session.
  const cohortSize = retentionCohort.length;
  const retentionBuckets = [0, 0, 0, 0, 0, 0, 0, 0]; // D0..D7
  if (cohortSize > 0) {
    const cohortIds = new Set(retentionCohort.map((u) => u.id));
    const cohortStartMs = now.getTime() - 8 * 24 * 60 * 60 * 1000;
    // Re-derive distinct users per bucket:
    const distinctPerBucket: Set<string>[] = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
    for (const s of studySessions) {
      if (!cohortIds.has(s.userId)) continue;
      const dayOffset = Math.floor(
        (s.createdAt.getTime() - cohortStartMs) / (24 * 60 * 60 * 1000)
      );
      if (dayOffset >= 0 && dayOffset <= 7) {
        distinctPerBucket[dayOffset].add(s.userId);
      }
    }
    for (let i = 0; i < 8; i++) {
      retentionBuckets[i] = distinctPerBucket[i].size;
    }
  }
  const retentionCurve = retentionBuckets.map((count, idx) => ({
    day: `D${idx}`,
    users: count,
    pct: cohortSize > 0 ? Math.round((count / cohortSize) * 1000) / 10 : 0,
  }));

  return NextResponse.json({
    windowDays: days,
    generatedAt: now.toISOString(),
    summary: {
      dau: dau24hRows.length,
      mau: mauRows.length,
      totalUsers,
      cohortSize,
      newUsersLastWindow: newUsers.length,
    },
    dauSeries,
    newUsersSeries,
    retentionCurve,
    featureUsage,
    tierBreakdown,
  });
}, { requiredRole: "admin" });
