/**
 * POST /api/knowledge/drive/import  { fileId, name, mimeType }
 *   → { sourceId, status: 'pending' }
 *
 * Imports one file from the CONNECTED user's Drive: creates a pending
 * KnowledgeSource row immediately, then downloads (binary alt=media, or
 * Google-native docs via export) and runs the standard ingest pipeline in the
 * background — same pattern as URL imports, so the client polls
 * GET /api/knowledge/sources for progress.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { ingestSource } from '@/lib/agent/knowledge/pipeline';
import { parseMediaFile } from '@/lib/agent/knowledge/ingest-media';
import { retainAudioFile } from '@/lib/agent/knowledge/audio-pipeline';
import { retainOriginalFile } from '@/lib/agent/knowledge/file-store';
import {
  isDriveConfigured,
  isImportable,
  downloadDriveFile,
} from '@/lib/agent/knowledge/google-drive';
import { createLogger } from '@/lib/logger';

export const runtime = 'nodejs';
export const maxDuration = 300;

const log = createLogger('DriveImport');

export const POST = withErrorHandler(async (req: Request) => {
  if (!isDriveConfigured()) {
    return NextResponse.json({ error: 'Google Drive is not configured on this server (missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET).' }, { status: 400 });
  }
  const userId = await resolveUserId();
  const body = await req.json().catch(() => ({})) as { fileId?: unknown; name?: unknown; mimeType?: unknown };
  const fileId = typeof body.fileId === 'string' ? body.fileId.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const mimeType = typeof body.mimeType === 'string' ? body.mimeType.trim() : '';
  if (!fileId || !name) return badRequest('fileId and name are required');
  if (!isImportable({ mimeType })) {
    return badRequest('Folders and unsupported Google items cannot be imported.');
  }

  const source = await db.knowledgeSource.create({
    data: {
      userId,
      name: name.slice(0, 200),
      type: 'url',
      status: 'pending',
      fileKind: 'url',
    },
  });

  void processDriveImport(userId, source.id, { fileId, name, mimeType }).catch((error) => {
    log.error?.(`drive import crashed for source ${source.id}:`, error);
    db.knowledgeSource
      .update({
        where: { id: source.id },
        data: { status: 'failed', error: (error instanceof Error ? error.message : String(error)).slice(0, 500) },
      })
      .catch(() => {});
  });

  return NextResponse.json({ sourceId: source.id, status: 'pending' });
});

async function processDriveImport(
  userId: string,
  sourceId: string,
  file: { fileId: string; name: string; mimeType: string },
): Promise<void> {
  await db.knowledgeSource.update({ where: { id: sourceId }, data: { status: 'processing', error: null } });

  const download = await downloadDriveFile(userId, {
    id: file.fileId,
    name: file.name,
    mimeType: file.mimeType,
  });

  const parsed = await parseMediaFile(download.fileName, download.buffer, download.mimeType);

  // Retain the originals: audio → audio-store (Transcript Studio playback),
  // image / video / PDF → file-store (original-view preview + media
  // attachment to generated questions + citation "view original").
  const audioMeta: Record<string, unknown> = {};
  if (parsed.fileKind === 'audio') {
    const retained = await retainAudioFile(sourceId, download.buffer);
    if (retained.retained) {
      audioMeta.audioMime = retained.mime;
      audioMeta.audioBytes = retained.bytes;
    }
  } else if (parsed.fileKind === 'image' || parsed.fileKind === 'video' || parsed.mimeType === 'application/pdf') {
    const retained = retainOriginalFile(sourceId, download.buffer, download.mimeType || undefined);
    if (retained.retained) {
      audioMeta.originalMime = retained.mime;
      audioMeta.originalBytes = retained.bytes;
    }
  }
  if (download.fileName) audioMeta.originalName = download.fileName.slice(0, 200);

  await ingestSource({
    userId,
    sourceId,
    type: 'file',
    name: download.fileName,
    fileKind: parsed.fileKind,
    meta: {
      platform: 'google-drive-connected',
      driveFileId: file.fileId,
      sourceUrl: `https://drive.google.com/file/d/${file.fileId}/view`,
      ...(parsed.meta || {}),
      ...audioMeta,
    },
    parsed: { title: download.fileName, mimeType: parsed.mimeType, text: parsed.text },
    payload: {},
  });
  log.info?.(`drive source ${sourceId} ingested: ${download.fileName}`);
}
