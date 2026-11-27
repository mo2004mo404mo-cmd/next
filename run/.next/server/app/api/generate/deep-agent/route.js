"use strict";
(() => {
var exports = {};
exports.id = 6760;
exports.ids = [6760,6899];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 55591:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

/***/ }),

/***/ 74075:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 79748:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 134631:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 157075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 173566:
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 200261:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 256899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyzeVideoFrames: () => (/* binding */ analyzeVideoFrames),
/* harmony export */   carvePdfJpegs: () => (/* binding */ carvePdfJpegs),
/* harmony export */   describeImage: () => (/* binding */ describeImage),
/* harmony export */   iN: () => (/* binding */ detectFileKind),
/* harmony export */   parseMediaFile: () => (/* binding */ parseMediaFile),
/* harmony export */   transcribeAudio: () => (/* binding */ transcribeAudio)
/* harmony export */ });
/* unused harmony exports extractVideoContent, ocrScannedPdf */
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
/* harmony import */ var _scene_detect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(515390);
/* harmony import */ var _audio_pipeline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(69985);
/**
 * knowledge/ingest-media.ts — turn audio / video / image / document files
 * into text corpora for the RAG library.
 *
 * Verified-capability chain (probed in this environment):
 *   - ASR:  z-ai-web-dev-sdk `audio.asr.create({ file_base64 })` ✅
 *           (fallback: OpenAI-compatible Whisper via ASR_OPENAI_API_KEY)
 *   - VLM:  z-ai-web-dev-sdk `chat.completions.createVision` (glm-4.5v) ✅
 *   - ffmpeg + ffprobe: segment / strip video / extract frames ✅
 *
 * Design notes:
 *   - Audio is transcoded to 16 kHz mono PCM WAV and split into 25 s
 *     segments BEFORE ASR (the provider enforces a hard 0-30 s duration cap
 *     and WAV/WebM-only input, probed live: 32 s WAV → HTTP 400 "文件时长限
 *     制为0-30秒", MP3 → 400 "unsupported audio format"). Every segment's
 *     transcript is prefixed with [mm:ss], which flows into chunk metadata
 *     → "what did the lecturer say at 12:34" retrieval.
 *   - Video = audio track (transcribed) + frames sampled EVENLY across the
 *     full duration (VLM-described), merged into one timestamped document.
 *   - Scanned PDFs: when unpdf yields (near-)empty text, baseline JPEG
 *     streams are carved straight out of the PDF bytes and OCR'd via the
 *     VLM — zero extra dependencies, covers flatbed scans.
 *   - Office/EPUB containers (jszip): PPTX → slide text + speaker notes +
 *     embedded slide images (VLM OCR); DOCX → text + embedded images;
 *     XLSX → per-sheet rows (exceljs); EPUB → spine-ordered chapters.
 */ 







const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('IngestMedia');
const AUDIO_EXT = new Set([
    'mp3',
    'wav',
    'm4a',
    'aac',
    'ogg',
    'oga',
    'opus',
    'flac',
    'wma',
    'webm',
    'aiff',
    'amr',
    '3gp'
]);
const VIDEO_EXT = new Set([
    'mp4',
    'mov',
    'avi',
    'mkv',
    'webm',
    'flv',
    'wmv',
    'mpeg',
    'mpg',
    'm4v',
    '3g2'
]);
const IMAGE_EXT = new Set([
    'png',
    'jpg',
    'jpeg',
    'webp',
    'bmp',
    'gif',
    'tiff',
    'tif',
    'heic'
]);
function detectFileKind(fileName, mimeType) {
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const mime = (mimeType || '').toLowerCase();
    if (mime.startsWith('audio/') || AUDIO_EXT.has(ext)) {
        // webm is ambiguous (can hold audio or video) — trust the declared mime
        if (ext === 'webm' && mime.startsWith('video/')) return 'video';
        return 'audio';
    }
    if (mime.startsWith('video/') || VIDEO_EXT.has(ext)) return 'video';
    if (mime.startsWith('image/') || IMAGE_EXT.has(ext)) return 'image';
    return 'document';
}
// ─── Shared ZAI instance: moved to asr-provider.ts (used by BOTH the legacy
// media ingestion and the advanced audio pipeline). getZai / asrOne /
// probeDuration / tmpDir / fmtTimestamp are imported above. ────────────────
/** Vision model candidates, tried against the REAL image; first success cached. */ const visionGlobal = globalThis;
const VISION_MODELS = [
    'glm-4.5v',
    'glm-4.6v',
    'glm-4v'
];
/** Stage 3: VLM budget for video scene analysis (scenes beyond this persist transcript-only). */ const MAX_VLM_SCENES = 12;
/**
 * Transcribe an audio/video file buffer.
 *
 * DELEGATES to the advanced pipeline (audio-pipeline.ts): loudnorm → VAD
 * silence segmentation → per-segment ASR → sentence-level [mm:ss] timings
 * → paragraphs. The legacy { text, durationSec, segments } shape is kept
 * for the video path; the audio path uses transcribeAdvanced directly so it
 * can store the full structured transcript on source meta.
 */ async function transcribeAudio(input, opts = {}) {
    const result = await (0,_audio_pipeline__WEBPACK_IMPORTED_MODULE_7__/* .transcribeAdvanced */ .yE)(input, opts);
    return (0,_audio_pipeline__WEBPACK_IMPORTED_MODULE_7__/* .toLegacyTranscription */ .l_)(result);
}
// ─── VLM image description ─────────────────────────────────────────────────
/**
 * Describe/OCR an image buffer with the vision model. Model candidates are
 * tried directly against the REAL image (no tiny probe image — a degenerate
 * 1×1 probe made every model look "broken" and silently disabled all OCR);
 * the first model that answers is cached. A 400 "image parse" error means
 * the INPUT image is unusable — bail immediately instead of retrying.
 * Returns null when no vision capability is reachable.
 */ async function describeImage(image, mimeType, instruction) {
    const zai = await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .getZai */ .Tz)();
    if (!zai) return null;
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpeg';
    const dataUrl = `data:image/${ext};base64,${image.toString('base64')}`;
    const cached = visionGlobal.__medqZaiVisionModel;
    const candidates = cached ? [
        cached,
        ...VISION_MODELS.filter((m)=>m !== cached)
    ] : VISION_MODELS;
    for (const model of candidates){
        try {
            // Shared resilience layer: jittered exponential backoff on 429/5xx/
            // network blips plus the process-wide gateway concurrency slot — batch
            // ingestion (10+ images in one file) no longer fires N simultaneous
            // vision calls into a ~10/min quota.
            const { withGatewayResilience } = await __webpack_require__.e(/* import() */ 4399).then(__webpack_require__.bind(__webpack_require__, 204399));
            const res = await withGatewayResilience(()=>zai.chat.completions.createVision({
                    model,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: instruction
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: dataUrl
                                    }
                                }
                            ]
                        }
                    ],
                    thinking: {
                        type: 'disabled'
                    }
                }), {
                label: `vision:${model}`,
                retries: 2
            });
            const text = res?.choices?.[0]?.message?.content || '';
            if (text.trim()) {
                visionGlobal.__medqZaiVisionModel = model;
                return text.trim();
            }
        // empty answer — try the next model
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            if (msg.includes('1210') || msg.includes('图片输入格式') || msg.includes('image format')) {
                // the image itself is unparseable — no model will fix it
                log.warn?.('VLM rejected the image as unparseable (format/parse error)');
                return null;
            }
            log.warn?.(`VLM ${model} failed: ${msg.slice(0, 140)}`);
        // next model in the chain
        }
    }
    return null;
}
// ─── XML / container helpers (PPTX, DOCX media, EPUB) ───────────────────────
/** Decode the handful of XML entities that appear in OOXML text runs. */ function decodeXmlEntities(s) {
    return s.replace(/&#x([0-9a-fA-F]+);/g, (_, h)=>String.fromCodePoint(Number.parseInt(h, 16))).replace(/&#(\d+);/g, (_, d)=>String.fromCodePoint(Number(d))).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
}
/** DrawingML (pptx slide / notes) → text: one line per <a:p>, <a:t> runs joined. */ function pptxSlideText(xml) {
    const lines = [];
    for (const m of xml.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)){
        const runs = [
            ...m[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)
        ].map((r)=>decodeXmlEntities(r[1]));
        const line = runs.join('').replace(/\s+/g, ' ').trim();
        if (line) lines.push(line);
    }
    return lines.join('\n');
}
async function loadZip(buffer) {
    const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(4191)]).then(__webpack_require__.t.bind(__webpack_require__, 76364, 23))).default;
    return {
        zip: await JSZip.loadAsync(buffer)
    };
}
/** Sniff the raster-image MIME type from magic bytes (extension-agnostic). */ function sniffImageMime(buf) {
    if (buf.length < 12) return null;
    if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
    if (buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
    if (buf.slice(0, 3).toString('latin1') === 'GIF') return 'image/gif';
    if (buf.slice(0, 2).toString('latin1') === 'BM') return 'image/bmp';
    return null;
}
const EMBEDDED_IMAGE_PROMPT = 'You are OCR-ing an image embedded in a document for a medical study library. ' + '1) Transcribe ALL visible text verbatim (headings, labels, values, captions, chart axes and numbers). ' + '2) Describe the visual content precisely (diagram structure, chart trends with numbers, anatomy, pathology). ' + 'Output the transcription under "TEXT:", then the description under "VISUAL:".';
/**
 * PPTX → per-slide text + speaker notes + embedded slide images (mapped to
 * their slide via ppt/slides/_rels/slideN.xml.rels → ../media/*).
 */ async function parsePptx(buffer) {
    const { zip } = await loadZip(buffer);
    const slideNums = [];
    zip.forEach((relPath)=>{
        const m = relPath.match(/^ppt\/slides\/slide(\d+)\.xml$/);
        if (m) slideNums.push(Number(m[1]));
    });
    slideNums.sort((a, b)=>a - b);
    if (slideNums.length === 0) throw new Error('PPTX contains no slides.');
    const parts = [];
    const images = [];
    for (const n of slideNums.slice(0, 200)){
        const slideXml = await zip.file(`ppt/slides/slide${n}.xml`)?.async('string') || '';
        const slideText = pptxSlideText(slideXml);
        const notesXml = await zip.file(`ppt/notesSlides/notesSlide${n}.xml`)?.async('string') || '';
        const notes = pptxSlideText(notesXml).replace(/\n+/g, ' ').trim();
        // Embedded images for this slide (cap: 2/slide, 8 total, raster ≥ 8 KB — skip icons/dividers)
        const relsXml = await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async('string') || '';
        let perSlide = 0;
        for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)){
            const tagStr = tag[0];
            if (!/\/image"/.test(tagStr)) continue;
            const target = tagStr.match(/Target="([^"]+)"/)?.[1];
            if (!target) continue;
            const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
            if (perSlide >= 2 || images.length >= 8) break;
            const img = await zip.file(mediaPath)?.async('nodebuffer');
            if (!img || img.length < 8000) continue;
            const mimeType = sniffImageMime(img); // extension-agnostic (targets can be extension-less)
            if (!mimeType) continue;
            images.push({
                slide: n,
                buffer: img,
                mimeType
            });
            perSlide++;
        }
        const block = [];
        if (slideText) block.push(slideText);
        if (notes) block.push(`Speaker notes: ${notes}`);
        parts.push(`— Slide ${n} —\n${block.join('\n')}`);
    }
    const hasText = parts.some((p)=>p.replace(/— Slide \d+ —|Speaker notes:/g, '').trim().length > 0);
    if (!hasText && images.length === 0) {
        throw new Error('PPTX contains no extractable slide text, notes, or images.');
    }
    return {
        text: parts.join('\n\n'),
        slides: slideNums.length,
        images
    };
}
/** XLSX → text: one block per sheet, rows as " | "-joined lines. Caps: 25 sheets / 400 rows / 32 cols. */ async function parseXlsx(buffer) {
    const ExcelJS = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 378608, 23));
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const parts = [];
    let totalRows = 0;
    for (const ws of workbook.worksheets.slice(0, 25)){
        const lines = [];
        const rowCount = Math.min(ws.rowCount || 0, 400);
        const colCount = Math.min(ws.columnCount || 0, 32);
        for(let r = 1; r <= rowCount; r++){
            const row = ws.getRow(r);
            const cells = [];
            for(let c = 1; c <= colCount; c++){
                const v = row.getCell(c)?.text ?? '';
                cells.push(typeof v === 'string' ? v.trim() : v == null ? '' : String(v));
            }
            const line = cells.join(' | ').replace(/(\s*\|\s*)+$/g, '').trim();
            if (line) lines.push(line);
        }
        if (lines.length) {
            parts.push(`## Sheet: ${ws.name}\n${lines.join('\n')}`);
            totalRows += lines.length;
        }
    }
    if (!parts.length) throw new Error('XLSX contains no readable cell data.');
    return {
        text: parts.join('\n\n'),
        sheets: workbook.worksheets.length,
        rows: totalRows
    };
}
function htmlToPlainText(html) {
    return decodeXmlEntities(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ')).replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
function cleanInline(s) {
    return decodeXmlEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
/** EPUB → text: spine order from the OPF, each xhtml chapter stripped to plain text. */ async function parseEpub(buffer) {
    const { zip } = await loadZip(buffer);
    const containerXml = await zip.file('META-INF/container.xml')?.async('string') || '';
    const opfPath = containerXml.match(/full-path="([^"]+)"/)?.[1] || Object.keys(zip.files).find((p)=>p.endsWith('.opf')) || '';
    if (!opfPath) throw new Error('EPUB structure is invalid (no .opf package document found).');
    const opfXml = await zip.file(opfPath)?.async('string') || '';
    if (!opfXml) throw new Error('EPUB is missing its package document.');
    const opfDir = opfPath.includes('/') ? opfPath.slice(0, opfPath.lastIndexOf('/') + 1) : '';
    const manifest = new Map();
    for (const item of opfXml.matchAll(/<item\b[^>]*>/g)){
        const id = item[0].match(/id="([^"]+)"/)?.[1];
        const href = item[0].match(/href="([^"]+)"/)?.[1];
        if (id && href) manifest.set(id, href);
    }
    const chapters = [];
    const seen = new Set();
    for (const ref of opfXml.matchAll(/<itemref\b[^>]*idref="([^"]+)"[^>]*>/g)){
        const href = manifest.get(ref[1]);
        if (!href || chapters.length >= 400) continue;
        let chapterPath;
        try {
            chapterPath = decodeURIComponent(href.startsWith('/') ? href.slice(1) : opfDir + href);
        } catch  {
            chapterPath = href;
        }
        if (seen.has(chapterPath)) continue;
        seen.add(chapterPath);
        const entry = zip.file(chapterPath);
        if (!entry) continue;
        const html = await entry.async('string');
        const title = cleanInline(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '') || cleanInline(html.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1] || '') || `Chapter ${chapters.length + 1}`;
        const text = htmlToPlainText(html);
        if (text) chapters.push(`# ${title || `Chapter ${chapters.length + 1}`}\n\n${text}`);
    }
    if (!chapters.length) throw new Error('EPUB contains no readable chapters.');
    return {
        text: chapters.join('\n\n').slice(0, 900000),
        chapters: chapters.length
    };
}
/** DOCX/PPTX embedded images → VLM descriptions, one block per image. */ async function describeEmbeddedImages(entries) {
    const notes = [];
    for (const e of entries){
        const desc = await describeImage(e.buffer, e.mimeType, EMBEDDED_IMAGE_PROMPT);
        if (desc) notes.push(`${e.label}\n${desc}`);
    }
    return notes;
}
// ─── Video: audio + sampled frames ─────────────────────────────────────────
const MAX_VIDEO_FRAMES = 12;
/** Convert an exotic still image (HEIC, TIFF, odd container) to JPEG via ffmpeg. */ async function toJpegViaFfmpeg(input) {
    const dir = (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .tmpDir */ .bv)();
    try {
        const inPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'input.bin');
        fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(inPath, input);
        const outPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'out.jpg');
        await execFileAsync('ffmpeg', [
            '-y',
            '-i',
            inPath,
            '-frames:v',
            '1',
            '-vf',
            'scale=1920:-2',
            '-q:v',
            '4',
            outPath
        ], {
            timeout: 60000,
            maxBuffer: 1024 * 1024 * 16
        });
        return fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(outPath) && fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(outPath).size > 1000 ? fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(outPath) : null;
    } catch  {
        return null;
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}
/**
 * Full video-to-text: transcribe the audio track and VLM-describe 6-12
 * frames sampled evenly across the FULL duration (short clips get dense
 * coverage; hour-long lectures still get frames start-to-end). The two
 * extractions run sequentially (both are ffmpeg-bound on the same temp copy).
 */ async function extractVideoContent(input, opts = {}) {
    const dir = (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .tmpDir */ .bv)();
    const inputPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'input.bin');
    fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(inputPath, input);
    try {
        const durationSec = await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .probeDuration */ .D5)(inputPath);
        // 0. Scene boundaries (Stage 3): ffmpeg scene-cut detection, falling
        // back to even time windows when nothing crosses the threshold
        // (single-set lectures, screencasts). Either way the video gets a
        // temporal scene index with mediaTimeSec navigation; scenes beyond
        // the VLM budget persist transcript-only instead of vanishing.
        let sceneSpans = [];
        try {
            const cuts = await (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .detectSceneCuts */ .He)(inputPath);
            if (cuts.length > 0) {
                sceneSpans = (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .buildScenes */ .og)(cuts.map((c)=>c.atSec), durationSec, {
                    minSceneSec: 5,
                    maxScenes: 60
                }).map((s)=>({
                        ...s,
                        detection: 'scene-cut'
                    }));
            }
        } catch  {
            log.info?.(`scene detection failed for "${opts.fileName || 'video'}" — using even time windows`);
        }
        if (sceneSpans.length === 0) {
            sceneSpans = (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .buildEvenWindows */ .En)(durationSec, {
                minWindowSec: 60,
                maxScenes: 60,
                targetScenes: 24
            }).map((s)=>({
                    ...s,
                    detection: 'even-window'
                }));
        }
        // 1. Audio track → transcription (write a single wav, then segment).
        // NON-FATAL: plenty of valid videos have NO audio stream at all
        // (screen recordings, microscope camera exports, muted demo clips) —
        // ffmpeg then exits non-zero ("does not contain any stream"), which
        // used to fail the WHOLE ingestion. Skip audio and keep the frames.
        const wavPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'audio.wav');
        try {
            await execFileAsync('ffmpeg', [
                '-y',
                '-i',
                inputPath,
                '-vn',
                '-ar',
                '16000',
                '-ac',
                '1',
                '-c:a',
                'pcm_s16le',
                wavPath
            ], {
                timeout: 300000,
                maxBuffer: 1024 * 1024 * 64
            });
        } catch  {
            log.info?.(`no audio stream in "${opts.fileName || 'video'}" — continuing with visual frames only`);
        }
        let transcript = '';
        let audioSegments = [];
        if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(wavPath) && fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(wavPath).size > 1024) {
            const wavBuf = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(wavPath);
            try {
                const result = await transcribeAudio(wavBuf, opts);
                transcript = result.text;
                audioSegments = result.segments;
            } catch (e) {
                log.warn?.(`video audio transcription failed: ${e instanceof Error ? e.message : e}`);
            }
        }
        // 2. Frame sampling at SCENE midpoints (≤ MAX_VLM_SCENES evenly-picked
        // scenes when there are more) — replaces the old blind even-spread:
        // each analyzed frame now represents a real content segment, and its
        // description lands on the scene that contains it.
        const vlmScenes = (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .pickVlmScenes */ .K_)(sceneSpans, MAX_VLM_SCENES);
        const frameTsList = vlmScenes.map((s)=>s.midSec);
        const frameDir = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'frames');
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(frameDir, {
            recursive: true
        });
        for(let i = 0; i < frameTsList.length; i++){
            try {
                await execFileAsync('ffmpeg', [
                    '-y',
                    '-ss',
                    String(frameTsList[i]),
                    '-i',
                    inputPath,
                    '-frames:v',
                    '1',
                    '-an',
                    '-vf',
                    'scale=960:-2',
                    '-q:v',
                    '4',
                    path__WEBPACK_IMPORTED_MODULE_3___default().join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`)
                ], {
                    timeout: 90000,
                    maxBuffer: 1024 * 1024 * 16
                });
            } catch  {
            // unreadable timestamp (corrupt/odd seek) — skip that frame
            }
        }
        const frameFiles = fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(frameDir) ? fs__WEBPACK_IMPORTED_MODULE_2___default().readdirSync(frameDir).filter((f)=>f.endsWith('.jpg')).sort() : [];
        const zai = await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .getZai */ .Tz)();
        const visionNotes = [];
        const analyzedFrames = [];
        if (frameFiles.length && zai) {
            for(let i = 0; i < frameFiles.length; i++){
                const offsetSec = frameTsList[i] ?? 0;
                const buf = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(frameDir, frameFiles[i]));
                const desc = await describeImage(buf, 'image/jpeg', 'This is a frame from an educational video. Extract ALL visible text (slides, diagrams, labels, titles) verbatim, then describe the medical/educational content shown in 1-2 sentences. Be specific and factual.');
                if (desc) {
                    analyzedFrames.push({
                        offsetSec,
                        description: desc
                    });
                    visionNotes.push(`[${(0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .fmtTimestamp */ .YH)(offsetSec)}] (visual) ${desc}`);
                }
            }
        }
        // 3. Assemble per-scene payloads: transcript segments by containment,
        // frame descriptions by containment (nearest scene wins at edges).
        const sceneTranscripts = (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .assignTranscriptToScenes */ .w_)(audioSegments, sceneSpans);
        const sceneDescriptions = (0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .assignDescriptionsToScenes */ .fQ)(analyzedFrames, sceneSpans);
        const scenes = sceneSpans.map((s, i)=>({
                sceneIdx: s.sceneIdx,
                startSec: s.startSec,
                endSec: s.endSec,
                detection: s.detection,
                description: sceneDescriptions[i] ?? '',
                transcript: sceneTranscripts[i] ?? ''
            }));
        // 4. Flattened document text (backward-compatible chunks) — the scene
        // timeline section is capped + trimmed so it orients retrieval
        // without doubling the transcript's token weight.
        const parts = [];
        if (transcript.trim()) parts.push('# Spoken content\n' + transcript);
        if (visionNotes.length) parts.push('# On-screen visuals\n' + visionNotes.join('\n'));
        if (scenes.length) {
            const timeline = scenes.slice(0, 40).map((s)=>`[${(0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .fmtSec */ .bz)(s.startSec)}–${(0,_scene_detect__WEBPACK_IMPORTED_MODULE_6__/* .fmtSec */ .bz)(s.endSec)}] (scene ${s.sceneIdx + 1}${s.detection === 'even-window' ? ', time window' : ''}) ` + [
                    s.description.slice(0, 300),
                    s.transcript.slice(0, 300)
                ].filter(Boolean).join(' — ') || '(no content extracted)');
            parts.push('# Scene timeline\n' + timeline.join('\n'));
        }
        if (parts.length === 0) {
            throw new Error(`No audio or visual content could be extracted from "${opts.fileName || 'video'}" ` + `(audio segments: ${audioSegments.length}, frames: ${frameFiles.length}).`);
        }
        return {
            text: parts.join('\n\n'),
            durationSec,
            transcript,
            scenes
        };
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}
// ─── Question-focused video analysis (deep agent) ──────────────────────────
/**
 * Analyze a retained video with the vision model for QUESTION AUTHORING —
 * unlike extractVideoContent (bulk ingestion, generic prompts), this takes
 * the agent's specific question focus ("which surgical technique is
 * demonstrated?") and describes evenly-sampled frames against it, so the
 * agent can write "watch the video and identify the technique" questions
 * grounded in what is actually shown.
 *
 * Frames are sampled evenly across the duration (6-10, capped for the
 * vision quota) and described individually with the caller's instruction.
 * The audio track is NOT re-transcribed here — the stored transcript is
 * merged by the caller (re-running ASR would take minutes for lectures).
 */ async function analyzeVideoFrames(input, instruction, opts = {}) {
    const dir = (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .tmpDir */ .bv)();
    const inputPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'input.bin');
    fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(inputPath, input);
    try {
        const durationSec = await (0,_asr_provider__WEBPACK_IMPORTED_MODULE_5__/* .probeDuration */ .D5)(inputPath);
        const frameCount = Math.max(1, Math.min(opts.maxFrames ?? 8, 10));
        const frameTs = (i)=>durationSec > 0 ? Math.min(Math.floor((i + 0.5) * durationSec / frameCount), Math.max(0, Math.floor(durationSec - 0.5))) : 0;
        const frameDir = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'frames');
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(frameDir, {
            recursive: true
        });
        for(let i = 0; i < frameCount; i++){
            try {
                await execFileAsync('ffmpeg', [
                    '-y',
                    '-ss',
                    String(frameTs(i)),
                    '-i',
                    inputPath,
                    '-frames:v',
                    '1',
                    '-an',
                    '-vf',
                    'scale=960:-2',
                    '-q:v',
                    '4',
                    path__WEBPACK_IMPORTED_MODULE_3___default().join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`)
                ], {
                    timeout: 90000,
                    maxBuffer: 1024 * 1024 * 16
                });
            } catch  {}
        }
        const frameFiles = fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(frameDir) ? fs__WEBPACK_IMPORTED_MODULE_2___default().readdirSync(frameDir).filter((f)=>f.endsWith('.jpg')).sort() : [];
        if (!frameFiles.length) return null;
        const frames = [];
        for(let i = 0; i < frameFiles.length; i++){
            const buf = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(frameDir, frameFiles[i]));
            const offsetSec = frameTs(Number.parseInt(frameFiles[i].replace(/\D/g, ''), 10) || 0);
            const desc = await describeImage(buf, 'image/jpeg', instruction);
            if (desc) frames.push({
                offsetSec,
                description: desc
            });
        }
        if (!frames.length) return null;
        return {
            durationSec,
            frames
        };
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}
// ─── Scanned-PDF rescue: carve embedded JPEGs, OCR via VLM ─────────────────
/** Carve baseline JPEG streams (FFD8…FFD9) out of raw PDF bytes. */ function carvePdfJpegs(pdf, max = 12) {
    const images = [];
    let start = -1;
    for(let i = 0; i < pdf.length - 1 && images.length < max; i++){
        if (pdf[i] === 0xff && pdf[i + 1] === 0xd8) {
            start = i;
        } else if (start >= 0 && pdf[i] === 0xff && pdf[i + 1] === 0xd9) {
            const jpg = pdf.subarray(start, i + 2);
            // Heuristic: real photos are > 15 KB; markers inside text streams are noise.
            if (jpg.length > 15000) images.push(Buffer.from(jpg));
            start = -1;
        }
    }
    return images;
}
/**
 * OCR a scanned PDF: carve embedded page-scan JPEGs and VLM each one.
 * Returns the OCR'd text, or null when nothing could be recovered.
 */ async function ocrScannedPdf(pdf, opts = {}) {
    const jpegs = carvePdfJpegs(pdf, 12);
    if (jpegs.length === 0) return null;
    const pages = [];
    for(let i = 0; i < jpegs.length; i++){
        const text = await describeImage(jpegs[i], 'image/jpeg', 'This is a scanned page of a document. Transcribe ALL text on the page verbatim, preserving structure (headings, lists, tables). If parts are unreadable, transcribe the readable parts. Output only the transcription.');
        if (text) pages.push(`— Page ${i + 1}${opts.pageCountHint ? ` of ${opts.pageCountHint}` : ''} —\n${text}`);
    }
    return pages.length ? pages.join('\n\n') : null;
}
/** Parse a DOCX buffer with mammoth (server-side — same lib the client uses). */ async function parseDocx(buffer) {
    const mammoth = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 517393, 23));
    const result = await mammoth.extractRawText({
        buffer
    });
    return result.value || '';
}
/**
 * Master entry: parse ANY supported upload into text for the RAG library.
 * Throws a descriptive error for genuinely unsupported inputs.
 */ async function parseMediaFile(fileName, buffer, mimeType) {
    const kind = detectFileKind(fileName, mimeType);
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    if (kind === 'audio') {
        const result = await (0,_audio_pipeline__WEBPACK_IMPORTED_MODULE_7__/* .transcribeAdvanced */ .yE)(buffer, {
            fileName
        });
        return {
            title: fileName,
            mimeType: mimeType || 'audio/*',
            text: result.timestampedText,
            fileKind: kind,
            meta: {
                durationSec: Math.round(result.durationSec),
                transcription: 'advanced-vad-asr',
                // Full structured transcript — powers the Transcript Studio UI
                // (sentences, paragraphs, insights, stats). Heavy rendered texts are
                // stripped by toStoredTranscript (they live in the document content).
                transcript: (0,_audio_pipeline__WEBPACK_IMPORTED_MODULE_7__/* .toStoredTranscript */ .Xn)(result)
            }
        };
    }
    if (kind === 'video') {
        const result = await extractVideoContent(buffer, {
            fileName
        });
        return {
            title: fileName,
            mimeType: mimeType || 'video/*',
            text: `# Transcript of "${fileName}" (video, ${Math.round(result.durationSec)}s)\n\n${result.text}`,
            fileKind: kind,
            meta: {
                durationSec: Math.round(result.durationSec),
                transcription: 'asr+vlm-frames',
                ...result.scenes.length ? {
                    scenes: result.scenes.length
                } : {}
            },
            ...result.scenes.length ? {
                scenes: result.scenes
            } : {}
        };
    }
    if (kind === 'image') {
        // Magic-byte sniff first; exotic containers (HEIC, TIFF, odd formats) get
        // an ffmpeg → JPEG conversion pass so the VLM always receives a standard
        // raster format.
        let img = buffer;
        let mime = sniffImageMime(buffer) || mimeType || 'image/jpeg';
        if (!sniffImageMime(buffer)) {
            const converted = await toJpegViaFfmpeg(buffer);
            if (converted) {
                img = converted;
                mime = 'image/jpeg';
            }
        }
        const text = await describeImage(img, mime.startsWith('image/') ? mime : 'image/jpeg', 'You are OCR-ing an image for a medical study library. 1) Transcribe ALL visible text verbatim (headings, labels, values, captions). 2) Describe the visual content precisely (anatomy, pathology, diagram structure, chart trends with numbers). Output the transcription under a "TEXT:" heading, then the description under "VISUAL:".');
        if (!text) throw new Error('Image analysis is unavailable right now (no vision provider reachable).');
        return {
            title: fileName,
            mimeType: mimeType || 'image/*',
            text: `# Image: ${fileName}\n\n${text}`,
            fileKind: kind,
            meta: {
                ocr: 'vlm'
            }
        };
    }
    // ── Documents ──
    if (ext === 'docx') {
        const text = await parseDocx(buffer);
        // Embedded images (word/media/*) → VLM descriptions (charts, diagrams, scans).
        // Magic-byte sniffed — some writers store extension-less media files.
        let imageNotes = [];
        try {
            const { zip } = await loadZip(buffer);
            const media = [];
            zip.forEach((relPath)=>{
                if (/^word\/media\//.test(relPath) && !relPath.endsWith('/')) media.push(relPath);
            });
            const entries = [];
            for (const p of media.sort().slice(0, 6)){
                const img = await zip.file(p)?.async('nodebuffer');
                if (!img || img.length < 10000) continue;
                const mimeType = sniffImageMime(img);
                if (!mimeType) continue;
                entries.push({
                    label: `Embedded image ${entries.length + 1} (${p.split('/').pop()})`,
                    buffer: img,
                    mimeType
                });
            }
            imageNotes = await describeEmbeddedImages(entries);
        } catch  {
        // image extraction is best-effort
        }
        if (!text.trim() && !imageNotes.length) throw new Error('DOCX contains no extractable text.');
        return {
            title: fileName,
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            text: imageNotes.length ? `${text}\n\n# Embedded images\n\n${imageNotes.join('\n\n')}` : text,
            fileKind: 'document',
            meta: imageNotes.length ? {
                embeddedImages: imageNotes.length,
                ocr: 'vlm'
            } : undefined
        };
    }
    if (ext === 'pptx') {
        const parsed = await parsePptx(buffer);
        const imageNotes = await describeEmbeddedImages(parsed.images.map((img)=>({
                label: `— Slide ${img.slide} visual —`,
                buffer: img.buffer,
                mimeType: img.mimeType
            })));
        const body = parsed.text || '(image-only deck — no slide text)';
        const text = `# Presentation: ${fileName} (${parsed.slides} slides)\n\n${body}` + (imageNotes.length ? `\n\n# Slide visuals\n\n${imageNotes.join('\n\n')}` : '');
        return {
            title: fileName,
            mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            text,
            fileKind: 'document',
            meta: {
                slides: parsed.slides,
                ...parsed.images.length ? {
                    slideImages: parsed.images.length
                } : {},
                ...imageNotes.length ? {
                    ocr: 'vlm'
                } : {}
            }
        };
    }
    if (ext === 'xlsx') {
        const parsed = await parseXlsx(buffer);
        return {
            title: fileName,
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            text: `# Spreadsheet: ${fileName}\n\n${parsed.text}`,
            fileKind: 'document',
            meta: {
                sheets: parsed.sheets,
                rows: parsed.rows
            }
        };
    }
    if (ext === 'xls') {
        throw new Error('Legacy .xls is not supported — re-save it as .xlsx (Excel/Sheets: File → Save as .xlsx) and upload again.');
    }
    if (ext === 'epub') {
        const parsed = await parseEpub(buffer);
        return {
            title: fileName,
            mimeType: 'application/epub+zip',
            text: `# Book: ${fileName}\n\n${parsed.text}`,
            fileKind: 'document',
            meta: {
                chapters: parsed.chapters
            }
        };
    }
    if (ext === 'pdf') {
        const { getDocumentProxy, extractText } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 633925));
        const pdf = await getDocumentProxy(new Uint8Array(buffer));
        const { text, totalPages } = await extractText(pdf, {
            mergePages: true
        });
        if (text && text.trim().length > 200) {
            return {
                title: fileName,
                mimeType: 'application/pdf',
                text,
                fileKind: 'document',
                meta: {
                    pages: totalPages
                }
            };
        }
        // Scanned PDF rescue path
        const ocr = await ocrScannedPdf(buffer, {
            pageCountHint: totalPages
        });
        if (ocr) {
            return {
                title: fileName,
                mimeType: 'application/pdf',
                text: ocr,
                fileKind: 'document',
                meta: {
                    pages: totalPages,
                    ocr: 'vlm-carved-jpegs'
                }
            };
        }
        throw new Error('PDF contains no extractable text (scanned image PDF with no recoverable page scans).');
    }
    // Plain text family — reuse the knowledge pipeline's extension sets.
    const { parseFile } = await Promise.all(/* import() */[__webpack_require__.e(2538), __webpack_require__.e(5556)]).then(__webpack_require__.bind(__webpack_require__, 375556));
    const parsed = await parseFile(fileName, buffer);
    return {
        title: parsed.title,
        mimeType: parsed.mimeType,
        text: parsed.text,
        fileKind: 'document'
    };
}


/***/ }),

/***/ 257975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 300643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 344708:
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 362768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ withErrorHandler),
/* harmony export */   RK: () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// api-handler.ts — composable wrappers for App Router Route Handlers.
//
// This module builds on `withAuth` from auth-helpers.ts and adds:
//
//   1. withErrorHandler()  — try/catch around any handler, logs to the
//      shared logger, returns a clean 500 response on uncaught errors.
//
//   2. apiHandler()        — composes withAuth + withErrorHandler in one
//      call. This is the recommended wrapper for any new route handler
//      that needs authenticated access.
//



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('api');
// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────
function withErrorHandler(handler) {
    return async (req, context)=>{
        // Next.js 16 passes the second arg as { params: Promise<...> }.
        // Older / no-param routes call with just (req) — context is undefined.
        // Resolve to a plain TParams object in all cases.
        let params;
        if (context === undefined) {
            params = {};
        } else if (context instanceof Promise) {
            // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
            params = await context;
        } else if (typeof context === 'object' && context !== null && 'params' in context) {
            // Next.js 16 shape: { params: Promise<TParams> }
            const rawParams = context.params;
            params = rawParams instanceof Promise ? await rawParams : rawParams;
        } else {
            // Already-resolved params object (Next.js 15 or earlier).
            params = context;
        }
        try {
            return await handler(req, {
                params
            });
        } catch (error) {
            // Pull a route tag from the request URL so logs identify the failing route.
            const url = (()=>{
                try {
                    return new URL(req.url).pathname;
                } catch  {
                    return 'unknown';
                }
            })();
            const message = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            log.error(`uncaught error in ${url}: ${message}`, stack ?? '');
            // Don't leak internal error details in production.
            const isProd = "production" === 'production';
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Internal server error',
                ...isProd ? {} : {
                    detail: message
                }
            }, {
                status: 500
            });
        }
    };
}
// ─────────────────────────────────────────────────────────────────────────
// apiHandler — composes withAuth + withErrorHandler
//
//   export const GET = apiHandler(async (req, ctx) => {
//     return NextResponse.json({ id: ctx.userId });
//   }, { requiredRole: 'admin' });
// ─────────────────────────────────────────────────────────────────────────
function apiHandler(handler, options = {}) {
    return withErrorHandler(async (req, ctx)=>{
        // Delegate auth to withAuth-style logic, but inlined so we can preserve
        // the params shape from withErrorHandler.
        // We reuse the existing withAuth impl by calling it and forwarding.
        const wrapped = (0,_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .withAuth */ .ru)(handler, options);
        return wrapped(req, {
            params: ctx.params
        });
    });
}
// Re-export the response helpers from auth-helpers for convenience.


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 368875:
/***/ ((module) => {

module.exports = import("langchain");;

/***/ }),

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 379551:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 421946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ emitJobUpdate)
/* harmony export */ });
/**
 * Emit job progress updates to the socket.io service.
 * Called by API routes after updateJob() to push real-time updates to the browser.
 * This is fire-and-forget — errors are logged but don't affect the job.
 */ const SOCKET_SERVICE_URL = (process.env.SOCKET_PROGRESS_URL || '').replace(/\/$/, '');
/**
 * Emit a job update event to the socket service.
 * The socket service will broadcast to connected clients.
 */ function emitJobUpdate(job) {
    if (!SOCKET_SERVICE_URL) return;
    // Fire-and-forget POST to socket service
    const event = job.status === 'completed' ? 'job:completed' : job.status === 'failed' ? 'job:failed' : 'job:progress';
    fetch(`${SOCKET_SERVICE_URL}/emit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event,
            data: job
        })
    }).catch((err)=>{
        // Log but don't throw — socket notification is best-effort
        console.warn('[socket-emit] Failed to emit job update:', err);
    });
}


/***/ }),

/***/ 434366:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_job_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(603630);
/* harmony import */ var _lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(421946);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(362768);
/* harmony import */ var _lib_agent_question_deep_agent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(301518);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_5__, _lib_agent_question_deep_agent__WEBPACK_IMPORTED_MODULE_6__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_5__, _lib_agent_question_deep_agent__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * REAL Deep-Agent Question Generation API (deepagents / LangGraph)
 *
 * POST /api/generate/deep-agent
 *   Body: { topic, types?, difficulties?, system?, count?, weakTopics?,
 *           focusHint?, knowledgeSourceIds?, model? }
 *   Returns { jobId, mode: 'deep-agent' } immediately. The REAL autonomous
 *   agent runs in the background: it plans its own todos, delegates authoring
 *   to the question-author subagent, calls media/RAG tools, and saves each
 *   question itself via the save_question tool. Progress messages surface the
 *   agent's actual activity (plan updates, tool calls, subagent transitions,
 *   per-question saves) through the same job store + socket the Generate tab
 *   already consumes.
 *
 * GET /api/generate/deep-agent?jobId=...
 *   Returns the job record (polling fallback when the socket is down).
 */ 






const maxDuration = 10800;
const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_5__/* .withErrorHandler */ .FB)(async (req)=>{
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    if (!jobId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__/* .badRequest */ .li)('jobId is required');
    const job = (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId);
    if (!job) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__/* .notFound */ .mX)('Job not found');
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(job);
});
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_5__/* .withErrorHandler */ .FB)(async (req)=>{
    const body = await req.json();
    // ── AI feature gate (same policy as /api/generate and /api/generate/agent) ──
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__/* .resolveUserId */ .n$)();
    const { debitAICredits } = await __webpack_require__.e(/* import() */ 1597).then(__webpack_require__.bind(__webpack_require__, 701597));
    const gate = await debitAICredits(userId, 'generate');
    if (!gate.allowed) {
        const status = gate.reason === 'no_credits' ? 402 : 429;
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: gate.reason === 'no_credits' ? 'You have reached your daily AI generation limit and have insufficient credits.' : 'Daily AI generation limit reached.',
            reason: gate.reason,
            category: gate.category,
            used: gate.usageBefore,
            limit: gate.limit,
            balance: gate.balanceAfter,
            creditCost: 2,
            upgradeUrl: '/pricing'
        }, {
            status
        });
    }
    const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
    if (!topic) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_4__/* .badRequest */ .li)('Topic is required');
    const jobId = (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .createJob */ ._S)();
    // Ownership-filter the requested knowledge sources (RAG grounding).
    const knowledgeSourceIds = await resolveOwnedSourceIds(userId, body.knowledgeSourceIds).catch(()=>[]);
    const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        jobId,
        mode: 'deep-agent',
        engineVersion: 3,
        gated: {
            source: gate.source,
            creditsSpent: gate.creditsSpent ?? 0
        }
    });
    processDeepAgentJob(jobId, {
        topic,
        system: typeof body.system === 'string' && body.system.trim() ? body.system : 'General',
        types: Array.isArray(body.types) && body.types.length ? body.types.filter((t)=>typeof t === 'string') : [
            'mcq'
        ],
        difficulties: Array.isArray(body.difficulties) && body.difficulties.length ? body.difficulties.filter((d)=>typeof d === 'string') : [
            'Medium'
        ],
        count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 100),
        weakTopics: Array.isArray(body.weakTopics) ? body.weakTopics.filter((t)=>typeof t === 'string' && Boolean(t.trim())).slice(0, 8) : undefined,
        focusHint: typeof body.focusHint === 'string' ? body.focusHint.slice(0, 400) : undefined,
        knowledgeSourceIds,
        // "auto" (or blank) = "no selection" — normalized to undefined so the
        // runtime's default chain (env → managed Z.AI) applies. resolveModel must
        // never see the literal string "auto" (keyless zai:auto pick).
        modelString: (()=>{
            const raw = typeof body.model === 'string' ? body.model.trim() : '';
            return raw && raw !== 'auto' ? raw : undefined;
        })(),
        userId: userId ?? undefined
    }, req).catch(async (err)=>{
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: err instanceof Error ? err.message : String(err)
        });
        (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
        if (gate.source === 'credits' && gate.creditsSpent) {
            const { refundAICredits } = await __webpack_require__.e(/* import() */ 1597).then(__webpack_require__.bind(__webpack_require__, 701597));
            try {
                await refundAICredits(userId, gate, 'Deep agent generation job failed');
            } catch  {}
        }
    });
    return response;
});
/** Resolve the caller's OWN knowledge source ids (ownership filter). */ async function resolveOwnedSourceIds(userId, requested) {
    if (!Array.isArray(requested)) return [];
    const ids = requested.filter((s)=>typeof s === 'string' && Boolean(s.trim())).slice(0, 20);
    if (!ids.length) return [];
    const owned = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.findMany({
        where: {
            id: {
                in: ids
            },
            userId
        },
        select: {
            id: true
        }
    });
    return owned.map((s)=>s.id);
}
/**
 * Run the deep agent and translate its live event stream into job progress.
 *
 * Every message the user sees is a REAL agent activity: todo plan updates,
 * tool invocations, subagent delegation, and per-question saves.
 */ async function processDeepAgentJob(jobId, params, request) {
    void request; // kept for signature parity with the agent route
    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
        status: 'processing',
        progress: '🤖 Deep agent starting…'
    });
    (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
    try {
        // Verify DB connectivity before starting (fail fast, 5s budget)
        try {
            await Promise.race([
                _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.$connect(),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('DB connect timeout')), 5000))
            ]);
        } catch  {
            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                status: 'failed',
                error: 'Database connection failed. Please try again.'
            });
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
            return;
        }
        const saved = [];
        let hadError = false;
        for await (const event of (0,_lib_agent_question_deep_agent__WEBPACK_IMPORTED_MODULE_6__.runDeepAgentQuestionGenerationWithFallback)(params)){
            switch(event.type){
                case 'status':
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: `🧠 Deep agent ready — model ${event.model}`
                    });
                    break;
                case 'plan':
                    {
                        const todos = event.todos.map((t)=>t.content).filter(Boolean);
                        const first = todos[0] ? String(todos[0]).slice(0, 80) : '';
                        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                            progress: `📋 Agent plan (${todos.length} steps) — next: ${first}…`
                        });
                        break;
                    }
                case 'tool_start':
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: `🔧 Agent is calling ${formatToolName(event.tool)}…`
                    });
                    break;
                case 'tool_end':
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: event.ok ? `✓ ${formatToolName(event.tool)} finished` : `✗ ${formatToolName(event.tool)} failed — agent adapting`
                    });
                    break;
                case 'subagent':
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: event.event === 'started' ? `🤖 Agent delegating to ${event.name} subagent…` : `✓ ${event.name} subagent returned`
                    });
                    break;
                case 'saved':
                    saved.push(event.question);
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: `💾 Question ${event.index}/${params.count} saved by the agent`,
                        partialResult: event.question
                    });
                    break;
                case 'error':
                    hadError = true;
                    (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                        progress: `⚠ ${event.error.slice(0, 160)}`
                    });
                    break;
                case 'done':
                    break;
            }
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
        }
        if (saved.length > 0) {
            (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
                status: 'completed',
                result: saved
            });
            (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
            return;
        }
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: hadError ? 'The deep agent could not complete this generation. Please try again.' : 'The deep agent finished but did not save any questions. Try rephrasing the topic.'
        });
        (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
    } catch (error) {
        console.error('[deep-agent-route] job failed:', error);
        (0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .updateJob */ .lh)(jobId, {
            status: 'failed',
            error: error instanceof Error ? error.message : 'Deep agent generation failed'
        });
        (0,_lib_socket_emit__WEBPACK_IMPORTED_MODULE_3__/* .emitJobUpdate */ .S)((0,_lib_job_store__WEBPACK_IMPORTED_MODULE_2__/* .getJob */ .ax)(jobId));
    }
}
function formatToolName(tool) {
    return tool.replace(/_/g, ' ').replace(/\b\w/g, (c)=>c.toUpperCase()).slice(0, 40);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 491645:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 530714:
/***/ ((module) => {

module.exports = require("node:vm");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 579646:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 603630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _S: () => (/* binding */ createJob),
/* harmony export */   ax: () => (/* binding */ getJob),
/* harmony export */   lh: () => (/* binding */ updateJob)
/* harmony export */ });
/* unused harmony export deleteJob */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/**
 * File-backed job store for async generation tasks.
 * Persists jobs to .job-store.json so they survive server restarts (HMR, crash, etc.).
 * Uses batched (debounced) writes to avoid excessive disk I/O.
 * Auto-cleans completed/failed jobs after 10 minutes.
 * On startup, marks any jobs stuck in "processing" for >10 minutes as "failed".
 */ 

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------
const STORE_PATH = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), '.job-store.json');
const JOB_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes — only mark processing jobs older than this as failed
/** Strip large fields (e.g. imageBase64) from results before writing to disk. */ function sanitizeForDisk(job) {
    if (!job.result || !Array.isArray(job.result)) return job;
    const sanitizedResult = job.result.map((item)=>{
        if (item && typeof item === 'object') {
            const clone = {
                ...item
            };
            if ('imageBase64' in clone) {
                delete clone.imageBase64;
            }
            return clone;
        }
        return item;
    });
    return {
        ...job,
        result: sanitizedResult
    };
}
// ---------------------------------------------------------------------------
// Load from disk on module init
// ---------------------------------------------------------------------------
const jobs = new Map();
let jobCounter = 0;
let writeScheduled = false;
try {
    if ((0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(STORE_PATH)) {
        const raw = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)(STORE_PATH, 'utf-8');
        const data = JSON.parse(raw);
        const now = Date.now();
        for (const job of data.jobs){
            // Stale processing detection: only mark as failed if processing for >10 min
            if (job.status === 'processing' && now - job.updatedAt > STALE_THRESHOLD_MS) {
                job.status = 'failed';
                job.error = 'Job was interrupted by a server restart. Please try again.';
                job.updatedAt = now;
            }
            jobs.set(job.id, job);
        }
        // Restore jobCounter so new IDs don't collide
        if (typeof data.jobCounter === 'number') {
            jobCounter = data.jobCounter;
        }
        // Persist the cleaned-up state immediately
        flushToDisk();
    }
} catch (err) {
    // If we can't read/parse the file, start fresh — don't crash the server
    console.warn('[job-store] Failed to load persisted jobs, starting fresh:', err);
}
// ---------------------------------------------------------------------------
// Batched (debounced) writes
// ---------------------------------------------------------------------------
function flushToDisk() {
    try {
        const allJobs = Array.from(jobs.values()).map(sanitizeForDisk);
        (0,fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync)(STORE_PATH, JSON.stringify({
            jobs: allJobs,
            jobCounter
        }), 'utf-8');
    } catch (err) {
        console.error('[job-store] Failed to flush jobs to disk:', err);
    }
    writeScheduled = false;
}
function scheduleWrite() {
    if (writeScheduled) return; // already scheduled
    writeScheduled = true;
    // Use a microtask-style short delay (setImmediate in Node, fallback to setTimeout)
    // This batches multiple updateJob calls in the same tick / near-future
    const schedule = typeof setImmediate === 'function' ? setImmediate : (fn)=>setTimeout(fn, 0);
    schedule(flushToDisk);
}
// ---------------------------------------------------------------------------
// Auto-cleanup: remove completed/failed jobs older than TTL
// ---------------------------------------------------------------------------
setInterval(()=>{
    const now = Date.now();
    let changed = false;
    for (const [id, job] of jobs){
        if ((job.status === 'completed' || job.status === 'failed') && now - job.updatedAt > JOB_TTL_MS) {
            jobs.delete(id);
            changed = true;
        }
    }
    if (changed) {
        scheduleWrite();
    }
}, 5 * 60 * 1000);
// ---------------------------------------------------------------------------
// Public API (same signatures as before)
// ---------------------------------------------------------------------------
/**
 * Create a new job and return its ID
 */ function createJob() {
    jobCounter++;
    const id = `job_${Date.now()}_${jobCounter}`;
    const now = Date.now();
    jobs.set(id, {
        id,
        status: 'pending',
        progress: 'Starting...',
        attempt: 0,
        result: null,
        partialResult: null,
        error: null,
        createdAt: now,
        updatedAt: now
    });
    scheduleWrite();
    return id;
}
/**
 * Update a job's status
 */ function updateJob(id, updates) {
    const job = jobs.get(id);
    if (!job) return;
    Object.assign(job, updates, {
        updatedAt: Date.now()
    });
    scheduleWrite();
}
/**
 * Get a job's data
 */ function getJob(id) {
    return jobs.get(id) || null;
}
/**
 * Delete a job
 */ function deleteJob(id) {
    jobs.delete(id);
    scheduleWrite();
}


/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 719771:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 731421:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 781630:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 825344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),
/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319225);
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(684006);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8317);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799373);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(434775);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(524235);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(200261);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(754365);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(590771);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(473461);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(767798);
/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(192280);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(662018);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445696);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(347929);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(986439);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(137527);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);

















// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/generate/deep-agent/route",
        pathname: "/api/generate/deep-agent",
        filename: "route",
        bundlePath: "app/api/generate/deep-agent/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/generate/deep-agent/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(434366),
    // In Turbopack dev mode, also provide a synchronous per-request getter so
    // server HMR updates are picked up without re-executing the entry chunk.
    // Using require() (synchronous) avoids adding async overhead that would be
    // incorrectly attributed to application-code time in devRequestTiming.
    ... false ? 0 : {}
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}

async function handler(req, res, ctx) {
    if (ctx.requestMeta) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.setRequestMeta)(req, ctx.requestMeta);
    }
    if (routeModule.isDev) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/api/generate/deep-agent/route";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if (false) {} else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = false;
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, deploymentId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;
    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);
    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    if (isIsr && !isDraftMode) {
        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);
        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];
        if (prerenderInfo) {
            if (prerenderInfo.fallback === false && !isPrerendered) {
                if (nextConfig.adapterPath) {
                    return await render404();
                }
                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();
            }
        }
    }
    let cacheKey = null;
    if (isIsr && !routeModule.isDev && !isDraftMode) {
        cacheKey = resolvedPathname;
        // ensure /index and / is normalized to one key
        cacheKey = cacheKey === '/index' ? '/' : cacheKey;
    }
    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isIsr;
    // This is a revalidation request if the request is for a static
    // page and it is not being resumed from a postponed render and
    // it is not a dynamic RSC request then it is a revalidation
    // request.
    const isStaticGeneration = isIsr && !supportsDynamicResponse;
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();
    const activeSpan = tracer.getActiveScopeSpan();
    const isWrappedByNextServer = Boolean(routerServerContext == null ? void 0 : routerServerContext.isWrappedByNextServer);
    const isMinimalMode = Boolean((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));
    const incrementalCache = (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache') || await routeModule.getIncrementalCache(req, nextConfig, prerenderManifest, isMinimalMode);
    incrementalCache == null ? void 0 : incrementalCache.resetRequestCache();
    globalThis.__incrementalCache = incrementalCache;
    const context = {
        params,
        previewProps: prerenderManifest.preview,
        renderOpts: {
            experimental: {
                authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                useCacheTimeout: nextConfig.experimental.useCacheTimeout
            },
            cacheComponents: Boolean(nextConfig.cacheComponents),
            validationLevel: nextConfig.experimental.instantInsights.validationLevel,
            supportsDynamicResponse,
            incrementalCache,
            hmrRefreshHash: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'hmrRefreshHash'),
            cacheLifeProfiles: nextConfig.cacheLife,
            staticPageGenerationTimeout: nextConfig.staticPageGenerationTimeout,
            waitUntil: ctx.waitUntil,
            onClose: (cb)=>{
                res.on('close', cb);
            },
            onAfterTaskError: undefined,
            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)
        },
        sharedContext: {
            buildId,
            deploymentId
        }
    };
    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);
    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);
    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));
    const responseGenerator = async ({ previousCacheEntry })=>{
        try {
            if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {
                res.statusCode = 404;
                // on-demand revalidate always sets this header
                res.setHeader('x-nextjs-cache', 'REVALIDATED');
                res.end('This page could not be found');
                return null;
            }
            const response = await routeModule.handle(nextReq, context);
            req.fetchMetrics = context.renderOpts.fetchMetrics;
            let pendingWaitUntil = context.renderOpts.pendingWaitUntil;
            // Attempt using provided waitUntil if available
            // if it's not we fallback to sendResponse's handling
            if (pendingWaitUntil) {
                if (ctx.waitUntil) {
                    ctx.waitUntil(pendingWaitUntil);
                    pendingWaitUntil = undefined;
                }
            }
            const cacheTags = context.renderOpts.collectedTags;
            // If the request is for a static response, we can cache it so long
            // as it's not edge.
            if (isIsr) {
                const blob = await response.blob();
                // Copy the headers from the response.
                const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);
                if (cacheTags) {
                    headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;
                }
                if (!headers['content-type'] && blob.type) {
                    headers['content-type'] = blob.type;
                }
                const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;
                const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? // route has a numeric `revalidate` but didn't declare an
                // explicit `expire` (e.g. via `cacheLife`). This mirrors the
                // build-time fallback in `build/index.ts` so cache entries
                // and the response Cache-Control header agree on the route's
                // effective expire. Routes that opt out of revalidation
                // (`revalidate: false`) or that are dynamic (`revalidate: 0`)
                // keep `expire: undefined`.
                revalidate !== false && revalidate > 0 ? nextConfig.expireTime : undefined : context.renderOpts.collectedExpire;
                // Create the cache entry for the response.
                const cacheEntry = {
                    value: {
                        kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,
                        status: response.status,
                        body: Buffer.from(await blob.arrayBuffer()),
                        headers
                    },
                    cacheControl: {
                        revalidate,
                        expire
                    }
                };
                return cacheEntry;
            } else {
                // send response without caching if not ISR
                await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, response, pendingWaitUntil);
                return null;
            }
        } catch (err) {
            // if this is a background revalidate we need to report
            // the request error here as it won't be bubbled
            if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: srcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            throw err;
        }
    };
    const handleResponse = async (currentSpan, parentSpan)=>{
        try {
            var _cacheEntry_value;
            const cacheEntry = await routeModule.handleResponse({
                req,
                nextConfig,
                cacheKey,
                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
                isFallback: false,
                prerenderManifest,
                isRoutePPREnabled: false,
                isOnDemandRevalidate,
                revalidateOnlyGenerated,
                responseGenerator,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            // we don't create a cacheEntry for ISR
            if (!isIsr) {
                return;
            }
            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E701",
                    enumerable: false,
                    configurable: true
                });
            }
            if (!isMinimalMode) {
                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
            }
            // Draft mode should never be cached
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);
            if (!(isMinimalMode && isIsr)) {
                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);
            }
            // If cache control is already set on the response we don't
            // override it to allow users to customize it via next.config
            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {
                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));
            }
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
            new Response(cacheEntry.value.body, {
                headers,
                status: cacheEntry.value.status || 200
            }));
            return;
        } catch (err) {
            if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: normalizedSrcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            // rethrow so that we can handle serving error page
            // If this is during static generation, throw the error again.
            if (isIsr) throw err;
            // Otherwise, send a 500 response.
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, new Response(null, {
                status: 500
            }));
            return;
        } finally{
            ;
            (()=>{
                if (!currentSpan) {
                    return;
                }
                let statusCode = res.statusCode;
                currentSpan.setAttributes({
                    'http.status_code': statusCode,
                    'next.rsc': false
                });
                if (statusCode && statusCode >= 500) {
                    // For 5xx status codes: SHOULD be set to 'Error' span status.
                    // x-ref: https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
                    currentSpan.setStatus({
                        code: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanStatusCode.ERROR
                    });
                    // For span status 'Error', SHOULD set 'error.type' attribute.
                    currentSpan.setAttribute('error.type', statusCode.toString());
                }
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route') || normalizedSrcPage;
                const name = `${method} ${route}`;
                currentSpan.setAttributes({
                    'next.route': route,
                    'http.route': route,
                    'next.span_name': name
                });
                currentSpan.updateName(name);
                // Propagate http.route to the parent span if one exists (e.g.
                // a platform-created HTTP span in adapter deployments).
                if (parentSpan && parentSpan !== currentSpan) {
                    parentSpan.setAttribute('http.route', route);
                    parentSpan.updateName(name);
                }
            })();
        }
    };
    // TODO: activeSpan code path is for when wrapped by
    // next-server can be removed when this is no longer used
    if (isWrappedByNextServer && activeSpan) {
        await handleResponse(activeSpan, undefined);
    } else {
        let parentSpan = tracer.getActiveScopeSpan();
        await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {
                spanName: `${method} ${srcPage}`,
                kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,
                attributes: {
                    'http.method': method,
                    'http.target': req.url
                }
            }, (span)=>handleResponse(span, parentSpan)), undefined, !isWrappedByNextServer);
    }
}

//# sourceMappingURL=app-route.js.map


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 842482:
/***/ ((module) => {

module.exports = import("sharp");;

/***/ }),

/***/ 848161:
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 912412:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 912680:
/***/ ((module) => {

module.exports = import("@langchain/quickjs");;

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 930963:
/***/ ((module) => {

module.exports = import("langchain/chat_models/universal");;

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 979428:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,1890,9611,8093,8713,859,2035,4007,7909,5566,8262,2901,2538,9985,5556,1229,2504,5554,5095,1518], () => (__webpack_exec__(825344)));
module.exports = __webpack_exports__;

})();