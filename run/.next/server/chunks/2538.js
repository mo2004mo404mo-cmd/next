"use strict";
exports.id = 2538;
exports.ids = [2538];
exports.modules = {

/***/ 42784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bk: () => (/* binding */ getEmbeddings),
/* harmony export */   H6: () => (/* binding */ deserializeVector),
/* harmony export */   Lb: () => (/* binding */ cosineSimilarity),
/* harmony export */   _H: () => (/* binding */ serializeVector),
/* harmony export */   mF: () => (/* binding */ LocalHashEmbeddings)
/* harmony export */ });
/* unused harmony exports EMBEDDING_DIM, BgeLocalEmbeddings, OpenAICompatibleEmbeddings */
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(977598);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentEmbeddings');
/**
 * Embeddings subsystem — deep-agent-platform parity (compare-and-integrate-4).
 *
 * Three providers behind one tiny interface:
 *
 *   OpenAICompatibleEmbeddings — POST {baseUrl}/embeddings against any
 *   configured OpenAI-compatible endpoint (BYOK keys, self-hosted vLLM…).
 *
 *   BgeLocalEmbeddings — TRUE neural embeddings running fully locally via
 *   @huggingface/transformers (Xenova/bge-small-en-v1.5, 384-d, ~25MB ONNX,
 *   CPU ~10ms/text). Strong general-purpose English retrieval (BEIR-class).
 *   Used when no remote embedding endpoint is configured — this is the
 *   default in sandbox/offline deployments and keeps the dense half of
 *   hybrid retrieval genuinely semantic (not lexical hashing).
 *
 *   LocalHashEmbeddings — deterministic zero-dependency LAST resort: hashed
 *   character trigrams + token bigrams into a signed 256-d vector with TF
 *   log-weighting and L2 normalization. Lexical-ish similarity rather than
 *   neural semantics — only reached when transformers.js cannot load (e.g.
 *   no network for the one-time model download AND no cached weights).
 *
 * Vectors are stored in Postgres `Bytes` columns as serialized Float32Array
 * and compared with plain cosine (they are pre-normalized, so cosine == dot).
 */ const EMBEDDING_DIM = 256;
// ─── Local hashed-trigram embedder ────────────────────────────────────────
class LocalHashEmbeddings {
    embed(texts) {
        return Promise.resolve(texts.map((text)=>this.embedOne(text)));
    }
    /** Signed feature hashing of weighted n-grams (see module doc). */ embedOne(raw) {
        const vec = new Float32Array(EMBEDDING_DIM);
        const normalized = raw.toLowerCase().replace(/\s+/g, ' ').trim();
        if (!normalized) return vec;
        const tokens = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
        const counts = new Map();
        const bump = (gram, weight)=>{
            counts.set(gram, (counts.get(gram) ?? 0) + weight);
        };
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i];
            // Full token — weight 1
            bump(token, 1);
            // Character trigrams (prefix-anchored) — morphological robustness, 0.5
            const padded = `#${token}`;
            for(let j = 0; j + 3 <= padded.length; j++)bump(padded.slice(j, j + 3), 0.5);
            // Token bigrams — phrase structure, 0.75
            if (i + 1 < tokens.length) bump(`${token}_${tokens[i + 1]}`, 0.75);
        }
        for (const [gram, count] of counts){
            const digest = (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('md5').update(gram).digest();
            const idx = (digest[0] << 8 | digest[1]) % EMBEDDING_DIM;
            const sign = digest[2] % 2 === 0 ? 1 : -1;
            vec[idx] += sign * Math.log(1 + count);
        }
        // L2 normalize
        let norm = 0;
        for(let i = 0; i < EMBEDDING_DIM; i++)norm += vec[i] * vec[i];
        norm = Math.sqrt(norm);
        if (norm > 0) for(let i = 0; i < EMBEDDING_DIM; i++)vec[i] /= norm;
        return vec;
    }
    constructor(){
        this.id = 'local-hash';
        this.model = 'hashed-trigrams-256d';
    }
}
// ─── Local neural embedder (transformers.js / bge-small-en-v1.5) ────────────
/**
 * BGE query-side instruction (from the model card — improves short-query →
 * passage retrieval). Applied ONLY to queries, never to indexed passages.
 */ const BGE_QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';
class BgeLocalEmbeddings {
    getPipeline() {
        if (!this.pipelinePromise) {
            this.pipelinePromise = (async ()=>{
                const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 399253));
                if (mod.env) mod.env.allowLocalModels = false; // always resolve via the hub cache
                const extractor = await mod.pipeline('feature-extraction', this.model, {
                    dtype: 'fp32'
                });
                return extractor;
            })();
            // Allow a later retry if the (one-time) model download fails.
            this.pipelinePromise.catch(()=>{
                this.pipelinePromise = null;
            });
        }
        return this.pipelinePromise;
    }
    async embed(texts, opts) {
        if (texts.length === 0) return [];
        const extractor = await this.getPipeline();
        const inputs = texts.map((t)=>(opts?.query ? BGE_QUERY_PREFIX + t : t).slice(0, 8000));
        const BATCH = 32;
        const out = [];
        for(let i = 0; i < inputs.length; i += BATCH){
            const res = await extractor(inputs.slice(i, i + BATCH), {
                pooling: 'mean',
                normalize: true
            });
            const flat = res.data instanceof Float32Array ? res.data : new Float32Array(res.data);
            const dim = 384; // bge-small output dimension
            const count = Math.floor(flat.length / dim);
            for(let j = 0; j < count; j++)out.push(flat.slice(j * dim, (j + 1) * dim));
        }
        if (out.length !== texts.length) throw new Error(`bge-local shape mismatch: ${out.length} != ${texts.length}`);
        return out;
    }
    constructor(){
        this.id = 'bge-local';
        this.model = 'Xenova/bge-small-en-v1.5';
        this.pipelinePromise = null;
    }
}
// ─── Remote OpenAI-compatible embedder ────────────────────────────────────
class OpenAICompatibleEmbeddings {
    constructor(id, baseUrl, apiKey){
        this.id = id;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.model = 'text-embedding-3-small';
    }
    async embed(texts) {
        const res = await fetch(`${this.baseUrl.replace(/\/$/, '')}/embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                input: texts
            }),
            signal: AbortSignal.timeout(30000)
        });
        if (!res.ok) throw new Error(`embeddings endpoint ${res.status}: ${(await res.text()).slice(0, 200)}`);
        const json = await res.json();
        const vectors = json.data?.map((d)=>Float32Array.from(d.embedding ?? []));
        if (!vectors || vectors.length !== texts.length) throw new Error('embeddings response shape mismatch');
        return vectors;
    }
}
// ─── Provider resolution (cached per process) ─────────────────────────────
const runtime = globalThis;
/**
 * Resolve the process embedder, best-accuracy first:
 *   1. any usable OpenAI-compatible key from the platform's model-config
 *      chain (env / BYOK) — remote neural embeddings;
 *   2. LOCAL neural bge-small-en-v1.5 via transformers.js (no API keys
 *      needed, one-time ~25MB model download, then fully offline);
 *   3. local hashed-trigram (absolute last resort).
 *
 * Cached on globalThis — resolution touches the DB and the model download.
 */ async function getEmbeddings() {
    if (runtime.__medqEmbeddings) return runtime.__medqEmbeddings;
    let resolved = null;
    try {
        const { resolveModel } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(426), __webpack_require__.e(7774), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(4007), __webpack_require__.e(7909), __webpack_require__.e(5566), __webpack_require__.e(8262), __webpack_require__.e(2901)]).then(__webpack_require__.bind(__webpack_require__, 592901));
        for (const candidate of [
            'openai:text-embedding-3-small',
            'deepseek:embedding'
        ]){
            try {
                const config = await resolveModel({
                    modelString: candidate
                });
                if (config.apiKey && config.baseUrl) {
                    const provider = new OpenAICompatibleEmbeddings(`openai-compatible:${config.baseUrl}`, config.baseUrl, config.apiKey);
                    // Health-check before committing (deep-agent pattern: first success wins).
                    await provider.embed([
                        'healthcheck'
                    ]);
                    resolved = provider;
                    break;
                }
            } catch  {
            // Candidate unavailable — try the next.
            }
        }
    } catch  {
    // Resolver unavailable — local fallback.
    }
    if (!resolved) {
        // Local neural — verified working in this environment (probe: batch32 in
        // ~280ms, sim(as,mr)=0.69 vs sim(as,cookies)=0.25). Failure → hash.
        try {
            const bge = new BgeLocalEmbeddings();
            await bge.embed([
                'healthcheck'
            ], {
                query: true
            });
            resolved = bge;
        } catch (e) {
            log.warn?.(`bge-local unavailable (${e instanceof Error ? e.message : e}) — falling back to hashed trigrams`);
        }
    }
    runtime.__medqEmbeddings = resolved ?? new LocalHashEmbeddings();
    log.info?.(`Embeddings provider: ${runtime.__medqEmbeddings.id}`);
    return runtime.__medqEmbeddings;
}
// ─── Vector helpers ────────────────────────────────────────────────────────
/** Cosine similarity for L2-normalized vectors (== dot product). */ function cosineSimilarity(a, b) {
    const len = Math.min(a.length, b.length);
    let dot = 0;
    for(let i = 0; i < len; i++)dot += a[i] * b[i];
    return dot;
}
/** Float32Array → Uint8Array (Prisma `Bytes` column). */ function serializeVector(vector) {
    return new Uint8Array(vector.buffer.slice(0));
}
/** Prisma `Bytes` → Float32Array (tolerates Buffer). */ function deserializeVector(bytes) {
    if (!bytes || bytes.length === 0 || bytes.length % 4 !== 0) return null;
    return new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
}


/***/ }),

/***/ 827921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B_: () => (/* binding */ trimToSentence),
/* harmony export */   WI: () => (/* binding */ DEFAULT_CHUNK_SIZE),
/* harmony export */   eY: () => (/* binding */ DEFAULT_CHUNK_OVERLAP),
/* harmony export */   qL: () => (/* binding */ buildCitationQuote),
/* harmony export */   tH: () => (/* binding */ normalizeExtractedText),
/* harmony export */   y5: () => (/* binding */ chunkTextQuality)
/* harmony export */ });
/* unused harmony exports isHeadingLine, isStructuralLine, splitSentences, joinParagraphFragments */
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
 */ // ─── Chunking defaults (kept identical to the previous pipeline values) ────
const DEFAULT_CHUNK_SIZE = 900;
const DEFAULT_CHUNK_OVERLAP = 150;
// ─── 1. Extraction normalization ───────────────────────────────────────────
/** Compound particles whose line-end hyphen is REAL, not a soft hyphenation.
 *  "Person-to-\nperson" keeps its hyphen; "dys-\npnea" is re-joined. */ const HYPHEN_PARTICLES = new Set([
    'to',
    'of',
    'in',
    'on',
    'and',
    'or',
    'up',
    'out',
    'by',
    'for',
    'non',
    'pre',
    'post',
    'anti',
    'self',
    'counter',
    'cross',
    'over',
    'under',
    'semi',
    'pseudo',
    'half',
    'well',
    'wide',
    'open',
    'full',
    'high',
    'low',
    'new',
    'old',
    'long',
    'short',
    'free',
    'fat',
    'feed',
    'back',
    'ground',
    'water',
    'birth',
    'side'
]);
/** Line length under which a line is treated as structural (heading, bullet,
 *  list item, table row) rather than a soft-wrapped body line. */ const SOFT_WRAP_MIN_LINE = 50;
/** A bare numeric line (1-4 digits, optionally "Page N") — PDF page footers
 *  and headers extract as standalone lines glued into the text flow
 *  ("…early diagnosis\nmatters\n35\nS Clarifications…"). They fake paragraph
 *  boundaries mid-sentence and weld page numbers onto the next page's
 *  heading, so they are removed during normalization. */ const PAGE_NUMBER_LINE = /^(?:page\s*)?\d{1,4}$/i;
/** List / section markers that ALWAYS begin a structural line (bullet,
 *  numbered item, lettered item, section number like "3.4 "). */ const STRUCTURAL_MARKER = /^(?:[•●▪‣◦·]\s*|[-–—*]\s+|\d{1,2}[.)]\s+|[a-zA-Z][.)]\s+|\d{1,3}\s*[—–-]\s+[A-Z]|\d+(?:\.\d+)+\s+[A-Z])/;
/** Small words allowed inside a Title-Case heading. */ const HEADING_SMALL_WORDS = new Set([
    'of',
    'and',
    'the',
    'in',
    'to',
    'a',
    'an',
    'for',
    'on',
    'with',
    'as',
    'by',
    'or',
    'at',
    'vs',
    'from',
    'into',
    'not',
    'no',
    'is',
    'are',
    '&'
]);
/**
 * Title-Case / ALL-CAPS heading detector ("S Clarifications Note — Follow-up
 * Cadence Confirmed", "Four Pillars Confirmed", "TAILORED TREATMENT"): short,
 * no terminal punctuation, and most words start uppercase. Prose sentences
 * virtually never satisfy this (their words are mostly lowercase).
 */ function isHeadingLine(line) {
    if (line.length < 8 || line.length > 90) return false;
    if (/[.!?,;:)\]]$/.test(line)) return false;
    // Citation fragments ("JT. Pediatr Rev. 2008.)", "Clinical Guideline, 2010.)")
    // are continuations, not headings.
    if (/\b(?:et al\b|19\d\d|20\d\d)/.test(line)) return false;
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length < 2) return false;
    let capped = 0;
    let wordChars = 0;
    for (const w of words){
        const clean = w.replace(/[^\p{L}\p{N}]/gu, '');
        if (!clean) continue;
        wordChars++;
        if (/^[A-Z0-9(↓↑→]/u.test(clean) || HEADING_SMALL_WORDS.has(clean.toLowerCase())) capped++;
    }
    if (wordChars < 2) return false;
    return capped / wordChars >= 0.7;
}
/** A line that starts a structural unit (list item / section heading). */ function isStructuralLine(line) {
    return STRUCTURAL_MARKER.test(line) || isHeadingLine(line);
}
/**
 * Clean machine-extracted text (PDF/DOCX/PPTX/EPUB/URL). Returns text whose
 * sentences flow on single lines, hyphenation artifacts are repaired, and
 * paragraph structure (\n\n) is preserved.
 */ function normalizeExtractedText(text) {
    if (!text) return '';
    let t = text.replace(/\r\n?/g, '\n').replace(/\u00ad/g, '') // soft hyphen
    .replace(/[\u200b\u200e\u200f\ufeff]/g, '') // zero-width / BOM
    .replace(/\u00a0/g, ' '); // nbsp
    // 1) Line-end hyphenation: "dys-\npnea" → "dyspnea" (lowercase-lowercase,
    //    prefix not a compound particle). Other hyphen-newline pairs
    //    ("non-\nHodgkin", "IL-\n2") keep the hyphen and just drop the break.
    t = t.replace(/([a-z]{2,})-\n([a-z])/g, (match, before, after)=>{
        if (HYPHEN_PARTICLES.has(before)) return `${before}-${after}`;
        return `${before}${after}`;
    });
    t = t.replace(/-\n(?=[A-Za-z0-9])/g, '-');
    // 1.5) Drop standalone page-number lines (footers/headers). Measured on the
    //      pediatric textbook: the footer number between a page's last sentence
    //      and the next page's continuation is what turned a flowing sentence
    //      into a fake structural boundary (the "18 Hyperendemicity…" glue and
    //      the mid-sentence "…matters / 35 / S Clarifications…" noise).
    t = t.split('\n').filter((line)=>!PAGE_NUMBER_LINE.test(line.trim())).join('\n');
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
    const rebuilt = [];
    for(let i = 0; i < lines.length; i++){
        const line = lines[i].trim();
        if (!line) {
            rebuilt.push('\n'); // blank line → paragraph separator
            continue;
        }
        const next = i + 1 < lines.length ? lines[i + 1].trim() : '';
        const structural = isStructuralLine(line);
        const isSoftWrap = next.length > 0 && !isStructuralLine(next) && (/^[a-z]/.test(next) || line.length >= SOFT_WRAP_MIN_LINE && !/[.!?;:]$/.test(line) && /^[\p{L}\p{N}([{"'“‘–—-]/u.test(next));
        // Structural lines open a NEW paragraph (leading \n on top of the
        // previous line's own trailing \n → \n\n) but still absorb their own
        // wrapped continuations (soft tail). Prose keeps single \n.
        rebuilt.push(structural ? `\n${line}${isSoftWrap ? ' ' : '\n'}` : isSoftWrap ? `${line} ` : `${line}\n`);
    }
    t = rebuilt.join('');
    // 3) Whitespace hygiene: collapse runs of spaces/tabs, cap blank-line runs
    //    at one (paragraph separator), trim the ends.
    t = t.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    return t;
}
// ─── 2. Sentence splitting (abbreviation-aware) ────────────────────────────
const PH = '\u0001'; // placeholder char standing in for a protected '.'
/** Abbreviations whose trailing period must NOT end a sentence. */ const ABBREVIATIONS = /\b(e\.g|i\.e|a\.m|p\.m|etc|vs|cf|ca|approx|Dr|Mr|Mrs|Ms|Prof|Fig|Figs|No|Nos|Vol|Ch|Sec|Inc|Ltd|Jr|Sr|St|ed|eds|dept|univ|et al)\.(?=\s+[A-Z0-9])/gi;
/**
 * Split text into sentences. Terminators are `.`, `!`, `?`, `…` optionally
 * followed by closing quotes/brackets; a split only happens when the next
 * sentence starts with a capital letter, digit, bullet or opening bracket.
 * Decimals ("3.5 mg") and common abbreviations ("Dr.", "e.g.", "et al.")
 * are protected first so they never look like terminators.
 */ function splitSentences(text) {
    if (!text) return [];
    const guarded = text.replace(/(\d)\.(\d)/g, `$1${PH}$2`) // decimals
    .replace(ABBREVIATIONS, (m)=>m.replace(/\./g, PH));
    const parts = [];
    const terminator = /[.!?…]+["')\]]*(?=(\s+[A-Z0-9•\[\(“"']|\s|$))/g;
    let start = 0;
    let m;
    while(m = terminator.exec(guarded)){
        const end = m.index + m[0].length;
        // Never emit tiny fragments ("1.", "a.") — skip those boundaries so list
        // numbering stays glued to its sentence.
        if (end - start >= 8) {
            parts.push(guarded.slice(start, end).trim());
            start = end;
        }
    }
    if (start < guarded.length) parts.push(guarded.slice(start).trim());
    return parts.filter((s)=>s.length > 0).map((s)=>s.replace(new RegExp(PH, 'g'), '.'));
}
/**
 * Pre-join dangling fragments: a paragraph that ends mid-sentence (no
 * terminator) followed by a paragraph starting with a lowercase letter is
 * ONE logical paragraph that a page break or layout artifact split in two.
 * Joining them keeps sentences whole at chunk boundaries — otherwise a cut
 * can land exactly where the page turned, mid-sentence. Shared by
 * chunkTextQuality and the semantic chunker's unit builder.
 */ function joinParagraphFragments(paragraphs) {
    const joined = [];
    for (const paragraph of paragraphs){
        const prev = joined.length ? joined[joined.length - 1] : null;
        if (prev && !/[.!?…:;"')\]]$/.test(prev) && prev.length >= 12 && // a real fragment, not a tiny label
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
 */ function chunkTextQuality(text, opts = {}) {
    const size = Math.max(200, opts.size ?? DEFAULT_CHUNK_SIZE);
    const overlap = Math.min(Math.max(0, opts.overlap ?? DEFAULT_CHUNK_OVERLAP), Math.floor(size / 3));
    const normalized = text.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n');
    const trimmed = normalized.trim();
    if (!trimmed) return [];
    const paragraphs = normalized.split(/\n{2,}/).map((p)=>p.trim()).filter(Boolean);
    const joined = joinParagraphFragments(paragraphs);
    if (joined.length === 1) {
        const single = joined[0];
        if (single.length <= size) return [
            single
        ];
        return packSentences(single, size, overlap);
    }
    const allText = joined.join('\n\n');
    if (allText.length <= size) return [
        allText
    ];
    const chunks = [];
    let current = '';
    const flushCurrent = ()=>{
        const piece = current.trim();
        if (piece) chunks.push(piece);
        current = '';
    };
    for (const paragraph of joined){
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
/** Pack one oversized paragraph's sentences into ≤`size` pieces. */ function packSentences(paragraph, size, overlap) {
    const sentences = splitSentences(paragraph);
    if (sentences.length === 0) return splitByWords(paragraph, size, overlap);
    const pieces = [];
    let cur = [];
    let curLen = 0;
    for (const sentence of sentences){
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
            curLen = cur.reduce((n, s)=>n + s.length + 1, 0);
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
    return pieces.filter((p)=>p.trim().length > 0);
}
/** Longest suffix of `sentences` whose total length stays within `overlap`. */ function overlapTail(sentences, overlap) {
    const tail = [];
    let len = 0;
    for(let i = sentences.length - 1; i >= 0; i--){
        const cost = sentences[i].length + 1;
        if (len + cost > overlap) break;
        tail.unshift(sentences[i]);
        len += cost;
    }
    return tail;
}
/** Word-boundary fallback for punctuation-free text — never cuts mid-word. */ function splitByWords(runOn, size, overlap) {
    const words = runOn.split(/\s+/).filter(Boolean);
    const pieces = [];
    let cur = [];
    let curLen = 0;
    for (const word of words){
        if (curLen > 0 && curLen + word.length + 1 > size) {
            pieces.push(cur.join(' '));
            const tail = [];
            let tailLen = 0;
            for(let i = cur.length - 1; i >= 0; i--){
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
    return pieces.filter((p)=>p.trim().length > 0);
}
// ─── 4. Boundary-safe excerpt trimming ─────────────────────────────────────
/**
 * Trim `text` to at most `max` characters WITHOUT cutting a word — and when
 * possible without cutting a sentence. Prefers the last sentence terminator
 * that lands in the upper 60% of the budget; otherwise falls back to the last
 * complete word (with an ellipsis).
 */ function trimToSentence(text, max) {
    const t = (text ?? '').trim();
    if (t.length <= max) return t;
    const window = t.slice(0, max + 1);
    let cut = -1;
    const terminators = window.matchAll(/[.!?…]+["')\]]*/g);
    for (const m of terminators){
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
 */ function buildCitationQuote(content, questionText, max = 400) {
    const body = (content ?? '').trim();
    if (!body) return '';
    if (body.length <= max) return body;
    const sentences = splitSentences(body);
    if (sentences.length <= 1) return trimToSentence(body, max);
    const qTokens = new Set((questionText ?? '').toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((t)=>t.length > 2));
    if (qTokens.size === 0) return trimToSentence(body, max);
    // Score each sentence by shared distinctive tokens (a mild multi-hit boost
    // favors sentences that hit several question terms).
    const scores = sentences.map((s)=>{
        const toks = s.toLowerCase().split(/[^\p{L}\p{N}]+/u);
        let hits = 0;
        for (const tk of toks)if (qTokens.has(tk)) hits += 1;
        return hits === 0 ? 0 : hits + Math.min(6, hits) * 0.1;
    });
    let best = 0;
    for(let i = 1; i < scores.length; i++)if (scores[i] > scores[best]) best = i;
    if (scores[best] === 0) return trimToSentence(body, max);
    // Expand to neighboring sentences (prefer after, then before) while the
    // combined quote fits the budget — context around the match, complete
    // sentences only.
    let lo = best;
    let hi = best;
    const lengthOf = (l, h)=>sentences.slice(l, h + 1).reduce((n, s)=>n + s.length + 1, 0) - 1;
    for(;;){
        const canNext = hi + 1 < sentences.length && lengthOf(lo, hi + 1) <= max;
        const canPrev = lo - 1 >= 0 && lengthOf(lo - 1, hi) <= max;
        if (!canNext && !canPrev) break;
        if (canNext) hi += 1;
        if (canPrev && lengthOf(lo - 1, hi) <= max) lo -= 1;
    }
    return sentences.slice(lo, hi + 1).join(' ').trim();
}


/***/ })

};
;