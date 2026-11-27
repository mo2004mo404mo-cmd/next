"use strict";
exports.id = 6029;
exports.ids = [6029];
exports.modules = {

/***/ 406029:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   recalibrateQuestion: () => (/* binding */ recalibrateQuestion)
/* harmony export */ });
/* unused harmony exports labelFromP, pointBiserial */
/* harmony import */ var _generated_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(732152);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Adaptive Difficulty Calibration
 *
 * Recomputes a question's item statistics from real user attempts:
 *   - attemptsCount  — total recorded attempts
 *   - difficultyP    — item p-value (proportion of users answering correctly)
 *   - discrimination — point-biserial-style correlation between per-attempt
 *                      item scores and the answering users' overall accuracy
 *                      (a proxy for the classic total-test-score correlation)
 *
 * The human-readable difficulty label is re-derived from the p-value once the
 * sample is large enough (>= 8 attempts) so bank filters stay honest.
 */ 

/** p-value → difficulty label. */ function labelFromP(p) {
    if (p >= 0.85) return 'Easy';
    if (p >= 0.7) return 'Basic';
    if (p >= 0.5) return 'Moderate';
    if (p >= 0.3) return 'Hard';
    return 'Expert';
}
/** Pearson correlation between per-attempt item scores and user ability proxies. */ function pointBiserial(itemScores, userAbilities) {
    const n = itemScores.length;
    if (n < 4) return -1;
    const meanX = itemScores.reduce((a, b)=>a + b, 0) / n;
    const meanY = userAbilities.reduce((a, b)=>a + b, 0) / n;
    let cov = 0;
    let varX = 0;
    let varY = 0;
    for(let i = 0; i < n; i++){
        const dx = itemScores[i] - meanX;
        const dy = userAbilities[i] - meanY;
        cov += dx * dy;
        varX += dx * dx;
        varY += dy * dy;
    }
    if (varX <= 0 || varY <= 0) return -1;
    return cov / Math.sqrt(varX * varY);
}
/** Recompute + persist the calibration for one question. Returns null when uncalibratable. */ async function recalibrateQuestion(questionId) {
    const attempts = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.questionAttempt.findMany({
        where: {
            questionId
        },
        select: {
            userId: true,
            isCorrect: true
        },
        take: 5000
    });
    if (attempts.length === 0) return null;
    const total = attempts.length;
    const correct = attempts.filter((a)=>a.isCorrect).length;
    const difficultyP = correct / total;
    // Per-user overall accuracy across ALL their attempts (ability proxy)
    const userIds = [
        ...new Set(attempts.map((a)=>a.userId))
    ];
    const userStats = userIds.length ? await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.$queryRaw`
        SELECT "userId" AS uid, COUNT(*)::int AS total,
               SUM(CASE WHEN "isCorrect" THEN 1 ELSE 0 END)::int AS correct
        FROM "QuestionAttempt"
        WHERE "userId" IN (${_generated_client__WEBPACK_IMPORTED_MODULE_0__/* .Prisma.join */ .D1.join(userIds)})
        GROUP BY "userId"` : [];
    const abilityByUser = new Map();
    for (const s of userStats){
        abilityByUser.set(s.uid, s.total > 0 ? s.correct / s.total : 0.5);
    }
    const itemScores = attempts.map((a)=>a.isCorrect ? 1 : 0);
    const abilities = attempts.map((a)=>abilityByUser.get(a.userId) ?? 0.5);
    const discrimination = pointBiserial(itemScores, abilities);
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.update({
        where: {
            id: questionId
        },
        data: {
            attemptsCount: total,
            difficultyP,
            discrimination,
            // Only override the authored difficulty label with calibrated data once
            // the sample is meaningful; keeps filters honest.
            ...total >= 8 ? {
                difficulty: labelFromP(difficultyP)
            } : {}
        }
    });
    return {
        attemptsCount: total,
        difficultyP,
        discrimination
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;