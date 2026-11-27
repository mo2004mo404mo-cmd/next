"use strict";
exports.id = 7353;
exports.ids = [7353];
exports.modules = {

/***/ 97625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ useCurrentUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(554559);
/* __next_internal_client_entry_do_not_use__ useCurrentUser auto */ 

function useCurrentUser() {
    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__/* .useSession */ .wV)();
    const user = session?.user ?? null;
    const userId = user?.id;
    const authHeaders = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((extra)=>({
            ...userId ? {
                'x-user-id': userId
            } : {},
            ...extra
        }), [
        userId
    ]);
    return {
        user,
        userId,
        isLoading: status === 'loading',
        isAuthenticated: status === 'authenticated',
        authHeaders
    };
}


/***/ }),

/***/ 304870:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowLeft)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "arrow-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m12 19-7-7 7-7",
                key: "1l729n"
            }
        ],
        [
            "path",
            {
                d: "M19 12H5",
                key: "x3x0zl"
            }
        ]
    ]
};
__iconData.node;
const ArrowLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-left.mjs.map


/***/ }),

/***/ 505152:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleAlert)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "circle-alert",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "8",
                y2: "12",
                key: "1pkeuh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12.01",
                y1: "16",
                y2: "16",
                key: "4dfq90"
            }
        ]
    ],
    aliases: [
        "alert-circle"
    ]
};
__iconData.node;
const CircleAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-alert.mjs.map


/***/ }),

/***/ 594710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Medal)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "medal",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
                key: "143lza"
            }
        ],
        [
            "path",
            {
                d: "M11 12 5.12 2.2",
                key: "qhuxz6"
            }
        ],
        [
            "path",
            {
                d: "m13 12 5.88-9.8",
                key: "hbye0f"
            }
        ],
        [
            "path",
            {
                d: "M8 7h8",
                key: "i86dvs"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "17",
                r: "5",
                key: "qbz8iq"
            }
        ],
        [
            "path",
            {
                d: "M12 18v-2h-.5",
                key: "fawc4q"
            }
        ]
    ]
};
__iconData.node;
const Medal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=medal.mjs.map


/***/ }),

/***/ 967353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChallengeArenaTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81220);
/* harmony import */ var _components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(97625);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(304870);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54999);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(998808);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(190498);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(472597);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(120759);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(594710);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(967254);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(569473);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(144730);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(505152);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(404586);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(135195);
/* harmony import */ var _barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(352839);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(890707);
/* __next_internal_client_entry_do_not_use__ default auto */ 





/* ─── Helpers ─── */ function stripHtml(html) {
    if (!html) return '';
    return html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>/g, '').trim();
}
function parseOptions(optionsRaw) {
    try {
        const p = JSON.parse(optionsRaw);
        return Array.isArray(p) ? p : [];
    } catch  {
        return [];
    }
}
function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
function formatTimeRemaining(expiresAt) {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
}
function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
}
function getDifficultyColor(d) {
    if (d === 'Easy') return '#22c55e';
    if (d === 'Basic') return '#4ade80';
    if (d === 'Moderate') return '#f59e0b';
    if (d === 'Hard') return '#f97316';
    if (d === 'Expert') return '#ef4444';
    return '#5a6478';
}
function getDifficultyBg(d) {
    if (d === 'Easy') return 'rgba(34,197,94,0.1)';
    if (d === 'Basic') return 'rgba(74,222,128,0.1)';
    if (d === 'Moderate') return 'rgba(245,158,11,0.1)';
    if (d === 'Hard') return 'rgba(249,115,22,0.1)';
    if (d === 'Expert') return 'rgba(239,68,68,0.1)';
    return 'rgba(255,255,255,0.05)';
}
/* ─── Sub-components ─── */ function StatCard({ label, value, icon, color }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl p-4 flex items-center gap-3",
        style: {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                style: {
                    background: `${color}15`
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    style: {
                        color
                    },
                    children: icon
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-lg font-bold text-[#e8ecf4]",
                        children: value
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#5a6478] uppercase tracking-wider font-semibold",
                        children: label
                    })
                ]
            })
        ]
    });
}
function AvatarCircle({ user, size = 36 }) {
    if (user.image) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "relative rounded-full overflow-hidden flex-shrink-0",
            style: {
                width: size,
                height: size
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                src: user.image,
                alt: user.name || 'User',
                fill: true,
                className: "object-cover rounded-full",
                sizes: `${size}px`
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "rounded-full flex items-center justify-center font-bold flex-shrink-0",
        style: {
            width: size,
            height: size,
            background: 'linear-gradient(135deg, rgba(0,229,160,0.2), rgba(0,229,160,0.05))',
            color: '#00e5a0',
            fontSize: size * 0.35
        },
        children: getInitials(user.name)
    });
}
/* ─── Main Component ─── */ function ChallengeArenaTab() {
    const { user } = (0,_components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_3__/* .useCurrentUser */ .i)();
    const userId = user?.id;
    // View state
    const [viewMode, setViewMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('arena');
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [challenges, setChallenges] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        sent: [],
        received: []
    });
    // New challenge dialog
    const [showNewDialog, setShowNewDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [friends, setFriends] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [friendsLoading, setFriendsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedFriend, setSelectedFriend] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [challengeTopic, setChallengeTopic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Mixed');
    const [challengeDifficulty, setChallengeDifficulty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Mixed');
    const [challengeQCount, setChallengeQCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(5);
    const [sending, setSending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Quiz state
    const [activeChallenge, setActiveChallenge] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [quizQuestions, setQuizQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [answers, setAnswers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [timerSeconds, setTimerSeconds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Results state
    const [resultData, setResultData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Timer
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const startTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerSeconds(0);
        timerRef.current = setInterval(()=>setTimerSeconds((prev)=>prev + 1), 1000);
    }, []);
    const stopTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);
    /* ─── Fetch challenges ─── */ const fetchChallenges = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setLoading(true);
        try {
            const res = await fetch('/api/challenges');
            if (res.ok) {
                const data = await res.json();
                setChallenges({
                    sent: data.sent || [],
                    received: data.received || []
                });
            }
        } catch (err) {
            console.error('Fetch challenges error:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchChallenges();
    }, [
        fetchChallenges
    ]);
    /* ─── Stats ─── */ const allChallenges = [
        ...challenges.sent,
        ...challenges.received
    ];
    const completedChallenges = allChallenges.filter((c)=>c.status === 'completed');
    const activeChallenges = allChallenges.filter((c)=>c.status === 'pending' || c.status === 'active');
    const wins = completedChallenges.filter((c)=>c.winnerId === userId).length;
    const losses = completedChallenges.filter((c)=>c.winnerId && c.winnerId !== userId).length;
    const ties = completedChallenges.filter((c)=>!c.winnerId).length;
    const totalGames = wins + losses + ties;
    const winRate = totalGames > 0 ? Math.round(wins / totalGames * 100) : 0;
    /* ─── New challenge dialog ─── */ const openNewChallenge = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setShowNewDialog(true);
        setSelectedFriend('');
        setChallengeTopic('Mixed');
        setChallengeDifficulty('Mixed');
        setChallengeQCount(5);
        setFriendsLoading(true);
        try {
            const res = await fetch('/api/friends');
            if (res.ok) {
                const data = await res.json();
                setFriends(data.friends || []);
            }
        } catch (err) {
            console.error('Fetch friends error:', err);
        } finally{
            setFriendsLoading(false);
        }
    }, []);
    const handleSendChallenge = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!selectedFriend) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Please select a friend to challenge');
            return;
        }
        setSending(true);
        try {
            const res = await fetch('/api/challenges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    challengedId: selectedFriend,
                    topic: challengeTopic,
                    difficulty: challengeDifficulty,
                    totalQuestions: challengeQCount
                })
            });
            if (res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.success('Challenge sent!');
                setShowNewDialog(false);
                fetchChallenges();
            } else {
                const data = await res.json();
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(data.error || 'Failed to send challenge');
            }
        } catch (err) {
            console.error('Send challenge error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Failed to send challenge');
        } finally{
            setSending(false);
        }
    }, [
        selectedFriend,
        challengeTopic,
        challengeDifficulty,
        challengeQCount,
        fetchChallenges
    ]);
    /* ─── Accept challenge ─── */ const handleAcceptChallenge = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (challengeId)=>{
        try {
            const res = await fetch(`/api/challenges/${challengeId}/accept`, {
                method: 'POST'
            });
            if (res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.success('Challenge accepted!');
                fetchChallenges();
            } else {
                const data = await res.json();
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(data.error || 'Failed to accept');
            }
        } catch (err) {
            console.error('Accept challenge error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Failed to accept challenge');
        }
    }, [
        fetchChallenges
    ]);
    /* ─── Enter challenge quiz ─── */ const enterChallenge = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (challenge)=>{
        if (challenge.status === 'pending' && challenge.challengedId === userId) {
            await handleAcceptChallenge(challenge.id);
        }
        const isChallenger = challenge.challengerId === userId;
        if (isChallenger && challenge.challengerScore >= 0 || !isChallenger && challenge.challengedScore >= 0) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('You have already completed this challenge');
            return;
        }
        if (new Date(challenge.expiresAt) < new Date()) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('This challenge has expired');
            return;
        }
        try {
            const res = await fetch(`/api/challenges/${challenge.id}`);
            if (res.ok) {
                const data = await res.json();
                setActiveChallenge(data.challenge);
                setQuizQuestions(data.questions || []);
                setAnswers({});
                setCurrentIndex(0);
                setViewMode('quiz');
                startTimer();
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Failed to load challenge');
            }
        } catch (err) {
            console.error('Load challenge error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Failed to load challenge');
        }
    }, [
        userId,
        handleAcceptChallenge,
        startTimer
    ]);
    /* ─── Submit quiz ─── */ const handleSubmitQuiz = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!activeChallenge) return;
        const unanswered = quizQuestions.filter((q)=>!answers[q.id]?.trim());
        if (unanswered.length > 0) {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(`Please answer all questions. ${unanswered.length} remaining.`);
            return;
        }
        setSubmitting(true);
        stopTimer();
        try {
            const res = await fetch(`/api/challenges/${activeChallenge.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers
                })
            });
            if (res.ok) {
                const data = await res.json();
                setResultData({
                    challenge: data.challenge,
                    score: data.score,
                    totalQuestions: data.totalQuestions,
                    creditsEarned: data.creditsEarned || 0,
                    isWinner: data.isWinner || false,
                    isTie: data.isTie || false
                });
                setViewMode('results');
            } else {
                const data = await res.json();
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(data.error || 'Failed to submit');
            }
        } catch (err) {
            console.error('Submit quiz error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Failed to submit answers');
        } finally{
            setSubmitting(false);
        }
    }, [
        activeChallenge,
        quizQuestions,
        answers,
        stopTimer
    ]);
    /* ─── Back to arena ─── */ const backToArena = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setViewMode('arena');
        setActiveChallenge(null);
        setQuizQuestions([]);
        setAnswers({});
        setResultData(null);
        stopTimer();
        fetchChallenges();
    }, [
        stopTimer,
        fetchChallenges
    ]);
    /* ─── Helpers ─── */ const getOpponent = (c)=>c.challengerId === userId ? c.challenged : c.challenger;
    const isUserChallenger = (c)=>c.challengerId === userId;
    /* ─── Computed for quiz ─── */ const currentQ = quizQuestions[currentIndex];
    const currentOptions = currentQ ? parseOptions(currentQ.options) : [];
    const answeredCount = quizQuestions.filter((q)=>answers[q.id]?.trim()).length;
    const allAnswered = answeredCount === quizQuestions.length;
    /* ─── Render: Loading ─── */ if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-2xl p-6",
            style: {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl animate-pulse",
                            style: {
                                background: 'rgba(255,255,255,0.05)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-5 w-40 rounded animate-pulse mb-2",
                                    style: {
                                        background: 'rgba(255,255,255,0.05)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-3 w-24 rounded animate-pulse",
                                    style: {
                                        background: 'rgba(255,255,255,0.05)'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-3 gap-3 mb-6",
                    children: [
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-20 rounded-xl animate-pulse",
                            style: {
                                background: 'rgba(255,255,255,0.03)'
                            }
                        }, i))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "space-y-3",
                    children: [
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-24 rounded-xl animate-pulse",
                            style: {
                                background: 'rgba(255,255,255,0.03)'
                            }
                        }, i))
                })
            ]
        });
    }
    /* ═══════════════════════════════════════════════════════ */ /* ─── RENDER: QUIZ MODE ──                               */ /* ═══════════════════════════════════════════════════════ */ if (viewMode === 'quiz' && activeChallenge && quizQuestions.length > 0) {
        const opponent = getOpponent(activeChallenge);
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-2xl p-4 sm:p-6",
            style: {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between mb-4 flex-wrap gap-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: backToArena,
                                    className: "w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.05]",
                                    style: {
                                        border: '1px solid rgba(255,255,255,0.06)'
                                    },
                                    "aria-label": "Back to arena",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#8b95a8]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                    className: "w-5 h-5 text-[#ff5757]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-sm font-bold text-[#e8ecf4]",
                                                    children: "Challenge Quiz"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 mt-0.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                                    style: {
                                                        background: 'rgba(255,87,87,0.1)',
                                                        color: '#ff5757'
                                                    },
                                                    children: [
                                                        "VS ",
                                                        opponent.name || 'Opponent'
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                                    style: {
                                                        background: getDifficultyBg(activeChallenge.difficulty),
                                                        color: getDifficultyColor(activeChallenge.difficulty)
                                                    },
                                                    children: activeChallenge.difficulty
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        color: '#8b95a8'
                                                    },
                                                    children: activeChallenge.topic
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#5a6478]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-mono font-bold text-[#e8ecf4]",
                                            children: formatTimer(timerSeconds)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-sm font-bold text-[#e8ecf4]",
                                            children: [
                                                currentIndex + 1,
                                                "/",
                                                quizQuestions.length
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mb-5",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1.5 rounded-full overflow-hidden",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-300",
                            style: {
                                width: `${(currentIndex + 1) / quizQuestions.length * 100}%`,
                                background: 'linear-gradient(90deg, #ff5757, #00e5a0)'
                            }
                        })
                    })
                }),
                currentQ && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-xl p-5 sm:p-6 mb-5",
                    style: {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                    style: {
                                        background: currentQ.type === 'mcq' ? 'rgba(59,130,246,0.1)' : currentQ.type === 'tf' ? 'rgba(245,158,11,0.1)' : 'rgba(139,92,246,0.1)',
                                        color: currentQ.type === 'mcq' ? '#3b82f6' : currentQ.type === 'tf' ? '#f59e0b' : '#8b5cf6'
                                    },
                                    children: currentQ.type === 'mcq' ? 'MCQ' : currentQ.type === 'tf' ? 'True/False' : 'Short Answer'
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                    style: {
                                        background: getDifficultyBg(currentQ.difficulty),
                                        color: getDifficultyColor(currentQ.difficulty)
                                    },
                                    children: currentQ.difficulty
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                                    style: {
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#8b95a8'
                                    },
                                    children: currentQ.system
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[15px] sm:text-base leading-relaxed text-[#e8ecf4] mb-5",
                            children: stripHtml(currentQ.text)
                        }),
                        currentQ.type === 'mcq' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2.5",
                            children: currentOptions.map((opt, i)=>{
                                const letter = String.fromCharCode(65 + i);
                                const isSelected = answers[currentQ.id] === opt;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setAnswers((prev)=>({
                                                ...prev,
                                                [currentQ.id]: opt
                                            })),
                                    className: "w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all",
                                    style: {
                                        background: isSelected ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)',
                                        border: isSelected ? '1px solid rgba(0,229,160,0.25)' : '1px solid rgba(255,255,255,0.06)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all",
                                            style: {
                                                background: isSelected ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.05)',
                                                color: isSelected ? '#00e5a0' : '#5a6478'
                                            },
                                            children: letter
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm leading-relaxed",
                                            style: {
                                                color: isSelected ? '#e8ecf4' : '#8b95a8'
                                            },
                                            children: stripHtml(opt)
                                        })
                                    ]
                                }, i);
                            })
                        }),
                        currentQ.type === 'tf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                'True',
                                'False'
                            ].map((opt)=>{
                                const isSelected = answers[currentQ.id] === opt;
                                const isTrue = opt === 'True';
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setAnswers((prev)=>({
                                                ...prev,
                                                [currentQ.id]: opt
                                            })),
                                    className: "flex items-center justify-center gap-2 p-4 rounded-xl text-sm font-bold transition-all",
                                    style: {
                                        background: isSelected ? isTrue ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.03)',
                                        border: isSelected ? isTrue ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                        color: isSelected ? isTrue ? '#22c55e' : '#ef4444' : '#8b95a8'
                                    },
                                    children: [
                                        isTrue ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            className: "w-5 h-5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-5 h-5"
                                        }),
                                        opt
                                    ]
                                }, opt);
                            })
                        }),
                        currentQ.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                            type: "text",
                            value: answers[currentQ.id] || '',
                            onChange: (e)=>setAnswers((prev)=>({
                                        ...prev,
                                        [currentQ.id]: e.target.value
                                    })),
                            placeholder: "Type your answer...",
                            className: "w-full p-3.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40",
                            style: {
                                background: 'rgba(255,255,255,0.03)',
                                border: answers[currentQ.id]?.trim() ? '1px solid rgba(0,229,160,0.25)' : '1px solid rgba(255,255,255,0.06)'
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: ()=>setCurrentIndex((prev)=>Math.max(0, prev - 1)),
                            disabled: currentIndex <= 0,
                            className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                            style: {
                                background: 'rgba(255,255,255,0.05)',
                                color: '#8b95a8',
                                border: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: "Previous"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center gap-1.5 overflow-x-auto max-w-[200px]",
                            style: {
                                scrollbarWidth: 'none'
                            },
                            children: quizQuestions.map((q, i)=>{
                                const isAnswered = !!answers[q.id]?.trim();
                                const isCurrent = i === currentIndex;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIndex(i),
                                    className: "w-2.5 h-2.5 rounded-full transition-all flex-shrink-0",
                                    style: {
                                        background: isCurrent ? '#00e5a0' : isAnswered ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.1)',
                                        transform: isCurrent ? 'scale(1.3)' : 'scale(1)'
                                    },
                                    "aria-label": `Go to question ${i + 1}`
                                }, q.id);
                            })
                        }),
                        currentIndex < quizQuestions.length - 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: ()=>setCurrentIndex((prev)=>prev + 1),
                            className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all",
                            style: {
                                background: 'rgba(255,255,255,0.05)',
                                color: '#e8ecf4',
                                border: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                "Next ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: handleSubmitQuiz,
                            disabled: !allAnswered || submitting,
                            className: "flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                            style: {
                                background: allAnswered ? 'linear-gradient(135deg, #ff5757, #00e5a0)' : 'rgba(0,229,160,0.1)',
                                color: allAnswered ? '#0c0e14' : '#00e5a0',
                                boxShadow: allAnswered ? '0 4px 15px rgba(0,229,160,0.25)' : 'none'
                            },
                            children: submitting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }),
                                    " Submitting..."
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    " Submit"
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mt-4 text-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-[11px] text-[#5a6478]",
                        children: [
                            answeredCount,
                            " of ",
                            quizQuestions.length,
                            " answered"
                        ]
                    })
                })
            ]
        });
    }
    /* ═══════════════════════════════════════════════════════ */ /* ─── RENDER: RESULTS MODE ──                            */ /* ═══════════════════════════════════════════════════════ */ if (viewMode === 'results' && resultData) {
        const { challenge, score, totalQuestions, creditsEarned, isWinner, isTie } = resultData;
        const scorePct = Math.round(score / totalQuestions * 100);
        const isChallenger = challenge.challengerId === userId;
        const myScore = isChallenger ? challenge.challengerScore : challenge.challengedScore;
        const opponentScore = isChallenger ? challenge.challengedScore : challenge.challengerScore;
        const opponent = isChallenger ? challenge.challenged : challenge.challenger;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rounded-2xl p-4 sm:p-6",
            style: {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-center py-6 sm:py-8",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center",
                        style: {
                            background: isWinner ? 'linear-gradient(135deg, rgba(0,229,160,0.2), rgba(0,229,160,0.05))' : isTie ? 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))' : 'linear-gradient(135deg, rgba(255,87,87,0.2), rgba(255,87,87,0.05))',
                            boxShadow: isWinner ? '0 0 40px rgba(0,229,160,0.2)' : isTie ? '0 0 40px rgba(245,158,11,0.2)' : '0 0 40px rgba(255,87,87,0.2)'
                        },
                        children: isWinner ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            className: "w-12 h-12 text-[#00e5a0]"
                        }) : isTie ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "w-12 h-12 text-[#f59e0b]"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-12 h-12 text-[#ff5757]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                        className: "text-2xl font-bold text-[#e8ecf4] mb-2",
                        children: isWinner ? 'Victory!' : isTie ? "It's a Tie!" : 'Defeat'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] mb-6",
                        children: isWinner ? 'You dominated this challenge!' : isTie ? 'Evenly matched opponents!' : 'Better luck next time!'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-center gap-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AvatarCircle, {
                                        user: {
                                            name: user?.name || 'You',
                                            image: user?.image || null
                                        },
                                        size: 48
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#8b95a8] mt-2 max-w-[80px] truncate",
                                        children: user?.name || 'You'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-2xl font-black text-[#00e5a0] mt-1",
                                        children: myScore
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs text-[#5a6478] font-semibold mb-1",
                                        children: "VS"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-6 h-6 text-[#ff5757]"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AvatarCircle, {
                                        user: opponent,
                                        size: 48
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#8b95a8] mt-2 max-w-[80px] truncate",
                                        children: opponent.name || 'Opponent'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-2xl font-black text-[#ff5757] mt-1",
                                        children: opponentScore >= 0 ? opponentScore : '?'
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-center gap-4 sm:gap-6 mb-6 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-sm text-[#8b95a8]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "font-bold text-[#e8ecf4]",
                                                children: [
                                                    scorePct,
                                                    "%"
                                                ]
                                            }),
                                            " accuracy"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#5a6478]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm text-[#8b95a8]",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-bold text-[#e8ecf4]",
                                            children: formatTimer(timerSeconds)
                                        })
                                    })
                                ]
                            }),
                            creditsEarned > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#f59e0b]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-sm font-bold text-[#f59e0b]",
                                        children: [
                                            "+",
                                            creditsEarned,
                                            " credits"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    challenge.status !== 'completed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "max-w-sm mx-auto rounded-xl p-4 mb-6",
                        style: {
                            background: 'rgba(245,158,11,0.06)',
                            border: '1px solid rgba(245,158,11,0.12)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#f59e0b] animate-spin"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-left",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs font-semibold text-[#e8ecf4]",
                                            children: "Waiting for opponent"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: [
                                                opponent.name || 'Opponent',
                                                " hasn't completed the challenge yet"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: backToArena,
                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            color: '#e8ecf4',
                            border: '1px solid rgba(255,255,255,0.1)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            " Back to Arena"
                        ]
                    })
                ]
            })
        });
    }
    /* ═══════════════════════════════════════════════════════ */ /* ─── RENDER: ARENA DASHBOARD ──                         */ /* ═══════════════════════════════════════════════════════ */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-2xl p-4 sm:p-6",
        style: {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-6 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                style: {
                                    background: 'linear-gradient(135deg, rgba(255,87,87,0.15), rgba(0,229,160,0.15))',
                                    boxShadow: '0 0 20px rgba(255,87,87,0.1), 0 0 20px rgba(0,229,160,0.1)'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#ff5757]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Challenge Arena"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#5a6478]",
                                        children: "Challenge friends & compete"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: openNewChallenge,
                        className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95",
                        style: {
                            background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                            color: '#0c0e14',
                            boxShadow: '0 4px 15px rgba(0,229,160,0.25)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            " New Challenge"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-3 gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                        label: "Wins",
                        value: wins,
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        }),
                        color: "#00e5a0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                        label: "Losses",
                        value: losses,
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        }),
                        color: "#ff5757"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                        label: "Win Rate",
                        value: `${winRate}%`,
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        }),
                        color: "#f59e0b"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center justify-between mb-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                            className: "text-sm font-bold text-[#e8ecf4] flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#ff5757]"
                                }),
                                "Active Challenges",
                                activeChallenges.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                                    style: {
                                        background: 'rgba(255,87,87,0.1)',
                                        color: '#ff5757'
                                    },
                                    children: activeChallenges.length
                                })
                            ]
                        })
                    }),
                    activeChallenges.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-6 text-center",
                        style: {
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.04)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-8 h-8 text-[#3a4055] mx-auto mb-2"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478]",
                                children: "No active challenges"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#3a4055]",
                                children: "Challenge a friend to start a battle!"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-3 max-h-96 overflow-y-auto pr-1",
                        style: {
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.08) transparent'
                        },
                        children: activeChallenges.map((c)=>{
                            const opponent = getOpponent(c);
                            const isChallenger = isUserChallenger(c);
                            const myScore = isChallenger ? c.challengerScore : c.challengedScore;
                            const myScoreDisplay = myScore >= 0 ? myScore : null;
                            const isPendingReceived = c.status === 'pending' && !isChallenger;
                            const needsMyAction = c.status === 'pending' && !isChallenger || c.status === 'active' && myScore < 0;
                            const opponentCompleted = isChallenger ? c.challengedScore >= 0 : c.challengerScore >= 0;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "rounded-xl p-4 cursor-pointer transition-all hover:bg-white/[0.02] group",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                },
                                onClick: ()=>{
                                    if (isPendingReceived) handleAcceptChallenge(c.id);
                                    else if (needsMyAction) enterChallenge(c);
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AvatarCircle, {
                                            user: opponent,
                                            size: 40
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2 mb-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-sm font-bold text-[#e8ecf4] truncate",
                                                            children: opponent.name || 'Opponent'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0",
                                                            style: {
                                                                background: getDifficultyBg(c.difficulty),
                                                                color: getDifficultyColor(c.difficulty)
                                                            },
                                                            children: c.difficulty
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                color: '#8b95a8'
                                                            },
                                                            children: c.topic
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        isPendingReceived ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] font-semibold text-[#f59e0b] flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                }),
                                                                " Waiting for your acceptance"
                                                            ]
                                                        }) : needsMyAction ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] font-semibold text-[#00e5a0] flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                }),
                                                                " Your turn to play!"
                                                            ]
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] font-semibold text-[#4fc3f7] flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                }),
                                                                " Waiting for opponent"
                                                            ]
                                                        }),
                                                        opponentCompleted && !needsMyAction && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[10px] text-[#5a6478]",
                                                            children: "Opponent completed"
                                                        })
                                                    ]
                                                }),
                                                myScoreDisplay !== null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "mt-1",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[10px] text-[#8b95a8]",
                                                        children: [
                                                            "Your score: ",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "font-bold text-[#00e5a0]",
                                                                children: [
                                                                    myScoreDisplay,
                                                                    "/",
                                                                    c.totalQuestions
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-col items-end gap-1 flex-shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] text-[#5a6478] flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                            className: "w-3 h-3"
                                                        }),
                                                        formatTimeRemaining(c.expiresAt)
                                                    ]
                                                }),
                                                needsMyAction && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#00e5a0] group-hover:translate-x-0.5 transition-transform"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }, c.id);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center justify-between mb-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                            className: "text-sm font-bold text-[#e8ecf4] flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#f59e0b]"
                                }),
                                " Completed Challenges"
                            ]
                        })
                    }),
                    completedChallenges.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-6 text-center",
                        style: {
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.04)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                className: "w-8 h-8 text-[#3a4055] mx-auto mb-2"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478]",
                                children: "No completed challenges yet"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-3 max-h-96 overflow-y-auto pr-1",
                        style: {
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.08) transparent'
                        },
                        children: completedChallenges.map((c)=>{
                            const isChallenger = isUserChallenger(c);
                            const myScore = isChallenger ? c.challengerScore : c.challengedScore;
                            const opponentScore = isChallenger ? c.challengedScore : c.challengerScore;
                            const opponent = getOpponent(c);
                            const iWon = c.winnerId === userId;
                            const isTieResult = !c.winnerId;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "rounded-xl p-4 transition-all hover:bg-white/[0.02]",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${iWon ? 'rgba(0,229,160,0.12)' : isTieResult ? 'rgba(245,158,11,0.12)' : 'rgba(255,87,87,0.12)'}`
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                            style: {
                                                background: iWon ? 'rgba(0,229,160,0.1)' : isTieResult ? 'rgba(245,158,11,0.1)' : 'rgba(255,87,87,0.1)'
                                            },
                                            children: iWon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                className: "w-5 h-5 text-[#00e5a0]"
                                            }) : isTieResult ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "w-5 h-5 text-[#f59e0b]"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-5 h-5 text-[#ff5757]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2 mb-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-sm font-bold text-[#e8ecf4] truncate",
                                                            children: [
                                                                "vs ",
                                                                opponent.name || 'Opponent'
                                                            ]
                                                        }),
                                                        iWon && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                                                            style: {
                                                                background: 'rgba(0,229,160,0.1)',
                                                                color: '#00e5a0'
                                                            },
                                                            children: "WIN"
                                                        }),
                                                        isTieResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                                                            style: {
                                                                background: 'rgba(245,158,11,0.1)',
                                                                color: '#f59e0b'
                                                            },
                                                            children: "TIE"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-3 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-sm font-black text-[#00e5a0]",
                                                            children: myScore
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[10px] text-[#3a4055]",
                                                            children: "-"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-sm font-black text-[#ff5757]",
                                                            children: opponentScore
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] text-[#5a6478]",
                                                            children: [
                                                                "(",
                                                                c.totalQuestions,
                                                                " Qs)"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        (iWon || isTieResult) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1 flex-shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#f59e0b]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] font-bold text-[#f59e0b]",
                                                    children: [
                                                        "+",
                                                        iWon ? 15 : 5
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }, c.id);
                        })
                    })
                ]
            }),
            showNewDialog && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                onClick: ()=>setShowNewDialog(false),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative w-full max-w-md rounded-2xl p-6",
                        style: {
                            background: '#151821',
                            border: '1px solid rgba(255,255,255,0.08)'
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3 mb-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                        style: {
                                            background: 'linear-gradient(135deg, rgba(255,87,87,0.15), rgba(0,229,160,0.15))'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-[#ff5757]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                className: "text-lg font-bold text-[#e8ecf4]",
                                                children: "New Challenge"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-[#5a6478]",
                                                children: "Challenge a friend to a quiz battle"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-xs font-semibold text-[#8b95a8] mb-2 block",
                                        children: "Select Friend"
                                    }),
                                    friendsLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex items-center justify-center p-4",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-5 h-5 animate-spin text-[#00e5a0]"
                                        })
                                    }) : friends.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "rounded-xl p-4 text-center",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                className: "w-6 h-6 text-[#3a4055] mx-auto mb-2"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-[#5a6478]",
                                                children: "No friends yet"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-[#3a4055]",
                                                children: "Add friends to challenge them"
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "space-y-1.5 max-h-40 overflow-y-auto",
                                        style: {
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: 'rgba(255,255,255,0.08) transparent'
                                        },
                                        children: friends.map((f)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                onClick: ()=>setSelectedFriend(f.id),
                                                className: "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all",
                                                style: {
                                                    background: selectedFriend === f.id ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.02)',
                                                    border: selectedFriend === f.id ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.04)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AvatarCircle, {
                                                        user: f,
                                                        size: 32
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-sm font-semibold text-[#e8ecf4] truncate",
                                                                children: f.name || 'User'
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[10px] text-[#5a6478] truncate",
                                                                children: f.email
                                                            })
                                                        ]
                                                    }),
                                                    selectedFriend === f.id && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#00e5a0] flex-shrink-0"
                                                    })
                                                ]
                                            }, f.id))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-xs font-semibold text-[#8b95a8] mb-2 block",
                                        children: "Topic"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: [
                                            'Mixed',
                                            'Cardiovascular',
                                            'Respiratory',
                                            'Neurology',
                                            'Gastrointestinal',
                                            'Renal',
                                            'Endocrine',
                                            'Musculoskeletal',
                                            'Hematology'
                                        ].map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setChallengeTopic(t),
                                                className: "text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all",
                                                style: {
                                                    background: challengeTopic === t ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.03)',
                                                    border: challengeTopic === t ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.06)',
                                                    color: challengeTopic === t ? '#00e5a0' : '#8b95a8'
                                                },
                                                children: t
                                            }, t))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-xs font-semibold text-[#8b95a8] mb-2 block",
                                        children: "Difficulty"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex gap-2",
                                        children: [
                                            'Mixed',
                                            'Easy',
                                            'Basic',
                                            'Moderate',
                                            'Hard',
                                            'Expert'
                                        ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setChallengeDifficulty(d),
                                                className: "flex-1 text-[10px] font-semibold px-2.5 py-2 rounded-lg transition-all",
                                                style: {
                                                    background: challengeDifficulty === d ? getDifficultyBg(d) : 'rgba(255,255,255,0.03)',
                                                    border: challengeDifficulty === d ? `1px solid ${getDifficultyColor(d)}30` : '1px solid rgba(255,255,255,0.06)',
                                                    color: challengeDifficulty === d ? getDifficultyColor(d) : '#8b95a8'
                                                },
                                                children: d
                                            }, d))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-xs font-semibold text-[#8b95a8] mb-2 block",
                                        children: "Number of Questions"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex gap-2",
                                        children: [
                                            3,
                                            5,
                                            10
                                        ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                onClick: ()=>setChallengeQCount(n),
                                                className: "flex-1 text-xs font-semibold px-3 py-2.5 rounded-lg transition-all",
                                                style: {
                                                    background: challengeQCount === n ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.03)',
                                                    border: challengeQCount === n ? '1px solid rgba(0,229,160,0.2)' : '1px solid rgba(255,255,255,0.06)',
                                                    color: challengeQCount === n ? '#00e5a0' : '#8b95a8'
                                                },
                                                children: [
                                                    n,
                                                    " Qs"
                                                ]
                                            }, n))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setShowNewDialog(false),
                                        className: "flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#8b95a8',
                                            border: '1px solid rgba(255,255,255,0.06)'
                                        },
                                        children: "Cancel"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: handleSendChallenge,
                                        disabled: !selectedFriend || sending,
                                        className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                        style: {
                                            background: selectedFriend ? 'linear-gradient(135deg, #00e5a0, #00b87a)' : 'rgba(0,229,160,0.15)',
                                            color: selectedFriend ? '#0c0e14' : '#00e5a0',
                                            boxShadow: selectedFriend ? '0 4px 15px rgba(0,229,160,0.25)' : 'none'
                                        },
                                        children: sending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 animate-spin"
                                                }),
                                                " Sending..."
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_ArrowLeft_ArrowRight_CheckCircle2_ChevronRight_Clock_Crown_Flame_Loader2_Medal_Plus_Send_Swords_Target_Timer_Trophy_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " Send Challenge"
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;