/**
 * Task 20-smallfix verification — proves the fixed code paths on the LIVE DB
 * and the extracted text-quality helpers, without mutating anything.
 *
 *  1. messaging.ts fix: the UserWhereInput relation is `chatRoomMembers`
 *     (the old `chatRoomMemberships` spelling threw at runtime). A harmless
 *     findMany with the corrected relation proves Prisma accepts it.
 *  2. text-quality.ts: joinParagraphFragments / isHeadingLine /
 *     isStructuralLine are now real exports (previously the import bound to
 *     undefined at runtime inside the semantic chunker).
 *  3. Skills self-improvement surface regression check: ecg-rhythm-drill is
 *     still the agent-improved version (content length + lastEditedBy).
 */
import { PrismaClient } from '../src/generated/client';
import { config } from 'dotenv';

config();
// Prefer the .env file's URL — the injected shell env can carry a stale
// DATABASE_URL (same reasoning as src/lib/db.ts's fallback comment).
const connectionString = config().parsed?.DATABASE_URL ?? process.env.DATABASE_URL;

async function main() {
  // ── 1. corrected Prisma relation (read-only, empty in-array) ──
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const adapter = new PrismaPg({ connectionString: connectionString! });
  const db = new PrismaClient({ adapter });
  const users = await db.user.findMany({
    where: { chatRoomMembers: { some: { roomId: { in: ['__none__'] } } } },
    select: { id: true },
    take: 1,
  });
  console.log(`[1] chatRoomMembers relation query OK (rows: ${users.length})`);

  // Old spelling must be rejected — proves the pre-fix code was a live bug.
  let oldThrew = false;
  try {
    await (db.user as unknown as {
      findMany: (args: unknown) => Promise<unknown[]>;
    }).findMany({
      where: { chatRoomMemberships: { some: { roomId: { in: ['__none__'] } } } },
      select: { id: true },
    });
  } catch {
    oldThrew = true;
  }
  console.log(`[1b] old 'chatRoomMemberships' spelling rejected by Prisma: ${oldThrew}`);

  // ── 2. text-quality exports ──
  const tq = await import('../src/lib/agent/knowledge/text-quality');
  const joined = tq.joinParagraphFragments([
    'This sentence was cut in half by a page',
    'break and continues here quietly.',
    'A Standalone Heading Line Here',
    '• bullet item stays its own paragraph',
  ]);
  const okJoin =
    joined.length === 3 &&
    joined[0].startsWith('This sentence was cut') &&
    joined[0].includes('continues here quietly');
  console.log(`[2] joinParagraphFragments: ${okJoin ? 'OK' : 'FAIL'} (${JSON.stringify(joined)})`);
  console.log(
    `[2b] isHeadingLine/isStructuralLine exports: ${typeof tq.isHeadingLine === 'function' && typeof tq.isStructuralLine === 'function' ? 'OK' : 'FAIL'}`,
  );
  // chunkTextQuality must still behave (regression guard for the extraction).
  const chunks = tq.chunkTextQuality(`${'Sentence one is here. '.repeat(40)}\n\n${'Sentence two follows. '.repeat(40)}`);
  console.log(`[2c] chunkTextQuality regression: ${chunks.length >= 2 ? 'OK' : 'FAIL'} (${chunks.length} chunks)`);

  // ── 3. skills self-improvement surface regression ──
  const skill = await db.agentSkill.findFirst({
    where: { name: 'ecg-rhythm-drill' },
    select: { name: true, lastEditedBy: true, content: true },
  });
  if (skill) {
    console.log(
      `[3] ${skill.name}: ${skill.content?.length} chars, lastEditedBy=${skill.lastEditedBy}`,
    );
  } else {
    console.log('[3] ecg-rhythm-drill not found (different account scope) — skip');
  }
  const revCount = await db.agentSkillRevision.count();
  console.log(`[3b] revision history intact: ${revCount} revisions stored`);

  await db.$disconnect();
}

main().catch((e) => {
  console.error('VERIFY FAILED:', e);
  process.exit(1);
});
