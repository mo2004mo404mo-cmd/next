/**
 * /api/user/default-model — user's preferred default AI model.
 *
 *   GET    → { defaultModel: string | null }
 *   POST   → body { defaultModel: string | null } → { ok: true, defaultModel }
 *
 * Stored in `User.defaultModel` (a nullable string). Format: "providerId:modelId".
 * When null, the server falls back to DEFAULT_MODEL env var → auto-detect.
 *
 * Auth required — guests can't save a default (their setting wouldn't persist
 * across devices, and would collide with other guests on the same guest user).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';
import { parseModelString } from '@/lib/ai/model-catalog';
import { createLogger } from '@/lib/logger';

const log = createLogger('api/user/default-model');

// Sanity limit on the model string length — providerId:modelId is short,
// anything huge is a sign of a bug or attack.
const MAX_LEN = 200;

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { defaultModel: true },
    });
    return NextResponse.json({ defaultModel: user?.defaultModel ?? null });
  } catch (e: any) {
    log.error('GET failed:', e);
    return NextResponse.json({ error: 'Failed to load default model' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: { defaultModel?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Allow null (clears the setting) but validate non-null strings
  let value: string | null = body.defaultModel ?? null;
  if (value !== null) {
    if (typeof value !== 'string') {
      return NextResponse.json({ error: 'defaultModel must be a string or null' }, { status: 400 });
    }
    value = value.trim();
    if (!value) {
      value = null; // treat empty string as null
    } else {
      if (value.length > MAX_LEN) {
        return NextResponse.json({ error: 'defaultModel too long' }, { status: 400 });
      }
      // Validate format
      const parsed = parseModelString(value);
      if (!parsed) {
        return NextResponse.json(
          { error: 'defaultModel must be in "providerId:modelId" format' },
          { status: 400 },
        );
      }
    }
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: { defaultModel: value },
    });
    return NextResponse.json({ ok: true, defaultModel: value });
  } catch (e: any) {
    log.error('POST failed:', e);
    return NextResponse.json({ error: 'Failed to save default model' }, { status: 500 });
  }
}
