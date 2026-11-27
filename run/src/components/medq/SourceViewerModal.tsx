'use client';

/**
 * SourceViewerModal — "open" a Knowledge Library file.
 *
 * Three views:
 *   1. ORIGINAL FILE — the retained original bytes, rendered in an app-styled
 *      native viewer: PDFs in the CUSTOM pdf.js reader (PdfCanvasViewer —
 *      dark toolbar, zoom / fit / page navigation, lazy pages), images with
 *      width-based zoom + true fit, audio / video in styled players. Any file
 *      can be downloaded. This is the "open my PDF like in Adobe" view —
 *      now matching the app's design language instead of the browser's
 *      light-gray fallback viewer.
 *      CITATIONS land here first: the PDF viewer scans its text layer, jumps
 *      to the page holding the quote and overlays highlight boxes; audio /
 *      video players seek to the cited [mm:ss] moment.
 *   2. EXTRACTED CONTENT — what the system actually extracted (document text,
 *      ASR transcript, OCR output). Supports HIGHLIGHT navigation: the quoted
 *      passage is <mark>-ed, scrolled into view and pulsed — one click away
 *      from the original (contextual banner links swap both ways).
 *   3. INDEXED PASSAGES — the chunks with their contextual summaries; the
 *      cited chunk is highlighted + scrolled to.
 *
 * Fetches GET /api/knowledge/sources/[id] in TWO stages so citations open
 * fast (no waiting on the full payload):
 *   Stage 1 (light — single row + 5 sample chunks): source meta, hasOriginal,
 *     originalMime → the ORIGINAL FILE viewer mounts immediately. The cited
 *     quote already ships in the citation object, so the PDF scan starts
 *     without any further fetching.
 *   Stage 2 (background — ?full=1&chunks=all): the complete stored content +
 *     every indexed passage → enables the Extracted content / Indexed
 *     passages tabs when it arrives.
 * The original file itself streams from GET /api/knowledge/sources/[id]/file
 * (owner-gated, Range-capable).
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  X,
  Loader2,
  Copy,
  Check,
  FileText,
  Layers,
  AlertTriangle,
  Calendar,
  Download,
  FileImage,
  FileAudio,
  Link2,
  FileVideo,
  File as FileIcon,
  ZoomIn,
  ZoomOut,
  StretchHorizontal,
  Frame,
  ExternalLink,
  Highlighter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import PdfCanvasViewer from './PdfCanvasViewer';

export interface SourceDetail {
  source: {
    id: string;
    name: string;
    type: string;
    fileKind: string;
    status: 'pending' | 'processing' | 'ready' | 'failed';
    error?: string | null;
    meta?: {
      title?: string;
      chunks?: number;
      mimeType?: string;
      fileKind?: string;
      durationSec?: number;
      transcription?: string;
      pages?: number;
      ocr?: string;
      originalMime?: string;
      originalBytes?: number;
      originalName?: string;
    } | null;
    createdAt: string;
    documents?: Array<{ id: string; title: string; mimeType: string; sizeBytes: number; chunkCount: number }>;
    /** True when the original bytes are retained (file-store / audio-store). */
    hasOriginal?: boolean;
    /** Resolved serve mime for the retained original. */
    originalMime?: string;
  };
  content?: string;
  contentTruncated?: boolean;
  chunkTotal?: number;
  preview: string;
  /** Stage-2 payload: every indexed passage (absent until the full fetch lands). */
  chunks?: Array<{ id?: string; idx: number; content: string; contextSummary: string; embeddingModel: string }>;
}

/** Citation navigation target — marks + scrolls to the exact passage. */
export interface SourceHighlight {
  /** Which source to open (the cited KnowledgeSource). */
  sourceId?: string;
  chunkId?: string;
  /** Answer-anchored quote — the narrow passage that grounds the answer
   *  (the default highlight scope). Empty for legacy quote-less citations,
   *  which fall back to the whole passage. */
  quote?: string;
  /** Full chunk content, stored inline by the verification pipeline — the
   *  "full chunk" highlight scope works without waiting for stage-2. */
  chunkContent?: string;
  /** Display name — used by the citation stepper tooltips. */
  title?: string;
}

type Tab = 'original' | 'content' | 'passages';

function formatBytes(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDuration(sec?: number) {
  if (!sec) return '';
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function SourceViewerModal({
  sourceId,
  onClose,
  kindBadge,
  highlight,
  initialTab,
  citations,
  citationIndex,
  onNavigate,
  citationLink,
}: {
  sourceId: string;
  onClose: () => void;
  /** Render-prop for the same kind badge used in the list. */
  kindBadge: (kind: string) => ReactNode;
  /** Citation target: the quoted passage gets marked + scrolled into view. */
  highlight?: SourceHighlight;
  /** Which view to open on (citations default to the ORIGINAL file when its
   *  bytes are retained — quote located + highlighted there — else content). */
  initialTab?: Tab;
  /** ALL citations of the question (not just the open one) — enables the
   *  ‹ › stepper: navigate between citations WITHOUT closing the modal. */
  citations?: SourceHighlight[];
  /** Index of the currently open citation inside `citations`. */
  citationIndex?: number;
  /** Step to another citation (parent keeps the index state). */
  onNavigate?: (index: number) => void;
  /** Deep link for the CURRENT citation (/bank?q=<id>&cite=<i>) — shows a
   *  copy button so the viewer itself can hand out "reopen at this passage"
   *  URLs (study resume, notes, sharing). */
  citationLink?: string;
}) {
  const [detail, setDetail] = useState<SourceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  // null = "auto": derive the landing tab from what's available once the
  // detail loads (explicit initialTab > cited passage > original > content).
  // Deriving during render avoids the setState-in-effect cascade.
  const [tabChoice, setTabChoice] = useState<Tab | null>(initialTab ?? null);
  const [copied, setCopied] = useState(false);
  /** Deep-link copy feedback (separate from the content copy button). */
  const [linkCopied, setLinkCopied] = useState(false);
  const copyCitationLink = useCallback(async () => {
    if (!citationLink) return;
    try {
      await navigator.clipboard.writeText(citationLink);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = citationLink;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      ta.remove();
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  }, [citationLink]);
  const [pdfPages, setPdfPages] = useState<number | null>(null);
  const markRef = useRef<HTMLElement | null>(null);
  const chunkRef = useRef<HTMLDivElement | null>(null);
  /** Media players — seeked to the cited [mm:ss] moment when landing on the
   *  original tab (audio/video transcripts carry timestamps). */
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  /** PDF citation scan: locating / found on page N / not in the text layer. */
  const [pdfScan, setPdfScan] = useState<'scanning' | 'found' | 'missing' | null>(null);
  const [pdfFoundPage, setPdfFoundPage] = useState<number | null>(null);
  /** HIGHLIGHT SCOPE: 'answer' (default — the narrow answer-anchored quote;
  *  the whole-chunk highlight was too much to read) or 'chunk' (the full
   *  indexed passage, one click away). */
  const [hlScope, setHlScope] = useState<'answer' | 'chunk'>('answer');
  const handlePdfHighlight = useCallback((page: number | null) => {
    setPdfFoundPage(page);
    setPdfScan(page == null ? 'missing' : 'found');
  }, []);

  // Citation change (stepper / chip click on an already-open modal): reset
  // the highlight scope back to the narrow default — each citation starts
  // at the answer passage, not whatever the previous one was widened to.
  useEffect(() => {
    setHlScope('answer');
  }, [sourceId, highlight?.chunkId, highlight?.quote]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // STAGE 1 — light detail (no full content, no all-chunks): enough to
        // mount the original-file viewer + header right away. A 500-chunk
        // source's heavy payload no longer gates the citation experience.
        const res = await fetch(`/api/knowledge/sources/${sourceId}`);
        const json = await res.json();
        if (!alive) return;
        if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
        setDetail(json as SourceDetail);

        // STAGE 2 — full content + all passages in the background; only the
        // content/passages tabs need it. Failure here is non-fatal (the
        // original-file experience is already live).
        try {
          const full = await fetch(`/api/knowledge/sources/${sourceId}?full=1&chunks=all`);
          const fullJson = await full.json();
          if (!alive || !full.ok) return;
          setDetail((prev) => (prev ? { ...prev, ...fullJson } : (fullJson as SourceDetail)));
        } catch { /* tabs stay hidden — the viewer is unaffected */ }
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : 'Failed to load file');
      }
    })();
    return () => { alive = false; };
  }, [sourceId]);

  // Escape closes; ← → step between citations when the stepper is active
  // (navigating WITHOUT closing the modal — no more close-reopen cycling).
  const canStep = Boolean(citations && citations.length > 1 && citationIndex != null && onNavigate);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (!citations || citationIndex == null || !onNavigate) return;
      if (e.key === 'ArrowLeft' && citationIndex > 0) onNavigate(citationIndex - 1);
      else if (e.key === 'ArrowRight' && citationIndex < citations.length - 1) onNavigate(citationIndex + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, citations, citationIndex, onNavigate]);

  const s = detail?.source;
  const chunkList = useMemo(() => detail?.chunks ?? [], [detail]);
  const passagesCount = detail?.chunkTotal ?? s?.meta?.chunks ?? chunkList.length;

  const hasOriginal = Boolean(s?.hasOriginal);
  const originalMime = s?.originalMime ?? s?.meta?.originalMime ?? '';
  const fileUrl = `/api/knowledge/sources/${sourceId}/file`;

  const isPdf = originalMime === 'application/pdf';
  const isImage = originalMime.startsWith('image/');
  const isAudio = originalMime.startsWith('audio/');
  const isVideo = originalMime.startsWith('video/');

  // Effective tab: explicit user choice, else auto-derived. Citations land
  // on the ORIGINAL FILE when its bytes are retained (Adobe-like view with the
  // passage located + highlighted / media seeked to the cited moment); only
  // sources without a retained original fall back to the extracted content.
  const hasHighlight = Boolean(highlight?.chunkId || highlight?.quote);
  const tab: Tab = tabChoice && (tabChoice !== 'original' || hasOriginal)
    ? tabChoice
    : hasHighlight
      ? (hasOriginal ? 'original' : 'content')
      : hasOriginal ? 'original' : 'content';

  // Resolve the FULL CHUNK text: inline chunkContent (verification-pipeline
  // citations carry it) → cited chunk from the passages list → nothing.
  const chunkContent = useMemo(() => {
    if (highlight?.chunkContent) return highlight.chunkContent;
    if (highlight?.chunkId) {
      const chunk = chunkList.find((c) => c.id === highlight.chunkId);
      if (chunk) return chunk.content;
    }
    return '';
  }, [highlight, chunkList]);

  // Effective quote is SCOPE-AWARE: 'answer' → the answer-anchored quote
  // (legacy quote-less citations fall back to the full passage); 'chunk' →
  // the whole indexed passage. Every highlight consumer (PDF scan, <mark>,
  // scroll-into-view, cited media moment) follows the scope.
  const effectiveQuote = useMemo(() => {
    if (hlScope === 'chunk') return chunkContent;
    return highlight?.quote || chunkContent;
  }, [hlScope, highlight, chunkContent]);

  // The scope toggle only makes sense when BOTH scopes exist AND differ —
  // a legacy full-passage citation has nothing to widen.
  const scopeToggleAvailable = Boolean(
    highlight?.quote && chunkContent && highlight.quote.trim() !== chunkContent.trim(),
  );

  // Reset the PDF scan whenever the EFFECTIVE quote changes (citation
  // navigation OR answer↔chunk scope toggle) so the banner never shows a
  // stale page while PdfCanvasViewer rescans the new passage.
  useEffect(() => {
    setPdfScan(null);
    setPdfFoundPage(null);
  }, [effectiveQuote]);

  // The cited moment for audio / video sources: transcript chunks carry
  // [mm:ss] timestamps from ingestion — seek the player there so "scroll to
  // the citation" means "jump to the exact moment".
  const citedTimestamp = useMemo(() => {
    if (!effectiveQuote) return null;
    const m = effectiveQuote.match(/\[(\d{1,3}):(\d{2})\]/);
    if (!m) return null;
    const sec = Number(m[1]) * 60 + Number(m[2]);
    return Number.isFinite(sec) && sec >= 0 ? sec : null;
  }, [effectiveQuote]);

  // Seek the original audio / video player to the cited moment (once the
  // metadata is loaded — currentTime before metadata is unreliable).
  const seekedRef = useRef(false);
  useEffect(() => {
    if (tab !== 'original' || citedTimestamp == null) return;
    const apply = (el: HTMLMediaElement | null) => {
      if (!el) return;
      const set = () => {
        if (seekedRef.current) return;
        seekedRef.current = true;
        try { el.currentTime = Math.max(0, citedTimestamp); } catch { /* seek failed */ }
      };
      if (el.readyState >= 1) set();
      else el.addEventListener('loadedmetadata', set, { once: true });
    };
    apply(audioPlayerRef.current);
    apply(videoPlayerRef.current);
  }, [tab, citedTimestamp, detail]);
  useEffect(() => { seekedRef.current = false; }, [sourceId, highlight?.chunkId]);

  // Scroll the highlighted passage into view once the content tab renders it.
  useEffect(() => {
    if (!detail || !effectiveQuote) return;
    if (tab === 'content') {
      const t = setTimeout(() => markRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return () => clearTimeout(t);
    }
    if (tab === 'passages' && highlight?.chunkId) {
      const t = setTimeout(() => chunkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return () => clearTimeout(t);
    }
  }, [detail, tab, effectiveQuote, highlight]);

  const copyContent = useCallback(async () => {
    if (!detail?.content) return;
    try {
      await navigator.clipboard.writeText(detail.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  }, [detail]);

  /** Content split around the first occurrence of the quote (for <mark>). */
  const contentParts = useMemo(() => {
    if (!detail?.content || !effectiveQuote) return null;
    const idx = detail.content.indexOf(effectiveQuote.slice(0, 160));
    if (idx !== -1) {
      return {
        before: detail.content.slice(0, idx),
        mark: detail.content.slice(idx, idx + effectiveQuote.length),
        after: detail.content.slice(idx + effectiveQuote.length),
      };
    }
    // Whitespace-tolerant fallback: quotes saved before the sentence-aware
    // re-index can carry raw newlines ("all\ncases") while the stored content
    // now flows on one line ("all cases"). Match on a whitespace-squeezed
    // view and map the hit back to raw content indices.
    const squeeze = (s: string) => s.replace(/\s+/g, '');
    const sqQuote = squeeze(effectiveQuote.slice(0, 160));
    if (sqQuote.length < 20) return null;
    const sqIdx = squeeze(detail.content).indexOf(sqQuote);
    if (sqIdx === -1) return null;
    let seen = 0;
    let rawStart = -1;
    let rawEnd = -1;
    for (let i = 0; i < detail.content.length; i++) {
      if (/\s/.test(detail.content[i])) continue;
      if (seen === sqIdx) rawStart = i;
      if (seen === sqIdx + sqQuote.length - 1) {
        rawEnd = i + 1;
        break;
      }
      seen++;
    }
    if (rawStart === -1 || rawEnd === -1) return null;
    return {
      before: detail.content.slice(0, rawStart),
      mark: detail.content.slice(rawStart, rawEnd),
      after: detail.content.slice(rawEnd),
    };
  }, [detail, effectiveQuote]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="View knowledge source"
    >
      <div
        // Large reading surface: near-fullscreen width/height so PDFs and
        // media get a REAL viewer scale (the old max-w-3xl cramped them).
        className="w-[min(1100px,95vw)] h-[92vh] rounded-2xl border border-white/[0.1] bg-[#141926] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => { e.stopPropagation(); }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-5 py-3.5 border-b border-white/[0.08] shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {s ? kindBadge(s.meta?.fileKind || s.fileKind) : null}
              <p className="text-sm font-semibold text-[#c8d0e0] truncate">
                {s?.name ?? 'Loading…'}
              </p>
              {s && (
                <span
                  className={`px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${
                    s.status === 'ready'
                      ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
                      : s.status === 'failed'
                        ? 'text-red-400 bg-red-400/10 border-red-400/30'
                        : 'text-amber-400 bg-amber-400/10 border-amber-400/30'
                  }`}
                >
                  {s.status}
                </span>
              )}
            </div>
            {/* Stats line */}
            {s && (
              <p className="text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-2 flex-wrap">
                <Calendar className="w-3 h-3" />
                {new Date(s.createdAt).toLocaleString()}
                {passagesCount ? <> · {passagesCount} passages</> : null}
                {s.meta?.durationSec ? <> · {formatDuration(s.meta.durationSec)}</> : null}
                {pdfPages ? <> · {pdfPages} pages</> : s.meta?.pages ? <> · {s.meta.pages} pages</> : null}
                {s.documents?.[0]?.sizeBytes ? <> · {formatBytes(s.documents[0].sizeBytes)} text</> : null}
                {s.meta?.originalBytes ? <> · original {formatBytes(s.meta.originalBytes)}</> : null}
                {s.meta?.ocr ? <> · via OCR</> : null}
              </p>
            )}
          </div>
          {/* Citation stepper — ‹ 2/3 › : navigate between the question's
              citations WITHOUT closing the modal (chips keep working too). */}
          {canStep && citationIndex != null && citations && (
            <div className="flex items-center gap-0.5 shrink-0 px-1.5 py-1 rounded-lg border border-white/10 bg-[#111624]">
              <button
                type="button"
                disabled={citationIndex <= 0}
                onClick={() => onNavigate?.(citationIndex - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                aria-label="Previous citation"
                title={citationIndex > 0 && citations[citationIndex - 1]?.title
                  ? `Previous: ${citations[citationIndex - 1].title}`
                  : 'Previous citation'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-1 min-w-[3rem] text-center text-[11px] font-semibold text-[#c8d0e0] tabular-nums" title="Citation position">
                {citationIndex + 1}/{citations.length}
              </span>
              <button
                type="button"
                disabled={citationIndex >= citations.length - 1}
                onClick={() => onNavigate?.(citationIndex + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                aria-label="Next citation"
                title={citationIndex < citations.length - 1 && citations[citationIndex + 1]?.title
                  ? `Next: ${citations[citationIndex + 1].title}`
                  : 'Next citation'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* Citation deep link — copy a URL that reopens this question at
              this exact citation (see QuestionCard.buildCitationLink). */}
          {citationLink && (
            <button
              type="button"
              onClick={copyCitationLink}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-[#8b95a8] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/40 transition-colors shrink-0"
              title="Copy a link that reopens this question at this citation — share it, or keep it as a study bookmark"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00e5a0]" />
                  <span className="hidden md:inline text-[#00e5a0]">Copied</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Link</span>
                </>
              )}
            </button>
          )}
          {/* Download the retained original */}
          {hasOriginal && (
            <a
              href={`${fileUrl}?download=1`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors shrink-0"
              title="Download the original file"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {error && (
          <div className="px-5 py-8 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {!error && !detail && (
          <div className="px-5 py-16 flex flex-col items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#4fc3f7]" />
            <p className="text-xs text-[#5a6478]">Loading file…</p>
          </div>
        )}

        {!error && detail && s && (
          <>
            {/* Failed banner */}
            {s.status === 'failed' && (
              <div className="mx-5 mt-3 px-3 py-2.5 rounded-lg border border-red-400/30 bg-red-400/10 flex items-start gap-2 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-red-400 leading-relaxed">
                  Indexing failed: {s.error || 'unknown error'}
                </p>
              </div>
            )}

            {/* Citation banner — contextual: on the ORIGINAL tab it points
                back to the extracted text; on content/passages it links to the
                original (Adobe-like) view. Shows the located PDF page and the
                cited media moment when known. The HIGHLIGHT SCOPE is stated
                (answer passage vs full chunk) and switchable inline. */}
            {effectiveQuote && (
              <div className="mx-5 mt-3 px-3 py-2.5 rounded-lg border border-[#4fc3f7]/30 bg-[#4fc3f7]/[0.07] flex items-start gap-2 shrink-0">
                <Highlighter className="w-3.5 h-3.5 text-[#4fc3f7] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[#8b95a8] leading-relaxed">
                  {tab === 'original'
                    ? isPdf
                      ? pdfScan === 'found' && pdfFoundPage != null
                        ? <>{hlScope === 'answer' ? 'Cited answer passage — highlighted in the original file' : 'Cited passage (full chunk) — highlighted in the original file'} (page {pdfFoundPage})</>
                        : pdfScan === 'missing'
                          ? <>Cited passage — opened in the original file (not found in the PDF text layer — check the extracted text)</>
                          : <>Cited passage — locating in the original PDF…</>
                      : isAudio || isVideo
                        ? citedTimestamp != null
                          ? <>Cited moment — the player is set to {formatDuration(citedTimestamp)}</>
                          : <>Cited passage — playing the original recording</>
                        : <>Cited passage — from the original file</>
                    : <>{hlScope === 'answer' ? 'Cited answer passage — highlighted below in the source' : 'Cited passage (full chunk) — highlighted below in the source'}</>}
                  {scopeToggleAvailable && (
                    <>{' · '}highlight:{' '}
                      <button
                        type="button"
                        className={hlScope === 'answer'
                          ? 'text-[#4fc3f7] font-semibold underline underline-offset-2'
                          : 'text-[#8b95a8] underline underline-offset-2 hover:text-[#4fc3f7]'}
                        onClick={() => setHlScope('answer')}
                      >
                        answer
                      </button>
                      {' | '}
                      <button
                        type="button"
                        className={hlScope === 'chunk'
                          ? 'text-[#4fc3f7] font-semibold underline underline-offset-2'
                          : 'text-[#8b95a8] underline underline-offset-2 hover:text-[#4fc3f7]'}
                        onClick={() => setHlScope('chunk')}
                      >
                        full chunk
                      </button>
                    </>
                  )}
                  {hasOriginal && tab !== 'original' && (
                    <>
                      {' · '}
                      <button
                        type="button"
                        className="text-[#4fc3f7] underline underline-offset-2 hover:text-[#7fd4ff]"
                        onClick={() => { setPdfScan(null); setPdfFoundPage(null); setTabChoice('original'); }}
                      >
                        view the original file
                      </button>
                    </>
                  )}
                  {tab === 'original' && (detail.content ?? '').length > 0 && (
                    <>
                      {' · '}
                      <button
                        type="button"
                        className="text-[#4fc3f7] underline underline-offset-2 hover:text-[#7fd4ff]"
                        onClick={() => setTabChoice('content')}
                      >
                        view extracted text
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 px-5 pt-3 shrink-0">
              {hasOriginal && (
                <button
                  type="button"
                  onClick={() => setTabChoice('original')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                    tab === 'original'
                      ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]'
                      : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'
                  }`}
                >
                  {isPdf ? <FileIcon className="w-3 h-3" /> : isImage ? <FileImage className="w-3 h-3" /> : isVideo ? <FileVideo className="w-3 h-3" /> : isAudio ? <FileAudio className="w-3 h-3" /> : <FileIcon className="w-3 h-3" />}
                  Original file
                </button>
              )}
              {(detail.content ?? '').length > 0 && chunkList.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setTabChoice('content')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                      tab === 'content'
                        ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]'
                        : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'
                    }`}
                  >
                    <FileText className="w-3 h-3" /> Extracted content
                  </button>
                  <button
                    type="button"
                    onClick={() => setTabChoice('passages')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                      tab === 'passages'
                        ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]'
                        : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'
                    }`}
                  >
                    <Layers className="w-3 h-3" /> Indexed passages ({chunkList.length})
                  </button>
                </>
              )}
            </div>

            {/* ── ORIGINAL FILE tab — the file as uploaded, in an app-styled
                 native viewer (custom pdf.js reader / zoomable image /
                 players) ── */}
            {tab === 'original' && hasOriginal && (
              <div className="px-5 py-3 flex-1 min-h-0 flex flex-col gap-2">
                {isPdf && (
                  <PdfCanvasViewer
                    src={fileUrl}
                    fileName={s.name}
                    onDocumentStats={setPdfPages}
                    highlight={effectiveQuote || undefined}
                    onHighlightFound={handlePdfHighlight}
                  />
                )}
                {isImage && (
                  <OriginalImageViewer
                    fileUrl={fileUrl}
                    fileName={s.name}
                  />
                )}
                {isAudio && (
                  <div className="flex-1 min-h-0 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] text-[#5a6478]">
                      <FileAudio className="w-3 h-3" />
                      Original audio
                      {s.meta?.durationSec ? <> · {formatDuration(s.meta.durationSec)}</> : null}
                      {s.meta?.originalBytes ? <> · {formatBytes(s.meta.originalBytes)}</> : null}
                      {citedTimestamp != null && hasHighlight ? (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] font-semibold">
                          cited moment · {formatDuration(citedTimestamp)}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#0f1320] p-6">
                      <div className="w-full max-w-xl flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center">
                          <FileAudio className="w-6 h-6 text-purple-400" />
                        </div>
                        <p className="text-xs text-[#8b95a8] text-center truncate max-w-full">{s.name}</p>
                        <audio
                          ref={audioPlayerRef}
                          controls
                          preload="metadata"
                          src={fileUrl}
                          className="w-full"
                        >
                          Your browser does not support audio playback.
                        </audio>
                      </div>
                    </div>
                  </div>
                )}
                {isVideo && (
                  <div className="flex-1 min-h-0 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] text-[#5a6478]">
                      <FileVideo className="w-3 h-3" />
                      Original video
                      {s.meta?.durationSec ? <> · {formatDuration(s.meta.durationSec)}</> : null}
                      {s.meta?.originalBytes ? <> · {formatBytes(s.meta.originalBytes)}</> : null}
                      {citedTimestamp != null && hasHighlight ? (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] font-semibold">
                          cited moment · {formatDuration(citedTimestamp)}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-white/[0.08] bg-black overflow-hidden">
                      <video
                        ref={videoPlayerRef}
                        controls
                        preload="metadata"
                        src={fileUrl}
                        className="w-full h-full max-h-full object-contain"
                      >
                        Your browser does not support video playback.
                      </video>
                    </div>
                  </div>
                )}
                {!isPdf && !isImage && !isAudio && !isVideo && (
                  <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                    <FileIcon className="w-7 h-7 text-[#5a6478]" />
                    <p className="text-xs text-[#8b95a8]">
                      This file type ({originalMime || 'unknown'}) has no inline viewer.
                    </p>
                    <a
                      href={`${fileUrl}?download=1`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4fc3f7]/30 bg-[#4fc3f7]/10 text-[#4fc3f7] text-[11px] font-semibold hover:bg-[#4fc3f7]/20"
                    >
                      <Download className="w-3.5 h-3.5" /> Download the original
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            {tab === 'content' && (
              <div className="px-5 py-3 overflow-y-auto flex-1 min-h-0">
                {detail.content ? (
                  <div className="rounded-xl border border-white/[0.06] bg-[#0f1320] p-4 h-full flex flex-col min-h-0">
                    <div className="flex justify-between items-center mb-2 shrink-0">
                      <p className="text-[10px] text-[#5a6478] uppercase tracking-widest">
                        {s.meta?.transcription || s.meta?.ocr || s.fileKind === 'audio' || s.fileKind === 'video'
                          ? 'transcript'
                          : 'extracted text'}
                        {detail.contentTruncated ? ' · first 100k characters' : ''}
                      </p>
                      <button
                        type="button"
                        onClick={copyContent}
                        className="flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-[10px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    {contentParts ? (
                      <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal flex-1 min-h-0 overflow-y-auto">
                        {contentParts.before}
                        <mark
                          ref={markRef}
                          className="bg-[#4fc3f7]/25 text-[#e8f4ff] rounded px-0.5 py-0.5 animate-[citation-pulse_1.6s_ease-out_1] shadow-[inset_0_-2px_0_rgba(79,195,247,0.5)]"
                        >
                          {contentParts.mark}
                        </mark>
                        {contentParts.after}
                      </pre>
                    ) : (
                      <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal flex-1 min-h-0 overflow-y-auto">
                        {detail.content}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <FileText className="w-6 h-6 text-[#5a6478] mx-auto mb-2" />
                    <p className="text-xs text-[#5a6478]">
                      {s.status === 'ready'
                        ? 'No extracted text stored for this source.'
                        : s.status === 'failed'
                          ? 'Nothing was extracted — see the error above.'
                          : 'Content will appear once indexing finishes.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Passages */}
            {tab === 'passages' && (
              <div className="px-5 py-3 overflow-y-auto flex-1 min-h-0 space-y-2">
                {chunkList.map((c) => {
                  const cited = highlight?.chunkId && c.id === highlight.chunkId;
                  return (
                    <div
                      key={c.id ?? c.idx}
                      ref={cited ? chunkRef : undefined}
                      className={`rounded-xl p-3 border ${
                        cited
                          ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/[0.06]'
                          : 'border-white/[0.06] bg-[#0f1320]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${
                          cited
                            ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]'
                            : 'bg-[#4fc3f7]/10 border-[#4fc3f7]/30 text-[#4fc3f7]'
                        }`}>
                          #{c.idx + 1}
                        </span>
                        <span className="text-[10px] text-[#5a6478] truncate">
                          {c.contextSummary || 'no summary'}
                        </span>
                        {cited && (
                          <span className="ml-auto shrink-0 px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/15 border border-[#4fc3f7]/40 text-[#4fc3f7] text-[9px] font-semibold uppercase tracking-wider">
                            cited
                          </span>
                        )}
                        {!cited && <span className="text-[10px] text-[#5a6478] ml-auto shrink-0">{c.embeddingModel}</span>}
                      </div>
                      <p className={`text-[11px] leading-relaxed whitespace-pre-wrap break-words ${cited ? 'text-[#c8d0e0]' : 'text-[#8b95a8]'}`}>
                        {c.content}
                      </p>
                    </div>
                  );
                })}
                {chunkList.length === 0 && (
                  <p className="text-xs text-[#5a6478] text-center py-10">
                    No passages indexed{detail.source.status === 'failed' ? ' — ingestion failed' : ''}.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   OriginalImageViewer — width-based zoom (NOT transform: scale — transforms
   don't affect layout, which broke the scroll bounds in the old viewer) +
   a REAL "Fit" that measures the container, 1:1 pixel-true reset, and a
   transparent-file checkerboard backdrop.
   ══════════════════════════════════════════════════════════════════════════ */
function OriginalImageViewer({ fileUrl, fileName }: { fileUrl: string; fileName: string }) {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState<number | 'fit'>('fit');
  const [containerW, setContainerW] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* Track the scroll container width for the real "fit" computation. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setContainerW(el.clientWidth));
    });
    ro.observe(el);
    setContainerW(el.clientWidth);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const fitScale = useMemo(() => {
    if (!natural || containerW < 40) return 1;
    // Leave a little padding; never upscale beyond 1 for "fit".
    return Math.min(1, (containerW - 24) / natural.w);
  }, [natural, containerW]);

  const scale = zoom === 'fit' ? fitScale : zoom;
  const displayWidth = natural ? Math.max(1, Math.round(natural.w * scale)) : undefined;

  const stepZoom = (dir: 1 | -1) => {
    setZoom((z) => {
      const current = typeof z === 'number' ? z : fitScale;
      return Math.max(0.1, Math.min(6, Math.round((current + dir * 0.25) * 100) / 100));
    });
  };

  const ctrlBtn =
    'flex items-center justify-center gap-1 px-2 h-7 rounded-lg border border-white/10 text-[#8b95a8] ' +
    'hover:text-[#c8d0e0] hover:border-white/25 transition-colors text-[10px]';

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-[#111624] flex-wrap shrink-0">
        <button type="button" className={ctrlBtn} onClick={() => stepZoom(-1)} aria-label="Zoom out" title="Zoom out">
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span
          className="flex items-center justify-center w-[3.4rem] h-7 rounded-lg border border-white/10 text-[11px] text-[#c8d0e0]"
          title="Current zoom level"
        >
          {Math.round(scale * 100)}%
        </span>
        <button type="button" className={ctrlBtn} onClick={() => stepZoom(1)} aria-label="Zoom in" title="Zoom in">
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom('fit')}
          className={`flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${
            zoom === 'fit'
              ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]'
              : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'
          }`}
          title="Fit the image to the window"
        >
          <StretchHorizontal className="w-3.5 h-3.5" /> Fit
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          className={`flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${
            zoom === 1
              ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]'
              : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'
          }`}
          title="Show at original pixel size (1:1)"
        >
          <Frame className="w-3.5 h-3.5" /> 1:1
        </button>
        <span className="flex-1" />
        {natural && (
          <span className="text-[10px] text-[#5a6478] px-1" title="Natural pixel dimensions">
            {natural.w} × {natural.h}
          </span>
        )}
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors"
          title="Open the full image in a new tab"
          aria-label="Open the full image in a new tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Canvas area — width-based zoom keeps the scroll bounds correct */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-auto rounded-xl border border-white/[0.06]"
        style={{
          backgroundColor: '#0a0e17',
          backgroundImage:
            'linear-gradient(45deg, #10141f 25%, transparent 25%, transparent 75%, #10141f 75%),' +
            'linear-gradient(45deg, #10141f 25%, transparent 25%, transparent 75%, #10141f 75%)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      >
        <div className="flex items-start justify-center p-3 min-h-full">
          {!natural && (
            <div className="flex flex-col items-center justify-center gap-2 py-16">
              <Loader2 className="w-5 h-5 animate-spin text-[#4fc3f7]" />
              <p className="text-[10px] text-[#5a6478]">Loading image…</p>
            </div>
          )}
          <img
            src={fileUrl}
            alt={`Original file: ${fileName}`}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth) setNatural({ w: img.naturalWidth, h: img.naturalHeight });
            }}
            style={displayWidth ? { width: displayWidth, height: 'auto' } : undefined}
            className={
              natural
                ? 'block rounded-md shadow-[0_2px_16px_rgba(0,0,0,0.5)]'
                : 'block max-h-1'
            }
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
