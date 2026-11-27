import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`SELECT id, status, "fileName" FROM "ImportExtraction"`;
console.log('existing jobs:', JSON.stringify(rows));
if (rows.length) {
  const del = await sql`DELETE FROM "ImportExtraction"`;
  console.log('deleted:', del.length);
}
await sql.end();
