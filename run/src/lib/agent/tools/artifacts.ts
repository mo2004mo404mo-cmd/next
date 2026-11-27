import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { createArtifact, type ArtifactKind } from '../artifacts/service';

/**
 * create_artifact — register a durable deliverable for the user.
 * (Port of the reference platforms' artifact tools.)
 *
 * The tool result includes a download URL that the chat UI renders as a
 * clickable artifact link, so users can keep what the agent produced.
 */
export function createArtifactTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'create_artifact',
    description:
      'Save a deliverable the user should keep (study guide, cheat sheet, summary, data table, comparison chart data, dataset) as a durable artifact. The user gets a preview and a download link in chat. For full documents use generate_document instead; use this for raw content blocks (csv/json/chart data) or markdown notes.',
    schema: z.object({
      name: z.string().min(3).max(80).describe('Short artifact name, e.g. "ECG-rates-cheat-sheet"'),
      kind: z.enum(['markdown', 'html', 'csv', 'json', 'chart', 'document']).describe('Content kind'),
      content: z.string().min(1).max(120_000).describe('The full artifact content (markdown/html/csv/json)'),
      title: z.string().max(120).optional().describe('Human-friendly display title'),
    }),
    func: async ({ name, kind, content, title }) => {
      try {
        const artifact = await createArtifact({
          userId: ctx.userId,
          name,
          kind: kind as ArtifactKind,
          content,
          meta: title ? { title } : undefined,
        });
        return JSON.stringify({
          created: true,
          artifact: {
            id: artifact.id,
            name: artifact.name,
            kind: artifact.kind,
            sizeBytes: artifact.sizeBytes,
            downloadUrl: artifact.downloadUrl,
          },
          note: 'Artifact saved. Mention it in your final answer with the download link.',
        });
      } catch (error) {
        return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
