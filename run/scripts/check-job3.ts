import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`
  SELECT id, status, "fileName", LENGTH(text) AS len, "createdAt", "progressDone", "progressTotal"
  FROM "ImportExtraction" ORDER BY "createdAt" DESC LIMIT 3`;
for (const r of rows) console.log(JSON.stringify({ ...r, text: undefined }));
await sql.end();
