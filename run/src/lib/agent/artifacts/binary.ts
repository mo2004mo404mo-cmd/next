import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createArtifact } from './service';

/**
 * Binary artifact persistence (PDFs and other non-text outputs).
 *
 * Files are written to public/generated/ (served as static assets) and the
 * DB row stores the public URL — same strategy the illustration tool uses
 * for generated images, keeping chat payloads small and previewable.
 */
export async function saveBinaryArtifact(input: {
  userId: string;
  name: string;
  kind: 'document' | 'image' | 'chart' | 'audio' | 'video' | 'office';
  mimeType: string;
  buffer: Buffer;
  meta?: Record<string, unknown>;
}): Promise<{ id: string; name: string; downloadUrl: string; url: string; mimeType: string; kind: string; sizeBytes: number }> {
  const dir = path.join(process.cwd(), 'public', 'generated');
  fs.mkdirSync(dir, { recursive: true });
  const extension = extensionFor(input.mimeType);
  const fileName = `artifact-${randomUUID().slice(0, 12)}${extension}`;
  fs.writeFileSync(path.join(dir, fileName), input.buffer);
  const url = `/generated/${fileName}`;

  const row = await createArtifactRecord({
    userId: input.userId,
    name: input.name,
    kind: input.kind,
    mimeType: input.mimeType,
    url,
    sizeBytes: input.buffer.byteLength,
    meta: input.meta,
  });
  return {
    ...row,
    url,
    mimeType: input.mimeType,
    kind: input.kind,
    sizeBytes: input.buffer.byteLength,
  };
}

function extensionFor(mimeType: string): string {
  if (mimeType.includes('pdf')) return '.pdf';
  if (mimeType.includes('png')) return '.png';
  if (mimeType.includes('jpeg')) return '.jpg';
  if (mimeType.includes('svg')) return '.svg';
  if (mimeType.includes('wordprocessingml')) return '.docx';
  if (mimeType.includes('spreadsheetml')) return '.xlsx';
  if (mimeType.includes('presentationml')) return '.pptx';
  if (mimeType.includes('mpeg') && mimeType.startsWith('audio')) return '.mp3';
  if (mimeType.includes('wav')) return '.wav';
  if (mimeType.includes('mp4')) return '.mp4';
  if (mimeType.includes('webm')) return '.webm';
  return '.bin';
}

async function createArtifactRecord(input: {
  userId: string;
  name: string;
  kind: string;
  mimeType: string;
  url: string;
  sizeBytes: number;
  meta?: Record<string, unknown>;
}) {
  const { db } = await import('../../db');
  const sanitized = input.name.replace(/[^\p{L}\p{N}._-]/gu, '-').slice(0, 80) || 'artifact';
  const row = await db.agentArtifact.create({
    data: {
      userId: input.userId,
      name: sanitized,
      kind: input.kind,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      url: input.url,
      // JSON.parse returns `any`, satisfying Prisma's Json input type
      meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined,
    },
  });
  return { id: row.id, name: sanitized, downloadUrl: `/api/medq-agent/artifacts/${row.id}` };
}
