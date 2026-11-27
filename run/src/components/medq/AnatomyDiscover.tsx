'use client';

/**
 * AnatomyDiscover — AI-powered in-app discovery of 3D anatomy models + images.
 *
 * STREAMING ARCHITECTURE
 * ───────────────────────
 * The component fires TWO parallel API calls on every search:
 *
 *   POST /api/anatomy-discover/sketchfab   (fast: ~1-3s)
 *   POST /api/anatomy-discover/images      (slow: ~15-50s)
 *
 * Each call resolves independently. State is tracked separately:
 *
 *   sketchfabStatus: 'idle' | 'loading' | 'done' | 'error'
 *   imagesStatus:    'idle' | 'loading' | 'done' | 'error'
 *
 * Whichever call resolves first renders immediately. The user sees 3D
 * models within ~2s, and images fill in over the next ~30s. If images
 * fail entirely, 3D models still render — and vice versa.
 *
 * This is "streaming-like" without needing SSE or ReadableStream: just
 * two independent fetches updating two independent state slices.
 */

import { useState, useCallback, useRef } from 'react';
import {
  Search,
  Sparkles,
  Loader2,
  AlertTriangle,
  Box,
  ImageIcon,
  ExternalLink,
  Heart,
  Eye,
  RefreshCw,
  Wand2,
  X,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

// ── Color constants ──
const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
  cardSolid: '#151821',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  amber: 'var(--medq-accent-amber, #ffb347)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  text: 'var(--medq-text, #e8ecf4)',
  muted: 'var(--medq-muted, #5a6478)',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  blue: '#3b82f6',
};

function alpha(color: string, percentage: number): string {
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}

// ── Types (mirror the API routes) ──
interface SketchfabModelResult {
  uid: string;
  name: string;
  viewerUrl: string;
  embedUrl: string;
  thumbnailUrl: string | null;
  author: string;
  likeCount: number;
  viewCount: number;
  description: string;
  isDownloadable: boolean;
}

interface ImageResult {
  url: string;
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
}

type LoadStatus = 'idle' | 'loading' | 'done' | 'error';

interface SketchfabState {
  status: LoadStatus;
  models: SketchfabModelResult[];
  suggestedModelId?: string;
  error?: string;
}

interface ImagesState {
  status: LoadStatus;
  images: ImageResult[];
  error?: string;
}

const SYSTEMS = [
  'General',
  'Cardiovascular',
  'Respiratory',
  'Neurological',
  'Gastrointestinal',
  'Renal/Urinary',
  'Endocrine',
  'Musculoskeletal',
  'Hematology',
  'Psychiatry',
  'Pediatrics',
  'OB/GYN',
  'Emergency',
];

const QUICK_TOPICS = [
  'Circle of Willis',
  'Brachial plexus',
  'Heart chambers and valves',
  'Cranial nerves',
  'Female pelvic floor',
  'Spinal cord tracts',
  'Shoulder joint muscles',
  'Abdominal wall layers',
  'Inner ear anatomy',
  'Cerebellum',
];

// ── Helpers ──

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

const INITIAL_SKETCHFAB: SketchfabState = { status: 'idle', models: [] };
const INITIAL_IMAGES: ImagesState = { status: 'idle', images: [] };

// ── Component ──

export default function AnatomyDiscover() {
  const [query, setQuery] = useState('');
  const [system, setSystem] = useState<string>('General');
  const [sketchfab, setSketchfab] = useState<SketchfabState>(INITIAL_SKETCHFAB);
  const [images, setImages] = useState<ImagesState>(INITIAL_IMAGES);
  const [activeModel, setActiveModel] = useState<SketchfabModelResult | null>(null);
  const [activeImage, setActiveImage] = useState<ImageResult | null>(null);
  const [showAllModels, setShowAllModels] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const searching =
    sketchfab.status === 'loading' || images.status === 'loading';

  const runSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) {
      toast.error('Type a topic to search', {
        description: 'e.g. "brachial plexus" or "circle of Willis"',
      });
      return;
    }

    // Reset state, keep query
    setActiveModel(null);
    setActiveImage(null);
    setShowAllModels(false);
    setSketchfab({ status: 'loading', models: [] });
    setImages({ status: 'loading', images: [] });

    // Scroll to results area immediately so the user sees the loading state
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Fire BOTH requests in parallel. We do NOT await them together —
    // each fetch().then() updates its own state slice independently,
    // so whichever resolves first renders immediately.
    //
    // AbortController lets us cancel if the user starts a new search
    // before the previous one finishes.
    const skCtrl = new AbortController();
    const imgCtrl = new AbortController();

    // Sketchfab (fast) — ~1-3s
    fetch('/api/anatomy-discover/sketchfab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, count: 12 }),
      signal: skCtrl.signal,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setSketchfab({
            status: 'error',
            models: [],
            error: data?.error || `HTTP ${res.status}`,
          });
          return;
        }
        setSketchfab({
          status: 'done',
          models: data.models ?? [],
          suggestedModelId: data.suggestedModelId,
        });
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setSketchfab({
          status: 'error',
          models: [],
          error: err instanceof Error ? err.message : 'Network error',
        });
      });

    // Images (slow) — ~15-50s
    fetch('/api/anatomy-discover/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, system, count: 8 }),
      signal: imgCtrl.signal,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setImages({
            status: 'error',
            images: [],
            error: data?.error || `HTTP ${res.status}`,
          });
          return;
        }
        setImages({
          status: 'done',
          images: data.images ?? [],
        });
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setImages({
          status: 'error',
          images: [],
          error: err instanceof Error ? err.message : 'Network error',
        });
      });

    // Note: we don't store the AbortControllers — the next runSearch()
    // call simply replaces state, and any in-flight responses are
    // discarded by React (state updates from stale fetches still land
    // but get overwritten by the new fetches' state updates). For a
    // medical-ed app with infrequent re-searches, this is acceptable.
    // If we wanted true cancellation we'd store the controllers in a
    // ref and abort them in runSearch's preamble.
    void skCtrl;
    void imgCtrl;
  }, [query, system]);

  const handleAutoPick = useCallback(() => {
    if (sketchfab.status !== 'done' || !sketchfab.suggestedModelId) {
      toast.error('No suggested model yet', {
        description:
          sketchfab.status === 'loading'
            ? 'Still searching Sketchfab — give it a few seconds.'
            : 'Run a search first — the AI picks the best model from the results.',
      });
      return;
    }
    const picked = sketchfab.models.find((m) => m.uid === sketchfab.suggestedModelId);
    if (picked) {
      setActiveModel(picked);
      setActiveImage(null);
      toast.success(`AI picked: ${picked.name}`, {
        description: `by ${picked.author} · ${formatCount(picked.likeCount)} likes`,
      });
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [sketchfab]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !searching) {
      e.preventDefault();
      runSearch();
    }
  };

  // ── Visible models: show 6 by default, expand to all on demand ──
  const visibleModels = showAllModels ? sketchfab.models : sketchfab.models.slice(0, 6);

  // ── For "no results" empty state — only show if BOTH sources are done and empty ──
  const bothEmpty =
    sketchfab.status === 'done' &&
    images.status === 'done' &&
    sketchfab.models.length === 0 &&
    images.images.length === 0;

  return (
    <div className="min-w-0 space-y-4 pb-4">
      {/* ── Search Bar ── */}
      <div
        className="rounded-2xl border p-3 sm:p-5"
        style={{
          background: `linear-gradient(135deg, ${alpha(C.cyan, 8)}, ${alpha(C.purple, 8)})`,
          borderColor: alpha(C.cyan, 30),
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})` }}
          >
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold leading-tight" style={{ color: C.text }}>
              AI Anatomy Discovery
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed" style={{ color: C.muted }}>
              Type any topic — the AI agent searches Sketchfab for 3D models and the web for related medical images, all in-app.
            </p>
          </div>
        </div>

        {/* Topic input + system picker + buttons */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_10rem] lg:flex lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: C.muted }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. brachial plexus, circle of Willis, shoulder joint…"
              className="w-full rounded-lg py-2.5 pl-9 pr-3 text-sm"
              style={{
                background: C.bg,
                border: `1px solid ${C.cardBorder}`,
                color: C.text,
                outline: 'none',
              }}
              disabled={searching}
            />
          </div>
          <div className="relative min-w-0">
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              aria-label="Anatomy system"
              className="w-full cursor-pointer appearance-none rounded-lg py-2.5 pl-3 pr-8 text-sm font-medium"
              style={{
                background: C.bg,
                border: `1px solid ${C.cardBorder}`,
                color: C.text,
                outline: 'none',
              }}
              disabled={searching}
            >
              {SYSTEMS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: C.muted }}
            />
          </div>
          <button
            onClick={runSearch}
            disabled={searching}
            className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: C.cyan, color: C.bg }}
          >
            {sketchfab.status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {searching ? 'Searching…' : 'Search'}
          </button>
          <button
            onClick={handleAutoPick}
            disabled={sketchfab.status !== 'done' || !sketchfab.suggestedModelId}
            className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
              color: '#fff',
            }}
            title="AI picks the single best 3D model for your topic and embeds it"
          >
            <Sparkles className="w-4 h-4" />
            AI Auto-pick
          </button>
        </div>

        {/* Quick topic chips */}
        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
          <span className="shrink-0 text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>
            Try:
          </span>
          {QUICK_TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setQuery(t);
              }}
              disabled={searching}
              className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] transition-colors disabled:opacity-50"
              style={{
                borderColor: C.cardBorder,
                color: C.muted,
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = alpha(C.cyan, 40);
                e.currentTarget.style.color = C.cyan;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.cardBorder;
                e.currentTarget.style.color = C.muted;
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Active Model Embed ── */}
      {activeModel && (
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: C.cardSolid,
            borderColor: alpha(C.cyan, 40),
            boxShadow: `0 0 0 1px ${alpha(C.cyan, 20)}, 0 8px 32px ${alpha(C.cyan, 10)}`,
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: C.cardBorder }}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Box className="w-4 h-4 flex-shrink-0" style={{ color: C.cyan }} />
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>
                  {activeModel.name}
                </div>
                <div className="text-[10px]" style={{ color: C.muted }}>
                  by {activeModel.author} · {formatCount(activeModel.likeCount)} likes · {formatCount(activeModel.viewCount)} views
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <a
                href={activeModel.viewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ background: C.card, color: C.muted }}
              >
                <ExternalLink className="w-3 h-3" />
                Sketchfab
              </a>
              <button
                onClick={() => setActiveModel(null)}
                className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ background: C.card, color: C.muted }}
              >
                <X className="w-3 h-3" />
                Close
              </button>
            </div>
          </div>
          <div className="aspect-[4/3] max-h-[560px]" style={{ position: 'relative', background: C.bg }}>
            <iframe
              key={activeModel.uid}
              src={activeModel.embedUrl}
              title={activeModel.name}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              referrerPolicy="origin"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          {activeModel.description && (
            <div
              className="px-4 py-3 text-xs border-t"
              style={{ borderColor: C.cardBorder, color: C.muted }}
            >
              {activeModel.description}
            </div>
          )}
        </div>
      )}

      {/* ── Active Image Lightbox ── */}
      {activeImage && (
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: C.cardSolid,
            borderColor: alpha(C.green, 40),
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: C.cardBorder }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="w-4 h-4 flex-shrink-0" style={{ color: C.green }} />
              <span className="text-sm font-semibold truncate" style={{ color: C.text }}>
                {activeImage.caption || 'Reference image'}
              </span>
              {activeImage.source && (
                <span className="text-[10px]" style={{ color: C.muted }}>
                  · {activeImage.source}
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveImage(null)}
              className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-md"
              style={{ background: C.card, color: C.muted }}
            >
              <X className="w-3 h-3" />
              Close
            </button>
          </div>
          <div className="flex items-center justify-center p-4" style={{ background: C.bg }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.url}
              alt={activeImage.caption || 'anatomy reference'}
              style={{
                maxHeight: 560,
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      )}

      {/* ── Results ── */}
      <div ref={resultsRef}>
        {/* ── Both-empty terminal state ── */}
        {bothEmpty && (
          <div
            className="rounded-2xl p-12 border flex flex-col items-center gap-3"
            style={{ background: C.card, borderColor: C.cardBorder }}
          >
            <AlertTriangle className="w-8 h-8" style={{ color: C.amber }} />
            <p className="text-sm font-semibold" style={{ color: C.text }}>
              No results for &quot;{query}&quot;
            </p>
            <p className="text-xs text-center" style={{ color: C.muted }}>
              Try a more specific topic, or check your network connection. Both Sketchfab and image search may be temporarily unavailable.
            </p>
            <div className="flex gap-3 text-[10px] mt-2">
              {sketchfab.error && (
                <span style={{ color: C.danger }}>Sketchfab: {sketchfab.error}</span>
              )}
              {images.error && (
                <span style={{ color: C.danger }}>Images: {images.error}</span>
              )}
            </div>
          </div>
        )}

        {/* ── 3D Models Grid (renders as soon as Sketchfab returns) ── */}
        {(sketchfab.status === 'loading' ||
          (sketchfab.status === 'done' && sketchfab.models.length > 0)) && (
          <div
            className="rounded-2xl p-4 border mb-4"
            style={{ background: C.card, borderColor: C.cardBorder }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-4 h-4" style={{ color: C.purple }} />
              <span className="text-sm font-semibold" style={{ color: C.text }}>
                3D Models on Sketchfab
              </span>
              {sketchfab.status === 'done' && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: alpha(C.purple, 15), color: C.purple }}
                >
                  {sketchfab.models.length} found
                </span>
              )}
              {sketchfab.status === 'loading' && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1"
                  style={{ background: alpha(C.purple, 15), color: C.purple }}
                >
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  searching…
                </span>
              )}
              {sketchfab.status === 'done' && sketchfab.suggestedModelId && (
                <button
                  onClick={handleAutoPick}
                  className="ml-auto text-[10px] flex items-center gap-1 px-2 py-1 rounded-md font-semibold"
                  style={{
                    background: alpha(C.purple, 15),
                    color: C.purple,
                    border: `1px solid ${alpha(C.purple, 30)}`,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Pick best for me
                </button>
              )}
            </div>

            {sketchfab.status === 'loading' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border"
                    style={{
                      background: C.cardSolid,
                      borderColor: C.cardBorder,
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  >
                    <div style={{ aspectRatio: '4 / 3', background: C.bg }} />
                    <div className="p-2.5 space-y-1.5">
                      <div className="h-2 rounded" style={{ background: C.cardBorder }} />
                      <div
                        className="h-2 rounded w-2/3"
                        style={{ background: C.cardBorder }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {visibleModels.map((m) => {
                    const isActive = activeModel?.uid === m.uid;
                    const isSuggested = m.uid === sketchfab.suggestedModelId;
                    return (
                      <button
                        key={m.uid}
                        onClick={() => {
                          setActiveModel(m);
                          setActiveImage(null);
                        }}
                        className="text-left rounded-xl overflow-hidden border transition-all"
                        style={{
                          background: C.cardSolid,
                          borderColor: isActive
                            ? alpha(C.cyan, 80)
                            : isSuggested
                              ? alpha(C.purple, 60)
                              : C.cardBorder,
                          boxShadow: isActive
                            ? `0 0 0 1px ${alpha(C.cyan, 40)}`
                            : isSuggested
                              ? `0 0 0 1px ${alpha(C.purple, 30)}`
                              : 'none',
                        }}
                      >
                        <div
                          className="relative"
                          style={{
                            aspectRatio: '4 / 3',
                            background: C.bg,
                            backgroundImage: m.thumbnailUrl
                              ? `url(${m.thumbnailUrl})`
                              : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          {!m.thumbnailUrl && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Box className="w-8 h-8" style={{ color: C.muted }} />
                            </div>
                          )}
                          {isSuggested && (
                            <div
                              className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1"
                              style={{
                                background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
                                color: '#fff',
                              }}
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              AI PICK
                            </div>
                          )}
                          {isActive && (
                            <div
                              className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1"
                              style={{ background: C.cyan, color: C.bg }}
                            >
                              <Eye className="w-2.5 h-2.5" />
                              VIEWING
                            </div>
                          )}
                        </div>
                        <div className="p-2.5">
                          <div
                            className="text-[11px] font-semibold leading-tight line-clamp-2 mb-1"
                            style={{ color: C.text }}
                          >
                            {m.name}
                          </div>
                          <div
                            className="flex items-center gap-2 text-[9px]"
                            style={{ color: C.muted }}
                          >
                            <span className="truncate flex-1">by {m.author}</span>
                            <span className="flex items-center gap-0.5 flex-shrink-0">
                              <Heart className="w-2.5 h-2.5" />
                              {formatCount(m.likeCount)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {sketchfab.models.length > 6 && (
                  <button
                    onClick={() => setShowAllModels(!showAllModels)}
                    className="mt-3 mx-auto text-xs flex items-center gap-1 px-3 py-1.5 rounded-md"
                    style={{
                      background: 'transparent',
                      color: C.cyan,
                      border: `1px solid ${alpha(C.cyan, 30)}`,
                    }}
                  >
                    {showAllModels
                      ? 'Show fewer'
                      : `Show all ${sketchfab.models.length} models`}
                    <ChevronDown
                      className="w-3 h-3"
                      style={{ transform: showAllModels ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Sketchfab error (non-fatal) ── */}
        {sketchfab.status === 'error' && (
          <div
            className="rounded-2xl p-4 border mb-4 flex items-start gap-2"
            style={{
              background: alpha(C.danger, 8),
              borderColor: alpha(C.danger, 30),
            }}
          >
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: C.danger }} />
            <div className="text-xs" style={{ color: C.text }}>
              <div className="font-semibold mb-0.5">Sketchfab search failed</div>
              <div style={{ color: C.muted }}>
                {sketchfab.error}. You can still try the image search below, or use the Web 3D tab to paste a Sketchfab URL manually.
              </div>
            </div>
          </div>
        )}

        {/* ── Images Grid (renders as soon as image search returns) ── */}
        {(images.status === 'loading' ||
          (images.status === 'done' && images.images.length > 0)) && (
          <div
            className="rounded-2xl p-4 border"
            style={{ background: C.card, borderColor: C.cardBorder }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4" style={{ color: C.green }} />
              <span className="text-sm font-semibold" style={{ color: C.text }}>
                Related Medical Images
              </span>
              {images.status === 'done' && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: alpha(C.green, 15), color: C.green }}
                >
                  {images.images.length} found
                </span>
              )}
              {images.status === 'loading' && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1"
                  style={{ background: alpha(C.green, 15), color: C.green }}
                >
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  searching the web…
                </span>
              )}
              <span className="ml-auto text-[10px]" style={{ color: C.muted }}>
                {images.status === 'loading'
                  ? 'this takes ~15-50s — 3D models above load faster'
                  : 'Click to enlarge'}
              </span>
            </div>

            {images.status === 'loading' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border"
                    style={{
                      background: C.cardSolid,
                      borderColor: C.cardBorder,
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  >
                    <div style={{ aspectRatio: '4 / 3', background: C.bg }} />
                    <div className="p-2">
                      <div className="h-2 rounded" style={{ background: C.cardBorder }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.images.map((img, i) => {
                  const isActive = activeImage?.url === img.url;
                  return (
                    <button
                      key={`${img.url}-${i}`}
                      onClick={() => {
                        setActiveImage(img);
                        setActiveModel(null);
                      }}
                      className="text-left rounded-xl overflow-hidden border transition-all"
                      style={{
                        background: C.cardSolid,
                        borderColor: isActive ? alpha(C.green, 80) : C.cardBorder,
                      }}
                    >
                      <div
                        className="relative"
                        style={{
                          aspectRatio: '4 / 3',
                          background: C.bg,
                          backgroundImage: `url(${img.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="p-2">
                        <div
                          className="text-[10px] leading-tight line-clamp-2"
                          style={{ color: C.muted }}
                        >
                          {img.caption || img.source || 'Reference image'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Images error (non-fatal) ── */}
        {images.status === 'error' && (
          <div
            className="rounded-2xl p-4 border flex items-start gap-2"
            style={{
              background: alpha(C.danger, 8),
              borderColor: alpha(C.danger, 30),
            }}
          >
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: C.danger }} />
            <div className="text-xs" style={{ color: C.text }}>
              <div className="font-semibold mb-0.5">Image search failed</div>
              <div style={{ color: C.muted }}>
                {images.error}. 3D models above (if any) are unaffected.
              </div>
            </div>
          </div>
        )}

        {/* ── Reset / new search ── */}
        {(sketchfab.status === 'done' || images.status === 'done') && !searching && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setSketchfab(INITIAL_SKETCHFAB);
                setImages(INITIAL_IMAGES);
                setActiveModel(null);
                setActiveImage(null);
                setShowAllModels(false);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-md"
              style={{
                background: C.card,
                color: C.muted,
                border: `1px solid ${C.cardBorder}`,
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Start a new search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
