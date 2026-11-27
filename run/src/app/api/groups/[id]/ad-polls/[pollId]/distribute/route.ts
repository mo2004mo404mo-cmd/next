import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/ad-polls/[pollId]/distribute
// Distribute accumulated ad revenue to qualifying members.
// Qualification: member voted "accept" AND has >= poll.quizThreshold correct
// group-quiz answers. Payout is proportional to correct answers.
// Revenue is credited to each member's CreditWallet.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; pollId: string }> }
) {
  try {
    const { id, pollId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });
    if (membership.role !== 'admin') {
      return Response.json({ error: 'Only admins can distribute revenue' }, { status: 403 });
    }

    const poll = await db.groupAdPoll.findUnique({ where: { id: pollId } });
    if (!poll || poll.groupId !== id) {
      return Response.json({ error: 'Poll not found' }, { status: 404 });
    }

    const available = poll.totalRevenue - poll.totalDistributed;
    if (available <= 0) {
      return Response.json({ error: 'No revenue available to distribute' }, { status: 400 });
    }

    // 1. Find all members who voted "accept"
    const acceptVotes = await db.groupAdPollVote.findMany({
      where: { pollId, vote: 'accept' },
      select: { userId: true },
    });
    const acceptUserIds = acceptVotes.map(v => v.userId);

    // 2. Count correct quiz answers per accepting member
    const correctByUser = await db.groupQuizAttempt.groupBy({
      by: ['userId'],
      where: {
        userId: { in: acceptUserIds },
        groupId: id,
        isCorrect: true,
      },
      _count: { _all: true },
    });

    // 3. Filter to those meeting the threshold
    const qualifiers = correctByUser
      .map(g => ({ userId: g.userId, correct: g._count._all }))
      .filter(q => q.correct >= poll.quizThreshold);

    if (qualifiers.length === 0) {
      return Response.json({
        message: 'No members qualify yet',
        threshold: poll.quizThreshold,
        acceptedVoters: acceptUserIds.length,
      });
    }

    // 4. Distribute proportional to correct answers
    const totalCorrect = qualifiers.reduce((s, q) => s + q.correct, 0);
    const shareablePool = available * (poll.revenueSharePct / 100);

    const distributions: { userId: string; amount: number; correct: number }[] = [];
    for (const q of qualifiers) {
      const amount = Math.round((q.correct / totalCorrect) * shareablePool);
      if (amount <= 0) continue;
      distributions.push({ userId: q.userId, amount, correct: q.correct });
    }

    // 5. Credit wallets + record shares + transactions
    await db.$transaction(async (tx) => {
      for (const d of distributions) {
        // upsert wallet
        const wallet = await tx.creditWallet.upsert({
          where: { userId: d.userId },
          update: {
            balance: { increment: d.amount },
            totalEarned: { increment: d.amount },
          },
          create: {
            userId: d.userId,
            balance: d.amount,
            totalEarned: d.amount,
          },
        });

        await tx.creditTransaction.create({
          data: {
            userId: d.userId,
            type: 'earn_ad',
            amount: d.amount,
            balance: wallet.balance,
            category: 'group_ad_share',
            description: `Group ad revenue share (${d.correct} correct answers)`,
            referenceId: pollId,
          },
        });

        await tx.groupAdRevenueShare.create({
          data: {
            pollId,
            userId: d.userId,
            amount: d.amount,
            correctAnswers: d.correct,
          },
        });
      }

      await tx.groupAdPoll.update({
        where: { id: pollId },
        data: { totalDistributed: { increment: shareablePool } },
      });
    });

    return Response.json({
      distributed: distributions,
      totalDistributed: shareablePool,
      qualifierCount: distributions.length,
      threshold: poll.quizThreshold,
    });
  } catch (error) {
    console.error('Error distributing ad revenue:', error);
    return Response.json({ error: 'Failed to distribute revenue' }, { status: 500 });
  }
}
