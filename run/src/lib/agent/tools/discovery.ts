import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { searchArtifacts } from '../artifacts/service';
import { createZAI } from '../../zai';
import { saveGeneratedImage } from './illustration';
import { createLogger } from '../../logger';

const log = createLogger('AgentDiscovery');

/**
 * Discovery tools (Task 6 — ported from the reference Deep Agent platform).
 *
 * The reference app exposes raw workspace tools (list/read/write/search files)
 * against the server filesystem. MedQ deliberately does NOT do that: the
 * Task-3 capability fix keeps raw filesystem operations out of the model's
 * vocabulary because MedQ users have no filesystem. Instead the same
 * user-facing capability — "the agent can find and reuse what it already
 * made for you" — is served through the durable artifact library, and web
 * page capture is served through the managed screenshot gateway.
 */

/**
 * search_artifacts — look up the user's durable artifact library.
 *
 * Lets the agent answer "what documents have you made me so far?" and
 * re-share earlier deliverables (download links stay valid across sessions),
 * closing the agent-side half of the artifact-library gap.
 */
export function createArtifactSearchTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'search_artifacts',
    description:
      "Search the user's saved study deliverables (study guides, cheat sheets, documents, spreadsheets, decks, charts, datasets) that were created in earlier conversations. Use when the user asks what you have made for them before, wants to re-download or continue a previous deliverable, or when an earlier artifact could answer the current request. Returns names, dates, and download links.",
    schema: z.object({
      query: z.string().max(120).optional().describe('Search terms (topic or filename words). Omit to list the most recent deliverables.'),
      limit: z.number().int().min(1).max(20).default(10).describe('Max results (default 10)'),
    }),
    func: async ({ query, limit }) => {
      try {
        const artifacts = await searchArtifacts(ctx.userId, (query ?? '').trim(), limit);
        if (artifacts.length === 0) {
          return JSON.stringify({
            results: [],
            note: 'No saved deliverables matched. Offer to create one if the user wants it.',
          });
        }
        const formatted = artifacts.map(
          (a, i) =>
            `[${i + 1}] ${a.name} (${a.kind}, ${a.sizeBytes}B, ${a.createdAt.slice(0, 10)})${a.excerpt ? `\n    excerpt: ${a.excerpt}…` : ''}\n    download: ${a.downloadUrl}`,
        );
        return JSON.stringify({
          results: artifacts.map((a) => ({
            name: a.name,
            kind: a.kind,
            createdAt: a.createdAt,
            downloadUrl: a.downloadUrl,
          })),
          formatted: formatted.join('\n'),
          note: 'Share these download links in your answer. Links remain valid across sessions.',
        });
      } catch (error) {
        return JSON.stringify({ results: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

/**
 * capture_reference_screenshot — render a web page to an image.
 *
 * Ported from the reference platform's browser_screenshot: the ZAI gateway
 * screenshot function renders the URL and returns a data: URL; the image is
 * persisted to /public/generated and returned as a small previewable URL
 * that the chat UI renders inline with the lightbox.
 */
export function createScreenshotTool() {
  return new DynamicStructuredTool({
    name: 'capture_reference_screenshot',
    description:
      'Capture a current screenshot of a public web page (a reference, guideline, or article URL the user is discussing) so both you and the user can see what the page currently shows. Use when a visual of the page adds value — e.g. checking what a linked page actually contains, or showing a diagram/table page. Returns a previewable image URL.',
    schema: z.object({
      url: z.string().url().describe('Absolute http(s) URL of the page to capture'),
    }),
    func: async ({ url }) => {
      try {
        const zai = await createZAI();
        if (!zai?.functions?.invoke) {
          return JSON.stringify({ captured: false, error: 'Screenshot service unavailable.' });
        }
        const result = (await zai.functions.invoke('screenshot', { url })) as unknown;
        if (typeof result === 'string' && result.startsWith('data:')) {
          const base64 = result.split(',')[1];
          if (base64) {
            const imageUrl = saveGeneratedImage(base64);
            if (imageUrl) {
              return JSON.stringify({
                captured: true,
                url,
                imageUrl,
                note: 'Screenshot captured — the image is previewable in chat. Describe what it shows.',
              });
            }
          }
        }
        // Some gateway responses carry the data URL under a field.
        if (result && typeof result === 'object') {
          const rec = result as Record<string, unknown>;
          const dataUrl =
            (typeof rec.screenshot === 'string' && rec.screenshot.startsWith('data:') && rec.screenshot) ||
            (typeof rec.image === 'string' && rec.image.startsWith('data:') && rec.image) ||
            (typeof rec.dataUrl === 'string' && rec.dataUrl.startsWith('data:') && rec.dataUrl) ||
            (typeof rec.url === 'string' && rec.url.startsWith('data:') && rec.url);
          if (dataUrl) {
            const imageUrl = saveGeneratedImage(dataUrl.split(',')[1] ?? '');
            if (imageUrl) {
              return JSON.stringify({ captured: true, url, imageUrl, note: 'Screenshot captured — the image is previewable in chat.' });
            }
          }
        }
        return JSON.stringify({ captured: false, url, error: 'Screenshot service returned no image data.' });
      } catch (error) {
        log.warn?.('Screenshot capture failed:', error);
        return JSON.stringify({ captured: false, url, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
