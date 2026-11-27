'use client';

// ─────────────────────────────────────────────────────────────────────────────
// AgentMarkdown — rich markdown renderer for floating-assistant responses.
//
// Replaces the old `renderSimpleMarkdown` (which only handled bold/italic/
// inline-code/images) with a full react-markdown + remark-gfm pipeline so the
// agent's responses render properly: headings with accent bars, bullet and
// numbered lists, GFM tables, task-list checkboxes, "clinical pearl" callout
// blockquotes, fenced code blocks with a language header + copy button,
// styled links, captioned images and gradient dividers.
//
// Everything is tuned for the compact dark MedQ agent panel (12px body text,
// mint #00e5a0 / violet #8b5cf6 / blue #4fc3f7 accents on ~#0b0e1a).
// The renderer is streaming-safe: react-markdown gracefully renders partial
// (still-being-streamed) markdown without crashing on unterminated constructs.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useRef, useState } from 'react';
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy, ExternalLink, BookOpen, FileAudio, FileDown, FileSpreadsheet, FileText, Gauge, Globe, Presentation } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { KnowledgeCitation, WebCitation } from './useAgentV2Stream';

// ── Artifact links (documents, decks, sheets, audio) ──────────────────────────

/**
 * ArtifactLink — inline preview card for artifact URLs the agent embeds in
 * its answers. Previously these rendered as plain external links that just
 * downloaded a file; now the learner can open the artifact WITHOUT leaving
 * the conversation:
 *   • audio (.wav/.mp3)      → inline player, always visible
 *   • PDF                    → lazy iframe preview (browsers render natively)
 *   • DOCX / PPTX / XLSX     → lazy iframe preview through the existing
 *                             /api/medq-agent/artifacts/[id]/pdf conversion
 *                             route (headless LibreOffice, cached server-side)
 *   • anything else          → compact download card with a type icon
 */
function ArtifactLink({ href, children }: { href: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const label = typeof children === 'string' && children.trim() ? children : 'Download artifact';

  const isAudio = /\.(wav|mp3|ogg|m4a)(\?|#|$)/i.test(href);
  const isPdf = /\.pdf(\?|#|$)/i.test(href) || /\/pdf(\?|#|$)/i.test(href);
  const artifactId = /\/api\/medq-agent\/artifacts\/([^/?#]+)/.exec(href)?.[1];
  const isOffice = Boolean(artifactId) && !isPdf && !isAudio;

  // Office documents preview through the on-demand PDF conversion route;
  // PDFs embed directly. Both load lazily — the iframe (and its server-side
  // LibreOffice conversion) only fires when the learner taps Preview.
  const previewSrc = isOffice && artifactId ? `/api/medq-agent/artifacts/${artifactId}/pdf` : href;

  const icon = isAudio ? <FileAudio className="h-3.5 w-3.5 shrink-0 text-[#4fc3f7]" />
    : isPdf ? <FileText className="h-3.5 w-3.5 shrink-0 text-[#ff5757]" />
    : /presentation|\.pptx/i.test(href + label) ? <Presentation className="h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />
    : /sheet|\.xlsx|spreadsheet/i.test(href + label) ? <FileSpreadsheet className="h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" />
    : <FileDown className="h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />;

  return (
    <span className="my-1.5 block">
      <div
        className="flex items-center gap-2 rounded-xl px-2.5 py-2"
        style={{ background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.18)' }}
      >
        {icon}
        <span className="min-w-0 flex-1 truncate text-[11px] text-[#e8ecf4]" title={label}>{label}</span>
        {(isPdf || isOffice) && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-medium"
            style={{
              background: open ? 'rgba(0,229,160,0.18)' : 'rgba(0,229,160,0.1)',
              color: '#00e5a0',
            }}
          >
            {open ? 'Hide' : 'Preview'}
          </button>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg px-2 py-1 text-[10px] text-[#9ca3b8] hover:text-[#e8ecf4]"
          title="Open / download"
        >
          Open
        </a>
      </div>
      {isAudio && (
        <audio controls preload="none" src={href} className="mt-1.5 w-full" style={{ height: 34 }} />
      )}
      {open && (isPdf || isOffice) && (
        <iframe
          src={previewSrc}
          title={`${label} preview`}
          className="mt-1.5 w-full rounded-xl"
          style={{ height: 360, border: '1px solid rgba(0,229,160,0.18)', background: '#fff' }}
        />
      )}
    </span>
  );
}

/** True when a markdown link points at a MedQ agent artifact (binary file in
 *  public/generated or a /api/medq-agent/artifacts/... download URL). */
function isArtifactUrl(href: string): boolean {
  return /\/api\/medq-agent\/artifacts\//.test(href) || /\/generated\/artifact-/.test(href);
}

// ── Knowledge citation chips ([K#]) ─────────────────────────────────────────

/**
 * CitationChip — inline [K1]-style reference rendered as a mint pill that
 * opens a hover-card (desktop hover / tap on mobile) showing the source
 * document title, relevance and the retrieved passage excerpt.
 */
function CitationChip({ citeRef, citation }: { citeRef: string; citation?: KnowledgeCitation }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  if (!citation) {
    // Citation metadata wasn't captured (e.g. older message) — render a
    // neutral non-interactive marker so the text still reads naturally.
    return (
      <span
        className="mx-0.5 inline-flex items-center rounded px-1 py-[1px] align-baseline font-mono text-[9px] font-bold"
        style={{ background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.2)', color: '#4fc3f7' }}
        title="Knowledge library citation"
      >
        {citeRef}
      </span>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          onFocus={openNow}
          onClick={() => setOpen((v) => !v)}
          className="mx-0.5 inline-flex items-center gap-0.5 rounded px-1 py-[1px] align-baseline font-mono text-[9px] font-bold transition-colors"
          style={{
            background: 'rgba(0,229,160,0.12)',
            border: '1px solid rgba(0,229,160,0.3)',
            color: '#00e5a0',
            cursor: 'help',
          }}
          aria-label={`Citation ${citeRef}: ${citation.title}`}
        >
          <BookOpen className="h-2 w-2" />
          {citeRef}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="w-72 rounded-xl border border-[#00e5a0]/25 bg-[#0d1120] p-0 text-[#e8ecf4] shadow-xl"
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
      >
        <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 shrink-0 text-[#00e5a0]" />
            <span className="truncate text-[11px] font-semibold text-[#e8ecf4]">{citation.title || 'Knowledge library'}</span>
          </div>
          {citation.relevance != null && (
            <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[#9ca3b8]">
              <Gauge className="h-2.5 w-2.5 text-[#4fc3f7]" />
              <span>
                relevance <span className="font-bold text-[#4fc3f7]">{citation.relevance}%</span>
              </span>
              <span className="ml-auto text-[8px] uppercase tracking-wider text-[#5a6478]">your library</span>
            </div>
          )}
        </div>
        {citation.excerpt && (
          <div className="max-h-40 overflow-y-auto px-3 py-2">
            <p className="text-[10px] leading-[1.55] text-[#cdd5e3]">“{citation.excerpt}”</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

/** Web citation chip ([S#]) — a clickable amber pill that opens the source
 *  URL in a new tab. Deliberately Radix-free: the native title tooltip
 *  previews title/host/snippet, and a plain anchor keeps middle-click /
 *  copy-link working (unlike a popover trigger, which fights navigation). */
function WebCitationChip({ citeRef, citation }: { citeRef: string; citation?: WebCitation }) {
  if (!citation) {
    return (
      <span
        className="mx-0.5 inline-flex items-center rounded px-1 py-[1px] align-baseline font-mono text-[9px] font-bold"
        style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24' }}
        title="Web source citation"
      >
        {citeRef}
      </span>
    );
  }
  const tip = [
    citation.title,
    citation.host,
    citation.date,
    citation.snippet ? citation.snippet.slice(0, 160) : undefined,
  ]
    .filter(Boolean)
    .join('\n');
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-0.5 inline-flex items-center gap-0.5 rounded px-1 py-[1px] align-baseline font-mono text-[9px] font-bold no-underline"
      style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24' }}
      title={tip}
      aria-label={`Web source ${citeRef}: ${citation.title}`}
    >
      <Globe className="h-2.5 w-2.5" />
      {citeRef}
    </a>
  );
}

// ── Inline citation tokens → markdown links ───────────────────────────────
// react-markdown v10 has NO `text` component override — a `text:` key in
// `components` is silently ignored, so an earlier attempt to intercept text
// nodes for [K#]/[S#] chips NEVER fired (markers stayed literal text).
// Instead we PREPROCESS the markdown so each token becomes a real link the
// `a` component override can recognize and swap for a chip:
//   [K1] → [K1](medq-cite:K1)   → knowledge CitationChip (hover-card)
//   [S1] → [S1](<source url>)  → clickable WebCitationChip
// Fenced code blocks are skipped; tokens already followed by "(" are left
// alone (the model may have written a real link itself).

function encodeLinkUrl(url: string): string {
  // Markdown link targets break on raw parentheses (wikipedia-style URLs).
  return url.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

/** react-markdown's defaultUrlTransform whitelists only web protocols
 *  (http/https/mailto/…) and BLANKS everything else — including our
 *  `medq-cite:K1` citation scheme, which silently killed the chips and
 *  rendered them as dead styled anchors. Allow medq-cite through. */
const urlTransform = (url: string): string =>
  url.startsWith('medq-cite:') ? url : defaultUrlTransform(url);

function preprocessCitations(text: string, citations?: KnowledgeCitation[], webCitations?: WebCitation[]): string {
  if (!/\[[KS]\d+/i.test(text) && !/\bK\d{1,2}\b/.test(text)) return text;
  const byK = new Map((citations ?? []).map((c) => [c.ref, c]));
  const byS = new Map((webCitations ?? []).map((c) => [c.ref, c]));

  // Pass 1 — group lines into fenced / non-fenced segments so code blocks are
  // never touched, while non-fenced text is processed as ONE chunk (models
  // emit multi-ref brackets that WRAP LINES — "[K1\n, K2]" — and repeat the
  // kind letter per ref — "[K1, K3]"; per-line processing would mangle both).
  const groups: Array<{ fence: boolean; lines: string[] }> = [];
  let fence = false;
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      const last = groups[groups.length - 1];
      if (!fence) {
        groups.push({ fence: true, lines: [line] });
        fence = true;
      } else {
        if (last && last.fence) last.lines.push(line);
        fence = false;
      }
      continue;
    }
    const last = groups[groups.length - 1];
    if (last && last.fence === fence) last.lines.push(line);
    else groups.push({ fence, lines: [line] });
  }

  const out: string[] = [];
  for (const group of groups) {
    if (group.fence) {
      out.push(...group.lines);
      continue;
    }
    let chunk = group.lines.join('\n');
    // Pass 2 — expand multi-ref brackets to one bracket per ref.
    chunk = chunk.replace(
      /\[([KS])((?:\s*[KS]?\d+(?:\s*,\s*[KS]?\d+)*\s*)+)\]/gi,
      (_m: string, kind: string, nums: string) =>
        nums
          .split(',')
          .map((n) => {
            const t = n.trim();
            const m = /^([KS])?(\d+)$/i.exec(t);
            const k = (m?.[1] ?? kind).toUpperCase();
            return `[${k}${m?.[2]}]`;
          })
          .join(' '),
    );
    // Pass 3 — per-line conversions. ORDER MATTERS: the bare-K pass MUST run
    // BEFORE the bracketed→link pass — the other way round it re-matches the
    // "K1" inside the just-created "(medq-cite:K1)" href and nests links,
    // which micromark percent-encodes into "%5BK1%5D(…)" garbage chips.
    chunk = chunk
      .split('\n')
      .map((line) => {
        let l = line;
        // Bare "K1" at sentence end ("…volume load K1.") — chip it too, but
        // ONLY when the ref exists in this turn's citations AND it isn't the
        // tail of "vitamin K1" / "vit K1". Mid-sentence bare refs and bare S#
        // are left alone: "S1" is a heart sound, mid-line bare K# is usually
        // vitamin K1. Pre-char excludes "[" (bracketed ref) and "]" (prior ref).
        if (byK.size > 0) {
          l = l.replace(
            /(^|[^\w[\]])(K\d{1,2})(?=[.,;:!)]|$)/g,
            (m: string, pre: string, ref: string, offset: number, full: string) => {
              if (!byK.has(ref)) return m;
              const before = full.slice(0, offset).toLowerCase();
              if (/(vitamin|phytonadione|vit\.?)\s*$/.test(before)) return m;
              return `${pre}[${ref}](medq-cite:${ref})`;
            },
          );
        }
        l = l.replace(/\[K(\d+)\](?!\()/g, (_m, n: string) => `[K${n}](medq-cite:K${n})`);
        if (byS.size > 0) {
          l = l.replace(/\[S(\d+)\](?!\()/g, (m, n: string) => {
            const c = byS.get(`S${n}`);
            return c ? `[S${n}](${encodeLinkUrl(c.url)})` : m;
          });
        }
        return l;
      })
      .join('\n');
    out.push(chunk);
  }
  return out.join('\n');
}

/** Flatten React children to plain text (to recognize chip-links by label). */
function nodeText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (React.isValidElement(node)) {
    return nodeText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

// ── Code block helpers ──────────────────────────────────────────────────────

/** Extract the language tag and raw text from a <pre><code>…</code></pre> subtree. */
function extractCodeInfo(children: React.ReactNode): { language: string; text: string } {
  let language = '';
  let text = '';
  const visit = (node: React.ReactNode): void => {
    if (node == null || typeof node === 'boolean') return;
    if (typeof node === 'string' || typeof node === 'number') {
      text += String(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (React.isValidElement(node)) {
      const props = node.props as { className?: string; children?: React.ReactNode };
      const match = /language-([\w+-]+)/.exec(props.className ?? '');
      if (match) language = match[1];
      visit(props.children);
    }
  };
  visit(children);
  return { language, text };
}

function CodeBlock({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const { language, text } = extractCodeInfo(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div
      className="my-2 overflow-hidden rounded-xl"
      style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(4,8,18,0.55)' }}
    >
      <div
        className="flex items-center justify-between px-2.5 py-1"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9ca3b8]">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium text-[#9ca3b8] transition-colors hover:bg-white/10 hover:text-[#e8ecf4]"
          title="Copy code"
        >
          {copied ? <Check className="h-2.5 w-2.5 text-[#00e5a0]" /> : <Copy className="h-2.5 w-2.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-2.5 font-mono text-[11px] leading-relaxed text-[#d7e0ee]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ── Component mapping (module-level so it is never re-created per render) ──

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-3 mb-1.5 text-[15px] leading-snug font-bold text-[#e8ecf4] first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2
      className="mt-3 mb-1.5 pl-2 text-[13.5px] leading-snug font-semibold text-[#e8ecf4] first:mt-0"
      style={{ borderLeft: '2px solid rgba(0,229,160,0.65)' }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-2.5 mb-1 text-[12.5px] leading-snug font-semibold text-[#00e5a0] first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-2 mb-1 text-[11px] font-semibold tracking-wide text-[#9ca3b8] uppercase first:mt-0">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="mt-2 mb-1 text-[11px] font-semibold tracking-wide text-[#9ca3b8] uppercase first:mt-0">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="mt-2 mb-1 text-[11px] font-semibold tracking-wide text-[#9ca3b8] uppercase first:mt-0">{children}</h6>
  ),
  p: ({ children }) => <p className="mb-2 text-[12px] leading-[1.65] text-[#e8ecf4] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="text-[#d7e0ee] italic">{children}</em>,
  del: ({ children }) => <del className="text-[#9ca3b8] line-through">{children}</del>,

  ul: ({ className, children }) => {
    const isTaskList = (className ?? '').includes('contains-task-list');
    return isTaskList ? (
      <ul className="my-1.5 list-none space-y-1 pl-1">{children}</ul>
    ) : (
      <ul className="my-1.5 list-disc space-y-1 pl-4 marker:text-[#00e5a0]">{children}</ul>
    );
  },
  ol: ({ children }) => (
    <ol className="my-1.5 list-decimal space-y-1 pl-4 marker:font-semibold marker:text-[#8b5cf6]">{children}</ol>
  ),
  li: ({ children }) => <li className="text-[12px] leading-[1.6] text-[#e8ecf4] [&>p]:m-0">{children}</li>,
  input: ({ checked, disabled }) => (
    <input
      type="checkbox"
      checked={checked ?? false}
      disabled={disabled ?? true}
      readOnly
      className="mr-1.5 align-middle accent-[#00e5a0]"
    />
  ),

  blockquote: ({ children }) => (
    <blockquote
      className="my-2 rounded-lg px-3 py-2 text-[11.5px] leading-relaxed text-[#cdd5e3] italic"
      style={{
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.16)',
        borderLeft: '3px solid rgba(139,92,246,0.65)',
      }}
    >
      {children}
    </blockquote>
  ),

  a: ({ children, href }) => {
    const url = href ?? '';
    // Artifact links become inline preview cards (audio player / lazy PDF
    // iframe / download card) so learners never leave the conversation.
    if (isArtifactUrl(url)) {
      return <ArtifactLink href={url}>{children}</ArtifactLink>;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-w-0 items-center gap-0.5 rounded-sm text-[#00e5a0] underline decoration-[#00e5a0]/40 underline-offset-2 transition-colors hover:decoration-[#00e5a0] break-all"
      >
        {children}
        <ExternalLink className="h-3 w-3 -mt-0.5 shrink-0 opacity-70" />
      </a>
    );
  },

  img: ({ src, alt }) => (
    <span className="my-2 block">
      <img
        src={src ?? ''}
        alt={alt ?? ''}
        className="max-w-full rounded-xl"
        style={{ maxHeight: 260, objectFit: 'contain', border: '1px solid rgba(0,229,160,0.25)' }}
        loading="lazy"
      />
      {alt ? <span className="mt-1 block text-center text-[9.5px] text-[#9ca3b8] italic">{alt}</span> : null}
    </span>
  ),

  hr: () => (
    <hr
      className="my-3 h-px border-0"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(0,229,160,0.5), rgba(139,92,246,0.5), transparent)',
      }}
    />
  ),

  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) => {
    if ((className ?? '').includes('language-')) {
      return <code className="font-mono text-[11px] leading-relaxed text-[#d7e0ee]">{children}</code>;
    }
    return (
      <code
        className="rounded-md px-1.5 py-0.5 font-mono text-[10.5px] text-[#00e5a0]"
        style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.15)' }}
      >
        {children}
      </code>
    );
  },

  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full border-collapse text-[11px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead style={{ background: 'rgba(0,229,160,0.06)' }}>{children}</thead>,
  th: ({ children }) => (
    <th
      className="px-2 py-1.5 text-left font-semibold whitespace-nowrap text-[#00e5a0]"
      style={{ borderBottom: '1px solid rgba(0,229,160,0.25)' }}
    >
      {children}
    </th>
  ),
  tr: ({ children }) => <tr className="even:bg-white/[0.02]">{children}</tr>,
  td: ({ children }) => (
    <td className="px-2 py-1.5 align-top text-[#cdd5e3]" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {children}
    </td>
  ),
};

// ── Exported components ─────────────────────────────────────────────────────

/** Glowing gradient caret shown while the response streams in. */
export function StreamingCaret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] rounded-[2px]"
      style={{
        background: 'linear-gradient(180deg, #00e5a0, #8b5cf6)',
        boxShadow: '0 0 8px rgba(0,229,160,0.6)',
        animation: 'agentCaretBlink 1s ease-in-out infinite',
      }}
    />
  );
}

/**
 * Render agent response text as rich markdown.
 * @param text      the (possibly still-streaming) markdown text
 * @param streaming when true, appends the animated caret after the content
 * @param citations knowledge-library citations ([K#]) collected during the
 *                  turn — [K1]/[K2] tokens in the text render as hoverable
 *                  chips showing the source document + passage
 * @param webCitations web citations ([S#]) from search_medical_references —
 *                  [S1]/[S2] tokens render as clickable amber source chips
 */
export function AgentMarkdown({
  text,
  streaming = false,
  citations,
  webCitations,
}: {
  text: string;
  streaming?: boolean;
  citations?: KnowledgeCitation[];
  webCitations?: WebCitation[];
}) {
  // [K#]/[S#] tokens → markdown links; the `a` override below swaps those
  // links back into chips. (react-markdown v10 ignores a `text` override —
  // link interception is the only reliable hook for inline chips.)
  const processed = useMemo(() => preprocessCitations(text, citations, webCitations), [text, citations, webCitations]);
  // Tokens without metadata still need the `a` override (neutral chips), else
  // `medq-cite:` links would render as dead styled anchors.
  const hasTokens = /\[[KS]\d+\]/.test(text) || /medq-cite:/.test(processed);
  const components = useMemo<Components>(() => {
    const hasK = Boolean(citations && citations.length > 0);
    const hasS = Boolean(webCitations && webCitations.length > 0);
    if (!hasK && !hasS && !hasTokens) return mdComponents;
    const byK = new Map((citations ?? []).map((c) => [c.ref, c]));
    const byS = new Map((webCitations ?? []).map((c) => [c.ref, c]));
    const DefaultAnchor = mdComponents.a as React.ComponentType<{
      children?: React.ReactNode;
      href?: string;
    }>;
    return {
      ...mdComponents,
      a: ({ children, href }) => {
        if (typeof href === 'string' && href.startsWith('medq-cite:')) {
          const ref = href.slice('medq-cite:'.length);
          return <CitationChip citeRef={ref} citation={byK.get(ref)} />;
        }
        const label = nodeText(children).trim();
        if (typeof href === 'string' && /^S\d+$/.test(label) && byS.has(label)) {
          return <WebCitationChip citeRef={label} citation={byS.get(label)} />;
        }
        return <DefaultAnchor href={href}>{children}</DefaultAnchor>;
      },
    };
  }, [citations, webCitations, hasTokens]);

  return (
    <div className="agent-md break-words">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} urlTransform={urlTransform}>
        {processed}
      </ReactMarkdown>
      {streaming ? <StreamingCaret /> : null}
    </div>
  );
}

export default AgentMarkdown;
