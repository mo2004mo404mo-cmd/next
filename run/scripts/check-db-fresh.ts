// check-db-fresh.ts — quick check: latest row activity in key content tables
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`
  SELECT 'Question' AS t, max("updatedAt")::text AS m, count(*)::text AS c FROM "Question"
  UNION ALL
  SELECT 'KnowledgeChunk', max("createdAt")::text, count(*)::text FROM "KnowledgeChunk"
  UNION ALL
  SELECT 'KnowledgeSource', max("updatedAt")::text, count(*)::text FROM "KnowledgeSource"
  UNION ALL
  SELECT 'NOW/server', now()::text, ''`;
for (const r of rows) console.log(String(r.t).padEnd(18), String(r.m).padEnd(32), r.c);
await sql.close();
