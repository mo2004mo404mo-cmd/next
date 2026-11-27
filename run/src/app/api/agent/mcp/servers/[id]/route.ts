/**
 * Per-server MCP control.
 *
 * PATCH  /api/agent/mcp/servers/[id]  — update config (name/url/command/args/
 *                                       headers) or toggle enabled
 * POST   /api/agent/mcp/servers/[id]  — test the connection (updates status)
 * DELETE /api/agent/mcp/servers/[id]  — remove the server + its tools
 */
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest, unauthorized, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audit } from '@/lib/agent/audit';
import { testMcpServer, evictMcpConnections } from '@/lib/agent/mcp/loader';

export const runtime = 'nodejs';

export const PATCH = withErrorHandler<{ id: string }>(async (req: Request, { params }) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();
  const { id } = params;
  const server = await db.agentMcpServer.findFirst({ where: { id, userId } });
  if (!server) return notFound('Server not found');

  const body = await req.json().catch(() => ({})) as {
    enabled?: unknown;
    name?: unknown;
    url?: unknown;
    command?: unknown;
    args?: unknown;
    headers?: unknown;
  };

  const data: Record<string, unknown> = {};
  if (typeof body.enabled === 'boolean') data.enabled = body.enabled;
  if (typeof body.name === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9 _-]{1,59}$/.test(body.name.trim())) {
    data.name = body.name.trim().slice(0, 60);
  }
  if (typeof body.url === 'string') {
    if (body.url && !/^https?:\/\/.+/i.test(body.url)) return badRequest('URL must be http(s)');
    data.url = body.url.trim() || null;
  }
  if (typeof body.command === 'string') data.command = body.command.trim().slice(0, 300) || null;
  if (Array.isArray(body.args)) {
    data.argsJson = JSON.stringify(body.args.filter((v): v is string => typeof v === 'string').slice(0, 20));
  }
  if (body.headers && typeof body.headers === 'object' && !Array.isArray(body.headers)) {
    const clean: Record<string, string> = {};
    for (const [key, value] of Object.entries(body.headers as Record<string, unknown>).slice(0, 20)) {
      if (typeof value === 'string') clean[key] = value.slice(0, 2000);
    }
    data.headersJson = Object.keys(clean).length > 0 ? JSON.stringify(clean) : null;
  }
  if (Object.keys(data).length === 0) return badRequest('Nothing to update');

  const updated = await db.agentMcpServer.update({ where: { id }, data: { ...data } });
  await evictMcpConnections(userId).catch(() => {});
  await audit({ userId, action: 'mcp.server.update', target: updated.name, detail: { fields: Object.keys(data) } });
  return NextResponse.json({ server: { id: updated.id, name: updated.name, enabled: updated.enabled } });
});

export const POST = withErrorHandler<{ id: string }>(async (_req: Request, { params }) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();
  const { id } = params;
  const server = await db.agentMcpServer.findFirst({ where: { id, userId } });
  if (!server) return notFound('Server not found');

  let args: string[] = [];
  let headers: Record<string, string> = {};
  try { args = server.argsJson ? JSON.parse(server.argsJson) : []; } catch { /* ignore */ }
  try { headers = server.headersJson ? JSON.parse(server.headersJson) : {}; } catch { /* ignore */ }

  const result = await testMcpServer({
    id: server.id,
    name: server.name,
    transport: server.transport === 'sse' || server.transport === 'stdio' ? server.transport : 'http',
    url: server.url,
    command: server.command,
    args,
    headers,
  });
  await db.agentMcpServer.update({
    where: { id },
    data: {
      status: result.ok ? 'ok' : 'error',
      lastError: result.ok ? null : (result.error ?? 'unknown error').slice(0, 1000),
      lastTestedAt: new Date(),
    },
  });
  await audit({ userId, action: 'mcp.server.test', target: server.name, detail: { ok: result.ok, toolCount: result.toolCount } });
  return NextResponse.json(result);
});

export const DELETE = withErrorHandler<{ id: string }>(async (_req: Request, { params }) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();
  const { id } = params;
  const server = await db.agentMcpServer.findFirst({ where: { id, userId } });
  if (!server) return notFound('Server not found');

  await db.agentMcpServer.delete({ where: { id } }); // tools cascade
  await evictMcpConnections(userId).catch(() => {});
  await audit({ userId, action: 'mcp.server.delete', target: server.name });
  return NextResponse.json({ deleted: true });
});
