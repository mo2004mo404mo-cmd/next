/**
 * GET /api/providers — the live provider/model catalog.
 *
 * Returns everything the model pickers in the app need, in ONE payload:
 *   - `server`   : operator-configured providers (env / server-providers.yml)
 *   - `byok`     : the user's own providers (UserApiKey rows), with the
 *                  user's curated modelsConfig models as the catalog — this
 *                  is what makes "the models I added" visible app-wide.
 *   - `local`    : auto-detected keyless providers (Ollama, Lemonade)
 *   - `available`: providers the user could add a key for
 *   - `userDefault` / `serverDefault`: default model strings
 *
 * Auth: optional. Unauthenticated callers get server + local sections only
 * (no BYOK — keys and user models are per-account). The ModelPicker shows
 * a "sign in to use your own keys" hint in that case.
 */

import { NextRequest, NextResponse } from 'next/server';
import { buildProviderCatalog } from '@/lib/server/catalog';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req).catch(() => null);
    const [catalog, userDefault] = await Promise.all([
      buildProviderCatalog(userId),
      userId
        ? db.user
            .findUnique({ where: { id: userId }, select: { defaultModel: true } })
            .then((u) => u?.defaultModel ?? null)
            .catch(() => null)
        : Promise.resolve(null),
    ]);

    return NextResponse.json(
      { ...catalog, userDefault },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to build provider catalog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
