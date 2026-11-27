"use strict";
exports.id = 1597;
exports.ids = [1597];
exports.modules = {

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

/***/ 701597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ CREDIT_PACKAGES),
/* harmony export */   Gt: () => (/* binding */ getCreditPackage),
/* harmony export */   debitAICredits: () => (/* binding */ debitAICredits),
/* harmony export */   pN: () => (/* binding */ packageTotalCredits),
/* harmony export */   refundAICredits: () => (/* binding */ refundAICredits)
/* harmony export */ });
/* unused harmony exports AI_CREDIT_COSTS, SPEND_ACTIONS, creditCostForTool */
/* harmony import */ var _tiers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282958);
/**
 * Credit system — packages, costs, and AI-tool debit helpers.
 *
 * Three concerns:
 *
 * 1. CREDIT_PACKAGES — the catalog of buyable credit bundles shown in the
 *    Credit Shop's "Buy Credits" tab. Each package has a USD price, a base
 *    credit amount, and an optional bonus (e.g. "250 + 50 bonus").
 *
 * 2. AI_CREDIT_COSTS — per-category credit cost when a user wants to exceed
 *    their daily free-tier limit. E.g. one extra AI question generation = 2
 *    credits. Used by debitAICredits() below.
 *
 * 3. SPEND_ACTIONS — the non-AI spend catalog (quiz hint, streak freeze,
 *    premium hour, etc.). Mirrors the VALID_ACTIONS map in
 *    /api/credits/spend/route.ts.
 *
 * The actual wallet-balance mutation lives in src/lib/freemium-store.ts
 * (spendCredits, earnCredits). This module is the pure-data layer + a thin
 * server-side wrapper (debitAICredits) that combines "check limit → check
 * balance → spend → increment usage" into one call so AI routes don't have
 * to re-implement the dance.
 */ 
/**
 * Buyable credit packages. Stripe Price IDs are loaded from env
 * (STRIPE_PRICE_CREDITS_<ID>) and default to '' (mock checkout).
 */ const CREDIT_PACKAGES = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Top up when you need a little extra',
        baseCredits: 100,
        bonusCredits: 0,
        priceUsd: 4.99,
        centPerCredit: 499 / 100,
        accentColor: '#5a6478',
        stripePriceId: ''
    },
    {
        id: 'scholar',
        name: 'Scholar',
        tagline: 'Best for regular study sessions',
        baseCredits: 250,
        bonusCredits: 25,
        priceUsd: 9.99,
        centPerCredit: 999 / 275,
        popular: true,
        accentColor: '#8b5cf6',
        stripePriceId: ''
    },
    {
        id: 'master',
        name: 'Master',
        tagline: 'For intensive board-prep months',
        baseCredits: 600,
        bonusCredits: 100,
        priceUsd: 19.99,
        centPerCredit: 1999 / 700,
        bestValue: true,
        accentColor: '#00e5a0',
        stripePriceId: ''
    },
    {
        id: 'institution',
        name: 'Institution',
        tagline: 'Bulk credits for study groups & schools',
        baseCredits: 1500,
        bonusCredits: 400,
        priceUsd: 39.99,
        centPerCredit: 3999 / 1900,
        accentColor: '#f59e0b',
        stripePriceId: ''
    }
];
/** Look up a package by id (returns undefined if not found). */ function getCreditPackage(id) {
    return CREDIT_PACKAGES.find((p)=>p.id === id);
}
/** Total credits granted by a package (base + bonus). */ function packageTotalCredits(pkg) {
    return pkg.baseCredits + pkg.bonusCredits;
}
/**
 * Per-category credit cost when a user exceeds their daily free limit and
 * wants to unlock additional uses of an AI tool. Cost is per-single-use.
 *
 * These are *also* mirrored in AI_TOOL_CATEGORIES in tiers.ts (which maps
 * toolId → category). The cost here is keyed by category.
 */ const AI_CREDIT_COSTS = {
    ai_generations: 2,
    tutor_messages: 1,
    video_lessons: 5,
    case_simulations: 4,
    flashcard_decks: 3,
    image_analyzer: 4,
    voice_study: 2,
    board_prep_sessions: 8,
    mnemonics: 2,
    anatomy_visuals: 6,
    study_planner: 3,
    clinical_vignettes: 4,
    whiteboard_studio: 5,
    video_library: 3
};
const SPEND_ACTIONS = [
    {
        action: 'hint',
        title: 'Quiz Hint',
        description: 'Eliminate 2 wrong options on the current question',
        cost: 3,
        category: 'hint'
    },
    {
        action: 'streak_freeze',
        title: 'Streak Freeze',
        description: 'Protect your streak for 1 missed day',
        cost: 5,
        category: 'streak_freeze'
    },
    {
        action: 'premium_hour',
        title: 'Premium Hour',
        description: 'Unlock all premium features for 1 hour',
        cost: 10,
        category: 'premium_hour'
    },
    {
        action: 'question_pack',
        title: 'Question Pack',
        description: '5 bonus AI-generated questions on a topic of your choice',
        cost: 15,
        category: 'question_pack'
    },
    {
        action: 'custom_theme',
        title: 'Custom Theme',
        description: 'Unlock a custom color theme for your MedQ experience',
        cost: 20,
        category: 'custom_theme'
    }
];
/**
 * Returns the credit cost for one extra use of `toolId` beyond the user's
 * daily limit. Returns 0 if the tool is unknown.
 */ function creditCostForTool(toolId) {
    const category = AI_TOOL_CATEGORIES[toolId];
    if (!category) return 0;
    return AI_CREDIT_COSTS[category] ?? 0;
}
/**
 * Server-side helper: check whether the user can use `toolId` and, if they're
 * over their daily limit, optionally debit credits to unlock one extra use.
 *
 * Behaviour:
 *   1. Look up the tool's category. If unknown → allowed=false, reason='unknown_tool'.
 *   2. Look up the user's current usage count for today.
 *   3. If under limit → allowed=true, source='tier_limit'. Nothing debited.
 *   4. If over limit:
 *      a. Compute credit cost for the category.
 *      b. If balance >= cost → spend credits, increment usage, return allowed=true, source='credits'.
 *      c. Else → allowed=false, reason='no_credits'.
 *
 * The caller is responsible for actually performing the AI work AFTER
 * receiving allowed=true. If the AI work fails, the caller should call
 * refundAICredits() to return the credits.
 *
 * Implementation detail: this function imports freemium-store lazily to
 * avoid a circular dependency at module-load time (freemium-store imports
 * from db, which is fine, but it keeps the surface area small).
 */ async function debitAICredits(userId, toolId, opts) {
    const allowCreditSpend = opts?.allowCreditSpend ?? true;
    // Lazy import to avoid pulling db into client bundles accidentally.
    const { getTier, getUsage, incrementUsage, getCredits, spendCredits } = await __webpack_require__.e(/* import() */ 8753).then(__webpack_require__.bind(__webpack_require__, 348753));
    const { AI_TOOL_CATEGORIES, canUseTool } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 282958));
    const category = AI_TOOL_CATEGORIES[toolId];
    if (!category) {
        return {
            allowed: false,
            source: 'none',
            reason: 'unknown_tool',
            toolId,
            category: ''
        };
    }
    const tier = await getTier(userId);
    const usageBefore = await getUsage(category, userId);
    const check = canUseTool(tier, toolId, usageBefore.used);
    if (check.allowed) {
        // Under the daily limit — bump usage counter and let the call through.
        const usageAfter = await incrementUsage(category, userId);
        return {
            allowed: true,
            source: 'tier_limit',
            toolId,
            category,
            usageBefore: usageBefore.used,
            usageAfter: usageAfter.used,
            limit: usageAfter.limit,
            tier
        };
    }
    // Over limit. Either spend credits or deny.
    if (!allowCreditSpend) {
        return {
            allowed: false,
            source: 'none',
            reason: 'limit_reached_and_no_credits',
            toolId,
            category,
            usageBefore: usageBefore.used,
            usageAfter: usageBefore.used,
            limit: usageBefore.limit,
            tier
        };
    }
    const cost = AI_CREDIT_COSTS[category] ?? 0;
    if (cost <= 0) {
        // No credit cost defined for this category — straight denial.
        return {
            allowed: false,
            source: 'none',
            reason: 'limit_reached_and_no_credits',
            toolId,
            category,
            usageBefore: usageBefore.used,
            usageAfter: usageBefore.used,
            limit: usageBefore.limit,
            tier
        };
    }
    const wallet = await getCredits(userId);
    if (wallet.balance < cost) {
        return {
            allowed: false,
            source: 'none',
            reason: 'no_credits',
            toolId,
            category,
            usageBefore: usageBefore.used,
            usageAfter: usageBefore.used,
            limit: usageBefore.limit,
            tier,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance
        };
    }
    const spend = await spendCredits(cost, `ai:${category}`, `Extra ${toolId} use (over daily limit)`, userId);
    if (!spend.success) {
        return {
            allowed: false,
            source: 'none',
            reason: 'no_credits',
            toolId,
            category,
            usageBefore: usageBefore.used,
            usageAfter: usageBefore.used,
            limit: usageBefore.limit,
            tier,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance
        };
    }
    const usageAfter = await incrementUsage(category, userId);
    return {
        allowed: true,
        source: 'credits',
        toolId,
        category,
        usageBefore: usageBefore.used,
        usageAfter: usageAfter.used,
        limit: usageAfter.limit,
        creditsSpent: cost,
        balanceBefore: wallet.balance,
        balanceAfter: spend.balance,
        tier
    };
}
/**
 * Refund credits spent by debitAICredits(). Used when an AI route fails after
 * the gate has already debited the user. Returns the new balance, or null if
 * no refund was applicable (e.g. the original gate was free-tier-limit, not
 * credit-spend).
 */ async function refundAICredits(userId, gate, reason = 'AI call failed') {
    if (!gate.allowed || gate.source !== 'credits' || !gate.creditsSpent) {
        return null;
    }
    const { earnCredits } = await __webpack_require__.e(/* import() */ 8753).then(__webpack_require__.bind(__webpack_require__, 348753));
    const result = await earnCredits(gate.creditsSpent, 'refund', `Refund: ${reason} (${gate.toolId})`, undefined, userId);
    return result.balance;
}


/***/ })

};
;