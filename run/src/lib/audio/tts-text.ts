/**
 * Markdown → plain-speech text sanitizer for TTS.
 *
 * Problem (Task 51): LLM-generated narration/discussion text is markdown
 * (`**bold**`, `# headings`, `- bullets`, links, tables...). Every TTS entry
 * point used to pass that text through verbatim, so the narrator audibly read
 * the syntax ("asterisk asterisk ... hash hash ...").
 *
 * This module converts markdown narration to clean speakable text. It is a
 * PURE isomorphic function (no client/server imports) so it can be applied at
 * every choke point:
 *   - server:  `generateTTS()` in tts-providers.ts (all providers, all routes)
 *   - browser: use-browser-tts.speak(), playBrowserTTSPreview(), useAgentVoice
 *   - client→server bodies: stage-tts-client.synthesizeStageTTS()
 *
 * Design notes:
 *  - Idempotent: output contains no markdown markers, so re-running is a no-op
 *    (double-sanitize across client + server is safe).
 *  - Conservative: emphasis pairs require whitespace/punctuation boundaries so
 *    legitimate text like `5 * 3` or `snake_case` is never eaten.
 *  - Ordered: structural constructs (fences, links, images, headings) are
 *    removed before inline emphasis so markers inside them don't leak.
 *  - Ordered-list markers ("1.") are KEPT (they carry meaning when spoken);
 *    bullet markers ("- ", "* ") are stripped (TTS reads them as "dash").
 */

/** Remove HTML comments (multi-line safe). */
function stripHtmlComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

/**
 * Strip fenced code blocks, keeping the inner code as speakable text.
 * Two-step (order matters):
 *   1. drop bare fence-marker lines (`` ``` `` alone on a line — i.e. closers
 *      and bare openers);
 *   2. drop opener lines including their language tag ("```python\n").
 * Content between them is kept so code narration still speaks the code.
 */
function stripCodeFences(text: string): string {
  return text
    .replace(/^[ \t]*(`{3,}|~{3,})[ \t]*$/gm, '')
    .replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n/gm, '');
}

/** Headings: leading ATX marker(s) and trailing closers. "## T ##" → "T". */
function stripHeadingMarkers(text: string): string {
  return text
    .split('\n')
    .map((line) => line.replace(/^[ \t]{0,3}#{1,6}[ \t]+/, '').replace(/[ \t]+#{1,6}[ \t]*$/, ''))
    .join('\n');
}

/** Remove setext heading underlines ("===" / "---" lines). */
function stripSetextUnderlines(text: string): string {
  return text.replace(/^[ \t]*(-{3,}|={3,})[ \t]*$/gm, '');
}

/** Remove horizontal rules (already partially covered by setext pass). */
function stripHorizontalRules(text: string): string {
  return text.replace(/^[ \t]{0,3}([-*_])[ \t]*\1[ \t]*\1[\s\S]*?$/gm, '');
}

/**
 * Inline: images → removed, links → keep label only, reference definitions →
 * removed, footnotes → removed.
 */
function stripLinksAndImages(text: string): string {
  return (
    text
      // images ![alt](url) — never speak the alt or the URL
      .replace(/!\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '')
      // links [label](url) → label
      .replace(/\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '$1')
      // reference-style link definitions at line start → drop the whole line
      .replace(/^[ \t]*\[([^\]]+)\]:[ \t]*\S+.*$/gm, '')
      // footnotes [^1] (inline refs and definitions)
      .replace(/\[\^[^\]]+\]/g, '')
      // leftover empty link labels `[](url)` were handled above; bare `[]`
      // pairs left by image removal inside links → drop
      .replace(/^\[\]$/gm, '')
  );
}

/**
 * Inline emphasis: `**bold**`, `__bold__`, `*italic*`, `_italic_`, `~~strike~~`,
 * and inline code backticks. Single-char markers require non-word boundaries on
 * both sides so `5 * 3`, `snake_case`, `a_b` survive untouched.
 */
function stripInlineEmphasisAndCode(text: string): string {
  return (
    text
      // double-backtick inline code first (``x``)
      .replace(/``([^`]+)``/g, '$1')
      // single-backtick inline code
      .replace(/`([^`\n]+)`/g, '$1')
      // strikethrough
      .replace(/~~([^~\n]+)~~/g, '$1')
      // bold ** ** (allow intraword — real narration bold is word-level)
      .replace(/\*\*([^*\n]+)\*\*/g, '$1')
      // bold __ __ — CommonMark semantics: "Run __init__ first" IS strong
      // emphasis (space-flanked); dunders only survive inside code spans.
      .replace(/(^|[^\w\\])__([^_\n]+)__(?!\w)/g, '$1$2')
      // italic * * — boundaries required (protects "5 * 3", "a*b*c" math)
      .replace(/(^|[^\w\\*])\*(?=\S)([^*\n]*[^\s\*])\*(?![\w*])/g, '$1$2')
      // italic _ _ — boundaries required (protects snake_case)
      .replace(/(^|[^\w\\])_(?=\S)([^_\n]*[^\s_])_(?![\w])/g, '$1$2')
  );
}

/**
 * Blockquotes: strip the leading ">" markers (handles nested ">>" — one or
 * more markers per line). NOTE: exactly ONE ">" in the pattern after the
 * optional space — a second ">" would require nested quotes to match.
 */
function stripBlockquotes(text: string): string {
  return text.replace(/^[ \t]{0,3}(?:>[ \t]?)+/gm, '');
}

/** Bullets: "- ", "* ", "+ " at line start → drop the marker (keep the text). */
function stripBulletMarkers(text: string): string {
  return text.replace(/^([ \t]*)[-*+][ \t]+/gm, '$1');
}

/**
 * Tables: drop separator rows (|---|---|) together with their newline, then
 * per line trim the edge pipes and turn inner pipes into comma pauses so
 * cell content still reads naturally.
 */
function stripTables(text: string): string {
  const withoutSeparators = text.replace(
    /^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*(?:\r?\n|$)/gm,
    '',
  );
  return withoutSeparators
    .split('\n')
    .map((line) =>
      line
        .replace(/^[ \t]*\|[ \t]*/, '')
        .replace(/[ \t]*\|[ \t]*$/, '')
        .replace(/[ \t]*\|[ \t]*/g, ', ')
        .replace(/,[ \t]*,[ \t]*/g, ', '),
    )
    .join('\n');
}

/** Remove HTML tags (narration occasionally carries <b>, <br>, <sub>...). */
function stripHtmlTags(text: string): string {
  return text.replace(/<\/?[a-zA-Z][^>]*>/g, '');
}

/** Backslash escapes: `\*` → `*` (the literal char is the speakable form). */
function unescapeBackslashes(text: string): string {
  return text.replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, '$1');
}

/** Collapse 3+ blank lines to one; trim each line; trim overall. */
function normalizeWhitespace(text: string): string {
  return text
    .split('\n')
    .map((line) => line.replace(/[ \t]{2,}/g, ' ').trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Convert markdown narration text to clean, speakable plain text.
 * Idempotent and order-stable; safe for CJK and Latin content alike.
 */
export function stripMarkdownForTTS(text: string): string {
  if (!text) return text;
  let out = text;
  out = stripHtmlComments(out);
  out = stripCodeFences(out);
  out = stripLinksAndImages(out);
  out = stripHeadingMarkers(out);
  out = stripSetextUnderlines(out);
  out = stripHorizontalRules(out);
  out = stripBlockquotes(out);
  out = stripBulletMarkers(out);
  out = stripTables(out);
  out = stripInlineEmphasisAndCode(out);
  out = stripHtmlTags(out);
  out = unescapeBackslashes(out);
  out = normalizeWhitespace(out);
  return out;
}
