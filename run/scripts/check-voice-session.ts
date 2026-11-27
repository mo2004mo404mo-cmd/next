/**
 * Dump the latest OSCE session transcript (voice sessions included).
 * Run: bunx tsx scripts/check-voice-session.ts [sessionIdSuffix?]
 */
import { db } from '../src/lib/db';

async function main() {
  const sessions = await db.osceSession.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, createdAt: true, status: true, scenario: true, transcript: true },
  });
  for (const s of sessions) {
    let turns: unknown[] = [];
    try { turns = JSON.parse(s.transcript); } catch { /* ignore */ }
    const title = (JSON.parse(s.scenario) as { title?: string }).title ?? '?';
    console.log(`\n=== ${s.id} (${s.status}) ${s.createdAt.toISOString()} — ${title}`);
    console.log(`turns: ${turns.length}`);
    for (const t of turns as Array<{ role: string; text: string }>) {
      console.log(`  [${t.role}] ${String(t.text).slice(0, 110)}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
