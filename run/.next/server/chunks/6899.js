"use strict";
exports.id = 6899;
exports.ids = [6899];
exports.modules = {

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


/***/ })

};
;