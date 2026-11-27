/** Check audit rows for search_medical_references + module dup diagnosis. */
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const audits = await sql`
  SELECT action, target, "createdAt"
  FROM "AgentAuditLog"
  WHERE target = 'search_medical_references'
  ORDER BY "createdAt" DESC LIMIT 5
`;
console.log('AUDITS:', JSON.stringify(audits, null, 2));
const all = await sql`
  SELECT action, target, "createdAt" FROM "AgentAuditLog" ORDER BY "createdAt" DESC LIMIT 6
`;
console.log('LATEST:', JSON.stringify(all, null, 2));
await sql.end();
