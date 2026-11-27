"use strict";
(() => {
var exports = {};
exports.id = 8821;
exports.ids = [8821];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

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

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 414649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PE: () => (/* binding */ extractFromFileServer),
/* harmony export */   g_: () => (/* binding */ extractAudioPassthrough),
/* harmony export */   gc: () => (/* binding */ isAudioExtension)
/* harmony export */ });
/* unused harmony export AUDIO_EXTENSIONS */
/**
 * server-file-extract.ts — Server-side file extraction (text + images).
 *
 * THE single source of truth for parsing uploads (Stage 1 convergence):
 * the client module src/lib/file-extract.ts is a thin wrapper that POSTs
 * the raw file to /api/extract, which calls into here. One parser, zero
 * pdfjs-worker drift, zero browser OOM.
 *
 * Supported: PDF, DOCX, PPTX, TXT, MD, CSV, TSV, JSON + standalone images
 * (PNG/JPEG/GIF/WebP via magic-byte sniffing) + audio passthrough (bytes
 * wrapped as a data-URL attachment for the transcribe_audio tool).
 */ const MAX_IMAGES = 24;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // skip images larger than 2 MB (VLM rejects)
/** Audio extensions passed through as attachments (chat-ASR parity). */ const AUDIO_EXTENSIONS = new Set([
    'mp3',
    'wav',
    'm4a',
    'aac',
    'ogg',
    'oga',
    'webm',
    'flac',
    'opus',
    'wma',
    'aiff',
    'amr',
    '3gp'
]);
/** True when a file name looks like audio the ASR tool can handle. */ function isAudioExtension(fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase();
    return AUDIO_EXTENSIONS.has(ext);
}
function bufToDataUrl(buf, mime) {
    return `data:${mime};base64,${buf.toString('base64')}`;
}
function sniffImageMime(buf) {
    if (buf.length < 4) return null;
    // PNG: 89 50 4E 47
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
    // JPEG: FF D8 FF
    if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
    // GIF: 47 49 46 38
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'image/gif';
    // WebP: 52 49 46 46 ... 57 45 42 50
    if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf.length > 11 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
    return null;
}
/** Attach the flat imageUrls alias every server-parsed payload carries. */ function withImageUrlAlias(content) {
    content.imageUrls = (content.images ?? []).map((img)=>img.dataUrl);
    return content;
}
// ── PPTX ───────────────────────────────────────────────────────────────────
function pptxSlideText(xml) {
    // Extract <a:t> text runs (same logic as the retired client parser)
    const parts = [];
    for (const m of xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)){
        if (m[1]) parts.push(m[1]);
    }
    return parts.join(' ').replace(/\s+/g, ' ').trim();
}
async function extractPptx(buffer) {
    const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(4191)]).then(__webpack_require__.t.bind(__webpack_require__, 76364, 23))).default;
    const zip = await JSZip.loadAsync(buffer);
    // Collect slide numbers
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
        // Embedded images for this slide via _rels
        const relsXml = await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async('string') || '';
        let perSlide = 0;
        for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)){
            const tagStr = tag[0];
            if (!/\/image"/.test(tagStr)) continue;
            const target = tagStr.match(/Target="([^"]+)"/)?.[1];
            if (!target) continue;
            const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
            if (perSlide >= 2 || images.length >= MAX_IMAGES) break;
            const img = await zip.file(mediaPath)?.async('nodebuffer');
            if (!img || img.length < 4000 || img.length > MAX_IMAGE_BYTES) continue;
            const mimeType = sniffImageMime(img);
            if (!mimeType) continue;
            images.push({
                dataUrl: bufToDataUrl(img, mimeType),
                caption: `Slide ${n}`
            });
            perSlide++;
        }
        const block = [];
        if (slideText) block.push(slideText);
        if (notes) block.push(`Speaker notes: ${notes}`);
        parts.push(`── Slide ${n} ──\n${block.join('\n')}`);
    }
    const text = parts.join('\n\n');
    if (!text.trim() && images.length === 0) {
        throw new Error('PPTX contains no extractable slide text, notes, or images.');
    }
    return {
        text,
        fileName: '',
        fileType: 'pptx',
        fileSize: buffer.length,
        images
    };
}
// ── DOCX ──────────────────────────────────────────────────────────────────
async function extractDocx(buffer) {
    const mammoth = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 517393, 23));
    const result = await mammoth.extractRawText({
        buffer
    });
    const text = result.value || '';
    // Walk word/media/* for embedded images
    const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(4191)]).then(__webpack_require__.t.bind(__webpack_require__, 76364, 23))).default;
    const zip = await JSZip.loadAsync(buffer);
    const images = [];
    let imgIdx = 0;
    const mediaFiles = Object.keys(zip.files).filter((p)=>/^word\/media\//.test(p));
    for (const mediaPath of mediaFiles){
        if (images.length >= MAX_IMAGES) break;
        const img = await zip.file(mediaPath)?.async('nodebuffer');
        if (!img || img.length < 4000 || img.length > MAX_IMAGE_BYTES) continue;
        const mimeType = sniffImageMime(img);
        if (!mimeType) continue;
        imgIdx++;
        images.push({
            dataUrl: bufToDataUrl(img, mimeType),
            caption: `Image ${imgIdx} in DOCX`
        });
    }
    if (!text.trim() && images.length === 0) {
        throw new Error('DOCX contains no extractable text or images.');
    }
    return {
        text,
        fileName: '',
        fileType: 'docx',
        fileSize: buffer.length,
        images
    };
}
// ── PDF ───────────────────────────────────────────────────────────────────
async function extractPdf(buffer) {
    // Use unpdf for text (same as the knowledge pipeline — server-proven)
    const { getDocumentProxy, extractText } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 633925));
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, {
        mergePages: true
    });
    // PDF page images: carve embedded JPEGs from the PDF stream (server-side,
    // no canvas needed). Reuses the knowledge pipeline's carvePdfJpegs.
    let images = [];
    try {
        const { carvePdfJpegs } = await Promise.all(/* import() */[__webpack_require__.e(9985), __webpack_require__.e(6899), __webpack_require__.e(3009)]).then(__webpack_require__.bind(__webpack_require__, 256899));
        const jpegs = carvePdfJpegs(buffer, MAX_IMAGES);
        images = jpegs.map((buf, i)=>({
                dataUrl: bufToDataUrl(buf, 'image/jpeg'),
                caption: `Page ${i + 1}`
            }));
    } catch  {
    // carvePdfJpegs may fail on some PDFs — text-only extraction is fine
    }
    if (!text.trim() && images.length === 0) {
        throw new Error('PDF contains no extractable text or images.');
    }
    return {
        text: text || '',
        fileName: '',
        fileType: 'pdf',
        fileSize: buffer.length,
        pageCount: pdf.numPages,
        images
    };
}
// ── Standalone image ───────────────────────────────────────────────────────
async function extractImageFile(buffer, fileName) {
    const mimeType = sniffImageMime(buffer);
    if (!mimeType) throw new Error('Unrecognized image format (expected PNG, JPEG, GIF, or WebP).');
    return {
        text: `[Standalone image upload: ${fileName}. The AI will analyze this image directly.]`,
        fileName: '',
        fileType: mimeType.split('/')[1],
        fileSize: buffer.length,
        images: [
            {
                dataUrl: bufToDataUrl(buffer, mimeType),
                caption: fileName
            }
        ]
    };
}
// ── Audio passthrough (chat-attachment parity) ─────────────────────────────
/**
 * Wrap audio bytes as a single data-URL attachment. The real ASR happens
 * later (transcribe_audio tool / knowledge pipeline) — this keeps the
 * chat-attachment contract identical to the retired client-side path.
 */ function extractAudioPassthrough(buffer, fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase() || 'mp3';
    // Canonical audio MIME per extension (matches what browsers report for
    // File.type — the attachment machinery only needs a valid audio/* prefix).
    const AUDIO_MIME = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        webm: 'audio/webm',
        m4a: 'audio/mp4',
        aac: 'audio/aac',
        flac: 'audio/flac',
        ogg: 'audio/ogg',
        oga: 'audio/ogg',
        opus: 'audio/ogg'
    };
    const mime = AUDIO_MIME[ext] ?? 'audio/mpeg';
    return {
        // Audio rides along as a single "image"-style attachment so the existing
        // server-side attachment machinery resolves it into an attachment:// URL.
        text: `[Audio file: ${fileName}. This recording will be transcribed by AI speech recognition.]`,
        fileName,
        fileType: ext,
        fileSize: buffer.length,
        images: [
            {
                dataUrl: bufToDataUrl(buffer, mime),
                caption: `Audio: ${fileName}`
            }
        ]
    };
}
// ── Master entry ───────────────────────────────────────────────────────────
async function extractFromFileServer(buffer, fileName) {
    const ext = (fileName.split('.').pop() ?? '').toLowerCase();
    let content;
    if (ext === 'pdf') {
        content = await extractPdf(buffer);
    } else if (ext === 'docx' || ext === 'doc') {
        content = await extractDocx(buffer);
    } else if (ext === 'pptx') {
        content = await extractPptx(buffer);
    } else if (ext === 'txt' || ext === 'md' || ext === 'markdown' || ext === 'csv' || ext === 'tsv' || ext === 'json') {
        const text = buffer.toString('utf8');
        content = {
            text,
            fileName: '',
            fileType: ext,
            fileSize: buffer.length
        };
    } else if ([
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp'
    ].includes(ext)) {
        content = await extractImageFile(buffer, fileName);
    } else if (ext === 'ppt') {
        throw new Error('Legacy .ppt files are not supported. Open the file in PowerPoint and save it as .pptx, then upload again.');
    } else {
        throw new Error(`Unsupported file type ".${ext}". Supported: PDF, DOCX, PPTX, TXT, MD, CSV, TSV, JSON, PNG, JPG, GIF, WEBP.`);
    }
    content.fileName = fileName;
    return withImageUrlAlias(content);
}


/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

/***/ }),

/***/ 525373:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(362768);
/* harmony import */ var _lib_server_file_extract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(414649);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);
/* harmony import */ var _lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(822567);
/* harmony import */ var _lib_uploads_upload_session_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(453062);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__]);
([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







/**
 * POST /api/extract — stateless file → text + images extraction.
 *
 * The single extraction endpoint behind the CLIENT/SERVER CONVERGENCE
 * (Stage 1 of the RAG roadmap): the browser module src/lib/file-extract.ts
 * no longer parses PDF/DOCX/PPTX itself (pdfjs worker drift, browser OOM on
 * big files) — it uploads the raw File here and gets back the exact
 * ExtractedContent shape it always returned, so every consumer
 * (generate page, chat attachments, question-import preview) keeps its
 * contract unchanged.
 *
 * Deliberately stateless: nothing is persisted, no AI is called. Contrast:
 *   - /api/knowledge/upload      → full RAG ingestion (+ persistence)
 *   - /api/questions/import/extract → AI question extraction job
 *
 * Audio files are passed through as data-URL attachments (the chat agent's
 * transcribe_audio tool handles the real ASR later) — parity with the old
 * client-side audio path.
 */ const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('ApiExtract');
const runtime = 'nodejs';
const maxDuration = 120;
// Hard ceiling across all tiers (pro = 100 MB). The per-tier cap is enforced
// below using the visitor-strategy threshold matrix (Stage 10).
const ABSOLUTE_MAX_BYTES = 100 * 1024 * 1024;
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .unauthorized */ .nc)('Sign in to extract file content');
    // Stage 10: classify the caller's access tier and apply per-tier file size cap.
    // Visitors (anonymous, guest@medq.local) get 2 MB; free = 15 MB; premium = 50 MB; pro = 100 MB.
    const tier = await (0,_lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_5__/* .resolveAccessTier */ .l6)(userId);
    const tierConfig = (0,_lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_5__/* .thresholdFor */ .De)(tier);
    const tierMaxBytes = tierConfig.fileUploadMaxMb * 1024 * 1024;
    let form;
    try {
        form = await req.formData();
    } catch  {
        return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('Expected multipart/form-data with a "file" field');
    }
    // Stage 13 (resumable uploads): the client may reference an ALREADY-UPLOADED
    // session (uploadId) instead of re-sending bytes — the chunked resumable
    // path for large files ends here BY REFERENCE. Tier + absolute caps were
    // enforced when the session was opened (POST /api/uploads), so only a
    // defensive absolute re-check remains. The session is intentionally NOT
    // deleted here — /api/knowledge/upload may ingest the same bytes next
    // (chat attachments extract AND ingest from one upload).
    const uploadIdField = form.get('uploadId');
    let fileName;
    let buffer;
    let fileSize;
    if (typeof uploadIdField === 'string' && uploadIdField.trim()) {
        const assembled = _lib_uploads_upload_session_store__WEBPACK_IMPORTED_MODULE_6__/* .uploadStore */ .NW.readAssembled(uploadIdField.trim(), userId);
        if (!assembled) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('Upload session not found, incomplete, or not yours — upload the file again');
        }
        if (assembled.size > ABSOLUTE_MAX_BYTES) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
        }
        fileName = assembled.fileName;
        buffer = assembled.buffer;
        fileSize = assembled.size;
    } else {
        const file = form.get('file');
        if (!(file instanceof File)) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('"file" field is required');
        if (file.size === 0) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('File is empty');
        if (file.size > ABSOLUTE_MAX_BYTES) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
        }
        if (file.size > tierMaxBytes) {
            const hint = tierConfig.isAnonymous ? ` — sign up for a free account to upload files up to ${(0,_lib_subscription_visitor_strategy__WEBPACK_IMPORTED_MODULE_5__/* .thresholdFor */ .De)('free').fileUploadMaxMb}MB` : '';
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)(`File exceeds the ${tierConfig.fileUploadMaxMb}MB cap for your ${tierConfig.label} tier${hint}`);
        }
        fileName = file.name || 'upload.bin';
        buffer = Buffer.from(await file.arrayBuffer());
        fileSize = file.size;
    }
    const started = Date.now();
    try {
        // Audio rides along as an attachment (ASR happens later, where the user
        // asked for it) — same contract the old client-side path had.
        const content = (0,_lib_server_file_extract__WEBPACK_IMPORTED_MODULE_3__/* .isAudioExtension */ .gc)(fileName) ? (0,_lib_server_file_extract__WEBPACK_IMPORTED_MODULE_3__/* .extractAudioPassthrough */ .g_)(buffer, fileName) : await (0,_lib_server_file_extract__WEBPACK_IMPORTED_MODULE_3__/* .extractFromFileServer */ .PE)(buffer, fileName);
        log.info?.(`extract "${fileName}" (${fileSize}B → ${content.fileType}, ` + `${content.images?.length ?? 0} images, ${content.text.length} chars, ` + `${Date.now() - started}ms) for ${userId}`);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(content);
    } catch (error) {
        // Extraction failures are input problems (unsupported type, empty PDF,
        // extension lie) — 422 with the reason, not a bare 500.
        const message = error instanceof Error ? error.message : String(error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message.slice(0, 300)
        }, {
            status: 422
        });
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

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

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

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

/***/ 725396:
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
        page: "/api/extract/route",
        pathname: "/api/extract",
        filename: "route",
        bundlePath: "app/api/extract/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/extract/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(525373),
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
    let srcPage = "/api/extract/route";
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

/***/ 822567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   De: () => (/* binding */ thresholdFor),
/* harmony export */   l6: () => (/* binding */ resolveAccessTier)
/* harmony export */ });
/* unused harmony exports VISITOR_THRESHOLDS, classifyVisitor, rateLimitKey */
/**
 * visitor-strategy.ts — Stage 10 visitor strategy threshold table.
 *
 * ── Audit context ──
 * Before this module, all unauthenticated traffic was bucketed under the
 * shared `guest@medq.local` user record (see src/lib/guest-user.tsx) with a
 * `free` subscription. That meant EVERY visitor on the internet drew from
 * ONE free-tier daily quota — a single visitor could exhaust the limit for
 * all guests, and a coordinated attacker could trivially starve the pool.
 *
 * ── Strategy ──
 * Add an explicit `visitor` tier BELOW `free` for unauthenticated traffic,
 * with much tighter per-IP caps. Authenticated users keep their existing
 * free / premium / pro tier. The matrix below is the single source of truth
 * for "what can each tier do" — wired into the rate limiter and surfaced
 * to product via /api/visitor-strategy (so the marketing site can render a
 * comparison table without re-deriving the numbers).
 *
 * ── Why a separate tier (not a flag) ──
 * A visitor's caps are PER-IP (rate-limit.ts, key=`<category>:<ip>`), while
 * an authenticated user's caps are PER-USER (key=`<category>:<userId>`).
 * Splitting the tier makes that policy explicit at the call site instead
 * of hiding it behind "isGuest" branches scattered across routes.
 */ const VISITOR_THRESHOLDS = {
    visitor: {
        label: 'Visitor',
        isAnonymous: true,
        aiGenerationsPerDay: 2,
        tutorMessagesPerDay: 3,
        fileUploadMaxMb: 2,
        fileUploadsPerDay: 1,
        videoAnalysisAllowed: false,
        deepAgentAllowed: false,
        canSaveQuestions: false,
        canUploadToLibrary: false,
        adsLevel: 'full'
    },
    free: {
        label: 'Free',
        isAnonymous: false,
        aiGenerationsPerDay: 5,
        tutorMessagesPerDay: 10,
        // 50 MB — raised from 15 MB (2026-11-03): medical PDFs (textbook
        // chapters, clinical guidelines, case reports) routinely run 20-80
        // MB; 15 MB blocked the core use case. The tier hierarchy is
        // preserved by the OTHER caps (5 uploads/day vs premium's 100, no
        // deep-agent, full ads) so file size alone no longer gates real
        // medical documents.
        fileUploadMaxMb: 50,
        fileUploadsPerDay: 5,
        videoAnalysisAllowed: true,
        deepAgentAllowed: false,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'full'
    },
    premium: {
        label: 'Premium',
        isAnonymous: false,
        aiGenerationsPerDay: 100,
        tutorMessagesPerDay: 100,
        // 80 MB — raised from 50 MB (2026-11-03) to keep a clear step above
        // the new free tier (50 MB) while staying below pro's absolute cap.
        fileUploadMaxMb: 80,
        fileUploadsPerDay: 100,
        videoAnalysisAllowed: true,
        deepAgentAllowed: true,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'minimal'
    },
    pro: {
        label: 'Pro',
        isAnonymous: false,
        aiGenerationsPerDay: 999999,
        tutorMessagesPerDay: 999999,
        fileUploadMaxMb: 100,
        fileUploadsPerDay: 999999,
        videoAnalysisAllowed: true,
        deepAgentAllowed: true,
        canSaveQuestions: true,
        canUploadToLibrary: true,
        adsLevel: 'none'
    }
};
/**
 * Classify a request into its AccessTier. The classification is the single
 * decision point routes call before applying caps — keeps policy in one file.
 *
 *   - isGuestUser=true -> 'visitor' (regardless of any other field)
 *   - otherwise -> the user's subscription tier, defaulting to 'free'
 *
 * The caller is responsible for the actual anonymous check (session lookup,
 * guest-user comparison). We don't reach into the DB here so the function
 * stays pure and unit-testable.
 */ function classifyVisitor(opts) {
    if (opts.isGuestUser) return 'visitor';
    return opts.tier ?? 'free';
}
/**
 * Look up the threshold matrix entry for a tier. Throws on unknown tier
 * (which should be impossible because AccessTier is a closed union, but
 * this guards against runtime drift if VISITOR_THRESHOLDS is edited
 * without adding the matching key).
 */ function thresholdFor(tier) {
    const t = VISITOR_THRESHOLDS[tier];
    if (!t) {
        throw new Error(`Unknown access tier: ${tier}`);
    }
    return t;
}
/**
 * Rate-limit key for a given category. Visitors are keyed by IP (since they
 * have no user id), authenticated users by userId. This separation is what
 * makes the per-IP caps for visitors actually work.
 */ function rateLimitKey(opts) {
    if (opts.tier === 'visitor') {
        return `${opts.category}:ip:${opts.ip}`;
    }
    return `${opts.category}:user:${opts.userId ?? 'unknown'}`;
}
async function loadDb() {
    const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 520903));
    return mod.db;
}
async function loadGuestResolver() {
    const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 245187));
    return mod.getGuestUserId;
}
/**
 * Resolve the AccessTier for a given userId. Server-only (touches DB).
 *
 *   - If userId === guest user id → 'visitor'
 *   - Otherwise → look up subscription.tier; default to 'free' if missing
 *
 * Lazy-imports the db + guest-user modules so the pure helpers above stay
 * unit-testable without a DB or Next runtime.
 */ async function resolveAccessTier(userId) {
    const getGuestUserId = await loadGuestResolver();
    const guestId = await getGuestUserId();
    if (userId === guestId) return 'visitor';
    const db = await loadDb();
    const sub = await db.subscription.findUnique({
        where: {
            userId
        }
    });
    const tier = sub?.tier ?? 'free';
    return classifyVisitor({
        isGuestUser: false,
        tier
    });
}


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035,3174], () => (__webpack_exec__(725396)));
module.exports = __webpack_exports__;

})();