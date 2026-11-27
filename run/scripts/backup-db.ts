import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const dump = await sql`SELECT COUNT(*)::int AS n FROM "Question"`;
console.log('questions:', dump[0].n);
await sql.end();
