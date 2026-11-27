"use strict";
exports.id = 4399;
exports.ids = [4399];
exports.modules = {

/***/ 204399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F2: () => (/* binding */ withGatewaySlot),
/* harmony export */   withGatewayResilience: () => (/* binding */ withGatewayResilience)
/* harmony export */ });
/* unused harmony exports isTransientGatewayError, withGatewayRetry */
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * Shared resilience layer for outbound AI-gateway calls (ZAI SDK and friends).
 *
 * Why this exists: the shared Z.AI gateway periodically 429-storms (observed
 * 2026-10-08 and again during the 2026-10-23 skill-testing session). Tool
 * calls that hit the gateway directly (image search, image edit, ASR, TTS,
 * web search, vision) failed hard and surfaced raw errors to students until
 * the storm passed. This module provides:
 *
 *   • withGatewayRetry — exponential backoff + jitter for transient errors
 *     (429 / 5xx / network). Non-transient errors (validation, auth, 4xx)
 *     propagate immediately.
 *   • createGatewayLimiter / withGatewaySlot — a process-wide concurrency
 *     cap so parallel agent tool calls don't amplify a rate-limited gateway
 *     (N simultaneous 429s make storms worse; queueing spreads them out).
 *
 * Env knobs (all optional):
 *   MEDQ_GATEWAY_RETRIES         — max retries per call (default 3)
 *   MEDQ_GATEWAY_BASE_DELAY_MS   — first backoff step (default 800)
 *   MEDQ_GATEWAY_MAX_CONCURRENCY — simultaneous gateway calls (default 3)
 */ 
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('GatewayResilience');
const RETRIES = clampInt(process.env.MEDQ_GATEWAY_RETRIES, 3, 0, 6);
const BASE_DELAY_MS = clampInt(process.env.MEDQ_GATEWAY_BASE_DELAY_MS, 800, 100, 10000);
const MAX_CONCURRENCY = clampInt(process.env.MEDQ_GATEWAY_MAX_CONCURRENCY, 3, 1, 16);
function clampInt(raw, fallback, min, max) {
    const value = parseInt(raw ?? '', 10);
    if (Number.isNaN(value)) return fallback;
    return Math.max(min, Math.min(max, value));
}
/** Transient gateway conditions worth retrying: rate limits (the gateway wraps
 * 429s in 500s sometimes), 5xx, and network-level failures. Everything else
 * (auth, validation, 4xx, code bugs) fails fast. */ function isTransientGatewayError(error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/\b429\b|too many requests|rate.?limit/i.test(message)) return true;
    if (/\b(?:500|502|503|504)\b/.test(message) && /status|http/i.test(message)) return true;
    return /ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|network|timeout|timed out|service unavailable/i.test(message);
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
/** Full-jitter exponential backoff: wait uniform(0, base * 2^attempt). */ function backoffDelay(attempt) {
    const ceiling = Math.min(BASE_DELAY_MS * 2 ** attempt, 15000);
    return Math.random() * ceiling;
}
/**
 * Run `fn`, retrying transient failures with full-jitter exponential backoff.
 * Never retries non-transient errors. Returns the first successful result or
 * rethrows the last error after the retry budget is spent.
 */ async function withGatewayRetry(fn, options = {}) {
    const maxRetries = options.retries ?? RETRIES;
    let lastError;
    for(let attempt = 0; attempt <= maxRetries; attempt += 1){
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === maxRetries || !isTransientGatewayError(error)) throw error;
            const delay = Math.round(backoffDelay(attempt));
            log.warn?.(`${options.label ?? 'gateway call'} transient failure (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms:`, error instanceof Error ? error.message : error);
            if (options.signal?.aborted) throw error;
            await sleep(delay);
        }
    }
    throw lastError;
}
class GatewayLimiter {
    constructor(max){
        this.max = max;
        this.active = 0;
        this.queue = [];
    }
    async acquire() {
        if (this.active < this.max) {
            this.active += 1;
            return {
                release: ()=>this.releaseSlot()
            };
        }
        await new Promise((resolve)=>this.queue.push(resolve));
        this.active += 1;
        return {
            release: ()=>this.releaseSlot()
        };
    }
    releaseSlot() {
        this.active -= 1;
        const next = this.queue.shift();
        if (next) next();
    }
}
const globalLimiter = new GatewayLimiter(MAX_CONCURRENCY);
/** Run `fn` while holding one global gateway slot (FIFO queue when full). */ async function withGatewaySlot(fn) {
    const slot = await globalLimiter.acquire();
    try {
        return await fn();
    } finally{
        slot.release();
    }
}
/** Convenience: slot + retry combined (the standard wrapper for ZAI calls). */ async function withGatewayResilience(fn, options = {}) {
    return withGatewaySlot(()=>withGatewayRetry(fn, options));
}


/***/ })

};
;