"use strict";
exports.id = 7006;
exports.ids = [7006];
exports.modules = {

/***/ 163433:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KQ: () => (/* binding */ buildMcpTools),
/* harmony export */   Sg: () => (/* binding */ testMcpServer),
/* harmony export */   lB: () => (/* binding */ evictMcpConnections)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(872885);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
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



const MAX_SERVERS = 5;
const MAX_TOOLS_PER_SERVER = 20;
const MAX_TOOLS_TOTAL = 40;
const DESCRIPTION_CAP = 800;
const globalForMcp = globalThis;
const connections = globalForMcp.__medqMcpConnections ?? new Map();
globalForMcp.__medqMcpConnections = connections;
function slug(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'srv';
}
async function connectionFor(config) {
    const cached = connections.get(config.id);
    if (cached && cached.key === new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config).key) {
        return cached.conn;
    }
    if (cached) {
        void cached.conn.close().catch(()=>{});
        connections.delete(config.id);
    }
    const conn = new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config);
    await conn.connect();
    connections.set(config.id, {
        conn,
        key: conn.key
    });
    return conn;
}
// ── JSON Schema → Zod (common subset; unknown shapes degrade gracefully) ────
function jsonSchemaToZod(schema, depth = 0) {
    if (depth > 6 || schema == null || typeof schema !== 'object') return zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    const s = schema;
    if (Array.isArray(s.anyOf) || Array.isArray(s.oneOf)) {
        const variants = (s.anyOf ?? s.oneOf ?? []).map((v)=>jsonSchemaToZod(v, depth + 1));
        return variants.length > 0 ? zod__WEBPACK_IMPORTED_MODULE_3__/* .union */ .KCZ(variants.slice(0, 4)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    }
    if (Array.isArray(s.enum) && s.enum.length > 0) {
        const values = s.enum.filter((v)=>typeof v === 'string');
        if (values.length > 0) return zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n(values);
        return zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    }
    const type = Array.isArray(s.type) ? s.type[0] : s.type;
    switch(type){
        case 'string':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP();
        case 'number':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig();
        case 'integer':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int();
        case 'boolean':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zMY().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zMY();
        case 'array':
            {
                const item = jsonSchemaToZod(s.items, depth + 1);
                return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .array */ .YOg(item).describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .array */ .YOg(item);
            }
        case 'object':
        default:
            {
                if (s.properties && typeof s.properties === 'object') {
                    const required = new Set(s.required ?? []);
                    const shape = {};
                    for (const [key, prop] of Object.entries(s.properties).slice(0, 40)){
                        const propSchema = jsonSchemaToZod(prop, depth + 1);
                        shape[key] = required.has(key) ? propSchema : propSchema.optional();
                    }
                    const obj = zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc(shape);
                    return s.description ? obj.describe(s.description.slice(0, 300)) : obj;
                }
                return zod__WEBPACK_IMPORTED_MODULE_3__/* .record */ .g1P(zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP(), zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn());
            }
    }
}
// ── DB sync ─────────────────────────────────────────────────────────────────
async function markServerStatus(serverId, status, lastError) {
    try {
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.update({
            where: {
                id: serverId
            },
            data: {
                status,
                lastError: lastError?.slice(0, 1000) ?? null,
                lastTestedAt: new Date()
            }
        });
    } catch  {}
}
async function syncToolRows(serverId, tools) {
    try {
        const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.findMany({
            where: {
                serverId
            },
            select: {
                name: true
            }
        });
        const present = new Set(tools.map((t)=>t.name));
        for (const row of existing){
            if (!present.has(row.name)) {
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.updateMany({
                    where: {
                        serverId,
                        name: row.name
                    },
                    data: {
                        enabled: false
                    }
                });
            }
        }
        for (const tool of tools){
            const schemaJson = (()=>{
                try {
                    return JSON.stringify(tool.inputSchema ?? {}).slice(0, 8000);
                } catch  {
                    return null;
                }
            })();
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.upsert({
                where: {
                    serverId_name: {
                        serverId,
                        name: tool.name
                    }
                },
                create: {
                    serverId,
                    name: tool.name,
                    description: (tool.description ?? '').slice(0, 2000),
                    schemaJson,
                    enabled: true
                },
                update: {
                    description: (tool.description ?? '').slice(0, 2000),
                    schemaJson,
                    enabled: true
                }
            });
        }
    } catch  {}
}
function safeParseHeaders(raw) {
    if (!raw) return {};
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const out = {};
            for (const [key, value] of Object.entries(parsed)){
                if (typeof value === 'string') out[key] = value;
            }
            return out;
        }
    } catch  {}
    return {};
}
function safeParseArgs(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter((v)=>typeof v === 'string');
    } catch  {}
    return [];
}
/**
 * Build the user's MCP tools. Never throws — a broken server degrades to a
 * skipped server + an error surfaced in the result (and on the server row).
 */ async function buildMcpTools(userId) {
    const errors = [];
    let servers = [];
    try {
        servers = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.findMany({
            where: {
                userId,
                enabled: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: MAX_SERVERS
        });
    } catch  {
        return {
            tools: [],
            summary: null,
            errors: [
                'MCP catalog unavailable'
            ]
        };
    }
    if (servers.length === 0) return {
        tools: [],
        summary: null,
        errors: []
    };
    const tools = [];
    const summaries = [];
    for (const server of servers){
        const transport = server.transport === 'sse' || server.transport === 'stdio' ? server.transport : 'http';
        const config = {
            id: server.id,
            name: server.name,
            transport,
            url: server.url,
            command: server.command,
            args: safeParseArgs(server.argsJson),
            headers: safeParseHeaders(server.headersJson)
        };
        try {
            const conn = await connectionFor(config);
            const remoteTools = (await conn.listTools()).slice(0, MAX_TOOLS_PER_SERVER);
            await syncToolRows(server.id, remoteTools);
            await markServerStatus(server.id, 'ok');
            const serverSlug = slug(server.name);
            const names = [];
            for (const remote of remoteTools){
                if (tools.length >= MAX_TOOLS_TOTAL) break;
                const toolName = `mcp__${serverSlug}__${slug(remote.name)}`;
                if (tools.some((t)=>t.name === toolName)) continue;
                names.push(remote.name);
                const schema = jsonSchemaToZod(remote.inputSchema);
                const description = `[MCP · ${server.name}] ${remote.description ?? `External tool "${remote.name}" from the connected MCP server "${server.name}".`}`.replace(/\s+/g, ' ').slice(0, DESCRIPTION_CAP);
                const connRef = conn;
                tools.push(new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
                    name: toolName,
                    description,
                    schema: schema instanceof zod__WEBPACK_IMPORTED_MODULE_3__/* .ZodObject */ .bvH ? schema : zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({}),
                    func: async (input)=>{
                        const args = input ?? {};
                        const result = await connRef.callTool(remote.name, args);
                        return result.slice(0, 60000);
                    }
                }));
            }
            summaries.push(`${server.name}: ${names.slice(0, 8).join(', ')}${names.length > 8 ? ` (+${names.length - 8} more)` : ''}`);
        } catch (error) {
            const message = error instanceof _client__WEBPACK_IMPORTED_MODULE_2__/* .McpError */ .N || error instanceof Error ? error.message : String(error);
            errors.push(`${server.name}: ${message}`);
            await markServerStatus(server.id, 'error', message);
            connections.delete(server.id);
        }
    }
    return {
        tools,
        summary: summaries.length > 0 ? `Connected MCP servers → ${summaries.join(' | ')}` : null,
        errors
    };
}
/** Test a server config (admin/API "Test connection") without persisting tools. */ async function testMcpServer(config) {
    const conn = new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config);
    try {
        await conn.connect();
        const tools = await conn.listTools();
        return {
            ok: true,
            toolCount: tools.length
        };
    } catch (error) {
        return {
            ok: false,
            toolCount: 0,
            error: error instanceof Error ? error.message : String(error)
        };
    } finally{
        void conn.close().catch(()=>{});
    }
}
/** Drop cached connections for servers the user removed/changed. */ async function evictMcpConnections(userId) {
    try {
        const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.findMany({
            where: {
                userId
            },
            select: {
                id: true
            }
        });
        const live = new Set(rows.map((r)=>r.id));
        for (const [id, cached] of connections){
            if (!live.has(id)) {
                void cached.conn.close().catch(()=>{});
                connections.delete(id);
            }
        }
    } catch  {}
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 791532:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ audit)
/* harmony export */ });
/* unused harmony export listAuditTrail */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentAudit');
/** Append one audit row. NEVER throws — audit must not break the caller. */ async function audit({ userId, action, target, detail }) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentAuditLog.create({
            data: {
                userId: userId ?? undefined,
                action,
                target: target?.slice(0, 200),
                detailJson: detail ? JSON.stringify(detail).slice(0, 4000) : undefined
            }
        });
    } catch (error) {
        // Append-only telemetry: swallow and log so the audited operation proceeds.
        log.warn?.(`audit write failed (${action}):`, error);
    }
}
/** Recent audit rows for a user (settings/usage UI). */ async function listAuditTrail(userId, limit = 50) {
    return db.agentAuditLog.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 872885:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ McpError),
/* harmony export */   d: () => (/* binding */ McpConnection)
/* harmony export */ });
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
 */ const PROTOCOL_VERSION = '2025-06-18';
const CLIENT_INFO = {
    name: 'medq-agent',
    version: '1.0.0'
};
const CONNECT_TIMEOUT_MS = 12000;
const LIST_TIMEOUT_MS = 20000;
const CALL_TIMEOUT_MS = 120000;
class McpError extends Error {
    constructor(message, code){
        super(message), this.code = code;
        this.name = 'McpError';
    }
}
/** Tiny SSE line parser → complete `data:` payloads (used by http + sse). */ class SseParser {
    /** Feed a text chunk; yields complete JSON-RPC message objects. */ feed(chunk) {
        this.buffer += chunk;
        const out = [];
        let idx;
        while((idx = this.buffer.indexOf('\n')) >= 0){
            const line = this.buffer.slice(0, idx).replace(/\r$/, '');
            this.buffer = this.buffer.slice(idx + 1);
            if (line === '') {
                if (this.dataLines.length > 0) {
                    const payload = this.dataLines.join('\n');
                    this.dataLines = [];
                    if (payload.trim()) {
                        try {
                            out.push(JSON.parse(payload));
                        } catch  {}
                    }
                }
                continue;
            }
            if (line.startsWith('data:')) this.dataLines.push(line.slice(5).trimStart());
        // `event:` lines are not needed — every meaningful payload is JSON-RPC in data.
        }
        return out;
    }
    constructor(){
        this.buffer = '';
        this.dataLines = [];
    }
}
class McpConnection {
    constructor(config){
        this.config = config;
        this.nextId = 1;
        this.pending = new Map();
        this.sessionId = null;
        this.sseEndpoint = null; // legacy SSE POST target
        this.child = null;
        this.sseAbort = null;
        this.closed = false;
        this.initialized = false;
        this.stdoutBuffer = '';
        this.sseEndpointWaiter = null;
    }
    /** Cache key — connections are reused while the server row is unchanged. */ get key() {
        return JSON.stringify([
            this.config.id,
            this.config.transport,
            this.config.url,
            this.config.command,
            this.config.args ?? [],
            this.config.headers ?? {}
        ]);
    }
    get serverName() {
        return this.config.name;
    }
    async connect() {
        if (this.initialized) return;
        if (this.config.transport === 'stdio') this.spawnStdio();
        if (this.config.transport === 'sse') await this.openLegacySse();
        await this.request('initialize', {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: {},
            clientInfo: CLIENT_INFO
        }, CONNECT_TIMEOUT_MS);
        this.notify('notifications/initialized');
        this.initialized = true;
    }
    async listTools() {
        const tools = [];
        let cursor;
        do {
            const result = await this.request('tools/list', cursor ? {
                cursor
            } : {}, LIST_TIMEOUT_MS);
            for (const tool of result?.tools ?? []){
                if (tool && typeof tool.name === 'string') tools.push(tool);
            }
            cursor = result?.nextCursor;
        }while (cursor);
        return tools;
    }
    async callTool(name, args, timeoutMs = CALL_TIMEOUT_MS) {
        const result = await this.request('tools/call', {
            name,
            arguments: args ?? {}
        }, timeoutMs);
        const parts = [];
        for (const block of result?.content ?? []){
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
    async close() {
        this.closed = true;
        for (const [, pending] of this.pending){
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
    async request(method, params, timeoutMs) {
        const id = this.nextId++;
        const message = JSON.stringify({
            jsonrpc: '2.0',
            id,
            method,
            params
        });
        return new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>{
                this.pending.delete(id);
                reject(new McpError(`MCP ${method} timed out after ${timeoutMs}ms (${this.config.name})`, 'TIMEOUT'));
            }, timeoutMs);
            this.pending.set(id, {
                resolve,
                reject,
                timer
            });
            this.deliver(message, id).catch((error)=>{
                const pending = this.pending.get(id);
                if (pending) {
                    clearTimeout(pending.timer);
                    this.pending.delete(id);
                    pending.reject(error instanceof Error ? error : new McpError(String(error)));
                }
            });
        });
    }
    notify(method) {
        this.deliver(JSON.stringify({
            jsonrpc: '2.0',
            method
        })).catch(()=>{});
    }
    async deliver(message, requestId) {
        if (this.closed) throw new McpError('Connection is closed');
        if (this.config.transport === 'stdio') {
            this.child?.stdin?.write(message + '\n');
            return;
        }
        const target = this.config.transport === 'sse' ? this.sseEndpoint : this.config.url;
        if (!target) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
        const headers = {
            'Content-Type': 'application/json',
            Accept: this.config.transport === 'sse' ? 'application/json' : 'application/json, text/event-stream',
            ...this.config.headers ?? {}
        };
        if (this.sessionId) headers['mcp-session-id'] = this.sessionId;
        const response = await fetch(target, {
            method: 'POST',
            headers,
            body: message
        });
        // Session negotiation (streamable http): sticky header on ANY response.
        const sid = response.headers.get('mcp-session-id');
        if (sid) this.sessionId = sid;
        if (!response.ok) {
            const body = await response.text().catch(()=>'');
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
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const messages = parser.feed(decoder.decode(value, {
                        stream: true
                    }));
                    const found = this.dispatch(messages);
                    if (found === requestId) {
                        await reader.cancel().catch(()=>{});
                        return;
                    }
                }
            } finally{
                await reader.cancel().catch(()=>{});
            }
            // Stream ended without our response — let the timeout reject it.
            return;
        }
        // Plain JSON response.
        const data = await response.json().catch(()=>null);
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
    /** Route parsed messages to pending requests. Returns the id that resolved, if any. */ dispatch(messages) {
        for (const message of messages){
            const msg = message;
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
   *  stream open so responses arrive; requests POST to the endpoint. */ async openLegacySse() {
        if (!this.config.url) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
        this.sseAbort = new AbortController();
        const response = await fetch(this.config.url, {
            headers: {
                Accept: 'text/event-stream',
                ...this.config.headers ?? {}
            },
            signal: this.sseAbort.signal
        });
        if (!response.ok || !response.body) {
            throw new McpError(`MCP SSE connect failed (${response.status}) for "${this.config.name}"`);
        }
        const reader = response.body.getReader();
        const parser = new SseParser();
        const decoder = new TextDecoder();
        const endpointReady = new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>reject(new McpError(`MCP SSE endpoint event timeout (${this.config.name})`)), CONNECT_TIMEOUT_MS);
            this.sseEndpointWaiter = {
                resolve: ()=>{
                    clearTimeout(timer);
                    resolve();
                }
            };
        });
        this.sseEndpoint = null;
        void (async ()=>{
            try {
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    // endpoint event: data: /messages?sessionId=… (absolute or path)
                    const endpointMatch = chunk.match(/^data:\s*(\/[^\s]+|https?:\/\/[^\s]+)\s*$/m);
                    if (endpointMatch && !this.sseEndpoint) {
                        const raw = endpointMatch[1];
                        this.sseEndpoint = raw.startsWith('http') ? raw : new URL(raw, this.config.url).toString();
                        this.sseEndpointWaiter?.resolve();
                    }
                    this.dispatch(parser.feed(chunk));
                }
            } catch  {}
        })();
        await endpointReady;
    }
    /** stdio transport: spawn the server process, parse stdout lines. */ spawnStdio() {
        if (!this.config.command) {
            throw new McpError(`MCP server "${this.config.name}" has no command configured`);
        }
        // Dynamic require keeps the child_process import out of edge/browser bundles.
        const { spawn } = __webpack_require__(731421);
        const child = spawn(this.config.command, this.config.args ?? [], {
            stdio: [
                'pipe',
                'pipe',
                'pipe'
            ],
            env: {
                ...process.env
            }
        });
        this.child = child;
        child.on('error', (error)=>this.failAll(new McpError(`MCP stdio spawn failed: ${error.message}`)));
        child.stdout?.on('data', (buffer)=>{
            this.stdoutBuffer += buffer.toString('utf8');
            let idx;
            while((idx = this.stdoutBuffer.indexOf('\n')) >= 0){
                const line = this.stdoutBuffer.slice(0, idx).trim();
                this.stdoutBuffer = this.stdoutBuffer.slice(idx + 1);
                if (!line) continue;
                try {
                    this.dispatch([
                        JSON.parse(line)
                    ]);
                } catch  {}
            }
        });
        child.on('close', ()=>this.failAll(new McpError(`MCP stdio server "${this.config.name}" exited`)));
    }
    failAll(error) {
        for (const [, pending] of this.pending){
            clearTimeout(pending.timer);
            pending.reject(error);
        }
        this.pending.clear();
    }
}


/***/ })

};
;