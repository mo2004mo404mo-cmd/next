/**
 * /api/freellmapi-bridge — the MedQ ⇄ FreeLLM API auth bridge.
 *
 * This is the piece that LINKS the AI Router tab with MedQ: a signed-in MedQ
 * user gets a FreeLLMAPI dashboard session token minted for them, server
 * side, so the native tab never shows a second login. The sidecar's
 * dashboard is single-operator by design (freellmapi upstream), so the
 * bridge speaks for one MedQ-owned service account whose credentials live
 * in freellmapi/server/data/medq-bridge.json — never in the client.
 *
 * #MEDQ-embedded: the AI Router now runs INSIDE the Next.js process (see
 * src/lib/freellmapi-embedded.ts); the upstream below resolves to its
 * ephemeral in-process port automatically.
 *
 * Flow (POST, requires a MedQ session):
 *   1. probe the router (livez)                       → 502-style error if down
 *   2. GET  /api/auth/status                        → needsSetup? authenticated?
 *   3. needsSetup → POST /api/auth/setup            → claim with bridge creds
 *      (loopback origin ⇒ no setup code required — see the sidecar runbook)
 *   4. POST /api/auth/login with bridge creds       → { token }
 *   5. hand the token to the caller (Bearer for /freellmapi/api/*)
 *
 * GET returns a status probe (router up? bridge credentials present?) for
 * the tab's header health dot — no MedQ auth needed.
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { freellmapiUpstream } from '@/lib/freellmapi-embedded';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BRIDGE_FILE = path.join(process.cwd(), 'freellmapi', 'server', 'data', 'medq-bridge.json');

interface BridgeCreds {
  email: string;
  password: string;
}

function generatePassword(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

async function readBridgeCreds(): Promise<BridgeCreds | null> {
  try {
    const raw = await readFile(BRIDGE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as BridgeCreds;
    if (parsed.email && parsed.password) return parsed;
    return null;
  } catch {
    return null;
  }
}

async function writeBridgeCreds(creds: BridgeCreds): Promise<void> {
  await mkdir(path.dirname(BRIDGE_FILE), { recursive: true });
  await writeFile(
    BRIDGE_FILE,
    JSON.stringify({ ...creds, note: 'MedQ-to-freellmapi auth bridge credentials (auto-managed by /api/freellmapi-bridge).' }, null, 2),
    'utf8',
  );
}

async function sidecar(pathname: string, init?: RequestInit): Promise<Response> {
  return fetch(new URL(pathname, freellmapiUpstream()), {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });
}

/** GET — light probe for the tab header: is the sidecar alive + bridgeable? */
export async function GET() {
  let up = false;
  let version: string | null = null;
  try {
    const res = await sidecar('/livez');
    up = res.ok;
    if (res.ok) {
      const body = (await res.json().catch(() => null)) as { version?: string } | null;
      version = body?.version ?? null;
    }
  } catch {
    up = false;
  }
  const creds = await readBridgeCreds();
  return NextResponse.json(
    { up, version, bridged: up && !!creds, needsCreds: up && !creds },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

/** POST — mint a sidecar dashboard session for the signed-in MedQ user. */
export async function POST(req: NextRequest) {
  const userId = await getAuthenticatedUserId(req).catch(() => null);
  if (!userId) {
    return NextResponse.json(
      { ok: false, code: 'medq_auth_required', error: 'Sign in to MedQ to use the AI Router.' },
      { status: 401 },
    );
  }

  // 1. AI Router reachable? (It is embedded in this app and boots with it.)
  let livez: Response;
  try {
    livez = await sidecar('/livez');
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: 'sidecar_down',
        error: 'The embedded AI Router is not responding. It starts together with the MedQ server — check the startup logs for [freellmapi] lines, then retry.',
      },
      { status: 502 },
    );
  }
  if (!livez.ok) {
    return NextResponse.json(
      { ok: false, code: 'sidecar_down', error: `AI Router unhealthy (HTTP ${livez.status}).` },
      { status: 502 },
    );
  }

  // 2. What does its auth state look like?
  const statusRes = await sidecar('/api/auth/status');
  if (!statusRes.ok) {
    return NextResponse.json(
      { ok: false, code: 'sidecar_error', error: `AI Router auth endpoint failed (HTTP ${statusRes.status}).` },
      { status: 502 },
    );
  }
  const status = (await statusRes.json()) as { needsSetup: boolean };

  // 3. First run ever → claim the dashboard under a MedQ service account.
  let creds = await readBridgeCreds();
  if (status.needsSetup) {
    creds = creds ?? { email: 'medq-router@medq.local', password: generatePassword() };
    const setupRes = await sidecar('/api/auth/setup', {
      method: 'POST',
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    // 409 setup_complete is fine — someone claimed it out-of-band with the
    // same or different credentials; the login attempt below decides.
    if (!setupRes.ok && setupRes.status !== 409) {
      const body = (await setupRes.json().catch(() => null)) as { error?: { message?: string } } | null;
      return NextResponse.json(
        { ok: false, code: 'setup_failed', error: body?.error?.message ?? 'Could not initialise the AI Router account.' },
        { status: 502 },
      );
    }
    await writeBridgeCreds(creds);
  }

  if (!creds) {
    return NextResponse.json(
      {
        ok: false,
        code: 'bridge_not_configured',
        error:
          'The AI Router is already claimed but no bridge credentials are on file. ' +
          'Create freellmapi/server/data/medq-bridge.json with the dashboard email/password, then retry.',
      },
      { status: 409 },
    );
  }

  // 4. Login → token.
  const loginRes = await sidecar('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: creds.email, password: creds.password }),
  });
  if (!loginRes.ok) {
    const body = (await loginRes.json().catch(() => null)) as { error?: { message?: string } } | null;
    return NextResponse.json(
      {
        ok: false,
        code: loginRes.status === 429 ? 'rate_limited' : 'bridge_credentials_invalid',
        error:
          body?.error?.message ??
          'The AI Router rejected the bridge credentials. If the dashboard password was changed, update freellmapi/server/data/medq-bridge.json.',
      },
      { status: 502 },
    );
  }
  const session = (await loginRes.json()) as { token: string; email: string };

  return NextResponse.json(
    { ok: true, token: session.token, email: session.email },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
