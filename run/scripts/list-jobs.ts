import { SQL } from "bun";

const sql = new SQL("postgresql://postgres:postgres@127.0.0.1:5432/nextapp");

const rows = await sql`
  SELECT id, "userId", status, "createdAt", "updatedAt"
  FROM "ImportExtraction"
  ORDER BY "createdAt" DESC
`;
for (const r of rows) console.log(JSON.stringify(r));
await sql.end();
