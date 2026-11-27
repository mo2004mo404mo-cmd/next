/**
 * BYOK API routes — /api/user/api-keys
 *
 *   GET    /api/user/api-keys           → list user's saved endpoints (metadata only)
 *   POST   /api/user/api-keys           → save an endpoint (new row, or update by `id`)
 *   PATCH  /api/user/api-keys           → update modelsConfig only (no key re-entry)
 *
 * A user may save MULTIPLE endpoints per provider (multi-endpoint BYOK):
 * each POST without `id` appends a new endpoint (key + baseUrl + label).
 * POST with `id` updates that endpoint in place (empty apiKey keeps the
 * stored key). Keyless providers (Ollama, Lemonade) accept endpoints with a
 * baseUrl and no key.
 *
 * Endpoint management (enable / reorder / delete one) lives on the
 * [providerId] sub-route:
 *   PATCH  /api/user/api-keys/[providerId]   {keyId, enabled?} | {keyId, move}
 *   DELETE /api/user/api-keys/[providerId]   ?keyId=… (one) | all
 *
 * All routes require authentication via NextAuth (session). Guest users are
 * rejected — BYOK is a per-account feature, and allowing guest keys would
 * share them across every guest.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import {
  listUserApiKeys,
  saveUserApiKey,
  markUserApiKeyVerified,
  updateModelsConfig,
  KEYLESS_PROVIDER_IDS,
  type ByokModelConfig,
} from '@/lib/server/byok';
import { isServerConfiguredProvider } from '@/lib/server/provider-config';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';
import { testProviderApiKey } from '@/lib/server/byok-test';

// ── GET: list user's saved endpoints ──

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  try {
    const keys = await listUserApiKeys(userId);
    // Annotate each endpoint with whether the operator has also configured
    // this provider server-side — in that case the operator's key wins for
    // managed-key providers and the UI shows that hint.
    const annotated = keys.map((k) => ({
      ...k,
      isServerManaged: isServerConfiguredProvider('providers', k.providerId),
    }));
    return NextResponse.json({ keys: annotated });
  } catch (e) {
    console.error('[api/user/api-keys GET]', e);
    return NextResponse.json({ error: 'Failed to load API keys' }, { status: 500 });
  }
}

// ── POST: save an endpoint (create) or update one (by `id`) ──

const MAX_BODY = 16 * 1024; // 16KB — API keys are tiny, anything bigger is suspicious

export async function POST(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: {
    providerId?: string;
    apiKey?: string;
    baseUrl?: string | null;
    label?: string | null;
    modelsConfig?: ByokModelConfig[] | null;
    id?: string; // endpoint row id — present = update in place
    test?: boolean; // if true, verify before saving
  };
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const providerId = body.providerId?.trim();
  const apiKey = body.apiKey?.trim() ?? '';
  if (!providerId) {
    return NextResponse.json({ error: 'providerId is required' }, { status: 400 });
  }

  // Validate providerId against the known registry — prevents storing keys
  // for made-up providers that nothing will ever resolve.
  if (!BYOK_PROVIDER_BY_ID[providerId]) {
    return NextResponse.json(
      { error: `Unknown provider: ${providerId}` },
      { status: 400 },
    );
  }

  // Keyless providers (Ollama / Lemonade) may save an endpoint with only a
  // base URL — "my local Ollama" is a legitimate endpoint. Everything else
  // requires a key.
  const keyless = KEYLESS_PROVIDER_IDS.has(providerId);
  const hasBaseUrl = !!body.baseUrl?.trim();
  if (!apiKey && !keyless) {
    return NextResponse.json({ error: 'apiKey is required' }, { status: 400 });
  }
  if (!apiKey && keyless && !hasBaseUrl && !body.id) {
    return NextResponse.json(
      { error: 'Provide an API key or a base URL for this endpoint' },
      { status: 400 },
    );
  }

  try {
    // Optional pre-save test: fail the save if the endpoint doesn't work.
    // Useful for the UI's "Save & Test" button — atomic feedback to the user.
    // When UPDATING without a new key, test against the stored key by id.
    if (body.test) {
      if (body.id && !apiKey) {
        // Test the stored endpoint directly (row lookup + decrypt + test).
        const testResult = await testSavedEndpoint(userId, body.id, providerId);
        if (!testResult.ok) {
          return NextResponse.json(
            { error: `Key test failed: ${testResult.error}`, tested: true },
            { status: 400 },
          );
        }
      } else {
        const testResult = await testProviderApiKey(providerId, {
          apiKey,
          baseUrl: body.baseUrl ?? null,
        });
        if (!testResult.ok) {
          return NextResponse.json(
            { error: `Key test failed: ${testResult.error}`, tested: true },
            { status: 400 },
          );
        }
      }
    }

    const saved = await saveUserApiKey(userId, providerId, {
      ...(body.id ? { id: body.id } : {}),
      apiKey,
      baseUrl: body.baseUrl ?? null,
      label: body.label ?? null,
      modelsConfig: body.modelsConfig ?? null,
    });

    if (body.test && saved.id) {
      // Mark as verified — the test above passed.
      await markUserApiKeyVerified(userId, saved.id);
      saved.lastVerifiedAt = new Date().toISOString();
    }

    return NextResponse.json({
      key: {
        ...saved,
        isServerManaged: isServerConfiguredProvider('providers', providerId),
      },
    });
  } catch (e: any) {
    console.error('[api/user/api-keys POST]', e);
    return NextResponse.json(
      { error: e?.message || 'Failed to save API key' },
      { status: 500 },
    );
  }
}

/** Test a stored endpoint by row id (used by the update-without-key path). */
async function testSavedEndpoint(
  userId: string,
  keyId: string,
  providerId: string,
): Promise<{ ok: boolean; error?: string }> {
  const { db } = await import('@/lib/db');
  const { decryptEndpointKey } = await import('@/lib/server/byok');
  const row = await db.userApiKey.findFirst({ where: { id: keyId, userId } });
  if (!row) return { ok: false, error: 'Endpoint not found' };
  if (row.providerId !== providerId) return { ok: false, error: 'Endpoint/provider mismatch' };
  try {
    const apiKey = decryptEndpointKey(row.encryptedKey, row.iv, row.authTag);
    return testProviderApiKey(providerId, { apiKey, baseUrl: row.baseUrl });
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Decryption failed' };
  }
}

// ── PATCH: update modelsConfig only (no key re-entry required) ──
//
// Used by the per-model add/edit/delete UI. Body:
//   { providerId, modelsConfig: ByokModelConfig[] | null }
// Applies to ALL endpoint rows of that provider (the model catalog is
// per-provider, not per-endpoint).

export async function PATCH(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: {
    providerId?: string;
    modelsConfig?: ByokModelConfig[] | null;
  };
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const providerId = body.providerId?.trim();
  if (!providerId) {
    return NextResponse.json({ error: 'providerId is required' }, { status: 400 });
  }
  if (!BYOK_PROVIDER_BY_ID[providerId]) {
    return NextResponse.json(
      { error: `Unknown provider: ${providerId}` },
      { status: 400 },
    );
  }

  try {
    await updateModelsConfig(userId, providerId, body.modelsConfig ?? null);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[api/user/api-keys PATCH]', e);
    return NextResponse.json(
      { error: e?.message || 'Failed to update models config' },
      { status: 500 },
    );
  }
}
