import { db } from '../src/lib/db';
const s = await db.knowledgeSource.findUnique({ where: { id: 'cmv6xgvop0000xurml1w3mzsy' }, select: { userId: true, name: true } });
const owner = await db.user.findUnique({ where: { id: s!.userId }, select: { email: true, id: true } });
const student = await db.user.findFirst({ where: { email: 'student@medq.com' }, select: { email: true, id: true } });
console.log('source owner:', owner?.email, owner?.id);
console.log('student:', student?.email, student?.id);
console.log('match:', owner?.id === student?.id);
await db.$disconnect();
