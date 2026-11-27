import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * GET /api/admin/revenue?days=30
 *
 * Aggregates all revenue-related models into one payload for the Admin Revenue tab.
 * Sources:
 *  1. RevenueRecord  — daily aggregate rollups (ad + subscription revenue per day)
 *  2. PaymentOrder   — Stripe orders (status=paid) with kind=subscription|credits
 *  3. GroupAdRevenueShare — per-poll payouts in credits (counted as credits, not USD)
 *  4. CreditTransaction    — credit flow totals (earned vs spent, by category)
 *
 * Returns:
 *  - summary: { totalUsd, totalCredits, adRevenue, subscriptionRev, paidOrders, refundedOrders, pendingOrders }
 *  - dailySeries: per-day USD + credits for the window
 *  - paymentBreakdown: by kind (subscription vs credits)
 *  - topPayouts: top users by GroupAdRevenueShare credits earned
 *  - creditFlow: { earnedByCategory, spentByCategory }
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
  const startKey = windowStart.toISOString().split("T")[0];
  const todayKey = now.toISOString().split("T")[0];

  // ── Build per-day keys ──
  const dayKeys: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dayKeys.push(d.toISOString().split("T")[0]);
  }

  const [
    revenueRecords,
    paidOrders,
    refundedOrders,
    pendingOrders,
    groupAdShares,
    creditTxEarn,
    creditTxSpend,
    walletAgg,
  ] = await Promise.all([
    // 1. RevenueRecord rollups in the window
    db.revenueRecord.findMany({
      where: { date: { gte: startKey, lte: todayKey } },
      orderBy: { date: "asc" },
    }),

    // 2. Paid orders in the window
    db.paymentOrder.findMany({
      where: {
        status: "paid",
        paidAt: { gte: windowStart, lte: now },
      },
      select: {
        id: true,
        userId: true,
        kind: true,
        referenceId: true,
        amountUsd: true,
        credits: true,
        status: true,
        paidAt: true,
        updatedAt: true,
      },
    }),

    // 3. Refunded orders in the window
    db.paymentOrder.count({
      where: {
        status: "refunded",
        updatedAt: { gte: windowStart, lte: now },
      },
    }),

    // 4. Pending orders (still in flight)
    db.paymentOrder.count({
      where: { status: "pending" },
    }),

    // 5. Group ad revenue shares in the window (credits)
    db.groupAdRevenueShare.findMany({
      where: { createdAt: { gte: windowStart, lte: now } },
      select: { userId: true, amount: true, correctAnswers: true, createdAt: true },
    }),

    // 6a. Credit transactions — earn types
    db.creditTransaction.findMany({
      where: {
        createdAt: { gte: windowStart, lte: now },
        amount: { gt: 0 },
      },
      select: { category: true, amount: true },
    }),

    // 6b. Credit transactions — spend types
    db.creditTransaction.findMany({
      where: {
        createdAt: { gte: windowStart, lte: now },
        amount: { lt: 0 },
      },
      select: { category: true, amount: true },
    }),

    // 7. Wallet aggregate
    db.creditWallet.aggregate({
      _sum: { balance: true, totalEarned: true, totalSpent: true },
      _count: true,
    }),
  ]);

  // ── Daily series ──
  const dailyMap = new Map<string, {
    usd: number;
    adRevenue: number;
    subscriptionRev: number;
    creditsEarned: number;
    creditsSpent: number;
  }>();

  for (const k of dayKeys) {
    dailyMap.set(k, { usd: 0, adRevenue: 0, subscriptionRev: 0, creditsEarned: 0, creditsSpent: 0 });
  }

  // RevenueRecord rollups
  for (const r of revenueRecords) {
    const bucket = dailyMap.get(r.date);
    if (!bucket) continue;
    bucket.adRevenue += r.adRevenue;
    bucket.subscriptionRev += r.subscriptionRev;
    bucket.usd += r.totalRevenue;
  }

  // Paid orders (by paidAt day)
  for (const o of paidOrders) {
    const key = (o.paidAt ?? o.updatedAt).toISOString().split("T")[0];
    const bucket = dailyMap.get(key);
    if (!bucket) continue;
    bucket.usd += o.amountUsd;
    if (o.kind === "subscription") bucket.subscriptionRev += o.amountUsd;
  }

  // Per-day credit flow not bucketed (CreditTransaction has createdAt but we projected only
  // category+amount for speed). Re-run a grouped query if you need per-day credit flow.
  void creditTxEarn;
  void creditTxSpend;

  const dailySeries = dayKeys.map((k) => {
    const b = dailyMap.get(k)!;
    return {
      date: k,
      usd: Math.round(b.usd * 100) / 100,
      adRevenue: Math.round(b.adRevenue * 100) / 100,
      subscriptionRev: Math.round(b.subscriptionRev * 100) / 100,
    };
  });

  // ── Summary ──
  const totalUsd = paidOrders.reduce((s, o) => s + (o.amountUsd || 0), 0)
    + revenueRecords.reduce((s, r) => s + (r.adRevenue + r.subscriptionRev), 0);
  const totalCreditsEarned = groupAdShares.reduce((s, r) => s + (r.amount || 0), 0);
  const totalCreditsInWallets = walletAgg._sum.balance ?? 0;

  // ── Payment breakdown by kind ──
  const paymentBreakdown: Record<string, { count: number; usd: number }> = {
    subscription: { count: 0, usd: 0 },
    credits: { count: 0, usd: 0 },
  };
  for (const o of paidOrders) {
    const key = o.kind in paymentBreakdown ? o.kind : "credits";
    paymentBreakdown[key].count += 1;
    paymentBreakdown[key].usd += o.amountUsd || 0;
  }

  // ── Top payouts (top 10 users by credits earned via GroupAdRevenueShare in window) ──
  const payoutByUser = new Map<string, number>();
  for (const s of groupAdShares) {
    payoutByUser.set(s.userId, (payoutByUser.get(s.userId) ?? 0) + (s.amount || 0));
  }
  const topPayoutIds = Array.from(payoutByUser.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userId, total]) => ({ userId, total }));
  const topPayoutUsers = topPayoutIds.length
    ? await db.user.findMany({
        where: { id: { in: topPayoutIds.map((p) => p.userId) } },
        select: { id: true, name: true, email: true, image: true },
      })
    : [];
  const topPayouts = topPayoutIds.map((p) => {
    const u = topPayoutUsers.find((x) => x.id === p.userId);
    return {
      userId: p.userId,
      name: u?.name ?? "Unknown",
      email: u?.email ?? "",
      image: u?.image ?? null,
      credits: p.total,
    };
  });

  // ── Credit flow by category ──
  const earnedByCategory = new Map<string, number>();
  for (const t of creditTxEarn) {
    earnedByCategory.set(t.category, (earnedByCategory.get(t.category) ?? 0) + t.amount);
  }
  const spentByCategory = new Map<string, number>();
  for (const t of creditTxSpend) {
    spentByCategory.set(t.category, (spentByCategory.get(t.category) ?? 0) + Math.abs(t.amount));
  }

  return NextResponse.json({
    windowDays: days,
    generatedAt: now.toISOString(),
    summary: {
      totalUsd: Math.round(totalUsd * 100) / 100,
      totalCreditsEarned,
      totalCreditsInWallets,
      paidOrders: paidOrders.length,
      refundedOrders,
      pendingOrders,
      walletCount: walletAgg._count,
      totalEarnedAll: walletAgg._sum.totalEarned ?? 0,
      totalSpentAll: walletAgg._sum.totalSpent ?? 0,
    },
    dailySeries,
    paymentBreakdown: {
      subscription: {
        count: paymentBreakdown.subscription.count,
        usd: Math.round(paymentBreakdown.subscription.usd * 100) / 100,
      },
      credits: {
        count: paymentBreakdown.credits.count,
        usd: Math.round(paymentBreakdown.credits.usd * 100) / 100,
      },
    },
    topPayouts,
    creditFlow: {
      earnedByCategory: Array.from(earnedByCategory.entries())
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount),
      spentByCategory: Array.from(spentByCategory.entries())
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount),
    },
  });
}, { requiredRole: "admin" });
