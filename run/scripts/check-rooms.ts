import { db } from '../src/lib/db';
async function main() {
  const student = await db.user.findFirst({ where: { email: 'student@medq.com' }, select: { id: true, name: true } });
  console.log('student:', student?.id, student?.name);
  const rooms = await db.chatRoom.findMany({ take: 6, select: { id: true, name: true, type: true, members: { select: { userId: true } } } });
  for (const r of rooms) console.log('room:', r.id, r.type, JSON.stringify(r.name), 'members:', r.members.map(m => m.userId.slice(-6)).join(','));
  await db.$disconnect();
}
main();
