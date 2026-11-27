import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { maybeOffload } from './offload';
import { createLogger } from '../../logger';

const log = createLogger('BrowserTool');

/**
 * browser_snapshot — fetch-based page snapshot, ported from hermes
 * (`browser_snapshot`, capability browser.navigate; the fetch backend —
 * Playwright-grade interaction intentionally NOT ported per MedQ's
 * capability-leak policy). Returns title, text content, and the link
 * inventory of a page; large snapshots auto-offload to an artifact.
 *
 * Differs from fetch_medical_reference: that tool extracts readable article
 * TEXT for citation; this tool inventories page STRUCTURE (headings, links,
 * forms) for navigation-style research ("what resources does this site
 * offer?"). Shares the same SSRF guard posture (private-IP block, size/time
 * caps).
 */

const MAX_BYTES = 2 * 1024 * 1024;
const TIMEOUT_MS = 20_000;
const MAX_LINKS = 60;

function assertPublicUrl(raw: string): URL {
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http(s) URLs are allowed.');
  }
  const host = url.hostname.toLowerCase();
  const blocked =
    host === 'localhost' ||
    host === 'metadata.google.internal' ||
    host.endsWith('.internal') ||
    host.endsWith('.local') ||
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host);
  if (blocked) throw new Error('Refusing to fetch a private/internal address.');
  return url;
}

function extractLinks(html: string): Array<{ text: string; href: string }> {
  const links: Array<{ text: string; href: string }> = [];
  const anchorRe = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRe.exec(html)) !== null && links.length < MAX_LINKS) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
    if (href.startsWith('javascript:') || href.startsWith('#')) continue;
    links.push({ text, href });
  }
  return links;
}

export function createBrowserSnapshotTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'browser_snapshot',
    description:
      'Take a structural snapshot of a web page: title, main text, and its link inventory. Use for navigation-style research — exploring what a site offers, finding subsections or downloadable resources — rather than reading a single article (use fetch_medical_reference for article text).',
    schema: z.object({
      url: z.string().url().describe('The page URL to snapshot'),
      includeLinks: z.boolean().optional().describe('Include the link inventory (default true)'),
    }),
    func: async ({ url, includeLinks }) => {
      try {
        const parsed = assertPublicUrl(url);
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        const response = await fetch(parsed, {
          signal: controller.signal,
          redirect: 'follow',
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MedQAgent/1.0; +educational)' },
        }).finally(() => clearTimeout(timer));
        if (!response.ok) {
          return JSON.stringify({ ok: false, error: `HTTP ${response.status}` });
        }
        const buffer = await response.arrayBuffer();
        if (buffer.byteLength > MAX_BYTES) {
          return JSON.stringify({ ok: false, error: 'Page exceeds the 2MB snapshot cap.' });
        }
        const html = new TextDecoder('utf-8', { fatal: false }).decode(buffer);

        const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/\s+/g, ' ').trim();
        const bodyText = html
          .replace(/<script[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const result = {
          ok: true,
          url: parsed.toString(),
          title,
          contentChars: bodyText.length,
          content: bodyText.slice(0, 6000),
          ...(includeLinks !== false ? { links: extractLinks(html) } : {}),
        };
        const serialized = JSON.stringify(result);
        // maybeOffload protects the context when the snapshot is huge.
        return await maybeOffload(ctx, 'browser_snapshot', serialized);
      } catch (error) {
        log.warn?.(`browser_snapshot failed for ${url}:`, error);
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

/**
 * browser_interact — click / type / screenshot against a real browser
 * backend (hermes-parity tool, capability browser.interact — HITL gated).
 *
 * The default deployment ships the fetch-based snapshot backend, which
 * cannot drive interaction: the tool answers with a clear, structured
 * "backend unavailable" message so the model degrades gracefully to
 * browser_snapshot instead of hallucinating success. Setting
 * MEDQ_BROWSER_BACKEND_URL points at a Playwright sidecar exposing
 * POST /browser/interact (the hermes `PlaywrightHttpBackend` contract).
 */
export function createBrowserInteractTool(_ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'browser_interact',
    description:
      'Click an element, type text, or take a screenshot on a page rendered by a real browser. Requires the interactive browser backend; when unavailable it reports so — fall back to browser_snapshot for structural snapshots.',
    schema: z.object({
      action: z.enum(['click', 'type', 'screenshot']).describe('Interaction to perform'),
      selector: z.string().max(300).optional().describe('CSS selector for click/type'),
      text: z.string().max(2000).optional().describe('Text to type (action=type)'),
      url: z.string().url().optional().describe('Navigate to this URL first'),
    }),
    func: async ({ action, selector, text, url }) => {
      const backendUrl = process.env.MEDQ_BROWSER_BACKEND_URL;
      if (!backendUrl) {
        return JSON.stringify({
          ok: false,
          unavailable: true,
          error:
            'No interactive browser backend is configured on this deployment. Use browser_snapshot for read-only page research instead.',
        });
      }
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 30_000);
        timer.unref?.();
        const response = await fetch(`${backendUrl.replace(/\/$/, '')}/browser/interact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, selector, text, url }),
          signal: controller.signal,
        }).finally(() => clearTimeout(timer));
        const data = (await response.json().catch(() => null)) as Record<string, unknown> | null;
        if (!response.ok || !data) {
          return JSON.stringify({ ok: false, error: `Browser backend HTTP ${response.status}` });
        }
        return JSON.stringify(data);
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
