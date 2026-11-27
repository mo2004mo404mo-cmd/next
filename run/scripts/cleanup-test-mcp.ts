/** Remove the E2E test MCP server + its tools (cleanup). */
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const removed = await sql`
  DELETE FROM "AgentMcpServer" WHERE name = 'Test Reference Server' RETURNING id, name
`;
console.log('REMOVED:', JSON.stringify(removed));
const leftover = await sql`SELECT count(*)::int AS n FROM "AgentMcpTool"`;
console.log('leftover tools:', JSON.stringify(leftover));
await sql.end();
