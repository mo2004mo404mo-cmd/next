import { createArtifact } from '../artifacts/service';
import type { MedQToolContext } from '../types';

/**
 * maybeOffload — big-output context protection, ported from hermes
 * `lib/tools/index.ts`. When a tool's textual output exceeds the threshold,
 * the full output is persisted as a downloadable artifact and the value
 * returned to the model is replaced with a preview + pointer. Keeps huge
 * fetches/snapshots from blowing up the conversation context.
 */

const LARGE_OUTPUT_CHARS = 8_000;
const RETURN_CHARS = 2_500;

export async function maybeOffload(
  ctx: MedQToolContext,
  toolName: string,
  output: string,
): Promise<string> {
  if (!output || output.length <= LARGE_OUTPUT_CHARS) return output;
  try {
    const artifact = await createArtifact({
      userId: ctx.userId,
      name: `${toolName}-output-${Date.now()}.txt`,
      kind: 'document',
      content: output.slice(0, 120_000),
      meta: { autoCaptured: true, tool: toolName, mimeType: 'text/plain' },
    });
    return (
      `${output.slice(0, RETURN_CHARS)}\n\n` +
      `[Full output (${output.length.toLocaleString()} chars) saved as artifact ` +
      `"${artifact.name}" — download: ${artifact.downloadUrl}. ` +
      `Ask the user to open it from the Files tab for the complete content.]`
    );
  } catch {
    // Offload failed — return a hard-truncated version instead of the giant blob.
    return `${output.slice(0, RETURN_CHARS)}\n\n[Output truncated at ${RETURN_CHARS} chars.]`;
  }
}
