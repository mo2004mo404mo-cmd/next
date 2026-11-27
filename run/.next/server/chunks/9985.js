"use strict";
exports.id = 9985;
exports.ids = [9985];
exports.modules = {

/***/ 69985:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UZ: () => (/* binding */ retainAudioFile),
/* harmony export */   Wq: () => (/* binding */ deleteRetainedAudio),
/* harmony export */   Xn: () => (/* binding */ toStoredTranscript),
/* harmony export */   hs: () => (/* binding */ audioStorePath),
/* harmony export */   l_: () => (/* binding */ toLegacyTranscription),
/* harmony export */   yE: () => (/* binding */ transcribeAdvanced),
/* harmony export */   zy: () => (/* binding */ sniffAudioMime)
/* harmony export */ });
/* unused harmony exports buildSpeechSegments, splitSentences */
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);
/* harmony import */ var _asr_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(860590);
/* harmony import */ var _llm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(387079);
/**
 * knowledge/audio-pipeline.ts — ADVANCED audio transcription engine.
 *
 * Upgrades over the legacy fixed-25s-window transcriber:
 *   1. Loudness normalization (ffmpeg loudnorm → 16 kHz mono WAV) — the
 *      single biggest accuracy lever for quiet/recorded-at-a-distance audio.
 *   2. VAD-aware segmentation: silences are detected first
 *      (`silencedetect`), then speech runs are cut AT natural pauses
 *      (≤28 s, the provider's 0-30 s window) — so every ASR chunk starts
 *      and ends on real speech boundaries and carries ACCURATE timestamps.
 *   3. Sentence-level timing: each ASR chunk is split into sentences;
 *      sentence starts/ends are interpolated across the chunk's true
 *      [start,end] span (±0.5 s worst case, exact at pause boundaries).
 *   4. Deterministic paragraphing: sentence groups break at long pauses
 *      (>1.4 s) or size limits → readable transcript, better RAG chunks.
 *   5. LLM insights (title / summary / keywords / topics / entities) with a
 *      heuristic TF fallback — never a hard dependency.
 *   6. Speech analytics: words, sentences, WPM, speech-vs-silence coverage.
 *
 * Also owns the RETAINED-AUDIO store (`upload/audio-store/<sourceId>.bin`):
 * the original audio is kept (audio sources only) so the Transcript Studio
 * can play it back; served owner-gated with Range support by
 * GET /api/knowledge/sources/[id]/audio.
 */ 






const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('AudioPipeline');
// ─── VAD: silence detection → speech segments ──────────────────────────────
const SILENCE_NOISE_DB = -35; // below this = silence (works post-loudnorm)
const SILENCE_MIN_SEC = 0.45; // pause shorter than this does NOT cut a segment
const SEGMENT_MAX_SEC = 28; // provider hard cap is 30s; keep headroom
const SEGMENT_MIN_SEC = 0.9; // merge shorter speech runs into neighbours
const BLIP_SEC = 0.35; // drop speech runs shorter than this (coughs, clicks)
/** Run ffmpeg silencedetect and parse the silence intervals from stderr. */ async function detectSilences(file) {
    try {
        const { stderr } = await execFileAsync('ffmpeg', [
            '-hide_banner',
            '-nostats',
            '-i',
            file,
            '-af',
            `silencedetect=noise=${SILENCE_NOISE_DB}dB:d=${SILENCE_MIN_SEC}`,
            '-f',
            'null',
            '-'
        ], {
            timeout: 120000,
            maxBuffer: 1024 * 1024 * 16
        });
        const starts = [
            ...stderr.matchAll(/silence_start:\s*(-?[\d.]+)/g)
        ].map((m)=>Number.parseFloat(m[1]));
        const ends = [
            ...stderr.matchAll(/silence_end:\s*([\d.]+)/g)
        ].map((m)=>Number.parseFloat(m[1]));
        const out = [];
        for(let i = 0; i < starts.length; i++){
            const start = Math.max(0, starts[i]);
            const end = ends[i] ?? Number.POSITIVE_INFINITY;
            out.push({
                start,
                end
            });
        }
        return out;
    } catch  {
        return [];
    }
}
/**
 * Complement silences into speech runs, then merge/split into ASR-ready
 * segments: never longer than SEGMENT_MAX_SEC, never shorter than
 * SEGMENT_MIN_SEC, always cut at the LONGEST internal pause when a split
 * is unavoidable (so the cut lands in a natural spot).
 */ function buildSpeechSegments(duration, silences) {
    const speech = [];
    let cursor = 0;
    for (const s of silences){
        if (s.start > cursor) speech.push({
            start: cursor,
            end: Math.min(s.start, duration)
        });
        cursor = Math.max(cursor, s.end);
        if (cursor >= duration) break;
    }
    if (cursor < duration) speech.push({
        start: cursor,
        end: duration
    });
    // drop blips
    const real = speech.filter((p)=>p.end - p.start >= BLIP_SEC);
    if (real.length === 0) return speech.length ? [
        speech[0]
    ] : [];
    // merge runs separated by short gaps (< SILENCE_MIN_SEC) or under-length runs
    const merged = [];
    for (const p of real){
        const last = merged[merged.length - 1];
        const gap = last ? p.start - last.end : Number.POSITIVE_INFINITY;
        const wouldLen = last ? p.end - last.start : 0;
        if (last && (gap < SILENCE_MIN_SEC || wouldLen < SEGMENT_MIN_SEC) && wouldLen < SEGMENT_MAX_SEC) {
            last.end = p.end;
        } else {
            merged.push({
                ...p
            });
        }
    }
    // split any run still > SEGMENT_MAX_SEC at its longest internal silence (or midpoint)
    const out = [];
    for (const run of merged){
        let queue = [
            run
        ];
        while(queue.length){
            const piece = queue.shift();
            const len = piece.end - piece.start;
            if (len <= SEGMENT_MAX_SEC) {
                out.push(piece);
                continue;
            }
            // longest silence INSIDE the piece
            const inside = silences.filter((s)=>s.start > piece.start + 0.3 && s.end < piece.end - 0.3).sort((a, b)=>b.end - b.start - (a.end - a.start))[0];
            const cut = inside ? Math.max(piece.start + 1, Math.min(inside.start, piece.end - 1)) : piece.start + len / 2;
            queue = [
                {
                    start: piece.start,
                    end: cut
                },
                {
                    start: cut,
                    end: piece.end
                },
                ...queue
            ];
        }
    }
    return out.filter((p)=>p.end - p.start >= BLIP_SEC);
}
// ─── Sentence splitting & paragraphing ─────────────────────────────────────
/** Split ASR chunk text into sentences, preserving terminal punctuation. */ function splitSentences(text) {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    if (!cleaned) return [];
    // split after . ! ? … (incl. CJK 。！？) followed by space/end; keep the punct
    const parts = cleaned.match(/[^.!?。！？…]+[.!?。！？…]+["'”’)\]]*\s*|[^.!?。！？…]+$/g) || [
        cleaned
    ];
    return parts.map((p)=>p.trim()).filter(Boolean);
}
function cleanSentence(s) {
    const t = s.replace(/\s+/g, ' ').trim();
    if (!t) return t;
    return t.charAt(0).toUpperCase() + t.slice(1);
}
/**
 * Interpolate sentence timings across the chunk span, weighted by character
 * length. First sentence starts exactly at chunk start; last ends at chunk end.
 */ function timeSentences(texts, start, end) {
    if (texts.length === 0) return [];
    if (texts.length === 1) return [
        {
            start,
            end
        }
    ];
    const weights = texts.map((t)=>Math.max(4, t.replace(/\s/g, '').length));
    const total = weights.reduce((a, b)=>a + b, 0);
    const span = Math.max(0.2, end - start);
    const out = [];
    let cursor = start;
    for(let i = 0; i < texts.length; i++){
        const dur = weights[i] / total * span;
        const segEnd = i === texts.length - 1 ? end : cursor + dur;
        out.push({
            start: cursor,
            end: segEnd
        });
        cursor = segEnd;
    }
    return out;
}
const PARAGRAPH_PAUSE_SEC = 1.4; // pause long enough to start a new paragraph
const PARAGRAPH_MAX_SENTENCES = 6;
const PARAGRAPH_MAX_WORDS = 70;
function buildParagraphs(sentences) {
    const paras = [];
    let from = 0;
    let words = 0;
    for(let i = 0; i < sentences.length; i++){
        const s = sentences[i];
        words += s.text.split(/\s+/).length;
        const next = sentences[i + 1];
        const isNew = i === sentences.length - 1 || next && next.start - s.end >= PARAGRAPH_PAUSE_SEC || i - from + 1 >= PARAGRAPH_MAX_SENTENCES || words >= PARAGRAPH_MAX_WORDS;
        if (isNew) {
            paras.push({
                from,
                to: i
            });
            from = i + 1;
            words = 0;
        }
    }
    return paras;
}
// ─── Insights: LLM (title/summary/keywords/topics) + heuristic fallback ────
const STOPWORDS = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'but',
    'of',
    'to',
    'in',
    'on',
    'at',
    'for',
    'with',
    'by',
    'from',
    'as',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'it',
    'its',
    'this',
    'that',
    'these',
    'those',
    'i',
    'you',
    'he',
    'she',
    'we',
    'they',
    'them',
    'his',
    'her',
    'their',
    'our',
    'your',
    'my',
    'me',
    'us',
    'him',
    'will',
    'would',
    'can',
    'could',
    'should',
    'shall',
    'may',
    'might',
    'must',
    'do',
    'does',
    'did',
    'done',
    'have',
    'has',
    'had',
    'having',
    'not',
    'no',
    'so',
    'if',
    'then',
    'than',
    'when',
    'where',
    'which',
    'who',
    'whom',
    'what',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'only',
    'own',
    'same',
    'too',
    'very',
    'just',
    'also',
    'now',
    'there',
    'here',
    'about',
    'into',
    'over',
    'under',
    'again',
    'further',
    'once',
    'up',
    'down',
    'out',
    'off',
    'we',
    'okay',
    'ok',
    'um',
    'uh',
    'er',
    'ah',
    'like',
    'right',
    'well',
    'one',
    'two',
    'three',
    'going',
    'get',
    'got',
    'go'
]);
function heuristicInsights(fileName, sentences) {
    const fullText = sentences.map((s)=>s.text).join(' ');
    const freq = new Map();
    for (const w of fullText.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []){
        if (STOPWORDS.has(w)) continue;
        freq.set(w, (freq.get(w) || 0) + 1);
    }
    const keywords = [
        ...freq.entries()
    ].sort((a, b)=>b[1] - a[1]).slice(0, 8).map(([w])=>w);
    const first = sentences.slice(0, 2).map((s)=>s.text).join(' ');
    return {
        title: fileName.replace(/\.[a-z0-9]+$/i, '').slice(0, 120),
        summary: first.length > 400 ? `${first.slice(0, 400)}…` : first || '(no speech transcribed)',
        keywords,
        topics: [],
        entities: []
    };
}
async function llmInsights(fileName, transcriptText) {
    const input = transcriptText.slice(0, 6000);
    const raw = await (0,_llm__WEBPACK_IMPORTED_MODULE_6__/* .knowledgeLLM */ .E)({
        system: 'You analyze transcripts for a study-library app. Reply with ONLY a JSON object (no markdown fence) with keys: ' + 'title (<=10 words, descriptive), summary (2-3 sentences, factual), keywords (5-10 single words or short phrases, lowercase), ' + 'topics (0-5 thematic labels), entities (0-10 named entities: people, drugs, diseases, organizations, numbers-with-units).',
        prompt: `Audio file: "${fileName}"\nTranscript:\n${input}\n\nReturn the JSON object now.`,
        maxOutputTokens: 700,
        temperature: 0,
        timeoutMs: 30000
    });
    if (!raw) return null;
    try {
        const match = raw.match(/\{[\s\S]*\}/);
        if (!match) return null;
        const obj = JSON.parse(match[0]);
        const strArr = (v, cap)=>Array.isArray(v) ? v.filter((x)=>typeof x === 'string' && x.trim().length > 0).slice(0, cap).map((x)=>x.trim().slice(0, 60)) : [];
        const title = typeof obj.title === 'string' ? obj.title.trim().slice(0, 120) : '';
        const summary = typeof obj.summary === 'string' ? obj.summary.trim().slice(0, 600) : '';
        if (!title && !summary) return null;
        return {
            title: title || fileName,
            summary,
            keywords: strArr(obj.keywords, 10),
            topics: strArr(obj.topics, 5),
            entities: strArr(obj.entities, 10)
        };
    } catch  {
        return null;
    }
}
// ─── The engine ────────────────────────────────────────────────────────────
/** asrOne + 429-aware retry with backoff (the ASR quota window is shared and
 *  bursts of parallel calls can trip it; a single 9-12 s wait clears it). */ async function asrOneWithRetry(wavBuffer, attempts = 3) {
    let lastError;
    for(let i = 0; i < attempts; i++){
        try {
            return await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .asrOne */ .vq)(wavBuffer);
        } catch (e) {
            lastError = e;
            const msg = e instanceof Error ? e.message : String(e);
            const rateLimited = msg.includes('429') || /too many requests/i.test(msg);
            if (!rateLimited || i === attempts - 1) break;
            const waitMs = 9000 + Math.floor(Math.random() * 3000);
            log.warn?.(`ASR rate-limited, waiting ${Math.round(waitMs / 1000)}s (attempt ${i + 1}/${attempts})`);
            await new Promise((r)=>setTimeout(r, waitMs));
        }
    }
    throw lastError;
}
const MAX_SEGMENTS = 180; // ~60+ min of speech at avg 20s/segment
/**
 * Advanced transcription: normalize → VAD → per-segment ASR → sentences with
 * timings → paragraphs → insights → stats.
 */ async function transcribeAdvanced(input, opts = {}) {
    const fileName = opts.fileName || 'audio';
    const dir = (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .tmpDir */ .bv)();
    const inputPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'input.bin');
    const normPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'norm.wav');
    fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(inputPath, input);
    try {
        // 1. Loudness-normalize to 16 kHz mono PCM (accuracy lever + uniform levels
        //    so the -35 dB silence threshold behaves consistently).
        await execFileAsync('ffmpeg', [
            '-y',
            '-i',
            inputPath,
            '-vn',
            '-af',
            'loudnorm=I=-16:TP=-1.5:LRA=11',
            '-ar',
            '16000',
            '-ac',
            '1',
            '-c:a',
            'pcm_s16le',
            normPath
        ], {
            timeout: 300000,
            maxBuffer: 1024 * 1024 * 64
        });
        if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(normPath) || fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(normPath).size < 1024) {
            throw new Error(`Could not decode any audio from "${fileName}" (is it a valid media file?)`);
        }
        const durationSec = await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .probeDuration */ .D5)(normPath);
        if (durationSec <= 0) throw new Error(`Could not determine the duration of "${fileName}".`);
        // 2. VAD segmentation
        const silences = await detectSilences(normPath);
        let windows = buildSpeechSegments(durationSec, silences);
        let vad = true;
        if (windows.length === 0) {
            // No usable silences (continuous speech / noisy floor) → fixed windows,
            // still sentence-timed within each chunk.
            vad = false;
            const n = Math.max(1, Math.ceil(durationSec / 25));
            windows = Array.from({
                length: n
            }, (_, i)=>({
                    start: i * 25,
                    end: Math.min((i + 1) * 25, durationSec)
                }));
        }
        windows = windows.slice(0, MAX_SEGMENTS);
        // 3. Cut + ASR each window (3 in parallel — rate-limit friendly, each
        //    with 429-aware backoff retries)
        const segTexts = new Array(windows.length).fill('');
        let sawRateLimit = false;
        const noteRateLimit = (e)=>{
            const msg = e instanceof Error ? e.message : String(e);
            if (/429|too many requests/i.test(msg)) sawRateLimit = true;
        };
        const BATCH = 3;
        for(let i = 0; i < windows.length; i += BATCH){
            const batchIdx = Array.from({
                length: Math.min(BATCH, windows.length - i)
            }, (_, k)=>i + k);
            await Promise.all(batchIdx.map(async (idx)=>{
                const w = windows[idx];
                const segPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `seg_${String(idx).padStart(3, '0')}.wav`);
                try {
                    await execFileAsync('ffmpeg', [
                        '-y',
                        '-ss',
                        String(w.start),
                        '-i',
                        normPath,
                        '-t',
                        String(Math.max(0.3, w.end - w.start)),
                        '-c:a',
                        'pcm_s16le',
                        segPath
                    ], {
                        timeout: 60000,
                        maxBuffer: 1024 * 1024 * 16
                    });
                    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(segPath) || fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(segPath).size < 512) return;
                    const buf = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(segPath);
                    segTexts[idx] = await asrOneWithRetry(buf);
                } catch (e) {
                    // tolerate a failed segment (rate limits, caps) but keep going
                    noteRateLimit(e);
                    log.warn?.(`ASR window ${idx} [${(0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .fmtTimestamp */ .YH)(w.start)}] failed: ${e instanceof Error ? e.message.slice(0, 140) : e}`);
                }
            }));
            // small breather between batches keeps the shared quota happy
            if (i + BATCH < windows.length) await new Promise((r)=>setTimeout(r, 600));
        }
        // 3b. Second-chance sweep: rate-limit trips are transient — re-run the
        // windows that returned nothing after a cooldown so long lectures stay
        // whole instead of silently losing chunks to a throttled minute.
        const failedIdx = windows.map((_, i)=>i).filter((i)=>!segTexts[i]);
        if (failedIdx.length > 0 && failedIdx.length < windows.length) {
            log.info?.(`second-chance ASR sweep: ${failedIdx.length}/${windows.length} windows`);
            await new Promise((r)=>setTimeout(r, 15000));
            for (const idx of failedIdx){
                const w = windows[idx];
                const segPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `seg_${String(idx).padStart(3, '0')}.wav`);
                try {
                    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(segPath)) {
                        await execFileAsync('ffmpeg', [
                            '-y',
                            '-ss',
                            String(w.start),
                            '-i',
                            normPath,
                            '-t',
                            String(Math.max(0.3, w.end - w.start)),
                            '-c:a',
                            'pcm_s16le',
                            segPath
                        ], {
                            timeout: 60000,
                            maxBuffer: 1024 * 1024 * 16
                        });
                    }
                    if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(segPath) && fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(segPath).size >= 512) {
                        segTexts[idx] = await asrOneWithRetry(fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(segPath));
                    }
                } catch (e) {
                    noteRateLimit(e);
                    log.warn?.(`second-chance window ${idx} still failed: ${e instanceof Error ? e.message.slice(0, 120) : e}`);
                }
            }
        }
        const droppedWindows = failedIdx.filter((i)=>!segTexts[i]).length;
        // 4. Sentences with interpolated timings
        const sentences = [];
        const segments = [];
        let sid = 0;
        for(let i = 0; i < windows.length; i++){
            const raw = segTexts[i].trim();
            if (!raw) continue;
            const w = windows[i];
            segments.push({
                id: segments.length,
                start: w.start,
                end: w.end,
                text: raw
            });
            const parts = splitSentences(raw).map(cleanSentence).filter(Boolean);
            const timed = timeSentences(parts, w.start, w.end);
            for(let k = 0; k < parts.length; k++){
                sentences.push({
                    id: sid++,
                    start: timed[k].start,
                    end: timed[k].end,
                    text: parts[k],
                    seg: segments.length - 1
                });
            }
        }
        const totalChars = sentences.map((s)=>s.text).join(' ').trim().length;
        if (sentences.length === 0 || totalChars < 10) {
            throw new Error(sawRateLimit ? `The speech-to-text provider is rate-limited right now — none of the ${windows.length} speech segments could be transcribed (${Math.round(durationSec)}s of audio). This is temporary: wait a few minutes and retry the import.` : `No speech could be transcribed from "${fileName}" (${windows.length} speech ${vad ? 'segments' : 'windows'}, ` + `${Math.round(durationSec)}s). The audio may be music, noise, or too quiet.`);
        }
        // 5. Paragraphs, stats, insights
        const paragraphs = buildParagraphs(sentences);
        const words = sentences.map((s)=>s.text).join(' ').split(/\s+/).filter(Boolean).length;
        const speechSec = segments.reduce((a, s)=>a + (s.end - s.start), 0);
        const silenceSec = Math.max(0, durationSec - speechSec);
        const stats = {
            words,
            sentences: sentences.length,
            segments: segments.length,
            speechSec: Math.round(speechSec * 10) / 10,
            silenceSec: Math.round(silenceSec * 10) / 10,
            wpm: speechSec > 0 ? Math.round(words / speechSec * 60) : 0,
            coverage: durationSec > 0 ? Math.round(speechSec / durationSec * 100) / 100 : 0,
            ...droppedWindows > 0 ? {
                dropped: droppedWindows
            } : {}
        };
        const plain = sentences.map((s)=>s.text).join(' ');
        const insights = await llmInsights(fileName, plain).catch(()=>null) || heuristicInsights(fileName, sentences);
        // 6. Rendered texts
        const lines = [];
        for (const p of paragraphs){
            for(let i = p.from; i <= p.to; i++){
                const s = sentences[i];
                lines.push(`[${(0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .fmtTimestamp */ .YH)(s.start)}] ${s.text}`);
            }
            lines.push('');
        }
        const timestampedText = `# Advanced transcript of "${fileName}" (audio, ${Math.round(durationSec)}s)\n\n${lines.join('\n').trim()}`;
        const text = paragraphs.map((p)=>sentences.slice(p.from, p.to + 1).map((s)=>s.text).join(' ')).join('\n\n');
        return {
            version: 2,
            fileName,
            durationSec: Math.round(durationSec * 10) / 10,
            stats,
            segments,
            sentences,
            paragraphs,
            insights,
            timestampedText,
            text
        };
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}
/** Legacy-shape adapter (used by the video path: audio track transcription). */ function toLegacyTranscription(result) {
    return {
        text: result.timestampedText,
        durationSec: result.durationSec,
        segments: result.segments.map((s)=>({
                offsetSec: s.start,
                text: s.text
            }))
    };
}
/** Strip the heavy rendered texts — stored copy for source meta. */ function toStoredTranscript(result) {
    return {
        version: result.version,
        fileName: result.fileName,
        durationSec: result.durationSec,
        stats: result.stats,
        segments: result.segments,
        sentences: result.sentences,
        paragraphs: result.paragraphs,
        insights: result.insights
    };
}
// ─── Retained-audio store ──────────────────────────────────────────────────
const AUDIO_STORE = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'upload', 'audio-store');
const MAX_RETAIN_BYTES = 200 * 1024 * 1024; // matches the upload cap
function audioStorePath(sourceId) {
    return path__WEBPACK_IMPORTED_MODULE_3___default().join(AUDIO_STORE, `${sourceId}.bin`);
}
/** Magic-byte sniffing — the store keeps extension-less files. */ function sniffAudioMime(buf) {
    if (buf.length >= 12) {
        if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) return 'audio/mpeg'; // ID3
        if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return 'audio/mpeg'; // MPEG frame sync
        if (buf.subarray(0, 4).toString('ascii') === 'OggS') return 'audio/ogg';
        if (buf.subarray(4, 8).toString('ascii') === 'ftyp') return 'audio/mp4'; // m4a/aac
        if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WAVE') return 'audio/wav';
        if (buf.subarray(0, 4).toString('ascii') === 'fLaC') return 'audio/flac';
        if (buf[0] === 0x1a && buf[1] === 0x45 && (buf[2] & 0xf0) === 0x00) return 'audio/webm'; // EBML (webm/mkv)
    }
    return 'application/octet-stream';
}
/**
 * Keep the ORIGINAL audio bytes for playback in the Transcript Studio.
 * Best-effort: failure to retain never fails ingestion.
 */ async function retainAudioFile(sourceId, buffer) {
    const mime = sniffAudioMime(buffer);
    const bytes = buffer.byteLength;
    if (bytes === 0 || bytes > MAX_RETAIN_BYTES) return {
        retained: false,
        mime,
        bytes
    };
    try {
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(AUDIO_STORE, {
            recursive: true
        });
        fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(audioStorePath(sourceId), buffer);
        return {
            retained: true,
            mime,
            bytes
        };
    } catch (e) {
        log.warn?.(`retain audio failed for ${sourceId}: ${e instanceof Error ? e.message : e}`);
        return {
            retained: false,
            mime,
            bytes
        };
    }
}
/** Remove the retained audio when its source is deleted. */ function deleteRetainedAudio(sourceId) {
    try {
        const p = audioStorePath(sourceId);
        if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(p)) fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(p, {
            force: true
        });
    } catch  {
    // best-effort cleanup
    }
}


/***/ }),

/***/ 387079:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ knowledgeLLM)
/* harmony export */ });
/* unused harmony export knowledgeLLMAvailable */
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * knowledge/llm.ts — best-effort LLM helper for the knowledge/RAG subsystem.
 *
 * Unlike question-agent (which always has a NextRequest), the knowledge
 * pipeline is called from three contexts:
 *   1. API routes (have a request — x-model / BYOK resolution available)
 *   2. Background ingestion jobs (no request)
 *   3. Deep-agent tools (no request)
 *
 * Resolution order:
 *   request present → callChat (full provider chain: MODEL_ROUTES > x-model >
 *   DEFAULT_MODEL > BYOK > auto-detect)
 *   no request      → auto-detect a provider (env keys / Ollama) once, cache
 *                     the resolved model on globalThis, then callLLM.
 *
 * Every failure degrades to `null` — retrieval enrichment and reranking are
 * accuracy BOOSTERS, never hard dependencies: the pipeline must stay
 * functional with zero LLM access (pure BM25 + local-hash embeddings).
 */ 
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('KnowledgeLLM');
const runtime = globalThis;
async function resolveAutoModel() {
    if (runtime.__medqKnowledgeModel !== undefined) {
        return runtime.__medqKnowledgeModel ?? null;
    }
    try {
        const { resolveModel } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(426), __webpack_require__.e(7774), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(4007), __webpack_require__.e(7909), __webpack_require__.e(5566), __webpack_require__.e(8262), __webpack_require__.e(2901)]).then(__webpack_require__.bind(__webpack_require__, 592901));
        const { autoDetectDefaultModel } = await __webpack_require__.e(/* import() */ 8953).then(__webpack_require__.bind(__webpack_require__, 148953));
        const auto = await autoDetectDefaultModel();
        const modelString = `${auto.providerId}:${auto.modelId}`;
        const resolved = await resolveModel({
            modelString,
            stage: 'chat-adapter'
        });
        runtime.__medqKnowledgeModel = {
            model: resolved.model,
            modelString
        };
        return runtime.__medqKnowledgeModel;
    } catch (error) {
        runtime.__medqKnowledgeModel = null;
        log.warn?.(`knowledge LLM auto-detect failed: ${error instanceof Error ? error.message : error}`);
        return null;
    }
}
/**
 * Call an LLM for a knowledge-pipeline task. Returns null on ANY failure —
 * callers must treat LLM enrichment as optional.
 *
 * Chain: request → callChat · no request → auto-detect + callLLM ·
 * final fallback → z-ai-web-dev-sdk chat (managed sandbox provider).
 */ async function knowledgeLLM(options) {
    const { request, system, prompt, maxOutputTokens, temperature } = options;
    const timeoutMs = options.timeoutMs ?? 15000;
    const race = (p)=>Promise.race([
            p,
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('knowledge LLM timeout')), timeoutMs))
        ]);
    try {
        if (request) {
            const { callChat } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(426), __webpack_require__.e(7774), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(4007), __webpack_require__.e(7909), __webpack_require__.e(5566), __webpack_require__.e(8262), __webpack_require__.e(2901), __webpack_require__.e(736)]).then(__webpack_require__.bind(__webpack_require__, 960736));
            const text = await race(callChat(request, {
                system,
                prompt,
                stage: 'chat-adapter',
                maxOutputTokens,
                temperature
            }));
            if (text && text.trim()) return text;
            return null;
        }
        const resolved = await resolveAutoModel();
        if (resolved) {
            const { callLLM } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(7909), __webpack_require__.e(8262), __webpack_require__.e(5351)]).then(__webpack_require__.bind(__webpack_require__, 525351));
            const result = await race(callLLM({
                model: resolved.model,
                ...system ? {
                    system
                } : {},
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                ...maxOutputTokens ? {
                    maxOutputTokens
                } : {},
                ...temperature != null ? {
                    temperature
                } : {}
            }, 'knowledge-rag'));
            const text = result?.text || '';
            if (text.trim()) return text;
        }
        // Final fallback: managed ZAI SDK (works out-of-the-box on this platform).
        return await zaiSdkChat(system, prompt, timeoutMs);
    } catch (error) {
        log.warn?.(`knowledge LLM call failed: ${error instanceof Error ? error.message : error}`);
        // Even on provider errors, try the SDK once before giving up.
        try {
            return await zaiSdkChat(system, prompt, Math.min(timeoutMs, 12000));
        } catch  {
            return null;
        }
    }
}
const sdkZai = globalThis;
/** Direct z-ai-web-dev-sdk chat call — the always-available managed provider.
 *  Retries once after a short backoff: the sandbox gateway occasionally
 *  burst-429s (observed in live E2E), and a 1.5s later attempt usually
 *  passes — turning a failed rerank/enrichment into a delayed success. */ async function zaiSdkChat(system, prompt, timeoutMs) {
    for(let attempt = 0; attempt < 2; attempt++){
        try {
            if (attempt > 0) await new Promise((r)=>setTimeout(r, 1500));
            if (!sdkZai.__medqZaiChat) {
                sdkZai.__medqZaiChat = Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 902381)).then((mod)=>{
                    const ZAI = mod.default;
                    if (!ZAI?.create) throw new Error('z-ai-web-dev-sdk unavailable');
                    return ZAI.create();
                });
                sdkZai.__medqZaiChat.catch(()=>{
                    sdkZai.__medqZaiChat = undefined; // allow retry on next call
                });
            }
            const zai = await sdkZai.__medqZaiChat;
            const completion = await Promise.race([
                zai.chat.completions.create({
                    messages: [
                        ...system ? [
                            {
                                role: 'system',
                                content: system
                            }
                        ] : [],
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    thinking: {
                        type: 'disabled'
                    }
                }),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('SDK chat timeout')), timeoutMs))
            ]);
            const content = completion.choices?.[0]?.message?.content || '';
            if (content.trim()) return content;
            return null;
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            const retryable = /429|too many|rate|timeout|econn/i.test(msg);
            if (attempt === 0 && retryable) continue;
            return null;
        }
    }
    return null;
}
/** Probe whether the knowledge LLM is usable (auto-detect or SDK path). */ async function knowledgeLLMAvailable() {
    const model = await resolveAutoModel();
    if (model) return true;
    const probe = await zaiSdkChat(undefined, 'Reply with the word OK.', 8000);
    return probe !== null;
}


/***/ }),

/***/ 860590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D5: () => (/* binding */ probeDuration),
/* harmony export */   Tz: () => (/* binding */ getZai),
/* harmony export */   YH: () => (/* binding */ fmtTimestamp),
/* harmony export */   bv: () => (/* binding */ tmpDir),
/* harmony export */   vq: () => (/* binding */ asrOne)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(653165);
/**
 * knowledge/asr-provider.ts — shared low-level providers & ffmpeg helpers.
 *
 * Extracted from ingest-media.ts so BOTH the legacy media ingestion and the
 * new advanced audio pipeline (audio-pipeline.ts) can use them without
 * import cycles:
 *   - getZai()        cached z-ai-web-dev-sdk instance (ASR + vision)
 *   - asrOne()        one WAV buffer → text (ZAI ASR → OpenAI-Whisper fallback)
 *   - probeDuration() ffprobe duration
 *   - tmpDir()        temp dir for ffmpeg scratch files
 *   - fmtTimestamp()  seconds → "mm:ss"
 */ 





const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_5__/* .createLogger */ .h)('AsrProvider');
const zaiGlobal = globalThis;
async function getZai() {
    if (!zaiGlobal.__medqZaiMedia) {
        zaiGlobal.__medqZaiMedia = (async ()=>{
            const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 902381));
            if (!mod.default?.create) throw new Error('sdk unavailable');
            return mod.default.create();
        })().catch(()=>{
            zaiGlobal.__medqZaiMedia = undefined;
            return null;
        });
    }
    return zaiGlobal.__medqZaiMedia ?? null;
}
// ─── ffmpeg helpers ────────────────────────────────────────────────────────
function tmpDir() {
    return fs__WEBPACK_IMPORTED_MODULE_2___default().mkdtempSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(os__WEBPACK_IMPORTED_MODULE_4___default().tmpdir(), 'medq-ingest-'));
}
async function probeDuration(file) {
    try {
        const { stdout } = await execFileAsync('ffprobe', [
            '-v',
            'error',
            '-show_entries',
            'format=duration',
            '-of',
            'default=noprint_wrappers=1:nokey=1',
            file
        ]);
        return Number.parseFloat(stdout.trim()) || 0;
    } catch  {
        return 0;
    }
}
function fmtTimestamp(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
// ─── ASR chain ─────────────────────────────────────────────────────────────
/** Transcribe one audio segment buffer (16 kHz mono WAV) via the ASR chain. */ async function asrOne(wavBuffer) {
    // 1. ZAI SDK ASR (verified in this environment)
    let lastReason = '';
    const zai = await getZai();
    if (zai) {
        try {
            const res = await zai.audio.asr.create({
                file_base64: wavBuffer.toString('base64')
            });
            if (typeof res?.text === 'string') return res.text.trim();
        } catch (e) {
            lastReason = e instanceof Error ? e.message : String(e);
            log.warn?.(`ZAI ASR failed: ${lastReason}`);
        }
    }
    // 2. OpenAI-compatible Whisper via env (ASR_OPENAI_* / OPENAI_*)
    const apiKey = process.env.ASR_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (apiKey) {
        const baseUrl = (process.env.ASR_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
        const model = process.env.ASR_OPENAI_MODELS || 'whisper-1';
        try {
            const form = new FormData();
            form.set('file', new Blob([
                new Uint8Array(wavBuffer)
            ], {
                type: 'audio/wav'
            }), 'segment.wav');
            form.set('model', model);
            const res = await fetch(`${baseUrl}/audio/transcriptions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
                body: form,
                signal: AbortSignal.timeout(120000)
            });
            if (res.ok) {
                const json = await res.json();
                if (typeof json.text === 'string') return json.text.trim();
            }
            lastReason = `whisper HTTP ${res.status}`;
        } catch (e) {
            lastReason = e instanceof Error ? e.message : String(e);
            log.warn?.(`Whisper ASR failed: ${lastReason}`);
        }
    }
    // Keep the LAST provider error in the message so callers can detect
    // rate limits (429 / "too many requests") and retry with backoff.
    throw new Error(`No speech-to-text provider is available${lastReason ? ` (last provider error: ${lastReason.slice(0, 180)})` : ' (ZAI ASR unreachable and no ASR_OPENAI_API_KEY)'}`);
}


/***/ })

};
;