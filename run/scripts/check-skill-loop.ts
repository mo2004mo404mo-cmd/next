/**
 * Verify the skill self-improvement loop state after the E2E improve turn.
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/check-skill-loop.ts
 */
import { db } from '../src/lib/db';

async function main() {
  const skill = await db.agentSkill.findFirst({
    where: { name: 'ecg-rhythm-drill' },
    include: { revisions: { orderBy: { createdAt: 'desc' } } },
  });
  if (!skill) {
    console.log('SKILL NOT FOUND');
    return;
  }
  console.log(`skill: ${skill.name} | source=${skill.source} | lastEditedBy=${skill.lastEditedBy}`);
  console.log(`content length: ${skill.content.length} chars`);
  console.log(`has rubric section: ${/scoring rubric/i.test(skill.content)}`);
  console.log(`has misses table spec: ${/misses/i.test(skill.content) && /table/i.test(skill.content)}`);
  console.log(`revisions: ${skill.revisions.length}`);
  for (const rev of skill.revisions) {
    console.log(`  - ${rev.id} by=${rev.editedBy} reason="${rev.reason?.slice(0, 120)}" ${rev.content.length}ch @ ${rev.createdAt.toISOString()}`);
  }
  const totalRevs = await db.agentSkillRevision.count();
  console.log(`total revisions in table: ${totalRevs}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
