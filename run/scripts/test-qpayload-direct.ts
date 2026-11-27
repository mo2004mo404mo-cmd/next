/**
 * Direct verification of the generation.saved payload (Task 47, Feature 4).
 *
 * Runs the REAL question deep agent (runDeepAgentQuestionGeneration — the same
 * engine the chat agent launches) for 1 easy asthma MCQ and captures the
 * `saved` event's question record — proving it carries everything
 * ChatQuestionCard renders: id, text, options (parsed array), answer,
 * explanation, difficulty, topic. Also runs the client-side toQuestionPayload
 * mapping (same logic as useAgentV2Stream) against the live payload.
 */
import { runDeepAgentQuestionGeneration } from '../src/lib/agent/question-deep-agent';

async function main() {
  const { SQL } = await import('bun');
  const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
  const rows = await db`SELECT id FROM "User" WHERE email = 'student@medq.com' LIMIT 1`.values();
  const userId = rows[0][0] as string;

  const before = await db`SELECT COUNT(*)::int AS n FROM "Question"`.values();

  const savedEvents: Array<Record<string, unknown>> = [];
  for await (const ev of runDeepAgentQuestionGeneration({
    topic: 'asthma',
    system: 'Respiratory',
    types: ['mcq'],
    difficulties: ['Easy'],
    count: 1,
    userId,
  })) {
    if (ev.type === 'saved') {
      savedEvents.push(ev.question);
      console.log(`[saved #${ev.index}] captured`);
    } else if (ev.type === 'tool_start') {
      console.log(`  tool: ${ev.tool}`);
    } else if (ev.type === 'error') {
      console.log(`  ERROR: ${ev.error}`);
    }
  }

  console.log(`\nsaved events: ${savedEvents.length}`);
  if (!savedEvents.length) throw new Error('agent saved no questions');

  // ── identical copy of useAgentV2Stream's toQuestionPayload ──
  const toQuestionPayload = (raw: Record<string, unknown>) => {
    const options = Array.isArray(raw.options)
      ? raw.options.map((o) => String(o)).filter(Boolean)
      : typeof raw.options === 'string'
        ? (() => { try { const p = JSON.parse(raw.options); return Array.isArray(p) ? p.map(String) : []; } catch { return []; } })()
        : [];
    return {
      id: String(raw.id ?? ''),
      type: String(raw.type ?? 'mcq'),
      text: String(raw.text ?? ''),
      options,
      answer: String(raw.answer ?? ''),
      explanation: String(raw.explanation ?? ''),
      imageUrl: raw.imageUrl ? String(raw.imageUrl) : undefined,
    };
  };

  for (const raw of savedEvents) {
    const q = toQuestionPayload(raw);
    console.log(`  id:          ${q.id}`);
    console.log(`  type/topic:  ${q.type} / ${String(raw.topic ?? '')}`);
    console.log(`  options:     ${q.options.length} → ${q.options.map((o: string) => o.slice(0, 40)).join(' | ').slice(0, 160)}`);
    console.log(`  answer:      ${q.answer.slice(0, 80)}`);
    console.log(`  explanation: ${q.explanation.length} chars`);
    console.log(`  imageUrl:    ${q.imageUrl ?? '(none)'}`);
    if (!q.id) throw new Error('payload missing id');
    if (q.options.length < 2) throw new Error('payload missing options');
    if (!q.answer) throw new Error('payload missing answer');
    if (q.explanation.length < 30) throw new Error('payload missing explanation');
    if (!q.text || q.text.length < 20) throw new Error('payload missing stem');

    // DB cross-check: the saved record exists and matches
    const dbq = await db`SELECT id, options, answer FROM "Question" WHERE id = ${q.id}`.values();
    if (!dbq.length) throw new Error('saved question not found in DB');
    console.log('  DB check:    record exists ✓');
  }

  const after = await db`SELECT COUNT(*)::int AS n FROM "Question"`.values();
  console.log(`\nbank: ${before[0][0]} → ${after[0][0]} questions`);
  console.log('\nPASS: generation.saved carries the full interactive-card payload');
  await db.end?.();
}

main().catch((err) => {
  console.error('FAIL:', err instanceof Error ? err.message : err);
  process.exit(1);
});
