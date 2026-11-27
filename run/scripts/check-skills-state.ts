// Live skills state: confirm Task 18 updates are in place
import { db } from '../src/lib/db';

async function main() {
  const skills = await db.agentSkill.findMany({
    orderBy: [{ userId: 'desc' }, { name: 'asc' }],
    select: { id: true, name: true, description: true, source: true, category: true, enabled: true, content: true, userId: true },
  });
  console.log(`Total skills: ${skills.length}`);
  for (const s of skills) {
    const descLen = s.description.length;
    const contentLen = s.content.length;
    const over300 = descLen > 300 ? ' [DESC>300 — new limit working]' : '';
    const over8k = contentLen > 8000 ? ' [CONTENT>8K — new limit working]' : '';
    console.log(`- ${s.name.padEnd(22)} source=${(s.source ?? 'user').padEnd(8)} cat=${(s.category ?? '-').padEnd(14)} enabled=${s.enabled ? 'on ' : 'off'} desc=${descLen}ch content=${contentLen}ch owner=${s.userId ? 'user' : 'shared'}${over300}${over8k}`);
  }
}

main().finally(() => db.$disconnect());
