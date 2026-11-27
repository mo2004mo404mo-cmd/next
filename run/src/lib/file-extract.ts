import {
  recallResumableUpload,
  uploadFileResumable,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
  type ResumableUploadHandle,
} from '@/lib/uploads/chunked-upload-client';

/**
 * file-extract.ts — Client-side extraction entry (THIN WRAPPER).
 *
 * Stage 1 convergence: this module no longer parses PDF/DOCX/PPTX/images/
 * audio in the browser (pdfjs worker version drift, browser OOM on large
 * files, duplicated parser logic). It delegates to POST /api/extract,
 * which runs the single server-side parser (src/lib/server-file-extract.ts)
 * and returns the exact same ExtractedContent shape.
 *
 * Kept client-side (instant, zero risk, no server round-trip):
 *   - TXT / MD / CSV / TSV (plain FileReader)
 *   - the .ppt legacy guard (actionable error before any upload)
 *
 * Every export keeps its historical signature so consumers (generate page,
 * chat attachments, question-import preview) are unchanged.
 */

/** One image extracted from a document, with attribution to its source. */
export interface ExtractedImage {
  /** base64 data URL — directly consumable by the VLM `image_url` block. */
  dataUrl: string;
  /** Source attribution for the merged-text chunk ("Slide 3", "Page 5", "Image 2 in DOCX"). */
  caption: string;
}

export interface ExtractedContent {
  text: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  pageCount?: number;
  /** Embedded / rendered images that need server-side VLM processing.
   *  Each carries its source attribution so the merged text can reference it. */
  images?: ExtractedImage[];
  /** Flat data-URL alias (same data as images) — legacy consumer shape. */
  imageUrls?: string[];
  /** Server upload-session id when the file took the resumable chunked path
   *  (Stage 13). /api/knowledge/upload accepts it to ingest the SAME bytes
   *  without a second full transfer of a large file. */
  uploadId?: string;
}

export interface ExtractionProgress {
  stage: 'reading' | 'extracting' | 'processing' | 'done';
  progress: number; // 0–100
  message: string;
  // ▬ Stage 13 resumable UX fields (optional — only populated for large
  //   files on the chunked path). Existing callers that read only
  //   .stage/.progress/.message are unaffected.
  /** Confirmed bytes on the server (including resumed bytes). */
  uploadedBytes?: number;
  /** Declared total file size. */
  totalBytes?: number;
  /** Sliding-window upload speed, bytes/second (0 = unknown). */
  bytesPerSecond?: number;
  /** Seconds remaining, or null while unknown. */
  etaSeconds?: number | null;
  /** Bytes already on the server when this upload started (resume). */
  resumedBytes?: number;
  /** Attempt number of the in-flight chunk (1 = first try; >1 = retrying). */
  attempt?: number;
  /** True when the user paused the upload. */
  paused?: boolean;
  /** True when the engine is retrying a failed chunk. */
  retrying?: boolean;
}

/** Client-side ceiling, kept in lockstep with the server's
 *  MAX_INPUT_CHARS (extract route). The server chunks the text itself
 *  (~3.5–6.5k per LLM call), so there is NO AI-context reason to cap
 *  tighter — the cap only guards the client against unbounded strings. */
const MAX_TEXT_LENGTH = 1_500_000;

/** Formats that skip the server round-trip (instant FileReader). */
const CLIENT_TEXT_EXTENSIONS = ['txt', 'md', 'csv', 'tsv'];

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '\n\n[... Content truncated at ' + maxLen + ' characters ...]';
}

/**
 * Extract text content from an uploaded file.
 *
 * TXT/MD/CSV/TSV are read locally; everything else (PDF, DOCX, PPTX,
 * images, audio) is uploaded to /api/extract and parsed server-side.
 */
export async function extractFromFile(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  /** Stage 13 UX: receives the resumable-upload handle when the file takes
   *  the chunked path (so the UI can pause/resume/cancel). Null for the
   *  small-file fast path and for client-side text reads. */
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {
  const name = file.name;
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const size = file.size;

  // ── TXT / MD / CSV / TSV — instant, local ──
  if (CLIENT_TEXT_EXTENSIONS.includes(ext)) {
    onProgress?.({ stage: 'reading', progress: 10, message: 'Reading file...' });
    const text = await readAsText(file);
    onProgress?.({ stage: 'done', progress: 100, message: 'Text extracted' });
    return {
      text: truncate(text, MAX_TEXT_LENGTH),
      fileName: name,
      fileType: ext,
      fileSize: size,
      imageUrls: [],
    };
  }

  // ── Legacy binary PPT (pre-2007 OLE format — not a ZIP, cannot be parsed
  // client- or server-side the way PPTX is). Fail with an actionable
  // message BEFORE any upload. ──
  if (ext === 'ppt') {
    throw new Error(
      'Legacy .ppt files are not supported. Open the file in PowerPoint and save it as .pptx, then upload again.',
    );
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
 */
function extractOnServer(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return extractOnServerResumable(file, onProgress, onHandle);
  }
  return new Promise<ExtractedContent>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/extract');
    xhr.responseType = 'json';

    // Upload progress fills the first 60%; server parsing covers the rest.
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable || !onProgress) return;
      const pct = Math.round((e.loaded / e.total) * 60);
      onProgress({
        stage: pct >= 60 ? 'extracting' : 'reading',
        progress: Math.max(5, pct),
        message: pct >= 60 ? 'Parsing on the server…' : `Uploading ${file.name}…`,
      });
    };
    xhr.upload.onload = () => {
      onProgress?.({ stage: 'extracting', progress: 65, message: 'Extracting content…' });
    };
    xhr.onprogress = () => {
      onProgress?.({ stage: 'processing', progress: 80, message: 'Processing extracted content…' });
    };

    xhr.onload = () => {
      const body = xhr.response as (ExtractedContent & { error?: string }) | null;
      if (xhr.status >= 200 && xhr.status < 300 && body && typeof body.text === 'string') {
        onProgress?.({ stage: 'done', progress: 100, message: 'Extraction complete' });
        resolve({
          text: truncate(body.text, MAX_TEXT_LENGTH),
          fileName: body.fileName || file.name,
          fileType: body.fileType || (file.name.split('.').pop()?.toLowerCase() || ''),
          fileSize: body.fileSize ?? file.size,
          ...(body.pageCount !== undefined ? { pageCount: body.pageCount } : {}),
          ...(body.images?.length ? { images: body.images } : {}),
          imageUrls: body.imageUrls ?? [],
        });
        return;
      }
      const message = body?.error
        || (xhr.status === 413 ? 'File too large for server-side extraction (15 MB cap).'
         : xhr.status === 401 ? 'Sign in to extract file content.'
         : `Extraction failed (HTTP ${xhr.status}).`);
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error('Network error while uploading the file for extraction.'));
    xhr.onabort = () => reject(new Error('Extraction cancelled.'));

    const form = new FormData();
    form.append('file', file);
    onProgress?.({ stage: 'reading', progress: 5, message: 'Starting upload…' });
    xhr.send(form);
  });
}

/**
 * Large-file path (Stage 13): resumable chunked upload, then /api/extract
 * BY REFERENCE (uploadId). Progress contract is unchanged for callers:
 * upload fills 0–60%, server parsing the rest.
 */
async function extractOnServerResumable(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  onProgress?.({
    stage: 'reading',
    progress: 5,
    message: resumeUploadId ? `Resuming ${file.name}…` : `Preparing ${file.name}…`,
  });

  let uploadId: string;
  try {
    // Stage 13 UX: grab the handle BEFORE awaiting so the caller can wire
    // pause/resume/cancel buttons immediately. The handle's .promise is what
    // we await — the engine keeps running independently of the UI.
    const handle = uploadFileResumable(file, {
      resumeUploadId,
      onProgress: (p) => {
        const pct = Math.max(5, Math.round(p.fraction * 60));
        onProgress?.({
          stage: 'reading',
          progress: pct,
          message: p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes
            ? `Resuming ${file.name}…`
            : `Uploading ${file.name}… ${Math.round(p.fraction * 100)}%${p.attempt > 1 ? ' (retrying)' : ''}`,
          // Richer fields for the resumable progress UI (optional consumers):
          uploadedBytes: p.uploadedBytes,
          totalBytes: p.totalBytes,
          bytesPerSecond: p.bytesPerSecond,
          etaSeconds: p.etaSeconds,
          resumedBytes: p.resumedBytes,
          attempt: p.attempt,
          retrying: p.attempt > 1,
        });
      },
      onRetrying: (info) =>
        onProgress?.({
          stage: 'reading',
          progress: 5,
          message: `Connection hiccup on chunk ${info.chunkIndex + 1} — retrying (attempt ${info.attempt})…`,
          retrying: true,
          attempt: info.attempt,
        }),
    });
    onHandle?.(handle);
    ({ uploadId } = await handle.promise);
  } catch (error) {
    if (error instanceof UploadCancelledError) throw new Error('Extraction cancelled.');
    throw error instanceof Error ? error : new Error(String(error));
  }

  onProgress?.({ stage: 'extracting', progress: 65, message: 'Extracting content…' });
  const form = new FormData();
  form.append('uploadId', uploadId);

  let res: Response;
  try {
    res = await fetch('/api/extract', { method: 'POST', body: form });
  } catch {
    throw new Error('Network error while extracting the file.');
  }
  const body = (await res.json().catch(() => null)) as (ExtractedContent & { error?: string }) | null;
  if (!res.ok || !body || typeof body.text !== 'string') {
    throw new Error(body?.error || `Extraction failed (HTTP ${res.status}).`);
  }
  onProgress?.({ stage: 'done', progress: 100, message: 'Extraction complete' });
  return {
    text: truncate(body.text, MAX_TEXT_LENGTH),
    fileName: body.fileName || file.name,
    fileType: body.fileType || (file.name.split('.').pop()?.toLowerCase() || ''),
    fileSize: body.fileSize ?? file.size,
    ...(body.pageCount !== undefined ? { pageCount: body.pageCount } : {}),
    ...(body.images?.length ? { images: body.images } : {}),
    imageUrls: body.imageUrls ?? [],
    uploadId,
  };
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Get a human-readable label for a file type
 */
export function getFileTypeLabel(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const labels: Record<string, string> = {
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
    webm: 'Media (WebM)',
  };
  return labels[ext] || `File (.${ext})`;
}

/**
 * Check if a file type is supported
 */
export function isFileTypeSupported(file: File): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return [
    'pdf', 'docx', 'doc',
    'txt', 'md', 'csv', 'tsv',
    'png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif',
    'mp3', 'wav', 'm4a', 'aac', 'ogg', 'oga', 'webm', 'flac',
  ].includes(ext);
}

/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
