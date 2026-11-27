import { db } from '../../db';
import { createLogger } from '../../logger';
import { getEmbeddings, serializeVector, deserializeVector, cosineSimilarity } from './embeddings';
import { knowledgeLLM } from './llm';
import { deleteRetainedAudio } from './audio-pipeline';
import { deleteRetainedOriginal, readRetainedOriginal } from './file-store';
import {
  chunkTextQuality,
  normalizeExtractedText,
  trimToSentence,
  DEFAULT_CHUNK_SIZE,
  DEFAULT_CHUNK_OVERLAP,
} from './text-quality';
import type { MediaFileKind } from './ingest-media';

const log = createLogger('AgentKnowledge');

/**
 * Knowledge / RAG ingestion pipeline.
 *
 * Flow: KnowledgeSource (file | url | text | media upload) → parse (+
 * normalizeExtractedText for machine-extracted formats — de-hyphenation and
 * soft-wrap repair) → structure-aware chunk (900 chars / 150 overlap,
 * SENTENCE-ALIGNED so chunks never cut a word or half-finish a sentence) →
 * CONTEXTUAL ENRICHMENT (LLM writes a 1-2 sentence blurb per chunk,
 * Anthropic contextual-retrieval style) → embed (context + content, provider
 * recorded per chunk) → KnowledgeDocument + KnowledgeChunk rows.
 *
 * Retrieval lives in hybrid.ts (dense + BM25 + RRF + LLM rerank); the legacy
 * cosine-only retrieveKnowledge here remains for the deep-agent
 * search_knowledge tool's simple path.
 *
 * Supported inputs: pasted text; URLs (SSRF-guarded fetch, HTML stripped);
 * files — PDF (unpdf + VLM OCR rescue for scans), DOCX (mammoth + embedded
 * images), PPTX (slides + notes + slide images), XLSX (exceljs), EPUB,
 * txt/md/csv/json/tsv/log/html, source code, and (via ingest-media.ts)
 * audio → ASR, video → ASR + frame VLM, images → VLM OCR.
 *
 * Already-ingested sources can be re-chunked with the improved quality via
 * reindexKnowledgeSource() (POST /api/knowledge/sources/[id]/reindex).
 */

export const CHUNK_SIZE = DEFAULT_CHUNK_SIZE;
export const CHUNK_OVERLAP = DEFAULT_CHUNK_OVERLAP;
const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).
// Was 15 MB — raised 2026-11-03: matches the route + tier ceiling so
// the resumable uploadId path isn't re-blocked here after the tier
// matrix already accepted the file. The tier matrix (Stage 10) is the
// per-user limit; this is just the processing ceiling.
const MAX_DOC_CONTENT = 100_000; // original text stored truncated

const TEXT_EXTENSIONS = new Set(['txt', 'md', 'markdown', 'csv', 'tsv', 'json', 'log', 'html', 'htm', 'xml']);
const CODE_EXTENSIONS = new Set([
  'js', 'ts', 'tsx', 'jsx', 'py', 'go', 'rs', 'java', 'sh', 'sql', 'yml', 'yaml', 'toml', 'css', 'c', 'cpp', 'r', 'm',
]);

// ─── Chunking ──────────────────────────────────────────────────────────────

/**
 * Structure-aware, SENTENCE-ALIGNED chunking (see text-quality.ts). Paragraphs
 * accumulate up to CHUNK_SIZE; oversized paragraphs are split into sentences
 * and packed with sentence-aligned overlap — words are never cut in half and
 * chunks end on sentence boundaries whenever punctuation exists. Punctuation-
 * free run-ons (ASR stretches, data dumps) fall back to word-boundary splits.
 */
export function chunkText(text: string): string[] {
  return chunkTextQuality(text, { size: CHUNK_SIZE, overlap: CHUNK_OVERLAP });
}

// ─── Parsing ───────────────────────────────────────────────────────────────

export interface ParsedContent {
  title: string;
  mimeType: string;
  text: string;
}

async function parsePdf(buffer: Buffer): Promise<string> {
  const { getDocumentProxy, extractText } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  // unpdf output keeps soft line wraps (measured: 3,049 letter-\n-letter
  // breaks in a 436 KB textbook PDF) and line-end hyphenation — normalize
  // so sentences flow and hyphenated words are repaired before chunking.
  return normalizeExtractedText(text);
}

/** Parse an uploaded file buffer by extension. Throws on unsupported types. */
export async function parseFile(name: string, buffer: Buffer): Promise<ParsedContent> {
  if (buffer.byteLength > MAX_FILE_BYTES) throw new Error(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
  const ext = (name.split('.').pop() ?? '').toLowerCase();

  if (ext === 'pdf') {
    const text = await parsePdf(buffer);
    if (!text.trim()) throw new Error('PDF contains no extractable text (scanned image?)');
    return { title: name, mimeType: 'application/pdf', text };
  }
  if (TEXT_EXTENSIONS.has(ext) || CODE_EXTENSIONS.has(ext)) {
    // User-authored content — kept VERBATIM (no extraction normalization:
    // markdown lists, code indentation and CSV columns must not be touched).
    const text = buffer.toString('utf8');
    if (!text.trim()) throw new Error('File is empty');
    const mime = ext === 'md' || ext === 'markdown'
      ? 'text/markdown'
      : ext === 'csv' ? 'text/csv'
      : ext === 'json' ? 'application/json'
      : ext === 'html' || ext === 'htm' ? 'text/html'
      : 'text/plain';
    return { title: name, mimeType: mime, text };
  }
  // Office containers / EPUB — delegate to the rich media parser (slides,
  // notes, embedded images, sheets, chapters). Lazy import avoids a cycle.
  if (['docx', 'pptx', 'xlsx', 'epub'].includes(ext)) {
    const { parseMediaFile } = await import('./ingest-media');
    const parsed = await parseMediaFile(name, buffer, '');
    // Machine-extracted → normalize soft wraps / hyphenation like PDFs.
    return {
      title: parsed.title,
      mimeType: parsed.mimeType,
      text: normalizeExtractedText(parsed.text),
    };
  }
  throw new Error(
    `Unsupported file type ".${ext}". Supported: PDF, DOCX, PPTX, XLSX, EPUB, TXT, MD, CSV, TSV, JSON, HTML, XML, LOG and common source-code files.`,
  );
}

/** Fetch a URL through the SSRF-guarded reader used by fetch_medical_reference. */
export async function parseUrl(url: string): Promise<ParsedContent> {
  const { fetchPageText, htmlToText } = await import('../tools/web-fetch');
  try {
    // Prefer the ZAI gateway page reader (renders JS-heavy pages)
    const { createZAI } = await import('../../zai');
    const zai = await createZAI();
    if (zai?.functions?.invoke) {
      const page = (await zai.functions.invoke('page_reader', { url })) as {
        data?: { html?: string; title?: string };
      };
      if (page?.data?.html) {
        return {
          title: page.data.title || new URL(url).hostname,
          mimeType: 'text/html',
          text: normalizeExtractedText(htmlToText(page.data.html)),
        };
      }
    }
  } catch {
    // Gateway unavailable — fall through to the direct fetch.
  }
  const fetched = await fetchPageText(url);
  return { title: fetched.title, mimeType: 'text/html', text: fetched.content };
}

// ─── Contextual enrichment (Anthropic contextual-retrieval) ────────────

/**
 * LLM-written context blurbs: for each chunk, one sentence describing what it
 * contains and where it sits in the document. Batched 40 chunks/call, capped
 * at 3 batches; sources beyond the cap fall back to a title-based blurb.
 * Any failure degrades to the title-based fallback — enrichment is an
 * accuracy booster, never a hard dependency.
 */
export interface EnrichmentOpts {
  /** Hard cap on the number of chunks that get an LLM blurb. Chunks beyond
   *  this cap fall back to a title-based blurb (`From "<title>", part N of M`).
   *  Default: process.env.MEDQ_ENRICHMENT_CAP || 120. */
  maxEnriched?: number;
  /** LLM batch size — one call per batch. Smaller = more calls, finer
   *  retry granularity; larger = cheaper, fewer round-trips, larger prompt.
   *  Default: process.env.MEDQ_ENRICHMENT_BATCH_SIZE || 40. */
  batchSize?: number;
}

/**
 * Pure batch slicer for `enrichChunksWithContext`. Returns the slice plan
 * (array of `string[]` batches) WITHOUT calling the LLM — extracted so the
 * cap/batch policy is unit-testable in isolation.
 *
 * Invariants:
 *   • Total chunks across batches ≤ min(chunks.length, cap)
 *   • Each batch length ≤ batchSize
 *   • batchSize is clamped to [1, cap] (a batch larger than the cap would
 *     let one batch exceed the cap; a zero batch size would loop forever)
 *   • Returns [] for empty input
 */
export function sliceEnrichmentBatches(
  chunks: string[],
  cap: number,
  batchSize: number,
): string[][] {
  if (chunks.length === 0 || cap <= 0) return [];
  const safeCap = Math.max(1, Math.floor(cap));
  const safeBatch = Math.max(1, Math.min(Math.floor(batchSize), safeCap));
  const limit = Math.min(chunks.length, safeCap);
  const out: string[][] = [];
  for (let i = 0; i < limit; i += safeBatch) {
    out.push(chunks.slice(i, Math.min(i + safeBatch, limit)));
  }
  return out;
}

export async function enrichChunksWithContext(
  title: string,
  chunks: string[],
  opts?: EnrichmentOpts,
): Promise<string[]> {
  const fallback = chunks.map((_, i) => `From "${title}", part ${i + 1} of ${chunks.length}`);
  const MAX_ENRICHED = opts?.maxEnriched ?? (Number(process.env.MEDQ_ENRICHMENT_CAP) || 120);
  const BATCH_SIZE = opts?.batchSize ?? (Number(process.env.MEDQ_ENRICHMENT_BATCH_SIZE) || 40);
  const enriched: string[] = fallback.slice();

  const batches = sliceEnrichmentBatches(chunks, MAX_ENRICHED, BATCH_SIZE);

  let offset = 0;
  for (const batch of batches) {
    const listing = batch
      .map((c, i) => `CHUNK ${i + 1}:\n${c.slice(0, 500)}`)
      .join('\n\n');
    const raw = await knowledgeLLM({
      system: `You annotate document chunks for a retrieval system. The document is "${title}". For EACH chunk, write ONE concise sentence (max 25 words) describing what specific information it contains and how it fits in the document. Refer to concrete entities/numbers in the chunk so the blurb is distinguishable. Output ONLY a JSON array of strings, one per chunk, same order.`,
      prompt: `${listing}\n\nReturn the JSON array of ${batch.length} context sentences now.`,
      maxOutputTokens: 2000,
      temperature: 0,
      timeoutMs: 45_000,
    });
    if (!raw) break; // LLM unavailable — keep fallback blurbs for the rest
    try {
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) break;
      const parsed = JSON.parse(match[0]) as unknown[];
      let applied = 0;
      for (let i = 0; i < batch.length; i++) {
        const blurb = parsed[i];
        if (typeof blurb === 'string' && blurb.trim().length > 8) {
          enriched[offset + i] = blurb.trim().slice(0, 300);
          applied++;
        }
      }
      if (applied === 0) break;
    } catch {
      break;
    }
    offset += batch.length;
  }

  return enriched;
}

// ─── Ingestion ─────────────────────────────────────────────────────────────

export interface IngestInput {
  userId: string;
  sourceId: string;
  type: 'file' | 'url' | 'text';
  /** Display name (also the fallback document title for text sources). */
  name?: string;
  /** Content origin for UI badges / retrieval filters: document | audio | video | image | url | text. */
  fileKind?: MediaFileKind | 'url' | 'text';
  /** Extra metadata (durationSec, transcription mode, pages, ocr...). */
  meta?: Record<string, unknown>;
  /** Pre-parsed content (from parseMediaFile) — skips type-specific parsing. */
  parsed?: ParsedContent;
  payload: { content?: string; url?: string; buffer?: Buffer; fileName?: string; title?: string; mimeType?: string };
  /** Live progress reporter — publishes {stage, percent, note} into meta.progress
   *  so the polling library UI can render a real progress bar per source. */
  onProgress?: (stage: string, percent: number, note?: string) => void;
}

/** Progress shape stored in KnowledgeSource.metaJson.progress (client-facing). */
export interface SourceProgress {
  stage: string;
  percent: number;
  note?: string;
  at: string;
}

/**
 * Merge a live progress marker into the source's metaJson WITHOUT clobbering
 * other meta keys. Cheap single-row update — safe to call at every pipeline
 * stage (single background job owns a source at a time). The final `ready`
 * write replaces metaJson wholesale, which clears the progress marker.
 */
export async function updateSourceProgress(
  sourceId: string,
  stage: string,
  percent: number,
  note?: string,
): Promise<void> {
  try {
    const source = await db.knowledgeSource.findUnique({
      where: { id: sourceId },
      select: { status: true, metaJson: true },
    });
    // Only track live progress while actually in flight — never touch a
    // finished (ready/failed) row from a stale async path.
    if (!source || (source.status !== 'pending' && source.status !== 'processing')) return;
    const meta = source.metaJson ? (safeParse(source.metaJson) as Record<string, unknown> | null) : null;
    const progress: SourceProgress = { stage, percent: Math.max(0, Math.min(100, Math.round(percent))), at: new Date().toISOString() };
    if (note) progress.note = note.slice(0, 200);
    await db.knowledgeSource.update({
      where: { id: sourceId },
      data: { metaJson: JSON.stringify({ ...(meta || {}), progress }) },
    });
  } catch {
    // Progress reporting is best-effort — never fail ingestion over it.
  }
}

export interface IngestResult {
  documentId: string;
  title: string;
  chunks: number;
}

/**
 * Parse → chunk → contextual-enrich → embed → persist for one source. Sets
 * source status processing → ready/failed. Safe to call inline from an API
 * route. Media inputs pass `parsed` (from parseMediaFile) + `fileKind`.
 */
export async function ingestSource(input: IngestInput): Promise<IngestResult> {
  const { userId, sourceId, type, payload } = input;
  const report = (stage: string, percent: number, note?: string) =>
    void (input.onProgress ? updateSourceProgress(sourceId, stage, percent, note) : undefined);
  await db.knowledgeSource.update({
    where: { id: sourceId },
    data: { status: 'processing', error: null, ...(input.fileKind ? { fileKind: input.fileKind } : {}) },
  });

  try {
    let parsed: ParsedContent;
    if (input.parsed) {
      parsed = input.parsed;
    } else if (type === 'text') {
      const content = payload.content?.trim();
      if (!content) throw new Error('Text content is empty');
      parsed = { title: (payload.title ?? input.name ?? 'Pasted text').slice(0, 200), mimeType: 'text/plain', text: content };
    } else if (type === 'url') {
      if (!payload.url) throw new Error('URL missing');
      report('reading', 20, 'Reading the page');
      parsed = await parseUrl(payload.url);
    } else {
      if (!payload.buffer) throw new Error('File buffer missing');
      report('extracting', 20, 'Extracting text');
      parsed = await parseFile(payload.fileName || 'upload.bin', payload.buffer);
    }

    report('chunking', 50, 'Splitting into passages');
    const chunks = chunkText(parsed.text);
    if (chunks.length === 0) throw new Error('No text could be extracted from the source');

    // Contextual enrichment — LLM blurbs prepended before embedding. Best-effort.
    report('enriching', 62, `Summarizing ${chunks.length} passages`);
    const contextSummaries = await enrichChunksWithContext(parsed.title, chunks);

    // Embed context + content so the context blurb shapes the vector too
    // (Anthropic contextual-retrieval pattern).
    report('embedding', 78, 'Generating embeddings');
    const embeddings = await getEmbeddings();
    const embedInputs = chunks.map((content, i) =>
      contextSummaries[i] ? `${contextSummaries[i]}\n${content}` : content,
    );
    const vectors = await embeddings.embed(embedInputs);

    report('saving', 92, 'Writing to your index');

    const document = await db.knowledgeDocument.create({
      data: {
        sourceId,
        title: parsed.title.slice(0, 300),
        mimeType: parsed.mimeType,
        sizeBytes: Buffer.byteLength(parsed.text, 'utf8'),
        content: trimToSentence(parsed.text, MAX_DOC_CONTENT),
        chunkCount: chunks.length,
      },
    });

    await db.knowledgeChunk.createMany({
      data: chunks.map((content, i) => ({
        documentId: document.id,
        sourceId,
        idx: i,
        content,
        embedding: serializeVector(vectors[i]),
        embeddingModel: embeddings.id,
        contextSummary: contextSummaries[i] || '',
        tokens: Math.ceil(content.length / 4),
        metaJson: JSON.stringify({ title: parsed.title.slice(0, 200) }),
      })),
    });

    await db.knowledgeSource.update({
      where: { id: sourceId },
      data: {
        status: 'ready',
        metaJson: JSON.stringify({
          title: parsed.title.slice(0, 300),
          chunks: chunks.length,
          mimeType: parsed.mimeType,
          fileKind: input.fileKind || (type === 'url' ? 'url' : type === 'text' ? 'text' : 'document'),
          ...(input.meta || {}),
        }),
      },
    });

    log.info?.(`Ingested source ${sourceId}: ${chunks.length} chunks (${embeddings.id}, enriched: ${contextSummaries.some((c, i) => c !== `From "${parsed.title}", part ${i + 1} of ${chunks.length}`)}) for ${userId}`);
    return { documentId: document.id, title: parsed.title, chunks: chunks.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db.knowledgeSource.update({ where: { id: sourceId }, data: { status: 'failed', error: message.slice(0, 500) } });
    throw error;
  }
}

/** Create a source row + ingest in one step. */
export async function createAndIngestSource(input: Omit<IngestInput, 'sourceId'> & { name: string }): Promise<{ sourceId: string; result: IngestResult }> {
  const source = await db.knowledgeSource.create({
    data: {
      userId: input.userId,
      name: input.name.slice(0, 200),
      type: input.type,
      status: 'pending',
      ...(input.fileKind ? { fileKind: input.fileKind } : {}),
    },
  });
  const result = await ingestSource({ ...input, sourceId: source.id, name: input.name });
  // Adopt the parsed title as the source name when the caller used a generic
  // one (URLs take the page title; files take the file name).
  if (input.type !== 'text' || input.name === result.title || input.name === 'Pasted text') {
    await db.knowledgeSource.update({ where: { id: source.id }, data: { name: result.title.slice(0, 200) } });
  }
  return { sourceId: source.id, result };
}

// ─── Retrieval ─────────────────────────────────────────────────────────────

export interface RetrievedChunk {
  content: string;
  score: number;
  documentTitle: string;
  sourceId: string;
  documentId: string;
}

/**
 * Semantic search over the user's knowledge chunks: embed the query, cosine
 * scan (tenant-scoped WHERE before any similarity math — deep-agent parity),
 * return the top-K chunks with document metadata.
 */
export async function retrieveKnowledge(
  userId: string,
  query: string,
  opts: { sourceId?: string; topK?: number } = {},
): Promise<RetrievedChunk[]> {
  const topK = Math.min(Math.max(opts.topK ?? 8, 1), 20);
  const rows = await db.knowledgeChunk.findMany({
    where: {
      sourceId: opts.sourceId,
      source: { userId, status: 'ready' },
    },
    include: { source: { select: { name: true } } },
    take: 2000,
    orderBy: { createdAt: 'desc' },
  });
  if (rows.length === 0) return [];

  const embeddings = await getEmbeddings();
  const [queryVector] = await embeddings.embed([query], { query: true });

  const scored = rows
    .map((row) => {
      const vector = row.embedding ? deserializeVector(new Uint8Array(row.embedding)) : null;
      if (!vector) return null;
      return {
        content: row.content,
        score: cosineSimilarity(queryVector, vector),
        documentTitle: row.source.name,
        sourceId: row.sourceId,
        documentId: row.documentId,
      } satisfies RetrievedChunk;
    })
    .filter((x): x is RetrievedChunk => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Render retrieved chunks as [K#]-cited context for the system prompt /
 * search_knowledge tool (deep-agent formatKnowledgeContext shape).
 */
export function formatKnowledgeContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return '';
  const lines = ['# Knowledge base (retrieved)', ''];
  chunks.forEach((chunk, i) => {
    lines.push(`[K${i + 1}] (${chunk.documentTitle}, relevance ${Math.round(Math.max(chunk.score, 0) * 100)}%)`);
    // Boundary-safe: ends on a sentence terminator or word edge, never mid-word.
    lines.push(trimToSentence(chunk.content, 800));
    lines.push('');
  });
  return lines.join('\n');
}

/** List sources with their documents for the Knowledge tab. */
export async function listKnowledgeSources(userId: string, limit = 100) {
  const sources = await db.knowledgeSource.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      documents: { select: { id: true, title: true, chunkCount: true, sizeBytes: true, mimeType: true } },
    },
  });
  return sources.map((source) => {
    const meta = source.metaJson ? safeParse(source.metaJson) : null;
    // The full structured transcript (sentences/paragraphs/insights) can be
    // ~100 KB for a long lecture — keep it OUT of the list response; the
    // detail endpoint (GET /sources/[id]) serves it to the Studio modal.
    if (meta && 'transcript' in meta) delete meta.transcript;
    // Live progress is only meaningful while in flight — strip it from
    // finished rows so the UI never shows a stale bar.
    if (meta && 'progress' in meta && source.status !== 'pending' && source.status !== 'processing') {
      delete meta.progress;
    }
    return {
      id: source.id,
      name: source.name,
      type: source.type,
      status: source.status,
      error: source.error,
      meta,
      createdAt: source.createdAt.toISOString(),
      documents: source.documents,
    };
  });
}

export async function deleteKnowledgeSource(userId: string, sourceId: string): Promise<boolean> {
  const source = await db.knowledgeSource.findFirst({ where: { id: sourceId, userId }, select: { id: true } });
  if (!source) return false;
  await db.knowledgeChunk.deleteMany({ where: { sourceId } });
  await db.knowledgeDocument.deleteMany({ where: { sourceId } });
  await db.knowledgeSource.delete({ where: { id: sourceId } });
  // Also drop the retained originals (audio-store + file-store), best-effort.
  deleteRetainedAudio(sourceId);
  deleteRetainedOriginal(sourceId);
  return true;
}

// ─── Re-indexing (quality upgrade for already-ingested sources) ────────────

/**
 * Re-chunk an already-ingested source with the sentence-aware chunker +
 * extraction normalization, re-enrich and re-embed. Upgrades sources that
 * were ingested with the old character-stride chunker (mid-word cuts) without
 * losing provenance: the document row is UPDATED in place (same id), chunks
 * are replaced, and metaJson keeps its non-progress keys.
 *
 * Best available text is used, in order: (1) re-parse the retained original
 * file (freshest, full length — PDF/DOCX/…), (2) re-fetch a URL source, (3)
 * the stored document content when it is complete (sizeBytes ≤ MAX_DOC_
 * CONTENT). Sources whose stored text was truncated with no retained
 * original fail with a re-upload hint.
 */
export async function reindexKnowledgeSource(userId: string, sourceId: string): Promise<{ chunks: number }> {
  const source = await db.knowledgeSource.findFirst({
    where: { id: sourceId, userId },
    select: { id: true, name: true, status: true, type: true, metaJson: true },
  });
  if (!source) throw new Error('Source not found');
  if (source.status === 'pending' || source.status === 'processing') {
    throw new Error('This source is already indexing — wait for it to finish');
  }
  const doc = await db.knowledgeDocument.findFirst({
    where: { sourceId },
    orderBy: { createdAt: 'desc' },
  });
  if (!doc) throw new Error('No indexed document found for this source');

  const meta = source.metaJson ? safeParse(source.metaJson) : null;

  // ── Resolve the best available text ──
  let text: string | null = null;
  let title = doc.title;
  let mimeType = doc.mimeType;
  const retained = readRetainedOriginal(sourceId);
  if (retained) {
    try {
      const parsed = await parseFile(source.name || 'source.bin', retained.buffer);
      text = parsed.text;
      title = parsed.title;
      mimeType = parsed.mimeType;
    } catch {
      // Retained original is a media file (audio/video/image) or unparsable —
      // fall through to the stored document content below.
    }
  }
  if (text == null && source.type === 'url') {
    const sourceUrl = typeof meta?.sourceUrl === 'string' ? meta.sourceUrl : null;
    if (sourceUrl && /^https?:\/\//i.test(sourceUrl)) {
      try {
        const parsed = await parseUrl(sourceUrl);
        text = parsed.text;
        title = parsed.title;
        mimeType = parsed.mimeType;
      } catch {
        // Network/SSRF failure — fall through to stored content.
      }
    }
  }
  if (text == null) {
    // Stored content is only trustworthy when it was NOT truncated at ingest
    // (old ingest stored parsed.text.slice(0, MAX_DOC_CONTENT) verbatim, so a
    // complete document is always strictly shorter than the cap).
    const stored = doc.content ?? '';
    if (!stored || stored.length >= MAX_DOC_CONTENT) {
      throw new Error(
        'The original file is no longer retained and the stored text is incomplete — re-upload the file to re-index it',
      );
    }
    text = stored;
  }

  const report = (stage: string, percent: number, note?: string) =>
    void updateSourceProgress(sourceId, stage, percent, note);

  await db.knowledgeSource.update({ where: { id: sourceId }, data: { status: 'processing', error: null } });
  try {
    report('chunking', 30, 'Re-splitting into sentence-clean passages');
    const chunks = chunkText(text);
    if (chunks.length === 0) throw new Error('No text could be extracted from the source');

    report('enriching', 55, `Summarizing ${chunks.length} passages`);
    const contextSummaries = await enrichChunksWithContext(title, chunks);

    report('embedding', 75, 'Regenerating embeddings');
    const embeddings = await getEmbeddings();
    const embedInputs = chunks.map((content, i) =>
      contextSummaries[i] ? `${contextSummaries[i]}\n${content}` : content,
    );
    const vectors = await embeddings.embed(embedInputs);

    report('saving', 90, 'Replacing indexed passages');
    await db.knowledgeChunk.deleteMany({ where: { sourceId } });
    await db.knowledgeDocument.update({
      where: { id: doc.id },
      data: {
        title: title.slice(0, 300),
        mimeType,
        sizeBytes: Buffer.byteLength(text, 'utf8'),
        content: trimToSentence(text, MAX_DOC_CONTENT),
        chunkCount: chunks.length,
      },
    });
    await db.knowledgeChunk.createMany({
      data: chunks.map((content, i) => ({
        documentId: doc.id,
        sourceId,
        idx: i,
        content,
        embedding: serializeVector(vectors[i]),
        embeddingModel: embeddings.id,
        contextSummary: contextSummaries[i] || '',
        tokens: Math.ceil(content.length / 4),
        metaJson: JSON.stringify({ title: title.slice(0, 200) }),
      })),
    });

    await db.knowledgeSource.update({
      where: { id: sourceId },
      data: {
        status: 'ready',
        error: null,
        metaJson: JSON.stringify({
          ...(meta || {}),
          title: title.slice(0, 300),
          chunks: chunks.length,
          mimeType,
          reindexedAt: new Date().toISOString(),
        }),
      },
    });

    log.info?.(`Re-indexed source ${sourceId}: ${chunks.length} sentence-aligned chunks (${embeddings.id})`);
    return { chunks: chunks.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db.knowledgeSource.update({ where: { id: sourceId }, data: { status: 'failed', error: message.slice(0, 500) } });
    throw error;
  }
}

function safeParse(json: string): Record<string, unknown> | null {
  try {
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}
