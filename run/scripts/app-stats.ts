const sql = new Bun.SQL("postgresql://postgres:postgres@127.0.0.1:5432/nextapp");
try {
  const tables = ["Question","User","Flashcard","Exam","Chat","MicroLesson","StudySession","UserAnswer","KnowledgeChunk"];
  for (const t of tables) {
    try {
      const r = await sql.unsafe(`SELECT count(*)::int as n FROM "${t}"`);
      console.log(`${t}: ${r[0].n}`);
    } catch { console.log(`${t}: (no table)`); }
  }
  const recent = await sql.unsafe(`SELECT id, email, name, "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 5`);
  console.log("\nrecent users:", JSON.stringify(recent, null, 1));
} finally { await sql.end(); }
