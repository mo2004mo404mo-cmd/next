import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ACHIEVEMENT_DEFS: Record<string, { title: string; description: string; icon: string }> = {
  first_question: { title: 'First Steps', description: 'Study your first question', icon: '🌱' },
  streak_7: { title: 'Week Warrior', description: '7-day study streak', icon: '🔥' },
  streak_30: { title: 'Monthly Master', description: '30-day study streak', icon: '🏆' },
  quiz_master: { title: 'Quiz Master', description: 'Study 100 questions', icon: '🧠' },
  scholar: { title: 'Scholar', description: 'Study 500 questions', icon: '📚' },
  marathon: { title: 'Marathon Mind', description: 'Study for 60+ minutes in one day', icon: '⏱️' },
}

function getTodayStr(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function makeDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function checkAndUnlockAchievements(currentStreak: number): Promise<{ type: string; title: string; description: string; icon: string }[]> {
  const newAchievements: { type: string; title: string; description: string; icon: string }[] = []

  try {
    // first_question
    const totalSessions = await db.studySession.count()
    if (totalSessions >= 1) {
      const existing = await db.achievement.findUnique({ where: { type: 'first_question' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.first_question
        await db.achievement.create({ data: { type: 'first_question', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'first_question', ...def })
      }
    }

    // streak_7
    if (currentStreak >= 7) {
      const existing = await db.achievement.findUnique({ where: { type: 'streak_7' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.streak_7
        await db.achievement.create({ data: { type: 'streak_7', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'streak_7', ...def })
      }
    }

    // streak_30
    if (currentStreak >= 30) {
      const existing = await db.achievement.findUnique({ where: { type: 'streak_30' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.streak_30
        await db.achievement.create({ data: { type: 'streak_30', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'streak_30', ...def })
      }
    }

    // quiz_master: 100 total questions studied
    const totalQuestions = await db.studySession.aggregate({ _sum: { questionsStudied: true } })
    const totalQ = totalQuestions._sum.questionsStudied || 0
    if (totalQ >= 100) {
      const existing = await db.achievement.findUnique({ where: { type: 'quiz_master' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.quiz_master
        await db.achievement.create({ data: { type: 'quiz_master', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'quiz_master', ...def })
      }
    }

    // scholar: 500 total questions studied
    if (totalQ >= 500) {
      const existing = await db.achievement.findUnique({ where: { type: 'scholar' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.scholar
        await db.achievement.create({ data: { type: 'scholar', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'scholar', ...def })
      }
    }

    // marathon: Study for 60+ minutes in one day
    const todayStr = getTodayStr()
    const todayStreak = await db.studyStreak.findUnique({ where: { date: todayStr } })
    if (todayStreak && todayStreak.timeSpent >= 3600) {
      const existing = await db.achievement.findUnique({ where: { type: 'marathon' } })
      if (!existing) {
        const def = ACHIEVEMENT_DEFS.marathon
        await db.achievement.create({ data: { type: 'marathon', title: def.title, description: def.description, icon: def.icon } })
        newAchievements.push({ type: 'marathon', ...def })
      }
    }
  } catch (error) {
    console.error('Achievement check error:', error)
  }

  return newAchievements
}

export async function GET(request: NextRequest) {
  try {
    const rangeParam = request.nextUrl.searchParams.get('range')
    const range = [7, 30, 90, 365].includes(Number(rangeParam)) ? Number(rangeParam) : 30

    // Get all streak records (no date filter for simplicity - SQLite handles it fine)
    const streaks = await db.studyStreak.findMany({
      orderBy: { date: 'asc' },
    })

    // Build a set of dates with activity for fast lookup
    const activityMap = new Map<string, { questionsStudied: number; timeSpent: number; xpEarned: number }>()
    for (const s of streaks) {
      activityMap.set(s.date, {
        questionsStudied: s.questionsStudied,
        timeSpent: s.timeSpent,
        xpEarned: s.xpEarned,
      })
    }

    // Calculate currentStreak: consecutive days from today/yesterday backwards
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = getTodayStr()
    let currentStreak = 0
    const MAX_STREAK_CHECK = 365

    // Start from today or yesterday
    const todayData = activityMap.get(todayStr)
    let checkDate = new Date(today)
    if (todayData && todayData.questionsStudied > 0) {
      currentStreak = 1
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      // Check yesterday
      checkDate.setDate(checkDate.getDate() - 1)
      const yesterdayStr = makeDateStr(checkDate)
      const yesterdayData = activityMap.get(yesterdayStr)
      if (yesterdayData && yesterdayData.questionsStudied > 0) {
        currentStreak = 1
        checkDate.setDate(checkDate.getDate() - 1)
      }
    }

    // Continue counting backwards
    for (let i = 0; i < MAX_STREAK_CHECK && currentStreak > 0; i++) {
      const dateStr = makeDateStr(checkDate)
      const data = activityMap.get(dateStr)
      if (data && data.questionsStudied > 0) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        // Check if the user has any streak freeze available across their records
        // A streak freeze allows skipping one missed day without breaking the streak
        const anyFreeze = streaks.find(s => s.streakFreezes > 0)
        if (anyFreeze) {
          // Use a streak freeze: decrement the freeze count and continue the streak
          await db.studyStreak.update({
            where: { id: anyFreeze.id },
            data: { streakFreezes: { decrement: 1 } },
          })
          // Update the in-memory map too
          activityMap.set(anyFreeze.date, {
            questionsStudied: anyFreeze.questionsStudied,
            timeSpent: anyFreeze.timeSpent,
            xpEarned: anyFreeze.xpEarned,
          })
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Calculate longestStreak
    let longestStreak = 0
    let tempStreak = 0
    const activeDates = streaks.filter(s => s.questionsStudied > 0).map(s => s.date).sort()

    for (let i = 0; i < activeDates.length; i++) {
      if (i === 0) {
        tempStreak = 1
      } else {
        const prev = new Date(activeDates[i - 1])
        const curr = new Date(activeDates[i])
        const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) {
          tempStreak++
        } else {
          tempStreak = 1
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak)
    }

    // Calculate totalXP and todayXP
    const totalXP = streaks.reduce((sum, s) => sum + s.xpEarned, 0)
    const todayXP = todayData?.xpEarned || 0

    // Heatmap data for the requested range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - range)
    const startStr = makeDateStr(startDate)

    const heatmap = streaks
      .filter(s => s.date >= startStr)
      .map(s => ({
        date: s.date,
        questionsStudied: s.questionsStudied,
        timeSpent: s.timeSpent,
        xpEarned: s.xpEarned,
      }))

    return NextResponse.json({
      currentStreak,
      longestStreak,
      totalXP,
      todayXP,
      heatmap,
    })
  } catch (error) {
    console.error('Error fetching streak data:', error)
    return NextResponse.json({ error: 'Failed to fetch streak data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { questionsStudied, timeSpent, xpEarned } = body as {
      questionsStudied?: number
      timeSpent?: number
      xpEarned?: number
    }

    const todayStr = getTodayStr()

    const streak = await db.studyStreak.upsert({
      where: { date: todayStr },
      update: {
        questionsStudied: questionsStudied ? { increment: questionsStudied } : undefined,
        timeSpent: timeSpent ? { increment: timeSpent } : undefined,
        xpEarned: xpEarned ? { increment: xpEarned } : undefined,
      },
      create: {
        date: todayStr,
        questionsStudied: questionsStudied || 0,
        timeSpent: timeSpent || 0,
        xpEarned: xpEarned || 0,
      },
    })

    // Simple streak calculation for achievements (just use the map approach)
    const allStreaks = await db.studyStreak.findMany({ orderBy: { date: 'asc' } })
    const activityMap = new Map<string, number>()
    for (const s of allStreaks) {
      activityMap.set(s.date, s.questionsStudied)
    }

    let currentStreak = 0
    const today = new Date()
    let checkDate = new Date(today)
    const todayData = activityMap.get(todayStr)
    if (todayData && todayData > 0) {
      currentStreak = 1
      checkDate.setDate(checkDate.getDate() - 1)
    }
    for (let i = 0; i < 365 && currentStreak > 0; i++) {
      const dateStr = makeDateStr(checkDate)
      const data = activityMap.get(dateStr)
      if (data && data > 0) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    const newAchievements = await checkAndUnlockAchievements(currentStreak)

    return NextResponse.json({
      streak: {
        id: streak.id,
        date: streak.date,
        questionsStudied: streak.questionsStudied,
        timeSpent: streak.timeSpent,
        xpEarned: streak.xpEarned,
      },
      newAchievements,
    })
  } catch (error) {
    console.error('Error updating streak:', error)
    return NextResponse.json({ error: 'Failed to update streak' }, { status: 500 })
  }
}
