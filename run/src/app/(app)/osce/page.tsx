'use client';

/**
 * /osce — the OSCE standardized-patient trainer.
 *
 * Flow:
 *   1. Scenario pick: seeded catalog (chest pain, hypothyroid, meningitis…)
 *      or generate a fresh one (AI) by system/difficulty/custom brief. The
 *      hidden profile (real dx, key findings, checklist) NEVER reaches this
 *      client — only /api/osce/turn and /debrief see it, server-side.
 *   2. Encounter: the patient's opening line plays (TTS) and shows. The
 *      student talks — continuous speech recognition transcribes each
 *      utterance → POST /api/osce/turn → the in-character patient reply
 *      (TTS + text). Weak questions get vague answers; targeted questions
 *      unlock findings. A text input is always available (Chrome not
 *      required / silent rooms).
 *   3. Debrief: POST /api/osce/debrief → coverage checklist hit/missed,
 *      empathy score with a quoted evidence line, red flags, model SOAP
 *      note, coaching points. Saved to OsceSession; reviewable below.
 *
 * Voice modes:
 *   • Hands-free (default when the browser supports ASR): the mic stays
 *     open for the WHOLE encounter. Each finished utterance is sent
 *     automatically; while the patient's reply is playing the recognizer
 *     is suppressed so it never transcribes the device's own speakers,
 *     then re-arms the moment speech ends. No button presses at all.
 *   • Push-to-talk: one press per utterance (tap-to-talk), for noisy rooms.
 *   • Text-only fallback: the textarea always works.
 *
 * The MiroTalk room is available alongside the AI voice encounter. Speech
 * recognition and the AI patient stay in MedQ while the room handles peer
 * video and screen sharing.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Stethoscope, Mic, MicOff, Send, Sparkles, Loader2, PhoneOff,
  ClipboardList, CheckCircle2, XCircle, AlertTriangle, RotateCcw,
  Volume2, VolumeX, History, Activity, AudioLines, Timer,
  Lightbulb, Keyboard, Ear, MessageSquareText, ChevronDown, ChevronUp,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useSpeech, useSpeechRecognition, ASR_SUPPORTED,
} from '@/components/medq/exam-sim/shared';
import OsceVoiceCall from '@/components/medq/OsceVoiceCall';

/* ── Types ── */

interface ScenarioSummary {
  id: string;
  title: string;
  system: string;
  difficulty: string;
  caseType: string;
  description: string;
}
interface Persona {
  name: string; age: number; sex: string; affect: string;
  chiefComplaint: string; openingStatement: string;
}
interface Encounter {
  sessionId: string;
  scenario: { title: string; system: string; caseType: string; difficulty: string; persona: Persona };
  opening: string;
}
interface Turn { role: 'student' | 'patient'; text: string; ts: number }
interface VoiceCall {
  url: string;
  scenarioTitle: string;
}
interface DebriefResult {
  score: number;
  coverage: string[];
  missed: string[];
  empathy: { score: number; evidence: string };
  redFlags: string[];
  soapNote: { subjective: string; objective: string; assessment: string; plan: string };
  strengths: string[];
  improvements: string[];
}

const DIFFICULTY_TONE: Record<string, string> = {
  Easy: 'text-emerald-600 border-emerald-600/40',
  Medium: 'text-amber-600 border-amber-600/40',
  Hard: 'text-red-500 border-red-500/40',
};

/** History-taking prompts for the hint rail (OPQRST & friends). */
const HISTORY_HINTS = [
  'Onset — when did it start, sudden or gradual?',
  'Provocation / palliation — what makes it worse or better?',
  'Quality — what does it feel like?',
  'Radiation — does it move anywhere?',
  'Severity — how bad, 0–10?',
  'Timing — constant or comes and goes?',
  'Screen: fever, weight loss, night sweats?',
  'Screen: smoking, meds, allergies, family history?',
];

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ── Page ── */

export default function OscePage() {
  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const [phase, setPhase] = useState<'catalog' | 'encounter' | 'debrief'>('catalog');
  const [encounter, setEncounter] = useState<Encounter | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [debrief, setDebrief] = useState<DebriefResult | null>(null);
  const [genSystem, setGenSystem] = useState('general medicine');
  const [genDifficulty, setGenDifficulty] = useState('Medium');
  const [showTranscript, setShowTranscript] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; title: string; score: number | null; createdAt: string; status: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [voiceCall, setVoiceCall] = useState<VoiceCall | null>(null);
  const [voiceRoomLoading, setVoiceRoomLoading] = useState(false);

  /* Hands-free voice state */
  const [handsFree, setHandsFree] = useState(false);
  const [ttsMuted, setTtsMuted] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const busyRef = useRef(false);
  const phaseRef = useRef(phase);
  useEffect(() => { busyRef.current = busy; }, [busy]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  const ttsMutedRef = useRef(false);
  useEffect(() => { ttsMutedRef.current = ttsMuted; }, [ttsMuted]);
  const { speak, stop: stopTTS, isSpeaking } = useSpeech({ rate: 0.95, pitch: 1, voiceURI: null }, []);

  /* ── The conversation turn: send the student line, get the patient's ── */
  const sendTurn = useCallback(async (line: string) => {
    const clean = line.trim();
    if (!clean || !encounter || busyRef.current) return;
    setBusy(true);
    setTurns((prev) => [...prev, { role: 'student', text: clean, ts: Date.now() }]);
    try {
      const res = await fetch('/api/osce/turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: encounter.sessionId, text: clean }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || 'The patient could not respond.');
        setBusy(false);
        return;
      }
      setTurns((prev) => [...prev, { role: 'patient', text: data.reply, ts: Date.now() }]);
      // Speak the reply; when TTS is done the recognizer un-suppresses and
      // the hands-free conversation simply continues.
      if (!ttsMutedRef.current) speak(data.reply);
    } catch {
      toast.error('Network error — the patient could not respond.');
    }
    setBusy(false);
  }, [encounter, speak]);

  /* ASR: continuous, self-re-arming, suppressed while the patient talks. */
  const { isRecording, interim, start, stop, setSuppress } = useSpeechRecognition(sendTurn, { continuous: true });

  // Suppress ASR while TTS plays (no headphones → the mic would otherwise
  // transcribe the patient's own voice coming out of the speakers).
  useEffect(() => {
    setSuppress(isSpeaking || busy);
  }, [isSpeaking, busy, setSuppress]);

  const toggleHandsFree = useCallback(() => {
    if (handsFree) {
      stop();
      stopTTS();
      setHandsFree(false);
    } else {
      if (!ASR_SUPPORTED) {
        toast.error('This browser does not support speech input. Use Chrome/Edge or type below.');
        return;
      }
      setHandsFree(true);
      start();
      toast.success('Hands-free on — just talk. Each pause sends your question.');
    }
  }, [handsFree, start, stop, stopTTS]);

  const beginEncounter = useCallback((data: Encounter) => {
    setEncounter(data);
    setTurns([{ role: 'patient', text: data.opening, ts: Date.now() }]);
    setDebrief(null);
    setPhase('encounter');
    if (!ttsMutedRef.current) speak(data.opening);
    if (ASR_SUPPORTED) {
      setHandsFree(true);
      setTimeout(() => { if (phaseRef.current === 'encounter') start(); }, 600);
    }
  }, [speak, start]);

  // End the mic when leaving the encounter phase.
  useEffect(() => {
    if (phase !== 'encounter' && handsFree) {
      stop();
      stopTTS();
      setHandsFree(false);
    }
  }, [phase, handsFree, stop, stopTTS]);

  /* Encounter timer */
  useEffect(() => {
    if (phase !== 'encounter') return;
    setElapsedSec(0);
    const t = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, encounter?.sessionId]);

  /* ── Voice practice room (MiroTalk) ── */
  const startVoiceEncounter = useCallback(async (scenarioId: string) => {
    if (busy) return;
    setBusy(true);
    let startedEncounter: Encounter | null = null;
    try {
      // 1. Create the session via the existing scenario route (same persona +
      //    hidden profile as the text flow).
      const startRes = await fetch('/api/osce/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', scenarioId }),
      });
      const startData = await startRes.json().catch(() => ({}));
      if (!startRes.ok) {
        toast.error(startData.error || 'Could not start the voice encounter.');
        return;
      }
      startedEncounter = {
        sessionId: startData.sessionId,
        scenario: startData.scenario,
        opening: startData.opening,
      };
      // 2. Create the peer-room link, then start the normal AI voice encounter.
      const voiceRes = await fetch('/api/osce/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: startData.sessionId }),
      });
      const voiceData = await voiceRes.json().catch(() => ({}));
      if (!voiceRes.ok) {
        toast.error(voiceData.error || 'MiroTalk is unavailable. The AI encounter can continue without the room.');
        beginEncounter(startedEncounter);
        return;
      }
      setVoiceCall({
        url: voiceData.url,
        scenarioTitle: startData.scenario.title,
      });
      beginEncounter(startedEncounter);
    } catch {
      if (startedEncounter) {
        toast.error('Could not open MiroTalk. The AI encounter can continue without the room.');
        beginEncounter(startedEncounter);
      } else {
        toast.error('Network error — could not start the encounter.');
      }
    } finally {
      setBusy(false);
    }
  }, [beginEncounter, busy]);

  const startVoiceForSession = useCallback(async (sessionId: string) => {
    if (busy || voiceRoomLoading || !encounter) return;
    setVoiceRoomLoading(true);
    try {
      const voiceRes = await fetch('/api/osce/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const voiceData = await voiceRes.json().catch(() => ({}));
      if (!voiceRes.ok) {
        toast.error(voiceData.error || 'The voice room is unavailable.');
        return;
      }
      setVoiceCall({
        url: voiceData.url,
        scenarioTitle: encounter.scenario.title,
      });
      if (ASR_SUPPORTED && !handsFree) {
        setHandsFree(true);
        setTimeout(() => { if (phaseRef.current === 'encounter') start(); }, 600);
      }
    } catch {
      toast.error('Network error — could not start the voice call.');
    } finally {
      setVoiceRoomLoading(false);
    }
  }, [busy, encounter, handsFree, start, voiceRoomLoading]);

  /* ── Loaders ── */
  useEffect(() => {
    fetch('/api/osce/scenarios')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.scenarios) setScenarios(d.scenarios); })
      .catch(() => {});
    fetch('/api/osce/history')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.sessions) setHistory(d.sessions); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns, busy, interim]);

  /* ── Actions ── */

  const startEncounter = async (scenarioId: string) => {
    setBusy(true);
    try {
      const res = await fetch('/api/osce/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', scenarioId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data.error || 'Could not start the encounter.'); return; }
      beginEncounter(data);
    } catch { toast.error('Network error — could not start.'); }
    setBusy(false);
  };

  const generateScenario = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/osce/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: genSystem, difficulty: genDifficulty }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data.error || 'Could not generate a scenario.'); return; }
      beginEncounter(data);
      toast.success(data.generated ? 'Fresh AI-generated patient' : 'Using a catalog patient (no AI provider)');
    } catch { toast.error('Network error — could not generate.'); }
    setBusy(false);
  };

  const endEncounter = async () => {
    if (!encounter) return;
    setBusy(true);
    if (handsFree) { stop(); setHandsFree(false); }
    stopTTS();
    try {
      const res = await fetch('/api/osce/debrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: encounter.sessionId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data.error || 'Debrief failed.'); setBusy(false); return; }
      setDebrief(data.result);
      setVoiceCall(null);
      setPhase('debrief');
      fetch('/api/osce/history').then((r) => (r.ok ? r.json() : null)).then((d) => { if (d?.sessions) setHistory(d.sessions); }).catch(() => {});
    } catch { toast.error('Network error — debrief failed.'); }
    setBusy(false);
  };

  const submitText = () => {
    const line = text;
    setText('');
    sendTurn(line);
  };

  const repeatLastLine = () => {
    const lastPatient = [...turns].reverse().find((t) => t.role === 'patient');
    if (lastPatient) speak(lastPatient.text);
  };

  /* ── Catalog phase ── */
  const voiceOverlay = voiceCall ? (
    <OsceVoiceCall
      url={voiceCall.url}
      scenarioTitle={voiceCall.scenarioTitle}
      turns={turns}
      handsFree={handsFree}
      isRecording={isRecording}
      isBusy={busy}
      isSpeaking={isSpeaking}
      interim={interim}
      onToggleHandsFree={toggleHandsFree}
      onSendText={sendTurn}
      onClose={() => setVoiceCall(null)}
    />
  ) : null;

  if (phase === 'catalog') {
    return (
      <>
      {voiceOverlay}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <header className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">OSCE Trainer</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Practice standardized-patient encounters by voice. Take a focused history, talk to the patient,
              and get an examiner-grade debrief: coverage checklist, empathy score, red flags, and a model SOAP note.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1"><Ear className="w-3 h-3" /> Speak hands-free</span>
              <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1"><AudioLines className="w-3 h-3" /> MiroTalk practice room</span>
              <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1"><ClipboardList className="w-3 h-3" /> Examiner debrief</span>
            </div>
          </div>
        </header>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Patient catalog</h2>
            <span className="text-xs text-muted-foreground">{scenarios.length} scenarios</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {scenarios.map((s) => (
              <div
                key={s.id}
                className="group text-left rounded-xl border bg-card p-4 hover:border-emerald-500/50 transition-colors cursor-pointer flex flex-col"
                onClick={() => startEncounter(s.id)}
              >
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-semibold">{s.title}</span>
                  <Badge variant="secondary">{s.system}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="outline" className={DIFFICULTY_TONE[s.difficulty] ?? ''}>{s.difficulty}</Badge>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{s.caseType}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{s.description || s.caseType}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 text-xs"
                    disabled={busy}
                    onClick={(e) => {
                      e.stopPropagation();
                      startEncounter(s.id);
                    }}
                  >
                    <MessageSquareText className="w-3.5 h-3.5" /> Talk
                  </Button>
                  <button
                    className="ml-auto inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                    title="Start an AI voice encounter with an optional MiroTalk practice room"
                    disabled={busy}
                    onClick={(e) => {
                      e.stopPropagation();
                      startVoiceEncounter(s.id);
                    }}
                  >
                    <AudioLines className="w-3.5 h-3.5" /> Practice room
                  </button>
                </div>
              </div>
            ))}
            {scenarios.length === 0 && (
              <p className="text-sm text-muted-foreground">Loading scenarios…</p>
            )}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-lg font-semibold">Generate a new patient</h2>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              value={genSystem}
              onChange={(e) => setGenSystem(e.target.value)}
              placeholder="System (e.g. cardiology, pediatrics)"
              className="rounded-lg border bg-background px-3 py-2 text-sm flex-1 min-w-40"
            />
            <select
              value={genDifficulty}
              onChange={(e) => setGenDifficulty(e.target.value)}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            >
              {['Easy', 'Medium', 'Hard'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <Button onClick={generateScenario} disabled={busy}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            The AI writes the persona, the hidden diagnosis, the findings map (what good questions unlock), and the
            grading checklist — the diagnosis stays hidden from you until the debrief.
          </p>
        </section>

        {history.length > 0 && (
          <section className="rounded-xl border bg-card p-4">
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => setShowHistory((v) => !v)}
            >
              <History className="w-4 h-4" />
              <span className="font-semibold">Past sessions ({history.length})</span>
              {showHistory ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showHistory && (
              <ul className="mt-3 space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="flex items-center gap-3 text-sm">
                    <span className="flex-1 truncate">{h.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(h.createdAt).toLocaleString()}
                    </span>
                    {h.score != null ? (
                      <Badge variant={h.score >= 70 ? 'default' : 'secondary'}>{h.score}/100</Badge>
                    ) : (
                      <Badge variant="outline">{h.status}</Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
      </>
    );
  }

  /* ── Encounter phase ── */
  if (phase === 'encounter' && encounter) {
    const persona = encounter.scenario.persona;
    const questionsAsked = turns.filter((t) => t.role === 'student').length;
    return (
      <>
      {voiceOverlay}
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col h-[calc(100vh-4rem)] gap-4 lg:flex-row">
        {/* ── Main conversation column ── */}
        <div className="flex-1 min-w-0 flex flex-col rounded-2xl border bg-card overflow-hidden">
          {/* header */}
          <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
            <div className="relative w-11 h-11 rounded-full bg-emerald-600/10 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              {(isSpeaking || busy) && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{encounter.scenario.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {persona.name}, {persona.age}yo {persona.sex} · {persona.affect} · CC: {persona.chiefComplaint}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums border rounded-lg px-2.5 py-1.5">
              <Timer className="w-3.5 h-3.5" /> {formatClock(elapsedSec)}
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground border rounded-lg px-2.5 py-1.5">
              <Activity className="w-3.5 h-3.5" /> {questionsAsked} questions
            </div>
            <Button variant="secondary" size="sm" onClick={() => startVoiceForSession(encounter.sessionId)} disabled={busy || voiceRoomLoading} title="Open MiroTalk alongside the AI voice encounter">
              {voiceRoomLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <AudioLines className="w-4 h-4" />}
              <span className="hidden sm:inline">{voiceRoomLoading ? 'Opening room…' : 'Practice room'}</span>
            </Button>
            <Button variant="destructive" size="sm" onClick={endEncounter} disabled={busy}>
              {busy && phase ? <Loader2 className="w-4 h-4 animate-spin" /> : <PhoneOff className="w-4 h-4" />}
              <span className="hidden sm:inline">End &amp; debrief</span>
            </Button>
          </div>

          {/* transcript */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-4">
            {turns.map((t, i) => (
              <div key={i} className={`flex ${t.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${t.role === 'student' ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}>
                  {t.text}
                </div>
              </div>
            ))}
            {(busy || isSpeaking) && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> {persona.name} is {isSpeaking ? 'speaking…' : 'thinking…'}
                </div>
              </div>
            )}
            {handsFree && isRecording && interim && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-emerald-600/40 text-emerald-200 border border-emerald-600/40 rounded-br-sm italic">
                  {interim}
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="p-3 border-t bg-muted/30 space-y-2">
            <div className="flex gap-2 items-end">
              {/* Hands-free mic toggle — the primary control */}
              <Button
                size="icon"
                variant={handsFree ? 'default' : 'secondary'}
                onClick={toggleHandsFree}
                title={handsFree ? 'Turn hands-free off' : 'Hands-free: talk naturally, pauses send'}
                className={handsFree ? 'relative' : ''}
              >
                {handsFree ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {handsFree && isRecording && (
                  <span className="absolute inset-0 rounded-md animate-pulse bg-emerald-400/20 pointer-events-none" />
                )}
              </Button>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitText(); }
                }}
                placeholder={handsFree ? 'Hands-free is on — or type here…' : 'Type your question to the patient… (Enter to send)'}
                className="flex-1 resize-none min-h-11 max-h-40 bg-background"
                rows={1}
              />
              <Button size="icon" onClick={submitText} disabled={!text.trim() || busy} title="Send">
                <Send className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                title={ttsMuted ? 'Unmute patient voice' : 'Mute patient voice'}
                onClick={() => { setTtsMuted((m) => !m); if (!ttsMuted) stopTTS(); }}
              >
                {ttsMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                title="Repeat the patient's last line"
                onClick={repeatLastLine}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              {handsFree ? (
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <Ear className="w-3 h-3" />
                  {isSpeaking ? 'Patient speaking — mic paused' : isRecording ? 'Listening — pause to send' : 'Re-arming mic…'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Keyboard className="w-3 h-3" /> Text mode — enable the mic for hands-free talk
                </span>
              )}
              <button
                className="ml-auto hover:text-foreground flex items-center gap-1"
                onClick={() => setShowTranscript((v) => !v)}
              >
                <Activity className="w-3 h-3" />
                {showTranscript ? 'Hide' : 'Show'} transcript ({turns.length})
              </button>
            </div>
            {showTranscript && (
              <div className="max-h-32 overflow-y-auto text-xs text-muted-foreground rounded-lg border bg-background p-2 space-y-1">
                {turns.map((t, i) => (
                  <div key={i}><b>{t.role === 'student' ? 'You' : persona.name}:</b> {t.text}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Hint rail (desktop) ── */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4">
          <div className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
              <Lightbulb className="w-4 h-4 text-amber-500" /> History-taking scaffold
            </div>
            <ul className="text-xs text-muted-foreground space-y-2">
              {HISTORY_HINTS.map((h) => <li key={h} className="flex gap-1.5"><span className="text-amber-500">•</span>{h}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-4 text-xs text-muted-foreground space-y-2">
            <div className="text-sm font-semibold text-foreground">How the encounter works</div>
            <p>Ask questions one at a time — the patient answers in character. Targeted questions unlock findings; vague ones get vague answers.</p>
            <p>Covered questions feed the debrief checklist. Red flags you miss are called out at the end.</p>
            <p>The AI patient listens through MedQ and replies here while MiroTalk provides an optional peer room for video or screen sharing.</p>
          </div>
        </aside>
      </div>
      </>
    );
  }

  /* ── Debrief phase ── */
  const scoreTone = debrief && debrief.score >= 70 ? 'text-emerald-600' : debrief && debrief.score >= 50 ? 'text-amber-600' : 'text-red-500';
  return (
    <>
    {voiceOverlay}
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Debrief — {encounter?.scenario.title}</h1>
          <p className="text-sm text-muted-foreground">Examiner report generated from the full encounter.</p>
        </div>
      </header>

      {debrief && (
        <>
          <div className="rounded-xl border bg-card p-5 flex items-center gap-6">
            <div className={`text-5xl font-bold tabular-nums ${scoreTone}`}>{debrief.score}</div>
            <div className="flex-1 space-y-1.5">
              <div className="text-sm font-medium">Composite score</div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${debrief.score >= 70 ? 'bg-emerald-500' : debrief.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${debrief.score}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Empathy {debrief.empathy.score}/10 · {turns.filter((t) => t.role === 'student').length} questions asked
              </div>
            </div>
          </div>

          {debrief.empathy.evidence && (
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                <Stethoscope className="w-4 h-4 text-emerald-600" /> Empathy — {debrief.empathy.score}/10
              </div>
              <p className="text-sm text-muted-foreground italic">&ldquo;{debrief.empathy.evidence}&rdquo;</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Covered ({debrief.coverage.length})
              </div>
              <ul className="text-sm space-y-1.5">
                {debrief.coverage.map((c, i) => <li key={i} className="flex gap-2"><span className="text-emerald-600">✓</span>{c}</li>)}
                {debrief.coverage.length === 0 && <li className="text-muted-foreground">Nothing covered — retry with targeted questions.</li>}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                <XCircle className="w-4 h-4 text-red-500" /> Missed ({debrief.missed.length})
              </div>
              <ul className="text-sm space-y-1.5">
                {debrief.missed.map((c, i) => <li key={i} className="flex gap-2"><span className="text-red-500">✗</span>{c}</li>)}
                {debrief.missed.length === 0 && <li className="text-muted-foreground">Full coverage!</li>}
              </ul>
            </div>
          </div>

          {debrief.redFlags.length > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-red-600">
                <AlertTriangle className="w-4 h-4" /> Red flags missed
              </div>
              <ul className="text-sm space-y-1">
                {debrief.redFlags.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <div className="text-sm font-semibold">Model SOAP note</div>
            <div className="grid gap-4 md:grid-cols-2">
              {(['subjective', 'objective', 'assessment', 'plan'] as const).map((k) => (
                <div key={k} className="rounded-lg bg-muted/40 p-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
                  <p className="text-sm mt-1">{debrief.soapNote[k]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <div className="text-sm font-semibold mb-2 text-emerald-600">Strengths</div>
              <ul className="text-sm space-y-1.5">{debrief.strengths.map((s, i) => <li key={i} className="flex gap-2"><span className="text-emerald-600">+</span>{s}</li>)}</ul>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="text-sm font-semibold mb-2 text-amber-600">Coaching points</div>
              <ul className="text-sm space-y-1.5">{debrief.improvements.map((s, i) => <li key={i} className="flex gap-2"><span className="text-amber-600">→</span>{s}</li>)}</ul>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3">
        <Button onClick={() => { setPhase('catalog'); setEncounter(null); setDebrief(null); setTurns([]); }}>
          <RotateCcw className="w-4 h-4" /> New encounter
        </Button>
        {encounter && (
          <Button variant="outline" onClick={() => setPhase('encounter')}>
            Back to transcript
          </Button>
        )}
      </div>
    </div>
    </>
  );
}
