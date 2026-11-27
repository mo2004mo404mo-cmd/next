"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[74290],{

/***/ 36083:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Trophy)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "trophy",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",
                key: "pwuv1l"
            }
        ],
        [
            "path",
            {
                d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",
                key: "1y54w1"
            }
        ],
        [
            "path",
            {
                d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",
                key: "e30mpu"
            }
        ],
        [
            "path",
            {
                d: "M4 22h16",
                key: "57wxv0"
            }
        ],
        [
            "path",
            {
                d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
                key: "1mhfuq"
            }
        ],
        [
            "path",
            {
                d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",
                key: "i0yafy"
            }
        ]
    ]
};
__iconData.node;
const Trophy = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trophy.mjs.map


/***/ }),

/***/ 74290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LiveQuizSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52524);
/* harmony import */ var _lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89661);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15532);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(57465);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(36083);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(86272);
/* harmony import */ var _components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3301);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * LiveQuizSection — Kahoot-style multiplayer quiz synced via socket.io.
 *
 * Flow:
 *   1. Host clicks "Create live quiz" → chooses count/difficulty → calls
 *      POST /api/groups/[id]/live-quiz to build a question payload from the
 *      group's question bank.
 *   2. Host emits socket 'quiz:create' with the questions. All room members
 *      receive 'quiz:created' and can join via 'quiz:join' (lobby state).
 *   3. Host clicks "Start" → 'quiz:start' → first question is broadcast.
 *   4. Players submit answers via 'quiz:answer' (server tracks, hides answer).
 *   5. Host clicks "Reveal" (or timer auto-fires) → 'quiz:reveal' shows
 *      correctness + leaderboard.
 *   6. Host clicks "Next" → either next question or 'quiz:finished' with
 *      final leaderboard.
 *
 * State machine (client-side):
 *   idle → lobby → question → reveal → (next question) → ... → finished
 */ 




const TOKENS = {
    color: {
        green: 'var(--medq-accent-green, #00e5a0)',
        orange: 'var(--medq-accent-amber, #f59e0b)',
        purple: 'var(--medq-accent-purple, #a78bfa)',
        blue: '#4fc3f7',
        red: 'var(--medq-accent-danger, #ff5757)',
        muted: '#8b95a7'
    }
};
function LiveQuizSection({ groupId, isAdmin }) {
    const { user, authHeaders } = (0,_components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_3__/* .useCurrentUser */ .i)();
    const socketRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [sessionId, setSessionId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [sessionTitle, setSessionTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Live Quiz');
    const [hostId, setHostId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [hostName, setHostName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [players, setPlayers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentQuestion, setCurrentQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [questionIndex, setQuestionIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);
    const [questionCount, setQuestionCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [myAnswer, setMyAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [correctIndex, setCorrectIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [explanation, setExplanation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [revealResults, setRevealResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [finalResults, setFinalResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [creating, setCreating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [secondsLeft, setSecondsLeft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Setup socket on mount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user) return;
        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__.io)((0,_lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_4__/* .chatSocketUrl */ .z)(), {
            transports: [
                'websocket',
                'polling'
            ],
            reconnectionDelay: 3000
        });
        socketRef.current = socket;
        socket.on('connect', ()=>socket.emit('identify', user.id));
        // Quiz events
        socket.on('quiz:created', (data)=>{
            setSessionId(data.sessionId);
            setSessionTitle(data.title || 'Live Quiz');
            setHostId(data.hostId);
            setHostName(data.hostName || '');
            setQuestionCount(data.questionCount);
            setPhase('lobby');
            setPlayers([]);
            // Auto-join if I'm the host
            if (data.hostId === user.id) {
                socket.emit('quiz:join', {
                    sessionId: data.sessionId,
                    userId: user.id,
                    userName: user.name || 'Host'
                });
            }
        });
        socket.on('quiz:state', (data)=>{
            setSessionId(data.sessionId);
            setSessionTitle(data.title || 'Live Quiz');
            setHostId(data.hostId);
            setHostName(data.hostName || '');
            setQuestionCount(data.questionCount || 0);
            if (data.status === 'lobby') setPhase('lobby');
        // If quiz already in progress, the player sees a "started" message
        });
        socket.on('quiz:player-joined', (data)=>{
            setPlayers(data.players || []);
        });
        socket.on('quiz:player-left', (data)=>{
            setPlayers((prev)=>prev.filter((p)=>p.userId !== data.userId));
        });
        socket.on('quiz:question-start', (data)=>{
            setCurrentQuestion(data.question);
            setQuestionIndex(data.questionIndex);
            setMyAnswer(null);
            setCorrectIndex(null);
            setExplanation('');
            setRevealResults([]);
            setPhase('question');
            // Start countdown
            if (timerRef.current) clearInterval(timerRef.current);
            setSecondsLeft(data.question.durationSec);
            const startedAt = data.startedAt || Date.now();
            const tick = ()=>{
                const elapsed = Math.floor((Date.now() - startedAt) / 1000);
                const remaining = data.question.durationSec - elapsed;
                setSecondsLeft(Math.max(0, remaining));
                if (remaining <= 0) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    // Host auto-reveals when timer expires
                    if (hostId === user.id) {
                        socket.emit('quiz:reveal', {
                            sessionId: data.sessionId,
                            userId: user.id
                        });
                    }
                }
            };
            tick();
            timerRef.current = setInterval(tick, 500);
        });
        socket.on('quiz:player-answered', (data)=>{
            // Update players to show "answered" indicator without revealing which option
            setPlayers((prev)=>prev.map((p)=>data.userId === p.userId ? {
                        ...p,
                        hasAnswered: true
                    } : p));
        });
        socket.on('quiz:reveal', (data)=>{
            if (timerRef.current) clearInterval(timerRef.current);
            setCorrectIndex(data.correctIndex);
            setExplanation(data.explanation || '');
            setRevealResults(data.results || []);
            setPhase('reveal');
        });
        socket.on('quiz:finished', (data)=>{
            setFinalResults(data.results || []);
            setPhase('finished');
        });
        socket.on('quiz:cancelled', (data)=>{
            setError(`Quiz cancelled: ${data.reason || 'Host left'}`);
            resetState();
        });
        socket.on('quiz:error', (data)=>{
            setError(data.message || 'Quiz error');
        });
        return ()=>{
            socket.disconnect();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user,
        hostId
    ]);
    function resetState() {
        setPhase('idle');
        setSessionId(null);
        setCurrentQuestion(null);
        setPlayers([]);
        setRevealResults([]);
        setFinalResults([]);
        setMyAnswer(null);
        setCorrectIndex(null);
    }
    // ── Host actions ──
    async function handleCreateQuiz(count, difficulty, source) {
        if (!user || !authHeaders) return;
        setCreating(true);
        setError(null);
        try {
            // 1) Fetch questions from the selected source(s)
            const res = await fetch(`/api/groups/${groupId}/live-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders()
                },
                body: JSON.stringify({
                    count,
                    difficulty,
                    source
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to build quiz');
            }
            const data = await res.json();
            if (!data.questions || data.questions.length === 0) {
                setError(data.warning || 'No questions available. Try a different source or filter.');
                return;
            }
            // 2) Emit quiz:create — server will broadcast quiz:created to all room members
            // Note: the host needs to be in the room:<roomId> for this to work, but
            // since LiveQuizSection is rendered inside GroupStudyPanel which is
            // opened FROM a chat room, we can rely on the parent chat having joined
            // the room. As a fallback, we emit and rely on the server broadcasting
            // to room:<groupId> — we use the group's linked chatRoomId.
            // For simplicity, we look up the chat room ID via the study-group endpoint.
            // The socket server uses room:<roomId>, but the GroupStudyPanel doesn't
            // know the roomId directly. We'll use the groupId as a proxy and add
            // the user to a room:group:<groupId> socket room on the server.
            // For now, we use a simpler approach: emit the quiz:create with the
            // groupId, and rely on the host's chat having already joined room:<roomId>.
            // The server's quiz:create broadcasts to room:<roomId>, so we need to
            // pass roomId. We'll fetch it.
            // Actually, the host is in the chat room (they opened the study panel
            // from it), so the socket connection has already called join:room with
            // the chat roomId. We just need to know it here.
            // For the simplest v1, let's have the host pass the groupId and the
            // server will broadcast to a "group:<groupId>" room that we join here.
            const socket = socketRef.current;
            if (!socket) return;
            // Join a group-scoped socket room so we can broadcast to all group members
            socket.emit('join:group-quiz', {
                groupId
            });
            socket.emit('quiz:create', {
                roomId: groupId,
                hostId: user.id,
                hostName: user.name || 'Host',
                title: `Live Quiz · ${data.questions.length} questions`,
                questions: data.questions
            });
        } catch (e) {
            setError(e.message || 'Failed to create quiz');
        } finally{
            setCreating(false);
        }
    }
    function handleStart() {
        if (!sessionId || !user) return;
        socketRef.current?.emit('quiz:start', {
            sessionId,
            userId: user.id
        });
    }
    function handleReveal() {
        if (!sessionId || !user) return;
        if (timerRef.current) clearInterval(timerRef.current);
        socketRef.current?.emit('quiz:reveal', {
            sessionId,
            userId: user.id
        });
    }
    function handleNext() {
        if (!sessionId || !user) return;
        socketRef.current?.emit('quiz:next', {
            sessionId,
            userId: user.id
        });
    }
    function handleLeave() {
        if (!sessionId || !user) return;
        socketRef.current?.emit('quiz:leave', {
            sessionId,
            userId: user.id
        });
        resetState();
    }
    // ── Player actions ──
    function handleSubmitAnswer(optionIndex) {
        if (!sessionId || !user || myAnswer !== null) return;
        setMyAnswer(optionIndex);
        socketRef.current?.emit('quiz:answer', {
            sessionId,
            userId: user.id,
            optionIndex
        });
    }
    function handleJoinLobby() {
        if (!sessionId || !user) return;
        socketRef.current?.emit('quiz:join', {
            sessionId,
            userId: user.id,
            userName: user.name || 'Player'
        });
    }
    // ════════════════════════════════════════════════════════════════════════
    // RENDER
    // ════════════════════════════════════════════════════════════════════════
    if (!user) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12 text-xs",
            style: {
                color: TOKENS.color.muted
            },
            children: "Sign in to use Live Quiz"
        });
    }
    // ── IDLE: choose to create or wait for incoming quiz ──
    if (phase === 'idle') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center py-8",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3",
                            style: {
                                background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(99,102,241,0.1))'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-7 h-7",
                                style: {
                                    color: TOKENS.color.purple
                                }
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-base font-bold text-white",
                            children: "Live Multiplayer Quiz"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs mt-1.5 max-w-md mx-auto",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "Start a Kahoot-style quiz that everyone in the chat can join simultaneously. Pull from this group's curated question bank, the global MedQ bank, or mix both."
                        })
                    ]
                }),
                error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "p-3 rounded-lg text-xs",
                    style: {
                        background: 'rgba(255,87,87,0.1)',
                        color: TOKENS.color.red,
                        border: `1px solid rgba(255,87,87,0.2)`
                    },
                    children: error
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-md mx-auto space-y-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(QuizCreateCard, {
                            onCreate: handleCreateQuiz,
                            creating: creating
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] text-center",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "When another member starts a quiz, you'll see a join button here automatically."
                        })
                    ]
                })
            ]
        });
    }
    // ── LOBBY ──
    if (phase === 'lobby') {
        const isHost = hostId === user.id;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: handleLeave,
                            className: "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold",
                            style: {
                                color: TOKENS.color.muted,
                                background: 'rgba(255,255,255,0.04)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                }),
                                " Leave"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded",
                            style: {
                                background: 'rgba(167,139,250,0.15)',
                                color: TOKENS.color.purple
                            },
                            children: "Lobby"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center py-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-10 h-10 mx-auto mb-2 animate-pulse",
                            style: {
                                color: TOKENS.color.purple
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-lg font-bold text-white",
                            children: sessionTitle
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs mt-1",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: [
                                "Hosted by ",
                                hostName,
                                " \xb7 ",
                                questionCount,
                                " questions"
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 rounded-2xl",
                    style: {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center justify-between mb-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-xs font-semibold",
                                style: {
                                    color: TOKENS.color.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 inline mr-1"
                                    }),
                                    players.length,
                                    " player",
                                    players.length !== 1 ? 's' : '',
                                    " in lobby"
                                ]
                            })
                        }),
                        players.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-center text-xs py-3",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "Waiting for players to join…"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                            children: players.map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 p-2 rounded-lg",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                                            style: {
                                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                            },
                                            children: (p.userName || '?')[0]?.toUpperCase()
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs font-semibold text-white truncate",
                                            children: [
                                                p.userName,
                                                p.userId === hostId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 inline ml-1",
                                                    style: {
                                                        color: TOKENS.color.orange
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }, p.userId))
                        })
                    ]
                }),
                isHost ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleStart,
                        disabled: players.length === 0,
                        className: "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40",
                        style: {
                            background: 'rgba(0,229,160,0.15)',
                            color: TOKENS.color.green,
                            border: '1px solid rgba(0,229,160,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            " Start Quiz"
                        ]
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-center text-[11px]",
                    style: {
                        color: TOKENS.color.muted
                    },
                    children: "Waiting for host to start the quiz…"
                })
            ]
        });
    }
    // ── QUESTION ──
    if (phase === 'question' && currentQuestion) {
        const isHost = hostId === user.id;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[11px] font-semibold",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: [
                                "Question ",
                                questionIndex + 1,
                                " / ",
                                questionCount
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-1.5 px-2 py-1 rounded-lg",
                            style: {
                                background: secondsLeft <= 5 ? 'rgba(255,87,87,0.15)' : 'rgba(255,255,255,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5",
                                    style: {
                                        color: secondsLeft <= 5 ? TOKENS.color.red : TOKENS.color.muted
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-xs font-bold",
                                    style: {
                                        color: secondsLeft <= 5 ? TOKENS.color.red : '#fff'
                                    },
                                    children: [
                                        secondsLeft,
                                        "s"
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-5 rounded-2xl text-center",
                    style: {
                        background: 'rgba(167,139,250,0.05)',
                        border: '1px solid rgba(167,139,250,0.2)'
                    },
                    children: [
                        currentQuestion.source || currentQuestion.system || currentQuestion.topic ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-center gap-1.5 mb-2 flex-wrap",
                            children: [
                                currentQuestion.source && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[9px] font-semibold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1",
                                    style: {
                                        background: currentQuestion.source === 'group' ? 'rgba(0,229,160,0.12)' : 'rgba(79,195,247,0.12)',
                                        color: currentQuestion.source === 'group' ? TOKENS.color.green : TOKENS.color.blue,
                                        border: `1px solid ${currentQuestion.source === 'group' ? 'rgba(0,229,160,0.2)' : 'rgba(79,195,247,0.2)'}`
                                    },
                                    children: currentQuestion.source === 'group' ? '👥 Group bank' : '🌍 Global bank'
                                }),
                                currentQuestion.system && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[9px] font-semibold px-1.5 py-0.5 rounded-full",
                                    style: {
                                        background: 'rgba(255,255,255,0.04)',
                                        color: TOKENS.color.muted
                                    },
                                    children: [
                                        currentQuestion.system,
                                        currentQuestion.topic ? ` · ${currentQuestion.topic}` : ''
                                    ]
                                })
                            ]
                        }) : null,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-base font-bold text-white",
                            children: currentQuestion.text
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                    children: currentQuestion.options.map((opt, i)=>{
                        const selected = myAnswer === i;
                        const colors = [
                            {
                                bg: 'rgba(255,87,87,0.1)',
                                border: 'rgba(255,87,87,0.3)',
                                text: TOKENS.color.red,
                                label: 'A'
                            },
                            {
                                bg: 'rgba(79,195,247,0.1)',
                                border: 'rgba(79,195,247,0.3)',
                                text: TOKENS.color.blue,
                                label: 'B'
                            },
                            {
                                bg: 'rgba(245,158,11,0.1)',
                                border: 'rgba(245,158,11,0.3)',
                                text: TOKENS.color.orange,
                                label: 'C'
                            },
                            {
                                bg: 'rgba(0,229,160,0.1)',
                                border: 'rgba(0,229,160,0.3)',
                                text: TOKENS.color.green,
                                label: 'D'
                            }
                        ];
                        const c = colors[i % colors.length];
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>handleSubmitAnswer(i),
                            disabled: myAnswer !== null || isHost,
                            className: "p-3 rounded-xl text-left transition-all disabled:opacity-70",
                            style: {
                                background: selected ? c.bg : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${selected ? c.border : 'rgba(255,255,255,0.06)'}`,
                                opacity: myAnswer !== null && !selected ? 0.4 : 1
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold",
                                        style: {
                                            background: c.bg,
                                            color: c.text
                                        },
                                        children: c.label
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-semibold text-white",
                                        children: opt
                                    }),
                                    selected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-4 h-4 ml-auto",
                                        style: {
                                            color: c.text
                                        }
                                    })
                                ]
                            })
                        }, i);
                    })
                }),
                isHost && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex justify-center gap-2",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleReveal,
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
                        style: {
                            background: 'rgba(167,139,250,0.15)',
                            color: TOKENS.color.purple
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Reveal answers"
                        ]
                    })
                }),
                !isHost && myAnswer !== null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-center text-[11px]",
                    style: {
                        color: TOKENS.color.muted
                    },
                    children: "Answer locked in. Waiting for host to reveal…"
                }),
                !isHost && myAnswer === null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-center text-[11px]",
                    style: {
                        color: TOKENS.color.muted
                    },
                    children: "Pick an answer above ↑"
                })
            ]
        });
    }
    // ── REVEAL ──
    if (phase === 'reveal') {
        const isHost = hostId === user.id;
        const myResult = revealResults.find((r)=>r.userId === user.id);
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center py-2",
                    children: [
                        myResult?.isCorrect ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                    className: "w-12 h-12 mx-auto mb-1",
                                    style: {
                                        color: TOKENS.color.green
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-base font-bold",
                                    style: {
                                        color: TOKENS.color.green
                                    },
                                    children: "Correct!"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-12 h-12 mx-auto mb-1",
                                    style: {
                                        color: TOKENS.color.red
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-base font-bold",
                                    style: {
                                        color: TOKENS.color.red
                                    },
                                    children: "Not quite"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs mt-1",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: [
                                "Score: ",
                                myResult?.score ?? 0,
                                " pts"
                            ]
                        })
                    ]
                }),
                currentQuestion && correctIndex !== null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-3 rounded-xl",
                    style: {
                        background: 'rgba(0,229,160,0.08)',
                        border: '1px solid rgba(0,229,160,0.2)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[10px] uppercase tracking-wider mb-1",
                            style: {
                                color: TOKENS.color.green
                            },
                            children: "Correct answer"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-semibold text-white",
                            children: currentQuestion.options[correctIndex]
                        }),
                        explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] mt-2",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: explanation
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[10px] uppercase tracking-wider mb-2",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "Leaderboard"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-1.5",
                            children: revealResults.slice(0, 5).map((p, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 p-2 rounded-lg",
                                    style: {
                                        background: p.userId === user.id ? 'rgba(0,229,160,0.06)' : 'rgba(255,255,255,0.02)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-5 text-[10px] font-mono font-bold",
                                            style: {
                                                color: i === 0 ? TOKENS.color.orange : TOKENS.color.muted
                                            },
                                            children: i + 1
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs font-semibold text-white flex-1",
                                            children: p.userName
                                        }),
                                        p.isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "w-3 h-3",
                                            style: {
                                                color: TOKENS.color.green
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs font-bold",
                                            style: {
                                                color: TOKENS.color.green
                                            },
                                            children: [
                                                p.score,
                                                " pts"
                                            ]
                                        })
                                    ]
                                }, p.userId))
                        })
                    ]
                }),
                isHost && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleNext,
                        className: "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold",
                        style: {
                            background: 'rgba(0,229,160,0.15)',
                            color: TOKENS.color.green
                        },
                        children: [
                            questionIndex + 1 >= questionCount ? 'See final results' : 'Next question',
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            })
                        ]
                    })
                })
            ]
        });
    }
    // ── FINISHED ──
    if (phase === 'finished') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center py-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "w-14 h-14 mx-auto mb-2",
                            style: {
                                color: TOKENS.color.orange
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-lg font-bold text-white",
                            children: "Quiz complete!"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs mt-1",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: [
                                questionCount,
                                " questions \xb7 ",
                                finalResults.length,
                                " players"
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[10px] uppercase tracking-wider mb-2",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "Final standings"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2",
                            children: finalResults.map((p, i)=>{
                                const podium = [
                                    '#FFD700',
                                    '#C0C0C0',
                                    '#CD7F32'
                                ][i] || null;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3 p-3 rounded-xl",
                                    style: {
                                        background: i === 0 ? 'rgba(255,215,0,0.06)' : 'rgba(255,255,255,0.02)',
                                        border: i === 0 ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(255,255,255,0.04)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                                            style: {
                                                background: podium ? `${podium}20` : 'rgba(255,255,255,0.05)',
                                                color: podium || TOKENS.color.muted
                                            },
                                            children: i + 1
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-sm font-bold text-white flex-1",
                                            children: [
                                                p.userName,
                                                i === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 inline ml-1.5",
                                                    style: {
                                                        color: TOKENS.color.orange
                                                    }
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: TOKENS.color.green
                                                    },
                                                    children: [
                                                        p.score,
                                                        " pts"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "text-[10px]",
                                                    style: {
                                                        color: TOKENS.color.muted
                                                    },
                                                    children: [
                                                        p.correctCount,
                                                        "/",
                                                        questionCount,
                                                        " correct"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, p.userId);
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex justify-center gap-2",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleLeave,
                        className: "px-4 py-2 rounded-xl text-xs font-bold",
                        style: {
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff'
                        },
                        children: "Back to quiz menu"
                    })
                })
            ]
        });
    }
    return null;
}
/* ─── Quiz Create Card (idle phase) ─── */ function QuizCreateCard({ onCreate, creating }) {
    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);
    const [difficulty, setDifficulty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [source, setSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('group');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-4 rounded-2xl space-y-3",
        style: {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-[10px] font-semibold uppercase tracking-wider",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: "Question source"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-3 gap-1.5 mt-1.5",
                        children: [
                            {
                                v: 'group',
                                l: 'Group bank',
                                desc: 'Curated by this group',
                                icon: '👥'
                            },
                            {
                                v: 'global',
                                l: 'Global bank',
                                desc: 'All MedQ questions',
                                icon: '🌍'
                            },
                            {
                                v: 'both',
                                l: 'Mixed',
                                desc: 'Best of both',
                                icon: '🔀'
                            }
                        ].map((o)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setSource(o.v),
                                className: "py-2 px-2 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-0.5",
                                style: {
                                    background: source === o.v ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                                    color: source === o.v ? TOKENS.color.purple : TOKENS.color.muted,
                                    border: `1px solid ${source === o.v ? 'rgba(167,139,250,0.3)' : 'transparent'}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-base leading-none",
                                        children: o.icon
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        children: o.l
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] opacity-70 font-normal",
                                        children: o.desc
                                    })
                                ]
                            }, o.v))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-[10px] font-semibold uppercase tracking-wider",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: "Number of questions"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex gap-1.5 mt-1.5",
                        children: [
                            5,
                            10,
                            15,
                            20
                        ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setCount(n),
                                className: "flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all",
                                style: {
                                    background: count === n ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                                    color: count === n ? TOKENS.color.purple : TOKENS.color.muted,
                                    border: `1px solid ${count === n ? 'rgba(167,139,250,0.3)' : 'transparent'}`
                                },
                                children: n
                            }, n))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-[10px] font-semibold uppercase tracking-wider",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: "Difficulty (optional)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex gap-1.5 mt-1.5",
                        children: [
                            {
                                v: undefined,
                                l: 'Any'
                            },
                            {
                                v: 'Easy',
                                l: 'Easy'
                            },
                            {
                                v: 'Medium',
                                l: 'Medium'
                            },
                            {
                                v: 'Hard',
                                l: 'Hard'
                            }
                        ].map((o)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setDifficulty(o.v),
                                className: "flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all",
                                style: {
                                    background: difficulty === o.v ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                                    color: difficulty === o.v ? TOKENS.color.purple : TOKENS.color.muted,
                                    border: `1px solid ${difficulty === o.v ? 'rgba(167,139,250,0.3)' : 'transparent'}`
                                },
                                children: o.l
                            }, o.l))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: ()=>onCreate(count, difficulty, source),
                disabled: creating,
                className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40",
                style: {
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(99,102,241,0.15))',
                    color: TOKENS.color.purple,
                    border: '1px solid rgba(167,139,250,0.3)'
                },
                children: [
                    creating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                        className: "w-4 h-4 animate-spin"
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Check_ChevronRight_Clock_Crown_Loader2_Radio_Sparkles_Trophy_Users_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                        className: "w-4 h-4"
                    }),
                    "Create Live Quiz"
                ]
            })
        ]
    });
}


/***/ })

}]);