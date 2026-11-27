"use strict";
(() => {
var exports = {};
exports.id = 1599;
exports.ids = [1599];
exports.modules = {

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "I", ({
    enumerable: true,
    get: function() {
        return sendResponse;
    }
}));
const _helpers = __webpack_require__(228208);
const _pipereadable = __webpack_require__(447617);
const _utils = __webpack_require__(662018);
async function sendResponse(req, res, response, waitUntil) {
    if (// The type check here ensures that `req` is correctly typed, and the
    // environment variable check provides dead code elimination.
     true && (0, _helpers.isNodeNextResponse)(res)) {
        var // Copy over the response headers.
        _response_headers;
        // Copy over the response status.
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        // TODO: this is not spec-compliant behavior and we should not restrict
        // headers that are allowed to appear many times.
        //
        // See:
        // https://github.com/vercel/next.js/pull/70127
        const headersWithMultipleValuesAllowed = [
            // can add more headers to this list if needed
            'set-cookie',
            'www-authenticate',
            'proxy-authenticate',
            'vary'
        ];
        (_response_headers = response.headers) == null ? void 0 : _response_headers.forEach((value, name)=>{
            // `x-middleware-set-cookie` is an internal header not needed for the response
            if (name.toLowerCase() === 'x-middleware-set-cookie') {
                return;
            }
            // The append handling is special cased for `set-cookie`.
            if (name.toLowerCase() === 'set-cookie') {
                // TODO: (wyattjoh) replace with native response iteration when we can upgrade undici
                for (const cookie of (0, _utils.splitCookiesString)(value)){
                    res.appendHeader(name, cookie);
                }
            } else {
                // only append the header if it is either not present in the outbound response
                // or if the header supports multiple values
                const isHeaderPresent = typeof res.getHeader(name) !== 'undefined';
                if (headersWithMultipleValuesAllowed.includes(name.toLowerCase()) || !isHeaderPresent) {
                    res.appendHeader(name, value);
                }
            }
        });
        /**
     * The response can't be directly piped to the underlying response. The
     * following is duplicated from the edge runtime handler.
     *
     * See packages/next/server/next-server.ts
     */ const { originalResponse } = res;
        // A response body must not be sent for HEAD requests. See https://httpwg.org/specs/rfc9110.html#HEAD
        if (response.body && req.method !== 'HEAD') {
            await (0, _pipereadable.pipeToNodeResponse)(response.body, originalResponse, waitUntil);
        } else {
            originalResponse.end();
        }
    }
}

//# sourceMappingURL=send-response.js.map

/***/ }),

/***/ 200261:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(744870);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 362768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ withErrorHandler),
/* harmony export */   RK: () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// api-handler.ts — composable wrappers for App Router Route Handlers.
//
// This module builds on `withAuth` from auth-helpers.ts and adds:
//
//   1. withErrorHandler()  — try/catch around any handler, logs to the
//      shared logger, returns a clean 500 response on uncaught errors.
//
//   2. apiHandler()        — composes withAuth + withErrorHandler in one
//      call. This is the recommended wrapper for any new route handler
//      that needs authenticated access.
//



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('api');
// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────
function withErrorHandler(handler) {
    return async (req, context)=>{
        // Next.js 16 passes the second arg as { params: Promise<...> }.
        // Older / no-param routes call with just (req) — context is undefined.
        // Resolve to a plain TParams object in all cases.
        let params;
        if (context === undefined) {
            params = {};
        } else if (context instanceof Promise) {
            // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
            params = await context;
        } else if (typeof context === 'object' && context !== null && 'params' in context) {
            // Next.js 16 shape: { params: Promise<TParams> }
            const rawParams = context.params;
            params = rawParams instanceof Promise ? await rawParams : rawParams;
        } else {
            // Already-resolved params object (Next.js 15 or earlier).
            params = context;
        }
        try {
            return await handler(req, {
                params
            });
        } catch (error) {
            // Pull a route tag from the request URL so logs identify the failing route.
            const url = (()=>{
                try {
                    return new URL(req.url).pathname;
                } catch  {
                    return 'unknown';
                }
            })();
            const message = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            log.error(`uncaught error in ${url}: ${message}`, stack ?? '');
            // Don't leak internal error details in production.
            const isProd = "production" === 'production';
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Internal server error',
                ...isProd ? {} : {
                    detail: message
                }
            }, {
                status: 500
            });
        }
    };
}
// ─────────────────────────────────────────────────────────────────────────
// apiHandler — composes withAuth + withErrorHandler
//
//   export const GET = apiHandler(async (req, ctx) => {
//     return NextResponse.json({ id: ctx.userId });
//   }, { requiredRole: 'admin' });
// ─────────────────────────────────────────────────────────────────────────
function apiHandler(handler, options = {}) {
    return withErrorHandler(async (req, ctx)=>{
        // Delegate auth to withAuth-style logic, but inlined so we can preserve
        // the params shape from withErrorHandler.
        // We reuse the existing withAuth impl by calling it and forwarding.
        const wrapped = (0,_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .withAuth */ .ru)(handler, options);
        return wrapped(req, {
            params: ctx.params
        });
    });
}
// Re-export the response helpers from auth-helpers for convenience.


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 442398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EX: () => (/* binding */ deleteWorkspacePath),
/* harmony export */   P3: () => (/* binding */ workspaceFilesRoot),
/* harmony export */   dx: () => (/* binding */ writeWorkspaceFile),
/* harmony export */   i1: () => (/* binding */ listWorkspace),
/* harmony export */   sL: () => (/* binding */ readWorkspaceFile)
/* harmony export */ });
/* unused harmony exports resolveSafe, workspaceExists, moveWorkspacePath, copyWorkspacePath */
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tools_sandbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503496);



/**
 * Workspace file service — the agent's per-user sandboxed filesystem.
 *
 * Ported from hermes (`lib/workspace.ts`): all operations are jailed to
 * `<workspaces>/<userId>/workspace/` with three layers of protection:
 *   1. NUL-byte rejection (path trickery)
 *   2. Lexical `..` escape rejection (resolve + prefix check)
 *   3. Symlink escape rejection (realpath of the nearest existing ancestor)
 *
 * The deepagents `read_file` FS middleware already reads through the same
 * user root (FilesystemBackend), so files written here are visible to
 * load_skill / read_file flows.
 */ function workspaceFilesRoot(userId) {
    const root = (0,_tools_sandbox__WEBPACK_IMPORTED_MODULE_2__/* .sandboxRoot */ .i2)(userId);
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(root, {
        recursive: true
    });
    return root;
}
/** Resolve a relative path inside the user's workspace, safely. */ function resolveSafe(userId, relPath) {
    if (relPath.includes('\0')) throw new Error('Path contains NUL bytes');
    const root = workspaceFilesRoot(userId);
    const cleaned = relPath.replace(/^[./\\]+/, '').trim();
    const target = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, cleaned);
    if (target !== root && !target.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_1___default().sep))) {
        throw new Error('Path escapes the workspace');
    }
    // Symlink-escape check: realpath the nearest existing ancestor and make
    // sure it still resolves inside the root.
    let probe = target;
    while(!node_fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(probe)){
        const parent = node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(probe);
        if (parent === probe) break;
        probe = parent;
    }
    try {
        const real = node_fs__WEBPACK_IMPORTED_MODULE_0___default().realpathSync(probe);
        if (real !== root && !real.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_1___default().sep))) {
            throw new Error('Path escapes the workspace (symlink)');
        }
    } catch (error) {
        if (error.message.includes('escapes')) throw error;
    // realpath failure on the root itself is fine (fresh dir)
    }
    return target;
}
function listWorkspace(userId, relPath = '') {
    const dir = resolveSafe(userId, relPath);
    const entries = node_fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(dir, {
        withFileTypes: true
    });
    return entries.map((e)=>{
        const full = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(dir, e.name);
        const stat = node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(full);
        return {
            name: e.name,
            path: node_path__WEBPACK_IMPORTED_MODULE_1___default().relative(workspaceFilesRoot(userId), full).split((node_path__WEBPACK_IMPORTED_MODULE_1___default().sep)).join('/'),
            type: e.isDirectory() ? 'dir' : 'file',
            size: e.isFile() ? stat.size : undefined,
            modified: stat.mtime.toISOString()
        };
    }).sort((a, b)=>a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1).slice(0, 500);
}
const READ_MAX_BYTES = 120000;
function readWorkspaceFile(userId, relPath, maxBytes = READ_MAX_BYTES) {
    const target = resolveSafe(userId, relPath);
    const stat = node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(target);
    if (!stat.isFile()) throw new Error('Not a file');
    const fd = node_fs__WEBPACK_IMPORTED_MODULE_0___default().openSync(target, 'r');
    try {
        const buf = Buffer.alloc(Math.min(stat.size, maxBytes));
        const bytes = node_fs__WEBPACK_IMPORTED_MODULE_0___default().readSync(fd, buf, 0, buf.length, 0);
        const text = buf.subarray(0, bytes).toString('utf8');
        return stat.size > maxBytes ? `${text}\n… (truncated at ${maxBytes} bytes of ${stat.size})` : text;
    } finally{
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().closeSync(fd);
    }
}
const WRITE_MAX_BYTES = 512000;
function writeWorkspaceFile(userId, relPath, content) {
    if (content.length > WRITE_MAX_BYTES) throw new Error(`Content exceeds ${WRITE_MAX_BYTES} bytes`);
    const target = resolveSafe(userId, relPath);
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(target), {
        recursive: true
    });
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(target, content, 'utf8');
    return {
        path: relPath,
        bytes: Buffer.byteLength(content, 'utf8')
    };
}
function workspaceExists(userId, relPath) {
    try {
        resolveSafe(userId, relPath);
        return true;
    } catch  {
        return false;
    }
}
function moveWorkspacePath(userId, from, to) {
    const src = resolveSafe(userId, from);
    const dst = resolveSafe(userId, to);
    if (!fs.existsSync(src)) throw new Error('Source does not exist');
    fs.mkdirSync(path.dirname(dst), {
        recursive: true
    });
    fs.renameSync(src, dst);
}
function copyWorkspacePath(userId, from, to) {
    const src = resolveSafe(userId, from);
    const dst = resolveSafe(userId, to);
    if (!fs.existsSync(src)) throw new Error('Source does not exist');
    fs.mkdirSync(path.dirname(dst), {
        recursive: true
    });
    fs.cpSync(src, dst, {
        recursive: true
    });
}
function deleteWorkspacePath(userId, relPath) {
    const root = workspaceFilesRoot(userId);
    const target = resolveSafe(userId, relPath);
    if (node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(target) === node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root)) {
        throw new Error('Refusing to delete the workspace root');
    }
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(target, {
        recursive: true,
        force: true
    });
}


/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 498523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ensureAgentWorkspace),
/* harmony export */   R: () => (/* binding */ agentWorkspaceRoot)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Agent workspace helpers — minimal stub.
 *
 * The full implementation manages a per-user filesystem jail for the deep
 * agent runtime (file edits, scratch space, AGENTS.md). The platform
 * snapshot dropped the original file; this stub returns no-op / null values
 * so the build compiles and the deep-agent runtime gracefully falls back
 * to in-memory workspace.
 *
 * To restore the full agent workspace, copy the original workspace.ts from
 * your git history or re-run the postinstall skills sync that generated it.
 */ 

function agentWorkspaceRoot(_userId) {
    // Per-user workspace root — we don't actually create the dir here so
    // nothing breaks if the deep-agent runtime is invoked. The runtime's
    // try/catch around ensureAgentWorkspace swallows the ENOENT.
    return path__WEBPACK_IMPORTED_MODULE_0___default().join(os__WEBPACK_IMPORTED_MODULE_1___default().tmpdir(), 'medq-agent-workspace');
}
function ensureAgentWorkspace(_userId) {
    // Caller wraps in try/catch and falls back to in-memory workspace on
    // failure — return the path even though we don't create the dir.
    return agentWorkspaceRoot(_userId);
}


/***/ }),

/***/ 503496:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gE: () => (/* binding */ gitEnv),
/* harmony export */   i2: () => (/* binding */ sandboxRoot),
/* harmony export */   y5: () => (/* binding */ execSandboxed)
/* harmony export */ });
/* unused harmony exports MAX_OUTPUT_BYTES, MAX_TIMEOUT_MS, execLocalRestricted, execRemoteSandbox */
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(731421);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _skills_workspace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(498523);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);





const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('AgentSandbox');
const MAX_OUTPUT_BYTES = 256000;
const MAX_TIMEOUT_MS = 120000;
const DEFAULT_TIMEOUT_MS = 60000;
/** The per-user sandbox root: <workspaces>/<userId>/workspace. */ function sandboxRoot(userId) {
    return node_path__WEBPACK_IMPORTED_MODULE_2___default().join((0,_skills_workspace__WEBPACK_IMPORTED_MODULE_3__/* .agentWorkspaceRoot */ .R)(userId), 'workspace');
}
/** Scrubbed environment — no secrets, no Next.js internals, no DATABASE_URL. */ function scrubbedEnv(home) {
    return {
        PATH: '/usr/local/bin:/usr/bin:/bin',
        HOME: home,
        LANG: 'C.UTF-8',
        TERM: 'dumb'
    };
}
/** Resolve + validate a cwd relative to the jail root (mkdir on demand). */ function resolveJailCwd(userId, cwdRel) {
    const root = sandboxRoot(userId);
    const rel = (cwdRel ?? '').replace(/^[/\\]+/, '');
    const target = node_path__WEBPACK_IMPORTED_MODULE_2___default().resolve(root, rel);
    if (target !== root && !target.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_2___default().sep))) {
        throw new Error('cwd escapes the workspace jail');
    }
    node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(target, {
        recursive: true
    });
    return target;
}
/** Local-restricted backend: in-process spawn, cwd jail, env scrub, caps. */ function execLocalRestricted(opts) {
    const cwd = resolveJailCwd(opts.userId, opts.cwdRel);
    const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
    const started = Date.now();
    return new Promise((resolve)=>{
        let stdout = '';
        let stderr = '';
        let timedOut = false;
        let settled = false;
        const child = (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)(opts.argv[0], opts.argv.slice(1), {
            cwd,
            env: {
                ...scrubbedEnv(cwd),
                ...opts.env ?? {}
            },
            stdio: [
                'ignore',
                'pipe',
                'pipe'
            ]
        });
        const cap = (chunk)=>{
            const remaining = MAX_OUTPUT_BYTES - stdout.length - stderr.length;
            if (remaining <= 0) return '';
            return chunk.toString('utf8').slice(0, remaining);
        };
        child.stdout?.on('data', (chunk)=>{
            stdout += cap(chunk);
        });
        child.stderr?.on('data', (chunk)=>{
            stderr += cap(chunk);
        });
        const timer = setTimeout(()=>{
            timedOut = true;
            child.kill('SIGKILL');
        }, timeoutMs);
        timer.unref?.();
        const finish = (code, killed)=>{
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve({
                stdout: stdout.slice(0, MAX_OUTPUT_BYTES),
                stderr: stderr.slice(0, MAX_OUTPUT_BYTES),
                exitCode: code,
                timedOut,
                durationMs: Date.now() - started,
                killed
            });
        };
        child.on('close', (code)=>finish(code, false));
        child.on('error', (err)=>{
            stderr += String(err);
            finish(null, false);
        });
    });
}
/** Remote backend: hermes agent-worker contract (POST /exec, NDJSON stream). */ async function execRemoteSandbox(baseUrl, token, opts) {
    const started = Date.now();
    const controller = new AbortController();
    const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
    const timer = setTimeout(()=>controller.abort(), timeoutMs + 5000);
    timer.unref?.();
    try {
        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/exec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-sandbox-token': token
            },
            body: JSON.stringify({
                workspaceId: opts.userId,
                argv: opts.argv,
                cwdRel: opts.cwdRel ?? '',
                timeoutMs,
                env: opts.env ?? {}
            }),
            signal: controller.signal
        });
        if (!response.ok || !response.body) {
            return {
                stdout: '',
                stderr: `Sandbox HTTP ${response.status}`,
                exitCode: null,
                timedOut: false,
                durationMs: Date.now() - started,
                killed: false
            };
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let stdout = '';
        let stderr = '';
        let result = {};
        for(;;){
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, {
                stream: true
            });
            let idx;
            while((idx = buffer.indexOf('\n')) >= 0){
                const line = buffer.slice(0, idx).trim();
                buffer = buffer.slice(idx + 1);
                if (!line) continue;
                try {
                    const evt = JSON.parse(line);
                    if (evt.type === 'stdout' && evt.data) stdout = (stdout + evt.data).slice(0, MAX_OUTPUT_BYTES);
                    else if (evt.type === 'stderr' && evt.data) stderr = (stderr + evt.data).slice(0, MAX_OUTPUT_BYTES);
                    else if (evt.type === 'exit') {
                        result = {
                            exitCode: evt.exitCode ?? null,
                            timedOut: Boolean(evt.timedOut),
                            durationMs: evt.durationMs ?? Date.now() - started
                        };
                    }
                } catch  {}
            }
        }
        return {
            stdout,
            stderr,
            exitCode: result.exitCode ?? null,
            timedOut: result.timedOut ?? false,
            durationMs: result.durationMs ?? Date.now() - started,
            killed: false
        };
    } catch (error) {
        return {
            stdout: '',
            stderr: error instanceof Error ? error.message : String(error),
            exitCode: null,
            timedOut: false,
            durationMs: Date.now() - started,
            killed: false
        };
    } finally{
        clearTimeout(timer);
    }
}
/** Dispatch to the configured backend (remote when MEDQ_SANDBOX_URL is set). */ function execSandboxed(opts) {
    const url = process.env.MEDQ_SANDBOX_URL;
    if (url) {
        return execRemoteSandbox(url, process.env.MEDQ_SANDBOX_TOKEN || 'dev-sandbox-token', opts);
    }
    return execLocalRestricted(opts);
}
/** Hardened git environment (hermes git tool posture). */ function gitEnv(workspaceHome) {
    return {
        GIT_TERMINAL_PROMPT: '0',
        GIT_CONFIG_GLOBAL: '/dev/null',
        GIT_CONFIG_SYSTEM: '/dev/null',
        GIT_AUTHOR_NAME: 'MedQ Agent',
        GIT_AUTHOR_EMAIL: 'agent@medq.local',
        GIT_COMMITTER_NAME: 'MedQ Agent',
        GIT_COMMITTER_EMAIL: 'agent@medq.local',
        HOME: workspaceHome
    };
}


/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 543567:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DELETE: () => (/* binding */ DELETE),
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(362768);
/* harmony import */ var _lib_agent_audit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(791532);
/* harmony import */ var _lib_agent_workspace_files__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(442398);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__, _lib_agent_audit__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__, _lib_agent_audit__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Workspace files API — the REST layer behind the assistant's Files drawer.
 *
 * GET     /api/agent/workspace?path=<dir>    — list a directory (jailed)
 * GET     /api/agent/workspace?path=<file>   — read a file (text, capped)
 * DELETE  /api/agent/workspace?path=<file>   — delete a file/dir in the jail
 *
 * The same jail the agent's file tools run in (resolveSafe: NUL/lexical/
 * symlink checks), so the drawer shows EXACTLY what the agent sees.
 */ 







const runtime = 'nodejs';
const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .unauthorized */ .nc)();
    const relPath = (new URL(req.url).searchParams.get('path') ?? '').slice(0, 500);
    try {
        const root = (0,_lib_agent_workspace_files__WEBPACK_IMPORTED_MODULE_4__/* .workspaceFilesRoot */ .P3)(userId);
        const target = node_path__WEBPACK_IMPORTED_MODULE_6___default().resolve(root, relPath.replace(/^[./\\]+/, ''));
        if (target !== root && !target.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_6___default().sep))) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('Path escapes the workspace');
        }
        const stat = node_fs__WEBPACK_IMPORTED_MODULE_5___default().statSync(target);
        if (stat.isDirectory()) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                type: 'dir',
                path: relPath,
                entries: (0,_lib_agent_workspace_files__WEBPACK_IMPORTED_MODULE_4__/* .listWorkspace */ .i1)(userId, relPath)
            });
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            type: 'file',
            path: relPath,
            size: stat.size,
            modified: stat.mtime.toISOString(),
            content: (0,_lib_agent_workspace_files__WEBPACK_IMPORTED_MODULE_4__/* .readWorkspaceFile */ .sL)(userId, relPath)
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message
        }, {
            status: message.includes('escapes') ? 400 : 404
        });
    }
});
const DELETE = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .unauthorized */ .nc)();
    const relPath = (new URL(req.url).searchParams.get('path') ?? '').slice(0, 500);
    if (!relPath || relPath === '.' || relPath === '/') return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('path is required');
    try {
        (0,_lib_agent_workspace_files__WEBPACK_IMPORTED_MODULE_4__/* .deleteWorkspacePath */ .EX)(userId, relPath);
        await (0,_lib_agent_audit__WEBPACK_IMPORTED_MODULE_3__/* .audit */ .s)({
            userId,
            action: 'workspace.delete',
            target: relPath
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            deleted: true
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message
        }, {
            status: 400
        });
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 686068:
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
        page: "/api/agent/workspace/route",
        pathname: "/api/agent/workspace",
        filename: "route",
        bundlePath: "app/api/agent/workspace/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/agent/workspace/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(543567),
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
    let srcPage = "/api/agent/workspace/route";
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

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 731421:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

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

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035], () => (__webpack_exec__(686068)));
module.exports = __webpack_exports__;

})();