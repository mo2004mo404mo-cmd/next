import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/dashboard
 * Get comprehensive dashboard statistics.
 * Returns: { overview, weeklyActivity, topicBreakdown, difficultyDistribution, recentActivity, achievements }
 */
export async function GET() {
  try {
    // ── 1. Overview Stats ──────────────────────────────────────────────
    const totalQuestions = await db.question.count();
    const totalExams = await db.exam.count();
    const totalStudySessions = await db.studySession.count();
    const studySessionAgg = await db.studySession.aggregate({
      _sum: { questionsStudied: true, correctAnswers: true, totalTimeSpent: true },
    });
    const totalXPResult = await db.studyStreak.aggregate({
      _sum: { xpEarned: true },
    });
    const bookmarkedCount = await db.bookmark.count();
    const allStreaks = await db.studyStreak.findMany({
      orderBy: { date: 'desc' },
      select: { date: true, xpEarned: true, questionsStudied: true, timeSpent: true },
    });

    const totalQuestionsStudied = studySessionAgg._sum.questionsStudied || 0;
    const totalCorrectAnswers = studySessionAgg._sum.correctAnswers || 0;
    const totalTimeSpent = studySessionAgg._sum.totalTimeSpent || 0;
    const averageAccuracy =
      totalQuestionsStudied > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsStudied) * 100 * 10) / 10
        : 0;
    const totalXP = totalXPResult._sum.xpEarned || 0;

    // Calculate current streak (consecutive days with activity ending today or yesterday)
    let currentStreak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check from today or yesterday
    const todayStreak = allStreaks.find(s => s.date === todayStr);
    const startDate = todayStreak && todayStreak.xpEarned > 0 ? today : new Date(today.getTime() - 86400000);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(startDate);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const streakDay = allStreaks.find(s => s.date === dateStr);
      if (streakDay && streakDay.xpEarned > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    const overview = {
      totalQuestions,
      totalExams,
      totalStudySessions,
      totalQuestionsStudied,
      totalCorrectAnswers,
      totalTimeSpent,
      averageAccuracy,
      currentStreak,
      totalXP,
      bookmarkedCount,
    };

    // ── 2. Weekly Activity (last 7 days) ───────────────────────────────
    const weeklyActivity: { date: string; questionsStudied: number; timeSpent: number; xpEarned: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayStreak = allStreaks.find(s => s.date === dateStr);

      weeklyActivity.push({
        date: dateStr,
        questionsStudied: dayStreak?.questionsStudied || 0,
        timeSpent: dayStreak?.timeSpent || 0,
        xpEarned: dayStreak?.xpEarned || 0,
      });
    }

    // ── 3. Topic Breakdown ─────────────────────────────────────────────
    const allQuestions = await db.question.findMany({
      select: { system: true, difficulty: true },
    });

    const systemCounts: Record<string, number> = {};
    for (const q of allQuestions) {
      const sys = q.system || 'Uncategorized';
      systemCounts[sys] = (systemCounts[sys] || 0) + 1;
    }

    const totalQCount = allQuestions.length || 1;
    const topicBreakdown = Object.entries(systemCounts)
      .map(([system, count]) => ({
        system,
        count,
        percentage: Math.round((count / totalQCount) * 100 * 10) / 10,
      }))
      .sort((a, b) => b.count - a.count);

    // ── 4. Difficulty Distribution ─────────────────────────────────────
    const difficultyCounts: Record<string, number> = {};
    for (const q of allQuestions) {
      const diff = q.difficulty || 'Medium';
      difficultyCounts[diff] = (difficultyCounts[diff] || 0) + 1;
    }

    const difficultyDistribution = Object.entries(difficultyCounts)
      .map(([difficulty, count]) => ({
        difficulty,
        count,
        percentage: Math.round((count / totalQCount) * 100 * 10) / 10,
      }))
      .sort((a, b) => b.count - a.count);

    // ── 5. Recent Activity (last 10 study sessions) ────────────────────
    const recentActivity = await db.studySession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // ── 6. Achievements ────────────────────────────────────────────────
    const TOTAL_AVAILABLE_ACHIEVEMENTS = 9;
    const achievements = await db.userAchievement.findMany({
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
      take: 5,
    });
    const unlockedCount = await db.userAchievement.count();
    const recentAchievements = achievements.map(ua => ({
      type: ua.achievementType,
      title: ua.achievement.title,
      description: ua.achievement.description,
      icon: ua.achievement.icon,
      unlockedAt: ua.unlockedAt,
    }));

    const achievementsData = {
      unlockedCount,
      totalAvailable: TOTAL_AVAILABLE_ACHIEVEMENTS,
      recentAchievements,
    };

    // ── AI Oral Exam stats (cross-feature integration) ─────────────────
    // Pull all oral_exam sessions, parse score + subject from metadata, and
    // surface a summary so the dashboard can show how the user is doing on AI vivas.
    const oralExamSessions = await db.studySession.findMany({
      where: { type: 'oral_exam' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, createdAt: true, totalTimeSpent: true, questionsStudied: true, correctAnswers: true, metadata: true },
      take: 100, // cap to last 100 for performance
    });
    const oralExamParsed = oralExamSessions.map((s) => {
      let meta: any = {};
      try { meta = JSON.parse(s.metadata || '{}'); } catch {}
      return {
        id: s.id,
        createdAt: s.createdAt,
        timeSpent: s.totalTimeSpent,
        turns: s.questionsStudied,
        score: typeof meta?.score === 'number' ? meta.score : null,
        subject: typeof meta?.subject === 'string' ? meta.subject : 'Unknown',
        difficulty: typeof meta?.difficulty === 'string' ? meta.difficulty : 'Unknown',
        source: typeof meta?.source === 'string' ? meta.source : 'viva',
      };
    });
    const scoredOralExams = oralExamParsed.filter((s) => s.score !== null);
    const oralExamStats = {
      totalSessions: oralExamParsed.length,
      avgScore: scoredOralExams.length > 0
        ? Math.round(scoredOralExams.reduce((sum, s) => sum + (s.score || 0), 0) / scoredOralExams.length)
        : null,
      lastScore: scoredOralExams[0]?.score ?? null,
      lastSubject: oralExamParsed[0]?.subject ?? null,
      lastSource: oralExamParsed[0]?.source ?? null,
      totalTimeSpent: oralExamParsed.reduce((sum, s) => sum + s.timeSpent, 0),
      recent: oralExamParsed.slice(0, 5),
    };

    // ── Build response ─────────────────────────────────────────────────
    return NextResponse.json({
      overview,
      weeklyActivity,
      topicBreakdown,
      difficultyDistribution,
      recentActivity,
      achievements: achievementsData,
      oralExamStats,
    });
  } catch (error) {
    console.error('Dashboard GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
