/** Login as the demo student and print the session cookie. */
import pg from 'pg';
const c = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await c.connect();
const { rows } = await c.query('SELECT id, email, name FROM "User" ORDER BY "createdAt" LIMIT 5');
console.log(rows);
await c.end();
