'use client';

/**
 * PdfCanvasViewer — a CUSTOM PDF reader built on pdf.js, styled to match the
 * MedQ dark theme (the browser's built-in <iframe> viewer is light-gray and
 * cannot be themed, which clashed with the app design).
 *
 * Features:
 *   - Continuous page scroll with LAZY per-page canvas rendering
 *     (IntersectionObserver — only pages near the viewport render) plus
 *     PRIORITY rendering: the page holding a cited passage renders first.
 *   - Streaming download with a REAL progress bar (bytes received vs
 *     Content-Length) — a multi-MB PDF no longer shows a blind spinner.
 *   - Zoom: fit-width / fit-page / custom % (25–400), live page indicator.
 *   - Page navigation: first / prev / next / last + jump-to-page input.
 *   - Crisp text: devicePixelRatio-aware canvases.
 *   - Citation HIGHLIGHT: the quote's text layer is scanned in PARALLEL
 *     batches (≈8 pages at once, first match in document order wins), the
 *     viewer jumps INSTANTLY to the page (smooth only for near pages) and
 *     overlays persistent amber highlighter boxes on the exact text runs.
 *   - App-styled toolbar (same tokens as the rest of MedQ: #0f1320 surfaces,
 *     white/10 borders, #4fc3f7 accent).
 *   - Graceful fallback: if pdf.js fails to initialize, renders the old
 *     embedded browser viewer (iframe) so a viewer is ALWAYS available.
 *
 * The document bytes come from the owner-gated serving route
 * (GET /api/knowledge/sources/[id]/file — cookie-authenticated, so it must be
 * fetched and fed to pdf.js rather than given as a bare object URL).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  StretchHorizontal,
  Maximize2,
  Download,
  ExternalLink,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

/* Minimal structural types (avoids importing pdfjs at module scope). */
interface PdfViewport {
  width: number;
  height: number;
}
/** pdf.js text item: str + the transform matrix (PDF user space, y-up).
 *  NOTE: pdfjs-dist returns `transform` as a Float32Array (NOT Array —
 *  Array.isArray() is false for it, which silently emptied the item list
 *  until every citation scan came back "not located"). Typed-array indexing
 *  works identically, so accept both. */
interface PdfTextItem {
  str: string;
  transform: number[] | Float32Array;
  width: number;
  height: number;
}
interface PdfPageProxy {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (opts: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
  }) => { cancel: () => void; promise: Promise<void> };
  getTextContent: () => Promise<{ items: Partial<PdfTextItem>[] }>;
  cleanup: () => void;
}
interface PdfDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxy>;
}

/** A highlight box in PDF user-space units (scale 1, y-up → pre-flipped). */
interface HighlightRect {
  left: number;
  top: number;
  w: number;
  h: number;
}

export type PdfZoomMode = 'fit-width' | 'fit-page' | number;

interface Props {
  /** URL of the PDF bytes (owner-gated serving route). */
  src: string;
  /** Display name (download filename / aria labels). */
  fileName: string;
  /** Notified once the page count is known (header stats). */
  onDocumentStats?: (numPages: number) => void;
  /** Quoted passage to locate (question citation): the viewer scans the text
   *  layers page by page, scrolls to the match and highlights the text runs. */
  highlight?: string;
  /** Result of the highlight scan: the 1-based page it was found on, or null
   *  when the quote could not be located in the PDF. */
  onHighlightFound?: (page: number | null) => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;

function clampScale(s: number): number {
  if (!Number.isFinite(s) || s <= 0) return 1;
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, s));
}

export default function PdfCanvasViewer({ src, fileName, onDocumentStats, highlight, onHighlightFound }: Props) {
  const [doc, setDoc] = useState<PdfDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  /** Base page size at scale 1 (pages are usually uniform; first page wins). */
  const [baseSize, setBaseSize] = useState<{ w: number; h: number } | null>(null);
  const [zoomMode, setZoomMode] = useState<PdfZoomMode>('fit-width');
  const [currentPage, setCurrentPage] = useState(1);
  const [containerSize, setContainerSize] = useState<{ w: number; h: number } | null>(null);
  /** Citation match: page number + highlight boxes (PDF units, scale 1),
   *  stored WITH the quote it belongs to — the ACTIVE match is derived during
   *  render (stale entries for a different quote never show). */
  const [hlState, setHlState] = useState<{ key: string; page: number; rects: HighlightRect[] } | null>(null);
  const hlKey = highlight?.trim() ? highlight : '';
  const activeMatch = hlState && hlKey && hlState.key === hlKey ? hlState : null;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  /** Strict-mode double-mount guard for the async document load. */
  const initRef = useRef(false);
  /** Real download progress while the PDF streams in (null once loaded). */
  const [dlProgress, setDlProgress] = useState<{ loaded: number; total: number } | null>(null);
  const statsRef = useRef(onDocumentStats);
  useEffect(() => { statsRef.current = onDocumentStats; }, [onDocumentStats]);
  const hlFoundRef = useRef(onHighlightFound);
  useEffect(() => { hlFoundRef.current = onHighlightFound; }, [onHighlightFound]);

  /* ── Load pdf.js + the document ─────────────────────────────────────── */
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    let destroyed = false;
    /** The LOADING TASK owns the worker lifecycle — in pdfjs-dist v6
     *  PDFDocumentProxy has NO destroy(); only the loading task does.
     *  (Calling proxy.destroy() threw "pdf.destroy is not a function"
     *  and crashed the whole route on tab switch.) */
    let loadingTask: { destroy: () => Promise<void> } | null = null;

    (async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        if (destroyed) return;

        // Worker setup — identical pattern to src/lib/file-extract.ts: load
        // the version-matched worker from /public via a blob URL (reliable,
        // no CDN fetch, no MIME issues).
        if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
          try {
            const workerResponse = await fetch('/pdf.worker.min.mjs');
            if (workerResponse.ok) {
              const workerBlob = await workerResponse.blob();
              pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
            } else {
              pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url,
              ).toString();
            }
          } catch {
            pdfjsLib.GlobalWorkerOptions.workerSrc = '';
          }
        }

        // PROGRESSIVE loading — hand pdf.js the URL, not the bytes: it reads
        // the document STRUCTURE via HTTP Range requests (the xref lives at
        // the file's tail) and fetches only the objects for the pages that
        // actually render. The first page paints after a few hundred KB
        // instead of after the WHOLE file downloads — the serving route is
        // Range-capable (206 + Accept-Ranges + Content-Length), and
        // withCredentials keeps the owner cookie on every range request.
        // Falls back to a full streamed download automatically when a proxy
        // strips Range support, so the viewer keeps working everywhere.
        const task = pdfjsLib.getDocument({
          url: src,
          withCredentials: true,
          rangeChunkSize: 262_144, // 256KB chunks — fewer round trips on multi-MB PDFs
          useWorkerFetch: false, // main-thread fetch keeps cookie auth on range requests
          useSystemFonts: true,
          // Fetch ONLY what is actually needed (doc structure + rendered
          // pages + the citation scan's text layers) — opening a citation no
          // longer downloads the whole multi-MB textbook. Ignored when the
          // server/proxy lacks Range support (pdf.js then streams fully).
          disableAutoFetch: true,
          disableStream: false,
        });
        loadingTask = task as unknown as { destroy: () => Promise<void> };
        task.onProgress = (data: { loaded?: number; total?: number }) => {
          if (destroyed) return;
          const loaded = Number(data?.loaded ?? 0);
          const total = Number(data?.total ?? 0);
          if (total > 0) setDlProgress({ loaded, total });
        };
        const loaded = await task.promise as unknown as PdfDocumentProxy;
        if (destroyed) {
          void task.destroy().catch(() => {});
          return;
        }
        setDoc(loaded);
        setDlProgress(null);
        setNumPages(loaded.numPages);
        statsRef.current?.(loaded.numPages);

        // First page's objects arrive via a couple of range fetches — baseSize
        // (needed for the zoom math) is known almost immediately.
        const page1 = await loaded.getPage(1);
        const vp = page1.getViewport({ scale: 1 });
        if (!destroyed) setBaseSize({ w: vp.width, h: vp.height });
      } catch (e) {
        if (!destroyed) setLoadError(e instanceof Error ? e.message : 'Failed to open the PDF');
      }
    })();

    return () => {
      destroyed = true;
      // destroy() on the loading task tears down the worker — safe even
      // while pages are still rendering (pending renderTasks reject).
      if (loadingTask) void loadingTask.destroy().catch(() => {});
      initRef.current = false;
    };
  }, [src]);

  /* ── Citation highlight: scan the text layers for the quoted passage ──
     Runs once per (doc, highlight). Pages are scanned in PARALLEL BATCHES
     (~8 concurrent getTextContent calls — a 600-page textbook is covered
     ~8× faster than the old sequential walk) with the first match in
     DOCUMENT ORDER winning. Each page's text items are normalized
     (whitespace-collapsed, lowercased, soft hyphens dropped) and joined so a
     quote spanning line breaks still matches. The covering text items become
     highlight boxes (PDF units, y pre-flipped), scaled up at render time; the
     match page gets PRIORITY rendering and the viewer jumps to it INSTANTLY
     (smooth scroll only for near pages — animating across hundreds of
     placeholders was the "wait then scroll" lag). */
  useEffect(() => {
    if (!doc || !hlKey) return;
    let cancelled = false;
    // Normalize BOTH sides identically: soft hyphens dropped, whitespace
    // collapsed AND trimmed, lowercased. Items are filtered to non-empty
    // BEFORE joining — pdf.js emits empty text items between lines (w:0,h:0)
    // that would otherwise create double spaces in the joined page text and
    // break matching against the single-spaced quote.
    const norm = (s: string) => s.replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const quote = norm(hlKey);

    // Pass 2 ("squeezed"): collapse "<wordchar>- <wordchar>" joins so
    // DEHYPHENATED quotes ("dyspnea", from the sentence-aware re-index)
    // still match the PDF text layer's line-end hyphenation ("dys- pnea").
    // Each removal drops 2 chars — remapped to joined-space during the walk.
    const squeeze = (s: string): { out: string; removals: number[] } => {
      let out = '';
      const removals: number[] = [];
      for (let i = 0; i < s.length; ) {
        if (
          s[i] === '-' && s[i + 1] === ' ' && out.length > 0 &&
          /[a-z0-9]/.test(out[out.length - 1]) && /[a-z0-9]/.test(s[i + 2] ?? '')
        ) {
          removals.push(out.length);
          i += 2;
        } else {
          out += s[i];
          i += 1;
        }
      }
      return { out, removals };
    };
    const toJoinedIdx = (squeezedIdx: number, removals: number[]) =>
      squeezedIdx + 2 * removals.filter((r) => r <= squeezedIdx).length;

    // Try progressively shorter prefixes — chunks are stored verbatim, but
    // PDF text streams can differ in ligatures / spacing.
    const prefixLengths = [200, 120, 60];
    const SCAN_BATCH = 8;
    (async () => {
      const maxPages = Math.min(doc.numPages, 200);
      for (const squeezed of [false, true]) {
        const quoteSrc = squeezed ? squeeze(quote).out : quote;
        // Prefix start offsets: 0, plus a skip over a leading bare page
        // number ("18 Hyperendemic…") — the merged extraction used at
        // ingestion glues page FOOTER numbers onto the next page's heading,
        // but in the PER-PAGE text layer that number is not adjacent to the
        // heading, so offset-0 prefixes of cross-page quotes never match.
        const starts = [0];
        const sp = quoteSrc.indexOf(' ');
        if (sp > 0 && sp <= 4 && /^\d+[.:-]?$/.test(quoteSrc.slice(0, sp))) starts.push(sp + 1);
        const prefixes = starts
          .flatMap((s) => prefixLengths.map((n) => quoteSrc.slice(s, s + n)))
          .filter((p) => p.length >= 20);
        for (let batchStart = 1; batchStart <= maxPages && !cancelled; batchStart += SCAN_BATCH) {
          const batchPages: number[] = [];
          for (let p = batchStart; p < batchStart + SCAN_BATCH && p <= maxPages; p++) batchPages.push(p);

          // Scan the batch CONCURRENTLY (getPage + getTextContent are worker
          // round-trips — batching hides their latency).
          const results = await Promise.all(
            batchPages.map(async (p): Promise<{ p: number; rects: HighlightRect[] } | null> => {
              try {
                const page = await doc.getPage(p);
                const tc = await page.getTextContent();
                const items = (tc.items || []).filter(
                  (it): it is PdfTextItem => typeof it.str === 'string' && it.transform != null && norm(it.str).length > 0,
                );
                const normStrs = items.map((it) => norm(it.str));
                let joined = normStrs.join(' ');
                if (!joined) return null;
                let removals: number[] = [];
                if (squeezed) {
                  const sq = squeeze(joined);
                  joined = sq.out;
                  removals = sq.removals;
                }
                for (const prefix of prefixes) {
                  const idx = joined.indexOf(prefix);
                  if (idx === -1) continue;
                  // Map back to plain joined-space so the item walk below (which
                  // counts normStrs lengths + 1 join space) stays exact.
                  const startIdx = squeezed ? toJoinedIdx(idx, removals) : idx;
                  const end = squeezed ? toJoinedIdx(idx + prefix.length, removals) : idx + prefix.length;
                  const vp = page.getViewport({ scale: 1 });
                  const rects: HighlightRect[] = [];
                  let pos = 0;
                  for (let i = 0; i < items.length; i++) {
                    const len = normStrs[i].length;
                    const itemStart = pos;
                    const itemEnd = pos + len;
                    if (len > 0 && itemEnd > startIdx && itemStart < end) {
                      const t = items[i].transform;
                      const fontH = Math.hypot(t[2] || 0, t[3] || 0) || items[i].height || 10;
                      rects.push({
                        left: t[4] || 0,
                        // baseline at y=f (y-up) → flip; text ascends ~0.85·fontH above
                        top: vp.height - (t[5] || 0) - fontH * 0.85,
                        w: items[i].width || fontH * 2,
                        h: fontH * 1.15,
                      });
                    }
                    pos = itemEnd + 1;
                    if (itemStart >= end) break;
                  }
                  if (rects.length) return { p, rects };
                }
                page.cleanup();
                return null;
              } catch { /* unreadable page — keep scanning */ }
              return null;
            }),
          );
          if (cancelled) return;

          // First match in DOCUMENT order wins (batches scan in order, but the
          // concurrent calls resolve out of order — pick the lowest page hit).
          const hit = results.find((r): r is { p: number; rects: HighlightRect[] } => r !== null && r.rects.length > 0);
          if (hit) {
            setHlState({ key: hlKey, page: hit.p, rects: hit.rects });
            hlFoundRef.current?.(hit.p);
            // Jump as soon as the layout settles — INSTANT (behavior 'auto'):
            // the old smooth scroll animated across hundreds of placeholder
            // pages, which read as "wait for full loading, then scroll".
            // Target the FIRST HIGHLIGHT BOX (not the page div): the quote
            // usually sits in the upper part of the page, which a page-level
            // 'center' scroll can leave above the fold.
            setTimeout(() => {
              if (cancelled) return;
              const pageEl = pageRefs.current[hit.p - 1];
              const firstBox = pageEl?.querySelector('[class*="citation-box-pulse"]');
              (firstBox ?? pageEl)?.scrollIntoView({ behavior: 'auto', block: 'center' });
              setCurrentPage(hit.p);
              // Second pass once React has certainly committed the highlight
              // boxes (the first attempt may run pre-commit and hit the
              // page-div fallback) — idempotent, just tightens the position.
              setTimeout(() => {
                if (cancelled) return;
                const box = pageRefs.current[hit.p - 1]?.querySelector('[class*="citation-box-pulse"]');
                box?.scrollIntoView({ behavior: 'auto', block: 'center' });
              }, 300);
            }, 80);
            return;
          }
        }
      }
      if (!cancelled) hlFoundRef.current?.(null);
    })();
    return () => { cancelled = true; };
  }, [doc, hlKey]);

  /* ── Track the scroll container size (ResizeObserver, rAF-throttled) ──
     Re-runs when the viewer branch actually mounts: during the initial
     loading state the scroll container doesn't exist yet (scrollRef is
     null), so an observer attached then would never report a size. */
  const viewerMounted = Boolean(doc && baseSize) && !loadError;
  useEffect(() => {
    if (!viewerMounted) return;
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setContainerSize({ w: el.clientWidth, h: el.clientHeight });
      });
    });
    ro.observe(el);
    setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [viewerMounted]);

  /* ── Effective scale from the zoom mode ─────────────────────────────── */
  const scale = useMemo(() => {
    if (!baseSize || !containerSize || containerSize.w < 50) return 1;
    const padX = 36; // breathing room each side
    const padY = 28;
    if (zoomMode === 'fit-width') {
      return clampScale((containerSize.w - padX) / baseSize.w);
    }
    if (zoomMode === 'fit-page') {
      return clampScale(
        Math.min((containerSize.w - padX) / baseSize.w, (containerSize.h - padY) / baseSize.h),
      );
    }
    return clampScale(zoomMode);
  }, [baseSize, containerSize, zoomMode]);

  /* ── Page navigation ────────────────────────────────────────────────── */
  const goToPage = useCallback(
    (page: number) => {
      if (!numPages) return;
      const target = Math.max(1, Math.min(numPages, page));
      pageRefs.current[target - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(target);
    },
    [numPages],
  );

  /* ── Zoom helpers ───────────────────────────────────────────────────── */
  /* Steps continue from the CURRENT VISIBLE scale — so zooming out of a
     189% fit-width lands on 169%, not on 80% (the 100% baseline). */
  const stepZoom = useCallback((dir: 1 | -1) => {
    setZoomMode(clampScale(scale + dir * 0.2));
  }, [scale]);

  const zoomPercent = Math.round(scale * 100);

  /* ── Toolbar button (shared styling) ────────────────────────────────── */
  const toolBtn =
    'flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] ' +
    'hover:text-[#c8d0e0] hover:border-white/25 transition-colors disabled:opacity-30 disabled:pointer-events-none';

  /* ── FALLBACK: pdf.js failed → embedded browser viewer ──────────────── */
  if (loadError) {
    return (
      <div className="flex-1 min-h-0 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <p className="text-[11px] text-amber-400/90 leading-relaxed">
            The custom viewer could not open this PDF ({loadError}) — showing the browser viewer instead.
          </p>
        </div>
        <iframe
          src={`${src}#toolbar=1&navpanes=0&view=FitH`}
          title={`PDF: ${fileName}`}
          className="w-full flex-1 min-h-[40vh] rounded-xl border border-white/[0.08] bg-[#0f1320]"
        />
      </div>
    );
  }

  /* ── Loading state — brief with Range loading (structure + first page
        objects only); the bar only shows when bytes are actually flowing
        (non-Range fallback / slow proxies) ── */
  if (!doc || !baseSize) {
    const pct = dlProgress && dlProgress.total > 0
      ? Math.min(100, Math.round((dlProgress.loaded / dlProgress.total) * 100))
      : null;
    const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)} MB`;
    return (
      <div className="flex-1 min-h-[40vh] flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-[#0f1320] px-6">
        <Loader2 className="w-6 h-6 animate-spin text-[#4fc3f7]" />
        <p className="text-xs text-[#5a6478]">
          {pct != null ? `Streaming PDF… ${pct}%` : 'Opening PDF…'}
        </p>
        {pct != null && dlProgress && (
          <div className="w-56">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#4fc3f7] transition-[width] duration-150"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5a6478] text-center mt-1">
              {mb(dlProgress.loaded)} / {mb(dlProgress.total)}
            </p>
          </div>
        )}
      </div>
    );
  }

  const renderedW = Math.round(baseSize.w * scale);
  const renderedH = Math.round(baseSize.h * scale);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2">
      {/* ── Toolbar (app-styled) ── */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-[#111624] flex-wrap shrink-0">
        {/* Page navigation */}
        <button type="button" className={toolBtn} onClick={() => goToPage(1)} disabled={currentPage <= 1} aria-label="First page" title="First page">
          <ChevronFirst className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={toolBtn} onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page" title="Previous page">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-1 text-[11px] text-[#8b95a8] px-1">
          <input
            type="number"
            min={1}
            max={numPages}
            value={currentPage}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!Number.isNaN(v)) goToPage(v);
            }}
            className="w-10 px-1 py-0.5 text-center rounded-md bg-[#0f1320] border border-white/10 text-[#c8d0e0] focus:outline-none focus:border-[#4fc3f7]/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label="Go to page"
          />
          <span className="text-[#5a6478]">/ {numPages}</span>
        </div>
        <button type="button" className={toolBtn} onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages} aria-label="Next page" title="Next page">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button type="button" className={toolBtn} onClick={() => goToPage(numPages)} disabled={currentPage >= numPages} aria-label="Last page" title="Last page">
          <ChevronLast className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-5 bg-white/10 mx-1" />

        {/* Zoom */}
        <button type="button" className={toolBtn} onClick={() => stepZoom(-1)} aria-label="Zoom out" title="Zoom out">
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span
          className="flex items-center justify-center w-[3.4rem] h-7 rounded-lg border border-white/10 text-[11px] text-[#c8d0e0]"
          title="Current zoom level"
        >
          {zoomPercent}%
        </span>
        <button type="button" className={toolBtn} onClick={() => stepZoom(1)} aria-label="Zoom in" title="Zoom in">
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoomMode('fit-width')}
          className={`flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${
            zoomMode === 'fit-width'
              ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]'
              : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'
          }`}
          title="Fit the page width to the window"
        >
          <StretchHorizontal className="w-3.5 h-3.5" /> Fit width
        </button>
        <button
          type="button"
          onClick={() => setZoomMode('fit-page')}
          className={`flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${
            zoomMode === 'fit-page'
              ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]'
              : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'
          }`}
          title="Fit the whole page in the window"
        >
          <Maximize2 className="w-3.5 h-3.5" /> Fit page
        </button>

        <span className="flex-1" />

        {/* Actions */}
        <a
          href={`${src}?download=1`}
          className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors"
          title="Download the PDF"
          aria-label="Download the PDF"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors"
          title="Open in a new browser tab"
          aria-label="Open in a new browser tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ── Continuous page scroll (lazy canvas rendering) ── */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-auto rounded-xl border border-white/[0.06] bg-[#0a0e17]"
        role="document"
      >
        <div className="flex flex-col items-center gap-4 p-4">
          {Array.from({ length: numPages }, (_, i) => (
            <PdfPage
              key={i}
              index={i}
              doc={doc}
              scale={scale}
              width={renderedW}
              height={renderedH}
              highlightRects={activeMatch?.page === i + 1 ? activeMatch.rects : undefined}
              /** Priority page: renders immediately when the citation match
               *  lands on it — not just when scrolled near the viewport. */
              priority={activeMatch?.page === i + 1}
              registerRef={(el) => { pageRefs.current[i] = el; }}
              onVisible={(pageIndex0) => setCurrentPage(pageIndex0 + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   Single page — renders its canvas only when scrolled near the viewport.
   ══════════════════════════════════════════════════════════════════════════ */
function PdfPage({
  index,
  doc,
  scale,
  width,
  height,
  highlightRects,
  priority,
  registerRef,
  onVisible,
}: {
  index: number;
  doc: PdfDocumentProxy;
  scale: number;
  width: number;
  height: number;
  /** Citation highlight boxes for THIS page (PDF units at scale 1), if any. */
  highlightRects?: HighlightRect[];
  /** True for the page holding the cited passage — force-renders it as soon
   *  as the match lands (before the scroll brings it into view). */
  priority?: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
  onVisible: (pageIndex0: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [rendering, setRendering] = useState(false);
  /** Scale the canvas was last rendered at — skips redundant re-renders. */
  const renderedScaleRef = useRef<number | null>(null);

  /* Priority page (citation match): render immediately, without waiting for
     the IntersectionObserver to see it after the jump. */
  useEffect(() => {
    if (priority) setVisible(true);
  }, [priority]);

  /* Observe visibility: pre-render pages near the viewport and mark the page
     crossing the vertical center of the view as the "current" page. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setVisible(true);
          const rootBounds = entry.rootBounds;
          if (rootBounds) {
            const center = rootBounds.top + rootBounds.height / 2;
            const rect = entry.boundingClientRect;
            if (rect.top <= center && rect.bottom >= center) onVisible(index);
          }
        }
      },
      { root: null, rootMargin: '400px 0px 400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onVisible]);

  /* Render / re-render when visible AND (scale or doc changed). */
  useEffect(() => {
    if (!visible || renderedScaleRef.current === scale) return;
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    (async () => {
      if (!canvasRef.current) return;
      setRendering(true);
      try {
        const page = await doc.getPage(index + 1);
        if (cancelled || !canvasRef.current) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: scale * dpr });
        const canvas = canvasRef.current;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        renderTask = page.render({ canvasContext: ctx, viewport });
        await renderTask.promise;
        if (!cancelled) {
          renderedScaleRef.current = scale;
          setRendered(true);
          page.cleanup();
        }
      } catch {
        /* render cancelled or failed — the placeholder stays */
      } finally {
        if (!cancelled) setRendering(false);
      }
    })();

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [visible, doc, index, scale]);

  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        registerRef(el);
      }}
      className="relative shrink-0"
      style={{ width, height }}
      data-page={index + 1}
    >
      {/* Placeholder while the page renders */}
      {!rendered && (
        <div className="absolute inset-0 rounded-md bg-[#141926] flex flex-col items-center justify-center gap-2 overflow-hidden">
          <div className="absolute inset-0 animate-[shimmer_2.4s_linear_infinite] bg-[linear-gradient(100deg,transparent_30%,rgba(79,195,247,0.06)_50%,transparent_70%)] bg-[length:200%_100%]" />
          <span className="text-[10px] text-[#5a6478] z-10">Page {index + 1}</span>
          {rendering && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4fc3f7]/60 z-10" />}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block rounded-md shadow-[0_2px_16px_rgba(0,0,0,0.5)] bg-white"
        style={{ width, height }}
      />
      {/* "cited passage" badge anchored to the first highlighted run —
          OUTSIDE the multiply-blended boxes so it renders at full opacity,
          clamped inside the page bounds. */}
      {highlightRects && highlightRects.length > 0 && (
        <span
          className="absolute px-1.5 py-0.5 rounded-md bg-amber-400 text-black text-[9px] font-bold whitespace-nowrap shadow-md pointer-events-none z-10"
          style={{
            top: Math.max(2, highlightRects[0].top * scale - 18),
            left: highlightRects[0].left * scale,
          }}
        >
          cited passage
        </span>
      )}
      {/* Citation highlight overlay — PERSISTENT amber highlighter boxes over
          the matched text runs (PDF units × current CSS scale), one strong
          pulse on arrival, then a clearly visible resting state.
          mix-blend-mode: multiply keeps the underlying text readable — like
          a real highlighter pen. */}
      {highlightRects?.map((r, k) => (
        <div
          key={k}
          className="absolute rounded-[3px] pointer-events-none animate-[citation-box-pulse_1.8s_ease-out_1]"
          style={{
            left: r.left * scale,
            top: r.top * scale,
            width: Math.max(r.w * scale, 4),
            height: Math.max(r.h * scale, 6),
            background: 'rgba(250, 204, 21, 0.38)',
            boxShadow: '0 0 0 1.5px rgba(245, 158, 11, 0.55)',
            mixBlendMode: 'multiply',
          }}
        />
      ))}
      {/* Page number chip (bottom corner) */}
      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white/70 text-[9px] font-semibold pointer-events-none">
        {index + 1}
      </span>
    </div>
  );
}
