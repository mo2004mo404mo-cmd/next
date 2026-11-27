/** Verify the Krebs turn persisted its answer. */
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`
  SELECT role, left(content, 120) AS head, "createdAt"
  FROM "AgentThreadMessage"
  ORDER BY "createdAt" DESC LIMIT 4
`;
console.log(JSON.stringify(rows, null, 2));
await sql.end();
