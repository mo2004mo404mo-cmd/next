// Check user records & artifact ownership mismatch
import { db } from '../src/lib/db';

async function main() {
  const users = await db.user.findMany({
    where: { email: { contains: 'student' } },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  for (const u of users) console.log(`user ${u.email} id=${u.id} name=${u.name} created=${u.createdAt.toISOString()}`);

  const ownerIds = ['cmusenr950006oir80jr4ludo', 'cmuser2vb0000scr8wuwwi596'];
  for (const oid of ownerIds) {
    const u = await db.user.findUnique({ where: { id: oid }, select: { id: true, email: true, name: true } });
    console.log(`owner ${oid} -> ${u ? `${u.email} (${u.name})` : 'NO USER ROW'}`);
  }

  // count artifacts per owner
  const arts = await db.agentArtifact.groupBy({ by: ['userId'], _count: true });
  for (const a of arts) console.log(`artifacts ownerId=${a.userId ?? 'null'} count=${a._count}`);
}

main().finally(() => db.$disconnect());
