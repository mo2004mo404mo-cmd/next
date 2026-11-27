import pg from 'pg';
const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/postgres' });
await client.connect();
const exists = await client.query("SELECT 1 FROM pg_database WHERE datname='nextapp'");
if (!exists.rows.length) {
  await client.query('CREATE DATABASE nextapp');
  console.log('created database nextapp');
} else {
  console.log('database nextapp already exists');
}
await client.end();
