"use strict";
exports.id = 5566;
exports.ids = [5566];
exports.modules = {

/***/ 166890:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rs: () => (/* binding */ encryptApiKey),
/* harmony export */   Tt: () => (/* binding */ decryptApiKey),
/* harmony export */   oO: () => (/* binding */ maskApiKey)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/**
 * BYOK (Bring Your Own Key) encryption utilities — server-only.
 *
 * Stores user-supplied AI provider API keys encrypted with AES-256-GCM.
 *
 * Master key resolution:
 *   1. `BYOK_MASTER_KEY` env var (hex string, 64 chars = 32 bytes). RECOMMENDED
 *      for production — generate with `openssl rand -hex 32`.
 *   2. `NEXTAUTH_SECRET` env var (already required by the app). We derive a
 *      32-byte key from it with SHA-256. Lets dev "just work" without forcing
 *      the operator to set yet another env var, while still being cryptographically
 *      sound (SHA-256 of a high-entropy secret is a perfectly good KDF for this).
 *
 * The plaintext key NEVER lives in the database, never appears in logs, and
 * never crosses the wire back to the client. Only the encrypted ciphertext +
 * IV + authTag are persisted.
 *
 * Threat model:
 *   - Database leak (e.g. SQL injection, backup theft): attacker gets
 *     ciphertext only. Without the master key (env var, never in the DB) the
 *     keys are unrecoverable.
 *   - Server compromise: attacker can read the master key from env and
 *     decrypt. BYOK does not defend against full server compromise — no
 *     at-rest encryption can. (HSM/KMS would, but that's out of scope.)
 *   - Replay/tamper: AES-GCM's authTag detects any tampering with ciphertext
 *     or IV; decryption throws on mismatch.
 */ 
const KEY_BYTES = 32; // AES-256
const IV_BYTES = 12; // GCM standard (96 bits)
const AUTH_TAG_BYTES = 16;
let _cachedKey = null;
/**
 * Resolve the master encryption key. Cached for the lifetime of the process.
 * Throws if neither BYOK_MASTER_KEY nor NEXTAUTH_SECRET is set — we refuse to
 * run with a random ephemeral key because that would silently wipe every
 * stored key on the next restart.
 */ function getMasterKey() {
    if (_cachedKey) return _cachedKey;
    const explicit = process.env.BYOK_MASTER_KEY?.trim();
    if (explicit) {
        if (!/^[0-9a-fA-F]{64}$/.test(explicit)) {
            throw new Error('BYOK_MASTER_KEY must be 32 bytes expressed as 64 hex characters. ' + 'Generate one with: openssl rand -hex 32');
        }
        _cachedKey = Buffer.from(explicit, 'hex');
        return _cachedKey;
    }
    const fallback = process.env.NEXTAUTH_SECRET?.trim();
    if (!fallback) {
        throw new Error('BYOK encryption requires either BYOK_MASTER_KEY (hex, 32 bytes) or ' + 'NEXTAUTH_SECRET to be set. Refusing to run with an ephemeral key ' + 'because stored keys would be unrecoverable after restart.');
    }
    // Derive a stable 32-byte key from NEXTAUTH_SECRET via SHA-256.
    _cachedKey = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('sha256').update(fallback).digest();
    return _cachedKey;
}
function encryptApiKey(plaintext) {
    if (!plaintext) throw new Error('encryptApiKey: plaintext must be non-empty');
    const key = getMasterKey();
    const iv = crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(IV_BYTES);
    const cipher = crypto__WEBPACK_IMPORTED_MODULE_0___default().createCipheriv('aes-256-gcm', key, iv);
    const ct = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return {
        ciphertext: ct.toString('base64'),
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64')
    };
}
function decryptApiKey(encrypted) {
    if (!encrypted?.ciphertext || !encrypted?.iv || !encrypted?.authTag) {
        throw new Error('decryptApiKey: missing encrypted payload fields');
    }
    const key = getMasterKey();
    const iv = Buffer.from(encrypted.iv, 'base64');
    if (iv.length !== IV_BYTES) {
        throw new Error(`decryptApiKey: IV must be ${IV_BYTES} bytes, got ${iv.length}`);
    }
    const authTag = Buffer.from(encrypted.authTag, 'base64');
    if (authTag.length !== AUTH_TAG_BYTES) {
        throw new Error(`decryptApiKey: authTag must be ${AUTH_TAG_BYTES} bytes, got ${authTag.length}`);
    }
    const decipher = crypto__WEBPACK_IMPORTED_MODULE_0___default().createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    // setAuthTag + final() throws if the tag doesn't verify — i.e. on tamper or
    // wrong master key. This is the cryptographic guarantee.
    const pt = Buffer.concat([
        decipher.update(Buffer.from(encrypted.ciphertext, 'base64')),
        decipher.final()
    ]);
    return pt.toString('utf8');
}
/**
 * Mask a key for display in the UI. Reveals only the first 4 and last 4 chars,
 * enough for the user to recognize "yes that's my key" without exposing the
 * middle. Empty input returns empty string.
 *
 * Example: "sk-proj-abc123...xyz789" → "sk-pr••••••••••••••789"
 */ function maskApiKey(key) {
    if (!key) return '';
    if (key.length <= 8) return '•'.repeat(key.length);
    return `${key.slice(0, 4)}${'•'.repeat(Math.min(key.length - 8, 24))}${key.slice(-4)}`;
}


/***/ }),

/***/ 735566:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IT: () => (/* binding */ updateModelsConfig),
/* harmony export */   IW: () => (/* binding */ listUserApiKeys),
/* harmony export */   KA: () => (/* binding */ saveUserApiKey),
/* harmony export */   Os: () => (/* binding */ markUserApiKeyVerified),
/* harmony export */   Rt: () => (/* binding */ resolveUserApiKey),
/* harmony export */   UM: () => (/* binding */ KEYLESS_PROVIDER_IDS),
/* harmony export */   YG: () => (/* binding */ deleteUserApiKey),
/* harmony export */   Yj: () => (/* binding */ touchUserApiKeyById),
/* harmony export */   decryptEndpointKey: () => (/* binding */ decryptEndpointKey),
/* harmony export */   et: () => (/* binding */ deleteUserApiKeyById),
/* harmony export */   fp: () => (/* binding */ moveEndpoint),
/* harmony export */   vM: () => (/* binding */ setEndpointEnabled)
/* harmony export */ });
/* unused harmony exports MAX_ENDPOINTS_PER_PROVIDER, touchUserApiKey, markProviderKeyVerified */
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(166890);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * BYOK service — server-only.
 *
 * Single API for reading/writing user-supplied AI provider API keys.
 * Wraps Prisma + byok-crypto so callers never touch the DB or crypto directly.
 *
 * Resolution order at request time (see resolve-model.ts → resolveModel):
 *   1. Server-managed provider (operator's key in env/YAML/.z-ai-config) — wins.
 *   2. Client-sent key (x-api-key header) — classroom BYOK via localStorage.
 *   3. User-saved BYOK endpoint (this module) — app-level, encrypted in DB.
 *   4. Nothing → 401/error.
 *
 * #3 is what this module provides. It exists so that:
 *   - Keys sync across the user's devices (server-side storage, not localStorage).
 *   - Keys never appear in the browser's localStorage/IndexedDB (security).
 *   - All app features (AI chat, tutor, explain, classroom, …) can share one
 *     pool of user keys instead of every feature reinventing BYOK.
 *
 * ── MULTI-ENDPOINT (several keys / base URLs per provider) ──
 * A user may save MULTIPLE endpoints for the same provider — e.g. an OpenAI
 * key plus a corporate-gateway key, or (the classic case) a remote Ollama at
 * https://ollama2.space-z.ai plus a local Ollama at http://localhost:11434.
 * Each UserApiKey row is one ENDPOINT = (optional key, optional baseUrl,
 * label, enabled, priority). The resolver:
 *   - orders enabled endpoints by (priority ASC, createdAt ASC)
 *   - picks `slot` for a request — default is ROUND-ROBIN across the list
 *     (distributes load across keys / spreads rate limits)
 *   - callChat fails over: if the chosen endpoint errors, the next endpoint
 *     is tried, up to endpointCount attempts in total.
 * The baseUrl and the key of one row ALWAYS travel together — an endpoint
 * row describes one complete destination, never a mix-and-match.
 */ 


const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('BYOK');
/** Keyless providers may save endpoints with a baseUrl and no key. */ const KEYLESS_PROVIDER_IDS = new Set([
    'ollama',
    'lemonade'
]);
/** AES-GCM can't encrypt an empty string, so keyless endpoints store this
 *  sentinel — resolved back to '' on read so the wire never sees it. */ const KEYLESS_SENTINEL = '\u0000keyless';
/** Decrypt an endpoint's stored key (sentinel → ''). Shared by the api-keys
 *  routes so they never re-implement the sentinel handling. */ function decryptEndpointKey(encryptedKey, iv, authTag) {
    const pt = (0,_lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__/* .decryptApiKey */ .Tt)({
        ciphertext: encryptedKey,
        iv,
        authTag
    });
    return pt === KEYLESS_SENTINEL ? '' : pt;
}
/** Max endpoints per provider — a sane ceiling (UI + DB hygiene). */ const MAX_ENDPOINTS_PER_PROVIDER = 10;
// ── Round-robin state ──
// Process-global counter per (userId, providerId) so consecutive requests
// spread across the user's endpoints. Kept on globalThis so dev-mode HMR
// reloads don't reset it (and all workers in the process share it).
const RR = globalThis.__byokRr ?? (globalThis.__byokRr = new Map());
// ── Reads ──
/** Enabled endpoint rows for one provider, ordered (priority, createdAt). */ async function enabledRows(userId, providerId) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.findMany({
        where: {
            userId,
            providerId,
            enabled: true
        },
        orderBy: [
            {
                priority: 'asc'
            },
            {
                createdAt: 'asc'
            }
        ]
    });
}
/**
 * List all API-key endpoints the user has saved. Returns metadata only —
 * never the plaintext key. Used by the Settings UI.
 */ async function listUserApiKeys(userId) {
    const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.findMany({
        where: {
            userId
        },
        orderBy: [
            {
                providerId: 'asc'
            },
            {
                priority: 'asc'
            },
            {
                createdAt: 'asc'
            }
        ]
    });
    return rows.map((row)=>{
        let masked = '••••';
        try {
            // Decrypt just to compute the mask. Cheap (one AES-GCM op per row) and
            // happens only when the user opens Settings, so not a hot path.
            masked = maskWithDecrypt(row.encryptedKey, row.iv, row.authTag);
        } catch (e) {
            log.warn(`[listUserApiKeys] Could not decrypt key for ${row.providerId}:`, e);
            masked = '•••• (decryption error)';
        }
        let modelsConfig = null;
        if (row.modelsConfig) {
            try {
                const parsed = JSON.parse(row.modelsConfig);
                if (Array.isArray(parsed)) modelsConfig = parsed;
            } catch  {
                log.warn(`[listUserApiKeys] Invalid modelsConfig JSON for ${row.providerId}`);
            }
        }
        return {
            id: row.id,
            providerId: row.providerId,
            baseUrl: row.baseUrl,
            label: row.label,
            maskedKey: masked,
            enabled: row.enabled,
            priority: row.priority,
            lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
            lastVerifiedAt: row.lastVerifiedAt?.toISOString() ?? null,
            createdAt: row.createdAt.toISOString(),
            updatedAt: row.updatedAt.toISOString(),
            modelsConfig
        };
    });
}
function maskWithDecrypt(ciphertext, iv, authTag) {
    const pt = decryptEndpointKey(ciphertext, iv, authTag);
    return pt ? (0,_lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__/* .maskApiKey */ .oO)(pt) : '(no key)';
}
/**
 * Resolve ONE endpoint for a provider.
 *
 * `slot` selects which enabled endpoint to use (default: round-robin).
 * Used by resolve-model.ts as a fallback after server-managed and
 * client-sent keys have been checked. Returns null if the user has no
 * enabled endpoint for that provider.
 */ async function resolveUserApiKey(userId, providerId, opts = {}) {
    const rows = await enabledRows(userId, providerId);
    if (rows.length === 0) return null;
    const slot = opts.slot != null && Number.isFinite(opts.slot) ? (opts.slot % rows.length + rows.length) % rows.length : nextRoundRobin(userId, providerId, rows.length);
    const row = rows[slot];
    try {
        const apiKey = decryptEndpointKey(row.encryptedKey, row.iv, row.authTag);
        return {
            apiKey,
            baseUrl: row.baseUrl,
            slot,
            endpointCount: rows.length,
            rowId: row.id
        };
    } catch (e) {
        log.error(`[resolveUserApiKey] Decryption failed for user=${userId} provider=${providerId} row=${row.id}:`, e);
        return null;
    }
}
function nextRoundRobin(userId, providerId, count) {
    const key = `${userId}:${providerId}`;
    const next = (RR.get(key) ?? 0) + 1;
    RR.set(key, next);
    return next % count;
}
// ── Writes ──
/**
 * Save an endpoint. Creates a NEW row by default (the multi-endpoint case);
 * pass `id` to update an existing endpoint in place (key left untouched when
 * `apiKey` is omitted and the provider requires one — e.g. editing just the
 * label / baseUrl / priority).
 *
 * Keyless providers (ollama, lemonade) accept an empty key when a baseUrl
 * is provided — an endpoint may be nothing more than "my local Ollama".
 */ async function saveUserApiKey(userId, providerId, params) {
    const trimmedKey = (params.apiKey ?? '').trim();
    const baseUrl = params.baseUrl?.trim() || null;
    const keyless = KEYLESS_PROVIDER_IDS.has(providerId);
    if (!trimmedKey && !keyless) {
        throw new Error('API key must not be empty');
    }
    if (!trimmedKey && keyless && !baseUrl) {
        throw new Error('Provide an API key or a base URL for this endpoint');
    }
    if (trimmedKey.length > 4096) {
        throw new Error('API key is too long (max 4096 chars)');
    }
    const label = params.label?.trim() || null;
    const modelsConfigJson = params.modelsConfig ? JSON.stringify(params.modelsConfig) : null;
    // ── Update an existing endpoint in place ──
    if (params.id) {
        const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.findFirst({
            where: {
                id: params.id,
                userId
            }
        });
        if (!existing) throw new Error('Endpoint not found');
        const enc = trimmedKey ? (0,_lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__/* .encryptApiKey */ .Rs)(trimmedKey) : null;
        const row = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.update({
            where: {
                id: existing.id
            },
            data: {
                ...enc ? {
                    encryptedKey: enc.ciphertext,
                    iv: enc.iv,
                    authTag: enc.authTag
                } : {},
                baseUrl,
                label,
                enabled: true,
                // Reset verification — the endpoint just changed, re-verify on next use.
                lastVerifiedAt: null,
                updatedAt: new Date()
            }
        });
        log.info(`[saveUserApiKey] Updated endpoint ${row.id} for provider=${providerId}`);
        return rowToMeta(row, trimmedKey || null, params.modelsConfig ?? null);
    }
    // ── Create a new endpoint ──
    const count = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.count({
        where: {
            userId,
            providerId
        }
    });
    if (count >= MAX_ENDPOINTS_PER_PROVIDER) {
        throw new Error(`Too many endpoints for ${providerId} (max ${MAX_ENDPOINTS_PER_PROVIDER})`);
    }
    // New endpoints go LAST in priority order (existing order stays stable).
    const priority = count;
    // A "replace the only endpoint" save (legacy UI shape) still just adds a
    // row — the resolver round-robins over all enabled rows.
    const enc = (0,_lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__/* .encryptApiKey */ .Rs)(trimmedKey || KEYLESS_SENTINEL);
    const row = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.create({
        data: {
            userId,
            providerId,
            encryptedKey: enc.ciphertext,
            iv: enc.iv,
            authTag: enc.authTag,
            baseUrl,
            label,
            priority,
            modelsConfig: count === 0 ? modelsConfigJson : null,
            enabled: true
        }
    });
    log.info(`[saveUserApiKey] Saved endpoint ${row.id} (#${count + 1}) for provider=${providerId} user=${userId}`);
    return rowToMeta(row, trimmedKey || null, count === 0 ? params.modelsConfig ?? null : null);
}
function rowToMeta(row, plaintextKey, modelsConfig) {
    let parsedModels = modelsConfig;
    if (!parsedModels && row.modelsConfig) {
        try {
            const p = JSON.parse(row.modelsConfig);
            if (Array.isArray(p)) parsedModels = p;
        } catch  {}
    }
    return {
        id: row.id,
        providerId: row.providerId,
        baseUrl: row.baseUrl,
        label: row.label,
        maskedKey: plaintextKey ? (0,_lib_server_byok_crypto__WEBPACK_IMPORTED_MODULE_1__/* .maskApiKey */ .oO)(plaintextKey) : '(no key)',
        enabled: row.enabled,
        priority: row.priority,
        lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
        lastVerifiedAt: row.lastVerifiedAt?.toISOString() ?? null,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        modelsConfig: parsedModels
    };
}
// ── Per-endpoint management ──
/** Enable/disable ONE endpoint (soft toggle — keep it on file, unused). */ async function setEndpointEnabled(userId, endpointId, enabled) {
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.updateMany({
        where: {
            id: endpointId,
            userId
        },
        data: {
            enabled
        }
    });
}
/** Delete ONE endpoint. Throws if not found. */ async function deleteUserApiKeyById(userId, endpointId) {
    const res = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.deleteMany({
        where: {
            id: endpointId,
            userId
        }
    });
    if (res.count === 0) throw new Error('Endpoint not found');
    log.info(`[deleteUserApiKeyById] Deleted endpoint ${endpointId}`);
}
/**
 * Reorder endpoints: moves an endpoint up/down one position and rewrites
 * the provider's priorities to a clean 0..n-1 sequence (robust even when
 * legacy rows share equal priorities).
 */ async function moveEndpoint(userId, endpointId, direction) {
    const row = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.findFirst({
        where: {
            id: endpointId,
            userId
        }
    });
    if (!row) throw new Error('Endpoint not found');
    const siblings = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.findMany({
        where: {
            userId,
            providerId: row.providerId
        },
        orderBy: [
            {
                priority: 'asc'
            },
            {
                createdAt: 'asc'
            }
        ]
    });
    const idx = siblings.findIndex((s)=>s.id === endpointId);
    const swapWith = direction === 'up' ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= siblings.length) return; // already at the end
    const next = [
        ...siblings
    ];
    [next[idx], next[swapWith]] = [
        next[swapWith],
        next[idx]
    ];
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.$transaction(next.map((s, i)=>_lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.update({
            where: {
                id: s.id
            },
            data: {
                priority: i
            }
        })));
}
/**
 * Update the modelsConfig for a provider — applies to ALL endpoint rows of
 * that provider (the model catalog is per-provider, not per-endpoint).
 */ async function updateModelsConfig(userId, providerId, modelsConfig) {
    const modelsConfigJson = modelsConfig && modelsConfig.length > 0 ? JSON.stringify(modelsConfig) : null;
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.updateMany({
        where: {
            userId,
            providerId
        },
        data: {
            modelsConfig: modelsConfigJson,
            updatedAt: new Date()
        }
    });
    log.info(`[updateModelsConfig] Updated models for provider=${providerId} user=${userId} (${modelsConfig?.length ?? 0} models)`);
}
/** Delete ALL of a user's endpoints for a provider. No-op if none exist. */ async function deleteUserApiKey(userId, providerId) {
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.deleteMany({
        where: {
            userId,
            providerId
        }
    });
    log.info(`[deleteUserApiKey] Deleted all endpoints for provider=${providerId} user=${userId}`);
}
/**
 * Mark an endpoint as "verified working" — called after a successful test.
 * Helps the UI show "✓ verified 2 minutes ago" so the user knows it's good.
 */ async function markUserApiKeyVerified(userId, endpointId) {
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.updateMany({
        where: {
            id: endpointId,
            userId
        },
        data: {
            lastVerifiedAt: new Date()
        }
    });
}
/**
 * Mark an endpoint as "used" — called after a successful AI request.
 *
 * NOTE: deliberately fire-and-forget (no await) at call sites, because this
 * writes on every AI request and we don't want to slow down responses. If the
 * write fails it's not a hard error — the key still works.
 */ async function touchUserApiKeyById(userId, endpointId) {
    try {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.userApiKey.updateMany({
            where: {
                id: endpointId,
                userId
            },
            data: {
                lastUsedAt: new Date()
            }
        });
    } catch (e) {
        // Silent fail — touch is best-effort.
        log.warn(`[touchUserApiKeyById] Failed for endpoint=${endpointId}:`, e);
    }
}
// ── Back-compat shims (older call sites) ──
/** Legacy single-key touch — touches the FIRST enabled endpoint. */ async function touchUserApiKey(userId, providerId) {
    const rows = await enabledRows(userId, providerId);
    if (rows.length > 0) await touchUserApiKeyById(userId, rows[0].id);
}
/** Legacy single-key verify — verifies the FIRST enabled endpoint. */ async function markProviderKeyVerified(userId, providerId) {
    const rows = await enabledRows(userId, providerId);
    if (rows.length > 0) await markUserApiKeyVerified(userId, rows[0].id);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;