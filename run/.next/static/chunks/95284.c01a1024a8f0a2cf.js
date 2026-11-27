"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[95284],{

/***/ 95284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppShellAgent: () => (/* binding */ AppShellAgent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var _components_medq_ai_agent_UIStateContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23255);
/* harmony import */ var _components_medq_ai_agent_MedQAgentV3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13644);
/* harmony import */ var _lib_medq_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83557);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26846);
/* __next_internal_client_entry_do_not_use__ AppShellAgent,default auto */ 
/**
 * AppShellAgent — mounts the MedQ AI assistant (MedQAgentV3) inside the
 * persistent (app) AppShellLayout so it is available on EVERY real route
 * (/home, /bank, /generate, /flashcards, /messages, /admin, …), not only
 * inside the SPA shell at "/".
 *
 * 2026-11-04 (user feedback: "medq assistant present only in /"):
 * MedQAgentV3 used to be rendered solely by MedQAppShell — navigating to any
 * real route made the floating assistant (and the whole agent event bus)
 * disappear mid-conversation. Because App Router layouts persist across
 * route changes, hosting it here keeps the assistant mounted while the user
 * moves between pages — the conversation thread survives.
 *
 * The assistant needs a UIStateProvider ancestor (it calls useUIState()), so
 * one is wrapped around it here — a nested provider is harmless and keeps
 * this component self-contained.
 *
 * Event bus: this component ALSO bridges the agent's window-event navigation
 * contract (medq-agent-navigate / go-back / navigate-module / action /
 * toggle-panel / open-chat-room) to real App Router navigation. On the SPA
 * shell those listeners live in MedQAppShell; without them here the agent's
 * "take me to the bank" style actions would dispatch into the void on real
 * routes. Dialog-target actions are delegated to the chrome via the
 * `medq-header-action` event that AppShellLayout already handles.
 */ 





/** Free-text tab names that are actually URL-ish — never set as a tab. */ function isUrlLike(value) {
    return value.startsWith('/') || /^https?:\/\//i.test(value) || value.startsWith('//') || value.includes('.');
}
function AppShellAgentInner({ currentTab }) {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    /* ── Compact tab navigation (mirror of MedQAppShell.handleTabSwitch) ── */ const goToTab = (tab)=>{
        router.push((0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_6__/* .tabHref */ .tW)(tab));
        if (true) {
            window.dispatchEvent(new CustomEvent('medq-tab-visible', {
                detail: tab
            }));
        }
    };
    /* ── Agent event bus → real routing ─────────────────────────────────── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleAgentNavigate = (e)=>{
            const detail = e.detail;
            const t = detail?.tab != null ? String(detail.tab) : '';
            if (!t || isUrlLike(t)) {
                if (t) console.warn('[AppShellAgent] Ignored agent-navigate with URL-like tab value:', t);
                return;
            }
            const resolved = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_5__/* .resolveNavigationTarget */ .UN)(t);
            if (resolved.kind === 'dialog') {
                // Delegate dialog targets to the chrome's existing action handler
                // (profile / settings / search / credit-shop / …).
                const dialogToAction = {
                    'profile': 'profile',
                    'settings': 'settings',
                    'search': 'search',
                    'credit-shop': 'credit-shop',
                    'auth-modal': 'sidebar'
                };
                const action = dialogToAction[resolved.target];
                if (action) {
                    window.dispatchEvent(new CustomEvent('medq-header-action', {
                        detail: {
                            action
                        }
                    }));
                }
                return;
            }
            goToTab(resolved.target);
        };
        const handleAgentNavigateModule = (e)=>{
            const detail = e.detail;
            if (detail?.module) {
                const moduleToTab = {
                    'study': 'dashboard',
                    'ai': 'generate',
                    'social': 'feed',
                    'admin': 'bank',
                    'drugs': 'flashcards',
                    'tools': 'lab-values',
                    'exam': 'review',
                    'advanced': 'collections'
                };
                goToTab(moduleToTab[String(detail.module)] || 'dashboard');
            }
        };
        const handleAgentGoBack = ()=>{
            router.back();
        };
        const handleAgentAction = (e)=>{
            const detail = e.detail;
            const actionId = detail?.actionId;
            switch(actionId){
                case 'toggle-sidebar':
                    window.dispatchEvent(new CustomEvent('medq-header-action', {
                        detail: {
                            action: 'sidebar'
                        }
                    }));
                    break;
                case 'open-pomodoro':
                    window.dispatchEvent(new CustomEvent('medq-open-pomodoro'));
                    break;
                case 'open-search':
                    window.dispatchEvent(new CustomEvent('medq-header-action', {
                        detail: {
                            action: 'search'
                        }
                    }));
                    break;
                case 'open-chat-room':
                    {
                        // The Messages page owns the room-opening logic; navigate there
                        // first, then re-dispatch so its freshly-mounted listener catches it.
                        const roomId = detail?.data?.roomId;
                        if ( true && window.location.pathname !== '/messages') {
                            goToTab('advanced-chat');
                        }
                        setTimeout(()=>{
                            window.dispatchEvent(new CustomEvent('medq-agent-open-chat-room', {
                                detail: {
                                    roomId,
                                    targetUserId: detail?.data?.targetUserId,
                                    targetName: detail?.data?.targetName,
                                    groupName: detail?.data?.groupName
                                }
                            }));
                        }, 400);
                        break;
                    }
                case 'refresh-chat':
                    // The Messages page refetches its own room list on this event.
                    window.dispatchEvent(new CustomEvent('medq-agent-refresh-chat', {
                        detail: {
                            roomId: detail?.data?.roomId
                        }
                    }));
                    break;
                default:
                    break;
            }
        };
        const handleAgentTogglePanel = (e)=>{
            const detail = e.detail;
            if (detail?.panelId === 'sidebar') {
                window.dispatchEvent(new CustomEvent('medq-header-action', {
                    detail: {
                        action: 'sidebar'
                    }
                }));
            } else if (detail?.panelId === 'search') {
                window.dispatchEvent(new CustomEvent('medq-header-action', {
                    detail: {
                        action: 'search'
                    }
                }));
            }
        };
        window.addEventListener('medq-agent-navigate', handleAgentNavigate);
        window.addEventListener('medq-agent-navigate-module', handleAgentNavigateModule);
        window.addEventListener('medq-agent-go-back', handleAgentGoBack);
        window.addEventListener('medq-agent-action', handleAgentAction);
        window.addEventListener('medq-agent-toggle-panel', handleAgentTogglePanel);
        return ()=>{
            window.removeEventListener('medq-agent-navigate', handleAgentNavigate);
            window.removeEventListener('medq-agent-navigate-module', handleAgentNavigateModule);
            window.removeEventListener('medq-agent-go-back', handleAgentGoBack);
            window.removeEventListener('medq-agent-action', handleAgentAction);
            window.removeEventListener('medq-agent-toggle-panel', handleAgentTogglePanel);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        router
    ]);
    /* onAction prop — legacy escape hatch for untyped actions (kept minimal:
   * everything typed flows through the event bus above). */ const handleAction = (action)=>{
        if (action?.type === 'navigate_to_tab' && action.params?.tab) {
            goToTab(String(action.params.tab));
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_MedQAgentV3__WEBPACK_IMPORTED_MODULE_4__/* .MedQAgentV3 */ .m, {
        onAction: handleAction,
        currentTab: currentTab
    });
}
function AppShellAgent({ currentTab }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_UIStateContext__WEBPACK_IMPORTED_MODULE_3__/* .UIStateProvider */ .rV, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AppShellAgentInner, {
            currentTab: currentTab
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppShellAgent);


/***/ })

}]);