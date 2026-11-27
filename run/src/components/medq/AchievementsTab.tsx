'use client';

import { useState, useEffect, useCallback } from 'react';
import { Award, Flame, BookOpen, Target, Users, Swords, Star, Share2, Lock, ChevronDown, ChevronUp, Loader2, Layers, Brain, GraduationCap, Clock, Map, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  threshold: number;
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
}

/* ────────────────────────────── New Category System ────────────────────────────── */

const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  study: { icon: <BookOpen className="w-4 h-4" />, color: '#00e5a0', label: 'Study' },
  streak: { icon: <Flame className="w-4 h-4" />, color: '#ff6b35', label: 'Streak' },
  social: { icon: <Users className="w-4 h-4" />, color: '#b388ff', label: 'Social' },
  competition: { icon: <Swords className="w-4 h-4" />, color: '#ff5757', label: 'Competition' },
  mastery: { icon: <GraduationCap className="w-4 h-4" />, color: '#4fc3f7', label: 'Mastery' },
};

const CATEGORY_ORDER = ['study', 'streak', 'social', 'competition', 'mastery'];

/* Map old categories to new categories */
function remapCategory(oldCategory: string): string {
  const mapping: Record<string, string> = {
    questions: 'study',
    accuracy: 'mastery',
    streaks: 'streak',
    social: 'social',
    competition: 'competition',
    special: 'mastery',
  };
  return mapping[oldCategory] || oldCategory;
}

/* ────────────────────────────── Unlock Animation CSS ────────────────────────────── */

const UNLOCK_ANIMATION_STYLE = `
@keyframes achievementGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(255,193,7,0.3), 0 0 16px rgba(255,193,7,0.15); }
  50% { box-shadow: 0 0 16px rgba(255,193,7,0.5), 0 0 32px rgba(255,193,7,0.25), 0 0 48px rgba(255,193,7,0.1); }
}
@keyframes achievementPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
.achievement-unlocked-new {
  animation: achievementGlow 2s ease-in-out infinite, achievementPulse 2s ease-in-out infinite;
  border-color: rgba(255,193,7,0.3) !important;
}
`;

/* ────────────────────────────── Progress Bar Color Gradient ────────────────────────────── */

function getProgressColor(progress: number): string {
  // Gradient from #ff5757 (0%) to #00e5a0 (100%)
  const r = Math.round(255 + (0 - 255) * (progress / 100));
  const g = Math.round(87 + (229 - 87) * (progress / 100));
  const b = Math.round(87 + (160 - 87) * (progress / 100));
  return `rgb(${r},${g},${b})`;
}

function getProgressGradient(progress: number): string {
  const startColor = '#ff5757';
  const endColor = getProgressColor(progress);
  return `linear-gradient(90deg, ${startColor}, ${endColor})`;
}

/* ────────────────────────────── Recently Unlocked Tracking ────────────────────────────── */

interface RecentAchievement {
  id: string;
  unlockedAt: string;
}

function getRecentAchievements(): RecentAchievement[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('medq-recent-achievements');
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function addRecentAchievement(id: string) {
  try {
    const recent = getRecentAchievements();
    // Only add if not already in the list
    if (!recent.find(r => r.id === id)) {
      recent.push({ id, unlockedAt: new Date().toISOString() });
      // Keep only last 20
      const trimmed = recent.slice(-20);
      localStorage.setItem('medq-recent-achievements', JSON.stringify(trimmed));
    }
  } catch {}
}

function isNewlyUnlocked(id: string): boolean {
  const recent = getRecentAchievements();
  const entry = recent.find(r => r.id === id);
  if (!entry) return false;
  // Consider "new" if unlocked within last 7 days
  const unlockedTime = new Date(entry.unlockedAt).getTime();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return unlockedTime > sevenDaysAgo;
}

/* ────────────────────────────── Points System ────────────────────────────── */

const ACHIEVEMENT_POINTS: Record<string, number> = {
  // Study
  q_50: 10, q_100: 25, q_500: 50, q_1000: 100, q_5000: 200,
  // Streak
  streak_3: 10, streak_7: 25, streak_14: 50, streak_30: 100, streak_100: 200,
  // Social
  soc_friend1: 10, soc_friend5: 25, soc_group1: 10, soc_group3: 25, soc_post1: 10,
  // Competition
  comp_win1: 25, comp_win10: 100, comp_live1: 50, comp_daily7: 50,
  // Mastery (accuracy + special)
  acc_80: 25, acc_90: 50, acc_95: 100, acc_100: 200,
  spec_early: 10, spec_night: 10, spec_speed: 25, spec_perfect_week: 100,
};

/* ────────────────────────────── Main Component ────────────────────────────── */

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('study');
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [recentAchievementIds, setRecentAchievementIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAchievements();
    // Load recently unlocked IDs
    const recent = getRecentAchievements();
    setRecentAchievementIds(new Set(recent.filter(r => {
      const unlockedTime = new Date(r.unlockedAt).getTime();
      return unlockedTime > Date.now() - 7 * 24 * 60 * 60 * 1000;
    }).map(r => r.id)));
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/achievements');
      if (res.ok) {
        const data = await res.json();
        // Transform API data into our Achievement format with computed progress
        const achievements = transformAchievements(data);
        setAchievements(achievements);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const transformAchievements = (data: any): Achievement[] => {
    // Define all achievement definitions (remapped categories)
    const definitions = [
      // Study (questions answered, study time, sessions)
      { id: 'q_50', type: 'questions', name: 'Curious Mind', description: 'Answer 50 questions', icon: '📖', category: 'study', threshold: 50 },
      { id: 'q_100', type: 'questions', name: 'Knowledge Seeker', description: 'Answer 100 questions', icon: '📚', category: 'study', threshold: 100 },
      { id: 'q_500', type: 'questions', name: 'Study Machine', description: 'Answer 500 questions', icon: '🧠', category: 'study', threshold: 500 },
      { id: 'q_1000', type: 'questions', name: 'Question Conqueror', description: 'Answer 1,000 questions', icon: '🏆', category: 'study', threshold: 1000 },
      { id: 'q_5000', type: 'questions', name: 'Legendary Scholar', description: 'Answer 5,000 questions', icon: '🎓', category: 'study', threshold: 5000 },
      // Streak (consecutive days, weekly streaks)
      { id: 'streak_3', type: 'streak', name: 'Getting Started', description: '3-day study streak', icon: '🔥', category: 'streak', threshold: 3 },
      { id: 'streak_7', type: 'streak', name: 'Week Warrior', description: '7-day study streak', icon: '⚡', category: 'streak', threshold: 7 },
      { id: 'streak_14', type: 'streak', name: 'Fortnight Focus', description: '14-day study streak', icon: '💫', category: 'streak', threshold: 14 },
      { id: 'streak_30', type: 'streak', name: 'Monthly Master', description: '30-day study streak', icon: '🌟', category: 'streak', threshold: 30 },
      { id: 'streak_100', type: 'streak', name: 'Centurion', description: '100-day study streak', icon: '👑', category: 'streak', threshold: 100 },
      // Social (friends, groups, posts)
      { id: 'soc_friend1', type: 'social', name: 'Friendly', description: 'Add your first friend', icon: '👋', category: 'social', threshold: 1 },
      { id: 'soc_friend5', type: 'social', name: 'Social Butterfly', description: 'Have 5 friends', icon: '🤝', category: 'social', threshold: 5 },
      { id: 'soc_group1', type: 'social', name: 'Team Player', description: 'Join your first group', icon: '👥', category: 'social', threshold: 1 },
      { id: 'soc_group3', type: 'social', name: 'Community Builder', description: 'Join 3 groups', icon: '🏘️', category: 'social', threshold: 3 },
      { id: 'soc_post1', type: 'social', name: 'Voice It', description: 'Create your first post', icon: '📝', category: 'social', threshold: 1 },
      // Competition (challenges, leaderboard, arena)
      { id: 'comp_win1', type: 'competition', name: 'First Victory', description: 'Win your first challenge', icon: '🥊', category: 'competition', threshold: 1 },
      { id: 'comp_win10', type: 'competition', name: 'Champion', description: 'Win 10 challenges', icon: '🏅', category: 'competition', threshold: 10 },
      { id: 'comp_live1', type: 'competition', name: 'Live Warrior', description: 'Win a live battle', icon: '⚔️', category: 'competition', threshold: 1 },
      { id: 'comp_daily7', type: 'competition', name: 'Daily Devotee', description: 'Complete 7 daily challenges', icon: '📅', category: 'competition', threshold: 7 },
      // Mastery (flashcards, review hub, knowledge map)
      { id: 'acc_80', type: 'accuracy', name: 'Sharp Mind', description: '80%+ accuracy in a day', icon: '🎯', category: 'mastery', threshold: 80 },
      { id: 'acc_90', type: 'accuracy', name: 'Precision Expert', description: '90%+ accuracy in a day', icon: '🏹', category: 'mastery', threshold: 90 },
      { id: 'acc_95', type: 'accuracy', name: 'Near Perfect', description: '95%+ accuracy in a day', icon: '💎', category: 'mastery', threshold: 95 },
      { id: 'acc_100', type: 'accuracy', name: 'Flawless', description: '100% on a quiz (10+ questions)', icon: '✨', category: 'mastery', threshold: 100 },
      { id: 'spec_early', type: 'special', name: 'Early Adopter', description: 'Joined MedQ early', icon: '🚀', category: 'mastery', threshold: 1 },
      { id: 'spec_night', type: 'special', name: 'Night Owl', description: 'Study after midnight', icon: '🦉', category: 'mastery', threshold: 1 },
      { id: 'spec_speed', type: 'special', name: 'Speed Demon', description: 'Answer in under 5 seconds', icon: '⚡', category: 'mastery', threshold: 1 },
      { id: 'spec_perfect_week', type: 'special', name: 'Perfect Week', description: '7 days with 80%+ accuracy', icon: '🌈', category: 'mastery', threshold: 7 },
    ];

    // Get user's stats from API data
    const stats = data.stats || {};
    const currentStreak = stats.currentStreak || 0;
    const totalQuestions = stats.totalQuestions || 0;
    const bestAccuracy = stats.bestAccuracy || 0;
    const friendCount = stats.friendCount || 0;
    const groupCount = stats.groupCount || 0;
    const postCount = stats.postCount || 0;
    const challengeWins = stats.challengeWins || 0;
    const dailyChallenges = stats.dailyChallenges || 0;

    const progressMap: Record<string, number> = {
      q_50: totalQuestions, q_100: totalQuestions, q_500: totalQuestions, q_1000: totalQuestions, q_5000: totalQuestions,
      streak_3: currentStreak, streak_7: currentStreak, streak_14: currentStreak, streak_30: currentStreak, streak_100: currentStreak,
      soc_friend1: friendCount, soc_friend5: friendCount,
      soc_group1: groupCount, soc_group3: groupCount,
      soc_post1: postCount,
      comp_win1: challengeWins, comp_win10: challengeWins,
      comp_live1: stats.liveWins || 0, comp_daily7: dailyChallenges,
      acc_80: bestAccuracy, acc_90: bestAccuracy, acc_95: bestAccuracy, acc_100: bestAccuracy,
      spec_early: 1, spec_night: stats.nightOwl ? 1 : 0,
      spec_speed: stats.speedDemon ? 1 : 0, spec_perfect_week: stats.perfectWeeks || 0,
    };

    // Check already unlocked achievements from UserAchievement
    const unlockedSet = new Set<string>();
    if (data.achievements) {
      for (const a of data.achievements) {
        if (a.unlockedAt) unlockedSet.add(a.achievementId || a.id);
      }
    }

    return definitions.map(def => {
      const progress = progressMap[def.id] || 0;
      const isUnlocked = unlockedSet.has(def.id) || progress >= def.threshold;
      return {
        ...def,
        category: remapCategory(def.category),
        unlocked: isUnlocked,
        unlockedAt: isUnlocked ? new Date().toISOString() : null,
        progress: Math.min(progress, def.threshold),
        maxProgress: def.threshold,
      };
    });
  };

  const handleShare = useCallback(async (achievement: Achievement) => {
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'achievement',
          content: `🏆 Achievement Unlocked: ${achievement.name}! ${achievement.description}`,
          metadata: { achievementId: achievement.id, achievementName: achievement.name, icon: achievement.icon },
        }),
      });
      toast.success('Achievement shared to your feed!');
    } catch {
      toast.error('Failed to share achievement');
    }
  }, []);

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const categories = CATEGORY_ORDER;
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // Calculate total points
  const totalPointsEarned = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + (ACHIEVEMENT_POINTS[a.id] || 10), 0);
  const totalPointsAvailable = achievements
    .reduce((sum, a) => sum + (ACHIEVEMENT_POINTS[a.id] || 10), 0);

  // Category breakdown
  const categoryBreakdown = categories.map(cat => {
    const catAchievements = achievements.filter(a => a.category === cat);
    const catUnlocked = catAchievements.filter(a => a.unlocked).length;
    const catPct = catAchievements.length > 0 ? Math.round((catUnlocked / catAchievements.length) * 100) : 0;
    return { id: cat, total: catAchievements.length, unlocked: catUnlocked, pct: catPct };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#00e5a0] animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Inject CSS for unlock animation */}
      <style dangerouslySetInnerHTML={{ __html: UNLOCK_ANIMATION_STYLE }} />

      <div className="space-y-6">
        {/* ── Achievement Summary Bar ── */}
        <div className="bg-[#151821] rounded-2xl border border-white/[0.06] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#e8ecf4]">Achievements</h2>
              <p className="text-xs text-[#5a6478]">{unlockedCount}/{totalCount} unlocked · {completionPct}% complete</p>
            </div>
            {/* Points badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.15)' }}>
              <Star className="w-3.5 h-3.5" style={{ color: '#f59e0b' }} />
              <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>{totalPointsEarned}</span>
              <span className="text-[10px]" style={{ color: '#5a6478' }}>/ {totalPointsAvailable} pts</span>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="w-full h-3 bg-[#0c0e14] rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full transition-all duration-700" style={{
              width: `${completionPct}%`,
              background: 'linear-gradient(90deg, #ff5757, #f59e0b, #00e5a0)',
            }} />
          </div>

          {/* Category breakdown with mini progress bars */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {categoryBreakdown.map(cat => {
              const meta = CATEGORY_META[cat.id];
              if (!meta) return null;
              return (
                <div key={cat.id} className="text-center">
                  <div className="flex items-center justify-center mb-1.5" style={{ color: meta.color }}>
                    {meta.icon}
                  </div>
                  <p className="text-[10px] font-bold text-[#e8ecf4] mb-0.5">{cat.unlocked}/{cat.total}</p>
                  <p className="text-[8px] text-[#5a6478] mb-1.5">{meta.label}</p>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{
                      width: `${cat.pct}%`,
                      background: meta.color,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {(['all', 'unlocked', 'locked'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === f ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'bg-white/[0.03] text-[#5a6478] hover:text-[#8b95a8]'
                }`}>
                {f === 'all' ? `All (${totalCount})` : f === 'unlocked' ? `✅ Unlocked (${unlockedCount})` : `🔒 Locked (${totalCount - unlockedCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Categories */}
        {categories.map(cat => {
          const meta = CATEGORY_META[cat];
          if (!meta) return null;
          const catAchievements = filteredAchievements.filter(a => a.category === cat);
          if (catAchievements.length === 0) return null;
          const isExpanded = expandedCategory === cat;
          const catUnlocked = catAchievements.filter(a => a.unlocked).length;
          const catNewCount = catAchievements.filter(a => a.unlocked && recentAchievementIds.has(a.id)).length;

          return (
            <div key={cat} className="bg-[#151821] rounded-2xl border border-white/[0.06] overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: meta.color }}>{meta.icon}</span>
                  <span className="text-sm font-bold text-[#e8ecf4]">{meta.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#5a6478]">
                    {catUnlocked}/{catAchievements.length}
                  </span>
                  {catNewCount > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,193,7,0.15)', color: '#ffc107', border: '1px solid rgba(255,193,7,0.25)' }}>
                      {catNewCount} NEW
                    </span>
                  )}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-[#5a6478]" /> : <ChevronDown className="w-4 h-4 text-[#5a6478]" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catAchievements.map(ach => {
                    const isNew = ach.unlocked && recentAchievementIds.has(ach.id);
                    const progressPct = ach.maxProgress > 0 ? Math.round((ach.progress / ach.maxProgress) * 100) : 0;

                    return (
                      <div key={ach.id}
                        className={`rounded-xl border p-4 transition-all ${
                          ach.unlocked
                            ? isNew
                              ? 'achievement-unlocked-new bg-white/[0.04] border-yellow-500/30'
                              : 'bg-white/[0.04] border-white/[0.08]'
                            : 'bg-[#0c0e14]/50 border-white/[0.03] opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                            ach.unlocked ? (isNew ? 'bg-yellow-500/10' : 'bg-white/[0.08]') : 'bg-white/[0.03]'
                          }`}>
                            {ach.unlocked ? ach.icon : <Lock className="w-4 h-4 text-[#3a4055]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-xs font-bold ${ach.unlocked ? 'text-[#e8ecf4]' : 'text-[#5a6478]'}`}>
                                {ach.name}
                              </p>
                              {isNew && (
                                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,193,7,0.2)', color: '#ffc107' }}>
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#5a6478] mt-0.5">{ach.description}</p>

                            {/* Progress bar for locked achievements */}
                            {!ach.unlocked && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[9px] text-[#3a4055]">{ach.progress}/{ach.maxProgress}</span>
                                  <span className="text-[9px] font-bold" style={{ color: getProgressColor(progressPct) }}>{progressPct}%</span>
                                </div>
                                <div className="w-full h-2 bg-[#1a1e2b] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-500" style={{
                                    width: `${Math.min(100, progressPct)}%`,
                                    background: getProgressGradient(progressPct),
                                  }} />
                                </div>
                              </div>
                            )}

                            {ach.unlocked && (
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[9px] font-semibold text-[#00e5a0]">✓ Unlocked</span>
                                <span className="text-[9px] text-[#5a6478]">+{ACHIEVEMENT_POINTS[ach.id] || 10} pts</span>
                                <button onClick={() => handleShare(ach)}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00e5a0]/10 text-[#00e5a0] text-[9px] font-semibold hover:bg-[#00e5a0]/20 transition-all"
                                >
                                  <Share2 className="w-2.5 h-2.5" /> Share
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
