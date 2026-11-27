/**
 * Shared URL-source ingestion — used by POST /api/knowledge/sources (initial
 * import) and POST /api/knowledge/sources/[id]/retry (re-running a failed
 * import, e.g. after a transient YouTube bot-check clears).
 *
 * Kept in its own module so both routes drive the exact same pipeline:
 * fetchExternalSource (yt-dlp / Drive / direct / webpage) → parseMediaFile /
 * ingestSource → chunks + embeddings.
 */

import { db } from '@/lib/db';
import { parseMediaFile } from '@/lib/agent/knowledge/ingest-media';
import { fetchExternalSource } from '@/lib/agent/knowledge/url-source';
import { ingestSource, updateSourceProgress } from '@/lib/agent/knowledge/pipeline';
import { retainAudioFile } from '@/lib/agent/knowledge/audio-pipeline';
import { retainOriginalFile } from '@/lib/agent/knowledge/file-store';
import { createLogger } from '@/lib/logger';

const log = createLogger('KnowledgeUrl');

export async function processExternalUrl(userId: string, sourceId: string, url: string): Promise<void> {
  await db.knowledgeSource.update({
    where: { id: sourceId },
    data: { status: 'processing', error: null },
  });
  await updateSourceProgress(sourceId, 'downloading', 10, 'Downloading — YouTube / Drive links take 1-2 min');

  const plan = await fetchExternalSource(url);

  // Show the resolved title (e.g. the YouTube video title) on the row.
  await db.knowledgeSource.update({
    where: { id: sourceId },
    data: { name: plan.title.slice(0, 200), ...(plan.displayKind ? { fileKind: plan.displayKind } : {}) },
  }).catch(() => {});

  if (plan.kind === 'media' && plan.buffer) {
    const isYouTube = /youtu\.?be|youtube\.com/i.test(url);
    await updateSourceProgress(
      sourceId,
      'transcribing',
      30,
      isYouTube ? 'Transcribing audio + on-screen text — 1-3 min' : 'Transcribing / analyzing the media',
    );
    const parsed = await parseMediaFile(plan.fileName || 'download.bin', plan.buffer, plan.mimeType || '');
    // Retain the originals: audio → audio-store (playback), image / video /
    // PDF → file-store (original-view preview + media attachment + citations).
    const audioMeta: Record<string, unknown> = {};
    if (parsed.fileKind === 'audio') {
      const retained = await retainAudioFile(sourceId, plan.buffer);
      if (retained.retained) {
        audioMeta.audioMime = retained.mime;
        audioMeta.audioBytes = retained.bytes;
      }
    } else if (parsed.fileKind === 'image' || parsed.fileKind === 'video' || parsed.mimeType === 'application/pdf') {
      const retained = retainOriginalFile(sourceId, plan.buffer, plan.mimeType || undefined);
      if (retained.retained) {
        audioMeta.originalMime = retained.mime;
        audioMeta.originalBytes = retained.bytes;
      }
    }
    if (plan.fileName) audioMeta.originalName = plan.fileName.slice(0, 200);
    // The stored document should carry the real title (video title, not the temp file name).
    const text = plan.title && plan.fileName && parsed.text.includes(`"${plan.fileName}"`)
      ? parsed.text.replace(`"${plan.fileName}"`, `"${plan.title}"`)
      : parsed.text;
    // Stage 3: persist the video scene index (mediaTimeSec navigation).
    if (parsed.fileKind === 'video' && parsed.scenes?.length) {
      try {
        const { persistVideoScenes } = await import('@/lib/agent/knowledge/video-scenes');
        await persistVideoScenes(sourceId, parsed.scenes);
      } catch { /* best-effort — ingestion already succeeded */ }
    }

    await ingestSource({
      userId,
      sourceId,
      type: 'file',
      name: plan.title,
      fileKind: parsed.fileKind,
      meta: { ...(plan.meta || {}), ...(parsed.meta || {}), ...audioMeta },
      parsed: { title: plan.title, mimeType: parsed.mimeType, text },
      payload: {},
      onProgress: (stage, percent, note) => void updateSourceProgress(sourceId, stage, percent, note),
    });
  } else {
    await ingestSource({
      userId,
      sourceId,
      type: 'text',
      name: plan.title,
      fileKind: plan.displayKind,
      meta: plan.meta || {},
      parsed: { title: plan.title, mimeType: 'text/html', text: plan.text || '' },
      payload: {},
      onProgress: (stage, percent, note) => void updateSourceProgress(sourceId, stage, percent, note),
    });
  }

  log.info?.(`url source ${sourceId} (${plan.meta?.platform || 'web'}) ingested: ${plan.title}`);
}

/** Mark a source failed (crash handler for both routes). */
export async function markSourceFailed(sourceId: string, error: unknown): Promise<void> {
  const message = (error instanceof Error ? error.message : String(error)).slice(0, 500);
  log.error?.(`url ingest failed for source ${sourceId}:`, message);
  await db.knowledgeSource
    .update({ where: { id: sourceId }, data: { status: 'failed', error: message } })
    .catch(() => {});
}
