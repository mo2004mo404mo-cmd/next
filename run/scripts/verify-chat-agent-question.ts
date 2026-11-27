// Verify the question saved by the chat-launched complete generation agent.
const id = process.argv[2] ?? 'cmuyigev20008komapthz6o8t';
const sql = new Bun.SQL('postgres://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`SELECT "id", "type", "difficulty", "system", "topic", "tags", "isAIGenerated", "reviewStatus", LEFT("text", 120) AS "preview", LEFT("answer", 60) AS "answer", "createdAt" FROM "Question" WHERE "id" = ${id}`;
console.log(JSON.stringify(rows, null, 2));
const count = await sql`SELECT COUNT(*)::int AS n FROM "Question"`;
console.log('total questions:', count[0].n);
await sql.end();
