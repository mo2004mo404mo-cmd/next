"use strict";
exports.id = 8740;
exports.ids = [8740];
exports.modules = {

/***/ 358740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startEmbeddedFreellmapi: () => (/* binding */ startEmbeddedFreellmapi)
/* harmony export */ });
/* unused harmony exports freellmapiUpstream, embeddedFreellmapiReady */
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(173136);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/**
 * #MEDQ-embedded FreeLLM API — the AI Router as PART of the main app.
 *
 * Historically the freellmapi suite ran as a separate Express process on
 * 127.0.0.1:3002 that had to be started alongside the Next.js app
 * (scripts/start-freellmapi.sh). This module embeds it IN-PROCESS instead:
 * the Next.js server (via src/instrumentation-nodejs.ts) imports the sidecar's
 * built entry (freellmapi/server/dist/index.js), boots its Express app on an
 * EPHEMERAL loopback port (listen 0 — no fixed port, nothing enumerable from
 * outside), and publishes the assigned port on globalThis for the in-app
 * reverse proxy (src/lib/freellmapi-proxy.ts) and the auth bridge
 * (src/app/api/freellmapi-bridge) to pick up per-request.
 *
 * Result: ONE process, ONE public port (3000). /freellm, /freellmapi and /v1
 * all flow through the Next.js origin into the embedded Express app; the
 * sidecar's background services (health checker, catalog sync, cooldown
 * probes, backups) run inside the same process and live/die with it.
 *
 * Fallbacks, in resolution order (see freellmapiUpstream()):
 *   1. FREELLMAPI_UPSTREAM env — explicit operator override (e.g. debugging
 *      against a separately-run standalone sidecar); wins over embedding.
 *   2. The embedded server's ephemeral port (normal operation).
 *   3. http://127.0.0.1:3002 — the legacy standalone sidecar, kept so an
 *      operator can still run scripts/start-freellmapi.sh if they prefer.
 */ 


/** Absolute path to the sidecar's built server entry (ESM). */ const SIDECAR_ENTRY = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'freellmapi', 'server', 'dist', 'index.js');
/** Absolute path to the sidecar's .env (ENCRYPTION_KEY & friends). */ const SIDECAR_ENV = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'freellmapi', '.env');
/**
 * Upstream base URL for reaching the AI Router from inside the Next.js
 * process. Evaluated per-call (NOT at module scope) so the embedded port —
 * assigned during instrumentation, before the first request — is always seen.
 */ function freellmapiUpstream() {
    if (process.env.FREELLMAPI_UPSTREAM) return process.env.FREELLMAPI_UPSTREAM;
    const port = globalThis.__FREELLMAPI_EMBEDDED_PORT__;
    if (typeof port === 'number' && port > 0) return `http://127.0.0.1:${port}`;
    return 'http://127.0.0.1:3002';
}
/** True when the embedded sidecar booted and owns its socket. */ function embeddedFreellmapiReady() {
    return typeof globalThis.__FREELLMAPI_EMBEDDED_PORT__ === 'number';
}
/**
 * Boot the sidecar inside this process. Idempotent; never throws to the
 * caller's caller without being caught first (instrumentation wraps this in
 * try/catch — a sidecar failure must never block the app from serving).
 */ async function startEmbeddedFreellmapi() {
    if (embeddedFreellmapiReady()) return; // already booted (HMR re-register etc.)
    if (!(0,node_fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(SIDECAR_ENTRY)) {
        console.warn(`[freellmapi] embedded server entry missing (${SIDECAR_ENTRY}). ` + 'Build it (cd freellmapi && npm run build -w server) — the AI Router tab will stay offline until then.');
        return;
    }
    // Point the sidecar's dotenv loader at ITS OWN .env before its modules load
    // (its env.ts honours FREEAPI_ENV_PATH precisely for embedders). Snapshot
    // PORT/HOST around the import: the sidecar .env carries PORT=3002 /
    // HOST=127.0.0.1, and dotenv would plant them on the Next.js process — the
    // -p 3000 CLI flag still wins the bind, but no downstream tooling should
    // ever observe a stale PORT from the sidecar's file.
    process.env.FREEAPI_ENV_PATH = SIDECAR_ENV;
    const prevPort = process.env.PORT;
    const prevHost = process.env.HOST;
    // Runtime import of on-disk ESM that must NEVER be bundled: `new Function`
    // keeps webpack/turbopack from rewriting the specifier into a context
    // module, so the sidecar's real module graph (and its own node_modules)
    // resolves exactly as in standalone mode.
    const runtimeImport = new Function('specifier', 'return import(specifier)');
    let mod;
    try {
        mod = await runtimeImport((0,node_url__WEBPACK_IMPORTED_MODULE_2__.pathToFileURL)(SIDECAR_ENTRY).href);
    } finally{
        if (prevPort === undefined) delete process.env.PORT;
        else process.env.PORT = prevPort;
        if (prevHost === undefined) delete process.env.HOST;
        else process.env.HOST = prevHost;
    }
    if (typeof mod?.startServer !== 'function') {
        throw new Error('freellmapi/server/dist/index.js does not export startServer() — ' + 'rebuild the sidecar (cd freellmapi && npm run build -w server).');
    }
    // Ephemeral loopback port (0 = OS-assigned): the AI Router has no fixed TCP
    // port of its own any more; it is reachable only through the MedQ origin.
    const server = await mod.startServer({
        port: 0,
        host: '127.0.0.1',
        embedded: true
    });
    await new Promise((resolve, reject)=>{
        if (server.listening) return resolve();
        server.once?.('listening', ()=>resolve());
        server.once?.('error', (err)=>reject(err));
    });
    const addr = server.address?.();
    const port = typeof addr === 'object' && addr && typeof addr.port === 'number' ? addr.port : 0;
    if (!port) throw new Error('embedded sidecar reported no listening port');
    globalThis.__FREELLMAPI_EMBEDDED_PORT__ = port;
    console.log(`[freellmapi] embedded AI Router listening on 127.0.0.1:${port} (in-process, no separate app — served through the MedQ origin on port 3000)`);
}


/***/ })

};
;