/**
 * check-perm-settings.ts — verify AgentPermissionSetting rows landed (E2E check).
 */
import { SQL } from 'bun';

const CONN = 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';
const sql = new SQL(CONN);

const rows = await sql`
  SELECT "userId", capability, effect, "updatedAt"
  FROM "AgentPermissionSetting"
  ORDER BY "updatedAt" DESC
  LIMIT 5
`;
console.log(JSON.stringify(rows, null, 2));
await sql.end();
