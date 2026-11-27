// Create the nextapp database via Bun's built-in SQL client (explicit PG URL —
// the platform injects a stale SQLite DATABASE_URL into every bash session)
const sql = new Bun.SQL("postgresql://postgres:postgres@127.0.0.1:5432/postgres");

try {
  const existing = await sql`SELECT 1 FROM pg_database WHERE datname = 'nextapp'`;
  if (existing.length > 0) {
    console.log("database nextapp already exists");
  } else {
    await sql.unsafe(`CREATE DATABASE nextapp`);
    console.log("database nextapp created");
  }
  const v = await sql`SELECT version()`;
  console.log(v[0].version);
  const dbs = await sql`SELECT datname FROM pg_database WHERE datistemplate = false`;
  console.log("databases:", dbs.map(d => d.datname).join(", "));
} finally {
  await sql.end();
}
