// Quick DB verification: explanation coverage + rich-format sample
const db = new Bun.SQL('postgres://postgres@127.0.0.1:5432/nextapp');
const r = await db`SELECT COUNT(*)::int AS n FROM "Question" WHERE explanation IS NOT NULL AND explanation <> ''`;
const s = await db`SELECT id, length(explanation) AS len, (explanation LIKE '%<strong>%') AS has_strong, (explanation LIKE '%<ul>%') AS has_ul FROM "Question" WHERE explanation LIKE '%<strong>%' LIMIT 1`;
const imp = await db`SELECT id, status FROM "ImportExtraction" ORDER BY "createdAt" DESC LIMIT 2`;
console.log('questions with explanation:', r[0].n);
console.log('rich-format sample:', s[0]);
console.log('recent imports:', imp);
await db.close();
