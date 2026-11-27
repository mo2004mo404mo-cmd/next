import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

/**
 * GET /api/groups/[id]/ad-polls/stats
 *
 * Aggregated ad-revenue analytics dashboard for a group, PLUS per-poll
 * interactive voting state. Returns:
 *   - totals: overall revenue / distributed / available / counts
 *   - monthly: last 6 months of revenue + distribution (for the bar chart)
 *   - myEarnings: the current user's payout total, rank, correct answers, threshold, next milestone
 *   - topEarners: top 5 members by total payouts in this group
 *   - recentPayouts: last 5 payouts (member, amount, campaign, date)
 *   - campaigns: every ad-poll rendered as a campaign card. Each campaign
 *     ALSO includes vote data (myVote, acceptCount, rejectCount,
 *     myCorrectAnswers, eligibleForShare) so the UI can render the
 *     interactive Accept/Reject poll on top of the statistics.
 *
 * The dashboard unifies BOTH views: live voting UI for active polls AND
 * aggregate revenue statistics. Stats sections (KPIs, chart, leaderboard)
 * are NOT affected by individual votes — they only reflect payouts.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const isAdmin = membership.role === 'admin';

    // 1) All polls in this group, with their payouts + votes (for live voting UI)
    const polls = await db.groupAdPoll.findMany({
      where: { groupId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        shares: {
          include: { user: { select: { id: true, name: true, image: true } } },
          orderBy: { createdAt: 'desc' },
        },
        votes: true,
        _count: { select: { votes: true, shares: true } },
      },
    });

    // Auto-close polls whose deadline has passed (mirrors list endpoint behavior)
    const now = new Date();
    const toClose = polls.filter(
      p => p.status === 'active' && p.closesAt && new Date(p.closesAt) <= now,
    );
    if (toClose.length > 0) {
      await db.groupAdPoll.updateMany({
        where: { id: { in: toClose.map(p => p.id) } },
        data: { status: 'closed' },
      });
      for (const p of toClose) p.status = 'closed';
    }

    // 2) Totals
    const totalRevenue = polls.reduce((s, p) => s + p.totalRevenue, 0);
    const totalDistributed = polls.reduce((s, p) => s + p.totalDistributed, 0);
    const totalAvailable = totalRevenue - totalDistributed;
    const activeCount = polls.filter(p => p.status !== 'closed').length;
    const closedCount = polls.filter(p => p.status === 'closed').length;

    // 3) Monthly aggregates — last 6 months (including current)
    // Each share's createdAt determines which month it landed in.
    // Revenue is attributed to the month the poll was credited (we approximate
    // using the latest updatedAt on the poll, since revenue is added via the
    // /revenue POST endpoint which updates updatedAt).
    const monthBuckets: { key: string; label: string; revenue: number; distributed: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-US', { month: 'short' });
      monthBuckets.push({ key, label, revenue: 0, distributed: 0 });
    }
    const bucketMap = new Map(monthBuckets.map(b => [b.key, b]));

    // Distribute revenue across months using each poll's updatedAt (proxy for
    // when revenue was credited). Distribute payouts (shares) by their createdAt.
    for (const p of polls) {
      const pollMonthKey = `${p.updatedAt.getFullYear()}-${String(p.updatedAt.getMonth() + 1).padStart(2, '0')}`;
      const bucket = bucketMap.get(pollMonthKey);
      if (bucket) bucket.revenue += p.totalRevenue;
      for (const share of p.shares) {
        const shareMonthKey = `${share.createdAt.getFullYear()}-${String(share.createdAt.getMonth() + 1).padStart(2, '0')}`;
        const sBucket = bucketMap.get(shareMonthKey);
        if (sBucket) sBucket.distributed += share.amount;
      }
    }

    // 4) Top earners — aggregate all shares by user
    const earnerMap = new Map<string, { userId: string; name: string; image: string | null; totalEarned: number; payoutCount: number }>();
    for (const p of polls) {
      for (const share of p.shares) {
        const existing = earnerMap.get(share.userId);
        if (existing) {
          existing.totalEarned += share.amount;
          existing.payoutCount += 1;
        } else {
          earnerMap.set(share.userId, {
            userId: share.userId,
            name: share.user?.name || 'Unknown',
            image: share.user?.image || null,
            totalEarned: share.amount,
            payoutCount: 1,
          });
        }
      }
    }
    const topEarners = Array.from(earnerMap.values())
      .sort((a, b) => b.totalEarned - a.totalEarned)
      .slice(0, 5);

    // 5) Recent payouts — flat list of last 5 shares across all polls, newest first
    const recentPayouts = polls
      .flatMap(p => p.shares.map(s => ({
        id: s.id,
        userId: s.userId,
        userName: s.user?.name || 'Unknown',
        userImage: s.user?.image || null,
        amount: s.amount,
        correctAnswers: s.correctAnswers,
        pollId: p.id,
        pollQuestion: p.question,
        createdAt: s.createdAt,
      })))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // 6) My earnings + my correct answers + my rank
    const myCorrectAgg = await db.groupQuizAttempt.groupBy({
      by: ['userId'],
      where: { userId: user.id, groupId: id, isCorrect: true },
      _count: { _all: true },
    });
    const myCorrectAnswers = myCorrectAgg[0]?._count?._all ?? 0;

    // Use the lowest threshold among active campaigns as the "next milestone"
    // (so members always have a target to qualify for at least one campaign).
    const activeThresholds = polls
      .filter(p => p.status !== 'closed')
      .map(p => p.quizThreshold)
      .sort((a, b) => a - b);
    const nextMilestone = activeThresholds[0] ?? polls[0]?.quizThreshold ?? 10;

    const myEarnings = earnerMap.get(user.id);
    const myRank = myEarnings
      ? Array.from(earnerMap.values())
          .sort((a, b) => b.totalEarned - a.totalEarned)
          .findIndex(e => e.userId === user.id) + 1
      : null;

    // 7) Campaigns — one card per ad poll. Each card carries BOTH:
    //    (a) Statistics (revenue / distributed / available / recipients)
    //    (b) Live voting state (myVote, acceptCount, rejectCount, eligibility)
    //    so the UI can render the interactive Accept/Reject poll inline with
    //    the campaign stats. Accept/reject counts come straight from the
    //    poll row (kept up-to-date by the /vote endpoint on every cast).
    const campaigns = polls.map(p => {
      const myVote = p.votes.find(v => v.userId === user.id)?.vote || null;
      const eligibleForShare = myCorrectAnswers >= p.quizThreshold;
      return {
        id: p.id,
        question: p.question,
        description: p.description,
        status: p.status,
        createdAt: p.createdAt,
        closesAt: p.closesAt,
        revenueSharePct: p.revenueSharePct,
        quizThreshold: p.quizThreshold,
        totalRevenue: p.totalRevenue,
        totalDistributed: p.totalDistributed,
        available: p.totalRevenue - p.totalDistributed,
        recipientCount: p._count.shares,
        participantCount: p._count.votes,
        // Vote-related fields for the interactive poll UI
        acceptCount: p.acceptCount,
        rejectCount: p.rejectCount,
        myVote,
        myCorrectAnswers,
        eligibleForShare,
      };
    });

    return Response.json({
      totals: {
        totalRevenue,
        totalDistributed,
        totalAvailable,
        activeCount,
        closedCount,
        campaignCount: polls.length,
      },
      monthly: monthBuckets,
      myEarnings: {
        totalEarned: myEarnings?.totalEarned ?? 0,
        payoutCount: myEarnings?.payoutCount ?? 0,
        rank: myRank,
        correctAnswers: myCorrectAnswers,
        nextMilestone,
        eligible: myCorrectAnswers >= nextMilestone,
      },
      topEarners,
      recentPayouts,
      campaigns,
      isAdmin,
    });
  } catch (error) {
    console.error('Error computing ad-revenue stats:', error);
    return Response.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
