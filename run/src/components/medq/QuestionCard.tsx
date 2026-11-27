'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Download, FileJson, FileText, FileCode, BookOpen, CheckCircle2, XCircle, AlertCircle, Loader2, Sparkles, Volume2, Headphones, Bookmark, BookmarkCheck, StickyNote, ChevronDown, ChevronRight as ChevronRightIcon, Lightbulb, Coins, MessageCircle, ThumbsUp, Send, Flag, X, Video, Box, Share2, ShieldCheck, Link2, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { downloadSingleQuestionJSON, downloadSingleQuestionPDF, exportAsHtml, downloadReferenceSheet } from '@/lib/download-utils';
import { evaluateShortAnswerOffline, type OfflineEvaluationResult } from '@/lib/offline-ai-engine';
import { browserAI, type EvaluationResult, type ModelStatus } from '@/lib/browser-ai';
import { DiagramRenderer, type DiagramSpec } from '@/lib/diagram-renderer';
import { MolecularIllustrator, type MolSpec } from '@/lib/molecular-illustrator';
import { useSettings } from '@/components/medq/SettingsContext';
import { useSubscription } from '@/components/medq/SubscriptionContext';
import AIClinicalReasoning from '@/components/medq/AIClinicalReasoning';
import { subscribeToReplayForPath } from '@/lib/offline-queue';
import type { Question as MedQQuestion } from '@/lib/medq-types';
import ShareQuestionDialog from '@/components/medq/ShareQuestionDialog';
import SourceViewerModal from '@/components/medq/SourceViewerModal';
import {
  LabPanelTable,
  EcgStrip,
  HotspotImage,
  StructureTagChips,
  WaveformAudioPlayer,
  ConfidenceBar,
  parseQuestionJson,
  type Hotspot,
  type StructureTag,
  type PcgSpec,
  type LabPanelData,
  type ConfidenceLevel,
} from '@/components/medq/question-media';

type Question = MedQQuestion & {
  diagramSpec?: string | Record<string, unknown>;
  molecularScenes?: string | Record<string, unknown>;
  sources?: string | Array<{ type: string; title: string }>;
};

/** Parsed advanced citation: the exact library passage that grounded a question. */
interface QuestionCitation {
  sourceId: string;
  chunkId: string;
  documentId?: string;
  title: string;
  fileKind?: string;
  /** Answer-anchored quote — the viewer's default (narrow) highlight scope. */
  quote?: string;
  /** Full chunk content, inline — the viewer's "full chunk" highlight scope. */
  chunkContent?: string;
  /** Verification pipeline evidence (answer-support judge / token coverage). */
  answerCoverage?: number;
  judgeScore?: number;
}

/* ── Citation trust level — surfaced as a badge so learners can SEE how
   strong the evidence behind each citation is (the verification pipeline
   stores judgeScore/answerCoverage on every citation it writes).
   verified: judge ≥ 8 AND coverage ≥ 50% — the passage states the tested fact.
   supported: judge ≥ 6 — related, but weaker answer evidence.
   reference: legacy / unscored citation. ── */
type CitationTrust = 'verified' | 'supported' | 'reference';
function citationTrust(c: QuestionCitation): CitationTrust {
  const js = typeof c.judgeScore === 'number' ? c.judgeScore : null;
  const cov = typeof c.answerCoverage === 'number' ? c.answerCoverage : null;
  if (js == null) return 'reference';
  if (js >= 8 && (cov == null || cov >= 0.5)) return 'verified';
  if (js >= 6) return 'supported';
  return 'reference';
}
function trustTitle(c: QuestionCitation): string {
  const parts: string[] = [];
  if (typeof c.judgeScore === 'number') parts.push(`answer-support judge ${c.judgeScore}/10`);
  if (typeof c.answerCoverage === 'number') parts.push(`answer-token coverage ${Math.round(c.answerCoverage * 100)}%`);
  return parts.length ? `Verification evidence — ${parts.join(' · ')}` : 'Legacy citation (no verification scores)';
}

interface QuestionCardProps {
  question: Question;
  index?: number;
  /** If true, auto-reveal is disabled (used in exam mode) */
  noAutoReveal?: boolean;
  /** If true, answer is always revealed (used in results) */
  forceRevealed?: boolean;
  /** Where the attempt is recorded from — feeds adaptive difficulty calibration. */
  attemptMode?: string;
  /** Notifies the parent when the user selects an option (exam runner needs this). */
  onSelectedChange?: (value: string | null) => void;
  /** Pre-select an option (exam runner restores saved selections on remount). */
  initialSelected?: string | null;
  /** Deep link (?cite=N): auto-open this citation (clamped) once the card
   * mounts — used by /bank?q=<id>&cite=<i> links that jump straight to the
   * cited passage in the original file. */
  initialCitationIndex?: number;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

/**
 * Strip HTML tags and return plain text for comparison purposes
 */
function stripHtmlForCompare(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Strip option letter prefix (e.g. "A. ", "b) ", "C ") for comparison purposes
 */
function stripOptionPrefix(text: string): string {
  return text
    .replace(/^[a-eA-E][)\.]\s+/, '')  // "A. " or "b) " (requires space after separator, NOT "A word")
    .trim();
}

/**
 * Normalize text for answer comparison - strips HTML and option prefixes
 */
function normalizeForCompare(text: string): string {
  return stripHtmlForCompare(stripOptionPrefix(text));
}

export default function QuestionCard({ question, index, noAutoReveal, forceRevealed, attemptMode, onSelectedChange, initialSelected, initialCitationIndex }: QuestionCardProps) {
  const initialState = useMemo(() => ({
    selected: (initialSelected ?? null) as string | null,
    revealed: forceRevealed || false,
    shortInput: '',
  }), [forceRevealed, initialSelected, question.id]);

  const [selected, setSelected] = useState<string | null>(initialState.selected);
  const [revealed, setRevealed] = useState(initialState.revealed);
  const [shortInput, setShortInput] = useState(initialState.shortInput);
  const [isVisible, setIsVisible] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [hintPurchasing, setHintPurchasing] = useState(false);
  const [downloading, setDownloading] = useState<'json' | 'pdf' | 'html' | 'refsheet' | null>(null);
  const [generatingIllustration, setGeneratingIllustration] = useState(false);
  const [aiIllustrationUrl, setAiIllustrationUrl] = useState<string | null>(question.imageUrl || null);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(question.audioUrl || null);

  // ── Advanced citations: click a citation chip → the source viewer opens
  // scrolled to + highlighting the exact passage that grounded this question.
  // INDEX state (not object): the modal gets the whole citation list so it
  // can step ‹ › between citations without closing. ──
  const parsedCitations = useMemo<QuestionCitation[]>(() => {
    try {
      const raw = (question as MedQQuestion & { citations?: string }).citations;
      if (!raw) return [];
      const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!Array.isArray(arr)) return [];
      return arr.filter(
        (c): c is QuestionCitation =>
          c && typeof c.sourceId === 'string' && typeof c.chunkId === 'string',
      ).slice(0, 5);
    } catch {
      return [];
    }
  }, [question]);
  // Deep link (?cite=N) — start with the linked citation OPEN (lazy init, so
  // /bank?q=<id>&cite=<i> lands directly on the cited passage; clamped).
  const [citationIdx, setCitationIdx] = useState(() =>
    initialCitationIndex != null && parsedCitations.length > 0
      ? Math.max(0, Math.min(initialCitationIndex, parsedCitations.length - 1))
      : -1
  );
  const activeCitation = citationIdx >= 0 ? parsedCitations[citationIdx] : undefined;
  /** Citations whose evidence passed the verified bar (judge ≥ 8, ≥ 50% coverage). */
  const verifiedCitationCount = useMemo(
    () => parsedCitations.filter((c) => citationTrust(c) === 'verified').length,
    [parsedCitations],
  );

  /* ── Citation deep links — a URL that re-opens THIS question with THIS
     citation highlighted (/bank?q=<id>&cite=<i>). Copied from the chips and
     from the source viewer; the bank page consumes it on mount. ── */
  const [copiedCitation, setCopiedCitation] = useState<number | null>(null);
  const buildCitationLink = useCallback(
    (i: number) => `${window.location.origin}/bank?q=${encodeURIComponent(question.id)}&cite=${i}`,
    [question.id],
  );
  const copyCitationLink = useCallback(
    async (i: number) => {
      const url = buildCitationLink(i);
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Fallback for non-secure contexts / older browsers
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch { /* ignore */ }
        ta.remove();
      }
      setCopiedCitation(i);
      toast.success('Citation link copied — reopens this exact passage');
      setTimeout(() => setCopiedCitation((cur) => (cur === i ? null : cur)), 1800);
    },
    [buildCitationLink],
  );

  // Deep link (?cite=N) is consumed by the lazy citationIdx initializer above.

  // ── Confidence rating (metacognition) + attempt recording for adaptive difficulty ──
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const mountedAtRef = useRef(Date.now());
  const attemptRecordedRef = useRef(false);
  const [shareOpen, setShareOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { settings } = useSettings();
  const { credits, refresh: refreshCredits } = useSubscription();

  // ── Agent media flags ──
  // Stem audio: the audio is PART OF the question (listening exercise) when the
  // stem references it (agent questions include a 🔊 cue).
  const stemAudioUrl = audioUrl && /🔊|listen to the audio/i.test(question.text) ? audioUrl : null;
  const questionVideoUrl = question.videoUrl || null;
  const questionModelUrl = question.modelUrl || null;

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Sound effects when answer is revealed
  const prevRevealed = useRef(revealed);
  useEffect(() => {
    if (revealed && !prevRevealed.current && selected) {
      if (settings.soundEffects) {
        import('@/components/medq/SettingsContext').then(({ playSound }) => {
          const isCorrectAnswer = isCorrect(selected);
          playSound(isCorrectAnswer ? 'correct' : 'wrong');
        });
      }
      // Auto-play audio when answer is revealed (if setting is enabled and audio exists)
      if (settings.autoPlayAudio && audioUrl) {
        setTimeout(() => {
          audioRef.current?.play().catch(() => {/* autoplay blocked by browser */});
        }, 300);
      }
    }
    prevRevealed.current = revealed;
  }, [revealed, selected, settings.soundEffects, settings.autoPlayAudio, audioUrl]);

  // Notes state
  const [noteText, setNoteText] = useState('');
  const [noteLoaded, setNoteLoaded] = useState(false);
  const [noteSaving, setNoteSaving] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const noteSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Discussion state
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [discussions, setDiscussions] = useState<Array<{ id: string; content: string; likes: number; isExpert: boolean; createdAt: string; user: { id: string; name: string; avatar: string | null; role: string } }>>([]);
  const [discussionTotal, setDiscussionTotal] = useState(0);
  const [discussionInput, setDiscussionInput] = useState('');
  const [discussionLoading, setDiscussionLoading] = useState(false);
  const [discussionSubmitting, setDiscussionSubmitting] = useState(false);

  // Report state
  const [reportStatus, setReportStatus] = useState<'unchecked' | 'reported' | 'not-reported'>('unchecked');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>('');
  const [reportComment, setReportComment] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);

  // Answer evaluation state
  const [evaluation, setEvaluation] = useState<OfflineEvaluationResult | EvaluationResult | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [evalMethod, setEvalMethod] = useState<'keyword' | 'ai' | null>(null);
  const [aiModelStatus, setAiModelStatus] = useState<ModelStatus>(browserAI.getModelStatus());

  // Refs for diagram and molecular rendering
  const diagramRef = useRef<HTMLDivElement>(null);
  const molecularRef = useRef<HTMLDivElement>(null);

  // Parse and validate diagramSpec
  const parsedDiagramSpec = useMemo(() => {
    if (!question.diagramSpec) return null;
    try {
      // Handle both string (from /api/questions) and object (from /api/generate) formats
      const raw = question.diagramSpec;
      const spec = (typeof raw === 'string' ? JSON.parse(raw) : raw) as DiagramSpec;
      // Only return if it has actual nodes
      if (spec && spec.nodes && spec.nodes.length >= 2 && spec.edges && spec.edges.length >= 1) {
        return spec;
      }
      return null;
    } catch {
      console.warn('Failed to parse diagramSpec');
      return null;
    }
  }, [question.diagramSpec]);

  // Parse and validate molecularScenes
  const parsedMolecularScenes = useMemo(() => {
    if (!question.molecularScenes) return null;
    try {
      // Handle both string (from /api/questions) and object (from /api/generate) formats
      const raw = question.molecularScenes;
      const spec = (typeof raw === 'string' ? JSON.parse(raw) : raw) as MolSpec;
      // Only return if it has actual scenes
      if (spec && spec.scenes && spec.scenes.length >= 1) {
        return spec;
      }
      return null;
    } catch {
      console.warn('Failed to parse molecularScenes');
      return null;
    }
  }, [question.molecularScenes]);
  const parsedSources = useMemo(() => {
    try {
      const raw = question.sources;
      if (!raw) return [];
      // Handle both string and already-parsed array formats
      const s = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return Array.isArray(s) ? s : [];
    } catch { return []; }
  }, [question.sources]);

  // ── Enhanced agent media: lab panel / phonocardiogram / hotspots / structure tags ──
  const isEcgImage = Boolean(question.imageUrl && question.imageUrl.startsWith('/generated/agent/ecg/'));
  const parsedLabPanel = useMemo(
    () => parseQuestionJson<LabPanelData[]>(question.labPanel, []).filter((p) => p && Array.isArray(p.rows) && p.rows.length),
    [question.labPanel],
  );
  const parsedPcgSpec = useMemo(() => {
    const spec = parseQuestionJson<PcgSpec | null>(question.pcgSpec, null);
    return spec && spec.phase ? spec : null;
  }, [question.pcgSpec]);
  const parsedHotspots = useMemo(
    () => parseQuestionJson<Hotspot[]>(question.hotspots, []).filter((h) => h && h.label),
    [question.hotspots],
  );
  const parsedStructureTags = useMemo(
    () => parseQuestionJson<StructureTag[]>(question.structureTags, []).filter((t) => t && t.name),
    [question.structureTags],
  );

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Reset hint state when question changes
  useEffect(() => {
    setHintUsed(false);
    setEliminatedIndices([]);
    setHintPurchasing(false);
    setReportStatus('unchecked');
    setReportDialogOpen(false);
    setReportReason('');
    setReportComment('');
    setConfidence(null);
    attemptRecordedRef.current = false;
    mountedAtRef.current = Date.now();
  }, [question.id]);

  // Load bookmark status on mount
  useEffect(() => {
    const loadBookmark = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.ok) {
          const data = await res.json();
          const ids = (data.bookmarks as Array<{ questionId: string }>).map((b) => b.questionId);
          setIsBookmarked(ids.includes(question.id));
        }
      } catch {
        // silently fail
      }
    };
    loadBookmark();
  }, [question.id]);

  // Load report status on mount
  useEffect(() => {
    const loadReportStatus = async () => {
      try {
        const res = await fetch(`/api/questions/report?questionId=${question.id}`);
        if (res.ok) {
          const data = await res.json();
          setReportStatus(data.reported ? 'reported' : 'not-reported');
        } else {
          setReportStatus('not-reported');
        }
      } catch {
        setReportStatus('not-reported');
      }
    };
    loadReportStatus();
  }, [question.id]);

  // Load note on mount
  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await fetch(`/api/notes?questionId=${question.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.note?.note) {
            setNoteText(data.note.note);
          }
        }
      } catch {
        // silently fail
      }
      setNoteLoaded(true);
    };
    loadNote();
  }, [question.id]);

  // ── Offline queue: refetch bookmark + note when queued writes are replayed ──
  // When the SW successfully replays a queued POST/DELETE to /api/bookmarks or
  // /api/notes (i.e. the user toggled the bookmark or saved a note while
  // offline), we refetch both states so the UI reflects the server's truth.
  useEffect(() => {
    const refetchBookmark = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.ok) {
          const data = await res.json();
          const ids = (data.bookmarks as Array<{ questionId: string }>).map((b) => b.questionId);
          setIsBookmarked(ids.includes(question.id));
        }
      } catch { /* ignore */ }
    };
    const refetchNote = async () => {
      try {
        const res = await fetch(`/api/notes?questionId=${question.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.note?.note) {
            setNoteText(data.note.note);
          } else {
            setNoteText('');
          }
        }
      } catch { /* ignore */ }
      setNoteLoaded(true);
    };
    const unsubBookmarks = subscribeToReplayForPath('/api/bookmarks', refetchBookmark);
    const unsubNotes = subscribeToReplayForPath('/api/notes', refetchNote);
    return () => {
      unsubBookmarks();
      unsubNotes();
    };
  }, [question.id]);

  // Subscribe to AI model status changes
  useEffect(() => {
    const unsub = browserAI.subscribe(() => {
      setAiModelStatus(browserAI.getModelStatus());
    });
    return unsub;
  }, []);

  // Diagram rendering
  useEffect(() => {
    if (revealed && diagramRef.current && parsedDiagramSpec) {
      try {
        const renderer = new DiagramRenderer(diagramRef.current, { animate: true });
        renderer.render(parsedDiagramSpec);
        return () => renderer.destroy();
      } catch (err) {
        console.warn('DiagramRenderer error:', err);
      }
    }
  }, [revealed, parsedDiagramSpec]);

  // Molecular illustration rendering
  useEffect(() => {
    if (revealed && molecularRef.current && parsedMolecularScenes) {
      try {
        const illustrator = new MolecularIllustrator(molecularRef.current);
        illustrator.render(parsedMolecularScenes);
        setTimeout(() => illustrator.animate(), 300);
        return () => illustrator.destroy();
      } catch (err) {
        console.warn('MolecularIllustrator error:', err);
      }
    }
  }, [revealed, parsedMolecularScenes]);

  const handleSelect = useCallback(
    (value: string) => {
      if (revealed) return;
      setSelected(value);
      onSelectedChange?.(value);
      // Keep the keyboard flow alive: move focus off the clicked option button
      // onto the card root so [Enter] (reveal) and [S] (sources) keep working.
      rootRef.current?.focus({ preventScroll: true });
      if (noAutoReveal) return;
      // Confidence-first flow (metacognition): the answer is revealed only after
      // the user rates their confidence (or skips the prompt).
    },
    [revealed, noAutoReveal, onSelectedChange]
  );

  /** Fire-and-forget attempt recording — feeds the adaptive difficulty calibrator. */
  const recordAttempt = useCallback(
    (level: ConfidenceLevel | null) => {
      if (attemptRecordedRef.current || !selected) return;
      attemptRecordedRef.current = true;
      const timeSpent = Math.max(1, Math.round((Date.now() - mountedAtRef.current) / 1000));
      fetch('/api/questions/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          selectedAnswer: selected,
          confidence: level || '',
          timeSpent,
          mode: attemptMode || 'bank',
        }),
      }).catch(() => {
        /* guest / offline — best effort only */
      });
    },
    [selected, question.id, attemptMode],
  );

  const revealWithConfidence = useCallback(
    (level: ConfidenceLevel | null) => {
      setConfidence(level);
      recordAttempt(level);
      setRevealed(true);
    },
    [recordAttempt],
  );

  // Safety net: if the answer gets revealed without the confidence prompt
  // (e.g. legacy flows), still record the attempt once.
  useEffect(() => {
    if (revealed && selected && !noAutoReveal) recordAttempt(null);
  }, [revealed, selected, noAutoReveal, recordAttempt]);

  const handleRevealShort = useCallback(() => {
    setSelected(shortInput || '—');
    if (noAutoReveal) return;
    // Instant reveal
    setRevealed(true);
  }, [shortInput, noAutoReveal]);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);



  /* ─── Evaluate short answer with keyword matching (instant, always works) ─── */
  const handleKeywordEval = useCallback(() => {
    if (!shortInput.trim()) {
      toast.error('Please type an answer first');
      return;
    }
    setEvaluating(true);
    setEvalMethod('keyword');
    // Small delay for UX feel
    setTimeout(() => {
      const result = evaluateShortAnswerOffline(question.text, question.answer, shortInput);
      setEvaluation(result);
      setEvaluating(false);
    }, 300);
  }, [question.text, question.answer, shortInput]);

  /* ─── Evaluate short answer with browser AI (if model loaded) ─── */
  const handleAiEval = useCallback(async () => {
    if (!shortInput.trim()) {
      toast.error('Please type an answer first');
      return;
    }
    if (!browserAI.isModelLoaded()) {
      toast.error('No AI model loaded. Download a model from the Generate tab first.');
      return;
    }
    setEvaluating(true);
    setEvalMethod('ai');
    try {
      const result = await browserAI.evaluateShortAnswer(question.text, question.answer, shortInput);
      setEvaluation(result);
    } catch {
      // Fallback to keyword evaluation
      const fallback = evaluateShortAnswerOffline(question.text, question.answer, shortInput);
      setEvaluation(fallback);
      setEvalMethod('keyword');
      toast.info('AI evaluation failed, used keyword matching instead');
    } finally {
      setEvaluating(false);
    }
  }, [question.text, question.answer, shortInput]);
  /* ────────────────────────────────────────────────────────────────────────────
     KEYBOARD-FIRST STUDY FLOW — the card is a focusable study surface:
       [1-4] / [A-D]  select an option (MCQ)          [T] / [F]  answer True/False
       [Enter]        reveal (skips confidence)       [S]        open Sources & Evidence
     Focus moves back to the card root after selecting, so Enter flows naturally.
     While the source viewer is open IT owns the keys (← → step citations, Esc).
     Only the FOCUSED card reacts — a page of cards never fights over keys. ── */
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [cardFocused, setCardFocused] = useState(false);
  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (citationIdx >= 0) return; // source viewer open — it owns ← → Esc
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) return;

      const key = e.key;
      const isMCQ = question.type === 'mcq';
      const isTF = question.type === 'tf';

      // 1-4 / A-D (MCQ) and T / F (true-false) — select an option
      if (!revealed && (isMCQ || isTF)) {
        let option: string | null = null;
        if (isTF) {
          if (key === 't' || key === 'T' || key === '1') option = 'True';
          else if (key === 'f' || key === 'F' || key === '2') option = 'False';
        } else {
          let idx = -1;
          if (/^[1-9]$/.test(key)) idx = Number(key) - 1;
          else if (/^[a-dA-D]$/.test(key)) idx = key.toLowerCase().charCodeAt(0) - 97;
          if (idx >= 0 && idx < question.options.length) option = question.options[idx];
        }
        if (option) {
          e.preventDefault();
          handleSelect(option);
          rootRef.current?.focus({ preventScroll: true });
          return;
        }
      }

      // Enter — reveal the answer (MCQ/TF, skips the confidence prompt) or
      // evaluate the typed short answer. When a button inside the card holds
      // focus, the browser's native Enter-click wins (no double action).
      if (key === 'Enter') {
        if (target?.closest('button, a, [role="button"]')) return;
        if (question.type === 'short') {
          if (shortInput.trim()) {
            e.preventDefault();
            handleKeywordEval();
          }
          return;
        }
        if (selected && !revealed && !noAutoReveal) {
          e.preventDefault();
          revealWithConfidence(null);
        }
        return;
      }

      // S — open Sources & Evidence (first citation) straight from the keyboard
      if (key === 's' || key === 'S') {
        if (parsedCitations.length > 0) {
          e.preventDefault();
          setCitationIdx(0);
        }
      }
    },
    [
      citationIdx, revealed, question.type, question.options, selected, noAutoReveal,
      shortInput, parsedCitations, handleSelect, handleKeywordEval, revealWithConfidence,
    ],
  );

  // Kbd-chip row shown while the card is focused (desktop only).
  const kbdHintChips = useMemo(() => {
    const chips: Array<{ k: string; label: string }> = [];
    if (!revealed) {
      if (question.type === 'mcq') chips.push({ k: '1–4', label: 'answer' });
      else if (question.type === 'tf') chips.push({ k: 'T / F', label: 'answer' });
      if (question.type !== 'short') chips.push({ k: 'Enter', label: 'reveal' });
    }
    if (parsedCitations.length > 0) chips.push({ k: 'S', label: 'sources' });
    return chips;
  }, [revealed, question.type, parsedCitations.length]);

  const handleDownloadJSON = useCallback(async () => {
    setDownloading('json');
    try {
      await downloadSingleQuestionJSON(question);
      toast.success('Question downloaded as JSON');
    } catch (err) {
      console.error('[MedQ] JSON download error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to download JSON';
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  }, [question]);

  const handleDownloadPDF = useCallback(async () => {
    setDownloading('pdf');
    try {
      await downloadSingleQuestionPDF(question);
      toast.success('Question downloaded as PDF');
    } catch (err) {
      console.error('[MedQ] PDF download error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to generate PDF. The question data may contain unsupported characters.';
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  }, [question]);

  const handleDownloadHTML = useCallback(async () => {
    setDownloading('html');
    try {
      await exportAsHtml({ ...question, imageUrl: aiIllustrationUrl || question.imageUrl });
      toast.success('Question exported as HTML');
    } catch (err) {
      console.error('[MedQ] HTML export error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to export as HTML';
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  }, [question, aiIllustrationUrl]);

  const handleDownloadRefSheet = useCallback(async () => {
    setDownloading('refsheet');
    try {
      await downloadReferenceSheet([question]);
      toast.success('Reference sheet generated');
    } catch (err) {
      console.error('[MedQ] Reference sheet error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to generate reference sheet';
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  }, [question]);

  const handleGenerateIllustration = useCallback(async () => {
    if (!question.illustrationDescription) return;
    setGeneratingIllustration(true);
    try {
      const res = await fetch('/api/generate-medical-illustration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          description: question.illustrationDescription,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate illustration');
      }
      const data = await res.json();
      if (data.imageBase64) {
        setAiIllustrationUrl(`data:image/png;base64,${data.imageBase64}`);
      } else if (data.imageUrl) {
        setAiIllustrationUrl(data.imageUrl);
      }
      toast.success('AI illustration generated!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate illustration');
    } finally {
      setGeneratingIllustration(false);
    }
  }, [question.id, question.illustrationDescription]);

  /* ─── Bookmark toggle ─── */
  const handleToggleBookmark = useCallback(async () => {
    setBookmarkLoading(true);
    try {
      const res = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id }),
      });
      if (!res.ok) throw new Error('Failed to toggle bookmark');
      setIsBookmarked((prev) => !prev);
      toast.success(isBookmarked ? 'Bookmark removed' : 'Question bookmarked');
    } catch {
      toast.error('Failed to toggle bookmark');
    } finally {
      setBookmarkLoading(false);
    }
  }, [question.id, isBookmarked]);

  /* ─── Submit Question Report ─── */
  const handleSubmitReport = useCallback(async () => {
    if (!reportReason) {
      toast.error('Please select a reason for reporting');
      return;
    }
    setReportSubmitting(true);
    try {
      const res = await fetch('/api/questions/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          reason: reportReason,
          comment: reportComment || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.reported) {
          // Already reported
          setReportStatus('reported');
          setReportDialogOpen(false);
          toast.info('You have already reported this question');
          return;
        }
        throw new Error(data.error || 'Failed to submit report');
      }
      setReportStatus('reported');
      setReportDialogOpen(false);
      toast.success('Report submitted. Thank you for helping improve the quality!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setReportSubmitting(false);
    }
  }, [question.id, reportReason, reportComment]);

  /* ─── Notes auto-save (debounced) ─── */
  const saveNote = useCallback(async (text: string) => {
    setNoteSaving(true);
    try {
      if (text.trim()) {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: question.id, note: text }),
        });
        if (!res.ok) throw new Error('Failed to save note');
      } else {
        const res = await fetch('/api/notes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: question.id }),
        });
        if (!res.ok && res.status !== 404) throw new Error('Failed to delete note');
      }
    } catch {
      toast.error('Failed to save note');
    } finally {
      setNoteSaving(false);
    }
  }, [question.id]);

  const handleNoteChange = useCallback((value: string) => {
    setNoteText(value);
    // Debounced auto-save
    if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
    noteSaveTimer.current = setTimeout(() => {
      saveNote(value);
    }, 1500);
  }, [saveNote]);

  const handleGenerateAudio = useCallback(async () => {
    // Build TTS text from explanation + mnemonic + clinical pearl
    const parts: string[] = [];
    if (question.explanation) parts.push(question.explanation);
    if (question.mnemonic) parts.push(`Memory aid: ${question.mnemonic}`);
    if (question.clinicalPearl) parts.push(`Clinical pearl: ${question.clinicalPearl}`);
    const ttsText = parts.join(' ');

    if (!ttsText.trim()) {
      toast.error('No explanation text available for audio generation');
      return;
    }

    setGeneratingAudio(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          text: ttsText,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate audio');
      }
      const data = await res.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
        toast.success('Audio generated!');
        // Auto-play newly generated audio if setting is enabled
        if (settings.autoPlayAudio) {
          setTimeout(() => {
            audioRef.current?.play().catch(() => {/* autoplay blocked by browser */});
          }, 500);
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setGeneratingAudio(false);
    }
  }, [question.id, question.explanation, question.mnemonic, question.clinicalPearl]);

  // Compare by normalizing both option and answer - strips HTML, letter prefixes, and case differences
  const isCorrect = (option: string): boolean => {
    const normOption = normalizeForCompare(option);
    const normAnswer = normalizeForCompare(question.answer);
    // Direct match
    if (normOption === normAnswer) return true;
    // Also check if answer is just a letter (a/b/c/d) and matches the option's letter prefix
    const answerLetter = question.answer.trim().toLowerCase();
    if (['a', 'b', 'c', 'd', 'e'].includes(answerLetter)) {
      const optionLetter = option.trim().charAt(0).toLowerCase();
      if (optionLetter === answerLetter && /^[a-eA-E][)\.]\s/.test(option.trim())) return true;
    }
    // Check if answer is contained in option (for partial matches)
    if (normAnswer.length > 5 && normOption.includes(normAnswer)) return true;
    if (normOption.length > 5 && normAnswer.includes(normOption)) return true;
    return false;
  };

  /* ─── Use Hint: Spend 3 credits to eliminate 2 wrong options ─── */
  const handleUseHint = useCallback(async () => {
    if (hintUsed || revealed || question.type !== 'mcq') return;
    if (credits.balance < 3) {
      toast.error('Not enough credits! You need 3 credits for a hint.');
      return;
    }

    setHintPurchasing(true);
    try {
      const res = await fetch('/api/credits/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'hint', amount: 3, description: `Quiz Hint for question: ${question.id}` }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'Insufficient credits') {
          toast.error('Not enough credits! You need 3 credits for a hint.');
        } else {
          toast.error(data.error || 'Failed to purchase hint');
        }
        return;
      }

      // Find 2 wrong options to eliminate (not the correct answer)
      const wrongIndices: number[] = [];
      question.options.forEach((opt, i) => {
        if (!isCorrect(opt)) {
          wrongIndices.push(i);
        }
      });

      // Shuffle and pick 2 (or fewer if only 1 wrong option)
      const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
      const toEliminate = shuffled.slice(0, Math.min(2, shuffled.length));

      setEliminatedIndices(toEliminate);
      setHintUsed(true);
      await refreshCredits();
      toast.success('Hint used! 2 wrong options eliminated.');
    } catch (err) {
      toast.error('Failed to purchase hint. Please try again.');
    } finally {
      setHintPurchasing(false);
    }
  }, [hintUsed, revealed, question.type, question.options, question.id, credits.balance, refreshCredits]);

  const getOptionState = (option: string): 'correct' | 'wrong' | 'dimmed' | 'hint-eliminated' | null => {
    // Check if this option was eliminated by hint (before revealed check)
    const optIndex = question.options.indexOf(option);
    if (!revealed && hintUsed && eliminatedIndices.includes(optIndex)) return 'hint-eliminated';
    if (!revealed || !selected) return null;
    if (isCorrect(option)) return 'correct';
    if (normalizeForCompare(option) === normalizeForCompare(selected) && !isCorrect(option)) return 'wrong';
    return 'dimmed';
  };

  const getTfState = (value: string): 'correct' | 'wrong' | 'dimmed' | null => {
    if (!revealed || !selected) return null;
    if (value.toLowerCase() === question.answer.toLowerCase()) return 'correct';
    if (value === selected && value.toLowerCase() !== question.answer.toLowerCase()) return 'wrong';
    return 'dimmed';
  };

  const typeLabel =
    question.type === 'mcq'
      ? 'MCQ'
      : question.type === 'tf'
        ? 'True-False'
        : 'Short Answer';

  const difficultyBadgeClass =
    question.difficulty === 'Easy'
      ? 'medq-badge-easy'
      : question.difficulty === 'Basic'
        ? 'medq-badge-basic'
        : question.difficulty === 'Moderate'
          ? 'medq-badge-moderate'
          : question.difficulty === 'Hard'
            ? 'medq-badge-hard'
            : 'medq-badge-expert';

  const typeBadgeClass =
    question.type === 'mcq'
      ? 'medq-badge-mcq'
      : question.type === 'tf'
        ? 'medq-badge-tf'
        : 'medq-badge-short';

  const requiredMedia = (question.mediaRequirements ?? []).filter((media) => media.required);

  // Score color based on evaluation
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#00e5a0]';
    if (score >= 50) return 'text-[#ffb347]';
    return 'text-[#ff5757]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#00e5a0]/10 border-[#00e5a0]/20';
    if (score >= 50) return 'bg-[#ffb347]/10 border-[#ffb347]/20';
    return 'bg-[#ff5757]/10 border-[#ff5757]/20';
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      onFocus={() => setCardFocused(true)}
      onBlur={() => setCardFocused(false)}
      role="group"
      aria-label={`Interactive question card${index !== undefined ? ` ${index + 1}` : ''} — keyboard: 1-4 select option, Enter reveal, S sources`}
      className={[
        'medq-question-card group',
        'bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden',
        'transition-all duration-500 outline-none',
        'focus-visible:border-[#4fc3f7]/30 focus-visible:ring-1 focus-visible:ring-[#4fc3f7]/20',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4',
        revealed ? 'revealed' : '',
      ].join(' ')}
    >
      {/* ── Top Bar: Badges + Download Buttons ── */}
      <div className="medq-card-topbar">
        {index !== undefined && (
          <span className="text-[11px] font-bold text-[#3a4055] uppercase tracking-widest mr-1">
            Q{index + 1}
          </span>
        )}
        <span className={`medq-badge ${typeBadgeClass}`}>{typeLabel}</span>
        <span className={`medq-badge ${difficultyBadgeClass}`}>
          {question.difficulty}
        </span>
        <span className="medq-badge medq-badge-system">{question.system}</span>
        {question.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="medq-badge medq-badge-tag">
            {tag}
          </span>
        ))}
        {parsedSources.slice(0, 3).map((src: { type: string; title: string }, i: number) => (
          <span
            key={`src-${i}`}
            className={`medq-badge medq-badge-source medq-badge-source--${src.type}`}
            title={src.title}
          >
            {src.type === 'guideline' ? '📋' : src.type === 'paper' ? '📄' : src.type === 'audio' ? '🎧' : src.type === 'model' ? '🧩' : '📚'} {src.title.length > 22 ? src.title.slice(0, 22) + '…' : src.title}
          </span>
        ))}
        {question.isAIGenerated && (
          <span className="medq-badge" style={{ background: 'rgba(179,136,255,0.08)', color: '#b388ff' }}>
            ✨ AI
          </span>
        )}
        {/* Evidence badge — chunk-level citations with verification scores.
            Visible BEFORE answering, so learners know the question is grounded
            in the user's own library (trust at a glance). */}
        {parsedCitations.length > 0 && (
          <span
            className="medq-badge"
            style={{ background: 'rgba(79,195,247,0.1)', color: '#4fc3f7' }}
            title={`${parsedCitations.length} chunk-level citation${parsedCitations.length > 1 ? 's' : ''} from your Knowledge Library${verifiedCitationCount > 0 ? ` · ${verifiedCitationCount} verified (judge ≥ 8/10)` : ''}. Open them from Sources & Evidence (S key when revealed)`}
          >
            <span className="inline-flex items-center gap-1">
              🔗 {parsedCitations.length} citation{parsedCitations.length > 1 ? 's' : ''}
              {verifiedCitationCount > 0 && (
                <span className="inline-flex items-center gap-0.5" style={{ color: '#00e5a0' }}>
                  <ShieldCheck className="w-3 h-3" />{verifiedCitationCount}
                </span>
              )}
            </span>
          </span>
        )}
        {question.reviewStatus === 'approved' && (
          <span className="medq-badge" style={{ background: 'rgba(0,229,160,0.08)', color: '#00e5a0' }} title="Answer key verified by the independent medical accuracy reviewer">
            ✓ Reviewed
          </span>
        )}
        {question.blueprintOrgan && (
          <span
            className="medq-badge"
            style={{ background: 'rgba(79,195,247,0.1)', color: '#7cc7ff' }}
            title={question.blueprintTask ? `USMLE-style task: ${question.blueprintTask}` : 'USMLE-style blueprint tag'}
          >
            {question.blueprintOrgan}{question.blueprintTask ? ` · ${question.blueprintTask}` : ''}
          </span>
        )}
        {typeof question.difficultyP === 'number' && question.difficultyP >= 0 && question.attemptsCount && question.attemptsCount >= 3 && (
          <span
            className="medq-badge"
            style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}
            title={`Calibrated from ${question.attemptsCount} real attempts — ${(question.difficultyP * 100).toFixed(0)}% of users answer correctly${typeof question.discrimination === 'number' && question.discrimination >= 0 ? `, discrimination ${question.discrimination.toFixed(2)}` : ''}`}
          >
            📊 {(question.difficultyP * 100).toFixed(0)}% correct
          </span>
        )}
        {requiredMedia.length > 0 && (
          <span className="medq-badge" style={{ background: 'rgba(59,130,246,0.12)', color: '#7cc7ff' }}>
            {requiredMedia.map((item) => `${item.type.toUpperCase()}`).join(' • ')} required
          </span>
        )}

        {/* Action buttons - always visible */}
        <div className="ml-auto flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200">
          {/* Bookmark toggle button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            disabled={bookmarkLoading}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isBookmarked
                ? 'text-[#00e5a0] bg-[#00e5a0]/10 hover:bg-[#00e5a0]/20'
                : 'text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10'
            }`}
          >
            {bookmarkLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            <span className="text-xs font-medium hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          {/* Share button — send the interactive card (media intact) to chats/groups */}
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            title="Share this question with its media"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#4fc3f7] hover:bg-[#4fc3f7]/10 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Share</span>
          </button>

          {/* Generate Audio button */}
          <button
            type="button"
            onClick={handleGenerateAudio}
            disabled={generatingAudio}
            title="Generate audio explanation"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingAudio ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <span className="text-xs font-medium hidden sm:inline">Audio</span>
          </button>

          {/* Download dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                disabled={downloading !== null}
                title="Download question"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline">Download</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1e2230] border-white/[0.08]">
              <DropdownMenuItem
                onClick={handleDownloadJSON}
                disabled={downloading === 'json'}
                className="text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer"
              >
                <FileJson className="w-4 h-4" />
                Download as JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDownloadPDF}
                disabled={downloading === 'pdf'}
                className="text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDownloadHTML}
                disabled={downloading === 'html'}
                className="text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer"
              >
                <FileCode className="w-4 h-4" />
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDownloadRefSheet}
                disabled={downloading === 'refsheet'}
                className="text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Reference Sheet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Report button */}
          {reportStatus === 'reported' ? (
            <button
              type="button"
              disabled
              title="You have already reported this question"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#ff5757] bg-[#ff5757]/10 cursor-default"
            >
              <Flag className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Reported</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setReportDialogOpen(true)}
              title="Report this question"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all"
            >
              <Flag className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Report</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Keyboard shortcut hints — shown while the card is focused (desktop).
          The card IS the keyboard surface: 1-4/A-D answer, Enter reveal, S sources. ── */}
      {cardFocused && kbdHintChips.length > 0 && (
        <div className="hidden sm:flex items-center gap-2.5 px-4 pt-3 pb-1 text-[10px] text-[#5a6478] select-none">
          <span className="inline-flex items-center gap-1">
            {kbdHintChips.map((chip) => (
              <span key={chip.k} className="inline-flex items-center gap-1 mr-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[#1a1e2b] border border-white/[0.12] text-[#8b95a8] font-mono text-[9.5px] font-semibold">
                  {chip.k}
                </kbd>
                <span>{chip.label}</span>
              </span>
            ))}
          </span>
        </div>
      )}

      {/* ── Report Dialog ── */}
      {reportDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setReportDialogOpen(false)}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl p-5 animate-fade-in"
            style={{ background: '#1a1d28', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255,87,87,0.12)' }}
                >
                  <Flag className="w-4 h-4 text-[#ff5757]" />
                </div>
                <h3 className="text-sm font-bold text-[#e8ecf4]">Report Question</h3>
              </div>
              <button
                type="button"
                onClick={() => setReportDialogOpen(false)}
                className="text-[#5a6478] hover:text-[#8b95a8] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#5a6478] mb-3">
              Help us improve by reporting incorrect, outdated, or inappropriate questions.
            </p>

            {/* Reason selection */}
            <div className="space-y-2 mb-4">
              {[
                { value: 'incorrect', label: 'Incorrect Answer', desc: 'The answer is wrong or misleading' },
                { value: 'outdated', label: 'Outdated Info', desc: 'Information is no longer current' },
                { value: 'offensive', label: 'Offensive', desc: 'Contains inappropriate content' },
                { value: 'duplicate', label: 'Duplicate', desc: 'This question already exists' },
                { value: 'other', label: 'Other', desc: 'Something else' },
              ].map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReportReason(r.value)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                    reportReason === r.value
                      ? 'bg-[#ff5757]/10 border border-[#ff5757]/30'
                      : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <p className={`text-xs font-semibold ${reportReason === r.value ? 'text-[#ff5757]' : 'text-[#e8ecf4]'}`}>
                    {r.label}
                  </p>
                  <p className="text-[10px] text-[#5a6478] mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>

            {/* Comment textarea */}
            <textarea
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              placeholder="Add a comment (optional)..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl text-xs bg-white/[0.03] border border-white/[0.06] text-[#e8ecf4] placeholder-[#3a4055] focus:outline-none focus:border-[#ff5757]/30 focus:bg-white/[0.05] transition-all resize-none mb-4"
            />

            {/* Submit button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReportDialogOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5a6478] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReport}
                disabled={!reportReason || reportSubmitting}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  reportReason && !reportSubmitting
                    ? 'bg-[#ff5757] text-white hover:bg-[#ff5757]/90 active:scale-[0.98]'
                    : 'bg-white/[0.04] text-[#3a4055] cursor-not-allowed'
                }`}
              >
                {reportSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Question Text ── */}
      <div className="px-6 pt-4 pb-2">
        {/* ── Lab panel (agent questions with laboratory data) ── */}
        {parsedLabPanel.length > 0 && <LabPanelTable panels={parsedLabPanel} />}

        <div
          className="medq-html-preview text-[15px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question.text }}
        />

        {/* ── Question image: ECG strip (interactive pins) / hotspot image / illustration ──
            ECG strips and hotspot images stay visible after reveal — they are the
            reference material students compare against the explanation. */}
        {aiIllustrationUrl && isEcgImage && (
          <EcgStrip
            url={aiIllustrationUrl}
            hotspots={parsedHotspots}
            selectedAnswer={selected}
            revealed={revealed}
            isCorrectOption={isCorrect}
            onSelect={handleSelect}
          />
        )}
        {aiIllustrationUrl && !isEcgImage && parsedHotspots.length > 0 && (
          <HotspotImage
            url={aiIllustrationUrl}
            alt="Question image"
            hotspots={parsedHotspots}
            selectedAnswer={selected}
            revealed={revealed}
            isCorrectOption={isCorrect}
            onSelect={handleSelect}
          />
        )}
        {aiIllustrationUrl && !isEcgImage && parsedHotspots.length === 0 && !revealed && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
            <img
              src={aiIllustrationUrl}
              alt="AI-generated medical illustration"
              className="w-full max-w-full rounded-xl"
              style={{ maxHeight: 400, objectFit: 'contain' }}
            />
          </div>
        )}

        {/* ── Agent Media: Video (part of the question — watch then answer) ── */}
        {questionVideoUrl && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
              <Video className="w-4 h-4 text-[#4fc3f7]" />
              <span className="text-xs font-bold text-[#4fc3f7]">Watch the video, then answer</span>
            </div>
            {(() => {
              const yt = questionVideoUrl.match(
                /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
              );
              if (yt) {
                return (
                  <iframe
                    src={`https://www.youtube.com/embed/${yt[1]}`}
                    title="Question video"
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              }
              return (
                <video controls preload="metadata" src={questionVideoUrl} className="w-full max-h-[420px] bg-black">
                  Your browser does not support the video element.
                </video>
              );
            })()}
          </div>
        )}

        {/* ── Agent Media: 3D Model (part of the question — explore then answer) ── */}
        {questionModelUrl && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
              <Box className="w-4 h-4 text-[#00e5a0]" />
              <span className="text-xs font-bold text-[#00e5a0]">Explore the interactive 3D model, then answer</span>
            </div>
            <iframe
              src={questionModelUrl}
              title="Interactive 3D anatomy model"
              className="w-full aspect-[4/3]"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
            />
            {parsedStructureTags.length > 0 && (
              <StructureTagChips
                tags={parsedStructureTags}
                selectedAnswer={selected}
                revealed={revealed}
                isCorrectOption={isCorrect}
                onSelect={handleSelect}
              />
            )}
            <div className="px-4 py-2 border-t border-white/[0.06]">
              <p className="text-[11px] text-[#5a6478]">🖱️ Drag to rotate · scroll to zoom · double-click to focus</p>
            </div>
          </div>
        )}

        {/* ── Agent Media: Audio (part of the question — listen then answer) ──
            Waveform visualizer + 0.5×–2× speed + phonocardiogram synced to playback. */}
        {stemAudioUrl && (
          <WaveformAudioPlayer
            src={stemAudioUrl}
            title={/🔊/.test(question.text) && !/listen to the audio/i.test(question.text) ? 'Auscultate — listen to the recording, then answer' : 'Listen to the audio, then answer'}
            pcgSpec={parsedPcgSpec}
          />
        )}
      </div>

      {/* ── Answer Area ── */}
      <div className="px-6 pb-4 pt-2">
        {question.type === 'mcq' && (
          <>
          {/* ── Use Hint Button (MCQ only, before reveal) ── */}
          {!revealed && !hintUsed && question.options.length > 2 && (
            <div className="mb-3">
              <button
                type="button"
                onClick={handleUseHint}
                disabled={hintPurchasing || credits.balance < 3}
                className={`medq-hint-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all w-full justify-center ${
                  credits.balance >= 3
                    ? 'bg-[#f59e0b]/[0.08] text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/[0.15] hover:border-[#f59e0b]/30 active:scale-[0.98]'
                    : 'bg-white/[0.03] text-[#3a4055] border border-white/[0.04] cursor-not-allowed'
                }`}
              >
                {hintPurchasing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#f59e0b]/30 border-t-[#f59e0b] rounded-full animate-spin" />
                    Purchasing hint...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-3.5 h-3.5" />
                    Use Hint
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 text-[10px]">
                      <Coins className="w-2.5 h-2.5" />
                      3 credits
                    </span>
                    {credits.balance < 3 && (
                      <span className="text-[#ff5757] text-[10px]">• Not enough credits</span>
                    )}
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Hint Used Indicator ── */}
          {hintUsed && !revealed && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15">
              <Lightbulb className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-[11px] text-[#f59e0b] font-semibold">Hint active</span>
              <span className="text-[10px] text-[#5a6478]">— {eliminatedIndices.length} wrong options eliminated</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              const state = getOptionState(option);
              const isHintEliminated = state === 'hint-eliminated';
              const isUserSelected = selected && normalizeForCompare(option) === normalizeForCompare(selected);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={revealed || isHintEliminated}
                  className={[
                    'medq-option-btn',
                    isHintEliminated
                      ? 'medq-option-hint-eliminated'
                      : state === 'correct'
                        ? 'correct locked'
                        : state === 'wrong'
                          ? 'wrong locked'
                          : state === 'dimmed'
                            ? 'dimmed locked'
                            : revealed
                              ? 'locked'
                              : '',
                  ].join(' ')}
                  style={isHintEliminated ? { animation: 'hintEliminate 0.4s ease-out forwards' } : undefined}
                >
                  <span className="medq-option-letter">{LETTERS[i]}</span>
                  {/* Render option text - supports both HTML and plain text */}
                  {option.includes('<') ? (
                    <span
                      className="medq-html-preview text-[13.5px]"
                      dangerouslySetInnerHTML={{ __html: option }}
                    />
                  ) : (
                    <span>{option}</span>
                  )}
                  {/* Show correct/wrong indicator badge */}
                  {revealed && state === 'correct' && (
                    <span className="ml-auto flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5 text-[#00e5a0]" />
                      <span className="text-xs font-bold text-[#00e5a0] bg-[#00e5a0]/10 px-2 py-0.5 rounded-md">CORRECT</span>
                    </span>
                  )}
                  {revealed && isUserSelected && state === 'wrong' && (
                    <span className="ml-auto flex items-center gap-1.5">
                      <XCircle className="w-5 h-5 text-[#ff5757]" />
                      <span className="text-xs font-bold text-[#ff5757] bg-[#ff5757]/10 px-2 py-0.5 rounded-md">WRONG</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Confidence rating before reveal (metacognition — improves retention) ── */}
          {selected && !revealed && !noAutoReveal && (
            <ConfidenceBar
              onChoose={(level) => revealWithConfidence(level)}
              onSkip={() => revealWithConfidence(null)}
            />
          )}
          {confidence && revealed && (
            <div className="mb-3 text-center text-[10.5px] text-[#5a6478]">
              confidence rated: <span className="font-bold text-[#b388ff]">{confidence === 'sure' ? "I'm sure" : confidence === 'probably' ? 'Probably' : 'Guessing'}</span>
            </div>
          )}
          </>
        )}

        {question.type === 'tf' && (
          <>
          <div className="medq-tf-grid">
            {['True', 'False'].map((value) => {
              const state = getTfState(value);
              const isUserSelected = selected === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSelect(value)}
                  disabled={revealed}
                  className={[
                    'medq-option-btn medq-tf-btn justify-center gap-2',
                    state === 'correct'
                      ? 'correct locked'
                      : state === 'wrong'
                        ? 'wrong locked'
                        : state === 'dimmed'
                          ? 'dimmed locked'
                          : revealed
                            ? 'locked'
                            : '',
                  ].join(' ')}
                >
                  {state === 'correct' && <CheckCircle2 className="w-4 h-4 text-[#00e5a0]" />}
                  {state === 'wrong' && <XCircle className="w-4 h-4 text-[#ff5757]" />}
                  {value}
                  {revealed && isUserSelected && state === 'correct' && (
                    <span className="text-xs font-bold text-[#00e5a0]">✓</span>
                  )}
                  {revealed && isUserSelected && state === 'wrong' && (
                    <span className="text-xs font-bold text-[#ff5757]">✗</span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Confidence rating before reveal (TF) */}
          {selected && !revealed && !noAutoReveal && (
            <ConfidenceBar
              onChoose={(level) => revealWithConfidence(level)}
              onSkip={() => revealWithConfidence(null)}
            />
          )}
          </>
        )}

        {question.type === 'short' && (
          <div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                className="medq-short-input"
                placeholder="Type your answer…"
                value={shortInput}
                onChange={(e) => setShortInput(e.target.value)}
                disabled={revealed}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !revealed) handleRevealShort();
                }}
              />
              <button
                type="button"
                onClick={handleRevealShort}
                disabled={revealed}
                className={[
                  'px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap',
                  revealed
                    ? 'bg-white/[0.04] text-[#3a4055] cursor-default'
                    : 'bg-[#00e5a0]/[0.12] text-[#00e5a0] hover:bg-[#00e5a0]/[0.2] cursor-pointer',
                ].join(' ')}
              >
                {revealed ? 'Revealed' : 'Reveal'}
              </button>
            </div>

            {/* ── Answer Evaluation Buttons (short answer only) ── */}
            {!revealed && shortInput.trim().length > 2 && (
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleKeywordEval}
                  disabled={evaluating}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {evaluating && evalMethod === 'keyword' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  Check Answer (Offline)
                </button>
                {browserAI.isSupported() && (
                  <button
                    type="button"
                    onClick={handleAiEval}
                    disabled={evaluating || !aiModelStatus.loaded}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/20 hover:bg-[#00e5a0]/20 transition-all disabled:opacity-50 cursor-pointer"
                    title={!aiModelStatus.loaded ? 'Download an AI model first from the Generate tab' : 'Check with browser AI'}
                  >
                    {evaluating && evalMethod === 'ai' ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Check with AI {aiModelStatus.loaded ? `(${aiModelStatus.modelId?.split('-')[0]})` : '(No Model)'}
                  </button>
                )}
              </div>
            )}

            {/* ── Evaluation Result ── */}
            {evaluation && (
              <div className={`mt-3 p-4 rounded-xl border ${getScoreBg(evaluation.score)}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-2xl font-black ${getScoreColor(evaluation.score)}`}>
                    {evaluation.score}%
                  </span>
                  <div className="flex-1">
                    <div className="w-full bg-white/[0.06] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          evaluation.score >= 80 ? 'bg-[#00e5a0]' : evaluation.score >= 50 ? 'bg-[#ffb347]' : 'bg-[#ff5757]'
                        }`}
                        style={{ width: `${evaluation.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-[#5a6478] font-semibold">
                    {evalMethod === 'ai' ? 'AI' : 'Keyword'}
                  </span>
                </div>
                <p className="text-xs text-[#c8d0e0] leading-relaxed mb-2">
                  {evaluation.feedback}
                </p>
                {evaluation.keyPointsCovered.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    <span className="text-[10px] text-[#00e5a0] font-semibold">Covered:</span>
                    {evaluation.keyPointsCovered.slice(0, 5).map((point, i) => (
                      <span key={i} className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md bg-[#00e5a0]/10 text-[#00e5a0]">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {point}
                      </span>
                    ))}
                  </div>
                )}
                {evaluation.keyPointsMissed.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-[#ff5757] font-semibold">Missed:</span>
                    {evaluation.keyPointsMissed.slice(0, 5).map((point, i) => (
                      <span key={i} className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md bg-[#ff5757]/10 text-[#ff5757]">
                        <XCircle className="w-2.5 h-2.5" />
                        {point}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Manual reveal button (for exam mode without auto-reveal) */}
        {noAutoReveal && selected && !revealed && attemptMode !== 'exam-sim' && (
          <button
            type="button"
            onClick={handleReveal}
            className="mt-3 w-full py-3 rounded-xl bg-[#00e5a0]/[0.08] text-[#00e5a0] text-sm font-bold hover:bg-[#00e5a0]/[0.15] transition-all"
          >
            Check Answer
          </button>
        )}
      </div>

      {/* ── Reveal Section ── */}
      <div className={`medq-reveal-section ${revealed ? 'open' : ''}`}>
        <div className="medq-reveal-inner">
          {/* 1. Correct Answer Banner */}
          <div className="medq-correct-banner">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="flex-shrink-0"
            >
              <circle cx="10" cy="10" r="10" fill="#00e5a0" fillOpacity="0.15" />
              <path
                d="M6 10.5L8.5 13L14 7"
                stroke="#00e5a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              Correct Answer:{' '}
              <strong>
                {question.type === 'mcq'
                  ? `${question.answer}`
                  : question.answer}
              </strong>
            </span>
          </div>

          {/* 2. Audio Player (in reveal section) */}
          {audioUrl && (
            <div className="mb-5 answer-section">
              <div className="section-header">
                <div className="section-icon icon-purple">🔊</div>
                <h3 className="section-title">Audio Explanation</h3>
              </div>
              <div className="bg-[#0f1118]/50 rounded-xl border border-white/[0.08] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#8b95a8] mb-2 font-medium">Listen to the explanation</p>
                    <audio
                      ref={audioRef}
                      controls
                      src={audioUrl}
                      className="w-full h-8"
                      style={{ filter: 'hue-rotate(200deg) brightness(1.2)' }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI Illustration Button / Generated Image (in reveal section) */}
          {question.illustrationDescription && !aiIllustrationUrl && (
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGenerateIllustration}
                disabled={generatingIllustration}
                className={[
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer',
                  'bg-gradient-to-r from-[#00e5a0]/20 to-[#00b87a]/20',
                  'text-[#00e5a0] border border-[#00e5a0]/20',
                  'hover:from-[#00e5a0]/30 hover:to-[#00b87a]/30 hover:border-[#00e5a0]/40',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                ].join(' ')}
              >
                {generatingIllustration ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Illustration…
                  </>
                ) : (
                  <>
                    ✨ <Sparkles className="w-4 h-4" />
                    Generate Illustration
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#5a6478] mt-1.5 ml-1">Generates a visual diagram of the key concepts</p>
            </div>
          )}
          {aiIllustrationUrl && !isEcgImage && parsedHotspots.length === 0 && (
            <div className="mb-5 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
              <img
                src={aiIllustrationUrl}
                alt="AI-generated medical illustration"
                className="w-full max-w-full rounded-xl"
                style={{ maxHeight: 400, objectFit: 'contain' }}
              />
            </div>
          )}

          {/* 4. Short Answer Reveal Box */}
          {question.type === 'short' && (
            <div className="q-short-answer-reveal">
              <div className="answer-label">Expected Answer</div>
              <div className="answer-value">{question.answer}</div>
            </div>
          )}

          {/* 5. Interactive Diagram */}
          {parsedDiagramSpec && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-blue">📊</div>
                <h3 className="section-title">Interactive Pathway Diagram</h3>
              </div>
              <div className="q-diagram-interactive">
                <div className="diagram-title-bar">
                  <span className="dt-label">🧬 {parsedDiagramSpec.title || 'Pathway Diagram'}</span>
                  <span className="dt-hint">🖱️ Click node to trace pathway</span>
                </div>
                <div ref={diagramRef} className="w-full min-h-[280px]" />
              </div>
            </div>
          )}

          {/* 6. Molecular Illustration */}
          {parsedMolecularScenes && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-purple">🔬</div>
                <h3 className="section-title">Molecular Mechanism</h3>
                <span className="text-[10px] text-[#5a6478] font-medium ml-auto">Normal vs Drug Effect</span>
              </div>
              <div ref={molecularRef} />
            </div>
          )}

          {/* 7. Explanation with section header */}
          {question.explanation && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-blue">🧬</div>
                <h3 className="section-title">Explanation</h3>
              </div>
              <div
                className="medq-html-preview"
                dangerouslySetInnerHTML={{ __html: question.explanation }}
              />
            </div>
          )}

          {/* 8. Mnemonic with section header */}
          {question.mnemonic && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-purple">💡</div>
                <h3 className="section-title">Mnemonic</h3>
              </div>
              <div
                className="medq-html-preview"
                dangerouslySetInnerHTML={{ __html: question.mnemonic }}
              />
            </div>
          )}

          {/* 9. Clinical Pearl with section header */}
          {question.clinicalPearl && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-amber">🎯</div>
                <h3 className="section-title">Clinical Pearl</h3>
              </div>
              <div
                className="medq-html-preview"
                dangerouslySetInnerHTML={{ __html: question.clinicalPearl }}
              />
            </div>
          )}

          {/* 10. Distractor Analysis with section header */}
          {question.distractorAnalysis && (
            <div className="answer-section">
              <div className="section-header">
                <div className="section-icon icon-orange">🔍</div>
                <h3 className="section-title">Distractor Analysis</h3>
              </div>
              <div
                className="medq-html-preview"
                dangerouslySetInnerHTML={{ __html: question.distractorAnalysis }}
              />
            </div>
          )}

          {/* 10.5 Sources & Evidence — ADVANCED citations: each chip opens the
              source's ORIGINAL FILE (PDF located + highlighted / media seeked
              to the cited moment; extracted text stays one click away) with
              chunk-level provenance from the deep agent's
              save_question.citations. Falls back to the legacy
              {type,title} list for older questions. */}
          {(() => {
            const sources: Array<{ type: string; title: string }> = (() => {
              try {
                return question.sources
                  ? (typeof question.sources === 'string' ? JSON.parse(question.sources) : question.sources)
                  : [];
              } catch { return []; }
            })();
            const hasCitations = parsedCitations.length > 0;
            if (!hasCitations && (!Array.isArray(sources) || sources.length === 0)) return null;
            const kindIcon = (t?: string) =>
              t === 'audio' ? '🎧' : t === 'video' ? '🎬' : t === 'image' ? '🖼️' : t === 'library' ? '📚' : '📄';
            return (
              <div className="answer-section">
                <div className="section-header">
                  <div className="section-icon icon-green">📚</div>
                  <h3 className="section-title">Sources &amp; Evidence</h3>
                  {hasCitations && verifiedCitationCount > 0 && (
                    <span
                      className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] text-[10px] font-bold"
                      title="Citations whose answer-support judge scored ≥ 8/10 with ≥ 50% answer-token coverage"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {verifiedCitationCount}/{parsedCitations.length} verified
                    </span>
                  )}
                </div>

                {/* Advanced: chunk-level citations → highlight-in-source.
                    Each chip carries its VERIFICATION EVIDENCE (trust badge:
                    judge score + answer-token coverage) and its own deep-link
                    copy button — a URL that reopens this exact passage. */}
                {hasCitations && (
                  <div className="flex flex-col gap-1.5">
                    {parsedCitations.map((c, i) => {
                      const trust = citationTrust(c);
                      const hasScores = typeof c.judgeScore === 'number';
                      const trustCls =
                        trust === 'verified'
                          ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]'
                          : trust === 'supported'
                            ? 'bg-[#ffb347]/10 border-[#ffb347]/30 text-[#ffb347]'
                            : 'bg-white/[0.05] border-white/[0.12] text-[#8b95a8]';
                      return (
                        <div key={`${c.sourceId}:${c.chunkId}`} className="flex items-stretch gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCitationIdx(i)}
                            className="group min-w-0 flex-1 text-left flex items-start gap-2 px-2.5 py-2 rounded-lg bg-[#0f1320] border border-white/[0.06] hover:border-[#4fc3f7]/40 hover:bg-[#4fc3f7]/[0.04] transition-colors"
                            title="Open the cited passage in the original file"
                          >
                            <span className="shrink-0 text-[#4fc3f7]/80 font-mono text-[10px] mt-0.5">[{i + 1}]</span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1.5 text-[11px] text-[#c8d0e0] font-medium">
                                <span>{kindIcon(c.fileKind)}</span>
                                <span className="truncate">{c.title || 'Knowledge source'}</span>
                                {hasScores && (
                                  <span
                                    className={`shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wide ${trustCls}`}
                                    title={trustTitle(c)}
                                  >
                                    {trust === 'verified' && <ShieldCheck className="w-2.5 h-2.5" />}
                                    {c.judgeScore}/10{typeof c.answerCoverage === 'number' ? ` · ${Math.round(c.answerCoverage * 100)}%` : ''}
                                  </span>
                                )}
                                <span className="ml-auto shrink-0 hidden group-hover:inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#4fc3f7] font-semibold">
                                  open in file ↗
                                </span>
                              </span>
                              {c.quote && (
                                <span className="block mt-1 text-[10px] text-[#8b95a8] leading-relaxed line-clamp-2 opacity-80">
                                  “{c.quote.slice(0, 180)}{c.quote.length > 180 ? '…' : ''}”
                                </span>
                              )}
                            </span>
                          </button>
                          {/* Citation deep link — copies /bank?q=<id>&cite=<i> */}
                          <button
                            type="button"
                            onClick={() => copyCitationLink(i)}
                            title="Copy a link that reopens this question at this exact citation"
                            className="shrink-0 w-8 flex items-center justify-center rounded-lg bg-[#0f1320] border border-white/[0.06] text-[#5a6478] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/40 transition-colors"
                          >
                            {copiedCitation === i ? (
                              <Check className="w-3.5 h-3.5 text-[#00e5a0]" />
                            ) : (
                              <Link2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Legacy: plain source titles (pre-citation questions) */}
                {!hasCitations && (
                  <div className="flex flex-col gap-1.5">
                    {sources.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.06] text-[11px] leading-relaxed"
                      >
                        <span className="shrink-0 text-[#4fc3f7]/80 font-mono text-[10px] mt-0.5">[{i + 1}]</span>
                        <span className="text-[#8b95a8] break-words">
                          <span className="mr-1">{kindIcon(String(s?.type || ''))}</span>
                          {String(s?.title || '')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Citation source viewer — opened by the citation chips above.
              Lands on the ORIGINAL FILE (the retained bytes): PDFs open in the
              custom pdf.js reader scrolled to + highlighting the ANSWER passage
              (one click widens to the full chunk); audio/video seek to the
              cited [mm:ss] moment; the extracted-text view (with the marked
              passage) stays one click away via the contextual banner. The ‹ ›
              stepper + arrow keys navigate between citations WITHOUT closing
              the modal. */}
          {activeCitation && (
            <SourceViewerModal
              sourceId={activeCitation.sourceId
                || parsedCitations.find((c) => c.chunkId === activeCitation.chunkId)?.sourceId
                || ''}
              onClose={() => setCitationIdx(-1)}
              kindBadge={(kind: string) => (
                <span className="px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-semibold shrink-0">
                  {kind}
                </span>
              )}
              highlight={activeCitation}
              citations={parsedCitations}
              citationIndex={citationIdx}
              onNavigate={setCitationIdx}
              citationLink={citationIdx >= 0 ? buildCitationLink(citationIdx) : undefined}
              initialTab="original"
            />
          )}

          {/* 11. AI Clinical Reasoning */}
          {revealed && selected && (
            <div className="answer-section" style={{ marginTop: 8 }}>
              <AIClinicalReasoning
                userAnswer={selected}
                correctAnswer={question.answer}
                questionContext={{
                  question: question.text,
                  options: question.options,
                  system: question.system,
                  topic: question.topic,
                  difficulty: question.difficulty,
                  type: 'question',
                }}
                isCorrect={isCorrect(selected)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── My Notes Section (collapsible) ── */}
      <div className="border-t border-white/[0.06]">
        <button
          type="button"
          onClick={() => setNotesOpen((prev) => !prev)}
          className="w-full flex items-center gap-2 px-6 py-3 text-[#8b95a8] hover:text-[#f59e0b] hover:bg-[#f59e0b]/[0.03] transition-all"
        >
          {notesOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
          <StickyNote className="w-4 h-4" />
          <span className="text-xs font-semibold">My Notes</span>
          {noteText.trim() && (
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b] font-semibold">
              <StickyNote className="w-2.5 h-2.5" />
              Has note
            </span>
          )}
          {noteSaving && <Loader2 className="w-3 h-3 animate-spin text-[#f59e0b] ml-1" />}
        </button>
        {notesOpen && (
          <div className="px-6 pb-4">
            <textarea
              value={noteText}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Add your notes, key points, or reminders for this question…"
              rows={4}
              className="w-full bg-[#0c0e14] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8ecf4] placeholder-[#3a4055] resize-y min-h-[80px] focus:outline-none focus:border-[#f59e0b]/30 focus:ring-1 focus:ring-[#f59e0b]/20 transition-all"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-[#3a4055]">Auto-saves as you type</p>
              <div className="flex items-center gap-2">
                {noteSaving && (
                  <span className="text-[10px] text-[#f59e0b] flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Saving…
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
                    saveNote(noteText);
                  }}
                  disabled={noteSaving}
                  className="text-[10px] font-semibold px-3 py-1.5 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 transition-all disabled:opacity-50"
                >
                  Save Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Discussion Section (collapsible) ── */}
      <div className="border-t border-white/[0.06]">
        <button
          type="button"
          onClick={async () => {
            const opening = !discussionOpen;
            setDiscussionOpen(opening);
            if (opening && discussions.length === 0) {
              setDiscussionLoading(true);
              try {
                const res = await fetch(`/api/questions/discussions?questionId=${question.id}`);
                if (res.ok) {
                  const data = await res.json();
                  setDiscussions(data.discussions || []);
                  setDiscussionTotal(data.total || 0);
                }
              } catch { /* silently fail */ }
              setDiscussionLoading(false);
            }
          }}
          className="w-full flex items-center gap-2 px-6 py-3 text-[#8b95a8] hover:text-[#4fc3f7] hover:bg-[#4fc3f7]/[0.03] transition-all"
        >
          {discussionOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">Discussion</span>
          {discussionTotal > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 text-[#4fc3f7] font-semibold">
              {discussionTotal}
            </span>
          )}
          {discussionLoading && <Loader2 className="w-3 h-3 animate-spin text-[#4fc3f7] ml-1" />}
        </button>
        {discussionOpen && (
          <div className="px-6 pb-4">
            {/* Existing comments */}
            <div className="max-h-64 overflow-y-auto space-y-3 mb-3" style={{ scrollbarWidth: 'thin' }}>
              {discussions.length === 0 && !discussionLoading && (
                <p className="text-[11px] text-[#3a4055] text-center py-4">No comments yet. Start the discussion!</p>
              )}
              {discussions.map((d) => (
                <div key={d.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#4fc3f7]">
                    {(d.user.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#e8ecf4]">{d.user.name}</span>
                      {d.isExpert && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00e5a0]/10 text-[#00e5a0] font-bold">Expert</span>
                      )}
                      <span className="text-[9px] text-[#3a4055]">{new Date(d.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[11px] text-[#8b95a8] mt-0.5 leading-relaxed break-words">{d.content}</p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await fetch('/api/questions/discussions', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ discussionId: d.id, action: 'like' }),
                          });
                          setDiscussions((prev) => prev.map((item) => item.id === d.id ? { ...item, likes: item.likes + 1 } : item));
                        } catch { /* fail silently */ }
                      }}
                      className="flex items-center gap-1 mt-1 text-[#5a6478] hover:text-[#4fc3f7] transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-[10px]">{d.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Input field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && discussionInput.trim()) {
                    setDiscussionSubmitting(true);
                    try {
                      const res = await fetch('/api/questions/discussions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ questionId: question.id, content: discussionInput.trim() }),
                      });
                      if (res.ok) {
                        const newComment = await res.json();
                        setDiscussions((prev) => [newComment, ...prev]);
                        setDiscussionTotal((prev) => prev + 1);
                        setDiscussionInput('');
                        toast.success('Comment posted!');
                      } else {
                        toast.error('Failed to post comment');
                      }
                    } catch {
                      toast.error('Failed to post comment');
                    }
                    setDiscussionSubmitting(false);
                  }
                }}
                placeholder="Add a comment…"
                disabled={discussionSubmitting}
                className="flex-1 bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] text-[#e8ecf4] placeholder-[#3a4055] focus:outline-none focus:border-[#4fc3f7]/30 focus:ring-1 focus:ring-[#4fc3f7]/20 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                disabled={discussionSubmitting || !discussionInput.trim()}
                onClick={async () => {
                  if (!discussionInput.trim()) return;
                  setDiscussionSubmitting(true);
                  try {
                    const res = await fetch('/api/questions/discussions', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ questionId: question.id, content: discussionInput.trim() }),
                    });
                    if (res.ok) {
                      const newComment = await res.json();
                      setDiscussions((prev) => [newComment, ...prev]);
                      setDiscussionTotal((prev) => prev + 1);
                      setDiscussionInput('');
                      toast.success('Comment posted!');
                    } else {
                      toast.error('Failed to post comment');
                    }
                  } catch {
                    toast.error('Failed to post comment');
                  }
                  setDiscussionSubmitting(false);
                }}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/20 hover:bg-[#4fc3f7]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {discussionSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Share dialog (chat / group / feed — media intact) ── */}
      <ShareQuestionDialog
        questionId={question.id}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}
