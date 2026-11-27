/** Check MCP server rows + tools sync state. */
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const servers = await sql`
  SELECT id, name, transport, command, "argsJson", status, "lastError", "lastTestedAt"
  FROM "AgentMcpServer" ORDER BY "createdAt" DESC LIMIT 3
`;
console.log('SERVERS:', JSON.stringify(servers, null, 2));
const tools = await sql`
  SELECT s.name as server, t.name, t.enabled FROM "AgentMcpTool" t
  JOIN "AgentMcpServer" s ON s.id = t."serverId" LIMIT 5
`;
console.log('TOOLS:', JSON.stringify(tools, null, 2));
await sql.end();
