import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const qs = await db`SELECT id, topic, "imageUrl", LEFT(text, 60) as preview, "createdAt" FROM "Question" WHERE topic ILIKE '%gigantism%' ORDER BY "createdAt" DESC LIMIT 3`;
if (qs.length === 0) { console.log('NO gigantism question saved'); }
for (const q of qs) console.log(JSON.stringify({ ...q, hasImage: Boolean(q.imageUrl && q.imageUrl.length > 0) }));
db.close();
