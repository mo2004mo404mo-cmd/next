/**
 * knowledge/text-quality.ts — text normalization + boundary-safe chunking.
 *
 * WHY THIS MODULE EXISTS (measured failure modes on real library files):
 *   - A 436 KB medical-textbook PDF extracts with **3,049 letter-\n-letter
 *     soft line wraps** and line-end hyphenation ("dys-\npnea"); the old
 *     chunker treated a whole page as ONE paragraph and hard-split it with
 *     `paragraph.slice(i, i + 900)` at a 750-char stride — cutting WORDS in
 *     half at chunk boundaries. Those cuts then surfaced everywhere: citation
 *     quotes, the extracted-content viewer, and the [K#] context the LLM
 *     reads (so generated questions quoted half-sentences).
 *   - `content.slice(0, N)` excerpting (citations 400, excerpts 700, K-context
 *     800/900, rerank previews 850) chopped mid-sentence.
 *
 * WHAT THIS MODULE GUARANTEES:
 *   1. normalizeExtractedText — for machine-extracted text only (PDF / DOCX /
 *      PPTX / EPUB / URL): de-hyphenates line-end hyphens, converts soft line
 *      wraps to spaces (long unpunctuated body lines only — headings, bullets
 *      and list items keep their line structure), cleans invisible characters.
 *      NEVER applied to user-authored text (pasted text, TXT/MD/CODE/CSV).
 *   2. chunkTextQuality — paragraphs accumulate as before; oversized
 *      paragraphs are split into SENTENCES (abbreviation-aware splitter),
 *      sentences are packed up to `size`, with sentence/word-aligned overlap
 *      between consecutive pieces. A word is never cut in half; a sentence is
 *      never left half-finished at a chunk boundary when punctuation exists.
 *   3. trimToSentence — excerpt trimming that lands on a sentence terminator
 *      (or, failing that, a word boundary + ellipsis) instead of an arbitrary
 *      character offset.
 */

// ─── Chunking defaults (kept identical to the previous pipeline values) ────

export const DEFAULT_CHUNK_SIZE = 900;
export const DEFAULT_CHUNK_OVERLAP = 150;

// ─── 1. Extraction normalization ───────────────────────────────────────────

/** Compound particles whose line-end hyphen is REAL, not a soft hyphenation.
 *  "Person-to-\nperson" keeps its hyphen; "dys-\npnea" is re-joined. */
const HYPHEN_PARTICLES = new Set([
  'to', 'of', 'in', 'on', 'and', 'or', 'up', 'out', 'by', 'for', 'non', 'pre',
  'post', 'anti', 'self', 'counter', 'cross', 'over', 'under', 'semi', 'pseudo',
  'half', 'well', 'wide', 'open', 'full', 'high', 'low', 'new', 'old', 'long',
  'short', 'free', 'fat', 'feed', 'back', 'ground', 'water', 'birth', 'side',
]);

/** Line length under which a line is treated as structural (heading, bullet,
 *  list item, table row) rather than a soft-wrapped body line. */
const SOFT_WRAP_MIN_LINE = 50;

/** A bare numeric line (1-4 digits, optionally "Page N") — PDF page footers
 *  and headers extract as standalone lines glued into the text flow
 *  ("…early diagnosis\nmatters\n35\nS Clarifications…"). They fake paragraph
 *  boundaries mid-sentence and weld page numbers onto the next page's
 *  heading, so they are removed during normalization. */
const PAGE_NUMBER_LINE = /^(?:page\s*)?\d{1,4}$/i;

/** List / section markers that ALWAYS begin a structural line (bullet,
 *  numbered item, lettered item, section number like "3.4 "). */
const STRUCTURAL_MARKER =
  /^(?:[•●▪‣◦·]\s*|[-–—*]\s+|\d{1,2}[.)]\s+|[a-zA-Z][.)]\s+|\d{1,3}\s*[—–-]\s+[A-Z]|\d+(?:\.\d+)+\s+[A-Z])/;

/** Small words allowed inside a Title-Case heading. */
const HEADING_SMALL_WORDS = new Set([
  'of', 'and', 'the', 'in', 'to', 'a', 'an', 'for', 'on', 'with', 'as', 'by',
  'or', 'at', 'vs', 'from', 'into', 'not', 'no', 'is', 'are', '&',
]);

/**
 * Title-Case / ALL-CAPS heading detector ("S Clarifications Note — Follow-up
 * Cadence Confirmed", "Four Pillars Confirmed", "TAILORED TREATMENT"): short,
 * no terminal punctuation, and most words start uppercase. Prose sentences
 * virtually never satisfy this (their words are mostly lowercase).
 */
export function isHeadingLine(line: string): boolean {
  if (line.length < 8 || line.length > 90) return false;
  if (/[.!?,;:)\]]$/.test(line)) return false;
  // Citation fragments ("JT. Pediatr Rev. 2008.)", "Clinical Guideline, 2010.)")
  // are continuations, not headings.
  if (/\b(?:et al\b|19\d\d|20\d\d)/.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  let capped = 0;
  let wordChars = 0;
  for (const w of words) {
    const clean = w.replace(/[^\p{L}\p{N}]/gu, '');
    if (!clean) continue;
    wordChars++;
    if (/^[A-Z0-9(↓↑→]/u.test(clean) || HEADING_SMALL_WORDS.has(clean.toLowerCase())) capped++;
  }
  if (wordChars < 2) return false;
  return capped / wordChars >= 0.7;
}

/** A line that starts a structural unit (list item / section heading). */
export function isStructuralLine(line: string): boolean {
  return STRUCTURAL_MARKER.test(line) || isHeadingLine(line);
}

/**
 * Clean machine-extracted text (PDF/DOCX/PPTX/EPUB/URL). Returns text whose
 * sentences flow on single lines, hyphenation artifacts are repaired, and
 * paragraph structure (\n\n) is preserved.
 */
export function normalizeExtractedText(text: string): string {
  if (!text) return '';
  let t = text
    .replace(/\r\n?/g, '\n')
    .replace(/\u00ad/g, '') // soft hyphen
    .replace(/[\u200b\u200e\u200f\ufeff]/g, '') // zero-width / BOM
    .replace(/\u00a0/g, ' '); // nbsp

  // 1) Line-end hyphenation: "dys-\npnea" → "dyspnea" (lowercase-lowercase,
  //    prefix not a compound particle). Other hyphen-newline pairs
  //    ("non-\nHodgkin", "IL-\n2") keep the hyphen and just drop the break.
  t = t.replace(/([a-z]{2,})-\n([a-z])/g, (match, before: string, after: string) => {
    if (HYPHEN_PARTICLES.has(before)) return `${before}-${after}`;
    return `${before}${after}`;
  });
  t = t.replace(/-\n(?=[A-Za-z0-9])/g, '-');

  // 1.5) Drop standalone page-number lines (footers/headers). Measured on the
  //      pediatric textbook: the footer number between a page's last sentence
  //      and the next page's continuation is what turned a flowing sentence
  //      into a fake structural boundary (the "18 Hyperendemicity…" glue and
  //      the mid-sentence "…matters / 35 / S Clarifications…" noise).
  t = t
    .split('\n')
    .filter((line) => !PAGE_NUMBER_LINE.test(line.trim()))
    .join('\n');

  // 2) Soft line wraps → spaces, structural lines → paragraph breaks.
  //    THREE rules:
  //    (a) a next line starting with a LOWERCASE letter is virtually always a
  //        wrapped continuation — whatever the current line's length. Bullet
  //        and list items wrap short ("• …to prevent\nrecurrence"), so the old
  //        length-only heuristic left their continuations on separate lines
  //        and the sentence-aware chunker then tore them apart.
  //    (b) a long unpunctuated body line followed by a word-ish character is
  //        the classic soft wrap (original rule).
  //    (c) STRUCTURAL lines (bullets "• …", numbered items, section numbers
  //        "3.4 …", Title-Case headings like "S Clarifications Note — …")
  //        ALWAYS start their own paragraph. Measured root cause of the
  //        remaining mid-sentence cuts: pages without blank lines extract as
  //        ONE mega-paragraph, and a bullet block or sidebar note without
  //        periods forms a "sentence" far over the chunk budget — the word-
  //        boundary fallback then cut chunks mid-sentence with a confusing
  //        duplicated overlap head. Fragmenting at real structural boundaries
  //        keeps every chunk a set of COMPLETE list items / notes / sentences.
  //    Each line carries its OWN terminator so joined continuations get a
  //    space (never a newline) and blank lines still produce \n\n paragraphs.
  const lines = t.split('\n');
  const rebuilt: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      rebuilt.push('\n'); // blank line → paragraph separator
      continue;
    }
    const next = i + 1 < lines.length ? lines[i + 1].trim() : '';
    const structural = isStructuralLine(line);
    const isSoftWrap =
      next.length > 0 &&
      !isStructuralLine(next) &&
      (/^[a-z]/.test(next) ||
        (line.length >= SOFT_WRAP_MIN_LINE &&
          !/[.!?;:]$/.test(line) &&
          /^[\p{L}\p{N}([{"'“‘–—-]/u.test(next)));
    // Structural lines open a NEW paragraph (leading \n on top of the
    // previous line's own trailing \n → \n\n) but still absorb their own
    // wrapped continuations (soft tail). Prose keeps single \n.
    rebuilt.push(structural ? `\n${line}${isSoftWrap ? ' ' : '\n'}` : isSoftWrap ? `${line} ` : `${line}\n`);
  }
  t = rebuilt.join('');

  // 3) Whitespace hygiene: collapse runs of spaces/tabs, cap blank-line runs
  //    at one (paragraph separator), trim the ends.
  t = t
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return t;
}

// ─── 2. Sentence splitting (abbreviation-aware) ────────────────────────────

const PH = '\u0001'; // placeholder char standing in for a protected '.'

/** Abbreviations whose trailing period must NOT end a sentence. */
const ABBREVIATIONS =
  /\b(e\.g|i\.e|a\.m|p\.m|etc|vs|cf|ca|approx|Dr|Mr|Mrs|Ms|Prof|Fig|Figs|No|Nos|Vol|Ch|Sec|Inc|Ltd|Jr|Sr|St|ed|eds|dept|univ|et al)\.(?=\s+[A-Z0-9])/gi;

/**
 * Split text into sentences. Terminators are `.`, `!`, `?`, `…` optionally
 * followed by closing quotes/brackets; a split only happens when the next
 * sentence starts with a capital letter, digit, bullet or opening bracket.
 * Decimals ("3.5 mg") and common abbreviations ("Dr.", "e.g.", "et al.")
 * are protected first so they never look like terminators.
 */
export function splitSentences(text: string): string[] {
  if (!text) return [];
  const guarded = text
    .replace(/(\d)\.(\d)/g, `$1${PH}$2`) // decimals
    .replace(ABBREVIATIONS, (m) => m.replace(/\./g, PH));

  const parts: string[] = [];
  const terminator = /[.!?…]+["')\]]*(?=(\s+[A-Z0-9•\[\(“"']|\s|$))/g;
  let start = 0;
  let m: RegExpExecArray | null;
  while ((m = terminator.exec(guarded))) {
    const end = m.index + m[0].length;
    // Never emit tiny fragments ("1.", "a.") — skip those boundaries so list
    // numbering stays glued to its sentence.
    if (end - start >= 8) {
      parts.push(guarded.slice(start, end).trim());
      start = end;
    }
  }
  if (start < guarded.length) parts.push(guarded.slice(start).trim());
  return parts
    .filter((s) => s.length > 0)
    .map((s) => s.replace(new RegExp(PH, 'g'), '.'));
}

// ─── 3. Sentence-aware chunking ────────────────────────────────────────────

export interface ChunkQualityOptions {
  size?: number;
  overlap?: number;
}

/**
 * Pre-join dangling fragments: a paragraph that ends mid-sentence (no
 * terminator) followed by a paragraph starting with a lowercase letter is
 * ONE logical paragraph that a page break or layout artifact split in two.
 * Joining them keeps sentences whole at chunk boundaries — otherwise a cut
 * can land exactly where the page turned, mid-sentence. Shared by
 * chunkTextQuality and the semantic chunker's unit builder.
 */
export function joinParagraphFragments(paragraphs: string[]): string[] {
  const joined: string[] = [];
  for (const paragraph of paragraphs) {
    const prev = joined.length ? joined[joined.length - 1] : null;
    if (
      prev &&
      !/[.!?…:;"')\]]$/.test(prev) &&
      prev.length >= 12 && // a real fragment, not a tiny label
      !isHeadingLine(prev) && // Title-Case headings are structure, not fragments
      /^[a-z(]/.test(paragraph) // continuation starts lowercase / parenthetical
    ) {
      joined[joined.length - 1] = `${prev} ${paragraph}`;
    } else {
      joined.push(paragraph);
    }
  }
  return joined;
}

/**
 * Structure-aware chunker. Paragraphs (\n\n-separated) accumulate up to
 * `size` exactly as before; an oversized paragraph is split into sentences
 * which are packed greedily, carrying a sentence-aligned `overlap` tail into
 * each next piece. Punctuation-free run-ons (long ASR stretches, data dumps)
 * fall back to WORD-boundary splitting — characters inside a word are never
 * cut.
 */
export function chunkTextQuality(text: string, opts: ChunkQualityOptions = {}): string[] {
  const size = Math.max(200, opts.size ?? DEFAULT_CHUNK_SIZE);
  const overlap = Math.min(Math.max(0, opts.overlap ?? DEFAULT_CHUNK_OVERLAP), Math.floor(size / 3));

  const normalized = text.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n');
  const trimmed = normalized.trim();
  if (!trimmed) return [];

  const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const joined = joinParagraphFragments(paragraphs);

  if (joined.length === 1) {
    const single = joined[0];
    if (single.length <= size) return [single];
    return packSentences(single, size, overlap);
  }
  const allText = joined.join('\n\n');
  if (allText.length <= size) return [allText];

  const chunks: string[] = [];
  let current = '';

  const flushCurrent = () => {
    const piece = current.trim();
    if (piece) chunks.push(piece);
    current = '';
  };

  for (const paragraph of joined) {
    if (paragraph.length <= size) {
      if (current && current.length + paragraph.length + 2 > size) flushCurrent();
      current = current ? `${current}\n\n${paragraph}` : paragraph;
      continue;
    }
    flushCurrent();
    chunks.push(...packSentences(paragraph, size, overlap));
  }
  flushCurrent();
  return chunks.filter(Boolean);
}

/** Pack one oversized paragraph's sentences into ≤`size` pieces. */
function packSentences(paragraph: string, size: number, overlap: number): string[] {
  const sentences = splitSentences(paragraph);
  if (sentences.length === 0) return splitByWords(paragraph, size, overlap);

  const pieces: string[] = [];
  let cur: string[] = [];
  let curLen = 0;

  for (const sentence of sentences) {
    if (sentence.length > size) {
      // A single punctuation-free run-on — word-boundary split.
      if (cur.length) pieces.push(cur.join(' '));
      pieces.push(...splitByWords(sentence, size, overlap));
      cur = [];
      curLen = 0;
      continue;
    }
    if (curLen > 0 && curLen + sentence.length + 1 > size) {
      pieces.push(cur.join(' '));
      cur = overlapTail(cur, overlap); // sentence-aligned carry into the next piece
      curLen = cur.reduce((n, s) => n + s.length + 1, 0);
      // Overlap + the new sentence must still fit; else drop the carry.
      if (curLen + sentence.length + 1 > size) {
        cur = [];
        curLen = 0;
      }
    }
    cur.push(sentence);
    curLen += sentence.length + 1;
  }
  if (cur.length) pieces.push(cur.join(' '));
  return pieces.filter((p) => p.trim().length > 0);
}

/** Longest suffix of `sentences` whose total length stays within `overlap`. */
function overlapTail(sentences: string[], overlap: number): string[] {
  const tail: string[] = [];
  let len = 0;
  for (let i = sentences.length - 1; i >= 0; i--) {
    const cost = sentences[i].length + 1;
    if (len + cost > overlap) break;
    tail.unshift(sentences[i]);
    len += cost;
  }
  return tail;
}

/** Word-boundary fallback for punctuation-free text — never cuts mid-word. */
function splitByWords(runOn: string, size: number, overlap: number): string[] {
  const words = runOn.split(/\s+/).filter(Boolean);
  const pieces: string[] = [];
  let cur: string[] = [];
  let curLen = 0;

  for (const word of words) {
    if (curLen > 0 && curLen + word.length + 1 > size) {
      pieces.push(cur.join(' '));
      const tail: string[] = [];
      let tailLen = 0;
      for (let i = cur.length - 1; i >= 0; i--) {
        const cost = cur[i].length + 1;
        if (tailLen + cost > overlap) break;
        tail.unshift(cur[i]);
        tailLen += cost;
      }
      cur = tail;
      curLen = tailLen;
      if (curLen + word.length + 1 > size) {
        cur = [];
        curLen = 0;
      }
    }
    cur.push(word);
    curLen += word.length + 1;
  }
  if (cur.length) pieces.push(cur.join(' '));
  return pieces.filter((p) => p.trim().length > 0);
}

// ─── 4. Boundary-safe excerpt trimming ─────────────────────────────────────

/**
 * Trim `text` to at most `max` characters WITHOUT cutting a word — and when
 * possible without cutting a sentence. Prefers the last sentence terminator
 * that lands in the upper 60% of the budget; otherwise falls back to the last
 * complete word (with an ellipsis).
 */
export function trimToSentence(text: string | null | undefined, max: number): string {
  const t = (text ?? '').trim();
  if (t.length <= max) return t;
  const window = t.slice(0, max + 1);

  let cut = -1;
  const terminators = window.matchAll(/[.!?…]+["')\]]*/g);
  for (const m of terminators) {
    const end = m.index + m[0].length;
    if (end <= max && end >= Math.floor(max * 0.4)) cut = Math.max(cut, end);
  }
  if (cut > 0) return window.slice(0, cut).trim();

  const wordBreak = window.lastIndexOf(' ', max);
  if (wordBreak >= Math.floor(max * 0.4)) {
    return `${window.slice(0, wordBreak).trimEnd()}…`;
  }
  return `${t.slice(0, max).trimEnd()}…`;
}

// ─── 5. Question-focused citation quotes ───────────────────────────────────

/**
 * Build a citation quote that shows the part of the chunk that actually
 * grounds the QUESTION — not just the chunk's head.
 *
 * Why: chunks hold up to ~900 characters; the fact a question was built on
 * usually sits in the middle. Quoting the head 400 chars made citations look
 * "not closely related" to the question and showed incomplete context. Here
 * every SENTENCE of the chunk is scored against the question text (token
 * overlap), the best sentence wins, and neighbors are folded in — up to
 * `max` characters — so the quote reads as complete context on a sentence
 * boundary. Falls back to a boundary-safe head trim when nothing overlaps
 * (pure provenance citations still work).
 */
export function buildCitationQuote(
  content: string | null | undefined,
  questionText: string | null | undefined,
  max = 400,
): string {
  const body = (content ?? '').trim();
  if (!body) return '';
  if (body.length <= max) return body;

  const sentences = splitSentences(body);
  if (sentences.length <= 1) return trimToSentence(body, max);

  const qTokens = new Set(
    (questionText ?? '')
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((t) => t.length > 2),
  );
  if (qTokens.size === 0) return trimToSentence(body, max);

  // Score each sentence by shared distinctive tokens (a mild multi-hit boost
  // favors sentences that hit several question terms).
  const scores = sentences.map((s) => {
    const toks = s.toLowerCase().split(/[^\p{L}\p{N}]+/u);
    let hits = 0;
    for (const tk of toks) if (qTokens.has(tk)) hits += 1;
    return hits === 0 ? 0 : hits + Math.min(6, hits) * 0.1;
  });
  let best = 0;
  for (let i = 1; i < scores.length; i++) if (scores[i] > scores[best]) best = i;
  if (scores[best] === 0) return trimToSentence(body, max);

  // Expand to neighboring sentences (prefer after, then before) while the
  // combined quote fits the budget — context around the match, complete
  // sentences only.
  let lo = best;
  let hi = best;
  const lengthOf = (l: number, h: number) =>
    sentences.slice(l, h + 1).reduce((n, s) => n + s.length + 1, 0) - 1;
  for (;;) {
    const canNext = hi + 1 < sentences.length && lengthOf(lo, hi + 1) <= max;
    const canPrev = lo - 1 >= 0 && lengthOf(lo - 1, hi) <= max;
    if (!canNext && !canPrev) break;
    if (canNext) hi += 1;
    if (canPrev && lengthOf(lo - 1, hi) <= max) lo -= 1;
  }
  return sentences.slice(lo, hi + 1).join(' ').trim();
}
