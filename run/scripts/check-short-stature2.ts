import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const cols = await db`SELECT column_name FROM information_schema.columns WHERE table_name='Question' AND column_name IN ('status','reviewStatus','imageUrl','visibility','isPublished','published')`;
console.log('status-ish columns:', cols.map(c=>c.column_name));
const qs = await db`SELECT id, topic, difficulty, "imageUrl", LEFT(text, 80) as preview FROM "Question" WHERE topic ILIKE '%short stature%' ORDER BY "createdAt" DESC LIMIT 3`;
for (const q of qs) console.log(JSON.stringify(q));
// latest agent thread messages to see the recent session
const msgs = await db`SELECT m.role, LEFT(m.content, 120) as content, m."createdAt" FROM "AgentThreadMessage" m ORDER BY m."createdAt" DESC LIMIT 8`;
console.log('\nlatest thread messages:');
for (const m of msgs) console.log(m.createdAt, m.role, JSON.stringify(m.content));
db.close();
