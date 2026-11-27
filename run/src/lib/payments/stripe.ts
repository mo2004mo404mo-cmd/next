/**
 * Stripe payments integration — REST API, no SDK dependency.
 *
 * This module was reconstructed from its call sites (the original file was
 * missing from the project archive). It keeps the same public API:
 *
 *   isStripeConfigured()              — true when STRIPE_SECRET_KEY is set
 *   getAppUrl()                       — absolute base URL of this deployment
 *   createCheckoutSession(params)     — Stripe Checkout (or mock) URL
 *   createBillingPortalSession(...)   — Billing Portal URL (null in mock mode)
 *   constructWebhookEvent(body, sig)  — signature-verified webhook event
 *
 * ── Mock mode ──────────────────────────────────────────────────────────
 * When STRIPE_SECRET_KEY is unset (or a price ID is missing), checkout
 * degrades to "mock mode": createCheckoutSession returns a URL to
 * /api/payments/mock-success, which fulfills the PaymentOrder immediately
 * (marks it paid, upgrades the tier / grants credits). This lets the full
 * upgrade + credit-purchase flow be exercised without Stripe keys.
 *
 * ── Real mode ──────────────────────────────────────────────────────────
 * Uses Stripe's REST API directly via fetch:
 *   POST /v1/checkout/sessions        — one-time or subscription checkout
 *   POST /v1/billing_portal/sessions  — customer portal
 * Webhook signature verification is done with node:crypto (HMAC-SHA256 over
 * "{t}.{payload}" — see https://docs.stripe.com/webhooks#verify-manually).
 *
 * Env vars (all optional — unset ⇒ mock mode):
 *   STRIPE_SECRET_KEY       sk_live_… / sk_test_…
 *   STRIPE_WEBHOOK_SECRET   whsec_…
 *   STRIPE_PRICE_PREMIUM    price_…   (see src/lib/subscription/tiers.ts)
 *   STRIPE_PRICE_PRO        price_…
 *   STRIPE_PRICE_CREDITS_*  price_…   (see src/lib/subscription/credits.ts)
 *   APP_URL                 https://…  (explicit base URL override)
 */

import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CheckoutSessionParams {
  userId: string;
  /** "subscription" (tier upgrade) or "credits" (credit package). */
  kind: "subscription" | "credits";
  /** Tier id ("premium"|"pro") or credit package id. */
  referenceId: string;
  amountUsd: number;
  /** Credits granted when the order is paid (tier bonus or package size). */
  credits: number;
  /** Stripe Price ID — empty/undefined ⇒ mock checkout. */
  stripePriceId?: string;
  customerEmail?: string;
  /** PaymentOrder id — round-tripped as client_reference_id. */
  orderId: string;
}

export interface CheckoutSessionResult {
  url: string;
  mock: boolean;
}

export interface BillingPortalSession {
  url: string;
}

// ── Configuration helpers ──────────────────────────────────────────────────

const STRIPE_API_BASE = "https://api.stripe.com";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Absolute base URL of this deployment.
 *
 * Priority: APP_URL / NEXT_PUBLIC_APP_URL env → forwarded request headers →
 * http://localhost:3000. The header path works behind the sandbox preview
 * proxy because src/middleware.ts normalizes x-forwarded-host/-proto to the
 * public host on proxied requests.
 *
 * NOTE: headers() is async in Next.js 15+ — it MUST be awaited, otherwise it
 * returns a Promise (no .get method) and the try/catch silently falls back
 * to localhost, which the user's browser cannot reach.
 */
export async function getAppUrl(): Promise<string> {
  const envUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const proto = h.get("x-forwarded-proto") ?? "http";
      return `${proto}://${host}`;
    }
  } catch {
    // Not in a request scope (e.g. called from a script) — fall through.
  }

  return "http://localhost:3000";
}

// ── Stripe REST helper ─────────────────────────────────────────────────────

async function stripeRequest(
  path: string,
  params: Record<string, string>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });

  const json = (await res.json().catch(() => ({}))) as Record<string, any>;
  if (!res.ok) {
    const message = json?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Stripe API error (${path}): ${message}`);
  }
  return json;
}

// ── Checkout ───────────────────────────────────────────────────────────────

export async function createCheckoutSession(
  params: CheckoutSessionParams,
): Promise<CheckoutSessionResult> {
  const { orderId, kind, referenceId, userId, stripePriceId, customerEmail } =
    params;
  const appUrl = await getAppUrl();

  // ── Mock mode: no keys (or no price configured) → immediate fulfillment ──
  if (!isStripeConfigured() || !stripePriceId) {
    return {
      url: `${appUrl}/api/payments/mock-success?order=${encodeURIComponent(orderId)}`,
      mock: true,
    };
  }

  // ── Real Stripe Checkout Session ──────────────────────────────────────
  const form: Record<string, string> = {
    mode: kind === "subscription" ? "subscription" : "payment",
    "line_items[0][price]": stripePriceId,
    "line_items[0][quantity]": "1",
    client_reference_id: orderId,
    "metadata[orderId]": orderId,
    "metadata[userId]": userId,
    "metadata[kind]": kind,
    "metadata[referenceId]": referenceId,
    success_url: `${appUrl}/?payment=success&order=${encodeURIComponent(orderId)}`,
    cancel_url: `${appUrl}/?payment=cancelled`,
  };
  if (customerEmail) form.customer_email = customerEmail;

  const session = await stripeRequest("/v1/checkout/sessions", form);
  const url = (session as any).url as string | undefined;
  if (!url) {
    throw new Error("Stripe did not return a checkout URL");
  }
  return { url, mock: false };
}

// ── Billing Portal ─────────────────────────────────────────────────────────

/**
 * Creates a Stripe Billing Portal session for an existing customer.
 * Returns null when Stripe isn't configured or the call fails — callers
 * fall back to the in-app subscription management page.
 */
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
): Promise<BillingPortalSession | null> {
  if (!isStripeConfigured() || !customerId) return null;

  try {
    const session = await stripeRequest("/v1/billing_portal/sessions", {
      customer: customerId,
      return_url: returnUrl,
    });
    const url = (session as any).url as string | undefined;
    return url ? { url } : null;
  } catch (err) {
    console.error("[stripe] Billing portal session failed:", err);
    return null;
  }
}

// ── Webhook signature verification ─────────────────────────────────────────

/**
 * Verifies a Stripe webhook signature and parses the event.
 *
 * Signature header format: "t=<timestamp>,v1=<hex hmac>"
 * Signed payload:        `${t}.${rawBody}` keyed with STRIPE_WEBHOOK_SECRET.
 *
 * Throws on malformed/mismatched/ stale signatures; returns the parsed event
 * on success, or null when no webhook secret is configured (mock mode).
 */
export async function constructWebhookEvent(
  rawBody: string,
  signature: string,
): Promise<Record<string, any> | null> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return null;

  // Parse "t=…,v1=…" (v1 may repeat — any valid match is accepted).
  let timestamp: string | undefined;
  const signatures: string[] = [];
  for (const part of signature.split(",")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === "t") timestamp = value;
    else if (key === "v1") signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) {
    throw new Error("Malformed stripe-signature header");
  }

  // Freshness: reject events older than 5 minutes (replay protection).
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    throw new Error("Webhook event timestamp is stale or invalid");
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");

  let matched = false;
  for (const sig of signatures) {
    const sigBuf = Buffer.from(sig, "utf8");
    if (
      sigBuf.length === expectedBuf.length &&
      timingSafeEqual(sigBuf, expectedBuf)
    ) {
      matched = true;
      break;
    }
  }
  if (!matched) {
    throw new Error("Webhook signature mismatch");
  }

  return JSON.parse(rawBody) as Record<string, any>;
}
