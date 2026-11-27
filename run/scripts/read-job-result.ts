import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const id = process.argv[2];
const rows = await sql`
  SELECT status, "rawCount", "droppedChunks", LENGTH("questionsJson") AS qlen,
         (LENGTH("questionsJson") - LENGTH(REPLACE("questionsJson", '"text"', ''))) / 6 AS approx_q
  FROM "ImportExtraction" WHERE id = ${id}`;
console.log(JSON.stringify(rows[0]));
const del = await sql`DELETE FROM "ImportExtraction" WHERE id = ${id} AND status = 'done'`;
console.log('cleaned my e2e job row:', del.length);
await sql.end();
