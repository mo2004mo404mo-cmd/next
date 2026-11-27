'use client';

/**
 * LiveQuizSection — Kahoot-style multiplayer quiz synced via socket.io.
 *
 * Flow:
 *   1. Host clicks "Create live quiz" → chooses count/difficulty → calls
 *      POST /api/groups/[id]/live-quiz to build a question payload from the
 *      group's question bank.
 *   2. Host emits socket 'quiz:create' with the questions. All room members
 *      receive 'quiz:created' and can join via 'quiz:join' (lobby state).
 *   3. Host clicks "Start" → 'quiz:start' → first question is broadcast.
 *   4. Players submit answers via 'quiz:answer' (server tracks, hides answer).
 *   5. Host clicks "Reveal" (or timer auto-fires) → 'quiz:reveal' shows
 *      correctness + leaderboard.
 *   6. Host clicks "Next" → either next question or 'quiz:finished' with
 *      final leaderboard.
 *
 * State machine (client-side):
 *   idle → lobby → question → reveal → (next question) → ... → finished
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { io as socketIO, Socket } from 'socket.io-client';
import { chatSocketUrl } from '@/lib/chat-socket-url';
import {
  Loader2, Zap, Trophy, Users, Crown, Check, X, ChevronRight,
  Radio, ArrowLeft, Sparkles, Clock,
} from 'lucide-react';
import { useCurrentUser } from '@/components/medq/useCurrentUser';

const TOKENS = {
  color: {
    green: 'var(--medq-accent-green, #00e5a0)', orange: 'var(--medq-accent-amber, #f59e0b)', purple: 'var(--medq-accent-purple, #a78bfa)',
    blue: '#4fc3f7', red: 'var(--medq-accent-danger, #ff5757)', muted: '#8b95a7',
  },
};

type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  durationSec: number;
};

type Player = {
  userId: string;
  userName: string;
  score?: number;
  correctCount?: number;
  isCorrect?: boolean;
  selected?: number | null;
};

type Phase = 'idle' | 'lobby' | 'question' | 'reveal' | 'finished';

export default function LiveQuizSection({
  groupId, isAdmin,
}: {
  groupId: string;
  isAdmin: boolean;
}) {
  const { user, authHeaders } = useCurrentUser();
  const socketRef = useRef<Socket | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionTitle, setSessionTitle] = useState('Live Quiz');
  const [hostId, setHostId] = useState<string | null>(null);
  const [hostName, setHostName] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [questionCount, setQuestionCount] = useState(0);
  const [myAnswer, setMyAnswer] = useState<number | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [revealResults, setRevealResults] = useState<Player[]>([]);
  const [finalResults, setFinalResults] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup socket on mount
  useEffect(() => {
    if (!user) return;
    const socket = socketIO(chatSocketUrl(), {
      transports: ['websocket', 'polling'],
      reconnectionDelay: 3000,
    });
    socketRef.current = socket;
    socket.on('connect', () => socket.emit('identify', user.id));

    // Quiz events
    socket.on('quiz:created', (data: any) => {
      setSessionId(data.sessionId);
      setSessionTitle(data.title || 'Live Quiz');
      setHostId(data.hostId);
      setHostName(data.hostName || '');
      setQuestionCount(data.questionCount);
      setPhase('lobby');
      setPlayers([]);
      // Auto-join if I'm the host
      if (data.hostId === user.id) {
        socket.emit('quiz:join', { sessionId: data.sessionId, userId: user.id, userName: user.name || 'Host' });
      }
    });

    socket.on('quiz:state', (data: any) => {
      setSessionId(data.sessionId);
      setSessionTitle(data.title || 'Live Quiz');
      setHostId(data.hostId);
      setHostName(data.hostName || '');
      setQuestionCount(data.questionCount || 0);
      if (data.status === 'lobby') setPhase('lobby');
      // If quiz already in progress, the player sees a "started" message
    });

    socket.on('quiz:player-joined', (data: any) => {
      setPlayers(data.players || []);
    });

    socket.on('quiz:player-left', (data: any) => {
      setPlayers(prev => prev.filter(p => p.userId !== data.userId));
    });

    socket.on('quiz:question-start', (data: any) => {
      setCurrentQuestion(data.question);
      setQuestionIndex(data.questionIndex);
      setMyAnswer(null);
      setCorrectIndex(null);
      setExplanation('');
      setRevealResults([]);
      setPhase('question');
      // Start countdown
      if (timerRef.current) clearInterval(timerRef.current);
      setSecondsLeft(data.question.durationSec);
      const startedAt = data.startedAt || Date.now();
      const tick = () => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const remaining = data.question.durationSec - elapsed;
        setSecondsLeft(Math.max(0, remaining));
        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Host auto-reveals when timer expires
          if (hostId === user.id) {
            socket.emit('quiz:reveal', { sessionId: data.sessionId, userId: user.id });
          }
        }
      };
      tick();
      timerRef.current = setInterval(tick, 500);
    });

    socket.on('quiz:player-answered', (data: any) => {
      // Update players to show "answered" indicator without revealing which option
      setPlayers(prev => prev.map(p =>
        data.userId === p.userId ? { ...p, hasAnswered: true } : p
      ) as any);
    });

    socket.on('quiz:reveal', (data: any) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setCorrectIndex(data.correctIndex);
      setExplanation(data.explanation || '');
      setRevealResults(data.results || []);
      setPhase('reveal');
    });

    socket.on('quiz:finished', (data: any) => {
      setFinalResults(data.results || []);
      setPhase('finished');
    });

    socket.on('quiz:cancelled', (data: any) => {
      setError(`Quiz cancelled: ${data.reason || 'Host left'}`);
      resetState();
    });

    socket.on('quiz:error', (data: any) => {
      setError(data.message || 'Quiz error');
    });

    return () => {
      socket.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hostId]);

  function resetState() {
    setPhase('idle');
    setSessionId(null);
    setCurrentQuestion(null);
    setPlayers([]);
    setRevealResults([]);
    setFinalResults([]);
    setMyAnswer(null);
    setCorrectIndex(null);
  }

  // ── Host actions ──
  async function handleCreateQuiz(count: number, difficulty: string | undefined, source: 'group' | 'global' | 'both') {
    if (!user || !authHeaders) return;
    setCreating(true); setError(null);
    try {
      // 1) Fetch questions from the selected source(s)
      const res = await fetch(`/api/groups/${groupId}/live-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ count, difficulty, source }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to build quiz');
      }
      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        setError(data.warning || 'No questions available. Try a different source or filter.');
        return;
      }
      // 2) Emit quiz:create — server will broadcast quiz:created to all room members
      // Note: the host needs to be in the room:<roomId> for this to work, but
      // since LiveQuizSection is rendered inside GroupStudyPanel which is
      // opened FROM a chat room, we can rely on the parent chat having joined
      // the room. As a fallback, we emit and rely on the server broadcasting
      // to room:<groupId> — we use the group's linked chatRoomId.
      // For simplicity, we look up the chat room ID via the study-group endpoint.
      // The socket server uses room:<roomId>, but the GroupStudyPanel doesn't
      // know the roomId directly. We'll use the groupId as a proxy and add
      // the user to a room:group:<groupId> socket room on the server.
      // For now, we use a simpler approach: emit the quiz:create with the
      // groupId, and rely on the host's chat having already joined room:<roomId>.
      // The server's quiz:create broadcasts to room:<roomId>, so we need to
      // pass roomId. We'll fetch it.
      // Actually, the host is in the chat room (they opened the study panel
      // from it), so the socket connection has already called join:room with
      // the chat roomId. We just need to know it here.
      // For the simplest v1, let's have the host pass the groupId and the
      // server will broadcast to a "group:<groupId>" room that we join here.
      const socket = socketRef.current;
      if (!socket) return;
      // Join a group-scoped socket room so we can broadcast to all group members
      socket.emit('join:group-quiz', { groupId });
      socket.emit('quiz:create', {
        roomId: groupId, // server treats this as the room:<groupId>
        hostId: user.id,
        hostName: user.name || 'Host',
        title: `Live Quiz · ${data.questions.length} questions`,
        questions: data.questions,
      });
    } catch (e: any) {
      setError(e.message || 'Failed to create quiz');
    } finally {
      setCreating(false);
    }
  }

  function handleStart() {
    if (!sessionId || !user) return;
    socketRef.current?.emit('quiz:start', { sessionId, userId: user.id });
  }
  function handleReveal() {
    if (!sessionId || !user) return;
    if (timerRef.current) clearInterval(timerRef.current);
    socketRef.current?.emit('quiz:reveal', { sessionId, userId: user.id });
  }
  function handleNext() {
    if (!sessionId || !user) return;
    socketRef.current?.emit('quiz:next', { sessionId, userId: user.id });
  }
  function handleLeave() {
    if (!sessionId || !user) return;
    socketRef.current?.emit('quiz:leave', { sessionId, userId: user.id });
    resetState();
  }

  // ── Player actions ──
  function handleSubmitAnswer(optionIndex: number) {
    if (!sessionId || !user || myAnswer !== null) return;
    setMyAnswer(optionIndex);
    socketRef.current?.emit('quiz:answer', { sessionId, userId: user.id, optionIndex });
  }

  function handleJoinLobby() {
    if (!sessionId || !user) return;
    socketRef.current?.emit('quiz:join', { sessionId, userId: user.id, userName: user.name || 'Player' });
  }

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════

  if (!user) {
    return <div className="text-center py-12 text-xs" style={{ color: TOKENS.color.muted }}>Sign in to use Live Quiz</div>;
  }

  // ── IDLE: choose to create or wait for incoming quiz ──
  if (phase === 'idle') {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(99,102,241,0.1))' }}>
            <Zap className="w-7 h-7" style={{ color: TOKENS.color.purple }} />
          </div>
          <h3 className="text-base font-bold text-white">Live Multiplayer Quiz</h3>
          <p className="text-xs mt-1.5 max-w-md mx-auto" style={{ color: TOKENS.color.muted }}>
            Start a Kahoot-style quiz that everyone in the chat can join simultaneously.
            Pull from this group's curated question bank, the global MedQ bank, or mix both.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg text-xs" style={{ background: 'rgba(255,87,87,0.1)', color: TOKENS.color.red, border: `1px solid rgba(255,87,87,0.2)` }}>
            {error}
          </div>
        )}

        <div className="max-w-md mx-auto space-y-3">
          <QuizCreateCard onCreate={handleCreateQuiz} creating={creating} />
          <p className="text-[11px] text-center" style={{ color: TOKENS.color.muted }}>
            When another member starts a quiz, you'll see a join button here automatically.
          </p>
        </div>
      </div>
    );
  }

  // ── LOBBY ──
  if (phase === 'lobby') {
    const isHost = hostId === user.id;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={handleLeave}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold"
            style={{ color: TOKENS.color.muted, background: 'rgba(255,255,255,0.04)' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Leave
          </button>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ background: 'rgba(167,139,250,0.15)', color: TOKENS.color.purple }}>
            Lobby
          </span>
        </div>

        <div className="text-center py-6">
          <Radio className="w-10 h-10 mx-auto mb-2 animate-pulse" style={{ color: TOKENS.color.purple }} />
          <h3 className="text-lg font-bold text-white">{sessionTitle}</h3>
          <p className="text-xs mt-1" style={{ color: TOKENS.color.muted }}>
            Hosted by {hostName} · {questionCount} questions
          </p>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: TOKENS.color.muted }}>
              <Users className="w-3.5 h-3.5 inline mr-1" />
              {players.length} player{players.length !== 1 ? 's' : ''} in lobby
            </span>
          </div>
          {players.length === 0 ? (
            <p className="text-center text-xs py-3" style={{ color: TOKENS.color.muted }}>Waiting for players to join…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {players.map(p => (
                <div key={p.userId} className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {(p.userName || '?')[0]?.toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-white truncate">
                    {p.userName}
                    {p.userId === hostId && <Crown className="w-3 h-3 inline ml-1" style={{ color: TOKENS.color.orange }} />}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {isHost ? (
          <div className="flex justify-center">
            <button onClick={handleStart} disabled={players.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40"
              style={{ background: 'rgba(0,229,160,0.15)', color: TOKENS.color.green, border: '1px solid rgba(0,229,160,0.3)' }}>
              <Zap className="w-4 h-4" /> Start Quiz
            </button>
          </div>
        ) : (
          <p className="text-center text-[11px]" style={{ color: TOKENS.color.muted }}>
            Waiting for host to start the quiz…
          </p>
        )}
      </div>
    );
  }

  // ── QUESTION ──
  if (phase === 'question' && currentQuestion) {
    const isHost = hostId === user.id;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold" style={{ color: TOKENS.color.muted }}>
            Question {questionIndex + 1} / {questionCount}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: secondsLeft <= 5 ? 'rgba(255,87,87,0.15)' : 'rgba(255,255,255,0.05)' }}>
            <Clock className="w-3.5 h-3.5" style={{ color: secondsLeft <= 5 ? TOKENS.color.red : TOKENS.color.muted }} />
            <span className="text-xs font-bold" style={{ color: secondsLeft <= 5 ? TOKENS.color.red : '#fff' }}>
              {secondsLeft}s
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl text-center" style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)' }}>
          {/* Source + system/topic metadata badge */}
          {(currentQuestion as any).source || currentQuestion.system || currentQuestion.topic ? (
            <div className="flex items-center justify-center gap-1.5 mb-2 flex-wrap">
              {(currentQuestion as any).source && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1"
                  style={{
                    background: (currentQuestion as any).source === 'group' ? 'rgba(0,229,160,0.12)' : 'rgba(79,195,247,0.12)',
                    color: (currentQuestion as any).source === 'group' ? TOKENS.color.green : TOKENS.color.blue,
                    border: `1px solid ${(currentQuestion as any).source === 'group' ? 'rgba(0,229,160,0.2)' : 'rgba(79,195,247,0.2)'}`,
                  }}>
                  {(currentQuestion as any).source === 'group' ? '👥 Group bank' : '🌍 Global bank'}
                </span>
              )}
              {currentQuestion.system && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.04)', color: TOKENS.color.muted }}>
                  {currentQuestion.system}{currentQuestion.topic ? ` · ${currentQuestion.topic}` : ''}
                </span>
              )}
            </div>
          ) : null}
          <p className="text-base font-bold text-white">{currentQuestion.text}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentQuestion.options.map((opt, i) => {
            const selected = myAnswer === i;
            const colors = [
              { bg: 'rgba(255,87,87,0.1)', border: 'rgba(255,87,87,0.3)', text: TOKENS.color.red, label: 'A' },
              { bg: 'rgba(79,195,247,0.1)', border: 'rgba(79,195,247,0.3)', text: TOKENS.color.blue, label: 'B' },
              { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: TOKENS.color.orange, label: 'C' },
              { bg: 'rgba(0,229,160,0.1)', border: 'rgba(0,229,160,0.3)', text: TOKENS.color.green, label: 'D' },
            ];
            const c = colors[i % colors.length];
            return (
              <button
                key={i}
                onClick={() => handleSubmitAnswer(i)}
                disabled={myAnswer !== null || isHost}
                className="p-3 rounded-xl text-left transition-all disabled:opacity-70"
                style={{
                  background: selected ? c.bg : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected ? c.border : 'rgba(255,255,255,0.06)'}`,
                  opacity: myAnswer !== null && !selected ? 0.4 : 1,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                    style={{ background: c.bg, color: c.text }}>{c.label}</span>
                  <span className="text-xs font-semibold text-white">{opt}</span>
                  {selected && <Check className="w-4 h-4 ml-auto" style={{ color: c.text }} />}
                </div>
              </button>
            );
          })}
        </div>

        {isHost && (
          <div className="flex justify-center gap-2">
            <button onClick={handleReveal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(167,139,250,0.15)', color: TOKENS.color.purple }}>
              <ChevronRight className="w-3.5 h-3.5" /> Reveal answers
            </button>
          </div>
        )}
        {!isHost && myAnswer !== null && (
          <p className="text-center text-[11px]" style={{ color: TOKENS.color.muted }}>
            Answer locked in. Waiting for host to reveal…
          </p>
        )}
        {!isHost && myAnswer === null && (
          <p className="text-center text-[11px]" style={{ color: TOKENS.color.muted }}>
            Pick an answer above ↑
          </p>
        )}
      </div>
    );
  }

  // ── REVEAL ──
  if (phase === 'reveal') {
    const isHost = hostId === user.id;
    const myResult = revealResults.find(r => r.userId === user.id);
    return (
      <div className="space-y-4">
        <div className="text-center py-2">
          {myResult?.isCorrect ? (
            <>
              <Check className="w-12 h-12 mx-auto mb-1" style={{ color: TOKENS.color.green }} />
              <p className="text-base font-bold" style={{ color: TOKENS.color.green }}>Correct!</p>
            </>
          ) : (
            <>
              <X className="w-12 h-12 mx-auto mb-1" style={{ color: TOKENS.color.red }} />
              <p className="text-base font-bold" style={{ color: TOKENS.color.red }}>Not quite</p>
            </>
          )}
          <p className="text-xs mt-1" style={{ color: TOKENS.color.muted }}>
            Score: {myResult?.score ?? 0} pts
          </p>
        </div>

        {currentQuestion && correctIndex !== null && (
          <div className="p-3 rounded-xl" style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)' }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: TOKENS.color.green }}>Correct answer</p>
            <p className="text-xs font-semibold text-white">{currentQuestion.options[correctIndex]}</p>
            {explanation && (
              <p className="text-[11px] mt-2" style={{ color: TOKENS.color.muted }}>{explanation}</p>
            )}
          </div>
        )}

        <div>
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: TOKENS.color.muted }}>Leaderboard</p>
          <div className="space-y-1.5">
            {revealResults.slice(0, 5).map((p, i) => (
              <div key={p.userId} className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: p.userId === user.id ? 'rgba(0,229,160,0.06)' : 'rgba(255,255,255,0.02)' }}>
                <span className="w-5 text-[10px] font-mono font-bold" style={{ color: i === 0 ? TOKENS.color.orange : TOKENS.color.muted }}>
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-white flex-1">{p.userName}</span>
                {p.isCorrect && <Check className="w-3 h-3" style={{ color: TOKENS.color.green }} />}
                <span className="text-xs font-bold" style={{ color: TOKENS.color.green }}>{p.score} pts</span>
              </div>
            ))}
          </div>
        </div>

        {isHost && (
          <div className="flex justify-center">
            <button onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(0,229,160,0.15)', color: TOKENS.color.green }}>
              {questionIndex + 1 >= questionCount ? 'See final results' : 'Next question'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── FINISHED ──
  if (phase === 'finished') {
    return (
      <div className="space-y-4">
        <div className="text-center py-4">
          <Trophy className="w-14 h-14 mx-auto mb-2" style={{ color: TOKENS.color.orange }} />
          <h3 className="text-lg font-bold text-white">Quiz complete!</h3>
          <p className="text-xs mt-1" style={{ color: TOKENS.color.muted }}>
            {questionCount} questions · {finalResults.length} players
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: TOKENS.color.muted }}>Final standings</p>
          <div className="space-y-2">
            {finalResults.map((p, i) => {
              const podium = ['#FFD700', '#C0C0C0', '#CD7F32'][i] || null;
              return (
                <div key={p.userId} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: i === 0 ? 'rgba(255,215,0,0.06)' : 'rgba(255,255,255,0.02)',
                    border: i === 0 ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(255,255,255,0.04)',
                  }}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: podium ? `${podium}20` : 'rgba(255,255,255,0.05)', color: podium || TOKENS.color.muted }}>
                    {i + 1}
                  </span>
                  <span className="text-sm font-bold text-white flex-1">
                    {p.userName}
                    {i === 0 && <Crown className="w-4 h-4 inline ml-1.5" style={{ color: TOKENS.color.orange }} />}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: TOKENS.color.green }}>{p.score} pts</div>
                    <div className="text-[10px]" style={{ color: TOKENS.color.muted }}>
                      {p.correctCount}/{questionCount} correct
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={handleLeave}
            className="px-4 py-2 rounded-xl text-xs font-bold"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
            Back to quiz menu
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/* ─── Quiz Create Card (idle phase) ─── */
function QuizCreateCard({ onCreate, creating }: {
  onCreate: (count: number, difficulty: string | undefined, source: 'group' | 'global' | 'both') => void;
  creating: boolean;
}) {
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<'group' | 'global' | 'both'>('group');

  return (
    <div className="p-4 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Source selector */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Question source</label>
        <div className="grid grid-cols-3 gap-1.5 mt-1.5">
          {[
            { v: 'group' as const, l: 'Group bank', desc: 'Curated by this group', icon: '👥' },
            { v: 'global' as const, l: 'Global bank', desc: 'All MedQ questions', icon: '🌍' },
            { v: 'both' as const, l: 'Mixed', desc: 'Best of both', icon: '🔀' },
          ].map(o => (
            <button key={o.v} onClick={() => setSource(o.v)}
              className="py-2 px-2 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-0.5"
              style={{
                background: source === o.v ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                color: source === o.v ? TOKENS.color.purple : TOKENS.color.muted,
                border: `1px solid ${source === o.v ? 'rgba(167,139,250,0.3)' : 'transparent'}`,
              }}>
              <span className="text-base leading-none">{o.icon}</span>
              <span>{o.l}</span>
              <span className="text-[9px] opacity-70 font-normal">{o.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Number of questions</label>
        <div className="flex gap-1.5 mt-1.5">
          {[5, 10, 15, 20].map(n => (
            <button key={n} onClick={() => setCount(n)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: count === n ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                color: count === n ? TOKENS.color.purple : TOKENS.color.muted,
                border: `1px solid ${count === n ? 'rgba(167,139,250,0.3)' : 'transparent'}`,
              }}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Difficulty (optional)</label>
        <div className="flex gap-1.5 mt-1.5">
          {[
            { v: undefined, l: 'Any' },
            { v: 'Easy', l: 'Easy' },
            { v: 'Medium', l: 'Medium' },
            { v: 'Hard', l: 'Hard' },
          ].map(o => (
            <button key={o.l} onClick={() => setDifficulty(o.v)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: difficulty === o.v ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                color: difficulty === o.v ? TOKENS.color.purple : TOKENS.color.muted,
                border: `1px solid ${difficulty === o.v ? 'rgba(167,139,250,0.3)' : 'transparent'}`,
              }}>
              {o.l}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => onCreate(count, difficulty, source)}
        disabled={creating}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(99,102,241,0.15))', color: TOKENS.color.purple, border: '1px solid rgba(167,139,250,0.3)' }}
      >
        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        Create Live Quiz
      </button>
    </div>
  );
}
