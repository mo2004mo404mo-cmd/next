import { db } from '../src/lib/db';
async function main() {
  const a = await db.questionAttempt.findFirst({ orderBy: { createdAt: 'desc' }, select: { userId: true, user: { select: { email: true, name: true } } } });
  console.log('attempt user:', a?.userId, a?.user?.email);
  await db.$disconnect();
}
main();
