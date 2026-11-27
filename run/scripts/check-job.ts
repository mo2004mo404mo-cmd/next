import { SQL } from "bun";

const sql = new SQL("postgresql://postgres:postgres@127.0.0.1:5432/nextapp");

const jobs = await sql`
  SELECT id, status, "rawCount", "droppedChunks", "progressDone", "progressTotal", error,
         "createdAt", "updatedAt", "startedAt", "finishedAt",
         LENGTH(text) AS rawLen
  FROM "ImportExtraction"
  ORDER BY "createdAt" DESC
  LIMIT 5
`;
console.log("=== Latest jobs ===");
for (const j of jobs) console.log(JSON.stringify(j, null, 1));

const q = await sql`SELECT COUNT(*)::int AS c FROM "Question"`;
console.log("Question count:", q[0].c);

if (jobs[0]) {
  const js = await sql`
    SELECT "questionsJson"::text AS raw FROM "ImportExtraction" WHERE id = ${jobs[0].id}
  `;
  if (js[0]?.raw) {
    try {
      const arr = JSON.parse(js[0].raw);
      console.log("Latest job questionsJson length:", Array.isArray(arr) ? arr.length : "not-array");
    } catch {
      console.log("questionsJson not JSON, len:", js[0].raw.length);
    }
  }
}
await sql.end();
