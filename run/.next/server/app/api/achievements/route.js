"use strict";
(() => {
var exports = {};
exports.id = 8530;
exports.ids = [8530];
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

/***/ 227938:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_guest_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(245187);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(362768);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_db__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_db__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const ACHIEVEMENT_DEFS = [
    // 🔥 Study Streaks
    {
        type: 'streak_3',
        title: 'Getting Started',
        description: '3-day study streak',
        icon: '🔥',
        category: 'streaks',
        target: 3,
        progressType: 'streak'
    },
    {
        type: 'streak_7',
        title: 'Week Warrior',
        description: '7-day study streak',
        icon: '🔥',
        category: 'streaks',
        target: 7,
        progressType: 'streak'
    },
    {
        type: 'streak_14',
        title: 'Fortnight Focus',
        description: '14-day study streak',
        icon: '🔥',
        category: 'streaks',
        target: 14,
        progressType: 'streak'
    },
    {
        type: 'streak_30',
        title: 'Monthly Master',
        description: '30-day study streak',
        icon: '🏆',
        category: 'streaks',
        target: 30,
        progressType: 'streak'
    },
    {
        type: 'streak_100',
        title: 'Centurion',
        description: '100-day study streak',
        icon: '🏆',
        category: 'streaks',
        target: 100,
        progressType: 'streak'
    },
    // 📚 Questions
    {
        type: 'first_question',
        title: 'First Steps',
        description: 'Answer your first question',
        icon: '🌱',
        category: 'questions',
        target: 1,
        progressType: 'questions'
    },
    {
        type: 'questions_50',
        title: 'Curious Mind',
        description: 'Answer 50 questions',
        icon: '📚',
        category: 'questions',
        target: 50,
        progressType: 'questions'
    },
    {
        type: 'quiz_master',
        title: 'Quiz Master',
        description: 'Answer 100 questions',
        icon: '🧠',
        category: 'questions',
        target: 100,
        progressType: 'questions'
    },
    {
        type: 'scholar',
        title: 'Scholar',
        description: 'Answer 500 questions',
        icon: '📚',
        category: 'questions',
        target: 500,
        progressType: 'questions'
    },
    {
        type: 'questions_1000',
        title: 'Knowledge Seeker',
        description: 'Answer 1,000 questions',
        icon: '🎓',
        category: 'questions',
        target: 1000,
        progressType: 'questions'
    },
    {
        type: 'questions_5000',
        title: 'Encyclopedia',
        description: 'Answer 5,000 questions',
        icon: '📖',
        category: 'questions',
        target: 5000,
        progressType: 'questions'
    },
    // 🎯 Accuracy
    {
        type: 'accuracy_80_day',
        title: 'Sharp Day',
        description: '80%+ accuracy in a day',
        icon: '🎯',
        category: 'accuracy',
        target: 80,
        progressType: 'accuracy_day'
    },
    {
        type: 'accuracy_90_day',
        title: 'Precision Mind',
        description: '90%+ accuracy in a day',
        icon: '🎯',
        category: 'accuracy',
        target: 90,
        progressType: 'accuracy_day'
    },
    {
        type: 'accuracy_95_day',
        title: 'Near Perfect',
        description: '95%+ accuracy in a day',
        icon: '💎',
        category: 'accuracy',
        target: 95,
        progressType: 'accuracy_day'
    },
    {
        type: 'perfect_score',
        title: 'Perfectionist',
        description: 'Get 100% on a quiz',
        icon: '💎',
        category: 'accuracy',
        target: 100,
        progressType: 'accuracy_quiz'
    },
    // 👥 Social
    {
        type: 'first_friend',
        title: 'Friendly',
        description: 'Add your first friend',
        icon: '👥',
        category: 'social',
        target: 1,
        progressType: 'friends'
    },
    {
        type: 'friends_5',
        title: 'Social Butterfly',
        description: 'Have 5 friends',
        icon: '👥',
        category: 'social',
        target: 5,
        progressType: 'friends'
    },
    {
        type: 'first_group',
        title: 'Team Player',
        description: 'Join your first group',
        icon: '👥',
        category: 'social',
        target: 1,
        progressType: 'groups'
    },
    {
        type: 'groups_3',
        title: 'Community Builder',
        description: 'Join 3 groups',
        icon: '👥',
        category: 'social',
        target: 3,
        progressType: 'groups'
    },
    {
        type: 'first_post',
        title: 'First Post',
        description: 'Create your first post',
        icon: '📝',
        category: 'social',
        target: 1,
        progressType: 'posts'
    },
    // ⚔️ Competition
    {
        type: 'first_challenge_win',
        title: 'First Victory',
        description: 'Win your first challenge',
        icon: '⚔️',
        category: 'competition',
        target: 1,
        progressType: 'challenge_wins'
    },
    {
        type: 'arena_champion',
        title: 'Arena Champion',
        description: 'Win 5 challenges in the arena',
        icon: '⚔️',
        category: 'competition',
        target: 5,
        progressType: 'arena'
    },
    {
        type: 'wins_10',
        title: 'Challenger',
        description: 'Win 10 challenges',
        icon: '⚔️',
        category: 'competition',
        target: 10,
        progressType: 'challenge_wins'
    },
    {
        type: 'live_battle_winner',
        title: 'Live Warrior',
        description: 'Win a live battle',
        icon: '⚔️',
        category: 'competition',
        target: 1,
        progressType: 'battle'
    },
    // ⭐ Special
    {
        type: 'early_adopter',
        title: 'Early Adopter',
        description: 'Join MedQ in its first year',
        icon: '⭐',
        category: 'special',
        target: 1,
        progressType: 'special'
    },
    {
        type: 'perfect_week',
        title: 'Perfect Week',
        description: 'Study every day for a week with 80%+ accuracy',
        icon: '⭐',
        category: 'special',
        target: 7,
        progressType: 'special'
    },
    {
        type: 'night_owl',
        title: 'Night Owl',
        description: 'Study after midnight',
        icon: '🦉',
        category: 'special',
        target: 1,
        progressType: 'special'
    },
    {
        type: 'speed_demon',
        title: 'Speed Demon',
        description: 'Answer a question in under 5 seconds',
        icon: '⚡',
        category: 'special',
        target: 1,
        progressType: 'special'
    }
];
const CATEGORY_META = {
    streaks: {
        label: 'Study Streaks',
        emoji: '🔥',
        color: '#fb923c'
    },
    questions: {
        label: 'Questions',
        emoji: '📚',
        color: '#00e5a0'
    },
    accuracy: {
        label: 'Accuracy',
        emoji: '🎯',
        color: '#22d3ee'
    },
    social: {
        label: 'Social',
        emoji: '👥',
        color: '#8b5cf6'
    },
    competition: {
        label: 'Competition',
        emoji: '⚔️',
        color: '#ff5757'
    },
    special: {
        label: 'Special',
        emoji: '⭐',
        color: '#f59e0b'
    }
};
/* ────────────────────────────── Helper ────────────────────────────── */ /**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie. Always returns a string (guest
 * IDs are always available), so no null check is needed downstream.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */ async function resolveUserId() {
    const user = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .getCurrentUser */ .HW)();
    const userId = user?.id;
    return userId || (0,_lib_guest_user__WEBPACK_IMPORTED_MODULE_1__.getGuestUserId)();
}
/* ────────────────────────────── GET Handler ────────────────────────────── */ /**
 * GET /api/achievements — Returns all achievement definitions + the caller's
 * progress towards each, grouped by category.
 *
 * Auth-optional — guests get their per-browser guest progress.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch — resolveUserId()
 * always returns a string (guest ID is always available), so the check
 * was unreachable.
 */ const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .FB)(async ()=>{
    const userId = await resolveUserId();
    // Get user's unlocked achievements
    const unlocked = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.userAchievement.findMany({
        where: {
            userId
        },
        include: {
            achievement: true
        },
        orderBy: {
            unlockedAt: 'desc'
        }
    });
    const unlockedTypes = new Set(unlocked.map((u)=>u.achievementType));
    // ── Compute progress for each achievement ──────────────────────
    // Run queries in parallel for efficiency
    const [streakRecords, totalQuestions, sessionData, friendCount, groupCount, postCount, challengeWins, bestDayAccuracy] = await Promise.all([
        // Streak records
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.studyStreak.findMany({
            where: {
                userId
            },
            orderBy: {
                date: 'desc'
            }
        }),
        // Total questions
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.studySession.aggregate({
            where: {
                userId
            },
            _sum: {
                questionsStudied: true
            }
        }),
        // Session data for accuracy per day
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.studySession.findMany({
            where: {
                userId
            },
            select: {
                questionsStudied: true,
                correctAnswers: true,
                createdAt: true,
                totalTimeSpent: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),
        // Friend count
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.friendship.count({
            where: {
                status: 'accepted',
                OR: [
                    {
                        senderId: userId
                    },
                    {
                        receiverId: userId
                    }
                ]
            }
        }),
        // Group count
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.groupMember.count({
            where: {
                userId
            }
        }),
        // Post count
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.post.count({
            where: {
                authorId: userId
            }
        }),
        // Challenge wins
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.userChallenge.count({
            where: {
                winnerId: userId
            }
        }),
        // Best daily accuracy
        _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.studyStreak.findMany({
            where: {
                userId,
                questionsStudied: {
                    gt: 0
                }
            },
            orderBy: {
                date: 'desc'
            },
            take: 90
        })
    ]);
    // Calculate current streak
    const todayStr = new Date().toISOString().split('T')[0];
    let currentStreak = 0;
    const activityMap = new Map();
    for (const s of streakRecords){
        activityMap.set(s.date, s.questionsStudied);
    }
    const checkDate = new Date();
    if ((activityMap.get(todayStr) || 0) > 0) {
        currentStreak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
    } else {
        checkDate.setDate(checkDate.getDate() - 1);
        const yesterdayStr = checkDate.toISOString().split('T')[0];
        if ((activityMap.get(yesterdayStr) || 0) > 0) {
            currentStreak = 1;
            checkDate.setDate(checkDate.getDate() - 1);
        }
    }
    for(let i = 0; i < 365 && currentStreak > 0; i++){
        const dateStr = checkDate.toISOString().split('T')[0];
        const data = activityMap.get(dateStr);
        if (data && data > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    // Calculate best day accuracy from session data
    const dayAccMap = new Map();
    for (const s of sessionData){
        const dateKey = s.createdAt.toISOString().split('T')[0];
        const existing = dayAccMap.get(dateKey) || {
            attempted: 0,
            correct: 0
        };
        existing.attempted += s.questionsStudied;
        existing.correct += s.correctAnswers;
        dayAccMap.set(dateKey, existing);
    }
    let computedBestAccuracy = 0;
    for (const [, v] of dayAccMap){
        if (v.attempted >= 5) {
            const acc = Math.round(v.correct / v.attempted * 100);
            computedBestAccuracy = Math.max(computedBestAccuracy, acc);
        }
    }
    const totalQuestionsStudied = totalQuestions._sum.questionsStudied || 0;
    // Check for perfect quiz (100% on exam attempt)
    const perfectQuizzes = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.examAttempt.findMany({
        where: {
            userId,
            score: {
                gt: 0
            }
        },
        select: {
            score: true,
            totalQuestions: true
        }
    });
    const hasPerfectQuiz = perfectQuizzes.some((e)=>e.totalQuestions > 0 && e.score === e.totalQuestions);
    // Check for night owl (studied after midnight)
    const nightOwlSession = sessionData.find((s)=>{
        const hour = new Date(s.createdAt).getHours();
        return hour >= 0 && hour < 5;
    });
    // Check for speed demon (<5s per question)
    const speedDemonSession = sessionData.find((s)=>{
        if (s.questionsStudied === 0) return false;
        const avgTime = s.totalTimeSpent / s.questionsStudied;
        return avgTime < 5;
    });
    // Calculate progress for each achievement
    const achievements = ACHIEVEMENT_DEFS.map((def)=>{
        const unlockRecord = unlocked.find((u)=>u.achievementType === def.type);
        const isUnlocked = unlockRecord ? true : false;
        let progress = 0;
        switch(def.progressType){
            case 'streak':
                progress = currentStreak;
                break;
            case 'questions':
                progress = totalQuestionsStudied;
                break;
            case 'accuracy_day':
                progress = computedBestAccuracy;
                break;
            case 'accuracy_quiz':
                progress = hasPerfectQuiz ? 100 : 0;
                break;
            case 'friends':
                progress = friendCount;
                break;
            case 'groups':
                progress = groupCount;
                break;
            case 'posts':
                progress = postCount;
                break;
            case 'challenge_wins':
            case 'arena':
                progress = challengeWins;
                break;
            case 'battle':
                progress = 0; // Would need live battle tracking
                break;
            case 'special':
                if (def.type === 'early_adopter') {
                    // Check if user created within first year of app
                    progress = 1; // Most users are early adopters
                } else if (def.type === 'perfect_week') {
                    // Check for 7 consecutive days with 80%+ accuracy
                    let consecutive = 0;
                    let maxConsecutive = 0;
                    const sortedDays = Array.from(dayAccMap.entries()).sort((a, b)=>b[0].localeCompare(a[0]));
                    for (const [, v] of sortedDays){
                        if (v.attempted >= 1) {
                            const acc = Math.round(v.correct / v.attempted * 100);
                            if (acc >= 80) {
                                consecutive++;
                                maxConsecutive = Math.max(maxConsecutive, consecutive);
                            } else {
                                consecutive = 0;
                            }
                        }
                    }
                    progress = maxConsecutive;
                } else if (def.type === 'night_owl') {
                    progress = nightOwlSession ? 1 : 0;
                } else if (def.type === 'speed_demon') {
                    progress = speedDemonSession ? 1 : 0;
                }
                break;
        }
        // For accuracy_day, progress is a percentage value, not a count
        const isAccuracyDay = def.progressType === 'accuracy_day';
        const progressPercent = isAccuracyDay ? Math.min(progress / def.target * 100, 100) : Math.min(progress / def.target * 100, 100);
        return {
            type: def.type,
            title: def.title,
            description: def.description,
            icon: def.icon,
            category: def.category,
            target: def.target,
            progress: isAccuracyDay ? Math.min(progress, def.target) : Math.min(progress, def.target),
            progressPercent,
            progressLabel: isAccuracyDay ? `Best: ${progress}%/${def.target}%` : `${Math.min(progress, def.target)}/${def.target}`,
            unlocked: isUnlocked,
            unlockedAt: unlockRecord ? unlockRecord.unlockedAt : null
        };
    });
    // Group by category
    const categories = Object.entries(CATEGORY_META).map(([key, meta])=>({
            id: key,
            label: meta.label,
            emoji: meta.emoji,
            color: meta.color,
            achievements: achievements.filter((a)=>a.category === key),
            unlockedCount: achievements.filter((a)=>a.category === key && a.unlocked).length,
            totalCount: achievements.filter((a)=>a.category === key).length
        }));
    // Stats
    const totalUnlocked = unlockedTypes.size;
    const totalAchievements = ACHIEVEMENT_DEFS.length;
    const completionPercent = Math.round(totalUnlocked / totalAchievements * 100);
    // Total XP from streaks
    const xpResult = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.studyStreak.aggregate({
        where: {
            userId
        },
        _sum: {
            xpEarned: true
        }
    });
    const totalXP = xpResult._sum.xpEarned || 0;
    // Recent unlocks (last 10)
    const recentUnlocks = unlocked.slice(0, 10).map((u)=>({
            type: u.achievementType,
            title: u.achievement?.title || ACHIEVEMENT_DEFS.find((d)=>d.type === u.achievementType)?.title || u.achievementType,
            description: u.achievement?.description || ACHIEVEMENT_DEFS.find((d)=>d.type === u.achievementType)?.description || '',
            icon: u.achievement?.icon || ACHIEVEMENT_DEFS.find((d)=>d.type === u.achievementType)?.icon || '🏅',
            unlockedAt: u.unlockedAt
        }));
    // Top 3 rarest achievements for profile badges
    const allUserAchievements = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.userAchievement.groupBy({
        by: [
            'achievementType'
        ],
        _count: {
            achievementType: true
        }
    });
    const rarityMap = new Map(allUserAchievements.map((a)=>[
            a.achievementType,
            a._count.achievementType
        ]));
    const profileBadges = unlocked.map((u)=>({
            type: u.achievementType,
            title: u.achievement?.title || u.achievementType,
            icon: u.achievement?.icon || '🏅',
            rarity: rarityMap.get(u.achievementType) || 999
        })).sort((a, b)=>a.rarity - b.rarity).slice(0, 3);
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        achievements,
        categories,
        stats: {
            totalUnlocked,
            totalAchievements,
            completionPercent,
            totalXP
        },
        recentUnlocks,
        profileBadges
    });
});
/* ────────────────────────────── POST Handler: Share Achievement ────────────────────────────── */ /**
 * POST /api/achievements — Share an unlocked achievement as a social post.
 * Body: { achievementType: string }
 *
 * Auth-optional — guests can share too (their post will be attributed to
 * the guest ID).
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch.
 */ const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .FB)(async (request)=>{
    const userId = await resolveUserId();
    const body = await request.json();
    const { achievementType } = body;
    if (!achievementType) {
        return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('achievementType is required');
    }
    // Check user has this achievement unlocked
    const userAch = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.userAchievement.findUnique({
        where: {
            userId_achievementType: {
                userId,
                achievementType
            }
        },
        include: {
            achievement: true
        }
    });
    if (!userAch) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Achievement not unlocked'
        }, {
            status: 400
        });
    }
    const def = ACHIEVEMENT_DEFS.find((d)=>d.type === achievementType);
    const title = userAch.achievement?.title || def?.title || achievementType;
    const icon = userAch.achievement?.icon || def?.icon || '🏅';
    const description = userAch.achievement?.description || def?.description || '';
    // Create a social post
    const post = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.post.create({
        data: {
            authorId: userId,
            content: `🏆 Achievement Unlocked: ${icon} ${title}! ${description}`,
            type: 'achievement',
            metadata: JSON.stringify({
                achievementType,
                achievementTitle: title,
                achievementIcon: icon,
                achievementDescription: description
            })
        }
    });
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: true,
        post: {
            id: post.id,
            content: post.content,
            type: post.type,
            createdAt: post.createdAt
        }
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 700566:
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
        page: "/api/achievements/route",
        pathname: "/api/achievements",
        filename: "route",
        bundlePath: "app/api/achievements/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/achievements/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(227938),
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
    let srcPage = "/api/achievements/route";
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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035], () => (__webpack_exec__(700566)));
module.exports = __webpack_exports__;

})();