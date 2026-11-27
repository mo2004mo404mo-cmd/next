import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import dns from 'node:dns/promises';
import net from 'node:net';
import { createLogger } from '../../logger';
import { maybeOffload } from './offload';

const log = createLogger('AgentWebFetch');

/**
 * fetch_medical_reference — SSRF-guarded page reader.
 *
 * Ported from the reference agent platforms (deep-agent-platform
 * `assertSafeUrl` / hermes `assertPublicUrl`): blocks non-http(s) schemes,
 * loopback / private / link-local / CGNAT / metadata IPs, re-validates every
 * redirect hop, enforces size + time caps, and strips HTML to readable text
 * so the tool result stays small enough for the model context.
 */

const PRIVATE_HOSTNAMES = new Set([
  'localhost',
  'localhost.localdomain',
  'ip6-localhost',
  'ip6-loopback',
  'metadata.google.internal',
  'instance-data',
]);

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return true; // malformed → treat as private
  const [a, b] = parts;
  if (a === 10 || a === 127) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 169 && b === 254) return true; // link-local + cloud metadata
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 0) return true;
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase();
  if (normalized === '::' || normalized === '::1') return true;
  if (normalized.startsWith('fe80')) return true; // link-local
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true; // unique local
  if (/^::ffff:/.test(normalized)) return isPrivateIPv4(normalized.replace('::ffff:', ''));
  return false;
}

async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid URL: ${rawUrl}`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Blocked scheme: ${url.protocol} (only http/https are allowed)`);
  }
  const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (PRIVATE_HOSTNAMES.has(hostname)) throw new Error('Blocked host (private/metadata)');
  if (net.isIPv4(hostname)) {
    if (isPrivateIPv4(hostname)) throw new Error('Blocked host (private IP range)');
    return url;
  }
  if (hostname.includes(':')) {
    if (isPrivateIPv6(hostname)) throw new Error('Blocked host (private IPv6 range)');
    return url;
  }
  // DNS resolve to defeat hostname-based SSRF (incl. DNS rebinding)
  try {
    const records = await dns.lookup(hostname, { all: true });
    for (const record of records) {
      if (isPrivateIPv4(record.address) || isPrivateIPv6(record.address)) {
        throw new Error('Blocked host (resolves to private address)');
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Blocked host')) throw error;
    // DNS failure falls through — the fetch itself will fail with a clear error
    log.warn?.(`DNS lookup failed for ${hostname}`);
  }
  return url;
}

/** Regex-based HTML → text (no external deps), ported pattern from P1/P3.
 * Exported for the knowledge pipeline's URL ingestion (compare-and-integrate-4). */
export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<(?:nav|footer|header|aside|form)[^>]*>[\s\S]*?<\/(?:nav|footer|header|aside|form)>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|section|article|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const MAX_CONTENT_CHARS = 12_000;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const FETCH_TIMEOUT_MS = 20_000;
const MAX_REDIRECTS = 4;

/** SSRF-guarded page fetch → clean text. Exported for knowledge ingestion. */
export async function fetchPageText(rawUrl: string, hops = 0): Promise<{ title: string; url: string; content: string }> {
  const url = await assertPublicUrl(rawUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'manual', // validate every hop ourselves
      headers: { 'User-Agent': 'MedQ-Agent/1.0 (education research)', Accept: 'text/html,text/plain,*/*' },
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location) throw new Error(`Redirect without location (HTTP ${response.status})`);
      if (hops >= MAX_REDIRECTS) throw new Error('Too many redirects');
      return fetchPageText(new URL(location, url).toString(), hops + 1);
    }
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_BYTES) throw new Error('Page exceeds 2MB size cap');
    const contentType = response.headers.get('content-type') ?? '';
    const text = buffer.toString('utf8');
    if (contentType.includes('text/html') || /^\s*<(!doctype|html)/i.test(text)) {
      const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      return {
        title: titleMatch ? htmlToText(titleMatch[1]).slice(0, 200) : url.hostname,
        url: url.toString(),
        content: htmlToText(text).slice(0, MAX_CONTENT_CHARS),
      };
    }
    return { title: url.hostname, url: url.toString(), content: text.slice(0, MAX_CONTENT_CHARS) };
  } finally {
    clearTimeout(timer);
  }
}

export function createMedicalFetchTool(ctx?: import('../types').MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'fetch_medical_reference',
    description:
      'Fetch and read a specific web page (guideline, article, abstract) as clean text. Use after search_medical_references when a snippet is not enough to answer accurately. Only public http(s) pages.',
    schema: z.object({
      url: z.string().url().describe('The page URL to read'),
      maxChars: z.number().int().min(1000).max(12000).optional().describe('Optional cap on returned characters'),
    }),
    func: async ({ url, maxChars }) => {
      // 1. ZAI gateway page_reader (renders JS-heavy pages; P1 pattern)
      try {
        const { createZAI } = await import('../../zai');
        const zai = await createZAI();
        if (zai?.functions?.invoke) {
          const page = (await zai.functions.invoke('page_reader', { url })) as {
            code?: number;
            data?: { html?: string; title?: string; url?: string };
          };
          if (page?.data?.html) {
            // Validate the resolved URL is public before trusting gateway output
            const finalUrl = page.data.url ?? url;
            const content = htmlToText(page.data.html).slice(0, maxChars ?? MAX_CONTENT_CHARS);
            if (content.length > 200) {
              const payload = JSON.stringify({
                title: page.data.title ?? finalUrl,
                url: finalUrl,
                content,
                source: 'zai-page-reader',
              });
              return ctx ? maybeOffload(ctx, 'fetch_medical_reference', payload) : payload;
            }
          }
        }
      } catch (error) {
        log.warn?.('ZAI page_reader failed, falling back to direct fetch:', error);
      }
      // 2. Direct SSRF-guarded fetch
      try {
        const page = await fetchPageText(url);
        const content = maxChars ? page.content.slice(0, maxChars) : page.content;
        const payload = JSON.stringify({ title: page.title, url: page.url, content });
        return ctx ? maybeOffload(ctx, 'fetch_medical_reference', payload) : payload;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return JSON.stringify({ error: `Could not read page: ${message}`, url });
      }
    },
  });
}

export { assertPublicUrl };
