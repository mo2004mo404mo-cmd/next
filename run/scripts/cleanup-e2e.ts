// cleanup-e2e.ts — remove E2E test artifacts: the 2 questions generated
// against e2e fixture sources + the citetest000001 manual fixture + the
// e2e-diabetes.md / e2e-lecture.md fixture sources themselves.
import { db } from '../src/lib/db';

const qIds = ['cmv6wmnme000gbnrmgrsn02se', 'cmv6wm1vc0007bnrmy2rtpx6r', 'citetest000001'];
const sIds = ['cmuyzuuww0002ewma8ndzgi1c', 'cmuyygery0003ydma3bobkh6a'];

const a = await db.questionAttempt.deleteMany({ where: { questionId: { in: qIds } } });
console.log('attempts deleted:', a.count);
const b = await db.question.deleteMany({ where: { id: { in: qIds } } });
console.log('questions deleted:', b.count);
const c = await db.knowledgeSource.deleteMany({ where: { id: { in: sIds } } });
console.log('e2e fixture sources deleted:', c.count);
const chunks = await db.knowledgeChunk.count();
console.log('chunks remaining:', chunks);
await db.$disconnect();
