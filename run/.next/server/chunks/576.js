"use strict";
exports.id = 576;
exports.ids = [576];
exports.modules = {

/***/ 89137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ShareQuestionDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(889327);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(916664);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(704107);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(135195);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(199646);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ShareQuestionDialog — lets the user share a question card into a chat room,
 * a study group, or the public feed. The shared card keeps its media intact
 * (ECG strip / image / audio / 3D model) — see /api/questions/share.
 */ 


function ShareQuestionDialog({ questionId, open, onClose }) {
    const [targets, setTargets] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // Starts true — flips false once the first load settles (avoids setState-in-effect)
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [sharing, setSharing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [shared, setShared] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open || targets.length > 0) return;
        let cancelled = false;
        (async ()=>{
            try {
                const [chatRes, groupRes] = await Promise.all([
                    fetch('/api/chat/rooms').catch(()=>null),
                    fetch('/api/groups/my').catch(()=>null)
                ]);
                const chatData = chatRes?.ok ? await chatRes.json() : {
                    rooms: []
                };
                const groupData = groupRes?.ok ? await groupRes.json() : {
                    groups: []
                };
                const chatTargets = (chatData.rooms || []).slice(0, 30).map((r)=>({
                        id: r.id,
                        name: r.name || 'Chat',
                        kind: 'chat',
                        avatar: typeof r.avatar === 'string' && r.avatar.length <= 3 ? r.avatar : r.type === 'direct' ? '💬' : '👥'
                    }));
                const groupTargets = (groupData.groups || []).slice(0, 30).map((g)=>({
                        id: g.id,
                        name: g.name || 'Group',
                        kind: 'group',
                        avatar: g.avatar || '🎓',
                        memberHint: g.previewMembers?.length ? `${g.previewMembers.length}+ members` : undefined
                    }));
                if (!cancelled) setTargets([
                    ...chatTargets,
                    ...groupTargets
                ]);
            } catch  {
            // leave the empty-targets fallback UI
            } finally{
                if (!cancelled) setLoading(false);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        open,
        targets.length
    ]);
    const share = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (target, targetId)=>{
        setSharing(targetId || 'feed');
        try {
            const res = await fetch('/api/questions/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId,
                    target,
                    targetId
                })
            });
            const data = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(data.error || 'Share failed');
                return;
            }
            setShared((prev)=>({
                    ...prev,
                    [targetId || 'feed']: true
                }));
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(target === 'chat' ? 'Question card sent to chat — media intact' : target === 'group' ? 'Question card posted to the group' : 'Question card shared to your feed');
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Share failed — check your connection');
        } finally{
            setSharing(null);
        }
    }, [
        questionId
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-md w-full rounded-2xl border border-white/[0.08] bg-[#151821] overflow-hidden max-h-[80vh] flex flex-col",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-4 border-b border-white/[0.06] flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-9 h-9 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                className: "w-4.5 h-4.5 w-[18px] h-[18px] text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-sm font-bold text-[#e8ecf4]",
                                    children: "Share this question"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[10px] text-[#5a6478]",
                                    children: "the card keeps its ECG, audio, images and 3D model"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "text-[#5a6478] hover:text-[#e8ecf4]",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex-1 overflow-y-auto p-4",
                    children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-center py-10 gap-2 text-[#5a6478] text-xs",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-4 h-4 animate-spin"
                            }),
                            " loading your chats and groups…"
                        ]
                    }) : targets.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478] mb-4",
                                children: "No chats or groups yet — share to your public feed instead:"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>share('feed'),
                                disabled: sharing === 'feed',
                                className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#4fc3f7]/10 text-[#7cc7ff] border border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/20",
                                children: [
                                    sharing === 'feed' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    "Share to feed"
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1",
                        children: [
                            targets.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>share(t.kind, t.id),
                                    disabled: sharing === t.id || Boolean(shared[`${t.kind}-${t.id}`]) || shared[t.id],
                                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00e5a0]/30 hover:bg-white/[0.04] transition-all text-left disabled:opacity-60",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-base flex-shrink-0",
                                            children: t.avatar || (t.kind === 'chat' ? '💬' : '🎓')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center gap-1.5 text-xs font-semibold text-[#e8ecf4] truncate",
                                                    children: [
                                                        t.kind === 'chat' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 text-[#4fc3f7] flex-shrink-0"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 text-[#00e5a0] flex-shrink-0"
                                                        }),
                                                        t.name
                                                    ]
                                                }),
                                                t.memberHint && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "block text-[10px] text-[#5a6478]",
                                                    children: t.memberHint
                                                })
                                            ]
                                        }),
                                        sharing === t.id ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-4 h-4 animate-spin text-[#00e5a0]"
                                        }) : shared[t.id] ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0]"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#3a4055]"
                                        })
                                    ]
                                }, `${t.kind}-${t.id}`)),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "pt-2 border-t border-white/[0.05] mt-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>share('feed'),
                                    disabled: sharing === 'feed',
                                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#4fc3f7]/[0.06] border border-[#4fc3f7]/20 hover:bg-[#4fc3f7]/[0.12] transition-all text-left disabled:opacity-60",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-9 h-9 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/20 flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#7cc7ff]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "block text-xs font-semibold text-[#e8ecf4]",
                                                    children: "Public feed"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "block text-[10px] text-[#5a6478]",
                                                    children: "everyone can try the question"
                                                })
                                            ]
                                        }),
                                        sharing === 'feed' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-4 h-4 animate-spin text-[#7cc7ff]"
                                        }) : shared['feed'] ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Globe_Loader2_MessageCircle_Share2_Users_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#7cc7ff]"
                                        }) : null
                                    ]
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 216252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SourceViewerModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(849543);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35471);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(789216);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(588934);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8251);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(541687);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(59742);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(432474);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(654183);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(220878);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(632511);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(148924);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(894773);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(48668);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(790069);
/* harmony import */ var _PdfCanvasViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(558652);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * SourceViewerModal — "open" a Knowledge Library file.
 *
 * Three views:
 *   1. ORIGINAL FILE — the retained original bytes, rendered in an app-styled
 *      native viewer: PDFs in the CUSTOM pdf.js reader (PdfCanvasViewer —
 *      dark toolbar, zoom / fit / page navigation, lazy pages), images with
 *      width-based zoom + true fit, audio / video in styled players. Any file
 *      can be downloaded. This is the "open my PDF like in Adobe" view —
 *      now matching the app's design language instead of the browser's
 *      light-gray fallback viewer.
 *      CITATIONS land here first: the PDF viewer scans its text layer, jumps
 *      to the page holding the quote and overlays highlight boxes; audio /
 *      video players seek to the cited [mm:ss] moment.
 *   2. EXTRACTED CONTENT — what the system actually extracted (document text,
 *      ASR transcript, OCR output). Supports HIGHLIGHT navigation: the quoted
 *      passage is <mark>-ed, scrolled into view and pulsed — one click away
 *      from the original (contextual banner links swap both ways).
 *   3. INDEXED PASSAGES — the chunks with their contextual summaries; the
 *      cited chunk is highlighted + scrolled to.
 *
 * Fetches GET /api/knowledge/sources/[id] in TWO stages so citations open
 * fast (no waiting on the full payload):
 *   Stage 1 (light — single row + 5 sample chunks): source meta, hasOriginal,
 *     originalMime → the ORIGINAL FILE viewer mounts immediately. The cited
 *     quote already ships in the citation object, so the PDF scan starts
 *     without any further fetching.
 *   Stage 2 (background — ?full=1&chunks=all): the complete stored content +
 *     every indexed passage → enables the Extracted content / Indexed
 *     passages tabs when it arrives.
 * The original file itself streams from GET /api/knowledge/sources/[id]/file
 * (owner-gated, Range-capable).
 */ 


function formatBytes(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function formatDuration(sec) {
    if (!sec) return '';
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
function SourceViewerModal({ sourceId, onClose, kindBadge, highlight, initialTab, citations, citationIndex, onNavigate, citationLink }) {
    const [detail, setDetail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // null = "auto": derive the landing tab from what's available once the
    // detail loads (explicit initialTab > cited passage > original > content).
    // Deriving during render avoids the setState-in-effect cascade.
    const [tabChoice, setTabChoice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialTab ?? null);
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /** Deep-link copy feedback (separate from the content copy button). */ const [linkCopied, setLinkCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const copyCitationLink = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!citationLink) return;
        try {
            await navigator.clipboard.writeText(citationLink);
        } catch  {
            const ta = document.createElement('textarea');
            ta.value = citationLink;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
            } catch  {}
            ta.remove();
        }
        setLinkCopied(true);
        setTimeout(()=>setLinkCopied(false), 1800);
    }, [
        citationLink
    ]);
    const [pdfPages, setPdfPages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const markRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const chunkRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /** Media players — seeked to the cited [mm:ss] moment when landing on the
   *  original tab (audio/video transcripts carry timestamps). */ const audioPlayerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const videoPlayerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /** PDF citation scan: locating / found on page N / not in the text layer. */ const [pdfScan, setPdfScan] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [pdfFoundPage, setPdfFoundPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /** HIGHLIGHT SCOPE: 'answer' (default — the narrow answer-anchored quote;
  *  the whole-chunk highlight was too much to read) or 'chunk' (the full
   *  indexed passage, one click away). */ const [hlScope, setHlScope] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('answer');
    const handlePdfHighlight = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((page)=>{
        setPdfFoundPage(page);
        setPdfScan(page == null ? 'missing' : 'found');
    }, []);
    // Citation change (stepper / chip click on an already-open modal): reset
    // the highlight scope back to the narrow default — each citation starts
    // at the answer passage, not whatever the previous one was widened to.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setHlScope('answer');
    }, [
        sourceId,
        highlight?.chunkId,
        highlight?.quote
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let alive = true;
        (async ()=>{
            try {
                // STAGE 1 — light detail (no full content, no all-chunks): enough to
                // mount the original-file viewer + header right away. A 500-chunk
                // source's heavy payload no longer gates the citation experience.
                const res = await fetch(`/api/knowledge/sources/${sourceId}`);
                const json = await res.json();
                if (!alive) return;
                if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
                setDetail(json);
                // STAGE 2 — full content + all passages in the background; only the
                // content/passages tabs need it. Failure here is non-fatal (the
                // original-file experience is already live).
                try {
                    const full = await fetch(`/api/knowledge/sources/${sourceId}?full=1&chunks=all`);
                    const fullJson = await full.json();
                    if (!alive || !full.ok) return;
                    setDetail((prev)=>prev ? {
                            ...prev,
                            ...fullJson
                        } : fullJson);
                } catch  {}
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : 'Failed to load file');
            }
        })();
        return ()=>{
            alive = false;
        };
    }, [
        sourceId
    ]);
    // Escape closes; ← → step between citations when the stepper is active
    // (navigating WITHOUT closing the modal — no more close-reopen cycling).
    const canStep = Boolean(citations && citations.length > 1 && citationIndex != null && onNavigate);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onKey = (e)=>{
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (!citations || citationIndex == null || !onNavigate) return;
            if (e.key === 'ArrowLeft' && citationIndex > 0) onNavigate(citationIndex - 1);
            else if (e.key === 'ArrowRight' && citationIndex < citations.length - 1) onNavigate(citationIndex + 1);
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    }, [
        onClose,
        citations,
        citationIndex,
        onNavigate
    ]);
    const s = detail?.source;
    const chunkList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>detail?.chunks ?? [], [
        detail
    ]);
    const passagesCount = detail?.chunkTotal ?? s?.meta?.chunks ?? chunkList.length;
    const hasOriginal = Boolean(s?.hasOriginal);
    const originalMime = s?.originalMime ?? s?.meta?.originalMime ?? '';
    const fileUrl = `/api/knowledge/sources/${sourceId}/file`;
    const isPdf = originalMime === 'application/pdf';
    const isImage = originalMime.startsWith('image/');
    const isAudio = originalMime.startsWith('audio/');
    const isVideo = originalMime.startsWith('video/');
    // Effective tab: explicit user choice, else auto-derived. Citations land
    // on the ORIGINAL FILE when its bytes are retained (Adobe-like view with the
    // passage located + highlighted / media seeked to the cited moment); only
    // sources without a retained original fall back to the extracted content.
    const hasHighlight = Boolean(highlight?.chunkId || highlight?.quote);
    const tab = tabChoice && (tabChoice !== 'original' || hasOriginal) ? tabChoice : hasHighlight ? hasOriginal ? 'original' : 'content' : hasOriginal ? 'original' : 'content';
    // Resolve the FULL CHUNK text: inline chunkContent (verification-pipeline
    // citations carry it) → cited chunk from the passages list → nothing.
    const chunkContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (highlight?.chunkContent) return highlight.chunkContent;
        if (highlight?.chunkId) {
            const chunk = chunkList.find((c)=>c.id === highlight.chunkId);
            if (chunk) return chunk.content;
        }
        return '';
    }, [
        highlight,
        chunkList
    ]);
    // Effective quote is SCOPE-AWARE: 'answer' → the answer-anchored quote
    // (legacy quote-less citations fall back to the full passage); 'chunk' →
    // the whole indexed passage. Every highlight consumer (PDF scan, <mark>,
    // scroll-into-view, cited media moment) follows the scope.
    const effectiveQuote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (hlScope === 'chunk') return chunkContent;
        return highlight?.quote || chunkContent;
    }, [
        hlScope,
        highlight,
        chunkContent
    ]);
    // The scope toggle only makes sense when BOTH scopes exist AND differ —
    // a legacy full-passage citation has nothing to widen.
    const scopeToggleAvailable = Boolean(highlight?.quote && chunkContent && highlight.quote.trim() !== chunkContent.trim());
    // Reset the PDF scan whenever the EFFECTIVE quote changes (citation
    // navigation OR answer↔chunk scope toggle) so the banner never shows a
    // stale page while PdfCanvasViewer rescans the new passage.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPdfScan(null);
        setPdfFoundPage(null);
    }, [
        effectiveQuote
    ]);
    // The cited moment for audio / video sources: transcript chunks carry
    // [mm:ss] timestamps from ingestion — seek the player there so "scroll to
    // the citation" means "jump to the exact moment".
    const citedTimestamp = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!effectiveQuote) return null;
        const m = effectiveQuote.match(/\[(\d{1,3}):(\d{2})\]/);
        if (!m) return null;
        const sec = Number(m[1]) * 60 + Number(m[2]);
        return Number.isFinite(sec) && sec >= 0 ? sec : null;
    }, [
        effectiveQuote
    ]);
    // Seek the original audio / video player to the cited moment (once the
    // metadata is loaded — currentTime before metadata is unreliable).
    const seekedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tab !== 'original' || citedTimestamp == null) return;
        const apply = (el)=>{
            if (!el) return;
            const set = ()=>{
                if (seekedRef.current) return;
                seekedRef.current = true;
                try {
                    el.currentTime = Math.max(0, citedTimestamp);
                } catch  {}
            };
            if (el.readyState >= 1) set();
            else el.addEventListener('loadedmetadata', set, {
                once: true
            });
        };
        apply(audioPlayerRef.current);
        apply(videoPlayerRef.current);
    }, [
        tab,
        citedTimestamp,
        detail
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        seekedRef.current = false;
    }, [
        sourceId,
        highlight?.chunkId
    ]);
    // Scroll the highlighted passage into view once the content tab renders it.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!detail || !effectiveQuote) return;
        if (tab === 'content') {
            const t = setTimeout(()=>markRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                }), 120);
            return ()=>clearTimeout(t);
        }
        if (tab === 'passages' && highlight?.chunkId) {
            const t = setTimeout(()=>chunkRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                }), 120);
            return ()=>clearTimeout(t);
        }
    }, [
        detail,
        tab,
        effectiveQuote,
        highlight
    ]);
    const copyContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!detail?.content) return;
        try {
            await navigator.clipboard.writeText(detail.content);
            setCopied(true);
            setTimeout(()=>setCopied(false), 1500);
        } catch  {}
    }, [
        detail
    ]);
    /** Content split around the first occurrence of the quote (for <mark>). */ const contentParts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!detail?.content || !effectiveQuote) return null;
        const idx = detail.content.indexOf(effectiveQuote.slice(0, 160));
        if (idx !== -1) {
            return {
                before: detail.content.slice(0, idx),
                mark: detail.content.slice(idx, idx + effectiveQuote.length),
                after: detail.content.slice(idx + effectiveQuote.length)
            };
        }
        // Whitespace-tolerant fallback: quotes saved before the sentence-aware
        // re-index can carry raw newlines ("all\ncases") while the stored content
        // now flows on one line ("all cases"). Match on a whitespace-squeezed
        // view and map the hit back to raw content indices.
        const squeeze = (s)=>s.replace(/\s+/g, '');
        const sqQuote = squeeze(effectiveQuote.slice(0, 160));
        if (sqQuote.length < 20) return null;
        const sqIdx = squeeze(detail.content).indexOf(sqQuote);
        if (sqIdx === -1) return null;
        let seen = 0;
        let rawStart = -1;
        let rawEnd = -1;
        for(let i = 0; i < detail.content.length; i++){
            if (/\s/.test(detail.content[i])) continue;
            if (seen === sqIdx) rawStart = i;
            if (seen === sqIdx + sqQuote.length - 1) {
                rawEnd = i + 1;
                break;
            }
            seen++;
        }
        if (rawStart === -1 || rawEnd === -1) return null;
        return {
            before: detail.content.slice(0, rawStart),
            mark: detail.content.slice(rawStart, rawEnd),
            after: detail.content.slice(rawEnd)
        };
    }, [
        detail,
        effectiveQuote
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm",
        onClick: onClose,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "View knowledge source",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            // Large reading surface: near-fullscreen width/height so PDFs and
            // media get a REAL viewer scale (the old max-w-3xl cramped them).
            className: "w-[min(1100px,95vw)] h-[92vh] rounded-2xl border border-white/[0.1] bg-[#141926] flex flex-col overflow-hidden shadow-2xl",
            onClick: (e)=>{
                e.stopPropagation();
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start gap-3 px-5 py-3.5 border-b border-white/[0.08] shrink-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                        s ? kindBadge(s.meta?.fileKind || s.fileKind) : null,
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm font-semibold text-[#c8d0e0] truncate",
                                            children: s?.name ?? 'Loading…'
                                        }),
                                        s && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: `px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${s.status === 'ready' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' : s.status === 'failed' ? 'text-red-400 bg-red-400/10 border-red-400/30' : 'text-amber-400 bg-amber-400/10 border-amber-400/30'}`,
                                            children: s.status
                                        })
                                    ]
                                }),
                                s && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        new Date(s.createdAt).toLocaleString(),
                                        passagesCount ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 ",
                                                passagesCount,
                                                " passages"
                                            ]
                                        }) : null,
                                        s.meta?.durationSec ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 ",
                                                formatDuration(s.meta.durationSec)
                                            ]
                                        }) : null,
                                        pdfPages ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 ",
                                                pdfPages,
                                                " pages"
                                            ]
                                        }) : s.meta?.pages ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 ",
                                                s.meta.pages,
                                                " pages"
                                            ]
                                        }) : null,
                                        s.documents?.[0]?.sizeBytes ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 ",
                                                formatBytes(s.documents[0].sizeBytes),
                                                " text"
                                            ]
                                        }) : null,
                                        s.meta?.originalBytes ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                " \xb7 original ",
                                                formatBytes(s.meta.originalBytes)
                                            ]
                                        }) : null,
                                        s.meta?.ocr ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: " \xb7 via OCR"
                                        }) : null
                                    ]
                                })
                            ]
                        }),
                        canStep && citationIndex != null && citations && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-0.5 shrink-0 px-1.5 py-1 rounded-lg border border-white/10 bg-[#111624]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    disabled: citationIndex <= 0,
                                    onClick: ()=>onNavigate?.(citationIndex - 1),
                                    className: "w-7 h-7 flex items-center justify-center rounded-md text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors",
                                    "aria-label": "Previous citation",
                                    title: citationIndex > 0 && citations[citationIndex - 1]?.title ? `Previous: ${citations[citationIndex - 1].title}` : 'Previous citation',
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "px-1 min-w-[3rem] text-center text-[11px] font-semibold text-[#c8d0e0] tabular-nums",
                                    title: "Citation position",
                                    children: [
                                        citationIndex + 1,
                                        "/",
                                        citations.length
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    disabled: citationIndex >= citations.length - 1,
                                    onClick: ()=>onNavigate?.(citationIndex + 1),
                                    className: "w-7 h-7 flex items-center justify-center rounded-md text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors",
                                    "aria-label": "Next citation",
                                    title: citationIndex < citations.length - 1 && citations[citationIndex + 1]?.title ? `Next: ${citations[citationIndex + 1].title}` : 'Next citation',
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                })
                            ]
                        }),
                        citationLink && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: copyCitationLink,
                            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-[#8b95a8] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/40 transition-colors shrink-0",
                            title: "Copy a link that reopens this question at this citation — share it, or keep it as a study bookmark",
                            children: linkCopied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden md:inline text-[#00e5a0]",
                                        children: "Copied"
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden md:inline",
                                        children: "Link"
                                    })
                                ]
                            })
                        }),
                        hasOriginal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: `${fileUrl}?download=1`,
                            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors shrink-0",
                            title: "Download the original file",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                }),
                                " Download"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                }),
                error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: "w-6 h-6 text-red-400 mx-auto mb-2"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-red-400",
                            children: error
                        })
                    ]
                }),
                !error && !detail && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-16 flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                            className: "w-5 h-5 animate-spin text-[#4fc3f7]"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-[#5a6478]",
                            children: "Loading file…"
                        })
                    ]
                }),
                !error && detail && s && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        s.status === 'failed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mx-5 mt-3 px-3 py-2.5 rounded-lg border border-red-400/30 bg-red-400/10 flex items-start gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[11px] text-red-400 leading-relaxed",
                                    children: [
                                        "Indexing failed: ",
                                        s.error || 'unknown error'
                                    ]
                                })
                            ]
                        }),
                        effectiveQuote && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mx-5 mt-3 px-3 py-2.5 rounded-lg border border-[#4fc3f7]/30 bg-[#4fc3f7]/[0.07] flex items-start gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 text-[#4fc3f7] mt-0.5 shrink-0"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[11px] text-[#8b95a8] leading-relaxed",
                                    children: [
                                        tab === 'original' ? isPdf ? pdfScan === 'found' && pdfFoundPage != null ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                hlScope === 'answer' ? 'Cited answer passage — highlighted in the original file' : 'Cited passage (full chunk) — highlighted in the original file',
                                                " (page ",
                                                pdfFoundPage,
                                                ")"
                                            ]
                                        }) : pdfScan === 'missing' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: "Cited passage — opened in the original file (not found in the PDF text layer — check the extracted text)"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: "Cited passage — locating in the original PDF…"
                                        }) : isAudio || isVideo ? citedTimestamp != null ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Cited moment — the player is set to ",
                                                formatDuration(citedTimestamp)
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: "Cited passage — playing the original recording"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: "Cited passage — from the original file"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: hlScope === 'answer' ? 'Cited answer passage — highlighted below in the source' : 'Cited passage (full chunk) — highlighted below in the source'
                                        }),
                                        scopeToggleAvailable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                ' · ',
                                                "highlight:",
                                                ' ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    className: hlScope === 'answer' ? 'text-[#4fc3f7] font-semibold underline underline-offset-2' : 'text-[#8b95a8] underline underline-offset-2 hover:text-[#4fc3f7]',
                                                    onClick: ()=>setHlScope('answer'),
                                                    children: "answer"
                                                }),
                                                ' | ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    className: hlScope === 'chunk' ? 'text-[#4fc3f7] font-semibold underline underline-offset-2' : 'text-[#8b95a8] underline underline-offset-2 hover:text-[#4fc3f7]',
                                                    onClick: ()=>setHlScope('chunk'),
                                                    children: "full chunk"
                                                })
                                            ]
                                        }),
                                        hasOriginal && tab !== 'original' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                ' · ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    className: "text-[#4fc3f7] underline underline-offset-2 hover:text-[#7fd4ff]",
                                                    onClick: ()=>{
                                                        setPdfScan(null);
                                                        setPdfFoundPage(null);
                                                        setTabChoice('original');
                                                    },
                                                    children: "view the original file"
                                                })
                                            ]
                                        }),
                                        tab === 'original' && (detail.content ?? '').length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                ' · ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    className: "text-[#4fc3f7] underline underline-offset-2 hover:text-[#7fd4ff]",
                                                    onClick: ()=>setTabChoice('content'),
                                                    children: "view extracted text"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-1 px-5 pt-3 shrink-0",
                            children: [
                                hasOriginal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setTabChoice('original'),
                                    className: `px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${tab === 'original' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]' : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'}`,
                                    children: [
                                        isPdf ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }) : isImage ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }) : isVideo ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }) : isAudio ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        "Original file"
                                    ]
                                }),
                                (detail.content ?? '').length > 0 && chunkList.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setTabChoice('content'),
                                            className: `px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${tab === 'content' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]' : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                " Extracted content"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setTabChoice('passages'),
                                            className: `px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${tab === 'passages' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]' : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                " Indexed passages (",
                                                chunkList.length,
                                                ")"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        tab === 'original' && hasOriginal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-5 py-3 flex-1 min-h-0 flex flex-col gap-2",
                            children: [
                                isPdf && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PdfCanvasViewer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                    src: fileUrl,
                                    fileName: s.name,
                                    onDocumentStats: setPdfPages,
                                    highlight: effectiveQuote || undefined,
                                    onHighlightFound: handlePdfHighlight
                                }),
                                isImage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OriginalImageViewer, {
                                    fileUrl: fileUrl,
                                    fileName: s.name
                                }),
                                isAudio && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 min-h-0 flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 text-[10px] text-[#5a6478]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                "Original audio",
                                                s.meta?.durationSec ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        " \xb7 ",
                                                        formatDuration(s.meta.durationSec)
                                                    ]
                                                }) : null,
                                                s.meta?.originalBytes ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        " \xb7 ",
                                                        formatBytes(s.meta.originalBytes)
                                                    ]
                                                }) : null,
                                                citedTimestamp != null && hasHighlight ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] font-semibold",
                                                    children: [
                                                        "cited moment \xb7 ",
                                                        formatDuration(citedTimestamp)
                                                    ]
                                                }) : null
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex-1 min-h-0 flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#0f1320] p-6",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "w-full max-w-xl flex flex-col items-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-14 h-14 rounded-2xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                            className: "w-6 h-6 text-purple-400"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs text-[#8b95a8] text-center truncate max-w-full",
                                                        children: s.name
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("audio", {
                                                        ref: audioPlayerRef,
                                                        controls: true,
                                                        preload: "metadata",
                                                        src: fileUrl,
                                                        className: "w-full",
                                                        children: "Your browser does not support audio playback."
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                isVideo && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 min-h-0 flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 text-[10px] text-[#5a6478]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                "Original video",
                                                s.meta?.durationSec ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        " \xb7 ",
                                                        formatDuration(s.meta.durationSec)
                                                    ]
                                                }) : null,
                                                s.meta?.originalBytes ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        " \xb7 ",
                                                        formatBytes(s.meta.originalBytes)
                                                    ]
                                                }) : null,
                                                citedTimestamp != null && hasHighlight ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] font-semibold",
                                                    children: [
                                                        "cited moment \xb7 ",
                                                        formatDuration(citedTimestamp)
                                                    ]
                                                }) : null
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex-1 min-h-0 flex items-center justify-center rounded-xl border border-white/[0.08] bg-black overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("video", {
                                                ref: videoPlayerRef,
                                                controls: true,
                                                preload: "metadata",
                                                src: fileUrl,
                                                className: "w-full h-full max-h-full object-contain",
                                                children: "Your browser does not support video playback."
                                            })
                                        })
                                    ]
                                }),
                                !isPdf && !isImage && !isAudio && !isVideo && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 min-h-0 flex flex-col items-center justify-center gap-3 px-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-7 h-7 text-[#5a6478]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                "This file type (",
                                                originalMime || 'unknown',
                                                ") has no inline viewer."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                            href: `${fileUrl}?download=1`,
                                            className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4fc3f7]/30 bg-[#4fc3f7]/10 text-[#4fc3f7] text-[11px] font-semibold hover:bg-[#4fc3f7]/20",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " Download the original"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        tab === 'content' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "px-5 py-3 overflow-y-auto flex-1 min-h-0",
                            children: detail.content ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-xl border border-white/[0.06] bg-[#0f1320] p-4 h-full flex flex-col min-h-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between items-center mb-2 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#5a6478] uppercase tracking-widest",
                                                children: [
                                                    s.meta?.transcription || s.meta?.ocr || s.fileKind === 'audio' || s.fileKind === 'video' ? 'transcript' : 'extracted text',
                                                    detail.contentTruncated ? ' · first 100k characters' : ''
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                onClick: copyContent,
                                                className: "flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-[10px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors",
                                                children: [
                                                    copied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                        className: "w-3 h-3 text-emerald-400"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    copied ? 'Copied' : 'Copy'
                                                ]
                                            })
                                        ]
                                    }),
                                    contentParts ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("pre", {
                                        className: "whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal flex-1 min-h-0 overflow-y-auto",
                                        children: [
                                            contentParts.before,
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mark", {
                                                ref: markRef,
                                                className: "bg-[#4fc3f7]/25 text-[#e8f4ff] rounded px-0.5 py-0.5 animate-[citation-pulse_1.6s_ease-out_1] shadow-[inset_0_-2px_0_rgba(79,195,247,0.5)]",
                                                children: contentParts.mark
                                            }),
                                            contentParts.after
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                                        className: "whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal flex-1 min-h-0 overflow-y-auto",
                                        children: detail.content
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "py-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                        className: "w-6 h-6 text-[#5a6478] mx-auto mb-2"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: s.status === 'ready' ? 'No extracted text stored for this source.' : s.status === 'failed' ? 'Nothing was extracted — see the error above.' : 'Content will appear once indexing finishes.'
                                    })
                                ]
                            })
                        }),
                        tab === 'passages' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-5 py-3 overflow-y-auto flex-1 min-h-0 space-y-2",
                            children: [
                                chunkList.map((c)=>{
                                    const cited = highlight?.chunkId && c.id === highlight.chunkId;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        ref: cited ? chunkRef : undefined,
                                        className: `rounded-xl p-3 border ${cited ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/[0.06]' : 'border-white/[0.06] bg-[#0f1320]'}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: `px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${cited ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]' : 'bg-[#4fc3f7]/10 border-[#4fc3f7]/30 text-[#4fc3f7]'}`,
                                                        children: [
                                                            "#",
                                                            c.idx + 1
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] text-[#5a6478] truncate",
                                                        children: c.contextSummary || 'no summary'
                                                    }),
                                                    cited && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "ml-auto shrink-0 px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/15 border border-[#4fc3f7]/40 text-[#4fc3f7] text-[9px] font-semibold uppercase tracking-wider",
                                                        children: "cited"
                                                    }),
                                                    !cited && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] text-[#5a6478] ml-auto shrink-0",
                                                        children: c.embeddingModel
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: `text-[11px] leading-relaxed whitespace-pre-wrap break-words ${cited ? 'text-[#c8d0e0]' : 'text-[#8b95a8]'}`,
                                                children: c.content
                                            })
                                        ]
                                    }, c.id ?? c.idx);
                                }),
                                chunkList.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs text-[#5a6478] text-center py-10",
                                    children: [
                                        "No passages indexed",
                                        detail.source.status === 'failed' ? ' — ingestion failed' : '',
                                        "."
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* ════════════════════════════════════════════════════════════════════════════
   OriginalImageViewer — width-based zoom (NOT transform: scale — transforms
   don't affect layout, which broke the scroll bounds in the old viewer) +
   a REAL "Fit" that measures the container, 1:1 pixel-true reset, and a
   transparent-file checkerboard backdrop.
   ══════════════════════════════════════════════════════════════════════════ */ function OriginalImageViewer({ fileUrl, fileName }) {
    const [natural, setNatural] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [zoom, setZoom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('fit');
    const [containerW, setContainerW] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Track the scroll container width for the real "fit" computation. */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = containerRef.current;
        if (!el) return;
        let raf = 0;
        const ro = new ResizeObserver(()=>{
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(()=>setContainerW(el.clientWidth));
        });
        ro.observe(el);
        setContainerW(el.clientWidth);
        return ()=>{
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, []);
    const fitScale = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!natural || containerW < 40) return 1;
        // Leave a little padding; never upscale beyond 1 for "fit".
        return Math.min(1, (containerW - 24) / natural.w);
    }, [
        natural,
        containerW
    ]);
    const scale = zoom === 'fit' ? fitScale : zoom;
    const displayWidth = natural ? Math.max(1, Math.round(natural.w * scale)) : undefined;
    const stepZoom = (dir)=>{
        setZoom((z)=>{
            const current = typeof z === 'number' ? z : fitScale;
            return Math.max(0.1, Math.min(6, Math.round((current + dir * 0.25) * 100) / 100));
        });
    };
    const ctrlBtn = 'flex items-center justify-center gap-1 px-2 h-7 rounded-lg border border-white/10 text-[#8b95a8] ' + 'hover:text-[#c8d0e0] hover:border-white/25 transition-colors text-[10px]';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-1 min-h-0 flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-[#111624] flex-wrap shrink-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: ctrlBtn,
                        onClick: ()=>stepZoom(-1),
                        "aria-label": "Zoom out",
                        title: "Zoom out",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "flex items-center justify-center w-[3.4rem] h-7 rounded-lg border border-white/10 text-[11px] text-[#c8d0e0]",
                        title: "Current zoom level",
                        children: [
                            Math.round(scale * 100),
                            "%"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: ctrlBtn,
                        onClick: ()=>stepZoom(1),
                        "aria-label": "Zoom in",
                        title: "Zoom in",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setZoom('fit'),
                        className: `flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${zoom === 'fit' ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]' : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'}`,
                        title: "Fit the image to the window",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Fit"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setZoom(1),
                        className: `flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${zoom === 1 ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]' : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'}`,
                        title: "Show at original pixel size (1:1)",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " 1:1"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "flex-1"
                    }),
                    natural && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px] text-[#5a6478] px-1",
                        title: "Natural pixel dimensions",
                        children: [
                            natural.w,
                            " \xd7 ",
                            natural.h
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                        href: fileUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors",
                        title: "Open the full image in a new tab",
                        "aria-label": "Open the full image in a new tab",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                ref: containerRef,
                className: "flex-1 min-h-0 overflow-auto rounded-xl border border-white/[0.06]",
                style: {
                    backgroundColor: '#0a0e17',
                    backgroundImage: 'linear-gradient(45deg, #10141f 25%, transparent 25%, transparent 75%, #10141f 75%),' + 'linear-gradient(45deg, #10141f 25%, transparent 25%, transparent 75%, #10141f 75%)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start justify-center p-3 min-h-full",
                    children: [
                        !natural && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col items-center justify-center gap-2 py-16",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Calendar_Check_ChevronLeft_ChevronRight_Copy_Download_ExternalLink_File_FileAudio_FileImage_FileText_FileVideo_Frame_Highlighter_Layers_Link2_Loader2_StretchHorizontal_X_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                    className: "w-5 h-5 animate-spin text-[#4fc3f7]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[10px] text-[#5a6478]",
                                    children: "Loading image…"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                            src: fileUrl,
                            alt: `Original file: ${fileName}`,
                            onLoad: (e)=>{
                                const img = e.currentTarget;
                                if (img.naturalWidth) setNatural({
                                    w: img.naturalWidth,
                                    h: img.naturalHeight
                                });
                            },
                            style: displayWidth ? {
                                width: displayWidth,
                                height: 'auto'
                            } : undefined,
                            className: natural ? 'block rounded-md shadow-[0_2px_16px_rgba(0,0,0,0.5)]' : 'block max-h-1',
                            draggable: false
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 245019:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dw: () => (/* binding */ downloadSingleQuestionJSON),
/* harmony export */   Wz: () => (/* binding */ exportAsHtml),
/* harmony export */   hk: () => (/* binding */ downloadReferenceSheet),
/* harmony export */   ni: () => (/* binding */ downloadAsJSON),
/* harmony export */   pC: () => (/* binding */ downloadSingleQuestionPDF),
/* harmony export */   pQ: () => (/* binding */ downloadAsPDF)
/* harmony export */ });
/* ═══════════════════════════════════════════════════════════════
   HTML-TO-TEXT CONVERSION — Preserves structure, lists, paragraphs
   ═══════════════════════════════════════════════════════════════ */ /**
 * Convert HTML to clean, structured plain text.
 * - <li> → "• item" (with indentation for nested lists)
 * - <p>, <br>, <div> → paragraph breaks
 * - <h1>-<h6> → UPPERCASE heading with blank line
 * - <strong>/<b> → plain (jsPDF handles bold via font)
 * - <em>/<i> → plain
 * - Strips all other tags cleanly
 */ /**
 * Sanitize text for jsPDF rendering.
 * jsPDF's built-in Helvetica font only supports WinAnsiEncoding (essentially Latin-1).
 * Many Unicode characters (bullet, checkmark, em-dash, arrows, etc.) are NOT
 * in this encoding and will either render as blank, throw errors, or break layout.
 * This function replaces those characters with ASCII-safe alternatives.
 */ function sanitizeForPdf(text) {
    if (!text) return '';
    return text.replace(/\u2022/g, '-') // bullet -> dash
    .replace(/\u2713/g, 'V') // checkmark -> V
    .replace(/\u2714/g, 'V') // heavy checkmark -> V
    .replace(/\u2717/g, 'X') // ballot X -> X
    .replace(/\u2718/g, 'X') // heavy ballot X -> X
    .replace(/\u2014/g, '--') // em dash -> double dash
    .replace(/\u2013/g, '-') // en dash -> dash
    .replace(/\u2026/g, '...') // ellipsis -> three dots
    .replace(/\u2192/g, '->') // right arrow -> ->
    .replace(/\u2190/g, '<-') // left arrow -> <-
    .replace(/\u2191/g, '^') // up arrow -> ^
    .replace(/\u2193/g, 'v') // down arrow -> v
    .replace(/\u00B7/g, '-') // middle dot -> dash
    .replace(/\u2018/g, "'") // left single quote
    .replace(/\u2019/g, "'") // right single quote
    .replace(/\u201C/g, '"') // left double quote
    .replace(/\u201D/g, '"') // right double quote
    .replace(/[\u25A0-\u25FF]/g, '*') // geometric shapes -> asterisk
    .replace(/[\u2600-\u27BF]/g, '') // misc symbols (emoji-like) -> remove
    .replace(/[\u2300-\u23FF]/g, '-'); // misc technical -> dash
}
function stripHtml(html) {
    if (!html) return '';
    let text = html;
    // Normalize line breaks & whitespace
    text = text.replace(/\r\n/g, '\n');
    text = text.replace(/\r/g, '\n');
    // Convert list items to dash-prefixed items (PDF-safe)
    text = text.replace(/<li[^>]*>/gi, '\n- ');
    // Close list items
    text = text.replace(/<\/li>/gi, '');
    // Paragraph / div / heading breaks
    text = text.replace(/<\/p>/gi, '\n\n');
    text = text.replace(/<p[^>]*>/gi, '\n');
    text = text.replace(/<\/div>/gi, '\n');
    text = text.replace(/<div[^>]*>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    // Headings - make uppercase and add spacing
    text = text.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_match, inner)=>{
        const cleaned = inner.replace(/<[^>]*>/g, '').trim();
        return `\n\n${cleaned.toUpperCase()}\n`;
    });
    // Remove all remaining HTML tags
    text = text.replace(/<[^>]*>/g, '');
    // Decode HTML entities - convert to ASCII-safe equivalents for PDF
    text = text.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&mdash;/g, '--').replace(/&ndash;/g, '-').replace(/&bull;/g, '-').replace(/&hellip;/g, '...').replace(/&rarr;/g, '->').replace(/&larr;/g, '<-');
    // Sanitize any remaining Unicode that jsPDF can't render
    text = sanitizeForPdf(text);
    // Clean up excessive whitespace
    text = text.replace(/[ \t]+/g, ' '); // collapse horizontal whitespace
    text = text.replace(/\n[ \t]+/g, '\n'); // remove leading spaces on lines
    text = text.replace(/\n{3,}/g, '\n\n'); // max 2 consecutive newlines
    text = text.trim();
    return text;
}
/**
 * Split rich HTML content into lines suitable for PDF rendering.
 * Returns an array of { text, indent } objects for precise layout.
 */ function htmlToStructuredLines(html) {
    const plain = stripHtml(html);
    if (!plain) return [];
    const lines = [];
    const rawLines = plain.split('\n');
    for (const line of rawLines){
        const trimmed = line.trim();
        if (!trimmed) continue;
        // Bullet point lines get indentation
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            let bulletText = trimmed;
            if (trimmed.startsWith('* ')) bulletText = '- ' + trimmed.slice(2);
            lines.push({
                text: bulletText,
                indent: 6
            });
        } else if (/^\d+[\.\)]\s/.test(trimmed)) {
            lines.push({
                text: trimmed,
                indent: 6
            });
        } else {
            lines.push({
                text: trimmed,
                indent: 0
            });
        }
    }
    return lines;
}
/* ═══════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════ */ function getTimestamp() {
    return new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
}
function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
/* ═══════════════════════════════════════════════════════════════
   JSON DOWNLOAD — kept as-is
   ═══════════════════════════════════════════════════════════════ */ async function downloadAsJSON(questions, filename) {
    const cleanQuestions = questions.map((q)=>({
            id: q.id,
            type: q.type,
            text: q.text,
            options: q.options,
            answer: q.answer,
            explanation: q.explanation,
            mnemonic: q.mnemonic,
            clinicalPearl: q.clinicalPearl,
            distractorAnalysis: q.distractorAnalysis,
            difficulty: q.difficulty,
            system: q.system,
            topic: q.topic,
            tags: q.tags,
            isAIGenerated: q.isAIGenerated
        }));
    const json = JSON.stringify({
        exportedAt: new Date().toISOString(),
        count: cleanQuestions.length,
        questions: cleanQuestions
    }, null, 2);
    const blob = new Blob([
        json
    ], {
        type: 'application/json'
    });
    triggerDownload(blob, filename || `medq-questions-${getTimestamp()}.json`);
}
async function downloadSingleQuestionJSON(question) {
    await downloadAsJSON([
        question
    ], `medq-${question.topic || 'question'}-${getTimestamp()}.json`);
}
/* ═══════════════════════════════════════════════════════════════
   PDF DOWNLOAD — Professional quality, client-side jsPDF
   ═══════════════════════════════════════════════════════════════ */ // --- Brand Colors ---
const BRAND = {
    green: [
        22,
        163,
        74
    ],
    darkGreen: [
        17,
        120,
        55
    ],
    lightGreen: [
        240,
        253,
        244
    ],
    greenBorder: [
        134,
        239,
        172
    ],
    navy: [
        26,
        26,
        46
    ],
    slate: [
        51,
        65,
        85
    ],
    muted: [
        100,
        116,
        139
    ],
    lightGray: [
        241,
        245,
        249
    ],
    border: [
        226,
        232,
        240
    ],
    white: [
        255,
        255,
        255
    ],
    amber: [
        146,
        64,
        14
    ],
    purple: [
        91,
        33,
        182
    ],
    red: [
        153,
        27,
        27
    ],
    blue: [
        37,
        99,
        235
    ]
};
const LETTERS = [
    'A',
    'B',
    'C',
    'D'
];
async function downloadAsPDF(questions, filename) {
    const pdfFilename = filename || `medq-questions-${getTimestamp()}.pdf`;
    let jsPDFConstructor;
    try {
        const jspdfModule = await __webpack_require__.e(/* import() */ 7847).then(__webpack_require__.bind(__webpack_require__, 637847));
        jsPDFConstructor = jspdfModule.jsPDF;
    } catch (importErr) {
        console.error('[MedQ PDF] Failed to import jsPDF:', importErr);
        throw new Error('PDF library failed to load. Please check your internet connection and try again.');
    }
    const doc = new jsPDFConstructor({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    const PW = 210; // page width
    const PH = 297; // page height
    const ML = 15; // margin left
    const MR = 15; // margin right
    const MT = 15; // margin top
    const MB = 20; // margin bottom
    const CW = PW - ML - MR; // content width
    const MAX_Y = PH - MB;
    let y = MT;
    let pageNum = 1;
    // ── Helper: rasterize a question image (incl. SVG ECG strips) for embedding ──
    const rasterizeImage = async (url)=>{
        try {
            let src = url;
            let revoke = null;
            // SVGs without intrinsic size (our ECG strips) need explicit dimensions
            if (/\.svg(\?|$)/i.test(url)) {
                const res = await fetch(url);
                const text = await res.text();
                const vb = text.match(/viewBox=["']([\d.\s]+)["']/);
                if (vb) {
                    const nums = vb[1].trim().split(/\s+/).map(Number);
                    const vw = nums[2] || 1000;
                    const vh = nums[3] || 250;
                    const withSize = text.replace(/<svg/, `<svg width="${vw}" height="${vh}"`);
                    revoke = URL.createObjectURL(new Blob([
                        withSize
                    ], {
                        type: 'image/svg+xml'
                    }));
                    src = revoke;
                }
            }
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject)=>{
                const timer = setTimeout(()=>reject(new Error('image timeout')), 8000);
                img.onload = ()=>{
                    clearTimeout(timer);
                    resolve();
                };
                img.onerror = ()=>{
                    clearTimeout(timer);
                    reject(new Error('image load failed'));
                };
                img.src = src;
            });
            const scale = Math.min(2, 1400 / Math.max(1, img.naturalWidth || 1000));
            const cw = Math.max(1, Math.round((img.naturalWidth || 1000) * scale));
            const ch = Math.max(1, Math.round((img.naturalHeight || 300) * scale));
            const canvas = document.createElement('canvas');
            canvas.width = cw;
            canvas.height = ch;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('no canvas ctx');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, cw, ch);
            ctx.drawImage(img, 0, 0, cw, ch);
            if (revoke) URL.revokeObjectURL(revoke);
            return {
                dataUrl: canvas.toDataURL('image/jpeg', 0.92),
                w: cw,
                h: ch
            };
        } catch  {
            return null;
        }
    };
    // ── Helper: embed the question image / ECG strip, fitted to content width ──
    const embedQuestionImage = async (url, caption)=>{
        if (!url) return;
        const raster = await rasterizeImage(url);
        if (!raster) return;
        const maxW = CW - 4;
        const maxH = 90;
        const ratio = Math.min(maxW / raster.w, maxH / raster.h);
        const w = raster.w * ratio;
        const h = raster.h * ratio;
        ensureSpace(h + (caption ? 8 : 4));
        doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        doc.setLineWidth(0.3);
        doc.addImage(raster.dataUrl, 'JPEG', ML + 2, y, w, h);
        doc.rect(ML + 2, y, w, h, 'S');
        y += h + 2;
        if (caption) {
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            doc.text(caption, ML + 4, y);
            y += 5;
        }
        y += 2;
    };
    // ── Helper: render lab panels as a styled table ──
    const renderLabPanel = (labPanelRaw)=>{
        if (!labPanelRaw) return;
        let panels = [];
        try {
            panels = JSON.parse(labPanelRaw);
        } catch  {
            return;
        }
        panels = panels.filter((p)=>p && Array.isArray(p.rows) && p.rows.length);
        if (!panels.length) return;
        for (const panel of panels){
            const rows = panel.rows.slice(0, 10);
            const colW = [
                CW * 0.38,
                CW * 0.24,
                CW * 0.22,
                CW * 0.12
            ];
            const rowH = 6;
            ensureSpace(rows.length * rowH + 14);
            // Panel name header
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setFillColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
            const hw = doc.getTextWidth(panel.name || 'Lab panel') + 10;
            roundedRect(ML + 1, y, Math.min(hw, CW - 2), 6, 1.5, 'F');
            doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
            doc.text(panel.name || 'Lab panel', ML + 6, y + 4);
            y += 9;
            // Header row
            doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
            doc.rect(ML + 1, y, CW - 2, rowH, 'F');
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            [
                'Test',
                'Result',
                'Units',
                'Flag'
            ].forEach((h, ci)=>{
                doc.text(h, ML + 5 + colW.slice(0, ci).reduce((a, b)=>a + b, 0), y + 4);
            });
            y += rowH;
            // Data rows
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            rows.forEach((row, ri)=>{
                ensureSpace(rowH);
                if (ri % 2 === 1) {
                    doc.setFillColor(249, 250, 251);
                    doc.rect(ML + 1, y, CW - 2, rowH, 'F');
                }
                doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
                doc.text(sanitizeForPdf(String(row.test || '')).slice(0, 34), ML + 5, y + 4);
                doc.text(sanitizeForPdf(String(row.value ?? '')), ML + 5 + colW[0] + colW[1], y + 4, {
                    align: 'right'
                });
                doc.text(sanitizeForPdf(String(row.unit ?? '')), ML + 5 + colW[0] + colW[1] + colW[2], y + 4, {
                    align: 'right'
                });
                const flag = String(row.flag || '');
                if (flag === 'H' || flag === 'L') {
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(flag === 'H' ? BRAND.red[0] : BRAND.blue[0], flag === 'H' ? BRAND.red[1] : BRAND.blue[1], flag === 'H' ? BRAND.red[2] : BRAND.blue[2]);
                }
                doc.text(flag, ML + 5 + colW[0] + colW[1] + colW[2] + colW[3] / 2, y + 4, {
                    align: 'center'
                });
                if (flag === 'H' || flag === 'L') {
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
                }
                y += rowH;
            });
            y += 5;
        }
    };
    // ── Helper: add new page & track page number ──
    const addPage = ()=>{
        doc.addPage();
        pageNum++;
        y = MT;
    };
    // ── Helper: ensure enough vertical space, add page if needed ──
    const ensureSpace = (needed)=>{
        if (y + needed > MAX_Y) {
            addPage();
        }
    };
    // ── Helper: draw a rounded rect ──
    const roundedRect = (x, ry, w, h, r, style)=>{
        if (typeof doc.roundedRect === 'function') {
            doc.roundedRect(x, ry, w, h, r, r, style);
        } else {
            // Fallback: use regular rect if roundedRect is not available
            doc.rect(x, ry, w, h, style);
        }
    };
    // ── Helper: draw a pill/badge ──
    const drawBadge = (x, by, label, bgColor, textColor)=>{
        const safeLabel = sanitizeForPdf(label || '');
        if (!safeLabel) return 0;
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        const tw = doc.getTextWidth(safeLabel) + 6;
        doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        roundedRect(x, by, tw, 5.5, 1.5, 'F');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(safeLabel, x + tw / 2, by + 3.6, {
            align: 'center'
        });
        return tw;
    };
    // ── Helper: render structured lines (from HTML) with proper wrapping ──
    const renderStructuredContent = (html, fontSize, maxWidth)=>{
        const lines = htmlToStructuredLines(html);
        if (lines.length === 0) return 0;
        let totalHeight = 0;
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
        for (const line of lines){
            const indent = line.indent;
            const effectiveWidth = maxWidth - indent;
            const wrappedLines = doc.splitTextToSize(line.text, effectiveWidth);
            const lineH = fontSize * 0.42; // line height in mm
            for (const wl of wrappedLines){
                ensureSpace(lineH + 2);
                doc.text(wl, ML + 4 + indent, y + lineH + 0.5);
                y += lineH + 1.2;
                totalHeight += lineH + 1.2;
            }
            // Gap between logical lines
            y += 1.2;
            totalHeight += 1.2;
        }
        return totalHeight;
    };
    // ── Helper: render a section with colored header ──
    const renderSection = (label, color, content)=>{
        if (!content) return;
        const plainContent = stripHtml(content);
        if (!plainContent) return;
        // Estimate height needed for at least the header + a few lines
        ensureSpace(20);
        // Section header bar
        doc.setFillColor(color[0], color[1], color[2]);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        const lw = doc.getTextWidth(label) + 10;
        roundedRect(ML, y, lw, 6, 1.5, 'F');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(label, ML + 5, y + 4);
        y += 10;
        // Content - use slightly larger font and more width
        renderStructuredContent(content, 9.5, CW - 6);
        y += 4;
    };
    // ══════════════════════════════════════════
    // TITLE PAGE
    // ══════════════════════════════════════════
    // Full-page light green background
    doc.setFillColor(245, 251, 247);
    doc.rect(0, 0, PW, PH, 'F');
    // Green accent bar at top
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.rect(0, 0, PW, 4, 'F');
    // MedQ Logo
    y = 80;
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    doc.text('Med', PW / 2 - 15, y, {
        align: 'center'
    });
    const medWidth = doc.getTextWidth('Med');
    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.text('Q', PW / 2 - 15 + medWidth, y, {
        align: 'left'
    });
    // Tagline
    y += 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('Medical Question Bank', PW / 2, y, {
        align: 'center'
    });
    // Divider line
    y += 16;
    doc.setDrawColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.setLineWidth(0.8);
    doc.line(PW / 2 - 30, y, PW / 2 + 30, y);
    // Document info
    y += 16;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
    const infoLines = [
        `${questions.length} Question${questions.length !== 1 ? 's' : ''} Exported`,
        `Date: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`,
        `Time: ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })}`
    ];
    // Count unique systems and topics
    const systems = new Set(questions.map((q)=>q.system).filter(Boolean));
    const topics = new Set(questions.map((q)=>q.topic).filter(Boolean));
    if (systems.size > 0) infoLines.push(`Systems: ${Array.from(systems).join(', ')}`);
    if (topics.size > 0) infoLines.push(`Topics: ${Array.from(topics).join(', ')}`);
    // Difficulty breakdown
    const easy = questions.filter((q)=>q.difficulty === 'Easy').length;
    const basic = questions.filter((q)=>q.difficulty === 'Basic').length;
    const moderate = questions.filter((q)=>q.difficulty === 'Moderate' || q.difficulty === 'Medium').length;
    const hard = questions.filter((q)=>q.difficulty === 'Hard').length;
    const expert = questions.filter((q)=>q.difficulty === 'Expert').length;
    if (questions.length > 1) {
        infoLines.push(`Difficulty: ${easy} Easy \u00B7 ${basic} Basic \u00B7 ${moderate} Moderate \u00B7 ${hard} Hard \u00B7 ${expert} Expert`);
    }
    // Type breakdown
    const mcq = questions.filter((q)=>q.type === 'mcq').length;
    const tf = questions.filter((q)=>q.type === 'tf').length;
    const sh = questions.filter((q)=>q.type === 'short').length;
    if (questions.length > 1) {
        infoLines.push(`Types: ${mcq} MCQ \u00B7 ${tf} True/False \u00B7 ${sh} Short Answer`);
    }
    infoLines.forEach((line)=>{
        doc.text(line, PW / 2, y, {
            align: 'center'
        });
        y += 7;
    });
    // Footer on title page
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('Generated by MedQ \u2014 Medical Question Bank', PW / 2, PH - 15, {
        align: 'center'
    });
    // ══════════════════════════════════════════
    // QUESTION PAGES
    // ══════════════════════════════════════════
    for(let index = 0; index < questions.length; index++){
        const q = questions[index];
        // Always start each question on a new page
        addPage();
        // Safe field access with fallbacks for null/undefined
        const qType = q.type || 'mcq';
        const qDifficulty = q.difficulty || 'Moderate';
        const qSystem = q.system || '';
        const qTopic = q.topic || '';
        const qAnswer = q.answer || '';
        const qExplanation = q.explanation || '';
        const qMnemonic = q.mnemonic || '';
        const qClinicalPearl = q.clinicalPearl || '';
        const qDistractorAnalysis = q.distractorAnalysis || '';
        const qTags = Array.isArray(q.tags) ? q.tags : [];
        const qOptions = Array.isArray(q.options) ? q.options : [];
        // ── Question header background bar ──
        doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        doc.rect(ML - 2, y - 3, CW + 4, 9, 'F');
        // Q# in header
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(`Question ${index + 1}`, ML + 3, y + 2.5);
        y += 10;
        // ── Badges row ──
        let bx = ML;
        // Type badge
        const typeLabel = qType === 'mcq' ? 'MCQ' : qType === 'tf' ? 'True/False' : 'Short Answer';
        const typeClr = qType === 'mcq' ? BRAND.green : qType === 'tf' ? BRAND.amber : BRAND.purple;
        bx += drawBadge(bx, y, typeLabel, typeClr, BRAND.white) + 2;
        // Difficulty badge
        const diffClr = qDifficulty === 'Easy' ? BRAND.green : qDifficulty === 'Basic' ? BRAND.green : qDifficulty === 'Moderate' || qDifficulty === 'Medium' ? BRAND.amber : qDifficulty === 'Hard' ? BRAND.red : BRAND.red;
        bx += drawBadge(bx, y, qDifficulty, diffClr, BRAND.white) + 2;
        // System badge
        if (qSystem) {
            bx += drawBadge(bx, y, qSystem, BRAND.lightGray, BRAND.muted) + 2;
        }
        // Topic badge (if different from system)
        if (qTopic && qTopic !== qSystem) {
            bx += drawBadge(bx, y, qTopic, BRAND.lightGray, BRAND.muted) + 2;
        }
        // Tags
        qTags.slice(0, 4).forEach((tag)=>{
            const safeTag = sanitizeForPdf(tag || '');
            if (!safeTag) return;
            const tw = doc.getTextWidth(safeTag) + 6;
            if (bx + tw > PW - MR) return;
            bx += drawBadge(bx, y, safeTag, [
                224,
                242,
                254
            ], [
                3,
                105,
                161
            ]) + 2;
        });
        y += 9;
        // Thin separator
        doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        doc.setLineWidth(0.3);
        doc.line(ML, y, PW - MR, y);
        y += 5;
        // ── Question text ──
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
        const questionText = stripHtml(q.text || '');
        const qLines = doc.splitTextToSize(questionText, CW - 4);
        const qLineH = 5.5;
        const qHeight = qLines.length * qLineH;
        ensureSpace(qHeight + 4);
        doc.text(qLines, ML + 2, y);
        y += qHeight + 6;
        // ── Lab panel (agent questions with laboratory data) ──
        renderLabPanel(q.labPanel);
        // ── Question image: ECG strip / radiology / illustration ──
        const isEcg = Boolean(q.imageUrl && q.imageUrl.startsWith('/generated/agent/ecg/'));
        if (q.imageUrl) {
            await embedQuestionImage(q.imageUrl, isEcg ? 'ECG — Lead II rhythm strip' : undefined);
        }
        // ── Offline media note (audio/3D model can't be printed) ──
        const mediaNotes = [];
        if (isEcg) mediaNotes.push('ECG rhythm strip shown above');
        if (q.audioUrl) mediaNotes.push('audio recording — play it in the app');
        if (q.modelUrl) mediaNotes.push('interactive 3D model — explore it in the app');
        if (q.videoUrl) mediaNotes.push('video — watch it in the app');
        if (mediaNotes.length) {
            ensureSpace(6);
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            doc.text(`Media: ${mediaNotes.join(' · ')}`, ML + 2, y);
            y += 5;
        }
        // ── MCQ Options ──
        if (qType === 'mcq' && qOptions.length > 0) {
            const correctAnswer = stripHtml(qAnswer).toLowerCase().trim();
            qOptions.forEach((opt, i)=>{
                const optText = stripHtml(opt || '');
                // Determine if this option is correct — compare text or letter match
                const isCorrect = optText.toLowerCase().trim() === correctAnswer || `${LETTERS[i]}`.toLowerCase() === correctAnswer || `${LETTERS[i]}. ${optText}`.toLowerCase().trim() === correctAnswer || correctAnswer.length <= 1 && LETTERS[i].toLowerCase() === correctAnswer;
                const optLabel = `${LETTERS[i]}.`;
                const fullOptText = `${optLabel} ${optText}`;
                const optLines = doc.splitTextToSize(fullOptText, CW - 14);
                const optLineH = 5;
                const optHeight = Math.max(optLines.length * optLineH + 6, 10);
                ensureSpace(optHeight + 3);
                // Background
                if (isCorrect) {
                    doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
                    doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
                } else {
                    doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
                    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
                }
                doc.setLineWidth(0.3);
                roundedRect(ML + 1, y, CW - 2, optHeight, 2, 'FD');
                // Option letter circle
                const circleR = 3.5;
                const circleX = ML + 7;
                const circleY = y + optHeight / 2;
                if (isCorrect) {
                    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
                } else {
                    doc.setFillColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
                }
                doc.ellipse(circleX, circleY, circleR, circleR, 'F');
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
                doc.text(LETTERS[i], circleX, circleY + 1, {
                    align: 'center'
                });
                // Option text
                doc.setFontSize(10);
                doc.setFont('helvetica', isCorrect ? 'bold' : 'normal');
                doc.setTextColor(isCorrect ? BRAND.green[0] : BRAND.slate[0], isCorrect ? BRAND.green[1] : BRAND.slate[1], isCorrect ? BRAND.green[2] : BRAND.slate[2]);
                doc.text(optLines, ML + 14, y + 5.5);
                // Checkmark for correct (ASCII-safe [V] since Helvetica can't render Unicode checkmarks)
                if (isCorrect) {
                    doc.setFontSize(10);
                    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
                    doc.text('[V]', PW - MR - 10, y + optHeight / 2 + 1.5);
                }
                y += optHeight + 3;
            });
        }
        // ── True/False Options ──
        if (qType === 'tf') {
            [
                'True',
                'False'
            ].forEach((val)=>{
                const isCorrect = val.toLowerCase() === qAnswer.toLowerCase();
                const optHeight = 10;
                ensureSpace(optHeight + 3);
                if (isCorrect) {
                    doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
                    doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
                } else {
                    doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
                    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
                }
                doc.setLineWidth(0.3);
                roundedRect(ML + 1, y, CW - 2, optHeight, 2, 'FD');
                // Letter circle
                const circleR = 3.5;
                const circleX = ML + 7;
                const circleY = y + optHeight / 2;
                if (isCorrect) {
                    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
                } else {
                    doc.setFillColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
                }
                doc.ellipse(circleX, circleY, circleR, circleR, 'F');
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
                doc.text(val === 'True' ? 'T' : 'F', circleX, circleY + 1, {
                    align: 'center'
                });
                // Text
                doc.setFontSize(10.5);
                doc.setFont('helvetica', isCorrect ? 'bold' : 'normal');
                doc.setTextColor(isCorrect ? BRAND.green[0] : BRAND.slate[0], isCorrect ? BRAND.green[1] : BRAND.slate[1], isCorrect ? BRAND.green[2] : BRAND.slate[2]);
                doc.text(val, ML + 14, y + 6);
                // Checkmark for correct (ASCII-safe)
                if (isCorrect) {
                    doc.setFontSize(10);
                    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
                    doc.text('[V]', PW - MR - 10, y + 6);
                }
                y += optHeight + 3;
            });
        }
        // ── Short Answer ──
        if (qType === 'short') {
            const answerText = stripHtml(qAnswer);
            const answerLines = doc.splitTextToSize(answerText, CW - 10);
            const answerBoxH = Math.max(answerLines.length * 5 + 10, 14);
            ensureSpace(answerBoxH + 4);
            doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
            doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
            doc.setLineWidth(0.3);
            roundedRect(ML + 1, y, CW - 2, answerBoxH, 2, 'FD');
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            doc.text('Expected Answer:', ML + 5, y + 5);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
            doc.text(answerLines, ML + 5, y + 10);
            y += answerBoxH + 4;
        }
        // ── Correct Answer Banner ──
        const answerBannerText = stripHtml(qAnswer);
        const answerBannerLines = doc.splitTextToSize(answerBannerText, CW - 14);
        const bannerH = Math.max(answerBannerLines.length * 5 + 8, 12);
        ensureSpace(bannerH + 4);
        // Green banner with left accent stripe
        doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        doc.rect(ML, y, 3.5, bannerH, 'F');
        doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
        doc.rect(ML + 3.5, y, CW - 3.5, bannerH, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.darkGreen[0], BRAND.darkGreen[1], BRAND.darkGreen[2]);
        doc.text('CORRECT ANSWER', ML + 8, y + 4);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        doc.text(answerBannerLines, ML + 8, y + 8.5);
        y += bannerH + 4;
        // ── Explanation Section ──
        renderSection('EXPLANATION', BRAND.green, qExplanation);
        // ── Mnemonic Section ──
        renderSection('MNEMONIC', BRAND.purple, qMnemonic);
        // ── Clinical Pearl Section ──
        renderSection('CLINICAL PEARL', BRAND.darkGreen, qClinicalPearl);
        // ── Distractor Analysis Section ──
        renderSection('DISTRACTOR ANALYSIS', BRAND.amber, qDistractorAnalysis);
        // ── AI-generated note ──
        if (q.isAIGenerated) {
            ensureSpace(8);
            doc.setFontSize(7);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            doc.text('AI Generated', PW - MR, y, {
                align: 'right'
            });
            y += 5;
        }
    }
    // ══════════════════════════════════════════
    // FOOTER ON EVERY PAGE
    // ══════════════════════════════════════════
    const totalPages = doc.getNumberOfPages();
    for(let i = 1; i <= totalPages; i++){
        doc.setPage(i);
        // Skip fancy footer on title page (already has one)
        if (i === 1) continue;
        // Thin line above footer
        doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        doc.setLineWidth(0.3);
        doc.line(ML, PH - 14, PW - MR, PH - 14);
        // Footer text
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
        doc.text('MedQ \u2014 Medical Question Bank', ML, PH - 10);
        doc.text(`Page ${i - 1} of ${totalPages - 1}`, PW - MR, PH - 10, {
            align: 'right'
        });
    }
    // Save
    try {
        doc.save(pdfFilename);
    } catch (saveErr) {
        console.error('[MedQ PDF] Failed to save PDF:', saveErr);
        throw new Error('Failed to save PDF file. The document may be too large or your browser may have restricted downloads.');
    }
}
/**
 * Download a single question as PDF
 */ async function downloadSingleQuestionPDF(question) {
    await downloadAsPDF([
        question
    ], `medq-${question.topic || 'question'}-${getTimestamp()}.pdf`);
}
/* ═══════════════════════════════════════════════════════════════
   REFERENCE SHEET — Compact 2-column cheat sheet PDF
   ═══════════════════════════════════════════════════════════════ */ /**
 * Get the first sentence from a text string (plain or HTML).
 */ function getFirstSentence(html) {
    const plain = stripHtml(html);
    if (!plain) return '';
    // Match up to first period followed by space or end of string
    const match = plain.match(/^(.+?)(?:\.\s|\.$)/);
    if (match) return match[1] + '.';
    // If no period found, truncate to 120 chars
    return plain.length > 120 ? plain.slice(0, 117) + '...' : plain;
}
async function downloadReferenceSheet(questions, groupBy = 'system', filename) {
    const pdfFilename = filename || `medq-reference-sheet-${getTimestamp()}.pdf`;
    let jsPDFConstructor2;
    try {
        const jspdfModule = await __webpack_require__.e(/* import() */ 7847).then(__webpack_require__.bind(__webpack_require__, 637847));
        jsPDFConstructor2 = jspdfModule.jsPDF;
    } catch (importErr) {
        console.error('[MedQ PDF] Failed to import jsPDF for reference sheet:', importErr);
        throw new Error('PDF library failed to load. Please check your internet connection and try again.');
    }
    const doc = new jsPDFConstructor2({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    const PW = 210;
    const PH = 297;
    const ML = 12;
    const MR = 12;
    const MT = 12;
    const MB = 16;
    const CW = PW - ML - MR;
    const MAX_Y = PH - MB;
    const COL_GAP = 5;
    const COL_W = (CW - COL_GAP) / 2;
    let y = MT;
    let pageNum = 1;
    let currentCol = 0; // 0 = left, 1 = right
    // ── Helper: safe roundedRect ──
    const safeRoundedRect = (x, ry, w, h, r, style)=>{
        if (typeof doc.roundedRect === 'function') {
            doc.roundedRect(x, ry, w, h, r, r, style);
        } else {
            doc.rect(x, ry, w, h, style);
        }
    };
    // ── Helper: safe ellipse (replaces doc.circle for jsPDF v4) ──
    const safeEllipse = (cx, cy, rx, ry, style)=>{
        if (typeof doc.ellipse === 'function') {
            doc.ellipse(cx, cy, rx, ry, style);
        }
    };
    // ── Helper: add new page ──
    const addPage = ()=>{
        doc.addPage();
        pageNum++;
        y = MT;
        currentCol = 0;
    };
    // ── Helper: get current column X offset ──
    const colX = ()=>ML + currentCol * (COL_W + COL_GAP);
    // ── Helper: ensure enough space, switch column or add page ──
    const ensureSpace = (needed)=>{
        if (y + needed > MAX_Y) {
            if (currentCol === 0) {
                currentCol = 1;
                y = MT;
            } else {
                addPage();
            }
        }
    };
    // ══════════════════════════════════════════
    // TITLE PAGE
    // ══════════════════════════════════════════
    // Full-page light background
    doc.setFillColor(245, 251, 247);
    doc.rect(0, 0, PW, PH, 'F');
    // Green accent bar at top
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.rect(0, 0, PW, 5, 'F');
    // MedQ Logo
    y = 70;
    doc.setFontSize(42);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    doc.text('Med', PW / 2 - 12, y, {
        align: 'center'
    });
    const medW = doc.getTextWidth('Med');
    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.text('Q', PW / 2 - 12 + medW, y, {
        align: 'left'
    });
    // Title
    y += 14;
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    doc.text('Reference Sheet', PW / 2, y, {
        align: 'center'
    });
    // Subtitle
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('Compact Study Guide / Cheat Sheet', PW / 2, y, {
        align: 'center'
    });
    // Divider
    y += 14;
    doc.setDrawColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.setLineWidth(0.8);
    doc.line(PW / 2 - 35, y, PW / 2 + 35, y);
    // Document info
    y += 14;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
    const infoLines = [
        `${questions.length} Question${questions.length !== 1 ? 's' : ''} \u2022 Grouped by ${groupBy}`,
        `Date: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`
    ];
    const systems = new Set(questions.map((q)=>q.system || 'Uncategorized'));
    const topics = new Set(questions.map((q)=>q.topic || 'General'));
    if (groupBy === 'system') {
        infoLines.push(`${systems.size} System${systems.size !== 1 ? 's' : ''}: ${Array.from(systems).slice(0, 6).join(', ')}${systems.size > 6 ? '...' : ''}`);
    } else {
        infoLines.push(`${topics.size} Topic${topics.size !== 1 ? 's' : ''}: ${Array.from(topics).slice(0, 5).join(', ')}${topics.size > 5 ? '...' : ''}`);
    }
    // Difficulty breakdown
    const easy = questions.filter((q)=>q.difficulty === 'Easy').length;
    const basic = questions.filter((q)=>q.difficulty === 'Basic').length;
    const moderate = questions.filter((q)=>q.difficulty === 'Moderate' || q.difficulty === 'Medium').length;
    const hard = questions.filter((q)=>q.difficulty === 'Hard').length;
    const expert = questions.filter((q)=>q.difficulty === 'Expert').length;
    infoLines.push(`Difficulty: ${easy} Easy \u00B7 ${basic} Basic \u00B7 ${moderate} Moderate \u00B7 ${hard} Hard \u00B7 ${expert} Expert`);
    infoLines.forEach((line)=>{
        doc.text(line, PW / 2, y, {
            align: 'center'
        });
        y += 7;
    });
    // Print tips
    y += 12;
    doc.setFontSize(8);
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('\u2139\uFE0F  Print on A4 paper \u2022 Landscape recommended for more space \u2022 Green highlights = correct answers', PW / 2, y, {
        align: 'center'
    });
    // Footer on title page
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('Generated by MedQ \u2014 Medical Question Bank', PW / 2, PH - 12, {
        align: 'center'
    });
    // ══════════════════════════════════════════
    // GROUP QUESTIONS
    // ══════════════════════════════════════════
    const groups = {};
    for (const q of questions){
        const key = groupBy === 'system' ? q.system || 'Uncategorized' : q.topic || 'General';
        if (!groups[key]) groups[key] = [];
        groups[key].push(q);
    }
    // Sort group keys alphabetically
    const sortedGroupKeys = Object.keys(groups).sort();
    // Start content pages
    addPage();
    // ── Render a compact question card within current column ──
    const renderCompactCard = (q, qIndex, x, width)=>{
        let cardY = y;
        let cardH = 0;
        // ── Question header ──
        doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        doc.rect(x, cardY, width, 5.5, 'F');
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(`Q${qIndex + 1}`, x + 2, cardY + 3.8);
        // Difficulty indicator
        const diffClr = q.difficulty === 'Easy' ? [
            34,
            197,
            94
        ] : q.difficulty === 'Basic' ? [
            74,
            222,
            128
        ] : q.difficulty === 'Moderate' || q.difficulty === 'Medium' ? [
            245,
            158,
            11
        ] : q.difficulty === 'Hard' ? [
            249,
            115,
            22
        ] : [
            239,
            68,
            68
        ];
        doc.setFillColor(diffClr[0], diffClr[1], diffClr[2]);
        const diffW = doc.getTextWidth(q.difficulty) + 4;
        doc.rect(x + width - diffW - 1, cardY, diffW + 1, 5.5, 'F');
        doc.setFontSize(5.5);
        doc.text(q.difficulty, x + width - diffW / 2 - 0.5, cardY + 3.8, {
            align: 'center'
        });
        // Type badge
        const typeLabel = q.type === 'mcq' ? 'MCQ' : q.type === 'tf' ? 'T/F' : 'SA';
        const typeClr = q.type === 'mcq' ? BRAND.green : q.type === 'tf' ? BRAND.amber : BRAND.purple;
        doc.setFillColor(typeClr[0], typeClr[1], typeClr[2]);
        const typeW = doc.getTextWidth(typeLabel) + 4;
        doc.rect(x + 12, cardY, typeW + 1, 5.5, 'F');
        doc.text(typeLabel, x + 12 + typeW / 2, cardY + 3.8, {
            align: 'center'
        });
        cardY += 7;
        cardH += 7;
        // ── Question text (truncated to ~2 lines) ──
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
        const qText = stripHtml(q.text);
        const qLines = doc.splitTextToSize(qText, width - 4);
        // Limit to 2 lines
        const displayLines = qLines.slice(0, 2);
        const lineH = 3.3;
        for (const line of displayLines){
            doc.text(line, x + 2, cardY + lineH);
            cardY += lineH + 0.5;
            cardH += lineH + 0.5;
        }
        if (qLines.length > 2) {
            doc.setFontSize(6);
            doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
            doc.text('...', x + width - 6, cardY);
        }
        cardY += 1.5;
        cardH += 1.5;
        // ── Correct answer (highlighted in green) ──
        doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
        doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
        doc.setLineWidth(0.2);
        const answerText = stripHtml(q.answer);
        const ansLines = doc.splitTextToSize(`V ${answerText}`, width - 6);
        const ansH = Math.max(ansLines.length * 3 + 3, 5);
        safeRoundedRect(x + 1, cardY, width - 2, ansH, 1, 'FD');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        for (const al of ansLines){
            doc.text(al, x + 3, cardY + 3);
            cardY += 3;
        }
        cardY += 2;
        cardH += ansH + 2;
        // ── Key point from explanation (first sentence) ──
        const keyPoint = getFirstSentence(q.explanation);
        if (keyPoint) {
            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
            const kpLines = doc.splitTextToSize(keyPoint, width - 5);
            // Limit to 2 lines for compactness
            const kpDisplay = kpLines.slice(0, 2);
            for (const kp of kpDisplay){
                doc.text(kp, x + 2, cardY + 2.5);
                cardY += 2.5;
                cardH += 2.5;
            }
            if (kpLines.length > 2) {
                doc.setFontSize(5.5);
                doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
                doc.text('...', x + width - 5, cardY);
            }
            cardY += 1;
            cardH += 1;
        }
        // ── Mnemonic (in purple box) ──
        const mnemonicText = stripHtml(q.mnemonic || '');
        if (mnemonicText) {
            const mnemLines = doc.splitTextToSize(mnemonicText, width - 8);
            const mnemH = Math.max(mnemLines.length * 2.5 + 4, 6);
            doc.setFillColor(245, 243, 255); // light purple bg
            doc.setDrawColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
            doc.setLineWidth(0.2);
            safeRoundedRect(x + 1, cardY, width - 2, mnemH, 1, 'FD');
            // Left accent stripe
            doc.setFillColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
            doc.rect(x + 1, cardY, 1.5, mnemH, 'F');
            doc.setFontSize(5.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
            doc.text('MNEMONIC', x + 4, cardY + 2.5);
            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
            // Limit mnemonic display
            const mnemDisplay = mnemLines.slice(0, 2);
            let mnemY = cardY + 4.5;
            for (const ml of mnemDisplay){
                doc.text(ml, x + 4, mnemY);
                mnemY += 2.5;
            }
            cardY += mnemH + 1.5;
            cardH += mnemH + 1.5;
        }
        // ── Clinical Pearl (in amber box) ──
        const pearlText = stripHtml(q.clinicalPearl || '');
        if (pearlText) {
            const pearlLines = doc.splitTextToSize(pearlText, width - 8);
            const pearlH = Math.max(pearlLines.length * 2.5 + 4, 6);
            doc.setFillColor(255, 251, 235); // light amber bg
            doc.setDrawColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
            doc.setLineWidth(0.2);
            safeRoundedRect(x + 1, cardY, width - 2, pearlH, 1, 'FD');
            // Left accent stripe
            doc.setFillColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
            doc.rect(x + 1, cardY, 1.5, pearlH, 'F');
            doc.setFontSize(5.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
            doc.text('CLINICAL PEARL', x + 4, cardY + 2.5);
            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
            const pearlDisplay = pearlLines.slice(0, 2);
            let pearlY = cardY + 4.5;
            for (const pl of pearlDisplay){
                doc.text(pl, x + 4, pearlY);
                pearlY += 2.5;
            }
            cardY += pearlH + 1.5;
            cardH += pearlH + 1.5;
        }
        // ── Bottom border line ──
        doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        doc.setLineWidth(0.2);
        doc.line(x, cardY, x + width, cardY);
        cardH += 0.5;
        return cardH;
    };
    // ── Render a group header ──
    const renderGroupHeader = (groupName, count)=>{
        ensureSpace(18);
        const x = colX();
        // Group header background
        doc.setFillColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
        doc.rect(x, y, COL_W, 8, 'F');
        // Group icon (a small circle/dot)
        safeEllipse(x + 4, y + 4, 2, 2, 'F');
        doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        safeEllipse(x + 4, y + 4, 1.5, 1.5, 'F');
        // Group name
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(groupName, x + 8, y + 5.2);
        // Count badge
        const countText = `${count} Q`;
        doc.setFontSize(6);
        const countW = doc.getTextWidth(countText) + 4;
        doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        safeRoundedRect(x + COL_W - countW - 2, y + 1.5, countW, 5, 1.5, 'F');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(countText, x + COL_W - countW / 2 - 2, y + 4.5, {
            align: 'center'
        });
        y += 10;
        return 10;
    };
    // ══════════════════════════════════════════
    // RENDER ALL GROUPS
    // ══════════════════════════════════════════
    for (const groupKey of sortedGroupKeys){
        const groupQuestions = groups[groupKey];
        // Render group header
        renderGroupHeader(groupKey, groupQuestions.length);
        // Render each question card in the group
        groupQuestions.forEach((q, idx)=>{
            // Estimate card height (conservative)
            const estimatedH = 30 + (q.mnemonic ? 12 : 0) + (q.clinicalPearl ? 12 : 0);
            ensureSpace(Math.min(estimatedH, 50));
            const x = colX();
            const cardH = renderCompactCard(q, idx, x, COL_W);
            y += cardH + 2;
        });
        // Gap between groups
        y += 3;
    }
    // ══════════════════════════════════════════
    // FOOTER ON EVERY PAGE (except title)
    // ══════════════════════════════════════════
    const totalPages = doc.getNumberOfPages();
    for(let i = 1; i <= totalPages; i++){
        doc.setPage(i);
        // Skip fancy footer on title page
        if (i === 1) continue;
        // Thin line above footer
        doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        doc.setLineWidth(0.3);
        doc.line(ML, PH - 12, PW - MR, PH - 12);
        // Footer text
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
        doc.text('MedQ Reference Sheet \u2014 Medical Question Bank', ML, PH - 8);
        doc.text(`Page ${i - 1} of ${totalPages - 1}`, PW - MR, PH - 8, {
            align: 'right'
        });
        // Column divider line (subtle)
        if (i > 1) {
            doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
            doc.setLineWidth(0.15);
            doc.setLineDashPattern([
                1,
                2
            ], 0);
            doc.line(ML + COL_W + COL_GAP / 2, MT, ML + COL_W + COL_GAP / 2, PH - 14);
            doc.setLineDashPattern([], 0);
        }
    }
    // Save
    doc.save(pdfFilename);
}
/* ═══════════════════════════════════════════════════════════════
   HTML EXPORT — Standalone HTML with embedded styles
   ═══════════════════════════════════════════════════════════════ */ function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/**
 * Export a single question as a standalone HTML file.
 * - All CSS styles embedded inline
 * - Includes MedQ branding (header + footer)
 * - Embeds AI illustration image if available (as base64 data URL)
 * - Renders question text, options, answer, explanation, mnemonic, clinical pearl, distractor analysis
 */ async function exportAsHtml(question) {
    const LETTERS_ARR = [
        'A',
        'B',
        'C',
        'D'
    ];
    // Fetch the AI illustration as base64 if it's a server URL
    let embeddedImageSrc = '';
    if (question.imageUrl) {
        if (question.imageUrl.startsWith('data:')) {
            embeddedImageSrc = question.imageUrl;
        } else {
            try {
                const imgRes = await fetch(question.imageUrl);
                if (imgRes.ok) {
                    const imgBlob = await imgRes.blob();
                    const imgBase64 = await new Promise((resolve)=>{
                        const reader = new FileReader();
                        reader.onloadend = ()=>resolve(reader.result);
                        reader.readAsDataURL(imgBlob);
                    });
                    embeddedImageSrc = imgBase64;
                }
            } catch  {
                // If we can't fetch the image, just use the URL
                embeddedImageSrc = question.imageUrl;
            }
        }
    }
    // Build options HTML
    let optionsHtml = '';
    if (question.type === 'mcq' && question.options.length > 0) {
        optionsHtml = `<div class="options-list">${question.options.map((opt, i)=>{
            const isCorrect = stripHtml(opt).toLowerCase().trim() === stripHtml(question.answer).toLowerCase().trim();
            return `<div class="option-item ${isCorrect ? 'option-correct' : ''}">
        <span class="option-letter">${LETTERS_ARR[i]}</span>
        <span class="option-text">${opt}</span>
        ${isCorrect ? '<span class="option-check">&#10003;</span>' : ''}
      </div>`;
        }).join('')}</div>`;
    } else if (question.type === 'tf') {
        optionsHtml = `<div class="options-list tf-list">
      ${[
            'True',
            'False'
        ].map((val)=>{
            const isCorrect = val.toLowerCase() === question.answer.toLowerCase();
            return `<div class="option-item ${isCorrect ? 'option-correct' : ''}">
          <span class="option-letter">${val[0]}</span>
          <span class="option-text">${val}</span>
          ${isCorrect ? '<span class="option-check">&#10003;</span>' : ''}
        </div>`;
        }).join('')}
    </div>`;
    }
    // Build AI illustration HTML
    let illustrationHtml = '';
    if (embeddedImageSrc) {
        illustrationHtml = `<div class="ai-illustration">
      <img src="${embeddedImageSrc}" alt="AI-generated medical illustration" />
    </div>`;
    }
    // Build section HTML helper
    const sectionHtml = (icon, title, content, color)=>{
        if (!content) return '';
        const plainCheck = stripHtml(content);
        if (!plainCheck) return '';
        return `<div class="section">
      <div class="section-header">
        <span class="section-icon" style="background:${color}">${icon}</span>
        <h3 class="section-title">${escapeHtml(title)}</h3>
      </div>
      <div class="section-content medq-html-preview">${content}</div>
    </div>`;
    };
    const typeLabel = question.type === 'mcq' ? 'MCQ' : question.type === 'tf' ? 'True/False' : 'Short Answer';
    const diffColor = question.difficulty === 'Easy' ? '#22c55e' : question.difficulty === 'Basic' ? '#4ade80' : question.difficulty === 'Moderate' || question.difficulty === 'Medium' ? '#f59e0b' : question.difficulty === 'Hard' ? '#f97316' : '#ef4444';
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MedQ - ${escapeHtml(question.topic || 'Question')}</title>
  <style>
    /* ─── Reset & Base ─── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0c0e14;
      color: #e8ecf4;
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      line-height: 1.7;
      min-height: 100vh;
    }

    /* ─── Layout ─── */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ─── Header ─── */
    .header {
      text-align: center;
      padding: 40px 0 24px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      margin-bottom: 32px;
    }
    .header-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .header-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #00e5a0, #00b87a);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 4px 16px rgba(0,229,160,0.25);
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header h1 .accent { color: #00e5a0; }
    .header-subtitle {
      font-size: 13px;
      color: #5a6478;
      margin-top: 4px;
    }

    /* ─── Question Card ─── */
    .question-card {
      background: #151821;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }

    /* ─── Badges ─── */
    .badges {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 24px 0;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge-type { background: rgba(0,229,160,0.1); color: #00e5a0; }
    .badge-difficulty { background: ${diffColor}18; color: ${diffColor}; }
    .badge-system { background: rgba(255,255,255,0.04); color: #5a6478; border: 1px solid rgba(255,255,255,0.06); }
    .badge-topic { background: rgba(79,195,247,0.08); color: #4fc3f7; }
    .badge-ai { background: rgba(179,136,255,0.08); color: #b388ff; }

    /* ─── Question Text ─── */
    .question-text {
      padding: 16px 24px 12px;
      font-size: 15px;
      line-height: 1.7;
      color: #e8ecf4;
    }

    /* ─── Options ─── */
    .options-list {
      padding: 0 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tf-list { flex-direction: row; gap: 10px; }
    .tf-list .option-item { flex: 1; justify-content: center; text-align: center; }
    .option-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: #1a1e2b;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      transition: all 0.2s;
    }
    .option-correct {
      background: rgba(0,229,160,0.06) !important;
      border-color: rgba(0,229,160,0.3) !important;
    }
    .option-letter {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: #5a6478;
    }
    .option-correct .option-letter {
      background: #00e5a0 !important;
      border-color: #00e5a0 !important;
      color: #0c0e14 !important;
    }
    .option-text {
      font-size: 14px;
      color: #c8d0e0;
      line-height: 1.5;
    }
    .option-correct .option-text { color: #00e5a0; font-weight: 600; }
    .option-check { color: #00e5a0; font-size: 16px; margin-left: auto; font-weight: 700; }

    /* ─── AI Illustration ─── */
    .ai-illustration {
      padding: 0 24px 16px;
    }
    .ai-illustration img {
      width: 100%;
      max-width: 100%;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      object-fit: contain;
      max-height: 400px;
    }

    /* ─── Answer Banner ─── */
    .correct-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      margin: 0 24px 22px;
      border-radius: 12px;
      background: rgba(0,229,160,0.06);
      border: 1px solid rgba(0,229,160,0.2);
      font-size: 15px;
      font-weight: 600;
      color: #00e5a0;
    }
    .correct-banner svg { flex-shrink: 0; }

    /* ─── Sections ─── */
    .sections {
      padding: 24px;
      border-top: 1px solid rgba(255,255,255,0.05);
      background: linear-gradient(180deg, rgba(0,229,160,0.02), transparent 40%);
    }
    .section { margin-bottom: 24px; }
    .section:last-child { margin-bottom: 0; }
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .section-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #e8ecf4;
      letter-spacing: 0.3px;
    }
    .section-content {
      color: #b8c2d4;
      font-size: 14px;
      line-height: 1.75;
      word-break: break-word;
    }
    .section-content strong { color: #e8ecf4; font-weight: 700; }
    .section-content em { color: #8b95a8; font-style: italic; }
    .section-content ul, .section-content ol { padding-left: 20px; margin: 8px 0; }
    .section-content li { margin: 4px 0; }
    .section-content p { margin: 8px 0; }

    /* ─── MedQ HTML Preview Classes ─── */
    .medq-html-preview .q-hl { background: rgba(0,229,160,0.14); color: #00e5a0; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(0,229,160,0.15); }
    .medq-html-preview .q-hl-red { background: rgba(255,87,87,0.14); color: #ff5757; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(255,87,87,0.15); }
    .medq-html-preview .q-hl-green { background: rgba(34,197,94,0.14); color: #22c55e; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(34,197,94,0.15); }
    .medq-html-preview .q-hl-amber { background: rgba(255,179,71,0.14); color: #ffb347; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(255,179,71,0.15); }
    .medq-html-preview .q-hl-purple { background: rgba(179,136,255,0.14); color: #b388ff; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(179,136,255,0.15); }

    .medq-html-preview .q-callout { padding: 16px 20px; border-radius: 0 14px 14px 0; border-left: 4px solid; margin: 14px 0; font-size: 13.5px; line-height: 1.75; color: #b8c2d4; }
    .medq-html-preview .q-callout strong { font-weight: 700; }
    .medq-html-preview .q-callout-blue { background: rgba(79,195,247,0.06); border-left-color: #4fc3f7; }
    .medq-html-preview .q-callout-blue strong { color: #4fc3f7; }
    .medq-html-preview .q-callout-green { background: rgba(34,197,94,0.06); border-left-color: #22c55e; }
    .medq-html-preview .q-callout-green strong { color: #22c55e; }
    .medq-html-preview .q-callout-red { background: rgba(255,87,87,0.06); border-left-color: #ff5757; }
    .medq-html-preview .q-callout-red strong { color: #ff5757; }
    .medq-html-preview .q-callout-amber { background: rgba(255,179,71,0.06); border-left-color: #ffb347; }
    .medq-html-preview .q-callout-amber strong { color: #ffb347; }
    .medq-html-preview .q-callout-purple { background: rgba(179,136,255,0.06); border-left-color: #b388ff; }
    .medq-html-preview .q-callout-purple strong { color: #b388ff; }

    .medq-html-preview .q-flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 18px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); margin: 14px 0; }
    .medq-html-preview .q-node { display: inline-flex; align-items: center; padding: 9px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; white-space: nowrap; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8b95a8; }
    .medq-html-preview .q-node-red { background: rgba(255,87,87,0.1); border-color: rgba(255,87,87,0.25); color: #ff5757; }
    .medq-html-preview .q-node-green { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.25); color: #22c55e; }
    .medq-html-preview .q-node-blue { background: rgba(79,195,247,0.1); border-color: rgba(79,195,247,0.25); color: #4fc3f7; }
    .medq-html-preview .q-node-purple { background: rgba(179,136,255,0.1); border-color: rgba(179,136,255,0.25); color: #b388ff; }
    .medq-html-preview .q-node-orange { background: rgba(255,179,71,0.1); border-color: rgba(255,179,71,0.25); color: #ffb347; }
    .medq-html-preview .q-node-blocked { background: rgba(255,255,255,0.03); border: 2px dashed rgba(255,87,87,0.35); color: #5a6478; text-decoration: line-through; opacity: 0.7; }
    .medq-html-preview .q-arrow { font-size: 16px; font-weight: 700; color: #3a4055; flex-shrink: 0; }

    .medq-html-preview .q-mnemo { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; justify-content: center; padding: 24px; background: rgba(255,255,255,0.025); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); margin: 14px 0; }
    .medq-html-preview .q-letter { width: 50px; height: 50px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 21px; font-weight: 900; color: #fff; flex-shrink: 0; }
    .medq-html-preview .q-letter-text { font-size: 11px; font-weight: 600; color: #5a6478; text-align: center; max-width: 60px; line-height: 1.4; margin-top: 6px; }

    .medq-html-preview .q-card { padding: 15px 17px; border-radius: 12px; border-left: 4px solid; margin: 8px 0; font-size: 13px; line-height: 1.7; color: #b8c2d4; }
    .medq-html-preview .q-card strong { font-weight: 700; }
    .medq-html-preview .q-card-blue { background: rgba(79,195,247,0.04); border-left-color: rgba(79,195,247,0.4); }
    .medq-html-preview .q-card-blue strong { color: #4fc3f7; }
    .medq-html-preview .q-card-red { background: rgba(255,87,87,0.04); border-left-color: rgba(255,87,87,0.4); }
    .medq-html-preview .q-card-red strong { color: #ff5757; }
    .medq-html-preview .q-card-green { background: rgba(34,197,94,0.04); border-left-color: rgba(34,197,94,0.4); }
    .medq-html-preview .q-card-green strong { color: #22c55e; }
    .medq-html-preview .q-card-orange { background: rgba(255,179,71,0.04); border-left-color: rgba(255,179,71,0.4); }
    .medq-html-preview .q-card-orange strong { color: #ffb347; }
    .medq-html-preview .q-card-purple { background: rgba(179,136,255,0.04); border-left-color: rgba(179,136,255,0.4); }
    .medq-html-preview .q-card-purple strong { color: #b388ff; }
    .medq-html-preview .q-card-correct { background: rgba(0,229,160,0.06); border-left-color: #00e5a0; }
    .medq-html-preview .q-card-correct strong { color: #00e5a0; }

    .medq-html-preview .q-grid { display: grid; gap: 10px; margin: 12px 0; }
    .medq-html-preview .q-grid-2 { grid-template-columns: 1fr 1fr; }
    .medq-html-preview .q-grid-3 { grid-template-columns: 1fr 1fr 1fr; }

    .medq-html-preview .q-list { list-style: none; padding: 0; margin: 12px 0; }
    .medq-html-preview .q-list li { position: relative; padding: 8px 0 8px 24px; font-size: 13.5px; line-height: 1.65; color: #b8c2d4; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .medq-html-preview .q-list li:last-child { border-bottom: none; }
    .medq-html-preview .q-list li::before { content: '\\2192'; position: absolute; left: 4px; color: #00e5a0; font-weight: 700; font-size: 12px; }

    .medq-html-preview .q-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; white-space: nowrap; }
    .medq-html-preview .q-badge-blue { background: rgba(79,195,247,0.1); color: #4fc3f7; }
    .medq-html-preview .q-badge-red { background: rgba(255,87,87,0.1); color: #ff5757; }
    .medq-html-preview .q-badge-green { background: rgba(34,197,94,0.1); color: #22c55e; }
    .medq-html-preview .q-badge-amber { background: rgba(255,179,71,0.1); color: #ffb347; }
    .medq-html-preview .q-badge-purple { background: rgba(179,136,255,0.1); color: #b388ff; }

    .medq-html-preview .q-label { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 6px; }
    .medq-html-preview .q-label-blue { background: rgba(79,195,247,0.08); color: #4fc3f7; }
    .medq-html-preview .q-label-red { background: rgba(255,87,87,0.08); color: #ff5757; }
    .medq-html-preview .q-label-green { background: rgba(34,197,94,0.08); color: #22c55e; }
    .medq-html-preview .q-label-amber { background: rgba(255,179,71,0.08); color: #ffb347; }
    .medq-html-preview .q-label-purple { background: rgba(179,136,255,0.08); color: #b388ff; }

    .medq-html-preview .q-svg { margin: 14px 0; padding: 16px; background: rgba(255,255,255,0.015); border-radius: 14px; border: 1px solid rgba(255,255,255,0.04); overflow-x: auto; text-align: center; }
    .medq-html-preview .q-svg svg { max-width: 100%; height: auto; }

    .medq-html-preview .q-compare { width: 100%; border-collapse: separate; border-spacing: 0; margin: 14px 0; font-size: 13px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
    .medq-html-preview .q-compare-head { background: rgba(255,255,255,0.04); }
    .medq-html-preview .q-compare-head .q-compare-cell { padding: 10px 14px; font-weight: 700; color: #8b95a8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .medq-html-preview .q-compare-row:hover { background: rgba(255,255,255,0.02); }
    .medq-html-preview .q-compare-cell { padding: 10px 14px; color: #b8c2d4; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: top; }

    .medq-html-preview .q-table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 10px 0; font-size: 12.5px; }
    .medq-html-preview .q-table thead th { background: linear-gradient(135deg, #1e3a5f, #2c6fbb); color: #fff; padding: 11px 14px; font-weight: 700; text-align: left; font-size: 11.5px; letter-spacing: 0.5px; }
    .medq-html-preview .q-table tbody td { padding: 10px 14px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.04); font-weight: 500; color: #b8c2d4; }
    .medq-html-preview .q-table tbody tr:last-child td { border-bottom: none; }

    .medq-html-preview .q-timeline { position: relative; padding-left: 28px; margin: 12px 0; }
    .medq-html-preview .q-timeline::before { content: ''; position: absolute; left: 10px; top: 4px; bottom: 4px; width: 3px; background: linear-gradient(180deg, #22c55e, #ffb347, #ff5757); border-radius: 2px; }
    .medq-html-preview .q-timeline-item { position: relative; padding: 10px 14px; margin-bottom: 8px; background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); font-size: 13px; font-weight: 500; color: #b8c2d4; line-height: 1.7; }
    .medq-html-preview .q-timeline-item strong { color: #e8ecf4; }

    .medq-html-preview .q-kv { display: flex; gap: 8px; padding: 6px 0; font-size: 13px; }
    .medq-html-preview .q-kv-key { color: #5a6478; font-weight: 600; min-width: 100px; }
    .medq-html-preview .q-kv-val { color: #b8c2d4; }

    /* ─── Footer ─── */
    .footer {
      text-align: center;
      padding: 24px 0 32px;
      margin-top: 40px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .footer-text {
      font-size: 12px;
      color: #3a4055;
    }
    .footer-meta {
      font-size: 10px;
      color: #3a4055;
      margin-top: 6px;
    }

    /* ─── Responsive ─── */
    @media (max-width: 640px) {
      .container { padding: 0 16px; }
      .header h1 { font-size: 24px; }
      .badges { padding: 12px 16px 0; }
      .question-text { padding: 12px 16px 8px; }
      .options-list { padding: 0 16px 12px; }
      .correct-banner { margin: 0 16px 16px; }
      .sections { padding: 16px; }
      .medq-html-preview .q-grid-2,
      .medq-html-preview .q-grid-3 { grid-template-columns: 1fr; }
      .medq-html-preview .q-flow { gap: 4px; padding: 12px; }
      .medq-html-preview .q-node { padding: 6px 10px; font-size: 11px; }
      .medq-html-preview .q-mnemo { padding: 16px; gap: 8px; }
      .medq-html-preview .q-letter { width: 40px; height: 40px; font-size: 17px; }
      .tf-list { flex-direction: column !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="header-logo">
        <div class="header-icon">&#129658;</div>
        <h1>Med<span class="accent">Q</span></h1>
      </div>
      <p class="header-subtitle">Medical Question Bank</p>
    </header>

    <!-- Question Card -->
    <article class="question-card">
      <!-- Badges -->
      <div class="badges">
        <span class="badge badge-type">${escapeHtml(typeLabel)}</span>
        <span class="badge badge-difficulty">${escapeHtml(question.difficulty)}</span>
        <span class="badge badge-system">${escapeHtml(question.system)}</span>
        ${question.topic && question.topic !== question.system ? `<span class="badge badge-topic">${escapeHtml(question.topic)}</span>` : ''}
        ${question.tags.slice(0, 3).map((t)=>`<span class="badge badge-topic">${escapeHtml(t)}</span>`).join('')}
        ${question.isAIGenerated ? '<span class="badge badge-ai">&#10024; AI</span>' : ''}
      </div>

      <!-- Question Text -->
      <div class="question-text medq-html-preview">${question.text}</div>

      <!-- AI Illustration -->
      ${illustrationHtml}

      <!-- Options -->
      ${optionsHtml}

      <!-- Short Answer -->
      ${question.type === 'short' ? `<div class="correct-banner">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#00e5a0" fill-opacity="0.15"/><path d="M6 10.5L8.5 13L14 7" stroke="#00e5a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Expected Answer: <strong>${question.answer}</strong></span>
      </div>` : ''}

      <!-- Correct Answer Banner -->
      ${question.type !== 'short' ? `<div class="correct-banner">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#00e5a0" fill-opacity="0.15"/><path d="M6 10.5L8.5 13L14 7" stroke="#00e5a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Correct Answer: <strong>${question.answer}</strong></span>
      </div>` : ''}

      <!-- Sections -->
      <div class="sections">
        ${sectionHtml('&#129504;', 'Explanation', question.explanation, 'rgba(79,195,247,0.1)')}
        ${sectionHtml('&#128161;', 'Mnemonic', question.mnemonic, 'rgba(179,136,255,0.1)')}
        ${sectionHtml('&#127919;', 'Clinical Pearl', question.clinicalPearl, 'rgba(255,179,71,0.1)')}
        ${sectionHtml('&#128269;', 'Distractor Analysis', question.distractorAnalysis, 'rgba(249,115,22,0.1)')}
      </div>
    </article>

    <!-- Footer -->
    <footer class="footer">
      <p class="footer-text">MedQ &mdash; Medical Question Bank &middot; Powered by AI</p>
      <p class="footer-meta">Exported on ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })} at ${new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    </footer>
  </div>
</body>
</html>`;
    const blob = new Blob([
        html
    ], {
        type: 'text/html;charset=utf-8'
    });
    triggerDownload(blob, `medq-${question.topic || 'question'}-${getTimestamp()}.html`);
}


/***/ }),

/***/ 468848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ DiagramRenderer)
/* harmony export */ });
/**
 * DiagramRenderer — renders rich interactive SVG pathway diagrams from JSON specs.
 * Features: step numbers, START/END markers, animated flow dots, T-bar inhibition,
 * feedback curves with ↩ labels, pathway direction indicator, key steps summary,
 * rich tooltips, enhanced color coding, auto-layout with topological sort + barycenter.
 * Pure DOM / TypeScript, no React/JSX.
 */ const SVG_NS = 'http://www.w3.org/2000/svg';
// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DEFAULT_OPTIONS = {
    nodeWidth: 180,
    nodeHeight: 74,
    diamondWidth: 150,
    diamondHeight: 84,
    layerGap: 280,
    nodeGap: 110,
    padding: 80,
    animate: true,
    bg: '#0c0f1a'
};
const NODE_STYLES = {
    enzyme: {
        gradientFrom: '#F97316',
        gradientTo: '#EA580C',
        shape: 'hexagon',
        glowColor: '#F9731640'
    },
    substrate: {
        gradientFrom: '#3B82F6',
        gradientTo: '#2563EB',
        shape: 'rect',
        glowColor: '#3B82F640'
    },
    product: {
        gradientFrom: '#8B5CF6',
        gradientTo: '#7C3AED',
        shape: 'rect',
        glowColor: '#8B5CF640'
    },
    receptor: {
        gradientFrom: '#6366F1',
        gradientTo: '#4338CA',
        shape: 'pill',
        glowColor: '#6366F140'
    },
    effect: {
        gradientFrom: '#EF4444',
        gradientTo: '#DC2626',
        shape: 'rect',
        glowColor: '#EF444440'
    },
    outcome: {
        gradientFrom: '#22C55E',
        gradientTo: '#16A34A',
        shape: 'rect',
        glowColor: '#22C55E40',
        indicator: '✓'
    },
    organ: {
        gradientFrom: '#14B8A6',
        gradientTo: '#0D9488',
        shape: 'rect',
        glowColor: '#14B8A640'
    },
    drug: {
        gradientFrom: '#10B981',
        gradientTo: '#059669',
        shape: 'pill',
        glowColor: '#10B98140',
        indicator: '✦'
    },
    blocked: {
        gradientFrom: '#6B7280',
        gradientTo: '#4B5563',
        shape: 'rect',
        dashArray: '6 3',
        glowColor: '#6B728040',
        indicator: '⊘'
    },
    decision: {
        gradientFrom: '#F59E0B',
        gradientTo: '#D97706',
        shape: 'diamond',
        glowColor: '#F59E0B40'
    },
    info: {
        gradientFrom: '#64748B',
        gradientTo: '#475569',
        shape: 'rect',
        glowColor: '#64748B40'
    },
    hormone: {
        gradientFrom: '#EC4899',
        gradientTo: '#DB2777',
        shape: 'pill',
        glowColor: '#EC489940'
    },
    ion: {
        gradientFrom: '#FBBF24',
        gradientTo: '#F59E0B',
        shape: 'rect',
        glowColor: '#FBBF2440',
        indicator: '⚡'
    },
    gene: {
        gradientFrom: '#A78BFA',
        gradientTo: '#7C3AED',
        shape: 'hexagon',
        glowColor: '#A78BFA40'
    }
};
// Organ SVG icon paths (simplified anatomical shapes)
const ORGAN_ICONS = {
    heart: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.3"/>`,
    brain: `<ellipse cx="12" cy="10" rx="8" ry="7" fill="currentColor" opacity="0.25"/><path d="M9 6c-2 1-3 3-2.5 5M15 6c2 1 3 3 2.5 5M9 10c-1.5 1-2 3-1 4.5M15 10c1.5 1 2 3 1 4.5M12 5v12" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.5"/>`,
    lung: `<path d="M6 18c0-4 1-8 4-10v-4M18 18c0-4-1-8-4-10v-4M8 14c-1 2-1 4 0 5M16 14c1 2 1 4 0 5" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><path d="M6 18c0 1 2 2 4 2h0M18 18c0 1-2 2-4 2h0" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.3"/>`,
    kidney: `<path d="M12 4c-4 0-6 3-6 7s2 8 6 8 6-4 6-8-2-7-6-7z" fill="currentColor" opacity="0.25"/><path d="M9 8c0 2 1 4 3 5M12 6v10" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>`,
    liver: `<path d="M4 12c0-4 4-7 10-7s8 3 8 6-3 6-8 7-10-2-10-6z" fill="currentColor" opacity="0.25"/><path d="M8 9c2 1 5 1 8 0" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>`,
    vessel: `<path d="M4 10c2-3 6-3 8 0s6 3 8 0" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.4"/><path d="M4 14c2-3 6-3 8 0s6 3 8 0" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25"/>`,
    bone: `<path d="M6 8c-2 0-3 2-2 3s2 1 3 0l5 5c-1 1-1 3 0 3s3-1 3-2l2-2c1 1 3 1 3-1s-1-3-2-2l-5-5c1-1 1-3-1-3s-3 1-2 2z" fill="currentColor" opacity="0.25"/>`,
    eye: `<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" fill="currentColor" opacity="0.2"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4"/>`,
    stomach: `<path d="M8 4c0 0-4 2-4 8s4 10 8 10 6-4 6-8-2-8-6-10" fill="currentColor" opacity="0.25"/><path d="M10 6c2 2 4 4 4 8" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>`,
    pancreas: `<path d="M4 10c2-2 6-1 10 0s6 2 6 4-3 3-7 2-8-2-9-6z" fill="currentColor" opacity="0.25"/>`,
    thyroid: `<path d="M8 8c-2 0-3 2-2 4s3 3 6 3 5-1 6-3 0-4-2-4h-8z" fill="currentColor" opacity="0.25"/>`,
    adrenal: `<path d="M8 6c-3 2-3 6 0 8s8 2 10-1 1-7-2-8-5-1-8 1z" fill="currentColor" opacity="0.25"/>`,
    pituitary: `<ellipse cx="12" cy="12" rx="6" ry="5" fill="currentColor" opacity="0.25"/><path d="M9 10h6M9 12h4M9 14h6" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.3"/>`,
    ovary: `<ellipse cx="12" cy="12" rx="7" ry="5" fill="currentColor" opacity="0.25"/><circle cx="10" cy="11" r="2" fill="currentColor" opacity="0.2"/><circle cx="14" cy="13" r="1.5" fill="currentColor" opacity="0.2"/>`,
    testis: `<ellipse cx="12" cy="12" rx="5" ry="7" fill="currentColor" opacity="0.25"/><path d="M10 8c1 3 1 6 0 8M14 8c-1 3-1 6 0 8" stroke="currentColor" stroke-width="0.6" fill="none" opacity="0.3"/>`
};
// Node type emoji icons (small, shown at left of node)
const TYPE_ICONS = {
    enzyme: '⚗️',
    substrate: '🧪',
    product: '📦',
    receptor: '📡',
    effect: '⚡',
    outcome: '🎯',
    organ: '🫀',
    drug: '💊',
    blocked: '🚫',
    decision: '❓',
    info: 'ℹ️',
    hormone: '🧬',
    ion: '⚡',
    gene: '🧬'
};
// Edge type directional indicators
const EDGE_INDICATORS = {
    normal: '→',
    activation: '→',
    inhibition: '⊣',
    conversion: '→',
    feedback: '↩'
};
const EDGE_VERBS = {
    normal: '',
    activation: 'activates',
    inhibition: 'blocks',
    conversion: 'converts',
    feedback: 'feedback'
};
// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------
function svgEl(tag) {
    return document.createElementNS(SVG_NS, tag);
}
function setAttrs(el, attrs) {
    for (const [k, v] of Object.entries(attrs)){
        el.setAttribute(k, String(v));
    }
}
function rectIntersection(cx, cy, w, h, tx, ty) {
    const dx = tx - cx;
    const dy = ty - cy;
    if (dx === 0 && dy === 0) return {
        x: cx,
        y: cy
    };
    const hw = w / 2;
    const hh = h / 2;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    let scale;
    if (absDx * hh > absDy * hw) {
        scale = hw / absDx;
    } else {
        scale = hh / absDy;
    }
    return {
        x: cx + dx * scale,
        y: cy + dy * scale
    };
}
function diamondIntersection(cx, cy, w, h, tx, ty) {
    const dx = tx - cx;
    const dy = ty - cy;
    if (dx === 0 && dy === 0) return {
        x: cx,
        y: cy
    };
    const hw = w / 2;
    const hh = h / 2;
    const t = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
    return {
        x: cx + dx * t,
        y: cy + dy * t
    };
}
// ---------------------------------------------------------------------------
// DiagramRenderer
// ---------------------------------------------------------------------------
class DiagramRenderer {
    constructor(container, options){
        this.svg = null;
        this.tooltip = null;
        this.styleEl = null;
        this.nodeLayouts = new Map();
        this.nodeGroups = new Map();
        this.edgePaths = [];
        this.spec = null;
        this.selectedId = null;
        // Step number tracking: nodeId → 1-based step number
        this.stepNumbers = new Map();
        this.maxLayer = 0;
        this.clickHandler = null;
        this.moveHandler = null;
        this.keyHandler = null;
        this.container = container;
        this.opts = {
            ...DEFAULT_OPTIONS,
            ...options
        };
    }
    destroy() {
        this.removeGlobalListeners();
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
        if (this.styleEl) {
            this.styleEl.remove();
            this.styleEl = null;
        }
        if (this.svg) {
            this.svg.remove();
            this.svg = null;
        }
        this.nodeLayouts.clear();
        this.nodeGroups.clear();
        this.edgePaths = [];
        this.spec = null;
        this.selectedId = null;
        this.stepNumbers.clear();
    }
    render(spec) {
        this.destroy();
        this.spec = spec;
        this.computeLayout(spec);
        const svg = svgEl('svg');
        svg.setAttribute('xmlns', SVG_NS);
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        svg.style.minHeight = '280px';
        this.svg = svg;
        this.renderDefs(svg, spec);
        // Background with subtle grid
        const bg = svgEl('rect');
        setAttrs(bg, {
            x: -5000,
            y: -5000,
            width: 10000,
            height: 10000,
            fill: this.opts.bg
        });
        svg.appendChild(bg);
        // Subtle grid pattern
        const gridG = svgEl('g');
        gridG.setAttribute('class', 'diagram-grid');
        gridG.innerHTML = this.buildGridPattern();
        svg.appendChild(gridG);
        // Pathway direction indicator (semi-transparent arrow watermark)
        this.renderDirectionIndicator(svg, spec);
        // Title
        if (spec.title) {
            const titleY = this.getMinY() - 48;
            const titleWidth = spec.title.length * 11 + 40;
            const centerX = this.getCenterX();
            const titleBg = svgEl('rect');
            setAttrs(titleBg, {
                x: centerX - titleWidth / 2,
                y: titleY - 22,
                width: titleWidth,
                height: 32,
                rx: 8,
                fill: 'rgba(0,229,160,0.08)',
                stroke: 'rgba(0,229,160,0.2)',
                'stroke-width': 1
            });
            svg.appendChild(titleBg);
            const titleEl = svgEl('text');
            setAttrs(titleEl, {
                x: centerX,
                y: titleY,
                fill: '#00e5a0',
                'font-size': 16,
                'font-weight': 700,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central'
            });
            titleEl.textContent = `🧬 ${spec.title}`;
            svg.appendChild(titleEl);
        }
        // Groups
        if (spec.groups) {
            this.renderGroups(svg, spec);
        }
        // Edges
        this.renderEdges(svg, spec);
        // Nodes
        this.renderNodes(svg, spec);
        // Legend
        this.renderLegend(svg, spec);
        // Key Steps Summary Bar
        this.renderKeyStepsBar(svg, spec);
        this.applyViewBox(svg);
        if (this.opts.animate) {
            this.injectAnimationStyles();
        }
        this.container.appendChild(svg);
        this.createTooltip();
        this.setupInteractivity();
    }
    // -----------------------------------------------------------------------
    // Layout (improved: bigger nodes, larger layer gap, step numbers)
    // -----------------------------------------------------------------------
    computeLayout(spec) {
        const isHorizontal = spec.layout !== 'vertical';
        const nodeMap = new Map(spec.nodes.map((n)=>[
                n.id,
                n
            ]));
        const inDeg = new Map();
        const adj = new Map();
        const radj = new Map();
        for (const n of spec.nodes){
            inDeg.set(n.id, 0);
            adj.set(n.id, []);
            radj.set(n.id, []);
        }
        for (const e of spec.edges){
            if (e.type === 'feedback') continue;
            if (!adj.has(e.from) || !adj.has(e.to)) continue;
            adj.get(e.from).push(e.to);
            radj.get(e.to).push(e.from);
            inDeg.set(e.to, (inDeg.get(e.to) ?? 0) + 1);
        }
        const queue = [];
        for (const [id, d] of inDeg){
            if (d === 0) queue.push(id);
        }
        const topoOrder = [];
        while(queue.length){
            const cur = queue.shift();
            topoOrder.push(cur);
            for (const nxt of adj.get(cur) ?? []){
                const nd = (inDeg.get(nxt) ?? 1) - 1;
                inDeg.set(nxt, nd);
                if (nd === 0) queue.push(nxt);
            }
        }
        for (const [id, d] of inDeg){
            if (d > 0) topoOrder.push(id);
        }
        const layer = new Map();
        for (const id of topoOrder){
            let maxPrev = -1;
            for (const prev of radj.get(id) ?? []){
                if (layer.has(prev)) maxPrev = Math.max(maxPrev, layer.get(prev));
            }
            layer.set(id, maxPrev + 1);
        }
        const layers = new Map();
        for (const [id, l] of layer){
            if (!layers.has(l)) layers.set(l, []);
            layers.get(l).push(id);
        }
        this.maxLayer = Math.max(...layer.values(), 0);
        // Assign step numbers based on layer (1-based, per layer order)
        this.stepNumbers.clear();
        let globalStep = 1;
        for(let l = 0; l <= this.maxLayer; l++){
            const layerNodes = layers.get(l) ?? [];
            for (const id of layerNodes){
                this.stepNumbers.set(id, globalStep++);
            }
        }
        const slot = new Map();
        for(let l = 0; l <= this.maxLayer; l++){
            const nodes = layers.get(l) ?? [];
            nodes.forEach((id, i)=>slot.set(id, i));
        }
        // Barycenter refinement
        for(let iter = 0; iter < 5; iter++){
            for(let l = 0; l <= this.maxLayer; l++){
                const nodes = layers.get(l) ?? [];
                const bary = new Map();
                for (const id of nodes){
                    const neighbours = [
                        ...adj.get(id) ?? [],
                        ...radj.get(id) ?? []
                    ];
                    if (neighbours.length === 0) {
                        bary.set(id, slot.get(id) ?? 0);
                    } else {
                        const sum = neighbours.reduce((s, n)=>s + (slot.get(n) ?? 0), 0);
                        bary.set(id, sum / neighbours.length);
                    }
                }
                nodes.sort((a, b)=>(bary.get(a) ?? 0) - (bary.get(b) ?? 0));
                nodes.forEach((id, i)=>slot.set(id, i));
                layers.set(l, nodes);
            }
        }
        // Compute even spacing for nodes within each layer
        this.nodeLayouts.clear();
        for (const id of topoOrder){
            const node = nodeMap.get(id);
            const l = layer.get(id) ?? 0;
            const s = slot.get(id) ?? 0;
            const isDiamond = NODE_STYLES[node.type || 'info']?.shape === 'diamond';
            const w = isDiamond ? this.opts.diamondWidth : this.opts.nodeWidth;
            const h = isDiamond ? this.opts.diamondHeight : this.opts.nodeHeight;
            let x, y;
            // Use user-specified position if provided, otherwise auto-layout
            if (node.x !== undefined && node.y !== undefined) {
                x = node.x;
                y = node.y;
            } else if (isHorizontal) {
                x = this.opts.padding + l * this.opts.layerGap;
                y = this.opts.padding + s * (h + this.opts.nodeGap);
            } else {
                x = this.opts.padding + s * (w + this.opts.nodeGap);
                y = this.opts.padding + l * this.opts.layerGap;
            }
            this.nodeLayouts.set(id, {
                x,
                y,
                width: w,
                height: h,
                layer: l,
                slot: s,
                stepNumber: this.stepNumbers.get(id) ?? 0
            });
        }
    }
    getMinY() {
        let min = Infinity;
        for (const p of this.nodeLayouts.values()){
            min = Math.min(min, p.y - p.height / 2);
        }
        return min === Infinity ? 0 : min;
    }
    getCenterX() {
        let sum = 0;
        let count = 0;
        for (const p of this.nodeLayouts.values()){
            sum += p.x;
            count++;
        }
        return count === 0 ? 0 : sum / count;
    }
    getCenterY() {
        let sum = 0;
        let count = 0;
        for (const p of this.nodeLayouts.values()){
            sum += p.y;
            count++;
        }
        return count === 0 ? 0 : sum / count;
    }
    // -----------------------------------------------------------------------
    // Grid background
    // -----------------------------------------------------------------------
    buildGridPattern() {
        let dots = '';
        for(let x = -2000; x < 4000; x += 30){
            for(let y = -2000; y < 4000; y += 30){
                dots += `<circle cx="${x}" cy="${y}" r="0.6" fill="rgba(255,255,255,0.04)"/>`;
            }
        }
        return dots;
    }
    // -----------------------------------------------------------------------
    // Pathway direction indicator (semi-transparent watermark arrow)
    // -----------------------------------------------------------------------
    renderDirectionIndicator(svg, spec) {
        const isHorizontal = spec.layout !== 'vertical';
        const cx = this.getCenterX();
        const cy = this.getCenterY();
        const indicatorG = svgEl('g');
        indicatorG.setAttribute('class', 'diagram-direction-indicator');
        if (isHorizontal) {
            // Right-pointing arrow watermark
            const arrowPath = svgEl('path');
            setAttrs(arrowPath, {
                d: `M ${cx - 200} ${cy - 40} L ${cx + 140} ${cy - 40} L ${cx + 140} ${cy - 70} L ${cx + 220} ${cy} L ${cx + 140} ${cy + 70} L ${cx + 140} ${cy + 40} L ${cx - 200} ${cy + 40} Z`,
                fill: 'rgba(255,255,255,0.015)',
                stroke: 'rgba(255,255,255,0.03)',
                'stroke-width': 1.5
            });
            indicatorG.appendChild(arrowPath);
            // Arrow text
            const arrowText = svgEl('text');
            setAttrs(arrowText, {
                x: cx + 10,
                y: cy + 4,
                fill: 'rgba(255,255,255,0.04)',
                'font-size': 28,
                'font-weight': 800,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                'pointer-events': 'none'
            });
            arrowText.textContent = 'FLOW →';
            indicatorG.appendChild(arrowText);
        } else {
            // Downward arrow watermark
            const arrowPath = svgEl('path');
            setAttrs(arrowPath, {
                d: `M ${cx - 40} ${cy - 200} L ${cx + 40} ${cy - 200} L ${cx + 40} ${cy + 140} L ${cx + 70} ${cy + 140} L ${cx} ${cy + 220} L ${cx - 70} ${cy + 140} L ${cx - 40} ${cy + 140} Z`,
                fill: 'rgba(255,255,255,0.015)',
                stroke: 'rgba(255,255,255,0.03)',
                'stroke-width': 1.5
            });
            indicatorG.appendChild(arrowPath);
            const arrowText = svgEl('text');
            setAttrs(arrowText, {
                x: cx,
                y: cy + 10,
                fill: 'rgba(255,255,255,0.04)',
                'font-size': 28,
                'font-weight': 800,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                'pointer-events': 'none'
            });
            arrowText.textContent = '↓ FLOW';
            indicatorG.appendChild(arrowText);
        }
        svg.appendChild(indicatorG);
    }
    // -----------------------------------------------------------------------
    // SVG defs
    // -----------------------------------------------------------------------
    renderDefs(svg, spec) {
        const defs = svgEl('defs');
        // Node gradients
        const seenTypes = new Set();
        for (const n of spec.nodes){
            const nType = n.type || 'info';
            if (seenTypes.has(nType)) continue;
            seenTypes.add(nType);
            const st = NODE_STYLES[nType];
            if (!st) continue;
            const grad = svgEl('linearGradient');
            setAttrs(grad, {
                id: `grad-${nType}`,
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
            });
            const s1 = svgEl('stop');
            setAttrs(s1, {
                offset: '0%',
                'stop-color': st.gradientFrom
            });
            const s2 = svgEl('stop');
            setAttrs(s2, {
                offset: '100%',
                'stop-color': st.gradientTo
            });
            grad.appendChild(s1);
            grad.appendChild(s2);
            defs.appendChild(grad);
        }
        // Arrow markers — clean, solid filled triangles with professional sizing
        const arrowColor = '#94A3B8';
        const markers = [
            {
                id: 'arrow-normal',
                content: `<path d="M0,-6 L14,0 L0,6 Z" fill="${arrowColor}"/>`,
                viewBox: '-1 -7 17 14',
                refX: 14,
                refY: 0,
                markerW: 14,
                markerH: 14
            },
            {
                id: 'arrow-activation',
                content: `<path d="M0,-7 L16,0 L0,7 Z" fill="#22C55E"/>`,
                viewBox: '-1 -8 19 16',
                refX: 16,
                refY: 0,
                markerW: 16,
                markerH: 16
            },
            {
                id: 'arrow-inhibition',
                content: `<line x1="5" y1="-9" x2="5" y2="9" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>`,
                viewBox: '-1 -10 12 20',
                refX: 5,
                refY: 0,
                markerW: 10,
                markerH: 18
            },
            {
                id: 'arrow-conversion',
                content: `<path d="M0,-7 L16,0 L0,7 Z" fill="#A78BFA"/>`,
                viewBox: '-1 -8 19 16',
                refX: 16,
                refY: 0,
                markerW: 16,
                markerH: 16
            },
            {
                id: 'arrow-feedback',
                content: `<path d="M0,-6 L14,0 L0,6 Z" fill="#F59E0B"/>`,
                viewBox: '-1 -7 17 14',
                refX: 14,
                refY: 0,
                markerW: 14,
                markerH: 14
            }
        ];
        for (const m of markers){
            const marker = svgEl('marker');
            setAttrs(marker, {
                id: m.id,
                viewBox: m.viewBox,
                refX: m.refX,
                refY: m.refY,
                markerWidth: m.markerW,
                markerHeight: m.markerH,
                orient: 'auto',
                markerUnits: 'userSpaceOnUse'
            });
            marker.innerHTML = m.content;
            defs.appendChild(marker);
        }
        // Glow filter
        const filter = svgEl('filter');
        setAttrs(filter, {
            id: 'node-glow',
            x: '-40%',
            y: '-40%',
            width: '180%',
            height: '180%'
        });
        const blur = svgEl('feGaussianBlur');
        setAttrs(blur, {
            stdDeviation: 6,
            result: 'blur'
        });
        const merge = svgEl('feMerge');
        const mn1 = svgEl('feMergeNode');
        mn1.setAttribute('in', 'blur');
        const mn2 = svgEl('feMergeNode');
        mn2.setAttribute('in', 'SourceGraphic');
        merge.appendChild(mn1);
        merge.appendChild(mn2);
        filter.appendChild(blur);
        filter.appendChild(merge);
        defs.appendChild(filter);
        // Drop shadow
        const shadow = svgEl('filter');
        setAttrs(shadow, {
            id: 'node-shadow',
            x: '-15%',
            y: '-15%',
            width: '140%',
            height: '160%'
        });
        const feShadow = svgEl('feDropShadow');
        setAttrs(feShadow, {
            dx: 0,
            dy: 3,
            stdDeviation: 4,
            'flood-color': '#000000',
            'flood-opacity': 0.5
        });
        shadow.appendChild(feShadow);
        defs.appendChild(shadow);
        // Inner glow for selected
        const innerGlow = svgEl('filter');
        setAttrs(innerGlow, {
            id: 'node-selected',
            x: '-20%',
            y: '-20%',
            width: '140%',
            height: '140%'
        });
        const igBlur = svgEl('feGaussianBlur');
        setAttrs(igBlur, {
            stdDeviation: 3,
            result: 'blur'
        });
        const igFlood = svgEl('feFlood');
        setAttrs(igFlood, {
            'flood-color': '#00e5a0',
            'flood-opacity': 0.6,
            result: 'color'
        });
        const igComposite = svgEl('feComposite');
        setAttrs(igComposite, {
            in: 'color',
            in2: 'blur',
            operator: 'in',
            result: 'glow'
        });
        const igMerge = svgEl('feMerge');
        const igM1 = svgEl('feMergeNode');
        igM1.setAttribute('in', 'glow');
        const igM2 = svgEl('feMergeNode');
        igM2.setAttribute('in', 'SourceGraphic');
        igMerge.appendChild(igM1);
        igMerge.appendChild(igM2);
        innerGlow.appendChild(igBlur);
        innerGlow.appendChild(igFlood);
        innerGlow.appendChild(igComposite);
        innerGlow.appendChild(igMerge);
        defs.appendChild(innerGlow);
        svg.appendChild(defs);
    }
    // -----------------------------------------------------------------------
    // Group boxes
    // -----------------------------------------------------------------------
    renderGroups(svg, spec) {
        const groupsLayer = svgEl('g');
        groupsLayer.setAttribute('class', 'diagram-groups');
        for (const g of spec.groups ?? []){
            const positions = g.nodes.map((nid)=>this.nodeLayouts.get(nid)).filter(Boolean);
            if (positions.length === 0) continue;
            const pad = 32;
            const labelH = 28;
            const minX = Math.min(...positions.map((p)=>p.x - p.width / 2)) - pad;
            const minY = Math.min(...positions.map((p)=>p.y - p.height / 2)) - pad - labelH;
            const maxX = Math.max(...positions.map((p)=>p.x + p.width / 2)) + pad;
            const maxY = Math.max(...positions.map((p)=>p.y + p.height / 2)) + pad;
            const w = maxX - minX;
            const h = maxY - minY;
            const rect = svgEl('rect');
            setAttrs(rect, {
                x: minX,
                y: minY,
                width: w,
                height: h,
                rx: 14,
                fill: g.color,
                'fill-opacity': 0.06,
                stroke: g.color,
                'stroke-opacity': 0.3,
                'stroke-width': 1.5,
                'stroke-dasharray': '8 4'
            });
            groupsLayer.appendChild(rect);
            const label = svgEl('text');
            setAttrs(label, {
                x: minX + 14,
                y: minY + 18,
                fill: g.color,
                'font-size': 12,
                'font-weight': 700,
                'font-family': 'system-ui, sans-serif',
                opacity: 0.8
            });
            label.textContent = `📦 ${g.label}`;
            groupsLayer.appendChild(label);
        }
        svg.appendChild(groupsLayer);
    }
    // -----------------------------------------------------------------------
    // Edges — improved with flow dots, better labels, T-bar for inhibition
    // -----------------------------------------------------------------------
    renderEdges(svg, spec) {
        const edgesLayer = svgEl('g');
        edgesLayer.setAttribute('class', 'diagram-edges');
        this.edgePaths = [];
        let edgeIdx = 0;
        for (const e of spec.edges){
            const fromL = this.nodeLayouts.get(e.from);
            const toL = this.nodeLayouts.get(e.to);
            if (!fromL || !toL) continue;
            const eType = e.type ?? 'normal';
            const fromNode = spec.nodes.find((n)=>n.id === e.from);
            const toNode = spec.nodes.find((n)=>n.id === e.to);
            const path = this.buildEdgePath(fromL, toL, eType, fromNode, toNode);
            const pathEl = svgEl('path');
            const strokeColor = eType === 'feedback' ? '#F59E0B' : eType === 'activation' ? '#22C55E' : eType === 'inhibition' ? '#EF4444' : eType === 'conversion' ? '#A78BFA' : '#94A3B8';
            const strokeWidth = eType === 'feedback' ? 2.0 : eType === 'inhibition' ? 2.8 : 2.5;
            setAttrs(pathEl, {
                d: path,
                fill: 'none',
                stroke: strokeColor,
                'stroke-width': strokeWidth,
                'stroke-opacity': 0.7,
                'marker-end': `url(#arrow-${eType})`,
                class: 'diagram-edge',
                'data-from': e.from,
                'data-to': e.to,
                'data-type': eType
            });
            if (eType === 'feedback') {
                pathEl.setAttribute('stroke-dasharray', '8 4');
            }
            if (this.opts.animate) {
                pathEl.style.animationDelay = `${0.3 + edgeIdx * 0.05}s`;
            }
            edgesLayer.appendChild(pathEl);
            this.edgePaths.push(pathEl);
            // Animated flow dots for activation/conversion edges
            if ((eType === 'activation' || eType === 'conversion') && this.opts.animate) {
                const flowDot = svgEl('circle');
                setAttrs(flowDot, {
                    r: 3.5,
                    fill: strokeColor,
                    opacity: 0.9,
                    class: 'diagram-flow-dot'
                });
                const animMotion = svgEl('animateMotion');
                setAttrs(animMotion, {
                    dur: `${2 + edgeIdx * 0.3}s`,
                    repeatCount: 'indefinite',
                    path: path
                });
                flowDot.appendChild(animMotion);
                edgesLayer.appendChild(flowDot);
            }
            // Edge label with improved background pill and directional indicator
            if (e.label) {
                const mid = this.edgeMidpoint(fromL, toL, eType);
                const indicator = EDGE_INDICATORS[eType] || '→';
                const verb = EDGE_VERBS[eType] || '';
                const fullLabel = verb ? `${indicator} ${e.label}` : `${indicator} ${e.label}`;
                const labelWidth = fullLabel.length * 6.5 + 20;
                const labelHeight = 20;
                const labelBg = svgEl('rect');
                setAttrs(labelBg, {
                    x: mid.x - labelWidth / 2,
                    y: mid.y - labelHeight / 2 - 2,
                    width: labelWidth,
                    height: labelHeight,
                    rx: 8,
                    fill: this.opts.bg,
                    stroke: strokeColor,
                    'stroke-opacity': 0.4,
                    'stroke-width': 1
                });
                edgesLayer.appendChild(labelBg);
                const textEl = svgEl('text');
                setAttrs(textEl, {
                    x: mid.x,
                    y: mid.y + 1,
                    fill: strokeColor,
                    'font-size': 10,
                    'font-weight': 700,
                    'font-family': 'system-ui, sans-serif',
                    'text-anchor': 'middle',
                    'dominant-baseline': 'central',
                    'pointer-events': 'none'
                });
                textEl.textContent = fullLabel;
                edgesLayer.appendChild(textEl);
            } else {
                // Even without a label, show a small directional indicator for typed edges
                if (eType !== 'normal') {
                    const mid = this.edgeMidpoint(fromL, toL, eType);
                    const indicator = EDGE_INDICATORS[eType] || '';
                    if (indicator) {
                        const indBg = svgEl('rect');
                        const indW = indicator.length * 8 + 12;
                        setAttrs(indBg, {
                            x: mid.x - indW / 2,
                            y: mid.y - 12,
                            width: indW,
                            height: 18,
                            rx: 6,
                            fill: this.opts.bg,
                            stroke: strokeColor,
                            'stroke-opacity': 0.3,
                            'stroke-width': 0.8
                        });
                        edgesLayer.appendChild(indBg);
                        const indText = svgEl('text');
                        setAttrs(indText, {
                            x: mid.x,
                            y: mid.y - 1,
                            fill: strokeColor,
                            'font-size': 10,
                            'font-weight': 700,
                            'font-family': 'system-ui, sans-serif',
                            'text-anchor': 'middle',
                            'dominant-baseline': 'central',
                            'pointer-events': 'none'
                        });
                        const verb = EDGE_VERBS[eType] || '';
                        indText.textContent = `${indicator} ${verb}`;
                        edgesLayer.appendChild(indText);
                    }
                }
            }
            edgeIdx++;
        }
        svg.appendChild(edgesLayer);
    }
    buildEdgePath(fromL, toL, eType, fromNode, toNode) {
        const fromShape = fromNode ? NODE_STYLES[fromNode.type]?.shape ?? 'rect' : 'rect';
        const toShape = toNode ? NODE_STYLES[toNode.type]?.shape ?? 'rect' : 'rect';
        const cx1 = fromL.x;
        const cy1 = fromL.y;
        const cx2 = toL.x;
        const cy2 = toL.y;
        let start;
        let end;
        if (fromShape === 'diamond') {
            start = diamondIntersection(cx1, cy1, fromL.width, fromL.height, cx2, cy2);
        } else {
            start = rectIntersection(cx1, cy1, fromL.width, fromL.height, cx2, cy2);
        }
        if (toShape === 'diamond') {
            end = diamondIntersection(cx2, cy2, toL.width, toL.height, cx1, cy1);
        } else {
            end = rectIntersection(cx2, cy2, toL.width, toL.height, cx1, cy1);
        }
        // Pull back the endpoint so the arrowhead doesn't overlap the target node.
        // Arrow marker lengths: normal=14, activation=16, inhibition=10, conversion=16, feedback=14
        const arrowPullback = eType === 'inhibition' ? 6 : eType === 'activation' || eType === 'conversion' ? 8 : 7;
        const edx = end.x - start.x;
        const edy = end.y - start.y;
        const elen = Math.sqrt(edx * edx + edy * edy) || 1;
        end = {
            x: end.x - edx / elen * arrowPullback,
            y: end.y - edy / elen * arrowPullback
        };
        if (eType === 'feedback') {
            // More pronounced curve for feedback
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const off = Math.max(90, len * 0.5);
            const nx = -dy / len;
            const ny = dx / len;
            const cpx = (start.x + end.x) / 2 + nx * off;
            const cpy = (start.y + end.y) / 2 + ny * off;
            return `M ${start.x} ${start.y} Q ${cpx} ${cpy} ${end.x} ${end.y}`;
        }
        // Curved edges for nicer look
        const mx = (start.x + end.x) / 2;
        const my = (start.y + end.y) / 2;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const bend = Math.min(18, Math.sqrt(dx * dx + dy * dy) * 0.06);
        return `M ${start.x} ${start.y} Q ${mx} ${my - bend} ${end.x} ${end.y}`;
    }
    edgeMidpoint(fromL, toL, eType) {
        if (eType === 'feedback') {
            const dx = toL.x - fromL.x;
            const dy = toL.y - fromL.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const off = Math.max(90, len * 0.5);
            const nx = -dy / len;
            const ny = dx / len;
            return {
                x: (fromL.x + toL.x) / 2 + nx * off * 0.5,
                y: (fromL.y + toL.y) / 2 + ny * off * 0.5
            };
        }
        return {
            x: (fromL.x + toL.x) / 2,
            y: (fromL.y + toL.y) / 2
        };
    }
    // -----------------------------------------------------------------------
    // Nodes — enhanced with step numbers, START/END badges, indicators
    // -----------------------------------------------------------------------
    renderNodes(svg, spec) {
        const nodesLayer = svgEl('g');
        nodesLayer.setAttribute('class', 'diagram-nodes');
        this.nodeGroups.clear();
        let idx = 0;
        for (const node of spec.nodes){
            const layout = this.nodeLayouts.get(node.id);
            if (!layout) continue;
            const g = svgEl('g');
            g.setAttribute('class', 'diagram-node');
            g.setAttribute('data-id', node.id);
            g.style.cursor = 'pointer';
            if (this.opts.animate) {
                g.style.opacity = '0';
                g.style.animationDelay = `${0.08 + idx * 0.06}s`;
            }
            const st = NODE_STYLES[node.type || 'info'] || NODE_STYLES.info;
            const { x, y, width: w, height: h } = layout;
            // Render shape
            if (st.shape === 'diamond') {
                this.renderDiamond(g, node, x, y, w, h, st);
            } else if (st.shape === 'pill') {
                this.renderPill(g, node, x, y, w, h, st);
            } else if (st.shape === 'hexagon') {
                this.renderHexagon(g, node, x, y, w, h, st);
            } else {
                this.renderRect(g, node, x, y, w, h, st);
            }
            nodesLayer.appendChild(g);
            this.nodeGroups.set(node.id, g);
            idx++;
        }
        svg.appendChild(nodesLayer);
    }
    renderRect(g, node, cx, cy, w, h, st) {
        if (st.glowColor) {
            const glowRect = svgEl('rect');
            setAttrs(glowRect, {
                x: cx - w / 2 - 4,
                y: cy - h / 2 - 4,
                width: w + 8,
                height: h + 8,
                rx: 14,
                fill: st.glowColor,
                opacity: 0.3,
                filter: 'url(#node-glow)'
            });
            g.appendChild(glowRect);
        }
        const rect = svgEl('rect');
        setAttrs(rect, {
            x: cx - w / 2,
            y: cy - h / 2,
            width: w,
            height: h,
            rx: 12,
            fill: `url(#grad-${node.type || 'info'})`,
            filter: 'url(#node-shadow)'
        });
        if (st.dashArray) {
            rect.setAttribute('stroke', '#9CA3AF');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke-dasharray', st.dashArray);
        }
        g.appendChild(rect);
        // Subtle inner highlight
        const highlight = svgEl('rect');
        setAttrs(highlight, {
            x: cx - w / 2 + 2,
            y: cy - h / 2 + 2,
            width: w - 4,
            height: h / 3,
            rx: 10,
            fill: 'rgba(255,255,255,0.08)'
        });
        g.appendChild(highlight);
        this.renderNodeContent(g, node, cx, cy, w, h, st);
    }
    renderPill(g, node, cx, cy, w, h, st) {
        if (st.glowColor) {
            const glowRect = svgEl('rect');
            setAttrs(glowRect, {
                x: cx - w / 2 - 4,
                y: cy - h / 2 - 4,
                width: w + 8,
                height: h + 8,
                rx: h / 2 + 4,
                fill: st.glowColor,
                opacity: 0.3
            });
            g.appendChild(glowRect);
        }
        const rect = svgEl('rect');
        setAttrs(rect, {
            x: cx - w / 2,
            y: cy - h / 2,
            width: w,
            height: h,
            rx: h / 2,
            fill: `url(#grad-${node.type || 'info'})`,
            filter: 'url(#node-shadow)'
        });
        if (st.dashArray) {
            rect.setAttribute('stroke', '#9CA3AF');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke-dasharray', st.dashArray);
        }
        g.appendChild(rect);
        this.renderNodeContent(g, node, cx, cy, w, h, st);
    }
    renderHexagon(g, node, cx, cy, w, h, st) {
        const indent = 20;
        const points = [
            `${cx - w / 2 + indent},${cy - h / 2}`,
            `${cx + w / 2 - indent},${cy - h / 2}`,
            `${cx + w / 2},${cy}`,
            `${cx + w / 2 - indent},${cy + h / 2}`,
            `${cx - w / 2 + indent},${cy + h / 2}`,
            `${cx - w / 2},${cy}`
        ].join(' ');
        const poly = svgEl('polygon');
        setAttrs(poly, {
            points,
            fill: `url(#grad-${node.type || 'info'})`,
            filter: 'url(#node-shadow)'
        });
        g.appendChild(poly);
        this.renderNodeContent(g, node, cx, cy, w, h, st);
    }
    renderDiamond(g, node, cx, cy, w, h, st) {
        const points = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
        const poly = svgEl('polygon');
        setAttrs(poly, {
            points,
            fill: `url(#grad-${node.type || 'info'})`,
            filter: 'url(#node-shadow)'
        });
        g.appendChild(poly);
        this.renderNodeContent(g, node, cx, cy, w, h, st);
    }
    renderNodeContent(g, node, cx, cy, w, h, st) {
        const layout = this.nodeLayouts.get(node.id);
        const stepNum = layout?.stepNumber ?? 0;
        const nodeLayer = layout?.layer ?? 0;
        const hasSub = !!node.subtitle;
        const labelOffset = hasSub ? -9 : 0;
        const subOffset = hasSub ? 11 : 0;
        // ── Step number badge (top-left, circular) ──
        if (stepNum > 0) {
            const badgeR = 11;
            const badgeCx = cx - w / 2 + badgeR + 2;
            const badgeCy = cy - h / 2 + badgeR + 2;
            const stepCircle = svgEl('circle');
            setAttrs(stepCircle, {
                cx: badgeCx,
                cy: badgeCy,
                r: badgeR,
                fill: 'rgba(0,0,0,0.6)',
                stroke: st.gradientFrom,
                'stroke-width': 1.5
            });
            g.appendChild(stepCircle);
            const stepText = svgEl('text');
            setAttrs(stepText, {
                x: badgeCx,
                y: badgeCy,
                fill: '#FFFFFF',
                'font-size': 10,
                'font-weight': 800,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                'pointer-events': 'none'
            });
            stepText.textContent = String(stepNum);
            g.appendChild(stepText);
        }
        // ── START badge ──
        if (nodeLayer === 0) {
            const startW = 36;
            const startH = 14;
            const startCx = cx + w / 2 - startW / 2 - 2;
            const startCy = cy - h / 2 + startH / 2 + 2;
            const startBg = svgEl('rect');
            setAttrs(startBg, {
                x: startCx - startW / 2,
                y: startCy - startH / 2,
                width: startW,
                height: startH,
                rx: 4,
                fill: 'rgba(34,197,94,0.7)'
            });
            g.appendChild(startBg);
            const startText = svgEl('text');
            setAttrs(startText, {
                x: startCx,
                y: startCy,
                fill: '#FFFFFF',
                'font-size': 7,
                'font-weight': 800,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                'pointer-events': 'none',
                'letter-spacing': '0.5px'
            });
            startText.textContent = 'START';
            g.appendChild(startText);
        }
        // ── END badge ──
        if (nodeLayer === this.maxLayer) {
            const endW = 28;
            const endH = 14;
            const endCx = cx + w / 2 - endW / 2 - 2;
            const endCy = cy - h / 2 + endH / 2 + 2;
            // If this node also has START badge (single-layer diagram), shift END badge left
            const shiftX = nodeLayer === 0 ? -42 : 0;
            const endBg = svgEl('rect');
            setAttrs(endBg, {
                x: endCx - endW / 2 + shiftX,
                y: endCy - endH / 2,
                width: endW,
                height: endH,
                rx: 4,
                fill: 'rgba(239,68,68,0.7)'
            });
            g.appendChild(endBg);
            const endText = svgEl('text');
            setAttrs(endText, {
                x: endCx + shiftX,
                y: endCy,
                fill: '#FFFFFF',
                'font-size': 7,
                'font-weight': 800,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                'pointer-events': 'none',
                'letter-spacing': '0.5px'
            });
            endText.textContent = 'END';
            g.appendChild(endText);
        }
        // ── Icon (emoji or organ) ──
        const iconStr = node.icon || TYPE_ICONS[node.type || 'info'] || '';
        if (iconStr) {
            if (ORGAN_ICONS[iconStr]) {
                const iconG = svgEl('g');
                setAttrs(iconG, {
                    transform: `translate(${cx - w / 2 + 22},${cy + labelOffset - 4}) scale(0.65)`
                });
                iconG.innerHTML = `<g style="color:rgba(255,255,255,0.5)">${ORGAN_ICONS[iconStr]}</g>`;
                g.appendChild(iconG);
            } else {
                const iconText = svgEl('text');
                setAttrs(iconText, {
                    x: cx - w / 2 + 24,
                    y: cy + labelOffset + 2,
                    'font-size': 15,
                    'text-anchor': 'middle',
                    'dominant-baseline': 'central',
                    'pointer-events': 'none'
                });
                iconText.textContent = iconStr;
                g.appendChild(iconText);
            }
        }
        // ── Label ──
        const label = svgEl('text');
        const textX = iconStr ? cx + 6 : cx;
        setAttrs(label, {
            x: textX,
            y: cy + labelOffset,
            fill: '#FFFFFF',
            'font-size': 13,
            'font-weight': 700,
            'font-family': 'system-ui, sans-serif',
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
            'pointer-events': 'none'
        });
        label.textContent = this.truncate(node.label, 22);
        g.appendChild(label);
        // ── Subtitle ──
        if (hasSub) {
            const sub = svgEl('text');
            setAttrs(sub, {
                x: textX,
                y: cy + subOffset,
                fill: '#FFFFFF',
                'font-size': 10,
                'font-family': 'system-ui, sans-serif',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                opacity: 0.65,
                'pointer-events': 'none'
            });
            sub.textContent = this.truncate(node.subtitle, 26);
            g.appendChild(sub);
        }
        // ── Type indicator badge (bottom-right) ──
        const indicator = st.indicator || '';
        const typeLabel = indicator ? `${indicator} ${node.type || 'info'}` : node.type || 'info';
        const badgeW = typeLabel.length * 5.5 + 10;
        const badgeBg = svgEl('rect');
        setAttrs(badgeBg, {
            x: cx + w / 2 - badgeW - 4,
            y: cy + h / 2 - 15,
            width: badgeW,
            height: 13,
            rx: 3,
            fill: 'rgba(0,0,0,0.45)'
        });
        g.appendChild(badgeBg);
        const badgeText = svgEl('text');
        setAttrs(badgeText, {
            x: cx + w / 2 - badgeW / 2 - 4,
            y: cy + h / 2 - 8,
            fill: 'rgba(255,255,255,0.6)',
            'font-size': 7,
            'font-weight': 600,
            'font-family': 'system-ui, sans-serif',
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
            'pointer-events': 'none'
        });
        badgeText.textContent = typeLabel;
        g.appendChild(badgeText);
    }
    // -----------------------------------------------------------------------
    // Legend
    // -----------------------------------------------------------------------
    renderLegend(svg, spec) {
        const usedTypes = new Set(spec.nodes.map((n)=>n.type || 'info'));
        if (usedTypes.size <= 1) return;
        const legendItems = Array.from(usedTypes).slice(0, 8);
        const legendG = svgEl('g');
        legendG.setAttribute('class', 'diagram-legend');
        const maxX = Math.max(...Array.from(this.nodeLayouts.values()).map((p)=>p.x + p.width / 2));
        const minY = this.getMinY();
        const lx = maxX + 50;
        const ly = minY;
        // Legend background
        const bg = svgEl('rect');
        setAttrs(bg, {
            x: lx - 10,
            y: ly - 10,
            width: 140,
            height: legendItems.length * 22 + 30,
            rx: 8,
            fill: 'rgba(255,255,255,0.03)',
            stroke: 'rgba(255,255,255,0.06)',
            'stroke-width': 1
        });
        legendG.appendChild(bg);
        const title = svgEl('text');
        setAttrs(title, {
            x: lx,
            y: ly + 8,
            fill: '#64748B',
            'font-size': 9,
            'font-weight': 700,
            'font-family': 'system-ui, sans-serif',
            'text-transform': 'uppercase',
            'letter-spacing': '1px'
        });
        title.textContent = 'LEGEND';
        legendG.appendChild(title);
        legendItems.forEach((type, i)=>{
            const st = NODE_STYLES[type] || NODE_STYLES.info;
            const iy = ly + 26 + i * 22;
            const dot = svgEl('rect');
            setAttrs(dot, {
                x: lx,
                y: iy - 5,
                width: 14,
                height: 14,
                rx: 4,
                fill: st.gradientFrom
            });
            legendG.appendChild(dot);
            const indicator = st.indicator || '';
            const label = svgEl('text');
            setAttrs(label, {
                x: lx + 20,
                y: iy + 5,
                fill: '#94A3B8',
                'font-size': 10,
                'font-family': 'system-ui, sans-serif'
            });
            label.textContent = `${TYPE_ICONS[type] || ''} ${type}${indicator ? ' ' + indicator : ''}`;
            legendG.appendChild(label);
        });
        svg.appendChild(legendG);
    }
    // -----------------------------------------------------------------------
    // Key Steps Summary Bar
    // -----------------------------------------------------------------------
    renderKeyStepsBar(svg, spec) {
        // Build ordered sequence from layers
        const layerNodes = new Map();
        for (const node of spec.nodes){
            const layout = this.nodeLayouts.get(node.id);
            if (!layout) continue;
            if (!layerNodes.has(layout.layer)) layerNodes.set(layout.layer, []);
            layerNodes.get(layout.layer).push(node);
        }
        if (layerNodes.size === 0) return;
        // Pick the first node per layer (main pathway)
        const keyNodes = [];
        for(let l = 0; l <= this.maxLayer; l++){
            const nodes = layerNodes.get(l) ?? [];
            if (nodes.length > 0) keyNodes.push(nodes[0]);
        }
        if (keyNodes.length < 2) return;
        // Build summary text
        const circledDigits = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';
        const parts = keyNodes.map((n)=>{
            const step = this.stepNumbers.get(n.id) ?? 0;
            const circled = step > 0 && step <= 20 ? circledDigits[step - 1] : `${step}`;
            return `${circled} ${n.label}`;
        });
        // Also add intermediate arrows
        const summaryText = parts.join(' → ');
        // Position below the diagram
        const maxY = Math.max(...Array.from(this.nodeLayouts.values()).map((p)=>p.y + p.height / 2));
        const centerX = this.getCenterX();
        const barY = maxY + 50;
        const barG = svgEl('g');
        barG.setAttribute('class', 'diagram-key-steps');
        // Background bar
        const barWidth = summaryText.length * 6 + 40;
        const barBg = svgEl('rect');
        setAttrs(barBg, {
            x: centerX - barWidth / 2,
            y: barY - 14,
            width: barWidth,
            height: 28,
            rx: 14,
            fill: 'rgba(0,229,160,0.06)',
            stroke: 'rgba(0,229,160,0.15)',
            'stroke-width': 1
        });
        barG.appendChild(barBg);
        // Label
        const labelEl = svgEl('text');
        setAttrs(labelEl, {
            x: centerX,
            y: barY + 2,
            fill: '#00e5a0',
            'font-size': 11,
            'font-weight': 700,
            'font-family': 'system-ui, sans-serif',
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
            'pointer-events': 'none',
            opacity: 0.9
        });
        labelEl.textContent = `Key Steps: ${summaryText}`;
        barG.appendChild(labelEl);
        svg.appendChild(barG);
    }
    // -----------------------------------------------------------------------
    // ViewBox
    // -----------------------------------------------------------------------
    applyViewBox(svg) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const p of this.nodeLayouts.values()){
            minX = Math.min(minX, p.x - p.width / 2);
            minY = Math.min(minY, p.y - p.height / 2);
            maxX = Math.max(maxX, p.x + p.width / 2);
            maxY = Math.max(maxY, p.y + p.height / 2);
        }
        if (this.spec?.groups) {
            for (const g of this.spec.groups){
                const positions = g.nodes.map((nid)=>this.nodeLayouts.get(nid)).filter(Boolean);
                if (positions.length === 0) continue;
                const pad = 32;
                const labelH = 28;
                minX = Math.min(minX, Math.min(...positions.map((p)=>p.x - p.width / 2)) - pad);
                minY = Math.min(minY, Math.min(...positions.map((p)=>p.y - p.height / 2)) - pad - labelH);
                maxX = Math.max(maxX, Math.max(...positions.map((p)=>p.x + p.width / 2)) + pad);
                maxY = Math.max(maxY, Math.max(...positions.map((p)=>p.y + p.height / 2)) + pad);
            }
        }
        if (this.spec?.title) {
            minY = Math.min(minY, this.getMinY() - 60);
        }
        // Legend
        const legendExtra = 190;
        maxX += legendExtra;
        // Key Steps bar
        maxY += 60;
        const vbPad = 50;
        minX -= vbPad;
        minY -= vbPad;
        maxX += vbPad;
        maxY += vbPad;
        if (minX === Infinity) {
            minX = 0;
            minY = 0;
            maxX = 800;
            maxY = 600;
        }
        svg.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
    }
    // -----------------------------------------------------------------------
    // Interactivity — enhanced tooltip
    // -----------------------------------------------------------------------
    setupInteractivity() {
        if (!this.svg) return;
        this.clickHandler = (e)=>{
            const target = e.target.closest('.diagram-node');
            if (target) {
                const id = target.getAttribute('data-id');
                if (id) {
                    if (this.selectedId === id) {
                        this.clearHighlight();
                    } else {
                        this.highlightNode(id);
                    }
                }
            } else {
                this.clearHighlight();
            }
        };
        this.svg.addEventListener('click', this.clickHandler);
        this.moveHandler = (e)=>{
            const target = e.target.closest('.diagram-node');
            if (target) {
                const id = target.getAttribute('data-id');
                if (id && this.spec) {
                    const node = this.spec.nodes.find((n)=>n.id === id);
                    if (node) {
                        this.showRichTooltip(node, e.clientX, e.clientY);
                        return;
                    }
                }
            }
            this.hideTooltip();
        };
        this.svg.addEventListener('mousemove', this.moveHandler);
        this.svg.addEventListener('mouseleave', ()=>this.hideTooltip());
        this.keyHandler = (e)=>{
            if (e.key === 'Escape') this.clearHighlight();
        };
        document.addEventListener('keydown', this.keyHandler);
    }
    removeGlobalListeners() {
        if (this.clickHandler && this.svg) {
            this.svg.removeEventListener('click', this.clickHandler);
        }
        if (this.moveHandler && this.svg) {
            this.svg.removeEventListener('mousemove', this.moveHandler);
        }
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
        }
        this.clickHandler = null;
        this.moveHandler = null;
        this.keyHandler = null;
    }
    highlightNode(nodeId) {
        this.selectedId = nodeId;
        if (!this.spec) return;
        const connected = new Set();
        const visited = new Set();
        const queue = [
            nodeId
        ];
        visited.add(nodeId);
        connected.add(nodeId);
        const adj = new Map();
        const radj = new Map();
        for (const n of this.spec.nodes){
            adj.set(n.id, []);
            radj.set(n.id, []);
        }
        for (const e of this.spec.edges){
            adj.get(e.from)?.push(e.to);
            radj.get(e.to)?.push(e.from);
        }
        while(queue.length){
            const cur = queue.shift();
            for (const nxt of [
                ...adj.get(cur) ?? [],
                ...radj.get(cur) ?? []
            ]){
                connected.add(nxt);
                if (!visited.has(nxt)) {
                    visited.add(nxt);
                    queue.push(nxt);
                }
            }
        }
        for (const [id, g] of this.nodeGroups){
            if (connected.has(id)) {
                g.style.opacity = '1';
                g.style.filter = id === nodeId ? 'url(#node-selected)' : '';
            } else {
                g.style.opacity = '0.15';
                g.style.filter = '';
            }
        }
        for (const pathEl of this.edgePaths){
            const from = pathEl.getAttribute('data-from');
            const to = pathEl.getAttribute('data-to');
            if (from && to && connected.has(from) && connected.has(to)) {
                pathEl.setAttribute('stroke-opacity', '1');
                pathEl.style.opacity = '1';
            } else {
                pathEl.setAttribute('stroke-opacity', '0.08');
                pathEl.style.opacity = '0.1';
            }
        }
    }
    clearHighlight() {
        this.selectedId = null;
        for (const [, g] of this.nodeGroups){
            g.style.opacity = '';
            g.style.filter = '';
        }
        for (const pathEl of this.edgePaths){
            pathEl.setAttribute('stroke-opacity', '0.7');
            pathEl.style.opacity = '';
        }
    }
    // -----------------------------------------------------------------------
    // Rich Tooltip
    // -----------------------------------------------------------------------
    createTooltip() {
        this.tooltip = document.createElement('div');
        Object.assign(this.tooltip.style, {
            position: 'fixed',
            zIndex: '9999',
            pointerEvents: 'none',
            background: 'rgba(12, 15, 26, 0.96)',
            color: '#E2E8F0',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '12px',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: '1.6',
            maxWidth: '320px',
            border: '1px solid rgba(0,229,160,0.25)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
            opacity: '0',
            transition: 'opacity 0.15s ease'
        });
        document.body.appendChild(this.tooltip);
    }
    showRichTooltip(node, clientX, clientY) {
        if (!this.tooltip || !this.spec) return;
        const layout = this.nodeLayouts.get(node.id);
        const stepNum = layout?.stepNumber ?? 0;
        const st = NODE_STYLES[node.type || 'info'] || NODE_STYLES.info;
        const iconStr = node.icon || TYPE_ICONS[node.type || 'info'] || '';
        // Find connected nodes
        const incoming = [];
        const outgoing = [];
        for (const e of this.spec.edges){
            if (e.to === node.id) {
                const fromNode = this.spec.nodes.find((n)=>n.id === e.from);
                if (fromNode) incoming.push(fromNode.label);
            }
            if (e.from === node.id) {
                const toNode = this.spec.nodes.find((n)=>n.id === e.to);
                if (toNode) outgoing.push(toNode.label);
            }
        }
        let html = '';
        // Header line
        html += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">`;
        html += `<span style="font-size:14px">${iconStr}</span>`;
        html += `<span style="font-weight:700;color:${st.gradientFrom}">${node.label}</span>`;
        if (stepNum > 0) {
            html += `<span style="background:${st.gradientFrom};color:#fff;padding:1px 6px;border-radius:8px;font-size:9px;font-weight:700">Step ${stepNum}</span>`;
        }
        html += `</div>`;
        // Type
        html += `<div style="color:#64748B;font-size:10px;margin-bottom:4px">${node.type || 'info'}${st.indicator ? ' ' + st.indicator : ''}</div>`;
        // Annotation
        if (node.annotation) {
            html += `<div style="color:#CBD5E1;font-size:11px;margin-bottom:4px;border-top:1px solid rgba(255,255,255,0.06);padding-top:4px">${node.annotation}</div>`;
        }
        // Connected nodes
        if (incoming.length > 0) {
            html += `<div style="color:#94A3B8;font-size:10px;margin-top:2px">← ${incoming.join(', ')}</div>`;
        }
        if (outgoing.length > 0) {
            html += `<div style="color:#94A3B8;font-size:10px">→ ${outgoing.join(', ')}</div>`;
        }
        this.tooltip.innerHTML = html;
        this.tooltip.style.opacity = '1';
        const x = Math.min(clientX + 14, window.innerWidth - 340);
        const y = Math.min(clientY + 14, window.innerHeight - 120);
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.style.opacity = '0';
        }
    }
    // -----------------------------------------------------------------------
    // Animation styles — enhanced with flow dot animation
    // -----------------------------------------------------------------------
    injectAnimationStyles() {
        if (this.styleEl) this.styleEl.remove();
        this.styleEl = document.createElement('style');
        this.styleEl.textContent = `
      @keyframes diagramNodeIn {
        from { opacity: 0; transform: translateY(12px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes diagramEdgeIn {
        from { opacity: 0; stroke-dashoffset: 400; }
        to   { opacity: 1; stroke-dashoffset: 0; }
      }
      @keyframes diagramFlowDotPulse {
        0%, 100% { opacity: 0.4; r: 2.5; }
        50%      { opacity: 1;   r: 4;   }
      }
      .diagram-node {
        animation: diagramNodeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        transition: opacity 0.3s ease, filter 0.3s ease;
      }
      .diagram-node:hover {
        filter: brightness(1.2) drop-shadow(0 0 8px rgba(0,229,160,0.3));
      }
      .diagram-edge {
        animation: diagramEdgeIn 0.6s ease forwards;
        transition: stroke-opacity 0.3s ease, opacity 0.3s ease;
      }
      .diagram-flow-dot {
        animation: diagramFlowDotPulse 2s ease-in-out infinite;
      }
    `;
        document.head.appendChild(this.styleEl);
    }
    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------
    truncate(str, max) {
        return str.length > max ? str.slice(0, max - 1) + '…' : str;
    }
}


/***/ }),

/***/ 493891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AIClinicalReasoning)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(576270);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35214);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(891867);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(967254);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(456052);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(190498);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(347352);
/* __next_internal_client_entry_do_not_use__ default auto */ 


// ─── Color Constants ─────────────────────────────────────────────────────────
const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    input: 'var(--medq-surface, #1a1e2b)',
    green: 'var(--medq-accent-green, #00e5a0)',
    greenDark: 'var(--medq-accent-green, #00b87a)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    orange: 'var(--medq-accent-amber, #f59e0b)',
    orangeAccent: 'var(--medq-accent-amber, #ff6b35)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    cyan: 'var(--medq-accent-cyan, #4fc3f7)',
    teal: 'var(--medq-accent-cyan, #22d3ee)',
    blue: '#3b82f6',
    pink: '#ec4899',
    yellow: 'var(--medq-accent-amber, #ffb347)',
    lightGreen: 'var(--medq-accent-green, #4ade80)',
    text: 'var(--medq-text, #e8ecf4)',
    textSec: 'var(--medq-muted-2, #8b95a8)',
    textMuted: 'var(--medq-muted, #5a6478)',
    textDim: 'var(--medq-dimmed, #3a4055)',
    border: 'var(--medq-card-border, rgba(255,255,255,0.06))'
};
const LIKELIHOOD_COLORS = {
    high: {
        bg: 'rgba(239,68,68,0.10)',
        text: '#ff5757',
        border: 'rgba(239,68,68,0.20)'
    },
    moderate: {
        bg: 'rgba(245,158,11,0.10)',
        text: '#f59e0b',
        border: 'rgba(245,158,11,0.20)'
    },
    low: {
        bg: 'rgba(74,222,128,0.10)',
        text: '#4ade80',
        border: 'rgba(74,222,128,0.20)'
    }
};
const STEP_COLORS = [
    {
        bg: 'rgba(59,130,246,0.08)',
        border: 'rgba(59,130,246,0.20)',
        accent: '#3b82f6'
    },
    {
        bg: 'rgba(139,92,246,0.08)',
        border: 'rgba(139,92,246,0.20)',
        accent: '#8b5cf6'
    },
    {
        bg: 'rgba(0,229,160,0.08)',
        border: 'rgba(0,229,160,0.20)',
        accent: '#00e5a0'
    },
    {
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.20)',
        accent: '#f59e0b'
    },
    {
        bg: 'rgba(34,211,238,0.08)',
        border: 'rgba(34,211,238,0.20)',
        accent: '#22d3ee'
    },
    {
        bg: 'rgba(236,72,153,0.08)',
        border: 'rgba(236,72,153,0.20)',
        accent: '#ec4899'
    }
];
// ─── Main Component ──────────────────────────────────────────────────────────
function AIClinicalReasoning({ userAnswer, correctAnswer, questionContext, caseData, isCorrect, defaultExpanded = false, compact = false, onReasoningLoaded }) {
    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultExpanded);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeStepIndex, setActiveStepIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showDeeper, setShowDeeper] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [deeperLoading, setDeeperLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [deeperContent, setDeeperContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [visibleSteps, setVisibleSteps] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // Fetch clinical reasoning
    const fetchReasoning = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (result) return; // Already loaded
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/ai/clinical-reasoning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAnswer,
                    correctAnswer,
                    questionContext,
                    caseData
                })
            });
            if (res.ok) {
                const data = await res.json();
                setResult(data);
                onReasoningLoaded?.(data);
            } else {
                setError('Failed to load clinical reasoning');
            }
        } catch  {
            setError('Network error — could not load clinical reasoning');
        } finally{
            setLoading(false);
        }
    }, [
        userAnswer,
        correctAnswer,
        questionContext,
        caseData,
        result,
        onReasoningLoaded
    ]);
    // Auto-fetch when expanded for the first time
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (expanded && !result && !loading && !error) {
            fetchReasoning();
        }
    }, [
        expanded,
        result,
        loading,
        error,
        fetchReasoning
    ]);
    // Animate steps appearing one by one
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!result || !expanded) return;
        if (visibleSteps < result.reasoning.length) {
            const timer = setTimeout(()=>setVisibleSteps((v)=>v + 1), 120);
            return ()=>clearTimeout(timer);
        }
    }, [
        result,
        expanded,
        visibleSteps
    ]);
    // Explain Further — deeper dive
    const handleExplainFurther = async ()=>{
        if (deeperLoading || deeperContent) return;
        setDeeperLoading(true);
        try {
            const res = await fetch('/api/ai/clinical-reasoning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAnswer,
                    correctAnswer,
                    questionContext: {
                        ...questionContext,
                        difficulty: 'expert'
                    },
                    caseData: `${caseData || ''}\n\nDEEPER ANALYSIS REQUESTED: Provide an in-depth analysis with pathophysiology mechanisms, evidence-based references, and clinical decision thresholds.`
                })
            });
            if (res.ok) {
                const data = await res.json();
                // Combine the original with the deeper analysis
                setDeeperContent(data.attendingTip + '\n\n' + data.keyTakeaway);
            } else {
                setDeeperContent('Unable to load deeper analysis at this time.');
            }
        } catch  {
            setDeeperContent('Network error — could not load deeper analysis.');
        } finally{
            setDeeperLoading(false);
        }
    };
    // ─── Render: Compact Mode (for case simulation inline hints) ────────────
    if (compact) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                borderRadius: 10,
                border: `1px solid ${isCorrect ? 'rgba(0,229,160,0.15)' : 'rgba(255,87,87,0.15)'}`,
                background: isCorrect ? 'rgba(0,229,160,0.04)' : 'rgba(255,87,87,0.04)',
                overflow: 'hidden'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: ()=>setExpanded(!expanded),
                    style: {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 14px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: C.textSec,
                        fontSize: 12,
                        fontWeight: 600
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            size: 14,
                            style: {
                                color: C.purple
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            style: {
                                flex: 1,
                                textAlign: 'left',
                                color: C.text
                            },
                            children: "Clinical Reasoning"
                        }),
                        expanded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            size: 14
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            size: 14
                        })
                    ]
                }),
                expanded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        padding: '0 14px 14px'
                    },
                    children: [
                        loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 0'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        width: 14,
                                        height: 14,
                                        border: `2px solid ${C.purple}30`,
                                        borderTopColor: C.purple,
                                        borderRadius: '50%',
                                        animation: 'crSpin 0.8s linear infinite'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    style: {
                                        fontSize: 11,
                                        color: C.textMuted
                                    },
                                    children: "Analyzing clinical reasoning..."
                                })
                            ]
                        }),
                        error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            style: {
                                fontSize: 11,
                                color: C.danger,
                                margin: 0
                            },
                            children: error
                        }),
                        result && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 6
                            },
                            children: [
                                result.reasoning.slice(0, 3).map((step, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            padding: '6px 8px',
                                            borderRadius: 6,
                                            background: STEP_COLORS[i % STEP_COLORS.length].bg,
                                            borderLeft: `2px solid ${STEP_COLORS[i % STEP_COLORS.length].accent}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: STEP_COLORS[i % STEP_COLORS.length].accent
                                                },
                                                children: step.step
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: C.textSec,
                                                    margin: '2px 0 0'
                                                },
                                                children: step.finding
                                            })
                                        ]
                                    }, i)),
                                result.redFlags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        padding: '6px 8px',
                                        borderRadius: 6,
                                        background: 'rgba(255,87,87,0.08)',
                                        borderLeft: `2px solid ${C.danger}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 600,
                                                color: C.danger
                                            },
                                            children: [
                                                "Red Flag: ",
                                                result.redFlags[0].flag
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            style: {
                                                fontSize: 10,
                                                color: C.textMuted,
                                                margin: '2px 0 0'
                                            },
                                            children: result.redFlags[0].action
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
    // ─── Render: Full Mode ──────────────────────────────────────────────────
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            background: C.card,
            overflow: 'hidden',
            marginTop: 12
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `
        @keyframes crSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes crFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes crPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: ()=>setExpanded(!expanded),
                style: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 18px',
                    background: expanded ? `${C.purple}06` : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    borderBottom: expanded ? `1px solid ${C.border}` : 'none'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: `${C.purple}12`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            size: 15,
                            style: {
                                color: C.purple
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            flex: 1,
                            textAlign: 'left',
                            color: C.text,
                            fontSize: 13,
                            fontWeight: 600
                        },
                        children: "Clinical Reasoning"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            fontSize: 9,
                            padding: '2px 8px',
                            borderRadius: 8,
                            background: `${C.purple}15`,
                            color: C.purple,
                            fontWeight: 700,
                            letterSpacing: '0.5px'
                        },
                        children: "AI"
                    }),
                    expanded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        size: 16,
                        style: {
                            color: C.textMuted
                        }
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        size: 16,
                        style: {
                            color: C.textMuted
                        }
                    })
                ]
            }),
            expanded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    padding: 16
                },
                children: [
                    loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 12,
                            padding: '24px 0'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                style: {
                                    width: 32,
                                    height: 32,
                                    border: `3px solid ${C.purple}25`,
                                    borderTopColor: C.purple,
                                    borderRadius: '50%',
                                    animation: 'crSpin 0.8s linear infinite'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 12,
                                    color: C.textMuted
                                },
                                children: "Analyzing clinical reasoning pathway..."
                            })
                        ]
                    }),
                    error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            padding: '12px 16px',
                            borderRadius: 10,
                            background: 'rgba(255,87,87,0.06)',
                            border: '1px solid rgba(255,87,87,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                size: 14,
                                style: {
                                    color: C.danger
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: 12,
                                    color: C.danger
                                },
                                children: error
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: fetchReasoning,
                                style: {
                                    marginLeft: 'auto',
                                    padding: '3px 8px',
                                    borderRadius: 6,
                                    border: `1px solid rgba(255,87,87,0.25)`,
                                    background: 'transparent',
                                    color: C.danger,
                                    fontSize: 11,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        size: 10
                                    }),
                                    " Retry"
                                ]
                            })
                        ]
                    }),
                    result && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 14
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                size: 14,
                                                style: {
                                                    color: C.blue
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: C.text
                                                },
                                                children: "Reasoning Pathway"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8
                                        },
                                        children: result.reasoning.slice(0, visibleSteps).map((step, i)=>{
                                            const colors = STEP_COLORS[i % STEP_COLORS.length];
                                            const isActive = activeStepIndex === i;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                onClick: ()=>setActiveStepIndex(isActive ? null : i),
                                                style: {
                                                    borderRadius: 10,
                                                    background: colors.bg,
                                                    border: `1px solid ${isActive ? colors.border : 'transparent'}`,
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    animation: 'crFadeIn 0.3s ease forwards',
                                                    transition: 'border-color 0.2s ease'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            padding: '10px 12px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                style: {
                                                                    width: 22,
                                                                    height: 22,
                                                                    borderRadius: 6,
                                                                    background: `${colors.accent}18`,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 11,
                                                                    fontWeight: 700,
                                                                    color: colors.accent
                                                                },
                                                                children: i + 1
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontWeight: 600,
                                                                    color: colors.accent,
                                                                    flex: 1
                                                                },
                                                                children: step.step
                                                            }),
                                                            isActive ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                                size: 12,
                                                                style: {
                                                                    color: C.textMuted
                                                                }
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                                size: 12,
                                                                style: {
                                                                    color: C.textMuted
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        style: {
                                                            padding: '0 12px 8px 42px'
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: C.text,
                                                                margin: 0,
                                                                lineHeight: 1.5
                                                            },
                                                            children: step.finding
                                                        })
                                                    }),
                                                    isActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            padding: '8px 12px 12px 42px',
                                                            borderTop: `1px solid ${colors.border}`,
                                                            background: `${colors.accent}04`
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                style: {
                                                                    marginBottom: 8
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            fontWeight: 600,
                                                                            color: C.textSec,
                                                                            textTransform: 'uppercase',
                                                                            letterSpacing: '0.5px'
                                                                        },
                                                                        children: "Significance"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: C.textSec,
                                                                            margin: '4px 0 0',
                                                                            lineHeight: 1.5
                                                                        },
                                                                        children: step.significance
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                style: {
                                                                    padding: '8px 10px',
                                                                    borderRadius: 6,
                                                                    background: `${C.green}08`,
                                                                    borderLeft: `2px solid ${C.green}`
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            fontWeight: 600,
                                                                            color: C.green,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 4
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                                                size: 10
                                                                            }),
                                                                            " Clinical Tip"
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: C.textSec,
                                                                            margin: '3px 0 0',
                                                                            lineHeight: 1.5
                                                                        },
                                                                        children: step.clinicalTip
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, i);
                                        })
                                    })
                                ]
                            }),
                            result.attendingTip && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    padding: 14,
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${C.purple}08, ${C.teal}06)`,
                                    border: `1px solid ${C.purple}18`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: 3,
                                            height: '100%',
                                            background: `linear-gradient(180deg, ${C.purple}, ${C.teal})`
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            marginBottom: 6,
                                            paddingLeft: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                size: 15,
                                                style: {
                                                    color: C.purple
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.purple
                                                },
                                                children: "Attending Tip"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 9,
                                                    padding: '1px 6px',
                                                    borderRadius: 4,
                                                    background: `${C.purple}15`,
                                                    color: C.purple
                                                },
                                                children: "How a specialist thinks"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        style: {
                                            fontSize: 12,
                                            color: C.textSec,
                                            margin: 0,
                                            lineHeight: 1.6,
                                            paddingLeft: 8
                                        },
                                        children: result.attendingTip
                                    })
                                ]
                            }),
                            result.redFlags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                size: 14,
                                                style: {
                                                    color: C.danger
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: C.danger
                                                },
                                                children: "Red Flags"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 6
                                        },
                                        children: result.redFlags.map((rf, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    padding: '10px 12px',
                                                    borderRadius: 8,
                                                    background: 'rgba(255,87,87,0.06)',
                                                    border: `1px solid rgba(255,87,87,0.15)`,
                                                    borderLeft: `3px solid ${C.danger}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            marginBottom: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                                size: 12,
                                                                style: {
                                                                    color: C.danger
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontWeight: 600,
                                                                    color: C.text
                                                                },
                                                                children: rf.flag
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: C.textSec,
                                                            margin: '0 0 4px 18px',
                                                            lineHeight: 1.5
                                                        },
                                                        children: rf.why
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 4,
                                                            marginLeft: 18
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                                size: 10,
                                                                style: {
                                                                    color: C.orange
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    fontWeight: 600,
                                                                    color: C.orange
                                                                },
                                                                children: rf.action
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, i))
                                    })
                                ]
                            }),
                            result.alternativeDiagnoses.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                size: 14,
                                                style: {
                                                    color: C.teal
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: C.text
                                                },
                                                children: "Differential Diagnosis"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            borderRadius: 10,
                                            border: `1px solid ${C.border}`,
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 80px 2fr',
                                                    gap: 0,
                                                    padding: '8px 12px',
                                                    background: C.input,
                                                    borderBottom: `1px solid ${C.border}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            color: C.textMuted,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Diagnosis"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            color: C.textMuted,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Likelihood"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            color: C.textMuted,
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Distinguishing Features"
                                                    })
                                                ]
                                            }),
                                            result.alternativeDiagnoses.map((dx, i)=>{
                                                const lc = LIKELIHOOD_COLORS[dx.likelihood] || LIKELIHOOD_COLORS.moderate;
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 80px 2fr',
                                                        gap: 0,
                                                        padding: '10px 12px',
                                                        borderBottom: i < result.alternativeDiagnoses.length - 1 ? `1px solid ${C.border}` : 'none',
                                                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    style: {
                                                                        width: 6,
                                                                        height: 6,
                                                                        borderRadius: '50%',
                                                                        background: lc.text
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        fontWeight: 500,
                                                                        color: C.text
                                                                    },
                                                                    children: dx.diagnosis
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    padding: '2px 6px',
                                                                    borderRadius: 4,
                                                                    background: lc.bg,
                                                                    color: lc.text,
                                                                    border: `1px solid ${lc.border}`,
                                                                    fontWeight: 600,
                                                                    textTransform: 'capitalize'
                                                                },
                                                                children: dx.likelihood
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: C.textSec,
                                                                lineHeight: 1.5
                                                            },
                                                            children: dx.distinguishingFeatures
                                                        })
                                                    ]
                                                }, i);
                                            })
                                        ]
                                    })
                                ]
                            }),
                            result.keyTakeaway && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    padding: 14,
                                    borderRadius: 10,
                                    background: `${C.green}06`,
                                    border: `1px solid ${C.green}15`,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        size: 16,
                                        style: {
                                            color: C.green,
                                            flexShrink: 0,
                                            marginTop: 1
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: C.green,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                },
                                                children: "Key Takeaway"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: C.textSec,
                                                    margin: '4px 0 0',
                                                    lineHeight: 1.6
                                                },
                                                children: result.keyTakeaway
                                            })
                                        ]
                                    })
                                ]
                            }),
                            showDeeper && deeperContent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    padding: 14,
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${C.cyan}06, ${C.blue}06)`,
                                    border: `1px solid ${C.cyan}15`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                size: 14,
                                                style: {
                                                    color: C.cyan
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: C.cyan
                                                },
                                                children: "Deeper Analysis"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        style: {
                                            fontSize: 12,
                                            color: C.textSec,
                                            margin: 0,
                                            lineHeight: 1.6
                                        },
                                        children: deeperContent
                                    })
                                ]
                            }),
                            !showDeeper && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    setShowDeeper(true);
                                    handleExplainFurther();
                                },
                                disabled: deeperLoading,
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    width: '100%',
                                    padding: '10px 16px',
                                    borderRadius: 10,
                                    border: `1px solid ${C.purple}25`,
                                    background: `${C.purple}08`,
                                    color: C.purple,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: deeperLoading ? 'wait' : 'pointer',
                                    transition: 'all 0.2s ease'
                                },
                                children: deeperLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                width: 12,
                                                height: 12,
                                                border: `2px solid ${C.purple}30`,
                                                borderTopColor: C.purple,
                                                borderRadius: '50%',
                                                animation: 'crSpin 0.8s linear infinite'
                                            }
                                        }),
                                        "Analyzing deeper..."
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertOctagon_AlertTriangle_Brain_ChevronDown_ChevronRight_Eye_GraduationCap_Lightbulb_RotateCcw_Sparkles_Stethoscope_Target_TrendingUp_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            size: 13
                                        }),
                                        "Explain Further"
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 536941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $n: () => (/* binding */ WaveformAudioPlayer),
/* harmony export */   Xj: () => (/* binding */ StructureTagChips),
/* harmony export */   aH: () => (/* binding */ parseQuestionJson),
/* harmony export */   as: () => (/* binding */ EcgStrip),
/* harmony export */   dC: () => (/* binding */ HotspotImage),
/* harmony export */   uH: () => (/* binding */ ConfidenceBar),
/* harmony export */   wA: () => (/* binding */ LabPanelTable)
/* harmony export */ });
/* unused harmony export Phonocardiogram */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24950);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(685461);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(456052);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(358250);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10920);
/* harmony import */ var _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(645535);
/* __next_internal_client_entry_do_not_use__ parseQuestionJson,LabPanelTable,EcgStrip,HotspotImage,StructureTagChips,Phonocardiogram,WaveformAudioPlayer,ConfidenceBar auto */ 
/**
 * Question media components — the enhanced media layer for agent-generated
 * questions:
 *
 *   - LabPanelTable      — styled laboratory panel tables (H/L flags)
 *   - EcgStrip           — ECG rhythm strip frame + interactive wave hotspots
 *   - HotspotImage       — question image with clickable structure pins
 *   - StructureTagChips  — clickable structure chips beside 3D models
 *   - WaveformAudioPlayer— waveform visualizer + 0.5×–2× speed + phonocardiogram
 *                           synced to playback (murmur timing)
 *   - ConfidenceBar      — metacognition prompt before the answer is revealed
 */ 

/** Safely parse a JSON string field of the question record. */ function parseQuestionJson(raw, fallback) {
    if (!raw) return fallback;
    try {
        const parsed = JSON.parse(raw);
        return parsed ?? fallback;
    } catch  {
        return fallback;
    }
}
// ---------------------------------------------------------------------------
// Lab panel table
// ---------------------------------------------------------------------------
function LabPanelTable({ panels }) {
    if (!panels.length) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-4 grid gap-3 md:grid-cols-2",
        children: panels.map((panel, pi)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-xl border border-white/[0.08] bg-[#0f1118]/70 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-3.5 py-2.5 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#4fc3f7]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[11px] font-bold text-[#7cc7ff] uppercase tracking-wider",
                                children: panel.name
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                        className: "w-full text-[12px]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    className: "text-[#5a6478] text-[10px] uppercase tracking-wider",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left font-semibold px-3.5 pt-2 pb-1",
                                            children: "Test"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right font-semibold px-2 pt-2 pb-1",
                                            children: "Result"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left font-semibold px-2 pt-2 pb-1 w-14",
                                            children: "Units"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-center font-semibold px-3 pt-2 pb-1 w-10",
                                            children: "Flag"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                children: panel.rows.map((row, ri)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        className: "border-t border-white/[0.04] hover:bg-white/[0.02]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-3.5 py-1.5 text-[#e8ecf4] font-medium",
                                                children: row.test
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-2 py-1.5 text-right font-mono font-bold text-[#e8ecf4]",
                                                children: row.value
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-2 py-1.5 text-[#8b95a8]",
                                                children: row.unit
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-3 py-1.5 text-center",
                                                children: row.flag === 'H' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-block px-1.5 py-0.5 rounded-md bg-[#ff5757]/[0.15] text-[#ff8a8a] text-[10px] font-bold",
                                                    children: "H"
                                                }) : row.flag === 'L' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-block px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/[0.15] text-[#7cc7ff] text-[10px] font-bold",
                                                    children: "L"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#3a4055] text-[10px]",
                                                    children: "—"
                                                })
                                            })
                                        ]
                                    }, ri))
                            })
                        ]
                    })
                ]
            }, pi))
    });
}
function EcgStrip({ url, hotspots, selectedAnswer, revealed, isCorrectOption, onSelect }) {
    const pins = hotspots || [];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        className: "w-4 h-4 text-[#ff8a8a]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs font-bold text-[#ff8a8a]",
                        children: "ECG \xb7 Lead II rhythm strip"
                    }),
                    pins.length > 0 && !revealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "ml-auto flex items-center gap-1 text-[10px] text-[#5a6478]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            "click a wave to answer"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative bg-white",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                        src: url,
                        alt: "ECG rhythm strip",
                        className: "w-full max-w-full block"
                    }),
                    pins.map((pin, i)=>{
                        const isSelected = selectedAnswer != null && pin.label.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
                        const isCorrect = revealed && isCorrectOption ? isCorrectOption(pin.label) : false;
                        const isWrongPick = revealed && isSelected && !isCorrect;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: ()=>onSelect?.(pin.label),
                            disabled: revealed,
                            title: pin.label,
                            className: "absolute -translate-x-1/2 -translate-y-1/2 group",
                            style: {
                                left: `${pin.x}%`,
                                top: `${pin.y}%`
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: [
                                        'flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border-2 transition-all',
                                        isCorrect ? 'bg-[#00e5a0] border-[#00e5a0] text-[#06251a] scale-110 shadow-[0_0_12px_rgba(0,229,160,0.6)]' : isWrongPick ? 'bg-[#ff5757] border-[#ff5757] text-white scale-110' : isSelected ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24] scale-110' : revealed ? 'bg-white/70 border-[#8b95a8] text-[#3a4055]' : 'bg-white/85 border-[#3a4055] text-[#0b1220] hover:border-[#4fc3f7] hover:bg-[#4fc3f7] hover:text-[#0a1a24] cursor-pointer hover:scale-110'
                                    ].join(' '),
                                    children: pin.label.charAt(0)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "absolute left-1/2 -translate-x-1/2 top-full mt-0.5 whitespace-nowrap text-[9px] font-semibold text-[#3a4055] bg-white/85 px-1 py-0.5 rounded group-hover:bg-[#e6f6ff] pointer-events-none",
                                    children: pin.label
                                })
                            ]
                        }, i);
                    })
                ]
            })
        ]
    });
}
function HotspotImage({ url, alt, hotspots, selectedAnswer, revealed, isCorrectOption, onSelect }) {
    const pins = hotspots || [];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                src: url,
                alt: alt,
                className: "w-full max-w-full block",
                style: {
                    maxHeight: 420,
                    objectFit: 'contain'
                }
            }),
            pins.map((pin, i)=>{
                const isSelected = selectedAnswer != null && pin.label.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
                const isCorrect = revealed && isCorrectOption ? isCorrectOption(pin.label) : false;
                const isWrongPick = revealed && isSelected && !isCorrect;
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    type: "button",
                    onClick: ()=>onSelect?.(pin.label),
                    disabled: revealed,
                    title: pin.label,
                    className: "absolute -translate-x-1/2 -translate-y-1/2",
                    style: {
                        left: `${pin.x}%`,
                        top: `${pin.y}%`
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: [
                            'flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-[10px] font-bold border-2 transition-all backdrop-blur-sm',
                            isCorrect ? 'bg-[#00e5a0] border-[#00e5a0] text-[#06251a] shadow-[0_0_12px_rgba(0,229,160,0.6)]' : isWrongPick ? 'bg-[#ff5757] border-[#ff5757] text-white' : isSelected ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24]' : revealed ? 'bg-black/60 border-white/40 text-white' : 'bg-black/60 border-white/70 text-white hover:bg-[#4fc3f7] hover:border-[#4fc3f7] cursor-pointer'
                        ].join(' '),
                        children: pin.label.length > 14 ? `${pin.label.slice(0, 13)}…` : pin.label
                    })
                }, i);
            })
        ]
    });
}
function StructureTagChips({ tags, selectedAnswer, revealed, isCorrectOption, onSelect }) {
    if (!tags.length) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "px-4 py-3 border-t border-white/[0.06]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-[10px] text-[#5a6478] mb-2 flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-3 h-3"
                    }),
                    "Click a structure to identify it — drag the model to explore first"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex flex-wrap gap-2",
                children: tags.map((tag, i)=>{
                    const isSelected = selectedAnswer != null && tag.name.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
                    const isCorrect = revealed && isCorrectOption ? isCorrectOption(tag.name) : false;
                    const isWrongPick = revealed && isSelected && !isCorrect;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>onSelect?.(tag.name),
                        disabled: revealed,
                        className: [
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold border transition-all',
                            isCorrect ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/50 text-[#00e5a0]' : isWrongPick ? 'bg-[#ff5757]/[0.12] border-[#ff5757]/40 text-[#ff8a8a]' : isSelected ? 'bg-[#4fc3f7]/[0.12] border-[#4fc3f7]/50 text-[#7cc7ff]' : revealed ? 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]' : 'bg-white/[0.04] border-white/[0.08] text-[#e8ecf4] hover:border-[#00e5a0]/40 hover:text-[#00e5a0] cursor-pointer'
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: `w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center rounded-md text-[9px] font-bold ${isCorrect ? 'bg-[#00e5a0]/20 text-[#00e5a0]' : 'bg-white/[0.06] text-[#8b95a8]'}`,
                                children: tag.letter
                            }),
                            tag.name,
                            isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#00e5a0]"
                            })
                        ]
                    }, i);
                })
            })
        ]
    });
}
// ---------------------------------------------------------------------------
// Phonocardiogram — cardiac cycle diagram synced to audio playback
// ---------------------------------------------------------------------------
const PHASE_BOUNDS = {
    systolic: [
        0.08,
        0.34
    ],
    holosystolic: [
        0.05,
        0.35
    ],
    diastolic: [
        0.44,
        0.94
    ],
    continuous: [
        0.05,
        0.94
    ]
};
function murmurAmplitude(shape, t) {
    // t in [0,1] across the murmur envelope
    switch(shape){
        case 'plateau':
            return Math.min(1, t * 14, (1 - t) * 14) * 0.85;
        case 'decrescendo':
            return Math.pow(1 - t, 1.4) * 0.95;
        case 'musical':
            return (0.4 + 0.28 * Math.sin(t * 46)) * Math.sin(Math.PI * Math.min(1, Math.max(0, t * 8))) * 0.8;
        case 'crescendo-decrescendo':
        default:
            return Math.sin(Math.PI * t) * 0.95;
    }
}
function Phonocardiogram({ spec, currentTime, duration, playing }) {
    const W = 600;
    const H = 132;
    const BASE = 84; // baseline y of the trace
    const AMP = 46; // max murmur amplitude px
    const bounds = PHASE_BOUNDS[spec.phase] || PHASE_BOUNDS.systolic;
    const [x0, x1] = bounds;
    // Murmur trace points
    const murmurPts = [];
    const N = 60;
    for(let i = 0; i <= N; i++){
        const t = i / N;
        const x = (x0 + (x1 - x0) * t) * W;
        const amp = murmurAmplitude(spec.shape, t);
        // oscillating fine structure (frequency ~ 4 cycles per envelope quarter)
        const osc = Math.sin(t * Math.PI * 24) * 0.18 + 1;
        const y = BASE - amp * AMP * osc * 0.55;
        murmurPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    // Heart sound spikes: S1 at 0.04, S2 at 0.38
    const s1x = 0.04 * W;
    const s2x = 0.38 * W;
    const spike = (x, h, w)=>`M ${(x - w).toFixed(1)} ${BASE} L ${x.toFixed(1)} ${(BASE - h).toFixed(1)} L ${(x + w).toFixed(1)} ${BASE}`;
    // Playhead: sweeps one cardiac cycle per beat; cycle derived from the audio's
    // implied heart rate (~0.8s per beat at rest).
    const beats = Math.max(1, Math.round((duration || 4) / 0.8));
    const cycleDur = (duration || 4) / beats;
    const cyclePos = (currentTime || 0) % cycleDur / cycleDur;
    const playheadX = cyclePos * W;
    const inMurmur = cyclePos >= x0 && cyclePos <= x1;
    const phaseLabel = spec.phase === 'systolic' ? 'SYSTOLIC' : spec.phase === 'holosystolic' ? 'HOLOSYSTOLIC' : spec.phase === 'diastolic' ? 'DIASTOLIC' : 'CONTINUOUS';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-3 rounded-xl border border-white/[0.08] bg-[#0f1118]/70 overflow-hidden",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-3.5 py-2 flex items-center gap-2 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 text-[#ff8a8a]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[11px] font-bold text-[#ff8a8a] uppercase tracking-wider",
                        children: "Phonocardiogram"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: `ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${playing && inMurmur ? 'bg-[#ff5757]/20 text-[#ff8a8a] animate-pulse' : 'bg-white/[0.04] text-[#5a6478]'}`,
                        children: [
                            phaseLabel,
                            " murmur"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-2 py-1",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    viewBox: `0 0 ${W} ${H}`,
                    className: "w-full",
                    style: {
                        background: '#0b0e15'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                            x: 0,
                            y: 0,
                            width: s1x,
                            height: BASE + 8,
                            fill: "rgba(255,255,255,0.015)"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                            x: s1x,
                            y: 0,
                            width: s2x - s1x,
                            height: BASE + 8,
                            fill: "rgba(255,138,138,0.05)"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                            x: s2x,
                            y: 0,
                            width: W - s2x,
                            height: BASE + 8,
                            fill: "rgba(79,195,247,0.04)"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                            x1: 0,
                            y1: BASE,
                            x2: W,
                            y2: BASE,
                            stroke: "rgba(255,255,255,0.12)",
                            strokeWidth: 1
                        }),
                        spec.s1 !== false && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: spike(s1x, 30, 4),
                            fill: "none",
                            stroke: "#ff8a8a",
                            strokeWidth: 2.2,
                            strokeLinejoin: "round"
                        }),
                        spec.s2 !== false && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: spike(s2x, 22, 4),
                            fill: "none",
                            stroke: "#ff8a8a",
                            strokeWidth: 2.2,
                            strokeLinejoin: "round"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                            points: murmurPts.join(' '),
                            fill: "none",
                            stroke: inMurmur && playing ? '#ff5757' : 'rgba(255,87,87,0.55)',
                            strokeWidth: inMurmur && playing ? 2.2 : 1.6,
                            strokeLinejoin: "round"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polygon", {
                            points: `${(x0 * W).toFixed(1)},${BASE} ${murmurPts.join(' ')} ${(x1 * W).toFixed(1)},${BASE}`,
                            fill: inMurmur && playing ? 'rgba(255,87,87,0.16)' : 'rgba(255,87,87,0.07)'
                        }),
                        playing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                            x1: playheadX,
                            y1: 6,
                            x2: playheadX,
                            y2: BASE + 8,
                            stroke: "#00e5a0",
                            strokeWidth: 1.6,
                            opacity: 0.9,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("animate", {
                                attributeName: "opacity",
                                values: "0.9;0.4;0.9",
                                dur: "0.8s",
                                repeatCount: "indefinite"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("text", {
                            x: s1x,
                            y: BASE + 20,
                            textAnchor: "middle",
                            fontSize: 10,
                            fontWeight: 700,
                            fill: "#ff8a8a",
                            children: "S1"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("text", {
                            x: (s1x + s2x) / 2,
                            y: BASE + 20,
                            textAnchor: "middle",
                            fontSize: 9,
                            letterSpacing: 2,
                            fill: "#8b95a8",
                            children: "SYSTOLE"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("text", {
                            x: s2x,
                            y: BASE + 20,
                            textAnchor: "middle",
                            fontSize: 10,
                            fontWeight: 700,
                            fill: "#ff8a8a",
                            children: "S2"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("text", {
                            x: (s2x + W) / 2,
                            y: BASE + 20,
                            textAnchor: "middle",
                            fontSize: 9,
                            letterSpacing: 2,
                            fill: "#8b95a8",
                            children: "DIASTOLE"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("text", {
                            x: 8,
                            y: 16,
                            fontSize: 9,
                            fill: "#5a6478",
                            children: [
                                "one cardiac cycle ",
                                spec.bestHeard ? `· best heard: ${spec.bestHeard}` : ''
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
// ---------------------------------------------------------------------------
// Waveform audio player — waveform + speed + phonocardiogram sync
// ---------------------------------------------------------------------------
const SPEEDS = [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2
];
function WaveformAudioPlayer({ src, pcgSpec, title }) {
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const rafRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [duration, setDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [current, setCurrent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [speed, setSpeed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [peaks, setPeaks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [peaksFailed, setPeaksFailed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Decode the audio buffer into peak amplitudes for the waveform
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let cancelled = false;
        let ctx = null;
        (async ()=>{
            try {
                const res = await fetch(src);
                const buf = await res.arrayBuffer();
                const AudioCtor = window.AudioContext || window.webkitAudioContext;
                ctx = new AudioCtor();
                const decoded = await ctx.decodeAudioData(buf.slice(0));
                const ch = decoded.getChannelData(0);
                const BARS = 110;
                const step = Math.floor(ch.length / BARS) || 1;
                const p = [];
                for(let i = 0; i < BARS; i++){
                    let max = 0;
                    // sparse sampling keeps this fast for long files
                    for(let j = 0; j < step; j += Math.max(1, Math.floor(step / 220))){
                        const v = Math.abs(ch[i * step + j] || 0);
                        if (v > max) max = v;
                    }
                    p.push(max);
                }
                ctx.close().catch(()=>{});
                if (!cancelled) setPeaks(p);
            } catch  {
                if (!cancelled) setPeaksFailed(true);
            }
        })();
        return ()=>{
            cancelled = true;
            ctx?.close().catch(()=>{});
        };
    }, [
        src
    ]);
    // Normalize peaks to 0..1
    const normalizedPeaks = peaks ? (()=>{
        const max = Math.max(...peaks, 0.01);
        return peaks.map((p)=>p / max);
    })() : null;
    // Draw waveform with progress
    const draw = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
        }
        const ctx2d = canvas.getContext('2d');
        if (!ctx2d) return;
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx2d.clearRect(0, 0, w, h);
        const p = normalizedPeaks;
        const progress = duration > 0 ? current / duration : 0;
        const BARS = 110;
        const gap = 2;
        const barW = (w - gap * (BARS - 1)) / BARS;
        const midY = h / 2;
        for(let i = 0; i < BARS; i++){
            const amp = p ? Math.max(0.06, p[i]) : Math.abs(Math.sin(i * 0.35) * 0.5) + 0.08; // placeholder bars while decoding
            const barH = amp * (h * 0.86);
            const x = i * (barW + gap);
            const played = i / BARS <= progress;
            if (played) {
                const grad = ctx2d.createLinearGradient(0, midY - barH / 2, 0, midY + barH / 2);
                grad.addColorStop(0, '#00e5a0');
                grad.addColorStop(1, 'rgba(0,229,160,0.45)');
                ctx2d.fillStyle = grad;
            } else {
                ctx2d.fillStyle = 'rgba(139,149,168,0.35)';
            }
            const r = Math.min(barW / 2, 1.5);
            ctx2d.beginPath();
            ctx2d.roundRect(x, midY - barH / 2, barW, barH, r);
            ctx2d.fill();
        }
        // progress playhead
        if (duration > 0) {
            const px = progress * w;
            ctx2d.fillStyle = '#00e5a0';
            ctx2d.beginPath();
            ctx2d.arc(px, midY, 3, 0, Math.PI * 2);
            ctx2d.fill();
        }
    }, [
        normalizedPeaks,
        current,
        duration
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        draw();
    }, [
        draw
    ]);
    // rAF loop for smooth progress + PCG sync while playing
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!playing) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            return;
        }
        const tick = ()=>{
            const a = audioRef.current;
            if (a) setCurrent(a.currentTime);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return ()=>{
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [
        playing
    ]);
    const togglePlay = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            a.play().catch(()=>{});
        } else {
            a.pause();
        }
    }, []);
    const seek = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        const a = audioRef.current;
        const canvas = canvasRef.current;
        if (!a || !canvas || !duration) return;
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        a.currentTime = ratio * duration;
        setCurrent(ratio * duration);
    }, [
        duration
    ]);
    const changeSpeed = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((s)=>{
        setSpeed(s);
        if (audioRef.current) audioRef.current.playbackRate = s;
    }, []);
    const fmt = (t)=>{
        if (!Number.isFinite(t)) return '0:00';
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-4 rounded-xl border border-white/[0.08] bg-[#0f1118]/50 p-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#8b5cf6]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs font-bold text-[#e8ecf4] flex items-center gap-1.5",
                                children: title || 'Listen to the audio, then answer'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px] text-[#5a6478]",
                                children: [
                                    playing ? 'Playing' : peaks ? 'Ready' : 'Loading waveform…',
                                    pcgSpec ? ' · phonocardiogram below tracks the cardiac cycle' : ''
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: togglePlay,
                        className: "w-11 h-11 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#b388ff] flex items-center justify-center hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6]/50 transition-all flex-shrink-0",
                        "aria-label": playing ? 'Pause' : 'Play',
                        children: playing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-5 h-5 ml-0.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("canvas", {
                        ref: canvasRef,
                        onClick: seek,
                        className: "flex-1 h-14 rounded-lg cursor-pointer min-w-0",
                        style: {
                            background: 'rgba(255,255,255,0.02)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px] font-mono text-[#8b95a8] tabular-nums flex-shrink-0 w-20 text-right",
                        children: [
                            fmt(current),
                            " / ",
                            fmt(duration)
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1.5 mt-3 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 text-[#5a6478] mr-0.5"
                    }),
                    SPEEDS.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: ()=>changeSpeed(s),
                            className: [
                                'px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all',
                                speed === s ? 'bg-[#8b5cf6]/[0.15] border-[#8b5cf6]/40 text-[#b388ff]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#b388ff] hover:border-[#8b5cf6]/30'
                            ].join(' '),
                            children: [
                                s,
                                "\xd7"
                            ]
                        }, s)),
                    peaksFailed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] text-[#5a6478] ml-1",
                        children: "waveform unavailable for this source"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("audio", {
                ref: audioRef,
                src: src,
                preload: "metadata",
                onLoadedMetadata: (e)=>setDuration(e.currentTarget.duration || 0),
                onPlay: ()=>setPlaying(true),
                onPause: ()=>setPlaying(false),
                onEnded: ()=>setPlaying(false),
                onTimeUpdate: (e)=>{
                    if (!playing) setCurrent(e.currentTarget.currentTime);
                },
                className: "hidden"
            }),
            pcgSpec && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Phonocardiogram, {
                spec: pcgSpec,
                currentTime: current,
                duration: duration,
                playing: playing
            })
        ]
    });
}
const CONFIDENCE_OPTIONS = [
    {
        level: 'sure',
        label: "I'm sure",
        hint: 'committed answer',
        icon: _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        color: '#00e5a0',
        bg: 'rgba(0,229,160,0.08)',
        border: 'rgba(0,229,160,0.25)'
    },
    {
        level: 'probably',
        label: 'Probably',
        hint: 'leaning answer',
        icon: _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A,
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.25)'
    },
    {
        level: 'guessing',
        label: 'Guessing',
        hint: 'uncertain answer',
        icon: _barrel_optimize_names_Activity_CheckCircle2_Gauge_HelpCircle_MousePointerClick_Pause_Play_Stethoscope_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
        color: '#ff8a8a',
        bg: 'rgba(255,87,87,0.08)',
        border: 'rgba(255,87,87,0.25)'
    }
];
function ConfidenceBar({ onChoose, onSkip, disabled }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mb-3 rounded-xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.05] p-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-[11px] font-bold text-[#b388ff] mb-2.5 flex items-center gap-1.5",
                children: [
                    "\uD83E\uDDE0 Before the reveal — how confident are you?",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "ml-1 text-[9px] font-medium text-[#5a6478] normal-case",
                        children: "rating your confidence strengthens memory"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-2 flex-wrap items-center",
                children: [
                    CONFIDENCE_OPTIONS.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            disabled: disabled,
                            onClick: ()=>onChoose(opt.level),
                            className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11.5px] font-bold border transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                            style: {
                                background: opt.bg,
                                borderColor: opt.border,
                                color: opt.color
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(opt.icon, {
                                    className: "w-3.5 h-3.5"
                                }),
                                opt.label,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[9px] font-medium opacity-60",
                                    children: opt.hint
                                })
                            ]
                        }, opt.level)),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        disabled: disabled,
                        onClick: onSkip,
                        className: "ml-auto text-[10.5px] text-[#5a6478] hover:text-[#8b95a8] underline underline-offset-2 disabled:opacity-50 cursor-pointer",
                        children: "skip & reveal"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 558652:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ PdfCanvasViewer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(963883);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(632847);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(632511);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(148924);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(894773);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(24422);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(790069);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * PdfCanvasViewer — a CUSTOM PDF reader built on pdf.js, styled to match the
 * MedQ dark theme (the browser's built-in <iframe> viewer is light-gray and
 * cannot be themed, which clashed with the app design).
 *
 * Features:
 *   - Continuous page scroll with LAZY per-page canvas rendering
 *     (IntersectionObserver — only pages near the viewport render) plus
 *     PRIORITY rendering: the page holding a cited passage renders first.
 *   - Streaming download with a REAL progress bar (bytes received vs
 *     Content-Length) — a multi-MB PDF no longer shows a blind spinner.
 *   - Zoom: fit-width / fit-page / custom % (25–400), live page indicator.
 *   - Page navigation: first / prev / next / last + jump-to-page input.
 *   - Crisp text: devicePixelRatio-aware canvases.
 *   - Citation HIGHLIGHT: the quote's text layer is scanned in PARALLEL
 *     batches (≈8 pages at once, first match in document order wins), the
 *     viewer jumps INSTANTLY to the page (smooth only for near pages) and
 *     overlays persistent amber highlighter boxes on the exact text runs.
 *   - App-styled toolbar (same tokens as the rest of MedQ: #0f1320 surfaces,
 *     white/10 borders, #4fc3f7 accent).
 *   - Graceful fallback: if pdf.js fails to initialize, renders the old
 *     embedded browser viewer (iframe) so a viewer is ALWAYS available.
 *
 * The document bytes come from the owner-gated serving route
 * (GET /api/knowledge/sources/[id]/file — cookie-authenticated, so it must be
 * fetched and fed to pdf.js rather than given as a bare object URL).
 */ 

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
function clampScale(s) {
    if (!Number.isFinite(s) || s <= 0) return 1;
    return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, s));
}
function PdfCanvasViewer({ src, fileName, onDocumentStats, highlight, onHighlightFound }) {
    const [doc, setDoc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loadError, setLoadError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [numPages, setNumPages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    /** Base page size at scale 1 (pages are usually uniform; first page wins). */ const [baseSize, setBaseSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [zoomMode, setZoomMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('fit-width');
    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [containerSize, setContainerSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /** Citation match: page number + highlight boxes (PDF units, scale 1),
   *  stored WITH the quote it belongs to — the ACTIVE match is derived during
   *  render (stale entries for a different quote never show). */ const [hlState, setHlState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const hlKey = highlight?.trim() ? highlight : '';
    const activeMatch = hlState && hlKey && hlState.key === hlKey ? hlState : null;
    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const pageRefs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    /** Strict-mode double-mount guard for the async document load. */ const initRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    /** Real download progress while the PDF streams in (null once loaded). */ const [dlProgress, setDlProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const statsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onDocumentStats);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        statsRef.current = onDocumentStats;
    }, [
        onDocumentStats
    ]);
    const hlFoundRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onHighlightFound);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        hlFoundRef.current = onHighlightFound;
    }, [
        onHighlightFound
    ]);
    /* ── Load pdf.js + the document ─────────────────────────────────────── */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (initRef.current) return;
        initRef.current = true;
        let destroyed = false;
        /** The LOADING TASK owns the worker lifecycle — in pdfjs-dist v6
     *  PDFDocumentProxy has NO destroy(); only the loading task does.
     *  (Calling proxy.destroy() threw "pdf.destroy is not a function"
     *  and crashed the whole route on tab switch.) */ let loadingTask = null;
        (async ()=>{
            try {
                const pdfjsLib = await __webpack_require__.e(/* import() */ 7270).then(__webpack_require__.bind(__webpack_require__, 427270));
                if (destroyed) return;
                // Worker setup — identical pattern to src/lib/file-extract.ts: load
                // the version-matched worker from /public via a blob URL (reliable,
                // no CDN fetch, no MIME issues).
                if (false) {}
                // PROGRESSIVE loading — hand pdf.js the URL, not the bytes: it reads
                // the document STRUCTURE via HTTP Range requests (the xref lives at
                // the file's tail) and fetches only the objects for the pages that
                // actually render. The first page paints after a few hundred KB
                // instead of after the WHOLE file downloads — the serving route is
                // Range-capable (206 + Accept-Ranges + Content-Length), and
                // withCredentials keeps the owner cookie on every range request.
                // Falls back to a full streamed download automatically when a proxy
                // strips Range support, so the viewer keeps working everywhere.
                const task = pdfjsLib.getDocument({
                    url: src,
                    withCredentials: true,
                    rangeChunkSize: 262144,
                    useWorkerFetch: false,
                    useSystemFonts: true,
                    // Fetch ONLY what is actually needed (doc structure + rendered
                    // pages + the citation scan's text layers) — opening a citation no
                    // longer downloads the whole multi-MB textbook. Ignored when the
                    // server/proxy lacks Range support (pdf.js then streams fully).
                    disableAutoFetch: true,
                    disableStream: false
                });
                loadingTask = task;
                task.onProgress = (data)=>{
                    if (destroyed) return;
                    const loaded = Number(data?.loaded ?? 0);
                    const total = Number(data?.total ?? 0);
                    if (total > 0) setDlProgress({
                        loaded,
                        total
                    });
                };
                const loaded = await task.promise;
                if (destroyed) {
                    void task.destroy().catch(()=>{});
                    return;
                }
                setDoc(loaded);
                setDlProgress(null);
                setNumPages(loaded.numPages);
                statsRef.current?.(loaded.numPages);
                // First page's objects arrive via a couple of range fetches — baseSize
                // (needed for the zoom math) is known almost immediately.
                const page1 = await loaded.getPage(1);
                const vp = page1.getViewport({
                    scale: 1
                });
                if (!destroyed) setBaseSize({
                    w: vp.width,
                    h: vp.height
                });
            } catch (e) {
                if (!destroyed) setLoadError(e instanceof Error ? e.message : 'Failed to open the PDF');
            }
        })();
        return ()=>{
            destroyed = true;
            // destroy() on the loading task tears down the worker — safe even
            // while pages are still rendering (pending renderTasks reject).
            if (loadingTask) void loadingTask.destroy().catch(()=>{});
            initRef.current = false;
        };
    }, [
        src
    ]);
    /* ── Citation highlight: scan the text layers for the quoted passage ──
     Runs once per (doc, highlight). Pages are scanned in PARALLEL BATCHES
     (~8 concurrent getTextContent calls — a 600-page textbook is covered
     ~8× faster than the old sequential walk) with the first match in
     DOCUMENT ORDER winning. Each page's text items are normalized
     (whitespace-collapsed, lowercased, soft hyphens dropped) and joined so a
     quote spanning line breaks still matches. The covering text items become
     highlight boxes (PDF units, y pre-flipped), scaled up at render time; the
     match page gets PRIORITY rendering and the viewer jumps to it INSTANTLY
     (smooth scroll only for near pages — animating across hundreds of
     placeholders was the "wait then scroll" lag). */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!doc || !hlKey) return;
        let cancelled = false;
        // Normalize BOTH sides identically: soft hyphens dropped, whitespace
        // collapsed AND trimmed, lowercased. Items are filtered to non-empty
        // BEFORE joining — pdf.js emits empty text items between lines (w:0,h:0)
        // that would otherwise create double spaces in the joined page text and
        // break matching against the single-spaced quote.
        const norm = (s)=>s.replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
        const quote = norm(hlKey);
        // Pass 2 ("squeezed"): collapse "<wordchar>- <wordchar>" joins so
        // DEHYPHENATED quotes ("dyspnea", from the sentence-aware re-index)
        // still match the PDF text layer's line-end hyphenation ("dys- pnea").
        // Each removal drops 2 chars — remapped to joined-space during the walk.
        const squeeze = (s)=>{
            let out = '';
            const removals = [];
            for(let i = 0; i < s.length;){
                if (s[i] === '-' && s[i + 1] === ' ' && out.length > 0 && /[a-z0-9]/.test(out[out.length - 1]) && /[a-z0-9]/.test(s[i + 2] ?? '')) {
                    removals.push(out.length);
                    i += 2;
                } else {
                    out += s[i];
                    i += 1;
                }
            }
            return {
                out,
                removals
            };
        };
        const toJoinedIdx = (squeezedIdx, removals)=>squeezedIdx + 2 * removals.filter((r)=>r <= squeezedIdx).length;
        // Try progressively shorter prefixes — chunks are stored verbatim, but
        // PDF text streams can differ in ligatures / spacing.
        const prefixLengths = [
            200,
            120,
            60
        ];
        const SCAN_BATCH = 8;
        (async ()=>{
            const maxPages = Math.min(doc.numPages, 200);
            for (const squeezed of [
                false,
                true
            ]){
                const quoteSrc = squeezed ? squeeze(quote).out : quote;
                // Prefix start offsets: 0, plus a skip over a leading bare page
                // number ("18 Hyperendemic…") — the merged extraction used at
                // ingestion glues page FOOTER numbers onto the next page's heading,
                // but in the PER-PAGE text layer that number is not adjacent to the
                // heading, so offset-0 prefixes of cross-page quotes never match.
                const starts = [
                    0
                ];
                const sp = quoteSrc.indexOf(' ');
                if (sp > 0 && sp <= 4 && /^\d+[.:-]?$/.test(quoteSrc.slice(0, sp))) starts.push(sp + 1);
                const prefixes = starts.flatMap((s)=>prefixLengths.map((n)=>quoteSrc.slice(s, s + n))).filter((p)=>p.length >= 20);
                for(let batchStart = 1; batchStart <= maxPages && !cancelled; batchStart += SCAN_BATCH){
                    const batchPages = [];
                    for(let p = batchStart; p < batchStart + SCAN_BATCH && p <= maxPages; p++)batchPages.push(p);
                    // Scan the batch CONCURRENTLY (getPage + getTextContent are worker
                    // round-trips — batching hides their latency).
                    const results = await Promise.all(batchPages.map(async (p)=>{
                        try {
                            const page = await doc.getPage(p);
                            const tc = await page.getTextContent();
                            const items = (tc.items || []).filter((it)=>typeof it.str === 'string' && it.transform != null && norm(it.str).length > 0);
                            const normStrs = items.map((it)=>norm(it.str));
                            let joined = normStrs.join(' ');
                            if (!joined) return null;
                            let removals = [];
                            if (squeezed) {
                                const sq = squeeze(joined);
                                joined = sq.out;
                                removals = sq.removals;
                            }
                            for (const prefix of prefixes){
                                const idx = joined.indexOf(prefix);
                                if (idx === -1) continue;
                                // Map back to plain joined-space so the item walk below (which
                                // counts normStrs lengths + 1 join space) stays exact.
                                const startIdx = squeezed ? toJoinedIdx(idx, removals) : idx;
                                const end = squeezed ? toJoinedIdx(idx + prefix.length, removals) : idx + prefix.length;
                                const vp = page.getViewport({
                                    scale: 1
                                });
                                const rects = [];
                                let pos = 0;
                                for(let i = 0; i < items.length; i++){
                                    const len = normStrs[i].length;
                                    const itemStart = pos;
                                    const itemEnd = pos + len;
                                    if (len > 0 && itemEnd > startIdx && itemStart < end) {
                                        const t = items[i].transform;
                                        const fontH = Math.hypot(t[2] || 0, t[3] || 0) || items[i].height || 10;
                                        rects.push({
                                            left: t[4] || 0,
                                            // baseline at y=f (y-up) → flip; text ascends ~0.85·fontH above
                                            top: vp.height - (t[5] || 0) - fontH * 0.85,
                                            w: items[i].width || fontH * 2,
                                            h: fontH * 1.15
                                        });
                                    }
                                    pos = itemEnd + 1;
                                    if (itemStart >= end) break;
                                }
                                if (rects.length) return {
                                    p,
                                    rects
                                };
                            }
                            page.cleanup();
                            return null;
                        } catch  {}
                        return null;
                    }));
                    if (cancelled) return;
                    // First match in DOCUMENT order wins (batches scan in order, but the
                    // concurrent calls resolve out of order — pick the lowest page hit).
                    const hit = results.find((r)=>r !== null && r.rects.length > 0);
                    if (hit) {
                        setHlState({
                            key: hlKey,
                            page: hit.p,
                            rects: hit.rects
                        });
                        hlFoundRef.current?.(hit.p);
                        // Jump as soon as the layout settles — INSTANT (behavior 'auto'):
                        // the old smooth scroll animated across hundreds of placeholder
                        // pages, which read as "wait for full loading, then scroll".
                        // Target the FIRST HIGHLIGHT BOX (not the page div): the quote
                        // usually sits in the upper part of the page, which a page-level
                        // 'center' scroll can leave above the fold.
                        setTimeout(()=>{
                            if (cancelled) return;
                            const pageEl = pageRefs.current[hit.p - 1];
                            const firstBox = pageEl?.querySelector('[class*="citation-box-pulse"]');
                            (firstBox ?? pageEl)?.scrollIntoView({
                                behavior: 'auto',
                                block: 'center'
                            });
                            setCurrentPage(hit.p);
                            // Second pass once React has certainly committed the highlight
                            // boxes (the first attempt may run pre-commit and hit the
                            // page-div fallback) — idempotent, just tightens the position.
                            setTimeout(()=>{
                                if (cancelled) return;
                                const box = pageRefs.current[hit.p - 1]?.querySelector('[class*="citation-box-pulse"]');
                                box?.scrollIntoView({
                                    behavior: 'auto',
                                    block: 'center'
                                });
                            }, 300);
                        }, 80);
                        return;
                    }
                }
            }
            if (!cancelled) hlFoundRef.current?.(null);
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        doc,
        hlKey
    ]);
    /* ── Track the scroll container size (ResizeObserver, rAF-throttled) ──
     Re-runs when the viewer branch actually mounts: during the initial
     loading state the scroll container doesn't exist yet (scrollRef is
     null), so an observer attached then would never report a size. */ const viewerMounted = Boolean(doc && baseSize) && !loadError;
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!viewerMounted) return;
        const el = scrollRef.current;
        if (!el) return;
        let raf = 0;
        const ro = new ResizeObserver(()=>{
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(()=>{
                setContainerSize({
                    w: el.clientWidth,
                    h: el.clientHeight
                });
            });
        });
        ro.observe(el);
        setContainerSize({
            w: el.clientWidth,
            h: el.clientHeight
        });
        return ()=>{
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [
        viewerMounted
    ]);
    /* ── Effective scale from the zoom mode ─────────────────────────────── */ const scale = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!baseSize || !containerSize || containerSize.w < 50) return 1;
        const padX = 36; // breathing room each side
        const padY = 28;
        if (zoomMode === 'fit-width') {
            return clampScale((containerSize.w - padX) / baseSize.w);
        }
        if (zoomMode === 'fit-page') {
            return clampScale(Math.min((containerSize.w - padX) / baseSize.w, (containerSize.h - padY) / baseSize.h));
        }
        return clampScale(zoomMode);
    }, [
        baseSize,
        containerSize,
        zoomMode
    ]);
    /* ── Page navigation ────────────────────────────────────────────────── */ const goToPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((page)=>{
        if (!numPages) return;
        const target = Math.max(1, Math.min(numPages, page));
        pageRefs.current[target - 1]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setCurrentPage(target);
    }, [
        numPages
    ]);
    /* ── Zoom helpers ───────────────────────────────────────────────────── */ /* Steps continue from the CURRENT VISIBLE scale — so zooming out of a
     189% fit-width lands on 169%, not on 80% (the 100% baseline). */ const stepZoom = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((dir)=>{
        setZoomMode(clampScale(scale + dir * 0.2));
    }, [
        scale
    ]);
    const zoomPercent = Math.round(scale * 100);
    /* ── Toolbar button (shared styling) ────────────────────────────────── */ const toolBtn = 'flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] ' + 'hover:text-[#c8d0e0] hover:border-white/25 transition-colors disabled:opacity-30 disabled:pointer-events-none';
    /* ── FALLBACK: pdf.js failed → embedded browser viewer ──────────────── */ if (loadError) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex-1 min-h-0 flex flex-col gap-2",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5 text-amber-400 shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-[11px] text-amber-400/90 leading-relaxed",
                            children: [
                                "The custom viewer could not open this PDF (",
                                loadError,
                                ") — showing the browser viewer instead."
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                    src: `${src}#toolbar=1&navpanes=0&view=FitH`,
                    title: `PDF: ${fileName}`,
                    className: "w-full flex-1 min-h-[40vh] rounded-xl border border-white/[0.08] bg-[#0f1320]"
                })
            ]
        });
    }
    /* ── Loading state — brief with Range loading (structure + first page
        objects only); the bar only shows when bytes are actually flowing
        (non-Range fallback / slow proxies) ── */ if (!doc || !baseSize) {
        const pct = dlProgress && dlProgress.total > 0 ? Math.min(100, Math.round(dlProgress.loaded / dlProgress.total * 100)) : null;
        const mb = (n)=>`${(n / 1024 / 1024).toFixed(1)} MB`;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex-1 min-h-[40vh] flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-[#0f1320] px-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-6 h-6 animate-spin text-[#4fc3f7]"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-[#5a6478]",
                    children: pct != null ? `Streaming PDF… ${pct}%` : 'Opening PDF…'
                }),
                pct != null && dlProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-56",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-1.5 rounded-full bg-white/10 overflow-hidden",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-full rounded-full bg-[#4fc3f7] transition-[width] duration-150",
                                style: {
                                    width: `${pct}%`
                                }
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-[10px] text-[#5a6478] text-center mt-1",
                            children: [
                                mb(dlProgress.loaded),
                                " / ",
                                mb(dlProgress.total)
                            ]
                        })
                    ]
                })
            ]
        });
    }
    const renderedW = Math.round(baseSize.w * scale);
    const renderedH = Math.round(baseSize.h * scale);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-1 min-h-0 flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-[#111624] flex-wrap shrink-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>goToPage(1),
                        disabled: currentPage <= 1,
                        "aria-label": "First page",
                        title: "First page",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>goToPage(currentPage - 1),
                        disabled: currentPage <= 1,
                        "aria-label": "Previous page",
                        title: "Previous page",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1 text-[11px] text-[#8b95a8] px-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "number",
                                min: 1,
                                max: numPages,
                                value: currentPage,
                                onChange: (e)=>{
                                    const v = parseInt(e.target.value, 10);
                                    if (!Number.isNaN(v)) goToPage(v);
                                },
                                className: "w-10 px-1 py-0.5 text-center rounded-md bg-[#0f1320] border border-white/10 text-[#c8d0e0] focus:outline-none focus:border-[#4fc3f7]/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                                "aria-label": "Go to page"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[#5a6478]",
                                children: [
                                    "/ ",
                                    numPages
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>goToPage(currentPage + 1),
                        disabled: currentPage >= numPages,
                        "aria-label": "Next page",
                        title: "Next page",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>goToPage(numPages),
                        disabled: currentPage >= numPages,
                        "aria-label": "Last page",
                        title: "Last page",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "w-px h-5 bg-white/10 mx-1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>stepZoom(-1),
                        "aria-label": "Zoom out",
                        title: "Zoom out",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "flex items-center justify-center w-[3.4rem] h-7 rounded-lg border border-white/10 text-[11px] text-[#c8d0e0]",
                        title: "Current zoom level",
                        children: [
                            zoomPercent,
                            "%"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        className: toolBtn,
                        onClick: ()=>stepZoom(1),
                        "aria-label": "Zoom in",
                        title: "Zoom in",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setZoomMode('fit-width'),
                        className: `flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${zoomMode === 'fit-width' ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]' : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'}`,
                        title: "Fit the page width to the window",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Fit width"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setZoomMode('fit-page'),
                        className: `flex items-center gap-1 px-2 h-7 rounded-lg border text-[11px] font-medium transition-colors ${zoomMode === 'fit-page' ? 'border-[#4fc3f7]/40 bg-[#4fc3f7]/10 text-[#4fc3f7]' : 'border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25'}`,
                        title: "Fit the whole page in the window",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Fit page"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "flex-1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                        href: `${src}?download=1`,
                        className: "flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors",
                        title: "Download the PDF",
                        "aria-label": "Download the PDF",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                        href: src,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/25 transition-colors",
                        title: "Open in a new browser tab",
                        "aria-label": "Open in a new browser tab",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                ref: scrollRef,
                className: "flex-1 min-h-0 overflow-auto rounded-xl border border-white/[0.06] bg-[#0a0e17]",
                role: "document",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex flex-col items-center gap-4 p-4",
                    children: Array.from({
                        length: numPages
                    }, (_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PdfPage, {
                            index: i,
                            doc: doc,
                            scale: scale,
                            width: renderedW,
                            height: renderedH,
                            highlightRects: activeMatch?.page === i + 1 ? activeMatch.rects : undefined,
                            /** Priority page: renders immediately when the citation match
               *  lands on it — not just when scrolled near the viewport. */ priority: activeMatch?.page === i + 1,
                            registerRef: (el)=>{
                                pageRefs.current[i] = el;
                            },
                            onVisible: (pageIndex0)=>setCurrentPage(pageIndex0 + 1)
                        }, i))
                })
            })
        ]
    });
}
/* ════════════════════════════════════════════════════════════════════════════
   Single page — renders its canvas only when scrolled near the viewport.
   ══════════════════════════════════════════════════════════════════════════ */ function PdfPage({ index, doc, scale, width, height, highlightRects, priority, registerRef, onVisible }) {
    const wrapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [rendered, setRendered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [rendering, setRendering] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /** Scale the canvas was last rendered at — skips redundant re-renders. */ const renderedScaleRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Priority page (citation match): render immediately, without waiting for
     the IntersectionObserver to see it after the jump. */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (priority) setVisible(true);
    }, [
        priority
    ]);
    /* Observe visibility: pre-render pages near the viewport and mark the page
     crossing the vertical center of the view as the "current" page. */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver((entries)=>{
            for (const entry of entries){
                if (entry.isIntersecting) setVisible(true);
                const rootBounds = entry.rootBounds;
                if (rootBounds) {
                    const center = rootBounds.top + rootBounds.height / 2;
                    const rect = entry.boundingClientRect;
                    if (rect.top <= center && rect.bottom >= center) onVisible(index);
                }
            }
        }, {
            root: null,
            rootMargin: '400px 0px 400px 0px'
        });
        io.observe(el);
        return ()=>io.disconnect();
    }, [
        index,
        onVisible
    ]);
    /* Render / re-render when visible AND (scale or doc changed). */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!visible || renderedScaleRef.current === scale) return;
        let cancelled = false;
        let renderTask = null;
        (async ()=>{
            if (!canvasRef.current) return;
            setRendering(true);
            try {
                const page = await doc.getPage(index + 1);
                if (cancelled || !canvasRef.current) return;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const viewport = page.getViewport({
                    scale: scale * dpr
                });
                const canvas = canvasRef.current;
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                renderTask = page.render({
                    canvasContext: ctx,
                    viewport
                });
                await renderTask.promise;
                if (!cancelled) {
                    renderedScaleRef.current = scale;
                    setRendered(true);
                    page.cleanup();
                }
            } catch  {
            /* render cancelled or failed — the placeholder stays */ } finally{
                if (!cancelled) setRendering(false);
            }
        })();
        return ()=>{
            cancelled = true;
            renderTask?.cancel();
        };
    }, [
        visible,
        doc,
        index,
        scale
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: (el)=>{
            wrapRef.current = el;
            registerRef(el);
        },
        className: "relative shrink-0",
        style: {
            width,
            height
        },
        "data-page": index + 1,
        children: [
            !rendered && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute inset-0 rounded-md bg-[#141926] flex flex-col items-center justify-center gap-2 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 animate-[shimmer_2.4s_linear_infinite] bg-[linear-gradient(100deg,transparent_30%,rgba(79,195,247,0.06)_50%,transparent_70%)] bg-[length:200%_100%]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px] text-[#5a6478] z-10",
                        children: [
                            "Page ",
                            index + 1
                        ]
                    }),
                    rendering && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ChevronFirst_ChevronLast_ChevronLeft_ChevronRight_Download_ExternalLink_Loader2_Maximize2_StretchHorizontal_ZoomIn_ZoomOut_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 animate-spin text-[#4fc3f7]/60 z-10"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("canvas", {
                ref: canvasRef,
                className: "block rounded-md shadow-[0_2px_16px_rgba(0,0,0,0.5)] bg-white",
                style: {
                    width,
                    height
                }
            }),
            highlightRects && highlightRects.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "absolute px-1.5 py-0.5 rounded-md bg-amber-400 text-black text-[9px] font-bold whitespace-nowrap shadow-md pointer-events-none z-10",
                style: {
                    top: Math.max(2, highlightRects[0].top * scale - 18),
                    left: highlightRects[0].left * scale
                },
                children: "cited passage"
            }),
            highlightRects?.map((r, k)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "absolute rounded-[3px] pointer-events-none animate-[citation-box-pulse_1.8s_ease-out_1]",
                    style: {
                        left: r.left * scale,
                        top: r.top * scale,
                        width: Math.max(r.w * scale, 4),
                        height: Math.max(r.h * scale, 6),
                        background: 'rgba(250, 204, 21, 0.38)',
                        boxShadow: '0 0 0 1.5px rgba(245, 158, 11, 0.55)',
                        mixBlendMode: 'multiply'
                    }
                }, k)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white/70 text-[9px] font-semibold pointer-events-none",
                children: index + 1
            })
        ]
    });
}


/***/ }),

/***/ 684350:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ browserAI)
/* harmony export */ });
/* unused harmony export BrowserAIService */
/**
 * BrowserAIService — singleton service that wraps @mlc-ai/web-llm
 * for in-browser LLM inference powered by WebGPU.
 *
 * All WebLLM imports are dynamic (inside methods) because the library
 * references WebGPU APIs that are unavailable during SSR.
 */ // ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Available models (hardcoded list)
// ---------------------------------------------------------------------------
const AVAILABLE_MODELS = [
    {
        id: "SmolLM2-135M-Instruct-q4f16_1-MLC",
        name: "SmolLM2 135M",
        size: "~100MB",
        description: "Ultra-lightweight, fast but limited quality"
    },
    {
        id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
        name: "Llama 3.2 1B",
        size: "~600MB",
        description: "Good balance of speed and quality (recommended)"
    },
    {
        id: "Phi-3.5-mini-instruct-q4f16_1-MLC",
        name: "Phi 3.5 Mini",
        size: "~2GB",
        description: "Best quality, slower and larger"
    }
];
// ---------------------------------------------------------------------------
// localStorage key
// ---------------------------------------------------------------------------
const STORAGE_KEY = "medq-browser-ai-model";
// ---------------------------------------------------------------------------
// BrowserAIService
// ---------------------------------------------------------------------------
class BrowserAIService {
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    notify() {
        this.listeners.forEach((fn)=>fn());
    }
    // -----------------------------------------------------------------------
    // Public API
    // -----------------------------------------------------------------------
    /**
   * Check whether the browser supports WebGPU (required by WebLLM).
   * Safe to call during SSR — returns `false` when `navigator` is absent.
   */ isSupported() {
        if (typeof navigator === "undefined") return false;
        return "gpu" in navigator;
    }
    /**
   * Download and initialise a model. If no `modelId` is provided the last
   * selected model (from localStorage) or the recommended default is used.
   */ async loadModel(modelId) {
        // Guard — no WebGPU
        if (!this.isSupported()) {
            this.status = {
                loaded: false,
                loading: false,
                progress: 0,
                modelId: null,
                error: "WebGPU is not available in this browser"
            };
            this.notify();
            return;
        }
        // Already loaded the same model → no-op
        if (this.status.loaded && this.status.modelId === modelId) {
            return;
        }
        // If a different model is currently loaded, unload first
        if (this.engine) {
            await this.unloadModel();
        }
        // Resolve which model to load
        const selectedId = modelId ?? (typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null) ?? "Llama-3.2-1B-Instruct-q4f16_1-MLC"; // recommended default
        // Mark as loading
        this.status = {
            loaded: false,
            loading: true,
            progress: 0,
            modelId: selectedId,
            error: null
        };
        this.notify();
        try {
            // Dynamic import — keeps WebGPU code out of SSR bundle
            const { CreateMLCEngine } = await __webpack_require__.e(/* import() */ 2998).then(__webpack_require__.bind(__webpack_require__, 442998));
            this.engine = await CreateMLCEngine(selectedId, {
                initProgressCallback: (report)=>{
                    this.status = {
                        ...this.status,
                        progress: Math.round(report.progress * 100)
                    };
                    this.notify();
                }
            });
            // Persist choice
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(STORAGE_KEY, selectedId);
            }
            this.status = {
                loaded: true,
                loading: false,
                progress: 100,
                modelId: selectedId,
                error: null
            };
            this.notify();
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.engine = null;
            this.status = {
                loaded: false,
                loading: false,
                progress: 0,
                modelId: selectedId,
                error: `Failed to load model: ${message}`
            };
            this.notify();
        }
    }
    /** Whether a model is currently loaded and ready for inference. */ isModelLoaded() {
        return this.status.loaded && this.engine !== null;
    }
    /** Snapshot of the current model status. */ getModelStatus() {
        return {
            ...this.status
        };
    }
    /**
   * Generate text from the loaded model.
   * @throws Error if no model is loaded.
   */ async generate(prompt, maxTokens) {
        if (!this.engine || !this.status.loaded) {
            throw new Error("No model is loaded. Call loadModel() first.");
        }
        const reply = await this.engine.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: maxTokens ?? 512,
            temperature: 0.7
        });
        return reply.choices[0]?.message?.content ?? "";
    }
    /** Unload the current model and free GPU memory. */ unloadModel() {
        if (this.engine) {
            // Fire-and-forget — `unload` is async but we don't want to block the
            // caller. Errors are silently swallowed because there is no meaningful
            // recovery a consumer can do.
            this.engine.unload().catch(()=>{}).finally(()=>{
                this.engine = null;
                this.status = {
                    loaded: false,
                    loading: false,
                    progress: 0,
                    modelId: null,
                    error: null
                };
                this.notify();
            });
        } else {
            this.status = {
                loaded: false,
                loading: false,
                progress: 0,
                modelId: null,
                error: null
            };
            this.notify();
        }
    }
    /** Return the hardcoded list of available models. */ getAvailableModels() {
        return AVAILABLE_MODELS;
    }
    // -----------------------------------------------------------------------
    // Domain-specific: short-answer evaluation
    // -----------------------------------------------------------------------
    /**
   * Evaluate a student's short answer against the expected answer.
   *
   * Constructs a prompt that asks the AI to produce structured JSON feedback,
   * then parses the response into an `EvaluationResult`.
   */ async evaluateShortAnswer(question, expectedAnswer, studentAnswer) {
        // If no model is loaded, fall back to simple keyword matching
        if (!this.engine || !this.status.loaded) {
            return this.keywordFallback(question, expectedAnswer, studentAnswer);
        }
        const systemPrompt = `You are an expert educational assessment AI. Evaluate the student's answer against the expected answer. You must respond ONLY with valid JSON in this exact format, no other text:
{
  "score": <number 0-100>,
  "feedback": "<brief feedback for the student>",
  "keyPointsCovered": ["<point 1>", "<point 2>"],
  "keyPointsMissed": ["<point 1>", "<point 2>"]
}`;
        const userPrompt = `Question: ${question}

Expected Answer: ${expectedAnswer}

Student Answer: ${studentAnswer}

Evaluate the student's answer. Respond only with the JSON object.`;
        const reply = await this.engine.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            max_tokens: 512,
            temperature: 0.3
        });
        const raw = reply.choices[0]?.message?.content ?? "";
        // Attempt to extract JSON from the response — the model may wrap it in
        // markdown code fences or add surrounding text.
        return this.parseEvaluationResponse(raw);
    }
    // -----------------------------------------------------------------------
    // Internal helpers
    // -----------------------------------------------------------------------
    /**
   * Simple keyword-based fallback evaluation when no AI model is loaded.
   * Extracts key terms from the expected answer and checks coverage in the student answer.
   */ keywordFallback(question, expectedAnswer, studentAnswer) {
        // Strip HTML tags
        const strip = (html)=>html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
        const cleanExpected = strip(expectedAnswer);
        const cleanStudent = strip(studentAnswer);
        // Common stop words to ignore
        const stopWords = new Set([
            'a',
            'an',
            'the',
            'is',
            'are',
            'was',
            'were',
            'be',
            'been',
            'being',
            'have',
            'has',
            'had',
            'do',
            'does',
            'did',
            'will',
            'would',
            'could',
            'should',
            'may',
            'might',
            'can',
            'shall',
            'to',
            'of',
            'in',
            'for',
            'on',
            'with',
            'at',
            'by',
            'from',
            'as',
            'into',
            'through',
            'during',
            'before',
            'after',
            'above',
            'below',
            'between',
            'out',
            'off',
            'over',
            'under',
            'again',
            'further',
            'then',
            'once',
            'here',
            'there',
            'when',
            'where',
            'why',
            'how',
            'all',
            'each',
            'every',
            'both',
            'few',
            'more',
            'most',
            'other',
            'some',
            'such',
            'no',
            'nor',
            'not',
            'only',
            'own',
            'same',
            'so',
            'than',
            'too',
            'very',
            'just',
            'because',
            'but',
            'and',
            'or',
            'if',
            'while',
            'about',
            'up',
            'that',
            'this',
            'these',
            'those',
            'it',
            'its',
            'which',
            'what',
            'who',
            'whom',
            'their',
            'they',
            'them',
            'we',
            'our',
            'you',
            'your',
            'he',
            'she',
            'him',
            'her',
            'his',
            'also'
        ]);
        // Tokenize — split into meaningful words
        const tokenize = (text)=>text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((w)=>w.length > 1 && !stopWords.has(w));
        const expectedTokens = tokenize(cleanExpected);
        const studentTokens = new Set(tokenize(cleanStudent));
        // Identify key points (significant words from expected answer)
        const keyPoints = expectedTokens.filter((t)=>t.length > 2);
        const keyPointsCovered = [];
        const keyPointsMissed = [];
        for (const point of keyPoints){
            if (studentTokens.has(point)) {
                keyPointsCovered.push(point);
            } else {
                keyPointsMissed.push(point);
            }
        }
        // Calculate score
        const total = keyPoints.length || 1;
        const score = Math.round(keyPointsCovered.length / total * 100);
        // Generate feedback
        let feedback;
        if (score >= 90) {
            feedback = 'Excellent answer! You covered all the key points.';
        } else if (score >= 70) {
            feedback = `Good answer! Consider including: ${keyPointsMissed.slice(0, 3).join(', ')}.`;
        } else if (score >= 50) {
            feedback = `Partial answer. Key points covered: ${keyPointsCovered.slice(0, 3).join(', ') || 'none'}. Missing: ${keyPointsMissed.slice(0, 4).join(', ')}.`;
        } else {
            feedback = `Your answer is incomplete. Key points expected: ${keyPoints.slice(0, 5).join(', ')}.`;
        }
        return {
            score,
            feedback,
            keyPointsCovered,
            keyPointsMissed
        };
    }
    /**
   * Best-effort JSON extraction from a potentially messy model response.
   * Handles: raw JSON, ```json ... ``` blocks, and text surrounding the JSON.
   */ parseEvaluationResponse(raw) {
        const fallback = {
            score: 0,
            feedback: "Could not parse evaluation result.",
            keyPointsCovered: [],
            keyPointsMissed: []
        };
        try {
            // Strip markdown code fences if present
            let cleaned = raw.trim();
            const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (fenceMatch) {
                cleaned = fenceMatch[1].trim();
            }
            // Try to find the outermost JSON object
            const firstBrace = cleaned.indexOf("{");
            const lastBrace = cleaned.lastIndexOf("}");
            if (firstBrace === -1 || lastBrace === -1) return fallback;
            const jsonStr = cleaned.slice(firstBrace, lastBrace + 1);
            const parsed = JSON.parse(jsonStr);
            return {
                score: typeof parsed.score === "number" ? Math.max(0, Math.min(100, parsed.score)) : fallback.score,
                feedback: typeof parsed.feedback === "string" ? parsed.feedback : fallback.feedback,
                keyPointsCovered: Array.isArray(parsed.keyPointsCovered) ? parsed.keyPointsCovered.filter((p)=>typeof p === "string") : [],
                keyPointsMissed: Array.isArray(parsed.keyPointsMissed) ? parsed.keyPointsMissed.filter((p)=>typeof p === "string") : []
            };
        } catch  {
            return fallback;
        }
    }
    constructor(){
        this.engine = null;
        this.status = {
            loaded: false,
            loading: false,
            progress: 0,
            modelId: null,
            error: null
        };
        /** Event system — React components can subscribe to status changes. */ this.listeners = new Set();
    }
}
// ---------------------------------------------------------------------------
// Singleton instance
// ---------------------------------------------------------------------------
const browserAI = new BrowserAIService();


/***/ }),

/***/ 731554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C3: () => (/* binding */ cacheQuestions),
/* harmony export */   Sd: () => (/* binding */ generateOfflineQuestions),
/* harmony export */   pc: () => (/* binding */ getOfflineAvailability),
/* harmony export */   tG: () => (/* binding */ evaluateShortAnswerOffline)
/* harmony export */ });
/* unused harmony exports getCachedQuestions, getCachedQuestionCount, clearQuestionCache, getCachedCountBySystem */
/**
 * MedQ Offline AI Question Engine
 *
 * Generates medical questions entirely client-side using:
 * 1. A built-in knowledge base of medical templates per system/topic
 * 2. Cached questions from previous online AI generations
 * 3. Template-based question construction with randomized variations
 *
 * This runs 100% in the browser — no API calls needed.
 */ // ─── localStorage keys ───
const CACHE_KEY = 'medq-question-cache';
const CACHE_MAX = 500; // max cached questions
const TEMPLATES = [
    // ── Cardiovascular ──
    {
        type: 'mcq',
        textTemplate: "A 58-year-old male presents with {symptom1} and {symptom2}. Blood pressure is {bp}. ECG shows {ecgFinding}. Which of the following is the most appropriate initial management?",
        options: [
            'Administer IV thrombolytics',
            'Start beta-blocker therapy',
            'Give sublingual nitroglycerin',
            'Order echocardiography'
        ],
        answer: 'Give sublingual nitroglycerin',
        explanationTemplate: "This patient presents with findings consistent with {topic}. The initial management should focus on symptom relief and stabilization. Sublingual nitroglycerin reduces myocardial oxygen demand through vasodilation, decreasing preload and afterload. This is the standard first-line intervention before further diagnostic workup or definitive treatment.",
        mnemonicTemplate: "MONA-B: Morphine, Oxygen, Nitrates, Aspirin, Beta-blockers — initial management of acute coronary syndrome",
        clinicalPearlTemplate: "Clinical Pearl: Nitroglycerin is contraindicated in right ventricular infarction and systolic BP <90 mmHg. Always check BP before administration.",
        distractorAnalysisTemplate: "Correct: Nitroglycerin is first-line for acute chest pain. IV thrombolytics require confirmation of STEMI first. Beta-blockers are added after initial stabilization. Echocardiography is diagnostic, not therapeutic.",
        difficulty: 'Moderate',
        keywords: [
            'Hypertension',
            'Heart Failure',
            'Coronary Artery Disease',
            'Arrhythmias',
            'ACE inhibitors',
            'Beta Blockers',
            'ACE Inhibitors'
        ]
    },
    {
        type: 'mcq',
        textTemplate: "A 45-year-old patient is started on {drug} for {topic}. At follow-up, the patient reports {sideEffect}. Which mechanism best explains this adverse effect?",
        options: [
            'Inhibition of angiotensin-converting enzyme',
            'Blockade of beta-1 adrenergic receptors',
            'Inhibition of HMG-CoA reductase',
            'Antagonism of aldosterone receptors'
        ],
        answer: 'Inhibition of angiotensin-converting enzyme',
        explanationTemplate: "{drug} works by inhibiting the angiotensin-converting enzyme, which prevents conversion of angiotensin I to angiotensin II. This leads to decreased aldosterone secretion, resulting in potassium retention. The reported {sideEffect} is a known adverse effect of this mechanism.",
        mnemonicTemplate: "ACE: Angiotensin Converting Enzyme — CAPTOPRIL: Cough, Angioedema, Proteinuria, Taste changes, Orthostatic hypotension, Pregnancy risk, Renal impairment, Increased K+, Liver toxicity",
        clinicalPearlTemplate: "Clinical Pearl: ACE inhibitors are first-line in diabetic nephropathy. Monitor K+ and creatinine within 1-2 weeks of initiation. Contraindicated in bilateral renal artery stenosis.",
        distractorAnalysisTemplate: "Correct: ACE inhibition explains the side effect profile. Beta-blockade causes bradycardia and fatigue. HMG-CoA reductase inhibition causes myopathy. Aldosterone antagonism causes hyperkalemia but through a different mechanism.",
        difficulty: 'Moderate',
        keywords: [
            'ACE inhibitors',
            'ACE Inhibitors',
            'Pharmacology',
            'Hypertension',
            'Heart Failure'
        ]
    },
    {
        type: 'tf',
        textTemplate: "In {topic}, the primary pathophysiological mechanism involves autoimmune destruction of the target organ tissue.",
        answer: 'False',
        explanationTemplate: "While autoimmune mechanisms may play a role in some aspects of {topic}, the primary pathophysiology typically involves a combination of metabolic, hemodynamic, and structural changes rather than direct autoimmune destruction. Understanding the dominant mechanism is crucial for targeted therapy.",
        mnemonicTemplate: "PATH: Pressure, Anatomy, Turbulence, Hemodynamics — think structural and functional, not just immune",
        clinicalPearlTemplate: "Clinical Pearl: Distinguishing autoimmune from metabolic etiologies changes management significantly. Always check autoimmune markers when clinical presentation is atypical.",
        distractorAnalysisTemplate: "Correct: Autoimmune destruction is not the primary mechanism. The dominant processes are metabolic and hemodynamic. Immune involvement is secondary in most cases.",
        difficulty: 'Easy',
        keywords: [
            'Cardiovascular',
            'Respiratory',
            'Endocrine',
            'Renal',
            'Gastrointestinal',
            'Hypertension',
            'COPD',
            'Diabetes Mellitus'
        ]
    },
    {
        type: 'short',
        textTemplate: "A 62-year-old patient with {topic} presents with acute worsening of symptoms. Name two immediate investigations you would order and justify each.",
        answer: 'ECG (to rule out acute cardiac events) and Chest X-ray (to evaluate for pulmonary congestion or effusion)',
        explanationTemplate: "In acute decompensation of {topic}, the priority is identifying life-threatening complications. ECG is essential to exclude acute myocardial infarction or arrhythmias as triggers. Chest X-ray evaluates pulmonary congestion, cardiomegaly, and pleural effusions, which guide acute management decisions including diuretic therapy.",
        mnemonicTemplate: "ABC: Always Be Checking — ECG and CXR first in any acute cardiopulmonary decompensation",
        clinicalPearlTemplate: "Clinical Pearl: In acute settings, BNP/NT-proBNP can rapidly distinguish cardiac from pulmonary causes of dyspnea. BNP >400 pg/mL strongly suggests heart failure.",
        distractorAnalysisTemplate: "ECG is mandatory first-line. CXR provides immediate visual assessment. Blood tests (troponin, BNP) are complementary. Echocardiography is definitive but not always immediately available.",
        difficulty: 'Hard',
        keywords: [
            'Heart Failure',
            'Coronary Artery Disease',
            'Pulmonary Embolism',
            'Arrhythmias',
            'COPD',
            'Pneumonia'
        ]
    },
    // ── Respiratory ──
    {
        type: 'mcq',
        textTemplate: "A 65-year-old smoker with {topic} presents with increased dyspnea, productive cough, and {finding}. Spirometry shows FEV1/FVC ratio of {ratio}. What is the most likely classification of this patient's condition?",
        options: [
            'Mild (GOLD 1)',
            'Moderate (GOLD 2)',
            'Severe (GOLD 3)',
            'Very Severe (GOLD 4)'
        ],
        answer: 'Moderate (GOLD 2)',
        explanationTemplate: "Based on the FEV1/FVC ratio <0.7 confirming obstructive pattern and the FEV1 percentage predicted, this patient falls into the moderate category (GOLD 2). {topic} classification depends on spirometric severity, symptom assessment, and exacerbation history.",
        mnemonicTemplate: "GOLD: Grade Obstructive Lung Disease — FEV1% predicted: Mild >80%, Moderate 50-80%, Severe 30-50%, Very Severe <30%",
        clinicalPearlTemplate: "Clinical Pearl: The ABCD assessment tool in GOLD guidelines combines symptom scores (mMRC/CAT) with exacerbation history to guide therapy, beyond just spirometry.",
        distractorAnalysisTemplate: "Correct: FEV1 50-80% predicted = GOLD 2 Moderate. Mild requires FEV1 >80%. Severe requires FEV1 30-50%. Very severe requires FEV1 <30%.",
        difficulty: 'Moderate',
        keywords: [
            'COPD',
            'Asthma',
            'Respiratory'
        ]
    },
    // ── Neurological ──
    {
        type: 'mcq',
        textTemplate: "A 55-year-old patient presents with sudden onset of {neuroSymptom}. MRI shows {mriFinding}. The most likely diagnosis is:",
        options: [
            'Ischemic stroke',
            'Hemorrhagic stroke',
            'Transient ischemic attack',
            'Migraine with aura'
        ],
        answer: 'Ischemic stroke',
        explanationTemplate: "The sudden onset focal neurological deficit with corresponding MRI findings is most consistent with ischemic stroke. {topic} requires rapid assessment as time is brain — thrombolytic therapy must be considered within the therapeutic window.",
        mnemonicTemplate: "BE-FAST: Balance, Eyes, Face, Arms, Speech, Time — stroke recognition and action",
        clinicalPearlTemplate: "Clinical Pearl: The therapeutic window for IV tPA is up to 4.5 hours from symptom onset. Earlier treatment correlates with better outcomes — every minute counts, with 1.9 million neurons lost per minute.",
        distractorAnalysisTemplate: "Correct: Ischemic stroke matches the clinical and imaging presentation. Hemorrhagic stroke would show hyperdense lesion on CT. TIA resolves within 24 hours. Migraine typically has preceding aura and gradual onset.",
        difficulty: 'Moderate',
        keywords: [
            'Stroke',
            'Epilepsy',
            'Multiple Sclerosis',
            'Neurological',
            'Parkinson Disease'
        ]
    },
    // ── Endocrine ──
    {
        type: 'mcq',
        textTemplate: "A 40-year-old patient with {topic} presents with {endocrineSymptom}. Laboratory findings show {labFinding}. Which of the following is the most appropriate next step in management?",
        options: [
            'Start insulin therapy',
            'Initiate lifestyle modifications and metformin',
            'Order imaging studies',
            'Refer for surgical evaluation'
        ],
        answer: 'Initiate lifestyle modifications and metformin',
        explanationTemplate: "For newly diagnosed {topic} without acute complications, first-line management includes lifestyle modifications (diet, exercise, weight management) combined with metformin as the preferred initial pharmacotherapy. This approach targets the underlying insulin resistance and metabolic dysfunction.",
        mnemonicTemplate: "Diabetes treatment steps: 1) Lifestyle, 2) Metformin, 3) Add second agent, 4) Insulin — step up therapy as needed",
        clinicalPearlTemplate: "Clinical Pearl: Metformin is contraindicated with eGFR <30 mL/min. Hold before IV contrast procedures. B12 deficiency can occur with long-term use — monitor periodically.",
        distractorAnalysisTemplate: "Correct: Lifestyle + metformin is first-line per guidelines. Insulin is reserved for severe hyperglycemia or type 1 DM. Imaging is not the next step for routine management. Surgery is for bariatric candidates only.",
        difficulty: 'Easy',
        keywords: [
            'Diabetes Mellitus',
            'Endocrine',
            'Thyroid Disorders',
            'Metabolic syndrome'
        ]
    },
    // ── Gastrointestinal ──
    {
        type: 'mcq',
        textTemplate: "A 50-year-old patient presents with {giSymptom}. Endoscopy reveals {endoscopyFinding}. Biopsy confirms {biopsyResult}. What is the most likely diagnosis?",
        options: [
            'Peptic ulcer disease',
            'Gastric carcinoma',
            'Chronic gastritis',
            'Gastroesophageal reflux disease'
        ],
        answer: 'Peptic ulcer disease',
        explanationTemplate: "The combination of clinical presentation, endoscopic findings, and biopsy results is consistent with {topic}. H. pylori infection is the most common cause, present in approximately 90% of duodenal ulcers and 70% of gastric ulcers.",
        mnemonicTemplate: "ULCER: Upper pain, Loss of weight (in gastric), Coffee-ground emesis, Early satiety, Risk factors (NSAIDs, H. pylori)",
        clinicalPearlTemplate: "Clinical Pearl: Always test for H. pylori in peptic ulcer disease. Triple therapy (PPI + clarithromycin + amoxicillin) for 14 days has ~85% eradication rate. Confirm eradication 4 weeks after treatment.",
        distractorAnalysisTemplate: "Correct: PUD matches endoscopy and biopsy findings. Gastric carcinoma would show malignant cells on biopsy. Chronic gastritis shows inflammation without ulceration. GERD doesn't cause ulceration on endoscopy typically.",
        difficulty: 'Moderate',
        keywords: [
            'Peptic Ulcer Disease',
            'Gastrointestinal',
            'Inflammatory Bowel Disease',
            'Hepatitis'
        ]
    },
    // ── Renal ──
    {
        type: 'tf',
        textTemplate: "In acute kidney injury secondary to {topic}, the urine sodium concentration is typically less than 20 mEq/L, consistent with a pre-renal etiology.",
        answer: 'True',
        explanationTemplate: "In pre-renal AKI, the kidneys attempt to conserve sodium and water in response to decreased effective circulating volume. This results in urine sodium <20 mEq/L, fractional excretion of sodium (FENa) <1%, and concentrated urine. This is in contrast to intrinsic renal AKI where FENa >2%.",
        mnemonicTemplate: "Pre-renal vs Intrinsic: Pre-renal = FENa <1%, Urine Na <20, BUN/Cr >20:1. Intrinsic = FENa >2%, Urine Na >40, BUN/Cr <15:1",
        clinicalPearlTemplate: "Clinical Pearl: FENa can be misleading if diuretics were given. Use FEUrea (urea fractional excretion) instead — <35% suggests pre-renal, even on diuretics.",
        distractorAnalysisTemplate: "Correct: Low urine sodium (<20) indicates appropriate sodium conservation in pre-renal AKI. In intrinsic AKI, urine sodium is elevated (>40) due to tubular dysfunction.",
        difficulty: 'Hard',
        keywords: [
            'Acute Kidney Injury',
            'Chronic Kidney Disease',
            'Renal',
            'Nephrotic Syndrome'
        ]
    },
    // ── Pharmacology ──
    {
        type: 'mcq',
        textTemplate: "A patient taking {drug} for {topic} presents with {adverseEffect}. Which of the following is the most appropriate management?",
        options: [
            'Discontinue the medication immediately',
            'Reduce the dose and monitor',
            'Switch to an alternative medication',
            'Add a second medication to counteract the side effect'
        ],
        answer: 'Reduce the dose and monitor',
        explanationTemplate: "When a patient on {drug} develops {adverseEffect}, the recommended approach is dose reduction with close monitoring rather than abrupt discontinuation, which could lead to rebound effects or disease worsening. This balances therapeutic benefit with adverse effect management.",
        mnemonicTemplate: "Dose adjustment steps: Reduce → Monitor → Substitute if needed — never stop abruptly without tapering",
        clinicalPearlTemplate: "Clinical Pearl: Always check for drug-drug interactions when adverse effects appear, as they may be due to CYP450 enzyme inhibition or displacement from protein binding sites.",
        distractorAnalysisTemplate: "Correct: Dose reduction with monitoring is the standard approach. Immediate discontinuation risks rebound. Switching is premature without trying dose adjustment. Adding another medication increases polypharmacy risk.",
        difficulty: 'Easy',
        keywords: [
            'Pharmacology',
            'ACE Inhibitors',
            'Beta Blockers',
            'Statins',
            'Antibiotics',
            'Anticoagulants',
            'NSAIDs',
            'Antidepressants'
        ]
    },
    // ── More general templates ──
    {
        type: 'mcq',
        textTemplate: "Which of the following is the most sensitive diagnostic test for {topic}?",
        options: [
            'Serum biomarker assay',
            'Imaging with contrast enhancement',
            'Tissue biopsy with histopathology',
            'Functional stimulation test'
        ],
        answer: 'Serum biomarker assay',
        explanationTemplate: "For {topic}, serum biomarker assays typically offer the highest sensitivity for initial screening, though they may lack specificity. The combination of high-sensitivity screening with confirmatory testing provides the optimal diagnostic approach.",
        mnemonicTemplate: "SNOUT: Sensitivity — Negative result rules OUT. SPIN: Specificity — Positive result rules IN. Use sensitive tests for screening.",
        clinicalPearlTemplate: "Clinical Pearl: No single test is perfect. Pre-test probability affects predictive values. Always interpret test results in the clinical context of the individual patient.",
        distractorAnalysisTemplate: "Correct: Biomarkers offer highest sensitivity for screening. Imaging provides specificity but may miss early disease. Biopsy is gold standard but invasive. Functional tests are variable.",
        difficulty: 'Easy',
        keywords: [
            'Cardiovascular',
            'Respiratory',
            'Endocrine',
            'Renal',
            'Gastrointestinal',
            'Neurological',
            'Hematologic',
            'Immunologic'
        ]
    },
    {
        type: 'tf',
        textTemplate: "Early initiation of treatment for {topic} has been shown to significantly improve long-term outcomes and reduce mortality.",
        answer: 'True',
        explanationTemplate: "Evidence consistently demonstrates that early intervention in {topic} leads to better outcomes. Delayed treatment allows disease progression, irreversible organ damage, and complications that become increasingly difficult to manage. The therapeutic window is often narrow.",
        mnemonicTemplate: "TIME: Timely Intervention Maximizes Efficacy — treat early, treat aggressively, treat appropriately",
        clinicalPearlTemplate: "Clinical Pearl: The concept of 'therapeutic window' applies to most medical conditions. Earlier diagnosis through screening programs has been one of the greatest advances in modern medicine.",
        distractorAnalysisTemplate: "Correct: Early treatment is consistently associated with better outcomes across most medical conditions. Watchful waiting has a role but should not delay indicated treatment.",
        difficulty: 'Easy',
        keywords: [
            'Cardiovascular',
            'Respiratory',
            'Neurological',
            'Endocrine',
            'Gastrointestinal',
            'Renal',
            'Hematologic',
            'Musculoskeletal',
            'Immunologic',
            'Pharmacology',
            'Pathology',
            'Microbiology'
        ]
    }
];
// ─── Symptom/findings pools for template randomization ───
const SYMPTOMS_1 = [
    'crushing chest pain',
    'progressive dyspnea',
    'acute severe headache',
    'bilateral leg edema',
    'recurrent syncope',
    'persistent cough',
    'acute abdominal pain',
    'generalized fatigue'
];
const SYMPTOMS_2 = [
    'radiating to the left arm',
    'worse on exertion',
    'associated with diaphoresis',
    'accompanied by nausea',
    'with orthostatic intolerance',
    'with hemoptysis',
    'with melena',
    'with unexplained weight loss'
];
const BP_READINGS = [
    '165/95 mmHg',
    '148/92 mmHg',
    '180/110 mmHg',
    '155/98 mmHg',
    '140/90 mmHg',
    '172/105 mmHg'
];
const ECG_FINDINGS = [
    'ST elevation in leads V1-V4',
    'ST depression in the lateral leads',
    'T wave inversions',
    'left bundle branch block',
    'atrial fibrillation with rapid ventricular response',
    'sinus tachycardia'
];
const DRUGS = [
    'lisinopril',
    'metoprolol',
    'atorvastatin',
    'amoxicillin',
    'warfarin',
    'omeprazole',
    'metformin',
    'amlodipine'
];
const SIDE_EFFECTS = [
    'persistent dry cough',
    'bradycardia',
    'myalgia',
    'gastrointestinal upset',
    'skin rash',
    'dizziness',
    'fatigue',
    'headache'
];
const NEURO_SYMPTOMS = [
    'left-sided weakness',
    'speech difficulty',
    'visual field deficit',
    'right hemiparesis',
    'facial droop',
    'ataxia'
];
const MRI_FINDINGS = [
    'diffusion restriction in the MCA territory',
    'acute infarct in the basal ganglia',
    'small vessel ischemic changes',
    'hyperintense lesion in the pons',
    'acute left MCA territory infarct'
];
const ENDOCRINE_SYMPTOMS = [
    'polyuria and polydipsia',
    'unexplained weight gain',
    'heat intolerance',
    'cold intolerance',
    'galactorrhea',
    'amenorrhea'
];
const LAB_FINDINGS = [
    'HbA1c of 8.2%',
    'TSH of 12.5 mIU/L',
    'random glucose of 220 mg/dL',
    'cortisol of 28 mcg/dL',
    'prolactin of 85 ng/mL',
    'fasting glucose of 145 mg/dL'
];
const GI_SYMPTOMS = [
    'epigastric pain worsened by meals',
    'recurrent vomiting',
    'chronic diarrhea',
    'dysphagia',
    'early satiety',
    'hematemesis'
];
const ENDOSCOPY_FINDINGS = [
    'a 2cm duodenal ulcer',
    'gastric ulceration with clean base',
    'esophageal erosion',
    'diffuse gastric inflammation',
    'a 1.5cm gastric ulcer'
];
const BIOPSY_RESULTS = [
    'H. pylori-positive ulceration',
    'chronic active gastritis',
    'benign ulcer with no dysplasia',
    'intestinal metaplasia',
    'reactive gastropathy'
];
const ADVERSE_EFFECTS = [
    'new-onset cough',
    'symptomatic bradycardia',
    'elevated liver enzymes',
    'hyperkalemia',
    'angioedema',
    'photosensitivity'
];
const RATIOS = [
    '0.55',
    '0.60',
    '0.65',
    '0.50',
    '0.58'
];
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(arr) {
    const result = [
        ...arr
    ];
    for(let i = result.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [
            result[j],
            result[i]
        ];
    }
    return result;
}
function fillTemplate(template, topic) {
    return template.replace(/\{topic\}/g, topic).replace(/\{symptom1\}/g, pick(SYMPTOMS_1)).replace(/\{symptom2\}/g, pick(SYMPTOMS_2)).replace(/\{bp\}/g, pick(BP_READINGS)).replace(/\{ecgFinding\}/g, pick(ECG_FINDINGS)).replace(/\{drug\}/g, pick(DRUGS)).replace(/\{sideEffect\}/g, pick(SIDE_EFFECTS)).replace(/\{finding\}/g, pick([
        'wheezing on auscultation',
        'decreased breath sounds',
        'crackles bilaterally',
        'prolonged expiration'
    ])).replace(/\{ratio\}/g, pick(RATIOS)).replace(/\{neuroSymptom\}/g, pick(NEURO_SYMPTOMS)).replace(/\{mriFinding\}/g, pick(MRI_FINDINGS)).replace(/\{endocrineSymptom\}/g, pick(ENDOCRINE_SYMPTOMS)).replace(/\{labFinding\}/g, pick(LAB_FINDINGS)).replace(/\{giSymptom\}/g, pick(GI_SYMPTOMS)).replace(/\{endoscopyFinding\}/g, pick(ENDOSCOPY_FINDINGS)).replace(/\{biopsyResult\}/g, pick(BIOPSY_RESULTS)).replace(/\{adverseEffect\}/g, pick(ADVERSE_EFFECTS));
}
function generateId() {
    return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
}
/**
 * Generate questions offline using templates + cached questions
 */ function generateOfflineQuestions(topic, system, types, difficulties, count) {
    const questions = [];
    // 1. Try to use cached questions that match the criteria
    const cached = getCachedQuestions();
    const matchingCached = cached.filter((q)=>{
        const typeMatch = types.includes(q.type);
        const diffMatch = difficulties.includes(q.difficulty);
        const topicMatch = q.topic.toLowerCase().includes(topic.toLowerCase()) || q.system.toLowerCase() === system.toLowerCase() || q.tags && q.tags.some((t)=>t.toLowerCase().includes(topic.toLowerCase()));
        return typeMatch && diffMatch && topicMatch;
    });
    // Shuffle matching cached questions and take up to half the count
    const cachedToUse = shuffle(matchingCached).slice(0, Math.ceil(count / 2));
    questions.push(...cachedToUse);
    // 2. Fill remaining with template-generated questions
    const remaining = count - questions.length;
    const matchingTemplates = TEMPLATES.filter((t)=>{
        const typeMatch = types.includes(t.type);
        const diffMatch = difficulties.includes(t.difficulty);
        const keywordMatch = t.keywords.some((k)=>k.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase() === system.toLowerCase());
        return typeMatch && diffMatch && keywordMatch;
    });
    // If no exact match, fall back to broader match
    const templates = matchingTemplates.length > 0 ? matchingTemplates : TEMPLATES.filter((t)=>{
        const typeMatch = types.includes(t.type);
        const diffMatch = difficulties.includes(t.difficulty);
        return typeMatch && diffMatch;
    });
    // If still no match, use any template with matching type
    const finalTemplates = templates.length > 0 ? templates : TEMPLATES.filter((t)=>types.includes(t.type));
    for(let i = 0; i < remaining; i++){
        const template = finalTemplates[i % finalTemplates.length];
        const q = createQuestionFromTemplate(template, topic, system);
        questions.push(q);
    }
    return questions.slice(0, count);
}
function createQuestionFromTemplate(template, topic, system) {
    const text = fillTemplate(template.textTemplate, topic);
    const explanation = fillTemplate(template.explanationTemplate, topic);
    const mnemonic = fillTemplate(template.mnemonicTemplate, topic);
    const clinicalPearl = fillTemplate(template.clinicalPearlTemplate, topic);
    const distractorAnalysis = fillTemplate(template.distractorAnalysisTemplate, topic);
    // Shuffle options for MCQ to randomize correct answer position
    let options = template.options ? shuffle(template.options) : [];
    let answer = template.answer;
    // If the answer was in the original options, find it in the shuffled list
    if (template.options && template.answer) {
        const foundInShuffled = options.find((o)=>o === template.answer);
        if (foundInShuffled) {
            answer = foundInShuffled;
        }
    }
    if (template.type === 'tf') {
        options = [
            'True',
            'False'
        ];
        answer = template.answer;
    }
    if (template.type === 'short') {
        answer = fillTemplate(template.answer, topic);
    }
    // Add some variation to difficulty
    const difficulties = [
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ];
    const difficulty = Math.random() > 0.7 ? pick(difficulties) : template.difficulty;
    return {
        id: generateId(),
        type: template.type,
        text: `<span class='q-hl-red'>${topic}</span>: ${text}`,
        options,
        answer,
        explanation: `<div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> ${explanation}</div>`,
        mnemonic: `<div class='q-mnemo'><div><div class='q-letter' style='background:linear-gradient(135deg,#22c55e,#16a34a)'>⚡</div><div class='q-letter-text'>Offline Generated</div></div></div><div class='q-callout q-callout-red'>🚨 ${mnemonic}</div>`,
        clinicalPearl: `<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ${clinicalPearl}</div>`,
        distractorAnalysis: `<div class='q-grid q-grid-2'>${distractorAnalysis}</div>`,
        difficulty,
        system,
        topic,
        tags: [
            topic,
            system,
            'offline-generated'
        ],
        isAIGenerated: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}
// ─── Cache management ───
function cacheQuestions(questions) {
    try {
        const existing = getCachedQuestions();
        const merged = [
            ...questions,
            ...existing
        ];
        // Deduplicate by id
        const seen = new Set();
        const unique = merged.filter((q)=>{
            if (seen.has(q.id)) return false;
            seen.add(q.id);
            return true;
        });
        // Keep only the most recent CACHE_MAX questions
        const trimmed = unique.slice(0, CACHE_MAX);
        localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
    } catch (e) {
        console.warn('[MedQ] Failed to cache questions:', e);
    }
}
function getCachedQuestions() {
    try {
        const data = localStorage.getItem(CACHE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch  {
        return [];
    }
}
function getCachedQuestionCount() {
    return getCachedQuestions().length;
}
function clearQuestionCache() {
    localStorage.removeItem(CACHE_KEY);
}
/**
 * Get count of cached questions matching a specific system
 */ function getCachedCountBySystem(system) {
    return getCachedQuestions().filter((q)=>q.system === system).length;
}
/**
 * Check how many offline-generated questions are available for a topic/system
 */ function getOfflineAvailability(topic, system) {
    const cached = getCachedQuestions().filter((q)=>{
        return q.topic.toLowerCase().includes(topic.toLowerCase()) || q.system.toLowerCase() === system.toLowerCase();
    }).length;
    const templates = TEMPLATES.filter((t)=>{
        return t.keywords.some((k)=>k.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase() === system.toLowerCase());
    }).length;
    return {
        cached,
        templates,
        total: cached + templates
    };
}
// Common medical stop words to ignore when comparing
const MEDICAL_STOP_WORDS = new Set([
    'a',
    'an',
    'the',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'can',
    'shall',
    'to',
    'of',
    'in',
    'for',
    'on',
    'with',
    'at',
    'by',
    'from',
    'as',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'between',
    'out',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'each',
    'every',
    'both',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    'just',
    'because',
    'but',
    'and',
    'or',
    'if',
    'while',
    'about',
    'up',
    'that',
    'this',
    'these',
    'those',
    'it',
    'its',
    'which',
    'what',
    'who',
    'whom',
    'their',
    'they',
    'them',
    'we',
    'our',
    'you',
    'your',
    'he',
    'she',
    'him',
    'her',
    'his',
    'also',
    'include',
    'includes',
    'including',
    'patient',
    'presents',
    'present',
    'presents',
    'presents',
    'would',
    'following',
    'following',
    'seen',
    'found',
    'given',
    'known',
    'described',
    'reported'
]);
// Medical synonyms map — treat these terms as equivalent
const MEDICAL_SYNONYMS = {
    'myocardial infarction': [
        'mi',
        'heart attack',
        'cardiac infarction'
    ],
    'heart failure': [
        'cardiac failure',
        'hf',
        'chf',
        'congestive heart failure'
    ],
    'hypertension': [
        'high blood pressure',
        'htn',
        'elevated blood pressure'
    ],
    'diabetes': [
        'dm',
        'diabetes mellitus'
    ],
    'copd': [
        'chronic obstructive pulmonary disease',
        'chronic obstructive airway disease'
    ],
    'ekg': [
        'ecg',
        'electrocardiogram',
        'electrocardiography'
    ],
    'chest x-ray': [
        'cxr',
        'chest radiograph',
        'chest radiography'
    ],
    'blood pressure': [
        'bp'
    ],
    'complete blood count': [
        'cbc',
        'full blood count',
        'fbc'
    ],
    'renal': [
        'kidney'
    ],
    'hepatic': [
        'liver'
    ],
    'cardiac': [
        'heart'
    ],
    'pulmonary': [
        'lung'
    ],
    'cerebrovascular': [
        'cv'
    ],
    'sublingual': [
        'under the tongue',
        'sl'
    ],
    'iv': [
        'intravenous'
    ],
    'po': [
        'oral',
        'by mouth'
    ],
    'im': [
        'intramuscular'
    ],
    'prn': [
        'as needed',
        'as required'
    ],
    'stat': [
        'immediately',
        'urgently'
    ]
};
/**
 * Tokenize text into meaningful words, removing stop words and normalizing.
 */ function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((w)=>w.length > 1 && !MEDICAL_STOP_WORDS.has(w));
}
/**
 * Extract key phrases from text — multi-word medical terms that should be
 * treated as atomic units.
 */ function extractKeyPhrases(text) {
    const phrases = [];
    const lower = text.toLowerCase();
    // Check for known medical phrases
    const medicalPhrases = [
        'myocardial infarction',
        'heart failure',
        'congestive heart failure',
        'acute kidney injury',
        'chronic kidney disease',
        'chronic obstructive pulmonary disease',
        'deep vein thrombosis',
        'pulmonary embolism',
        'coronary artery disease',
        'atrial fibrillation',
        'systemic lupus erythematosus',
        'inflammatory bowel disease',
        'non-steroidal anti-inflammatory',
        'angiotensin converting enzyme',
        'angiotensin receptor blocker',
        'blood pressure',
        'chest x-ray',
        'complete blood count',
        'cardiac output',
        'systemic vascular resistance',
        'end-stage renal disease',
        'transient ischemic attack'
    ];
    for (const phrase of medicalPhrases){
        if (lower.includes(phrase)) {
            phrases.push(phrase);
        }
    }
    return phrases;
}
/**
 * Check if two terms are considered equivalent using the synonym map.
 */ function areSynonyms(term1, term2) {
    const t1 = term1.toLowerCase().trim();
    const t2 = term2.toLowerCase().trim();
    if (t1 === t2) return true;
    for (const [, syns] of Object.entries(MEDICAL_SYNONYMS)){
        const allTerms = [
            ...syns,
            t1
        ];
        if (allTerms.includes(t1) && allTerms.includes(t2)) return true;
        // Also check if both are in the synonym list
        const mainEntry = Object.keys(MEDICAL_SYNONYMS).find((k)=>k === t1 || MEDICAL_SYNONYMS[k]?.includes(t1));
        if (mainEntry) {
            const allSyns = [
                mainEntry,
                ...MEDICAL_SYNONYMS[mainEntry] || []
            ];
            if (allSyns.includes(t2)) return true;
        }
    }
    return false;
}
/**
 * Evaluate a student's short answer against the expected answer using keyword matching.
 * Works 100% offline — no AI model required.
 */ function evaluateShortAnswerOffline(question, expectedAnswer, studentAnswer) {
    // Strip HTML from inputs
    const stripTags = (html)=>html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
    const cleanExpected = stripTags(expectedAnswer);
    const cleanStudent = stripTags(studentAnswer);
    const cleanQuestion = stripTags(question);
    // Extract key phrases (multi-word medical terms)
    const expectedPhrases = extractKeyPhrases(cleanExpected);
    const studentPhrases = extractKeyPhrases(cleanStudent);
    // Tokenize
    const expectedTokens = tokenize(cleanExpected);
    const studentTokens = new Set(tokenize(cleanStudent));
    // Identify key points from the expected answer
    const keyPoints = [];
    // Add key phrases as points
    for (const phrase of expectedPhrases){
        keyPoints.push(phrase);
    }
    // Add significant single tokens that aren't part of phrases
    const phraseWords = new Set(expectedPhrases.flatMap((p)=>p.split(' ')));
    for (const token of expectedTokens){
        if (!phraseWords.has(token) && token.length > 2) {
            keyPoints.push(token);
        }
    }
    // If no key points extracted, use raw tokens
    if (keyPoints.length === 0) {
        keyPoints.push(...expectedTokens.filter((t)=>t.length > 2).slice(0, 10));
    }
    // Evaluate which key points are covered
    const keyPointsCovered = [];
    const keyPointsMissed = [];
    for (const point of keyPoints){
        const pointTokens = tokenize(point);
        let covered = false;
        // Check if all tokens of the key point are in the student answer
        if (pointTokens.every((t)=>studentTokens.has(t))) {
            covered = true;
        }
        // Check phrase match
        if (!covered && studentPhrases.some((sp)=>areSynonyms(sp, point))) {
            covered = true;
        }
        // Check if any synonym matches
        if (!covered) {
            for (const studentToken of studentTokens){
                if (areSynonyms(studentToken, point) || pointTokens.some((pt)=>areSynonyms(pt, studentToken))) {
                    covered = true;
                    break;
                }
            }
        }
        // Partial match — at least half the tokens match
        if (!covered && pointTokens.length > 1) {
            const matchCount = pointTokens.filter((t)=>studentTokens.has(t)).length;
            if (matchCount >= Math.ceil(pointTokens.length / 2)) {
                covered = true;
            }
        }
        if (covered) {
            keyPointsCovered.push(point);
        } else {
            keyPointsMissed.push(point);
        }
    }
    // Calculate score
    const totalPoints = keyPoints.length;
    const coveredCount = keyPointsCovered.length;
    let score = totalPoints > 0 ? Math.round(coveredCount / totalPoints * 100) : 0;
    // Bonus for completeness — if student mentions important extra points
    const extraTokens = [
        ...studentTokens
    ].filter((t)=>!expectedTokens.includes(t) && t.length > 4);
    if (extraTokens.length > 0 && score < 100) {
        score = Math.min(100, score + 5); // small bonus for extra detail
    }
    // Penalty for very short answers
    if (cleanStudent.split(/\s+/).length < 3 && score > 20) {
        score = Math.max(0, score - 20);
    }
    // Generate feedback
    let feedback = '';
    if (score >= 90) {
        feedback = 'Excellent answer! You covered all the key points.';
    } else if (score >= 70) {
        feedback = `Good answer! You covered most key points. Consider including: ${keyPointsMissed.slice(0, 3).join(', ')}.`;
    } else if (score >= 50) {
        feedback = `Partial answer. Key points covered: ${keyPointsCovered.slice(0, 3).join(', ') || 'none'}. Missing: ${keyPointsMissed.slice(0, 4).join(', ')}.`;
    } else if (score >= 25) {
        feedback = `Your answer is incomplete. The expected answer covers: ${keyPoints.slice(0, 5).join(', ')}. You mentioned: ${keyPointsCovered.slice(0, 3).join(', ') || 'few key points'}.`;
    } else {
        feedback = `Your answer doesn't address the key concepts. The question asks about: ${cleanQuestion.slice(0, 100)}. Key points expected: ${keyPoints.slice(0, 5).join(', ')}.`;
    }
    return {
        score,
        feedback,
        keyPointsCovered,
        keyPointsMissed,
        method: 'keyword'
    };
}


/***/ }),

/***/ 910576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ QuestionCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(948581);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(780670);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(774789);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(889327);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(732438);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(709728);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(230479);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(504635);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(537663);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(457974);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(686056);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(576270);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(811897);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(505152);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(347352);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(244412);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(35471);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(789216);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(792361);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(704107);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(891128);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(352839);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(982244);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(890707);
/* harmony import */ var _lib_download_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(245019);
/* harmony import */ var _lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(731554);
/* harmony import */ var _lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(684350);
/* harmony import */ var _lib_diagram_renderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(468848);
/* harmony import */ var _lib_molecular_illustrator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(997637);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(170072);
/* harmony import */ var _components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115056);
/* harmony import */ var _components_medq_AIClinicalReasoning__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(493891);
/* harmony import */ var _lib_offline_queue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(881002);
/* harmony import */ var _components_medq_ShareQuestionDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(89137);
/* harmony import */ var _components_medq_SourceViewerModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(216252);
/* harmony import */ var _components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(536941);
/* __next_internal_client_entry_do_not_use__ default auto */ 
















function citationTrust(c) {
    const js = typeof c.judgeScore === 'number' ? c.judgeScore : null;
    const cov = typeof c.answerCoverage === 'number' ? c.answerCoverage : null;
    if (js == null) return 'reference';
    if (js >= 8 && (cov == null || cov >= 0.5)) return 'verified';
    if (js >= 6) return 'supported';
    return 'reference';
}
function trustTitle(c) {
    const parts = [];
    if (typeof c.judgeScore === 'number') parts.push(`answer-support judge ${c.judgeScore}/10`);
    if (typeof c.answerCoverage === 'number') parts.push(`answer-token coverage ${Math.round(c.answerCoverage * 100)}%`);
    return parts.length ? `Verification evidence — ${parts.join(' · ')}` : 'Legacy citation (no verification scores)';
}
const LETTERS = [
    'A',
    'B',
    'C',
    'D'
];
/**
 * Strip HTML tags and return plain text for comparison purposes
 */ function stripHtmlForCompare(html) {
    return html.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim().toLowerCase();
}
/**
 * Strip option letter prefix (e.g. "A. ", "b) ", "C ") for comparison purposes
 */ function stripOptionPrefix(text) {
    return text.replace(/^[a-eA-E][)\.]\s+/, '') // "A. " or "b) " (requires space after separator, NOT "A word")
    .trim();
}
/**
 * Normalize text for answer comparison - strips HTML and option prefixes
 */ function normalizeForCompare(text) {
    return stripHtmlForCompare(stripOptionPrefix(text));
}
function QuestionCard({ question, index, noAutoReveal, forceRevealed, attemptMode, onSelectedChange, initialSelected, initialCitationIndex }) {
    const initialState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            selected: initialSelected ?? null,
            revealed: forceRevealed || false,
            shortInput: ''
        }), [
        forceRevealed,
        initialSelected,
        question.id
    ]);
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialState.selected);
    const [revealed, setRevealed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialState.revealed);
    const [shortInput, setShortInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialState.shortInput);
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [hintUsed, setHintUsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [eliminatedIndices, setEliminatedIndices] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [hintPurchasing, setHintPurchasing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [downloading, setDownloading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [generatingIllustration, setGeneratingIllustration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [aiIllustrationUrl, setAiIllustrationUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(question.imageUrl || null);
    const [generatingAudio, setGeneratingAudio] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [audioUrl, setAudioUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(question.audioUrl || null);
    // ── Advanced citations: click a citation chip → the source viewer opens
    // scrolled to + highlighting the exact passage that grounded this question.
    // INDEX state (not object): the modal gets the whole citation list so it
    // can step ‹ › between citations without closing. ──
    const parsedCitations = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        try {
            const raw = question.citations;
            if (!raw) return [];
            const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (!Array.isArray(arr)) return [];
            return arr.filter((c)=>c && typeof c.sourceId === 'string' && typeof c.chunkId === 'string').slice(0, 5);
        } catch  {
            return [];
        }
    }, [
        question
    ]);
    // Deep link (?cite=N) — start with the linked citation OPEN (lazy init, so
    // /bank?q=<id>&cite=<i> lands directly on the cited passage; clamped).
    const [citationIdx, setCitationIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>initialCitationIndex != null && parsedCitations.length > 0 ? Math.max(0, Math.min(initialCitationIndex, parsedCitations.length - 1)) : -1);
    const activeCitation = citationIdx >= 0 ? parsedCitations[citationIdx] : undefined;
    /** Citations whose evidence passed the verified bar (judge ≥ 8, ≥ 50% coverage). */ const verifiedCitationCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>parsedCitations.filter((c)=>citationTrust(c) === 'verified').length, [
        parsedCitations
    ]);
    /* ── Citation deep links — a URL that re-opens THIS question with THIS
     citation highlighted (/bank?q=<id>&cite=<i>). Copied from the chips and
     from the source viewer; the bank page consumes it on mount. ── */ const [copiedCitation, setCopiedCitation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const buildCitationLink = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((i)=>`${window.location.origin}/bank?q=${encodeURIComponent(question.id)}&cite=${i}`, [
        question.id
    ]);
    const copyCitationLink = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (i)=>{
        const url = buildCitationLink(i);
        try {
            await navigator.clipboard.writeText(url);
        } catch  {
            // Fallback for non-secure contexts / older browsers
            const ta = document.createElement('textarea');
            ta.value = url;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
            } catch  {}
            ta.remove();
        }
        setCopiedCitation(i);
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Citation link copied — reopens this exact passage');
        setTimeout(()=>setCopiedCitation((cur)=>cur === i ? null : cur), 1800);
    }, [
        buildCitationLink
    ]);
    // Deep link (?cite=N) is consumed by the lazy citationIdx initializer above.
    // ── Confidence rating (metacognition) + attempt recording for adaptive difficulty ──
    const [confidence, setConfidence] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const mountedAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(Date.now());
    const attemptRecordedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const [shareOpen, setShareOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { settings } = (0,_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_8__.useSettings)();
    const { credits, refresh: refreshCredits } = (0,_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_9__/* .useSubscription */ .R)();
    // ── Agent media flags ──
    // Stem audio: the audio is PART OF the question (listening exercise) when the
    // stem references it (agent questions include a 🔊 cue).
    const stemAudioUrl = audioUrl && /🔊|listen to the audio/i.test(question.text) ? audioUrl : null;
    const questionVideoUrl = question.videoUrl || null;
    const questionModelUrl = question.modelUrl || null;
    // Bookmark state
    const [isBookmarked, setIsBookmarked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [bookmarkLoading, setBookmarkLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Sound effects when answer is revealed
    const prevRevealed = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(revealed);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (revealed && !prevRevealed.current && selected) {
            if (settings.soundEffects) {
                Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 170072)).then(({ playSound })=>{
                    const isCorrectAnswer = isCorrect(selected);
                    playSound(isCorrectAnswer ? 'correct' : 'wrong');
                });
            }
            // Auto-play audio when answer is revealed (if setting is enabled and audio exists)
            if (settings.autoPlayAudio && audioUrl) {
                setTimeout(()=>{
                    audioRef.current?.play().catch(()=>{});
                }, 300);
            }
        }
        prevRevealed.current = revealed;
    }, [
        revealed,
        selected,
        settings.soundEffects,
        settings.autoPlayAudio,
        audioUrl
    ]);
    // Notes state
    const [noteText, setNoteText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [noteLoaded, setNoteLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [noteSaving, setNoteSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [notesOpen, setNotesOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const noteSaveTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Discussion state
    const [discussionOpen, setDiscussionOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [discussions, setDiscussions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [discussionTotal, setDiscussionTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [discussionInput, setDiscussionInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [discussionLoading, setDiscussionLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [discussionSubmitting, setDiscussionSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Report state
    const [reportStatus, setReportStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('unchecked');
    const [reportDialogOpen, setReportDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [reportReason, setReportReason] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [reportComment, setReportComment] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [reportSubmitting, setReportSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Answer evaluation state
    const [evaluation, setEvaluation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [evaluating, setEvaluating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [evalMethod, setEvalMethod] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [aiModelStatus, setAiModelStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.getModelStatus());
    // Refs for diagram and molecular rendering
    const diagramRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const molecularRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Parse and validate diagramSpec
    const parsedDiagramSpec = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!question.diagramSpec) return null;
        try {
            // Handle both string (from /api/questions) and object (from /api/generate) formats
            const raw = question.diagramSpec;
            const spec = typeof raw === 'string' ? JSON.parse(raw) : raw;
            // Only return if it has actual nodes
            if (spec && spec.nodes && spec.nodes.length >= 2 && spec.edges && spec.edges.length >= 1) {
                return spec;
            }
            return null;
        } catch  {
            console.warn('Failed to parse diagramSpec');
            return null;
        }
    }, [
        question.diagramSpec
    ]);
    // Parse and validate molecularScenes
    const parsedMolecularScenes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!question.molecularScenes) return null;
        try {
            // Handle both string (from /api/questions) and object (from /api/generate) formats
            const raw = question.molecularScenes;
            const spec = typeof raw === 'string' ? JSON.parse(raw) : raw;
            // Only return if it has actual scenes
            if (spec && spec.scenes && spec.scenes.length >= 1) {
                return spec;
            }
            return null;
        } catch  {
            console.warn('Failed to parse molecularScenes');
            return null;
        }
    }, [
        question.molecularScenes
    ]);
    const parsedSources = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        try {
            const raw = question.sources;
            if (!raw) return [];
            // Handle both string and already-parsed array formats
            const s = typeof raw === 'string' ? JSON.parse(raw) : raw;
            return Array.isArray(s) ? s : [];
        } catch  {
            return [];
        }
    }, [
        question.sources
    ]);
    // ── Enhanced agent media: lab panel / phonocardiogram / hotspots / structure tags ──
    const isEcgImage = Boolean(question.imageUrl && question.imageUrl.startsWith('/generated/agent/ecg/'));
    const parsedLabPanel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .parseQuestionJson */ .aH)(question.labPanel, []).filter((p)=>p && Array.isArray(p.rows) && p.rows.length), [
        question.labPanel
    ]);
    const parsedPcgSpec = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const spec = (0,_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .parseQuestionJson */ .aH)(question.pcgSpec, null);
        return spec && spec.phase ? spec : null;
    }, [
        question.pcgSpec
    ]);
    const parsedHotspots = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .parseQuestionJson */ .aH)(question.hotspots, []).filter((h)=>h && h.label), [
        question.hotspots
    ]);
    const parsedStructureTags = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .parseQuestionJson */ .aH)(question.structureTags, []).filter((t)=>t && t.name), [
        question.structureTags
    ]);
    // Entry animation
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const timer = setTimeout(()=>setIsVisible(true), 50);
        return ()=>clearTimeout(timer);
    }, []);
    // Reset hint state when question changes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setHintUsed(false);
        setEliminatedIndices([]);
        setHintPurchasing(false);
        setReportStatus('unchecked');
        setReportDialogOpen(false);
        setReportReason('');
        setReportComment('');
        setConfidence(null);
        attemptRecordedRef.current = false;
        mountedAtRef.current = Date.now();
    }, [
        question.id
    ]);
    // Load bookmark status on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadBookmark = async ()=>{
            try {
                const res = await fetch('/api/bookmarks');
                if (res.ok) {
                    const data = await res.json();
                    const ids = data.bookmarks.map((b)=>b.questionId);
                    setIsBookmarked(ids.includes(question.id));
                }
            } catch  {
            // silently fail
            }
        };
        loadBookmark();
    }, [
        question.id
    ]);
    // Load report status on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadReportStatus = async ()=>{
            try {
                const res = await fetch(`/api/questions/report?questionId=${question.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setReportStatus(data.reported ? 'reported' : 'not-reported');
                } else {
                    setReportStatus('not-reported');
                }
            } catch  {
                setReportStatus('not-reported');
            }
        };
        loadReportStatus();
    }, [
        question.id
    ]);
    // Load note on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadNote = async ()=>{
            try {
                const res = await fetch(`/api/notes?questionId=${question.id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.note?.note) {
                        setNoteText(data.note.note);
                    }
                }
            } catch  {
            // silently fail
            }
            setNoteLoaded(true);
        };
        loadNote();
    }, [
        question.id
    ]);
    // ── Offline queue: refetch bookmark + note when queued writes are replayed ──
    // When the SW successfully replays a queued POST/DELETE to /api/bookmarks or
    // /api/notes (i.e. the user toggled the bookmark or saved a note while
    // offline), we refetch both states so the UI reflects the server's truth.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const refetchBookmark = async ()=>{
            try {
                const res = await fetch('/api/bookmarks');
                if (res.ok) {
                    const data = await res.json();
                    const ids = data.bookmarks.map((b)=>b.questionId);
                    setIsBookmarked(ids.includes(question.id));
                }
            } catch  {}
        };
        const refetchNote = async ()=>{
            try {
                const res = await fetch(`/api/notes?questionId=${question.id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.note?.note) {
                        setNoteText(data.note.note);
                    } else {
                        setNoteText('');
                    }
                }
            } catch  {}
            setNoteLoaded(true);
        };
        const unsubBookmarks = (0,_lib_offline_queue__WEBPACK_IMPORTED_MODULE_11__/* .subscribeToReplayForPath */ .J1)('/api/bookmarks', refetchBookmark);
        const unsubNotes = (0,_lib_offline_queue__WEBPACK_IMPORTED_MODULE_11__/* .subscribeToReplayForPath */ .J1)('/api/notes', refetchNote);
        return ()=>{
            unsubBookmarks();
            unsubNotes();
        };
    }, [
        question.id
    ]);
    // Subscribe to AI model status changes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsub = _lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.subscribe(()=>{
            setAiModelStatus(_lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.getModelStatus());
        });
        return unsub;
    }, []);
    // Diagram rendering
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (revealed && diagramRef.current && parsedDiagramSpec) {
            try {
                const renderer = new _lib_diagram_renderer__WEBPACK_IMPORTED_MODULE_7__/* .DiagramRenderer */ .b(diagramRef.current, {
                    animate: true
                });
                renderer.render(parsedDiagramSpec);
                return ()=>renderer.destroy();
            } catch (err) {
                console.warn('DiagramRenderer error:', err);
            }
        }
    }, [
        revealed,
        parsedDiagramSpec
    ]);
    // Molecular illustration rendering
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (revealed && molecularRef.current && parsedMolecularScenes) {
            try {
                const illustrator = new _lib_molecular_illustrator__WEBPACK_IMPORTED_MODULE_15__/* .MolecularIllustrator */ .G(molecularRef.current);
                illustrator.render(parsedMolecularScenes);
                setTimeout(()=>illustrator.animate(), 300);
                return ()=>illustrator.destroy();
            } catch (err) {
                console.warn('MolecularIllustrator error:', err);
            }
        }
    }, [
        revealed,
        parsedMolecularScenes
    ]);
    const handleSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        if (revealed) return;
        setSelected(value);
        onSelectedChange?.(value);
        // Keep the keyboard flow alive: move focus off the clicked option button
        // onto the card root so [Enter] (reveal) and [S] (sources) keep working.
        rootRef.current?.focus({
            preventScroll: true
        });
        if (noAutoReveal) return;
    // Confidence-first flow (metacognition): the answer is revealed only after
    // the user rates their confidence (or skips the prompt).
    }, [
        revealed,
        noAutoReveal,
        onSelectedChange
    ]);
    /** Fire-and-forget attempt recording — feeds the adaptive difficulty calibrator. */ const recordAttempt = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((level)=>{
        if (attemptRecordedRef.current || !selected) return;
        attemptRecordedRef.current = true;
        const timeSpent = Math.max(1, Math.round((Date.now() - mountedAtRef.current) / 1000));
        fetch('/api/questions/attempt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: question.id,
                selectedAnswer: selected,
                confidence: level || '',
                timeSpent,
                mode: attemptMode || 'bank'
            })
        }).catch(()=>{
        /* guest / offline — best effort only */ });
    }, [
        selected,
        question.id,
        attemptMode
    ]);
    const revealWithConfidence = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((level)=>{
        setConfidence(level);
        recordAttempt(level);
        setRevealed(true);
    }, [
        recordAttempt
    ]);
    // Safety net: if the answer gets revealed without the confidence prompt
    // (e.g. legacy flows), still record the attempt once.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (revealed && selected && !noAutoReveal) recordAttempt(null);
    }, [
        revealed,
        selected,
        noAutoReveal,
        recordAttempt
    ]);
    const handleRevealShort = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setSelected(shortInput || '—');
        if (noAutoReveal) return;
        // Instant reveal
        setRevealed(true);
    }, [
        shortInput,
        noAutoReveal
    ]);
    const handleReveal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setRevealed(true);
    }, []);
    /* ─── Evaluate short answer with keyword matching (instant, always works) ─── */ const handleKeywordEval = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!shortInput.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Please type an answer first');
            return;
        }
        setEvaluating(true);
        setEvalMethod('keyword');
        // Small delay for UX feel
        setTimeout(()=>{
            const result = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_5__/* .evaluateShortAnswerOffline */ .tG)(question.text, question.answer, shortInput);
            setEvaluation(result);
            setEvaluating(false);
        }, 300);
    }, [
        question.text,
        question.answer,
        shortInput
    ]);
    /* ─── Evaluate short answer with browser AI (if model loaded) ─── */ const handleAiEval = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!shortInput.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Please type an answer first');
            return;
        }
        if (!_lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.isModelLoaded()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No AI model loaded. Download a model from the Generate tab first.');
            return;
        }
        setEvaluating(true);
        setEvalMethod('ai');
        try {
            const result = await _lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.evaluateShortAnswer(question.text, question.answer, shortInput);
            setEvaluation(result);
        } catch  {
            // Fallback to keyword evaluation
            const fallback = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_5__/* .evaluateShortAnswerOffline */ .tG)(question.text, question.answer, shortInput);
            setEvaluation(fallback);
            setEvalMethod('keyword');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('AI evaluation failed, used keyword matching instead');
        } finally{
            setEvaluating(false);
        }
    }, [
        question.text,
        question.answer,
        shortInput
    ]);
    /* ────────────────────────────────────────────────────────────────────────────
     KEYBOARD-FIRST STUDY FLOW — the card is a focusable study surface:
       [1-4] / [A-D]  select an option (MCQ)          [T] / [F]  answer True/False
       [Enter]        reveal (skips confidence)       [S]        open Sources & Evidence
     Focus moves back to the card root after selecting, so Enter flows naturally.
     While the source viewer is open IT owns the keys (← → step citations, Esc).
     Only the FOCUSED card reacts — a page of cards never fights over keys. ── */ const rootRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [cardFocused, setCardFocused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleCardKeyDown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        if (citationIdx >= 0) return; // source viewer open — it owns ← → Esc
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const target = e.target;
        const tag = target?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) return;
        const key = e.key;
        const isMCQ = question.type === 'mcq';
        const isTF = question.type === 'tf';
        // 1-4 / A-D (MCQ) and T / F (true-false) — select an option
        if (!revealed && (isMCQ || isTF)) {
            let option = null;
            if (isTF) {
                if (key === 't' || key === 'T' || key === '1') option = 'True';
                else if (key === 'f' || key === 'F' || key === '2') option = 'False';
            } else {
                let idx = -1;
                if (/^[1-9]$/.test(key)) idx = Number(key) - 1;
                else if (/^[a-dA-D]$/.test(key)) idx = key.toLowerCase().charCodeAt(0) - 97;
                if (idx >= 0 && idx < question.options.length) option = question.options[idx];
            }
            if (option) {
                e.preventDefault();
                handleSelect(option);
                rootRef.current?.focus({
                    preventScroll: true
                });
                return;
            }
        }
        // Enter — reveal the answer (MCQ/TF, skips the confidence prompt) or
        // evaluate the typed short answer. When a button inside the card holds
        // focus, the browser's native Enter-click wins (no double action).
        if (key === 'Enter') {
            if (target?.closest('button, a, [role="button"]')) return;
            if (question.type === 'short') {
                if (shortInput.trim()) {
                    e.preventDefault();
                    handleKeywordEval();
                }
                return;
            }
            if (selected && !revealed && !noAutoReveal) {
                e.preventDefault();
                revealWithConfidence(null);
            }
            return;
        }
        // S — open Sources & Evidence (first citation) straight from the keyboard
        if (key === 's' || key === 'S') {
            if (parsedCitations.length > 0) {
                e.preventDefault();
                setCitationIdx(0);
            }
        }
    }, [
        citationIdx,
        revealed,
        question.type,
        question.options,
        selected,
        noAutoReveal,
        shortInput,
        parsedCitations,
        handleSelect,
        handleKeywordEval,
        revealWithConfidence
    ]);
    // Kbd-chip row shown while the card is focused (desktop only).
    const kbdHintChips = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const chips = [];
        if (!revealed) {
            if (question.type === 'mcq') chips.push({
                k: '1–4',
                label: 'answer'
            });
            else if (question.type === 'tf') chips.push({
                k: 'T / F',
                label: 'answer'
            });
            if (question.type !== 'short') chips.push({
                k: 'Enter',
                label: 'reveal'
            });
        }
        if (parsedCitations.length > 0) chips.push({
            k: 'S',
            label: 'sources'
        });
        return chips;
    }, [
        revealed,
        question.type,
        parsedCitations.length
    ]);
    const handleDownloadJSON = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setDownloading('json');
        try {
            await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_4__/* .downloadSingleQuestionJSON */ .Dw)(question);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Question downloaded as JSON');
        } catch (err) {
            console.error('[MedQ] JSON download error:', err);
            const msg = err instanceof Error ? err.message : 'Failed to download JSON';
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(msg);
        } finally{
            setDownloading(null);
        }
    }, [
        question
    ]);
    const handleDownloadPDF = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setDownloading('pdf');
        try {
            await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_4__/* .downloadSingleQuestionPDF */ .pC)(question);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Question downloaded as PDF');
        } catch (err) {
            console.error('[MedQ] PDF download error:', err);
            const msg = err instanceof Error ? err.message : 'Failed to generate PDF. The question data may contain unsupported characters.';
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(msg);
        } finally{
            setDownloading(null);
        }
    }, [
        question
    ]);
    const handleDownloadHTML = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setDownloading('html');
        try {
            await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_4__/* .exportAsHtml */ .Wz)({
                ...question,
                imageUrl: aiIllustrationUrl || question.imageUrl
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Question exported as HTML');
        } catch (err) {
            console.error('[MedQ] HTML export error:', err);
            const msg = err instanceof Error ? err.message : 'Failed to export as HTML';
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(msg);
        } finally{
            setDownloading(null);
        }
    }, [
        question,
        aiIllustrationUrl
    ]);
    const handleDownloadRefSheet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setDownloading('refsheet');
        try {
            await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_4__/* .downloadReferenceSheet */ .hk)([
                question
            ]);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Reference sheet generated');
        } catch (err) {
            console.error('[MedQ] Reference sheet error:', err);
            const msg = err instanceof Error ? err.message : 'Failed to generate reference sheet';
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(msg);
        } finally{
            setDownloading(null);
        }
    }, [
        question
    ]);
    const handleGenerateIllustration = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!question.illustrationDescription) return;
        setGeneratingIllustration(true);
        try {
            const res = await fetch('/api/generate-medical-illustration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question.id,
                    description: question.illustrationDescription
                })
            });
            if (!res.ok) {
                const errData = await res.json().catch(()=>({}));
                throw new Error(errData.error || 'Failed to generate illustration');
            }
            const data = await res.json();
            if (data.imageBase64) {
                setAiIllustrationUrl(`data:image/png;base64,${data.imageBase64}`);
            } else if (data.imageUrl) {
                setAiIllustrationUrl(data.imageUrl);
            }
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('AI illustration generated!');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'Failed to generate illustration');
        } finally{
            setGeneratingIllustration(false);
        }
    }, [
        question.id,
        question.illustrationDescription
    ]);
    /* ─── Bookmark toggle ─── */ const handleToggleBookmark = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setBookmarkLoading(true);
        try {
            const res = await fetch('/api/bookmarks', {
                method: isBookmarked ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question.id
                })
            });
            if (!res.ok) throw new Error('Failed to toggle bookmark');
            setIsBookmarked((prev)=>!prev);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(isBookmarked ? 'Bookmark removed' : 'Question bookmarked');
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to toggle bookmark');
        } finally{
            setBookmarkLoading(false);
        }
    }, [
        question.id,
        isBookmarked
    ]);
    /* ─── Submit Question Report ─── */ const handleSubmitReport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!reportReason) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Please select a reason for reporting');
            return;
        }
        setReportSubmitting(true);
        try {
            const res = await fetch('/api/questions/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question.id,
                    reason: reportReason,
                    comment: reportComment || undefined
                })
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.reported) {
                    // Already reported
                    setReportStatus('reported');
                    setReportDialogOpen(false);
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('You have already reported this question');
                    return;
                }
                throw new Error(data.error || 'Failed to submit report');
            }
            setReportStatus('reported');
            setReportDialogOpen(false);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Report submitted. Thank you for helping improve the quality!');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'Failed to submit report');
        } finally{
            setReportSubmitting(false);
        }
    }, [
        question.id,
        reportReason,
        reportComment
    ]);
    /* ─── Notes auto-save (debounced) ─── */ const saveNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (text)=>{
        setNoteSaving(true);
        try {
            if (text.trim()) {
                const res = await fetch('/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionId: question.id,
                        note: text
                    })
                });
                if (!res.ok) throw new Error('Failed to save note');
            } else {
                const res = await fetch('/api/notes', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionId: question.id
                    })
                });
                if (!res.ok && res.status !== 404) throw new Error('Failed to delete note');
            }
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to save note');
        } finally{
            setNoteSaving(false);
        }
    }, [
        question.id
    ]);
    const handleNoteChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        setNoteText(value);
        // Debounced auto-save
        if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
        noteSaveTimer.current = setTimeout(()=>{
            saveNote(value);
        }, 1500);
    }, [
        saveNote
    ]);
    const handleGenerateAudio = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        // Build TTS text from explanation + mnemonic + clinical pearl
        const parts = [];
        if (question.explanation) parts.push(question.explanation);
        if (question.mnemonic) parts.push(`Memory aid: ${question.mnemonic}`);
        if (question.clinicalPearl) parts.push(`Clinical pearl: ${question.clinicalPearl}`);
        const ttsText = parts.join(' ');
        if (!ttsText.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No explanation text available for audio generation');
            return;
        }
        setGeneratingAudio(true);
        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question.id,
                    text: ttsText
                })
            });
            if (!res.ok) {
                const errData = await res.json().catch(()=>({}));
                throw new Error(errData.error || 'Failed to generate audio');
            }
            const data = await res.json();
            if (data.audioUrl) {
                setAudioUrl(data.audioUrl);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Audio generated!');
                // Auto-play newly generated audio if setting is enabled
                if (settings.autoPlayAudio) {
                    setTimeout(()=>{
                        audioRef.current?.play().catch(()=>{});
                    }, 500);
                }
            }
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'Failed to generate audio');
        } finally{
            setGeneratingAudio(false);
        }
    }, [
        question.id,
        question.explanation,
        question.mnemonic,
        question.clinicalPearl
    ]);
    // Compare by normalizing both option and answer - strips HTML, letter prefixes, and case differences
    const isCorrect = (option)=>{
        const normOption = normalizeForCompare(option);
        const normAnswer = normalizeForCompare(question.answer);
        // Direct match
        if (normOption === normAnswer) return true;
        // Also check if answer is just a letter (a/b/c/d) and matches the option's letter prefix
        const answerLetter = question.answer.trim().toLowerCase();
        if ([
            'a',
            'b',
            'c',
            'd',
            'e'
        ].includes(answerLetter)) {
            const optionLetter = option.trim().charAt(0).toLowerCase();
            if (optionLetter === answerLetter && /^[a-eA-E][)\.]\s/.test(option.trim())) return true;
        }
        // Check if answer is contained in option (for partial matches)
        if (normAnswer.length > 5 && normOption.includes(normAnswer)) return true;
        if (normOption.length > 5 && normAnswer.includes(normOption)) return true;
        return false;
    };
    /* ─── Use Hint: Spend 3 credits to eliminate 2 wrong options ─── */ const handleUseHint = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (hintUsed || revealed || question.type !== 'mcq') return;
        if (credits.balance < 3) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Not enough credits! You need 3 credits for a hint.');
            return;
        }
        setHintPurchasing(true);
        try {
            const res = await fetch('/api/credits/spend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'hint',
                    amount: 3,
                    description: `Quiz Hint for question: ${question.id}`
                })
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.error === 'Insufficient credits') {
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Not enough credits! You need 3 credits for a hint.');
                } else {
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(data.error || 'Failed to purchase hint');
                }
                return;
            }
            // Find 2 wrong options to eliminate (not the correct answer)
            const wrongIndices = [];
            question.options.forEach((opt, i)=>{
                if (!isCorrect(opt)) {
                    wrongIndices.push(i);
                }
            });
            // Shuffle and pick 2 (or fewer if only 1 wrong option)
            const shuffled = wrongIndices.sort(()=>Math.random() - 0.5);
            const toEliminate = shuffled.slice(0, Math.min(2, shuffled.length));
            setEliminatedIndices(toEliminate);
            setHintUsed(true);
            await refreshCredits();
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Hint used! 2 wrong options eliminated.');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to purchase hint. Please try again.');
        } finally{
            setHintPurchasing(false);
        }
    }, [
        hintUsed,
        revealed,
        question.type,
        question.options,
        question.id,
        credits.balance,
        refreshCredits
    ]);
    const getOptionState = (option)=>{
        // Check if this option was eliminated by hint (before revealed check)
        const optIndex = question.options.indexOf(option);
        if (!revealed && hintUsed && eliminatedIndices.includes(optIndex)) return 'hint-eliminated';
        if (!revealed || !selected) return null;
        if (isCorrect(option)) return 'correct';
        if (normalizeForCompare(option) === normalizeForCompare(selected) && !isCorrect(option)) return 'wrong';
        return 'dimmed';
    };
    const getTfState = (value)=>{
        if (!revealed || !selected) return null;
        if (value.toLowerCase() === question.answer.toLowerCase()) return 'correct';
        if (value === selected && value.toLowerCase() !== question.answer.toLowerCase()) return 'wrong';
        return 'dimmed';
    };
    const typeLabel = question.type === 'mcq' ? 'MCQ' : question.type === 'tf' ? 'True-False' : 'Short Answer';
    const difficultyBadgeClass = question.difficulty === 'Easy' ? 'medq-badge-easy' : question.difficulty === 'Basic' ? 'medq-badge-basic' : question.difficulty === 'Moderate' ? 'medq-badge-moderate' : question.difficulty === 'Hard' ? 'medq-badge-hard' : 'medq-badge-expert';
    const typeBadgeClass = question.type === 'mcq' ? 'medq-badge-mcq' : question.type === 'tf' ? 'medq-badge-tf' : 'medq-badge-short';
    const requiredMedia = (question.mediaRequirements ?? []).filter((media)=>media.required);
    // Score color based on evaluation
    const getScoreColor = (score)=>{
        if (score >= 80) return 'text-[#00e5a0]';
        if (score >= 50) return 'text-[#ffb347]';
        return 'text-[#ff5757]';
    };
    const getScoreBg = (score)=>{
        if (score >= 80) return 'bg-[#00e5a0]/10 border-[#00e5a0]/20';
        if (score >= 50) return 'bg-[#ffb347]/10 border-[#ffb347]/20';
        return 'bg-[#ff5757]/10 border-[#ff5757]/20';
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: rootRef,
        tabIndex: 0,
        onKeyDown: handleCardKeyDown,
        onFocus: ()=>setCardFocused(true),
        onBlur: ()=>setCardFocused(false),
        role: "group",
        "aria-label": `Interactive question card${index !== undefined ? ` ${index + 1}` : ''} — keyboard: 1-4 select option, Enter reveal, S sources`,
        className: [
            'medq-question-card group',
            'bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden',
            'transition-all duration-500 outline-none',
            'focus-visible:border-[#4fc3f7]/30 focus-visible:ring-1 focus-visible:ring-[#4fc3f7]/20',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            revealed ? 'revealed' : ''
        ].join(' '),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "medq-card-topbar",
                children: [
                    index !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[11px] font-bold text-[#3a4055] uppercase tracking-widest mr-1",
                        children: [
                            "Q",
                            index + 1
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: `medq-badge ${typeBadgeClass}`,
                        children: typeLabel
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: `medq-badge ${difficultyBadgeClass}`,
                        children: question.difficulty
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "medq-badge medq-badge-system",
                        children: question.system
                    }),
                    question.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "medq-badge medq-badge-tag",
                            children: tag
                        }, tag)),
                    parsedSources.slice(0, 3).map((src, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: `medq-badge medq-badge-source medq-badge-source--${src.type}`,
                            title: src.title,
                            children: [
                                src.type === 'guideline' ? '📋' : src.type === 'paper' ? '📄' : src.type === 'audio' ? '🎧' : src.type === 'model' ? '🧩' : '📚',
                                " ",
                                src.title.length > 22 ? src.title.slice(0, 22) + '…' : src.title
                            ]
                        }, `src-${i}`)),
                    question.isAIGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(179,136,255,0.08)',
                            color: '#b388ff'
                        },
                        children: "✨ AI"
                    }),
                    parsedCitations.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(79,195,247,0.1)',
                            color: '#4fc3f7'
                        },
                        title: `${parsedCitations.length} chunk-level citation${parsedCitations.length > 1 ? 's' : ''} from your Knowledge Library${verifiedCitationCount > 0 ? ` · ${verifiedCitationCount} verified (judge ≥ 8/10)` : ''}. Open them from Sources & Evidence (S key when revealed)`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "inline-flex items-center gap-1",
                            children: [
                                "\uD83D\uDD17 ",
                                parsedCitations.length,
                                " citation",
                                parsedCitations.length > 1 ? 's' : '',
                                verifiedCitationCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "inline-flex items-center gap-0.5",
                                    style: {
                                        color: '#00e5a0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        verifiedCitationCount
                                    ]
                                })
                            ]
                        })
                    }),
                    question.reviewStatus === 'approved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(0,229,160,0.08)',
                            color: '#00e5a0'
                        },
                        title: "Answer key verified by the independent medical accuracy reviewer",
                        children: "✓ Reviewed"
                    }),
                    question.blueprintOrgan && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(79,195,247,0.1)',
                            color: '#7cc7ff'
                        },
                        title: question.blueprintTask ? `USMLE-style task: ${question.blueprintTask}` : 'USMLE-style blueprint tag',
                        children: [
                            question.blueprintOrgan,
                            question.blueprintTask ? ` · ${question.blueprintTask}` : ''
                        ]
                    }),
                    typeof question.difficultyP === 'number' && question.difficultyP >= 0 && question.attemptsCount && question.attemptsCount >= 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(245,158,11,0.08)',
                            color: '#f59e0b'
                        },
                        title: `Calibrated from ${question.attemptsCount} real attempts — ${(question.difficultyP * 100).toFixed(0)}% of users answer correctly${typeof question.discrimination === 'number' && question.discrimination >= 0 ? `, discrimination ${question.discrimination.toFixed(2)}` : ''}`,
                        children: [
                            "\uD83D\uDCCA ",
                            (question.difficultyP * 100).toFixed(0),
                            "% correct"
                        ]
                    }),
                    requiredMedia.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "medq-badge",
                        style: {
                            background: 'rgba(59,130,246,0.12)',
                            color: '#7cc7ff'
                        },
                        children: [
                            requiredMedia.map((item)=>`${item.type.toUpperCase()}`).join(' • '),
                            " required"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-auto flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: handleToggleBookmark,
                                disabled: bookmarkLoading,
                                title: isBookmarked ? 'Remove bookmark' : 'Bookmark this question',
                                className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isBookmarked ? 'text-[#00e5a0] bg-[#00e5a0]/10 hover:bg-[#00e5a0]/20' : 'text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10'}`,
                                children: [
                                    bookmarkLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : isBookmarked ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-medium hidden sm:inline",
                                        children: isBookmarked ? 'Saved' : 'Save'
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setShareOpen(true),
                                title: "Share this question with its media",
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#4fc3f7] hover:bg-[#4fc3f7]/10 transition-all",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-medium hidden sm:inline",
                                        children: "Share"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: handleGenerateAudio,
                                disabled: generatingAudio,
                                title: "Generate audio explanation",
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    generatingAudio ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-medium hidden sm:inline",
                                        children: "Audio"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenu */ .rI, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuTrigger */ .ty, {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            disabled: downloading !== null,
                                            title: "Download question",
                                            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs font-medium hidden sm:inline",
                                                    children: "Download"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuContent */ .SQ, {
                                        align: "end",
                                        className: "bg-[#1e2230] border-white/[0.08]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuItem */ ._2, {
                                                onClick: handleDownloadJSON,
                                                disabled: downloading === 'json',
                                                className: "text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    "Download as JSON"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuItem */ ._2, {
                                                onClick: handleDownloadPDF,
                                                disabled: downloading === 'pdf',
                                                className: "text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    "Download as PDF"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuItem */ ._2, {
                                                onClick: handleDownloadHTML,
                                                disabled: downloading === 'html',
                                                className: "text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    "Export as HTML"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .DropdownMenuItem */ ._2, {
                                                onClick: handleDownloadRefSheet,
                                                disabled: downloading === 'refsheet',
                                                className: "text-[#8b95a8] focus:text-[#00e5a0] focus:bg-[#00e5a0]/10 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    "Reference Sheet"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            reportStatus === 'reported' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                disabled: true,
                                title: "You have already reported this question",
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#ff5757] bg-[#ff5757]/10 cursor-default",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-medium hidden sm:inline",
                                        children: "Reported"
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setReportDialogOpen(true),
                                title: "Report this question",
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-medium hidden sm:inline",
                                        children: "Report"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            cardFocused && kbdHintChips.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "hidden sm:flex items-center gap-2.5 px-4 pt-3 pb-1 text-[10px] text-[#5a6478] select-none",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "inline-flex items-center gap-1",
                    children: kbdHintChips.map((chip)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "inline-flex items-center gap-1 mr-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                    className: "px-1.5 py-0.5 rounded-md bg-[#1a1e2b] border border-white/[0.12] text-[#8b95a8] font-mono text-[9.5px] font-semibold",
                                    children: chip.k
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    children: chip.label
                                })
                            ]
                        }, chip.k))
                })
            }),
            reportDialogOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in",
                onClick: ()=>setReportDialogOpen(false),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-full max-w-sm mx-4 rounded-2xl p-5 animate-fade-in",
                    style: {
                        background: '#1a1d28',
                        border: '1px solid rgba(255,255,255,0.08)'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                            style: {
                                                background: 'rgba(255,87,87,0.12)'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#ff5757]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "text-sm font-bold text-[#e8ecf4]",
                                            children: "Report Question"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>setReportDialogOpen(false),
                                    className: "text-[#5a6478] hover:text-[#8b95a8] transition-colors",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] text-[#5a6478] mb-3",
                            children: "Help us improve by reporting incorrect, outdated, or inappropriate questions."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2 mb-4",
                            children: [
                                {
                                    value: 'incorrect',
                                    label: 'Incorrect Answer',
                                    desc: 'The answer is wrong or misleading'
                                },
                                {
                                    value: 'outdated',
                                    label: 'Outdated Info',
                                    desc: 'Information is no longer current'
                                },
                                {
                                    value: 'offensive',
                                    label: 'Offensive',
                                    desc: 'Contains inappropriate content'
                                },
                                {
                                    value: 'duplicate',
                                    label: 'Duplicate',
                                    desc: 'This question already exists'
                                },
                                {
                                    value: 'other',
                                    label: 'Other',
                                    desc: 'Something else'
                                }
                            ].map((r)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setReportReason(r.value),
                                    className: `w-full text-left px-3 py-2.5 rounded-xl transition-all ${reportReason === r.value ? 'bg-[#ff5757]/10 border border-[#ff5757]/30' : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: `text-xs font-semibold ${reportReason === r.value ? 'text-[#ff5757]' : 'text-[#e8ecf4]'}`,
                                            children: r.label
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478] mt-0.5",
                                            children: r.desc
                                        })
                                    ]
                                }, r.value))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                            value: reportComment,
                            onChange: (e)=>setReportComment(e.target.value),
                            placeholder: "Add a comment (optional)...",
                            rows: 2,
                            className: "w-full px-3 py-2 rounded-xl text-xs bg-white/[0.03] border border-white/[0.06] text-[#e8ecf4] placeholder-[#3a4055] focus:outline-none focus:border-[#ff5757]/30 focus:bg-white/[0.05] transition-all resize-none mb-4"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>setReportDialogOpen(false),
                                    className: "flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5a6478] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all",
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: handleSubmitReport,
                                    disabled: !reportReason || reportSubmitting,
                                    className: `flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${reportReason && !reportSubmitting ? 'bg-[#ff5757] text-white hover:bg-[#ff5757]/90 active:scale-[0.98]' : 'bg-white/[0.04] text-[#3a4055] cursor-not-allowed'}`,
                                    children: reportSubmitting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }),
                                            "Submitting..."
                                        ]
                                    }) : 'Submit Report'
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-6 pt-4 pb-2",
                children: [
                    parsedLabPanel.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .LabPanelTable */ .wA, {
                        panels: parsedLabPanel
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "medq-html-preview text-[15px] leading-relaxed",
                        dangerouslySetInnerHTML: {
                            __html: question.text
                        }
                    }),
                    aiIllustrationUrl && isEcgImage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .EcgStrip */ .as, {
                        url: aiIllustrationUrl,
                        hotspots: parsedHotspots,
                        selectedAnswer: selected,
                        revealed: revealed,
                        isCorrectOption: isCorrect,
                        onSelect: handleSelect
                    }),
                    aiIllustrationUrl && !isEcgImage && parsedHotspots.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .HotspotImage */ .dC, {
                        url: aiIllustrationUrl,
                        alt: "Question image",
                        hotspots: parsedHotspots,
                        selectedAnswer: selected,
                        revealed: revealed,
                        isCorrectOption: isCorrect,
                        onSelect: handleSelect
                    }),
                    aiIllustrationUrl && !isEcgImage && parsedHotspots.length === 0 && !revealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                            src: aiIllustrationUrl,
                            alt: "AI-generated medical illustration",
                            className: "w-full max-w-full rounded-xl",
                            style: {
                                maxHeight: 400,
                                objectFit: 'contain'
                            }
                        })
                    }),
                    questionVideoUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#4fc3f7]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold text-[#4fc3f7]",
                                        children: "Watch the video, then answer"
                                    })
                                ]
                            }),
                            (()=>{
                                const yt = questionVideoUrl.match(/(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
                                if (yt) {
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                                        src: `https://www.youtube.com/embed/${yt[1]}`,
                                        title: "Question video",
                                        className: "w-full aspect-video",
                                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                        allowFullScreen: true
                                    });
                                }
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("video", {
                                    controls: true,
                                    preload: "metadata",
                                    src: questionVideoUrl,
                                    className: "w-full max-h-[420px] bg-black",
                                    children: "Your browser does not support the video element."
                                });
                            })()
                        ]
                    }),
                    questionModelUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold text-[#00e5a0]",
                                        children: "Explore the interactive 3D model, then answer"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                                src: questionModelUrl,
                                title: "Interactive 3D anatomy model",
                                className: "w-full aspect-[4/3]",
                                allow: "autoplay; fullscreen; xr-spatial-tracking",
                                allowFullScreen: true,
                                loading: "lazy"
                            }),
                            parsedStructureTags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .StructureTagChips */ .Xj, {
                                tags: parsedStructureTags,
                                selectedAnswer: selected,
                                revealed: revealed,
                                isCorrectOption: isCorrect,
                                onSelect: handleSelect
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "px-4 py-2 border-t border-white/[0.06]",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[11px] text-[#5a6478]",
                                    children: "\uD83D\uDDB1️ Drag to rotate \xb7 scroll to zoom \xb7 double-click to focus"
                                })
                            })
                        ]
                    }),
                    stemAudioUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .WaveformAudioPlayer */ .$n, {
                        src: stemAudioUrl,
                        title: /🔊/.test(question.text) && !/listen to the audio/i.test(question.text) ? 'Auscultate — listen to the recording, then answer' : 'Listen to the audio, then answer',
                        pcgSpec: parsedPcgSpec
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-6 pb-4 pt-2",
                children: [
                    question.type === 'mcq' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            !revealed && !hintUsed && question.options.length > 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mb-3",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: handleUseHint,
                                    disabled: hintPurchasing || credits.balance < 3,
                                    className: `medq-hint-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all w-full justify-center ${credits.balance >= 3 ? 'bg-[#f59e0b]/[0.08] text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/[0.15] hover:border-[#f59e0b]/30 active:scale-[0.98]' : 'bg-white/[0.03] text-[#3a4055] border border-white/[0.04] cursor-not-allowed'}`,
                                    children: hintPurchasing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-3.5 h-3.5 border-2 border-[#f59e0b]/30 border-t-[#f59e0b] rounded-full animate-spin"
                                            }),
                                            "Purchasing hint..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            "Use Hint",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "w-2.5 h-2.5"
                                                    }),
                                                    "3 credits"
                                                ]
                                            }),
                                            credits.balance < 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[#ff5757] text-[10px]",
                                                children: "• Not enough credits"
                                            })
                                        ]
                                    })
                                })
                            }),
                            hintUsed && !revealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 text-[#f59e0b]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] text-[#f59e0b] font-semibold",
                                        children: "Hint active"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] text-[#5a6478]",
                                        children: [
                                            "— ",
                                            eliminatedIndices.length,
                                            " wrong options eliminated"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex flex-col gap-3",
                                children: question.options.map((option, i)=>{
                                    const state = getOptionState(option);
                                    const isHintEliminated = state === 'hint-eliminated';
                                    const isUserSelected = selected && normalizeForCompare(option) === normalizeForCompare(selected);
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>handleSelect(option),
                                        disabled: revealed || isHintEliminated,
                                        className: [
                                            'medq-option-btn',
                                            isHintEliminated ? 'medq-option-hint-eliminated' : state === 'correct' ? 'correct locked' : state === 'wrong' ? 'wrong locked' : state === 'dimmed' ? 'dimmed locked' : revealed ? 'locked' : ''
                                        ].join(' '),
                                        style: isHintEliminated ? {
                                            animation: 'hintEliminate 0.4s ease-out forwards'
                                        } : undefined,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "medq-option-letter",
                                                children: LETTERS[i]
                                            }),
                                            option.includes('<') ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "medq-html-preview text-[13.5px]",
                                                dangerouslySetInnerHTML: {
                                                    __html: option
                                                }
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                children: option
                                            }),
                                            revealed && state === 'correct' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "ml-auto flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                        className: "w-5 h-5 text-[#00e5a0]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-xs font-bold text-[#00e5a0] bg-[#00e5a0]/10 px-2 py-0.5 rounded-md",
                                                        children: "CORRECT"
                                                    })
                                                ]
                                            }),
                                            revealed && isUserSelected && state === 'wrong' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "ml-auto flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                        className: "w-5 h-5 text-[#ff5757]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-xs font-bold text-[#ff5757] bg-[#ff5757]/10 px-2 py-0.5 rounded-md",
                                                        children: "WRONG"
                                                    })
                                                ]
                                            })
                                        ]
                                    }, i);
                                })
                            }),
                            selected && !revealed && !noAutoReveal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .ConfidenceBar */ .uH, {
                                onChoose: (level)=>revealWithConfidence(level),
                                onSkip: ()=>revealWithConfidence(null)
                            }),
                            confidence && revealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-3 text-center text-[10.5px] text-[#5a6478]",
                                children: [
                                    "confidence rated: ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "font-bold text-[#b388ff]",
                                        children: confidence === 'sure' ? "I'm sure" : confidence === 'probably' ? 'Probably' : 'Guessing'
                                    })
                                ]
                            })
                        ]
                    }),
                    question.type === 'tf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "medq-tf-grid",
                                children: [
                                    'True',
                                    'False'
                                ].map((value)=>{
                                    const state = getTfState(value);
                                    const isUserSelected = selected === value;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>handleSelect(value),
                                        disabled: revealed,
                                        className: [
                                            'medq-option-btn medq-tf-btn justify-center gap-2',
                                            state === 'correct' ? 'correct locked' : state === 'wrong' ? 'wrong locked' : state === 'dimmed' ? 'dimmed locked' : revealed ? 'locked' : ''
                                        ].join(' '),
                                        children: [
                                            state === 'correct' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#00e5a0]"
                                            }),
                                            state === 'wrong' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#ff5757]"
                                            }),
                                            value,
                                            revealed && isUserSelected && state === 'correct' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-bold text-[#00e5a0]",
                                                children: "✓"
                                            }),
                                            revealed && isUserSelected && state === 'wrong' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-bold text-[#ff5757]",
                                                children: "✗"
                                            })
                                        ]
                                    }, value);
                                })
                            }),
                            selected && !revealed && !noAutoReveal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_question_media__WEBPACK_IMPORTED_MODULE_14__/* .ConfidenceBar */ .uH, {
                                onChoose: (level)=>revealWithConfidence(level),
                                onSkip: ()=>revealWithConfidence(null)
                            })
                        ]
                    }),
                    question.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        className: "medq-short-input",
                                        placeholder: "Type your answer…",
                                        value: shortInput,
                                        onChange: (e)=>setShortInput(e.target.value),
                                        disabled: revealed,
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter' && !revealed) handleRevealShort();
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: handleRevealShort,
                                        disabled: revealed,
                                        className: [
                                            'px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap',
                                            revealed ? 'bg-white/[0.04] text-[#3a4055] cursor-default' : 'bg-[#00e5a0]/[0.12] text-[#00e5a0] hover:bg-[#00e5a0]/[0.2] cursor-pointer'
                                        ].join(' '),
                                        children: revealed ? 'Revealed' : 'Reveal'
                                    })
                                ]
                            }),
                            !revealed && shortInput.trim().length > 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: handleKeywordEval,
                                        disabled: evaluating,
                                        className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/20 transition-all disabled:opacity-50 cursor-pointer",
                                        children: [
                                            evaluating && evalMethod === 'keyword' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Check Answer (Offline)"
                                        ]
                                    }),
                                    _lib_browser_ai__WEBPACK_IMPORTED_MODULE_6__/* .browserAI */ .d.isSupported() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: handleAiEval,
                                        disabled: evaluating || !aiModelStatus.loaded,
                                        className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/20 hover:bg-[#00e5a0]/20 transition-all disabled:opacity-50 cursor-pointer",
                                        title: !aiModelStatus.loaded ? 'Download an AI model first from the Generate tab' : 'Check with browser AI',
                                        children: [
                                            evaluating && evalMethod === 'ai' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Check with AI ",
                                            aiModelStatus.loaded ? `(${aiModelStatus.modelId?.split('-')[0]})` : '(No Model)'
                                        ]
                                    })
                                ]
                            }),
                            evaluation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `mt-3 p-4 rounded-xl border ${getScoreBg(evaluation.score)}`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: `text-2xl font-black ${getScoreColor(evaluation.score)}`,
                                                children: [
                                                    evaluation.score,
                                                    "%"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-full bg-white/[0.06] rounded-full h-2",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: `h-2 rounded-full transition-all duration-500 ${evaluation.score >= 80 ? 'bg-[#00e5a0]' : evaluation.score >= 50 ? 'bg-[#ffb347]' : 'bg-[#ff5757]'}`,
                                                        style: {
                                                            width: `${evaluation.score}%`
                                                        }
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-[#5a6478] font-semibold",
                                                children: evalMethod === 'ai' ? 'AI' : 'Keyword'
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#c8d0e0] leading-relaxed mb-2",
                                        children: evaluation.feedback
                                    }),
                                    evaluation.keyPointsCovered.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-wrap gap-1.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] text-[#00e5a0] font-semibold",
                                                children: "Covered:"
                                            }),
                                            evaluation.keyPointsCovered.slice(0, 5).map((point, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md bg-[#00e5a0]/10 text-[#00e5a0]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        point
                                                    ]
                                                }, i))
                                        ]
                                    }),
                                    evaluation.keyPointsMissed.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] text-[#ff5757] font-semibold",
                                                children: "Missed:"
                                            }),
                                            evaluation.keyPointsMissed.slice(0, 5).map((point, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md bg-[#ff5757]/10 text-[#ff5757]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        point
                                                    ]
                                                }, i))
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    noAutoReveal && selected && !revealed && attemptMode !== 'exam-sim' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: handleReveal,
                        className: "mt-3 w-full py-3 rounded-xl bg-[#00e5a0]/[0.08] text-[#00e5a0] text-sm font-bold hover:bg-[#00e5a0]/[0.15] transition-all",
                        children: "Check Answer"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: `medq-reveal-section ${revealed ? 'open' : ''}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "medq-reveal-inner",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "medq-correct-banner",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 20 20",
                                    fill: "none",
                                    className: "flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                            cx: "10",
                                            cy: "10",
                                            r: "10",
                                            fill: "#00e5a0",
                                            fillOpacity: "0.15"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                            d: "M6 10.5L8.5 13L14 7",
                                            stroke: "#00e5a0",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        "Correct Answer:",
                                        ' ',
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            children: question.type === 'mcq' ? `${question.answer}` : question.answer
                                        })
                                    ]
                                })
                            ]
                        }),
                        audioUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-5 answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-purple",
                                            children: "\uD83D\uDD0A"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Audio Explanation"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "bg-[#0f1118]/50 rounded-xl border border-white/[0.08] p-4",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                    className: "w-5 h-5 text-[#8b5cf6]"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs text-[#8b95a8] mb-2 font-medium",
                                                        children: "Listen to the explanation"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("audio", {
                                                        ref: audioRef,
                                                        controls: true,
                                                        src: audioUrl,
                                                        className: "w-full h-8",
                                                        style: {
                                                            filter: 'hue-rotate(200deg) brightness(1.2)'
                                                        },
                                                        children: "Your browser does not support the audio element."
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        question.illustrationDescription && !aiIllustrationUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: handleGenerateIllustration,
                                    disabled: generatingIllustration,
                                    className: [
                                        'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer',
                                        'bg-gradient-to-r from-[#00e5a0]/20 to-[#00b87a]/20',
                                        'text-[#00e5a0] border border-[#00e5a0]/20',
                                        'hover:from-[#00e5a0]/30 hover:to-[#00b87a]/30 hover:border-[#00e5a0]/40',
                                        'disabled:opacity-50 disabled:cursor-not-allowed'
                                    ].join(' '),
                                    children: generatingIllustration ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                className: "w-4 h-4 animate-spin"
                                            }),
                                            "Generating Illustration…"
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            "✨ ",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            "Generate Illustration"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[11px] text-[#5a6478] mt-1.5 ml-1",
                                    children: "Generates a visual diagram of the key concepts"
                                })
                            ]
                        }),
                        aiIllustrationUrl && !isEcgImage && parsedHotspots.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mb-5 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: aiIllustrationUrl,
                                alt: "AI-generated medical illustration",
                                className: "w-full max-w-full rounded-xl",
                                style: {
                                    maxHeight: 400,
                                    objectFit: 'contain'
                                }
                            })
                        }),
                        question.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "q-short-answer-reveal",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "answer-label",
                                    children: "Expected Answer"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "answer-value",
                                    children: question.answer
                                })
                            ]
                        }),
                        parsedDiagramSpec && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-blue",
                                            children: "\uD83D\uDCCA"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Interactive Pathway Diagram"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "q-diagram-interactive",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "diagram-title-bar",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "dt-label",
                                                    children: [
                                                        "\uD83E\uDDEC ",
                                                        parsedDiagramSpec.title || 'Pathway Diagram'
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "dt-hint",
                                                    children: "\uD83D\uDDB1️ Click node to trace pathway"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            ref: diagramRef,
                                            className: "w-full min-h-[280px]"
                                        })
                                    ]
                                })
                            ]
                        }),
                        parsedMolecularScenes && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-purple",
                                            children: "\uD83D\uDD2C"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Molecular Mechanism"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[10px] text-[#5a6478] font-medium ml-auto",
                                            children: "Normal vs Drug Effect"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    ref: molecularRef
                                })
                            ]
                        }),
                        question.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-blue",
                                            children: "\uD83E\uDDEC"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Explanation"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "medq-html-preview",
                                    dangerouslySetInnerHTML: {
                                        __html: question.explanation
                                    }
                                })
                            ]
                        }),
                        question.mnemonic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-purple",
                                            children: "\uD83D\uDCA1"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Mnemonic"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "medq-html-preview",
                                    dangerouslySetInnerHTML: {
                                        __html: question.mnemonic
                                    }
                                })
                            ]
                        }),
                        question.clinicalPearl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-amber",
                                            children: "\uD83C\uDFAF"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Clinical Pearl"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "medq-html-preview",
                                    dangerouslySetInnerHTML: {
                                        __html: question.clinicalPearl
                                    }
                                })
                            ]
                        }),
                        question.distractorAnalysis && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "answer-section",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "section-header",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "section-icon icon-orange",
                                            children: "\uD83D\uDD0D"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "section-title",
                                            children: "Distractor Analysis"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "medq-html-preview",
                                    dangerouslySetInnerHTML: {
                                        __html: question.distractorAnalysis
                                    }
                                })
                            ]
                        }),
                        (()=>{
                            const sources = (()=>{
                                try {
                                    return question.sources ? typeof question.sources === 'string' ? JSON.parse(question.sources) : question.sources : [];
                                } catch  {
                                    return [];
                                }
                            })();
                            const hasCitations = parsedCitations.length > 0;
                            if (!hasCitations && (!Array.isArray(sources) || sources.length === 0)) return null;
                            const kindIcon = (t)=>t === 'audio' ? '🎧' : t === 'video' ? '🎬' : t === 'image' ? '🖼️' : t === 'library' ? '📚' : '📄';
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "answer-section",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "section-header",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "section-icon icon-green",
                                                children: "\uD83D\uDCDA"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                className: "section-title",
                                                children: "Sources & Evidence"
                                            }),
                                            hasCitations && verifiedCitationCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] text-[10px] font-bold",
                                                title: "Citations whose answer-support judge scored ≥ 8/10 with ≥ 50% answer-token coverage",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    verifiedCitationCount,
                                                    "/",
                                                    parsedCitations.length,
                                                    " verified"
                                                ]
                                            })
                                        ]
                                    }),
                                    hasCitations && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: parsedCitations.map((c, i)=>{
                                            const trust = citationTrust(c);
                                            const hasScores = typeof c.judgeScore === 'number';
                                            const trustCls = trust === 'verified' ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]' : trust === 'supported' ? 'bg-[#ffb347]/10 border-[#ffb347]/30 text-[#ffb347]' : 'bg-white/[0.05] border-white/[0.12] text-[#8b95a8]';
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-stretch gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setCitationIdx(i),
                                                        className: "group min-w-0 flex-1 text-left flex items-start gap-2 px-2.5 py-2 rounded-lg bg-[#0f1320] border border-white/[0.06] hover:border-[#4fc3f7]/40 hover:bg-[#4fc3f7]/[0.04] transition-colors",
                                                        title: "Open the cited passage in the original file",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "shrink-0 text-[#4fc3f7]/80 font-mono text-[10px] mt-0.5",
                                                                children: [
                                                                    "[",
                                                                    i + 1,
                                                                    "]"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "min-w-0 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "flex items-center gap-1.5 text-[11px] text-[#c8d0e0] font-medium",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                children: kindIcon(c.fileKind)
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "truncate",
                                                                                children: c.title || 'Knowledge source'
                                                                            }),
                                                                            hasScores && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: `shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wide ${trustCls}`,
                                                                                title: trustTitle(c),
                                                                                children: [
                                                                                    trust === 'verified' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                                        className: "w-2.5 h-2.5"
                                                                                    }),
                                                                                    c.judgeScore,
                                                                                    "/10",
                                                                                    typeof c.answerCoverage === 'number' ? ` · ${Math.round(c.answerCoverage * 100)}%` : ''
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "ml-auto shrink-0 hidden group-hover:inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#4fc3f7] font-semibold",
                                                                                children: "open in file ↗"
                                                                            })
                                                                        ]
                                                                    }),
                                                                    c.quote && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "block mt-1 text-[10px] text-[#8b95a8] leading-relaxed line-clamp-2 opacity-80",
                                                                        children: [
                                                                            "“",
                                                                            c.quote.slice(0, 180),
                                                                            c.quote.length > 180 ? '…' : '',
                                                                            "”"
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>copyCitationLink(i),
                                                        title: "Copy a link that reopens this question at this exact citation",
                                                        className: "shrink-0 w-8 flex items-center justify-center rounded-lg bg-[#0f1320] border border-white/[0.06] text-[#5a6478] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/40 transition-colors",
                                                        children: copiedCitation === i ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5 text-[#00e5a0]"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5"
                                                        })
                                                    })
                                                ]
                                            }, `${c.sourceId}:${c.chunkId}`);
                                        })
                                    }),
                                    !hasCitations && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: sources.map((s, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.06] text-[11px] leading-relaxed",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "shrink-0 text-[#4fc3f7]/80 font-mono text-[10px] mt-0.5",
                                                        children: [
                                                            "[",
                                                            i + 1,
                                                            "]"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[#8b95a8] break-words",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "mr-1",
                                                                children: kindIcon(String(s?.type || ''))
                                                            }),
                                                            String(s?.title || '')
                                                        ]
                                                    })
                                                ]
                                            }, i))
                                    })
                                ]
                            });
                        })(),
                        activeCitation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_SourceViewerModal__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            sourceId: activeCitation.sourceId || parsedCitations.find((c)=>c.chunkId === activeCitation.chunkId)?.sourceId || '',
                            onClose: ()=>setCitationIdx(-1),
                            kindBadge: (kind)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-semibold shrink-0",
                                    children: kind
                                }),
                            highlight: activeCitation,
                            citations: parsedCitations,
                            citationIndex: citationIdx,
                            onNavigate: setCitationIdx,
                            citationLink: citationIdx >= 0 ? buildCitationLink(citationIdx) : undefined,
                            initialTab: "original"
                        }),
                        revealed && selected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "answer-section",
                            style: {
                                marginTop: 8
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_AIClinicalReasoning__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                userAnswer: selected,
                                correctAnswer: question.answer,
                                questionContext: {
                                    question: question.text,
                                    options: question.options,
                                    system: question.system,
                                    topic: question.topic,
                                    difficulty: question.difficulty,
                                    type: 'question'
                                },
                                isCorrect: isCorrect(selected)
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "border-t border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setNotesOpen((prev)=>!prev),
                        className: "w-full flex items-center gap-2 px-6 py-3 text-[#8b95a8] hover:text-[#f59e0b] hover:bg-[#f59e0b]/[0.03] transition-all",
                        children: [
                            notesOpen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-semibold",
                                children: "My Notes"
                            }),
                            noteText.trim() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b] font-semibold",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                        className: "w-2.5 h-2.5"
                                    }),
                                    "Has note"
                                ]
                            }),
                            noteSaving && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-3 h-3 animate-spin text-[#f59e0b] ml-1"
                            })
                        ]
                    }),
                    notesOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-6 pb-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                value: noteText,
                                onChange: (e)=>handleNoteChange(e.target.value),
                                placeholder: "Add your notes, key points, or reminders for this question…",
                                rows: 4,
                                className: "w-full bg-[#0c0e14] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8ecf4] placeholder-[#3a4055] resize-y min-h-[80px] focus:outline-none focus:border-[#f59e0b]/30 focus:ring-1 focus:ring-[#f59e0b]/20 transition-all"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between mt-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#3a4055]",
                                        children: "Auto-saves as you type"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            noteSaving && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px] text-[#f59e0b] flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                        className: "w-3 h-3 animate-spin"
                                                    }),
                                                    "Saving…"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
                                                    saveNote(noteText);
                                                },
                                                disabled: noteSaving,
                                                className: "text-[10px] font-semibold px-3 py-1.5 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 transition-all disabled:opacity-50",
                                                children: "Save Now"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "border-t border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: async ()=>{
                            const opening = !discussionOpen;
                            setDiscussionOpen(opening);
                            if (opening && discussions.length === 0) {
                                setDiscussionLoading(true);
                                try {
                                    const res = await fetch(`/api/questions/discussions?questionId=${question.id}`);
                                    if (res.ok) {
                                        const data = await res.json();
                                        setDiscussions(data.discussions || []);
                                        setDiscussionTotal(data.total || 0);
                                    }
                                } catch  {}
                                setDiscussionLoading(false);
                            }
                        },
                        className: "w-full flex items-center gap-2 px-6 py-3 text-[#8b95a8] hover:text-[#4fc3f7] hover:bg-[#4fc3f7]/[0.03] transition-all",
                        children: [
                            discussionOpen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-semibold",
                                children: "Discussion"
                            }),
                            discussionTotal > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/10 text-[#4fc3f7] font-semibold",
                                children: discussionTotal
                            }),
                            discussionLoading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-3 h-3 animate-spin text-[#4fc3f7] ml-1"
                            })
                        ]
                    }),
                    discussionOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-6 pb-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "max-h-64 overflow-y-auto space-y-3 mb-3",
                                style: {
                                    scrollbarWidth: 'thin'
                                },
                                children: [
                                    discussions.length === 0 && !discussionLoading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] text-[#3a4055] text-center py-4",
                                        children: "No comments yet. Start the discussion!"
                                    }),
                                    discussions.map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-7 h-7 rounded-full bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#4fc3f7]",
                                                    children: (d.user.name || 'A').charAt(0).toUpperCase()
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[11px] font-semibold text-[#e8ecf4]",
                                                                    children: d.user.name
                                                                }),
                                                                d.isExpert && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[9px] px-1.5 py-0.5 rounded bg-[#00e5a0]/10 text-[#00e5a0] font-bold",
                                                                    children: "Expert"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[9px] text-[#3a4055]",
                                                                    children: new Date(d.createdAt).toLocaleDateString()
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[11px] text-[#8b95a8] mt-0.5 leading-relaxed break-words",
                                                            children: d.content
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                            type: "button",
                                                            onClick: async ()=>{
                                                                try {
                                                                    await fetch('/api/questions/discussions', {
                                                                        method: 'PATCH',
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            discussionId: d.id,
                                                                            action: 'like'
                                                                        })
                                                                    });
                                                                    setDiscussions((prev)=>prev.map((item)=>item.id === d.id ? {
                                                                                ...item,
                                                                                likes: item.likes + 1
                                                                            } : item));
                                                                } catch  {}
                                                            },
                                                            className: "flex items-center gap-1 mt-1 text-[#5a6478] hover:text-[#4fc3f7] transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[10px]",
                                                                    children: d.likes
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, d.id))
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: discussionInput,
                                        onChange: (e)=>setDiscussionInput(e.target.value),
                                        onKeyDown: async (e)=>{
                                            if (e.key === 'Enter' && discussionInput.trim()) {
                                                setDiscussionSubmitting(true);
                                                try {
                                                    const res = await fetch('/api/questions/discussions', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            questionId: question.id,
                                                            content: discussionInput.trim()
                                                        })
                                                    });
                                                    if (res.ok) {
                                                        const newComment = await res.json();
                                                        setDiscussions((prev)=>[
                                                                newComment,
                                                                ...prev
                                                            ]);
                                                        setDiscussionTotal((prev)=>prev + 1);
                                                        setDiscussionInput('');
                                                        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Comment posted!');
                                                    } else {
                                                        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to post comment');
                                                    }
                                                } catch  {
                                                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to post comment');
                                                }
                                                setDiscussionSubmitting(false);
                                            }
                                        },
                                        placeholder: "Add a comment…",
                                        disabled: discussionSubmitting,
                                        className: "flex-1 bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] text-[#e8ecf4] placeholder-[#3a4055] focus:outline-none focus:border-[#4fc3f7]/30 focus:ring-1 focus:ring-[#4fc3f7]/20 transition-all disabled:opacity-50"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        disabled: discussionSubmitting || !discussionInput.trim(),
                                        onClick: async ()=>{
                                            if (!discussionInput.trim()) return;
                                            setDiscussionSubmitting(true);
                                            try {
                                                const res = await fetch('/api/questions/discussions', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        questionId: question.id,
                                                        content: discussionInput.trim()
                                                    })
                                                });
                                                if (res.ok) {
                                                    const newComment = await res.json();
                                                    setDiscussions((prev)=>[
                                                            newComment,
                                                            ...prev
                                                        ]);
                                                    setDiscussionTotal((prev)=>prev + 1);
                                                    setDiscussionInput('');
                                                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Comment posted!');
                                                } else {
                                                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to post comment');
                                                }
                                            } catch  {
                                                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to post comment');
                                            }
                                            setDiscussionSubmitting(false);
                                        },
                                        className: "flex items-center justify-center w-9 h-9 rounded-lg bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/20 hover:bg-[#4fc3f7]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                                        children: discussionSubmitting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BookOpen_Bookmark_BookmarkCheck_Box_Check_CheckCircle2_ChevronDown_ChevronRight_Coins_Download_FileCode_FileJson_FileText_Flag_Headphones_Lightbulb_Link2_Loader2_MessageCircle_Send_Share2_ShieldCheck_Sparkles_StickyNote_ThumbsUp_Video_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ShareQuestionDialog__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                questionId: question.id,
                open: shareOpen,
                onClose: ()=>setShareOpen(false)
            })
        ]
    });
}


/***/ }),

/***/ 997637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ MolecularIllustrator)
/* harmony export */ });
/**
 * MolecularIllustrator — Renders rich molecular mechanism SVG scenes from JSON specs.
 * 6 templates: receptor_ligand, gprotein_cascade, ion_channel, transporter, enzyme_catalysis, dna_binding
 * Each renders 2 side-by-side scenes: "Without Drug" (active) vs "With Drug" (blocked).
 * Dark theme, large canvas (400x260), animated, interactive hover effects, labeled zones.
 * v2: Enhanced membrane, step indicators, GPCR 7-TM, ion channel gates, enzyme lock-and-key,
 *     DNA double helix, transporter conformational change, scene descriptions, visual legend,
 *     pill-shaped drugs, improved status badges.
 * v3: Added simple molecule/interaction scene format support.
 */ // ─── Simple scene format (molecules + interactions) ───
const NS = 'http://www.w3.org/2000/svg';
const CANVAS_W = 400;
const CANVAS_H = 260;
class MolecularIllustrator {
    constructor(container){
        this.sceneElements = [];
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
    }
    /** Check if a scene is in the simple molecule/interaction format */ isSimpleScene(scene) {
        return 'molecules' in scene && Array.isArray(scene.molecules);
    }
    render(spec) {
        this.destroy();
        const wrapper = document.createElement('div');
        wrapper.className = 'mol-wrapper';
        for (const scene of spec.scenes){
            const sceneEl = document.createElement('div');
            if (this.isSimpleScene(scene)) {
                // Simple molecule/interaction format
                sceneEl.className = 'mol-scene mol-scene-active';
                const header = document.createElement('div');
                header.className = 'mol-scene-header';
                header.innerHTML = `
          <span class="mol-scene-icon">🧬</span>
          <span class="mol-scene-title">${scene.title}</span>
        `;
                sceneEl.appendChild(header);
                const svgHtml = this.buildSimpleScene(scene);
                sceneEl.insertAdjacentHTML('beforeend', svgHtml);
            } else {
                // Template-based format
                sceneEl.className = `mol-scene ${scene.blocked ? 'mol-scene-blocked' : 'mol-scene-active'}`;
                const header = document.createElement('div');
                header.className = 'mol-scene-header';
                const badgeClass = scene.blocked ? 'badge-blocked' : 'badge-active';
                const badgeIcon = scene.blocked ? '⊘' : '✓';
                header.innerHTML = `
          <span class="mol-scene-icon">${scene.blocked ? '⊘' : '✅'}</span>
          <span class="mol-scene-title">${scene.label}</span>
          <span class="mol-scene-badge ${badgeClass} mol-badge-pulse">${badgeIcon} ${scene.resultLabel}</span>
        `;
                sceneEl.appendChild(header);
                const svgHtml = this.buildScene(scene);
                sceneEl.insertAdjacentHTML('beforeend', svgHtml);
                // Scene description text
                if (scene.descriptionText) {
                    const desc = document.createElement('div');
                    desc.className = 'mol-scene-desc';
                    desc.textContent = scene.descriptionText;
                    sceneEl.appendChild(desc);
                }
            }
            wrapper.appendChild(sceneEl);
            const svg = sceneEl.querySelector('.mol-svg');
            this.sceneElements.push({
                el: sceneEl,
                svg
            });
        }
        this.container.appendChild(wrapper);
        return wrapper;
    }
    /** Build SVG for the simple molecule/interaction scene format */ buildSimpleScene(scene) {
        const W = 600;
        const H = 400;
        const PAD = 60;
        // Assign positions to molecules if not specified
        const molecules = scene.molecules.map((m, i)=>({
                ...m,
                x: m.x ?? PAD + i % 4 * 130 + 50,
                y: m.y ?? PAD + Math.floor(i / 4) * 100 + 60,
                color: m.color ?? this.getDefaultColor(m.role)
            }));
        let svg = `<defs>
      <linearGradient id="simple-mol-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2744" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0c0e14" stop-opacity="0.3"/>
      </linearGradient>
    </defs>`;
        svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#simple-mol-bg)"/>`;
        // Draw interactions (lines/arrows between molecules)
        const molMap = new Map(molecules.map((m)=>[
                m.name,
                m
            ]));
        for (const interaction of scene.interactions){
            const from = molMap.get(interaction.from);
            const to = molMap.get(interaction.to);
            if (!from || !to) continue;
            const lineColor = this.getInteractionColor(interaction.type);
            const dashArray = interaction.type === 'inhibition' ? '6 4' : '';
            // Line
            svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" 
        stroke="${lineColor}" stroke-width="2.5" opacity="0.7"
        ${dashArray ? `stroke-dasharray="${dashArray}"` : ''}/>`;
            // Arrow head
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            const arrowSize = 8;
            const ax = to.x - Math.cos(angle) * 30;
            const ay = to.y - Math.sin(angle) * 30;
            svg += `<polygon points="${ax},${ay} ${ax - arrowSize * Math.cos(angle - 0.4)},${ay - arrowSize * Math.sin(angle - 0.4)} ${ax - arrowSize * Math.cos(angle + 0.4)},${ay - arrowSize * Math.sin(angle + 0.4)}" fill="${lineColor}" opacity="0.8"/>`;
            // Label
            if (interaction.label) {
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                svg += `<rect x="${mx - interaction.label.length * 3.5 - 6}" y="${my - 10}" width="${interaction.label.length * 7 + 12}" height="18" rx="6" fill="#0c0e14" stroke="${lineColor}" stroke-width="0.8" stroke-opacity="0.4"/>`;
                svg += `<text x="${mx}" y="${my + 3}" text-anchor="middle" fill="${lineColor}" font-size="9" font-weight="600" font-family="system-ui,sans-serif">${interaction.label}</text>`;
            }
        }
        // Draw molecules (circles with labels)
        for (const mol of molecules){
            const r = 24;
            // Glow
            svg += `<circle cx="${mol.x}" cy="${mol.y}" r="${r + 6}" fill="${mol.color}" opacity="0.12"/>`;
            // Main circle
            svg += `<circle cx="${mol.x}" cy="${mol.y}" r="${r}" fill="${mol.color}" stroke="${mol.color}" stroke-width="1.5" opacity="0.85"/>`;
            // Inner highlight
            svg += `<circle cx="${mol.x}" cy="${mol.y - r * 0.25}" r="${r * 0.6}" fill="rgba(255,255,255,0.08)"/>`;
            // Label
            const fontSize = mol.name.length > 6 ? 8 : 10;
            svg += `<text x="${mol.x}" y="${mol.y + 3}" text-anchor="middle" fill="#fff" font-size="${fontSize}" font-weight="700" font-family="system-ui,sans-serif">${mol.name}</text>`;
            // Role below
            svg += `<text x="${mol.x}" y="${mol.y + r + 14}" text-anchor="middle" fill="#5a6478" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${mol.role}</text>`;
        }
        // Title bar
        svg += `<rect x="0" y="0" width="${W}" height="24" rx="0" fill="rgba(0,229,160,0.08)"/>`;
        svg += `<text x="10" y="16" fill="#00e5a0" font-size="10" font-weight="700" font-family="system-ui,sans-serif">🧬 ${scene.title}</text>`;
        return `<svg class="mol-svg" viewBox="0 0 ${W} ${H}" xmlns="${NS}">${svg}</svg>`;
    }
    getDefaultColor(role) {
        const roleColors = {
            receptor: '#8b5cf6',
            ligand: '#ef4444',
            enzyme: '#f97316',
            substrate: '#3b82f6',
            product: '#22c55e',
            drug: '#10b981',
            inhibitor: '#EF4444',
            channel: '#6366f1',
            transporter: '#0d9488',
            hormone: '#ec4899',
            ion: '#fbbf24',
            gene: '#a78bfa'
        };
        return roleColors[role.toLowerCase()] || '#64748b';
    }
    getInteractionColor(type) {
        const typeColors = {
            activation: '#22c55e',
            inhibition: '#ef4444',
            conversion: '#a78bfa',
            binding: '#3b82f6',
            catalysis: '#f97316',
            transport: '#0d9488',
            phosphorylation: '#fbbf24',
            feedback: '#f59e0b'
        };
        return typeColors[type.toLowerCase()] || '#94a3b8';
    }
    animate() {
        this.sceneElements.forEach((item, i)=>{
            setTimeout(()=>{
                if (item.svg) item.svg.classList.add('animate');
            }, i * 250);
        });
    }
    destroy() {
        this.sceneElements = [];
        if (this.container) this.container.innerHTML = '';
    }
    buildScene(s) {
        const tpl = s.template;
        if (tpl === 'gprotein_cascade') return this.gprotein(s);
        if (tpl === 'ion_channel') return this.ionChannel(s);
        if (tpl === 'transporter') return this.transporter(s);
        if (tpl === 'enzyme_catalysis') return this.enzyme(s);
        if (tpl === 'dna_binding') return this.dna(s);
        return this.receptorLigand(s);
    }
    // Canvas: 400x260 (requirement #1)
    svgWrap(inner, w = CANVAS_W, h = CANVAS_H) {
        return `<svg class="mol-svg" viewBox="0 0 ${w} ${h}" xmlns="${NS}">${inner}</svg>`;
    }
    /* ═══ IMPROVED MEMBRANE (requirement #2) ═══ */ membrane(my = 95, w = 380, x = 10) {
        let svg = '';
        // Subtle gradient from extracellular (lighter) to intracellular (darker)
        svg += `<defs>
      <linearGradient id="mol-zone-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2744" stop-opacity="0.3"/>
        <stop offset="${(my - 20) / CANVAS_H * 100}%" stop-color="#1a2744" stop-opacity="0.15"/>
        <stop offset="${(my + 30) / CANVAS_H * 100}%" stop-color="#111827" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0c0e14" stop-opacity="0.3"/>
      </linearGradient>
    </defs>`;
        svg += `<rect x="${x}" y="0" width="${w}" height="${CANVAS_H}" fill="url(#mol-zone-grad)"/>`;
        // Outer leaflet
        svg += `<rect x="${x}" y="${my}" width="${w}" height="9" rx="4.5" fill="#fbbf24" opacity=".12"/>`;
        for(let i = 0; i < w; i += 14){
            svg += `<circle cx="${x + i + 7}" cy="${my + 4}" r="4" fill="#f59e0b" opacity=".4"/>`;
        }
        // Inner leaflet
        svg += `<rect x="${x}" y="${my + 14}" width="${w}" height="9" rx="4.5" fill="#fbbf24" opacity=".10"/>`;
        for(let i = 7; i < w; i += 14){
            svg += `<circle cx="${x + i + 7}" cy="${my + 18}" r="4" fill="#d97706" opacity=".3"/>`;
        }
        // Hydrophobic core
        svg += `<rect x="${x}" y="${my + 7}" width="${w}" height="9" rx="3" fill="#f59e0b" opacity=".06"/>`;
        // Cholesterol molecules (diamond shapes) embedded in membrane
        const cholesterolPositions = [
            40,
            120,
            200,
            280,
            340
        ];
        for (const cx of cholesterolPositions){
            svg += `<g transform="translate(${x + cx},${my + 11}) rotate(45)">
        <rect x="-3" y="-3" width="6" height="6" fill="#a78bfa" opacity=".25" rx="1"/>
      </g>`;
        }
        return svg;
    }
    /* ═══ ZONE LABELS (requirement #2) ═══ */ zoneLabels(my = 95, w = CANVAS_W) {
        return `<text x="16" y="20" fill="#4a5568" font-size="8" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="1.2">EXTRACELLULAR</text>` + `<text x="16" y="${my + 36}" fill="#4a5568" font-size="8" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="1.2">INTRACELLULAR</text>` + `<line x1="10" y1="${my - 2}" x2="${w - 10}" y2="${my - 2}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" stroke-dasharray="3,3"/>` + `<line x1="10" y1="${my + 26}" x2="${w - 10}" y2="${my + 26}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" stroke-dasharray="3,3"/>`;
    }
    /* ═══ STEP INDICATORS (requirement #4) ═══ */ stepIndicator(step, x, y, label) {
        const colors = [
            '#8b5cf6',
            '#f59e0b',
            '#22c55e',
            '#ef4444'
        ];
        const c = colors[(step - 1) % 4];
        return `<g class="mol-step">` + `<circle cx="${x}" cy="${y}" r="9" fill="${c}" opacity=".85"/>` + `<text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#fff" font-size="8" font-weight="800" font-family="system-ui,sans-serif">${step}</text>` + `</g>` + `<text x="${x + 13}" y="${y + 3}" fill="${c}" font-size="7" font-weight="600" font-family="system-ui,sans-serif" opacity=".8">${label}</text>`;
    }
    /* ═══ VISUAL LEGEND (requirement #11) ═══ */ legend(x, y) {
        const items = [
            {
                color: '#8b5cf6',
                label: 'Receptor'
            },
            {
                color: '#ef4444',
                label: 'Ligand'
            },
            {
                color: '#22c55e',
                label: 'Product'
            },
            {
                color: '#f59e0b',
                label: 'Drug'
            }
        ];
        let svg = `<g class="mol-legend">`;
        svg += `<rect x="${x}" y="${y}" width="130" height="46" rx="6" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>`;
        svg += `<text x="${x + 6}" y="${y + 10}" fill="#5a6478" font-size="6" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="0.8">LEGEND</text>`;
        items.forEach((item, i)=>{
            const row = i < 2 ? 0 : 1;
            const col = i % 2;
            const ix = x + 8 + col * 64;
            const iy = y + 20 + row * 13;
            svg += `<circle cx="${ix}" cy="${iy}" r="4" fill="${item.color}" opacity=".7"/>`;
            svg += `<text x="${ix + 7}" y="${iy + 3}" fill="#8b95a8" font-size="7" font-weight="600" font-family="system-ui,sans-serif">${item.label}</text>`;
        });
        svg += `</g>`;
        return svg;
    }
    /* ═══ IMPROVED RECEPTOR (requirement #3) ═══ */ rec(x, y, w, h, label, color, stroke, blocked, isGPCR) {
        let svg = '';
        const d = blocked ? ' stroke-dasharray="5"' : '';
        const fs = String(label || '').length > 5 ? 8 : 10;
        // Glow when active (requirement #3)
        if (!blocked) {
            svg += `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="12" fill="${color}" opacity=".12">
        <animate attributeName="opacity" values=".08;.18;.08" dur="2.5s" repeatCount="indefinite"/>
      </rect>`;
        }
        // GPCR: show 7-transmembrane domains (requirement #3)
        if (isGPCR && !blocked) {
            const tmY = y + 4;
            const tmH = h - 8;
            for(let i = 0; i < 7; i++){
                const tmX = x + 6 + i * (w - 12) / 6;
                svg += `<circle cx="${tmX}" cy="${y + h / 2}" r="4" fill="rgba(255,255,255,0.15)" stroke="${stroke || color}" stroke-width="1"/>`;
                // Vertical line through membrane
                svg += `<line x1="${tmX}" y1="${tmY}" x2="${tmX}" y2="${tmY + tmH}" stroke="${stroke || color}" stroke-width="1.5" opacity=".3"/>`;
            }
        }
        // Main receptor body
        svg += `<rect class="rv-receptor" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}" stroke="${stroke || color}" stroke-width="1.5"${d}/>`;
        svg += `<rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h / 3}" rx="6" fill="rgba(255,255,255,.1)"/>`;
        svg += `<text x="${x + w / 2}" y="${y + h / 2 + 3}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="700" font-family="system-ui,sans-serif">${label}</text>`;
        // Blocked ⊘ indicator on receptor (requirement #3)
        if (blocked) {
            svg += this.blockSymbol(x + w / 2, y + h / 2);
        }
        return svg;
    }
    // Ligand molecule
    lig(x, y, r, label, color) {
        const fs = String(label || '').length > 4 ? 7 : 9;
        return `<g class="rv-ligand">` + `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="${color}" opacity=".2"/>` + `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${color}" stroke-width="1"/>` + `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="700" font-family="system-ui,sans-serif">${label}</text>` + `</g>`;
    }
    // Block badge with ⊘ indicator (requirement #12)
    block(x, y) {
        return `<g class="rv-block-badge">` + `<circle cx="${x}" cy="${y}" r="14" fill="#ef4444" stroke="#dc2626" stroke-width="2" opacity=".9"/>` + `<line x1="${x - 7}" y1="${y - 7}" x2="${x + 7}" y2="${y + 7}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` + `<line x1="${x + 7}" y1="${y - 7}" x2="${x - 7}" y2="${y + 7}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` + `</g>`;
    }
    // ⊘ symbol for blocked component (requirement #12)
    blockSymbol(x, y) {
        return `<g class="mol-block-symbol">` + `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="#ef4444" stroke-width="2.5" opacity=".7"/>` + `<line x1="${x - 11}" y1="${y - 11}" x2="${x + 11}" y2="${y + 11}" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>` + `</g>`;
    }
    // Arrow with glow
    arrow(path, color = '#f97316', w = 2.5) {
        return `<path class="rv-signal-path" d="${path}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".8"/>` + `<path d="${path}" stroke="${color}" stroke-width="${w + 4}" fill="none" stroke-linecap="round" opacity=".1"/>`;
    }
    // Status badge (requirement #13)
    status(x, y, text, sub, c = '#22c55e') {
        let s = `<g class="rv-status-text">`;
        const h = sub ? 32 : 20;
        s += `<rect x="${x - 50}" y="${y - 12}" width="100" height="${h}" rx="8" fill="${c}" opacity=".08" stroke="${c}" stroke-width="1" stroke-opacity=".2"/>`;
        // Pulsing dot
        s += `<circle cx="${x - 38}" cy="${y}" r="4" fill="${c}" opacity=".6">
      <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" repeatCount="indefinite"/>
    </circle>`;
        s += `<text x="${x + 2}" y="${y + 3}" text-anchor="middle" fill="${c}" font-size="10" font-weight="700" font-family="system-ui,sans-serif">${text}</text>`;
        if (sub) s += `<text x="${x + 2}" y="${y + 15}" text-anchor="middle" fill="${c}" font-size="7" font-weight="600" font-family="system-ui,sans-serif" opacity=".7">${sub}</text>`;
        return s + '</g>';
    }
    // Label
    lbl(x, y, text, color = '#5a6478', size = 8, anchor = 'middle') {
        return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}" font-weight="600" font-family="system-ui,sans-serif">${text}</text>`;
    }
    // Effect icon
    effectIcon(type, x, y, color, extra) {
        const g = (inner)=>`<g transform="translate(${x},${y})" class="rv-effect">${inner}</g>`;
        switch(type){
            case 'constrict':
                return g(`<ellipse cx="14" cy="8" rx="16" ry="8" fill="none" stroke="${color}" stroke-width="2" opacity=".5"/><path d="M 30,8 L 36,8" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity=".5"/><path d="M -2,8 L -8,8" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`);
            case 'dilate':
                return g(`<ellipse cx="18" cy="6" rx="22" ry="6" fill="none" stroke="${color}" stroke-width="2" opacity=".5"/>`);
            case 'heart':
                return g(`<text x="14" y="16" text-anchor="middle" font-size="22">${extra?.icon || '❤️'}</text>${extra?.label ? `<text x="14" y="32" text-anchor="middle" fill="${color}" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${extra.label}</text>` : ''}`);
            case 'brain':
                return g(`<text x="14" y="16" text-anchor="middle" font-size="22">${extra?.icon || '🧠'}</text>${extra?.label ? `<text x="14" y="32" text-anchor="middle" fill="${color}" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${extra.label}</text>` : ''}`);
            case 'lightning':
                return g(`<path d="M 14,0 L 8,14 L 18,14 L 10,28" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
            case 'crossed':
                return g(`<text x="14" y="14" text-anchor="middle" font-size="18" opacity=".3">⚡</text><line x1="2" y1="2" x2="26" y2="26" stroke="${color}" stroke-width="3" stroke-linecap="round"/><line x1="26" y1="2" x2="2" y2="26" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
            default:
                return '';
        }
    }
    /* ═══ IMPROVED DRUG PILL (requirement #12) ═══ */ drugPill(x, y, label, color = '#EF4444', mechanism) {
        const w = Math.max(label.length * 5.5 + 24, 36);
        let svg = `<g class="rv-drug">`;
        // Pill shape
        svg += `<rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="20" rx="10" fill="${color}" stroke="${color}" stroke-width="1.5"/>`;
        svg += `<rect x="${x - w / 2}" y="${y - 10}" width="${w / 2}" height="20" rx="10" fill="rgba(255,255,255,.18)"/>`;
        svg += `<text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">💊 ${label}</text>`;
        // Mechanism label (requirement #12)
        if (mechanism) {
            svg += `<text x="${x}" y="${y + 20}" text-anchor="middle" fill="${color}" font-size="6" font-weight="600" font-family="system-ui,sans-serif" opacity=".8">${mechanism}</text>`;
        }
        svg += `</g>`;
        return svg;
    }
    /* ═══ TEMPLATE: receptor_ligand ═══ */ receptorLigand(s) {
        const r = s.receptor || {};
        const l = s.ligand || {};
        const sig = s.signal || {};
        const e = s.effect || {};
        const my = s.membrane?.y || 95;
        const steps = s.stepDescriptions || [
            'Ligand approaches',
            'Binding',
            'Signal cascade',
            'Cellular response'
        ];
        let svg = this.membrane(my);
        svg += this.zoneLabels(my);
        // Receptor (spans membrane) — with GPCR support (requirement #3)
        const rx = 150, ry = my - 32, rw = 80, rh = 68;
        svg += this.rec(rx, ry, rw, rh, r.label || 'Receptor', s.blocked ? '#6B7280' : r.color || '#8b5cf6', r.stroke, s.blocked, r.isGPCR);
        // Step 1: Ligand approaches (requirement #4)
        svg += this.stepIndicator(1, 60, 36, steps[0]);
        // Ligand
        if (l.label) {
            svg += this.lig(190, 40, 16, l.label, l.color || '#ef4444');
            if (!s.blocked) {
                svg += this.arrow(`M 190,56 L 190,${ry}`, l.color || '#ef4444', 2);
                // Step 2: Binding occurs
                svg += this.stepIndicator(2, 250, 52, steps[1]);
            }
        }
        // Drug blocker (requirement #12)
        if (s.blocked && s.drugName) {
            svg += this.drugPill(190, ry - 20, s.drugName, '#EF4444', s.drugMechanism || 'competitive antagonist');
            svg += this.block(rx + rw + 6, ry + 4);
        }
        // Step 3: Signal cascade (requirement #4)
        if (sig.active && !s.blocked) {
            svg += this.arrow(`M 190,${ry + rh} L 190,${ry + rh + 22} L 110,${ry + rh + 22}`, sig.color || '#f97316');
            svg += this.lbl(76, ry + rh + 26, sig.text || 'Signal!', sig.textColor || '#f97316', 9);
            svg += this.stepIndicator(3, 50, ry + rh + 22, steps[2]);
        }
        // Step 4: Cellular response
        if (e.type && !s.blocked) {
            svg += this.effectIcon(e.type, e.x || 40, e.y || ry + rh + 48, e.color, e.extra);
            svg += this.stepIndicator(4, 20, ry + rh + 48, steps[3]);
        } else if (e.type && s.blocked) {
            svg += this.effectIcon(e.type, e.x || 40, e.y || ry + rh + 48, e.color, e.extra);
        }
        // Legend (requirement #11)
        svg += this.legend(265, 4);
        // Status badge (requirement #13)
        if (s.blocked) svg += this.status(200, ry + rh + 38, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        else svg += this.status(200, ry + rh + 38, '✓ ACTIVE', s.statusText?.sub, '#22C55E');
        return this.svgWrap(svg);
    }
    /* ═══ TEMPLATE: gprotein_cascade (requirement #5) ═══ */ gprotein(s) {
        const r = s.receptor || {};
        const l = s.ligand || {};
        const gp = s.gprotein || {};
        const eff = s.effector || {};
        const sm = s.secondMessenger || {};
        const e = s.effect || {};
        const my = s.membrane?.y || 95;
        const gc = s.blocked ? '#6B7280' : gp.color || '#f59e0b';
        const gd = s.blocked ? ' stroke-dasharray="4"' : '';
        const steps = s.stepDescriptions || [
            'Ligand binds',
            'G-protein splits',
            'Effector activated',
            'Second messenger'
        ];
        let svg = this.membrane(my);
        svg += this.zoneLabels(my);
        // Receptor
        svg += this.rec(155, my - 32, 80, 58, r.label || 'Receptor', s.blocked ? '#6B7280' : r.color || '#8b5cf6', r.stroke, s.blocked, r.isGPCR);
        // Step 1: Ligand approaches
        svg += this.stepIndicator(1, 58, 34, steps[0]);
        // Ligand
        if (l.label) {
            svg += this.lig(195, 32, 14, l.label, l.color || '#ef4444');
            if (!s.blocked) svg += this.arrow(`M 195,46 L 195,${my - 32}`, l.color || '#ef4444', 2);
        }
        // G-Protein subunits: α, β, γ (requirement #5)
        if (!s.blocked) {
            // Step 2: G-protein splits
            svg += this.stepIndicator(2, 58, my + 20, steps[1]);
            // Gα subunit (with GDP→GTP exchange)
            svg += `<g class="rv-receptor">
        <ellipse cx="160" cy="${my + 36}" rx="22" ry="14" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5"/>
        <text x="160" y="${my + 40}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="system-ui,sans-serif">Gα</text>
      </g>`;
            // GDP→GTP exchange label
            svg += `<text x="126" y="${my + 40}" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700" font-family="system-ui,sans-serif">GDP→GTP</text>`;
            // Arrow from Gα moving away
            svg += this.arrow(`M 140,${my + 36} L 100,${my + 36}`, gc, 1.5);
            // Gβγ subunit (separated from Gα)
            svg += `<g class="rv-receptor">
        <ellipse cx="220" cy="${my + 36}" rx="20" ry="12" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5" opacity=".7"/>
        <text x="220" y="${my + 40}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">Gβγ</text>
      </g>`;
            // Arrow from Gβγ
            svg += this.arrow(`M 240,${my + 36} L 270,${my + 36}`, gc, 1);
            // Connection receptor to G-protein
            svg += this.arrow(`M 195,${my + 26} L 195,${my + 34}`, gc, 2);
            // Step 3: Effector activated
            svg += this.stepIndicator(3, 58, my + 62, steps[2]);
            // Effector
            if (eff.label) {
                const ec = eff.color || '#3b82f6';
                svg += `<rect class="rv-receptor" x="110" y="${my + 54}" width="80" height="28" rx="6" fill="${ec}" stroke="${eff.stroke || '#2563eb'}" stroke-width="1"/>` + `<text x="150" y="${my + 72}" text-anchor="middle" fill="#fff" font-size="${String(eff.label).length > 10 ? 7 : 9}" font-weight="700" font-family="system-ui,sans-serif">${eff.label}</text>`;
                svg += this.arrow(`M 120,${my + 48} L 140,${my + 54}`, ec, 2);
            }
            // Step 4: Second messenger (requirement #5)
            svg += this.stepIndicator(4, 58, my + 96, steps[3]);
            // Second messenger with arrow to effect
            if (sm.label) {
                svg += `<g class="rv-signal-path"><circle cx="150" cy="${my + 100}" r="14" fill="${sm.color || '#22c55e'}" opacity=".5"/><circle cx="150" cy="${my + 100}" r="10" fill="${sm.color || '#22c55e'}" opacity=".8"/>` + `<text x="150" y="${my + 103}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">${sm.label}</text></g>`;
                // Arrow from second messenger to effect
                svg += this.arrow(`M 150,${my + 114} L 150,${my + 126}`, sm.color || '#16a34a', 2);
                svg += this.lbl(150, my + 136, sm.description || '', sm.color || '#16a34a', 7);
            }
        } else {
            // Blocked: G-protein stays together, grayed out
            svg += `<ellipse cx="195" cy="${my + 36}" rx="26" ry="16" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5"${gd} opacity=".5"/>` + `<text x="195" y="${my + 40}" text-anchor="middle" fill="#9ca3af" font-size="9" font-weight="700" font-family="system-ui,sans-serif">G${gp.type || 's'} (inactive)</text>`;
            if (s.drugName) {
                svg += this.drugPill(195, my - 50, s.drugName, '#EF4444', s.drugMechanism || 'competitive antagonist');
                svg += this.block(240, my - 22);
            }
        }
        // Legend
        svg += this.legend(268, 4);
        if (s.blocked) {
            svg += this.status(200, my + 130, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        } else {
            svg += this.status(200, my + 130, '✓ CASCADE', s.statusText?.sub, '#22C55E');
        }
        if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 140, e.color, e.extra);
        return this.svgWrap(svg, CANVAS_W, 280);
    }
    /* ═══ TEMPLATE: ion_channel (requirement #6) ═══ */ ionChannel(s) {
        const ch = s.channel || {};
        const ions = s.ions || [];
        const e = s.effect || {};
        const my = s.membrane?.y || 95;
        const cx = 150;
        const steps = s.stepDescriptions || [
            'Depolarization',
            'Gate opens',
            'Ions flow',
            'Cellular effect'
        ];
        const isVG = ch.isVoltageGated;
        let svg = this.membrane(my);
        svg += this.zoneLabels(my);
        const cc = s.blocked ? '#6B7280' : ch.color || '#6366f1';
        // Channel walls (proper pore shape)
        const wallW = 14;
        const poreW = s.blocked ? 6 : 28;
        const wallH = 50;
        const wy = my - 14;
        // Left wall
        svg += `<rect x="${cx}" y="${wy}" width="${wallW}" height="${wallH}" rx="4" fill="${cc}" stroke="${ch.stroke || '#4338ca'}" stroke-width="1.5"/>`;
        // Right wall
        svg += `<rect x="${cx + wallW + poreW}" y="${wy}" width="${wallW}" height="${wallH}" rx="4" fill="${cc}" stroke="${ch.stroke || '#4338ca'}" stroke-width="1.5"/>`;
        // Pore (opening/closing gate)
        if (!s.blocked) {
            svg += `<rect x="${cx + wallW}" y="${wy + 4}" width="${poreW}" height="${wallH - 8}" rx="3" fill="rgba(99,102,241,0.12)"/>`;
            // Gate indicator (open)
            svg += `<line x1="${cx + wallW}" y1="${wy + wallH / 2}" x2="${cx + wallW + 4}" y2="${wy + wallH / 2 - 6}" stroke="${cc}" stroke-width="2" opacity=".5"/>`;
            svg += `<line x1="${cx + wallW + poreW}" y1="${wy + wallH / 2}" x2="${cx + wallW + poreW - 4}" y2="${wy + wallH / 2 - 6}" stroke="${cc}" stroke-width="2" opacity=".5"/>`;
            svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 4}" text-anchor="middle" fill="${cc}" font-size="7" font-weight="700" font-family="system-ui,sans-serif" opacity=".5">OPEN</text>`;
        } else {
            // Closed pore with drug plugging (requirement #6)
            svg += `<rect x="${cx + wallW}" y="${wy + 4}" width="${poreW}" height="${wallH - 8}" rx="3" fill="rgba(107,114,128,0.08)"/>`;
            svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 4}" text-anchor="middle" fill="#6B7280" font-size="7" font-weight="700" font-family="system-ui,sans-serif" opacity=".5">CLOSED</text>`;
            // Drug physically plugging the pore
            if (s.drugName) {
                svg += `<rect x="${cx + wallW + 2}" y="${wy + wallH / 2 - 6}" width="${poreW - 4}" height="12" rx="4" fill="#EF4444" opacity=".6"/>`;
                svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 3}" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui,sans-serif">${s.drugName}</text>`;
            }
        }
        // Channel label
        svg += `<text x="${cx + wallW + poreW / 2}" y="${wy - 6}" text-anchor="middle" fill="#fff" font-size="10" font-weight="700" font-family="system-ui,sans-serif">${ch.label || 'Na⁺'}</text>`;
        // Voltage sensor domain (requirement #6)
        if (isVG) {
            svg += `<rect x="${cx - 20}" y="${my + 2}" width="16" height="28" rx="3" fill="${cc}" opacity=".4" stroke="${ch.stroke || '#4338ca'}" stroke-width="1"/>`;
            svg += `<text x="${cx - 12}" y="${my + 19}" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui,sans-serif" opacity=".7">V</text>`;
            // Plus charges
            svg += `<text x="${cx - 26}" y="${my + 10}" fill="#ef4444" font-size="7" font-weight="700" font-family="system-ui,sans-serif">+</text>`;
            svg += `<text x="${cx - 26}" y="${my + 22}" fill="#ef4444" font-size="7" font-weight="700" font-family="system-ui,sans-serif">+</text>`;
        }
        svg += this.lbl(385, my + 8, ch.voltageLabel || '', '#5a6478', 8, 'end');
        // Step indicators
        svg += this.stepIndicator(1, 55, 34, steps[0]);
        svg += this.stepIndicator(2, 55, 68, steps[1]);
        // Ions flowing through (with animated dots and size differences)
        if (!s.blocked) {
            svg += this.stepIndicator(3, 55, my + 30, steps[2]);
            for(let i = 0; i < ions.length; i++){
                const ion = ions[i];
                const ix = cx + wallW + poreW / 2 + (i - ions.length / 2) * 8;
                const iy = 22 + i * 16;
                // Ion size based on type (requirement #6)
                const ionR = ion.size === 'large' ? 12 : ion.size === 'small' ? 8 : 10;
                svg += this.lig(ix, iy, ionR, ion.label || 'Na⁺', ion.color || '#ef4444');
                // Animated flow dots
                svg += `<circle class="rv-signal-path" cx="${ix}" cy="${iy}" r="${ionR - 2}" fill="${ion.color || '#ef4444'}" opacity=".3">
          <animate attributeName="cy" values="${iy};${my + 16}" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".4;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>`;
                // Ions exiting below
                svg += `<circle class="rv-signal-path" cx="${ix}" cy="${my + 24}" r="5" fill="${ion.color || '#ef4444'}" opacity=".5"/>`;
                svg += `<circle class="rv-signal-path" cx="${ix + 6}" cy="${my + 34}" r="4" fill="${ion.color || '#ef4444'}" opacity=".35"/>`;
            }
        } else {
            // Blocked: ions can't pass, show outside
            for(let j = 0; j < Math.min(ions.length, 2); j++){
                const ion2 = ions[j];
                const ox = j ? 22 : -22;
                svg += this.lig(cx + wallW + poreW / 2 + ox, my - 28, 10, ion2.label || 'Na⁺', ion2.color || '#ef4444');
            }
            svg += this.block(cx + wallW + poreW + 20, my - 20);
        }
        // Legend
        svg += this.legend(268, 4);
        // Step 4
        if (e.type && !s.blocked) {
            svg += this.effectIcon(e.type, e.x || 40, e.y || my + 58, e.color, e.extra);
            svg += this.stepIndicator(4, 55, my + 58, steps[3]);
        }
        if (s.blocked) svg += this.status(200, my + 56, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        else svg += this.status(200, my + 56, '✓ FLOWING', s.statusText?.sub, '#22C55E');
        return this.svgWrap(svg, CANVAS_W, 240);
    }
    /* ═══ TEMPLATE: transporter (requirement #9) ═══ */ transporter(s) {
        const tr = s.transporter || {};
        const mol = s.molecule || {};
        const e = s.effect || {};
        const my = s.membrane?.y || 95;
        const tx = 130;
        const tw = 100;
        const th = 46;
        const tc = s.blocked ? '#6B7280' : tr.color || '#0d9488';
        const steps = s.stepDescriptions || [
            'Outward-facing',
            'Substrate binds',
            'Conformational change',
            'Substrate released'
        ];
        const state = tr.state || 'outward';
        let svg = this.membrane(my);
        svg += this.zoneLabels(my);
        // Transporter body with conformational change model (requirement #9)
        const d = s.blocked ? ' stroke-dasharray="4"' : '';
        svg += `<rect class="rv-receptor" x="${tx}" y="${my - th / 2}" width="${tw}" height="${th}" rx="10" fill="${tc}" stroke="${tr.stroke || '#0f766e'}" stroke-width="1.5"${d}/>`;
        svg += `<rect x="${tx + 2}" y="${my - th / 2 + 2}" width="${tw - 4}" height="${th / 3}" rx="8" fill="rgba(255,255,255,.08)"/>`;
        svg += `<text x="${tx + tw / 2}" y="${my + 5}" text-anchor="middle" fill="#fff" font-size="${String(tr.label || '').length > 8 ? 8 : 10}" font-weight="700" font-family="system-ui,sans-serif">${tr.label || 'SERT'}</text>`;
        // Conformational state visualization (requirement #9)
        if (!s.blocked) {
            // Show the 3 states as small diagrams
            const states = [
                {
                    label: 'Outward',
                    x: tx + 10,
                    shape: 'M 0,-8 Q 0,-12 4,-12 L 16,-12 Q 20,-12 20,-8 L 20,8 Q 20,12 16,12 L 4,12 Q 0,12 0,8 Z'
                },
                {
                    label: 'Occluded',
                    x: tx + 36,
                    shape: 'M 0,-8 L 0,8 L 20,8 L 20,-8 Z'
                },
                {
                    label: 'Inward',
                    x: tx + 62,
                    shape: 'M 0,-8 Q 0,-12 -4,-12 L -16,-12 Q -20,-12 -20,-8 L -20,8 Q -20,12 -16,12 L -4,12 Q 0,12 0,8 Z'
                }
            ];
            const activeIdx = state === 'inward' ? 2 : state === 'occluded' ? 1 : 0;
            states.forEach((st, i)=>{
                const isActive = i === activeIdx;
                const opacity = isActive ? '.5' : '.15';
                svg += `<path d="${st.shape}" transform="translate(${st.x},${my + th / 2 + 16}) scale(.6)" fill="${tc}" opacity="${opacity}" stroke="${tr.stroke || '#0f766e'}" stroke-width="1"/>`;
                svg += `<text x="${st.x + 6}" y="${my + th / 2 + 28}" text-anchor="middle" fill="${isActive ? tc : '#5a6478'}" font-size="6" font-weight="${isActive ? '700' : '500'}" font-family="system-ui,sans-serif">${st.label}</text>`;
            });
        }
        // Transport channel opening
        if (!s.blocked) {
            svg += `<rect x="${tx + 16}" y="${my - 5}" width="${tw - 32}" height="10" rx="4" fill="rgba(255,255,255,.08)"/>`;
        }
        // Gradient arrow (requirement #9)
        svg += `<text x="${tx + tw + 16}" y="${my - th / 2 - 6}" fill="#5a6478" font-size="6" font-weight="600" font-family="system-ui,sans-serif">High →</text>`;
        svg += `<text x="${tx + tw + 16}" y="${my + th / 2 + 12}" fill="#5a6478" font-size="6" font-weight="600" font-family="system-ui,sans-serif">→ Low</text>`;
        svg += this.arrow(`M ${tx + tw + 30},${my - th / 2} L ${tx + tw + 30},${my + th / 2}`, '#5a6478', 1);
        // Step indicators
        svg += this.stepIndicator(1, 50, 34, steps[0]);
        svg += this.stepIndicator(2, 50, 60, steps[1]);
        // Molecule
        if (mol.label) {
            const mc = mol.color || '#8b5cf6';
            svg += this.lig(tx - 30, my, 14, mol.label, mc);
            if (!s.blocked) {
                svg += this.arrow(`M ${tx - 16},${my} L ${tx},${my}`, mc, 2);
                svg += this.arrow(`M ${tx + tw},${my} L ${tx + tw + 24},${my}`, mc, 2);
                svg += `<circle class="rv-signal-path" cx="${tx + tw / 2}" cy="${my}" r="7" fill="${mc}" opacity=".4"/>`;
                svg += this.lig(tx + tw + 36, my, 10, mol.label, mc);
                svg += this.stepIndicator(3, 50, my + 30, steps[2]);
                svg += this.stepIndicator(4, 50, my + 50, steps[3]);
            }
        }
        // Blocked state
        if (s.blocked) {
            svg += this.block(tx + tw + 6, my - th / 2 - 4);
            if (s.drugName) {
                svg += this.drugPill(tx + tw / 2, my - th / 2 - 22, s.drugName, '#EF4444', s.drugMechanism || 'blocks reuptake');
            }
        }
        // Legend
        svg += this.legend(268, 4);
        if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 66, e.color, e.extra);
        if (s.blocked) svg += this.status(200, my + 60, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        else svg += this.status(200, my + 60, '✓ TRANSPORTING', s.statusText?.sub, '#22C55E');
        return this.svgWrap(svg, CANVAS_W, 250);
    }
    /* ═══ TEMPLATE: enzyme_catalysis (requirement #7) ═══ */ enzyme(s) {
        const enz = s.enzyme || {};
        const subs = s.substrates || [];
        const prods = s.products || [];
        const e = s.effect || {};
        const my = s.membrane?.y || 95;
        const ex = enz.x || 140;
        const ey = 40;
        const ew = enz.w || 100;
        const eh = enz.h || 60;
        const ec = s.blocked ? '#6B7280' : enz.color || '#f97316';
        const steps = s.stepDescriptions || [
            'Substrate approaches',
            'Binding at active site',
            'Catalysis',
            'Product released'
        ];
        const inhType = s.inhibitorType || 'competitive';
        let svg = this.membrane(my);
        svg += this.zoneLabels(my);
        // Enzyme body — lock and key / induced fit model (requirement #7)
        svg += `<rect class="rv-receptor" x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="14" fill="${ec}" stroke="${enz.stroke || '#ea580c'}" stroke-width="1.5"${s.blocked ? ' stroke-dasharray="4"' : ''}/>`;
        svg += `<rect x="${ex + 2}" y="${ey + 2}" width="${ew - 4}" height="${eh / 3}" rx="12" fill="rgba(255,255,255,.1)"/>`;
        // Active site notch (lock-and-key) (requirement #7)
        if (enz.activeSite !== false) {
            if (!s.blocked || inhType === 'non-competitive') {
                svg += `<path d="M ${ex + ew / 2 - 18},${ey + eh} Q ${ex + ew / 2},${ey + eh + 14} ${ex + ew / 2 + 18},${ey + eh}" fill="none" stroke="${enz.stroke || '#ea580c'}" stroke-width="2" opacity=".6"/>`;
                svg += `<rect x="${ex + ew / 2 - 16}" y="${ey + eh - 4}" width="32" height="14" rx="5" fill="#fbbf24" opacity=".2"/>`;
                svg += `<text x="${ex + ew / 2}" y="${ey + eh + 6}" text-anchor="middle" fill="#fbbf24" font-size="6" font-weight="700" font-family="system-ui,sans-serif" opacity=".7">ACTIVE SITE</text>`;
            }
        }
        svg += `<text x="${ex + ew / 2}" y="${ey + eh / 2 + 4}" text-anchor="middle" fill="#fff" font-size="${String(enz.label || '').length > 10 ? 8 : 10}" font-weight="700" font-family="system-ui,sans-serif">${enz.label || 'Enzyme'}</text>`;
        // Step indicators
        svg += this.stepIndicator(1, 20, ey + 4, steps[0]);
        // Substrates
        for (const sub of subs){
            const sx = sub.x || ex - 34;
            const sy = sub.y || ey + 20;
            svg += this.lig(sx, sy, 12, sub.label, sub.color || '#3b82f6');
            if (!s.blocked) {
                svg += this.arrow(`M ${sx + 12},${sy} L ${ex},${sy}`, sub.color || '#3b82f6', 2);
                svg += this.stepIndicator(2, 20, sy + 20, steps[1]);
            }
        }
        // Products
        for (const p of prods){
            const px = p.x || ex + ew + 34;
            const py = p.y || ey + 20;
            if (!s.blocked) {
                svg += this.arrow(`M ${ex + ew},${py} L ${px - 12},${py}`, p.color || '#22c55e', 2);
                svg += `<g class="rv-signal-path"><circle cx="${px}" cy="${py}" r="12" fill="${p.color || '#22c55e'}"/><circle cx="${px}" cy="${py}" r="8" fill="${p.color || '#22c55e'}" opacity=".7"/>` + `<text x="${px}" y="${py + 3}" text-anchor="middle" fill="#fff" font-size="${String(p.label || '').length > 4 ? 7 : 9}" font-weight="700" font-family="system-ui,sans-serif">${p.label}</text></g>`;
                svg += this.stepIndicator(4, 20, py + 20, steps[3]);
            }
        }
        // Catalysis indicator
        if (!s.blocked) {
            svg += `<text x="${ex + ew / 2}" y="${ey + eh + 22}" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="700" font-family="system-ui,sans-serif">⚡ Catalysis</text>`;
            svg += this.stepIndicator(3, 20, ey + eh + 20, steps[2]);
        }
        // Competitive inhibitor: occupies active site (requirement #7)
        if (s.blocked) {
            if (inhType === 'competitive') {
                // Show inhibitor in the active site
                svg += this.drugPill(ex + ew / 2, ey + eh + 8, s.drugName || 'Inhibitor', '#EF4444', s.drugMechanism || 'competitive inhibitor');
                svg += `<text x="${ex + ew / 2}" y="${ey + eh + 26}" text-anchor="middle" fill="#EF4444" font-size="6" font-weight="600" font-family="system-ui,sans-serif">Blocks active site</text>`;
            } else {
                // Non-competitive: binds elsewhere, allosteric change
                svg += this.drugPill(ex - 16, ey + eh / 2, s.drugName || 'Inhibitor', '#EF4444', s.drugMechanism || 'non-competitive inhibitor');
                // Show allosteric change arrow
                svg += this.arrow(`M ${ex - 6},${ey + eh / 2} L ${ex + 10},${ey + eh / 2}`, '#EF4444', 1.5);
                svg += `<text x="${ex + ew / 2}" y="${ey + eh + 16}" text-anchor="middle" fill="#EF4444" font-size="6" font-weight="600" font-family="system-ui,sans-serif">Allosteric change → No catalysis</text>`;
                // Show substrate still near active site but can't be processed
                if (subs.length > 0) {
                    const sub = subs[0];
                    const sx = sub.x || ex - 34;
                    const sy = sub.y || ey + 20;
                    svg += this.lig(sx, sy, 12, sub.label, sub.color || '#3b82f6');
                    svg += `<line x1="${sx + 12}" y1="${sy}" x2="${ex}" y2="${sy}" stroke="#6B7280" stroke-width="1.5" stroke-dasharray="3,3" opacity=".3"/>`;
                }
            }
            svg += this.block(ex + ew + 6, ey - 4);
        }
        // Legend
        svg += this.legend(268, 4);
        if (s.blocked) {
            svg += this.status(200, ey + eh + 40, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        } else {
            svg += this.status(200, ey + eh + 40, '✓ CATALYZING', s.statusText?.sub, '#22C55E');
        }
        if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 50, e.color, e.extra);
        return this.svgWrap(svg, CANVAS_W, 250);
    }
    /* ═══ TEMPLATE: dna_binding (requirement #8) ═══ */ dna(s) {
        const drug = s.ligand || {};
        const e = s.effect || {};
        const dx = 50;
        const dh = 140;
        const dc = '#3b82f6';
        const steps = s.stepDescriptions || [
            'TF approaches DNA',
            'TF binds promoter',
            'RNA Pol recruited',
            'mRNA transcribed'
        ];
        let svg = '';
        // DNA double helix with major and minor grooves (requirement #8)
        for(let i = 0; i < dh; i += 8){
            const phase = i % 32 / 32;
            const majorGroove = phase < 0.5;
            const o1 = Math.sin(i * Math.PI / 16) * 14;
            const o2 = Math.sin(i * Math.PI / 16 + Math.PI) * 14;
            // Strand 1
            svg += `<path d="M ${dx + o1},${i} Q ${dx + o1 + (majorGroove ? 6 : 3)},${i + 4} ${dx + o1},${i + 8}" fill="none" stroke="${dc}" stroke-width="2.5" opacity=".5"/>`;
            // Strand 2
            svg += `<path d="M ${dx + 24 + o2},${i} Q ${dx + 24 + o2 + (majorGroove ? 6 : 3)},${i + 4} ${dx + 24 + o2},${i + 8}" fill="none" stroke="${dc}" stroke-width="2" opacity=".35"/>`;
            // Base pairs
            if (i % 16 < 8) {
                const midX1 = dx + o1 + 4;
                const midX2 = dx + 24 + o2 - 4;
                svg += `<line x1="${midX1}" y1="${i + 4}" x2="${midX2}" y2="${i + 4}" stroke="#8B5CF6" stroke-width="1.5" opacity=".3"/>`;
            }
            // Major/minor groove labels
            if (i === 0) {
                svg += `<text x="${dx - 8}" y="${i + 8}" fill="#5a6478" font-size="5" font-weight="600" font-family="system-ui,sans-serif" transform="rotate(-90,${dx - 8},${i + 8})">MAJOR</text>`;
            }
        }
        svg += this.lbl(dx + 20, 12, '🧬 DNA', dc, 10);
        // Promoter sequence label (requirement #8)
        svg += `<rect x="${dx - 4}" y="44" width="48" height="12" rx="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" stroke-width="0.5"/>`;
        svg += `<text x="${dx + 20}" y="53" text-anchor="middle" fill="#a78bfa" font-size="6" font-weight="700" font-family="system-ui,sans-serif">PROMOTER</text>`;
        // Step indicators
        svg += this.stepIndicator(1, 100, 20, steps[0]);
        // Transcription factor / Drug (requirement #8)
        if (drug.label) {
            const dx2 = 200;
            const dy2 = 70;
            svg += this.lig(dx2, dy2, 16, drug.label, drug.color || '#ef4444');
            if (!s.blocked) {
                svg += this.stepIndicator(2, 100, 48, steps[1]);
                svg += this.arrow(`M ${dx2 - 16},${dy2} L ${dx + 30},${dy2}`, drug.color || '#ef4444', 2);
                svg += `<circle cx="${dx + 28}" cy="${dy2}" r="8" fill="${drug.color || '#ef4444'}" opacity=".2"/>`;
                // RNA polymerase recruitment (requirement #8)
                svg += this.stepIndicator(3, 100, 100, steps[2]);
                svg += `<rect x="${dx + 40}" y="${dy2 - 8}" width="40" height="20" rx="6" fill="#8b5cf6" opacity=".5" stroke="#7c3aed" stroke-width="1"/>`;
                svg += `<text x="${dx + 60}" y="${dy2 + 5}" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="system-ui,sans-serif">RNA Pol</text>`;
                svg += this.arrow(`M ${dx + 28},${dy2 + 8} L ${dx + 40},${dy2}`, '#8b5cf6', 1.5);
                // mRNA being transcribed — wavy line (requirement #8)
                svg += this.stepIndicator(4, 100, 130, steps[3]);
                svg += `<path d="M ${dx + 80},${dy2 + 12} Q ${dx + 90},${dy2 + 6} ${dx + 100},${dy2 + 12} Q ${dx + 110},${dy2 + 18} ${dx + 120},${dy2 + 12} Q ${dx + 130},${dy2 + 6} ${dx + 140},${dy2 + 12} Q ${dx + 150},${dy2 + 18} ${dx + 160},${dy2 + 12}" fill="none" stroke="#22c55e" stroke-width="2" opacity=".6"/>`;
                svg += this.lbl(dx + 120, dy2 + 28, 'mRNA → Protein', '#22c55e', 8, 'middle');
            }
            if (s.blocked) {
                // Drug intercalating or blocking binding site (requirement #8)
                if (s.drugName) {
                    svg += this.drugPill(dx2, dy2 - 26, s.drugName, '#EF4444', s.drugMechanism || 'blocks transcription');
                    // Show drug intercalating into DNA
                    svg += `<rect x="${dx + 12}" y="${dy2 - 4}" width="16" height="8" rx="3" fill="#EF4444" opacity=".4"/>`;
                    svg += `<text x="${dx + 20}" y="${dy2 + 3}" text-anchor="middle" fill="#fff" font-size="5" font-weight="700" font-family="system-ui,sans-serif">✕</text>`;
                }
                svg += this.block(dx2 + 20, dy2 - 10);
            }
        }
        // Legend
        svg += this.legend(268, 4);
        if (s.blocked) {
            svg += this.status(200, 180, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
        } else {
            svg += this.status(200, 180, '✓ EXPRESSED', s.statusText?.sub, '#22C55E');
        }
        if (e.type) svg += this.effectIcon(e.type, e.x || 260, e.y || 160, e.color, e.extra);
        return this.svgWrap(svg, CANVAS_W, 220);
    }
}


/***/ })

};
;