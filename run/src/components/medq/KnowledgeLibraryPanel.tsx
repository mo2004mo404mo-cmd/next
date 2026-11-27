'use client';

/**
 * Knowledge Library panel — the RAG management UI on the Generate page.
 *
 * Capabilities:
 *   - Upload ANY supported file (PDF, DOCX, TXT/MD, audio, video, images)
 *     to /api/knowledge/upload → server-side parsing (ASR / VLM OCR / text
 *     extraction) → chunk → contextual enrichment → embedding → indexed.
 *   - Paste a URL (YouTube video, Google Drive / Docs / Sheets share link,
 *     Dropbox, or any direct file URL) → background download + ingestion.
 *   - CONNECTED Google Drive (OAuth): browse + import private files via the
 *     DrivePickerModal (setup guide shown when the server has no OAuth
 *     client configured yet).
 *   - Live status polling while sources are pending/processing.
 *   - OPEN any file (click its name or the eye icon) to view the extracted
 *     content / transcript and the indexed passages (SourceViewerModal).
 *   - Select sources to ground agent question generation (RAG citations).
 *   - Delete sources.
 *   - "Test retrieval" box hitting /api/knowledge/search with full hybrid
 *     diagnostics (dense / BM25 / rerank scores) — visible quality feedback.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Library,
  Upload,
  Loader2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileAudio,
  FileVideo,
  FileImage,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
  Eye,
  Link2,
  HardDrive,
  RotateCcw,
  X,
  FileSearch,
  CloudUpload,
  Cpu,
  Wand2,
  Pause,
  Play,
} from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import SourceViewerModal from './SourceViewerModal';
import TranscriptStudioModal from './TranscriptStudioModal';
import DrivePickerModal from './DrivePickerModal';
import {
  uploadFileResumable,
  recallResumableUpload,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
  formatSpeed,
  formatEta,
  type ResumableUploadHandle,
} from '@/lib/uploads/chunked-upload-client';

export interface KnowledgeSourceItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  error?: string | null;
  fileKind: string;
  meta?: {
    title?: string;
    chunks?: number;
    mimeType?: string;
    fileKind?: string;
    durationSec?: number;
    transcription?: string;
    pages?: number;
    ocr?: string;
    slides?: number;
    slideImages?: number;
    embeddedImages?: number;
    sheets?: number;
    chapters?: number;
    visual?: string;
    /** Retained-original metadata (file-store / audio-store). */
    originalMime?: string;
    originalBytes?: number;
    audioMime?: string;
    /** LIVE ingestion progress, published by the server pipeline while the
     *  source is pending/processing ({stage, percent, note, at}). */
    progress?: { stage: string; percent: number; note?: string; at: string };
  } | null;
  createdAt: string;
  documents?: Array<{ id: string; title: string; chunkCount: number }>;
}

interface SearchHit {
  chunkId: string;
  documentTitle: string;
  contextSummary: string;
  content: string;
  score: number;
  denseScore?: number;
  rerankScore?: number;
  reranked: boolean;
}

interface SearchResponse {
  chunks: SearchHit[];
  diagnostics: {
    expandedQueries: string[];
    candidateCount: number;
    denseCandidates: number;
    lexicalCandidates: number;
    rerankUsed: boolean;
    latencyMs: number;
  };
}

const KIND_ICON: Record<string, React.ReactNode> = {
  audio: <FileAudio className="w-3.5 h-3.5" />,
  video: <FileVideo className="w-3.5 h-3.5" />,
  image: <FileImage className="w-3.5 h-3.5" />,
  document: <FileText className="w-3.5 h-3.5" />,
  url: <FileText className="w-3.5 h-3.5" />,
  text: <FileText className="w-3.5 h-3.5" />,
};

const KIND_COLOR: Record<string, string> = {
  audio: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  video: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  image: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  document: 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30',
};

function kindBadge(kind: string) {
  const icon = KIND_ICON[kind] ?? <FileText className="w-3.5 h-3.5" />;
  const color = KIND_COLOR[kind] ?? 'text-[#8b95a8] bg-white/[0.05] border-white/10';
  return <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${color}`}>{icon}{kind}</span>;
}

// Exported so the viewer modal reuses the exact same badge renderer.
export { kindBadge };

function formatDuration(sec?: number) {
  if (!sec) return '';
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatBytes2(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatElapsed(startedAtMs: number): string {
  const sec = Math.max(0, Math.round((Date.now() - startedAtMs) / 1000));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}

/** Friendly labels for the server-side ingestion stages. */
const STAGE_LABELS: Record<string, string> = {
  preparing: 'Reading the file',
  extracting: 'Extracting text',
  transcribing: 'Transcribing / analyzing media',
  storing: 'Storing the original for preview',
  chunking: 'Splitting into passages',
  enriching: 'Summarizing passages',
  embedding: 'Generating embeddings',
  saving: 'Writing to your index',
  downloading: 'Downloading',
  reading: 'Reading the page',
};

function stageLabel(progress?: { stage: string; note?: string }): string {
  if (!progress) return 'Processing on the server…';
  if (progress.note) return progress.note;
  return STAGE_LABELS[progress.stage] ?? progress.stage;
}

/** One in-flight upload / ingestion, rendered as a live progress card. */
interface Transfer {
  key: string;
  name: string;
  size: number;
  /** Bytes sent so far (HTTP upload phase). */
  sent: number;
  phase: 'uploading' | 'server';
  sourceId?: string;
  startedAt: number;
  error?: string;
  /** True while the upload runs through the resumable chunked path —
   *  pause / resume is available for these (Stage 13). */
  chunked?: boolean;
  /** Upload paused by the user — confirmed chunks stay on the server. */
  paused?: boolean;
  /** Live transfer speed in bytes/second (chunked path). */
  speed?: number;
  /** Estimated seconds remaining (chunked path). */
  etaSec?: number | null;
  /** Bytes already on the server when this transfer resumed a previous one. */
  resumedFrom?: number;
}

/** XHR upload with real byte-level progress (fetch cannot report upload
 *  progress) — resolves with the parsed JSON response. The running request
 *  is registered in `registry` so the UI can cancel it mid-flight. */
function xhrUpload(
  file: File,
  registry: Map<string, XMLHttpRequest>,
  key: string,
  onProgress: (sent: number, total: number) => void,
): Promise<{ ok: boolean; status: number; json: { sourceId?: string; error?: string } | null }> {
  return new Promise((resolve) => {
    const form = new FormData();
    form.append('file', file, file.name);
    const xhr = new XMLHttpRequest();
    registry.set(key, xhr);
    xhr.open('POST', '/api/knowledge/upload');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded, e.total);
    };
    xhr.onload = () => {
      registry.delete(key);
      let json: { sourceId?: string; error?: string } | null = null;
      try { json = JSON.parse(xhr.responseText); } catch { /* non-JSON error body */ }
      resolve({ ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, json });
    };
    xhr.onerror = () => {
      registry.delete(key);
      resolve({ ok: false, status: 0, json: null });
    };
    xhr.onabort = () => {
      registry.delete(key);
      resolve({ ok: false, status: -1, json: null });
    };
    xhr.send(form);
  });
}

/**
 * Stage 13 — resumable transfers. Files above RESUMABLE_THRESHOLD_BYTES are
 * uploaded as idempotent 8MB chunks (PUT /api/uploads/:id/chunks/:n):
 *   • a stall, timeout, or page refresh costs ONE chunk, not the whole upload
 *   • pause / resume / cancel mid-flight — confirmed chunks stay on the server
 *   • re-picking the same file resumes where it left off (localStorage keeps
 *     the session id; the server reports which chunks it already has)
 * Once complete, the file is ingested BY REFERENCE (uploadId) — the bytes
 * are never sent twice.
 */
type TransferResult = { ok: boolean; status: number; json: { sourceId?: string; error?: string } | null };

async function startResumableTransfer(
  file: File,
  key: string,
  registry: Map<string, ResumableUploadHandle>,
  onUpdate: (patch: Partial<Transfer>) => void,
): Promise<TransferResult> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  const handle = uploadFileResumable(file, {
    resumeUploadId,
    onResumed: (bytes) => {
      onUpdate({ resumedFrom: bytes });
      toast.info(`Resuming "${file.name}" — ${formatBytes2(bytes)} already uploaded`);
    },
    onProgress: (p) =>
      onUpdate({ sent: p.uploadedBytes, speed: p.bytesPerSecond, etaSec: p.etaSeconds, error: undefined }),
    onRetrying: ({ attempt }) =>
      onUpdate({ error: `Retry ${attempt + 1}: connection hiccup — continuing from the last confirmed chunk…` }),
  });
  registry.set(key, handle);
  try {
    const { uploadId } = await handle.promise;
    onUpdate({ speed: 0, etaSec: null, error: undefined });
    // Ingest the ALREADY-UPLOADED bytes by reference — no second transfer.
    const form = new FormData();
    form.append('uploadId', uploadId);
    form.append('origin', 'library');
    const res = await fetch('/api/knowledge/upload', { method: 'POST', body: form });
    const json = (await res.json().catch(() => null)) as { sourceId?: string; error?: string } | null;
    return { ok: res.ok && !!json?.sourceId, status: res.status, json };
  } catch (error) {
    if (error instanceof UploadCancelledError) return { ok: false, status: -1, json: null };
    return { ok: false, status: 0, json: { error: error instanceof Error ? error.message : 'Upload failed' } };
  } finally {
    registry.delete(key);
  }
}

/** Upload one file: small files take the single-request XHR fast path; large
 *  files take the resumable chunked path. Same TransferResult contract. */
async function startTransfer(
  file: File,
  key: string,
  xhrRegistry: Map<string, XMLHttpRequest>,
  controllerRegistry: Map<string, ResumableUploadHandle>,
  onUpdate: (patch: Partial<Transfer>) => void,
): Promise<TransferResult> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return startResumableTransfer(file, key, controllerRegistry, onUpdate);
  }
  return xhrUpload(file, xhrRegistry, key, (sent) => onUpdate({ sent }));
}

export default function KnowledgeLibraryPanel({
  selectedIds,
  onToggle,
  onSourcesReady,
  autoSelectNew,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
  /** Fired when a newly uploaded source becomes ready (parent can toast/scroll). */
  onSourcesReady?: (ready: KnowledgeSourceItem[]) => void;
  /** When true, newly uploaded sources are auto-selected for grounding. */
  autoSelectNew?: boolean;
}) {
  const [sources, setSources] = useState<KnowledgeSourceItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  /** Live upload/ingestion cards — THE progress UI (replaces the old invisible
   *  `uploading` string array that was tracked but never rendered). */
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  /** Running upload XHRs, so the ✕ button can cancel mid-flight. */
  const xhrRegistry = useRef<Map<string, XMLHttpRequest>>(new Map());
  /** Running resumable-upload controllers — pause / resume / cancel (Stage 13). */
  const uploadControllers = useRef<Map<string, ResumableUploadHandle>>(new Map());
  const [collapsed, setCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [openSource, setOpenSource] = useState<{ id: string; kind: string; tab?: 'original' | 'content' | 'passages' } | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [addingUrl, setAddingUrl] = useState(false);
  const [driveOpen, setDriveOpen] = useState(false);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [retryingIds, setRetryingIds] = useState<Set<string>>(new Set());
  /** Sources currently being re-indexed (sentence-aware chunk upgrade). */
  const [reindexingIds, setReindexingIds] = useState<Set<string>>(new Set());

  const refresh = useCallback(async (): Promise<KnowledgeSourceItem[]> => {
    try {
      const res = await fetch('/api/knowledge/sources');
      if (!res.ok) return [];
      const json = (await res.json()) as { sources?: KnowledgeSourceItem[] };
      const list = json.sources ?? [];
      setSources(list);
      setLoaded(true);
      return list;
    } catch {
      return [];
    }
  }, []);

  const readyNewRef = useRef<Set<string>>(new Set());

  // OAuth-callback toast (?drive=connected|denied|… set by the Drive callback
  // redirect) — cleans the URL and opens the picker after a fresh connect.
  // Deferred one tick so the effect only reads the external system (the URL);
  // the state update happens in a callback, not synchronously in the effect.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const flag = new URLSearchParams(window.location.search).get('drive');
    if (!flag) return;
    const t = setTimeout(() => {
      if (flag === 'connected') {
        toast.success('Google Drive connected — browse and import your files');
        setDriveOpen(true);
      } else if (flag === 'denied') toast.info('Google Drive connection was cancelled');
      else if (flag === 'state-mismatch') toast.error('Drive connection could not be verified — try connecting again');
      else if (flag === 'unconfigured') toast.error('Google Drive is not configured on this server yet — see the setup guide');
      else if (flag) toast.error('Google Drive connection failed — try again');
      window.history.replaceState({}, '', window.location.pathname);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // ── Polling loop, DERIVED FROM STATE (self-healing by construction) ──
  // The interval exists exactly while there is pending work — any source
  // pending/processing OR any live transfer card. No imperative
  // arm/disarm bookkeeping (the previous version could end up with a dead
  // interval after rapid effect re-runs, leaving the progress UI frozen).
  const tick = useCallback(async () => {
    const list = await refresh();
    // Notify the parent about sources that became ready — checked EVERY tick
    // (previously only fired when polling stopped, so multi-file uploads
    // waited for the slowest file before any toast).
    const newly = list.filter((s) => s.status === 'ready' && !readyNewRef.current.has(s.id));
    if (newly.length) {
      newly.forEach((s) => readyNewRef.current.add(s.id));
      onSourcesReady?.(newly);
    }
    // Retire transfer cards whose source finished (ready or failed).
    const activeIds = new Set(
      list.filter((s) => s.status === 'pending' || s.status === 'processing').map((s) => s.id),
    );
    setTransfers((ts) => ts.filter((t) => {
      if (t.phase !== 'server' || !t.sourceId) return true; // still uploading → keep
      return activeIds.has(t.sourceId);
    }));
  }, [refresh, onSourcesReady]);

  // Keep the freshest tick in a ref so effects can always call the latest
  // closure without depending on its identity (no effect churn).
  const tickRef = useRef(tick);
  useEffect(() => { tickRef.current = tick; }, [tick]);

  const pendingWork =
    sources.some((s) => s.status === 'pending' || s.status === 'processing') ||
    transfers.length > 0;

  // Initial list load (mount) — also covers reloads mid-processing.
  useEffect(() => {
    void tickRef.current();
  }, []);

  // The ONE interval owner: armed while work is pending, cleared by React
  // when it drains. Re-arms automatically whenever new work appears.
  useEffect(() => {
    if (!pendingWork) return;
    void tickRef.current(); // instant feedback the moment work appears
    const id = setInterval(() => void tickRef.current(), 1500);
    return () => clearInterval(id);
  }, [pendingWork]);

  const uploadFiles = useCallback(async (files: File[], opts?: { autoSelect?: boolean }) => {
    if (!files.length) return;
    const forceAutoSelect = opts?.autoSelect === true;
    for (const file of files.slice(0, 8)) {
      const key = `${file.name}:${file.size}`;
      const startedAt = Date.now();
      setTransfers((ts) => [...ts.filter((t) => t.key !== key), {
        key, name: file.name, size: file.size, sent: 0, phase: 'uploading', startedAt,
        chunked: file.size > RESUMABLE_THRESHOLD_BYTES,
      }]);
      // pendingWork flips true on the next render → the derived polling
      // effect arms itself. No manual re-arm needed.
      const { ok, status, json } = await startTransfer(
        file,
        key,
        xhrRegistry.current,
        uploadControllers.current,
        (patch) => {
          setTransfers((ts) => ts.map((t) => (t.key === key ? { ...t, ...patch } : t)));
        },
      );
      if (ok && json?.sourceId) {
        const sourceId = json.sourceId;
        setTransfers((ts) => ts.map((t) => (t.key === key ? { ...t, phase: 'server', sourceId } : t)));
        readyNewRef.current.delete(sourceId);
        if (forceAutoSelect || autoSelectNew) onToggle(sourceId);
        const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/');
        toast.info(
          `Uploaded "${file.name}" — ${
            isMedia || file.size > 1024 * 1024
              ? 'transcription takes 1-3 min, watch the progress below'
              : 'indexing usually takes <15s'
          }`,
        );
      } else {
        setTransfers((ts) => ts.filter((t) => t.key !== key));
        if (status === -1) {
          toast.info(
            `Cancelled "${file.name}"${file.size > RESUMABLE_THRESHOLD_BYTES ? ' — pick the file again to resume where it left off' : ''}`,
          );
        }
        else toast.error(`Upload failed: ${json?.error || (status ? `HTTP ${status}` : 'network error')}`);
      }
    }
    void refresh();
  }, [autoSelectNew, onToggle, refresh]);

  /** Cancel an in-flight upload / dismiss a finished card. */
  const dismissTransfer = useCallback((key: string) => {
    const controller = uploadControllers.current.get(key);
    if (controller) controller.cancel(); // rejects the promise → card removed in uploadFiles
    else {
      const xhr = xhrRegistry.current.get(key);
      if (xhr) xhr.abort(); // resolves the promise → card removed in uploadFiles
      else setTransfers((ts) => ts.filter((t) => t.key !== key));
    }
  }, []);

  /** Pause / resume a chunked upload — confirmed chunks stay on the server,
   *  so resuming continues from the last one that landed (Stage 13). */
  const togglePauseTransfer = useCallback((key: string) => {
    const controller = uploadControllers.current.get(key);
    if (!controller) return;
    setTransfers((ts) =>
      ts.map((t) => {
        if (t.key !== key || !t.chunked) return t;
        if (t.paused) controller.resume();
        else controller.pause();
        return { ...t, paused: !t.paused, speed: t.paused ? t.speed : 0 };
      }),
    );
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) void uploadFiles(files);
  }, [uploadFiles]);

  const addUrl = useCallback(async () => {
    const url = urlInput.trim();
    if (!url || addingUrl) return;
    setAddingUrl(true);
    try {
      const res = await fetch('/api/knowledge/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'url', url }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(`Could not add link: ${json.error || res.status}`);
        return;
      }
      setUrlInput('');
      if (autoSelectNew) onToggle(json.sourceId);
      const isYouTube = /\byoutu\.?be\b|youtube\.com/i.test(url);
      const isDrive = /drive\.google|docs\.google/i.test(url);
      toast.info(
        isYouTube
          ? 'Downloading video & extracting audio + on-screen text — takes 1-3 min, watch the status below'
          : isDrive
            ? 'Fetching from Google Drive — large files take a minute'
            : 'Reading the link — usually under 30s',
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not add link');
    } finally {
      setAddingUrl(false);
      void refresh();
    }
  }, [urlInput, addingUrl, autoSelectNew, onToggle, refresh]);

  const retrySource = useCallback(async (id: string) => {
    if (retryingIds.has(id)) return;
    setRetryingIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/knowledge/sources/${id}/retry`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) {
        toast.error(`Could not retry: ${json.error || res.status}`);
        return;
      }
      toast.info('Retrying — downloading and indexing the link again');
      void tick(); // immediate refresh; the source flips to pending → the derived polling effect arms itself
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not retry');
    } finally {
      setRetryingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      void refresh();
    }
  }, [retryingIds, refresh, tick]);

  /** Re-chunk an already-indexed source with the sentence-aware chunker +
   *  extraction normalization — upgrades sources whose passages were cut
   *  mid-word / mid-sentence by the old character-stride splitter. */
  const reindexSource = useCallback(async (id: string) => {
    if (reindexingIds.has(id)) return;
    setReindexingIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/knowledge/sources/${id}/reindex`, { method: 'POST' });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(`Could not re-index: ${(json as { error?: string }).error || res.status}`);
        return;
      }
      toast.info('Re-indexing — rebuilding passages on clean sentence boundaries');
      void tick(); // immediate refresh; the source flips to processing → the derived polling effect arms itself
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not re-index');
    } finally {
      setReindexingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      void refresh();
    }
  }, [reindexingIds, refresh, tick]);

  const deleteSource = useCallback(async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/knowledge/sources/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(`Removed "${name}" from the library`);
      void refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    }
  }, [refresh]);

  const runSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    setSearchResult(null);
    try {
      const res = await fetch('/api/knowledge/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, topK: 5 }),
      });
      const json = (await res.json()) as SearchResponse & { error?: string };
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setSearchResult(json);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  const busyCount = sources.filter((s) => s.status === 'pending' || s.status === 'processing').length;
  const readyCount = sources.filter((s) => s.status === 'ready').length;
  const totalChunks = sources.reduce((sum, s) => sum + (s.meta?.chunks ?? 0), 0);
  const uploadingCount = transfers.filter((t) => t.phase === 'uploading').length;

  return (
    <div
      className="rounded-2xl border border-white/[0.08] bg-[#141926] overflow-hidden"
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Library className="w-4 h-4 text-[#4fc3f7]" />
          <span className="text-xs font-semibold tracking-wide text-[#c8d0e0]">Knowledge Library (RAG)</span>
          {(busyCount > 0 || uploadingCount > 0) && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-[10px] font-semibold">
              <Loader2 className="w-3 h-3 animate-spin" />
              {uploadingCount > 0 ? `${uploadingCount} uploading` : `${busyCount} processing`}
            </span>
          )}
          {selectedIds.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0] text-[10px] font-semibold">
              {selectedIds.length} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#5a6478]">
          {loaded && <span>{readyCount} sources · {totalChunks} passages</span>}
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-3">
          <p className="text-[10px] text-[#5a6478] flex items-start gap-1.5 leading-relaxed">
            <Info className="w-3 h-3 mt-0.5 shrink-0" />
            Upload lectures, notes, PDFs, audio or video recordings. Files are transcribed/extracted,
            chunked and embedded into your personal retrieval index. Select sources to ground agent
            generation — questions will cite the exact passages they were built from.
          </p>

          {/* Upload zone */}
          <div
            onClick={() => uploadRef.current?.click()}
            className="border-2 border-dashed border-white/[0.12] rounded-xl p-4 text-center cursor-pointer hover:border-[#4fc3f7]/40 hover:bg-[#4fc3f7]/[0.03] transition-all"
          >
            <input
              ref={uploadRef}
              type="file"
              multiple
              accept=".pdf,.docx,.pptx,.xlsx,.epub,.txt,.md,.csv,.tsv,.json,.html,.xml,audio/*,video/*,image/*,.mp3,.wav,.m4a,.ogg,.flac,.mp4,.mov,.mkv,.webm,.png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => {
                uploadFiles(Array.from(e.target.files || []));
                e.target.value = '';
              }}
            />
            <Upload className="w-5 h-5 mx-auto text-[#4fc3f7]/70 mb-1" />
            <p className="text-xs text-[#8b95a8]">Drop files here or click to upload</p>
            <p className="text-[10px] text-[#5a6478] mt-1">
              PDF · DOCX · PPTX (slides + slide images) · XLSX · EPUB · TXT/MD · audio · video (audio + frames) · images — up to 8 at once · large files upload in resumable chunks (pause / resume, auto-retry, resume-after-refresh)
            </p>
          </div>

          {/* ── ACTIVE TRANSFERS — real upload + processing progress ──
              Each card: byte-accurate bar while uploading (XHR onprogress),
              then a server-stage bar fed by meta.progress polling. Replaces
              the old "blind spinner" (the uploading state was tracked but
              never rendered at all). */}
          {transfers.length > 0 && (
            <div className="space-y-2">
              {transfers.map((t) => {
                // Server-side progress for this transfer's source (if any).
                const src = t.sourceId ? sources.find((s) => s.id === t.sourceId) : undefined;
                const progress = src?.meta?.progress;
                const uploadPct = t.size > 0 ? Math.min(100, Math.round((t.sent / t.size) * 100)) : 0;
                const serverPct = progress?.percent ?? null;
                const uploading = t.phase === 'uploading';
                return (
                  <div
                    key={t.key}
                    className="px-3 py-2.5 rounded-xl border border-[#4fc3f7]/20 bg-[#4fc3f7]/[0.04]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {uploading ? (
                        <CloudUpload className="w-3.5 h-3.5 text-[#4fc3f7] shrink-0" />
                      ) : (
                        <Cpu className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 animate-[server-work-pulse_1.8s_ease-in-out_infinite]" />
                      )}
                      <p className="text-[11px] text-[#c8d0e0] truncate flex-1 min-w-0 font-medium">{t.name}</p>
                      <span className="text-[9px] text-[#5a6478] shrink-0 tabular-nums">
                        {formatElapsed(t.startedAt)}
                      </span>
                      {uploading && t.chunked && (
                        <button
                          type="button"
                          onClick={() => togglePauseTransfer(t.key)}
                          className="text-[#5a6478] hover:text-[#4fc3f7] transition-colors shrink-0 p-0.5"
                          title={t.paused ? 'Resume upload' : 'Pause upload — confirmed chunks are kept on the server'}
                          aria-label={t.paused ? 'Resume upload' : 'Pause upload'}
                        >
                          {t.paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => dismissTransfer(t.key)}
                        className="text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-0.5"
                        title={uploading ? 'Cancel this upload' : 'Hide this card'}
                        aria-label={uploading ? 'Cancel this upload' : 'Hide this card'}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    {/* Progress track */}
                    <div className="h-1.5 rounded-full bg-[#0f1320] overflow-hidden">
                      {uploading ? (
                        <div
                          className={`h-full rounded-full transition-[width] duration-150 ${
                            t.paused ? 'bg-[#f59e0b]' : 'bg-gradient-to-r from-[#4fc3f7] to-[#00e5a0]'
                          }`}
                          style={{ width: `${uploadPct}%` }}
                        />
                      ) : serverPct !== null ? (
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#4fc3f7] transition-[width] duration-300"
                          style={{ width: `${serverPct}%` }}
                        />
                      ) : (
                        // Indeterminate shimmer — server is working, no % yet
                        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#f59e0b]/70 to-transparent animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%]" />
                      )}
                    </div>
                    {/* Status line */}
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[9.5px] text-[#8b95a8] truncate">
                        {uploading
                          ? t.paused
                            ? `Paused at ${formatBytes2(t.sent)} / ${formatBytes2(t.size)} — resume anytime`
                            : `${t.resumedFrom ? 'Resuming — ' : 'Uploading — '}${formatBytes2(t.sent)} / ${formatBytes2(t.size)}${t.speed ? ` · ${formatSpeed(t.speed)}` : ''}${t.etaSec != null ? ` · ${formatEta(t.etaSec)} left` : ''}`
                          : stageLabel(progress)}
                      </p>
                      <p className="text-[9.5px] text-[#5a6478] shrink-0 tabular-nums font-semibold">
                        {uploading ? `${uploadPct}%` : serverPct !== null ? `${serverPct}%` : ''}
                      </p>
                    </div>
                    {uploading && t.error && (
                      <p className="text-[9px] text-[#f59e0b]/90 truncate mt-0.5">{t.error}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* URL ingestion — YouTube / Google Drive / Dropbox / direct file URLs */}
          <div className="flex gap-2">
            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addUrl(); }}
              placeholder="Paste a YouTube video, Google Drive or Dropbox link, or any file URL"
              className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={addUrl}
              disabled={addingUrl || !urlInput.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 shrink-0"
              title="Download & index — YouTube videos are transcribed automatically"
            >
              {addingUrl ? <Loader2 className="w-3 h-3 animate-spin" /> : <Link2 className="w-3 h-3" />}
              Add
            </button>
          </div>
          <p className="text-[10px] text-[#5a6478] -mt-2">
            YouTube → audio + on-screen text · Drive/Dropbox links → share “anyone with the link”, or connect your own Drive below · up to 60 min per video
          </p>

          {/* Google Drive (OAuth) — browse + import the user's OWN Drive */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDriveOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#8b95a8] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              title="Import files from your own Google Drive (private files, OAuth)"
            >
              <HardDrive className="w-3 h-3" />
              Google Drive
            </button>
            <p className="text-[10px] text-[#5a6478] truncate">
              Import from your own Drive — private files, no link-sharing needed (connect once)
            </p>
          </div>

          {/* Microphone recorder — recordings follow the same ASR pipeline as uploads */}
          <AudioRecorder onRecorded={(file) => void uploadFiles([file], { autoSelect: true })} />

          {/* Source list */}
          {sources.length > 0 && (
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {sources.map((s) => {
                const selected = selectedIds.includes(s.id);
                const selectable = s.status === 'ready';
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all ${
                      selected
                        ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.06]'
                        : 'border-white/[0.07] bg-[#1a1e2b] hover:border-white/[0.14]'
                    } ${!selectable && s.status !== 'failed' ? 'opacity-80' : ''}`}
                  >
                    <button
                      type="button"
                      disabled={!selectable}
                      onClick={() => onToggle(s.id)}
                      className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center ${
                        selected
                          ? 'bg-[#00e5a0] border-[#00e5a0] text-[#0a0e17]'
                          : selectable
                            ? 'border-white/25 hover:border-[#00e5a0]/60'
                            : 'border-white/10 opacity-40'
                      }`}
                      title={selectable ? 'Ground generation on this source' : s.status === 'failed' ? 'Indexing failed — hover the row for the error' : 'Source still indexing'}
                    >
                      {selected && <CheckCircle2 className="w-3 h-3" />}
                    </button>

                    {kindBadge(s.meta?.fileKind || s.fileKind)}

                    <div className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => setOpenSource({ id: s.id, kind: s.meta?.fileKind || s.fileKind })}
                        className="text-xs text-[#c8d0e0] truncate font-medium max-w-full text-left hover:text-[#4fc3f7] hover:underline underline-offset-2 transition-colors"
                        title="Open file — view extracted content and indexed passages"
                      >
                        {s.name}
                      </button>
                      <p className="text-[10px] text-[#5a6478] truncate">
                        {s.status === 'ready' && (
                          <>
                            {s.meta?.chunks ?? '?'} passages
                            {s.meta?.durationSec ? ` · ${formatDuration(s.meta.durationSec)}` : ''}
                            {s.meta?.pages ? ` · ${s.meta.pages}p` : ''}
                            {s.meta?.slides ? ` · ${s.meta.slides} slides` : ''}
                            {s.meta?.sheets ? ` · ${s.meta.sheets} sheets` : ''}
                            {s.meta?.chapters ? ` · ${s.meta.chapters} ch` : ''}
                            {s.meta?.visual === 'audio+frames' ? ' · audio+visual' : ''}
                            {s.meta?.transcription ? ` · ${s.meta.transcription}` : ''}
                            {s.meta?.ocr ? ` · OCR` : ''}
                          </>
                        )}
                        {s.status === 'pending' && 'Queued…'}
                        {s.status === 'processing' && (
                          <>
                            {stageLabel(s.meta?.progress)}
                            {s.meta?.progress ? ` · ${s.meta.progress.percent}%` : ''}
                            {` · ${formatElapsed(new Date(s.createdAt).getTime())}`}
                          </>
                        )}
                        {s.status === 'failed' && <span className="text-red-400">{s.error || 'Failed'}</span>}
                      </p>
                      {/* Live indexing progress bar — fed by the server-side
                          stage tracker (meta.progress, polled every 1.5s). */}
                      {(s.status === 'pending' || s.status === 'processing') && (
                        <div className="mt-1 h-1 rounded-full bg-[#0f1320] overflow-hidden">
                          {s.status === 'processing' && s.meta?.progress ? (
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#4fc3f7] transition-[width] duration-300"
                              style={{ width: `${Math.max(4, s.meta.progress.percent)}%` }}
                            />
                          ) : (
                            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#f59e0b]/70 to-transparent animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%]" />
                          )}
                        </div>
                      )}
                    </div>

                    {(s.status === 'pending' || s.status === 'processing') && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#f59e0b] shrink-0" />
                    )}
                    {s.status === 'failed' && (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    )}
                    {s.status === 'failed' && s.type === 'url' && (
                      <button
                        type="button"
                        onClick={() => void retrySource(s.id)}
                        disabled={retryingIds.has(s.id)}
                        className="px-2 py-1 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-semibold hover:bg-[#4fc3f7]/20 disabled:opacity-40 flex items-center gap-1 shrink-0 transition-colors"
                        title="Try importing this link again — YouTube bot-checks are temporary"
                      >
                        {retryingIds.has(s.id)
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <RotateCcw className="w-3 h-3" />}
                        Retry
                      </button>
                    )}

                    {/* Preview the ORIGINAL file (PDF viewer / image /
                        audio / video) — only when the original is retained. */}
                    {(s.meta?.originalMime || s.meta?.audioMime) && (
                      <button
                        type="button"
                        onClick={() => setOpenSource({ id: s.id, kind: 'file', tab: 'original' })}
                        className="text-[#5a6478] hover:text-[#00e5a0] transition-colors shrink-0 p-1"
                        title="Preview the original file (PDF viewer / image / player)"
                        aria-label={`Preview original ${s.name}`}
                      >
                        <FileSearch className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Re-index for accuracy: rebuild the source's passages
                        with the sentence-aware chunker (fixes mid-word /
                        mid-sentence cuts from the old splitter). */}
                    {s.status === 'ready' && (
                      <button
                        type="button"
                        onClick={() => void reindexSource(s.id)}
                        disabled={reindexingIds.has(s.id)}
                        className="text-[#5a6478] hover:text-[#f59e0b] transition-colors shrink-0 p-1 disabled:opacity-40"
                        title="Re-index for accuracy — rebuild passages on clean sentence boundaries"
                        aria-label={`Re-index ${s.name}`}
                      >
                        {reindexingIds.has(s.id)
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : <Wand2 className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setOpenSource({ id: s.id, kind: s.meta?.fileKind || s.fileKind })}
                      className="text-[#5a6478] hover:text-[#4fc3f7] transition-colors shrink-0 p-1"
                      title="Open file — view extracted content and indexed passages"
                      aria-label={`Open ${s.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSource(s.id, s.name)}
                      className="text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-1"
                      title="Remove from library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Retrieval test */}
          {readyCount > 0 && (
            <div className="rounded-xl border border-white/[0.07] bg-[#1a1e2b] p-3">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-3.5 h-3.5 text-[#4fc3f7]/70" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5a6478]">Test retrieval</span>
              </div>
              <div className="flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
                  placeholder="e.g. what insulin rate does the DKA protocol use?"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40"
                />
                <button
                  type="button"
                  onClick={runSearch}
                  disabled={searching || !searchQuery.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5"
                >
                  {searching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                  Search
                </button>
              </div>
              {searchResult && (
                <div className="mt-2.5 space-y-2">
                  <p className="text-[10px] text-[#5a6478]">
                    {searchResult.diagnostics.rerankUsed ? 'hybrid: dense + BM25 + rerank' : 'hybrid: dense + BM25 (rerank skipped)'} ·{' '}
                    {searchResult.diagnostics.latencyMs}ms · {searchResult.diagnostics.expandedQueries.length} query variants
                  </p>
                  {(searchResult.chunks || []).slice(0, 3).map((c, i) => (
                    <div key={c.chunkId} className="px-2.5 py-2 rounded-lg bg-[#0f1320] border border-white/[0.06]">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-[#4fc3f7] truncate">
                          #{i + 1} {c.documentTitle}
                        </span>
                        <span className="text-[10px] text-[#5a6478] shrink-0">
                          rerank {c.rerankScore ?? '–'} · dense {c.denseScore?.toFixed(2) ?? '–'}
                        </span>
                      </div>
                      {c.contextSummary && (
                        <p className="text-[10px] text-[#8b95a8] italic mb-1 line-clamp-1">{c.contextSummary}</p>
                      )}
                      <p className="text-[10px] text-[#5a6478] line-clamp-3 leading-relaxed">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* File viewer — opened by clicking a source name / eye icon.
          AUDIO sources open the advanced Transcript Studio (waveform,
          synced playback, sentence search, exports); everything else opens
          the generic extracted-content viewer. */}
      {openSource && (
        openSource.kind === 'audio' && !openSource.tab ? (
          <TranscriptStudioModal
            sourceId={openSource.id}
            onClose={() => setOpenSource(null)}
            kindBadge={kindBadge}
          />
        ) : (
          <SourceViewerModal
            sourceId={openSource.id}
            onClose={() => setOpenSource(null)}
            kindBadge={kindBadge}
            initialTab={openSource.tab}
          />
        )
      )}

      {/* Google Drive browser — connected imports + one-time setup guide */}
      {driveOpen && (
        <DrivePickerModal
          onClose={() => setDriveOpen(false)}
          onImported={() => void refresh()}
        />
      )}
    </div>
  );
}
