"use strict";
exports.id = 5556;
exports.ids = [5556];
exports.modules = {

/***/ 315072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L7: () => (/* binding */ deleteRetainedOriginal),
/* harmony export */   VW: () => (/* binding */ retainOriginalFile),
/* harmony export */   ab: () => (/* binding */ resolveServeMime),
/* harmony export */   jt: () => (/* binding */ retainedOriginalPath),
/* harmony export */   oq: () => (/* binding */ readRetainedOriginal)
/* harmony export */ });
/* unused harmony exports fileStorePath, sniffFileMime, isRenderableOriginal */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/**
 * knowledge/file-store.ts — original-file retention for the Knowledge Library.
 *
 * The RAG pipeline extracts TEXT from every source (transcripts, OCR, parsed
 * documents), but the ORIGINAL bytes were historically discarded for
 * everything except audio (audio-store). Three features now need the
 * originals:
 *
 *   1. "Show my own X-ray and ask me about it" — the generation deep agent
 *      attaches retained image/video/audio files to the questions it saves
 *      (imageUrl/audioUrl/videoUrl → GET /api/knowledge/sources/[id]/file).
 *   2. "Preview my data in its original view" — the SourceViewerModal's
 *      "Original file" tab renders PDFs in an embedded viewer, images
 *      full-size, audio/video in native players.
 *   3. Advanced citations — "open the original PDF next to the highlighted
 *      passage" needs the real file, not the extracted text.
 *
 * Store layout: upload/file-store/<sourceId>.bin (extension-less, exactly the
 * audio-store pattern) + { originalMime, originalBytes, originalName } in the
 * source's metaJson. Serving is owner-gated with HTTP Range support in
 * /api/knowledge/sources/[id]/file/route.ts.
 *
 * Audio sources uploaded through the ADVANCED audio pipeline keep using
 * audio-store (their playback path); the file route checks BOTH stores.
 */ 

const FILE_STORE = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'upload', 'file-store');
const MAX_RETAIN_BYTES = 200 * 1024 * 1024; // matches the upload cap
function fileStorePath(sourceId) {
    return path__WEBPACK_IMPORTED_MODULE_1___default().join(FILE_STORE, `${sourceId}.bin`);
}
/** Path of the retained original for a source, whichever store holds it. */ function retainedOriginalPath(sourceId) {
    const p = fileStorePath(sourceId);
    if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(p)) return p;
    // Legacy path: audio uploaded through the advanced pipeline (audio-store).
    const audio = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'upload', 'audio-store', `${sourceId}.bin`);
    if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(audio)) return audio;
    return null;
}
/** Magic-byte sniffing for the common browser-renderable types we retain. */ function sniffFileMime(buf) {
    if (buf.length >= 12) {
        // Images
        if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
        if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
        if (buf.subarray(0, 6).toString('ascii') === 'GIF89a' || buf.subarray(0, 6).toString('ascii') === 'GIF87a') return 'image/gif';
        if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
        if (buf.subarray(4, 8).toString('ascii') === 'ftyp') {
            // ISO container: could be mp4/m4a/mov/heic — disambiguate by brand
            const brand = buf.subarray(8, 12).toString('ascii').toLowerCase();
            if (brand.startsWith('mif1') || brand.startsWith('msf1') || brand.startsWith('heic') || brand.startsWith('heix')) return 'image/heic';
            if (brand.startsWith('qt')) return 'video/quicktime';
            return 'video/mp4';
        }
        // Documents
        if (buf.subarray(0, 5).toString('ascii') === '%PDF-') return 'application/pdf';
        if (buf.subarray(0, 2).toString('ascii') === 'BM') return 'image/bmp';
        if (buf.subarray(0, 4).toString('ascii') === 'II*\u0000' || buf.subarray(0, 4).toString('ascii') === 'MM\u0000*') return 'image/tiff';
        // Audio / video containers
        if (buf[0] === 0x1a && buf[1] === 0x45 && (buf[2] & 0xf0) === 0x00) return 'video/webm'; // EBML (webm/mkv)
        if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) return 'audio/mpeg'; // ID3
        if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return 'audio/mpeg'; // MPEG frame sync
        if (buf.subarray(0, 4).toString('ascii') === 'OggS') return 'audio/ogg';
        if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WAVE') return 'audio/wav';
        if (buf.subarray(0, 4).toString('ascii') === 'fLaC') return 'audio/flac';
    }
    return 'application/octet-stream';
}
/**
 * Keep the ORIGINAL file bytes for preview / media attachment / citations.
 * Best-effort: a retention failure never fails ingestion.
 */ function retainOriginalFile(sourceId, buffer, declaredMime) {
    const bytes = buffer.byteLength;
    const sniffed = sniffFileMime(buffer);
    const mime = declaredMime && declaredMime !== 'application/octet-stream' && declaredMime.includes('/') ? declaredMime : sniffed;
    if (bytes === 0 || bytes > MAX_RETAIN_BYTES) return {
        retained: false,
        mime,
        bytes
    };
    try {
        fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(FILE_STORE, {
            recursive: true
        });
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(fileStorePath(sourceId), buffer);
        return {
            retained: true,
            mime,
            bytes
        };
    } catch  {
        return {
            retained: false,
            mime,
            bytes
        };
    }
}
/** Read a retained original back (e.g. to build a data URL for the VLM). */ function readRetainedOriginal(sourceId) {
    const p = retainedOriginalPath(sourceId);
    if (!p) return null;
    try {
        const buffer = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(p);
        if (!buffer.length) return null;
        return {
            buffer,
            path: p
        };
    } catch  {
        return null;
    }
}
/** Remove the retained original when its source is deleted. */ function deleteRetainedOriginal(sourceId) {
    try {
        const p = fileStorePath(sourceId);
        if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(p)) fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(p, {
            force: true
        });
    } catch  {
    // best-effort cleanup
    }
}
/**
 * Resolve the display mime for serving: prefer the mime recorded at ingestion
 * (metaJson.originalMime), fall back to sniffing the stored bytes.
 */ function resolveServeMime(file, metaJson) {
    try {
        const meta = metaJson ? JSON.parse(metaJson) : {};
        const declared = meta.originalMime ?? meta.audioMime;
        if (typeof declared === 'string' && declared.includes('/')) return declared;
    } catch  {
    // fall through to sniffing
    }
    const head = Buffer.alloc(16);
    const fd = fs__WEBPACK_IMPORTED_MODULE_0___default().openSync(file, 'r');
    try {
        fs__WEBPACK_IMPORTED_MODULE_0___default().readSync(fd, head, 0, 16, 0);
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_0___default().closeSync(fd);
    }
    const sniffed = sniffFileMime(head);
    return sniffed;
}
/** Which file kinds get a browser-renderable "original view". */ function isRenderableOriginal(mime) {
    return mime === 'application/pdf' || mime.startsWith('image/') || mime.startsWith('audio/') || mime.startsWith('video/');
}


/***/ }),

/***/ 375556:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DY: () => (/* binding */ deleteKnowledgeSource),
/* harmony export */   Kk: () => (/* binding */ ingestSource),
/* harmony export */   OH: () => (/* binding */ updateSourceProgress),
/* harmony export */   V0: () => (/* binding */ reindexKnowledgeSource),
/* harmony export */   f8: () => (/* binding */ createAndIngestSource),
/* harmony export */   parseFile: () => (/* binding */ parseFile),
/* harmony export */   parseUrl: () => (/* binding */ parseUrl),
/* harmony export */   ry: () => (/* binding */ listKnowledgeSources)
/* harmony export */ });
/* unused harmony exports CHUNK_SIZE, CHUNK_OVERLAP, chunkText, sliceEnrichmentBatches, enrichChunksWithContext, retrieveKnowledge, formatKnowledgeContext */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42784);
/* harmony import */ var _llm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(387079);
/* harmony import */ var _audio_pipeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69985);
/* harmony import */ var _file_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(315072);
/* harmony import */ var _text_quality__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(827921);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentKnowledge');
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
 */ const CHUNK_SIZE = _text_quality__WEBPACK_IMPORTED_MODULE_6__/* .DEFAULT_CHUNK_SIZE */ .WI;
const CHUNK_OVERLAP = _text_quality__WEBPACK_IMPORTED_MODULE_6__/* .DEFAULT_CHUNK_OVERLAP */ .eY;
const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).
// Was 15 MB — raised 2026-11-03: matches the route + tier ceiling so
// the resumable uploadId path isn't re-blocked here after the tier
// matrix already accepted the file. The tier matrix (Stage 10) is the
// per-user limit; this is just the processing ceiling.
const MAX_DOC_CONTENT = 100000; // original text stored truncated
const TEXT_EXTENSIONS = new Set([
    'txt',
    'md',
    'markdown',
    'csv',
    'tsv',
    'json',
    'log',
    'html',
    'htm',
    'xml'
]);
const CODE_EXTENSIONS = new Set([
    'js',
    'ts',
    'tsx',
    'jsx',
    'py',
    'go',
    'rs',
    'java',
    'sh',
    'sql',
    'yml',
    'yaml',
    'toml',
    'css',
    'c',
    'cpp',
    'r',
    'm'
]);
// ─── Chunking ──────────────────────────────────────────────────────────────
/**
 * Structure-aware, SENTENCE-ALIGNED chunking (see text-quality.ts). Paragraphs
 * accumulate up to CHUNK_SIZE; oversized paragraphs are split into sentences
 * and packed with sentence-aligned overlap — words are never cut in half and
 * chunks end on sentence boundaries whenever punctuation exists. Punctuation-
 * free run-ons (ASR stretches, data dumps) fall back to word-boundary splits.
 */ function chunkText(text) {
    return (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .chunkTextQuality */ .y5)(text, {
        size: CHUNK_SIZE,
        overlap: CHUNK_OVERLAP
    });
}
async function parsePdf(buffer) {
    const { getDocumentProxy, extractText } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 633925));
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, {
        mergePages: true
    });
    // unpdf output keeps soft line wraps (measured: 3,049 letter-\n-letter
    // breaks in a 436 KB textbook PDF) and line-end hyphenation — normalize
    // so sentences flow and hyphenated words are repaired before chunking.
    return (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .normalizeExtractedText */ .tH)(text);
}
/** Parse an uploaded file buffer by extension. Throws on unsupported types. */ async function parseFile(name, buffer) {
    if (buffer.byteLength > MAX_FILE_BYTES) throw new Error(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
    const ext = (name.split('.').pop() ?? '').toLowerCase();
    if (ext === 'pdf') {
        const text = await parsePdf(buffer);
        if (!text.trim()) throw new Error('PDF contains no extractable text (scanned image?)');
        return {
            title: name,
            mimeType: 'application/pdf',
            text
        };
    }
    if (TEXT_EXTENSIONS.has(ext) || CODE_EXTENSIONS.has(ext)) {
        // User-authored content — kept VERBATIM (no extraction normalization:
        // markdown lists, code indentation and CSV columns must not be touched).
        const text = buffer.toString('utf8');
        if (!text.trim()) throw new Error('File is empty');
        const mime = ext === 'md' || ext === 'markdown' ? 'text/markdown' : ext === 'csv' ? 'text/csv' : ext === 'json' ? 'application/json' : ext === 'html' || ext === 'htm' ? 'text/html' : 'text/plain';
        return {
            title: name,
            mimeType: mime,
            text
        };
    }
    // Office containers / EPUB — delegate to the rich media parser (slides,
    // notes, embedded images, sheets, chapters). Lazy import avoids a cycle.
    if ([
        'docx',
        'pptx',
        'xlsx',
        'epub'
    ].includes(ext)) {
        const { parseMediaFile } = await Promise.all(/* import() */[__webpack_require__.e(6899), __webpack_require__.e(5390)]).then(__webpack_require__.bind(__webpack_require__, 256899));
        const parsed = await parseMediaFile(name, buffer, '');
        // Machine-extracted → normalize soft wraps / hyphenation like PDFs.
        return {
            title: parsed.title,
            mimeType: parsed.mimeType,
            text: (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .normalizeExtractedText */ .tH)(parsed.text)
        };
    }
    throw new Error(`Unsupported file type ".${ext}". Supported: PDF, DOCX, PPTX, XLSX, EPUB, TXT, MD, CSV, TSV, JSON, HTML, XML, LOG and common source-code files.`);
}
/** Fetch a URL through the SSRF-guarded reader used by fetch_medical_reference. */ async function parseUrl(url) {
    const { fetchPageText, htmlToText } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(1890), __webpack_require__.e(6776)]).then(__webpack_require__.bind(__webpack_require__, 886776));
    try {
        // Prefer the ZAI gateway page reader (renders JS-heavy pages)
        const { createZAI } = await __webpack_require__.e(/* import() */ 6389).then(__webpack_require__.bind(__webpack_require__, 376389));
        const zai = await createZAI();
        if (zai?.functions?.invoke) {
            const page = await zai.functions.invoke('page_reader', {
                url
            });
            if (page?.data?.html) {
                return {
                    title: page.data.title || new URL(url).hostname,
                    mimeType: 'text/html',
                    text: (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .normalizeExtractedText */ .tH)(htmlToText(page.data.html))
                };
            }
        }
    } catch  {
    // Gateway unavailable — fall through to the direct fetch.
    }
    const fetched = await fetchPageText(url);
    return {
        title: fetched.title,
        mimeType: 'text/html',
        text: fetched.content
    };
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
 */ function sliceEnrichmentBatches(chunks, cap, batchSize) {
    if (chunks.length === 0 || cap <= 0) return [];
    const safeCap = Math.max(1, Math.floor(cap));
    const safeBatch = Math.max(1, Math.min(Math.floor(batchSize), safeCap));
    const limit = Math.min(chunks.length, safeCap);
    const out = [];
    for(let i = 0; i < limit; i += safeBatch){
        out.push(chunks.slice(i, Math.min(i + safeBatch, limit)));
    }
    return out;
}
async function enrichChunksWithContext(title, chunks, opts) {
    const fallback = chunks.map((_, i)=>`From "${title}", part ${i + 1} of ${chunks.length}`);
    const MAX_ENRICHED = opts?.maxEnriched ?? (Number(process.env.MEDQ_ENRICHMENT_CAP) || 120);
    const BATCH_SIZE = opts?.batchSize ?? (Number(process.env.MEDQ_ENRICHMENT_BATCH_SIZE) || 40);
    const enriched = fallback.slice();
    const batches = sliceEnrichmentBatches(chunks, MAX_ENRICHED, BATCH_SIZE);
    let offset = 0;
    for (const batch of batches){
        const listing = batch.map((c, i)=>`CHUNK ${i + 1}:\n${c.slice(0, 500)}`).join('\n\n');
        const raw = await (0,_llm__WEBPACK_IMPORTED_MODULE_3__/* .knowledgeLLM */ .E)({
            system: `You annotate document chunks for a retrieval system. The document is "${title}". For EACH chunk, write ONE concise sentence (max 25 words) describing what specific information it contains and how it fits in the document. Refer to concrete entities/numbers in the chunk so the blurb is distinguishable. Output ONLY a JSON array of strings, one per chunk, same order.`,
            prompt: `${listing}\n\nReturn the JSON array of ${batch.length} context sentences now.`,
            maxOutputTokens: 2000,
            temperature: 0,
            timeoutMs: 45000
        });
        if (!raw) break; // LLM unavailable — keep fallback blurbs for the rest
        try {
            const match = raw.match(/\[[\s\S]*\]/);
            if (!match) break;
            const parsed = JSON.parse(match[0]);
            let applied = 0;
            for(let i = 0; i < batch.length; i++){
                const blurb = parsed[i];
                if (typeof blurb === 'string' && blurb.trim().length > 8) {
                    enriched[offset + i] = blurb.trim().slice(0, 300);
                    applied++;
                }
            }
            if (applied === 0) break;
        } catch  {
            break;
        }
        offset += batch.length;
    }
    return enriched;
}
/**
 * Merge a live progress marker into the source's metaJson WITHOUT clobbering
 * other meta keys. Cheap single-row update — safe to call at every pipeline
 * stage (single background job owns a source at a time). The final `ready`
 * write replaces metaJson wholesale, which clears the progress marker.
 */ async function updateSourceProgress(sourceId, stage, percent, note) {
    try {
        const source = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.findUnique({
            where: {
                id: sourceId
            },
            select: {
                status: true,
                metaJson: true
            }
        });
        // Only track live progress while actually in flight — never touch a
        // finished (ready/failed) row from a stale async path.
        if (!source || source.status !== 'pending' && source.status !== 'processing') return;
        const meta = source.metaJson ? safeParse(source.metaJson) : null;
        const progress = {
            stage,
            percent: Math.max(0, Math.min(100, Math.round(percent))),
            at: new Date().toISOString()
        };
        if (note) progress.note = note.slice(0, 200);
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: sourceId
            },
            data: {
                metaJson: JSON.stringify({
                    ...meta || {},
                    progress
                })
            }
        });
    } catch  {
    // Progress reporting is best-effort — never fail ingestion over it.
    }
}
/**
 * Parse → chunk → contextual-enrich → embed → persist for one source. Sets
 * source status processing → ready/failed. Safe to call inline from an API
 * route. Media inputs pass `parsed` (from parseMediaFile) + `fileKind`.
 */ async function ingestSource(input) {
    const { userId, sourceId, type, payload } = input;
    const report = (stage, percent, note)=>void (input.onProgress ? updateSourceProgress(sourceId, stage, percent, note) : undefined);
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            status: 'processing',
            error: null,
            ...input.fileKind ? {
                fileKind: input.fileKind
            } : {}
        }
    });
    try {
        let parsed;
        if (input.parsed) {
            parsed = input.parsed;
        } else if (type === 'text') {
            const content = payload.content?.trim();
            if (!content) throw new Error('Text content is empty');
            parsed = {
                title: (payload.title ?? input.name ?? 'Pasted text').slice(0, 200),
                mimeType: 'text/plain',
                text: content
            };
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
        const embeddings = await (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
        const embedInputs = chunks.map((content, i)=>contextSummaries[i] ? `${contextSummaries[i]}\n${content}` : content);
        const vectors = await embeddings.embed(embedInputs);
        report('saving', 92, 'Writing to your index');
        const document = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeDocument.create({
            data: {
                sourceId,
                title: parsed.title.slice(0, 300),
                mimeType: parsed.mimeType,
                sizeBytes: Buffer.byteLength(parsed.text, 'utf8'),
                content: (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .trimToSentence */ .B_)(parsed.text, MAX_DOC_CONTENT),
                chunkCount: chunks.length
            }
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeChunk.createMany({
            data: chunks.map((content, i)=>({
                    documentId: document.id,
                    sourceId,
                    idx: i,
                    content,
                    embedding: (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .serializeVector */ ._H)(vectors[i]),
                    embeddingModel: embeddings.id,
                    contextSummary: contextSummaries[i] || '',
                    tokens: Math.ceil(content.length / 4),
                    metaJson: JSON.stringify({
                        title: parsed.title.slice(0, 200)
                    })
                }))
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: sourceId
            },
            data: {
                status: 'ready',
                metaJson: JSON.stringify({
                    title: parsed.title.slice(0, 300),
                    chunks: chunks.length,
                    mimeType: parsed.mimeType,
                    fileKind: input.fileKind || (type === 'url' ? 'url' : type === 'text' ? 'text' : 'document'),
                    ...input.meta || {}
                })
            }
        });
        log.info?.(`Ingested source ${sourceId}: ${chunks.length} chunks (${embeddings.id}, enriched: ${contextSummaries.some((c, i)=>c !== `From "${parsed.title}", part ${i + 1} of ${chunks.length}`)}) for ${userId}`);
        return {
            documentId: document.id,
            title: parsed.title,
            chunks: chunks.length
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: sourceId
            },
            data: {
                status: 'failed',
                error: message.slice(0, 500)
            }
        });
        throw error;
    }
}
/** Create a source row + ingest in one step. */ async function createAndIngestSource(input) {
    const source = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.create({
        data: {
            userId: input.userId,
            name: input.name.slice(0, 200),
            type: input.type,
            status: 'pending',
            ...input.fileKind ? {
                fileKind: input.fileKind
            } : {}
        }
    });
    const result = await ingestSource({
        ...input,
        sourceId: source.id,
        name: input.name
    });
    // Adopt the parsed title as the source name when the caller used a generic
    // one (URLs take the page title; files take the file name).
    if (input.type !== 'text' || input.name === result.title || input.name === 'Pasted text') {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: source.id
            },
            data: {
                name: result.title.slice(0, 200)
            }
        });
    }
    return {
        sourceId: source.id,
        result
    };
}
/**
 * Semantic search over the user's knowledge chunks: embed the query, cosine
 * scan (tenant-scoped WHERE before any similarity math — deep-agent parity),
 * return the top-K chunks with document metadata.
 */ async function retrieveKnowledge(userId, query, opts = {}) {
    const topK = Math.min(Math.max(opts.topK ?? 8, 1), 20);
    const rows = await db.knowledgeChunk.findMany({
        where: {
            sourceId: opts.sourceId,
            source: {
                userId,
                status: 'ready'
            }
        },
        include: {
            source: {
                select: {
                    name: true
                }
            }
        },
        take: 2000,
        orderBy: {
            createdAt: 'desc'
        }
    });
    if (rows.length === 0) return [];
    const embeddings = await getEmbeddings();
    const [queryVector] = await embeddings.embed([
        query
    ], {
        query: true
    });
    const scored = rows.map((row)=>{
        const vector = row.embedding ? deserializeVector(new Uint8Array(row.embedding)) : null;
        if (!vector) return null;
        return {
            content: row.content,
            score: cosineSimilarity(queryVector, vector),
            documentTitle: row.source.name,
            sourceId: row.sourceId,
            documentId: row.documentId
        };
    }).filter((x)=>x !== null).sort((a, b)=>b.score - a.score).slice(0, topK);
    return scored;
}
/**
 * Render retrieved chunks as [K#]-cited context for the system prompt /
 * search_knowledge tool (deep-agent formatKnowledgeContext shape).
 */ function formatKnowledgeContext(chunks) {
    if (chunks.length === 0) return '';
    const lines = [
        '# Knowledge base (retrieved)',
        ''
    ];
    chunks.forEach((chunk, i)=>{
        lines.push(`[K${i + 1}] (${chunk.documentTitle}, relevance ${Math.round(Math.max(chunk.score, 0) * 100)}%)`);
        // Boundary-safe: ends on a sentence terminator or word edge, never mid-word.
        lines.push(trimToSentence(chunk.content, 800));
        lines.push('');
    });
    return lines.join('\n');
}
/** List sources with their documents for the Knowledge tab. */ async function listKnowledgeSources(userId, limit = 100) {
    const sources = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        include: {
            documents: {
                select: {
                    id: true,
                    title: true,
                    chunkCount: true,
                    sizeBytes: true,
                    mimeType: true
                }
            }
        }
    });
    return sources.map((source)=>{
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
            documents: source.documents
        };
    });
}
async function deleteKnowledgeSource(userId, sourceId) {
    const source = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.findFirst({
        where: {
            id: sourceId,
            userId
        },
        select: {
            id: true
        }
    });
    if (!source) return false;
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeChunk.deleteMany({
        where: {
            sourceId
        }
    });
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeDocument.deleteMany({
        where: {
            sourceId
        }
    });
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.delete({
        where: {
            id: sourceId
        }
    });
    // Also drop the retained originals (audio-store + file-store), best-effort.
    (0,_audio_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .deleteRetainedAudio */ .Wq)(sourceId);
    (0,_file_store__WEBPACK_IMPORTED_MODULE_5__/* .deleteRetainedOriginal */ .L7)(sourceId);
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
 */ async function reindexKnowledgeSource(userId, sourceId) {
    const source = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.findFirst({
        where: {
            id: sourceId,
            userId
        },
        select: {
            id: true,
            name: true,
            status: true,
            type: true,
            metaJson: true
        }
    });
    if (!source) throw new Error('Source not found');
    if (source.status === 'pending' || source.status === 'processing') {
        throw new Error('This source is already indexing — wait for it to finish');
    }
    const doc = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeDocument.findFirst({
        where: {
            sourceId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    if (!doc) throw new Error('No indexed document found for this source');
    const meta = source.metaJson ? safeParse(source.metaJson) : null;
    // ── Resolve the best available text ──
    let text = null;
    let title = doc.title;
    let mimeType = doc.mimeType;
    const retained = (0,_file_store__WEBPACK_IMPORTED_MODULE_5__/* .readRetainedOriginal */ .oq)(sourceId);
    if (retained) {
        try {
            const parsed = await parseFile(source.name || 'source.bin', retained.buffer);
            text = parsed.text;
            title = parsed.title;
            mimeType = parsed.mimeType;
        } catch  {
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
            } catch  {
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
            throw new Error('The original file is no longer retained and the stored text is incomplete — re-upload the file to re-index it');
        }
        text = stored;
    }
    const report = (stage, percent, note)=>void updateSourceProgress(sourceId, stage, percent, note);
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            status: 'processing',
            error: null
        }
    });
    try {
        report('chunking', 30, 'Re-splitting into sentence-clean passages');
        const chunks = chunkText(text);
        if (chunks.length === 0) throw new Error('No text could be extracted from the source');
        report('enriching', 55, `Summarizing ${chunks.length} passages`);
        const contextSummaries = await enrichChunksWithContext(title, chunks);
        report('embedding', 75, 'Regenerating embeddings');
        const embeddings = await (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
        const embedInputs = chunks.map((content, i)=>contextSummaries[i] ? `${contextSummaries[i]}\n${content}` : content);
        const vectors = await embeddings.embed(embedInputs);
        report('saving', 90, 'Replacing indexed passages');
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeChunk.deleteMany({
            where: {
                sourceId
            }
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeDocument.update({
            where: {
                id: doc.id
            },
            data: {
                title: title.slice(0, 300),
                mimeType,
                sizeBytes: Buffer.byteLength(text, 'utf8'),
                content: (0,_text_quality__WEBPACK_IMPORTED_MODULE_6__/* .trimToSentence */ .B_)(text, MAX_DOC_CONTENT),
                chunkCount: chunks.length
            }
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeChunk.createMany({
            data: chunks.map((content, i)=>({
                    documentId: doc.id,
                    sourceId,
                    idx: i,
                    content,
                    embedding: (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .serializeVector */ ._H)(vectors[i]),
                    embeddingModel: embeddings.id,
                    contextSummary: contextSummaries[i] || '',
                    tokens: Math.ceil(content.length / 4),
                    metaJson: JSON.stringify({
                        title: title.slice(0, 200)
                    })
                }))
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: sourceId
            },
            data: {
                status: 'ready',
                error: null,
                metaJson: JSON.stringify({
                    ...meta || {},
                    title: title.slice(0, 300),
                    chunks: chunks.length,
                    mimeType,
                    reindexedAt: new Date().toISOString()
                })
            }
        });
        log.info?.(`Re-indexed source ${sourceId}: ${chunks.length} sentence-aligned chunks (${embeddings.id})`);
        return {
            chunks: chunks.length
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
            where: {
                id: sourceId
            },
            data: {
                status: 'failed',
                error: message.slice(0, 500)
            }
        });
        throw error;
    }
}
function safeParse(json) {
    try {
        return JSON.parse(json);
    } catch  {
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;