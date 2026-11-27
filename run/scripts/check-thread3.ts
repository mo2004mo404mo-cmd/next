import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const msgs = await db`SELECT m.role, LEFT(m.content, 100) as content, m."createdAt" FROM "AgentThreadMessage" m WHERE m."createdAt" BETWEEN '2026-10-07T19:50:00Z' AND '2026-10-07T20:35:00Z' ORDER BY m."createdAt" ASC`;
console.log('thread 19:50-20:35:');
for (const m of msgs) console.log(m.createdAt, m.role, JSON.stringify(m.content));
db.close();
