import { NextRequest, NextResponse } from 'next/server'
import { getGuestUserId } from '@/lib/guest-user'
import { getCurrentUser, badRequest } from '@/lib/auth-helpers'
import { withErrorHandler } from '@/lib/api-handler'
import { db } from '@/lib/db'

/* ────────────────────────────── Achievement Definitions ────────────────────────────── */

interface AchievementDef {
  type: string
  title: string
  description: string
  icon: string
  category: 'streaks' | 'questions' | 'accuracy' | 'social' | 'competition' | 'special'
  target: number
  progressType: 'streak' | 'questions' | 'accuracy_day' | 'accuracy_quiz' | 'friends' | 'groups' | 'posts' | 'challenge_wins' | 'arena' | 'battle' | 'special'
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  // 🔥 Study Streaks
  { type: 'streak_3', title: 'Getting Started', description: '3-day study streak', icon: '🔥', category: 'streaks', target: 3, progressType: 'streak' },
  { type: 'streak_7', title: 'Week Warrior', description: '7-day study streak', icon: '🔥', category: 'streaks', target: 7, progressType: 'streak' },
  { type: 'streak_14', title: 'Fortnight Focus', description: '14-day study streak', icon: '🔥', category: 'streaks', target: 14, progressType: 'streak' },
  { type: 'streak_30', title: 'Monthly Master', description: '30-day study streak', icon: '🏆', category: 'streaks', target: 30, progressType: 'streak' },
  { type: 'streak_100', title: 'Centurion', description: '100-day study streak', icon: '🏆', category: 'streaks', target: 100, progressType: 'streak' },

  // 📚 Questions
  { type: 'first_question', title: 'First Steps', description: 'Answer your first question', icon: '🌱', category: 'questions', target: 1, progressType: 'questions' },
  { type: 'questions_50', title: 'Curious Mind', description: 'Answer 50 questions', icon: '📚', category: 'questions', target: 50, progressType: 'questions' },
  { type: 'quiz_master', title: 'Quiz Master', description: 'Answer 100 questions', icon: '🧠', category: 'questions', target: 100, progressType: 'questions' },
  { type: 'scholar', title: 'Scholar', description: 'Answer 500 questions', icon: '📚', category: 'questions', target: 500, progressType: 'questions' },
  { type: 'questions_1000', title: 'Knowledge Seeker', description: 'Answer 1,000 questions', icon: '🎓', category: 'questions', target: 1000, progressType: 'questions' },
  { type: 'questions_5000', title: 'Encyclopedia', description: 'Answer 5,000 questions', icon: '📖', category: 'questions', target: 5000, progressType: 'questions' },

  // 🎯 Accuracy
  { type: 'accuracy_80_day', title: 'Sharp Day', description: '80%+ accuracy in a day', icon: '🎯', category: 'accuracy', target: 80, progressType: 'accuracy_day' },
  { type: 'accuracy_90_day', title: 'Precision Mind', description: '90%+ accuracy in a day', icon: '🎯', category: 'accuracy', target: 90, progressType: 'accuracy_day' },
  { type: 'accuracy_95_day', title: 'Near Perfect', description: '95%+ accuracy in a day', icon: '💎', category: 'accuracy', target: 95, progressType: 'accuracy_day' },
  { type: 'perfect_score', title: 'Perfectionist', description: 'Get 100% on a quiz', icon: '💎', category: 'accuracy', target: 100, progressType: 'accuracy_quiz' },

  // 👥 Social
  { type: 'first_friend', title: 'Friendly', description: 'Add your first friend', icon: '👥', category: 'social', target: 1, progressType: 'friends' },
  { type: 'friends_5', title: 'Social Butterfly', description: 'Have 5 friends', icon: '👥', category: 'social', target: 5, progressType: 'friends' },
  { type: 'first_group', title: 'Team Player', description: 'Join your first group', icon: '👥', category: 'social', target: 1, progressType: 'groups' },
  { type: 'groups_3', title: 'Community Builder', description: 'Join 3 groups', icon: '👥', category: 'social', target: 3, progressType: 'groups' },
  { type: 'first_post', title: 'First Post', description: 'Create your first post', icon: '📝', category: 'social', target: 1, progressType: 'posts' },

  // ⚔️ Competition
  { type: 'first_challenge_win', title: 'First Victory', description: 'Win your first challenge', icon: '⚔️', category: 'competition', target: 1, progressType: 'challenge_wins' },
  { type: 'arena_champion', title: 'Arena Champion', description: 'Win 5 challenges in the arena', icon: '⚔️', category: 'competition', target: 5, progressType: 'arena' },
  { type: 'wins_10', title: 'Challenger', description: 'Win 10 challenges', icon: '⚔️', category: 'competition', target: 10, progressType: 'challenge_wins' },
  { type: 'live_battle_winner', title: 'Live Warrior', description: 'Win a live battle', icon: '⚔️', category: 'competition', target: 1, progressType: 'battle' },

  // ⭐ Special
  { type: 'early_adopter', title: 'Early Adopter', description: 'Join MedQ in its first year', icon: '⭐', category: 'special', target: 1, progressType: 'special' },
  { type: 'perfect_week', title: 'Perfect Week', description: 'Study every day for a week with 80%+ accuracy', icon: '⭐', category: 'special', target: 7, progressType: 'special' },
  { type: 'night_owl', title: 'Night Owl', description: 'Study after midnight', icon: '🦉', category: 'special', target: 1, progressType: 'special' },
  { type: 'speed_demon', title: 'Speed Demon', description: 'Answer a question in under 5 seconds', icon: '⚡', category: 'special', target: 1, progressType: 'special' },
]

const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  streaks: { label: 'Study Streaks', emoji: '🔥', color: '#fb923c' },
  questions: { label: 'Questions', emoji: '📚', color: '#00e5a0' },
  accuracy: { label: 'Accuracy', emoji: '🎯', color: '#22d3ee' },
  social: { label: 'Social', emoji: '👥', color: '#8b5cf6' },
  competition: { label: 'Competition', emoji: '⚔️', color: '#ff5757' },
  special: { label: 'Special', emoji: '⭐', color: '#f59e0b' },
}

/* ────────────────────────────── Helper ────────────────────────────── */

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie. Always returns a string (guest
 * IDs are always available), so no null check is needed downstream.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser()
  const userId = (user as any)?.id as string | undefined
  return userId || getGuestUserId()
}

/* ────────────────────────────── GET Handler ────────────────────────────── */

/**
 * GET /api/achievements — Returns all achievement definitions + the caller's
 * progress towards each, grouped by category.
 *
 * Auth-optional — guests get their per-browser guest progress.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch — resolveUserId()
 * always returns a string (guest ID is always available), so the check
 * was unreachable.
 */
export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId()

  // Get user's unlocked achievements
    const unlocked = await db.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
    })

    const unlockedTypes = new Set(unlocked.map((u) => u.achievementType))

    // ── Compute progress for each achievement ──────────────────────
    // Run queries in parallel for efficiency
    const [
      streakRecords,
      totalQuestions,
      sessionData,
      friendCount,
      groupCount,
      postCount,
      challengeWins,
      bestDayAccuracy,
    ] = await Promise.all([
      // Streak records
      db.studyStreak.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      }),
      // Total questions
      db.studySession.aggregate({
        where: { userId },
        _sum: { questionsStudied: true },
      }),
      // Session data for accuracy per day
      db.studySession.findMany({
        where: { userId },
        select: { questionsStudied: true, correctAnswers: true, createdAt: true, totalTimeSpent: true },
        orderBy: { createdAt: 'desc' },
      }),
      // Friend count
      db.friendship.count({
        where: {
          status: 'accepted',
          OR: [{ senderId: userId }, { receiverId: userId }],
        },
      }),
      // Group count
      db.groupMember.count({
        where: { userId },
      }),
      // Post count
      db.post.count({
        where: { authorId: userId },
      }),
      // Challenge wins
      db.userChallenge.count({
        where: { winnerId: userId },
      }),
      // Best daily accuracy
      db.studyStreak.findMany({
        where: { userId, questionsStudied: { gt: 0 } },
        orderBy: { date: 'desc' },
        take: 90,
      }),
    ])

    // Calculate current streak
    const todayStr = new Date().toISOString().split('T')[0]
    let currentStreak = 0
    const activityMap = new Map<string, number>()
    for (const s of streakRecords) {
      activityMap.set(s.date, s.questionsStudied)
    }
    const checkDate = new Date()
    if ((activityMap.get(todayStr) || 0) > 0) {
      currentStreak = 1
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      checkDate.setDate(checkDate.getDate() - 1)
      const yesterdayStr = checkDate.toISOString().split('T')[0]
      if ((activityMap.get(yesterdayStr) || 0) > 0) {
        currentStreak = 1
        checkDate.setDate(checkDate.getDate() - 1)
      }
    }
    for (let i = 0; i < 365 && currentStreak > 0; i++) {
      const dateStr = checkDate.toISOString().split('T')[0]
      const data = activityMap.get(dateStr)
      if (data && data > 0) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    // Calculate best day accuracy from session data
    const dayAccMap = new Map<string, { attempted: number; correct: number }>()
    for (const s of sessionData) {
      const dateKey = s.createdAt.toISOString().split('T')[0]
      const existing = dayAccMap.get(dateKey) || { attempted: 0, correct: 0 }
      existing.attempted += s.questionsStudied
      existing.correct += s.correctAnswers
      dayAccMap.set(dateKey, existing)
    }
    let computedBestAccuracy = 0
    for (const [, v] of dayAccMap) {
      if (v.attempted >= 5) {
        const acc = Math.round((v.correct / v.attempted) * 100)
        computedBestAccuracy = Math.max(computedBestAccuracy, acc)
      }
    }

    const totalQuestionsStudied = totalQuestions._sum.questionsStudied || 0

    // Check for perfect quiz (100% on exam attempt)
    const perfectQuizzes = await db.examAttempt.findMany({
      where: { userId, score: { gt: 0 } },
      select: { score: true, totalQuestions: true },
    })
    const hasPerfectQuiz = perfectQuizzes.some((e) => e.totalQuestions > 0 && e.score === e.totalQuestions)

    // Check for night owl (studied after midnight)
    const nightOwlSession = sessionData.find((s) => {
      const hour = new Date(s.createdAt).getHours()
      return hour >= 0 && hour < 5
    })

    // Check for speed demon (<5s per question)
    const speedDemonSession = sessionData.find((s) => {
      if (s.questionsStudied === 0) return false
      const avgTime = s.totalTimeSpent / s.questionsStudied
      return avgTime < 5
    })

    // Calculate progress for each achievement
    const achievements = ACHIEVEMENT_DEFS.map((def) => {
      const unlockRecord = unlocked.find((u) => u.achievementType === def.type)
      const isUnlocked = unlockRecord ? true : false

      let progress = 0
      switch (def.progressType) {
        case 'streak':
          progress = currentStreak
          break
        case 'questions':
          progress = totalQuestionsStudied
          break
        case 'accuracy_day':
          progress = computedBestAccuracy
          break
        case 'accuracy_quiz':
          progress = hasPerfectQuiz ? 100 : 0
          break
        case 'friends':
          progress = friendCount
          break
        case 'groups':
          progress = groupCount
          break
        case 'posts':
          progress = postCount
          break
        case 'challenge_wins':
        case 'arena':
          progress = challengeWins
          break
        case 'battle':
          progress = 0 // Would need live battle tracking
          break
        case 'special':
          if (def.type === 'early_adopter') {
            // Check if user created within first year of app
            progress = 1 // Most users are early adopters
          } else if (def.type === 'perfect_week') {
            // Check for 7 consecutive days with 80%+ accuracy
            let consecutive = 0
            let maxConsecutive = 0
            const sortedDays = Array.from(dayAccMap.entries())
              .sort((a, b) => b[0].localeCompare(a[0]))
            for (const [, v] of sortedDays) {
              if (v.attempted >= 1) {
                const acc = Math.round((v.correct / v.attempted) * 100)
                if (acc >= 80) {
                  consecutive++
                  maxConsecutive = Math.max(maxConsecutive, consecutive)
                } else {
                  consecutive = 0
                }
              }
            }
            progress = maxConsecutive
          } else if (def.type === 'night_owl') {
            progress = nightOwlSession ? 1 : 0
          } else if (def.type === 'speed_demon') {
            progress = speedDemonSession ? 1 : 0
          }
          break
      }

      // For accuracy_day, progress is a percentage value, not a count
      const isAccuracyDay = def.progressType === 'accuracy_day'
      const progressPercent = isAccuracyDay
        ? Math.min((progress / def.target) * 100, 100)
        : Math.min((progress / def.target) * 100, 100)

      return {
        type: def.type,
        title: def.title,
        description: def.description,
        icon: def.icon,
        category: def.category,
        target: def.target,
        progress: isAccuracyDay ? Math.min(progress, def.target) : Math.min(progress, def.target),
        progressPercent,
        progressLabel: isAccuracyDay
          ? `Best: ${progress}%/${def.target}%`
          : `${Math.min(progress, def.target)}/${def.target}`,
        unlocked: isUnlocked,
        unlockedAt: unlockRecord ? unlockRecord.unlockedAt : null,
      }
    })

    // Group by category
    const categories = Object.entries(CATEGORY_META).map(([key, meta]) => ({
      id: key,
      label: meta.label,
      emoji: meta.emoji,
      color: meta.color,
      achievements: achievements.filter((a) => a.category === key),
      unlockedCount: achievements.filter((a) => a.category === key && a.unlocked).length,
      totalCount: achievements.filter((a) => a.category === key).length,
    }))

    // Stats
    const totalUnlocked = unlockedTypes.size
    const totalAchievements = ACHIEVEMENT_DEFS.length
    const completionPercent = Math.round((totalUnlocked / totalAchievements) * 100)

    // Total XP from streaks
    const xpResult = await db.studyStreak.aggregate({
      where: { userId },
      _sum: { xpEarned: true },
    })
    const totalXP = xpResult._sum.xpEarned || 0

    // Recent unlocks (last 10)
    const recentUnlocks = unlocked.slice(0, 10).map((u) => ({
      type: u.achievementType,
      title: u.achievement?.title || ACHIEVEMENT_DEFS.find((d) => d.type === u.achievementType)?.title || u.achievementType,
      description: u.achievement?.description || ACHIEVEMENT_DEFS.find((d) => d.type === u.achievementType)?.description || '',
      icon: u.achievement?.icon || ACHIEVEMENT_DEFS.find((d) => d.type === u.achievementType)?.icon || '🏅',
      unlockedAt: u.unlockedAt,
    }))

    // Top 3 rarest achievements for profile badges
    const allUserAchievements = await db.userAchievement.groupBy({
      by: ['achievementType'],
      _count: { achievementType: true },
    })
    const rarityMap = new Map(allUserAchievements.map((a) => [a.achievementType, a._count.achievementType]))
    const profileBadges = unlocked
      .map((u) => ({
        type: u.achievementType,
        title: u.achievement?.title || u.achievementType,
        icon: u.achievement?.icon || '🏅',
        rarity: rarityMap.get(u.achievementType) || 999,
      }))
      .sort((a, b) => a.rarity - b.rarity)
      .slice(0, 3)

    return NextResponse.json({
      achievements,
      categories,
      stats: {
        totalUnlocked,
        totalAchievements,
        completionPercent,
        totalXP,
      },
      recentUnlocks,
      profileBadges,
    })
});

/* ────────────────────────────── POST Handler: Share Achievement ────────────────────────────── */

/**
 * POST /api/achievements — Share an unlocked achievement as a social post.
 * Body: { achievementType: string }
 *
 * Auth-optional — guests can share too (their post will be attributed to
 * the guest ID).
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch.
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const userId = await resolveUserId()

  const body = await request.json()
  const { achievementType } = body as { achievementType: string }

  if (!achievementType) {
    return badRequest('achievementType is required')
  }

    // Check user has this achievement unlocked
    const userAch = await db.userAchievement.findUnique({
      where: { userId_achievementType: { userId, achievementType } },
      include: { achievement: true },
    })

    if (!userAch) {
      return NextResponse.json({ error: 'Achievement not unlocked' }, { status: 400 })
    }

    const def = ACHIEVEMENT_DEFS.find((d) => d.type === achievementType)
    const title = userAch.achievement?.title || def?.title || achievementType
    const icon = userAch.achievement?.icon || def?.icon || '🏅'
    const description = userAch.achievement?.description || def?.description || ''

    // Create a social post
    const post = await db.post.create({
      data: {
        authorId: userId,
        content: `🏆 Achievement Unlocked: ${icon} ${title}! ${description}`,
        type: 'achievement',
        metadata: JSON.stringify({
          achievementType,
          achievementTitle: title,
          achievementIcon: icon,
          achievementDescription: description,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        content: post.content,
        type: post.type,
        createdAt: post.createdAt,
      },
    })
});
