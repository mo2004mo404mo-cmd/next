/**
 * One-time semantic fix for the E2E revision rows: editedBy now records WHO
 * AUTHORED the archived content (not who performed the action).
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/fix-revision-authors.ts
 */
import { db } from '../src/lib/db';

async function main() {
  // The 1,478-char original content was authored by the user (AI-generate
  // flow, saved by the user) — including the row the agent's improve action
  // archived.
  const r1 = await db.agentSkillRevision.updateMany({
    where: { id: 'cmvmo6est0006wgrdmnia4idf' },
    data: { editedBy: 'user' },
  });
  // The 3,120-char improved content was authored by the agent.
  const r2 = await db.agentSkillRevision.updateMany({
    where: { id: 'cmvmo8nkv000bwgrdmzqjy8vl' },
    data: { editedBy: 'agent' },
  });
  // The skill's current content IS the agent's rewrite.
  const s = await db.agentSkill.updateMany({
    where: { name: 'ecg-rhythm-drill' },
    data: { lastEditedBy: 'agent' },
  });
  console.log(`revisions fixed: ${r1.count}+${r2.count}, skills fixed: ${s.count}`);
  const skill = await db.agentSkill.findFirst({
    where: { name: 'ecg-rhythm-drill' },
    include: { revisions: { orderBy: { createdAt: 'desc' } } },
  });
  console.log(`final: lastEditedBy=${skill?.lastEditedBy}, content=${skill?.content.length}ch, revisions:`);
  for (const rev of skill?.revisions ?? []) {
    console.log(`  - ${rev.id.slice(-6)} by=${rev.editedBy} "${rev.reason?.slice(0, 60)}" ${rev.content.length}ch`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
