"use strict";
(() => {
var exports = {};
exports.id = 9569;
exports.ids = [9569];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 55591:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

/***/ }),

/***/ 74075:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 79748:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 101294:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J2: () => (/* binding */ appendUserMessage),
/* harmony export */   KX: () => (/* binding */ deleteThread),
/* harmony export */   Mi: () => (/* binding */ listThreads),
/* harmony export */   OH: () => (/* binding */ appendAssistantMessage),
/* harmony export */   jm: () => (/* binding */ renameThread),
/* harmony export */   t$: () => (/* binding */ getThreadMessages)
/* harmony export */ });
/* unused harmony export ensureThread */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Persistence layer for agent conversation threads.
 *
 * This service stores each user turn and assistant response in the database so
 * the UI can restore thread history, display message metadata, and keep the
 * active conversation state consistent across refreshes and reopens.
 */ 

const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentThreads');
async function listThreads(userId, limit = 50) {
    try {
        const threads = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.findMany({
            where: {
                userId
            },
            orderBy: {
                updatedAt: 'desc'
            },
            take: limit,
            include: {
                _count: {
                    select: {
                        messages: true
                    }
                }
            }
        });
        return threads.map((t)=>({
                id: t.id,
                title: t.title,
                createdAt: t.createdAt,
                updatedAt: t.updatedAt,
                messageCount: t._count.messages
            }));
    } catch (error) {
        log.warn?.('listThreads failed:', error);
        return [];
    }
}
async function getThreadMessages(threadId, userId, limit = 200) {
    try {
        const thread = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.findFirst({
            where: {
                id: threadId,
                userId
            }
        });
        if (!thread) return [];
        const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThreadMessage.findMany({
            where: {
                threadId
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: limit
        });
        return rows.map((m)=>({
                id: m.id,
                role: m.role === 'user' || m.role === 'assistant' || m.role === 'tool' ? m.role : 'assistant',
                content: m.content,
                toolCalls: m.toolCalls ? safeParse(m.toolCalls) : undefined,
                toolResults: m.toolResults ? safeParse(m.toolResults) : undefined,
                interrupted: m.metadata ? safeParse(m.metadata)?.interrupted === true : undefined,
                createdAt: m.createdAt
            }));
    } catch (error) {
        log.warn?.('getThreadMessages failed:', error);
        return [];
    }
}
async function deleteThread(threadId, userId) {
    try {
        const existing = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.findFirst({
            where: {
                id: threadId,
                userId
            }
        });
        if (!existing) return false;
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.delete({
            where: {
                id: threadId
            }
        });
        return true;
    } catch (error) {
        log.warn?.('deleteThread failed:', error);
        return false;
    }
}
/** Rename one of the caller's threads. Auto-titles stay editable forever:
 * this only overwrites `title` (updatedAt intentionally untouched so the
 * list order still reflects the last real activity). Returns the new title
 * on success, null when the thread doesn't exist / isn't owned. */ async function renameThread(threadId, userId, title) {
    const clean = title.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (!clean) return null;
    try {
        const existing = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.findFirst({
            where: {
                id: threadId,
                userId
            },
            select: {
                id: true
            }
        });
        if (!existing) return null;
        const updated = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.update({
            where: {
                id: threadId
            },
            data: {
                title: clean
            },
            select: {
                title: true
            }
        });
        return updated.title;
    } catch (error) {
        log.warn?.('renameThread failed:', error);
        return null;
    }
}
/** Upsert a thread row; returns the threadId (so callers can always set it). */ async function ensureThread(threadId, userId, title) {
    try {
        await db.agentThread.upsert({
            where: {
                id: threadId
            },
            create: {
                id: threadId,
                userId,
                title: title ?? 'New conversation'
            },
            update: {
                updatedAt: new Date(),
                ...title ? {
                    title
                } : {}
            }
        });
    } catch (error) {
        log.warn?.('ensureThread failed:', error);
    }
}
/** Append a user message + finalize the assistant turn in one transaction. */ async function appendUserMessage(threadId, userId, content) {
    try {
        const existing = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.findFirst({
            where: {
                id: threadId,
                userId
            }
        });
        if (!existing) {
            await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.create({
                data: {
                    id: threadId,
                    userId,
                    title: content.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New conversation',
                    messages: {
                        create: [
                            {
                                role: 'user',
                                content
                            }
                        ]
                    }
                }
            });
            return;
        }
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThreadMessage.create({
            data: {
                threadId,
                role: 'user',
                content
            }
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.update({
            where: {
                id: threadId
            },
            data: {
                updatedAt: new Date()
            }
        });
    } catch (error) {
        log.warn?.('appendUserMessage failed:', error);
    }
}
async function appendAssistantMessage(threadId, content, meta) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThreadMessage.create({
            data: {
                threadId,
                role: 'assistant',
                content,
                toolCalls: meta?.toolCalls ? JSON.stringify(meta.toolCalls) : null,
                toolResults: meta?.toolResults ? JSON.stringify(meta.toolResults) : null,
                metadata: meta?.interrupted ? JSON.stringify({
                    interrupted: true
                }) : null
            }
        });
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentThread.update({
            where: {
                id: threadId
            },
            data: {
                updatedAt: new Date()
            }
        });
    } catch (error) {
        log.warn?.('appendAssistantMessage failed:', error);
    }
}
function safeParse(s) {
    try {
        return JSON.parse(s);
    } catch  {
        return undefined;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 134631:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 157075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 165490:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ rateLimit)
/* harmony export */ });
/* unused harmony export rateLimitByIp */
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// rate-limit.ts — in-memory token-bucket rate limiter.
// ─────────────────────────────────────────────────────────────────────────
// Usage:
//   import { rateLimit } from '@/lib/security/rate-limit';
//   const ok = await rateLimit({ key: `login:${ip}`, max: 5, windowMs: 60_000 });
//   if (!ok) return tooManyRequests();
//
// Strategy:
//   - In-memory Map<key, {tokens, last}> survives across requests within
//     a single server instance. After a Turbopack dev reload the map is
//     wiped, which is acceptable for dev.
//   - For multi-instance production, you'd want to swap the in-memory map
//     for a Redis backend; the API stays the same.
//   - The persistent RateLimitBucket Prisma table is a fallback for
//     keys that must survive a restart (e.g. email-verification codes).
//     Not used by default — only set `persist: true` if you need that.
// ─────────────────────────────────────────────────────────────────────────

const MEMORY = new Map();
// GC: every 5 minutes, drop idle buckets older than 1 hour.
const GC_INTERVAL_MS = 5 * 60 * 1000;
const IDLE_TTL_MS = 60 * 60 * 1000;
let lastGc = Date.now();
function gc() {
    const now = Date.now();
    if (now - lastGc < GC_INTERVAL_MS) return;
    lastGc = now;
    for (const [k, v] of MEMORY){
        if (now - v.last > IDLE_TTL_MS) MEMORY.delete(k);
    }
}
/**
 * Try to consume `cost` tokens from the bucket `key`.
 * Returns ok=true if allowed, ok=false if rate-limited.
 *
 * Algorithm: token bucket with linear refill.
 *   tokens += (now - last) / windowMs * max
 *   tokens = min(tokens, max)
 *   if tokens >= cost: tokens -= cost; ok
 *   else: not ok
 */ async function rateLimit(opts) {
    gc();
    const { key, max, windowMs, cost = 1, persist = false } = opts;
    const now = Date.now();
    if (persist) {
        return rateLimitPersisted(key, max, windowMs, cost, now);
    }
    let bucket = MEMORY.get(key);
    if (!bucket) {
        bucket = {
            tokens: max,
            last: now
        };
        MEMORY.set(key, bucket);
    }
    // Refill
    const elapsed = now - bucket.last;
    const refill = elapsed / windowMs * max;
    bucket.tokens = Math.min(max, bucket.tokens + refill);
    bucket.last = now;
    if (bucket.tokens >= cost) {
        bucket.tokens -= cost;
        return {
            ok: true,
            remaining: Math.floor(bucket.tokens),
            resetAt: now + (1 - bucket.tokens / max) * windowMs
        };
    }
    return {
        ok: false,
        remaining: 0,
        resetAt: now + (cost - bucket.tokens) / max * windowMs
    };
}
async function rateLimitPersisted(key, max, windowMs, cost, now) {
    // Upsert the bucket, then do the same token-bucket math in JS.
    // We use a transaction to keep it consistent.
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.rateLimitBucket.findUnique({
        where: {
            bucketKey: key
        }
    });
    let tokens;
    let last;
    if (existing) {
        const elapsed = now - existing.lastRefill.getTime();
        const refill = elapsed / windowMs * max;
        tokens = Math.min(max, existing.tokens + refill);
        last = now;
    } else {
        tokens = max;
        last = now;
    }
    let ok = false;
    if (tokens >= cost) {
        tokens -= cost;
        ok = true;
    }
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.rateLimitBucket.upsert({
        where: {
            bucketKey: key
        },
        create: {
            bucketKey: key,
            tokens,
            lastRefill: new Date(last)
        },
        update: {
            tokens,
            lastRefill: new Date(last)
        }
    });
    return {
        ok,
        remaining: Math.floor(tokens),
        resetAt: now + (1 - tokens / max) * windowMs
    };
}
/**
 * Convenience: a strict per-IP limiter for sensitive endpoints
 * (login, register, password-reset). 10 per minute by default.
 */ async function rateLimitByIp(ip, action, max = 10, windowMs = 60000) {
    return rateLimit({
        key: `rl:${action}:${ip}`,
        max,
        windowMs
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 173566:
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 200261:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 257975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 300643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 344708:
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ 351445:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var _lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142564);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(876266);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
/* harmony import */ var _lib_security_rate_limit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(165490);
/* harmony import */ var _lib_agent_threads_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(101294);
/* harmony import */ var _lib_agent_attachment_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(544852);
/* harmony import */ var _lib_agent_runs_registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(385155);
/* harmony import */ var _lib_agent_anti_fabrication__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(841892);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_0__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_security_rate_limit__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_threads_service__WEBPACK_IMPORTED_MODULE_4__, _lib_agent_anti_fabrication__WEBPACK_IMPORTED_MODULE_7__]);
([_lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_0__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_security_rate_limit__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_threads_service__WEBPACK_IMPORTED_MODULE_4__, _lib_agent_anti_fabrication__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Streaming chat endpoint for the MedQ deep-agent experience.
 *
 * This file is the HTTP boundary between the client and the deep agent runtime.
 * It performs request validation, identifies the caller, checks throttling,
 * preserves chat history, and then forwards the model stream as SSE events so the
 * browser can render a live conversation experience.
 *
 * High-level flow:
 * 1. Parse and validate the incoming chat payload.
 * 2. Resolve the user (signed-in user or guest fallback).
 * 3. Rate-limit the request before starting a model call.
 * 4. Clean and trim prior chat history for the model.
 * 5. Persist the user turn to the thread store.
 * 6. Start a streaming response and consume the deep-agent output.
 * 7. Convert runtime events to SSE messages for the frontend.
 * 8. Save the final assistant response and tool trace.
 */ 







const runtime = 'nodejs';
const maxDuration = 300;
/**
 * Translate raw agent/backend errors into something a medical student can
 * read and act on. The shared z.ai LLM gateway periodically rate-limit
 * storms (surfacing as "500 ... status 429 ... Too many requests") — the
 * raw string is alarming and technical, so it gets a friendly explanation
 * plus a concrete next step. Everything else passes through unchanged so
 * real bugs stay diagnosable.
 */ function friendlyAgentError(raw) {
    if (/\b429\b|too many requests|rate.?limit/i.test(raw)) {
        return 'The AI service is very busy right now (provider rate limit) and could not answer this message. Nothing was lost — please try again in a few minutes.';
    }
    if (/timeout|timed out|ETIMEDOUT|ECONNRESET|fetch failed|network/i.test(raw)) {
        return 'The AI service took too long to respond and the connection was dropped. Please try again — shorter messages usually get through faster.';
    }
    return raw;
}
/**
 * Encodes an application event into the format expected by the browser's SSE listener.
 *
 * The frontend waits for lines such as:
 *   event: text.delta
 *   data: {"text":"hello"}
 *
 * We centralize the serialization here so all server events follow the same wire format.
 */ function event(type, data) {
    return `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
}
/**
 * Converts the raw todo list from the runtime into the structure the UI expects.
 *
 * Different models can emit different todo shapes. This normalizes them so the
 * client can render a consistent plan with ids, descriptions, and optional tool hints.
 * write_todos (todoListMiddleware) steps carry an explicit status —
 * pending/in_progress/completed — passed through for per-step rendering.
 */ function planFromTodos(todos) {
    const steps = Array.isArray(todos) ? todos.map((todo, index)=>{
        const item = todo && typeof todo === 'object' ? todo : {};
        const rawStatus = item.status;
        return {
            id: String(item.id ?? item.content ?? `step-${index + 1}`),
            description: String(item.content ?? item.description ?? item.title ?? `Step ${index + 1}`),
            toolHint: typeof item.tool === 'string' ? item.tool : undefined,
            status: rawStatus === 'pending' || rawStatus === 'in_progress' || rawStatus === 'completed' ? rawStatus : undefined
        };
    }) : [];
    return {
        reasoning: 'Hermes agent execution plan',
        needsTools: steps.length > 0,
        steps
    };
}
/** Best-effort parse of tool args arriving as a JSON string into the
 * object the UI's arg summarizer expects (string args render as {}). */ function safeParseArgs(args) {
    if (typeof args !== 'string' || !args.trim()) return args ?? {};
    try {
        return JSON.parse(args);
    } catch  {
        return args;
    }
}
/**
 * Handles a single chat submission from the browser.
 *
 * The route is responsible for four main concerns:
 * 1. validating the incoming payload and required message text,
 * 2. securing the request with user and rate-limit checks,
 * 3. sending the sanitized context to the deep agent runtime,
 * 4. streaming back incremental state while saving the final conversation.
 */ async function POST(request) {
    // Step 1: create a request-scoped correlation id so logs and the client can be
    // matched to the same request, even if the runtime emits many events.
    const requestId = crypto.randomUUID();
    // Step 2: parse the JSON payload defensively. If the client sends malformed JSON,
    // we still continue with an empty object instead of crashing the request.
    const body = await request.json().catch(()=>({}));
    // Step 3: require a non-empty user message before we do anything expensive.
    const message = typeof body.message === 'string' ? body.message : '';
    if (!message.trim()) {
        return new Response(event('error', {
            message: 'Message is required',
            requestId
        }), {
            status: 400,
            headers: {
                'Content-Type': 'text/event-stream',
                'x-request-id': requestId
            }
        });
    }
    // Step 4: resolve the caller identity. This allows signed-in users and guest users
    // to share a consistent conversation model without duplicating route logic.
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .resolveUserId */ .n$)().catch(()=>null);
    // Step 5: create a per-user or per-IP key for the rate limiter. The goal is to stop
    // spam before the model call and tool execution begin.
    const rlKey = `agent:chat:${userId ?? request.headers.get('x-forwarded-for') ?? 'unknown'}`;
    const rl = await (0,_lib_security_rate_limit__WEBPACK_IMPORTED_MODULE_3__/* .rateLimit */ .i)({
        key: rlKey,
        max: 30,
        windowMs: 60000
    });
    if (!rl.ok) {
        return new Response(event('error', {
            message: 'Rate limit reached (30 messages/minute). Please wait a moment.',
            requestId
        }), {
            status: 429,
            headers: {
                'Content-Type': 'text/event-stream',
                'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
                'x-request-id': requestId
            }
        });
    }
    // Step 6: normalize model selection from the client. The UI may send a value like
    // "providerId:modelId", "auto", or nothing at all. Undefined means "use the runtime default".
    // "auto" is normalized to undefined here as well — the runtime treats both the
    // same way (env chain → managed Z.AI), and resolveModel must never see "auto"
    // (parseModelString maps it to a keyless zai:auto pick).
    const rawModel = typeof body.model === 'string' ? body.model.trim() : '';
    const modelString = rawModel && rawModel !== 'auto' ? rawModel : undefined;
    // Step 7: sanitize and trim the recent conversation history. We only keep user and
    // assistant entries, and we cap the total to the most recent 12 turns.
    const history = Array.isArray(body.history) ? body.history.filter((entry)=>{
        if (!entry || typeof entry !== 'object') return false;
        const item = entry;
        return (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string';
    }).slice(-12) : [];
    // Step 8: ensure we always have a thread id. This is used both for persistence and
    // for continuity inside the deep-agent runtime.
    const threadId = typeof body.threadId === 'string' && body.threadId.trim() ? body.threadId.trim() : crypto.randomUUID();
    // Step 9: compose a single text blob from tabs, UI state, and uploaded file data so the
    // model understands the current app context and the user request together.
    // Attachments that were auto-ingested into the knowledge library are
    // described as retrievable sources (search_knowledge_base) instead of being
    // dumped as raw JSON — the full content never needs to fit in the prompt.
    // Binary attachments (images/audio) carry a dataUrl: instead of bloating
    // the prompt with megabytes of base64, each is registered server-side and
    // the model gets a short attachment://<id> reference it can pass to the
    // vision / transcription tools.
    const attachments = Array.isArray(body.fileAttachments) ? body.fileAttachments : [];
    const attachmentRefs = [];
    const attachmentContext = attachments.length > 0 ? (()=>{
        const ingested = attachments.filter((a)=>a && typeof a === 'object' && a.knowledge);
        const plain = attachments.filter((a)=>a && typeof a === 'object' && !a.knowledge);
        const parts = [];
        if (ingested.length > 0) {
            const lines = ingested.map((a)=>{
                const k = a.knowledge;
                return `- "${String(a.name ?? k?.title ?? 'document')}" (${k?.chunks ?? '?'} chunks ingested)`;
            });
            parts.push(`The user attached documents that have been INGESTED into their knowledge library:\n${lines.join('\n')}\nUse search_knowledge_base to retrieve their content when answering or generating questions from them, and tell the user these files are now part of their knowledge library.`);
        }
        if (plain.length > 0) {
            // Register binary payloads (dataUrl) and replace them with short refs.
            const described = plain.map((a)=>{
                const name = String(a.name ?? 'file');
                const dataUrl = a.dataUrl;
                if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
                    const id = typeof a.id === 'string' ? a.id : `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                    const ref = (0,_lib_agent_attachment_registry__WEBPACK_IMPORTED_MODULE_5__/* .registerAttachment */ .BA)(id, dataUrl, name);
                    if (ref) {
                        const kind = /^data:image\//.test(dataUrl) ? 'image' : /^data:audio\//.test(dataUrl) ? 'audio' : /^data:video\//.test(dataUrl) ? 'video' : 'file';
                        if (kind !== 'file') attachmentRefs.push(`- "${name}" (${kind}): ${ref}`);
                        return {
                            id: a.id,
                            name,
                            type: a.type,
                            size: a.size,
                            binaryRef: ref,
                            binaryKind: kind,
                            extractedText: a.extractedText,
                            analysis: a.analysis
                        };
                    }
                }
                return a;
            });
            parts.push(`Uploaded file context:\n${JSON.stringify(described)}`);
            if (attachmentRefs.length > 0) {
                parts.push('Binary attachments registered for this turn (pass the reference EXACTLY as shown to the matching tool):\n' + `${attachmentRefs.join('\n')}\n` + 'Use analyze_visual_material with imageUrl="<image ref>" to see/analyze an uploaded image, edit_medical_illustration with image_url="<image ref>" to edit one, and transcribe_audio with audio_url="<audio ref>" to transcribe uploaded audio. Never invent or truncate these references.');
            }
        }
        return parts.join('\n\n');
    })() : '';
    const context = [
        body.currentTab ? `Active MedQ tab: ${body.currentTab}` : '',
        body.uiContext ? `Current app context:\n${body.uiContext}` : '',
        attachmentContext
    ].filter(Boolean).join('\n\n');
    // Step 10: persist the user message early so the thread list updates immediately.
    // This is intentionally non-blocking and non-fatal; the sidebar is convenience state,
    // while the real response still flows through the agent runtime.
    if (userId) {
        void (0,_lib_agent_threads_service__WEBPACK_IMPORTED_MODULE_4__/* .appendUserMessage */ .J2)(threadId, userId, message.trim()).catch(()=>{});
    }
    // Step 11: start the SSE stream and gather the emitted runtime events.
    //
    // ── Detached-run architecture (stream-interruption fix) ──
    // The run's lifetime is decoupled from the SSE wire. `request.signal`
    // aborts the moment the browser reloads / the proxy severs the connection —
    // wiring it straight into the runtime used to kill the LLM stream mid-token,
    // persist a truncated answer, and the client would restore that partial text
    // as if it were final (the exact "streaming stops halfway" bug). Instead the
    // runtime gets a RUN-scoped controller: a disconnect merely stops SSE writes
    // (the `write` guard below), while the run keeps executing server-side and
    // persists the COMPLETE answer to the thread — the reloaded client's restore
    // monitor polls the thread and picks it up.
    //
    // The run stays cancellable through the registry: the UI Stop button posts
    // to /api/agent/chat/v2/cancel, which aborts `runAbort` here. A hard-cap
    // timer is the safety net so a detached run can never outlive its budget.
    const runAbort = new AbortController();
    const RUN_HARD_CAP_MS = 360000; // 6 min — maxDuration (300s) + margin
    const runCapTimer = setTimeout(()=>{
        if (!runAbort.signal.aborted) {
            _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.warn({
                requestId,
                threadId,
                userId
            }, 'Run hard-cap reached — aborting detached run');
            runAbort.abort();
        }
    }, RUN_HARD_CAP_MS);
    // The run's replayable event buffer — every write() below appends here
    // so a dropped wire or a page reload can re-attach via
    // GET /v2/events?requestId=&from= and resume the LIVE stream (see
    // runs/registry.ts). Unregistering the run closes the buffer and keeps
    // it replayable for the TTL window.
    const runEvents = new _lib_agent_runs_registry__WEBPACK_IMPORTED_MODULE_6__/* .RunEventBuffer */ .mU();
    (0,_lib_agent_runs_registry__WEBPACK_IMPORTED_MODULE_6__/* .registerActiveRun */ .zC)({
        requestId,
        // Guests resolve to a stable fallback id, so this is virtually always
        // set; an (impossible-in-practice) null user simply yields an
        // uncancellable-but-hard-capped detached run.
        ...userId ? {
            userId
        } : {},
        threadId,
        abort: runAbort,
        startedAt: Date.now(),
        events: runEvents
    });
    request.signal.addEventListener('abort', ()=>{
        // Client wire is gone. Deliberately DO NOT abort the run — detach instead.
        // The SSE write guards no-op from here on; persistence still happens.
        _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.info({
            requestId,
            threadId,
            userId
        }, 'Client disconnected mid-run — run continues detached server-side');
    }, {
        once: true
    });
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start (controller) {
            // This helper writes one SSE frame at a time. It intentionally ignores writes after
            // the client disconnects to avoid queueing data into a dead stream. The frame is
            // ALWAYS appended to the run event buffer first — even after the wire is gone —
            // so a re-attaching client (mid-stream drop or page reload) can replay it.
            const write = (type, data)=>{
                runEvents.append(type, data);
                if (request.signal.aborted) return;
                try {
                    controller.enqueue(encoder.encode(event(type, data)));
                } catch  {
                // The client may cancel the stream before the abort signal is propagated.
                }
            };
            // Attach the request-scoped context used for tracing logs and the final persistence step.
            const ctx = {
                threadId,
                requestId
            };
            const toolCalls = [];
            const toolResults = [];
            // Open tool-call correlation: the runtime's tool_start/tool_end now carry
            // matching ids (tool_call id ↔ tool_call_id). tool.result frames pair
            // with the exact open tool.call by id; the FIFO queue is only a fallback
            // for providers that omit ids — a call must NEVER be conflated with a
            // result just because it happened to be next in line.
            const openToolCallIds = [];
            const openToolCallSet = new Set();
            const pairToolResultId = (serverId)=>{
                if (typeof serverId === 'string' && openToolCallSet.has(serverId)) {
                    openToolCallSet.delete(serverId);
                    const idx = openToolCallIds.indexOf(serverId);
                    if (idx >= 0) openToolCallIds.splice(idx, 1);
                    return serverId;
                }
                return openToolCallIds.shift();
            };
            // Inner question-generation agent bookkeeping: inner tool_start events
            // now carry their own correlation ids (tool_call ids for the
            // orchestrator's calls; generated callIds for instrumented subagent
            // tools) — pair results by id, FIFO only as a fallback.
            let genToolSeq = 0;
            const openGenToolIds = [];
            const openGenToolSet = new Set();
            const pairGenToolResultId = (serverId)=>{
                if (typeof serverId === 'string' && openGenToolSet.has(serverId)) {
                    openGenToolSet.delete(serverId);
                    const idx = openGenToolIds.indexOf(serverId);
                    if (idx >= 0) openGenToolIds.splice(idx, 1);
                    return serverId;
                }
                genToolSeq += 1;
                return openGenToolIds.shift() ?? `gen-tool-${genToolSeq}`;
            };
            let finalText = '';
            let toolIndex = 0;
            // Whether a terminal event (done | error) reached the wire this run.
            // If the runtime generator ends silently — a provider stream that
            // closes without a final message, a merged-iterator early return — the
            // client's consumeSSEStream would just see EOF and the turn would hang
            // as "working…" forever with its partial text dropped. The post-loop
            // guard below synthesizes the terminal event so EVERY run ends with an
            // explicit done or error.
            let wroteTerminal = false;
            // ── SSE heartbeat ──
            // The fronting ALB / preview gateway drops idle connections (~20-60s
            // depending on the hop) and Next's response compression BUFFERS small
            // writes (a ~40-byte ping sits in the zlib buffer for tens of seconds
            // — observed as the client's stale-wire reconnect banner during long
            // tool calls). Two counters, applied together:
            //   • 5s cadence (was 10s) — comfortably under every idle-reaper;
            //   • ~2KB padded frames — each ping FLUSHES the compression buffer
            //     on its own instead of accumulating ~25s worth of tiny frames.
            // A REAL SSE data event (not a comment frame) always counts as
            // traffic for proxies; the client's event switch ignores `ping`.
            const PING_PAD = '.'.repeat(2048);
            const heartbeat = setInterval(()=>{
                if (request.signal.aborted) return;
                try {
                    controller.enqueue(encoder.encode(`event: ping\ndata: {"ts":${Date.now()},"pad":"${PING_PAD}"}\n\n`));
                } catch  {
                // The client may cancel the stream before the abort signal is propagated.
                }
            }, 5000);
            try {
                // The deep-agent runtime emits a sequence of structured events. We consume them
                // and decide which ones should be forwarded to the client as SSE updates.
                for await (const data of (0,_lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_0__/* .streamMedQDeepAgent */ .HK)(message.trim(), context, {
                    modelString,
                    userId,
                    threadId,
                    history,
                    signal: runAbort.signal
                })){
                    // Capture incremental text and tool-call metadata for thread
                    // persistence. Tool RESULTS are persisted in the switch below,
                    // where they pair with their call by correlation id.
                    if (data.type === 'token' && typeof data.text === 'string') {
                        finalText += data.text;
                    } else if (data.type === 'tool_start' && typeof data.tool === 'string') {
                        toolCalls.push({
                            id: typeof data.id === 'string' ? data.id : undefined,
                            name: data.tool,
                            args: data.args
                        });
                    }
                    // Log every runtime event with request correlation metadata for debugging and
                    // observability. This helps match a frontend event with the backend model stream.
                    _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.info({
                        requestId: ctx.requestId,
                        threadId,
                        userId,
                        type: data.type,
                        data
                    }, 'Deep agent event');
                    switch(data.type){
                        case 'status':
                            write('meta', {
                                requestId: ctx.requestId,
                                threadId,
                                model: data.model
                            });
                            break;
                        case 'token':
                            write('text.delta', {
                                text: data.text
                            });
                            break;
                        case 'plan':
                            write('plan.start', {});
                            write('plan.end', {
                                plan: planFromTodos(data.todos)
                            });
                            break;
                        case 'tool_start':
                            {
                                toolIndex += 1;
                                const callId = typeof data.id === 'string' && data.id ? data.id : `deep-agent-tool-${toolIndex}`;
                                openToolCallIds.push(callId);
                                openToolCallSet.add(callId);
                                write('tool.call', {
                                    toolName: data.tool,
                                    args: safeParseArgs(data.args),
                                    id: callId
                                });
                                break;
                            }
                        case 'tool_end':
                            {
                                const resultId = pairToolResultId(data.id) ?? `deep-agent-tool-${toolIndex}`;
                                toolResults.push({
                                    toolCallId: resultId,
                                    toolName: data.tool,
                                    content: (typeof data.result === 'string' ? data.result : data.excerpt ?? '').slice(0, 8000),
                                    isError: data.status === 'error'
                                });
                                write('tool.result', {
                                    toolName: data.tool,
                                    result: data.result ?? data.excerpt ?? '',
                                    excerpt: data.excerpt ?? '',
                                    status: data.status,
                                    id: resultId,
                                    // [K#] knowledge citations for hover-cards (search_knowledge only)
                                    citations: data.citations,
                                    // [S#] web citations for clickable source cards
                                    // (search_medical_references only)
                                    webCitations: data.webCitations
                                });
                                break;
                            }
                        case 'subagent':
                            write('subagent', {
                                name: data.name,
                                event: data.event
                            });
                            break;
                        case 'subagent_delta':
                            // Live narration from inside a `task` subagent (docs' specialist
                            // streaming cards). Replays identically on re-attach.
                            write('subagent.delta', {
                                name: data.name,
                                text: data.text
                            });
                            break;
                        case 'generation_event':
                            {
                                // Live activity from the COMPLETE question-generation agent the
                                // chat agent launched through run_question_generation_agent.
                                // Mapped onto chat SSE events so the floating assistant panel
                                // shows the sub-agent working in real time.
                                const inner = data.event;
                                switch(inner.type){
                                    case 'plan':
                                        // Surface the generation agent's own todo plan in the PlanCard.
                                        write('plan.start', {});
                                        write('plan.end', {
                                            plan: planFromTodos(inner.todos)
                                        });
                                        break;
                                    case 'tool_start':
                                        {
                                            genToolSeq += 1;
                                            const genId = typeof inner.id === 'string' && inner.id ? inner.id : `gen-tool-${genToolSeq}`;
                                            openGenToolIds.push(genId);
                                            openGenToolSet.add(genId);
                                            toolCalls.push({
                                                id: genId,
                                                name: inner.tool,
                                                args: inner.args
                                            });
                                            // The CALL side: real parsed args (previously hardcoded {}
                                            // here, which surfaced as the empty "Request {}" cards).
                                            write('generation.tool.call', {
                                                toolName: inner.tool,
                                                args: safeParseArgs(inner.args),
                                                id: genId
                                            });
                                            break;
                                        }
                                    case 'tool_end':
                                        {
                                            const genId = pairGenToolResultId(inner.id);
                                            toolResults.push({
                                                toolCallId: genId,
                                                toolName: inner.tool,
                                                content: (inner.excerpt ?? '').slice(0, 8000),
                                                isError: !inner.ok
                                            });
                                            // The RESULT side: a real excerpt of what the tool returned
                                            // (previously the literal string 'completed').
                                            write('generation.tool.result', {
                                                toolName: inner.tool,
                                                result: inner.excerpt ?? (inner.ok ? 'completed' : 'failed'),
                                                excerpt: inner.excerpt ?? '',
                                                status: inner.ok ? 'ok' : 'error',
                                                durationMs: inner.durationMs,
                                                id: genId
                                            });
                                            break;
                                        }
                                    case 'subagent':
                                        write('subagent', {
                                            name: inner.name,
                                            event: inner.event
                                        });
                                        break;
                                    case 'saved':
                                        write('generation.saved', {
                                            question: inner.question,
                                            index: inner.index
                                        });
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            }
                        case 'memory':
                            write('memory', {
                                summaryTurnCount: data.summaryTurnCount,
                                episodes: data.episodes.map((entry)=>({
                                        score: 0.8,
                                        userMessage: `${entry.scope}: ${entry.content}`,
                                        createdAt: new Date().toISOString()
                                    }))
                            });
                            break;
                        case 'approval_required':
                            write('approval_required', {
                                ...data.approval
                            });
                            break;
                        case 'clarification_required':
                            // ask_user's interactive form card — the client renders the
                            // fields; answers return as the next user message.
                            write('clarification_required', {
                                ...data.clarification
                            });
                            break;
                        case 'ui_actions':
                            // ui_action tool dispatches — mapped onto the client's existing
                            // `actions` event (AgentAction shape: the full payload rides in
                            // uiAction; the client executes them LIVE and deduplicates the
                            // turn-end replay via finalizeTurn).
                            write('actions', {
                                actions: (Array.isArray(data.actions) ? data.actions : []).map((raw)=>({
                                        type: String(raw.type ?? 'unknown'),
                                        params: raw,
                                        description: `UI action: ${String(raw.type ?? 'unknown')}`,
                                        uiAction: raw
                                    }))
                            });
                            break;
                        case 'model_fallback':
                            write('model.fallback', {
                                from: data.from,
                                to: data.to,
                                reason: data.reason,
                                threadId: ctx.threadId
                            });
                            break;
                        case 'paused':
                            write('paused', {
                                reason: data.reason,
                                threadId: ctx.threadId
                            });
                            break;
                        case 'done':
                            {
                                finalText = data.text || finalText;
                                // ── Anti-fabrication guard ──
                                // The fast model occasionally pattern-matches earlier
                                // successful turns and writes a "✅ Created Successfully!"
                                // report with a fabricated image/artifact link WITHOUT any
                                // tool call (observed live twice in the "Medical Image
                                // Creation Skill" chat). Cross-check every deliverable
                                // reference against reality (disk + artifact store + this
                                // turn's tool results) and strip the fabricated ones before
                                // the answer reaches the client or the thread store.
                                const fabrication = await (0,_lib_agent_anti_fabrication__WEBPACK_IMPORTED_MODULE_7__/* .stripFabricatedDeliverableClaims */ .u)(finalText, toolResults, userId);
                                if (fabrication.removed.length > 0) {
                                    _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.warn({
                                        requestId: ctx.requestId,
                                        threadId,
                                        userId,
                                        removed: fabrication.removed
                                    }, 'Anti-fabrication guard: removed unverified deliverable claims from the final answer');
                                    finalText = fabrication.text;
                                }
                                wroteTerminal = true;
                                write('done', {
                                    text: finalText,
                                    llmCallCount: typeof data.llmCalls === 'number' && data.llmCalls > 0 ? data.llmCalls : 1
                                });
                                break;
                            }
                        case 'error':
                            wroteTerminal = true;
                            write('error', {
                                message: friendlyAgentError(String(data.error))
                            });
                            break;
                    }
                }
                // ── Terminal-event guarantee ──
                // The runtime ended without done/error (silent generator end). Give
                // the client an honest terminal frame: whatever text/tools were
                // produced is the answer (the finally block below persists it); an
                // entirely empty run is an error, not a silent success.
                if (!wroteTerminal && !request.signal.aborted) {
                    if (finalText.trim() !== '' || toolResults.length > 0) {
                        _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.warn({
                            requestId: ctx.requestId,
                            threadId,
                            userId
                        }, 'Deep agent stream ended without a terminal event — synthesizing done');
                        // Same anti-fabrication guard on the synthesized path.
                        const fabrication = await (0,_lib_agent_anti_fabrication__WEBPACK_IMPORTED_MODULE_7__/* .stripFabricatedDeliverableClaims */ .u)(finalText, toolResults, userId);
                        if (fabrication.removed.length > 0) {
                            _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.warn({
                                requestId: ctx.requestId,
                                threadId,
                                userId,
                                removed: fabrication.removed
                            }, 'Anti-fabrication guard: removed unverified deliverable claims from the synthesized done');
                            finalText = fabrication.text;
                        }
                        write('done', {
                            text: finalText || '(the run produced tool results but no final text)',
                            llmCallCount: 1
                        });
                    } else {
                        _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.warn({
                            requestId: ctx.requestId,
                            threadId,
                            userId
                        }, 'Deep agent stream ended empty without a terminal event — synthesizing error');
                        write('error', {
                            message: 'The response ended unexpectedly early. Please try again — the message was not lost.',
                            requestId: ctx.requestId
                        });
                    }
                }
            } catch (error) {
                // If the runtime fails midway, we still send a final error event so the client
                // can surface the failure instead of sitting on a dead stream.
                _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .vF.error({
                    requestId: ctx.requestId,
                    threadId,
                    userId,
                    error
                }, 'Deep agent request failed');
                write('error', {
                    message: friendlyAgentError(error instanceof Error ? error.message : String(error)),
                    requestId: ctx.requestId
                });
            } finally{
                clearInterval(heartbeat);
                clearTimeout(runCapTimer);
                (0,_lib_agent_runs_registry__WEBPACK_IMPORTED_MODULE_6__/* .unregisterActiveRun */ .g)(requestId);
                // Save the final assistant response whenever the run produced content —
                // INCLUDING when the client's connection dropped mid-stream (proxy idle
                // timeout, mobile network switch, laptop sleep, page reload). With the
                // detached-run architecture the deep-agent run keeps executing
                // server-side and finishes normally, so the persisted row is the
                // COMPLETE answer; the reloaded client polls the thread and recovers it
                // (see useAgentV2Stream recovery + the V3 restore monitor).
                // The only skips: the approval-paused turn (the follow-up resume call
                // appends the final message) and a genuinely empty run.
                //
                // A run that was ABORTED mid-generation (explicit Stop via the cancel
                // endpoint, or the hard-cap safety net) may still have partial text —
                // persist it, but flagged `interrupted` so the restore path tells the
                // user the answer is incomplete instead of passing it off as final.
                const paused = finalText === '' && toolCalls.length === 0 && toolResults.length === 0;
                const produced = finalText !== '' || toolCalls.length > 0 || toolResults.length > 0;
                const interrupted = runAbort.signal.aborted && finalText !== '';
                // ask_user turns legitimately end with no narration (the runtime
                // hard-stops the model at the form). The persisted message still
                // needs non-empty content — the thread-switch/refresh restore drops
                // empty rows, and it is the row that re-derives the unanswered form
                // from its tool call args.
                const askedClarification = toolCalls.some((c)=>(c.name ?? '') === 'ask_user');
                if (userId && !paused && produced) {
                    void (0,_lib_agent_threads_service__WEBPACK_IMPORTED_MODULE_4__/* .appendAssistantMessage */ .OH)(threadId, finalText || (askedClarification ? '(question form shown — answer it to continue)' : '(tool run interrupted — no text was produced)'), {
                        ...toolCalls.length || toolResults.length ? {
                            toolCalls,
                            toolResults
                        } : {},
                        interrupted
                    }).catch(()=>{});
                }
                if (!request.signal.aborted) {
                    try {
                        controller.close();
                    } catch  {
                    // Closing an already-canceled response stream is harmless and should not throw.
                    }
                }
            }
        }
    });
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            // Bypass Next's response compression: its zlib layer buffers small
            // SSE writes, delaying pings/token deltas by tens of seconds — the
            // direct cause of the client's stale-wire reconnects on long turns.
            // 'identity' makes the compression layer skip this response entirely.
            'Content-Encoding': 'identity',
            'x-request-id': requestId,
            'x-thread-id': threadId
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 368875:
/***/ ((module) => {

module.exports = import("langchain");;

/***/ }),

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 379551:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 385155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ unregisterActiveRun),
/* harmony export */   iT: () => (/* binding */ getRunEventBuffer),
/* harmony export */   mU: () => (/* binding */ RunEventBuffer),
/* harmony export */   oO: () => (/* binding */ cancelActiveRun),
/* harmony export */   zC: () => (/* binding */ registerActiveRun)
/* harmony export */ });
/* unused harmony export getActiveRun */
/**
 * In-process registry of ACTIVE deep-agent runs (chat v2 streaming turns).
 *
 * WHY THIS EXISTS
 * ───────────────
 * A run's lifetime must be decoupled from the SSE connection that started
 * it. When the browser reloads mid-stream (or a proxy severs the wire) the
 * HTTP request aborts — but the run should KEEP EXECUTING server-side so
 * the finished answer lands in the thread store, where the client's
 * restore monitor picks it up. That is "detached continuation".
 *
 * The registry provides the OTHER half of that contract: an explicit,
 * authenticated kill switch. The UI's Stop button aborts the local fetch
 * AND posts to /api/agent/chat/v2/cancel, which looks the run up here and
 * aborts it. Without this, detached runs would be uncancellable.
 *
 * RUN EVENT BUFFER (refresh persistence + stream-interruption recovery)
 * ─────────────────────────────────────────────────────────────────────
 * Every SSE frame the chat route emits is ALSO appended to the run's
 * in-process ring buffer (GET /api/agent/chat/v2/events?requestId=&from=).
 * A client that drops mid-stream — or a browser that reloads mid-run —
 * re-attaches with `from` = the number of events it already processed and
 * receives (1) a replay of everything it missed, then (2) the live tail
 * until the run finishes. That upgrades "poll the thread blindly for the
 * finished answer" to a true stream resume: tool chips, plan, approvals
 * and streaming text all continue exactly where the wire died.
 *
 * Buffers survive their run for a short TTL after completion (late
 * reconnects still get the full replay incl. the terminal done event);
 * after that the thread store is the source of truth as before.
 */ /** How many frames a run buffer keeps (long runs stay re-attachable for
 *  recent history; the thread store covers completed turns). */ const RUN_BUFFER_MAX_FRAMES = 4000;
/** How long a FINISHED run's buffer stays replayable after completion. */ const FINISHED_BUFFER_TTL_MS = 5 * 60000;
/**
 * Append-only event log with absolute sequence numbers and close semantics.
 *
 * - `append` assigns seq = previous + 1 (first frame is seq 1).
 * - `snapshot(from)` returns every frame with seq >= from that is still
 *   retained (oldest may have rolled off in very long runs).
 * - `wait()` resolves when a NEW frame lands or the buffer closes — the
 *   events endpoint uses it to stream the live tail after replay.
 * - `close()` marks the run finished; waiters wake; appends become no-ops.
 */ class RunEventBuffer {
    append(event, data) {
        if (this.closed) return;
        this.lastSeq += 1;
        this.frames.push({
            seq: this.lastSeq,
            event,
            data
        });
        if (this.frames.length > RUN_BUFFER_MAX_FRAMES) {
            this.frames.splice(0, this.frames.length - RUN_BUFFER_MAX_FRAMES);
        }
        this.wake();
    }
    close() {
        this.closed = true;
        this.wake();
    }
    isClosed() {
        return this.closed;
    }
    /** Next sequence number a fully-caught-up consumer would ask for. */ get nextSeq() {
        return this.lastSeq + 1;
    }
    /** Frames with seq >= from, plus whether older frames rolled off. */ snapshot(from) {
        const frames = from <= 1 ? this.frames : this.frames.filter((f)=>f.seq >= from);
        return {
            frames,
            truncated: frames.length > 0 ? frames[0].seq > Math.max(from, 1) : false,
            nextSeq: this.nextSeq
        };
    }
    /** Suspend until the NEXT frame is appended or the buffer closes.
   *
   *  ⚠️ NEVER resolve on "frames exist" — the buffer is append-only (frames
   *  are never removed), so a frames.length shortcut would make every wait()
   *  return instantly and hot-spin the consuming endpoint's drain loop at
   *  100% CPU for the whole life of a live run (found in E2E: the server's
   *  event loop starved the moment a client re-attached to an active run).
   *  Callers drain with snapshot(nextSeq) BEFORE waiting, so "already
   *  buffered" frames are never missed by suspending here. */ wait() {
        if (this.closed) return Promise.resolve();
        return new Promise((resolve)=>{
            this.waiters.push(resolve);
        });
    }
    wake() {
        const waiters = this.waiters;
        this.waiters = [];
        for (const resolve of waiters)resolve();
    }
    constructor(){
        this.frames = [];
        this.waiters = [];
        this.closed = false;
        this.lastSeq = 0;
    }
}
const activeRuns = new Map();
/** Finished runs whose buffers stay replayable for the TTL window. */ const finishedRuns = new Map();
function sweepFinishedRuns() {
    const now = Date.now();
    for (const [id, entry] of finishedRuns){
        if (now - entry.closedAt > FINISHED_BUFFER_TTL_MS) finishedRuns.delete(id);
    }
}
function registerActiveRun(run) {
    activeRuns.set(run.requestId, run);
}
function unregisterActiveRun(requestId) {
    const run = activeRuns.get(requestId);
    if (run) {
        run.events.close();
        finishedRuns.set(requestId, {
            buffer: run.events,
            userId: run.userId,
            threadId: run.threadId,
            closedAt: Date.now()
        });
        sweepFinishedRuns();
        activeRuns.delete(requestId);
        return;
    }
    // Never registered (or already unregistered) — nothing to preserve.
    activeRuns.delete(requestId);
}
function getActiveRun(requestId) {
    return activeRuns.get(requestId);
}
/** Look up a run's replayable event buffer (active OR recently finished).
 *  Returns null when unknown or expired — the caller answers 404 and the
 *  client falls back to thread-store polling. */ function getRunEventBuffer(requestId) {
    const active = activeRuns.get(requestId);
    if (active) {
        return {
            buffer: active.events,
            userId: active.userId,
            threadId: active.threadId,
            finished: false
        };
    }
    sweepFinishedRuns();
    const finished = finishedRuns.get(requestId);
    if (finished) {
        return {
            buffer: finished.buffer,
            userId: finished.userId,
            threadId: finished.threadId,
            finished: true
        };
    }
    return null;
}
/**
 * Abort a registered run on behalf of its owner.
 * Returns the outcome so the cancel endpoint can answer honestly:
 *  - cancelled: the run existed, belonged to the caller, and is now aborted
 *  - not_found: no such run (already finished, or never existed) — idempotent OK
 *  - forbidden: the run exists but belongs to a different user — do not leak
 */ function cancelActiveRun(requestId, userId) {
    const run = activeRuns.get(requestId);
    if (!run) return {
        cancelled: false,
        reason: 'not_found'
    };
    if (run.userId !== userId) return {
        cancelled: false,
        reason: 'forbidden'
    };
    run.abort.abort();
    return {
        cancelled: true
    };
}


/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 491645:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 530714:
/***/ ((module) => {

module.exports = require("node:vm");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 579646:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 719771:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 731421:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 781630:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 788964:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),
/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319225);
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(684006);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8317);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799373);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(434775);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(524235);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(200261);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(754365);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(590771);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(473461);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(767798);
/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(192280);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(662018);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445696);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(347929);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(986439);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(137527);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);

















// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/agent/chat/v2/route",
        pathname: "/api/agent/chat/v2",
        filename: "route",
        bundlePath: "app/api/agent/chat/v2/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/agent/chat/v2/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(351445),
    // In Turbopack dev mode, also provide a synchronous per-request getter so
    // server HMR updates are picked up without re-executing the entry chunk.
    // Using require() (synchronous) avoids adding async overhead that would be
    // incorrectly attributed to application-code time in devRequestTiming.
    ... false ? 0 : {}
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}

async function handler(req, res, ctx) {
    if (ctx.requestMeta) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.setRequestMeta)(req, ctx.requestMeta);
    }
    if (routeModule.isDev) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/api/agent/chat/v2/route";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if (false) {} else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = false;
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, deploymentId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;
    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);
    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    if (isIsr && !isDraftMode) {
        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);
        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];
        if (prerenderInfo) {
            if (prerenderInfo.fallback === false && !isPrerendered) {
                if (nextConfig.adapterPath) {
                    return await render404();
                }
                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();
            }
        }
    }
    let cacheKey = null;
    if (isIsr && !routeModule.isDev && !isDraftMode) {
        cacheKey = resolvedPathname;
        // ensure /index and / is normalized to one key
        cacheKey = cacheKey === '/index' ? '/' : cacheKey;
    }
    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isIsr;
    // This is a revalidation request if the request is for a static
    // page and it is not being resumed from a postponed render and
    // it is not a dynamic RSC request then it is a revalidation
    // request.
    const isStaticGeneration = isIsr && !supportsDynamicResponse;
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();
    const activeSpan = tracer.getActiveScopeSpan();
    const isWrappedByNextServer = Boolean(routerServerContext == null ? void 0 : routerServerContext.isWrappedByNextServer);
    const isMinimalMode = Boolean((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));
    const incrementalCache = (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache') || await routeModule.getIncrementalCache(req, nextConfig, prerenderManifest, isMinimalMode);
    incrementalCache == null ? void 0 : incrementalCache.resetRequestCache();
    globalThis.__incrementalCache = incrementalCache;
    const context = {
        params,
        previewProps: prerenderManifest.preview,
        renderOpts: {
            experimental: {
                authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                useCacheTimeout: nextConfig.experimental.useCacheTimeout
            },
            cacheComponents: Boolean(nextConfig.cacheComponents),
            validationLevel: nextConfig.experimental.instantInsights.validationLevel,
            supportsDynamicResponse,
            incrementalCache,
            hmrRefreshHash: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'hmrRefreshHash'),
            cacheLifeProfiles: nextConfig.cacheLife,
            staticPageGenerationTimeout: nextConfig.staticPageGenerationTimeout,
            waitUntil: ctx.waitUntil,
            onClose: (cb)=>{
                res.on('close', cb);
            },
            onAfterTaskError: undefined,
            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)
        },
        sharedContext: {
            buildId,
            deploymentId
        }
    };
    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);
    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);
    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));
    const responseGenerator = async ({ previousCacheEntry })=>{
        try {
            if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {
                res.statusCode = 404;
                // on-demand revalidate always sets this header
                res.setHeader('x-nextjs-cache', 'REVALIDATED');
                res.end('This page could not be found');
                return null;
            }
            const response = await routeModule.handle(nextReq, context);
            req.fetchMetrics = context.renderOpts.fetchMetrics;
            let pendingWaitUntil = context.renderOpts.pendingWaitUntil;
            // Attempt using provided waitUntil if available
            // if it's not we fallback to sendResponse's handling
            if (pendingWaitUntil) {
                if (ctx.waitUntil) {
                    ctx.waitUntil(pendingWaitUntil);
                    pendingWaitUntil = undefined;
                }
            }
            const cacheTags = context.renderOpts.collectedTags;
            // If the request is for a static response, we can cache it so long
            // as it's not edge.
            if (isIsr) {
                const blob = await response.blob();
                // Copy the headers from the response.
                const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);
                if (cacheTags) {
                    headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;
                }
                if (!headers['content-type'] && blob.type) {
                    headers['content-type'] = blob.type;
                }
                const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;
                const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? // route has a numeric `revalidate` but didn't declare an
                // explicit `expire` (e.g. via `cacheLife`). This mirrors the
                // build-time fallback in `build/index.ts` so cache entries
                // and the response Cache-Control header agree on the route's
                // effective expire. Routes that opt out of revalidation
                // (`revalidate: false`) or that are dynamic (`revalidate: 0`)
                // keep `expire: undefined`.
                revalidate !== false && revalidate > 0 ? nextConfig.expireTime : undefined : context.renderOpts.collectedExpire;
                // Create the cache entry for the response.
                const cacheEntry = {
                    value: {
                        kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,
                        status: response.status,
                        body: Buffer.from(await blob.arrayBuffer()),
                        headers
                    },
                    cacheControl: {
                        revalidate,
                        expire
                    }
                };
                return cacheEntry;
            } else {
                // send response without caching if not ISR
                await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, response, pendingWaitUntil);
                return null;
            }
        } catch (err) {
            // if this is a background revalidate we need to report
            // the request error here as it won't be bubbled
            if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: srcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            throw err;
        }
    };
    const handleResponse = async (currentSpan, parentSpan)=>{
        try {
            var _cacheEntry_value;
            const cacheEntry = await routeModule.handleResponse({
                req,
                nextConfig,
                cacheKey,
                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
                isFallback: false,
                prerenderManifest,
                isRoutePPREnabled: false,
                isOnDemandRevalidate,
                revalidateOnlyGenerated,
                responseGenerator,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            // we don't create a cacheEntry for ISR
            if (!isIsr) {
                return;
            }
            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E701",
                    enumerable: false,
                    configurable: true
                });
            }
            if (!isMinimalMode) {
                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
            }
            // Draft mode should never be cached
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);
            if (!(isMinimalMode && isIsr)) {
                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);
            }
            // If cache control is already set on the response we don't
            // override it to allow users to customize it via next.config
            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {
                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));
            }
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
            new Response(cacheEntry.value.body, {
                headers,
                status: cacheEntry.value.status || 200
            }));
            return;
        } catch (err) {
            if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: normalizedSrcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            // rethrow so that we can handle serving error page
            // If this is during static generation, throw the error again.
            if (isIsr) throw err;
            // Otherwise, send a 500 response.
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, new Response(null, {
                status: 500
            }));
            return;
        } finally{
            ;
            (()=>{
                if (!currentSpan) {
                    return;
                }
                let statusCode = res.statusCode;
                currentSpan.setAttributes({
                    'http.status_code': statusCode,
                    'next.rsc': false
                });
                if (statusCode && statusCode >= 500) {
                    // For 5xx status codes: SHOULD be set to 'Error' span status.
                    // x-ref: https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
                    currentSpan.setStatus({
                        code: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanStatusCode.ERROR
                    });
                    // For span status 'Error', SHOULD set 'error.type' attribute.
                    currentSpan.setAttribute('error.type', statusCode.toString());
                }
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route') || normalizedSrcPage;
                const name = `${method} ${route}`;
                currentSpan.setAttributes({
                    'next.route': route,
                    'http.route': route,
                    'next.span_name': name
                });
                currentSpan.updateName(name);
                // Propagate http.route to the parent span if one exists (e.g.
                // a platform-created HTTP span in adapter deployments).
                if (parentSpan && parentSpan !== currentSpan) {
                    parentSpan.setAttribute('http.route', route);
                    parentSpan.updateName(name);
                }
            })();
        }
    };
    // TODO: activeSpan code path is for when wrapped by
    // next-server can be removed when this is no longer used
    if (isWrappedByNextServer && activeSpan) {
        await handleResponse(activeSpan, undefined);
    } else {
        let parentSpan = tracer.getActiveScopeSpan();
        await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {
                spanName: `${method} ${srcPage}`,
                kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,
                attributes: {
                    'http.method': method,
                    'http.target': req.url
                }
            }, (span)=>handleResponse(span, parentSpan)), undefined, !isWrappedByNextServer);
    }
}

//# sourceMappingURL=app-route.js.map


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 841892:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ stripFabricatedDeliverableClaims)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(902328);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_2__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Anti-fabrication guard for agent final answers.
 *
 * WHY: the fast model occasionally pattern-matches an earlier successful
 * turn and produces a complete "✅ Infographic Created Successfully!" report
 * with a plausible-looking image embed — WITHOUT having called any tool this
 * turn (observed live in the "Medical Image Creation Skill" chat, twice in a
 * row: fabricated /generated/agent-*.jpg paths that never existed on disk,
 * while zero tool calls ran). A prompt-level rule ("never claim a deliverable
 * without a tool call") demonstrably does not stop it.
 *
 * This module is the deterministic backstop. At done-time it cross-checks
 * every deliverable reference in the final text:
 *
 *   1. `/generated/<file>` embeds/links — real only if the file EXISTS on
 *      disk (public/generated) or the path appears verbatim in this turn's
 *      tool results.
 *   2. `/api/medq-agent/artifacts/<id>` links — real only if the artifact
 *      row exists (getArtifact — covers legitimate cross-turn references to
 *      earlier artifacts) or the id appears in this turn's tool results.
 *
 * Fabricated references are stripped (label text kept) and a visible
 * correction note is appended, so the learner never clicks a dead link that
 * was presented as a finished deliverable. The check FAILS OPEN: any error
 * while verifying (DB hiccup, fs failure) keeps the text unchanged — a
 * verifier glitch must never eat legitimate content.
 */ 


/** `/generated/<name>` — name charset excludes slashes/backslashes, so it
 * cannot escape the public/generated directory. */ const GENERATED_REF = /\/generated\/([A-Za-z0-9][A-Za-z0-9._-]*)/g;
/** `/api/medq-agent/artifacts/<id>` — MedQ cuid ids. */ const ARTIFACT_REF = /\/api\/medq-agent\/artifacts\/([A-Za-z0-9][A-Za-z0-9-]*)/g;
const CORRECTION_NOTE = '\n\n---\n> ⚠️ **Correction:** parts of this reply claimed deliverables that were never actually created ' + '(the required tool never ran, so the links pointed at nothing). The invalid references were removed. ' + 'Send the request again if you want the real deliverable generated.';
/** Directory that serves /generated/* — <project>/public/generated. */ function generatedDir() {
    return node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'public', 'generated');
}
/** A name is rejected if it could traverse out of the directory. */ function isSafeFileName(name) {
    return name !== '.' && name !== '..' && !name.includes('..');
}
/**
 * Verify and clean the final answer text. Pure rewrite + note — never throws
 * into the caller (every verification step is individually try/caught and
 * fails open: unverifiable ⇒ kept).
 */ async function stripFabricatedDeliverableClaims(text, toolResults, userId) {
    const result = {
        text,
        removed: []
    };
    if (!text) return result;
    // NOTE: empty toolResults must NOT early-return — a no-tool turn claiming
    // tool-made deliverables is exactly the fabrication pattern this guards
    // (files/artifacts from earlier turns legitimately exist and stay).
    const toolBlob = toolResults.map((t)=>`${t.content ?? ''}`).join('\n');
    // ── /generated/<file> claims ──
    const generatedClaims = new Map();
    for (const m of text.matchAll(GENERATED_REF)){
        const name = m[1];
        if (!isSafeFileName(name) || generatedClaims.has(name)) continue;
        let real = toolBlob.includes(`/generated/${name}`);
        if (!real) {
            try {
                real = node_fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().join(generatedDir(), name));
            } catch  {
                real = true; // fail open
            }
        }
        generatedClaims.set(name, real);
    }
    // ── /api/medq-agent/artifacts/<id> claims ──
    const artifactClaims = new Map();
    for (const m of text.matchAll(ARTIFACT_REF)){
        const id = m[1];
        if (artifactClaims.has(id)) continue;
        let real = toolBlob.includes(`/api/medq-agent/artifacts/${id}`);
        if (!real) {
            try {
                real = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_2__/* .getArtifact */ .jZ)(userId, id) != null;
            } catch  {
                real = true; // fail open
            }
        }
        artifactClaims.set(id, real);
    }
    const fabricatedGenerated = [
        ...generatedClaims.entries()
    ].filter(([, real])=>!real).map(([name])=>name);
    const fabricatedArtifacts = [
        ...artifactClaims.entries()
    ].filter(([, real])=>!real).map(([id])=>id);
    if (fabricatedGenerated.length === 0 && fabricatedArtifacts.length === 0) {
        return result;
    }
    // ── Rewrite: strip fabricated embeds/links, keep the human label ──
    let rewritten = text;
    for (const name of fabricatedGenerated){
        const ref = `/generated/${name}`;
        // Image embed: ![label](ref) → label (kept) + inline marker
        rewritten = rewritten.replace(new RegExp(`!\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), '*[$1 — not actually created, link removed]*');
        // Plain link: [label](ref) → label + inline marker
        rewritten = rewritten.replace(new RegExp(`\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), '*[$1 — not actually created, link removed]*');
        // Bare reference (no markup) → marker
        rewritten = rewritten.split(ref).join('*[link removed — never actually created]*');
        result.removed.push({
            ref,
            kind: 'generated-file'
        });
    }
    for (const id of fabricatedArtifacts){
        const ref = `/api/medq-agent/artifacts/${id}`;
        rewritten = rewritten.replace(new RegExp(`\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), '*[$1 — not actually created, link removed]*');
        rewritten = rewritten.split(ref).join('*[link removed — never actually created]*');
        result.removed.push({
            ref,
            kind: 'artifact'
        });
    }
    result.text = rewritten.trimEnd() + CORRECTION_NOTE;
    return result;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 842482:
/***/ ((module) => {

module.exports = import("sharp");;

/***/ }),

/***/ 848161:
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 912412:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 912680:
/***/ ((module) => {

module.exports = import("@langchain/quickjs");;

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 930963:
/***/ ((module) => {

module.exports = import("langchain/chat_models/universal");;

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 979428:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,1890,9611,8093,8713,859,2035,4007,7909,5566,8262,2901,2538,9985,5556,1229,2504,5554,5095], () => (__webpack_exec__(788964)));
module.exports = __webpack_exports__;

})();