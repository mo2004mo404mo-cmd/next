"use strict";
exports.id = 5095;
exports.ids = [2053,3009,4399,5095,5390,6251,6776,7006,7662];
exports.modules = {

/***/ 19443:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ maybeGenerateThreadTitle)
/* harmony export */ });
/* unused harmony export extractThreadTitle */
/* harmony import */ var _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31747);
/* harmony import */ var _langchain_openai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(618093);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(376389);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_2__]);
_db__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * LLM-generated thread titles — the flagship consumer of the agent's FAST
 * model routing (MEDQ_AGENT_FAST_MODEL).
 *
 * Before this, thread titles were a truncation of the first user message
 * (appendUserMessage's content.slice(0, 80)) — functional but ugly in the
 * history sidebar. One tiny fast-model call per conversation (capped at 32
 * output tokens, 12s budget, best-effort throughout) replaces the truncation
 * with a real title. The primary reasoning model is never spent on this.
 *
 * Resolution mirrors the agent's provider chain: the MEDQ_AGENT_* / OPENAI_*
 * env provider when configured, else the managed Z.AI config. Since the
 * 2026-10-25 revert of per-task routing (MEDQ_AGENT_FAST_MODEL defaults to
 * "off"), titles run on the SAME primary model as the main agent — set
 * MEDQ_AGENT_FAST_MODEL to a model id to opt back into fast routing.
 */ 




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('AgentThreadTitles');
function titleModelConfig() {
    const fastModel = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
    const fastDisabled = !fastModel || /^(off|none|false|disabled)$/i.test(fastModel);
    const envKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
    if (envKey) {
        return {
            baseUrl: (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
            apiKey: envKey,
            model: fastDisabled ? process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini' : fastModel
        };
    }
    try {
        const zai = (0,_zai__WEBPACK_IMPORTED_MODULE_4__.readConfig)();
        if (zai?.apiKey && zai.baseUrl) {
            const headers = {
                'X-Z-AI-From': 'Z'
            };
            if (zai.token) headers['X-Token'] = zai.token;
            if (zai.chatId) headers['X-Chat-Id'] = zai.chatId;
            if (zai.userId) headers['X-User-Id'] = zai.userId;
            return {
                baseUrl: zai.baseUrl,
                apiKey: zai.apiKey,
                model: fastDisabled ? process.env.ZAI_FALLBACK_MODEL || 'glm-4.5' : fastModel,
                defaultHeaders: headers
            };
        }
    } catch  {
    // fall through — no provider
    }
    return null;
}
/**
 * Extract a thread title from a raw fast-model response. Exported for
 * unit-testing the ladder against recorded model outputs.
 *
 * Ladder (fast models vary in format discipline — observed with
 * glm-4.5-flash: verbose reasoning, then candidate titles in quotes,
 * sometimes truncating before the requested final line):
 *   1. the final "TITLE: …" line (the requested format)
 *   2. an endorsed candidate: I think "X" is/would be…
 *   3. the last quoted candidate in a list
 *   4. a <title>…</title> span (tag-following models)
 *   5. the last non-empty line
 */ function extractThreadTitle(rawInput) {
    const raw = rawInput;
    let title = '';
    const titleLines = [
        ...raw.matchAll(/^[ \t>*-]*TITLE[ \t]*:[ \t]*(.+)$/gim)
    ].map((m)=>m[1].trim());
    if (titleLines.length) title = titleLines[titleLines.length - 1];
    if (!title) {
        const endorsed = raw.match(/[“"]([^“”"]{3,80})[”"]\s*(?:is|would be|sounds|seems)/i);
        if (endorsed) title = endorsed[1];
    }
    if (!title) {
        const candidates = [
            ...raw.matchAll(/[“"]([^“”"]{3,80})[”"]/g)
        ].map((m)=>m[1].trim()).filter((t)=>t.split(' ').length <= 8 && !/^(the )?(conversation|title|user|learner)/i.test(t));
        if (candidates.length) title = candidates[candidates.length - 1];
    }
    if (!title) {
        const tag = raw.match(/<title>([\s\S]*?)<\/title>/i);
        if (tag) {
            title = tag[1];
        } else {
            const openIdx = raw.toLowerCase().lastIndexOf('<title>');
            if (openIdx >= 0) title = raw.slice(openIdx + 7);
        }
    }
    if (!title) {
        const lines = raw.split('\n').map((l)=>l.trim()).filter(Boolean);
        title = lines[lines.length - 1] ?? '';
        title = title.replace(/^(okay|sure|here'?s|title|the title is|certainly|based on)[,:]\s*/i, '');
    }
    return title.replace(/\s+/g, ' ').replace(/^["'\s]+|["'\s.]+$/g, '').slice(0, 80);
}
/** True when an extracted "title" is actually the model narrating the task
 *  ("I need to create…", "The user wants…") — not a usable title. Careful
 *  not to reject real medical titles like "I Cell Disease". */ function looksLikeReasoning(title) {
    return title.length < 3 || title.split(' ').length > 12 || /^(i (need|want|will|'ll|have|should)|let me|the user (wants|asked|is)|okay|sure|first[,.]|now[,.]|so[,.])/i.test(title) || /title for|conversation between/i.test(title);
}
/**
 * Generate and persist a proper title for a thread that still carries its
 * auto-derived placeholder — only on the FIRST exchange, never renaming
 * threads the user or a later turn already titled. Best-effort: every failure
 * (no provider, timeout, bad output) degrades silently to the existing title.
 */ async function maybeGenerateThreadTitle(threadId, userId, seed) {
    try {
        const thread = await _db__WEBPACK_IMPORTED_MODULE_2__.db.agentThread.findFirst({
            where: {
                id: threadId,
                userId
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    select: {
                        role: true,
                        content: true
                    }
                }
            }
        });
        if (!thread) return;
        // Only the first exchange: exactly one user message so far.
        const userMessages = thread.messages.filter((m)=>m.role === 'user');
        if (userMessages.length !== 1) return;
        // Only when the title is still the auto-derived placeholder.
        const derived = userMessages[0].content.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New conversation';
        if (thread.title !== 'New conversation' && thread.title !== derived) return;
        const config = titleModelConfig();
        if (!config) return;
        const model = new _langchain_openai__WEBPACK_IMPORTED_MODULE_1__/* .ChatOpenAI */ .Db({
            apiKey: config.apiKey,
            model: config.model,
            temperature: 0.3,
            // Headroom for reasoning-style fast models that "think out loud" as
            // content before the answer (observed with glm-4.5-flash).
            maxTokens: 384,
            configuration: {
                baseURL: config.baseUrl,
                ...config.defaultHeaders ? {
                    defaultHeaders: config.defaultHeaders
                } : {}
            },
            maxRetries: 2,
            // A hung title request must fail into the best-effort catch (which
            // keeps the placeholder) instead of parking a worker thread.
            timeout: 30000
        });
        const response = await Promise.race([
            model.invoke([
                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc('Write a short title (3-6 words) for this conversation between a medical learner and their study assistant. ' + 'You may think briefly, but you MUST end your reply with exactly one line in this format:\n' + 'TITLE: Your Title\n' + 'Nothing after that line.\n\n' + 'Conversation:\n' + seed.slice(0, 800))
            ]),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('title-generation timeout')), 15000))
        ]);
        const raw = String(response.content ?? '');
        const title = extractThreadTitle(raw);
        // Guard against reasoning leakage: a title that narrates the task
        // ("I need to create…", "The user wants…") is not a title — keep the
        // existing placeholder instead of persisting the model's thinking.
        if (looksLikeReasoning(title)) {
            log.warn?.(`title extraction looked like reasoning ("${title.slice(0, 60)}…") — keeping placeholder`);
            return;
        }
        await _db__WEBPACK_IMPORTED_MODULE_2__.db.agentThread.update({
            where: {
                id: threadId
            },
            data: {
                title
            }
        });
        log.info?.(`Generated thread title: "${title}"`);
    } catch (error) {
        log.warn?.(`thread title generation failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 26385:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ buildChatAgentTools)
/* harmony export */ });
/* harmony import */ var _deep_agent_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(815519);
/* harmony import */ var _telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68060);
/* harmony import */ var _artifacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(942468);
/* harmony import */ var _documents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(132705);
/* harmony import */ var _office__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(905939);
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(527519);
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(404643);
/* harmony import */ var _discovery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(444937);
/* harmony import */ var _scheduling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(150837);
/* harmony import */ var _knowledge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(580455);
/* harmony import */ var _video_search__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(243349);
/* harmony import */ var _spreadsheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(168057);
/* harmony import */ var _flashcards__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(865398);
/* harmony import */ var _study_insights__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(316570);
/* harmony import */ var _manage_skills__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(805271);
/* harmony import */ var _ask_user__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(319796);
/* harmony import */ var _web_fetch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(886776);
/* harmony import */ var _run_code__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(482166);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(65023);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(972379);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(770849);
/* harmony import */ var _async_tasks__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(411804);
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(544811);
/* harmony import */ var _approvals_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(66251);
/* harmony import */ var _ui_action__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(727532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_deep_agent_tools__WEBPACK_IMPORTED_MODULE_0__, _telemetry__WEBPACK_IMPORTED_MODULE_1__, _artifacts__WEBPACK_IMPORTED_MODULE_2__, _documents__WEBPACK_IMPORTED_MODULE_3__, _discovery__WEBPACK_IMPORTED_MODULE_7__, _scheduling__WEBPACK_IMPORTED_MODULE_8__, _knowledge__WEBPACK_IMPORTED_MODULE_9__, _video_search__WEBPACK_IMPORTED_MODULE_10__, _spreadsheet__WEBPACK_IMPORTED_MODULE_11__, _flashcards__WEBPACK_IMPORTED_MODULE_12__, _study_insights__WEBPACK_IMPORTED_MODULE_13__, _manage_skills__WEBPACK_IMPORTED_MODULE_14__, _web_fetch__WEBPACK_IMPORTED_MODULE_16__, _browser__WEBPACK_IMPORTED_MODULE_18__, _tasks__WEBPACK_IMPORTED_MODULE_20__, _async_tasks__WEBPACK_IMPORTED_MODULE_21__, _messaging__WEBPACK_IMPORTED_MODULE_22__, _approvals_service__WEBPACK_IMPORTED_MODULE_23__]);
([_deep_agent_tools__WEBPACK_IMPORTED_MODULE_0__, _telemetry__WEBPACK_IMPORTED_MODULE_1__, _artifacts__WEBPACK_IMPORTED_MODULE_2__, _documents__WEBPACK_IMPORTED_MODULE_3__, _discovery__WEBPACK_IMPORTED_MODULE_7__, _scheduling__WEBPACK_IMPORTED_MODULE_8__, _knowledge__WEBPACK_IMPORTED_MODULE_9__, _video_search__WEBPACK_IMPORTED_MODULE_10__, _spreadsheet__WEBPACK_IMPORTED_MODULE_11__, _flashcards__WEBPACK_IMPORTED_MODULE_12__, _study_insights__WEBPACK_IMPORTED_MODULE_13__, _manage_skills__WEBPACK_IMPORTED_MODULE_14__, _web_fetch__WEBPACK_IMPORTED_MODULE_16__, _browser__WEBPACK_IMPORTED_MODULE_18__, _tasks__WEBPACK_IMPORTED_MODULE_20__, _async_tasks__WEBPACK_IMPORTED_MODULE_21__, _messaging__WEBPACK_IMPORTED_MODULE_22__, _approvals_service__WEBPACK_IMPORTED_MODULE_23__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * THE chat-agent tool registry — single source of truth.
 *
 * History: MedQ grew TWO independent registries. tools/index.ts exported
 * buildMedQTools (imported by nobody — dead code), while the live chat agent
 * assembled its tool array inline in deep-agent-runtime.ts. The image-search
 * bug (2026-10-23) happened exactly because of this split: the tool was
 * registered in the dead registry and the chat agent never saw it. This
 * module is the fix: ONE builder the chat agent (and only the chat agent)
 * consumes. Every tool the floating assistant can call is listed here, and
 * every tool passes through withExecutionTelemetry so AgentToolExecution
 * rows capture status/latency/IO for analytics and debugging.
 *
 * The generation agent (question-deep-agent.ts) keeps its own smaller set —
 * it is a different agent with a different job — but wraps its tools with
 * the same telemetry helper.
 */ 
























/**
 * Build the chat agent's complete tool set. Registration mistakes are
 * structurally impossible now: a tool not present in THIS array cannot be
 * called by the floating assistant, and everything here is telemetry-wrapped.
 */ function buildChatAgentTools(options) {
    const { ctx, userId, multimodalTools } = options;
    const [analyzeWeaknessesTool, examBlueprintTool] = (0,_study_insights__WEBPACK_IMPORTED_MODULE_13__/* .createStudyInsightTools */ .l)(ctx);
    const tools = [
        // ── Question generation (the Generate-tab engine, as a chat tool) ──
        ...options.generationAgentTool ? [
            options.generationAgentTool
        ] : [],
        // ── save_question bridge (single saves of written-out questions) ──
        ...options.saveQuestionTool ? [
            options.saveQuestionTool
        ] : [],
        // ── Multimodal: search references/images, illustration, audio, vision,
        //    lab panels (shared with the question-author subagent) ──
        ...multimodalTools,
        // ── Full-article retrieval for one known reference (the system prompt
        //    already steers "prefer fetch_medical_reference" — this registration
        //    makes that true; found unregistered in the audit round 3) ──
        (0,_web_fetch__WEBPACK_IMPORTED_MODULE_16__/* .createMedicalFetchTool */ .Q)(ctx),
        // ── Lecture recordings / dictations: attachment:// refs → ffmpeg + VAD
        //    segmentation ASR pipeline (handles long recordings) ──
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createAudioTranscriptionTool */ .lg)(),
        // ── Long-term memory ──
        ...(0,_deep_agent_tools__WEBPACK_IMPORTED_MODULE_0__/* .createMemoryTools */ .VQ)(ctx),
        // ── Artifacts + documents ──
        (0,_artifacts__WEBPACK_IMPORTED_MODULE_2__/* .createArtifactTool */ .N)(ctx),
        (0,_documents__WEBPACK_IMPORTED_MODULE_3__/* .createDocumentTool */ .w)(ctx),
        (0,_office__WEBPACK_IMPORTED_MODULE_4__/* .createWordDocumentTool */ .yd)(ctx),
        (0,_office__WEBPACK_IMPORTED_MODULE_4__/* .createSpreadsheetTool */ .L_)(ctx),
        (0,_office__WEBPACK_IMPORTED_MODULE_4__/* .createPresentationTool */ .FN)(ctx),
        (0,_chart__WEBPACK_IMPORTED_MODULE_5__/* .createChartTool */ .D)(ctx),
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createImageEditTool */ .UN)(ctx),
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createSpeechSynthesisTool */ .tc)(ctx),
        // ── Video understanding + search: analyze_video_material (URL or
        //    attachment:// uploads, via ZAI createVision with video_url content
        //    for short clips, frame-sampling for longer recordings) and
        //    search_medical_videos (finds real medical videos online via ZAI
        //    image-search as a proxy). Together these let the agent answer
        //    "find me a video on lumbar puncture and summarize the steps". ──
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createVideoAnalysisTool */ .Wq)(ctx),
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createVideoSearchTool */ .m3)(),
        (0,_media__WEBPACK_IMPORTED_MODULE_6__/* .createVideoGenerationTool */ .AF)(ctx),
        (0,_discovery__WEBPACK_IMPORTED_MODULE_7__/* .createArtifactSearchTool */ .p)(ctx),
        // ── Study intelligence: SM-2 flashcards, weakness analysis, exam
        //    blueprints (flashcards/weakness need a real account; the blueprint
        //    tool is stateless and works for guests too) ──
        ...userId ? (0,_flashcards__WEBPACK_IMPORTED_MODULE_12__/* .createFlashcardTools */ .o)(ctx) : [],
        ...userId ? [
            analyzeWeaknessesTool
        ] : [],
        examBlueprintTool,
        // ── Scheduled agent jobs: cron + one-shot creation, read-only listing ──
        ...userId ? [
            (0,_scheduling__WEBPACK_IMPORTED_MODULE_8__/* .createScheduleTaskTool */ .T)(ctx),
            (0,_scheduling__WEBPACK_IMPORTED_MODULE_8__/* .createListScheduledTasksTool */ .E)(ctx)
        ] : [],
        // ── Knowledge library retrieval ([K#] citations) ──
        ...userId ? [
            (0,_knowledge__WEBPACK_IMPORTED_MODULE_9__/* .createSearchKnowledgeTool */ .Hh)(ctx)
        ] : [],
        // ── Video scene search ([V#] timestamped scenes, Stage 3) + structured
        //    spreadsheet queries over retained .xlsx uploads (Stage 10) ──
        ...userId ? [
            (0,_video_search__WEBPACK_IMPORTED_MODULE_10__/* .createVideoSceneSearchTool */ .M)(ctx),
            (0,_spreadsheet__WEBPACK_IMPORTED_MODULE_11__/* .createQuerySpreadsheetTool */ .HF)(ctx)
        ] : [],
        // ── Skill authoring loop (manage_skills → workspace sync → load_skill):
        //    registered here after the audit found it built but never wired —
        //    the "closed learning loop" was dead code without this line ──
        ...userId ? [
            (0,_manage_skills__WEBPACK_IMPORTED_MODULE_14__/* .createManageSkillsTool */ .C)(ctx)
        ] : [],
        // ── Structured clarification (ask_user → interactive form card): the
        //    model asks its follow-up questions as checkboxes/choices/text
        //    fields instead of prose. Available to guests too — it is pure UI,
        //    no persistence side effects ──
        (0,_ask_user__WEBPACK_IMPORTED_MODULE_15__/* .createAskUserTool */ .f)(ctx),
        // ── App control (ui_action → live UI execution): drives the learner's
        //    screen — navigation, dialogs, form fills, highlights. Pure UI,
        //    fire-and-forget; guests included ──
        (0,_ui_action__WEBPACK_IMPORTED_MODULE_24__/* .createUiActionTool */ .Py)(ctx),
        // ── Sandboxed computation (JS VM; Python/Bash in the workspace jail) ──
        (0,_run_code__WEBPACK_IMPORTED_MODULE_17__/* .createRunCodeTool */ .d)(ctx),
        // ── Browser sandbox (structural page snapshots + interaction), gated ──
        (0,_browser__WEBPACK_IMPORTED_MODULE_18__/* .createBrowserSnapshotTool */ .L)(ctx),
        (0,_browser__WEBPACK_IMPORTED_MODULE_18__/* .createBrowserInteractTool */ .p)(ctx),
        // ── Workspace git (status/diff/log/branch/checkout/commit/pull/push/init) ──
        ...userId ? (0,_git__WEBPACK_IMPORTED_MODULE_19__/* .createGitTools */ .c)(ctx) : [],
        // ── Visible task list (task_create / task_update / task_list) ──
        ...userId ? (0,_tasks__WEBPACK_IMPORTED_MODULE_20__/* .createTaskTools */ .j)(ctx) : [],
        // ── Messaging (Messages-tab capabilities: rooms, unread digests, DMs,
        //    groups, push notifications — sends are HITL-gated) ──
        ...userId ? (0,_messaging__WEBPACK_IMPORTED_MODULE_22__/* .createMessagingTools */ ._)(ctx, {
            fastModel: options.fastModel
        }) : [],
        // ── Async subagents over the durable queue (start/check/update/cancel/list) ──
        ...userId ? (0,_async_tasks__WEBPACK_IMPORTED_MODULE_21__/* .createAsyncTaskTools */ .V)(ctx) : [],
        // ── MCP tools from the user's configured servers (gated by dynamic specs) ──
        ...options.mcpTools ?? []
    ];
    // HITL gate — consequential tools (bank writes, scheduling, media
    // generation, knowledge ingestion) pause for an explicit user decision
    // before executing. Read-only tools pass straight through. The gate is a
    // no-op when MEDQ_AGENT_HITL=off or the user has "allowed" the capability.
    // Applied INSIDE the telemetry wrapper so AgentToolExecution rows measure
    // the real (approval-inclusive) execution time.
    const gated = tools.map((tool)=>(0,_approvals_service__WEBPACK_IMPORTED_MODULE_23__/* .withApprovalGate */ .nh)(tool, {
            userId,
            threadId: ctx.threadId,
            signal: options.abortSignal,
            hitl: options.hitl
        }));
    // Telemetry choke point: EVERY tool execution lands in AgentToolExecution
    // (status, latency, capped input/output). Best-effort — a telemetry failure
    // must never break a tool call.
    return gated.map((tool)=>(0,_telemetry__WEBPACK_IMPORTED_MODULE_1__/* .withExecutionTelemetry */ .s)(tool, ctx));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 59479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ searchWeb)
/* harmony export */ });
/* harmony import */ var _baidu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(277092);
/* harmony import */ var _bocha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83723);
/* harmony import */ var _brave__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(423665);
/* harmony import */ var _minimax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(426460);
/* harmony import */ var _tavily__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(384098);






async function searchWeb(params) {
    const { providerId, query, apiKey = '', maxResults, baseUrl, baiduSubSources } = params;
    switch(providerId){
        case 'baidu':
            return (0,_baidu__WEBPACK_IMPORTED_MODULE_0__/* .searchWithBaidu */ .c)({
                query,
                apiKey,
                maxResults,
                baseUrl,
                subSources: baiduSubSources
            });
        case 'bocha':
            return (0,_bocha__WEBPACK_IMPORTED_MODULE_1__/* .searchWithBocha */ .E)({
                query,
                apiKey,
                maxResults,
                baseUrl
            });
        case 'brave':
            return (0,_brave__WEBPACK_IMPORTED_MODULE_2__/* .searchWithBrave */ .l)({
                query,
                apiKey: apiKey || undefined,
                maxResults,
                baseUrl
            });
        case 'minimax':
            return (0,_minimax__WEBPACK_IMPORTED_MODULE_3__/* .searchWithMiniMax */ .M)({
                query,
                apiKey,
                maxResults,
                baseUrl
            });
        case 'tavily':
            return (0,_tavily__WEBPACK_IMPORTED_MODULE_4__/* .searchWithTavily */ .i)({
                query,
                apiKey,
                maxResults,
                baseUrl
            });
        default:
            {
                const exhaustive = providerId;
                throw new Error(`Unsupported web search provider: ${exhaustive}`);
            }
    }
}


/***/ }),

/***/ 64413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MX: () => (/* binding */ describeCron),
/* harmony export */   QP: () => (/* binding */ cronExpressionSchema),
/* harmony export */   QX: () => (/* binding */ computeNextRun),
/* harmony export */   rR: () => (/* binding */ advanceCron)
/* harmony export */ });
/* unused harmony export parseCron */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18963);
/**
 * 5-field cron parsing + next-run computation for scheduled agent tasks.
 *
 * Supports: "min hour dom month dow" with "*", "x/step" wildcards, ranges
 * "a-b", lists "a,b,c", and day-of-week names (MON-SUN, MONDAY, etc.).
 * Times interpret in an IANA timezone (via Intl offset math — no tz
 * database dependency).
 *
 * Ported shape from hermes "scheduler/cron.ts" (revived for the scheduled
 * agent jobs feature).
 */ 
const cronExpressionSchema = zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().trim().regex(/^(\S+ ){4}\S+$/, 'expected a 5-field cron expression').refine((value)=>value.split(/\s+/).every((field, i)=>parseField(field, FIELD_RANGES[i].min, FIELD_RANGES[i].max, i === 4) !== null), {
    message: 'invalid cron field'
});
// minute, hour, day-of-month, month, day-of-week
const FIELD_RANGES = [
    {
        min: 0,
        max: 59
    },
    {
        min: 0,
        max: 23
    },
    {
        min: 1,
        max: 31
    },
    {
        min: 1,
        max: 12
    },
    {
        min: 0,
        max: 6
    }
];
const DOW_NAMES = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};
/** Parse one cron field into a sorted list of matching integers. */ function parseField(raw, min, max, isDow) {
    const field = raw.toUpperCase();
    const out = new Set();
    for (const part of field.split(',')){
        // day-of-week names: MON, MON-FRI, SAT,SUN
        let token = part;
        if (isDow) token = token.replace(/\b([A-Z]+)\b/g, (m)=>m in DOW_NAMES ? String(DOW_NAMES[m]) : m);
        if (!/^[0-9*/-]+$/.test(token)) return null;
        let step = 1;
        const stepIdx = token.indexOf('/');
        if (stepIdx !== -1) {
            const stepRaw = token.slice(stepIdx + 1);
            if (!/^\d+$/.test(stepRaw)) return null;
            step = Number(stepRaw);
            if (step < 1) return null;
            token = token.slice(0, stepIdx);
        }
        let lo = min;
        let hi = max;
        if (token === '*' || token === '') {
        // full range (with step)
        } else if (token.includes('-')) {
            const [a, b] = token.split('-');
            if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) return null;
            lo = Number(a);
            hi = Number(b);
        } else {
            if (!/^\d+$/.test(token)) return null;
            lo = Number(token);
            hi = stepIdx !== -1 ? max : lo; // "N/step" means N..max
        }
        if (lo < min || hi > max || lo > hi) return null;
        for(let v = lo; v <= hi; v += step)out.add(v);
    }
    return out.size > 0 ? [
        ...out
    ].sort((a, b)=>a - b) : null;
}
/** Parse a 5-field cron expression into its matched integer sets. */ function parseCron(expression) {
    const fields = expression.trim().split(/\s+/);
    if (fields.length !== 5) return null;
    const [minutes, hours, daysOfMonth, months, daysOfWeek] = fields.map((f, i)=>parseField(f, FIELD_RANGES[i].min, FIELD_RANGES[i].max, i === 4));
    if (!minutes || !hours || !daysOfMonth || !months || !daysOfWeek) return null;
    return {
        minutes,
        hours,
        daysOfMonth,
        months,
        daysOfWeek
    };
}
// ── Timezone helpers ───────────────────────────────────────────────────────
/** Millisecond offset of `tz` from UTC at the given instant. */ function tzOffsetMs(date, tz) {
    try {
        const dtf = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const parts = dtf.formatToParts(date);
        const get = (type)=>Number(parts.find((p)=>p.type === type)?.value ?? '0');
        const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
        return asUTC - date.getTime();
    } catch  {
        return 0; // unknown tz → UTC
    }
}
/** Wall-clock components of an instant in `tz`. */ function wallClock(date, tz) {
    const shifted = new Date(date.getTime() + tzOffsetMs(date, tz));
    return {
        y: shifted.getUTCFullYear(),
        m: shifted.getUTCMonth() + 1,
        d: shifted.getUTCDate(),
        hh: shifted.getUTCHours(),
        mm: shifted.getUTCMinutes(),
        dow: shifted.getUTCDay()
    };
}
function matches(c, w) {
    if (!c) return false;
    // cron treats DOM/DOW as OR when both are restricted
    const domRestricted = c.daysOfMonth.length < 31;
    const dowRestricted = c.daysOfWeek.length < 7;
    const domMatch = c.daysOfMonth.includes(w.d);
    const dowMatch = c.daysOfWeek.includes(w.dow);
    const dayOk = domRestricted && dowRestricted ? domMatch || dowMatch : domMatch && dowMatch;
    return c.minutes.includes(w.mm) && c.hours.includes(w.hh) && c.months.includes(w.m) && dayOk;
}
/**
 * Compute the next run strictly after `from` (default: now).
 * `cron === null` + `runAt` → the one-shot time itself.
 * Returns null when no next run can be found within ~1 year.
 */ function computeNextRun(cron, runAt, timezone = 'UTC', from = new Date()) {
    if (!cron) return runAt;
    const c = parseCron(cron);
    if (!c) return null;
    // Start from the next whole minute after `from`, expressed in tz wall-clock.
    const cursor = new Date(Math.floor(from.getTime() / 60000) * 60000 + 60000);
    const limit = cursor.getTime() + 366 * 24 * 3600 * 1000;
    while(cursor.getTime() <= limit){
        const w = wallClock(cursor, timezone);
        if (matches(c, w)) return new Date(cursor.getTime());
        cursor.setUTCMinutes(cursor.getUTCMinutes() + 1);
    }
    return null;
}
/**
 * Advance a recurring schedule after a fire: strictly after the previous
 * nextRunAt (so a missed window fires once, not repeatedly).
 */ function advanceCron(cron, previous, timezone = 'UTC') {
    return computeNextRun(cron, null, timezone, previous);
}
/** Human-readable summary, e.g. "every Monday at 09:00 (Africa/Cairo)". */ function describeCron(cron, timezone = 'UTC') {
    const c = parseCron(cron);
    if (!c) return cron;
    const time = `${String(c.hours[0] ?? 0).padStart(2, '0')}:${String(c.minutes[0] ?? 0).padStart(2, '0')}`;
    const dowAll = c.daysOfWeek.length === 7;
    const names = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    let when;
    if (dowAll && c.daysOfMonth.length === 31 && c.months.length === 12) {
        when = 'every day';
    } else if (!dowAll) {
        when = c.daysOfWeek.length === 1 ? `every ${names[c.daysOfWeek[0]]}` : `on ${c.daysOfWeek.map((d)=>names[d]).join(', ')}`;
    } else {
        when = `on day ${c.daysOfMonth.join(', ')} of the month`;
    }
    return `${when} at ${time} (${timezone})`;
}


/***/ }),

/***/ 65023:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ createBrowserSnapshotTool),
/* harmony export */   p: () => (/* binding */ createBrowserInteractTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _offload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(935854);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_offload__WEBPACK_IMPORTED_MODULE_1__]);
_offload__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('BrowserTool');
/**
 * browser_snapshot — fetch-based page snapshot, ported from hermes
 * (`browser_snapshot`, capability browser.navigate; the fetch backend —
 * Playwright-grade interaction intentionally NOT ported per MedQ's
 * capability-leak policy). Returns title, text content, and the link
 * inventory of a page; large snapshots auto-offload to an artifact.
 *
 * Differs from fetch_medical_reference: that tool extracts readable article
 * TEXT for citation; this tool inventories page STRUCTURE (headings, links,
 * forms) for navigation-style research ("what resources does this site
 * offer?"). Shares the same SSRF guard posture (private-IP block, size/time
 * caps).
 */ const MAX_BYTES = 2 * 1024 * 1024;
const TIMEOUT_MS = 20000;
const MAX_LINKS = 60;
function assertPublicUrl(raw) {
    const url = new URL(raw);
    if (![
        'http:',
        'https:'
    ].includes(url.protocol)) {
        throw new Error('Only http(s) URLs are allowed.');
    }
    const host = url.hostname.toLowerCase();
    const blocked = host === 'localhost' || host === 'metadata.google.internal' || host.endsWith('.internal') || host.endsWith('.local') || /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
    if (blocked) throw new Error('Refusing to fetch a private/internal address.');
    return url;
}
function extractLinks(html) {
    const links = [];
    const anchorRe = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while((match = anchorRe.exec(html)) !== null && links.length < MAX_LINKS){
        const href = match[1];
        const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
        if (href.startsWith('javascript:') || href.startsWith('#')) continue;
        links.push({
            text,
            href
        });
    }
    return links;
}
function createBrowserSnapshotTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'browser_snapshot',
        description: 'Take a structural snapshot of a web page: title, main text, and its link inventory. Use for navigation-style research — exploring what a site offers, finding subsections or downloadable resources — rather than reading a single article (use fetch_medical_reference for article text).',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            url: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().url().describe('The page URL to snapshot'),
            includeLinks: zod__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zMY().optional().describe('Include the link inventory (default true)')
        }),
        func: async ({ url, includeLinks })=>{
            try {
                const parsed = assertPublicUrl(url);
                const controller = new AbortController();
                const timer = setTimeout(()=>controller.abort(), TIMEOUT_MS);
                const response = await fetch(parsed, {
                    signal: controller.signal,
                    redirect: 'follow',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; MedQAgent/1.0; +educational)'
                    }
                }).finally(()=>clearTimeout(timer));
                if (!response.ok) {
                    return JSON.stringify({
                        ok: false,
                        error: `HTTP ${response.status}`
                    });
                }
                const buffer = await response.arrayBuffer();
                if (buffer.byteLength > MAX_BYTES) {
                    return JSON.stringify({
                        ok: false,
                        error: 'Page exceeds the 2MB snapshot cap.'
                    });
                }
                const html = new TextDecoder('utf-8', {
                    fatal: false
                }).decode(buffer);
                const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/\s+/g, ' ').trim();
                const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
                const result = {
                    ok: true,
                    url: parsed.toString(),
                    title,
                    contentChars: bodyText.length,
                    content: bodyText.slice(0, 6000),
                    ...includeLinks !== false ? {
                        links: extractLinks(html)
                    } : {}
                };
                const serialized = JSON.stringify(result);
                // maybeOffload protects the context when the snapshot is huge.
                return await (0,_offload__WEBPACK_IMPORTED_MODULE_1__/* .maybeOffload */ .y)(ctx, 'browser_snapshot', serialized);
            } catch (error) {
                log.warn?.(`browser_snapshot failed for ${url}:`, error);
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}
/**
 * browser_interact — click / type / screenshot against a real browser
 * backend (hermes-parity tool, capability browser.interact — HITL gated).
 *
 * The default deployment ships the fetch-based snapshot backend, which
 * cannot drive interaction: the tool answers with a clear, structured
 * "backend unavailable" message so the model degrades gracefully to
 * browser_snapshot instead of hallucinating success. Setting
 * MEDQ_BROWSER_BACKEND_URL points at a Playwright sidecar exposing
 * POST /browser/interact (the hermes `PlaywrightHttpBackend` contract).
 */ function createBrowserInteractTool(_ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'browser_interact',
        description: 'Click an element, type text, or take a screenshot on a page rendered by a real browser. Requires the interactive browser backend; when unavailable it reports so — fall back to browser_snapshot for structural snapshots.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            action: zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n([
                'click',
                'type',
                'screenshot'
            ]).describe('Interaction to perform'),
            selector: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(300).optional().describe('CSS selector for click/type'),
            text: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(2000).optional().describe('Text to type (action=type)'),
            url: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().url().optional().describe('Navigate to this URL first')
        }),
        func: async ({ action, selector, text, url })=>{
            const backendUrl = process.env.MEDQ_BROWSER_BACKEND_URL;
            if (!backendUrl) {
                return JSON.stringify({
                    ok: false,
                    unavailable: true,
                    error: 'No interactive browser backend is configured on this deployment. Use browser_snapshot for read-only page research instead.'
                });
            }
            try {
                const controller = new AbortController();
                const timer = setTimeout(()=>controller.abort(), 30000);
                timer.unref?.();
                const response = await fetch(`${backendUrl.replace(/\/$/, '')}/browser/interact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action,
                        selector,
                        text,
                        url
                    }),
                    signal: controller.signal
                }).finally(()=>clearTimeout(timer));
                const data = await response.json().catch(()=>null);
                if (!response.ok || !data) {
                    return JSON.stringify({
                        ok: false,
                        error: `Browser backend HTTP ${response.status}`
                    });
                }
                return JSON.stringify(data);
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 66251:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S6: () => (/* binding */ listPendingApprovals),
/* harmony export */   bT: () => (/* binding */ savePermissionSetting),
/* harmony export */   gC: () => (/* binding */ decideApproval),
/* harmony export */   id: () => (/* binding */ subscribeApprovalRequests),
/* harmony export */   nh: () => (/* binding */ withApprovalGate),
/* harmony export */   t$: () => (/* binding */ capabilitySpecFor),
/* harmony export */   zu: () => (/* binding */ clearPermissionSetting)
/* harmony export */ });
/* unused harmony exports APPROVAL_TIMEOUT_MS, hitlEnabled, TOOL_CAPABILITIES, mcpCapabilitySpec, loadPermissionSettings, loadAllowedCapabilities */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(791532);
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(971890);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__, _audit__WEBPACK_IMPORTED_MODULE_1__]);
([_db__WEBPACK_IMPORTED_MODULE_0__, _audit__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Human-in-the-loop approvals — the engine behind the assistant's approval
 * cards.
 *
 * Design (single-process deployment):
 *   1. Tools registered in TOOL_CAPABILITIES are wrapped by withApprovalGate.
 *   2. Before the wrapped tool executes, the gate:
 *        - skips entirely when MEDQ_AGENT_HITL=off (kill switch) or the run
 *          has no user identity;
 *        - skips when the user saved an "always allow" AgentPermissionSetting
 *          for the capability ("Don't ask again" on the approval card);
 *        - otherwise creates a pending AgentApproval row, publishes the
 *          request on the in-process bus (the deep-agent runtime subscribes
 *          and forwards it to the SSE client as an `approval_required` event)
 *          and BLOCKS the tool execution until a decision arrives, the
 *          5-minute timeout expires (auto-reject), or the request aborts.
 *   3. POST /api/agent/approvals/[id] resolves the pending promise; the tool
 *      then runs (approve) or returns an honest rejection payload (reject).
 *      The decision + optional "remember" setting are persisted and audited.
 *
 * Why a synchronous wait instead of a graph interrupt/checkpoint resume: the
 * deepagents runtime here streams a fresh graph per turn; parking the tool
 * call inside the tool itself keeps HITL working with zero changes to the
 * graph topology, survives SSE reconnects (the wait lives server-side), and
 * still honors the client disconnect (abort signal rejects the wait so the
 * graph does not linger). A page refresh mid-wait is fully recoverable: the
 * AgentApproval row is in the DB, the client re-fetches pending approvals on
 * panel open, and deciding resumes the parked run — the finished answer is
 * then picked up by the thread's pending-reply monitor.
 */ 


/** How long a pending approval waits before auto-rejecting. */ const APPROVAL_TIMEOUT_MS = 5 * 60000;
/** Env kill switch — set MEDQ_AGENT_HITL=off to disable all gating. */ function hitlEnabled() {
    const flag = (process.env.MEDQ_AGENT_HITL ?? 'on').trim().toLowerCase();
    return flag !== 'off' && flag !== 'false' && flag !== '0';
}
function brief(value, max = 90) {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    if (!text) return '';
    return text.length > max ? `${text.slice(0, max)}…` : text;
}
/**
 * The gated tool catalog. Consequential / costly / persistent-side-effect
 * tools ask first; read-only tools (search, memory read, knowledge retrieve)
 * never gate. Defaults chosen so the assistant stays fluid for chat but
 * pauses before writing to the bank, scheduling automation, or spending
 * media-generation quota.
 */ const TOOL_CAPABILITIES = {
    run_question_generation_agent: {
        capability: 'questions.generate',
        label: 'Generate & save questions',
        rationale: 'Runs the full generation pipeline and saves new questions to your question bank.',
        summarizeArgs: (a)=>[
                {
                    label: 'Topic',
                    value: brief(a.topic ?? a.subject)
                },
                {
                    label: 'Count',
                    value: brief(a.count ?? '')
                }
            ]
    },
    save_question: {
        capability: 'bank.write',
        label: 'Save a question to the bank',
        rationale: 'Writes a new question into your question bank.',
        summarizeArgs: (a)=>[
                {
                    label: 'Question',
                    value: brief(a.text)
                }
            ]
    },
    schedule_task: {
        capability: 'schedule.create',
        label: 'Schedule an agent job',
        rationale: 'Creates an automation that runs agent prompts on your account — even when this tab is closed.',
        summarizeArgs: (a)=>[
                {
                    label: 'Name',
                    value: brief(a.name)
                },
                {
                    label: 'Prompt',
                    value: brief(a.prompt)
                },
                {
                    label: 'Schedule',
                    value: brief(a.cron ?? a.runAt ?? '')
                }
            ]
    },
    add_knowledge: {
        capability: 'knowledge.write',
        label: 'Add to knowledge library',
        rationale: 'Ingests new content into your RAG knowledge library.',
        summarizeArgs: (a)=>[
                {
                    label: 'Source',
                    value: brief(a.title ?? a.url ?? a.content)
                }
            ]
    },
    generate_medical_illustration: {
        capability: 'media.image',
        label: 'Generate an image',
        rationale: 'Generates a new medical illustration (uses image-generation quota).',
        summarizeArgs: (a)=>[
                {
                    label: 'Prompt',
                    value: brief(a.prompt)
                }
            ]
    },
    edit_medical_illustration: {
        capability: 'media.image_edit',
        label: 'Edit an image',
        rationale: 'Edits an existing image with the image-editing model (uses quota).',
        summarizeArgs: (a)=>[
                {
                    label: 'Prompt',
                    value: brief(a.prompt ?? a.instruction)
                }
            ]
    },
    synthesize_speech: {
        capability: 'media.audio',
        label: 'Synthesize speech',
        rationale: 'Generates spoken audio (uses TTS quota).',
        summarizeArgs: (a)=>[
                {
                    label: 'Text',
                    value: brief(a.text)
                }
            ]
    },
    generate_medical_video: {
        capability: 'media.video',
        label: 'Generate a video',
        rationale: 'Generates a video clip (the most costly media action).',
        summarizeArgs: (a)=>[
                {
                    label: 'Prompt',
                    value: brief(a.prompt)
                }
            ]
    },
    // ── Newly registered tools (audit sprint — previously dead code) ──
    manage_skills: {
        capability: 'skill.write',
        label: 'Manage skills',
        rationale: 'Creates, improves or deletes reusable skills in your personal skill library (improvements keep restorable history).',
        summarizeArgs: (a)=>[
                {
                    label: 'Action',
                    value: brief(a.action)
                },
                {
                    label: 'Name',
                    value: brief(a.name)
                },
                ...a.findings ? [
                    {
                        label: 'Findings',
                        value: brief(a.findings)
                    }
                ] : []
            ],
        // create/improve pass straight through (2026-10-25): the learner asked
        // for the skill in this very turn, the write lands in their OWN library,
        // and every improve keeps a restorable revision — an approval card adds
        // zero safety while its 5-minute timeout was killing real workflows
        // (observed live: four consecutive skill creations auto-rejected while
        // the learner watched "working…"). Only DELETE still gates: it removes
        // the pack (and its workspace files) outright.
        skipGate: (a)=>a.action === 'create' || a.action === 'improve'
    },
    run_code: {
        capability: 'code.run',
        label: 'Run code',
        rationale: 'Executes sandboxed code (JavaScript VM, or Python/Bash inside your workspace).',
        summarizeArgs: (a)=>[
                {
                    label: 'Language',
                    value: brief(a.language ?? 'javascript')
                },
                {
                    label: 'Purpose',
                    value: brief(a.purpose)
                }
            ]
    },
    // The QuickJS interpreter's eval tool (docs' interpreters pattern) — same
    // capability as run_code: both execute model-authored JavaScript.
    eval: {
        capability: 'code.run',
        label: 'Run JavaScript in the interpreter',
        rationale: 'Executes model-written JavaScript in an isolated QuickJS interpreter to compute or transform data.',
        summarizeArgs: (a)=>[
                {
                    label: 'Code',
                    value: brief(String(a.code ?? '').split('\n').slice(0, 3).join(' ').slice(0, 140))
                }
            ]
    },
    browser_snapshot: {
        capability: 'web.browser',
        label: 'Open a page in the browser sandbox',
        rationale: 'Loads a web page in the sandboxed browser to read its content.',
        summarizeArgs: (a)=>[
                {
                    label: 'URL',
                    value: brief(a.url)
                }
            ]
    },
    browser_interact: {
        capability: 'web.browser',
        label: 'Interact with a page in the browser sandbox',
        rationale: 'Clicks, types or scrolls inside the sandboxed browser page.',
        summarizeArgs: (a)=>[
                {
                    label: 'Action',
                    value: brief(a.action)
                }
            ]
    },
    git_commit: {
        capability: 'workspace.git',
        label: 'Commit to the workspace repository',
        rationale: 'Records changes in your workspace git repository.',
        summarizeArgs: (a)=>[
                {
                    label: 'Message',
                    value: brief(a.message)
                }
            ]
    },
    git_push: {
        capability: 'workspace.git',
        label: 'Push the workspace repository',
        rationale: 'Pushes your workspace git repository to its configured remote.',
        summarizeArgs: ()=>[]
    },
    git_pull: {
        capability: 'workspace.git',
        label: 'Pull into the workspace repository',
        rationale: 'Pulls remote changes into your workspace git repository.',
        summarizeArgs: ()=>[]
    },
    task_create: {
        capability: 'tasks.write',
        label: 'Create a task',
        rationale: 'Adds a task to your visible task list.',
        summarizeArgs: (a)=>[
                {
                    label: 'Title',
                    value: brief(a.title)
                }
            ]
    },
    task_update: {
        capability: 'tasks.write',
        label: 'Update a task',
        rationale: 'Changes the status or priority of a task on your list.',
        summarizeArgs: (a)=>[
                {
                    label: 'Task',
                    value: brief(a.taskId)
                }
            ]
    },
    start_background_task: {
        capability: 'async.create',
        label: 'Launch a background task',
        rationale: 'Starts a detached background agent run on your account (uses agent quota; you are notified when it finishes).',
        summarizeArgs: (a)=>[
                {
                    label: 'Task',
                    value: brief(a.description)
                }
            ]
    },
    // ── Messaging (Messages-tab bridge) — sending anything to other humans
    //    always asks first ──
    send_chat_message: {
        capability: 'chat.send',
        label: 'Send a chat message',
        rationale: 'Sends a message to one of your chat rooms on your behalf — other members will see it as coming from you.',
        summarizeArgs: (a)=>[
                {
                    label: 'Room',
                    value: brief(a.roomId)
                },
                {
                    label: 'Message',
                    value: brief(a.content, 160)
                }
            ]
    },
    start_direct_message: {
        capability: 'chat.send',
        label: 'Start a direct message',
        rationale: 'Opens (or reuses) a direct-message room with another user and can send the first message as you.',
        summarizeArgs: (a)=>[
                {
                    label: 'To',
                    value: brief(a.targetUserName)
                },
                {
                    label: 'Message',
                    value: brief(a.content, 160)
                }
            ]
    },
    create_chat_group: {
        capability: 'chat.group_create',
        label: 'Create a group chat',
        rationale: 'Creates a new group chat in your Messages tab with you as admin and adds the named members.',
        summarizeArgs: (a)=>[
                {
                    label: 'Group',
                    value: brief(a.name)
                },
                {
                    label: 'Members',
                    value: brief(Array.isArray(a.memberNames) ? a.memberNames.join(', ') : a.memberNames)
                }
            ]
    },
    send_push_notification: {
        capability: 'notify.push',
        label: 'Send a push notification',
        rationale: 'Pushes a notification to your subscribed devices (visible even when MedQ is closed) and adds it to your bell.',
        summarizeArgs: (a)=>[
                {
                    label: 'Title',
                    value: brief(a.title)
                },
                {
                    label: 'Body',
                    value: brief(a.body)
                }
            ]
    }
};
/**
 * Dynamic capability spec for MCP tools. Wired tools are named
 * `mcp__<server>__<tool>` (slugified) by the MCP loader — the spec is derived
 * from the name so every MCP tool is gated by default (external systems).
 */ function mcpCapabilitySpec(toolName) {
    if (!toolName.startsWith('mcp__')) return null;
    const parts = toolName.split('__');
    const server = parts[1] || 'server';
    const tool = parts.slice(2).join('__') || 'tool';
    return {
        capability: `mcp.${server}.${tool}`,
        label: `Run MCP tool “${tool}” (${server})`,
        rationale: `Calls the external “${tool}” tool exposed by your configured MCP server “${server}”.`,
        summarizeArgs: (a)=>[
                {
                    label: 'Args',
                    value: brief(a)
                }
            ]
    };
}
/**
 * Resolve the capability spec for a tool name: the static catalog first, then
 * the dynamic MCP derivation. Exported for the permissions UI route.
 */ function capabilitySpecFor(toolName) {
    return TOOL_CAPABILITIES[toolName] ?? mcpCapabilitySpec(toolName) ?? null;
}
const globalForApprovals = globalThis;
/** Survives HMR / route-module re-instantiation in dev; single map in prod. */ const pendingApprovals = globalForApprovals.__medqPendingApprovals ?? new Map();
globalForApprovals.__medqPendingApprovals = pendingApprovals;
const approvalListeners = globalForApprovals.__medqApprovalListeners ?? new Set();
globalForApprovals.__medqApprovalListeners = approvalListeners;
/** Subscribe to new approval requests (the runtime forwards them to SSE). */ function subscribeApprovalRequests(listener) {
    approvalListeners.add(listener);
    return ()=>approvalListeners.delete(listener);
}
/** True when a pending (unsettled, unexpired) approval exists for this id. */ function isLive(entry) {
    return !!entry && !entry.settled && Date.now() - entry.createdAt < APPROVAL_TIMEOUT_MS;
}
/** Pending approvals for a user (optionally scoped to a thread) — refresh restore. */ async function listPendingApprovals(userId, threadId) {
    // In-process live entries first (the SSE wire may be gone, the wait is not).
    const live = [];
    for (const entry of pendingApprovals.values()){
        if (!isLive(entry) || entry.userId !== userId) continue;
        if (threadId && entry.threadId !== threadId) continue;
        live.push({
            approvalId: entry.approvalId,
            threadId: entry.threadId,
            tool: entry.tool,
            capability: entry.capability,
            args: {},
            description: TOOL_CAPABILITIES[entry.tool]?.label ?? entry.capability
        });
    }
    if (live.length > 0) return live;
    // Fallback: DB rows still pending but not in this process (server restarted
    // mid-wait). These can no longer be resumed — the run died with the process —
    // so they are surfaced for honest UI; deciding marks them superseded.
    try {
        const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.findMany({
            where: {
                userId,
                status: 'pending',
                // Rows older than the gate timeout can never be resumed — the
                // in-process wait died with its run (or a restart) long ago. Showing
                // them as decidable cards would only confuse the learner.
                createdAt: {
                    gte: new Date(Date.now() - APPROVAL_TIMEOUT_MS - 60000)
                },
                ...threadId ? {
                    threadId
                } : {}
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        });
        return rows.map((row)=>({
                approvalId: row.id,
                threadId: row.threadId,
                tool: row.toolName,
                capability: row.capability,
                args: safeParse(row.argsJson),
                description: row.description ?? undefined
            }));
    } catch  {
        return live;
    }
}
function safeParse(raw) {
    try {
        return JSON.parse(raw);
    } catch  {
        return {};
    }
}
/** Resolve a pending approval. Returns the outcome for the API to report. */ async function decideApproval(params) {
    const { approvalId, userId, approved } = params;
    const modifiedArgs = params.modifiedArgs && typeof params.modifiedArgs === 'object' && !Array.isArray(params.modifiedArgs) ? params.modifiedArgs : null;
    const entry = pendingApprovals.get(approvalId);
    if (entry && isLive(entry)) {
        if (entry.userId !== userId) {
            return {
                ok: false,
                error: 'Not your approval request',
                status: 403
            };
        }
        // entry.resolve owns the settled flag (its guard makes resolution
        // idempotent) — setting it here first would swallow the decision.
        pendingApprovals.delete(approvalId);
        entry.resolve({
            outcome: approved ? 'approved' : 'rejected',
            ...approved && modifiedArgs ? {
                modifiedArgs
            } : {}
        });
        await persistDecision(approvalId, approved);
        if (params.remember === 'allow' && approved) {
            await savePermissionSetting(userId, entry.capability, 'allow');
        }
        await (0,_audit__WEBPACK_IMPORTED_MODULE_1__/* .audit */ .s)({
            userId,
            action: 'approval.decide',
            target: entry.tool,
            detail: {
                approvalId,
                approved,
                remember: params.remember ?? null
            }
        });
        return {
            ok: true,
            status: 'decided'
        };
    }
    // Not live in this process: check the DB (server restarted, or timed out).
    try {
        const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.findUnique({
            where: {
                id: approvalId
            }
        });
        if (!row || row.userId !== userId) {
            return {
                ok: false,
                error: 'Approval request not found',
                status: 404
            };
        }
        if (row.status === 'pending') {
            // Row pending but no live wait — the parked run is gone. Record the
            // decision for the audit trail and tell the user honestly.
            await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.update({
                where: {
                    id: approvalId
                },
                data: {
                    status: 'superseded',
                    decidedAt: new Date()
                }
            });
            await (0,_audit__WEBPACK_IMPORTED_MODULE_1__/* .audit */ .s)({
                userId,
                action: 'approval.decide',
                target: row.toolName,
                detail: {
                    approvalId,
                    approved,
                    superseded: true
                }
            });
            return {
                ok: true,
                status: 'decided'
            };
        }
        return {
            ok: false,
            error: `Already ${row.status}`,
            status: 409
        };
    } catch  {
        return {
            ok: false,
            error: 'Could not record the decision',
            status: 500
        };
    }
}
async function persistDecision(approvalId, approved) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.update({
            where: {
                id: approvalId
            },
            data: {
                status: approved ? 'approved' : 'rejected',
                decidedAt: new Date()
            }
        });
    } catch  {}
}
/** Persist (or clear) a per-capability permission setting. */ async function savePermissionSetting(userId, capability, effect) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentPermissionSetting.upsert({
            where: {
                userId_capability: {
                    userId,
                    capability
                }
            },
            create: {
                userId,
                capability,
                effect
            },
            update: {
                effect
            }
        });
    } catch  {}
}
/** Remove a per-capability setting (back to the default policy). */ async function clearPermissionSetting(userId, capability) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentPermissionSetting.deleteMany({
            where: {
                userId,
                capability
            }
        });
    } catch  {}
}
/** All settings for a user, capability → effect. Read by the gate each call. */ async function loadPermissionSettings(userId) {
    const map = new Map();
    try {
        const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentPermissionSetting.findMany({
            where: {
                userId
            },
            select: {
                capability: true,
                effect: true
            }
        });
        for (const row of rows){
            if (row.effect === 'allow' || row.effect === 'ask') map.set(row.capability, row.effect);
        }
    } catch  {}
    return map;
}
/** All "allow" settings for a user — read by the gate before asking. */ async function loadAllowedCapabilities(userId) {
    const settings = await loadPermissionSettings(userId);
    return new Set([
        ...settings.entries()
    ].filter(([, effect])=>effect === 'allow').map(([cap])=>cap));
}
/**
 * Wrap a DynamicStructuredTool with the HITL gate. The wrapper is a no-op
 * passthrough when HITL is disabled, the user is unknown, or the user has
 * allowed the capability. The wait races the decision against the timeout
 * and the abort signal so a disconnected client never parks the graph
 * forever.
 */ function withApprovalGate(tool, gateCtx) {
    const spec = capabilitySpecFor(tool.name);
    // interruptOn-style conditional HITL: a per-user "ask" setting on
    // `tool.<name>` gates ANY tool, even ones outside the default catalog
    // (the docs' interruptOn tool map — MedQ-native, DB-configurable).
    const askCapability = `tool.${tool.name}`;
    if (!spec && process.env.MEDQ_AGENT_HITL === 'off') return tool; // nothing can gate it
    const original = tool.func;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- preserves the caller's tool generics
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_2__/* .DynamicStructuredTool */ .XW({
        name: tool.name,
        description: tool.description,
        schema: tool.schema,
        func: async (input)=>{
            if (!hitlEnabled() || !gateCtx.userId || gateCtx.hitl === 'off') {
                return original(input);
            }
            // One read per tool call keeps the gate correct even when the user
            // changes settings mid-run. Covers both "allow" (never ask again) and
            // "ask" (always confirm — the conditional HITL override).
            const settings = await loadPermissionSettings(gateCtx.userId);
            const forcedAsk = settings.get(askCapability) === 'ask';
            if (!spec && !forcedAsk) {
                return original(input); // ungated by default and no override
            }
            if (!forcedAsk && spec && settings.get(spec.capability) === 'allow') {
                return original(input);
            }
            // Arg-based pass-through: this specific invocation is routine and
            // reversible (e.g. manage_skills create/improve). Never bypasses a
            // user-forced "ask" — that override is checked above and wins.
            const gateArgs = input ?? {};
            if (!forcedAsk && spec?.skipGate?.(gateArgs)) {
                return original(input);
            }
            // Effective spec for the approval card: the static/dynamic one, or a
            // generic spec when the ONLY reason we're gating is the "ask" override.
            const effectiveSpec = spec ?? {
                capability: askCapability,
                label: `Run ${tool.name}`,
                rationale: 'You asked to confirm every run of this tool.',
                summarizeArgs: (a)=>[
                        {
                            label: 'Args',
                            value: brief(a)
                        }
                    ]
            };
            const args = input ?? {};
            const details = effectiveSpec.summarizeArgs?.(args) ?? [];
            const description = [
                effectiveSpec.rationale,
                details.length > 0 ? ` ${details.map((d)=>`${d.label}: ${d.value}`).join(' · ')}` : ''
            ].join('');
            const approvalId = crypto.randomUUID();
            const payload = {
                approvalId,
                threadId: gateCtx.threadId ?? '',
                tool: tool.name,
                capability: effectiveSpec.capability,
                args,
                description: effectiveSpec.label
            };
            // Persist the request row (survives refresh — the client re-fetches
            // pending approvals on panel open) and publish on the bus (the runtime
            // forwards to the live SSE stream).
            try {
                await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.create({
                    data: {
                        id: approvalId,
                        userId: gateCtx.userId,
                        threadId: gateCtx.threadId ?? '',
                        toolName: tool.name,
                        capability: effectiveSpec.capability,
                        argsJson: JSON.stringify(args).slice(0, 8000),
                        description: description.slice(0, 500),
                        status: 'pending'
                    }
                });
            } catch  {}
            void (0,_audit__WEBPACK_IMPORTED_MODULE_1__/* .audit */ .s)({
                userId: gateCtx.userId,
                action: 'approval.request',
                target: tool.name,
                detail: {
                    approvalId,
                    capability: effectiveSpec.capability
                }
            });
            const decision = await new Promise((resolve)=>{
                const entry = {
                    approvalId,
                    userId: gateCtx.userId,
                    threadId: gateCtx.threadId ?? '',
                    tool: tool.name,
                    capability: effectiveSpec.capability,
                    resolve: (d)=>{
                        if (entry.settled) return;
                        entry.settled = true;
                        clearTimeout(timer);
                        if (gateCtx.signal) gateCtx.signal.removeEventListener('abort', onAbortFn);
                        pendingApprovals.delete(approvalId);
                        resolve(d);
                    },
                    settled: false,
                    createdAt: Date.now()
                };
                pendingApprovals.set(approvalId, entry);
                for (const listener of approvalListeners){
                    try {
                        console.info(`[MedQ Agent] [APPROVAL-BUS] gate publishing ${tool.name} (${approvalId.slice(0, 8)}) to ${approvalListeners.size} listener(s)`);
                        listener(payload);
                    } catch  {}
                }
                const timer = setTimeout(()=>{
                    // Keep the DB row honest — a timed-out wait must not linger as
                    // 'pending' (the refresh-restore list would surface it as
                    // decidable long after the run already moved on).
                    void _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.update({
                        where: {
                            id: approvalId
                        },
                        data: {
                            status: 'rejected',
                            decidedAt: new Date()
                        }
                    }).catch(()=>{});
                    entry.resolve({
                        outcome: 'rejected',
                        reason: 'Timed out waiting for approval (5 minutes).'
                    });
                }, APPROVAL_TIMEOUT_MS);
                const onAbortFn = ()=>{
                    // Client disconnected (refresh/close): the wait releases so the
                    // graph finishes and persists its answer, but the DB row must not
                    // linger as 'pending' (the refresh-restore list would surface a
                    // dead approval as decidable).
                    void _db__WEBPACK_IMPORTED_MODULE_0__.db.agentApproval.update({
                        where: {
                            id: approvalId
                        },
                        data: {
                            status: 'rejected',
                            decidedAt: new Date()
                        }
                    }).catch(()=>{});
                    entry.resolve({
                        outcome: 'rejected',
                        reason: 'The request was cancelled.'
                    });
                };
                if (gateCtx.signal) {
                    if (gateCtx.signal.aborted) onAbortFn();
                    else gateCtx.signal.addEventListener('abort', onAbortFn, {
                        once: true
                    });
                }
            });
            if (decision.outcome === 'approved') {
                // Arg editing: when the user modified the arguments on the approval
                // card, run the tool with THOSE instead of the model's originals.
                // The replacement is audited and lightly validated (plain object);
                // tools' own internal guards still apply on execution.
                const modified = decision.modifiedArgs;
                if (modified && typeof modified === 'object') {
                    void (0,_audit__WEBPACK_IMPORTED_MODULE_1__/* .audit */ .s)({
                        userId: gateCtx.userId,
                        action: 'approval.args_edited',
                        target: tool.name,
                        detail: {
                            approvalId,
                            keys: Object.keys(modified)
                        }
                    });
                    return original(modified);
                }
                return original(input);
            }
            // Honest rejection payload — the model reads it and adapts (skips the
            // action, tells the user why) instead of hallucinating success.
            return JSON.stringify({
                approved: false,
                reason: decision.reason ?? 'The user declined this action.',
                note: 'Do not retry this tool call in this turn. Acknowledge the decision to the user and continue without performing the action.'
            });
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 68060:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ withExecutionTelemetry)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _offload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(935854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__, _offload__WEBPACK_IMPORTED_MODULE_1__]);
([_db__WEBPACK_IMPORTED_MODULE_0__, _offload__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/**
 * Tool-execution telemetry — deep-agent-platform parity
 * (compare-and-integrate-4). Wraps every builtin tool's execute function so
 * each invocation persists a best-effort AgentToolExecution row (status,
 * latency, capped input/output). Never throws and never alters the tool's
 * result — telemetry is strictly observational (the reference platform's
 * ToolExecution rows power its usage dashboard; ours power the Usage tab's
 * tool-stats rollup).
 */ const INPUT_CAP = 4000;
const OUTPUT_CAP = 4000;
function withExecutionTelemetry(tool, ctx) {
    const original = tool.func.bind(tool);
    const name = tool.name;
    const userId = ctx.userId;
    const threadId = ctx.threadId;
    const wrapped = async (input, runManager, config, ...rest)=>{
        const startedAt = Date.now();
        let inputSnapshot = null;
        try {
            inputSnapshot = JSON.stringify(input)?.slice(0, INPUT_CAP) ?? null;
        } catch  {
            inputSnapshot = null;
        }
        let rowId = null;
        try {
            const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentToolExecution.create({
                data: {
                    userId,
                    ...threadId ? {
                        threadId
                    } : {},
                    toolName: name,
                    status: 'running',
                    inputJson: inputSnapshot
                }
            });
            rowId = row.id;
        } catch  {
        // Telemetry must never break the tool.
        }
        try {
            const output = await original(input, runManager, config, ...rest);
            // Context protection at the choke point: huge textual results (>8K
            // chars) are offloaded to a downloadable artifact and the value handed
            // to the model becomes a preview + pointer (docs' offloading pattern).
            // Best-effort — maybeOffload returns the original on any failure.
            const modelValue = typeof output === 'string' ? await (0,_offload__WEBPACK_IMPORTED_MODULE_1__/* .maybeOffload */ .y)(ctx, name, output) : output;
            if (rowId) {
                void _db__WEBPACK_IMPORTED_MODULE_0__.db.agentToolExecution.update({
                    where: {
                        id: rowId
                    },
                    data: {
                        status: 'completed',
                        latencyMs: Date.now() - startedAt,
                        outputJson: typeof output === 'string' ? output.slice(0, OUTPUT_CAP) : null
                    }
                }).catch(()=>{});
            }
            return modelValue;
        } catch (error) {
            if (rowId) {
                void _db__WEBPACK_IMPORTED_MODULE_0__.db.agentToolExecution.update({
                    where: {
                        id: rowId
                    },
                    data: {
                        status: 'failed',
                        latencyMs: Date.now() - startedAt,
                        error: (error instanceof Error ? error.message : String(error)).slice(0, 2000)
                    }
                }).catch(()=>{});
            }
            throw error;
        }
    };
    // Preserve tool identity; only swap the execution path.
    const clone = Object.create(tool);
    clone.func = wrapped;
    return clone;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 77707:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ createLabPanelTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18963);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/**
 * render_lab_panel — deterministic SVG lab-report generator for medical
 * questions. Given structured rows (test, result, units, reference range,
 * abnormal flag), it renders a crisp clinical lab panel as an SVG file in
 * /public/generated and returns its URL.
 *
 * Why SVG instead of generate_medical_illustration: lab panels are textual
 * data — an LLM image model produces fuzzy, misaligned, sometimes wrong
 * numbers. A deterministic renderer guarantees exact values, perfect
 * alignment, and readable typography at any zoom.
 *
 * Abnormal flags (H/L) render red/blue with a subtle row tint, matching the
 * look of real lab printouts students see on exams.
 */ 




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('LabPanelTool');
const GENERATED_DIR = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'generated');
// Panel geometry (px) — mirrored into the tool result for UI sizing.
const ROW_H = 30;
const HEADER_H = 96;
const COLS_H = 34;
const COL_TEST = 300;
const COL_RESULT = 150;
const COL_FLAG = 70;
const COL_REF = 210;
const TABLE_W = COL_TEST + COL_RESULT + COL_FLAG + COL_REF;
function esc(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/** Estimate rendered width of a string (approximate: CJK≈11px, else 6.4px at 13px font). Kept for future caption layout. */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
function textWidth(s) {
    let w = 0;
    for (const ch of s)w += /[\u4e00-\u9fff\u3040-\u30ff]/.test(ch) ? 11 : 6.4;
    return w;
}
function buildLabPanelSvg(params) {
    const { title, subtitle, rows, footnote } = params;
    // Column geometry
    const PAD = 28;
    const FOOT_H = footnote ? 44 : 22;
    const W = TABLE_W + PAD * 2;
    const H = HEADER_H + COLS_H + rows.length * ROW_H + FOOT_H;
    const rowSvg = rows.map((r, i)=>{
        const y = HEADER_H + COLS_H + i * ROW_H;
        const abnormal = r.flag === 'H' || r.flag === 'L';
        const flagColor = r.flag === 'H' ? '#c62828' : r.flag === 'L' ? '#1565c0' : '#9e9e9e';
        const rowBg = abnormal ? r.flag === 'H' ? 'rgba(198,40,40,0.06)' : 'rgba(21,101,192,0.06)' : i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent';
        const resultX = PAD + COL_TEST;
        const flagX = PAD + COL_TEST + COL_RESULT;
        const refX = PAD + COL_TEST + COL_RESULT + COL_FLAG;
        const resultFont = abnormal ? '700' : '400';
        const resultColor = abnormal ? flagColor : '#1a1a1a';
        return [
            `  <rect x="${PAD - 10}" y="${y}" width="${TABLE_W + 20}" height="${ROW_H}" fill="${rowBg}"/>`,
            `  <line x1="${PAD - 10}" y1="${y + ROW_H}" x2="${PAD - 10 + TABLE_W + 20}" y2="${y + ROW_H}" stroke="#eceff1" stroke-width="1"/>`,
            `  <text x="${PAD}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#37474f">${esc(r.test)}</text>`,
            `  <text x="${resultX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="${resultFont}" fill="${resultColor}">${esc(r.result)}${r.units ? ` ${esc(r.units)}` : ''}</text>`,
            `  <text x="${flagX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="${flagColor}">${esc(r.flag ?? '')}</text>`,
            `  <text x="${refX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#78909c">${esc(r.reference ?? '')}</text>`
        ].join('\n');
    }).join('\n');
    const subtitleLine = subtitle ? `  <text x="${W - PAD}" y="42" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#90a4ae">${esc(subtitle)}</text>` : '';
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="${W}" height="4" fill="#0d47a1"/>
  <text x="${PAD}" y="36" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="#0d47a1">${esc(title)}</text>
  ${subtitleLine}
  <rect x="${PAD - 10}" y="${HEADER_H}" width="${TABLE_W + 20}" height="${COLS_H}" fill="#eceff1"/>
  <text x="${PAD}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">TEST</text>
  <text x="${PAD + COL_TEST}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">RESULT</text>
  <text x="${PAD + COL_TEST + COL_RESULT}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">FLAG</text>
  <text x="${PAD + COL_TEST + COL_RESULT + COL_FLAG}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">REFERENCE RANGE</text>
${rowSvg}
${footnote ? `  <text x="${PAD}" y="${H - 16}" font-family="Helvetica, Arial, sans-serif" font-size="10" fill="#b0bec5">${esc(footnote)}</text>` : ''}
</svg>`;
}
function createLabPanelTool() {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'render_lab_panel',
        description: 'Render a clinical laboratory panel (CBC, BMP, ABG, LFTs, thyroid studies, lipid panel, urinalysis...) as a crisp lab-report image from structured values. Use this for ANY question whose stem depends on interpreting lab values — it guarantees exact numbers and clean formatting. Always ALSO write the key values in the question text as a compact table so the values are readable without the image.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(3).max(80).describe('Panel name, e.g. "Complete Blood Count"'),
            subtitle: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(80).optional().describe('Context line, e.g. "Patient: 34F · Day 3 of admission"'),
            rows: zod__WEBPACK_IMPORTED_MODULE_4__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
                test: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(1).max(60).describe('Test name, e.g. "Hemoglobin"'),
                result: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(1).max(30).describe('Result value as a string, e.g. "7.8"'),
                units: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(20).optional().describe('Units, e.g. "g/dL"'),
                reference: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(40).optional().describe('Reference range, e.g. "12.0–16.0"'),
                flag: zod__WEBPACK_IMPORTED_MODULE_4__/* ["enum"] */ .k5n([
                    'H',
                    'L',
                    ''
                ]).optional().describe('H = above range (red), L = below range (blue), empty = normal')
            })).min(1).max(30),
            footnote: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(120).optional().describe('Small footnote, e.g. "Reference ranges per institutional standards"')
        }),
        func: async ({ title, subtitle, rows, footnote })=>{
            try {
                await fs__WEBPACK_IMPORTED_MODULE_1__.promises.mkdir(GENERATED_DIR, {
                    recursive: true
                });
                const svg = buildLabPanelSvg({
                    title,
                    subtitle,
                    rows,
                    footnote
                });
                const fileName = `lab-${crypto.randomUUID().slice(0, 13)}.svg`;
                const filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(GENERATED_DIR, fileName);
                await fs__WEBPACK_IMPORTED_MODULE_1__.promises.writeFile(filePath, svg, 'utf8');
                const url = `/generated/${fileName}`;
                log.info?.(`Lab panel rendered: ${title} (${rows.length} rows) → ${url}`);
                return JSON.stringify({
                    url,
                    width: TABLE_W + 56,
                    height: HEADER_H + COLS_H + rows.length * ROW_H + (footnote ? 44 : 22),
                    rows: rows.length,
                    note: 'Lab panel image saved. Use this exact URL as the question\'s imageUrl, and ALSO include the key values as a compact plain-text table in the question text.'
                });
            } catch (error) {
                // Graceful degradation: never crash the agent graph — the question
                // can still be written with the values as an in-text table.
                return JSON.stringify({
                    error: `Lab panel rendering failed: ${error instanceof Error ? error.message.slice(0, 200) : 'unknown'}`,
                    note: 'Proceed without the panel image: write the lab values as a compact plain-text table directly in the question text instead.'
                });
            }
        }
    });
}


/***/ }),

/***/ 83723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ searchWithBocha)
/* harmony export */ });
/* harmony import */ var _lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115812);
/** Ported from OpenMAIC. Original: lib/web-search/bocha.ts */ /**
 * Bocha Web Search Integration
 *
 * Uses raw REST API via proxyFetch for reliable proxy support.
 * Bocha web search endpoint: POST https://api.bocha.cn/v1/web-search
 */ 
const BOCHA_DEFAULT_BASE_URL = 'https://api.bocha.cn';
const BOCHA_MAX_RESULTS = 50;
function buildBochaWebSearchUrl(baseUrl) {
    const trimmed = (baseUrl || BOCHA_DEFAULT_BASE_URL).replace(/\/$/, '');
    if (trimmed.endsWith('/v1/web-search')) return trimmed;
    if (trimmed.endsWith('/v1')) return `${trimmed}/web-search`;
    return `${trimmed}/v1/web-search`;
}
function clampCount(maxResults) {
    return Math.min(Math.max(Math.floor(maxResults), 1), BOCHA_MAX_RESULTS);
}
function formatBochaError(status, statusText, errorText) {
    if (!errorText) return `Bocha API error (${status}): ${statusText}`;
    try {
        const parsed = JSON.parse(errorText);
        const code = parsed.code ?? status;
        const message = parsed.message || parsed.msg || statusText;
        const logId = parsed.log_id ? `, log_id: ${parsed.log_id}` : '';
        return `Bocha API error (${code}): ${message}${logId}`;
    } catch  {
        return `Bocha API error (${status}): ${errorText}`;
    }
}
/**
 * Search the web using Bocha Web Search API and return structured results.
 */ async function searchWithBocha(params) {
    const { query, apiKey, maxResults = 10, baseUrl } = params;
    const startedAt = Date.now();
    const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildBochaWebSearchUrl(baseUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            query,
            freshness: 'noLimit',
            summary: true,
            count: clampCount(maxResults)
        })
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>'');
        throw new Error(formatBochaError(res.status, res.statusText, errorText));
    }
    const raw = await res.json();
    if (raw.code !== undefined && String(raw.code) !== '200') {
        const message = raw.message || raw.msg || 'Request failed';
        const logId = raw.log_id ? `, log_id: ${raw.log_id}` : '';
        throw new Error(`Bocha API error (${raw.code}): ${message}${logId}`);
    }
    const data = raw.data || raw;
    const pages = data.webPages?.value || [];
    const sources = pages.filter((page)=>page.url).map((page)=>({
            title: page.name || page.url,
            url: page.url,
            content: page.summary || page.snippet || '',
            score: 0
        }));
    return {
        answer: '',
        sources,
        query: data.queryContext?.originalQuery || query,
        responseTime: (Date.now() - startedAt) / 1000
    };
}


/***/ }),

/***/ 107662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateTTS: () => (/* binding */ generateTTS),
/* harmony export */   vY: () => (/* binding */ TTSRateLimitError)
/* harmony export */ });
/* unused harmony exports throwIfTtsRateLimited, getCurrentTTSConfig */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(731253);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(908521);
/* harmony import */ var _tts_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476149);
/* harmony import */ var _voxcpm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(754547);
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124307);
/**
 * TTS (Text-to-Speech) Provider Implementation
 *
 * Factory pattern for routing TTS requests to appropriate provider implementations.
 * Follows the same architecture as lib/ai/providers.ts for consistency.
 *
 * Currently Supported Providers:
 * - OpenAI TTS: https://platform.openai.com/docs/guides/text-to-speech
 * - Azure TTS: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech
 * - GLM TTS: https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-tts
 * - Qwen TTS: https://bailian.console.aliyun.com/
 * - MiniMax TTS: https://platform.minimaxi.com/docs/api-reference/speech-t2a-http
 * - Doubao TTS: https://www.volcengine.com/docs/6561/1257543
 * - ElevenLabs TTS: https://elevenlabs.io/docs/api-reference/text-to-speech/convert
 * - Browser Native: Web Speech API (client-side only)
 *
 * HOW TO ADD A NEW PROVIDER:
 *
 * 1. Add provider ID to TTSProviderId in lib/audio/types.ts
 *    Example: | 'elevenlabs-tts'
 *
 * 2. Add provider configuration to lib/audio/constants.ts
 *    Example:
 *    'elevenlabs-tts': {
 *      id: 'elevenlabs-tts',
 *      name: 'ElevenLabs',
 *      requiresApiKey: true,
 *      defaultBaseUrl: 'https://api.elevenlabs.io/v1',
 *      icon: '/logos/elevenlabs.svg',
 *      voices: [...],
 *      supportedFormats: ['mp3', 'pcm'],
 *      speedRange: { min: 0.5, max: 2.0, default: 1.0 }
 *    }
 *
 * 3. Implement provider function in this file
 *    Pattern: async function generateXxxTTS(config, text): Promise<TTSGenerationResult>
 *    - Validate config and build API request
 *    - Handle API authentication (apiKey, headers)
 *    - Convert provider-specific parameters (voice, speed, format)
 *    - Return { audio: Uint8Array, format: string }
 *
 *    Example:
 *    async function generateElevenLabsTTS(
 *      config: TTSModelConfig,
 *      text: string
 *    ): Promise<TTSGenerationResult> {
 *      const baseUrl = config.baseUrl || TTS_PROVIDERS['elevenlabs-tts'].defaultBaseUrl;
 *
 *      const response = await fetch(`${baseUrl}/text-to-speech/${config.voice}`, {
 *        method: 'POST',
 *        headers: {
 *          'xi-api-key': config.apiKey!,
 *          'Content-Type': 'application/json',
 *        },
 *        body: JSON.stringify({
 *          text,
 *          model_id: 'eleven_multilingual_v2',
 *          voice_settings: {
 *            stability: 0.5,
 *            similarity_boost: 0.75,
 *          }
 *        }),
 *      });
 *
 *      if (!response.ok) {
 *        throw new Error(`ElevenLabs TTS API error: ${response.statusText}`);
 *      }
 *
 *      const arrayBuffer = await response.arrayBuffer();
 *      return {
 *        audio: new Uint8Array(arrayBuffer),
 *        format: 'mp3',
 *      };
 *    }
 *
 * 4. Add case to generateTTS() switch statement
 *    case 'elevenlabs-tts':
 *      return await generateElevenLabsTTS(config, text);
 *
 * 5. Add i18n translations in lib/i18n.ts
 *    providerElevenLabsTTS: { zh: 'ElevenLabs TTS', en: 'ElevenLabs TTS' }
 *
 * Error Handling Patterns:
 * - Always validate API key if requiresApiKey is true
 * - Throw descriptive errors for API failures
 * - Include response.statusText or error messages from API
 * - For client-only providers (browser-native), throw error directing to client-side usage
 *
 * API Call Patterns:
 * - Direct API: Use fetch with appropriate headers and body format (recommended for better encoding support)
 * - SSML: For Azure-like providers requiring SSML markup
 * - URL-based: For providers returning audio URL (download in second step)
 */ 




/**
 * Thrown when a TTS provider returns a rate-limit / concurrency-quota error.
 * Allows downstream consumers to distinguish rate-limit errors from other TTS failures.
 *
 * TODO: The API route currently catches all errors uniformly as GENERATION_FAILED.
 * This class enables future retry/backoff logic without changing the throw sites.
 */ class TTSRateLimitError extends Error {
    constructor(provider, message){
        super(message), this.provider = provider;
        this.name = 'TTSRateLimitError';
    }
}
/**
 * Map an upstream HTTP 429 to a typed {@link TTSRateLimitError} so the API route
 * can surface it as 429 instead of a generic 500. Call right after an
 * `!response.ok` check, before building the provider-specific error message.
 */ function throwIfTtsRateLimited(provider, status) {
    if (status === 429) {
        throw new TTSRateLimitError(provider, `${provider} TTS rate limit exceeded (HTTP 429)`);
    }
}
/**
 * Generate speech using specified TTS provider
 */ async function generateTTS(config, text) {
    const provider = _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF[config.providerId];
    // Validate API key if required (only for built-in providers with known config)
    if (provider?.requiresApiKey && !config.apiKey) {
        throw new Error(`API key required for TTS provider: ${config.providerId}`);
    }
    // Narration/discussion text is markdown — strip it ONCE here so every
    // provider (and every calling route) speaks clean text instead of reading
    // "**", "#", "-" markers aloud. Idempotent, so client-side pre-stripping
    // (browser TTS paths) is safe to combine with this.
    const speakableText = (0,_tts_text__WEBPACK_IMPORTED_MODULE_3__/* .stripMarkdownForTTS */ .A)(text ?? '');
    switch(config.providerId){
        case 'openai-tts':
            return await generateOpenAITTS(config, speakableText);
        case 'azure-tts':
            return await generateAzureTTS(config, speakableText);
        case 'glm-tts':
            return await generateGLMTTS(config, speakableText);
        case 'qwen-tts':
            return await generateQwenTTS(config, speakableText);
        case 'voxcpm-tts':
            return await generateVoxCPMTTS(config, speakableText);
        case 'minimax-tts':
            return await generateMiniMaxTTS(config, speakableText);
        case 'doubao-tts':
            return await generateDoubaoTTS(config, speakableText);
        case 'elevenlabs-tts':
            return await generateElevenLabsTTS(config, speakableText);
        case 'lemonade-tts':
            return await generateLemonadeTTS(config, speakableText);
        case 'browser-native-tts':
            throw new Error('Browser Native TTS must be handled client-side using Web Speech API. This provider cannot be used on the server.');
        default:
            if ((0,_types__WEBPACK_IMPORTED_MODULE_4__/* .isCustomTTSProvider */ .S)(config.providerId)) {
                return await generateOpenAITTS(config, speakableText);
            }
            throw new Error(`Unsupported TTS provider: ${config.providerId}`);
    }
}
/**
 * OpenAI TTS implementation (direct API call with explicit UTF-8 encoding)
 */ async function generateOpenAITTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['openai-tts'].defaultBaseUrl;
    // Use gpt-4o-mini-tts for best quality and intelligent realtime applications
    const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .httpFetch */ .tX)(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'gpt-4o-mini-tts',
            input: text,
            voice: config.voice,
            speed: config.speed || 1.0
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('OpenAI', response.status);
        const error = await response.json().catch(()=>({
                error: response.statusText
            }));
        throw new Error(`OpenAI TTS API error: ${error.error?.message || response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    const format = getAudioResponseFormat(contentType);
    return {
        audio: new Uint8Array(arrayBuffer),
        format
    };
}
/**
 * Lemonade TTS implementation (OpenAI-compatible /v1/audio/speech).
 */ async function generateLemonadeTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['lemonade-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    const modelId = config.modelId || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['lemonade-tts'].defaultModelId;
    const voice = config.voice || 'af_heart';
    const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .httpFetch */ .tX)(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(config.apiKey)
        },
        body: JSON.stringify({
            model: modelId,
            input: text,
            voice,
            speed: config.speed || 1.0,
            response_format: config.format || 'wav'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Lemonade', response.status);
        throw new Error(`Lemonade TTS API error: ${await readTTSApiError(response)}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    return {
        audio: new Uint8Array(arrayBuffer),
        format: getAudioResponseFormat(contentType)
    };
}
/**
 * VoxCPM2 TTS implementation.
 *
 * OpenMAIC keeps one internal VoxCPM request shape, then adapts it to the
 * selected official backend protocol.
 */ async function generateVoxCPMTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['voxcpm-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    if (!baseUrl) {
        throw new Error('VoxCPM base URL is required');
    }
    const options = config.providerOptions || {};
    const backend = (0,_voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .normalizeVoxCPMBackend */ .H_)(options.backend);
    const voicePrompt = options.voicePrompt || (config.voice && config.voice !== 'default' && config.voice !== _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? config.voice : undefined);
    // A registered voice carries timbre by id, so no voice prompt is required.
    const registeredVoiceId = options.registeredVoiceId?.trim() || undefined;
    if (config.voice === _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_AUTO_VOICE_ID */ .p0 && !voicePrompt && !registeredVoiceId) {
        throw new Error('VoxCPM Auto Voice requires agent context');
    }
    const cfgValue = options.cfgValue ?? 2.0;
    const inferenceTimesteps = options.inferenceTimesteps ?? 10;
    const normalize = options.normalize ?? false;
    const denoise = options.denoise ?? false;
    const usePromptContinuation = Boolean(options.promptText?.trim() && options.referenceAudioBase64);
    const request = {
        targetText: usePromptContinuation ? text : buildVoxCPMTargetText(text, voicePrompt),
        rawText: text,
        registeredVoiceId,
        voicePrompt,
        promptText: options.promptText,
        cfgValue,
        inferenceTimesteps,
        normalize,
        denoise,
        referenceAudioBase64: options.referenceAudioBase64,
        referenceAudioMimeType: options.referenceAudioMimeType,
        referenceAudioName: options.referenceAudioName
    };
    const response = backend === 'nano-vllm' ? await postVoxCPMNanoVLLM(baseUrl, request, config.apiKey) : backend === 'python-api' ? await postVoxCPMPythonAPI(baseUrl, request, config.apiKey) : await postVoxCPMVLLMOmni(baseUrl, request, config);
    if (!response.ok) {
        throwIfTtsRateLimited('VoxCPM', response.status);
        throw new Error(`VoxCPM TTS API error: ${await readTTSApiError(response)}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    const format = getAudioResponseFormat(contentType);
    return {
        audio: new Uint8Array(arrayBuffer),
        format
    };
}
function buildVoxCPMTargetText(text, voicePrompt) {
    const prompt = voicePrompt?.replace(/[\p{C}]+/gu, ' ').replace(/[()（）]/gu, '').replace(/\s+/gu, ' ').trim();
    return prompt ? `(${prompt})${text}` : text;
}
function getAudioResponseFormat(contentType) {
    if (contentType.includes('audio/wav') || contentType.includes('audio/x-wav')) return 'wav';
    if (contentType.includes('audio/mpeg') || contentType.includes('audio/mp3')) return 'mp3';
    if (contentType.includes('audio/flac')) return 'flac';
    if (contentType.includes('audio/ogg')) return 'ogg';
    if (contentType.includes('audio/webm')) return 'webm';
    return 'mp3';
}
function getVoxCPMAudioFormat(mimeType, fileName) {
    const lowerName = fileName?.toLowerCase() || '';
    if (mimeType?.includes('wav') || lowerName.endsWith('.wav')) return 'wav';
    if (mimeType?.includes('mpeg') || mimeType?.includes('mp3') || lowerName.endsWith('.mp3')) {
        return 'mp3';
    }
    if (mimeType?.includes('flac') || lowerName.endsWith('.flac')) return 'flac';
    if (mimeType?.includes('ogg') || lowerName.endsWith('.ogg')) return 'ogg';
    if (mimeType?.includes('webm') || lowerName.endsWith('.webm')) return 'webm';
    return 'wav';
}
function getVLLMOmniSpeechUrl(baseUrl) {
    return baseUrl.endsWith('/v1') ? `${baseUrl}/audio/speech` : `${baseUrl}/v1/audio/speech`;
}
function getVLLMOmniModelId(config) {
    const modelId = config.modelId?.trim();
    if (!modelId || modelId === 'VoxCPM2') return _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_VLLM_MODEL_ID */ .Cn;
    return modelId;
}
function getBackendAuthHeaders(apiKey) {
    return apiKey?.trim() ? {
        Authorization: `Bearer ${apiKey.trim()}`
    } : {};
}
async function postVoxCPMVLLMOmni(baseUrl, params, config) {
    const payload = {
        model: getVLLMOmniModelId(config),
        input: params.targetText,
        voice: 'default',
        response_format: 'wav',
        stream: false
    };
    if (params.registeredVoiceId) {
        // A registered voice carries timbre by id (pre-encoded latents): reference it
        // directly and send the raw text — no inline voice-design prompt or ref_audio.
        payload.voice = params.registeredVoiceId;
        payload.input = params.rawText ?? params.targetText;
    } else if (params.referenceAudioBase64) {
        const referenceAudio = getVoxCPMDataAudioUrl(params.referenceAudioBase64, params.referenceAudioMimeType, params.referenceAudioName);
        payload.ref_audio = referenceAudio;
        if (params.promptText?.trim()) {
            payload.prompt_audio = referenceAudio;
            payload.prompt_text = params.promptText.trim();
        }
    }
    return fetch(getVLLMOmniSpeechUrl(baseUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(config.apiKey)
        },
        body: JSON.stringify(payload)
    });
}
function getVoxCPMDataAudioUrl(base64, mimeType, fileName) {
    const format = getVoxCPMAudioFormat(mimeType, fileName);
    const mediaType = mimeType?.trim() || (format === 'mp3' ? 'audio/mpeg' : format === 'flac' ? 'audio/flac' : format === 'ogg' ? 'audio/ogg' : format === 'webm' ? 'audio/webm' : 'audio/wav');
    return `data:${mediaType};base64,${base64}`;
}
function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let index = 0; index < binary.length; index++){
        bytes[index] = binary.charCodeAt(index);
    }
    return new Blob([
        bytes
    ], {
        type: mimeType || 'audio/wav'
    });
}
async function postVoxCPMPythonAPI(baseUrl, params, apiKey) {
    const formData = new FormData();
    formData.set('text', params.targetText);
    formData.set('cfg_value', String(params.cfgValue));
    formData.set('inference_timesteps', String(params.inferenceTimesteps));
    formData.set('normalize', String(params.normalize));
    formData.set('denoise', String(params.denoise));
    if (params.referenceAudioBase64) {
        const audioBlob = base64ToBlob(params.referenceAudioBase64, params.referenceAudioMimeType);
        const audioName = params.referenceAudioName || 'reference.wav';
        formData.set('reference_audio', audioBlob, audioName);
        if (params.promptText?.trim()) {
            formData.set('prompt_audio', audioBlob, audioName);
            formData.set('prompt_text', params.promptText.trim());
        }
    }
    return fetch(`${baseUrl}/tts/upload`, {
        method: 'POST',
        headers: getBackendAuthHeaders(apiKey),
        body: formData
    });
}
async function postVoxCPMNanoVLLM(baseUrl, params, apiKey) {
    const payload = {
        target_text: params.targetText,
        cfg_value: params.cfgValue
    };
    if (params.referenceAudioBase64) {
        const format = getVoxCPMAudioFormat(params.referenceAudioMimeType, params.referenceAudioName);
        payload.ref_audio_wav_base64 = params.referenceAudioBase64;
        payload.ref_audio_wav_format = format;
        if (params.promptText?.trim()) {
            payload.prompt_wav_base64 = params.referenceAudioBase64;
            payload.prompt_wav_format = format;
            payload.prompt_text = params.promptText.trim();
        }
    }
    return fetch(`${baseUrl}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(apiKey)
        },
        body: JSON.stringify(payload)
    });
}
async function readTTSApiError(response) {
    const text = await response.text().catch(()=>response.statusText);
    if (!text) return response.statusText;
    try {
        const json = JSON.parse(text);
        if (typeof json.detail === 'string') return json.detail;
        if (typeof json.error === 'string') return json.error;
        if (json.error?.message) return json.error.message;
    } catch  {
    // Fall through to raw text.
    }
    return text;
}
/**
 * Azure TTS implementation (direct API call with SSML)
 */ async function generateAzureTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['azure-tts'].defaultBaseUrl;
    // Build SSML
    const rate = config.speed ? `${((config.speed - 1) * 100).toFixed(0)}%` : '0%';
    const ssml = `
    <speak version='1.0' xml:lang='zh-CN'>
      <voice xml:lang='zh-CN' name='${config.voice}'>
        <prosody rate='${rate}'>${escapeXml(text)}</prosody>
      </voice>
    </speak>
  `.trim();
    const response = await fetch(`${baseUrl}/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': config.apiKey,
            'Content-Type': 'application/ssml+xml; charset=utf-8',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
        },
        body: ssml
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Azure', response.status);
        throw new Error(`Azure TTS API error: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'mp3'
    };
}
/**
 * GLM TTS implementation (GLM API)
 */ async function generateGLMTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['glm-tts'].defaultBaseUrl;
    const response = await fetch(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'glm-tts',
            input: text,
            voice: config.voice,
            speed: config.speed || 1.0,
            volume: 1.0,
            response_format: 'wav'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('GLM', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        let errorMessage = `GLM TTS API error: ${errorText}`;
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error?.message) {
                errorMessage = `GLM TTS API error: ${errorJson.error.message} (code: ${errorJson.error.code})`;
            }
        } catch  {
        // If not JSON, use the text as is
        }
        throw new Error(errorMessage);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'wav'
    };
}
/**
 * Qwen TTS implementation (DashScope API - Qwen3 TTS Flash)
 */ async function generateQwenTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['qwen-tts'].defaultBaseUrl;
    // Calculate speed: Qwen3 uses rate parameter from -500 to 500
    // speed 1.0 = rate 0, speed 2.0 = rate 500, speed 0.5 = rate -250
    const rate = Math.round(((config.speed || 1.0) - 1.0) * 500);
    const response = await fetch(`${baseUrl}/services/aigc/multimodal-generation/generation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'qwen3-tts-flash',
            input: {
                text,
                voice: config.voice,
                language_type: 'Chinese'
            },
            parameters: {
                rate
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Qwen', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`Qwen TTS API error: ${errorText}`);
    }
    const data = await response.json();
    // Check for audio URL in response
    if (!data.output?.audio?.url) {
        throw new Error(`Qwen TTS error: No audio URL in response. Response: ${JSON.stringify(data)}`);
    }
    // Download audio from URL
    const audioUrl = data.output.audio.url;
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
        throw new Error(`Failed to download audio from URL: ${audioResponse.statusText}`);
    }
    const arrayBuffer = await audioResponse.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'wav'
    };
}
/**
 * MiniMax TTS implementation (synchronous HTTP API)
 */ async function generateMiniMaxTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['minimax-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    const response = await fetch(`${baseUrl}/v1/t2a_v2`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'speech-2.8-hd',
            text,
            stream: false,
            output_format: 'hex',
            voice_setting: {
                voice_id: config.voice,
                speed: config.speed || 1.0,
                vol: 1,
                pitch: 0
            },
            audio_setting: {
                sample_rate: 32000,
                bitrate: 128000,
                format: config.format || 'mp3',
                channel: 1
            },
            language_boost: 'auto'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('MiniMax', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax TTS API error: ${errorText}`);
    }
    const data = await response.json();
    const hexAudio = data?.data?.audio;
    if (!hexAudio || typeof hexAudio !== 'string') {
        throw new Error(`MiniMax TTS error: No audio returned. Response: ${JSON.stringify(data)}`);
    }
    const cleanedHex = hexAudio.trim();
    if (cleanedHex.length % 2 !== 0) {
        throw new Error('MiniMax TTS error: invalid hex audio payload length');
    }
    const audio = new Uint8Array(cleanedHex.match(/.{1,2}/g)?.map((byte)=>parseInt(byte, 16)) || []);
    return {
        audio,
        format: data?.extra_info?.audio_format || config.format || 'mp3'
    };
}
/**
 * ElevenLabs TTS implementation (direct API call with voice-specific endpoint)
 */ async function generateElevenLabsTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['elevenlabs-tts'].defaultBaseUrl;
    const requestedFormat = config.format || 'mp3';
    const clampedSpeed = Math.min(1.2, Math.max(0.7, config.speed || 1.0));
    const outputFormatMap = {
        mp3: 'mp3_44100_128',
        opus: 'opus_48000_96',
        pcm: 'pcm_44100',
        wav: 'wav_44100',
        ulaw: 'ulaw_8000',
        alaw: 'alaw_8000'
    };
    const outputFormat = outputFormatMap[requestedFormat] || outputFormatMap.mp3;
    const response = await fetch(`${baseUrl}/text-to-speech/${encodeURIComponent(config.voice)}?output_format=${outputFormat}`, {
        method: 'POST',
        headers: {
            'xi-api-key': config.apiKey,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            text,
            model_id: config.modelId || 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                speed: clampedSpeed
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('ElevenLabs', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`ElevenLabs TTS API error: ${errorText || response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: requestedFormat
    };
}
/**
 * Get current TTS configuration from settings store
 * Note: This function should only be called in browser context
 */ async function getCurrentTTSConfig() {
    if (true) {
        throw new Error('getCurrentTTSConfig() can only be called in browser context');
    }
    // Lazy import to avoid circular dependency
    const { useSettingsStore } = await Promise.all(/* import() */[__webpack_require__.e(7909), __webpack_require__.e(3946)]).then(__webpack_require__.bind(__webpack_require__, 473946));
    const { ttsProviderId, ttsVoice, ttsSpeed, ttsProvidersConfig } = useSettingsStore.getState();
    const providerConfig = ttsProvidersConfig?.[ttsProviderId];
    return {
        providerId: ttsProviderId,
        modelId: providerConfig?.modelId || TTS_PROVIDERS[ttsProviderId]?.defaultModelId || '',
        apiKey: providerConfig?.apiKey,
        baseUrl: providerConfig?.baseUrl || providerConfig?.customDefaultBaseUrl,
        voice: ttsVoice,
        speed: ttsSpeed
    };
}
// Re-export from constants for convenience

/**
 * Doubao TTS 2.0 implementation (Volcengine Seed-TTS 2.0)
 */ async function generateDoubaoTTS(config, text) {
    const colonIdx = (config.apiKey || '').indexOf(':');
    if (colonIdx <= 0) {
        throw new Error('Doubao TTS requires API key in format "appId:accessKey". Get both from the Volcengine console.');
    }
    const appId = config.apiKey.slice(0, colonIdx);
    const accessKey = config.apiKey.slice(colonIdx + 1);
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['doubao-tts'].defaultBaseUrl;
    const speechRate = Math.round(((config.speed || 1.0) - 1.0) * 100);
    const response = await fetch(`${baseUrl}/unidirectional`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-App-Id': appId,
            'X-Api-Access-Key': accessKey,
            'X-Api-Resource-Id': 'seed-tts-2.0'
        },
        body: JSON.stringify({
            user: {
                uid: 'openmaic'
            },
            req_params: {
                text,
                speaker: config.voice,
                audio_params: {
                    format: 'mp3',
                    sample_rate: 24000,
                    speech_rate: speechRate
                }
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Doubao', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`Doubao TTS API error (${response.status}): ${errorText}`);
    }
    const responseText = await response.text();
    const audioChunks = [];
    let depth = 0;
    let start = -1;
    for(let i = 0; i < responseText.length; i++){
        if (responseText[i] === '{') {
            if (depth === 0) start = i;
            depth++;
        } else if (responseText[i] === '}') {
            depth--;
            if (depth === 0 && start >= 0) {
                let chunk;
                try {
                    chunk = JSON.parse(responseText.slice(start, i + 1));
                } catch  {
                    start = -1;
                    continue;
                }
                start = -1;
                if (chunk.code === 0 && chunk.data) {
                    audioChunks.push(new Uint8Array(Buffer.from(chunk.data, 'base64')));
                } else if (chunk.code === 20000000) {
                    break;
                } else if (chunk.code && chunk.code !== 0) {
                    if (chunk.code === 45000000 || chunk.code === 45000292) {
                        throw new TTSRateLimitError('doubao-tts', chunk.message || 'concurrency quota exceeded');
                    }
                    throw new Error(`Doubao TTS error: ${chunk.message || 'unknown'} (code: ${chunk.code})`);
                }
            }
        }
    }
    if (audioChunks.length === 0) {
        throw new Error('Doubao TTS: no audio data received');
    }
    const totalLength = audioChunks.reduce((sum, c)=>sum + c.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioChunks){
        combined.set(chunk, offset);
        offset += chunk.length;
    }
    return {
        audio: combined,
        format: 'mp3'
    };
}
/**
 * Escape XML special characters for SSML
 */ function escapeXml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}


/***/ }),

/***/ 115812:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ proxyFetch)
/* harmony export */ });
/* unused harmony export shouldBypassProxy */
/* harmony import */ var undici__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(547774);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/proxy-fetch.ts
 *
 * Proxy-aware fetch for server-side use — ported verbatim.
 *
 * Automatically routes requests through HTTP/HTTPS proxy when
 * the standard environment variables are set:
 *   - https_proxy / HTTPS_PROXY
 *   - http_proxy / HTTP_PROXY
 *
 * Requests are sent directly (bypassing the proxy) when:
 *   - the target host is a loopback address (localhost, 127.0.0.0/8, ::1) —
 *     routing loopback through an external proxy resolves to the *proxy's*
 *     localhost, which is never what the caller means; or
 *   - the target host matches the standard no_proxy / NO_PROXY env var
 *     (comma-separated hosts, `*` wildcard, optional `:port`, and
 *     domain-suffix matching à la curl: `example.com` also matches
 *     `api.example.com`).
 *
 * Node.js's built-in fetch does NOT respect these env vars,
 * so we use undici's ProxyAgent when a proxy is configured.
 *
 * Usage: import { proxyFetch } from '@/lib/server/proxy-fetch';
 *        const res = await proxyFetch('https://api.openai.com/v1/...', { ... });
 */ 

const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('ProxyFetch');
function getProxyUrl() {
    return process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY || undefined;
}
function getNoProxyEntries() {
    const raw = process.env.no_proxy || process.env.NO_PROXY || '';
    return raw.split(',').map((entry)=>entry.trim().toLowerCase()).filter(Boolean);
}
function isLoopbackHost(hostname) {
    const host = hostname.toLowerCase();
    if (host === 'localhost' || host.endsWith('.localhost')) return true;
    // URL.hostname strips the brackets from IPv6 literals on parse, but be
    // lenient and accept both forms.
    if (host === '::1' || host === '[::1]') return true;
    return /^127(\.\d{1,3}){3}$/.test(host);
}
function matchesNoProxyEntry(hostname, port, entry) {
    if (entry === '*') return true;
    let entryHost = entry;
    let entryPort = '';
    // Split a trailing `:port`. Skip IPv6 literals (multiple colons).
    const colonIndex = entry.lastIndexOf(':');
    if (colonIndex !== -1 && entry.indexOf(':') === colonIndex) {
        entryHost = entry.slice(0, colonIndex);
        entryPort = entry.slice(colonIndex + 1);
    }
    if (entryPort && entryPort !== port) return false;
    // A leading dot (`.example.com`) means the same as `example.com`:
    // match the host itself and any subdomain.
    entryHost = entryHost.replace(/^\./, '');
    if (!entryHost) return false;
    return hostname === entryHost || hostname.endsWith(`.${entryHost}`);
}
/**
 * Whether a request to `url` should skip the configured proxy.
 * Exported for tests.
 */ function shouldBypassProxy(url) {
    const hostname = url.hostname.toLowerCase();
    if (isLoopbackHost(hostname)) return true;
    const entries = getNoProxyEntries();
    if (entries.length === 0) return false;
    const port = url.port || (url.protocol === 'https:' ? '443' : '80');
    return entries.some((entry)=>matchesNoProxyEntry(hostname, port, entry));
}
let cachedAgent = null;
let cachedProxyUrl;
function getProxyAgent() {
    const proxyUrl = getProxyUrl();
    if (!proxyUrl) return undefined;
    // Reuse agent if proxy URL hasn't changed
    if (cachedAgent && cachedProxyUrl === proxyUrl) {
        return cachedAgent;
    }
    cachedAgent = new undici__WEBPACK_IMPORTED_MODULE_0__/* .ProxyAgent */ .kT(proxyUrl);
    cachedProxyUrl = proxyUrl;
    return cachedAgent;
}
/**
 * Drop-in replacement for fetch() that respects proxy env vars.
 * Falls back to global fetch when no proxy is configured, when the target
 * is a loopback address, or when the target matches no_proxy / NO_PROXY.
 */ async function proxyFetch(input, init) {
    const agent = getProxyAgent();
    const url = typeof input === 'string' ? input : input.toString();
    if (!agent) {
        log.info('No proxy configured, using direct fetch for:', url.slice(0, 80));
        return fetch(input, init);
    }
    let parsed;
    try {
        parsed = new URL(url);
    } catch  {
    // Unparseable input — let fetch surface the real error below.
    }
    if (parsed && shouldBypassProxy(parsed)) {
        log.info('Bypassing proxy (loopback/NO_PROXY) for:', url.slice(0, 80));
        return fetch(input, init);
    }
    log.info('Using proxy', cachedProxyUrl, 'for:', url.slice(0, 80));
    // Use undici's fetch with the proxy dispatcher
    const res = await (0,undici__WEBPACK_IMPORTED_MODULE_0__/* .fetch */ .hd)(input, {
        ...init,
        dispatcher: agent
    });
    // undici's Response is compatible with the global Response
    return res;
}


/***/ }),

/***/ 118428:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TM: () => (/* binding */ getWeakSystems),
/* harmony export */   ZR: () => (/* binding */ getWeakTopics),
/* harmony export */   oC: () => (/* binding */ formatWeakTopics)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Weak-topic detection from the user's quiz attempt history.
 *
 * Groups QuestionAttempt rows by question topic, computes per-topic accuracy,
 * and returns the worst-performing topics (minimum 2 attempts so a single
 * lucky/unlucky answer doesn't drive the schedule). Used by scheduled agent
 * jobs ("every Sunday, generate 20 MCQs on my weak topics") and available as
 * a chat tool so the agent can answer "what are my weak areas?".
 */ 

const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('WeakTopics');
/**
 * Top weak topics by accuracy (ascending), limited to `limit`.
 * Topics with fewer than `minAttempts` attempts are skipped.
 */ async function getWeakTopics(userId, limit = 5, minAttempts = 2) {
    return getWeaknessByDimension(userId, 'topic', limit, minAttempts);
}
/** Same weakness rollup by organ SYSTEM (Cardiovascular, Renal, …). */ async function getWeakSystems(userId, limit = 5, minAttempts = 2) {
    return getWeaknessByDimension(userId, 'system', limit, minAttempts);
}
/** Shared rollup: accuracy per `topic` or `system` value, worst first. */ async function getWeaknessByDimension(userId, dimension, limit, minAttempts) {
    try {
        // Parameterized SQL ($1 userId, $2 minAttempts, $3 limit) — the dimension
        // switches between two fixed query strings, never user input.
        const sql = dimension === 'topic' ? `SELECT q.topic AS label, COUNT(*)::int AS attempts,
                SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::int AS correct
         FROM "QuestionAttempt" qa JOIN "Question" q ON q.id = qa."questionId"
         WHERE qa."userId" = $1 AND q.topic IS NOT NULL AND q.topic <> ''
         GROUP BY q.topic HAVING COUNT(*) >= $2
         ORDER BY (SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::float / COUNT(*)) ASC, COUNT(*) DESC
         LIMIT $3` : `SELECT q.system AS label, COUNT(*)::int AS attempts,
                SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::int AS correct
         FROM "QuestionAttempt" qa JOIN "Question" q ON q.id = qa."questionId"
         WHERE qa."userId" = $1 AND q.system IS NOT NULL AND q.system <> ''
         GROUP BY q.system HAVING COUNT(*) >= $2
         ORDER BY (SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::float / COUNT(*)) ASC, COUNT(*) DESC
         LIMIT $3`;
        const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.$queryRawUnsafe(sql, userId, minAttempts, limit);
        return rows.map((r)=>{
            const attempts = Number(r.attempts);
            const correct = Number(r.correct);
            return {
                topic: String(r.label),
                attempts,
                correct,
                accuracy: correct / Math.max(1, attempts)
            };
        });
    } catch (error) {
        log.warn?.(`weak-${dimension} query failed:`, error);
        return [];
    }
}
/** Render the weak-topic list as a compact context block for agent prompts. */ function formatWeakTopics(topics) {
    if (topics.length === 0) {
        return 'No attempt history yet — the learner has no measurable weak areas. Cover a balanced mix of core topics instead.';
    }
    const lines = topics.map((t)=>`- ${t.topic}: ${t.correct}/${t.attempts} correct (${Math.round(t.accuracy * 100)}% accuracy)`);
    return `The learner's weakest topics (from their quiz attempt history):\n${lines.join('\n')}`;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 132705:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ createDocumentTool)
/* harmony export */ });
/* unused harmony export markdownToHtml */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(902328);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_1__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * generate_document — publication-quality deliverables as artifacts.
 *
 * Ported from the reference deep-agent-platform `tools/documents/document-tool.ts`
 * (markdown → styled standalone HTML + downloadable file). This port targets
 * the packages MedQ already ships: HTML documents are self-contained styled
 * pages, and PDF study sheets are produced with jspdf (already a dependency).
 */ function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/** Minimal markdown-subset → standalone styled HTML (port of P2's renderer). */ function markdownToHtml(title, markdown) {
    const bodyLines = markdown.split('\n');
    const html = [];
    let inList = false;
    let inCode = false;
    const closeList = ()=>{
        if (inList) {
            html.push('</ul>');
            inList = false;
        }
    };
    for (const rawLine of bodyLines){
        const line = rawLine.trimEnd();
        if (line.startsWith('```')) {
            closeList();
            html.push(inCode ? '</code></pre>' : '<pre><code>');
            inCode = !inCode;
            continue;
        }
        if (inCode) {
            html.push(escapeHtml(rawLine));
            continue;
        }
        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
            closeList();
            const level = Math.min(heading[1].length + 1, 5);
            html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
            continue;
        }
        const bullet = line.match(/^[-*+]\s+(.*)$/);
        if (bullet) {
            if (!inList) {
                html.push('<ul>');
                inList = true;
            }
            html.push(`<li>${renderInline(bullet[1])}</li>`);
            continue;
        }
        const tableRow = line.match(/^\|(.+)\|$/);
        if (tableRow) {
            closeList();
            if (/^[\s|:-]+$/.test(line)) continue; // separator row
            const cells = tableRow[1].split('|').map((cell)=>`<td>${renderInline(cell.trim())}</td>`);
            html.push(`<tr>${cells.join('')}</tr>`);
            continue;
        }
        if (!line.trim()) {
            closeList();
            continue;
        }
        closeList();
        html.push(`<p>${renderInline(line)}</p>`);
    }
    closeList();
    if (inCode) html.push('</code></pre>');
    return [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        `<title>${escapeHtml(title)}</title>`,
        '<style>',
        'body{font-family:Georgia,"Times New Roman",serif;max-width:820px;margin:40px auto;padding:0 24px;line-height:1.65;color:#1a2332;}',
        'h1{font-size:1.9em;border-bottom:2px solid #0e7c66;padding-bottom:8px;color:#0e5c4a;}',
        'h2{font-size:1.45em;color:#0e5c4a;margin-top:1.6em;}h3{font-size:1.2em;margin-top:1.4em;}',
        'ul{padding-left:22px;}li{margin:4px 0;}',
        'table{border-collapse:collapse;width:100%;margin:1em 0;}td{border:1px solid #cfd8dc;padding:6px 10px;}tr:first-child td{background:#e8f5f1;font-weight:bold;}',
        'pre{background:#0d1117;color:#e6edf3;padding:14px;border-radius:8px;overflow-x:auto;}code{font-family:ui-monospace,monospace;}',
        'strong{color:#0b4f43;}blockquote{border-left:4px solid #0e7c66;margin:1em 0;padding:4px 18px;background:#f2faf8;color:#33534b;}',
        '</style>',
        '</head>',
        '<body>',
        `<h1>${escapeHtml(title)}</h1>`,
        ...html,
        '</body>',
        '</html>'
    ].join('\n');
}
function renderInline(text) {
    return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');
}
/** Markdown-subset → PDF via jspdf (MedQ's existing dependency). */ async function markdownToPdfBuffer(title, markdown) {
    const { jsPDF } = await __webpack_require__.e(/* import() */ 5837).then(__webpack_require__.bind(__webpack_require__, 965837));
    const doc = new jsPDF({
        unit: 'pt',
        format: 'a4'
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;
    const ensureSpace = (needed)=>{
        if (y + needed > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };
    const writeWrapped = (text, fontSize, fontStyle, color, indent = 0)=>{
        doc.setFont('helvetica', fontStyle);
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, maxWidth - indent);
        for (const line of lines){
            ensureSpace(fontSize * 1.45);
            doc.text(line, margin + indent, y);
            y += fontSize * 1.45;
        }
    };
    // Title
    writeWrapped(title, 20, 'bold', [
        14,
        92,
        74
    ]);
    y += 6;
    doc.setDrawColor(14, 124, 102);
    doc.setLineWidth(2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
    let inCode = false;
    for (const rawLine of markdown.split('\n')){
        const line = rawLine.trimEnd();
        if (line.startsWith('```')) {
            inCode = !inCode;
            y += 4;
            continue;
        }
        if (inCode) {
            writeWrapped(line, 9, 'normal', [
                80,
                90,
                100
            ]);
            continue;
        }
        if (!line.trim()) {
            y += 7;
            continue;
        }
        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
            y += 10;
            const size = [
                16,
                13.5,
                12,
                11
            ][Math.min(heading[1].length - 1, 3)];
            writeWrapped(heading[2].replace(/\*\*/g, ''), size, 'bold', [
                14,
                92,
                74
            ]);
            y += 3;
            continue;
        }
        const bullet = line.match(/^[-*+]\s+(.*)$/);
        if (bullet) {
            ensureSpace(14);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(14, 124, 102);
            doc.text('•', margin + 2, y);
            writeWrapped(bullet[1].replace(/\*\*/g, ''), 10.5, 'normal', [
                26,
                35,
                50
            ], 16);
            continue;
        }
        const numbered = line.match(/^\d+[.)]\s+(.*)$/);
        if (numbered) {
            const num = line.match(/^(\d+)/)?.[1] ?? '1';
            writeWrapped(`${num}. ${numbered[1].replace(/\*\*/g, '')}`, 10.5, 'normal', [
                26,
                35,
                50
            ], 14);
            continue;
        }
        const tableRow = line.match(/^\|(.+)\|$/);
        if (tableRow) {
            if (/^[\s|:-]+$/.test(line)) continue;
            const cells = tableRow[1].split('|').map((cell)=>cell.trim().replace(/\*\*/g, ''));
            writeWrapped(cells.join('   |   '), 10, 'normal', [
                26,
                35,
                50
            ]);
            continue;
        }
        writeWrapped(line.replace(/\*\*/g, '').replace(/[*`]/g, ''), 10.5, 'normal', [
            26,
            35,
            50
        ]);
    }
    // Footer page numbers
    const pageCount = doc.getNumberOfPages();
    for(let page = 1; page <= pageCount; page += 1){
        doc.setPage(page);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(130, 140, 150);
        doc.text(`MedQ Agent · ${title} · ${page}/${pageCount}`, margin, pageHeight - 20);
    }
    return Buffer.from(doc.output('arraybuffer'));
}
function createDocumentTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'generate_document',
        description: 'Generate a polished, downloadable document (study guide, cheat sheet, handout, report) from markdown content and save it as a durable artifact with preview + download. Formats: "html" (styled, opens in any browser/Word), "pdf" (formatted PDF), or "markdown" (source). Use for any substantial document deliverable; use create_artifact for raw data blocks.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(3).max(120).describe('Document title, e.g. "Heart Failure Cheat Sheet"'),
            content: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(30).max(100000).describe('Full document content as markdown (headings, bullets, tables, bold)'),
            format: zod__WEBPACK_IMPORTED_MODULE_2__/* ["enum"] */ .k5n([
                'html',
                'pdf',
                'markdown'
            ]).optional().describe('Output format, default html'),
            filename: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(80).optional().describe('File base name, default derived from title')
        }),
        func: async ({ title, content, format = 'html', filename })=>{
            try {
                const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'document';
                if (format === 'markdown') {
                    const artifact = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_1__/* .createArtifact */ .Dg)({
                        userId: ctx.userId,
                        name: base,
                        kind: 'markdown',
                        content: `# ${title}\n\n${content}`,
                        meta: {
                            title,
                            format
                        }
                    });
                    return finish(artifact, `${base}.md`);
                }
                if (format === 'pdf') {
                    const pdf = await markdownToPdfBuffer(title, content);
                    // Store PDF bytes as base64 data via a public file (PDFs are binary)
                    const { saveBinaryArtifact } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 993958));
                    const artifact = await saveBinaryArtifact({
                        userId: ctx.userId,
                        name: base,
                        kind: 'document',
                        mimeType: 'application/pdf',
                        buffer: pdf,
                        meta: {
                            title,
                            format
                        }
                    });
                    return finish(artifact, `${base}.pdf`);
                }
                const html = markdownToHtml(title, content);
                const artifact = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_1__/* .createArtifact */ .Dg)({
                    userId: ctx.userId,
                    name: base,
                    kind: 'html',
                    content: html,
                    meta: {
                        title,
                        format
                    }
                });
                return finish(artifact, `${base}.html`);
            } catch (error) {
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}
function finish(artifact, filename) {
    return JSON.stringify({
        created: true,
        artifact: {
            id: artifact.id,
            name: artifact.name,
            filename,
            downloadUrl: artifact.downloadUrl,
            // previewUrl: direct file URL for binaries (public/generated); inline
            // preview for text kinds appends ?inline=1 so iframes render instead
            // of download. pdfPreviewUrl: office conversions (no-op for real PDFs,
            // which preview directly).
            previewUrl: artifact.url ?? `${artifact.downloadUrl}?inline=1`,
            pdfPreviewUrl: `/api/medq-agent/artifacts/${artifact.id}/pdf`,
            mimeType: artifact.mimeType,
            kind: artifact.kind,
            sizeBytes: artifact.sizeBytes
        },
        note: 'Document saved. A file card with preview + download is shown automatically — you may also reference the download link in your final answer.'
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 142564:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HK: () => (/* binding */ streamMedQDeepAgent),
/* harmony export */   Rd: () => (/* binding */ zaiGatewayHeaders),
/* harmony export */   U$: () => (/* binding */ generateMedQQuestions),
/* harmony export */   V5: () => (/* binding */ zaiFallbackConfig),
/* harmony export */   _M: () => (/* binding */ isProviderOverloadError),
/* harmony export */   b$: () => (/* binding */ resolveMedQAgentConfig)
/* harmony export */ });
/* unused harmony export createMedQDeepAgent */
/* harmony import */ var _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31747);
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(971890);
/* harmony import */ var _langchain_openai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(618093);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(18963);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(520903);
/* harmony import */ var deepagents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(458713);
/* harmony import */ var langchain__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(368875);
/* harmony import */ var _langchain_quickjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(912680);
/* harmony import */ var _approvals_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66251);
/* harmony import */ var _deep_agent_tools__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(815519);
/* harmony import */ var _memory_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(590344);
/* harmony import */ var _memory_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(681948);
/* harmony import */ var _threads_title__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(19443);
/* harmony import */ var _skills_workspace__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(498523);
/* harmony import */ var _skills_loader__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(462959);
/* harmony import */ var _mcp_loader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(163433);
/* harmony import */ var _harness_profile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(957107);
/* harmony import */ var _provider_key_pool__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(858701);
/* harmony import */ var _provider_fast_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(286155);
/* harmony import */ var _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(592901);
/* harmony import */ var _tools_chat_registry__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(26385);
/* harmony import */ var _tools_ask_user__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(319796);
/* harmony import */ var _tools_ui_action__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(727532);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(376389);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_5__, deepagents__WEBPACK_IMPORTED_MODULE_6__, langchain__WEBPACK_IMPORTED_MODULE_7__, _langchain_quickjs__WEBPACK_IMPORTED_MODULE_8__, _approvals_service__WEBPACK_IMPORTED_MODULE_9__, _deep_agent_tools__WEBPACK_IMPORTED_MODULE_10__, _memory_context__WEBPACK_IMPORTED_MODULE_11__, _memory_service__WEBPACK_IMPORTED_MODULE_12__, _threads_title__WEBPACK_IMPORTED_MODULE_13__, _mcp_loader__WEBPACK_IMPORTED_MODULE_15__, _harness_profile__WEBPACK_IMPORTED_MODULE_16__, _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_18__, _tools_chat_registry__WEBPACK_IMPORTED_MODULE_19__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_5__, deepagents__WEBPACK_IMPORTED_MODULE_6__, langchain__WEBPACK_IMPORTED_MODULE_7__, _langchain_quickjs__WEBPACK_IMPORTED_MODULE_8__, _approvals_service__WEBPACK_IMPORTED_MODULE_9__, _deep_agent_tools__WEBPACK_IMPORTED_MODULE_10__, _memory_context__WEBPACK_IMPORTED_MODULE_11__, _memory_service__WEBPACK_IMPORTED_MODULE_12__, _threads_title__WEBPACK_IMPORTED_MODULE_13__, _mcp_loader__WEBPACK_IMPORTED_MODULE_15__, _harness_profile__WEBPACK_IMPORTED_MODULE_16__, _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_18__, _tools_chat_registry__WEBPACK_IMPORTED_MODULE_19__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Runtime for the MedQ deep-agent assistant.
 *
 * This module assembles the model, registers multimodal tools, and exposes
 * the event stream used by the chat API to emit status, tool, and final text
 * updates as the agent works through a medical task.
 */ 






// Deep-agent framework entrypoints used to assemble the multi-step medical assistant.

// Fault-tolerance, task-planning and interpreter middleware (docs parity —
// the JS docs' middleware catalog ships inside the `langchain` package and
// `@langchain/quickjs`; both are peer-compatible with deepagents 1.13.4).














// Provider/model resolution used to honor user-selected models and runtime config.






/** Starter template for the user's AGENTS.md persistent-instruction file
 * (docs' memory pattern). Seeded once per workspace; afterwards the learner
 * owns the file — the agent edits it on request, never re-seeds. */ const AGENTS_MD_TEMPLATE = `# AGENTS.md — my persistent instructions

Everything in this file is loaded into the AI assistant's instructions at the
start of every conversation. Keep it short and specific.

## About me
- I'm a medical learner preparing for: —

## How to help me
- Explain the reasoning step by step before giving the answer
- Show the calculation whenever you do dose or unit math

## Preferences
- Language: English
- Use metric units (mg, mL, kg)

> Tip: ask the assistant in chat to update this file — e.g. "remember that I
> prefer flashcards over long summaries" — and it will edit AGENTS.md for you.
`;
const AGENT_LOG_COLORS = {
    info: '\x1b[36m',
    tool: '\x1b[35m',
    success: '\x1b[32m',
    error: '\x1b[31m'
};
function logAgentEvent(tone, message) {
    const colorEnabled = process.env.NO_COLOR === undefined && process.env.FORCE_COLOR !== '0' && (process.stdout.isTTY || process.env.FORCE_COLOR === '1');
    const prefix = colorEnabled ? `${AGENT_LOG_COLORS[tone]}[MedQ Agent]\x1b[0m` : '[MedQ Agent]';
    const log = tone === 'error' ? console.error : console.info;
    log(`${prefix} ${message}`);
}
/**
 * Build a fallback provider config from the managed Z.AI deployment config
 * (`.z-ai-config` — project / home / /etc, same discovery the
 * z-ai-web-dev-sdk uses). Returns null when Z.AI is not configured, in which
 * case no fallback happens and the primary error propagates as before.
 *
 * Verified working (2026-10-08): while the shared ollama gateway was in a
 * sustained 429 storm, this endpoint answered normal LangChain invoke /
 * stream / tool-call round-trips.
 *
 * Exported for question-deep-agent.ts, whose generation runs use the same
 * two-attempt fallback pattern as the chat stream below.
 */ /** Z.AI gateway session headers (the gateway requires X-Token, not just
 * Bearer — see src/lib/zai.ts). Shared by the fallback config and direct
 * zai-resolved model picks. */ function zaiGatewayHeaders(zai) {
    const headers = {
        'X-Z-AI-From': 'Z'
    };
    if (zai.token) headers['X-Token'] = zai.token;
    if (zai.chatId) headers['X-Chat-Id'] = zai.chatId;
    if (zai.userId) headers['X-User-Id'] = zai.userId;
    return headers;
}
function zaiFallbackConfig() {
    try {
        const zai = (0,_zai__WEBPACK_IMPORTED_MODULE_22__.readConfig)();
        if (!zai?.apiKey || !zai.baseUrl) return null;
        const model = process.env.ZAI_FALLBACK_MODEL || 'glm-4.5';
        return {
            baseUrl: zai.baseUrl,
            apiKey: zai.apiKey,
            model,
            defaultHeaders: zaiGatewayHeaders(zai),
            label: `zai:${model}`
        };
    } catch  {
        return null;
    }
}
/**
 * Provider-side overload/transient errors worth a fallback retry: rate
 * limits (429 / "too many requests" — the shared gateway wraps these in a
 * 500), other 5xx statuses, and network-level failures. Anything else
 * (validation, auth, code bugs) propagates unchanged.
 *
 * Exported for question-deep-agent.ts (generation-run fallback wrapper).
 */ function isProviderOverloadError(error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (/\b429\b|too many requests|rate.?limit/i.test(msg)) return true;
    if (/\b(?:500|502|503|504)\b/.test(msg) && /status|http/i.test(msg)) return true;
    return /ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|network|timeout|timed out/i.test(msg);
}
/**
 * The full set of multimodal tools exposed to the MedQ agent.
 *
 * The runtime intentionally exposes a narrow but useful set of capabilities:
 * search evidence, generate images, inspect visuals, and synthesize audio.
 * This keeps the agent grounded and avoids sprawl of unrelated tool actions.
 */ const multimodalTools = (0,_deep_agent_tools__WEBPACK_IMPORTED_MODULE_10__/* .createMultimodalTools */ .Me)(resolveMedQAgentConfig);
/**
 * Question-authoring subagent.
 *
 * This delegated assistant is specialized for medical exam generation. It decides
 * whether an image, audio, or other media is required and emits structured JSON
 * rather than freeform prose.
 */ const multimodalQuestionAuthor = {
    name: 'multimodal-question-author',
    description: 'Creates exam-ready medical questions and identifies when an image, audio clip, video, or other media is required to answer them.',
    systemPrompt: [
        'You are the Multimodal Question Author for MedQ.',
        'Create medically accurate exam questions from the delegated request.',
        'A question must not depend on a modality that is absent. For auscultation, heart sounds, lung sounds, speech, or other audible findings, require audio. For anatomy, pathology, imaging, ECG, microscopy, or physical findings, require an image when the learner must inspect it.',
        'Return ONLY a JSON array. Each object must include: type, text, options, answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags, and mediaRequirements.',
        'mediaRequirements must be an array of objects with type (image|audio|video), required (boolean), purpose, and prompt. Use an empty array when no media is needed.',
        'Never invent imageUrl, audioUrl, or videoUrl values. Those fields must be omitted until a media generator supplies a real asset.',
        'You may use search_medical_references for current evidence, generate_medical_illustration when an image is required, generate_medical_audio for auscultation, narration, or spoken teaching, and analyze_visual_material when an uploaded image or visual reference must be interpreted before writing the question.',
        'Do not use image generation as a substitute for audio, video, ECG tracing, or an uploaded clinical recording.'
    ].join('\n'),
    tools: multimodalTools
};
/** Parse a search_knowledge tool result JSON into structured citations,
 * including the per-ref passage excerpts extracted from the context block. */ function parseKnowledgeCitations(rawToolOutput) {
    try {
        const parsed = JSON.parse(rawToolOutput);
        if (!Array.isArray(parsed.citations)) return undefined;
        const excerptByRef = new Map();
        if (typeof parsed.context === 'string') {
            for (const block of parsed.context.split(/\n(?=\[K\d+\])/)){
                const m = /^\[K(\d+)\]/.exec(block.trim());
                if (m) {
                    const body = block.trim().replace(/^\[K\d+\][^\n]*\n?/, '').trim();
                    if (body) excerptByRef.set(`K${m[1]}`, body.slice(0, 400));
                }
            }
        }
        const citations = [];
        for (const c of parsed.citations){
            if (!c || typeof c.ref !== 'string') continue;
            citations.push({
                ref: c.ref,
                title: typeof c.title === 'string' ? c.title : '',
                sourceId: typeof c.sourceId === 'string' ? c.sourceId : undefined,
                relevance: typeof c.relevance === 'number' ? c.relevance : undefined,
                excerpt: excerptByRef.get(c.ref)
            });
        }
        return citations.length > 0 ? citations : undefined;
    } catch  {
        return undefined;
    }
}
/**
 * Parse a search_medical_references tool result JSON into structured web
 * citations ([S#]) — mirrors parseKnowledgeCitations so the chat client can
 * render [S1]/[S2] markers as clickable source chips plus a web-sources card
 * instead of the model dumping raw URLs into the answer text.
 */ function parseWebCitations(rawToolOutput) {
    try {
        const parsed = JSON.parse(rawToolOutput);
        if (!Array.isArray(parsed.results)) return undefined;
        const citations = [];
        for(let i = 0; i < parsed.results.length; i += 1){
            const r = parsed.results[i];
            if (!r || typeof r.url !== 'string' || !/^https?:\/\//i.test(r.url)) continue;
            citations.push({
                ref: `S${i + 1}`,
                title: typeof r.title === 'string' && r.title ? r.title : r.url,
                url: r.url,
                snippet: typeof r.snippet === 'string' ? r.snippet.slice(0, 400) : undefined,
                host: typeof r.host === 'string' ? r.host : undefined,
                date: typeof r.date === 'string' ? r.date : undefined
            });
        }
        return citations.length > 0 ? citations : undefined;
    } catch  {
        return undefined;
    }
}
/**
 * Resolve configuration for the MedQ agent backend.
 *
 * This function reads environment variables and normalizes them into a single
 * provider configuration so the runtime can support OpenAI, Ollama, and other
 * provider-prefixed model strings without changing the rest of the code.
 */ function resolveMedQAgentConfig() {
    const rawDefaultModel = process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || process.env.DEFAULT_MODEL || 'gpt-4o-mini';
    const defaultModel = rawDefaultModel.includes(':') ? rawDefaultModel.split(':').slice(1).join(':') : rawDefaultModel;
    const providerPrefix = rawDefaultModel.includes(':') ? rawDefaultModel.split(':')[0] : 'openai';
    let baseUrl = process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || process.env.OLLAMA_BASE_URL || 'https://api.openai.com/v1';
    let apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
    let model = process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || defaultModel;
    if (!apiKey && providerPrefix === 'ollama') {
        apiKey = 'ollama';
        baseUrl = process.env.MEDQ_AGENT_BASE_URL || process.env.OLLAMA_BASE_URL || baseUrl;
    }
    if (!apiKey && process.env.DEFAULT_MODEL && process.env.DEFAULT_MODEL.startsWith('ollama:')) {
        apiKey = 'ollama';
        baseUrl = process.env.OLLAMA_BASE_URL || baseUrl;
        model = process.env.DEFAULT_MODEL.split(':').slice(1).join(':') || model;
    }
    if (providerPrefix === 'ollama' && !/\/v1$/i.test(baseUrl)) {
        baseUrl = `${baseUrl.replace(/\/$/, '')}/v1`;
    }
    return {
        baseUrl: baseUrl.replace(/\/$/, ''),
        apiKey,
        model
    };
}
function providerConfig() {
    return resolveMedQAgentConfig();
}
/**
 * Default provider chain for the Deep Agent when the caller didn't pick a
 * concrete model (ModelPicker "Auto", scheduled runs, agents v0 callers):
 *
 *   1. MEDQ_AGENT_* / OPENAI_* env chain — the deployment's primary, e.g. the
 *      FreeLLM router (MEDQ_AGENT_BASE_URL=http://127.0.0.1:3000/v1 + the
 *      unified key + MEDQ_AGENT_MODEL=zai-llm)
 *   2. Managed Z.AI service (.z-ai-config — project / home / /etc), with the
 *      gateway's session headers attached
 *
 * Mirrors resolveAgentChatConfig (agent/config.ts), which already treats
 * "auto" as "no selection".
 */ function defaultDeepAgentProviderConfig() {
    const envConfig = providerConfig();
    if (envConfig.apiKey) return envConfig;
    const zai = zaiFallbackConfig();
    if (zai) {
        return {
            baseUrl: zai.baseUrl,
            apiKey: zai.apiKey,
            model: zai.model,
            defaultHeaders: zai.defaultHeaders
        };
    }
    return envConfig; // keyless → createMedQDeepAgent throws the actionable error
}
// ---------------------------------------------------------------------------
// save_question — bridge to the Generate tab's deep-agent capability
// ---------------------------------------------------------------------------
//
// The floating assistant (chat v2) could already AUTHOR questions through the
// multimodal-question-author subagent, but the result only lived in the chat
// transcript — nothing reached the question bank. This tool gives the CHAT
// agent the same write capability the Generate tab agent has
// (question-deep-agent.ts): every question the user asks to "add to my bank"
// is validated and persisted with the same field mapping, tagged 'chat-agent'.
const CHAT_DIFFICULTY_LEVELS = [
    'Easy',
    'Basic',
    'Medium',
    'Moderate',
    'Hard',
    'Expert'
];
const CHAT_MAX_SAVES_PER_TURN = 8;
function createChatSaveQuestionTool(userId, saved, maxSaves = CHAT_MAX_SAVES_PER_TURN) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__/* .DynamicStructuredTool */ .XW({
        name: 'save_question',
        description: [
            'Save ONE complete, finished exam question to the user\'s MedQ question bank.',
            'SECONDARY PATH: use this only when the user asks to save a question that was ALREADY written out in this conversation.',
            'For generating NEW questions and adding them to the bank, use run_question_generation_agent instead — it is the complete pipeline.',
            'A question only counts as "added to the bank" once this tool returns saved:true — never claim it was added otherwise.',
            'For MCQ questions provide 4-5 options and set answer to the full text of the correct option.'
        ].join(' '),
        schema: zod__WEBPACK_IMPORTED_MODULE_23__/* .object */ .Ikc({
            type: zod__WEBPACK_IMPORTED_MODULE_23__/* ["enum"] */ .k5n([
                'mcq',
                'tf',
                'short'
            ]).describe('Question type'),
            text: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().min(20).describe('The clinical vignette / question stem'),
            options: zod__WEBPACK_IMPORTED_MODULE_23__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP()).default([]).describe('Answer options (MCQ only)'),
            answer: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().min(1).describe('The correct answer (full option text for MCQ)'),
            explanation: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().min(30).describe('Why the answer is correct and why distractors fail'),
            mnemonic: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Optional memory aid'),
            clinicalPearl: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Optional high-yield clinical pearl'),
            distractorAnalysis: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Optional per-distractor analysis'),
            difficulty: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('Medium'),
            system: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('General').describe('Medical system (e.g. Cardiovascular, Endocrine)'),
            topic: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Specific topic of the question'),
            tags: zod__WEBPACK_IMPORTED_MODULE_23__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP()).default([]),
            imageUrl: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Media URL returned by your media tools ONLY — never invented'),
            audioUrl: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Media URL returned by your media tools ONLY — never invented'),
            illustrationDescription: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('')
        }),
        func: async (q)=>{
            if (saved.length >= maxSaves) {
                return JSON.stringify({
                    saved: false,
                    reason: `Save limit for this turn reached (${maxSaves}). Summarize what you saved so far.`
                });
            }
            const type = [
                'mcq',
                'tf',
                'short'
            ].includes(q.type) ? q.type : 'mcq';
            const options = Array.isArray(q.options) ? q.options.map((o)=>String(o).slice(0, 400)).filter(Boolean) : [];
            if (type === 'mcq' && options.length < 2) {
                return JSON.stringify({
                    saved: false,
                    reason: 'MCQ questions need at least 2 options. Fix and re-save.'
                });
            }
            if (type === 'mcq' && !options.includes(q.answer)) {
                return JSON.stringify({
                    saved: false,
                    reason: 'The answer must be the full text of one of the options. Fix and re-save.'
                });
            }
            const difficulty = CHAT_DIFFICULTY_LEVELS.includes(q.difficulty) ? q.difficulty : 'Medium';
            const tags = [
                q.topic || '',
                q.system || 'General',
                'chat-agent',
                ...Array.isArray(q.tags) ? q.tags.map((t)=>String(t).slice(0, 60)) : []
            ].filter(Boolean).slice(0, 8);
            try {
                const record = await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.question.create({
                    data: {
                        type,
                        text: String(q.text).slice(0, 6000),
                        options: JSON.stringify(options.slice(0, 8)),
                        answer: String(q.answer).slice(0, 800),
                        explanation: String(q.explanation).slice(0, 6000),
                        mnemonic: String(q.mnemonic || '').slice(0, 1000),
                        clinicalPearl: String(q.clinicalPearl || '').slice(0, 1000),
                        distractorAnalysis: String(q.distractorAnalysis || '').slice(0, 4000),
                        difficulty,
                        system: String(q.system || 'General').slice(0, 120),
                        topic: String(q.topic || '').slice(0, 200),
                        tags: JSON.stringify(tags),
                        isAIGenerated: true,
                        imageUrl: (q.imageUrl || '').slice(0, 1000),
                        audioUrl: (q.audioUrl || '').slice(0, 1000),
                        illustrationDescription: String(q.illustrationDescription || '').slice(0, 1000),
                        reviewStatus: 'pending',
                        reviewNotes: ''
                    }
                });
                saved.push({
                    ...record,
                    options,
                    tags,
                    savedBy: 'chat-agent'
                });
                return JSON.stringify({
                    saved: true,
                    id: record.id,
                    index: saved.length,
                    message: `Question ${saved.length} saved to the question bank (id ${record.id}, pending review). Continue with the next question or summarize.`
                });
            } catch (err) {
                return JSON.stringify({
                    saved: false,
                    reason: err instanceof Error ? err.message : 'database write failed'
                });
            }
        }
    });
}
// ---------------------------------------------------------------------------
// run_question_generation_agent — the COMPLETE generation agent as a tool
// ---------------------------------------------------------------------------
//
// This is the bridge the floating assistant uses to run the Generate tab's
// ENTIRE deep agent (question-deep-agent.ts): the sub-agent plans its own
// todos, retrieves grounding passages from the user's knowledge library,
// delegates authoring to the question-author subagent, generates media when a
// question needs it, and saves every finished question itself. While it runs,
// every inner event is forwarded through `onEvent` so the chat stream can push
// it to the browser live (plan, tool calls, subagent transitions, saves).
function createQuestionGenerationAgentTool(userId, onEvent, modelString, signal, /** When the OUTER chat agent is already running on the Z.AI fallback, the
   *  embedded generation agent should use it too — otherwise the inner run
   *  hammers the same storming primary the outer attempt just escaped. */ providerOverride) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__/* .DynamicStructuredTool */ .XW({
        name: 'run_question_generation_agent',
        description: [
            'Launch the COMPLETE MedQ question-generation deep agent — the exact engine behind the Generate tab.',
            'The sub-agent plans its own todo list, retrieves grounding passages from the user\'s knowledge library, delegates authoring to a specialized question-author subagent, generates images/audio when a question requires media, and SAVES every finished question to the user\'s question bank (as pending review).',
            'Use this for ANY request to generate AND add/create/save questions to the bank, even for a single question. Do not author or save those questions through any other path.',
            'Its live activity (plan, tool calls, saves) is streamed to the user automatically — you do not need to narrate each internal step.',
            'After it returns, briefly summarize what was saved (count, topics, difficulty) and note the questions are pending review in the bank.'
        ].join(' '),
        schema: zod__WEBPACK_IMPORTED_MODULE_23__/* .object */ .Ikc({
            topic: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().min(3).describe('The medical topic for the questions'),
            system: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('General').describe('Medical system, e.g. Cardiovascular, Endocrine, Pharmacology'),
            types: zod__WEBPACK_IMPORTED_MODULE_23__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_23__/* ["enum"] */ .k5n([
                'mcq',
                'tf',
                'short'
            ])).min(1).default([
                'mcq'
            ]).describe('Question types to generate'),
            difficulties: zod__WEBPACK_IMPORTED_MODULE_23__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP()).min(1).default([
                'Medium'
            ]).describe('Difficulties such as Easy, Medium, Hard'),
            count: zod__WEBPACK_IMPORTED_MODULE_23__/* .number */ .aig().int().min(1).max(8).describe('How many questions to generate (max 8 per run)'),
            focusHint: zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP().default('').describe('Optional extra guidance for the generator, e.g. target the learner\'s weak areas, or repeat the user\'s media request such as "include an image with every question"'),
            weakTopics: zod__WEBPACK_IMPORTED_MODULE_23__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_23__/* .string */ .YjP()).max(8).optional().describe('The learner\'s measured weak areas to target (e.g. from the injected weak-topics context or their quiz analytics), e.g. ["Diabetic ketoacidosis (Endocrine)", "Antiarrhythmics (Pharmacology)"]. Pass these through whenever the request references weak topics so the author drills the right areas.'),
            useKnowledgeBase: zod__WEBPACK_IMPORTED_MODULE_23__/* .boolean */ .zMY().default(true).describe('Ground the questions in the user\'s own knowledge library (lecture notes, PDFs) when sources exist')
        }),
        func: async (p)=>{
            // Ownership filter: only the caller's own knowledge sources (RAG grounding).
            let knowledgeSourceIds = [];
            if (p.useKnowledgeBase) {
                try {
                    const sources = await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.knowledgeSource.findMany({
                        where: {
                            userId
                        },
                        select: {
                            id: true
                        }
                    });
                    knowledgeSourceIds = sources.map((s)=>s.id).slice(0, 20);
                } catch  {}
            }
            const saved = [];
            let runError = null;
            try {
                // Dynamic import: avoids a module-init cycle with question-deep-agent
                // (that module imports resolveMedQAgentConfig from this file).
                // WithFallback adds the primary→Z.AI backup retry for storms.
                const { runDeepAgentQuestionGenerationWithFallback } = await Promise.all(/* import() */[__webpack_require__.e(6899), __webpack_require__.e(1518)]).then(__webpack_require__.bind(__webpack_require__, 301518));
                for await (const event of runDeepAgentQuestionGenerationWithFallback({
                    topic: p.topic,
                    system: p.system || 'General',
                    types: p.types,
                    difficulties: p.difficulties,
                    count: p.count,
                    focusHint: p.focusHint || undefined,
                    weakTopics: p.weakTopics?.length ? p.weakTopics : undefined,
                    knowledgeSourceIds,
                    modelString,
                    userId,
                    signal,
                    providerOverride
                })){
                    onEvent?.(event);
                    if (event.type === 'saved') saved.push(event.question);
                    if (event.type === 'error') runError = event.error;
                    // Stop consuming the moment the client aborts — the pipeline's own
                    // signal checkpoints stop the agent at its next step.
                    if (signal?.aborted) break;
                }
            } catch (err) {
                runError = err instanceof Error ? err.message : String(err);
            }
            if (signal?.aborted && runError === null) runError = 'cancelled by the user';
            return JSON.stringify({
                ok: runError === null,
                savedCount: saved.length,
                requestedCount: p.count,
                error: runError ?? undefined,
                questions: saved.map((q, i)=>({
                        index: i + 1,
                        id: String(q.id ?? ''),
                        type: String(q.type ?? 'mcq'),
                        system: String(q.system ?? ''),
                        topic: String(q.topic ?? ''),
                        difficulty: String(q.difficulty ?? ''),
                        preview: String(q.text ?? '').slice(0, 140)
                    })),
                note: runError ? runError.includes('cancel') ? 'The run was cancelled by the user — acknowledge the cancellation and mention how many questions (if any) were already saved.' : 'The generation agent reported an error — apologize and suggest retrying. Never fabricate saved questions.' : saved.length < p.count ? `Only ${saved.length} of ${p.count} questions were saved — tell the user honestly and suggest retrying for the remaining ones.` : 'Summarize what was saved (count + topics + difficulty) and remind the user the new questions are pending review in the question bank.'
            });
        }
    });
}
// ---------------------------------------------------------------------------
// Async event queue + merged stream iterator
// ---------------------------------------------------------------------------
//
// LangGraph's agent.stream() does NOT yield items while a tool executes. A
// plain for-await would therefore starve the chat SSE stream for the entire
// (multi-minute) generation run. The generation tool pushes inner events into
// this queue; mergeAgentStreamWithGenerationEvents() races the agent stream
// against the queue so inner events reach the client the moment they happen.
class AsyncEventQueue {
    push(item) {
        if (this.closed) return;
        this.items.push(item);
        this.pump();
    }
    close() {
        this.closed = true;
        this.pump();
        for (const waiter of this.waiters.splice(0))waiter.resolve(undefined);
    }
    /** Deliver buffered items to the OLDEST NON-CANCELLED waiter. A cancelled
   *  waiter can never receive an item — this is what makes zombie consumers
   *  (see cancel) unable to steal events from the live consumer. */ pump() {
        while(this.items.length > 0){
            const idx = this.waiters.findIndex((w)=>!w.cancelled);
            if (idx < 0) return;
            const [waiter] = this.waiters.splice(idx, 1);
            waiter.resolve(this.items.shift());
        }
    }
    /** Next buffered item, or undefined once the queue is closed and drained. */ next() {
        if (this.items.length > 0) return Promise.resolve(this.items.shift());
        if (this.closed) return Promise.resolve(undefined);
        const record = {
            resolve: undefined,
            cancelled: false
        };
        const promise = new Promise((resolve)=>{
            record.resolve = resolve;
        });
        this.waiters.push(record);
        this.waiterByPromise.set(promise, record);
        return promise;
    }
    /** Cancel a pending next() call. Its promise resolves with undefined and
   *  its waiter is retired — it can never consume an item afterwards.
   *
   *  ZOMBIE-CONSUMER FIX (2026-10-24): the Z.AI provider fallback abandons
   *  the first attempt's merged iterator mid-await; its outstanding next()
   *  promise used to stay registered as a queue waiter and would STEAL
   *  exactly one event (observed live: the approval_required frame vanished
   *  this way whenever a 429 forced the fallback). The abandoned merge's
   *  finally block now cancels its pending waits, so only the live attempt
   *  consumes. No-op for already-settled promises. */ cancel(promise) {
        if (!promise) return;
        const record = this.waiterByPromise.get(promise);
        if (!record) return; // already settled & cleaned up
        record.cancelled = true;
        const idx = this.waiters.indexOf(record);
        if (idx >= 0) {
            this.waiters.splice(idx, 1);
            record.resolve(undefined);
        }
        this.waiterByPromise.delete(promise);
    }
    constructor(){
        this.items = [];
        this.waiters = [];
        this.closed = false;
        this.waiterByPromise = new Map();
    }
}
/**
 * Yields agent stream items and generation-queue events in true arrival order.
 *
 * The losing promise of each Promise.race is kept and reused on the next loop
 * iteration, so no items are lost or duplicated when both sources are active.
 * The queue is closed as soon as the agent stream finishes; any events still
 * buffered are drained before the iterator completes.
 *
 * An optional AbortSignal participates in the same race: the moment the client
 * disconnects, the iterator returns immediately instead of continuing to
 * consume a stream nobody is reading (which would keep the whole agent graph,
 * its tools, and the LLM gateway busy for minutes after a cancel).
 */ async function* mergeAgentStreamWithGenerationEvents(agentStream, generationEvents, signal, approvalEvents) {
    const iterator = agentStream[Symbol.asyncIterator]();
    let pendingAgent = null;
    let pendingEvent = null;
    let pendingApproval = null;
    let agentDone = false;
    let eventsDone = false;
    let approvalsDone = false;
    // Resolves once the signal fires (already-fired signals resolve immediately).
    const abortPromise = signal ? new Promise((resolve)=>{
        if (signal.aborted) resolve('aborted');
        else signal.addEventListener('abort', ()=>resolve('aborted'), {
            once: true
        });
    }) : null;
    try {
        for(;;){
            if (agentDone && eventsDone && approvalsDone) return;
            if (!agentDone && pendingAgent === null) pendingAgent = iterator.next();
            if (!eventsDone && pendingEvent === null) pendingEvent = generationEvents.next();
            if (!approvalsDone && approvalEvents && pendingApproval === null) pendingApproval = approvalEvents.next();
            const racers = [];
            if (pendingAgent !== null) {
                racers.push(pendingAgent.then((result)=>({
                        source: 'agent',
                        result
                    })));
            }
            if (pendingEvent !== null) {
                racers.push(pendingEvent.then((result)=>({
                        source: 'event',
                        result
                    })));
            }
            if (pendingApproval !== null) {
                racers.push(pendingApproval.then((result)=>({
                        source: 'approval',
                        result
                    })));
            }
            if (abortPromise !== null) {
                racers.push(abortPromise.then(()=>({
                        source: 'abort'
                    })));
            }
            if (racers.length === 0) return;
            const winner = await Promise.race(racers);
            if (winner.source === 'abort') {
                // Client is gone: stop streaming immediately. The generation tool holds
                // the same signal and stops the inner agent at its next checkpoint.
                generationEvents.close();
                approvalEvents?.close();
                return;
            }
            if (winner.source === 'agent') {
                pendingAgent = null;
                if (winner.result.done) {
                    agentDone = true;
                    generationEvents.close(); // drain whatever is left, then finish
                    approvalEvents?.close();
                    continue;
                }
                const [mode, payload] = winner.result.value;
                yield {
                    kind: 'agent',
                    mode,
                    payload
                };
            } else if (winner.source === 'approval') {
                pendingApproval = null;
                if (winner.result === undefined) {
                    approvalsDone = true;
                    continue;
                }
                logAgentEvent('info', `[APPROVAL-BUS] merge yielding ${winner.result.type === 'clarification_required' ? `clarification ${winner.result.clarification?.clarificationId?.slice(0, 10)}` : `approval ${winner.result.approval?.approvalId?.slice(0, 8)}`}`);
                yield {
                    kind: 'approval',
                    event: winner.result
                };
            } else {
                pendingEvent = null;
                if (winner.result === undefined) {
                    eventsDone = true;
                    continue;
                }
                yield {
                    kind: 'generation',
                    event: winner.result
                };
            }
        }
    } finally{
        // ZOMBIE-CONSUMER FIX (2026-10-24): this iterator is exiting — normally,
        // through an error (the Z.AI fallback abandons attempt 1 mid-await), or
        // via for-await return() when the consumer's own body throws. Whatever
        // the exit path, retire our outstanding queue waits so the NEXT merged
        // iterator is the sole consumer. Without this, the abandoned attempt's
        // pending next() promises stayed registered as queue waiters and each
        // stole exactly one queued event — observed live as approval_required
        // frames vanishing whenever a 429 forced the provider fallback.
        // cancel() is a no-op for settled promises, so normal exits are safe.
        generationEvents.cancel(pendingEvent);
        approvalEvents?.cancel(pendingApproval);
        // Close the underlying agent-stream iterator too: when this merged
        // iterator is abandoned EARLY (the ask_user hard stop below, the provider
        // fallback abandonment, a consumer throw), the LangGraph stream would
        // otherwise stay open with a pending next() parked at its next yield —
        // its in-flight model request and graph task linger until GC. return()
        // is a no-op on the normal-completion path (iterator already done).
        try {
            void iterator.return?.();
        } catch  {}
    }
}
/**
 * Build the deep-agent instance for one conversation turn.
 *
 * The caller may override the model, user, or thread context here, but the core
 * behavior remains the same: attach a medical system prompt, add the subagent,
 * and register the multimodal tools used during the session.
 */ async function createMedQDeepAgent(options = {}) {
    // "auto" (or a blank string) means "no selection" — the ModelPicker's Auto
    // option and resolveAgentChatConfig use the same contract. It must NOT be
    // forwarded to resolveModel: parseModelString("auto") maps it to the zai
    // provider with model id "auto", which resolves keyless on deployments
    // without a managed Z.AI config and surfaced as the cryptic "Configure
    // MEDQ_AGENT_API_KEY or OPENAI_API_KEY…" error.
    const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';
    const config = options.providerOverride ? options.providerOverride : requested && requested !== 'auto' ? await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_18__.resolveModel)({
        modelString: requested,
        userId: options.userId ?? undefined
    }).then((resolved)=>{
        if (resolved.apiKey) {
            // Z.AI's gateway authenticates with session headers, not just
            // Bearer — resolveModel's zai branch carries the key/URL but not
            // the headers, so attach them here.
            const zai = resolved.providerId === 'zai' ? (0,_zai__WEBPACK_IMPORTED_MODULE_22__.readConfig)() : null;
            return zai ? {
                ...resolved,
                defaultHeaders: zaiGatewayHeaders(zai)
            } : resolved;
        }
        // Picked model resolved keyless (unknown provider, no BYOK
        // endpoint) — degrade to the default chain instead of failing the
        // turn with an env-vars error that doesn't match the symptom.
        logAgentEvent('info', `Model "${requested}" resolved without an API key — using the default agent provider`);
        return defaultDeepAgentProviderConfig();
    }).catch((error)=>{
        logAgentEvent('info', `Model "${requested}" could not be resolved — using the default agent provider: ${error instanceof Error ? error.message : String(error)}`);
        return defaultDeepAgentProviderConfig();
    }) : defaultDeepAgentProviderConfig();
    if (!config.apiKey) {
        throw new Error('The MedQ agent has no LLM provider configured. Set MEDQ_AGENT_API_KEY ' + '(the FreeLLM unified key from the Keys page, together with MEDQ_AGENT_BASE_URL and MEDQ_AGENT_MODEL) ' + 'or OPENAI_API_KEY, or configure .z-ai-config (Z.AI), to use the Deep Agent backend.');
    }
    const defaultHeaders = 'defaultHeaders' in config && config.defaultHeaders ? config.defaultHeaders : undefined;
    // Built separately so TS keeps the ClientOptions shape (a conditional
    // spread widens defaultHeaders to {} and fails the overload).
    const modelConfiguration = {
        baseURL: config.baseUrl
    };
    if (defaultHeaders) modelConfiguration.defaultHeaders = defaultHeaders;
    const model = new _langchain_openai__WEBPACK_IMPORTED_MODULE_2__/* .ChatOpenAI */ .Db({
        apiKey: config.apiKey,
        model: 'modelId' in config ? config.modelId : config.model,
        temperature: 0.4,
        configuration: modelConfiguration,
        // The shared z.ai gateway intermittently 429-storms (returns 500 wrapping
        // "Too many requests"). The openai client retries 5xx/429 with exponential
        // backoff when maxRetries is raised — default 2 gives up too fast during
        // short storms, so brief outages self-heal instead of failing the chat.
        maxRetries: 4,
        // Request-level timeout (2026-10-25): a gateway that ACCEPTS the
        // connection but never answers used to park the turn forever — the
        // client's 3-minute no-data watchdog then aborted with "the AI provider
        // may be rate-limited or unreachable". Timing out the request surfaces
        // the error to the retry/fallback ladders instead (modelRetryMiddleware
        // → the Z.AI backup rung), so a hung call self-heals.
        timeout: 180000
    });
    const ctx = {
        userId: options.userId ?? options.threadId ?? 'guest',
        threadId: options.threadId
    };
    // ── Per-task model routing: the FAST model ──
    // Routine auxiliary workloads (utility subagents, thread titles, chat
    // unread digests) run on a cheaper/faster model than the main reasoning
    // loop. Shared builder in provider/fast-model.ts keeps the routing rules in
    // one place — including the BYOK safety rule: when the user hand-picks a
    // model on a provider that is not the operator gateway and no explicit
    // fast endpoint/key is configured, the fast model is skipped and auxiliary
    // tasks inherit the picked model (nothing points glm-4.5-flash at a foreign
    // provider that does not serve it).
    const fastModel = (0,_provider_fast_model__WEBPACK_IMPORTED_MODULE_17__/* .buildFastModel */ .gi)(// A provider config without baseUrl (default endpoint) cannot be forwarded
    // as the fast model's primary — pass null so it falls back to the env chain.
    config.baseUrl ? {
        baseUrl: config.baseUrl,
        apiKey: config.apiKey,
        defaultHeaders
    } : null);
    // ── Complete generation agent (Generate-tab engine) as a chat tool ──
    // This is the primary question-creation path for the floating assistant:
    // the chat agent delegates the WHOLE job (planning, RAG, subagent authoring,
    // media, saving) to the generation deep agent and narrates the result.
    // The request signal flows into the tool so a client cancel stops the inner
    // agent instead of letting it grind the LLM gateway in the background.
    const generationAgentTool = options.userId ? createQuestionGenerationAgentTool(options.userId, options.onGenerationEvent, options.modelString, options.signal, // When the chat turn itself is already on the Z.AI fallback (attempt 2
    // in streamMedQDeepAgent), the embedded generation agent must use it
    // too — its own ChatOpenAI would otherwise hit the storming primary.
    options.providerOverride) : null;
    // ── save_question bridge (secondary: single saves of written-out questions) ──
    // Only signed-in users get the tool — guests cannot own bank entries.
    // `saved` is per-turn (createMedQDeepAgent is invoked once per chat turn),
    // so the cap and the tool's own feedback stay request-scoped.
    const chatSaved = [];
    const saveQuestionTool = options.userId ? createChatSaveQuestionTool(options.userId, chatSaved) : null;
    // ── MCP tools (DB-configured external servers) ──
    // Loads the user's enabled AgentMcpServer rows, connects and lists their
    // tools. Never throws — a broken server degrades to a log line + its DB
    // status flips to 'error'. Runs BEFORE the system prompt so the prompt can
    // tell the model which external tools exist this turn.
    (0,_harness_profile__WEBPACK_IMPORTED_MODULE_16__/* .ensureMedQHarnessProfile */ .H)(typeof config.model === 'string' ? config.model : undefined);
    let mcpTools = [];
    let mcpSummary = null;
    if (options.userId) {
        const mcp = await (0,_mcp_loader__WEBPACK_IMPORTED_MODULE_15__/* .buildMcpTools */ .KQ)(options.userId).catch(()=>({
                tools: [],
                summary: null,
                errors: []
            }));
        mcpTools = mcp.tools;
        mcpSummary = mcp.summary;
        for (const error of mcp.errors){
            logAgentEvent('error', `MCP: ${error}`);
        }
    }
    const systemPrompt = [
        'You are MedQ Agent, a rigorous medical education assistant.',
        'Give educational explanations, distinguish established facts from uncertainty, and remind users to check current clinical guidance when relevant.',
        'Use your todo list for multi-step requests and provide a concise final answer.',
        'Do not present your response as a diagnosis or individualized treatment plan.',
        'You have a PERSISTENT personal workspace with file tools (ls, read_file, write_file, edit_file, glob, grep). Files you write there survive across conversations — use them for study notes, drafts, working documents and any output the learner may want later instead of pasting long content into chat. Reference saved files by their path so the learner can ask you to read them back.',
        'Your enabled skills are listed in the skills catalog (progressive disclosure): read a skill\'s SKILL.md with load_skill only when the task matches it, then follow its workflow.',
        'For question generation, delegate the authoring work to the multimodal-question-author subagent with the task tool. Do not write those questions directly.',
        'For evidence work, delegate to the literature-researcher subagent with the task tool whenever the request needs a multi-source evidence sweep — "what do current guidelines say about X", "compare these treatments", "find recent evidence", literature summaries with citations. It returns a structured, cited findings digest you synthesize for the learner; keep its [S#] source markers intact in your answer.',
        'For study planning, delegate to the study-coach subagent with the task tool whenever the learner wants a study plan, a study schedule, or asks "what should I focus on?" — it measures their real quiz performance, pulls the exam blueprint, checks their flashcard backlog, and creates the visible task list. Review and present its plan; do not hand-build plans from guessed weaknesses yourself.',
        'For anything about the learner\'s Messages tab, delegate to the communicator subagent with the task tool: listing their chat rooms and unread counts, summarizing/digesting a flooded group chat (it extracts meetings, exam schedules and deadlines as structured events and can push-notify them), reading recent messages, sending messages or DMs, or creating groups. It resolves rooms, digests unread floods and drafts sends — the learner approves every outgoing message.',
        generationAgentTool ? 'You have the run_question_generation_agent tool: the COMPLETE question-generation deep agent (the same engine as the Generate tab) — it plans its own work, grounds itself in the user\'s knowledge library, delegates authoring to a question-author subagent, generates media when needed, and saves every question to the question bank as pending review. Whenever the user wants questions generated AND added to their bank, ALWAYS use this tool with the requested parameters (topic, system, types, difficulties, count) — never author or save those questions through another path. Its live activity is shown to the user automatically. When the user asks for images, illustrations, or other media with their questions, repeat that requirement verbatim in the focusHint parameter (e.g. focusHint: "the user requested an image with every question") so the generation agent actually produces the media. When the request (or the injected scheduled-task context) references the learner\'s weak topics, pass those areas through the weakTopics parameter as well so the author drills exactly the right material.' : 'Question generation is available, but saving to the question bank requires a signed-in account — mention this if the user asks to add questions to their bank.',
        saveQuestionTool && generationAgentTool ? 'Use save_question ONLY when the user explicitly asks to save a single question that was already written out in this conversation.' : '',
        'When generate_medical_illustration returns an image URL, ALWAYS embed that image in your final reply using markdown image syntax — ![short description](url) — so the learner sees the illustration rendered inline in the chat panel instead of a bare URL.',
        'Never paste raw tool output JSON into your reply. After a tool returns, summarize its outcome in plain prose (what was saved/found, counts, key facts) — the user already sees each tool call and result in the activity timeline.',
        // ── Anti-fabrication guard (2026-10-25) ──
        // Observed live: on long-context turns the model produced a full
        // "✅ Infographic Created Successfully!" report WITHOUT calling any tool,
        // fabricating deliverable paths — because earlier turns in the history
        // ended that way. State the rule as a hard invariant.
        'HARD RULE — no fabricated deliverables: NEVER state or imply that an image, file, flashcard, skill, artifact, document, or any other deliverable was created, saved, or generated unless you called the corresponding tool IN THIS TURN and it returned success. File paths, image URLs, and artifact links may ONLY come from actual tool results of this turn — never from memory of earlier turns and never invented. If you have not yet run the tool, either call it now or tell the learner what you are about to do — do not write the success report first. If a tool call fails or times out, say so honestly and offer to retry.',
        options.userId ? 'You have schedule_task and list_scheduled_tasks. Whenever the user wants recurring automation — "every Sunday at 9pm generate 20 MCQs on my weak topics", "daily pharmacology micro-quiz", "remind me before my exam" — create a schedule_task (5-field cron + IANA timezone; default the timezone to the user\'s if they mention local times) instead of doing the work once. For weak-topic phrasing, keep it verbatim in the prompt: the runner injects their real weakest topics at fire time. Completed runs notify the user automatically.' : '',
        options.userId ? 'You have search_knowledge: hybrid semantic+keyword retrieval with [K#] citations over the user\'s own knowledge library (uploaded PDFs, lecture notes, transcripts). When the user references material they uploaded or asks for answers grounded in their library, search it FIRST (before web search) and cite passages as [K1], [K2]. When they attach a document in chat, it is ingested automatically — tell them it\'s now part of their knowledge library.' : '',
        'When you call search_medical_references, cite each source inline as [S1], [S2]… markers right after the claim it supports. NEVER paste raw URLs into your reply text — the interface renders [S#] markers as clickable source chips and lists every URL in a Web sources card automatically. search_medical_references is for textual evidence (facts, guidelines, papers, atlases as reading material). When the user wants to SEE actual images — "search for heart images", "find me images/diagrams/photos/histology slides/radiographs of X", the Image search skill, or ANY request to find or show real pictures online — call search_medical_images instead (do not generate images for that). After it returns, ALWAYS embed the most relevant images (typically 2-4, best quality) in your final reply using markdown image syntax — ![short caption](imageUrl) — with the imageUrl values the tool returned (they are local copies that always render); name the source site under or next to each image, and never answer an image-finding request with a list of website links alone.',
        'You have search_medical_videos and analyze_video_material: when the user wants to FIND videos online ("find a video on lumbar puncture", "search for cardiac auscultation tutorial videos") call search_medical_videos — it returns ranked results with direct video URLs (plus thumbnails + source pages) which you cite as [V1], [V2]… inline. When the user SHARES a video (uploads one in chat, or pastes a direct mp4/mov URL) and asks about its content ("what is shown", "describe the steps", "what anatomical structure is being demonstrated"), call analyze_video_material with the URL or attachment:// reference — it returns a timestamped summary the agent can answer "what happens at 2:30?" style questions against. For longer uploaded recordings (>2 min) the tool falls back to frame-sampling (ffmpeg → evenly-spaced frames → per-frame VLM description). For best results, after analyzing a video, summarize its key teaching points in prose AND embed the most informative thumbnail if one was returned by search_medical_videos.',
        'You have create_word_document with RICH FORMATTING: in addition to ## headings, bullets, and numbered lists, you can use colored callout boxes for clinical emphasis and embedded images. The callout syntax (markdown blockquote + emoji prefix) renders as a colored, bordered, shaded box in the .docx: > ⚠️ Caution: <text> (red — contraindications, severe ADRs, do-not-do rules), > 💡 Pearl: <text> (green — high-yield exam pearls, mnemonics), > 📌 Note: <text> (blue — general clarifications, definitions), > 🎯 Key Point: <text> (purple — must-remember takeaways), > ⚡ Warning: <text> (orange — red-flag symptoms, emergency signs), > 📚 Reference: <text> (gray — citations, source attribution). Inline **bold** and *italic* are preserved (use bold for drug names / doses / key terms). Embed images from search_medical_images or generate_medical_illustration results using ![caption](imageUrl) — they download and embed in the .docx automatically. Use 1–3 callouts per page for emphasis (too many dilutes their impact), and ALWAYS include at least one image on topics where a visual aid clearly helps (anatomy, histology, radiology, procedures). For multi-source study guides, synthesize content from search_medical_references (text), search_medical_images (figures), search_medical_videos (procedural demonstrations), and the user\'s uploaded library (search_knowledge) into a single coherent document with proper attribution.',
        'When the user attaches MULTIPLE files in one message, treat them as one coherent study set: analyze them together and cross-reference (e.g. merge lecture notes + slides into a single unified guide), separating them only when the request clearly targets one specific file.',
        'You have ask_user: whenever you would ask the learner a clarifying question in plain text — STOP, do not write the question in prose. Call ask_user instead with ONE focused question and structured inputs (multiselect = checkboxes for pick-several, radio or select = pick-one with concrete options, text for free-form). The learner answers through an interactive form card and their answers arrive as the next message. After ask_user returns, END YOUR TURN immediately — no further tool calls, no answering for them, no re-asking in text. HARD RULE: any mid-conversation question to the learner (which topics, how many questions, what format, what difficulty, preferences, choices between options, missing parameters) goes through ask_user, never through plain-text replies. When the request is already clear, just proceed — do not quiz the learner unnecessarily.',
        'You have ui_action: you can OPERATE the app on the learner\'s screen. Use it whenever they ask you to open/show/go to something ("open the question bank", "show my flashcards", "take me to the exam simulator") or when navigating for them obviously helps right after you produced something (saved questions → navigate to the bank; created flashcards → navigate to flashcards). One call takes 1-6 action objects: {"type":"navigate","target":"bank"} (tab keys: home, bank, generate, flashcards, exams, messages, insights, create), {"type":"switch_tab","tabId":"..."}, {"type":"open_dialog","dialogId":"..."}, {"type":"autofill_form","formId":"...","values":{...}}, {"type":"click_button","selector":"..."}, {"type":"highlight_element","selector":"...","message":"why this matters"}, {"type":"scroll_to","selector":"..."}. The actions execute live on their screen and receipts appear under your message — describe in one short sentence what you opened/did, and never claim an action beyond what you dispatched. Do NOT use ui_action to read data (use your data tools) — it only drives the screen. The learner\'s current tab arrives in the message envelope as "Active MedQ tab".',
        options.userId ? 'You have create_flashcards and flashcard_review_status. Whenever the user wants flashcards — "make flashcards from this" lecture/summary/document, mnemonics as cards, vocab drilling — call create_flashcards with concise front/back pairs batched in ONE call (up to 30). Cards enter the SM-2 spaced-repetition queue and are due immediately on the Flashcards page. When the user asks about their review backlog or you are planning a study session, check flashcard_review_status first.' : '',
        options.userId ? 'You have analyze_my_weaknesses: the learner\'s REAL quiz performance (accuracy by topic and organ system, attempt counts). Call it before ANY personalized study plan or "what should I focus on?" answer, then offer targeted follow-ups: a micro-drill via run_question_generation_agent on their worst topics, or a recurring schedule_task (weekly weak-topic quiz). Never guess weaknesses from conversation when you can measure them.' : '',
        // ── Newly registered capabilities (audit sprint) ──
        'You have run_code: sandboxed computation for exact numeric answers (dose math, unit conversions, biostatistics). ALWAYS use it instead of mental arithmetic for any non-trivial medical calculation.',
        'You have browser_snapshot and browser_interact: a sandboxed browser for structural page exploration (what a site offers, its sections and resources). For reading one article, prefer fetch_medical_reference.',
        options.userId ? 'You have task_create / task_update / task_list: a persistent, learner-visible task list for multi-step study plans — create tasks for each milestone and keep their statuses current.' : '',
        options.userId ? 'You have start_background_task / check_background_task / update_background_task / cancel_background_task / list_background_tasks: background agent tasks that run detached from this conversation. Use them for long-running work (deep research, large generation batches) — start the task, tell the learner it runs in the background (they get a notification with the result), and check it with check_background_task when they ask for status.' : '',
        options.userId ? 'You have manage_skills: create, IMPROVE, or delete reusable skills in the learner\'s personal skill library. When the learner asks to save a workflow as a skill ("remember this approach"), CREATE it — the skill appears in your catalog on the next turn. SELF-IMPROVEMENT LOOP: whenever a skill you used showed gaps in this run — missing steps you had to figure out, wrong or hallucinated tool names, unclear output format, constraints you discovered the hard way (e.g. a read-only path, a needed approval, a length limit) — IMPROVE it: pass the skill name, a short findings note describing the gaps, and the FULL rewritten body with the lessons baked in. The previous version is snapshotted to restorable history and the improved version is what you load next time. Do this whenever the learner asks you to improve/refine/update a skill, and proactively OFFER it (then apply on confirmation) when a run needed corrections. Built-in skills cannot be modified — if one needs tailoring, create a personal variant with your enhancements (e.g. "canvas-design-v2").' : '',
        mcpSummary ? `You have MCP tools from the learner's connected servers (names start with mcp__). ${mcpSummary} Each call runs on an external system the learner connected — use them when the task matches their purpose.` : '',
        'You have get_exam_blueprint: approximate published content weights for USMLE Step 1/2CK/3 and NCLEX-RN/PN. For ANY exam study-plan request, call it (pass weeksAvailable when known) and allocate study weeks proportional to the exam weights, boosting the learner\'s measured weak areas further when analyze_my_weaknesses data is available. Remind the learner to verify the exact weights against the current official test plan (USMLE.org / NCSBN).',
        // ── Long-term memory recall ──
        // Rendered by streamMedQDeepAgent via buildMemoryContext(userId, message):
        // the most relevant saved memories for THIS upcoming message, injected so
        // the agent starts the turn already knowing what it learned about the user
        // (profile layer, study struggles, facts from past conversations) without
        // needing to call search_memory first.
        ...options.memoryContext ? [
            options.memoryContext
        ] : []
    ].filter(Boolean).join('\n');
    // ── Persistent per-user filesystem + skills (deepagents parity) ──
    // The agent's file tools (ls/read_file/write_file/edit_file/glob/grep) run
    // against the user's jailed workspace directory instead of the default
    // in-memory StateBackend — files written in one turn are readable in the
    // next, and across conversations. virtualMode jails every path inside the
    // root (traversal rejected by the backend itself, on top of the workspace
    // service's own NUL/lexical/symlink checks).
    // Enabled AgentSkill rows are synced into <workspace>/skills/<name>/SKILL.md
    // so the harness's skills middleware (progressive disclosure: catalog at
    // startup, load_skill on demand) picks them up.
    //
    // COMPOSITE ROUTING (docs parity): agent internals — the summarization
    // middleware's /conversation_history/ files — are routed to a SEPARATE
    // persistent directory OUTSIDE the user-facing jail, so the model's file
    // tools never list or mix them with the learner's own files. The framework
    // itself keeps writing them transparently through the same backend.
    const fsUserId = options.userId ?? 'guest';
    let workspaceBackend = null;
    // memoryMiddleware (docs' AGENTS.md pattern): built when the jailed
    // workspace backend is available; declared out here so the createDeepAgent
    // call below can append it to the middleware array.
    let memoryMiddleware = null;
    try {
        const workspaceDir = (0,_skills_workspace__WEBPACK_IMPORTED_MODULE_14__/* .ensureAgentWorkspace */ .P)(fsUserId);
        // AGENTS.md — the user's persistent instruction file. Seeded once so it
        // always exists (the docs' memory pattern: loaded into the system prompt
        // at startup, maintained by the agent via edit_file on request, visible
        // and deletable in the Files drawer like any other workspace file).
        const agentsMdPath = node_path__WEBPACK_IMPORTED_MODULE_4___default().join(workspaceDir, 'AGENTS.md');
        if (!node_fs__WEBPACK_IMPORTED_MODULE_3___default().existsSync(agentsMdPath)) {
            node_fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(agentsMdPath, AGENTS_MD_TEMPLATE, 'utf8');
        }
        const userBackend = new deepagents__WEBPACK_IMPORTED_MODULE_6__/* .FilesystemBackend */ .id({
            rootDir: workspaceDir,
            virtualMode: true
        });
        // File-backed long-term instructions (docs' `memory` param — wired via
        // the exact underlying createMemoryMiddleware API). Complements MedQ's
        // DB-backed episodic memory: AGENTS.md is USER-authored persistent
        // instructions, memoryContext recalls agent-extracted episodes.
        memoryMiddleware = (0,deepagents__WEBPACK_IMPORTED_MODULE_6__/* .createMemoryMiddleware */ .CT)({
            backend: userBackend,
            sources: [
                'AGENTS.md'
            ]
        });
        // Internal store: sibling dir of the jail (not reachable through the
        // user-facing root), still persistent across conversations.
        const internalDir = node_path__WEBPACK_IMPORTED_MODULE_4___default().join((0,_skills_workspace__WEBPACK_IMPORTED_MODULE_14__/* .agentWorkspaceRoot */ .R)(fsUserId), 'internal');
        node_fs__WEBPACK_IMPORTED_MODULE_3___default().mkdirSync(internalDir, {
            recursive: true
        });
        const internalBackend = new deepagents__WEBPACK_IMPORTED_MODULE_6__/* .FilesystemBackend */ .id({
            rootDir: internalDir,
            virtualMode: true
        });
        workspaceBackend = new deepagents__WEBPACK_IMPORTED_MODULE_6__/* .CompositeBackend */ .wD(userBackend, {
            '/conversation_history': internalBackend
        });
    } catch  {
        workspaceBackend = null; // fall back to the framework default in-memory backend
    }
    const skillsSync = await (0,_skills_loader__WEBPACK_IMPORTED_MODULE_24__/* .syncSkillsToWorkspace */ .k)(fsUserId).catch(()=>({
            skillsPath: null,
            count: 0
        }));
    // ── THE registry (single source of truth) ──
    // One builder assembles the chat agent's complete tool set AND wraps every
    // tool with the HITL gate + AgentToolExecution telemetry. Built BEFORE the
    // createDeepAgent call so the domain subagents below can share the exact
    // same gated/telemetry-wrapped instances (a subagent calling a gated tool
    // flows through the same approval card as the main agent).
    const chatTools = (0,_tools_chat_registry__WEBPACK_IMPORTED_MODULE_19__/* .buildChatAgentTools */ .r)({
        ctx,
        userId: options.userId ?? null,
        multimodalTools,
        abortSignal: options.signal,
        generationAgentTool,
        saveQuestionTool,
        mcpTools,
        fastModel,
        hitl: options.hitl
    });
    const pickChatTools = (...names)=>chatTools.filter((tool)=>names.includes(tool.name));
    // ── Domain subagents (docs' subagents pattern: narrow specialists with
    // their own prompts + tool subsets, dispatched via the task tool). Both
    // tool sets are read-mostly: search/fetch/analyze/blueprint/task-list —
    // side-effectful capabilities stay on the main agent's mediated path. ──
    /** Evidence specialist: multi-source web + knowledge-library sweeps with
   * citations. Runs on the PRIMARY model — synthesis quality is the product. */ const literatureResearcher = {
        name: 'literature-researcher',
        description: 'Gathers and cites current medical evidence from the web and the learner\'s knowledge library for a focused clinical question — evidence sweeps, guideline checks, treatment comparisons, literature summaries.',
        systemPrompt: [
            'You are the Literature Researcher for MedQ.',
            'Given ONE focused question, gather evidence from multiple sources: search_medical_references for current evidence and guidelines, fetch_medical_reference to read one known article in full, search_knowledge when the learner\'s own uploaded material is relevant, and search_medical_images only when a visual is specifically needed.',
            'Prefer 3-6 high-quality, recent sources; cross-check claims across at least two when they are consequential.',
            'Return a structured findings digest: (1) a 2-3 sentence bottom line, (2) key findings as bullets, each tagged with [S1], [S2]… source markers matching the search results, (3) source list with titles and URLs, (4) open questions or contradictions between sources when present.',
            'Never invent a source, statistic, or guideline recommendation. When evidence is thin or conflicting, say so explicitly.',
            'Do not answer beyond the delegated question and do not write files — return the digest as your final message.'
        ].join('\n'),
        tools: pickChatTools('search_medical_references', 'fetch_medical_reference', 'search_medical_images', 'search_knowledge')
    };
    /** Study-plan specialist: measures real performance and writes the visible
   * plan. Runs on the FAST model — routine synthesis where token cost
   * matters more than frontier reasoning (per-task model routing). */ const studyCoach = {
        name: 'study-coach',
        description: 'Builds a data-grounded study plan: measures the learner\'s real quiz performance, pulls the exam blueprint, checks their flashcard backlog, and creates the visible task list with priorities and milestones.',
        systemPrompt: [
            'You are the Study Coach for MedQ.',
            'ALWAYS measure before planning: call analyze_my_weaknesses first for the learner\'s real accuracy by topic and system, then get_exam_blueprint for the target exam\'s content weights, then flashcard_review_status for their review backlog.',
            'Allocate study time proportional to the exam blueprint weights, boosting the learner\'s measured weak areas further. Weakest topics get the earliest, most frequent slots.',
            'Create the plan as visible tasks with task_create (one per study block or milestone: topic, why it matters, target date) and keep statuses current with task_update as you finish.',
            'Return a concise plan summary: total weeks, the top 5 focus areas with the measured accuracy that justified each, the weekly rhythm, and how the flashcard backlog is folded in.',
            'If measurement tools return no data (new learner), say so and build a sensible blueprint-weighted starter plan instead of guessing weaknesses.',
            'Do not write files or generate questions — planning and task creation only.'
        ].join('\n'),
        tools: pickChatTools('analyze_my_weaknesses', 'get_exam_blueprint', 'flashcard_review_status', 'task_create', 'task_update', 'task_list'),
        // Per-task model routing (SubAgent.model): routine synthesis on the
        // fast/cheap model; omit when disabled → inherits the primary model.
        ...fastModel ? {
            model: fastModel
        } : {}
    };
    /** Communication specialist: the Messages tab as an agent — reads rooms,
   *  digests unread floods, drafts and sends messages/DMs/groups (sends stay
   *  HITL-gated even inside the subagent: the approval card flows to the
   *  user exactly like a main-agent send). Runs on the PRIMARY model —
   *  drafting messages other humans will read is quality-sensitive. */ const communicator = {
        name: 'communicator',
        description: 'Handles everything about the learner\'s Messages tab: lists rooms and unread counts, digests a flooded group chat into key points and extracted events (meetings, exam schedules, deadlines), reads recent messages, and drafts + sends messages, direct messages and new groups on the learner\'s behalf.',
        systemPrompt: [
            'You are the Communicator for MedQ — the learner\'s messaging assistant.',
            'ALWAYS call list_chat_rooms first to resolve room names/ids and see unread counts.',
            'For rooms with many unread messages, call summarize_unread_messages (it returns a digest plus structured events). Present the digest faithfully: overview, key topics, decisions, and the events (meetings, exam schedules, deadlines) with their dates.',
            'When events matter, offer to send each as a push notification via send_push_notification (one per event, short title + the date/time in the body) — the learner approves each send.',
            'To send anything, draft the message from the learner\'s ACTUAL words and intent — never invent content. Sends require the learner\'s approval and go out exactly as approved.',
            'For a new DM use start_direct_message (resolve the exact person first); for a new group use create_chat_group (exact member names).',
            'Reading never marks rooms as read — the learner\'s unread badge is untouched unless they ask.',
            'Return a concise report: what you read/digested, what was sent (room + message), and any events you flagged.'
        ].join('\n'),
        tools: pickChatTools('list_chat_rooms', 'read_chat_messages', 'summarize_unread_messages', 'send_chat_message', 'start_direct_message', 'create_chat_group', 'send_push_notification')
    };
    return {
        model: typeof config.model === 'string' ? config.model : 'modelId' in config ? config.modelId : 'configured model',
        agent: (0,deepagents__WEBPACK_IMPORTED_MODULE_6__/* .createDeepAgent */ .ML)({
            name: 'medq-agent',
            model,
            systemPrompt,
            subagents: [
                multimodalQuestionAuthor,
                literatureResearcher,
                studyCoach,
                communicator
            ],
            // Persistent jailed filesystem with internal routing (null → framework
            // default in-memory).
            ...workspaceBackend ? {
                backend: workspaceBackend
            } : {},
            // Filesystem permissions (docs parity): the model's FILE TOOLS may not
            // touch agent internals, and skills are authored exclusively through
            // manage_skills (DB is the source of truth — direct writes would drift
            // from the synced catalog). Middleware writes via the backend API
            // bypass these tool-level rules, so summarization still works.
            permissions: [
                {
                    operations: [
                        'read',
                        'write'
                    ],
                    paths: [
                        '/conversation_history/**'
                    ],
                    mode: 'deny'
                },
                {
                    operations: [
                        'write'
                    ],
                    paths: [
                        '/skills/**'
                    ],
                    mode: 'deny'
                }
            ],
            // Skill packs (progressive disclosure) — only when the sync produced any.
            ...skillsSync.skillsPath ? {
                skills: [
                    skillsSync.skillsPath
                ]
            } : {},
            // ── Middleware stack (docs parity: fault tolerance + planning +
            // interpreter + AGENTS.md memory) ──
            // Applied AFTER the framework's standard middleware (filesystem,
            // skills, subagents, summarization) — they compose, not replace.
            middleware: [
                // FAULT TOLERANCE (docs' resilience page):
                // • tool-error containment — a tool that THROWS (zod arg validation,
                // runtime crash) becomes an error ToolMessage the model can recover
                // from, instead of killing the whole graph run (observed: the second
                // task_update call with a cross-vocabulary status enum escaped
                // ToolNode's catch and failed the turn). LangGraph control-flow
                // signals (interrupts/cancels) always propagate, never converted.
                (0,langchain__WEBPACK_IMPORTED_MODULE_7__.toolErrorMiddleware)({
                    onError: (error, request)=>{
                        // Abort/cancel must propagate — converting it would make an
                        // aborted run look like a recoverable tool failure and the
                        // model would keep generating.
                        const name = error instanceof Error ? error.name : '';
                        const message = error instanceof Error ? error.message : String(error);
                        if (name === 'AbortError' || /abort|cancel/i.test(message.slice(0, 60))) return;
                        return `[${request.toolCall.name}] failed: ${name || 'Error'}: ${message.slice(0, 400)} — fix the arguments and retry, or continue without this tool and say what you could not do.`;
                    }
                }),
                // • model retries with exponential backoff — transient provider 429s
                //   (the Z.AI gateway storms) now recover INSIDE the same model call
                //   instead of failing the turn to the fallback chain. onFailure
                //   'error' re-raises after exhaustion so MedQ's Z.AI fallback loop
                //   still engages cleanly (attempt-2 rebuild on the backup provider).
                (0,langchain__WEBPACK_IMPORTED_MODULE_7__.modelRetryMiddleware)({
                    maxRetries: 2,
                    backoffFactor: 2,
                    initialDelayMs: 1000,
                    maxDelayMs: 8000,
                    jitter: true,
                    onFailure: 'error'
                }),
                // • runaway-run circuit breakers (docs' call-limit pattern). runLimit
                //   resets each turn; threadLimit needs a checkpointer so it is not
                //   set (MedQ's event-replay reattach serves cross-turn durability).
                (0,langchain__WEBPACK_IMPORTED_MODULE_7__.modelCallLimitMiddleware)({
                    runLimit: 60,
                    exitBehavior: 'error'
                }),
                (0,langchain__WEBPACK_IMPORTED_MODULE_7__.toolCallLimitMiddleware)({
                    runLimit: 160,
                    exitBehavior: 'error'
                }),
                // NOTE toolRetryMiddleware intentionally NOT wired: MedQ's tools are
                // side-effectful (save_question, schedule_task, manage_skills…) —
                // auto-retrying a timed-out call could double-execute the effect.
                // TASK PLANNING (docs' write_todos pattern): adds the write_todos
                // tool + `todos` state channel. Todo updates flow through the
                // existing updates-mode handler (update.todos → plan events →
                // ExecutionTimeline), now with explicit per-step status.
                (0,langchain__WEBPACK_IMPORTED_MODULE_7__.todoListMiddleware)(),
                // INTERPRETER (docs' interpreters/dynamic-subagents pattern): the
                // `eval` tool runs model-authored JavaScript in an isolated QuickJS
                // WASM context — state persists between evals, tools.* PTC calls
                // resolve to the agent's GATED tool instances, and task() dispatches
                // subagents programmatically (fan-out/classify-and-act patterns).
                // RAM-tuned for the 4GB box: 32MB QuickJS heap, 10s timeout,
                // 64 PTC calls, 4 concurrent subagent dispatches.
                (()=>{
                    const interpreter = (0,_langchain_quickjs__WEBPACK_IMPORTED_MODULE_8__.createCodeInterpreterMiddleware)({
                        memoryLimitBytes: 32 * 1024 * 1024,
                        executionTimeoutMs: 10000,
                        maxPtcCalls: 64,
                        maxSubagentConcurrency: 4,
                        // Read-only / idempotent tools only — anything side-effectful
                        // stays human-mediated through the normal tool path.
                        ptc: [
                            'search_knowledge',
                            'search_medical_references',
                            'get_exam_blueprint',
                            'analyze_my_weaknesses',
                            'task_list',
                            'list_scheduled_tasks',
                            'list_background_tasks',
                            'check_background_task'
                        ]
                    });
                    // Gate the eval tool itself with the same HITL approval flow as
                    // run_code (capability code.run) — executing model-authored code is
                    // exactly what learners should confirm.
                    const evalTool = (interpreter.tools ?? [])[0];
                    if (evalTool) {
                        return {
                            ...interpreter,
                            tools: [
                                (0,_approvals_service__WEBPACK_IMPORTED_MODULE_9__/* .withApprovalGate */ .nh)(evalTool, {
                                    userId: options.userId ?? null,
                                    threadId: ctx.threadId,
                                    signal: options.signal,
                                    hitl: options.hitl
                                })
                            ]
                        };
                    }
                    return interpreter;
                })(),
                // MEMORY (docs' AGENTS.md pattern) — user-authored persistent
                // instructions from the jailed workspace, injected at startup.
                ...memoryMiddleware ? [
                    memoryMiddleware
                ] : []
            ],
            // ── The registry-built tool set (the same instances shared with the
            // domain subagents above) ──
            tools: chatTools
        }),
        // The provider config this agent instance actually runs on — the stream
        // loop uses it to decide whether a rate-limited attempt is eligible for
        // key-pool rotation (same endpoint, next key).
        provider: {
            baseUrl: config.baseUrl ?? '',
            apiKey: config.apiKey,
            model: typeof config.model === 'string' ? config.model : 'modelId' in config ? config.modelId : String(config.model),
            defaultHeaders
        }
    };
}
/**
 * Extract a JSON array from a raw model response.
 *
 * Models sometimes return arrays wrapped in markdown fences or nested in a
 * content field. This helper tries to recover the useful array while tolerating
 * malformed output.
 */ function parseQuestionArray(value) {
    const content = Array.isArray(value) ? value : value && typeof value === 'object' && 'content' in value ? value.content : value;
    if (Array.isArray(content)) return content;
    if (typeof content !== 'string') return [];
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) return [];
    try {
        const parsed = JSON.parse(match[0]);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
/**
 * Generate a batch of medical questions from a structured request.
 *
 * This is a helper entrypoint for question generation flows that do not need a
 * live streaming UI. It builds a prompt, invokes the agent, and then extracts the
 * JSON array of generated questions.
 */ async function generateMedQQuestions(request) {
    const { agent } = await createMedQDeepAgent();
    const source = request.sourceText ? `\nSource material:\n${request.sourceText}` : '';
    const prompt = [
        'Generate the requested medical questions.',
        'You MUST call the multimodal-question-author subagent through the task tool and use its JSON output.',
        `Topic: ${request.topic}`,
        `Medical system: ${request.system}`,
        `Question types: ${request.types.join(', ')}`,
        `Difficulty: ${request.difficulties.join(', ')}`,
        `Count: ${request.count}`,
        'Return only the specialist JSON array with no markdown or commentary.',
        source
    ].join('\n');
    const result = await agent.invoke({
        messages: [
            new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(prompt)
        ]
    });
    const messages = result.messages ?? [];
    for(let index = messages.length - 1; index >= 0; index -= 1){
        const parsed = parseQuestionArray(messages[index]);
        if (parsed.length > 0) return parsed;
    }
    return parseQuestionArray(result);
}
/** Extract the subagent name from an outer-agent `task` tool call's args
 * (deepagents' task schema: { description, subagent_type, ... }). */ function subagentNameFromArgs(args) {
    let obj = args;
    if (typeof args === 'string') {
        try {
            obj = JSON.parse(args);
        } catch  {
            return null;
        }
    }
    if (!obj || typeof obj !== 'object') return null;
    const t = obj.subagent_type;
    return typeof t === 'string' && t.trim() ? t.trim() : null;
}
/**
 * Stream a single MedQ turn from the agent runtime.
 *
 * This generator is the bridge between the route layer and the deep-agent engine:
 * it sends a request into the graph, then yields events for each token, plan,
 * tool update, and final completion message so the UI can render them progressively.
 *
 * Tool-call modeling follows the "call ≠ result" contract: tool_start carries
 * the CALL (tool name + tool_call id + parsed args, taken from the complete
 * AIMessage of the model turn) and tool_end carries the RESULT (matched by
 * tool_call_id, with an excerpt + capped result text). A call that never
 * receives its tool_end stays "requested" in the UI — never assumed successful.
 */ async function* streamMedQDeepAgent(message, context, options = {}) {
    // Live events from the embedded question-generation agent flow through this
    // queue. The generation tool pushes into it via onGenerationEvent while it
    // executes inside the agent stream; the merged iterator below races the
    // agent stream against the queue so inner events are yielded to the SSE
    // client in real time (LangGraph itself yields nothing during tool runs).
    const generationEvents = new AsyncEventQueue();
    const runtimeOptions = {
        ...options,
        onGenerationEvent: (event)=>generationEvents.push(event)
    };
    // ── HITL approval events ──
    // The approval gate (tools/chat-registry.ts → approvals/service.ts) blocks
    // a gated tool until the user decides. The wait happens INSIDE the tool, so
    // the LangGraph stream is silent while it pends — the approval request is
    // published on an in-process bus and funneled through this queue so the
    // merged iterator yields it to the SSE client in real time (the route's
    // heartbeat keeps the wire alive while the tool waits).
    const approvalEvents = new AsyncEventQueue();
    const scopeUserId = options.userId ?? 'guest';
    const unsubscribeApprovals = (0,_approvals_service__WEBPACK_IMPORTED_MODULE_9__/* .subscribeApprovalRequests */ .id)((payload)=>{
        // Scope by thread: the bus is process-global, so with two concurrent
        // turns one user's SSE stream would otherwise receive the other's
        // approval card. Payloads WITHOUT a threadId come from threadless flows
        // (scheduled / background jobs run through the queue worker with no
        // conversation) — they can never belong to a chat turn that knows its
        // own thread, and forwarding them used to inject phantom approval cards
        // into unrelated live conversations (observed live: a scheduled
        // question-generation task's approvals hijacking a different chat's
        // card mid-run).
        if (options.threadId && payload.threadId !== options.threadId) {
            return;
        }
        logAgentEvent('info', `[APPROVAL-BUS] listener fired for ${payload.tool} (${payload.approvalId.slice(0, 8)})`);
        approvalEvents.push({
            type: 'approval_required',
            approval: payload
        });
    });
    // ── Structured clarification events (ask_user) ──
    // The ask_user tool does NOT block — it publishes the form payload on the
    // clarification bus and returns guidance that ends the model's turn. The
    // runtime forwards the payload through the same queue so the SSE client
    // renders the interactive form card; answers arrive as the next user
    // message on a fresh run. Scoped by user (and thread when present) so a
    // concurrent conversation never sees another learner's question form.
    const unsubscribeClarifications = (0,_tools_ask_user__WEBPACK_IMPORTED_MODULE_20__/* .subscribeClarifications */ .S)((payload)=>{
        if (payload.userId !== scopeUserId) return;
        // Same threadless-flow scoping as the approval bus: a clarification
        // published without a threadId cannot belong to a chat turn that knows
        // its thread — never render a stranger's form in this conversation.
        if (options.threadId && payload.threadId !== options.threadId) return;
        logAgentEvent('info', `[CLARIFICATION-BUS] listener fired (${payload.clarificationId.slice(0, 10)}, ${payload.inputs.length} fields)`);
        approvalEvents.push({
            type: 'clarification_required',
            clarification: payload
        });
    });
    // ── App-control events (ui_action) ──
    // The ui_action tool does NOT block — it publishes the validated UI action
    // payloads on the ui-action bus and returns guidance. The runtime forwards
    // them through the same queue so the SSE client executes them LIVE on the
    // learner's screen (navigate / dialogs / form fills) while the turn is
    // still running. Thread-scoped like clarifications.
    const unsubscribeUiActions = (0,_tools_ui_action__WEBPACK_IMPORTED_MODULE_21__/* .subscribeUiActions */ .Ou)((payload)=>{
        if (payload.userId !== scopeUserId) return;
        if (options.threadId && payload.threadId !== options.threadId) return;
        logAgentEvent('info', `[UI-ACTION-BUS] listener fired (${payload.actions.length} action(s): ${payload.actions.map((a)=>String(a.type ?? '?')).join(', ')})`);
        approvalEvents.push({
            type: 'ui_actions',
            actions: payload.actions
        });
    });
    // ── Smalltalk fast path (greetings) ──
    // "hi" / "hello" / "hey" used to cost 4 LLM calls: the deep-agent graph
    // runs its full middleware stack (summarization check, todo planning,
    // second model turn, …) even for a greeting, then memory + title tasks
    // pile on. A pure greeting needs ONE call — stream it directly with a
    // minimal system prompt and skip the graph entirely. Thread persistence
    // is unaffected (the route persists from the streamed tokens). Any
    // failure falls through to the full agent path. Long/multiword messages,
    // anything with a question mark, and mid-conversation context-bearing
    // turns take the normal path.
    //
    // Listener hygiene: this block sits BEFORE the generator's main
    // try/finally (which unsubscribes the run-scoped buses). Exiting the
    // generator from HERE (turn done, client disconnected mid-greeting) would
    // leak the approval/clarification/ui-action listeners — so the finally
    // below cleans them up unless we deliberately fall through to the full
    // path (which owns cleanup from there on).
    const trimmedMessage = message.trim();
    if (trimmedMessage.length <= 25 && !trimmedMessage.includes('?') && /^(hi+|hello+|hey+|yo|sup|hiya|greetings|good\s*(morning|afternoon|evening)|salam|salaam|marhaba|as-?salamu\s+'?alaykum|مرحبا|أهلا|اهلاً?|هاي|صباح\s+الخير|مساء\s+الخير)[!,.\s]*$/i.test(trimmedMessage)) {
        // True when we deliberately continue to the full agent path (the outer
        // finally owns cleanup in that case). False when the generator ENDS
        // here — success OR client disconnect — then this finally cleans up.
        let fastPathFallsThrough = false;
        try {
            // Same ladder as the full path, collapsed to two rungs: the configured
            // provider first, then the managed Z.AI backup. (Observed live: a
            // deployment whose primary endpoint is the keyless-fresh FreeLLM
            // router 502s zai-llm — without the backup rung the fast path fell
            // through to the 4-call graph and the "optimization" saved nothing.)
            const primary = options.providerOverride ? options.providerOverride : (()=>{
                const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';
                if (requested && requested !== 'auto') {
                    // Resolved lazily inside the try below (async).
                    return null;
                }
                return defaultDeepAgentProviderConfig();
            })();
            const resolveFastCfg = async ()=>{
                if (primary) return {
                    ...primary,
                    label: 'modelId' in primary ? String(primary.modelId) : String(primary.model)
                };
                const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';
                const resolved = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_18__.resolveModel)({
                    modelString: requested,
                    userId: options.userId ?? undefined
                }).then((r)=>r.apiKey ? r : null).catch(()=>null);
                if (resolved) {
                    const zai = resolved.providerId === 'zai' ? (0,_zai__WEBPACK_IMPORTED_MODULE_22__.readConfig)() : null;
                    return {
                        baseUrl: resolved.baseUrl ?? '',
                        apiKey: resolved.apiKey,
                        model: resolved.modelId,
                        ...zai ? {
                            defaultHeaders: zaiGatewayHeaders(zai)
                        } : {},
                        label: resolved.modelId
                    };
                }
                return null;
            };
            const attemptCfgs = [];
            const first = await resolveFastCfg();
            if (first && first.apiKey) attemptCfgs.push(first);
            const zaiBackup = zaiFallbackConfig();
            const primaryIsZai = first?.label === zaiBackup?.model;
            if (zaiBackup && !primaryIsZai) {
                attemptCfgs.push({
                    baseUrl: zaiBackup.baseUrl,
                    apiKey: zaiBackup.apiKey,
                    model: zaiBackup.model,
                    ...zaiBackup.defaultHeaders ? {
                        defaultHeaders: zaiBackup.defaultHeaders
                    } : {},
                    label: zaiBackup.model
                });
            }
            if (attemptCfgs.length === 0) {
                fastPathFallsThrough = true;
            } else {
                let fastText = '';
                for(let attempt = 0; attempt < attemptCfgs.length && !fastText.trim(); attempt++){
                    const cfg = attemptCfgs[attempt];
                    try {
                        const fastModel = new _langchain_openai__WEBPACK_IMPORTED_MODULE_2__/* .ChatOpenAI */ .Db({
                            apiKey: cfg.apiKey,
                            model: cfg.model,
                            temperature: 0.6,
                            maxRetries: 2,
                            timeout: 60000,
                            configuration: (()=>{
                                const headers = cfg.defaultHeaders;
                                return headers ? {
                                    baseURL: cfg.baseUrl,
                                    defaultHeaders: headers
                                } : {
                                    baseURL: cfg.baseUrl
                                };
                            })()
                        });
                        if (attempt === 0) {
                            const greetingHistory = (options.history ?? []).slice(-4).map((entry)=>entry.role === 'assistant' ? new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .AIMessage */ .Od(entry.content) : new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(entry.content));
                            logAgentEvent('info', `Smalltalk fast path (greeting) — single ${cfg.model} call instead of the full graph`);
                            yield {
                                type: 'status',
                                model: cfg.model
                            };
                            const stream = await fastModel.stream([
                                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .SystemMessage */ .tn('You are MedQ Agent, a warm medical-education assistant. The learner just greeted you. Reply with ONE friendly sentence: greet them back and invite them to study — mention they can ask you to open any part of the app (question bank, flashcards, exams) or generate questions/flashcards on a topic. Match their language. No lists, no markdown.'),
                                ...greetingHistory,
                                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(trimmedMessage)
                            ]);
                            for await (const chunk of stream){
                                const text = typeof chunk?.content === 'string' ? chunk.content : '';
                                if (text) {
                                    fastText += text;
                                    yield {
                                        type: 'token',
                                        text
                                    };
                                }
                            }
                        } else {
                            // Backup rung: restart the (tiny) answer cleanly — the failed
                            // attempt streamed nothing (it only ever fails on connection /
                            // HTTP errors before tokens, or we wouldn't be retrying).
                            logAgentEvent('info', `Smalltalk fast path — primary failed, retrying on the Z.AI backup (${cfg.model})`);
                            yield {
                                type: 'status',
                                model: `${cfg.model} · backup`
                            };
                            const stream = await fastModel.stream([
                                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .SystemMessage */ .tn('You are MedQ Agent, a warm medical-education assistant. The learner just greeted you. Reply with ONE friendly sentence: greet them back and invite them to study — mention they can ask you to open any part of the app (question bank, flashcards, exams) or generate questions/flashcards on a topic. Match their language. No lists, no markdown.'),
                                new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(trimmedMessage)
                            ]);
                            for await (const chunk of stream){
                                const text = typeof chunk?.content === 'string' ? chunk.content : '';
                                if (text) {
                                    fastText += text;
                                    yield {
                                        type: 'token',
                                        text
                                    };
                                }
                            }
                        }
                    } catch (error) {
                        if (attempt === attemptCfgs.length - 1) throw error;
                        logAgentEvent('info', `Smalltalk fast path attempt ${attempt + 1} failed: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
                if (fastText.trim()) {
                    yield {
                        type: 'done',
                        text: fastText,
                        llmCalls: attemptCfgs.length > 1 ? 2 : 1
                    };
                    return; // finally below cleans up (not falling through)
                }
                // Empty stream → fall through to the full path below.
                fastPathFallsThrough = true;
            }
        } catch  {
            // Fast path failed — the full agent path below handles it (with its
            // own provider fallback ladder).
            fastPathFallsThrough = true;
        } finally{
            if (!fastPathFallsThrough) {
                unsubscribeApprovals();
                unsubscribeClarifications();
                unsubscribeUiActions();
                approvalEvents.close();
            }
        }
    }
    // ── Long-term memory recall ──
    // Best-effort BEFORE the turn starts: surface the most relevant saved
    // memories for the upcoming message into the system prompt (deep-agent /
    // hermes parity). Guest turns skip recall — the anonymous 'guest' pool is
    // shared across visitors, so silently injecting it would leak one
    // visitor's saved context into another's conversation. Signed-in users
    // only. A memory failure must never break the chat turn (null fallback).
    if (options.userId && !options.memoryContext) {
        try {
            runtimeOptions.memoryContext = await (0,_memory_context__WEBPACK_IMPORTED_MODULE_11__/* .buildMemoryContext */ .d)(options.userId, message);
        } catch  {
            runtimeOptions.memoryContext = null;
        }
    }
    // ── Run-level telemetry (AgentRun row) ──
    // One row per turn: status / duration / model. Paired with the per-tool
    // AgentToolExecution rows the chat registry now writes, the usage tables
    // finally reflect reality. Best-effort — never breaks the chat turn.
    const runStartedAt = Date.now();
    let agentRunId = null;
    try {
        agentRunId = (await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.agentRun.create({
            data: {
                userId: options.userId ?? 'guest',
                ...options.threadId ? {
                    threadId: options.threadId
                } : {},
                kind: options.runKind ?? 'chat',
                model: 'pending',
                status: 'running'
            }
        })).id;
    } catch  {
        agentRunId = null;
    }
    const finalizeAgentRun = (status, model, error)=>{
        if (!agentRunId) return;
        void _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.agentRun.update({
            where: {
                id: agentRunId
            },
            data: {
                status,
                model,
                ...error ? {
                    error: error.slice(0, 2000)
                } : {},
                durationMs: Date.now() - runStartedAt,
                completedAt: new Date()
            }
        }).catch(()=>{});
    };
    let finalModel = 'unknown';
    // ── Provider resilience ladder (rate-limit mitigation) ──
    // Attempt 1 runs the configured primary provider (env chain, e.g. the
    // FreeLLM router). A rate-limit storm fails on the very FIRST LLM call —
    // before any token/tool event reached the client — so clean retries are
    // safe. The ladder, in order:
    //   1. primary provider (MEDQ_AGENT_* env chain)
    //   2. NEXT KEY in the MEDQ_AGENT_API_KEYS pool on the SAME endpoint
    //      (one hop per turn — covers sustained per-key quota exhaustion;
    //      brief storms are already absorbed in-call by maxRetries +
    //      modelRetryMiddleware)
    //   3. managed Z.AI backup service (.z-ai-config; verified working during
    //      the 2026-10-08 storm)
    // A mid-run failure after content was streamed is never retried — partial
    // output must not be duplicated.
    const keyPool = (0,_provider_key_pool__WEBPACK_IMPORTED_MODULE_25__/* .resolveAgentKeyPool */ .Rg)();
    const poolBase = (0,_provider_key_pool__WEBPACK_IMPORTED_MODULE_25__/* .poolBaseUrl */ .j_)();
    const poolSpare = keyPool.size > 1 && !!poolBase;
    const zaiBackup = zaiFallbackConfig();
    const maxAttempts = 1 + (poolSpare ? 1 : 0) + (zaiBackup ? 1 : 0);
    let poolRotated = false;
    let fallbackOverride;
    try {
        for(let attempt = 1; attempt <= maxAttempts; attempt++){
            let streamedContent = false;
            // The provider config THIS attempt actually ran on — captured for the
            // pool-rotation eligibility check in the catch below.
            let attemptProvider;
            try {
                const { agent, model, provider } = await createMedQDeepAgent({
                    ...runtimeOptions,
                    providerOverride: fallbackOverride
                });
                attemptProvider = provider;
                finalModel = model;
                logAgentEvent('info', `Starting stream with model ${model}${attempt > 1 ? ` (${fallbackOverride?.label ?? 'backup'})` : ''}`);
                yield {
                    type: 'status',
                    model: attempt > 1 ? `${model} · backup` : model
                };
                const prompt = context ? `${message}\n\nCurrent MedQ context:\n${context}` : message;
                const history = (options.history ?? []).slice(-12).map((entry)=>entry.role === 'assistant' ? new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .AIMessage */ .Od(entry.content) : new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(entry.content));
                const stream = await agent.stream({
                    messages: [
                        ...history,
                        new _langchain_core_messages__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xc(prompt)
                    ]
                }, {
                    streamMode: [
                        'updates',
                        'messages'
                    ],
                    configurable: {
                        thread_id: options.threadId,
                        user_id: options.userId ?? undefined
                    }
                });
                const output = [];
                // Full tool-result payloads seen this turn — used at completion to strip
                // verbatim echoes: some models (observed with GLM via the zai gateway)
                // open their post-tool turn by repeating the tool's return JSON verbatim
                // as text. The exact JSON never belongs in the user-facing answer.
                const toolResultContents = [];
                // Dedupe guards: AIMessages/ToolMessages can reappear in updates after
                // checkpoint replays (resume/interrupt) — never emit one call/result twice.
                const emittedToolStartIds = new Set();
                const emittedToolEndIds = new Set();
                // Subagent the in-flight `task` call delegated to (from its args).
                let lastTaskSubagent = null;
                // Honest LLM-call accounting for the done event: this graph's model
                // turns + inner-agent turns (approximated by its tool calls + one
                // planning turn) + each subagent takeover.
                let modelTurns = 0;
                let innerTurns = 0;
                // `ask_user` hard turn stop — see the ToolMessage branch below. The
                // label lets the innermost message loop end the WHOLE event loop the
                // moment the clarification form's tool result lands.
                eventLoop: for await (const item of mergeAgentStreamWithGenerationEvents(stream, generationEvents, options.signal, approvalEvents)){
                    // Approval request from the HITL gate — forwarded to the SSE client
                    // so the approval card renders while the tool waits for the decision.
                    if (item.kind === 'approval') {
                        yield item.event;
                        continue;
                    }
                    // Events from the embedded generation agent — forwarded verbatim so the
                    // route can surface plan / tool / subagent / save activity live.
                    if (item.kind === 'generation') {
                        streamedContent = true;
                        if (item.event.type === 'tool_start' || item.event.type === 'subagent') innerTurns += 1;
                        yield {
                            type: 'generation_event',
                            event: item.event
                        };
                        continue;
                    }
                    const [mode, payload] = [
                        item.mode,
                        item.payload
                    ];
                    if (mode === 'messages') {
                        // The chat agent's OWN narration tokens. (Nested generation-agent
                        // tokens no longer reach this handler — question-deep-agent severs
                        // ambient callback inheritance on its own stream — so the answer
                        // text stays clean of subagent narration and tool-result echoes.)
                        //
                        // SUBAGENT STREAMING (docs parity): chunks produced inside a `task`
                        // subagent graph carry metadata.lc_agent_name (set by the deepagents
                        // task tool) — those are routed to dedicated subagent_delta events
                        // (rendered as live specialist cards) INSTEAD of the main answer
                        // stream, so delegated narration never pollutes the final text.
                        const [chunk, chunkMetadata] = payload;
                        const text = typeof chunk?.content === 'string' ? chunk.content : '';
                        // Only the explicit lc_agent_name tag (set by the deepagents task
                        // tool on the subagent's config) identifies subagent chunks — node
                        // names are NOT reliable (the main agent's model node is 'model'
                        // too, which would misroute post-delegation narration).
                        const subagentName = chunkMetadata?.metadata?.lc_agent_name;
                        if (text && subagentName && subagentName !== 'medq-agent') {
                            streamedContent = true;
                            yield {
                                type: 'subagent_delta',
                                name: subagentName,
                                text
                            };
                            continue;
                        }
                        if (text) {
                            streamedContent = true;
                            output.push(text);
                            yield {
                                type: 'token',
                                text
                            };
                        }
                        continue;
                    }
                    if (mode === 'updates') {
                        const updates = payload;
                        for (const [node, value] of Object.entries(updates)){
                            const update = value;
                            if (Array.isArray(update?.todos)) {
                                streamedContent = true;
                                yield {
                                    type: 'plan',
                                    todos: update.todos
                                };
                            }
                            for (const messageUpdateValue of update?.messages ?? []){
                                const messageUpdate = messageUpdateValue;
                                const name = messageUpdate?.constructor?.name ?? '';
                                // A complete model turn: its tool_calls are the CALL side —
                                // full parsed args + the provider's tool_call ids, emitted once
                                // per call (deduped). Replaces chunk-based emission, which
                                // captured only the first args fragment per call.
                                if (name.includes('AIMessage')) {
                                    const calls = messageUpdate.tool_calls ?? [];
                                    if (calls.length > 0 || typeof messageUpdate.content === 'string') modelTurns += 1;
                                    for (const toolCall of calls){
                                        if (typeof toolCall?.name !== 'string' || !toolCall.name) continue;
                                        const callId = typeof toolCall.id === 'string' ? toolCall.id : undefined;
                                        if (callId && emittedToolStartIds.has(callId)) continue;
                                        if (callId) emittedToolStartIds.add(callId);
                                        streamedContent = true;
                                        logAgentEvent('tool', `Calling ${toolCall.name}${callId ? ` (${callId})` : ''}`);
                                        yield {
                                            type: 'tool_start',
                                            tool: toolCall.name,
                                            id: callId,
                                            args: toolCall.args
                                        };
                                        // The `task` tool IS subagent delegation (deepagents
                                        // convention) — surface which specialist took over.
                                        if (toolCall.name === 'task') {
                                            lastTaskSubagent = subagentNameFromArgs(toolCall.args) ?? 'subagent';
                                            yield {
                                                type: 'subagent',
                                                name: lastTaskSubagent,
                                                event: 'started'
                                            };
                                        }
                                    }
                                    continue;
                                }
                                if (name.includes('ToolMessage')) {
                                    streamedContent = true;
                                    logAgentEvent(messageUpdate.status === 'error' ? 'error' : 'success', `${messageUpdate.status === 'error' ? 'Tool failed' : 'Tool completed'}: ${messageUpdate.name ?? node}`);
                                    const toolName = messageUpdate.name ?? node;
                                    // Content may be a string OR an array of content blocks
                                    // (deepagents' read_file/ls/glob return [{type:"text",…}]
                                    // blocks). Normalizing to text here keeps tool_end excerpts,
                                    // thread persistence, and the UI's tool-result cards honest —
                                    // observed live: every read_file result persisted as "".
                                    let content;
                                    if (typeof messageUpdate.content === 'string') {
                                        content = messageUpdate.content;
                                    } else if (Array.isArray(messageUpdate.content)) {
                                        const text = messageUpdate.content.filter((block)=>block && typeof block.text === 'string').map((block)=>block.text).join('\n');
                                        if (text) content = text;
                                    }
                                    const resultId = typeof messageUpdate.tool_call_id === 'string' ? messageUpdate.tool_call_id : undefined;
                                    if (resultId && emittedToolEndIds.has(resultId)) continue;
                                    if (resultId) emittedToolEndIds.add(resultId);
                                    if (content && content.length >= 20) toolResultContents.push(content);
                                    yield {
                                        type: 'tool_end',
                                        tool: toolName,
                                        id: resultId,
                                        excerpt: content ? content.slice(0, 600) : undefined,
                                        result: content ? content.slice(0, 4000) : undefined,
                                        status: messageUpdate.status ?? 'ok',
                                        // Knowledge citations ([K#]) for the chat client's hover-cards —
                                        // only search_knowledge returns them.
                                        citations: toolName === 'search_knowledge' && content ? parseKnowledgeCitations(content) : undefined,
                                        // Web citations ([S#]) from search_medical_references so the
                                        // client renders source cards + clickable chips instead of
                                        // the model pasting long raw URLs into the answer text.
                                        webCitations: toolName === 'search_medical_references' && content ? parseWebCitations(content) : undefined
                                    };
                                    // ── ask_user: HARD turn stop ──
                                    // The tool has already displayed the interactive form (its
                                    // payload rode the clarification bus ahead of this event).
                                    // The model is INSTRUCTED to end its turn here, but
                                    // instruction-following varies — observed live (2026-10-24):
                                    // the model ignored the guidance and kept working
                                    // (write_todos, write_file, generate_medical_illustration…)
                                    // for the FULL 6-minute hard cap while the form sat disabled
                                    // behind the still-streaming turn. Breaking the event loop
                                    // here ends the model's turn AT the form: the LangGraph
                                    // stream is pull-driven, so abandoning it parks the graph
                                    // before any further nodes execute; the loop below then emits
                                    // a normal done and the client flips the form interactive.
                                    if (toolName === 'ask_user') {
                                        logAgentEvent('info', 'ask_user form displayed — hard-stopping the model turn (answers arrive as the next user message)');
                                        break eventLoop;
                                    }
                                    // The task ToolMessage marks the subagent run completing.
                                    if (toolName === 'task' && lastTaskSubagent) {
                                        yield {
                                            type: 'subagent',
                                            name: lastTaskSubagent,
                                            event: 'completed'
                                        };
                                        lastTaskSubagent = null;
                                    }
                                }
                            }
                        }
                    }
                }
                logAgentEvent('success', 'Stream completed');
                // On a client abort the merged iterator returns early; finish with whatever
                // partial text was already streamed (the route skips persistence for aborted
                // requests, so this only matters for logs and stream hygiene).
                //
                // Echo scrub: remove any verbatim tool-result JSON the model pasted into
                // its narration (observed: GLM opening its post-tool turn with the exact
                // {"ok":true,"savedCount":…} blob it just received). Only exact full-blob
                // matches are removed — legitimate prose summaries that quote a value or
                // embed a returned image URL in markdown are untouched.
                let finalText = output.join('');
                for (const content of toolResultContents){
                    if (finalText.includes(content)) finalText = finalText.split(content).join('');
                }
                finalText = finalText.replace(/\n{3,}/g, '\n\n').replace(/^[\s\n]+/, '').replace(/[\s\n]+$/, '\n');
                // ── Post-run memory extraction (best-effort, zero extra LLM calls) ──
                // Heuristically store what the user asked for + how the run resolved in
                // the auto-extraction 'semantic' layer, so future turns recall it even
                // when wording differs (deep-agent extractAndStore parity). Fire-and-
                // forget: never blocks the done event and never fails the turn.
                if (options.userId) {
                    void (0,_memory_service__WEBPACK_IMPORTED_MODULE_12__/* .extractAndStoreMemories */ .Xe)({
                        userId: options.userId,
                        userMessage: message,
                        assistantSummary: finalText.slice(0, 400),
                        threadId: options.threadId
                    }).catch(()=>{});
                }
                // ── LLM thread title (fast-model routing) ──
                // Replaces the first-message truncation with a real title — one tiny
                // fast-model call, first exchange only, fire-and-forget.
                if (options.userId && options.threadId) {
                    void (0,_threads_title__WEBPACK_IMPORTED_MODULE_13__/* .maybeGenerateThreadTitle */ .w)(options.threadId, options.userId, `${message}\n\n${finalText.slice(0, 600)}`).catch(()=>{});
                }
                yield {
                    type: 'done',
                    text: finalText,
                    llmCalls: modelTurns + innerTurns + (innerTurns > 0 ? 1 : 0)
                };
                finalizeAgentRun('completed', finalModel);
                return;
            } catch (error) {
                // Only an overload failure with NOTHING streamed yet is eligible for
                // the resilience ladder — everything else propagates to the route's
                // error handling (friendly message + logger) unchanged.
                const reason = error instanceof Error ? error.message.slice(0, 160) : String(error).slice(0, 160);
                if (!streamedContent && isProviderOverloadError(error) && attempt < maxAttempts) {
                    // (1) Key-pool rotation — same endpoint, next key. Only when the
                    // failed attempt ran the env-configured provider the pool keys
                    // belong to, and only once per turn.
                    if (poolSpare && !poolRotated && attemptProvider && (0,_provider_key_pool__WEBPACK_IMPORTED_MODULE_25__/* .normalizeBaseUrl */ .qT)(attemptProvider.baseUrl) === poolBase) {
                        const nextKey = (0,_provider_key_pool__WEBPACK_IMPORTED_MODULE_25__/* .nextPoolKey */ .RA)(keyPool, attemptProvider.apiKey);
                        if (nextKey && nextKey !== attemptProvider.apiKey) {
                            poolRotated = true;
                            fallbackOverride = {
                                baseUrl: attemptProvider.baseUrl,
                                apiKey: nextKey,
                                model: attemptProvider.model,
                                defaultHeaders: attemptProvider.defaultHeaders,
                                label: `${attemptProvider.model} · pool key`
                            };
                            logAgentEvent('info', `Provider rate-limited (${reason}) — rotating to the next API key in the pool (${keyPool.size} configured)`);
                            continue;
                        }
                    }
                    // (2) Managed Z.AI backup service.
                    if (zaiBackup && fallbackOverride !== zaiBackup) {
                        logAgentEvent('info', `Provider overloaded (${reason}) — retrying this turn on the built-in Z.AI backup service`);
                        fallbackOverride = zaiBackup;
                        continue;
                    }
                }
                finalizeAgentRun('failed', finalModel, error instanceof Error ? error.message : String(error));
                throw error;
            }
        }
    } finally{
        // HITL bus cleanup — the approval subscription lives for exactly one
        // run; leaving it subscribed would leak listeners across turns.
        unsubscribeApprovals();
        unsubscribeClarifications();
        unsubscribeUiActions();
        approvalEvents.close();
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 150837:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ createListScheduledTasksTool),
/* harmony export */   T: () => (/* binding */ createScheduleTaskTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _scheduler_cron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64413);
/* harmony import */ var _queue_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(484393);
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(791532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__, _queue_worker__WEBPACK_IMPORTED_MODULE_3__, _audit__WEBPACK_IMPORTED_MODULE_4__]);
([_db__WEBPACK_IMPORTED_MODULE_1__, _queue_worker__WEBPACK_IMPORTED_MODULE_3__, _audit__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






/**
 * schedule_task — natural-language scheduling tool, ported from hermes
 * (`schedule_task`, capability schedule.create). Lets the agent create
 * recurring (5-field cron + IANA timezone) or one-shot scheduled agent runs
 * on the user's behalf: "every Monday 9am, quiz me on this week's pharmacology".
 *
 * The worker's scheduler tick fires due tasks and enqueues task.run jobs; each
 * completed run delivers an in-app notification with the agent's result.
 */ function createScheduleTaskTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'schedule_task',
        description: 'Schedule a recurring or one-shot automated agent task for the learner. Use for spaced repetition prompts, weekly review sessions, exam countdown reminders, or scheduled question generation (e.g. "every Sunday at 9pm, generate 20 MCQs on my weak topics"). The prompt may reference "my weak topics" — the runner injects the learner\'s actual weakest topics from their quiz history at fire time. Requires either a cron expression with timezone, or a one-shot runAt ISO time.',
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({
            name: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().min(3).max(80).describe('Short task name, e.g. "Weekly pharm review"'),
            prompt: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().min(10).max(2000).describe('What the agent should do each run, e.g. "Generate 5 pharmacology MCQs on a random system and deliver as a mini quiz"'),
            cron: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().optional().describe('5-field cron expression for recurring tasks, e.g. "0 9 * * MON" = every Monday 09:00. Omit for one-shot.'),
            runAt: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().optional().describe('ISO 8601 datetime for a one-shot task, e.g. "2026-10-01T09:00:00Z". Omit when cron is given.'),
            timezone: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().optional().describe('IANA timezone for the cron schedule, e.g. "Africa/Cairo". Default UTC.')
        }),
        func: async ({ name, prompt, cron, runAt, timezone })=>{
            try {
                if (!cron && !runAt) {
                    return JSON.stringify({
                        scheduled: false,
                        error: 'Provide either a cron expression or a runAt datetime.'
                    });
                }
                if (cron && !_scheduler_cron__WEBPACK_IMPORTED_MODULE_2__/* .cronExpressionSchema */ .QP.safeParse(cron).success) {
                    return JSON.stringify({
                        scheduled: false,
                        error: 'Invalid cron expression (expected 5-field cron, e.g. "0 9 * * MON").'
                    });
                }
                const tz = timezone || 'UTC';
                const runAtDate = runAt ? new Date(runAt) : null;
                if (runAtDate && Number.isNaN(runAtDate.getTime())) {
                    return JSON.stringify({
                        scheduled: false,
                        error: 'Invalid runAt datetime (expected ISO 8601).'
                    });
                }
                const nextRunAt = (0,_scheduler_cron__WEBPACK_IMPORTED_MODULE_2__/* .computeNextRun */ .QX)(cron ?? null, runAtDate, tz);
                if (!nextRunAt) {
                    return JSON.stringify({
                        scheduled: false,
                        error: 'Could not compute the next run time.'
                    });
                }
                const task = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentScheduledTask.create({
                    data: {
                        userId: ctx.userId,
                        name,
                        prompt,
                        cron: cron ?? null,
                        runAt: runAtDate,
                        timezone: tz,
                        nextRunAt,
                        status: 'active',
                        ...ctx.threadId ? {
                            threadId: ctx.threadId
                        } : {}
                    }
                });
                (0,_queue_worker__WEBPACK_IMPORTED_MODULE_3__/* .ensureWorkerStarted */ .u)();
                await (0,_audit__WEBPACK_IMPORTED_MODULE_4__/* .audit */ .s)({
                    userId: ctx.userId,
                    action: 'schedule.create',
                    target: name,
                    detail: {
                        cron: cron ?? null,
                        nextRunAt: nextRunAt.toISOString()
                    }
                });
                return JSON.stringify({
                    scheduled: true,
                    taskId: task.id,
                    name,
                    recurrence: cron ? `${(0,_scheduler_cron__WEBPACK_IMPORTED_MODULE_2__/* .describeCron */ .MX)(cron, tz)} — cron "${cron}"` : `one-shot at ${runAtDate?.toISOString()}`,
                    nextRunAt: nextRunAt.toISOString(),
                    note: 'The job appears in the assistant panel\'s Scheduled section (clock icon) where the learner can pause, resume, run it now, or delete it. Each completed run also sends the learner a notification with the result.'
                });
            } catch (error) {
                return JSON.stringify({
                    scheduled: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}
/**
 * list_scheduled_tasks — lets the agent answer "what are my scheduled jobs?"
 * and confirm schedule details (next run, recurrence, status) without hitting
 * the REST API. Read-only, scoped to the current user.
 */ function createListScheduledTasksTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'list_scheduled_tasks',
        description: "List the learner's scheduled agent jobs with their recurrence, status, and next run time. Use when they ask about their scheduled jobs, automations, or recurring generations.",
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({}),
        func: async ()=>{
            try {
                (0,_queue_worker__WEBPACK_IMPORTED_MODULE_3__/* .ensureWorkerStarted */ .u)();
                const tasks = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentScheduledTask.findMany({
                    where: {
                        userId: ctx.userId
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 20,
                    select: {
                        id: true,
                        name: true,
                        prompt: true,
                        cron: true,
                        runAt: true,
                        timezone: true,
                        status: true,
                        lastRunAt: true,
                        nextRunAt: true
                    }
                });
                if (tasks.length === 0) {
                    return JSON.stringify({
                        tasks: [],
                        note: 'No scheduled jobs yet. Offer to create one, e.g. a weekly weak-topic question generation.'
                    });
                }
                return JSON.stringify({
                    tasks: tasks.map((t)=>({
                            id: t.id,
                            name: t.name,
                            prompt: t.prompt.slice(0, 160),
                            recurrence: t.cron ? (0,_scheduler_cron__WEBPACK_IMPORTED_MODULE_2__/* .describeCron */ .MX)(t.cron, t.timezone) : `one-shot ${t.runAt?.toISOString() ?? ''}`,
                            status: t.status,
                            lastRunAt: t.lastRunAt?.toISOString() ?? null,
                            nextRunAt: t.nextRunAt?.toISOString() ?? null
                        })),
                    note: 'Jobs can be paused, resumed, run now, or deleted from the assistant panel\'s Scheduled section (clock icon).'
                });
            } catch (error) {
                return JSON.stringify({
                    tasks: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 163433:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KQ: () => (/* binding */ buildMcpTools),
/* harmony export */   Sg: () => (/* binding */ testMcpServer),
/* harmony export */   lB: () => (/* binding */ evictMcpConnections)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(872885);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * MCP loader — DB-configured MCP servers → agent tools.
 *
 * Reads the user's enabled AgentMcpServer rows, connects (connections cached
 * per server config), lists tools, syncs the AgentMcpTool catalog, and builds
 * DynamicStructuredTools named `mcp__<server>__<tool>`. Every tool is gated by
 * the HITL approval system (dynamic capability `mcp.<server>.<tool>` — see
 * approvals/service.ts) because MCP servers are arbitrary external systems the
 * user connected.
 *
 * Caps: 5 servers per user, 20 tools per server, 40 tools total — keeps the
 * prompt from exploding when a server exposes a huge catalog.
 */ 



const MAX_SERVERS = 5;
const MAX_TOOLS_PER_SERVER = 20;
const MAX_TOOLS_TOTAL = 40;
const DESCRIPTION_CAP = 800;
const globalForMcp = globalThis;
const connections = globalForMcp.__medqMcpConnections ?? new Map();
globalForMcp.__medqMcpConnections = connections;
function slug(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'srv';
}
async function connectionFor(config) {
    const cached = connections.get(config.id);
    if (cached && cached.key === new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config).key) {
        return cached.conn;
    }
    if (cached) {
        void cached.conn.close().catch(()=>{});
        connections.delete(config.id);
    }
    const conn = new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config);
    await conn.connect();
    connections.set(config.id, {
        conn,
        key: conn.key
    });
    return conn;
}
// ── JSON Schema → Zod (common subset; unknown shapes degrade gracefully) ────
function jsonSchemaToZod(schema, depth = 0) {
    if (depth > 6 || schema == null || typeof schema !== 'object') return zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    const s = schema;
    if (Array.isArray(s.anyOf) || Array.isArray(s.oneOf)) {
        const variants = (s.anyOf ?? s.oneOf ?? []).map((v)=>jsonSchemaToZod(v, depth + 1));
        return variants.length > 0 ? zod__WEBPACK_IMPORTED_MODULE_3__/* .union */ .KCZ(variants.slice(0, 4)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    }
    if (Array.isArray(s.enum) && s.enum.length > 0) {
        const values = s.enum.filter((v)=>typeof v === 'string');
        if (values.length > 0) return zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n(values);
        return zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn();
    }
    const type = Array.isArray(s.type) ? s.type[0] : s.type;
    switch(type){
        case 'string':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP();
        case 'number':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig();
        case 'integer':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int();
        case 'boolean':
            return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zMY().describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .boolean */ .zMY();
        case 'array':
            {
                const item = jsonSchemaToZod(s.items, depth + 1);
                return s.description ? zod__WEBPACK_IMPORTED_MODULE_3__/* .array */ .YOg(item).describe(s.description.slice(0, 300)) : zod__WEBPACK_IMPORTED_MODULE_3__/* .array */ .YOg(item);
            }
        case 'object':
        default:
            {
                if (s.properties && typeof s.properties === 'object') {
                    const required = new Set(s.required ?? []);
                    const shape = {};
                    for (const [key, prop] of Object.entries(s.properties).slice(0, 40)){
                        const propSchema = jsonSchemaToZod(prop, depth + 1);
                        shape[key] = required.has(key) ? propSchema : propSchema.optional();
                    }
                    const obj = zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc(shape);
                    return s.description ? obj.describe(s.description.slice(0, 300)) : obj;
                }
                return zod__WEBPACK_IMPORTED_MODULE_3__/* .record */ .g1P(zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP(), zod__WEBPACK_IMPORTED_MODULE_3__/* .any */ .bzn());
            }
    }
}
// ── DB sync ─────────────────────────────────────────────────────────────────
async function markServerStatus(serverId, status, lastError) {
    try {
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.update({
            where: {
                id: serverId
            },
            data: {
                status,
                lastError: lastError?.slice(0, 1000) ?? null,
                lastTestedAt: new Date()
            }
        });
    } catch  {}
}
async function syncToolRows(serverId, tools) {
    try {
        const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.findMany({
            where: {
                serverId
            },
            select: {
                name: true
            }
        });
        const present = new Set(tools.map((t)=>t.name));
        for (const row of existing){
            if (!present.has(row.name)) {
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.updateMany({
                    where: {
                        serverId,
                        name: row.name
                    },
                    data: {
                        enabled: false
                    }
                });
            }
        }
        for (const tool of tools){
            const schemaJson = (()=>{
                try {
                    return JSON.stringify(tool.inputSchema ?? {}).slice(0, 8000);
                } catch  {
                    return null;
                }
            })();
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpTool.upsert({
                where: {
                    serverId_name: {
                        serverId,
                        name: tool.name
                    }
                },
                create: {
                    serverId,
                    name: tool.name,
                    description: (tool.description ?? '').slice(0, 2000),
                    schemaJson,
                    enabled: true
                },
                update: {
                    description: (tool.description ?? '').slice(0, 2000),
                    schemaJson,
                    enabled: true
                }
            });
        }
    } catch  {}
}
function safeParseHeaders(raw) {
    if (!raw) return {};
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const out = {};
            for (const [key, value] of Object.entries(parsed)){
                if (typeof value === 'string') out[key] = value;
            }
            return out;
        }
    } catch  {}
    return {};
}
function safeParseArgs(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter((v)=>typeof v === 'string');
    } catch  {}
    return [];
}
/**
 * Build the user's MCP tools. Never throws — a broken server degrades to a
 * skipped server + an error surfaced in the result (and on the server row).
 */ async function buildMcpTools(userId) {
    const errors = [];
    let servers = [];
    try {
        servers = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.findMany({
            where: {
                userId,
                enabled: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: MAX_SERVERS
        });
    } catch  {
        return {
            tools: [],
            summary: null,
            errors: [
                'MCP catalog unavailable'
            ]
        };
    }
    if (servers.length === 0) return {
        tools: [],
        summary: null,
        errors: []
    };
    const tools = [];
    const summaries = [];
    for (const server of servers){
        const transport = server.transport === 'sse' || server.transport === 'stdio' ? server.transport : 'http';
        const config = {
            id: server.id,
            name: server.name,
            transport,
            url: server.url,
            command: server.command,
            args: safeParseArgs(server.argsJson),
            headers: safeParseHeaders(server.headersJson)
        };
        try {
            const conn = await connectionFor(config);
            const remoteTools = (await conn.listTools()).slice(0, MAX_TOOLS_PER_SERVER);
            await syncToolRows(server.id, remoteTools);
            await markServerStatus(server.id, 'ok');
            const serverSlug = slug(server.name);
            const names = [];
            for (const remote of remoteTools){
                if (tools.length >= MAX_TOOLS_TOTAL) break;
                const toolName = `mcp__${serverSlug}__${slug(remote.name)}`;
                if (tools.some((t)=>t.name === toolName)) continue;
                names.push(remote.name);
                const schema = jsonSchemaToZod(remote.inputSchema);
                const description = `[MCP · ${server.name}] ${remote.description ?? `External tool "${remote.name}" from the connected MCP server "${server.name}".`}`.replace(/\s+/g, ' ').slice(0, DESCRIPTION_CAP);
                const connRef = conn;
                tools.push(new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
                    name: toolName,
                    description,
                    schema: schema instanceof zod__WEBPACK_IMPORTED_MODULE_3__/* .ZodObject */ .bvH ? schema : zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({}),
                    func: async (input)=>{
                        const args = input ?? {};
                        const result = await connRef.callTool(remote.name, args);
                        return result.slice(0, 60000);
                    }
                }));
            }
            summaries.push(`${server.name}: ${names.slice(0, 8).join(', ')}${names.length > 8 ? ` (+${names.length - 8} more)` : ''}`);
        } catch (error) {
            const message = error instanceof _client__WEBPACK_IMPORTED_MODULE_2__/* .McpError */ .N || error instanceof Error ? error.message : String(error);
            errors.push(`${server.name}: ${message}`);
            await markServerStatus(server.id, 'error', message);
            connections.delete(server.id);
        }
    }
    return {
        tools,
        summary: summaries.length > 0 ? `Connected MCP servers → ${summaries.join(' | ')}` : null,
        errors
    };
}
/** Test a server config (admin/API "Test connection") without persisting tools. */ async function testMcpServer(config) {
    const conn = new _client__WEBPACK_IMPORTED_MODULE_2__/* .McpConnection */ .d(config);
    try {
        await conn.connect();
        const tools = await conn.listTools();
        return {
            ok: true,
            toolCount: tools.length
        };
    } catch (error) {
        return {
            ok: false,
            toolCount: 0,
            error: error instanceof Error ? error.message : String(error)
        };
    } finally{
        void conn.close().catch(()=>{});
    }
}
/** Drop cached connections for servers the user removed/changed. */ async function evictMcpConnections(userId) {
    try {
        const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentMcpServer.findMany({
            where: {
                userId
            },
            select: {
                id: true
            }
        });
        const live = new Set(rows.map((r)=>r.id));
        for (const [id, cached] of connections){
            if (!live.has(id)) {
                void cached.conn.close().catch(()=>{});
                connections.delete(id);
            }
        }
    } catch  {}
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 168057:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HF: () => (/* binding */ createQuerySpreadsheetTool)
/* harmony export */ });
/* unused harmony exports SPREADSHEET_TOOL_NAMES, applySpreadsheetQuery */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18963);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _knowledge_file_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(315072);
/* harmony import */ var _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(492504);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





/**
 * query_spreadsheet — ask structured questions of the learner's UPLOADED
 * spreadsheets (lab datasets, drug lists, study trackers) WITHOUT any SQL.
 *
 * The retained .xlsx original (upload/file-store/<sourceId>.bin — retained
 * for spreadsheets since Stage 10) is parsed in-process with exceljs; the
 * pure filter/aggregate engine below does the rest. There is no SQL
 * anywhere in this path and no cell content is ever executed.
 *
 * Fallback for legacy uploads (no retained original): hybrid retrieval
 * over the sheet text that was ingested at upload time.
 */ const SPREADSHEET_TOOL_NAMES = (/* unused pure expression or super */ null && ([
    'query_spreadsheet'
]));
const asNumber = (v)=>{
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string') {
        const cleaned = v.replace(/[, ]/g, '');
        if (/^-?\d+(\.\d+)?$/.test(cleaned)) return Number.parseFloat(cleaned);
    }
    return null;
};
const cellText = (v)=>v === null || v === undefined ? '' : String(v);
/** Apply filter + aggregation + limit to parsed sheet rows. Pure. */ function applySpreadsheetQuery(allRows, query) {
    const notes = [];
    const columns = [
        ...new Set(allRows.flatMap((r)=>Object.keys(r)))
    ].filter(Boolean);
    let rows = allRows;
    // ── filter ──
    if (query.filter) {
        const { column, op, value } = query.filter;
        if (column && !columns.includes(column)) {
            notes.push(`Column "${column}" not found. Available: ${columns.join(', ') || '(none)'}`);
            rows = [];
        } else if (column) {
            const numValue = asNumber(value);
            rows = rows.filter((row)=>{
                const cell = row[column];
                if (op === 'contains') {
                    return cellText(cell).toLowerCase().includes(cellText(value).toLowerCase());
                }
                const cellNum = asNumber(cell);
                if (numValue !== null && cellNum !== null) {
                    switch(op){
                        case 'eq':
                            return cellNum === numValue;
                        case 'ne':
                            return cellNum !== numValue;
                        case 'gt':
                            return cellNum > numValue;
                        case 'lt':
                            return cellNum < numValue;
                        case 'gte':
                            return cellNum >= numValue;
                        case 'lte':
                            return cellNum <= numValue;
                    }
                }
                const cellStr = cellText(cell).toLowerCase();
                const valStr = cellText(value).toLowerCase();
                switch(op){
                    case 'eq':
                        return cellStr === valStr;
                    case 'ne':
                        return cellStr !== valStr;
                    default:
                        return false; // ordering ops on non-numeric cells never match
                }
            });
        }
    }
    // ── aggregate ──
    let aggregate;
    if (query.aggregate) {
        const { fn, column } = query.aggregate;
        const needsColumn = fn !== 'count';
        if (needsColumn && (!column || !columns.includes(column))) {
            notes.push(`Aggregate "${fn}" needs a numeric column${column ? ` — "${column}" not found` : ''}. Available: ${columns.join(', ') || '(none)'}`);
        } else if (fn === 'count') {
            aggregate = {
                fn,
                column,
                value: rows.length
            };
        } else {
            const nums = rows.map((r)=>asNumber(r[column])).filter((n)=>n !== null);
            if (nums.length === 0) {
                aggregate = {
                    fn,
                    column,
                    value: 'no numeric cells in range'
                };
            } else {
                const value = fn === 'sum' ? nums.reduce((a, b)=>a + b, 0) : fn === 'avg' ? nums.reduce((a, b)=>a + b, 0) / nums.length : fn === 'min' ? Math.min(...nums) : Math.max(...nums);
                aggregate = {
                    fn,
                    column,
                    value: Math.round(value * 1000) / 1000
                };
            }
        }
    }
    const limit = Math.min(Math.max(query.limit ?? 25, 1), 100);
    return {
        rows: rows.slice(0, limit),
        totalMatched: rows.length,
        aggregate,
        columns,
        notes
    };
}
// ─── Tool ──────────────────────────────────────────────────────────────────
function createQuerySpreadsheetTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'query_spreadsheet',
        description: 'Query one of the learner\'s UPLOADED spreadsheets (.xlsx in their Knowledge Library) with a filter and/or aggregate — no SQL, just structured reads. Use it when the learner asks things like "what was the average sodium in my lab sheet", "list drugs where the class is beta blocker", "how many rows mention anemia". First call without filter/aggregate to list sheets and columns, then refine.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            sourceId: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(5).describe('The knowledge-source id of the uploaded spreadsheet (from search_knowledge results or the Knowledge Library)'),
            sheet: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(120).optional().describe('Sheet name (omit to use the first sheet; the response lists all sheet names)'),
            filter: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
                column: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(120).describe('Column header to filter on (must match exactly)'),
                op: zod__WEBPACK_IMPORTED_MODULE_4__/* ["enum"] */ .k5n([
                    'eq',
                    'ne',
                    'gt',
                    'lt',
                    'gte',
                    'lte',
                    'contains'
                ]).describe('Comparison'),
                value: zod__WEBPACK_IMPORTED_MODULE_4__/* .union */ .KCZ([
                    zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(500),
                    zod__WEBPACK_IMPORTED_MODULE_4__/* .number */ .aig()
                ]).describe('Value to compare against')
            }).optional().describe('Optional row filter'),
            aggregate: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
                fn: zod__WEBPACK_IMPORTED_MODULE_4__/* ["enum"] */ .k5n([
                    'count',
                    'sum',
                    'avg',
                    'min',
                    'max'
                ]).describe('Aggregation over the filtered rows'),
                column: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(120).optional().describe('Numeric column (required except for count)')
            }).optional().describe('Optional aggregate'),
            limit: zod__WEBPACK_IMPORTED_MODULE_4__/* .number */ .aig().int().min(1).max(100).optional().describe('Max rows to return (default 25)')
        }),
        func: async ({ sourceId, sheet, filter, aggregate, limit })=>{
            try {
                // Owner-gate + kind check
                const source = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.findFirst({
                    where: {
                        id: sourceId,
                        userId: ctx.userId
                    },
                    select: {
                        id: true,
                        name: true,
                        fileKind: true,
                        metaJson: true
                    }
                });
                if (!source) {
                    return JSON.stringify({
                        ok: false,
                        error: `Spreadsheet source "${sourceId}" not found in the learner's library.`
                    });
                }
                const meta = source.metaJson ? JSON.parse(source.metaJson) : {};
                const originalName = typeof meta.originalName === 'string' ? meta.originalName.toLowerCase() : '';
                if (!originalName.endsWith('.xlsx')) {
                    return JSON.stringify({
                        ok: false,
                        error: `"${source.name}" is not a retained .xlsx spreadsheet (found: ${originalName || 'no retained original'}). Only uploaded .xlsx files can be queried structurally.`
                    });
                }
                const retained = (0,_knowledge_file_store__WEBPACK_IMPORTED_MODULE_2__/* .readRetainedOriginal */ .oq)(sourceId);
                if (!retained) {
                    // Legacy upload (pre-retention): fall back to text retrieval over
                    // the ingested sheet rows.
                    const chunks = [];
                    try {
                        const res = await (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_3__/* .retrieveKnowledgeHybrid */ .L$)(ctx.userId, filter ? `${filter.column} ${filter.value}` : String(meta.title || source.name), {
                            sourceIds: [
                                sourceId
                            ],
                            topK: 6,
                            skipLog: true
                        });
                        chunks.push(...res.chunks);
                    } catch  {}
                    return JSON.stringify({
                        ok: true,
                        fallback: 'text',
                        note: 'The original spreadsheet bytes were not retained for this upload (legacy row). These are the ingested sheet-text excerpts — suggest re-uploading the .xlsx for structural queries.',
                        excerpts: chunks.map((c)=>c.content.slice(0, 600))
                    });
                }
                // Parse with exceljs (in-process — no SQL, no eval, no formulas executed;
                // same import pattern as the ingestion-side parseXlsx)
                const ExcelJS = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 378608, 23));
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(retained.buffer);
                const sheetNames = workbook.worksheets.map((ws)=>ws.name);
                const target = workbook.worksheets.find((ws)=>sheet ? ws.name === sheet : true);
                if (!target) {
                    return JSON.stringify({
                        ok: false,
                        error: `Sheet "${sheet || '(first)'}" not found. Sheets: ${sheetNames.join(', ') || '(none)'}`
                    });
                }
                // First row = headers; rest = data rows (same convention as the
                // ingestion parser in ingest-media parseXlsx).
                const rows = [];
                let headers = [];
                target.eachRow({
                    includeEmpty: false
                }, (row, rowNumber)=>{
                    const values = row.values.slice(1); // index 0 is a hole in exceljs
                    if (rowNumber === 1) {
                        headers = values.map((v, i)=>v === null || v === undefined ? `Column ${i + 1}` : String(v).trim());
                        return;
                    }
                    const record = {};
                    values.forEach((v, i)=>{
                        if (i < headers.length) record[headers[i]] = v ?? '';
                    });
                    if (Object.values(record).some((v)=>v !== '' && v !== null && v !== undefined)) rows.push(record);
                });
                if (rows.length > 20000) rows.length = 20000; // memory guard
                const result = applySpreadsheetQuery(rows, {
                    filter,
                    aggregate,
                    limit
                });
                return JSON.stringify({
                    ok: true,
                    source: source.name,
                    sheet: target.name,
                    sheets: sheetNames,
                    columns: result.columns,
                    totalRows: rows.length,
                    totalMatched: result.totalMatched,
                    ...result.aggregate ? {
                        aggregate: result.aggregate
                    } : {},
                    rows: result.rows,
                    ...result.notes.length ? {
                        notes: result.notes
                    } : {}
                });
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message.slice(0, 300) : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 197942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ normalizeWebSearchQuery)
/* harmony export */ });
/* unused harmony export MAX_WEB_SEARCH_QUERY_LENGTH */
/** Ported from OpenMAIC. Original: lib/web-search/utils.ts */ /**
 * Shared utilities for web search providers.
 */ const MAX_WEB_SEARCH_QUERY_LENGTH = 400;
function normalizeWebSearchQuery(query) {
    return query.trim().slice(0, MAX_WEB_SEARCH_QUERY_LENGTH);
}


/***/ }),

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


/***/ }),

/***/ 243349:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ createVideoSceneSearchTool)
/* harmony export */ });
/* unused harmony export VIDEO_SCENE_TOOL_NAMES */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _knowledge_video_scenes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(762053);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_knowledge_video_scenes__WEBPACK_IMPORTED_MODULE_1__]);
_knowledge_video_scenes__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * search_video_scenes — semantic search over the learner's ingested VIDEO
 * library at scene granularity (Stage 3 / Stage 10 roadmap).
 *
 * Unlike search_medical_videos (finds videos ONLINE) and analyze_video
 * material (frame-analyzes ONE clip), this queries the temporal scene
 * index built at ingestion: each hit is a timestamped span
 * (startSec–endSec, mediaTimeSec) with the VLM frame description and the
 * spoken transcript inside that span — so answers can say "at 12:34 the
 * surgeon performs X" and cite the exact moment.
 */ const VIDEO_SCENE_TOOL_NAMES = (/* unused pure expression or super */ null && ([
    'search_video_scenes'
]));
function createVideoSceneSearchTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_video_scenes',
        description: 'Semantic search over the learner\'s UPLOADED/IMPORTED videos (lectures, procedure recordings, screencasts) at SCENE granularity. Each hit is a timestamped span with what was SHOWN (frame description) and what was SAID (transcript) in that span. Use for "what did the video show at 12:34", "find the segment where they intubate", "what was on screen while she explained X". Returns [V#]-cited scenes with mediaTimeSec timestamps. NOT for finding new videos online (use web search for that).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(2).max(2000).describe('What to look for in the video library'),
            source_id: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(5).optional().describe('Restrict the search to one video source id'),
            top_k: zod__WEBPACK_IMPORTED_MODULE_2__/* .number */ .aig().int().min(1).max(20).optional().describe('Max scenes to return (default 6)')
        }),
        func: async ({ query, source_id, top_k })=>{
            try {
                const hits = await (0,_knowledge_video_scenes__WEBPACK_IMPORTED_MODULE_1__/* .searchVideoScenes */ .Hh)(ctx.userId, query, {
                    ...source_id ? {
                        sourceIds: [
                            source_id
                        ]
                    } : {},
                    topK: top_k ?? 6
                });
                if (hits.length === 0) {
                    return JSON.stringify({
                        ok: true,
                        note: 'No video scenes matched. The learner may not have uploaded videos yet — suggest adding one via the Knowledge Library (upload or YouTube link), or fall back to search_knowledge.'
                    });
                }
                const context = (0,_knowledge_video_scenes__WEBPACK_IMPORTED_MODULE_1__/* .formatVideoSceneContext */ .u5)(hits);
                return JSON.stringify({
                    ok: true,
                    context,
                    scenes: hits.map((hit, i)=>({
                            ref: `V${i + 1}`,
                            sourceId: hit.sourceId,
                            sourceName: hit.sourceName,
                            sceneIdx: hit.sceneIdx,
                            mediaTimeSec: Math.round(hit.startSec),
                            startSec: hit.startSec,
                            endSec: hit.endSec,
                            relevance: Math.round(Math.max(hit.score, 0) * 100)
                        })),
                    note: 'Cite these as [V1], [V2] in the answer. When saving a question about a specific moment, pass the scene\'s sourceId + startSec/endSec into save_question.videoScene so the player can deep-link to it.'
                });
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 277092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ searchWithBaidu)
/* harmony export */ });
/* harmony import */ var _lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115812);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(197942);
/** Ported from OpenMAIC. Original: lib/web-search/baidu.ts */ /**
 * Baidu unified search integration.
 *
 * Aggregates the Qianfan web search API, Baidu Baike, and Baidu Scholar behind
 * one provider while allowing each sub-source to be toggled independently.
 */ 


const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('BaiduSearch');
const BAIDU_QIANFAN_BASE_URL = 'https://qianfan.baidubce.com';
const BAIDU_BAIKE_BASE_URL = 'https://appbuilder.baidu.com';
const BAIDU_WEB_SEARCH_PATH = '/v2/ai_search/web_search';
const BAIDU_BAIKE_PATH = '/v2/baike/lemma/get_content';
const BAIDU_SCHOLAR_PATH = '/v2/tools/baidu_scholar/search';
function baiduHeaders(apiKey) {
    return {
        Authorization: `Bearer ${apiKey}`,
        'X-Appbuilder-From': 'openmaic',
        'Content-Type': 'application/json'
    };
}
function buildQianfanUrl(path, baseUrl) {
    return `${(baseUrl || BAIDU_QIANFAN_BASE_URL).replace(/\/+$/, '')}${path}`;
}
function buildBaikeUrl(query) {
    const url = new URL(`${BAIDU_BAIKE_BASE_URL}${BAIDU_BAIKE_PATH}`);
    url.searchParams.set('search_type', 'lemmaTitle');
    url.searchParams.set('search_key', query);
    return url.toString();
}
function buildScholarUrl(query, baseUrl) {
    const url = new URL(buildQianfanUrl(BAIDU_SCHOLAR_PATH, baseUrl));
    url.searchParams.set('wd', query);
    url.searchParams.set('pageNum', '0');
    url.searchParams.set('enable_ai_abstract', 'true');
    return url.toString();
}
function normalizeSubSources(subSources) {
    return {
        webSearch: subSources?.webSearch ?? true,
        baike: subSources?.baike ?? true,
        scholar: subSources?.scholar ?? true
    };
}
async function fetchWebSearch(query, apiKey, maxResults, baseUrl) {
    try {
        const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildQianfanUrl(BAIDU_WEB_SEARCH_PATH, baseUrl), {
            method: 'POST',
            headers: baiduHeaders(apiKey),
            body: JSON.stringify({
                messages: [
                    {
                        content: query,
                        role: 'user'
                    }
                ],
                search_source: 'baidu_search_v2',
                resource_type_filter: [
                    {
                        type: 'web',
                        top_k: maxResults
                    }
                ]
            })
        });
        if (!res.ok) {
            const errorText = await res.text().catch(()=>'');
            log.warn(`[Baidu Web] HTTP ${res.status}: ${errorText || res.statusText}`);
            return [];
        }
        const data = await res.json();
        if (data.code && data.code !== 0) {
            log.warn(`[Baidu Web] API error ${data.code}: ${data.message || 'Request failed'}`);
            return [];
        }
        return (data.references || []).filter((ref)=>ref.url).slice(0, maxResults).map((ref, index)=>({
                title: ref.title || ref.site_name || ref.url || '',
                url: ref.url || '',
                content: ref.content || '',
                score: Number((0.9 - index * 0.05).toFixed(2))
            }));
    } catch (error) {
        log.warn('[Baidu Web] Failed:', error);
        return [];
    }
}
async function fetchBaike(query, apiKey) {
    try {
        const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildBaikeUrl(query), {
            method: 'GET',
            headers: baiduHeaders(apiKey)
        });
        if (!res.ok) {
            const errorText = await res.text().catch(()=>'');
            log.warn(`[Baidu Baike] HTTP ${res.status}: ${errorText || res.statusText}`);
            return [];
        }
        const data = await res.json();
        if (data.errno !== undefined && data.errno !== 0 || !data.result) return [];
        const result = data.result;
        const title = result.lemma_title || query;
        return [
            {
                title: `${title} - Baidu Baike`,
                url: result.lemma_url || `https://baike.baidu.com/item/${encodeURIComponent(query)}`,
                content: result.abstract_text || result.lemma_desc || '',
                score: 0.95
            }
        ];
    } catch (error) {
        log.warn('[Baidu Baike] Failed:', error);
        return [];
    }
}
async function fetchScholar(query, apiKey, maxResults, baseUrl) {
    try {
        const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildScholarUrl(query, baseUrl), {
            method: 'GET',
            headers: baiduHeaders(apiKey)
        });
        if (!res.ok) {
            const errorText = await res.text().catch(()=>'');
            log.warn(`[Baidu Scholar] HTTP ${res.status}: ${errorText || res.statusText}`);
            return [];
        }
        const data = await res.json();
        if (data.code && data.code !== '0') return [];
        return (data.data || []).filter((paper)=>paper.url).slice(0, maxResults).map((paper, index)=>({
                title: paper.title || paper.url || '',
                url: paper.url || '',
                content: [
                    paper.abstract,
                    paper.aiAbstract,
                    paper.publishYear ? `(${paper.publishYear})` : '',
                    paper.keyword
                ].filter(Boolean).join(' '),
                score: Number((0.85 - index * 0.05).toFixed(2))
            }));
    } catch (error) {
        log.warn('[Baidu Scholar] Failed:', error);
        return [];
    }
}
async function searchWithBaidu(params) {
    const { query: rawQuery, apiKey, maxResults = 10, baseUrl } = params;
    if (!apiKey) throw new Error('Baidu API key is required');
    const query = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .normalizeWebSearchQuery */ .k)(rawQuery);
    const subSources = normalizeSubSources(params.subSources);
    const startedAt = Date.now();
    const [webResults, baikeResults, scholarResults] = await Promise.all([
        subSources.webSearch ? fetchWebSearch(query, apiKey, maxResults, baseUrl) : Promise.resolve([]),
        subSources.baike ? fetchBaike(query, apiKey) : Promise.resolve([]),
        subSources.scholar ? fetchScholar(query, apiKey, 3, baseUrl) : Promise.resolve([])
    ]);
    const seen = new Set();
    const sources = [
        ...baikeResults,
        ...webResults,
        ...scholarResults
    ].filter((source)=>{
        if (!source.url || seen.has(source.url)) return false;
        seen.add(source.url);
        return true;
    });
    return {
        answer: '',
        sources,
        query,
        responseTime: (Date.now() - startedAt) / 1000
    };
}


/***/ }),

/***/ 286155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _4: () => (/* binding */ buildZaiBackupModel),
/* harmony export */   gi: () => (/* binding */ buildFastModel),
/* harmony export */   qW: () => (/* binding */ buildAuxModel)
/* harmony export */ });
/* unused harmony exports fastModelName, AUX_MODEL_TIMEOUT_MS, buildPrimaryEnvModel */
/* harmony import */ var _langchain_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(618093);
/* harmony import */ var _key_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(858701);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(376389);



/** The fast model id when per-task routing is enabled, else null.
 * DISABLED by default since the 2026-10-25 revert — opt in via env. */ function fastModelName() {
    const name = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
    if (!name || /^(off|none|false|disabled)$/i.test(name)) return null;
    return name;
}
/** True when the fast model has an explicitly configured endpoint or key. */ function hasExplicitFastEndpoint() {
    return Boolean((process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim() || (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim());
}
/** True when `primary.baseUrl` is the env-configured gateway the fast model
 * id belongs to (the chain MEDQ_AGENT_API_KEY / OPENAI_API_KEY serves). */ function primaryIsDefaultChain(primary) {
    const gateway = (0,_key_pool__WEBPACK_IMPORTED_MODULE_2__/* .poolBaseUrl */ .j_)();
    if (!gateway) return true; // no env gateway → primary IS the configured chain
    return (0,_key_pool__WEBPACK_IMPORTED_MODULE_2__/* .normalizeBaseUrl */ .qT)(primary.baseUrl) === gateway;
}
/**
 * Build the fast model for this turn, or null when it should be skipped
 * (disabled by env, or the BYOK safety rule above fires). The runtime passes
 * the resolved primary config; standalone callers (chat digest API) omit it
 * and get the env-default chain.
 */ function buildFastModel(primary) {
    const name = fastModelName();
    if (!name) return null;
    const explicit = hasExplicitFastEndpoint();
    if (!explicit && primary && !primaryIsDefaultChain(primary)) {
        // Hand-picked provider cannot be assumed to serve the fast model id.
        return null;
    }
    const baseUrl = (process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim() || primary?.baseUrl || process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const apiKey = (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim() || primary?.apiKey || process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
    if (!apiKey) return null;
    const configuration = {
        baseURL: baseUrl
    };
    if (primary?.defaultHeaders) configuration.defaultHeaders = primary.defaultHeaders;
    return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
        apiKey,
        model: name,
        temperature: 0.3,
        configuration,
        maxRetries: 4,
        // A hung gateway request must error into the retry ladder, not park
        // the turn (the 3-minute no-data stalls).
        timeout: 60000
    });
}
/** Per-request timeout for auxiliary (non-chat-loop) model calls. */ const AUX_MODEL_TIMEOUT_MS = 60000;
/**
 * The ORIGINAL auto model — the env-chain primary (MEDQ_AGENT_* / OPENAI_*),
 * else the managed Z.AI config. This is the same chain the chat runtime's
 * default provider uses, so everything built here behaves exactly like the
 * main agent's Auto selection. Returns null when nothing is configured.
 */ function buildPrimaryEnvModel() {
    const envKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
    if (envKey) {
        return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
            apiKey: envKey,
            model: process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
            temperature: 0.3,
            maxRetries: 2,
            timeout: AUX_MODEL_TIMEOUT_MS,
            configuration: {
                baseURL: (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
            }
        });
    }
    try {
        const zai = (0,_zai__WEBPACK_IMPORTED_MODULE_1__.readConfig)();
        if (zai?.apiKey && zai.baseUrl) {
            const headers = {
                'X-Z-AI-From': 'Z'
            };
            if (zai.token) headers['X-Token'] = zai.token;
            return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
                apiKey: zai.apiKey,
                model: process.env.ZAI_FALLBACK_MODEL || 'glm-4.5',
                temperature: 0.3,
                maxRetries: 2,
                timeout: AUX_MODEL_TIMEOUT_MS,
                configuration: {
                    baseURL: zai.baseUrl,
                    defaultHeaders: headers
                }
            });
        }
    } catch  {
    // fall through — no provider
    }
    return null;
}
/**
 * The model auxiliary tasks should use, in priority order:
 *   1. the explicitly-configured fast model (opt-in per-task routing);
 *   2. the env-chain primary (the auto model — the default since the
 *      2026-10-25 revert);
 *   3. the managed Z.AI backup.
 * Consumers: thread titles, chat unread digests, AI skill drafts, follow-up
 * suggestion generation. Never null when ANY provider is configured.
 */ function buildAuxModel(primary) {
    return buildFastModel(primary) ?? buildPrimaryEnvModel() ?? buildZaiBackupModel();
}
/**
 * The managed Z.AI backup as a ready-to-call model (same chain the chat
 * runtime's 3rd fallback rung uses — readConfig resolves .z-ai-config or the
 * ZAI_API_KEY/ZAI_BASE_URL env pair). Returns null when not configured.
 * Used by the chat digest when the primary gateway is in a sustained 429
 * storm; NOT imported from deep-agent-runtime to avoid a dependency cycle.
 */ function buildZaiBackupModel() {
    let zai = null;
    try {
        zai = (0,_zai__WEBPACK_IMPORTED_MODULE_1__.readConfig)();
    } catch  {
        zai = null;
    }
    if (!zai?.apiKey || !zai.baseUrl) return null;
    const model = process.env.ZAI_FALLBACK_MODEL || 'glm-4.5';
    const headers = {
        'X-Z-AI-From': 'Z'
    };
    if (zai.token) headers['X-Token'] = zai.token;
    return new _langchain_openai__WEBPACK_IMPORTED_MODULE_0__/* .ChatOpenAI */ .Db({
        apiKey: zai.apiKey,
        model,
        temperature: 0.3,
        configuration: {
            baseURL: zai.baseUrl,
            defaultHeaders: headers
        },
        maxRetries: 2,
        timeout: AUX_MODEL_TIMEOUT_MS
    });
}


/***/ }),

/***/ 316570:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ createStudyInsightTools)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _weak_topics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(118428);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__, _weak_topics__WEBPACK_IMPORTED_MODULE_2__]);
([_db__WEBPACK_IMPORTED_MODULE_1__, _weak_topics__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Study-intelligence tools: weakness detection + exam blueprint alignment.
 *
 * analyze_my_weaknesses — surfaces the learner's actual performance data
 * (QuestionAttempt history rolled up by topic AND organ system, plus overall
 * stats) so the agent can ground "what should I focus on?" answers in real
 * numbers instead of guesses, then offer targeted micro-drills via
 * run_question_generation_agent or a recurring schedule_task.
 *
 * get_exam_blueprint — returns the approximate published content
 * distribution for the major exams (USMLE Step 1/2CK/3, NCLEX-RN/PN) so
 * study plans allocate time by what the exam actually weighs, optionally
 * modulated by the learner's measured weak areas.
 */ 



function formatWeakList(items) {
    return items.map((item)=>`- ${item.topic}: ${item.correct}/${item.attempts} correct (${Math.round(item.accuracy * 100)}%)`).join('\n');
}
function createStudyInsightTools(ctx) {
    const analyzeWeaknessesTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'analyze_my_weaknesses',
        description: "Analyze the learner's REAL performance data: quiz-attempt history rolled up by topic and organ system (accuracy, attempt counts) plus overall stats. Use whenever they ask what to focus on, how they're doing, or for ANY personalized study plan — then offer targeted actions: a micro-drill via run_question_generation_agent on their worst topics, or a recurring schedule_task (e.g. weekly weak-topic quiz). Do not guess weaknesses from conversation alone when this tool can measure them.",
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            limit: zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().min(3).max(10).optional().describe('Max weak topics/systems to return, default 6')
        }),
        func: async ({ limit = 6 })=>{
            if (!ctx.userId || ctx.userId === 'guest') {
                return JSON.stringify({
                    error: 'Weakness analysis requires a signed-in account with quiz history.',
                    note: 'Ask the learner to sign in, or proceed with a balanced topic mix instead.'
                });
            }
            try {
                const [weakTopics, weakSystems, recentAttempts] = await Promise.all([
                    (0,_weak_topics__WEBPACK_IMPORTED_MODULE_2__/* .getWeakTopics */ .ZR)(ctx.userId, limit, 2),
                    (0,_weak_topics__WEBPACK_IMPORTED_MODULE_2__/* .getWeakSystems */ .TM)(ctx.userId, Math.min(limit, 5), 2),
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.questionAttempt.findMany({
                        where: {
                            userId: ctx.userId
                        },
                        select: {
                            isCorrect: true,
                            createdAt: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 100
                    })
                ]);
                const recentWindow = recentAttempts.slice(0, 30);
                const recentAccuracy = recentWindow.length > 0 ? recentWindow.filter((a)=>a.isCorrect).length / recentWindow.length : null;
                const hasHistory = recentAttempts.length > 0;
                return JSON.stringify({
                    analyzed: true,
                    hasHistory,
                    overall: {
                        totalAttempts: recentAttempts.length,
                        last30AttemptsAccuracy: recentAccuracy === null ? null : Math.round(recentAccuracy * 100) / 100
                    },
                    weakestTopics: weakTopics.map((t)=>({
                            topic: t.topic,
                            attempts: t.attempts,
                            accuracy: Math.round(t.accuracy * 100) / 100
                        })),
                    weakestSystems: weakSystems.map((t)=>({
                            system: t.topic,
                            attempts: t.attempts,
                            accuracy: Math.round(t.accuracy * 100) / 100
                        })),
                    note: hasHistory ? 'Grounded in real attempt data. Recommended follow-ups: (1) offer a micro-drill — run_question_generation_agent on the top 2-3 weakest topics; (2) offer a recurring weekly schedule_task on weak topics; (3) when building study plans, weight these areas heavier. Present the numbers to the learner transparently.' : 'The learner has no quiz attempts yet — there is nothing to measure. Recommend they take a diagnostic quiz first (offer to generate one on a broad topic mix), then re-analyze.',
                    formatted: hasHistory ? `Weakest topics:\n${formatWeakList(weakTopics)}\nWeakest systems:\n${formatWeakList(weakSystems)}` : ''
                });
            } catch (error) {
                return JSON.stringify({
                    analyzed: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const blueprintTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'get_exam_blueprint',
        description: 'Get the approximate published content distribution (what % of the exam each area carries) for USMLE Step 1 / Step 2 CK / Step 3, NCLEX-RN, or NCLEX-PN. Use for ANY exam-study-planning request: allocate study weeks proportional to these weights, boosted further for the learner\'s measured weak areas (combine with analyze_my_weaknesses when available).',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            exam: zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n([
                'usmle-step1',
                'usmle-step2ck',
                'usmle-step3',
                'nclex-rn',
                'nclex-pn'
            ]).describe('Which exam blueprint to load'),
            weeksAvailable: zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().min(1).max(104).optional().describe('Total study weeks — when given, the tool returns a suggested per-area week allocation')
        }),
        func: async ({ exam, weeksAvailable })=>{
            const blueprint = EXAM_BLUEPRINTS[exam];
            if (!blueprint) {
                return JSON.stringify({
                    error: `Unknown exam "${exam}". Supported: usmle-step1, usmle-step2ck, usmle-step3, nclex-rn, nclex-pn.`
                });
            }
            const areas = blueprint.areas.map((area)=>({
                    area: area.label,
                    weightPercent: area.mid,
                    rangePercent: area.range
                }));
            let allocation;
            if (weeksAvailable && weeksAvailable > 0) {
                // Proportional allocation with a floor: no area gets less than 1 week
                // (rounds are largest-remainder so the total is exact).
                const rawShares = blueprint.areas.map((area)=>area.mid / blueprint.totalMid);
                const floors = rawShares.map(()=>1);
                const remaining = weeksAvailable - blueprint.areas.length;
                if (remaining >= 0) {
                    allocation = largestRemainderSplit(remaining, rawShares).map((extra, index)=>({
                            area: blueprint.areas[index].label,
                            weeks: floors[index] + extra,
                            reason: `${blueprint.areas[index].mid}% of the exam`
                        }));
                } else {
                    // Fewer weeks than areas: pure proportional split.
                    allocation = largestRemainderSplit(weeksAvailable, rawShares).map((weeks, index)=>({
                            area: blueprint.areas[index].label,
                            weeks,
                            reason: `${blueprint.areas[index].mid}% of the exam`
                        }));
                }
            }
            return JSON.stringify({
                exam: blueprint.name,
                areas,
                suggestedWeekAllocation: allocation,
                note: 'Approximate published content distribution (midpoints of official ranges). ALWAYS tell the learner to verify against the current official test plan (USMLE.org / NCSBN) before committing weeks. When you also have weakness data (analyze_my_weaknesses), shift 1-2 weeks from their strongest high-weight areas toward weak high-weight areas. Sequence suggestion: foundational/high-weight areas early, weakest areas getting two passes (learn + revisit), final 1-2 weeks for review + practice questions.'
            });
        }
    });
    return [
        analyzeWeaknessesTool,
        blueprintTool
    ];
}
/** Split `total` into integer parts proportional to `shares` (largest-remainder). */ function largestRemainderSplit(total, shares) {
    const sum = shares.reduce((acc, share)=>acc + share, 0);
    if (sum <= 0 || total <= 0) return shares.map(()=>0);
    const raw = shares.map((share)=>share / sum * total);
    const base = raw.map((value)=>Math.floor(value));
    let remainder = total - base.reduce((acc, value)=>acc + value, 0);
    const order = raw.map((value, index)=>({
            index,
            frac: value - Math.floor(value)
        })).sort((a, b)=>b.frac - a.frac);
    let cursor = 0;
    while(remainder > 0 && order.length > 0){
        base[order[cursor % order.length].index] += 1;
        remainder -= 1;
        cursor += 1;
    }
    return base;
}
const EXAM_BLUEPRINTS = {
    'usmle-step1': {
        name: 'USMLE Step 1',
        areas: [
            {
                label: 'General Principles of Foundational Science (biochem, cell bio, genetics, immunology basics)',
                mid: 14,
                range: '12-16%'
            },
            {
                label: 'Blood & Lymphoreticular / Immune Systems',
                mid: 9,
                range: '7-11%'
            },
            {
                label: 'Behavioral Health & Nervous System / Special Senses',
                mid: 13,
                range: '11-15%'
            },
            {
                label: 'Musculoskeletal, Skin & Subcutaneous Tissue',
                mid: 11,
                range: '9-13%'
            },
            {
                label: 'Cardiovascular System',
                mid: 10,
                range: '8-12%'
            },
            {
                label: 'Respiratory & Renal/Urinary Systems',
                mid: 17,
                range: '14-20%'
            },
            {
                label: 'Gastrointestinal System',
                mid: 9,
                range: '7-11%'
            },
            {
                label: 'Pregnancy, Childbirth & the Reproductive System',
                mid: 7,
                range: '5-9%'
            },
            {
                label: 'Endocrine System',
                mid: 8,
                range: '6-10%'
            },
            {
                label: 'Multisystem Processes & Disorders',
                mid: 8,
                range: '6-10%'
            }
        ],
        totalMid: 106
    },
    'usmle-step2ck': {
        name: 'USMLE Step 2 CK',
        areas: [
            {
                label: 'Internal Medicine (incl. subspecialties)',
                mid: 55,
                range: '48-62%'
            },
            {
                label: 'Surgery',
                mid: 20,
                range: '15-25%'
            },
            {
                label: 'Pediatrics',
                mid: 12,
                range: '8-16%'
            },
            {
                label: 'Obstetrics & Gynecology',
                mid: 10,
                range: '6-14%'
            },
            {
                label: 'Psychiatry',
                mid: 8,
                range: '5-11%'
            }
        ],
        totalMid: 105
    },
    'usmle-step3': {
        name: 'USMLE Step 3',
        areas: [
            {
                label: 'General Internal Medicine & subspecialties',
                mid: 60,
                range: '55-65%'
            },
            {
                label: 'Surgery & surgical subspecialties',
                mid: 10,
                range: '8-12%'
            },
            {
                label: 'Pediatrics',
                mid: 10,
                range: '8-12%'
            },
            {
                label: 'Obstetrics & Gynecology',
                mid: 10,
                range: '8-12%'
            },
            {
                label: 'Psychiatry',
                mid: 8,
                range: '5-10%'
            },
            {
                label: 'Preventive Medicine & Population Health',
                mid: 5,
                range: '3-7%'
            }
        ],
        totalMid: 103
    },
    'nclex-rn': {
        name: 'NCLEX-RN (Client Need categories, 2023 test plan)',
        areas: [
            {
                label: 'Management of Care',
                mid: 18,
                range: '15-21%'
            },
            {
                label: 'Safety and Infection Control',
                mid: 13,
                range: '10-16%'
            },
            {
                label: 'Health Promotion and Maintenance',
                mid: 9,
                range: '6-12%'
            },
            {
                label: 'Psychosocial Integrity',
                mid: 10,
                range: '7-13%'
            },
            {
                label: 'Basic Care and Comfort',
                mid: 9,
                range: '6-12%'
            },
            {
                label: 'Pharmacological and Parenteral Therapies',
                mid: 15,
                range: '12-18%'
            },
            {
                label: 'Reduction of Risk Potential',
                mid: 12,
                range: '9-15%'
            },
            {
                label: 'Physiological Adaptation',
                mid: 14,
                range: '11-17%'
            }
        ],
        totalMid: 100
    },
    'nclex-pn': {
        name: 'NCLEX-PN (Client Need categories, 2020 test plan)',
        areas: [
            {
                label: 'Coordinated Care',
                mid: 18,
                range: '14-22%'
            },
            {
                label: 'Safety and Infection Control',
                mid: 13,
                range: '10-16%'
            },
            {
                label: 'Health Promotion and Maintenance',
                mid: 9,
                range: '6-12%'
            },
            {
                label: 'Psychosocial Integrity',
                mid: 11,
                range: '8-14%'
            },
            {
                label: 'Basic Care and Comfort',
                mid: 10,
                range: '7-13%'
            },
            {
                label: 'Pharmacological Therapies',
                mid: 15,
                range: '11-19%'
            },
            {
                label: 'Reduction of Risk Potential',
                mid: 12,
                range: '9-15%'
            },
            {
                label: 'Physiological Adaptation',
                mid: 12,
                range: '9-15%'
            }
        ],
        totalMid: 100
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 318958:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ digestUnreadMessages)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(286155);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const CHUNK_SIZE = 40;
function formatTimestamp(date) {
    const pad = (value)=>String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
/** Robustly pull a JSON object out of a model reply (handles ```json fences
 * and trailing prose). */ function parseJsonObject(text) {
    const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
    const candidate = fenced ? fenced[1] : text;
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start < 0 || end <= start) return null;
    try {
        const parsed = JSON.parse(candidate.slice(start, end + 1));
        return typeof parsed === 'object' && parsed !== null ? parsed : null;
    } catch  {
        return null;
    }
}
function coerceEvents(raw) {
    if (!Array.isArray(raw)) return [];
    const allowed = [
        'meeting',
        'exam',
        'deadline',
        'schedule_change',
        'announcement',
        'other'
    ];
    const events = [];
    for (const item of raw.slice(0, 25)){
        if (typeof item !== 'object' || item === null) continue;
        const record = item;
        const title = typeof record.title === 'string' ? record.title.trim() : '';
        if (!title) continue;
        events.push({
            type: allowed.includes(record.type) ? record.type : 'other',
            title: title.slice(0, 140),
            when: typeof record.when === 'string' ? record.when.slice(0, 80) : undefined,
            who: typeof record.who === 'string' ? record.who.slice(0, 60) : undefined,
            detail: typeof record.detail === 'string' ? record.detail.slice(0, 240) : undefined,
            messageId: typeof record.messageId === 'string' ? record.messageId : undefined
        });
    }
    return events;
}
const CHUNK_SYSTEM = [
    'You summarize one chunk of a group chat for a busy medical student.',
    'Return ONLY a JSON object: {"summary": string, "events": array}.',
    'summary: <=90 words, factual, names who said what matters.',
    'events: only REAL scheduled things found in THIS chunk — meetings, exams, quizzes, deadlines, schedule changes, official announcements.',
    'Each event: {"type": "meeting|exam|deadline|schedule_change|announcement|other", "title": short, "when": date/time EXACTLY as stated, "who": who it concerns, "detail": one line, "messageId": the id given for the message it came from}.',
    'No event if nothing scheduled appears. Never invent dates, times or events.'
].join('\n');
const REDUCE_SYSTEM = [
    'You merge partial chat digests into ONE final digest for a busy medical student.',
    'Return ONLY a JSON object: {"digest": string, "events": array}.',
    'digest: markdown with sections "## Overview" (3-4 sentences), "## Key topics" (bullets), "## Decisions & answers" (bullets, who decided), "## Needs your attention" (questions asked to the student, action items).',
    'events: the MERGED, deduplicated event list from all chunks (same shape: type/title/when/who/detail/messageId). Keep the most precise "when".',
    'Stay strictly faithful to the partial digests — no new facts.'
].join('\n');
/** One map step: summarize one chunk on the fast model. */ async function summarizeChunk(model, roomName, lines, messageIds) {
    const numbered = lines.map((line, index)=>`${messageIds[index]} · ${line}`).join('\n');
    const response = await invokeWithRetry(model, [
        {
            role: 'system',
            content: CHUNK_SYSTEM
        },
        {
            role: 'user',
            content: `Room: "${roomName}". Messages (id · [time] Sender: text):\n\n${numbered}`
        }
    ]);
    const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    const parsed = parseJsonObject(text);
    if (!parsed) {
        return {
            summary: text.slice(0, 600),
            events: []
        };
    }
    return {
        summary: typeof parsed.summary === 'string' ? parsed.summary : '',
        events: coerceEvents(parsed.events)
    };
}
function dedupeEvents(events) {
    const seen = new Map();
    for (const event of events){
        const key = `${event.type}|${event.title.toLowerCase().slice(0, 60)}`;
        if (!seen.has(key)) seen.set(key, event);
    }
    return Array.from(seen.values()).slice(0, 20);
}
/** Rate-limit-resilient invoke: the shared gateway storms transiently (429
 * "Too many requests" wrapping) — retrying after a short backoff usually
 * clears it. When the primary stays saturated, the managed Z.AI backup
 * (same 3rd rung as the chat runtime's ladder) takes the final attempt. */ async function invokeWithRetry(model, messages, attempts = 3) {
    let lastError;
    let rateLimited = false;
    for(let attempt = 0; attempt < attempts; attempt += 1){
        try {
            return await model.invoke(messages);
        } catch (error) {
            lastError = error;
            const text = error instanceof Error ? error.message : String(error);
            rateLimited = /429|rate.?limit|too many requests|all models exhausted/i.test(text);
            if (!rateLimited) throw error; // non-rate errors propagate unchanged
            if (attempt < attempts - 1) {
                await new Promise((resolve)=>setTimeout(resolve, 8000 * (attempt + 1)));
            }
        }
    }
    // All attempts rate-limited → final rung: the Z.AI backup endpoint.
    if (rateLimited) {
        const backup = (0,_lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__/* .buildZaiBackupModel */ ._4)();
        if (backup) {
            return await backup.invoke(messages);
        }
    }
    throw lastError;
}
/** The reduce step: merge chunk digests into the final digest + events. */ async function mergeDigests(model, roomName, chunks) {
    const parts = chunks.map((chunk, index)=>`### Part ${index + 1}\n${chunk.summary || '(no summary)'}\nEvents: ${JSON.stringify(chunk.events)}`).join('\n\n');
    const response = await invokeWithRetry(model, [
        {
            role: 'system',
            content: REDUCE_SYSTEM
        },
        {
            role: 'user',
            content: `Room: "${roomName}". Partial digests:\n\n${parts}`
        }
    ]);
    const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    const parsed = parseJsonObject(text);
    if (!parsed) {
        // Fall back to mechanical merge — still useful, never a dead end.
        return {
            summary: chunks.map((chunk)=>chunk.summary).filter(Boolean).join('\n\n'),
            events: dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
        };
    }
    const mergedEvents = coerceEvents(parsed.events);
    return {
        summary: typeof parsed.digest === 'string' ? parsed.digest : '',
        events: mergedEvents.length > 0 ? mergedEvents : dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
    };
}
async function digestUnreadMessages(options) {
    const { userId, roomId, signal } = options;
    const maxMessages = Math.min(Math.max(options.maxMessages ?? 600, 20), 1000);
    const membership = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatRoomMember.findUnique({
        where: {
            roomId_userId: {
                roomId,
                userId
            }
        },
        include: {
            room: {
                select: {
                    id: true,
                    name: true,
                    type: true
                }
            }
        }
    });
    if (!membership) throw new Error('Not a member of that room');
    const room = membership.room;
    const cutoff = options.since ?? membership.lastReadAt;
    const unreadWhere = {
        roomId,
        senderId: {
            not: userId
        },
        isDeleted: false,
        createdAt: {
            gt: cutoff
        }
    };
    const [totalUnread, rows] = await Promise.all([
        _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatMessage.count({
            where: unreadWhere
        }),
        _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.chatMessage.findMany({
            where: unreadWhere,
            include: {
                sender: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: maxMessages
        })
    ]);
    if (rows.length === 0) {
        return {
            roomId,
            roomName: room.name || 'Direct message',
            totalUnread: 0,
            analyzed: 0,
            skippedOldest: 0,
            digest: options.since ? `No messages from others in that time window.` : 'No unread messages in this room.',
            events: [],
            model: 'none'
        };
    }
    const skippedOldest = Math.max(totalUnread - rows.length, 0);
    // Aux model ladder: explicitly-passed model (agent runtime) → fast model
    // (opt-in) → env-chain primary (the auto model) → Z.AI backup. With the
    // routing revert, this is the SAME model the chat loop uses.
    const model = options.model ?? (0,_lib_agent_provider_fast_model__WEBPACK_IMPORTED_MODULE_1__/* .buildAuxModel */ .qW)() ?? null;
    const roomName = room.type === 'group' ? room.name || 'the group' : 'this conversation';
    const lines = rows.map((row)=>{
        const text = (row.content || `[${row.type}]`).replace(/\s+/g, ' ').slice(0, 400);
        return `[${formatTimestamp(row.createdAt)}] ${row.sender?.name ?? 'Someone'}: ${text}`;
    });
    const messageIds = rows.map((row)=>row.id);
    let chunks;
    if (!model) {
        // No LLM configured — mechanical fallback: newest 25 messages verbatim.
        const newest = lines.slice(-25);
        chunks = [
            {
                summary: `No summarization model is configured. Latest unread messages:\n\n${newest.join('\n')}`,
                events: []
            }
        ];
    } else {
        const chunkPromises = [];
        for(let start = 0; start < lines.length; start += CHUNK_SIZE){
            chunkPromises.push(summarizeChunk(model, roomName, lines.slice(start, start + CHUNK_SIZE), messageIds.slice(start, start + CHUNK_SIZE)));
        }
        chunks = await Promise.all(chunkPromises);
        if (signal?.aborted) throw new Error('Digest aborted');
    }
    const merged = chunks.length > 1 && model ? await mergeDigests(model, roomName, chunks) : {
        summary: chunks[0]?.summary ?? '',
        events: dedupeEvents(chunks.flatMap((chunk)=>chunk.events))
    };
    const header = skippedOldest > 0 ? `> Note: you have ${totalUnread} unread messages; the ${skippedOldest} oldest were beyond the digest window (${rows.length} analyzed, newest prioritized).\n\n` : '';
    return {
        roomId,
        roomName: room.name || 'Direct message',
        totalUnread,
        analyzed: rows.length,
        skippedOldest,
        digest: `${header}${merged.summary}`,
        events: merged.events,
        model: model ? String(model.model ?? 'fast-model') : 'fallback'
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 319796:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ subscribeClarifications),
/* harmony export */   f: () => (/* binding */ createAskUserTool)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(971890);
/* harmony import */ var _clarification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(548875);
/**
 * ask_user — the agent's STRUCTURED clarification tool.
 *
 * "When the agent needs more information" the model used to ask in plain
 * prose, which forced the learner to type free-text answers. This tool
 * renders the question as an INTERACTIVE FORM (checkboxes, radio choices,
 * dropdowns, text fields) in the chat panel instead:
 *
 *   1. the model calls ask_user with { question, inputs[] } (zod-validated
 *      by the shared contract in ../clarification.ts);
 *   2. the tool publishes the payload on an in-process bus (mirroring the
 *      HITL approval bus) and returns immediately — it does NOT block;
 *   3. streamMedQDeepAgent subscribes to the bus and forwards the payload
 *      to the SSE client as a `clarification_required` event;
 *   4. the chat renders the form card; the learner submits (or skips);
 *   5. the answers are formatted by formatClarificationAnswers and sent as
 *      the NEXT USER MESSAGE — so history, the thread store, and every
 *      recovery path keep working unchanged.
 *
 * The tool result tells the model to END ITS TURN and wait; the answers
 * arrive as a fresh user message on the next run.
 */ 


const globalForClarifications = globalThis;
const listeners = globalForClarifications.__medqClarificationListeners ?? new Set();
globalForClarifications.__medqClarificationListeners = listeners;
/** Subscribe to new clarification requests (the runtime forwards them to SSE). */ function subscribeClarifications(listener) {
    listeners.add(listener);
    return ()=>listeners.delete(listener);
}
function createAskUserTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__/* .DynamicStructuredTool */ .XW({
        name: 'ask_user',
        description: 'Ask the learner a question as an INTERACTIVE FORM (checkboxes, choice buttons, dropdowns, text fields). Use this INSTEAD OF asking any question in plain text — whenever you need scope, preferences, a choice between options, or missing parameters before proceeding. ' + 'List the concrete choices as multiselect/radio options with value/label pairs; use text fields only for genuinely free-form input. ' + 'After calling it, END YOUR TURN — the learner answers through the form and their answers arrive as the next message. ' + 'If the request is already clear, do not call this. Never call it twice in one turn.',
        schema: _clarification__WEBPACK_IMPORTED_MODULE_2__/* .askUserSchema */ .o_,
        func: async (args)=>{
            const payload = (0,_clarification__WEBPACK_IMPORTED_MODULE_2__/* .normalizeClarificationPayload */ .GP)({
                ...args,
                clarificationId: `clar-${(0,crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID)().slice(0, 18)}`
            });
            if (!payload) {
                return JSON.stringify({
                    displayed: false,
                    error: 'Invalid clarification form (no usable inputs) — ask the question in plain text instead.'
                });
            }
            const bus = {
                ...payload,
                userId: ctx.userId,
                ...ctx.threadId ? {
                    threadId: ctx.threadId
                } : {}
            };
            for (const listener of listeners){
                try {
                    listener(bus);
                } catch  {
                // one broken subscriber must not break the tool
                }
            }
            return JSON.stringify({
                displayed: true,
                question: payload.question,
                fields: payload.inputs.length,
                guidance: 'The interactive question form is now shown to the learner. ' + 'END YOUR TURN NOW with no further tool calls — do not answer for them, do not re-ask in text. ' + 'Their answers will arrive as the next user message; continue from those.'
            });
        }
    });
}


/***/ }),

/***/ 343753:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ sendPushForNotification),
/* harmony export */   sendPushToUser: () => (/* binding */ sendPushToUser)
/* harmony export */ });
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68342);
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web_push__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Web Push server-side helper.
 *
 * Wraps the `web-push` library with MedQ's VAPID config and Prisma
 * PushSubscription storage. Used by:
 *   - /api/push/subscribe   (client subscribes a new device)
 *   - /api/push/unsubscribe (client removes a device)
 *   - /api/push/send        (admin/debug: send to one user)
 *   - sendPushForNotification() (auto-called whenever a Notification is created)
 *
 * VAPID keys are read from env (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
 * VAPID_SUBJECT). If any are missing, push is disabled — functions become
 * no-ops and return a `disabled` status, so the rest of the app keeps working.
 */ 

let configured = false;
function ensureConfigured() {
    if (configured) return true;
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT || 'mailto:admin@medq.local';
    if (!publicKey || !privateKey) {
        return false;
    }
    web_push__WEBPACK_IMPORTED_MODULE_0___default().setVapidDetails(subject, publicKey, privateKey);
    configured = true;
    return true;
}
/**
 * Send a push notification to ALL of a user's subscribed devices.
 * Returns per-subscription outcomes so callers can prune dead subscriptions.
 */ async function sendPushToUser(userId, payload) {
    if (!ensureConfigured()) {
        // Push not configured — silently no-op. Callers should still create the
        // Notification row in the DB so it shows up in the in-app bell.
        return {
            sent: 0,
            failed: 0,
            total: 0,
            disabled: true
        };
    }
    const subs = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.pushSubscription.findMany({
        where: {
            userId
        }
    });
    if (subs.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0
        };
    }
    const message = JSON.stringify({
        title: payload.title,
        body: payload.body,
        url: payload.url || '/',
        icon: payload.icon || '/icons/icon-192.png',
        badge: payload.badge || '/icons/icon-192.png',
        tag: payload.tag || 'medq-notification',
        data: payload.data || {}
    });
    const staleEndpoints = [];
    let sent = 0;
    let failed = 0;
    await Promise.all(subs.map(async (sub)=>{
        const wpSub = {
            endpoint: sub.endpoint,
            keys: {
                p256dh: sub.p256dh,
                auth: sub.auth
            }
        };
        try {
            await web_push__WEBPACK_IMPORTED_MODULE_0___default().sendNotification(wpSub, message);
            sent++;
        } catch (err) {
            failed++;
            // 404 = subscription expired, 410 = subscription deleted, 413 = payload too large (config error)
            // In all these cases the subscription is dead and should be removed.
            const status = err?.statusCode;
            if (status === 404 || status === 410 || status === 400) {
                staleEndpoints.push(sub.endpoint);
            }
        // 429 (rate limit) and 5xx are transient — leave the subscription alone.
        }
    }));
    // Prune dead subscriptions in the background (don't block the response).
    if (staleEndpoints.length > 0) {
        _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.pushSubscription.deleteMany({
            where: {
                endpoint: {
                    in: staleEndpoints
                }
            }
        }).catch(()=>{
        // Best-effort cleanup — failures here don't matter.
        });
    }
    return {
        sent,
        failed,
        total: subs.length
    };
}
/**
 * Convenience: send a push notification matching an in-app Notification row.
 * Called from notification creation sites (friends, posts, groups, etc.) so
 * users on mobile get a real system notification even when the tab is closed.
 */ async function sendPushForNotification(notificationId) {
    try {
        const n = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.notification.findUnique({
            where: {
                id: notificationId
            },
            select: {
                id: true,
                userId: true,
                type: true,
                title: true,
                message: true,
                referenceId: true
            }
        });
        if (!n) return;
        // Map notification types to deep-link URLs.
        // For chat-related notifications, `referenceId` may encode the
        // `<roomId>:<messageId>` pair — if so, we deep-link directly to the
        // specific message so the recipient lands on the conversation context
        // instead of just the Messages tab.
        const chatDeepLink = (()=>{
            if (!n.referenceId) return null;
            // referenceId format: `<roomId>:<messageId>` (set by chat mention
            // notification creators). Anything else falls back to /messages.
            const parts = n.referenceId.split(':');
            if (parts.length === 2 && parts[0] && parts[1]) {
                return `/messages?room=${parts[0]}&msg=${parts[1]}`;
            }
            if (parts.length === 1 && parts[0]) {
                return `/messages?room=${parts[0]}`;
            }
            return null;
        })();
        const urlForType = {
            friend_request: '/friends',
            challenge: '/challenge-arena',
            group_invite: '/groups',
            post_like: '/feed',
            post_comment: '/feed',
            mention: chatDeepLink || '/feed',
            chat_mention: chatDeepLink || '/messages',
            chat_reply: chatDeepLink || '/messages',
            chat_message: chatDeepLink || '/messages',
            achievement: '/achievements',
            system: '/',
            daily_challenge: '/daily-challenge',
            study_reminder: '/dashboard'
        };
        await sendPushToUser(n.userId, {
            title: n.title || 'MedQ',
            body: n.message,
            url: urlForType[n.type] || '/',
            tag: `medq-${n.type}`,
            data: {
                notificationId: n.id,
                type: n.type,
                referenceId: n.referenceId
            }
        });
    } catch (err) {
        // Push failures must never break the calling API route.
        console.error('[push] sendPushForNotification failed:', err);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 384098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ searchWithTavily)
/* harmony export */ });
/* harmony import */ var _lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115812);
/** Ported from OpenMAIC. Original: lib/web-search/tavily.ts */ /**
 * Tavily Web Search Integration
 *
 * Uses raw REST API via proxyFetch for reliable proxy support.
 * Tavily search endpoint: POST https://api.tavily.com/search
 */ 

const TAVILY_DEFAULT_BASE_URL = 'https://api.tavily.com';
const TAVILY_MAX_QUERY_LENGTH = 400;
function buildTavilySearchUrl(baseUrl) {
    const trimmed = (baseUrl || TAVILY_DEFAULT_BASE_URL).replace(/\/$/, '');
    return trimmed.endsWith('/search') ? trimmed : `${trimmed}/search`;
}
/**
 * Search the web using Tavily REST API and return structured results.
 */ async function searchWithTavily(params) {
    const { query, apiKey, maxResults = 5, baseUrl } = params;
    // Tavily rejects queries over 400 characters with a 400 error
    const truncatedQuery = query.slice(0, TAVILY_MAX_QUERY_LENGTH);
    const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildTavilySearchUrl(baseUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            query: truncatedQuery,
            search_depth: 'basic',
            max_results: maxResults,
            include_answer: 'basic'
        })
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>'');
        throw new Error(`Tavily API error (${res.status}): ${errorText || res.statusText}`);
    }
    const data = await res.json();
    const sources = (data.results || []).map((r)=>({
            title: r.title,
            url: r.url,
            content: r.content,
            score: r.score
        }));
    return {
        answer: data.answer || '',
        sources,
        query: data.query,
        responseTime: data.response_time
    };
}


/***/ }),

/***/ 404643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* binding */ createVideoGenerationTool),
/* harmony export */   G6: () => (/* binding */ createImageSearchTool),
/* harmony export */   UN: () => (/* binding */ createImageEditTool),
/* harmony export */   Wq: () => (/* binding */ createVideoAnalysisTool),
/* harmony export */   lg: () => (/* binding */ createAudioTranscriptionTool),
/* harmony export */   m3: () => (/* binding */ createVideoSearchTool),
/* harmony export */   tc: () => (/* binding */ createSpeechSynthesisTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(993958);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(376389);
/* harmony import */ var _lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(476149);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/* harmony import */ var _attachment_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(544852);
/* harmony import */ var _lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(204399);
/* harmony import */ var _image_cache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(937817);









const log = (0,_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('AgentMedia');
/**
 * Media tools — image editing, real-image search, audio transcription and
 * synthesis, and video analysis/generation.
 *
 * Ported from the reference Deep Agent platform's media tool suite
 * (edit_image / search_images / text_to_speech / speech_to_text /
 * analyze_video / generate_video), rebuilt on the z-ai-web-dev-sdk and
 * MedQ's durable-artifact pipeline.
 */ function artifactResult(artifact, filename) {
    return JSON.stringify({
        created: true,
        artifact: {
            id: artifact.id,
            name: artifact.name,
            filename,
            downloadUrl: artifact.downloadUrl,
            previewUrl: artifact.url,
            mimeType: artifact.mimeType,
            kind: artifact.kind
        },
        note: 'Media saved. Reference it in your final answer.'
    });
}
function errorResult(error) {
    return JSON.stringify({
        created: false,
        error: error instanceof Error ? error.message : String(error)
    });
}
// ─── Image editing ────────────────────────────────────────────────────────
function createImageEditTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'edit_medical_illustration',
        description: 'Edit or transform an existing image with AI: recolor a diagram, add labels, simplify for slides, or adapt an illustration. The source image can be an attachment:// reference to an image the user uploaded, or a URL from a previous generate_medical_illustration result.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            prompt: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(10).describe('The edit to apply, e.g. "add English labels to each nephron segment"'),
            image_url: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(5).describe('Source image: an attachment:// reference to the user\'s uploaded image, or a URL from a previous generate_medical_illustration result'),
            filename: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().max(80).optional().describe('Output file base name')
        }),
        func: async ({ prompt, image_url, filename })=>{
            // Resolve attachment:// refs (and reject stale bare filenames with a
            // helpful error instead of the gateway 400ing on "photo.png").
            let sourceUrl;
            try {
                sourceUrl = (0,_attachment_registry__WEBPACK_IMPORTED_MODULE_4__.resolveAttachmentInput)(image_url, 'image');
            } catch (error) {
                return errorResult(error);
            }
            try {
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                const response = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.images.generations.edit({
                        prompt,
                        images: [
                            {
                                url: sourceUrl
                            }
                        ],
                        size: '1024x1024'
                    }), {
                    label: 'edit_medical_illustration'
                });
                const base64 = response?.data?.[0]?.base64;
                if (!base64) return JSON.stringify({
                    created: false,
                    error: 'Image editing returned no data'
                });
                const base = (filename ?? 'edited-illustration').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 60);
                const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                    userId: ctx.userId,
                    name: base,
                    kind: 'image',
                    mimeType: 'image/png',
                    buffer: Buffer.from(base64, 'base64'),
                    meta: {
                        prompt,
                        sourceUrl
                    }
                });
                return artifactResult(artifact, `${base}.png`);
            } catch (error) {
                log.warn?.('edit_medical_illustration failed:', error);
                return errorResult(error);
            }
        }
    });
}
// ─── Real image search ────────────────────────────────────────────────────
function createImageSearchTool() {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_medical_images',
        description: 'Search the web for REAL medical images (anatomy diagrams, histology slides, radiographs, clinical photos, atlases) — use this whenever the user wants to see, find, or search for actual images/pictures/photos online. Returns ranked results with direct image URLs (plus captions, sources, dimensions) — embed the best ones inline as ![caption](imageUrl) and cite the source page with each image you show.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(3).max(200).describe('What to find, e.g. "cardiac muscle histology slide"'),
            count: zod__WEBPACK_IMPORTED_MODULE_7__/* .number */ .aig().int().min(1).max(10).optional().describe('Number of images, default 5')
        }),
        func: async ({ query, count = 5 })=>{
            try {
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                const response = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.images.search.create({
                        query,
                        count
                    }), {
                    label: 'search_medical_images'
                });
                const results = response?.results ?? [];
                if (results.length === 0) return JSON.stringify({
                    found: false,
                    query,
                    note: 'No images found — try a different query.'
                });
                const items = results.map((item, index)=>({
                        index: index + 1,
                        imageUrl: item.original_url ?? '',
                        caption: item.caption ?? 'Image',
                        source: item.source ?? '',
                        dimensions: item.original_width && item.original_height ? `${item.original_width}x${item.original_height}` : undefined
                    }));
                // Cache the top hits locally: external hotlinks rot (CDN token expiry,
                // hotlink protection, page moves) and would render as blank images in
                // the chat. When caching succeeds, imageUrl IS the local copy (the
                // model embeds it as-is — no instruction-following required) and the
                // original moves to sourceUrl for attribution/fallback.
                const cached = await (0,_image_cache__WEBPACK_IMPORTED_MODULE_6__/* .cacheRemoteImages */ .J)(items, 4);
                const cachedByUrl = new Map(cached.filter((c)=>c.cachedUrl).map((c)=>[
                        c.imageUrl,
                        c.cachedUrl
                    ]));
                const itemsWithCache = items.map((item)=>{
                    const local = cachedByUrl.get(item.imageUrl);
                    return {
                        ...item,
                        imageUrl: local ?? item.imageUrl,
                        ...local ? {
                            sourceUrl: item.imageUrl,
                            cached: true
                        } : {
                            cached: false
                        }
                    };
                });
                return JSON.stringify({
                    found: true,
                    query,
                    images: itemsWithCache,
                    note: 'Show the most relevant images inline with their sources. Each imageUrl is a LOCAL copy that always loads — embed it directly as ![caption](imageUrl) and name the original source site next to it. sourceUrl (when present) is the original remote image for attribution; only embed sourceUrl if imageUrl somehow fails.'
                });
            } catch (error) {
                log.warn?.('search_medical_images failed:', error);
                return errorResult(error);
            }
        }
    });
}
// ─── Audio transcription (ASR) ────────────────────────────────────────────
function createAudioTranscriptionTool() {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'transcribe_audio',
        description: 'Transcribe an audio recording to text (lecture recordings, dictations, patient handover audio). Provide the attachment:// reference to audio the user uploaded in this conversation, a direct audio URL (mp3/wav/m4a), or base64 audio data.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            audio_url: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('Audio source: an attachment:// reference to the user\'s uploaded audio, or a direct URL to the audio file'),
            audio_base64: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('Base64-encoded audio data'),
            filename: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('File name of the base64 audio (helps format detection)')
        }),
        func: async ({ audio_url, audio_base64, filename })=>{
            // attachment:// refs resolve to data URLs — decode them straight to a
            // buffer instead of a pointless fetch(data:) round-trip.
            let resolvedName = filename;
            let sourceUrl = audio_url;
            if (audio_url) {
                try {
                    sourceUrl = (0,_attachment_registry__WEBPACK_IMPORTED_MODULE_4__.resolveAttachmentInput)(audio_url, 'audio');
                } catch (error) {
                    return errorResult(error);
                }
            }
            if (!sourceUrl && !audio_base64) {
                return JSON.stringify({
                    transcribed: false,
                    error: 'Provide audio_url or audio_base64'
                });
            }
            try {
                // Materialize the audio bytes from whichever source we got.
                let buffer;
                if (sourceUrl?.startsWith('data:')) {
                    const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(sourceUrl);
                    if (!match) throw new Error('Malformed audio data URL.');
                    buffer = Buffer.from(match[3], 'base64');
                    if (!resolvedName) {
                        const mimeExt = {
                            'audio/wav': 'wav',
                            'audio/x-wav': 'wav',
                            'audio/mpeg': 'mp3',
                            'audio/mp4': 'm4a',
                            'audio/webm': 'webm',
                            'audio/ogg': 'ogg'
                        };
                        resolvedName = mimeExt[match[1]] ? `attachment.${mimeExt[match[1]]}` : 'attachment.wav';
                    }
                } else if (sourceUrl) {
                    const response = await fetch(sourceUrl);
                    if (!response.ok) throw new Error(`Could not fetch audio: HTTP ${response.status}`);
                    buffer = Buffer.from(await response.arrayBuffer());
                } else {
                    buffer = Buffer.from(audio_base64 ?? '', 'base64');
                }
                if (buffer.length === 0) throw new Error('Audio payload is empty.');
                // Primary path: the advanced pipeline (knowledge/audio-pipeline.ts via
                // ingest-media) — loudnorm → VAD silence segmentation → per-segment
                // ASR → [mm:ss] timestamps. Required for anything over the gateway's
                // hard 30-second cap (lecture recordings are typically 30+ minutes)
                // and for non-WAV inputs (mp3/m4a are rejected by the raw gateway).
                try {
                    const { transcribeAudio } = await __webpack_require__.e(/* import() */ 6899).then(__webpack_require__.bind(__webpack_require__, 256899));
                    const result = await transcribeAudio(buffer, {
                        fileName: resolvedName
                    });
                    if (result.text.trim()) {
                        return JSON.stringify({
                            transcribed: true,
                            text: result.text.slice(0, 20000),
                            durationSec: Math.round(result.durationSec),
                            segments: result.segments.slice(0, 60).map((s)=>({
                                    offset: s.offsetSec,
                                    text: s.text.slice(0, 500)
                                })),
                            note: 'Timings [mm:ss] are embedded in the text; use them to cite moments in the lecture.'
                        });
                    }
                } catch (pipelineError) {
                    log.warn?.('transcribe_audio advanced pipeline failed, trying direct ASR:', pipelineError);
                }
                // Fallback: one direct ASR call (works for short WAV/WebM clips).
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                const result = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.audio.asr.create({
                        file_base64: buffer.toString('base64'),
                        ...resolvedName ? {
                            file: resolvedName
                        } : {}
                    }), {
                    label: 'transcribe_audio'
                });
                // Response may be a raw Response object, plain text, or {text} JSON.
                let text;
                if (result instanceof Response) {
                    const raw = await result.text();
                    try {
                        const parsed = JSON.parse(raw);
                        text = parsed.text ?? parsed.result ?? raw;
                    } catch  {
                        text = raw;
                    }
                } else if (typeof result === 'string') {
                    text = result;
                } else {
                    const obj = result;
                    text = obj?.text ?? obj?.result ?? JSON.stringify(result);
                }
                return JSON.stringify({
                    transcribed: true,
                    text: text.slice(0, 20000)
                });
            } catch (error) {
                log.warn?.('transcribe_audio failed:', error);
                return errorResult(error);
            }
        }
    });
}
// ─── Speech synthesis (TTS) ───────────────────────────────────────────────
function splitTextChunks(text, maxLen) {
    const chunks = [];
    let remaining = text.trim();
    while(remaining.length > 0){
        if (remaining.length <= maxLen) {
            chunks.push(remaining);
            break;
        }
        let cut = remaining.lastIndexOf(' ', maxLen);
        if (cut <= 0) cut = maxLen;
        chunks.push(remaining.slice(0, cut));
        remaining = remaining.slice(cut).trim();
    }
    return chunks;
}
/**
 * Normalize a TTS API response into an audio Buffer.
 *
 * The ZAI gateway rejects response_format "mp3" (error 1214) and returns
 * wav/pcm as a raw fetch Response object — this handles every shape the SDK
 * may return (Response, Buffer, base64 string, {audio} object).
 */ async function ttsResponseToBuffer(response) {
    if (response == null) return null;
    // Raw fetch Response (wav / pcm formats on this gateway)
    if (typeof response.arrayBuffer === 'function' && response.status !== undefined) {
        const res = response;
        if (!res.ok) return null;
        const arrayBuffer = await res.arrayBuffer();
        if (arrayBuffer.byteLength > 0) return Buffer.from(arrayBuffer);
        return null;
    }
    if (Buffer.isBuffer(response)) return response;
    if (typeof response === 'string') return Buffer.from(response, 'base64');
    if (response && typeof response === 'object') {
        const audio = response.audio;
        if (typeof audio === 'string') return Buffer.from(audio, 'base64');
        if (Buffer.isBuffer(audio)) return audio;
    }
    return null;
}
function createSpeechSynthesisTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'synthesize_speech',
        description: 'Convert text into a spoken audio file (WAV) the user can play or download — pronunciation guides, audio summaries, or study podcasts. Long text is automatically split into chunks and stitched into one file.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            text: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(5).max(50000).describe('The text to speak'),
            title: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(3).max(120).optional().describe('Audio title for the file name, e.g. "Atrial fibrillation audio summary"'),
            speed: zod__WEBPACK_IMPORTED_MODULE_7__/* .number */ .aig().min(0.5).max(2.0).optional().describe('Speech speed, default 1.0')
        }),
        func: async ({ text, title, speed = 1.0 })=>{
            try {
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                // The model often passes markdown (bold terms, headings, bullets) as
                // the "text to speak" — strip it so the narrator never SPEAKS the
                // syntax markers aloud.
                const speakable = (0,_lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_8__/* .stripMarkdownForTTS */ .A)(text);
                if (!speakable.trim()) {
                    return JSON.stringify({
                        created: false,
                        error: 'No speakable text after removing markdown markers'
                    });
                }
                const chunks = splitTextChunks(speakable, 1000);
                const buffers = [];
                for (const chunk of chunks){
                    const response = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.audio.tts.create({
                            input: chunk,
                            response_format: 'wav',
                            speed
                        }), {
                        label: 'synthesize_speech'
                    });
                    const buffer = await ttsResponseToBuffer(response);
                    if (buffer && buffer.byteLength > 0) buffers.push(buffer);
                }
                if (buffers.length === 0) {
                    return JSON.stringify({
                        created: false,
                        error: 'Speech synthesis returned no audio'
                    });
                }
                const combined = Buffer.concat(buffers);
                const base = (title ?? 'audio-summary').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60);
                const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                    userId: ctx.userId,
                    name: base,
                    kind: 'audio',
                    mimeType: 'audio/wav',
                    buffer: combined,
                    meta: {
                        title,
                        chunks: chunks.length,
                        speed,
                        format: 'wav'
                    }
                });
                return artifactResult(artifact, `${base}.wav`);
            } catch (error) {
                log.warn?.('synthesize_speech failed:', error);
                return errorResult(error);
            }
        }
    });
}
// ─── Video analysis ───────────────────────────────────────────────────────
function createVideoAnalysisTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'analyze_video_material',
        description: 'Analyze an educational video (clinical procedure recording, examination demonstration, lecture clip, surgical technique) and answer questions about its content. The video can be: (1) a direct public https URL to an mp4/mov/webm, OR (2) an attachment:// reference to a video the user uploaded in this chat. The vision model receives the video_url directly (for short clips ≤2 min) — longer uploaded videos are sampled at evenly-spaced frames and described individually so the agent can answer "what happens at 2:30?" style questions. Use this whenever the user shares a video and asks "what is shown", "describe the procedure", "what steps did they take", "what anatomical structure is being demonstrated", etc.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            video_url: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(5).describe('Direct https URL to the video, OR an attachment:// reference from the user\'s uploaded video file (e.g. attachment://lectomy.mp4). Public URLs work for any short clip; uploads are downloaded server-side and frame-sampled for longer recordings.'),
            prompt: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(5).describe('What to analyze, e.g. "describe the steps of this lumbar puncture", "what complications should I watch for in this technique", "identify the anatomical landmarks shown"')
        }),
        func: async ({ video_url, prompt })=>{
            try {
                // ── Resolve attachment:// references to a fetchable URL or a local
                //    file path. For uploaded videos we fall back to the
                //    analyzeVideoFrames helper (ffmpeg → evenly-sampled frames →
                //    per-frame VLM description) which handles long recordings that
                //    the createVision API would reject on duration grounds. ──
                let resolvedUrl = video_url;
                let isAttachment = false;
                if (video_url.startsWith('attachment://')) {
                    try {
                        resolvedUrl = (0,_attachment_registry__WEBPACK_IMPORTED_MODULE_4__.resolveAttachmentInput)(video_url, 'video');
                        isAttachment = true;
                    } catch (error) {
                        return errorResult(error);
                    }
                }
                // Public URLs (https://) → send straight to createVision with a
                // video_url content item. This is the ZAI gateway's native path and
                // works for any short clip the gateway can fetch.
                if (!isAttachment && /^https?:\/\//i.test(resolvedUrl)) {
                    const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                    const completion = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.chat.completions.createVision({
                            model: 'glm-4.5v',
                            messages: [
                                {
                                    role: 'user',
                                    content: [
                                        {
                                            type: 'text',
                                            text: prompt
                                        },
                                        {
                                            type: 'video_url',
                                            video_url: {
                                                url: resolvedUrl
                                            }
                                        }
                                    ]
                                }
                            ],
                            thinking: {
                                type: 'disabled'
                            }
                        }), {
                        label: 'analyze_video_material'
                    });
                    const text = completion?.choices?.[0]?.message?.content || '';
                    if (text.trim()) {
                        return JSON.stringify({
                            analyzed: true,
                            source: 'video_url',
                            summary: text.slice(0, 20000)
                        });
                    }
                    // Empty response — fall through to the frame-sampling path below
                    // (which gives the agent at least SOMETHING to work with for long
                    // videos the gateway's video_url path doesn't fully ingest).
                    log.warn?.('analyze_video_material: createVision returned empty — falling back to frame sampling');
                }
                // Uploaded videos (attachment://) OR empty-createVision URLs → use
                // the analyzeVideoFrames helper from ingest-media, which:
                //   1. probes the video duration via ffprobe
                //   2. samples N evenly-spaced frames (6-10) with ffmpeg
                //   3. describes each frame individually via the VLM (glm-4.5v chain)
                //   4. returns { durationSec, frames: [{offsetSec, description}] }
                // The descriptions are stitched into a timestamped summary the agent
                // can answer "what's at 2:30?" questions against.
                //
                // For attachment:// refs, resolveAttachmentInput returned a file://
                // or tmp/ path — read it into a Buffer for analyzeVideoFrames.
                let videoBuffer = null;
                if (isAttachment) {
                    try {
                        // resolveAttachmentInput may return a data: URL, a /tmp path, or
                        // an https URL (for cached attachments). Handle each:
                        if (resolvedUrl.startsWith('data:')) {
                            const m = /^data:[^;]+;base64,([\s\S]*)$/.exec(resolvedUrl);
                            if (m) videoBuffer = Buffer.from(m[1], 'base64');
                        } else if (/^https?:\/\//i.test(resolvedUrl)) {
                            const r = await fetch(resolvedUrl);
                            if (r.ok) videoBuffer = Buffer.from(await r.arrayBuffer());
                        } else {
                            // Local file path
                            const fs = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 79748, 23));
                            videoBuffer = await fs.readFile(resolvedUrl);
                        }
                    } catch (readErr) {
                        log.warn?.('analyze_video_material: could not read attachment:', readErr);
                        return errorResult(readErr);
                    }
                }
                if (videoBuffer) {
                    const { analyzeVideoFrames } = await __webpack_require__.e(/* import() */ 6899).then(__webpack_require__.bind(__webpack_require__, 256899));
                    const result = await analyzeVideoFrames(videoBuffer, prompt, {
                        maxFrames: 8
                    });
                    if (result && result.frames.length > 0) {
                        const summary = result.frames.map((f)=>`[${Math.floor(f.offsetSec / 60)}:${String(Math.round(f.offsetSec % 60)).padStart(2, '0')}] ${f.description}`).join('\n\n');
                        return JSON.stringify({
                            analyzed: true,
                            source: 'frame-sampling',
                            durationSec: Math.round(result.durationSec),
                            frameCount: result.frames.length,
                            summary: `Video duration: ${Math.floor(result.durationSec / 60)}m ${Math.round(result.durationSec % 60)}s. Sampled ${result.frames.length} frames at evenly-spaced timestamps:\n\n${summary}`.slice(0, 20000)
                        });
                    }
                }
                return JSON.stringify({
                    analyzed: false,
                    error: 'The video could not be analyzed — the vision model returned no content and frame sampling did not produce any descriptions. Try a shorter clip, a different URL, or describe what you want to know about the video in more detail.'
                });
            } catch (error) {
                log.warn?.('analyze_video_material failed:', error);
                return errorResult(error);
            }
        }
    });
}
/** Search the web for medical videos. ZAI's image-search is repurposed as a
 *  video-search proxy (it surfaces video thumbnails + source pages), then
 *  the source pages are inspected to extract the actual video URL. Returns
 *  ranked results the agent can pass back to analyze_video_material. */ function createVideoSearchTool() {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_medical_videos',
        description: 'Search the web for REAL medical videos (clinical procedure demonstrations, surgical technique recordings, anatomy lectures, examination tutorials) — use this whenever the user wants to find, watch, or search for actual videos online. Returns ranked results with direct video URLs (plus captions, source pages) — pass the best video URL to analyze_video_material to extract its content.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(3).max(200).describe('What to search for, e.g. "lumbar puncture procedure", "cardiac auscultation tutorial", "histology slide preparation"'),
            count: zod__WEBPACK_IMPORTED_MODULE_7__/* .number */ .aig().int().min(1).max(10).default(5).describe('Number of results to return (default 5)')
        }),
        func: async ({ query, count })=>{
            try {
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                // ZAI's image-search API returns thumbnails + source pages for
                // video-related queries — we filter for ones whose source page is a
                // known video host (youtube, vimeo, medtube, etc.) and report those
                // back. For non-video-host results, we still include them but flag
                // them as "image — likely a thumbnail of an embedded video" so the
                // agent can decide whether to fetch the page for the actual URL.
                const response = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.images.search.create({
                        query: `${query} video`,
                        count: Math.min(count * 2, 12)
                    }), {
                    label: 'search_medical_videos'
                });
                const results = response?.results ?? [];
                if (!results.length) {
                    return JSON.stringify({
                        results: [],
                        note: 'No videos found for this query. Try broader or different keywords.'
                    });
                }
                // Known video hosts — if the source URL matches, we trust it as a
                // real video page and pass it through. Otherwise the result is
                // reported as a thumbnail that the agent should fetch the source
                // page of to find the embedded video URL.
                const VIDEO_HOSTS = [
                    'youtube.com',
                    'youtu.be',
                    'vimeo.com',
                    'medtube.net',
                    'bmj.com',
                    'medscape.com',
                    'kenhub.com',
                    'radiopaedia.org',
                    'mededconnect.net'
                ];
                const ranked = results.slice(0, count).map((r, i)=>{
                    const source = r.source || '';
                    const isVideoHost = VIDEO_HOSTS.some((h)=>source.includes(h));
                    return {
                        rank: i + 1,
                        title: r.caption || '(no caption)',
                        videoUrl: isVideoHost ? source : null,
                        thumbnailUrl: r.original_url || null,
                        source,
                        isVideoHost,
                        note: isVideoHost ? 'Direct video page — pass videoUrl to analyze_video_material to extract content.' : 'Thumbnail of a likely video — fetch the source page to find the embedded video URL, then pass that to analyze_video_material.'
                    };
                });
                return JSON.stringify({
                    results: ranked,
                    note: 'Cite video sources inline as [V1], [V2]… markers. To analyze a video\'s content, pass its videoUrl to the analyze_video_material tool. For results where isVideoHost=false, use fetch_medical_reference on the source page to find the embedded video URL first.'
                });
            } catch (error) {
                log.warn?.('search_medical_videos failed:', error);
                return errorResult(error);
            }
        }
    });
}
// ─── Video generation ─────────────────────────────────────────────────────
const VIDEO_POLL_INTERVAL_MS = 5000;
const VIDEO_POLL_TIMEOUT_MS = 110000;
function createVideoGenerationTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'generate_medical_video',
        description: 'Generate a short educational video clip from a text description (e.g. "blood flow through the heart, simplified animation"). Slower than images — use only when a moving visualization clearly beats a static illustration.',
        schema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
            prompt: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(15).max(2000).describe('Detailed description of the desired video'),
            title: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().min(3).max(120).optional().describe('Title for the file name')
        }),
        func: async ({ prompt, title })=>{
            try {
                const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_2__.createZAI)();
                const created = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.video.generations.create({
                        prompt
                    }), {
                    label: 'generate_medical_video'
                });
                // Immediate result — done.
                if (created?.url) {
                    return JSON.stringify({
                        created: true,
                        videoUrl: created.url,
                        note: 'Video generated. Share the URL in your final answer.'
                    });
                }
                // Async task — poll with a bounded budget, then report the task id.
                const taskId = created?.task_id;
                if (!taskId) {
                    return JSON.stringify({
                        created: false,
                        error: 'Video generation returned neither a URL nor a task id'
                    });
                }
                const deadline = Date.now() + VIDEO_POLL_TIMEOUT_MS;
                while(Date.now() < deadline){
                    await new Promise((resolve)=>setTimeout(resolve, VIDEO_POLL_INTERVAL_MS));
                    const status = await zai.async.result.query(taskId);
                    const videoUrl = status?.video_url ?? status?.video_result?.[0]?.video_url;
                    if (videoUrl) {
                        return JSON.stringify({
                            created: true,
                            videoUrl,
                            taskId,
                            note: 'Video generated. Share the URL in your final answer.'
                        });
                    }
                    if (status?.status && /fail|error|cancel/i.test(status.status)) {
                        return JSON.stringify({
                            created: false,
                            error: `Video generation failed: ${status.status}`
                        });
                    }
                }
                return JSON.stringify({
                    created: false,
                    pending: true,
                    taskId,
                    note: 'Video is still rendering — it can take a few minutes. Tell the user it is queued and they can ask again shortly.'
                });
            } catch (error) {
                log.warn?.('generate_medical_video failed:', error);
                return errorResult(error);
            }
        }
    });
}


/***/ }),

/***/ 411804:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ createAsyncTaskTools)
/* harmony export */ });
/* unused harmony export ASYNC_TASK_TOOL_NAMES */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18963);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _queue_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(576532);
/* harmony import */ var _queue_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(484393);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _queue_service__WEBPACK_IMPORTED_MODULE_2__, _queue_worker__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _queue_service__WEBPACK_IMPORTED_MODULE_2__, _queue_worker__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Background task tools — the docs' AsyncSubAgent capability, MedQ-native.
 *
 * The deepagents JS package ships async subagents as remote Agent-Protocol
 * servers (LangGraph SDK). MedQ already owns a superior substrate for
 * background agent work: the durable AgentJob queue (lease semantics,
 * retries, cancellation, detached execution, completion notifications). These
 * five tools provide the package's start/check/update/cancel/list semantics,
 * but dispatch to the local queue, so background specialists work with MedQ
 * auth, telemetry and notifications instead of a remote protocol server.
 *
 * NAMING NOTE: the package reserves the exact names start_async_task etc. in
 * BUILTIN_TOOL_NAMES (a ConfigurationError fires on collision even when the
 * async-subagent middleware is not used), so the MedQ-native family is named
 * start/check/update/cancel/list_background_task.
 */ 




function jobStatusToTaskStatus(status) {
    switch(status){
        case 'pending':
            return 'pending';
        case 'leased':
            return 'running';
        case 'processing':
            return 'running';
        case 'done':
            return 'success';
        case 'failed':
            return 'error';
        case 'cancelled':
            return 'cancelled';
        default:
            return 'pending';
    }
}
function createAsyncTaskTools(ctx) {
    const userId = ctx.userId;
    const startAsyncTask = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'start_background_task',
        description: 'Launch a background agent task that runs detached from this conversation (the learner can close the tab). ' + 'Use for long-running work worth parallelizing: deep research sweeps, large question-generation batches, multi-document analysis. ' + 'Returns a taskId immediately — poll it with check_background_task, list all with list_background_tasks. The learner gets a notification with the result when it finishes.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            description: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(8).max(4000).describe('The complete, self-contained task prompt for the background agent (it will NOT see this conversation)'),
            agentName: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().max(60).optional().describe('Optional short label for the kind of specialist, e.g. "researcher"')
        }),
        func: async ({ description, agentName })=>{
            try {
                (0,_queue_worker__WEBPACK_IMPORTED_MODULE_3__/* .ensureWorkerStarted */ .u)();
                const job = await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .enqueue */ .Z2)({
                    userId,
                    kind: 'agent.run',
                    payload: {
                        message: `You are a background task${agentName ? ` (${agentName})` : ''} for a MedQ learner. Complete it autonomously and produce a concise, self-contained final result (the learner reads it as a notification — do not ask questions).\n\nTask: ${description}`,
                        threadId: ctx.threadId ?? undefined
                    }
                });
                return JSON.stringify({
                    taskId: job.id,
                    status: 'pending',
                    note: 'Task queued. Poll with check_background_task (taskId above).'
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const checkAsyncTask = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'check_background_task',
        description: 'Check the live status of a background task started with start_background_task. Returns status (pending/running/success/error/cancelled), progress and the latest result text when finished.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            taskId: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(6).max(64).describe('The taskId returned by start_background_task')
        }),
        func: async ({ taskId })=>{
            try {
                const job = await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .getJobWithEvents */ .Hc)(taskId, userId);
                if (!job) return JSON.stringify({
                    error: 'Task not found (wrong id or not yours).'
                });
                const lastText = [
                    ...job.events
                ].reverse().find((e)=>e.type === 'text');
                return JSON.stringify({
                    taskId,
                    status: jobStatusToTaskStatus(job.status),
                    progress: job.progress ?? 0,
                    attempts: job.attempts,
                    lastActivity: lastText ? String(lastText.text ?? '').slice(0, 2000) : null,
                    createdAt: job.createdAt,
                    finalText: job.finalText ? job.finalText.slice(0, 2000) : null
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const updateAsyncTask = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'update_background_task',
        description: 'Send a follow-up message to a background task. If the task has not started yet, the message is appended to its prompt; if it is already running or finished, a NEW background run is launched on the same conversation thread and its taskId is returned.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            taskId: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(6).max(64).describe('The taskId to update'),
            message: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(1).max(4000).describe('The follow-up instruction or extra context for the task')
        }),
        func: async ({ taskId, message })=>{
            try {
                const raw = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentJob.findFirst({
                    where: {
                        id: taskId,
                        userId
                    }
                });
                if (!raw) return JSON.stringify({
                    error: 'Task not found (wrong id or not yours).'
                });
                const payload = JSON.parse(raw.payloadJson);
                if (raw.status === 'pending') {
                    // Not leased yet — safely extend the queued prompt.
                    const merged = `${payload.message ?? ''}\n\n[Follow-up]: ${message}`;
                    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.agentJob.update({
                        where: {
                            id: taskId
                        },
                        data: {
                            payloadJson: JSON.stringify({
                                ...payload,
                                message: merged
                            })
                        }
                    });
                    return JSON.stringify({
                        taskId,
                        updated: true,
                        mode: 'queued-prompt-extended'
                    });
                }
                // Running / done — launch a follow-up run on the same thread.
                const next = await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .enqueue */ .Z2)({
                    userId,
                    kind: 'agent.run',
                    payload: {
                        message: `Continuation of a background task. Earlier task id: ${taskId}.\n\nFollow-up instruction: ${message}`,
                        ...payload.threadId ? {
                            threadId: payload.threadId
                        } : {}
                    }
                });
                return JSON.stringify({
                    taskId: next.id,
                    updated: true,
                    mode: 'new-run',
                    previousTaskId: taskId,
                    previousStatus: jobStatusToTaskStatus(raw.status)
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const cancelAsyncTask = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'cancel_background_task',
        description: 'Cancel a background task by id. Pending tasks are removed; running tasks stop at their next checkpoint.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            taskId: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(6).max(64).describe('The taskId to cancel')
        }),
        func: async ({ taskId })=>{
            try {
                const job = await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .getJobWithEvents */ .Hc)(taskId, userId);
                if (!job) return JSON.stringify({
                    error: 'Task not found (wrong id or not yours).'
                });
                await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .requestCancel */ .AX)(taskId, userId);
                return JSON.stringify({
                    taskId,
                    cancelled: true
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const listAsyncTasks = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'list_background_tasks',
        description: 'List the learner\'s background agent tasks (from start_background_task), newest first, with live statuses. Optional statusFilter: pending | running | success | error | cancelled.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            statusFilter: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().optional().nullable().describe('Optional status filter')
        }),
        func: async ({ statusFilter })=>{
            try {
                const jobs = await (0,_queue_service__WEBPACK_IMPORTED_MODULE_2__/* .listJobs */ .N6)(userId, 30);
                const wanted = statusFilter ? jobStatusToTaskStatus(statusFilter) : null;
                const rows = jobs.map((job)=>({
                        taskId: job.id,
                        status: jobStatusToTaskStatus(job.status),
                        progress: job.progress ?? 0,
                        createdAt: job.createdAt.getTime(),
                        finishedAt: job.finishedAt ? job.finishedAt.getTime() : null
                    })).filter((row)=>!wanted || row.status === wanted);
                return JSON.stringify({
                    tasks: rows,
                    count: rows.length
                });
            } catch (error) {
                return JSON.stringify({
                    tasks: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    return [
        startAsyncTask,
        checkAsyncTask,
        updateAsyncTask,
        cancelAsyncTask,
        listAsyncTasks
    ];
}
const ASYNC_TASK_TOOL_NAMES = (/* unused pure expression or super */ null && ([
    'start_background_task',
    'check_background_task',
    'update_background_task',
    'cancel_background_task',
    'list_background_tasks'
]));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 423665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ searchWithBrave)
/* harmony export */ });
/* unused harmony export parseBraveSearchHtml */
/* harmony import */ var _lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115812);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(197942);
/** Ported from OpenMAIC. Original: lib/web-search/brave.ts */ /**
 * Brave Web Search integration.
 *
 * Supports two modes:
 * - **API mode** (preferred): Uses the official Brave Search API with an API key.
 *   Returns structured JSON results with rich metadata.
 * - **Scrape mode** (fallback): Fetches the public HTML search page and extracts
 *   web result snippets via regex. No API key needed but subject to rate-limiting.
 */ 

const BRAVE_DEFAULT_BASE_URL = 'https://search.brave.com';
const BRAVE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
};
function buildBraveSearchUrl(query, baseUrl) {
    const trimmed = (baseUrl || BRAVE_DEFAULT_BASE_URL).replace(/\/+$/, '');
    const endpoint = trimmed.endsWith('/search') ? trimmed : `${trimmed}/search`;
    const url = new URL(endpoint);
    url.searchParams.set('q', query);
    return url.toString();
}
function decodeHtml(value) {
    return value.replace(/&#(\d+);/g, (_, code)=>String.fromCharCode(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code)=>String.fromCharCode(parseInt(code, 16))).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
function stripHtml(value) {
    return decodeHtml(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function isBraveOwnedUrl(value) {
    try {
        const host = new URL(value).hostname.toLowerCase();
        return host === 'brave.com' || host.endsWith('.brave.com');
    } catch  {
        return true;
    }
}
function parseBraveSearchHtml(html, maxResults) {
    const results = [];
    const snippetRegex = /<div[^>]*class="[^"]*\bsnippet\b[^"]*"[^>]*data-type="web"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*\bsnippet\b[^"]*"[^>]*data-type="web"|<footer|$)/gi;
    let snippetMatch;
    while((snippetMatch = snippetRegex.exec(html)) !== null && results.length < maxResults){
        const block = snippetMatch[1];
        const linkMatch = block.match(/<a[^>]*href="([^"]+)"[^>]*>/i);
        if (!linkMatch) continue;
        const url = decodeHtml(linkMatch[1].trim());
        if (!url || isBraveOwnedUrl(url)) continue;
        const titleMatch = block.match(/<span[^>]*class="[^"]*search-snippet-title[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
        const title = titleMatch ? stripHtml(titleMatch[1]) : '';
        if (!title) continue;
        const genericMatch = block.match(/<div[^>]*class="[^"]*generic-snippet[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
        const descMatch = block.match(/<p[^>]*class="[^"]*snippet-description[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
        const rawContent = genericMatch?.[1] || descMatch?.[1] || '';
        const content = stripHtml(rawContent).replace(/^\d+ \w+ ago\s*-\s*/, '').replace(/^[A-Z][a-z]+ \d+, \d{4}\s*-\s*/, '');
        results.push({
            title,
            url,
            content,
            score: Number((1 - results.length * 0.1).toFixed(2))
        });
    }
    return results;
}
const BRAVE_API_BASE_URL = 'https://api.search.brave.com';
/**
 * Use the official Brave Search API (requires API key).
 * Docs: https://api.search.brave.com/app/documentation/web-search
 */ async function searchWithBraveApi(query, apiKey, maxResults) {
    const url = new URL('/res/v1/web/search', BRAVE_API_BASE_URL);
    url.searchParams.set('q', query);
    url.searchParams.set('count', String(Math.min(maxResults, 20)));
    const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(url.toString(), {
        method: 'GET',
        headers: {
            'X-Subscription-Token': apiKey,
            Accept: 'application/json'
        }
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>'');
        throw new Error(`Brave API error (${res.status}): ${errorText || res.statusText}`);
    }
    const data = await res.json();
    return (data.web?.results || []).filter((r)=>r.url).slice(0, maxResults).map((r, i)=>({
            title: r.title || '',
            url: r.url || '',
            content: stripHtml(r.description || ''),
            score: Number((1 - i * 0.05).toFixed(2))
        }));
}
/**
 * Fallback: scrape the public Brave Search HTML page (no API key needed).
 */ async function searchWithBraveScrape(query, maxResults, baseUrl) {
    const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildBraveSearchUrl(query, baseUrl), {
        method: 'GET',
        headers: BRAVE_HEADERS
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>'');
        throw new Error(`Brave Search error (${res.status}): ${errorText || res.statusText}`);
    }
    const html = await res.text();
    return parseBraveSearchHtml(html, maxResults);
}
async function searchWithBrave(params) {
    const { query: rawQuery, apiKey, maxResults = 5, baseUrl } = params;
    const query = (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .normalizeWebSearchQuery */ .k)(rawQuery);
    const startedAt = Date.now();
    const sources = apiKey ? await searchWithBraveApi(query, apiKey, maxResults) : await searchWithBraveScrape(query, maxResults, baseUrl);
    return {
        answer: '',
        sources,
        query,
        responseTime: (Date.now() - startedAt) / 1000
    };
}


/***/ }),

/***/ 426460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ searchWithMiniMax)
/* harmony export */ });
/* harmony import */ var _lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115812);
/** Ported from OpenMAIC. Original: lib/web-search/minimax.ts */ /**
 * MiniMax Web Search integration.
 *
 * Uses the Token Plan HTTP endpoint behind the MiniMax MCP web_search tool:
 * POST https://api.minimaxi.com/v1/coding_plan/search
 */ 
const MINIMAX_DEFAULT_BASE_URL = 'https://api.minimaxi.com';
function buildMiniMaxWebSearchUrl(baseUrl) {
    const trimmed = (baseUrl || MINIMAX_DEFAULT_BASE_URL).replace(/\/$/, '');
    if (trimmed.endsWith('/v1/coding_plan/search')) return trimmed;
    if (trimmed.endsWith('/v1/coding_plan')) return `${trimmed}/search`;
    if (trimmed.endsWith('/v1')) return `${trimmed}/coding_plan/search`;
    return `${trimmed}/v1/coding_plan/search`;
}
function getMiniMaxBaseResp(raw) {
    if (!raw || typeof raw !== 'object') return undefined;
    const value = raw.base_resp || raw.baseResp;
    if (!value || typeof value !== 'object') return undefined;
    return value;
}
function formatMiniMaxError(status, statusText, errorText) {
    if (!errorText) return `MiniMax Web Search API error (${status}): ${statusText}`;
    try {
        const parsed = JSON.parse(errorText);
        const baseResp = getMiniMaxBaseResp(parsed);
        const code = baseResp?.status_code ?? parsed.code ?? status;
        const message = baseResp?.status_msg || parsed.message || parsed.error?.message || statusText;
        return `MiniMax Web Search API error (${code}): ${message}`;
    } catch  {
        return `MiniMax Web Search API error (${status}): ${errorText}`;
    }
}
function getOrganicResults(raw) {
    return raw.organic || raw.data?.organic || raw.results || [];
}
/**
 * Search the web using MiniMax Web Search API and return structured results.
 */ async function searchWithMiniMax(params) {
    const { query, apiKey, maxResults = 10, baseUrl } = params;
    const startedAt = Date.now();
    const res = await (0,_lib_server_proxy_fetch__WEBPACK_IMPORTED_MODULE_0__/* .proxyFetch */ .Z)(buildMiniMaxWebSearchUrl(baseUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'MM-API-Source': 'OpenMAIC'
        },
        body: JSON.stringify({
            q: query
        })
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>'');
        throw new Error(formatMiniMaxError(res.status, res.statusText, errorText));
    }
    const raw = await res.json();
    const baseResp = getMiniMaxBaseResp(raw);
    if (baseResp?.status_code !== undefined && String(baseResp.status_code) !== '0') {
        throw new Error(`MiniMax Web Search API error (${baseResp.status_code}): ${baseResp.status_msg || 'Request failed'}`);
    }
    const limit = Math.max(Math.floor(maxResults), 1);
    const sources = getOrganicResults(raw).map((item)=>{
        const url = item.link || item.url || '';
        return {
            title: item.title || url,
            url,
            content: item.snippet || item.summary || item.content || item.date || '',
            score: 0
        };
    }).filter((source)=>source.url).slice(0, limit);
    return {
        answer: '',
        sources,
        query,
        responseTime: (Date.now() - startedAt) / 1000
    };
}


/***/ }),

/***/ 442398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EX: () => (/* binding */ deleteWorkspacePath),
/* harmony export */   P3: () => (/* binding */ workspaceFilesRoot),
/* harmony export */   dx: () => (/* binding */ writeWorkspaceFile),
/* harmony export */   i1: () => (/* binding */ listWorkspace),
/* harmony export */   sL: () => (/* binding */ readWorkspaceFile)
/* harmony export */ });
/* unused harmony exports resolveSafe, workspaceExists, moveWorkspacePath, copyWorkspacePath */
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tools_sandbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503496);



/**
 * Workspace file service — the agent's per-user sandboxed filesystem.
 *
 * Ported from hermes (`lib/workspace.ts`): all operations are jailed to
 * `<workspaces>/<userId>/workspace/` with three layers of protection:
 *   1. NUL-byte rejection (path trickery)
 *   2. Lexical `..` escape rejection (resolve + prefix check)
 *   3. Symlink escape rejection (realpath of the nearest existing ancestor)
 *
 * The deepagents `read_file` FS middleware already reads through the same
 * user root (FilesystemBackend), so files written here are visible to
 * load_skill / read_file flows.
 */ function workspaceFilesRoot(userId) {
    const root = (0,_tools_sandbox__WEBPACK_IMPORTED_MODULE_2__/* .sandboxRoot */ .i2)(userId);
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(root, {
        recursive: true
    });
    return root;
}
/** Resolve a relative path inside the user's workspace, safely. */ function resolveSafe(userId, relPath) {
    if (relPath.includes('\0')) throw new Error('Path contains NUL bytes');
    const root = workspaceFilesRoot(userId);
    const cleaned = relPath.replace(/^[./\\]+/, '').trim();
    const target = node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, cleaned);
    if (target !== root && !target.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_1___default().sep))) {
        throw new Error('Path escapes the workspace');
    }
    // Symlink-escape check: realpath the nearest existing ancestor and make
    // sure it still resolves inside the root.
    let probe = target;
    while(!node_fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(probe)){
        const parent = node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(probe);
        if (parent === probe) break;
        probe = parent;
    }
    try {
        const real = node_fs__WEBPACK_IMPORTED_MODULE_0___default().realpathSync(probe);
        if (real !== root && !real.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_1___default().sep))) {
            throw new Error('Path escapes the workspace (symlink)');
        }
    } catch (error) {
        if (error.message.includes('escapes')) throw error;
    // realpath failure on the root itself is fine (fresh dir)
    }
    return target;
}
function listWorkspace(userId, relPath = '') {
    const dir = resolveSafe(userId, relPath);
    const entries = node_fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(dir, {
        withFileTypes: true
    });
    return entries.map((e)=>{
        const full = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(dir, e.name);
        const stat = node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(full);
        return {
            name: e.name,
            path: node_path__WEBPACK_IMPORTED_MODULE_1___default().relative(workspaceFilesRoot(userId), full).split((node_path__WEBPACK_IMPORTED_MODULE_1___default().sep)).join('/'),
            type: e.isDirectory() ? 'dir' : 'file',
            size: e.isFile() ? stat.size : undefined,
            modified: stat.mtime.toISOString()
        };
    }).sort((a, b)=>a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1).slice(0, 500);
}
const READ_MAX_BYTES = 120000;
function readWorkspaceFile(userId, relPath, maxBytes = READ_MAX_BYTES) {
    const target = resolveSafe(userId, relPath);
    const stat = node_fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(target);
    if (!stat.isFile()) throw new Error('Not a file');
    const fd = node_fs__WEBPACK_IMPORTED_MODULE_0___default().openSync(target, 'r');
    try {
        const buf = Buffer.alloc(Math.min(stat.size, maxBytes));
        const bytes = node_fs__WEBPACK_IMPORTED_MODULE_0___default().readSync(fd, buf, 0, buf.length, 0);
        const text = buf.subarray(0, bytes).toString('utf8');
        return stat.size > maxBytes ? `${text}\n… (truncated at ${maxBytes} bytes of ${stat.size})` : text;
    } finally{
        node_fs__WEBPACK_IMPORTED_MODULE_0___default().closeSync(fd);
    }
}
const WRITE_MAX_BYTES = 512000;
function writeWorkspaceFile(userId, relPath, content) {
    if (content.length > WRITE_MAX_BYTES) throw new Error(`Content exceeds ${WRITE_MAX_BYTES} bytes`);
    const target = resolveSafe(userId, relPath);
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(target), {
        recursive: true
    });
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(target, content, 'utf8');
    return {
        path: relPath,
        bytes: Buffer.byteLength(content, 'utf8')
    };
}
function workspaceExists(userId, relPath) {
    try {
        resolveSafe(userId, relPath);
        return true;
    } catch  {
        return false;
    }
}
function moveWorkspacePath(userId, from, to) {
    const src = resolveSafe(userId, from);
    const dst = resolveSafe(userId, to);
    if (!fs.existsSync(src)) throw new Error('Source does not exist');
    fs.mkdirSync(path.dirname(dst), {
        recursive: true
    });
    fs.renameSync(src, dst);
}
function copyWorkspacePath(userId, from, to) {
    const src = resolveSafe(userId, from);
    const dst = resolveSafe(userId, to);
    if (!fs.existsSync(src)) throw new Error('Source does not exist');
    fs.mkdirSync(path.dirname(dst), {
        recursive: true
    });
    fs.cpSync(src, dst, {
        recursive: true
    });
}
function deleteWorkspacePath(userId, relPath) {
    const root = workspaceFilesRoot(userId);
    const target = resolveSafe(userId, relPath);
    if (node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(target) === node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root)) {
        throw new Error('Refusing to delete the workspace root');
    }
    node_fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(target, {
        recursive: true,
        force: true
    });
}


/***/ }),

/***/ 444937:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ createArtifactSearchTool)
/* harmony export */ });
/* unused harmony export createScreenshotTool */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(902328);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(376389);
/* harmony import */ var _illustration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(843037);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_1__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('AgentDiscovery');
/**
 * Discovery tools (Task 6 — ported from the reference Deep Agent platform).
 *
 * The reference app exposes raw workspace tools (list/read/write/search files)
 * against the server filesystem. MedQ deliberately does NOT do that: the
 * Task-3 capability fix keeps raw filesystem operations out of the model's
 * vocabulary because MedQ users have no filesystem. Instead the same
 * user-facing capability — "the agent can find and reuse what it already
 * made for you" — is served through the durable artifact library, and web
 * page capture is served through the managed screenshot gateway.
 */ /**
 * search_artifacts — look up the user's durable artifact library.
 *
 * Lets the agent answer "what documents have you made me so far?" and
 * re-share earlier deliverables (download links stay valid across sessions),
 * closing the agent-side half of the artifact-library gap.
 */ function createArtifactSearchTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_artifacts',
        description: "Search the user's saved study deliverables (study guides, cheat sheets, documents, spreadsheets, decks, charts, datasets) that were created in earlier conversations. Use when the user asks what you have made for them before, wants to re-download or continue a previous deliverable, or when an earlier artifact could answer the current request. Returns names, dates, and download links.",
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().max(120).optional().describe('Search terms (topic or filename words). Omit to list the most recent deliverables.'),
            limit: zod__WEBPACK_IMPORTED_MODULE_5__/* .number */ .aig().int().min(1).max(20).default(10).describe('Max results (default 10)')
        }),
        func: async ({ query, limit })=>{
            try {
                const artifacts = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_1__/* .searchArtifacts */ .Mj)(ctx.userId, (query ?? '').trim(), limit);
                if (artifacts.length === 0) {
                    return JSON.stringify({
                        results: [],
                        note: 'No saved deliverables matched. Offer to create one if the user wants it.'
                    });
                }
                const formatted = artifacts.map((a, i)=>`[${i + 1}] ${a.name} (${a.kind}, ${a.sizeBytes}B, ${a.createdAt.slice(0, 10)})${a.excerpt ? `\n    excerpt: ${a.excerpt}…` : ''}\n    download: ${a.downloadUrl}`);
                return JSON.stringify({
                    results: artifacts.map((a)=>({
                            name: a.name,
                            kind: a.kind,
                            createdAt: a.createdAt,
                            downloadUrl: a.downloadUrl
                        })),
                    formatted: formatted.join('\n'),
                    note: 'Share these download links in your answer. Links remain valid across sessions.'
                });
            } catch (error) {
                return JSON.stringify({
                    results: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}
/**
 * capture_reference_screenshot — render a web page to an image.
 *
 * Ported from the reference platform's browser_screenshot: the ZAI gateway
 * screenshot function renders the URL and returns a data: URL; the image is
 * persisted to /public/generated and returned as a small previewable URL
 * that the chat UI renders inline with the lightbox.
 */ function createScreenshotTool() {
    return new DynamicStructuredTool({
        name: 'capture_reference_screenshot',
        description: 'Capture a current screenshot of a public web page (a reference, guideline, or article URL the user is discussing) so both you and the user can see what the page currently shows. Use when a visual of the page adds value — e.g. checking what a linked page actually contains, or showing a diagram/table page. Returns a previewable image URL.',
        schema: z.object({
            url: z.string().url().describe('Absolute http(s) URL of the page to capture')
        }),
        func: async ({ url })=>{
            try {
                const zai = await createZAI();
                if (!zai?.functions?.invoke) {
                    return JSON.stringify({
                        captured: false,
                        error: 'Screenshot service unavailable.'
                    });
                }
                const result = await zai.functions.invoke('screenshot', {
                    url
                });
                if (typeof result === 'string' && result.startsWith('data:')) {
                    const base64 = result.split(',')[1];
                    if (base64) {
                        const imageUrl = saveGeneratedImage(base64);
                        if (imageUrl) {
                            return JSON.stringify({
                                captured: true,
                                url,
                                imageUrl,
                                note: 'Screenshot captured — the image is previewable in chat. Describe what it shows.'
                            });
                        }
                    }
                }
                // Some gateway responses carry the data URL under a field.
                if (result && typeof result === 'object') {
                    const rec = result;
                    const dataUrl = typeof rec.screenshot === 'string' && rec.screenshot.startsWith('data:') && rec.screenshot || typeof rec.image === 'string' && rec.image.startsWith('data:') && rec.image || typeof rec.dataUrl === 'string' && rec.dataUrl.startsWith('data:') && rec.dataUrl || typeof rec.url === 'string' && rec.url.startsWith('data:') && rec.url;
                    if (dataUrl) {
                        const imageUrl = saveGeneratedImage(dataUrl.split(',')[1] ?? '');
                        if (imageUrl) {
                            return JSON.stringify({
                                captured: true,
                                url,
                                imageUrl,
                                note: 'Screenshot captured — the image is previewable in chat.'
                            });
                        }
                    }
                }
                return JSON.stringify({
                    captured: false,
                    url,
                    error: 'Screenshot service returned no image data.'
                });
            } catch (error) {
                log.warn?.('Screenshot capture failed:', error);
                return JSON.stringify({
                    captured: false,
                    url,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 462959:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ syncSkillsToWorkspace)
/* harmony export */ });
/**
 * Agent skill loader — minimal stub.
 *
 * Original implementation synced skill definitions into the per-user agent
 * workspace at boot. Stubbed here because the platform snapshot dropped the
 * file. Restoring the full loader requires the original source; see
 * workspace.ts for context.
 */ /** Shape returned by the original loader — callers read .skillsPath/.count. */ async function syncSkillsToWorkspace(_userId) {
    // No-op — the deep-agent runtime tolerates an empty workspace and simply
    // runs without workspace skill files (skills array stays empty).
    return {
        skillsPath: null,
        count: 0
    };
}


/***/ }),

/***/ 476149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ stripMarkdownForTTS)
/* harmony export */ });
/**
 * Markdown → plain-speech text sanitizer for TTS.
 *
 * Problem (Task 51): LLM-generated narration/discussion text is markdown
 * (`**bold**`, `# headings`, `- bullets`, links, tables...). Every TTS entry
 * point used to pass that text through verbatim, so the narrator audibly read
 * the syntax ("asterisk asterisk ... hash hash ...").
 *
 * This module converts markdown narration to clean speakable text. It is a
 * PURE isomorphic function (no client/server imports) so it can be applied at
 * every choke point:
 *   - server:  `generateTTS()` in tts-providers.ts (all providers, all routes)
 *   - browser: use-browser-tts.speak(), playBrowserTTSPreview(), useAgentVoice
 *   - client→server bodies: stage-tts-client.synthesizeStageTTS()
 *
 * Design notes:
 *  - Idempotent: output contains no markdown markers, so re-running is a no-op
 *    (double-sanitize across client + server is safe).
 *  - Conservative: emphasis pairs require whitespace/punctuation boundaries so
 *    legitimate text like `5 * 3` or `snake_case` is never eaten.
 *  - Ordered: structural constructs (fences, links, images, headings) are
 *    removed before inline emphasis so markers inside them don't leak.
 *  - Ordered-list markers ("1.") are KEPT (they carry meaning when spoken);
 *    bullet markers ("- ", "* ") are stripped (TTS reads them as "dash").
 */ /** Remove HTML comments (multi-line safe). */ function stripHtmlComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, '');
}
/**
 * Strip fenced code blocks, keeping the inner code as speakable text.
 * Two-step (order matters):
 *   1. drop bare fence-marker lines (`` ``` `` alone on a line — i.e. closers
 *      and bare openers);
 *   2. drop opener lines including their language tag ("```python\n").
 * Content between them is kept so code narration still speaks the code.
 */ function stripCodeFences(text) {
    return text.replace(/^[ \t]*(`{3,}|~{3,})[ \t]*$/gm, '').replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n/gm, '');
}
/** Headings: leading ATX marker(s) and trailing closers. "## T ##" → "T". */ function stripHeadingMarkers(text) {
    return text.split('\n').map((line)=>line.replace(/^[ \t]{0,3}#{1,6}[ \t]+/, '').replace(/[ \t]+#{1,6}[ \t]*$/, '')).join('\n');
}
/** Remove setext heading underlines ("===" / "---" lines). */ function stripSetextUnderlines(text) {
    return text.replace(/^[ \t]*(-{3,}|={3,})[ \t]*$/gm, '');
}
/** Remove horizontal rules (already partially covered by setext pass). */ function stripHorizontalRules(text) {
    return text.replace(/^[ \t]{0,3}([-*_])[ \t]*\1[ \t]*\1[\s\S]*?$/gm, '');
}
/**
 * Inline: images → removed, links → keep label only, reference definitions →
 * removed, footnotes → removed.
 */ function stripLinksAndImages(text) {
    return text// images ![alt](url) — never speak the alt or the URL
    .replace(/!\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '')// links [label](url) → label
    .replace(/\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '$1')// reference-style link definitions at line start → drop the whole line
    .replace(/^[ \t]*\[([^\]]+)\]:[ \t]*\S+.*$/gm, '')// footnotes [^1] (inline refs and definitions)
    .replace(/\[\^[^\]]+\]/g, '')// leftover empty link labels `[](url)` were handled above; bare `[]`
    // pairs left by image removal inside links → drop
    .replace(/^\[\]$/gm, '');
}
/**
 * Inline emphasis: `**bold**`, `__bold__`, `*italic*`, `_italic_`, `~~strike~~`,
 * and inline code backticks. Single-char markers require non-word boundaries on
 * both sides so `5 * 3`, `snake_case`, `a_b` survive untouched.
 */ function stripInlineEmphasisAndCode(text) {
    return text// double-backtick inline code first (``x``)
    .replace(/``([^`]+)``/g, '$1')// single-backtick inline code
    .replace(/`([^`\n]+)`/g, '$1')// strikethrough
    .replace(/~~([^~\n]+)~~/g, '$1')// bold ** ** (allow intraword — real narration bold is word-level)
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')// bold __ __ — CommonMark semantics: "Run __init__ first" IS strong
    // emphasis (space-flanked); dunders only survive inside code spans.
    .replace(/(^|[^\w\\])__([^_\n]+)__(?!\w)/g, '$1$2')// italic * * — boundaries required (protects "5 * 3", "a*b*c" math)
    .replace(/(^|[^\w\\*])\*(?=\S)([^*\n]*[^\s\*])\*(?![\w*])/g, '$1$2')// italic _ _ — boundaries required (protects snake_case)
    .replace(/(^|[^\w\\])_(?=\S)([^_\n]*[^\s_])_(?![\w])/g, '$1$2');
}
/**
 * Blockquotes: strip the leading ">" markers (handles nested ">>" — one or
 * more markers per line). NOTE: exactly ONE ">" in the pattern after the
 * optional space — a second ">" would require nested quotes to match.
 */ function stripBlockquotes(text) {
    return text.replace(/^[ \t]{0,3}(?:>[ \t]?)+/gm, '');
}
/** Bullets: "- ", "* ", "+ " at line start → drop the marker (keep the text). */ function stripBulletMarkers(text) {
    return text.replace(/^([ \t]*)[-*+][ \t]+/gm, '$1');
}
/**
 * Tables: drop separator rows (|---|---|) together with their newline, then
 * per line trim the edge pipes and turn inner pipes into comma pauses so
 * cell content still reads naturally.
 */ function stripTables(text) {
    const withoutSeparators = text.replace(/^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*(?:\r?\n|$)/gm, '');
    return withoutSeparators.split('\n').map((line)=>line.replace(/^[ \t]*\|[ \t]*/, '').replace(/[ \t]*\|[ \t]*$/, '').replace(/[ \t]*\|[ \t]*/g, ', ').replace(/,[ \t]*,[ \t]*/g, ', ')).join('\n');
}
/** Remove HTML tags (narration occasionally carries <b>, <br>, <sub>...). */ function stripHtmlTags(text) {
    return text.replace(/<\/?[a-zA-Z][^>]*>/g, '');
}
/** Backslash escapes: `\*` → `*` (the literal char is the speakable form). */ function unescapeBackslashes(text) {
    return text.replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, '$1');
}
/** Collapse 3+ blank lines to one; trim each line; trim overall. */ function normalizeWhitespace(text) {
    return text.split('\n').map((line)=>line.replace(/[ \t]{2,}/g, ' ').trimEnd()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
/**
 * Convert markdown narration text to clean, speakable plain text.
 * Idempotent and order-stable; safe for CJK and Latin content alike.
 */ function stripMarkdownForTTS(text) {
    if (!text) return text;
    let out = text;
    out = stripHtmlComments(out);
    out = stripCodeFences(out);
    out = stripLinksAndImages(out);
    out = stripHeadingMarkers(out);
    out = stripSetextUnderlines(out);
    out = stripHorizontalRules(out);
    out = stripBlockquotes(out);
    out = stripBulletMarkers(out);
    out = stripTables(out);
    out = stripInlineEmphasisAndCode(out);
    out = stripHtmlTags(out);
    out = unescapeBackslashes(out);
    out = normalizeWhitespace(out);
    return out;
}


/***/ }),

/***/ 482166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ createRunCodeTool)
/* harmony export */ });
/* unused harmony export executeVmSandbox */
/* harmony import */ var node_vm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(530714);
/* harmony import */ var node_vm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_vm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18963);
/* harmony import */ var _sandbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(503496);
/* harmony import */ var _workspace_files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(442398);





/**
 * run_code — sandboxed code execution for verified computation.
 *
 * JavaScript runs in a fresh V8 context (node:vm) with a strict global
 * whitelist — no eval/require/process/network, hard timeout, output caps.
 *
 * Python and Bash (hermes-parity) run as ephemeral scripts inside the user's
 * process sandbox: the code is written to `scripts/exec-<ts>.<ext>` in the
 * workspace, then executed (`python3` / `bash`) with a scrubbed environment,
 * cwd jail, SIGKILL timeout, and output caps. Python is the tool for
 * statistics the VM cannot do (scipy-style math via pure-python fallbacks,
 * table wrangling); bash covers tiny shell pipelines.
 */ const CODE_MAX_CHARS = 20000;
const OUTPUT_MAX_CHARS = 8000;
const TIMEOUT_MS = 15000;
const MAX_LOG_LINES = 200;
/**
 * Execute untrusted JavaScript in the hardened VM (exported for the
 * calculator / process_json tools — compare-and-integrate-4; shared so ALL
 * model-supplied JS evaluation goes through the same whitelist jail).
 */ function executeVmSandbox(code, extraGlobals = {}) {
    return executeInSandbox(code, extraGlobals);
}
function executeInSandbox(code, extraGlobals = {}) {
    const logs = [];
    const pushLog = (level, args)=>{
        if (logs.length >= MAX_LOG_LINES) return;
        const rendered = args.map((arg)=>{
            if (typeof arg === 'string') return arg;
            try {
                return JSON.stringify(arg);
            } catch  {
                return String(arg);
            }
        }).join(' ');
        logs.push(level === 'error' ? `[error] ${rendered}` : level === 'warn' ? `[warn] ${rendered}` : rendered);
    };
    const sandbox = {
        // Whitelisted globals only — no process, require, fetch, timers, Buffer
        console: {
            log: (...args)=>pushLog('log', args),
            warn: (...args)=>pushLog('warn', args),
            error: (...args)=>pushLog('error', args),
            info: (...args)=>pushLog('log', args)
        },
        Math,
        JSON,
        Date,
        Number,
        String,
        Boolean,
        Array,
        Object,
        Map,
        Set,
        RegExp,
        Error,
        TypeError,
        RangeError,
        isNaN,
        isFinite,
        parseInt,
        parseFloat,
        encodeURIComponent,
        decodeURIComponent
    };
    sandbox.globalThis = sandbox;
    for (const [key, value] of Object.entries(extraGlobals))sandbox[key] = value;
    const context = node_vm__WEBPACK_IMPORTED_MODULE_0___default().createContext(sandbox, {
        codeGeneration: {
            strings: false,
            wasm: false
        }
    });
    try {
        const script = new (node_vm__WEBPACK_IMPORTED_MODULE_0___default().Script)(`(function(){\n${code}\n})()`);
        const raw = script.runInContext(context, {
            timeout: TIMEOUT_MS,
            breakOnSigint: true
        });
        let result;
        if (raw !== undefined) {
            try {
                result = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2);
            } catch  {
                result = String(raw);
            }
        }
        return {
            ok: true,
            result,
            logs
        };
    } catch (error) {
        const timedOut = error instanceof Error && /timed out|Script execution/i.test(error.message);
        return {
            ok: false,
            logs,
            error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
            timedOut
        };
    }
}
/** Execute python/bash as an ephemeral workspace script through the sandbox. */ async function executeScript(ctx, language, code) {
    const ext = language === 'python' ? 'py' : 'sh';
    const scriptRel = `scripts/exec-${Date.now()}.${ext}`;
    (0,_workspace_files__WEBPACK_IMPORTED_MODULE_3__/* .writeWorkspaceFile */ .dx)(ctx.userId, scriptRel, code);
    const argv = language === 'python' ? [
        'python3',
        scriptRel
    ] : [
        'bash',
        scriptRel
    ];
    const result = await (0,_sandbox__WEBPACK_IMPORTED_MODULE_2__/* .execSandboxed */ .y5)({
        userId: ctx.userId,
        argv,
        timeoutMs: 60000
    });
    return {
        ok: result.exitCode === 0,
        language,
        script: scriptRel,
        exitCode: result.exitCode,
        stdout: result.stdout.slice(0, OUTPUT_MAX_CHARS),
        stderr: result.stderr.slice(0, OUTPUT_MAX_CHARS / 2),
        timedOut: result.timedOut,
        durationMs: result.durationMs
    };
}
function createRunCodeTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_1__/* .DynamicStructuredTool */ .XW({
        name: 'run_code',
        description: 'Run sandboxed code to compute an exact answer. JavaScript (default): pure computation only — dose calculations, unit conversions, biostatistics (sensitivity/specificity/NNT, confidence intervals). End with `return value;`, log with console.log; no network, filesystem, or imports. Python: ephemeral script in the user workspace — use for statistics, algorithms, or text/table processing beyond plain arithmetic. Bash: tiny shell pipelines over workspace files. Always use this instead of mental math for numeric medical calculations.',
        schema: zod__WEBPACK_IMPORTED_MODULE_4__/* .object */ .Ikc({
            code: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(1).max(CODE_MAX_CHARS).describe('The code to execute'),
            language: zod__WEBPACK_IMPORTED_MODULE_4__/* ["enum"] */ .k5n([
                'javascript',
                'python',
                'bash'
            ]).optional().describe('Execution language (default javascript)'),
            purpose: zod__WEBPACK_IMPORTED_MODULE_4__/* .string */ .YjP().min(3).describe('One line: what this computation answers')
        }),
        func: async ({ code, language, purpose })=>{
            const started = Date.now();
            // Python / bash need a user context for the workspace jail
            if ((language === 'python' || language === 'bash') && ctx) {
                try {
                    const payload = await executeScript(ctx, language, code);
                    return JSON.stringify({
                        purpose,
                        ...payload
                    }, null, 0);
                } catch (error) {
                    return JSON.stringify({
                        purpose,
                        ok: false,
                        error: error instanceof Error ? error.message : String(error)
                    }, null, 0);
                }
            }
            const effectiveLanguage = language ?? 'javascript';
            if (effectiveLanguage !== 'javascript') {
                return JSON.stringify({
                    purpose,
                    ok: false,
                    error: `${effectiveLanguage} execution requires a user workspace; use JavaScript instead.`
                }, null, 0);
            }
            const outcome = executeInSandbox(code);
            const durationMs = Date.now() - started;
            const payload = {
                purpose,
                ok: outcome.ok,
                result: outcome.result?.slice(0, OUTPUT_MAX_CHARS),
                logs: outcome.logs.slice(0, 50),
                error: outcome.error,
                timedOut: outcome.timedOut,
                durationMs
            };
            return JSON.stringify(payload, null, 0);
        }
    });
}


/***/ }),

/***/ 484393:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ ensureWorkerStarted)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _deep_agent_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142564);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(576532);
/* harmony import */ var _scheduler_cron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64413);
/* harmony import */ var _abort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(520401);
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(791532);
/* harmony import */ var _weak_topics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(118428);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(653165);
/* harmony import */ var _server_push__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(343753);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__, _deep_agent_runtime__WEBPACK_IMPORTED_MODULE_1__, _service__WEBPACK_IMPORTED_MODULE_2__, _audit__WEBPACK_IMPORTED_MODULE_5__, _weak_topics__WEBPACK_IMPORTED_MODULE_6__, _server_push__WEBPACK_IMPORTED_MODULE_8__]);
([_db__WEBPACK_IMPORTED_MODULE_0__, _deep_agent_runtime__WEBPACK_IMPORTED_MODULE_1__, _service__WEBPACK_IMPORTED_MODULE_2__, _audit__WEBPACK_IMPORTED_MODULE_5__, _weak_topics__WEBPACK_IMPORTED_MODULE_6__, _server_push__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const log = (0,_logger__WEBPACK_IMPORTED_MODULE_7__/* .createLogger */ .h)('AgentWorker');
/**
 * In-process queue worker + scheduler tick — the hermes `mini-services/
 * agent-worker` sidecar responsibilities collapsed into the Next.js process
 * (single-instance deployments; the DB lease semantics keep it correct if a
 * future multi-instance deployment runs several workers).
 *
 * Loop every 2s: lease one job → execute → notify → done/fail.
 * Tick every 15s: due ScheduledTasks → enqueue task.run jobs → advance cron.
 *
 * The worker is started lazily (first schedule_task tool call or API hit) AND
 * eagerly on server boot via src/instrumentation.ts. Intervals are unref'd so
 * they never hold the process open.
 */ const JOB_LOOP_MS = 2000;
const TICK_LOOP_MS = 15000;
/** Stable per-process worker id (lease owner column). */ function workerId() {
    const runtime = globalThis;
    if (!runtime.__medqWorkerId) {
        runtime.__medqWorkerId = `worker-${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
    }
    return runtime.__medqWorkerId;
}
const runtime = globalThis;
function ensureWorkerStarted() {
    if (runtime.__medqAgentWorkerStarted) return;
    runtime.__medqAgentWorkerStarted = true;
    const jobTimer = setInterval(()=>{
        void processOneJob().catch((error)=>log.warn?.('job loop error:', error));
    }, JOB_LOOP_MS);
    jobTimer.unref?.();
    const tickTimer = setInterval(()=>{
        void schedulerTick().catch((error)=>log.warn?.('scheduler tick error:', error));
    }, TICK_LOOP_MS);
    tickTimer.unref?.();
    log.info?.(`Agent worker started (${workerId()}) — job loop ${JOB_LOOP_MS}ms, scheduler tick ${TICK_LOOP_MS}ms`);
}
// ── Job execution ─────────────────────────────────────────────────────────
class CancelledError extends Error {
}
async function processOneJob() {
    const job = await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .leaseJob */ .Yf)(workerId());
    if (!job) return;
    const payload = JSON.parse(job.payloadJson);
    const userId = job.userId;
    try {
        // task.run: scheduled autonomous execution. The prompt gets the
        // learner's weak-topic context injected when it references weak areas
        // ("generate 20 MCQs on my weak topics") so the run is personalized.
        const rawMessage = payload.message ?? '';
        let context = payload.context ?? '';
        if (job.kind === 'task.run') {
            const wantsWeak = /weak|struggl|worst|improve|focus on/i.test(rawMessage);
            const weakBlock = wantsWeak || payload.weakTopics ? (0,_weak_topics__WEBPACK_IMPORTED_MODULE_6__/* .formatWeakTopics */ .oC)(await (0,_weak_topics__WEBPACK_IMPORTED_MODULE_6__/* .getWeakTopics */ .ZR)(userId)) : '';
            context = [
                context,
                weakBlock
            ].filter(Boolean).join('\n\n');
        }
        const message = job.kind === 'task.run' ? `You are running a scheduled task for a MedQ learner. Complete it autonomously and produce a concise final result. The learner will read your result as a notification — do not ask them questions.\n\nTask: ${rawMessage}` : rawMessage;
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
            type: 'progress',
            ts: Date.now(),
            text: 'Agent is working…'
        });
        // Abort registry (deep-agent cancel parity): the cancel route can stop
        // this run mid-stream; the durable cancelRequested flag covers the gaps.
        const abortController = (0,_abort__WEBPACK_IMPORTED_MODULE_4__/* .registerJobAbort */ .bs)(job.id);
        let progressStep = 0;
        let finalText = '';
        try {
            for await (const data of (0,_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_1__/* .streamMedQDeepAgent */ .HK)(message, context, {
                modelString: payload.modelString,
                userId,
                threadId: payload.threadId,
                runKind: 'job',
                // Autonomous execution: no human is watching a scheduled/background
                // job, so HITL approval cards can never be answered — every gated
                // tool would wait the full 5-minute timeout, auto-reject, and fail
                // the job (observed: a scheduled question-generation task looping
                // through 11 failed runs on exactly this, and its threadless
                // approval publishes leaking as phantom cards into live chats).
                // The job's SCHEDULING was approved at creation time; executing it
                // needs no second confirmation.
                hitl: 'off',
                history: (payload.history ?? []).map((h)=>({
                        role: h.role === 'assistant' ? 'assistant' : 'user',
                        content: h.content
                    })),
                signal: abortController.signal
            })){
                switch(data.type){
                    case 'plan':
                        if (Array.isArray(data.todos) && data.todos.length > 0) {
                            await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
                                type: 'progress',
                                ts: Date.now(),
                                text: `Planned ${data.todos.length} step${data.todos.length === 1 ? '' : 's'}…`
                            });
                        }
                        break;
                    case 'tool_start':
                        progressStep += 1;
                        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
                            type: 'progress',
                            ts: Date.now(),
                            text: `Running ${data.tool}…`
                        });
                        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .updateProgress */ .DW)(job.id, Math.min(90, 10 + progressStep * 15));
                        break;
                    case 'subagent':
                        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
                            type: 'progress',
                            ts: Date.now(),
                            text: data.event === 'started' ? `Delegating to ${data.name}…` : `${data.name} finished.`
                        });
                        break;
                    case 'done':
                        finalText = data.text || finalText;
                        break;
                    case 'error':
                        if (abortController.signal.aborted || /cancel/i.test(data.error)) {
                            throw new CancelledError(data.error);
                        }
                        throw new Error(data.error);
                }
            }
        } finally{
            (0,_abort__WEBPACK_IMPORTED_MODULE_4__/* .unregisterJobAbort */ .cZ)(job.id);
        }
        if (!finalText) {
            finalText = 'The agent completed without a final answer.';
        }
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
            type: 'text',
            ts: Date.now(),
            text: finalText
        });
        // In-app notification delivery (channel adapters are not ported; the
        // Notification model + existing notifications API is the MedQ-native way
        // the learner discovers completed background work).
        try {
            // Validate the userId still exists before creating a Notification row —
            // a user deletion (or a guest user whose session expired) leaves the
            // AgentJob orphaned, and the Notification.userId foreign key would
            // reject the insert with "Foreign key constraint violated on the
            // constraint: Notification_userId_fkey". The agent's actual work has
            // already completed by this point; we just skip the notification
            // delivery for orphaned jobs rather than failing the whole run.
            const userExists = await _db__WEBPACK_IMPORTED_MODULE_0__.db.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true
                }
            });
            if (!userExists) {
                log.warn?.(`Skipping notification for orphaned job ${job.id}: userId ${userId} not found in User table`);
            } else {
                const task = job.scheduledTaskId ? await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentScheduledTask.findUnique({
                    where: {
                        id: job.scheduledTaskId
                    }
                }) : null;
                await _db__WEBPACK_IMPORTED_MODULE_0__.db.notification.create({
                    data: {
                        userId,
                        type: 'system',
                        title: task ? `Scheduled task "${task.name}" completed` : 'Agent task completed',
                        message: finalText.slice(0, 500),
                        referenceId: job.id
                    }
                }).then((created)=>{
                    // System push to the user's subscribed devices (best-effort —
                    // sendPushForNotification swallows its own errors, and job
                    // completion must never block on a slow push service).
                    void (0,_server_push__WEBPACK_IMPORTED_MODULE_8__/* .sendPushForNotification */ .$)(created.id);
                });
            }
        } catch (error) {
            log.warn?.('notification create failed:', error);
        }
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
            type: 'done',
            ts: Date.now()
        });
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .completeJob */ .h0)(job.id);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof CancelledError || await abortWasRequested(job.id)) {
            await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
                type: 'notice',
                ts: Date.now(),
                text: 'Job cancelled.'
            });
            await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .cancelJob */ .mh)(job.id);
            log.info?.(`Job ${job.id} cancelled by request`);
            return;
        }
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .appendJobEvent */ .mE)(job.id, {
            type: 'error',
            ts: Date.now(),
            text: message
        });
        await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .failJob */ .SG)(job.id, message);
        log.warn?.(`Job ${job.id} failed (attempt ${job.attempts}):`, message);
        // Notify on the FINAL failure only (retries are silent — a rate-limited
        // gateway can 429 transiently; hammering the user with retry noise would
        // be worse than the retry itself). leaseJob increments `attempts` at
        // lease time, so the row we hold already counts THIS attempt — same
        // exhausted predicate as failJob. Silent-failure lesson from the chat
        // rate-limit incident: background work must surface its outcome.
        const exhausted = job.attempts >= job.maxAttempts;
        if (exhausted) {
            try {
                // Same orphaned-user guard as the success path — skip the
                // failure notification when the user has been deleted, instead of
                // logging a noisy FK violation every time the job retries.
                const userExists = await _db__WEBPACK_IMPORTED_MODULE_0__.db.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                });
                if (!userExists) {
                    log.warn?.(`Skipping failure notification for orphaned job ${job.id}: userId ${userId} not found`);
                } else {
                    const task = job.scheduledTaskId ? await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentScheduledTask.findUnique({
                        where: {
                            id: job.scheduledTaskId
                        }
                    }) : null;
                    await _db__WEBPACK_IMPORTED_MODULE_0__.db.notification.create({
                        data: {
                            userId,
                            type: 'system',
                            title: task ? `Scheduled task "${task.name}" failed` : 'Agent task failed',
                            message: `After ${job.maxAttempts} attempts the run could not complete: ${message.slice(0, 300)}`,
                            referenceId: job.id
                        }
                    }).then((created)=>{
                        // Same best-effort push as the completion path.
                        void (0,_server_push__WEBPACK_IMPORTED_MODULE_8__/* .sendPushForNotification */ .$)(created.id);
                    });
                }
            } catch (notifyError) {
                log.warn?.('failure notification create failed:', notifyError);
            }
        }
    }
}
/** Best-effort cancellation check: the durable flag set by the cancel route. */ async function abortWasRequested(jobId) {
    try {
        const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.findUnique({
            where: {
                id: jobId
            },
            select: {
                cancelRequested: true
            }
        });
        return !!row?.cancelRequested;
    } catch  {
        return false;
    }
}
// ── Scheduler tick ────────────────────────────────────────────────────────
async function schedulerTick() {
    const due = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentScheduledTask.findMany({
        where: {
            status: 'active',
            nextRunAt: {
                lte: new Date()
            }
        },
        take: 10
    });
    for (const task of due){
        try {
            await (0,_service__WEBPACK_IMPORTED_MODULE_2__/* .enqueue */ .Z2)({
                userId: task.userId,
                kind: 'task.run',
                payload: {
                    message: task.prompt,
                    threadId: task.threadId ?? undefined
                },
                scheduledTaskId: task.id
            });
            const next = task.cron ? (0,_scheduler_cron__WEBPACK_IMPORTED_MODULE_3__/* .advanceCron */ .rR)(task.cron, task.nextRunAt ?? new Date(), task.timezone) : null;
            await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentScheduledTask.update({
                where: {
                    id: task.id
                },
                data: {
                    lastRunAt: new Date(),
                    nextRunAt: next,
                    // one-shots (no cron) complete after firing
                    status: task.cron ? 'active' : 'completed'
                }
            });
            await (0,_audit__WEBPACK_IMPORTED_MODULE_5__/* .audit */ .s)({
                userId: task.userId,
                action: 'schedule.control',
                target: task.name,
                detail: {
                    fired: true,
                    nextRunAt: next
                }
            });
            log.info?.(`Scheduled task "${task.name}" fired (next: ${next?.toISOString() ?? 'done'})`);
        } catch (error) {
            log.warn?.(`Scheduler failed for task ${task.id}:`, error);
            await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentScheduledTask.update({
                where: {
                    id: task.id
                },
                data: {
                    status: 'failed'
                }
            }).catch(()=>undefined);
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 498523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ensureAgentWorkspace),
/* harmony export */   R: () => (/* binding */ agentWorkspaceRoot)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Agent workspace helpers — minimal stub.
 *
 * The full implementation manages a per-user filesystem jail for the deep
 * agent runtime (file edits, scratch space, AGENTS.md). The platform
 * snapshot dropped the original file; this stub returns no-op / null values
 * so the build compiles and the deep-agent runtime gracefully falls back
 * to in-memory workspace.
 *
 * To restore the full agent workspace, copy the original workspace.ts from
 * your git history or re-run the postinstall skills sync that generated it.
 */ 

function agentWorkspaceRoot(_userId) {
    // Per-user workspace root — we don't actually create the dir here so
    // nothing breaks if the deep-agent runtime is invoked. The runtime's
    // try/catch around ensureAgentWorkspace swallows the ENOENT.
    return path__WEBPACK_IMPORTED_MODULE_0___default().join(os__WEBPACK_IMPORTED_MODULE_1___default().tmpdir(), 'medq-agent-workspace');
}
function ensureAgentWorkspace(_userId) {
    // Caller wraps in try/catch and falls back to in-memory workspace on
    // failure — return the path even though we don't create the dir.
    return agentWorkspaceRoot(_userId);
}


/***/ }),

/***/ 503496:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gE: () => (/* binding */ gitEnv),
/* harmony export */   i2: () => (/* binding */ sandboxRoot),
/* harmony export */   y5: () => (/* binding */ execSandboxed)
/* harmony export */ });
/* unused harmony exports MAX_OUTPUT_BYTES, MAX_TIMEOUT_MS, execLocalRestricted, execRemoteSandbox */
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(731421);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _skills_workspace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(498523);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);





const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('AgentSandbox');
const MAX_OUTPUT_BYTES = 256000;
const MAX_TIMEOUT_MS = 120000;
const DEFAULT_TIMEOUT_MS = 60000;
/** The per-user sandbox root: <workspaces>/<userId>/workspace. */ function sandboxRoot(userId) {
    return node_path__WEBPACK_IMPORTED_MODULE_2___default().join((0,_skills_workspace__WEBPACK_IMPORTED_MODULE_3__/* .agentWorkspaceRoot */ .R)(userId), 'workspace');
}
/** Scrubbed environment — no secrets, no Next.js internals, no DATABASE_URL. */ function scrubbedEnv(home) {
    return {
        PATH: '/usr/local/bin:/usr/bin:/bin',
        HOME: home,
        LANG: 'C.UTF-8',
        TERM: 'dumb'
    };
}
/** Resolve + validate a cwd relative to the jail root (mkdir on demand). */ function resolveJailCwd(userId, cwdRel) {
    const root = sandboxRoot(userId);
    const rel = (cwdRel ?? '').replace(/^[/\\]+/, '');
    const target = node_path__WEBPACK_IMPORTED_MODULE_2___default().resolve(root, rel);
    if (target !== root && !target.startsWith(root + (node_path__WEBPACK_IMPORTED_MODULE_2___default().sep))) {
        throw new Error('cwd escapes the workspace jail');
    }
    node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(target, {
        recursive: true
    });
    return target;
}
/** Local-restricted backend: in-process spawn, cwd jail, env scrub, caps. */ function execLocalRestricted(opts) {
    const cwd = resolveJailCwd(opts.userId, opts.cwdRel);
    const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
    const started = Date.now();
    return new Promise((resolve)=>{
        let stdout = '';
        let stderr = '';
        let timedOut = false;
        let settled = false;
        const child = (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)(opts.argv[0], opts.argv.slice(1), {
            cwd,
            env: {
                ...scrubbedEnv(cwd),
                ...opts.env ?? {}
            },
            stdio: [
                'ignore',
                'pipe',
                'pipe'
            ]
        });
        const cap = (chunk)=>{
            const remaining = MAX_OUTPUT_BYTES - stdout.length - stderr.length;
            if (remaining <= 0) return '';
            return chunk.toString('utf8').slice(0, remaining);
        };
        child.stdout?.on('data', (chunk)=>{
            stdout += cap(chunk);
        });
        child.stderr?.on('data', (chunk)=>{
            stderr += cap(chunk);
        });
        const timer = setTimeout(()=>{
            timedOut = true;
            child.kill('SIGKILL');
        }, timeoutMs);
        timer.unref?.();
        const finish = (code, killed)=>{
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve({
                stdout: stdout.slice(0, MAX_OUTPUT_BYTES),
                stderr: stderr.slice(0, MAX_OUTPUT_BYTES),
                exitCode: code,
                timedOut,
                durationMs: Date.now() - started,
                killed
            });
        };
        child.on('close', (code)=>finish(code, false));
        child.on('error', (err)=>{
            stderr += String(err);
            finish(null, false);
        });
    });
}
/** Remote backend: hermes agent-worker contract (POST /exec, NDJSON stream). */ async function execRemoteSandbox(baseUrl, token, opts) {
    const started = Date.now();
    const controller = new AbortController();
    const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
    const timer = setTimeout(()=>controller.abort(), timeoutMs + 5000);
    timer.unref?.();
    try {
        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/exec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-sandbox-token': token
            },
            body: JSON.stringify({
                workspaceId: opts.userId,
                argv: opts.argv,
                cwdRel: opts.cwdRel ?? '',
                timeoutMs,
                env: opts.env ?? {}
            }),
            signal: controller.signal
        });
        if (!response.ok || !response.body) {
            return {
                stdout: '',
                stderr: `Sandbox HTTP ${response.status}`,
                exitCode: null,
                timedOut: false,
                durationMs: Date.now() - started,
                killed: false
            };
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let stdout = '';
        let stderr = '';
        let result = {};
        for(;;){
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, {
                stream: true
            });
            let idx;
            while((idx = buffer.indexOf('\n')) >= 0){
                const line = buffer.slice(0, idx).trim();
                buffer = buffer.slice(idx + 1);
                if (!line) continue;
                try {
                    const evt = JSON.parse(line);
                    if (evt.type === 'stdout' && evt.data) stdout = (stdout + evt.data).slice(0, MAX_OUTPUT_BYTES);
                    else if (evt.type === 'stderr' && evt.data) stderr = (stderr + evt.data).slice(0, MAX_OUTPUT_BYTES);
                    else if (evt.type === 'exit') {
                        result = {
                            exitCode: evt.exitCode ?? null,
                            timedOut: Boolean(evt.timedOut),
                            durationMs: evt.durationMs ?? Date.now() - started
                        };
                    }
                } catch  {}
            }
        }
        return {
            stdout,
            stderr,
            exitCode: result.exitCode ?? null,
            timedOut: result.timedOut ?? false,
            durationMs: result.durationMs ?? Date.now() - started,
            killed: false
        };
    } catch (error) {
        return {
            stdout: '',
            stderr: error instanceof Error ? error.message : String(error),
            exitCode: null,
            timedOut: false,
            durationMs: Date.now() - started,
            killed: false
        };
    } finally{
        clearTimeout(timer);
    }
}
/** Dispatch to the configured backend (remote when MEDQ_SANDBOX_URL is set). */ function execSandboxed(opts) {
    const url = process.env.MEDQ_SANDBOX_URL;
    if (url) {
        return execRemoteSandbox(url, process.env.MEDQ_SANDBOX_TOKEN || 'dev-sandbox-token', opts);
    }
    return execLocalRestricted(opts);
}
/** Hardened git environment (hermes git tool posture). */ function gitEnv(workspaceHome) {
    return {
        GIT_TERMINAL_PROMPT: '0',
        GIT_CONFIG_GLOBAL: '/dev/null',
        GIT_CONFIG_SYSTEM: '/dev/null',
        GIT_AUTHOR_NAME: 'MedQ Agent',
        GIT_AUTHOR_EMAIL: 'agent@medq.local',
        GIT_COMMITTER_NAME: 'MedQ Agent',
        GIT_COMMITTER_EMAIL: 'agent@medq.local',
        HOME: workspaceHome
    };
}


/***/ }),

/***/ 515390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   En: () => (/* binding */ buildEvenWindows),
/* harmony export */   He: () => (/* binding */ detectSceneCuts),
/* harmony export */   K_: () => (/* binding */ pickVlmScenes),
/* harmony export */   bz: () => (/* binding */ fmtSec),
/* harmony export */   fQ: () => (/* binding */ assignDescriptionsToScenes),
/* harmony export */   og: () => (/* binding */ buildScenes),
/* harmony export */   w_: () => (/* binding */ assignTranscriptToScenes)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/**
 * knowledge/scene-detect.ts — video scene segmentation (Stage 3).
 *
 * Turns a video into TEMPERATURE-ALIGNED scenes so retrieval can answer
 * "what was shown at 12:34" and questions can cite an exact span
 * (mediaTimeSec) instead of the whole file.
 *
 * Detection strategy (spike decision — Option D, ffmpeg-first):
 *   1. ffmpeg's scene-change filter (`select='gt(scene,T)'` + showinfo)
 *      emits candidate cut timestamps — in-process, no new dependencies.
 *   2. Pure builder logic (buildScenes) sanitizes cuts, merges scenes
 *      shorter than a floor into neighbors, and caps the scene count —
 *      so a 60-min lecture with 200 hard cuts becomes ≤60 stable scenes.
 *   3. VLM confirmation is implicit: each persisted scene carries the VLM
 *      description of its representative frame (a cut the VLM can't
 *      describe degenerates to a transcript-only scene), which keeps cost
 *      at one vision call per ANALYZED scene, not per cut.
 *   4. Fallback (no cuts detected / filter fails): even time windows
 *      (buildEvenWindows) — honest about being temporal slices, labeled
 *      detection='even-window' in the data model.
 *
 * Every builder here is PURE and unit-tested (test/scene-segmentation);
 * only detectSceneCuts touches the filesystem/ffmpeg.
 */ 

const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
// ─── ffmpeg scene detection ────────────────────────────────────────────────
/**
 * Detect scene-change timestamps with ffmpeg's scene filter.
 * Returns [] when nothing crosses the threshold or the filter fails
 * (callers fall back to even windows) — never throws for ordinary inputs.
 */ async function detectSceneCuts(inputPath, opts = {}) {
    const threshold = opts.threshold ?? 0.3;
    try {
        const { stderr } = await execFileAsync('ffmpeg', [
            '-i',
            inputPath,
            '-filter:v',
            `select='gt(scene,${threshold})',showinfo`,
            '-an',
            '-f',
            'null',
            '-'
        ], {
            timeout: opts.timeoutMs ?? 180000,
            maxBuffer: 1024 * 1024 * 64
        });
        const cuts = [];
        // showinfo prints one block per SELECTED frame: ... pts_time:123.456 ...
        for (const m of stderr.matchAll(/pts_time:(\d+(?:\.\d+)?)/g)){
            const t = Number.parseFloat(m[1]);
            if (Number.isFinite(t)) cuts.push(t);
        }
        return cuts.map((atSec)=>({
                atSec
            }));
    } catch  {
        return [];
    }
}
// ─── Pure scene builders ───────────────────────────────────────────────────
/** Clamp v into [lo, hi]. */ const clamp = (v, lo, hi)=>Math.min(Math.max(v, lo), hi);
/**
 * Cut timestamps → scene spans.
 *
 *   - cuts outside (0.5s, duration-0.5s) are dropped; sorted; deduped
 *   - scenes shorter than minSceneSec are merged into their shorter
 *     neighbor (previous wins ties) until none remain under the floor
 *   - scene count is capped at maxScenes by repeatedly merging the
 *     SHORTEST scene into its shorter neighbor (stable, order-preserving)
 *   - the result always spans [0, duration]
 */ function buildScenes(cutTimes, durationSec, opts = {}) {
    const minScene = opts.minSceneSec ?? 5;
    const maxScenes = opts.maxScenes ?? 60;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    const cuts = [
        ...new Set(cutTimes.filter((t)=>Number.isFinite(t) && t > 0.5 && t < duration - 0.5).map((t)=>Math.round(t * 1000) / 1000))
    ].sort((a, b)=>a - b);
    let spans = [];
    const bounds = [
        0,
        ...cuts,
        duration
    ];
    for(let i = 0; i + 1 < bounds.length; i++)spans.push([
        bounds[i],
        bounds[i + 1]
    ]);
    // Merge-under-floor + cap-to-max share the "merge scene i into its
    // shorter neighbor" primitive.
    const mergeIntoNeighbor = (idx)=>{
        const prev = idx - 1;
        const next = idx + 1;
        let target;
        if (prev < 0) target = next;
        else if (next >= spans.length) target = prev;
        else {
            const prevLen = spans[prev][1] - spans[prev][0];
            const nextLen = spans[next][1] - spans[next][0];
            target = prevLen <= nextLen ? prev : next;
        }
        const lo = Math.min(spans[idx][0], spans[target][0]);
        const hi = Math.max(spans[idx][1], spans[target][1]);
        spans.splice(Math.min(idx, target), 2, [
            lo,
            hi
        ]);
    };
    let guard = spans.length * 2 + 8;
    while(spans.length > 1){
        const idx = spans.findIndex(([s, e])=>e - s < minScene);
        if (idx < 0 || guard-- <= 0) break;
        mergeIntoNeighbor(idx);
    }
    while(spans.length > maxScenes){
        let shortest = 0;
        for(let i = 1; i < spans.length; i++){
            if (spans[i][1] - spans[i][0] < spans[shortest][1] - spans[shortest][0]) shortest = i;
        }
        mergeIntoNeighbor(shortest);
    }
    return spans.map(([startSec, endSec], i)=>({
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        }));
}
/**
 * Even time windows (fallback when no scene cuts are detected — single-set
 * lectures, screencasts). Window size is clamped so we get between 1 and
 * maxScenes windows of at least minWindowSec each (minute-level temporal
 * navigation without fabricating content boundaries).
 */ function buildEvenWindows(durationSec, opts = {}) {
    const minWindow = opts.minWindowSec ?? 60;
    const maxScenes = opts.maxScenes ?? 60;
    const target = opts.targetScenes ?? 24;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    if (duration <= minWindow) {
        return [
            {
                sceneIdx: 0,
                startSec: 0,
                endSec: duration,
                midSec: Math.round(duration / 2 * 1000) / 1000
            }
        ];
    }
    const n = clamp(Math.round(duration / minWindow) >= target ? Math.ceil(duration / Math.max(minWindow, duration / target)) : Math.ceil(duration / minWindow), 1, maxScenes);
    const width = duration / n;
    return Array.from({
        length: n
    }, (_, i)=>{
        const startSec = i * width;
        const endSec = i === n - 1 ? duration : (i + 1) * width;
        return {
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        };
    });
}
// ─── Assignment helpers (pure) ─────────────────────────────────────────────
/** mm:ss stamp (local copy — keeps this module dependency-free). */ function fmtSec(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
/**
 * Which scene spans get a VLM frame analysis. All of them when ≤ max;
 * otherwise an evenly-spaced subset (index coverage across the timeline).
 */ function pickVlmScenes(scenes, max) {
    if (scenes.length === 0 || max <= 0) return [];
    if (scenes.length <= max) return scenes;
    const picked = [];
    for(let i = 0; i < max; i++){
        const idx = Math.round(i * (scenes.length - 1) / (max - 1));
        if (!picked.includes(scenes[idx])) picked.push(scenes[idx]);
    }
    return picked;
}
/**
 * Assign timestamped ASR segments to the scenes that CONTAIN them
 * (segments outside every scene — e.g. rounding edges — clamp to the
 * nearest boundary). Returns one transcript string per scene, [mm:ss]-stamped.
 */ function assignTranscriptToScenes(segments, scenes) {
    const buckets = scenes.map(()=>[]);
    if (scenes.length === 0) return [];
    for (const seg of segments){
        const text = seg?.text?.trim();
        if (!text) continue;
        let idx = scenes.findIndex((s)=>seg.offsetSec >= s.startSec && seg.offsetSec < s.endSec);
        if (idx < 0) {
            // clamp to the nearest scene by boundary distance
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(seg.offsetSec - s.startSec), Math.abs(seg.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        buckets[idx].push(`[${fmtSec(seg.offsetSec)}] ${text}`);
    }
    return buckets.map((parts)=>parts.join(' '));
}
/**
 * Assign frame VLM descriptions to the scenes that CONTAIN each frame
 * timestamp (nearest scene wins for edge frames). Later frames win ties,
 * so the most recent analysis of a span is the one kept.
 */ function assignDescriptionsToScenes(frames, scenes) {
    const out = scenes.map(()=>undefined);
    if (scenes.length === 0) return out;
    for (const frame of frames){
        if (!frame?.description?.trim()) continue;
        let idx = scenes.findIndex((s)=>frame.offsetSec >= s.startSec && frame.offsetSec < s.endSec);
        if (idx < 0) {
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(frame.offsetSec - s.startSec), Math.abs(frame.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        out[idx] = frame.description.trim();
    }
    return out;
}


/***/ }),

/***/ 520401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bs: () => (/* binding */ registerJobAbort),
/* harmony export */   cZ: () => (/* binding */ unregisterJobAbort)
/* harmony export */ });
/* unused harmony exports abortJob, activeJobCount */
/**
 * Job abort registry — deep-agent runs/[id]/cancel parity
 * (compare-and-integrate-4). The worker registers an AbortController per
 * in-flight agent.run job; the cancel route aborts it so the underlying
 * LangGraph stream stops at the next checkpoint instead of running to
 * completion. The durable `cancelRequested` flag (queue service) remains the
 * fallback path for jobs between checkpoints and across restarts.
 */ const runtime = globalThis;
const registry = runtime.__medqJobAborts ??= new Map();
/** Register an abort controller for a running job (worker). */ function registerJobAbort(jobId) {
    const controller = new AbortController();
    registry.set(jobId, {
        controller,
        startedAt: Date.now()
    });
    return controller;
}
/** Unregister on completion (worker finally block). */ function unregisterJobAbort(jobId) {
    registry.delete(jobId);
}
/** Abort an in-flight job (cancel route). Returns true if a live run was aborted. */ function abortJob(jobId) {
    const entry = registry.get(jobId);
    if (!entry) return false;
    entry.controller.abort();
    registry.delete(jobId);
    return true;
}
/** Live jobs snapshot (diagnostics). */ function activeJobCount() {
    return registry.size;
}


/***/ }),

/***/ 527519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ createChartTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(993958);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('AgentChart');
const THEME = {
    dark: {
        background: '#0d1117',
        text: '#e8ecf4',
        muted: '#9ca3b8',
        axis: '#30363d',
        palette: [
            '#00e5a0',
            '#8b5cf6',
            '#4fc3f7',
            '#fbbf24',
            '#f87171',
            '#34d399',
            '#e879f9'
        ]
    },
    light: {
        background: '#ffffff',
        text: '#1a2332',
        muted: '#5a6478',
        axis: '#d0d7de',
        palette: [
            '#0e7c66',
            '#7c3aed',
            '#0284c7',
            '#d97706',
            '#dc2626',
            '#059669',
            '#c026d3'
        ]
    }
};
function buildOption(chartType, data, title, xlabel, ylabel, theme) {
    const t = THEME[theme];
    const labels = Array.isArray(data.labels) ? data.labels : [];
    const seriesList = Array.isArray(data.series) && data.series.length > 0 ? data.series : [
        {
            name: 'Series 1',
            data: Array.isArray(data.values) ? data.values : []
        }
    ];
    const base = {
        backgroundColor: t.background,
        textStyle: {
            color: t.text,
            fontFamily: 'DejaVu Sans, Helvetica, Arial, sans-serif'
        },
        title: {
            text: title,
            left: 'center',
            top: 14,
            textStyle: {
                color: t.text,
                fontSize: 17,
                fontWeight: 600
            }
        },
        tooltip: {
            show: false
        },
        animation: false,
        color: t.palette,
        grid: {
            left: 64,
            right: 32,
            top: 64,
            bottom: 56
        }
    };
    const categoryAxis = {
        type: 'category',
        data: labels,
        axisLine: {
            lineStyle: {
                color: t.axis
            }
        },
        axisLabel: {
            color: t.muted,
            fontSize: 11,
            interval: 0,
            rotate: labels.length > 6 ? 30 : 0
        }
    };
    const valueAxis = {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: t.axis
            }
        },
        axisLabel: {
            color: t.muted,
            fontSize: 11
        },
        splitLine: {
            lineStyle: {
                color: t.axis,
                type: 'dashed'
            }
        }
    };
    switch(chartType){
        case 'bar':
            return {
                ...base,
                xAxis: {
                    ...categoryAxis,
                    name: xlabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                yAxis: {
                    ...valueAxis,
                    name: ylabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                series: seriesList.map((series)=>({
                        name: series.name,
                        type: 'bar',
                        data: series.data,
                        barMaxWidth: 42
                    }))
            };
        case 'line':
            return {
                ...base,
                xAxis: {
                    ...categoryAxis,
                    name: xlabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                yAxis: {
                    ...valueAxis,
                    name: ylabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                series: seriesList.map((series)=>({
                        name: series.name,
                        type: 'line',
                        data: series.data,
                        smooth: true,
                        symbolSize: 7
                    }))
            };
        case 'area':
            return {
                ...base,
                xAxis: {
                    ...categoryAxis,
                    name: xlabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                yAxis: {
                    ...valueAxis,
                    name: ylabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                series: seriesList.map((series)=>({
                        name: series.name,
                        type: 'line',
                        data: series.data,
                        areaStyle: {
                            opacity: 0.28
                        },
                        smooth: true
                    }))
            };
        case 'scatter':
            return {
                ...base,
                xAxis: {
                    ...valueAxis,
                    name: xlabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                yAxis: {
                    ...valueAxis,
                    name: ylabel || undefined,
                    nameTextStyle: {
                        color: t.muted
                    }
                },
                series: seriesList.map((series)=>({
                        name: series.name,
                        type: 'scatter',
                        data: series.data.map((value, index)=>[
                                labels[index] ?? index,
                                value
                            ]),
                        symbolSize: 10
                    }))
            };
        case 'pie':
            return {
                ...base,
                legend: {
                    bottom: 10,
                    textStyle: {
                        color: t.muted
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: [
                            '38%',
                            '68%'
                        ],
                        center: [
                            '50%',
                            '54%'
                        ],
                        label: {
                            color: t.muted,
                            fontSize: 11
                        },
                        data: (Array.isArray(data.values) ? data.values : []).map((value, index)=>({
                                name: labels[index] ?? `#${index + 1}`,
                                value
                            }))
                    }
                ]
            };
        case 'radar':
            return {
                ...base,
                radar: {
                    indicator: labels.map((label)=>({
                            name: label,
                            max: 100
                        })),
                    axisName: {
                        color: t.muted,
                        fontSize: 11
                    },
                    splitLine: {
                        lineStyle: {
                            color: t.axis
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: t.axis
                        }
                    }
                },
                series: [
                    {
                        type: 'radar',
                        data: seriesList.map((series)=>({
                                name: series.name,
                                value: series.data.map((value)=>Math.max(0, Math.min(100, value))),
                                areaStyle: {
                                    opacity: 0.22
                                }
                            }))
                    }
                ]
            };
        case 'heatmap':
            {
                const xLabels = Array.isArray(data.xLabels) ? data.xLabels : labels;
                const yLabels = (Array.isArray(data.heatmap) ? data.heatmap : seriesList).map((s)=>s.name);
                const yData = Array.isArray(data.heatmap) && data.heatmap.length > 0 ? data.heatmap : seriesList;
                const allValues = [];
                const cellData = [];
                yData.forEach((row, yIdx)=>{
                    (row.data ?? []).forEach((value, xIdx)=>{
                        cellData.push([
                            xIdx,
                            yIdx,
                            value
                        ]);
                        allValues.push(value);
                    });
                });
                const minVal = allValues.length ? Math.min(...allValues) : 0;
                const maxVal = allValues.length ? Math.max(...allValues) : 100;
                return {
                    ...base,
                    tooltip: {
                        show: true,
                        formatter: (p)=>`${xLabels[p.value[0]] ?? ''} · ${yLabels[p.value[1]] ?? ''}: ${p.value[2]}`
                    },
                    grid: {
                        left: 100,
                        right: 60,
                        top: 64,
                        bottom: 80
                    },
                    xAxis: {
                        type: 'category',
                        data: xLabels,
                        axisLabel: {
                            color: t.muted,
                            fontSize: 11,
                            rotate: xLabels.length > 6 ? 30 : 0
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: t.axis
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: yLabels,
                        axisLabel: {
                            color: t.muted,
                            fontSize: 11
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: t.axis
                            }
                        }
                    },
                    visualMap: {
                        min: minVal,
                        max: maxVal,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: 10,
                        textStyle: {
                            color: t.muted,
                            fontSize: 10
                        },
                        inRange: {
                            color: [
                                '#0d1117',
                                '#00e5a0',
                                '#fbbf24',
                                '#f87171'
                            ]
                        }
                    },
                    series: [
                        {
                            type: 'heatmap',
                            data: cellData,
                            label: {
                                show: cellData.length <= 80,
                                color: t.text,
                                fontSize: 10
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 8,
                                    shadowColor: 'rgba(0,0,0,0.5)'
                                }
                            }
                        }
                    ]
                };
            }
    }
}
function createChartTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_chart',
        description: 'Create a data visualization chart as a downloadable PNG image: bar, line, pie, scatter, area, radar, or heatmap. Use bar for comparing drugs/lab values, line for trends over time, pie for proportions, scatter for correlations, radar for multi-axis profiles, heatmap for matrix data (e.g. symptom × disease likelihood, drug × side-effect frequency).',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            chart_type: zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n([
                'bar',
                'line',
                'pie',
                'scatter',
                'area',
                'radar',
                'heatmap'
            ]).describe('Chart type. Heatmap accepts data.heatmap rows + data.xLabels columns.'),
            data: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(8).max(100000).describe('JSON: {"labels":["A","B"], "values":[1,2]} or {"labels":[...], "series":[{"name":"grp","data":[...]}]} or {"xLabels":["M","T","W"], "heatmap":[{"name":"drug-A","data":[1,4,2]},{"name":"drug-B","data":[2,1,5]}]}. Radar values are 0-100.'),
            title: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(2).max(120).describe('Chart title'),
            xlabel: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(60).optional().describe('X-axis label'),
            ylabel: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(60).optional().describe('Y-axis label'),
            theme: zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n([
                'dark',
                'light'
            ]).optional().describe('Color theme, default dark'),
            filename: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(80).optional().describe('File base name, default derived from title')
        }),
        func: async ({ chart_type, data, title, xlabel, ylabel, theme = 'dark', filename })=>{
            try {
                let parsed;
                try {
                    const raw = JSON.parse(data);
                    if (!raw || typeof raw !== 'object') throw new Error('data must be a JSON object');
                    parsed = raw;
                } catch (parseError) {
                    return JSON.stringify({
                        created: false,
                        error: parseError instanceof Error ? `Invalid data: ${parseError.message}` : 'Invalid data'
                    });
                }
                const hasValues = Array.isArray(parsed.values) && parsed.values.length > 0;
                const hasSeries = Array.isArray(parsed.series) && parsed.series.some((series)=>Array.isArray(series.data) && series.data.length > 0);
                const hasHeatmap = Array.isArray(parsed.heatmap) && parsed.heatmap.some((row)=>Array.isArray(row.data) && row.data.length > 0);
                if (!hasValues && !hasSeries && !hasHeatmap) {
                    return JSON.stringify({
                        created: false,
                        error: 'data must include values[], series[].data[], or heatmap[].data[]'
                    });
                }
                const echarts = await __webpack_require__.e(/* import() */ 9910).then(__webpack_require__.bind(__webpack_require__, 989910));
                const option = buildOption(chart_type, parsed, title, xlabel ?? '', ylabel ?? '', theme);
                // echarts SSR: init with no DOM container, render synchronously to SVG.
                const chart = echarts.init(null, null, {
                    renderer: 'svg',
                    ssr: true,
                    width: 1000,
                    height: 600
                });
                try {
                    chart.setOption(option);
                    const svg = chart.renderToSVGString();
                    const sharp = (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 842482))).default;
                    const png = await sharp(Buffer.from(svg), {
                        density: 144
                    }).png().toBuffer();
                    const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'chart';
                    const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                        userId: ctx.userId,
                        name: base,
                        kind: 'chart',
                        mimeType: 'image/png',
                        buffer: png,
                        meta: {
                            title,
                            chartType: chart_type,
                            theme
                        }
                    });
                    return JSON.stringify({
                        created: true,
                        artifact: {
                            id: artifact.id,
                            name: artifact.name,
                            filename: `${base}.png`,
                            downloadUrl: artifact.downloadUrl,
                            previewUrl: artifact.url,
                            mimeType: 'image/png',
                            kind: 'chart'
                        },
                        note: 'Chart saved. Include the image in your final answer.'
                    });
                } finally{
                    chart.dispose();
                }
            } catch (error) {
                log.warn?.('create_chart failed:', error);
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}


/***/ }),

/***/ 544811:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ createMessagingTools)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _chat_digest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(318958);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__, _chat_digest__WEBPACK_IMPORTED_MODULE_2__]);
([_db__WEBPACK_IMPORTED_MODULE_1__, _chat_digest__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




/**
 * Messaging tools — the agent's bridge into the Messages tab.
 *
 * The chat system (ChatRoom / ChatRoomMember / ChatMessage) backs the
 * Telegram-style Messages tab; these tools expose the same capabilities the
 * tab has to the assistant:
 *
 *   list_chat_rooms          read   rooms + unread counts + members
 *   read_chat_messages       read   recent messages (never marks read)
 *   summarize_unread_messages read  AI digest of a busy room (map-reduce on the
 *                                   fast model) with event extraction
 *   send_chat_message        write  post to a room (HITL-gated)
 *   start_direct_message     write  find-or-create a DM + first message (gated)
 *   create_chat_group        write  new group with members (gated)
 *   send_push_notification   write  web push to the user's devices (gated)
 *
 * Writes replicate the REST routes' logic exactly (same DB writes + the
 * best-effort socket broadcast to localhost:3004) so online Messages tabs
 * update live, and reading NEVER bumps ChatRoomMember.lastReadAt — the user's
 * unread badge is theirs to clear, not the agent's.
 */ /** Best-effort socket broadcast (identical to the REST send route). */ async function broadcastChat(event, roomId, data) {
    try {
        await fetch('http://localhost:3004/emit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event,
                room: roomId,
                data
            })
        });
    } catch  {
    // chat service not running — DB write stands, clients refresh on focus
    }
}
/** Unread count for one membership (same query as the rooms REST route). */ function unreadCountWhere(roomId, userId, lastReadAt) {
    return {
        roomId,
        senderId: {
            not: userId
        },
        isDeleted: false,
        createdAt: {
            gt: lastReadAt
        }
    };
}
function createMessagingTools(ctx, options = {}) {
    // ── list_chat_rooms ──────────────────────────────────────────────────────
    const listChatRooms = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'list_chat_rooms',
        description: 'List the learner\'s chat rooms (the Messages tab conversations): group chats and direct messages, each with its unread count, participants and last message preview. Use this FIRST whenever the learner asks anything about their messages, groups or DMs.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({}),
        func: async ()=>{
            try {
                const memberships = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findMany({
                    where: {
                        userId: ctx.userId
                    },
                    include: {
                        room: {
                            include: {
                                members: {
                                    include: {
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        role: 'asc'
                    },
                    take: 50
                });
                // Newest activity first.
                memberships.sort((a, b)=>b.room.lastMessageAt.getTime() - a.room.lastMessageAt.getTime());
                const rooms = await Promise.all(memberships.map(async (membership)=>{
                    const room = membership.room;
                    const [unreadCount, lastMessage] = await Promise.all([
                        _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.count({
                            where: unreadCountWhere(room.id, ctx.userId, membership.lastReadAt)
                        }),
                        _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findFirst({
                            where: {
                                roomId: room.id,
                                isDeleted: false
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            select: {
                                content: true,
                                senderId: true,
                                createdAt: true,
                                type: true
                            }
                        })
                    ]);
                    const otherMembers = room.members.filter((member)=>member.userId !== ctx.userId).map((member)=>({
                            id: member.user.id,
                            name: member.user.name
                        }));
                    const label = room.type === 'group' ? room.name || 'Unnamed group' : otherMembers[0]?.name ?? 'Direct message';
                    return {
                        roomId: room.id,
                        type: room.type,
                        name: label,
                        unreadCount,
                        isMuted: membership.isMuted,
                        members: room.type === 'group' ? otherMembers : otherMembers.slice(0, 1),
                        lastMessage: lastMessage ? {
                            preview: (lastMessage.content || `[${lastMessage.type}]`).slice(0, 80),
                            fromSelf: lastMessage.senderId === ctx.userId,
                            at: lastMessage.createdAt.toISOString()
                        } : null
                    };
                }));
                return JSON.stringify({
                    rooms,
                    hint: 'Room names/ids come from here. Use summarize_unread_messages for rooms with many unread messages; read_chat_messages for the latest messages of a room.'
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── read_chat_messages ───────────────────────────────────────────────────
    const readChatMessages = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'read_chat_messages',
        description: 'Read the most recent messages of one chat room (Messages tab). Does NOT mark the room as read — the learner\'s unread badge is untouched.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            roomId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(5).describe('Room id from list_chat_rooms'),
            limit: zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().min(1).max(80).optional().describe('How many recent messages (default 25)')
        }),
        func: async ({ roomId, limit })=>{
            try {
                const membership = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findUnique({
                    where: {
                        roomId_userId: {
                            roomId,
                            userId: ctx.userId
                        }
                    }
                });
                if (!membership) return JSON.stringify({
                    error: 'Not a member of that room'
                });
                const take = limit ?? 25;
                const rows = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findMany({
                    where: {
                        roomId,
                        isDeleted: false
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take
                });
                rows.reverse();
                return JSON.stringify({
                    roomId,
                    messages: rows.map((row)=>({
                            id: row.id,
                            sender: row.sender.name,
                            fromSelf: row.senderId === ctx.userId,
                            content: row.content.slice(0, 1500),
                            type: row.type,
                            at: row.createdAt.toISOString()
                        }))
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── summarize_unread_messages ────────────────────────────────────────────
    const summarizeUnread = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'summarize_unread_messages',
        description: 'AI-digest the UNREAD messages of one chat room — built for the "thousands of unread" case: messages are chunk-summarized on a fast model, then merged into one digest with extracted events (meetings, exam schedules, deadlines, announcements). Returns the digest plus a structured events list you can turn into push notifications with send_push_notification.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            roomId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(5).describe('Room id from list_chat_rooms'),
            maxMessages: zod__WEBPACK_IMPORTED_MODULE_3__/* .number */ .aig().int().min(20).max(1000).optional().describe('Cap on messages analyzed (default 600, oldest beyond the cap are skipped and reported)')
        }),
        func: async ({ roomId, maxMessages })=>{
            try {
                const digest = await (0,_chat_digest__WEBPACK_IMPORTED_MODULE_2__/* .digestUnreadMessages */ .o)({
                    userId: ctx.userId,
                    roomId,
                    maxMessages: maxMessages ?? 600,
                    model: options.fastModel ?? undefined
                });
                return JSON.stringify(digest);
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── send_chat_message (HITL-gated in the registry) ───────────────────────
    const sendChatMessage = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'send_chat_message',
        description: 'Send a message to one of the learner\'s chat rooms (group or direct) on their behalf, exactly as if typed in the Messages tab. ALWAYS confirm the room with list_chat_rooms first, and draft the message from the learner\'s intent — never invent content they did not ask for.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            roomId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(5).describe('Room id from list_chat_rooms'),
            content: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(1).max(4000).describe('Message text to send'),
            replyToId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().optional().describe('Message id being replied to, when replying')
        }),
        func: async ({ roomId, content, replyToId })=>{
            try {
                const membership = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findUnique({
                    where: {
                        roomId_userId: {
                            roomId,
                            userId: ctx.userId
                        }
                    }
                });
                if (!membership) return JSON.stringify({
                    sent: false,
                    error: 'Not a member of that room'
                });
                if (replyToId) {
                    const target = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.findUnique({
                        where: {
                            id: replyToId
                        }
                    });
                    if (!target || target.roomId !== roomId) {
                        return JSON.stringify({
                            sent: false,
                            error: 'Reply message not found in this room'
                        });
                    }
                }
                const message = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                    data: {
                        roomId,
                        senderId: ctx.userId,
                        content: content.trim(),
                        type: 'text',
                        metadata: JSON.stringify({
                            via: 'medq-agent'
                        }),
                        replyToId: replyToId || null
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        },
                        replyTo: {
                            select: {
                                id: true,
                                content: true,
                                senderId: true,
                                sender: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                });
                await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.update({
                    where: {
                        id: roomId
                    },
                    data: {
                        lastMessageAt: new Date()
                    }
                });
                await broadcastChat('new:message', roomId, message);
                return JSON.stringify({
                    sent: true,
                    roomId,
                    messageId: message.id,
                    roomRefreshed: true,
                    note: 'Message delivered (the Messages tab updates automatically).'
                });
            } catch (error) {
                return JSON.stringify({
                    sent: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── start_direct_message (HITL-gated) ────────────────────────────────────
    const startDirectMessage = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'start_direct_message',
        description: 'Open (or reuse) a direct-message room with another MedQ user and optionally send the first message. Resolve the target by name via list_chat_rooms (existing DMs) or the learner\'s statement; only users sharing a room with the learner can be reached.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            targetUserName: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(2).max(80).describe('Exact user name of the recipient'),
            content: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(4000).optional().describe('Optional first message to send')
        }),
        func: async ({ targetUserName, content })=>{
            try {
                // Resolve candidate users: anyone sharing a room with the learner.
                const myRoomIds = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findMany({
                    where: {
                        userId: ctx.userId
                    },
                    select: {
                        roomId: true
                    }
                });
                const roomIds = myRoomIds.map((row)=>row.roomId);
                const candidates = roomIds.length ? await _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findMany({
                    where: {
                        name: {
                            equals: targetUserName,
                            mode: 'insensitive'
                        },
                        chatRoomMembers: {
                            some: {
                                roomId: {
                                    in: roomIds
                                }
                            }
                        }
                    },
                    select: {
                        id: true,
                        name: true
                    },
                    take: 5
                }) : [];
                if (candidates.length === 0) {
                    return JSON.stringify({
                        started: false,
                        error: `No reachable user named "${targetUserName}". They must share a chat room with the learner first.`
                    });
                }
                if (candidates.length > 1) {
                    return JSON.stringify({
                        started: false,
                        ambiguous: true,
                        candidates: candidates.map((candidate)=>candidate.name),
                        hint: 'Ask the learner which person they mean.'
                    });
                }
                const target = candidates[0];
                if (target.id === ctx.userId) {
                    return JSON.stringify({
                        started: false,
                        error: 'That is the learner themselves.'
                    });
                }
                // Find-or-create the direct room (same rule as /api/chat/direct).
                const existing = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.findFirst({
                    where: {
                        type: 'direct',
                        AND: [
                            {
                                members: {
                                    some: {
                                        userId: ctx.userId
                                    }
                                }
                            },
                            {
                                members: {
                                    some: {
                                        userId: target.id
                                    }
                                }
                            }
                        ]
                    },
                    include: {
                        members: true
                    }
                });
                let roomId;
                if (existing) {
                    roomId = existing.id;
                } else {
                    const room = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.create({
                        data: {
                            type: 'direct',
                            createdBy: ctx.userId,
                            members: {
                                create: [
                                    {
                                        userId: ctx.userId,
                                        role: 'member'
                                    },
                                    {
                                        userId: target.id,
                                        role: 'member'
                                    }
                                ]
                            }
                        }
                    });
                    roomId = room.id;
                }
                let messageId;
                if (content?.trim()) {
                    const message = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                        data: {
                            roomId,
                            senderId: ctx.userId,
                            content: content.trim(),
                            type: 'text',
                            metadata: JSON.stringify({
                                via: 'medq-agent'
                            })
                        },
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    });
                    await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.update({
                        where: {
                            id: roomId
                        },
                        data: {
                            lastMessageAt: new Date()
                        }
                    });
                    await broadcastChat('new:message', roomId, message);
                    messageId = message.id;
                }
                return JSON.stringify({
                    started: true,
                    roomId,
                    to: target.name,
                    messageId,
                    roomRefreshed: true
                });
            } catch (error) {
                return JSON.stringify({
                    started: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── create_chat_group (HITL-gated) ───────────────────────────────────────
    const createChatGroup = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_chat_group',
        description: 'Create a new group chat in the Messages tab with the learner as admin, add members by exact user name (they must share a room with the learner), and optionally post the first message.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            name: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(2).max(60).describe('Group name'),
            memberNames: zod__WEBPACK_IMPORTED_MODULE_3__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(2).max(80)).min(1).max(20).describe('Exact user names to add'),
            description: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(200).optional().describe('Optional group description'),
            firstMessage: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(2000).optional().describe('Optional first message to post')
        }),
        func: async ({ name, memberNames, description, firstMessage })=>{
            try {
                const myRoomIds = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoomMember.findMany({
                    where: {
                        userId: ctx.userId
                    },
                    select: {
                        roomId: true
                    }
                });
                const roomIds = myRoomIds.map((row)=>row.roomId);
                const resolved = [];
                const missing = [];
                for (const memberName of memberNames){
                    const found = roomIds.length ? await _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findFirst({
                        where: {
                            name: {
                                equals: memberName,
                                mode: 'insensitive'
                            },
                            chatRoomMembers: {
                                some: {
                                    roomId: {
                                        in: roomIds
                                    }
                                }
                            }
                        },
                        select: {
                            id: true,
                            name: true
                        }
                    }) : null;
                    if (found && found.id !== ctx.userId) resolved.push(found);
                    else missing.push(memberName);
                }
                if (resolved.length === 0) {
                    return JSON.stringify({
                        created: false,
                        error: 'None of the member names could be resolved (they must share a chat room with the learner).',
                        missing
                    });
                }
                const room = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.create({
                    data: {
                        type: 'group',
                        name: name.trim(),
                        description: description?.trim() ?? '',
                        createdBy: ctx.userId,
                        members: {
                            create: [
                                {
                                    userId: ctx.userId,
                                    role: 'admin'
                                },
                                ...resolved.map((member)=>({
                                        userId: member.id,
                                        role: 'member'
                                    }))
                            ]
                        }
                    }
                });
                let messageId;
                if (firstMessage?.trim()) {
                    const message = await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatMessage.create({
                        data: {
                            roomId: room.id,
                            senderId: ctx.userId,
                            content: firstMessage.trim(),
                            type: 'text',
                            metadata: JSON.stringify({
                                via: 'medq-agent'
                            })
                        },
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    });
                    await _db__WEBPACK_IMPORTED_MODULE_1__.db.chatRoom.update({
                        where: {
                            id: room.id
                        },
                        data: {
                            lastMessageAt: new Date()
                        }
                    });
                    await broadcastChat('new:message', room.id, message);
                    messageId = message.id;
                }
                return JSON.stringify({
                    created: true,
                    roomId: room.id,
                    name: room.name,
                    added: resolved.map((member)=>member.name),
                    missing,
                    messageId,
                    roomRefreshed: true
                });
            } catch (error) {
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    // ── send_push_notification (HITL-gated) ──────────────────────────────────
    const sendPushNotification = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'send_push_notification',
        description: 'Send a push notification to the learner\'s subscribed devices (phone/desktop, even when MedQ is closed) and add it to their in-app notification bell. Use for things they must not miss — extracted meetings, exam schedules, deadlines — typically right after summarize_unread_messages. Keep it short; one notification per event.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(80).describe('Notification title, e.g. "Team meeting tomorrow 10:00"'),
            body: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(300).describe('One-line body with the key detail'),
            roomId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().optional().describe('Room id to deep-link when tapped (from the digest)'),
            messageId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().optional().describe('Message id to deep-link to the exact message')
        }),
        func: async ({ title, body, roomId, messageId })=>{
            try {
                const created = await _db__WEBPACK_IMPORTED_MODULE_1__.db.notification.create({
                    data: {
                        userId: ctx.userId,
                        type: roomId ? 'chat_mention' : 'system',
                        title: title.trim(),
                        message: body.trim(),
                        referenceId: roomId && messageId ? `${roomId}:${messageId}` : roomId ?? ''
                    }
                });
                // sendPushToUser returns real delivery stats (sendPushForNotification
                // is void); the deep-link mirrors the "roomId:msgId" format the
                // in-app bell uses for chat notifications.
                const { sendPushToUser } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 343753));
                const push = await sendPushToUser(ctx.userId, {
                    title: title.trim(),
                    body: body.trim(),
                    url: roomId && messageId ? `/messages?room=${roomId}&msg=${messageId}` : roomId ? `/messages?room=${roomId}` : '/',
                    tag: 'medq-chat-event',
                    data: {
                        notificationId: created.id
                    }
                }).catch(()=>({
                        sent: 0,
                        failed: 0,
                        total: 0,
                        disabled: true
                    }));
                return JSON.stringify({
                    sent: true,
                    notificationId: created.id,
                    push,
                    note: push.disabled ? 'In-app notification created (web push not configured on this server).' : `In-app notification created; push attempted on ${push.total} device(s), ${push.sent} delivered.`
                });
            } catch (error) {
                return JSON.stringify({
                    sent: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    return [
        listChatRooms,
        readChatMessages,
        summarizeUnread,
        sendChatMessage,
        startDirectMessage,
        createChatGroup,
        sendPushNotification
    ];
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 544852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BA: () => (/* binding */ registerAttachment),
/* harmony export */   resolveAttachmentInput: () => (/* binding */ resolveAttachmentInput)
/* harmony export */ });
/* unused harmony exports ATTACHMENT_REF_PREFIX, MAX_DATAURL_LENGTH, isAttachmentReference, resolveAttachmentReference */
/**
 * agent/attachment-registry.ts — turn-scoped binary attachment registry.
 *
 * Problem it fixes: the floating assistant uploads images/audio as base64
 * data URLs alongside a chat turn, but the LLM must never be asked to echo
 * megabytes of base64 back through a tool-call argument (token explosion +
 * provider arg limits). Instead, the chat route registers the data URL here
 * and tells the agent a short, stable reference:
 *
 *     attachment://<id>
 *
 * Tools that consume images/audio (analyze_visual_material,
 * edit_medical_illustration, transcribe_audio, …) resolve that reference
 * back to the full data URL at execution time via `resolveAttachmentInput`.
 *
 * Lifecycle: entries live for TTL_MS (default 30 min — long enough for a
 * multi-step agent turn plus follow-ups, short enough that raw image bytes
 * don't linger in memory). Pruning is lazy: on every register and read,
 * expired entries are dropped. The registry is per-server-process (single
 * Next.js server — fine for this deployment).
 */ const registry = new Map();
const ATTACHMENT_REF_PREFIX = 'attachment://';
/** Default entry TTL: 30 minutes. */ const DEFAULT_TTL_MS = 30 * 60 * 1000;
/** Hard cap on a single data URL we are willing to keep (≈ 12 MB binary). */ const MAX_DATAURL_LENGTH = 16 * 1024 * 1024;
function prune() {
    const now = Date.now();
    for (const [key, entry] of registry){
        if (entry.expiresAt <= now) registry.delete(key);
    }
}
/**
 * Register a data URL (or plain URL) under an attachment id and return the
 * `attachment://<id>` reference the agent can safely echo into tool calls.
 * Returns null when the payload is missing/too large (caller should fall
 * back to describing the file by name only).
 */ function registerAttachment(id, dataUrl, name, ttlMs = DEFAULT_TTL_MS) {
    if (!id || typeof dataUrl !== 'string' || dataUrl.length === 0) return null;
    if (dataUrl.length > MAX_DATAURL_LENGTH) return null;
    prune();
    const safeId = id.replace(/[^a-zA-Z0-9._-]/g, '');
    if (!safeId) return null;
    const mimeType = /^data:([^;,]+)/.exec(dataUrl)?.[1] ?? '';
    registry.set(safeId, {
        dataUrl,
        name,
        mimeType,
        expiresAt: Date.now() + ttlMs
    });
    return `${ATTACHMENT_REF_PREFIX}${safeId}`;
}
/** Does this string look like an attachment reference? */ function isAttachmentReference(value) {
    return typeof value === 'string' && value.startsWith(ATTACHMENT_REF_PREFIX);
}
/**
 * Resolve an agent-supplied input value — which may be an `attachment://`
 * reference, a raw attachment id, a data URL, or a plain http(s) URL — to
 * the stored entry. Returns null when the reference is unknown or expired.
 */ function resolveAttachmentReference(value) {
    if (!value || typeof value !== 'string') return null;
    const id = value.startsWith(ATTACHMENT_REF_PREFIX) ? value.slice(ATTACHMENT_REF_PREFIX.length) : value;
    if (!id || id.includes('://')) return null; // http(s)://, data: — not ours
    prune();
    const entry = registry.get(id);
    if (!entry) return null;
    // Reading refreshes nothing — TTL is fixed from registration; a read of an
    // expired entry already got pruned above.
    return {
        ...entry,
        id
    };
}
/**
 * Shared tool-input normalizer: given whatever the LLM passed for an image /
 * audio / video input field, return the direct URL the tool should use.
 * Handles:
 *   - attachment://<id>  → registered data URL (throws a helpful error if
 *     the reference is unknown/expired so the agent can tell the user to
 *     re-attach the file)
 *   - attachment id without the scheme → same
 *   - data: / http(s):// → passed through untouched
 *   - bare file name like "photo.png" → treated as a stale reference and
 *     rejected with guidance (this is the old failure mode we're fixing)
 */ function resolveAttachmentInput(value, kind) {
    const v = value?.trim();
    if (!v) throw new Error(`No ${kind} provided.`);
    if (v.startsWith('data:') || /^https?:\/\//i.test(v)) return v;
    if (isAttachmentReference(v) || !v.includes(' ')) {
        const entry = resolveAttachmentReference(v);
        if (entry) return entry.dataUrl;
    }
    throw new Error(`"${v.slice(0, 80)}" is not a usable ${kind} reference. ` + 'Ask the user to re-attach the file, or use a direct https:// URL or an attachment:// reference from the current conversation.');
}


/***/ }),

/***/ 548875:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GP: () => (/* binding */ normalizeClarificationPayload),
/* harmony export */   o_: () => (/* binding */ askUserSchema)
/* harmony export */ });
/* unused harmony exports MULTI_VALUE_SEPARATOR, formatClarificationAnswers */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18963);
/**
 * Structured clarification — the shared contract behind the agent's
 * `ask_user` tool.
 *
 * When the agent needs more information from the learner before it can do
 * the job well (scope, preferences, choices between options, missing
 * parameters), it calls `ask_user` with a question plus STRUCTURED inputs
 * (checkboxes, radio choices, dropdowns, text fields). The runtime forwards
 * the payload to the SSE client as a `clarification_required` event, the
 * chat renders an interactive form card, and the learner's answers come
 * back as the NEXT USER MESSAGE (formatted by formatClarificationAnswers)
 * — so the conversation history, thread store, and every recovery path
 * keep working unchanged.
 *
 * This module is deliberately dependency-light (zod only, no langchain/db)
 * because BOTH sides import it:
 *   - server: the tool schema + bus payload type (tools/ask-user.ts)
 *   - client: defensive parsing of SSE payloads and persisted tool args,
 *     plus answer formatting for the submit path (useAgentV2Stream /
 *     MedQAgentV3 / MedQAgentTimeline).
 */ /** Input widget kinds the chat form card can render. */ 
/** The zod schema the `ask_user` tool validates its arguments against. */ const askUserSchema = zod__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ikc({
    title: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().max(120).optional().describe('Short card title, e.g. "Quick questions before I build your quiz". Omit for a default.'),
    question: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().min(3).max(1000).describe('The question you need answered, in plain learner-facing language. One focused question per call.'),
    inputs: zod__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ikc({
        id: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().regex(/^[A-Za-z0-9_-]{1,40}$/).describe('Stable field id, e.g. "topics" or "question_count"'),
        type: zod__WEBPACK_IMPORTED_MODULE_0__/* ["enum"] */ .k5n([
            'text',
            'textarea',
            'select',
            'multiselect',
            'radio',
            'checkbox',
            'number',
            'date'
        ]).describe('Widget kind: multiselect = checkboxes (pick several); radio/select = pick exactly one; checkbox = a single yes/no toggle; text/textarea = free text; number/date = typed values'),
        label: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().min(1).max(120).describe('Field label shown to the learner'),
        placeholder: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().max(120).optional().describe('Placeholder for text/textarea/number inputs'),
        helpText: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().max(200).optional().describe('One-line hint under the label'),
        required: zod__WEBPACK_IMPORTED_MODULE_0__/* .boolean */ .zMY().optional().describe('Whether the learner must fill this field (default false)'),
        defaultValue: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().max(200).optional().describe('Pre-selected value / checked state ("yes"/"no")'),
        options: zod__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ikc({
            value: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().min(1).max(120),
            label: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .YjP().min(1).max(120)
        })).min(1).max(8).optional().describe('The choices — REQUIRED for select/multiselect/radio inputs')
    })).min(1).max(8).describe('The form fields (1-8). Prefer 2-4 focused fields over a wall of questions.'),
    allowSkip: zod__WEBPACK_IMPORTED_MODULE_0__/* .boolean */ .zMY().optional().describe('Whether the learner may skip the form entirely (default true). Set false only when you truly cannot proceed without an answer.')
});
const INPUT_TYPES = [
    'text',
    'textarea',
    'select',
    'multiselect',
    'radio',
    'checkbox',
    'number',
    'date'
];
function str(value, max) {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, max) : undefined;
}
/**
 * Defensively normalize ANY unknown object (SSE payload, persisted tool
 * args, replayed event) into a ClarificationPayload — or null when it is
 * not a valid clarification. The client never trusts the wire shape.
 */ function normalizeClarificationPayload(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const record = raw;
    const question = str(record.question, 1000);
    if (!question) return null;
    const rawInputs = Array.isArray(record.inputs) ? record.inputs.slice(0, 8) : [];
    const inputs = [];
    for (const item of rawInputs){
        if (!item || typeof item !== 'object') continue;
        const input = item;
        const id = str(input.id, 40);
        const label = str(input.label, 120);
        if (!id || !label) continue;
        const type = INPUT_TYPES.includes(input.type) ? input.type : 'text';
        const options = Array.isArray(input.options) ? input.options.slice(0, 8).map((option)=>{
            if (!option || typeof option !== 'object') return null;
            const value = str(option.value, 120);
            const optionLabel = str(option.label, 120) ?? value;
            return value ? {
                value,
                label: optionLabel
            } : null;
        }).filter((option)=>option !== null) : undefined;
        if ((type === 'select' || type === 'multiselect' || type === 'radio') && (!options || options.length === 0)) {
            continue; // a choice input without choices is unusable — drop the field
        }
        inputs.push({
            id,
            type,
            label,
            placeholder: str(input.placeholder, 120),
            helpText: str(input.helpText, 200),
            required: input.required === true,
            defaultValue: str(input.defaultValue, 200),
            ...options && options.length > 0 ? {
                options
            } : {}
        });
    }
    if (inputs.length === 0) return null;
    return {
        clarificationId: str(record.clarificationId, 64) ?? `clar-${Date.now()}`,
        title: str(record.title, 120),
        question,
        inputs,
        allowSkip: record.allowSkip === false ? false : true
    };
}
/** Separator used inside one multiselect answer string. */ const MULTI_VALUE_SEPARATOR = ', ';
/**
 * Render the learner's form answers as the NEXT USER MESSAGE the agent will
 * read. Shaped for model consumption: an explicit header naming the
 * question, then one line per field, marking skipped optional fields so the
 * agent knows they were deliberately left blank (not lost).
 */ function formatClarificationAnswers(payload, answers, skipped) {
    const lines = [];
    for (const input of payload.inputs){
        const raw = answers[input.id];
        const value = typeof raw === 'string' ? raw.trim() : '';
        if (input.type === 'checkbox') {
            const yes = value === 'yes';
            lines.push(`- ${input.label}: ${yes ? 'Yes' : 'No'}`);
        } else if (value) {
            lines.push(`- ${input.label}: ${value}`);
        } else if (input.required) {
            lines.push(`- ${input.label}: (no answer given)`);
        } else {
            lines.push(`- ${input.label}: (skipped)`);
        }
    }
    if (skipped) {
        return `[I skipped your question form — "${payload.question.slice(0, 120)}"]\nProceed with your best judgment, or tell me what you'd minimally need to know.`;
    }
    return [
        `Here are my answers to your question — "${payload.question.slice(0, 160)}"`,
        ...lines
    ].join('\n');
}


/***/ }),

/***/ 576532:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AX: () => (/* binding */ requestCancel),
/* harmony export */   DW: () => (/* binding */ updateProgress),
/* harmony export */   Hc: () => (/* binding */ getJobWithEvents),
/* harmony export */   N6: () => (/* binding */ listJobs),
/* harmony export */   SG: () => (/* binding */ failJob),
/* harmony export */   Yf: () => (/* binding */ leaseJob),
/* harmony export */   Z2: () => (/* binding */ enqueue),
/* harmony export */   h0: () => (/* binding */ completeJob),
/* harmony export */   mE: () => (/* binding */ appendJobEvent),
/* harmony export */   mh: () => (/* binding */ cancelJob)
/* harmony export */ });
/* unused harmony exports listJobEvents, jobDisplayStatus, log */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentQueue');
async function enqueue(params) {
    return _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.create({
        data: {
            userId: params.userId,
            kind: params.kind,
            payloadJson: JSON.stringify(params.payload),
            priority: params.priority ?? 50,
            maxAttempts: params.maxAttempts ?? 3,
            scheduledTaskId: params.scheduledTaskId ?? undefined,
            availableAt: new Date(Date.now() + (params.delayMs ?? 0))
        }
    });
}
const LEASE_MS = 5 * 60000;
/** Claim the next runnable job (priority → availability → FIFO). */ async function leaseJob(workerId) {
    return _db__WEBPACK_IMPORTED_MODULE_0__.db.$transaction(async (tx)=>{
        // Reap expired leases first.
        await tx.agentJob.updateMany({
            where: {
                status: 'leased',
                leaseUntil: {
                    lt: new Date()
                }
            },
            data: {
                status: 'pending',
                leasedBy: null,
                leaseUntil: null
            }
        });
        const job = await tx.agentJob.findFirst({
            where: {
                status: 'pending',
                availableAt: {
                    lte: new Date()
                },
                cancelRequested: false
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
        if (!job) return null;
        return tx.agentJob.update({
            where: {
                id: job.id
            },
            data: {
                status: 'leased',
                leasedBy: workerId,
                leaseUntil: new Date(Date.now() + LEASE_MS),
                attempts: {
                    increment: 1
                },
                startedAt: job.startedAt ?? new Date()
            }
        });
    });
}
async function completeJob(jobId) {
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.update({
        where: {
            id: jobId
        },
        data: {
            status: 'done',
            finishedAt: new Date(),
            progress: 100
        }
    });
}
async function failJob(jobId, error) {
    const job = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job) return;
    const exhausted = job.attempts >= job.maxAttempts;
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.update({
        where: {
            id: jobId
        },
        data: {
            status: exhausted ? 'failed' : 'pending',
            lastError: error.slice(0, 1000),
            finishedAt: exhausted ? new Date() : null,
            // Exponential backoff between attempts.
            availableAt: exhausted ? undefined : new Date(Date.now() + Math.min(2 ** job.attempts * 5000, 120000))
        }
    });
}
/** Mark a job cancelled (deep-agent cancel parity — never retried). */ async function cancelJob(jobId) {
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.update({
        where: {
            id: jobId
        },
        data: {
            status: 'cancelled',
            cancelRequested: true,
            finishedAt: new Date()
        }
    }).catch(()=>undefined);
}
async function updateProgress(jobId, progress) {
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.update({
        where: {
            id: jobId
        },
        data: {
            progress: Math.max(0, Math.min(100, Math.round(progress)))
        }
    }).catch(()=>undefined);
}
async function requestCancel(jobId, userId) {
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.updateMany({
        where: {
            id: jobId,
            userId
        },
        data: {
            cancelRequested: true
        }
    });
}
async function listJobs(userId, limit = 30) {
    return _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}
/** Append one event to a job's stream (auto seq). */ async function appendJobEvent(jobId, payload) {
    const last = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJobEvent.findFirst({
        where: {
            jobId
        },
        orderBy: {
            seq: 'desc'
        },
        select: {
            seq: true
        }
    });
    const seq = (last?.seq ?? -1) + 1;
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJobEvent.create({
        data: {
            jobId,
            seq,
            type: payload.type,
            payloadJson: JSON.stringify(payload)
        }
    });
}
/** Read a job's events after a cursor (the polling contract the UI already uses). */ async function listJobEvents(jobId, sinceSeq = -1) {
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJobEvent.findMany({
        where: {
            jobId,
            seq: {
                gt: sinceSeq
            }
        },
        orderBy: {
            seq: 'asc'
        }
    });
    return rows.map((row)=>({
            seq: row.seq,
            ...JSON.parse(row.payloadJson)
        }));
}
/** Job + events snapshot for the polling endpoint (old getAgentJob shape). */ async function getJobWithEvents(jobId, userId) {
    const job = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job) return null;
    if (userId && job.userId !== userId) return null;
    const events = await listJobEvents(jobId);
    return {
        id: job.id,
        status: job.status,
        message: JSON.parse(job.payloadJson).message ?? '',
        events,
        finalText: events.filter((e)=>e.type === 'text').map((e)=>e.text ?? '').join('') || null,
        error: job.lastError,
        progress: job.progress,
        attempts: job.attempts,
        kind: job.kind,
        createdAt: job.createdAt.getTime(),
        updatedAt: job.updatedAt.getTime()
    };
}
/** Map DB status → the old in-memory status vocabulary the UI expects. */ function jobDisplayStatus(status) {
    switch(status){
        case 'done':
            return 'completed';
        case 'leased':
            return 'processing';
        case 'failed':
            return 'failed';
        case 'cancelled':
            return 'failed';
        default:
            return 'pending';
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 580455:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hh: () => (/* binding */ createSearchKnowledgeTool)
/* harmony export */ });
/* unused harmony exports KNOWLEDGE_TOOL_NAMES, createAddKnowledgeTool */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18963);
/* harmony import */ var _knowledge_pipeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375556);
/* harmony import */ var _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(492504);
/* harmony import */ var _workspace_files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(442398);
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(791532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_1__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_2__, _audit__WEBPACK_IMPORTED_MODULE_4__]);
([_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_1__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_2__, _audit__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






/** Tool names exported for the registry (tools/index.ts). */ const KNOWLEDGE_TOOL_NAMES = (/* unused pure expression or super */ null && ([
    'search_knowledge',
    'add_knowledge'
]));
/**
 * Knowledge-base tools.
 *
 *   search_knowledge — HYBRID retrieval over the user's ingested corpus
 *                      (dense + BM25 + RRF fusion + LLM rerank) with
 *                      [K#]-cited context
 *   add_knowledge    — ingest new material (pasted text, a URL, or a file
 *                      already in the workspace) so future runs can cite it
 */ function createSearchKnowledgeTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_knowledge',
        description: 'Hybrid (semantic + keyword + AI-reranked) search over the learner\'s personal knowledge base (their uploaded PDFs, lecture recordings, saved pages, pasted notes). Returns [K#]-cited excerpts — cite them as [K1], [K2] in the answer. Use BEFORE web search when the learner references "my notes/materials/lectures" or when course-specific content likely exists.',
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().min(2).max(2000).describe('What to look for in the knowledge base'),
            top_k: zod__WEBPACK_IMPORTED_MODULE_5__/* .number */ .aig().int().min(1).max(20).optional().describe('Max chunks to return (default 8)')
        }),
        func: async ({ query, top_k })=>{
            try {
                const { chunks, diagnostics } = await (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_2__/* .retrieveKnowledgeHybrid */ .L$)(ctx.userId, query, {
                    topK: top_k ?? 8
                });
                if (chunks.length === 0) {
                    return JSON.stringify({
                        ok: true,
                        note: 'The knowledge base is empty or nothing matched. Suggest adding material with add_knowledge or the Knowledge settings tab, or fall back to web search.'
                    });
                }
                const context = (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_2__/* .formatHybridContext */ .zG)(chunks);
                return JSON.stringify({
                    ok: true,
                    context,
                    citations: chunks.map((chunk, i)=>({
                            ref: `K${i + 1}`,
                            title: chunk.documentTitle,
                            sourceId: chunk.sourceId,
                            relevance: Math.round(Math.min(Math.max(chunk.score / (chunk.rerankScore !== undefined ? 10 : 1), 0), 1) * 100)
                        })),
                    note: 'Cite these excerpts using bracketed [K1], [K2] markers (one bracket per source, placed right after the claim it supports). ' + 'Do NOT write bare K-numbers or raw passage text into the answer.',
                    retrieval: {
                        candidates: diagnostics.candidateCount,
                        rerankUsed: diagnostics.rerankUsed,
                        latencyMs: diagnostics.latencyMs
                    }
                });
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}
function createAddKnowledgeTool(ctx) {
    return new DynamicStructuredTool({
        name: 'add_knowledge',
        description: 'Save material to the learner\'s knowledge base so it becomes searchable (and citable as [K#]) in future conversations. Accepts pasted text, a URL (fetched and parsed), or a workspace file path (PDF/MD/TXT/CSV/JSON). Use when the learner says "remember this document / add this to my materials".',
        schema: z.object({
            type: z.enum([
                'text',
                'url',
                'file'
            ]).describe('Kind of material to ingest'),
            title: z.string().min(1).max(200).optional().describe('Short name (required for text, optional otherwise)'),
            content: z.string().max(200000).optional().describe('The text content (for type=text)'),
            url: z.string().url().optional().describe('The URL to fetch and ingest (for type=url)'),
            path: z.string().max(500).optional().describe('Workspace-relative file path (for type=file)')
        }),
        func: async ({ type, title, content, url, path })=>{
            try {
                let result;
                if (type === 'text') {
                    if (!content?.trim()) return JSON.stringify({
                        ok: false,
                        error: 'type=text requires content'
                    });
                    result = await createAndIngestSource({
                        userId: ctx.userId,
                        name: title?.trim() || 'Pasted text',
                        type: 'text',
                        payload: {
                            content,
                            title
                        }
                    });
                } else if (type === 'url') {
                    if (!url) return JSON.stringify({
                        ok: false,
                        error: 'type=url requires url'
                    });
                    result = await createAndIngestSource({
                        userId: ctx.userId,
                        name: url,
                        type: 'url',
                        payload: {
                            url
                        }
                    });
                } else {
                    if (!path) return JSON.stringify({
                        ok: false,
                        error: 'type=file requires path'
                    });
                    if (!workspaceExists(ctx.userId, path)) {
                        return JSON.stringify({
                            ok: false,
                            error: `Workspace file not found: ${path}`
                        });
                    }
                    const fileContent = readWorkspaceFile(ctx.userId, path, 15 * 1024 * 1024);
                    const buffer = Buffer.from(fileContent, 'utf8');
                    const fileName = path.split('/').pop() ?? 'file';
                    if (fileName.toLowerCase().endsWith('.pdf')) {
                        return JSON.stringify({
                            ok: false,
                            error: 'PDF ingestion from the workspace is not supported by this tool yet — upload PDFs via the Knowledge settings tab.'
                        });
                    }
                    result = await createAndIngestSource({
                        userId: ctx.userId,
                        name: fileName,
                        type: 'file',
                        payload: {
                            buffer,
                            fileName
                        }
                    });
                }
                await audit({
                    userId: ctx.userId,
                    action: 'tool.execute',
                    target: 'add_knowledge',
                    detail: {
                        type,
                        chunks: result.result.chunks,
                        title: result.result.title
                    }
                });
                return JSON.stringify({
                    ok: true,
                    sourceId: result.sourceId,
                    title: result.result.title,
                    chunks: result.result.chunks,
                    note: 'Added to the knowledge base — future answers can cite it as [K#].'
                });
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 590344:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ buildMemoryContext)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(681948);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_service__WEBPACK_IMPORTED_MODULE_0__]);
_service__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * Rendered long-term memory block for the system prompt.
 *
 * Recalls the most relevant memories for the *upcoming user message* and
 * formats them as a compact markdown section (pattern from the reference
 * platforms — never throws; a memory failure must never break a chat turn).
 */ async function buildMemoryContext(userId, upcomingMessage) {
    try {
        const results = await (0,_service__WEBPACK_IMPORTED_MODULE_0__/* .searchMemories */ .Cp)(userId, upcomingMessage ?? '', 6);
        if (results.length === 0) return null;
        const lines = results.map((entry)=>`- [${entry.scope}] ${entry.content}${entry.key ? ` (${entry.key})` : ''}`);
        return [
            '# Long-term memory (recalled for this conversation)',
            ...lines
        ].join('\n');
    } catch  {
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 655042:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cp: () => (/* binding */ searchMemories),
/* harmony export */   hz: () => (/* binding */ forgetMemory),
/* harmony export */   jk: () => (/* binding */ updateMemory),
/* harmony export */   kM: () => (/* binding */ listMemories),
/* harmony export */   zm: () => (/* binding */ saveMemory)
/* harmony export */ });
/* unused harmony export extractAndStoreMemories */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42784);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentMemory');
const MAX_CONTENT_CHARS = 400;
async function embedText(content) {
    try {
        const embeddings = await (0,_agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
        const [vector] = await embeddings.embed([
            content
        ]);
        return (0,_agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .serializeVector */ ._H)(vector);
    } catch  {
        return null; // embedding-free operation stays fully functional
    }
}
async function saveMemory(input) {
    const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
    if (!content) throw new Error('Memory content is empty');
    const key = input.key?.trim().slice(0, 120) || null;
    const importance = Math.min(Math.max(input.importance ?? 0.5, 0), 1);
    const embedding = await embedText(content);
    // Upsert by (userId, scope, key) when a key is given; otherwise insert.
    if (key) {
        const existing = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findFirst({
            where: {
                userId: input.userId,
                scope: input.scope,
                key
            },
            select: {
                id: true
            }
        });
        if (existing) {
            const updated = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.update({
                where: {
                    id: existing.id
                },
                data: {
                    content,
                    importance,
                    ...embedding ? {
                        embedding
                    } : {},
                    updatedAt: new Date()
                }
            });
            return toEntry(updated);
        }
    }
    const created = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.create({
        data: {
            userId: input.userId,
            scope: input.scope,
            key,
            content,
            importance,
            ...embedding ? {
                embedding
            } : {},
            ...input.threadId ? {
                threadId: input.threadId
            } : {}
        }
    });
    log.info?.(`Saved memory [${input.scope}]${key ? ` "${key}"` : ''} for ${input.userId}`);
    return toEntry(created);
}
async function forgetMemory(userId, memoryId) {
    const deleted = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.deleteMany({
        where: {
            id: memoryId,
            userId
        }
    });
    return deleted.count > 0;
}
/** Update a memory's content by id (hermes memory_update parity). */ async function updateMemory(userId, memoryId, input) {
    const data = {
        updatedAt: new Date()
    };
    if (typeof input.content === 'string') {
        const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
        if (!content) throw new Error('Memory content is empty');
        data.content = content;
        const embedding = await embedText(content);
        if (embedding) data.embedding = embedding;
    }
    if (typeof input.importance === 'number') {
        data.importance = Math.min(Math.max(input.importance, 0), 1);
    }
    const updated = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.updateMany({
        where: {
            id: memoryId,
            userId
        },
        data
    });
    if (updated.count === 0) return null;
    const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findUnique({
        where: {
            id: memoryId
        }
    });
    return row ? toEntry(row) : null;
}
async function listMemories(userId, limit = 100) {
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: limit
    });
    return rows.map(toEntry);
}
/**
 * Hybrid relevance search (deep-agent parity): lexical token overlap ×2 +
 * importance + recency decay, PLUS vector cosine when the row carries an
 * embedding. The vector component rescues semantically-related memories
 * that share no exact tokens with the query.
 */ async function searchMemories(userId, query, limit = 6) {
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 500
    });
    if (rows.length === 0) return [];
    const queryTokens = tokenize(query);
    let queryVector = null;
    const anyEmbedded = rows.some((row)=>row.embedding);
    if (anyEmbedded && queryTokens.length > 0) {
        try {
            const embeddings = await (0,_agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
            [queryVector] = await embeddings.embed([
                query
            ]);
        } catch  {
            queryVector = null;
        }
    }
    const scored = rows.map((row)=>{
        const contentTokens = new Set(tokenize(row.content));
        let overlap = 0;
        for (const token of queryTokens)if (contentTokens.has(token)) overlap += 1;
        const lexical = queryTokens.length > 0 ? overlap / queryTokens.length : 0;
        let vectorScore = 0;
        if (queryVector && row.embedding) {
            const rowVector = (0,_agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .deserializeVector */ .H6)(new Uint8Array(row.embedding));
            if (rowVector) vectorScore = Math.max((0,_agent_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .cosineSimilarity */ .Lb)(queryVector, rowVector), 0);
        }
        const ageDays = (Date.now() - row.updatedAt.getTime()) / 86400000;
        const recency = Math.exp(-ageDays / 30);
        // Lexial dominates; vector similarity contributes up to ~1.2 of the
        // ~3.0 max score so semantic-only matches still clear the 0.6 filter.
        const score = lexical * 2 + vectorScore * 1.2 + row.importance * 0.5 + recency * 0.5;
        return {
            ...toEntry(row),
            score
        };
    }).filter((entry)=>entry.score > 0.6).sort((a, b)=>b.score - a.score).slice(0, limit);
    return scored;
}
/**
 * Heuristic post-run memory extraction (deep-agent extractAndStore parity,
 * zero extra LLM calls): store what the user asked for and how the run
 * resolved, in the auto-extraction `semantic` layer. The next run's hybrid
 * recall can then surface it even when wording differs.
 */ async function extractAndStoreMemories(input) {
    let stored = 0;
    const message = input.userMessage.trim();
    if (message.length >= 40 && message.length <= 2000) {
        try {
            await saveMemory({
                userId: input.userId,
                scope: 'semantic',
                content: `User asked/needed: ${message.slice(0, MAX_CONTENT_CHARS - 20)}`,
                importance: 0.4,
                source: 'conversation-extraction',
                ...input.threadId ? {
                    threadId: input.threadId
                } : {}
            });
            stored += 1;
        } catch  {}
    }
    const summary = input.assistantSummary.trim();
    if (summary.length > 60) {
        try {
            await saveMemory({
                userId: input.userId,
                scope: 'semantic',
                content: `Outcome: ${summary.slice(0, MAX_CONTENT_CHARS - 10)}`,
                importance: 0.35,
                source: 'conversation-extraction',
                ...input.threadId ? {
                    threadId: input.threadId
                } : {}
            });
            stored += 1;
        } catch  {}
    }
    return stored;
}
function tokenize(text) {
    return text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter((token)=>token.length > 2)// simple English stemming for common medical suffixes
    .map((token)=>token.endsWith('ies') ? `${token.slice(0, -3)}y` : token).map((token)=>token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token);
}
function toEntry(row) {
    return {
        id: row.id,
        scope: row.scope,
        key: row.key,
        content: row.content,
        importance: row.importance,
        updatedAt: row.updatedAt.toISOString()
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 681948:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cp: () => (/* binding */ searchMemories),
/* harmony export */   Xe: () => (/* binding */ extractAndStoreMemories)
/* harmony export */ });
/* unused harmony exports saveMemory, forgetMemory, updateMemory, listMemories */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42784);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentMemory');
const MAX_CONTENT_CHARS = 400;
async function embedText(content) {
    try {
        const embeddings = await (0,_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
        const [vector] = await embeddings.embed([
            content
        ]);
        return (0,_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .serializeVector */ ._H)(vector);
    } catch  {
        return null; // embedding-free operation stays fully functional
    }
}
async function saveMemory(input) {
    const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
    if (!content) throw new Error('Memory content is empty');
    const key = input.key?.trim().slice(0, 120) || null;
    const importance = Math.min(Math.max(input.importance ?? 0.5, 0), 1);
    const embedding = await embedText(content);
    // Upsert by (userId, scope, key) when a key is given; otherwise insert.
    if (key) {
        const existing = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findFirst({
            where: {
                userId: input.userId,
                scope: input.scope,
                key
            },
            select: {
                id: true
            }
        });
        if (existing) {
            const updated = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.update({
                where: {
                    id: existing.id
                },
                data: {
                    content,
                    importance,
                    ...embedding ? {
                        embedding
                    } : {},
                    updatedAt: new Date()
                }
            });
            return toEntry(updated);
        }
    }
    const created = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.create({
        data: {
            userId: input.userId,
            scope: input.scope,
            key,
            content,
            importance,
            ...embedding ? {
                embedding
            } : {},
            ...input.threadId ? {
                threadId: input.threadId
            } : {}
        }
    });
    log.info?.(`Saved memory [${input.scope}]${key ? ` "${key}"` : ''} for ${input.userId}`);
    return toEntry(created);
}
async function forgetMemory(userId, memoryId) {
    const deleted = await db.agentMemory.deleteMany({
        where: {
            id: memoryId,
            userId
        }
    });
    return deleted.count > 0;
}
/** Update a memory's content by id (hermes memory_update parity). */ async function updateMemory(userId, memoryId, input) {
    const data = {
        updatedAt: new Date()
    };
    if (typeof input.content === 'string') {
        const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
        if (!content) throw new Error('Memory content is empty');
        data.content = content;
        const embedding = await embedText(content);
        if (embedding) data.embedding = embedding;
    }
    if (typeof input.importance === 'number') {
        data.importance = Math.min(Math.max(input.importance, 0), 1);
    }
    const updated = await db.agentMemory.updateMany({
        where: {
            id: memoryId,
            userId
        },
        data
    });
    if (updated.count === 0) return null;
    const row = await db.agentMemory.findUnique({
        where: {
            id: memoryId
        }
    });
    return row ? toEntry(row) : null;
}
async function listMemories(userId, limit = 100) {
    const rows = await db.agentMemory.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: limit
    });
    return rows.map(toEntry);
}
/**
 * Hybrid relevance search (deep-agent parity): lexical token overlap ×2 +
 * importance + recency decay, PLUS vector cosine when the row carries an
 * embedding. The vector component rescues semantically-related memories
 * that share no exact tokens with the query.
 */ async function searchMemories(userId, query, limit = 6) {
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentMemory.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 500
    });
    if (rows.length === 0) return [];
    const queryTokens = tokenize(query);
    let queryVector = null;
    const anyEmbedded = rows.some((row)=>row.embedding);
    if (anyEmbedded && queryTokens.length > 0) {
        try {
            const embeddings = await (0,_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
            [queryVector] = await embeddings.embed([
                query
            ]);
        } catch  {
            queryVector = null;
        }
    }
    const scored = rows.map((row)=>{
        const contentTokens = new Set(tokenize(row.content));
        let overlap = 0;
        for (const token of queryTokens)if (contentTokens.has(token)) overlap += 1;
        const lexical = queryTokens.length > 0 ? overlap / queryTokens.length : 0;
        let vectorScore = 0;
        if (queryVector && row.embedding) {
            const rowVector = (0,_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .deserializeVector */ .H6)(new Uint8Array(row.embedding));
            if (rowVector) vectorScore = Math.max((0,_knowledge_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .cosineSimilarity */ .Lb)(queryVector, rowVector), 0);
        }
        const ageDays = (Date.now() - row.updatedAt.getTime()) / 86400000;
        const recency = Math.exp(-ageDays / 30);
        // Lexial dominates; vector similarity contributes up to ~1.2 of the
        // ~3.0 max score so semantic-only matches still clear the 0.6 filter.
        const score = lexical * 2 + vectorScore * 1.2 + row.importance * 0.5 + recency * 0.5;
        return {
            ...toEntry(row),
            score
        };
    }).filter((entry)=>entry.score > 0.6).sort((a, b)=>b.score - a.score).slice(0, limit);
    return scored;
}
/**
 * Heuristic post-run memory extraction (deep-agent extractAndStore parity,
 * zero extra LLM calls): store what the user asked for and how the run
 * resolved, in the auto-extraction `semantic` layer. The next run's hybrid
 * recall can then surface it even when wording differs.
 */ async function extractAndStoreMemories(input) {
    let stored = 0;
    const message = input.userMessage.trim();
    if (message.length >= 40 && message.length <= 2000) {
        try {
            await saveMemory({
                userId: input.userId,
                scope: 'semantic',
                content: `User asked/needed: ${message.slice(0, MAX_CONTENT_CHARS - 20)}`,
                importance: 0.4,
                source: 'conversation-extraction',
                ...input.threadId ? {
                    threadId: input.threadId
                } : {}
            });
            stored += 1;
        } catch  {}
    }
    const summary = input.assistantSummary.trim();
    if (summary.length > 60) {
        try {
            await saveMemory({
                userId: input.userId,
                scope: 'semantic',
                content: `Outcome: ${summary.slice(0, MAX_CONTENT_CHARS - 10)}`,
                importance: 0.35,
                source: 'conversation-extraction',
                ...input.threadId ? {
                    threadId: input.threadId
                } : {}
            });
            stored += 1;
        } catch  {}
    }
    return stored;
}
function tokenize(text) {
    return text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter((token)=>token.length > 2)// simple English stemming for common medical suffixes
    .map((token)=>token.endsWith('ies') ? `${token.slice(0, -3)}y` : token).map((token)=>token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token);
}
function toEntry(row) {
    return {
        id: row.id,
        scope: row.scope,
        key: row.key,
        content: row.content,
        importance: row.importance,
        updatedAt: row.updatedAt.toISOString()
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 727532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ou: () => (/* binding */ subscribeUiActions),
/* harmony export */   Py: () => (/* binding */ createUiActionTool)
/* harmony export */ });
/* unused harmony export UI_ACTION_TYPES */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18963);
/**
 * ui_action — the agent's APP CONTROL tool.
 *
 * Lets the chat agent actually OPERATE the learner's MedQ UI: open tabs,
 * switch modules, open dialogs, fill form fields, click buttons, highlight
 * elements, trigger downloads — instead of only telling the learner what to
 * click. Mirrors the ask_user pattern:
 *
 *   1. the model calls ui_action with { actions: [...] } (each entry is one
 *      UIAction payload understood by the client's UIActionEngine);
 *   2. the tool validates the action types, publishes the payload on an
 *      in-process bus and returns immediately — it does NOT block;
 *   3. streamMedQDeepAgent subscribes to the bus and forwards the payload
 *      to the SSE client as the existing `actions` event;
 *   4. the chat panel executes each action LIVE on arrival (and deduplicates
 *      the turn-end replay) through useUIActionEngine, then shows receipts
 *      ("Opened Question Bank") under the assistant message.
 *
 * Fire-and-forget by design: execution feedback reaches the learner as
 * on-screen receipts, and the model summarizes what it did in its reply —
 * the same honesty contract as the rest of the agent.
 */ 

/** Action types the client UIActionEngine actually implements. Anything
 * outside this list is rejected server-side so the model cannot fire
 * dead payloads. */ const UI_ACTION_TYPES = new Set([
    // Navigation
    'navigate',
    'go_back',
    'navigate_module',
    // UI control
    'open_dialog',
    'close_dialog',
    'switch_tab',
    'toggle_panel',
    'toggle_section',
    'set_focus',
    'scroll_to',
    'select_element',
    // Forms
    'autofill_form',
    'validate_form',
    'submit_form',
    'clear_form',
    'explain_field',
    'suggest_field',
    // CRUD
    'create_record',
    'edit_record',
    'view_record',
    'delete_record',
    'archive_record',
    'duplicate_record',
    'restore_record',
    // Visual guidance
    'highlight_element',
    'clear_highlight',
    'show_tooltip',
    'start_tour',
    'next_tour_step',
    'end_tour',
    'explain_context',
    // Interaction
    'click_button',
    'trigger_action',
    'dispatch_event',
    // Legacy bridges
    'navigate_to_tab',
    'search_content',
    'generate_questions',
    'start_quiz',
    'look_up_drug',
    'create_flashcard',
    'set_study_timer',
    'bookmark_content',
    'explain_concept',
    'get_study_plan',
    'review_weak_areas',
    'answer_medical_question',
    // v4/v5
    'analyze_file',
    'organize_file',
    'download',
    'open_url'
]);
const globalForUiActions = globalThis;
const listeners = globalForUiActions.__medqUiActionListeners ?? new Set();
globalForUiActions.__medqUiActionListeners = listeners;
/** Subscribe to new ui_action dispatches (the runtime forwards them to SSE). */ function subscribeUiActions(listener) {
    listeners.add(listener);
    return ()=>listeners.delete(listener);
}
const uiActionSchema = zod__WEBPACK_IMPORTED_MODULE_1__/* .object */ .Ikc({
    actions: zod__WEBPACK_IMPORTED_MODULE_1__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_1__/* .record */ .g1P(zod__WEBPACK_IMPORTED_MODULE_1__/* .unknown */ .L5J())).min(1).max(6).describe('1-6 UI actions to execute on the learner\'s screen, each an object with a `type` field plus its parameters.')
});
function createUiActionTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'ui_action',
        description: 'Operate the MedQ app UI for the learner — open tabs/pages, switch modules, open dialogs and panels, fill form fields, click buttons, highlight or scroll to elements, trigger downloads. Use it whenever the learner asks you to SHOW/OPEN/GO TO something ("open the question bank", "show my flashcards", "take me to the exam simulator") or when doing so obviously helps (you saved questions → open the bank filtered to them). ' + 'Each action: {"type":"navigate","target":"bank"} — navigation targets are MedQ tab keys like home/bank/generate/flashcards/exams/messages/insights. Other examples: {"type":"switch_tab","tabId":"create"}, {"type":"autofill_form","formId":"...","values":{...}}, {"type":"click_button","selector":"..."}, {"type":"highlight_element","selector":"...","message":"this is the import button"}. ' + 'Prefer ONE navigate action over many small steps. Do not use it to read data (you have tools for that) — this only drives the screen.',
        schema: uiActionSchema,
        func: async (args)=>{
            const valid = [];
            const rejected = [];
            for (const raw of args.actions){
                const type = typeof raw.type === 'string' ? raw.type : '';
                if (!type || !UI_ACTION_TYPES.has(type)) {
                    rejected.push(type || '(missing type)');
                    continue;
                }
                // Normalize common near-misses so small model slips still land:
                // switch_tab/tabId is valid client-side; navigate uses target.
                valid.push(raw);
            }
            if (valid.length === 0) {
                return JSON.stringify({
                    dispatched: false,
                    error: `No valid actions. Allowed types include: ${[
                        ...UI_ACTION_TYPES
                    ].slice(0, 12).join(', ')}… Rejected: ${rejected.join(', ')}.`
                });
            }
            const payload = {
                userId: ctx.userId,
                ...ctx.threadId ? {
                    threadId: ctx.threadId
                } : {},
                actions: valid
            };
            for (const listener of listeners){
                try {
                    listener(payload);
                } catch  {
                // one broken subscriber must not break the tool
                }
            }
            return JSON.stringify({
                dispatched: true,
                count: valid.length,
                types: valid.map((a)=>a.type),
                ...rejected.length ? {
                    rejected
                } : {},
                guidance: 'The action(s) were dispatched to the learner\'s screen and will execute live. ' + 'In your final reply, say in one short sentence what you did (e.g. "Opened the Question Bank for you") — do not claim anything beyond the dispatched actions.'
            });
        }
    });
}


/***/ }),

/***/ 762053:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hh: () => (/* binding */ searchVideoScenes),
/* harmony export */   Tr: () => (/* binding */ listVideoScenes),
/* harmony export */   persistVideoScenes: () => (/* binding */ persistVideoScenes),
/* harmony export */   u5: () => (/* binding */ formatVideoSceneContext)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42784);
/* harmony import */ var _scene_detect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(515390);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * knowledge/video-scenes.ts — VideoScene persistence + retrieval (Stage 3).
 *
 * The temporal index of ingested videos: one row per scene (ffmpeg
 * scene-cut boundary or even-window fallback), each carrying
 *   - the VLM description of its representative frame,
 *   - the ASR transcript segments that fall inside its span,
 *   - an embedding of (description + transcript) for semantic search.
 *
 * Retrieval (searchVideoScenes) is deliberately application-layer cosine
 * over owner-scoped rows — the Stage 5 spike decision (pgvector is not
 * installable on the embedded PG; brute force is ≤35 ms even at 100k
 * vectors, and scene counts per user are far below that).
 *
 * Questions cite scenes via (videoSourceId, videoSceneStart,
 * videoSceneEnd) on the Question model — the mediaTimeSec data model.
 */ 



const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('VideoScenes');
// ─── Persistence ───────────────────────────────────────────────────────────
/**
 * Embed + persist scenes for a source. Idempotent: existing rows for the
 * source are deleted first (re-ingest / retry replaces the timeline).
 * Never throws to the caller — a scene-index failure must not fail the
 * ingestion itself (the flattened transcript document is still indexed).
 */ async function persistVideoScenes(sourceId, scenes) {
    const usable = (scenes ?? []).filter((s)=>Number.isFinite(s.startSec) && Number.isFinite(s.endSec) && s.endSec > s.startSec);
    if (usable.length === 0) return 0;
    try {
        const embeddings = await (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
        const inputs = usable.map((s)=>`${s.description ? s.description + '\n' : ''}${s.transcript}`.trim() || 'video scene');
        const vectors = await embeddings.embed(inputs);
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.videoScene.deleteMany({
            where: {
                sourceId
            }
        });
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.videoScene.createMany({
            data: usable.map((s, i)=>({
                    sourceId,
                    sceneIdx: s.sceneIdx,
                    startSec: s.startSec,
                    endSec: s.endSec,
                    detection: s.detection,
                    description: (s.description || '').slice(0, 4000),
                    transcript: (s.transcript || '').slice(0, 12000),
                    embedding: (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .serializeVector */ ._H)(vectors[i]),
                    embeddingModel: embeddings.id
                }))
        });
        log.info?.(`persisted ${usable.length} scenes for source ${sourceId} (${embeddings.id})`);
        return usable.length;
    } catch (error) {
        log.warn?.(`scene persistence failed for ${sourceId}: ${error instanceof Error ? error.message : error}`);
        return 0;
    }
}
// ─── Retrieval ─────────────────────────────────────────────────────────────
/** All scenes of one source (owner-gated), timeline order — powers the
 *  analyze_library_video sceneTimeline without any VLM re-run. */ async function listVideoScenes(userId, sourceId) {
    const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.videoScene.findMany({
        where: {
            sourceId,
            source: {
                userId,
                status: 'ready'
            }
        },
        orderBy: {
            sceneIdx: 'asc'
        },
        take: 120
    });
    const names = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.findMany({
        where: {
            id: sourceId,
            userId
        },
        select: {
            id: true,
            name: true
        }
    });
    const sourceName = names[0]?.name ?? 'video';
    return rows.map((r)=>({
            sceneId: r.id,
            sourceId: r.sourceId,
            sourceName,
            sceneIdx: r.sceneIdx,
            startSec: r.startSec,
            endSec: r.endSec,
            detection: r.detection === 'even-window' ? 'even-window' : 'scene-cut',
            description: r.description,
            transcript: r.transcript,
            score: 1
        }));
}
/**
 * Semantic scene search over the user's video library (optionally scoped
 * to specific sources). Embeds the query, cosine-scans owner-scoped scene
 * rows, returns the top-K with timestamps.
 */ async function searchVideoScenes(userId, query, opts = {}) {
    const topK = Math.min(Math.max(opts.topK ?? 6, 1), 20);
    const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.videoScene.findMany({
        where: {
            ...opts.sourceIds?.length ? {
                sourceId: {
                    in: opts.sourceIds
                }
            } : {},
            source: {
                userId,
                status: 'ready'
            }
        },
        include: {
            source: {
                select: {
                    name: true
                }
            }
        },
        take: 2000,
        orderBy: {
            createdAt: 'desc'
        }
    });
    if (rows.length === 0) return [];
    const embeddings = await (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .getEmbeddings */ .Bk)();
    const [queryVector] = await embeddings.embed([
        query
    ], {
        query: true
    });
    return rows.map((row)=>{
        const vector = row.embedding ? (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .deserializeVector */ .H6)(new Uint8Array(row.embedding)) : null;
        const score = vector ? (0,_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .cosineSimilarity */ .Lb)(queryVector, vector) : -1;
        return {
            sceneId: row.id,
            sourceId: row.sourceId,
            sourceName: row.source.name,
            sceneIdx: row.sceneIdx,
            startSec: row.startSec,
            endSec: row.endSec,
            detection: row.detection === 'even-window' ? 'even-window' : 'scene-cut',
            description: row.description,
            transcript: row.transcript,
            score
        };
    }).filter((h)=>h.score > -1).sort((a, b)=>b.score - a.score).slice(0, topK);
}
/** Render scene hits as [V#]-cited context for the agent prompt. */ function formatVideoSceneContext(hits) {
    if (hits.length === 0) return '';
    const lines = [
        '# Video scenes (retrieved)',
        ''
    ];
    hits.forEach((hit, i)=>{
        lines.push(`[V${i + 1}] ${hit.sourceName} — scene ${hit.sceneIdx + 1}, ${(0,_scene_detect__WEBPACK_IMPORTED_MODULE_3__/* .fmtSec */ .bz)(hit.startSec)}–${(0,_scene_detect__WEBPACK_IMPORTED_MODULE_3__/* .fmtSec */ .bz)(hit.endSec)} ` + `(mediaTimeSec: ${Math.round(hit.startSec)}, sourceId ${hit.sourceId}, relevance ${Math.round(Math.max(hit.score, 0) * 100)}%)`);
        if (hit.description) lines.push(`Visual: ${trim(hit.description, 400)}`);
        if (hit.transcript) lines.push(`Spoken: ${trim(hit.transcript, 400)}`);
        lines.push('');
    });
    return lines.join('\n');
}
function trim(text, max) {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const edge = cut.lastIndexOf(' ');
    return (edge > max * 0.6 ? cut.slice(0, edge) : cut) + '…';
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 765498:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ createMedicalWebSearchTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18963);
/* harmony import */ var _web_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59479);
/* harmony import */ var _server_provider_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(834007);
/* harmony import */ var _zai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(376389);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);
/* harmony import */ var _lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(204399);







const log = (0,_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('AgentWebSearch');
function formatResults(results) {
    if (results.length === 0) {
        return JSON.stringify({
            results: [],
            note: 'No results found for this query.'
        });
    }
    const numbered = results.map((result, index)=>`[S${index + 1}] ${result.title}${result.date ? ` (${result.date})` : ''}\n    ${result.url}${result.host ? ` (${result.host})` : ''}\n    ${result.snippet}`);
    return JSON.stringify({
        results,
        formatted: numbered.join('\n'),
        note: 'Cite these inline as [S1], [S2]… markers placed right after the claim each source supports. ' + 'NEVER paste raw URLs into the answer text — the interface renders [S#] markers as clickable ' + 'source cards and lists every URL in a Web sources panel automatically. ' + 'Results are re-ranked for recency (freshest first): when a source carries a date, mention the ' + 'year the moment you cite it (e.g. "per the 2024 ESC guideline [S1]"), and prefer the most ' + 'recent guidance when sources conflict — flag older sources as superseded where relevant.'
    });
}
async function searchViaZai(query, num) {
    try {
        const zai = await (0,_zai__WEBPACK_IMPORTED_MODULE_3__.createZAI)();
        if (!zai?.functions?.invoke) return null;
        // Fetch a couple extra beyond the requested count so the freshness
        // re-rank below still leaves `num` usable results after demoting stale
        // entries.
        const fetchCount = Math.min(num + 2, 8);
        const items = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_5__.withGatewayResilience)(()=>zai.functions.invoke('web_search', {
                query,
                num: fetchCount
            }), {
            label: 'search_medical_references'
        });
        if (!Array.isArray(items)) return null;
        const mapped = items.map((item)=>({
                title: item.name,
                url: item.url,
                snippet: item.snippet,
                host: item.host_name,
                date: item.date
            }));
        return rankForFreshness(mapped).slice(0, num);
    } catch (error) {
        log.warn?.('ZAI web_search fallback failed:', error);
        return null;
    }
}
// ── Guideline freshness ──────────────────────────────────────────────────────
//
// Clinical guidance moves: guidelines get revised (ESC 2024 vs 2018,
// ACC/AHA cycles, WHO updates), and a stale top hit can mislead a student
// quoting an outdated threshold. Results carrying a parseable date are
// grouped FRESH (>= FRESH_YEAR) → UNDATED → STALE; original order is kept
// inside each group (stable sort — the engine's relevance ranking survives).
const FRESH_YEAR = new Date().getFullYear() - 3;
function resultYear(result) {
    if (!result.date) return null;
    const iso = /(\d{4})-\d{2}-\d{2}/.exec(result.date) ?? /^\s*(\d{4})/.exec(result.date);
    if (iso) {
        const year = parseInt(iso[1], 10);
        if (year >= 1990 && year <= new Date().getFullYear() + 1) return year;
    }
    const monthName = new Date(result.date).getTime();
    if (!Number.isNaN(monthName)) {
        const year = new Date(monthName).getFullYear();
        if (year >= 1990 && year <= new Date().getFullYear() + 1) return year;
    }
    return null;
}
/** Stable re-rank: fresh (dated within 3y) first, undated next, stale last. */ function rankForFreshness(results) {
    const bucket = (result)=>{
        const year = resultYear(result);
        if (year === null) return 1;
        return year >= FRESH_YEAR ? 0 : 2;
    };
    return results.map((result, index)=>({
            result,
            index,
            bucket: bucket(result)
        })).sort((a, b)=>a.bucket - b.bucket || a.index - b.index).map((entry)=>entry.result);
}
// Image-finding intent in a search_medical_references query. When matched,
// the tool still runs (the text results may be useful reading) but its payload
// gains a redirect note pointing the model at search_medical_images — the tool
// that returns actual picture URLs the chat can render inline.
const IMAGE_INTENT_RE = /\b(images?|photos?|photographs?|pictures?|diagrams?|slides?|radiographs?|x-?rays?|micrographs?|histolog(?:y|ical)|scans?|imaging|atlas\b.{0,12}\bimages?|illustrations?|figures?)\b/i;
const FINDING_RE = /\b(find|search|show|look\s+for|get|see|view|browse|images?\s+of)\b/i;
/** True when a query reads like "show me pictures of X" rather than "evidence about X". */ function looksLikeImageRequest(query) {
    return IMAGE_INTENT_RE.test(query) && (FINDING_RE.test(query) || /\b(images?|photos?|pictures?|diagrams?)\s+(of|for|showing)\b/i.test(query));
}
/** Append the image-tool redirect hint to a formatted search payload. */ function withImageRedirectHint(query, payload) {
    if (!looksLikeImageRequest(query)) return payload;
    try {
        const parsed = JSON.parse(payload);
        parsed.imageRedirect = 'This query reads like the user wants to SEE actual images. These text results are website links only — ' + 'the user cannot see pictures from them. Call search_medical_images with the same subject next, ' + 'then embed 2-4 of its images in your final reply as ![short caption](imageUrl) with the source site named. ' + 'Only fall back to listing these text sources if search_medical_images fails.';
        return JSON.stringify(parsed);
    } catch  {
        return payload;
    }
}
function createMedicalWebSearchTool() {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_medical_references',
        description: 'Search configured web sources for current medical guidelines, evidence, statistics, or articles — textual evidence the user can READ. Cite sources as [S#] markers. If the user wants to SEE actual images (find/show/search for pictures, photos, diagrams, slides, radiographs of X), do NOT use this tool — call search_medical_images instead and embed its images inline as ![caption](imageUrl).',
        schema: zod__WEBPACK_IMPORTED_MODULE_6__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_6__/* .string */ .YjP().min(3).describe('Focused medical search query'),
            maxResults: zod__WEBPACK_IMPORTED_MODULE_6__/* .number */ .aig().int().min(1).max(5).default(3)
        }),
        func: async ({ query, maxResults })=>{
            // 1. Configured provider (only when its key resolves).
            // NOTE: resolveWebSearchApiKey MUST be called with two arguments —
            // the single-argument overload treats the first arg as a CLIENT key,
            // so resolveWebSearchApiKey('tavily') returned the literal string
            // 'tavily' as the API key → "Bearer tavily" → 401 on every search.
            const configuredProvider = process.env.MEDQ_AGENT_SEARCH_PROVIDER || 'tavily';
            // 'zai' means "use the built-in managed ZAI gateway" — skip the remote-provider step.
            if (configuredProvider !== 'zai') {
                const providerId = configuredProvider;
                const apiKey = (0,_server_provider_config__WEBPACK_IMPORTED_MODULE_2__/* .resolveWebSearchApiKey */ .qS)(providerId, undefined);
                if (apiKey) {
                    try {
                        const result = await (0,_web_search__WEBPACK_IMPORTED_MODULE_1__/* .searchWeb */ .H)({
                            providerId,
                            query,
                            maxResults,
                            apiKey,
                            baseUrl: (0,_server_provider_config__WEBPACK_IMPORTED_MODULE_2__/* .resolveWebSearchBaseUrl */ .t$)(providerId)
                        });
                        const sources = (result.sources ?? []).slice(0, maxResults).map((source)=>{
                            const record = source;
                            return {
                                title: String(record.title ?? record.name ?? 'Result'),
                                url: String(record.url ?? record.link ?? ''),
                                snippet: String(record.snippet ?? record.description ?? '').slice(0, 400),
                                host: typeof record.host === 'string' ? record.host : undefined
                            };
                        });
                        if (sources.length > 0) return withImageRedirectHint(query, formatResults(sources));
                    // Provider succeeded but empty — fall through to ZAI
                    } catch (error) {
                        log.warn?.(`Search provider ${providerId} failed, falling back to ZAI:`, error);
                    }
                }
            }
            // 2. ZAI gateway fallback (zero-config)
            const zaiResults = await searchViaZai(query, maxResults);
            if (zaiResults && zaiResults.length > 0) return withImageRedirectHint(query, formatResults(zaiResults));
            // 3. Honest unavailability — never throw (kills the whole stream)
            return JSON.stringify({
                results: [],
                note: 'Web search is temporarily unavailable (no search provider reachable). Answer from your own knowledge, state that live references could not be retrieved, and suggest the user verify current guidance.'
            });
        }
    });
}


/***/ }),

/***/ 770849:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ createTaskTools)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__]);
_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * Agent task tools — ported from hermes (task_create / task_update /
 * task_list over the AgentTask model). Gives the agent a persistent,
 * user-visible todo list that survives the conversation: study milestones,
 * revision checklists, multi-step deliverables the learner can track in the
 * Tasks tab.
 */ function createTaskTools(ctx) {
    const taskCreate = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'task_create',
        description: 'Create a trackable task on the learner\'s task list. Use for multi-step work (e.g. a 5-day revision plan) so progress is visible in the Tasks tab; update statuses as you complete steps.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(3).max(200).describe('Short task title, e.g. "Day 1: Cardiac physiology review"'),
            detail: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(2000).optional().describe('Optional longer description of what this task involves'),
            priority: zod__WEBPACK_IMPORTED_MODULE_2__/* ["enum"] */ .k5n([
                'low',
                'medium',
                'high'
            ]).optional().describe('Default medium'),
            dueAt: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().optional().describe('Optional ISO 8601 deadline')
        }),
        func: async ({ title, detail, priority, dueAt })=>{
            try {
                const due = dueAt ? new Date(dueAt) : null;
                if (due && Number.isNaN(due.getTime())) {
                    return JSON.stringify({
                        created: false,
                        error: 'Invalid dueAt datetime (expected ISO 8601).'
                    });
                }
                const task = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentTask.create({
                    data: {
                        userId: ctx.userId,
                        title,
                        detail: detail ?? null,
                        priority: priority ?? 'medium',
                        dueAt: due,
                        source: 'agent'
                    }
                });
                return JSON.stringify({
                    created: true,
                    taskId: task.id,
                    title: task.title,
                    status: task.status
                });
            } catch (error) {
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const taskUpdate = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'task_update',
        description: 'Update the status or priority of an existing task on the learner\'s list. Mark tasks in_progress when you start them and done when finished (ids come from task_create / task_list).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            taskId: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(1).describe('The task id to update'),
            // Tolerant enum: models see TWO status vocabularies (write_todos uses
            // pending/in_progress/completed; this list uses .../done) and reliably
            // cross-contaminate them. Accept the common aliases; normalize below.
            status: zod__WEBPACK_IMPORTED_MODULE_2__/* ["enum"] */ .k5n([
                'pending',
                'in_progress',
                'done',
                'blocked',
                'completed',
                'finished',
                'in-progress',
                'todo'
            ]).optional(),
            priority: zod__WEBPACK_IMPORTED_MODULE_2__/* ["enum"] */ .k5n([
                'low',
                'medium',
                'high'
            ]).optional()
        }),
        func: async ({ taskId, status, priority })=>{
            try {
                // Alias normalization → the DB enum.
                const normalized = status === 'completed' || status === 'finished' || status === 'todo' ? 'done' : status === 'in-progress' ? 'in_progress' : status;
                const task = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentTask.updateMany({
                    where: {
                        id: taskId,
                        userId: ctx.userId
                    },
                    data: {
                        ...normalized ? {
                            status: normalized
                        } : {},
                        ...priority ? {
                            priority
                        } : {}
                    }
                });
                return JSON.stringify({
                    updated: task.count > 0,
                    taskId
                });
            } catch (error) {
                return JSON.stringify({
                    updated: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const taskList = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'task_list',
        description: "List the learner's open tasks (pending, in progress, blocked) with priorities and due dates. Check this before planning study work to build on existing tasks.",
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({}),
        func: async ()=>{
            try {
                const tasks = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentTask.findMany({
                    where: {
                        userId: ctx.userId,
                        status: {
                            in: [
                                'pending',
                                'in_progress',
                                'blocked'
                            ]
                        }
                    },
                    orderBy: [
                        {
                            status: 'asc'
                        },
                        {
                            createdAt: 'desc'
                        }
                    ],
                    take: 30
                });
                return JSON.stringify({
                    tasks: tasks.map((task)=>({
                            id: task.id,
                            title: task.title,
                            detail: task.detail,
                            status: task.status,
                            priority: task.priority,
                            dueAt: task.dueAt?.toISOString() ?? null
                        })),
                    count: tasks.length
                });
            } catch (error) {
                return JSON.stringify({
                    tasks: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    return [
        taskCreate,
        taskUpdate,
        taskList
    ];
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 791532:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ audit)
/* harmony export */ });
/* unused harmony export listAuditTrail */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentAudit');
/** Append one audit row. NEVER throws — audit must not break the caller. */ async function audit({ userId, action, target, detail }) {
    try {
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentAuditLog.create({
            data: {
                userId: userId ?? undefined,
                action,
                target: target?.slice(0, 200),
                detailJson: detail ? JSON.stringify(detail).slice(0, 4000) : undefined
            }
        });
    } catch (error) {
        // Append-only telemetry: swallow and log so the audited operation proceeds.
        log.warn?.(`audit write failed (${action}):`, error);
    }
}
/** Recent audit rows for a user (settings/usage UI). */ async function listAuditTrail(userId, limit = 50) {
    return db.agentAuditLog.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 805271:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ createManageSkillsTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(791532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__, _audit__WEBPACK_IMPORTED_MODULE_2__]);
([_db__WEBPACK_IMPORTED_MODULE_1__, _audit__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




/**
 * manage_skills — runtime skill authoring tool (capability skill.write).
 *
 * The agent's LEARNING LOOP over its own skill library:
 *   - CREATE: persist a reusable workflow as a SKILL.md pack (source "user").
 *   - IMPROVE: enhance a skill the agent has used — rewrite the body with the
 *     lessons learned from this run (gaps hit, wrong tool references, missing
 *     steps, output-format fixes). The PRIOR version is snapshotted to
 *     AgentSkillRevision first, so every improvement is reversible from the
 *     skills viewer. This is what makes skills self-enhancing: the next turn
 *     loads the improved version.
 *   - DELETE: remove by skill id.
 *
 * Writes go through the AgentSkill model, which the skills workspace sync
 * renders into SKILL.md packs on the next agent build.
 */ /** Revisions kept per skill — history stays bounded and the UI list light. */ const MAX_REVISIONS = 20;
/**
 * Snapshot the CURRENT row into revision history (called before any content
 * overwrite). The revision's editedBy records WHO AUTHORED the archived
 * content (the skill's lastEditedBy) — authorship travels with content, so a
 * later restore of this revision restores the authorship badge too. Also
 * trims to the newest MAX_REVISIONS entries.
 */ async function snapshotRevision(skillId, reason) {
    const skill = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.findUnique({
        where: {
            id: skillId
        }
    });
    if (!skill) return 0;
    await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkillRevision.create({
        data: {
            skillId: skill.id,
            name: skill.name,
            description: skill.description,
            content: skill.content,
            reason,
            editedBy: skill.lastEditedBy || 'user'
        }
    });
    // Trim oldest beyond the cap (keep the newest MAX_REVISIONS).
    const oldest = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkillRevision.findMany({
        where: {
            skillId: skill.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: MAX_REVISIONS,
        select: {
            id: true
        }
    });
    if (oldest.length > 0) {
        await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkillRevision.deleteMany({
            where: {
                id: {
                    in: oldest.map((r)=>r.id)
                }
            }
        });
    }
    const total = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkillRevision.count({
        where: {
            skillId: skill.id
        }
    });
    return total;
}
function toKebab(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function createManageSkillsTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'manage_skills',
        description: 'Manage the learner\'s personal skill library (reusable SKILL.md workflows you load via load_skill). CREATE: write a focused, step-by-step body (when to use, workflow, output format) — use when the learner asks to save a workflow as a skill. IMPROVE: enhance a skill you already used — pass the skill name, a short "findings" note describing the gaps you hit this run, and the FULL rewritten body incorporating the lessons. The previous version is saved to history the learner can restore, and the improved version loads on your next turn. Use IMPROVE whenever the learner asks you to improve/refine a skill, and proactively after a run where a skill needed corrections (missing steps, wrong tool names, unclear format). DELETE: remove by skill id.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            action: zod__WEBPACK_IMPORTED_MODULE_3__/* ["enum"] */ .k5n([
                'create',
                'improve',
                'delete'
            ]).describe('create a new skill, improve (rewrite) an existing one, or delete one'),
            name: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(60).optional().describe('kebab-case skill name, e.g. "renal-diagnostics-drill"'),
            description: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(10).max(1024).optional().describe('What the skill does and when to use it (create requires it; improve may update it)'),
            body: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(100000).optional().describe('The full SKILL.md markdown body (required for create and improve): when to use, workflow steps, output format'),
            findings: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(2000).optional().describe('improve only: 1-3 sentences on what gaps you hit and what the rewrite fixes — shown to the learner in the version history'),
            skillId: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().optional().describe('The skill id (delete; or improve as an alternative to name)')
        }),
        func: async ({ action, name, description, body, findings, skillId })=>{
            try {
                if (action === 'create') {
                    if (!name || !description || !body) {
                        return JSON.stringify({
                            ok: false,
                            error: 'create requires name, description, and body'
                        });
                    }
                    const kebab = toKebab(name);
                    if (kebab.length < 3) {
                        return JSON.stringify({
                            ok: false,
                            error: 'name must contain at least 3 letters/digits'
                        });
                    }
                    // Builtin names are reserved — the workspace sync owns those packs.
                    const builtinClash = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.findFirst({
                        where: {
                            userId: null,
                            name: kebab
                        }
                    });
                    if (builtinClash) {
                        return JSON.stringify({
                            ok: false,
                            error: `"${kebab}" is a reserved built-in skill name (built-ins are operator-managed — create a personal variant like "${kebab}-v2" instead)`
                        });
                    }
                    const existing = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.findFirst({
                        where: {
                            userId: ctx.userId,
                            name: kebab
                        }
                    });
                    if (existing) {
                        // Re-creating an existing name overwrites it — snapshot first so
                        // the rewrite is reversible, exactly like improve.
                        const revisionCount = await snapshotRevision(existing.id, 're-authored via manage_skills create');
                        const updated = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.update({
                            where: {
                                id: existing.id
                            },
                            data: {
                                description,
                                content: body,
                                enabled: true,
                                lastEditedBy: 'agent'
                            }
                        });
                        return JSON.stringify({
                            ok: true,
                            updated: true,
                            skillId: updated.id,
                            name: kebab,
                            revisionCount,
                            note: 'previous version saved to history'
                        });
                    }
                    const created = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.create({
                        data: {
                            userId: ctx.userId,
                            name: kebab,
                            description,
                            content: body,
                            category: 'Custom',
                            source: 'user',
                            enabled: true,
                            lastEditedBy: 'agent'
                        }
                    });
                    await (0,_audit__WEBPACK_IMPORTED_MODULE_2__/* .audit */ .s)({
                        userId: ctx.userId,
                        action: 'tool.execute',
                        target: 'manage_skills',
                        detail: {
                            created: kebab
                        }
                    });
                    return JSON.stringify({
                        ok: true,
                        created: true,
                        skillId: created.id,
                        name: kebab
                    });
                }
                if (action === 'improve') {
                    if (!body) {
                        return JSON.stringify({
                            ok: false,
                            error: 'improve requires the full rewritten body (and name or skillId to identify the skill)'
                        });
                    }
                    if (!name && !skillId) {
                        return JSON.stringify({
                            ok: false,
                            error: 'improve requires the skill name (or skillId)'
                        });
                    }
                    // Scope to the user's own library — builtins are operator-managed.
                    const target = skillId ? await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.findFirst({
                        where: {
                            id: skillId,
                            userId: ctx.userId
                        }
                    }) : await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.findFirst({
                        where: {
                            userId: ctx.userId,
                            name: toKebab(name ?? '')
                        }
                    });
                    if (!target) {
                        return JSON.stringify({
                            ok: false,
                            error: 'no such skill in the learner\'s personal library (built-in skills cannot be improved in place — create a personal variant with your enhancements instead)'
                        });
                    }
                    const revisionCount = await snapshotRevision(target.id, findings?.trim() || 'improved by the agent');
                    const updated = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.update({
                        where: {
                            id: target.id
                        },
                        data: {
                            content: body,
                            ...description && description.trim().length >= 10 ? {
                                description: description.trim()
                            } : {},
                            lastEditedBy: 'agent'
                        }
                    });
                    await (0,_audit__WEBPACK_IMPORTED_MODULE_2__/* .audit */ .s)({
                        userId: ctx.userId,
                        action: 'tool.execute',
                        target: 'manage_skills',
                        detail: {
                            improved: updated.name,
                            findings: findings?.slice(0, 200)
                        }
                    });
                    return JSON.stringify({
                        ok: true,
                        improved: true,
                        skillId: updated.id,
                        name: updated.name,
                        revisionCount,
                        note: 'the improved version loads on the next turn; the previous one is restorable from history'
                    });
                }
                // delete
                if (!skillId) return JSON.stringify({
                    ok: false,
                    error: 'delete requires skillId'
                });
                const removed = await _db__WEBPACK_IMPORTED_MODULE_1__.db.agentSkill.deleteMany({
                    where: {
                        id: skillId,
                        userId: ctx.userId
                    }
                });
                return JSON.stringify({
                    ok: removed.count > 0,
                    deleted: removed.count > 0,
                    skillId
                });
            } catch (error) {
                return JSON.stringify({
                    ok: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 815519:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Me: () => (/* binding */ createMultimodalTools),
/* harmony export */   VQ: () => (/* binding */ createMemoryTools),
/* harmony export */   vU: () => (/* binding */ instrumentToolsForActivity)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18963);
/* harmony import */ var _memory_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(655042);
/* harmony import */ var _tools_web_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(765498);
/* harmony import */ var _tools_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(404643);
/* harmony import */ var _tools_lab_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(77707);
/* harmony import */ var _attachment_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(544852);
/* harmony import */ var _lib_media_image_providers_server__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(785554);
/* harmony import */ var _tools_illustration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(843037);
/* harmony import */ var _lib_audio_tts_providers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(107662);
/* harmony import */ var _lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(834007);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_memory_service__WEBPACK_IMPORTED_MODULE_1__]);
_memory_service__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// Shared search tool (provider → ZAI-gateway fallback → honest unavailability).
// The hand-rolled copy that used to live here had NO ZAI fallback, so with an
// unconfigured Tavily key every search_medical_references call failed — and it
// also hit the resolveWebSearchApiKey single-arg overload bug (the providerId
// string leaking in as the API key → "Bearer tavily" → 401 six times per
// generation). Reuse the canonical tool for exact parity with the chat agent.




// Server-only dispatch (adds the built-in ZAI provider on top of the shared
// registry) — see image-providers-server.ts for why agent code must use it.




function createMultimodalTools(getProviderConfig) {
    const medicalWebSearchTool = (0,_tools_web_search__WEBPACK_IMPORTED_MODULE_2__/* .createMedicalWebSearchTool */ .s)();
    const labPanelTool = (0,_tools_lab_panel__WEBPACK_IMPORTED_MODULE_4__/* .createLabPanelTool */ .g)();
    const medicalIllustrationTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'generate_medical_illustration',
        description: 'CREATE a brand-new educational medical illustration from scratch (only when the user asks to generate/draw/create an image, or a saved question genuinely needs one). If the user instead asks to FIND or SEE existing real images online, call search_medical_images — do NOT generate. Returns the provider result, or a clear configuration error.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            prompt: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(10).describe('Anatomically precise educational image prompt')
        }),
        func: async ({ prompt })=>{
            // Preferred provider from env (default seedream); falls back to the
            // managed ZAI image provider when no API key is configured for it —
            // this keeps illustration generation working out of the box on ZAI
            // deployments (the base64 result is persisted and rendered inline in
            // the chat UI). Previously this called Seedream with an empty key and
            // crashed the whole graph on the resulting 401.
            let providerId = process.env.MEDQ_AGENT_IMAGE_PROVIDER || 'seedream';
            let apiKey = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__/* .resolveImageApiKey */ .pb)(providerId);
            let baseUrl = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__/* .resolveImageBaseUrl */ .Au)(providerId);
            let fallbackNote;
            if (!apiKey && providerId !== 'zai') {
                fallbackNote = `Provider "${providerId}" has no API key configured — used the built-in ZAI image provider instead.`;
                providerId = 'zai';
                apiKey = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__/* .resolveImageApiKey */ .pb)('zai');
                baseUrl = (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__/* .resolveImageBaseUrl */ .Au)('zai');
            }
            try {
                const result = await (0,_lib_media_image_providers_server__WEBPACK_IMPORTED_MODULE_6__/* .generateImage */ .F)({
                    providerId,
                    apiKey: apiKey ?? '',
                    baseUrl,
                    model: process.env.MEDQ_AGENT_IMAGE_MODEL
                }, {
                    prompt,
                    aspectRatio: '16:9'
                });
                // Base64-only results (ZAI) are persisted to /public/generated so
                // the tool result carries a small, previewable URL the chat UI
                // renders inline instead of a ~40KB base64 blob.
                if (result.base64 && !result.url) {
                    const url = (0,_tools_illustration__WEBPACK_IMPORTED_MODULE_7__/* .saveGeneratedImage */ .s)(result.base64);
                    if (url) {
                        return JSON.stringify({
                            provider: providerId,
                            url,
                            width: result.width,
                            height: result.height,
                            ...fallbackNote ? {
                                note: fallbackNote
                            } : {}
                        });
                    }
                }
                return JSON.stringify({
                    provider: providerId,
                    ...result,
                    ...fallbackNote ? {
                        note: fallbackNote
                    } : {}
                });
            } catch (err) {
                // Graceful degradation: a failing image provider must NEVER crash
                // the agent graph — return an honest payload the agent can adapt to
                // (write the question text-only), matching search_medical_references.
                return JSON.stringify({
                    error: `Image generation failed: ${err instanceof Error ? err.message.slice(0, 200) : 'unknown error'}`,
                    note: 'Proceed without an image and write the question text-only. To enable image generation, set IMAGE_SEEDREAM_API_KEY (Ark/Volcano Engine) in .env — when no provider key is set, the built-in ZAI provider is used automatically.'
                });
            }
        }
    });
    const visualMaterialAnalysisTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'analyze_visual_material',
        description: 'Analyze an uploaded medical image or visual reference with a vision model to identify anatomy, pathology, imaging findings, or visual details. imageUrl accepts an attachment:// reference from the user\'s uploaded image, a data URL, or a public https image URL.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            imageUrl: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(5).describe('The image to analyze: use the attachment:// reference from the user\'s uploaded image, a data URL, or a public https URL'),
            question: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(5).describe('What medical details to extract from the image')
        }),
        func: async ({ imageUrl, question })=>{
            // fix(attachment-flow): the old body sent the agent provider (a text
            // model through the AI Router) an image_url block — the router has no
            // vision-capable upstream, so every call died with "routing exhausted
            // (no vision support)" in ~50ms. It also demanded z.string().url(),
            // rejecting the bare file names the model used to see. Now: resolve
            // attachment:// refs through the registry and run the proven ZAI
            // createVision chain (glm-4.5v → 4.6v → 4v) shared with knowledge
            // ingestion.
            let url;
            try {
                url = (0,_attachment_registry__WEBPACK_IMPORTED_MODULE_5__.resolveAttachmentInput)(imageUrl, 'image');
            } catch (error) {
                return JSON.stringify({
                    analyzed: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
            try {
                const { describeImage } = await __webpack_require__.e(/* import() */ 6899).then(__webpack_require__.bind(__webpack_require__, 256899));
                let buffer;
                let mimeType;
                if (url.startsWith('data:')) {
                    const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(url);
                    if (!match) throw new Error('Malformed data URL.');
                    buffer = Buffer.from(match[3], 'base64');
                    mimeType = match[1];
                } else {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Could not fetch the image: HTTP ${response.status}`);
                    mimeType = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg';
                    buffer = Buffer.from(await response.arrayBuffer());
                }
                const text = await describeImage(buffer, mimeType, question);
                if (text) return text;
                return JSON.stringify({
                    analyzed: false,
                    error: 'No vision model was reachable to analyze the image. Try again in a moment.'
                });
            } catch (error) {
                return JSON.stringify({
                    analyzed: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const medicalAudioTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'generate_medical_audio',
        description: 'Generate a spoken clinical explanation, auscultation prompt, or teaching narration when a question requires audio. Only use this for a genuine audio requirement.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            text: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(10).describe('Clinical text to speak aloud'),
            voice: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().default('alloy').describe('TTS voice to use')
        }),
        func: async ({ text, voice })=>{
            const providerId = process.env.MEDQ_AGENT_TTS_PROVIDER || 'openai-tts';
            const config = {
                providerId,
                apiKey: (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__.resolveTTSApiKey)(providerId),
                baseUrl: (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__.resolveTTSBaseUrl)(providerId),
                modelId: (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_9__.resolveTTSModel)(providerId, process.env.MEDQ_AGENT_TTS_MODEL),
                voice,
                speed: 1
            };
            const result = await (0,_lib_audio_tts_providers__WEBPACK_IMPORTED_MODULE_8__.generateTTS)(config, text);
            return JSON.stringify({
                providerId,
                format: result.format,
                durationMs: result.audio.length,
                audio: result.audio ? 'audio-bytes-generated' : 'none'
            });
        }
    });
    return [
        medicalWebSearchTool,
        (0,_tools_media__WEBPACK_IMPORTED_MODULE_3__/* .createImageSearchTool */ .G6)(),
        labPanelTool,
        medicalIllustrationTool,
        medicalAudioTool,
        visualMaterialAnalysisTool
    ];
}
function createMemoryTools(ctx) {
    const saveMemoryTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'save_memory',
        description: 'Save a durable fact about this learner to long-term memory. Use for stable, useful information: year of study, specialty goals, weak topics, preferred explanation style, exam dates. NOT for transient chat details. Providing a key updates the existing memory with that key.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            scope: zod__WEBPACK_IMPORTED_MODULE_10__/* ["enum"] */ .k5n([
                'profile',
                'study',
                'fact',
                'conversation',
                'semantic'
            ]).describe('profile = who they are, study = how/what they study, fact = learned knowledge, conversation = working notes for the current thread, semantic = auto-extracted interaction facts'),
            content: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(3).max(400).describe('The fact, written in third person, e.g. "Struggles with renal physiology; asks for analogies"'),
            key: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().max(120).optional().describe('Short stable key for upsert, e.g. "weak-topic-renal"'),
            importance: zod__WEBPACK_IMPORTED_MODULE_10__/* .number */ .aig().min(0).max(1).optional().describe('0-1, default 0.5; use 0.8+ for core facts')
        }),
        func: async (input)=>{
            try {
                const entry = await (0,_memory_service__WEBPACK_IMPORTED_MODULE_1__/* .saveMemory */ .zm)({
                    userId: ctx.userId,
                    ...input
                });
                return JSON.stringify({
                    saved: true,
                    id: entry.id,
                    scope: entry.scope,
                    key: entry.key
                });
            } catch (error) {
                return JSON.stringify({
                    saved: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const searchMemoryTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'search_memory',
        description: 'Search long-term memory for what is known about this learner (preferences, weak topics, past interactions). Use before personalizing an answer or study plan.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            query: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(2).describe('What to recall, e.g. "cardiology weak areas"'),
            limit: zod__WEBPACK_IMPORTED_MODULE_10__/* .number */ .aig().int().min(1).max(10).optional().describe('Max results, default 6')
        }),
        func: async ({ query, limit })=>{
            try {
                const results = await (0,_memory_service__WEBPACK_IMPORTED_MODULE_1__/* .searchMemories */ .Cp)(ctx.userId, query, limit ?? 6);
                if (results.length === 0) return JSON.stringify({
                    memories: [],
                    note: 'No stored memories match yet.'
                });
                return JSON.stringify({
                    memories: results.map((entry)=>({
                            scope: entry.scope,
                            key: entry.key,
                            content: entry.content,
                            relevance: Math.round(Math.min(entry.score / 3, 1) * 100) / 100
                        }))
                });
            } catch (error) {
                return JSON.stringify({
                    memories: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const updateMemoryTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'update_memory',
        description: 'Edit a stored memory by id — refine wording or importance (ids come from search_memory or list_memory). Prefer save_memory with the same key for simple upserts.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            memoryId: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(1).describe('The memory id to update'),
            content: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(3).max(400).optional().describe('New content (omit to keep)'),
            importance: zod__WEBPACK_IMPORTED_MODULE_10__/* .number */ .aig().min(0).max(1).optional().describe('New importance (omit to keep)')
        }),
        func: async ({ memoryId, content, importance })=>{
            try {
                const entry = await (0,_memory_service__WEBPACK_IMPORTED_MODULE_1__/* .updateMemory */ .jk)(ctx.userId, memoryId, {
                    content,
                    importance
                });
                if (!entry) return JSON.stringify({
                    updated: false,
                    error: 'Memory not found'
                });
                return JSON.stringify({
                    updated: true,
                    id: entry.id,
                    scope: entry.scope,
                    key: entry.key
                });
            } catch (error) {
                return JSON.stringify({
                    updated: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const listMemoryTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'list_memory',
        description: 'List the learner\'s most recent memories (all scopes, newest first). Use to review what is already stored before saving duplicates or when search terms are uncertain.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            limit: zod__WEBPACK_IMPORTED_MODULE_10__/* .number */ .aig().int().min(1).max(50).optional().describe('Max results, default 20')
        }),
        func: async ({ limit })=>{
            try {
                const entries = await (0,_memory_service__WEBPACK_IMPORTED_MODULE_1__/* .listMemories */ .kM)(ctx.userId, Math.min(limit ?? 20, 50));
                return JSON.stringify({
                    memories: entries.map((entry)=>({
                            id: entry.id,
                            scope: entry.scope,
                            key: entry.key,
                            content: entry.content,
                            importance: entry.importance
                        }))
                });
            } catch (error) {
                return JSON.stringify({
                    memories: [],
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const forgetMemoryTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'forget_memory',
        description: 'Delete an outdated or incorrect memory by its id (ids are returned by search_memory). Use when the learner corrects a stored fact, then save the corrected version with save_memory.',
        schema: zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ikc({
            memoryId: zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .YjP().min(1).describe('The memory id to delete')
        }),
        func: async ({ memoryId })=>{
            try {
                const removed = await (0,_memory_service__WEBPACK_IMPORTED_MODULE_1__/* .forgetMemory */ .hz)(ctx.userId, memoryId);
                return JSON.stringify({
                    removed
                });
            } catch (error) {
                return JSON.stringify({
                    removed: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    return [
        saveMemoryTool,
        searchMemoryTool,
        updateMemoryTool,
        forgetMemoryTool,
        listMemoryTool
    ];
}
/**
 * Wrap DynamicStructuredTools with activity instrumentation. Every invocation
 * emits tool_start (parsed args + fresh callId) when execution begins and
 * tool_end (result excerpt, ok flag, duration) when it completes — including
 * on throw, so a failed call never dangles as "waiting".
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic tool-array passthrough: the wrapper preserves the caller's concrete DynamicStructuredTool union without re-inferring its zod schema generics
function instrumentToolsForActivity(tools, onEvent) {
    let seq = 0;
    return tools.map((tool)=>{
        const original = tool.func;
        return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
            name: tool.name,
            description: tool.description,
            schema: tool.schema,
            func: async (input)=>{
                const callId = `${tool.name}-${++seq}-${Date.now()}`;
                onEvent({
                    type: 'tool_start',
                    tool: tool.name,
                    callId,
                    args: input
                });
                const startedAt = Date.now();
                try {
                    const result = await original(input);
                    onEvent({
                        type: 'tool_end',
                        tool: tool.name,
                        callId,
                        ok: true,
                        excerpt: (typeof result === 'string' ? result : JSON.stringify(result)).slice(0, 600),
                        durationMs: Date.now() - startedAt
                    });
                    return result;
                } catch (error) {
                    onEvent({
                        type: 'tool_end',
                        tool: tool.name,
                        callId,
                        ok: false,
                        excerpt: (error instanceof Error ? error.message : String(error)).slice(0, 600),
                        durationMs: Date.now() - startedAt
                    });
                    throw error;
                }
            }
        });
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 843037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ saveGeneratedImage)
/* harmony export */ });
/* unused harmony export createMedicalIllustrationTool */
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(977598);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(971890);
/* harmony import */ var _media_image_providers_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(785554);
/* harmony import */ var _server_provider_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(834007);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(653165);





// Server-only dispatch (adds the built-in ZAI provider on top of the shared
// registry) — see image-providers-server.ts for why agent code must use it.



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_6__/* .createLogger */ .h)('AgentIllustration');
/**
 * Persist a base64 image to public/generated/ so tool results carry a stable,
 * previewable URL instead of a ~40KB base64 blob (which would blow the tool
 * result excerpt cap and bloat chat storage). Served by Next's static file
 * handling for /public in dev. Shared with tools/discovery.ts (Task 6).
 */ function saveGeneratedImage(base64) {
    try {
        const buffer = Buffer.from(base64, 'base64');
        // Sniff the actual format — the ZAI SDK (and some providers) return JPEG
        // even when asked for PNG. Browsers render by content sniffing, but the
        // extension should be honest for downloads and downstream pipelines.
        const isJpeg = buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
        const ext = isJpeg ? 'jpg' : 'png';
        const dir = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'generated');
        node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(dir, {
            recursive: true
        });
        const fileName = `agent-${(0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID)().slice(0, 12)}.${ext}`;
        node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(node_path__WEBPACK_IMPORTED_MODULE_2___default().join(dir, fileName), buffer);
        return `/generated/${fileName}`;
    } catch (error) {
        log.warn?.('Failed to persist generated image:', error);
        return null;
    }
}
/**
 * generate_medical_illustration — educational image generation.
 * (Moved from the monolithic deep-agent-runtime.ts; behavior unchanged.)
 */ function createMedicalIllustrationTool() {
    return new DynamicStructuredTool({
        name: 'generate_medical_illustration',
        description: 'Generate an educational medical illustration when a question genuinely requires an image. Returns the provider result, or a clear configuration error.',
        schema: z.object({
            prompt: z.string().min(10).describe('Anatomically precise educational image prompt')
        }),
        func: async ({ prompt })=>{
            // Preferred provider from env (default seedream); falls back to the
            // managed ZAI image provider when no API key is configured for it —
            // this keeps illustration generation working out of the box on ZAI
            // deployments (the base64 result is rendered inline in the chat UI).
            let providerId = process.env.MEDQ_AGENT_IMAGE_PROVIDER || 'seedream';
            let apiKey = resolveImageApiKey(providerId);
            let baseUrl = resolveImageBaseUrl(providerId);
            if (!apiKey && providerId !== 'zai') {
                providerId = 'zai';
                apiKey = resolveImageApiKey('zai') || undefined;
                baseUrl = resolveImageBaseUrl('zai');
            }
            try {
                const result = await generateImage({
                    providerId,
                    apiKey: apiKey ?? '',
                    baseUrl,
                    model: process.env.MEDQ_AGENT_IMAGE_MODEL
                }, {
                    prompt,
                    aspectRatio: '16:9'
                });
                // Base64-only results (ZAI) are persisted to /public/generated so the
                // result carries a small, previewable URL the chat UI renders inline.
                if (result.base64 && !result.url) {
                    const url = saveGeneratedImage(result.base64);
                    if (url) return JSON.stringify({
                        url,
                        width: result.width,
                        height: result.height
                    });
                }
                return JSON.stringify(result);
            } catch (err) {
                // Graceful degradation: a failing image provider must never crash the
                // agent graph — return an honest payload the agent can adapt to.
                return JSON.stringify({
                    error: `Image generation failed: ${err instanceof Error ? err.message.slice(0, 200) : 'unknown error'}`,
                    note: 'Proceed without an image. To enable image generation, set IMAGE_SEEDREAM_API_KEY (Ark/Volcano Engine) in .env — when no provider key is set, the built-in ZAI provider is used automatically.'
                });
            }
        }
    });
}


/***/ }),

/***/ 858701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RA: () => (/* binding */ nextPoolKey),
/* harmony export */   Rg: () => (/* binding */ resolveAgentKeyPool),
/* harmony export */   j_: () => (/* binding */ poolBaseUrl),
/* harmony export */   qT: () => (/* binding */ normalizeBaseUrl)
/* harmony export */ });
/**
 * Agent API key pool — rate-limit mitigation through key rotation.
 *
 * MEDQ_AGENT_API_KEYS (comma-separated) declares ADDITIONAL keys for the same
 * operator-configured provider/endpoint as MEDQ_AGENT_API_KEY. When the
 * primary key hits a provider rate limit (429 / "too many requests" / 5xx
 * storm), the chat runtime's attempt loop rotates to the next healthy pool
 * key on the SAME endpoint BEFORE falling back to the managed Z.AI backup
 * service. Rotation is capped at one hop per turn — brief storms are already
 * absorbed inside the model call (ChatOpenAI maxRetries + modelRetryMiddleware);
 * the pool hop covers sustained per-key quota exhaustion.
 *
 * Keys only apply to the env-configured provider (MEDQ_AGENT_BASE_URL /
 * OPENAI_BASE_URL): a user-picked model or the Z.AI backup runs on its own
 * credentials and is never rotated.
 */ /** Resolve the pool from env: primary first, then MEDQ_AGENT_API_KEYS extras. */ function resolveAgentKeyPool() {
    const primary = (process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    const extras = (process.env.MEDQ_AGENT_API_KEYS || '').split(',').map((key)=>key.trim()).filter((key)=>key.length > 0 && key !== primary);
    const keys = [
        primary,
        ...extras
    ].filter(Boolean);
    return {
        keys,
        size: keys.length
    };
}
/**
 * The next pool key that differs from `avoid` (the key that just failed).
 * Returns null when the pool offers no alternative.
 */ function nextPoolKey(pool, avoid) {
    if (pool.size === 0) return null;
    if (!avoid) return pool.keys[0];
    const index = pool.keys.indexOf(avoid);
    if (index >= 0) {
        if (pool.size === 1) return null;
        return pool.keys[(index + 1) % pool.size];
    }
    return pool.keys[0];
}
/** Normalize a base URL for comparison (trim trailing slashes). */ function normalizeBaseUrl(url) {
    return url.trim().replace(/\/+$/, '');
}
/** The base URL the pool keys belong to (env-configured provider), or null. */ function poolBaseUrl() {
    const raw = process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || '';
    return raw ? normalizeBaseUrl(raw) : null;
}


/***/ }),

/***/ 865398:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ createFlashcardTools)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_1__]);
_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Flashcard tools — the bridge between the chat agent and MedQ's EXISTING
 * spaced-repetition system.
 *
 * The app already has a complete SM-2 pipeline (FlashcardProgress: interval /
 * repetition / efactor / nextReview, the /api/flashcard due-new-all queue,
 * streaks + XP on review) — but until now nothing let the AGENT create or
 * inspect flashcards. Students asked "make flashcards from this lecture" and
 * the agent could only write text into the chat; the cards never entered the
 * review queue.
 *
 * These tools close that loop:
 *   • create_flashcards        — writes cards as Question rows (type
 *     "flashcard") and enrolls each into FlashcardProgress with nextReview =
 *     now, so they appear in the due queue immediately. The bank listing
 *     route excludes type "flashcard" by default, so MCQ banks stay clean.
 *   • flashcard_review_status  — due counts + upcoming schedule so the agent
 *     can answer "how many cards do I owe today?" and nudge the learner.
 */ 


function guestResult() {
    return JSON.stringify({
        created: false,
        error: 'Flashcards require a signed-in account (guest chat cannot own saved study material).'
    });
}
function createFlashcardTools(ctx) {
    const createFlashcardsTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_flashcards',
        description: 'Save flashcards to the learner\'s spaced-repetition review queue (SM-2 scheduling — cards resurface at expanding intervals). Use whenever the user asks to make/create/build flashcards from anything: a lecture transcript, a summary you just gave, an uploaded document, a topic. Each card is a concise front (prompt/cue) and back (answer). Cards become due for review immediately and show up in the Flashcards page. Do NOT use this for multiple-choice questions the user wants in their question bank — that is run_question_generation_agent / save_question.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            cards: zod__WEBPACK_IMPORTED_MODULE_2__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
                front: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(3).max(500).describe('The prompt side: a question, cue, or term'),
                back: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(1).max(1000).describe('The answer side: concise, self-contained'),
                system: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(80).optional().describe('Organ system, e.g. "Cardiovascular"'),
                topic: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(120).optional().describe('Specific topic, e.g. "Starling forces"')
            })).min(1).max(30).describe('The flashcards to create (1-30 per call)'),
            deckLabel: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(120).optional().describe('Short label grouping this batch, e.g. "ACS lecture 2026-10-23"')
        }),
        func: async ({ cards, deckLabel })=>{
            if (!ctx.userId || ctx.userId === 'guest') return guestResult();
            try {
                const now = new Date();
                const tags = JSON.stringify([
                    'flashcard',
                    ...deckLabel ? [
                        deckLabel
                    ] : []
                ]);
                const created = [];
                // Sequential creates keep the DB happy and keep card order stable.
                for (const card of cards){
                    const question = await _db__WEBPACK_IMPORTED_MODULE_1__.db.question.create({
                        data: {
                            type: 'flashcard',
                            text: card.front,
                            answer: card.back,
                            explanation: card.back,
                            options: JSON.stringify([]),
                            system: card.system ?? '',
                            topic: card.topic ?? '',
                            tags,
                            isAIGenerated: true,
                            reviewStatus: 'approved',
                            createdAt: now,
                            updatedAt: now
                        },
                        select: {
                            id: true,
                            text: true
                        }
                    });
                    // Enroll into SM-2: first repetition due immediately (nextReview =
                    // now → shows in the "due" queue on the Flashcards page).
                    await _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.create({
                        data: {
                            userId: ctx.userId,
                            questionId: question.id,
                            interval: 1,
                            repetition: 0,
                            efactor: 2.5,
                            nextReview: now,
                            lastReview: now
                        }
                    }).catch(()=>undefined); // progress row may exist only on races; enrollment is idempotent enough
                    created.push({
                        id: question.id,
                        front: question.text.slice(0, 80)
                    });
                }
                // How much is due in total right after this batch?
                const dueCount = await _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.count({
                    where: {
                        userId: ctx.userId,
                        nextReview: {
                            lte: now
                        }
                    }
                }).catch(()=>0);
                return JSON.stringify({
                    created: true,
                    count: created.length,
                    cards: created,
                    totalDueNow: dueCount,
                    note: `Saved ${created.length} flashcard${created.length === 1 ? '' : 's'} to the learner's review queue. ` + `Tell them the cards are due NOW (${dueCount} total due) on the Flashcards page, and SM-2 will resurface ` + `each card at expanding intervals as they rate their recall.`
                });
            } catch (error) {
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    const reviewStatusTool = new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'flashcard_review_status',
        description: "Check the learner's spaced-repetition backlog: how many flashcards are due right now, due within the next 24h/7d, total enrolled, and recent review accuracy. Use when they ask about their review queue, whether they have cards to do today, or their flashcard progress — and proactively when planning a study session.",
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({}),
        func: async ()=>{
            if (!ctx.userId || ctx.userId === 'guest') {
                return JSON.stringify({
                    error: 'Review status requires a signed-in account.'
                });
            }
            try {
                const now = new Date();
                const in24h = new Date(now.getTime() + 24 * 3600000);
                const in7d = new Date(now.getTime() + 7 * 24 * 3600000);
                const [dueNow, due24h, due7d, total, recent] = await Promise.all([
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.count({
                        where: {
                            userId: ctx.userId,
                            nextReview: {
                                lte: now
                            }
                        }
                    }),
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.count({
                        where: {
                            userId: ctx.userId,
                            nextReview: {
                                lte: in24h
                            }
                        }
                    }),
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.count({
                        where: {
                            userId: ctx.userId,
                            nextReview: {
                                lte: in7d
                            }
                        }
                    }),
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.flashcardProgress.count({
                        where: {
                            userId: ctx.userId
                        }
                    }),
                    _db__WEBPACK_IMPORTED_MODULE_1__.db.studySession.count({
                        where: {
                            userId: ctx.userId,
                            type: 'flashcard',
                            createdAt: {
                                gte: new Date(now.getTime() - 7 * 24 * 3600000)
                            }
                        }
                    })
                ]);
                return JSON.stringify({
                    dueNow,
                    dueWithin24h: due24h,
                    dueWithin7d: due7d,
                    totalCards: total,
                    reviewsLast7d: recent,
                    note: dueNow > 0 ? `${dueNow} card${dueNow === 1 ? ' is' : 's are'} due RIGHT NOW — suggest starting the review session (Flashcards page), and offer to generate more cards on weak topics if the queue is light.` : 'Nothing is due right now. Suggest creating new flashcards from recent material, or reviewing again when the next batch matures.'
                });
            } catch (error) {
                return JSON.stringify({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
    return [
        createFlashcardsTool,
        reviewStatusTool
    ];
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 872885:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ McpError),
/* harmony export */   d: () => (/* binding */ McpConnection)
/* harmony export */ });
/**
 * Minimal MCP (Model Context Protocol) client — native, zero-dependency.
 *
 * Implements the three transports the AgentMcpServer schema supports:
 *   - `http`  : Streamable HTTP (MCP 2025-06-18) — JSON-RPC POST; the server
 *               answers with JSON or an SSE stream; session id header honored.
 *   - `sse`   : Legacy HTTP+SSE — GET <url> opens the event stream, the
 *               `endpoint` event returns the POST URL for requests.
 *   - `stdio` : Newline-delimited JSON-RPC over the child process's
 *               stdin/stdout.
 *
 * Scope: exactly what the agent needs — initialize, tools/list, tools/call.
 * Promises are correlated by request id; notifications are ignored. Every
 * method enforces a timeout so a hung server can never park the agent graph.
 */ const PROTOCOL_VERSION = '2025-06-18';
const CLIENT_INFO = {
    name: 'medq-agent',
    version: '1.0.0'
};
const CONNECT_TIMEOUT_MS = 12000;
const LIST_TIMEOUT_MS = 20000;
const CALL_TIMEOUT_MS = 120000;
class McpError extends Error {
    constructor(message, code){
        super(message), this.code = code;
        this.name = 'McpError';
    }
}
/** Tiny SSE line parser → complete `data:` payloads (used by http + sse). */ class SseParser {
    /** Feed a text chunk; yields complete JSON-RPC message objects. */ feed(chunk) {
        this.buffer += chunk;
        const out = [];
        let idx;
        while((idx = this.buffer.indexOf('\n')) >= 0){
            const line = this.buffer.slice(0, idx).replace(/\r$/, '');
            this.buffer = this.buffer.slice(idx + 1);
            if (line === '') {
                if (this.dataLines.length > 0) {
                    const payload = this.dataLines.join('\n');
                    this.dataLines = [];
                    if (payload.trim()) {
                        try {
                            out.push(JSON.parse(payload));
                        } catch  {}
                    }
                }
                continue;
            }
            if (line.startsWith('data:')) this.dataLines.push(line.slice(5).trimStart());
        // `event:` lines are not needed — every meaningful payload is JSON-RPC in data.
        }
        return out;
    }
    constructor(){
        this.buffer = '';
        this.dataLines = [];
    }
}
class McpConnection {
    constructor(config){
        this.config = config;
        this.nextId = 1;
        this.pending = new Map();
        this.sessionId = null;
        this.sseEndpoint = null; // legacy SSE POST target
        this.child = null;
        this.sseAbort = null;
        this.closed = false;
        this.initialized = false;
        this.stdoutBuffer = '';
        this.sseEndpointWaiter = null;
    }
    /** Cache key — connections are reused while the server row is unchanged. */ get key() {
        return JSON.stringify([
            this.config.id,
            this.config.transport,
            this.config.url,
            this.config.command,
            this.config.args ?? [],
            this.config.headers ?? {}
        ]);
    }
    get serverName() {
        return this.config.name;
    }
    async connect() {
        if (this.initialized) return;
        if (this.config.transport === 'stdio') this.spawnStdio();
        if (this.config.transport === 'sse') await this.openLegacySse();
        await this.request('initialize', {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: {},
            clientInfo: CLIENT_INFO
        }, CONNECT_TIMEOUT_MS);
        this.notify('notifications/initialized');
        this.initialized = true;
    }
    async listTools() {
        const tools = [];
        let cursor;
        do {
            const result = await this.request('tools/list', cursor ? {
                cursor
            } : {}, LIST_TIMEOUT_MS);
            for (const tool of result?.tools ?? []){
                if (tool && typeof tool.name === 'string') tools.push(tool);
            }
            cursor = result?.nextCursor;
        }while (cursor);
        return tools;
    }
    async callTool(name, args, timeoutMs = CALL_TIMEOUT_MS) {
        const result = await this.request('tools/call', {
            name,
            arguments: args ?? {}
        }, timeoutMs);
        const parts = [];
        for (const block of result?.content ?? []){
            if (block?.type === 'text' && typeof block.text === 'string') parts.push(block.text);
            else if (block && typeof block === 'object') parts.push(JSON.stringify(block));
        }
        let text = parts.join('\n');
        if (!text && result?.structuredContent != null) text = JSON.stringify(result.structuredContent);
        if (result?.isError) {
            throw new McpError(text || `MCP tool "${name}" returned an error`, 'TOOL_ERROR');
        }
        return text || '(empty result)';
    }
    async close() {
        this.closed = true;
        for (const [, pending] of this.pending){
            clearTimeout(pending.timer);
            pending.reject(new McpError('Connection closed'));
        }
        this.pending.clear();
        this.sseAbort?.abort();
        if (this.child) {
            this.child.stdin?.end();
            this.child.kill('SIGTERM');
            this.child = null;
        }
    }
    // ── Transport plumbing ───────────────────────────────────────────────────
    async request(method, params, timeoutMs) {
        const id = this.nextId++;
        const message = JSON.stringify({
            jsonrpc: '2.0',
            id,
            method,
            params
        });
        return new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>{
                this.pending.delete(id);
                reject(new McpError(`MCP ${method} timed out after ${timeoutMs}ms (${this.config.name})`, 'TIMEOUT'));
            }, timeoutMs);
            this.pending.set(id, {
                resolve,
                reject,
                timer
            });
            this.deliver(message, id).catch((error)=>{
                const pending = this.pending.get(id);
                if (pending) {
                    clearTimeout(pending.timer);
                    this.pending.delete(id);
                    pending.reject(error instanceof Error ? error : new McpError(String(error)));
                }
            });
        });
    }
    notify(method) {
        this.deliver(JSON.stringify({
            jsonrpc: '2.0',
            method
        })).catch(()=>{});
    }
    async deliver(message, requestId) {
        if (this.closed) throw new McpError('Connection is closed');
        if (this.config.transport === 'stdio') {
            this.child?.stdin?.write(message + '\n');
            return;
        }
        const target = this.config.transport === 'sse' ? this.sseEndpoint : this.config.url;
        if (!target) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
        const headers = {
            'Content-Type': 'application/json',
            Accept: this.config.transport === 'sse' ? 'application/json' : 'application/json, text/event-stream',
            ...this.config.headers ?? {}
        };
        if (this.sessionId) headers['mcp-session-id'] = this.sessionId;
        const response = await fetch(target, {
            method: 'POST',
            headers,
            body: message
        });
        // Session negotiation (streamable http): sticky header on ANY response.
        const sid = response.headers.get('mcp-session-id');
        if (sid) this.sessionId = sid;
        if (!response.ok) {
            const body = await response.text().catch(()=>'');
            throw new McpError(`MCP HTTP ${response.status} from "${this.config.name}"${body ? `: ${body.slice(0, 300)}` : ''}`);
        }
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('text/event-stream')) {
            // Streamed responses: consume the SSE body, dispatch messages, resolve
            // when OUR id lands (the stream may stay open — abort after our id).
            const reader = response.body?.getReader();
            if (!reader) throw new McpError('MCP SSE response has no body');
            const parser = new SseParser();
            const decoder = new TextDecoder();
            try {
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const messages = parser.feed(decoder.decode(value, {
                        stream: true
                    }));
                    const found = this.dispatch(messages);
                    if (found === requestId) {
                        await reader.cancel().catch(()=>{});
                        return;
                    }
                }
            } finally{
                await reader.cancel().catch(()=>{});
            }
            // Stream ended without our response — let the timeout reject it.
            return;
        }
        // Plain JSON response.
        const data = await response.json().catch(()=>null);
        if (data?.error) throw new McpError(data.error.message ?? 'MCP error', data.error.code);
        if (requestId != null) {
            const pending = this.pending.get(requestId);
            if (pending) {
                clearTimeout(pending.timer);
                this.pending.delete(requestId);
                pending.resolve(data?.result);
            }
        }
    }
    /** Route parsed messages to pending requests. Returns the id that resolved, if any. */ dispatch(messages) {
        for (const message of messages){
            const msg = message;
            if (typeof msg?.id !== 'number') continue; // notifications (cancellation, progress…)
            const pending = this.pending.get(msg.id);
            if (!pending) continue;
            clearTimeout(pending.timer);
            this.pending.delete(msg.id);
            if (msg.error) pending.reject(new McpError(msg.error.message ?? 'MCP error', msg.error.code));
            else pending.resolve(msg.result);
            return msg.id;
        }
        return null;
    }
    /** Legacy SSE transport: GET the SSE URL, learn the POST endpoint, keep the
   *  stream open so responses arrive; requests POST to the endpoint. */ async openLegacySse() {
        if (!this.config.url) throw new McpError(`MCP server "${this.config.name}" has no URL configured`);
        this.sseAbort = new AbortController();
        const response = await fetch(this.config.url, {
            headers: {
                Accept: 'text/event-stream',
                ...this.config.headers ?? {}
            },
            signal: this.sseAbort.signal
        });
        if (!response.ok || !response.body) {
            throw new McpError(`MCP SSE connect failed (${response.status}) for "${this.config.name}"`);
        }
        const reader = response.body.getReader();
        const parser = new SseParser();
        const decoder = new TextDecoder();
        const endpointReady = new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>reject(new McpError(`MCP SSE endpoint event timeout (${this.config.name})`)), CONNECT_TIMEOUT_MS);
            this.sseEndpointWaiter = {
                resolve: ()=>{
                    clearTimeout(timer);
                    resolve();
                }
            };
        });
        this.sseEndpoint = null;
        void (async ()=>{
            try {
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    // endpoint event: data: /messages?sessionId=… (absolute or path)
                    const endpointMatch = chunk.match(/^data:\s*(\/[^\s]+|https?:\/\/[^\s]+)\s*$/m);
                    if (endpointMatch && !this.sseEndpoint) {
                        const raw = endpointMatch[1];
                        this.sseEndpoint = raw.startsWith('http') ? raw : new URL(raw, this.config.url).toString();
                        this.sseEndpointWaiter?.resolve();
                    }
                    this.dispatch(parser.feed(chunk));
                }
            } catch  {}
        })();
        await endpointReady;
    }
    /** stdio transport: spawn the server process, parse stdout lines. */ spawnStdio() {
        if (!this.config.command) {
            throw new McpError(`MCP server "${this.config.name}" has no command configured`);
        }
        // Dynamic require keeps the child_process import out of edge/browser bundles.
        const { spawn } = __webpack_require__(731421);
        const child = spawn(this.config.command, this.config.args ?? [], {
            stdio: [
                'pipe',
                'pipe',
                'pipe'
            ],
            env: {
                ...process.env
            }
        });
        this.child = child;
        child.on('error', (error)=>this.failAll(new McpError(`MCP stdio spawn failed: ${error.message}`)));
        child.stdout?.on('data', (buffer)=>{
            this.stdoutBuffer += buffer.toString('utf8');
            let idx;
            while((idx = this.stdoutBuffer.indexOf('\n')) >= 0){
                const line = this.stdoutBuffer.slice(0, idx).trim();
                this.stdoutBuffer = this.stdoutBuffer.slice(idx + 1);
                if (!line) continue;
                try {
                    this.dispatch([
                        JSON.parse(line)
                    ]);
                } catch  {}
            }
        });
        child.on('close', ()=>this.failAll(new McpError(`MCP stdio server "${this.config.name}" exited`)));
    }
    failAll(error) {
        for (const [, pending] of this.pending){
            clearTimeout(pending.timer);
            pending.reject(error);
        }
        this.pending.clear();
    }
}


/***/ }),

/***/ 886776:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ createMedicalFetchTool),
/* harmony export */   fetchPageText: () => (/* binding */ fetchPageText),
/* harmony export */   htmlToText: () => (/* binding */ htmlToText)
/* harmony export */ });
/* unused harmony export assertPublicUrl */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18963);
/* harmony import */ var node_dns_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71553);
/* harmony import */ var node_dns_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_dns_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(777030);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_net__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/* harmony import */ var _offload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(935854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_offload__WEBPACK_IMPORTED_MODULE_4__]);
_offload__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const log = (0,_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('AgentWebFetch');
/**
 * fetch_medical_reference — SSRF-guarded page reader.
 *
 * Ported from the reference agent platforms (deep-agent-platform
 * `assertSafeUrl` / hermes `assertPublicUrl`): blocks non-http(s) schemes,
 * loopback / private / link-local / CGNAT / metadata IPs, re-validates every
 * redirect hop, enforces size + time caps, and strips HTML to readable text
 * so the tool result stays small enough for the model context.
 */ const PRIVATE_HOSTNAMES = new Set([
    'localhost',
    'localhost.localdomain',
    'ip6-localhost',
    'ip6-loopback',
    'metadata.google.internal',
    'instance-data'
]);
function isPrivateIPv4(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p)=>Number.isNaN(p))) return true; // malformed → treat as private
    const [a, b] = parts;
    if (a === 10 || a === 127) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 169 && b === 254) return true; // link-local + cloud metadata
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a === 0) return true;
    return false;
}
function isPrivateIPv6(ip) {
    const normalized = ip.toLowerCase();
    if (normalized === '::' || normalized === '::1') return true;
    if (normalized.startsWith('fe80')) return true; // link-local
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true; // unique local
    if (/^::ffff:/.test(normalized)) return isPrivateIPv4(normalized.replace('::ffff:', ''));
    return false;
}
async function assertPublicUrl(rawUrl) {
    let url;
    try {
        url = new URL(rawUrl);
    } catch  {
        throw new Error(`Invalid URL: ${rawUrl}`);
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error(`Blocked scheme: ${url.protocol} (only http/https are allowed)`);
    }
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (PRIVATE_HOSTNAMES.has(hostname)) throw new Error('Blocked host (private/metadata)');
    if (node_net__WEBPACK_IMPORTED_MODULE_2___default().isIPv4(hostname)) {
        if (isPrivateIPv4(hostname)) throw new Error('Blocked host (private IP range)');
        return url;
    }
    if (hostname.includes(':')) {
        if (isPrivateIPv6(hostname)) throw new Error('Blocked host (private IPv6 range)');
        return url;
    }
    // DNS resolve to defeat hostname-based SSRF (incl. DNS rebinding)
    try {
        const records = await node_dns_promises__WEBPACK_IMPORTED_MODULE_1___default().lookup(hostname, {
            all: true
        });
        for (const record of records){
            if (isPrivateIPv4(record.address) || isPrivateIPv6(record.address)) {
                throw new Error('Blocked host (resolves to private address)');
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('Blocked host')) throw error;
        // DNS failure falls through — the fetch itself will fail with a clear error
        log.warn?.(`DNS lookup failed for ${hostname}`);
    }
    return url;
}
/** Regex-based HTML → text (no external deps), ported pattern from P1/P3.
 * Exported for the knowledge pipeline's URL ingestion (compare-and-integrate-4). */ function htmlToText(html) {
    return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<(?:nav|footer|header|aside|form)[^>]*>[\s\S]*?<\/(?:nav|footer|header|aside|form)>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|section|article|li|h[1-6]|tr)>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
const MAX_CONTENT_CHARS = 12000;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const FETCH_TIMEOUT_MS = 20000;
const MAX_REDIRECTS = 4;
/** SSRF-guarded page fetch → clean text. Exported for knowledge ingestion. */ async function fetchPageText(rawUrl, hops = 0) {
    const url = await assertPublicUrl(rawUrl);
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            redirect: 'manual',
            headers: {
                'User-Agent': 'MedQ-Agent/1.0 (education research)',
                Accept: 'text/html,text/plain,*/*'
            }
        });
        if ([
            301,
            302,
            303,
            307,
            308
        ].includes(response.status)) {
            const location = response.headers.get('location');
            if (!location) throw new Error(`Redirect without location (HTTP ${response.status})`);
            if (hops >= MAX_REDIRECTS) throw new Error('Too many redirects');
            return fetchPageText(new URL(location, url).toString(), hops + 1);
        }
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.byteLength > MAX_BYTES) throw new Error('Page exceeds 2MB size cap');
        const contentType = response.headers.get('content-type') ?? '';
        const text = buffer.toString('utf8');
        if (contentType.includes('text/html') || /^\s*<(!doctype|html)/i.test(text)) {
            const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            return {
                title: titleMatch ? htmlToText(titleMatch[1]).slice(0, 200) : url.hostname,
                url: url.toString(),
                content: htmlToText(text).slice(0, MAX_CONTENT_CHARS)
            };
        }
        return {
            title: url.hostname,
            url: url.toString(),
            content: text.slice(0, MAX_CONTENT_CHARS)
        };
    } finally{
        clearTimeout(timer);
    }
}
function createMedicalFetchTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'fetch_medical_reference',
        description: 'Fetch and read a specific web page (guideline, article, abstract) as clean text. Use after search_medical_references when a snippet is not enough to answer accurately. Only public http(s) pages.',
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({
            url: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().url().describe('The page URL to read'),
            maxChars: zod__WEBPACK_IMPORTED_MODULE_5__/* .number */ .aig().int().min(1000).max(12000).optional().describe('Optional cap on returned characters')
        }),
        func: async ({ url, maxChars })=>{
            // 1. ZAI gateway page_reader (renders JS-heavy pages; P1 pattern)
            try {
                const { createZAI } = await __webpack_require__.e(/* import() */ 6389).then(__webpack_require__.bind(__webpack_require__, 376389));
                const zai = await createZAI();
                if (zai?.functions?.invoke) {
                    const page = await zai.functions.invoke('page_reader', {
                        url
                    });
                    if (page?.data?.html) {
                        // Validate the resolved URL is public before trusting gateway output
                        const finalUrl = page.data.url ?? url;
                        const content = htmlToText(page.data.html).slice(0, maxChars ?? MAX_CONTENT_CHARS);
                        if (content.length > 200) {
                            const payload = JSON.stringify({
                                title: page.data.title ?? finalUrl,
                                url: finalUrl,
                                content,
                                source: 'zai-page-reader'
                            });
                            return ctx ? (0,_offload__WEBPACK_IMPORTED_MODULE_4__/* .maybeOffload */ .y)(ctx, 'fetch_medical_reference', payload) : payload;
                        }
                    }
                }
            } catch (error) {
                log.warn?.('ZAI page_reader failed, falling back to direct fetch:', error);
            }
            // 2. Direct SSRF-guarded fetch
            try {
                const page = await fetchPageText(url);
                const content = maxChars ? page.content.slice(0, maxChars) : page.content;
                const payload = JSON.stringify({
                    title: page.title,
                    url: page.url,
                    content
                });
                return ctx ? (0,_offload__WEBPACK_IMPORTED_MODULE_4__/* .maybeOffload */ .y)(ctx, 'fetch_medical_reference', payload) : payload;
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return JSON.stringify({
                    error: `Could not read page: ${message}`,
                    url
                });
            }
        }
    });
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 902328:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dg: () => (/* binding */ createArtifact),
/* harmony export */   Mj: () => (/* binding */ searchArtifacts),
/* harmony export */   jZ: () => (/* binding */ getArtifact)
/* harmony export */ });
/* unused harmony export listArtifacts */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentArtifacts');
const KIND_MIME = {
    markdown: 'text/markdown',
    html: 'text/html',
    csv: 'text/csv',
    json: 'application/json',
    chart: 'application/json',
    image: 'image/png',
    document: 'text/markdown'
};
const MAX_INLINE_CHARS = 120000;
function sanitizeName(name) {
    const cleaned = name.trim().replace(/[^\p{L}\p{N}\s._-]/gu, '').replace(/\s+/g, '-').slice(0, 80);
    return cleaned || 'artifact';
}
async function createArtifact(input) {
    const name = sanitizeName(input.name);
    const mimeType = KIND_MIME[input.kind] ?? 'text/plain';
    const content = input.content ? input.content.slice(0, MAX_INLINE_CHARS) : undefined;
    const sizeBytes = content ? Buffer.byteLength(content, 'utf8') : 0;
    const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.create({
        data: {
            userId: input.userId,
            name,
            kind: input.kind,
            mimeType,
            sizeBytes,
            content,
            url: input.url,
            // JSON.parse returns `any`, satisfying Prisma's Json input type
            meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined
        }
    });
    const downloadUrl = `/api/medq-agent/artifacts/${row.id}`;
    log.info?.(`Created ${input.kind} artifact "${name}" (${sizeBytes}B) for ${input.userId}`);
    return {
        id: row.id,
        name,
        kind: row.kind,
        mimeType: row.mimeType,
        sizeBytes: row.sizeBytes,
        url: row.url,
        createdAt: row.createdAt.toISOString(),
        downloadUrl
    };
}
async function listArtifacts(userId, limit = 50) {
    const rows = await db.agentArtifact.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        select: {
            id: true,
            name: true,
            kind: true,
            mimeType: true,
            sizeBytes: true,
            url: true,
            createdAt: true
        }
    });
    return rows.map((row)=>({
            ...row,
            createdAt: row.createdAt.toISOString()
        }));
}
/**
 * Search the user's artifact library by free-text query (name/kind match,
 * newest first) with short content excerpts so the agent can cite what it
 * previously produced. (Task 6 — agent-side artifact library access,
 * product-vocabulary port of the reference platform's workspace tools.)
 */ async function searchArtifacts(userId, query, limit = 10) {
    const terms = query.toLowerCase().split(/[\s,]+/).map((t)=>t.trim()).filter((t)=>t.length > 1).slice(0, 6);
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.findMany({
        where: {
            userId,
            ...terms.length > 0 || query.trim() ? {
                OR: [
                    ...terms.length > 0 ? terms.map((t)=>({
                            name: {
                                contains: t,
                                mode: 'insensitive'
                            }
                        })) : [],
                    {
                        kind: {
                            contains: query.trim(),
                            mode: 'insensitive'
                        }
                    }
                ]
            } : {}
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: Math.min(Math.max(limit, 1), 20),
        select: {
            id: true,
            name: true,
            kind: true,
            mimeType: true,
            sizeBytes: true,
            url: true,
            createdAt: true,
            content: true
        }
    });
    return rows.map((row)=>({
            id: row.id,
            name: row.name,
            kind: row.kind,
            mimeType: row.mimeType,
            sizeBytes: row.sizeBytes,
            url: row.url,
            createdAt: row.createdAt.toISOString(),
            downloadUrl: `/api/medq-agent/artifacts/${row.id}`,
            excerpt: row.content ? row.content.replace(/\s+/g, ' ').slice(0, 220) : undefined
        }));
}
async function getArtifact(userId, id) {
    const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.findUnique({
        where: {
            id
        }
    });
    // Guest artifacts (userId null) stay guest-accessible; user artifacts require the owner.
    if (!row) return null;
    if (row.userId && row.userId !== userId) return null;
    return row;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 905939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FN: () => (/* binding */ createPresentationTool),
/* harmony export */   L_: () => (/* binding */ createSpreadsheetTool),
/* harmony export */   yd: () => (/* binding */ createWordDocumentTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(993958);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);




const log = (0,_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('AgentOffice');
function finish(artifact, filename) {
    return JSON.stringify({
        created: true,
        artifact: {
            id: artifact.id,
            name: artifact.name,
            filename,
            downloadUrl: artifact.downloadUrl,
            previewUrl: artifact.url,
            // Task 6: office files get an inline PDF preview via LibreOffice
            pdfPreviewUrl: `/api/medq-agent/artifacts/${artifact.id}/pdf`,
            mimeType: artifact.mimeType,
            kind: artifact.kind
        },
        note: 'File saved. Reference it in your final answer with the download link.'
    });
}
function fail(error) {
    return JSON.stringify({
        created: false,
        error: error instanceof Error ? error.message : String(error)
    });
}
function slugBase(title, filename) {
    const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60);
    return base || 'document';
}
const CALLOUT_STYLES = {
    caution: {
        label: '⚠️ Caution',
        fill: 'FEE2E2',
        color: 'B91C1C'
    },
    pearl: {
        label: '💡 Pearl',
        fill: 'DCFCE7',
        color: '15803D'
    },
    note: {
        label: '📌 Note',
        fill: 'DBEAFE',
        color: '1D4ED8'
    },
    key: {
        label: '🎯 Key Point',
        fill: 'F3E8FF',
        color: '7C3AED'
    },
    warning: {
        label: '⚡ Warning',
        fill: 'FFEDD5',
        color: 'C2410C'
    },
    reference: {
        label: '📚 Reference',
        fill: 'F1F5F9',
        color: '475569'
    }
};
/** Detect a callout line: "> ⚠️ Caution: text" → { kind: 'caution', text }. */ function matchCallout(line) {
    const m = line.match(/^>\s*(⚠️|💡|📌|🎯|⚡|📚)\s*(Caution|Pearl|Note|Key\s*Point|Warning|Reference)\s*[:：]\s*(.*)$/i);
    if (!m) return null;
    const emoji = m[1];
    const kind = emoji === '⚠️' ? 'caution' : emoji === '💡' ? 'pearl' : emoji === '📌' ? 'note' : emoji === '🎯' ? 'key' : emoji === '⚡' ? 'warning' : 'reference';
    return {
        kind,
        text: m[3].trim()
    };
}
function parseMarkdownLines(content) {
    const lines = [];
    for (const raw of content.split('\n')){
        const line = raw.trimEnd();
        if (!line.trim()) continue;
        // Callout: "> ⚠️ Caution: text" — checked BEFORE the heading match so
        // the leading ">" isn't mistaken for anything else.
        const callout = matchCallout(line);
        if (callout) {
            lines.push({
                kind: 'callout',
                callout: callout.kind,
                text: callout.text
            });
            continue;
        }
        // Image: ![caption](url)
        const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
        if (img) {
            lines.push({
                kind: 'image',
                caption: img[1],
                url: img[2]
            });
            continue;
        }
        const h = line.match(/^(#{1,3})\s+(.*)$/);
        if (h) {
            const level = [
                'h1',
                'h2',
                'h3'
            ][h[1].length - 1];
            lines.push({
                kind: level,
                text: h[2]
            });
            continue;
        }
        const bullet = line.match(/^[-*+]\s+(.*)$/);
        if (bullet) {
            lines.push({
                kind: 'bullet',
                text: bullet[1]
            });
            continue;
        }
        const num = line.match(/^(\d+)[.)]\s+(.*)$/);
        if (num) {
            lines.push({
                kind: 'numbered',
                text: num[2]
            });
            continue;
        }
        lines.push({
            kind: 'para',
            text: line
        });
    }
    return lines;
}
/** Parse a paragraph/bullet/numbered text into styled runs (bold / italic).
 *  The markdown `**bold**` and `*italic*` syntax is preserved as actual
 *  run-level formatting instead of being stripped (the old behavior lost
 *  all emphasis and produced flat text). */ function parseInlineRuns(text) {
    // Tokenize on `**bold**` and `*italic*` markers. The regex captures the
    // delimiter so we know which style to apply to the matched segment.
    // Uses [\s\S] instead of the `s` flag (ES2018+) so this compiles under the
    // project's ES2017 target.
    const tokens = [];
    let remaining = text;
    while(remaining.length > 0){
        // **bold** (must come before *italic* so the longer marker wins)
        const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)$/);
        if (boldMatch) {
            if (boldMatch[1]) tokens.push({
                text: boldMatch[1]
            });
            tokens.push({
                text: boldMatch[2],
                bold: true
            });
            remaining = boldMatch[3];
            continue;
        }
        // *italic* (single asterisks — must NOT match the ** already consumed)
        const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/);
        if (italicMatch) {
            if (italicMatch[1]) tokens.push({
                text: italicMatch[1]
            });
            tokens.push({
                text: italicMatch[2],
                italic: true
            });
            remaining = italicMatch[3];
            continue;
        }
        tokens.push({
            text: remaining
        });
        break;
    }
    return tokens;
}
/** Download an image URL to a Buffer for embedding in a .docx. Returns null
 *  on any failure (the doc continues without the image — a broken image
 *  link should never abort the whole document). Supports http(s) URLs and
 *  attachment:// refs (resolved through the registry). */ async function fetchImageBuffer(url) {
    try {
        let resolvedUrl = url;
        if (url.startsWith('attachment://')) {
            const { resolveAttachmentInput } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 544852));
            try {
                resolvedUrl = resolveAttachmentInput(url, 'image');
            } catch  {
                return null;
            }
        }
        if (resolvedUrl.startsWith('data:')) {
            const m = /^data:([^;,]+)(?:;base64)?,([\s\S]*)$/.exec(resolvedUrl);
            if (!m) return null;
            return {
                buffer: Buffer.from(m[2], 'base64'),
                mimeType: m[1]
            };
        }
        if (!/^https?:\/\//i.test(resolvedUrl)) return null;
        const r = await fetch(resolvedUrl, {
            signal: AbortSignal.timeout(8000)
        });
        if (!r.ok) return null;
        const mimeType = (r.headers.get('content-type') || 'image/jpeg').split(';')[0];
        if (!mimeType.startsWith('image/')) return null;
        const buf = Buffer.from(await r.arrayBuffer());
        // Cap at 6 MB to keep the .docx from ballooning on huge atlases.
        if (buf.length > 6 * 1024 * 1024) return null;
        return {
            buffer: buf,
            mimeType
        };
    } catch  {
        return null;
    }
}
// ─── Word (.docx) ─────────────────────────────────────────────────────────
function createWordDocumentTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_word_document',
        description: 'Create a PROFESSIONAL Word document (.docx) from rich markdown content. Supports: ## H1/H2/H3 headings, - bullets, 1. numbered items, paragraphs, **bold** and *italic* inline runs, colored callout boxes (> ⚠️ Caution: / > 💡 Pearl: / > 📌 Note: / > 🎯 Key Point: / > ⚡ Warning: / > 📚 Reference:) for clinical safety highlights and high-yield pearls, and embedded images (![caption](https://url)) from search_medical_images results, generate_medical_illustration outputs, or attachment:// refs. Use for study guides, lecture notes, SOAP note templates, and handouts the user will edit or print — the rich formatting (callouts + images + highlights) makes it suitable for distribution to peers or patients.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(120).describe('Document title shown as the heading'),
            content: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(20).max(100000).describe('Full document content as rich markdown. Supported:\n' + '  ## headings, ### sub-headings\n' + '  - bullet points, 1. numbered items\n' + '  paragraphs (with **bold** and *italic* inline)\n' + '  > ⚠️ Caution: <text> (red box — contraindications, severe ADRs)\n' + '  > 💡 Pearl: <text> (green box — high-yield exam pearl)\n' + '  > 📌 Note: <text> (blue box — general note)\n' + '  > 🎯 Key Point: <text> (purple box — must-remember takeaway)\n' + '  > ⚡ Warning: <text> (orange box — red-flag symptom)\n' + '  > 📚 Reference: <text> (gray box — citation)\n' + '  ![caption](https://image-url) — embedded image with caption\n' + 'Use callouts sparingly (1–3 per page) for emphasis. Use images from search_medical_images or generate_medical_illustration results.'),
            filename: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(80).optional().describe('File base name, default derived from title')
        }),
        func: async ({ title, content, filename })=>{
            try {
                const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, ShadingType, BorderStyle } = await __webpack_require__.e(/* import() */ 3890).then(__webpack_require__.bind(__webpack_require__, 663890));
                const children = [
                    new Paragraph({
                        text: title,
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({
                        text: ''
                    })
                ];
                const lines = parseMarkdownLines(content);
                // Track images we couldn't fetch so we can note them at the end
                // (silent in the doc itself — the user sees the rest of the content
                // without interruption from broken links).
                const brokenImages = [];
                for (const line of lines){
                    switch(line.kind){
                        case 'h1':
                            children.push(new Paragraph({
                                text: line.text,
                                heading: HeadingLevel.HEADING_1
                            }));
                            break;
                        case 'h2':
                            children.push(new Paragraph({
                                text: line.text,
                                heading: HeadingLevel.HEADING_2
                            }));
                            break;
                        case 'h3':
                            children.push(new Paragraph({
                                text: line.text,
                                heading: HeadingLevel.HEADING_3
                            }));
                            break;
                        case 'bullet':
                            children.push(new Paragraph({
                                bullet: {
                                    level: 0
                                },
                                children: parseInlineRuns(line.text).map((r)=>new TextRun({
                                        text: r.text,
                                        bold: r.bold,
                                        italics: r.italic
                                    }))
                            }));
                            break;
                        case 'numbered':
                            children.push(new Paragraph({
                                numbering: undefined,
                                style: 'ListParagraph',
                                children: parseInlineRuns(line.text).map((r)=>new TextRun({
                                        text: r.text,
                                        bold: r.bold,
                                        italics: r.italic
                                    }))
                            }));
                            break;
                        case 'callout':
                            {
                                // Render the callout as a single shaded paragraph with a
                                // colored bold label run + the body text. The shading is the
                                // visual cue (red/green/blue/purple/orange/gray); the colored
                                // label text makes the callout type obvious even when printed
                                // in grayscale.
                                const style = CALLOUT_STYLES[line.callout];
                                children.push(new Paragraph({
                                    shading: {
                                        type: ShadingType.SOLID,
                                        color: 'auto',
                                        fill: style.fill
                                    },
                                    border: {
                                        left: {
                                            style: BorderStyle.SINGLE,
                                            size: 18,
                                            color: style.color,
                                            space: 8
                                        },
                                        top: {
                                            style: BorderStyle.SINGLE,
                                            size: 4,
                                            color: style.color,
                                            space: 4
                                        },
                                        bottom: {
                                            style: BorderStyle.SINGLE,
                                            size: 4,
                                            color: style.color,
                                            space: 4
                                        },
                                        right: {
                                            style: BorderStyle.SINGLE,
                                            size: 4,
                                            color: style.color,
                                            space: 4
                                        }
                                    },
                                    spacing: {
                                        before: 120,
                                        after: 120
                                    },
                                    children: [
                                        new TextRun({
                                            text: `${style.label}: `,
                                            bold: true,
                                            color: style.color,
                                            size: 22
                                        }),
                                        ...parseInlineRuns(line.text).map((r)=>new TextRun({
                                                text: r.text,
                                                bold: r.bold || false,
                                                italics: r.italic,
                                                size: 22
                                            }))
                                    ]
                                }));
                                break;
                            }
                        case 'image':
                            {
                                // Try to fetch + embed the image. On any failure, render the
                                // caption as an italic gray note + record the URL for an
                                // end-of-doc "images that couldn't be loaded" appendix so
                                // the user knows something was supposed to be there.
                                const fetched = await fetchImageBuffer(line.url);
                                if (fetched) {
                                    try {
                                        // Scale: target max width = 600px (Word's default page width
                                        // minus margins leaves ~600 device-independent pixels at 96
                                        // dpi). Height auto-scales to preserve aspect ratio — for
                                        // PNG/JPEG we don't have easy dimension sniffing without a
                                        // separate library, so we use a 4:3 default and let Word
                                        // re-flow if needed.
                                        const targetWidth = 540;
                                        const targetHeight = 405;
                                        children.push(new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            spacing: {
                                                before: 120,
                                                after: 60
                                            },
                                            children: [
                                                new ImageRun({
                                                    data: fetched.buffer,
                                                    transformation: {
                                                        width: targetWidth,
                                                        height: targetHeight
                                                    },
                                                    type: fetched.mimeType.includes('png') ? 'png' : 'jpg'
                                                })
                                            ]
                                        }));
                                        if (line.caption) {
                                            children.push(new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                spacing: {
                                                    after: 200
                                                },
                                                children: [
                                                    new TextRun({
                                                        text: line.caption,
                                                        italics: true,
                                                        size: 18,
                                                        color: '5A6178'
                                                    })
                                                ]
                                            }));
                                        }
                                    } catch (imgErr) {
                                        brokenImages.push(line.url);
                                        children.push(new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            spacing: {
                                                before: 60,
                                                after: 60
                                            },
                                            children: [
                                                new TextRun({
                                                    text: `[Image failed to embed: ${line.caption || line.url}]`,
                                                    italics: true,
                                                    color: 'B91C1C',
                                                    size: 18
                                                })
                                            ]
                                        }));
                                    }
                                } else {
                                    brokenImages.push(line.url);
                                    children.push(new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        spacing: {
                                            before: 60,
                                            after: 60
                                        },
                                        children: [
                                            new TextRun({
                                                text: `[Image could not be loaded: ${line.caption || line.url}]`,
                                                italics: true,
                                                color: 'B91C1C',
                                                size: 18
                                            })
                                        ]
                                    }));
                                }
                                break;
                            }
                        default:
                            children.push(new Paragraph({
                                children: parseInlineRuns(line.text).map((r)=>new TextRun({
                                        text: r.text,
                                        bold: r.bold,
                                        italics: r.italic
                                    }))
                            }));
                    }
                }
                // If any images failed to load, add a footnote-style appendix so
                // the user knows there were images that didn't make it.
                if (brokenImages.length > 0) {
                    children.push(new Paragraph({
                        text: ''
                    }));
                    children.push(new Paragraph({
                        children: [
                            new TextRun({
                                text: `${brokenImages.length} image(s) could not be loaded. URLs:`,
                                italics: true,
                                size: 16,
                                color: '5A6178'
                            })
                        ]
                    }));
                    for (const url of brokenImages.slice(0, 10)){
                        children.push(new Paragraph({
                            children: [
                                new TextRun({
                                    text: `  • ${url}`,
                                    italics: true,
                                    size: 16,
                                    color: '5A6178'
                                })
                            ]
                        }));
                    }
                }
                const doc = new Document({
                    styles: {
                        default: {
                            document: {
                                run: {
                                    font: 'Calibri',
                                    size: 22
                                }
                            }
                        }
                    },
                    sections: [
                        {
                            children
                        }
                    ]
                });
                const buffer = Buffer.from(await Packer.toBuffer(doc));
                const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                    userId: ctx.userId,
                    name: slugBase(title, filename),
                    kind: 'office',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    buffer,
                    meta: {
                        title,
                        format: 'docx'
                    }
                });
                return finish(artifact, `${slugBase(title, filename)}.docx`);
            } catch (error) {
                log.warn?.('create_word_document failed:', error);
                return fail(error);
            }
        }
    });
}
// ─── Excel (.xlsx) ────────────────────────────────────────────────────────
function createSpreadsheetTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_spreadsheet',
        description: 'Create a styled Excel workbook (.xlsx) from JSON row data (e.g. lab reference ranges, drug lists, study schedules). Headers come from the first row\'s keys; alternating row shading and auto-sized columns are applied automatically.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(120).describe('Workbook/sheet title'),
            data: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(10).max(200000).describe('JSON array of row objects, e.g. [{"parameter":"Na+","range":"135-145","unit":"mmol/L"}]'),
            sheetName: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(30).optional().describe('Sheet name, default derived from title'),
            filename: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(80).optional().describe('File base name, default derived from title')
        }),
        func: async ({ title, data, sheetName, filename })=>{
            try {
                let rows;
                try {
                    const parsed = JSON.parse(data);
                    if (!Array.isArray(parsed) || parsed.length === 0 || typeof parsed[0] !== 'object') {
                        throw new Error('data must be a JSON array of objects');
                    }
                    rows = parsed;
                } catch (parseError) {
                    return fail(parseError instanceof Error ? `Invalid data: ${parseError.message}` : parseError);
                }
                const ExcelJS = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 378608, 23));
                const workbook = new ExcelJS.Workbook();
                const sheet = workbook.addWorksheet((sheetName ?? title).slice(0, 30).replace(/[\\/*?:[\]]/g, ' '));
                const headers = [
                    ...new Set(rows.flatMap((row)=>Object.keys(row)))
                ];
                sheet.addRow(headers);
                for (const row of rows)sheet.addRow(headers.map((header)=>row[header] ?? ''));
                // Teal MedQ-style header + zebra stripes + auto column width.
                const headerRow = sheet.getRow(1);
                headerRow.font = {
                    bold: true,
                    color: {
                        argb: 'FFFFFFFF'
                    }
                };
                headerRow.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'FF0E7C66'
                    }
                };
                headerRow.alignment = {
                    vertical: 'middle'
                };
                for(let i = 2; i <= rows.length + 1; i += 1){
                    const row = sheet.getRow(i);
                    if (i % 2 === 0) {
                        row.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: {
                                argb: 'FFEFF8F5'
                            }
                        };
                    }
                }
                headers.forEach((header, index)=>{
                    const column = sheet.getColumn(index + 1);
                    const width = Math.max(header.length, ...rows.map((row)=>String(row[header] ?? '').length));
                    column.width = Math.min(Math.max(width + 3, 10), 42);
                });
                const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
                const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                    userId: ctx.userId,
                    name: slugBase(title, filename),
                    kind: 'office',
                    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    buffer,
                    meta: {
                        title,
                        format: 'xlsx',
                        rows: rows.length
                    }
                });
                return finish(artifact, `${slugBase(title, filename)}.xlsx`);
            } catch (error) {
                log.warn?.('create_spreadsheet failed:', error);
                return fail(error);
            }
        }
    });
}
// ─── PowerPoint (.pptx) ───────────────────────────────────────────────────
function createPresentationTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_presentation',
        description: 'Create a PowerPoint deck (.pptx) from a slides array. Each slide: {title, content, subtitle?, image?, imageCaption?}. Content supports ## heading / - bullet / plain lines. Optional `image` is a URL or /generated/... path embedded on the slide. Use for lecture decks, case presentations, and revision slides.',
        schema: zod__WEBPACK_IMPORTED_MODULE_3__/* .object */ .Ikc({
            title: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(3).max(120).describe('Deck title (shown on the first slide)'),
            slides: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().min(10).max(200000).describe('JSON array of slides: [{"title":"...","content":"## heading\\n- point","subtitle":"...","image":"/generated/x.png or https://...","imageCaption":"..."}]'),
            filename: zod__WEBPACK_IMPORTED_MODULE_3__/* .string */ .YjP().max(80).optional().describe('File base name, default derived from title')
        }),
        func: async ({ title, slides, filename })=>{
            try {
                let parsedSlides;
                try {
                    const parsed = JSON.parse(slides);
                    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('slides must be a non-empty JSON array');
                    parsedSlides = parsed;
                } catch (parseError) {
                    return fail(parseError instanceof Error ? `Invalid slides: ${parseError.message}` : parseError);
                }
                const PptxGenJS = (await Promise.all(/* import() */[__webpack_require__.e(6364), __webpack_require__.e(6522)]).then(__webpack_require__.bind(__webpack_require__, 836522))).default;
                const pptx = new PptxGenJS();
                pptx.layout = 'LAYOUT_16x9';
                pptx.title = title;
                // MedQ dark theme
                const BG = '0D1117';
                const CARD = '161B22';
                const ACCENT = '00E5A0';
                const TEXT = 'E8ECF4';
                const MUTED = '9CA3B8';
                // Fetch image → Buffer (supports http(s) URLs and local /generated paths).
                async function fetchImage(src) {
                    try {
                        if (src.startsWith('data:image/')) {
                            const m = src.match(/^data:image\/(\w+);base64,(.+)$/);
                            if (!m) return null;
                            const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
                            return {
                                data: Buffer.from(m[2], 'base64'),
                                ext
                            };
                        }
                        if (src.startsWith('http://') || src.startsWith('https://')) {
                            const proto = src.startsWith('https') ? await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 55591, 23)) : await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 781630, 23));
                            const buf = await new Promise((resolve, reject)=>{
                                const req = proto.get(src, (res)=>{
                                    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                                        req.destroy();
                                        fetchImage(res.headers.location).then((r)=>resolve(r ? r.data : Buffer.alloc(0))).catch(reject);
                                        return;
                                    }
                                    const chunks = [];
                                    res.on('data', (c)=>chunks.push(c));
                                    res.on('end', ()=>resolve(Buffer.concat(chunks)));
                                    res.on('error', reject);
                                });
                                req.on('error', reject);
                                req.setTimeout(15000, ()=>{
                                    req.destroy();
                                    reject(new Error('image fetch timeout'));
                                });
                            });
                            if (!buf.length) return null;
                            const ext = src.match(/\.(png|jpe?g|gif|svg)(\?|#|$)/i)?.[1].toLowerCase().replace('jpeg', 'jpg');
                            return {
                                data: buf,
                                ext: ext || 'png'
                            };
                        }
                        // Local path under /public
                        const fs = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 973024, 23));
                        const path = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 176760, 23));
                        const cwd = process.cwd();
                        const localPath = src.startsWith('/') ? path.join(cwd, 'public', src) : path.join(cwd, 'public', src);
                        if (!fs.existsSync(localPath)) return null;
                        const data = fs.readFileSync(localPath);
                        const ext = path.extname(localPath).slice(1).toLowerCase().replace('jpeg', 'jpg');
                        return {
                            data,
                            ext: ext || 'png'
                        };
                    } catch  {
                        return null;
                    }
                }
                // Title slide
                const cover = pptx.addSlide();
                cover.background = {
                    color: BG
                };
                cover.addText(title, {
                    x: 0.6,
                    y: 2.2,
                    w: 8.8,
                    h: 1.2,
                    fontSize: 34,
                    bold: true,
                    color: TEXT,
                    align: 'center'
                });
                cover.addText(`MedQ Agent · ${new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}`, {
                    x: 0.6,
                    y: 3.5,
                    w: 8.8,
                    h: 0.5,
                    fontSize: 14,
                    color: MUTED,
                    align: 'center'
                });
                cover.addShape(pptx.ShapeType.rect, {
                    x: 4.4,
                    y: 3.3,
                    w: 1.2,
                    h: 0.045,
                    fill: {
                        color: ACCENT
                    }
                });
                for (const slideSpec of parsedSlides.slice(0, 30)){
                    const slide = pptx.addSlide();
                    slide.background = {
                        color: BG
                    };
                    const slideTitle = slideSpec.title ?? 'Slide';
                    slide.addText(slideTitle, {
                        x: 0.55,
                        y: 0.4,
                        w: 8.9,
                        h: 0.75,
                        fontSize: 22,
                        bold: true,
                        color: ACCENT
                    });
                    if (slideSpec.subtitle) {
                        slide.addText(slideSpec.subtitle, {
                            x: 0.55,
                            y: 1.1,
                            w: 8.9,
                            h: 0.4,
                            fontSize: 13,
                            italic: true,
                            color: MUTED
                        });
                    }
                    const hasImage = typeof slideSpec.image === 'string' && slideSpec.image.trim();
                    const textW = hasImage ? 5.4 : 8.9;
                    const textX = 0.55;
                    const lines = parseMarkdownLines(slideSpec.content ?? '');
                    // Filter to text-bearing line kinds (the parser now also emits
                    // 'callout' and 'image' lines, which PPTX slides don't render as
                    // plain text — they'd need their own slide-type-specific handling.
                    // For now, only the headline/bullet/numbered/para lines appear
                    // on slides; callouts and images are silently dropped, matching
                    // the prior behavior where they didn't exist.)
                    const textBlocks = lines.filter((line)=>line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3' || line.kind === 'bullet' || line.kind === 'numbered' || line.kind === 'para').map((line)=>({
                            text: line.text,
                            options: {
                                bullet: line.kind === 'bullet' || line.kind === 'numbered',
                                indentLevel: line.kind === 'h2' || line.kind === 'h3' ? 0 : 1,
                                bold: line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3',
                                color: line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3' ? TEXT : MUTED,
                                breakLine: true
                            }
                        }));
                    if (textBlocks.length > 0) {
                        slide.addText(textBlocks, {
                            x: textX,
                            y: 1.6,
                            w: textW,
                            h: 3.6,
                            fontSize: 14,
                            color: MUTED,
                            valign: 'top'
                        });
                    }
                    if (hasImage) {
                        const imgResult = await fetchImage(slideSpec.image.trim());
                        if (imgResult) {
                            try {
                                // Image panel on the right; cover ~3.4in wide × 3in tall, aspect-preserved.
                                slide.addImage({
                                    data: `image/${imgResult.ext === 'jpg' ? 'jpeg' : imgResult.ext};base64,${imgResult.data.toString('base64')}`,
                                    x: 6.2,
                                    y: 1.6,
                                    w: 3.2,
                                    h: 3.0,
                                    sizing: {
                                        type: 'contain',
                                        w: 3.2,
                                        h: 3.0
                                    }
                                });
                                if (slideSpec.imageCaption) {
                                    slide.addText(slideSpec.imageCaption, {
                                        x: 6.2,
                                        y: 4.65,
                                        w: 3.2,
                                        h: 0.4,
                                        fontSize: 10,
                                        italic: true,
                                        color: MUTED,
                                        align: 'center'
                                    });
                                }
                            } catch (imgErr) {
                                log.warn?.('pptx image embed failed:', imgErr);
                            }
                        }
                    }
                }
                const buffer = Buffer.from(await pptx.write({
                    outputType: 'nodebuffer'
                }));
                const artifact = await (0,_artifacts_binary__WEBPACK_IMPORTED_MODULE_1__.saveBinaryArtifact)({
                    userId: ctx.userId,
                    name: slugBase(title, filename),
                    kind: 'office',
                    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    buffer,
                    meta: {
                        title,
                        format: 'pptx',
                        slides: parsedSlides.length
                    }
                });
                return finish(artifact, `${slugBase(title, filename)}.pptx`);
            } catch (error) {
                log.warn?.('create_presentation failed:', error);
                return fail(error);
            }
        }
    });
}


/***/ }),

/***/ 935854:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ maybeOffload)
/* harmony export */ });
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(902328);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_0__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * maybeOffload — big-output context protection, ported from hermes
 * `lib/tools/index.ts`. When a tool's textual output exceeds the threshold,
 * the full output is persisted as a downloadable artifact and the value
 * returned to the model is replaced with a preview + pointer. Keeps huge
 * fetches/snapshots from blowing up the conversation context.
 */ const LARGE_OUTPUT_CHARS = 8000;
const RETURN_CHARS = 2500;
async function maybeOffload(ctx, toolName, output) {
    if (!output || output.length <= LARGE_OUTPUT_CHARS) return output;
    try {
        const artifact = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_0__/* .createArtifact */ .Dg)({
            userId: ctx.userId,
            name: `${toolName}-output-${Date.now()}.txt`,
            kind: 'document',
            content: output.slice(0, 120000),
            meta: {
                autoCaptured: true,
                tool: toolName,
                mimeType: 'text/plain'
            }
        });
        return `${output.slice(0, RETURN_CHARS)}\n\n` + `[Full output (${output.length.toLocaleString()} chars) saved as artifact ` + `"${artifact.name}" — download: ${artifact.downloadUrl}. ` + `Ask the user to open it from the Files tab for the complete content.]`;
    } catch  {
        // Offload failed — return a hard-truncated version instead of the giant blob.
        return `${output.slice(0, RETURN_CHARS)}\n\n[Output truncated at ${RETURN_CHARS} chars.]`;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 937817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ cacheRemoteImages)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79748);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_ai_resilience__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(204399);
/**
 * Local image cache for search_medical_images results.
 *
 * Why: image-search results are hotlinked from external sites (Anatomy.app,
 * Dreamstime, Quizlet, Getty…). Those URLs rot — sites move pages, CDNs expire
 * tokens, hotlink protection kicks in — and every broken URL means a blank
 * image in a student's chat. This module downloads the TOP results to
 * public/generated/imgcache and serves them locally, keyed by a hash of the
 * original URL (dedup across queries).
 *
 * Behavior:
 *   • Best-effort and never throws: an image that fails to download keeps
 *     cachedUrl = null and the caller falls back to the original URL.
 *   • Content-type must be image/*; responses over MAX_BYTES are rejected.
 *   • LRU eviction: when the cache exceeds MAX_FILES, the oldest files by
 *     mtime are deleted (mtime is touched on cache hits).
 */ 



const CACHE_DIR = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'generated', 'imgcache');
const PUBLIC_PREFIX = '/generated/imgcache';
const MAX_FILES = 300;
const MAX_BYTES = 8 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 8000;
/** Extensions we accept, in preference order for the content-type sniff. */ const CONTENT_TYPE_EXT = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg'
};
function hashUrl(url) {
    return (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('sha1').update(url).digest('hex').slice(0, 16);
}
/** All extensions we may have written for this hash (hit check). */ function candidateExtensions() {
    return [
        ...new Set(Object.values(CONTENT_TYPE_EXT))
    ];
}
async function findExisting(hash) {
    const { access } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 79748, 23));
    for (const ext of candidateExtensions()){
        const file = path__WEBPACK_IMPORTED_MODULE_2___default().join(CACHE_DIR, `${hash}.${ext}`);
        try {
            await access(file);
            // Touch mtime so LRU eviction sees this as recently used.
            const now = new Date();
            await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.utimes)(file, now, now).catch(()=>undefined);
            return `${PUBLIC_PREFIX}/${hash}.${ext}`;
        } catch  {
        // Not cached with this extension — keep looking.
        }
    }
    return null;
}
async function evictIfNeeded() {
    try {
        const names = (await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.readdir)(CACHE_DIR)).filter((name)=>!name.startsWith('.'));
        if (names.length <= MAX_FILES) return;
        const entries = await Promise.all(names.map(async (name)=>{
            try {
                const info = await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.stat)(path__WEBPACK_IMPORTED_MODULE_2___default().join(CACHE_DIR, name));
                return {
                    name,
                    mtime: info.mtimeMs
                };
            } catch  {
                return {
                    name,
                    mtime: Number.MAX_SAFE_INTEGER
                };
            }
        }));
        entries.sort((a, b)=>a.mtime - b.mtime);
        const excess = entries.length - MAX_FILES;
        await Promise.all(entries.slice(0, excess).map((entry)=>(0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.unlink)(path__WEBPACK_IMPORTED_MODULE_2___default().join(CACHE_DIR, entry.name)).catch(()=>undefined)));
    } catch  {
    // Eviction is best-effort housekeeping.
    }
}
async function cacheOne(imageUrl) {
    if (!/^https?:\/\//i.test(imageUrl)) return null;
    const hash = hashUrl(imageUrl);
    const existing = await findExisting(hash);
    if (existing) return existing;
    try {
        // The download itself goes through the gateway slot so a burst of image
        // searches doesn't saturate sockets; retry is unnecessary here (a dead
        // URL stays dead), so plain slot + single attempt.
        const buffer = await (0,_lib_ai_resilience__WEBPACK_IMPORTED_MODULE_3__/* .withGatewaySlot */ .F2)(async ()=>{
            const response = await fetch(imageUrl, {
                signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MedQAgent/1.0; +education)'
                },
                redirect: 'follow'
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
            const ext = CONTENT_TYPE_EXT[contentType];
            if (!ext) throw new Error(`Unsupported content-type: ${contentType || 'unknown'}`);
            const declaredLength = parseInt(response.headers.get('content-length') ?? '', 10);
            if (!Number.isNaN(declaredLength) && declaredLength > MAX_BYTES) throw new Error('Image too large');
            const bytes = Buffer.from(await response.arrayBuffer());
            if (bytes.length === 0 || bytes.length > MAX_BYTES) throw new Error('Image too large or empty');
            await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.mkdir)(CACHE_DIR, {
                recursive: true
            });
            await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile)(path__WEBPACK_IMPORTED_MODULE_2___default().join(CACHE_DIR, `${hash}.${ext}`), bytes);
            return `${PUBLIC_PREFIX}/${hash}.${ext}`;
        });
        return buffer;
    } catch  {
        return null;
    }
}
/**
 * Cache the top `maxN` images locally. Never throws; per-image failures
 * return cachedUrl: null (the caller embeds the original URL as fallback).
 */ async function cacheRemoteImages(items, maxN = 4) {
    const top = items.filter((item)=>typeof item?.imageUrl === 'string' && item.imageUrl).slice(0, maxN);
    const results = await Promise.all(top.map(async (item)=>({
            imageUrl: item.imageUrl,
            cachedUrl: await cacheOne(item.imageUrl),
            caption: item.caption,
            source: item.source
        })));
    void evictIfNeeded();
    return results;
}


/***/ }),

/***/ 942468:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ createArtifactTool)
/* harmony export */ });
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(902328);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_1__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * create_artifact — register a durable deliverable for the user.
 * (Port of the reference platforms' artifact tools.)
 *
 * The tool result includes a download URL that the chat UI renders as a
 * clickable artifact link, so users can keep what the agent produced.
 */ function createArtifactTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'create_artifact',
        description: 'Save a deliverable the user should keep (study guide, cheat sheet, summary, data table, comparison chart data, dataset) as a durable artifact. The user gets a preview and a download link in chat. For full documents use generate_document instead; use this for raw content blocks (csv/json/chart data) or markdown notes.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            name: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(3).max(80).describe('Short artifact name, e.g. "ECG-rates-cheat-sheet"'),
            kind: zod__WEBPACK_IMPORTED_MODULE_2__/* ["enum"] */ .k5n([
                'markdown',
                'html',
                'csv',
                'json',
                'chart',
                'document'
            ]).describe('Content kind'),
            content: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(1).max(120000).describe('The full artifact content (markdown/html/csv/json)'),
            title: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(120).optional().describe('Human-friendly display title')
        }),
        func: async ({ name, kind, content, title })=>{
            try {
                const artifact = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_1__/* .createArtifact */ .Dg)({
                    userId: ctx.userId,
                    name,
                    kind: kind,
                    content,
                    meta: title ? {
                        title
                    } : undefined
                });
                return JSON.stringify({
                    created: true,
                    artifact: {
                        id: artifact.id,
                        name: artifact.name,
                        kind: artifact.kind,
                        sizeBytes: artifact.sizeBytes,
                        downloadUrl: artifact.downloadUrl
                    },
                    note: 'Artifact saved. Mention it in your final answer with the download link.'
                });
            } catch (error) {
                return JSON.stringify({
                    created: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 957107:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ ensureMedQHarnessProfile)
/* harmony export */ });
/* harmony import */ var deepagents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(458713);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([deepagents__WEBPACK_IMPORTED_MODULE_0__]);
deepagents__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * MedQ harness profile (deepagents HarnessProfile parity).
 *
 * The deepagents package resolves per-model "harness profiles" — model-spec
 * keyed calibration for prompt assembly and tool visibility. MedQ resolves
 * providers through its own config chain (resolveMedQAgentConfig), so the
 * profile here is registered under the spec strings MedQ commonly runs and
 * carries MedQ-specific prompt calibration. Orthogonal to model selection:
 * it shapes the harness, not the model.
 */ 
const MEDQ_PROFILE_SUFFIX = 'You are operating inside MedQ, a medical education platform. Prefer precise, ' + 'clinically accurate language; flag uncertainty explicitly; and remind learners to ' + 'verify against current clinical guidance when it matters.';
let registered = false;
/** Idempotent registration — safe to call on every runtime assembly. */ function ensureMedQHarnessProfile(defaultModelSpec) {
    if (registered) return;
    registered = true;
    try {
        (0,deepagents__WEBPACK_IMPORTED_MODULE_0__/* .registerHarnessProfile */ .Lb)('medq', {
            systemPromptSuffix: MEDQ_PROFILE_SUFFIX
        });
        // Also key the profile on the resolved default model string when it looks
        // like a provider spec (e.g. "glm-4.6", "gpt-4o-mini") so deployments
        // where createDeepAgent receives a string model pick it up.
        if (defaultModelSpec && /^[a-z0-9][a-z0-9._-]*$/i.test(defaultModelSpec)) {
            (0,deepagents__WEBPACK_IMPORTED_MODULE_0__/* .registerHarnessProfile */ .Lb)(defaultModelSpec, {
                systemPromptSuffix: MEDQ_PROFILE_SUFFIX
            });
        }
    } catch  {
    // Profile registry is best-effort calibration — never break agent startup.
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 972379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ createGitTools)
/* harmony export */ });
/* unused harmony export GIT_TOOL_NAMES */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18963);
/* harmony import */ var _sandbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(503496);



function runGit(ctx, argv, timeoutMs = 30000) {
    const home = (0,_sandbox__WEBPACK_IMPORTED_MODULE_1__/* .sandboxRoot */ .i2)(ctx.userId);
    return (0,_sandbox__WEBPACK_IMPORTED_MODULE_1__/* .execSandboxed */ .y5)({
        userId: ctx.userId,
        argv: [
            'git',
            ...argv
        ],
        env: (0,_sandbox__WEBPACK_IMPORTED_MODULE_1__/* .gitEnv */ .gE)(home),
        timeoutMs
    });
}
const gitSpecs = [
    {
        name: 'git_status',
        description: 'Show the working-tree status of the user workspace (branch + changed files).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({}),
        build: ()=>({
                argv: [
                    'status',
                    '--porcelain=v1',
                    '-b'
                ]
            })
    },
    {
        name: 'git_diff',
        description: 'Show diff statistics of uncommitted changes against HEAD.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            path: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(300).optional().describe('Limit the diff to this path')
        }),
        build: (args)=>({
                argv: [
                    'diff',
                    '--stat',
                    'HEAD',
                    ...typeof args.path === 'string' && args.path ? [
                        '--',
                        args.path
                    ] : []
                ]
            })
    },
    {
        name: 'git_log',
        description: 'List recent commits (oneline).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            limit: zod__WEBPACK_IMPORTED_MODULE_2__/* .number */ .aig().int().min(1).max(50).optional().describe('Max commits (default 10)')
        }),
        build: (args)=>({
                argv: [
                    'log',
                    '--oneline',
                    '-n',
                    String(Math.min(Number(args.limit) || 10, 50))
                ]
            })
    },
    {
        name: 'git_branch',
        description: 'List local branches.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({}),
        build: ()=>({
                argv: [
                    'branch',
                    '--list'
                ]
            })
    },
    {
        name: 'git_checkout',
        description: 'Switch to an existing branch.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            branch: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(1).max(200)
        }),
        build: (args)=>({
                argv: [
                    'checkout',
                    String(args.branch)
                ]
            })
    },
    {
        name: 'git_commit',
        description: 'Stage all changes and create a commit with the given message.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            message: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().min(3).max(500)
        }),
        build: (args)=>({
                argv: [
                    'add',
                    '-A'
                ]
            })
    },
    {
        name: 'git_pull',
        description: 'Pull from the tracked remote (fast-forward only).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            remote: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(200).optional().describe('Remote name (default origin)')
        }),
        build: (args)=>({
                argv: [
                    'pull',
                    '--ff-only',
                    typeof args.remote === 'string' && args.remote ? args.remote : 'origin'
                ]
            })
    },
    {
        name: 'git_push',
        description: 'Push a branch to its remote (user approval required).',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({
            remote: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(200).optional().describe('Remote name (default origin)'),
            branch: zod__WEBPACK_IMPORTED_MODULE_2__/* .string */ .YjP().max(200).optional().describe('Branch to push (default current)')
        }),
        build: (args)=>({
                argv: [
                    'push',
                    typeof args.remote === 'string' && args.remote ? args.remote : 'origin',
                    ...typeof args.branch === 'string' && args.branch ? [
                        args.branch
                    ] : []
                ],
                timeoutMs: 120000
            })
    },
    {
        name: 'git_init',
        description: 'Initialize a git repository in the user workspace.',
        schema: zod__WEBPACK_IMPORTED_MODULE_2__/* .object */ .Ikc({}),
        build: ()=>({
                argv: [
                    'init'
                ]
            })
    }
];
function createGitTools(ctx) {
    const tools = [];
    for (const spec of gitSpecs){
        tools.push(new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
            name: spec.name,
            description: spec.description,
            schema: spec.schema,
            func: async (args)=>{
                try {
                    const { argv, timeoutMs } = spec.build(args ?? {});
                    // git_commit is a two-step op: add -A then commit
                    if (spec.name === 'git_commit') {
                        const addResult = await runGit(ctx, argv, timeoutMs);
                        if (addResult.exitCode !== 0) {
                            return JSON.stringify({
                                ok: false,
                                step: 'git add',
                                stderr: addResult.stderr.slice(0, 2000)
                            });
                        }
                        const commitResult = await runGit(ctx, [
                            'commit',
                            '-m',
                            String(args.message ?? 'update')
                        ], timeoutMs);
                        return JSON.stringify({
                            ok: commitResult.exitCode === 0,
                            exitCode: commitResult.exitCode,
                            stdout: commitResult.stdout.slice(0, 4000),
                            stderr: commitResult.stderr.slice(0, 2000)
                        });
                    }
                    const result = await runGit(ctx, argv, timeoutMs);
                    return JSON.stringify({
                        ok: result.exitCode === 0,
                        exitCode: result.exitCode,
                        stdout: result.stdout.slice(0, 12000),
                        stderr: result.stderr.slice(0, 4000),
                        durationMs: result.durationMs
                    });
                } catch (error) {
                    return JSON.stringify({
                        ok: false,
                        error: error instanceof Error ? error.message : String(error)
                    });
                }
            }
        }));
    }
    return tools;
}
const GIT_TOOL_NAMES = gitSpecs.map((s)=>s.name);


/***/ }),

/***/ 993958:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   saveBinaryArtifact: () => (/* binding */ saveBinaryArtifact)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(977598);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(973024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(176760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Binary artifact persistence (PDFs and other non-text outputs).
 *
 * Files are written to public/generated/ (served as static assets) and the
 * DB row stores the public URL — same strategy the illustration tool uses
 * for generated images, keeping chat payloads small and previewable.
 */ async function saveBinaryArtifact(input) {
    const dir = node_path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'generated');
    node_fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(dir, {
        recursive: true
    });
    const extension = extensionFor(input.mimeType);
    const fileName = `artifact-${(0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID)().slice(0, 12)}${extension}`;
    node_fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(node_path__WEBPACK_IMPORTED_MODULE_2___default().join(dir, fileName), input.buffer);
    const url = `/generated/${fileName}`;
    const row = await createArtifactRecord({
        userId: input.userId,
        name: input.name,
        kind: input.kind,
        mimeType: input.mimeType,
        url,
        sizeBytes: input.buffer.byteLength,
        meta: input.meta
    });
    return {
        ...row,
        url,
        mimeType: input.mimeType,
        kind: input.kind,
        sizeBytes: input.buffer.byteLength
    };
}
function extensionFor(mimeType) {
    if (mimeType.includes('pdf')) return '.pdf';
    if (mimeType.includes('png')) return '.png';
    if (mimeType.includes('jpeg')) return '.jpg';
    if (mimeType.includes('svg')) return '.svg';
    if (mimeType.includes('wordprocessingml')) return '.docx';
    if (mimeType.includes('spreadsheetml')) return '.xlsx';
    if (mimeType.includes('presentationml')) return '.pptx';
    if (mimeType.includes('mpeg') && mimeType.startsWith('audio')) return '.mp3';
    if (mimeType.includes('wav')) return '.wav';
    if (mimeType.includes('mp4')) return '.mp4';
    if (mimeType.includes('webm')) return '.webm';
    return '.bin';
}
async function createArtifactRecord(input) {
    const { db } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 520903));
    const sanitized = input.name.replace(/[^\p{L}\p{N}._-]/gu, '-').slice(0, 80) || 'artifact';
    const row = await db.agentArtifact.create({
        data: {
            userId: input.userId,
            name: sanitized,
            kind: input.kind,
            mimeType: input.mimeType,
            sizeBytes: input.sizeBytes,
            url: input.url,
            // JSON.parse returns `any`, satisfying Prisma's Json input type
            meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined
        }
    });
    return {
        id: row.id,
        name: sanitized,
        downloadUrl: `/api/medq-agent/artifacts/${row.id}`
    };
}


/***/ })

};
;