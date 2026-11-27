/**
 * Minimal MCP (Model Context Protocol) client — native, zero-dependency.
 *
 * Implements the three transports the AgentMcpServer schema supports:
 *   - `http`  : Streamable HTTP (MCP 2025-06-18) — JSON-RPC POST; the server
 *               answers with JSON or an SSE stream; session id header honored.
 *   - `sse`   : Legacy HTTP+SSE — GET <url> opens the event stream, the
 *               `endpoint` event returns the POST URL for requests.
 *   - `stdio` : Newline-delimited JSON-RPC over the child process's
 *               stdin/stdout.
 *
 * Scope: exactly what the agent needs — initialize, tools/list, tools/call.
 * Promises are correlated by request id; notifications are ignored. Every
 * method enforces a timeout so a hung server can never park the agent graph.
 */

const PROTOCOL_VERSION = '2025-06-18';
const CLIENT_INFO = { name: 'medq-agent', version: '1.0.0' } as const;

const CONNECT_TIMEOUT_MS = 12_000;
const LIST_TIMEOUT_MS = 20_000;
const CALL_TIMEOUT_MS = 120_000;

export interface McpServerConfig {
  id: string;
  name: string;
  transport: 'http' | 'sse' | 'stdio';
  url?: string | null;
  command?: string | null;
  args?: string[];
  headers?: Record<string, string>;
}

export interface McpToolInfo {
  name: string;
  description?: string;
  inputSchema?: unknown;
}

export class McpError extends Error {
  constructor(message: string, readonly code?: number | string) {
    super(message);
    this.name = 'McpError';
  }
}

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

/** Tiny SSE line parser → complete `data:` payloads (used by http + sse). */
class SseParser {
  private buffer = '';
  private dataLines: string[] = [];

  /** Feed a text chunk; yields complete JSON-RPC message objects. */
  feed(chunk: string): unknown[] {
    this.buffer += chunk;
    const out: unknown[] = [];
    let idx: number;
    while ((idx = this.buffer.indexOf('\n')) >= 0) {
      const line = this.buffer.slice(0, idx).replace(/\r$/, '');
      this.buffer = this.buffer.slice(idx + 1);
      if (line === '') {
        if (this.dataLines.length > 0) {
          const payload = this.dataLines.join('\n');
          this.dataLines = [];
          if (payload.trim()) {
            try { out.push(JSON.parse(payload)); } catch { /* ignore keep-alives / non-JSON */ }
          }
        }
        continue;
      }
      if (line.startsWith('data:')) this.dataLines.push(line.slice(5).trimStart());
      // `event:` lines are not needed — every meaningful payload is JSON-RPC in data.
    }
    return out;
  }
}

export class McpConnection {
  private nextId = 1;
  private pending = new Map<number, PendingRequest>();
  private sessionId: string | null = null;
  private sseEndpoint: string | null = null; // legacy SSE POST target
  private child: import('node:child_process').ChildProcess | null = null;
  private sseAbort: AbortController | null = null;
  private closed = false;
  private initialized = false;
  private stdoutBuffer = '';
  private sseEndpointWaiter: { resolve: () => void } | null = null;

  constructor(private readonly config: McpServerConfig) {}

  /** Cache key — connections are reused while the server row is unchanged. */
  get key(): string {
    return JSON.stringify([this.config.id, this.config.transport, this.config.url,
      this.config.command, this.config.args ?? [], this.config.headers ?? {}]);
  }

  get serverName(): string { return this.config.name; }

  async connect(): Promise<void> {
    if (this.initialized) return;
    if (this.config.transport === 'stdio') this.spawnStdio();
    if (this.config.transport === 'sse') await this.openLegacySse();
    await this.request('initialize', {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: CLIENT_INFO,
    }, CONNECT_TIMEOUT_MS);
    this.notify('notifications/initialized');
    this.initialized = true;
  }

  async listTools(): Promise<McpToolInfo[]> {
    const tools: McpToolInfo[] = [];
    let cursor: string | undefined;
    do {
      const result = await this.request('tools/list', cursor ? { cursor } : {}, LIST_TIMEOUT_MS) as {
        tools?: McpToolInfo[];
        nextCursor?: string;
      };
      for (const tool of result?.tools ?? []) {
        if (tool && typeof tool.name === 'string') tools.push(tool);
      }
      cursor = result?.nextCursor;
    } while (cursor);
    return tools;
  }

  async callTool(name: string, args: Record<string, unknown>, timeoutMs = CALL_TIMEOUT_MS): Promise<string> {
    const result = await this.request('tools/call', { name, arguments: args ?? {} }, timeoutMs) as {
      content?: Array<{ type?: string; text?: string; [k: string]: unknown }>;
      isError?: boolean;
      structuredContent?: unknown;
    };
    const parts: string[] = [];
    for (const block of result?.content ?? []) {
      if (block?.type === 'text' && typeof block.text === 'string') parts.push(block.text);
      else if (block && typeof block === 'object') parts.push(JSON.stringify(block));
    }
    let text = parts.join('\n');
    if (!text && result?.structuredContent != null) text = JSON.stringify(result.structuredContent);
    if (result?.isError) {
      throw new McpError(text || `MCP tool "${name}" returned an error`, 'TOOL_ERROR');
    }
    return text || '(empty result)';
  }

  async close(): Promise<void> {
    this.closed = true;
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(new McpError('Connection closed'));
    }
    this.pending.clear();
    this.sseAbort?.abort();
    if (this.child) {
      this.child.stdin?.end();
      this.child.kill('SIGTERM');
      this.child = null;
    }
  }

  // ── Transport plumbing ───────────────────────────────────────────────────

  private async request(method: string, params: unknown, timeoutMs: number): Promise<unknown> {
    const id = this.nextId++;
    const message = JSON.stringify({ jsonrpc: '2.0', id, method, params });
    return new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new McpError(`MCP ${method} timed out after ${timeoutMs}ms (${this.config.name})`, 'TIMEOUT'));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.deliver(message, id).catch((error) => {
        const pending = this.pending.get(id);
        if (pending) {
          clearTimeout(pending.timer);
          this.pending.delete(id);
          pending.reject(error instanceof Error ? error : new McpError(String(error)));
        }
      });
    });
  }

  private notify(method: string): void {
    this.deliver(JSON.stringify({ jsonrpc: '2.0', method })).catch(() => { /* best-effort */ });
  }

  private async deliver(message: string, requestId?: number): Promise<void> {
    if (this.closed) throw new McpError('Connection is closed');
    if (this.config.transport === 'stdio') {
      this.child?.stdin?.write(message + '\n');
      return;
    }
    const target = this.config.transport === 'sse'
      ? this.sseEndpoint
      : this.config.url;
    if (!target) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: this.config.transport === 'sse' ? 'application/json' : 'application/json, text/event-stream',
      ...(this.config.headers ?? {}),
    };
    if (this.sessionId) headers['mcp-session-id'] = this.sessionId;
    const response = await fetch(target, { method: 'POST', headers, body: message });
    // Session negotiation (streamable http): sticky header on ANY response.
    const sid = response.headers.get('mcp-session-id');
    if (sid) this.sessionId = sid;
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new McpError(`MCP HTTP ${response.status} from "${this.config.name}"${body ? `: ${body.slice(0, 300)}` : ''}`);
    }
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('text/event-stream')) {
      // Streamed responses: consume the SSE body, dispatch messages, resolve
      // when OUR id lands (the stream may stay open — abort after our id).
      const reader = response.body?.getReader();
      if (!reader) throw new McpError('MCP SSE response has no body');
      const parser = new SseParser();
      const decoder = new TextDecoder();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const messages = parser.feed(decoder.decode(value, { stream: true }));
          const found = this.dispatch(messages);
          if (found === requestId) { await reader.cancel().catch(() => {}); return; }
        }
      } finally {
        await reader.cancel().catch(() => {});
      }
      // Stream ended without our response — let the timeout reject it.
      return;
    }
    // Plain JSON response.
    const data = await response.json().catch(() => null) as { result?: unknown; error?: { message?: string; code?: number | string } } | null;
    if (data?.error) throw new McpError(data.error.message ?? 'MCP error', data.error.code);
    if (requestId != null) {
      const pending = this.pending.get(requestId);
      if (pending) {
        clearTimeout(pending.timer);
        this.pending.delete(requestId);
        pending.resolve(data?.result);
      }
    }
  }

  /** Route parsed messages to pending requests. Returns the id that resolved, if any. */
  private dispatch(messages: unknown[]): number | null {
    for (const message of messages) {
      const msg = message as { id?: number; result?: unknown; error?: { message?: string; code?: number | string } };
      if (typeof msg?.id !== 'number') continue; // notifications (cancellation, progress…)
      const pending = this.pending.get(msg.id);
      if (!pending) continue;
      clearTimeout(pending.timer);
      this.pending.delete(msg.id);
      if (msg.error) pending.reject(new McpError(msg.error.message ?? 'MCP error', msg.error.code));
      else pending.resolve(msg.result);
      return msg.id;
    }
    return null;
  }

  /** Legacy SSE transport: GET the SSE URL, learn the POST endpoint, keep the
   *  stream open so responses arrive; requests POST to the endpoint. */
  private async openLegacySse(): Promise<void> {
    if (!this.config.url) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
    this.sseAbort = new AbortController();
    const response = await fetch(this.config.url, {
      headers: { Accept: 'text/event-stream', ...(this.config.headers ?? {}) },
      signal: this.sseAbort.signal,
    });
    if (!response.ok || !response.body) {
      throw new McpError(`MCP SSE connect failed (${response.status}) for "${this.config.name}"`);
    }
    const reader = response.body.getReader();
    const parser = new SseParser();
    const decoder = new TextDecoder();
    const endpointReady = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new McpError(`MCP SSE endpoint event timeout (${this.config.name})`)), CONNECT_TIMEOUT_MS);
      this.sseEndpointWaiter = { resolve: () => { clearTimeout(timer); resolve(); } };
    });
    this.sseEndpoint = null;
    void (async () => {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // endpoint event: data: /messages?sessionId=… (absolute or path)
          const endpointMatch = chunk.match(/^data:\s*(\/[^\s]+|https?:\/\/[^\s]+)\s*$/m);
          if (endpointMatch && !this.sseEndpoint) {
            const raw = endpointMatch[1];
            this.sseEndpoint = raw.startsWith('http')
              ? raw
              : new URL(raw, this.config.url as string).toString();
            this.sseEndpointWaiter?.resolve();
          }
          this.dispatch(parser.feed(chunk));
        }
      } catch { /* stream aborted or server closed — pending requests time out */ }
    })();
    await endpointReady;
  }

  /** stdio transport: spawn the server process, parse stdout lines. */
  private spawnStdio(): void {
    if (!this.config.command) {
      throw new McpError(`MCP server "${this.config.name}" has no command configured`);
    }
    // Dynamic require keeps the child_process import out of edge/browser bundles.
    const { spawn } = require('node:child_process') as typeof import('node:child_process');
    const child = spawn(this.config.command, this.config.args ?? [], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env },
    });
    this.child = child;
    child.on('error', (error) => this.failAll(new McpError(`MCP stdio spawn failed: ${error.message}`)));
    child.stdout?.on('data', (buffer: Buffer) => {
      this.stdoutBuffer += buffer.toString('utf8');
      let idx: number;
      while ((idx = this.stdoutBuffer.indexOf('\n')) >= 0) {
        const line = this.stdoutBuffer.slice(0, idx).trim();
        this.stdoutBuffer = this.stdoutBuffer.slice(idx + 1);
        if (!line) continue;
        try { this.dispatch([JSON.parse(line)]); } catch { /* non-JSON noise on stdout */ }
      }
    });
    child.on('close', () => this.failAll(new McpError(`MCP stdio server "${this.config.name}" exited`)));
  }

  private failAll(error: Error): void {
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }
}
