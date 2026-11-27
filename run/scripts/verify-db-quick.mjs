import pg from 'pg';
const client = new pg.Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'postgres', database: 'nextapp' });
await client.connect();
try {
  const tables = await client.query("SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema='public'");
  console.log('tables:', tables.rows[0].n);
  for (const t of ['User', 'Question', 'Exam', 'ExamAttempt', 'FlashcardDeck']) {
    try {
      const r = await client.query(`SELECT count(*)::int AS n FROM "${t}"`);
      console.log(`${t}: ${r.rows[0].n}`);
    } catch (e) { console.log(`${t}: ERR ${e.message.split('\n')[0]}`); }
  }
} finally { await client.end(); }
