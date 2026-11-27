"use strict";
exports.id = 8699;
exports.ids = [8699];
exports.modules = {

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

/***/ 946014:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FY: () => (/* binding */ revokeDevice),
/* harmony export */   IA: () => (/* binding */ listSecurityEvents),
/* harmony export */   Lj: () => (/* binding */ listUserDevices),
/* harmony export */   OB: () => (/* binding */ markAllEventsRead),
/* harmony export */   RW: () => (/* binding */ getRequestIp),
/* harmony export */   U0: () => (/* binding */ getRequestUa),
/* harmony export */   pN: () => (/* binding */ recordDeviceLogin),
/* harmony export */   qo: () => (/* binding */ markEventRead)
/* harmony export */ });
/* unused harmony exports timezoneToLocation, lookupIpGeo, computeDeviceClassKey, isDeviceRevoked, logSecurityEvent */
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// fingerprint-server.ts
// ─────────────────────────────────────────────────────────────────────────
// Server-side helpers for device fingerprint verification + security event
// logging.
//
// Exports:
//   - recordDeviceLogin(userId, fp, ip, ua)  → upserts DeviceFingerprint,
//                                                writes SecurityEvent(s).
//   - revokeDevice(userId, fingerprintHash, reason)
//   - isDeviceRevoked(userId, fingerprintHash)
//   - listUserDevices(userId)               → for Settings UI
//   - logSecurityEvent(userId, type, fields)
//   - listSecurityEvents(userId, opts)
//   - markEventRead(userId, eventId)
// ─────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────
// IP Geolocation
// ─────────────────────────────────────────────────────────────────────────
// Looks up an approximate city/country for a given public IP using the free
// ip-api.com endpoint (HTTP-only on the free tier, 45 req/min, no API key).
// Result is cached in-memory for 30 min per IP — IP→geo mapping rarely
// changes, and this avoids hammering the API on every verify call.
//
// We use a 2.5s timeout so a slow geo API never blocks the verify response
// for more than ~3s. On any failure (timeout, network error, non-success
// response), we return an empty string — the UI will then fall back to
// showing just the IP.
//
// Private / loopback / link-local IPs return "Local network" without making
// an API call. This keeps local dev fast and avoids leaking private IPs to
// the third-party endpoint.
// ─────────────────────────────────────────────────────────────────────────
const IP_GEO_CACHE = new Map();
const IP_GEO_TTL_MS = 30 * 60 * 1000; // 30 min
const IP_GEO_TIMEOUT_MS = 2500;
function isPrivateIp(ip) {
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') return true;
    // IPv6-mapped IPv4 loopback
    if (/^::ffff:127\./.test(ip)) return true;
    // IPv4 private ranges
    if (/^10\./.test(ip)) return true;
    if (/^192\.168\./.test(ip)) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(ip)) return true;
    // Link-local
    if (/^169\.254\./.test(ip)) return true;
    if (/^fe80:/.test(ip)) return true;
    return false;
}
/**
 * Map an IANA timezone (e.g. "Africa/Cairo", "America/New_York") to a
 * human-readable "City, Country" string. This is used as a FALLBACK when
 * IP-based geolocation fails or returns a proxy/gateway IP that doesn't
 * reflect the user's real location.
 *
 * The mapping is intentionally coarse — only the city implied by the zone
 * name and the country derived from a small lookup table. This mirrors what
 * Telegram shows when it can't get a precise IP geolocation.
 */ const COUNTRY_CODE_TO_NAME = {
    EG: 'Egypt',
    SA: 'Saudi Arabia',
    AE: 'UAE',
    US: 'United States',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    IT: 'Italy',
    ES: 'Spain',
    NL: 'Netherlands',
    TR: 'Turkey',
    IN: 'India',
    CN: 'China',
    JP: 'Japan',
    KR: 'South Korea',
    SG: 'Singapore',
    ID: 'Indonesia',
    TH: 'Thailand',
    VN: 'Vietnam',
    MY: 'Malaysia',
    PH: 'Philippines',
    PK: 'Pakistan',
    BD: 'Bangladesh',
    IR: 'Iran',
    IQ: 'Iraq',
    JO: 'Jordan',
    LB: 'Lebanon',
    SY: 'Syria',
    MA: 'Morocco',
    DZ: 'Algeria',
    TN: 'Tunisia',
    LY: 'Libya',
    SD: 'Sudan',
    KE: 'Kenya',
    NG: 'Nigeria',
    ZA: 'South Africa',
    CA: 'Canada',
    MX: 'Mexico',
    BR: 'Brazil',
    AR: 'Argentina',
    CL: 'Chile',
    CO: 'Colombia',
    AU: 'Australia',
    NZ: 'New Zealand',
    RU: 'Russia',
    UA: 'Ukraine',
    PL: 'Poland',
    SE: 'Sweden',
    NO: 'Norway',
    FI: 'Finland',
    DK: 'Denmark',
    BE: 'Belgium',
    CH: 'Switzerland',
    AT: 'Austria',
    PT: 'Portugal',
    GR: 'Greece',
    CZ: 'Czechia',
    RO: 'Romania',
    HU: 'Hungary'
};
function timezoneToLocation(tz) {
    if (!tz || tz === 'UTC') return '';
    // IANA zone names look like "Area/City" (e.g. "Africa/Cairo").
    // Some zones have a third segment (e.g. "America/Indiana/Indianapolis") —
    // the LAST segment is always the city.
    const parts = tz.split('/');
    if (parts.length < 2) return '';
    const cityRaw = parts[parts.length - 1];
    // Convert "New_York" → "New York", "Buenos_Aires" → "Buenos Aires"
    const city = cityRaw.replace(/_/g, ' ');
    // We can't reliably derive the country code from the IANA Area (multiple
    // countries share "America"/"Europe"/"Asia"), so we look up by city.
    // This is a small curated map of the most common zones — if the city
    // isn't in our table, we return just the city (still better than "").
    const CITY_TO_COUNTRY = {
        Cairo: 'Egypt',
        Lagos: 'Nigeria',
        Nairobi: 'Kenya',
        Johannesburg: 'South Africa',
        Casablanca: 'Morocco',
        Algiers: 'Algeria',
        Tunis: 'Tunisia',
        Tripoli: 'Libya',
        Khartoum: 'Sudan',
        Riyadh: 'Saudi Arabia',
        Dubai: 'UAE',
        Doha: 'Qatar',
        Kuwait: 'Kuwait',
        Bahrain: 'Bahrain',
        Jerusalem: 'Israel',
        Amman: 'Jordan',
        Beirut: 'Lebanon',
        Damascus: 'Syria',
        Baghdad: 'Iraq',
        Tehran: 'Iran',
        Istanbul: 'Turkey',
        'New York': 'United States',
        'Los Angeles': 'United States',
        Chicago: 'United States',
        Houston: 'United States',
        Miami: 'United States',
        Seattle: 'United States',
        Denver: 'United States',
        Phoenix: 'United States',
        Toronto: 'Canada',
        Vancouver: 'Canada',
        Montreal: 'Canada',
        'Mexico City': 'Mexico',
        London: 'United Kingdom',
        Dublin: 'Ireland',
        Paris: 'France',
        Berlin: 'Germany',
        Frankfurt: 'Germany',
        Munich: 'Germany',
        Madrid: 'Spain',
        Barcelona: 'Spain',
        Rome: 'Italy',
        Milan: 'Italy',
        Amsterdam: 'Netherlands',
        Brussels: 'Belgium',
        Vienna: 'Austria',
        Zurich: 'Switzerland',
        Geneva: 'Switzerland',
        Stockholm: 'Sweden',
        Oslo: 'Norway',
        Copenhagen: 'Denmark',
        Helsinki: 'Finland',
        Warsaw: 'Poland',
        Prague: 'Czechia',
        Budapest: 'Hungary',
        Bucharest: 'Romania',
        Athens: 'Greece',
        Lisbon: 'Portugal',
        Moscow: 'Russia',
        Kyiv: 'Ukraine',
        'New Delhi': 'India',
        Mumbai: 'India',
        Bangalore: 'India',
        Kolkata: 'India',
        Chennai: 'India',
        Karachi: 'Pakistan',
        Lahore: 'Pakistan',
        Dhaka: 'Bangladesh',
        Colombo: 'Sri Lanka',
        Bangkok: 'Thailand',
        Hanoi: 'Vietnam',
        Jakarta: 'Indonesia',
        'Ho Chi Minh': 'Vietnam',
        Kuala: 'Malaysia',
        Singapore: 'Singapore',
        Manila: 'Philippines',
        Hong: 'Hong Kong',
        Shanghai: 'China',
        Beijing: 'China',
        Guangzhou: 'China',
        Shenzhen: 'China',
        Tokyo: 'Japan',
        Osaka: 'Japan',
        Seoul: 'South Korea',
        Sydney: 'Australia',
        Melbourne: 'Australia',
        Brisbane: 'Australia',
        Perth: 'Australia',
        Auckland: 'New Zealand',
        'Sao Paulo': 'Brazil',
        Rio: 'Brazil',
        'Buenos Aires': 'Argentina',
        Santiago: 'Chile',
        Bogota: 'Colombia',
        Lima: 'Peru'
    };
    const country = CITY_TO_COUNTRY[city] || '';
    return country ? `${city}, ${country}` : city;
}
async function lookupIpGeo(ip) {
    if (isPrivateIp(ip)) return 'Local network';
    const cached = IP_GEO_CACHE.get(ip);
    if (cached && Date.now() - cached.fetchedAt < IP_GEO_TTL_MS) {
        return cached.geo;
    }
    try {
        const controller = new AbortController();
        const timeout = setTimeout(()=>controller.abort(), IP_GEO_TIMEOUT_MS);
        const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city,country,countryCode`, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) return '';
        const data = await res.json();
        if (data?.status !== 'success') return '';
        const city = data.city || '';
        const country = data.country || '';
        const geo = [
            city,
            country
        ].filter(Boolean).join(', ');
        if (geo) {
            IP_GEO_CACHE.set(ip, {
                geo,
                fetchedAt: Date.now()
            });
        }
        return geo;
    } catch  {
        // Timeout, network error, or DNS failure — fall back to empty.
        // The next verify call will retry.
        return '';
    }
}
/**
 * Compute a stable "device-class key" from the components the client sends.
 * Used to detect that an incoming fingerprint belongs to the SAME physical
 * device as an existing row, even when the brittle `fingerprintHash` differs
 * (e.g. because the user zoomed the page → DPR changed → old hash changed,
 * or Chrome auto-updated → UA version changed → old hash changed).
 *
 * The key includes only signals that are stable for the lifetime of a
 * physical device + browser choice:
 *   osGuess + browserGuess + platform + screen-width × screen-height
 *   + hardwareConcurrency + deviceMemory + timezone
 *
 * `screen` from the client is `<w>x<h>x<dpr>` — we strip the DPR because it
 * changes with page zoom. We keep only the screen dimensions, which reflect
 * the physical display.
 */ function computeDeviceClassKey(c) {
    // Strip the DPR segment from screen ("<w>x<h>x<dpr>" → "<w>x<h>")
    const screenDims = (c.screen || '').split('x').slice(0, 2).join('x');
    return [
        c.osGuess || '',
        c.browserGuess || '',
        c.platform || '',
        screenDims,
        String(c.hardwareConcurrency || 0),
        String(c.deviceMemory || 0),
        c.timezone || ''
    ].join('||');
}
/**
 * Record a device login. Upserts the DeviceFingerprint row, updates
 * lastSeenAt / lastIp / loginCount, and emits a SecurityEvent when:
 *   - the device is new (first time we see this fingerprint for this user)
 *   - the IP changed since the last login from this device
 *   - the timezone changed (potential account-takeover signal)
 *
 * Returns the upserted DeviceFingerprint row.
 */ async function recordDeviceLogin(userId, fp, ip, ua) {
    const c = fp.components;
    // ── IP resolution ──
    // Server-authoritative IP detection. The `ip` argument comes from
    // getRequestIp() in src/lib/security/fingerprint-server.ts, which inspects
    // request headers in this order:
    //
    //   1. x-forwarded-for         (leftmost PUBLIC entry in the chain)
    //   2. cf-connecting-ip        (Cloudflare)
    //   3. true-client-ip          (Akamai / Cloudflare Enterprise)
    //   4. x-real-ip               (Nginx standard)
    //   5. x-client-ip             (generic)
    //
    // If none of those yield a public IP (e.g., direct localhost dev, or a
    // reverse proxy that strips XFF), `ip` is '' and we fall back to the
    // browser's IANA timezone for an approximate location string. The browser
    // is NEVER asked to report its own IP — that would be an anti-pattern
    // (clients can lie, and calling a third-party IP echo service from the
    // browser is unprofessional and leaks data to a third party).
    const effectiveIp = ip;
    // ── Location resolution ──
    // Try IP-based geolocation first. If it returns nothing useful ("Local
    // network" or empty), fall back to the browser's IANA timezone → city.
    // This guarantees the user always sees SOME plausible location string,
    // even when the network/proxy setup hides the real client IP.
    const tzLocation = timezoneToLocation(c.timezone);
    async function resolveLocation(ipToLookup) {
        if (!ipToLookup || isPrivateIp(ipToLookup)) {
            return tzLocation || 'Local network';
        }
        const geo = await lookupIpGeo(ipToLookup);
        if (!geo || geo === 'Local network') {
            return tzLocation || geo || '';
        }
        return geo;
    }
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.findUnique({
        where: {
            userId_fingerprintHash: {
                userId,
                fingerprintHash: fp.fingerprintHash
            }
        }
    });
    // ── Stable device-class fallback ────────────────────────────────────────
    // If the exact fingerprintHash doesn't match (because the user zoomed the
    // page → DPR changed → hash changed, or Chrome auto-updated → UA changed
    // → hash changed), check whether an EXISTING device row for this user has
    // the same stable device-class key. If so, treat it as the same device:
    // re-home the row to the new fingerprintHash so future lookups hit the
    // fast path, and proceed as a known-device login (no "new device" toast).
    //
    // This is the reconciliation path that cleans up the historical mess of
    // duplicate rows for the same physical device.
    let reconciledFromExisting = false;
    let effectiveExisting = existing;
    if (!existing) {
        // Decode the stored screenSummary ("<w>x<h>x<dpr>" → "<w>x<h>") to match
        // against the stable device-class's screen-dim segment. We can't query
        // by the computed stable key directly (it's not a column), so we query
        // by the persisted component fields the stable key is built from.
        //
        // NOTE: hardwareConcurrency and deviceMemory are part of the client's
        // payload but are NOT persisted as separate columns — they're implicitly
        // captured by (osGuess, platform) which already identify the device class.
        const screenDimsForQuery = (c.screen || '').split('x').slice(0, 2).join('x');
        const candidates = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.findMany({
            where: {
                userId,
                revoked: false,
                osGuess: c.osGuess,
                browserGuess: c.browserGuess,
                platform: c.platform,
                timezone: c.timezone,
                // screenSummary stored as "<w>x<h>x<dpr>" — use startsWith to match
                // the "<w>x<h>" prefix (the DPR suffix varies but the prefix is stable).
                screenSummary: {
                    startsWith: screenDimsForQuery + 'x'
                }
            },
            orderBy: {
                lastSeenAt: 'desc'
            },
            take: 1
        });
        if (candidates.length > 0) {
            const match = candidates[0];
            // Re-home: update the matching row's fingerprintHash to the new stable
            // hash so future verify calls hit the fast path. Also bump its volatile
            // fields (UA, screenSummary with new DPR, etc.) to the latest values.
            effectiveExisting = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.update({
                where: {
                    id: match.id
                },
                data: {
                    fingerprintHash: fp.fingerprintHash,
                    userAgent: c.userAgent,
                    screenSummary: c.screen
                }
            });
            reconciledFromExisting = true;
        }
    }
    const events = [];
    if (effectiveExisting) {
        if (effectiveExisting.revoked) {
            // A revoked device is trying to log in again — log as critical.
            events.push({
                type: 'login.failed',
                severity: 'critical',
                message: `Login attempt from revoked device "${effectiveExisting.label || effectiveExisting.osGuess + ' ' + effectiveExisting.browserGuess}"`,
                metadata: {
                    reason: 'device_revoked',
                    fingerprintHash: fp.fingerprintHash,
                    ip: effectiveIp
                }
            });
            // Don't update the device record (keep it revoked).
            await Promise.all(events.map((e)=>logSecurityEvent(userId, e.type, {
                    ...e,
                    ip: effectiveIp,
                    ua,
                    fingerprintHash: fp.fingerprintHash
                })));
            return effectiveExisting;
        }
        // Existing trusted device — update fields.
        const newTrustScore = Math.min(100, effectiveExisting.trustScore + 1);
        events.push({
            type: 'login.success',
            severity: 'info',
            message: `Login from known ${effectiveExisting.osGuess} ${effectiveExisting.browserGuess}`,
            metadata: {
                ip: effectiveIp,
                fingerprintHash: fp.fingerprintHash
            }
        });
        if (reconciledFromExisting) {
            // We re-homed a duplicate row to the new stable fingerprintHash. Log
            // an info event so the user can see in their security log that the
            // migration happened — but NOT a 'device.new' event (this isn't a new
            // device, it's the same physical device with a refreshed hash).
            events.push({
                type: 'device.trust_changed',
                severity: 'info',
                message: `Reconciled device fingerprint for ${effectiveExisting.osGuess} ${effectiveExisting.browserGuess} (same physical device, hash refreshed)`,
                metadata: {
                    previousFingerprintHash: effectiveExisting.fingerprintHash,
                    newFingerprintHash: fp.fingerprintHash,
                    reason: 'stable_class_match',
                    sessionFingerprint: fp.sessionFingerprint
                }
            });
        }
        if (effectiveExisting.lastIp && effectiveExisting.lastIp !== effectiveIp && !isPrivateIp(effectiveIp)) {
            // Look up the new location so we can include it in the alert message
            // (like Telegram's "New sign-in from Cairo, Egypt" notification).
            const newGeo = await resolveLocation(effectiveIp);
            const oldGeo = effectiveExisting.lastGeo || 'unknown location';
            // Only emit a location-change alert if we actually resolved a new
            // location that differs from the old one. Otherwise we'd spam alerts
            // whenever the IP cycles within the same network.
            if (newGeo && newGeo !== oldGeo) {
                events.push({
                    type: 'location.anomaly',
                    severity: 'warn',
                    message: `Location changed for device "${effectiveExisting.label || effectiveExisting.browserGuess}" — was ${oldGeo}, now ${newGeo}`,
                    metadata: {
                        previousIp: effectiveExisting.lastIp,
                        newIp: effectiveIp,
                        previousGeo: effectiveExisting.lastGeo,
                        newGeo,
                        fingerprintHash: fp.fingerprintHash
                    }
                });
            }
        }
        // Refresh geo when IP changed OR when geo is empty (e.g., previous lookup
        // failed or this is the first verify after a server restart that cleared
        // the in-memory cache). Otherwise keep the existing value.
        const shouldRefreshGeo = !effectiveExisting.lastGeo || effectiveExisting.lastIp !== effectiveIp;
        const geo = shouldRefreshGeo ? await resolveLocation(effectiveIp) : effectiveExisting.lastGeo;
        const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.update({
            where: {
                id: effectiveExisting.id
            },
            data: {
                lastSeenAt: new Date(),
                lastIp: effectiveIp,
                lastGeo: geo,
                loginCount: {
                    increment: 1
                },
                trustScore: newTrustScore,
                userAgent: c.userAgent,
                platform: c.platform,
                osGuess: c.osGuess,
                browserGuess: c.browserGuess,
                screenSummary: c.screen,
                timezone: c.timezone
            }
        });
        await Promise.all(events.map((e)=>logSecurityEvent(userId, e.type, {
                ...e,
                ip: effectiveIp,
                ua,
                fingerprintHash: fp.fingerprintHash
            })));
        return updated;
    }
    // Brand-new device for this user.
    const geo = await resolveLocation(effectiveIp);
    const created = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.create({
        data: {
            userId,
            fingerprintHash: fp.fingerprintHash,
            userAgent: c.userAgent,
            platform: c.platform,
            osGuess: c.osGuess,
            browserGuess: c.browserGuess,
            screenSummary: c.screen,
            timezone: c.timezone,
            trustScore: 50,
            revoked: false,
            lastSeenAt: new Date(),
            lastIp: effectiveIp,
            lastGeo: geo,
            loginCount: 1
        }
    });
    events.push({
        type: 'device.new',
        severity: 'warn',
        message: `New device signed in: ${c.osGuess} ${c.browserGuess} from ${geo || effectiveIp}`,
        metadata: {
            ip: effectiveIp,
            geo,
            fingerprintHash: fp.fingerprintHash,
            os: c.osGuess,
            browser: c.browserGuess,
            screen: c.screen,
            timezone: c.timezone
        }
    });
    events.push({
        type: 'login.success',
        severity: 'info',
        message: `Login from new ${c.osGuess} ${c.browserGuess}`,
        metadata: {
            ip: effectiveIp,
            fingerprintHash: fp.fingerprintHash
        }
    });
    await Promise.all(events.map((e)=>logSecurityEvent(userId, e.type, {
            ...e,
            ip: effectiveIp,
            ua,
            fingerprintHash: fp.fingerprintHash
        })));
    return created;
}
async function revokeDevice(userId, fingerprintHash, reason) {
    const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.updateMany({
        where: {
            userId,
            fingerprintHash,
            revoked: false
        },
        data: {
            revoked: true,
            revokedAt: new Date(),
            revokedReason: reason,
            trustScore: 0
        }
    });
    if (updated.count > 0) {
        await logSecurityEvent(userId, 'device.revoked', {
            severity: 'warn',
            message: `Device revoked: ${reason}`,
            metadata: {
                fingerprintHash,
                reason
            },
            ip: '',
            ua: '',
            fingerprintHash
        });
    }
    return updated.count;
}
async function isDeviceRevoked(userId, fingerprintHash) {
    const row = await db.deviceFingerprint.findUnique({
        where: {
            userId_fingerprintHash: {
                userId,
                fingerprintHash
            }
        },
        select: {
            revoked: true
        }
    });
    return row?.revoked ?? false;
}
async function listUserDevices(userId) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.deviceFingerprint.findMany({
        where: {
            userId
        },
        orderBy: {
            lastSeenAt: 'desc'
        }
    });
}
async function logSecurityEvent(userId, eventType, opts = {}) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.securityEvent.create({
        data: {
            userId,
            eventType,
            severity: opts.severity || 'info',
            message: opts.message || '',
            metadata: JSON.stringify(opts.metadata || {}),
            ipAddress: opts.ip || '',
            userAgent: opts.ua || '',
            fingerprintHash: opts.fingerprintHash || ''
        }
    });
}
async function listSecurityEvents(userId, opts = {}) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.securityEvent.findMany({
        where: {
            userId,
            ...opts.unreadOnly ? {
                readAt: null
            } : {},
            ...opts.severity ? {
                severity: opts.severity
            } : {}
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: Math.min(opts.limit || 50, 200)
    });
}
async function markEventRead(userId, eventId) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.securityEvent.updateMany({
        where: {
            id: eventId,
            userId
        },
        data: {
            readAt: new Date()
        }
    });
}
async function markAllEventsRead(userId) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.securityEvent.updateMany({
        where: {
            userId,
            readAt: null
        },
        data: {
            readAt: new Date()
        }
    });
}
/**
 * Get the request IP from Next.js headers.
 *
 * Tries (in order):
 *   1. x-forwarded-for: takes the LEFTMOST PUBLIC IP in the chain (skipping
 *      loopback/private IPs that some proxies prepend).
 *   2. cf-connecting-ip (Cloudflare)
 *   3. true-client-ip (Akamai / Cloudflare Enterprise)
 *   4. x-real-ip (Nginx standard)
 *   5. x-client-ip (generic)
 *
 * Note: when the reverse proxy in front of this app rewrites XFF to its own
 * internal IP (as happens in some preview environments), this function
 * returns '' and the caller falls back to the browser's IANA timezone for
 * an approximate "City, Country" string. The browser is never asked to
 * report its own IP — that's an anti-pattern (clients can lie, and calling
 * a third-party IP echo service from the browser is unprofessional).
 */ function getRequestIp(req) {
    const candidates = [];
    const xff = req.headers.get('x-forwarded-for');
    if (xff) {
        // XFF is "client, proxy1, proxy2" — take the LEFTMOST PUBLIC IP.
        // Some proxies prepend the immediate hop's IP, which may be private;
        // we walk the chain left-to-right and pick the first public IP.
        for (const part of xff.split(',')){
            const ip = part.trim();
            if (ip && !isPrivateIp(ip)) {
                candidates.push(ip);
                break;
            }
        }
    // If ALL XFF entries were private (unusual but possible), fall through
    // to other headers.
    }
    // Single-IP headers (no chain parsing needed)
    const singleHeaders = [
        'cf-connecting-ip',
        'true-client-ip',
        'x-real-ip',
        'x-client-ip'
    ];
    for (const h of singleHeaders){
        const v = req.headers.get(h);
        if (v && !isPrivateIp(v.trim())) {
            candidates.push(v.trim());
            break;
        }
    }
    // Return the first candidate that's not private. If we found nothing,
    // return '' — the caller (recordDeviceLogin) will then prefer the
    // client-detected IP from the fingerprint payload.
    return candidates.find((c)=>!isPrivateIp(c)) ?? '';
}
function getRequestUa(req) {
    return req.headers.get('user-agent') || '';
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;