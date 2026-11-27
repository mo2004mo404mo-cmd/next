/**
 * Direct verification of the search_knowledge citation pipeline (Task 47, F5).
 *
 * Calls the REAL createSearchKnowledgeTool.func() (same tool the chat agent
 * uses), then runs the output through the SAME parsing logic the runtime uses
 * (parseKnowledgeCitations — re-implemented identically here since it is
 * module-private) to prove the [K#] citation wire format the chat client
 * renders as hover-cards.
 */
import { createSearchKnowledgeTool } from '../src/lib/agent/tools/knowledge';

// ── identical copy of deep-agent-runtime.ts parseKnowledgeCitations ──
interface KnowledgeCitationWire {
  ref: string;
  title: string;
  sourceId?: string;
  relevance?: number;
  excerpt?: string;
}

function parseKnowledgeCitations(rawToolOutput: string): KnowledgeCitationWire[] | undefined {
  try {
    const parsed = JSON.parse(rawToolOutput) as {
      citations?: Array<{ ref?: unknown; title?: unknown; sourceId?: unknown; relevance?: unknown }>;
      context?: unknown;
    };
    if (!Array.isArray(parsed.citations)) return undefined;
    const excerptByRef = new Map<string, string>();
    if (typeof parsed.context === 'string') {
      for (const block of parsed.context.split(/\n(?=\[K\d+\])/)) {
        const m = /^\[K(\d+)\]/.exec(block.trim());
        if (m) {
          const body = block.trim().replace(/^\[K\d+\][^\n]*\n?/, '').trim();
          if (body) excerptByRef.set(`K${m[1]}`, body.slice(0, 400));
        }
      }
    }
    const citations: KnowledgeCitationWire[] = [];
    for (const c of parsed.citations) {
      if (!c || typeof c.ref !== 'string') continue;
      citations.push({
        ref: c.ref,
        title: typeof c.title === 'string' ? c.title : '',
        sourceId: typeof c.sourceId === 'string' ? c.sourceId : undefined,
        relevance: typeof c.relevance === 'number' ? c.relevance : undefined,
        excerpt: excerptByRef.get(c.ref),
      });
    }
    return citations.length > 0 ? citations : undefined;
  } catch {
    return undefined;
  }
}

async function main() {
  const userId = 'cmuii0v2g0001rl0k9f4xj0y2'; // student@medq.com — will resolve below if wrong
  // Resolve the real user id from the DB (same DB the API uses)
  const { SQL } = await import('bun');
  const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
  const rows = await db`SELECT id, email FROM "User" WHERE email = 'student@medq.com' LIMIT 1`.values();
  if (!rows.length) throw new Error('student user not found');
  const realUserId = rows[0][0] as string;
  console.log(`user: ${rows[0][1]} (${realUserId})`);

  // What knowledge sources exist for this user?
  const sources = await db`SELECT id, name, status FROM "KnowledgeSource" WHERE "userId" = ${realUserId} LIMIT 10`.values();
  console.log(`knowledge sources: ${sources.length}`);
  for (const s of sources) console.log(`  - [${s[2]}] ${s[1]}`);
  if (!sources.length) {
    console.log('NOTE: no knowledge sources — citations will be empty by design');
  }

  const tool = createSearchKnowledgeTool({ userId: realUserId } as never);
  const raw = await tool.invoke({ query: 'diabetes diagnostic criteria' } as never);
  const parsed = JSON.parse(raw);

  console.log('\n=== tool result (as the runtime sees it) ===');
  console.log('ok:', parsed.ok);
  console.log('citations:', JSON.stringify(parsed.citations?.slice(0, 3), null, 2));
  console.log('context (first 300 chars):', (parsed.context ?? '').slice(0, 300));

  console.log('\n=== parseKnowledgeCitations output (SSE wire format) ===');
  const wire = parseKnowledgeCitations(raw);
  if (!wire) {
    console.log('undefined (no citations — expected only if KB is empty)');
    if (sources.length === 0) { console.log('\nPASS (empty-KB path verified)'); return; }
    throw new Error('FAILED: sources exist but citations parse returned undefined');
  }
  for (const c of wire) {
    console.log(`${c.ref}  title="${c.title}"  relevance=${c.relevance}%  excerpt=${(c.excerpt ?? '').length} chars`);
    if (c.excerpt) console.log(`     "${c.excerpt.slice(0, 120)}..."`);
  }

  // Assertions
  if (!sources.length) throw new Error('unreachable');
  if (!wire.length) throw new Error('no citations parsed');
  if (!wire.every((c) => c.ref && typeof c.title === 'string')) throw new Error('citation missing ref/title');
  if (!wire.some((c) => c.excerpt && c.excerpt.length > 40)) throw new Error('excerpts not parsed from context');
  if (parsed.citations.length !== wire.length) throw new Error('citation count mismatch');
  console.log('\nPASS: citation pipeline produces [K#] wire format with titles + excerpts');
  await db.end?.();
  void userId;
}

main().catch((err) => {
  console.error('FAIL:', err instanceof Error ? err.message : err);
  process.exit(1);
});
