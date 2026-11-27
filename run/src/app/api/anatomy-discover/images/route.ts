/**
 * Image-only discover endpoint (slow — ~15-50s, runs in parallel with
 * the Sketchfab route from the client side).
 *
 * POST /api/anatomy-discover/images
 *   body: { query: string, system?: string, count?: number }
 *   response: { query, images, error? }
 *
 * The frontend fires this in parallel with /sketchfab. Because this call
 * takes ~15-50s and /sketchfab takes ~1-3s, the user sees 3D models
 * immediately and images stream in when ready. The frontend renders an
 * "Images: searching…" placeholder in the image grid slot until this
 * response arrives.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';
import { searchAnatomyImages, type ImageResult } from '@/lib/anatomy/discover';

const log = createLogger('AnatomyDiscoverImages');

interface ImagesResponse {
  query: string;
  system?: string;
  images: ImageResult[];
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<ImagesResponse>> {
  let query = '';
  let system: string | undefined;
  let count = 8;

  try {
    const body = await req.json();
    query = typeof body.query === 'string' ? body.query.trim() : '';
    system = typeof body.system === 'string' ? body.system.trim() || undefined : undefined;
    if (typeof body.count === 'number' && Number.isFinite(body.count)) {
      count = Math.min(Math.max(Math.floor(body.count), 1), 12);
    }
  } catch {
    return NextResponse.json(
      { query: '', images: [], error: 'Invalid JSON body' } satisfies ImagesResponse,
      { status: 400 },
    );
  }

  if (!query) {
    return NextResponse.json(
      { query: '', images: [], error: 'query is required' } satisfies ImagesResponse,
      { status: 400 },
    );
  }

  log.info('Image discover request', { query, system, count });

  const { images, error } = await searchAnatomyImages(query, system, count);

  if (images.length === 0) {
    return NextResponse.json(
      { query, system, images, error } satisfies ImagesResponse,
      { status: 503 },
    );
  }

  return NextResponse.json(
    { query, system, images, error } satisfies ImagesResponse,
    { status: 200 },
  );
}
