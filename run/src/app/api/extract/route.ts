import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { extractFromFileServer, extractAudioPassthrough, isAudioExtension } from '@/lib/server-file-extract';
import { createLogger } from '@/lib/logger';
import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';
import { uploadStore } from '@/lib/uploads/upload-session-store';

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
 */

const log = createLogger('ApiExtract');

export const runtime = 'nodejs';
export const maxDuration = 120;

// Hard ceiling across all tiers (pro = 100 MB). The per-tier cap is enforced
// below using the visitor-strategy threshold matrix (Stage 10).
const ABSOLUTE_MAX_BYTES = 100 * 1024 * 1024;

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to extract file content');

  // Stage 10: classify the caller's access tier and apply per-tier file size cap.
  // Visitors (anonymous, guest@medq.local) get 2 MB; free = 15 MB; premium = 50 MB; pro = 100 MB.
  const tier = await resolveAccessTier(userId);
  const tierConfig = thresholdFor(tier);
  const tierMaxBytes = tierConfig.fileUploadMaxMb * 1024 * 1024;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest('Expected multipart/form-data with a "file" field');
  }

  // Stage 13 (resumable uploads): the client may reference an ALREADY-UPLOADED
  // session (uploadId) instead of re-sending bytes — the chunked resumable
  // path for large files ends here BY REFERENCE. Tier + absolute caps were
  // enforced when the session was opened (POST /api/uploads), so only a
  // defensive absolute re-check remains. The session is intentionally NOT
  // deleted here — /api/knowledge/upload may ingest the same bytes next
  // (chat attachments extract AND ingest from one upload).
  const uploadIdField = form.get('uploadId');
  let fileName: string;
  let buffer: Buffer;
  let fileSize: number;

  if (typeof uploadIdField === 'string' && uploadIdField.trim()) {
    const assembled = uploadStore.readAssembled(uploadIdField.trim(), userId);
    if (!assembled) {
      return badRequest('Upload session not found, incomplete, or not yours — upload the file again');
    }
    if (assembled.size > ABSOLUTE_MAX_BYTES) {
      return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
    }
    fileName = assembled.fileName;
    buffer = assembled.buffer;
    fileSize = assembled.size;
  } else {
    const file = form.get('file');
    if (!(file instanceof File)) return badRequest('"file" field is required');
    if (file.size === 0) return badRequest('File is empty');
    if (file.size > ABSOLUTE_MAX_BYTES) {
      return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
    }
    if (file.size > tierMaxBytes) {
      const hint = tierConfig.isAnonymous
        ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
        : '';
      return badRequest(
        `File exceeds the ${tierConfig.fileUploadMaxMb}MB cap for your ${tierConfig.label} tier${hint}`,
      );
    }
    fileName = file.name || 'upload.bin';
    buffer = Buffer.from(await file.arrayBuffer());
    fileSize = file.size;
  }

  const started = Date.now();

  try {
    // Audio rides along as an attachment (ASR happens later, where the user
    // asked for it) — same contract the old client-side path had.
    const content = isAudioExtension(fileName)
      ? extractAudioPassthrough(buffer, fileName)
      : await extractFromFileServer(buffer, fileName);

    log.info?.(`extract "${fileName}" (${fileSize}B → ${content.fileType}, ` +
      `${content.images?.length ?? 0} images, ${content.text.length} chars, ` +
      `${Date.now() - started}ms) for ${userId}`);

    return NextResponse.json(content);
  } catch (error) {
    // Extraction failures are input problems (unsupported type, empty PDF,
    // extension lie) — 422 with the reason, not a bare 500.
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message.slice(0, 300) }, { status: 422 });
  }
});
