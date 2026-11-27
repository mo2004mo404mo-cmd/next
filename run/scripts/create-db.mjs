import pg from 'pg';
const client = new pg.Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'postgres', database: 'postgres' });
await client.connect();
const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'nextapp'");
if (res.rowCount === 0) {
  await client.query('CREATE DATABASE nextapp');
  console.log('[pg] database nextapp created');
} else {
  console.log('[pg] database nextapp already exists');
}
await client.end();
