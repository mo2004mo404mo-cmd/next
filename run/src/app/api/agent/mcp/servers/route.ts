/**
 * MCP servers API — the REST layer behind the assistant's Integrations panel.
 *
 * GET  /api/agent/mcp/servers   — list the user's configured servers (+ tools)
 * POST /api/agent/mcp/servers   — add a server (http | sse | stdio), optionally
 *                                 test-on-create
 *
 * Per-server control (enable/disable/test/delete) lives at
 * /api/agent/mcp/servers/[id].
 */
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audit } from '@/lib/agent/audit';
import { testMcpServer } from '@/lib/agent/mcp/loader';

export const runtime = 'nodejs';

function safeParse(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === 'string');
  } catch { /* ignore */ }
  return [];
}

export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();
  const servers = await db.agentMcpServer.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    include: { tools: { select: { name: true, description: true, enabled: true } } },
  });
  return NextResponse.json({
    servers: servers.map((server) => ({
      id: server.id,
      name: server.name,
      transport: server.transport,
      url: server.url,
      command: server.command,
      args: server.argsJson ? safeParse(server.argsJson) : [],
      enabled: server.enabled,
      status: server.status,
      lastError: server.lastError,
      lastTestedAt: server.lastTestedAt,
      toolCount: server.tools.filter((t) => t.enabled).length,
      tools: server.tools
        .filter((t) => t.enabled)
        .slice(0, 20)
        .map((t) => ({ name: t.name, description: (t.description ?? '').slice(0, 200) })),
    })),
  });
});

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const body = await req.json().catch(() => ({})) as {
    name?: unknown;
    transport?: unknown;
    url?: unknown;
    command?: unknown;
    args?: unknown;
    headers?: unknown;
    test?: unknown;
  };

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 60) : '';
  const transport = body.transport === 'sse' || body.transport === 'stdio' ? body.transport : 'http';
  const url = typeof body.url === 'string' ? body.url.trim() : '';
  const command = typeof body.command === 'string' ? body.command.trim() : '';
  const args = Array.isArray(body.args) ? body.args.filter((v): v is string => typeof v === 'string').slice(0, 20) : [];
  const headers = body.headers && typeof body.headers === 'object' && !Array.isArray(body.headers)
    ? body.headers as Record<string, unknown>
    : {};

  if (!/^[a-zA-Z0-9][a-zA-Z0-9 _-]{1,59}$/.test(name)) {
    return badRequest('Name must be 2-60 chars (letters, digits, spaces, dashes)');
  }
  if (transport === 'stdio') {
    if (!command) return badRequest('stdio transport requires a command');
  } else {
    if (!/^https?:\/\/.+/i.test(url)) return badRequest(`${transport} transport requires an http(s) URL`);
  }
  const cleanHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers).slice(0, 20)) {
    if (typeof value === 'string' && key.length > 0 && key.length <= 100) cleanHeaders[key] = value.slice(0, 2000);
  }

  const existing = await db.agentMcpServer.count({ where: { userId } });
  if (existing >= 5) {
    return badRequest('Server limit reached (5). Remove one before adding another.');
  }
  const dupe = await db.agentMcpServer.findFirst({ where: { userId, name } });
  if (dupe) return badRequest(`A server named "${name}" already exists`);

  const server = await db.agentMcpServer.create({
    data: {
      userId,
      name,
      transport,
      url: url || null,
      command: command || null,
      argsJson: args.length > 0 ? JSON.stringify(args) : null,
      headersJson: Object.keys(cleanHeaders).length > 0 ? JSON.stringify(cleanHeaders) : null,
    },
  });

  let testResult: { ok: boolean; toolCount: number; error?: string } | null = null;
  if (body.test !== false) {
    testResult = await testMcpServer({
      id: server.id,
      name,
      transport,
      url: url || null,
      command: command || null,
      args,
      headers: cleanHeaders,
    });
    await db.agentMcpServer.update({
      where: { id: server.id },
      data: {
        status: testResult.ok ? 'ok' : 'error',
        lastError: testResult.ok ? null : (testResult.error ?? 'unknown error').slice(0, 1000),
        lastTestedAt: new Date(),
      },
    }).catch(() => {});
  }

  await audit({ userId, action: 'mcp.server.create', target: name, detail: { transport, tested: !!testResult, ok: testResult?.ok ?? null } });
  return NextResponse.json({ server: { id: server.id, name, transport }, test: testResult }, { status: 201 });
});
