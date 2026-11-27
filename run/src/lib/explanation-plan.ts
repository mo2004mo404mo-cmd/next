/**
 * Explanation generation planning — pure functions, no DB / no request.
 *
 * Shared by /api/questions/explain (the batch generator). Everything here is
 * deterministic so a resumable job can re-derive its batch plan at any time
 * from the frozen question-id list and trust that batch #k is the SAME
 * slice it was before a pause/restart.
 *
 * ── QUALITY CONTRACT (the anti-"too simple" spec) ──
 * A generated explanation must be a TEACHING artifact, not a one-liner:
 *   1. Why the keyed answer is correct — mechanism / pathophysiology /
 *      pharmacology reasoning, 3-5 sentences.
 *   2. Why every other option is wrong — one bullet per distractor.
 *   3. Key pearls — 2-3 high-yield exam takeaways.
 *   4. One-line takeaway — the sentence to remember in the exam hall.
 * Explanations are requested as MARKDOWN (models are far more reliable at
 * markdown than raw HTML) and converted to sanitized HTML before storage —
 * QuestionCard renders the field via .medq-html-preview, which styles
 * p / strong / em / ul / li natively.
 *
 * The minimum length floor (MIN_EXPLANATION_CHARS) is a hard validation
 * gate: anything thinner is treated as a FAILED generation for that
 * question (not written, retried later) — the generator may never persist
 * a shallow wall of text again.
 */

// ── Tuning constants ──

/** Questions per LLM call. Explanations are LONG (≈500 words each) — a big
 *  batch would blow the provider's output-token limit and get truncated
 *  mid-JSON, silently losing questions. 3 rich explanations ≈ 1.5k words
 *  of JSON, comfortably inside limits. */
export const EXPLAIN_BATCH_SIZE = 3;

/** Hard cap on the frozen target list (memory + sanity). */
export const EXPLAIN_MAX_QUESTION_IDS = 2000;

/** Minimum explanation length (markdown source, before HTML conversion).
 *  A real "why correct + why others wrong + pearls + takeaway" explanation
 *  cannot be shorter than this — the floor exists to REJECT thin output,
 *  not to invite it. */
export const MIN_EXPLANATION_CHARS = 400;

/** Same floor for the distractor analysis (per-question total). */
export const MIN_DISTRACTOR_CHARS = 120;

// ── Types ──

export interface QuestionSnapshot {
  id: string;
  text: string;
  type: string;
  options: string[];
  answer: string;
}

export interface ExplanationItem {
  id: string;
  explanation: string;
  distractorAnalysis: string;
  clinicalPearl: string;
  mnemonic: string;
}

// ── Batch planning (deterministic) ──

/** Deterministic batch plan: batch #k = ids.slice(k*B, (k+1)*B). */
export function planBatches(ids: string[]): string[][] {
  const batches: string[][] = [];
  for (let i = 0; i < ids.length; i += EXPLAIN_BATCH_SIZE) {
    batches.push(ids.slice(i, i + EXPLAIN_BATCH_SIZE));
  }
  return batches;
}

/** Indices of batches that have NOT settled yet (chunkResults[i] === null). */
export function pendingBatchIdxs(results: Array<unknown | null>): number[] {
  const pending: number[] = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i] == null) pending.push(i);
  }
  return pending;
}

// ── Prompts (the quality spec lives here) ──

export function explainSystemPrompt(): string {
  return [
    'You are a senior medical educator who writes board-exam teaching explanations for medical students.',
    'You are given questions WITH their correct answers; your job is to write the kind of rich, structured explanation a top-rated lecturer would give after a student asks "why is that the answer?".',
    '',
    'STRICT OUTPUT CONTRACT: respond with ONLY a JSON array — one object per question, no markdown fences, no commentary before or after. Each object has EXACTLY these keys:',
    '{"id": string (copy the id EXACTLY as given), "explanation": string, "distractorAnalysis": string, "clinicalPearl": string, "mnemonic": string}',
    '',
    'The "explanation" field MUST be markdown with EXACTLY this structure:',
    '1. A paragraph beginning with the bold label **Why {answer} is correct:** followed by 3-5 sentences of genuine mechanistic reasoning — the pathophysiology, pharmacology, or clinical logic that makes this answer RIGHT. Name the specific mechanism, receptor, pathway, organism, or diagnostic step; never just restate the answer.',
    '2. A section beginning with the bold label **Why the other options are wrong:** containing one bullet per remaining option (format: "- **{option text}:** reason it is wrong"). Each bullet gives the specific reason — the wrong mechanism, the wrong clinical scenario, or the classic trap — in 1-2 sentences.',
    '3. A section beginning with the bold label **Key pearls:** with 2-3 bullets of high-yield, exam-relevant takeaways (associations, thresholds, classic presentations, discriminating features).',
    '4. A final paragraph beginning with the bold label **One-line takeaway:** containing ONE memorable sentence that would let a student answer this question (and its variants) correctly forever.',
    '',
    'The "distractorAnalysis" field: a shorter markdown bullet list, one bullet per wrong option ("- **{option}:** one-sentence reason it is wrong") — a quick-scan version of section 2.',
    'The "clinicalPearl" field: 1-2 sentences of memorable clinical wisdom about the underlying topic (not the question).',
    'The "mnemonic" field: a genuinely useful mnemonic ONLY if one naturally fits; otherwise exactly "".',
    '',
    'QUALITY RULES:',
    '- Total explanation length: 350-600 words. Never write a thin or generic explanation.',
    '- Be specific: drug mechanisms, receptor subtypes, enzyme names, diagnostic criteria, lab values, classic associations.',
    '- The labels **Why {answer} is correct:**, **Why the other options are wrong:**, **Key pearls:** and **One-line takeaway:** must appear literally (bolded with **) in every explanation.',
    '- For true/false and short-answer questions: skip section 2\'s per-option bullets; instead include a paragraph labeled **Why the other answer would be wrong:** arguing the incorrect side.',
    '- Never invent facts that contradict the question. Never change the answer.',
    '- Every id in your output array must match one of the given question ids exactly.',
  ].join('\n');
}

export function buildExplainPrompt(questions: QuestionSnapshot[]): string {
  const blocks = questions.map((q, i) => {
    const optionLines =
      q.type === 'mcq' && q.options.length > 0
        ? q.options.map((o, k) => `   ${String.fromCharCode(65 + k)}. ${o}`).join('\n')
        : '   (no options)';
    return [
      `QUESTION ${i + 1} (id: ${q.id})`,
      `Type: ${q.type}`,
      `Stem: ${q.text}`,
      `Options:`,
      optionLines,
      `Correct answer: ${q.answer}`,
    ].join('\n');
  });

  return [
    'Write complete teaching explanations for each of the following questions. The correct answer is given — do not change it; explain it.',
    '',
    ...blocks,
    '',
    `Respond with ONLY the JSON array (${questions.length} object${questions.length === 1 ? '' : 's'}), each object shaped exactly as the system prompt requires. Copy each "id" verbatim.`,
  ].join('\n');
}

// ── Markdown → sanitized HTML ──

/**
 * Convert the model's markdown explanation to SAFE HTML for storage.
 *
 * The QuestionCard renders the explanation field via
 * dangerouslySetInnerHTML + .medq-html-preview — so the stored HTML must be
 * fully sanitized: every raw <, >, & is escaped FIRST, then a strict
 * whitelist of tags is re-introduced from markdown syntax. The model is
 * never trusted to emit HTML directly.
 *
 * Supported markdown: **bold**, *italic* / _italic_, `code`,
 * "- " / "* " bullets, "1. " numbered lists, "#### heading" → bold
 * paragraph, blank-line paragraphs, single newlines → <br>.
 */
export function markdownToSafeHtml(md: string): string {
  const escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = escaped.split(/\r?\n/);
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  const inline = (s: string): string =>
    s
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>')
      .replace(/`([^`\n]+)`/g, '<code>$1</code>');

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      closeList();
      continue;
    }

    // Headings → bold paragraph (styled by .medq-html-preview)
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      closeList();
      out.push(`<p><strong>${inline(heading[1])}</strong></p>`);
      continue;
    }

    // Bulleted list item
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      if (listType !== 'ul') {
        closeList();
        out.push('<ul>');
        listType = 'ul';
      }
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }

    // Numbered list item
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      if (listType !== 'ol') {
        closeList();
        out.push('<ol>');
        listType = 'ol';
      }
      out.push(`<li>${inline(numbered[1])}</li>`);
      continue;
    }

    // Paragraph line
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();

  return out.join('\n');
}

// ── Response parsing (tolerant of LLM quirks) ──

function stripFences(raw: string): string {
  let s = raw.trim();
  const fence = s.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
  if (fence) s = fence[1].trim();
  const firstBracket = s.indexOf('[');
  const lastBracket = s.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    s = s.slice(firstBracket, lastBracket + 1);
  }
  return s;
}

/**
 * Salvage complete objects out of a TRUNCATED JSON array: scan for top-level
 * `{...}` objects (brace-depth + string-aware) and parse each individually.
 * A response cut mid-array by an output-token limit still yields every
 * COMPLETE object before the cut — questions are never lost to truncation.
 */
function salvageObjects(cleaned: string): unknown[] {
  const items: unknown[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escape = false;
  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      if (depth > 0) {
        depth--;
        if (depth === 0 && start >= 0) {
          const candidate = cleaned.slice(start, i + 1);
          try {
            items.push(JSON.parse(candidate));
          } catch {
            try {
              // repair quirks inside the single object (trailing commas)
              const fixed = candidate.replace(/,\s*([}\]])/g, '$1');
              items.push(JSON.parse(fixed));
            } catch { /* drop the one broken object */ }
          }
        }
      }
    }
  }
  return items;
}

/** Heuristic: a string of the same character repeated (LLM degeneration). */
function isGarbage(s: string): boolean {
  if (!s) return true;
  const stripped = s.replace(/\s+/g, '');
  if (stripped.length === 0) return true;
  const first = stripped[0];
  return stripped.split('').every((c) => c === first) && stripped.length >= 20;
}

/** Substance length: markdown stripped of formatting noise. */
function substanceLength(s: string): number {
  return s
    .replace(/[*_`#>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim().length;
}

function normalizeExplanationItem(
  item: unknown,
  requestedIds: Set<string>,
): ExplanationItem | null {
  if (!item || typeof item !== 'object') return null;
  const q = item as Record<string, unknown>;
  const id = typeof q.id === 'string' ? q.id.trim() : '';
  if (!id || !requestedIds.has(id)) return null;

  const explanation = typeof q.explanation === 'string' ? q.explanation.trim() : '';
  if (
    explanation.length < MIN_EXPLANATION_CHARS ||
    substanceLength(explanation) < Math.floor(MIN_EXPLANATION_CHARS * 0.7) ||
    isGarbage(explanation)
  ) {
    // Too thin / degenerate — treat as "not generated" so the batch can retry.
    return null;
  }

  const distractorAnalysis =
    typeof q.distractorAnalysis === 'string' ? q.distractorAnalysis.trim() : '';
  const clinicalPearl = typeof q.clinicalPearl === 'string' ? q.clinicalPearl.trim() : '';
  const mnemonic = typeof q.mnemonic === 'string' ? q.mnemonic.trim() : '';

  return {
    id,
    explanation,
    distractorAnalysis:
      distractorAnalysis.length >= MIN_DISTRACTOR_CHARS && !isGarbage(distractorAnalysis)
        ? distractorAnalysis
        : '',
    clinicalPearl: clinicalPearl && !isGarbage(clinicalPearl) ? clinicalPearl : '',
    mnemonic: mnemonic && !isGarbage(mnemonic) ? mnemonic : '',
  };
}

export interface ParseExplanationsResult {
  items: ExplanationItem[];
  /** True when NOTHING usable came back (caller counts a parse failure). */
  parseFail: boolean;
}

/**
 * Parse the model's explanation JSON — tolerant of fences, prose, trailing
 * commas and mid-array truncation. Items whose id wasn't requested, or whose
 * explanation fails the QUALITY FLOOR, are dropped (the batch retries them).
 */
export async function parseExplanationsJson(
  raw: string,
  requestedIds: string[],
): Promise<ParseExplanationsResult> {
  const cleaned = stripFences(raw);
  const allowed = new Set(requestedIds);

  let candidates: unknown[] = [];
  if (cleaned) {
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) candidates = parsed;
    } catch {
      try {
        const { jsonrepair } = await import('jsonrepair');
        const repaired = await jsonrepair(cleaned);
        const parsed = JSON.parse(repaired);
        if (Array.isArray(parsed)) candidates = parsed;
      } catch {
        candidates = salvageObjects(cleaned);
      }
    }
  }

  // First-seen id wins; quality floor enforced per item.
  const byId = new Map<string, ExplanationItem>();
  for (const candidate of candidates) {
    const item = normalizeExplanationItem(candidate, allowed);
    if (item && !byId.has(item.id)) byId.set(item.id, item);
  }

  return {
    items: [...byId.values()],
    parseFail: cleaned.length > 0 && byId.size === 0,
  };
}
