// Diagnose user-reported partial extraction: list recent ImportExtraction jobs with details
import { SQL } from 'bun';

const db = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const rows = await db`
  SELECT id, "userId", "fileName", status, "rawCount", "droppedChunks",
         "progressDone", "progressTotal", "maxQuestions",
         length("questionsJson") as json_len,
         "startedAt", "finishedAt", "updatedAt"
  FROM "ImportExtraction"
  ORDER BY "startedAt" DESC
  LIMIT 10
`;

for (const r of rows) {
  console.log('------------------------------------------');
  console.log('job id        :', r.id);
  console.log('user          :', r.userId);
  console.log('fileName      :', r.fileName);
  console.log('status        :', r.status);
  console.log('rawCount      :', r.rawCount);
  console.log('droppedChunks :', r.droppedChunks);
  console.log('progress      :', r.progressDone, '/', r.progressTotal);
  console.log('maxQuestions  :', r.maxQuestions);
  console.log('json size     :', r.json_len);
  console.log('startedAt     :', r.startedAt);
  console.log('finishedAt    :', r.finishedAt);
  console.log('updatedAt     :', r.updatedAt);
}

// For the most recent job, count actual questions in json
const latest = rows[0];
if (latest) {
  const full = await db`SELECT "questionsJson" FROM "ImportExtraction" WHERE id = ${latest.id}`;
  if (full[0]?.questionsJson) {
    try {
      const parsed = JSON.parse(full[0].questionsJson);
      console.log('==========================================');
      console.log('LATEST JOB actual questions in JSON:', Array.isArray(parsed) ? parsed.length : typeof parsed);
      // count per-chunk / look for gaps: check question texts briefly
      if (Array.isArray(parsed)) {
        const withText = parsed.filter((q: any) => q.question && q.question.length > 10).length;
        const withAnswer = parsed.filter((q: any) => q.answer && q.answer.length > 0).length;
        console.log('  with question text:', withText);
        console.log('  with answer      :', withAnswer);
      }
    } catch (e) {
      console.log('JSON parse error:', (e as Error).message);
    }
  }
}
await db.close();
