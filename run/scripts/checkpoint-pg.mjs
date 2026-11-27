// Force a WAL checkpoint on the live embedded PG so the zipped pgdata is consistent.
import pg from 'pg';
const client = new pg.Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'postgres', database: 'postgres' });
await client.connect();
const r = await client.query('CHECKPOINT');
console.log('[pg] CHECKPOINT done at', new Date().toISOString(), '| wal_level:', (await client.query('SHOW wal_level')).rows[0].wal_level);
await client.end();
