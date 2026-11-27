/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/ssrf-guard.ts
 *
 * SSRF (Server-Side Request Forgery) protection utilities — ported verbatim,
 * then extended (Stage 9 of the RAG roadmap) with connect-time DNS pinning
 * to close the DNS-rebinding TOCTOU gap between `validateUrlForSSRF` and the
 * caller's `fetch()`.
 *
 * Validates URLs to prevent requests to internal/private network addresses.
 * Used by any API route that fetches a user-supplied URL server-side.
 *
 * Pure Node.js (no Next/AI deps), so it ports without modification.
 *
 * ── Stage 9: DNS rebinding TOCTOU defense ──
 * `validateUrlForSSRF(url)` resolves DNS, checks all returned addresses for
 * private ranges, and returns null (safe). The caller then `fetch()`es the
 * URL — Node does its OWN DNS lookup between validate and connect, and DNS
 * is allowed to return a different IP the second time (DNS rebinding). The
 * fix is `safeFetch()` below: it runs the actual connection through an
 * undici Agent whose custom `lookup` re-resolves and re-validates at connect
 * time. Private IPs are filtered there too, so even a rebinding attack
 * between validate and connect lands on `EACCES` instead of 169.254.169.254.
 */
import { promises as dns } from 'node:dns';
import { isIP } from 'node:net';
import { Agent, fetch as undiciFetch, type Dispatcher } from 'undici';

function normalizeAddress(value: string): string {
  let normalized = value.trim().toLowerCase();
  if (normalized.startsWith('[') && normalized.endsWith(']')) {
    normalized = normalized.slice(1, -1);
  }
  return normalized.replace(/\.+$/, '');
}

function parseIPv4(ip: string): number[] | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;

  const octets = parts.map((part) => {
    if (!/^\d+$/.test(part)) {
      return Number.NaN;
    }
    return Number.parseInt(part, 10);
  });

  if (octets.some((octet) => Number.isNaN(octet) || octet < 0 || octet > 255)) {
    return null;
  }

  return octets;
}

function extractMappedIPv4(ip: string): string | null {
  const normalized = normalizeAddress(ip);
  if (!normalized.startsWith('::ffff:')) {
    return null;
  }

  const suffix = normalized.slice('::ffff:'.length);
  const dottedIPv4 = parseIPv4(suffix);
  if (dottedIPv4) {
    return dottedIPv4.join('.');
  }

  const parts = suffix.split(':');
  if (parts.length !== 2 || parts.some((part) => !/^[0-9a-f]{1,4}$/.test(part))) {
    return null;
  }

  const [high, low] = parts.map((part) => Number.parseInt(part, 16));
  return [high >> 8, high & 0xff, low >> 8, low & 0xff].join('.');
}

function getFirstIPv6Hextet(ip: string): number | null {
  const normalized = normalizeAddress(ip);
  if (!normalized.includes(':')) {
    return null;
  }

  if (normalized.startsWith('::')) {
    return 0;
  }

  const [firstHextet] = normalized.split(':');
  if (!firstHextet || !/^[0-9a-f]{1,4}$/.test(firstHextet)) {
    return null;
  }

  return Number.parseInt(firstHextet, 16);
}

/** Expand an IPv6 address into 8 numeric hextets. Returns null for invalid input. */
function expandIPv6(ip: string): number[] | null {
  const normalized = normalizeAddress(ip);
  if (!normalized.includes(':')) return null;

  // Skip IPv4-suffix forms (handled separately by extractMappedIPv4)
  const lastPart = normalized.split(':').pop() || '';
  if (lastPart.includes('.')) return null;

  const sides = normalized.split('::');
  if (sides.length > 2) return null;

  let parts: string[];
  if (sides.length === 2) {
    const left = sides[0] ? sides[0].split(':') : [];
    const right = sides[1] ? sides[1].split(':') : [];
    const missing = 8 - left.length - right.length;
    if (missing < 0) return null;
    parts = [...left, ...Array(missing).fill('0'), ...right];
  } else {
    parts = normalized.split(':');
  }

  if (parts.length !== 8) return null;
  if (parts.some((p) => !/^[0-9a-f]{1,4}$/.test(p))) return null;

  return parts.map((p) => Number.parseInt(p, 16));
}

export function isPrivateIP(ip: string): boolean {
  const normalized = normalizeAddress(ip);
  const mappedIPv4 = extractMappedIPv4(normalized);
  if (mappedIPv4) {
    return isPrivateIP(mappedIPv4);
  }

  const ipv4 = parseIPv4(normalized);
  if (ipv4) {
    const [first, second, third, fourth] = ipv4;
    return (
      first === 0 ||
      first === 10 ||
      first === 127 ||
      (first === 169 && second === 254) ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168) ||
      (first === 0 && second === 0 && third === 0 && fourth === 0)
    );
  }

  const ipv6FirstHextet = getFirstIPv6Hextet(normalized);
  if (ipv6FirstHextet === null) {
    return false;
  }

  if (normalized === '::' || normalized === '::1') {
    return true;
  }

  if (
    (ipv6FirstHextet & 0xfe00) === 0xfc00 || // fc00::/7 unique local
    (ipv6FirstHextet & 0xffc0) === 0xfe80 || // fe80::/10 link-local
    (ipv6FirstHextet & 0xffc0) === 0xfec0 // fec0::/10 site-local (deprecated)
  ) {
    return true;
  }

  // 6to4 tunnel: 2002::/16 — embedded IPv4 sits in bits 16-47
  if (ipv6FirstHextet === 0x2002) {
    const hextets = expandIPv6(normalized);
    if (hextets) {
      const embedded = `${hextets[1] >> 8}.${hextets[1] & 0xff}.${hextets[2] >> 8}.${hextets[2] & 0xff}`;
      if (isPrivateIP(embedded)) return true;
    }
  }

  // Teredo tunnel: 2001:0000::/32 — client IPv4 in last 32 bits, XOR-inverted
  if (ipv6FirstHextet === 0x2001) {
    const hextets = expandIPv6(normalized);
    if (hextets && hextets[1] === 0x0000) {
      const high = hextets[6] ^ 0xffff;
      const low = hextets[7] ^ 0xffff;
      const embedded = `${high >> 8}.${high & 0xff}.${low >> 8}.${low & 0xff}`;
      if (isPrivateIP(embedded)) return true;
    }
  }

  return false;
}

const LOCAL_NETWORK_BLOCK_MESSAGE =
  'Local/private network URLs are not allowed. If this is a self-hosted deployment or internal gateway (including split-horizon DNS), set ALLOW_LOCAL_NETWORKS=true to allow local network targets.';

/**
 * Validate a URL against SSRF attacks.
 * Returns null if the URL is safe, or an error message string if blocked.
 */
export async function validateUrlForSSRF(url: string): Promise<string | null> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return 'Invalid URL';
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return 'Only HTTP(S) URLs are allowed';
  }

  // Self-hosted deployments can set ALLOW_LOCAL_NETWORKS=true to skip private-IP checks
  const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
  if (allowLocal === 'true' || allowLocal === '1') {
    return null;
  }

  const hostname = normalizeAddress(parsed.hostname);
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname === '0.0.0.0' ||
    hostname === '::1' ||
    isPrivateIP(hostname)
  ) {
    return LOCAL_NETWORK_BLOCK_MESSAGE;
  }

  if (isIP(hostname)) {
    return null;
  }

  let resolvedAddresses: Array<{ address: string; family: number }>;
  try {
    resolvedAddresses = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    return 'Unable to verify hostname safety';
  }

  if (resolvedAddresses.length === 0) {
    return 'Unable to verify hostname safety';
  }

  if (resolvedAddresses.some(({ address }) => isPrivateIP(address))) {
    return LOCAL_NETWORK_BLOCK_MESSAGE;
  }

  return null;
}


// ───────────────────────────────────────────────────────────────────────────
// Stage 9 — DNS rebinding TOCTOU defense.
//
// `validateUrlForSSRF` (above) is a pre-flight check: it resolves DNS once
// and returns null if every resolved IP is public. The caller's subsequent
// `fetch()` re-resolves DNS and may connect to a DIFFERENT IP — DNS
// rebinding. The helpers below close that gap by running the SAME
// private-IP filter at undici's connect-time lookup.
// ───────────────────────────────────────────────────────────────────────────

/**
 * Result of validating a URL for SSRF safety.
 * - `{ ok: true }` — URL is safe to fetch.
 * - `{ ok: true, resolvedIp }` — URL is safe AND we resolved a specific
 *   public IP that the caller can pin (host header rewrite, IP-literal URL).
 * - `{ ok: false, error }` — URL is unsafe or unresolvable.
 */
export type SSRFValidationResult =
  | { ok: true; resolvedIp?: string }
  | { ok: false; error: string };

/**
 * Resolve a URL for SSRF safety, returning structured data.
 *
 * This is the recommended entry point for new code: it returns the
 * validated IP so the caller can pin it (or use `safeFetch` which pins it
 * for them). `validateUrlForSSRF` (above) is kept for backward compatibility
 * and now delegates here.
 */
export async function resolveUrlForSSRF(url: string): Promise<SSRFValidationResult> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false, error: 'Invalid URL' };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { ok: false, error: 'Only HTTP(S) URLs are allowed' };
  }

  // Self-hosted deployments can opt out via env.
  const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
  if (allowLocal === 'true' || allowLocal === '1') {
    return { ok: true };
  }

  const hostname = normalizeAddress(parsed.hostname);
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname === '0.0.0.0' ||
    hostname === '::1' ||
    isPrivateIP(hostname)
  ) {
    return { ok: false, error: LOCAL_NETWORK_BLOCK_MESSAGE };
  }

  // IP-literal URLs are already validated above; no DNS to rebind.
  if (isIP(hostname)) {
    return { ok: true, resolvedIp: hostname };
  }

  let resolvedAddresses: Array<{ address: string; family: number }>;
  try {
    resolvedAddresses = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    return { ok: false, error: 'Unable to verify hostname safety' };
  }

  if (resolvedAddresses.length === 0) {
    return { ok: false, error: 'Unable to verify hostname safety' };
  }

  if (resolvedAddresses.some(({ address }) => isPrivateIP(address))) {
    return { ok: false, error: LOCAL_NETWORK_BLOCK_MESSAGE };
  }

  // Return the first public IP so callers can pin if they want.
  return { ok: true, resolvedIp: resolvedAddresses[0].address };
}

/**
 * Custom DNS lookup for undici's `connect.lookup`. Re-resolves the hostname
 * at connection time (closing the TOCTOU gap) and rejects any private IP.
 *
 * Signature matches Node's `dns.lookup` callback form so undici accepts it.
 */
function ssrfLookup(
  hostname: string,
  _options: unknown,
  callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void,
): void {
  // Allow opt-out for self-hosted deployments.
  const allowLocal = process.env.ALLOW_LOCAL_NETWORKS;
  if (allowLocal === 'true' || allowLocal === '1') {
    dns.lookup(hostname, { all: true, verbatim: true })
      .then((addrs) => {
        if (addrs.length === 0) {
          const err = new Error(`ENOTFOUND ${hostname}`) as NodeJS.ErrnoException;
          err.code = 'ENOTFOUND';
          callback(err, '', 0);
          return;
        }
        callback(null, addrs[0].address, addrs[0].family);
      })
      .catch((e) => callback(e as NodeJS.ErrnoException, '', 0));
    return;
  }

  dns.lookup(hostname, { all: true, verbatim: true })
    .then((addrs) => {
      if (addrs.length === 0) {
        const err = new Error(`ENOTFOUND ${hostname}`) as NodeJS.ErrnoException;
        err.code = 'ENOTFOUND';
        callback(err, '', 0);
        return;
      }
      // Reject any private address at connect time. Pick the first public one.
      const safe = addrs.find((a) => !isPrivateIP(a.address));
      if (!safe) {
        const err = new Error(
          `SSRF blocked: ${hostname} resolved only to private addresses`,
        ) as NodeJS.ErrnoException;
        err.code = 'EACCES';
        callback(err, '', 0);
        return;
      }
      callback(null, safe.address, safe.family);
    })
    .catch((e) => callback(e as NodeJS.ErrnoException, '', 0));
}

/**
 * Construct an undici Dispatcher that runs every connect-time DNS lookup
 * through `ssrfLookup`. Use this when you need a custom Agent (e.g. to set
 * timeouts, TLS options) but want SSRF safety applied automatically.
 *
 * Most callers should use `safeFetch` instead.
 */
export function createSSRFSafeDispatcher(): Dispatcher {
  return new Agent({
    connect: { lookup: ssrfLookup as unknown as never },
  });
}

let _sharedDispatcher: Dispatcher | null = null;
function sharedDispatcher(): Dispatcher {
  if (!_sharedDispatcher) _sharedDispatcher = createSSRFSafeDispatcher();
  return _sharedDispatcher;
}

/**
 * SSRF-safe `fetch`. Drop-in replacement for global `fetch` that pins the
 * connection to a re-validated public IP at connect time, closing the
 * DNS-rebinding TOCTOU gap. Use this anywhere a user-supplied URL is fetched.
 *
 * Behaviour:
 *   • Pre-flight: rejects non-HTTP(S), private IP literals, and hostnames
 *     whose DNS records resolve to ANY private IP (same checks as
 *     `validateUrlForSSRF`).
 *   • Connect: undici's lookup runs `ssrfLookup`, which re-validates. If
 *     DNS rebinds between pre-flight and connect (the TOCTOU window), the
 *     connect-time lookup refuses the private IP and the request fails with
 *     `EACCES` instead of leaking into the private network.
 *   • AllowLocal: setting ALLOW_LOCAL_NETWORKS=true|1 skips both layers
 *     (self-hosted escape hatch).
 */
export async function safeFetch(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const pre = await resolveUrlForSSRF(url);
  if (!pre.ok) {
    // Mimic fetch's TypeError shape for unsafe URLs.
    throw new TypeError(`SSRF blocked: ${pre.error}`);
  }

  // undici's RequestInit accepts `dispatcher`; TS's global RequestInit does
  // not, so we widen via a typed alias.
  type UndiciInit = RequestInit & { dispatcher?: Dispatcher };
  const merged: UndiciInit = { ...init, dispatcher: sharedDispatcher() };
  // undici's fetch returns a Response-compatible object; cast through
  // unknown so the caller's types stay clean.
  return undiciFetch(url, merged as unknown as Record<string, unknown>) as unknown as Response;
}


/**
 * Production-gated fetch for provider adapter code.
 *
 *   NODE_ENV=production → safeFetch (pre-flight + connect-time DNS pin —
 *                          full DNS-rebinding defense)
 *   otherwise (dev)     → global fetch (local gateways like localhost
 *                          Ollama/Lemonade keep working, exactly mirroring
 *                          the route-level gating that only SSRF-checks
 *                          client baseUrls in production)
 *
 * Use this in adapter modules that fetch a config.baseUrl which may be
 * client-supplied (BYOK). Managed-provider adapters with operator-pinned
 * baseUrls can keep using global fetch.
 */
export async function httpFetch(url: string, init?: RequestInit): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return safeFetch(url, init);
  }
  return fetch(url, init);
}

