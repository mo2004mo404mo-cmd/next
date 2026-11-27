import { searchMemories } from './service';

/**
 * Rendered long-term memory block for the system prompt.
 *
 * Recalls the most relevant memories for the *upcoming user message* and
 * formats them as a compact markdown section (pattern from the reference
 * platforms — never throws; a memory failure must never break a chat turn).
 */
export async function buildMemoryContext(
  userId: string,
  upcomingMessage?: string,
): Promise<string | null> {
  try {
    const results = await searchMemories(userId, upcomingMessage ?? '', 6);
    if (results.length === 0) return null;
    const lines = results.map(
      (entry) => `- [${entry.scope}] ${entry.content}${entry.key ? ` (${entry.key})` : ''}`,
    );
    return ['# Long-term memory (recalled for this conversation)', ...lines].join('\n');
  } catch {
    return null;
  }
}
