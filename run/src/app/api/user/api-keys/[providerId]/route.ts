/**
 * /api/user/api-keys/[providerId]
 *
 *   PATCH   {keyId, enabled?} | {keyId, move: 'up' | 'down'}   → manage ONE endpoint
 *   DELETE  ?keyId=… (one endpoint) | no param (ALL endpoints for the provider)
 *
 * PATCH shapes:
 *   - { keyId, enabled: boolean }   → enable/disable an endpoint (soft toggle)
 *   - { keyId, move: 'up' | 'down' }→ reorder endpoints (priority swap)
 *
 * DELETE:
 *   - ?keyId=… → delete exactly that endpoint row
 *   - (none)   → delete every endpoint the user saved for this provider
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import {
  deleteUserApiKey,
  deleteUserApiKeyById,
  setEndpointEnabled,
  moveEndpoint,
} from '@/lib/server/byok';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';

async function requireUser(req: NextRequest): Promise<string | null> {
  return getAuthenticatedUserId(req);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ providerId: string }> },
) {
  const userId = await requireUser(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { providerId } = await params;
  if (!providerId || !BYOK_PROVIDER_BY_ID[providerId]) {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  }

  let body: { keyId?: string; enabled?: boolean; move?: 'up' | 'down' };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const keyId = body.keyId?.trim();
  if (!keyId) {
    return NextResponse.json({ error: 'keyId is required' }, { status: 400 });
  }

  try {
    if (typeof body.enabled === 'boolean') {
      await setEndpointEnabled(userId, keyId, body.enabled);
      return NextResponse.json({ ok: true, enabled: body.enabled });
    }
    if (body.move === 'up' || body.move === 'down') {
      await moveEndpoint(userId, keyId, body.move);
      return NextResponse.json({ ok: true, moved: body.move });
    }
    return NextResponse.json(
      { error: 'Provide `enabled` (boolean) or `move` ("up" | "down")' },
      { status: 400 },
    );
  } catch (e: any) {
    console.error('[api/user/api-keys/[providerId] PATCH]', e);
    return NextResponse.json(
      { error: e?.message || 'Failed to update endpoint' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ providerId: string }> },
) {
  const userId = await requireUser(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { providerId } = await params;
  if (!providerId || !BYOK_PROVIDER_BY_ID[providerId]) {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  }

  const keyId = new URL(req.url).searchParams.get('keyId')?.trim();

  try {
    if (keyId) {
      await deleteUserApiKeyById(userId, keyId);
      return NextResponse.json({ ok: true, deleted: 'endpoint' });
    }
    await deleteUserApiKey(userId, providerId);
    return NextResponse.json({ ok: true, deleted: 'provider' });
  } catch (e: any) {
    console.error('[api/user/api-keys/[providerId] DELETE]', e);
    return NextResponse.json(
      { error: e?.message || 'Failed to delete API key' },
      { status: 500 },
    );
  }
}
