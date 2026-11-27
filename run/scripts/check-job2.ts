import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`SELECT id, status, "progressDone", "progressTotal", error FROM "ImportExtraction"`;
console.log(JSON.stringify(rows, null, 1));
await sql.end();
