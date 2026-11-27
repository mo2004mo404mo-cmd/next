/** Remove the 2 E2E test questions (renal physiology, generated 2026-10-24 ~10:53). */
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`
  SELECT id, left(text, 80) AS head, "createdAt" FROM "Question"
  WHERE "createdAt" > '2026-10-24T10:50:00Z'
  ORDER BY "createdAt" DESC LIMIT 5
`;
console.log('RECENT:', JSON.stringify(rows, null, 2));
const removed = await sql`
  DELETE FROM "Question" WHERE "createdAt" > '2026-10-24T10:50:00Z' RETURNING id
`;
console.log('REMOVED:', JSON.stringify(removed));
await sql.end();
