"use strict";
exports.id = 8753;
exports.ids = [8753];
exports.modules = {

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

/***/ })

};
;