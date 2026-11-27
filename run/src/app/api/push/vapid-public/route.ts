/**
 * Web Push public key endpoint.
 *
 * GET /api/push/vapid-public
 *
 * Called by usePushNotifications() before subscribing — the browser needs
 * the applicationServerKey (VAPID public key) to create a push
 * subscription. Returns `{ publicKey, enabled }` where `enabled` is false
 * when the server has no VAPID keypair configured, letting the client show
 * an honest "Push not configured on server" message instead of failing
 * mid-subscribe.
 *
 * Auth: intentionally PUBLIC — the VAPID public key is not a secret (it is
 * embedded in every subscription the browser hands to the push service).
 * No session required.
 */

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const enabled = Boolean(publicKey && privateKey);

  if (!enabled) {
    // 200 (not 503) — the client treats `enabled: false` as a soft-off
    // state and disables the Settings toggle with an explanatory message
    // rather than surfacing an error toast.
    return NextResponse.json({ publicKey: null, enabled: false });
  }

  return NextResponse.json({ publicKey, enabled: true });
}
