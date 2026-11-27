"use strict";
(() => {
var exports = {};
exports.id = 5511;
exports.ids = [5511,8753];
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

/***/ 245187:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGuestUserId: () => (/* binding */ getGuestUserId)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const GUEST_EMAIL = 'guest@medq.local';
let cachedGuestId = null;
let guestInitPromise = null;
const WELCOME_BONUS = 25;
/**
 * Returns the ID of the default "guest" user.
 * Creates the guest user (and their subscription + wallet) on first call.
 * Uses a singleton promise to prevent race conditions from parallel calls.
 */ async function getGuestUserId() {
    if (cachedGuestId) return cachedGuestId;
    // Re-use the same promise for concurrent callers (prevents race conditions)
    if (!guestInitPromise) {
        guestInitPromise = _initGuestUser();
    }
    return guestInitPromise;
}
async function _initGuestUser() {
    if (cachedGuestId) return cachedGuestId;
    let user = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.user.findUnique({
        where: {
            email: GUEST_EMAIL
        }
    });
    if (!user) {
        user = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.user.create({
            data: {
                email: GUEST_EMAIL,
                name: 'Guest',
                role: 'student',
                onboardingCompleted: true
            }
        });
        // Ensure subscription exists
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.subscription.upsert({
            where: {
                userId: user.id
            },
            update: {},
            create: {
                userId: user.id,
                tier: 'free',
                status: 'active',
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
    }
    // Ensure wallet with welcome bonus — also fixes existing guest users with 0 balance
    const existingWallet = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.findUnique({
        where: {
            userId: user.id
        }
    });
    if (!existingWallet) {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.create({
            data: {
                userId: user.id,
                balance: WELCOME_BONUS,
                totalEarned: WELCOME_BONUS,
                totalSpent: 0
            }
        });
    } else if (existingWallet.balance === 0 && existingWallet.totalEarned === 0) {
        // Migrate: existing guest user with 0 credits → grant welcome bonus
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.update({
            where: {
                id: existingWallet.id
            },
            data: {
                balance: WELCOME_BONUS,
                totalEarned: WELCOME_BONUS,
                updatedAt: new Date()
            }
        });
    }
    // Ensure welcome bonus transaction exists (use findFirst to avoid duplicates)
    const existingTx = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.findFirst({
        where: {
            userId: user.id,
            category: 'welcome_bonus'
        }
    });
    if (!existingTx) {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.create({
            data: {
                userId: user.id,
                type: 'admin_grant',
                amount: WELCOME_BONUS,
                balance: WELCOME_BONUS,
                category: 'welcome_bonus',
                description: 'Welcome bonus - 25 free credits!'
            }
        });
    }
    cachedGuestId = user.id;
    return user.id;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 256369:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_payments_stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(637264);
/* harmony import */ var _lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(348753);
/* harmony import */ var _lib_subscription_tiers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(282958);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






/**
 * Stripe Webhook handler.
 *
 * Verified events:
 *   - checkout.session.completed       → fulfill subscription or credit package
 *   - customer.subscription.updated    → sync status, currentPeriodEnd, cancelAtPeriodEnd
 *   - customer.subscription.deleted    → downgrade to free
 *
 * In mock mode, this endpoint is unreachable (mock fulfillment happens in
 * /api/payments/mock-success). But it's registered so production deploys
 * "just work" once STRIPE_SECRET_KEY is set.
 *
 * CRITICAL: the raw body must be readable. Next.js 16 in App Router buffers
 * the body for `request.body` access — we use `request.text()` and pass the
 * raw string to constructEvent. Do NOT JSON.parse the body first.
 */ async function POST(request) {
    if (!(0,_lib_payments_stripe__WEBPACK_IMPORTED_MODULE_2__/* .isStripeConfigured */ .w5)()) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Stripe not configured — webhook endpoint is disabled in mock mode.'
        }, {
            status: 503
        });
    }
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Missing stripe-signature header'
        }, {
            status: 400
        });
    }
    const rawBody = await request.text();
    let event;
    try {
        event = await (0,_lib_payments_stripe__WEBPACK_IMPORTED_MODULE_2__/* .constructWebhookEvent */ .ZW)(rawBody, signature);
    } catch (err) {
        console.error('[stripe/webhook] Signature verification failed:', err.message);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: `Webhook signature verification failed: ${err.message}`
        }, {
            status: 400
        });
    }
    if (!event) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Webhook event was null'
        }, {
            status: 400
        });
    }
    try {
        switch(event.type){
            case 'checkout.session.completed':
                {
                    const session = event.data.object;
                    await fulfillOrder(session);
                    break;
                }
            case 'customer.subscription.updated':
                {
                    const sub = event.data.object;
                    await syncSubscription(sub);
                    break;
                }
            case 'customer.subscription.deleted':
                {
                    const sub = event.data.object;
                    await downgradeOnCancel(sub);
                    break;
                }
            default:
                break;
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            received: true,
            type: event.type
        });
    } catch (err) {
        console.error('[stripe/webhook] Fulfillment error:', err);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: `Webhook fulfillment failed: ${err.message}`
        }, {
            status: 500
        });
    }
}
/**
 * Fulfill a paid checkout session. Looks up the PaymentOrder by either
 * Stripe session id (production) or client_reference_id (mock). For
 * subscriptions: sets the user's tier. For credit packages: grants credits.
 */ async function fulfillOrder(session) {
    const orderId = session.client_reference_id || session.metadata?.orderId;
    if (!orderId) {
        console.error('[stripe/webhook] No orderId in session metadata');
        return;
    }
    const order = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.paymentOrder.findUnique({
        where: {
            id: orderId
        }
    });
    if (!order) {
        console.error(`[stripe/webhook] PaymentOrder ${orderId} not found`);
        return;
    }
    if (order.status === 'paid') {
        // Already fulfilled (idempotency — Stripe can retry).
        return;
    }
    // Mark the order as paid.
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.paymentOrder.update({
        where: {
            id: order.id
        },
        data: {
            status: 'paid',
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: session.payment_intent || '',
            paidAt: new Date()
        }
    });
    if (order.kind === 'subscription' && (0,_lib_subscription_tiers__WEBPACK_IMPORTED_MODULE_4__/* .isValidTier */ .Rg)(order.referenceId)) {
        // Upgrade the user's tier.
        await (0,_lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__/* .setTier */ .Vx)(order.referenceId, order.userId);
        // Persist the Stripe customer + subscription ids so we can later manage
        // the subscription via the Billing Portal.
        const stripeSubId = session.subscription;
        const stripeCustomerId = session.customer;
        if (stripeSubId || stripeCustomerId) {
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.subscription.update({
                where: {
                    userId: order.userId
                },
                data: {
                    ...stripeCustomerId ? {
                        stripeCustomerId
                    } : {},
                    ...stripeSubId ? {
                        stripeSubscriptionId: stripeSubId
                    } : {},
                    stripePriceId: order.referenceId === 'pro' ? process.env.STRIPE_PRICE_PRO || '' : process.env.STRIPE_PRICE_PREMIUM || '',
                    status: 'active',
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                }
            });
        }
        // Grant the monthly credit allowance as a one-time bonus on upgrade.
        if (order.credits > 0) {
            await (0,_lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__.earnCredits)(order.credits, 'subscription_bonus', `${order.referenceId} tier bonus — ${order.credits} credits`, order.id, order.userId);
        }
    } else if (order.kind === 'credits' && order.credits > 0) {
        // Grant the purchased credits.
        await (0,_lib_freemium_store__WEBPACK_IMPORTED_MODULE_3__.earnCredits)(order.credits, 'purchase', `Purchased ${order.credits} credits (package: ${order.referenceId})`, order.id, order.userId);
    }
}
/**
 * Sync subscription status from Stripe's `customer.subscription.updated` event.
 */ async function syncSubscription(sub) {
    const stripeCustomerId = sub.customer;
    if (!stripeCustomerId) return;
    // Find the user's subscription row by stripeCustomerId.
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.subscription.findFirst({
        where: {
            stripeCustomerId
        }
    });
    if (!existing) return;
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.subscription.update({
        where: {
            id: existing.id
        },
        data: {
            status: sub.status === 'active' ? 'active' : sub.status === 'past_due' ? 'past_due' : sub.status === 'canceled' ? 'expired' : 'active',
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : existing.currentPeriodEnd,
            cancelAtPeriodEnd: !!sub.cancel_at_period_end,
            stripePriceId: sub.items?.data?.[0]?.price?.id ?? existing.stripePriceId
        }
    });
}
/**
 * Downgrade the user to free when their subscription is deleted (cancelled).
 */ async function downgradeOnCancel(sub) {
    const stripeCustomerId = sub.customer;
    if (!stripeCustomerId) return;
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.subscription.findFirst({
        where: {
            stripeCustomerId
        }
    });
    if (!existing) return;
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.subscription.update({
        where: {
            id: existing.id
        },
        data: {
            tier: 'free',
            status: 'expired',
            stripeSubscriptionId: '',
            cancelAtPeriodEnd: false,
            currentPeriodEnd: new Date()
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 282958:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AI_TOOL_CATEGORIES: () => (/* binding */ AI_TOOL_CATEGORIES),
/* harmony export */   Rg: () => (/* binding */ isValidTier),
/* harmony export */   canUseTool: () => (/* binding */ canUseTool),
/* harmony export */   ss: () => (/* binding */ getTierDefinition)
/* harmony export */ });
/* unused harmony exports AI_TOOL_IDS, getTierDefinitions, getTierList, _resetTierCache */
/**
 * Subscription tier definitions & feature gating rules.
 *
 * Three tiers:
 *   - free     — $0/mo, daily-limited access to every AI tool, banner ads
 *   - premium  — $9.99/mo, 20x higher daily limits, no banner ads, priority support
 *   - pro      — $19.99/mo, effectively-unlimited daily limits, no ads at all,
 *                early-access features, monthly credit allowance
 *
 * Daily limits live in LIMITS (mirrored from src/lib/freemium-store.ts). They
 * are per-category per-day counters persisted in the UsageRecord table. When a
 * user hits their daily limit, they can either:
 *   - wait for the next UTC day (limit resets), OR
 *   - spend credits from their CreditWallet to unlock more actions of the
 *     same category (see src/lib/subscription/credits.ts → debitAICredits).
 *
 * Pro tier limits are set to 999999 (effectively unlimited). Stripe handles
 * the actual hard cap on Pro monthly usage via the metered billing API (TBD).
 *
 * Stripe price IDs are loaded from env (STRIPE_PRICE_PREMIUM, STRIPE_PRICE_PRO).
 * If unset, the checkout flow falls back to "mock mode" — see
 * src/lib/payments/stripe.ts → isStripeConfigured().
 */ /**
 * All 14 AI tools gated behind `premium: true` in MedQAppShell.tsx.
 * Used as the canonical list when checking feature access. Maps tool ID →
 * usage-tracking category (the same category stored in UsageRecord.category).
 */ const AI_TOOL_CATEGORIES = {
    generate: 'ai_generations',
    tutor: 'tutor_messages',
    cases: 'case_simulations',
    mnemonics: 'mnemonics',
    'image-analyzer': 'image_analyzer',
    voice: 'voice_study',
    files: 'ai_generations',
    video: 'video_lessons',
    'board-prep': 'board_prep_sessions',
    anatomy: 'anatomy_visuals',
    'clinical-vignettes': 'clinical_vignettes',
    'whiteboard-studio': 'whiteboard_studio',
    'video-library': 'video_library',
    planner: 'study_planner'
};
const AI_TOOL_IDS = Object.keys(AI_TOOL_CATEGORIES);
/**
 * Daily-limit values per tier. Must stay in sync with LIMITS in
 * src/lib/freemium-store.ts. Duplicated here so the tier definitions file is
 * the single source of truth for *what each tier gets*.
 */ const FREE_LIMITS = {
    ai_generations: 5,
    tutor_messages: 10,
    video_lessons: 1,
    case_simulations: 2,
    flashcard_decks: 3,
    image_analyzer: 3,
    voice_study: 5,
    board_prep_sessions: 1,
    mnemonics: 3,
    anatomy_visuals: 2,
    study_planner: 3,
    clinical_vignettes: 1,
    whiteboard_studio: 1,
    video_library: 2
};
const PREMIUM_LIMITS = Object.fromEntries(Object.entries(FREE_LIMITS).map(([k, v])=>[
        k,
        Math.max(20, v * 20)
    ]));
const PRO_LIMITS = Object.fromEntries(Object.keys(FREE_LIMITS).map((k)=>[
        k,
        999999
    ]));
function priceIdFromEnv(key) {
    // env is only readable at runtime on the server. This function is invoked
    // lazily inside getTierDefinition() so it's safe to call from client code
    // (the result is "no price id" on the client).
    if (typeof process === 'undefined') return '';
    return process.env[key] ?? '';
}
let _cachedTiers = null;
function getTierDefinitions() {
    if (_cachedTiers) return _cachedTiers;
    _cachedTiers = {
        free: {
            id: 'free',
            name: 'Free',
            tagline: 'Get started, no credit card required',
            priceUsd: 0,
            currency: 'usd',
            interval: 'forever',
            monthlyCreditAllowance: 25,
            features: [
                '5 AI question generations / day',
                '10 AI tutor messages / day',
                '1 video lesson / day',
                '2 case simulations / day',
                '3 flashcard decks / day',
                'Banner ads (removable with credits)',
                'Earn credits by watching rewarded ads',
                'Community access'
            ],
            adFree: false,
            adFreeAll: false,
            limits: FREE_LIMITS,
            stripePriceId: '',
            accentColor: '#5a6478'
        },
        premium: {
            id: 'premium',
            name: 'Premium',
            tagline: 'For serious medical students',
            priceUsd: 9.99,
            currency: 'usd',
            interval: 'month',
            monthlyCreditAllowance: 250,
            features: [
                '100 AI question generations / day',
                '100 AI tutor messages / day',
                'Unlimited video lessons',
                'Unlimited case simulations',
                'No banner ads',
                'Priority email support',
                'Advanced analytics dashboard',
                '250 bonus credits / month',
                'Custom study themes'
            ],
            adFree: true,
            adFreeAll: false,
            limits: PREMIUM_LIMITS,
            stripePriceId: priceIdFromEnv('STRIPE_PRICE_PREMIUM'),
            accentColor: '#8b5cf6',
            popular: true
        },
        pro: {
            id: 'pro',
            name: 'Pro',
            tagline: 'Maximum power for board prep',
            priceUsd: 19.99,
            currency: 'usd',
            interval: 'month',
            monthlyCreditAllowance: 1000,
            features: [
                'Unlimited AI generations',
                'Unlimited AI tutor messages',
                'Unlimited everything',
                'No ads of any kind',
                'Early access to new features',
                'Dedicated support channel',
                '1000 bonus credits / month',
                'Custom study plans & schedules',
                'API access (coming soon)',
                'Revenue dashboard'
            ],
            adFree: true,
            adFreeAll: true,
            limits: PRO_LIMITS,
            stripePriceId: priceIdFromEnv('STRIPE_PRICE_PRO'),
            accentColor: '#f59e0b'
        }
    };
    return _cachedTiers;
}
function getTierDefinition(tier) {
    return getTierDefinitions()[tier];
}
function getTierList() {
    const defs = getTierDefinitions();
    return [
        defs.free,
        defs.premium,
        defs.pro
    ];
}
function isValidTier(tier) {
    return tier === 'free' || tier === 'premium' || tier === 'pro';
}
/**
 * Returns true if the user on `tier` can use `toolId` without spending
 * credits — i.e. they're under their daily limit for that category.
 *
 * Usage:
 *   const { allowed, reason, category, used, limit } = canUseTool('premium', 'generate', 5);
 *   if (!allowed && reason === 'limit_reached') { /* prompt credit spend *\/ }
 */ function canUseTool(tier, toolId, currentUsageCount) {
    const category = AI_TOOL_CATEGORIES[toolId];
    if (!category) return {
        allowed: false,
        reason: 'unknown_tool',
        category: '',
        used: 0,
        limit: 0
    };
    const def = getTierDefinition(tier);
    const limit = def.limits[category] ?? 0;
    const allowed = currentUsageCount < limit;
    return {
        allowed,
        reason: allowed ? 'ok' : 'limit_reached',
        category,
        used: currentUsageCount,
        limit
    };
}
/**
 * Reset the tier-definition cache. Only used in tests.
 */ function _resetTierCache() {
    _cachedTiers = null;
}


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

/***/ 348753:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ci: () => (/* binding */ getRevenueStats),
/* harmony export */   EL: () => (/* binding */ canAwardAdReward),
/* harmony export */   Ev: () => (/* binding */ seedAdCampaigns),
/* harmony export */   G3: () => (/* binding */ getCreditHistory),
/* harmony export */   N: () => (/* binding */ getAllUsage),
/* harmony export */   T6: () => (/* binding */ trackAdClick),
/* harmony export */   U7: () => (/* binding */ trackAdImpression),
/* harmony export */   Vx: () => (/* binding */ setTier),
/* harmony export */   e6: () => (/* binding */ getAdCampaign),
/* harmony export */   earnCredits: () => (/* binding */ earnCredits),
/* harmony export */   getCredits: () => (/* binding */ getCredits),
/* harmony export */   getTier: () => (/* binding */ getTier),
/* harmony export */   getUsage: () => (/* binding */ getUsage),
/* harmony export */   incrementUsage: () => (/* binding */ incrementUsage),
/* harmony export */   spendCredits: () => (/* binding */ spendCredits)
/* harmony export */ });
/* unused harmony exports LIMITS, isLimited, getAdsWatchedToday */
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_guest_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(245187);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__, _lib_guest_user__WEBPACK_IMPORTED_MODULE_1__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_0__, _lib_guest_user__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const LIMITS = {
    free: {
        ai_generations: 5,
        tutor_messages: 10,
        video_lessons: 1,
        case_simulations: 2,
        flashcard_decks: 3,
        image_analyzer: 3,
        voice_study: 5,
        board_prep_sessions: 1,
        mnemonics: 3,
        anatomy_visuals: 2,
        study_planner: 3
    },
    premium: {
        ai_generations: 100,
        tutor_messages: 100,
        video_lessons: 100,
        case_simulations: 100,
        flashcard_decks: 100,
        image_analyzer: 100,
        voice_study: 100,
        board_prep_sessions: 100,
        mnemonics: 100,
        anatomy_visuals: 100,
        study_planner: 100
    },
    pro: {
        ai_generations: 999999,
        tutor_messages: 999999,
        video_lessons: 999999,
        case_simulations: 999999,
        flashcard_decks: 999999,
        image_analyzer: 999999,
        voice_study: 999999,
        board_prep_sessions: 999999,
        mnemonics: 999999,
        anatomy_visuals: 999999,
        study_planner: 999999
    }
};
function getTodayKey() {
    return new Date().toISOString().split('T')[0];
}
function isValidTier(tier) {
    return [
        'free',
        'premium',
        'pro'
    ].includes(tier);
}
// ── User-scoped helpers ──
async function ensureSubscription(userId) {
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    let sub = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.subscription.findUnique({
        where: {
            userId: uid
        }
    });
    if (!sub) {
        sub = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.subscription.create({
            data: {
                userId: uid,
                tier: 'free',
                status: 'active',
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
    }
    return sub;
}
async function ensureWallet(userId) {
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    let wallet = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.findUnique({
        where: {
            userId: uid
        }
    });
    if (!wallet) {
        wallet = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.create({
            data: {
                userId: uid,
                balance: 25,
                totalEarned: 25,
                totalSpent: 0
            }
        });
        // Log welcome bonus credit transaction (idempotent check)
        const existingTx = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.findFirst({
            where: {
                userId: uid,
                category: 'welcome_bonus'
            }
        });
        if (!existingTx) {
            await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.create({
                data: {
                    userId: uid,
                    type: 'admin_grant',
                    amount: 25,
                    balance: 25,
                    category: 'welcome_bonus',
                    description: 'Welcome bonus - 25 free credits!'
                }
            });
        }
    }
    return wallet;
}
// ── Legacy unscoped helpers now delegate to ensureSubscription/ensureWallet with guest user ──
async function ensureSubscriptionAnon() {
    return ensureSubscription();
}
async function ensureWalletAnon() {
    return ensureWallet();
}
// ── Tier Management ──
async function getTier(userId) {
    const sub = userId ? await ensureSubscription(userId) : await ensureSubscriptionAnon();
    return isValidTier(sub.tier) ? sub.tier : 'free';
}
async function setTier(tier, userId) {
    const sub = userId ? await ensureSubscription(userId) : await ensureSubscriptionAnon();
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.subscription.update({
        where: {
            id: sub.id
        },
        data: {
            tier,
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date()
        }
    });
}
// ── Usage Tracking ──
async function getUsage(category, userId) {
    const today = getTodayKey();
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const tier = await getTier(uid);
    const limit = LIMITS[tier]?.[category] ?? 5;
    const where = {
        date: today,
        category,
        userId: uid
    };
    const record = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.usageRecord.findFirst({
        where
    });
    return {
        used: record?.count ?? 0,
        limit
    };
}
async function getAllUsage(userId) {
    const today = getTodayKey();
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const tier = await getTier(uid);
    const limits = LIMITS[tier];
    const where = {
        date: today,
        userId: uid
    };
    const records = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.usageRecord.findMany({
        where
    });
    const usageMap = {};
    for (const r of records)usageMap[r.category] = r.count;
    const result = {};
    for (const key of Object.keys(limits)){
        result[key] = {
            used: usageMap[key] || 0,
            limit: limits[key]
        };
    }
    return result;
}
async function incrementUsage(category, userId) {
    const today = getTodayKey();
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const tier = await getTier(uid);
    const limit = LIMITS[tier]?.[category] ?? 5;
    // Try to find existing record
    const where = {
        date: today,
        category,
        userId: uid
    };
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.usageRecord.findFirst({
        where
    });
    if (existing) {
        if (existing.count >= limit) return {
            used: existing.count,
            limit
        };
        const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.usageRecord.update({
            where: {
                id: existing.id
            },
            data: {
                count: existing.count + 1,
                updatedAt: new Date()
            }
        });
        return {
            used: updated.count,
            limit
        };
    }
    // Create new record
    const data = {
        userId: uid,
        date: today,
        category,
        count: 1
    };
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.usageRecord.create({
        data
    });
    return {
        used: 1,
        limit
    };
}
async function isLimited(category, userId) {
    const { used, limit } = await getUsage(category, userId);
    return used >= limit;
}
// ── Credits ──
async function getCredits(userId) {
    const wallet = userId ? await ensureWallet(userId) : await ensureWalletAnon();
    return {
        balance: wallet.balance,
        totalEarned: wallet.totalEarned,
        totalSpent: wallet.totalSpent
    };
}
async function earnCredits(amount, type, description, referenceId, userId) {
    if (amount <= 0) throw new Error('Amount must be positive');
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const wallet = await ensureWallet(uid);
    const newBalance = wallet.balance + amount;
    const newTotalEarned = wallet.totalEarned + amount;
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.update({
        where: {
            id: wallet.id
        },
        data: {
            balance: newBalance,
            totalEarned: newTotalEarned,
            updatedAt: new Date()
        }
    });
    const txData = {
        userId: uid,
        type,
        amount,
        balance: newBalance,
        description,
        referenceId: referenceId || ''
    };
    const transaction = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.create({
        data: txData
    });
    return {
        balance: newBalance,
        transactionId: transaction.id
    };
}
async function spendCredits(amount, category, description, userId) {
    if (amount <= 0) throw new Error('Amount must be positive');
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const wallet = await ensureWallet(uid);
    if (wallet.balance < amount) return {
        success: false,
        balance: wallet.balance
    };
    const newBalance = wallet.balance - amount;
    const newTotalSpent = wallet.totalSpent + amount;
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.update({
        where: {
            id: wallet.id
        },
        data: {
            balance: newBalance,
            totalSpent: newTotalSpent,
            updatedAt: new Date()
        }
    });
    const txData = {
        userId: uid,
        type: 'spend_feature',
        amount: -amount,
        balance: newBalance,
        category,
        description
    };
    const transaction = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.create({
        data: txData
    });
    return {
        success: true,
        balance: newBalance,
        transactionId: transaction.id
    };
}
async function getCreditHistory(limit = 20, userId) {
    const where = {};
    if (userId) where.userId = userId;
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}
// ── Ad System ──
async function getAdCampaign(placement) {
    const now = new Date();
    const campaign = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.findFirst({
        where: {
            placement,
            status: 'active',
            startDate: {
                lte: now
            },
            OR: [
                {
                    endDate: null
                },
                {
                    endDate: {
                        gte: now
                    }
                }
            ]
        },
        orderBy: {
            priority: 'desc'
        }
    });
    if (campaign) return campaign;
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.findFirst({
        where: {
            status: 'active',
            startDate: {
                lte: now
            },
            OR: [
                {
                    endDate: null
                },
                {
                    endDate: {
                        gte: now
                    }
                }
            ]
        },
        orderBy: {
            priority: 'desc'
        }
    });
}
async function getAdsWatchedToday(userId) {
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adImpression.count({
        where: {
            userId: uid,
            rewarded: true,
            createdAt: {
                gte: startOfDay
            }
        }
    });
}
async function canAwardAdReward(userId, limit = 5) {
    return await getAdsWatchedToday(userId) < limit;
}
async function updateTodayRevenue(data) {
    const today = getTodayKey();
    let record = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.revenueRecord.findUnique({
        where: {
            date: today
        }
    });
    if (!record) {
        record = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.revenueRecord.create({
            data: {
                date: today
            }
        });
    }
    const updateData = {
        updatedAt: new Date()
    };
    if (data.impressions) updateData.adImpressions = {
        increment: data.impressions
    };
    if (data.clicks) updateData.adClicks = {
        increment: data.clicks
    };
    if (data.adRevenue) updateData.adRevenue = {
        increment: data.adRevenue
    };
    if (data.subscriptionRevenue) updateData.subscriptionRev = {
        increment: data.subscriptionRevenue
    };
    const newAdRev = record.adRevenue + (data.adRevenue ?? 0);
    const newSubRev = record.subscriptionRev + (data.subscriptionRevenue ?? 0);
    updateData.totalRevenue = newAdRev + newSubRev;
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.revenueRecord.update({
        where: {
            date: today
        },
        data: updateData
    });
}
async function trackAdImpression(campaignId, adType, placement, userId) {
    const uid = userId || await (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
    const campaign = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.findUnique({
        where: {
            id: campaignId
        }
    });
    const cpm = campaign?.cpm ?? 0;
    const revenuePerImpression = cpm / 1000;
    const impData = {
        userId: uid,
        campaignId,
        adType,
        placement,
        revenue: revenuePerImpression
    };
    const impression = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adImpression.create({
        data: impData
    });
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.update({
        where: {
            id: campaignId
        },
        data: {
            impressions: {
                increment: 1
            },
            revenue: {
                increment: revenuePerImpression
            },
            updatedAt: new Date()
        }
    });
    await updateTodayRevenue({
        impressions: 1,
        adRevenue: revenuePerImpression
    });
    return impression;
}
async function trackAdClick(impressionId) {
    const impression = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adImpression.findUnique({
        where: {
            id: impressionId
        }
    });
    if (!impression) throw new Error('Impression not found');
    if (impression.clicked) return impression;
    const campaign = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.findUnique({
        where: {
            id: impression.campaignId
        }
    });
    const cpc = campaign?.cpc ?? 0;
    const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adImpression.update({
        where: {
            id: impressionId
        },
        data: {
            clicked: true
        }
    });
    if (campaign) {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.update({
            where: {
                id: campaign.id
            },
            data: {
                clicks: {
                    increment: 1
                },
                revenue: {
                    increment: cpc
                },
                updatedAt: new Date()
            }
        });
    }
    await updateTodayRevenue({
        clicks: 1,
        adRevenue: cpc
    });
    return updated;
}
async function getRevenueStats(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];
    return _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.revenueRecord.findMany({
        where: {
            date: {
                gte: startDateStr
            }
        },
        orderBy: {
            date: 'desc'
        }
    });
}
async function seedAdCampaigns() {
    const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.count();
    if (existing > 0) return;
    const campaigns = [
        {
            name: 'MedBoard Prep',
            advertiser: 'MedBoard Inc.',
            adType: 'banner',
            placement: 'dashboard_top',
            cpm: 8,
            cpc: 0.3,
            title: 'Ace Your Board Exams',
            subtitle: '2,000+ practice questions with detailed explanations',
            ctaText: 'Start Free Trial',
            priority: 10
        },
        {
            name: 'Picmonic',
            advertiser: 'Picmonic Inc.',
            adType: 'banner',
            placement: 'tab_bottom',
            cpm: 6,
            cpc: 0.25,
            title: 'Learn with Pictures',
            subtitle: 'Visual mnemonics that stick — research-proven',
            ctaText: 'Try Free',
            priority: 8
        },
        {
            name: 'Osmosis',
            advertiser: 'Osmosis.org',
            adType: 'interstitial',
            placement: 'tab_switch',
            cpm: 12,
            cpc: 0.4,
            title: 'Understand Medicine Faster',
            subtitle: '1,800+ videos, questions, and flashcards',
            ctaText: 'Watch Free',
            priority: 15
        },
        {
            name: 'Anki Deck Pro',
            advertiser: 'AnkiDeck',
            adType: 'rewarded',
            placement: 'dashboard_top',
            cpm: 15,
            cpc: 0.5,
            title: 'Get Premium Flashcards',
            subtitle: 'Curated medical decks with spaced repetition',
            ctaText: 'Watch Ad to Earn',
            priority: 12
        },
        {
            name: 'Sketchy Medical',
            advertiser: 'Sketchy Group',
            adType: 'banner',
            placement: 'quiz_result',
            cpm: 10,
            cpc: 0.35,
            title: 'Story-Based Learning',
            subtitle: 'Unforgettable visual stories for medical topics',
            ctaText: 'Explore Free',
            priority: 9
        },
        {
            name: 'UWorld',
            advertiser: 'UWorld LLC',
            adType: 'interstitial',
            placement: 'tab_switch',
            cpm: 20,
            cpc: 0.6,
            title: '#1 Board Prep Resource',
            subtitle: 'Trusted by 90%+ of medical students nationwide',
            ctaText: 'Start Practicing',
            priority: 20
        },
        {
            name: 'Pathoma',
            advertiser: 'Pathoma',
            adType: 'rewarded',
            placement: 'dashboard_top',
            cpm: 18,
            cpc: 0.75,
            title: 'Fundamentals of Pathology',
            subtitle: 'Dr. Husain Sattar\'s renowned video lectures',
            ctaText: 'Watch Ad to Access',
            priority: 14
        }
    ];
    for (const c of campaigns){
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.adCampaign.create({
            data: {
                ...c,
                status: 'active',
                startDate: new Date()
            }
        });
    }
}

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

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 637264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Xq: () => (/* binding */ getAppUrl),
/* harmony export */   ZW: () => (/* binding */ constructWebhookEvent),
/* harmony export */   fw: () => (/* binding */ createCheckoutSession),
/* harmony export */   oE: () => (/* binding */ createBillingPortalSession),
/* harmony export */   w5: () => (/* binding */ isStripeConfigured)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(265573);
/**
 * Stripe payments integration — REST API, no SDK dependency.
 *
 * This module was reconstructed from its call sites (the original file was
 * missing from the project archive). It keeps the same public API:
 *
 *   isStripeConfigured()              — true when STRIPE_SECRET_KEY is set
 *   getAppUrl()                       — absolute base URL of this deployment
 *   createCheckoutSession(params)     — Stripe Checkout (or mock) URL
 *   createBillingPortalSession(...)   — Billing Portal URL (null in mock mode)
 *   constructWebhookEvent(body, sig)  — signature-verified webhook event
 *
 * ── Mock mode ──────────────────────────────────────────────────────────
 * When STRIPE_SECRET_KEY is unset (or a price ID is missing), checkout
 * degrades to "mock mode": createCheckoutSession returns a URL to
 * /api/payments/mock-success, which fulfills the PaymentOrder immediately
 * (marks it paid, upgrades the tier / grants credits). This lets the full
 * upgrade + credit-purchase flow be exercised without Stripe keys.
 *
 * ── Real mode ──────────────────────────────────────────────────────────
 * Uses Stripe's REST API directly via fetch:
 *   POST /v1/checkout/sessions        — one-time or subscription checkout
 *   POST /v1/billing_portal/sessions  — customer portal
 * Webhook signature verification is done with node:crypto (HMAC-SHA256 over
 * "{t}.{payload}" — see https://docs.stripe.com/webhooks#verify-manually).
 *
 * Env vars (all optional — unset ⇒ mock mode):
 *   STRIPE_SECRET_KEY       sk_live_… / sk_test_…
 *   STRIPE_WEBHOOK_SECRET   whsec_…
 *   STRIPE_PRICE_PREMIUM    price_…   (see src/lib/subscription/tiers.ts)
 *   STRIPE_PRICE_PRO        price_…
 *   STRIPE_PRICE_CREDITS_*  price_…   (see src/lib/subscription/credits.ts)
 *   APP_URL                 https://…  (explicit base URL override)
 */ 

// ── Configuration helpers ──────────────────────────────────────────────────
const STRIPE_API_BASE = "https://api.stripe.com";
function isStripeConfigured() {
    return Boolean(process.env.STRIPE_SECRET_KEY);
}
/**
 * Absolute base URL of this deployment.
 *
 * Priority: APP_URL / NEXT_PUBLIC_APP_URL env → forwarded request headers →
 * http://localhost:3000. The header path works behind the sandbox preview
 * proxy because src/middleware.ts normalizes x-forwarded-host/-proto to the
 * public host on proxied requests.
 *
 * NOTE: headers() is async in Next.js 15+ — it MUST be awaited, otherwise it
 * returns a Promise (no .get method) and the try/catch silently falls back
 * to localhost, which the user's browser cannot reach.
 */ async function getAppUrl() {
    const envUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    if (envUrl) return envUrl.replace(/\/+$/, "");
    try {
        const h = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__/* .headers */ .b3)();
        const host = h.get("x-forwarded-host") ?? h.get("host");
        if (host) {
            const proto = h.get("x-forwarded-proto") ?? "http";
            return `${proto}://${host}`;
        }
    } catch  {
    // Not in a request scope (e.g. called from a script) — fall through.
    }
    return "http://localhost:3000";
}
// ── Stripe REST helper ─────────────────────────────────────────────────────
async function stripeRequest(path, params) {
    const res = await fetch(`${STRIPE_API_BASE}${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(params).toString()
    });
    const json = await res.json().catch(()=>({}));
    if (!res.ok) {
        const message = json?.error?.message ?? `HTTP ${res.status}`;
        throw new Error(`Stripe API error (${path}): ${message}`);
    }
    return json;
}
// ── Checkout ───────────────────────────────────────────────────────────────
async function createCheckoutSession(params) {
    const { orderId, kind, referenceId, userId, stripePriceId, customerEmail } = params;
    const appUrl = await getAppUrl();
    // ── Mock mode: no keys (or no price configured) → immediate fulfillment ──
    if (!isStripeConfigured() || !stripePriceId) {
        return {
            url: `${appUrl}/api/payments/mock-success?order=${encodeURIComponent(orderId)}`,
            mock: true
        };
    }
    // ── Real Stripe Checkout Session ──────────────────────────────────────
    const form = {
        mode: kind === "subscription" ? "subscription" : "payment",
        "line_items[0][price]": stripePriceId,
        "line_items[0][quantity]": "1",
        client_reference_id: orderId,
        "metadata[orderId]": orderId,
        "metadata[userId]": userId,
        "metadata[kind]": kind,
        "metadata[referenceId]": referenceId,
        success_url: `${appUrl}/?payment=success&order=${encodeURIComponent(orderId)}`,
        cancel_url: `${appUrl}/?payment=cancelled`
    };
    if (customerEmail) form.customer_email = customerEmail;
    const session = await stripeRequest("/v1/checkout/sessions", form);
    const url = session.url;
    if (!url) {
        throw new Error("Stripe did not return a checkout URL");
    }
    return {
        url,
        mock: false
    };
}
// ── Billing Portal ─────────────────────────────────────────────────────────
/**
 * Creates a Stripe Billing Portal session for an existing customer.
 * Returns null when Stripe isn't configured or the call fails — callers
 * fall back to the in-app subscription management page.
 */ async function createBillingPortalSession(customerId, returnUrl) {
    if (!isStripeConfigured() || !customerId) return null;
    try {
        const session = await stripeRequest("/v1/billing_portal/sessions", {
            customer: customerId,
            return_url: returnUrl
        });
        const url = session.url;
        return url ? {
            url
        } : null;
    } catch (err) {
        console.error("[stripe] Billing portal session failed:", err);
        return null;
    }
}
// ── Webhook signature verification ─────────────────────────────────────────
/**
 * Verifies a Stripe webhook signature and parses the event.
 *
 * Signature header format: "t=<timestamp>,v1=<hex hmac>"
 * Signed payload:        `${t}.${rawBody}` keyed with STRIPE_WEBHOOK_SECRET.
 *
 * Throws on malformed/mismatched/ stale signatures; returns the parsed event
 * on success, or null when no webhook secret is configured (mock mode).
 */ async function constructWebhookEvent(rawBody, signature) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return null;
    // Parse "t=…,v1=…" (v1 may repeat — any valid match is accepted).
    let timestamp;
    const signatures = [];
    for (const part of signature.split(",")){
        const eq = part.indexOf("=");
        if (eq === -1) continue;
        const key = part.slice(0, eq).trim();
        const value = part.slice(eq + 1).trim();
        if (key === "t") timestamp = value;
        else if (key === "v1") signatures.push(value);
    }
    if (!timestamp || signatures.length === 0) {
        throw new Error("Malformed stripe-signature header");
    }
    // Freshness: reject events older than 5 minutes (replay protection).
    const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
    if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
        throw new Error("Webhook event timestamp is stale or invalid");
    }
    const signedPayload = `${timestamp}.${rawBody}`;
    const expected = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)("sha256", secret).update(signedPayload, "utf8").digest("hex");
    const expectedBuf = Buffer.from(expected, "utf8");
    let matched = false;
    for (const sig of signatures){
        const sigBuf = Buffer.from(sig, "utf8");
        if (sigBuf.length === expectedBuf.length && (0,crypto__WEBPACK_IMPORTED_MODULE_0__.timingSafeEqual)(sigBuf, expectedBuf)) {
            matched = true;
            break;
        }
    }
    if (!matched) {
        throw new Error("Webhook signature mismatch");
    }
    return JSON.parse(rawBody);
}


/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 694542:
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
        page: "/api/subscription/webhook/route",
        pathname: "/api/subscription/webhook",
        filename: "route",
        bundlePath: "app/api/subscription/webhook/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/subscription/webhook/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(256369),
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
    let srcPage = "/api/subscription/webhook/route";
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

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,859], () => (__webpack_exec__(694542)));
module.exports = __webpack_exports__;

})();