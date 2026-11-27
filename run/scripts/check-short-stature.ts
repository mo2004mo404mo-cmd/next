import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const recent = await db`SELECT id, topic, "system", difficulty, "isAIGenerated", tags, "createdAt" FROM "Question" WHERE (topic ILIKE '%short stature%' OR text ILIKE '%short stature%') ORDER BY "createdAt" DESC LIMIT 10`;
console.log('short-stature questions:', recent.length);
for (const q of recent) console.log(JSON.stringify(q));
const lastGen = await db`SELECT id, topic, "createdAt", tags FROM "Question" WHERE "isAIGenerated" = true ORDER BY "createdAt" DESC LIMIT 8`;
console.log('\nlast AI-generated questions:');
for (const q of lastGen) console.log(JSON.stringify(q));
db.close();
