/**
 * MCP loader — DB-configured MCP servers → agent tools.
 *
 * Reads the user's enabled AgentMcpServer rows, connects (connections cached
 * per server config), lists tools, syncs the AgentMcpTool catalog, and builds
 * DynamicStructuredTools named `mcp__<server>__<tool>`. Every tool is gated by
 * the HITL approval system (dynamic capability `mcp.<server>.<tool>` — see
 * approvals/service.ts) because MCP servers are arbitrary external systems the
 * user connected.
 *
 * Caps: 5 servers per user, 20 tools per server, 40 tools total — keeps the
 * prompt from exploding when a server exposes a huge catalog.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z, type ZodTypeAny } from 'zod';
import { db } from '@/lib/db';
import { McpConnection, McpError, type McpServerConfig } from './client';

const MAX_SERVERS = 5;
const MAX_TOOLS_PER_SERVER = 20;
const MAX_TOOLS_TOTAL = 40;
const DESCRIPTION_CAP = 800;

// ── Connection cache (survives HMR; single map in prod) ─────────────────────

interface CachedConnection {
  conn: McpConnection;
  key: string;
}

const globalForMcp = globalThis as typeof globalThis & {
  __medqMcpConnections?: Map<string, CachedConnection>;
};

const connections: Map<string, CachedConnection> =
  globalForMcp.__medqMcpConnections ?? new Map();
globalForMcp.__medqMcpConnections = connections;

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'srv';
}

async function connectionFor(config: McpServerConfig): Promise<McpConnection> {
  const cached = connections.get(config.id);
  if (cached && cached.key === new McpConnection(config).key) {
    return cached.conn;
  }
  if (cached) {
    void cached.conn.close().catch(() => {});
    connections.delete(config.id);
  }
  const conn = new McpConnection(config);
  await conn.connect();
  connections.set(config.id, { conn, key: conn.key });
  return conn;
}

// ── JSON Schema → Zod (common subset; unknown shapes degrade gracefully) ────

function jsonSchemaToZod(schema: unknown, depth = 0): ZodTypeAny {
  if (depth > 6 || schema == null || typeof schema !== 'object') return z.any();
  const s = schema as {
    type?: string | string[];
    description?: string;
    enum?: unknown[];
    items?: unknown;
    properties?: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
    anyOf?: unknown[];
    oneOf?: unknown[];
  };
  if (Array.isArray(s.anyOf) || Array.isArray(s.oneOf)) {
    const variants = (s.anyOf ?? s.oneOf ?? []).map((v) => jsonSchemaToZod(v, depth + 1));
    return variants.length > 0 ? z.union(variants.slice(0, 4) as [ZodTypeAny, ZodTypeAny]) : z.any();
  }
  if (Array.isArray(s.enum) && s.enum.length > 0) {
    const values = s.enum.filter((v) => typeof v === 'string') as string[];
    if (values.length > 0) return z.enum(values as [string, ...string[]]);
    return z.any();
  }
  const type = Array.isArray(s.type) ? s.type[0] : s.type;
  switch (type) {
    case 'string':
      return s.description ? z.string().describe(s.description.slice(0, 300)) : z.string();
    case 'number':
      return s.description ? z.number().describe(s.description.slice(0, 300)) : z.number();
    case 'integer':
      return s.description ? z.number().int().describe(s.description.slice(0, 300)) : z.number().int();
    case 'boolean':
      return s.description ? z.boolean().describe(s.description.slice(0, 300)) : z.boolean();
    case 'array': {
      const item = jsonSchemaToZod(s.items, depth + 1);
      return s.description ? z.array(item).describe(s.description.slice(0, 300)) : z.array(item);
    }
    case 'object':
    default: {
      if (s.properties && typeof s.properties === 'object') {
        const required = new Set(s.required ?? []);
        const shape: Record<string, ZodTypeAny> = {};
        for (const [key, prop] of Object.entries(s.properties).slice(0, 40)) {
          const propSchema = jsonSchemaToZod(prop, depth + 1);
          shape[key] = required.has(key) ? propSchema : propSchema.optional();
        }
        const obj = z.object(shape);
        return s.description ? obj.describe(s.description.slice(0, 300)) : obj;
      }
      return z.record(z.string(), z.any());
    }
  }
}

// ── DB sync ─────────────────────────────────────────────────────────────────

async function markServerStatus(
  serverId: string,
  status: 'ok' | 'error',
  lastError?: string,
): Promise<void> {
  try {
    await db.agentMcpServer.update({
      where: { id: serverId },
      data: { status, lastError: lastError?.slice(0, 1000) ?? null, lastTestedAt: new Date() },
    });
  } catch { /* best-effort */ }
}

async function syncToolRows(serverId: string, tools: { name: string; description?: string; inputSchema?: unknown }[]): Promise<void> {
  try {
    const existing = await db.agentMcpTool.findMany({ where: { serverId }, select: { name: true } });
    const present = new Set(tools.map((t) => t.name));
    for (const row of existing) {
      if (!present.has(row.name)) {
        await db.agentMcpTool.updateMany({ where: { serverId, name: row.name }, data: { enabled: false } });
      }
    }
    for (const tool of tools) {
      const schemaJson = (() => {
        try { return JSON.stringify(tool.inputSchema ?? {}).slice(0, 8000); } catch { return null; }
      })();
      await db.agentMcpTool.upsert({
        where: { serverId_name: { serverId, name: tool.name } },
        create: {
          serverId,
          name: tool.name,
          description: (tool.description ?? '').slice(0, 2000),
          schemaJson,
          enabled: true,
        },
        update: {
          description: (tool.description ?? '').slice(0, 2000),
          schemaJson,
          enabled: true,
        },
      });
    }
  } catch { /* best-effort — the agent still works with an unsynced catalog */ }
}

// ── Public surface ──────────────────────────────────────────────────────────

export interface McpLoadResult {
  tools: DynamicStructuredTool[];
  /** Human summary for the system prompt ("server-a: search, fetch"). */
  summary: string | null;
  errors: string[];
}

function safeParseHeaders(raw: string | null | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const out: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
        if (typeof value === 'string') out[key] = value;
      }
      return out;
    }
  } catch { /* not JSON — ignore */ }
  return {};
}

function safeParseArgs(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === 'string');
  } catch { /* ignore */ }
  return [];
}

/**
 * Build the user's MCP tools. Never throws — a broken server degrades to a
 * skipped server + an error surfaced in the result (and on the server row).
 */
export async function buildMcpTools(userId: string): Promise<McpLoadResult> {
  const errors: string[] = [];
  let servers: Array<{
    id: string; name: string; transport: string; url: string | null;
    command: string | null; argsJson: string | null; headersJson: string | null;
  }> = [];
  try {
    servers = await db.agentMcpServer.findMany({
      where: { userId, enabled: true },
      orderBy: { createdAt: 'asc' },
      take: MAX_SERVERS,
    });
  } catch {
    return { tools: [], summary: null, errors: ['MCP catalog unavailable'] };
  }
  if (servers.length === 0) return { tools: [], summary: null, errors: [] };

  const tools: DynamicStructuredTool[] = [];
  const summaries: string[] = [];

  for (const server of servers) {
    const transport = server.transport === 'sse' || server.transport === 'stdio' ? server.transport : 'http';
    const config: McpServerConfig = {
      id: server.id,
      name: server.name,
      transport,
      url: server.url,
      command: server.command,
      args: safeParseArgs(server.argsJson),
      headers: safeParseHeaders(server.headersJson),
    };
    try {
      const conn = await connectionFor(config);
      const remoteTools = (await conn.listTools()).slice(0, MAX_TOOLS_PER_SERVER);
      await syncToolRows(server.id, remoteTools);
      await markServerStatus(server.id, 'ok');
      const serverSlug = slug(server.name);
      const names: string[] = [];
      for (const remote of remoteTools) {
        if (tools.length >= MAX_TOOLS_TOTAL) break;
        const toolName = `mcp__${serverSlug}__${slug(remote.name)}`;
        if (tools.some((t) => t.name === toolName)) continue;
        names.push(remote.name);
        const schema = jsonSchemaToZod(remote.inputSchema);
        const description =
          `[MCP · ${server.name}] ${remote.description ?? `External tool "${remote.name}" from the connected MCP server "${server.name}".`}`
            .replace(/\s+/g, ' ')
            .slice(0, DESCRIPTION_CAP);
        const connRef = conn;
        tools.push(new DynamicStructuredTool({
          name: toolName,
          description,
          schema: schema instanceof z.ZodObject ? schema : z.object({}),
          func: async (input) => {
            const args = (input ?? {}) as Record<string, unknown>;
            const result = await connRef.callTool(remote.name, args);
            return result.slice(0, 60_000);
          },
        }));
      }
      summaries.push(`${server.name}: ${names.slice(0, 8).join(', ')}${names.length > 8 ? ` (+${names.length - 8} more)` : ''}`);
    } catch (error) {
      const message = error instanceof McpError || error instanceof Error
        ? error.message
        : String(error);
      errors.push(`${server.name}: ${message}`);
      await markServerStatus(server.id, 'error', message);
      connections.delete(server.id);
    }
  }

  return {
    tools,
    summary: summaries.length > 0 ? `Connected MCP servers → ${summaries.join(' | ')}` : null,
    errors,
  };
}

/** Test a server config (admin/API "Test connection") without persisting tools. */
export async function testMcpServer(config: McpServerConfig): Promise<{ ok: boolean; toolCount: number; error?: string }> {
  const conn = new McpConnection(config);
  try {
    await conn.connect();
    const tools = await conn.listTools();
    return { ok: true, toolCount: tools.length };
  } catch (error) {
    return {
      ok: false,
      toolCount: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    void conn.close().catch(() => {});
  }
}

/** Drop cached connections for servers the user removed/changed. */
export async function evictMcpConnections(userId: string): Promise<void> {
  try {
    const rows = await db.agentMcpServer.findMany({ where: { userId }, select: { id: true } });
    const live = new Set(rows.map((r) => r.id));
    for (const [id, cached] of connections) {
      if (!live.has(id)) {
        void cached.conn.close().catch(() => {});
        connections.delete(id);
      }
    }
  } catch { /* best-effort */ }
}
