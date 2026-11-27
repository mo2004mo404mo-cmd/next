'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, MEDICAL_SYSTEMS, TOPIC_MAP, DIFFICULTY_OPTIONS, QUESTION_TYPES } from '@/lib/medq-types';
import { generateOfflineQuestions, cacheQuestions, getCachedCountBySystem, getOfflineAvailability } from '@/lib/offline-ai-engine';
import QuestionCard from '@/components/medq/QuestionCard';
import { downloadAsJSON, downloadAsPDF } from '@/lib/download-utils';
import KnowledgeLibraryPanel from '@/components/medq/KnowledgeLibraryPanel';
import {
  extractFromFile,
  isFileTypeSupported,
  formatFileSize,
  getFileTypeLabel,
  type ExtractedContent,
  type ExtractionProgress,
} from '@/lib/file-extract';
import { useResumableUpload } from '@/lib/uploads/use-resumable-upload';
import { drainGeneratePrefill, clearGeneratePrefill, type GeneratePrefill } from '@/lib/generate-prefill';
import { ResumableUploadProgress } from '@/components/medq/ResumableUploadProgress';
import { toast } from 'sonner';
import { useJobSocket, type JobProgress } from '@/hooks/use-job-socket';
import { browserAI, type ModelStatus, type ModelInfo } from '@/lib/browser-ai';
import {
  Bolt,
  Loader2,
  ListChecks,
  ToggleLeft,
  PenLine,
  Sprout,
  Flame,
  Skull,
  Sparkles,
  FileJson,
  FileText,
  WifiOff,
  CloudOff,
  Cpu,
  Zap,
  Library,
  Database,
  Brain,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Upload,
  FileUp,
  File,
  Eye,
  FileType2,
  Bot,
} from 'lucide-react';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  mcq: <ListChecks className="w-3.5 h-3.5" />,
  tf: <ToggleLeft className="w-3.5 h-3.5" />,
  short: <PenLine className="w-3.5 h-3.5" />,
};

const TYPE_LABELS: Record<string, string> = {
  mcq: 'MCQ',
  tf: 'True/False',
  short: 'Short Answer',
};

const DIFF_ICONS: Record<string, React.ReactNode> = {
  Easy: <Sprout className="w-3.5 h-3.5" />,
  Medium: <Flame className="w-3.5 h-3.5" />,
  Hard: <Skull className="w-3.5 h-3.5" />,
};

type GenMode = 'online' | 'offline';
type SourceMode = 'topic' | 'file';
type EngineMode = 'agent' | 'fast';

interface GenerateTabProps {
  onQuestionsGenerated?: (questions: Question[]) => void;
}

export default function GenerateTab({ onQuestionsGenerated }: GenerateTabProps) {
  // Starts EMPTY — the demo-leftover hardcoded 'ACE inhibitors' default
  // prefilled every fresh visit and leaked into generations when the user
  // forgot to change it. The placeholder guides the input instead.
  const [topic, setTopic] = useState('');
  const [system, setSystem] = useState('');
  const [activeTypes, setActiveTypes] = useState<string[]>(['mcq']);
  const [activeDiffs, setActiveDiffs] = useState<string[]>(['Medium']);
  const [count, setCount] = useState(2);
  const [generating, setGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  // Agent engine (default): builds each part separately + creates media (images/audio/video)
  const [engineMode, setEngineMode] = useState<EngineMode>('agent');

  // ── Weakness-targeted generation ──
  const [weakness, setWeakness] = useState<{
    overall: { attempts: number; correct: number; accuracy: number };
    weakAreas: Array<{ system: string; topic: string; attempts: number; correct: number; accuracy: number }>;
    recommendation: { topic: string; system: string; suggestedCount: number };
  } | null>(null);
  const [weaknessLoading, setWeaknessLoading] = useState(false);
  // ── Deep-agent tuning (wired to /api/generate/deep-agent params) ──
  // "Target my weak areas" inclusion for the MAIN Generate run (the weakness
  // card's own button stays as the one-click auto-pick path).
  const [includeWeakTopics, setIncludeWeakTopics] = useState(false);
  // Extra guidance → deep agent `focusHint` (was a dead API param until now).
  const [focusHint, setFocusHint] = useState('');
  // Per-request model override → deep agent `model` ("providerId:modelId",
  // e.g. "zai:glm-4.5"). Empty = account default (resolved server-side).
  const [modelOverride, setModelOverride] = useState('');
  const [accountModel, setAccountModel] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [downloading, setDownloading] = useState<'json' | 'pdf' | null>(null);
  // Start with server-safe defaults to avoid hydration mismatch
  const [isOnline, setIsOnline] = useState(true);
  const [genMode, setGenMode] = useState<GenMode>('online');
  const [offlineAvail, setOfflineAvail] = useState<{ cached: number; templates: number; total: number } | null>(null);

  // Browser AI state — start with safe defaults, update after mount
  const [aiModelStatus, setAiModelStatus] = useState<ModelStatus>({ loaded: false, loading: false, progress: 0, modelId: null, error: null });
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string>('Llama-3.2-1B-Instruct-q4f16_1-MLC');

  // File upload state
  const [sourceMode, setSourceMode] = useState<SourceMode>('topic');
  const [extractedFile, setExtractedFile] = useState<ExtractedContent | null>(null);
  // Stage 13 UX: resumable upload hook drives progress + pause/resume/cancel.
  const {
    state: uploadState,
    upload: startResumableUpload,
    pause: pauseUpload,
    resume: resumeUpload,
    cancel: cancelUpload,
    reset: resetUpload,
  } = useResumableUpload();
  const [isDragOver, setIsDragOver] = useState(false);
  const [showContentPreview, setShowContentPreview] = useState(false);
  // ── Knowledge Library (RAG grounding) ──
  const [knowledgeSourceIds, setKnowledgeSourceIds] = useState<string[]>([]);
  const [mediaRagUploading, setMediaRagUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Generation timeout guard ──
  const genTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Output workspace (right column on desktop, section below the form on mobile) —
  // scrolled into view when generation starts so progress is visible immediately.
  const workspaceRef = useRef<HTMLDivElement>(null);
  const scrollWorkspaceIntoView = useCallback(() => {
    // Defer one frame so the progress banner is mounted before scrolling.
    requestAnimationFrame(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);
  // Agent mode runs 5 stages per question (incl. media generation) — allow up to 8 min
  const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? 180 * 60_000 : 60 * 60_000;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    };
  }, []);

  // ── Prefill from the AI agent / pricing CTA ("medq-generate-questions") ──
  // Dispatchers navigate to /generate first and fire the event ~500 ms later,
  // but a cold compile of this route can outlast that, so they also stash
  // the payload in sessionStorage (src/lib/generate-prefill.ts). Drain the
  // stash on mount, then keep listening — whichever arrives first wins.
  useEffect(() => {
    const DIFF_MAP: Record<string, string> = {
      easy: 'Easy', basic: 'Basic', medium: 'Moderate', moderate: 'Moderate',
      hard: 'Hard', expert: 'Expert',
    };
    const applyPrefill = (d: GeneratePrefill | null | undefined) => {
      if (!d) return;
      if (typeof d.topic === 'string' && d.topic) {
        setTopic(d.topic);
        setSourceMode('topic');
        setExtractedFile(null);
      }
      if (typeof d.count === 'number' && d.count > 0) setCount(Math.min(Math.floor(d.count), 50));
      if (typeof d.difficulty === 'string' && d.difficulty) {
        const mapped = DIFF_MAP[d.difficulty.toLowerCase()];
        if (mapped) setActiveDiffs([mapped]);
        else setActiveDiffs([...DIFFICULTY_OPTIONS]); // 'mixed' / unknown → all levels
      }
    };
    applyPrefill(drainGeneratePrefill());
    const onPrefillEvent = (e: Event) => {
      clearGeneratePrefill();
      applyPrefill((e as CustomEvent).detail as GeneratePrefill | undefined);
    };
    window.addEventListener('medq-generate-questions', onPrefillEvent as EventListener);
    return () => window.removeEventListener('medq-generate-questions', onPrefillEvent as EventListener);
  }, []);

  // Hydration-safe: set browser-only values after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);
    setAiModelStatus(browserAI.getModelStatus());
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Subscribe to browser AI status
  useEffect(() => {
    const unsub = browserAI.subscribe(() => {
      setAiModelStatus(browserAI.getModelStatus());
    });
    return unsub;
  }, []);

  // Update offline availability when topic/system changes
  useEffect(() => {
    if (topic && system) {
      const avail = getOfflineAvailability(topic, system);
      setOfflineAvail(avail);
    } else {
      setOfflineAvail(null);
    }
  }, [topic, system]);

  // Auto-switch to offline mode when going offline
  useEffect(() => {
    if (!isOnline && genMode === 'online') {
      setGenMode('offline');
    }
  }, [isOnline, genMode]);

  const toggleType = (value: string) => {
    setActiveTypes((prev) => {
      const next = prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value];
      return next.length === 0 ? prev : next;
    });
  };

  const toggleDiff = (value: string) => {
    setActiveDiffs((prev) => {
      const next = prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value];
      return next.length === 0 ? prev : next;
    });
  };

  // ── File handling ──
  const handleFileSelect = useCallback(async (file: File) => {
    // Media files (audio/video) cannot be extracted client-side — route them
    // through the server-side knowledge pipeline: upload → ASR/VLM → RAG index.
    const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/') || /\.(mp3|wav|m4a|aac|ogg|flac|wma|opus|mp4|mov|mkv|avi|webm|3gp|aiff)$/i.test(file.name);
    if (isMedia) {
      setMediaRagUploading(file.name);
      try {
        const form = new FormData();
        form.append('file', file, file.name);
        const res = await fetch('/api/knowledge/upload', { method: 'POST', body: form });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `Upload failed (${res.status})`);
        // Auto-select the new source for grounding.
        setKnowledgeSourceIds((ids) => (ids.includes(json.sourceId) ? ids : [...ids, json.sourceId]));
        const autoTopic = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        if (!topic.trim()) setTopic(autoTopic);
        toast.success(`"${file.name}" uploaded — transcribing server-side. It is pre-selected in the Knowledge Library below; press Generate once it turns ready.`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Media upload failed');
      } finally {
        setMediaRagUploading(null);
      }
      return;
    }
    if (!isFileTypeSupported(file)) {
      toast.error(`Unsupported file type. Supported: PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP`);
      return;
    }

    // Stage 13 UX: the per-plan cap (visitor 2MB … pro 100MB) is enforced
    // server-side at POST /api/uploads and surfaced through the resumable
    // error state with a precise message. This guard only short-circuits the
    // pointless round-trip for a file above the ABSOLUTE 100MB ceiling.
    if (file.size > 100 * 1024 * 1024) {
      toast.error(`File is ${Math.round((file.size / 1024 / 1024) * 10) / 10}MB — above the 100MB absolute cap.`);
      return;
    }

    try {
      // Stage 13 UX: the hook drives progress + pause/resume/cancel. On
      // success it sets state to 'done' and returns the content; on failure
      // or cancel it sets state to 'error'/'cancelled' — the component
      // shows the right message + Retry button, so we don't toast here.
      const content = await startResumableUpload(file);
      setExtractedFile(content);
      resetUpload(); // hide the progress UI — the file-info card takes over

      // Auto-set topic from filename if not already set
      const autoTopic = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      if (!topic.trim()) {
        setTopic(autoTopic);
      }

      toast.success(`Extracted content from ${file.name}${content.imageUrls?.length ? ' (includes images for AI vision)' : ''}`);
    } catch (error) {
      // Don't toast — the <ResumableUploadProgress> error state shows the
      // message + a Retry button. Cancels also land here (UploadCancelledError)
      // but the component shows the cancelled state, not an error.
      if (!/cancel/i.test(error instanceof Error ? error.message : String(error))) {
        // Only toast for unexpected errors the component can't show
        toast.error(error instanceof Error ? error.message : 'Failed to extract file content');
      }
    }
  }, [topic, startResumableUpload, resetUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  }, [handleFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const clearFile = useCallback(() => {
    setExtractedFile(null);
    resetUpload();
    setShowContentPreview(false);
  }, [resetUpload]);

  // ── Account default model (shown as the placeholder for the override) ──
  useEffect(() => {
    fetch('/api/user/default-model')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { defaultModel?: string | null } | null) => {
        if (data?.defaultModel) setAccountModel(data.defaultModel);
      })
      .catch(() => { /* placeholder stays generic */ });
  }, []);

  // ── Weakness analysis loader ──
  const loadWeaknessAnalysis = useCallback(async () => {
    setWeaknessLoading(true);
    try {
      const res = await fetch('/api/generate/weakness');
      const data = await res.json();
      if (res.ok) {
        setWeakness(data);
        if (!data.weakAreas?.length) {
          toast.info('Not enough answer history yet — answer a few questions and come back!');
        }
      } else if (res.status !== 401) {
        toast.error(data.error || 'Could not load weakness analysis');
      } else {
        toast.error('Log in to target your weaknesses');
      }
    } catch {
      toast.error('Could not load weakness analysis');
    } finally {
      setWeaknessLoading(false);
    }
  }, []);

  // ── Socket.io for real-time job progress ──
  const { connected: socketConnected, listenToJob, stopListening } = useJobSocket({
    pollUrl: engineMode === 'agent' ? '/api/generate/deep-agent' : '/api/generate',
    pollIntervalMs: 3000,
    onProgress: (data) => {
      setProgressMsg(data.progress || 'Processing...');

      // Stream partial results — show each question as it's generated
      if (data.partialResult) {
        setQuestions(prev => {
          // Avoid duplicates (partialResult might be re-sent)
          const newQ = data.partialResult as Question;
          if (prev.some(q => q.id === newQ.id)) return prev;
          const updated = [...prev, newQ];
          cacheQuestions(updated);
          onQuestionsGenerated?.(updated);
          return updated;
        });
      }

      // Reset timeout on each progress update
      if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
      genTimeoutRef.current = setTimeout(() => {
        toast.error('Generation timed out. Please try again.');
        setGenerating(false);
        setProgressMsg('');
        stopListening();
      }, GENERATION_TIMEOUT_MS);
    },
    onCompleted: (data) => {
      // Clear timeout
      if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }

      if (data.result && Array.isArray(data.result) && data.result.length > 0) {
        const qs = data.result as Question[];
        setQuestions(qs);
        cacheQuestions(qs);
        onQuestionsGenerated?.(qs);
        toast.success(`Generated ${qs.length} question${qs.length > 1 ? 's' : ''} (AI)`);
      } else if (questions.length === 0) {
        // Completed but no results at all — likely parsing failed
        toast.error('Generation completed but no questions could be parsed. Try again with different parameters.');
      }
      setGenerating(false);
      setProgressMsg('');
    },
    onFailed: (data) => {
      // Clear timeout
      if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
      toast.error(data.error || 'Generation failed');
      setGenerating(false);
      setProgressMsg('');
    },
  });

  // ── Start a batch generation job (sends count to server) ──
  const startBatchJob = useCallback(async (
    url: string,
    body: Record<string, unknown>,
  ) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server error ${res.status}`);
    }

    const { jobId } = await res.json();
    if (!jobId) throw new Error('Server did not return a job ID');

    // Listen for real-time progress via socket
    listenToJob(jobId);
  }, [listenToJob]);

  // ── Weakness-targeted generation (agent pipeline, auto-picked weak topics) ──
  const handleWeaknessGenerate = useCallback(async () => {
    setGenerating(true);
    setQuestions([]);
    setEngineMode('agent'); // weakness jobs run through the agent pipeline
    scrollWorkspaceIntoView();
    if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    genTimeoutRef.current = setTimeout(() => {
      toast.error('Generation timed out. Please try again.');
      setGenerating(false);
      setProgressMsg('');
      stopListening();
    }, GENERATION_TIMEOUT_MS);

    try {
      await startBatchJob('/api/generate/weakness', {});
      toast.success('🎯 Targeting your weakest areas…');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Weakness generation failed');
      setGenerating(false);
      setProgressMsg('');
      if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
    }
  }, [startBatchJob, stopListening, scrollWorkspaceIntoView]);

  // ── Generate ──
  const handleGenerate = useCallback(async () => {
    const effectiveTopic = sourceMode === 'file' ? (topic.trim() || extractedFile?.fileName?.replace(/\.[^.]+$/, '') || 'Medical') : topic.trim();
    const effectiveSystem = system || 'General';

    if (sourceMode === 'topic' && !effectiveTopic) {
      toast.error('Please enter a topic');
      return;
    }
    if (sourceMode === 'file' && !extractedFile && knowledgeSourceIds.length === 0) {
      toast.error('Please upload a file first (or select a source from the Knowledge Library)');
      return;
    }

    setGenerating(true);
    setQuestions([]);
    scrollWorkspaceIntoView();
    const totalToGenerate = Math.min(Math.max(count, 1), 100);

    // Start a global timeout for the entire generation
    if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    genTimeoutRef.current = setTimeout(() => {
      toast.error('Generation timed out. Please try again.');
      setGenerating(false);
      setProgressMsg('');
      stopListening();
    }, GENERATION_TIMEOUT_MS);

    try {
      let generatedQuestions: Question[] = [];

      if (genMode === 'offline' && sourceMode !== 'file') {
        // Offline generation (non-file mode) — keeps original batch approach
        if (browserAI.isModelLoaded()) {
          try {
            const prompt = `Generate ${totalToGenerate} medical questions about "${effectiveTopic}" in the ${effectiveSystem} system. 
Types: ${activeTypes.join(', ')}. Difficulty: ${activeDiffs.join(', ')}.
For each question, provide a JSON array where each object has: type (mcq/tf/short), text, options (for mcq), answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags.
Return ONLY valid JSON, no other text.`;

            const result = await browserAI.generate(prompt, 2048);
            let parsed: Question[] = [];
            try {
              const jsonMatch = result.match(/\[[\s\S]*\]/);
              if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
            } catch {}

            if (parsed.length > 0) {
              generatedQuestions = parsed.map((q, i) => ({
                id: `browser-ai-${Date.now()}-${i}`,
                type: q.type || 'mcq',
                text: q.text || '',
                options: q.options || [],
                answer: q.answer || '',
                explanation: q.explanation || '',
                mnemonic: q.mnemonic || '',
                clinicalPearl: q.clinicalPearl || '',
                distractorAnalysis: q.distractorAnalysis || '',
                difficulty: q.difficulty || 'Medium',
                system: effectiveSystem,
                topic: effectiveTopic,
                tags: q.tags || [effectiveTopic, effectiveSystem, 'browser-ai'],
                isAIGenerated: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }));
              cacheQuestions(generatedQuestions);
              toast.success(`Generated ${generatedQuestions.length} questions (Browser AI)`);
            } else {
              await new Promise((resolve) => setTimeout(resolve, 500));
              generatedQuestions = generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
              toast.success(`Generated ${generatedQuestions.length} questions (Template Engine — AI output unparseable)`);
            }
          } catch {
            await new Promise((resolve) => setTimeout(resolve, 500));
            generatedQuestions = generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
            toast.success(`Generated ${generatedQuestions.length} questions (Template Engine)`);
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));
          generatedQuestions = generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
          toast.success(`Generated ${generatedQuestions.length} question${generatedQuestions.length > 1 ? 's' : ''} (Offline)`);
        }
      } else if (sourceMode === 'file' && extractedFile) {
        // File-based generation — send count to server, one async job
        if (!navigator.onLine) {
          toast.error('File-based generation requires internet. Please connect and try again.');
          setGenerating(false);
          setProgressMsg('');
          if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
          return;
        }

        setProgressMsg('Starting file-based generation...');
        try {
          await startBatchJob('/api/generate-from-file', {
            fileContent: extractedFile!.text || '',
            fileName: extractedFile!.fileName || '',
            fileType: extractedFile!.fileType || '',
            topic: effectiveTopic,
            system: effectiveSystem,
            types: activeTypes,
            difficulties: activeDiffs,
            count: totalToGenerate,
            imageUrls: extractedFile!.imageUrls || [],
          });
          // Async job started — socket/poll callbacks will handle setGenerating(false)
          // Do NOT reset generating state here
          return;
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to start generation');
          setGenerating(false);
          setProgressMsg('');
          if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
          return;
        }
      } else {
        // Online AI generation — send count to server, one async job
        if (!navigator.onLine) {
          toast.error('You are offline. Switching to offline mode.');
          setGenMode('offline');
          setGenerating(false);
          setProgressMsg('');
          if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
          return;
        }

        setProgressMsg(engineMode === 'agent' || knowledgeSourceIds.length ? '🤖 Deep agent starting…' : 'Starting generation...');
        try {
          // RAG grounding requires the agent pipeline — force it when sources are selected.
          const useAgentEngine = engineMode === 'agent' || knowledgeSourceIds.length > 0;
          // ── Deep-agent tuning params (previously dead API fields) ──
          // weakTopics: the learner's measured weak areas, sent when the
          // "include weak areas" toggle is on and analysis data exists.
          const weakTopicList = includeWeakTopics && weakness?.weakAreas?.length
            ? weakness.weakAreas.slice(0, 5).map((w) => (w.topic ? `${w.topic} (${w.system})` : `${w.system} — weakest areas`))
            : undefined;
          // focusHint: the user's extra guidance, augmented with the accuracy
          // context when weak-area targeting is active.
          const trimmedHint = focusHint.trim().slice(0, 400);
          const effectiveFocusHint = [
            trimmedHint || null,
            weakTopicList
              ? `Target the learner's weakest areas (overall accuracy ${(weakness!.overall.accuracy * 100).toFixed(0)}% over ${weakness!.overall.attempts} attempts) — drill the frequently-confused concepts.`
              : null,
          ].filter(Boolean).join(' ') || undefined;
          const effectiveModel = modelOverride.trim() || undefined;
          await startBatchJob(useAgentEngine ? '/api/generate/deep-agent' : '/api/generate', {
            topic: effectiveTopic,
            types: activeTypes,
            difficulties: activeDiffs,
            system: effectiveSystem,
            count: totalToGenerate,
            ...(useAgentEngine ? {
              ...(weakTopicList ? { weakTopics: weakTopicList } : {}),
              ...(effectiveFocusHint ? { focusHint: effectiveFocusHint } : {}),
              ...(effectiveModel ? { model: effectiveModel } : {}),
            } : {}),
            ...(useAgentEngine && knowledgeSourceIds.length ? { knowledgeSourceIds } : {}),
          });
          // Async job started — socket/poll callbacks will handle setGenerating(false)
          // Do NOT reset generating state here
          return;
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to start generation');
          setGenerating(false);
          setProgressMsg('');
          if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
          return;
        }
      }

      setQuestions(generatedQuestions);
      onQuestionsGenerated?.(generatedQuestions);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate questions');
    } finally {
      // Only reset generating for synchronous (offline) path
      // For async jobs (online/file), socket/poll callbacks handle this
      if (genMode === 'offline' && sourceMode !== 'file') {
        setGenerating(false);
        setProgressMsg('');
      }
      if (genTimeoutRef.current && genMode === 'offline' && sourceMode !== 'file') {
        clearTimeout(genTimeoutRef.current);
        genTimeoutRef.current = null;
      }
    }
  }, [topic, system, activeTypes, activeDiffs, count, genMode, sourceMode, extractedFile, knowledgeSourceIds, onQuestionsGenerated, startBatchJob, includeWeakTopics, weakness, focusHint, modelOverride, scrollWorkspaceIntoView]);

  const handleLoadAiModel = useCallback(async () => {
    try {
      await browserAI.loadModel(selectedModelId);
      toast.success('AI model loaded successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load model');
    }
  }, [selectedModelId]);

  const handleUnloadAiModel = useCallback(() => {
    browserAI.unloadModel();
    toast.success('AI model unloaded');
  }, []);

  const availableModels = browserAI.getAvailableModels();
  // Only check WebGPU support after mount to avoid hydration mismatch
  const isWebGpuSupported = mounted ? browserAI.isSupported() : false;

  const isFileMode = sourceMode === 'file';

  return (
    <div>
      {/* ── Offline AI Warning ── */}
      {!isOnline && (
        <div className="mb-6 bg-[#ffb347]/10 border border-[#ffb347]/25 rounded-xl px-5 py-4 flex items-start gap-3">
          <CloudOff className="w-5 h-5 text-[#ffb347] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#ffb347]">You are offline</p>
            <p className="text-xs text-[#ffb347]/70 mt-1">
              AI generation requires internet, but you can still generate questions using the <strong>Offline Engine</strong> — powered by built-in medical templates, cached questions, or a <strong>Browser AI model</strong> if downloaded.
              {isFileMode && <span className="block mt-1 text-[#ff5757]">⚠️ File-based generation requires internet connection.</span>}
            </p>
          </div>
        </div>
      )}

      {/* ── Workbench layout ──
          Desktop (lg+): config rail on the left + output workspace on the right,
          so the full content width is used and results live beside the form
          instead of appearing below a narrow left-aligned column.
          Mobile (<lg): degrades to the same single column as before. ── */}
      <div className="lg:grid lg:grid-cols-[minmax(340px,430px)_minmax(0,1fr)] xl:grid-cols-[minmax(380px,470px)_minmax(0,1fr)] lg:gap-6 items-start">
        {/* ── Left rail: configuration (sticky with its own thin scroll) ── */}
        <div className="lg:sticky lg:top-2 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto custom-scrollbar lg:pr-1">

      {/* ── Browser AI Model Panel ── */}
      {showAiPanel && (
        <div className="mb-6 bg-[#151821] border border-[#8b5cf6]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#8b5cf6]" />
              <h3 className="text-sm font-bold text-[#e8ecf4]">Browser AI Model</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6] font-semibold">
                Offline-Ready
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAiPanel(false)}
              className="p-1.5 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isWebGpuSupported ? (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#ff5757]/5 border border-[#ff5757]/20">
              <AlertTriangle className="w-5 h-5 text-[#ff5757] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#ff5757]">WebGPU Not Available</p>
                <p className="text-xs text-[#ff5757]/70 mt-1">
                  Browser AI requires WebGPU. Use Chrome 113+ or Edge 113+.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#5a6478] font-semibold">Status</span>
                  {aiModelStatus.loaded ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#00e5a0] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Model Loaded
                    </span>
                  ) : aiModelStatus.loading ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#ffb347] font-semibold">
                      <Loader2 className="w-3 h-3 animate-spin" /> Loading... {aiModelStatus.progress}%
                    </span>
                  ) : aiModelStatus.error ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#ff5757] font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Error
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#5a6478] font-semibold">No Model</span>
                  )}
                </div>
                {aiModelStatus.loading && (
                  <div className="w-full bg-white/[0.06] rounded-full h-2 mb-1">
                    <div className="h-2 rounded-full bg-[#8b5cf6] transition-all duration-300" style={{ width: `${aiModelStatus.progress}%` }} />
                  </div>
                )}
                {aiModelStatus.error && <p className="text-[10px] text-[#ff5757] mt-1">{aiModelStatus.error}</p>}
                {aiModelStatus.loaded && aiModelStatus.modelId && (
                  <p className="text-[10px] text-[#8b95a8] mt-1">Active: {availableModels.find(m => m.id === aiModelStatus.modelId)?.name || aiModelStatus.modelId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2 block">Select Model</label>
                <div className="grid gap-2">
                  {availableModels.map((model: ModelInfo) => (
                    <button key={model.id} type="button" onClick={() => setSelectedModelId(model.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${selectedModelId === model.id ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#e8ecf4]">{model.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[#5a6478] font-medium">{model.size}</span>
                      </div>
                      <p className="text-[10px] text-[#5a6478] mt-0.5">{model.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {!aiModelStatus.loaded ? (
                  <button type="button" onClick={handleLoadAiModel} disabled={aiModelStatus.loading}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#8b5cf6]/25">
                    {aiModelStatus.loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Downloading... {aiModelStatus.progress}%</> : <><Download className="w-4 h-4" /> Download & Load Model</>}
                  </button>
                ) : (
                  <button type="button" onClick={handleUnloadAiModel}
                    className="flex-1 py-3 rounded-xl bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#ff5757]/20 transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" /> Unload Model
                  </button>
                )}
              </div>
              <p className="text-[10px] text-[#3a4055] mt-3">⚡ Browser AI runs on your device — no internet needed after download.</p>
            </>
          )}
        </div>
      )}

      {/* ── Form Panel ── */}
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-5 sm:p-6 lg:p-6 mb-8 lg:mb-0">
        {/* Generation Mode Toggle */}
        <div className="mb-6">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Generation Mode</label>
          <div className="flex gap-2 flex-wrap">
            <button type="button" onClick={() => setGenMode('online')} disabled={!isOnline}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${genMode === 'online' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'} ${!isOnline ? 'opacity-40 cursor-not-allowed' : ''}`}>
              <Zap className="w-3.5 h-3.5" /> AI (Online)
            </button>
            <button type="button" onClick={() => setGenMode('offline')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${genMode === 'offline' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
              <Cpu className="w-3.5 h-3.5" /> Offline Engine
            </button>
            {isWebGpuSupported && (
              <button type="button" onClick={() => setShowAiPanel(!showAiPanel)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${showAiPanel || aiModelStatus.loaded ? 'bg-[#8b5cf6]/10 border border-[#8b5cf6]/35 text-[#8b5cf6]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
                <Brain className="w-3.5 h-3.5" /> Browser AI {aiModelStatus.loaded && <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />}
              </button>
            )}
          </div>
          {genMode === 'online' && <p className="text-[10px] text-[#5a6478] mt-2 flex items-center gap-1"><Zap className="w-3 h-3" /> High-quality questions with rich formatting</p>}
          {genMode === 'offline' && <p className="text-[10px] text-[#5a6478] mt-2 flex items-center gap-1"><Cpu className="w-3 h-3" /> Works without internet — templates + cached questions{aiModelStatus.loaded && ' + Browser AI model'}</p>}
          {genMode === 'offline' && offlineAvail && (
            <div className="mt-2 flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-[#00e5a0]"><Database className="w-3 h-3" /> {offlineAvail.cached} cached</span>
              <span className="flex items-center gap-1 text-[#8b95a8]"><Cpu className="w-3 h-3" /> {offlineAvail.templates} templates</span>
              {aiModelStatus.loaded && <span className="flex items-center gap-1 text-[#8b5cf6]"><Brain className="w-3 h-3" /> AI ready</span>}
            </div>
          )}
        </div>

        {/* ── Source Mode Toggle: Topic vs File ── */}
        <div className="mb-6">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Source</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setSourceMode('topic')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${sourceMode === 'topic' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/35 text-[#4fc3f7]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
              <Bolt className="w-3.5 h-3.5" /> Topic
            </button>
            <button type="button" onClick={() => setSourceMode('file')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${sourceMode === 'file' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/35 text-[#4fc3f7]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
              <FileUp className="w-3.5 h-3.5" /> From File
              {extractedFile && <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />}
            </button>
          </div>
          {sourceMode === 'file' && (
            <p className="text-[10px] text-[#5a6478] mt-2 flex items-center gap-1">
              <FileUp className="w-3 h-3 shrink-0" />
              PDF, DOCX, TXT, or image → questions. Audio/video are transcribed into the Knowledge Library.
            </p>
          )}
        </div>

        {/* ── Generation Engine: Agent vs Fast ── (topic mode only) */}
        {sourceMode === 'topic' && (
          <div className="mb-6">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Engine</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEngineMode('agent')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${engineMode === 'agent' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
                <Bot className="w-3.5 h-3.5" /> Deep Agent Mode
              </button>
              <button type="button" onClick={() => setEngineMode('fast')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${engineMode === 'fast' ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/35 text-[#f59e0b]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
                <Zap className="w-3.5 h-3.5" /> Fast Mode
              </button>
            </div>
            <p className="text-[10px] text-[#5a6478] mt-2 flex items-center gap-1.5">
              {engineMode === 'agent' ? (
                <>
                  <Bot className="w-3 h-3 text-[#00e5a0]/70 shrink-0" />
                  <span title="A real autonomous deep agent — it plans its own steps, delegates writing to a specialist subagent, calls tools (web search, image generation, audio, your knowledge library), and saves each question itself">
                    Thorough mode: researches sources, verifies facts. Takes 2–3 min.
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-[#f59e0b]/70 shrink-0" />
                  Single LLM call — text-only questions, fastest.
                </>
              )}
            </p>
          </div>
        )}

        {/* ── Knowledge Library (RAG grounding) — topic mode, agent engine ── */}
        {sourceMode === 'topic' && (
          <div className="mb-6">
            <KnowledgeLibraryPanel
              selectedIds={knowledgeSourceIds}
              onToggle={(id) => setKnowledgeSourceIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))}
              autoSelectNew={false}
              onSourcesReady={(ready) => {
                const newlySelected = ready.filter((s) => knowledgeSourceIds.includes(s.id));
                if (newlySelected.length) {
                  toast.success(`${newlySelected.length === 1 ? newlySelected[0].name : newlySelected.length + ' sources'} indexed — ready to ground generation`);
                }
              }}
            />
            {engineMode === 'agent' && knowledgeSourceIds.length > 0 && (
              <p className="text-[10px] text-[#00e5a0] mt-2 flex items-center gap-1">
                <Library className="w-3 h-3" />
                RAG grounding active — questions will be written from the selected sources&rsquo; passages, with citations
              </p>
            )}
            {engineMode === 'fast' && knowledgeSourceIds.length > 0 && (
              <p className="text-[10px] text-[#f59e0b] mt-2 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                RAG grounding needs Agent Mode — switch engines to use the library
              </p>
            )}
          </div>
        )}

        {/* ── File Upload Area ── */}
        {sourceMode === 'file' && (
          <div className="mb-5">
            {!extractedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragOver
                    ? 'border-[#4fc3f7]/50 bg-[#4fc3f7]/5 scale-[1.01]'
                    : 'border-white/[0.1] bg-[#1a1e2b] hover:border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/[0.03]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md,.csv,.tsv,.png,.jpg,.jpeg,.webp,.bmp,.gif,.mp3,.wav,.m4a,.aac,.ogg,.flac,.opus,.mp4,.mov,.mkv,.avi,.webm"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {uploadState ? (
                  <ResumableUploadProgress
                    state={uploadState}
                    onPause={pauseUpload}
                    onResume={resumeUpload}
                    onCancel={cancelUpload}
                    onRetry={() => fileInputRef.current?.click()}
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4fc3f7]/10 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-[#4fc3f7]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#e8ecf4] font-semibold">
                        {isDragOver ? 'Drop your file here' : 'Drop a file or click to upload'}
                      </p>
                      <p className="text-xs text-[#5a6478] mt-1">
                        PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP — up to 100MB (plan-dependent)
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#3a4055]">
                      <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> PDF</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> DOCX</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> TXT</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><FileType2 className="w-3 h-3" /> Images</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── File uploaded — show info card ── */
              <div className="bg-[#1a1e2b] border border-[#4fc3f7]/20 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0">
                    <File className="w-6 h-6 text-[#4fc3f7]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#e8ecf4] truncate">{extractedFile.fileName}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#4fc3f7]/10 text-[#4fc3f7] font-semibold flex-shrink-0">
                        {getFileTypeLabel({ name: extractedFile.fileName } as File)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#5a6478]">
                      <span>{formatFileSize(extractedFile.fileSize)}</span>
                      {extractedFile.pageCount && <span>{extractedFile.pageCount} pages</span>}
                      <span>{extractedFile.text.length.toLocaleString()} chars extracted</span>
                      {extractedFile.imageUrls?.length && (
                        <span className="text-[#8b5cf6] flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {extractedFile.imageUrls.length} image(s) for AI vision
                        </span>
                      )}
                    </div>

                    {/* Content preview toggle */}
                    <button type="button" onClick={() => setShowContentPreview(!showContentPreview)}
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-[#4fc3f7] hover:text-[#7fd7f9] transition-colors cursor-pointer">
                      <Eye className="w-3 h-3" />
                      {showContentPreview ? 'Hide content preview' : 'Preview extracted content'}
                    </button>
                  </div>
                  <button type="button" onClick={clearFile}
                    className="p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all cursor-pointer" title="Remove file">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content preview */}
                {showContentPreview && (
                  <div className="mt-4 p-4 bg-[#0c0e14] rounded-xl border border-white/[0.06] max-h-64 overflow-y-auto">
                    <pre className="text-[11px] text-[#8b95a8] whitespace-pre-wrap font-mono leading-relaxed">
                      {extractedFile.text.slice(0, 3000)}{extractedFile.text.length > 3000 ? '\n\n[... truncated preview ...]' : ''}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Knowledge Library (file mode) — media uploads land here ── */}
        {sourceMode === 'file' && (
          <div className="mb-6">
            <KnowledgeLibraryPanel
              selectedIds={knowledgeSourceIds}
              onToggle={(id) => setKnowledgeSourceIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))}
              autoSelectNew
              onSourcesReady={(ready) => {
                toast.success(
                  `${ready.length === 1 ? `"${ready[0].name}"` : ready.length + ' sources'} indexed${ready[0]?.meta?.chunks ? ` (${ready[0].meta.chunks} passages)` : ''} — ready to ground generation`,
                );
              }}
            />
            {knowledgeSourceIds.length > 0 && (
              <p className="text-[10px] text-[#00e5a0] mt-2 flex items-center gap-1">
                <Library className="w-3 h-3" />
                Selected sources will ground Agent-mode generation with cited passages — switch the Engine to Agent Mode and press Generate
              </p>
            )}
          </div>
        )}

        {/* Topic input (only in topic mode) */}
        {sourceMode === 'topic' && (
          <div className="mb-5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g. ACE inhibitors, COPD management, Multiple sclerosis..."
              className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all" />
            {system && TOPIC_MAP[system] && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {TOPIC_MAP[system].map((t) => (
                  <button key={t} type="button" onClick={() => setTopic(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.06] bg-white/[0.03] text-[#5a6478] hover:bg-[#00e5a0]/[0.08] hover:border-[#00e5a0]/20 hover:text-[#00e5a0] transition-all">
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* ── Weakness-targeted generation (learning-science mode) ── */}
            <div className="mt-3.5 rounded-xl border border-[#ff5757]/[0.15] bg-[#ff5757]/[0.03] p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#ff5757]/10 border border-[#ff5757]/20 flex items-center justify-center text-sm flex-shrink-0">🎯</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#e8ecf4]">Target my weaknesses</p>
                  <p className="text-[10px] text-[#5a6478]">
                    {weakness
                      ? `${weakness.overall.attempts} attempts analyzed · ${(weakness.overall.accuracy * 100).toFixed(0)}% overall accuracy`
                      : 'analyzes your answers, then drills what you miss most'}
                  </p>
                </div>
                {!weakness && (
                  <button
                    type="button"
                    onClick={loadWeaknessAnalysis}
                    disabled={weaknessLoading || generating}
                    className="px-3.5 py-2 rounded-lg text-[11px] font-bold bg-white/[0.05] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.1] disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
                  >
                    {weaknessLoading ? <span className="w-3 h-3 border-2 border-[#5a6478]/40 border-t-[#e8ecf4] rounded-full animate-spin" /> : 'Analyze'}
                  </button>
                )}
              </div>

              {weakness && (
                <div className="mt-3">
                  {weakness.weakAreas.length > 0 ? (
                    <>
                      <div className="space-y-1 mb-3">
                        {weakness.weakAreas.slice(0, 4).map((w, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px]">
                            <span className="flex-1 truncate text-[#c8d0e0]">
                              {w.topic ? `${w.topic}` : `${w.system}`} <span className="text-[#5a6478]">({w.system})</span>
                            </span>
                            <div className="w-20 h-1.5 rounded-full bg-white/[0.05] overflow-hidden flex-shrink-0">
                              <div className="h-full rounded-full" style={{ width: `${w.accuracy * 100}%`, background: w.accuracy < 0.4 ? '#ff5757' : w.accuracy < 0.6 ? '#f59e0b' : '#4fc3f7' }} />
                            </div>
                            <span className="text-[10px] text-[#8b95a8] tabular-nums w-14 text-right flex-shrink-0">
                              {(w.accuracy * 100).toFixed(0)}% · {w.attempts}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Weak-area targeting for the MAIN Generate run (deep-agent weakTopics param) */}
                      {engineMode === 'agent' && (
                        <button
                          type="button"
                          onClick={() => setIncludeWeakTopics((v) => !v)}
                          className={`w-full mb-3 py-2 px-3 rounded-lg text-left text-[11px] font-semibold border transition-all flex items-center gap-2.5 ${
                            includeWeakTopics
                              ? 'bg-[#ff5757]/[0.14] border-[#ff5757]/40 text-[#ff8a8a]'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 text-[9px] ${
                            includeWeakTopics ? 'bg-[#ff5757] border-[#ff5757] text-white' : 'border-white/[0.2]'
                          }`}>
                            {includeWeakTopics ? '✓' : ''}
                          </span>
                          <span className="flex-1">Also target my weak areas in the main Generate run (top 5 above)</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleWeaknessGenerate}
                        disabled={generating}
                        className="w-full py-2.5 rounded-lg text-[11px] font-bold bg-[#ff5757]/[0.12] text-[#ff8a8a] border border-[#ff5757]/30 hover:bg-[#ff5757]/[0.2] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {generating ? (
                          <>
                            <span className="w-3 h-3 border-2 border-[#ff5757]/30 border-t-[#ff8a8a] rounded-full animate-spin" />
                            generating targeted questions…
                          </>
                        ) : (
                          <>🎯 Generate {weakness.recommendation.suggestedCount} targeted questions — {weakness.recommendation.system} / {weakness.recommendation.topic}</>
                        )}
                      </button>
                    </>
                  ) : (
                    <p className="text-[10px] text-[#5a6478] py-1.5">
                      No weak areas detected yet — answer questions in the bank and the analyzer will find them.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Topic input for file mode (optional override) */}
        {sourceMode === 'file' && (
          <div className="mb-5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">
              Topic <span className="text-[#3a4055] lowercase tracking-normal font-normal">(auto-detected, editable)</span>
            </label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic from file name..."
              className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#4fc3f7]/40 focus:ring-2 focus:ring-[#4fc3f7]/10 transition-all" />
          </div>
        )}

        {/* System */}
        <div className="mb-5">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">
            Medical System {sourceMode === 'file' && <span className="text-[#3a4055] lowercase tracking-normal font-normal">(optional for files)</span>}
          </label>
          <select value={system} onChange={(e) => setSystem(e.target.value)}
            className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%235a6478' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
            <option value="">Select a system...</option>
            {MEDICAL_SYSTEMS.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>

        {/* Types + Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Question Types</label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_TYPES.map((type) => (
                <button key={type} type="button" onClick={() => toggleType(type)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTypes.includes(type) ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
                  {TYPE_ICONS[type]} {TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_OPTIONS.map((diff) => (
                <button key={diff} type="button" onClick={() => toggleDiff(diff)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeDiffs.includes(diff) ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`}>
                  {DIFF_ICONS[diff]} {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-6 max-w-[160px]">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">Count</label>
          <input type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 100))}
            className="w-20 bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm text-center outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all" />
        </div>

        {/* ── Deep-agent tuning: extra guidance + model override (agent engine only) ── */}
        {sourceMode === 'topic' && (engineMode === 'agent' || knowledgeSourceIds.length > 0) && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">
                Extra Guidance <span className="text-[#3a4055] lowercase tracking-normal font-normal">(optional — passed to the deep agent)</span>
              </label>
              <textarea
                value={focusHint}
                onChange={(e) => setFocusHint(e.target.value.slice(0, 400))}
                rows={2}
                placeholder="e.g. focus on diagnosis dilemmas, include an ECG image with every question, avoid drug trade names…"
                className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all resize-none"
              />
              <p className="text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5">
                <Bot className="w-3 h-3 text-[#00e5a0]/70" />
                Steers the agent's authoring choices: emphasis, media requirements, style constraints. {400 - focusHint.length} characters left.
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block">
                Model <span className="text-[#3a4055] lowercase tracking-normal font-normal">(optional override)</span>
              </label>
              <input
                value={modelOverride}
                onChange={(e) => setModelOverride(e.target.value)}
                placeholder={accountModel ? `Account default: ${accountModel}` : 'Account default (set one in settings)'}
                className="w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all"
              />
              <p className="text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5">
                <Bot className="w-3 h-3 text-[#00e5a0]/70" />
                Format “provider:model”, e.g. zai:glm-4.5. Leave empty to use your account default model.
              </p>
            </div>
          </div>
        )}

        {/* Generate Button — pinned to the rail bottom on desktop (lg+) so the
            CTA is always reachable without scrolling the config form. The
            negative margins stretch the sticky wrapper to the panel edges and
            the solid background hides form content passing underneath. */}
        <div className="lg:sticky lg:bottom-0 lg:z-10 lg:-mx-6 lg:-mb-6 lg:px-6 lg:pt-3 lg:pb-5 lg:bg-[#151821] lg:border-t lg:border-white/[0.07] lg:rounded-b-2xl">
        <button type="button" onClick={handleGenerate}
          disabled={generating || (genMode === 'online' && !isOnline) || (isFileMode && !extractedFile)}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 ${
            (genMode === 'online' && !isOnline) || (isFileMode && !extractedFile)
              ? 'bg-[#3a4055]/50 cursor-not-allowed text-[#5a6478]'
              : generating
                ? isFileMode
                  ? 'bg-gradient-to-r from-[#4fc3f7]/70 to-[#039be5]/70 cursor-not-allowed text-[#0c0e14]/70 shadow-lg shadow-[#4fc3f7]/15'
                  : genMode === 'offline'
                    ? 'bg-gradient-to-r from-[#8b5cf6]/70 to-[#7c3aed]/70 cursor-not-allowed text-white/70 shadow-lg shadow-[#8b5cf6]/15'
                    : 'bg-gradient-to-r from-[#00e5a0]/70 to-[#00c48c]/70 cursor-not-allowed text-[#0c0e14]/70 shadow-lg shadow-[#00e5a0]/15'
                : isFileMode
                  ? 'bg-gradient-to-r from-[#4fc3f7] to-[#039be5] text-[#0c0e14] shadow-lg shadow-[#4fc3f7]/25 hover:-translate-y-0.5 hover:shadow-[#4fc3f7]/35'
                  : genMode === 'offline'
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-[#8b5cf6]/25 hover:-translate-y-0.5 hover:shadow-[#8b5cf6]/35'
                    : 'bg-gradient-to-r from-[#00e5a0] to-[#00c48c] text-[#0c0e14] shadow-lg shadow-[#00e5a0]/25 hover:-translate-y-0.5 hover:shadow-[#00e5a0]/35'
          }`}>
          {(genMode === 'online' && !isOnline) ? (
            <><WifiOff className="w-4 h-4" /> Offline — Switch to Offline Mode</>
          ) : (isFileMode && !extractedFile) ? (
            <><FileUp className="w-4 h-4" /> Upload a file first</>
          ) : generating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
          ) : isFileMode ? (
            <><FileUp className="w-4 h-4" /> Generate from File (AI)</>
          ) : genMode === 'offline' ? (
            <>{aiModelStatus.loaded ? <Brain className="w-4 h-4" /> : <Cpu className="w-4 h-4" />} {aiModelStatus.loaded ? 'Generate Questions (Browser AI)' : 'Generate Questions (Offline)'}</>
          ) : (
            <>{engineMode === 'agent' ? <Bot className="w-4 h-4" /> : <Zap className="w-4 h-4" />} Generate {count} Question{count > 1 ? 's' : ''} ({engineMode === 'agent' ? 'Agent' : 'AI'})</>
          )}
        </button>
        </div>
      </div>
        </div>

        {/* ── Right: output workspace — progress, streaming results, placeholder ── */}
        <div ref={workspaceRef} className="min-w-0 scroll-mt-4">

      {/* ── Generation Progress Banner ── */}
      {generating && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-[#00e5a0]/20 bg-[#151821]">
          <div className="px-6 py-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-[#00e5a0] animate-spin" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#e8ecf4]">
                  {progressMsg || 'Preparing generation...'}
                </p>
                <p className="text-[11px] text-[#5a6478] mt-0.5">
                  {questions.length > 0
                    ? `${questions.length} of ${count} question${count > 1 ? 's' : ''} ready`
                    : `Generating ${count} question${count > 1 ? 's' : ''} about ${topic || 'your topic'}`
                  }
                  {socketConnected && <span className="text-[#00e5a0] ml-2">⚡ Real-time</span>}
                  {!socketConnected && genMode === 'online' && <span className="text-[#ffb347] ml-2">📡 Polling...</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setGenerating(false);
                  setProgressMsg('');
                  stopListening();
                  if (genTimeoutRef.current) { clearTimeout(genTimeoutRef.current); genTimeoutRef.current = null; }
                  toast('Generation cancelled', { description: `${questions.length} question${questions.length !== 1 ? 's' : ''} were already saved.` });
                }}
                className="p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all cursor-pointer"
                title="Cancel generation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Animated progress bar — real progress based on questions received */}
            <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#00e5a0] to-[#4fc3f7] transition-all duration-700 ease-out"
                style={{
                  width: questions.length > 0
                    ? `${Math.round((questions.length / count) * 100)}%`
                    : progressMsg.includes('Connecting') ? '10%' : '20%',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Results (visible even while generating for streaming) ── */}
      {questions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-lg font-bold text-[#e8ecf4] truncate">{topic}</h2>
              <span className="text-xs text-[#5a6478] font-medium flex-shrink-0">
                {questions.length} question{questions.length > 1 ? 's' : ''}{generating && ` · ${count - questions.length} more coming...`}{!generating && ` · ${system || 'General'}`}
              </span>
              {isFileMode && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/25">
                  From File
                </span>
              )}
              {questions[0]?.isAIGenerated === false && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/25">
                  Offline Generated
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button type="button" onClick={async () => { setDownloading('json'); try { await downloadAsJSON(questions); toast.success('Downloaded JSON'); } catch { toast.error('Failed'); } finally { setDownloading(null); } }}
                disabled={downloading !== null}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <FileJson className="w-3.5 h-3.5" /> {downloading === 'json' ? 'Saving…' : 'JSON'}
              </button>
              <button type="button" onClick={async () => { setDownloading('pdf'); try { await downloadAsPDF(questions); toast.success('Downloaded PDF'); } catch { toast.error('Failed'); } finally { setDownloading(null); } }}
                disabled={downloading !== null}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <FileText className="w-3.5 h-3.5" /> {downloading === 'pdf' ? 'Generating…' : 'PDF'}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {questions.map((q, idx) => (
              <QuestionCard key={q.id || idx} question={q} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* ── Workspace placeholder (no questions yet) — fills the right column
          so the layout reads as an intentional canvas, not empty space ── */}
      {questions.length === 0 && !generating && (
        <div className="rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] lg:min-h-[540px] flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5a0]/15 to-[#4fc3f7]/10 border border-white/[0.06] flex items-center justify-center mb-5">
            <Sparkles className="w-8 h-8 text-[#00e5a0]/80" />
          </div>
          <h2 className="text-lg font-bold text-[#c8d0e0]">Generated questions will appear here</h2>
          <p className="text-sm text-[#5a6478] mt-2 max-w-md leading-relaxed">
            Configure the generator and press Generate — questions stream in live, one by one, and are auto-saved to your Bank.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#00e5a0]/[0.07] border border-[#00e5a0]/15 text-[#00e5a0]/90"><Bolt className="w-3 h-3" /> By topic</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#4fc3f7]/[0.07] border border-[#4fc3f7]/15 text-[#4fc3f7]/90"><FileUp className="w-3 h-3" /> From files</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#8b5cf6]/[0.07] border border-[#8b5cf6]/15 text-[#8b5cf6]/90"><Library className="w-3 h-3" /> Knowledge library</span>
          </div>
          <p className="text-[11px] text-[#3a4055] mt-5">
            Works online (AI) and offline (built-in engine + browser AI)
          </p>
          {isWebGpuSupported && !aiModelStatus.loaded && (
            <button type="button" onClick={() => setShowAiPanel(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 transition-all cursor-pointer">
              <Brain className="w-3.5 h-3.5" /> Download Browser AI for True Offline AI
            </button>
          )}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
