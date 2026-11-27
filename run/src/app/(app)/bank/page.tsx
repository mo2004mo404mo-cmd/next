'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Question, MEDICAL_SYSTEMS, DIFFICULTY_OPTIONS, DIFFICULTY_LABELS, DIFFICULTY_COLORS, normalizeDifficulty, getDifficultyLevel } from '@/lib/medq-types';
import DifficultyIndicator, { DifficultyChip } from '@/components/medq/DifficultyIndicator';
import RichTextEditor from '@/components/medq/RichTextEditor';
import QuestionCard from '@/components/medq/QuestionCard';
import { downloadAsJSON, downloadAsPDF, downloadReferenceSheet } from '@/lib/download-utils';
import ImportQuestionsModal from '@/components/medq/ImportQuestionsModal';
import ExplainQuestionsModal from '@/components/medq/ExplainQuestionsModal';
import { toast } from 'sonner';
import { isOfflineError, browserIsOffline } from '@/lib/offline-response';
import { shouldUseOfflineAI, offlineChatAnswer } from '@/lib/offline-ai/helpers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { subscribeToReplayForPath } from '@/lib/offline-queue';
import {
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  Bot,
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  CheckSquare,
  Square,
  Download,
  FileJson,
  FileText,
  BookOpen,
  Volume2,
  Bookmark,
  BookmarkCheck,
  StickyNote,
  UploadCloud,
  Link2,
  Lightbulb,
  Image as ImageIcon,
} from 'lucide-react';

/* ── helpers ── */
const TYPE_OPTIONS = ['mcq', 'tf', 'short'] as const;
const SOURCE_OPTIONS = ['all', 'ai', 'manual'] as const;
const LETTERS = ['A', 'B', 'C', 'D'] as const;

function stripHtml(html: string): string {
  if (typeof document === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
}

/* ── Types ── */
interface QuestionsResponse {
  questions: Question[];
  total: number;
  page: number;
  totalPages: number;
}

interface EditFormState {
  text: string;
  explanation: string;
  mnemonic: string;
  clinicalPearl: string;
  distractorAnalysis: string;
  options: string[];
  answer: string;
  type: 'mcq' | 'tf' | 'short';
  difficulty: 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert';
  system: string;
  topic: string;
  tags: string[];
}

const emptyEditForm: EditFormState = {
  text: '',
  explanation: '',
  mnemonic: '',
  clinicalPearl: '',
  distractorAnalysis: '',
  options: ['', '', '', ''],
  answer: '',
  type: 'mcq',
  difficulty: 'Moderate',
  system: '',
  topic: '',
  tags: [],
};

/* ── Component ── */
export default function BankTab() {
  /* Real routing: question detail is a native <Link href="/bank/<id>">
     below — the (.)bank/[id] intercepting route renders it as a modal over
     this list (soft nav); a direct URL load renders the full detail page. */

  // Data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // True when the last fetch returned a 503 offline response (no cached
  // data available). Drives a dedicated "You're offline" empty state.
  const [offlineEmpty, setOfflineEmpty] = useState(false);

  // Filter state
  const [search, setSearch] = useState('');
  const [systemFilter, setSystemFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  /** Citation-status filter — server-side on /api/questions?citation=
   * (all | cited | uncited | verified). 'verified' = ≥1 citation whose
   * answer-support judge scored ≥ 8/10. */
  const [citationFilter, setCitationFilter] = useState<'all' | 'cited' | 'uncited' | 'verified'>('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  // View state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ── Citation deep link consumer — /bank?q=<questionId>&cite=<i> pins the
     linked question at the top (already revealed) and auto-opens its i-th
     citation in the source viewer, so the link lands directly on the cited
     passage in the original file. Links are produced by the citation chips
     and the source viewer's Link button. ── */
  const [pinnedQuestion, setPinnedQuestion] = useState<Question | null>(null);
  const [pinnedCite, setPinnedCite] = useState<number | null>(null);
  const [pinnedLoading, setPinnedLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qid = params.get('q');
    if (!qid) return;
    const citeRaw = Number(params.get('cite'));
    const cite = Number.isFinite(citeRaw) && citeRaw >= 0 ? Math.floor(citeRaw) : null;
    // Strip the deep-link params so they don't interfere with filters/pagination
    // (refresh re-pins only if the URL is shared/kept explicitly elsewhere).
    window.history.replaceState({}, '', window.location.pathname);
    let alive = true;
    (async () => {
      setPinnedLoading(true);
      try {
        const res = await fetch(`/api/questions/${encodeURIComponent(qid)}`);
        if (!res.ok) return;
        const q = await res.json();
        if (alive) {
          setPinnedQuestion(q as Question);
          setPinnedCite(cite);
        }
      } catch {
        /* ignore — the link is best-effort */
      } finally {
        if (alive) setPinnedLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>(emptyEditForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // AI assist loading state
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<Question | null>(null);

  // Selection & download state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Download state
  const [downloading, setDownloading] = useState<'json' | 'pdf' | 'refsheet' | null>(null);

  // Import dialog state — auto-opens on mount if a previous extraction
  // job is still resumable (localStorage pointer set by ImportQuestionsModal).
  // Without this, a page reload closes the modal and the re-attach logic
  // inside it never fires — the user thinks their upload is "gone".
  const [importOpen, setImportOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const raw = window.localStorage.getItem('medq:extract-job');
      if (!raw) return false;
      const entry = JSON.parse(raw);
      // 24-hour window matches EXTRACT_JOB_MAX_AGE_MS in the modal
      if (!entry?.at || Date.now() - entry.at > 24 * 60 * 60 * 1000) return false;
      if (!entry?.jobId) return false;
      return true; // auto-open so re-attach fires
    } catch { return false; }
  });
  const [generatingAudio, setGeneratingAudio] = useState(false);

  // AI explanation generator state (bank-wide or selected-questions mode)
  const [explainOpen, setExplainOpen] = useState(false);
  const [explainSelectedIds, setExplainSelectedIds] = useState<string[] | null>(null);

  // Bulk delete dialog state
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Bookmark & Notes state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [bookmarkFilterOn, setBookmarkFilterOn] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState<Record<string, boolean>>({});
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const noteSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Load bookmarks on mount ── */
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (!res.ok) return;
        const data = await res.json();
        const ids = new Set<string>((data.bookmarks as Array<{ questionId: string }>).map((b) => b.questionId));
        setBookmarkedIds(ids);
      } catch (err) {
        console.error('Fetch bookmarks error:', err);
      }
    };
    fetchBookmarks();
  }, []);

  /* ── Offline queue: refetch bookmarks when a queued bookmark POST/DELETE
       is successfully replayed by the service worker. ── */
  useEffect(() => {
    const refetchBookmarks = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (!res.ok) return;
        const data = await res.json();
        const ids = new Set<string>((data.bookmarks as Array<{ questionId: string }>).map((b) => b.questionId));
        setBookmarkedIds(ids);
      } catch { /* ignore */ }
    };
    return subscribeToReplayForPath('/api/bookmarks', refetchBookmarks);
  }, []);

  /* ── Bookmark toggle handler ── */
  const toggleBookmark = useCallback(async (questionId: string, e?: React.MouseEvent) => {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    setBookmarkLoading((prev) => ({ ...prev, [questionId]: true }));
    const isBookmarked = bookmarkedIds.has(questionId);
    try {
      const res = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      });
      if (!res.ok) throw new Error('Failed to toggle bookmark');
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (isBookmarked) next.delete(questionId); else next.add(questionId);
        return next;
      });
      toast.success(isBookmarked ? 'Bookmark removed' : 'Question bookmarked');
    } catch (err) {
      console.error('Bookmark toggle error:', err);
      toast.error('Failed to toggle bookmark');
    } finally {
      setBookmarkLoading((prev) => ({ ...prev, [questionId]: false }));
    }
  }, [bookmarkedIds]);

  /* ── Notes handlers ── */
  const openNotePopover = useCallback(async (questionId: string, e?: React.MouseEvent) => {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    setActiveNoteId(questionId);
    // Load existing note if not in map
    if (!(questionId in notesMap)) {
      try {
        const res = await fetch(`/api/notes?questionId=${questionId}`);
        if (res.ok) {
          const data = await res.json();
          const existing = data.note?.note || '';
          setNotesMap((prev) => ({ ...prev, [questionId]: existing }));
          setNoteText(existing);
        } else {
          setNoteText('');
        }
      } catch {
        setNoteText('');
      }
    } else {
      setNoteText(notesMap[questionId] || '');
    }
  }, [notesMap]);

  const saveNote = useCallback(async (questionId: string, text: string) => {
    setNoteSaving(true);
    try {
      if (text.trim()) {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId, note: text }),
        });
        if (!res.ok) throw new Error('Failed to save note');
      } else {
        const res = await fetch('/api/notes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId }),
        });
        if (!res.ok && res.status !== 404) throw new Error('Failed to delete note');
      }
      setNotesMap((prev) => ({ ...prev, [questionId]: text }));
      toast.success(text.trim() ? 'Note saved' : 'Note deleted');
    } catch (err) {
      console.error('Save note error:', err);
      toast.error('Failed to save note');
    } finally {
      setNoteSaving(false);
    }
  }, []);

  const handleNoteBlur = useCallback(() => {
    if (!activeNoteId) return;
    if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
    noteSaveTimer.current = setTimeout(() => {
      saveNote(activeNoteId, noteText);
    }, 500);
  }, [activeNoteId, noteText, saveNote]);

  const handleNoteSaveClick = useCallback(() => {
    if (!activeNoteId) return;
    if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
    saveNote(activeNoteId, noteText);
  }, [activeNoteId, noteText, saveNote]);

  // Filter questions by bookmark if filter is on
  const displayQuestions = bookmarkFilterOn
    ? questions.filter((q) => bookmarkedIds.has(q.id))
    : questions;

  /* ── Fetch questions ── */
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (systemFilter && systemFilter !== 'all') params.set('system', systemFilter);
      if (difficultyFilter && difficultyFilter !== 'all') params.set('difficulty', difficultyFilter);
      if (typeFilter && typeFilter !== 'all') params.set('type', typeFilter);
      if (search.trim()) params.set('search', search.trim());
      if (citationFilter !== 'all') params.set('citation', citationFilter);

      // Source filter (AI/Manual) handled client-side after fetch
      const res = await fetch(`/api/questions?${params.toString()}`);
      if (!res.ok) {
        // Distinguish "offline + no cache" from a real server error so we
        // can show a helpful empty state instead of a misleading toast.
        const errBody = await res.json().catch(() => null);
        if (isOfflineError(res, errBody)) {
          setQuestions([]);
          setTotal(0);
          setTotalPages(1);
          setOfflineEmpty(true);
        } else {
          throw new Error('Failed to fetch questions');
        }
      } else {
        const data: QuestionsResponse = await res.json();

        let filtered = data.questions;
        if (sourceFilter === 'ai') {
          filtered = filtered.filter((q) => q.isAIGenerated);
        } else if (sourceFilter === 'manual') {
          filtered = filtered.filter((q) => !q.isAIGenerated);
        }

        setQuestions(filtered);
        setTotal(sourceFilter !== 'all' ? filtered.length : data.total);
        setTotalPages(
          sourceFilter !== 'all'
            ? Math.max(1, Math.ceil(filtered.length / limit))
            : data.totalPages
        );
        setOfflineEmpty(false);
      }
    } catch (err) {
      console.error('Fetch questions error:', err);
      // Only show the error toast if this was NOT an offline response —
      // offline responses are handled by the `offlineEmpty` state above
      // which renders a dedicated "You're offline" empty state.
      if (!browserIsOffline()) {
        toast.error('Failed to load questions');
      }
    } finally {
      setLoading(false);
    }
  }, [page, systemFilter, difficultyFilter, typeFilter, sourceFilter, search, citationFilter]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Refresh when this tab becomes visible (user navigated back)
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === 'bank') fetchQuestions();
    };
    window.addEventListener('medq-tab-visible', handler as EventListener);
    return () => window.removeEventListener('medq-tab-visible', handler as EventListener);
  }, [fetchQuestions]);

  // Reset page and selection when filters change
  useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [systemFilter, difficultyFilter, typeFilter, sourceFilter, search, citationFilter]);

  // Toggle selection for a question
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Select / deselect all visible
  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === questions.length) {
        return new Set();
      }
      return new Set(questions.map((q) => q.id));
    });
  }, [questions]);

  // Generate audio for selected questions
  const handleGenerateAudio = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      toast.error('No questions selected');
      return;
    }
    setGeneratingAudio(true);
    try {
      const res = await fetch('/api/generate-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionIds: ids,
          generateImage: false,
          generateAudio: true,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate audio');
      }
      const data = await res.json();
      if (data.results) {
        let successCount = 0;
        for (const result of data.results) {
          if (result.audioUrl) successCount++;
        }
        toast.success(`Audio generated for ${successCount} question${successCount !== 1 ? 's' : ''}`);
        fetchQuestions();
      }
    } catch (err) {
      console.error('Bulk audio generation error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setGeneratingAudio(false);
    }
  }, [selectedIds, fetchQuestions]);

  // Download selected questions
  const handleDownloadSelected = useCallback(async (format: 'json' | 'pdf' | 'refsheet') => {
    const selected = questions.filter((q) => selectedIds.has(q.id));
    if (selected.length === 0) {
      toast.error('No questions selected');
      return;
    }
    setDownloading(format);
    try {
      if (format === 'json') {
        await downloadAsJSON(selected);
        toast.success(`Downloaded ${selected.length} question${selected.length > 1 ? 's' : ''} as JSON`);
      } else if (format === 'pdf') {
        await downloadAsPDF(selected);
        toast.success(`Downloaded ${selected.length} question${selected.length > 1 ? 's' : ''} as PDF`);
      } else if (format === 'refsheet') {
        await downloadReferenceSheet(selected);
        toast.success(`Generated reference sheet with ${selected.length} question${selected.length > 1 ? 's' : ''}`);
      }
    } catch (err) {
      console.error(`[MedQ] ${format} download error:`, err);
      const formatLabel = format === 'refsheet' ? 'Reference Sheet' : format.toUpperCase();
      const msg = err instanceof Error
        ? err.message
        : `Failed to download as ${formatLabel}. The question data may contain unsupported characters.`;
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  }, [questions, selectedIds]);

  /* ── Bulk delete handler ── */
  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.size === 0) return;
    setBulkDeleting(true);
    try {
      const res = await fetch('/api/questions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (!res.ok) throw new Error('Failed to delete questions');
      const data = await res.json();
      toast.success(`${data.deleted} question${data.deleted > 1 ? 's' : ''} deleted`);
      setBulkDeleteOpen(false);
      setSelectedIds(new Set());
      fetchQuestions();
    } catch (err) {
      console.error('Bulk delete error:', err);
      toast.error('Failed to delete selected questions');
    } finally {
      setBulkDeleting(false);
    }
  };

  /* ── Edit handlers ── */
  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setEditForm({
      text: question.text,
      explanation: question.explanation,
      mnemonic: question.mnemonic,
      clinicalPearl: question.clinicalPearl,
      distractorAnalysis: question.distractorAnalysis,
      options: question.options.length >= 4
        ? question.options.slice(0, 4)
        : [...question.options, ...Array(4 - question.options.length).fill('')],
      answer: question.answer,
      type: question.type,
      difficulty: question.difficulty,
      system: question.system,
      topic: question.topic,
      tags: question.tags,
    });
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        text: editForm.text,
        explanation: editForm.explanation,
        mnemonic: editForm.mnemonic,
        clinicalPearl: editForm.clinicalPearl,
        distractorAnalysis: editForm.distractorAnalysis,
        answer: editForm.answer,
        type: editForm.type,
        difficulty: editForm.difficulty,
        system: editForm.system,
        topic: editForm.topic,
        tags: editForm.tags,
      };
      if (editForm.type === 'mcq') {
        payload.options = editForm.options;
      }

      const res = await fetch(`/api/questions/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update question');

      toast.success('Question updated');
      setEditOpen(false);
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save question');
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete handlers ── */
  const handleDeleteClick = (question: Question) => {
    setDeletingId(question.id);
    setDeletingQuestion(question);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/questions/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete question');
      toast.success('Question deleted');
      setDeleteOpen(false);
      setDeletingId(null);
      setDeletingQuestion(null);
      fetchQuestions();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete question');
    }
  };

  /* ── AI Assist ── */
  const callAiAssist = async (
    type: 'improve' | 'explain' | 'mnemonic' | 'distractors' | 'clinicalPearl',
    field: string
  ) => {
    if (!editingId) return;
    setAiLoading((prev) => ({ ...prev, [field]: true }));
    try {
      const questionSnapshot: Record<string, unknown> = {
        text: editForm.text,
        type: editForm.type,
        options: editForm.type === 'mcq' ? editForm.options : undefined,
        answer: editForm.answer,
        difficulty: editForm.difficulty,
        system: editForm.system,
        topic: editForm.topic,
      };

      // ── Offline path: use on-device LLM if model is loaded ──
      if (shouldUseOfflineAI()) {
        try {
          const promptMap: Record<'improve' | 'explain' | 'mnemonic' | 'distractors' | 'clinicalPearl', string> = {
            improve: `Improve this medical question. Return the improved question text only.\n\nQuestion: ${editForm.text}\nTopic: ${editForm.topic}\nSystem: ${editForm.system}`,
            explain: `Explain the answer to this medical question in 2-3 sentences.\n\nQuestion: ${editForm.text}\nAnswer: ${editForm.answer}`,
            mnemonic: `Create a short mnemonic to help remember the answer to: ${editForm.text} (Answer: ${editForm.answer}). Return only the mnemonic.`,
            distractors: `For this MCQ, explain why each wrong option is wrong.\n\nQuestion: ${editForm.text}\nOptions: ${editForm.options.join(' | ')}\nCorrect: ${editForm.answer}`,
            clinicalPearl: `Write a clinical pearl (1-2 sentences) for: ${editForm.topic} (${editForm.system}).`,
          };
          const result = await offlineChatAnswer(promptMap[type], [], {
            maxTokens: 200,
          });
          const content = `⚠️ Offline answer (small model, may be less accurate):\n\n${result.trim()}`;
          setEditForm((prev) => ({ ...prev, [field]: content }));
          toast.success(`AI generated ${field} (offline)`);
        } catch (err) {
          console.error('offline ai-assist error:', err);
          toast.error('Offline AI failed — model may not be loaded');
        } finally {
          setAiLoading((prev) => ({ ...prev, [field]: false }));
        }
        return;
      }

      const res = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          question: questionSnapshot,
          topic: editForm.topic,
          system: editForm.system,
        }),
      });
      if (!res.ok) throw new Error('AI assist failed');
      const data = await res.json();

      if (type === 'improve' && typeof data.content === 'object' && data.content !== null) {
        const improved = data.content as Record<string, unknown>;
        setEditForm((prev) => ({
          ...prev,
          text: typeof improved.text === 'string' ? improved.text : prev.text,
          explanation: typeof improved.explanation === 'string' ? improved.explanation : prev.explanation,
          mnemonic: typeof improved.mnemonic === 'string' ? improved.mnemonic : prev.mnemonic,
          clinicalPearl: typeof improved.clinicalPearl === 'string' ? improved.clinicalPearl : prev.clinicalPearl,
          distractorAnalysis: typeof improved.distractorAnalysis === 'string' ? improved.distractorAnalysis : prev.distractorAnalysis,
          options: Array.isArray(improved.options) ? improved.options.map(String) : prev.options,
          answer: typeof improved.answer === 'string' ? improved.answer : prev.answer,
        }));
        toast.success('AI improved the question');
      } else if (typeof data.content === 'string') {
        setEditForm((prev) => ({ ...prev, [field]: data.content }));
        toast.success(`AI generated ${field}`);
      }
    } catch (err) {
      console.error('AI assist error:', err);
      toast.error('AI assistance failed');
    } finally {
      setAiLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  /* ── Update edit form helpers ── */
  const updateOption = (index: number, value: string) => {
    setEditForm((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  const updateTags = (value: string) => {
    setEditForm((prev) => ({
      ...prev,
      tags: value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }));
  };

  /* ── Render ── */
  return (
    <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/[0.1] flex items-center justify-center">
            <Filter className="w-5 h-5 text-[#00e5a0]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#e8ecf4]">Question Bank</h2>
            <p className="text-xs text-[#8b95a8] tabular-nums">{total} question{total === 1 ? '' : 's'}</p>
          </div>
        </div>
        {questions.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setImportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00e5a0] hover:bg-[#00e5a0]/10 bg-[#00e5a0]/[0.08] border border-[#00e5a0]/25 hover:border-[#00e5a0]/40 transition-all"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Import
            </button>
            <button
              type="button"
              onClick={() => {
                setExplainSelectedIds(null); // bank-wide: every question missing an explanation
                setExplainOpen(true);
              }}
              title="Generate rich AI teaching explanations for questions that lack one"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#f59e0b] hover:bg-[#f59e0b]/10 bg-[#f59e0b]/[0.08] border border-[#f59e0b]/25 hover:border-[#f59e0b]/40 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              AI Explanations
            </button>
            <button
              type="button"
              onClick={toggleSelectAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8b95a8] hover:text-[#e8ecf4] bg-[#1a1e2b] border border-white/[0.08] hover:border-white/[0.15] transition-all"
            >
              {selectedIds.size === questions.length ? (
                <CheckSquare className="w-3.5 h-3.5 text-[#00e5a0]" />
              ) : (
                <Square className="w-3.5 h-3.5" />
              )}
              {selectedIds.size === questions.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        )}
        {questions.length === 0 && !loading && (
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00e5a0] hover:bg-[#00e5a0]/10 bg-[#00e5a0]/[0.08] border border-[#00e5a0]/25 hover:border-[#00e5a0]/40 transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Import
          </button>
        )}
      </div>

      {/* ── Search Bar ── */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b95a8]" />
        <input
          type="text"
          placeholder="Search by topic, text, or system…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 pl-11 text-[#e8ecf4] placeholder:text-[#6b7590] text-sm focus:outline-none focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0] transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center text-[#8b95a8] hover:text-[#e8ecf4] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Filter Row ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* System Filter */}
        <Select value={systemFilter} onValueChange={(value) => setSystemFilter(value ?? 'all')}>
          <SelectTrigger aria-label="Filter by system" className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue placeholder="System" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Systems</SelectItem>
            {MEDICAL_SYSTEMS.map((s) => (
              <SelectItem key={s} value={s} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Difficulty Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyChip
            level={0}
            label="All"
            active={difficultyFilter === 'all'}
            onClick={() => setDifficultyFilter('all')}
          />
          {DIFFICULTY_OPTIONS.map((d, i) => {
            const level = i + 1;
            return (
              <DifficultyChip
                key={d}
                level={level}
                label={d}
                active={difficultyFilter === d}
                onClick={() => setDifficultyFilter(difficultyFilter === d ? 'all' : d)}
              />
            );
          })}
        </div>

        {/* Type Filter */}
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value ?? 'all')}>
          <SelectTrigger aria-label="Filter by question type" className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[120px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Types</SelectItem>
            {TYPE_OPTIONS.map((t) => (
              <SelectItem key={t} value={t} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                {t === 'mcq' ? 'MCQ' : t === 'tf' ? 'True/False' : 'Short Answer'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Source Filter */}
        <Select value={sourceFilter} onValueChange={(value) => setSourceFilter(value ?? 'all')}>
          <SelectTrigger aria-label="Filter by source" className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[120px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Sources</SelectItem>
            <SelectItem value="ai" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">AI Generated</SelectItem>
            <SelectItem value="manual" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">Manual</SelectItem>
          </SelectContent>
        </Select>

        {/* Evidence Filter — citation status of the question (server-side). */}
        <Select value={citationFilter} onValueChange={(value) => setCitationFilter((value as typeof citationFilter) ?? 'all')}>
          <SelectTrigger aria-label="Filter by evidence level" className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[150px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue placeholder="Evidence" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Evidence</SelectItem>
            <SelectItem value="verified" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
              ✅ Verified (judge ≥ 8/10)
            </SelectItem>
            <SelectItem value="cited" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
              🔗 Cited (any strength)
            </SelectItem>
            <SelectItem value="uncited" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
              ⚪ Without citations
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Bookmark Filter Toggle */}
        <button
          type="button"
          onClick={() => setBookmarkFilterOn((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            bookmarkFilterOn
              ? 'bg-[#00e5a0]/10 border-[#00e5a0]/25 text-[#00e5a0]'
              : 'bg-[#1a1e2b] border-white/[0.08] text-[#8b95a8] hover:text-[#e8ecf4] hover:border-white/[0.15]'
          }`}
        >
          {bookmarkFilterOn ? (
            <BookmarkCheck className="w-3.5 h-3.5" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}
          Bookmarked
        </button>

        {/* Active filter count */}
        {(systemFilter !== 'all' || difficultyFilter !== 'all' || typeFilter !== 'all' || sourceFilter !== 'all' || citationFilter !== 'all' || bookmarkFilterOn) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSystemFilter('all');
              setDifficultyFilter('all');
              setTypeFilter('all');
              setSourceFilter('all');
              setCitationFilter('all');
              setBookmarkFilterOn(false);
            }}
            className="text-[#5a6178] hover:text-[#e8ecf4] text-xs h-8"
          >
            <X className="w-3 h-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* ── Pinned question from a citation deep link (/bank?q=<id>&cite=<i>) ── */}
      {(pinnedQuestion || pinnedLoading) && (
        <div className="mb-6 rounded-2xl border border-[#4fc3f7]/25 bg-[#4fc3f7]/[0.03] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#4fc3f7]/15">
            <Link2 className="w-3.5 h-3.5 text-[#4fc3f7] shrink-0" />
            <span className="text-[11px] font-semibold text-[#4fc3f7]">Opened from citation link</span>
            <span className="text-[10px] text-[#5a6178] hidden sm:inline">— lands directly on the cited passage</span>
            <button
              type="button"
              onClick={() => { setPinnedQuestion(null); setPinnedCite(null); }}
              className="ml-auto text-[#5a6178] hover:text-[#e8ecf4] transition-colors p-1"
              aria-label="Dismiss pinned question"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {pinnedQuestion ? (
            <QuestionCard
              key={`pinned-${pinnedQuestion.id}`}
              question={pinnedQuestion}
              forceRevealed
              initialCitationIndex={pinnedCite ?? undefined}
              attemptMode="bank"
            />
          ) : (
            <div className="flex items-center gap-2 px-4 py-6 text-xs text-[#5a6178]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4fc3f7]" />
              Loading linked question…
            </div>
          )}
        </div>
      )}

      {/* ── Question List ── */}
      {loading ? (
        <div className="flex flex-col gap-3" role="status" aria-label="Loading questions">
          <span className="sr-only">Loading questions…</span>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1a1e2b] border border-white/[0.06] rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="medq-skeleton w-5 h-5 rounded" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="medq-skeleton h-3 w-28 rounded-full" />
                  <div className="medq-skeleton h-4 w-3/4 rounded-full" />
                </div>
                <div className="medq-skeleton w-16 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : offlineEmpty && questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffb347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          </div>
          <p className="text-[#ffb347] text-sm font-semibold">You&apos;re offline</p>
          <p className="text-[#5a6178] text-xs mt-1 text-center max-w-xs">
            The question bank hasn&apos;t been cached yet. Open this tab while
            online once, and your questions will be available offline
            afterwards.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => fetchQuestions()}
          >
            <Loader2 className="w-3 h-3 mr-1" /> Retry
          </Button>
        </div>
      ) : questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-[#8b95a8]" />
          </div>
          <p className="text-[#8b95a8] text-sm">No questions found</p>
          <p className="text-[#8b95a8] text-xs mt-1">Try adjusting your search or filters</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch('');
              setSystemFilter('all');
              setDifficultyFilter('all');
              setTypeFilter('all');
              setSourceFilter('all');
              setCitationFilter('all');
              setBookmarkFilterOn(false);
            }}
          >
            <X className="w-3 h-3 mr-1" /> Clear all filters
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayQuestions.map((question, idx) => {
            const isExpanded = expandedId === question.id;
            const plainText = stripHtml(question.text);
            const isBookmarked = bookmarkedIds.has(question.id);
            const hasNote = question.id in notesMap && notesMap[question.id]?.trim().length > 0;

            return (
              <div
                key={question.id}
                className={`bg-[#1a1e2b] border rounded-xl overflow-hidden transition-all hover:border-white/[0.1] ${selectedIds.has(question.id) ? 'border-[#00e5a0]/25 bg-[#00e5a0]/[0.02]' : 'border-white/[0.06]'}`}
              >
                {/* Card header row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Selection checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleSelect(question.id)}
                    className={`flex-shrink-0 transition-colors ${selectedIds.has(question.id) ? 'text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4]'}`}
                  >
                    {selectedIds.has(question.id) ? (
                      <CheckSquare className="w-4.5 h-4.5" />
                    ) : (
                      <Square className="w-4.5 h-4.5" />
                    )}
                  </button>
                  {/* Question preview */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold ${
                          question.type === 'mcq'
                            ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                            : question.type === 'tf'
                              ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                              : 'bg-[#b79bff]/10 text-[#b79bff]'
                        } border-0 px-2 py-0.5`}
                      >
                        {question.type === 'mcq' ? 'MCQ' : question.type === 'tf' ? 'TF' : 'Short'}
                      </Badge>
                      <DifficultyIndicator
                        difficulty={question.difficulty}
                        variant="badge"
                        size="sm"
                        showLabel={true}
                      />
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5"
                      >
                        {question.system}
                      </Badge>
                      {question.isAIGenerated && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold bg-[#b388ff]/10 text-[#b388ff] border-0 px-2 py-0.5"
                        >
                          <Bot className="w-2.5 h-2.5 mr-0.5" />
                          AI
                        </Badge>
                      )}
                      {question.imageUrl && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold bg-[#f472b6]/10 text-[#f472b6] border-0 px-2 py-0.5"
                          title="This question has an attached image"
                        >
                          <ImageIcon className="w-2.5 h-2.5 mr-0.5" />
                          Image
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {question.imageUrl && (
                        // Small thumbnail so users can see at a glance which
                        // collapsed rows have images (the QuestionCard itself
                        // shows the full image when the row is expanded).
                        <img
                          src={question.imageUrl}
                          alt=""
                          className="w-10 h-10 rounded-md object-cover border border-white/[0.08] flex-shrink-0 bg-[#0f1118]/50"
                          loading="lazy"
                        />
                      )}
                      {/* REAL routing: a native <Link> to /bank/<id> — the
                          (.)bank/[id] intercepting route renders it as a
                          modal over this list (soft nav), and a direct load
                          renders the full detail page. No role="link" div,
                          no manual keyboard handling — the anchor does it. */}
                      <Link
                        href={`/bank/${question.id}`}
                        className="text-sm text-[#c8cdd8] truncate flex-1 min-w-0 cursor-pointer hover:text-[#e8ecf4] transition-colors"
                        title="Open question detail"
                      >
                        {plainText.slice(0, 120)}{plainText.length > 120 ? '…' : ''}
                      </Link>
                    </div>
                  </div>

                  {/* Bookmark & Note indicators */}
                  <div className="flex items-center gap-0.5 flex-shrink-0 mr-1">
                    {/* Bookmark toggle */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(question.id, e)}
                      disabled={bookmarkLoading[question.id]}
                      className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${
                        isBookmarked
                          ? 'text-[#00e5a0] bg-[#00e5a0]/10 hover:bg-[#00e5a0]/20'
                          : 'text-[#3a4055] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10'
                      } disabled:opacity-50`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
                    >
                      {bookmarkLoading[question.id] ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    {/* Notes indicator & popover */}
                    <Popover
                      open={activeNoteId === question.id}
                      onOpenChange={(open) => {
                        if (!open) {
                          handleNoteBlur();
                          setActiveNoteId(null);
                        }
                      }}
                    >
                      <PopoverTrigger
                        type="button"
                        onClick={(e) => openNotePopover(question.id, e)}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${
                          hasNote
                            ? 'text-[#f59e0b] bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20'
                            : 'text-[#3a4055] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10'
                        }`}
                        title={hasNote ? 'Edit note' : 'Add note'}
                      >
                        <StickyNote className="w-4 h-4" />
                      </PopoverTrigger>
                      <PopoverContent
                        className="bg-[#1a1e2b] border-white/[0.1] w-72 p-0 shadow-xl"
                        align="end"
                        side="bottom"
                      >
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[#e8ecf4] flex items-center gap-1.5">
                              <StickyNote className="w-3.5 h-3.5 text-[#f59e0b]" />
                              Quick Note
                            </span>
                            <button
                              type="button"
                              onClick={handleNoteSaveClick}
                              disabled={noteSaving}
                              className="text-[10px] font-semibold text-[#00e5a0] hover:text-[#00e5a0]/80 disabled:opacity-50 transition-colors"
                            >
                              {noteSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save'}
                            </button>
                          </div>
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            onBlur={handleNoteBlur}
                            placeholder="Add a note for this question…"
                            rows={4}
                            className="w-full bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#e8ecf4] placeholder-[#3a4055] resize-none focus:outline-none focus:border-[#f59e0b]/30 focus:ring-1 focus:ring-[#f59e0b]/20 transition-all"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      href={`/bank/${question.id}`}
                      title="View question detail"
                      aria-label="View question detail"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#5a6178] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10"
                      onClick={() => handleEdit(question)}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#5a6178] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
                      onClick={() => handleDeleteClick(question)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded view */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06]">
                    <QuestionCard key={question.id} question={question} index={idx} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Download Action Bar ── */}
      {selectedIds.size > 0 && !loading && (
        <div className="sticky bottom-0 mt-4 p-4 bg-[#1a1e2b]/95 backdrop-blur-xl border border-[#00e5a0]/20 rounded-xl flex items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00e5a0]/10 flex items-center justify-center">
              <Download className="w-4 h-4 text-[#00e5a0]" />
            </div>
            <span className="text-sm font-semibold text-[#e8ecf4]">
              {selectedIds.size} question{selectedIds.size > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownloadSelected('json')}
              disabled={downloading !== null}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading === 'json' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileJson className="w-3.5 h-3.5" />}
              JSON
            </button>
            <button
              type="button"
              onClick={() => handleDownloadSelected('pdf')}
              disabled={downloading !== null}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
              PDF
            </button>
            <button
              type="button"
              onClick={() => handleDownloadSelected('refsheet')}
              disabled={downloading !== null}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#b79bff]/10 border border-[#b79bff]/25 text-[#b79bff] hover:bg-[#b79bff]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading === 'refsheet' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BookOpen className="w-3.5 h-3.5" />}
              Ref Sheet
            </button>
            <button
              type="button"
              onClick={handleGenerateAudio}
              disabled={generatingAudio}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingAudio ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
              Audio
            </button>
            <button
              type="button"
              onClick={() => {
                setExplainSelectedIds([...selectedIds]);
                setExplainOpen(true);
              }}
              title="Generate rich AI teaching explanations for the selected questions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Explain ({selectedIds.size})
            </button>
            <button
              type="button"
              onClick={() => setBulkDeleteOpen(true)}
              disabled={bulkDeleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#ff5757]/10 border border-[#ff5757]/25 text-[#ff5757] hover:bg-[#ff5757]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bulkDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              Delete ({selectedIds.size})
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="p-2 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && questions.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
          <p className="text-xs text-[#5a6178]">
            Page {page} of {totalPages} · {total} total
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-30"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Edit Dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#e8ecf4] flex items-center gap-2">
              <Pencil className="w-4 h-4 text-[#f59e0b]" />
              Edit Question
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Type & Difficulty Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">Type</Label>
                <Select
                  value={editForm.type}
                  onValueChange={(v) =>
                    setEditForm((prev) => ({
                      ...prev,
                      type: v as 'mcq' | 'tf' | 'short',
                      answer: v === 'tf' ? (prev.answer === 'True' || prev.answer === 'False' ? prev.answer : 'True') : prev.answer,
                    }))
                  }
                >
                  <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
                    <SelectItem value="mcq" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">MCQ</SelectItem>
                    <SelectItem value="tf" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">True/False</SelectItem>
                    <SelectItem value="short" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">Difficulty</Label>
                <Select
                  value={normalizeDifficulty(editForm.difficulty)}
                  onValueChange={(v) =>
                    setEditForm((prev) => ({ ...prev, difficulty: v as 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert' }))
                  }
                >
                  <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
                    {DIFFICULTY_OPTIONS.map((d, i) => {
                      const level = i + 1;
                      const color = DIFFICULTY_COLORS[level];
                      return (
                        <SelectItem key={d} value={d} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                            {d} (Level {level})
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* System & Topic Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">System</Label>
                <Select
                  value={editForm.system}
                  onValueChange={(v) => setEditForm((prev) => ({ ...prev, system: v ?? '' }))}
                >
                  <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs">
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
                    {MEDICAL_SYSTEMS.map((s) => (
                      <SelectItem key={s} value={s} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">Topic</Label>
                <Input
                  value={editForm.topic}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, topic: e.target.value }))}
                  className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9"
                  placeholder="e.g. Hypertension"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-[#8b92a8] text-xs mb-1.5 block">Tags (comma-separated)</Label>
              <Input
                value={editForm.tags.join(', ')}
                onChange={(e) => updateTags(e.target.value)}
                className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9"
                placeholder="e.g. cardiology, pharmacology"
              />
              {editForm.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {editForm.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Question Text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[#8b92a8] text-xs">Question Text</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-[#b388ff] hover:text-[#b388ff] hover:bg-[#b388ff]/10 px-2"
                  onClick={() => callAiAssist('improve', 'text')}
                  disabled={aiLoading.text}
                >
                  {aiLoading.text ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3 mr-1" />
                  )}
                  AI Improve
                </Button>
              </div>
              <p className="text-[10px] text-[#3a4055] mb-1">Tip: Select text to see formatting options</p>
              <RichTextEditor
                value={editForm.text}
                onChange={(v) => setEditForm((prev) => ({ ...prev, text: v }))}
                placeholder="Enter question text…"
                minHeight="80px"
              />
            </div>

            {/* MCQ Options */}
            {editForm.type === 'mcq' && (
              <div>
                <Label className="text-[#8b92a8] text-xs mb-2 block">Options</Label>
                <div className="space-y-2">
                  {editForm.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#3a4055] w-5 text-center">{LETTERS[i]}</span>
                      <Input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-8 flex-1"
                        placeholder={`Option ${LETTERS[i]}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Label className="text-[#8b92a8] text-xs mb-1.5 block">Correct Answer</Label>
                  <Select
                    value={editForm.answer}
                    onValueChange={(v) => setEditForm((prev) => ({ ...prev, answer: v ?? '' }))}
                  >
                    <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
                      {editForm.options.map((opt, i) => (
                        <SelectItem
                          key={i}
                          value={opt}
                          className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]"
                        >
                          {LETTERS[i]}. {opt || `Option ${LETTERS[i]}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* TF Answer */}
            {editForm.type === 'tf' && (
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">Correct Answer</Label>
                <Select
                  value={editForm.answer}
                  onValueChange={(v) => setEditForm((prev) => ({ ...prev, answer: v ?? '' ?? '' }))}
                >
                  <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs">
                    <SelectValue placeholder="Select answer" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
                    <SelectItem value="True" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">True</SelectItem>
                    <SelectItem value="False" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Short Answer */}
            {editForm.type === 'short' && (
              <div>
                <Label className="text-[#8b92a8] text-xs mb-1.5 block">Answer</Label>
                <Input
                  value={editForm.answer}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, answer: e.target.value }))}
                  className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9"
                  placeholder="Enter correct answer"
                />
              </div>
            )}

            <Separator className="bg-white/[0.06]" />

            {/* Explanation */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[#8b92a8] text-xs">Explanation</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-[#3b82f6] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 px-2"
                  onClick={() => callAiAssist('explain', 'explanation')}
                  disabled={aiLoading.explanation}
                >
                  {aiLoading.explanation ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Bot className="w-3 h-3 mr-1" />
                  )}
                  Generate Explanation
                </Button>
              </div>
              <p className="text-[10px] text-[#3a4055] mb-1">Tip: Select text to see formatting options</p>
              <RichTextEditor
                value={editForm.explanation}
                onChange={(v) => setEditForm((prev) => ({ ...prev, explanation: v }))}
                placeholder="Enter explanation…"
                minHeight="80px"
              />
            </div>

            {/* Mnemonic */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[#8b92a8] text-xs">Mnemonic</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-[#8b5cf6] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/10 px-2"
                  onClick={() => callAiAssist('mnemonic', 'mnemonic')}
                  disabled={aiLoading.mnemonic}
                >
                  {aiLoading.mnemonic ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Bot className="w-3 h-3 mr-1" />
                  )}
                  Generate Mnemonic
                </Button>
              </div>
              <p className="text-[10px] text-[#3a4055] mb-1">Tip: Select text to see formatting options</p>
              <RichTextEditor
                value={editForm.mnemonic}
                onChange={(v) => setEditForm((prev) => ({ ...prev, mnemonic: v }))}
                placeholder="Enter mnemonic…"
                minHeight="60px"
              />
            </div>

            {/* Clinical Pearl */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[#8b92a8] text-xs">Clinical Pearl</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 px-2"
                  onClick={() => callAiAssist('clinicalPearl', 'clinicalPearl')}
                  disabled={aiLoading.clinicalPearl}
                >
                  {aiLoading.clinicalPearl ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Bot className="w-3 h-3 mr-1" />
                  )}
                  Generate Pearl
                </Button>
              </div>
              <p className="text-[10px] text-[#3a4055] mb-1">Tip: Select text to see formatting options</p>
              <RichTextEditor
                value={editForm.clinicalPearl}
                onChange={(v) => setEditForm((prev) => ({ ...prev, clinicalPearl: v }))}
                placeholder="Enter clinical pearl…"
                minHeight="60px"
              />
            </div>

            {/* Distractor Analysis */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[#8b92a8] text-xs">Distractor Analysis</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] text-[#f59e0b] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10 px-2"
                  onClick={() => callAiAssist('distractors', 'distractorAnalysis')}
                  disabled={aiLoading.distractorAnalysis}
                >
                  {aiLoading.distractorAnalysis ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Bot className="w-3 h-3 mr-1" />
                  )}
                  Generate Distractors
                </Button>
              </div>
              <p className="text-[10px] text-[#3a4055] mb-1">Tip: Select text to see formatting options</p>
              <RichTextEditor
                value={editForm.distractorAnalysis}
                onChange={(v) => setEditForm((prev) => ({ ...prev, distractorAnalysis: v }))}
                placeholder="Enter distractor analysis…"
                minHeight="60px"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setEditOpen(false)}
              className="text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#00e5a0] text-[#0d1117] hover:bg-[#00e5a0]/90 font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#e8ecf4] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#ef4444]" />
              Delete Question
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a6178]">
              {deletingQuestion && (
                <>
                  Are you sure you want to delete this question? This action cannot be undone.
                  <div className="mt-3 p-3 bg-[#1a1e2b] rounded-lg border border-white/[0.06]">
                    <p className="text-[#8b92a8] text-xs">
                      {stripHtml(deletingQuestion.text).slice(0, 150)}
                      {stripHtml(deletingQuestion.text).length > 150 ? '…' : ''}
                    </p>
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/[0.08] text-[#8b92a8] hover:bg-white/[0.06] hover:text-[#e8ecf4]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Bulk Delete Confirmation Dialog ── */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#e8ecf4] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#ff5757]" />
              Delete Selected Questions
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a6178]">
              Are you sure you want to delete {selectedIds.size} question{selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/[0.08] text-[#8b92a8] hover:bg-white/[0.06] hover:text-[#e8ecf4]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDeleteConfirm}
              className="bg-[#ff5757] text-white hover:bg-[#ff5757]/90"
            >
              Delete {selectedIds.size} Question{selectedIds.size > 1 ? 's' : ''}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Import Questions Dialog ── */}
      <ImportQuestionsModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onImported={() => {
          // Refresh the bank list to show the new questions
          setPage(1);
          fetchQuestions();
        }}
      />

      {/* ── AI Explanations Dialog (bank-wide or selected questions) ── */}
      <ExplainQuestionsModal
        open={explainOpen}
        onOpenChange={setExplainOpen}
        selectedIds={explainSelectedIds}
        onCompleted={() => {
          // Explanations were written — refresh so cards show them immediately.
          fetchQuestions();
        }}
      />
    </div>
  );
}
