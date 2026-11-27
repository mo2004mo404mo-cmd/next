'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/components/medq/useCurrentUser';
import {
  Swords,
  Trophy,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Flame,
  Plus,
  Users,
  Crown,
  Timer,
  ChevronRight,
  AlertCircle,
  Send,
  Medal,
} from 'lucide-react';
import { toast } from 'sonner';

/* ─── Types ─── */

interface FriendUser {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
}

interface ChallengeUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface Challenge {
  id: string;
  challengerId: string;
  challengedId: string;
  questionIds: string;
  totalQuestions: number;
  challengerScore: number;
  challengedScore: number;
  challengerTime: number;
  challengedTime: number;
  challengerAnswers: string;
  challengedAnswers: string;
  status: string;
  winnerId: string | null;
  topic: string;
  difficulty: string;
  expiresAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  challenger: ChallengeUser;
  challenged: ChallengeUser;
}

interface ChallengeQuestion {
  id: string;
  type: string;
  text: string;
  options: string;
  answer: string;
  explanation: string;
  difficulty: string;
  system: string;
  topic: string;
}

type ViewMode = 'arena' | 'quiz' | 'results';

/* ─── Helpers ─── */

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>/g, '')
    .trim();
}

function parseOptions(optionsRaw: string): string[] {
  try { const p = JSON.parse(optionsRaw); return Array.isArray(p) ? p : []; }
  catch { return []; }
}

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatTimeRemaining(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getDifficultyColor(d: string): string {
  if (d === 'Easy') return '#22c55e';
  if (d === 'Basic') return '#4ade80';
  if (d === 'Moderate') return '#f59e0b';
  if (d === 'Hard') return '#f97316';
  if (d === 'Expert') return '#ef4444';
  return '#5a6478';
}

function getDifficultyBg(d: string): string {
  if (d === 'Easy') return 'rgba(34,197,94,0.1)';
  if (d === 'Basic') return 'rgba(74,222,128,0.1)';
  if (d === 'Moderate') return 'rgba(245,158,11,0.1)';
  if (d === 'Hard') return 'rgba(249,115,22,0.1)';
  if (d === 'Expert') return 'rgba(239,68,68,0.1)';
  return 'rgba(255,255,255,0.05)';
}

/* ─── Sub-components ─── */

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-lg font-bold text-[#e8ecf4]">{value}</p>
        <p className="text-[10px] text-[#5a6478] uppercase tracking-wider font-semibold">{label}</p>
      </div>
    </div>
  );
}

function AvatarCircle({ user, size = 36 }: { user: { name: string | null; image: string | null }; size?: number }) {
  if (user.image) {
    return (
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={user.image}
          alt={user.name || 'User'}
          fill
          className="object-cover rounded-full"
          sizes={`${size}px`}
        />
      </div>
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{ width: size, height: size, background: 'linear-gradient(135deg, rgba(0,229,160,0.2), rgba(0,229,160,0.05))', color: '#00e5a0', fontSize: size * 0.35 }}
    >
      {getInitials(user.name)}
    </div>
  );
}

/* ─── Main Component ─── */

export default function ChallengeArenaTab() {
  const { user } = useCurrentUser();
  const userId = user?.id;

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('arena');
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<{ sent: Challenge[]; received: Challenge[] }>({ sent: [], received: [] });

  // New challenge dialog
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [challengeTopic, setChallengeTopic] = useState('Mixed');
  const [challengeDifficulty, setChallengeDifficulty] = useState('Mixed');
  const [challengeQCount, setChallengeQCount] = useState(5);
  const [sending, setSending] = useState(false);

  // Quiz state
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<ChallengeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Results state
  const [resultData, setResultData] = useState<{
    challenge: Challenge; score: number; totalQuestions: number;
    creditsEarned: number; isWinner: boolean; isTie: boolean;
  } | null>(null);

  // Timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerSeconds(0);
    timerRef.current = setInterval(() => setTimerSeconds(prev => prev + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  /* ─── Fetch challenges ─── */
  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/challenges');
      if (res.ok) { const data = await res.json(); setChallenges({ sent: data.sent || [], received: data.received || [] }); }
    } catch (err) { console.error('Fetch challenges error:', err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchChallenges(); }, [fetchChallenges]);

  /* ─── Stats ─── */
  const allChallenges = [...challenges.sent, ...challenges.received];
  const completedChallenges = allChallenges.filter(c => c.status === 'completed');
  const activeChallenges = allChallenges.filter(c => c.status === 'pending' || c.status === 'active');
  const wins = completedChallenges.filter(c => c.winnerId === userId).length;
  const losses = completedChallenges.filter(c => c.winnerId && c.winnerId !== userId).length;
  const ties = completedChallenges.filter(c => !c.winnerId).length;
  const totalGames = wins + losses + ties;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  /* ─── New challenge dialog ─── */
  const openNewChallenge = useCallback(async () => {
    setShowNewDialog(true); setSelectedFriend(''); setChallengeTopic('Mixed'); setChallengeDifficulty('Mixed'); setChallengeQCount(5);
    setFriendsLoading(true);
    try {
      const res = await fetch('/api/friends');
      if (res.ok) { const data = await res.json(); setFriends(data.friends || []); }
    } catch (err) { console.error('Fetch friends error:', err); }
    finally { setFriendsLoading(false); }
  }, []);

  const handleSendChallenge = useCallback(async () => {
    if (!selectedFriend) { toast.error('Please select a friend to challenge'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengedId: selectedFriend, topic: challengeTopic, difficulty: challengeDifficulty, totalQuestions: challengeQCount }),
      });
      if (res.ok) { toast.success('Challenge sent!'); setShowNewDialog(false); fetchChallenges(); }
      else { const data = await res.json(); toast.error(data.error || 'Failed to send challenge'); }
    } catch (err) { console.error('Send challenge error:', err); toast.error('Failed to send challenge'); }
    finally { setSending(false); }
  }, [selectedFriend, challengeTopic, challengeDifficulty, challengeQCount, fetchChallenges]);

  /* ─── Accept challenge ─── */
  const handleAcceptChallenge = useCallback(async (challengeId: string) => {
    try {
      const res = await fetch(`/api/challenges/${challengeId}/accept`, { method: 'POST' });
      if (res.ok) { toast.success('Challenge accepted!'); fetchChallenges(); }
      else { const data = await res.json(); toast.error(data.error || 'Failed to accept'); }
    } catch (err) { console.error('Accept challenge error:', err); toast.error('Failed to accept challenge'); }
  }, [fetchChallenges]);

  /* ─── Enter challenge quiz ─── */
  const enterChallenge = useCallback(async (challenge: Challenge) => {
    if (challenge.status === 'pending' && challenge.challengedId === userId) {
      await handleAcceptChallenge(challenge.id);
    }
    const isChallenger = challenge.challengerId === userId;
    if ((isChallenger && challenge.challengerScore >= 0) || (!isChallenger && challenge.challengedScore >= 0)) {
      toast.error('You have already completed this challenge'); return;
    }
    if (new Date(challenge.expiresAt) < new Date()) { toast.error('This challenge has expired'); return; }

    try {
      const res = await fetch(`/api/challenges/${challenge.id}`);
      if (res.ok) {
        const data = await res.json();
        setActiveChallenge(data.challenge);
        setQuizQuestions(data.questions || []);
        setAnswers({}); setCurrentIndex(0);
        setViewMode('quiz'); startTimer();
      } else { toast.error('Failed to load challenge'); }
    } catch (err) { console.error('Load challenge error:', err); toast.error('Failed to load challenge'); }
  }, [userId, handleAcceptChallenge, startTimer]);

  /* ─── Submit quiz ─── */
  const handleSubmitQuiz = useCallback(async () => {
    if (!activeChallenge) return;
    const unanswered = quizQuestions.filter(q => !answers[q.id]?.trim());
    if (unanswered.length > 0) { toast.error(`Please answer all questions. ${unanswered.length} remaining.`); return; }

    setSubmitting(true); stopTimer();
    try {
      const res = await fetch(`/api/challenges/${activeChallenge.id}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (res.ok) {
        const data = await res.json();
        setResultData({ challenge: data.challenge, score: data.score, totalQuestions: data.totalQuestions, creditsEarned: data.creditsEarned || 0, isWinner: data.isWinner || false, isTie: data.isTie || false });
        setViewMode('results');
      } else { const data = await res.json(); toast.error(data.error || 'Failed to submit'); }
    } catch (err) { console.error('Submit quiz error:', err); toast.error('Failed to submit answers'); }
    finally { setSubmitting(false); }
  }, [activeChallenge, quizQuestions, answers, stopTimer]);

  /* ─── Back to arena ─── */
  const backToArena = useCallback(() => {
    setViewMode('arena'); setActiveChallenge(null); setQuizQuestions([]); setAnswers({}); setResultData(null); stopTimer(); fetchChallenges();
  }, [stopTimer, fetchChallenges]);

  /* ─── Helpers ─── */
  const getOpponent = (c: Challenge) => c.challengerId === userId ? c.challenged : c.challenger;
  const isUserChallenger = (c: Challenge) => c.challengerId === userId;

  /* ─── Computed for quiz ─── */
  const currentQ = quizQuestions[currentIndex];
  const currentOptions = currentQ ? parseOptions(currentQ.options) : [];
  const answeredCount = quizQuestions.filter(q => answers[q.id]?.trim()).length;
  const allAnswered = answeredCount === quizQuestions.length;

  /* ─── Render: Loading ─── */
  if (loading) {
    return (
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="flex-1">
            <div className="h-5 w-40 rounded animate-pulse mb-2" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="h-3 w-24 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3].map(i => <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />)}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />)}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════ */
  /* ─── RENDER: QUIZ MODE ──                               */
  /* ═══════════════════════════════════════════════════════ */

  if (viewMode === 'quiz' && activeChallenge && quizQuestions.length > 0) {
    const opponent = getOpponent(activeChallenge);

    return (
      <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* ── Quiz Header ── */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button onClick={backToArena} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.05]" style={{ border: '1px solid rgba(255,255,255,0.06)' }} aria-label="Back to arena">
              <ArrowLeft className="w-4 h-4 text-[#8b95a8]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#ff5757]" />
                <span className="text-sm font-bold text-[#e8ecf4]">Challenge Quiz</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,87,87,0.1)', color: '#ff5757' }}>
                  VS {opponent.name || 'Opponent'}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: getDifficultyBg(activeChallenge.difficulty), color: getDifficultyColor(activeChallenge.difficulty) }}>
                  {activeChallenge.difficulty}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b95a8' }}>
                  {activeChallenge.topic}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-[#5a6478]" />
              <span className="text-sm font-mono font-bold text-[#e8ecf4]">{formatTimer(timerSeconds)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#00e5a0]" />
              <span className="text-sm font-bold text-[#e8ecf4]">{currentIndex + 1}/{quizQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="mb-5">
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #ff5757, #00e5a0)' }} />
          </div>
        </div>

        {/* ── Question Card ── */}
        {currentQ && (
          <div className="rounded-xl p-5 sm:p-6 mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: currentQ.type === 'mcq' ? 'rgba(59,130,246,0.1)' : currentQ.type === 'tf' ? 'rgba(245,158,11,0.1)' : 'rgba(139,92,246,0.1)', color: currentQ.type === 'mcq' ? '#3b82f6' : currentQ.type === 'tf' ? '#f59e0b' : '#8b5cf6' }}>
                {currentQ.type === 'mcq' ? 'MCQ' : currentQ.type === 'tf' ? 'True/False' : 'Short Answer'}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: getDifficultyBg(currentQ.difficulty), color: getDifficultyColor(currentQ.difficulty) }}>
                {currentQ.difficulty}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b95a8' }}>
                {currentQ.system}
              </span>
            </div>

            <p className="text-[15px] sm:text-base leading-relaxed text-[#e8ecf4] mb-5">{stripHtml(currentQ.text)}</p>

            {/* MCQ Options */}
            {currentQ.type === 'mcq' && (
              <div className="space-y-2.5">
                {currentOptions.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isSelected = answers[currentQ.id] === opt;
                  return (
                    <button key={i} type="button" onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt }))}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
                      style={{ background: isSelected ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)', border: isSelected ? '1px solid rgba(0,229,160,0.25)' : '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                        style={{ background: isSelected ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.05)', color: isSelected ? '#00e5a0' : '#5a6478' }}>
                        {letter}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: isSelected ? '#e8ecf4' : '#8b95a8' }}>{stripHtml(opt)}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* True/False */}
            {currentQ.type === 'tf' && (
              <div className="grid grid-cols-2 gap-3">
                {['True', 'False'].map(opt => {
                  const isSelected = answers[currentQ.id] === opt;
                  const isTrue = opt === 'True';
                  return (
                    <button key={opt} type="button" onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt }))}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: isSelected ? (isTrue ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : 'rgba(255,255,255,0.03)',
                        border: isSelected ? (isTrue ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)') : '1px solid rgba(255,255,255,0.06)',
                        color: isSelected ? (isTrue ? '#22c55e' : '#ef4444') : '#8b95a8',
                      }}>
                      {isTrue ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Short Answer */}
            {currentQ.type === 'short' && (
              <input type="text" value={answers[currentQ.id] || ''} onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                placeholder="Type your answer..."
                className="w-full p-3.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40"
                style={{ background: 'rgba(255,255,255,0.03)', border: answers[currentQ.id]?.trim() ? '1px solid rgba(0,229,160,0.25)' : '1px solid rgba(255,255,255,0.06)' }} />
            )}
          </div>
        )}

        {/* ── Navigation & Submit ── */}
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} disabled={currentIndex <= 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#8b95a8', border: '1px solid rgba(255,255,255,0.06)' }}>
            Previous
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px]" style={{ scrollbarWidth: 'none' }}>
            {quizQuestions.map((q, i) => {
              const isAnswered = !!answers[q.id]?.trim();
              const isCurrent = i === currentIndex;
              return (
                <button key={q.id} type="button" onClick={() => setCurrentIndex(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all flex-shrink-0"
                  style={{ background: isCurrent ? '#00e5a0' : isAnswered ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.1)', transform: isCurrent ? 'scale(1.3)' : 'scale(1)' }}
                  aria-label={`Go to question ${i + 1}`} />
              );
            })}
          </div>

          {currentIndex < quizQuestions.length - 1 ? (
            <button type="button" onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#e8ecf4', border: '1px solid rgba(255,255,255,0.06)' }}>
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmitQuiz} disabled={!allAnswered || submitting}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: allAnswered ? 'linear-gradient(135deg, #ff5757, #00e5a0)' : 'rgba(0,229,160,0.1)', color: allAnswered ? '#0c0e14' : '#00e5a0', boxShadow: allAnswered ? '0 4px 15px rgba(0,229,160,0.25)' : 'none' }}>
              {submitting ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</>) : (<><Swords className="w-3.5 h-3.5" /> Submit</>)}
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#5a6478]">{answeredCount} of {quizQuestions.length} answered</p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════ */
  /* ─── RENDER: RESULTS MODE ──                            */
  /* ═══════════════════════════════════════════════════════ */

  if (viewMode === 'results' && resultData) {
    const { challenge, score, totalQuestions, creditsEarned, isWinner, isTie } = resultData;
    const scorePct = Math.round((score / totalQuestions) * 100);
    const isChallenger = challenge.challengerId === userId;
    const myScore = isChallenger ? challenge.challengerScore : challenge.challengedScore;
    const opponentScore = isChallenger ? challenge.challengedScore : challenge.challengerScore;
    const opponent = isChallenger ? challenge.challenged : challenge.challenger;

    return (
      <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-center py-6 sm:py-8">
          {/* Result icon */}
          <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              background: isWinner ? 'linear-gradient(135deg, rgba(0,229,160,0.2), rgba(0,229,160,0.05))'
                : isTie ? 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))'
                : 'linear-gradient(135deg, rgba(255,87,87,0.2), rgba(255,87,87,0.05))',
              boxShadow: isWinner ? '0 0 40px rgba(0,229,160,0.2)' : isTie ? '0 0 40px rgba(245,158,11,0.2)' : '0 0 40px rgba(255,87,87,0.2)',
            }}>
            {isWinner ? <Trophy className="w-12 h-12 text-[#00e5a0]" /> : isTie ? <Medal className="w-12 h-12 text-[#f59e0b]" /> : <Swords className="w-12 h-12 text-[#ff5757]" />}
          </div>

          <h3 className="text-2xl font-bold text-[#e8ecf4] mb-2">
            {isWinner ? 'Victory!' : isTie ? "It's a Tie!" : 'Defeat'}
          </h3>
          <p className="text-sm text-[#5a6478] mb-6">
            {isWinner ? 'You dominated this challenge!' : isTie ? 'Evenly matched opponents!' : 'Better luck next time!'}
          </p>

          {/* Score comparison */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <AvatarCircle user={{ name: user?.name || 'You', image: user?.image || null }} size={48} />
              <p className="text-xs text-[#8b95a8] mt-2 max-w-[80px] truncate">{user?.name || 'You'}</p>
              <p className="text-2xl font-black text-[#00e5a0] mt-1">{myScore}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-[#5a6478] font-semibold mb-1">VS</span>
              <Swords className="w-6 h-6 text-[#ff5757]" />
            </div>
            <div className="text-center">
              <AvatarCircle user={opponent} size={48} />
              <p className="text-xs text-[#8b95a8] mt-2 max-w-[80px] truncate">{opponent.name || 'Opponent'}</p>
              <p className="text-2xl font-black text-[#ff5757] mt-1">{opponentScore >= 0 ? opponentScore : '?'}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#00e5a0]" />
              <span className="text-sm text-[#8b95a8]"><span className="font-bold text-[#e8ecf4]">{scorePct}%</span> accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5a6478]" />
              <span className="text-sm text-[#8b95a8]"><span className="font-bold text-[#e8ecf4]">{formatTimer(timerSeconds)}</span></span>
            </div>
            {creditsEarned > 0 && (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-sm font-bold text-[#f59e0b]">+{creditsEarned} credits</span>
              </div>
            )}
          </div>

          {/* Waiting for opponent */}
          {challenge.status !== 'completed' && (
            <div className="max-w-sm mx-auto rounded-xl p-4 mb-6" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#f59e0b] animate-spin" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#e8ecf4]">Waiting for opponent</p>
                  <p className="text-[10px] text-[#5a6478]">{opponent.name || 'Opponent'} hasn&apos;t completed the challenge yet</p>
                </div>
              </div>
            </div>
          )}

          <button onClick={backToArena}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#e8ecf4', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Arena
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════ */
  /* ─── RENDER: ARENA DASHBOARD ──                         */
  /* ═══════════════════════════════════════════════════════ */

  return (
    <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(255,87,87,0.15), rgba(0,229,160,0.15))', boxShadow: '0 0 20px rgba(255,87,87,0.1), 0 0 20px rgba(0,229,160,0.1)' }}>
            <Swords className="w-5 h-5 text-[#ff5757]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#e8ecf4]">Challenge Arena</h2>
            <p className="text-[10px] text-[#5a6478]">Challenge friends & compete</p>
          </div>
        </div>

        <button onClick={openNewChallenge}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #00e5a0, #00b87a)', color: '#0c0e14', boxShadow: '0 4px 15px rgba(0,229,160,0.25)' }}>
          <Plus className="w-4 h-4" /> New Challenge
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Wins" value={wins} icon={<Trophy className="w-5 h-5" />} color="#00e5a0" />
        <StatCard label="Losses" value={losses} icon={<XCircle className="w-5 h-5" />} color="#ff5757" />
        <StatCard label="Win Rate" value={`${winRate}%`} icon={<Target className="w-5 h-5" />} color="#f59e0b" />
      </div>

      {/* ── Active Challenges ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#e8ecf4] flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ff5757]" />
            Active Challenges
            {activeChallenges.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,87,87,0.1)', color: '#ff5757' }}>{activeChallenges.length}</span>
            )}
          </h3>
        </div>

        {activeChallenges.length === 0 ? (
          <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <Swords className="w-8 h-8 text-[#3a4055] mx-auto mb-2" />
            <p className="text-xs text-[#5a6478]">No active challenges</p>
            <p className="text-[10px] text-[#3a4055]">Challenge a friend to start a battle!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
            {activeChallenges.map(c => {
              const opponent = getOpponent(c);
              const isChallenger = isUserChallenger(c);
              const myScore = isChallenger ? c.challengerScore : c.challengedScore;
              const myScoreDisplay = myScore >= 0 ? myScore : null;
              const isPendingReceived = c.status === 'pending' && !isChallenger;
              const needsMyAction = (c.status === 'pending' && !isChallenger) || (c.status === 'active' && myScore < 0);
              const opponentCompleted = isChallenger ? c.challengedScore >= 0 : c.challengerScore >= 0;

              return (
                <div key={c.id}
                  className="rounded-xl p-4 cursor-pointer transition-all hover:bg-white/[0.02] group"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onClick={() => {
                    if (isPendingReceived) handleAcceptChallenge(c.id);
                    else if (needsMyAction) enterChallenge(c);
                  }}>
                  <div className="flex items-center gap-3">
                    <AvatarCircle user={opponent} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-[#e8ecf4] truncate">{opponent.name || 'Opponent'}</p>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: getDifficultyBg(c.difficulty), color: getDifficultyColor(c.difficulty) }}>{c.difficulty}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b95a8' }}>{c.topic}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isPendingReceived ? (
                          <span className="text-[10px] font-semibold text-[#f59e0b] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Waiting for your acceptance</span>
                        ) : needsMyAction ? (
                          <span className="text-[10px] font-semibold text-[#00e5a0] flex items-center gap-1"><Swords className="w-3 h-3" /> Your turn to play!</span>
                        ) : (
                          <span className="text-[10px] font-semibold text-[#4fc3f7] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Waiting for opponent</span>
                        )}
                        {opponentCompleted && !needsMyAction && <span className="text-[10px] text-[#5a6478]">Opponent completed</span>}
                      </div>
                      {myScoreDisplay !== null && (
                        <div className="mt-1">
                          <span className="text-[10px] text-[#8b95a8]">Your score: <span className="font-bold text-[#00e5a0]">{myScoreDisplay}/{c.totalQuestions}</span></span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-[#5a6478] flex items-center gap-1"><Clock className="w-3 h-3" />{formatTimeRemaining(c.expiresAt)}</span>
                      {needsMyAction && <ChevronRight className="w-4 h-4 text-[#00e5a0] group-hover:translate-x-0.5 transition-transform" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Completed Challenges ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#e8ecf4] flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#f59e0b]" /> Completed Challenges
          </h3>
        </div>

        {completedChallenges.length === 0 ? (
          <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <Trophy className="w-8 h-8 text-[#3a4055] mx-auto mb-2" />
            <p className="text-xs text-[#5a6478]">No completed challenges yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
            {completedChallenges.map(c => {
              const isChallenger = isUserChallenger(c);
              const myScore = isChallenger ? c.challengerScore : c.challengedScore;
              const opponentScore = isChallenger ? c.challengedScore : c.challengerScore;
              const opponent = getOpponent(c);
              const iWon = c.winnerId === userId;
              const isTieResult = !c.winnerId;

              return (
                <div key={c.id} className="rounded-xl p-4 transition-all hover:bg-white/[0.02]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${iWon ? 'rgba(0,229,160,0.12)' : isTieResult ? 'rgba(245,158,11,0.12)' : 'rgba(255,87,87,0.12)'}`,
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: iWon ? 'rgba(0,229,160,0.1)' : isTieResult ? 'rgba(245,158,11,0.1)' : 'rgba(255,87,87,0.1)' }}>
                      {iWon ? <Crown className="w-5 h-5 text-[#00e5a0]" /> : isTieResult ? <Medal className="w-5 h-5 text-[#f59e0b]" /> : <XCircle className="w-5 h-5 text-[#ff5757]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-[#e8ecf4] truncate">vs {opponent.name || 'Opponent'}</p>
                        {iWon && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0' }}>WIN</span>}
                        {isTieResult && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>TIE</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-black text-[#00e5a0]">{myScore}</span>
                        <span className="text-[10px] text-[#3a4055]">-</span>
                        <span className="text-sm font-black text-[#ff5757]">{opponentScore}</span>
                        <span className="text-[10px] text-[#5a6478]">({c.totalQuestions} Qs)</span>
                      </div>
                    </div>
                    {(iWon || isTieResult) && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span className="text-[10px] font-bold text-[#f59e0b]">+{iWon ? 15 : 5}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── New Challenge Dialog ── */}
      {showNewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowNewDialog(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl p-6" style={{ background: '#151821', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(255,87,87,0.15), rgba(0,229,160,0.15))' }}>
                <Swords className="w-5 h-5 text-[#ff5757]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#e8ecf4]">New Challenge</h3>
                <p className="text-[10px] text-[#5a6478]">Challenge a friend to a quiz battle</p>
              </div>
            </div>

            {/* Friend selector */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#8b95a8] mb-2 block">Select Friend</label>
              {friendsLoading ? (
                <div className="flex items-center justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-[#00e5a0]" /></div>
              ) : friends.length === 0 ? (
                <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Users className="w-6 h-6 text-[#3a4055] mx-auto mb-2" />
                  <p className="text-xs text-[#5a6478]">No friends yet</p>
                  <p className="text-[10px] text-[#3a4055]">Add friends to challenge them</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
                  {friends.map(f => (
                    <button key={f.id} type="button" onClick={() => setSelectedFriend(f.id)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                      style={{
                        background: selectedFriend === f.id ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.02)',
                        border: selectedFriend === f.id ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.04)',
                      }}>
                      <AvatarCircle user={f} size={32} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#e8ecf4] truncate">{f.name || 'User'}</p>
                        <p className="text-[10px] text-[#5a6478] truncate">{f.email}</p>
                      </div>
                      {selectedFriend === f.id && <CheckCircle2 className="w-4 h-4 text-[#00e5a0] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Topic */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#8b95a8] mb-2 block">Topic</label>
              <div className="flex flex-wrap gap-1.5">
                {['Mixed', 'Cardiovascular', 'Respiratory', 'Neurology', 'Gastrointestinal', 'Renal', 'Endocrine', 'Musculoskeletal', 'Hematology'].map(t => (
                  <button key={t} type="button" onClick={() => setChallengeTopic(t)}
                    className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                    style={{
                      background: challengeTopic === t ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.03)',
                      border: challengeTopic === t ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.06)',
                      color: challengeTopic === t ? '#00e5a0' : '#8b95a8',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#8b95a8] mb-2 block">Difficulty</label>
              <div className="flex gap-2">
                {['Mixed', 'Easy', 'Basic', 'Moderate', 'Hard', 'Expert'].map(d => (
                  <button key={d} type="button" onClick={() => setChallengeDifficulty(d)}
                    className="flex-1 text-[10px] font-semibold px-2.5 py-2 rounded-lg transition-all"
                    style={{
                      background: challengeDifficulty === d ? getDifficultyBg(d) : 'rgba(255,255,255,0.03)',
                      border: challengeDifficulty === d ? `1px solid ${getDifficultyColor(d)}30` : '1px solid rgba(255,255,255,0.06)',
                      color: challengeDifficulty === d ? getDifficultyColor(d) : '#8b95a8',
                    }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions count */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-[#8b95a8] mb-2 block">Number of Questions</label>
              <div className="flex gap-2">
                {[3, 5, 10].map(n => (
                  <button key={n} type="button" onClick={() => setChallengeQCount(n)}
                    className="flex-1 text-xs font-semibold px-3 py-2.5 rounded-lg transition-all"
                    style={{
                      background: challengeQCount === n ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.03)',
                      border: challengeQCount === n ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.06)',
                      color: challengeQCount === n ? '#00e5a0' : '#8b95a8',
                    }}>
                    {n} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => setShowNewDialog(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#8b95a8', border: '1px solid rgba(255,255,255,0.06)' }}>
                Cancel
              </button>
              <button onClick={handleSendChallenge} disabled={!selectedFriend || sending}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: selectedFriend ? 'linear-gradient(135deg, #00e5a0, #00b87a)' : 'rgba(0,229,160,0.15)',
                  color: selectedFriend ? '#0c0e14' : '#00e5a0',
                  boxShadow: selectedFriend ? '0 4px 15px rgba(0,229,160,0.25)' : 'none',
                }}>
                {sending ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...</>) : (<><Send className="w-3.5 h-3.5" /> Send Challenge</>)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
