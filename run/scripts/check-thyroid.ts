import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const qs = await db`SELECT id, topic, "createdAt" FROM "Question" WHERE topic ILIKE '%thyroid%' AND "createdAt" > '2026-10-08' LIMIT 5`;
console.log('thyroid questions saved today:', qs.length);
for (const q of qs) console.log(JSON.stringify(q));
db.close();
