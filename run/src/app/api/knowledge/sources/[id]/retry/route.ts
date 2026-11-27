/**
 * POST /api/knowledge/sources/[id]/retry — re-run a failed URL import.
 *
 * YouTube (and other fetchers) fail transiently — most commonly YouTube's
 * datacenter-IP bot check, which lifts after a cooldown. Rather than making
 * the user re-paste the link, this resets the existing source row to pending
 * and re-runs the same processExternalUrl pipeline used by the initial import.
 *
 * Eligibility: the source must belong to the caller, be type=url, and be in
 * a non-busy state (failed). The original URL is read from metaJson.sourceUrl,
 * falling back to the row name for rows created before that field existed
 * (on early failure the name is still the URL).
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { processExternalUrl, markSourceFailed } from '@/lib/agent/knowledge/process-url';

export const runtime = 'nodejs';
export const maxDuration = 300;

export const POST = withErrorHandler(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const userId = await resolveUserId();

  const source = await db.knowledgeSource.findUnique({ where: { id } });
  if (!source || source.userId !== userId) return badRequest('Source not found');
  if (source.type !== 'url') return badRequest('Only imported links can be retried (file uploads are not retained server-side)');
  if (source.status === 'pending' || source.status === 'processing') {
    return badRequest('This source is already indexing — wait for it to finish');
  }

  // Resolve the original URL: prefer the persisted one; older rows may only
  // have it in the display name (name is replaced by the title only after a
  // successful fetch, so a failed row still carries the URL).
  let sourceUrl: string | null = null;
  try {
    const meta = source.metaJson ? (JSON.parse(source.metaJson) as { sourceUrl?: unknown }) : {};
    if (typeof meta.sourceUrl === 'string' && /^https?:\/\//i.test(meta.sourceUrl)) sourceUrl = meta.sourceUrl;
  } catch { /* malformed metaJson — fall through to name */ }
  if (!sourceUrl && /^https?:\/\//i.test(source.name)) sourceUrl = source.name;
  if (!sourceUrl) return badRequest('Could not recover the original link for this source — add it again from the link box');

  // A previous attempt may have died mid-ingest (some chunks written) —
  // clear them so the re-ingest doesn't leave duplicate passages.
  await db.knowledgeChunk.deleteMany({ where: { sourceId: id } });
  await db.knowledgeDocument.deleteMany({ where: { sourceId: id } });

  // Persist the URL (upgrades rows that only had it in the name).
  await db.knowledgeSource.update({
    where: { id },
    data: {
      status: 'pending',
      error: null,
      metaJson: JSON.stringify({ ...safeParse(source.metaJson), sourceUrl }),
    },
  });

  void processExternalUrl(userId, id, sourceUrl).catch((error) => {
    void markSourceFailed(id, error);
  });

  return NextResponse.json({ sourceId: id, status: 'pending' });
});

function safeParse(raw: string | null): Record<string, unknown> {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
