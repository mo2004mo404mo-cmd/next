/**
 * Task 35 — clear stuck extraction jobs.
 *
 * Three zombie "processing" rows (2026-10-04 05:26 / 07:32 / 07:34) were
 * locked in a 429 retry-storm against the shared ZAI gateway. Their in-memory
 * runners die with the dev-server restart; the rows themselves must go so the
 * new single-global-slot cap starts clean. None has results (questionsJson is
 * null — results are only persisted at the very end), so nothing is lost.
 */
import { SQL } from "bun";

const sql = new SQL("postgresql://postgres:postgres@127.0.0.1:5432/nextapp");
const r = await sql`
  DELETE FROM "ImportExtraction"
  WHERE status IN ('pending', 'processing')
  RETURNING id, "fileName", "createdAt"
`;
console.log(`deleted ${r.length} stuck job(s):`);
for (const row of r) console.log(" -", JSON.stringify(row));
await sql.end();
