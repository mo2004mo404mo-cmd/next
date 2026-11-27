"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[80037],{

/***/ 13929:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hx: () => (/* binding */ getFileTypeLabel),
/* harmony export */   VX: () => (/* binding */ isFileTypeSupported),
/* harmony export */   Y7: () => (/* binding */ extractFromFile),
/* harmony export */   v7: () => (/* binding */ formatFileSize)
/* harmony export */ });
/* harmony import */ var _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51778);

/** Client-side ceiling, kept in lockstep with the server's
 *  MAX_INPUT_CHARS (extract route). The server chunks the text itself
 *  (~3.5–6.5k per LLM call), so there is NO AI-context reason to cap
 *  tighter — the cap only guards the client against unbounded strings. */ const MAX_TEXT_LENGTH = 1500000;
/** Formats that skip the server round-trip (instant FileReader). */ const CLIENT_TEXT_EXTENSIONS = [
    'txt',
    'md',
    'csv',
    'tsv'
];
function truncate(text, maxLen) {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + '\n\n[... Content truncated at ' + maxLen + ' characters ...]';
}
/**
 * Extract text content from an uploaded file.
 *
 * TXT/MD/CSV/TSV are read locally; everything else (PDF, DOCX, PPTX,
 * images, audio) is uploaded to /api/extract and parsed server-side.
 */ async function extractFromFile(file, onProgress, /** Stage 13 UX: receives the resumable-upload handle when the file takes
   *  the chunked path (so the UI can pause/resume/cancel). Null for the
   *  small-file fast path and for client-side text reads. */ onHandle) {
    const name = file.name;
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const size = file.size;
    // ── TXT / MD / CSV / TSV — instant, local ──
    if (CLIENT_TEXT_EXTENSIONS.includes(ext)) {
        onProgress?.({
            stage: 'reading',
            progress: 10,
            message: 'Reading file...'
        });
        const text = await readAsText(file);
        onProgress?.({
            stage: 'done',
            progress: 100,
            message: 'Text extracted'
        });
        return {
            text: truncate(text, MAX_TEXT_LENGTH),
            fileName: name,
            fileType: ext,
            fileSize: size,
            imageUrls: []
        };
    }
    // ── Legacy binary PPT (pre-2007 OLE format — not a ZIP, cannot be parsed
    // client- or server-side the way PPTX is). Fail with an actionable
    // message BEFORE any upload. ──
    if (ext === 'ppt') {
        throw new Error('Legacy .ppt files are not supported. Open the file in PowerPoint and save it as .pptx, then upload again.');
    }
    // ── Everything else — server-side extraction ──
    return extractOnServer(file, onProgress, onHandle);
}
/** Upload the raw file to /api/extract and return its parsed content.
 *
 * Stage 13: files above RESUMABLE_THRESHOLD_BYTES take the resumable chunked
 * path instead of one fragile multipart POST — a mid-transfer stall now
 * costs one 8MB chunk (auto-retried), never the whole upload, and the user
 * can pause / resume / refresh mid-flight. Small files keep the fast path.
 */ function extractOnServer(file, onProgress, onHandle) {
    if (file.size > _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_0__/* .RESUMABLE_THRESHOLD_BYTES */ .zo) {
        return extractOnServerResumable(file, onProgress, onHandle);
    }
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/extract');
        xhr.responseType = 'json';
        // Upload progress fills the first 60%; server parsing covers the rest.
        xhr.upload.onprogress = (e)=>{
            if (!e.lengthComputable || !onProgress) return;
            const pct = Math.round(e.loaded / e.total * 60);
            onProgress({
                stage: pct >= 60 ? 'extracting' : 'reading',
                progress: Math.max(5, pct),
                message: pct >= 60 ? 'Parsing on the server…' : `Uploading ${file.name}…`
            });
        };
        xhr.upload.onload = ()=>{
            onProgress?.({
                stage: 'extracting',
                progress: 65,
                message: 'Extracting content…'
            });
        };
        xhr.onprogress = ()=>{
            onProgress?.({
                stage: 'processing',
                progress: 80,
                message: 'Processing extracted content…'
            });
        };
        xhr.onload = ()=>{
            const body = xhr.response;
            if (xhr.status >= 200 && xhr.status < 300 && body && typeof body.text === 'string') {
                onProgress?.({
                    stage: 'done',
                    progress: 100,
                    message: 'Extraction complete'
                });
                resolve({
                    text: truncate(body.text, MAX_TEXT_LENGTH),
                    fileName: body.fileName || file.name,
                    fileType: body.fileType || file.name.split('.').pop()?.toLowerCase() || '',
                    fileSize: body.fileSize ?? file.size,
                    ...body.pageCount !== undefined ? {
                        pageCount: body.pageCount
                    } : {},
                    ...body.images?.length ? {
                        images: body.images
                    } : {},
                    imageUrls: body.imageUrls ?? []
                });
                return;
            }
            const message = body?.error || (xhr.status === 413 ? 'File too large for server-side extraction (15 MB cap).' : xhr.status === 401 ? 'Sign in to extract file content.' : `Extraction failed (HTTP ${xhr.status}).`);
            reject(new Error(message));
        };
        xhr.onerror = ()=>reject(new Error('Network error while uploading the file for extraction.'));
        xhr.onabort = ()=>reject(new Error('Extraction cancelled.'));
        const form = new FormData();
        form.append('file', file);
        onProgress?.({
            stage: 'reading',
            progress: 5,
            message: 'Starting upload…'
        });
        xhr.send(form);
    });
}
/**
 * Large-file path (Stage 13): resumable chunked upload, then /api/extract
 * BY REFERENCE (uploadId). Progress contract is unchanged for callers:
 * upload fills 0–60%, server parsing the rest.
 */ async function extractOnServerResumable(file, onProgress, onHandle) {
    const resumeUploadId = (0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_0__/* .recallResumableUpload */ .xy)(file) ?? undefined;
    onProgress?.({
        stage: 'reading',
        progress: 5,
        message: resumeUploadId ? `Resuming ${file.name}…` : `Preparing ${file.name}…`
    });
    let uploadId;
    try {
        // Stage 13 UX: grab the handle BEFORE awaiting so the caller can wire
        // pause/resume/cancel buttons immediately. The handle's .promise is what
        // we await — the engine keeps running independently of the UI.
        const handle = (0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_0__/* .uploadFileResumable */ .e1)(file, {
            resumeUploadId,
            onProgress: (p)=>{
                const pct = Math.max(5, Math.round(p.fraction * 60));
                onProgress?.({
                    stage: 'reading',
                    progress: pct,
                    message: p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes ? `Resuming ${file.name}…` : `Uploading ${file.name}… ${Math.round(p.fraction * 100)}%${p.attempt > 1 ? ' (retrying)' : ''}`,
                    // Richer fields for the resumable progress UI (optional consumers):
                    uploadedBytes: p.uploadedBytes,
                    totalBytes: p.totalBytes,
                    bytesPerSecond: p.bytesPerSecond,
                    etaSeconds: p.etaSeconds,
                    resumedBytes: p.resumedBytes,
                    attempt: p.attempt,
                    retrying: p.attempt > 1
                });
            },
            onRetrying: (info)=>onProgress?.({
                    stage: 'reading',
                    progress: 5,
                    message: `Connection hiccup on chunk ${info.chunkIndex + 1} — retrying (attempt ${info.attempt})…`,
                    retrying: true,
                    attempt: info.attempt
                })
        });
        onHandle?.(handle);
        ({ uploadId } = await handle.promise);
    } catch (error) {
        if (error instanceof _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_0__/* .UploadCancelledError */ .xT) throw new Error('Extraction cancelled.');
        throw error instanceof Error ? error : new Error(String(error));
    }
    onProgress?.({
        stage: 'extracting',
        progress: 65,
        message: 'Extracting content…'
    });
    const form = new FormData();
    form.append('uploadId', uploadId);
    let res;
    try {
        res = await fetch('/api/extract', {
            method: 'POST',
            body: form
        });
    } catch  {
        throw new Error('Network error while extracting the file.');
    }
    const body = await res.json().catch(()=>null);
    if (!res.ok || !body || typeof body.text !== 'string') {
        throw new Error(body?.error || `Extraction failed (HTTP ${res.status}).`);
    }
    onProgress?.({
        stage: 'done',
        progress: 100,
        message: 'Extraction complete'
    });
    return {
        text: truncate(body.text, MAX_TEXT_LENGTH),
        fileName: body.fileName || file.name,
        fileType: body.fileType || file.name.split('.').pop()?.toLowerCase() || '',
        fileSize: body.fileSize ?? file.size,
        ...body.pageCount !== undefined ? {
            pageCount: body.pageCount
        } : {},
        ...body.images?.length ? {
            images: body.images
        } : {},
        imageUrls: body.imageUrls ?? [],
        uploadId
    };
}
function readAsText(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result ?? ''));
        reader.onerror = ()=>reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
/**
 * Get a human-readable label for a file type
 */ function getFileTypeLabel(file) {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const labels = {
        pdf: 'PDF Document',
        docx: 'Word Document',
        doc: 'Word Document',
        txt: 'Text File',
        md: 'Markdown File',
        csv: 'CSV Spreadsheet',
        tsv: 'TSV Spreadsheet',
        png: 'Image (PNG)',
        jpg: 'Image (JPEG)',
        jpeg: 'Image (JPEG)',
        webp: 'Image (WebP)',
        bmp: 'Image (BMP)',
        gif: 'Image (GIF)',
        mp3: 'Audio (MP3)',
        wav: 'Audio (WAV)',
        m4a: 'Audio (M4A)',
        aac: 'Audio (AAC)',
        ogg: 'Audio (OGG)',
        flac: 'Audio (FLAC)',
        webm: 'Media (WebM)'
    };
    return labels[ext] || `File (.${ext})`;
}
/**
 * Check if a file type is supported
 */ function isFileTypeSupported(file) {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    return [
        'pdf',
        'docx',
        'doc',
        'txt',
        'md',
        'csv',
        'tsv',
        'png',
        'jpg',
        'jpeg',
        'webp',
        'bmp',
        'gif',
        'mp3',
        'wav',
        'm4a',
        'aac',
        'ogg',
        'oga',
        'webm',
        'flac'
    ].includes(ext);
}
/**
 * Format file size to human-readable string
 */ function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


/***/ }),

/***/ 15517:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mq: () => (/* binding */ stageGeneratePrefill),
/* harmony export */   TU: () => (/* binding */ clearGeneratePrefill),
/* harmony export */   km: () => (/* binding */ drainGeneratePrefill)
/* harmony export */ });
/* unused harmony export GENERATE_PREFILL_KEY */
/**
 * Cross-surface prefill for the Generate Questions tab.
 *
 * Three surfaces ask the app to "generate questions about X":
 *   • the AI agent's generate_questions UI action (MedQAppShell),
 *   • the pricing page's upsell CTA,
 *   • the agent's UIActionEngine.
 *
 * All of them navigate to /generate and then dispatch a
 * 'medq-generate-questions' CustomEvent ~500 ms later. When the generate tab
 * lived inside the SPA shell this worked: PersistentTab mounted on pushState
 * within ~100 ms, so the listener was ready before the event fired. Since the
 * tab became a real App-Router route, the page can take longer than 500 ms
 * to mount (a cold dev compile of /generate measured 35–67 s on this box), so
 * the event fires into the void and the topic is lost.
 *
 * Fix: every dispatcher STASHES the payload in sessionStorage right before
 * dispatching; the generate page drains the stash on mount AND listens for
 * the live event. Whichever arrives first wins.
 */ const GENERATE_PREFILL_KEY = 'medq:generate-prefill';
/** Persist the prefill payload (survives however long the page takes to mount). */ function stageGeneratePrefill(detail) {
    try {
        sessionStorage.setItem(GENERATE_PREFILL_KEY, JSON.stringify(detail));
    } catch  {}
}
/** Read-and-remove the stashed payload (call once on mount). */ function drainGeneratePrefill() {
    try {
        const raw = sessionStorage.getItem(GENERATE_PREFILL_KEY);
        if (!raw) return null;
        sessionStorage.removeItem(GENERATE_PREFILL_KEY);
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
/** Drop the stash (live event already consumed it). */ function clearGeneratePrefill() {
    try {
        sessionStorage.removeItem(GENERATE_PREFILL_KEY);
    } catch  {}
}


/***/ }),

/***/ 51778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DB: () => (/* binding */ formatSpeed),
/* harmony export */   e1: () => (/* binding */ uploadFileResumable),
/* harmony export */   gc: () => (/* binding */ formatEta),
/* harmony export */   xT: () => (/* binding */ UploadCancelledError),
/* harmony export */   xy: () => (/* binding */ recallResumableUpload),
/* harmony export */   zo: () => (/* binding */ RESUMABLE_THRESHOLD_BYTES)
/* harmony export */ });
/* unused harmony exports DEFAULT_CHUNK_TIMEOUT_MS, planChunks, missingChunks, fileSignature, speedFromSamples, etaFrom, rememberResumableUpload, forgetResumableUpload */
/**
 * chunked-upload-client.ts — browser-side resumable uploads (Stage 13).
 *
 * Files above RESUMABLE_THRESHOLD_BYTES no longer travel as one fragile
 * multipart POST. They are split into idempotent chunks (PUT
 * /api/uploads/:id/chunks/:n) with:
 *
 *   - per-chunk retry with exponential backoff (a stall costs one chunk)
 *   - pause / resume / cancel mid-flight (pause aborts the in-flight chunk;
 *     confirmed chunks stay on the server)
 *   - resume-after-refresh: localStorage remembers the session id per file
 *     signature; on re-pick the client asks the server which chunks it
 *     already has and skips them
 *   - live progress: confirmed bytes, speed (sliding window), ETA
 *
 * The XHR-per-chunk (not fetch) is deliberate: upload.onprogress gives
 * sub-chunk progress so the bar stays smooth, and abort() gives pause/cancel
 * immediate effect.
 */ /** Files at or below this size keep the single-request fast path (the plain
 *  multipart XHR) — a session costs 2 extra round-trips that only pay off
 *  when a failure would actually hurt. */ const RESUMABLE_THRESHOLD_BYTES = 8 * 1024 * 1024;
/** Per-chunk wall clock budget. 8 MB at even a poor 70 KB/s ≈ 120 s. */ const DEFAULT_CHUNK_TIMEOUT_MS = 120000;
const MAX_ATTEMPTS_PER_CHUNK = 4;
const SPEED_WINDOW_MS = 12000;
const LS_PREFIX = 'medq:upload-session:';
const LS_MAX_ENTRIES = 10;
const LS_MAX_AGE_MS = 24 * 60 * 60 * 1000;
/** Slice plan for [size] bytes in [chunkSize] chunks. */ function planChunks(size, chunkSize) {
    const slices = [];
    if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(chunkSize) || chunkSize <= 0) {
        return slices;
    }
    const total = Math.max(1, Math.ceil(size / chunkSize));
    for(let i = 0; i < total; i++){
        const start = i * chunkSize;
        const end = Math.min(size, start + chunkSize);
        slices.push({
            index: i,
            start,
            end,
            size: end - start
        });
    }
    return slices;
}
/** Which chunk indexes in [0, totalChunks) are still missing. */ function missingChunks(received, totalChunks) {
    const set = received instanceof Set ? received : new Set(received);
    const missing = [];
    for(let i = 0; i < totalChunks; i++){
        if (!set.has(i)) missing.push(i);
    }
    return missing;
}
/** Stable identity of a File for localStorage resume bookkeeping. */ function fileSignature(file) {
    return `${file.name}:${file.size}:${file.lastModified ?? 0}`;
}
/** Bytes/second over a sliding window of cumulative samples. 0 = unknown. */ function speedFromSamples(samples, windowMs = SPEED_WINDOW_MS) {
    if (samples.length < 2) return 0;
    const newest = samples[samples.length - 1];
    const cutoff = newest.t - windowMs;
    let oldest = samples[0];
    for (const s of samples){
        if (s.t >= cutoff) {
            oldest = s;
            break;
        }
    }
    const dt = newest.t - oldest.t;
    const dBytes = newest.bytes - oldest.bytes;
    if (dt <= 0 || dBytes <= 0) return 0;
    return dBytes / (dt / 1000);
}
/** Seconds remaining, or null while the speed is unknown. */ function etaFrom(bytesRemaining, bytesPerSecond) {
    if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0 || bytesRemaining <= 0) return null;
    return bytesRemaining / bytesPerSecond;
}
function formatSpeed(bytesPerSecond) {
    if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return '—';
    if (bytesPerSecond < 1024) return `${Math.round(bytesPerSecond)} B/s`;
    if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(0)} KB/s`;
    return `${(bytesPerSecond / 1024 / 1024).toFixed(1)} MB/s`;
}
function formatEta(seconds) {
    if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return '';
    const s = Math.ceil(seconds);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    if (m < 60) return `${m}m ${String(r).padStart(2, '0')}s`;
    const h = Math.floor(m / 60);
    return `${h}h ${String(m % 60).padStart(2, '0')}m`;
}
// ── errors ──────────────────────────────────────────────────────────────────
class UploadCancelledError extends Error {
    constructor(){
        super('Upload cancelled');
        this.name = 'UploadCancelledError';
    }
}
/** Server rejected the chunk with a 4xx — retrying will not help. */ class ChunkHttpError extends Error {
    constructor(status, message){
        super(message);
        this.name = 'ChunkHttpError';
        this.status = status;
    }
}
function isFatalChunkError(err) {
    return err instanceof ChunkHttpError && [
        400,
        404,
        409,
        413
    ].includes(err.status);
}
// ── localStorage resume bookkeeping ─────────────────────────────────────────
function lsKey(sig) {
    return LS_PREFIX + sig;
}
function rememberResumableUpload(file, uploadId) {
    if (false) {}
    try {
        window.localStorage.setItem(lsKey(fileSignature(file)), JSON.stringify({
            uploadId,
            at: Date.now()
        }));
        pruneLocalStorage();
    } catch  {
    /* private mode / quota — resume-after-refresh is a bonus, not a promise */ }
}
function recallResumableUpload(file) {
    if (false) {}
    try {
        const key = lsKey(fileSignature(file));
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.uploadId !== 'string') return null;
        if (Date.now() - (parsed.at ?? 0) > LS_MAX_AGE_MS) {
            window.localStorage.removeItem(key);
            return null;
        }
        return parsed.uploadId;
    } catch  {
        return null;
    }
}
function forgetResumableUpload(file) {
    if (false) {}
    try {
        window.localStorage.removeItem(lsKey(fileSignature(file)));
    } catch  {
    /* best-effort */ }
}
/** Keep the newest N entries — localStorage is not a session archive. */ function pruneLocalStorage() {
    try {
        const entries = [];
        for(let i = 0; i < window.localStorage.length; i++){
            const key = window.localStorage.key(i);
            if (!key || !key.startsWith(LS_PREFIX)) continue;
            try {
                const parsed = JSON.parse(window.localStorage.getItem(key) || '{}');
                entries.push({
                    key,
                    at: parsed.at ?? 0
                });
            } catch  {
                entries.push({
                    key,
                    at: 0
                });
            }
        }
        if (entries.length <= LS_MAX_ENTRIES) return;
        entries.sort((a, b)=>a.at - b.at);
        for (const e of entries.slice(0, entries.length - LS_MAX_ENTRIES)){
            window.localStorage.removeItem(e.key);
        }
    } catch  {
    /* best-effort */ }
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function waitWhilePaused(state) {
    while(state.paused && !state.cancelled){
        await sleep(150);
    }
    if (state.cancelled) throw new UploadCancelledError();
}
/** One idempotent chunk PUT via XHR (upload progress + abort + timeout). */ function putChunk(args) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        args.register(xhr);
        xhr.open('PUT', `/api/uploads/${encodeURIComponent(args.uploadId)}/chunks/${args.slice.index}`);
        xhr.timeout = args.timeoutMs;
        xhr.responseType = 'text';
        xhr.upload.onprogress = (e)=>{
            if (e.lengthComputable) args.onUploadProgress?.(e.loaded);
        };
        xhr.onload = ()=>{
            args.register(null);
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(args.slice.size);
                return;
            }
            let message = `HTTP ${xhr.status}`;
            try {
                const parsed = JSON.parse(xhr.responseText);
                if (parsed?.error) message = parsed.error;
            } catch  {
            /* non-JSON body */ }
            reject(new ChunkHttpError(xhr.status, message));
        };
        xhr.onerror = ()=>{
            args.register(null);
            reject(new Error('Network error during chunk upload'));
        };
        xhr.ontimeout = ()=>{
            args.register(null);
            reject(new Error('Chunk upload timed out'));
        };
        xhr.onabort = ()=>{
            args.register(null);
            reject(new Error('Chunk upload aborted'));
        };
        try {
            xhr.send(args.blob);
        } catch (err) {
            args.register(null);
            reject(err instanceof Error ? err : new Error(String(err)));
        }
    });
}
/**
 * Upload `file` in resumable chunks. Returns a handle immediately — the
 * promise settles when the session is assembled server-side.
 */ function uploadFileResumable(file, opts = {}) {
    const state = {
        paused: false,
        cancelled: false
    };
    let inFlight = null;
    const register = (xhr)=>{
        inFlight = xhr;
    };
    const promise = (async ()=>{
        if (!file || typeof file.size !== 'number' || file.size <= 0) {
            throw new Error('Cannot upload an empty file');
        }
        const maxAttempts = opts.maxAttemptsPerChunk ?? MAX_ATTEMPTS_PER_CHUNK;
        const timeoutMs = opts.chunkTimeoutMs ?? DEFAULT_CHUNK_TIMEOUT_MS;
        // ── open a session, or adopt a previous one for this exact file ──
        let uploadId = '';
        let chunkSize = 0;
        let totalChunks = 0;
        let received = new Set();
        let resumedBytes = 0;
        if (opts.resumeUploadId) {
            try {
                const res = await fetch(`/api/uploads/${encodeURIComponent(opts.resumeUploadId)}`, {
                    cache: 'no-store'
                });
                if (res.ok) {
                    const s = await res.json();
                    if (s?.uploadId && s.size === file.size && s.chunkSize && s.totalChunks) {
                        uploadId = s.uploadId;
                        chunkSize = s.chunkSize;
                        totalChunks = s.totalChunks;
                        received = new Set(s.receivedChunks ?? []);
                        resumedBytes = s.receivedBytes ?? 0;
                    }
                }
            } catch  {
            /* offline / server restart — fall through to a fresh session */ }
        }
        if (!uploadId) {
            const res = await fetch('/api/uploads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fileName: file.name,
                    size: file.size,
                    mimeType: file.type || ''
                })
            });
            const body = await res.json().catch(()=>null);
            if (!res.ok || !body?.uploadId || !body.chunkSize || !body.totalChunks) {
                throw new Error(body?.error || `Could not start the upload (HTTP ${res.status})`);
            }
            uploadId = body.uploadId;
            chunkSize = body.chunkSize;
            totalChunks = body.totalChunks;
        }
        // Remember the session so a refresh / re-pick can resume. Removed on
        // success; a cancelled upload KEEPS it — that IS the resume case.
        rememberResumableUpload(file, uploadId);
        if (resumedBytes > 0) opts.onResumed?.(resumedBytes);
        // ── push the missing chunks ──
        const slices = planChunks(file.size, chunkSize);
        const pending = slices.filter((s)=>!received.has(s.index));
        let confirmed = resumedBytes;
        const samples = [
            {
                t: Date.now(),
                bytes: confirmed
            }
        ];
        const emit = (inFlightLoaded, attempt)=>{
            samples.push({
                t: Date.now(),
                bytes: confirmed
            });
            const speed = speedFromSamples(samples);
            const uploaded = confirmed + inFlightLoaded;
            opts.onProgress?.({
                uploadedBytes: uploaded,
                totalBytes: file.size,
                fraction: file.size > 0 ? Math.min(1, uploaded / file.size) : 0,
                bytesPerSecond: speed,
                etaSeconds: etaFrom(file.size - uploaded, speed),
                resumedBytes,
                attempt
            });
        };
        emit(0, 1);
        for (const slice of pending){
            await waitWhilePaused(state);
            if (state.cancelled) throw new UploadCancelledError();
            let attempt = 0;
            for(;;){
                attempt += 1;
                if (state.cancelled) throw new UploadCancelledError();
                try {
                    await putChunk({
                        uploadId,
                        slice,
                        blob: file.slice(slice.start, slice.end),
                        timeoutMs,
                        onUploadProgress: (loaded)=>emit(loaded, attempt),
                        register
                    });
                    confirmed += slice.size;
                    emit(0, attempt);
                    break;
                } catch (err) {
                    if (state.cancelled) throw new UploadCancelledError();
                    if (state.paused) {
                        // Aborted BY the pause, not by a failure — don't burn an attempt.
                        attempt -= 1;
                        await waitWhilePaused(state);
                        continue;
                    }
                    const message = err instanceof Error ? err.message : String(err);
                    if (isFatalChunkError(err)) throw new Error(message);
                    if (attempt >= maxAttempts) {
                        throw new Error(`Upload failed after ${maxAttempts} attempts on chunk ${slice.index + 1}/${totalChunks}: ${message}`);
                    }
                    opts.onRetrying?.({
                        chunkIndex: slice.index,
                        attempt,
                        error: message
                    });
                    const backoff = Math.min(500 * 2 ** (attempt - 1) + Math.random() * 250, 8000);
                    await sleep(backoff);
                    await waitWhilePaused(state);
                }
            }
        }
        // ── assemble server-side ──
        if (state.cancelled) throw new UploadCancelledError();
        const res = await fetch(`/api/uploads/${encodeURIComponent(uploadId)}/complete`, {
            method: 'POST'
        });
        const body = await res.json().catch(()=>null);
        if (!res.ok) {
            throw new Error(body?.error || `Could not finalize the upload (HTTP ${res.status})`);
        }
        forgetResumableUpload(file);
        return {
            uploadId,
            fileName: body.fileName || file.name,
            mimeType: body.mimeType || file.type || '',
            size: body.size ?? file.size
        };
    })();
    return {
        pause () {
            state.paused = true;
            try {
                inFlight?.abort();
            } catch  {
            /* already gone */ }
        },
        resume () {
            state.paused = false;
        },
        cancel () {
            state.cancelled = true;
            try {
                inFlight?.abort();
            } catch  {
            /* already gone */ }
        },
        promise
    };
}


/***/ })

}]);