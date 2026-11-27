import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { createLogger } from '../../logger';
import { resolveAttachmentInput } from '../attachment-registry';

/**
 * analyze_visual_material — vision analysis of uploaded medical images.
 *
 * fix(attachment-flow): the schema used to demand z.string().url(), so when
 * the agent passed the attachment's file NAME (all it knew about before the
 * registry existed) the call died with "Invalid URL" before ever reaching a
 * vision model. The input now accepts:
 *   - attachment://<id>  — reference from the current turn's attachments
 *     (resolved via the attachment registry; never expires mid-turn)
 *   - data:… / https://…  — direct URLs, passed through as before
 * Vision execution uses the proven ZAI createVision chain (glm-4.5v →
 * glm-4.6v → glm-4v, shared with knowledge/ingest-media) instead of the
 * default text chat model, which is not vision-capable.
 */

const log = createLogger('agent:visual-analysis');

/** Decode a data URL to { buffer, mime }; fetch http(s) URLs. */
async function toBuffer(url: string): Promise<{ buffer: Buffer; mimeType: string }> {
  if (url.startsWith('data:')) {
    const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(url);
    if (!match) throw new Error('Malformed data URL.');
    const [, mime, , payload] = match;
    return { buffer: Buffer.from(payload, 'base64'), mimeType: mime };
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not fetch the image: HTTP ${response.status}`);
  const mimeType = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg';
  return { buffer: Buffer.from(await response.arrayBuffer()), mimeType };
}

export function createVisualMaterialAnalysisTool() {
  return new DynamicStructuredTool({
    name: 'analyze_visual_material',
    description:
      'Analyze a medical image or visual reference with a vision model to identify anatomy, pathology, imaging findings, or visual details. imageUrl accepts an attachment:// reference from the user\'s uploaded image, a data URL, or a public https image URL.',
    schema: z.object({
      imageUrl: z.string().min(5).describe(
        'The image to analyze: use the attachment:// reference from the user\'s uploaded image, a data URL, or a public https URL',
      ),
      question: z.string().min(5).describe('What medical details to extract from the image'),
    }),
    func: async ({ imageUrl, question }) => {
      // 1. Normalize the input (throws a helpful, user-actionable error for
      //    stale/bare-filename references instead of a cryptic "Invalid URL").
      let url: string;
      try {
        url = resolveAttachmentInput(imageUrl, 'image');
      } catch (error) {
        return JSON.stringify({
          analyzed: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      // 2. Run the vision chain. describeImage (shared with the knowledge
      //    ingestion path) tries glm-4.5v → glm-4.6v → glm-4v with retry on
      //    rate limits and caches the first model that answers.
      try {
        const { describeImage } = await import('../knowledge/ingest-media');
        const { buffer, mimeType } = await toBuffer(url);
        const text = await describeImage(buffer, mimeType, question);
        if (text) return text;
        return JSON.stringify({
          analyzed: false,
          error: 'No vision model was reachable to analyze the image. Try again in a moment.',
        });
      } catch (error) {
        log.warn?.('analyze_visual_material failed:', error);
        return JSON.stringify({
          analyzed: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });
}
