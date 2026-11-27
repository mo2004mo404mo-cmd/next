"use strict";
exports.id = 2504;
exports.ids = [2504];
exports.modules = {

/***/ 492504:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L$: () => (/* binding */ retrieveKnowledgeHybrid),
/* harmony export */   ay: () => (/* binding */ judgeCitationSupport),
/* harmony export */   ll: () => (/* binding */ hybridCitations),
/* harmony export */   sp: () => (/* binding */ JUDGE_MAX_CANDIDATES),
/* harmony export */   uL: () => (/* binding */ answerTokenCoverage),
/* harmony export */   zG: () => (/* binding */ formatHybridContext)
/* harmony export */ });
/* unused harmony exports tokenize, reciprocalRankFusion, ANSWER_SUPPORT_WARNING, ANSWER_SUPPORT_EXAMPLE */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42784);
/* harmony import */ var _llm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(387079);
/* harmony import */ var _text_quality__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(827921);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * knowledge/hybrid.ts — high-accuracy hybrid retrieval engine.
 *
 * Pipeline (each stage degrades gracefully — the engine stays functional
 * with zero external services):
 *
 *   query ──▶ 1. MULTI-QUERY EXPANSION (LLM, optional)
 *                2-3 reformulations catch vocabulary mismatch ("heart
 *                attack" ↔ "myocardial infarction") that dense embeddings
 *                alone can miss.
 *          ──▶ 2. DENSE RETRIEVAL — cosine vs chunk embeddings, grouped by
 *                embeddingModel so mixed-provider corpora compare correctly;
 *                score = max cosine across the expanded queries.
 *          ──▶ 3. LEXICAL RETRIEVAL — BM25 (k1=1.5, b=0.75) over
 *                contextSummary + content; exact-token recall that dense
 *                embeddings are weak on (drug names, gene symbols, IDs).
 *          ──▶ 4. RECIPROCAL RANK FUSION (k=60) — merges the two rankings
 *                without score-scale assumptions.
 *          ──▶ 5. LLM RERANK (listwise, optional) — a cross-encoder
 *                substitute: the LLM jointly scores query↔candidate pairs,
 *                which is much sharper than bi-encoder similarity.
 *          ──▶ 6. top-K + RagQueryLog observability row.
 *
 * Why each stage exists (measured failure modes each one fixes):
 *   - pure dense: misses exact rare tokens → BM25
 *   - pure BM25: misses synonyms/paraphrase → dense
 *   - single query: wrong vocabulary → multi-query expansion
 *   - bi-encoder ceiling: coarse relevance → LLM listwise rerank
 *   - context-free chunks: ambiguous fragments → contextSummary (enriched at
 *     ingestion, Anthropic contextual-retrieval style; see pipeline.ts)
 */ 




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('HybridRetrieval');
// ─── Tokenization + BM25 ───────────────────────────────────────────────────
const STOPWORDS = new Set([
    'a',
    'an',
    'and',
    'are',
    'as',
    'at',
    'be',
    'but',
    'by',
    'for',
    'if',
    'in',
    'into',
    'is',
    'it',
    'no',
    'not',
    'of',
    'on',
    'or',
    'such',
    'that',
    'the',
    'their',
    'then',
    'there',
    'these',
    'they',
    'this',
    'to',
    'was',
    'will',
    'with',
    'what',
    'which',
    'who',
    'whom',
    'when',
    'where',
    'why',
    'how',
    'does',
    'do',
    'did',
    'can',
    'could',
    'would',
    'should',
    'about',
    'after',
    'all',
    'also'
]);
/** Lowercased unicode word tokens minus stopwords. */ function tokenize(text) {
    return (text || '').toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((t)=>t.length > 1 && !STOPWORDS.has(t));
}
function bm25Corpus(queries, docs, topN) {
    // Corpus stats over the candidate set (standard ad-hoc BM25).
    const N = docs.length;
    if (N === 0) return [];
    const df = new Map();
    for (const doc of docs){
        for (const term of doc.tf.keys())df.set(term, (df.get(term) ?? 0) + 1);
    }
    const avgLen = docs.reduce((s, d)=>s + d.len, 0) / N;
    const k1 = 1.5;
    const b = 0.75;
    const scores = docs.map((doc, i)=>{
        let score = 0;
        for (const queryTokens of queries){
            let queryScore = 0;
            for (const term of new Set(queryTokens)){
                const f = doc.tf.get(term);
                if (!f) continue;
                const idf = Math.log(1 + (N - (df.get(term) ?? 0) + 0.5) / ((df.get(term) ?? 0) + 0.5));
                queryScore += idf * (f * (k1 + 1) / (f + k1 * (1 - b + b * doc.len / avgLen)));
            }
            // Multi-query: best single-query score wins.
            score = Math.max(score, queryScore);
        }
        return {
            i,
            score
        };
    });
    scores.sort((a, b2)=>b2.score - a.score);
    return scores.slice(0, topN);
}
// ─── Reciprocal Rank Fusion ────────────────────────────────────────────────
/**
 * Fuse multiple rankings (arrays of candidate indexes, best-first) with RRF.
 * k=60 is the literature-standard dampening constant.
 */ function reciprocalRankFusion(rankings, k = 60) {
    const fused = new Map();
    for (const ranking of rankings){
        if (!ranking) continue;
        ranking.forEach((candidateIndex, rank)=>{
            fused.set(candidateIndex, (fused.get(candidateIndex) ?? 0) + 1 / (k + rank + 1));
        });
    }
    return fused;
}
// ─── Stage helpers ─────────────────────────────────────────────────────────
/** LLM multi-query expansion: 2-3 reformulations of the user query. */ async function expandQuery(request, query) {
    if (!query.trim()) return [];
    const raw = await (0,_llm__WEBPACK_IMPORTED_MODULE_3__/* .knowledgeLLM */ .E)({
        request,
        system: 'You are a search query optimizer for a medical knowledge base. Rewrite the query into 2-3 alternative phrasings that would retrieve the SAME information: one with precise medical terminology, one with the plain-language equivalent, one targeting likely related keywords. Output ONLY a JSON array of strings.',
        prompt: `Query: ${query}\n\nReturn JSON like ["reformulation 1", "reformulation 2", "reformulation 3"]`,
        maxOutputTokens: 220,
        temperature: 0.2,
        timeoutMs: 20000
    });
    if (!raw) return [];
    try {
        const match = raw.match(/\[[\s\S]*\]/);
        if (!match) return [];
        const parsed = JSON.parse(match[0]);
        const expanded = parsed.filter((q)=>typeof q === 'string' && q.trim().length > 2).map((q)=>q.trim().slice(0, 300)).slice(0, 3);
        return expanded.filter((q)=>q.toLowerCase() !== query.toLowerCase());
    } catch  {
        return [];
    }
}
// ─── Answer-support rubric (shared: reranker + citation judge) ────────────
/** Max candidates the listwise reranker scores — the FULL fused pool (24).
 *  Previously sliced to 20: the 4 tail chunks were never scored and sank
 *  with rrf-1, so answer-bearing passages fused at rank 20-24 could never
 *  surface no matter how well they matched. */ const RERANK_MAX_CANDIDATES = 24;
/** The anti-list rubric. A citation exists so the learner can VERIFY the
 *  answer in the source. A passage that is merely ON-TOPIC — a lab-panel
 *  list, an etiology table, a classification heading — does NOT support the
 *  answer even though it reads relevant: it never states the fact. */ const ANSWER_SUPPORT_WARNING = `Mandatory scoring rule: a passage scores >= 7 ONLY when it STATES the fact the answer asserts (or the mechanism behind it). A passage that is merely topically related — lists, tables, classification headings, bullet lists that contain a related LABEL but never state the answer fact — scores at most 4, no matter how on-topic it feels. Reward stated facts, not topical proximity.`;
/** Worked few-shot example calibrating the 0-10 answer-support scale.
 *  Without it LLM judges collapse to 7-9 for anything on-topic (measured:
 *  a beta-thalassemia lab panel scored 9/10 against a B12-absorption
 *  question). */ const ANSWER_SUPPORT_EXAMPLE = `Calibration example —
QUESTION: after gastric surgery, why does vitamin B12 deficiency develop?
ANSWER: gastric surgery removes the intrinsic-factor-producing cells, cutting B12 absorption.
Passage A: "CAUSES OF MEGALOBLASTIC ANEMIA • Nutritional deficiency • Pernicious anemia • Gastric surgery • Fish tapeworm" → score 3 (label-only list: "gastric surgery" appears as a bare label; the passage never states the mechanism).
Passage B: "The stomach produces intrinsic factor, a glycoprotein that binds B12 and enables its absorption in the terminal ileum; gastric surgery removes the intrinsic-factor-producing cells, cutting B12 absorption" → score 10 (states the exact fact and its mechanism).`;
/** Per-mode "reranked-in" threshold: minimum LLM score for a chunk to count
 *  as reranked INTO the result set (7 under answer-support — only stated
 *  facts qualify; 4 under relevance — topically related is fine). */ function rerankInThreshold(mode) {
    return mode === 'answer-support' ? 7 : 4;
}
/**
 * LLM listwise reranker — cross-encoder substitute. The model sees the query
 * and the candidate previews TOGETHER and assigns each a 0-10 score.
 *
 * Two rubrics (rerankMode):
 *   'relevance'      — topical relevance to the query (chat, grounding,
 *                      search). The default; the original behavior.
 *   'answer-support' — does the passage STATE the fact the given answer
 *                      asserts? Used for citation verification, where
 *                      answer-blind relevance ranking kept on-topic lists
 *                      above answer-bearing passages. Shares
 *                      ANSWER_SUPPORT_WARNING / _EXAMPLE with
 *                      judgeCitationSupport so ranking and verification
 *                      agree on what "supports the answer" means.
 *
 * Returns verdicts sorted by score; empty array on any failure.
 */ async function rerankWithLLM(request, query, candidates, mode = 'relevance', answerContext) {
    if (candidates.length === 0) return [];
    const list = candidates.slice(0, RERANK_MAX_CANDIDATES)// Full-chunk preview: the answer may sit anywhere in the passage — a
    // 400-char head truncated multi-section chunks and hid real matches
    // (measured: doxycycline answer at char ~690 of its chunk scored 0).
    .map((c, i)=>`C${i}: [${c.documentTitle}] ${c.preview}`).join('\n');
    const answerSupport = mode === 'answer-support' && answerContext?.answer;
    const system = answerSupport ? `You are a fact-support judge for retrieval-augmented generation in a MEDICAL knowledge base. You are given the QUESTION, the ANSWER that will be shown to the learner, and candidate passages. Score each passage 0-10 for how well it SUPPORTS THE ANSWER — i.e. whether reading the passage lets the learner verify the answer is correct:
10 = states the answer fact AND its mechanism
8-9 = states the answer fact (paraphrase acceptable)
5-7 = partial support: a closely related fact or half of the mechanism
1-4 = topically related only (lists, tables, labels) or supports a different fact
0 = irrelevant.
${ANSWER_SUPPORT_WARNING}

${ANSWER_SUPPORT_EXAMPLE}

Judge the passages, not the answer (assume the answer is correct). Output ONLY a JSON array: [{"i": <candidate number>, "s": <score>}] for every candidate.` : `You are a relevance judge for retrieval-augmented generation in a MEDICAL knowledge base. Given a query and candidate passages, score each passage 0-10 for how well it answers or grounds the query:
10 = directly contains the answer / the exact fact asked
7-9 = substantially relevant, likely needed
4-6 = topically related but not the specific fact
1-3 = same broad domain, unlikely to help
0 = irrelevant.
Judge ONLY relevance to the query, not writing quality. A passage may contain the answer ANYWHERE inside it — read the whole passage before scoring. Output ONLY a JSON array: [{"i": <candidate number>, "s": <score>}] for every candidate.`;
    const prompt = answerSupport ? `QUESTION: ${query}\n\nANSWER: ${answerContext.answer}${answerContext.rationale ? `\n\nWHY THE ANSWER IS CORRECT: ${answerContext.rationale}` : ''}\n\nCANDIDATES:\n${list}\n\nReturn the JSON array now.` : `QUERY: ${query}\n\nCANDIDATES:\n${list}\n\nReturn the JSON array now.`;
    const raw = await (0,_llm__WEBPACK_IMPORTED_MODULE_3__/* .knowledgeLLM */ .E)({
        request,
        system,
        prompt,
        maxOutputTokens: 800,
        temperature: 0,
        timeoutMs: 30000
    });
    if (!raw) return [];
    try {
        const match = raw.match(/\[[\s\S]*\]/);
        if (!match) return [];
        const parsed = JSON.parse(match[0]);
        const verdicts = [];
        for (const v of parsed){
            const i = Number(v.i);
            const s = Number(v.s ?? v.score);
            if (!Number.isInteger(i) || i < 0 || i >= candidates.length) continue;
            if (!Number.isFinite(s)) continue;
            verdicts.push({
                chunkId: candidates[i].chunkId,
                score: Math.max(0, Math.min(10, s))
            });
        }
        if (verdicts.length === 0) return [];
        verdicts.sort((a, b)=>b.score - a.score);
        return verdicts;
    } catch  {
        return [];
    }
}
const MAX_CANDIDATES = 4000;
async function loadCandidates(userId, sourceIds) {
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeChunk.findMany({
        where: {
            source: {
                userId,
                status: 'ready'
            },
            ...sourceIds && sourceIds.length ? {
                sourceId: {
                    in: sourceIds
                }
            } : {}
        },
        select: {
            id: true,
            documentId: true,
            sourceId: true,
            idx: true,
            content: true,
            contextSummary: true,
            embedding: true,
            embeddingModel: true,
            document: {
                select: {
                    title: true
                }
            }
        },
        take: MAX_CANDIDATES,
        orderBy: {
            createdAt: 'desc'
        }
    });
    return rows.map((r)=>({
            ...r,
            embedding: r.embedding ? new Uint8Array(r.embedding) : null,
            documentTitle: r.document?.title ?? 'Untitled'
        }));
}
// ─── Main entry point ──────────────────────────────────────────────────────
/**
 * High-accuracy hybrid retrieval over the user's knowledge library.
 * See the module docstring for the pipeline and degradation guarantees.
 */ async function retrieveKnowledgeHybrid(userId, query, opts = {}) {
    const started = Date.now();
    const topK = Math.min(Math.max(opts.topK ?? 8, 1), 20);
    const pool = Math.min(Math.max(opts.candidatePool ?? 24, topK), 40);
    const rows = await loadCandidates(userId, opts.sourceIds);
    if (rows.length === 0) {
        return {
            chunks: [],
            diagnostics: {
                expandedQueries: [],
                candidateCount: 0,
                denseCandidates: 0,
                lexicalCandidates: 0,
                rerankUsed: false,
                latencyMs: Date.now() - started
            }
        };
    }
    // ── Stage 1: query expansion ──
    const expandedQueries = opts.expand ?? true ? await expandQuery(opts.request, query) : [];
    const allQueries = [
        query,
        ...expandedQueries
    ];
    // ── Stage 2: dense retrieval, grouped per embeddingModel ──
    // The active provider scores its own group; the local-hash embedder is
    // free and synchronous so legacy local chunks stay comparable even when
    // the active provider is remote.
    const activeEmbeddings = await (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
    const byModel = new Map();
    for (const row of rows){
        const key = row.embeddingModel || 'legacy';
        if (!byModel.has(key)) byModel.set(key, []);
        byModel.get(key).push(row);
    }
    const denseScores = new Map();
    const localHash = new _embeddings__WEBPACK_IMPORTED_MODULE_2__/* .LocalHashEmbeddings */ .mF();
    for (const [model, group] of byModel){
        if (group.length === 0) continue;
        let queryVectors = [];
        try {
            if (model === activeEmbeddings.id) {
                queryVectors = await activeEmbeddings.embed(allQueries, {
                    query: true
                });
            } else if (model === 'local-hash') {
                queryVectors = await localHash.embed(allQueries);
            } else {
                continue;
            }
        } catch  {
            continue;
        }
        for (const row of group){
            const vec = row.embedding ? (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .deserializeVector */ .H6)(row.embedding) : null;
            if (!vec) continue;
            let best = -1;
            for (const qv of queryVectors){
                const sim = (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .cosineSimilarity */ .Lb)(qv, vec);
                if (sim > best) best = sim;
            }
            if (best > -1) denseScores.set(row.id, {
                score: best,
                model
            });
        }
    }
    const denseRanking = [
        ...denseScores.entries()
    ].sort((a, b)=>b[1].score - a[1].score).map(([id])=>id);
    // ── Stage 3: BM25 lexical retrieval over contextSummary + content ──
    const queryTokenSets = allQueries.map(tokenize);
    const lexicalDocs = rows.map((row)=>{
        const text = `${row.contextSummary ? row.contextSummary + ' ' : ''}${row.content}`;
        const tokens = tokenize(text);
        const tf = new Map();
        for (const t of tokens)tf.set(t, (tf.get(t) ?? 0) + 1);
        return {
            tokens,
            tf,
            len: tokens.length
        };
    });
    const lexicalRanking = bm25Corpus(queryTokenSets, lexicalDocs, pool * 2).map(({ i })=>rows[i].id);
    const lexicalScores = new Map();
    bm25Corpus(queryTokenSets, lexicalDocs, rows.length).forEach(({ i, score })=>{
        lexicalScores.set(rows[i].id, score);
    });
    // ── Stage 4: RRF fusion (dense ranking + lexical ranking) ──
    const rowIndex = new Map();
    rows.forEach((row, i)=>rowIndex.set(row.id, i));
    const idRankings = [];
    for (const ranking of [
        denseRanking,
        lexicalRanking
    ]){
        idRankings.push(ranking.map((id)=>rowIndex.get(id)).filter((i)=>i !== undefined));
    }
    const fused = reciprocalRankFusion(idRankings);
    const fusedOrder = [
        ...fused.entries()
    ].sort((a, b)=>b[1] - a[1]).slice(0, pool).map(([i, rrf])=>({
            row: rows[i],
            rrf
        }));
    // ── Stage 5: LLM listwise rerank of the fused pool ──
    const rerankMode = opts.rerankMode === 'answer-support' ? 'answer-support' : 'relevance';
    let rerankUsed = false;
    let finalOrder = fusedOrder.map(({ row, rrf })=>({
            row,
            finalScore: rrf
        }));
    if ((opts.rerank ?? true) && fusedOrder.length > 0 && opts.rerank !== false) {
        const verdicts = await rerankWithLLM(opts.request, query, fusedOrder.map(({ row })=>({
                chunkId: row.id,
                // Boundary-safe preview: ends on a sentence/word edge, never mid-word
                // (a truncated candidate read as irrelevant would mis-rank it).
                preview: (0,_text_quality__WEBPACK_IMPORTED_MODULE_4__/* .trimToSentence */ .B_)(`${row.contextSummary ? row.contextSummary + ' — ' : ''}${row.content}`, 850),
                documentTitle: row.documentTitle
            })), rerankMode, opts.answerContext);
        if (verdicts.length > 0) {
            rerankUsed = true;
            const verdictMap = new Map(verdicts.map((v)=>[
                    v.chunkId,
                    v.score
                ]));
            const rerankIn = rerankInThreshold(rerankMode);
            finalOrder = fusedOrder.map(({ row, rrf })=>{
                const rs = verdictMap.get(row.id);
                return {
                    row,
                    // Blend: rerank dominates (×10 scale), RRF breaks ties and
                    // backfills candidates the LLM didn't score.
                    finalScore: rs !== undefined ? rs * 10 + rrf : rrf - 1,
                    rerankScore: rs,
                    reranked: rs !== undefined && rs >= rerankIn
                };
            }).sort((a, b)=>b.finalScore - a.finalScore);
        }
    }
    const chunks = finalOrder.slice(0, topK).map(({ row, finalScore, rerankScore, reranked })=>({
            chunkId: row.id,
            content: row.content,
            contextSummary: row.contextSummary || undefined,
            documentTitle: row.documentTitle,
            documentId: row.documentId,
            sourceId: row.sourceId,
            idx: row.idx,
            score: Number(finalScore.toFixed(4)),
            denseScore: denseScores.get(row.id)?.score,
            lexicalScore: lexicalScores.get(row.id),
            rerankScore,
            reranked
        }));
    const diagnostics = {
        expandedQueries,
        candidateCount: rows.length,
        denseCandidates: denseScores.size,
        lexicalCandidates: lexicalScores.size,
        rerankUsed,
        latencyMs: Date.now() - started
    };
    // ── Stage 6: observability (best-effort) ──
    if (!opts.skipLog) {
        try {
            void _db__WEBPACK_IMPORTED_MODULE_0__.db.ragQueryLog.create({
                data: {
                    userId,
                    query: query.slice(0, 500),
                    sourceIds: JSON.stringify(opts.sourceIds ?? []),
                    queriesJson: JSON.stringify(allQueries.slice(0, 5)),
                    retrievedJson: JSON.stringify(chunks.map((c)=>({
                            chunkId: c.chunkId,
                            documentId: c.documentId,
                            sourceId: c.sourceId,
                            score: c.score,
                            stages: {
                                dense: c.denseScore ? Number(c.denseScore.toFixed(3)) : undefined,
                                lexical: c.lexicalScore ? Number(c.lexicalScore.toFixed(2)) : undefined,
                                rerank: c.rerankScore
                            }
                        }))),
                    topK,
                    latencyMs: diagnostics.latencyMs
                }
            });
        } catch  {
        /* logging must never break retrieval */ }
    }
    log.info?.(`hybrid retrieval "${query.slice(0, 60)}": ${chunks.length}/${rows.length} chunks ` + `(dense=${diagnostics.denseCandidates} bm25=${diagnostics.lexicalCandidates} ` + `expand=${expandedQueries.length} rerank=${rerankUsed}${rerankMode === 'answer-support' ? '(answer-support)' : ''} ${diagnostics.latencyMs}ms)`);
    return {
        chunks,
        diagnostics
    };
}
/** Max candidates the citation judge scores: 5 agent picks + 8 corrective
 *  retrieval results + slack. (Capacity 12 cut corrective ranks 7-8 —
 *  exactly where webalw-class answer-bearing chunks sat — so they never
 *  reached the judge.) */ const JUDGE_MAX_CANDIDATES = 14;
/**
 * LLM citation judge — does this passage SUPPORT THE ANSWER? Uses the same
 * answer-support rubric as the answer-support reranker
 * (ANSWER_SUPPORT_WARNING + ANSWER_SUPPORT_EXAMPLE) so ranking and
 * verification agree on what "supports the answer" means. Returns verdicts
 * sorted by score desc; empty array on any failure.
 */ async function judgeCitationSupport(request, answer, question, candidates, rationale) {
    if (candidates.length === 0 || !answer.trim()) return [];
    const scored = candidates.slice(0, JUDGE_MAX_CANDIDATES);
    const list = scored.map((c, i)=>`C${i}: ${(0,_text_quality__WEBPACK_IMPORTED_MODULE_4__/* .trimToSentence */ .B_)(c.content, 850)}`).join('\n');
    const raw = await (0,_llm__WEBPACK_IMPORTED_MODULE_3__/* .knowledgeLLM */ .E)({
        request,
        system: `You are a citation verifier for a MEDICAL question bank. You are given the QUESTION, its ANSWER, and candidate passages from the user's study material. Score each passage 0-10 for how well it SUPPORTS THE ANSWER — i.e. whether a learner reading the passage could verify the answer is correct:
10 = states the answer fact AND its mechanism
8-9 = states the answer fact (paraphrase acceptable)
5-7 = partial support: a closely related fact or half of the mechanism
1-4 = topically related only (lists, tables, labels) or supports a different fact
0 = irrelevant.
${ANSWER_SUPPORT_WARNING}

${ANSWER_SUPPORT_EXAMPLE}

Assume the answer is correct; judge only the passages. Output ONLY a JSON array: [{"i": <candidate number>, "s": <score>}] for every candidate.`,
        prompt: `QUESTION: ${question}\n\nANSWER: ${answer}${rationale ? `\n\nWHY THE ANSWER IS CORRECT: ${rationale}` : ''}\n\nCANDIDATE PASSAGES:\n${list}\n\nReturn the JSON array now.`,
        maxOutputTokens: 800,
        temperature: 0,
        timeoutMs: 30000
    });
    if (!raw) return [];
    try {
        const match = raw.match(/\[[\s\S]*\]/);
        if (!match) return [];
        const parsed = JSON.parse(match[0]);
        const verdicts = [];
        for (const v of parsed){
            const i = Number(v.i);
            const s = Number(v.s ?? v.score);
            if (!Number.isInteger(i) || i < 0 || i >= scored.length) continue;
            if (!Number.isFinite(s)) continue;
            verdicts.push({
                chunkId: scored[i].chunkId,
                score: Math.max(0, Math.min(10, s))
            });
        }
        verdicts.sort((a, b)=>b.score - a.score);
        return verdicts;
    } catch  {
        return [];
    }
}
/**
 * Token answer-coverage: distinctive answer tokens present in the passage /
 * distinctive answer tokens (0-1). Cheap, deterministic evidence that the
 * passage actually talks about what the answer says — the second half of
 * the conjunction gate (the LLM judge over-scores on-topic lists; this
 * under-measures paraphrased mechanisms — together they agree only on real
 * answer-bearing passages).
 */ function answerTokenCoverage(content, answer) {
    const distinct = (s)=>new Set(tokenize(s).filter((t)=>t.length > 3));
    const answerTokens = distinct(answer || '');
    if (answerTokens.size === 0) return 0;
    const contentTokens = distinct(content || '');
    let hits = 0;
    for (const t of answerTokens)if (contentTokens.has(t)) hits += 1;
    return hits / answerTokens.size;
}
// ─── Rendering ─────────────────────────────────────────────────────────────
/**
 * Render hybrid results as [K#]-cited context for prompts. Content is
 * trimmed to ≤800 chars per chunk on a sentence/word boundary (never
 * mid-word — the LLM must not quote half-sentences), contextSummary kept
 * as a header line.
 */ function formatHybridContext(chunks) {
    if (chunks.length === 0) return '';
    const lines = [
        '# SOURCE CONTEXT (retrieved from the user\'s library)',
        ''
    ];
    chunks.forEach((chunk, i)=>{
        lines.push(`[K${i + 1}] (${chunk.documentTitle}${chunk.contextSummary ? ` — ${chunk.contextSummary}` : ''})`);
        lines.push((0,_text_quality__WEBPACK_IMPORTED_MODULE_4__/* .trimToSentence */ .B_)(chunk.content, 800));
        lines.push('');
    });
    return lines.join('\n');
}
/** Render citations for the Question.sources array. */ function hybridCitations(chunks) {
    return chunks.map((chunk)=>({
            type: 'library',
            title: `${chunk.documentTitle} · passage ${chunk.idx + 1}`
        }));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


/***/ })

};
;